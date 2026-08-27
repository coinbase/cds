import{r as t,j as e}from"./iframe-CYDANtMt.js";import{l as X}from"./loremIpsum-CjdvNg3u.js";import{u as Y,S as P}from"./SelectOption-D3fv76Hr.js";import{D as G}from"./DotCount-DjzjxUju.js";import{u as $}from"./useA11yControlledVisibility-C9j5cCuu.js";import{I as q}from"./Icon-DRxKkZdt.js";import{P as R}from"./Pressable-BvczHaFK.js";import{T as p}from"./Text-0g3rWpAf.js";import{D as u}from"./Dropdown-CpCPWRqg.js";import{H as l}from"./HStack-Fh-9TmPm.js";import{I as _}from"./IconButton-D-CYL-b9.js";import{B as z}from"./Button-DPtA13Wn.js";import"./preload-helper-D9Z9MdNV.js";import"./select-Em8pkxbY.js";import"./Cell-D1A-2vVj.js";import"./useCellSpacing-BH3_o_ol.js";import"./sizing-Do56D2dQ.js";import"./VStack-iXgNewwv.js";import"./CellAccessory-Cln9vUz5.js";import"./isRtl-CGZsgYct.js";import"./tokens-BwScSksM.js";import"./NewAnimatePresence-BIvSMOo2.js";import"./index-DaxQGrHc.js";import"./motion-minimal-B1h7XI-_.js";import"./use-unmount-effect-DjWyEMV9.js";import"./useTheme-C_Ehsh33.js";import"./useMotionProps-BF3bCUsm.js";import"./utils-CM_X5is-.js";import"./dotStyles-Ccp1dKIN.js";import"./usePrefixedId-D1yZvkEs.js";import"./isArray-BJmyNVUi.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";import"./index-B3W2yIJg.js";import"./useBreakpoints-Bxk0TUW-.js";import"./FocusTrap-D5jofIBF.js";import"./useMergeRefs-DR4sGa7m.js";import"./debounce-fynzmAtJ.js";import"./ModalWrapper-TkjI7R_Y.js";import"./useScrollBlocker-smLDx_Od.js";import"./Overlay-BrSXLw2H.js";import"./OverlayContentContext-D3LfdOuR.js";import"./Portal-BNKVVywf.js";import"./Popover-CdSD4lsc.js";import"./dropdown-CDhCThJm.js";import"./Spinner-CXotWqqb.js";const J="insetFocusRingCss-i1036sur",K="button",A=t.memo(t.forwardRef(({as:s,background:i="transparent",children:a,value:r,onClick:o,disableCloseOnOptionChange:d,tabIndex:g=-1,...h},b)=>{const n=s??K,{onChange:H,handleCloseMenu:f}=Y(),M=t.useCallback(V=>{o?.(V),H?.(r),d||f?.()},[d,f,H,o,r]);return e.jsx(R,{ref:b,noScaleOnPress:!0,as:n,background:i,className:J,onClick:M,role:"menuitem",tabIndex:g,...h,children:a})}));A.__docgenInfo={description:"",methods:[],displayName:"MenuItem",props:{background:{defaultValue:{value:"'transparent'",computed:!1},required:!1},tabIndex:{defaultValue:{value:"-1",computed:!1},required:!1}}};const Ye={title:"Components/Dropdown/Dropdown",component:u},m=["Option 1","Option 2","Option 3","Option 4","Option 5","Option 6","Option 7","Option 8","Option 9","Option 10","Option 11"],c=({options:s=m,containerHeight:i,disabled:a,subjectTestID:r,customAriaControlsID:o,enableMobileModal:d,...g})=>{const[h,b]=t.useState(""),n=t.useRef(null),[H,f]=t.useState(!1),{triggerAccessibilityProps:M,controlledElementAccessibilityProps:V}=$(H,{accessibilityLabel:"Default Dropdown",hasPopupType:"menu"});o&&(M["aria-controls"]=o,V.id=o);const N=t.useCallback(()=>{f(!1)},[]),L=t.useCallback(()=>{f(!0)},[]),E=e.jsxs(e.Fragment,{children:[e.jsx(l,{paddingX:2,paddingY:2,role:"separator",children:e.jsx(p,{as:"h2",color:"fgMuted",display:"block",font:"caption",children:"Section Heading"})}),s.map(T=>e.jsx(P,{testID:`option-${T}`,title:T,value:T},T))]}),F=t.useCallback(()=>{n.current?.openMenu()},[]);return e.jsxs(l,{gap:3,height:i,padding:4,children:[e.jsx(u,{ref:n,content:E,controlledElementAccessibilityProps:V,disabled:a,enableMobileModal:d,onChange:b,onCloseMenu:N,onOpenMenu:L,value:h,...g,children:e.jsx(_,{transparent:!0,accessibilityLabel:"More",disabled:a,name:"more",testID:r,variant:"secondary",...M})}),e.jsx(z,{onClick:F,...M,children:"Open Menu"})]})},B=({enableMobileModal:s})=>{const[i,a]=t.useState(""),r=e.jsxs(e.Fragment,{children:[e.jsx(l,{padding:2,children:e.jsx(p,{as:"h2",color:"fgMuted",display:"block",font:"caption",children:"Section Heading"})}),m.map(o=>e.jsx(P,{testID:`option-${o}`,title:o,value:o},o))]});return e.jsx(l,{padding:4,children:e.jsx(u,{content:r,enableMobileModal:s,onChange:a,value:i,children:e.jsx(G,{count:4,pin:"top-end",children:e.jsx(_,{transparent:!0,accessibilityLabel:"More",name:"more",variant:"secondary"})})})})},y=()=>e.jsx(B,{}),x=()=>e.jsx(B,{enableMobileModal:!0}),Q={gap:1,placement:"right-start"},S=()=>{const[s,i]=t.useState(),[a,r]=t.useState(),o=t.useRef(null),d=t.useCallback(n=>{i(n),r(void 0)},[]),g=t.useCallback(n=>{r(n),i(void 0)},[]),h=t.useMemo(()=>e.jsx(e.Fragment,{children:m.slice(2,6).map(n=>e.jsx(P,{testID:`option-${n}`,title:n,value:n},n))}),[]),b=t.useMemo(()=>e.jsxs(e.Fragment,{children:[e.jsx(l,{padding:2,children:e.jsx(p,{as:"h2",color:"fgMuted",display:"block",font:"caption",children:"Section Heading"})}),m.slice(0,2).map(n=>e.jsx(P,{testID:`option-${n}`,title:n,value:n},n)),e.jsx(u,{content:h,contentPosition:Q,minWidth:200,onChange:g,value:a,width:"100%",children:e.jsx(R,{background:"bg",width:"100%",children:e.jsxs(l,{alignItems:"center",justifyContent:"space-between",paddingX:2,paddingY:1,width:"100%",children:[e.jsx(p,{as:"p",display:"block",font:"headline",children:"More"}),e.jsx(q,{color:"fg",name:"caretRight",size:"s"})]})})})]}),[g,h,a]);return e.jsxs(l,{gap:2,justifyContent:"space-between",padding:3,children:[e.jsx(l,{flexGrow:1,children:e.jsx(u,{ref:o,content:b,onChange:d,value:s,width:200,children:e.jsx(_,{accessibilityLabel:"More",name:"more"})})}),e.jsx(l,{alignItems:"center",background:"bgAlternate",borderRadius:200,flexGrow:3,justifyContent:"center",padding:3,children:e.jsxs(p,{as:"p",display:"block",font:"body",children:["You chose: ",a??s]})})]})},W=[{label:"react",glyph:"⚛️"},{label:"love",glyph:"💕"},{label:"mindblow",glyph:"🤯"},{label:"shiny",glyph:"✨"},{label:"surprised",glyph:"🥺"},{label:"brick",glyph:"🧱"},{label:"poop",glyph:"💩"},{label:"poodle",glyph:"🐩"},{label:"rocket",glyph:"🚀"},{label:"phone",glyph:"☎️"},{label:"dog",glyph:"🐕‍🦺"},{label:"nails",glyph:"💅🏻"},{label:"upsidedown",glyph:"🙃"},{label:"coder",glyph:"👩🏼‍💻"}],j=()=>e.jsx(c,{showOverlay:!0}),k=()=>e.jsx(c,{enableMobileModal:!0}),w=()=>{const[s,i]=t.useState(),a=t.useMemo(()=>W.find(o=>o.label===s)?.glyph??"😄",[s]),r=t.useMemo(()=>e.jsxs(e.Fragment,{children:[e.jsx(l,{paddingX:2,paddingY:2,children:e.jsx(p,{as:"h2",color:"fgMuted",display:"block",font:"caption",children:"Section Heading"})}),e.jsx(l,{flexWrap:"wrap",gap:1,paddingBottom:2,paddingX:2,children:W.map(({label:o,glyph:d})=>e.jsx(A,{value:o,children:e.jsx(p,{as:"p",display:"block",font:"title2",children:d})}))})]}),[]);return e.jsx(u,{content:r,maxWidth:190,onChange:i,value:s,children:e.jsx(R,{background:"transparent",children:e.jsx(p,{as:"p",display:"block",font:"title2",children:a})})})},C=()=>e.jsxs(e.Fragment,{children:[e.jsx(c,{}),e.jsx(c,{disabled:!0,enableMobileModal:!0})]}),D=()=>{const[s,i]=t.useState(""),a=t.useRef(null);t.useEffect(()=>{a.current?.openMenu()},[]);const r=e.jsx(l,{maxWidth:"95vw",padding:2,role:"separator",children:e.jsx(p,{as:"h2",color:"fgMuted",display:"block",font:"caption",overflow:"truncate",children:X})});return e.jsx(u,{ref:a,content:r,onChange:i,value:s,children:e.jsx(_,{transparent:!0,accessibilityLabel:"More",name:"more",variant:"secondary"})})},v=()=>e.jsx(c,{enableMobileModal:!0,options:m.slice(0,5)}),O=()=>e.jsx(c,{maxHeight:400,options:m.slice(0,5)}),I=()=>e.jsx(c,{maxHeight:"50%",options:m.slice(0,5)});c.__docgenInfo={description:"",methods:[],displayName:"Default",props:{subjectTestID:{required:!1,tsType:{name:"string"},description:""},options:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"",defaultValue:{value:`[
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
  'Option 6',
  'Option 7',
  'Option 8',
  'Option 9',
  'Option 10',
  'Option 11',
]`,computed:!1}},containerHeight:{required:!1,tsType:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},description:""},customAriaControlsID:{required:!1,tsType:{name:"string"},description:""}}};y.__docgenInfo={description:"",methods:[],displayName:"Wrapped"};x.__docgenInfo={description:"",methods:[],displayName:"WrappedMobileModal"};S.__docgenInfo={description:"",methods:[],displayName:"SubMenu"};j.__docgenInfo={description:"",methods:[],displayName:"ShowOverlay"};k.__docgenInfo={description:"",methods:[],displayName:"MobileModal"};w.__docgenInfo={description:"",methods:[],displayName:"CustomOptions"};C.__docgenInfo={description:"",methods:[],displayName:"Disabled"};D.__docgenInfo={description:"",methods:[],displayName:"LongText"};v.__docgenInfo={description:"",methods:[],displayName:"WithMobileModal"};O.__docgenInfo={description:"",methods:[],displayName:"WithMaxHeightHigherThanContent"};I.__docgenInfo={description:"",methods:[],displayName:"WithPercentMaxHeight"};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`({
  options = defaultOptions,
  containerHeight,
  disabled,
  subjectTestID,
  customAriaControlsID,
  enableMobileModal,
  ...props
}: MockDropdownProps) => {
  const [value, setValue] = useState('');
  const dropdownRef = useRef<DropdownRef>(null);
  const [visible, setVisible] = useState(false);
  const {
    triggerAccessibilityProps,
    controlledElementAccessibilityProps
  } = useA11yControlledVisibility(visible, {
    accessibilityLabel: 'Default Dropdown',
    hasPopupType: 'menu'
  });

  // Passing static value to aria-controls for testing dropdown interactive story
  if (customAriaControlsID) {
    triggerAccessibilityProps['aria-controls'] = customAriaControlsID;
    controlledElementAccessibilityProps.id = customAriaControlsID;
  }
  const handleCloseMenu = useCallback(() => {
    setVisible(false);
  }, []);
  const handleOpenMenu = useCallback(() => {
    setVisible(true);
  }, []);
  const content = <>
      <HStack paddingX={2} paddingY={2} role="separator">
        <Text as="h2" color="fgMuted" display="block" font="caption">
          Section Heading
        </Text>
      </HStack>
      {options.map(option => <SelectOption key={option} testID={\`option-\${option}\`} title={option} value={option} />)}
    </>;
  const handleButtonPress = useCallback(() => {
    dropdownRef.current?.openMenu();
  }, []);
  return <HStack gap={3} height={containerHeight} padding={4}>
      <Dropdown ref={dropdownRef} content={content} controlledElementAccessibilityProps={controlledElementAccessibilityProps} disabled={disabled} enableMobileModal={enableMobileModal} onChange={setValue} onCloseMenu={handleCloseMenu} onOpenMenu={handleOpenMenu} value={value} {...props}>
        <IconButton transparent accessibilityLabel="More" disabled={disabled} name="more" testID={subjectTestID} variant="secondary" {...triggerAccessibilityProps} />
      </Dropdown>
      <Button onClick={handleButtonPress} {...triggerAccessibilityProps}>
        Open Menu
      </Button>
    </HStack>;
}`,...c.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:"() => <BaseWrapped />",...y.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:"() => <BaseWrapped enableMobileModal />",...x.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => {
  const [menuValue, setMenuValue] = useState<string>();
  const [subMenuValue, setSubMenuValue] = useState<string>();
  const menuRef = useRef<DropdownRef>(null);
  const handleMenuValueChange = useCallback((newValue: string) => {
    setMenuValue(newValue);
    setSubMenuValue(undefined);
  }, []);
  const handleSubMenuValueChange = useCallback((newValue: string) => {
    setSubMenuValue(newValue);
    setMenuValue(undefined);
  }, []);
  const subMenuContent = useMemo(() => <>
        {defaultOptions.slice(2, 6).map(option => <SelectOption key={option} testID={\`option-\${option}\`} title={option} value={option} />)}
      </>, []);
  const content = useMemo(() => <>
        <HStack padding={2}>
          <Text as="h2" color="fgMuted" display="block" font="caption">
            Section Heading
          </Text>
        </HStack>
        {defaultOptions.slice(0, 2).map(option => <SelectOption key={option} testID={\`option-\${option}\`} title={option} value={option} />)}
        <Dropdown content={subMenuContent} contentPosition={subMenuPosition} minWidth={200} onChange={handleSubMenuValueChange} value={subMenuValue} width="100%">
          {/* Note: you can't use a SelectOption as the trigger or else SelectProvider will think this is a menu option */}
          <Pressable background="bg" width="100%">
            <HStack alignItems="center" justifyContent="space-between" paddingX={2} paddingY={1} width="100%">
              <Text as="p" display="block" font="headline">
                More
              </Text>
              <Icon color="fg" name="caretRight" size="s" />
            </HStack>
          </Pressable>
        </Dropdown>
      </>, [handleSubMenuValueChange, subMenuContent, subMenuValue]);
  return <HStack gap={2} justifyContent="space-between" padding={3}>
      <HStack flexGrow={1}>
        <Dropdown ref={menuRef} content={content} onChange={handleMenuValueChange} value={menuValue} width={200}>
          <IconButton accessibilityLabel="More" name="more" />
        </Dropdown>
      </HStack>
      <HStack alignItems="center" background="bgAlternate" borderRadius={200} flexGrow={3} justifyContent="center" padding={3}>
        <Text as="p" display="block" font="body">
          You chose: {subMenuValue ?? menuValue}
        </Text>
      </HStack>
    </HStack>;
}`,...S.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:"() => <Default showOverlay />",...j.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:"() => <Default enableMobileModal />",...k.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`() => {
  const [value, onChange] = useState<string | undefined>();
  const currentGlyph = useMemo(() => emojiMap.find(emoji => emoji.label === value)?.glyph ?? '😄', [value]);
  const content = useMemo(() => <>
        <HStack paddingX={2} paddingY={2}>
          <Text as="h2" color="fgMuted" display="block" font="caption">
            Section Heading
          </Text>
        </HStack>
        <HStack flexWrap="wrap" gap={1} paddingBottom={2} paddingX={2}>
          {emojiMap.map(({
        label,
        glyph
      }) => <MenuItem value={label}>
              <Text as="p" display="block" font="title2">
                {glyph}
              </Text>
            </MenuItem>)}
        </HStack>
      </>, []);
  return <Dropdown content={content} maxWidth={190} onChange={onChange} value={value}>
      <Pressable background="transparent">
        <Text as="p" display="block" font="title2">
          {currentGlyph}
        </Text>
      </Pressable>
    </Dropdown>;
}`,...w.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`() => <>
    <Default />
    <Default disabled enableMobileModal />
  </>`,...C.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('');
  const dropdownRef = useRef<DropdownRef>(null);
  useEffect(() => {
    dropdownRef.current?.openMenu();
  }, []);
  const content = <HStack maxWidth="95vw" padding={2} role="separator">
      <Text as="h2" color="fgMuted" display="block" font="caption" overflow="truncate">
        {loremIpsum}
      </Text>
    </HStack>;
  return <Dropdown ref={dropdownRef} content={content} onChange={setValue} value={value}>
      <IconButton transparent accessibilityLabel="More" name="more" variant="secondary" />
    </Dropdown>;
}`,...D.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:"() => <Default enableMobileModal options={defaultOptions.slice(0, 5)} />",...v.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:"() => <Default maxHeight={400} options={defaultOptions.slice(0, 5)} />",...O.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:'() => <Default maxHeight="50%" options={defaultOptions.slice(0, 5)} />',...I.parameters?.docs?.source}}};const Ge=["Default","Wrapped","WrappedMobileModal","SubMenu","ShowOverlay","MobileModal","CustomOptions","Disabled","LongText","WithMobileModal","WithMaxHeightHigherThanContent","WithPercentMaxHeight"];export{w as CustomOptions,c as Default,C as Disabled,D as LongText,k as MobileModal,j as ShowOverlay,S as SubMenu,O as WithMaxHeightHigherThanContent,v as WithMobileModal,I as WithPercentMaxHeight,y as Wrapped,x as WrappedMobileModal,Ge as __namedExportsOrder,Ye as default};
