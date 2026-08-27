import{r as a,j as e,B as o}from"./iframe-CYDANtMt.js";import{l as C}from"./loremIpsum-CjdvNg3u.js";import{F as A}from"./FeedCard-omDZ6Mzr.js";import{L as P}from"./ListCell-CZflgNsr.js";import{L as y}from"./LogoMark-CqIA3pam.js";import{T as b}from"./Tag-CqGRaJHc.js";import{T as n}from"./Text-0g3rWpAf.js";import{F as T}from"./FullscreenModalLayout-PXKMm23p.js";import{B as M}from"./ButtonGroup-DXyqnMoL.js";import{B as m}from"./Button-DPtA13Wn.js";import{V as t}from"./VStack-iXgNewwv.js";import{H as l}from"./HStack-Fh-9TmPm.js";import{I as j}from"./IconButton-D-CYL-b9.js";import{A as L,a as V}from"./AccordionItem-Dhy7Qryg.js";import"./preload-helper-D9Z9MdNV.js";import"./CardHeader-DoQ3kXwy.js";import"./card-CqcYFcP-.js";import"./convertDimensionToSize-B6MeOypY.js";import"./Pressable-BvczHaFK.js";import"./isArray-BJmyNVUi.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";import"./useTheme-C_Ehsh33.js";import"./sizing-Do56D2dQ.js";import"./Avatar-FudKOIuF.js";import"./RemoteImage-S3YFINhn.js";import"./Pictogram-BOyJGVDK.js";import"./versionMap-CcI7tU1w.js";import"./createIllustration-CSKQDVzw.js";import"./SpotSquare-n4zoXJGu.js";import"./versionMap-Bfu_9WQc.js";import"./LikeButton-C8Jj3gY_.js";import"./interactableHeight-DPdDzpO8.js";import"./Icon-DRxKkZdt.js";import"./useCellSpacing-BH3_o_ol.js";import"./Cell-D1A-2vVj.js";import"./CellAccessory-Cln9vUz5.js";import"./isRtl-CGZsgYct.js";import"./OverlayContentContext-D3LfdOuR.js";import"./useMotionProps-BF3bCUsm.js";import"./utils-CM_X5is-.js";import"./tokens-BwScSksM.js";import"./FocusTrap-D5jofIBF.js";import"./useMergeRefs-DR4sGa7m.js";import"./debounce-fynzmAtJ.js";import"./Overlay-BrSXLw2H.js";import"./motion-minimal-B1h7XI-_.js";import"./ModalWrapper-TkjI7R_Y.js";import"./NewAnimatePresence-BIvSMOo2.js";import"./index-DaxQGrHc.js";import"./use-unmount-effect-DjWyEMV9.js";import"./useScrollBlocker-smLDx_Od.js";import"./Portal-BNKVVywf.js";import"./Spinner-CXotWqqb.js";import"./Divider-CG0S6-JI.js";import"./AnimatedCaret-R2z7TxpB.js";import"./collapsible-BAneA-61.js";import"./context-C9K9uJvD.js";import"./index-CAK1E_4V.js";import"./Collapsible-PtwHvxc0.js";const Oe={title:"Components/FullscreenModalLayout",component:T,parameters:{}},S=()=>({triggerRef:a.useRef(null)}),g=()=>{const[d,r]=a.useState(!0),c=a.useCallback(()=>r(!0),[]),s=a.useCallback(()=>r(!1),[]),{triggerRef:p}=S(),u=e.jsxs(l,{borderedBottom:!0,alignItems:"center",paddingX:4,paddingY:2,children:[e.jsx(o,{paddingEnd:3,width:80,children:e.jsx(y,{size:32})}),e.jsx(o,{flexGrow:1,children:e.jsx(n,{as:"h1",display:"block",font:"title1",children:"Modal - Center Panel"})}),e.jsx(o,{children:e.jsx(j,{transparent:!0,"aria-label":"Close modal",name:"close",onClick:s})})]}),i=e.jsx(t,{flexGrow:1,overflow:"auto",padding:4,children:e.jsxs(n,{as:"p",display:"block",font:"body",children:["This is the main content area (Center Panel).",e.jsx("br",{}),C]})});return e.jsxs(e.Fragment,{children:[e.jsx(m,{ref:p,onClick:c,children:"Open Modal (Center Only)"}),e.jsx(T,{onRequestClose:s,visible:d,children:e.jsxs(t,{background:"bg",height:"100%",width:"100%",children:[u,i]})})]})};g.storyName="Basic (Center Panel)";const h=()=>{const[d,r]=a.useState(!0),c=a.useCallback(()=>r(!0),[]),s=a.useCallback(()=>r(!1),[]),{triggerRef:p}=S(),u=e.jsxs(l,{borderedBottom:!0,alignItems:"center",paddingX:4,paddingY:2,children:[e.jsx(o,{paddingEnd:3,width:80,children:e.jsx(y,{size:32})}),e.jsx(o,{flexGrow:1,children:e.jsx(n,{as:"h1",display:"block",font:"title1",children:"Modal - Left & Center Panels"})}),e.jsx(o,{children:e.jsx(j,{transparent:!0,"aria-label":"Close modal",name:"close",onClick:s})})]}),i=e.jsxs(l,{flexGrow:1,overflow:"hidden",children:[e.jsx(t,{background:"bgAlternate",height:"100%",overflow:"auto",padding:4,width:360,children:e.jsx(n,{as:"p",display:"block",font:"body",children:"Left Panel Content"})}),e.jsx(t,{flexGrow:1,overflow:"auto",padding:4,children:e.jsxs(n,{as:"p",display:"block",font:"body",children:["Center Panel Content",e.jsx("br",{}),C]})})]});return e.jsxs(e.Fragment,{children:[e.jsx(m,{ref:p,onClick:c,children:"Open Modal (Left + Center)"}),e.jsx(T,{onRequestClose:s,visible:d,children:e.jsxs(t,{background:"bg",height:"100%",width:"100%",children:[u,i]})})]})};h.storyName="Two Column (Left + Center)";const x=()=>{const[d,r]=a.useState(!0),c=a.useCallback(()=>r(!0),[]),s=a.useCallback(()=>r(!1),[]),{triggerRef:p}=S(),u=e.jsxs(l,{borderedBottom:!0,alignItems:"center",paddingX:4,paddingY:2,children:[e.jsx(o,{paddingEnd:3,width:80,children:e.jsx(y,{size:32})}),e.jsx(o,{flexGrow:1,children:e.jsx(n,{as:"h1",display:"block",font:"title1",children:"Modal - Three Panels"})}),e.jsx(o,{children:e.jsx(j,{transparent:!0,"aria-label":"Close modal",name:"close",onClick:s})})]}),i=e.jsxs(l,{flexGrow:1,overflow:"hidden",children:[e.jsx(t,{background:"bgAlternate",height:"100%",overflow:"auto",padding:4,width:360,children:e.jsx(n,{as:"p",display:"block",font:"body",children:"Left Panel"})}),e.jsx(t,{flexGrow:1,overflow:"auto",padding:4,children:e.jsxs(n,{as:"p",display:"block",font:"body",children:["Center Panel",e.jsx("br",{}),C]})}),e.jsx(t,{background:"bgAlternate",height:"100%",overflow:"auto",padding:4,width:360,children:e.jsx(n,{as:"p",display:"block",font:"body",children:"Right Panel"})})]});return e.jsxs(e.Fragment,{children:[e.jsx(m,{ref:p,onClick:c,children:"Open Modal (Left + Center + Right)"}),e.jsx(T,{onRequestClose:s,visible:d,children:e.jsxs(t,{background:"bg",height:"100%",width:"100%",children:[u,i]})})]})};x.storyName="Three Column (Left + Center + Right)";const f=()=>{const[d,r]=a.useState(!0),c=a.useCallback(()=>r(!0),[]),s=a.useCallback(()=>r(!1),[]),{triggerRef:p}=S(),u=e.jsxs(l,{borderedBottom:!0,alignItems:"center",paddingX:4,paddingY:2,children:[e.jsx(o,{paddingEnd:3,width:80,children:e.jsx(y,{size:32})}),e.jsx(o,{flexGrow:1,children:e.jsx(n,{as:"h1",display:"block",font:"title1",children:"Modal - All Panels"})}),e.jsx(o,{children:e.jsx(j,{transparent:!0,"aria-label":"Close modal",name:"close",onClick:s})})]}),i=e.jsxs(t,{flexGrow:1,overflow:"hidden",children:[e.jsx(t,{background:"bgAlternate",padding:2,children:e.jsx(n,{as:"p",color:"fg",display:"block",font:"body",children:"Top Panel (e.g., Breadcrumbs, Progress)"})}),e.jsxs(l,{flexGrow:1,overflow:"hidden",children:[e.jsx(t,{background:"bgAlternate",height:"100%",overflow:"auto",padding:4,width:360,children:e.jsx(n,{as:"p",display:"block",font:"body",children:"Left Panel"})}),e.jsx(t,{flexGrow:1,overflow:"auto",padding:4,children:e.jsxs(n,{as:"p",display:"block",font:"body",children:["Center Panel",e.jsx("br",{}),C]})}),e.jsx(t,{background:"bgAlternate",height:"100%",overflow:"auto",padding:4,width:360,children:e.jsx(n,{as:"p",display:"block",font:"body",children:"Right Panel"})})]}),e.jsx(l,{borderedTop:!0,background:"bgAlternate",padding:2,children:e.jsx(n,{as:"p",display:"block",font:"body",children:"Bottom Panel (e.g., Footer, Actions)"})})]});return e.jsxs(e.Fragment,{children:[e.jsx(m,{ref:p,onClick:c,children:"Open Modal (All Panels)"}),e.jsx(T,{onRequestClose:s,visible:d,children:e.jsxs(t,{background:"bg",height:"100%",width:"100%",children:[u,i]})})]})};f.storyName="All Panels";const k=()=>{const[d,r]=a.useState(!0),c=a.useCallback(()=>r(!0),[]),s=a.useCallback(()=>r(!1),[]),{triggerRef:p}=S(),u=e.jsx(A,{author:"Earn crypto",avatar:"https://images.ctfassets.net/q5ulk4bp65r7/3rv8jr1B1Z1dZ2EhHqo7dp/e74ddbf1cd4836b83d34fe5cec351d78/Alt-Coin.png?w=768&fm=png",description:"Amp is an Ethereum token that can be used as collateral to provide instant settlement assurance any time value is transferred.",headerAction:{name:"more",variant:"foregroundMuted"},image:"https://images.ctfassets.net/q5ulk4bp65r7/3rv8jr1B1Z1dZ2EhHqo7dp/e74ddbf1cd4836b83d34fe5cec351d78/Alt-Coin.png?w=768&fm=png",mediaPlacement:"above",metadata:"Dec 18",title:"Learn AMP. Earn $3 in AMP."}),i=e.jsx(P,{description:"BTC",detail:"$45,123",subdetail:"+4.55%",title:"Bitcoin",variant:"positive"}),B=e.jsxs(t,{paddingX:4,children:[e.jsx(n,{as:"h1",display:"block",font:"title1",children:"Fullscreen Modal"}),e.jsx(n,{as:"p",display:"block",font:"body",children:"This is a test Fullscreen Modal with components composition."}),u,i,i,i]}),w=e.jsx(o,{background:"bgAlternate",borderRadius:200,elevation:1,overflow:"hidden",children:e.jsxs(L,{defaultActiveKey:"2",children:[e.jsx(V,{itemKey:"1",subtitle:"subtitle1",title:"Accordion #1",children:e.jsx(n,{as:"p",display:"block",font:"body",children:C})}),e.jsx(V,{itemKey:"2",subtitle:"subtitle2",title:"Accordion #2",children:e.jsx(n,{as:"p",display:"block",font:"body",children:C})})]})}),v=e.jsxs(l,{borderedBottom:!0,alignItems:"center",paddingX:4,paddingY:2,children:[e.jsx(o,{paddingEnd:3,width:80,children:e.jsx(y,{size:32})}),e.jsx(o,{flexGrow:1,children:e.jsx(n,{as:"h1",display:"block",font:"title1",children:"Example Modal"})}),e.jsx(o,{children:e.jsx(j,{transparent:!0,"aria-label":"Close modal",name:"close",onClick:s})})]}),F=e.jsxs(t,{flexGrow:1,overflow:"auto",children:[e.jsx(t,{borderedBottom:!0,paddingX:4,paddingY:2,children:e.jsxs(l,{gap:2,children:[e.jsx(b,{colorScheme:"green",intent:"promotional",children:"Green"}),e.jsx(b,{colorScheme:"blue",intent:"promotional",children:"Blue"}),e.jsx(b,{colorScheme:"yellow",intent:"promotional",children:"Yellow"}),e.jsx(b,{colorScheme:"purple",intent:"promotional",children:"Purple"}),e.jsx(b,{colorScheme:"red",intent:"promotional",children:"Red"}),e.jsx(b,{colorScheme:"gray",intent:"promotional",children:"Gray"})]})}),e.jsxs(l,{children:[e.jsx(t,{alignSelf:"start",flexShrink:0,padding:4,width:360,children:w}),e.jsx(t,{flexGrow:1,padding:4,children:B}),e.jsx(t,{alignSelf:"start",flexShrink:0,padding:4,width:360,children:w})]}),e.jsx(l,{borderedTop:!0,justifyContent:"flex-end",padding:2,children:e.jsxs(M,{children:[e.jsx(m,{onClick:()=>{alert("Cancel clicked")},variant:"secondary",children:"Cancel"}),e.jsx(m,{onClick:()=>{alert("OK clicked")},variant:"primary",children:"OK"})]})})]});return e.jsxs(e.Fragment,{children:[e.jsx(m,{ref:p,onClick:c,children:"Open Example Modal"}),e.jsx(T,{onRequestClose:s,visible:d,children:e.jsxs(t,{background:"bg",height:"100%",width:"100%",children:[v,F]})})]})};k.storyName="Example";g.__docgenInfo={description:"",methods:[],displayName:"BasicCenterPanel"};h.__docgenInfo={description:"",methods:[],displayName:"TwoColumnLeftCenter"};x.__docgenInfo={description:"",methods:[],displayName:"ThreeColumn"};f.__docgenInfo={description:"",methods:[],displayName:"WithAllPanels"};k.__docgenInfo={description:"",methods:[],displayName:"Example"};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => {
  const [visible, setVisible] = useState(true);
  const setVisibleToTrue = useCallback(() => setVisible(true), []);
  const setVisibleToFalse = useCallback(() => setVisible(false), []);
  const {
    triggerRef
  } = useTriggerFocus();
  const headerContent = <HStack borderedBottom alignItems="center" paddingX={4} paddingY={2}>
      <Box paddingEnd={3} width={80}>
        <LogoMark size={32} />
      </Box>
      <Box flexGrow={1}>
        <Text as="h1" display="block" font="title1">
          Modal - Center Panel
        </Text>
      </Box>
      <Box>
        <IconButton transparent aria-label="Close modal" name="close" onClick={setVisibleToFalse} />
      </Box>
    </HStack>;
  const mainContent = <VStack flexGrow={1} overflow="auto" padding={4}>
      <Text as="p" display="block" font="body">
        This is the main content area (Center Panel).
        <br />
        {loremIpsum}
      </Text>
    </VStack>;
  return <>
      <Button ref={triggerRef} onClick={setVisibleToTrue}>
        Open Modal (Center Only)
      </Button>
      <FullscreenModalLayout onRequestClose={setVisibleToFalse} visible={visible}>
        <VStack background="bg" height="100%" width="100%">
          {headerContent}
          {mainContent}
        </VStack>
      </FullscreenModalLayout>
    </>;
}`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => {
  const [visible, setVisible] = useState(true);
  const setVisibleToTrue = useCallback(() => setVisible(true), []);
  const setVisibleToFalse = useCallback(() => setVisible(false), []);
  const {
    triggerRef
  } = useTriggerFocus();
  const headerContent = <HStack borderedBottom alignItems="center" paddingX={4} paddingY={2}>
      <Box paddingEnd={3} width={80}>
        <LogoMark size={32} />
      </Box>
      <Box flexGrow={1}>
        <Text as="h1" display="block" font="title1">
          Modal - Left & Center Panels
        </Text>
      </Box>
      <Box>
        <IconButton transparent aria-label="Close modal" name="close" onClick={setVisibleToFalse} />
      </Box>
    </HStack>;
  const mainContent = <HStack flexGrow={1} overflow="hidden">
      <VStack background="bgAlternate" height="100%" overflow="auto" padding={4} width={360}>
        <Text as="p" display="block" font="body">
          Left Panel Content
        </Text>
      </VStack>
      <VStack flexGrow={1} overflow="auto" padding={4}>
        <Text as="p" display="block" font="body">
          Center Panel Content
          <br />
          {loremIpsum}
        </Text>
      </VStack>
    </HStack>;
  return <>
      <Button ref={triggerRef} onClick={setVisibleToTrue}>
        Open Modal (Left + Center)
      </Button>
      <FullscreenModalLayout onRequestClose={setVisibleToFalse} visible={visible}>
        <VStack background="bg" height="100%" width="100%">
          {headerContent}
          {mainContent}
        </VStack>
      </FullscreenModalLayout>
    </>;
}`,...h.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`() => {
  const [visible, setVisible] = useState(true);
  const setVisibleToTrue = useCallback(() => setVisible(true), []);
  const setVisibleToFalse = useCallback(() => setVisible(false), []);
  const {
    triggerRef
  } = useTriggerFocus();
  const headerContent = <HStack borderedBottom alignItems="center" paddingX={4} paddingY={2}>
      <Box paddingEnd={3} width={80}>
        <LogoMark size={32} />
      </Box>
      <Box flexGrow={1}>
        <Text as="h1" display="block" font="title1">
          Modal - Three Panels
        </Text>
      </Box>
      <Box>
        <IconButton transparent aria-label="Close modal" name="close" onClick={setVisibleToFalse} />
      </Box>
    </HStack>;
  const mainContent = <HStack flexGrow={1} overflow="hidden">
      <VStack background="bgAlternate" height="100%" overflow="auto" padding={4} width={360}>
        <Text as="p" display="block" font="body">
          Left Panel
        </Text>
      </VStack>
      <VStack flexGrow={1} overflow="auto" padding={4}>
        <Text as="p" display="block" font="body">
          Center Panel
          <br />
          {loremIpsum}
        </Text>
      </VStack>
      <VStack background="bgAlternate" height="100%" overflow="auto" padding={4} width={360}>
        <Text as="p" display="block" font="body">
          Right Panel
        </Text>
      </VStack>
    </HStack>;
  return <>
      <Button ref={triggerRef} onClick={setVisibleToTrue}>
        Open Modal (Left + Center + Right)
      </Button>
      <FullscreenModalLayout onRequestClose={setVisibleToFalse} visible={visible}>
        <VStack background="bg" height="100%" width="100%">
          {headerContent}
          {mainContent}
        </VStack>
      </FullscreenModalLayout>
    </>;
}`,...x.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`() => {
  const [visible, setVisible] = useState(true);
  const setVisibleToTrue = useCallback(() => setVisible(true), []);
  const setVisibleToFalse = useCallback(() => setVisible(false), []);
  const {
    triggerRef
  } = useTriggerFocus();
  const headerContent = <HStack borderedBottom alignItems="center" paddingX={4} paddingY={2}>
      <Box paddingEnd={3} width={80}>
        <LogoMark size={32} />
      </Box>
      <Box flexGrow={1}>
        <Text as="h1" display="block" font="title1">
          Modal - All Panels
        </Text>
      </Box>
      <Box>
        <IconButton transparent aria-label="Close modal" name="close" onClick={setVisibleToFalse} />
      </Box>
    </HStack>;
  const mainContent = <VStack flexGrow={1} overflow="hidden">
      <VStack background="bgAlternate" padding={2}>
        <Text as="p" color="fg" display="block" font="body">
          Top Panel (e.g., Breadcrumbs, Progress)
        </Text>
      </VStack>
      <HStack flexGrow={1} overflow="hidden">
        <VStack background="bgAlternate" height="100%" overflow="auto" padding={4} width={360}>
          <Text as="p" display="block" font="body">
            Left Panel
          </Text>
        </VStack>
        <VStack flexGrow={1} overflow="auto" padding={4}>
          <Text as="p" display="block" font="body">
            Center Panel
            <br />
            {loremIpsum}
          </Text>
        </VStack>
        <VStack background="bgAlternate" height="100%" overflow="auto" padding={4} width={360}>
          <Text as="p" display="block" font="body">
            Right Panel
          </Text>
        </VStack>
      </HStack>
      <HStack borderedTop background="bgAlternate" padding={2}>
        <Text as="p" display="block" font="body">
          Bottom Panel (e.g., Footer, Actions)
        </Text>
      </HStack>
    </VStack>;
  return <>
      <Button ref={triggerRef} onClick={setVisibleToTrue}>
        Open Modal (All Panels)
      </Button>
      <FullscreenModalLayout onRequestClose={setVisibleToFalse} visible={visible}>
        <VStack background="bg" height="100%" width="100%">
          {headerContent}
          {mainContent}
        </VStack>
      </FullscreenModalLayout>
    </>;
}`,...f.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`() => {
  const [visible, setVisible] = useState(true);
  const setVisibleToTrue = useCallback(() => setVisible(true), []);
  const setVisibleToFalse = useCallback(() => setVisible(false), []);
  const {
    triggerRef
  } = useTriggerFocus();
  const feedCard = <FeedCard author="Earn crypto" avatar="https://images.ctfassets.net/q5ulk4bp65r7/3rv8jr1B1Z1dZ2EhHqo7dp/e74ddbf1cd4836b83d34fe5cec351d78/Alt-Coin.png?w=768&fm=png" description="Amp is an Ethereum token that can be used as collateral to provide instant settlement assurance any time value is transferred." headerAction={{
    name: 'more',
    variant: 'foregroundMuted'
  }} image="https://images.ctfassets.net/q5ulk4bp65r7/3rv8jr1B1Z1dZ2EhHqo7dp/e74ddbf1cd4836b83d34fe5cec351d78/Alt-Coin.png?w=768&fm=png" mediaPlacement="above" metadata="Dec 18" title="Learn AMP. Earn $3 in AMP." />;
  const listcell = <ListCell description="BTC" detail="$45,123" subdetail="+4.55%" title="Bitcoin" variant="positive" />;
  const storyPrimaryContent = <VStack paddingX={4}>
      <Text as="h1" display="block" font="title1">
        Fullscreen Modal
      </Text>
      <Text as="p" display="block" font="body">
        This is a test Fullscreen Modal with components composition.
      </Text>
      {feedCard}
      {listcell}
      {listcell}
      {listcell}
    </VStack>;
  const storySecondaryContent = <Box background="bgAlternate" borderRadius={200} elevation={1} overflow="hidden">
      <Accordion defaultActiveKey="2">
        <AccordionItem itemKey="1" subtitle="subtitle1" title="Accordion #1">
          <Text as="p" display="block" font="body">
            {loremIpsum}
          </Text>
        </AccordionItem>
        <AccordionItem itemKey="2" subtitle="subtitle2" title="Accordion #2">
          <Text as="p" display="block" font="body">
            {loremIpsum}
          </Text>
        </AccordionItem>
      </Accordion>
    </Box>;
  const headerContent = <HStack borderedBottom alignItems="center" paddingX={4} paddingY={2}>
      <Box paddingEnd={3} width={80}>
        <LogoMark size={32} />
      </Box>
      <Box flexGrow={1}>
        <Text as="h1" display="block" font="title1">
          Example Modal
        </Text>
      </Box>
      <Box>
        <IconButton transparent aria-label="Close modal" name="close" onClick={setVisibleToFalse} />
      </Box>
    </HStack>;
  const mainContent = <VStack flexGrow={1} overflow="auto">
      <VStack borderedBottom paddingX={4} paddingY={2}>
        <HStack gap={2}>
          <Tag colorScheme="green" intent="promotional">
            Green
          </Tag>
          <Tag colorScheme="blue" intent="promotional">
            Blue
          </Tag>
          <Tag colorScheme="yellow" intent="promotional">
            Yellow
          </Tag>
          <Tag colorScheme="purple" intent="promotional">
            Purple
          </Tag>
          <Tag colorScheme="red" intent="promotional">
            Red
          </Tag>
          <Tag colorScheme="gray" intent="promotional">
            Gray
          </Tag>
        </HStack>
      </VStack>
      <HStack>
        <VStack alignSelf="start" flexShrink={0} padding={4} width={360}>
          {storySecondaryContent}
        </VStack>
        <VStack flexGrow={1} padding={4}>
          {storyPrimaryContent}
        </VStack>
        <VStack alignSelf="start" flexShrink={0} padding={4} width={360}>
          {storySecondaryContent}
        </VStack>
      </HStack>
      <HStack borderedTop justifyContent="flex-end" padding={2}>
        <ButtonGroup>
          <Button onClick={() => {
          alert('Cancel clicked');
        }} variant="secondary">
            Cancel
          </Button>
          <Button onClick={() => {
          alert('OK clicked');
        }} variant="primary">
            OK
          </Button>
        </ButtonGroup>
      </HStack>
    </VStack>;
  return <>
      <Button ref={triggerRef} onClick={setVisibleToTrue}>
        Open Example Modal
      </Button>
      <FullscreenModalLayout onRequestClose={setVisibleToFalse} visible={visible}>
        <VStack background="bg" height="100%" width="100%">
          {headerContent}
          {mainContent}
        </VStack>
      </FullscreenModalLayout>
    </>;
}`,...k.parameters?.docs?.source}}};const Xe=["BasicCenterPanel","TwoColumnLeftCenter","ThreeColumn","WithAllPanels","Example"];export{g as BasicCenterPanel,k as Example,x as ThreeColumn,h as TwoColumnLeftCenter,f as WithAllPanels,Xe as __namedExportsOrder,Oe as default};
