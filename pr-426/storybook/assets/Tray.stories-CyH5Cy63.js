import{r as n,c as y,j as e,B as R,bE as qe,ak as Ne}from"./iframe-CYDANtMt.js";import{B as l}from"./Button-DPtA13Wn.js";import{L as ee}from"./ListCell-CZflgNsr.js";import{u as I}from"./useBreakpoints-Bxk0TUW-.js";import{P as he}from"./Pictogram-BOyJGVDK.js";import{H as Z}from"./HStack-Fh-9TmPm.js";import{V as r}from"./VStack-iXgNewwv.js";import{P as _}from"./PageFooter-uH4cWmSR.js";import{T as s}from"./Text-0g3rWpAf.js";import{O as Ve}from"./OverlayContentContext-D3LfdOuR.js";import{u as He}from"./useDimensions-C4mzPCUe.js";import{u as Ee}from"./useScrollBlocker-smLDx_Od.js";import{u as Le}from"./useTheme-C_Ehsh33.js";import{F as Fe}from"./FocusTrap-D5jofIBF.js";import{P as De}from"./Pressable-BvczHaFK.js";import{O as Ae}from"./Overlay-BrSXLw2H.js";import{P as _e}from"./Portal-BNKVVywf.js";import{u as Me}from"./use-animate-7aavNjax.js";import{u as We,a as Xe}from"./use-drag-controls-B3jFgE4y.js";import{M as ze}from"./index-CAK1E_4V.js";import{m as Ye}from"./motion-minimal-B1h7XI-_.js";import{I as Ge}from"./IconButton-D-CYL-b9.js";import"./preload-helper-D9Z9MdNV.js";import"./Icon-DRxKkZdt.js";import"./Spinner-CXotWqqb.js";import"./useCellSpacing-BH3_o_ol.js";import"./sizing-Do56D2dQ.js";import"./Cell-D1A-2vVj.js";import"./CellAccessory-Cln9vUz5.js";import"./isRtl-CGZsgYct.js";import"./versionMap-CcI7tU1w.js";import"./createIllustration-CSKQDVzw.js";import"./convertDimensionToSize-B6MeOypY.js";import"./useMergeRefs-DR4sGa7m.js";import"./debounce-fynzmAtJ.js";import"./isArray-BJmyNVUi.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";import"./useMotionProps-BF3bCUsm.js";import"./utils-CM_X5is-.js";import"./tokens-BwScSksM.js";import"./use-unmount-effect-DjWyEMV9.js";import"./animate-NV5OIPt9.js";const ue=150,Ue=.8,Je="containerBaseCss-c15d8m7k",Ke="containerPressableCss-cb6pzfv",Qe="handleCss-h539m2g",$=n.memo(({testID:t="handleBar",onClose:a,accessibilityLabel:o,accessibilityHint:i,classNames:c,styles:h,className:P,style:T,...B})=>{const v=n.useMemo(()=>T||h?.root?{...T,...h?.root}:void 0,[T,h?.root]),p=y(Qe,c?.handle);return e.jsx(R,{className:y(Je,a&&Ke,c?.root??P),"data-testid":t,style:v,...B,children:a?e.jsx(De,{noScaleOnPress:!0,accessibilityHint:i,accessibilityLabel:o,background:"bgInverse",borderColor:"transparent",className:p,onClick:a,style:h?.handle}):e.jsx(R,{accessibilityHint:i,accessibilityLabel:o,background:"bgInverse",className:p,style:h?.handle})})});$.__docgenInfo={description:"",methods:[],displayName:"HandleBar",props:{onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:`Callback fired when the handlebar is closed via keyboard (Enter/Space) or click.
When provided, the handle element becomes a focusable button and drag styling is enabled.`},classNames:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /** Root container element */
  root?: string;
  /** Handle element */
  handle?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1},description:"Root container element"},{key:"handle",value:{name:"string",required:!1},description:"Handle element"}]}},description:"Custom class names for individual elements of the HandleBar component"},styles:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /** Root container element */
  root?: React.CSSProperties;
  /** Handle element */
  handle?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Root container element"},{key:"handle",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Handle element"}]}},description:"Custom styles for individual elements of the HandleBar component"},testID:{defaultValue:{value:"'handleBar'",computed:!1},required:!1}}};const Ze=.4,$e=Ye(R),et=({enabled:t,children:a})=>t?e.jsx(Ne,{features:Xe,children:a}):a,tt="trayHeaderBorderBaseCss-t1vjg95i",nt="trayHeaderBorderVisibleCss-t1vz535f",ot="trayContainerBaseCss-t17mt5sl",st="trayContainerPinBottomCss-tgenj4o",at="trayContainerPinTopCss-t11ghqox",it="trayContainerPinLeftCss-t9zauvu",rt="trayContainerPinRightCss-t6grx7s",x={root:"cds-Tray",overlay:"cds-Tray-overlay",container:"cds-Tray-container",header:"cds-Tray-header",title:"cds-Tray-title",content:"cds-Tray-content",handleBar:"cds-Tray-handleBar",handleBarHandle:"cds-Tray-handleBarHandle",closeButton:"cds-Tray-closeButton"},pe={slideIn:{transition:{duration:.3}},slideOut:{transition:{duration:.3}}},lt={isDrawer:!0},u=n.memo(n.forwardRef(function({children:a,header:o,footer:i,title:c,onVisibilityChange:h,verticalDrawerPercentageOfView:P="85%",onBlur:T,onClose:B,onCloseComplete:v,preventDismiss:p,id:M,role:U="dialog",accessibilityLabel:W="Tray",accessibilityLabelledBy:X,focusTabIndexElements:z,restoreFocusOnUnmount:O=!0,reduceMotion:k,closeAccessibilityLabel:te="Close",closeAccessibilityHint:ne,styles:C,classNames:b,zIndex:me,pin:d="bottom",showHandleBar:Y,hideCloseButton:fe},ye){const ge=Le(),[J,oe]=n.useState(!0),[Te,Ce]=n.useState(!1),be=n.useRef(null),{observe:xe,height:K}=He(),se=n.useRef(null),[w,j]=Me(),ae=We(),g=d==="right"||d==="left",ie=n.useMemo(()=>d!=="bottom"||Y?{base:4,phone:3}:6,[Y,d]),Q=Ee();n.useEffect(()=>(Q(J),()=>Q(!1)),[J,Q]),n.useEffect(()=>(h?.("visible"),()=>h?.("hidden")),[h]);const m=n.useCallback(()=>{if(!w.current)return;let f;k?f={opacity:0}:f=g?{x:d==="right"?"100%":"-100%"}:{y:d==="bottom"?"100%":"-100%"},j(w.current,f,pe.slideOut.transition).then(()=>{oe(!1),B?.(),v?.()})},[j,w,g,d,B,v,k]),re=n.useCallback(()=>{w.current&&j(w.current,{y:"100%"},{duration:.15,ease:"easeOut"}).then(()=>{oe(!1),T?.(),B?.(),v?.()})},[j,w,T,B,v]);n.useImperativeHandle(ye,()=>({close:m}),[m]);const ve=n.useCallback(()=>{p||(T?.(),m())},[m,p,T]),we=n.useCallback((f,q)=>{const Ie=q.offset.y,Pe=q.velocity.y,Oe=K?Math.min(K*Ze,ue):ue;Ie>=Oe||Pe>=Ue?re():j(w.current,{y:0},{duration:.2,ease:"easeOut"})},[K,re,j,w]),Be=n.useMemo(()=>k?{opacity:0}:g?{x:d==="right"?"100%":"-100%"}:{y:d==="bottom"?"100%":"-100%"},[g,d,k]),Se=n.useMemo(()=>k?{opacity:1}:g?{x:0}:{y:0},[g,k]),G=Y&&d==="bottom",S=d!=="bottom"||Y,le=!p&&!(fe??G),ce=c||le;n.useEffect(()=>{const f=se.current;if(!f||!S)return;const q=()=>{Ce(f.scrollTop>0)};return f.addEventListener("scroll",q,{passive:!0}),()=>f.removeEventListener("scroll",q)},[S]);const de=n.useMemo(()=>typeof o=="function"?o({handleClose:m}):o,[o,m]),ke=n.useMemo(()=>typeof a=="function"?a({handleClose:m}):a,[a,m]),je=n.useMemo(()=>typeof i=="function"?i({handleClose:m}):i,[i,m]),Re=n.useMemo(()=>{switch(d){case"top":return at;case"left":return it;case"right":return rt;case"bottom":default:return st}},[d]);return J?e.jsx(Ve.Provider,{value:lt,children:e.jsx(_e,{containerId:qe,children:e.jsxs(R,{ref:be,className:y(x.root,b?.root),height:"100vh",pin:"all",position:"fixed",style:C?.root,width:"100vw",zIndex:me,children:[e.jsx(Ae,{className:y(x.overlay,b?.overlay),onClick:ve,style:C?.overlay,testID:"tray-overlay"}),e.jsx(ze,{reducedMotion:k?"always":void 0,children:e.jsx(et,{enabled:!p,children:e.jsx(Fe,{focusTabIndexElements:z,onEscPress:p?void 0:m,restoreFocusOnUnmount:O,children:e.jsx($e,{ref:w,accessibilityLabel:W,accessibilityLabelledBy:X,animate:Se,"aria-modal":"true",bordered:ge.activeColorScheme==="dark",className:y(ot,Re,x.container,b?.container),"data-testid":"tray",drag:p?void 0:"y",dragConstraints:{top:0,bottom:0},dragControls:ae,dragElastic:{top:0,bottom:.5},dragListener:!1,elevation:2,id:M,initial:Be,onClick:f=>f.stopPropagation(),onDragEnd:p?void 0:we,pin:d,role:U,style:{maxHeight:g?void 0:P,touchAction:!p&&d==="bottom"?"none":void 0,...C?.container},tabIndex:0,transition:pe.slideIn.transition,width:g?"min(400px, 100vw)":void 0,children:e.jsxs(r,{ref:xe,flexGrow:1,maxWidth:g?void 0:"70em",minHeight:0,width:"100%",children:[(ce||de||G)&&e.jsxs(r,{className:y(S&&tt,S&&Te&&nt,x.header,b?.header),flexShrink:0,overflow:"hidden",paddingBottom:S?.75:1,paddingTop:S?G?0:g?4:2:3,style:C?.header,children:[G&&(p?e.jsx($,{classNames:{root:y(x.handleBar,b?.handleBar),handle:y(x.handleBarHandle,b?.handleBarHandle)},styles:{root:C?.handleBar,handle:C?.handleBarHandle}}):e.jsx($,{accessibilityHint:ne,accessibilityLabel:te,classNames:{root:y(x.handleBar,b?.handleBar),handle:y(x.handleBarHandle,b?.handleBarHandle)},onClose:m,onPointerDown:f=>{ae.start(f)},styles:{root:C?.handleBar,handle:{...C?.handleBarHandle,touchAction:"none"}}})),ce&&e.jsxs(Z,{alignItems:g?"flex-start":"center",justifyContent:c?"space-between":"flex-end",paddingX:ie,children:[c&&(typeof c=="string"?e.jsx(s,{className:y(x.title,b?.title),font:"title3",style:C?.title,children:c}):c),le&&e.jsx(Ge,{transparent:!0,accessibilityHint:ne,accessibilityLabel:te,className:y(x.closeButton,b?.closeButton),margin:g?-1.5:void 0,name:"close",onClick:m,style:C?.closeButton,testID:"tray-close-button"})]}),de]}),e.jsx(r,{ref:se,className:y(x.content,b?.content),flexGrow:1,minHeight:0,overflow:"hidden",paddingBottom:S?0:2,paddingTop:S?0:1,paddingX:ie,style:{overflowY:"auto",...C?.content},children:ke}),je]})})})})})]})})}):null}));u.__docgenInfo={description:"",methods:[],displayName:"Tray",props:{children:{required:!1,tsType:{name:"union",raw:"React.ReactNode | TrayRenderChildren",elements:[{name:"ReactReactNode",raw:"React.ReactNode"},{name:"ReactFC",raw:"React.FC<{ handleClose: () => void }>",elements:[{name:"signature",type:"object",raw:"{ handleClose: () => void }",signature:{properties:[{key:"handleClose",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}}]}]},description:""},header:{required:!1,tsType:{name:"union",raw:"React.ReactNode | TrayRenderChildren",elements:[{name:"ReactReactNode",raw:"React.ReactNode"},{name:"ReactFC",raw:"React.FC<{ handleClose: () => void }>",elements:[{name:"signature",type:"object",raw:"{ handleClose: () => void }",signature:{properties:[{key:"handleClose",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}}]}]},description:"ReactNode to render as the Drawer header. Can be a ReactNode or a function that receives { handleClose }."},footer:{required:!1,tsType:{name:"union",raw:"React.ReactNode | TrayRenderChildren",elements:[{name:"ReactReactNode",raw:"React.ReactNode"},{name:"ReactFC",raw:"React.FC<{ handleClose: () => void }>",elements:[{name:"signature",type:"object",raw:"{ handleClose: () => void }",signature:{properties:[{key:"handleClose",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0}}]}}]}]},description:"ReactNode to render as the Drawer footer. Can be a ReactNode or a function that receives { handleClose }."},id:{required:!1,tsType:{name:"string"},description:"HTML ID for the tray"},pin:{required:!1,tsType:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}]},description:`Pin the tray to one side of the screen
@default 'bottom'`,defaultValue:{value:"'bottom'",computed:!1}},onBlur:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback fired when the overlay is pressed, or swipe to close"},onClose:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Action that will happen when tray is dismissed"},onCloseComplete:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Action that will happen when tray is dismissed"},onVisibilityChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(context: 'visible' | 'hidden') => void",signature:{arguments:[{type:{name:"union",raw:"'visible' | 'hidden'",elements:[{name:"literal",value:"'visible'"},{name:"literal",value:"'hidden'"}]},name:"context"}],return:{name:"void"}}},description:`Optional callback that, if provided, will be triggered when the Tray is toggled open/ closed
If used for analytics, context ('visible' | 'hidden') can be bundled with the event info to track whether the
multiselect was toggled into or out of view`},preventDismiss:{required:!1,tsType:{name:"boolean"},description:"Prevents a user from dismissing the tray by pressing the overlay or swiping\n@note hides closeButton when `true`"},hideCloseButton:{required:!1,tsType:{name:"boolean"},description:"Hide the close icon on the top right.\n@default `true` when handlebar is shown, false otherwise."},role:{required:!1,tsType:{name:"Extract",elements:[{name:"ReactAriaRole",raw:"React.AriaRole"},{name:"union",raw:"'dialog' | 'alertdialog'",elements:[{name:"literal",value:"'dialog'"},{name:"literal",value:"'alertdialog'"}]}],raw:"Extract<React.AriaRole, 'dialog' | 'alertdialog'>"},description:`WAI-ARIA Roles
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles`,defaultValue:{value:"'dialog'",computed:!1}},title:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Text or ReactNode for optional Tray title"},verticalDrawerPercentageOfView:{required:!1,tsType:{name:"string"},description:'Allow user of component to define maximum percentage of screen that can be taken up by the Drawer when pinned to the bottom or top.\n@note not used when `pin` is `"left"` or `"right"`.\n@example if you want a Drawer to take up 50% of the screen, you would pass a value of `"50%"`\n@default "85%"',defaultValue:{value:"'85%'",computed:!1}},zIndex:{required:!1,tsType:{name:"number"},description:"z-index for the tray overlay"},focusTabIndexElements:{required:!1,tsType:{name:"boolean"},description:"Allow any element with `tabIndex` attribute to be focusable in FocusTrap, rather than only focusing specific interactive element types like button.\nThis can be useful when having long content in a Modal."},restoreFocusOnUnmount:{required:!1,tsType:{name:"boolean"},description:`If \`true\`, the focus trap will restore focus to the previously focused element when it unmounts.

