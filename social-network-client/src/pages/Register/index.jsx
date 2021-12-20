import "../../style/sass/styles.scss";
import logo from "../../assets/icons/logo_g.png";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { userRegister } from "../../api/auth";

const statusList = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};
const Register = () => {
  const [status, setStatus] = useState(statusList.idle);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    const { data } = await userRegister(formData);
    if (data.error) {
      let fields = Object.keys(data.fields);
      fields.forEach((field) => {
        setError(field, {
          type: "server",
          message: data.fields[field]?.properties?.message,
        });
      });
      setStatus(statusList.error);
      return;
    }
    setStatus(statusList.success);
    navigate("/login");
  };
  return (
    <>
      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-appname">
            <img className="signup-logo" src={logo} alt="signup-logo" />
            <span className="text-36-bold">eht</span>
          </div>
          <span className="text-24">REGISTER</span>
          <form onSubmit={handleSubmit(onSubmit)} id="signup-form">
            <input
              className="signup-input"
              type="text"
              placeholder="First Name"
              name="first_name"
              {...register("first_name")}
            />
            <div>
              <span className="error">{errors.first_name?.message}</span>
            </div>
            <input
              className="signup-input"
              type="text"
              placeholder="Last Name"
              name="last_name"
              {...register("last_name")}
            />
            <div>
              <span className="error">{errors.last_name?.message}</span>
            </div>
            <input
              className="signup-input"
              type="text"
              placeholder="Email"
              name="email"
              {...register("email")}
            />
            <div>
              <span className="error">{errors.email?.message}</span>
            </div>
            <input
              className="signup-input"
              type="password"
              placeholder="Password"
              name="password"
              {...register("password")}
            />
            <div>
              <span className="error">{errors.password?.message}</span>
            </div>
            <button
              className="signup-btn"
              type="submit"
              disabled={status === statusList.process}
            >
              {status === statusList.process
                ? "Sedang memproses..."
                : "REGISTER"}
            </button>
          </form>
        </div>
        <span className="text-14">
          Already have an account ?{" "}
          <NavLink to="/login">
            <span className="text-14-bold">Login</span>
          </NavLink>
        </span>
      </div>
    </>
  );
};

export default Register;
