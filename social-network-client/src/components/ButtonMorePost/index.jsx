import CgMoreVerticalAlt from "@meronex/icons/cg/CgMoreVerticalAlt";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePosts, readPosts, viewPosts } from "../../api/posts";
import {
  failDeletePosts,
  failReadPosts,
  failViewPosts,
  successDeletePosts,
  successReadPosts,
  successViewPosts,
} from "../../redux/actions/posts";

const ButtonMorePost = ({ dataPost, setModalEdit, setId, setText }) => {
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState("");

  const handleMorePost = (id) => {
    if (!selectedId) {
      setSelectedId(id);
    } else {
      setSelectedId("");
    }
  };

  const showMorePost = (id) => {
    if (selectedId === id) {
      return "show-modal-more";
    } else {
      return "hide-modal-more";
    }
  };

  const handleEdit = async () => {
    setModalEdit(true);
    setId(selectedId);
    setSelectedId("");
    await viewPosts(selectedId)
      .then((res) => dispatch(successViewPosts(res)))
      .then((res) => setText(res.payload.data[0].text))
      .catch((err) => dispatch(failViewPosts(err)));
  };

  const handleDeletePost = async (id) => {
    await deletePosts(id)
      .then((res) => dispatch(successDeletePosts(res)))
      .then(() =>
        readPosts()
          .then((res) => dispatch(successReadPosts(res)))
          .catch((err) => dispatch(failReadPosts(err)))
      )
      .catch((err) => dispatch(failDeletePosts(err)));
    setSelectedId("");
  };

  return (
    <div>
      <div className="btn-more" onClick={() => handleMorePost(dataPost._id)}>
        <CgMoreVerticalAlt className="icon-20" />
      </div>
      <div className={`modal-more ${showMorePost(dataPost._id)}`}>
        <div type="button" className="more-action" onClick={handleEdit}>
          <span className="text-14">Edit Post</span>
        </div>
        <div
          className="more-action"
          onClick={() => handleDeletePost(dataPost._id)}
        >
          <span className="text-14">Delete Post</span>
        </div>
      </div>
    </div>
  );
};

export default ButtonMorePost;
