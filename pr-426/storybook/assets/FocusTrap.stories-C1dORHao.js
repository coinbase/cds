import{j as t}from"./iframe-CsG_6vZR.js";import{T as a}from"./TextInput-D5KGlaku.js";import{V as r}from"./VStack-Cg_Yq2u4.js";import{T as i}from"./Text-B1CpMNU3.js";import{F as s}from"./FocusTrap-C5pHOjrH.js";import{B as o}from"./Button-D2WSek5T.js";import"./preload-helper-D9Z9MdNV.js";import"./useMergeRefs-DR4sGa7m.js";import"./usePrefixedId-BL1THI0P.js";import"./HStack-DaDYipoP.js";import"./context-fDezSldV.js";import"./HelperText-W0U74shX.js";import"./Icon-DTs0crZh.js";import"./useTheme-CmrOhAty.js";import"./InputLabel-CdlU6JsR.js";import"./InputStack-BFRjE954.js";import"./tokens-BwScSksM.js";import"./Interactable--rqISG90.js";import"./color-Ceo1QMNe.js";import"./ColorSurge-2yE2z4Kr.js";import"./useMotionProps-BXBckQBf.js";import"./utils-y2S18Lx0.js";import"./use-animation-DHwoMYVB.js";import"./motion-minimal-5s2ikV7b.js";import"./NativeInput-8PS_q8WF.js";import"./debounce-fynzmAtJ.js";import"./Spinner-C8x8bhOH.js";import"./Pressable-DDN99tmF.js";import"./isArray-M0ytM-vC.js";const q={title:"Components/FocusTrap",component:s},e=()=>t.jsxs(r,{gap:3,children:[t.jsx(a,{label:"I am not within a FocusTrap"}),t.jsx(o,{children:"Submit"}),t.jsx(s,{children:t.jsxs(r,{background:"bgPrimaryWash",gap:1,padding:3,children:[t.jsx(i,{as:"h1",display:"block",font:"headline",children:"These components are trapped"}),t.jsx(a,{label:"Test 1"}),t.jsx(a,{label:"Test 2"}),t.jsx(a,{label:"Test 3"}),t.jsx(a,{label:"Test 4"}),t.jsx(o,{children:"Submit"})]})})]}),n=()=>t.jsxs(r,{gap:3,children:[t.jsx(a,{label:"I am not within a FocusTrap"}),t.jsx(o,{children:"Submit"}),t.jsx(s,{children:t.jsxs(r,{background:"bgPrimaryWash",gap:1,padding:3,children:[t.jsx(i,{as:"h1",display:"block",font:"headline",children:"This single component is trapped"}),t.jsx(a,{label:"Test 1"})]})})]});e.__docgenInfo={description:"",methods:[],displayName:"Playground"};n.__docgenInfo={description:"",methods:[],displayName:"SingleFocusableChild"};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`() => {
  return <VStack gap={3}>
      <TextInput label="I am not within a FocusTrap" />
      <Button>Submit</Button>
      <FocusTrap>
        <VStack background="bgPrimaryWash" gap={1} padding={3}>
          <Text as="h1" display="block" font="headline">
            These components are trapped
          </Text>
          <TextInput label="Test 1" />
          <TextInput label="Test 2" />
          <TextInput label="Test 3" />
          <TextInput label="Test 4" />
          <Button>Submit</Button>
        </VStack>
      </FocusTrap>
    </VStack>;
}`,...e.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => {
  return <VStack gap={3}>
      <TextInput label="I am not within a FocusTrap" />
      <Button>Submit</Button>
      <FocusTrap>
        <VStack background="bgPrimaryWash" gap={1} padding={3}>
          <Text as="h1" display="block" font="headline">
            This single component is trapped
          </Text>
          <TextInput label="Test 1" />
        </VStack>
      </FocusTrap>
    </VStack>;
}`,...n.parameters?.docs?.source}}};const v=["Playground","SingleFocusableChild"];export{e as Playground,n as SingleFocusableChild,v as __namedExportsOrder,q as default};
