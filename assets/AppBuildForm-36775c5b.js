import{a as ee,u as C,b as te,s as se,r as l,j as t}from"./index-519f31f6.js";import{C as ne}from"./Cross 2-5fe52e58.js";import{f as ie,b as oe,p as ae}from"./APIREQ-0625b774.js";function pe(){const f=window.localStorage.getItem("token");let v=ee();const D=C(e=>e.page),B=C(e=>e.setPage),[m,u]=te(e=>[e.message,e.setMessage],se),[d,E]=l.useState(""),[w,I]=l.useState(""),[R,Q]=l.useState(0),[T,S]=l.useState(!1),[N,y]=l.useState(!1),[j,F]=l.useState(0),[s,g]=l.useState([]),[P,c]=l.useState(!1),[b,k]=l.useState(""),[h,A]=l.useState([]),[L,H]=l.useState([]),[M,_]=l.useState(!1),[$,z]=l.useState(!1),[q,U]=l.useState(""),[O,Y]=l.useState(""),[W,x]=l.useState("");l.useEffect(()=>{f||v("/")},[]),l.useEffect(()=>{ie({setLoading:_,setuserData:H,globalToken:f})},[f]),l.useEffect(()=>{setInterval(()=>{x("")},3e3)},[W]),l.useEffect(()=>{B("BUILD_FORM")},[]);const G=()=>{let e=0,o=0,n=0,i=0,r={id:j,question:"",answerType:"",isOpen:!1,multiselect:!1,required:!1,options:[]};if(d){if(s.length==0)s.push(r),F(j+1);else if(s.length<20){for(let a=0;a<s.length;a++)if(s[a].question==""&&(y(!0),e=e+1),s[a].answerType==""&&(s[a].question!=""&&u("Please select an answer"),o=o+1),s[a].multiselect==!0&&s[a].options.length<2&&(n=n+1,c(!0)),s[a].answerType=="Options")for(let p=0;p<s[a].options.length;p++)s[a].options.length<2?(n=n+1,u("Please at least have 2 options"),c(!0)):(s[a].options[p].OptionSub==null||s[a].options[p].OptionSub==""||s[a].options[p].OptionSub==" "||s[a].options[p].OptionSub.length==0)&&(console.log("Inside the thing",p),u("Please don't leave an option empty"),i=i+1,c(!0),h.includes(p)||h.push(p),console.log(h))}else u("You cannot have more than 20 questions");e==0&&o==0&&s.length<20&&(b=="Options"&&n==0&&i==0||b=="Text")&&(s.push(r),F(j+1),A([]))}d||(S(!0),u("Please make an heading")),Q(R+1)},J=()=>D=="BUILD_FORM"?{transition:"0.5s ease",width:"50px",height:"50px",borderRadius:"50px"}:{transition:"0.5s ease",width:"50px",height:"50px",borderRadius:"50px"},K=e=>{let o=[...s];if(g(o),e.options.length==0)e.options.push({id:e.options.length});else if(e.options.length<10){let n=0;for(let i=0;i<e.options.length;i++)(e.options[i].OptionSub==null||e.options[i].OptionSub==""||e.options[i].OptionSub==" ")&&(n=n+1,c(!0));n==0&&e.options.push({id:e.options.length})}else u("You can only have 10 options at most")};l.useEffect(()=>{U(V())},[]);function V(){return"xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var o=Math.random()*16|0,n=e=="x"?o:o&3|8;return n.toString(16)})}const X=()=>{let e=0,o=0,n=0,i=0;if(d){for(let r=0;r<s.length;r++)if(s[r].question==""&&(y(!0),e=e+1,x("Please enter the question")),s[r].answerType==""&&(s[r].question!=""&&u("Please select an answer"),o=o+1,x("Please select an answer option")),s[r].answerType=="Options")for(let a=0;a<s[r].options.length;a++)s[r].options.length<2?(n=n+1,x("Please do not leave an option empty"),u("Please have atleast 2 options"),c(!0)):(s[r].options[a].OptionSub==null||s[r].options[a].OptionSub==""||s[r].options[a].OptionSub==" "||s[r].options[a].OptionSub.length==0)&&(console.log("Inside the thing",a),x("Please do not leave an option empty"),u("Please don't leave an empty option"),i=i+1,c(!0),h.includes(a)||h.push(a),console.log(h));e==0&&o==0?(b=="Options"&&n==0&&i==0||b=="Text")&&z(!0):console.log("its not fully filled")}d||(S(!0),u("Please write the heading"))};if(M)return t.jsx(t.Fragment,{children:t.jsx("div",{className:"Loading",children:t.jsx("h1",{children:"Loading..."})})});if(L.length>=4)return t.jsx(t.Fragment,{children:t.jsx("div",{className:"MaxLimitReached",children:t.jsx("div",{className:"MaxLimitCards",children:t.jsx("h1",{children:"Sorry you've reached the max number of forms allowed for a single account!!"})})})});const Z=(e,o)=>{s.map((n,i)=>{e==i&&(o=="required"&&(n.required==!1?n.required=!0:n.required=!1),o=="multiselect"&&(n.multiselect==!1?n.multiselect=!0:n.multiselect=!1))})};return t.jsxs(t.Fragment,{children:[t.jsxs("div",{className:"AppBuildForm",children:[t.jsxs("div",{className:"FormButtonsTabs",children:[t.jsx("h2",{children:"Form Builder"}),t.jsxs("div",{className:"FormTopBarButtons",children:[t.jsx("button",{onClick:()=>{G()},children:"Add"}),t.jsx("button",{onClick:X,children:"Submit"})]})]}),t.jsx("div",{className:"FormHeading",children:t.jsx("input",{type:"text",placeholder:T?"Please enter a form heading first":"Enter Form Heading",value:d,style:T?{border:"3px solid red"}:{border:"none"},onChange:e=>{E(e.target.value),S(!1)}})}),t.jsx("div",{className:"FormDesc",children:t.jsx("textarea",{placeholder:"Enter form description (Optional)",value:w,onChange:e=>{I(e.target.value)}})}),s.map((e,o)=>t.jsx(t.Fragment,{children:t.jsxs("div",{className:"FormQuestions",style:e.isOpen==!0?{minHeight:"40vh"}:{minHeight:"20vh"},children:[t.jsxs("div",{className:"QuestionsTopPart",children:[t.jsx("input",{type:"text",style:N&&e.question==""&&e.id==o?{border:"3px solid red"}:{border:"none"},onChange:n=>{s[o].question=n.target.value,e.id==o&&y(!1);let i=[...s];g(i)},placeholder:N?`Please fill Q.no ${o+1} up first`:`${o+1}. Enter your Question`}),t.jsxs("div",{className:"FormButton",children:[t.jsxs("div",{className:"FormButtonLeft",children:[t.jsxs("div",{className:"Required",children:[t.jsx("input",{type:"checkbox",value:e.required,onClick:()=>{Z(e.id,"required")}}),t.jsx("label",{children:"Required"})]}),t.jsx("button",{onClick:()=>{let n=[...s];n.forEach(i=>{o==i.id&&(i.answerType="Text")}),g(n),e.options=[],e.isOpen=!1,k("Text")},style:s[o].answerType=="Text"?{background:"white",color:"#abc4ff"}:{background:"#abc4ff",color:"white"},children:"Text"}),t.jsx("button",{onClick:()=>{let n=[...s];n.forEach(i=>{o==i.id&&(i.answerType="Options",i.options.length==0&&i.options.push({id:0}))}),g(n),k("Options"),e.isOpen=!0},style:s[o].answerType=="Options"?{background:"white",color:"#abc4ff"}:{background:"#abc4ff",color:"white"},children:"Options"})]}),t.jsx("div",{className:"FormButtonRight",children:t.jsx("button",{style:e.isOpen?{display:"block"}:{border:"none",cursor:"default",display:"none"},disabled:!e.isOpen,onClick:()=>{K(e)},children:t.jsx("img",{className:"add",src:ne,alt:""})})})]})]}),t.jsx("div",{className:"QuestionsBottomPart",style:e.isOpen==!0?{minHeight:"20vh"}:{display:"none"},children:e.options.map((n,i)=>t.jsx(t.Fragment,{children:t.jsx("input",{onChange:r=>{s[o].options[i].OptionSub=r.target.value,c(!1)},style:P&&(n.OptionSub==null||n.OptionSub==""||n.OptionSub==" ")?{border:"2px solid red"}:{border:"none"},type:"text",placeholder:P&&(n.OptionSub==null||n.OptionSub==""||n.OptionSub==" ")?"Please enter some value":`Enter option no ${i+1}`})}))})]})}))]}),t.jsx("div",{className:"AppBuildForm_Popover",style:$?{zIndex:5}:{zIndex:-1},children:t.jsxs("div",{className:"SubmitTab",children:[t.jsxs("div",{className:"DatePicker",children:[t.jsx("h2",{children:"Please Select Expiry date for the form!!"}),t.jsx("input",{type:"date",min:new Date().toISOString().split("T")[0],style:{width:"100%",backgroundColor:"#abc4ff",color:"white",textTransform:"uppercase",fontWeight:600},value:O,onChange:e=>Y(e.target.value)})]}),t.jsx("button",{disabled:!O,onClick:()=>{oe(q,f),ae({allData:s,globalToken:f,formID:q,date:O,heading:d,desc:w,nav:v})},children:"Submit"})]})}),t.jsx("div",{className:"Notification",style:m?window.screen.width<500?{width:"200px",height:"100px",transition:"0.5s ease"}:{width:"400px",height:"100px",transition:"0.5s ease"}:J(),children:t.jsx("div",{className:"Notification_sub",style:m?{}:{transition:"0.5s ease",borderRadius:"50px"},children:t.jsx("h3",{style:m?{transition:"0.5s ease",opacity:1}:{transition:"0.5s ease",opacity:0},children:m})})})]})}export{pe as default};
