import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import HyperLink from "../assets/hyperLink.svg";
import { usePage } from "../store/useStore";
import { fetchUserResData } from "./APIREQ";
import LeftIcon from '../assets/LeftIcon.svg'

function AppListMails() {
  const nav = useNavigate();
  const globalToken = window.localStorage.getItem("token");
  let { form_id } = useParams();
  const setPage = usePage((state: any) => state.setPage);

  const [allFormRes, setAllFormRes] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fetchResponseData();
    fetchUserResData({ setLoading, setAllFormRes, globalToken, form_id });
  }, [globalToken]);

  useEffect(() => {
    if (!globalToken) {
      nav("/");
    }
  }, []);

  useEffect(() => {
    setPage("EMAIL");
  }, []);

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
      <div className="AppListMails">
        <div
          className="AppListMails_TopBar"
          // style={{height:'8vh', width:'100%', background:'pink', borderRadius:'10px'}}
        >
          <div className="AllFormButton">
                <button onClick={() => nav(`/response/${form_id}`)}>
                  <img src={LeftIcon} alt="" />
                </button>
          </div>
          <h2>Go back to Form Responses</h2>
          {/* <h2>{" "}/{" "}</h2>
          <div className="AllFormButton">
                <button onClick={() => nav("/user")}>
                  <img src={RightIcon} style={{transform:"rotate(180deg)"}} alt="" />
                </button>
          </div> */}
        </div>
        {allFormRes.length != 0 ? (
          allFormRes.map((e: any) => {
            return (
              <div className="AppListMailtabs">
                <div className="AppListLeftSec">
                  <div
                    className="HyperLink"
                    onClick={() =>
                      nav(`/individual/${form_id}`, {
                        state: { personal_email: e.sub.data.formEmail },
                      })
                    }
                  >
                    <img src={HyperLink} />
                  </div>
                  <h2>
                    {e.sub.data.formEmail.length > 25
                      ? e.sub.data.formEmail.substring(0, 25) + "..."
                      : e.sub.data.formEmail}
                  </h2>
                </div>
                <div className="AppListRightSec">
                  <div className="DateBadge">
                    <p>{e.sub.data.creationDate}</p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <>
            <div className="Loading">
              <h1>Sorry, noone has responded to the form yet!</h1>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default AppListMails;
