import{j as e,r as n}from"./iframe-BXWLBCkp.js";import{I as l}from"./InputIconButton-BGgDza3y.js";import{S as s}from"./SearchInput-CfVqG-ke.js";import{V as p}from"./VStack-CnEfMFeL.js";import"./preload-helper-D9Z9MdNV.js";import"./IconButton-OIX0AFCz.js";import"./Button-W9Shg4T1.js";import"./Icon-CgDQ3NQp.js";import"./useTheme-BJazYlse.js";import"./Spinner-BAI0lrZ-.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./Text-Ch_dBU4v.js";import"./context-Cc0ZOVig.js";import"./useMergeRefs-DR4sGa7m.js";import"./InputIcon-hfAGuXGm.js";import"./TextInput-CXMiH86I.js";import"./usePrefixedId-Dfl-0DGQ.js";import"./HStack-B6p8qBpp.js";import"./HelperText-C1uG41Fa.js";import"./InputLabel-C3lBKQeI.js";import"./InputStack-DO5lXlgp.js";import"./tokens-BwScSksM.js";import"./ColorSurge-D5iBCkQQ.js";import"./useMotionProps-CS-LE6l8.js";import"./utils-CwomCnHN.js";import"./use-animation-CYeuSrS_.js";import"./motion-minimal-SVRWJYUW.js";import"./NativeInput-CDtkEvxu.js";const Q={title:"Components/Inputs/SearchInput",component:s},m=()=>{const[a,t]=n.useState("Value");return e.jsx(s,{accessibilityLabel:"Search",onChangeText:t,onClear:()=>{},placeholder:"Placeholder",value:a})},u=()=>{const[a,t]=n.useState("");return e.jsx(s,{hideStartIcon:!0,accessibilityLabel:"Search",onChangeText:t,onClear:()=>{},value:a})},x=()=>{const[a,t]=n.useState("");return e.jsx(s,{hideEndIcon:!0,accessibilityLabel:"Search",onChangeText:t,onClear:()=>{},value:a})},h=()=>{const[a,t]=n.useState("");return e.jsx(s,{compact:!0,accessibilityLabel:"searchbox",onChangeText:t,onClear:()=>{},value:a})},d=()=>{const[a,t]=n.useState("");return e.jsx(s,{disabled:!0,accessibilityLabel:"Search",onChangeText:t,onClear:()=>{},value:a})},g=({end:a})=>{const[t,i]=n.useState("");return e.jsx(s,{accessibilityLabel:"Search",end:a,onChangeText:i,onClear:()=>{},value:t})},r=()=>e.jsxs(p,{gap:2,children:[e.jsx(m,{}),e.jsx(d,{}),e.jsx(h,{}),e.jsx(u,{}),e.jsx(x,{}),e.jsx(g,{end:e.jsx(l,{active:!0,accessibilityHint:"Warning text",accessibilityLabel:"Warning text",name:"warning",onClick:()=>{},testID:"custom-close-iconbtn"})})]}),o=()=>{const[a,t]=n.useState(""),i=n.useCallback(c=>{t(c.target.value)},[t]);return e.jsxs("div",{children:[e.jsx(s,{accessibilityLabel:"Search",onChange:i,onChangeText:t,value:a}),e.jsx("p",{children:a})]})};r.__docgenInfo={description:"",methods:[],displayName:"Default"};o.__docgenInfo={description:`This tests how the SearchInput will work when
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
