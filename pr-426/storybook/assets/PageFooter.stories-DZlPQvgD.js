import{j as e,B as p}from"./iframe-BXWLBCkp.js";import{u as m}from"./useBreakpoints-BiiruerU.js";import{T as x}from"./Text-Ch_dBU4v.js";import{P as s}from"./PageFooter-DvsKFDUC.js";import{V as c}from"./VStack-CnEfMFeL.js";import{D as d}from"./Divider-DIvJbvj9.js";import{B as u}from"./ButtonGroup-CH8icdlI.js";import{B as o}from"./Button-W9Shg4T1.js";import"./preload-helper-D9Z9MdNV.js";import"./Icon-CgDQ3NQp.js";import"./useTheme-BJazYlse.js";import"./Spinner-BAI0lrZ-.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";const t={endButton:e.jsx(o,{accessibilityLabel:"Go Next",children:"Next"}),endButtons:e.jsxs(u,{accessibilityLabel:"Group",children:[e.jsx(o,{accessibilityLabel:"Cancel",variant:"secondary",children:"Cancel"}),e.jsx(o,{accessibilityLabel:"Delete",variant:"negative",children:"Delete"})]}),endButtons2:e.jsx(p,{display:"flex",children:e.jsxs(u,{block:!0,accessibilityLabel:"Group2",children:[e.jsx(o,{accessibilityLabel:"Go Back",variant:"secondary",children:"Back"}),e.jsx(o,{accessibilityLabel:"Go Next",variant:"primary",children:"Next"})]})}),endButtonsBlock2:e.jsx(c,{flexGrow:1,width:"100%",children:e.jsxs(u,{block:!0,accessibilityLabel:"Group2",children:[e.jsx(o,{accessibilityLabel:"Go Back",variant:"secondary",children:"Back"}),e.jsx(o,{accessibilityLabel:"Go Next",variant:"primary",children:"Next"})]})})},g=a=>e.jsx(s,{...a}),r=g.bind({});r.args={background:"bg",action:"endButtons"};const n=()=>{const{isPhone:a}=m(),l=a?t.endButtonsBlock2:t.endButtons2;return e.jsxs(c,{gap:1,children:[e.jsx(s,{action:t.endButton,background:"bgPrimaryWash"}),e.jsx(d,{}),e.jsx(s,{action:t.endButtons}),e.jsx(d,{}),e.jsx(s,{action:l}),e.jsx(d,{})]})};n.parameters={a11y:{config:{rules:[{id:"landmark-no-duplicate-contentinfo",enabled:!1},{id:"landmark-unique",enabled:!1}]}}};const i=()=>{const{isPhone:a}=m(),l=a?t.endButtonsBlock2:t.endButtons2;return e.jsxs(c,{gap:0,left:0,position:"absolute",top:0,width:"100%",children:[e.jsx(c,{alignContent:"center",alignItems:"center",dangerouslySetBackground:"#FADADD",flexGrow:1,flexShrink:1,height:"400px",justifyContent:"center",children:e.jsx(x,{as:"h3",display:"block",font:"title1",children:"Primary Content"})}),e.jsx(p,{dangerouslySetBackground:"gray",height:"500px"}),e.jsx(p,{dangerouslySetBackground:"orange",height:"500px"}),e.jsx(s,{action:l,bottom:"0"})]})},C={title:"Components/PageFooter",component:s,argTypes:{position:{table:{disable:!0}},top:{table:{disable:!0}},left:{table:{disable:!0}},bottom:{table:{disable:!0}},right:{table:{disable:!0}},background:{control:"text"},action:{control:"select",options:["None","endButton","endButtons","endButtons2","endButtonsBlock2"],mapping:{None:null,endButton:t.endButton,endButtons:t.endButtons,endButtons2:t.endButtons2,endButtonsBlock2:t.endButtonsBlock2}}}};n.__docgenInfo={description:"",methods:[],displayName:"Examples"};i.__docgenInfo={description:"",methods:[],displayName:"PageFooterInPage"};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"args => <PageFooter {...args} />",...r.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => {
  const {
    isPhone
  } = useBreakpoints();
  const setEndButtonMobile = isPhone ? exampleProps.endButtonsBlock2 : exampleProps.endButtons2;
  return <VStack gap={1}>
      <PageFooter action={exampleProps.endButton} background="bgPrimaryWash" />
      <Divider />
      <PageFooter action={exampleProps.endButtons} />
      <Divider />
      <PageFooter action={setEndButtonMobile} />
      <Divider />
    </VStack>;
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
  const {
    isPhone
  } = useBreakpoints();
  const setEndButtonMobile = isPhone ? exampleProps.endButtonsBlock2 : exampleProps.endButtons2;
  return <VStack gap={0} left={0} position="absolute" top={0} width="100%">
      <VStack alignContent="center" alignItems="center" dangerouslySetBackground="#FADADD" flexGrow={1} flexShrink={1} height="400px" justifyContent="center">
        <Text as="h3" display="block" font="title1">
          Primary Content
        </Text>
      </VStack>
      <Box dangerouslySetBackground="gray" height="500px" />
      <Box dangerouslySetBackground="orange" height="500px" />
      <PageFooter action={setEndButtonMobile} bottom="0" />
    </VStack>;
}`,...i.parameters?.docs?.source}}};const I=["InteractiveFooter","Examples","PageFooterInPage"];export{n as Examples,r as InteractiveFooter,i as PageFooterInPage,I as __namedExportsOrder,C as default};
