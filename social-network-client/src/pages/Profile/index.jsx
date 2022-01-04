import "../../style/sass/styles.scss";
import BounceLoader from "react-spinners/BounceLoader";
import { React, useEffect, useState } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//API
import { fetchFollowing, fetchProfile } from "../../api/profile";
import { createPosts, readPosts } from "../../api/posts";
//ACTIONS
import {
  failFetchFollowing,
  failFetchProfile,
  successFetchFollowing,
  successFetchProfile,
} from "../../redux/actions/profile";
import {
  failCreatePosts,
  failReadPosts,
  successCreatePosts,
  successReadPosts,
} from "../../redux/actions/posts";
//COMPONENT
import Navbar from "../../components/Navbar";
import ModalFollowers from "../../components/ModalFollowers";
import CardFollowers from "../../components/CardFollowers";
import CardAboutMe from "../../components/CardAboutMe";
import CardContactMe from "../../components/CardContactMe";
import CardGallery from "../../components/CardGallery";
import HeaderProfile from "../../components/HeaderProfile";
import CardPosting from "../../components/CardPosting";
import ModalEdit from "../../components/ModalEdit";
import HeaderPosted from "../../components/HeaderPosted";
import ButtonMorePost from "../../components/ButtonMorePost";
import PostedContent from "../../components/PostedContent";
import ActionSection from "../../components/ActionSection";
import ActionCount from "../../components/ActionCount";
import CardComment from "../../components/CardComment";
import InputComment from "../../components/InputComment";
import LinkFollowers from "../../components/LinkFollowers";

const Profile = () => {
  const dispatch = useDispatch();
  const [modalFollowers, setModalFollowers] = useState(false);
  const [followers, setFollowers] = useState(false);
  const [text, setText] = useState("");
  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const [modalEdit, setModalEdit] = useState(false);
  const userSelector = useSelector((state) => state.profile);
  const postsSelector = useSelector((state) => state.posts);
  const showModalFollowers = modalFollowers ? "show-modal" : "hide-modal";

  const userId = localStorage.getItem("user_id")
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

  const reloadPostProfile = () => {
    readPosts()
      .then((res) => dispatch(successReadPosts(res)))
      .catch((err) => dispatch(failReadPosts(err)));
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

  return (
    <>
      {!userSelector.user ? (
        <BounceLoader color="#201e20" />
      ) : (
        <>
          <ModalFollowers
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
                      key={index}
                      to={`/profile/${item._id}`}
                      className="link"
                    >
                      <LinkFollowers data={item} />
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
                    <LinkFollowers data={item} />
                  </Link>
                );
              })
            )}
          </ModalFollowers>
          <ModalEdit
            modalEdit={modalEdit}
            setModalEdit={setModalEdit}
            data={postsSelector}
            text={text}
            setText={setText}
            id={id}
          />
          <Navbar />
          <HeaderProfile dataUser={userSelector.user} />
          <div className="container">
            <div>
              <CardFollowers
                dataFollowers={userSelector.user.followers}
                dataFollowing={userSelector.following.data}
                dataUser={userSelector.user}
                setModalFollowers={setModalFollowers}
                setFollowers={setFollowers}
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
                    <div key={index} className="card-posted">
                      <div className="posted-header">
                        <HeaderPosted
                          dataUser={userSelector.user}
                          dataPost={item}
                        />
                        <ButtonMorePost
                          dataPost={item}
                          setModalEdit={setModalEdit}
                          setId={setId}
                          setText={setText}
                        />
                      </div>
                      <div className="posted-content" id="posted-content">
                        <PostedContent dataPost={item} />
                        <hr />
                        <ActionSection
                          dataPost={item}
                          userId={userId}
                          reloadPost={reloadPostProfile}
                        />
                        <ActionCount dataPost={item} />
                        {item.comments.map((com, index) => {
                          return (
                            <CardComment
                              key={index}
                              dataComment={com}
                              userId={userId}
                              reloadPost={reloadPostProfile}
                            />
                          );
                        })}
                        <InputComment
                          dataUser={userSelector.user}
                          dataPost={item}
                          reloadPost={reloadPostProfile}
                        />
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
