import "../../style/sass/styles.scss";
import MdPhotoSizeSelectActual from "@meronex/icons/md/MdPhotoSizeSelectActual";

const CardPosting = ({
  handleSubmit,
  dataText,
  setText,
  dataImage,
  setImage,
  dataPosts,
}) => {
  function showPreview(e) {
    const imagePreview = [...e.target.files];
    if (imagePreview.length > 0) {
      imagePreview.map((item) => {
        let src = URL.createObjectURL(item);
        const preview = document.getElementById("preview");
        preview.src = src;
        preview.style.display = "flex";
        return preview;
      });
    }
  }
  const resetFile = () => {
    setImage("");
    const preview = document.getElementById("preview");
    preview.style.display = "none";
  };
  return (
    <div className="card-posting">
      <form className="form-post" onSubmit={handleSubmit}>
        <textarea
          className="post-box"
          name="text"
          id="text"
          placeholder="Create your new post"
          onChange={(e) => setText(e.target.value)}
          value={dataText}
        />
        <div>
          <span className="error">
            {!dataText && dataPosts.error && "Text cannot be empty"}
          </span>
        </div>
        <div className="input-section">
          <div id="preview" className="preview">
            <span className="text-12-bold">
              {dataImage && `${dataImage.length}`} Files
              <span
                className="cancel-file"
                onClick={(_) => {
                  resetFile();
                }}
              >
                &times;
              </span>
            </span>
          </div>
          <div className="input-button">
            <label htmlFor="images">
              <MdPhotoSizeSelectActual className="posting-icon" />
            </label>
            <input
              id="images"
              name="images"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                setImage([...e.target.files]);
                showPreview(e);
              }}
            />
          </div>

          {/* <div>
            <label htmlFor="videos">
              <BsCameraVideoFill className="posting-icon" />
            </label>
            <input id="videos" type="file" multiple accept="video/*" />
          </div> */}

          <button className="btn-post" type="submit" form="form-post">
            <span className="text-14">Add Post</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CardPosting;
