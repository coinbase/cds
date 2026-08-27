import{r as t,bC as C,j as e,bD as V,B as v,by as U}from"./iframe-CsG_6vZR.js";import{B as u}from"./Button-D2WSek5T.js";import{H as f}from"./HStack-DaDYipoP.js";import{I as j}from"./IconButton-DNJ86Kiu.js";import{C as q}from"./ColorSurge-2yE2z4Kr.js";import{u as H}from"./useMotionProps-BXBckQBf.js";import{T as M}from"./Text-B1CpMNU3.js";import{P as L}from"./Portal-BaLq4aAx.js";import{u as W}from"./use-animation-DHwoMYVB.js";import{m as R}from"./motion-minimal-5s2ikV7b.js";import"./preload-helper-D9Z9MdNV.js";import"./Icon-DTs0crZh.js";import"./useTheme-CmrOhAty.js";import"./Spinner-C8x8bhOH.js";import"./Pressable-DDN99tmF.js";import"./isArray-M0ytM-vC.js";import"./Interactable--rqISG90.js";import"./color-Ceo1QMNe.js";import"./tokens-BwScSksM.js";import"./utils-y2S18Lx0.js";const k=0,A=25,T=1,I=0,z={property:"opacity",easing:"enterFunctional",duration:"moderate3",toValue:T,fromValue:k},E={property:"opacity",easing:"exitFunctional",duration:"moderate3",toValue:k,fromValue:T},_={property:"y",easing:"enterFunctional",duration:"moderate3",toValue:I,fromValue:A},N={property:"y",easing:"exitFunctional",duration:"moderate3",toValue:A,fromValue:I},F={accessibilityLabel:"close"},$="baseCss-b8p5gs3",Q="toastCss-t42zdpi",Y="cds-toast",g=t.memo(t.forwardRef(({text:s,action:n,onWillHide:a,onDidHide:o,disablePortal:l=!1,hideCloseButton:r=!1,testID:i=Y,bottomOffset:p="var(--space-4)",closeButtonAccessibilityProps:m=F,variant:c,...x},O)=>{const{pauseTimer:B,resumeTimer:P}=t.useContext(C),d=W(),D=H({enterConfigs:[z,_],exitConfigs:[E,N],animate:d,style:{bottom:p}});t.useEffect(()=>{d.start("enter")},[d]);const b=t.useCallback(async()=>(a?.(),await d.start("exit"),o?.(),!0),[a,o,d]);t.useImperativeHandle(O,()=>({hide:b}),[b]);const S=t.useCallback(()=>{n?.onPress(),b()},[n,b]);return e.jsx(L,{containerId:V,disablePortal:l,children:e.jsx(R.div,{...D,className:$,"data-testid":`${i}-motion`,children:e.jsx(v,{justifyContent:"center",onMouseEnter:B,onMouseLeave:P,padding:2,role:"alert",testID:i,width:"100%",...x,children:e.jsxs(f,{alignItems:"center",background:"bgAlternate",borderRadius:200,className:Q,elevation:2,maxWidth:550,overflow:"hidden",paddingEnd:1,paddingStart:3,paddingY:1,position:"relative",children:[e.jsx(v,{flexShrink:1,paddingEnd:2,paddingY:1,children:e.jsx(M,{as:"p",display:"block",font:"headline",tabIndex:0,children:s})}),e.jsx(q,{background:c}),e.jsxs(f,{children:[!!n&&e.jsx(u,{compact:!0,transparent:!0,onClick:S,testID:n.testID??"toast-action",children:n.label}),!r&&e.jsx(j,{transparent:!0,name:"close",onClick:b,testID:`${i}-close-button`,variant:"foregroundMuted",...m})]})]})})})})}));g.__docgenInfo={description:"",methods:[],displayName:"Toast",props:{testID:{required:!1,tsType:{name:"string"},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`,defaultValue:{value:"'cds-toast'",computed:!1}},accessibilityLabel:{required:!1,tsType:{name:"string"},description:`On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
On mobile, VoiceOver will read this string when a user selects the associated element.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
@link https://reactnative.dev/docs/accessibility#accessibilitylabel`},accessibilityHint:{required:!1,tsType:{name:"string"},description:`On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
when that result is not clear from the accessibility label.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
@link https://reactnative.dev/docs/accessibility#accessibilityhint`},accessibilityLabelledBy:{required:!1,tsType:{name:"string"},description:"On web, maps to `aria-labelledby` and lists the id(s) of the element(s) that label the element on which the attribute is set.\nOn mobile (Android only), a reference to another element `nativeID` used to build complex forms.\n@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby\n@link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android"},id:{required:!1,tsType:{name:"string"},description:`Used for a11y to indicate the relationship between a controlled element and its controller
eg: a Button that controls the visibility of a Modal`},accessibilityLabelId:{required:!1,tsType:{name:"string"},description:"Used to associate a label with an input for accessibility"},accessibilityDescriptionId:{required:!1,tsType:{name:"string"},description:"Used to associate descriptive text to an input for accessibility"},text:{required:!0,tsType:{name:"string"},description:"The message to be displayed in the toast"},action:{required:!1,tsType:{name:"intersection",raw:`SharedProps & {
  /**
   * Label for the action button
   */
  label: string;
  /**
   * Callback function fired when the button is pressed
   */
  onPress: () => void;
}`,elements:[{name:"signature",type:"object",raw:`{
  /**
   * Used to locate this element in unit and end-to-end tests.
   * Under the hood, testID translates to data-testid on Web. On Mobile, testID
   * stays the same - testID
   */
  testID?: string;
}`,signature:{properties:[{key:"testID",value:{name:"string",required:!1},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`}]}},{name:"signature",type:"object",raw:`{
  /**
   * Label for the action button
   */
  label: string;
  /**
   * Callback function fired when the button is pressed
   */
  onPress: () => void;
}`,signature:{properties:[{key:"label",value:{name:"string",required:!0},description:"Label for the action button"},{key:"onPress",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0},description:"Callback function fired when the button is pressed"}]}}]},description:"Optional toast action i.e. a CTA button"},bottomOffset:{required:!1,tsType:{name:"union",raw:"'auto' | FixedValue | PercentageValue",elements:[{name:"literal",value:"'auto'"},{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}]},{name:"string"}]},description:"The vertical offset from the bottom of the screen",defaultValue:{value:"'var(--space-4)'",computed:!1}},variant:{required:!1,tsType:{name:"ThemeVars.Color"},description:`Controls color surge of the Toast background
@default primary`},hideCloseButton:{required:!1,tsType:{name:"boolean"},description:`Hide the close button on the right
@default false`,defaultValue:{value:"false",computed:!1}},closeButtonAccessibilityProps:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /**
   * On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
   * On mobile, VoiceOver will read this string when a user selects the associated element.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabel
   */
  accessibilityLabel?: string;
  /**
   * On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
   * On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
   * when that result is not clear from the accessibility label.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
   * @link https://reactnative.dev/docs/accessibility#accessibilityhint
   */
  accessibilityHint?: string;
  /**
   * On web, maps to \`aria-labelledby\` and lists the id(s) of the element(s) that label the element on which the attribute is set.
   * On mobile (Android only), a reference to another element \`nativeID\` used to build complex forms.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android
   */
  accessibilityLabelledBy?: string;
  /**
   * Used for a11y to indicate the relationship between a controlled element and its controller
   * eg: a Button that controls the visibility of a Modal
   */
  id?: string;
  /** Used to associate a label with an input for accessibility */
  accessibilityLabelId?: string;
  /** Used to associate descriptive text to an input for accessibility */
  accessibilityDescriptionId?: string;
}`,signature:{properties:[{key:"accessibilityLabel",value:{name:"string",required:!1},description:`On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
On mobile, VoiceOver will read this string when a user selects the associated element.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
@link https://reactnative.dev/docs/accessibility#accessibilitylabel`},{key:"accessibilityHint",value:{name:"string",required:!1},description:`On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
when that result is not clear from the accessibility label.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
@link https://reactnative.dev/docs/accessibility#accessibilityhint`},{key:"accessibilityLabelledBy",value:{name:"string",required:!1},description:"On web, maps to `aria-labelledby` and lists the id(s) of the element(s) that label the element on which the attribute is set.\nOn mobile (Android only), a reference to another element `nativeID` used to build complex forms.\n@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby\n@link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android"},{key:"id",value:{name:"string",required:!1},description:`Used for a11y to indicate the relationship between a controlled element and its controller
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},description:`Accessibility props are provided to ensure i18n
support for all relevant a11y props
@default { accessibilityLabel: "close" }`,defaultValue:{value:`{
  accessibilityLabel: 'close',
}`,computed:!1}},disablePortal:{defaultValue:{value:"false",computed:!1},required:!1}}};const G=5e3,J=2e3,K=300,w=50,X=()=>{const{addToast:s,removeToast:n,hideToast:a,clearToastQueue:o}=t.useContext(C),l=t.useCallback((r,i)=>{const p=()=>{i?.onDidHide?.(),n()},m=()=>{let c=G;return i?.action&&(c+=J),r.length>w&&(c+=Math.round((r.length-w)/10*K)),c};s(e.jsx(g,{text:r,...i,onDidHide:p}),i?.duration??m())},[s,n]);return t.useMemo(()=>({show:l,hide:a,clearQueue:o}),[l,o,a])},Ce={title:"Components/Toast",component:g},y=()=>console.log("action pressed"),Z=()=>console.log("toast hiding"),ee=()=>console.log("toast hidden"),h=()=>{const s=X(),n=t.useCallback(()=>{s.show("Toast copy",{action:{label:"Action",onPress:y},hideCloseButton:!0,disablePortal:!0,onWillHide:Z,onDidHide:ee})},[s]),a=t.useCallback(()=>{s.show(`Very${" very".repeat(30)} long toast copy`,{action:{label:"Action",onPress:y}})},[s]),o=t.useCallback(()=>{s.show("Toast copy",{action:{label:"Action",onPress:y},bottomOffset:100})},[s]),l=t.useCallback(()=>{s.show("Toast copy",{variant:"bgNegative"})},[s]);return e.jsx(U,{children:e.jsxs(f,{gap:3,children:[e.jsx(u,{onClick:n,children:"Show Toast"}),e.jsx(u,{onClick:a,children:"Multiline Toast"}),e.jsx(u,{onClick:o,children:"Bottom Offset Toast"}),e.jsx(u,{onClick:l,children:"Variant"})]})})};h.__docgenInfo={description:"",methods:[],displayName:"BasicToast"};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => {
  const toast = useToast();
  const handleShow = useCallback(() => {
    toast.show('Toast copy', {
      action: {
        label: 'Action',
        onPress: onActionPressConsole
      },
      hideCloseButton: true,
      disablePortal: true,
      onWillHide: onWillHideConsole,
      onDidHide: onDidHideConsole
    });
  }, [toast]);
  const handleShowMultiline = useCallback(() => {
    toast.show(\`Very\${' very'.repeat(30)} long toast copy\`, {
      action: {
        label: 'Action',
        onPress: onActionPressConsole
      }
    });
  }, [toast]);
  const handleShowBottomOffset = useCallback(() => {
    toast.show('Toast copy', {
      action: {
        label: 'Action',
        onPress: onActionPressConsole
      },
      bottomOffset: 100
    });
  }, [toast]);
  const handleVariant = useCallback(() => {
    toast.show('Toast copy', {
      variant: 'bgNegative'
    });
  }, [toast]);
  return <PortalProvider>
      <HStack gap={3}>
        <Button onClick={handleShow}>Show Toast</Button>
        <Button onClick={handleShowMultiline}>Multiline Toast</Button>
        <Button onClick={handleShowBottomOffset}>Bottom Offset Toast</Button>
        <Button onClick={handleVariant}>Variant</Button>
      </HStack>
    </PortalProvider>;
}`,...h.parameters?.docs?.source}}};const ke=["BasicToast"];export{h as BasicToast,ke as __namedExportsOrder,Ce as default};
