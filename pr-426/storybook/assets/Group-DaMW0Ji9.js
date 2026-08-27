import{r as s,R as f,j as b,B as k}from"./iframe-CYDANtMt.js";import{r as T}from"./index-Cz8MjafU.js";import{S as A}from"./Spacer-BbrrPdew.js";var R=T();function g(a,t=0,i=[]){return s.Children.toArray(a).reduce((n,e,l)=>R.isFragment(e)?[...n,...g(e.props.children,t+1,i.concat(e.key??l))]:s.isValidElement(e)?[...n,s.cloneElement(e,{key:i.concat(String(e.key)).join(".")})]:typeof e=="string"||typeof e=="number"?[...n,e]:n,[])}function x({children:a,direction:t="vertical",divider:i,gap:n,renderItem:e,ItemWrapper:l,Spacer:p}){let r=[];const d=[],y=n!==void 0||i!==void 0,u=f.Children.toArray(a),m=y||u.length>1?g(u):void 0;if(n&&d.push(b.jsx(p,{[t]:n})),i){const o=i;d.push(b.jsx(o,{}))}const h=m?m.map((o,c)=>e&&l?e({item:o,Wrapper:l,index:c,isFirst:c===0,isLast:m.length-1===c}):o):u;return y?(h.forEach((o,c)=>{c===h.length-1?r=[...r,o]:r=[...r,o,...d]}),f.Children.toArray(r)):h}const v=s.memo(({display:a="contents",...t})=>b.jsx(k,{display:a,...t})),q=({item:a,index:t})=>b.jsx(v,{children:a},t),w=s.memo(s.forwardRef(({children:a,direction:t="vertical",divider:i,gap:n,renderItem:e=q,role:l="group",...p},r)=>{const d=s.useMemo(()=>x({children:a,gap:n,divider:i,renderItem:e,direction:t,Spacer:A,ItemWrapper:v}),[a,t,i,n,e]);return b.jsx(k,{ref:r,alignItems:"stretch",flexDirection:t==="horizontal"?"row":"column",flexWrap:"nowrap",role:l,...p,children:d})}));w.displayName="Group";w.__docgenInfo={description:"@deprecated Use `Box`, `HStack` or `VStack` instead.\n@danger Make sure to add a `key` prop to each item.",methods:[],displayName:"Group",props:{accessibilityLabel:{required:!1,tsType:{name:"string"},description:"Accessibility label describing the group of items."},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Items to render in a group."},direction:{required:!1,tsType:{name:"union",raw:"'horizontal' | 'vertical'",elements:[{name:"literal",value:"'horizontal'"},{name:"literal",value:"'vertical'"}]},description:`Direction a group of components should flow.
@default vertical`,defaultValue:{value:"'vertical'",computed:!1}},divider:{required:!1,tsType:{name:"union",raw:"React.ComponentType<React.PropsWithChildren<unknown>> | null",elements:[{name:"ReactComponentType",raw:"React.ComponentType<React.PropsWithChildren<unknown>>",elements:[{name:"ReactPropsWithChildren",raw:"React.PropsWithChildren<unknown>",elements:[{name:"unknown"}]}]},{name:"null"}]},description:"Divider Component to include between each item in a group."},gap:{required:!1,tsType:{name:"ThemeVars.Space"},description:"Gap to insert between siblings."},renderItem:{required:!1,tsType:{name:"signature",type:"function",raw:`(info: {
  Wrapper: React.ComponentType<React.PropsWithChildren<BoxProps>>;
  item: React.ReactChild;
  index: number;
  isFirst: boolean;
  isLast: boolean;
}) => React.ReactChild`,signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  Wrapper: React.ComponentType<React.PropsWithChildren<BoxProps>>;
  item: React.ReactChild;
  index: number;
  isFirst: boolean;
  isLast: boolean;
}`,signature:{properties:[{key:"Wrapper",value:{name:"ReactComponentType",raw:"React.ComponentType<React.PropsWithChildren<BoxProps>>",elements:[{name:"ReactPropsWithChildren",raw:"React.PropsWithChildren<BoxProps>",elements:[{name:"Polymorphic.Props",elements:[{name:"AsComponent"},{name:"intersection",raw:`StyleProps &
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
>`}]}],required:!0}},{key:"item",value:{name:"ReactReactChild",raw:"React.ReactChild",required:!0}},{key:"index",value:{name:"number",required:!0}},{key:"isFirst",value:{name:"boolean",required:!0}},{key:"isLast",value:{name:"boolean",required:!0}}]}},name:"info"}],return:{name:"ReactReactChild",raw:"React.ReactChild"}}},description:`Control the layout of each item in a group.
@default Box component for given platform
@example
\`\`\`
renderItem={({item, Wrapper, index}) => {
 return <Wrapper borderedTop={index === 0}>{item}</Wrapper>
}}
\`\`\``,defaultValue:{value:`({
  item,
  index,
}: {
  item: React.ReactChild;
  index: number;
}) => {
  return <ItemWrapper key={index}>{item}</ItemWrapper>;
}`,computed:!1}},role:{defaultValue:{value:"'group'",computed:!1},required:!1}}};export{w as G};
