import{r as a,j as e}from"./iframe-BXWLBCkp.js";import{s as f,l as L}from"./tabs-mxIlbzm-.js";import{T as u}from"./Text-Ch_dBU4v.js";import{T as _,u as N}from"./Tabs-NZrJjpKJ.js";import{u as O}from"./useHorizontalScrollToTarget-De-ilG7d.js";import{M as F}from"./MediaChip-DK4Hgf8b.js";import{P as v}from"./Paddle-KLwlcGm-.js";import{H as y}from"./HStack-B6p8qBpp.js";import{V as H}from"./VStack-CnEfMFeL.js";import"./preload-helper-D9Z9MdNV.js";import"./index-7N_x-QzT.js";import"./useMergeRefs-DR4sGa7m.js";import"./useRefMap-so5XoaSx.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./useTheme-BJazYlse.js";import"./Rect-CybC0zjI.js";import"./motion-minimal-SVRWJYUW.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./toNumber-CMOupoY4.js";import"./isSymbol-BtzAvdsO.js";import"./Chip-Cb6f10va.js";import"./tokens-BwScSksM.js";import"./NewAnimatePresence-BbA2hDPb.js";import"./index-B2twlf45.js";import"./use-unmount-effect-5QIafHMH.js";import"./IconButton-OIX0AFCz.js";import"./Button-W9Shg4T1.js";import"./Icon-CgDQ3NQp.js";import"./Spinner-BAI0lrZ-.js";import"./useMotionProps-CS-LE6l8.js";import"./utils-CwomCnHN.js";const z="scrollContainerCss-so3nfi9",B=({label:o="",id:t,...l})=>{const{activeTab:i,updateActiveTab:b}=N(),r=a.useMemo(()=>i?.id===t,[i,t]),c=a.useRef(null),p=a.useCallback(()=>b(t),[t,b]);return a.useEffect(()=>{r&&c.current&&c.current.focus()},[r]),e.jsx(F,{ref:c,"aria-selected":r,inverted:r,onClick:p,role:"tab",width:"max-content",...l,children:o})},U=()=>null,h=a.memo(a.forwardRef(function({tabs:t,value:l,onChange:i,Component:b=B,paddleStyle:r,testID:c,background:p="bg",gap:g=1,role:k,previousArrowAccessibilityLabel:S="Previous",nextArrowAccessibilityLabel:j="Next",width:A="100%",...x},q){const[D,w]=a.useState(null),{scrollRef:s,isScrollContentOffscreenLeft:R,isScrollContentOffscreenRight:V,handleScroll:I}=O({activeTarget:D,autoScrollOffset:50}),W=a.useMemo(()=>t.find(n=>n.id===l),[t,l]),E=a.useCallback(n=>{n&&i?.(n.id)},[i]),M=a.useCallback(()=>{s?.current?.scrollTo({left:0,behavior:"smooth"})},[s]),P=a.useCallback(()=>{if(!s.current)return;const n=s.current.scrollWidth-s.current.clientWidth;s.current.scrollTo({left:n,behavior:"smooth"})},[s]);return e.jsxs(y,{alignItems:"center",position:"relative",testID:c,width:A,...x,children:[e.jsx(v,{accessibilityLabel:S,background:p,direction:"left",onClick:M,paddleStyle:r,show:R,variant:"secondary"}),e.jsx(y,{ref:s,alignItems:"center",className:z,onScroll:I,overflow:"auto",children:e.jsx(_,{ref:q,TabComponent:b,TabsActiveIndicatorComponent:U,activeTab:W||null,background:p,gap:g,onActiveTabElementChange:w,onChange:E,role:k,tabs:t,...x})}),e.jsx(v,{accessibilityLabel:j,background:p,direction:"right",onClick:P,paddleStyle:r,show:V,variant:"secondary"})]})}));h.displayName="TabbedChips";const T=h;h.__docgenInfo={description:"",methods:[],displayName:"TabbedChips",props:{testID:{required:!1,tsType:{name:"string"},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""},font:{required:!1,tsType:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"fontFamily"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"fontFamily",required:!1}},{key:"phone",value:{name:"fontFamily",required:!1}},{key:"tablet",value:{name:"fontFamily",required:!1}},{key:"desktop",value:{name:"fontFamily",required:!1}}]}}]},description:""},pin:{required:!1,tsType:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}]},description:"Direction in which to absolutely pin the box."},bordered:{required:!1,tsType:{name:"boolean"},description:"Add a border around all sides of the box."},borderedTop:{required:!1,tsType:{name:"boolean"},description:"Add a border to the top side of the box."},borderedBottom:{required:!1,tsType:{name:"boolean"},description:"Add a border to the bottom side of the box."},borderedStart:{required:!1,tsType:{name:"boolean"},description:"Add a border to the leading side of the box."},borderedEnd:{required:!1,tsType:{name:"boolean"},description:"Add a border to the trailing side of the box."},borderedHorizontal:{required:!1,tsType:{name:"boolean"},description:"Add a border to the leading and trailing sides of the box."},borderedVertical:{required:!1,tsType:{name:"boolean"},description:"Add a border to the top and bottom sides of the box."},dangerouslySetBackground:{required:!1,tsType:{name:"string"},description:"@danger This is a migration escape hatch. It is not intended to be used normally."},Component:{defaultValue:{value:`<TabId extends string = string>({
  label = '',
  id,
  ...tabProps
}: TabValue<TabId>) => {
  const { activeTab, updateActiveTab } = useTabsContext();
  const isActive = useMemo(() => activeTab?.id === id, [activeTab, id]);
  const chipRef = useRef<HTMLButtonElement>(null);
  const handleClick = useCallback(() => updateActiveTab(id), [id, updateActiveTab]);

  // Keep focus on the newly active chip
  useEffect(() => {
    if (isActive && chipRef.current) {
      chipRef.current.focus();
    }
  }, [isActive]);

  return (
    <MediaChip
      ref={chipRef}
      aria-selected={isActive}
      inverted={isActive}
      onClick={handleClick}
      role="tab"
      width="max-content"
      {...tabProps}
    >
      {label}
    </MediaChip>
  );
}`,computed:!1},required:!1},background:{defaultValue:{value:"'bg'",computed:!1},required:!1},gap:{defaultValue:{value:"1",computed:!1},required:!1},previousArrowAccessibilityLabel:{defaultValue:{value:"'Previous'",computed:!1},required:!1},nextArrowAccessibilityLabel:{defaultValue:{value:"'Next'",computed:!1},required:!1},width:{defaultValue:{value:"'100%'",computed:!1},required:!1}}};const De={title:"Components/Chips/TabbedChips",component:T},J=f.slice(0,5),C=[{id:"one",label:"One"},{id:"two",label:"Two"},{id:"three",label:"Three"}],m=({tabs:o=J,style:t})=>{const[l,i]=a.useState(o[0].id);return e.jsx(T,{onChange:i,paddleStyle:t,tabs:o,value:l})},K=()=>{const[o,t]=a.useState(C[0].id);return e.jsx(T,{onChange:t,tabs:C,value:o})},d=()=>e.jsxs(H,{gap:2,children:[e.jsx(u,{as:"p",display:"block",font:"headline",children:"Default"}),e.jsx(m,{}),e.jsx(u,{as:"p",display:"block",font:"headline",children:"With paddles"}),e.jsx(m,{tabs:f}),e.jsx(u,{as:"p",display:"block",font:"headline",children:"With custom sized paddles"}),e.jsx(m,{style:{transform:"scale(0.5)"},tabs:f}),e.jsx(u,{as:"p",display:"block",font:"headline",children:"With long text"}),e.jsx(m,{tabs:L}),e.jsx(m,{tabs:f.map((o,t)=>({...o,disabled:t===1}))}),e.jsx(u,{as:"p",display:"block",font:"headline",children:"With enum values"}),e.jsx(K,{})]}),G={config:{rules:[{id:"aria-valid-attr-value",enabled:!1},{id:"duplicate-id-active",enabled:!1},{id:"duplicate-id",enabled:!1},{id:"duplicate-id-aria",enabled:!1}]}};d.parameters={percy:{enableJavaScript:!0},a11y:G};d.__docgenInfo={description:"",methods:[],displayName:"Default"};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => {
  return <VStack gap={2}>
      <Text as="p" display="block" font="headline">
        Default
      </Text>
      <Demo />
      <Text as="p" display="block" font="headline">
        With paddles
      </Text>
      <Demo tabs={sampleTabs} />
      <Text as="p" display="block" font="headline">
        With custom sized paddles
      </Text>
      <Demo style={{
      transform: 'scale(0.5)'
    }} tabs={sampleTabs} />
      <Text as="p" display="block" font="headline">
        With long text
      </Text>
      <Demo tabs={longTextTabs} />
      <Demo tabs={sampleTabs.map((tab, index) => ({
      ...tab,
      disabled: index === 1
    }))} />
      <Text as="p" display="block" font="headline">
        With enum values
      </Text>
      <EnumDemo />
    </VStack>;
}`,...d.parameters?.docs?.source}}};const we=["Default"];export{d as Default,we as __namedExportsOrder,De as default};
