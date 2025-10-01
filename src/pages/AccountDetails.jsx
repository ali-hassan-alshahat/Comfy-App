import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const AccountDetails = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("orders");
  const [loading, setLoading] = useState(true);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Egyptian Governorates List (same as checkout)
  const egyptianGovernorates = [
    "Cairo",
    "Alexandria",
    "Giza",
    "Qalyubia",
    "Port Said",
    "Suez",
    "Dakahlia",
    "Sharqia",
    "Menofia",
    "Gharbia",
    "Beheira",
    "Ismailia",
    "Faiyum",
    "Beni Suef",
    "Minya",
    "Asyut",
    "Sohag",
    "Qena",
    "Luxor",
    "Aswan",
    "Red Sea",
    "New Valley",
    "Matrouh",
    "North Sinai",
    "South Sinai",
    "Damietta",
    "Kafr El Sheikh",
    "6th of October",
    "Helwan",
    "New Cairo",
  ].sort();

  // ✅ react-hook-form for account info
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ✅ react-hook-form for password form
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPasswordForm,
  } = useForm();

  // ✅ Fetch user orders
  const fetchOrders = async (userId) => {
    if (!userId) return;

    setOrdersLoading(true);
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setOrdersLoading(false);
    }
  };

  // ✅ Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ✅ Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "processing":
        return "info";
      case "shipped":
        return "primary";
      case "delivered":
        return "success";
      case "cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  // ✅ Fetch user and profile info
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
        if (user) {
          // Fetch user profile
          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();
          if (!error && data) {
            reset({
              fullname: data.full_name || user.user_metadata?.fullname || "",
              email: user.email,
              phone: data.phone || "",
              governorate: data.governorate || "",
              city: data.city || "",
              street: data.street || "",
              building: data.building || "",
            });
          } else {
            reset({
              fullname: user.user_metadata?.fullname || "",
              email: user.email,
              phone: "",
              governorate: "",
              city: "",
              street: "",
              building: "",
            });
          }
          // Fetch user orders
          fetchOrders(user.id);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "SIGNED_UP") {
        const u = session?.user;
        setUser(u);
        reset({
          fullname: u?.user_metadata?.fullname || "",
          email: u?.email || "",
          phone: "",
          governorate: "",
          city: "",
          street: "",
          building: "",
        });
        if (u) fetchOrders(u.id);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setOrders([]);
        reset({});
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [reset]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setOrders([]);
    toast.success("Logged out successfully");
    navigate("/");
  };

  // ✅ Update Account Info
  const handleUpdateAccountInfo = async (data) => {
    if (!user) return;
    try {
      if (data.email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: data.email,
        });
        if (emailError) throw emailError;
      }
      const { error: metaError } = await supabase.auth.updateUser({
        data: { fullname: data.fullname },
      });
      if (metaError) throw metaError;
      const { error: profileError } = await supabase.from("profiles").upsert(
        {
          id: user.id,
          full_name: data.fullname,
          phone: data.phone,
          governorate: data.governorate,
          city: data.city,
          street: data.street,
          building: data.building,
        },
        { onConflict: "id" },
      );
      if (profileError) throw profileError;
      toast.success("Account information updated successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  // ✅ Change Password
  const handleChangePassword = async (data) => {
    if (!data.currentPassword || !data.newPassword || !data.confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (data.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    setUpdatingPassword(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user?.email,
      password: data.currentPassword,
    });
    if (signInError) {
      setUpdatingPassword(false);
      toast.error("Current password is incorrect");
      return;
    }
    const { error } = await supabase.auth.updateUser({
      password: data.newPassword,
    });
    setUpdatingPassword(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password updated successfully");
      resetPasswordForm();
    }
  };

  // 🔹 Show loading spinner while fetching
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="pt-5 pb-5">
        <div className="container">
          {user && (
            <>
              <div className="d-flex justify-content-between align-items-center col-12 col-lg-7">
                <div>
                  <h1>Account</h1>
                  <p className="h5 mt-2 mt-md-0">
                    <span>{user.user_metadata?.fullname}, </span>
                    <span className="text-secondary">{user.email}</span>
                  </p>
                </div>
                <button className="btn text-danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>
              <hr className="row col-12 col-lg-7 mt-5 ms-1" />
            </>
          )}
          {/* ✅ Tabs */}
          <div className="d-flex overflow-x-auto align-items-center">
            <div className="col-5 col-sm-4 col-lg-2">
              <div
                role="button"
                onClick={() => setActiveTab("orders")}
                className={`mx-auto mx-sm py-4 d-inline-block ${
                  activeTab === "orders"
                    ? "border-bottom border-2 border-dark"
                    : ""
                }`}
              >
                <h6
                  className={activeTab === "orders" ? "fw-bold mb-0" : "mb-0"}
                >
                  My Orders
                </h6>
              </div>
            </div>
            <div className="col-5 col-sm-4 col-lg-2">
              <div
                role="button"
                onClick={() => setActiveTab("account")}
                className={`mx-auto mx-sm py-4 d-inline-block ${
                  activeTab === "account"
                    ? "border-bottom border-2 border-dark"
                    : ""
                }`}
              >
                <h6
                  className={activeTab === "account" ? "fw-bold mb-0" : "mb-0"}
                >
                  Account Info
                </h6>
              </div>
            </div>
            <div className="col-5 col-sm-4 col-lg-2">
              <div
                role="button"
                onClick={() => setActiveTab("password")}
                className={`mx-auto mx-sm py-4 d-inline-block ${
                  activeTab === "password"
                    ? "border-bottom border-2 border-dark"
                    : ""
                }`}
              >
                <h6
                  className={activeTab === "password" ? "fw-bold mb-0" : "mb-0"}
                >
                  Change Password
                </h6>
              </div>
            </div>
          </div>
          <hr className="row col-12 col-lg-7 ms-1" />
          {/* ✅ Tab Content */}
          <div className="col-12 col-lg-7 pt-5">
            {activeTab === "orders" && (
              <div>
                <h2 className="mb-5">Your Orders</h2>

                {ordersLoading ? (
                  <div className="text-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading orders...</span>
                    </div>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-5">
                    <p className="text-muted">
                      You haven't placed any orders yet.
                    </p>
                    <button
                      className="btn btn-dark mt-3"
                      onClick={() => navigate("/")}
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="orders-list">
                    {orders.map((order) => (
                      <div key={order.id} className="card mb-4">
                        <div className="card-header bg-light">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <strong>Order #: {order.id.slice(-8)}</strong>
                              <br />
                              <small className="text-muted">
                                Placed on {formatDate(order.order_date)}
                              </small>
                            </div>
                            <span
                              className={`badge bg-${getStatusColor(
                                order.status,
                              )}`}
                            >
                              {order.status.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <div className="card-body">
                          {/* Order Items */}
                          <div className="mb-3">
                            <h6>Items:</h6>
                            {order.items.map((item, index) => (
                              <div
                                key={index}
                                className="d-flex align-items-center mb-2"
                              >
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="rounded me-3"
                                  style={{
                                    width: "50px",
                                    height: "50px",
                                    objectFit: "cover",
                                  }}
                                />
                                <div className="flex-grow-1">
                                  <p className="mb-0 fw-bold">{item.title}</p>
                                  <small className="text-muted">
                                    Qty: {item.quantity} × ${item.price}
                                    {item.color && (
                                      <span className="ms-2">
                                        Color:
                                        <span
                                          className="ms-1 d-inline-block rounded-circle"
                                          style={{
                                            width: "12px",
                                            height: "12px",
                                            backgroundColor: item.color,
                                            border: "1px solid #ccc",
                                          }}
                                        ></span>
                                      </span>
                                    )}
                                  </small>
                                </div>
                                <div className="text-end">
                                  <strong>
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </strong>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Shipping Address */}
                          <div className="mb-3">
                            <h6>Shipping Address:</h6>
                            <p className="mb-0">
                              {order.shipping_address.fullname}
                              <br />
                              {order.shipping_address.street},{" "}
                              {order.shipping_address.building}
                              <br />
                              {order.shipping_address.city},{" "}
                              {order.shipping_address.governorate}
                              <br />
                              {order.shipping_address.country}{" "}
                              {order.shipping_address.postalCode &&
                                `- ${order.shipping_address.postalCode}`}
                            </p>
                            <small className="text-muted">
                              Phone: {order.shipping_address.phone}
                            </small>
                          </div>

                          {/* Order Summary */}
                          <div className="border-top pt-3">
                            <div className="row">
                              <div className="col-6">
                                <small>Subtotal:</small>
                              </div>
                              <div className="col-6 text-end">
                                <small>${order.subtotal.toFixed(2)}</small>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-6">
                                <small>Shipping:</small>
                              </div>
                              <div className="col-6 text-end">
                                <small>${order.shipping_cost.toFixed(2)}</small>
                              </div>
                            </div>
                            <div className="row fw-bold mt-1">
                              <div className="col-6">
                                <span>Total:</span>
                              </div>
                              <div className="col-6 text-end">
                                <span>${order.total_amount.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {activeTab === "account" && (
              <div>
                <h2 className="mb-5">Account Information</h2>
                <form onSubmit={handleSubmit(handleUpdateAccountInfo)}>
                  <div className="mb-3">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter full name"
                      {...register("fullname", { required: true })}
                    />
                    {errors.fullname && (
                      <small className="text-danger">
                        Full name is required
                      </small>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <small className="text-danger">Email is required</small>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter phone number"
                      {...register("phone", {
                        pattern: {
                          value: /^01[0-2,5]{1}[0-9]{8}$/,
                          message: "Please enter a valid Egyptian phone number",
                        },
                      })}
                    />
                    {errors.phone && (
                      <small className="text-danger">
                        {errors.phone.message}
                      </small>
                    )}
                  </div>

                  {/* ✅ Updated: Governorate as Select Dropdown */}
                  <div className="mb-3">
                    <label className="form-label">Governorate</label>
                    <select
                      className="form-control"
                      {...register("governorate")}
                    >
                      <option value="">Select Governorate</option>
                      {egyptianGovernorates.map((gov) => (
                        <option key={gov} value={gov}>
                          {gov}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter city"
                      {...register("city")}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Street</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter street"
                      {...register("street")}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Building</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter building"
                      {...register("building")}
                    />
                  </div>
                  <button type="submit" className="btn btn-dark">
                    Save Information
                  </button>
                </form>
              </div>
            )}
            {activeTab === "password" && (
              <div>
                <h2 className="mb-5">Update your password</h2>
                <form onSubmit={handlePasswordSubmit(handleChangePassword)}>
                  <div className="mb-4">
                    <label className="form-label">Current Password</label>
                    <input
                      type="password"
                      className="form-control rounded-4"
                      placeholder="Please enter your current password"
                      {...registerPassword("currentPassword", {
                        required: true,
                      })}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      className="form-control rounded-4"
                      placeholder="Please enter your new password"
                      {...registerPassword("newPassword", { required: true })}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control rounded-4"
                      placeholder="Please confirm your new password"
                      {...registerPassword("confirmPassword", {
                        required: true,
                      })}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-dark"
                    disabled={updatingPassword}
                  >
                    {updatingPassword ? "Updating..." : "Update Password"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
