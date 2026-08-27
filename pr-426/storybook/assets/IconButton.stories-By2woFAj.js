import{j as e}from"./iframe-CsG_6vZR.js";import{n as y}from"./names-B7Y-Su7J.js";import{T as n}from"./Text-B1CpMNU3.js";import{I as a}from"./IconButton-DNJ86Kiu.js";import{V as r}from"./VStack-Cg_Yq2u4.js";import{H as c}from"./HStack-DaDYipoP.js";import"./preload-helper-D9Z9MdNV.js";import"./Button-D2WSek5T.js";import"./Icon-DTs0crZh.js";import"./useTheme-CmrOhAty.js";import"./Spinner-C8x8bhOH.js";import"./Pressable-DDN99tmF.js";import"./isArray-M0ytM-vC.js";import"./Interactable--rqISG90.js";import"./color-Ceo1QMNe.js";const s="arrowsHorizontal",i="Horizontal arrows",S=[{component:t=>e.jsx(a,{name:s,variant:"primary",...t}),title:"Primary"},{component:t=>e.jsx(a,{transparent:!0,name:s,variant:"primary",...t}),title:"Primary transparent"},{component:t=>e.jsx(a,{name:s,variant:"secondary",...t}),title:"Secondary"},{component:t=>e.jsx(a,{transparent:!0,name:s,variant:"secondary",...t}),title:"Secondary transparent"},{component:t=>e.jsx(a,{name:s,variant:"foregroundMuted",...t}),title:"ForegroundMuted"},{component:t=>e.jsx(a,{transparent:!0,name:s,variant:"foregroundMuted",...t}),title:"ForegroundMuted transparent"}],l=()=>e.jsxs(r,{gap:6,children:[e.jsxs(r,{gap:2,children:[e.jsx(n,{font:"title3",children:"Basic Usage"}),e.jsx(a,{accessibilityLabel:"Horizontal arrows",name:"arrowsHorizontal"})]}),e.jsxs(r,{gap:2,children:[e.jsx(n,{font:"title3",children:"States"}),e.jsxs(c,{alignItems:"center",gap:4,children:[e.jsx(a,{disabled:!0,accessibilityLabel:i,name:s,variant:"primary"}),e.jsx(n,{font:"body",children:"Disabled primary"})]}),e.jsxs(c,{alignItems:"center",gap:4,children:[e.jsx(a,{disabled:!0,accessibilityLabel:i,name:s}),e.jsx(n,{font:"body",children:"Disabled secondary"})]})]}),e.jsxs(r,{gap:2,children:[e.jsx(n,{font:"title3",children:"Without Compact Styles"}),e.jsx(a,{accessibilityLabel:i,compact:!1,name:s})]}),e.jsxs(r,{gap:2,children:[e.jsx(n,{font:"title3",children:"Custom Style"}),e.jsx(a,{accessibilityLabel:i,compact:!1,name:s,style:{backgroundColor:"red",transform:"scale(0.5)"}})]}),e.jsxs(r,{gap:2,children:[e.jsx(n,{font:"title3",children:"Variants"}),S.map((t,d)=>e.jsxs(c,{alignItems:"center",gap:4,children:[t.component({accessibilityLabel:i}),e.jsx(n,{font:"body",children:t.title})]},d))]}),e.jsxs(r,{gap:2,children:[e.jsx(n,{font:"title3",children:"Variants Loading"}),S.map((t,d)=>e.jsxs(c,{alignItems:"center",gap:4,children:[t.component({accessibilityLabel:i,loading:!0}),e.jsx(n,{font:"body",children:t.title})]},d))]})]}),g=({startIndex:t,endIndex:d})=>e.jsx(c,{flexWrap:"wrap",gap:2,paddingBottom:2,children:y.slice(t,d).map(o=>e.jsx(r,{children:e.jsxs(c,{alignItems:"center",gap:2,children:[e.jsx(a,{accessibilityLabel:o,name:o,variant:"primary"}),e.jsx(a,{accessibilityLabel:o,name:o,variant:"secondary"}),e.jsx(a,{accessibilityLabel:o,name:o,variant:"foregroundMuted"})]})},o))}),m=()=>e.jsx(g,{endIndex:160,startIndex:0}),p=()=>e.jsx(g,{endIndex:320,startIndex:160}),x=()=>e.jsx(g,{endIndex:480,startIndex:320}),u=()=>e.jsx(g,{endIndex:640,startIndex:480}),C={title:"Components/Buttons/IconButton",component:a};l.__docgenInfo={description:"",methods:[],displayName:"Default"};m.__docgenInfo={description:"",methods:[],displayName:"Sheet1"};p.__docgenInfo={description:"",methods:[],displayName:"Sheet2"};x.__docgenInfo={description:"",methods:[],displayName:"Sheet3"};u.__docgenInfo={description:"",methods:[],displayName:"Sheet4"};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => <VStack gap={6}>
    <VStack gap={2}>
      <Text font="title3">Basic Usage</Text>
      <IconButton accessibilityLabel="Horizontal arrows" name="arrowsHorizontal" />
    </VStack>
    <VStack gap={2}>
      <Text font="title3">States</Text>
      <HStack alignItems="center" gap={4}>
        <IconButton disabled accessibilityLabel={accessibilityLabel} name={iconName} variant="primary" />
        <Text font="body">Disabled primary</Text>
      </HStack>
      <HStack alignItems="center" gap={4}>
        <IconButton disabled accessibilityLabel={accessibilityLabel} name={iconName} />
        <Text font="body">Disabled secondary</Text>
      </HStack>
    </VStack>
    <VStack gap={2}>
      <Text font="title3">Without Compact Styles</Text>
      <IconButton accessibilityLabel={accessibilityLabel} compact={false} name={iconName} />
    </VStack>
    <VStack gap={2}>
      <Text font="title3">Custom Style</Text>
      <IconButton accessibilityLabel={accessibilityLabel} compact={false} name={iconName} style={{
      backgroundColor: 'red',
      transform: 'scale(0.5)'
    }} />
    </VStack>
    <VStack gap={2}>
      <Text font="title3">Variants</Text>
      {variants.map((variant, index) => <HStack key={index} alignItems="center" gap={4}>
          {variant.component({
        accessibilityLabel
      })}
          <Text font="body">{variant.title}</Text>
        </HStack>)}
    </VStack>
    <VStack gap={2}>
      <Text font="title3">Variants Loading</Text>
      {variants.map((variant, index) => <HStack key={index} alignItems="center" gap={4}>
          {variant.component({
        accessibilityLabel,
        loading: true
      })}
          <Text font="body">{variant.title}</Text>
        </HStack>)}
    </VStack>
  </VStack>`,...l.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:"() => <IconButtonSheet endIndex={160} startIndex={0} />",...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:"() => <IconButtonSheet endIndex={320} startIndex={160} />",...p.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:"() => <IconButtonSheet endIndex={480} startIndex={320} />",...x.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:"() => <IconButtonSheet endIndex={640} startIndex={480} />",...u.parameters?.docs?.source}}};const D=["Default","Sheet1","Sheet2","Sheet3","Sheet4"];export{l as Default,m as Sheet1,p as Sheet2,x as Sheet3,u as Sheet4,D as __namedExportsOrder,C as default};
