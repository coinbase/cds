import{r,j as o}from"./iframe-BXWLBCkp.js";import{B as c}from"./Button-W9Shg4T1.js";import{V as p}from"./VStack-CnEfMFeL.js";import{T as n}from"./TabIndicator-EwmhyRSA.js";import"./preload-helper-D9Z9MdNV.js";import"./Icon-CgDQ3NQp.js";import"./useTheme-BJazYlse.js";import"./Spinner-BAI0lrZ-.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./Text-Ch_dBU4v.js";import"./usePreviousValues-rLMWE3mU.js";import"./useMotionProps-CS-LE6l8.js";import"./utils-CwomCnHN.js";import"./tokens-BwScSksM.js";import"./motion-minimal-SVRWJYUW.js";const e=()=>Math.random()*100+100,C={title:"Components/Tabs/TabIndicator",component:n},t=()=>{const[s,a]=r.useState(120),[i,m]=r.useState(120),d=()=>{a(e()),m(e())};return o.jsxs(p,{background:"bg",gap:2,padding:4,children:[o.jsx(c,{block:!0,onClick:d,children:"Randomize"}),o.jsx(n,{width:s,x:i})]})};t.__docgenInfo={description:"",methods:[],displayName:"Default"};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => {
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
