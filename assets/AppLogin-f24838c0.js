import{r,a as R,j as s}from"./index-40981194.js";const f="/React_FormBuilder/assets/User-c7ffe6d1.svg",k="/React_FormBuilder/assets/Lock-445e22d4.svg",w="/React_FormBuilder/assets/Unlock-e09a8fba.svg";function C(){const[n,c]=r.useState(""),[i,x]=r.useState(""),[o,m]=r.useState(""),[l,j]=r.useState(!1),[d,a]=r.useState("");let S=R();const[v,u]=r.useState(""),y=window.localStorage.getItem("token"),[t,g]=r.useState(!1),I=()=>{try{fetch(`${{}.VITE_REACT_APP_APIURL}/${t?"register":"login"}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t?{name:n,password:o}:{name:n,email:i,password:o})}).then(e=>e.json()).then(e=>{e.id||e._id?(u(t?e._id:e.id),window.localStorage.setItem("token",t?e._id:e.id)):a(e.message)})}catch(e){console.log("HAHA ",e.message)}},N=()=>{try{fetch(`${{}.VITE_REACT_APP_APIURL}/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:n,email:i,password:o})}).then(e=>e.json()).then(e=>{e.id||e._id?(u(t?e._id:e.id),window.localStorage.setItem("token",t?e._id:e.id)):a(e.message)})}catch(e){console.log("HAHA ",e.message)}},h=e=>{if(e.preventDefault(),t&&(console.log("Inside for mail"),i!=""&&n!=""&&o!="")){console.log("email ",i," name ",n," password ",o);let E=/^[^ ]+@[^ ]+\.[a-z]{2,3}$/;if(i.match(E))return N()}if(!t)return console.log("InsideOUT for mail"),I()},_=e=>{if(e=="No such user exist")return s.jsxs(s.Fragment,{children:["No such account exist, click here to"," ",s.jsx("b",{onClick:p,children:"register"})]});if(e=="incorrect email/password"||e=="incorrect username/password")return s.jsx(s.Fragment,{children:e});if(e=="Username already exist"||e=="Email already exist")return s.jsx(s.Fragment,{children:e})};r.useEffect(()=>{c(""),m("")},[t]),r.useEffect(()=>{y&&S("/user")},[v]);const p=()=>{a(""),t&&g(!1),t||g(!0)};return s.jsx(s.Fragment,{children:s.jsx("div",{className:"AppLogin",children:s.jsxs("div",{className:"AppLoginForm",children:[s.jsx("div",{className:"topPart",children:s.jsx("h2",{children:t?"REGISTER":"LOGIN"})}),s.jsx("div",{className:"formPart",children:s.jsxs("form",{onSubmit:h,children:[s.jsxs("div",{className:"formInputs",children:[s.jsx("img",{src:f}),s.jsx("input",{type:"text",value:n,onChange:e=>{a(""),c(e.target.value)},placeholder:"userName",autoComplete:"off"})]}),t?s.jsxs("div",{className:"formInputs",children:[s.jsx("img",{src:f}),s.jsx("input",{type:"text",value:i,onChange:e=>{a(""),x(e.target.value)},placeholder:"email",autoComplete:"off"})]}):null,s.jsxs("div",{className:"formInputs",children:[s.jsx("input",{type:l?"text":"password",value:o,onChange:e=>{a(""),m(e.target.value)},placeholder:"Enter your password"}),s.jsx("img",{style:o?{opacity:1,cursor:"pointer"}:{opacity:.5,cursor:"pointer"},src:l?w:k,onClick:()=>j(!l)})]}),s.jsx("button",{onClick:h,children:t?"REGISTER":"LOGIN"}),d?s.jsx("h3",{className:"registerorlogin",style:{color:"red",textAlign:"center"},children:_(d)}):s.jsxs("h3",{className:"registerorlogin",children:[t?"allready":"not"," a member ?"," ",s.jsx("b",{onClick:p,children:t?"Login":"Register"})]})]})})]})})})}export{C as default};