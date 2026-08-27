import{j as e,r as g,B as C,a5 as f}from"./iframe-BXWLBCkp.js";import{u as D}from"./useTheme-BJazYlse.js";import{V as x}from"./VStack-CnEfMFeL.js";import{S as r}from"./Switch-Ly9ugSQE.js";import"./preload-helper-D9Z9MdNV.js";import"./utils-CwomCnHN.js";import"./tokens-BwScSksM.js";import"./Control-gdMxvYmV.js";import"./useMergeRefs-DR4sGa7m.js";import"./usePrefixedId-Dfl-0DGQ.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./Text-Ch_dBU4v.js";import"./isRtl-Du0XdnX5.js";import"./motion-minimal-SVRWJYUW.js";const N="darkModeWrapperCss-dxx2a91",S=({children:o})=>{const a=D();return e.jsx(f,{activeColorScheme:"dark",theme:a,children:e.jsx("div",{className:N,children:o})})},t=()=>{const[o,a]=g.useState(!1);return e.jsx(r,{checked:o,onChange:()=>a(s=>!s),children:"Normal"})},d=()=>{const[o,a]=g.useState(!1);return e.jsxs(x,{gap:2,children:[e.jsx(r,{checked:o,controlColor:"bgNegative",onChange:()=>a(s=>!s),children:"Control color prop"}),e.jsx(r,{background:o?"accentBoldPurple":"bgNegative",borderColor:o?"bgPositive":"bgPrimary",borderWidth:200,checked:o,color:"bgPrimary",controlColor:"bgPositive",onChange:()=>a(s=>!s),children:"Style props"})]})},n=()=>{const[o,a]=g.useState(!1);return e.jsx(S,{children:e.jsx(r,{checked:o,onChange:()=>a(s=>!s),children:"Normal"})})},c=()=>{const[o,a]=g.useState(!1);return e.jsx(r,{checked:o,onChange:()=>a(s=>!s)})};c.parameters={a11y:{config:{rules:[{id:"label",enabled:!1}]}}};const i=()=>e.jsx(r,{checked:!0,children:"On"}),l=()=>e.jsx(r,{disabled:!0,children:"Disabled off"}),h=()=>e.jsx(r,{checked:!0,disabled:!0,children:"Disabled on"}),p=()=>e.jsx(S,{children:e.jsx(r,{checked:!0,children:"On"})}),m=()=>e.jsx(S,{children:e.jsx(r,{disabled:!0,children:"Disabled off"})}),k=()=>e.jsx(S,{children:e.jsx(C,{children:e.jsx(r,{checked:!0,disabled:!0,children:"Disabled on"})})}),u=()=>e.jsx(C,{width:"250px",children:e.jsx(r,{children:"This switch has a multi-line label. The switch and label should align at the top."})}),b=()=>e.jsx(C,{children:e.jsx(r,{elevation:1,children:"Elevation"})}),R={title:"Components/Switch",component:r};t.__docgenInfo={description:"",methods:[],displayName:"Normal"};d.__docgenInfo={description:"",methods:[],displayName:"CustomColors"};n.__docgenInfo={description:"",methods:[],displayName:"DarkNormal"};c.__docgenInfo={description:"",methods:[],displayName:"NoLabel"};i.__docgenInfo={description:"",methods:[],displayName:"On"};l.__docgenInfo={description:"",methods:[],displayName:"DisabledOff"};h.__docgenInfo={description:"",methods:[],displayName:"DisabledOn"};p.__docgenInfo={description:"",methods:[],displayName:"DarkNormalOn"};m.__docgenInfo={description:"",methods:[],displayName:"DarkNormalDisabledOff"};k.__docgenInfo={description:"",methods:[],displayName:"DarkNormalDisabledOn"};u.__docgenInfo={description:"",methods:[],displayName:"MultiLineLabel"};b.__docgenInfo={description:"",methods:[],displayName:"Elevation"};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => {
  const [checked, setChecked] = useState(false);
  return <Switch checked={checked} onChange={() => setChecked(prevChecked => !prevChecked)}>
      Normal
    </Switch>;
}`,...t.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => {
  const [checked, setChecked] = useState(false);
  return <VStack gap={2}>
      <Switch checked={checked} controlColor="bgNegative" onChange={() => setChecked(prevChecked => !prevChecked)}>
        Control color prop
      </Switch>
      <Switch background={checked ? 'accentBoldPurple' : 'bgNegative'} borderColor={checked ? 'bgPositive' : 'bgPrimary'} borderWidth={200} checked={checked} color="bgPrimary" controlColor="bgPositive" onChange={() => setChecked(prevChecked => !prevChecked)}>
        Style props
      </Switch>
    </VStack>;
}`,...d.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => {
  const [checked, setChecked] = useState(false);
  return <DarkModeWrapper>
      <Switch checked={checked} onChange={() => setChecked(prevChecked => !prevChecked)}>
        Normal
      </Switch>
    </DarkModeWrapper>;
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => {
  const [checked, setChecked] = useState(false);
  return <Switch checked={checked} onChange={() => setChecked(prevChecked => !prevChecked)} />;
}`,...c.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:"() => <Switch checked>On</Switch>",...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"() => <Switch disabled>Disabled off</Switch>",...l.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => <Switch checked disabled>
    Disabled on
  </Switch>`,...h.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => <DarkModeWrapper>
    <Switch checked>On</Switch>
  </DarkModeWrapper>`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => <DarkModeWrapper>
    <Switch disabled>Disabled off</Switch>
  </DarkModeWrapper>`,...m.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`() => <DarkModeWrapper>
    <Box>
      <Switch checked disabled>
        Disabled on
      </Switch>
    </Box>
  </DarkModeWrapper>`,...k.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`() => <Box width="250px">
    <Switch>
      This switch has a multi-line label. The switch and label should align at the top.
    </Switch>
  </Box>`,...u.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`() => <Box>
    <Switch elevation={1}>Elevation</Switch>
  </Box>`,...b.parameters?.docs?.source}}};const q=["Normal","CustomColors","DarkNormal","NoLabel","On","DisabledOff","DisabledOn","DarkNormalOn","DarkNormalDisabledOff","DarkNormalDisabledOn","MultiLineLabel","Elevation"];export{d as CustomColors,n as DarkNormal,m as DarkNormalDisabledOff,k as DarkNormalDisabledOn,p as DarkNormalOn,l as DisabledOff,h as DisabledOn,b as Elevation,u as MultiLineLabel,c as NoLabel,t as Normal,i as On,q as __namedExportsOrder,R as default};
