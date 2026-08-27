import{by as r,r as i,j as t,bB as n}from"./iframe-CsG_6vZR.js";import{M as l}from"./Modal-CD1hLK4f.js";import"./preload-helper-D9Z9MdNV.js";import"./OverlayContentContext-CpXWuzdo.js";import"./useA11yLabels-DHdk1_Ri.js";import"./VStack-Cg_Yq2u4.js";import"./useMotionProps-BXBckQBf.js";import"./utils-y2S18Lx0.js";import"./tokens-BwScSksM.js";import"./FocusTrap-C5pHOjrH.js";import"./useMergeRefs-DR4sGa7m.js";import"./debounce-fynzmAtJ.js";import"./ModalWrapper-D8IaYCfm.js";import"./NewAnimatePresence-P1FndR1q.js";import"./index-CpZJTW5x.js";import"./motion-minimal-5s2ikV7b.js";import"./use-unmount-effect-DmgCrakR.js";import"./useScrollBlocker-CjG6q-zd.js";import"./Overlay-DkQgdcBj.js";import"./Portal-BaLq4aAx.js";import"./useTheme-CmrOhAty.js";const H={title:"Components/PortalProvider",component:r},o=()=>{const[s,e]=i.useState(!1);return t.jsxs(r,{renderPortals:!1,children:[t.jsx("div",{children:"Hello world"}),t.jsx("button",{onClick:()=>e(!0),type:"button",children:"Show"}),t.jsxs(l,{onRequestClose:()=>!1,visible:s,children:["Modal contents",t.jsx("button",{onClick:()=>e(!1),type:"button",children:"Hide"})]}),t.jsx("div",{children:"Test1"}),t.jsx("div",{children:"Test2"}),t.jsx(n,{})]})};o.__docgenInfo={description:"",methods:[],displayName:"WithPortalNodes"};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => {
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
