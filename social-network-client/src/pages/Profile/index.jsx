import "../../style/sass/styles.scss";
import empty from "../../assets/icons/empty.png";
import BounceLoader from "react-spinners/BounceLoader";
import { React, useEffect, useState } from "react";
import { useDispatch, connect, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  fetchFollowing,
  fetchProfile,
  fetchFollowers,
  follow,
} from "../../api/profile";
import {
  createPosts,
  deletePosts,
  editPosts,
  like,
  readPosts,
  viewPosts,
} from "../../api/posts";
import {
  failFetchFollowing,
  failFetchProfile,
  successFetchFollowing,
  successFetchProfile,
  failFetchFollowers,
  successFetchFollowers,
  successFollow,
  failFollow,
} from "../../redux/actions/profile";
import {
  failCreatePosts,
  failDeletePosts,
  failLikePosts,
  failReadPosts,
  failUpdatePosts,
  failViewPosts,
  successCreatePosts,
  successDeletePosts,
  successLikePosts,
  successReadPosts,
  successUpdatePosts,
  successViewPosts,
} from "../../redux/actions/posts";
import Navbar from "../../components/Navbar";
import Modal from "../../components/Modal";
import CardFollowers from "../../components/CardFollowers";
import CardAboutMe from "../../components/CardAboutMe";
import CardContactMe from "../../components/CardContactMe";
import CardGallery from "../../components/CardGallery";
import HeaderProfile from "../../components/HeaderProfile";
import CardPosting from "../../components/CardPosting";
// import CardPosted from "../../components/CardPosted";
// import ModalEdit from "../../components/ModalEdit";

// import MdPhotoSizeSelectActual from "@meronex/icons/md/MdPhotoSizeSelectActual";
// import BsCameraVideoFill from "@meronex/icons/bs/BsCameraVideoFill";

import convertDate from "../../utils/convertDate";
import { config } from "../../config";
import CgMoreVerticalAlt from "@meronex/icons/cg/CgMoreVerticalAlt";
import AiFillLike from "@meronex/icons/ai/AiFillLike";
import FaComment from "@meronex/icons/fa/FaComment";
import FaShareAlt from "@meronex/icons/fa/FaShareAlt";
import AiFillCamera from "@meronex/icons/ai/AiFillCamera";
import MdInsertEmoticon from "@meronex/icons/md/MdInsertEmoticon";
import {
  createComment,
  deleteComment,
  likeComment,
  readComment,
  viewComment,
} from "../../api/comment";
import {
  failCreateComment,
  failDeleteComment,
  failLikeComment,
  failReadComment,
  failViewComment,
  successCreateComment,
  successDeleteComment,
  successLikeComment,
  successReadComment,
  successViewComment,
} from "../../redux/actions/comment";

