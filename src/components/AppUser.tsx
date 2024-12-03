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



  const [isHovered, setIsHovered] = useState({
    name:"",
    val:false
  });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });


  const [loading, setLoading] = useState(false);

  const handleMouseMove = (event:any) => {
    setCursorPosition({
      x: handleModal_Postion(event),  // Adds some margin from the cursor
      y: event.clientY + 10,
    });
  };

  const handleModal_Postion = (e:any) => {

    if(isHovered.name == 'HyperLink'){
      return e.clientX + 10 
    }

    if(isHovered.name == 'UserResponses'){
      return e.clientX - 215 
    }

    if(isHovered.name == 'UserGraphs'){
      return e.clientX - 320 
    }

    if(isHovered.name == 'CongratulationBadge'){
      return e.clientX - 300 
    }

    return e.clientX + 10 
  }

  const hoverMessage = () => {

    if(isHovered.name == 'HyperLink'){
      return 'Link to your form.'
    }

    if(isHovered.name == 'UserResponses'){
      return 'Number of responses'
    }

    if(isHovered.name == 'UserGraphs'){
      return 'Link to form Responses Dashboard'
    }

    if(isHovered.name == 'CongratulationBadge'){
      return 'No of responses recently added.'
    }

  }

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
            <h2 style={{color:'white', fontWeight:500}}>Responses</h2>
            <label style={{color:'white', fontWeight:500}}>{userData.length} / 4</label>
          </div>

          {userData.map((e: any, idx: number) => (
            <div key={idx} className="AppUserForms">
              <div className="UserLinks">
                <div 
                  className="HyperLink"
                  onMouseOver={() => setIsHovered({name:'HyperLink', val:true})}
                  onMouseOut={() => setIsHovered({name:'', val:false})}
                  onMouseMove={(e) => isHovered.name && handleMouseMove(e)}
                  >
                  <Link
                    to={`/form/${globalToken}/${e.data.subData.formData.formUID}`}
                    target={"_blank"}
                  >
                    <img src={HyperLinkImg} alt="" />
                  </Link>
                </div>
                <h2 style={{color:'white', fontWeight:500}}>
                  {e.data.subData.formQuestion.question.length > 100
                    ? e.data.subData.formQuestion.question.substring(0, 100) +
                      "..."
                    : e.data.subData.formQuestion.question}
                </h2>
              </div>

              <div className="userData">
                {e.data.subData.response > 0 ? (
                  <div 
                    className="CongratulationBadge"
                    onMouseOver={() => setIsHovered({name:'CongratulationBadge', val:true})}
                    onMouseOut={() => setIsHovered({name:'', val:false})}
                    onMouseMove={(e) => isHovered.name && handleMouseMove(e)}
                  
                  >
                    <p>{e.data.subData.response > 10 ? "10+" : "+1"}</p>
                  </div>
                ) : null}
                <div
                  className="UserGraphs"
                  onMouseOver={() => setIsHovered({name:'UserGraphs', val:true})}
                  onMouseOut={() => setIsHovered({name:'', val:false})}
                  onMouseMove={(e) => isHovered.name && handleMouseMove(e)}
                  onClick={() =>
                    nav(`/response/${e.data.subData.formData.formUID}`)
                  }
                >
                  <img src={Statistic} alt="" />
                </div>
                <div
                  className="UserResponses"
                  onMouseOver={() => setIsHovered({name:'UserResponses', val:true})}
                  onMouseOut={() => setIsHovered({name:'', val:false})}
                  onMouseMove={handleMouseMove}
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
            <div className="NoformYetMade_Card">
              <h1 style={{color:'white', fontWeight:500}}>Please build a form first!!</h1>
              <h2 style={{color:'white', fontWeight:500}}>Go to the build page to build a form.</h2>
            </div>
          </div>
        </>
      )}
       {isHovered.val && (
        <div
          className="modal"
          style={{
            left: `${cursorPosition.x}px`,
            top: `${cursorPosition.y}px`,
          }}
        >
          {hoverMessage()}
        </div>
      )}
    </>
  );
}

export default AppUser;
