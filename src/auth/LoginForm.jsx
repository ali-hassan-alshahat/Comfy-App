import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../utils/supabase";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserId } from "../rtk/slices/cartSlice"; // ✅ import action

const LoginForm = ({ onClose }) => {
  const dispatch = useDispatch(); // ✅ init redux dispatcher
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur", // ✅ validate on blur (leaving input)
  });

  const [loading, setLoading] = useState(false);

  const handleLogin = async (data) => {
    setLoading(true);

    try {
      const { data: loginData, error } = await supabase.auth.signInWithPassword(
        {
          email: data.email,
          password: data.password,
        },
      );

      if (error) {
        toast.error(error.message);
      } else {
        const user = loginData?.user;
        if (user) {
          dispatch(setUserId(user.id)); // ✅ store user.id in redux
          localStorage.setItem("userId", user.id); // ✅ persist across refresh
        } else {
          dispatch(setUserId("guest"));
          localStorage.setItem("userId", "guest");
        }

        toast.success("Login successful 🎉");
        onClose?.(); // ✅ close overlay
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3 className="text-center mb-2 mt-2">Login</h3>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <small className="text-danger">{errors.email.message}</small>
          )}
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <small className="text-danger">{errors.password.message}</small>
          )}
        </div>
        <button type="submit" className="btn btn-dark w-100" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
