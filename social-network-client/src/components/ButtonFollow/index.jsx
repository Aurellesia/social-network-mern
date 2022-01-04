import { useDispatch } from "react-redux";
import { follow } from "../../api/profile";
import { failFollow, successFollow } from "../../redux/actions/profile";
import "../../style/sass/styles.scss";

const ButtonFollow = ({ dataUser, id }) => {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("user_id")
    ? localStorage.getItem("user_id")
    : {};

  const handleFollowBtn = async () => {
    try {
      await follow(id)
        .then((res) => dispatch(successFollow(res)))
        .catch((err) => dispatch(failFollow(err)));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <button className="follow-btn" onClick={handleFollowBtn}>
      {dataUser.followers.includes(userId) ? "Unfollow" : "Follow"}
    </button>
  );
};

export default ButtonFollow;
