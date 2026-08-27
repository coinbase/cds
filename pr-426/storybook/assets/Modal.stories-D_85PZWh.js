import{r as c,j as e}from"./iframe-BXWLBCkp.js";import{u as S}from"./useOverlay-D60OPcoq.js";import{B as s}from"./Button-W9Shg4T1.js";import{L as l}from"./LoremIpsum-B4MDYpOX.js";import{M as C}from"./Modal-C6ACOq11.js";import{M as y,a as j,b as k}from"./ModalHeader-BffLEBHD.js";import"./preload-helper-D9Z9MdNV.js";import"./Icon-CgDQ3NQp.js";import"./useTheme-BJazYlse.js";import"./Spinner-BAI0lrZ-.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./Text-Ch_dBU4v.js";import"./loremIpsum-CjdvNg3u.js";import"./OverlayContentContext-hT53AGt-.js";import"./useA11yLabels-CsHGrhyH.js";import"./VStack-CnEfMFeL.js";import"./useMotionProps-CS-LE6l8.js";import"./utils-CwomCnHN.js";import"./tokens-BwScSksM.js";import"./FocusTrap-90tMQkIg.js";import"./useMergeRefs-DR4sGa7m.js";import"./debounce-fynzmAtJ.js";import"./ModalWrapper-D-DvdkD-.js";import"./NewAnimatePresence-BbA2hDPb.js";import"./index-B2twlf45.js";import"./motion-minimal-SVRWJYUW.js";import"./use-unmount-effect-5QIafHMH.js";import"./useScrollBlocker-4Da9qMHo.js";import"./Overlay-XiDupmt3.js";import"./Portal-tAONErW2.js";import"./HStack-B6p8qBpp.js";import"./interactableHeight-DPdDzpO8.js";import"./IconButton-OIX0AFCz.js";const O=()=>{const{open:o,close:a}=S("modal_");return c.useMemo(()=>({openModal:o,closeModal:a}),[o,a])},pe={title:"Components/Modal",component:C},i=()=>({triggerRef:c.useRef(null)}),I=({children:o,disablePortal:a,visible:r,hideDividers:t,triggerRef:n,enableBackButton:d,width:h,maxWidth:u,focusTabIndexElements:R})=>{const[F,m]=c.useState(r??!0);return e.jsxs(e.Fragment,{children:[e.jsx(s,{ref:n,onClick:()=>m(!0),children:"Open Modal"}),e.jsxs(C,{disablePortal:a,focusTabIndexElements:R,hideDividers:t,maxWidth:u,onRequestClose:()=>m(!1),visible:F,width:h,children:[e.jsx(y,{backAccessibilityLabel:"Back",closeAccessibilityLabel:"Close",onBackButtonClick:d?()=>m(!1):void 0,testID:"Basic Modal Test ID",title:"Basic Modal"}),e.jsx(j,{tabIndex:0,testID:"modal-body",children:o}),e.jsx(k,{primaryAction:e.jsx(s,{onClick:()=>m(!1),children:"Save"}),secondaryAction:e.jsx(s,{onClick:()=>m(!1),variant:"secondary",children:"Cancel"})})]})]})},L=({children:o,triggerRef:a})=>{const{openModal:r,closeModal:t}=O(),n=c.useCallback(()=>r(e.jsxs(C,{visible:!0,onRequestClose:t,children:[e.jsx(y,{closeAccessibilityLabel:"Close",title:"Default Modal"}),e.jsx(j,{children:o}),e.jsx(k,{primaryAction:e.jsx(s,{onClick:t,children:"Save"}),secondaryAction:e.jsx(s,{onClick:t,variant:"secondary",children:"Cancel"})})]})),[r,t,o]);return c.useEffect(()=>(n(),()=>t()),[t,n]),e.jsx(s,{ref:a,onClick:n,children:"Open Modal"})},p=()=>{const{triggerRef:o}=i();return e.jsx(I,{triggerRef:o,children:e.jsx(l,{})})},M=()=>{const{triggerRef:o}=i();return e.jsx(I,{triggerRef:o,width:300,children:e.jsx(l,{})})},g=()=>{const{triggerRef:o}=i();return e.jsx(I,{enableBackButton:!0,triggerRef:o,children:e.jsx(l,{})})},f=()=>{const{triggerRef:o}=i();return e.jsx(I,{disablePortal:!0,triggerRef:o,children:e.jsx(l,{})})},x=()=>{const{triggerRef:o}=i();return e.jsx(I,{focusTabIndexElements:!0,triggerRef:o,children:e.jsx(l,{repeat:30})})},B=()=>{const{triggerRef:o}=i();return e.jsx(L,{triggerRef:o,children:e.jsx(l,{})})},b=()=>{const{triggerRef:o}=i(),[a,r]=c.useState(!0),[t,n]=c.useState(!1),d=()=>{r(!1),o?.current?.focus()},h=()=>{r(!1),n(!0)},u=()=>{n(!1),o?.current?.focus()},R=()=>{n(!1),r(!0)};return e.jsxs(e.Fragment,{children:[e.jsx(s,{ref:o,onClick:()=>r(!0),children:"Open Modal"}),e.jsxs(C,{onRequestClose:d,restoreFocusOnUnmount:!1,visible:a,children:[e.jsx(y,{backAccessibilityLabel:"Back",closeAccessibilityLabel:"Close",onBackButtonClick:d,testID:"First Modal Test ID",title:"First Modal"}),e.jsx(j,{tabIndex:0,testID:"first-modal-body",children:e.jsx(l,{})}),e.jsx(k,{primaryAction:e.jsx(s,{onClick:h,children:"Next"}),secondaryAction:e.jsx(s,{onClick:d,variant:"secondary",children:"Cancel"})})]}),e.jsxs(C,{onRequestClose:u,restoreFocusOnUnmount:!1,visible:t,children:[e.jsx(y,{backAccessibilityLabel:"Back",closeAccessibilityLabel:"Close",onBackButtonClick:R,testID:"Second Modal Test ID",title:"Second Modal"}),e.jsx(j,{tabIndex:0,testID:"second-modal-body",children:e.jsx(l,{})}),e.jsx(k,{primaryAction:e.jsx(s,{onClick:u,children:"Close"}),secondaryAction:e.jsx(s,{onClick:u,variant:"secondary",children:"Cancel"})})]})]})};p.__docgenInfo={description:"",methods:[],displayName:"BasicModal"};M.__docgenInfo={description:"",methods:[],displayName:"CustomWidthModal"};g.__docgenInfo={description:"",methods:[],displayName:"BackButtonModal"};f.__docgenInfo={description:"",methods:[],displayName:"ModalWithoutPortal"};x.__docgenInfo={description:"",methods:[],displayName:"LongModal"};B.__docgenInfo={description:"",methods:[],displayName:"PortalModal"};b.__docgenInfo={description:"",methods:[],displayName:"ChainedModals"};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => {
  const {
    triggerRef
  } = useTriggerFocus();
  return <BasicModalExample triggerRef={triggerRef}>
      <LoremIpsum />
    </BasicModalExample>;
}`,...p.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`() => {
  const {
    triggerRef
  } = useTriggerFocus();
  return <BasicModalExample triggerRef={triggerRef} width={300}>
      <LoremIpsum />
    </BasicModalExample>;
}`,...M.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => {
  const {
    triggerRef
  } = useTriggerFocus();
  return <BasicModalExample enableBackButton triggerRef={triggerRef}>
      <LoremIpsum />
    </BasicModalExample>;
}`,...g.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`() => {
  const {
    triggerRef
  } = useTriggerFocus();
  return <BasicModalExample disablePortal triggerRef={triggerRef}>
      <LoremIpsum />
    </BasicModalExample>;
}`,...f.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`() => {
  const {
    triggerRef
  } = useTriggerFocus();
  return <BasicModalExample focusTabIndexElements triggerRef={triggerRef}>
      <LoremIpsum repeat={30} />
    </BasicModalExample>;
}`,...x.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`() => {
  const {
    triggerRef
  } = useTriggerFocus();
  return <PortalModalExample triggerRef={triggerRef}>
      <LoremIpsum />
    </PortalModalExample>;
}`,...B.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`() => {
  const {
    triggerRef
  } = useTriggerFocus();
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(true);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const closeFirstModal = () => {
    setIsFirstModalOpen(false);
    triggerRef?.current?.focus();
  };
  const openSecondModal = () => {
    setIsFirstModalOpen(false);
    setIsSecondModalOpen(true);
  };
  const closeSecondModal = () => {
    setIsSecondModalOpen(false);
    triggerRef?.current?.focus();
  };
  const goBackToFirstModal = () => {
    setIsSecondModalOpen(false);
    setIsFirstModalOpen(true);
  };
  return <>
      <Button ref={triggerRef} onClick={() => setIsFirstModalOpen(true)}>
        Open Modal
      </Button>
      <Modal onRequestClose={closeFirstModal} restoreFocusOnUnmount={false} visible={isFirstModalOpen}>
        <ModalHeader backAccessibilityLabel="Back" closeAccessibilityLabel="Close" onBackButtonClick={closeFirstModal} testID="First Modal Test ID" title="First Modal" />
        <ModalBody tabIndex={0} testID="first-modal-body">
          <LoremIpsum />
        </ModalBody>
        <ModalFooter primaryAction={<Button onClick={openSecondModal}>Next</Button>} secondaryAction={<Button onClick={closeFirstModal} variant="secondary">
              Cancel
            </Button>} />
      </Modal>
      <Modal onRequestClose={closeSecondModal} restoreFocusOnUnmount={false} visible={isSecondModalOpen}>
        <ModalHeader backAccessibilityLabel="Back" closeAccessibilityLabel="Close" onBackButtonClick={goBackToFirstModal} testID="Second Modal Test ID" title="Second Modal" />
        <ModalBody tabIndex={0} testID="second-modal-body">
          <LoremIpsum />
        </ModalBody>
        <ModalFooter primaryAction={<Button onClick={closeSecondModal}>Close</Button>} secondaryAction={<Button onClick={closeSecondModal} variant="secondary">
              Cancel
            </Button>} />
      </Modal>
    </>;
}`,...b.parameters?.docs?.source}}};const Me=["BasicModal","CustomWidthModal","BackButtonModal","ModalWithoutPortal","LongModal","PortalModal","ChainedModals"];export{g as BackButtonModal,p as BasicModal,b as ChainedModals,M as CustomWidthModal,x as LongModal,f as ModalWithoutPortal,B as PortalModal,Me as __namedExportsOrder,pe as default};
