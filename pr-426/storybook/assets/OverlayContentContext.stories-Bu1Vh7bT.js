import{r as c,j as e}from"./iframe-CsG_6vZR.js";import{O as m,u}from"./OverlayContentContext-CpXWuzdo.js";import{V as o}from"./VStack-Cg_Yq2u4.js";import{F as p}from"./FullscreenModal-DRgNzDU_.js";import{M as h}from"./Modal-CD1hLK4f.js";import{O as S}from"./Overlay-DkQgdcBj.js";import"./preload-helper-D9Z9MdNV.js";import"./useA11yLabels-DHdk1_Ri.js";import"./LogoMark-BgKUSn8S.js";import"./useTheme-CmrOhAty.js";import"./Text-B1CpMNU3.js";import"./HStack-DaDYipoP.js";import"./IconButton-DNJ86Kiu.js";import"./Button-D2WSek5T.js";import"./Icon-DTs0crZh.js";import"./Spinner-C8x8bhOH.js";import"./Pressable-DDN99tmF.js";import"./isArray-M0ytM-vC.js";import"./Interactable--rqISG90.js";import"./color-Ceo1QMNe.js";import"./FullscreenModalLayout-LySVhHXM.js";import"./useMotionProps-BXBckQBf.js";import"./utils-y2S18Lx0.js";import"./tokens-BwScSksM.js";import"./FocusTrap-C5pHOjrH.js";import"./useMergeRefs-DR4sGa7m.js";import"./debounce-fynzmAtJ.js";import"./ModalWrapper-D8IaYCfm.js";import"./NewAnimatePresence-P1FndR1q.js";import"./index-CpZJTW5x.js";import"./motion-minimal-5s2ikV7b.js";import"./use-unmount-effect-DmgCrakR.js";import"./useScrollBlocker-CjG6q-zd.js";import"./Portal-BaLq4aAx.js";const Y={title:"Components/OverlayContentContext",component:m},l=()=>{const{isOverlay:s,isModal:t,isDrawer:d}=u();return e.jsxs(o,{children:[e.jsxs("div",{children:["isOverlay: ",String(s)]}),e.jsxs("div",{children:["isModal: ",String(t)]}),e.jsxs("div",{children:["isDrawer: ",String(d)]})]})},n=()=>{const[s,t]=c.useState(!1);return e.jsxs(o,{children:[e.jsx("button",{onClick:()=>t(!0),children:"Show Overlay"}),s&&e.jsx(S,{children:e.jsxs(o,{children:[e.jsx("button",{onClick:()=>t(!1),children:"Hide Overlay"}),e.jsx(l,{})]})})]})},r=()=>{const[s,t]=c.useState(!1);return e.jsxs(o,{children:[e.jsx("button",{onClick:()=>t(!0),children:"Show Modal"}),e.jsx(h,{onRequestClose:()=>t(!1),visible:s,children:e.jsxs(o,{children:[e.jsx("button",{onClick:()=>t(!1),children:"Hide Modal"}),e.jsx(l,{})]})})]})},a=()=>{const[s,t]=c.useState(!1);return e.jsxs(o,{children:[e.jsx("button",{onClick:()=>t(!0),children:"Show FullscreenModal"}),e.jsx(p,{onRequestClose:()=>t(!1),primaryContent:e.jsxs(o,{children:[e.jsx("button",{onClick:()=>t(!1),children:"Hide FullscreenModal"}),e.jsx(l,{})]}),visible:s})]})},i=()=>e.jsx(o,{children:e.jsx(l,{})}),x={a11y:{config:{rules:[{id:"aria-dialog-name",enabled:!1}]}}};r.parameters=x;n.__docgenInfo={description:"",methods:[],displayName:"InOverlay"};r.__docgenInfo={description:"",methods:[],displayName:"InModal"};a.__docgenInfo={description:"",methods:[],displayName:"InFullscreenModal"};i.__docgenInfo={description:"",methods:[],displayName:"WithoutProvider"};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => {
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
