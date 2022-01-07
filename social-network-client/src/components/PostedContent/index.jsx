import "../../style/sass/styles.scss";
import { config } from "../../config";

const PostedContent = ({ dataPost }) => {
  return (
    <>
      <span className="text-12 posted-text">{dataPost.text}</span>
      <div>
        {dataPost.images?.map((pict, index) => {
          return (
            <div key={index} className="posted-image-section">
              <img
                className="posted-image"
                src={`${config.api_host}/images/posts/${pict}`}
                alt={pict}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PostedContent;
