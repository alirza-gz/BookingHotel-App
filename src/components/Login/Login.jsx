import { useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import LoginImage from "../../assets/login.jpg";
import { useForm } from "react-hook-form";
import TextFieldInput from "../TextFieldInput/TextFieldInput";

function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(
    {
      mode: "all",
    },
    {
      defaultValues: {
        email: "",
        password: "",
      },
    }
  );

  const loginHandler = (data) => {
    if (data.email && data.password) login(data.email, data.password);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className="px-4 lg:px-0 my-8 md:my-14">
      <section className="flex items-center justify-center">
        <div className="bg-gray-100 p-5 flex rounded-2xl shadow-lg max-w-3xl">
          <div className="md:w-1/2 px-5">
            <h2 className="text-2xl font-bold text-[#002D74]">Login</h2>
            <p className="text-sm mt-4 text-[#002D74]">
              If you have an account, please login
            </p>
            <form
              className="mt-6 space-y-4"
              onSubmit={handleSubmit(loginHandler)}
            >
              <TextFieldInput
                label="Email Address"
                name="email"
                placeholder="Enter Email Address"
                register={register}
                required
                validationSchema={{
                  required: "Email is required",
                  minLength: {
                    value: 8,
                    message: "Please enter at least 8 characters",
                  },
                  maxLength: {
                    value: 30,
                    message: "Please enter a maximum of 30 characters",
                  },
                  pattern: {
                    value: /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                    message: "Please enter a valid email address",
                  },
                }}
                errors={errors}
                autoFocus
              />

              <TextFieldInput
                label="Password"
                name="password"
                type="password"
                placeholder="Enter Password"
                register={register}
                required
                validationSchema={{
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Please enter at least 8 characters",
                  },
                  maxLength: {
                    value: 15,
                    message: "Please enter a maximum of 15 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,15}$/g,
                    message:
                      "Please enter a valid password (password must contain at least one special character, number, uppercase letter, lowercase letter)",
                  },
                }}
                errors={errors}
                autoFocus={false}
              />

              <div className="text-right mt-2">
                <a
                  href="#"
                  className="text-sm font-semibold text-gray-700 hover:text-indigo-700 focus:text-indigo-700"
                >
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6"
              >
                Log In
              </button>
            </form>

            <div className="mt-7 grid grid-cols-3 items-center text-gray-500">
              <hr className="border-gray-500" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-500" />
            </div>

            <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 ">
              <FcGoogle className="w-4 h-4" />
              <span className="ml-4">Login with Google</span>
            </button>

            <div className="text-sm flex justify-between items-center mt-3">
              <p>If you dont have an account...</p>
              <button className="py-2 px-5 ml-3 bg-white border rounded-xl hover:scale-110 duration-300 border-indigo-400  ">
                Register
              </button>
            </div>
          </div>

          <div className="w-1/2 md:block hidden ">
            <img
              src={LoginImage}
              className="rounded-2xl object-cover"
              alt="page img"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
