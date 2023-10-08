import { useNavigate } from "react-router";
import { useEffect } from "react";
import { usePage } from "../store/useStore";

function AppHome() {
  const nav = useNavigate();
  const globalToken = window.localStorage.getItem("token");
  const setPage = usePage((state: any) => state.setPage);

  useEffect(() => {
    if (globalToken) {
      nav("/user");
    }
  }, [globalToken]);

  useEffect(() => {
    setPage("HOME");
  }, []);

  let a = [0, 1, 2];
  return (
    <>
      <div className="AppHome">
        <div className="Page1">
          <div className="Page1_Text">
            <h2>Build form with the click of a button</h2>
            <p>
              A simple form builder that let's you build and maintain forms for
              FREE.
            </p>
            <button onClick={() => nav("/login")}>KNOW MORE</button>
          </div>
          <div className="Page1_Img">
            <img src={"../assets/image23.png"} alt="" />
          </div>
        </div>
        <div className="Page2">
          <div className="Page2_Text">
            <h2>Make and manage forms with little to no effort</h2>
          </div>
          <div className="Page2_Cards">
            {a.map((e: any) => {
              return (
                <>
                  <div className={`Cards${e}`}>
                    <div className="Cards_Sub">
                      <h1>{e + 1}</h1>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <div className="Page3">
          <div className="Page3_Img">{/* <img src={Image} alt="" /> */}</div>
          <div className="Page3_Text">
            <h2>A simple ui to make the process easier</h2>
            <p>
              A simple and easy to use UI that takes care of all your needs. It
              let's you build form, see and maintain it's data effectively.
              Simple and easy!!!
            </p>
          </div>
        </div>
        <div className="Page4">
          <div className="Page4_Text">
            <h2>So let’s begin shall we</h2>
            <button onClick={() => nav("/login")}>REGISTER</button>
          </div>
          <div className="Footer">
            <label htmlFor="">T H A N K &nbsp;Y O U !</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default AppHome;
