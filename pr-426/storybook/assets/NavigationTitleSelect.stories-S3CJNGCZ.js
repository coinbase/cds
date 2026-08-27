import{r as l,j as e}from"./iframe-CsG_6vZR.js";import{T as i}from"./Text-B1CpMNU3.js";import{N as o}from"./NavigationTitleSelect-8Dww3i4S.js";import{V as u}from"./VStack-Cg_Yq2u4.js";import"./preload-helper-D9Z9MdNV.js";import"./SelectOption-BBBPgn8s.js";import"./select-Em8pkxbY.js";import"./Cell-Z4wq8KY-.js";import"./useCellSpacing-BeT6oDTo.js";import"./sizing-Do56D2dQ.js";import"./HStack-DaDYipoP.js";import"./Pressable-DDN99tmF.js";import"./isArray-M0ytM-vC.js";import"./Interactable--rqISG90.js";import"./color-Ceo1QMNe.js";import"./useTheme-CmrOhAty.js";import"./CellAccessory-iu0jUwZW.js";import"./Icon-DTs0crZh.js";import"./isRtl-C5Fon8jH.js";import"./Dropdown-DlJsEaMG.js";import"./index-CKRF3JMY.js";import"./useBreakpoints-DD5uuIEx.js";import"./FocusTrap-C5pHOjrH.js";import"./useMergeRefs-DR4sGa7m.js";import"./debounce-fynzmAtJ.js";import"./ModalWrapper-D8IaYCfm.js";import"./NewAnimatePresence-P1FndR1q.js";import"./index-CpZJTW5x.js";import"./motion-minimal-5s2ikV7b.js";import"./use-unmount-effect-DmgCrakR.js";import"./useScrollBlocker-CjG6q-zd.js";import"./Overlay-DkQgdcBj.js";import"./OverlayContentContext-CpXWuzdo.js";import"./useMotionProps-BXBckQBf.js";import"./utils-y2S18Lx0.js";import"./tokens-BwScSksM.js";import"./Portal-BaLq4aAx.js";import"./Popover-BqkIPLOm.js";import"./dropdown-CDhCThJm.js";import"./useA11yControlledVisibility-BZQOfbE4.js";import"./usePrefixedId-BL1THI0P.js";import"./NavigationTitle-CT9oWnkG.js";const ce={title:"Components/Navigation/NavigationTitleSelect",component:o},s=[{label:"Dashboard",id:"dashboard"},{label:"Analytics",id:"analytics"},{label:"Settings",id:"settings"},{label:"Profile",id:"profile"}],y=[{label:"Dashboard",id:"dashboard"},{label:"Analytics",id:"analytics"},{label:"Settings",id:"settings"},{label:"Profile",id:"profile"},{label:"Reports",id:"reports"},{label:"Users",id:"users"},{label:"Billing",id:"billing"},{label:"Support",id:"support"},{label:"Documentation",id:"documentation"},{label:"API Keys",id:"api-keys"}],v=[{label:e.jsx(i,{font:"headline",children:"🏠 Home"}),id:"home"},{label:e.jsx(i,{font:"headline",children:"📊 Analytics"}),id:"analytics"},{label:e.jsx(i,{font:"headline",children:"⚙️ Settings"}),id:"settings"},{label:e.jsx(i,{font:"headline",children:"👤 Profile"}),id:"profile"}],n=()=>{const[t,a]=l.useState("dashboard");return e.jsx(o,{accessibilityLabel:"Select page",onChange:a,options:s,value:t})},r=()=>{const[t,a]=l.useState("dashboard");return e.jsx(o,{accessibilityLabel:"Select page from many options",onChange:a,options:y,value:t})},c=()=>{const[t,a]=l.useState("home");return e.jsx(o,{accessibilityLabel:"Select page with icons",onChange:a,options:v,value:t})},p=()=>{const[t,a]=l.useState("dashboard");return e.jsxs(u,{gap:3,children:[e.jsx(o,{accessibilityLabel:"Select page with primary color",color:"fgPrimary",onChange:a,options:s,value:t}),e.jsx(o,{accessibilityLabel:"Select page with muted color",color:"fgMuted",onChange:a,options:s,value:t})]})},d=()=>{const[t,a]=l.useState("dashboard"),[m,h]=l.useState(s[0]),S=g=>{a(g);const b=s.find(f=>f.id===g);b&&h(b)};return e.jsxs(u,{gap:4,children:[e.jsx(o,{accessibilityLabel:"Interactive navigation title",onChange:S,options:s,value:t}),e.jsxs(u,{alignItems:"center",background:"bgAlternate",borderRadius:300,justifyContent:"center",padding:3,children:[e.jsx(i,{as:"p",color:"fgMuted",display:"block",font:"caption",children:"Selected Option:"}),e.jsxs(i,{as:"p",display:"block",font:"headline",children:[m.label," (ID: ",m.id,")"]})]})]})};n.__docgenInfo={description:"",methods:[],displayName:"Default"};r.__docgenInfo={description:"",methods:[],displayName:"WithManyOptions"};c.__docgenInfo={description:"",methods:[],displayName:"WithComplexLabels"};p.__docgenInfo={description:"",methods:[],displayName:"WithCustomColor"};d.__docgenInfo={description:"",methods:[],displayName:"Interactive"};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('dashboard');
  return <NavigationTitleSelect accessibilityLabel="Select page" onChange={setValue} options={defaultOptions} value={value} />;
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('dashboard');
  return <NavigationTitleSelect accessibilityLabel="Select page from many options" onChange={setValue} options={manyOptions} value={value} />;
}`,...r.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('home');
  return <NavigationTitleSelect accessibilityLabel="Select page with icons" onChange={setValue} options={complexOptions} value={value} />;
}`,...c.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('dashboard');
  return <VStack gap={3}>
      <NavigationTitleSelect accessibilityLabel="Select page with primary color" color="fgPrimary" onChange={setValue} options={defaultOptions} value={value} />
      <NavigationTitleSelect accessibilityLabel="Select page with muted color" color="fgMuted" onChange={setValue} options={defaultOptions} value={value} />
    </VStack>;
}`,...p.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('dashboard');
  const [selectedOption, setSelectedOption] = useState(defaultOptions[0]);
  const handleChange = (newValue: string) => {
    setValue(newValue);
    const option = defaultOptions.find(opt => opt.id === newValue);
    if (option) {
      setSelectedOption(option);
    }
  };
  return <VStack gap={4}>
      <NavigationTitleSelect accessibilityLabel="Interactive navigation title" onChange={handleChange} options={defaultOptions} value={value} />
      <VStack alignItems="center" background="bgAlternate" borderRadius={300} justifyContent="center" padding={3}>
        <Text as="p" color="fgMuted" display="block" font="caption">
          Selected Option:
        </Text>
        <Text as="p" display="block" font="headline">
          {selectedOption.label} (ID: {selectedOption.id})
        </Text>
      </VStack>
    </VStack>;
}`,...d.parameters?.docs?.source}}};const pe=["Default","WithManyOptions","WithComplexLabels","WithCustomColor","Interactive"];export{n as Default,d as Interactive,c as WithComplexLabels,p as WithCustomColor,r as WithManyOptions,pe as __namedExportsOrder,ce as default};
