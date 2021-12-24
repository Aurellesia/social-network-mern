import BounceLoader from "react-spinners/BounceLoader";
import { Link } from "react-router-dom";

const SearchModal = ({ showBox, data }) => {
  return (
    <div className="search-box-container">
      <div className={`search-box ${showBox}`}>
        {!data ? (
          <BounceLoader color="#201e20" />
        ) : (
          data.map((item) => {
            return (
              <>
                <Link to={`/profile/${item._id}`} onClick="#">
                  {item.first_name}
                </Link>
                <br />
              </>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SearchModal;
