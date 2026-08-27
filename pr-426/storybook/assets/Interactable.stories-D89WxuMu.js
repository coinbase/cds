import{r as s,j as e}from"./iframe-BXWLBCkp.js";import{B}from"./Button-W9Shg4T1.js";import{u as S}from"./useTheme-BJazYlse.js";import{I as u,b as j}from"./Interactable-D5HQmQer.js";import{V as a}from"./VStack-CnEfMFeL.js";import{T as o}from"./Text-Ch_dBU4v.js";import{T as l}from"./TextInput-CXMiH86I.js";import"./preload-helper-D9Z9MdNV.js";import"./Icon-CgDQ3NQp.js";import"./Spinner-BAI0lrZ-.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./color-Ceo1QMNe.js";import"./useMergeRefs-DR4sGa7m.js";import"./usePrefixedId-Dfl-0DGQ.js";import"./HStack-B6p8qBpp.js";import"./context-Cc0ZOVig.js";import"./HelperText-C1uG41Fa.js";import"./InputLabel-C3lBKQeI.js";import"./InputStack-DO5lXlgp.js";import"./tokens-BwScSksM.js";import"./ColorSurge-D5iBCkQQ.js";import"./useMotionProps-CS-LE6l8.js";import"./utils-CwomCnHN.js";import"./use-animation-CYeuSrS_.js";import"./motion-minimal-SVRWJYUW.js";import"./NativeInput-CDtkEvxu.js";const $={title:"Components/Interactable",component:u},c=()=>{const h=S(),[r,p]=s.useState("bgPrimary"),[d,k]=s.useState(""),[i,x]=s.useState(""),[m,C]=s.useState(""),[g,T]=s.useState(""),b=r in h.color,n={background:d||void 0,hoveredBackground:i||void 0,pressedBackground:m||void 0,disabledBackground:g||void 0},f=b?j({theme:h,background:r,blendStyles:n}):{},v=()=>{p("bgPrimary"),k(""),x(""),C(""),T("")};return e.jsxs(a,{gap:2,children:[e.jsx(B,{alignSelf:"end",onClick:v,variant:"secondary",children:"Reset all fields"}),e.jsxs(a,{gap:.5,children:[e.jsx(o,{as:"label",font:"label1",children:"Theme background color:"}),e.jsx(l,{compact:!0,disabled:d!=="",helperText:b?"The name of the theme color token that will be used for the base background color.":"Please enter a valid theme color token name.",onChange:t=>p(t.target.value),value:r,variant:b?void 0:"negative"})]}),e.jsxs(a,{gap:.5,children:[e.jsx(o,{as:"label",font:"label1",children:"Custom background color:"}),e.jsx(l,{compact:!0,helperText:"A custom color for the base background color. Accepts hex, rgba, hsl, etc. If this is set, the theme background color will not be used.",onChange:t=>k(t.target.value),value:d})]}),e.jsxs(a,{gap:.5,children:[e.jsx(o,{as:"label",font:"label1",children:"Custom base hover color:"}),e.jsx(l,{compact:!0,helperText:"A custom base color for the generated hover color. Accepts hex, rgba, hsl, etc.",onChange:t=>x(t.target.value),value:i})]}),e.jsxs(a,{gap:.5,children:[e.jsx(o,{as:"label",font:"label1",children:"Custom base pressed color:"}),e.jsx(l,{compact:!0,helperText:"A custom base color for the generated pressed color. Accepts hex, rgba, hsl, etc.",onChange:t=>C(t.target.value),value:m})]}),e.jsxs(a,{gap:.5,children:[e.jsx(o,{as:"label",font:"label1",children:"Custom disabled color:"}),e.jsx(l,{compact:!0,helperText:"A custom base color for the generated disabled color. Accepts hex, rgba, hsl, etc.",onChange:t=>T(t.target.value),value:g})]}),e.jsx(u,{background:r,blendStyles:n,borderRadius:300,padding:2,children:e.jsx(o,{font:"display1",children:"Normal"})}),e.jsx(u,{pressed:!0,background:r,blendStyles:n,borderRadius:300,padding:2,children:e.jsx(o,{font:"display1",children:"Pressed"})}),e.jsx(u,{disabled:!0,background:r,blendStyles:n,borderRadius:300,padding:2,children:e.jsx(o,{font:"display1",children:"Disabled"})}),e.jsx(a,{background:"bgAlternate",borderRadius:300,padding:2,children:e.jsx("pre",{children:JSON.stringify(f,null,2)})})]})};c.__docgenInfo={description:"",methods:[],displayName:"GeneratedColorStates"};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => {
  const theme = useTheme();
  const [themeColor, setThemeColor] = useState<ThemeVars.Color>('bgPrimary');
  const [customBackground, setCustomBackground] = useState('');
  const [customHoveredBackground, setCustomHoveredBackground] = useState('');
  const [customPressedBackground, setCustomPressedBackground] = useState('');
  const [customDisabledBackground, setCustomDisabledBackground] = useState('');
  const isThemeColorValid = themeColor in theme.color;
  const blendStyles = {
    background: customBackground ? customBackground : undefined,
    hoveredBackground: customHoveredBackground ? customHoveredBackground : undefined,
    pressedBackground: customPressedBackground ? customPressedBackground : undefined,
    disabledBackground: customDisabledBackground ? customDisabledBackground : undefined
  };
  const data = isThemeColorValid ? getInteractableStyles({
    theme,
    background: themeColor,
    blendStyles
  }) : {};
  const handleReset = () => {
    setThemeColor('bgPrimary');
    setCustomBackground('');
    setCustomHoveredBackground('');
    setCustomPressedBackground('');
    setCustomDisabledBackground('');
  };
  return <VStack gap={2}>
      <Button alignSelf="end" onClick={handleReset} variant="secondary">
        Reset all fields
      </Button>
      <VStack gap={0.5}>
        <Text as="label" font="label1">
          Theme background color:
        </Text>
        <TextInput compact disabled={customBackground !== ''} helperText={!isThemeColorValid ? 'Please enter a valid theme color token name.' : 'The name of the theme color token that will be used for the base background color.'} onChange={e => setThemeColor(e.target.value as ThemeVars.Color)} value={themeColor} variant={!isThemeColorValid ? 'negative' : undefined} />
      </VStack>
      <VStack gap={0.5}>
        <Text as="label" font="label1">
          Custom background color:
        </Text>
        <TextInput compact helperText="A custom color for the base background color. Accepts hex, rgba, hsl, etc. If this is set, the theme background color will not be used." onChange={e => setCustomBackground(e.target.value)} value={customBackground} />
      </VStack>
      <VStack gap={0.5}>
        <Text as="label" font="label1">
          Custom base hover color:
        </Text>
        <TextInput compact helperText={'A custom base color for the generated hover color. Accepts hex, rgba, hsl, etc.'} onChange={e => setCustomHoveredBackground(e.target.value)} value={customHoveredBackground} />
      </VStack>
      <VStack gap={0.5}>
        <Text as="label" font="label1">
          Custom base pressed color:
        </Text>
        <TextInput compact helperText={'A custom base color for the generated pressed color. Accepts hex, rgba, hsl, etc.'} onChange={e => setCustomPressedBackground(e.target.value)} value={customPressedBackground} />
      </VStack>
      <VStack gap={0.5}>
        <Text as="label" font="label1">
          Custom disabled color:
        </Text>
        <TextInput compact helperText={'A custom base color for the generated disabled color. Accepts hex, rgba, hsl, etc.'} onChange={e => setCustomDisabledBackground(e.target.value)} value={customDisabledBackground} />
      </VStack>
      <Interactable background={themeColor} blendStyles={blendStyles} borderRadius={300} padding={2}>
        <Text font="display1">Normal</Text>
      </Interactable>

      <Interactable pressed background={themeColor} blendStyles={blendStyles} borderRadius={300} padding={2}>
        <Text font="display1">Pressed</Text>
      </Interactable>

      <Interactable disabled background={themeColor} blendStyles={blendStyles} borderRadius={300} padding={2}>
        <Text font="display1">Disabled</Text>
      </Interactable>

      <VStack background="bgAlternate" borderRadius={300} padding={2}>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </VStack>
    </VStack>;
}`,...c.parameters?.docs?.source}}};const ee=["GeneratedColorStates"];export{c as GeneratedColorStates,ee as __namedExportsOrder,$ as default};
