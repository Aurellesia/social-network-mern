import BounceLoader from "react-spinners/BounceLoader";
import { Link } from "react-router-dom";
import { config } from "../../config";
import empty from "../../assets/icons/empty.png";

const SearchModal = ({ showBox, data }) => {
  return (
    <div className="search-box-container">
      <div className={`search-box ${showBox}`}>
        {!data ? (
          <BounceLoader color="#201e20" />
        ) : (
          data.map((item, index) => {
            return (
              <Link
                key={index}
                to={`/profile/${item._id}`}
                className="link-user"
              >
                <img
                  src={
                    item.picture
                      ? `${config.api_host}/images/profiles/${item.picture}`
                      : empty
                  }
                  alt="small profile pict"
                  className="search-profile-pict"
                />
                {item.first_name} {item.last_name}
                <br />
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SearchModal;
