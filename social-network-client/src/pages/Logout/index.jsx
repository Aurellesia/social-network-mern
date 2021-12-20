import "../../style/sass/styles.scss";
import * as React from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { userLogout } from "../../api/auth";
import { logoutUser } from "../../redux/actions/auth";
import BounceLoader from "react-spinners/BounceLoader";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  React.useEffect(() => {
    userLogout()
      .then((_) => dispatch(logoutUser()))
      .then((_) => navigate("/login"));
  }, [dispatch, navigate]);

  return (
    <div>
      <BounceLoader color="#201e20" />
    </div>
  );
}
