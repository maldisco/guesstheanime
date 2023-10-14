/**
 * A component that displays an anime image with a given height.
 * @param {Object} props - The component props.
 * @param {string} props.image - The URL of the anime image.
 * @param {number} props.height - The height of the anime image in viewport height units.
 * @returns {JSX.Element} - The AnimeImage component.
 */
const AnimeImage = ({ image, height }) => {
  const imageSizeStyle = {
    objectFit: "cover",
    height: `${height}vh`,
    width: `auto`,
    filter: "grayscale(100%)",
  };

  return <img style={imageSizeStyle} alt="anime" src={image}/>;
};

export default AnimeImage;
