import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import RightIcon from "../assets/Right.svg";
import fullScreenIcon from "../assets/fullscreen.svg";
import crossIcon from "../assets/Cross 2.svg";
import { Line, LineChart, Tooltip, XAxis } from "recharts";
import { usePage } from "../store/useStore";
import { fetchData, fetchUserResData, fetchChartData } from "./APIREQ";

function AppFormResponses() {
  const globalToken = window.localStorage.getItem("token");
  let nav = useNavigate();
  const [formData, setFormData] = useState<any>([]);
  const [userData, setuserData] = useState<any>([]);
  const [formRes, setFormRes] = useState<any>([]);
  const [allFormRes, setAllFormRes] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [chart_Data, setChartData] = useState<any>([{}]);
  const [chart_Data_Pop, setChartData_Pop] = useState<any>([{}]);

  const [chartPopup, setChartPopup] = useState(false);

  const setPage = usePage((state: any) => state.setPage);

  let { form_id } = useParams();

  useEffect(() => {
    const page = "FORMRESPONSES";

    fetchData({
      setLoading,
      setuserData,
      setFormData,
      globalToken,
      form_id,
      page,
    });
    fetchUserResData({
      setFormRes,
      setAllFormRes,
      setLoading,
      globalToken,
      form_id,
      page,
    });

    fetchChartData(form_id, setChartData, setChartData_Pop);
  }, [globalToken]);

  useEffect(() => {
    if (!globalToken) {
      nav("/");
    }
  }, []);

  useEffect(() => {
    setPage("FORM_RES");
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
      <div className="AppFormResponses">
        <div className="AddResTopTab">
          <h2>
            Q.{" "}
            {formData?.formQuestion?.question.length > 50
              ? formData?.formQuestion?.question.substring(0, 50) + "..."
              : formData?.formQuestion?.question}
          </h2>
          <div
            className="IndividualButton"
            onClick={() => nav(`/emails/${form_id}`)}
          >
            <label>Individual</label>
            <img src={RightIcon} alt="" />
          </div>
        </div>
        <div className="AddResChart">
          <div className="FullScreenChart" onClick={() => setChartPopup(true)}>
            <img src={fullScreenIcon} />
          </div>
          <div className="AddResCharts_Sub">
            <LineChart
              width={1000}
              height={280}
              data={chart_Data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="date" tickLine={false} />
              <Tooltip />
              <Line
                type="linear"
                dataKey="res"
                stroke="#fa8e44"
                strokeWidth={3}
              />
            </LineChart>
            <div className="MoreInfo">
              <h2>
                No of responses on {chart_Data[chart_Data.length - 1].date}-
                {new Date().getFullYear()} :{" "}
              </h2>
              <h1>{chart_Data[chart_Data.length - 1].res}</h1>
            </div>
          </div>
          <div className="HiddenChart">
            <LineChart
              width={300}
              height={130}
              data={chart_Data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis dataKey="date" tickLine={false} />
              <Line
                // xAxisId="res"
                type="linear"
                dataKey="res"
                stroke="#fa8e44"
                strokeWidth={3}
                // label={{ marginTop: "10px" }}
              />
            </LineChart>
          </div>
        </div>
        <div className="AppResNoofRes">
          <div className="ResponseNo">
            <h2>No of Response</h2>
            <h1>{allFormRes?.length}</h1>
            <label>Latest response</label>
            <h3>
              <strong>
                {formRes?.sub?.data?.creationTime
                  ? formRes?.sub?.data?.creationTime
                  : "~"}
              </strong>{" "}
              on{" "}
              <strong>
                {formRes?.sub?.data?.creationDate
                  ? formRes?.sub?.data?.creationDate
                  : "~"}
              </strong>{" "}
              by{" "}
              <strong>
                {formRes?.sub?.data?.formEmail
                  ? formRes?.sub?.data?.formEmail.length > 15
                    ? formRes?.sub?.data?.formEmail.substring(0, 15) + "..."
                    : formRes?.sub?.data?.formEmail
                  : "~"}
              </strong>
            </h3>
          </div>
          <div className="FormCreationNo">
            <h3>
              created on : <strong>{formData?.createdOn}</strong>
            </h3>
            <h3>
              end date :{" "}
              <strong>
                {formData?.formExpiryData?.split("-").reverse().join("/")}
              </strong>
            </h3>
          </div>
        </div>
        <div className="AppResAllForm">
          <div className="AllFormText">
            <h2>Total No of Forms : </h2>
            <h1>{userData?.length}</h1>
          </div>
          <div className="AllFormButton">
            <button onClick={() => nav("/user")}>
              <img src={RightIcon} alt="" />
            </button>
          </div>
        </div>
        <div className="AppResListEmails">
          <div className="ListEmaitopNav">
            <h2>List of Email Responses</h2>
            <div className="AllFormButton">
              <button onClick={() => nav(`/emails/${form_id}`)}>
                <img src={RightIcon} alt="" />
              </button>
            </div>
          </div>
          <div className="ListofEmails">
            {allFormRes?.map((e: any) => {
              return (
                <>
                  <div className="SingularEmails">{e.sub.data.formEmail}</div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      {chartPopup ? (
        <div className="chartPopupFS">
          <div className="fullchartdarkbg">
            <div className="fullChartwhitbg">
              <div className="closeButton" onClick={() => setChartPopup(false)}>
                <img src={crossIcon} />
              </div>
              <LineChart
                width={1300}
                height={500}
                data={chart_Data_Pop}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="date" minTickGap={10} tickLine={false} />
                <Tooltip />
                <Line
                  type="linear"
                  dataKey="res"
                  stroke="#fa8e44"
                  strokeWidth={3}
                />
              </LineChart>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default AppFormResponses;
