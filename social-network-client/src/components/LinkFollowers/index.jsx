import "../../style/sass/styles.scss";
import empty from "../../assets/icons/empty.png";
import { config } from "../../config";

const LinkFollowers = ({ data }) => {
  return (
    <div className="friend-link">
      <img
        src={
          data.picture
            ? `${config.api_host}/images/profiles/${data.picture}`
            : empty
        }
        alt="followers pict"
        className="followers-pict"
      />
      <div className="text-followers">
        <span className="text-16-bold">
          {data.first_name} {data.last_name}
        </span>
        <span className="text-11">{data.current_city}</span>
      </div>
    </div>
  );
};

export default LinkFollowers;
