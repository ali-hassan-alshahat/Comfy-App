import React, { useEffect, useState } from "react";
import logo from "../assets/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { supabase } from "../utils/supabase";
import {
  selectCartItems,
  selectTotalAmount,
  clearCart,
  setGetTotals,
} from "../rtk/slices/cartSlice";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);

  const [loading, setLoading] = useState(true);
  const [selectedGovernorate, setSelectedGovernorate] = useState("");
  const [shippingStep, setShippingStep] = useState("information"); // "information" or "shipping"
  const [formData, setFormData] = useState({}); // Store form data for shipping step

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    getValues,
  } = useForm();

  // ✅ Watch governorate field for changes
  const watchGovernorate = watch("governorate");

  // ✅ Egyptian Governorates with their cities
  const governorateCities = {
    Cairo: [
      "Helwan",
      "New Cairo",
      "Nasr City",
      "Maadi",
      "Zamalek",
      "Dokki",
      "Mohandessin",
      "Harram",
      "Shubra",
      "Abbassia",
      "Heliopolis",
      "El Matareya",
      "Ain Shams",
      "El Marg",
      "El Salam",
      "El Nozha",
      "El Khalifa",
      "El Darb El Ahmar",
      "El Gamaliya",
      "El Zeiton",
      "El Basatin",
      "El Tebbin",
      "15 May City",
      "Badr City",
    ],
    Alexandria: [
      "Montaza",
      "Smouha",
      "Miami",
      "Sidi Gaber",
      "Roushdy",
      "El Labban",
      "El Attarin",
      "El Mansheya",
      "Karmouz",
      "El Gomrok",
      "El Anfushi",
      "Bolkly",
      "Cleopatra",
      "Glim",
      "Sidi Bishr",
      "Abu Qir",
      "Borg El Arab",
      "King Mariout",
    ],
    Giza: [
      "6th of October",
      "Sheikh Zayed",
      "El Haram",
      "El Omraniya",
      "El Ayyat",
      "El Badrasheen",
      "El Saff",
      "Atfih",
      "El Hawamdeyya",
      "Al Wahat El Bahariya",
    ],
    Qalyubia: [
      "Banha",
      "Shubra El Kheima",
      "Qalyub",
      "El Khanka",
      "Kafr Shukr",
      "Tukh",
      "Qaha",
      "Shibin El Qanater",
      "El Qanater El Khayreya",
    ],
    "Port Said": [
      "Port Fouad",
      "El Arab",
      "El Dawahi",
      "El Manakh",
      "El Zarayeb",
    ],
    Suez: ["Suez", "El Arbaeen", "El Ganayen", "Faisal", "Attaka"],
    Dakahlia: [
      "Mansoura",
      "Talkha",
      "Mit Ghamr",
      "Aga",
      "El Mansoura",
      "El Senbellawein",
      "El Matareya",
      "Bani Ebeid",
      "Dekernes",
      "Sherbin",
      "Gamasa",
      "Nabaruh",
    ],
    Sharqia: [
      "Zagazig",
      "10th of Ramadan",
      "Minya El Qamh",
      "Belbeis",
      "Mashtoul El Souk",
      "Al Qanayat",
      "Abu Hammad",
      "El Qurein",
      "Hehya",
      "Abu Kebir",
      "Faqous",
      "El Salheya El Gedida",
      "Kafr Saqr",
      "Awlad Saqr",
      "Minshat Abu Omar",
    ],
    Menofia: [
      "Shebin El Kom",
      "Menouf",
      "Sirs El Layan",
      "El Bagour",
      "Ashmoun",
      "El Shohada",
      "Quesna",
      "Berkat El Sabaa",
      "Tala",
      "Al Sadat City",
    ],
    Gharbia: [
      "Tanta",
      "El Mahalla El Kubra",
      "Kafr El Zayat",
      "Basioun",
      "Zefta",
      "Samannoud",
      "Qutur",
      "El Santa",
      "Shibin El Kom",
      "Badr",
      "Mahallet Demiana",
    ],
    Beheira: [
      "Damanhur",
      "Kafr El Dawwar",
      "Rashid",
      "Edku",
      "Abu El Matamir",
      "Hosh Essa",
      "Abu Hummus",
      "El Mahmoudiya",
      "El Rahmaniya",
      "Itay El Barud",
      "Kom Hamada",
      "Shubrakhit",
      "Wadi El Natrun",
      "Badr",
      "New Nubariya",
    ],
    Ismailia: [
      "Ismailia",
      "Fayed",
      "El Qantara",
      "El Qantara East",
      "Tell El Kebir",
      "Abu Suwir",
      "Kasaseen",
      "New Kasaseen",
    ],
    Faiyum: [
      "Faiyum",
      "Faiyum El Gedida",
      "Tamiya",
      "Sinnuris",
      "Ibsheway",
      "Yousef El Seddik",
      "El Atsa",
      "New Faiyum",
    ],
    "Beni Suef": [
      "Beni Suef",
      "Beni Suef El Gedida",
      "Al Wasta",
      "Nasser",
      "Ehnasia",
      "Beba",
      "El Fashn",
      "Somosta",
      "New Beni Suef",
    ],
    Minya: [
      "Minya",
      "Minya El Gedida",
      "El Idwa",
      "Maghagha",
      "Beni Mazar",
      "Matay",
      "Samalut",
      "Adwa",
      "Mallawi",
      "Deir Mawas",
      "Abu Qurqas",
      "Taha El Aamdid",
    ],
    Asyut: [
      "Asyut",
      "Asyut El Gedida",
      "Dayrout",
      "Manfalut",
      "El Qusiya",
      "Abnub",
      "El Ghanayem",
      "Sahel Selim",
      "El Badari",
      "Sidfa",
      "Moussa",
    ],
    Sohag: [
      "Sohag",
      "Sohag El Gedida",
      "Akhmim",
      "El Balyana",
      "El Maragha",
      "Al Manshah",
      "Girga",
      "Juhayna",
      "Saqultah",
      "Tima",
      "Tahta",
      "Dar El Salam",
    ],
    Qena: [
      "Qena",
      "Qena El Gedida",
      "Abu Tesht",
      "Nag Hammadi",
      "Deshna",
      "El Waqf",
      "Qift",
      "Naqada",
      "Qus",
      "Farshout",
      "New Qena",
    ],
    Luxor: [
      "Luxor",
      "New Luxor",
      "El Bayadiya",
      "El Ziniya",
      "Armant",
      "Esna",
      "Tiba",
    ],
    Aswan: [
      "Aswan",
      "Aswan El Gedida",
      "Daraw",
      "Kom Ombo",
      "Nasr El Nuba",
      "Kalabsha",
      "Edfu",
      "El Radisia",
      "El Basilia",
      "El Sebaiya",
    ],
    "Red Sea": [
      "Hurghada",
      "Sharm El Sheikh",
      "Dahab",
      "Marsa Alam",
      "Safaga",
      "El Gouna",
      "Ras Ghareb",
      "Halayeb",
      "Shalateen",
      "Abu Ramad",
      "Sahl Hasheesh",
    ],
    "New Valley": [
      "Kharga",
      "Dakhla",
      "Farafra",
      "Baris",
      "Mut",
      "Balat",
      "Paris",
    ],
    Matrouh: [
      "Marsa Matruh",
      "Siwa Oasis",
      "El Dabaa",
      "El Negaila",
      "Sidi Barrani",
      "Sallum",
      "El Hamam",
      "Fuka",
      "El Alamein",
    ],
    "North Sinai": [
      "El Arish",
      "Rafah",
      "Bir El Abd",
      "Sheikh Zuweid",
      "Nakhl",
      "El Hassana",
      "Al Qantarah",
      "Al Tor",
      "Al Hasana",
    ],
    "South Sinai": [
      "El Tor",
      "Sharm El Sheikh",
      "Dahab",
      "Nuweiba",
      "Ras Sidr",
      "Abu Zenima",
      "Saint Catherine",
      "Taba",
      "Noweiba",
    ],
    Damietta: [
      "Damietta",
      "New Damietta",
      "Ras El Bar",
      "Faraskur",
      "Kafr El Batikh",
      "Kafr Saad",
      "El Zarqa",
      "Sarw",
    ],
    "Kafr El Sheikh": [
      "Kafr El Sheikh",
      "Desouk",
      "Fuwwah",
      "Metoubes",
      "Bila",
      "El Reyad",
      "Qallin",
      "Sidi Salim",
      "Burj El Burj",
      "Sidi Ghazi",
    ],
    "6th of October": ["6th of October", "Sheikh Zayed", "El Hawamdeyya"],
    Helwan: ["Helwan", "15 May City", "Maasara", "Tura", "Kafr El Elow"],
    "New Cairo": [
      "New Cairo",
      "El Shorouk",
      "El Rehab",
      "Madinaty",
      "Badr",
      "Mostakbal City",
    ],
  };

  // ✅ Get cities based on selected governorate
  const getCitiesForGovernorate = (governorate) => {
    return governorateCities[governorate] || [];
  };

  // ✅ Update cities when governorate changes
  useEffect(() => {
    if (watchGovernorate) {
      setSelectedGovernorate(watchGovernorate);
      // Reset city when governorate changes
      setValue("city", "");
    }
  }, [watchGovernorate, setValue]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (!error && data) {
            setValue("fullname", data.full_name || "");
            setValue("phone", data.phone || "");
            setValue("governorate", data.governorate || "");
            setValue("city", data.city || "");
            setValue("street", data.street || "");
            setValue("building", data.building || "");
            setValue("postalCode", data.postal_code || "");

            // Set selected governorate for city filtering
            if (data.governorate) {
              setSelectedGovernorate(data.governorate);
            }
          } else {
            setValue("fullname", user.user_metadata?.fullname || "");
          }
          setValue("email", user.email);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    dispatch(setGetTotals());
  }, [dispatch, setValue]);

  // In your Checkout component, update the onSubmit function for shipping step:
  const onSubmit = async (data) => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    // If we're in information step, proceed to shipping
    if (shippingStep === "information") {
      // Store form data for shipping step display
      setFormData(data);
      setShippingStep("shipping");
      return;
    }

    // If we're in shipping step, confirm order
    Swal.fire({
      title: "Confirm Order?",
      text: "Do you want to place this order?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, place order",
      cancelButtonText: "Cancel",
      heightAuto: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Get current user
          const {
            data: { user },
          } = await supabase.auth.getUser();

          if (!user) {
            toast.error("You must be logged in to place an order");
            return;
          }

          // Create order in database
          const orderData = {
            user_id: user.id,
            shipping_address: {
              fullname: formData.fullname,
              phone: formData.phone,
              apartment: formData.apartment,
              building: formData.building,
              street: formData.street,
              governorate: formData.governorate,
              city: formData.city,
              postalCode: formData.postalCode,
              country: "Egypt",
            },
            items: cartItems.map((item) => ({
              product_id: item.id,
              title: item.title,
              price: item.discountPrice || item.price,
              original_price: item.price,
              quantity: item.quantity,
              color: item.selectedColor,
              image: item.img1,
            })),
            subtotal: totalAmount,
            shipping_cost: 15, // Standard shipping from your screenshot
            total_amount: totalAmount + 15,
            status: "pending",
            order_date: new Date().toISOString(),
          };

          // Insert order into database
          const { data: order, error } = await supabase
            .from("orders")
            .insert([orderData])
            .select()
            .single();

          if (error) throw error;

          // Clear cart and show success
          dispatch(clearCart());
          toast.success("Order placed successfully!");
          navigate("/account");
        } catch (error) {
          console.error("Error placing order:", error);
          toast.error("Failed to place order. Please try again.");
        }
      }
    });
  };
  const handleBackToInformation = () => {
    setShippingStep("information");
  };

  // Format address for display in shipping step
  const formatAddress = () => {
    if (!formData.street || !formData.city || !formData.governorate) return "";

    return `${formData.street}, ${formData.city}, ${formData.governorate}`;
  };

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
    <div className="container-fluid mt-4">
      {/* Header */}
      <header>
        <nav className="navbar navbar-expand-lg align-items-center">
          <div className="container-fluid">
            <Link to={"/"}>
              <img src={logo} alt="Logo" className="nav-img ms-4" />
            </Link>
          </div>
        </nav>
      </header>

      {/* Layout */}
      <div className="row mt-5">
        {/* Left Column - Form */}
        <div className="col-lg-6 col-md-12 col-12 mb-5 px-sm-0 px-md-5">
          {/* Breadcrumb */}
          <ol className="breadcrumb mb-4">
            <li className="breadcrumb-item">
              <Link to={"/cart"} style={{ color: "var(--main-gold)" }}>
                Cart
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link
                onClick={handleBackToInformation}
                style={{ color: "var(--main-gold)" }}
              >
                Information
              </Link>
            </li>
            <li className="breadcrumb-item active">Shipping</li>
          </ol>
          {shippingStep === "information" ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <h6 className="fw-bold">Contact</h6>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Phone"
                  className="form-control"
                  {...register("phone", {
                    required: "Phone is required",
                    pattern: {
                      value: /^01[0-2,5]{1}[0-9]{8}$/,
                      message: "Please enter a valid Egyptian phone number",
                    },
                  })}
                />
                {errors.phone && (
                  <small className="text-danger">{errors.phone.message}</small>
                )}
              </div>
              <h6 className="fw-bold mt-4">Shipping address</h6>
              <input
                type="text"
                placeholder="Full Name"
                className="form-control mt-2"
                {...register("fullname", { required: "Full name is required" })}
              />
              {errors.fullname && (
                <small className="text-danger">{errors.fullname.message}</small>
              )}
              <input
                type="text"
                placeholder="Apartment"
                className="form-control mt-3"
                {...register("apartment", {
                  required: "Apartment is required",
                })}
              />
              {errors.apartment && (
                <small className="text-danger">
                  {errors.apartment.message}
                </small>
              )}
              <input
                type="text"
                placeholder="Building"
                className="form-control mt-3"
                {...register("building", {
                  required: "Building is required",
                  validate: (v) => v !== "0" || "Building can't be 0",
                })}
              />
              {errors.building && (
                <small className="text-danger">{errors.building.message}</small>
              )}
              <input
                type="text"
                placeholder="Street"
                className="form-control mt-3"
                {...register("street", { required: "Street is required" })}
              />
              {errors.street && (
                <small className="text-danger">{errors.street.message}</small>
              )}
              <div className="row mt-3">
                <div className="col-6">
                  <input
                    type="text"
                    placeholder="Country"
                    className="form-control"
                    value="Egypt"
                    disabled
                  />
                </div>
                <div className="col-6">
                  {/* ✅ Governorate as Select Dropdown */}
                  <select
                    className="form-control"
                    {...register("governorate", {
                      required: "Please select a governorate",
                    })}
                  >
                    <option value="">Select Governorate</option>
                    {Object.keys(governorateCities).map((gov) => (
                      <option key={gov} value={gov}>
                        {gov}
                      </option>
                    ))}
                  </select>
                  {errors.governorate && (
                    <small className="text-danger">
                      {errors.governorate.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-6">
                  {/* ✅ City as Select Dropdown*/}
                  <select
                    className="form-control"
                    {...register("city", {
                      required: "Please select a city",
                    })}
                    disabled={!selectedGovernorate}
                  >
                    <option value="">
                      {selectedGovernorate
                        ? "Select City"
                        : "First select governorate"}
                    </option>
                    {selectedGovernorate &&
                      getCitiesForGovernorate(selectedGovernorate).map(
                        (city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ),
                      )}
                  </select>
                  {errors.city && (
                    <small className="text-danger">{errors.city.message}</small>
                  )}
                </div>
                <div className="col-6">
                  <input
                    type="text"
                    placeholder="Postal Code"
                    className="form-control"
                    {...register("postalCode", {
                      required: "Postal code is required",
                      pattern: {
                        value: /^\d{5}$/,
                        message: "Postal code must be exactly 5 digits",
                      },
                    })}
                  />
                  {errors.postalCode && (
                    <small className="text-danger">
                      {errors.postalCode.message}
                    </small>
                  )}
                </div>
              </div>
              <button type="submit" className="btn btn-dark w-100 mt-4">
                Continue to Shipping
              </button>
            </form>
          ) : (
            // Shipping Method Section
            <div className="shipping-method-section">
              <div className="contact-info mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="fw-bold mb-1">Contact</h6>
                    <p className="mb-0">
                      {formData.phone || "No phone provided"}
                    </p>
                  </div>
                  <button
                    className="btn btn-link p-0 text-decoration-underline"
                    style={{ color: "var(--main-gold)" }}
                    onClick={handleBackToInformation}
                  >
                    change
                  </button>
                </div>
              </div>
              <div className="ship-to-info mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="fw-bold mb-1">Ship to</h6>
                    <p className="mb-0">
                      {formatAddress() || "No address provided"}
                    </p>
                  </div>
                  <button
                    className="btn btn-link p-0 text-decoration-underline"
                    style={{ color: "var(--main-gold)" }}
                    onClick={handleBackToInformation}
                  >
                    change
                  </button>
                </div>
              </div>
              <hr />
              <div className="shipping-method mt-4">
                <h6 className="fw-bold mb-3">Shipping method</h6>
                <div className="shipping-option border rounded p-3 mb-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Standard</span>
                    <span className="fw-bold">$15</span>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button
                    className="btn btn-link p-0 text-decoration-underline"
                    style={{ color: "var(--main-gold)" }}
                    onClick={handleBackToInformation}
                  >
                    &lt; Return to information
                  </button>
                  <button
                    className="btn btn-dark"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Confirm order
                  </button>
                </div>
              </div>
              <div className="mt-5 text-center text-muted small">
                <p className="mb-0">All Rights Reserved to Comfy team</p>
              </div>
            </div>
          )}
        </div>
        {/* Right Column - Order Summary */}
        <div className="col-lg-6 col-md-12 col-12 px-sm-0 px-md-5">
          <div className="p-4 border rounded bg-light">
            {cartItems.map((item, i) => (
              <div
                key={i}
                className="d-flex align-items-center justify-content-between mb-3"
              >
                <div className="d-flex align-items-center">
                  <div className="position-relative me-3">
                    <img
                      src={item.img1 || "https://via.placeholder.com/50"}
                      alt={item.title}
                      className="rounded"
                      style={{ width: "60px", height: "60px" }}
                    />
                    <span className="badge bg-dark position-absolute top-0 end-0">
                      {item.quantity}
                    </span>
                  </div>
                  <div>
                    <p className="mb-0 small fw-bold">{item.title}</p>
                    {/* ✅ Updated: Show selected color */}
                    {item.selectedColor && (
                      <div className="d-flex align-items-center justify-content-start mt-1">
                        <span
                          style={{
                            display: "inline-block",
                            width: "14px",
                            height: "14px",
                            borderRadius: "50%",
                            backgroundColor: item.selectedColor,
                            marginRight: "6px",
                            border: "1px solid #ccc",
                          }}
                        ></span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-end">
                  <p className="mb-0 fw-semibold">
                    $
                    {item.discountPrice
                      ? (item.discountPrice * item.quantity).toFixed(2)
                      : (item.price * item.quantity).toFixed(2)}
                  </p>
                  {item.discountPrice && (
                    <small className="text-decoration-line-through text-muted">
                      ${(item.price * item.quantity).toFixed(2)}
                    </small>
                  )}
                </div>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Shipping</span>
              <span className="text-success">Free Shipping</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold">
              <span>Total</span>
              <span>USD ${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
