import{j as e,r as c}from"./iframe-CYDANtMt.js";import{I as l}from"./InputStack-uMkha90v.js";import{N as i}from"./NativeInput-Dr3zj32e.js";import"./preload-helper-D9Z9MdNV.js";import"./tokens-BwScSksM.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";import"./useTheme-C_Ehsh33.js";import"./HStack-Fh-9TmPm.js";import"./VStack-iXgNewwv.js";import"./ColorSurge-COlvd6LS.js";import"./useMotionProps-BF3bCUsm.js";import"./utils-CM_X5is-.js";import"./use-animation-B-MH_N0S.js";import"./motion-minimal-B1h7XI-_.js";import"./InputLabel-BwQhf82V.js";import"./Text-0g3rWpAf.js";const F={title:"Components/Inputs/NativeInput",component:i},t=function(){return e.jsx(l,{inputNode:e.jsx(i,{accessibilityLabel:"Label"}),labelNode:"Label"})},m="containerSpacingCss-crm5ols",n=function(){return e.jsx(l,{inputNode:e.jsx(i,{accessibilityLabel:"Label",containerSpacing:m}),labelNode:"Label"})},o=function(){const p=["start","end"];return e.jsx("div",{children:p.map(s=>e.jsx(l,{inputNode:e.jsx(i,{accessibilityLabel:"Label",align:s,placeholder:`${s}-placeholder`}),labelNode:"Label"}))})},a=function(){const p=c.useCallback(()=>{console.log("Focusing")},[]),s=c.useCallback(()=>{console.log("Blurring")},[]),u=c.useCallback(()=>{console.log("Key down")},[]),d=c.useCallback(()=>{console.log("Clicked")},[]);return e.jsx(l,{inputNode:e.jsx(i,{accessibilityLabel:"Label",onBlur:s,onClick:d,onFocus:p,onKeyDown:u}),labelNode:"Label"})};t.__docgenInfo={description:"",methods:[],displayName:"NativeInputBasic"};n.__docgenInfo={description:"",methods:[],displayName:"NativeInputCustomContainerSpacing"};o.__docgenInfo={description:"",methods:[],displayName:"NativeInputTextAlign"};a.__docgenInfo={description:"",methods:[],displayName:"NativeInputActions"};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`function NativeInputBasic() {
  return <InputStack inputNode={<NativeInput accessibilityLabel="Label" />} labelNode="Label" />;
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`function NativeInputCustomContainerSpacing() {
  return <InputStack inputNode={<NativeInput accessibilityLabel="Label" containerSpacing={containerSpacingCss} />} labelNode="Label" />;
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`function NativeInputTextAlign() {
  const textAlignments = ['start', 'end'] as const;
  return <div>
      {textAlignments.map(align => <InputStack inputNode={<NativeInput accessibilityLabel="Label" align={align} placeholder={\`\${align}-placeholder\`} />} labelNode="Label" />)}
    </div>;
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`function NativeInputOnFocus() {
  const onFocus = useCallback(() => {
    console.log('Focusing');
  }, []);
  const onBlur = useCallback(() => {
    console.log('Blurring');
  }, []);
  const onKeyDown = useCallback(() => {
    console.log('Key down');
  }, []);
  const onClick = useCallback(() => {
    console.log('Clicked');
  }, []);
  return <InputStack inputNode={<NativeInput accessibilityLabel="Label" onBlur={onBlur} onClick={onClick} onFocus={onFocus} onKeyDown={onKeyDown} />} labelNode="Label" />;
}`,...a.parameters?.docs?.source}}};const w=["NativeInputBasic","NativeInputCustomContainerSpacing","NativeInputTextAlign","NativeInputActions"];export{a as NativeInputActions,t as NativeInputBasic,n as NativeInputCustomContainerSpacing,o as NativeInputTextAlign,w as __namedExportsOrder,F as default};
