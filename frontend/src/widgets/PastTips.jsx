import InfoBox from "components/InfoBox";
import WidgetWrapper from "components/WidgetWrapper";

/**
 * Renders information about an anime.
 * @param {Object} props - The component props.
 * @param {number} props.guessNumber - The current guess number.
 * @param {Object} props.current - The current anime object.
 * @returns {JSX.Element} - The PastTips component.
 */
const PastTips = ({ guessNumber, current }) => {
  return (
    <WidgetWrapper display="flex" flexDirection="column" gap="1.5rem">
      {guessNumber > 1 && (
        <InfoBox title="Review" information={current.resumo} />
      )}
      {guessNumber > 2 && (
        <InfoBox title="Estúdio" information={current.studio} />
      )}
      {guessNumber > 2 && (
        <InfoBox
          title="Gêneros"
          information={current.generos.map((genre) => genre).join(" | ")}
        />
      )}
      {guessNumber > 3 && (
        <InfoBox
          title="Formato"
          information={
            current.episodios > 1
              ? `Anime (${current.episodios} episódios)`
              : `Filme`
          }
        />
      )}
      {guessNumber > 3 && (
        <InfoBox
          title="Popularidade"
          information={
            current.popularidade !== "-"
              ? `${current.popularidade}° título mais popular do Anilist`
              : "Não está entre os 500 mais populares do Anilist"
          }
        />
      )}
      {guessNumber > 4 && (
        <InfoBox title="Tags" information={current.tags.join(" | ")} />
      )}
      {guessNumber > 5 && (
        <InfoBox
          title="Notas"
          information={`Filipe: ${current.score.Filipe} | Tuzzin: ${current.score.Tuzzin} | Taboada: ${current.score.Taboada}`}
        />
      )}
    </WidgetWrapper>
  );
};

export default PastTips;
