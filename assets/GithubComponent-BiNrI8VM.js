import{r as d,u as x,f as h,a as o,j as e,L as p,H as r}from"./index-C2Feftyy.js";const v=()=>{const[s,t]=d.useState(""),n=x(),a=i=>{t(i.target.value)};d.useEffect(()=>{s&&n(h(s))},[s,n]);const l=o(i=>i.github.list),c=o(i=>i.github.isLoading);return e.jsxs(e.Fragment,{children:[e.jsx(u,{onChange:a,value:s}),c?e.jsx(p,{}):e.jsx(g,{data:l})]})},u=({value:s,onChange:t})=>e.jsx(f,{id:1,onChange:t,value:s}),g=s=>{if(s.data){let t=s.data;return t.message==="Not Found"?e.jsxs("div",{className:"notfound",children:[e.jsx("h2",{children:"Oops !!!"}),e.jsx("p",{children:"Oops no Repos there!. Try Again "})]}):e.jsx("div",{children:e.jsx(m,{children:t?.items?.map((n,a)=>e.jsxs(j,{children:[e.jsxs("div",{children:[e.jsx("span",{children:"Repo name: "})," ",e.jsxs("a",{href:n.name,children:[n.name," "]})]}),e.jsxs("div",{children:[e.jsx("span",{children:"Desc: "})," ",n?.description?.substring(0,60)]}),e.jsxs("div",{children:[e.jsx("span",{children:"By: "})," ",n.owner.login]}),e.jsxs("div",{children:[e.jsx("span",{children:"Last Update: "})," ",n.updated_at]}),e.jsxs("div",{children:[e.jsx("span",{children:"URL: "})," ",e.jsxs("a",{href:n.url,children:[n.url," "]})]}),e.jsxs("div",{children:[e.jsx("span",{children:"HTML URL: "})," ",e.jsxs("a",{href:n.html_url,children:[n.html_url," "]})]})]},a))})})}else return e.jsx("div",{className:"center",children:"Fetching data . . ."})},f=r.input`
  padding-top: 29px;
  width: 100%;
  height: 50px;
  margin: 1px 0;
  padding: 16px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  text-overflow: ellipsis;
  background-color: transparent;
  box-shadow: none;
  box-sizing: border-box;
  color: #242629;
  letter-spacing: normal;
  text-decoration: none;
  text-transform: none;
  text-shadow: none;
  text-indent: 0;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-stretch: normal;
  line-height: 0;
  border: 1px solid #d3d4d4;
  margin-bottom: 10px;
`,m=r.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  min-height: 600px;
  background: #1f1b2e;
  text-align: center;
  margin: 50px auto;
  padding: 25px;
  border-radius: 10px;
  margin: 0;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
    'Lucida Sans', Arial, sans-serif;
  box-sizing: border-box;
  width: 100%;
`,j=r.div`
  display: flex;
  flex-direction: column;
  margin: 0px 0px 10px 0px;
  color: #fff;
  background: #312b45;
  padding: 16px;
  border-radius: 5px;
  width: 100%;
  height: 120px;
  box-sizing: border-box;
  line-height: 14px;

  a {
    color: #fff;
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 12px;
  }
`;export{v as default};
