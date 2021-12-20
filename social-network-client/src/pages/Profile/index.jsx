import "../../style/sass/styles.scss";
import Navbar from "../../components/Navbar";
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
import { useEffect } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import { fetchFollowing, fetchProfile } from "../../api/profile";
import {
  failFetchFollowing,
  failFetchProfile,
  successFetchFollowing,
  successFetchProfile,
} from "../../redux/actions/profile";
import BounceLoader from "react-spinners/BounceLoader";
import { config } from "../../config";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  failFetchFollowers,
  successFetchFollowers,
} from "../../redux/actions/profile";

import { fetchFollowers } from "../../api/profile";

const Profile = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile);
  const [modal, setModal] = useState(false);
  const [followers, setFollowers] = useState(false);
  const showModal = modal ? "show-modal" : "hide-modal";

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
    // eslint-disable-next-line
  }, [dispatch]);

  const handleFollowers = async () => {
    setFollowers(true);
    setModal(true);
    await fetchFollowers(userProfile.user._id)
      .then((res) => dispatch(successFetchFollowers(res)))
      .catch((err) => failFetchFollowers(err));
  };

  const handleFollowing = () => {
    setFollowers(false);
    setModal(true);
  };
  return (
    <>
      {!userProfile.user ? (
        <BounceLoader color="#201e20" />
      ) : (
        <>
          <div className={`modal-container ${showModal} `}>
            <div className={`modal `}>
              <div className="cancel-modal">
                <span onClick={(_) => setModal(false)}>&times;</span>
              </div>

              <br />
              {followers ? (
                !userProfile.followers.data ? (
                  <BounceLoader color="#201e20" />
                ) : (
                  userProfile.followers.data.map((item, index) => {
                    return (
                      <Link key={index} to={`/profile/${item._id}`}>
                        <span>
                          {item.first_name} {item.last_name}
                        </span>
                      </Link>
                    );
                  })
                )
              ) : !userProfile.following.data ? (
                <BounceLoader color="#201e20" />
              ) : (
                userProfile.following.data.map((item, index) => {
                  return (
                    <Link key={index} to={`/profile/${item._id}`}>
                      <span>{item.first_name}</span>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
          <Navbar />
          <div className="profile">
            <img
              src={
                userProfile.user.picture
                  ? `${config.api_host}/images/profiles/${userProfile.user.picture}`
                  : empty
              }
              alt="profile pict"
              className="main-profile-pict"
            />
            <span className="text-36-bold">
              {userProfile.user.first_name} {userProfile.user.last_name}
            </span>
            <span className="text-20">{userProfile.user.job}</span>
            <span className="text-12">{userProfile.user.current_city}</span>
          </div>
          <div className="container">
            <div>
              <div className="card-followers">
                <div className="followers-content">
                  <span className="text-24-bold">200</span>
                  <span className="text-14">Posts</span>
                </div>
                <div className="followers-content">
                  <span className="text-24-bold">
                    {!userProfile.user.followers ? (
                      <BounceLoader color="#201e20" />
                    ) : (
                      <span className="text-24-bold">
                        {userProfile.user.followers.length}
                      </span>
                    )}
                  </span>
                  <span className="text-14" onClick={handleFollowers}>
                    Followers
                  </span>
                </div>
                <div className="followers-content">
                  <span className="text-24-bold">
                    {!userProfile.following.data ? (
                      <BounceLoader color="#201e20" />
                    ) : (
                      <span className="text-24-bold">
                        {userProfile.following.data.length}
                      </span>
                    )}
                  </span>

                  <span className="text-14" onClick={handleFollowing}>
                    Following
                  </span>
                </div>
              </div>
              <div className="card-about-me">
                <div className="about-me-content">
                  <span className="text-18-bold">About Me</span>
                  <span className="text-12">{userProfile.user.bio}</span>
                  <hr />
                  <div className="edu-work">
                    <FaGraduationCap className="about-me-icon" />
                    <span className="text-12">
                      {userProfile.user.education}
                    </span>
                  </div>
                  <div className="edu-work">
                    <MdWork className="about-me-icon" />
                    <span className="text-12">
                      {userProfile.user.workplace}
                    </span>
                  </div>
                </div>
              </div>
              <div className="card-contact-me">
                <div className="contact-me-content">
                  <span className="text-18-bold">Contact Me</span>
                  <div className="sosmed">
                    <a
                      href={userProfile.user.instagram}
                      target={
                        userProfile.user.instagram !== "" ? "_blank" : "_self"
                      }
                      rel="noopener noreferrer"
                    >
                      <EnInstagramWithCircle className="contact-me-icon" />
                    </a>
                    <a
                      href={userProfile.user.linkedin}
                      target={
                        userProfile.user.linkedin !== "" ? "_blank" : "_self"
                      }
                      rel="noopener noreferrer"
                    >
                      <EnLinkedinWithCircle className="contact-me-icon" />
                    </a>
                    <a
                      href={userProfile.user.twitter}
                      target={
                        userProfile.user.twitter !== "" ? "_blank" : "_self"
                      }
                      rel="noopener noreferrer"
                    >
                      <EnTwitterWithCircle className="contact-me-icon" />
                    </a>
                    <a
                      href={userProfile.user.telegram}
                      target={
                        userProfile.user.telegram !== "" ? "_blank" : "_self"
                      }
                      rel="noopener noreferrer"
                    >
                      <FaTelegram className="contact-me-icon" />
                    </a>
                    <a
                      href={userProfile.user.facebook}
                      target={
                        userProfile.user.facebook !== "" ? "_blank" : "_self"
                      }
                      rel="noopener noreferrer"
                    >
                      <FaFacebook className="contact-me-icon" />
                    </a>
                    <a
                      href={`mail to: ${userProfile.user.business_email}`}
                      target={
                        userProfile.user.business_email !== ""
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
                      {userProfile.user.first_name} {userProfile.user.last_name}
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
              <div className="card-posted">
                <div className="posted-title">
                  <img
                    src={empty}
                    alt="small profile pict"
                    className="profile-pict"
                  />
                  <div className="posted-name-date">
                    <span className="text-18-bold">Aurellesia Warsito</span>
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

export default connect(mapStateToProps)(Profile);
