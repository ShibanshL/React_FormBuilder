interface FETCHUSERSDATA {
  // userData: any;
  setFormRes?: (e: any) => void;
  setAllFormRes: (e: any) => void;
  globalToken: any;
  setLoading: (e: boolean) => void;
  form_id: string | undefined;
  page?: string;
  state?: any;
}

const fetchUserResData = async (props: FETCHUSERSDATA) => {
  const {
    // userData,
    setFormRes,
    setAllFormRes,
    setLoading,
    globalToken,
    form_id,
    page,
    state,
  } = props;

  setLoading(true);

  const url = `${
    import.meta.env.VITE_REACT_APP_APIURL
  }/formSub/${globalToken}/${form_id}`;
  const res = await fetch(url);
  const data = await res.json();
  setFormRes ? setFormRes(data.data[data.data.length - 1]) : null;

  if (page != "INDIVIDUAL_RES") {
    setAllFormRes(data.data);
  }

  if (page == "FORMRESPONSES") {
    data.map((e: any) => {
      if (e.sub.data.userFormId == form_id) {
        setFormRes ? setFormRes(e) : null;
      }
    });
  }

  if (page == "INDIVIDUAL_RES") {
    data.data.map((e: any) => {
      if (e.sub.data.formEmail == state.personal_email) {
        setAllFormRes(e);
      }
    });
  }
  setLoading(false);
};

interface FETCHDATA {
  setLoading: (e: boolean) => void;
  setuserData: (e: any) => void;
  setFormData?: any;
  globalToken: string | null;
  form_id?: string;
  page?: string;
}

const fetchData = async (props: FETCHDATA) => {
  const { setLoading, setuserData, globalToken, form_id, setFormData, page } =
    props;
  setLoading(true);
  const url = `${import.meta.env.VITE_REACT_APP_APIURL}/data/${globalToken}`;
  const res = await fetch(url);
  const data = await res.json();

  setuserData(data);

  if (page == "FORMRESPONSES" && form_id != undefined) {
    data.map((e: any) => {
      if (e.data.subData.formData.formUID == form_id) {
        setFormData ? setFormData(e.data.subData) : null;
      }
    });
  }

  setLoading(false);
};

const buildChartData = async (formID: string, globalToken: any) => {
  try {
    fetch(`${import.meta.env.VITE_REACT_APP_APIURL}/indRes/${formID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userID: globalToken,
        formID: formID,
        chartData: [
          {
            date: `${new Date().getDate()}-${
              new Date().getMonth() + 1
            }-${new Date().getFullYear()}`,
            res: 0,
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((dataReturn) => {
        console.log(dataReturn);
      });
  } catch (e: any) {
    console.log("Error : ", e);
  }
};

interface POSTBUILDFORMDATA {
  allData: any[];
  formID: string;
  globalToken: string | null;
  date: string;
  heading: string;
  desc: string;
  nav: any;
}

let currentDate = new Date();

const postBuildFormData = (props: POSTBUILDFORMDATA) => {
  const { allData, formID, globalToken, date, heading, desc, nav } = props;

  const finalObj = { formDataArray: allData, formUID: formID };

  const UserObj = {
    subData: {
      userUID: globalToken,
      formData: finalObj,
      formExpiryData: date,
      response: 0,
      createdOn: `${
        currentDate.getDate() +
        "/" +
        (currentDate.getMonth() + 1) +
        "/" +
        currentDate.getFullYear()
      }`,
      formQuestion: { question: heading, description: desc },
    },
  };

  fetch(`${import.meta.env.VITE_REACT_APP_APIURL}/build/${formID}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: UserObj,
    }),
  })
    .then((response) => response.json())
    .then((dataReturn) => {
      if (dataReturn) {
        nav(`/user`);
      }
    });
};

