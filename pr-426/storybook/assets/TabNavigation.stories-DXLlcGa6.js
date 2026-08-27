import{r as n,j as e,a5 as c,a6 as p}from"./iframe-BXWLBCkp.js";import{l as f}from"./loremIpsum-CjdvNg3u.js";import{s as P}from"./tabs-mxIlbzm-.js";import{s as W}from"./sample-CVS7DnlY.js";import{B as I}from"./Button-W9Shg4T1.js";import{C as B}from"./Chip-Cb6f10va.js";import{S as L}from"./Select-6-gb_fJq.js";import{S as M}from"./SelectOption-Bnv43xgZ.js";import{H as w}from"./HStack-B6p8qBpp.js";import{V as i}from"./VStack-CnEfMFeL.js";import{L as N}from"./Link-C3jcuPE_.js";import{T as s}from"./Text-Ch_dBU4v.js";import{T as r}from"./TabNavigation-nLuwWOga.js";import"./preload-helper-D9Z9MdNV.js";import"./_baseRandom-CPH1PYT7.js";import"./_arrayMap-BkD9PEmT.js";import"./keys-7cKTP6Ww.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./useTheme-BJazYlse.js";import"./_isIndex-CqeJT8IS.js";import"./Icon-CgDQ3NQp.js";import"./Spinner-BAI0lrZ-.js";import"./tokens-BwScSksM.js";import"./useMergeRefs-DR4sGa7m.js";import"./InputStack-DO5lXlgp.js";import"./ColorSurge-D5iBCkQQ.js";import"./useMotionProps-CS-LE6l8.js";import"./utils-CwomCnHN.js";import"./use-animation-CYeuSrS_.js";import"./motion-minimal-SVRWJYUW.js";import"./InputLabel-C3lBKQeI.js";import"./Dropdown-BSPZ_a8b.js";import"./index-7N_x-QzT.js";import"./useBreakpoints-BiiruerU.js";import"./FocusTrap-90tMQkIg.js";import"./debounce-fynzmAtJ.js";import"./ModalWrapper-D-DvdkD-.js";import"./NewAnimatePresence-BbA2hDPb.js";import"./index-B2twlf45.js";import"./use-unmount-effect-5QIafHMH.js";import"./useScrollBlocker-4Da9qMHo.js";import"./Overlay-XiDupmt3.js";import"./OverlayContentContext-hT53AGt-.js";import"./Portal-tAONErW2.js";import"./Popover-CipwoaXC.js";import"./dropdown-CDhCThJm.js";import"./context-Cc0ZOVig.js";import"./usePrefixedId-Dfl-0DGQ.js";import"./AnimatedCaret-DDAfukJC.js";import"./collapsible-BAneA-61.js";import"./index-DoYuAu2r.js";import"./eventHandlers-CyvGcX2M.js";import"./HelperText-C1uG41Fa.js";import"./useRefocusTrigger-t_p2JCAO.js";import"./select-Em8pkxbY.js";import"./Cell-CB_dChqK.js";import"./useCellSpacing-BuZVtSR4.js";import"./sizing-Do56D2dQ.js";import"./CellAccessory-BypMgxs5.js";import"./isRtl-Du0XdnX5.js";import"./useDimensions-CSIQgsxn.js";import"./Paddle-KLwlcGm-.js";import"./IconButton-OIX0AFCz.js";import"./TabIndicator-EwmhyRSA.js";import"./usePreviousValues-rLMWE3mU.js";import"./TabLabel-C51G3c2G.js";import"./usePreviousValue-Cm2wE0Iw.js";import"./DotCount-Jrldj36O.js";import"./dotStyles-Ccp1dKIN.js";import"./Collapsible-DRMWW50B.js";const V=({id:a,isActive:t,children:l})=>{const x=n.useMemo(()=>t?void 0:"none",[t]);return e.jsx(i,{bordered:!0,accessibilityLabelledBy:`tab--${a}`,background:"bgPrimaryWash",borderRadius:200,display:x,gap:1,id:`tabpanel--${a}`,padding:2,role:"tabpanel",children:l})};V.__docgenInfo={description:"",methods:[],displayName:"MockTabPanel",props:{id:{required:!0,tsType:{name:"string"},description:""},isActive:{required:!0,tsType:{name:"boolean"},description:""}}};const d={config:{rules:[{id:"aria-valid-attr-value",enabled:!1},{id:"duplicate-id-active",enabled:!1},{id:"duplicate-id",enabled:!1}]}},o=P.slice(0,5),ra={title:"Components/Tabs/TabNavigation",component:r},b=()=>{const[a,t]=n.useState(o[0].id);return e.jsxs(e.Fragment,{children:[e.jsxs(c,{activeColorScheme:"light",theme:p,children:[e.jsxs(i,{background:"bg",gap:2,padding:2,children:[e.jsx(s,{as:"p",display:"block",font:"headline",children:"Default (Normal)"}),e.jsx(r,{onChange:t,tabs:o,value:a})]}),e.jsxs(i,{background:"bgAlternate",gap:2,padding:2,children:[e.jsx(s,{as:"p",display:"block",font:"headline",children:"Custom background"}),e.jsx(r,{background:"bgAlternate",onChange:t,tabs:o,value:a})]})]}),e.jsx(c,{activeColorScheme:"dark",theme:p,children:e.jsxs(i,{background:"bg",gap:2,padding:2,children:[e.jsx(s,{as:"p",display:"block",font:"headline",children:"Dark"}),e.jsx(r,{onChange:t,tabs:o,value:a})]})})]})};b.parameters={percy:{enableJavaScript:!0},a11y:d};const _=({label:a,...t})=>e.jsx(w,{bordered:!0,background:"bg",borderRadius:100,paddingX:2,paddingY:1,...t,children:e.jsx(s,{as:"p",display:"block",font:"headline",children:a})}),J=({label:a,...t})=>e.jsx(B,{...t,children:a}),A=[...o.slice(0,3),{id:"custom_tab",label:"Custom",testID:"custom_tab",Component:_}],u=()=>{const[a,t]=n.useState(o[0].id);return e.jsxs(i,{gap:2,children:[e.jsx(s,{as:"p",display:"block",font:"headline",children:"Custom tab"}),e.jsx(r,{Component:_,gap:1,onChange:t,tabs:o,value:a}),e.jsx(s,{as:"p",display:"block",font:"headline",children:"Custom tab with paddles"}),e.jsx(r,{Component:_,gap:1,onChange:t,tabs:P,value:a}),e.jsx(s,{as:"p",display:"block",font:"headline",children:"Only one custom tab"}),e.jsx(r,{gap:1,onChange:t,tabs:A,value:a}),e.jsx(s,{as:"p",display:"block",font:"headline",children:"All the custom things"}),e.jsx(r,{Component:J,gap:1,onChange:t,tabs:A,value:a})]})};u.parameters={percy:{enableJavaScript:!0},a11y:d};const m=()=>{const[a,t]=n.useState(o[0].id);return e.jsx(r,{onChange:t,tabs:P,value:a})};m.parameters={percy:{enableJavaScript:!0},a11y:d};const h=()=>{const[a,t]=n.useState(o[0].id);return e.jsx(r,{onChange:t,paddleStyle:{transform:"scale(0.5)"},tabs:P,value:a})};h.parameters={percy:{enableJavaScript:!0},a11y:d};const Y=[{id:"buy",label:"Buy"},{id:"sell",label:"Sell"},{id:"convert",label:"Convert"},{id:"send",label:"Send"},{id:"receive",label:"Receive"}],g=()=>{const[a,t]=n.useState("buy");return e.jsx(c,{activeColorScheme:"light",theme:p,children:e.jsxs(i,{background:"bg",gap:2,padding:2,children:[e.jsx(s,{as:"p",display:"block",font:"headline",children:"With Enum"}),e.jsx(r,{onChange:t,tabs:Y,value:a})]})})};g.parameters={percy:{enableJavaScript:!0},a11y:d};const T=()=>{const[a,t]=n.useState(o[0].id),[l,x]=n.useState(0),j=n.useMemo(()=>o.map(C=>({...C,count:l})),[l]),D=n.useCallback(()=>{x(Number(l?0:W([2,14,100])))},[l]);return e.jsxs(e.Fragment,{children:[e.jsx(c,{activeColorScheme:"light",theme:p,children:e.jsxs(i,{background:"bg",gap:2,padding:2,children:[e.jsx(L,{label:"Select a tab",onChange:t,value:a,children:j.map(C=>e.jsx(M,{title:C.label,value:C.id},C.id))}),e.jsx(I,{onClick:D,children:"Randomize dot count"}),e.jsx(s,{as:"p",display:"block",font:"headline",children:"Default (Normal)"}),e.jsx(r,{onChange:t,tabs:j,value:a})]})}),e.jsx(c,{activeColorScheme:"dark",theme:p,children:e.jsxs(i,{background:"bg",gap:2,padding:2,children:[e.jsx(s,{as:"p",display:"block",font:"headline",children:"Dark"}),e.jsx(r,{onChange:t,tabs:j,value:a})]})}),e.jsx(c,{activeColorScheme:"light",theme:p,children:e.jsxs(i,{background:"bgAlternate",gap:2,padding:2,children:[e.jsx(s,{as:"p",display:"block",font:"headline",children:"Custom background"}),e.jsx(r,{background:"bgAlternate",onChange:t,tabs:j,value:a})]})})]})};T.parameters={percy:{enableJavaScript:!0},a11y:d};const v=()=>{const[a,t]=n.useState();return e.jsxs(e.Fragment,{children:[e.jsx(c,{activeColorScheme:"light",theme:p,children:e.jsx(i,{background:"bg",gap:2,padding:2,children:e.jsx(r,{onChange:t,tabs:o,value:a,variant:"secondary"})})}),e.jsx(c,{activeColorScheme:"dark",theme:p,children:e.jsx(i,{background:"bg",gap:2,padding:2,children:e.jsx(r,{onChange:t,tabs:o,value:a,variant:"secondary"})})})]})};v.parameters={percy:{enableJavaScript:!0},a11y:d};const S=()=>{const[a,t]=n.useState(o[0].id);return e.jsxs(i,{gap:2,children:[e.jsx(r,{accessibilityLabel:"Really nice tab navigation",onChange:t,tabs:o.slice(0,3),value:a}),e.jsxs(V,{id:o[0].id,isActive:a===o[0].id,children:[e.jsx(s,{as:"h2",display:"block",font:"title1",paddingBottom:2,children:"This is tab one"}),e.jsxs(s,{as:"p",display:"block",font:"body",children:[e.jsx(N,{href:"/",children:"This is the body"})," of tab one. You are going to love it"]}),e.jsx(s,{as:"p",display:"block",font:"body",children:f})]}),e.jsxs(V,{id:o[1].id,isActive:a===o[1].id,children:[e.jsx(s,{as:"h2",display:"block",font:"title1",paddingBottom:2,children:"Here we have tab two"}),e.jsxs(s,{as:"p",display:"block",font:"body",children:["And look, ",e.jsx(N,{href:"/",children:"this another link"})," in the body of tab one. You are going to love it"]}),e.jsxs(s,{as:"p",display:"block",font:"body",children:[f," ",f]})]}),e.jsxs(V,{id:o[2].id,isActive:a===o[2].id,children:[e.jsx(s,{as:"h2",display:"block",font:"title1",paddingBottom:2,children:"Heyooo, tab three!"}),e.jsxs(s,{as:"p",display:"block",font:"body",children:["Again, we can put a link like ",e.jsx(N,{href:"/",children:"this another link"})," in the body of tab one. You are going to love it"]}),e.jsxs(s,{as:"p",display:"block",font:"body",children:[f," ",f]})]})]})},k=()=>{const[a,t]=n.useState();return e.jsx(i,{background:"bg",gap:2,padding:2,children:e.jsx(r,{onChange:t,tabs:o.map((l,x)=>({...l,disabled:x===1})),value:a,variant:"secondary"})})};k.parameters={percy:{enableJavaScript:!0},a11y:d};const y=()=>{const[a,t]=n.useState(o[0].id);return e.jsx(r,{onChange:t,paddingX:3,paddingY:1,tabs:o.slice(0,3),value:a})};y.parameters={percy:{enableJavaScript:!0},a11y:d};b.__docgenInfo={description:"",methods:[],displayName:"Default"};u.__docgenInfo={description:"",methods:[],displayName:"CustomTab"};m.__docgenInfo={description:"",methods:[],displayName:"WithPaddles"};h.__docgenInfo={description:"",methods:[],displayName:"WithCustomPaddles"};g.__docgenInfo={description:"",methods:[],displayName:"WithEnum"};T.__docgenInfo={description:"",methods:[],displayName:"WithDotCountChange"};v.__docgenInfo={description:"",methods:[],displayName:"Secondary"};S.__docgenInfo={description:"",methods:[],displayName:"AccessibilityTest"};k.__docgenInfo={description:"",methods:[],displayName:"Disabled"};y.__docgenInfo={description:"",methods:[],displayName:"WithPadding"};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`() => {
  const [value, setValue] = useState<TabProps['id']>(tabs[0].id);
  return <>
      <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
        <VStack background="bg" gap={2} padding={2}>
          <Text as="p" display="block" font="headline">
            Default (Normal)
          </Text>
          <TabNavigation onChange={setValue} tabs={tabs} value={value} />
        </VStack>
        <VStack background="bgAlternate" gap={2} padding={2}>
          <Text as="p" display="block" font="headline">
            Custom background
          </Text>
          <TabNavigation background="bgAlternate" onChange={setValue} tabs={tabs} value={value} />
        </VStack>
      </ThemeProvider>
      <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
        <VStack background="bg" gap={2} padding={2}>
          <Text as="p" display="block" font="headline">
            Dark
          </Text>
          <TabNavigation onChange={setValue} tabs={tabs} value={value} />
        </VStack>
      </ThemeProvider>
    </>;
}`,...b.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`() => {
  const [value, setValue] = useState<TabProps['id']>(tabs[0].id);
  return <VStack gap={2}>
      <Text as="p" display="block" font="headline">
        Custom tab
      </Text>
      <TabNavigation Component={renderCustomTab} gap={1} onChange={setValue} tabs={tabs} value={value} />
      <Text as="p" display="block" font="headline">
        Custom tab with paddles
      </Text>
      <TabNavigation Component={renderCustomTab} gap={1} onChange={setValue} tabs={sampleTabs} value={value} />
      <Text as="p" display="block" font="headline">
        Only one custom tab
      </Text>
      <TabNavigation gap={1} onChange={setValue} tabs={someCustomTabs} value={value} />
      <Text as="p" display="block" font="headline">
        All the custom things
      </Text>
      <TabNavigation Component={renderAnotherCustomTab} gap={1} onChange={setValue} tabs={someCustomTabs} value={value} />
    </VStack>;
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => {
  const [value, setValue] = useState<TabProps['id']>(tabs[0].id);
  return <TabNavigation onChange={setValue} tabs={sampleTabs} value={value} />;
}`,...m.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => {
  const [value, setValue] = useState<TabProps['id']>(tabs[0].id);
  return <TabNavigation onChange={setValue} paddleStyle={{
    transform: 'scale(0.5)'
  }} tabs={sampleTabs} value={value} />;
}`,...h.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => {
  const [value, setValue] = useState<TradingActivity>('buy');
  return <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
      <VStack background="bg" gap={2} padding={2}>
        <Text as="p" display="block" font="headline">
          With Enum
        </Text>
        <TabNavigation onChange={setValue} tabs={enumTabs} value={value} />
      </VStack>
    </ThemeProvider>;
}`,...g.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`() => {
  const [value, setValue] = useState<TabProps['id']>(tabs[0].id);
  const [count, setCount] = useState(0);
  // This is just a helper to make a random tab show a count
  const tabsWithDot = useMemo(() => tabs.map(tab => ({
    ...tab,
    count
  })), [count]);
  const updateCount = useCallback(() => {
    setCount(Number(count ? 0 : sample([2, 14, 100])));
  }, [count]);
  return <>
      <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
        <VStack background="bg" gap={2} padding={2}>
          <Select label="Select a tab" onChange={setValue} value={value}>
            {tabsWithDot.map(option => <SelectOption key={option.id} title={option.label} value={option.id} />)}
          </Select>
          <Button onClick={updateCount}>Randomize dot count</Button>
          <Text as="p" display="block" font="headline">
            Default (Normal)
          </Text>
          <TabNavigation onChange={setValue} tabs={tabsWithDot} value={value} />
        </VStack>
      </ThemeProvider>
      <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
        <VStack background="bg" gap={2} padding={2}>
          <Text as="p" display="block" font="headline">
            Dark
          </Text>
          <TabNavigation onChange={setValue} tabs={tabsWithDot} value={value} />
        </VStack>
      </ThemeProvider>
      <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
        <VStack background="bgAlternate" gap={2} padding={2}>
          <Text as="p" display="block" font="headline">
            Custom background
          </Text>
          <TabNavigation background="bgAlternate" onChange={setValue} tabs={tabsWithDot} value={value} />
        </VStack>
      </ThemeProvider>
    </>;
}`,...T.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`() => {
  const [currentTab, setCurrentTab] = useState<TabProps['id']>();
  return <>
      <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
        <VStack background="bg" gap={2} padding={2}>
          <TabNavigation onChange={setCurrentTab} tabs={tabs} value={currentTab} variant="secondary" />
        </VStack>
      </ThemeProvider>
      <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
        <VStack background="bg" gap={2} padding={2}>
          <TabNavigation onChange={setCurrentTab} tabs={tabs} value={currentTab} variant="secondary" />
        </VStack>
      </ThemeProvider>
    </>;
}`,...v.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => {
  const [currentTab, setCurrentTab] = useState<TabProps['id']>(tabs[0].id);
  return <VStack gap={2}>
      <TabNavigation accessibilityLabel="Really nice tab navigation" onChange={setCurrentTab} tabs={tabs.slice(0, 3)} value={currentTab} />
      <MockTabPanel id={tabs[0].id} isActive={currentTab === tabs[0].id}>
        <Text as="h2" display="block" font="title1" paddingBottom={2}>
          This is tab one
        </Text>
        <Text as="p" display="block" font="body">
          <Link href="/">This is the body</Link> of tab one. You are going to love it
        </Text>
        <Text as="p" display="block" font="body">
          {loremIpsum}
        </Text>
      </MockTabPanel>
      <MockTabPanel id={tabs[1].id} isActive={currentTab === tabs[1].id}>
        <Text as="h2" display="block" font="title1" paddingBottom={2}>
          Here we have tab two
        </Text>
        <Text as="p" display="block" font="body">
          And look, <Link href="/">this another link</Link> in the body of tab one. You are going to
          love it
        </Text>
        <Text as="p" display="block" font="body">
          {loremIpsum} {loremIpsum}
        </Text>
      </MockTabPanel>
      <MockTabPanel id={tabs[2].id} isActive={currentTab === tabs[2].id}>
        <Text as="h2" display="block" font="title1" paddingBottom={2}>
          Heyooo, tab three!
        </Text>
        <Text as="p" display="block" font="body">
          Again, we can put a link like <Link href="/">this another link</Link> in the body of tab
          one. You are going to love it
        </Text>
        <Text as="p" display="block" font="body">
          {loremIpsum} {loremIpsum}
        </Text>
      </MockTabPanel>
    </VStack>;
}`,...S.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`() => {
  const [currentTab, setCurrentTab] = useState<TabProps['id']>();
  return <VStack background="bg" gap={2} padding={2}>
      <TabNavigation onChange={setCurrentTab} tabs={tabs.map((tab, index) => ({
      ...tab,
      disabled: index === 1
    }))} value={currentTab} variant="secondary" />
    </VStack>;
}`,...k.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => {
  const [currentTab, setCurrentTab] = useState<TabProps['id']>(tabs[0].id);
  return <TabNavigation onChange={setCurrentTab} paddingX={3} paddingY={1} tabs={tabs.slice(0, 3)} value={currentTab} />;
}`,...y.parameters?.docs?.source}}};const na=["Default","CustomTab","WithPaddles","WithCustomPaddles","WithEnum","WithDotCountChange","Secondary","AccessibilityTest","Disabled","WithPadding"];export{S as AccessibilityTest,u as CustomTab,b as Default,k as Disabled,v as Secondary,h as WithCustomPaddles,T as WithDotCountChange,g as WithEnum,y as WithPadding,m as WithPaddles,na as __namedExportsOrder,ra as default};
