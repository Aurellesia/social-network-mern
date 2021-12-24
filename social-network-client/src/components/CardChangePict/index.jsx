import "../../style/sass/styles.scss";
import { config } from "../../config";
import empty from "../../assets/icons/empty.png";
import { useForm } from "react-hook-form";

const CardChangePict = ({ onSubmit, dataImage, setImage, handleDelete }) => {
  const { handleSubmit } = useForm();

  return (
    <div className="card-change-pass-pict">
      <span className="text-24-bold">Change Profile Pict</span>
      <hr />
      <form id="change-pict" onSubmit={handleSubmit(onSubmit)}>
        <img
          src={
            dataImage !== ""
              ? `${config.api_host}/images/profiles/${dataImage}`
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
      <div className="delete-btn-section">
        <button type="submit" onClick={handleDelete}>
          Delete Photo
        </button>
      </div>

      <span className="text-24-bold">Change Password</span>
      <hr />
      <form action="#" id="change_pass">
        <label className="text-14-bold" htmlFor="change_pass">
          New Password
        </label>
        <input type="password" id="change_pass_input" name="change_pass" />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CardChangePict;
