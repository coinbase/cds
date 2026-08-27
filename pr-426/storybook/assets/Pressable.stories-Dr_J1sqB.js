import{j as r,B as a}from"./iframe-BXWLBCkp.js";import{g as p}from"./getAccessibleColor-CuY0yQes.js";import{u}from"./useTheme-BJazYlse.js";import{T as o}from"./Text-Ch_dBU4v.js";import{P as e}from"./Pressable-sl8uFeki.js";import{V as l}from"./VStack-CnEfMFeL.js";import{G as g}from"./Grid-D-Uw9y2v.js";import"./preload-helper-D9Z9MdNV.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./isArray-JxMDBx0e.js";const V={title:"Components/Pressable",component:e},h=()=>r.jsxs(l,{gap:2,children:[r.jsx(a,{children:r.jsx(e,{as:"button",background:"bg",children:"Pressable"})}),r.jsx(a,{children:r.jsx(e,{noScaleOnPress:!0,as:"button",background:"bg",children:"Without scaling"})}),r.jsx(a,{children:r.jsx(e,{disabled:!0,as:"button",background:"bg",children:"Pressable"})}),r.jsx(a,{children:r.jsx(e,{disabled:!0,noScaleOnPress:!0,as:"button",background:"bg",children:"Without scaling"})}),r.jsx(a,{children:r.jsx(e,{block:!0,as:"button",background:"bgPrimary",children:r.jsx(o,{as:"p",color:"fgInverse",display:"block",font:"body",children:"Pressable full-width"})})}),r.jsx(a,{children:r.jsx(e,{loading:!0,as:"button",background:"bgPrimary",children:r.jsx(o,{as:"p",color:"fgInverse",display:"block",font:"body",children:"loading"})})})]}),m=()=>r.jsxs(g,{columnMin:200,gap:2,children:[r.jsx(e,{as:"button",background:"transparent",children:r.jsx(o,{as:"p",display:"block",font:"body",padding:1,children:"transparent"})}),r.jsx(e,{transparentWhileInactive:!0,as:"button",background:"bgPrimary",children:r.jsx(o,{as:"p",color:"fgInverse",display:"block",font:"body",padding:1,children:"transparentWhileInactive"})}),r.jsx(e,{disabled:!0,as:"button",background:"transparent",children:r.jsx(o,{as:"p",display:"block",font:"body",padding:1,children:"transparent"})}),r.jsx(e,{disabled:!0,transparentWhileInactive:!0,as:"button",background:"bgPrimary",children:r.jsx(o,{as:"p",color:"fgInverse",display:"block",font:"body",padding:1,children:"transparentWhileInactive"})})]}),x=()=>r.jsxs(g,{columnMin:200,gap:2,children:[r.jsx(e,{as:"button",background:"transparent",borderColor:"bgPositive",children:r.jsx(o,{as:"p",display:"block",font:"body",padding:1,children:"transparent with borders"})}),r.jsx(e,{transparentWhileInactive:!0,as:"button",background:"bgPrimary",borderColor:"bgPositive",children:r.jsx(o,{as:"p",display:"block",font:"body",padding:1,children:"transparentWhileInactive with borders"})}),r.jsx(e,{disabled:!0,as:"button",background:"transparent",borderColor:"bgPositive",children:r.jsx(o,{as:"p",display:"block",font:"body",padding:1,children:"transparent with borders"})}),r.jsx(e,{disabled:!0,transparentWhileInactive:!0,as:"button",background:"bgPrimary",borderColor:"bgPositive",children:r.jsx(o,{as:"p",display:"block",font:"body",padding:1,children:"transparentWhileInactive with borders"})}),r.jsx(e,{as:"button",background:"bg",borderColor:"bgPrimary",borderRadius:100,children:r.jsx(o,{as:"p",display:"block",font:"body",padding:1,children:"primary + compact"})}),r.jsx(e,{as:"button",background:"bgAlternate",borderColor:"bgNegative",children:r.jsx(o,{as:"p",display:"block",font:"body",padding:1,children:"negative"})}),r.jsx(e,{as:"button",background:"bgPrimary",borderColor:"bgPositive",borderRadius:200,children:r.jsx(o,{as:"p",color:"fgInverse",display:"block",font:"body",padding:1,children:"positive + standard"})}),r.jsx(e,{as:"button",background:"bgSecondary",borderColor:"bgLineHeavy",borderRadius:200,children:r.jsx(o,{as:"p",color:"fg",display:"block",font:"body",padding:1,children:"bgLineHeavy + tooltip"})}),r.jsx(e,{as:"button",background:"bgPositive",borderColor:"bgLine",borderRadius:400,children:r.jsx(o,{as:"p",color:"fgInverse",display:"block",font:"body",padding:1,children:"line + pill"})}),r.jsx(e,{as:"button",background:"bgNegative",borderColor:"bgPrimaryWash",borderRadius:1e3,children:r.jsx(o,{as:"p",color:"fgInverse",display:"block",font:"body",padding:1,children:"primaryWash + round"})})]}),n=()=>r.jsxs(l,{gap:3,children:[r.jsx(h,{}),r.jsx(m,{}),r.jsx(x,{})]}),d=()=>{const c=u();return r.jsx(l,{gap:2,children:Object.entries(c.color).map(([s,b])=>{let t=p({background:b});return s==="currentColor"&&(t="#ffffff"),r.jsx(e,{as:"button",background:s,borderColor:"bgLine",borderWidth:100,children:r.jsx(o,{as:"p",dangerouslySetColor:t,display:"block",font:"body",padding:1,children:s})},s)})})},i=()=>{const c=u();return r.jsx(l,{gap:2,children:Object.entries(c.color).map(([s,b])=>{let t=p({background:b});return s==="currentColor"&&(t="#ffffff"),r.jsx(e,{disabled:!0,as:"button",background:s,borderColor:"bgLine",borderWidth:100,children:r.jsx(o,{as:"p",dangerouslySetColor:t,display:"block",font:"body",padding:1,children:s})},s)})})};n.__docgenInfo={description:"",methods:[],displayName:"Variations"};d.__docgenInfo={description:"",methods:[],displayName:"ThemeColors"};i.__docgenInfo={description:"",methods:[],displayName:"ThemeColorsWithDisabled"};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => {
  return <VStack gap={3}>
      <Default />
      <Transparent />
      <Borders />
    </VStack>;
}`,...n.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => {
  const theme = useTheme();
  return <VStack gap={2}>
      {Object.entries(theme.color).map(([color, value]) => {
      let textColor = getAccessibleColor({
        background: value
      });
      if (color === 'currentColor') textColor = '#ffffff';
      return <Pressable key={color} as="button" background={color as ThemeVars.Color} borderColor="bgLine" borderWidth={100}>
            <Text as="p" dangerouslySetColor={textColor} display="block" font="body" padding={1}>
              {color}
            </Text>
          </Pressable>;
    })}
    </VStack>;
}`,...d.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
  const theme = useTheme();
  return <VStack gap={2}>
      {Object.entries(theme.color).map(([color, value]) => {
      let textColor = getAccessibleColor({
        background: value
      });
      if (color === 'currentColor') textColor = '#ffffff';
      return <Pressable key={color} disabled as="button" background={color as ThemeVars.Color} borderColor="bgLine" borderWidth={100}>
            <Text as="p" dangerouslySetColor={textColor} display="block" font="body" padding={1}>
              {color}
            </Text>
          </Pressable>;
    })}
    </VStack>;
}`,...i.parameters?.docs?.source}}};const _=["Variations","ThemeColors","ThemeColorsWithDisabled"];export{d as ThemeColors,i as ThemeColorsWithDisabled,n as Variations,_ as __namedExportsOrder,V as default};