WARNING: If you disable this, you need to ensure that focus is restored properly so it doesn't end up on the body
@default true`,defaultValue:{value:"true",computed:!1}},reduceMotion:{required:!1,tsType:{name:"boolean"},description:`When true, the tray will use opacity animation instead of transform animation.
This is useful for supporting reduced motion for accessibility.`},closeAccessibilityLabel:{required:!1,tsType:{name:"string",raw:"SharedAccessibilityProps['accessibilityLabel']"},description:`Sets an accessible label for the close button.
On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
On mobile, VoiceOver will read this string when a user selects the associated element.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
@link https://reactnative.dev/docs/accessibility#accessibilitylabel`,defaultValue:{value:"'Close'",computed:!1}},closeAccessibilityHint:{required:!1,tsType:{name:"string",raw:"SharedAccessibilityProps['accessibilityHint']"},description:`Sets an accessible hint or description for the close button.
On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
when that result is not clear from the accessibility label.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
@link https://reactnative.dev/docs/accessibility#accessibilityhint`},showHandleBar:{required:!1,tsType:{name:"boolean"},description:`Show a handle bar indicator at the top of the tray.
The handle bar is positioned inside the tray content area.
@note only appears when \`pin="bottom"\`.

When enabled, the handle bar provides swipe-to-dismiss functionality (drag down to close)
and is keyboard accessible (Tab to focus, Enter/Space to close).
The close button is hidden by default when the handle bar is shown.`},classNames:{required:!1,tsType:{name:"signature",type:"object",raw:"{ [key in keyof ComponentClassNamesMap]?: string }",signature:{properties:[{key:{name:"ComponentClassNamesMap",required:!1},value:{name:"string"}}]}},description:""},styles:{required:!1,tsType:{name:"signature",type:"object",raw:"{ [key in keyof ComponentClassNamesMap]?: React.CSSProperties }",signature:{properties:[{key:{name:"ComponentClassNamesMap",required:!1},value:{name:"ReactCSSProperties",raw:"React.CSSProperties"}}]}},description:""},accessibilityLabel:{defaultValue:{value:"'Tray'",computed:!1},required:!1}}};const Zt={title:"Components/Tray",component:u},N=()=>{const[t,a]=n.useState(!1),[o,i]=n.useState(!1),[c,h]=n.useState(!1),[P,T]=n.useState(!1),[B,v]=n.useState(!1),[p,M]=n.useState(!1),[U,W]=n.useState(!1),X=n.useRef(null);return e.jsxs(r,{gap:4,padding:1,children:[e.jsxs(r,{alignItems:"flex-start",gap:2,children:[e.jsx(s,{font:"headline",children:"Basic Tray with String Title"}),e.jsx(l,{onClick:()=>a(!0),children:"Open Basic Tray"}),t&&e.jsx(u,{onCloseComplete:()=>a(!1),title:"Basic Tray Example",children:e.jsxs(r,{gap:1,children:[e.jsx(s,{font:"body",children:"This is a basic tray with a simple string title. Clicking outside or pressing ESC will close it."}),e.jsx(s,{font:"body",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nunc nisl eu nunc."})]})})]}),e.jsxs(r,{alignItems:"flex-start",gap:2,children:[e.jsx(s,{font:"headline",children:"Tray with Custom Title Component"}),e.jsx(l,{onClick:()=>i(!0),children:"Open Custom Title Tray"}),o&&e.jsx(u,{onCloseComplete:()=>i(!1),title:e.jsx(Z,{alignItems:"center",children:e.jsx(s,{color:"fgPrimary",font:"title3",children:"Custom Title Component"})}),children:e.jsxs(r,{gap:1,children:[e.jsx(s,{font:"body",children:"This tray demonstrates using a custom component for the title."}),e.jsx(s,{font:"body",children:"You can use any React component as the title, giving you flexibility in customizing the appearance."})]})})]}),e.jsxs(r,{alignItems:"flex-start",gap:2,children:[e.jsx(s,{font:"headline",children:"Basic Tray with No Title"}),e.jsx(l,{onClick:()=>W(!0),children:"Open Basic Tray With No Title"}),U&&e.jsx(u,{onCloseComplete:()=>W(!1),children:e.jsxs(r,{gap:1,children:[e.jsx(s,{font:"body",children:"This is a basic tray without a title. Clicking outside or pressing ESC will close it."}),e.jsx(s,{font:"body",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nunc nisl eu nunc."})]})})]}),e.jsxs(r,{alignItems:"flex-start",gap:2,children:[e.jsx(s,{font:"headline",children:"Tray with Footer"}),e.jsx(l,{onClick:()=>h(!0),children:"Open Tray with Footer"}),c&&e.jsx(u,{footer:e.jsx(Z,{justifyContent:"flex-end",padding:2,children:e.jsx(l,{onClick:()=>h(!1),variant:"primary",children:"Close"})}),onCloseComplete:()=>h(!1),title:"Tray with Footer",children:e.jsxs(r,{gap:1,children:[e.jsx(s,{font:"body",children:"This example demonstrates a tray with a sticky footer using the footer prop."}),e.jsx(s,{font:"body",children:"The footer prop provides a more intuitive API and automatically handles the styling and positioning."}),e.jsx(s,{font:"body",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nunc nisl eu nunc."}),e.jsx(s,{font:"body",children:"Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nunc nisl eu nunc."})]})})]}),e.jsxs(r,{alignItems:"flex-start",gap:2,children:[e.jsx(s,{font:"headline",children:"Tray with Prevent Dismiss"}),e.jsx(l,{onClick:()=>T(!0),children:"Open Non-Dismissible Tray"}),P&&e.jsx(u,{preventDismiss:!0,onCloseComplete:()=>T(!1),title:"Non-Dismissible Tray",children:({handleClose:z})=>e.jsxs(r,{gap:1,children:[e.jsx(s,{font:"body",children:"This tray cannot be dismissed by clicking outside or pressing ESC. You must use the button below to close it."}),e.jsx(l,{onClick:z,children:"Close Tray"})]})})]}),e.jsxs(r,{alignItems:"flex-start",gap:2,children:[e.jsx(s,{font:"headline",children:"Close With a Ref"}),e.jsx(l,{onClick:()=>v(!0),children:"Open Close With Ref Tray"}),B&&e.jsx(u,{ref:X,preventDismiss:!0,onCloseComplete:()=>v(!1),title:"Close With Ref Tray",children:e.jsxs(r,{gap:1,children:[e.jsx(s,{font:"body",children:"This tray includes a button that closes using the imperative handle on the ref."}),e.jsx(l,{onClick:()=>X.current?.close(),children:"Close Tray"})]})})]}),e.jsxs(r,{alignItems:"flex-start",gap:2,children:[e.jsx(s,{font:"headline",children:"Tray with Long Content"}),e.jsx(l,{onClick:()=>M(!0),children:"Open Long Content Tray"}),p&&e.jsx(u,{onCloseComplete:()=>M(!1),title:"Long Content Example",children:e.jsxs(r,{gap:1,children:[e.jsx(s,{font:"body",children:"This example demonstrates how the tray handles a large amount of content. The tray should expand appropriately and enable scrolling when needed."}),Array(20).fill(0).map((z,O)=>e.jsxs(s,{font:"body",children:["Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nunc nisl eu nunc.",O%2===0&&" Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.",O%3===0&&" Ut in nulla enim. Phasellus molestie magna non est bibendum."]},O))]})})]})]})},V=()=>{const{isPhone:t}=I(),[a,o]=n.useState(!1);return n.useEffect(()=>o(!0),[]),e.jsxs(e.Fragment,{children:[e.jsx(l,{onClick:()=>o(!0),children:"Open Tray"}),a&&e.jsx(u,{footer:({handleClose:i})=>e.jsx(_,{borderedTop:!0,action:e.jsx(l,{block:t,onClick:i,children:"Button"}),justifyContent:t?"center":"flex-end"}),hideCloseButton:t,onCloseComplete:()=>o(!1),pin:t?"bottom":"right",showHandleBar:t,title:"Section header",children:e.jsx(s,{color:"fgMuted",font:"body",paddingBottom:2,children:"Curabitur commodo nulla vel dolor vulputate vestibulum. Nulla et nisl molestie, interdum lorem id, viverra."})})]})},H=()=>{const{isPhone:t}=I(),[a,o]=n.useState(!1);return n.useEffect(()=>o(!0),[]),e.jsxs(e.Fragment,{children:[e.jsx(l,{onClick:()=>o(!0),children:"Open Tray"}),a&&e.jsx(u,{footer:({handleClose:i})=>e.jsx(_,{borderedTop:!0,action:e.jsx(l,{block:t,onClick:i,children:"Button"}),justifyContent:t?"center":"flex-end"}),hideCloseButton:t,onCloseComplete:()=>o(!1),pin:t?"bottom":"right",showHandleBar:t,title:e.jsxs(r,{gap:t?1.5:2,children:[e.jsx(he,{name:"addWallet"}),e.jsx(s,{font:"title3",children:"Welcome aboard"})]}),children:e.jsx(s,{color:"fgMuted",font:"body",paddingBottom:2,children:"Curabitur commodo nulla vel dolor vulputate vestibulum. Nulla et nisl molestie, interdum lorem id, viverra."})})]})},E=()=>{const{isPhone:t}=I(),[a,o]=n.useState(!1);return n.useEffect(()=>o(!0),[]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        .tray-close-button-inverted {
          color: white;
        }
        .tray-close-button-inverted:hover,
        .tray-close-button-inverted:focus-visible {
          background-color: rgba(255, 255, 255, 0.15);
        }
      `}),e.jsx(l,{onClick:()=>o(!0),children:"Open Tray"}),a&&e.jsx(u,{classNames:{closeButton:"tray-close-button-inverted"},footer:({handleClose:i})=>e.jsx(_,{borderedTop:!0,action:e.jsx(l,{block:t,onClick:i,children:"Close"}),justifyContent:t?"center":"flex-end"}),header:e.jsx(s,{font:"title3",paddingBottom:.75,paddingTop:2,paddingX:{base:4,phone:3},children:"Header"}),hideCloseButton:t,onCloseComplete:()=>o(!1),pin:t?"bottom":"right",showHandleBar:t,styles:{handleBar:{position:"absolute",top:0,left:0,right:0,zIndex:1},handleBarHandle:{backgroundColor:"white",opacity:1},closeButton:{position:"absolute",top:"var(--space-4)",right:"var(--space-4)",zIndex:1},header:{paddingTop:0}},title:e.jsx(R,{flexGrow:1,marginX:{base:-4,phone:-3},children:e.jsx("img",{alt:"Full Bleed",height:180,src:"https://static-assets.coinbase.com/design-system/placeholder/coinbaseHeader.jpg",style:{objectFit:"cover",pointerEvents:"none"},width:"100%"})}),children:e.jsx(r,{gap:2,paddingBottom:2,children:e.jsx(s,{font:"body",children:"This is the content of the tray."})})})]})},L=()=>{const{isPhone:t}=I(),[a,o]=n.useState(!1);return n.useEffect(()=>o(!0),[]),e.jsxs(e.Fragment,{children:[e.jsx(l,{onClick:()=>o(!0),children:"Open Tray"}),a&&e.jsx(u,{footer:({handleClose:i})=>e.jsx(_,{borderedTop:!0,action:e.jsx(l,{block:t,onClick:i,children:"Button"}),justifyContent:t?"center":"flex-end"}),hideCloseButton:t,onCloseComplete:()=>o(!1),pin:t?"bottom":"right",showHandleBar:t,styles:{header:{paddingBottom:"var(--space-1)"},content:{paddingBottom:"var(--space-3)"}},title:"Section header",children:Array.from({length:20},(i,c)=>e.jsx(ee,{accessory:"arrow",description:"Description",innerSpacing:{marginX:-4,paddingX:4,paddingY:1},spacingVariant:"condensed",title:"Title"},c))})]})},F=()=>{const{isPhone:t}=I(),[a,o]=n.useState(!1);return n.useEffect(()=>o(!0),[]),e.jsxs(e.Fragment,{children:[e.jsx(l,{onClick:()=>o(!0),children:"Open Tray"}),a&&e.jsx(u,{footer:({handleClose:i})=>e.jsx(_,{borderedTop:!0,action:e.jsx(l,{block:t,onClick:i,children:"Button"}),justifyContent:t?"center":"flex-end"}),hideCloseButton:t,onCloseComplete:()=>o(!1),pin:t?"bottom":"right",showHandleBar:t,styles:{header:{paddingBottom:"var(--space-1)"},content:{paddingBottom:"var(--space-3)"}},title:e.jsxs(r,{gap:t?1.5:2,children:[e.jsx(he,{name:"addWallet"}),e.jsx(s,{font:"title3",children:"Welcome aboard"})]}),children:Array.from({length:20},(i,c)=>e.jsx(ee,{accessory:"arrow",description:"Description",innerSpacing:{marginX:-4,paddingX:4,paddingY:1},spacingVariant:"condensed",title:"Title"},c))})]})},D=()=>{const{isPhone:t}=I(),[a,o]=n.useState(!1);return n.useEffect(()=>o(!0),[]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        .tray-close-button-inverted {
          color: white;
        }
        .tray-close-button-inverted:hover,
        .tray-close-button-inverted:focus-visible {
          background-color: rgba(255, 255, 255, 0.15);
        }
      `}),e.jsx(l,{onClick:()=>o(!0),children:"Open Tray"}),a&&e.jsx(u,{classNames:{closeButton:"tray-close-button-inverted"},header:e.jsx(s,{font:"title3",paddingBottom:.75,paddingTop:2,paddingX:{base:4,phone:3},children:"Header"}),hideCloseButton:t,onCloseComplete:()=>o(!1),pin:t?"bottom":"right",showHandleBar:t,styles:{handleBar:{position:"absolute",top:0,left:0,right:0,zIndex:1},handleBarHandle:{backgroundColor:"white",opacity:1},closeButton:{position:"absolute",top:"var(--space-4)",right:"var(--space-4)",zIndex:1},header:{paddingTop:0},content:{paddingBottom:"var(--space-3)"}},title:e.jsx(R,{flexGrow:1,marginX:{base:-4,phone:-3},children:e.jsx("img",{alt:"Full Bleed",height:180,src:"https://static-assets.coinbase.com/design-system/placeholder/coinbaseHeader.jpg",style:{objectFit:"cover",pointerEvents:"none"},width:"100%"})}),children:Array.from({length:20},(i,c)=>e.jsx(ee,{accessory:"arrow",description:"Description",innerSpacing:{marginX:-4,paddingX:4,paddingY:1},spacingVariant:"condensed",title:"Title"},c))})]})},A=()=>{const[t,a]=n.useState(!1);return e.jsxs(r,{alignItems:"flex-start",gap:2,children:[e.jsx(s,{font:"headline",children:"Basic Tray with String Title"}),e.jsx(l,{onClick:()=>a(!0),children:"Open Basic Tray"}),t&&e.jsx(u,{reduceMotion:!0,onCloseComplete:()=>a(!1),title:"Basic Tray Example",children:e.jsxs(r,{gap:1,children:[e.jsx(s,{font:"body",children:"This is a basic tray with a simple string title. Clicking outside or pressing ESC will close it."}),e.jsx(s,{font:"body",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nunc nisl eu nunc."})]})})]})};N.__docgenInfo={description:"",methods:[],displayName:"Default"};V.__docgenInfo={description:"",methods:[],displayName:"ResponsiveBasic"};H.__docgenInfo={description:"",methods:[],displayName:"ResponsiveIllustration"};E.__docgenInfo={description:"",methods:[],displayName:"ResponsiveFullBleedImage"};L.__docgenInfo={description:"",methods:[],displayName:"ResponsiveBasicListCells"};F.__docgenInfo={description:"",methods:[],displayName:"ResponsiveIllustrationListCells"};D.__docgenInfo={description:"",methods:[],displayName:"ResponsiveFullBleedImageListCells"};A.__docgenInfo={description:"",methods:[],displayName:"ReduceMotion"};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`() => {
  const [showBasicTray, setShowBasicTray] = useState(false);
  const [showCustomTitleTray, setShowCustomTitleTray] = useState(false);
  const [showFooterTray, setShowFooterTray] = useState(false);
  const [showPreventDismissTray, setShowPreventDismissTray] = useState(false);
  const [showCloseWithRefTray, setShowCloseWithRefTray] = useState(false);
  const [showLongContentTray, setShowLongContentTray] = useState(false);
  const [showNoTitleTray, setShowNoTitleTray] = useState(false);
  // Refs for controlling trays
  const preventDismissTrayRef = useRef<TrayRefProps>(null);
  return <VStack gap={4} padding={1}>
      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Basic Tray with String Title</Text>
        <Button onClick={() => setShowBasicTray(true)}>Open Basic Tray</Button>
        {showBasicTray && <Tray onCloseComplete={() => setShowBasicTray(false)} title="Basic Tray Example">
            <VStack gap={1}>
              <Text font="body">
                This is a basic tray with a simple string title. Clicking outside or pressing ESC
                will close it.
              </Text>
              <Text font="body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
                aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nunc nisl eu nunc.
              </Text>
            </VStack>
          </Tray>}
      </VStack>

      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Tray with Custom Title Component</Text>
        <Button onClick={() => setShowCustomTitleTray(true)}>Open Custom Title Tray</Button>
        {showCustomTitleTray && <Tray onCloseComplete={() => setShowCustomTitleTray(false)} title={<HStack alignItems="center">
                <Text color="fgPrimary" font="title3">
                  Custom Title Component
                </Text>
              </HStack>}>
            <VStack gap={1}>
              <Text font="body">
                This tray demonstrates using a custom component for the title.
              </Text>
              <Text font="body">
                You can use any React component as the title, giving you flexibility in customizing
                the appearance.
              </Text>
            </VStack>
          </Tray>}
      </VStack>

      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Basic Tray with No Title</Text>
        <Button onClick={() => setShowNoTitleTray(true)}>Open Basic Tray With No Title</Button>
        {showNoTitleTray && <Tray onCloseComplete={() => setShowNoTitleTray(false)}>
            <VStack gap={1}>
              <Text font="body">
                This is a basic tray without a title. Clicking outside or pressing ESC will close
                it.
              </Text>
              <Text font="body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
                aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nunc nisl eu nunc.
              </Text>
            </VStack>
          </Tray>}
      </VStack>

      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Tray with Footer</Text>
        <Button onClick={() => setShowFooterTray(true)}>Open Tray with Footer</Button>
        {showFooterTray && <Tray footer={<HStack justifyContent="flex-end" padding={2}>
                <Button onClick={() => setShowFooterTray(false)} variant="primary">
                  Close
                </Button>
              </HStack>} onCloseComplete={() => setShowFooterTray(false)} title="Tray with Footer">
            <VStack gap={1}>
              <Text font="body">
                This example demonstrates a tray with a sticky footer using the footer prop.
              </Text>
              <Text font="body">
                The footer prop provides a more intuitive API and automatically handles the styling
                and positioning.
              </Text>
              <Text font="body">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
                aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nunc nisl eu nunc.
              </Text>
              <Text font="body">
                Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam
                nunc nisl eu nunc.
              </Text>
            </VStack>
          </Tray>}
      </VStack>

      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Tray with Prevent Dismiss</Text>
        <Button onClick={() => setShowPreventDismissTray(true)}>Open Non-Dismissible Tray</Button>
        {showPreventDismissTray && <Tray preventDismiss onCloseComplete={() => setShowPreventDismissTray(false)} title="Non-Dismissible Tray">
            {({
          handleClose
        }) => <VStack gap={1}>
                <Text font="body">
                  This tray cannot be dismissed by clicking outside or pressing ESC. You must use
                  the button below to close it.
                </Text>
                <Button onClick={handleClose}>Close Tray</Button>
              </VStack>}
          </Tray>}
      </VStack>

      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Close With a Ref</Text>
        <Button onClick={() => setShowCloseWithRefTray(true)}>Open Close With Ref Tray</Button>
        {showCloseWithRefTray && <Tray ref={preventDismissTrayRef} preventDismiss onCloseComplete={() => setShowCloseWithRefTray(false)} title="Close With Ref Tray">
            <VStack gap={1}>
              <Text font="body">
                This tray includes a button that closes using the imperative handle on the ref.
              </Text>
              <Button onClick={() => preventDismissTrayRef.current?.close()}>Close Tray</Button>
            </VStack>
          </Tray>}
      </VStack>

      <VStack alignItems="flex-start" gap={2}>
        <Text font="headline">Tray with Long Content</Text>
        <Button onClick={() => setShowLongContentTray(true)}>Open Long Content Tray</Button>
        {showLongContentTray && <Tray onCloseComplete={() => setShowLongContentTray(false)} title="Long Content Example">
            <VStack gap={1}>
              <Text font="body">
                This example demonstrates how the tray handles a large amount of content. The tray
                should expand appropriately and enable scrolling when needed.
              </Text>
              {Array(20).fill(0).map((_, i) => <Text key={i} font="body">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl
                    eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nunc nisl eu nunc.
                    {i % 2 === 0 && ' Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.'}
                    {i % 3 === 0 && ' Ut in nulla enim. Phasellus molestie magna non est bibendum.'}
                  </Text>)}
            </VStack>
          </Tray>}
      </VStack>
    </VStack>;
}`,...N.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`() => {
  const {
    isPhone
  } = useBreakpoints();
  const [isOpen, setIsOpen] = useState(false);

  // Open after initial load to properly configure scroll ref in StrictMode
  useEffect(() => setIsOpen(true), []);
  return <>
      <Button onClick={() => setIsOpen(true)}>Open Tray</Button>
      {isOpen && <Tray footer={({
      handleClose
    }) => <PageFooter borderedTop action={<Button block={isPhone} onClick={handleClose}>
                  Button
                </Button>} justifyContent={isPhone ? 'center' : 'flex-end'} />} hideCloseButton={isPhone} onCloseComplete={() => setIsOpen(false)} pin={isPhone ? 'bottom' : 'right'} showHandleBar={isPhone} title="Section header">
          <Text color="fgMuted" font="body" paddingBottom={2}>
            Curabitur commodo nulla vel dolor vulputate vestibulum. Nulla et nisl molestie, interdum
            lorem id, viverra.
          </Text>
        </Tray>}
    </>;
}`,...V.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`() => {
  const {
    isPhone
  } = useBreakpoints();
  const [isOpen, setIsOpen] = useState(false);

  // Open after initial load to properly configure scroll ref in StrictMode
  useEffect(() => setIsOpen(true), []);
  return <>
      <Button onClick={() => setIsOpen(true)}>Open Tray</Button>
      {isOpen && <Tray footer={({
      handleClose
    }) => <PageFooter borderedTop action={<Button block={isPhone} onClick={handleClose}>
                  Button
                </Button>} justifyContent={isPhone ? 'center' : 'flex-end'} />} hideCloseButton={isPhone} onCloseComplete={() => setIsOpen(false)} pin={isPhone ? 'bottom' : 'right'} showHandleBar={isPhone} title={<VStack gap={isPhone ? 1.5 : 2}>
              <Pictogram name="addWallet" />
              <Text font="title3">Welcome aboard</Text>
            </VStack>}>
          <Text color="fgMuted" font="body" paddingBottom={2}>
            Curabitur commodo nulla vel dolor vulputate vestibulum. Nulla et nisl molestie, interdum
            lorem id, viverra.
          </Text>
        </Tray>}
    </>;
}`,...H.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`() => {
  const {
    isPhone
  } = useBreakpoints();
  const [isOpen, setIsOpen] = useState(false);

  // Open after initial load to properly configure scroll ref in StrictMode
  useEffect(() => setIsOpen(true), []);
  return <>
      <style>{\`
        .tray-close-button-inverted {
          color: white;
        }
        .tray-close-button-inverted:hover,
        .tray-close-button-inverted:focus-visible {
          background-color: rgba(255, 255, 255, 0.15);
        }
      \`}</style>
      <Button onClick={() => setIsOpen(true)}>Open Tray</Button>
      {isOpen && <Tray classNames={{
      closeButton: 'tray-close-button-inverted'
    }} footer={({
      handleClose
    }) => <PageFooter borderedTop action={<Button block={isPhone} onClick={handleClose}>
                  Close
                </Button>} justifyContent={isPhone ? 'center' : 'flex-end'} />} header={<Text font="title3" paddingBottom={0.75} paddingTop={2} paddingX={{
      base: 4,
      phone: 3
    }}>
              Header
            </Text>} hideCloseButton={isPhone} onCloseComplete={() => setIsOpen(false)} pin={isPhone ? 'bottom' : 'right'} showHandleBar={isPhone} styles={{
      handleBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1
      },
      handleBarHandle: {
        backgroundColor: 'white',
        opacity: 1
      },
      closeButton: {
        position: 'absolute',
        top: 'var(--space-4)',
        right: 'var(--space-4)',
        zIndex: 1
      },
      header: {
        paddingTop: 0
      }
    }} title={<Box flexGrow={1} marginX={{
      base: -4,
      phone: -3
    }}>
              <img alt="Full Bleed" height={180} src="https://static-assets.coinbase.com/design-system/placeholder/coinbaseHeader.jpg" style={{
        objectFit: 'cover',
        pointerEvents: 'none'
      }} width="100%" />
            </Box>}>
          <VStack gap={2} paddingBottom={2}>
            <Text font="body">This is the content of the tray.</Text>
          </VStack>
        </Tray>}
    </>;
}`,...E.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`() => {
  const {
    isPhone
  } = useBreakpoints();
  const [isOpen, setIsOpen] = useState(false);

  // Open after initial load to properly configure scroll ref in StrictMode
  useEffect(() => setIsOpen(true), []);
  return <>
      <Button onClick={() => setIsOpen(true)}>Open Tray</Button>
      {isOpen && <Tray footer={({
      handleClose
    }) => <PageFooter borderedTop action={<Button block={isPhone} onClick={handleClose}>
                  Button
                </Button>} justifyContent={isPhone ? 'center' : 'flex-end'} />} hideCloseButton={isPhone} onCloseComplete={() => setIsOpen(false)} pin={isPhone ? 'bottom' : 'right'} showHandleBar={isPhone} styles={{
      header: {
        paddingBottom: 'var(--space-1)'
      },
      content: {
        paddingBottom: 'var(--space-3)'
      }
    }} title="Section header">
          {Array.from({
        length: 20
      }, (_, i) => <ListCell key={i} accessory="arrow" description="Description" innerSpacing={{
        marginX: -4,
        paddingX: 4,
        paddingY: 1
      }} spacingVariant="condensed" title="Title" />)}
        </Tray>}
    </>;
}`,...L.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`() => {
  const {
    isPhone
  } = useBreakpoints();
  const [isOpen, setIsOpen] = useState(false);

  // Open after initial load to properly configure scroll ref in StrictMode
  useEffect(() => setIsOpen(true), []);
  return <>
      <Button onClick={() => setIsOpen(true)}>Open Tray</Button>
      {isOpen && <Tray footer={({
      handleClose
    }) => <PageFooter borderedTop action={<Button block={isPhone} onClick={handleClose}>
                  Button
                </Button>} justifyContent={isPhone ? 'center' : 'flex-end'} />} hideCloseButton={isPhone} onCloseComplete={() => setIsOpen(false)} pin={isPhone ? 'bottom' : 'right'} showHandleBar={isPhone} styles={{
      header: {
        paddingBottom: 'var(--space-1)'
      },
      content: {
        paddingBottom: 'var(--space-3)'
      }
    }} title={<VStack gap={isPhone ? 1.5 : 2}>
              <Pictogram name="addWallet" />
              <Text font="title3">Welcome aboard</Text>
            </VStack>}>
          {Array.from({
        length: 20
      }, (_, i) => <ListCell key={i} accessory="arrow" description="Description" innerSpacing={{
        marginX: -4,
        paddingX: 4,
        paddingY: 1
      }} spacingVariant="condensed" title="Title" />)}
        </Tray>}
    </>;
}`,...F.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`() => {
  const {
    isPhone
  } = useBreakpoints();
  const [isOpen, setIsOpen] = useState(false);

  // Open after initial load to properly configure scroll ref in StrictMode
  useEffect(() => setIsOpen(true), []);
  return <>
      <style>{\`
        .tray-close-button-inverted {
          color: white;
        }
        .tray-close-button-inverted:hover,
        .tray-close-button-inverted:focus-visible {
          background-color: rgba(255, 255, 255, 0.15);
        }
      \`}</style>
      <Button onClick={() => setIsOpen(true)}>Open Tray</Button>
      {isOpen && <Tray classNames={{
      closeButton: 'tray-close-button-inverted'
    }} header={<Text font="title3" paddingBottom={0.75} paddingTop={2} paddingX={{
      base: 4,
      phone: 3
    }}>
              Header
            </Text>} hideCloseButton={isPhone} onCloseComplete={() => setIsOpen(false)} pin={isPhone ? 'bottom' : 'right'} showHandleBar={isPhone} styles={{
      handleBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1
      },
      handleBarHandle: {
        backgroundColor: 'white',
        opacity: 1
      },
      closeButton: {
        position: 'absolute',
        top: 'var(--space-4)',
        right: 'var(--space-4)',
        zIndex: 1
      },
      header: {
        paddingTop: 0
      },
      content: {
        paddingBottom: 'var(--space-3)'
      }
    }} title={<Box flexGrow={1} marginX={{
      base: -4,
      phone: -3
    }}>
              <img alt="Full Bleed" height={180} src="https://static-assets.coinbase.com/design-system/placeholder/coinbaseHeader.jpg" style={{
        objectFit: 'cover',
        pointerEvents: 'none'
      }} width="100%" />
            </Box>}>
          {Array.from({
        length: 20
      }, (_, i) => <ListCell key={i} accessory="arrow" description="Description" innerSpacing={{
        marginX: -4,
        paddingX: 4,
        paddingY: 1
      }} spacingVariant="condensed" title="Title" />)}
        </Tray>}
    </>;
}`,...D.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`() => {
  const [showBasicTray, setShowBasicTray] = useState(false);
  return <VStack alignItems="flex-start" gap={2}>
      <Text font="headline">Basic Tray with String Title</Text>
      <Button onClick={() => setShowBasicTray(true)}>Open Basic Tray</Button>
      {showBasicTray && <Tray reduceMotion onCloseComplete={() => setShowBasicTray(false)} title="Basic Tray Example">
          <VStack gap={1}>
            <Text font="body">
              This is a basic tray with a simple string title. Clicking outside or pressing ESC will
              close it.
            </Text>
            <Text font="body">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget
              aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nunc nisl eu nunc.
            </Text>
          </VStack>
        </Tray>}
    </VStack>;
}`,...A.parameters?.docs?.source}}};const $t=["Default","ResponsiveBasic","ResponsiveIllustration","ResponsiveFullBleedImage","ResponsiveBasicListCells","ResponsiveIllustrationListCells","ResponsiveFullBleedImageListCells","ReduceMotion"];export{N as Default,A as ReduceMotion,V as ResponsiveBasic,L as ResponsiveBasicListCells,E as ResponsiveFullBleedImage,D as ResponsiveFullBleedImageListCells,H as ResponsiveIllustration,F as ResponsiveIllustrationListCells,$t as __namedExportsOrder,Zt as default};
