import "../../style/sass/styles.scss";

import { useEffect } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchFriendProfile, follow } from "../../api/profile";
import Navbar from "../../components/Navbar";
import BounceLoader from "react-spinners/BounceLoader";
import {
  failFetchFriendProfile,
  failFollow,
  successFetchFriendProfile,
  successFollow,
} from "../../redux/actions/profile";
import FaGraduationCap from "@meronex/icons/fa/FaGraduationCap";
import MdWork from "@meronex/icons/md/MdWork";
import EnInstagramWithCircle from "@meronex/icons/en/EnInstagramWithCircle";
import EnLinkedinWithCircle from "@meronex/icons/en/EnLinkedinWithCircle";
import EnTwitterWithCircle from "@meronex/icons/en/EnTwitterWithCircle";
import FaTelegram from "@meronex/icons/fa/FaTelegram";
import FaFacebook from "@meronex/icons/fa/FaFacebook";
import EnMailWithCircle from "@meronex/icons/en/EnMailWithCircle";
import MdPhotoSizeSelectActual from "@meronex/icons/md/MdPhotoSizeSelectActual";
import BsCameraVideoFill from "@meronex/icons/bs/BsCameraVideoFill";
import AiFillLike from "@meronex/icons/ai/AiFillLike";
import FaComment from "@meronex/icons/fa/FaComment";
import FaShareAlt from "@meronex/icons/fa/FaShareAlt";
import AiFillCamera from "@meronex/icons/ai/AiFillCamera";
import MdInsertEmoticon from "@meronex/icons/md/MdInsertEmoticon";
import empty from "../../assets/icons/empty.png";
import { config } from "../../config";
import { useNavigate } from "react-router";

const FriendsProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const friendProfile = useSelector((state) => state.profile);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFriendProfile(id)
      .then((res) => dispatch(successFetchFriendProfile(res)))
      .catch((err) => dispatch(failFetchFriendProfile(err)));
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

  return (
    <>
      <Navbar />
      {id === userId ? (
        navigate("/profile")
      ) : !friendProfile.user.data ? (
        <BounceLoader color="#201e20" />
      ) : (
        <>
          <div className="profile">
            <img
              src={
                friendProfile.user.data.picture
                  ? `${config.api_host}/images/profiles/${friendProfile.user.data.picture}`
                  : empty
              }
              alt="profile pict"
              className="main-profile-pict"
            />
            <span className="text-36-bold">
              {friendProfile.user.data.first_name}{" "}
              {friendProfile.user.data.last_name}
            </span>

            <button className="follow-btn" onClick={handleFollowBtn}>
              {friendProfile.user.data.followers.includes(userId)
                ? "Unfollow"
                : "Follow"}
            </button>

            <span className="text-20">{friendProfile.user.data.job}</span>
            <span className="text-12">
              {friendProfile.user.data.current_city}
            </span>
          </div>
          <div className="container">
            <div>
              <div className="card-followers">
                <div className="followers-content">
                  <span className="text-24-bold">200</span>
                  <span className="text-14">Posts</span>
                </div>
                <div className="followers-content">
                  <span className="text-24-bold">200</span>
                  <Link to={`/followers/${friendProfile.user.data._id}`}>
                    <span className="text-14">Followers</span>
                  </Link>
                </div>
                <div className="followers-content">
                  <span className="text-24-bold">200</span>
                  <Link to={`/following/${friendProfile.user.data._id}`}>
                    <span className="text-14">Following</span>
                  </Link>
                </div>
              </div>
              <div className="card-about-me">
                <div className="about-me-content">
                  <span className="text-18-bold">About Me</span>
                  <span className="text-12">{friendProfile.user.data.bio}</span>
                  <hr />
                  <div className="edu-work">
                    <FaGraduationCap className="about-me-icon" />
                    <span className="text-12">
                      {friendProfile.user.data.education}
                    </span>
                  </div>
                  <div className="edu-work">
                    <MdWork className="about-me-icon" />
                    <span className="text-12">
                      {friendProfile.user.data.workplace}
                    </span>
                  </div>
                </div>
              </div>
              <div className="card-contact-me">
                <div className="contact-me-content">
                  <span className="text-18-bold">Contact Me</span>
                  <div className="sosmed">
                    <a
                      href={friendProfile.user.data.instagram}
                      target={
                        friendProfile.user.data.instagram !== ""
                          ? "_blank"
                          : "_self"
                      }
                      rel="noopener noreferrer"
                    >
                      <EnInstagramWithCircle className="contact-me-icon" />
                    </a>
                    <a
                      href={friendProfile.user.data.linkedin}
                      target={
                        friendProfile.user.data.linkedin !== ""
                          ? "_blank"
                          : "_self"
                      }
                      rel="noopener noreferrer"
                    >
                      <EnLinkedinWithCircle className="contact-me-icon" />
                    </a>
                    <a
                      href={friendProfile.user.data.twitter}
                      target={
                        friendProfile.user.data.twitter !== ""
                          ? "_blank"
                          : "_self"
                      }
                      rel="noopener noreferrer"
                    >
                      <EnTwitterWithCircle className="contact-me-icon" />
                    </a>
                    <a
                      href={friendProfile.user.data.telegram}
                      target={
                        friendProfile.user.data.telegram !== ""
                          ? "_blank"
                          : "_self"
                      }
                      rel="noopener noreferrer"
                    >
                      <FaTelegram className="contact-me-icon" />
                    </a>
                    <a
                      href={friendProfile.user.data.facebook}
                      target={
                        friendProfile.user.data.facebook !== ""
                          ? "_blank"
                          : "_self"
                      }
                      rel="noopener noreferrer"
                    >
                      <FaFacebook className="contact-me-icon" />
                    </a>
                    <a
                      href={`mail to: ${friendProfile.user.data.business_email}`}
                      target={
                        friendProfile.user.data.business_email !== ""
                          ? "_blank"
                          : "_self"
                      }
                      rel="noopener noreferrer"
                    >
                      <EnMailWithCircle className="contact-me-icon" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-gallery">
                <div className="gallery-content">
                  <span className="text-18-bold">Gallery</span>
                  <div className="pict-container">
                    <img
                      src={empty}
                      alt="gallery-pict"
                      className="gallery-pict"
                    />
                    <img
                      src={empty}
                      alt="gallery-pict"
                      className="gallery-pict"
                    />
                    <img
                      src={empty}
                      alt="gallery-pict"
                      className="gallery-pict"
                    />
                    <img
                      src={empty}
                      alt="gallery-pict"
                      className="gallery-pict"
                    />
                    <img
                      src={empty}
                      alt="gallery-pict"
                      className="gallery-pict"
                    />
                    <img
                      src={empty}
                      alt="gallery-pict"
                      className="gallery-pict"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="card-posting">
                <form action="#" id="form-post">
                  <textarea
                    className="create-post"
                    name="create-post"
                    id=""
                    rows="5"
                    cols="38"
                    placeholder="Create your new post"
                  />
                </form>
                <div className="button-post">
                  <div className="image-upload">
                    <label htmlFor="image-input">
                      <MdPhotoSizeSelectActual className="posting-icon" />
                    </label>
                    <input
                      id="image-input"
                      type="file"
                      multiple
                      accept="image/*"
                    />
                  </div>

                  <div className="video-upload">
                    <label htmlFor="video-input">
                      <BsCameraVideoFill className="posting-icon" />
                    </label>
                    <input
                      id="video-input"
                      type="file"
                      multiple
                      accept="video/*"
                    />
                  </div>

                  <button className="btn-post" type="submit" form="form-post">
                    <span className="text-14">Add Post</span>
                  </button>
                </div>
              </div>
              <div className="card-posted">
                <div className="posted-title">
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
                  <div className="like-comment-share">
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
                  <div className="comment-bubble">
                    <div className="comment-title">
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
                    <div className="like-reply-share">
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
                    <div className="image-comment">
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
