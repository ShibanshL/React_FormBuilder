const D=async t=>{const{setFormRes:a,setAllFormRes:e,setLoading:r,globalToken:l,form_id:c,page:n,state:o}=t;r(!0);const i=`https://form-api-lilac.vercel.app/formSub/${l}/${c}`,s=await(await fetch(i)).json();a&&a(s.data[s.data.length-1]),n!="INDIVIDUAL_RES"&&e(s.data),n=="FORMRESPONSES"&&s.map(f=>{f.sub.data.userFormId==c&&a&&a(f)}),n=="INDIVIDUAL_RES"&&s.data.map(f=>{f.sub.data.formEmail==o.personal_email&&e(f)}),r(!1)},m=async t=>{const{setLoading:a,setuserData:e,globalToken:r,form_id:l,setFormData:c,page:n}=t;a(!0);const o=`https://form-api-lilac.vercel.app/data/${r}`,d=await(await fetch(o)).json();e(d),n=="FORMRESPONSES"&&l!=null&&d.map(s=>{s.data.subData.formData.formUID==l&&c&&c(s.data.subData)}),a(!1)},u=async(t,a)=>{try{fetch(`https://form-api-lilac.vercel.app/indRes/${t}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userID:a,formID:t,chartData:[{date:`${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`,res:0}]})}).then(e=>e.json()).then(e=>{console.log(e)})}catch(e){console.log("Error : ",e)}};let h=new Date;const g=t=>{const{allData:a,formID:e,globalToken:r,date:l,heading:c,desc:n,nav:o}=t,d={subData:{userUID:r,formData:{formDataArray:a,formUID:e},formExpiryData:l,response:0,createdOn:`${h.getDate()+"/"+(h.getMonth()+1)+"/"+h.getFullYear()}`,formQuestion:{question:c,description:n}}};fetch(`https://form-api-lilac.vercel.app/build/${e}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({data:d})}).then(s=>s.json()).then(s=>{s&&o("/user")})},$=t=>{fetch(`https://form-api-lilac.vercel.app/getbuild/${t}`,{method:"PATCH",headers:{"Content-Type":"application/json"}}).then(a=>a.json()).then(()=>{})},b=t=>{fetch(`https://form-api-lilac.vercel.app/indRes/${t}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({date:`${new Date().getDate()}-${new Date().getMonth()+1}-${new Date().getFullYear()}`})}).then(a=>a.json()).then(a=>{console.log(a)})},y=async(t,a,e)=>{let r=[],l=`https://form-api-lilac.vercel.app/indRes/${t}`,o=await(await fetch(l)).json();if(o[0].chartData.length>0)for(let i=0;i<o[0].chartData.length;i++){let d=o[0].chartData[i].date.split("-"),s=d[0],f=d[1],p=`${s}-${f}`;o[0].chartData[i].date=p}if(e(o[0].chartData),o[0].chartData.length<7&&a(o[0].chartData),o[0].chartData.length>7){for(let i=o[0].chartData.length-7;i<o[0].chartData.length;i++)r.push(o[0].chartData[i]);a(r)}},S=t=>{var a,e,r,l,c,n;fetch(`https://form-api-lilac.vercel.app/formSub/${t.ac_id}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({sub:{data:{formEmail:t.email,formQuestion:(r=(e=(a=t.userData)==null?void 0:a.data)==null?void 0:e.subData)==null?void 0:r.formQuestion,formSub:(n=(c=(l=t.userData.data)==null?void 0:l.subData)==null?void 0:c.formData)==null?void 0:n.formDataArray,userFormAc:t.ac_id,userFormId:t.form_id,creationDate:`${h.getDate()+"/"+(h.getMonth()+1)+"/"+h.getFullYear()}`,creationTime:`${h.getHours()+":"+h.getMinutes()+":"+h.getSeconds()}`}}})}).then(o=>o.json()).then(o=>{console.log(o)})},j=async t=>{let{globalToken:a,form_id:e,setFormRes:r}=t;const l=`https://form-api-lilac.vercel.app/formSub/${a}/${e}`,n=await(await fetch(l)).json();r(n.data)},w=async t=>{let{userDataPre:a,setLoading:e,ac_id:r,form_id:l,setuserDataPre:c,setuserData:n}=t;if(a){e(!0);const o=`https://form-api-lilac.vercel.app/data/${r}`;(await(await fetch(o)).json()).map(s=>{s.data.subData.formData.formUID==l&&(c(s),n(s))}),e(!1)}else n(a)};export{w as a,u as b,j as c,S as d,b as e,m as f,D as g,y as h,g as p,$ as u};
