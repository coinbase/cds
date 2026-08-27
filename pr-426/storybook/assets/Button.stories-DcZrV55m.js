import{j as t}from"./iframe-BXWLBCkp.js";import{I as a}from"./Icon-CgDQ3NQp.js";import{B as o}from"./Button-W9Shg4T1.js";import{B as u}from"./ButtonGroup-CH8icdlI.js";import{V as s}from"./VStack-CnEfMFeL.js";import"./preload-helper-D9Z9MdNV.js";import"./useTheme-BJazYlse.js";import"./Spinner-BAI0lrZ-.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./Text-Ch_dBU4v.js";const C={component:o,title:"Components/Buttons/Button"},p=[{variant:"foregroundMuted"},{variant:"secondary"},{variant:"tertiary"},{variant:"positive"},{variant:"negative"},{variant:"secondary",transparent:!0},{variant:"positive",transparent:!0},{variant:"negative",transparent:!0},{block:!0},{compact:!0},{compact:!0,block:!0},{transparent:!0},{disabled:!0},{loading:!0},{loading:!0,compact:!0},{startIcon:"backArrow"},{endIcon:"backArrow"},{startIcon:"backArrow",endIcon:"forwardArrow"},{startIcon:"backArrow",endIcon:"forwardArrow",block:!0},{transparent:!0,flush:"start",compact:!0,endIcon:"forwardArrow"},{transparent:!0,flush:"end",compact:!0,endIcon:"forwardArrow"},{flush:"start",endIcon:"forwardArrow"},{flush:"end",endIcon:"forwardArrow"},{startIcon:"backArrow",endIcon:"forwardArrow",compact:!0},{startIcon:"backArrow",compact:!0},{endIcon:"forwardArrow",compact:!0},{padding:5},{paddingX:5,padding:4},{paddingY:4},{paddingStart:6,paddingEnd:6},{paddingTop:6,paddingBottom:6},{marginStart:-2},{font:"body"},{font:"title3"},{fontSize:"title3",fontWeight:"body"}],l=()=>console.log("clicked"),n=()=>t.jsx(s,{alignItems:"flex-start",gap:2,padding:.5,children:p.map((c,i)=>{const d=`button-${i}`;return t.jsx(o,{onClick:l,...c,children:"Button"},d)})}),r=()=>t.jsx(s,{gap:2,children:t.jsxs(u,{accessibilityLabel:"Group",children:[t.jsx(o,{end:t.jsx(a,{color:"fg",name:"caretRight",size:"s"}),children:"Test"}),t.jsx(o,{end:t.jsx(a,{active:!0,color:"fg",name:"add",size:"s"}),variant:"secondary",children:"Test"}),t.jsx(o,{endIconActive:!0,end:t.jsx(a,{active:!0,color:"fg",name:"add",size:"s"}),endIcon:"airdrop",variant:"secondary",children:"Test"})]})}),e=()=>t.jsxs(s,{background:"bgSecondary",gap:4,paddingX:2,children:[t.jsx(o,{onClick:()=>{},variant:"positive",children:"No Flush"}),t.jsx(o,{block:!0,flush:"start",onClick:()=>{},children:"Flush to Start"}),t.jsx(o,{block:!0,flush:"end",onClick:()=>{},variant:"negative",children:"Flush to End"})]});n.__docgenInfo={description:"",methods:[],displayName:"CreateButtonStories"};r.__docgenInfo={description:"",methods:[],displayName:"CustomEndIconButton"};e.__docgenInfo={description:"",methods:[],displayName:"FlushProps"};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => <VStack alignItems="flex-start" gap={2} padding={0.5}>
    {buttonStories.map((props, idx) => {
    const key = \`button-\${idx}\`;
    return <Button key={key} onClick={onClickConsole} {...props}>
          Button
        </Button>;
  })}
  </VStack>`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => <VStack gap={2}>
    <ButtonGroup accessibilityLabel="Group">
      <Button end={<Icon color="fg" name="caretRight" size="s" />}>Test</Button>
      <Button end={<Icon active color="fg" name="add" size="s" />} variant="secondary">
        Test
      </Button>
      <Button endIconActive end={<Icon active color="fg" name="add" size="s" />} endIcon="airdrop" variant="secondary">
        Test
      </Button>
    </ButtonGroup>
  </VStack>`,...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`() => <VStack background="bgSecondary" gap={4} paddingX={2}>
    <Button onClick={() => {}} variant="positive">
      No Flush
    </Button>
    <Button block flush="start" onClick={() => {}}>
      Flush to Start
    </Button>
    <Button block flush="end" onClick={() => {}} variant="negative">
      Flush to End
    </Button>
  </VStack>`,...e.parameters?.docs?.source}}};const j=["CreateButtonStories","CustomEndIconButton","FlushProps"];export{n as CreateButtonStories,r as CustomEndIconButton,e as FlushProps,j as __namedExportsOrder,C as default};
