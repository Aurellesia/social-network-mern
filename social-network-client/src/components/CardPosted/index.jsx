import "../../style/sass/styles.scss";
import empty from "../../assets/icons/empty.png";
import convertDate from "../../utils/convertDate";
import { config } from "../../config";

import CgMoreVerticalAlt from "@meronex/icons/cg/CgMoreVerticalAlt";
import AiFillLike from "@meronex/icons/ai/AiFillLike";
import FaComment from "@meronex/icons/fa/FaComment";
import FaShareAlt from "@meronex/icons/fa/FaShareAlt";
import AiFillCamera from "@meronex/icons/ai/AiFillCamera";
import MdInsertEmoticon from "@meronex/icons/md/MdInsertEmoticon";
import { useState } from "react";
import { Link } from "react-router-dom";

const CardPosted = ({ dataUser, dataPosted, handleEdit }) => {
  const [modalMore, setModalMore] = useState(false);
  const showModalMore = modalMore ? "show-modal-more" : "hide-modal-more";

  const handleClickMore = () => {
    setModalMore(!modalMore);
  };

  return (
    <>
      <div className="card-posted">
        <div className="posted-header">
          <img
            src={
              dataUser.picture
                ? `${config.api_host}/images/profiles/${dataUser.picture}`
                : empty
            }
            alt="small profile pict"
            className="profile-pict"
          />
          <div className="posted-name-date">
            <span className="text-18-bold">
              {dataUser.first_name} {dataUser.last_name}
            </span>
            <span className="text-11">{convertDate(dataPosted.createdAt)}</span>
          </div>
          <div>
            <span className="btn-more" onClick={handleClickMore}>
              <CgMoreVerticalAlt className="icon-20" />
              <div className={`modal-more ${showModalMore}`}>
                {/* <Link
                  className="more-action"
                  to={`posts/edit/${dataPosted._id}`}
                  onClick={handleEdit}
                >
                  <span className="text-14">Edit Post</span>
                </Link> */}
                <div
                  className="more-action"
                  onClick={() => {
                    // handleEdit;
                    console.log(dataPosted._id);
                  }}
                >
                  <span className="text-14">Edit Post</span>
                </div>
                <div className="more-action">
                  <span className="text-14">Delete Post</span>
                </div>
              </div>
            </span>
          </div>
        </div>

        <div className="posted-content">
          <span className="text-12">{dataPosted.text}</span>
          <div>
            {dataPosted.images.length < 0
              ? ""
              : dataPosted.images.map((pict, index) => {
                  return (
                    <div key={index + 4} className="posted-image-section">
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
            <div className="action-btn">
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
          {/* Additional */}
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit
              </span>
            </div>
            <div className="comment-act-section">
              <span className="text-10-bold">Like</span>
              <span className="text-10-bold">Reply</span>
              <span className="text-10-bold">Share</span>
            </div>
          </div>
          {/* ==================================== */}
          <div className="add-comment">
            <img
              src={
                dataUser.picture
                  ? `${config.api_host}/images/profiles/${dataUser.picture}`
                  : empty
              }
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
    </>
  );
};

export default CardPosted;
