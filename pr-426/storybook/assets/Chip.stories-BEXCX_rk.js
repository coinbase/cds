import{j as e,r as x,B as j}from"./iframe-CYDANtMt.js";import{a as u}from"./assets-CEwpm_uP.js";import{I as i}from"./Icon-DRxKkZdt.js";import{T as r}from"./Text-0g3rWpAf.js";import{C as o}from"./Chip-DQPBsLRY.js";import{V as g}from"./VStack-iXgNewwv.js";import{R as a}from"./RemoteImage-S3YFINhn.js";import"./preload-helper-D9Z9MdNV.js";import"./useTheme-C_Ehsh33.js";import"./tokens-BwScSksM.js";import"./HStack-Fh-9TmPm.js";import"./Pressable-BvczHaFK.js";import"./isArray-BJmyNVUi.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";const V={title:"Components/Chips/Chip",component:o},l=({label:n,direction:m="row",...t})=>{const p=x.useRef(null),h=x.useRef(null),d=t.compact?16:24,f=t.compact?"label1":"headline",s={height:d,shape:"circle",source:u.eth.imageUrl,width:d};return e.jsxs(j,{flexDirection:m,flexWrap:"wrap",gap:2,children:[e.jsx(o,{...t,children:n??"Label only"}),e.jsx(o,{...t,start:e.jsx(a,{...s})}),e.jsx(o,{...t,end:e.jsx(i,{active:!0,color:"fg",name:"caretDown",size:"xs"}),start:e.jsx(a,{...s})}),e.jsx(o,{ref:p,...t,start:e.jsx(a,{...s}),children:n??"Media + Label"}),e.jsx(o,{...t,end:e.jsx(i,{active:!0,color:"fg",name:"filter",size:"xs"}),children:"Label + Icon"}),e.jsx(o,{...t,end:e.jsx(i,{active:!0,color:"fg",name:"caretDown",size:"xs"}),start:e.jsx(a,{...s}),children:n??"All three"}),e.jsx(o,{...t,end:e.jsx(i,{active:!0,color:"fg",name:"caretDown",size:"xs"}),start:e.jsx(a,{...s}),children:n??e.jsx(r,{font:f,overflow:"break",children:"Looooooooooooooong Label"})}),e.jsx(o,{...t,ref:h,end:e.jsx(i,{active:!0,color:"fg",name:"caretDown",size:"xs"}),onClick:()=>{},start:e.jsx(a,{...s}),children:n??"Pressable"}),e.jsx(o,{...t,accessibilityLabel:"a11y label",end:e.jsx(i,{active:!0,color:"fg",name:"caretDown",size:"xs"}),onClick:()=>{},start:e.jsx(a,{...s}),children:n??"Pressable with a11y label"}),e.jsx(o,{...t,disabled:!0,end:e.jsx(i,{active:!0,color:"fg",name:"caretDown",size:"xs"}),onClick:()=>{},start:e.jsx(a,{...s}),children:n??"Disabled"})]})},c=()=>e.jsxs(g,{gap:2,children:[e.jsx(r,{as:"h3",display:"block",font:"headline",children:"Default"}),e.jsx(l,{}),e.jsx(r,{as:"h3",display:"block",font:"headline",paddingTop:3,children:"Inverted"}),e.jsx(l,{inverted:!0}),e.jsx(r,{as:"h3",display:"block",font:"headline",children:"Compact"}),e.jsx(l,{compact:!0}),e.jsx(r,{as:"h3",display:"block",font:"headline",paddingTop:3,children:"Long text"}),e.jsx(l,{label:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget"}),e.jsx(r,{as:"h3",display:"block",font:"headline",paddingTop:3,children:"Column Layout"}),e.jsx(l,{direction:"column"})]});c.__docgenInfo={description:"",methods:[],displayName:"Default"};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => <VStack gap={2}>
    <Text as="h3" display="block" font="headline">
      Default
    </Text>
    <ChipExamples />
    <Text as="h3" display="block" font="headline" paddingTop={3}>
      Inverted
    </Text>
    <ChipExamples inverted />
    <Text as="h3" display="block" font="headline">
      Compact
    </Text>
    <ChipExamples compact />
    <Text as="h3" display="block" font="headline" paddingTop={3}>
      Long text
    </Text>
    <ChipExamples label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget" />
    <Text as="h3" display="block" font="headline" paddingTop={3}>
      Column Layout
    </Text>
    <ChipExamples direction="column" />
  </VStack>`,...c.parameters?.docs?.source}}};const P=["Default"];export{c as Default,P as __namedExportsOrder,V as default};
