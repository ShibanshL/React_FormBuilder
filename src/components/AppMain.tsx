import React from "react";
import "./style/style.css";
import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { usePage, useBearStore } from "../store/useStore";
import { shallow } from "zustand/shallow";

const LazyAppHeader = React.lazy(() => import("./AppHeader"));
const LazyAppLogin = React.lazy(() => import("./AppLogin"));
const LazyAppUser = React.lazy(() => import("./AppUser"));
const LazyAppBuildForm = React.lazy(() => import("./AppBuildForm"));
const LazyAppPageURLError = React.lazy(() => import("./AppPageURLError"));
const LazyAppHome = React.lazy(() => import("./AppHome"));
const LazyAppForm = React.lazy(() => import("./AppForm"));
const LazyAppAfterSubmit = React.lazy(() => import("./AppAfterSubmit"));
const LazyAppFormResponses = React.lazy(() => import("./AppFormResponses"));
const LazyAppListMails = React.lazy(() => import("./AppListMails"));
const LazyAppIndividualRes = React.lazy(() => import("./AppIndividualRes"));

function AppMain() {
  const setPage = usePage((state: any) => state.setPage);
  const [message, setMessage] = useBearStore(
    (state: any) => [state.message, state.setMessage],
    shallow
  );
  const [notify, setNotify] = useState(false);

  useEffect(() => {
    setPage("USER");
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="Loading">
          <h1>Loading...</h1>
        </div>
      </>
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setMessage("");
    }, 3000);
  }, [message]);

  return (
    <>
      <HashRouter>
        <div className="AppMain" onClick={() => setNotify(!notify)}>
          <LazyAppHeader />
          <div className="AppBody">
            <Routes>
              <Route
                path="/login"
                element={
                  <React.Suspense fallback={Loading()}>
                    <LazyAppLogin />
                  </React.Suspense>
                }
              />
              <Route
                path="/user/"
                element={
                  <React.Suspense fallback={Loading()}>
                    <LazyAppUser />
                  </React.Suspense>
                }
              />
              <Route
                path="/build"
                element={
                  <React.Suspense fallback={Loading()}>
                    <LazyAppBuildForm />
                  </React.Suspense>
                }
              />
              <Route
                path="/"
                element={
                  <React.Suspense fallback={Loading()}>
                    <LazyAppHome />
                  </React.Suspense>
                }
                index
              />
              <Route
                path="/form/:ac_id/:form_id"
                element={
                  <React.Suspense fallback={Loading()}>
                    <LazyAppForm />
                  </React.Suspense>
                }
              />
              <Route
                path="/response/:form_id"
                element={
                  <React.Suspense fallback={Loading()}>
                    <LazyAppFormResponses />
                  </React.Suspense>
                }
              />
              <Route
                path="/emails/:form_id"
                element={
                  <React.Suspense fallback={Loading()}>
                    <LazyAppListMails />
                  </React.Suspense>
                }
              />
              <Route
                path="/individual/:form_id"
                element={
                  <React.Suspense fallback={Loading()}>
                    <LazyAppIndividualRes />
                  </React.Suspense>
                }
              />
              <Route
                path="/formSubmit"
                element={
                  <React.Suspense fallback={Loading()}>
                    <LazyAppAfterSubmit />
                  </React.Suspense>
                }
              />
              <Route
                path="*"
                element={
                  <React.Suspense fallback={Loading()}>
                    <LazyAppPageURLError />
                  </React.Suspense>
                }
              />
            </Routes>
          </div>
        </div>
      </HashRouter>
    </>
  );
}

export default AppMain;
