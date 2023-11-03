import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import MenuIcon from "../assets/Menu.svg";
import CrossIcon from "../assets/Cross 2.svg";
import { useState } from "react";
import { usePage } from "../store/useStore";

function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const page = usePage((state: any) => state.page);

  const globalToken = window.localStorage.getItem("token");
  let nav = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    nav("/login");
  };

  const NavInputs = () => {
    if (page == "APP_FORM") {
      return null;
    } else {
      return (
        <>
          <div
            className="NavButtons"
            style={globalToken ? { display: "flex" } : { display: "none" }}
          >
            <div>
              <Link to="/user">
                <p
                // style={
                //   page == "BUILD_FORM"
                //     ? {}
                //     : {
                //         // backgroundColor: "white",
                //         padding: "10px",
                //         width: "80px",
                //         display: "flex",
                //         alignItems: "center",
                //         justifyContent: "center",
                //       }
                // }
                >
                  USER
                </p>
              </Link>

              <Link to="/build">
                <p
                // style={
                //   page == "BUILD_FORM"
                //     ? {
                //         // backgroundColor: "cyan",
                //         padding: "10px",
                //         width: "80px",
                //         display: "flex",
                //         alignItems: "center",
                //         justifyContent: "center",
                //       }
                //     : {}
                // }
                >
                  BUILD{" "}
                </p>
              </Link>
            </div>

            <button onClick={handleLogout}>LOGOUT</button>
          </div>

          <div
            className="MobileHeaderPopover"
            style={menuOpen && globalToken ? { zIndex: 10 } : { zIndex: -1 }}
          >
            <div className="ScreensEmptyPart"></div>
            <div className="HeaderMenuitems">
              <div className="CloseOption">
                <img
                  src={CrossIcon}
                  alt=""
                  onClick={() => setMenuOpen(!menuOpen)}
                />
              </div>
              <div className="NavOptions">
                <h2
                  onClick={() => {
                    nav("/user");
                    setMenuOpen(!menuOpen);
                  }}
                >
                  USER
                </h2>
                <h2
                  onClick={() => {
                    nav("/build");
                    setMenuOpen(!menuOpen);
                  }}
                >
                  BUILD
                </h2>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(!menuOpen);
                  }}
                >
                  LOGOUT
                </button>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <div className="AppHeader">
        <Link to="/">
          <h2>FormBuilder</h2>
        </Link>
        <div className="MobileButton">
          <img
            src={MenuIcon}
            alt=""
            style={globalToken ? { opacity: 1 } : { opacity: 0.5 }}
            onClick={() => (globalToken ? setMenuOpen(!menuOpen) : null)}
          />
        </div>
        {NavInputs()}
      </div>
    </>
  );
}

export default AppHeader;
