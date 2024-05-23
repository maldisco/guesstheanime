import { Box, Button, TextField, Typography } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import useMediaQuery from "hooks/useMediaQuery";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAnimeList } from "state";

const query = `
query ($id: Int, $name: String) {
  MediaListCollection(userId: $id, userName: $name, type: ANIME) {
    lists {
      name
      entries {
        media {
          title {
            english
            romaji
          }
          format
          seasonYear
          season
          description
          genres
          episodes
          averageScore
          popularity
          tags {
            name
            description
            rank
          }
          reviews(sort: RATING) {
            nodes {
              summary
            }
          }
          studios(isMain: true) {
            edges {
              isMain
              node {
                id
                name
              }
            }
          }
          coverImage {
            large
          }
          rankings {
            rank
            context
          }
          relations {
            edges {
              node {
                title {
                  romaji
                }
                format
              }
              relationType
            }
          }
          recommendations(sort: RATING_DESC){
            nodes {
              mediaRecommendation {
                coverImage {
                  medium
                }
              }
            }
          }
        }
        score
        user {
          mediaListOptions {
            scoreFormat
          }
        }
      }
    }
  }
}
`;

const Register = () => {
  const [usernames, setUsernames] = useState("");
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");

  const filter_names = (phrase, name_romaji, name_english) => {
    phrase = remove_names(phrase, name_romaji);
    if (name_english) {
      phrase = remove_names(phrase, name_english);
    }
    return phrase;
  };

  const remove_names = (phrase, name) => {
    phrase = remove_name(phrase, name);

    // Remove punctuation from name and search again
    phrase = remove_name(phrase, name.replace(/[^\w\s]/g, ""));

    // Get the first letter of the name (if it has at least 3 words) and search again
    const words = name.split(" ");
    if (words.length >= 3) {
      const abbreviation = words.map((word) => word[0]).join("");
      phrase = remove_name(phrase, abbreviation);
    }

    return phrase;
  };

  const remove_name = (phrase, name) => {
    const lower_phrase = phrase.toLowerCase();
    const find_name = lower_phrase.indexOf(name.toLowerCase());
    if (find_name !== -1) {
      return (
        phrase.substring(0, find_name) +
        "****" +
        phrase.substring(find_name + name.length)
      );
    }
    return phrase;
  };

  const translate_score = (score, type) => {
    if (type === "POINT_10") {
      return score;
    } else if (type === "POINT_3") {
      if (score === 3) {
        return ":)";
      } else if (score === 2) {
        return ":|";
      } else {
        return ":(";
      }
    } else if (type === "POINT_5") {
      // Return score as a number of stars
      return "⭐".repeat(score);
    } else {
      return score;
    }
  };

  const validateAnime = (anime) => {
    const hasReviews = anime.media.reviews.nodes.length > 0;
    const hasStudio = anime.media.studios.edges.length > 0;
    const hasName = anime.media.title.romaji !== null;
    const hasRelease =
      anime.media.season !== null && anime.media.seasonYear !== null;
    const hasFormat = anime.media.format !== null;
    const hasTags = anime.media.tags.length > 0;
    const hasCover = anime.media.coverImage.large !== null;
    const hasRecommendations = anime.media.recommendations.nodes.length > 0;

    return (
      hasReviews &&
      hasStudio &&
      hasName &&
      hasRelease &&
      hasFormat &&
      hasTags &&
      hasCover &&
      hasRecommendations
    );
  };

  const parseData = (users) => {
    let userAnimes = {};
    for (const [user, userData] of Object.entries(users)) {
      userAnimes[user] = [];
      for (const list of userData.data.MediaListCollection.lists) {
        if (list.name !== "Planning") {
          // push every single entry from the list to the user
          userAnimes[user] = [...userAnimes[user], ...list.entries];
        }
      }
    }

    return userAnimes;
  };

  const parseAnime = (entry, user) => {
    const anime = {};
    anime["score"] = {};
    anime["nome"] = entry.media.title.romaji;
    anime["nome2"] = entry.media.title.english || "";
    anime["ano"] = `${entry.media.season} ${entry.media.seasonYear}`;
    anime["generos"] = entry.media.genres;
    anime["studio"] = entry.media.studios.edges[0].node.name;
    anime["formato"] = entry.media.format;
    anime["episodios"] = entry.media.episodes || 0;
    anime["score"][user] = translate_score(
      entry.score,
      entry.user.mediaListOptions.scoreFormat
    );
    anime["tags"] = entry.media.tags;
    // ge 5 recommendations or all available
    anime["recommendations"] = [];
    for (const recommendation of entry.media.recommendations.nodes) {
      if (anime["recommendations"].length >= 5) {
        break;
      }

      if (recommendation.mediaRecommendation) {
        anime["recommendations"].push(
          recommendation.mediaRecommendation.coverImage.medium
        );
      }
    }

    anime["review"] = filter_names(
      entry.media.reviews.nodes[0].summary,
      entry.media.title.romaji,
      entry.media.title.english
    );
    anime["popularidade"] = "-";
    for (const ranking of entry.media.rankings) {
      if (ranking.context === "most popular all time") {
        anime["popularidade"] = ranking.rank;
      }
    }

    anime["cover"] = entry.media.coverImage.large;

    return anime;
  };

  const fetchAnimes = async () => {
    setIsLoading(true);
    const users = usernames.split(",");
    const userData = {};

    for (const user of users) {
      const variables = {
        name: user.trim(),
      };

      const url = "https://graphql.anilist.co",
        options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            query: query,
            variables: variables,
          }),
        };

      await fetch(url, options)
        .then(handleResponse)
        .then((data) => (userData[user] = data))
        .catch(handleError);
    }

    handleData(userData);

    setIsLoading(false);
  };

  const handleResponse = (response) => {
    return response.json().then((json) => {
      return response.ok ? json : Promise.reject(json);
    });
  };

  const handleData = (data) => {
    const animelist = {};
    const alreadyAdded = [];

    const userAnimes = parseData(data);
    for (const [user, animes] of Object.entries(userAnimes)) {
      for (const entry of animes) {
        const wasAdded = alreadyAdded.includes(entry.media.title.romaji);

        if (wasAdded) {
          animelist[entry.media.title.romaji]["score"][user] = translate_score(
            entry.score,
            entry.user.mediaListOptions.scoreFormat
          );
        }

        if (validateAnime(entry)) {
          const anime = parseAnime(entry, user);
          animelist[anime["nome"]] = anime;
          alreadyAdded.push(anime["nome"]);
        }
      }
    }

    const animeList = Object.values(animelist);
    dispatch(setAnimeList(animeList));
  };

  const handleError = (error) => {
    // if error is 404
    setIsValidUsername(false);
  };

  return (
    <WidgetWrapper>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="1rem"
      >
        <Typography variant="h1">Type your Anilist username</Typography>
        <Typography variant="pageNumber" textAlign="center">
          We will only use YOUR animes.
          <br />
          You can also use many list if you are playing with friends! Just add a
          comma between each username.
        </Typography>
        <img alt="Example username" src="example.png" width={isAboveMediumScreens ?  "auto" : "100%"} height="auto"/>
        {!isValidUsername && (
          <Typography variant="h6" color="red">
            Invalid username
          </Typography>
        )}
        <Box
          display="flex"
          gap="1rem"
          alignItems="center"
          justifyContent="space-evenly"
        >
          <TextField
            name="inform-username"
            label="Username"
            fullWidth
            sx={{ m: "1rem 0" }}
            value={usernames}
            onChange={(event) => {
              setUsernames(event.target.value);
            }}
          />
          <Box>
            <Button
              variant="contained"
              sx={{ mx: "10px", fontWeight: "bold" }}
              size="large"
              onClick={() => fetchAnimes()}
              disabled={isLoading}
            >
              Start
            </Button>
          </Box>
        </Box>
      </Box>
    </WidgetWrapper>
  );
};

export default Register;
