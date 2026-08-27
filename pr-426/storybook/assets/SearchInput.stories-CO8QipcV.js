import{j as e,r as n}from"./iframe-CsG_6vZR.js";import{I as l}from"./InputIconButton-D6rP7VAA.js";import{S as s}from"./SearchInput-Bvt5gl6w.js";import{V as p}from"./VStack-Cg_Yq2u4.js";import"./preload-helper-D9Z9MdNV.js";import"./IconButton-DNJ86Kiu.js";import"./Button-D2WSek5T.js";import"./Icon-DTs0crZh.js";import"./useTheme-CmrOhAty.js";import"./Spinner-C8x8bhOH.js";import"./Pressable-DDN99tmF.js";import"./isArray-M0ytM-vC.js";import"./Interactable--rqISG90.js";import"./color-Ceo1QMNe.js";import"./Text-B1CpMNU3.js";import"./context-fDezSldV.js";import"./useMergeRefs-DR4sGa7m.js";import"./InputIcon-CLvNTxep.js";import"./TextInput-D5KGlaku.js";import"./usePrefixedId-BL1THI0P.js";import"./HStack-DaDYipoP.js";import"./HelperText-W0U74shX.js";import"./InputLabel-CdlU6JsR.js";import"./InputStack-BFRjE954.js";import"./tokens-BwScSksM.js";import"./ColorSurge-2yE2z4Kr.js";import"./useMotionProps-BXBckQBf.js";import"./utils-y2S18Lx0.js";import"./use-animation-DHwoMYVB.js";import"./motion-minimal-5s2ikV7b.js";import"./NativeInput-8PS_q8WF.js";const Q={title:"Components/Inputs/SearchInput",component:s},m=()=>{const[a,t]=n.useState("Value");return e.jsx(s,{accessibilityLabel:"Search",onChangeText:t,onClear:()=>{},placeholder:"Placeholder",value:a})},u=()=>{const[a,t]=n.useState("");return e.jsx(s,{hideStartIcon:!0,accessibilityLabel:"Search",onChangeText:t,onClear:()=>{},value:a})},x=()=>{const[a,t]=n.useState("");return e.jsx(s,{hideEndIcon:!0,accessibilityLabel:"Search",onChangeText:t,onClear:()=>{},value:a})},h=()=>{const[a,t]=n.useState("");return e.jsx(s,{compact:!0,accessibilityLabel:"searchbox",onChangeText:t,onClear:()=>{},value:a})},d=()=>{const[a,t]=n.useState("");return e.jsx(s,{disabled:!0,accessibilityLabel:"Search",onChangeText:t,onClear:()=>{},value:a})},g=({end:a})=>{const[t,i]=n.useState("");return e.jsx(s,{accessibilityLabel:"Search",end:a,onChangeText:i,onClear:()=>{},value:t})},r=()=>e.jsxs(p,{gap:2,children:[e.jsx(m,{}),e.jsx(d,{}),e.jsx(h,{}),e.jsx(u,{}),e.jsx(x,{}),e.jsx(g,{end:e.jsx(l,{active:!0,accessibilityHint:"Warning text",accessibilityLabel:"Warning text",name:"warning",onClick:()=>{},testID:"custom-close-iconbtn"})})]}),o=()=>{const[a,t]=n.useState(""),i=n.useCallback(c=>{t(c.target.value)},[t]);return e.jsxs("div",{children:[e.jsx(s,{accessibilityLabel:"Search",onChange:i,onChangeText:t,value:a}),e.jsx("p",{children:a})]})};r.__docgenInfo={description:"",methods:[],displayName:"Default"};o.__docgenInfo={description:`This tests how the SearchInput will work when
onChange and onChangeText are used together`,methods:[],displayName:"OnChangeExample"};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => <VStack gap={2}>
    <Basic />
    <Disabled />
    <Compact />
    <HideStartIcon />
    <HideEndIcon />
    <CustomEndNode end={<InputIconButton active accessibilityHint="Warning text" accessibilityLabel="Warning text" name="warning" onClick={() => {}} testID="custom-close-iconbtn" />} />
  </VStack>`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => {
  const [text, setText] = useState('');
  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, [setText]);
  return <div>
      <SearchInput accessibilityLabel="Search" onChange={handleOnChange} onChangeText={setText} value={text} />
      <p>{text}</p>
    </div>;
}`,...o.parameters?.docs?.source},description:{story:`This tests how the SearchInput will work when
onChange and onChangeText are used together`,...o.parameters?.docs?.description}}};const U=["Default","OnChangeExample"];export{r as Default,o as OnChangeExample,U as __namedExportsOrder,Q as default};
