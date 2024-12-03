import { useNavigate } from "react-router";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "../assets/Menu.svg";
import CrossIcon from "../assets/Cross 2.svg";
import { useEffect, useState } from "react";
import { usePage } from "../store/useStore";



const useURLChange = (callback:any) => {
  const location = useLocation();

  useEffect(() => {
    // Trigger the callback function whenever the URL changes
    callback(location);
  }, [location, callback]); // Re-run when location changes
};



function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentTab, setCurrentTab]:any = useState('')
  const page = usePage((state: any) => state.page);

  const globalToken = window.localStorage.getItem("token");
  let nav = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    nav("/login");
  };

  const handleURLChange = (location:any) => {
    console.log('URL changed to:', location.pathname);
    // Your custom code here, e.g. tracking, side-effects
  };

  // Use the custom hook to trigger the function on URL change
  const url12:any = useURLChange(handleURLChange);
  
  useEffect(() => {

    if(url12?.includes("build")){
      setCurrentTab("Build")
    }
    else setCurrentTab("User")
    // console.log(url)
  },[url12])


  useEffect(() => {
    sessionStorage.setItem("CurrentTab",currentTab)
  },[currentTab])

  useEffect(() => {
    if(sessionStorage.getItem('CurrentTab')){
      return setCurrentTab(sessionStorage.getItem('CurrentTab'))
    }
  },[])

  const NavInputs = () => {
    if (page == "APP_FORM") {
      return null;
    } else {
      return (
        <>
          <div
            className="NavButtons"
            // onClick={() => sessionStorage.setItem("CurrentTab","User")}
            style={globalToken ? { display: "flex" } : { display: "none" }}
          >
            <div>
              <Link 
                to="/user"
                className={currentTab == "User"?"LinkP":""}
                onClick={() => setCurrentTab("User")}
              >
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
                  YOUR FORMS
                </p>
              </Link>

              <Link 
                to="/build"
                className={currentTab == "Build"?"LinkP":""}
                onClick={() => setCurrentTab("Build")}
                >
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
                  BUILD FORMS{" "}
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
        <Link onClick={() => setCurrentTab("User")} to="/">
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
