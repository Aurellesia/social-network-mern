import "../../style/sass/styles.scss";
import { config } from "../../config";
import empty from "../../assets/icons/empty.png";

const HeaderProfile = ({ dataUser }) => {
  return (
    <div className="profile">
      <img
        src={
          dataUser.picture
            ? `${config.api_host}/images/profiles/${dataUser.picture}`
            : empty
        }
        alt="profile pict"
        className="main-profile-pict"
      />
      <span className="text-36-bold">
        {dataUser.first_name} {dataUser.last_name}
      </span>
      <span className="text-20">{dataUser.job}</span>
      <span className="text-12">{dataUser.current_city}</span>
    </div>
  );
};
export default HeaderProfile;
