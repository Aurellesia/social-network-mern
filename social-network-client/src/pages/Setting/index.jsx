import Navbar from "../../components/Navbar";
import "../../style/sass/styles.scss";
import empty from "../../assets/icons/empty.png";
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
import { config } from "../../config";

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
        <div className="card-change-pass-pict">
          <span className="text-24-bold">Change Profile Pict</span>
          <hr />
          <form id="change-pict" onSubmit={handleSubmit(onSubmitPict)}>
            <img
              src={
                image !== ""
                  ? `${config.api_host}/images/profiles/${image}`
                  : empty
              }
              alt="profile-pict"
              className="profile-pict"
            />
            <input
              type="file"
              name="profile_pict"
              id="profile_pict"
              accept="image/*"
              onInput={(e) => setImage(e.target.files[0])}
            />
            <button type="submit" form="change-pict">
              Save Photo
            </button>
          </form>
          <div className="delete-btn">
            <button type="submit" onClick={handleDeletePict}>
              Delete Photo
            </button>
          </div>

          <span className="text-24-bold">Change Password</span>
          <hr />
          <form action="#" id="change_pass">
            <label htmlFor="change_pass">New Password</label>
            <input type="password" id="change_pass_input" name="change_pass" />
            <button type="submit">Save</button>
          </form>
        </div>

        <div className="card-setting">
          <span className="text-24-bold">Profile</span>
          <hr />
          <div className="setting-content">
            <form
              action="#"
              id="edit-profile"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label htmlFor="first_name">First Name</label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                onChange={(e) => setValue("first_name", e.target.value)}
                {...register("first_name")}
              />
              <label htmlFor="last_name">Last Name</label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                onChange={(e) => setValue("last_name", e.target.value)}
                {...register("last_name")}
              />
              <label htmlFor="job">Job</label>
              <input
                type="text"
                id="job"
                name="job"
                onChange={(e) => setValue("job", e.target.value)}
                {...register("job")}
              />
              <label htmlFor="current_city">Current City</label>
              <input
                type="text"
                id="current_city"
                name="current_city"
                onChange={(e) => setValue("current_city", e.target.value)}
                {...register("current_city")}
              />
              <label htmlFor="education">Education</label>
              <input
                type="text"
                id="education"
                name="education"
                onChange={(e) => setValue("education", e.target.value)}
                {...register("education")}
              />
              <label htmlFor="bio">Bio</label>
              <textarea
                name="bio"
                id="bio"
                cols="30"
                rows="7"
                placeholder="Write about you"
                onChange={(e) => console.log(e.target.value)}
                {...register("bio")}
              />
              <span className="text-24-bold">Social Media</span>
              <hr />
              <label htmlFor="linkedin">Linkedin</label>
              <input
                type="text"
                id="linkedin"
                name="linkedin"
                placeholder="https://www.linkedin.com/in/youraccount/"
                onChange={(e) => setValue("linkedin", e.target.value)}
                {...register("linkedin")}
              />
              <label htmlFor="twitter">Twitter</label>
              <input
                type="text"
                id="twitter"
                name="twitter"
                placeholder="https://twitter.com/youraccount"
                onChange={(e) => setValue("twitter", e.target.value)}
                {...register("twitter")}
              />
              <label htmlFor="instagram">Instagram</label>
              <input
                type="text"
                id="instagram"
                name="instagram"
                placeholder="https://www.instagram.com/youraccount/"
                onChange={(e) => setValue("instagram", e.target.value)}
                {...register("instagram")}
              />
              <label htmlFor="business_email">Business Email</label>
              <input
                type="text"
                id="business_email"
                name="business_email"
                placeholder="youremail@gmail.com"
                onChange={(e) => setValue("business_email", e.target.value)}
                {...register("business_email")}
              />
              <label htmlFor="telegram">Telegram</label>
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
