import{r as s,j as e}from"./iframe-CYDANtMt.js";import{B}from"./Button-DPtA13Wn.js";import{u as S}from"./useTheme-C_Ehsh33.js";import{I as u,b as j}from"./Interactable-DhvzqrPU.js";import{V as a}from"./VStack-iXgNewwv.js";import{T as o}from"./Text-0g3rWpAf.js";import{T as l}from"./TextInput-D1xg7XYw.js";import"./preload-helper-D9Z9MdNV.js";import"./Icon-DRxKkZdt.js";import"./Spinner-CXotWqqb.js";import"./Pressable-BvczHaFK.js";import"./isArray-BJmyNVUi.js";import"./color-Ceo1QMNe.js";import"./useMergeRefs-DR4sGa7m.js";import"./usePrefixedId-D1yZvkEs.js";import"./HStack-Fh-9TmPm.js";import"./context-C9K9uJvD.js";import"./HelperText-0iJbV5oL.js";import"./InputLabel-BwQhf82V.js";import"./InputStack-uMkha90v.js";import"./tokens-BwScSksM.js";import"./ColorSurge-COlvd6LS.js";import"./useMotionProps-BF3bCUsm.js";import"./utils-CM_X5is-.js";import"./use-animation-B-MH_N0S.js";import"./motion-minimal-B1h7XI-_.js";import"./NativeInput-Dr3zj32e.js";const $={title:"Components/Interactable",component:u},c=()=>{const h=S(),[r,p]=s.useState("bgPrimary"),[d,k]=s.useState(""),[i,x]=s.useState(""),[m,C]=s.useState(""),[g,T]=s.useState(""),b=r in h.color,n={background:d||void 0,hoveredBackground:i||void 0,pressedBackground:m||void 0,disabledBackground:g||void 0},f=b?j({theme:h,background:r,blendStyles:n}):{},v=()=>{p("bgPrimary"),k(""),x(""),C(""),T("")};return e.jsxs(a,{gap:2,children:[e.jsx(B,{alignSelf:"end",onClick:v,variant:"secondary",children:"Reset all fields"}),e.jsxs(a,{gap:.5,children:[e.jsx(o,{as:"label",font:"label1",children:"Theme background color:"}),e.jsx(l,{compact:!0,disabled:d!=="",helperText:b?"The name of the theme color token that will be used for the base background color.":"Please enter a valid theme color token name.",onChange:t=>p(t.target.value),value:r,variant:b?void 0:"negative"})]}),e.jsxs(a,{gap:.5,children:[e.jsx(o,{as:"label",font:"label1",children:"Custom background color:"}),e.jsx(l,{compact:!0,helperText:"A custom color for the base background color. Accepts hex, rgba, hsl, etc. If this is set, the theme background color will not be used.",onChange:t=>k(t.target.value),value:d})]}),e.jsxs(a,{gap:.5,children:[e.jsx(o,{as:"label",font:"label1",children:"Custom base hover color:"}),e.jsx(l,{compact:!0,helperText:"A custom base color for the generated hover color. Accepts hex, rgba, hsl, etc.",onChange:t=>x(t.target.value),value:i})]}),e.jsxs(a,{gap:.5,children:[e.jsx(o,{as:"label",font:"label1",children:"Custom base pressed color:"}),e.jsx(l,{compact:!0,helperText:"A custom base color for the generated pressed color. Accepts hex, rgba, hsl, etc.",onChange:t=>C(t.target.value),value:m})]}),e.jsxs(a,{gap:.5,children:[e.jsx(o,{as:"label",font:"label1",children:"Custom disabled color:"}),e.jsx(l,{compact:!0,helperText:"A custom base color for the generated disabled color. Accepts hex, rgba, hsl, etc.",onChange:t=>T(t.target.value),value:g})]}),e.jsx(u,{background:r,blendStyles:n,borderRadius:300,padding:2,children:e.jsx(o,{font:"display1",children:"Normal"})}),e.jsx(u,{pressed:!0,background:r,blendStyles:n,borderRadius:300,padding:2,children:e.jsx(o,{font:"display1",children:"Pressed"})}),e.jsx(u,{disabled:!0,background:r,blendStyles:n,borderRadius:300,padding:2,children:e.jsx(o,{font:"display1",children:"Disabled"})}),e.jsx(a,{background:"bgAlternate",borderRadius:300,padding:2,children:e.jsx("pre",{children:JSON.stringify(f,null,2)})})]})};c.__docgenInfo={description:"",methods:[],displayName:"GeneratedColorStates"};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => {
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
