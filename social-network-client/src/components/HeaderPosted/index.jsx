import { config } from "../../config";
import convertDate from "../../utils/convertDate";
import empty from "../../assets/icons/empty.png";

const HeaderPosted = ({ dataUser, dataPost }) => {
  return (
    <>
      <img
        src={
          dataUser.picture
            ? `${config.api_host}/images/profiles/${dataUser.picture}`
            : empty
        }
        alt="small profile pict"
        className="profile-pict"
      />
      <div className="posted-name-date">
        <span className="text-18-bold">
          {dataUser.first_name} {dataUser.last_name}
        </span>
        <span className="text-11">{convertDate(dataPost.createdAt)}</span>
      </div>
    </>
  );
};

export default HeaderPosted;
