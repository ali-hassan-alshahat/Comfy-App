import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../utils/supabase";
import toast from "react-hot-toast";

const RegisterForm = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur", // ✅ validate when leaving input
  });
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleSignup = async (data) => {
    setServerError("");
    setLoading(true);

    try {
      const { fullname, email, password } = data;

      const { data: signupData, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { fullname },
        },
      });

      if (error) {
        setServerError(error.message);
      } else {
        if (signupData.session) {
          toast.success("🎉 Account created!");
        }
        onSuccess?.(); // ✅ close overlay
      }
    } catch {
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h3 className="text-center mb-3 mt-2">Register</h3>
      {serverError && <div className="alert alert-danger">{serverError}</div>}
      <form onSubmit={handleSubmit(handleSignup)}>
        <div className="mb-2">
          <label>Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your full name"
            {...register("fullname", { required: "Full name is required" })}
          />
          {errors.fullname && (
            <small className="text-danger">{errors.fullname.message}</small>
          )}
        </div>
        <div className="mb-2">
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
        <div className="mb-2">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              validate: (value) =>
                value.length < 8 ||
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
                  value,
                ) ||
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol from (@$!%*?&)",
            })}
          />
          {errors.password && (
            <small className="text-danger">{errors.password.message}</small>
          )}
        </div>
        <div className="mb-3">
          <label>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Re-enter password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <small className="text-danger">
              {errors.confirmPassword.message}
            </small>
          )}
        </div>
        <button type="submit" className="btn btn-dark w-100" disabled={loading}>
          {loading ? "Creating..." : "Create New Account"}
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
