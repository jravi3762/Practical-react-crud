import { useForm } from "react-hook-form";
import InputField from "../../components/InputField";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../slice/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const cleanData = {
      username: data?.username.trim(),
      password: data?.password.trim(),
    };
    dispatch(loginUser(cleanData))
      .unwrap()
      .then(() => {
        navigate("/products");
      });
  };

  useEffect(() => {
    if (user?.token) {
      navigate("/products", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="login_page">
      <div className="log_in">
        <h2>Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Username"
            name="username"
            placeholder="Enter Username"
            register={register}
            rules={{ required: "Username required" }}
            error={errors.username?.message}
          />

          <InputField
            label="Password"
            type="password"
            name="password"
            placeholder="Enter Password"
            register={register}
            rules={{ required: "Password required" }}
            error={errors.password?.message}
          />

          <button type="submit" style={{ width: "100%" }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
