import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import userIcon from "../assets/User.svg";
import lockIcon from "../assets/Lock.svg";
import unLockIcon from "../assets/Unlock.svg";

function AppLogin() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loginError, setLoginError] = useState("");

  let nav = useNavigate();

  const [token, setToken] = useState("");
  const globalToken = window.localStorage.getItem("token");

  const [register, setRegister] = useState(false);

  const handleSub = () => {
    try {
      fetch(
        `${import.meta.env.VITE_REACT_APP_APIURL}/${
          register ? "register" : "login"
        }`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(
            register
              ? { name: userName, password: password }
              : { name: userName, email: userEmail, password: password }
          ),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.id || data._id) {
            setToken(!register ? data.id : data._id);
            window.localStorage.setItem(
              "token",
              !register ? data.id : data._id
            );
          } else setLoginError(data.message);
        });
    } catch (error: any) {
      console.log("HAHA ", error.message);
    }
  };

  const handleSub_Register = () => {
    try {
      // e.preventDefault();
      fetch(`${import.meta.env.VITE_REACT_APP_APIURL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.id || data._id) {
            setToken(!register ? data.id : data._id);
            window.localStorage.setItem(
              "token",
              !register ? data.id : data._id
            );
          } else setLoginError(data.message);
        });
    } catch (error: any) {
      console.log("HAHA ", error.message);
    }
  };

  const Validate_Req = (e: any) => {
    e.preventDefault();
    if (register) {
      console.log("Inside for mail");
      if (userEmail != "" && userName != "" && password != "") {
        console.log(
          "email ",
          userEmail,
          " name ",
          userName,
          " password ",
          password
        );
        let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (userEmail.match(pattern)) {
          return handleSub_Register();
        }
      }
    }
    if (!register) {
      console.log("InsideOUT for mail");

      return handleSub();
    }
  };

  const Login_Register_Verification = (e: string) => {
    if (e == "No such user exist") {
      return (
        <>
          No such account exist, click here to{" "}
          <b onClick={handleClick}>register</b>
        </>
      );
    }
    if (e == "incorrect email/password" || e == "incorrect username/password") {
      return <>{e}</>;
    }
    if (e == "Username already exist" || e == "Email already exist") {
      return <>{e}</>;
    }
  };

  useEffect(() => {
    setUserName("");
    setPassword("");
  }, [register]);

  useEffect(() => {
    if (globalToken) {
      nav("/user");
    }
    // console.log(token);
  }, [token]);

  const handleClick = () => {
    setLoginError("");
    if (register) {
      setRegister(false);
    }
    if (!register) {
      setRegister(true);
    }
  };

  return (
    <>
      <div className="AppLogin">
        <div className="AppLoginForm">
          <div className="topPart">
            <h2>{!register ? "LOGIN" : "REGISTER"}</h2>
          </div>
          <div className="formPart">
            <form onSubmit={Validate_Req}>
              <div className="formInputs">
                <img src={userIcon} />
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => {
                    setLoginError("");
                    setUserName(e.target.value);
                  }}
                  placeholder="userName"
                  autoComplete="off"
                />
              </div>
              {register ? (
                <div
                  className="formInputs"
                  // style={!userEmail ? { border: "2px solid red" } : {}}
                >
                  <img src={userIcon} />
                  <input
                    type="text"
                    value={userEmail}
                    onChange={(e) => {
                      setLoginError("");
                      setUserEmail(e.target.value);
                    }}
                    placeholder="email"
                    autoComplete="off"
                  />
                </div>
              ) : null}
              <div className="formInputs">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setLoginError("");
                    setPassword(e.target.value);
                  }}
                  placeholder="Enter your password"
                />
                <img
                  style={
                    password
                      ? { opacity: 1, cursor: "pointer" }
                      : { opacity: 0.5, cursor: "pointer" }
                  }
                  src={showPass ? unLockIcon : lockIcon}
                  onClick={() => setShowPass(!showPass)}
                />
              </div>
              <button onClick={Validate_Req}>
                {!register ? "LOGIN" : "REGISTER"}
              </button>
              {loginError ? (
                <h3
                  className="registerorlogin"
                  style={{ color: "red", textAlign: "center" }}
                >
                  {Login_Register_Verification(loginError)}
                </h3>
              ) : (
                <h3 className="registerorlogin">
                  {register ? "allready" : "not"} a member ?{" "}
                  <b onClick={handleClick}>{register ? "Login" : "Register"}</b>
                </h3>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppLogin;
