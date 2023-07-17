import React from "react";
import "../styles/signup.css";
import Navu from "./Navu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [uname, setUname] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [hospital, setHospital] = useState("");
  const [otpSent, setOtpSent] = useState(false); // Track if OTP has been sent
  const [otp, setOtp] = useState("");
  const [otpReceived, setOtpReceived] = useState(""); // Store the received OTP

  async function sendOtp() {
    try {
      const response = await fetch(
        "https://cancerserver.onrender.com/api/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();
      if (data.status === "ok") {
        window.alert("OTP sent successfully!");
        setOtpReceived(data.otp); // Store the received OTP in a separate state variable
        setOtpSent(true); // Set OTP sent state to true
      } else {
        window.alert("Failed to send OTP. Please try again!");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      window.alert("Failed to send OTP. Please try again!");
    }
  }

  async function verifyOtp(event) {
    event.preventDefault();
    if (otp === otpReceived) {
      // OTP verification successful
      window.alert("OTP verified!");
      setOtp(""); // Reset OTP state
      registerUser();
    } else {
      // OTP verification failed
      window.alert("Invalid OTP. Please try again!");
    }
  }

  async function registerUser() {
    try {
      const response = await fetch(
        "https://cancerserver.onrender.com/api/signup",
        {
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
            otp: otpReceived, // Use the received OTP for registration
          }),
        }
      );

      const data = await response.json();
      if (data.status === "yaya") {
        // Display success alert
        window.alert("Signup successful!");
        history.push("/login");
      } else {
        // Display invalid signup alert
        window.alert("Invalid signup!");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      window.alert("Failed to register user. Please try again!");
    }
  }

  return (
    <>
      <div id="nav1">
        <Navu />
      </div>
      <div class="container" id="dome21">
        <div class="container" id="resdesc21">
          <h2>
            <br />
            User Signup
          </h2>
        </div>
        <div id="loginfrms21">
          <form>
            <div class="mb-3">
              <label for="exampleInputName1" class="form-label">
                Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                class="form-control"
                id="exampleInputName1"
                placeholder="Name"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                placeholder="Email"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputUsername1" class="form-label">
                Username
              </label>
              <input
                value={uname}
                onChange={(e) => setUname(e.target.value)}
                type="text"
                class="form-control"
                id="exampleInputUsername1"
                placeholder="Username"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputHospital1" class="form-label">
                Hospital
              </label>
              <input
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
                type="text"
                class="form-control"
                id="exampleInputHospital1"
                placeholder="Hospital"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputMobileNo1" class="form-label">
                Mobile No.
              </label>
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                type="number"
                class="form-control"
                id="exampleInputMobileNo1"
                placeholder="Mobile Number"
              />
            </div>
            <br />
            {!otpSent && ( // Render the Send OTP button only if OTP has not been sent
              <button
                type="button"
                class="btn btn-primary"
                onClick={sendOtp}
              >
                Send OTP
              </button>
            )}
            {otpSent && ( // Render the Verify OTP and Sign Up button if OTP has been sent
              <>
                <br />
                <br />
                <div class="mb-3">
                  <label for="exampleInputOTP" class="form-label">
                    Enter OTP
                  </label>
                  <input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    type="text"
                    class="form-control"
                    id="exampleInputOTP"
                    placeholder="OTP"
                  />
                </div>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={verifyOtp}
                >
                  Verify OTP & Sign Up
                </button>
              </>
            )}
          </form>
        </div>
      </div>
      <br />
      <br />
    </>
  );
}

export default SignUp;
