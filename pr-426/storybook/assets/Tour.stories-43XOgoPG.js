import{r as i,j as t,B as f,m as me}from"./iframe-BXWLBCkp.js";import{e as de}from"./assets-CEwpm_uP.js";import{C as M}from"./Coachmark-Btmb1icg.js";import{C as pe}from"./Checkbox-M1uAd9ap.js";import{T as b}from"./Text-Ch_dBU4v.js";import{O as fe}from"./OverlayContentContext-hT53AGt-.js";import{u as he,b as ve,o as ge,s as be,c as ye,a as we}from"./floating-ui.react-dom-B2tvx6ll.js";import{u as Te,c as W,a as H}from"./react-spring_web.modern-CUlMypa3.js";import{u as Se}from"./useScrollBlocker-4Da9qMHo.js";import{F as ke}from"./FocusTrap-90tMQkIg.js";import{P as Ce}from"./Portal-tAONErW2.js";import{B as h}from"./Button-W9Shg4T1.js";import{R as xe}from"./RemoteImage-Lksm6NI7.js";import{V as B}from"./VStack-CnEfMFeL.js";import{P as Ae}from"./ProgressBar-BsXln_3w.js";import{H as O}from"./HStack-B6p8qBpp.js";import"./preload-helper-D9Z9MdNV.js";import"./IconButton-OIX0AFCz.js";import"./useTheme-BJazYlse.js";import"./Icon-CgDQ3NQp.js";import"./Spinner-BAI0lrZ-.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./checkbox-DVjU0upZ.js";import"./tokens-BwScSksM.js";import"./useMotionProps-CS-LE6l8.js";import"./utils-CwomCnHN.js";import"./Control-gdMxvYmV.js";import"./useMergeRefs-DR4sGa7m.js";import"./usePrefixedId-Dfl-0DGQ.js";import"./isRtl-Du0XdnX5.js";import"./motion-minimal-SVRWJYUW.js";import"./debounce-fynzmAtJ.js";import"./useProgressSize-CemUcfxL.js";import"./usePreviousValues-rLMWE3mU.js";const Y=i.createContext(void 0),w=()=>{const n=i.useContext(Y);if(!n)throw Error("useTourContext must be called inside a Tour");return n},Pe=({steps:n,activeTourStep:e,onChange:r})=>{const[o,s]=i.useState(null),l=i.useCallback(async c=>{if(typeof c>"u")return r(n[0]);let a=null;typeof c=="string"&&(a=n.find(m=>m.id===c),a||=n[0]),a!==e&&(await Promise.all([e?.onBeforeInactive?.(),a?.onBeforeActive?.()]),r(a),await Promise.all([e?.onInactive?.(),a?.onActive?.()]))},[e,n,r]),d=i.useCallback(async c=>l(c),[l]),p=i.useCallback(async()=>{e!==null&&(await e.onBeforeInactive?.(),r(null),await e.onInactive?.())},[e,r]),u=i.useCallback(async()=>{if(!e||e.id===n.at(-1)?.id||n.length<2)return;const c=n.findIndex(a=>a.id===e.id);for(let a=c+1;a<n.length;a++){const m=n[a];if(!m.disabled){await Promise.all([e.onBeforeInactive?.(),m.onBeforeActive?.()]),r(m),await Promise.all([e.onInactive?.(),m.onActive?.()]);return}}},[e,n,r]),g=i.useCallback(async()=>{if(!e||e.id===n[0]?.id||n.length<2)return;const c=n.findIndex(a=>a.id===e.id);for(let a=c-1;a>=0;a--){const m=n[a];if(!m.disabled){await Promise.all([e.onBeforeInactive?.(),m.onBeforeActive?.()]),r(m),await Promise.all([e.onInactive?.(),m.onActive?.()]);return}}},[e,n,r]);return i.useMemo(()=>({steps:n,activeTourStep:e,setActiveTourStep:d,activeTourStepTarget:o,setActiveTourStepTarget:s,startTour:l,stopTour:p,goNextTourStep:u,goPreviousTourStep:g}),[n,e,d,o,s,l,p,u,g])},L=i.memo(({activeTourStepTargetRect:n,padding:e="var(--spacing-2)",borderRadius:r=0})=>{const o=typeof e=="number"?`${e}px`:e,s=i.useMemo(()=>({width:`calc(${n.width}px + ${o})`,height:`calc(${n.height}px + ${o})`,x:`calc(${n.x}px - (0.5 * ${o}))`,y:`calc(${n.y}px - (0.5 * ${o}))`}),[n,o]);return t.jsxs("svg",{height:"100vh",width:"100vw",children:[t.jsx("defs",{children:t.jsxs("mask",{id:"tourOverlayMask",children:[t.jsx("rect",{fill:"#fff",height:"100vh",width:"100vw"}),t.jsx("rect",{rx:r,ry:r,style:s})]})}),t.jsx("rect",{fill:"rgb(50, 53, 61, 0.33)",height:"100%",mask:"url(#tourOverlayMask)",width:"100%"})]})});L.__docgenInfo={description:"",methods:[],displayName:"DefaultTourMask",props:{activeTourStepTargetRect:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
  width: number;
  height: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]}},description:"Rect of the active TourStep's target element."},padding:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:"Padding to add around the edges of the TourOverlay's content mask.",defaultValue:{value:"'var(--spacing-2)'",computed:!1}},borderRadius:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:"Corner radius for the TourOverlay's content mask. Uses SVG rect element's `rx` and `ry`\nattributes https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/rx.",defaultValue:{value:"0",computed:!1}}}};const J=i.memo(i.forwardRef(({placement:n,arrow:e,style:r},o)=>{const d=(e?.centerOffset??0)>0,p=i.useMemo(()=>{const u={position:"absolute",transform:"rotate(45deg)",opacity:d?0:void 0};return e?.x&&(u.left=e.x),e?.y&&(u.top=e.y),n.includes("top")&&(u.bottom=.5*-24),n.includes("bottom")&&(u.top=.5*-24),n.includes("left")&&(u.right=.5*-24),n.includes("right")&&(u.left=.5*-24),{...u,...r}},[e,n,r,24,24,d]);return t.jsx(f,{ref:o,background:"bgInverse",height:24,style:p,testID:"tour-step-arrow",width:24,zIndex:-1})}));J.__docgenInfo={description:"",methods:[],displayName:"DefaultTourStepArrow",props:{arrow:{required:!1,tsType:{name:"intersection",raw:`Partial<Coords> & {
  centerOffset: number;
  alignmentOffset?: number;
}`,elements:[{name:"Partial",elements:[{name:"Coords"}],raw:"Partial<Coords>"},{name:"signature",type:"object",raw:`{
  centerOffset: number;
  alignmentOffset?: number;
}`,signature:{properties:[{key:"centerOffset",value:{name:"number",required:!0}},{key:"alignmentOffset",value:{name:"number",required:!1}}]}}]},description:""},placement:{required:!0,tsType:{name:"Placement"},description:""},style:{required:!1,tsType:{name:"Record",elements:[{name:"string"},{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]}],raw:"Record<string, string | number>"},description:""}}};const Re={isTour:!0},qe="containerCss-c1cwfmjh",je={behavior:"smooth",marginX:100,marginY:100},Oe=async()=>new Promise(n=>{let e,r=!1;const o=()=>{clearTimeout(e),e=setTimeout(()=>{window.removeEventListener("scroll",o),r=!0,n()},50)};window.addEventListener("scroll",o),setTimeout(()=>{r||n()},3e3)}),Ie=async(n,e)=>{if(!n)return;const r=n.getBoundingClientRect(),o=r.top<0,s=r.bottom>window.innerHeight,l=r.left<0,d=r.right>window.innerWidth,p=l&&!d||!l&&d,u=o&&!s||!o&&s;if(!p&&!u)return;const g=e?.marginX??0,I=e?.marginY??0,c=r.left+window.scrollX-g,a=r.top+window.scrollY-I;window.scrollTo({top:u?a:void 0,left:p?c:void 0,behavior:"smooth"}),await Oe()},Be=24,Me=32,E=({steps:n,activeTourStep:e,onChange:r,children:o,TourMaskComponent:s=L,TourStepArrowComponent:l=J,hideOverlay:d,tourStepOffset:p=Be,tourStepShift:u,tourStepAutoPlacement:g,tourMaskPadding:I,tourMaskBorderRadius:c,scrollOptions:a=je,disablePortal:m,disableAutoScroll:V,accessibilityLabel:te,accessibilityLabelledBy:ne,id:re,testID:oe})=>{const U=i.useRef(null),F=e?.Component,ie=e?.ArrowComponent??l,D=Se(),[_,S]=Te(()=>({from:{opacity:0},config:W.slow}),[]),{refs:N,floatingStyles:ae,placement:se,middlewareData:{arrow:le}}=he({middleware:[ve(g),ge(p),be(u??{padding:Me}),ye({element:U})],whileElementsMounted:we}),ue=i.useCallback(k=>{S.start({to:{opacity:0},config:W.stiff,onResolve:()=>r(k)})},[S,r]),G=Pe({steps:n,activeTourStep:e,onChange:ue}),{activeTourStepTarget:$,setActiveTourStepTarget:z}=G,ce=i.useCallback(k=>{N.setReference(k),z(k),(async()=>{!V&&!e?.disableAutoScroll&&await Ie(k,e?.scrollOptions??a),S.start({to:{opacity:1},config:W.slow})})()},[N,z,V,e?.disableAutoScroll,e?.scrollOptions,S,a]);return i.useEffect(()=>(e?.id&&D(!0),()=>{D(!1)}),[e,S,D,V,a]),t.jsx(fe.Provider,{value:Re,children:t.jsxs(Y.Provider,{value:{...G,setActiveTourStepTarget:ce},children:[o,!!F&&t.jsx(Ce,{containerId:me,disablePortal:m,children:t.jsxs("div",{"aria-label":te,"aria-labelledby":ne,"aria-modal":"true",className:qe,"data-testid":oe,id:re,role:"dialog",children:[!(e.hideOverlay??d)&&$&&t.jsx(H.div,{style:_,children:t.jsx(s,{activeTourStepTargetRect:$.getBoundingClientRect(),borderRadius:e.tourMaskBorderRadius??c,padding:e.tourMaskPadding??I})}),t.jsx("div",{ref:N.setFloating,style:ae,children:t.jsx(ke,{children:t.jsxs(H.div,{style:_,children:[t.jsx(ie,{ref:U,arrow:le,placement:se,style:e?.arrowStyle}),t.jsx(F,{...e})]})})})]})})]})})};E.displayName="Tour";const v=E;E.__docgenInfo={description:"",methods:[],displayName:"Tour",props:{steps:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /**
   * The tour step id.
   */
  id: TourStepId;
  /**
   * The Component to render for this tour step.
   */
  Component: TourStepComponent;
  /**
   * The TourStepArrowComponent to render for this tour step.
   */
  ArrowComponent?: TourStepArrowComponent;
  /**
   * Disabling the tour step causes it to be skipped when calling \`goNextTourStep()\` or \`goPreviousTourStep()\`.
   */
  disabled?: boolean;
  /**
   * Hides the overlay when the tour is active.
   */
  hideOverlay?: boolean;
  /**
   * Callback function fired as this step becomes active. This step's \`onActive\` will fire simultaneously with the previously active step's \`onInactive\`.
   */
  onActive?: () => void | Promise<void>;
  /**
   * Callback function fired right before this step becomes active. This step's \`onBeforeActive\` will fire simultaneously with the previously active step's \`onBeforeInactive\`.
   */
  onBeforeActive?: () => void | Promise<void>;
  /**
   * Callback function fired as this step becomes inactive. This step's \`onInactive\` will fire simultaneously with the new active step's \`onActive\`.
   */
  onInactive?: () => void | Promise<void>;
  /**
   * Callback function fired right before this step becomes inactive. This step's \`onBeforeInactive\` will fire simultaneously with the new active step's \`onBeforeActive\`.
   */
  onBeforeInactive?: () => void | Promise<void>;
  /**
   * Padding to add around the edges of the TourMask's content mask.
   */
  tourMaskPadding?: string | number;
  /**
   * Corner radius for the TourMask's content mask. Uses SVG rect element's \`rx\` and \`ry\` attributes https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/rx.
   */
  tourMaskBorderRadius?: string | number;
  /**
   * Add styles to the TourStepArrowComponent for this tour step.
   */
  arrowStyle?: Record<string, string | number>;
  /**
   * Web only. Disables automatically scrolling to this TourStep when it becomes active.
   */
  disableAutoScroll?: boolean;
  /**
   * Web only. Controls the scrolling behavior and margins when calling element.scrollTo() to scroll to an active TourStep target.
   */
  scrollOptions?: TourScrollOptions;
}`,signature:{properties:[{key:"id",value:{name:"TourStepId",required:!0},description:"The tour step id."},{key:"Component",value:{name:"ReactFC",raw:"React.FC<Omit<TourStepValue, 'Component'>>",elements:[{name:"Omit",elements:[{name:"TourStepValue"},{name:"literal",value:"'Component'"}],raw:"Omit<TourStepValue, 'Component'>"}],required:!0},description:"The Component to render for this tour step."},{key:"ArrowComponent",value:{name:"ReactForwardRefExoticComponent",raw:`React.ForwardRefExoticComponent<
  TourStepArrowComponentProps & { ref?: React.Ref<any> }
>`,elements:[{name:"intersection",raw:"TourStepArrowComponentProps & { ref?: React.Ref<any> }",elements:[{name:"signature",type:"object",raw:`{
  /* The \`@floating-ui\` \`arrow\` coordinates and offsets https://floating-ui.com/docs/arrow#data */
  arrow?: Partial<Coords> & {
    centerOffset: number;
    alignmentOffset?: number;
  };
  /* The \`@floating-ui\` \`arrow\` placement https://floating-ui.com/docs/arrow#placement */
  placement: Placement;
  style?: Record<string, string | number>;
}`,signature:{properties:[{key:"arrow",value:{name:"intersection",raw:`Partial<Coords> & {
  centerOffset: number;
  alignmentOffset?: number;
}`,elements:[{name:"Partial",elements:[{name:"Coords"}],raw:"Partial<Coords>"},{name:"signature",type:"object",raw:`{
  centerOffset: number;
  alignmentOffset?: number;
}`,signature:{properties:[{key:"centerOffset",value:{name:"number",required:!0}},{key:"alignmentOffset",value:{name:"number",required:!1}}]}}],required:!1}},{key:"placement",value:{name:"Placement",required:!0}},{key:"style",value:{name:"Record",elements:[{name:"string"},{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]}],raw:"Record<string, string | number>",required:!1}}]}},{name:"signature",type:"object",raw:"{ ref?: React.Ref<any> }",signature:{properties:[{key:"ref",value:{name:"ReactRef",raw:"React.Ref<any>",elements:[{name:"any"}],required:!1}}]}}]}],required:!1},description:"The TourStepArrowComponent to render for this tour step."},{key:"disabled",value:{name:"boolean",required:!1},description:"Disabling the tour step causes it to be skipped when calling `goNextTourStep()` or `goPreviousTourStep()`."},{key:"hideOverlay",value:{name:"boolean",required:!1},description:"Hides the overlay when the tour is active."},{key:"onActive",value:{name:"signature",type:"function",raw:"() => void | Promise<void>",signature:{arguments:[],return:{name:"union",raw:"void | Promise<void>",elements:[{name:"void"},{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}]}},required:!1},description:"Callback function fired as this step becomes active. This step's `onActive` will fire simultaneously with the previously active step's `onInactive`."},{key:"onBeforeActive",value:{name:"signature",type:"function",raw:"() => void | Promise<void>",signature:{arguments:[],return:{name:"union",raw:"void | Promise<void>",elements:[{name:"void"},{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}]}},required:!1},description:"Callback function fired right before this step becomes active. This step's `onBeforeActive` will fire simultaneously with the previously active step's `onBeforeInactive`."},{key:"onInactive",value:{name:"signature",type:"function",raw:"() => void | Promise<void>",signature:{arguments:[],return:{name:"union",raw:"void | Promise<void>",elements:[{name:"void"},{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}]}},required:!1},description:"Callback function fired as this step becomes inactive. This step's `onInactive` will fire simultaneously with the new active step's `onActive`."},{key:"onBeforeInactive",value:{name:"signature",type:"function",raw:"() => void | Promise<void>",signature:{arguments:[],return:{name:"union",raw:"void | Promise<void>",elements:[{name:"void"},{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}]}},required:!1},description:"Callback function fired right before this step becomes inactive. This step's `onBeforeInactive` will fire simultaneously with the new active step's `onBeforeActive`."},{key:"tourMaskPadding",value:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}],required:!1},description:"Padding to add around the edges of the TourMask's content mask."},{key:"tourMaskBorderRadius",value:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}],required:!1},description:"Corner radius for the TourMask's content mask. Uses SVG rect element's `rx` and `ry` attributes https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/rx."},{key:"arrowStyle",value:{name:"Record",elements:[{name:"string"},{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]}],raw:"Record<string, string | number>",required:!1},description:"Add styles to the TourStepArrowComponent for this tour step."},{key:"disableAutoScroll",value:{name:"boolean",required:!1},description:"Web only. Disables automatically scrolling to this TourStep when it becomes active."},{key:"scrollOptions",value:{name:"signature",type:"object",raw:`{
  behavior?: ScrollBehavior;
  marginX?: number;
  marginY?: number;
}`,signature:{properties:[{key:"behavior",value:{name:"ScrollBehavior",required:!1}},{key:"marginX",value:{name:"number",required:!1}},{key:"marginY",value:{name:"number",required:!1}}]},required:!1},description:"Web only. Controls the scrolling behavior and margins when calling element.scrollTo() to scroll to an active TourStep target."}]}}],raw:"TourStepValue<TourStepId>[]"},description:""},activeTourStep:{required:!0,tsType:{name:"union",raw:"TourStepValue<TourStepId> | null",elements:[{name:"signature",type:"object",raw:`{
  /**
   * The tour step id.
   */
  id: TourStepId;
  /**
   * The Component to render for this tour step.
   */
  Component: TourStepComponent;
  /**
   * The TourStepArrowComponent to render for this tour step.
   */
  ArrowComponent?: TourStepArrowComponent;
  /**
   * Disabling the tour step causes it to be skipped when calling \`goNextTourStep()\` or \`goPreviousTourStep()\`.
   */
  disabled?: boolean;
  /**
   * Hides the overlay when the tour is active.
   */
  hideOverlay?: boolean;
  /**
   * Callback function fired as this step becomes active. This step's \`onActive\` will fire simultaneously with the previously active step's \`onInactive\`.
   */
  onActive?: () => void | Promise<void>;
  /**
   * Callback function fired right before this step becomes active. This step's \`onBeforeActive\` will fire simultaneously with the previously active step's \`onBeforeInactive\`.
   */
  onBeforeActive?: () => void | Promise<void>;
  /**
   * Callback function fired as this step becomes inactive. This step's \`onInactive\` will fire simultaneously with the new active step's \`onActive\`.
   */
  onInactive?: () => void | Promise<void>;
  /**
   * Callback function fired right before this step becomes inactive. This step's \`onBeforeInactive\` will fire simultaneously with the new active step's \`onBeforeActive\`.
   */
  onBeforeInactive?: () => void | Promise<void>;
  /**
   * Padding to add around the edges of the TourMask's content mask.
   */
  tourMaskPadding?: string | number;
  /**
   * Corner radius for the TourMask's content mask. Uses SVG rect element's \`rx\` and \`ry\` attributes https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/rx.
   */
  tourMaskBorderRadius?: string | number;
  /**
   * Add styles to the TourStepArrowComponent for this tour step.
   */
  arrowStyle?: Record<string, string | number>;
  /**
   * Web only. Disables automatically scrolling to this TourStep when it becomes active.
   */
  disableAutoScroll?: boolean;
  /**
   * Web only. Controls the scrolling behavior and margins when calling element.scrollTo() to scroll to an active TourStep target.
   */
  scrollOptions?: TourScrollOptions;
}`,signature:{properties:[{key:"id",value:{name:"TourStepId",required:!0},description:"The tour step id."},{key:"Component",value:{name:"ReactFC",raw:"React.FC<Omit<TourStepValue, 'Component'>>",elements:[{name:"Omit",elements:[{name:"TourStepValue"},{name:"literal",value:"'Component'"}],raw:"Omit<TourStepValue, 'Component'>"}],required:!0},description:"The Component to render for this tour step."},{key:"ArrowComponent",value:{name:"ReactForwardRefExoticComponent",raw:`React.ForwardRefExoticComponent<
  TourStepArrowComponentProps & { ref?: React.Ref<any> }
>`,elements:[{name:"intersection",raw:"TourStepArrowComponentProps & { ref?: React.Ref<any> }",elements:[{name:"signature",type:"object",raw:`{
  /* The \`@floating-ui\` \`arrow\` coordinates and offsets https://floating-ui.com/docs/arrow#data */
  arrow?: Partial<Coords> & {
    centerOffset: number;
    alignmentOffset?: number;
  };
  /* The \`@floating-ui\` \`arrow\` placement https://floating-ui.com/docs/arrow#placement */
  placement: Placement;
  style?: Record<string, string | number>;
}`,signature:{properties:[{key:"arrow",value:{name:"intersection",raw:`Partial<Coords> & {
  centerOffset: number;
  alignmentOffset?: number;
}`,elements:[{name:"Partial",elements:[{name:"Coords"}],raw:"Partial<Coords>"},{name:"signature",type:"object",raw:`{
  centerOffset: number;
  alignmentOffset?: number;
}`,signature:{properties:[{key:"centerOffset",value:{name:"number",required:!0}},{key:"alignmentOffset",value:{name:"number",required:!1}}]}}],required:!1}},{key:"placement",value:{name:"Placement",required:!0}},{key:"style",value:{name:"Record",elements:[{name:"string"},{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]}],raw:"Record<string, string | number>",required:!1}}]}},{name:"signature",type:"object",raw:"{ ref?: React.Ref<any> }",signature:{properties:[{key:"ref",value:{name:"ReactRef",raw:"React.Ref<any>",elements:[{name:"any"}],required:!1}}]}}]}],required:!1},description:"The TourStepArrowComponent to render for this tour step."},{key:"disabled",value:{name:"boolean",required:!1},description:"Disabling the tour step causes it to be skipped when calling `goNextTourStep()` or `goPreviousTourStep()`."},{key:"hideOverlay",value:{name:"boolean",required:!1},description:"Hides the overlay when the tour is active."},{key:"onActive",value:{name:"signature",type:"function",raw:"() => void | Promise<void>",signature:{arguments:[],return:{name:"union",raw:"void | Promise<void>",elements:[{name:"void"},{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}]}},required:!1},description:"Callback function fired as this step becomes active. This step's `onActive` will fire simultaneously with the previously active step's `onInactive`."},{key:"onBeforeActive",value:{name:"signature",type:"function",raw:"() => void | Promise<void>",signature:{arguments:[],return:{name:"union",raw:"void | Promise<void>",elements:[{name:"void"},{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}]}},required:!1},description:"Callback function fired right before this step becomes active. This step's `onBeforeActive` will fire simultaneously with the previously active step's `onBeforeInactive`."},{key:"onInactive",value:{name:"signature",type:"function",raw:"() => void | Promise<void>",signature:{arguments:[],return:{name:"union",raw:"void | Promise<void>",elements:[{name:"void"},{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}]}},required:!1},description:"Callback function fired as this step becomes inactive. This step's `onInactive` will fire simultaneously with the new active step's `onActive`."},{key:"onBeforeInactive",value:{name:"signature",type:"function",raw:"() => void | Promise<void>",signature:{arguments:[],return:{name:"union",raw:"void | Promise<void>",elements:[{name:"void"},{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}]}},required:!1},description:"Callback function fired right before this step becomes inactive. This step's `onBeforeInactive` will fire simultaneously with the new active step's `onBeforeActive`."},{key:"tourMaskPadding",value:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}],required:!1},description:"Padding to add around the edges of the TourMask's content mask."},{key:"tourMaskBorderRadius",value:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}],required:!1},description:"Corner radius for the TourMask's content mask. Uses SVG rect element's `rx` and `ry` attributes https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/rx."},{key:"arrowStyle",value:{name:"Record",elements:[{name:"string"},{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]}],raw:"Record<string, string | number>",required:!1},description:"Add styles to the TourStepArrowComponent for this tour step."},{key:"disableAutoScroll",value:{name:"boolean",required:!1},description:"Web only. Disables automatically scrolling to this TourStep when it becomes active."},{key:"scrollOptions",value:{name:"signature",type:"object",raw:`{
  behavior?: ScrollBehavior;
  marginX?: number;
  marginY?: number;
}`,signature:{properties:[{key:"behavior",value:{name:"ScrollBehavior",required:!1}},{key:"marginX",value:{name:"number",required:!1}},{key:"marginY",value:{name:"number",required:!1}}]},required:!1},description:"Web only. Controls the scrolling behavior and margins when calling element.scrollTo() to scroll to an active TourStep target."}]}},{name:"null"}]},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:"(tourStep: TourStepValue<TourStepId> | null) => void",signature:{arguments:[{type:{name:"union",raw:"TourStepValue<TourStepId> | null",elements:[{name:"signature",type:"object",raw:`{
  /**
   * The tour step id.
   */
  id: TourStepId;
  /**
   * The Component to render for this tour step.
   */
  Component: TourStepComponent;
  /**
   * The TourStepArrowComponent to render for this tour step.
   */
  ArrowComponent?: TourStepArrowComponent;
  /**
   * Disabling the tour step causes it to be skipped when calling \`goNextTourStep()\` or \`goPreviousTourStep()\`.
   */
  disabled?: boolean;
  /**
   * Hides the overlay when the tour is active.
   */
  hideOverlay?: boolean;
  /**
   * Callback function fired as this step becomes active. This step's \`onActive\` will fire simultaneously with the previously active step's \`onInactive\`.
   */
  onActive?: () => void | Promise<void>;
  /**
   * Callback function fired right before this step becomes active. This step's \`onBeforeActive\` will fire simultaneously with the previously active step's \`onBeforeInactive\`.
   */
  onBeforeActive?: () => void | Promise<void>;
  /**
   * Callback function fired as this step becomes inactive. This step's \`onInactive\` will fire simultaneously with the new active step's \`onActive\`.
   */
  onInactive?: () => void | Promise<void>;
  /**
   * Callback function fired right before this step becomes inactive. This step's \`onBeforeInactive\` will fire simultaneously with the new active step's \`onBeforeActive\`.
   */
  onBeforeInactive?: () => void | Promise<void>;
  /**
   * Padding to add around the edges of the TourMask's content mask.
   */
  tourMaskPadding?: string | number;
  /**
   * Corner radius for the TourMask's content mask. Uses SVG rect element's \`rx\` and \`ry\` attributes https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/rx.
   */
  tourMaskBorderRadius?: string | number;
  /**
   * Add styles to the TourStepArrowComponent for this tour step.
   */
  arrowStyle?: Record<string, string | number>;
  /**
   * Web only. Disables automatically scrolling to this TourStep when it becomes active.
   */
  disableAutoScroll?: boolean;
  /**
   * Web only. Controls the scrolling behavior and margins when calling element.scrollTo() to scroll to an active TourStep target.
   */
  scrollOptions?: TourScrollOptions;
}`,signature:{properties:[{key:"id",value:{name:"TourStepId",required:!0},description:"The tour step id."},{key:"Component",value:{name:"ReactFC",raw:"React.FC<Omit<TourStepValue, 'Component'>>",elements:[{name:"Omit",elements:[{name:"TourStepValue"},{name:"literal",value:"'Component'"}],raw:"Omit<TourStepValue, 'Component'>"}],required:!0},description:"The Component to render for this tour step."},{key:"ArrowComponent",value:{name:"ReactForwardRefExoticComponent",raw:`React.ForwardRefExoticComponent<
  TourStepArrowComponentProps & { ref?: React.Ref<any> }
>`,elements:[{name:"intersection",raw:"TourStepArrowComponentProps & { ref?: React.Ref<any> }",elements:[{name:"signature",type:"object",raw:`{
  /* The \`@floating-ui\` \`arrow\` coordinates and offsets https://floating-ui.com/docs/arrow#data */
  arrow?: Partial<Coords> & {
    centerOffset: number;
    alignmentOffset?: number;
  };
  /* The \`@floating-ui\` \`arrow\` placement https://floating-ui.com/docs/arrow#placement */
  placement: Placement;
  style?: Record<string, string | number>;
}`,signature:{properties:[{key:"arrow",value:{name:"intersection",raw:`Partial<Coords> & {
  centerOffset: number;
  alignmentOffset?: number;
}`,elements:[{name:"Partial",elements:[{name:"Coords"}],raw:"Partial<Coords>"},{name:"signature",type:"object",raw:`{
  centerOffset: number;
  alignmentOffset?: number;
}`,signature:{properties:[{key:"centerOffset",value:{name:"number",required:!0}},{key:"alignmentOffset",value:{name:"number",required:!1}}]}}],required:!1}},{key:"placement",value:{name:"Placement",required:!0}},{key:"style",value:{name:"Record",elements:[{name:"string"},{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]}],raw:"Record<string, string | number>",required:!1}}]}},{name:"signature",type:"object",raw:"{ ref?: React.Ref<any> }",signature:{properties:[{key:"ref",value:{name:"ReactRef",raw:"React.Ref<any>",elements:[{name:"any"}],required:!1}}]}}]}],required:!1},description:"The TourStepArrowComponent to render for this tour step."},{key:"disabled",value:{name:"boolean",required:!1},description:"Disabling the tour step causes it to be skipped when calling `goNextTourStep()` or `goPreviousTourStep()`."},{key:"hideOverlay",value:{name:"boolean",required:!1},description:"Hides the overlay when the tour is active."},{key:"onActive",value:{name:"signature",type:"function",raw:"() => void | Promise<void>",signature:{arguments:[],return:{name:"union",raw:"void | Promise<void>",elements:[{name:"void"},{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}]}},required:!1},description:"Callback function fired as this step becomes active. This step's `onActive` will fire simultaneously with the previously active step's `onInactive`."},{key:"onBeforeActive",value:{name:"signature",type:"function",raw:"() => void | Promise<void>",signature:{arguments:[],return:{name:"union",raw:"void | Promise<void>",elements:[{name:"void"},{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}]}},required:!1},description:"Callback function fired right before this step becomes active. This step's `onBeforeActive` will fire simultaneously with the previously active step's `onBeforeInactive`."},{key:"onInactive",value:{name:"signature",type:"function",raw:"() => void | Promise<void>",signature:{arguments:[],return:{name:"union",raw:"void | Promise<void>",elements:[{name:"void"},{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}]}},required:!1},description:"Callback function fired as this step becomes inactive. This step's `onInactive` will fire simultaneously with the new active step's `onActive`."},{key:"onBeforeInactive",value:{name:"signature",type:"function",raw:"() => void | Promise<void>",signature:{arguments:[],return:{name:"union",raw:"void | Promise<void>",elements:[{name:"void"},{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}]}},required:!1},description:"Callback function fired right before this step becomes inactive. This step's `onBeforeInactive` will fire simultaneously with the new active step's `onBeforeActive`."},{key:"tourMaskPadding",value:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}],required:!1},description:"Padding to add around the edges of the TourMask's content mask."},{key:"tourMaskBorderRadius",value:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}],required:!1},description:"Corner radius for the TourMask's content mask. Uses SVG rect element's `rx` and `ry` attributes https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/rx."},{key:"arrowStyle",value:{name:"Record",elements:[{name:"string"},{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]}],raw:"Record<string, string | number>",required:!1},description:"Add styles to the TourStepArrowComponent for this tour step."},{key:"disableAutoScroll",value:{name:"boolean",required:!1},description:"Web only. Disables automatically scrolling to this TourStep when it becomes active."},{key:"scrollOptions",value:{name:"signature",type:"object",raw:`{
  behavior?: ScrollBehavior;
  marginX?: number;
  marginY?: number;
}`,signature:{properties:[{key:"behavior",value:{name:"ScrollBehavior",required:!1}},{key:"marginX",value:{name:"number",required:!1}},{key:"marginY",value:{name:"number",required:!1}}]},required:!1},description:"Web only. Controls the scrolling behavior and margins when calling element.scrollTo() to scroll to an active TourStep target."}]}},{name:"null"}]},name:"tourStep"}],return:{name:"void"}}},description:""},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},TourMaskComponent:{required:!1,tsType:{name:"ReactFC",raw:"React.FC<TourMaskComponentProps>",elements:[{name:"signature",type:"object",raw:`{
  /**
   * Rect of the active TourStep's target element.
   */
  activeTourStepTargetRect: Rect;
  /**
   * Padding to add around the edges of the TourOverlay's content mask.
   */
  padding?: string | number;
  /**
   * Corner radius for the TourOverlay's content mask. Uses SVG rect element's \`rx\` and \`ry\`
   * attributes https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/rx.
   */
  borderRadius?: string | number;
}`,signature:{properties:[{key:"activeTourStepTargetRect",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
  width: number;
  height: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0},description:"Rect of the active TourStep's target element."},{key:"padding",value:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}],required:!1},description:"Padding to add around the edges of the TourOverlay's content mask."},{key:"borderRadius",value:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}],required:!1},description:"Corner radius for the TourOverlay's content mask. Uses SVG rect element's `rx` and `ry`\nattributes https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/rx."}]}}]},description:`The Component to render as a tour overlay and mask.
@default DefaultTourMask`,defaultValue:{value:`memo(
  ({
    activeTourStepTargetRect,
    padding = 'var(--spacing-2)',
    borderRadius = 0,
  }: TourMaskComponentProps) => {
    const paddingValue = typeof padding === 'number' ? \`\${padding}px\` : padding;
    const maskStyle = useMemo(
      () => ({
        width: \`calc(\${activeTourStepTargetRect.width}px + \${paddingValue})\`,
        height: \`calc(\${activeTourStepTargetRect.height}px + \${paddingValue})\`,
        x: \`calc(\${activeTourStepTargetRect.x}px - (0.5 * \${paddingValue}))\`,
        y: \`calc(\${activeTourStepTargetRect.y}px - (0.5 * \${paddingValue}))\`,
      }),
      [activeTourStepTargetRect, paddingValue],
    );
    return (
      <svg height="100vh" width="100vw">
        <defs>
          <mask id="tourOverlayMask">
            <rect fill="#fff" height="100vh" width="100vw" />
            <rect rx={borderRadius} ry={borderRadius} style={maskStyle} />
          </mask>
        </defs>
        <rect
          fill="rgb(50, 53, 61, 0.33)"
          height="100%"
          mask="url(#tourOverlayMask)"
          width="100%"
        />
      </svg>
    );
  },
)`,computed:!0}},TourStepArrowComponent:{required:!1,tsType:{name:"ReactForwardRefExoticComponent",raw:`React.ForwardRefExoticComponent<
  TourStepArrowComponentProps & { ref?: React.Ref<any> }
>`,elements:[{name:"intersection",raw:"TourStepArrowComponentProps & { ref?: React.Ref<any> }",elements:[{name:"signature",type:"object",raw:`{
  /* The \`@floating-ui\` \`arrow\` coordinates and offsets https://floating-ui.com/docs/arrow#data */
  arrow?: Partial<Coords> & {
    centerOffset: number;
    alignmentOffset?: number;
  };
  /* The \`@floating-ui\` \`arrow\` placement https://floating-ui.com/docs/arrow#placement */
  placement: Placement;
  style?: Record<string, string | number>;
}`,signature:{properties:[{key:"arrow",value:{name:"intersection",raw:`Partial<Coords> & {
  centerOffset: number;
  alignmentOffset?: number;
}`,elements:[{name:"Partial",elements:[{name:"Coords"}],raw:"Partial<Coords>"},{name:"signature",type:"object",raw:`{
  centerOffset: number;
  alignmentOffset?: number;
}`,signature:{properties:[{key:"centerOffset",value:{name:"number",required:!0}},{key:"alignmentOffset",value:{name:"number",required:!1}}]}}],required:!1}},{key:"placement",value:{name:"Placement",required:!0}},{key:"style",value:{name:"Record",elements:[{name:"string"},{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]}],raw:"Record<string, string | number>",required:!1}}]}},{name:"signature",type:"object",raw:"{ ref?: React.Ref<any> }",signature:{properties:[{key:"ref",value:{name:"ReactRef",raw:"React.Ref<any>",elements:[{name:"any"}],required:!1}}]}}]}]},description:`The default Component to render for each TourStep arrow element.
@default DefaultTourStepArrow`,defaultValue:{value:`memo(
  forwardRef<HTMLDivElement, TourStepArrowComponentProps>(
    ({ placement, arrow, style }, ref: React.ForwardedRef<HTMLDivElement>) => {
      const width = 24;
      const height = 24;
      const hideArrow = (arrow?.centerOffset ?? 0) > 0;
      const arrowStyles: React.CSSProperties = useMemo(() => {
        const arrowStyle: React.CSSProperties = {
          position: 'absolute',
          transform: 'rotate(45deg)',
          opacity: hideArrow ? 0 : undefined,
        };
        if (arrow?.x) arrowStyle.left = arrow.x;
        if (arrow?.y) arrowStyle.top = arrow.y;
        if (placement.includes('top')) arrowStyle.bottom = 0.5 * -height;
        if (placement.includes('bottom')) arrowStyle.top = 0.5 * -height;
        if (placement.includes('left')) arrowStyle.right = 0.5 * -width;
        if (placement.includes('right')) arrowStyle.left = 0.5 * -width;
        return { ...arrowStyle, ...style };
      }, [arrow, placement, style, width, height, hideArrow]);
      return (
        <Box
          ref={ref}
          background="bgInverse"
          height={height}
          style={arrowStyles}
          testID="tour-step-arrow"
          width={width}
          zIndex={-1}
        />
      );
    },
  ),
)`,computed:!0}},hideOverlay:{required:!1,tsType:{name:"boolean"},description:`Hide overlay when tour is active
@default false`},tourStepOffset:{required:!1,tsType:{name:"OffsetOptions"},description:"Configures `@floating-ui` offset options for Tour Step component. See https://floating-ui.com/docs/offset.",defaultValue:{value:"24",computed:!1}},tourStepAutoPlacement:{required:!1,tsType:{name:"AutoPlacementOptions"},description:"Configures `@floating-ui` autoPlacement options for Tour Step component. See https://floating-ui.com/docs/autoplacement.\n@default 24"},tourStepShift:{required:!1,tsType:{name:"ShiftOptions"},description:"Configures `@floating-ui` shift options for Tour Step component. See https://floating-ui.com/docs/shift."},tourMaskPadding:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:"Padding to add around the edges of the TourMask's content mask."},tourMaskBorderRadius:{required:!1,tsType:{name:"union",raw:"string | number",elements:[{name:"string"},{name:"number"}]},description:"Corner radius for the TourMask's content mask. Uses SVG rect element's `rx` and `ry`\nattributes https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/rx."},scrollOptions:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  behavior?: ScrollBehavior;
  marginX?: number;
  marginY?: number;
}`,signature:{properties:[{key:"behavior",value:{name:"ScrollBehavior",required:!1}},{key:"marginX",value:{name:"number",required:!1}},{key:"marginY",value:{name:"number",required:!1}}]}},description:"Controls the scrolling behavior and margins when calling element.scrollTo() to scroll to an active TourStep target.",defaultValue:{value:`{
  behavior: 'smooth',
  marginX: 100,
  marginY: 100,
}`,computed:!1}},disablePortal:{required:!1,tsType:{name:"boolean"},description:"@danger This disables React portal integration. Use this with caution."},disableAutoScroll:{required:!1,tsType:{name:"boolean"},description:"Disable automatically scrolling to active elements."},testID:{required:!1,tsType:{name:"string"},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`}}};const C=({id:n,children:e})=>{const{activeTourStep:r,setActiveTourStepTarget:o}=w(),s=i.useCallback(l=>r?.id===n&&l&&o(l),[r,n,o]);return t.jsx("div",{ref:s,children:e})};C.__docgenInfo={description:`The TourStep component wraps the target element (children) that you want to highlight during a step
in the tour. The active tour step content will be positioned relative to the target element when it
is rendered.`,methods:[],displayName:"TourStep",props:{id:{required:!0,tsType:{name:"string"},description:"The id of the corresponding tour step data"},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const yt={title:"Components/Tour",component:v},T=({stagger:n,spacerWidthIncrement:e=0,spacerHeightIncrement:r=500,ids:o})=>{const{startTour:s}=w(),l=i.useCallback(()=>s(),[s]);return t.jsxs(B,{flexGrow:1,gap:2,justifyContent:"space-between",children:[t.jsx(h,{onClick:l,children:"Start tour"}),t.jsx(C,{id:o[0],children:t.jsx(f,{background:"bgSecondary",padding:1,children:t.jsx(b,{as:"p",display:"block",font:"body",children:"This is step 1"})})}),t.jsx(f,{height:r}),t.jsxs(O,{justifyContent:n?"flex-end":void 0,children:[t.jsx(f,{flexShrink:0,width:e}),t.jsx(C,{id:o[1],children:t.jsx(f,{background:"bgSecondary",padding:1,width:150,children:t.jsx(b,{as:"p",display:"block",font:"body",children:"This is step 2"})})})]}),t.jsx(f,{height:r*2}),t.jsxs(O,{children:[t.jsx(f,{flexShrink:0,width:e*2}),t.jsx(C,{id:o[2],children:t.jsx(B,{background:"bgSecondary",padding:1,width:150,children:t.jsx(b,{as:"p",display:"block",font:"body",children:"This is step 3"})})})]}),t.jsx(f,{height:r*3}),t.jsxs(O,{justifyContent:n?"flex-end":void 0,children:[t.jsx(f,{flexShrink:0,width:e*3}),t.jsx(C,{id:o[3],children:t.jsx(B,{background:"bgSecondary",padding:1,width:150,children:t.jsx(b,{as:"p",display:"block",font:"body",children:"This is step 4"})})})]})]})},K=()=>{const[n,e]=i.useState(),{goNextTourStep:r,stopTour:o}=w();return t.jsx(M,{action:t.jsx(h,{compact:!0,onClick:r,variant:"secondary",children:"Next"}),checkbox:t.jsx(pe,{checked:n,onChange:()=>e(s=>!s),children:"Don't show again"}),closeButtonAccessibilityLabel:"Close",content:"Add up to 3 lines of body copy. Deliver your message with clarity and impact",onClose:o,title:"My first step"})},Q=()=>{const{goNextTourStep:n,stopTour:e}=w();return t.jsx(M,{action:t.jsx(h,{compact:!0,onClick:n,variant:"secondary",children:"Next"}),closeButtonAccessibilityLabel:"Close",content:t.jsxs(B,{gap:2,children:[t.jsx(b,{as:"p",color:"fgMuted",display:"block",font:"caption",children:"50%"}),t.jsx(Ae,{progress:.5}),t.jsx(b,{as:"p",display:"block",font:"body",children:"Add up to 3 lines of body copy. Deliver your message with clarity and impact"})]}),media:t.jsx(xe,{height:150,source:de,width:"100%"}),onClose:e,title:"My second step"})},Z=()=>{const{stopTour:n,goNextTourStep:e,goPreviousTourStep:r}=w();return t.jsx(M,{action:t.jsxs(O,{gap:1,children:[t.jsx(h,{compact:!0,onClick:r,variant:"secondary",children:"Back"}),t.jsx(h,{compact:!0,onClick:e,variant:"secondary",children:"Next"}),t.jsx(h,{compact:!0,onClick:n,variant:"secondary",children:"Done"})]}),content:"Add up to 3 lines of body copy. Deliver your message with clarity and impact",title:"My third step",width:350})},ee=()=>{const{stopTour:n,goPreviousTourStep:e}=w();return t.jsx(M,{action:t.jsxs(O,{gap:1,children:[t.jsx(h,{compact:!0,onClick:e,variant:"secondary",children:"Back"}),t.jsx(h,{compact:!0,onClick:n,variant:"secondary",children:"Done"})]}),content:"Add up to 3 lines of body copy. Deliver your message with clarity and impact",title:"My last step",width:350})},y=[{id:"step1",onBeforeActive:()=>console.log("step1 before"),Component:K},{id:"step2",onBeforeActive:()=>console.log("step2 before"),Component:Q},{id:"step3",onBeforeActive:()=>console.log("step3 before"),Component:Z},{id:"step4",onBeforeActive:()=>console.log("step4 before"),Component:ee}],X=[{id:"step-id-1",onBeforeActive:()=>console.log("step-id-1 before"),Component:K},{id:"step-id-2",onBeforeActive:()=>console.log("step-id-2 before"),Component:Q},{id:"step-id-3",onBeforeActive:()=>console.log("step-id-3 before"),Component:Z},{id:"step-id-4",onBeforeActive:()=>console.log("step-id-4 before"),Component:ee}],x=()=>{const[n,e]=i.useState(null);return t.jsx(v,{activeTourStep:n,onChange:e,steps:y,children:t.jsx(T,{stagger:!0,ids:["step1","step2","step3","step4"]})})},A=()=>{const[n,e]=i.useState(null);return t.jsx(v,{hideOverlay:!0,activeTourStep:n,onChange:e,steps:y,children:t.jsx(T,{stagger:!0,ids:["step1","step2","step3","step4"]})})},P=()=>{const[n,e]=i.useState(null);return i.useEffect(()=>{e(y[1])},[]),t.jsx(v,{activeTourStep:n,onChange:e,steps:y,children:t.jsx(T,{stagger:!0,ids:["step1","step2","step3","step4"]})})},R=()=>{const[n,e]=i.useState(null);return t.jsx(v,{activeTourStep:n,onChange:e,steps:y,children:t.jsx(T,{ids:["step1","step2","step3","step4"],spacerHeightIncrement:0,spacerWidthIncrement:1e3})})},q=()=>{const[n,e]=i.useState(null);return t.jsx(v,{activeTourStep:n,onChange:e,steps:y,children:t.jsx(T,{ids:["step1","step2","step3","step4"],spacerWidthIncrement:500})})},j=()=>{const[n,e]=i.useState(null);return t.jsx(v,{activeTourStep:n,onChange:e,steps:X,children:t.jsx(T,{stagger:!0,ids:X.map(r=>r.id)})})};x.__docgenInfo={description:"",methods:[],displayName:"TourDefault"};A.__docgenInfo={description:"",methods:[],displayName:"TourNoOverlay"};P.__docgenInfo={description:"",methods:[],displayName:"TourDefaultActive"};R.__docgenInfo={description:"",methods:[],displayName:"TourHorizontalScroll"};q.__docgenInfo={description:"",methods:[],displayName:"TourMultiAxisScroll"};j.__docgenInfo={description:"",methods:[],displayName:"TourWithStringLiteralId"};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`() => {
  const [activeTourStep, setActiveTourStep] = useState<TourStepValue | null>(null);
  return <Tour activeTourStep={activeTourStep} onChange={setActiveTourStep} steps={tourSteps}>
      <TourExample stagger ids={['step1', 'step2', 'step3', 'step4']} />
    </Tour>;
}`,...x.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`() => {
  const [activeTourStep, setActiveTourStep] = useState<TourStepValue | null>(null);
  return <Tour hideOverlay activeTourStep={activeTourStep} onChange={setActiveTourStep} steps={tourSteps}>
      <TourExample stagger ids={['step1', 'step2', 'step3', 'step4']} />
    </Tour>;
}`,...A.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`() => {
  const [activeTourStep, setActiveTourStep] = useState<TourStepValue | null>(null);
  useEffect(() => {
    setActiveTourStep(tourSteps[1]);
  }, []);
  return <Tour activeTourStep={activeTourStep} onChange={setActiveTourStep} steps={tourSteps}>
      <TourExample stagger ids={['step1', 'step2', 'step3', 'step4']} />
    </Tour>;
}`,...P.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`() => {
  const [activeTourStep, setActiveTourStep] = useState<TourStepValue | null>(null);
  return <Tour activeTourStep={activeTourStep} onChange={setActiveTourStep} steps={tourSteps}>
      <TourExample ids={['step1', 'step2', 'step3', 'step4']} spacerHeightIncrement={0} spacerWidthIncrement={1000} />
    </Tour>;
}`,...R.parameters?.docs?.source}}};q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`() => {
  const [activeTourStep, setActiveTourStep] = useState<TourStepValue | null>(null);
  return <Tour activeTourStep={activeTourStep} onChange={setActiveTourStep} steps={tourSteps}>
      <TourExample ids={['step1', 'step2', 'step3', 'step4']} spacerWidthIncrement={500} />
    </Tour>;
}`,...q.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`() => {
  const [activeTourStep, setActiveTourStep] = useState<TourStepValue<StepId> | null>(null);
  return <Tour activeTourStep={activeTourStep} onChange={setActiveTourStep} steps={tourStepsWithStringLiteral}>
      <TourExample stagger ids={tourStepsWithStringLiteral.map(s => s.id)} />
    </Tour>;
}`,...j.parameters?.docs?.source}}};const wt=["TourDefault","TourNoOverlay","TourDefaultActive","TourHorizontalScroll","TourMultiAxisScroll","TourWithStringLiteralId"];export{x as TourDefault,P as TourDefaultActive,R as TourHorizontalScroll,q as TourMultiAxisScroll,A as TourNoOverlay,j as TourWithStringLiteralId,wt as __namedExportsOrder,yt as default};
