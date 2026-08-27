import{r,j as o}from"./iframe-CsG_6vZR.js";import{B as c}from"./Button-D2WSek5T.js";import{V as p}from"./VStack-Cg_Yq2u4.js";import{T as n}from"./TabIndicator-CK1GC29Q.js";import"./preload-helper-D9Z9MdNV.js";import"./Icon-DTs0crZh.js";import"./useTheme-CmrOhAty.js";import"./Spinner-C8x8bhOH.js";import"./Pressable-DDN99tmF.js";import"./isArray-M0ytM-vC.js";import"./Interactable--rqISG90.js";import"./color-Ceo1QMNe.js";import"./Text-B1CpMNU3.js";import"./usePreviousValues-BaYVE0C4.js";import"./useMotionProps-BXBckQBf.js";import"./utils-y2S18Lx0.js";import"./tokens-BwScSksM.js";import"./motion-minimal-5s2ikV7b.js";const e=()=>Math.random()*100+100,C={title:"Components/Tabs/TabIndicator",component:n},t=()=>{const[s,a]=r.useState(120),[i,m]=r.useState(120),d=()=>{a(e()),m(e())};return o.jsxs(p,{background:"bg",gap:2,padding:4,children:[o.jsx(c,{block:!0,onClick:d,children:"Randomize"}),o.jsx(n,{width:s,x:i})]})};t.__docgenInfo={description:"",methods:[],displayName:"Default"};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => {
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
