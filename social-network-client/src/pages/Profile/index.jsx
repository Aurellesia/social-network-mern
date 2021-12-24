import "../../style/sass/styles.scss";
import empty from "../../assets/icons/empty.png";
import BounceLoader from "react-spinners/BounceLoader";
import { React, useEffect, useState } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchFollowing,
  fetchProfile,
  fetchFollowers,
} from "../../api/profile";
import { createPosts, readPosts } from "../../api/posts";
import {
  failFetchFollowing,
  failFetchProfile,
  successFetchFollowing,
  successFetchProfile,
  failFetchFollowers,
  successFetchFollowers,
} from "../../redux/actions/profile";
import {
  failCreatePosts,
  failReadPosts,
  successCreatePosts,
  successReadPosts,
} from "../../redux/actions/posts";
import Navbar from "../../components/Navbar";
import Modal from "../../components/Modal";
import CardFollowers from "../../components/CardFollowers";
import CardAboutMe from "../../components/CardAboutMe";
import CardContactMe from "../../components/CardContactMe";
import CardGallery from "../../components/CardGallery";
import HeaderProfile from "../../components/HeaderProfile";
import CardPosting from "../../components/CardPosting";
import CardPosted from "../../components/CardPosted";
import MdPhotoSizeSelectActual from "@meronex/icons/md/MdPhotoSizeSelectActual";
import BsCameraVideoFill from "@meronex/icons/bs/BsCameraVideoFill";

const Profile = () => {
  const dispatch = useDispatch();
  const userSelector = useSelector((state) => state.profile);
  const postsSelector = useSelector((state) => state.posts);
  const [modal, setModal] = useState(false);
  const [followers, setFollowers] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [modalEdit, setModalEdit] = useState(false);
  const showModal = modal ? "show-modal" : "hide-modal";
  const showModalEdit = modalEdit ? "show-modal" : "hide-modal";

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
    // eslint-disable-next-line
  }, [dispatch]);

  const handleFollowers = async () => {
    setFollowers(true);
    setModal(true);
    await fetchFollowers(userSelector.user._id)
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

  const handleSubmit = async (e) => {
    const postsData = new FormData();
    postsData.append("text", text);
    if (image.length > 0) {
      image.forEach((item) => postsData.append("files", item));
    }
    e.preventDefault();
    await createPosts(postsData)
      .then((res) => dispatch(successCreatePosts(res)))
      .catch((err) => dispatch(failCreatePosts(err)));
    window.location.reload();
  };

  const handleEdit = () => {
    setModalEdit(true);
  };

  const closeEditModal = () => {
    setModalEdit(false);
  };

  function showPreview(e) {
    const imagePreview = [...e.target.files];
    if (imagePreview.length > 0) {
      imagePreview.map((item) => {
        let src = URL.createObjectURL(item);
        const preview = document.getElementById("preview");
        preview.src = src;
        preview.style.display = "flex";
        return preview;
      });
    }
  }
  const resetFile = () => {
    setImage("");
    const preview = document.getElementById("preview");
    preview.style.display = "none";
  };
  return (
    <>
      {!userSelector.user ? (
        <BounceLoader color="#201e20" />
      ) : (
        <>
          <Modal show={showModal} handleClose={handleClose}>
            <br />
            {followers ? (
              !userSelector.followers.data ? (
                <BounceLoader color="#201e20" />
              ) : (
                userSelector.followers.data.map((item, index) => {
                  return (
                    <Link key={index + 1} to={`/profile/${item._id}`}>
                      <span>
                        {item.first_name} {item.last_name}
                      </span>
                    </Link>
                  );
                })
              )
            ) : !userSelector.following.data ? (
              <BounceLoader color="#201e20" />
            ) : (
              userSelector.following.data.map((item, index) => {
                return (
                  <Link key={index + 2} to={`/profile/${item._id}`}>
                    <span>{item.first_name}</span>
                  </Link>
                );
              })
            )}
          </Modal>
          {/* Modal Edit */}
          <Modal show={showModalEdit} handleClose={closeEditModal}>
            <div>
              <form action="#" id="form-post" onSubmit={handleSubmit}>
                <textarea
                  className="post-box"
                  name="text"
                  id="text"
                  rows="5"
                  cols="38"
                  placeholder="Create your new post"
                  onChange={(e) => setText(e.target.value)}
                  // value={dataText}
                />
                <div>
                  <span className="error">
                    Pesan error
                    {/* {!dataText && dataPosts.error && "Text cannot be empty"} */}
                  </span>
                </div>
                <div className="input-section">
                  <div id="preview" className="preview">
                    <span className="text-12-bold">
                      1 Files
                      {/* {dataImage && `${dataImage.length}`} Files */}
                      <span
                        onClick={(_) => {
                          resetFile();
                        }}
                      >
                        &times;
                      </span>
                    </span>
                  </div>
                  <div>
                    <label htmlFor="images">
                      <MdPhotoSizeSelectActual className="posting-icon" />
                    </label>
                    <input
                      id="images"
                      name="images"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        setImage([...e.target.files]);
                        showPreview(e);
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="videos">
                      <BsCameraVideoFill className="posting-icon" />
                    </label>
                    <input id="videos" type="file" multiple accept="video/*" />
                  </div>

                  <button className="btn-post" type="submit" form="form-post">
                    <span className="text-14">Add Post</span>
                  </button>
                </div>
              </form>
            </div>
          </Modal>

          <Navbar />
          <HeaderProfile dataUser={userSelector.user} />
          <div className="container">
            <div>
              <CardFollowers
                dataFollowers={userSelector.user.followers}
                dataFollowing={userSelector.following.data}
                handleFollowers={handleFollowers}
                handleFollowing={handleFollowing}
              />
              <CardAboutMe dataUser={userSelector.user} />
              <CardContactMe dataUser={userSelector.user} />
              <CardGallery dataImage={empty} />
            </div>
            <div>
              <CardPosting
                handleSubmit={handleSubmit}
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
                    <CardPosted
                      key={index + 3}
                      dataUser={userSelector.user}
                      dataPosted={item}
                      handleEdit={handleEdit}
                    />
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
