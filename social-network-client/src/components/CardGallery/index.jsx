import "../../style/sass/styles.scss";
import { config } from "../../config";

const CardGallery = ({ dataPost }) => {
  let imageArray = [];
  dataPost?.map((item) => {
    return item.images.map((item) => {
      return imageArray.push(item);
    });
  });
  const picture = imageArray
    .filter((_, index) => {
      return index < 6;
    })
    .map((item) => {
      return (
        <img
          src={`${config.api_host}/images/posts/${item}`}
          alt="gallery-pict"
          className="gallery-pict"
        />
      );
    });
  return (
    <div className="card-gallery">
      <div className="gallery-content">
        <span className="text-18-bold">Gallery</span>
        <div className="pict-container">{picture}</div>
      </div>
    </div>
  );
};

export default CardGallery;
