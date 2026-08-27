import{r as o,j as m,B as L}from"./iframe-CYDANtMt.js";import{j as O}from"./index-B3W2yIJg.js";import{u as H}from"./useMergeRefs-DR4sGa7m.js";import{u as M}from"./useRefMap-BFAUTUSj.js";import{a as U}from"./Interactable-DhvzqrPU.js";import{d as V}from"./Rect-CybC0zjI.js";import{H as z}from"./HStack-Fh-9TmPm.js";import{m as W}from"./motion-minimal-B1h7XI-_.js";const N=({tabs:e,activeTab:n,disabled:d,onChange:r})=>{const a=o.useCallback(l=>{let i=null;typeof l=="string"&&l!==""&&(i=e.find(T=>T.id===l)??e[0]),i!==n&&r(i)},[n,e,r]),b=o.useCallback(()=>{if(!n||n===e.at(-1))return;const l=e.indexOf(n);for(let i=l+1;i<e.length;i++)if(!e[i].disabled)return r(e[i])},[n,r,e]),c=o.useCallback(()=>{if(!n||n===e[0])return;const l=e.indexOf(n);for(let i=l-1;i>-1;i--)if(!e[i].disabled)return r(e[i])},[n,r,e]);return o.useMemo(()=>({tabs:e,activeTab:n,disabled:d,updateActiveTab:a,goNextTab:b,goPreviousTab:c}),[e,n,d,a,b,c])},q=o.createContext(void 0),ne=()=>{const e=o.useContext(q);if(!e)throw Error("useTabsContext must be used within a TabsContext.Provider");return e},F=W(L),_=({id:e,registerRef:n,...d})=>{const r=o.useCallback(a=>a&&n(e,a),[e,n]);return m.jsx("div",{ref:r,...d})},K={type:"spring",mass:.15,stiffness:170,damping:10,velocity:5},v=o.memo(o.forwardRef(({tabs:e,TabComponent:n,TabsActiveIndicatorComponent:d,activeBackground:r,activeTab:a,onActiveTabElementChange:b,disabled:c,onChange:w,role:l="tablist",position:i="relative",width:T="fit-content",style:x,...R},I)=>{const C=N({tabs:e,activeTab:a,disabled:c,onChange:w}),[P,A]=O({debounce:20}),S=H(I,P),u=M(),D=o.useMemo(()=>{const t=a?u.getRef(a.id):null;return!t||!A.width?V:{x:t.offsetLeft,y:t.offsetTop,width:t.offsetWidth,height:t.offsetHeight}},[a,u,A.width]),j=o.useCallback(t=>{if(!["ArrowRight","ArrowLeft","Home","End"].includes(t.key))return;const k=document.activeElement;if(!k)return;let h=null;for(const s of e){const g=u.getRef(s.id);if(g&&g.contains(k)){h=s.id;break}}if(!h)return;const f=e.findIndex(s=>s.id===h);if(f===-1)return;t.preventDefault();let p;t.key==="ArrowRight"?p=e.slice(f+1).find(s=>!s.disabled):t.key==="ArrowLeft"?p=e.slice(0,f).reverse().find(s=>!s.disabled):t.key==="Home"?p=e.find(s=>!s.disabled):t.key==="End"&&(p=e.slice(0).reverse().find(s=>!s.disabled)),p&&u.getRef(p.id)?.querySelector('[data-rendered-tab], [tabindex]:not([tabindex="-1"])')?.focus()},[e,u]),B=o.useMemo(()=>({opacity:c?U:1,...x}),[c,x]),E=o.useCallback((t,y)=>{u.registerRef(t,y),a?.id===t&&b?.(y)},[a,b,u]);return m.jsx(z,{ref:S,onKeyDown:j,position:i,role:l,style:B,width:T,...R,children:m.jsxs(q.Provider,{value:C,children:[m.jsx(d,{activeTabRect:D,background:r}),e.map(({id:t,Component:y,disabled:k,...h})=>{const f=y??n;return m.jsx(_,{id:t,registerRef:E,children:m.jsx(f,{"data-rendered-tab":!0,disabled:k,id:t,role:"tab",tabIndex:a?.id===t||!a?0:-1,...h})},t)})]})})}));v.displayName="Tabs";const ae=v,G=({activeTabRect:e,position:n="absolute",...d})=>{const{width:r,height:a,x:b}=e,c=o.useMemo(()=>({width:r,x:b}),[r,b]);return r?m.jsx(F,{animate:c,"data-testid":"tabs-active-indicator",height:a,initial:!1,left:0,position:n,role:"none",transition:K,...d}):null};v.__docgenInfo={description:"",methods:[],displayName:"Tabs",props:{tabs:{required:!0,tsType:{name:"Array",elements:[{name:"unknown"}],raw:"(TabValue<TabId> & { Component?: TabComponent<TabId> })[]"},description:"The array of tabs data. Each tab may optionally define a custom Component to render."},TabComponent:{required:!0,tsType:{name:"ReactFC",raw:"React.FC<TabComponentProps<TabId>>",elements:[{name:"intersection",raw:`TabValue<TabId> & {
  /** The tab index for the tab. Automatically set to manage focus behavior. */
  tabIndex?: number;
  /**
   * The role for the tab.
   * @default "tab"
   */
  role?: string;
}`,elements:[{name:"signature",type:"object",raw:`{
  /** The tab id. */
  id: TabId;
  /** The tab label. */
  label?: React.ReactNode;
  /** Disable interactions on the tab. */
  disabled?: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TabId",required:!0},description:"The tab id."},{key:"label",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"The tab label."},{key:"disabled",value:{name:"boolean",required:!1},description:"Disable interactions on the tab."}]}},{name:"signature",type:"object",raw:`{
  /** The tab index for the tab. Automatically set to manage focus behavior. */
  tabIndex?: number;
  /**
   * The role for the tab.
   * @default "tab"
   */
  role?: string;
}`,signature:{properties:[{key:"tabIndex",value:{name:"number",required:!1},description:"The tab index for the tab. Automatically set to manage focus behavior."},{key:"role",value:{name:"string",required:!1},description:`The role for the tab.
@default "tab"`}]}}]}]},description:"The default Component to render each tab."},TabsActiveIndicatorComponent:{required:!0,tsType:{name:"ReactFC",raw:"React.FC<TabsActiveIndicatorProps>",elements:[{name:"intersection",raw:`{
  activeTabRect: Rect;
} & BoxProps<BoxDefaultElement> &
  MotionProps`,elements:[{name:"signature",type:"object",raw:`{
  activeTabRect: Rect;
}`,signature:{properties:[{key:"activeTabRect",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
  width: number;
  height: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!0}}]}},{name:"Polymorphic.Props",elements:[{name:"boxDefaultElement"},{name:"intersection",raw:`StyleProps &
SharedProps &
Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
> & {
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,elements:[{name:"intersection",raw:"ResponsiveProps<StaticStyleProps> & ResponsiveProps<DynamicStyleProps>",elements:[{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}},{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}}]},{name:"signature",type:"object",raw:`{
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
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]}],raw:`Polymorphic.Props<
  AsComponent,
  BoxBaseProps
>`},{name:"MotionProps"}]}]},description:"The default Component to render the tabs active indicator."},activeBackground:{required:!1,tsType:{name:"ThemeVars.Color"},description:"Background color passed to the TabsActiveIndicatorComponent."},onActiveTabElementChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(element: HTMLElement | null) => void",signature:{arguments:[{type:{name:"union",raw:"HTMLElement | null",elements:[{name:"HTMLElement"},{name:"null"}]},name:"element"}],return:{name:"void"}}},description:"Optional callback to receive the active tab element."},role:{defaultValue:{value:"'tablist'",computed:!1},required:!1},position:{defaultValue:{value:"'relative'",computed:!1},required:!1},width:{defaultValue:{value:"'fit-content'",computed:!1},required:!1}}};G.__docgenInfo={description:"",methods:[],displayName:"TabsActiveIndicator",props:{activeTabRect:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
  width: number;
  height: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]}},description:""},position:{defaultValue:{value:"'absolute'",computed:!1},required:!1}}};export{ae as T,G as a,K as t,ne as u};
