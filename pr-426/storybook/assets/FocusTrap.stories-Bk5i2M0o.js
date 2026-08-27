import{j as t}from"./iframe-CYDANtMt.js";import{T as a}from"./TextInput-D1xg7XYw.js";import{V as r}from"./VStack-iXgNewwv.js";import{T as i}from"./Text-0g3rWpAf.js";import{F as s}from"./FocusTrap-D5jofIBF.js";import{B as o}from"./Button-DPtA13Wn.js";import"./preload-helper-D9Z9MdNV.js";import"./useMergeRefs-DR4sGa7m.js";import"./usePrefixedId-D1yZvkEs.js";import"./HStack-Fh-9TmPm.js";import"./context-C9K9uJvD.js";import"./HelperText-0iJbV5oL.js";import"./Icon-DRxKkZdt.js";import"./useTheme-C_Ehsh33.js";import"./InputLabel-BwQhf82V.js";import"./InputStack-uMkha90v.js";import"./tokens-BwScSksM.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";import"./ColorSurge-COlvd6LS.js";import"./useMotionProps-BF3bCUsm.js";import"./utils-CM_X5is-.js";import"./use-animation-B-MH_N0S.js";import"./motion-minimal-B1h7XI-_.js";import"./NativeInput-Dr3zj32e.js";import"./debounce-fynzmAtJ.js";import"./Spinner-CXotWqqb.js";import"./Pressable-BvczHaFK.js";import"./isArray-BJmyNVUi.js";const q={title:"Components/FocusTrap",component:s},e=()=>t.jsxs(r,{gap:3,children:[t.jsx(a,{label:"I am not within a FocusTrap"}),t.jsx(o,{children:"Submit"}),t.jsx(s,{children:t.jsxs(r,{background:"bgPrimaryWash",gap:1,padding:3,children:[t.jsx(i,{as:"h1",display:"block",font:"headline",children:"These components are trapped"}),t.jsx(a,{label:"Test 1"}),t.jsx(a,{label:"Test 2"}),t.jsx(a,{label:"Test 3"}),t.jsx(a,{label:"Test 4"}),t.jsx(o,{children:"Submit"})]})})]}),n=()=>t.jsxs(r,{gap:3,children:[t.jsx(a,{label:"I am not within a FocusTrap"}),t.jsx(o,{children:"Submit"}),t.jsx(s,{children:t.jsxs(r,{background:"bgPrimaryWash",gap:1,padding:3,children:[t.jsx(i,{as:"h1",display:"block",font:"headline",children:"This single component is trapped"}),t.jsx(a,{label:"Test 1"})]})})]});e.__docgenInfo={description:"",methods:[],displayName:"Playground"};n.__docgenInfo={description:"",methods:[],displayName:"SingleFocusableChild"};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`() => {
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
