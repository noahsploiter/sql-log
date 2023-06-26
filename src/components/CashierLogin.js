import React from "react";

import "../resources/css/cashier_login.css";

import { useState, useEffect, useRef } from "react";
// import Loading from '../resources/images/loading.gif';
import {
  FaCheck,
  FaExclamationTriangle,
  FaSignOutAlt,
  FaSearch,
} from "react-icons/fa";
import { Link } from "react-router-dom";
const Background = require("../resources/img/green_bg.jpg");
const BlnLogo = require("../resources/img/back.png");
const Loading = require("../resources/img/loading.gif");

const base_url = "http://localhost:3000/";

const CashierLogin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(false);
  const [inProcess, setInProcess] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [confirmationNum, setConfirmationNum] = useState(100000);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailErrorCode, setEmailErrorCode] = useState(false);

  const [confirmConfirmNum, setConfirmConfirmNum] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    await setInProcess(true);
    //  await setTimeout(function () {
    //      checkCredentials({userName, password});
    // }, 5000);
    await checkCredentials({ userName, password });
    setInProcess(false);
    //  sessionStorage.setItem('cashier_name', 'cashier1');
    //  console.log(sessionStorage.getItem('cashier_name'));
  };

  const checkCredentials = async (userCredentials) => {
    //const res = await fetch(`http://10.1.85.11/AbayERP/webservices/wslogin?username=${userCredentials.userName}&password=${userCredentials.password}`)

    const res = await fetch(
      `${base_url}all_tables/users/checkcashiercredentials`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userCredentials),
      }
    )
      .then((response) => {
        if (response.ok) {
          response.json().then((json) => {
            // setVerifyTicket(json);
            //  console.log(json);
            if (json.checked == "1") {
              setErrorLogin(false);
              setErrorMessage("");
              sessionStorage.setItem("cashier_name", json.result[0].username);
              sessionStorage.setItem("shop_number", json.result[0].shop_number);
              window.location.replace("/cashier");
              //console.log(sessionStorage.getItem('cashier_name'));
            } else if (json.checked == "2") {
              setErrorLogin(true);
              setErrorMessage("Invalid password");
            } else {
              setErrorLogin(true);
              setErrorMessage("Invalid username");
            }
          });
        } else {
        }
      })
      .catch((err) => {
        console.log("connection not working");
      });
  };

  return (
    <div className="cashier_login_main_container">
      <div className="container-login100">
        <div className="wrap-login100">
          <div
            className="login100-form-title"
            style={{ backgroundImage: `url(${Background})` }}
          >
            <span className="login100-form-title-1">
              {/* <img src = {BlnLogo} height = "70px" style={{marginRight: "10px"}}/>  */}
              GOLDEN GAMES
            </span>
            <br></br>
            <span
              style={{ color: "#fff", fontSize: "18px", fontWeight: "600" }}
            >
              CASHIER LOGIN
            </span>
          </div>
          <div
            style={{
              height: "30px",
              textAlign: "center",
              width: "100%",
              color: "red",
              marginBottom: "-30px",
              marginTop: "20px",
            }}
          >
            {errorLogin ? (
              <span>
                <FaExclamationTriangle
                  style={{ marginBottom: "3px", marginRight: "5px" }}
                />{" "}
                {errorMessage}
              </span>
            ) : (
              ""
            )}
          </div>
          <form className="login100-form validate-form" onSubmit={onSubmit}>
            <div
              className="wrap-input100 validate-input m-b-26"
              data-validate="Username is required"
            >
              <span className="label-input100">Username</span>
              <input
                className="input100"
                type="text"
                name="username"
                required
                placeholder="Enter username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <span className="focus-input100"></span>
            </div>

            <div
              className="wrap-input100 validate-input m-b-18"
              data-validate="Password is required"
            >
              <span className="label-input100">Password</span>
              <input
                className="input100"
                type="password"
                name="pass"
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input100"></span>
            </div>

            {/* <div className="flex-sb-m w-full p-b-30">
                    <div className="contact100-form-checkbox">
                <label className="container_cb">Remember me
                  <input type="checkbox"
                  checked = {rememberMe}
                  onChange = {(e) => setRememberMe(e.currentTarget.checked)}
                //   onClick={() => setCookie(userName , password)}
                  />
                  <span className="checkmark_cb"></span>
                </label>
                    </div>

                </div> */}

            <div className="container-login100-form-btn2">
              <button className="login100-form-btn2">Login</button>
            </div>
          </form>
        </div>
      </div>
      <div
        className="dv_modal"
        style={{ display: `${inProcess ? "flex" : "none"}` }}
      >
        <div
          style={{ padding: "20px", background: "#fff", borderRadius: "5px" }}
        >
          <img src={Loading} style={{ width: "60px" }} />
        </div>
      </div>
    </div>
  );
};

export default CashierLogin;
