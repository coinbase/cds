import{r as d,j as e,z as ee,c as V}from"./iframe-BXWLBCkp.js";import{u as ae}from"./useBreakpoints-BiiruerU.js";import{T as i}from"./Text-Ch_dBU4v.js";import{u as te}from"./usePreviousValue-Cm2wE0Iw.js";import{C as ie}from"./Collapsible-DRMWW50B.js";import{V as n}from"./VStack-CnEfMFeL.js";import{H as o}from"./HStack-B6p8qBpp.js";import{N as c}from"./NavigationTitle-CRto6k3D.js";import{N as ne}from"./NavigationTitleSelect-Bbe8GEdW.js";import{S as q}from"./SearchInput-CfVqG-ke.js";import{I as a}from"./IconButton-OIX0AFCz.js";import{T as P}from"./TabNavigation-nLuwWOga.js";import{L as se}from"./LogoMark-C448m09K.js";import{A as W}from"./AvatarButton-D3x-0t9y.js";import{B as M}from"./Button-W9Shg4T1.js";import{A as w}from"./Avatar-BEPDWfa1.js";import"./preload-helper-D9Z9MdNV.js";import"./collapsible-BAneA-61.js";import"./tokens-BwScSksM.js";import"./useMotionProps-CS-LE6l8.js";import"./utils-CwomCnHN.js";import"./motion-minimal-SVRWJYUW.js";import"./SelectOption-Bnv43xgZ.js";import"./select-Em8pkxbY.js";import"./Cell-CB_dChqK.js";import"./useCellSpacing-BuZVtSR4.js";import"./sizing-Do56D2dQ.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./useTheme-BJazYlse.js";import"./CellAccessory-BypMgxs5.js";import"./Icon-CgDQ3NQp.js";import"./isRtl-Du0XdnX5.js";import"./Dropdown-BSPZ_a8b.js";import"./index-7N_x-QzT.js";import"./FocusTrap-90tMQkIg.js";import"./useMergeRefs-DR4sGa7m.js";import"./debounce-fynzmAtJ.js";import"./ModalWrapper-D-DvdkD-.js";import"./NewAnimatePresence-BbA2hDPb.js";import"./index-B2twlf45.js";import"./use-unmount-effect-5QIafHMH.js";import"./useScrollBlocker-4Da9qMHo.js";import"./Overlay-XiDupmt3.js";import"./OverlayContentContext-hT53AGt-.js";import"./Portal-tAONErW2.js";import"./Popover-CipwoaXC.js";import"./dropdown-CDhCThJm.js";import"./useA11yControlledVisibility-DSMmCA_M.js";import"./usePrefixedId-Dfl-0DGQ.js";import"./InputIcon-hfAGuXGm.js";import"./context-Cc0ZOVig.js";import"./InputIconButton-BGgDza3y.js";import"./TextInput-CXMiH86I.js";import"./HelperText-C1uG41Fa.js";import"./InputLabel-C3lBKQeI.js";import"./InputStack-DO5lXlgp.js";import"./ColorSurge-D5iBCkQQ.js";import"./use-animation-CYeuSrS_.js";import"./NativeInput-CDtkEvxu.js";import"./Spinner-BAI0lrZ-.js";import"./useDimensions-CSIQgsxn.js";import"./Paddle-KLwlcGm-.js";import"./TabIndicator-EwmhyRSA.js";import"./usePreviousValues-rLMWE3mU.js";import"./TabLabel-C51G3c2G.js";import"./DotCount-Jrldj36O.js";import"./dotStyles-Ccp1dKIN.js";import"./interactableHeight-DPdDzpO8.js";import"./RemoteImage-Lksm6NI7.js";const L={root:"cds-NavigationBar",start:"cds-NavigationBar-start",content:"cds-NavigationBar-content"},s=d.memo(({start:t,children:r,end:l,bottom:g,accessibilityLabel:p="main navigation",background:v="bg",paddingX:m=2,paddingTop:D=2,paddingBottom:G=g?void 0:2,position:z="sticky",top:O=0,left:E=0,right:F=0,width:U="100%",dangerouslyDisableOverflowHidden:X,columnGap:_,rowGap:$=1,className:Q,classNames:C,style:J,styles:A,testID:K,...Y})=>{const H=te(t),Z=d.useMemo(()=>t||H,[t,H]);return e.jsxs(n,{borderedBottom:!0,accessibilityLabel:p,as:"nav",background:v,className:V(L.root,Q,C?.root),gap:$,left:E,paddingBottom:G,paddingTop:D,paddingX:m,position:z,right:F,style:{...J,...A?.root},testID:K,top:O,width:U,zIndex:ee.navigation,...Y,children:[e.jsxs(o,{alignItems:"center",gap:_??{base:2,phone:1},overflow:"auto",children:[e.jsx(ie,{collapsed:!t,dangerouslyDisableOverflowHidden:X,direction:"horizontal",children:e.jsx(o,{alignItems:"center",className:V(L.start,C?.start),paddingEnd:_??{base:2,phone:1},style:A?.start,children:Z})}),e.jsx(o,{alignItems:"center",className:V(L.content,C?.content),flexGrow:1,gap:1,style:A?.content,children:r}),l]}),g]})});s.displayName="NavigationBar";s.__docgenInfo={description:"",methods:[],displayName:"NavigationBar",props:{testID:{required:!1,tsType:{name:"string"},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""},font:{required:!1,tsType:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"fontFamily"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"fontFamily",required:!1}},{key:"phone",value:{name:"fontFamily",required:!1}},{key:"tablet",value:{name:"fontFamily",required:!1}},{key:"desktop",value:{name:"fontFamily",required:!1}}]}}]},description:""},pin:{required:!1,tsType:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}]},description:"Direction in which to absolutely pin the box."},bordered:{required:!1,tsType:{name:"boolean"},description:"Add a border around all sides of the box."},borderedTop:{required:!1,tsType:{name:"boolean"},description:"Add a border to the top side of the box."},borderedBottom:{required:!1,tsType:{name:"boolean"},description:"Add a border to the bottom side of the box."},borderedStart:{required:!1,tsType:{name:"boolean"},description:"Add a border to the leading side of the box."},borderedEnd:{required:!1,tsType:{name:"boolean"},description:"Add a border to the trailing side of the box."},borderedHorizontal:{required:!1,tsType:{name:"boolean"},description:"Add a border to the leading and trailing sides of the box."},borderedVertical:{required:!1,tsType:{name:"boolean"},description:"Add a border to the top and bottom sides of the box."},dangerouslySetBackground:{required:!1,tsType:{name:"string"},description:"@danger This is a migration escape hatch. It is not intended to be used normally."},start:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Node (ie Back button) to display at the start of the nav bar"},end:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Node (icons, avatar, etc) to display at the end of the nav bar"},bottom:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"The  bottom content. Use to render tabs"},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"The middle content. Use the children to render the page title"},accessibilityLabel:{required:!1,tsType:{name:"string"},description:`Accessibility label for the nav bar
@default 'main navigation'`,defaultValue:{value:"'main navigation'",computed:!1}},paddingX:{required:!1,tsType:{name:"ThemeVars.Space"},description:"@default 2",defaultValue:{value:"2",computed:!1}},paddingTop:{required:!1,tsType:{name:"ThemeVars.Space"},description:"@default 2",defaultValue:{value:"2",computed:!1}},paddingBottom:{required:!1,tsType:{name:"ThemeVars.Space"},description:"@default 2 if bottom is not provided",defaultValue:{value:"bottom ? undefined : 2",computed:!1}},rowGap:{required:!1,tsType:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"unknown"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"unknown",required:!1}},{key:"phone",value:{name:"unknown",required:!1}},{key:"tablet",value:{name:"unknown",required:!1}},{key:"desktop",value:{name:"unknown",required:!1}}]}}]},description:`Space between bottom of the nav bar and the rest of its content
@default 2`,defaultValue:{value:"1",computed:!1}},columnGap:{required:!1,tsType:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"unknown"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"unknown",required:!1}},{key:"phone",value:{name:"unknown",required:!1}},{key:"tablet",value:{name:"unknown",required:!1}},{key:"desktop",value:{name:"unknown",required:!1}}]}}]},description:`Space between the start, children, and end of the nav bar
@default 2`},dangerouslyDisableOverflowHidden:{required:!1,tsType:{name:"boolean"},description:"Disable the `overflow: hidden` style from being injected to the child Col"},classNames:{required:!1,tsType:{name:"signature",type:"object",raw:"{ [key in keyof ComponentClassNamesMap]?: string }",signature:{properties:[{key:{name:"ComponentClassNamesMap",required:!1},value:{name:"string"}}]}},description:""},styles:{required:!1,tsType:{name:"signature",type:"object",raw:"{ [key in keyof ComponentClassNamesMap]?: React.CSSProperties }",signature:{properties:[{key:{name:"ComponentClassNamesMap",required:!1},value:{name:"ReactCSSProperties",raw:"React.CSSProperties"}}]}},description:""},background:{defaultValue:{value:"'bg'",computed:!1},required:!1},position:{defaultValue:{value:"'sticky'",computed:!1},required:!1},top:{defaultValue:{value:"0",computed:!1},required:!1},left:{defaultValue:{value:"0",computed:!1},required:!1},right:{defaultValue:{value:"0",computed:!1},required:!1},width:{defaultValue:{value:"'100%'",computed:!1},required:!1}}};const Ta={component:s,title:"Components/Navigation/NavigationBar"},R={config:{rules:[{id:"aria-valid-attr-value",enabled:!1}]}},oe=t=>console.log(`Pressed ${t}`),f=[{id:"all",label:"All"},{id:"watchlist",label:"Watchlist"},{id:"tradable",label:"Tradable"},{id:"gainers",label:"Gainers"},{id:"losers",label:"Losers"},{id:"trending",label:"Trending"},{id:"schill",label:"Schill"}],u=()=>{const[t,r]=d.useState(f[0].id),l=d.useMemo(()=>t!==f[0].id,[t]),g=f.find(m=>m.id===t)?.label,p=d.useCallback(()=>{r(f[0].id)},[]),v=d.useCallback(m=>{r(m)},[]);return e.jsxs(n,{alignItems:"flex-start",gap:1,children:[e.jsx(i,{as:"h1",display:"block",font:"title1",children:"Navigation full example"}),e.jsx(s,{bottom:e.jsx(P,{onChange:v,tabs:f,value:t}),end:e.jsxs(o,{alignItems:"center",gap:1,children:[e.jsx(a,{name:"helpCenterQuestionMark"}),e.jsx(a,{active:!0,accessibilityLabel:"Notifications",name:"bell",onClick:()=>oe("Notifications")}),e.jsx(a,{name:"appSwitcher"}),e.jsx(a,{active:!0,name:"profile"})]}),start:l?e.jsx(a,{compact:!0,accessibilityLabel:"Back",name:"backArrow",onClick:p,variant:"secondary"}):void 0,children:e.jsxs(c,{children:["Personal Portfolio (",g??"All",")"]})})]})};u.parameters={a11y:R};const x=()=>e.jsxs(n,{alignItems:"flex-start",children:[e.jsx(i,{as:"h1",display:"block",font:"title1",children:"Mobile NavigationBar"}),e.jsx(s,{end:e.jsxs(o,{alignItems:"center",gap:1,children:[e.jsx(a,{compact:!0,name:"search",variant:"secondary"}),e.jsx(a,{compact:!0,name:"appSwitcher",variant:"secondary"}),e.jsx(W,{compact:!0,alt:"User",name:"Sam Smith"})]}),start:e.jsx(a,{compact:!0,transparent:!0,name:"hamburger"}),children:e.jsx(se,{size:32})})]}),y=()=>e.jsxs(n,{alignItems:"flex-start",children:[e.jsx(i,{as:"h1",display:"block",font:"title1",children:"NavigationBar with search and actions"}),e.jsx(s,{end:e.jsxs(o,{gap:2,children:[e.jsx(o,{flexBasis:0,flexShrink:1,children:e.jsx(q,{compact:!0,onChangeText:()=>{},onSearch:()=>{},placeholder:"Search",value:""})}),e.jsxs(o,{gap:1,children:[e.jsx(M,{compact:!0,children:"Action 1"}),e.jsx(M,{compact:!0,variant:"secondary",children:"Action 2"})]}),e.jsxs(o,{gap:1,children:[e.jsx(a,{active:!0,compact:!0,name:"search",variant:"secondary"}),e.jsx(a,{active:!0,compact:!0,name:"appSwitcher",variant:"secondary"}),e.jsx(W,{compact:!0,alt:"User",name:"Sam Smith"})]})]}),start:e.jsx(a,{compact:!0,name:"backArrow",variant:"secondary"}),children:e.jsx(c,{children:"Page Title"})})]}),k=()=>{const[t,r]=d.useState("dashboard"),l=[{label:"Dashboard",id:"dashboard"},{label:"Analytics",id:"analytics"},{label:"Portfolio",id:"portfolio"},{label:"Transactions",id:"transactions"},{label:"Settings",id:"settings"}];return e.jsxs(n,{alignItems:"flex-start",children:[e.jsx(i,{as:"h1",display:"block",font:"title1",children:"NavigationBar with selectable title"}),e.jsx(s,{end:e.jsxs(o,{alignItems:"center",gap:1,children:[e.jsx(a,{active:!0,accessibilityLabel:"Notifications",name:"bell"}),e.jsx(W,{compact:!0,alt:"User"})]}),children:e.jsx(ne,{accessibilityLabel:"Select page",onChange:r,options:l,value:t})})]})},B=()=>{const t=d.useCallback(r=>{console.log(`Action pressed: ${r}`)},[]);return e.jsxs(n,{alignItems:"flex-start",children:[e.jsx(i,{as:"h1",display:"block",font:"title1",children:"NavigationBar with action buttons"}),e.jsx(s,{end:e.jsxs(o,{alignItems:"center",gap:1,children:[e.jsx(a,{active:!0,accessibilityLabel:"Search",name:"magnifyingGlass",onClick:()=>t("search")}),e.jsx(a,{active:!0,accessibilityLabel:"Filter",name:"filter",onClick:()=>t("filter")}),e.jsx(a,{active:!0,accessibilityLabel:"More options",name:"more",onClick:()=>t("more")})]}),children:e.jsx(c,{children:"Asset Portfolio"})})]})},S=()=>e.jsxs(n,{alignItems:"flex-start",children:[e.jsx(i,{as:"h1",display:"block",font:"title1",children:"NavigationBar with custom padding"}),e.jsx(s,{paddingBottom:4,paddingTop:4,paddingX:6,children:e.jsx(c,{children:"Extended Padding Example"})})]}),N=()=>e.jsxs(n,{alignItems:"flex-start",children:[e.jsx(i,{as:"h1",display:"block",font:"title1",children:"Basic NavigationBar"}),e.jsx(s,{end:e.jsxs(o,{alignItems:"center",gap:1,children:[e.jsx(a,{accessibilityLabel:"Notifications",name:"bell"}),e.jsx(w,{size:"xl"})]}),start:e.jsx(a,{accessibilityLabel:"Back",name:"backArrow"}),children:e.jsx(c,{children:"Dashboard"})})]}),b=()=>{const t=[{id:"all",label:"All"},{id:"watchlist",label:"Watchlist"},{id:"tradable",label:"Tradable"},{id:"gainers",label:"Gainers"}],[r,l]=d.useState(t[0].id);return e.jsxs(n,{alignItems:"flex-start",children:[e.jsx(i,{as:"h1",display:"block",font:"title1",children:"NavigationBar with Tab Navigation"}),e.jsx(s,{bottom:e.jsx(P,{onChange:l,tabs:t,value:r}),end:e.jsxs(o,{alignItems:"center",gap:1,children:[e.jsx(a,{accessibilityLabel:"Notifications",name:"bell"}),e.jsx(w,{size:"xl"})]}),children:e.jsx(c,{children:"Portfolio"})})]})};b.parameters={a11y:R};const T=()=>e.jsxs(n,{alignItems:"flex-start",gap:4,children:[e.jsx(i,{as:"h1",display:"block",font:"title1",children:"NavigationBar with custom backgrounds"}),e.jsxs(n,{gap:2,width:"100%",children:[e.jsx(i,{font:"body",children:"Default background (bg)"}),e.jsx(s,{end:e.jsx(a,{accessibilityLabel:"Settings",name:"settings"}),start:e.jsx(a,{accessibilityLabel:"Back",name:"backArrow"}),children:e.jsx(c,{children:"Default Background"})})]}),e.jsxs(n,{gap:2,width:"100%",children:[e.jsx(i,{font:"body",children:"Secondary background (bgSecondary)"}),e.jsx(s,{background:"bgSecondary",end:e.jsx(a,{accessibilityLabel:"Settings",name:"settings"}),start:e.jsx(a,{accessibilityLabel:"Back",name:"backArrow"}),children:e.jsx(c,{children:"Secondary Background"})})]}),e.jsxs(n,{gap:2,width:"100%",children:[e.jsx(i,{font:"body",children:"Tertiary background (bgTertiary)"}),e.jsx(s,{background:"bgTertiary",end:e.jsx(a,{accessibilityLabel:"Settings",name:"settings"}),start:e.jsx(a,{accessibilityLabel:"Back",name:"backArrow"}),children:e.jsx(c,{children:"Tertiary Background"})})]})]}),j=()=>{const[t,r]=d.useState(""),[l,g]=d.useState(!1),{isPhone:p}=ae(),v=d.useCallback(()=>{g(m=>!m),l&&r("")},[l]);return e.jsxs(n,{alignItems:"flex-start",children:[e.jsx(i,{as:"h1",display:"block",font:"title1",children:"Responsive NavigationBar"}),e.jsx(i,{as:"p",display:"block",font:"body",children:"Resize the window to see the search input collapse to an icon button on smaller screens."}),e.jsxs(s,{background:"bgSecondary",end:e.jsxs(o,{alignItems:"center",gap:1,children:[p&&e.jsx(a,{accessibilityLabel:"Search",active:l,name:"search",onClick:v}),e.jsx(a,{accessibilityLabel:"Notifications",name:"bell"}),e.jsx(w,{size:"xl"})]}),start:e.jsx(a,{accessibilityLabel:"Back",name:"backArrow"}),children:[p?l&&e.jsx(q,{compact:!0,accessibilityLabel:"Search",onChangeText:r,placeholder:"Search...",value:t}):e.jsx(q,{compact:!0,accessibilityLabel:"Search",onChangeText:r,placeholder:"Search assets...",value:t}),!p&&!l&&e.jsx(c,{children:"Trading"})]})]})},h=()=>e.jsxs(n,{alignItems:"flex-start",gap:4,children:[e.jsx(i,{as:"h1",display:"block",font:"title1",children:"NavigationBar with custom gap"}),e.jsxs(n,{gap:2,width:"100%",children:[e.jsx(i,{font:"body",children:"Custom column gap (4)"}),e.jsx(s,{columnGap:4,end:e.jsx(a,{accessibilityLabel:"Settings",name:"settings"}),start:e.jsx(a,{accessibilityLabel:"Back",name:"backArrow"}),children:e.jsx(c,{children:"Wide Column Gap"})})]}),e.jsxs(n,{gap:2,width:"100%",children:[e.jsx(i,{font:"body",children:"Custom row gap with tabs (4)"}),e.jsx(s,{bottom:e.jsx(P,{onChange:()=>{},tabs:[{id:"tab1",label:"Tab 1"},{id:"tab2",label:"Tab 2"}],value:"tab1"}),end:e.jsx(a,{accessibilityLabel:"Settings",name:"settings"}),rowGap:4,children:e.jsx(c,{children:"Wide Row Gap"})})]})]});h.parameters={a11y:R};const I=()=>e.jsxs(n,{alignItems:"flex-start",gap:4,children:[e.jsx(i,{as:"h1",display:"block",font:"title1",children:"NavigationBar with custom styles and classNames"}),e.jsx(s,{end:e.jsxs(o,{alignItems:"center",gap:1,children:[e.jsx(a,{accessibilityLabel:"Notifications",name:"bell"}),e.jsx(w,{size:"xl"})]}),start:e.jsx(a,{accessibilityLabel:"Back",name:"backArrow"}),styles:{root:{borderBottomWidth:2},content:{justifyContent:"center"}},children:e.jsx(c,{children:"Centered Title"})})]});u.__docgenInfo={description:"",methods:[],displayName:"NavigationBarFullExampleDefault"};x.__docgenInfo={description:"",methods:[],displayName:"NavigationBarMobileExample"};y.__docgenInfo={description:"",methods:[],displayName:"NavigationBarWithSearch"};k.__docgenInfo={description:"",methods:[],displayName:"NavigationBarWithSelectableTitle"};B.__docgenInfo={description:"",methods:[],displayName:"NavigationBarWithActions"};S.__docgenInfo={description:"",methods:[],displayName:"NavigationBarWithCustomPadding"};N.__docgenInfo={description:"",methods:[],displayName:"NavigationBarBasic"};b.__docgenInfo={description:"",methods:[],displayName:"NavigationBarWithTabs"};T.__docgenInfo={description:"",methods:[],displayName:"NavigationBarWithCustomBackground"};j.__docgenInfo={description:"",methods:[],displayName:"NavigationBarResponsive"};h.__docgenInfo={description:"",methods:[],displayName:"NavigationBarWithCustomGap"};I.__docgenInfo={description:"",methods:[],displayName:"NavigationBarWithCustomStyles"};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`() => {
  const [value, setValue] = useState(tabs[0].id);
  const showBackButton = useMemo(() => value !== tabs[0].id, [value]);
  const pageTitle = tabs.find(tab => tab.id === value)?.label;
  const handleBackPress = useCallback(() => {
    setValue(tabs[0].id);
  }, []);
  const handleTabChange = useCallback((id: string) => {
    setValue(id);
  }, []);
  return <VStack alignItems="flex-start" gap={1}>
      <Text as="h1" display="block" font="title1">
        Navigation full example
      </Text>
      <NavigationBar bottom={<TabNavigation onChange={handleTabChange} tabs={tabs} value={value} />} end={<HStack alignItems="center" gap={1}>
            <IconButton name="helpCenterQuestionMark" />
            <IconButton active accessibilityLabel="Notifications" name="bell" onClick={() => handlePress('Notifications')} />
            <IconButton name="appSwitcher" />
            <IconButton active name="profile" />
          </HStack>} start={showBackButton ? <IconButton compact accessibilityLabel="Back" name="backArrow" onClick={handleBackPress} variant="secondary" /> : undefined}>
        <NavigationTitle>Personal Portfolio ({pageTitle ?? 'All'})</NavigationTitle>
      </NavigationBar>
    </VStack>;
}`,...u.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`() => {
  return <VStack alignItems="flex-start">
      <Text as="h1" display="block" font="title1">
        Mobile NavigationBar
      </Text>
      <NavigationBar end={<HStack alignItems="center" gap={1}>
            <IconButton compact name="search" variant="secondary" />
            <IconButton compact name="appSwitcher" variant="secondary" />
            <AvatarButton compact alt="User" name="Sam Smith" />
          </HStack>} start={<IconButton compact transparent name="hamburger" />}>
        <LogoMark size={32} />
      </NavigationBar>
    </VStack>;
}`,...x.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => {
  return <VStack alignItems="flex-start">
      <Text as="h1" display="block" font="title1">
        NavigationBar with search and actions
      </Text>
      <NavigationBar end={<HStack gap={2}>
            <HStack flexBasis={0} flexShrink={1}>
              <SearchInput compact onChangeText={() => {}} onSearch={() => {}} placeholder="Search" value="" />
            </HStack>
            <HStack gap={1}>
              <Button compact>Action 1</Button>
              <Button compact variant="secondary">
                Action 2
              </Button>
            </HStack>
            <HStack gap={1}>
              <IconButton active compact name="search" variant="secondary" />
              <IconButton active compact name="appSwitcher" variant="secondary" />
              <AvatarButton compact alt="User" name="Sam Smith" />
            </HStack>
          </HStack>} start={<IconButton compact name="backArrow" variant="secondary" />}>
        <NavigationTitle>Page Title</NavigationTitle>
      </NavigationBar>
    </VStack>;
}`,...y.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`() => {
  const [selectedPage, setSelectedPage] = useState('dashboard');
  const pageOptions = [{
    label: 'Dashboard',
    id: 'dashboard'
  }, {
    label: 'Analytics',
    id: 'analytics'
  }, {
    label: 'Portfolio',
    id: 'portfolio'
  }, {
    label: 'Transactions',
    id: 'transactions'
  }, {
    label: 'Settings',
    id: 'settings'
  }];
  return <VStack alignItems="flex-start">
      <Text as="h1" display="block" font="title1">
        NavigationBar with selectable title
      </Text>
      <NavigationBar end={<HStack alignItems="center" gap={1}>
            <IconButton active accessibilityLabel="Notifications" name="bell" />
            <AvatarButton compact alt="User" />
          </HStack>}>
        <NavigationTitleSelect accessibilityLabel="Select page" onChange={setSelectedPage} options={pageOptions} value={selectedPage} />
      </NavigationBar>
    </VStack>;
}`,...k.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`() => {
  const handleAction = useCallback((action: string) => {
    console.log(\`Action pressed: \${action}\`);
  }, []);
  return <VStack alignItems="flex-start">
      <Text as="h1" display="block" font="title1">
        NavigationBar with action buttons
      </Text>
      <NavigationBar end={<HStack alignItems="center" gap={1}>
            <IconButton active accessibilityLabel="Search" name="magnifyingGlass" onClick={() => handleAction('search')} />
            <IconButton active accessibilityLabel="Filter" name="filter" onClick={() => handleAction('filter')} />
            <IconButton active accessibilityLabel="More options" name="more" onClick={() => handleAction('more')} />
          </HStack>}>
        <NavigationTitle>Asset Portfolio</NavigationTitle>
      </NavigationBar>
    </VStack>;
}`,...B.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => {
  return <VStack alignItems="flex-start">
      <Text as="h1" display="block" font="title1">
        NavigationBar with custom padding
      </Text>
      <NavigationBar paddingBottom={4} paddingTop={4} paddingX={6}>
        <NavigationTitle>Extended Padding Example</NavigationTitle>
      </NavigationBar>
    </VStack>;
}`,...S.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`() => {
  return <VStack alignItems="flex-start">
      <Text as="h1" display="block" font="title1">
        Basic NavigationBar
      </Text>
      <NavigationBar end={<HStack alignItems="center" gap={1}>
            <IconButton accessibilityLabel="Notifications" name="bell" />
            <Avatar size="xl" />
          </HStack>} start={<IconButton accessibilityLabel="Back" name="backArrow" />}>
        <NavigationTitle>Dashboard</NavigationTitle>
      </NavigationBar>
    </VStack>;
}`,...N.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`() => {
  const tabItems = [{
    id: 'all',
    label: 'All'
  }, {
    id: 'watchlist',
    label: 'Watchlist'
  }, {
    id: 'tradable',
    label: 'Tradable'
  }, {
    id: 'gainers',
    label: 'Gainers'
  }];
  const [value, setValue] = useState(tabItems[0].id);
  return <VStack alignItems="flex-start">
      <Text as="h1" display="block" font="title1">
        NavigationBar with Tab Navigation
      </Text>
      <NavigationBar bottom={<TabNavigation onChange={setValue} tabs={tabItems} value={value} />} end={<HStack alignItems="center" gap={1}>
            <IconButton accessibilityLabel="Notifications" name="bell" />
            <Avatar size="xl" />
          </HStack>}>
        <NavigationTitle>Portfolio</NavigationTitle>
      </NavigationBar>
    </VStack>;
}`,...b.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`() => {
  return <VStack alignItems="flex-start" gap={4}>
      <Text as="h1" display="block" font="title1">
        NavigationBar with custom backgrounds
      </Text>
      <VStack gap={2} width="100%">
        <Text font="body">Default background (bg)</Text>
        <NavigationBar end={<IconButton accessibilityLabel="Settings" name="settings" />} start={<IconButton accessibilityLabel="Back" name="backArrow" />}>
          <NavigationTitle>Default Background</NavigationTitle>
        </NavigationBar>
      </VStack>
      <VStack gap={2} width="100%">
        <Text font="body">Secondary background (bgSecondary)</Text>
        <NavigationBar background="bgSecondary" end={<IconButton accessibilityLabel="Settings" name="settings" />} start={<IconButton accessibilityLabel="Back" name="backArrow" />}>
          <NavigationTitle>Secondary Background</NavigationTitle>
        </NavigationBar>
      </VStack>
      <VStack gap={2} width="100%">
        <Text font="body">Tertiary background (bgTertiary)</Text>
        <NavigationBar background="bgTertiary" end={<IconButton accessibilityLabel="Settings" name="settings" />} start={<IconButton accessibilityLabel="Back" name="backArrow" />}>
          <NavigationTitle>Tertiary Background</NavigationTitle>
        </NavigationBar>
      </VStack>
    </VStack>;
}`,...T.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`() => {
  const [search, setSearch] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const {
    isPhone
  } = useBreakpoints();
  const handleSearchToggle = useCallback(() => {
    setSearchOpen(prev => !prev);
    if (searchOpen) {
      setSearch('');
    }
  }, [searchOpen]);
  return <VStack alignItems="flex-start">
      <Text as="h1" display="block" font="title1">
        Responsive NavigationBar
      </Text>
      <Text as="p" display="block" font="body">
        Resize the window to see the search input collapse to an icon button on smaller screens.
      </Text>
      <NavigationBar background="bgSecondary" end={<HStack alignItems="center" gap={1}>
            {isPhone && <IconButton accessibilityLabel="Search" active={searchOpen} name="search" onClick={handleSearchToggle} />}
            <IconButton accessibilityLabel="Notifications" name="bell" />
            <Avatar size="xl" />
          </HStack>} start={<IconButton accessibilityLabel="Back" name="backArrow" />}>
        {isPhone ? searchOpen && <SearchInput compact accessibilityLabel="Search" onChangeText={setSearch} placeholder="Search..." value={search} /> : <SearchInput compact accessibilityLabel="Search" onChangeText={setSearch} placeholder="Search assets..." value={search} />}
        {!isPhone && !searchOpen && <NavigationTitle>Trading</NavigationTitle>}
      </NavigationBar>
    </VStack>;
}`,...j.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => {
  return <VStack alignItems="flex-start" gap={4}>
      <Text as="h1" display="block" font="title1">
        NavigationBar with custom gap
      </Text>
      <VStack gap={2} width="100%">
        <Text font="body">Custom column gap (4)</Text>
        <NavigationBar columnGap={4} end={<IconButton accessibilityLabel="Settings" name="settings" />} start={<IconButton accessibilityLabel="Back" name="backArrow" />}>
          <NavigationTitle>Wide Column Gap</NavigationTitle>
        </NavigationBar>
      </VStack>
      <VStack gap={2} width="100%">
        <Text font="body">Custom row gap with tabs (4)</Text>
        <NavigationBar bottom={<TabNavigation onChange={() => {}} tabs={[{
        id: 'tab1',
        label: 'Tab 1'
      }, {
        id: 'tab2',
        label: 'Tab 2'
      }]} value="tab1" />} end={<IconButton accessibilityLabel="Settings" name="settings" />} rowGap={4}>
          <NavigationTitle>Wide Row Gap</NavigationTitle>
        </NavigationBar>
      </VStack>
    </VStack>;
}`,...h.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`() => {
  return <VStack alignItems="flex-start" gap={4}>
      <Text as="h1" display="block" font="title1">
        NavigationBar with custom styles and classNames
      </Text>
      <NavigationBar end={<HStack alignItems="center" gap={1}>
            <IconButton accessibilityLabel="Notifications" name="bell" />
            <Avatar size="xl" />
          </HStack>} start={<IconButton accessibilityLabel="Back" name="backArrow" />} styles={{
      root: {
        borderBottomWidth: 2
      },
      content: {
        justifyContent: 'center'
      }
    }}>
        <NavigationTitle>Centered Title</NavigationTitle>
      </NavigationBar>
    </VStack>;
}`,...I.parameters?.docs?.source}}};const ja=["NavigationBarFullExampleDefault","NavigationBarMobileExample","NavigationBarWithSearch","NavigationBarWithSelectableTitle","NavigationBarWithActions","NavigationBarWithCustomPadding","NavigationBarBasic","NavigationBarWithTabs","NavigationBarWithCustomBackground","NavigationBarResponsive","NavigationBarWithCustomGap","NavigationBarWithCustomStyles"];export{N as NavigationBarBasic,u as NavigationBarFullExampleDefault,x as NavigationBarMobileExample,j as NavigationBarResponsive,B as NavigationBarWithActions,T as NavigationBarWithCustomBackground,h as NavigationBarWithCustomGap,S as NavigationBarWithCustomPadding,I as NavigationBarWithCustomStyles,y as NavigationBarWithSearch,k as NavigationBarWithSelectableTitle,b as NavigationBarWithTabs,ja as __namedExportsOrder,Ta as default};
