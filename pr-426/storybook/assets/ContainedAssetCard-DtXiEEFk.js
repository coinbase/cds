import{j as e,B as b,c as x}from"./iframe-CsG_6vZR.js";import{H as v}from"./HStack-DaDYipoP.js";import{V as i}from"./VStack-Cg_Yq2u4.js";import{T as r}from"./Text-B1CpMNU3.js";const y=156,w=156,q=156,j=359,N=327,T="pressCss-pxh4rwy",V="focusRingCss-f1xv32ds",W=({header:l,title:a,subtitle:s,description:n,size:t="s",children:o,className:c,flexDirection:u="row",background:f="bgAlternate",borderRadius:p=500,height:m=y,width:h=t==="l"?j:w,minWidth:g=t==="l"?N:q,overflow:C="hidden",onClick:d,testID:R="contained-asset-card",...A})=>e.jsxs(b,{as:d?"button":"div",background:f,borderRadius:p,className:x(d&&T,V,c),flexDirection:u,height:m,maxWidth:h,minWidth:g,onClick:d,overflow:C,testID:R,...A,children:[e.jsxs(i,{alignContent:"center",gap:1,height:"100%",justifyContent:"space-between",padding:2,width:t==="l"?"50%":"100%",children:[e.jsx(v,{children:l}),e.jsxs(i,{gap:.5,children:[typeof s!="string"?s:e.jsx(r,{as:"p",color:"fgMuted",display:"block",font:"legal",numberOfLines:1,children:s}),typeof a!="string"?a:e.jsx(r,{as:"p",display:"block",font:"headline",numberOfLines:1,children:a}),typeof n!="string"?n:e.jsx(r,{as:"p",color:"fgMuted",display:"block",font:"label2",numberOfLines:1,children:n})]})]}),t==="l"&&e.jsx(i,{width:"50%",children:o})]});W.__docgenInfo={description:`@deprecated Use \`MediaCard\` instead. ContainedAssetCard will be removed in a future major release.

Migration guide:
\`\`\`tsx
// Before
<ContainedAssetCard
  header={<Avatar ... />}
  title="Asset Title"
  subtitle="Subtitle"
  description="Description"
  size="l"
>
  <RemoteImage ... />
</ContainedAssetCard>

// After
<MediaCard
  thumbnail={<Avatar ... />}
  title="Asset Title"
  subtitle="Subtitle"
  description="Description"
  media={<RemoteImage ... />}
  mediaPlacement="end"
/>
\`\`\``,methods:[],displayName:"ContainedAssetCard",props:{testID:{required:!1,tsType:{name:"string"},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`,defaultValue:{value:"'contained-asset-card'",computed:!1}},header:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},title:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},subtitle:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},description:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},size:{required:!1,tsType:{name:"union",raw:"'s' | 'l'",elements:[{name:"literal",value:"'s'"},{name:"literal",value:"'l'"}]},description:"",defaultValue:{value:"'s'",computed:!1}},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},flexDirection:{defaultValue:{value:"'row'",computed:!1},required:!1},background:{defaultValue:{value:"'bgAlternate'",computed:!1},required:!1},borderRadius:{defaultValue:{value:"500",computed:!1},required:!1},height:{defaultValue:{value:"156",computed:!1},required:!1},width:{defaultValue:{value:"size === 'l' ? containedAssetCardLargeWidth : containedAssetCardSmallWidth",computed:!1},required:!1},minWidth:{defaultValue:{value:"size === 'l' ? containedAssetCardLargeMinWidth : containedAssetCardSmallMinWidth",computed:!1},required:!1},overflow:{defaultValue:{value:"'hidden'",computed:!1},required:!1}}};export{W as C};
