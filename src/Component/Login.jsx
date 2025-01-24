import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { loginUser } from "../store/userAction";
import { toast } from "react-toastify";
export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const showHideHandler = () => {
    setShowPassword(!showPassword);
  };

  const { isLogginIN } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const handleLogin = () => {
    if (email.length == 0 || password.length < 6) {
      toast.error("Please enter valid email and password");
    } else if (!emailRegex.test(email)) {
      toast.error("Invalid email please enter valid email");
    } else {
      dispatch(loginUser(email, password));
      navigate("/todo");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-tr from-green-50 to-green-200 h-screen md:px-0 px-4">
      <div className="">
        <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
          <p className="text-left text-2xl font-bold text-gray-700">
            Welcome Back To <span className="text-3xl">Your Work</span>
          </p>
          <p className="mt-2 text-left text-gray-600">
            Welcome back, please enter your details.
          </p>
          <div className="flex flex-col pt-3 md:pt-8">
            <div className="flex flex-col pt-4">
              <div className="relative flex transition rounded-md">
                <input
                  type="email"
                  id="login-email"
                  className="w-full flex-1 bg-green-50 px-4 py-3 text-black placeholder:text-gray-600 outline-none rounded-md"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-12 flex flex-col pt-4">
              <div className="w-full px-4 py-3 bg-green-50 relative flex transition rounded-md">
                <input
                  type={showPassword ? "text" : "password"}
                  id="login-password"
                  required
                  className="w-full bg-transparent text-base text-black placeholder:text-gray-600 outline-none rounded-md"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className="flex items-center" onClick={showHideHandler}>
                  {!showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </span>
              </div>
              <span className="text-gray-700 text-right text-[14px] mr-1">
                Forgot Password?
              </span>
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-green-700 px-4 py-2 text-center text-lg font-bold text-gray-100 shadow-md"
              disabled={isLogginIN}
              onClick={handleLogin}
            >
              {isLogginIN ? "Processing..." : "Log IN"}
            </button>
          </div>
          <div className="py-12 text-center">
            <p className="whitespace-nowrap text-gray-600">
              Don't have an account?
              <span className="underline-offset-4 font-semibold text-gray-800 underline">
                Sign up for free.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
