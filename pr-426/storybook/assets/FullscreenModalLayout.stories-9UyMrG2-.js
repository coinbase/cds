import{r as a,j as e,B as o}from"./iframe-BXWLBCkp.js";import{l as C}from"./loremIpsum-CjdvNg3u.js";import{F as A}from"./FeedCard-BsMTTmps.js";import{L as P}from"./ListCell-ptUFGvkT.js";import{L as y}from"./LogoMark-C448m09K.js";import{T as b}from"./Tag-Esl9ky3J.js";import{T as n}from"./Text-Ch_dBU4v.js";import{F as T}from"./FullscreenModalLayout-BAtM9Cva.js";import{B as M}from"./ButtonGroup-CH8icdlI.js";import{B as m}from"./Button-W9Shg4T1.js";import{V as t}from"./VStack-CnEfMFeL.js";import{H as l}from"./HStack-B6p8qBpp.js";import{I as j}from"./IconButton-OIX0AFCz.js";import{A as L,a as V}from"./AccordionItem-etqfy3lX.js";import"./preload-helper-D9Z9MdNV.js";import"./CardHeader-BXbQl7My.js";import"./card-CqcYFcP-.js";import"./convertDimensionToSize-B6MeOypY.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./useTheme-BJazYlse.js";import"./sizing-Do56D2dQ.js";import"./Avatar-BEPDWfa1.js";import"./RemoteImage-Lksm6NI7.js";import"./Pictogram-BmcSIU-q.js";import"./versionMap-CcI7tU1w.js";import"./createIllustration-B8-1WYve.js";import"./SpotSquare-BVPUrLCw.js";import"./versionMap-Bfu_9WQc.js";import"./LikeButton-BXLNhcr8.js";import"./interactableHeight-DPdDzpO8.js";import"./Icon-CgDQ3NQp.js";import"./useCellSpacing-BuZVtSR4.js";import"./Cell-CB_dChqK.js";import"./CellAccessory-BypMgxs5.js";import"./isRtl-Du0XdnX5.js";import"./OverlayContentContext-hT53AGt-.js";import"./useMotionProps-CS-LE6l8.js";import"./utils-CwomCnHN.js";import"./tokens-BwScSksM.js";import"./FocusTrap-90tMQkIg.js";import"./useMergeRefs-DR4sGa7m.js";import"./debounce-fynzmAtJ.js";import"./Overlay-XiDupmt3.js";import"./motion-minimal-SVRWJYUW.js";import"./ModalWrapper-D-DvdkD-.js";import"./NewAnimatePresence-BbA2hDPb.js";import"./index-B2twlf45.js";import"./use-unmount-effect-5QIafHMH.js";import"./useScrollBlocker-4Da9qMHo.js";import"./Portal-tAONErW2.js";import"./Spinner-BAI0lrZ-.js";import"./Divider-DIvJbvj9.js";import"./AnimatedCaret-DDAfukJC.js";import"./collapsible-BAneA-61.js";import"./context-Cc0ZOVig.js";import"./index-DoYuAu2r.js";import"./Collapsible-DRMWW50B.js";const Oe={title:"Components/FullscreenModalLayout",component:T,parameters:{}},S=()=>({triggerRef:a.useRef(null)}),g=()=>{const[d,r]=a.useState(!0),c=a.useCallback(()=>r(!0),[]),s=a.useCallback(()=>r(!1),[]),{triggerRef:p}=S(),u=e.jsxs(l,{borderedBottom:!0,alignItems:"center",paddingX:4,paddingY:2,children:[e.jsx(o,{paddingEnd:3,width:80,children:e.jsx(y,{size:32})}),e.jsx(o,{flexGrow:1,children:e.jsx(n,{as:"h1",display:"block",font:"title1",children:"Modal - Center Panel"})}),e.jsx(o,{children:e.jsx(j,{transparent:!0,"aria-label":"Close modal",name:"close",onClick:s})})]}),i=e.jsx(t,{flexGrow:1,overflow:"auto",padding:4,children:e.jsxs(n,{as:"p",display:"block",font:"body",children:["This is the main content area (Center Panel).",e.jsx("br",{}),C]})});return e.jsxs(e.Fragment,{children:[e.jsx(m,{ref:p,onClick:c,children:"Open Modal (Center Only)"}),e.jsx(T,{onRequestClose:s,visible:d,children:e.jsxs(t,{background:"bg",height:"100%",width:"100%",children:[u,i]})})]})};g.storyName="Basic (Center Panel)";const h=()=>{const[d,r]=a.useState(!0),c=a.useCallback(()=>r(!0),[]),s=a.useCallback(()=>r(!1),[]),{triggerRef:p}=S(),u=e.jsxs(l,{borderedBottom:!0,alignItems:"center",paddingX:4,paddingY:2,children:[e.jsx(o,{paddingEnd:3,width:80,children:e.jsx(y,{size:32})}),e.jsx(o,{flexGrow:1,children:e.jsx(n,{as:"h1",display:"block",font:"title1",children:"Modal - Left & Center Panels"})}),e.jsx(o,{children:e.jsx(j,{transparent:!0,"aria-label":"Close modal",name:"close",onClick:s})})]}),i=e.jsxs(l,{flexGrow:1,overflow:"hidden",children:[e.jsx(t,{background:"bgAlternate",height:"100%",overflow:"auto",padding:4,width:360,children:e.jsx(n,{as:"p",display:"block",font:"body",children:"Left Panel Content"})}),e.jsx(t,{flexGrow:1,overflow:"auto",padding:4,children:e.jsxs(n,{as:"p",display:"block",font:"body",children:["Center Panel Content",e.jsx("br",{}),C]})})]});return e.jsxs(e.Fragment,{children:[e.jsx(m,{ref:p,onClick:c,children:"Open Modal (Left + Center)"}),e.jsx(T,{onRequestClose:s,visible:d,children:e.jsxs(t,{background:"bg",height:"100%",width:"100%",children:[u,i]})})]})};h.storyName="Two Column (Left + Center)";const x=()=>{const[d,r]=a.useState(!0),c=a.useCallback(()=>r(!0),[]),s=a.useCallback(()=>r(!1),[]),{triggerRef:p}=S(),u=e.jsxs(l,{borderedBottom:!0,alignItems:"center",paddingX:4,paddingY:2,children:[e.jsx(o,{paddingEnd:3,width:80,children:e.jsx(y,{size:32})}),e.jsx(o,{flexGrow:1,children:e.jsx(n,{as:"h1",display:"block",font:"title1",children:"Modal - Three Panels"})}),e.jsx(o,{children:e.jsx(j,{transparent:!0,"aria-label":"Close modal",name:"close",onClick:s})})]}),i=e.jsxs(l,{flexGrow:1,overflow:"hidden",children:[e.jsx(t,{background:"bgAlternate",height:"100%",overflow:"auto",padding:4,width:360,children:e.jsx(n,{as:"p",display:"block",font:"body",children:"Left Panel"})}),e.jsx(t,{flexGrow:1,overflow:"auto",padding:4,children:e.jsxs(n,{as:"p",display:"block",font:"body",children:["Center Panel",e.jsx("br",{}),C]})}),e.jsx(t,{background:"bgAlternate",height:"100%",overflow:"auto",padding:4,width:360,children:e.jsx(n,{as:"p",display:"block",font:"body",children:"Right Panel"})})]});return e.jsxs(e.Fragment,{children:[e.jsx(m,{ref:p,onClick:c,children:"Open Modal (Left + Center + Right)"}),e.jsx(T,{onRequestClose:s,visible:d,children:e.jsxs(t,{background:"bg",height:"100%",width:"100%",children:[u,i]})})]})};x.storyName="Three Column (Left + Center + Right)";const f=()=>{const[d,r]=a.useState(!0),c=a.useCallback(()=>r(!0),[]),s=a.useCallback(()=>r(!1),[]),{triggerRef:p}=S(),u=e.jsxs(l,{borderedBottom:!0,alignItems:"center",paddingX:4,paddingY:2,children:[e.jsx(o,{paddingEnd:3,width:80,children:e.jsx(y,{size:32})}),e.jsx(o,{flexGrow:1,children:e.jsx(n,{as:"h1",display:"block",font:"title1",children:"Modal - All Panels"})}),e.jsx(o,{children:e.jsx(j,{transparent:!0,"aria-label":"Close modal",name:"close",onClick:s})})]}),i=e.jsxs(t,{flexGrow:1,overflow:"hidden",children:[e.jsx(t,{background:"bgAlternate",padding:2,children:e.jsx(n,{as:"p",color:"fg",display:"block",font:"body",children:"Top Panel (e.g., Breadcrumbs, Progress)"})}),e.jsxs(l,{flexGrow:1,overflow:"hidden",children:[e.jsx(t,{background:"bgAlternate",height:"100%",overflow:"auto",padding:4,width:360,children:e.jsx(n,{as:"p",display:"block",font:"body",children:"Left Panel"})}),e.jsx(t,{flexGrow:1,overflow:"auto",padding:4,children:e.jsxs(n,{as:"p",display:"block",font:"body",children:["Center Panel",e.jsx("br",{}),C]})}),e.jsx(t,{background:"bgAlternate",height:"100%",overflow:"auto",padding:4,width:360,children:e.jsx(n,{as:"p",display:"block",font:"body",children:"Right Panel"})})]}),e.jsx(l,{borderedTop:!0,background:"bgAlternate",padding:2,children:e.jsx(n,{as:"p",display:"block",font:"body",children:"Bottom Panel (e.g., Footer, Actions)"})})]});return e.jsxs(e.Fragment,{children:[e.jsx(m,{ref:p,onClick:c,children:"Open Modal (All Panels)"}),e.jsx(T,{onRequestClose:s,visible:d,children:e.jsxs(t,{background:"bg",height:"100%",width:"100%",children:[u,i]})})]})};f.storyName="All Panels";const k=()=>{const[d,r]=a.useState(!0),c=a.useCallback(()=>r(!0),[]),s=a.useCallback(()=>r(!1),[]),{triggerRef:p}=S(),u=e.jsx(A,{author:"Earn crypto",avatar:"https://images.ctfassets.net/q5ulk4bp65r7/3rv8jr1B1Z1dZ2EhHqo7dp/e74ddbf1cd4836b83d34fe5cec351d78/Alt-Coin.png?w=768&fm=png",description:"Amp is an Ethereum token that can be used as collateral to provide instant settlement assurance any time value is transferred.",headerAction:{name:"more",variant:"foregroundMuted"},image:"https://images.ctfassets.net/q5ulk4bp65r7/3rv8jr1B1Z1dZ2EhHqo7dp/e74ddbf1cd4836b83d34fe5cec351d78/Alt-Coin.png?w=768&fm=png",mediaPlacement:"above",metadata:"Dec 18",title:"Learn AMP. Earn $3 in AMP."}),i=e.jsx(P,{description:"BTC",detail:"$45,123",subdetail:"+4.55%",title:"Bitcoin",variant:"positive"}),B=e.jsxs(t,{paddingX:4,children:[e.jsx(n,{as:"h1",display:"block",font:"title1",children:"Fullscreen Modal"}),e.jsx(n,{as:"p",display:"block",font:"body",children:"This is a test Fullscreen Modal with components composition."}),u,i,i,i]}),w=e.jsx(o,{background:"bgAlternate",borderRadius:200,elevation:1,overflow:"hidden",children:e.jsxs(L,{defaultActiveKey:"2",children:[e.jsx(V,{itemKey:"1",subtitle:"subtitle1",title:"Accordion #1",children:e.jsx(n,{as:"p",display:"block",font:"body",children:C})}),e.jsx(V,{itemKey:"2",subtitle:"subtitle2",title:"Accordion #2",children:e.jsx(n,{as:"p",display:"block",font:"body",children:C})})]})}),v=e.jsxs(l,{borderedBottom:!0,alignItems:"center",paddingX:4,paddingY:2,children:[e.jsx(o,{paddingEnd:3,width:80,children:e.jsx(y,{size:32})}),e.jsx(o,{flexGrow:1,children:e.jsx(n,{as:"h1",display:"block",font:"title1",children:"Example Modal"})}),e.jsx(o,{children:e.jsx(j,{transparent:!0,"aria-label":"Close modal",name:"close",onClick:s})})]}),F=e.jsxs(t,{flexGrow:1,overflow:"auto",children:[e.jsx(t,{borderedBottom:!0,paddingX:4,paddingY:2,children:e.jsxs(l,{gap:2,children:[e.jsx(b,{colorScheme:"green",intent:"promotional",children:"Green"}),e.jsx(b,{colorScheme:"blue",intent:"promotional",children:"Blue"}),e.jsx(b,{colorScheme:"yellow",intent:"promotional",children:"Yellow"}),e.jsx(b,{colorScheme:"purple",intent:"promotional",children:"Purple"}),e.jsx(b,{colorScheme:"red",intent:"promotional",children:"Red"}),e.jsx(b,{colorScheme:"gray",intent:"promotional",children:"Gray"})]})}),e.jsxs(l,{children:[e.jsx(t,{alignSelf:"start",flexShrink:0,padding:4,width:360,children:w}),e.jsx(t,{flexGrow:1,padding:4,children:B}),e.jsx(t,{alignSelf:"start",flexShrink:0,padding:4,width:360,children:w})]}),e.jsx(l,{borderedTop:!0,justifyContent:"flex-end",padding:2,children:e.jsxs(M,{children:[e.jsx(m,{onClick:()=>{alert("Cancel clicked")},variant:"secondary",children:"Cancel"}),e.jsx(m,{onClick:()=>{alert("OK clicked")},variant:"primary",children:"OK"})]})})]});return e.jsxs(e.Fragment,{children:[e.jsx(m,{ref:p,onClick:c,children:"Open Example Modal"}),e.jsx(T,{onRequestClose:s,visible:d,children:e.jsxs(t,{background:"bg",height:"100%",width:"100%",children:[v,F]})})]})};k.storyName="Example";g.__docgenInfo={description:"",methods:[],displayName:"BasicCenterPanel"};h.__docgenInfo={description:"",methods:[],displayName:"TwoColumnLeftCenter"};x.__docgenInfo={description:"",methods:[],displayName:"ThreeColumn"};f.__docgenInfo={description:"",methods:[],displayName:"WithAllPanels"};k.__docgenInfo={description:"",methods:[],displayName:"Example"};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => {
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
