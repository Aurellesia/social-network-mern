import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchFollowers } from "../../api/profile";
import { useDispatch, connect, useSelector } from "react-redux";
import {
  failFetchFollowers,
  successFetchFollowers,
} from "../../redux/actions/profile";
import BounceLoader from "react-spinners/BounceLoader";
import Navbar from "../../components/Navbar";

const Followers = () => {
  const { id } = useParams();
  const userProfile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchFollowers(id)
      .then((res) => dispatch(successFetchFollowers(res)))
      .catch((err) => failFetchFollowers(err));
  }, [dispatch, id]);

  return (
    <>
      <Navbar />
      {!userProfile.followers.data ? (
        <BounceLoader color="#201e20" />
      ) : (
        userProfile.followers.data.map((item, index) => {
          return (
            <>
              <Link to={`/profile/${item._id}`}>
                <span>{item.first_name}</span>
              </Link>
            </>
          );
        })
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return { ...state };
};

export default connect(mapStateToProps)(Followers);
