import Navbar from "../../components/Navbar";
import "../../style/sass/styles.scss";
import { useDispatch, connect } from "react-redux";
import {
  deleteProfilePict,
  editProfile,
  editProfilePict,
  fetchProfile,
} from "../../api/profile";
import {
  failDeleteProfilePict,
  failFetchProfile,
  failUpdateProfile,
  failUpdateProfilePict,
  successDeleteProfilePict,
  successFetchProfile,
  successUpdateProfile,
  successUpdateProfilePict,
} from "../../redux/actions/profile";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import CardChangePict from "../../components/CardChangePict";

const Setting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, setError, setValue } = useForm();
  const [image, setImage] = useState("");

  useEffect(() => {
    fetchProfile()
      .then((data) => dispatch(successFetchProfile(data)))
      .then((data) => {
        setValue("first_name", data.payload.data.first_name);
        setValue("last_name", data.payload.data.last_name);
        setValue("job", data.payload.data.job);
        setValue("bio", data.payload.data.bio);
        setValue("current_city", data.payload.data.current_city);
        setValue("education", data.payload.data.education);
        setValue("linkedin", data.payload.data.linkedin);
        setValue("twitter", data.payload.data.twitter);
        setValue("instagram", data.payload.data.instagram);
        setValue("business_email", data.payload.data.business_email);
        setValue("telegram", data.payload.data.telegram);
        setImage(data.payload.data.picture);
      })
      .catch((err) => dispatch(failFetchProfile(err)));
  }, [dispatch, setValue]);

  const onSubmit = async (formData) => {
    const { data } = await editProfile(formData);
    if (data.error) {
      let fields = Object.keys(data.fields);
      fields.forEach((field) => {
        setError(field, {
          type: "server",
          message: data.fields[field]?.properties?.message,
        });
      });
      dispatch(failUpdateProfile(data.error));
      return;
    }
    dispatch(successUpdateProfile(formData));
    navigate("/profile");
  };

  const onSubmitPict = async () => {
    const pictFormData = new FormData();
    pictFormData.append("picture", image);
    try {
      await editProfilePict(pictFormData);
      dispatch(successUpdateProfilePict(pictFormData));
      window.location.reload();
      navigate("/setting");
    } catch (e) {
      dispatch(failUpdateProfilePict(e));
      console.log(e);
    }
  };

  const handleDeletePict = async () => {
    try {
      await deleteProfilePict();
      dispatch(successDeleteProfilePict());
      window.location.reload();
      navigate("/setting");
    } catch (err) {
      dispatch(failDeleteProfilePict(err));
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="setting-container">
        <CardChangePict
          onSubmit={onSubmitPict}
          dataImage={image}
          setImage={setImage}
          handleDelete={handleDeletePict}
        />

        <div className="card-setting">
          <span className="text-24-bold">Profile</span>
          <hr />
          <div className="setting-content">
            <form
              action="#"
              id="edit-profile"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label className="text-14-bold" htmlFor="first_name">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                onChange={(e) => setValue("first_name", e.target.value)}
                {...register("first_name")}
              />
              <label className="text-14-bold" htmlFor="last_name">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                onChange={(e) => setValue("last_name", e.target.value)}
                {...register("last_name")}
              />
              <label className="text-14-bold" htmlFor="job">
                Job
              </label>
              <input
                type="text"
                id="job"
                name="job"
                onChange={(e) => setValue("job", e.target.value)}
                {...register("job")}
              />
              <label className="text-14-bold" htmlFor="current_city">
                Current City
              </label>
              <input
                type="text"
                id="current_city"
                name="current_city"
                onChange={(e) => setValue("current_city", e.target.value)}
                {...register("current_city")}
              />
              <label className="text-14-bold" htmlFor="education">
                Education
              </label>
              <input
                type="text"
                id="education"
                name="education"
                onChange={(e) => setValue("education", e.target.value)}
                {...register("education")}
              />
              <label className="text-14-bold" htmlFor="bio">
                Bio
              </label>
              <textarea
                name="bio"
                id="bio"
                cols="30"
                rows="7"
                placeholder="Write about you"
                onChange={(e) => setValue("bio", e.target.value)}
                {...register("bio")}
              />
              <label className="text-14-bold" htmlFor="linkedin">
                Linkedin
              </label>
              <input
                type="text"
                id="linkedin"
                name="linkedin"
                placeholder="https://www.linkedin.com/in/youraccount/"
                onChange={(e) => setValue("linkedin", e.target.value)}
                {...register("linkedin")}
              />
              <label className="text-14-bold" htmlFor="twitter">
                Twitter
              </label>
              <input
                type="text"
                id="twitter"
                name="twitter"
                placeholder="https://twitter.com/youraccount"
                onChange={(e) => setValue("twitter", e.target.value)}
                {...register("twitter")}
              />
              <label className="text-14-bold" htmlFor="instagram">
                Instagram
              </label>
              <input
                type="text"
                id="instagram"
                name="instagram"
                placeholder="https://www.instagram.com/youraccount/"
                onChange={(e) => setValue("instagram", e.target.value)}
                {...register("instagram")}
              />
              <label className="text-14-bold" htmlFor="business_email">
                Business Email
              </label>
              <input
                type="text"
                id="business_email"
                name="business_email"
                placeholder="youremail@gmail.com"
                onChange={(e) => setValue("business_email", e.target.value)}
                {...register("business_email")}
              />
              <label className="text-14-bold" htmlFor="telegram">
                Telegram
              </label>
              <input
                type="text"
                id="telegram"
                name="telegram"
                placeholder="https://t.me/youraccount"
                onChange={(e) => setValue("telegram", e.target.value)}
                {...register("telegram")}
              />
            </form>

            <hr />
            <button type="submit" form="edit-profile">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return { ...state };
};

export default connect(mapStateToProps)(Setting);
