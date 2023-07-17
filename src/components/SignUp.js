import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase.config";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OtpInput from "otp-input-react";
import { CgSpinner } from "react-icons/cg";
import { BsFillShieldLockFill, BsEnvelopeFill } from "react-icons/bs";
import { toast, Toaster } from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [uname, setUname] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [hospital, setHospital] = useState("");
  const [selectedOption, setSelectedOption] = useState(""); // Track selected OTP option
  const [otpSent, setOtpSent] = useState(false); // Track if OTP has been sent
  const [otp, setOtp] = useState(""); // Store the entered OTP
  const [loading, setLoading] = useState(false);

  async function sendOTP() {
    if (selectedOption === "email") {
      sendEmailOTP();
    } else if (selectedOption === "phone") {
      sendPhoneOTP();
    }
  }

  async function sendEmailOTP() {
    try {
      const response = await fetch("https://cancerserver.onrender.com/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.status === "ok") {
        toast.success("OTP sent successfully to your email!");
        setOtpSent(true);
      } else {
        toast.error("Failed to send OTP. Please try again!");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again!");
    }
  }

  async function sendPhoneOTP() {
    try {
      setLoading(true);
      const formatMobile = `+${mobile}`;
      const appVerifier = window.recaptchaVerifier;

      const confirmationResult = await auth.signInWithPhoneNumber(formatMobile, appVerifier);
      window.confirmationResult = confirmationResult;
      setLoading(false);
      toast.success("OTP sent successfully to your phone number!");
      setOtpSent(true);
    } catch (error) {
      console.error("Error sending OTP:", error);
      setLoading(false);
      toast.error("Failed to send OTP. Please try again!");
    }
  }

  async function verifyOTP() {
    setLoading(true);
    if (selectedOption === "email") {
      verifyEmailOTP();
    } else if (selectedOption === "phone") {
      verifyPhoneOTP();
    }
  }

  async function verifyEmailOTP() {
    try {
      const response = await fetch("https://cancerserver.onrender.com/api/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp, email }),
      });

      const data = await response.json();
      if (data.status === "verified") {
        toast.success("OTP verified!");
        registerUser();
      } else {
        toast.error("Invalid OTP. Please try again!");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Failed to verify OTP. Please try again!");
    }
    setLoading(false);
  }

  async function verifyPhoneOTP() {
    try {
      const result = await window.confirmationResult.confirm(otp);
      if (result.user) {
        toast.success("OTP verified!");
        registerUser();
      } else {
        toast.error("Invalid OTP. Please try again!");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Failed to verify OTP. Please try again!");
    }
    setLoading(false);
  }

  async function registerUser() {
    try {
      const response = await fetch("https://cancerserver.onrender.com/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          uname,
          mobile,
          password,
          hospital,
          otp,
        }),
      });

      const data = await response.json();
      if (data.status === "yaya") {
        toast.success("Signup successful!");
        navigate("/login");
      } else {
        toast.error("Invalid signup!");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Failed to register user. Please try again!");
    }
  }

  return (
    <section className="bg-emerald-500 flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />

        <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
          <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
            BREAST CANCER DETECTION PORTAL SIGNUP
          </h1>

          <div className="flex items-center justify-center">
            <button
              className={`btn-option ${
                selectedOption === "email" ? "btn-option-active" : ""
              }`}
              onClick={() => setSelectedOption("email")}
            >
              <BsEnvelopeFill size={20} />
              <span>Email</span>
            </button>

            <button
              className={`btn-option ${
                selectedOption === "phone" ? "btn-option-active" : ""
              }`}
              onClick={() => setSelectedOption("phone")}
            >
              <BsFillShieldLockFill size={20} />
              <span>Phone</span>
            </button>
          </div>

          {selectedOption === "email" && (
            <div>
              <label htmlFor="inputEmail" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="inputEmail"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}

          {selectedOption === "phone" && (
            <div>
              <label htmlFor="inputPhone" className="form-label">
                Phone Number
              </label>
              <PhoneInput
                country={"in"}
                value={mobile}
                onChange={(phone) => setMobile(phone)}
                inputProps={{
                  id: "inputPhone",
                  required: true,
                }}
              />
            </div>
          )}

          {otpSent && (
            <div className="mb-3">
              <label htmlFor="inputOTP" className="form-label">
                Enter OTP
              </label>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                separator={<span>-</span>}
                isInputNum
                shouldAutoFocus
              />
            </div>
          )}

          {!otpSent && (
            <button
              type="button"
              className="btn btn-primary w-full"
              onClick={sendOTP}
            >
              Send OTP
            </button>
          )}

          {otpSent && (
            <button
              type="button"
              className="btn btn-primary w-full"
              onClick={verifyOTP}
              disabled={loading}
            >
              {loading ? <CgSpinner className="animate-spin" size={20} /> : null}
              <span>Verify OTP & Sign Up</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SignUp;
