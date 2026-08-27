import{r as t,j as e}from"./iframe-CYDANtMt.js";import{u}from"./usePrefixedId-D1yZvkEs.js";import{l as b}from"./loremIpsum-CjdvNg3u.js";import{T as I}from"./Text-0g3rWpAf.js";import{D as x}from"./DotCount-DjzjxUju.js";import{C as c}from"./Collapsible-PtwHvxc0.js";import{B as C}from"./Button-DPtA13Wn.js";import{H as f}from"./HStack-Fh-9TmPm.js";import"./preload-helper-D9Z9MdNV.js";import"./tokens-BwScSksM.js";import"./NewAnimatePresence-BIvSMOo2.js";import"./index-DaxQGrHc.js";import"./motion-minimal-B1h7XI-_.js";import"./use-unmount-effect-DjWyEMV9.js";import"./useTheme-C_Ehsh33.js";import"./useMotionProps-BF3bCUsm.js";import"./utils-CM_X5is-.js";import"./dotStyles-Ccp1dKIN.js";import"./collapsible-BAneA-61.js";import"./Icon-DRxKkZdt.js";import"./Spinner-CXotWqqb.js";import"./Pressable-BvczHaFK.js";import"./isArray-BJmyNVUi.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";const M={component:c,title:"Components/Collapsible"},d=()=>{const[a,l]=t.useState(!0),[o,s]=u(["trigger","collapsible"]),r=t.useCallback(()=>l(i=>!i),[l]);return e.jsxs(e.Fragment,{children:[e.jsx(C,{"aria-controls":s,"aria-expanded":!a,id:o,onClick:r,children:"Click me!"}),e.jsx(c,{accessibilityLabelledBy:o,collapsed:a,id:s,children:e.jsx(I,{font:"body",children:b})})]})},p=()=>{const[a,l]=t.useState(!1),[o,s]=u(["trigger","collapsible"]),r=t.useCallback(()=>l(i=>!i),[l]);return e.jsxs(e.Fragment,{children:[e.jsx(C,{"aria-controls":s,"aria-expanded":!a,id:o,onClick:r,children:"Click me!"}),e.jsx(c,{accessibilityLabelledBy:o,collapsed:a,id:s,children:e.jsx(I,{font:"body",children:b})})]})},n=()=>{const[a,l]=t.useState(!0),[o,s]=u(["trigger","collapsible"]),r=t.useCallback(()=>l(i=>!i),[l]);return e.jsxs(f,{alignItems:"center",children:[e.jsx(C,{"aria-controls":s,"aria-expanded":!a,id:o,onClick:r,children:"Click me!"}),e.jsxs(c,{accessibilityLabelledBy:o,collapsed:a,direction:"horizontal",id:s,maxHeight:400,children:[e.jsx(x,{count:100}),e.jsx(x,{count:1}),e.jsx(x,{count:99})]})]})},g=()=>{const[a,l]=t.useState(!0),[o,s]=u(["trigger","collapsible"]),r=t.useCallback(()=>l(i=>!i),[l]);return e.jsxs(e.Fragment,{children:[e.jsx(c,{accessibilityLabelledBy:o,collapsed:a,id:s,children:e.jsx(I,{font:"body",children:b})}),e.jsx(C,{"aria-controls":s,id:o,onClick:r,children:"Click me!"})]})},m=()=>{const[a,l]=t.useState(!0),[o,s]=u(["trigger","collapsible"]),r=t.useCallback(()=>l(i=>!i),[l]);return e.jsxs(e.Fragment,{children:[e.jsx(C,{"aria-controls":s,"aria-expanded":!a,id:o,onClick:r,children:"Click me!"}),e.jsx(c,{accessibilityLabelledBy:o,collapsed:a,id:s,maxHeight:400,children:e.jsx(I,{font:"body",children:b.repeat(10)})})]})};d.__docgenInfo={description:"",methods:[],displayName:"BasicCollapsible"};p.__docgenInfo={description:"",methods:[],displayName:"DefaultExpanded"};n.__docgenInfo={description:"",methods:[],displayName:"Horizontal"};g.__docgenInfo={description:"",methods:[],displayName:"RevealTop"};m.__docgenInfo={description:"",methods:[],displayName:"Scroll"};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => {
  const [collapsed, setCollapsed] = useState(true);
  const [triggerId, collapsibleId] = usePrefixedId(['trigger', 'collapsible']);
  const toggleCollapsed = useCallback(() => setCollapsed(collapsed => !collapsed), [setCollapsed]);
  return <>
      <Button aria-controls={collapsibleId} aria-expanded={!collapsed} id={triggerId} onClick={toggleCollapsed}>
        Click me!
      </Button>
      <Collapsible accessibilityLabelledBy={triggerId} collapsed={collapsed} id={collapsibleId}>
        <Text font="body">{loremIpsum}</Text>
      </Collapsible>
    </>;
}`,...d.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => {
  const [collapsed, setCollapsed] = useState(false);
  const [triggerId, collapsibleId] = usePrefixedId(['trigger', 'collapsible']);
  const toggleCollapsed = useCallback(() => setCollapsed(collapsed => !collapsed), [setCollapsed]);
  return <>
      <Button aria-controls={collapsibleId} aria-expanded={!collapsed} id={triggerId} onClick={toggleCollapsed}>
        Click me!
      </Button>
      <Collapsible accessibilityLabelledBy={triggerId} collapsed={collapsed} id={collapsibleId}>
        <Text font="body">{loremIpsum}</Text>
      </Collapsible>
    </>;
}`,...p.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => {
  const [collapsed, setCollapsed] = useState(true);
  const [triggerId, collapsibleId] = usePrefixedId(['trigger', 'collapsible']);
  const toggleCollapsed = useCallback(() => setCollapsed(collapsed => !collapsed), [setCollapsed]);
  return <HStack alignItems="center">
      <Button aria-controls={collapsibleId} aria-expanded={!collapsed} id={triggerId} onClick={toggleCollapsed}>
        Click me!
      </Button>
      <Collapsible accessibilityLabelledBy={triggerId} collapsed={collapsed} direction="horizontal" id={collapsibleId} maxHeight={400}>
        <DotCount count={100} />
        <DotCount count={1} />
        <DotCount count={99} />
      </Collapsible>
    </HStack>;
}`,...n.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => {
  const [collapsed, setCollapsed] = useState(true);
  const [triggerId, collapsibleId] = usePrefixedId(['trigger', 'collapsible']);
  const toggleCollapsed = useCallback(() => setCollapsed(collapsed => !collapsed), [setCollapsed]);
  return <>
      <Collapsible accessibilityLabelledBy={triggerId} collapsed={collapsed} id={collapsibleId}>
        <Text font="body">{loremIpsum}</Text>
      </Collapsible>
      <Button aria-controls={collapsibleId} id={triggerId} onClick={toggleCollapsed}>
        Click me!
      </Button>
    </>;
}`,...g.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => {
  const [collapsed, setCollapsed] = useState(true);
  const [triggerId, collapsibleId] = usePrefixedId(['trigger', 'collapsible']);
  const toggleCollapsed = useCallback(() => setCollapsed(collapsed => !collapsed), [setCollapsed]);
  return <>
      <Button aria-controls={collapsibleId} aria-expanded={!collapsed} id={triggerId} onClick={toggleCollapsed}>
        Click me!
      </Button>
      <Collapsible accessibilityLabelledBy={triggerId} collapsed={collapsed} id={collapsibleId} maxHeight={400}>
        <Text font="body">{loremIpsum.repeat(10)}</Text>
      </Collapsible>
    </>;
}`,...m.parameters?.docs?.source}}};const Q=["BasicCollapsible","DefaultExpanded","Horizontal","RevealTop","Scroll"];export{d as BasicCollapsible,p as DefaultExpanded,n as Horizontal,g as RevealTop,m as Scroll,Q as __namedExportsOrder,M as default};
