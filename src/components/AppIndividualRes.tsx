import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
// const creatHash = require('')
import { usePage } from "../store/useStore";
import { fetchUserResData } from "./APIREQ";

function AppIndividualRes() {
  const nav = useNavigate();
  const { state } = useLocation();
  const globalToken = window.localStorage.getItem("token");
  let { form_id } = useParams();
  const setPage = usePage((state: any) => state.setPage);

  const [allFormRes, setAllFormRes] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const page = "INDIVIDUAL_RES";
    // fetchResponseData();
    fetchUserResData({
      setLoading,
      setAllFormRes,
      globalToken,
      form_id,
      page,
      state,
    });
  }, [globalToken]);

  useEffect(() => {
    if (!globalToken) {
      nav("/");
    }
    setPage("INDIVIDUAL_RES");
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

  const formOptions = (e: any) => {
    if (e.answerType == "Text") {
      return (
        <>
          <div className="AppIndivAnswerTexts">
            <div className="AppIndivParent">
              <h2 style={{ display: "flex", gap: "10px 10px" }}>
                Q{e.id + 1}: {e.question}
                {e.required ? (
                  <div className="ifImpAppIndv" style={{ color: "red" }}>
                    *
                  </div>
                ) : null}
              </h2>
              <div className="AppIndivBadge">required</div>
            </div>

            <div className="TextAnswer">
              <h3>{e.textAnswer}</h3>
            </div>
          </div>
        </>
      );
    }

    if (e.answerType == "Options") {
      if (e.multiselect) {
        return (
          <>
            <div className="AppIndivAnswerTexts">
              <h2 style={{ display: "flex", gap: "10px 10px" }}>
                Q{e.id + 1}: {e.question}
                {e.required ? (
                  <div className="ifImpAppIndv" style={{ color: "red" }}>
                    *
                  </div>
                ) : null}
              </h2>
              {e.options.map((val: any) => {
                return (
                  <>
                    <div
                      className="TextOptions"
                      style={
                        !val.isSelected ? { opacity: 0.5 } : { opacity: 1 }
                      }
                    >
                      <div className="OptionsSelected">
                        <input
                          type="checkbox"
                          checked={val.isSelected ? true : false}
                        />
                        <h3>{val.OptionSub}</h3>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        );
      }
      if (!e.multiselect) {
        return (
          <>
            <div className="AppIndivAnswerTexts">
              <div className="AppIndivParent">
                <h2 style={{ display: "flex", gap: "10px 10px" }}>
                  Q{e.id + 1}: {e.question}
                  {e.required ? (
                    <div className="ifImpAppIndv" style={{ color: "red" }}>
                      *
                    </div>
                  ) : null}
                </h2>
                {e.required ? (
                  <div className="AppIndivBadge">required</div>
                ) : null}
              </div>
              {e.options.map((val: any) => {
                return (
                  <>
                    <div
                      className="TextOptions"
                      style={
                        !val.isSingle_Selected
                          ? { opacity: 0.5 }
                          : { opacity: 1 }
                      }
                    >
                      <div className="OptionsSelected">
                        <input
                          type="checkbox"
                          checked={val.isSingle_Selected ? true : false}
                        />
                        <h3>{val.OptionSub}</h3>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        );
      }
    }
  };

  return (
    <>
      <div className="AppIndividualRes">
        <div className="AppIndividQuestion">
          <h2>Q: {allFormRes.sub?.data?.formQuestion?.question}</h2>
        </div>
        {allFormRes.sub?.data?.formQuestion?.description !== "" ? (
          <div className="AppIndividDescription">
            <h2>{allFormRes.sub?.data?.formQuestion?.description}</h2>
          </div>
        ) : null}
        {allFormRes?.sub?.data?.formSub.map((e: any) => formOptions(e))}
      </div>
    </>
  );
}

export default AppIndividualRes;
