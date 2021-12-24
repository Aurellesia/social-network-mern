import "../../style/sass/styles.scss";
import BounceLoader from "react-spinners/BounceLoader";

const CardFollowers = ({
  dataFollowers,
  dataFollowing,
  handleFollowers,
  handleFollowing,
}) => {
  return (
    <div className="card-followers">
      <div className="followers-content">
        <span className="text-24-bold">200</span>
        <span className="text-14">Posts</span>
      </div>
      <div className="followers-content">
        <span className="text-24-bold">
          {!dataFollowers ? (
            <BounceLoader color="#201e20" />
          ) : (
            <span className="text-24-bold">{dataFollowers.length}</span>
          )}
        </span>
        <span className="text-14" onClick={handleFollowers}>
          Followers
        </span>
      </div>
      <div className="followers-content">
        <span className="text-24-bold">
          {!dataFollowing ? (
            <BounceLoader color="#201e20" />
          ) : (
            <span className="text-24-bold">{dataFollowing.length}</span>
          )}
        </span>

        <span className="text-14" onClick={handleFollowing}>
          Following
        </span>
      </div>
    </div>
  );
};

export default CardFollowers;
