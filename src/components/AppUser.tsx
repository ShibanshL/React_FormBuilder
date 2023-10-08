import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import HyperLinkImg from "../assets/hyperLink.svg";
import Statistic from "../assets/Statistics.svg";
import { usePage } from "../store/useStore";
import { fetchData } from "./APIREQ";

function AppUser() {
  const globalToken = window.localStorage.getItem("token");
  const [userData, setuserData] = useState<any>([]);
  const setPage = usePage((state: any) => state.setPage);

  const [loading, setLoading] = useState(false);

  let nav = useNavigate();

  useEffect(() => {
    if (!globalToken) {
      nav("/");
    }
  }, []);

  useEffect(() => {
    setPage("USER");
  }, []);

  useEffect(() => {
    fetchData({ setuserData, setLoading, globalToken });
  }, [globalToken]);

  if (loading) {
    return (
      <>
        <div className="Loading">
          <h1>Loading...</h1>
        </div>
      </>
    );
  }

  return (
    <>
      {userData.length > 0 ? (
        <div className="AppUser">
          <div className="AppUserTabs">
            <h2>Responses</h2>
            <label>{userData.length} / 4</label>
          </div>

          {userData.map((e: any, idx: number) => (
            <div key={idx} className="AppUserForms">
              <div className="UserLinks">
                <div className="HyperLink">
                  <Link
                    to={`/form/${globalToken}/${e.data.subData.formData.formUID}`}
                    target={"_blank"}
                  >
                    <img src={HyperLinkImg} alt="" />
                  </Link>
                </div>
                <h2>
                  {e.data.subData.formQuestion.question.length > 100
                    ? e.data.subData.formQuestion.question.substring(0, 100) +
                      "..."
                    : e.data.subData.formQuestion.question}
                </h2>
              </div>

              <div className="userData">
                {e.data.subData.response > 0 ? (
                  <div className="CongratulationBadge">
                    <p>{e.data.subData.response > 10 ? "10+" : "+1"}</p>
                  </div>
                ) : null}
                <div
                  className="UserGraphs"
                  onClick={() =>
                    nav(`/response/${e.data.subData.formData.formUID}`)
                  }
                >
                  <img src={Statistic} alt="" />
                </div>
                <div
                  className="UserResponses"
                  style={
                    JSON.stringify(e.data.subData.response).length > 4
                      ? { fontSize: "1em " }
                      : {}
                  }
                >
                  {e.data.subData.response}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="NoformYetMade">
            <h1>Please build a form first!!</h1>
            <h2>Go to the build page to build a form.</h2>
          </div>
        </>
      )}
    </>
  );
}

export default AppUser;
