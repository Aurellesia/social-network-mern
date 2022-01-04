import "../../style/sass/styles.scss";
import BounceLoader from "react-spinners/BounceLoader";
import { useDispatch } from "react-redux";
import { editPosts, readPosts } from "../../api/posts";
import {
  failReadPosts,
  failUpdatePosts,
  successReadPosts,
  successUpdatePosts,
} from "../../redux/actions/posts";

const ModalEdit = ({ data, text, setText, id, modalEdit, setModalEdit }) => {
  const dispatch = useDispatch();
  const showModalEdit = modalEdit ? "show-modal" : "hide-modal";

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

  return (
    <div className={`modal-container ${showModalEdit} `}>
      <div className={`modal-edit `}>
        <div className="cancel-modal">
          <span onClick={closeModalEdit}>&times;</span>
        </div>
        <div>
          {!data.post.length ? (
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
  );
};

export default ModalEdit;
