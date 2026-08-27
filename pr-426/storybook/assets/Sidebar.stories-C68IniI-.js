import{j as e,r as m,by as x,B as _}from"./iframe-CsG_6vZR.js";import{S as W}from"./SelectOption-BBBPgn8s.js";import{T as d}from"./Text-B1CpMNU3.js";import{S as u,D,C as G,b as X,c as g,d as B}from"./NavigationStorySetup-CRQfgGVW.js";import{S as R}from"./Spacer-DighYh4h.js";import{H as l}from"./HStack-DaDYipoP.js";import{I as v}from"./Icon-DTs0crZh.js";import{L as h}from"./LogoMark-BgKUSn8S.js";import{V as H}from"./VStack-Cg_Yq2u4.js";import{I as N}from"./IconButton-DNJ86Kiu.js";import{P as E}from"./Pressable-DDN99tmF.js";import{S as Y}from"./SubBrandLogoMark-DESdmw9f.js";import"./preload-helper-D9Z9MdNV.js";import"./select-Em8pkxbY.js";import"./Cell-Z4wq8KY-.js";import"./useCellSpacing-BeT6oDTo.js";import"./sizing-Do56D2dQ.js";import"./CellAccessory-iu0jUwZW.js";import"./isRtl-C5Fon8jH.js";import"./Link-GlbzwVdV.js";import"./useMergeRefs-DR4sGa7m.js";import"./Tooltip-DdBi_ZOF.js";import"./Popover-BqkIPLOm.js";import"./NewAnimatePresence-P1FndR1q.js";import"./index-CpZJTW5x.js";import"./motion-minimal-5s2ikV7b.js";import"./use-unmount-effect-DmgCrakR.js";import"./FocusTrap-C5pHOjrH.js";import"./debounce-fynzmAtJ.js";import"./Overlay-DkQgdcBj.js";import"./OverlayContentContext-CpXWuzdo.js";import"./useMotionProps-BXBckQBf.js";import"./utils-y2S18Lx0.js";import"./tokens-BwScSksM.js";import"./Portal-BaLq4aAx.js";import"./useTheme-CmrOhAty.js";import"./TooltipContent-CdVyoQz2.js";import"./usePrefixedId-BL1THI0P.js";import"./useDimensions-BCh0uzfM.js";import"./useA11yControlledVisibility-BZQOfbE4.js";import"./Dropdown-DlJsEaMG.js";import"./index-CKRF3JMY.js";import"./useBreakpoints-DD5uuIEx.js";import"./ModalWrapper-D8IaYCfm.js";import"./useScrollBlocker-CjG6q-zd.js";import"./dropdown-CDhCThJm.js";import"./Pictogram-CIj70k1H.js";import"./versionMap-CcI7tU1w.js";import"./createIllustration-ByKDk3Sl.js";import"./convertDimensionToSize-B6MeOypY.js";import"./Button-D2WSek5T.js";import"./Spinner-C8x8bhOH.js";import"./isArray-M0ytM-vC.js";import"./Interactable--rqISG90.js";import"./color-Ceo1QMNe.js";const Je={component:u,title:"Components/Navigation/Sidebar"},c=[{title:"Home",icon:"home"},{title:"Assets",icon:"chartPie"},{title:"Trade",icon:"trading"},{title:"Pay",icon:"pay"},{title:"For you",icon:"newsFeed"},{title:"Earn",icon:"giftBox"},{title:"Borrow",icon:"cash"},{title:"DeFi",icon:"defi"}],I=()=>e.jsxs(e.Fragment,{children:[e.jsx(d,{as:"h1",display:"block",font:"title1",children:"Default Sidebar Example"}),e.jsx(R,{as:"div",vertical:1}),e.jsx(D,{})]}),C=()=>e.jsxs(e.Fragment,{children:[e.jsx(d,{as:"h1",display:"block",font:"title1",children:"Condensed Sidebar Example"}),e.jsx(R,{as:"div",vertical:1}),e.jsx(G,{})]}),S=()=>e.jsxs(e.Fragment,{children:[e.jsx(d,{as:"h1",display:"block",font:"title1",children:"Custom Sidebar Example"}),e.jsx(R,{as:"div",vertical:1}),e.jsx(X,{})]}),k=()=>{const[o,a]=m.useState(0),[n,t]=m.useState(void 0),[r,p]=m.useState(!0),b=c.slice(4),L=s=>{const f=b.findIndex(O=>O.title===s)+c.length;a(f),t(s)},V=s=>{a(s),t(void 0)},i=()=>e.jsx(N,{height:"48px",name:r?"caretRight":"caretLeft",onClick:()=>p(!r),width:"48px"});return e.jsx(x,{children:e.jsxs(l,{alignItems:"flex-start",justifyContent:"center",overflow:"hidden",children:[e.jsxs(u,{collapsed:r,logo:e.jsx(h,{}),renderEnd:i,children:[c.map((s,f)=>e.jsx(g,{active:f===o,onClick:()=>V(f),tooltipContent:s.title,...s},`sidebar-item--${s.title}`)),e.jsx(B,{active:o>=c.length,onChange:L,tooltipContent:"More",value:n,children:b.map(s=>e.jsx(W,{description:s.title,media:e.jsx(v,{name:s.icon}),value:s.title},`sidebar-more-menu-item--${s.title}`))})]}),e.jsx(H,{flexGrow:1,gap:1,justifyContent:"space-between",padding:2,children:e.jsx(d,{as:"h2",display:"block",font:"headline",children:"Click the arrow button to toggle collapsed state"})})]})})},j=()=>{const[o,a]=m.useState(0);return e.jsx(x,{children:e.jsxs(l,{alignItems:"flex-start",justifyContent:"center",overflow:"hidden",children:[e.jsx(u,{autoCollapse:!0,logo:e.jsx(h,{}),children:c.slice(0,4).map((n,t)=>e.jsx(g,{active:t===o,icon:n.icon,onClick:()=>a(t),title:n.title,tooltipContent:n.title},n.title))}),e.jsx(H,{flexGrow:1,padding:3,children:e.jsx(d,{color:"fgMuted",font:"label1",children:"Resize the browser window to see the sidebar auto-collapse at the tablet breakpoint."})})]})})},M=()=>{const[o,a]=m.useState(0),[n,t]=m.useState(!1),r=p=>p?e.jsx(h,{}):e.jsx(_,{height:32,children:e.jsx(Y,{type:"commerce"})});return e.jsx(x,{children:e.jsx(l,{alignItems:"flex-start",justifyContent:"center",overflow:"hidden",children:e.jsx(u,{collapsed:n,logo:r,renderEnd:()=>e.jsx(N,{name:n?"caretRight":"caretLeft",onClick:()=>t(!n)}),children:c.slice(0,3).map((p,b)=>e.jsx(g,{active:b===o,icon:p.icon,onClick:()=>a(b),title:p.title,tooltipContent:p.title},p.title))})})})},y=()=>{const[o,a]=m.useState(0),n=t=>e.jsx(E,{transparentWhileInactive:!0,as:"button",background:"bgPrimaryWash",borderRadius:1e3,onClick:()=>console.log("Help clicked!"),width:"100%",children:e.jsxs(l,{alignItems:"center",gap:2,paddingX:2,paddingY:2,children:[e.jsx(v,{name:"questionMark"}),!t&&e.jsx(d,{as:"span",font:"headline",children:"Help & Support"})]})});return e.jsx(x,{children:e.jsx(l,{alignItems:"flex-start",justifyContent:"center",overflow:"hidden",children:e.jsx(u,{logo:e.jsx(h,{}),renderEnd:n,styles:{end:{width:"100%"}},children:c.slice(0,3).map((t,r)=>e.jsx(g,{active:r===o,icon:t.icon,onClick:()=>a(r),title:t.title,tooltipContent:t.title},t.title))})})})},P=()=>{const[o,a]=m.useState(0);return e.jsx(x,{children:e.jsx(l,{alignItems:"flex-start",justifyContent:"center",overflow:"hidden",children:e.jsx(u,{logo:e.jsx(h,{}),renderEnd:()=>e.jsx(E,{transparentWhileInactive:!0,as:"button",background:"bgPrimaryWash",borderRadius:1e3,width:"100%",children:e.jsxs(l,{alignItems:"center",gap:2,paddingX:2,paddingY:2,children:[e.jsx(v,{name:"questionMark"}),e.jsx(d,{as:"span",font:"headline",children:"Help"})]})}),styles:{root:{background:"linear-gradient(180deg, var(--color-bg) 0%, var(--color-bgAlternate) 100%)"},logo:{paddingBottom:32},end:{width:"100%"}},children:c.slice(0,4).map((n,t)=>e.jsx(g,{active:t===o,icon:n.icon,onClick:()=>a(t),title:n.title,tooltipContent:n.title},n.title))})})})},w=()=>{const[o,a]=m.useState(0),[n,t]=m.useState(void 0),r=c.slice(0,5),p=c.slice(5),b=i=>{const s=p.findIndex(f=>f.title===i)+r.length;a(s),t(i)},L=i=>{a(i),t(void 0)},V=c[o]?.title||"Dashboard";return e.jsx(x,{children:e.jsxs(l,{alignItems:"stretch",height:400,overflow:"hidden",children:[e.jsxs(u,{autoCollapse:!0,logo:e.jsx(h,{}),renderEnd:i=>e.jsxs(H,{gap:1,children:[e.jsx(E,{transparentWhileInactive:!0,as:"button",background:"bgPrimaryWash",borderRadius:1e3,width:"100%",children:e.jsxs(l,{alignItems:"center",gap:2,paddingX:2,paddingY:2,children:[e.jsx(v,{name:"settings"}),!i&&e.jsx(d,{as:"span",font:"headline",children:"Settings"})]})}),e.jsx(E,{transparentWhileInactive:!0,as:"button",background:"bgPrimaryWash",borderRadius:1e3,width:"100%",children:e.jsxs(l,{alignItems:"center",gap:2,paddingX:2,paddingY:2,children:[e.jsx(v,{name:"profile"}),!i&&e.jsx(d,{as:"span",font:"headline",children:"Profile"})]})})]}),children:[r.map((i,s)=>e.jsx(g,{active:s===o,icon:i.icon,onClick:()=>L(s),title:i.title,tooltipContent:i.title},i.title)),e.jsx(B,{active:o>=r.length,onChange:b,tooltipContent:"More",value:n,children:p.map(i=>e.jsx(W,{description:i.title,media:e.jsx(v,{name:i.icon}),value:i.title},i.title))})]}),e.jsxs(H,{background:"bgAlternate",flexGrow:1,padding:3,children:[e.jsx(d,{as:"h1",font:"title2",children:V}),e.jsxs(d,{color:"fgMuted",font:"body",children:["Welcome to the ",V.toLowerCase()," page. This is a sample application shell demonstrating the Sidebar component with responsive behavior."]})]})]})})},A=()=>{const o=[{title:"Spot",icon:"chartCandles"},{title:"Futures",icon:"chartBar"},{title:"Portfolio",icon:"chartPie"},{title:"Orders",icon:"documentation"}],[a,n]=m.useState(0);return e.jsx(x,{children:e.jsxs(l,{children:[e.jsx(u,{logo:e.jsx(h,{foreground:!0}),variant:"condensed",children:o.map((t,r)=>e.jsx(g,{active:r===a,icon:t.icon,onClick:()=>n(r),title:t.title},t.title))}),e.jsxs(H,{background:"bgAlternate",flexGrow:1,gap:2,padding:3,children:[e.jsxs(l,{justifyContent:"space-between",children:[e.jsx(d,{font:"title3",children:"BTC/USD"}),e.jsx(d,{color:"fgPositive",font:"title3",children:"$67,432.50"})]}),e.jsx(_,{background:"bg",borderRadius:200,flexGrow:1,style:{display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsxs(d,{color:"fgMuted",font:"label1",children:[o[a].title," Chart Area"]})})]})]})})},F="customRootCss-c1hec5zy",q="customLogoCss-c132bjg5",$="customContentCss-c1cn8pgt",z="customEndCss-copx6jh",T=()=>{const[o,a]=m.useState(0);return e.jsx(x,{children:e.jsx(l,{alignItems:"flex-start",justifyContent:"center",overflow:"hidden",children:e.jsx(u,{classNames:{root:F,logo:q,content:$,end:z},logo:e.jsx(h,{}),renderEnd:()=>e.jsx(E,{transparentWhileInactive:!0,as:"button",background:"bgPrimaryWash",borderRadius:1e3,width:"100%",children:e.jsxs(l,{alignItems:"center",gap:2,paddingX:2,paddingY:2,children:[e.jsx(v,{name:"questionMark"}),e.jsx(d,{as:"span",font:"headline",children:"Help"})]})}),children:c.slice(0,4).map((n,t)=>e.jsx(g,{active:t===o,icon:n.icon,onClick:()=>a(t),title:n.title,tooltipContent:n.title},n.title))})})})};I.__docgenInfo={description:"",methods:[],displayName:"Default"};C.__docgenInfo={description:"",methods:[],displayName:"Condensed"};S.__docgenInfo={description:"",methods:[],displayName:"Custom"};k.__docgenInfo={description:"",methods:[],displayName:"ControlledCollapse"};j.__docgenInfo={description:"",methods:[],displayName:"AutoCollapse"};M.__docgenInfo={description:"",methods:[],displayName:"CustomLogo"};y.__docgenInfo={description:"",methods:[],displayName:"RenderEnd"};P.__docgenInfo={description:"",methods:[],displayName:"CustomStyles"};w.__docgenInfo={description:"",methods:[],displayName:"ApplicationShell"};A.__docgenInfo={description:"",methods:[],displayName:"CondensedTradingInterface"};T.__docgenInfo={description:"",methods:[],displayName:"CustomClassNames"};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`() => {
  return <>
      <Text as="h1" display="block" font="title1">
        Default Sidebar Example
      </Text>
      <Spacer as="div" vertical={1} />
      <DefaultSidebarExample />
    </>;
}`,...I.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`() => {
  return <>
      <Text as="h1" display="block" font="title1">
        Condensed Sidebar Example
      </Text>
      <Spacer as="div" vertical={1} />
      <CondensedSidebarExample />
    </>;
}`,...C.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => {
  return <>
      <Text as="h1" display="block" font="title1">
        Custom Sidebar Example
      </Text>
      <Spacer as="div" vertical={1} />
      <CustomSidebarExample />
    </>;
}`,...S.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`() => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [moreMenuValue, setMoreMenuValue] = useState<string | undefined>(undefined);
  const [collapsed, setCollapsed] = useState(true);
  const moreMenuOptions = items.slice(4);
  const handleMoreMenuChange = (newValue: string) => {
    const moreIndex = moreMenuOptions.findIndex(option => option.title === newValue) + items.length;
    setActiveIndex(moreIndex);
    setMoreMenuValue(newValue);
  };
  const handleItemPress = (index: number) => {
    setActiveIndex(index);
    setMoreMenuValue(undefined);
  };
  const renderEnd = () => <IconButton height="48px" name={collapsed ? 'caretRight' : 'caretLeft'} onClick={() => setCollapsed(!collapsed)} width="48px" />;
  return <PortalProvider>
      <HStack alignItems="flex-start" justifyContent="center" overflow="hidden">
        <Sidebar collapsed={collapsed} logo={<LogoMark />} renderEnd={renderEnd}>
          {items.map((item, index) => <SidebarItem key={\`sidebar-item--\${item.title}\`} active={index === activeIndex} onClick={() => handleItemPress(index)} tooltipContent={item.title} {...item} />)}
          <SidebarMoreMenu active={activeIndex >= items.length} onChange={handleMoreMenuChange} tooltipContent="More" value={moreMenuValue}>
            {moreMenuOptions.map(item => <SelectOption key={\`sidebar-more-menu-item--\${item.title}\`} description={item.title} media={<Icon name={item.icon} />} value={item.title} />)}
          </SidebarMoreMenu>
        </Sidebar>
        <VStack flexGrow={1} gap={1} justifyContent="space-between" padding={2}>
          <Text as="h2" display="block" font="headline">
            Click the arrow button to toggle collapsed state
          </Text>
        </VStack>
      </HStack>
    </PortalProvider>;
}`,...k.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`() => {
  const [activeIndex, setActiveIndex] = useState(0);
  return <PortalProvider>
      <HStack alignItems="flex-start" justifyContent="center" overflow="hidden">
        <Sidebar autoCollapse logo={<LogoMark />}>
          {items.slice(0, 4).map((item, index) => <SidebarItem key={item.title} active={index === activeIndex} icon={item.icon} onClick={() => setActiveIndex(index)} title={item.title} tooltipContent={item.title} />)}
        </Sidebar>
        <VStack flexGrow={1} padding={3}>
          <Text color="fgMuted" font="label1">
            Resize the browser window to see the sidebar auto-collapse at the tablet breakpoint.
          </Text>
        </VStack>
      </HStack>
    </PortalProvider>;
}`,...j.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`() => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const renderLogo = (isCollapsed: boolean) => isCollapsed ? <LogoMark /> : <Box height={32}>
        <SubBrandLogoMark type="commerce" />
      </Box>;
  return <PortalProvider>
      <HStack alignItems="flex-start" justifyContent="center" overflow="hidden">
        <Sidebar collapsed={collapsed} logo={renderLogo} renderEnd={() => <IconButton name={collapsed ? 'caretRight' : 'caretLeft'} onClick={() => setCollapsed(!collapsed)} />}>
          {items.slice(0, 3).map((item, index) => <SidebarItem key={item.title} active={index === activeIndex} icon={item.icon} onClick={() => setActiveIndex(index)} title={item.title} tooltipContent={item.title} />)}
        </Sidebar>
      </HStack>
    </PortalProvider>;
}`,...M.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => {
  const [activeIndex, setActiveIndex] = useState(0);
  const renderEnd = (isCollapsed: boolean) => <Pressable transparentWhileInactive as="button" background="bgPrimaryWash" borderRadius={1000} onClick={() => console.log('Help clicked!')} width="100%">
      <HStack alignItems="center" gap={2} paddingX={2} paddingY={2}>
        <Icon name="questionMark" />
        {!isCollapsed && <Text as="span" font="headline">
            Help & Support
          </Text>}
      </HStack>
    </Pressable>;
  return <PortalProvider>
      <HStack alignItems="flex-start" justifyContent="center" overflow="hidden">
        <Sidebar logo={<LogoMark />} renderEnd={renderEnd} styles={{
        end: {
          width: '100%'
        }
      }}>
          {items.slice(0, 3).map((item, index) => <SidebarItem key={item.title} active={index === activeIndex} icon={item.icon} onClick={() => setActiveIndex(index)} title={item.title} tooltipContent={item.title} />)}
        </Sidebar>
      </HStack>
    </PortalProvider>;
}`,...y.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`() => {
  const [activeIndex, setActiveIndex] = useState(0);
  return <PortalProvider>
      <HStack alignItems="flex-start" justifyContent="center" overflow="hidden">
        <Sidebar logo={<LogoMark />} renderEnd={() => <Pressable transparentWhileInactive as="button" background="bgPrimaryWash" borderRadius={1000} width="100%">
              <HStack alignItems="center" gap={2} paddingX={2} paddingY={2}>
                <Icon name="questionMark" />
                <Text as="span" font="headline">
                  Help
                </Text>
              </HStack>
            </Pressable>} styles={{
        root: {
          background: 'linear-gradient(180deg, var(--color-bg) 0%, var(--color-bgAlternate) 100%)'
        },
        logo: {
          paddingBottom: 32
        },
        end: {
          width: '100%'
        }
      }}>
          {items.slice(0, 4).map((item, index) => <SidebarItem key={item.title} active={index === activeIndex} icon={item.icon} onClick={() => setActiveIndex(index)} title={item.title} tooltipContent={item.title} />)}
        </Sidebar>
      </HStack>
    </PortalProvider>;
}`,...P.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`() => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [moreMenuValue, setMoreMenuValue] = useState<string | undefined>(undefined);
  const navItems = items.slice(0, 5);
  const moreMenuOptions = items.slice(5);
  const handleMoreMenuChange = (newValue: string) => {
    const moreIndex = moreMenuOptions.findIndex(option => option.title === newValue) + navItems.length;
    setActiveIndex(moreIndex);
    setMoreMenuValue(newValue);
  };
  const handleItemPress = (index: number) => {
    setActiveIndex(index);
    setMoreMenuValue(undefined);
  };
  const currentPage = items[activeIndex]?.title || 'Dashboard';
  return <PortalProvider>
      <HStack alignItems="stretch" height={400} overflow="hidden">
        <Sidebar autoCollapse logo={<LogoMark />} renderEnd={isCollapsed => <VStack gap={1}>
              <Pressable transparentWhileInactive as="button" background="bgPrimaryWash" borderRadius={1000} width="100%">
                <HStack alignItems="center" gap={2} paddingX={2} paddingY={2}>
                  <Icon name="settings" />
                  {!isCollapsed && <Text as="span" font="headline">
                      Settings
                    </Text>}
                </HStack>
              </Pressable>
              <Pressable transparentWhileInactive as="button" background="bgPrimaryWash" borderRadius={1000} width="100%">
                <HStack alignItems="center" gap={2} paddingX={2} paddingY={2}>
                  <Icon name="profile" />
                  {!isCollapsed && <Text as="span" font="headline">
                      Profile
                    </Text>}
                </HStack>
              </Pressable>
            </VStack>}>
          {navItems.map((item, index) => <SidebarItem key={item.title} active={index === activeIndex} icon={item.icon} onClick={() => handleItemPress(index)} title={item.title} tooltipContent={item.title} />)}
          <SidebarMoreMenu active={activeIndex >= navItems.length} onChange={handleMoreMenuChange} tooltipContent="More" value={moreMenuValue}>
            {moreMenuOptions.map(item => <SelectOption key={item.title} description={item.title} media={<Icon name={item.icon} />} value={item.title} />)}
          </SidebarMoreMenu>
        </Sidebar>
        <VStack background="bgAlternate" flexGrow={1} padding={3}>
          <Text as="h1" font="title2">
            {currentPage}
          </Text>
          <Text color="fgMuted" font="body">
            Welcome to the {currentPage.toLowerCase()} page. This is a sample application shell
            demonstrating the Sidebar component with responsive behavior.
          </Text>
        </VStack>
      </HStack>
    </PortalProvider>;
}`,...w.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`() => {
  const tradingItems = [{
    title: 'Spot',
    icon: 'chartCandles' as const
  }, {
    title: 'Futures',
    icon: 'chartBar' as const
  }, {
    title: 'Portfolio',
    icon: 'chartPie' as const
  }, {
    title: 'Orders',
    icon: 'documentation' as const
  }];
  const [activeIndex, setActiveIndex] = useState(0);
  return <PortalProvider>
      <HStack>
        <Sidebar logo={<LogoMark foreground />} variant="condensed">
          {tradingItems.map((item, index) => <SidebarItem key={item.title} active={index === activeIndex} icon={item.icon} onClick={() => setActiveIndex(index)} title={item.title} />)}
        </Sidebar>
        <VStack background="bgAlternate" flexGrow={1} gap={2} padding={3}>
          <HStack justifyContent="space-between">
            <Text font="title3">BTC/USD</Text>
            <Text color="fgPositive" font="title3">
              $67,432.50
            </Text>
          </HStack>
          <Box background="bg" borderRadius={200} flexGrow={1} style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
            <Text color="fgMuted" font="label1">
              {tradingItems[activeIndex].title} Chart Area
            </Text>
          </Box>
        </VStack>
      </HStack>
    </PortalProvider>;
}`,...A.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`() => {
  const [activeIndex, setActiveIndex] = useState(0);
  return <PortalProvider>
      <HStack alignItems="flex-start" justifyContent="center" overflow="hidden">
        <Sidebar classNames={{
        root: customRootCss,
        logo: customLogoCss,
        content: customContentCss,
        end: customEndCss
      }} logo={<LogoMark />} renderEnd={() => <Pressable transparentWhileInactive as="button" background="bgPrimaryWash" borderRadius={1000} width="100%">
              <HStack alignItems="center" gap={2} paddingX={2} paddingY={2}>
                <Icon name="questionMark" />
                <Text as="span" font="headline">
                  Help
                </Text>
              </HStack>
            </Pressable>}>
          {items.slice(0, 4).map((item, index) => <SidebarItem key={item.title} active={index === activeIndex} icon={item.icon} onClick={() => setActiveIndex(index)} title={item.title} tooltipContent={item.title} />)}
        </Sidebar>
      </HStack>
    </PortalProvider>;
}`,...T.parameters?.docs?.source}}};const Ke=["Default","Condensed","Custom","ControlledCollapse","AutoCollapse","CustomLogo","RenderEnd","CustomStyles","ApplicationShell","CondensedTradingInterface","CustomClassNames"];export{w as ApplicationShell,j as AutoCollapse,C as Condensed,A as CondensedTradingInterface,k as ControlledCollapse,S as Custom,T as CustomClassNames,M as CustomLogo,P as CustomStyles,I as Default,y as RenderEnd,Ke as __namedExportsOrder,Je as default};
