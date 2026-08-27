import{r as n,j as e,a5 as c,a6 as p}from"./iframe-CsG_6vZR.js";import{l as f}from"./loremIpsum-CjdvNg3u.js";import{s as P}from"./tabs-mxIlbzm-.js";import{s as W}from"./sample-DltUb9F7.js";import{B as I}from"./Button-D2WSek5T.js";import{C as B}from"./Chip-BJKnv_em.js";import{S as L}from"./Select-Kj5l-g9b.js";import{S as M}from"./SelectOption-BBBPgn8s.js";import{H as w}from"./HStack-DaDYipoP.js";import{V as i}from"./VStack-Cg_Yq2u4.js";import{L as N}from"./Link-GlbzwVdV.js";import{T as s}from"./Text-B1CpMNU3.js";import{T as r}from"./TabNavigation-B2JxRaWc.js";import"./preload-helper-D9Z9MdNV.js";import"./_baseRandom-CPH1PYT7.js";import"./_arrayMap-BkD9PEmT.js";import"./keys-BqKPzSSL.js";import"./Pressable-DDN99tmF.js";import"./isArray-M0ytM-vC.js";import"./Interactable--rqISG90.js";import"./color-Ceo1QMNe.js";import"./useTheme-CmrOhAty.js";import"./_isIndex-CqeJT8IS.js";import"./Icon-DTs0crZh.js";import"./Spinner-C8x8bhOH.js";import"./tokens-BwScSksM.js";import"./useMergeRefs-DR4sGa7m.js";import"./InputStack-BFRjE954.js";import"./ColorSurge-2yE2z4Kr.js";import"./useMotionProps-BXBckQBf.js";import"./utils-y2S18Lx0.js";import"./use-animation-DHwoMYVB.js";import"./motion-minimal-5s2ikV7b.js";import"./InputLabel-CdlU6JsR.js";import"./Dropdown-DlJsEaMG.js";import"./index-CKRF3JMY.js";import"./useBreakpoints-DD5uuIEx.js";import"./FocusTrap-C5pHOjrH.js";import"./debounce-fynzmAtJ.js";import"./ModalWrapper-D8IaYCfm.js";import"./NewAnimatePresence-P1FndR1q.js";import"./index-CpZJTW5x.js";import"./use-unmount-effect-DmgCrakR.js";import"./useScrollBlocker-CjG6q-zd.js";import"./Overlay-DkQgdcBj.js";import"./OverlayContentContext-CpXWuzdo.js";import"./Portal-BaLq4aAx.js";import"./Popover-BqkIPLOm.js";import"./dropdown-CDhCThJm.js";import"./context-fDezSldV.js";import"./usePrefixedId-BL1THI0P.js";import"./AnimatedCaret-BYj5sDun.js";import"./collapsible-BAneA-61.js";import"./index-BqvvFL-B.js";import"./eventHandlers-CyvGcX2M.js";import"./HelperText-W0U74shX.js";import"./useRefocusTrigger-sY3gfxp6.js";import"./select-Em8pkxbY.js";import"./Cell-Z4wq8KY-.js";import"./useCellSpacing-BeT6oDTo.js";import"./sizing-Do56D2dQ.js";import"./CellAccessory-iu0jUwZW.js";import"./isRtl-C5Fon8jH.js";import"./useDimensions-BCh0uzfM.js";import"./Paddle-O8Xpk38b.js";import"./IconButton-DNJ86Kiu.js";import"./TabIndicator-CK1GC29Q.js";import"./usePreviousValues-BaYVE0C4.js";import"./TabLabel-BKxoYLG3.js";import"./usePreviousValue-DYxrfH1e.js";import"./DotCount-CM211aWp.js";import"./dotStyles-Ccp1dKIN.js";import"./Collapsible-DcP86DlO.js";const V=({id:a,isActive:t,children:l})=>{const x=n.useMemo(()=>t?void 0:"none",[t]);return e.jsx(i,{bordered:!0,accessibilityLabelledBy:`tab--${a}`,background:"bgPrimaryWash",borderRadius:200,display:x,gap:1,id:`tabpanel--${a}`,padding:2,role:"tabpanel",children:l})};V.__docgenInfo={description:"",methods:[],displayName:"MockTabPanel",props:{id:{required:!0,tsType:{name:"string"},description:""},isActive:{required:!0,tsType:{name:"boolean"},description:""}}};const d={config:{rules:[{id:"aria-valid-attr-value",enabled:!1},{id:"duplicate-id-active",enabled:!1},{id:"duplicate-id",enabled:!1}]}},o=P.slice(0,5),ra={title:"Components/Tabs/TabNavigation",component:r},b=()=>{const[a,t]=n.useState(o[0].id);return e.jsxs(e.Fragment,{children:[e.jsxs(c,{activeColorScheme:"light",theme:p,children:[e.jsxs(i,{background:"bg",gap:2,padding:2,children:[e.jsx(s,{as:"p",display:"block",font:"headline",children:"Default (Normal)"}),e.jsx(r,{onChange:t,tabs:o,value:a})]}),e.jsxs(i,{background:"bgAlternate",gap:2,padding:2,children:[e.jsx(s,{as:"p",display:"block",font:"headline",children:"Custom background"}),e.jsx(r,{background:"bgAlternate",onChange:t,tabs:o,value:a})]})]}),e.jsx(c,{activeColorScheme:"dark",theme:p,children:e.jsxs(i,{background:"bg",gap:2,padding:2,children:[e.jsx(s,{as:"p",display:"block",font:"headline",children:"Dark"}),e.jsx(r,{onChange:t,tabs:o,value:a})]})})]})};b.parameters={percy:{enableJavaScript:!0},a11y:d};const _=({label:a,...t})=>e.jsx(w,{bordered:!0,background:"bg",borderRadius:100,paddingX:2,paddingY:1,...t,children:e.jsx(s,{as:"p",display:"block",font:"headline",children:a})}),J=({label:a,...t})=>e.jsx(B,{...t,children:a}),A=[...o.slice(0,3),{id:"custom_tab",label:"Custom",testID:"custom_tab",Component:_}],u=()=>{const[a,t]=n.useState(o[0].id);return e.jsxs(i,{gap:2,children:[e.jsx(s,{as:"p",display:"block",font:"headline",children:"Custom tab"}),e.jsx(r,{Component:_,gap:1,onChange:t,tabs:o,value:a}),e.jsx(s,{as:"p",display:"block",font:"headline",children:"Custom tab with paddles"}),e.jsx(r,{Component:_,gap:1,onChange:t,tabs:P,value:a}),e.jsx(s,{as:"p",display:"block",font:"headline",children:"Only one custom tab"}),e.jsx(r,{gap:1,onChange:t,tabs:A,value:a}),e.jsx(s,{as:"p",display:"block",font:"headline",children:"All the custom things"}),e.jsx(r,{Component:J,gap:1,onChange:t,tabs:A,value:a})]})};u.parameters={percy:{enableJavaScript:!0},a11y:d};const m=()=>{const[a,t]=n.useState(o[0].id);return e.jsx(r,{onChange:t,tabs:P,value:a})};m.parameters={percy:{enableJavaScript:!0},a11y:d};const h=()=>{const[a,t]=n.useState(o[0].id);return e.jsx(r,{onChange:t,paddleStyle:{transform:"scale(0.5)"},tabs:P,value:a})};h.parameters={percy:{enableJavaScript:!0},a11y:d};const Y=[{id:"buy",label:"Buy"},{id:"sell",label:"Sell"},{id:"convert",label:"Convert"},{id:"send",label:"Send"},{id:"receive",label:"Receive"}],g=()=>{const[a,t]=n.useState("buy");return e.jsx(c,{activeColorScheme:"light",theme:p,children:e.jsxs(i,{background:"bg",gap:2,padding:2,children:[e.jsx(s,{as:"p",display:"block",font:"headline",children:"With Enum"}),e.jsx(r,{onChange:t,tabs:Y,value:a})]})})};g.parameters={percy:{enableJavaScript:!0},a11y:d};const T=()=>{const[a,t]=n.useState(o[0].id),[l,x]=n.useState(0),j=n.useMemo(()=>o.map(C=>({...C,count:l})),[l]),D=n.useCallback(()=>{x(Number(l?0:W([2,14,100])))},[l]);return e.jsxs(e.Fragment,{children:[e.jsx(c,{activeColorScheme:"light",theme:p,children:e.jsxs(i,{background:"bg",gap:2,padding:2,children:[e.jsx(L,{label:"Select a tab",onChange:t,value:a,children:j.map(C=>e.jsx(M,{title:C.label,value:C.id},C.id))}),e.jsx(I,{onClick:D,children:"Randomize dot count"}),e.jsx(s,{as:"p",display:"block",font:"headline",children:"Default (Normal)"}),e.jsx(r,{onChange:t,tabs:j,value:a})]})}),e.jsx(c,{activeColorScheme:"dark",theme:p,children:e.jsxs(i,{background:"bg",gap:2,padding:2,children:[e.jsx(s,{as:"p",display:"block",font:"headline",children:"Dark"}),e.jsx(r,{onChange:t,tabs:j,value:a})]})}),e.jsx(c,{activeColorScheme:"light",theme:p,children:e.jsxs(i,{background:"bgAlternate",gap:2,padding:2,children:[e.jsx(s,{as:"p",display:"block",font:"headline",children:"Custom background"}),e.jsx(r,{background:"bgAlternate",onChange:t,tabs:j,value:a})]})})]})};T.parameters={percy:{enableJavaScript:!0},a11y:d};const v=()=>{const[a,t]=n.useState();return e.jsxs(e.Fragment,{children:[e.jsx(c,{activeColorScheme:"light",theme:p,children:e.jsx(i,{background:"bg",gap:2,padding:2,children:e.jsx(r,{onChange:t,tabs:o,value:a,variant:"secondary"})})}),e.jsx(c,{activeColorScheme:"dark",theme:p,children:e.jsx(i,{background:"bg",gap:2,padding:2,children:e.jsx(r,{onChange:t,tabs:o,value:a,variant:"secondary"})})})]})};v.parameters={percy:{enableJavaScript:!0},a11y:d};const S=()=>{const[a,t]=n.useState(o[0].id);return e.jsxs(i,{gap:2,children:[e.jsx(r,{accessibilityLabel:"Really nice tab navigation",onChange:t,tabs:o.slice(0,3),value:a}),e.jsxs(V,{id:o[0].id,isActive:a===o[0].id,children:[e.jsx(s,{as:"h2",display:"block",font:"title1",paddingBottom:2,children:"This is tab one"}),e.jsxs(s,{as:"p",display:"block",font:"body",children:[e.jsx(N,{href:"/",children:"This is the body"})," of tab one. You are going to love it"]}),e.jsx(s,{as:"p",display:"block",font:"body",children:f})]}),e.jsxs(V,{id:o[1].id,isActive:a===o[1].id,children:[e.jsx(s,{as:"h2",display:"block",font:"title1",paddingBottom:2,children:"Here we have tab two"}),e.jsxs(s,{as:"p",display:"block",font:"body",children:["And look, ",e.jsx(N,{href:"/",children:"this another link"})," in the body of tab one. You are going to love it"]}),e.jsxs(s,{as:"p",display:"block",font:"body",children:[f," ",f]})]}),e.jsxs(V,{id:o[2].id,isActive:a===o[2].id,children:[e.jsx(s,{as:"h2",display:"block",font:"title1",paddingBottom:2,children:"Heyooo, tab three!"}),e.jsxs(s,{as:"p",display:"block",font:"body",children:["Again, we can put a link like ",e.jsx(N,{href:"/",children:"this another link"})," in the body of tab one. You are going to love it"]}),e.jsxs(s,{as:"p",display:"block",font:"body",children:[f," ",f]})]})]})},k=()=>{const[a,t]=n.useState();return e.jsx(i,{background:"bg",gap:2,padding:2,children:e.jsx(r,{onChange:t,tabs:o.map((l,x)=>({...l,disabled:x===1})),value:a,variant:"secondary"})})};k.parameters={percy:{enableJavaScript:!0},a11y:d};const y=()=>{const[a,t]=n.useState(o[0].id);return e.jsx(r,{onChange:t,paddingX:3,paddingY:1,tabs:o.slice(0,3),value:a})};y.parameters={percy:{enableJavaScript:!0},a11y:d};b.__docgenInfo={description:"",methods:[],displayName:"Default"};u.__docgenInfo={description:"",methods:[],displayName:"CustomTab"};m.__docgenInfo={description:"",methods:[],displayName:"WithPaddles"};h.__docgenInfo={description:"",methods:[],displayName:"WithCustomPaddles"};g.__docgenInfo={description:"",methods:[],displayName:"WithEnum"};T.__docgenInfo={description:"",methods:[],displayName:"WithDotCountChange"};v.__docgenInfo={description:"",methods:[],displayName:"Secondary"};S.__docgenInfo={description:"",methods:[],displayName:"AccessibilityTest"};k.__docgenInfo={description:"",methods:[],displayName:"Disabled"};y.__docgenInfo={description:"",methods:[],displayName:"WithPadding"};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`() => {
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
