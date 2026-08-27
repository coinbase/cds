import{r as t,d as de,j as o,c as ce,z as ue}from"./iframe-CsG_6vZR.js";import{u as be}from"./useDimensions-BCh0uzfM.js";import{H}from"./HStack-DaDYipoP.js";import{V as me}from"./VStack-Cg_Yq2u4.js";import{P as pe}from"./Pressable-DDN99tmF.js";import{P as F,p as I}from"./Paddle-O8Xpk38b.js";import{T as he}from"./TabIndicator-CK1GC29Q.js";import{T as fe}from"./TabLabel-BKxoYLG3.js";const ye="tabNavigation",ve="tabNavigationPaddleLeft",ge="tabNavigationPaddleRight",M=5,we=50;let E;const Te="containerCss-c1c2azg",ke="scrollContainerCss-s1dxgz9b",Ie="pressableCss-p1gdv52g",Re="pressableCustomTabCss-p10623st",Ce="insetFocusRingCss-iobc7hd",De={width:0,x:0},D=t.memo(t.forwardRef(({tabs:m,value:$,variant:i="primary",testID:R=ye,onChange:x,background:v,accessibilityLabelledBy:K,accessibilityLabel:_,previousArrowAccessibilityLabel:G="Skip to beginning",nextArrowAccessibilityLabel:J="Skip to end",Component:P,gap:Q=4,role:f="tablist",paddleStyle:S,...X},Y)=>{const u=$??m[0].id,[A,Z]=t.useState(De),{observe:ee,width:te}=be(),ae=t.useMemo(()=>i==="primary",[i]),q=t.useRef(0),L=t.useRef(m.map(({id:e})=>({id:e,ref:t.createRef()}))),s=t.useRef(null);t.useImperativeHandle(Y,()=>s.current);const y=Number(s.current?.scrollWidth)-Number(s.current?.offsetWidth),ne=Number(s.current?.scrollLeft)<y,[g,N]=t.useState(!1),[w,O]=t.useState(ne),U=f==="tablist"?"tab":"radio",ie=f==="radiogroup"?{"aria-activedescendant":`tab--${u}`}:void 0,C=t.useCallback(()=>{const e=Number(s.current?.scrollLeft),n=y-M,a=M;e>a&&!g?N(!0):e<=a&&g&&N(!1),e<n&&!w?O(!0):e>=n&&w&&O(!1)},[y,g,w]);t.useEffect(()=>{C()},[C,te]);const se=t.useCallback(()=>{s?.current?.scrollTo({left:0,behavior:"smooth"})},[s]),oe=t.useCallback(()=>{s?.current?.scrollTo({left:y,behavior:"smooth"})},[y]);t.useEffect(()=>{de()&&i==="secondary"&&console.warn("Deprecation Warning: Secondary tabs are deprecated, please migrate to primary tabs. In the case of nested tabs, consider using TabbedChips")},[i]);const W=t.useCallback((e,n)=>{e===m[0].id&&(q.current=n.x),e===u&&Z({width:n.width,x:n.x-q.current})},[m,u]),B=t.useCallback(e=>function(a){const d=L?.current,r=d?.findIndex(({id:l})=>l===e)??0,p=Number(d?.length)-1,h=r<p?r+1:0,c=r!==0?r-1:p;switch(a.key){case"ArrowRight":a.preventDefault(),d?.[h].ref?.current?.focus();break;case"ArrowLeft":a.preventDefault(),d?.[c].ref?.current?.focus();break}},[]),j=t.useCallback(e=>function(){const a=s.current,d=Number(a?.scrollLeft),r=Number(a?.getBoundingClientRect().width),p=r+Number(a?.scrollLeft),h=Number(e?.current?.clientWidth),c=Number(e?.current?.offsetLeft),l=c<d+I,T=c+h>p-I;let b;l&&(b=c-I),T&&(b=h+c+I-r),E=setTimeout(()=>{b&&(l||T)&&a?.scrollTo({left:b,behavior:"smooth"})},we)},[]),V=t.useCallback((e,n)=>function(){clearTimeout(E),x(e),n?.(e)},[x]),z=t.useCallback(({label:e,...n})=>o.jsx(fe,{active:n.id===u,...n,onLayout:W,variant:i,children:e}),[W,u,i]),re=t.useMemo(()=>m?.filter(Boolean)?.map(({id:e,onClick:n,label:a,disabled:d,accessibilityLabel:r=typeof a=="string"?a:void 0,count:p,testID:h=`${R}-tabLabel--${e}`,Component:c})=>{const l=e===u,T=f==="radiogroup"?{"aria-checked":l}:{"aria-selected":l},b=L.current?.find(le=>le.id===e)?.ref??t.createRef(),k=c??P;return o.jsx(pe,{ref:b,accessibilityLabel:r,"aria-controls":`tabpanel--${e}`,background:"transparent",...T,className:ce(k?Re:Ie,Ce),disabled:d,id:`tab--${e}`,onClick:V(e,n),onFocus:j(b),onKeyDown:B(e),role:U,tabIndex:l?void 0:-1,testID:h,children:k&&i!=="primary"?o.jsx(k,{active:l,id:e,label:a}):z({id:e,count:p,label:a,Component:k})},`${e}--button`)}),[m,R,u,f,P,j,B,V,U,i,z]);return o.jsxs("div",{ref:ee,className:Te,children:[o.jsx(F,{accessibilityLabel:G,background:v,onClick:se,paddleStyle:S,show:g,testID:ve,variant:i}),o.jsx(H,{ref:s,alignItems:"center",background:v,className:ke,onScroll:C,position:"relative",children:o.jsxs(me,{testID:R,...X,padding:0,children:[o.jsx(H,{accessibilityLabel:_,accessibilityLabelledBy:K,flexShrink:0,gap:Q,role:f,zIndex:ue.navigation,...ie,children:re}),ae&&A?.width>0&&o.jsx(he,{background:v,...A})]})}),o.jsx(F,{accessibilityLabel:J,background:v,direction:"right",onClick:oe,paddleStyle:S,show:w,testID:ge,variant:i})]})}));D.displayName="TabNavigation";const Ue=D;D.__docgenInfo={description:`TabNavigation renders a horizontal, tab-based navigation bar.
This component has a opinionated default style, but allows for customization through custom Component props.
@deprecated Use Tabs instead.`,methods:[],displayName:"TabNavigation",props:{testID:{required:!1,tsType:{name:"string"},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`,defaultValue:{value:"'tabNavigation'",computed:!1}},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""},font:{required:!1,tsType:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"fontFamily"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"fontFamily",required:!1}},{key:"phone",value:{name:"fontFamily",required:!1}},{key:"tablet",value:{name:"fontFamily",required:!1}},{key:"desktop",value:{name:"fontFamily",required:!1}}]}}]},description:""},pin:{required:!1,tsType:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}]},description:"Direction in which to absolutely pin the box."},bordered:{required:!1,tsType:{name:"boolean"},description:"Add a border around all sides of the box."},borderedTop:{required:!1,tsType:{name:"boolean"},description:"Add a border to the top side of the box."},borderedBottom:{required:!1,tsType:{name:"boolean"},description:"Add a border to the bottom side of the box."},borderedStart:{required:!1,tsType:{name:"boolean"},description:"Add a border to the leading side of the box."},borderedEnd:{required:!1,tsType:{name:"boolean"},description:"Add a border to the trailing side of the box."},borderedHorizontal:{required:!1,tsType:{name:"boolean"},description:"Add a border to the leading and trailing sides of the box."},borderedVertical:{required:!1,tsType:{name:"boolean"},description:"Add a border to the top and bottom sides of the box."},dangerouslySetBackground:{required:!1,tsType:{name:"string"},description:"@danger This is a migration escape hatch. It is not intended to be used normally."},value:{required:!1,tsType:{name:"TabId"},description:`The active tabId
 @default tabs[0].id`},tabs:{required:!0,tsType:{name:"Array",elements:[{name:"intersection",raw:`SharedProps &
Partial<Pick<DotCountBaseProps, 'count' | 'max'>> & {
  /** The id should be a meaningful and useful identifier like "watchlist" or "forSale" */
  id: TabId;
  /** Define a label for this Tab */
  label: React.ReactNode;
  /** See the Tabs TDD to understand which variant should be used.
   *  @default 'primary'
   */
  variant?: 'primary' | 'secondary';
  /** Disable interactions on the tab. */
  disabled?: boolean;
  /** Full length accessibility label when the child text is not descriptive enough. */
  accessibilityLabel?: string;
  /** Callback to fire when pressed */
  onClick?: (id: TabId) => void;
  /** Render a custom Component for the Tab */
  Component?: (props: CustomTabProps) => React.ReactNode;
}`,elements:[{name:"signature",type:"object",raw:`{
  /**
   * Used to locate this element in unit and end-to-end tests.
   * Under the hood, testID translates to data-testid on Web. On Mobile, testID
   * stays the same - testID
   */
  testID?: string;
}`,signature:{properties:[{key:"testID",value:{name:"string",required:!1},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`}]}},{name:"Partial",elements:[{name:"Pick",elements:[{name:"intersection",raw:`SharedProps &
Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
> & {
  /**
   * The number value to be shown in the dot. If count is <= 0, dot will not show up.
   *  */
  count: number;
  /**
   * If a badge count is greater than max, it will truncate the numbers so its max+
   * @default 99
   *  */
  max?: number;
  /**
   * Background color of dot
   * @default negative
   * */
  variant?: DotCountVariants;
  /** Position of dot relative to its parent */
  pin?: DotCountPinPlacement;
  /** Children of where the dot will anchor to */
  children?: React.ReactNode;
  /** Indicates what shape Dot is overlapping */
  overlap?: DotOverlap;
}`,elements:[{name:"signature",type:"object",raw:`{
  /**
   * Used to locate this element in unit and end-to-end tests.
   * Under the hood, testID translates to data-testid on Web. On Mobile, testID
   * stays the same - testID
   */
  testID?: string;
}`,signature:{properties:[{key:"testID",value:{name:"string",required:!1},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`}]}},{name:"Pick",elements:[{name:"signature",type:"object",raw:`{
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
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},{name:"union",raw:"'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'",elements:[{name:"literal",value:"'accessibilityLabel'"},{name:"literal",value:"'accessibilityLabelledBy'"},{name:"literal",value:"'accessibilityHint'"}]}],raw:`Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
>`},{name:"signature",type:"object",raw:`{
  /**
   * The number value to be shown in the dot. If count is <= 0, dot will not show up.
   *  */
  count: number;
  /**
   * If a badge count is greater than max, it will truncate the numbers so its max+
   * @default 99
   *  */
  max?: number;
  /**
   * Background color of dot
   * @default negative
   * */
  variant?: DotCountVariants;
  /** Position of dot relative to its parent */
  pin?: DotCountPinPlacement;
  /** Children of where the dot will anchor to */
  children?: React.ReactNode;
  /** Indicates what shape Dot is overlapping */
  overlap?: DotOverlap;
}`,signature:{properties:[{key:"count",value:{name:"number",required:!0},description:"The number value to be shown in the dot. If count is <= 0, dot will not show up."},{key:"max",value:{name:"number",required:!1},description:`If a badge count is greater than max, it will truncate the numbers so its max+
@default 99`},{key:"variant",value:{name:"Extract",elements:[{name:"union",raw:"'positive' | 'negative' | 'primary' | 'foregroundMuted' | 'warning'",elements:[{name:"literal",value:"'positive'"},{name:"literal",value:"'negative'"},{name:"literal",value:"'primary'"},{name:"literal",value:"'foregroundMuted'"},{name:"literal",value:"'warning'"}]},{name:"literal",value:"'negative'"}],raw:"Extract<DotVariant, 'negative'>",required:!1},description:`Background color of dot
@default negative`},{key:"pin",value:{name:"Extract",elements:[{name:"union",raw:"'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'",elements:[{name:"literal",value:"'top-start'"},{name:"literal",value:"'top-end'"},{name:"literal",value:"'bottom-start'"},{name:"literal",value:"'bottom-end'"}]},{name:"literal",value:"'top-end'"}],raw:"Extract<PinPlacement, 'top-end'>",required:!1},description:"Position of dot relative to its parent"},{key:"children",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"Children of where the dot will anchor to"},{key:"overlap",value:{name:"literal",value:"'circular'",required:!1},description:"Indicates what shape Dot is overlapping"}]}}]},{name:"union",raw:"'count' | 'max'",elements:[{name:"literal",value:"'count'"},{name:"literal",value:"'max'"}]}],raw:"Pick<DotCountBaseProps, 'count' | 'max'>"}],raw:"Partial<Pick<DotCountBaseProps, 'count' | 'max'>>"},{name:"signature",type:"object",raw:`{
  /** The id should be a meaningful and useful identifier like "watchlist" or "forSale" */
  id: TabId;
  /** Define a label for this Tab */
  label: React.ReactNode;
  /** See the Tabs TDD to understand which variant should be used.
   *  @default 'primary'
   */
  variant?: 'primary' | 'secondary';
  /** Disable interactions on the tab. */
  disabled?: boolean;
  /** Full length accessibility label when the child text is not descriptive enough. */
  accessibilityLabel?: string;
  /** Callback to fire when pressed */
  onClick?: (id: TabId) => void;
  /** Render a custom Component for the Tab */
  Component?: (props: CustomTabProps) => React.ReactNode;
}`,signature:{properties:[{key:"id",value:{name:"TabId",required:!0},description:'The id should be a meaningful and useful identifier like "watchlist" or "forSale"'},{key:"label",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0},description:"Define a label for this Tab"},{key:"variant",value:{name:"union",raw:"'primary' | 'secondary'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"}],required:!1},description:`See the Tabs TDD to understand which variant should be used.
 @default 'primary'`},{key:"disabled",value:{name:"boolean",required:!1},description:"Disable interactions on the tab."},{key:"accessibilityLabel",value:{name:"string",required:!1},description:"Full length accessibility label when the child text is not descriptive enough."},{key:"onClick",value:{name:"signature",type:"function",raw:"(id: TabId) => void",signature:{arguments:[{type:{name:"TabId"},name:"id"}],return:{name:"void"}},required:!1},description:"Callback to fire when pressed"},{key:"Component",value:{name:"signature",type:"function",raw:"(props: CustomTabProps) => React.ReactNode",signature:{arguments:[{type:{name:"intersection",raw:`Pick<TabProps, 'id'> & {
  /**
   * @default false
   * When true, used to surface an active state for the currently selected tab
   */
  active?: boolean;
  /** Define a label for this Tab */
  label?: React.ReactNode;
}`,elements:[{name:"Pick",elements:[{name:"TabProps"},{name:"literal",value:"'id'"}],raw:"Pick<TabProps, 'id'>"},{name:"signature",type:"object",raw:`{
  /**
   * @default false
   * When true, used to surface an active state for the currently selected tab
   */
  active?: boolean;
  /** Define a label for this Tab */
  label?: React.ReactNode;
}`,signature:{properties:[{key:"active",value:{name:"boolean",required:!1},description:`@default false
When true, used to surface an active state for the currently selected tab`},{key:"label",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"Define a label for this Tab"}]}}]},name:"props"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}},required:!1},description:"Render a custom Component for the Tab"}]}}]}],raw:"TabProps<TabId>[]"},description:"Children should be TabLabels. If you only have one child, don't use tabs 🤪"},onChange:{required:!0,tsType:{name:"union",raw:"((tabId: TabId) => void) | React.Dispatch<React.SetStateAction<TabId>>",elements:[{name:"unknown"},{name:"ReactDispatch",raw:"React.Dispatch<React.SetStateAction<TabId>>",elements:[{name:"ReactSetStateAction",raw:"React.SetStateAction<TabId>",elements:[{name:"TabId"}]}]}]},description:"Use the onChange handler to deal with any side effects, ie event tracking or showing a tooltip"},background:{required:!1,tsType:{name:"ThemeVars.Color"},description:`This should always match the background color of the parent container
@default: 'bg'`},gap:{required:!1,tsType:{name:"ThemeVars.Space"},description:`The spacing between Tabs
@default 4`,defaultValue:{value:"4",computed:!1}},role:{required:!1,tsType:{name:"union",raw:"'radiogroup' | 'tablist'",elements:[{name:"literal",value:"'radiogroup'"},{name:"literal",value:"'tablist'"}]},description:"Used to generate a11y attributes for the Tabs\nIf TabNavigation is used to display options that will filter data, use `radiogroup`\nIf TabNavigation is used to display a list of pages or views, use `tablist`\n@default tablist",defaultValue:{value:"'tablist'",computed:!1}},previousArrowAccessibilityLabel:{required:!1,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:"Web only. Accessibility label for the previous arrow paddle (skip to beginning).",defaultValue:{value:"'Skip to beginning'",computed:!1}},nextArrowAccessibilityLabel:{required:!1,tsType:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]},description:"Web only. Accessibility label for the next arrow paddle (skip to end).",defaultValue:{value:"'Skip to end'",computed:!1}},paddleStyle:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:"Web only. Styling for the paddle icon buttons. Mobile does not have paddles."},variant:{defaultValue:{value:"'primary'",computed:!1},required:!1}}};export{Ue as T};
