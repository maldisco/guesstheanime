import InfoBox from "components/InfoBox";
import { Box } from "@mui/material";

/**
 * Renders information about an anime.
 * @param {Object} props - The component props.
 * @param {number} props.guessNumber - The current guess number.
 * @param {Object} props.current - The current anime object.
 * @returns {JSX.Element} - The AnimeInformation component.
 */
const AnimeInformation = ({ guessNumber, current }) => {
  return (
    <>
      <InfoBox title="Review" information={current.resumo} />
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
                ? `Anime (${current.episodios} episodes)`
                : `Movie`
            }
          />
          <InfoBox
            title="Popularity"
            information={
              current.popularidade !== "-"
                ? `${current.popularidade}th most popular title on Anilist`
                : "Not among Anilist's 500 most popular"
            }
          />
        </Box>
      )}
      {guessNumber > 3 && (
        <InfoBox title="Tags" information={current.tags.join(" | ")} />
      )}
      {guessNumber > 4 && (
        <InfoBox
          title="Scores"
          information={`Filipe: ${current.score.Filipe} | Tuzzin: ${current.score.Tuzzin} | Taboada: ${current.score.Taboada}`}
        />
      )}
      {guessNumber > 5 && (
        <InfoBox
          title="Synopsis"
          information={current.desc}
          innerHtml={true}
        />
      )}
    </>
  );
};

export default AnimeInformation;
