import BounceLoader from "react-spinners/BounceLoader";
import Navbar from "../../components/Navbar";
import { useDispatch, connect, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchFollowing } from "../../api/profile";
import {
  failFetchFollowing,
  successFetchFollowing,
} from "../../redux/actions/profile";

const Following = () => {
  const { id } = useParams();
  const userProfile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchFollowing(id)
      .then((res) => dispatch(successFetchFollowing(res)))
      .then((err) => dispatch(failFetchFollowing(err)));
  }, [dispatch, id]);
  return (
    <>
      <Navbar />
      {!userProfile.following.data ? (
        <BounceLoader color="#201e20" />
      ) : (
        userProfile.following.data.map((item, index) => {
          return (
            <Link to={`/profile/${item._id}`}>
              <span key={index}>{item.first_name}</span>
            </Link>
          );
        })
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return { ...state };
};

export default connect(mapStateToProps)(Following);
