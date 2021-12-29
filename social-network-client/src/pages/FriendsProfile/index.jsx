import "../../style/sass/styles.scss";
import { useEffect, useState } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchFriendProfile, fetchProfile, follow } from "../../api/profile";
import Navbar from "../../components/Navbar";
import BounceLoader from "react-spinners/BounceLoader";
import { config } from "../../config";
import {
  failFetchFriendProfile,
  failFollow,
  successFetchFollowers,
  successFetchFriendProfile,
  successFollow,
  failFetchFollowers,
  successFetchFollowing,
  failFetchFollowing,
  successFetchProfile,
  failFetchProfile,
} from "../../redux/actions/profile";
import AiFillLike from "@meronex/icons/ai/AiFillLike";
import FaComment from "@meronex/icons/fa/FaComment";
import FaShareAlt from "@meronex/icons/fa/FaShareAlt";
import empty from "../../assets/icons/empty.png";
import { useNavigate } from "react-router";
import { fetchFollowers, fetchFollowing } from "../../api/profile";
import Modal from "../../components/Modal";
import HeaderProfile from "../../components/HeaderProfile";
import CardFollowers from "../../components/CardFollowers";
import CardAboutMe from "../../components/CardAboutMe";
import CardContactMe from "../../components/CardContactMe";
import CardGallery from "../../components/CardGallery";
import convertDate from "../../utils/convertDate";
import CgMoreVerticalAlt from "@meronex/icons/cg/CgMoreVerticalAlt";

import {
  failLikePosts,
  failReadPostsUser,
  successLikePosts,
  successReadPostsUser,
} from "../../redux/actions/posts";
import { like, readPostsUser } from "../../api/posts";
import {
  failCreateComment,
  failDeleteComment,
  failLikeComment,
  successCreateComment,
  successDeleteComment,
  successLikeComment,
} from "../../redux/actions/comment";
import { createComment, deleteComment, likeComment } from "../../api/comment";

const FriendsProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [idPost, setIdPost] = useState("");
  const profileSelector = useSelector((state) => state.profile);
  const friendPostSelector = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [followers, setFollowers] = useState(false);
  const showModal = modal ? "show-modal" : "hide-modal";
  const [comment, setComment] = useState("");
  const [idComment, setIdComment] = useState("");

  let userId = localStorage.getItem("user_id")
    ? localStorage.getItem("user_id")
    : {};

  useEffect(() => {
    fetchProfile()
      .then((data) => dispatch(successFetchProfile(data)))
      .catch((err) => dispatch(failFetchProfile(err)));
    fetchFriendProfile(id)
      .then((res) => dispatch(successFetchFriendProfile(res)))
      .catch((err) => dispatch(failFetchFriendProfile(err)));
    fetchFollowing(id)
      .then((res) => dispatch(successFetchFollowing(res)))
      .then((err) => dispatch(failFetchFollowing(err)));
    readPostsUser(id)
      .then((res) => dispatch(successReadPostsUser(res)))
      .then((err) => dispatch(failReadPostsUser(err)));
  }, [dispatch, id]);

  const showBtnMore = (id) => {
    if (id === userId) {
      return "show-btn-more";
    } else {
      return "hide-btn-more";
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

  const handleLike = (postId) => {
    like(postId)
      .then((res) => dispatch(successLikePosts(res)))
      .then(() =>
        readPostsUser(id)
          .then((res) => dispatch(successReadPostsUser(res)))
          .then((err) => dispatch(failReadPostsUser(err)))
      )
      .catch((err) => dispatch(failLikePosts(err)));
  };

  const actionColor = (postLike, userId) => {
    if (postLike && postLike.includes(userId)) {
      return "liked-btn";
    } else {
      return "unlike-btn";
    }
  };
  const handleComment = (id) => {
    if (!idPost) {
      setIdPost(id);
    } else {
      setIdPost("");
    }
  };

  const handleSubmitComment = async (e) => {
    const commentData = new URLSearchParams();
    commentData.append("text", comment);
    e.preventDefault();
    await createComment(commentData, idPost)
      .then((res) => dispatch(successCreateComment(res)))
      .then(() =>
        readPostsUser(id)
          .then((res) => dispatch(successReadPostsUser(res)))
          .then((err) => dispatch(failReadPostsUser(err)))
      )
      .catch((err) => dispatch(failCreateComment(err)));
    setComment("");
  };

  const handleLikeComment = (idPost) => {
    likeComment(idPost)
      .then((res) => dispatch(successLikeComment(res)))
      .then(() =>
        readPostsUser(id)
          .then((res) => dispatch(successReadPostsUser(res)))
          .then((err) => dispatch(failReadPostsUser(err)))
      )
      .catch((err) => dispatch(failLikeComment(err)));
  };

  const handleMoreComment = (id) => {
    if (!idComment) {
      setIdComment(id);
    } else {
      setIdComment("");
    }
  };

  const showMoreComment = (id) => {
    if (idComment === id) {
      return "show-modal-more";
    } else {
      return "hide-modal-more";
    }
  };

  const handleDeleteComment = (idPost) => {
    deleteComment(idPost)
      .then((res) => dispatch(successDeleteComment(res)))
      .then(() =>
        readPostsUser(id)
          .then((res) => dispatch(successReadPostsUser(res)))
          .then((err) => dispatch(failReadPostsUser(err)))
      )
      .catch((err) => dispatch(failDeleteComment(err)));
  };
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
    <>
      {id === userId ? (
        navigate("/profile")
      ) : !profileSelector.userFriend.data ? (
        <BounceLoader color="#201e20" />
      ) : (
        <>
          <Modal show={showModal} handleClose={handleClose}>
            <br />
            {followers ? (
              !profileSelector.followers.data ? (
                <BounceLoader color="#201e20" />
              ) : (
                profileSelector.followers.data.map((item, index) => {
                  return (
                    <Link key={index} to={`/profile/${item._id}`}>
                      <span>
                        {item.first_name} {item.last_name}
                      </span>
                    </Link>
                  );
                })
              )
            ) : !profileSelector.following.data ? (
              <BounceLoader color="#201e20" />
            ) : (
              profileSelector.following.data.map((item, index) => {
                return (
                  <Link key={index} to={`/profile/${item._id}`}>
                    <span>{item.first_name}</span>
                  </Link>
                );
              })
            )}
          </Modal>
          <Navbar />
          <HeaderProfile dataUser={profileSelector.userFriend.data} />
          <button className="follow-btn" onClick={handleFollowBtn}>
            {profileSelector.userFriend.data.followers.includes(userId)
              ? "Unfollow"
              : "Follow"}
          </button>

          <div className="container">
            <div>
              <CardFollowers
                dataFollowers={profileSelector.userFriend.data.followers}
                dataFollowing={profileSelector.following.data}
                handleFollowers={handleFollowers}
                handleFollowing={handleFollowing}
                dataPost={friendPostSelector.posted}
              />
              <CardAboutMe dataUser={profileSelector.userFriend.data} />
              <CardContactMe dataUser={profileSelector.userFriend.data} />
              <CardGallery dataImage={empty} />
            </div>
            <div>
              {Object.keys(friendPostSelector.posted).length === 0 ? (
                <div>
                  <span className="text-14">No posts yet</span>
                </div>
              ) : (
                friendPostSelector.posted?.map((item, index) => {
                  return (
                    <div key={index + 5} className="card-posted">
                      <div className="posted-header">
                        <img
                          src={
                            profileSelector.userFriend.picture
                              ? `${config.api_host}/images/profiles/${profileSelector.userFriend.picture}`
                              : empty
                          }
                          alt="small profile pict"
                          className="profile-pict"
                        />
                        <div className="posted-name-date">
                          <span className="text-18-bold">
                            {profileSelector.userFriend.data.first_name}{" "}
                            {profileSelector.userFriend.data.last_name}
                          </span>
                          <span className="text-11">
                            {convertDate(item.createdAt)}
                          </span>{" "}
                        </div>
                      </div>

                      <div className="posted-content">
                        <span className="text-12">{item.text}</span>
                        <hr />
                        <div className="action-section">
                          <div
                            type="button"
                            className={`action-btn ${actionColor(
                              item.likes,
                              userId
                            )}`}
                            onClick={() => handleLike(item._id)}
                          >
                            <AiFillLike className="icon-20" />
                            <span className="text-14-bold">Like</span>
                          </div>
                          <div className="action-btn">
                            <FaComment className="icon-20" />
                            <span className="text-14-bold">Comment</span>
                          </div>
                          <div className="action-btn">
                            <FaShareAlt className="icon-20" />
                            <span className="text-14-bold">Share</span>
                          </div>
                        </div>

                        <div className="comment-section">
                          <span className="text-11">
                            {item.likes.length} Likes {item.comments.length}{" "}
                            Comments 0 Shares
                          </span>
                          <span className="text-11">Show All Comments</span>
                        </div>
                        {item.comments.map((com) => {
                          return (
                            <div className="comment-box">
                              <div className="comment-header">
                                <img
                                  src={`${config.api_host}/images/profiles/${com.user.picture}`}
                                  alt="small profile pict"
                                  className="comment-profile-pict"
                                />
                                <div className="comment-name-date">
                                  <span className="text-13-bold">
                                    {com.user.first_name} {com.user.last_name}
                                  </span>

                                  <span className="text-9">
                                    {convertDate(com.createdAt)}
                                  </span>
                                </div>

                                <div
                                  className={`btn-more ${showBtnMore(
                                    com.user._id
                                  )}`}
                                  onClick={() => handleMoreComment(com._id)}
                                >
                                  <CgMoreVerticalAlt className="icon-20" />
                                </div>
                                <div
                                  className={`modal-more-comment ${showMoreComment(
                                    com._id
                                  )}`}
                                >
                                  <div
                                    className="more-action"
                                    onClick={() => {
                                      handleDeleteComment(com._id);
                                    }}
                                  >
                                    <span className="text-14">Delete</span>
                                  </div>
                                </div>
                              </div>

                              <div className="comment-content">
                                <span className="text-12">{com.text}</span>
                              </div>
                              <div className="comment-act-section">
                                <span
                                  type="button"
                                  onClick={() => handleLikeComment(com._id)}
                                  className={`text-10-bold ${actionColor(
                                    com.likes,
                                    userId
                                  )}`}
                                >
                                  Like
                                </span>
                                <span className="text-10">
                                  {com.likes.length} Likes{" "}
                                </span>
                              </div>
                            </div>
                          );
                        })}

                        <div className="show-pop-comment">
                          <div className="add-comment">
                            <img
                              src={
                                profileSelector.user.picture
                                  ? `${config.api_host}/images/profiles/${profileSelector.user.picture}`
                                  : empty
                              }
                              alt="small profile pict"
                              className="reply-profile-pict"
                            />
                            <form
                              id="comment-form"
                              onSubmit={handleSubmitComment}
                            >
                              <textarea
                                onFocus={() => handleComment(item._id)}
                                name="text"
                                id="text"
                                placeholder="Add a comment"
                                className="comment-input"
                                onChange={(e) => setComment(e.target.value)}
                                value={comment}
                              />
                            </form>
                            <button type="submit" form="comment-form">
                              Comment
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
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
