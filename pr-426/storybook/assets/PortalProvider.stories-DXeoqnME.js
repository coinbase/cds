import{by as r,r as i,j as t,bB as n}from"./iframe-BXWLBCkp.js";import{M as l}from"./Modal-C6ACOq11.js";import"./preload-helper-D9Z9MdNV.js";import"./OverlayContentContext-hT53AGt-.js";import"./useA11yLabels-CsHGrhyH.js";import"./VStack-CnEfMFeL.js";import"./useMotionProps-CS-LE6l8.js";import"./utils-CwomCnHN.js";import"./tokens-BwScSksM.js";import"./FocusTrap-90tMQkIg.js";import"./useMergeRefs-DR4sGa7m.js";import"./debounce-fynzmAtJ.js";import"./ModalWrapper-D-DvdkD-.js";import"./NewAnimatePresence-BbA2hDPb.js";import"./index-B2twlf45.js";import"./motion-minimal-SVRWJYUW.js";import"./use-unmount-effect-5QIafHMH.js";import"./useScrollBlocker-4Da9qMHo.js";import"./Overlay-XiDupmt3.js";import"./Portal-tAONErW2.js";import"./useTheme-BJazYlse.js";const H={title:"Components/PortalProvider",component:r},o=()=>{const[s,e]=i.useState(!1);return t.jsxs(r,{renderPortals:!1,children:[t.jsx("div",{children:"Hello world"}),t.jsx("button",{onClick:()=>e(!0),type:"button",children:"Show"}),t.jsxs(l,{onRequestClose:()=>!1,visible:s,children:["Modal contents",t.jsx("button",{onClick:()=>e(!1),type:"button",children:"Hide"})]}),t.jsx("div",{children:"Test1"}),t.jsx("div",{children:"Test2"}),t.jsx(n,{})]})};o.__docgenInfo={description:"",methods:[],displayName:"WithPortalNodes"};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => {
  const [visible, setVisible] = useState(false);
  return <PortalProvider renderPortals={false}>
      <div>Hello world</div>
      <button onClick={() => setVisible(true)} type="button">
        Show
      </button>
      <Modal onRequestClose={() => false} visible={visible}>
        Modal contents
        <button onClick={() => setVisible(false)} type="button">
          Hide
        </button>
      </Modal>
      <div>Test1</div>
      <div>Test2</div>
      <PortalNodes />
    </PortalProvider>;
}`,...o.parameters?.docs?.source}}};const T=["WithPortalNodes"];export{o as WithPortalNodes,T as __namedExportsOrder,H as default};
