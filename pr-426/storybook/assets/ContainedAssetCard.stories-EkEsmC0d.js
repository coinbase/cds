import{j as e}from"./iframe-CsG_6vZR.js";import{a as x,e as u}from"./assets-CEwpm_uP.js";import{s as g}from"./sparkline-Tad7TG6v.js";import{D as C}from"./DotStatusColor-CZSBkAlq.js";import{T as S}from"./Text-B1CpMNU3.js";import{C as t}from"./ContainedAssetCard-DtXiEEFk.js";import{V as p}from"./VStack-Cg_Yq2u4.js";import{H as h}from"./HStack-DaDYipoP.js";import"./preload-helper-D9Z9MdNV.js";import"./tokens-BwScSksM.js";import"./useTheme-CmrOhAty.js";import"./eventHandlers-CyvGcX2M.js";import"./dotStyles-Ccp1dKIN.js";const j={config:{rules:[{id:"color-contrast",enabled:!1}]}},b=console.log,s={title:"Title",description:"Description",subtitle:"Subtitle",header:e.jsx("img",{alt:"Image Alt","aria-hidden":"true",height:"32px",src:u,style:{objectFit:"cover",cursor:"pointer",borderRadius:"100%"},width:"32px"}),onClick:b},m={...s,children:e.jsx("img",{alt:"Image Alt","aria-hidden":"true",height:"100%",src:u,style:{objectFit:"cover"},width:"100%"})},a=()=>e.jsx(p,{children:e.jsx(t,{...s})}),o=()=>e.jsxs(p,{children:[e.jsx(t,{...s,description:"This is a very long description text that will get truncated",subtitle:"This is a very long subtitle text that will get truncated",title:"This is a very long title text that will get truncated"}),e.jsx(t,{...m,description:"This is a very long description text that will get truncated",size:"l",subtitle:"This is a very long subtitle text that will get truncated",title:"This is a very long title text that will get truncated"})]}),i=()=>e.jsxs(p,{gap:1,children:[e.jsx(t,{...s}),e.jsx(t,{...s,size:"l"}),e.jsx(t,{...m,size:"l"})]}),n=()=>e.jsxs(h,{gap:1,children:[e.jsx(t,{...s}),e.jsx(t,{...s,size:"l"}),e.jsx(t,{...m,size:"l"})]}),r=()=>e.jsx(t,{...s,description:e.jsxs(S,{accessibilityLabel:"Up 6.37%",as:"p",color:"fgPositive",display:"block",font:"label2",children:[g.upwardTrend,"6.37%"]}),header:e.jsx("img",{alt:"Image Alt","aria-hidden":"true",height:"32px",src:x.uni.imageUrl,style:{objectFit:"cover",cursor:"pointer",borderRadius:"100%"},width:"32px"}),subtitle:"UNI",title:"$0.87"});r.parameters={percy:{enableJavaScript:!0},a11y:j};const l=()=>e.jsxs(h,{gap:2,overflow:"scroll",children:[e.jsx(t,{...s}),e.jsx(t,{...s,size:"l"}),e.jsx(t,{...m,size:"l"})]}),d=()=>e.jsx(t,{...s,header:e.jsx(C,{overlap:"circular",pin:"top-end",size:"xs",variant:"negative",children:s.header})}),c=()=>e.jsx(p,{children:e.jsx(t,{...s,maxWidth:"none"})}),H={title:"Components/Cards/ContainedAssetCard",component:t};a.__docgenInfo={description:"",methods:[],displayName:"Default"};o.__docgenInfo={description:"",methods:[],displayName:"LongText"};i.__docgenInfo={description:"",methods:[],displayName:"Vertical"};n.__docgenInfo={description:"",methods:[],displayName:"Horizontal"};r.__docgenInfo={description:"",methods:[],displayName:"Custom"};l.__docgenInfo={description:"",methods:[],displayName:"Carousel"};d.__docgenInfo={description:"",methods:[],displayName:"HeaderWithDotColorStatus"};c.__docgenInfo={description:"",methods:[],displayName:"CustomWidth"};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`(): JSX.Element => {
  return <VStack>
      <ContainedAssetCard {...exampleProps} />
    </VStack>;
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`(): JSX.Element => {
  return <VStack>
      <ContainedAssetCard {...exampleProps} description="This is a very long description text that will get truncated" subtitle="This is a very long subtitle text that will get truncated" title="This is a very long title text that will get truncated" />
      <ContainedAssetCard {...examplePropsWithChildren} description="This is a very long description text that will get truncated" size="l" subtitle="This is a very long subtitle text that will get truncated" title="This is a very long title text that will get truncated" />
    </VStack>;
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`(): JSX.Element => {
  return <VStack gap={1}>
      <ContainedAssetCard {...exampleProps} />
      <ContainedAssetCard {...exampleProps} size="l" />
      <ContainedAssetCard {...examplePropsWithChildren} size="l" />
    </VStack>;
}`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`(): JSX.Element => {
  return <HStack gap={1}>
      <ContainedAssetCard {...exampleProps} />
      <ContainedAssetCard {...exampleProps} size="l" />
      <ContainedAssetCard {...examplePropsWithChildren} size="l" />
    </HStack>;
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`(): JSX.Element => {
  return <ContainedAssetCard {...exampleProps} description={<Text accessibilityLabel="Up 6.37%" as="p" color="fgPositive" display="block" font="label2">
          {subheadIconSignMap.upwardTrend}6.37%
        </Text>} header={<img alt="Image Alt" aria-hidden="true" height="32px" src={assets.uni.imageUrl} style={{
    objectFit: 'cover',
    cursor: 'pointer',
    borderRadius: '100%'
  }} width="32px" />} subtitle="UNI" title="$0.87" />;
}`,...r.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`(): JSX.Element => <HStack gap={2} overflow="scroll">
    <ContainedAssetCard {...exampleProps} />
    <ContainedAssetCard {...exampleProps} size="l" />
    <ContainedAssetCard {...examplePropsWithChildren} size="l" />
  </HStack>`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`(): JSX.Element => {
  return <ContainedAssetCard {...exampleProps} header={<DotStatusColor overlap="circular" pin="top-end" size="xs" variant="negative">
          {exampleProps.header}
        </DotStatusColor>} />;
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`(): JSX.Element => {
  return <VStack>
      <ContainedAssetCard {...exampleProps} maxWidth="none" />
    </VStack>;
}`,...c.parameters?.docs?.source}}};const D=["Default","LongText","Vertical","Horizontal","Custom","Carousel","HeaderWithDotColorStatus","CustomWidth"];export{l as Carousel,r as Custom,c as CustomWidth,a as Default,d as HeaderWithDotColorStatus,n as Horizontal,o as LongText,i as Vertical,D as __namedExportsOrder,H as default};
