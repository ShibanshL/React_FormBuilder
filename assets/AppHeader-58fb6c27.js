import{r as l,u as x,a as h,j as e,L as o}from"./index-90020666.js";import{c as j}from"./Cross 2-f8268ff6.js";const p="/React_FormBuilder/assets/Menu-fa61d32d.svg";function k(){const[s,n]=l.useState(!1),[t,a]=l.useState(""),d=x(m=>m.page),r=window.localStorage.getItem("token");let i=h();const c=()=>{window.localStorage.removeItem("token"),i("/login")};l.useEffect(()=>{sessionStorage.setItem("CurrentTab",t)},[t]),l.useEffect(()=>{if(sessionStorage.getItem("CurrentTab"))return console.log("hgere"),a(sessionStorage.getItem("CurrentTab"))},[]);const u=()=>d=="APP_FORM"?null:e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"NavButtons",style:r?{display:"flex"}:{display:"none"},children:[e.jsxs("div",{children:[e.jsx(o,{to:"/user",className:t=="User"?"LinkP":"",onClick:()=>a("User"),children:e.jsx("p",{children:"YOUR FORMS"})}),e.jsx(o,{to:"/build",className:t=="Build"?"LinkP":"",onClick:()=>a("Build"),children:e.jsxs("p",{children:["BUILD FORMS"," "]})})]}),e.jsx("button",{onClick:c,children:"LOGOUT"})]}),e.jsxs("div",{className:"MobileHeaderPopover",style:s&&r?{zIndex:10}:{zIndex:-1},children:[e.jsx("div",{className:"ScreensEmptyPart"}),e.jsxs("div",{className:"HeaderMenuitems",children:[e.jsx("div",{className:"CloseOption",children:e.jsx("img",{src:j,alt:"",onClick:()=>n(!s)})}),e.jsxs("div",{className:"NavOptions",children:[e.jsx("h2",{onClick:()=>{i("/user"),n(!s)},children:"USER"}),e.jsx("h2",{onClick:()=>{i("/build"),n(!s)},children:"BUILD"}),e.jsx("button",{onClick:()=>{c(),n(!s)},children:"LOGOUT"})]})]})]})]});return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"AppHeader",children:[e.jsx(o,{to:"/",children:e.jsx("h2",{children:"FormBuilder"})}),e.jsx("div",{className:"MobileButton",children:e.jsx("img",{src:p,alt:"",style:r?{opacity:1}:{opacity:.5},onClick:()=>r?n(!s):null})}),u()]})})}export{k as default};
