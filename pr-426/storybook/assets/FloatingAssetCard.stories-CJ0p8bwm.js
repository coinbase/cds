import{j as e,c as S}from"./iframe-CYDANtMt.js";import{f as A,e as R}from"./assets-CEwpm_uP.js";import{T as c}from"./Text-0g3rWpAf.js";import{H as f}from"./HStack-Fh-9TmPm.js";import{V as a}from"./VStack-iXgNewwv.js";import"./preload-helper-D9Z9MdNV.js";const k=359,h=156,F="pressCss-p18qmgbw",N="focusRingCss-fnuxuap",t=({className:y,title:p,description:m,subtitle:u,media:C,size:b="s",width:x=b==="l"?k:h,testID:T="floating-asset-card",onClick:g,...j})=>e.jsxs(a,{as:g?"button":"div",className:S(g&&F,N,y),gap:1,maxWidth:x,onClick:g,testID:T,...j,children:[e.jsx(f,{borderColor:"bgLine",borderRadius:500,borderWidth:100,height:h,maxWidth:x,minWidth:h,overflow:"hidden",children:C}),e.jsxs(a,{gap:.5,children:[typeof u=="string"?e.jsx(c,{as:"p",color:"fgMuted",display:"block",font:"legal",numberOfLines:1,children:u}):u,typeof p=="string"?e.jsx(c,{as:"p",display:"block",font:"headline",numberOfLines:3,children:p}):p,typeof m=="string"?e.jsx(c,{as:"p",color:"fgMuted",display:"block",font:"label2",numberOfLines:2,children:m}):m]})]});t.__docgenInfo={description:`@deprecated Use \`MediaCard\` instead. FloatingAssetCard will be removed in a future major release.

Migration guide:
\`\`\`tsx
// Before
<FloatingAssetCard
  title="Asset Title"
  subtitle="Subtitle"
  description="Description"
  media={<RemoteImage ... />}
/>

// After
<MediaCard
  title="Asset Title"
  subtitle="Subtitle"
  description="Description"
  thumbnail={<RemoteImage ... />}
/>
\`\`\`

Note: The floating variation (media outside the card container) is no longer supported.
MediaCard provides a contained layout with media placement options (start/end).`,methods:[],displayName:"FloatingAssetCard",props:{testID:{required:!1,tsType:{name:"string"},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`,defaultValue:{value:"'floating-asset-card'",computed:!1}},subtitle:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Text or ReactNode to be displayed above Title"},title:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Text or ReactNode to be displayed in TextHeadline"},description:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Content to be displayed below the title"},media:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Remote Image or other node with media content."},size:{required:!1,tsType:{name:"union",raw:"'s' | 'l'",elements:[{name:"literal",value:"'s'"},{name:"literal",value:"'l'"}]},description:`Variant for card size. Can be small or large.
@default 's'`,defaultValue:{value:"'s'",computed:!1}},width:{defaultValue:{value:"size === 'l' ? floatingAssetCardLargeWidth : floatingAssetCardSmallDimension",computed:!1},required:!1}}};const V=console.log,s={title:"Title",description:"Description",subtitle:"Subtitle",media:e.jsx("img",{alt:"","aria-hidden":"true",height:"100%",src:R,style:{objectFit:"cover",cursor:"pointer"},width:"100%"}),onClick:V},r=()=>e.jsx(a,{children:e.jsx(t,{...s})}),o=()=>e.jsxs(a,{gap:1,children:[e.jsx(t,{...s}),e.jsx(t,{...s,size:"l"})]}),i=()=>e.jsxs(f,{gap:1,children:[e.jsx(t,{...s}),e.jsx(t,{...s,size:"l"})]}),n=()=>e.jsx(a,{children:e.jsx(t,{...s,description:"This is a really long description. This is a really long description. This is a really long description",subtitle:"This is a really long subtitle",title:"This is a really long Title. This is a really long Title. This is a really long Title"})}),l=()=>e.jsx(a,{children:e.jsx(t,{...s,description:e.jsx(c,{as:"p",color:"fgMuted",display:"block",font:"label2",children:"2 min read"}),media:e.jsx("img",{alt:"","aria-hidden":"true",height:"100%",src:A,style:{objectFit:"cover",cursor:"pointer"},width:"100%"}),subtitle:null,title:"Benefits of staking"})}),d=()=>e.jsxs(f,{gap:2,overflow:"scroll",children:[e.jsx(t,{...s}),e.jsx(t,{...s}),e.jsx(t,{...s,size:"l"})]}),P={title:"Components/Cards/FloatingAssetCard",component:t};r.__docgenInfo={description:"",methods:[],displayName:"Default"};o.__docgenInfo={description:"",methods:[],displayName:"Vertical"};i.__docgenInfo={description:"",methods:[],displayName:"Horizontal"};n.__docgenInfo={description:"",methods:[],displayName:"LongText"};l.__docgenInfo={description:"",methods:[],displayName:"Custom"};d.__docgenInfo={description:"",methods:[],displayName:"Carousel"};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`(): JSX.Element => {
  return <VStack>
      <FloatingAssetCard {...exampleProps} />
    </VStack>;
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`(): JSX.Element => {
  return <VStack gap={1}>
      <FloatingAssetCard {...exampleProps} />
      <FloatingAssetCard {...exampleProps} size="l" />
    </VStack>;
}`,...o.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`(): JSX.Element => {
  return <HStack gap={1}>
      <FloatingAssetCard {...exampleProps} />
      <FloatingAssetCard {...exampleProps} size="l" />
    </HStack>;
}`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`(): JSX.Element => {
  return <VStack>
      <FloatingAssetCard {...exampleProps} description="This is a really long description. This is a really long description. This is a really long description" subtitle="This is a really long subtitle" title="This is a really long Title. This is a really long Title. This is a really long Title" />
    </VStack>;
}`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`(): JSX.Element => {
  return <VStack>
      <FloatingAssetCard {...exampleProps} description={<Text as="p" color="fgMuted" display="block" font="label2">
            2 min read
          </Text>} media={<img alt="" aria-hidden="true" height="100%" src={floatingAssetCardCustomImage} style={{
      objectFit: 'cover',
      cursor: 'pointer'
    }} width="100%" />} subtitle={null} title="Benefits of staking" />
    </VStack>;
}`,...l.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`(): JSX.Element => <HStack gap={2} overflow="scroll">
    <FloatingAssetCard {...exampleProps} />
    <FloatingAssetCard {...exampleProps} />
    <FloatingAssetCard {...exampleProps} size="l" />
  </HStack>`,...d.parameters?.docs?.source}}};const H=["Default","Vertical","Horizontal","LongText","Custom","Carousel"];export{d as Carousel,l as Custom,r as Default,i as Horizontal,n as LongText,o as Vertical,H as __namedExportsOrder,P as default};
