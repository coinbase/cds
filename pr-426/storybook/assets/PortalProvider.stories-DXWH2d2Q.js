import{by as r,r as i,j as t,bB as n}from"./iframe-CYDANtMt.js";import{M as l}from"./Modal-BO7G91M9.js";import"./preload-helper-D9Z9MdNV.js";import"./OverlayContentContext-D3LfdOuR.js";import"./useA11yLabels-Ci9cQgFs.js";import"./VStack-iXgNewwv.js";import"./useMotionProps-BF3bCUsm.js";import"./utils-CM_X5is-.js";import"./tokens-BwScSksM.js";import"./FocusTrap-D5jofIBF.js";import"./useMergeRefs-DR4sGa7m.js";import"./debounce-fynzmAtJ.js";import"./ModalWrapper-TkjI7R_Y.js";import"./NewAnimatePresence-BIvSMOo2.js";import"./index-DaxQGrHc.js";import"./motion-minimal-B1h7XI-_.js";import"./use-unmount-effect-DjWyEMV9.js";import"./useScrollBlocker-smLDx_Od.js";import"./Overlay-BrSXLw2H.js";import"./Portal-BNKVVywf.js";import"./useTheme-C_Ehsh33.js";const H={title:"Components/PortalProvider",component:r},o=()=>{const[s,e]=i.useState(!1);return t.jsxs(r,{renderPortals:!1,children:[t.jsx("div",{children:"Hello world"}),t.jsx("button",{onClick:()=>e(!0),type:"button",children:"Show"}),t.jsxs(l,{onRequestClose:()=>!1,visible:s,children:["Modal contents",t.jsx("button",{onClick:()=>e(!1),type:"button",children:"Hide"})]}),t.jsx("div",{children:"Test1"}),t.jsx("div",{children:"Test2"}),t.jsx(n,{})]})};o.__docgenInfo={description:"",methods:[],displayName:"WithPortalNodes"};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => {
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
