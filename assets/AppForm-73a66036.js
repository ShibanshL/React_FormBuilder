import{r as s,u as xe,a as ge,c as Se,j as e}from"./index-40981194.js";import{a as je,c as be,d as De,u as ye,e as Ae}from"./APIREQ-0625b774.js";function Ne(){var O,w,P,k,Q,C,R,I,_,Y,B,L,M,U;const W=window.localStorage.getItem("token"),[n,Z]=s.useState([]),[ee,te]=s.useState([]),se=xe(t=>t.setPage),[ae,T]=s.useState([]),[ie,re]=s.useState(!1),[u,le]=s.useState(""),[y,S]=s.useState(""),[oe,ne]=s.useState(""),[j,ce]=s.useState([]),[h,A]=s.useState(0),[b,ue]=s.useState([]),[c,de]=s.useState([]),[x,p]=s.useState(!1),[v,F]=s.useState(0),[E,fe]=s.useState([]),[f,q]=s.useState([]),[me,d]=s.useState("");let he=ge(),{form_id:g,ac_id:N}=Se();const pe=()=>{var z,H,V,X,$,G,J,K;d(""),p(!0);let t=0,o=0,i=[],r=[],l=(V=(H=(z=n.data)==null?void 0:z.subData)==null?void 0:H.formData)==null?void 0:V.formDataArray,m=/^[^ ]+@[^ ]+\.[a-z]{2,3}$/;if(u)if(u.match(m)){S("true");for(let a=0;a<((G=($=(X=n.data)==null?void 0:X.subData)==null?void 0:$.formData)==null?void 0:G.formDataArray.length);a++)if(l[a].required){l[a].answerType=="Text"&&(l[a].textAnswer==""||!l[a].textAnswer?(t+=1,r.splice(l[a],0),q(r)):(r.push(l[a]),q(r)));for(let D=0;D<l[a].options.length;D++)l[a].options[D].isSingle_Selected==!0&&(i.push(l[a]),T(i),F(v+1)),l[a].options[D].isSingle_Selected==!1&&(i.splice(l[a],0),T(i),F(v+1))}}else S("false"),d("Please enter a valid mail");else S("false");if(t==0){for(let a=0;a<j.length;a++)u==((K=(J=j[a].sub)==null?void 0:J.data)==null?void 0:K.formEmail)&&(o+=1);o==0&&A(h+1),o!=0&&(h>0&&A(h-1),h<=0&&A(0))}};return s.useEffect(()=>{let t=[];ae.map(o=>{t.includes(o.id)||t.push(o.id)}),de(t.sort())},[v]),s.useEffect(()=>{var i,r,l;let t=[],o=[];n&&((l=(r=(i=n.data)==null?void 0:i.subData)==null?void 0:r.formData)==null||l.formDataArray.map(m=>{m.required&&(m.answerType=="Options"&&t.push(m.id),m.answerType=="Text"&&(o.push(m.id),fe(o)))}),ue(t))},[(P=(w=(O=n.data)==null?void 0:O.subData)==null?void 0:w.formData)==null?void 0:P.formDataArray]),s.useEffect(()=>{je({userDataPre:ee,setLoading:re,ac_id:N,form_id:g,setuserDataPre:te,setuserData:Z}),be({globalToken:W,form_id:g,setFormRes:ce})},[N]),s.useEffect(()=>{c.length==0&&f.length==0&&u==""&&d("Please enter your email first"),u!=""&&(c.length==0&&f.length==0&&y=="true"&&d("You've not filled any Questions. 00"),(f.length==0||f.length!==E.length)&&d("You've missed some of the required questions"),(c.length==0||c.length!==b.length)&&d("You've missed some of the required questions")),x&&setTimeout(()=>p(!1),3e3)},[x]),s.useEffect(()=>{var o,i;let t=0;for(let r=0;r<j.length;r++)u==((i=(o=j[r].sub)==null?void 0:o.data)==null?void 0:i.formEmail)&&c.length!=0&&f.length!=0&&(t+=1);b.length==c.length&&c.length>0&&h>0&&E.length==f.length&&t==0&&(De({email:u,userData:n,ac_id:N,form_id:g}),ye(g),Ae(g),he("/formSubmit"),p(!1)),t>0&&d("This mail has aleready been used, use a new mail."),(b.length!==c.length||f.length!==E.length)&&d("You've missed some of the required questions")},[b&&c||h]),s.useEffect(()=>se("APP_FORM")),new Date((Q=(k=n==null?void 0:n.data)==null?void 0:k.subData)==null?void 0:Q.formExpiryData)<new Date?e.jsx(e.Fragment,{children:e.jsx("div",{className:"DatePass",children:e.jsx("div",{className:"DatePass_card",children:"Sorry, the form has expired. You missed the form!!"})})}):ie?e.jsx(e.Fragment,{children:e.jsx("div",{className:"Loading",children:e.jsx("h1",{children:"Loading..."})})}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"AppForm",children:[e.jsxs("div",{className:"AppFormHeadingTab",children:[e.jsx("h2",{children:(I=(R=(C=n.data)==null?void 0:C.subData)==null?void 0:R.formQuestion)==null?void 0:I.question}),e.jsx("label",{children:(B=(Y=(_=n.data)==null?void 0:_.subData)==null?void 0:Y.formQuestion)==null?void 0:B.description})]}),e.jsxs("div",{className:"AppFormEmail",children:[e.jsxs("div",{className:"AppEmailQuestion",children:[e.jsxs("label",{children:["Please Enter your email.",e.jsx("div",{className:"ifMobileEm",style:{color:"rgb(216, 61, 30)"},children:"*"})]}),e.jsx("div",{className:"ImpBadgeEmail",children:"REQUIRED"})]}),e.jsx("input",{type:"text",placeholder:"Email",style:y!=""?y!="true"?{border:"3px solid red"}:{border:"none"}:{border:"none"},value:u,onChange:t=>{le(t.target.value),S("true"),p(!1)},autoComplete:"off"})]}),(U=(M=(L=n.data)==null?void 0:L.subData)==null?void 0:M.formData)==null?void 0:U.formDataArray.map((t,o)=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:"AppFormQuestions",children:[e.jsxs("div",{className:"AppFormLabel",children:[e.jsxs("label",{children:["Q",o+1,". ",t.question,"? ",e.jsx("div",{className:"ifMobile",style:t.required?{color:"rgb(216, 61, 30)"}:{color:"#abc4ff"},children:t.required?"*":""})]}),t.required?e.jsx("div",{className:"ImpBadge",children:"required"}):null]}),t.isOpen?e.jsx(e.Fragment,{children:t.options.map((i,r)=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:"AppFormOptions",children:[t.multiselect?e.jsx("input",{type:"checkbox",value:i.OptionSub,onClick:()=>{t.multiselect==!0&&(t.options[r].isSelected=t.options[r].isSelected!=!0)}}):e.jsx("input",{type:"checkbox",value:oe,checked:!!t.options[r].isSingle_Selected,onClick:()=>{ne(i.OptionSub)},onChange:l=>{t.options[r].isSingle_Selected=l.target.checked,p(!1)}}),e.jsx("label",{children:i.OptionSub})]})}))}):e.jsx("textarea",{id:"myTxtArea",role:"textbox",placeholder:"Enter your answer",onChange:i=>{t.textAnswer=i.target.value,p(!1)}})]})})),e.jsx("div",{className:"SubmitData",children:e.jsx("button",{onClick:pe,style:x?{opacity:.5}:{opacity:1},disabled:x,children:"Submit"})})]}),e.jsx("div",{className:"AppFormNotif",style:x?{transform:"translate(-50%, -10%)"}:{transform:"translate(-50%, 120%)"},children:e.jsx("div",{className:"AppNotification",children:e.jsx("h2",{children:me})})})]})}export{Ne as default};