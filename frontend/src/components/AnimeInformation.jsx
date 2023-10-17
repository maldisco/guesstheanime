import InfoBox from "./InfoBox";
import { Box, Typography, useTheme } from "@mui/material";
import AnimeImage from "./AnimeImage";
import useMediaQuery from "hooks/useMediaQuery";

/**
 * Renders information about an anime, including review, studio, genres, format, popularity, scores, and tags.
 * @param {Object} props - The component props.
 * @param {number} props.guessNumber - The number of guesses the user has made.
 * @param {Object} props.current - The current anime being guessed.
 * @param {boolean} props.finished - Whether the game has finished.
 * @param {number} props.tipsNumber - The number of tips available for each category.
 * @param {Object} props.tipsColor - The color of the tips for each category.
 * @param {Array} props.alreadyGuessed - The list of animes already guessed by the user.
 * @returns {JSX.Element} - The JSX element representing the anime information.
 */
const AnimeInformation = ({
  guessNumber,
  current,
  finished,
  tipsNumber,
  tipsColor,
  alreadyGuessed,
}) => {
  const theme = useTheme();
  const isAboveMediumScreens = useMediaQuery("(min-width: 1060px)");

  const getScores = (scores) => {
    return Object.entries(scores)
      .map(([username, score]) => {
        return `${username}: ${score}`;
      })
      .join(" | ");
  };

  return (
    <Box
      display="flex"
      width="50vw"
      height={isAboveMediumScreens ? "55vh" : "171vh"}
      backgroundColor="white"
      position="relative"
      py="1vh"
      px="1vw"
    >
      {finished ? (
        <Box width="24vw" height="54vh" position="relative">
          <Box
            width="48vw"
            height="43vh"
            position="absolute"
            top="0"
            border="solid 2px black"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <AnimeImage image={current.cover} height="35" />
          </Box>
          <Box
            width="48vw"
            height="7vh"
            position="absolute"
            left="0"
            bottom="3vh"
            border="solid 2px black"
            py="1vh"
            px="1vw"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Typography color="black" variant="h5">
              {current.nome}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box width="50vw" height="54vh" position="relative">
          {/* Review */}
          <InfoBox
            width={isAboveMediumScreens ? "24vw" : "48vw"}
            height="20vh"
            top="0"
            title="Review"
            information={current.review}
            variant="black"
            guessNumber={guessNumber}
            tipNumber={tipsNumber.review}
            backgroundColor={tipsColor.review}
          />
          {/* Studio */}
          <InfoBox
            width={isAboveMediumScreens ? "8vw" : "15vw"}
            height="10vh"
            top="21vh"
            title="Studio"
            information={current.studio}
            variant="black"
            guessNumber={guessNumber}
            tipNumber={tipsNumber.studio}
            backgroundColor={tipsColor.studio}
          />
          {/* Genres */}
          <InfoBox
            width={isAboveMediumScreens ? "15vw" : "32vw"}
            height="10vh"
            top="21vh"
            left={isAboveMediumScreens ? "9vw" : "16vw"}
            title="Genres"
            information={current.generos.map((genre) => genre).join(" | ")}
            variant="black"
            guessNumber={guessNumber}
            tipNumber={tipsNumber.genres}
            backgroundColor={tipsColor.genres}
          />
          {/* Format */}

          <InfoBox
            width={isAboveMediumScreens ? "11vw" : "23vw"}
            height="10vh"
            top="32vh"
            title="Format"
            information={current.episodios > 1 ? `${current.formato}` : `Movie`}
            variant="black"
            guessNumber={guessNumber}
            tipNumber={tipsNumber.format}
            backgroundColor={tipsColor.format}
          />
          {/* Popularity */}
          <InfoBox
            top="32vh"
            left={isAboveMediumScreens ? "12vw" : "24vw"}
            width={isAboveMediumScreens ? "12vw" : "24vw"}
            height="10vh"
            title="Release"
            information={current.ano}
            variant="black"
            guessNumber={guessNumber}
            tipNumber={tipsNumber.popularity}
            backgroundColor={tipsColor.popularity}
          />
          {/* Score */}

          <InfoBox
            width={isAboveMediumScreens ? "24vw" : "48vw"}
            height="8vh"
            top="43vh"
            title="Scores"
            information={getScores(current.score)}
            variant="black"
            guessNumber={guessNumber}
            tipNumber={tipsNumber.score}
            backgroundColor={tipsColor.score}
          />
          {/* TAGS */}
          <Box
            width={isAboveMediumScreens ? "23vw" : "48vw"}
            height="31vh"
            position="absolute"
            top={isAboveMediumScreens ? "auto" : "52vh"}
            right={isAboveMediumScreens ? "0" : "auto"}
            lef={isAboveMediumScreens ? "auto" : "0"}
            border="solid 2px black"
            py="1vh"
            px="1vw"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            backgroundColor={tipsColor.tags}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              color={tipsColor.tags === "white" ? "black" : "white"}
            >
              Tags
            </Typography>
            {guessNumber >= tipsNumber.tags ? (
              <Box display="flex" flexDirection="column" width="100%">
                {current.tags.slice(0, 10).map((tag) => {
                  return (
                    <Box
                      key={tag.name}
                      display="flex"
                      justifyContent="space-between"
                    >
                      <Typography
                        variant="h6"
                        color={tipsColor.tags === "white" ? "black" : "white"}
                        position="relative"
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                          },
                          "&:hover .tag-description": {
                            visibility: "visible",
                          },
                        }}
                      >
                        {tag.name}
                        <Typography
                          variant="pageNumber"
                          top="-150%"
                          left="0"
                          color={tipsColor.tags === "white" ? "white" : "black"}
                          fontSize="12px"
                          p="2px 4px"
                          borderRadius="4px"
                          zIndex={1}
                          style={{
                            position: "absolute",
                            transform: "translateX(-50%)",
                            backgroundColor:
                              tipsColor.tags === "white"
                                ? theme.palette.background.alt
                                : "white",
                            whiteSpace: "nowrap",
                            hidden: "true",
                          }}
                          visibility="hidden"
                          className="tag-description"
                        >
                          {tag.description}
                        </Typography>
                      </Typography>

                      <Typography
                        variant="h6"
                        color={tipsColor.tags === "white" ? "black" : "white"}
                      >
                        {tag.rank}%
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            ) : (
              <Typography
                variant="h6"
                color={tipsColor.tags === "white" ? "black" : "white"}
              >
                ?
              </Typography>
            )}
          </Box>

          {/* Recommendations */}
          <Box
            width={isAboveMediumScreens ? "23vw" : "48vw"}
            height={isAboveMediumScreens ? "19vh" : "83vh"}
            position="absolute"
            top={isAboveMediumScreens ? "32vh" : "84vh"}
            right={isAboveMediumScreens ? "0" : "auto"}
            lef={isAboveMediumScreens ? "auto" : "0"}
            border="solid 2px black"
            py="1vh"
            px="1vw"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            backgroundColor={tipsColor.recommendations}
          >
            <Typography
              variant="h5"
              fontWeight="bold"
              color={tipsColor.recommendations === "white" ? "black" : "white"}
            >
              Similar
            </Typography>
            {guessNumber >= tipsNumber.recommendations ? (
              <Box
                display="flex"
                justifyContent="space-evenly"
                alignItems="center"
                gap=".5vw"
                flexDirection={isAboveMediumScreens ? "row" : "column"}
              >
                {current.recommendations.map((recommendation, index) => {
                  return (
                    <img
                      key={index}
                      alt={`Recommendation number ${index}`}
                      src={recommendation}
                      style={{
                        filter: "grayscale(100%)",
                        height: "70%",
                        width: "auto",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                      }}
                      className="image-item"
                    />
                  );
                })}
              </Box>
            ) : (
              <Typography
                variant="h6"
                color={
                  tipsColor.recommendations === "white" ? "black" : "white"
                }
              >
                ?
              </Typography>
            )}
          </Box>
        </Box>
      )}

      {/* PAGE NUMBER */}
      <Box position="absolute" bottom=".5vh" right="1vw">
        <Typography color="black" variant="pageNumber">
          {alreadyGuessed.length + 1}
        </Typography>
      </Box>
    </Box>
  );
};

export default AnimeInformation;
