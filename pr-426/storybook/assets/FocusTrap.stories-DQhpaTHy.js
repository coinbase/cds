import{j as t}from"./iframe-BXWLBCkp.js";import{T as a}from"./TextInput-CXMiH86I.js";import{V as r}from"./VStack-CnEfMFeL.js";import{T as i}from"./Text-Ch_dBU4v.js";import{F as s}from"./FocusTrap-90tMQkIg.js";import{B as o}from"./Button-W9Shg4T1.js";import"./preload-helper-D9Z9MdNV.js";import"./useMergeRefs-DR4sGa7m.js";import"./usePrefixedId-Dfl-0DGQ.js";import"./HStack-B6p8qBpp.js";import"./context-Cc0ZOVig.js";import"./HelperText-C1uG41Fa.js";import"./Icon-CgDQ3NQp.js";import"./useTheme-BJazYlse.js";import"./InputLabel-C3lBKQeI.js";import"./InputStack-DO5lXlgp.js";import"./tokens-BwScSksM.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./ColorSurge-D5iBCkQQ.js";import"./useMotionProps-CS-LE6l8.js";import"./utils-CwomCnHN.js";import"./use-animation-CYeuSrS_.js";import"./motion-minimal-SVRWJYUW.js";import"./NativeInput-CDtkEvxu.js";import"./debounce-fynzmAtJ.js";import"./Spinner-BAI0lrZ-.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";const q={title:"Components/FocusTrap",component:s},e=()=>t.jsxs(r,{gap:3,children:[t.jsx(a,{label:"I am not within a FocusTrap"}),t.jsx(o,{children:"Submit"}),t.jsx(s,{children:t.jsxs(r,{background:"bgPrimaryWash",gap:1,padding:3,children:[t.jsx(i,{as:"h1",display:"block",font:"headline",children:"These components are trapped"}),t.jsx(a,{label:"Test 1"}),t.jsx(a,{label:"Test 2"}),t.jsx(a,{label:"Test 3"}),t.jsx(a,{label:"Test 4"}),t.jsx(o,{children:"Submit"})]})})]}),n=()=>t.jsxs(r,{gap:3,children:[t.jsx(a,{label:"I am not within a FocusTrap"}),t.jsx(o,{children:"Submit"}),t.jsx(s,{children:t.jsxs(r,{background:"bgPrimaryWash",gap:1,padding:3,children:[t.jsx(i,{as:"h1",display:"block",font:"headline",children:"This single component is trapped"}),t.jsx(a,{label:"Test 1"})]})})]});e.__docgenInfo={description:"",methods:[],displayName:"Playground"};n.__docgenInfo={description:"",methods:[],displayName:"SingleFocusableChild"};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`() => {
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
