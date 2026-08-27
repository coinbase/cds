import{j as e}from"./iframe-CYDANtMt.js";import{I as r}from"./InputLabel-BwQhf82V.js";import"./preload-helper-D9Z9MdNV.js";import"./Text-0g3rWpAf.js";const b={title:"Components/Inputs/InputLabel",component:r},t=()=>e.jsx(r,{children:"Label"}),c="wrapperCss-wdlv5it",s=()=>{const l=["start","end","center"];return e.jsx("div",{children:l.map(o=>e.jsx("div",{className:c,children:e.jsx(r,{textAlign:o,children:`${o} Label`})},o))})},a=()=>e.jsx(r,{color:"fgMuted",children:"Label"}),p="fontWeightCss-fzdt8f9",n=()=>e.jsx(r,{className:p,color:"fgMuted",children:"Label"});t.__docgenInfo={description:"",methods:[],displayName:"InputLabelBasic"};s.__docgenInfo={description:"",methods:[],displayName:"InputLabelTextAlignments"};a.__docgenInfo={description:"",methods:[],displayName:"LabelColor"};n.__docgenInfo={description:"",methods:[],displayName:"InputLabelDangerouslySetClassName"};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => {
  return <InputLabel>Label</InputLabel>;
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => {
  const textAlignments = ['start', 'end', 'center'] as const;
  return <div>
      {textAlignments.map(align => <div key={align} className={wrapperCss}>
          <InputLabel textAlign={align}>{\`\${align} Label\`}</InputLabel>
        </div>)}
    </div>;
}`,...s.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => {
  return <InputLabel color="fgMuted">Label</InputLabel>;
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => {
  return <InputLabel className={fontWeightCss} color="fgMuted">
      Label
    </InputLabel>;
}`,...n.parameters?.docs?.source}}};const L=["InputLabelBasic","InputLabelTextAlignments","LabelColor","InputLabelDangerouslySetClassName"];export{t as InputLabelBasic,n as InputLabelDangerouslySetClassName,s as InputLabelTextAlignments,a as LabelColor,L as __namedExportsOrder,b as default};
