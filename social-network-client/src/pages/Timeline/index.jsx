import "../../style/sass/styles.scss";
import Navbar from "../../components/Navbar";
import MdPhotoSizeSelectActual from "@meronex/icons/md/MdPhotoSizeSelectActual";
import BsCameraVideoFill from "@meronex/icons/bs/BsCameraVideoFill";
import AiFillLike from "@meronex/icons/ai/AiFillLike";
import FaComment from "@meronex/icons/fa/FaComment";
import FaShareAlt from "@meronex/icons/fa/FaShareAlt";
import AiFillCamera from "@meronex/icons/ai/AiFillCamera";
import MdInsertEmoticon from "@meronex/icons/md/MdInsertEmoticon";
import empty from "../../assets/icons/empty.png";

const Timeline = () => {
  return (
    <>
      <Navbar />
      <div className="container-tl">
        <div>
          <div className="card-post-tl">
            <div className="post-tl-title">
              <img
                src={empty}
                alt="small profile pict"
                className="profile-pict-tl"
              />
              <div className="posted-name-tl">
                <span className="text-14-bold">Aurellesia Warsito</span>
                <span className="text-11">Malang, Indonesia</span>
              </div>
            </div>
            <hr />
            <div className="post-tl-content">
              <form action="#" id="post-tl">
                <textarea
                  className="create-post-tl"
                  name="create-post"
                  id=""
                  placeholder="Create your new post"
                ></textarea>
              </form>
              <div className="button-post">
                <div className="media-upload">
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

                <div className="media-upload">
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
          </div>
        </div>

        <div className="card-posted-tl">
          <div className="card-posted">
            <div className="posted-header">
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                mollitia, molestiae quas vel sint commodi repudiandae
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
              {/* additional */}
              <div className="comment-section">
                <span className="text-11">50 Likes 10 Comments 0 Shares</span>
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
                    Maxime mollitia, molestiae quas vel sint commodi repudiandae
                    consequuntur voluptatum laborum numquam blanditiis harum
                    quisquam eius sed odit fugiat
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

          <div className="card-posted">
            <div className="posted-header">
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
                mollitia, molestiae quas vel sint commodi repudiandae
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
              {/* additional */}
              <div className="comment-section">
                <span className="text-11">50 Likes 10 Comments 0 Shares</span>
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
                    Maxime mollitia, molestiae quas vel sint commodi repudiandae
                    consequuntur voluptatum laborum numquam blanditiis harum
                    quisquam eius sed odit fugiat
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
      </div>
    </>
  );
};

export default Timeline;
