import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { usePage } from "../store/useStore";
import {
  updateChartData,
  updateResponse,
  postData,
  fetchFormDataToCheck,
  fetchFormData,
} from "./APIREQ";

function AppForm() {
  const globalToken = window.localStorage.getItem("token");
  const [userData, setuserData] = useState<any>([]);
  const [userDataPre, setuserDataPre] = useState<any>([]);
  const setPage = usePage((state: any) => state.setPage);

  const [optionsSet, setOptionsSet] = useState<any>([]);

  // const [submitData, setSubmitData] = useState(0);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailOk, setEmailOk] = useState("");
  const [optionText, setOptionText] = useState("");
  const [formRes, setFormRes] = useState<any>([]);

  const [us, setUS] = useState(0);
  const [idArray, setIdArray] = useState<any>([]);
  const [idArraySel, setIdArraySel] = useState<any>([]);
  const [optionBor, setOptionBor] = useState(false);
  const [test, setTest] = useState(0);
  // const [emOk, setEmOK] = useState(false);
  const [noOfTxtQ, setNoOfTxtQ] = useState<any>([]);
  const [txtQArr, setTxtQArr] = useState<any>([]);
  const [notif, setNotif] = useState("");
  let nav = useNavigate();

  let { form_id, ac_id } = useParams();

  const handleSub = () => {
    setNotif("");
    setOptionBor(true);
    let noTextAnswers = 0;
    let noEmail = 0;
    let fu: any[] = [];
    let txtQstion: any[] = [];

    let loc = userData.data?.subData?.formData?.formDataArray;

    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email) {
      if (email.match(pattern)) {
        setEmailOk("true");

        for (
          let i = 0;
          i < userData.data?.subData?.formData?.formDataArray.length;
          i++
        ) {
          if (loc[i].required) {
            if (loc[i].answerType == "Text") {
              if (loc[i].textAnswer == "" || !loc[i].textAnswer) {
                noTextAnswers += 1;
                txtQstion.splice(loc[i], 0);
                setTxtQArr(txtQstion);
              } else {
                txtQstion.push(loc[i]);
                setTxtQArr(txtQstion);
              }
            }

            for (let j = 0; j < loc[i].options.length; j++) {
              if (loc[i].options[j].isSingle_Selected == true) {
                fu.push(loc[i]);
                setOptionsSet(fu);
                setTest(test + 1);
              }

              if (loc[i].options[j].isSingle_Selected == false) {
                fu.splice(loc[i], 0);
                setOptionsSet(fu);
                setTest(test + 1);
              }
            }
          }
        }
      } else {
        setEmailOk("false");
        setNotif("Please enter a valid mail");
      }
    } else setEmailOk("false");

    if (noTextAnswers == 0) {
      for (let i = 0; i < formRes.length; i++) {
        if (email == formRes[i].sub?.data?.formEmail) {
          noEmail += 1;
        }
      }
      if (noEmail == 0) {
        setUS(us + 1);
      }
      if (noEmail != 0) {
        if (us > 0) {
          setUS(us - 1);
        }
        if (us <= 0) {
          setUS(0);
        }
      }
    }
  };

  useEffect(() => {
    let ju: any[] = [];
    optionsSet.map((e: any) => {
      if (!ju.includes(e.id)) {
        ju.push(e.id);
      }
    });
    setIdArraySel(ju.sort());
  }, [test]);

  useEffect(() => {
    let locVar: any[] = [];
    let loc_TXT: any[] = [];
    if (userData) {
      userData.data?.subData?.formData?.formDataArray.map((e: any) => {
        if (e.required) {
          // console.log("req", e);
          if (e.answerType == "Options") {
            locVar.push(e.id);
          }
          if (e.answerType == "Text") {
            loc_TXT.push(e.id);

            setNoOfTxtQ(loc_TXT);
          }
        }
      });

      setIdArray(locVar);
    }
  }, [userData.data?.subData?.formData?.formDataArray]);

  useEffect(() => {
    fetchFormData({
      userDataPre,
      setLoading,
      ac_id,
      form_id,
      setuserDataPre,
      setuserData,
    });
    fetchFormDataToCheck({ globalToken, form_id, setFormRes });
  }, [ac_id]);

  useEffect(() => {
    if (idArraySel.length == 0 && txtQArr.length == 0 && email == "") {
      setNotif(`Please enter your email first`);
    }

    if (email != "") {
      if (idArraySel.length == 0 && txtQArr.length == 0 && emailOk == "true") {
        setNotif(`You've not filled any Questions. 00`);
      }
      if (txtQArr.length == 0 || txtQArr.length !== noOfTxtQ.length) {
        setNotif(`You've missed some of the required questions`);
      }
      if (idArraySel.length == 0 || idArraySel.length !== idArray.length) {
        setNotif(`You've missed some of the required questions`);
      }
    }
    if (optionBor) {
      setTimeout(() => setOptionBor(false), 3000);
    }
  }, [optionBor]);

  useEffect(() => {
    let localMail = 0;

    for (let i = 0; i < formRes.length; i++) {
      if (
        email == formRes[i].sub?.data?.formEmail &&
        idArraySel.length != 0 &&
        txtQArr.length != 0
      ) {
        localMail += 1;
      }
    }
    if (
      idArray.length == idArraySel.length &&
      idArraySel.length > 0 &&
      us > 0 &&
      noOfTxtQ.length == txtQArr.length &&
      localMail == 0
    ) {
      postData({
        email,
        userData,
        ac_id,
        form_id,
      });
      updateResponse(form_id);
      updateChartData(form_id);
      nav("/formSubmit");
      setOptionBor(false);
    }
    if (localMail > 0) {
      setNotif("This mail has aleready been used, use a new mail.");
    }

    if (
      idArray.length !== idArraySel.length ||
      txtQArr.length !== noOfTxtQ.length
    ) {
      setNotif("You've missed some of the required questions");
    }
  }, [(idArray && idArraySel) || us]);

  useEffect(() => setPage("APP_FORM"));

  if (new Date(userData?.data?.subData?.formExpiryData) < new Date()) {
    return (
      <>
        <div className="DatePass">
          <div className="DatePass_card">
            Sorry, the form has expired. You missed the form!!
          </div>
        </div>
      </>
    );
  }

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
      <div className="AppForm">
        <div className="AppFormHeadingTab">
          <h2>{userData.data?.subData?.formQuestion?.question}</h2>
          <label>{userData.data?.subData?.formQuestion?.description}</label>
        </div>

        <div className="AppFormEmail">
          <div className="AppEmailQuestion">
            <label>
              Please Enter your email.
              <div className="ifMobileEm" style={{ color: "rgb(216, 61, 30)" }}>
                *
              </div>
            </label>
            <div className="ImpBadgeEmail">REQUIRED</div>
          </div>
          <input
            type="text"
            placeholder="Email"
            style={
              emailOk != ""
                ? emailOk != "true"
                  ? { border: "3px solid red" }
                  : { border: "none" }
                : { border: "none" }
            }
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailOk("true");
              setOptionBor(false);
            }}
            autoComplete="off"
          />
        </div>

        {userData.data?.subData?.formData?.formDataArray.map(
          (e: any, idx: number) => {
            return (
              <>
                <div
                  className="AppFormQuestions"
                  // style={emailOk ? { opacity: 0.5 } : { opacity: 1 }}
                >
                  <div className="AppFormLabel">
                    <label>
                      Q{idx + 1}. {e.question}?&nbsp;
                      <div
                        className="ifMobile"
                        style={
                          e.required
                            ? { color: "rgb(216, 61, 30)" }
                            : { color: "#abc4ff" }
                        }
                      >
                        {e.required ? "*" : ""}
                      </div>
                    </label>

                    {e.required ? (
                      <div
                        className="ImpBadge"
                        // style={
                        //   e.required
                        //     ? { background: "rgb(216, 61, 30)" }
                        //     : { background: "#abc4ff" }
                        // }
                      >
                        required
                      </div>
                    ) : null}
                  </div>

                  {!e.isOpen ? (
                    <textarea
                      id="myTxtArea"
                      role="textbox"
                      placeholder="Enter your answer"
                      // value={textAns}
                      onChange={(evalue: any) => {
                        e.textAnswer = evalue.target.value;
                        setOptionBor(false);
                      }}
                    />
                  ) : (
                    <>
                      {e.options.map((val: any, idx_val: number) => {
                        return (
                          <>
                            <div className="AppFormOptions">
                              {e.multiselect ? (
                                <input
                                  type="checkbox"
                                  value={val.OptionSub}
                                  // disabled={optionId != idx_val ? false : true}
                                  onClick={() => {
                                    if (e.multiselect == true) {
                                      e.options[idx_val].isSelected =
                                        e.options[idx_val].isSelected == true
                                          ? false
                                          : true;

                                      // setSubmitData(idx);
                                    }
                                  }}
                                />
                              ) : (
                                <input
                                  type="checkbox"
                                  value={optionText}
                                  checked={
                                    e.options[idx_val].isSingle_Selected
                                      ? true
                                      : false
                                  }
                                  onClick={() => {
                                    setOptionText(val.OptionSub);
                                    // setUS(e.question);
                                    // setOptionId(idx);
                                    // setOptionId(e.question);
                                    // inputData(val.OptionSub, idx, idx_val);
                                  }}
                                  onChange={(val) => {
                                    e.options[idx_val].isSingle_Selected =
                                      val.target.checked;
                                    setOptionBor(false);
                                  }}
                                />
                              )}

                              <label>{val.OptionSub}</label>
                            </div>
                          </>
                        );
                      })}
                    </>
                  )}
                </div>
              </>
            );
          }
        )}

        <div className="SubmitData">
          <button
            onClick={handleSub}
            style={optionBor ? { opacity: 0.5 } : { opacity: 1 }}
            disabled={optionBor}
          >
            Submit
          </button>
        </div>
      </div>
      <div
        className="AppFormNotif"
        style={
          optionBor
            ? { transform: "translate(-50%, -10%)" }
            : { transform: "translate(-50%, 120%)" }
        }
      >
        <div className="AppNotification">
          <h2>
            {notif}
            {/* {optionBor && notif
              ? notif
              : `You've missed some of the question $$`} */}
          </h2>
        </div>
      </div>
    </>
  );
}

export default AppForm;