const Profile = () => {
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.profile);
  const postsSelector = useSelector((state) => state.posts);
  const commentSelector = useSelector((state) => state.comment);
  const [modalFollowers, setModalFollowers] = useState(false);
  const [followers, setFollowers] = useState(false);
  const [text, setText] = useState("");
  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [idPost, setIdPost] = useState("");
  const [idComment, setIdComment] = useState("");
  const [modalEdit, setModalEdit] = useState(false);
  const [comment, setComment] = useState("");
  const showModalFollowers = modalFollowers ? "show-modal" : "hide-modal";
  const showModalEdit = modalEdit ? "show-modal" : "hide-modal";
  const [offSet, setOffSet] = useState(0);
  const navigate = useNavigate();

  let userId = localStorage.getItem("user_id")
    ? localStorage.getItem("user_id")
    : {};

  useEffect(() => {
    fetchProfile()
      .then((data) => dispatch(successFetchProfile(data)))
      .catch((err) => dispatch(failFetchProfile(err)));
    fetchFollowing(userId)
      .then((res) => dispatch(successFetchFollowing(res)))
      .then((err) => dispatch(failFetchFollowing(err)));
    readPosts()
      .then((res) => dispatch(successReadPosts(res)))
      .catch((err) => dispatch(failReadPosts(err)));
  }, [dispatch, userId]);

  const handleFollowers = async () => {
    setFollowers(true);
    setModalFollowers(true);
    await fetchFollowers(userSelector.user._id)
      .then((res) => dispatch(successFetchFollowers(res)))
      .catch((err) => dispatch(failFetchFollowers(err)));
  };

  const handleFollowing = () => {
    setFollowers(false);
    setModalFollowers(true);
  };

  const closeModalFollowers = () => {
    setModalFollowers(false);
  };

  const handleSubmitPost = async (e) => {
    const postsData = new FormData();
    postsData.append("text", text);
    if (image.length > 0) {
      image.forEach((item) => postsData.append("files", item));
    }
    e.preventDefault();
    await createPosts(postsData)
      .then((res) => dispatch(successCreatePosts(res)))
      .then(() => setText(""))
      .then(() =>
        readPosts()
          .then((res) => dispatch(successReadPosts(res)))
          .catch((err) => dispatch(failReadPosts(err)))
      )
      .catch((err) => dispatch(failCreatePosts(err)));
    resetFile();
  };

  const resetFile = () => {
    setImage("");
    const preview = document.getElementById("preview");
    preview.style.display = "none";
  };
  const handleClickMore = (id) => {
    if (!selectedId) {
      setSelectedId(id);
    } else {
      setSelectedId("");
    }
  };

  const handleEdit = () => {
    setModalEdit(true);
    setId(selectedId);
    setSelectedId("");
    viewPosts(selectedId)
      .then((res) => dispatch(successViewPosts(res)))
      .then((res) => setText(res.payload.data[0].text))
      .catch((err) => dispatch(failViewPosts(err)));
  };

  const handleComment = (id) => {
    if (!idPost) {
      setIdPost(id);
    } else {
      setIdPost("");
    }
  };

  const handleDelete = (id) => {
    deletePosts(id)
      .then((res) => dispatch(successDeletePosts(res)))
      .then(() =>
        readPosts()
          .then((res) => dispatch(successReadPosts(res)))
          .catch((err) => dispatch(failReadPosts(err)))
      )
      .catch((err) => dispatch(failDeletePosts(err)));
    setSelectedId("");
  };
  const showBtnMore = (id) => {
    if (id === userId) {
      return "show-btn-more";
    } else {
      return "hide-btn-more";
    }
  };

  const handleDeleteComment = (id) => {
    deleteComment(id)
      .then((res) => dispatch(successDeleteComment(res)))
      .then(() =>
        readPosts()
          .then((res) => dispatch(successReadPosts(res)))
          .catch((err) => dispatch(failReadPosts(err)))
      )
      .catch((err) => dispatch(failDeleteComment(err)));
  };

  const closeModalEdit = () => {
    setModalEdit(false);
  };

  const handleSubmitUpdate = async (e) => {
    const postsDataEdit = new FormData();
    postsDataEdit.append("text", text);
    e.preventDefault();
    await editPosts(postsDataEdit, id)
      .then((res) => dispatch(successUpdatePosts(res)))
      .then(() =>
        readPosts()
          .then((res) => dispatch(successReadPosts(res)))
          .catch((err) => dispatch(failReadPosts(err)))
      )
      .catch((err) => dispatch(failUpdatePosts(err)));
    setModalEdit(false);
    setText("");
  };

  const handleSubmitComment = async (e) => {
    const commentData = new URLSearchParams();
    commentData.append("text", comment);
    e.preventDefault();
    await createComment(commentData, idPost)
      .then((res) => dispatch(successCreateComment(res)))
      .then(() =>
        readPosts()
          .then((res) => dispatch(successReadPosts(res)))
          .catch((err) => dispatch(failReadPosts(err)))
      )
      .catch((err) => dispatch(failCreateComment(err)));
    setComment("");
  };

  const showMore = (id) => {
    if (selectedId === id) {
      return "show-modal-more";
    } else {
      return "hide-modal-more";
    }
  };

  const handleLike = (postId) => {
    like(postId)
      .then((res) => dispatch(successLikePosts(res)))
      .then(() =>
        readPosts()
          .then((res) => dispatch(successReadPosts(res)))
          .catch((err) => dispatch(failReadPosts(err)))
      )
      .catch((err) => dispatch(failLikePosts(err)));
  };

  const handleLikeComment = (id) => {
    likeComment(id)
      .then((res) => dispatch(successLikeComment(res)))
      .then(() =>
        readPosts()
          .then((res) => dispatch(successReadPosts(res)))
          .catch((err) => dispatch(failReadPosts(err)))
      )
      .catch((err) => dispatch(failLikeComment(err)));
  };

  const actionColor = (postLike, userId) => {
    if (postLike && postLike.includes(userId)) {
      return "liked-btn";
    } else {
      return "unlike-btn";
    }
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

  const handleFollowBtn = async () => {
    try {
      await follow(id)
        .then((res) => dispatch(successFollow(res)))
        .catch((err) => dispatch(failFollow(err)));
    } catch (err) {
      console.log(err);
    }
  };

  const handleScroll = () => {
    // const cardLeft = document.getElementById("card-left");
    // const sticky = cardLeft.offsetTop;
    if (offSet === 670) {
      return "sticky";
    }
  };

  return (
    <>
      {!userSelector.user ? (
        <BounceLoader color="#201e20" />
      ) : (
        <>
          <Modal
            title={followers ? "Followers" : "Following"}
            show={showModalFollowers}
            handleClose={closeModalFollowers}
          >
            {followers ? (
              !userSelector.followers.data ? (
                <BounceLoader color="#201e20" />
              ) : (
                userSelector.followers.data.map((item, index) => {
                  return (
                    <Link
                      key={index + 1}
                      to={`/profile/${item._id}`}
                      className="link"
                    >
                      <div className="friend-link">
                        <img
                          src={
                            item.picture
                              ? `${config.api_host}/images/profiles/${item.picture}`
                              : empty
                          }
                          alt="followers pict"
                          className="followers-pict"
                        />
                        <div className="text-followers">
                          <span className="text-16-bold">
                            {item.first_name} {item.last_name}
                          </span>
                          <span className="text-11">{item.current_city}</span>
                        </div>
                      </div>
                    </Link>
                  );
                })
              )
            ) : !userSelector.following.data ? (
              <BounceLoader color="#201e20" />
            ) : (
              userSelector.following.data.map((item, index) => {
                return (
                  <Link
                    key={index + 1}
                    to={`/profile/${item._id}`}
                    className="link"
                  >
                    <div className="friend-link">
                      <img
                        src={
                          item.picture
                            ? `${config.api_host}/images/profiles/${item.picture}`
                            : empty
                        }
                        alt="followers pict"
                        className="followers-pict"
                      />
                      <div className="text-followers">
                        <span className="text-16-bold">
                          {item.first_name} {item.last_name}
                        </span>
                        <span className="text-11">{item.current_city}</span>
                      </div>
                    </div>
                  </Link>
                );
              })
            )}
          </Modal>

          <div className={`modal-container ${showModalEdit} `}>
            <div className={`modal-edit `}>
              <div className="cancel-modal">
                <span onClick={closeModalEdit}>&times;</span>
              </div>
              <div>
                {!postsSelector.post.length ? (
                  <BounceLoader color="#201e20" />
                ) : (
                  <>
                    <form
                      action="#"
                      id="form-edit-post"
                      onSubmit={handleSubmitUpdate}
                    >
                      <textarea
                        className="post-box"
                        name="text"
                        id="text"
                        rows="5"
                        cols="38"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                      />
                      <div className="input-section">
                        <button className="btn-post" type="submit">
                          <span className="text-14">Update Post</span>
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
          <Navbar />
          <HeaderProfile dataUser={userSelector.user} />
          <div className="container">
            <div>
              <CardFollowers
                dataFollowers={userSelector.user.followers}
                dataFollowing={userSelector.following.data}
                handleFollowers={handleFollowers}
                handleFollowing={handleFollowing}
                dataPost={postsSelector.posted}
              />
              <CardAboutMe dataUser={userSelector.user} />
              <div className="sticky">
                <CardContactMe dataUser={userSelector.user} />
                <CardGallery dataPost={postsSelector.posted} />
              </div>
            </div>
            <div>
              <CardPosting
                handleSubmit={handleSubmitPost}
                dataText={text}
                setText={setText}
                setImage={setImage}
                dataImage={image}
                dataPosts={postsSelector.posts}
              />
              {Object.keys(postsSelector.posted).length === 0 ? (
                <div>
                  <span className="text-14">No posts yet</span>
                </div>
              ) : (
                postsSelector.posted.map((item, index) => {
                  return (
                    <div key={index + 3} className="card-posted">
                      <div className="posted-header">
                        <img
                          src={
                            userSelector.user.picture
                              ? `${config.api_host}/images/profiles/${userSelector.user.picture}`
                              : empty
                          }
                          alt="small profile pict"
                          className="profile-pict"
                        />
                        <div className="posted-name-date">
                          <span className="text-18-bold">
                            {userSelector.user.first_name}{" "}
                            {userSelector.user.last_name}
                          </span>
                          <span className="text-11">
                            {convertDate(item.createdAt)}
                          </span>
                        </div>
                        <div>
                          <div
                            className="btn-more"
                            onClick={() => handleClickMore(item._id)}
                          >
                            <CgMoreVerticalAlt className="icon-20" />
                          </div>
                          <div className={`modal-more ${showMore(item._id)}`}>
                            <div
                              type="button"
                              className="more-action"
                              onClick={handleEdit}
                            >
                              <span className="text-14">Edit Post</span>
                            </div>
                            <div
                              className="more-action"
                              onClick={() => handleDelete(item._id)}
                            >
                              <span className="text-14">Delete Post</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="posted-content" id="posted-content">
                        <span className="text-12">{item.text}</span>
                        <div>
                          {item.images.length < 0
                            ? ""
                            : item.images.map((pict, index) => {
                                return (
                                  <div
                                    key={index + 4}
                                    className="posted-image-section"
                                  >
                                    <img
                                      className="posted-image"
                                      src={`${config.api_host}/images/posts/${pict}`}
                                      alt={pict}
                                    />
                                  </div>
                                );
                              })}
                        </div>
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

                          <div type="button" className="action-btn">
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
                                  src={
                                    com.user.picture
                                      ? `${config.api_host}/images/profiles/${com.user.picture}`
                                      : empty
                                  }
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

                        <div className={`show-pop-comment`}>
                          <div className={`add-comment`}>
                            <img
                              src={
                                userSelector.user.picture
                                  ? `${config.api_host}/images/profiles/${userSelector.user.picture}`
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
          </div>
        </>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return { ...state };
};

export default connect(mapStateToProps)(Profile);
