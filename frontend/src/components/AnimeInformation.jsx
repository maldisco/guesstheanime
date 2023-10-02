import AnimeInfoBox from "components/AnimeInfoBox";
import { Box } from "@mui/material";

const AnimeInformation = ({ guessNumber, current }) => {
  return (
    <>
      <AnimeInfoBox title="Review" information={current.resumo} />
      {guessNumber > 1 && (
        <Box display="flex" justifyContent="center" width="100%">
          <AnimeInfoBox title="Estúdio" information={current.studio} />
          <AnimeInfoBox
            title="Gêneros"
            information={current.generos.map((genre) => genre).join(" | ")}
          />
        </Box>
      )}
      {guessNumber > 2 && (
        <Box display="flex" justifyContent="center" width="100%">
          <AnimeInfoBox
            title="Formato"
            information={
              current.episodios > 1
                ? `Anime (${current.episodios} episódios)`
                : `Filme`
            }
          />
          <AnimeInfoBox
            title="Popularidade"
            information={
              current.popularidade !== "-"
                ? `${current.popularidade}° título mais popular do Anilist`
                : "Não está entre os 500 mais populares do Anilist"
            }
          />
        </Box>
      )}
      {guessNumber > 3 && (
        <AnimeInfoBox title="Tags" information={current.tags.join(" | ")} />
      )}
      {guessNumber > 4 && (
        <AnimeInfoBox
          title="Notas"
          information={`Filipe: ${current.score.Filipe} | Tuzzin: ${current.score.Tuzzin} | Taboada: ${current.score.Taboada}`}
        />
      )}
      {guessNumber > 5 && (
        <AnimeInfoBox
          title="Sinopse"
          information={current.desc}
          innerHtml={true}
        />
      )}
    </>
  );
};

export default AnimeInformation;
