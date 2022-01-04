import "../../style/sass/styles.scss";
import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import { readTimeline } from "../../api/posts";
import {
  failReadTimeline,
  successReadTimeline,
} from "../../redux/actions/posts";
import { useDispatch, connect, useSelector } from "react-redux";
import {
  failFetchProfile,
  successFetchProfile,
} from "../../redux/actions/profile";
import { fetchProfile } from "../../api/profile";
import HeaderPosted from "../../components/HeaderPosted";
import PostedContent from "../../components/PostedContent";
import ActionSection from "../../components/ActionSection";
import ActionCount from "../../components/ActionCount";
import CardComment from "../../components/CardComment";
import InputComment from "../../components/InputComment";

const Timeline = () => {
  const dispatch = useDispatch();
  const timelineSelector = useSelector((state) => state.posts);
  const profileSelector = useSelector((state) => state.profile);

  const userId = localStorage.getItem("user_id")
    ? localStorage.getItem("user_id")
    : {};

  useEffect(() => {
    fetchProfile()
      .then((data) => dispatch(successFetchProfile(data)))
      .catch((err) => dispatch(failFetchProfile(err)));
    readTimeline()
      .then((res) => dispatch(successReadTimeline(res)))
      .catch((err) => dispatch(failReadTimeline(err)));
  }, [dispatch]);

  const reloadPostTimeline = () => {
    readTimeline()
      .then((res) => dispatch(successReadTimeline(res)))
      .catch((err) => dispatch(failReadTimeline(err)));
  };
  return (
    <>
      <Navbar />
      <div className="container below-navbar">
        <div>
          {Object.keys(timelineSelector.posted).length === 0 ? (
            <div>
              <span className="text-14">No posts yet</span>
            </div>
          ) : (
            timelineSelector.posted.map((item, index) => {
              return (
                <div key={index} className="card-posted">
                  <div className="posted-header">
                    <HeaderPosted dataUser={item.user} dataPost={item} />
                  </div>
                  <div className="posted-content">
                    <PostedContent dataPost={item} />
                    <hr />
                    <ActionSection
                      dataPost={item}
                      userId={userId}
                      reloadPost={reloadPostTimeline}
                    />
                    <ActionCount dataPost={item} />
                    {item.comments.map((com, index) => {
                      return (
                        <CardComment
                          key={index}
                          dataComment={com}
                          userId={userId}
                          reloadPost={reloadPostTimeline}
                        />
                      );
                    })}
                    <InputComment
                      dataUser={profileSelector.user}
                      dataPost={item}
                      reloadPost={reloadPostTimeline}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return { ...state };
};

export default connect(mapStateToProps)(Timeline);