const updateResponse = (e: string | undefined) => {
  fetch(`${import.meta.env.VITE_REACT_APP_APIURL}/getbuild/${e}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then(() => {
      // console.log(dataReturn);
    });
};

const updateChartData = (e: string | undefined) => {
  fetch(`${import.meta.env.VITE_REACT_APP_APIURL}/indRes/${e}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      date: `${new Date().getDate()}-${
        new Date().getMonth() + 1
      }-${new Date().getFullYear()}`,
    }),
  })
    .then((response) => response.json())
    .then((dataReturn) => {
      console.log(dataReturn);
    });
};

const fetchChartData = async (
  form_id: string | undefined,
  setChartData: (e: any) => void
) => {
  let url = `${import.meta.env.VITE_REACT_APP_APIURL}/indRes/${form_id}`;
  let res = await fetch(url);
  let data = await res.json();
  let loc_dates = data;

  if (loc_dates[0].chartData.length > 0) {
    // newData = loc_dates;
    for (let i = 0; i < loc_dates[0].chartData.length; i++) {
      let oldDate = loc_dates[0].chartData[i].date.split("-");
      let day = oldDate[0];
      let month = oldDate[1];
      let date = `${day}-${month}`;
      loc_dates[0].chartData[i].date = date;
    }
  }

  setChartData(loc_dates[0].chartData);
};

interface APP_FORM_SUBMIT_DATA {
  email: string;
  userData: any;
  ac_id: string | undefined;
  form_id: string | undefined;
}

const postData = (props: APP_FORM_SUBMIT_DATA) => {
  // try {
  fetch(`${import.meta.env.VITE_REACT_APP_APIURL}/formSub/${props.ac_id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sub: {
        data: {
          formEmail: props.email,
          formQuestion: props.userData?.data?.subData?.formQuestion,
          formSub: props.userData.data?.subData?.formData?.formDataArray,
          userFormAc: props.ac_id,
          userFormId: props.form_id,
          creationDate: `${
            currentDate.getDate() +
            "/" +
            (currentDate.getMonth() + 1) +
            "/" +
            currentDate.getFullYear()
          }`,
          creationTime: `${
            currentDate.getHours() +
            ":" +
            currentDate.getMinutes() +
            ":" +
            currentDate.getSeconds()
          }`,
        },
      },
    }),
  })
    .then((response) => response.json())
    .then((dataReturn) => {
      console.log(dataReturn);
    });
};

interface FORM_DATA_TO_CHECK {
  globalToken: string | null;
  form_id: string | undefined;
  setFormRes: (e: any) => void;
}

const fetchFormDataToCheck = async (props: FORM_DATA_TO_CHECK) => {
  let { globalToken, form_id, setFormRes } = props;
  const url = `${
    import.meta.env.VITE_REACT_APP_APIURL
  }/formSub/${globalToken}/${form_id}`;
  const res = await fetch(url);
  const data = await res.json();
  setFormRes(data.data);
};

interface FETCHFORMDATA {
  userDataPre: any;
  setLoading: (e: boolean) => void;
  ac_id: string | undefined;
  form_id: string | undefined;
  setuserDataPre: (e: any) => void;
  setuserData: (e: any) => void;
}

const fetchFormData = async (props: FETCHFORMDATA) => {
  let { userDataPre, setLoading, ac_id, form_id, setuserDataPre, setuserData } =
    props;
  if (userDataPre) {
    setLoading(true);
    const url = `${import.meta.env.VITE_REACT_APP_APIURL}/data/${ac_id}`;
    const res = await fetch(url);
    const data = await res.json();
    data.map((e: any) => {
      if (e.data.subData.formData.formUID == form_id) {
        setuserDataPre(e);
        setuserData(e);
      }
    });
    setLoading(false);
  } else {
    setuserData(userDataPre);
  }
};

export {
  fetchUserResData,
  fetchData,
  buildChartData,
  postBuildFormData,
  fetchFormDataToCheck,
  fetchFormData,
  updateResponse,
  updateChartData,
  fetchChartData,
  postData,
};
