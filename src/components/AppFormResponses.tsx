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

  const [newChartData, setNewChartData] = useState<any>([])

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

    // const newOBJ = {
    //   date:''
    //   res:0
    // }
    const Data = chart_Data.map((item:any) => {
      return {
        date:`${item.date}-${new Date().getFullYear().toString().slice(2,4)}`,
        res:item.res
      }
    })

    // console.log(Data)

    setNewChartData(Data)

  },[chart_Data])

  // useEffect(() => {
  //   console.log('newChartData',newChartData.map((e:any) => e.date.slice(0,5)))
  // },[newChartData])



  //This is the chatgpt code, more or less it won't work


 

  useEffect(() => {

    const currentYear = new Date().getFullYear();

    // Add the current year to the date strings
    const updatedDates = chart_Data.map((item:any) => ({
      ...item,
      date: addYearToDate(item.date, currentYear)
    }));
  
    // Sort the updated dates array based on date
    updatedDates.sort((a:any, b:any) => a.date - b.date);
  
    // Find the start and end dates
    const startDate = updatedDates[0].date;
    const endDate = updatedDates[updatedDates.length - 1].date;
  
    // Generate all dates in range
    const allDatesInRange = generateDateRange(startDate, endDate);
  
    // Create the new array with res: 0 for dates not in original array
    const finalArray = allDatesInRange.map((date:any) => {
      const found = updatedDates.find((item:any) => formatDate(item.date) === date);
      return found ? { date, res: found.res } : { date, res: 0 };
    });

    if(finalArray.length > 0){
      setNewChartData(finalArray)
    }
  },[])

  useEffect(() => {
    console.log('chart',newChartData)
  },[newChartData])


  //This is where the chatgpt code end


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
              data={newChartData}
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
            {/* <div className="MoreInfo">
              <h2>
                No of responses since {chart_Data[chart_Data.length - 1].date}-
                {new Date().getFullYear()} :{" "}
              </h2>
              <h1>{chart_Data[chart_Data.length - 1].res}</h1>
            </div> */}
          </div>
          <div className="HiddenChart">
            <LineChart
              width={300}
              height={130}
              data={newChartData}
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
              {/* <strong>
                {formRes?.sub?.data?.creationTime
                  ? formRes?.sub?.data?.creationTime
                  : "~"}
              </strong>{" "}
              on{" "}
              <strong>
                {formRes?.sub?.data?.creationDate
                  ? formRes?.sub?.data?.creationDate
                  : "~"}
              </strong>{" "} */}
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




//This is for the chart


// let dateArray = [
//   { date: "19-11-24", res: 2 },
//   { date: "25-11-24", res: 4 },
//   { date: "29-11-24", res: 1 }
// ];

// // Function to convert a date string ("YY-MM-DD") to a Date object
// function stringToDate(dateStr) {
//   let year = "20" + dateStr.slice(0, 2); // Add "20" to the year
//   let month = dateStr.slice(3, 5); // Extract the month
//   let day = dateStr.slice(6, 8); // Extract the day
//   return new Date(`${year}-${month}-${day}`);
// }

// // Function to convert a Date object to a string ("YY-MM-DD")
// function dateToString(date) {
//   let year = date.getFullYear().toString().slice(2, 4); // Get last two digits of the year
//   let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month, padded
//   let day = date.getDate().toString().padStart(2, '0'); // Get day, padded
//   return `${year}-${month}-${day}`;
// }

// // Sort the array based on the date property
// let sortedArray = dateArray.map(item => ({
//   ...item,
//   dateObj: stringToDate(item.date) // Add a Date object for easy comparison
// })).sort((a, b) => a.dateObj - b.dateObj);

// // Array to store the resulting objects
// let result = [];

// // Loop through sorted array and add objects for all dates between consecutive ones
// for (let i = 0; i < sortedArray.length - 1; i++) {
//   let currentObj = sortedArray[i];
//   let nextObj = sortedArray[i + 1];

//   // Add the current object to the result
//   result.push({ date: currentObj.date, res: currentObj.res });

//   // Add all intermediate dates with res = 0
//   let currentDate = currentObj.dateObj;
//   let nextDate = nextObj.dateObj;

//   while (currentDate < nextDate) {
//     currentDate.setDate(currentDate.getDate() + 1); // Increment day by 1
//     result.push({ date: dateToString(currentDate), res: 0 });
//   }
// }

// // Add the last date object to the result
// result.push({ date: sortedArray[sortedArray.length - 1].date, res: sortedArray[sortedArray.length - 1].res });

// // Output the result
// console.log(result);


// Helper function to parse date with current year
const addYearToDate = (dateStr:any, year:any) => {
  const [day, month] = dateStr?dateStr.split('-'):[];
  return new Date(`${month}-${day}-${year}`);
};

// Helper function to format a Date object to "dd-MM-yyyy"
const formatDate = (date:any) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

// Helper function to generate all dates between start and end dates
const generateDateRange = (startDate:any, endDate:any) => {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(formatDate(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};