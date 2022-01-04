import "../../style/sass/styles.scss";
import BounceLoader from "react-spinners/BounceLoader";
import { fetchFollowers } from "../../api/profile";
import {
  failFetchFollowers,
  successFetchFollowers,
} from "../../redux/actions/profile";
import { useDispatch } from "react-redux";

const CardFollowers = ({
  dataUser,
  dataFollowers,
  dataFollowing,
  setModalFollowers,
  setFollowers,
  dataPost,
}) => {
  const dispatch = useDispatch();

  const handleFollowers = async () => {
    setFollowers(true);
    setModalFollowers(true);
    await fetchFollowers(dataUser._id)
      .then((res) => dispatch(successFetchFollowers(res)))
      .catch((err) => dispatch(failFetchFollowers(err)));
  };

  const handleFollowing = () => {
    setFollowers(false);
    setModalFollowers(true);
  };

  return (
    <div className="card-followers">
      <div className="followers-content">
        <span className="text-24-bold">{dataPost.length}</span>
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
