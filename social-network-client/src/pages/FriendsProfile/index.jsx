import "../../style/sass/styles.scss";
import { useEffect, useState } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchFriendProfile, follow } from "../../api/profile";
import Navbar from "../../components/Navbar";
import BounceLoader from "react-spinners/BounceLoader";
import {
  failFetchFriendProfile,
  failFollow,
  successFetchFollowers,
  successFetchFriendProfile,
  successFollow,
  failFetchFollowers,
  successFetchFollowing,
  failFetchFollowing,
} from "../../redux/actions/profile";
import AiFillLike from "@meronex/icons/ai/AiFillLike";
import FaComment from "@meronex/icons/fa/FaComment";
import FaShareAlt from "@meronex/icons/fa/FaShareAlt";
import AiFillCamera from "@meronex/icons/ai/AiFillCamera";
import MdInsertEmoticon from "@meronex/icons/md/MdInsertEmoticon";
import empty from "../../assets/icons/empty.png";
import { useNavigate } from "react-router";
import { fetchFollowers, fetchFollowing } from "../../api/profile";
import Modal from "../../components/Modal";
import HeaderProfile from "../../components/HeaderProfile";
import CardFollowers from "../../components/CardFollowers";
import CardAboutMe from "../../components/CardAboutMe";
import CardContactMe from "../../components/CardContactMe";
import CardGallery from "../../components/CardGallery";

const FriendsProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const friendProfile = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [followers, setFollowers] = useState(false);
  const showModal = modal ? "show-modal" : "hide-modal";

  useEffect(() => {
    fetchFriendProfile(id)
      .then((res) => dispatch(successFetchFriendProfile(res)))
      .catch((err) => dispatch(failFetchFriendProfile(err)));
    fetchFollowing(id)
      .then((res) => dispatch(successFetchFollowing(res)))
      .then((err) => dispatch(failFetchFollowing(err)));
  }, [dispatch, id]);

  let userId = localStorage.getItem("user_id")
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

  const handleFollowers = async () => {
    setFollowers(true);
    setModal(true);
    await fetchFollowers(id)
      .then((res) => dispatch(successFetchFollowers(res)))
      .catch((err) => dispatch(failFetchFollowers(err)));
  };

  const handleFollowing = () => {
    setFollowers(false);
    setModal(true);
  };
  const handleClose = () => {
    setModal(false);
  };
  return (
    <>
      {id === userId ? (
        navigate("/profile")
      ) : !friendProfile.user.data ? (
        <BounceLoader color="#201e20" />
      ) : (
        <>
          <Modal show={showModal} handleClose={handleClose}>
            <br />
            {followers ? (
              !friendProfile.followers.data ? (
                <BounceLoader color="#201e20" />
              ) : (
                friendProfile.followers.data.map((item, index) => {
                  return (
                    <Link key={index} to={`/profile/${item._id}`}>
                      <span>
                        {item.first_name} {item.last_name}
                      </span>
                    </Link>
                  );
                })
              )
            ) : !friendProfile.following.data ? (
              <BounceLoader color="#201e20" />
            ) : (
              friendProfile.following.data.map((item, index) => {
                return (
                  <Link key={index} to={`/profile/${item._id}`}>
                    <span>{item.first_name}</span>
                  </Link>
                );
              })
            )}
          </Modal>
          <Navbar />
          <HeaderProfile dataUser={friendProfile.user.data} />

          <div className="container">
            <div>
              <CardFollowers
                dataFollowers={friendProfile.user.data.followers}
                dataFollowing={friendProfile.following.data}
                handleFollowers={handleFollowers}
                handleFollowing={handleFollowing}
              />
              <CardAboutMe dataUser={friendProfile.user.data} />
              <CardContactMe dataUser={friendProfile.user.data} />
              <CardGallery dataImage={empty} />
            </div>

            {/* Soon */}
            <div>
              <div className="card-posted">
                <div className="posted-header">
                  <img
                    src={empty}
                    alt="small profile pict"
                    className="profile-pict"
                  />
                  <div className="posted-name-date">
                    <span className="text-18-bold">
                      {friendProfile.user.data.first_name}{" "}
                      {friendProfile.user.data.last_name}
                    </span>
                    <span className="text-11">August 22, 2020 04.00 PM</span>
                  </div>
                </div>
                <div className="posted-content">
                  <span className="text-12">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Maxime mollitia, molestiae quas vel sint commodi repudiandae
                    consequuntur voluptatum laborum numquam blanditiis harum
                    quisquam eius sed odit fugiat.
                  </span>
                  <hr />
                  <div className="action-section">
                    <div className="like-btn">
                      <AiFillLike className="icon-20" />
                      <span className="text-14-bold">Like</span>
                    </div>
                    <div className="comment-btn">
                      <FaComment className="icon-20" />
                      <span className="text-14-bold">Comment</span>
                    </div>
                    <div className="share-btn">
                      <FaShareAlt className="icon-20" />
                      <span className="text-14-bold">Share</span>
                    </div>
                  </div>

                  <div className="comment-section">
                    <span className="text-11">
                      50 Likes 10 Comments 0 Shares
                    </span>
                    <span className="text-11">Show All Comments</span>
                  </div>
                  <div className="comment-box">
                    <div className="comment-header">
                      <img
                        src={empty}
                        alt="small profile pict"
                        className="comment-profile-pict"
                      />
                      <div className="comment-name-date">
                        <span className="text-13-bold">Aurellesia Warsito</span>
                        <span className="text-9">August 22, 2020 04.00 PM</span>
                      </div>
                    </div>
                    <div className="comment-content">
                      <span className="text-12">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Maxime mollitia, molestiae quas vel sint commodi
                        repudiandae consequuntur voluptatum laborum numquam
                        blanditiis harum quisquam eius sed odit fugiat
                      </span>
                    </div>
                    <div className="comment-act-section">
                      <span className="text-10-bold">Like</span>
                      <span className="text-10-bold">Reply</span>
                      <span className="text-10-bold">Share</span>
                    </div>
                  </div>

                  <div className="add-comment">
                    <img
                      src={empty}
                      alt="small profile pict"
                      className="reply-profile-pict"
                    />
                    <textarea
                      type="text"
                      name="comment"
                      id="comment"
                      placeholder="Add a comment"
                      className="comment-input"
                    />
                    <div className="comment-icon-section">
                      <label htmlFor="image-comment-input">
                        <MdInsertEmoticon className="comment-icon" />
                        <AiFillCamera className="comment-icon" />
                      </label>
                      <input
                        id="image-comment-input"
                        type="file"
                        multiple
                        accept="image/*"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* =================================== */}
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return { ...state };
};

export default connect(mapStateToProps)(FriendsProfile);
