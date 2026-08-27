import{r as t,j as e}from"./iframe-BXWLBCkp.js";import{u}from"./usePrefixedId-Dfl-0DGQ.js";import{l as b}from"./loremIpsum-CjdvNg3u.js";import{T as I}from"./Text-Ch_dBU4v.js";import{D as x}from"./DotCount-Jrldj36O.js";import{C as c}from"./Collapsible-DRMWW50B.js";import{B as C}from"./Button-W9Shg4T1.js";import{H as f}from"./HStack-B6p8qBpp.js";import"./preload-helper-D9Z9MdNV.js";import"./tokens-BwScSksM.js";import"./NewAnimatePresence-BbA2hDPb.js";import"./index-B2twlf45.js";import"./motion-minimal-SVRWJYUW.js";import"./use-unmount-effect-5QIafHMH.js";import"./useTheme-BJazYlse.js";import"./useMotionProps-CS-LE6l8.js";import"./utils-CwomCnHN.js";import"./dotStyles-Ccp1dKIN.js";import"./collapsible-BAneA-61.js";import"./Icon-CgDQ3NQp.js";import"./Spinner-BAI0lrZ-.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";const M={component:c,title:"Components/Collapsible"},d=()=>{const[a,l]=t.useState(!0),[o,s]=u(["trigger","collapsible"]),r=t.useCallback(()=>l(i=>!i),[l]);return e.jsxs(e.Fragment,{children:[e.jsx(C,{"aria-controls":s,"aria-expanded":!a,id:o,onClick:r,children:"Click me!"}),e.jsx(c,{accessibilityLabelledBy:o,collapsed:a,id:s,children:e.jsx(I,{font:"body",children:b})})]})},p=()=>{const[a,l]=t.useState(!1),[o,s]=u(["trigger","collapsible"]),r=t.useCallback(()=>l(i=>!i),[l]);return e.jsxs(e.Fragment,{children:[e.jsx(C,{"aria-controls":s,"aria-expanded":!a,id:o,onClick:r,children:"Click me!"}),e.jsx(c,{accessibilityLabelledBy:o,collapsed:a,id:s,children:e.jsx(I,{font:"body",children:b})})]})},n=()=>{const[a,l]=t.useState(!0),[o,s]=u(["trigger","collapsible"]),r=t.useCallback(()=>l(i=>!i),[l]);return e.jsxs(f,{alignItems:"center",children:[e.jsx(C,{"aria-controls":s,"aria-expanded":!a,id:o,onClick:r,children:"Click me!"}),e.jsxs(c,{accessibilityLabelledBy:o,collapsed:a,direction:"horizontal",id:s,maxHeight:400,children:[e.jsx(x,{count:100}),e.jsx(x,{count:1}),e.jsx(x,{count:99})]})]})},g=()=>{const[a,l]=t.useState(!0),[o,s]=u(["trigger","collapsible"]),r=t.useCallback(()=>l(i=>!i),[l]);return e.jsxs(e.Fragment,{children:[e.jsx(c,{accessibilityLabelledBy:o,collapsed:a,id:s,children:e.jsx(I,{font:"body",children:b})}),e.jsx(C,{"aria-controls":s,id:o,onClick:r,children:"Click me!"})]})},m=()=>{const[a,l]=t.useState(!0),[o,s]=u(["trigger","collapsible"]),r=t.useCallback(()=>l(i=>!i),[l]);return e.jsxs(e.Fragment,{children:[e.jsx(C,{"aria-controls":s,"aria-expanded":!a,id:o,onClick:r,children:"Click me!"}),e.jsx(c,{accessibilityLabelledBy:o,collapsed:a,id:s,maxHeight:400,children:e.jsx(I,{font:"body",children:b.repeat(10)})})]})};d.__docgenInfo={description:"",methods:[],displayName:"BasicCollapsible"};p.__docgenInfo={description:"",methods:[],displayName:"DefaultExpanded"};n.__docgenInfo={description:"",methods:[],displayName:"Horizontal"};g.__docgenInfo={description:"",methods:[],displayName:"RevealTop"};m.__docgenInfo={description:"",methods:[],displayName:"Scroll"};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => {
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
