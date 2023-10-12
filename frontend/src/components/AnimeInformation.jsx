import InfoBox from "components/InfoBox";
import { Box } from "@mui/material";
import SpeechBubble from "./speechbubble";

/**
 * Renders information about an anime.
 * @param {Object} props - The component props.
 * @param {number} props.guessNumber - The current guess number.
 * @param {Object} props.current - The current anime object.
 * @returns {JSX.Element} - The AnimeInformation component.
 */
const AnimeInformation = ({ guessNumber, current }) => {
  const getScores = (scores) => {
    return Object.entries(scores)
      .map(([username, score]) => {
        return `${username}: ${score}`;
      })
      .join(" | ");
  };

  const getPopularity = (popularity) => {
    if (popularity === "-") return "501-";

    popularity = parseInt(popularity);
    if (popularity <= 20) {
      return "1-20";
    } else if (popularity <= 50) {
      return "21-50";
    } else if (popularity <= 100) {
      return "51-100";
    } else {
      return "101-500";
    }
  };

  return (
    <>
      <InfoBox title="Review" information={current.review} />
      {guessNumber > 1 && (
        <Box display="flex" justifyContent="center" width="100%">
          <InfoBox title="Studio" information={current.studio} />
          <InfoBox
            title="Genres"
            information={current.generos.map((genre) => genre).join(" | ")}
          />
        </Box>
      )}
      {guessNumber > 2 && (
        <Box display="flex" justifyContent="center" width="100%">
          <InfoBox
            title="Format"
            information={
              current.episodios > 1
                ? `${current.formato} (${current.episodios} episodes)`
                : `Movie`
            }
          />
          <InfoBox
            title={`Popularity among ${current.formato} (Anilist)`}
            information={getPopularity(current.popularidade)}
          />
        </Box>
      )}
      {guessNumber > 3 && (
        <InfoBox title="Tags" information={current.tags.join(" | ")} />
      )}
      {guessNumber > 4 && (
        <InfoBox title="Scores" information={getScores(current.score)} />
      )}
    </>
  );
};

export default AnimeInformation;
