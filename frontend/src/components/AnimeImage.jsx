
const AnimeImage = ({ image, size = "35" }) => {
  const imageSizeStyle = {
    objectFit: "cover",
    width: `${size}%`,
    height: "auto",
  };

  return (
    <img
      style={imageSizeStyle}
      alt="anime"
      src={`http://localhost:3001/assets/${image}`}
    />
  );
};

export default AnimeImage;
