import "../../style/sass/styles.scss";
import logo from "../../assets/icons/logo_g.png";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { userLogin } from "../../api/auth";
import { loginUser } from "../../redux/actions/auth";

const statusList = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};
const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const [status, setStatus] = useState(statusList.idle);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (formData) => {
    const { data } = await userLogin(formData);
    if (data.error) {
      setError("password", {
        type: "InvalidCredential",
        message: data.message,
      });
      setStatus(statusList.error);
    } else {
      const { user, token } = data;
      dispatch(loginUser({ user, token }));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      localStorage.setItem("user_id", user._id);
      navigate("/");
    }
    setStatus(statusList.success);
  };
  return (
    <>
      <div className="signin-container">
        <div className="signin-card">
          <div className="signin-appname">
            <img className="signin-logo" src={logo} alt="signin-logo" />
            <span className="text-36-bold">eht</span>
          </div>
          <span className="text-24">LOGIN</span>
          <form action="#" id="signin-form" onSubmit={handleSubmit(onSubmit)}>
            <input
              className="signin-input"
              type="text"
              placeholder="Email"
              name="email"
              {...register("email")}
            />
            <div>
              <span className="error">{errors.email?.message}</span>
            </div>
            <input
              className="signin-input"
              type="password"
              placeholder="Password"
              name="password"
              {...register("password")}
            />
            <div>
              <span className="error">{errors.password?.message}</span>
            </div>
            <button
              className="signin-btn"
              type="submit"
              disabled={status === statusList.process}
            >
              {status === statusList.process ? "Sedang memproses..." : "LOGIN"}
            </button>
          </form>
          <NavLink to="/forget-password">
            <span className="text-11">Forgot Password ?</span>
          </NavLink>
        </div>
        <span className="text-14">
          Don't have an account ?{" "}
          <NavLink to="/register">
            <span className="text-14-bold">Register</span>
          </NavLink>
        </span>
      </div>
    </>
  );
};

export default SignIn;
