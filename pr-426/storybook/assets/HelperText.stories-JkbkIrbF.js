import{j as e}from"./iframe-CsG_6vZR.js";import{H as n}from"./HelperText-W0U74shX.js";import"./preload-helper-D9Z9MdNV.js";import"./Icon-DTs0crZh.js";import"./useTheme-CmrOhAty.js";import"./Text-B1CpMNU3.js";const u={title:"Components/Inputs/HelperText",component:n},o=()=>e.jsx(n,{children:"Put Message Here"}),r=()=>{const i=["fgPositive","fgNegative","fg","fgPrimary","fgMuted","bgSecondary"];return e.jsx("div",{children:i.map(s=>e.jsx(n,{color:s,children:`${s} Message Here`}))})};r.parameters={a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const t=()=>{const i=["start","end"];return e.jsx("div",{children:i.map(s=>e.jsx(n,{textAlign:s,children:`${s} message`}))})},a=()=>e.jsx("div",{children:e.jsx(n,{color:"fgNegative",dangerouslySetColor:"purple",children:"Test message"})});o.__docgenInfo={description:"",methods:[],displayName:"MessageAreaBasic"};r.__docgenInfo={description:"",methods:[],displayName:"MessageAreaColor"};t.__docgenInfo={description:"",methods:[],displayName:"TextAlign"};a.__docgenInfo={description:"",methods:[],displayName:"CustomColor"};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => {
  return <HelperText>Put Message Here</HelperText>;
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => {
  const colors = ['fgPositive', 'fgNegative', 'fg', 'fgPrimary', 'fgMuted',
  // TO DO: replace bgSecondary with textSecondary after value is confirmed with design
  'bgSecondary'] as const;
  return <div>
      {colors.map(color => <HelperText color={color}>{\`\${color} Message Here\`}</HelperText>)}
    </div>;
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => {
  const alignments = ['start', 'end'] as const;
  return <div>
      {alignments.map(alignment => <HelperText textAlign={alignment}>{\`\${alignment} message\`}</HelperText>)}
    </div>;
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => {
  return <div>
      <HelperText color="fgNegative" dangerouslySetColor="purple">
        Test message
      </HelperText>
    </div>;
}`,...a.parameters?.docs?.source}}};const x=["MessageAreaBasic","MessageAreaColor","TextAlign","CustomColor"];export{a as CustomColor,o as MessageAreaBasic,r as MessageAreaColor,t as TextAlign,x as __namedExportsOrder,u as default};
