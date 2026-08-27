import{j as e,r as p,B as f}from"./iframe-BXWLBCkp.js";import{a as u}from"./assets-CEwpm_uP.js";import{I as c}from"./Icon-CgDQ3NQp.js";import{T as o}from"./Text-Ch_dBU4v.js";import{M as a}from"./MediaChip-DK4Hgf8b.js";import{V as j}from"./VStack-CnEfMFeL.js";import{R as s}from"./RemoteImage-Lksm6NI7.js";import"./preload-helper-D9Z9MdNV.js";import"./useTheme-BJazYlse.js";import"./Chip-Cb6f10va.js";import"./tokens-BwScSksM.js";import"./HStack-B6p8qBpp.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";const _={title:"Components/Chips/MediaChip",component:a},n=({label:d,direction:m="row",...t})=>{const x=p.useRef(null),h=p.useRef(null),l=t.compact?16:24,i={height:l,shape:"circle",source:u.eth.imageUrl,width:l};return e.jsxs(f,{flexDirection:m,flexWrap:"wrap",gap:2,children:[e.jsx(a,{...t,children:d??"Label only"}),e.jsx(a,{...t,start:e.jsx(s,{...i})}),e.jsx(a,{...t,end:e.jsx(c,{active:!0,color:"fg",name:"caretDown",size:"xs"}),start:e.jsx(s,{...i})}),e.jsx(a,{ref:x,...t,start:e.jsx(s,{...i}),children:d??"Media + Label"}),e.jsx(a,{...t,end:e.jsx(c,{active:!0,color:"fg",name:"filter",size:"xs"}),children:"Label + Icon"}),e.jsx(a,{...t,end:e.jsx(c,{active:!0,color:"fg",name:"caretDown",size:"xs"}),start:e.jsx(s,{...i}),children:d??"All three"}),e.jsx(a,{...t,ref:h,end:e.jsx(c,{active:!0,color:"fg",name:"caretDown",size:"xs"}),onClick:()=>{},start:e.jsx(s,{...i}),children:d??"Pressable"})]})},r=()=>e.jsxs(j,{gap:2,children:[e.jsx(o,{as:"h3",display:"block",font:"headline",children:"Default (Automatic Spacing)"}),e.jsx(n,{}),e.jsx(o,{as:"h3",display:"block",font:"headline",paddingTop:3,children:"Inverted"}),e.jsx(n,{inverted:!0}),e.jsx(o,{as:"h3",display:"block",font:"headline",paddingTop:3,children:"Compact"}),e.jsx(n,{compact:!0}),e.jsx(o,{as:"h3",display:"block",font:"headline",paddingTop:3,children:"Long text"}),e.jsx(n,{label:"Lorem ipsum dolor sit amet, consectetur adipiscing elit"}),e.jsx(o,{as:"h3",display:"block",font:"headline",paddingTop:3,children:"Column Layout"}),e.jsx(n,{direction:"column"})]});r.__docgenInfo={description:"",methods:[],displayName:"Default"};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => <VStack gap={2}>
    <Text as="h3" display="block" font="headline">
      Default (Automatic Spacing)
    </Text>
    <MediaChipExamples />
    <Text as="h3" display="block" font="headline" paddingTop={3}>
      Inverted
    </Text>
    <MediaChipExamples inverted />
    <Text as="h3" display="block" font="headline" paddingTop={3}>
      Compact
    </Text>
    <MediaChipExamples compact />
    <Text as="h3" display="block" font="headline" paddingTop={3}>
      Long text
    </Text>
    <MediaChipExamples label="Lorem ipsum dolor sit amet, consectetur adipiscing elit" />
    <Text as="h3" display="block" font="headline" paddingTop={3}>
      Column Layout
    </Text>
    <MediaChipExamples direction="column" />
  </VStack>`,...r.parameters?.docs?.source}}};const V=["Default"];export{r as Default,V as __namedExportsOrder,_ as default};
