import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Cross from "../assets/Cross 2.svg";
import { usePage, useBearStore } from "../store/useStore";
import { shallow } from "zustand/shallow";
import { fetchData, postBuildFormData, buildChartData } from "./APIREQ";

function AppBuildForm() {
  const globalToken = window.localStorage.getItem("token");
  let nav = useNavigate();
  const page = usePage((state: any) => state.page);
  const setPage = usePage((state: any) => state.setPage);
  const [message, setMessage] = useBearStore(
    (state: any) => [state.message, state.setMessage],
    shallow
  );

  const [heading, setHeading] = useState("");
  const [desc, setDesc] = useState("");
  const [noOfQuestions, setQuestions] = useState(0);
  const [headingText, setHeadingText] = useState(false);
  const [questionText, setQuestionText] = useState<any>(false);

  const [id, setId] = useState(0);

  const [allData, setAllData] = useState<any>([]);

  const [optionFilled, setOptionFilled] = useState(false);

  const [optionsSelected, setOptionsSelected] = useState("");

  const [ifempty, setIfEmpty] = useState<any>([]);

  const [userData, setuserData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [abtSubmit, setAbtSubmit] = useState(false);

  const [formID, setFormId] = useState("");

  const [date, setDate] = useState("");

  const [notification, setNotification] = useState("");

  useEffect(() => {
    if (!globalToken) {
      nav("/");
    }
  }, []);

  useEffect(() => {
    fetchData({ setLoading, setuserData, globalToken });
  }, [globalToken]);

  useEffect(() => {
    setInterval(() => {
      setNotification("");
    }, 3000);
  }, [notification]);

  useEffect(() => {
    setPage("BUILD_FORM");
  }, []);

  const handleClick_2 = () => {
    let emptyQuestions = 0;
    let emptyAnswers = 0;
    let emptyOptions = 0;
    let emptyOptionSub = 0;

    let localObj = {
      id: id,
      question: "",
      answerType: "",
      isOpen: false,
      multiselect: false,
      required: false,
      options: [],
    };
    if (heading) {
      if (allData.length == 0) {
        allData.push(localObj);
        setId(id + 1);
      } else {
        if (allData.length < 20) {
          for (let i = 0; i < allData.length; i++) {
            if (allData[i].question == "") {
              setQuestionText(true);
              emptyQuestions = emptyQuestions + 1;
            }
            if (allData[i].answerType == "") {
              if (allData[i].question != "") {
                setMessage("Please select an answer");
              }
              emptyAnswers = emptyAnswers + 1;
            }
            if (allData[i].multiselect == true) {
              if (allData[i].options.length < 2) {
                emptyOptions = emptyOptions + 1;
                setOptionFilled(true);
              }
            }

            if (allData[i].answerType == "Options") {
              for (let j = 0; j < allData[i].options.length; j++) {
                if (allData[i].options.length < 2) {
                  emptyOptions = emptyOptions + 1;
                  setMessage("Please at least have 2 options");
                  setOptionFilled(true);
                } else {
                  if (
                    allData[i].options[j].OptionSub == undefined ||
                    allData[i].options[j].OptionSub == "" ||
                    allData[i].options[j].OptionSub == " " ||
                    allData[i].options[j].OptionSub.length == 0
                  ) {
                    console.log("Inside the thing", j);
                    setMessage("Please don't leave an option empty");

                    emptyOptionSub = emptyOptionSub + 1;
                    setOptionFilled(true);
                    !ifempty.includes(j) ? ifempty.push(j) : null;
                    console.log(ifempty);
                  }
                }
              }
            }
          }
        } else setMessage("You cannot have more than 20 questions");
      }

      if (emptyQuestions == 0 && emptyAnswers == 0 && allData.length < 20) {
        if (
          (optionsSelected == "Options" &&
            emptyOptions == 0 &&
            emptyOptionSub == 0) ||
          optionsSelected == "Text"
        ) {
          allData.push(localObj);
          setId(id + 1);
          setIfEmpty([]);
        }
      }
    }

    if (!heading) {
      setHeadingText(true);
      setMessage("Please make an heading");
    }

    setQuestions(noOfQuestions + 1);
  };

  const ifRequired = () => {
    if (page == "BUILD_FORM") {
      return {
        transition: "0.5s ease",
        width: "50px",
        height: "50px",
        borderRadius: "50px",
      };
    }
    return {
      transition: "0.5s ease",
      width: "50px",
      height: "50px",
      borderRadius: "50px",
    };
  };

  const AddOptions = (e: any) => {
    let testData = [...allData];
    setAllData(testData);
    if (e.options.length == 0) {
      e.options.push({ id: e.options.length });
    } else {
      if (e.options.length < 10) {
        let j = 0;

        for (let i = 0; i < e.options.length; i++) {
          if (
            e.options[i].OptionSub == undefined ||
            e.options[i].OptionSub == "" ||
            e.options[i].OptionSub == " "
          ) {
            j = j + 1;
            setOptionFilled(true);
          }
        }

        if (j == 0) {
          e.options.push({ id: e.options.length });
        }
      } else setMessage("You can only have 10 options at most");
    }
  };

  useEffect(() => {
    setFormId(broofa());
  }, []);

  function broofa() {
    return "xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  const handleSub = () => {
    let emptySubQuestions = 0;
    let emptySubAnswers = 0;
    let emptySubOptions = 0;
    let emptySubOptionSub = 0;
    if (heading) {
      for (let i = 0; i < allData.length; i++) {
        if (allData[i].question == "") {
          setQuestionText(true);
          emptySubQuestions = emptySubQuestions + 1;
          setNotification("Please enter the question");
        }
        if (allData[i].answerType == "") {
          if (allData[i].question != "") {
            setMessage("Please select an answer");
          }
          emptySubAnswers = emptySubAnswers + 1;
          setNotification("Please select an answer option");
        }

        if (allData[i].answerType == "Options") {
          for (let j = 0; j < allData[i].options.length; j++) {
            if (allData[i].options.length < 2) {
              emptySubOptions = emptySubOptions + 1;
              setNotification("Please do not leave an option empty");
              setMessage("Please have atleast 2 options");
              setOptionFilled(true);
            } else {
              if (
                allData[i].options[j].OptionSub == undefined ||
                allData[i].options[j].OptionSub == "" ||
                allData[i].options[j].OptionSub == " " ||
                allData[i].options[j].OptionSub.length == 0
              ) {
                console.log("Inside the thing", j);
                setNotification("Please do not leave an option empty");
                setMessage("Please don't leave an empty option");

                emptySubOptionSub = emptySubOptionSub + 1;
                setOptionFilled(true);
                !ifempty.includes(j) ? ifempty.push(j) : null;
                console.log(ifempty);
              }
            }
          }
        }
      }

      if (emptySubQuestions == 0 && emptySubAnswers == 0) {
        if (
          (optionsSelected == "Options" &&
            emptySubOptions == 0 &&
            emptySubOptionSub == 0) ||
          optionsSelected == "Text"
        ) {
          setAbtSubmit(true);
        }
      } else console.log("its not fully filled");
    }

    if (!heading) {
      setHeadingText(true);

      setMessage("Please write the heading");
    }
  };

  if (loading) {
    return (
      <>
        <div className="Loading">
          <h1>Loading...</h1>
        </div>
      </>
    );
  }

  if (userData.length >= 4) {
    return (
      <>
        <div className="MaxLimitReached">
          <div className="MaxLimitCards">
            <h1>
              Sorry you've reached the max number of forms allowed for a single
              account!!
            </h1>
          </div>
        </div>
      </>
    );
  }

  const checkIfTrue = (e: any, data: string) => {
    allData.map((val: any, idx: number) => {
      if (e == idx) {
        if (data == "required") {
          if (val.required == false) {
            val.required = true;
          } else {
            val.required = false;
          }
        }

        if (data == "multiselect") {
          if (val.multiselect == false) {
            val.multiselect = true;
          } else {
            val.multiselect = false;
          }
        }
      }
    });
  };

  return (
    <>
      <div className="AppBuildForm">
        <div className="FormButtonsTabs">
          <h2>Form Builder</h2>
          <div className="FormTopBarButtons">
            <button
              onClick={() => {
                handleClick_2();
              }}
            >
              Add Questions
            </button>
          </div>
        </div>

        <div className="FormHeading">
          <input
            type="text"
            placeholder={
              headingText
                ? "Please enter a form heading first"
                : "Enter Form Heading"
            }
            value={heading}
            style={
              headingText ? { border: "3px solid red" } : { border: "none" }
            }
            onChange={(e) => {
              setHeading(e.target.value);
              setHeadingText(false);
            }}
          />
          {/* <button>
            <img src={Tick} alt="" />
          </button>
          <button>
            <img src={Cross} onClick={() => setHeading("")} alt="" />
          </button> */}
        </div>

        <div className="FormDesc">
          <textarea
            placeholder="Enter form description (Optional)"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        </div>

        {allData.map((e: any, idx: number) => {
          return (
            <>
              <div
                className="FormQuestions"
                style={
                  e.isOpen == true
                    ? { minHeight: "40vh" }
                    : { minHeight: "20vh" }
                }
              >
                <div className="QuestionsTopPart">
                  <input
                    type="text"
                    style={
                      questionText && e.question == "" && e.id == idx
                        ? { border: "3px solid red" }
                        : { border: "none" }
                    }
                    onChange={(ev) => {
                      allData[idx].question = ev.target.value;
                      if (e.id == idx) {
                        setQuestionText(false);
                      }
                      let testData = [...allData];
                      setAllData(testData);
                    }}
                    placeholder={
                      !questionText
                        ? `${idx + 1}. Enter your Question`
                        : `Please fill Q.no ${idx + 1} up first`
                    }
                  />
                  <div className="FormButton">
                    <div className="FormButtonLeft">
                      <div className="Required">
                        <input
                          type="checkbox"
                          value={e.required}
                          onClick={() => {
                            checkIfTrue(e.id, "required");
                          }}
                        />
                        <label>Required</label>
                      </div>
                      <button
                        onClick={() => {
                          let test = [...allData];
                          test.forEach((e) => {
                            if (idx == e.id) {
                              e.answerType = "Text";
                            }
                          });
                          setAllData(test);
                          e.options = [];
                          e.isOpen = false;
                          setOptionsSelected("Text");
                        }}
                        style={
                          allData[idx].answerType == "Text"
                            ? { background: "white", color: "#121212" }
                            : { background: "#121212", color: "white" }
                        }
                      >
                        Text
                      </button>
                      <button
                        onClick={() => {
                          let test = [...allData];
                          test.forEach((e) => {
                            if (idx == e.id) {
                              e.answerType = "Options";
                              if (e.options.length == 0) {
                                e.options.push({ id: 0 });
                              }
                            }
                          });
                          setAllData(test);
                          setOptionsSelected("Options");
                          e.isOpen = true;
                        }}
                        style={
                          allData[idx].answerType == "Options"
                          ? { background: "white", color: "#121212" }
                          : { background: "#121212", color: "white" }
                        }
                      >
                        Options
                      </button>
                      {/* {e.isOpen == true ? (
                        <div className="Required">
                          <input
                            type="checkbox"
                            value={e.multiselect}
                            onChange={() => {
                              checkIfTrue(e.id, "multiselect");
                            }}
                          />
                          <label>Multiselect</label>
                        </div>
                      ) : null} */}
                    </div>
                    <div className="FormButtonRight">
                      <button
                        style={
                          !e.isOpen
                            ? {
                                border: "none",
                                cursor: "default",
                                display: "none",
                              }
                            : { display: "block" }
                        }
                        disabled={!e.isOpen ? true : false}
                        onClick={() => {
                          AddOptions(e);
                        }}
                      >
                        <img className="add" src={Cross} alt="" />
                      </button>
                    </div>
                  </div>
                </div>
                <div
                  className="QuestionsBottomPart"
                  style={
                    e.isOpen == true
                      ? { minHeight: "20vh" }
                      : { display: "none" }
                  }
                >
                  {e.options.map((v: any, idx_sub: number) => {
                    return (
                      <>
                        <input
                          onChange={(event) => {
                            allData[idx].options[idx_sub].OptionSub =
                              event.target.value;
                            setOptionFilled(false);
                          }}
                          style={
                            optionFilled &&
                            (v.OptionSub == undefined ||
                              v.OptionSub == "" ||
                              v.OptionSub == " ")
                              ? { border: "2px solid red" }
                              : { border: "none" }
                          }
                          type="text"
                          placeholder={
                            optionFilled &&
                            (v.OptionSub == undefined ||
                              v.OptionSub == "" ||
                              v.OptionSub == `${" "}`)
                              ? `Please enter some value`
                              : `Enter option no ${idx_sub + 1}`
                          }
                        />
                      </>
                    );
                  })}
                </div>
              </div>
            </>
          );
        })}

      <div style={{width:"100%", display:'flex', justifyContent:"flex-end", padding:'20px 73px 20px 73px'}}>
        <button style={{color:'black', background:'white'}} onClick={handleSub}>Submit Form</button>
      </div>

      </div>
      <div>

      </div>
      <div
        className="AppBuildForm_Popover"
        style={abtSubmit ? { zIndex: 5} : { zIndex: -1 }}
      >
        <div className="SubmitTab">
          <div className="DatePicker">
            <h2>Please Select Expiry date for the form!!</h2>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              style={{
                width: "100%",
                backgroundColor: "#abc4ff",
                color: "white",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
              value={date}
              onChange={(e: any) => setDate(e.target.value)}
            />
          </div>
          <button
            disabled={date ? false : true}
            onClick={() => {
              buildChartData(formID, globalToken);
              postBuildFormData({
                allData,
                globalToken,
                formID,
                date,
                heading,
                desc,
                nav,
              });
            }}
          >
            Submit
          </button>
        </div>
      </div>
      <div
        className="Notification"
        style={
          !message
            ? ifRequired()
            : window.screen.width < 500
            ? {
                width: "200px",
                height: "100px",
                transition: "0.5s ease",
              }
            : {
                width: "400px",
                height: "100px",
                transition: "0.5s ease",
              }
        }
      >
        <div
          className="Notification_sub"
          style={
            !message
              ? {
                  transition: "0.5s ease",
                  borderRadius: "50px",
                }
              : {}
          }
        >
          <h3
            style={
              message
                ? {
                    transition: "0.5s ease",
                    opacity: 1,
                  }
                : {
                    transition: "0.5s ease",
                    opacity: 0,
                  }
            }
          >
            {message}
          </h3>
        </div>
      </div>

      {/* <div
        className="Notification"
        style={
          notify
            ? {
                transition: "0.5s ease",
                position: "absolute",
                right: "-40vw",
              }
            : { position: "absolute", right: "30px", transition: "0.5s ease" }
        }
      >
        <div className="Notification_sub">
          <h3>{notification}</h3>
        </div>
      </div> */}
    </>
  );
}

export default AppBuildForm;
