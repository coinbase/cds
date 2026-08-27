import{j as e,r as n}from"./iframe-CYDANtMt.js";import{I as l}from"./InputIconButton-CL-x4fcy.js";import{S as s}from"./SearchInput-DFEQ8wDX.js";import{V as p}from"./VStack-iXgNewwv.js";import"./preload-helper-D9Z9MdNV.js";import"./IconButton-D-CYL-b9.js";import"./Button-DPtA13Wn.js";import"./Icon-DRxKkZdt.js";import"./useTheme-C_Ehsh33.js";import"./Spinner-CXotWqqb.js";import"./Pressable-BvczHaFK.js";import"./isArray-BJmyNVUi.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";import"./Text-0g3rWpAf.js";import"./context-C9K9uJvD.js";import"./useMergeRefs-DR4sGa7m.js";import"./InputIcon-DVp1nZL_.js";import"./TextInput-D1xg7XYw.js";import"./usePrefixedId-D1yZvkEs.js";import"./HStack-Fh-9TmPm.js";import"./HelperText-0iJbV5oL.js";import"./InputLabel-BwQhf82V.js";import"./InputStack-uMkha90v.js";import"./tokens-BwScSksM.js";import"./ColorSurge-COlvd6LS.js";import"./useMotionProps-BF3bCUsm.js";import"./utils-CM_X5is-.js";import"./use-animation-B-MH_N0S.js";import"./motion-minimal-B1h7XI-_.js";import"./NativeInput-Dr3zj32e.js";const Q={title:"Components/Inputs/SearchInput",component:s},m=()=>{const[a,t]=n.useState("Value");return e.jsx(s,{accessibilityLabel:"Search",onChangeText:t,onClear:()=>{},placeholder:"Placeholder",value:a})},u=()=>{const[a,t]=n.useState("");return e.jsx(s,{hideStartIcon:!0,accessibilityLabel:"Search",onChangeText:t,onClear:()=>{},value:a})},x=()=>{const[a,t]=n.useState("");return e.jsx(s,{hideEndIcon:!0,accessibilityLabel:"Search",onChangeText:t,onClear:()=>{},value:a})},h=()=>{const[a,t]=n.useState("");return e.jsx(s,{compact:!0,accessibilityLabel:"searchbox",onChangeText:t,onClear:()=>{},value:a})},d=()=>{const[a,t]=n.useState("");return e.jsx(s,{disabled:!0,accessibilityLabel:"Search",onChangeText:t,onClear:()=>{},value:a})},g=({end:a})=>{const[t,i]=n.useState("");return e.jsx(s,{accessibilityLabel:"Search",end:a,onChangeText:i,onClear:()=>{},value:t})},r=()=>e.jsxs(p,{gap:2,children:[e.jsx(m,{}),e.jsx(d,{}),e.jsx(h,{}),e.jsx(u,{}),e.jsx(x,{}),e.jsx(g,{end:e.jsx(l,{active:!0,accessibilityHint:"Warning text",accessibilityLabel:"Warning text",name:"warning",onClick:()=>{},testID:"custom-close-iconbtn"})})]}),o=()=>{const[a,t]=n.useState(""),i=n.useCallback(c=>{t(c.target.value)},[t]);return e.jsxs("div",{children:[e.jsx(s,{accessibilityLabel:"Search",onChange:i,onChangeText:t,value:a}),e.jsx("p",{children:a})]})};r.__docgenInfo={description:"",methods:[],displayName:"Default"};o.__docgenInfo={description:`This tests how the SearchInput will work when
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
