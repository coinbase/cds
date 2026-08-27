import{r as n,j as e}from"./iframe-BXWLBCkp.js";import{T as y}from"./Text-Ch_dBU4v.js";import{S as k}from"./Spacer-BI_0XOyg.js";import{V as D}from"./VStack-CnEfMFeL.js";import"./preload-helper-D9Z9MdNV.js";const o=n.memo(({radius:t,strokeWidth:c,progress:d,indeterminate:s=!0,testID:l})=>{const m=t-c*2,a=m*2*Math.PI,[i,h]=n.useState(s?0:d),[u,p]=n.useState("forward"),g=a-(s?i:d)/100*a;return n.useEffect(()=>{if(s){const x=setInterval(()=>{i>=100&&p("backward"),i<=0&&p("forward"),h(f=>u==="forward"?f+1:f-1)},10);return()=>{clearInterval(x)}}},[s,i,u]),e.jsx("svg",{"data-testid":l,height:t*2,width:t*2,children:e.jsx("circle",{cx:t,cy:t,"data-testid":`${l}-circle`,fill:"transparent",r:m,stroke:"blue",strokeDasharray:`${a} ${a}`,strokeDashoffset:g,strokeWidth:c})})});o.displayName="CircularProgress";o.__docgenInfo={description:"",methods:[],displayName:"CircularProgress",props:{radius:{required:!0,tsType:{name:"number"},description:"Radius of circular progress"},strokeWidth:{required:!0,tsType:{name:"number"},description:"Stroke width of circular progress"},progress:{required:!0,tsType:{name:"number"},description:"For determinate variant, you can specify the exact moment to pause the circular progress at"},indeterminate:{required:!1,tsType:{name:"boolean"},description:`A boolean flag indicating whether the circular progress is
 in indeterminate or determinate states.
 Indeterminate (true) - indicators visualize an unspecified wait time
 Determinate (false) - indicators display how long an operation will take.
 @default true`,defaultValue:{value:"true",computed:!1}},testID:{required:!1,tsType:{name:"string"},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`}}};const T={component:o,title:"Components/Loaders/CircularProgress"},r=()=>e.jsxs(D,{alignItems:"flex-start",children:[e.jsx(y,{as:"h1",display:"block",font:"title1",children:"Determinate"}),e.jsx(k,{}),e.jsx(o,{indeterminate:!1,progress:80,radius:30,strokeWidth:4})]});r.__docgenInfo={description:"",methods:[],displayName:"Determinate"};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => {
  return <VStack alignItems="flex-start">
      <Text as="h1" display="block" font="title1">
        Determinate
      </Text>
      <Spacer />
      <CircularProgress indeterminate={false} progress={80} radius={30} strokeWidth={4} />
    </VStack>;
}`,...r.parameters?.docs?.source}}};const j=["Determinate"];export{r as Determinate,j as __namedExportsOrder,T as default};
