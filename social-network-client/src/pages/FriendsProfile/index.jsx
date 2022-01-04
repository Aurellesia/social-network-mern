import "../../style/sass/styles.scss";
import { useEffect, useState } from "react";
import { useDispatch, connect, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchFriendProfile, fetchFollowing } from "../../api/profile";
import { readPostsUser } from "../../api/posts";
import Navbar from "../../components/Navbar";
import BounceLoader from "react-spinners/BounceLoader";
import {
  failFetchFriendProfile,
  successFetchFriendProfile,
  successFetchFollowing,
  failFetchFollowing,
} from "../../redux/actions/profile";
import {
  failReadPostsUser,
  successReadPostsUser,
} from "../../redux/actions/posts";
import { useNavigate } from "react-router";
import ModalFollowers from "../../components/ModalFollowers";
import HeaderProfile from "../../components/HeaderProfile";
import CardFollowers from "../../components/CardFollowers";
import CardAboutMe from "../../components/CardAboutMe";
import CardContactMe from "../../components/CardContactMe";
import CardGallery from "../../components/CardGallery";
import ButtonFollow from "../../components/ButtonFollow";
import LinkFollowers from "../../components/LinkFollowers";
import HeaderPosted from "../../components/HeaderPosted";
import PostedContent from "../../components/PostedContent";
import ActionSection from "../../components/ActionSection";
import ActionCount from "../../components/ActionCount";
import CardComment from "../../components/CardComment";
import InputComment from "../../components/InputComment";

const FriendsProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const profileSelector = useSelector((state) => state.profile);
  const friendPostSelector = useSelector((state) => state.posts);
  const navigate = useNavigate();
  const [followers, setFollowers] = useState(false);
  const [modalFollowers, setModalFollowers] = useState(false);
  const showModalFollowers = modalFollowers ? "show-modal" : "hide-modal";

  const userId = localStorage.getItem("user_id")
    ? localStorage.getItem("user_id")
    : {};

  useEffect(() => {
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

  const closeModalFollowers = () => {
    setModalFollowers(false);
  };

  const reloadPostFriend = () => {
    readPostsUser(id)
      .then((res) => dispatch(successReadPostsUser(res)))
      .then((err) => dispatch(failReadPostsUser(err)));
  };
  return (
    <>
      {id === userId ? (
        navigate("/profile")
      ) : !profileSelector.userFriend.data ? (
        <BounceLoader color="#201e20" />
      ) : (
        <>
          <ModalFollowers
            title={followers ? "Followers" : "Following"}
            show={showModalFollowers}
            handleClose={closeModalFollowers}
          >
            {followers ? (
              !profileSelector.followers.data ? (
                <BounceLoader color="#201e20" />
              ) : (
                profileSelector.followers.data.map((item, index) => {
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
            ) : !profileSelector.following.data ? (
              <BounceLoader color="#201e20" />
            ) : (
              profileSelector.following.data.map((item, index) => {
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
            )}
          </ModalFollowers>
          <Navbar />
          <HeaderProfile dataUser={profileSelector.userFriend.data} />
          <ButtonFollow id={id} dataUser={profileSelector.userFriend.data} />

          <div className="container">
            <div>
              <CardFollowers
                dataFollowers={profileSelector.userFriend.data.followers}
                dataFollowing={profileSelector.following.data}
                dataUser={profileSelector.userFriend.data}
                setModalFollowers={setModalFollowers}
                setFollowers={setFollowers}
                dataPost={friendPostSelector.posted}
              />
              <CardAboutMe dataUser={profileSelector.userFriend.data} />
              <div className="sticky">
                <CardContactMe dataUser={profileSelector.userFriend.data} />
                <CardGallery dataImage={friendPostSelector.posted} />
              </div>
            </div>
            <div>
              {Object.keys(friendPostSelector.posted).length === 0 ? (
                <div>
                  <span className="text-14">No posts yet</span>
                </div>
              ) : (
                friendPostSelector.posted.map((item, index) => {
                  return (
                    <div key={index + 5} className="card-posted">
                      <div className="posted-header">
                        <HeaderPosted
                          dataUser={profileSelector.userFriend.data}
                          dataPost={item}
                        />
                      </div>

                      <div className="posted-content">
                        <PostedContent dataPost={item} />
                        <hr />
                        <ActionSection
                          dataPost={item}
                          userId={userId}
                          reloadPost={reloadPostFriend}
                        />
                        <ActionCount dataPost={item} />

                        {item.comments.map((com, index) => {
                          return (
                            <CardComment
                              key={index}
                              dataComment={com}
                              userId={userId}
                              reloadPost={reloadPostFriend}
                            />
                          );
                        })}
                        <InputComment
                          dataUser={profileSelector.user}
                          dataPost={item}
                          reloadPost={reloadPostFriend}
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

export default connect(mapStateToProps)(FriendsProfile);
