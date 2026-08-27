import{r as o,j as e,B as z}from"./iframe-CsG_6vZR.js";import{I as W}from"./Icon-DTs0crZh.js";import{H as i}from"./HStack-DaDYipoP.js";import{V as Y}from"./VStack-Cg_Yq2u4.js";import{A as J}from"./Avatar-DB-9v412.js";import{T as te}from"./Tooltip-DdBi_ZOF.js";import{L as q}from"./Link-GlbzwVdV.js";import{T as X}from"./Text-B1CpMNU3.js";import{I as K}from"./InputIcon-CLvNTxep.js";import{I as h}from"./InputIconButton-D6rP7VAA.js";import{I as u}from"./InputLabel-CdlU6JsR.js";import{N as Q}from"./NativeTextArea-D3EkpFL6.js";import{T as t}from"./TextInput-D5KGlaku.js";import"./preload-helper-D9Z9MdNV.js";import"./useTheme-CmrOhAty.js";import"./RemoteImage-CCsStlyO.js";import"./Popover-BqkIPLOm.js";import"./NewAnimatePresence-P1FndR1q.js";import"./index-CpZJTW5x.js";import"./motion-minimal-5s2ikV7b.js";import"./use-unmount-effect-DmgCrakR.js";import"./FocusTrap-C5pHOjrH.js";import"./useMergeRefs-DR4sGa7m.js";import"./debounce-fynzmAtJ.js";import"./Overlay-DkQgdcBj.js";import"./OverlayContentContext-CpXWuzdo.js";import"./useMotionProps-BXBckQBf.js";import"./utils-y2S18Lx0.js";import"./tokens-BwScSksM.js";import"./Portal-BaLq4aAx.js";import"./TooltipContent-CdVyoQz2.js";import"./usePrefixedId-BL1THI0P.js";import"./Pressable-DDN99tmF.js";import"./isArray-M0ytM-vC.js";import"./Interactable--rqISG90.js";import"./color-Ceo1QMNe.js";import"./context-fDezSldV.js";import"./IconButton-DNJ86Kiu.js";import"./Button-D2WSek5T.js";import"./Spinner-C8x8bhOH.js";import"./HelperText-W0U74shX.js";import"./InputStack-BFRjE954.js";import"./ColorSurge-2yE2z4Kr.js";import"./use-animation-DHwoMYVB.js";import"./NativeInput-8PS_q8WF.js";const Je={title:"Components/Inputs/TextInput",component:t},G="nativeInputCustomCss-nyi32mo",Z=["positive","negative","foregroundMuted","foreground","primary","secondary"],ae="customContainerPaddingCss-c16k6krl",m=function(){const r=o.useCallback(()=>{console.log("Focusing")},[]),n=o.useCallback(()=>{console.log("Blurring")},[]);return e.jsx(t,{label:"Label",onBlur:n,onFocus:r})},x=function(){return e.jsxs(Y,{gap:2,children:[e.jsx(t,{label:"Inside Label",labelVariant:"inside",placeholder:"Placeholder"}),e.jsx(t,{label:"Secondary Start",labelVariant:"inside",placeholder:"Placeholder",start:e.jsx(h,{transparent:!0,accessibilityLabel:"Add",name:"add"}),variant:"secondary"}),e.jsx(t,{end:e.jsx(h,{transparent:!0,accessibilityLabel:"Add",name:"add"}),label:" Secondary End",labelVariant:"inside",placeholder:"Placeholder",variant:"secondary"}),e.jsx(t,{compact:!0,label:"Compact+Inside",labelVariant:"inside",placeholder:"Placeholder",variant:"secondary"}),e.jsx(t,{helperText:"Error: Your favorite color is not orange",label:"Error state",labelVariant:"inside",placeholder:"Enter your favorite color",variant:"negative"})]})},f=function(){return e.jsx(t,{label:"Label",placeholder:"placeholder"})},g=function(){return e.jsx(t,{helperText:"helperText",label:"Label",placeholder:"placeholder"})},I=function(){const r=["start","end"];return e.jsx(e.Fragment,{children:r.map(n=>e.jsx(t,{align:n,helperText:"helperText",label:`Label: ${n}`,placeholder:"placeholder"}))})},T=()=>e.jsx(e.Fragment,{children:Z.map(a=>e.jsx(t,{helperText:"helperText",label:`Label: ${a}`,placeholder:"placeholder",variant:a}))}),C=()=>e.jsx(e.Fragment,{children:Z.map(a=>e.jsx(t,{enableColorSurge:!0,helperText:"helperText",label:`Label: ${a}`,placeholder:"placeholder",variant:a}))}),S=function(){return e.jsx(t,{label:"Number Input",type:"number"})},v=function(){const r=["100%","30%","75%","10%"];return e.jsx(e.Fragment,{children:r.map(n=>e.jsx(t,{helperText:"helperText",label:`Width: ${n}`,placeholder:"placeholder",width:n},`input-width-${n}`))})},y=function(){const r=[56,40];return e.jsx(e.Fragment,{children:r.map(n=>e.jsx(t,{height:n,helperText:"helperText",label:`Height: ${n}`,placeholder:"placeholder"},`input-height-${n}`))})},ne=[0,100,200,300,400,500,600,700,800,900,1e3],$=()=>ne.map(a=>e.jsx(t,{borderRadius:a,helperText:"helperText",label:`BorderRadius: ${a}`,placeholder:"placeholder"},`border-radius-${a}`)),L=function(){return e.jsx(t,{bordered:!1,helperText:"helperText",label:"borderless",placeholder:"placeholder"})},d=function(){return e.jsxs(e.Fragment,{children:[e.jsx(t,{disabled:!0,label:"Disabled label"}),e.jsx(t,{disabled:!0,label:"Label",start:e.jsx(h,{active:!0,transparent:!0,accessibilityLabel:"Add",name:"add"})})]})};d.bind({});d.parameters={a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const N=function(){return e.jsx(t,{accessibilityLabel:"No Label"})},j=function(){return e.jsxs(Y,{gap:2,children:[e.jsx(t,{accessibilityLabel:"Display name",id:"display-name-tooltip",labelNode:e.jsxs(i,{alignItems:"center",children:[e.jsx(u,{htmlFor:"display-name-tooltip",children:"Display name"}),e.jsx(te,{content:"This will be visible to other users.",children:e.jsx(W,{active:!0,color:"fg",name:"info",padding:.75,size:"xs",tabIndex:0})})]}),placeholder:"Satoshi Nakamoto"}),e.jsx(t,{compact:!0,accessibilityLabel:"Amount",labelNode:e.jsx(u,{children:e.jsxs(i,{alignItems:"center",gap:.5,children:["Amount",e.jsx(X,{color:"fgNegative",font:"label1",children:"*"})]})}),placeholder:"0.00",suffix:"USD"}),e.jsx(t,{compact:!0,accessibilityLabel:"Search",labelNode:e.jsx(u,{children:"Search"}),placeholder:"Search...",start:e.jsx(h,{transparent:!0,accessibilityLabel:"Search",name:"search"})}),e.jsx(t,{compact:!0,accessibilityLabel:"Amount",labelNode:e.jsx(u,{children:e.jsxs(i,{alignItems:"center",gap:.5,children:["Amount",e.jsx(X,{color:"fgNegative",font:"label1",children:"*"})]})}),placeholder:"0.00",start:e.jsx(z,{paddingX:1,children:e.jsx(J,{alt:"USD",size:"s",src:"https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png"})}),suffix:"USD"}),e.jsx(t,{accessibilityLabel:"Bio",id:"bio-input",labelNode:e.jsx(u,{htmlFor:"bio-input",paddingY:0,children:e.jsxs(i,{alignItems:"center",gap:1,children:["Bio",e.jsx(X,{color:"fgMuted",font:"legal",children:"(optional)"})]})}),labelVariant:"inside",placeholder:"Tell us about yourself"}),e.jsx(t,{accessibilityLabel:"Notes",id:"notes-input",labelNode:e.jsx(u,{htmlFor:"notes-input",paddingY:0,children:"Notes"}),labelVariant:"inside",placeholder:"Add a note",start:e.jsx(K,{name:"pencil"})})]})},_=function(){return e.jsx(t,{label:"Label",start:e.jsx(h,{accessibilityLabel:"Add",name:"add"})})},R=function(){return e.jsx(t,{end:e.jsx(i,{paddingEnd:1,children:e.jsx(q,{font:"headline",href:"",children:"Hello"})}),label:"Label"})},A=function(){return e.jsx(t,{label:"Label",suffix:"USD"})},k=function(){return e.jsx(t,{end:e.jsx(h,{active:!0,transparent:!0,accessibilityLabel:"Add",name:"add"}),label:"Label",suffix:"USD"})},b=function(){return e.jsx(t,{compact:!0,label:"Label"})},E=function(){return e.jsx(t,{compact:!0,label:"Label",start:e.jsx(z,{children:e.jsx(J,{alt:"address",size:"l",src:"https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png"})})})},H=function(){return e.jsx(t,{compact:!0,end:e.jsx(i,{paddingEnd:1,children:e.jsx(q,{font:"headline",href:"",children:"Hello"})}),label:"Label"})},B=function(){return e.jsx(t,{compact:!0,label:"Label",suffix:"USD"})},O=function(){return e.jsx(t,{compact:!0,helperText:"helperText",label:"Label",suffix:"USD"})},D=function(){const[r,n]=o.useState("Test"),s=o.useCallback(l=>{n(l.target.value)},[]);return e.jsx("div",{children:e.jsx(t,{helperText:r,label:"Label",onChange:s})})},V=()=>{const[a,r]=o.useState("Test"),n=o.useRef(null),s=o.useCallback(c=>{r(c.target.value)},[]),l=e.jsx("input",{className:G,onChange:s,style:{width:"100%",borderRadius:"var(--borderRadius-200)"}});return e.jsx("div",{children:e.jsx(t,{ref:n,helperText:a,inputNode:l,label:"Label"})})},p=()=>{const[a,r]=o.useState("Test"),n=o.useRef(null),s=o.useCallback(c=>{r(c.target.value)},[]),l=e.jsx("input",{className:G,onChange:s,style:{width:"100%",borderRadius:"var(--borderRadius-200)"},value:"Custom Input"});return e.jsx("div",{children:e.jsx(t,{ref:n,disabled:!0,helperText:a,inputNode:l,label:"Label"})})};p.bind({});p.parameters={a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const w=()=>{const[a,r]=o.useState("Test"),n=o.useRef(null),s=o.useCallback(c=>{r(c.target.value)},[]),l=e.jsx("input",{className:G,onChange:s,style:{width:"100%",borderRadius:"var(--borderRadius-200)"}});return e.jsx("div",{children:e.jsx(t,{ref:n,compact:!0,helperText:a,inputNode:l,label:"Label"})})},M=()=>{const[a,r]=o.useState(""),n=o.useCallback(l=>{r(l.target.value)},[]),s=o.useMemo(()=>({resize:"none"}),[]);return e.jsx("div",{children:e.jsx(t,{helperText:"Test",inputNode:e.jsx(Q,{cols:5,onChange:n,rows:7,style:s,value:a}),label:"Label"})})},P=()=>{const[a,r]=o.useState(""),n=o.useCallback(l=>{r(l.target.value)},[]),s=o.useMemo(()=>({resize:"none"}),[]);return e.jsx("div",{children:e.jsx(t,{helperText:"Test",inputNode:e.jsx(Q,{cols:5,containerSpacing:ae,onChange:n,rows:7,style:s,value:a}),label:"Label"})})},re={primary:"fgPrimary",positive:"fgPositive",negative:"fgNegative",foreground:"fg",foregroundMuted:"fgMuted",secondary:"bgSecondary"},F=function(){const[r,n]=o.useState(!1),[s,l]=o.useState("foregroundMuted"),c=o.useCallback(()=>{n(!r),l(r?"foregroundMuted":"positive"),console.log(s)},[r,s]),ee=o.useCallback(()=>{l("foregroundMuted"),n(!1)},[]);return e.jsx("div",{children:e.jsx(t,{end:e.jsxs(i,{children:[e.jsx(q,{as:"button",color:re[s],font:"legal",onClick:c,children:r?"copied":"copy"}),e.jsx(K,{active:!0,name:"visible"})]}),helperText:"Warning: Something interesting",label:"Label",onChange:ee,variant:s})})},U=function(){return e.jsxs(Y,{gap:1,children:[e.jsx(t,{readOnly:!0,label:"Read-Only Label",value:"Some text"}),e.jsx(t,{readOnly:!0,helperText:"Some helper text",label:"Read-Only with HelperText",value:"Some text"}),e.jsx(t,{readOnly:!0,label:"Read-Only with Start Node",start:e.jsx(z,{paddingX:2,children:e.jsx(W,{color:"fg",name:"qrCode",size:"m"})}),value:"Some text"}),e.jsx(t,{compact:!0,readOnly:!0,end:e.jsx(z,{paddingX:2,children:e.jsx(W,{color:"fg",name:"qrCode",size:"m"})}),label:"Compact Read-Only with End Node",placeholder:"Placeholder"})]})};m.__docgenInfo={description:"DEFAULT TEXT INPUT VARIATIONS",methods:[],displayName:"Basic"};x.__docgenInfo={description:"",methods:[],displayName:"InsideLabel"};f.__docgenInfo={description:"",methods:[],displayName:"Placeholder"};g.__docgenInfo={description:"",methods:[],displayName:"HelperText"};I.__docgenInfo={description:"",methods:[],displayName:"Align"};T.__docgenInfo={description:"",methods:[],displayName:"Variants"};C.__docgenInfo={description:"",methods:[],displayName:"ColorSurge"};S.__docgenInfo={description:"",methods:[],displayName:"NumberInput"};v.__docgenInfo={description:"",methods:[],displayName:"Width"};y.__docgenInfo={description:"",methods:[],displayName:"Height"};L.__docgenInfo={description:"",methods:[],displayName:"Borderless"};d.__docgenInfo={description:"",methods:[],displayName:"Disabled"};N.__docgenInfo={description:"",methods:[],displayName:"NoLabel"};j.__docgenInfo={description:"",methods:[],displayName:"CustomLabel"};_.__docgenInfo={description:"",methods:[],displayName:"StartContent"};R.__docgenInfo={description:"",methods:[],displayName:"EndContent"};A.__docgenInfo={description:"",methods:[],displayName:"Suffix"};k.__docgenInfo={description:"",methods:[],displayName:"SuffixAndEndContent"};b.__docgenInfo={description:"COMPACT TEXT INPUT VARIATIONS",methods:[],displayName:"CompactInput"};E.__docgenInfo={description:"",methods:[],displayName:"CompactInputStart"};H.__docgenInfo={description:"",methods:[],displayName:"CompactInputEnd"};B.__docgenInfo={description:"",methods:[],displayName:"CompactInputSuffix"};O.__docgenInfo={description:"",methods:[],displayName:"CompactHelperText"};D.__docgenInfo={description:"",methods:[],displayName:"InputOnChange"};V.__docgenInfo={description:"",methods:[],displayName:"RenderInputDefault"};p.__docgenInfo={description:"",methods:[],displayName:"RenderInputDisabled"};w.__docgenInfo={description:"",methods:[],displayName:"RenderInputCompact"};M.__docgenInfo={description:"",methods:[],displayName:"RenderNativeTextArea"};P.__docgenInfo={description:"",methods:[],displayName:"RenderNativeTextAreaCustomSpacing"};F.__docgenInfo={description:"",methods:[],displayName:"CopyTextInput"};U.__docgenInfo={description:"",methods:[],displayName:"ReadOnly"};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`function Basic() {
  const onFocus = useCallback(() => {
    console.log('Focusing');
  }, []);
  const onBlur = useCallback(() => {
    console.log('Blurring');
  }, []);
  return <TextInput label="Label" onBlur={onBlur} onFocus={onFocus} />;
}`,...m.parameters?.docs?.source},description:{story:"DEFAULT TEXT INPUT VARIATIONS",...m.parameters?.docs?.description}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`function InsideLabel() {
  return <VStack gap={2}>
      <TextInput label="Inside Label" labelVariant="inside" placeholder="Placeholder" />
      <TextInput label="Secondary Start" labelVariant="inside" placeholder="Placeholder" start={<InputIconButton transparent accessibilityLabel="Add" name="add" />} variant="secondary" />
      <TextInput end={<InputIconButton transparent accessibilityLabel="Add" name="add" />} label=" Secondary End" labelVariant="inside" placeholder="Placeholder" variant="secondary" />
      <TextInput compact label="Compact+Inside" labelVariant="inside" placeholder="Placeholder" variant="secondary" />
      <TextInput helperText="Error: Your favorite color is not orange" label="Error state" labelVariant="inside" placeholder="Enter your favorite color" variant="negative" />
    </VStack>;
}`,...x.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`function Placeholder() {
  return <TextInput label="Label" placeholder="placeholder" />;
}`,...f.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`function HelperText() {
  return <TextInput helperText="helperText" label="Label" placeholder="placeholder" />;
}`,...g.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`function Align() {
  const alignments = ['start', 'end'] as const;
  return <>
      {alignments.map(align => <TextInput align={align} helperText="helperText" label={\`Label: \${align}\`} placeholder="placeholder" />)}
    </>;
}`,...I.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`() => {
  return <>
      {variants.map(variant => <TextInput helperText="helperText" label={\`Label: \${variant}\`} placeholder="placeholder" variant={variant} />)}
    </>;
}`,...T.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`() => {
  return <>
      {variants.map(variant => <TextInput enableColorSurge helperText="helperText" label={\`Label: \${variant}\`} placeholder="placeholder" variant={variant} />)}
    </>;
}`,...C.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`function NumberInput() {
  return <TextInput label="Number Input" type="number" />;
}`,...S.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`function Width() {
  const widths = ['100%', '30%', '75%', '10%'] as const;
  return <>
      {widths.map(width => <TextInput key={\`input-width-\${width}\`} helperText="helperText" label={\`Width: \${width}\`} placeholder="placeholder" width={width} />)}
    </>;
}`,...v.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:'function Height() {\n  const heights = [56, 40];\n  return <>\n      {heights.map(height => <TextInput key={`input-height-${height}`} height={height} helperText="helperText" label={`Height: ${height}`} placeholder="placeholder" />)}\n    </>;\n}',...y.parameters?.docs?.source}}};$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:'() => borderRadii.map(borderRadius => <TextInput key={`border-radius-${borderRadius}`} borderRadius={borderRadius} helperText="helperText" label={`BorderRadius: ${borderRadius}`} placeholder="placeholder" />)',...$.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`function Borderless() {
  return <TextInput bordered={false} helperText="helperText" label="borderless" placeholder="placeholder" />;
}`,...L.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`function Disabled() {
  return <>
      <TextInput disabled label="Disabled label" />
      <TextInput disabled label="Label" start={<InputIconButton active transparent accessibilityLabel="Add" name="add" />} />
    </>;
}`,...d.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`function NoLabel() {
  return <TextInput accessibilityLabel="No Label" />;
}`,...N.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`function CustomLabel() {
  return <VStack gap={2}>
      {/* Default with tooltip */}
      <TextInput accessibilityLabel="Display name" id="display-name-tooltip" labelNode={<HStack alignItems="center">
            <InputLabel htmlFor="display-name-tooltip">Display name</InputLabel>
            <Tooltip content="This will be visible to other users.">
              <Icon active color="fg" name="info" padding={0.75} size="xs" tabIndex={0} />
            </Tooltip>
          </HStack>} placeholder="Satoshi Nakamoto" />
      {/* Compact with required indicator */}
      <TextInput compact accessibilityLabel="Amount" labelNode={<InputLabel>
            <HStack alignItems="center" gap={0.5}>
              Amount
              <Text color="fgNegative" font="label1">
                *
              </Text>
            </HStack>
          </InputLabel>} placeholder="0.00" suffix="USD" />
      {/* Compact with start icon */}
      <TextInput compact accessibilityLabel="Search" labelNode={<InputLabel>Search</InputLabel>} placeholder="Search..." start={<InputIconButton transparent accessibilityLabel="Search" name="search" />} />
      {/* Compact with start avatar */}
      <TextInput compact accessibilityLabel="Amount" labelNode={<InputLabel>
            <HStack alignItems="center" gap={0.5}>
              Amount
              <Text color="fgNegative" font="label1">
                *
              </Text>
            </HStack>
          </InputLabel>} placeholder="0.00" start={<Box paddingX={1}>
            <Avatar alt="USD" size="s" src="https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png" />
          </Box>} suffix="USD" />
      {/* Inside variant with optional indicator */}
      <TextInput accessibilityLabel="Bio" id="bio-input" labelNode={<InputLabel htmlFor="bio-input" paddingY={0}>
            <HStack alignItems="center" gap={1}>
              Bio
              <Text color="fgMuted" font="legal">
                (optional)
              </Text>
            </HStack>
          </InputLabel>} labelVariant="inside" placeholder="Tell us about yourself" />
      {/* Inside variant with start icon */}
      <TextInput accessibilityLabel="Notes" id="notes-input" labelNode={<InputLabel htmlFor="notes-input" paddingY={0}>
            Notes
          </InputLabel>} labelVariant="inside" placeholder="Add a note" start={<InputIcon name="pencil" />} />
    </VStack>;
}`,...j.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`function StartContent() {
  return <TextInput label="Label" start={<InputIconButton accessibilityLabel="Add" name="add" />} />;
}`,..._.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`function EndContent() {
  return <TextInput end={<HStack paddingEnd={1}>
          <Link font="headline" href="">
            Hello
          </Link>
        </HStack>} label="Label" />;
}`,...R.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`function Suffix() {
  return <TextInput label="Label" suffix="USD" />;
}`,...A.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`function SuffixAndEndContent() {
  return <TextInput end={<InputIconButton active transparent accessibilityLabel="Add" name="add" />} label="Label" suffix="USD" />;
}`,...k.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`function CompactInput() {
  return <TextInput compact label="Label" />;
}`,...b.parameters?.docs?.source},description:{story:"COMPACT TEXT INPUT VARIATIONS",...b.parameters?.docs?.description}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`function CompactInputStart() {
  return <TextInput compact label="Label" start={<Box>
          <Avatar alt="address" size="l" src="https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png" />
        </Box>} />;
}`,...E.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`function CompactInputEnd() {
  return <TextInput compact end={<HStack paddingEnd={1}>
          <Link font="headline" href="">
            Hello
          </Link>
        </HStack>} label="Label" />;
}`,...H.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`function CompactInputSuffix() {
  return <TextInput compact label="Label" suffix="USD" />;
}`,...B.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`function CompactHelperText() {
  return <TextInput compact helperText="helperText" label="Label" suffix="USD" />;
}`,...O.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`function InputOnChange() {
  const [inputText, setInputText] = useState('Test');
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }, []);
  return <div>
      <TextInput helperText={inputText} label="Label" onChange={onChange} />
    </div>;
}`,...D.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`() => {
  const [inputText, setInputText] = useState('Test');
  const ref = useRef<HTMLInputElement>(null);
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }, []);
  const renderInput = <input className={nativeInputCustomCss} onChange={onChange} style={{
    width: '100%',
    borderRadius: 'var(--borderRadius-200)'
  }} />;
  return <div>
      <TextInput ref={ref} helperText={inputText} inputNode={renderInput} label="Label" />
    </div>;
}`,...V.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => {
  const [inputText, setInputText] = useState('Test');
  const ref = useRef<HTMLInputElement>(null);
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }, []);
  const renderInput = <input className={nativeInputCustomCss} onChange={onChange} style={{
    width: '100%',
    borderRadius: 'var(--borderRadius-200)'
  }} value="Custom Input" />;
  return <div>
      <TextInput ref={ref} disabled helperText={inputText} inputNode={renderInput} label="Label" />
    </div>;
}`,...p.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`() => {
  const [inputText, setInputText] = useState('Test');
  const ref = useRef<HTMLInputElement>(null);
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }, []);
  const renderInput = <input className={nativeInputCustomCss} onChange={onChange} style={{
    width: '100%',
    borderRadius: 'var(--borderRadius-200)'
  }} />;
  return <div>
      <TextInput ref={ref} compact helperText={inputText} inputNode={renderInput} label="Label" />
    </div>;
}`,...w.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`() => {
  const [inputText, setInputText] = useState('');
  const onChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  }, []);
  const customNativeTextAreaCSS = useMemo(() => {
    return {
      resize: 'none'
    } as const;
  }, []);
  return <div>
      <TextInput helperText="Test" inputNode={<NativeTextArea cols={5} onChange={onChange} rows={7} style={customNativeTextAreaCSS} value={inputText} />} label="Label" />
    </div>;
}`,...M.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`() => {
  const [inputText, setInputText] = useState('');
  const onChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  }, []);
  const customNativeTextAreaCSS = useMemo(() => {
    return {
      resize: 'none'
    } as const;
  }, []);
  return <div>
      <TextInput helperText="Test" inputNode={<NativeTextArea cols={5} containerSpacing={customContainerPaddingCss} onChange={onChange} rows={7} style={customNativeTextAreaCSS} value={inputText} />} label="Label" />
    </div>;
}`,...P.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`function CopyTextInput() {
  const [copied, setCopied] = useState(false);
  const [variant, setVariant] = useState<InputVariant>('foregroundMuted');
  const handleOnClick = useCallback(() => {
    setCopied(!copied);
    setVariant(copied ? 'foregroundMuted' : 'positive');
    console.log(variant);
  }, [copied, variant]);
  const handleOnChange = useCallback(() => {
    setVariant('foregroundMuted');
    setCopied(false);
  }, []);
  return <div>
      <TextInput end={<HStack>
            <Link as="button" color={variantColorMap[variant]} font="legal" onClick={handleOnClick}>
              {copied ? 'copied' : 'copy'}
            </Link>
            <InputIcon active name="visible" />
          </HStack>} helperText="Warning: Something interesting" label="Label" onChange={handleOnChange} variant={variant} />
    </div>;
}`,...F.parameters?.docs?.source}}};U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`function ReadOnly() {
  return <VStack gap={1}>
      <TextInput readOnly label="Read-Only Label" value="Some text" />
      <TextInput readOnly helperText="Some helper text" label="Read-Only with HelperText" value="Some text" />
      <TextInput readOnly label="Read-Only with Start Node" start={<Box paddingX={2}>
            <Icon color="fg" name="qrCode" size="m" />
          </Box>} value="Some text" />
      <TextInput compact readOnly end={<Box paddingX={2}>
            <Icon color="fg" name="qrCode" size="m" />
          </Box>} label="Compact Read-Only with End Node" placeholder="Placeholder" />
    </VStack>;
}`,...U.parameters?.docs?.source}}};const Ke=["Basic","InsideLabel","Placeholder","HelperText","Align","Variants","ColorSurge","NumberInput","Width","Height","BorderRadius","Borderless","Disabled","NoLabel","CustomLabel","StartContent","EndContent","Suffix","SuffixAndEndContent","CompactInput","CompactInputStart","CompactInputEnd","CompactInputSuffix","CompactHelperText","InputOnChange","RenderInputDefault","RenderInputDisabled","RenderInputCompact","RenderNativeTextArea","RenderNativeTextAreaCustomSpacing","CopyTextInput","ReadOnly"];export{I as Align,m as Basic,$ as BorderRadius,L as Borderless,C as ColorSurge,O as CompactHelperText,b as CompactInput,H as CompactInputEnd,E as CompactInputStart,B as CompactInputSuffix,F as CopyTextInput,j as CustomLabel,d as Disabled,R as EndContent,y as Height,g as HelperText,D as InputOnChange,x as InsideLabel,N as NoLabel,S as NumberInput,f as Placeholder,U as ReadOnly,w as RenderInputCompact,V as RenderInputDefault,p as RenderInputDisabled,M as RenderNativeTextArea,P as RenderNativeTextAreaCustomSpacing,_ as StartContent,A as Suffix,k as SuffixAndEndContent,T as Variants,v as Width,Ke as __namedExportsOrder,Je as default};
