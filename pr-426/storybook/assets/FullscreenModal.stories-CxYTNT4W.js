import{r as t,j as e,B as b}from"./iframe-CYDANtMt.js";import{l as c}from"./loremIpsum-CjdvNg3u.js";import{B as m}from"./Button-DPtA13Wn.js";import{F as A}from"./FeedCard-omDZ6Mzr.js";import{L as v}from"./ListCell-CZflgNsr.js";import{T as n}from"./Text-0g3rWpAf.js";import{F as p}from"./FullscreenModal-BXiygEv8.js";import{A as j,a as T}from"./AccordionItem-Dhy7Qryg.js";import{V as F}from"./VStack-iXgNewwv.js";import"./preload-helper-D9Z9MdNV.js";import"./Icon-DRxKkZdt.js";import"./useTheme-C_Ehsh33.js";import"./Spinner-CXotWqqb.js";import"./Pressable-BvczHaFK.js";import"./isArray-BJmyNVUi.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";import"./IconButton-D-CYL-b9.js";import"./HStack-Fh-9TmPm.js";import"./CardHeader-DoQ3kXwy.js";import"./card-CqcYFcP-.js";import"./convertDimensionToSize-B6MeOypY.js";import"./sizing-Do56D2dQ.js";import"./Avatar-FudKOIuF.js";import"./RemoteImage-S3YFINhn.js";import"./Pictogram-BOyJGVDK.js";import"./versionMap-CcI7tU1w.js";import"./createIllustration-CSKQDVzw.js";import"./SpotSquare-n4zoXJGu.js";import"./versionMap-Bfu_9WQc.js";import"./LikeButton-C8Jj3gY_.js";import"./interactableHeight-DPdDzpO8.js";import"./useCellSpacing-BH3_o_ol.js";import"./Cell-D1A-2vVj.js";import"./CellAccessory-Cln9vUz5.js";import"./isRtl-CGZsgYct.js";import"./useA11yLabels-Ci9cQgFs.js";import"./LogoMark-CqIA3pam.js";import"./FullscreenModalLayout-PXKMm23p.js";import"./OverlayContentContext-D3LfdOuR.js";import"./useMotionProps-BF3bCUsm.js";import"./utils-CM_X5is-.js";import"./tokens-BwScSksM.js";import"./FocusTrap-D5jofIBF.js";import"./useMergeRefs-DR4sGa7m.js";import"./debounce-fynzmAtJ.js";import"./Overlay-BrSXLw2H.js";import"./motion-minimal-B1h7XI-_.js";import"./ModalWrapper-TkjI7R_Y.js";import"./NewAnimatePresence-BIvSMOo2.js";import"./index-DaxQGrHc.js";import"./use-unmount-effect-DjWyEMV9.js";import"./useScrollBlocker-smLDx_Od.js";import"./Portal-BNKVVywf.js";import"./Divider-CG0S6-JI.js";import"./AnimatedCaret-R2z7TxpB.js";import"./collapsible-BAneA-61.js";import"./context-C9K9uJvD.js";import"./index-CAK1E_4V.js";import"./Collapsible-PtwHvxc0.js";const Pe={title:"Components/FullscreenModal",component:p,parameters:{a11y:{config:{rules:[{id:"heading-order",selector:"*:not(h3)"}]}}}},u=()=>({triggerRef:t.useRef(null)}),B={justifyContent:"center",marginLeft:"auto"},y=()=>{const[o,s]=t.useState(!0),i=t.useCallback(()=>s(!0),[]),r=t.useCallback(()=>s(!1),[]),{triggerRef:l}=u(),a=e.jsx(b,{background:"bgAlternate",height:800,children:e.jsxs(n,{as:"p",display:"block",font:"body",children:["Primary Content ",c]})}),d=e.jsx(b,{background:"bgAlternate",height:800,children:e.jsxs(n,{as:"p",display:"block",font:"body",children:["Secondary Content ",c]})});return e.jsxs(e.Fragment,{children:[e.jsx(m,{ref:l,onClick:i,children:"Open Modal"}),e.jsx(p,{closeAccessibilityLabel:"Close modal",onRequestClose:r,primaryContent:a,secondaryContent:d,title:"Modal title",visible:o})]})},g=()=>{const[o,s]=t.useState(!0),i=t.useCallback(()=>s(!1),[]),r=t.useCallback(()=>s(!0),[]),{triggerRef:l}=u(),a=e.jsx(b,{background:"bgAlternate",height:800,children:e.jsxs(n,{as:"p",display:"block",font:"body",children:["Primary Content ",c]})}),d=e.jsx(b,{background:"bgAlternate",height:800,children:e.jsxs(n,{as:"p",display:"block",font:"body",children:["Secondary Content ",c]})});return e.jsxs(e.Fragment,{children:[e.jsx(m,{ref:l,onClick:r,children:"Open Modal"}),e.jsx(p,{accessibilityLabel:"Modal context info",closeAccessibilityLabel:"Close modal",onRequestClose:i,primaryContent:a,secondaryContent:d,visible:o})]})},C=()=>{const[o,s]=t.useState(!0),i=t.useCallback(()=>s(!1),[]),r=t.useCallback(()=>s(!0),[]),{triggerRef:l}=u(),a=e.jsx(b,{background:"bgAlternate",height:800,children:e.jsxs(n,{as:"p",display:"block",font:"body",children:["Primary Content ",c]})});return e.jsxs(e.Fragment,{children:[e.jsx(m,{ref:l,onClick:r,children:"Open Modal"}),e.jsx(p,{closeAccessibilityLabel:"Close modal",onRequestClose:i,primaryContent:a,title:"Modal title",visible:o})]})},f=()=>{const[o,s]=t.useState(!0),i=t.useCallback(()=>s(!0),[]),r=t.useCallback(()=>s(!1),[]),{triggerRef:l}=u(),a=e.jsx(A,{author:"Earn crypto",avatar:"https://images.ctfassets.net/q5ulk4bp65r7/3rv8jr1B1Z1dZ2EhHqo7dp/e74ddbf1cd4836b83d34fe5cec351d78/Alt-Coin.png?w=768&fm=png",description:"Amp is an Ethereum token that can be used as collateral to provide instant settlement assurance any time value is transferred.",headerAction:{name:"more",variant:"foregroundMuted"},image:"https://images.ctfassets.net/q5ulk4bp65r7/3rv8jr1B1Z1dZ2EhHqo7dp/e74ddbf1cd4836b83d34fe5cec351d78/Alt-Coin.png?w=768&fm=png",mediaPlacement:"above",metadata:"Dec 18",title:"Learn AMP. Earn $3 in AMP."}),d=e.jsx(v,{description:"BTC",detail:"$45,123",subdetail:"+4.55%",title:"Bitcoin",variant:"positive"}),k=e.jsxs(F,{children:[e.jsx(n,{as:"h1",display:"block",font:"title1",children:"Fullscreen Modal"}),e.jsx(n,{as:"p",display:"block",font:"body",children:"This is a test Fullscreen Modal with components composition."}),a,d,d,d]}),V=e.jsx(b,{borderRadius:200,elevation:1,overflow:"hidden",children:e.jsxs(j,{defaultActiveKey:"2",children:[e.jsx(T,{itemKey:"1",subtitle:"subtitle1",title:"Accordion #1",children:e.jsx(n,{as:"p",display:"block",font:"body",children:c})}),e.jsx(T,{itemKey:"2",subtitle:"subtitle2",title:"Accordion #2",children:e.jsx(n,{as:"p",display:"block",font:"body",children:c})})]})});return e.jsxs(e.Fragment,{children:[e.jsx(m,{ref:l,onClick:i,children:"Open Modal"}),e.jsx(p,{closeAccessibilityLabel:"Close modal",onRequestClose:r,primaryContent:k,secondaryContent:V,title:"Modal title",visible:o})]})},h=()=>{const[o,s]=t.useState(!0),i=t.useCallback(()=>s(!1),[]),r=t.useCallback(()=>s(!0),[]),{triggerRef:l}=u(),a=e.jsx(b,{background:"bgAlternate",height:800,children:e.jsxs(n,{as:"p",display:"block",font:"body",children:["Primary Content ",c]})}),d=e.jsx(b,{background:"bgAlternate",height:800,children:e.jsxs(n,{as:"p",display:"block",font:"body",children:["Secondary Content ",c]})});return e.jsxs(e.Fragment,{children:[e.jsx(m,{ref:l,onClick:r,children:"Open Modal"}),e.jsx(p,{showSecondaryContentDivider:!0,closeAccessibilityLabel:"Close modal",onRequestClose:i,primaryContent:a,secondaryContent:d,title:"Modal title",visible:o})]})},x=()=>{const[o,s]=t.useState(!0),i=t.useCallback(()=>s(!1),[]),r=t.useCallback(()=>s(!0),[]),{triggerRef:l}=u(),a=e.jsx(b,{background:"bgAlternate",height:800,children:e.jsxs(n,{as:"p",display:"block",font:"body",children:["Primary Content ",c]})});return e.jsxs(e.Fragment,{children:[e.jsx(m,{ref:l,onClick:r,children:"Open Modal"}),e.jsx(p,{closeAccessibilityLabel:"Close modal",contentStyle:B,onRequestClose:i,primaryContent:a,title:"Modal title",visible:o})]})};y.__docgenInfo={description:"",methods:[],displayName:"Basic"};g.__docgenInfo={description:"",methods:[],displayName:"NoTitle"};C.__docgenInfo={description:"",methods:[],displayName:"NoSecondary"};f.__docgenInfo={description:"",methods:[],displayName:"Example"};h.__docgenInfo={description:"",methods:[],displayName:"SecondaryContentDivider"};x.__docgenInfo={description:"",methods:[],displayName:"CenterPrimary"};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => {
  const [visible, setVisible] = useState(true);
  const setVisibleToTrue = useCallback(() => setVisible(true), []);
  const setVisibleToFalse = useCallback(() => setVisible(false), []);
  const {
    triggerRef
  } = useTriggerFocus();
  const primaryContent = <Box background="bgAlternate" height={800}>
      <Text as="p" display="block" font="body">
        Primary Content {loremIpsum}
      </Text>
    </Box>;
  const secondaryContent = <Box background="bgAlternate" height={800}>
      <Text as="p" display="block" font="body">
        Secondary Content {loremIpsum}
      </Text>
    </Box>;
  return <>
      <Button ref={triggerRef} onClick={setVisibleToTrue}>
        Open Modal
      </Button>
      <FullscreenModal closeAccessibilityLabel="Close modal" onRequestClose={setVisibleToFalse} primaryContent={primaryContent} secondaryContent={secondaryContent} title="Modal title" visible={visible} />
    </>;
}`,...y.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => {
  const [visible, setVisible] = useState(true);
  const setVisibleToFalse = useCallback(() => setVisible(false), []);
  const setVisibleToTrue = useCallback(() => setVisible(true), []);
  const {
    triggerRef
  } = useTriggerFocus();
  const primaryContent = <Box background="bgAlternate" height={800}>
      <Text as="p" display="block" font="body">
        Primary Content {loremIpsum}
      </Text>
    </Box>;
  const secondaryContent = <Box background="bgAlternate" height={800}>
      <Text as="p" display="block" font="body">
        Secondary Content {loremIpsum}
      </Text>
    </Box>;
  return <>
      <Button ref={triggerRef} onClick={setVisibleToTrue}>
        Open Modal
      </Button>
      <FullscreenModal accessibilityLabel="Modal context info" closeAccessibilityLabel="Close modal" onRequestClose={setVisibleToFalse} primaryContent={primaryContent} secondaryContent={secondaryContent} visible={visible} />
    </>;
}`,...g.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`() => {
  const [visible, setVisible] = useState(true);
  const setVisibleToFalse = useCallback(() => setVisible(false), []);
  const setVisibleToTrue = useCallback(() => setVisible(true), []);
  const {
    triggerRef
  } = useTriggerFocus();
  const primaryContent = <Box background="bgAlternate" height={800}>
      <Text as="p" display="block" font="body">
        Primary Content {loremIpsum}
      </Text>
    </Box>;
  return <>
      <Button ref={triggerRef} onClick={setVisibleToTrue}>
        Open Modal
      </Button>
      <FullscreenModal closeAccessibilityLabel="Close modal" onRequestClose={setVisibleToFalse} primaryContent={primaryContent} title="Modal title" visible={visible} />
    </>;
}`,...C.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`() => {
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
  const primaryContent = <VStack>
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
  const secondaryContent = <Box borderRadius={200} elevation={1} overflow="hidden">
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
  return <>
      <Button ref={triggerRef} onClick={setVisibleToTrue}>
        Open Modal
      </Button>
      <FullscreenModal closeAccessibilityLabel="Close modal" onRequestClose={setVisibleToFalse} primaryContent={primaryContent} secondaryContent={secondaryContent} title="Modal title" visible={visible} />
    </>;
}`,...f.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => {
  const [visible, setVisible] = useState(true);
  const setVisibleToFalse = useCallback(() => setVisible(false), []);
  const setVisibleToTrue = useCallback(() => setVisible(true), []);
  const {
    triggerRef
  } = useTriggerFocus();
  const primaryContent = <Box background="bgAlternate" height={800}>
      <Text as="p" display="block" font="body">
        Primary Content {loremIpsum}
      </Text>
    </Box>;
  const secondaryContent = <Box background="bgAlternate" height={800}>
      <Text as="p" display="block" font="body">
        Secondary Content {loremIpsum}
      </Text>
    </Box>;
  return <>
      <Button ref={triggerRef} onClick={setVisibleToTrue}>
        Open Modal
      </Button>
      <FullscreenModal showSecondaryContentDivider closeAccessibilityLabel="Close modal" onRequestClose={setVisibleToFalse} primaryContent={primaryContent} secondaryContent={secondaryContent} title="Modal title" visible={visible} />
    </>;
}`,...h.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`() => {
  const [visible, setVisible] = useState(true);
  const setVisibleToFalse = useCallback(() => setVisible(false), []);
  const setVisibleToTrue = useCallback(() => setVisible(true), []);
  const {
    triggerRef
  } = useTriggerFocus();
  const primaryContent = <Box background="bgAlternate" height={800}>
      <Text as="p" display="block" font="body">
        Primary Content {loremIpsum}
      </Text>
    </Box>;
  return <>
      <Button ref={triggerRef} onClick={setVisibleToTrue}>
        Open Modal
      </Button>
      <FullscreenModal closeAccessibilityLabel="Close modal" contentStyle={contentStyle} onRequestClose={setVisibleToFalse} primaryContent={primaryContent} title="Modal title" visible={visible} />
    </>;
}`,...x.parameters?.docs?.source}}};const Ee=["Basic","NoTitle","NoSecondary","Example","SecondaryContentDivider","CenterPrimary"];export{y as Basic,x as CenterPrimary,f as Example,C as NoSecondary,g as NoTitle,h as SecondaryContentDivider,Ee as __namedExportsOrder,Pe as default};
