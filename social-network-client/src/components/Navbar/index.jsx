import "../../style/sass/styles.scss";
import BiHome from "@meronex/icons/bi/BiHome";
import BiBell from "@meronex/icons/bi/BiBell";
import FiSettings from "@meronex/icons/fi/FiSettings";
import MdPersonOutline from "@meronex/icons/md/MdPersonOutline";
import FiLogOut from "@meronex/icons/fi/FiLogOut";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/icons/logo_g.png";
import { useState } from "react";
import { fetchSearch } from "../../api/search";
import { useDispatch, useSelector } from "react-redux";
import { failSearch, successSearch } from "../../redux/actions/search";
import debounce from "debounce-promise";
import BounceLoader from "react-spinners/BounceLoader";

const Navbar = () => {
  const [box, setBox] = useState(false);
  const [keyword, setKeyword] = useState("");
  const showBox = box ? "show-search-box" : "hide-search-box";
  const dispatch = useDispatch();
  const list = useSelector((state) => state.search);
  const params = { q: keyword };
  const debouncedFetchSearch = debounce(fetchSearch, 500);

  const handleChange = async (e) => {
    e.target.value === "" ? setBox(false) : setBox(true);
    setKeyword(e.target.value);

    try {
      await debouncedFetchSearch(params)
        .then((res) => dispatch(successSearch(res)))
        .catch((err) => dispatch(failSearch(err)));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="navbar">
        <img className="logo" src={logo} alt="logo" />
        <span className="app-name">Geht</span>
        <div>
          <input
            className="search-input"
            type="text"
            placeholder="Search user here"
            onChange={handleChange}
            value={keyword}
          />
        </div>
        <ul className="navlink-wrapper">
          <li className="navlink">
            <NavLink to="/">
              <BiHome className="icon-link" />
            </NavLink>
          </li>
          <li className="navlink">
            <NavLink to="/">
              <BiBell className="icon-link" />
            </NavLink>
          </li>
          <li className="navlink">
            <NavLink to="/setting">
              <FiSettings className="icon-link" />
            </NavLink>
          </li>
          <li className="navlink">
            <NavLink to="/profile">
              <MdPersonOutline className="icon-link" />
            </NavLink>
          </li>
          <li className="navlink">
            <NavLink to="/logout">
              <FiLogOut className="icon-link" />
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="search-box-container">
        <div className={`search-box ${showBox}`}>
          {!list.result ? (
            <BounceLoader color="#201e20" />
          ) : (
            list.result.map((item) => {
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
    </>
  );
};

export default Navbar;
