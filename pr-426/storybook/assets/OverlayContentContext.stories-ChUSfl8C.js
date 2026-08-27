import{r as c,j as e}from"./iframe-BXWLBCkp.js";import{O as m,u}from"./OverlayContentContext-hT53AGt-.js";import{V as o}from"./VStack-CnEfMFeL.js";import{F as p}from"./FullscreenModal-DejEVFgq.js";import{M as h}from"./Modal-C6ACOq11.js";import{O as S}from"./Overlay-XiDupmt3.js";import"./preload-helper-D9Z9MdNV.js";import"./useA11yLabels-CsHGrhyH.js";import"./LogoMark-C448m09K.js";import"./useTheme-BJazYlse.js";import"./Text-Ch_dBU4v.js";import"./HStack-B6p8qBpp.js";import"./IconButton-OIX0AFCz.js";import"./Button-W9Shg4T1.js";import"./Icon-CgDQ3NQp.js";import"./Spinner-BAI0lrZ-.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./FullscreenModalLayout-BAtM9Cva.js";import"./useMotionProps-CS-LE6l8.js";import"./utils-CwomCnHN.js";import"./tokens-BwScSksM.js";import"./FocusTrap-90tMQkIg.js";import"./useMergeRefs-DR4sGa7m.js";import"./debounce-fynzmAtJ.js";import"./ModalWrapper-D-DvdkD-.js";import"./NewAnimatePresence-BbA2hDPb.js";import"./index-B2twlf45.js";import"./motion-minimal-SVRWJYUW.js";import"./use-unmount-effect-5QIafHMH.js";import"./useScrollBlocker-4Da9qMHo.js";import"./Portal-tAONErW2.js";const Y={title:"Components/OverlayContentContext",component:m},l=()=>{const{isOverlay:s,isModal:t,isDrawer:d}=u();return e.jsxs(o,{children:[e.jsxs("div",{children:["isOverlay: ",String(s)]}),e.jsxs("div",{children:["isModal: ",String(t)]}),e.jsxs("div",{children:["isDrawer: ",String(d)]})]})},n=()=>{const[s,t]=c.useState(!1);return e.jsxs(o,{children:[e.jsx("button",{onClick:()=>t(!0),children:"Show Overlay"}),s&&e.jsx(S,{children:e.jsxs(o,{children:[e.jsx("button",{onClick:()=>t(!1),children:"Hide Overlay"}),e.jsx(l,{})]})})]})},r=()=>{const[s,t]=c.useState(!1);return e.jsxs(o,{children:[e.jsx("button",{onClick:()=>t(!0),children:"Show Modal"}),e.jsx(h,{onRequestClose:()=>t(!1),visible:s,children:e.jsxs(o,{children:[e.jsx("button",{onClick:()=>t(!1),children:"Hide Modal"}),e.jsx(l,{})]})})]})},a=()=>{const[s,t]=c.useState(!1);return e.jsxs(o,{children:[e.jsx("button",{onClick:()=>t(!0),children:"Show FullscreenModal"}),e.jsx(p,{onRequestClose:()=>t(!1),primaryContent:e.jsxs(o,{children:[e.jsx("button",{onClick:()=>t(!1),children:"Hide FullscreenModal"}),e.jsx(l,{})]}),visible:s})]})},i=()=>e.jsx(o,{children:e.jsx(l,{})}),x={a11y:{config:{rules:[{id:"aria-dialog-name",enabled:!1}]}}};r.parameters=x;n.__docgenInfo={description:"",methods:[],displayName:"InOverlay"};r.__docgenInfo={description:"",methods:[],displayName:"InModal"};a.__docgenInfo={description:"",methods:[],displayName:"InFullscreenModal"};i.__docgenInfo={description:"",methods:[],displayName:"WithoutProvider"};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => {
  const [show, setShow] = useState(false);
  return <VStack>
      <button onClick={() => setShow(true)}>Show Overlay</button>
      {show && <Overlay>
          <VStack>
            <button onClick={() => setShow(false)}>Hide Overlay</button>
            <ContextTest />
          </VStack>
        </Overlay>}
    </VStack>;
}`,...n.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => {
  const [show, setShow] = useState(false);
  return <VStack>
      <button onClick={() => setShow(true)}>Show Modal</button>
      <Modal onRequestClose={() => setShow(false)} visible={show}>
        <VStack>
          <button onClick={() => setShow(false)}>Hide Modal</button>
          <ContextTest />
        </VStack>
      </Modal>
    </VStack>;
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => {
  const [show, setShow] = useState(false);
  return <VStack>
      <button onClick={() => setShow(true)}>Show FullscreenModal</button>
      <FullscreenModal onRequestClose={() => setShow(false)} primaryContent={<VStack>
            <button onClick={() => setShow(false)}>Hide FullscreenModal</button>
            <ContextTest />
          </VStack>} visible={show} />
    </VStack>;
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
  return <VStack>
      <ContextTest />
    </VStack>;
}`,...i.parameters?.docs?.source}}};const Z=["InOverlay","InModal","InFullscreenModal","WithoutProvider"];export{a as InFullscreenModal,r as InModal,n as InOverlay,i as WithoutProvider,Z as __namedExportsOrder,Y as default};
