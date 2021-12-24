import "../../style/sass/styles.scss";

const CardGallery = ({ dataImage }) => {
  return (
    <div className="card-gallery">
      <div className="gallery-content">
        <span className="text-18-bold">Gallery</span>
        <div className="pict-container">
          <img src={dataImage} alt="gallery-pict" className="gallery-pict" />
          <img src={dataImage} alt="gallery-pict" className="gallery-pict" />
          <img src={dataImage} alt="gallery-pict" className="gallery-pict" />
          <img src={dataImage} alt="gallery-pict" className="gallery-pict" />
          <img src={dataImage} alt="gallery-pict" className="gallery-pict" />
          <img src={dataImage} alt="gallery-pict" className="gallery-pict" />
        </div>
      </div>
    </div>
  );
};

export default CardGallery;
