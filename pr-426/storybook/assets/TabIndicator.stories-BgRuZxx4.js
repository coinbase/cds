import{r,j as o}from"./iframe-CYDANtMt.js";import{B as c}from"./Button-DPtA13Wn.js";import{V as p}from"./VStack-iXgNewwv.js";import{T as n}from"./TabIndicator-4v5NCSZg.js";import"./preload-helper-D9Z9MdNV.js";import"./Icon-DRxKkZdt.js";import"./useTheme-C_Ehsh33.js";import"./Spinner-CXotWqqb.js";import"./Pressable-BvczHaFK.js";import"./isArray-BJmyNVUi.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";import"./Text-0g3rWpAf.js";import"./usePreviousValues-CzZr0hLN.js";import"./useMotionProps-BF3bCUsm.js";import"./utils-CM_X5is-.js";import"./tokens-BwScSksM.js";import"./motion-minimal-B1h7XI-_.js";const e=()=>Math.random()*100+100,C={title:"Components/Tabs/TabIndicator",component:n},t=()=>{const[s,a]=r.useState(120),[i,m]=r.useState(120),d=()=>{a(e()),m(e())};return o.jsxs(p,{background:"bg",gap:2,padding:4,children:[o.jsx(c,{block:!0,onClick:d,children:"Randomize"}),o.jsx(n,{width:s,x:i})]})};t.__docgenInfo={description:"",methods:[],displayName:"Default"};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => {
  const [width, setWidth] = useState(120);
  const [x, setX] = useState(120);
  const handlePress = () => {
    setWidth(getRandomNumber());
    setX(getRandomNumber());
  };
  return <VStack background="bg" gap={2} padding={4}>
      <Button block onClick={handlePress}>
        Randomize
      </Button>
      <TabIndicator width={width} x={x} />
    </VStack>;
}`,...t.parameters?.docs?.source}}};const D=["Default"];export{t as Default,D as __namedExportsOrder,C as default};
