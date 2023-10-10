import { Box, Button, TextField, Typography } from "@mui/material";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAnimeList } from "state";

const Register = () => {
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
  const [usernames, setUsernames] = useState("");
  const [isValidUsername, setIsValidUsername] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

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

    
    for (const [user, userData] of Object.entries(data)) {
      for (const list of userData.data.MediaListCollection.lists) {
        if (list.name !== "Planning") {
          for (const entry of list.entries) {
            var isSequel = false;
            for (const added of alreadyAdded) {
              if (entry.media.title.romaji.includes(added)) {
                isSequel = true;
              }
            }
            const hasReviews = entry.media.reviews.nodes.length > 0;
            const wasAdded = alreadyAdded.includes(entry.media.title.romaji);
            const hasStudio = entry.media.studios.edges.length > 0;

            if (wasAdded) {
              animelist[entry.media.title.romaji]["score"][user] =
                translate_score(
                  entry.score,
                  entry.user.mediaListOptions.scoreFormat
                );
            }

            if (!wasAdded && hasReviews && hasStudio && !isSequel) {
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
              anime["tags"] = entry.media.tags.map((tag) => tag.name);

              // get 10 reviews or all available
              anime["reviews"] = [];
              for (const review of entry.media.reviews.nodes) {
                if (anime["reviews"].length >= 5) {
                  break;
                }
                anime["reviews"].push(
                  filter_names(
                    review.summary,
                    entry.media.title.romaji,
                    entry.media.title.english
                  )
                );
              }
              anime["popularidade"] = "-";
              for (const ranking of entry.media.rankings) {
                if (ranking.context === "most popular all time") {
                  anime["popularidade"] = ranking.rank;
                }
              }

              anime["cover"] = entry.media.coverImage.large;

              animelist[anime["nome"]] = anime;
              alreadyAdded.push(anime["nome"]);
            }
          }
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
        <Typography variant="h5" textAlign="center">
          We will only use your completed and dropped animes.
          <br />
          You can also use many usernames if you are playing with friend! Just
          add a comma between each.
        </Typography>
        <img alt="Example username" src="example.png" />
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
