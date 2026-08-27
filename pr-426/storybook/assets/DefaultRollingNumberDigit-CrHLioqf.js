import{r as a,j as d,c as A,u as ye}from"./iframe-CYDANtMt.js";import{T as U}from"./Text-0g3rWpAf.js";import{m as M}from"./motion-minimal-B1h7XI-_.js";import{c as Q,d as X}from"./tokens-BwScSksM.js";import{u as fe}from"./LocaleProvider-szkYova-.js";import{H as ve}from"./HStack-Fh-9TmPm.js";import{a as Z}from"./animate-NV5OIPt9.js";import{u as ge}from"./useTheme-C_Ehsh33.js";import{u as ke}from"./use-animation-B-MH_N0S.js";const we=M(U),Se="containerCss-caphhbo",ie=a.memo(a.forwardRef(({children:t,color:n="inherit",justifyContent:o="flex-start",className:l,styles:i,style:s,classNames:u,...b},h)=>d.jsx(we,{ref:h,className:A(Se,l,u?.root,u?.text),color:n,justifyContent:o,style:{...s,...i?.root,...i?.text},...b,children:t})));ie.__docgenInfo={description:"",methods:[],displayName:"DefaultRollingNumberAffixSection",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Content rendered inside the affix section."},ref:{required:!1,tsType:{name:"ReactRef",raw:"React.Ref<HTMLSpanElement>",elements:[{name:"HTMLSpanElement"}]},description:"Ref forwarded to the affix section wrapper element."},styles:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /** Affix section container element */
  root?: React.CSSProperties;
  /** Text element within the section */
  text?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Affix section container element"},{key:"text",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Text element within the section"}]}},description:""},classNames:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /** Affix section container element */
  root?: string;
  /** Text element within the section */
  text?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1},description:"Affix section container element"},{key:"text",value:{name:"string",required:!1},description:"Text element within the section"}]}},description:""},color:{defaultValue:{value:"'inherit'",computed:!1},required:!1},justifyContent:{defaultValue:{value:"'flex-start'",computed:!1},required:!1}}};const ee=t=>{const{width:n,fontSize:o}=getComputedStyle(t),l=parseFloat(n),i=parseFloat(o);return`${l/i}em`},Te=M(U),xe="maskCss-m11lh4hy",B=a.memo(a.forwardRef(({children:t,color:n="inherit",className:o,...l},i)=>d.jsx(Te,{ref:i,className:A(xe,o),color:n,...l,children:t})));B.__docgenInfo={description:"",methods:[],displayName:"DefaultRollingNumberMask",props:{children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Content rendered inside the mask container."},ref:{required:!1,tsType:{name:"ReactRef",raw:"React.Ref<HTMLSpanElement>",elements:[{name:"HTMLSpanElement"}]},description:"Ref forwarded to the mask element."},color:{defaultValue:{value:"'inherit'",computed:!1},required:!1}}};const De={0:"₀",1:"₁",2:"₂",3:"₃",4:"₄",5:"₅",6:"₆",7:"₇",8:"₈",9:"₉"},Re=t=>String(t).split("").map(n=>De[n]??n).join("");function qe(t){const n=/^(0+)(.*)$/.exec(t);if(!n)return t.split("").map(s=>({type:"fraction",value:parseInt(s,10)}));const[,o,l]=n;if(o.length<=1)return t.split("").map(s=>({type:"fraction",value:parseInt(s,10)}));const i=[];i.push({type:"fraction",value:0}),i.push({type:"subscript",value:Re(o.length)});for(let s=0;s<l.length;s++)i.push({type:"fraction",value:parseInt(l[s],10)});return i}const te=(t,n)=>t.split("").map(o=>({type:n,value:parseInt(o)})),ne=(t,n,o)=>{const i=(o==="rtl"?[...t].reverse():t).map(s=>({...s,key:n(s.type)}));return o==="rtl"?i.reverse():i};class Ae{constructor(n){this.value=n.value,this.formatOptions=n.format,this.locale=n.locale,this.formatter=new Intl.NumberFormat(this.locale,this.formatOptions)}format(){return this.formatter.format(this.value)}formatToParts({enableSubscriptNotation:n}={}){if(!Intl.NumberFormat.prototype.formatToParts)throw new Error("Intl.NumberFormat.prototype.formatToParts is undefined, please ensure Intl.NumberFormat is polyfilled.");const o=this.formatter.formatToParts(this.value),l=[],i=[],s=[],u=[],b={},h=c=>`${c}:${b[c]=(b[c]??-1)+1}`;let y=!1;for(const c of o){const{type:m,value:p}=c;switch(m){case"integer":{y=!0,i.push(...te(p,m));break}case"fraction":{y=!0;const x=n?qe(p):te(p,m);s.push(...x);break}case"group":{y=!0,i.push({type:m,value:p});break}case"decimal":{y=!0,s.push({type:m,value:p});break}default:{(y?u:l).push({type:m,value:p,key:h(m)});break}}}const w=ne(i,h,"rtl"),f=ne(s,h,"ltr");return{pre:l,integer:w,fraction:f,post:u}}}function Ce(t){const n=a.useRef(null),o=a.useRef(void 0),l=n.current;return l!==null&&!Number.isNaN(l)&&!Number.isNaN(t)&&l!==t&&(o.current=t>l?"up":"down"),n.current=t,o.current}const Ne=M(U),Pe="containerCss-c1ggvwuy",_=a.memo(a.forwardRef(({value:t,color:n="inherit",className:o,style:l,styles:i,classNames:s,...u},b)=>d.jsx(Ne,{ref:b,className:A(Pe,o,s?.root,s?.text),color:n,style:{...l,...i?.root,...i?.text},...u,children:t})));_.__docgenInfo={description:"",methods:[],displayName:"DefaultRollingNumberSymbol",props:{value:{required:!0,tsType:{name:"string"},description:"Literal symbol rendered within the number stream."},styles:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /** Symbol container element */
  root?: React.CSSProperties;
  /** Symbol text element */
  text?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Symbol container element"},{key:"text",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Symbol text element"}]}},description:""},classNames:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /** Symbol container element */
  root?: string;
  /** Symbol text element */
  text?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1},description:"Symbol container element"},{key:"text",value:{name:"string",required:!1},description:"Symbol text element"}]}},description:""},ref:{required:!1,tsType:{name:"ReactRef",raw:"React.Ref<HTMLSpanElement>",elements:[{name:"HTMLSpanElement"}]},description:"Ref forwarded to the symbol container element."},color:{defaultValue:{value:"'inherit'",computed:!1},required:!1}}};const Ue=M(U),Me="containerCss-cjnctqo",ze=t=>/^\d$/.test(t),oe=a.memo(a.forwardRef(({intlNumberParts:t,color:n="inherit",justifyContent:o="flex-start",className:l,RollingNumberDigitComponent:i=G,RollingNumberSymbolComponent:s=_,RollingNumberMaskComponent:u=B,formattedValue:b,transitionConfig:h,digitTransitionVariant:y,direction:w,styles:f,classNames:c,style:m,...p},x)=>{const T=ye(),S=a.useMemo(()=>t.map(e=>e.type!=="integer"&&e.type!=="fraction"||typeof e.value!="number"?d.jsx(s,{classNames:{text:c?.text},justifyContent:o,styles:{text:f?.text},value:String(e.value)},e.type==="literal"?`${e.key}:${e.value}`:e.key):d.jsx(i,{RollingNumberMaskComponent:u,classNames:{text:c?.text},digitTransitionVariant:y,direction:w,initialValue:T?0:void 0,styles:{text:f?.text},transitionConfig:h,value:e.value},e.key)),[t,s,o,i,T,h,y,w,u,f?.text,c?.text]),v=a.useMemo(()=>b?.split("").map((e,r)=>ze(e)?d.jsx(i,{RollingNumberMaskComponent:u,classNames:{text:c?.text},digitTransitionVariant:y,direction:w,initialValue:T?0:void 0,styles:{text:f?.text},transitionConfig:h,value:parseInt(e)},r):d.jsx(s,{classNames:{text:c?.text},justifyContent:o,styles:{text:f?.text},value:e},r)),[i,s,b,T,o,u,h,y,w,f?.text,c?.text]);return d.jsx(Ue,{ref:x,className:A(Me,l,c?.root,c?.text),color:n,justifyContent:o,style:{...m,...f?.root,...f?.text},...p,children:b?v:S})}));oe.__docgenInfo={description:"",methods:[],displayName:"DefaultRollingNumberValueSection",props:{intlNumberParts:{required:!0,tsType:{name:"Array",elements:[{name:"intersection",raw:"{ key: string } & NumberPart",elements:[{name:"signature",type:"object",raw:"{ key: string }",signature:{properties:[{key:"key",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:"{ type: string; value: number | string }",signature:{properties:[{key:"type",value:{name:"string",required:!0}},{key:"value",value:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}],required:!0}}]}}]}],raw:"KeyedNumberPart[]"},description:"Parts provided by Intl.NumberFormat used to render the formatted value."},RollingNumberDigitComponent:{required:!1,tsType:{name:"ReactFC",raw:"React.FC<RollingNumberDigitProps>",elements:[{name:"intersection",raw:`TextProps<TextDefaultElement> & {
  /**
   * Digit currently displayed in the animated column.
   */
  value: number;
  /**
   * Digit displayed during the initial render.
   */
  initialValue?: number;
  /**
   * Transition overrides applied to the digit animation.
   */
  transitionConfig?: RollingNumberTransitionConfig;
  /**
   * Component used to mask the digit column.
   */
  RollingNumberMaskComponent?: RollingNumberMaskComponent;
  /**
   * Style of digit transition animation.
   * @default 'every'
   */
  digitTransitionVariant?: DigitTransitionVariant;
  /**
   * Direction of the roll animation. Only used when {@link digitTransitionVariant} is \`'single'\`.
   */
  direction?: SingleDirection;
  styles?: {
    /** Digit container element */
    root?: React.CSSProperties;
    /** Digit text element */
    text?: React.CSSProperties;
  };
  classNames?: {
    /** Digit container element */
    root?: string;
    /** Digit text element */
    text?: string;
  };
  /**
   * Ref forwarded to the digit container element.
   */
  ref?: React.Ref<HTMLSpanElement>;
}`,elements:[{name:"Polymorphic.Props",elements:[{name:"textDefaultElement"},{name:"Polymorphic.ExtendableProps",elements:[{name:"intersection",raw:`StyleProps &
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
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]},{name:"signature",type:"object",raw:`{
  numberOfLines?: number;
  disabled?: boolean;
  /**
   * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
   * @default false
   */
  tabularNumbers?: boolean;
  /**
   * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
   * @default false
   */
  slashedZero?: boolean;
  /**
   * Set text decoration to underline.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
   * @default false
   */
  underline?: boolean;
  /**
   * Use monospace font family.
   */
  mono?: boolean;
  /**
   * Set text to be in a single line.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
   * @default false
   */
  noWrap?: boolean;
  /**
   * Set overflow behavior.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
   */
  overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetColor?: string;
  /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
  renderEmptyNode?: boolean;
}`,signature:{properties:[{key:"numberOfLines",value:{name:"number",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"tabularNumbers",value:{name:"boolean",required:!1},description:`Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
@default false`},{key:"slashedZero",value:{name:"boolean",required:!1},description:`Use character for number zero with a slash through it to differentiate it from the letter 'O'.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
@default false`},{key:"underline",value:{name:"boolean",required:!1},description:`Set text decoration to underline.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
@default false`},{key:"mono",value:{name:"boolean",required:!1},description:"Use monospace font family."},{key:"noWrap",value:{name:"boolean",required:!1},description:`Set text to be in a single line.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
@default false`},{key:"overflow",value:{name:"union",raw:"'truncate' | 'clip' | 'wrap' | 'break'",elements:[{name:"literal",value:"'truncate'"},{name:"literal",value:"'clip'"},{name:"literal",value:"'wrap'"},{name:"literal",value:"'break'"}],required:!1},description:`Set overflow behavior.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)`},{key:"dangerouslySetColor",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."},{key:"renderEmptyNode",value:{name:"boolean",required:!1},description:"@deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS."}]}}],raw:`Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    numberOfLines?: number;
    disabled?: boolean;
    /**
     * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
     * @default false
     */
    tabularNumbers?: boolean;
    /**
     * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
     * @default false
     */
    slashedZero?: boolean;
    /**
     * Set text decoration to underline.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
     * @default false
     */
    underline?: boolean;
    /**
     * Use monospace font family.
     */
    mono?: boolean;
    /**
     * Set text to be in a single line.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
     * @default false
     */
    noWrap?: boolean;
    /**
     * Set overflow behavior.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
     */
    overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
    /** @danger This is a migration escape hatch. It is not intended to be used normally. */
    dangerouslySetColor?: string;
    /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
    renderEmptyNode?: boolean;
  }
>`}],raw:`Polymorphic.Props<
  AsComponent,
  TextBaseProps
>`},{name:"signature",type:"object",raw:`{
  /**
   * Digit currently displayed in the animated column.
   */
  value: number;
  /**
   * Digit displayed during the initial render.
   */
  initialValue?: number;
  /**
   * Transition overrides applied to the digit animation.
   */
  transitionConfig?: RollingNumberTransitionConfig;
  /**
   * Component used to mask the digit column.
   */
  RollingNumberMaskComponent?: RollingNumberMaskComponent;
  /**
   * Style of digit transition animation.
   * @default 'every'
   */
  digitTransitionVariant?: DigitTransitionVariant;
  /**
   * Direction of the roll animation. Only used when {@link digitTransitionVariant} is \`'single'\`.
   */
  direction?: SingleDirection;
  styles?: {
    /** Digit container element */
    root?: React.CSSProperties;
    /** Digit text element */
    text?: React.CSSProperties;
  };
  classNames?: {
    /** Digit container element */
    root?: string;
    /** Digit text element */
    text?: string;
  };
  /**
   * Ref forwarded to the digit container element.
   */
  ref?: React.Ref<HTMLSpanElement>;
}`,signature:{properties:[{key:"value",value:{name:"number",required:!0},description:"Digit currently displayed in the animated column."},{key:"initialValue",value:{name:"number",required:!1},description:"Digit displayed during the initial render."},{key:"transitionConfig",value:{name:"signature",type:"object",raw:`{
  /**
   * Transition applied to the vertical translation animation (digit roll).
   */
  y?: Transition;
  /**
   * Transition applied to the opacity animation during digit transitions.
   * Controls how digits fade in/out during the single variant animation.
   */
  opacity?: Transition;
  /**
   * Transition applied to the color interpolation animation (color pulse).
   */
  color?: Transition;
}`,signature:{properties:[{key:"y",value:{name:"Transition",required:!1},description:"Transition applied to the vertical translation animation (digit roll)."},{key:"opacity",value:{name:"Transition",required:!1},description:`Transition applied to the opacity animation during digit transitions.
Controls how digits fade in/out during the single variant animation.`},{key:"color",value:{name:"Transition",required:!1},description:"Transition applied to the color interpolation animation (color pulse)."}]},required:!1},description:"Transition overrides applied to the digit animation."},{key:"RollingNumberMaskComponent",value:{name:"ReactFC",raw:"React.FC<RollingNumberMaskProps>",elements:[{name:"intersection",raw:`TextProps<TextDefaultElement> & {
  /**
   * Content rendered inside the mask container.
   */
  children?: React.ReactNode;
  /**
   * Ref forwarded to the mask element.
   */
  ref?: React.Ref<HTMLSpanElement>;
}`,elements:[{name:"Polymorphic.Props",elements:[{name:"textDefaultElement"},{name:"Polymorphic.ExtendableProps",elements:[{name:"intersection",raw:`StyleProps &
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
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]},{name:"signature",type:"object",raw:`{
  numberOfLines?: number;
  disabled?: boolean;
  /**
   * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
   * @default false
   */
  tabularNumbers?: boolean;
  /**
   * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
   * @default false
   */
  slashedZero?: boolean;
  /**
   * Set text decoration to underline.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
   * @default false
   */
  underline?: boolean;
  /**
   * Use monospace font family.
   */
  mono?: boolean;
  /**
   * Set text to be in a single line.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
   * @default false
   */
  noWrap?: boolean;
  /**
   * Set overflow behavior.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
   */
  overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetColor?: string;
  /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
  renderEmptyNode?: boolean;
}`,signature:{properties:[{key:"numberOfLines",value:{name:"number",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"tabularNumbers",value:{name:"boolean",required:!1},description:`Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
@default false`},{key:"slashedZero",value:{name:"boolean",required:!1},description:`Use character for number zero with a slash through it to differentiate it from the letter 'O'.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
@default false`},{key:"underline",value:{name:"boolean",required:!1},description:`Set text decoration to underline.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
@default false`},{key:"mono",value:{name:"boolean",required:!1},description:"Use monospace font family."},{key:"noWrap",value:{name:"boolean",required:!1},description:`Set text to be in a single line.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
@default false`},{key:"overflow",value:{name:"union",raw:"'truncate' | 'clip' | 'wrap' | 'break'",elements:[{name:"literal",value:"'truncate'"},{name:"literal",value:"'clip'"},{name:"literal",value:"'wrap'"},{name:"literal",value:"'break'"}],required:!1},description:`Set overflow behavior.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)`},{key:"dangerouslySetColor",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."},{key:"renderEmptyNode",value:{name:"boolean",required:!1},description:"@deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS."}]}}],raw:`Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    numberOfLines?: number;
    disabled?: boolean;
    /**
     * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
     * @default false
     */
    tabularNumbers?: boolean;
    /**
     * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
     * @default false
     */
    slashedZero?: boolean;
    /**
     * Set text decoration to underline.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
     * @default false
     */
    underline?: boolean;
    /**
     * Use monospace font family.
     */
    mono?: boolean;
    /**
     * Set text to be in a single line.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
     * @default false
     */
    noWrap?: boolean;
    /**
     * Set overflow behavior.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
     */
    overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
    /** @danger This is a migration escape hatch. It is not intended to be used normally. */
    dangerouslySetColor?: string;
    /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
    renderEmptyNode?: boolean;
  }
>`}],raw:`Polymorphic.Props<
  AsComponent,
  TextBaseProps
>`},{name:"signature",type:"object",raw:`{
  /**
   * Content rendered inside the mask container.
   */
  children?: React.ReactNode;
  /**
   * Ref forwarded to the mask element.
   */
  ref?: React.Ref<HTMLSpanElement>;
}`,signature:{properties:[{key:"children",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"Content rendered inside the mask container."},{key:"ref",value:{name:"ReactRef",raw:"React.Ref<HTMLSpanElement>",elements:[{name:"HTMLSpanElement"}],required:!1},description:"Ref forwarded to the mask element."}]}}]}],required:!1},description:"Component used to mask the digit column."},{key:"digitTransitionVariant",value:{name:"union",raw:"'every' | 'single'",elements:[{name:"literal",value:"'every'"},{name:"literal",value:"'single'"}],required:!1},description:`Style of digit transition animation.
@default 'every'`},{key:"direction",value:{name:"union",raw:"'up' | 'down'",elements:[{name:"literal",value:"'up'"},{name:"literal",value:"'down'"}],required:!1},description:"Direction of the roll animation. Only used when {@link digitTransitionVariant} is `'single'`."},{key:"styles",value:{name:"signature",type:"object",raw:`{
  /** Digit container element */
  root?: React.CSSProperties;
  /** Digit text element */
  text?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Digit container element"},{key:"text",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Digit text element"}]},required:!1}},{key:"classNames",value:{name:"signature",type:"object",raw:`{
  /** Digit container element */
  root?: string;
  /** Digit text element */
  text?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1},description:"Digit container element"},{key:"text",value:{name:"string",required:!1},description:"Digit text element"}]},required:!1}},{key:"ref",value:{name:"ReactRef",raw:"React.Ref<HTMLSpanElement>",elements:[{name:"HTMLSpanElement"}],required:!1},description:"Ref forwarded to the digit container element."}]}}]}]},description:"Component used to render numeric digits within the section.",defaultValue:{value:`memo(
  forwardRef<HTMLSpanElement, RollingNumberDigitProps>(
    (
      {
        value,
        initialValue,
        transitionConfig,
        digitTransitionVariant = 'every',
        direction,
        RollingNumberMaskComponent = DefaultRollingNumberMask,
        color = 'inherit',
        className,
        styles,
        style,
        classNames,
        ...props
      },
      ref,
    ) => {
      const internalRef = useRef<HTMLSpanElement>(null);
      useImperativeHandle(ref, () => internalRef.current as HTMLSpanElement);

      const numberRefs = useRef(new Array<HTMLSpanElement | null>(10));
      const singleVariantPrevDigitRef = useRef<HTMLSpanElement>(null);
      const singleVariantCurrentDigitRef = useRef<HTMLSpanElement>(null);
      const prevValue = useRef(initialValue ?? value);

      const isSingleVariant = useMemo(
        () => digitTransitionVariant === 'single',
        [digitTransitionVariant],
      );

      useLayoutEffect(() => {
        const prevDigit = numberRefs.current[prevValue.current];
        const currDigit = numberRefs.current[value];
        if (!internalRef.current || !prevDigit || !currDigit || value === prevValue.current) return;

        const box = internalRef.current.getBoundingClientRect();
        // Every: distance based on numeric difference (rolls through every intermediate digit)
        // Single: distance is always 1 height (rolls directly to the new digit)
        const directionSign = direction === 'up' ? 1 : -1;
        const initialY = isSingleVariant
          ? box.height * directionSign
          : box.height * (value - prevValue.current);
        const prevWidth = getWidthInEm(prevDigit);
        const currentWidth = getWidthInEm(currDigit);
        animate(
          internalRef.current,
          {
            y: [initialY, 0],
            width: [prevWidth, currentWidth],
          },
          (transitionConfig?.y ?? defaultTransitionConfig.y) as ValueAnimationOptions,
        );

        // Single variant: add opacity crossfade (prev fades out, current fades in)
        if (isSingleVariant) {
          const opacityTransition = (transitionConfig?.opacity ??
            defaultTransitionConfig.opacity) as ValueAnimationOptions;

          if (singleVariantPrevDigitRef.current) {
            animate(singleVariantPrevDigitRef.current, { opacity: [1, 0] }, opacityTransition);
          }
          if (singleVariantCurrentDigitRef.current) {
            animate(singleVariantCurrentDigitRef.current, { opacity: [0, 1] }, opacityTransition);
          }
        }

        prevValue.current = value;
      }, [isSingleVariant, transitionConfig, value, direction]);

      const renderDigit = useCallback(
        (digit: number) => (
          <span
            key={digit}
            ref={(r) => void (numberRefs.current[digit] = r)}
            className={digitSpanCss}
          >
            {digit}
          </span>
        ),
        [],
      );

      // Use direction prop for single variant positioning
      const isGoingUp = direction === 'up';
      const isGoingDown = direction === 'down';

      // Every: render all digits above/below current (shows every intermediate digit during animation)
      // Single: render only the previous digit in the appropriate section (direct transition)
      const showTopSection = isSingleVariant ? isGoingUp : value !== 0;
      const showBottomSection = isSingleVariant ? isGoingDown : value !== 9;

      const topDigits = isSingleVariant
        ? renderDigit(prevValue.current)
        : new Array(value).fill(null).map((_, i) => renderDigit(i));

      const bottomDigits = isSingleVariant
        ? renderDigit(prevValue.current)
        : new Array(9 - value).fill(null).map((_, i) => renderDigit(value + i + 1));

      return (
        <RollingNumberMaskComponent>
          <MotionText
            ref={internalRef}
            className={cx(digitContainerCss, className, classNames?.root, classNames?.text)}
            color={color}
            style={{ ...style, ...styles?.root, ...styles?.text }}
            {...props}
          >
            {showTopSection && (
              <span
                ref={isSingleVariant ? singleVariantPrevDigitRef : undefined}
                className={cx(digitNonActiveCss, topNonActiveCss)}
              >
                {topDigits}
              </span>
            )}
            <span ref={isSingleVariant ? singleVariantCurrentDigitRef : undefined}>
              {renderDigit(value)}
            </span>
            {showBottomSection && (
              <span
                ref={isSingleVariant ? singleVariantPrevDigitRef : undefined}
                className={cx(digitNonActiveCss, bottomNonActiveCss)}
              >
                {bottomDigits}
              </span>
            )}
          </MotionText>
        </RollingNumberMaskComponent>
      );
    },
  ),
)`,computed:!0}},RollingNumberSymbolComponent:{required:!1,tsType:{name:"ReactFC",raw:"React.FC<RollingNumberSymbolProps>",elements:[{name:"intersection",raw:`TextProps<TextDefaultElement> & {
  /**
   * Literal symbol rendered within the number stream.
   */
  value: string;
  styles?: {
    /** Symbol container element */
    root?: React.CSSProperties;
    /** Symbol text element */
    text?: React.CSSProperties;
  };
  classNames?: {
    /** Symbol container element */
    root?: string;
    /** Symbol text element */
    text?: string;
  };
  /**
   * Ref forwarded to the symbol container element.
   */
  ref?: React.Ref<HTMLSpanElement>;
}`,elements:[{name:"Polymorphic.Props",elements:[{name:"textDefaultElement"},{name:"Polymorphic.ExtendableProps",elements:[{name:"intersection",raw:`StyleProps &
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
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]},{name:"signature",type:"object",raw:`{
  numberOfLines?: number;
  disabled?: boolean;
  /**
   * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
   * @default false
   */
  tabularNumbers?: boolean;
  /**
   * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
   * @default false
   */
  slashedZero?: boolean;
  /**
   * Set text decoration to underline.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
   * @default false
   */
  underline?: boolean;
  /**
   * Use monospace font family.
   */
  mono?: boolean;
  /**
   * Set text to be in a single line.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
   * @default false
   */
  noWrap?: boolean;
  /**
   * Set overflow behavior.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
   */
  overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetColor?: string;
  /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
  renderEmptyNode?: boolean;
}`,signature:{properties:[{key:"numberOfLines",value:{name:"number",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"tabularNumbers",value:{name:"boolean",required:!1},description:`Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
@default false`},{key:"slashedZero",value:{name:"boolean",required:!1},description:`Use character for number zero with a slash through it to differentiate it from the letter 'O'.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
@default false`},{key:"underline",value:{name:"boolean",required:!1},description:`Set text decoration to underline.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
@default false`},{key:"mono",value:{name:"boolean",required:!1},description:"Use monospace font family."},{key:"noWrap",value:{name:"boolean",required:!1},description:`Set text to be in a single line.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
@default false`},{key:"overflow",value:{name:"union",raw:"'truncate' | 'clip' | 'wrap' | 'break'",elements:[{name:"literal",value:"'truncate'"},{name:"literal",value:"'clip'"},{name:"literal",value:"'wrap'"},{name:"literal",value:"'break'"}],required:!1},description:`Set overflow behavior.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)`},{key:"dangerouslySetColor",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."},{key:"renderEmptyNode",value:{name:"boolean",required:!1},description:"@deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS."}]}}],raw:`Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    numberOfLines?: number;
    disabled?: boolean;
    /**
     * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
     * @default false
     */
    tabularNumbers?: boolean;
    /**
     * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
     * @default false
     */
    slashedZero?: boolean;
    /**
     * Set text decoration to underline.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
     * @default false
     */
    underline?: boolean;
    /**
     * Use monospace font family.
     */
    mono?: boolean;
    /**
     * Set text to be in a single line.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
     * @default false
     */
    noWrap?: boolean;
    /**
     * Set overflow behavior.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
     */
    overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
    /** @danger This is a migration escape hatch. It is not intended to be used normally. */
    dangerouslySetColor?: string;
    /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
    renderEmptyNode?: boolean;
  }
>`}],raw:`Polymorphic.Props<
  AsComponent,
  TextBaseProps
>`},{name:"signature",type:"object",raw:`{
  /**
   * Literal symbol rendered within the number stream.
   */
  value: string;
  styles?: {
    /** Symbol container element */
    root?: React.CSSProperties;
    /** Symbol text element */
    text?: React.CSSProperties;
  };
  classNames?: {
    /** Symbol container element */
    root?: string;
    /** Symbol text element */
    text?: string;
  };
  /**
   * Ref forwarded to the symbol container element.
   */
  ref?: React.Ref<HTMLSpanElement>;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0},description:"Literal symbol rendered within the number stream."},{key:"styles",value:{name:"signature",type:"object",raw:`{
  /** Symbol container element */
  root?: React.CSSProperties;
  /** Symbol text element */
  text?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Symbol container element"},{key:"text",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Symbol text element"}]},required:!1}},{key:"classNames",value:{name:"signature",type:"object",raw:`{
  /** Symbol container element */
  root?: string;
  /** Symbol text element */
  text?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1},description:"Symbol container element"},{key:"text",value:{name:"string",required:!1},description:"Symbol text element"}]},required:!1}},{key:"ref",value:{name:"ReactRef",raw:"React.Ref<HTMLSpanElement>",elements:[{name:"HTMLSpanElement"}],required:!1},description:"Ref forwarded to the symbol container element."}]}}]}]},description:"Component used to render non-digit symbols within the section.",defaultValue:{value:`memo(
  forwardRef<HTMLSpanElement, RollingNumberSymbolProps>(
    ({ value, color = 'inherit', className, style, styles, classNames, ...props }, ref) => {
      return (
        <MotionText
          ref={ref}
          className={cx(containerCss, className, classNames?.root, classNames?.text)}
          color={color}
          style={{ ...style, ...styles?.root, ...styles?.text }}
          {...props}
        >
          {value}
        </MotionText>
      );
    },
  ),
)`,computed:!0}},RollingNumberMaskComponent:{required:!1,tsType:{name:"ReactFC",raw:"React.FC<RollingNumberMaskProps>",elements:[{name:"intersection",raw:`TextProps<TextDefaultElement> & {
  /**
   * Content rendered inside the mask container.
   */
  children?: React.ReactNode;
  /**
   * Ref forwarded to the mask element.
   */
  ref?: React.Ref<HTMLSpanElement>;
}`,elements:[{name:"Polymorphic.Props",elements:[{name:"textDefaultElement"},{name:"Polymorphic.ExtendableProps",elements:[{name:"intersection",raw:`StyleProps &
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
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]},{name:"signature",type:"object",raw:`{
  numberOfLines?: number;
  disabled?: boolean;
  /**
   * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
   * @default false
   */
  tabularNumbers?: boolean;
  /**
   * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
   * @default false
   */
  slashedZero?: boolean;
  /**
   * Set text decoration to underline.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
   * @default false
   */
  underline?: boolean;
  /**
   * Use monospace font family.
   */
  mono?: boolean;
  /**
   * Set text to be in a single line.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
   * @default false
   */
  noWrap?: boolean;
  /**
   * Set overflow behavior.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
   */
  overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetColor?: string;
  /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
  renderEmptyNode?: boolean;
}`,signature:{properties:[{key:"numberOfLines",value:{name:"number",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"tabularNumbers",value:{name:"boolean",required:!1},description:`Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
@default false`},{key:"slashedZero",value:{name:"boolean",required:!1},description:`Use character for number zero with a slash through it to differentiate it from the letter 'O'.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
@default false`},{key:"underline",value:{name:"boolean",required:!1},description:`Set text decoration to underline.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
@default false`},{key:"mono",value:{name:"boolean",required:!1},description:"Use monospace font family."},{key:"noWrap",value:{name:"boolean",required:!1},description:`Set text to be in a single line.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
@default false`},{key:"overflow",value:{name:"union",raw:"'truncate' | 'clip' | 'wrap' | 'break'",elements:[{name:"literal",value:"'truncate'"},{name:"literal",value:"'clip'"},{name:"literal",value:"'wrap'"},{name:"literal",value:"'break'"}],required:!1},description:`Set overflow behavior.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)`},{key:"dangerouslySetColor",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."},{key:"renderEmptyNode",value:{name:"boolean",required:!1},description:"@deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS."}]}}],raw:`Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    numberOfLines?: number;
    disabled?: boolean;
    /**
     * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
     * @default false
     */
    tabularNumbers?: boolean;
    /**
     * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
     * @default false
     */
    slashedZero?: boolean;
    /**
     * Set text decoration to underline.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
     * @default false
     */
    underline?: boolean;
    /**
     * Use monospace font family.
     */
    mono?: boolean;
    /**
     * Set text to be in a single line.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
     * @default false
     */
    noWrap?: boolean;
    /**
     * Set overflow behavior.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
     */
    overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
    /** @danger This is a migration escape hatch. It is not intended to be used normally. */
    dangerouslySetColor?: string;
    /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
    renderEmptyNode?: boolean;
  }
>`}],raw:`Polymorphic.Props<
  AsComponent,
  TextBaseProps
>`},{name:"signature",type:"object",raw:`{
  /**
   * Content rendered inside the mask container.
   */
  children?: React.ReactNode;
  /**
   * Ref forwarded to the mask element.
   */
  ref?: React.Ref<HTMLSpanElement>;
}`,signature:{properties:[{key:"children",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"Content rendered inside the mask container."},{key:"ref",value:{name:"ReactRef",raw:"React.Ref<HTMLSpanElement>",elements:[{name:"HTMLSpanElement"}],required:!1},description:"Ref forwarded to the mask element."}]}}]}]},description:"Component used to mask and animate digit transitions.",defaultValue:{value:`memo(
  forwardRef<HTMLSpanElement, RollingNumberMaskProps>(
    ({ children, color = 'inherit', className, ...props }, ref) => (
      <MotionText ref={ref} className={cx(maskCss, className)} color={color} {...props}>
        {children}
      </MotionText>
    ),
  ),
)`,computed:!0}},formattedValue:{required:!1,tsType:{name:"string"},description:"Preformatted string rendered instead of intlNumberParts when provided."},transitionConfig:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /**
   * Transition applied to the vertical translation animation (digit roll).
   */
  y?: Transition;
  /**
   * Transition applied to the opacity animation during digit transitions.
   * Controls how digits fade in/out during the single variant animation.
   */
  opacity?: Transition;
  /**
   * Transition applied to the color interpolation animation (color pulse).
   */
  color?: Transition;
}`,signature:{properties:[{key:"y",value:{name:"Transition",required:!1},description:"Transition applied to the vertical translation animation (digit roll)."},{key:"opacity",value:{name:"Transition",required:!1},description:`Transition applied to the opacity animation during digit transitions.
Controls how digits fade in/out during the single variant animation.`},{key:"color",value:{name:"Transition",required:!1},description:"Transition applied to the color interpolation animation (color pulse)."}]}},description:"Transition overrides applied to digit and symbol animations."},digitTransitionVariant:{required:!1,tsType:{name:"union",raw:"'every' | 'single'",elements:[{name:"literal",value:"'every'"},{name:"literal",value:"'single'"}]},description:`Style of digit transition animation.
@default 'every'`},direction:{required:!1,tsType:{name:"union",raw:"'up' | 'down'",elements:[{name:"literal",value:"'up'"},{name:"literal",value:"'down'"}]},description:"Direction of the roll animation. Only used when {@link digitTransitionVariant} is `'single'`."},styles:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /** Value section container element */
  root?: React.CSSProperties;
  /** Text element within the section */
  text?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Value section container element"},{key:"text",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Text element within the section"}]}},description:""},classNames:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /** Value section container element */
  root?: string;
  /** Text element within the section */
  text?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1},description:"Value section container element"},{key:"text",value:{name:"string",required:!1},description:"Text element within the section"}]}},description:""},ref:{required:!1,tsType:{name:"ReactRef",raw:"React.Ref<HTMLSpanElement>",elements:[{name:"HTMLSpanElement"}]},description:"Ref forwarded to the section container element."},color:{defaultValue:{value:"'inherit'",computed:!1},required:!1},justifyContent:{defaultValue:{value:"'flex-start'",computed:!1},required:!1}}};function Ie({value:t,formatted:n,defaultColor:o,colorPulseOnUpdate:l,positivePulseColor:i,negativePulseColor:s}){const u=ge(),b=u.color[o],h=a.useRef(Number(t)),y=a.useRef(n),w=ke();return a.useEffect(()=>{if(!l||!b)return;const f=h.current,c=Number(t),m=!Number.isNaN(f)&&!Number.isNaN(c)&&f!==c&&y.current!==n,p=m?u.color[c>f?i:s]:void 0;m&&p&&w.start({color:[p,b]}),h.current=c,y.current=n},[t,l,i,s,w,b,u,n]),w}const We="tickerCss-t192w985",Oe="tickerContainerCss-t1c5f9cs",Le="screenReaderOnlyCss-sbgqgkj",$={y:{type:"spring",stiffness:280,damping:18,mass:.3},opacity:{duration:X.fast2/1e3,ease:Q.global},color:{duration:X.slow4/1e3,ease:Q.global}},je="span",Be=a.memo(a.forwardRef(({as:t,value:n,transition:o,color:l="fg",colorPulseOnUpdate:i,positivePulseColor:s="fgPositive",negativePulseColor:u="fgNegative",font:b="inherit",fontFamily:h=b,fontSize:y=b,fontWeight:w=b,lineHeight:f=y,locale:c,format:m,formattedValue:p,style:x,ariaLive:T="polite",prefix:S,suffix:v,classNames:e,styles:r,enableSubscriptNotation:I,digitTransitionVariant:D="every",RollingNumberMaskComponent:R=B,RollingNumberAffixSectionComponent:P=ie,RollingNumberValueSectionComponent:q=oe,RollingNumberDigitComponent:g=G,RollingNumberSymbolComponent:k=_,accessibilityLabel:z,tabularNumbers:E=!0,accessibilityLabelPrefix:W,accessibilityLabelSuffix:O,...V},L)=>{const re=t??je,{locale:se}=fe(),K=c??se,C=a.useMemo(()=>({...$,...o}),[o]),j=a.useMemo(()=>new Ae({value:n,format:m,locale:K}),[n,m,K]),H=a.useMemo(()=>p??j.format(),[p,j]),N=Ce(n),le=Ie({value:n,defaultColor:l,colorPulseOnUpdate:!!i,positivePulseColor:s,negativePulseColor:u,formatted:H}),de=a.useMemo(()=>({...x,...r?.root}),[x,r?.root]),ce=a.useMemo(()=>d.jsx(P,{className:e?.prefix,classNames:{text:e?.text},justifyContent:"flex-end",style:r?.prefix,styles:{text:r?.text},children:S}),[P,e?.prefix,e?.text,r?.prefix,r?.text,S]),be=a.useMemo(()=>d.jsx(P,{className:e?.suffix,classNames:{text:e?.text},justifyContent:"flex-start",style:r?.suffix,styles:{text:r?.text},children:v}),[P,e?.suffix,e?.text,r?.suffix,r?.text,v]),me=a.useMemo(()=>{const{pre:Y,integer:J,fraction:F,post:he}=j.formatToParts({enableSubscriptNotation:I});return d.jsxs(ve,{className:e?.formattedValueSection,display:"inline-flex",style:r?.formattedValueSection,children:[d.jsx(q,{RollingNumberDigitComponent:g,RollingNumberMaskComponent:R,RollingNumberSymbolComponent:k,className:e?.i18nPrefix,classNames:{text:e?.text},digitTransitionVariant:D,direction:N,intlNumberParts:Y,justifyContent:"flex-end",style:r?.i18nPrefix,styles:{text:r?.text},transitionConfig:C}),d.jsx(q,{RollingNumberDigitComponent:g,RollingNumberMaskComponent:R,RollingNumberSymbolComponent:k,className:e?.integer,classNames:{text:e?.text},digitTransitionVariant:D,direction:N,intlNumberParts:J,justifyContent:"flex-end",style:r?.integer,styles:{text:r?.text},transitionConfig:C}),d.jsx(q,{RollingNumberDigitComponent:g,RollingNumberMaskComponent:R,RollingNumberSymbolComponent:k,className:e?.fraction,classNames:{text:e?.text},digitTransitionVariant:D,direction:N,intlNumberParts:F,justifyContent:"flex-start",style:r?.fraction,styles:{text:r?.text},transitionConfig:C}),d.jsx(q,{RollingNumberDigitComponent:g,RollingNumberMaskComponent:R,RollingNumberSymbolComponent:k,className:e?.i18nSuffix,classNames:{text:e?.text},digitTransitionVariant:D,direction:N,intlNumberParts:he,justifyContent:"flex-start",style:r?.i18nSuffix,styles:{text:r?.text},transitionConfig:C})]})},[j,I,e?.formattedValueSection,e?.i18nPrefix,e?.integer,e?.fraction,e?.i18nSuffix,r?.formattedValueSection,r?.i18nPrefix,r?.integer,r?.fraction,r?.i18nSuffix,q,R,g,k,C,D,N,r?.text,e?.text]),pe=a.useMemo(()=>d.jsx(q,{RollingNumberDigitComponent:g,RollingNumberMaskComponent:R,RollingNumberSymbolComponent:k,className:e?.formattedValueSection,classNames:{text:e?.text},digitTransitionVariant:D,direction:N,formattedValue:p,intlNumberParts:[],justifyContent:"flex-start",style:r?.formattedValueSection,styles:{text:r?.text},transitionConfig:C}),[e?.formattedValueSection,r?.formattedValueSection,e?.text,r?.text,q,g,k,p,R,C,D,N]),ue=a.useMemo(()=>{const F=`${typeof S=="string"?S:""}${H}${typeof v=="string"?v:""}`;return d.jsx("span",{"aria-atomic":"true","aria-live":T,className:Le,children:`
            ${W??""}
            ${z??F}
            ${O??""}
            `})},[T,W,S,z,H,v,O]);return d.jsxs(U,{ref:L,as:re,className:A(Oe,e?.root),color:l,font:b,fontFamily:h,fontSize:y,fontWeight:w,lineHeight:f,role:T==="assertive"?"alert":"status",style:de,tabularNumbers:E,...V,children:[ue,d.jsxs(M.span,{"aria-hidden":!0,animate:le,className:A(We,e?.visibleContent),style:r?.visibleContent,transition:C,children:[ce,p?pe:me,be]})]})}));Be.__docgenInfo={description:"",methods:[],displayName:"RollingNumber",props:{testID:{required:!1,tsType:{name:"string"},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`},value:{required:!0,tsType:{name:"number"},description:"Number to display."},format:{required:!1,tsType:{name:"intersection",raw:`Omit<Intl.NumberFormatOptions, 'notation'> & {
  notation?: Extract<Intl.NumberFormatOptions['notation'], 'standard' | 'compact'>;
}`,elements:[{name:"Omit",elements:[{name:"Intl.NumberFormatOptions"},{name:"literal",value:"'notation'"}],raw:"Omit<Intl.NumberFormatOptions, 'notation'>"},{name:"signature",type:"object",raw:`{
  notation?: Extract<Intl.NumberFormatOptions['notation'], 'standard' | 'compact'>;
}`,signature:{properties:[{key:"notation",value:{name:"Extract",elements:[{name:"Intl.NumberFormatOptions['notation']",raw:"Intl.NumberFormatOptions['notation']"},{name:"union",raw:"'standard' | 'compact'",elements:[{name:"literal",value:"'standard'"},{name:"literal",value:"'compact'"}]}],raw:"Extract<Intl.NumberFormatOptions['notation'], 'standard' | 'compact'>",required:!1}}]}}]},description:"Intl.NumberFormat options applied when formatting the value. Scientific and engineering notation are not supported."},formattedValue:{required:!1,tsType:{name:"string"},description:"Preformatted value rendered instead of formatting {@link value}. {@link value} is still used to determine numeric deltas."},prefix:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Content rendered before the formatted value."},suffix:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Content rendered after the formatted value."},RollingNumberMaskComponent:{required:!1,tsType:{name:"ReactFC",raw:"React.FC<RollingNumberMaskProps>",elements:[{name:"intersection",raw:`TextProps<TextDefaultElement> & {
  /**
   * Content rendered inside the mask container.
   */
  children?: React.ReactNode;
  /**
   * Ref forwarded to the mask element.
   */
  ref?: React.Ref<HTMLSpanElement>;
}`,elements:[{name:"Polymorphic.Props",elements:[{name:"textDefaultElement"},{name:"Polymorphic.ExtendableProps",elements:[{name:"intersection",raw:`StyleProps &
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
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]},{name:"signature",type:"object",raw:`{
  numberOfLines?: number;
  disabled?: boolean;
  /**
   * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
   * @default false
   */
  tabularNumbers?: boolean;
  /**
   * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
   * @default false
   */
  slashedZero?: boolean;
  /**
   * Set text decoration to underline.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
   * @default false
   */
  underline?: boolean;
  /**
   * Use monospace font family.
   */
  mono?: boolean;
  /**
   * Set text to be in a single line.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
   * @default false
   */
  noWrap?: boolean;
  /**
   * Set overflow behavior.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
   */
  overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetColor?: string;
  /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
  renderEmptyNode?: boolean;
}`,signature:{properties:[{key:"numberOfLines",value:{name:"number",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"tabularNumbers",value:{name:"boolean",required:!1},description:`Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
@default false`},{key:"slashedZero",value:{name:"boolean",required:!1},description:`Use character for number zero with a slash through it to differentiate it from the letter 'O'.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
@default false`},{key:"underline",value:{name:"boolean",required:!1},description:`Set text decoration to underline.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
@default false`},{key:"mono",value:{name:"boolean",required:!1},description:"Use monospace font family."},{key:"noWrap",value:{name:"boolean",required:!1},description:`Set text to be in a single line.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
@default false`},{key:"overflow",value:{name:"union",raw:"'truncate' | 'clip' | 'wrap' | 'break'",elements:[{name:"literal",value:"'truncate'"},{name:"literal",value:"'clip'"},{name:"literal",value:"'wrap'"},{name:"literal",value:"'break'"}],required:!1},description:`Set overflow behavior.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)`},{key:"dangerouslySetColor",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."},{key:"renderEmptyNode",value:{name:"boolean",required:!1},description:"@deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS."}]}}],raw:`Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    numberOfLines?: number;
    disabled?: boolean;
    /**
     * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
     * @default false
     */
    tabularNumbers?: boolean;
    /**
     * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
     * @default false
     */
    slashedZero?: boolean;
    /**
     * Set text decoration to underline.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
     * @default false
     */
    underline?: boolean;
    /**
     * Use monospace font family.
     */
    mono?: boolean;
    /**
     * Set text to be in a single line.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
     * @default false
     */
    noWrap?: boolean;
    /**
     * Set overflow behavior.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
     */
    overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
    /** @danger This is a migration escape hatch. It is not intended to be used normally. */
    dangerouslySetColor?: string;
    /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
    renderEmptyNode?: boolean;
  }
>`}],raw:`Polymorphic.Props<
  AsComponent,
  TextBaseProps
>`},{name:"signature",type:"object",raw:`{
  /**
   * Content rendered inside the mask container.
   */
  children?: React.ReactNode;
  /**
   * Ref forwarded to the mask element.
   */
  ref?: React.Ref<HTMLSpanElement>;
}`,signature:{properties:[{key:"children",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"Content rendered inside the mask container."},{key:"ref",value:{name:"ReactRef",raw:"React.Ref<HTMLSpanElement>",elements:[{name:"HTMLSpanElement"}],required:!1},description:"Ref forwarded to the mask element."}]}}]}]},description:"Component used to render the mask container.",defaultValue:{value:`memo(
  forwardRef<HTMLSpanElement, RollingNumberMaskProps>(
    ({ children, color = 'inherit', className, ...props }, ref) => (
      <MotionText ref={ref} className={cx(maskCss, className)} color={color} {...props}>
        {children}
      </MotionText>
    ),
  ),
)`,computed:!0}},RollingNumberAffixSectionComponent:{required:!1,tsType:{name:"ReactFC",raw:"React.FC<RollingNumberAffixSectionProps>",elements:[{name:"intersection",raw:`TextProps<TextDefaultElement> & {
  /**
   * Content rendered inside the affix section.
   */
  children?: React.ReactNode;
  /**
   * Ref forwarded to the affix section wrapper element.
   */
  ref?: React.Ref<HTMLSpanElement>;
  styles?: {
    /** Affix section container element */
    root?: React.CSSProperties;
    /** Text element within the section */
    text?: React.CSSProperties;
  };
  classNames?: {
    /** Affix section container element */
    root?: string;
    /** Text element within the section */
    text?: string;
  };
}`,elements:[{name:"Polymorphic.Props",elements:[{name:"textDefaultElement"},{name:"Polymorphic.ExtendableProps",elements:[{name:"intersection",raw:`StyleProps &
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
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]},{name:"signature",type:"object",raw:`{
  numberOfLines?: number;
  disabled?: boolean;
  /**
   * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
   * @default false
   */
  tabularNumbers?: boolean;
  /**
   * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
   * @default false
   */
  slashedZero?: boolean;
  /**
   * Set text decoration to underline.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
   * @default false
   */
  underline?: boolean;
  /**
   * Use monospace font family.
   */
  mono?: boolean;
  /**
   * Set text to be in a single line.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
   * @default false
   */
  noWrap?: boolean;
  /**
   * Set overflow behavior.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
   */
  overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetColor?: string;
  /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
  renderEmptyNode?: boolean;
}`,signature:{properties:[{key:"numberOfLines",value:{name:"number",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"tabularNumbers",value:{name:"boolean",required:!1},description:`Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
@default false`},{key:"slashedZero",value:{name:"boolean",required:!1},description:`Use character for number zero with a slash through it to differentiate it from the letter 'O'.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
@default false`},{key:"underline",value:{name:"boolean",required:!1},description:`Set text decoration to underline.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
@default false`},{key:"mono",value:{name:"boolean",required:!1},description:"Use monospace font family."},{key:"noWrap",value:{name:"boolean",required:!1},description:`Set text to be in a single line.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
@default false`},{key:"overflow",value:{name:"union",raw:"'truncate' | 'clip' | 'wrap' | 'break'",elements:[{name:"literal",value:"'truncate'"},{name:"literal",value:"'clip'"},{name:"literal",value:"'wrap'"},{name:"literal",value:"'break'"}],required:!1},description:`Set overflow behavior.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)`},{key:"dangerouslySetColor",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."},{key:"renderEmptyNode",value:{name:"boolean",required:!1},description:"@deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS."}]}}],raw:`Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    numberOfLines?: number;
    disabled?: boolean;
    /**
     * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
     * @default false
     */
    tabularNumbers?: boolean;
    /**
     * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
     * @default false
     */
    slashedZero?: boolean;
    /**
     * Set text decoration to underline.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
     * @default false
     */
    underline?: boolean;
    /**
     * Use monospace font family.
     */
    mono?: boolean;
    /**
     * Set text to be in a single line.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
     * @default false
     */
    noWrap?: boolean;
    /**
     * Set overflow behavior.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
     */
    overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
    /** @danger This is a migration escape hatch. It is not intended to be used normally. */
    dangerouslySetColor?: string;
    /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
    renderEmptyNode?: boolean;
  }
>`}],raw:`Polymorphic.Props<
  AsComponent,
  TextBaseProps
>`},{name:"signature",type:"object",raw:`{
  /**
   * Content rendered inside the affix section.
   */
  children?: React.ReactNode;
  /**
   * Ref forwarded to the affix section wrapper element.
   */
  ref?: React.Ref<HTMLSpanElement>;
  styles?: {
    /** Affix section container element */
    root?: React.CSSProperties;
    /** Text element within the section */
    text?: React.CSSProperties;
  };
  classNames?: {
    /** Affix section container element */
    root?: string;
    /** Text element within the section */
    text?: string;
  };
}`,signature:{properties:[{key:"children",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"Content rendered inside the affix section."},{key:"ref",value:{name:"ReactRef",raw:"React.Ref<HTMLSpanElement>",elements:[{name:"HTMLSpanElement"}],required:!1},description:"Ref forwarded to the affix section wrapper element."},{key:"styles",value:{name:"signature",type:"object",raw:`{
  /** Affix section container element */
  root?: React.CSSProperties;
  /** Text element within the section */
  text?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Affix section container element"},{key:"text",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Text element within the section"}]},required:!1}},{key:"classNames",value:{name:"signature",type:"object",raw:`{
  /** Affix section container element */
  root?: string;
  /** Text element within the section */
  text?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1},description:"Affix section container element"},{key:"text",value:{name:"string",required:!1},description:"Text element within the section"}]},required:!1}}]}}]}]},description:"Component used to render prefix and suffix sections.",defaultValue:{value:`memo(
  forwardRef<HTMLSpanElement, RollingNumberAffixSectionProps>(
    (
      {
        children,
        color = 'inherit',
        justifyContent = 'flex-start',
        className,
        styles,
        style,
        classNames,
        ...props
      },
      ref,
    ) => {
      return (
        <MotionText
          ref={ref}
          className={cx(containerCss, className, classNames?.root, classNames?.text)}
          color={color}
          justifyContent={justifyContent}
          style={{ ...style, ...styles?.root, ...styles?.text }}
          {...props}
        >
          {children}
        </MotionText>
      );
    },
  ),
)`,computed:!0}},RollingNumberValueSectionComponent:{required:!1,tsType:{name:"ReactFC",raw:"React.FC<RollingNumberValueSectionProps>",elements:[{name:"intersection",raw:`TextProps<TextDefaultElement> & {
  /**
   * Parts provided by Intl.NumberFormat used to render the formatted value.
   */
  intlNumberParts: KeyedNumberPart[];
  /**
   * Component used to render numeric digits within the section.
   */
  RollingNumberDigitComponent?: RollingNumberDigitComponent;
  /**
   * Component used to render non-digit symbols within the section.
   */
  RollingNumberSymbolComponent?: RollingNumberSymbolComponent;
  /**
   * Component used to mask and animate digit transitions.
   */
  RollingNumberMaskComponent?: RollingNumberMaskComponent;
  /**
   * Preformatted string rendered instead of intlNumberParts when provided.
   */
  formattedValue?: string;
  /**
   * Transition overrides applied to digit and symbol animations.
   */
  transitionConfig?: RollingNumberTransitionConfig;
  /**
   * Style of digit transition animation.
   * @default 'every'
   */
  digitTransitionVariant?: DigitTransitionVariant;
  /**
   * Direction of the roll animation. Only used when {@link digitTransitionVariant} is \`'single'\`.
   */
  direction?: SingleDirection;
  styles?: {
    /** Value section container element */
    root?: React.CSSProperties;
    /** Text element within the section */
    text?: React.CSSProperties;
  };
  classNames?: {
    /** Value section container element */
    root?: string;
    /** Text element within the section */
    text?: string;
  };
  /**
   * Ref forwarded to the section container element.
   */
  ref?: React.Ref<HTMLSpanElement>;
}`,elements:[{name:"Polymorphic.Props",elements:[{name:"textDefaultElement"},{name:"Polymorphic.ExtendableProps",elements:[{name:"intersection",raw:`StyleProps &
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
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]},{name:"signature",type:"object",raw:`{
  numberOfLines?: number;
  disabled?: boolean;
  /**
   * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
   * @default false
   */
  tabularNumbers?: boolean;
  /**
   * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
   * @default false
   */
  slashedZero?: boolean;
  /**
   * Set text decoration to underline.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
   * @default false
   */
  underline?: boolean;
  /**
   * Use monospace font family.
   */
  mono?: boolean;
  /**
   * Set text to be in a single line.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
   * @default false
   */
  noWrap?: boolean;
  /**
   * Set overflow behavior.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
   */
  overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetColor?: string;
  /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
  renderEmptyNode?: boolean;
}`,signature:{properties:[{key:"numberOfLines",value:{name:"number",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"tabularNumbers",value:{name:"boolean",required:!1},description:`Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
@default false`},{key:"slashedZero",value:{name:"boolean",required:!1},description:`Use character for number zero with a slash through it to differentiate it from the letter 'O'.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
@default false`},{key:"underline",value:{name:"boolean",required:!1},description:`Set text decoration to underline.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
@default false`},{key:"mono",value:{name:"boolean",required:!1},description:"Use monospace font family."},{key:"noWrap",value:{name:"boolean",required:!1},description:`Set text to be in a single line.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
@default false`},{key:"overflow",value:{name:"union",raw:"'truncate' | 'clip' | 'wrap' | 'break'",elements:[{name:"literal",value:"'truncate'"},{name:"literal",value:"'clip'"},{name:"literal",value:"'wrap'"},{name:"literal",value:"'break'"}],required:!1},description:`Set overflow behavior.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)`},{key:"dangerouslySetColor",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."},{key:"renderEmptyNode",value:{name:"boolean",required:!1},description:"@deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS."}]}}],raw:`Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    numberOfLines?: number;
    disabled?: boolean;
    /**
     * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
     * @default false
     */
    tabularNumbers?: boolean;
    /**
     * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
     * @default false
     */
    slashedZero?: boolean;
    /**
     * Set text decoration to underline.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
     * @default false
     */
    underline?: boolean;
    /**
     * Use monospace font family.
     */
    mono?: boolean;
    /**
     * Set text to be in a single line.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
     * @default false
     */
    noWrap?: boolean;
    /**
     * Set overflow behavior.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
     */
    overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
    /** @danger This is a migration escape hatch. It is not intended to be used normally. */
    dangerouslySetColor?: string;
    /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
    renderEmptyNode?: boolean;
  }
>`}],raw:`Polymorphic.Props<
  AsComponent,
  TextBaseProps
>`},{name:"signature",type:"object",raw:`{
  /**
   * Parts provided by Intl.NumberFormat used to render the formatted value.
   */
  intlNumberParts: KeyedNumberPart[];
  /**
   * Component used to render numeric digits within the section.
   */
  RollingNumberDigitComponent?: RollingNumberDigitComponent;
  /**
   * Component used to render non-digit symbols within the section.
   */
  RollingNumberSymbolComponent?: RollingNumberSymbolComponent;
  /**
   * Component used to mask and animate digit transitions.
   */
  RollingNumberMaskComponent?: RollingNumberMaskComponent;
  /**
   * Preformatted string rendered instead of intlNumberParts when provided.
   */
  formattedValue?: string;
  /**
   * Transition overrides applied to digit and symbol animations.
   */
  transitionConfig?: RollingNumberTransitionConfig;
  /**
   * Style of digit transition animation.
   * @default 'every'
   */
  digitTransitionVariant?: DigitTransitionVariant;
  /**
   * Direction of the roll animation. Only used when {@link digitTransitionVariant} is \`'single'\`.
   */
  direction?: SingleDirection;
  styles?: {
    /** Value section container element */
    root?: React.CSSProperties;
    /** Text element within the section */
    text?: React.CSSProperties;
  };
  classNames?: {
    /** Value section container element */
    root?: string;
    /** Text element within the section */
    text?: string;
  };
  /**
   * Ref forwarded to the section container element.
   */
  ref?: React.Ref<HTMLSpanElement>;
}`,signature:{properties:[{key:"intlNumberParts",value:{name:"Array",elements:[{name:"intersection",raw:"{ key: string } & NumberPart",elements:[{name:"signature",type:"object",raw:"{ key: string }",signature:{properties:[{key:"key",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:"{ type: string; value: number | string }",signature:{properties:[{key:"type",value:{name:"string",required:!0}},{key:"value",value:{name:"union",raw:"number | string",elements:[{name:"number"},{name:"string"}],required:!0}}]}}]}],raw:"KeyedNumberPart[]",required:!0},description:"Parts provided by Intl.NumberFormat used to render the formatted value."},{key:"RollingNumberDigitComponent",value:{name:"ReactFC",raw:"React.FC<RollingNumberDigitProps>",elements:[{name:"intersection",raw:`TextProps<TextDefaultElement> & {
  /**
   * Digit currently displayed in the animated column.
   */
  value: number;
  /**
   * Digit displayed during the initial render.
   */
  initialValue?: number;
  /**
   * Transition overrides applied to the digit animation.
   */
  transitionConfig?: RollingNumberTransitionConfig;
  /**
   * Component used to mask the digit column.
   */
  RollingNumberMaskComponent?: RollingNumberMaskComponent;
  /**
   * Style of digit transition animation.
   * @default 'every'
   */
  digitTransitionVariant?: DigitTransitionVariant;
  /**
   * Direction of the roll animation. Only used when {@link digitTransitionVariant} is \`'single'\`.
   */
  direction?: SingleDirection;
  styles?: {
    /** Digit container element */
    root?: React.CSSProperties;
    /** Digit text element */
    text?: React.CSSProperties;
  };
  classNames?: {
    /** Digit container element */
    root?: string;
    /** Digit text element */
    text?: string;
  };
  /**
   * Ref forwarded to the digit container element.
   */
  ref?: React.Ref<HTMLSpanElement>;
}`,elements:[{name:"Polymorphic.Props",elements:[{name:"textDefaultElement"},{name:"Polymorphic.ExtendableProps",elements:[{name:"intersection",raw:`StyleProps &
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
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]},{name:"signature",type:"object",raw:`{
  numberOfLines?: number;
  disabled?: boolean;
  /**
   * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
   * @default false
   */
  tabularNumbers?: boolean;
  /**
   * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
   * @default false
   */
  slashedZero?: boolean;
  /**
   * Set text decoration to underline.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
   * @default false
   */
  underline?: boolean;
  /**
   * Use monospace font family.
   */
  mono?: boolean;
  /**
   * Set text to be in a single line.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
   * @default false
   */
  noWrap?: boolean;
  /**
   * Set overflow behavior.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
   */
  overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetColor?: string;
  /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
  renderEmptyNode?: boolean;
}`,signature:{properties:[{key:"numberOfLines",value:{name:"number",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"tabularNumbers",value:{name:"boolean",required:!1},description:`Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
@default false`},{key:"slashedZero",value:{name:"boolean",required:!1},description:`Use character for number zero with a slash through it to differentiate it from the letter 'O'.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
@default false`},{key:"underline",value:{name:"boolean",required:!1},description:`Set text decoration to underline.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
@default false`},{key:"mono",value:{name:"boolean",required:!1},description:"Use monospace font family."},{key:"noWrap",value:{name:"boolean",required:!1},description:`Set text to be in a single line.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
@default false`},{key:"overflow",value:{name:"union",raw:"'truncate' | 'clip' | 'wrap' | 'break'",elements:[{name:"literal",value:"'truncate'"},{name:"literal",value:"'clip'"},{name:"literal",value:"'wrap'"},{name:"literal",value:"'break'"}],required:!1},description:`Set overflow behavior.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)`},{key:"dangerouslySetColor",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."},{key:"renderEmptyNode",value:{name:"boolean",required:!1},description:"@deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS."}]}}],raw:`Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    numberOfLines?: number;
    disabled?: boolean;
    /**
     * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
     * @default false
     */
    tabularNumbers?: boolean;
    /**
     * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
     * @default false
     */
    slashedZero?: boolean;
    /**
     * Set text decoration to underline.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
     * @default false
     */
    underline?: boolean;
    /**
     * Use monospace font family.
     */
    mono?: boolean;
    /**
     * Set text to be in a single line.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
     * @default false
     */
    noWrap?: boolean;
    /**
     * Set overflow behavior.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
     */
    overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
    /** @danger This is a migration escape hatch. It is not intended to be used normally. */
    dangerouslySetColor?: string;
    /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
    renderEmptyNode?: boolean;
  }
>`}],raw:`Polymorphic.Props<
  AsComponent,
  TextBaseProps
>`},{name:"signature",type:"object",raw:`{
  /**
   * Digit currently displayed in the animated column.
   */
  value: number;
  /**
   * Digit displayed during the initial render.
   */
  initialValue?: number;
  /**
   * Transition overrides applied to the digit animation.
   */
  transitionConfig?: RollingNumberTransitionConfig;
  /**
   * Component used to mask the digit column.
   */
  RollingNumberMaskComponent?: RollingNumberMaskComponent;
  /**
   * Style of digit transition animation.
   * @default 'every'
   */
  digitTransitionVariant?: DigitTransitionVariant;
  /**
   * Direction of the roll animation. Only used when {@link digitTransitionVariant} is \`'single'\`.
   */
  direction?: SingleDirection;
  styles?: {
    /** Digit container element */
    root?: React.CSSProperties;
    /** Digit text element */
    text?: React.CSSProperties;
  };
  classNames?: {
    /** Digit container element */
    root?: string;
    /** Digit text element */
    text?: string;
  };
  /**
   * Ref forwarded to the digit container element.
   */
  ref?: React.Ref<HTMLSpanElement>;
}`,signature:{properties:[{key:"value",value:{name:"number",required:!0},description:"Digit currently displayed in the animated column."},{key:"initialValue",value:{name:"number",required:!1},description:"Digit displayed during the initial render."},{key:"transitionConfig",value:{name:"signature",type:"object",raw:`{
  /**
   * Transition applied to the vertical translation animation (digit roll).
   */
  y?: Transition;
  /**
   * Transition applied to the opacity animation during digit transitions.
   * Controls how digits fade in/out during the single variant animation.
   */
  opacity?: Transition;
  /**
   * Transition applied to the color interpolation animation (color pulse).
   */
  color?: Transition;
}`,signature:{properties:[{key:"y",value:{name:"Transition",required:!1},description:"Transition applied to the vertical translation animation (digit roll)."},{key:"opacity",value:{name:"Transition",required:!1},description:`Transition applied to the opacity animation during digit transitions.
Controls how digits fade in/out during the single variant animation.`},{key:"color",value:{name:"Transition",required:!1},description:"Transition applied to the color interpolation animation (color pulse)."}]},required:!1},description:"Transition overrides applied to the digit animation."},{key:"RollingNumberMaskComponent",value:{name:"ReactFC",raw:"React.FC<RollingNumberMaskProps>",elements:[{name:"intersection",raw:`TextProps<TextDefaultElement> & {
  /**
   * Content rendered inside the mask container.
   */
  children?: React.ReactNode;
  /**
   * Ref forwarded to the mask element.
   */
  ref?: React.Ref<HTMLSpanElement>;
}`,elements:[{name:"Polymorphic.Props",elements:[{name:"textDefaultElement"},{name:"Polymorphic.ExtendableProps",elements:[{name:"intersection",raw:`StyleProps &
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
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]},{name:"signature",type:"object",raw:`{
  numberOfLines?: number;
  disabled?: boolean;
  /**
   * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
   * @default false
   */
  tabularNumbers?: boolean;
  /**
   * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
   * @default false
   */
  slashedZero?: boolean;
  /**
   * Set text decoration to underline.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
   * @default false
   */
  underline?: boolean;
  /**
   * Use monospace font family.
   */
  mono?: boolean;
  /**
   * Set text to be in a single line.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
   * @default false
   */
  noWrap?: boolean;
  /**
   * Set overflow behavior.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
   */
  overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetColor?: string;
  /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
  renderEmptyNode?: boolean;
}`,signature:{properties:[{key:"numberOfLines",value:{name:"number",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"tabularNumbers",value:{name:"boolean",required:!1},description:`Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
@default false`},{key:"slashedZero",value:{name:"boolean",required:!1},description:`Use character for number zero with a slash through it to differentiate it from the letter 'O'.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
@default false`},{key:"underline",value:{name:"boolean",required:!1},description:`Set text decoration to underline.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
@default false`},{key:"mono",value:{name:"boolean",required:!1},description:"Use monospace font family."},{key:"noWrap",value:{name:"boolean",required:!1},description:`Set text to be in a single line.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
@default false`},{key:"overflow",value:{name:"union",raw:"'truncate' | 'clip' | 'wrap' | 'break'",elements:[{name:"literal",value:"'truncate'"},{name:"literal",value:"'clip'"},{name:"literal",value:"'wrap'"},{name:"literal",value:"'break'"}],required:!1},description:`Set overflow behavior.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)`},{key:"dangerouslySetColor",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."},{key:"renderEmptyNode",value:{name:"boolean",required:!1},description:"@deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS."}]}}],raw:`Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    numberOfLines?: number;
    disabled?: boolean;
    /**
     * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
     * @default false
     */
    tabularNumbers?: boolean;
    /**
     * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
     * @default false
     */
    slashedZero?: boolean;
    /**
     * Set text decoration to underline.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
     * @default false
     */
    underline?: boolean;
    /**
     * Use monospace font family.
     */
    mono?: boolean;
    /**
     * Set text to be in a single line.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
     * @default false
     */
    noWrap?: boolean;
    /**
     * Set overflow behavior.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
     */
    overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
    /** @danger This is a migration escape hatch. It is not intended to be used normally. */
    dangerouslySetColor?: string;
    /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
    renderEmptyNode?: boolean;
  }
>`}],raw:`Polymorphic.Props<
  AsComponent,
  TextBaseProps
>`},{name:"signature",type:"object",raw:`{
  /**
   * Content rendered inside the mask container.
   */
  children?: React.ReactNode;
  /**
   * Ref forwarded to the mask element.
   */
  ref?: React.Ref<HTMLSpanElement>;
}`,signature:{properties:[{key:"children",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"Content rendered inside the mask container."},{key:"ref",value:{name:"ReactRef",raw:"React.Ref<HTMLSpanElement>",elements:[{name:"HTMLSpanElement"}],required:!1},description:"Ref forwarded to the mask element."}]}}]}],required:!1},description:"Component used to mask the digit column."},{key:"digitTransitionVariant",value:{name:"union",raw:"'every' | 'single'",elements:[{name:"literal",value:"'every'"},{name:"literal",value:"'single'"}],required:!1},description:`Style of digit transition animation.
@default 'every'`},{key:"direction",value:{name:"union",raw:"'up' | 'down'",elements:[{name:"literal",value:"'up'"},{name:"literal",value:"'down'"}],required:!1},description:"Direction of the roll animation. Only used when {@link digitTransitionVariant} is `'single'`."},{key:"styles",value:{name:"signature",type:"object",raw:`{
  /** Digit container element */
  root?: React.CSSProperties;
  /** Digit text element */
  text?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Digit container element"},{key:"text",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Digit text element"}]},required:!1}},{key:"classNames",value:{name:"signature",type:"object",raw:`{
  /** Digit container element */
  root?: string;
  /** Digit text element */
  text?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1},description:"Digit container element"},{key:"text",value:{name:"string",required:!1},description:"Digit text element"}]},required:!1}},{key:"ref",value:{name:"ReactRef",raw:"React.Ref<HTMLSpanElement>",elements:[{name:"HTMLSpanElement"}],required:!1},description:"Ref forwarded to the digit container element."}]}}]}],required:!1},description:"Component used to render numeric digits within the section."},{key:"RollingNumberSymbolComponent",value:{name:"ReactFC",raw:"React.FC<RollingNumberSymbolProps>",elements:[{name:"intersection",raw:`TextProps<TextDefaultElement> & {
  /**
   * Literal symbol rendered within the number stream.
   */
  value: string;
  styles?: {
    /** Symbol container element */
    root?: React.CSSProperties;
    /** Symbol text element */
    text?: React.CSSProperties;
  };
  classNames?: {
    /** Symbol container element */
    root?: string;
    /** Symbol text element */
    text?: string;
  };
  /**
   * Ref forwarded to the symbol container element.
   */
  ref?: React.Ref<HTMLSpanElement>;
}`,elements:[{name:"Polymorphic.Props",elements:[{name:"textDefaultElement"},{name:"Polymorphic.ExtendableProps",elements:[{name:"intersection",raw:`StyleProps &
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
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]},{name:"signature",type:"object",raw:`{
  numberOfLines?: number;
  disabled?: boolean;
  /**
   * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
   * @default false
   */
  tabularNumbers?: boolean;
  /**
   * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
   * @default false
   */
  slashedZero?: boolean;
  /**
   * Set text decoration to underline.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
   * @default false
   */
  underline?: boolean;
  /**
   * Use monospace font family.
   */
  mono?: boolean;
  /**
   * Set text to be in a single line.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
   * @default false
   */
  noWrap?: boolean;
  /**
   * Set overflow behavior.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
   */
  overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetColor?: string;
  /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
  renderEmptyNode?: boolean;
}`,signature:{properties:[{key:"numberOfLines",value:{name:"number",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"tabularNumbers",value:{name:"boolean",required:!1},description:`Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
@default false`},{key:"slashedZero",value:{name:"boolean",required:!1},description:`Use character for number zero with a slash through it to differentiate it from the letter 'O'.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
@default false`},{key:"underline",value:{name:"boolean",required:!1},description:`Set text decoration to underline.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
@default false`},{key:"mono",value:{name:"boolean",required:!1},description:"Use monospace font family."},{key:"noWrap",value:{name:"boolean",required:!1},description:`Set text to be in a single line.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
@default false`},{key:"overflow",value:{name:"union",raw:"'truncate' | 'clip' | 'wrap' | 'break'",elements:[{name:"literal",value:"'truncate'"},{name:"literal",value:"'clip'"},{name:"literal",value:"'wrap'"},{name:"literal",value:"'break'"}],required:!1},description:`Set overflow behavior.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)`},{key:"dangerouslySetColor",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."},{key:"renderEmptyNode",value:{name:"boolean",required:!1},description:"@deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS."}]}}],raw:`Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    numberOfLines?: number;
    disabled?: boolean;
    /**
     * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
     * @default false
     */
    tabularNumbers?: boolean;
    /**
     * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
     * @default false
     */
    slashedZero?: boolean;
    /**
     * Set text decoration to underline.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
     * @default false
     */
    underline?: boolean;
    /**
     * Use monospace font family.
     */
    mono?: boolean;
    /**
     * Set text to be in a single line.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
     * @default false
     */
    noWrap?: boolean;
    /**
     * Set overflow behavior.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
     */
    overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
    /** @danger This is a migration escape hatch. It is not intended to be used normally. */
    dangerouslySetColor?: string;
    /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
    renderEmptyNode?: boolean;
  }
>`}],raw:`Polymorphic.Props<
  AsComponent,
  TextBaseProps
>`},{name:"signature",type:"object",raw:`{
  /**
   * Literal symbol rendered within the number stream.
   */
  value: string;
  styles?: {
    /** Symbol container element */
    root?: React.CSSProperties;
    /** Symbol text element */
    text?: React.CSSProperties;
  };
  classNames?: {
    /** Symbol container element */
    root?: string;
    /** Symbol text element */
    text?: string;
  };
  /**
   * Ref forwarded to the symbol container element.
   */
  ref?: React.Ref<HTMLSpanElement>;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0},description:"Literal symbol rendered within the number stream."},{key:"styles",value:{name:"signature",type:"object",raw:`{
  /** Symbol container element */
  root?: React.CSSProperties;
  /** Symbol text element */
  text?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Symbol container element"},{key:"text",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Symbol text element"}]},required:!1}},{key:"classNames",value:{name:"signature",type:"object",raw:`{
  /** Symbol container element */
  root?: string;
  /** Symbol text element */
  text?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1},description:"Symbol container element"},{key:"text",value:{name:"string",required:!1},description:"Symbol text element"}]},required:!1}},{key:"ref",value:{name:"ReactRef",raw:"React.Ref<HTMLSpanElement>",elements:[{name:"HTMLSpanElement"}],required:!1},description:"Ref forwarded to the symbol container element."}]}}]}],required:!1},description:"Component used to render non-digit symbols within the section."},{key:"RollingNumberMaskComponent",value:{name:"ReactFC",raw:"React.FC<RollingNumberMaskProps>",elements:[{name:"intersection",raw:`TextProps<TextDefaultElement> & {
  /**
   * Content rendered inside the mask container.
   */
  children?: React.ReactNode;
  /**
   * Ref forwarded to the mask element.
   */
  ref?: React.Ref<HTMLSpanElement>;
}`,elements:[{name:"Polymorphic.Props",elements:[{name:"textDefaultElement"},{name:"Polymorphic.ExtendableProps",elements:[{name:"intersection",raw:`StyleProps &
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
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]},{name:"signature",type:"object",raw:`{
  numberOfLines?: number;
  disabled?: boolean;
  /**
   * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
   * @default false
   */
  tabularNumbers?: boolean;
  /**
   * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
   * @default false
   */
  slashedZero?: boolean;
  /**
   * Set text decoration to underline.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
   * @default false
   */
  underline?: boolean;
  /**
   * Use monospace font family.
   */
  mono?: boolean;
  /**
   * Set text to be in a single line.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
   * @default false
   */
  noWrap?: boolean;
  /**
   * Set overflow behavior.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
   */
  overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetColor?: string;
  /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
  renderEmptyNode?: boolean;
}`,signature:{properties:[{key:"numberOfLines",value:{name:"number",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"tabularNumbers",value:{name:"boolean",required:!1},description:`Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
@default false`},{key:"slashedZero",value:{name:"boolean",required:!1},description:`Use character for number zero with a slash through it to differentiate it from the letter 'O'.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
@default false`},{key:"underline",value:{name:"boolean",required:!1},description:`Set text decoration to underline.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
@default false`},{key:"mono",value:{name:"boolean",required:!1},description:"Use monospace font family."},{key:"noWrap",value:{name:"boolean",required:!1},description:`Set text to be in a single line.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
@default false`},{key:"overflow",value:{name:"union",raw:"'truncate' | 'clip' | 'wrap' | 'break'",elements:[{name:"literal",value:"'truncate'"},{name:"literal",value:"'clip'"},{name:"literal",value:"'wrap'"},{name:"literal",value:"'break'"}],required:!1},description:`Set overflow behavior.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)`},{key:"dangerouslySetColor",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."},{key:"renderEmptyNode",value:{name:"boolean",required:!1},description:"@deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS."}]}}],raw:`Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    numberOfLines?: number;
    disabled?: boolean;
    /**
     * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
     * @default false
     */
    tabularNumbers?: boolean;
    /**
     * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
     * @default false
     */
    slashedZero?: boolean;
    /**
     * Set text decoration to underline.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
     * @default false
     */
    underline?: boolean;
    /**
     * Use monospace font family.
     */
    mono?: boolean;
    /**
     * Set text to be in a single line.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
     * @default false
     */
    noWrap?: boolean;
    /**
     * Set overflow behavior.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
     */
    overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
    /** @danger This is a migration escape hatch. It is not intended to be used normally. */
    dangerouslySetColor?: string;
    /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
    renderEmptyNode?: boolean;
  }
>`}],raw:`Polymorphic.Props<
  AsComponent,
  TextBaseProps
>`},{name:"signature",type:"object",raw:`{
  /**
   * Content rendered inside the mask container.
   */
  children?: React.ReactNode;
  /**
   * Ref forwarded to the mask element.
   */
  ref?: React.Ref<HTMLSpanElement>;
}`,signature:{properties:[{key:"children",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"Content rendered inside the mask container."},{key:"ref",value:{name:"ReactRef",raw:"React.Ref<HTMLSpanElement>",elements:[{name:"HTMLSpanElement"}],required:!1},description:"Ref forwarded to the mask element."}]}}]}],required:!1},description:"Component used to mask and animate digit transitions."},{key:"formattedValue",value:{name:"string",required:!1},description:"Preformatted string rendered instead of intlNumberParts when provided."},{key:"transitionConfig",value:{name:"signature",type:"object",raw:`{
  /**
   * Transition applied to the vertical translation animation (digit roll).
   */
  y?: Transition;
  /**
   * Transition applied to the opacity animation during digit transitions.
   * Controls how digits fade in/out during the single variant animation.
   */
  opacity?: Transition;
  /**
   * Transition applied to the color interpolation animation (color pulse).
   */
  color?: Transition;
}`,signature:{properties:[{key:"y",value:{name:"Transition",required:!1},description:"Transition applied to the vertical translation animation (digit roll)."},{key:"opacity",value:{name:"Transition",required:!1},description:`Transition applied to the opacity animation during digit transitions.
Controls how digits fade in/out during the single variant animation.`},{key:"color",value:{name:"Transition",required:!1},description:"Transition applied to the color interpolation animation (color pulse)."}]},required:!1},description:"Transition overrides applied to digit and symbol animations."},{key:"digitTransitionVariant",value:{name:"union",raw:"'every' | 'single'",elements:[{name:"literal",value:"'every'"},{name:"literal",value:"'single'"}],required:!1},description:`Style of digit transition animation.
@default 'every'`},{key:"direction",value:{name:"union",raw:"'up' | 'down'",elements:[{name:"literal",value:"'up'"},{name:"literal",value:"'down'"}],required:!1},description:"Direction of the roll animation. Only used when {@link digitTransitionVariant} is `'single'`."},{key:"styles",value:{name:"signature",type:"object",raw:`{
  /** Value section container element */
  root?: React.CSSProperties;
  /** Text element within the section */
  text?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Value section container element"},{key:"text",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Text element within the section"}]},required:!1}},{key:"classNames",value:{name:"signature",type:"object",raw:`{
  /** Value section container element */
  root?: string;
  /** Text element within the section */
  text?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1},description:"Value section container element"},{key:"text",value:{name:"string",required:!1},description:"Text element within the section"}]},required:!1}},{key:"ref",value:{name:"ReactRef",raw:"React.Ref<HTMLSpanElement>",elements:[{name:"HTMLSpanElement"}],required:!1},description:"Ref forwarded to the section container element."}]}}]}]},description:"Component used to render the numeric sections.",defaultValue:{value:`memo(
  forwardRef<HTMLSpanElement, RollingNumberValueSectionProps>(
    (
      {
        intlNumberParts,
        color = 'inherit',
        justifyContent = 'flex-start',
        className,
        RollingNumberDigitComponent = DefaultRollingNumberDigit,
        RollingNumberSymbolComponent = DefaultRollingNumberSymbol,
        RollingNumberMaskComponent = DefaultRollingNumberMask,
        formattedValue,
        transitionConfig,
        digitTransitionVariant,
        direction,
        styles,
        classNames,
        style,
        ...props
      },
      ref,
    ) => {
      const hasMounted = useHasMounted();

      const intlPartsDigits = useMemo(
        () =>
          intlNumberParts.map((part) =>
            (part.type !== 'integer' && part.type !== 'fraction') ||
            typeof part.value !== 'number' ? (
              <RollingNumberSymbolComponent
                key={part.type === 'literal' ? \`\${part.key}:\${part.value}\` : part.key}
                classNames={{ text: classNames?.text }}
                justifyContent={justifyContent}
                styles={{ text: styles?.text }}
                value={String(part.value)}
              />
            ) : (
              <RollingNumberDigitComponent
                key={part.key}
                RollingNumberMaskComponent={RollingNumberMaskComponent}
                classNames={{ text: classNames?.text }}
                digitTransitionVariant={digitTransitionVariant}
                direction={direction}
                initialValue={hasMounted ? 0 : undefined}
                styles={{ text: styles?.text }}
                transitionConfig={transitionConfig}
                value={part.value}
              />
            ),
          ),
        [
          intlNumberParts,
          RollingNumberSymbolComponent,
          justifyContent,
          RollingNumberDigitComponent,
          hasMounted,
          transitionConfig,
          digitTransitionVariant,
          direction,
          RollingNumberMaskComponent,
          styles?.text,
          classNames?.text,
        ],
      );

      const formattedValueDigits = useMemo(
        () =>
          formattedValue
            ?.split('')
            .map((char, index) =>
              isDigit(char) ? (
                <RollingNumberDigitComponent
                  key={index}
                  RollingNumberMaskComponent={RollingNumberMaskComponent}
                  classNames={{ text: classNames?.text }}
                  digitTransitionVariant={digitTransitionVariant}
                  direction={direction}
                  initialValue={hasMounted ? 0 : undefined}
                  styles={{ text: styles?.text }}
                  transitionConfig={transitionConfig}
                  value={parseInt(char)}
                />
              ) : (
                <RollingNumberSymbolComponent
                  key={index}
                  classNames={{ text: classNames?.text }}
                  justifyContent={justifyContent}
                  styles={{ text: styles?.text }}
                  value={char}
                />
              ),
            ),
        [
          RollingNumberDigitComponent,
          RollingNumberSymbolComponent,
          formattedValue,
          hasMounted,
          justifyContent,
          RollingNumberMaskComponent,
          transitionConfig,
          digitTransitionVariant,
          direction,
          styles?.text,
          classNames?.text,
        ],
      );

      return (
        <MotionText
          ref={ref}
          className={cx(containerCss, className, classNames?.root, classNames?.text)}
          color={color}
          justifyContent={justifyContent}
          style={{ ...style, ...styles?.root, ...styles?.text }}
          {...props}
        >
          {formattedValue ? formattedValueDigits : intlPartsDigits}
        </MotionText>
      );
    },
  ),
)`,computed:!0}},RollingNumberDigitComponent:{required:!1,tsType:{name:"ReactFC",raw:"React.FC<RollingNumberDigitProps>",elements:[{name:"intersection",raw:`TextProps<TextDefaultElement> & {
  /**
   * Digit currently displayed in the animated column.
   */
  value: number;
  /**
   * Digit displayed during the initial render.
   */
  initialValue?: number;
  /**
   * Transition overrides applied to the digit animation.
   */
  transitionConfig?: RollingNumberTransitionConfig;
  /**
   * Component used to mask the digit column.
   */
  RollingNumberMaskComponent?: RollingNumberMaskComponent;
  /**
   * Style of digit transition animation.
   * @default 'every'
   */
  digitTransitionVariant?: DigitTransitionVariant;
  /**
   * Direction of the roll animation. Only used when {@link digitTransitionVariant} is \`'single'\`.
   */
  direction?: SingleDirection;
  styles?: {
    /** Digit container element */
    root?: React.CSSProperties;
    /** Digit text element */
    text?: React.CSSProperties;
  };
  classNames?: {
    /** Digit container element */
    root?: string;
    /** Digit text element */
    text?: string;
  };
  /**
   * Ref forwarded to the digit container element.
   */
  ref?: React.Ref<HTMLSpanElement>;
}`,elements:[{name:"Polymorphic.Props",elements:[{name:"textDefaultElement"},{name:"Polymorphic.ExtendableProps",elements:[{name:"intersection",raw:`StyleProps &
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
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]},{name:"signature",type:"object",raw:`{
  numberOfLines?: number;
  disabled?: boolean;
  /**
   * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
   * @default false
   */
  tabularNumbers?: boolean;
  /**
   * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
   * @default false
   */
  slashedZero?: boolean;
  /**
   * Set text decoration to underline.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
   * @default false
   */
  underline?: boolean;
  /**
   * Use monospace font family.
   */
  mono?: boolean;
  /**
   * Set text to be in a single line.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
   * @default false
   */
  noWrap?: boolean;
  /**
   * Set overflow behavior.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
   */
  overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetColor?: string;
  /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
  renderEmptyNode?: boolean;
}`,signature:{properties:[{key:"numberOfLines",value:{name:"number",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"tabularNumbers",value:{name:"boolean",required:!1},description:`Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
@default false`},{key:"slashedZero",value:{name:"boolean",required:!1},description:`Use character for number zero with a slash through it to differentiate it from the letter 'O'.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
@default false`},{key:"underline",value:{name:"boolean",required:!1},description:`Set text decoration to underline.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
@default false`},{key:"mono",value:{name:"boolean",required:!1},description:"Use monospace font family."},{key:"noWrap",value:{name:"boolean",required:!1},description:`Set text to be in a single line.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
@default false`},{key:"overflow",value:{name:"union",raw:"'truncate' | 'clip' | 'wrap' | 'break'",elements:[{name:"literal",value:"'truncate'"},{name:"literal",value:"'clip'"},{name:"literal",value:"'wrap'"},{name:"literal",value:"'break'"}],required:!1},description:`Set overflow behavior.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)`},{key:"dangerouslySetColor",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."},{key:"renderEmptyNode",value:{name:"boolean",required:!1},description:"@deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS."}]}}],raw:`Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    numberOfLines?: number;
    disabled?: boolean;
    /**
     * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
     * @default false
     */
    tabularNumbers?: boolean;
    /**
     * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
     * @default false
     */
    slashedZero?: boolean;
    /**
     * Set text decoration to underline.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
     * @default false
     */
    underline?: boolean;
    /**
     * Use monospace font family.
     */
    mono?: boolean;
    /**
     * Set text to be in a single line.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
     * @default false
     */
    noWrap?: boolean;
    /**
     * Set overflow behavior.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
     */
    overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
    /** @danger This is a migration escape hatch. It is not intended to be used normally. */
    dangerouslySetColor?: string;
    /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
    renderEmptyNode?: boolean;
  }
>`}],raw:`Polymorphic.Props<
  AsComponent,
  TextBaseProps
>`},{name:"signature",type:"object",raw:`{
  /**
   * Digit currently displayed in the animated column.
   */
  value: number;
  /**
   * Digit displayed during the initial render.
   */
  initialValue?: number;
  /**
   * Transition overrides applied to the digit animation.
   */
  transitionConfig?: RollingNumberTransitionConfig;
  /**
   * Component used to mask the digit column.
   */
  RollingNumberMaskComponent?: RollingNumberMaskComponent;
  /**
   * Style of digit transition animation.
   * @default 'every'
   */
  digitTransitionVariant?: DigitTransitionVariant;
  /**
   * Direction of the roll animation. Only used when {@link digitTransitionVariant} is \`'single'\`.
   */
  direction?: SingleDirection;
  styles?: {
    /** Digit container element */
    root?: React.CSSProperties;
    /** Digit text element */
    text?: React.CSSProperties;
  };
  classNames?: {
    /** Digit container element */
    root?: string;
    /** Digit text element */
    text?: string;
  };
  /**
   * Ref forwarded to the digit container element.
   */
  ref?: React.Ref<HTMLSpanElement>;
}`,signature:{properties:[{key:"value",value:{name:"number",required:!0},description:"Digit currently displayed in the animated column."},{key:"initialValue",value:{name:"number",required:!1},description:"Digit displayed during the initial render."},{key:"transitionConfig",value:{name:"signature",type:"object",raw:`{
  /**
   * Transition applied to the vertical translation animation (digit roll).
   */
  y?: Transition;
  /**
   * Transition applied to the opacity animation during digit transitions.
   * Controls how digits fade in/out during the single variant animation.
   */
  opacity?: Transition;
  /**
   * Transition applied to the color interpolation animation (color pulse).
   */
  color?: Transition;
}`,signature:{properties:[{key:"y",value:{name:"Transition",required:!1},description:"Transition applied to the vertical translation animation (digit roll)."},{key:"opacity",value:{name:"Transition",required:!1},description:`Transition applied to the opacity animation during digit transitions.
Controls how digits fade in/out during the single variant animation.`},{key:"color",value:{name:"Transition",required:!1},description:"Transition applied to the color interpolation animation (color pulse)."}]},required:!1},description:"Transition overrides applied to the digit animation."},{key:"RollingNumberMaskComponent",value:{name:"ReactFC",raw:"React.FC<RollingNumberMaskProps>",elements:[{name:"intersection",raw:`TextProps<TextDefaultElement> & {
  /**
   * Content rendered inside the mask container.
   */
  children?: React.ReactNode;
  /**
   * Ref forwarded to the mask element.
   */
  ref?: React.Ref<HTMLSpanElement>;
}`,elements:[{name:"Polymorphic.Props",elements:[{name:"textDefaultElement"},{name:"Polymorphic.ExtendableProps",elements:[{name:"intersection",raw:`StyleProps &
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
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]},{name:"signature",type:"object",raw:`{
  numberOfLines?: number;
  disabled?: boolean;
  /**
   * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
   * @default false
   */
  tabularNumbers?: boolean;
  /**
   * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
   * @default false
   */
  slashedZero?: boolean;
  /**
   * Set text decoration to underline.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
   * @default false
   */
  underline?: boolean;
  /**
   * Use monospace font family.
   */
  mono?: boolean;
  /**
   * Set text to be in a single line.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
   * @default false
   */
  noWrap?: boolean;
  /**
   * Set overflow behavior.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
   */
  overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetColor?: string;
  /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
  renderEmptyNode?: boolean;
}`,signature:{properties:[{key:"numberOfLines",value:{name:"number",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"tabularNumbers",value:{name:"boolean",required:!1},description:`Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
@default false`},{key:"slashedZero",value:{name:"boolean",required:!1},description:`Use character for number zero with a slash through it to differentiate it from the letter 'O'.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
@default false`},{key:"underline",value:{name:"boolean",required:!1},description:`Set text decoration to underline.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
@default false`},{key:"mono",value:{name:"boolean",required:!1},description:"Use monospace font family."},{key:"noWrap",value:{name:"boolean",required:!1},description:`Set text to be in a single line.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
@default false`},{key:"overflow",value:{name:"union",raw:"'truncate' | 'clip' | 'wrap' | 'break'",elements:[{name:"literal",value:"'truncate'"},{name:"literal",value:"'clip'"},{name:"literal",value:"'wrap'"},{name:"literal",value:"'break'"}],required:!1},description:`Set overflow behavior.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)`},{key:"dangerouslySetColor",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."},{key:"renderEmptyNode",value:{name:"boolean",required:!1},description:"@deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS."}]}}],raw:`Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    numberOfLines?: number;
    disabled?: boolean;
    /**
     * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
     * @default false
     */
    tabularNumbers?: boolean;
    /**
     * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
     * @default false
     */
    slashedZero?: boolean;
    /**
     * Set text decoration to underline.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
     * @default false
     */
    underline?: boolean;
    /**
     * Use monospace font family.
     */
    mono?: boolean;
    /**
     * Set text to be in a single line.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
     * @default false
     */
    noWrap?: boolean;
    /**
     * Set overflow behavior.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
     */
    overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
    /** @danger This is a migration escape hatch. It is not intended to be used normally. */
    dangerouslySetColor?: string;
    /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
    renderEmptyNode?: boolean;
  }
>`}],raw:`Polymorphic.Props<
  AsComponent,
  TextBaseProps
>`},{name:"signature",type:"object",raw:`{
  /**
   * Content rendered inside the mask container.
   */
  children?: React.ReactNode;
  /**
   * Ref forwarded to the mask element.
   */
  ref?: React.Ref<HTMLSpanElement>;
}`,signature:{properties:[{key:"children",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"Content rendered inside the mask container."},{key:"ref",value:{name:"ReactRef",raw:"React.Ref<HTMLSpanElement>",elements:[{name:"HTMLSpanElement"}],required:!1},description:"Ref forwarded to the mask element."}]}}]}],required:!1},description:"Component used to mask the digit column."},{key:"digitTransitionVariant",value:{name:"union",raw:"'every' | 'single'",elements:[{name:"literal",value:"'every'"},{name:"literal",value:"'single'"}],required:!1},description:`Style of digit transition animation.
@default 'every'`},{key:"direction",value:{name:"union",raw:"'up' | 'down'",elements:[{name:"literal",value:"'up'"},{name:"literal",value:"'down'"}],required:!1},description:"Direction of the roll animation. Only used when {@link digitTransitionVariant} is `'single'`."},{key:"styles",value:{name:"signature",type:"object",raw:`{
  /** Digit container element */
  root?: React.CSSProperties;
  /** Digit text element */
  text?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Digit container element"},{key:"text",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Digit text element"}]},required:!1}},{key:"classNames",value:{name:"signature",type:"object",raw:`{
  /** Digit container element */
  root?: string;
  /** Digit text element */
  text?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1},description:"Digit container element"},{key:"text",value:{name:"string",required:!1},description:"Digit text element"}]},required:!1}},{key:"ref",value:{name:"ReactRef",raw:"React.Ref<HTMLSpanElement>",elements:[{name:"HTMLSpanElement"}],required:!1},description:"Ref forwarded to the digit container element."}]}}]}]},description:"Component used to render individual digits.",defaultValue:{value:`memo(
  forwardRef<HTMLSpanElement, RollingNumberDigitProps>(
    (
      {
        value,
        initialValue,
        transitionConfig,
        digitTransitionVariant = 'every',
        direction,
        RollingNumberMaskComponent = DefaultRollingNumberMask,
        color = 'inherit',
        className,
        styles,
        style,
        classNames,
        ...props
      },
      ref,
    ) => {
      const internalRef = useRef<HTMLSpanElement>(null);
      useImperativeHandle(ref, () => internalRef.current as HTMLSpanElement);

      const numberRefs = useRef(new Array<HTMLSpanElement | null>(10));
      const singleVariantPrevDigitRef = useRef<HTMLSpanElement>(null);
      const singleVariantCurrentDigitRef = useRef<HTMLSpanElement>(null);
      const prevValue = useRef(initialValue ?? value);

      const isSingleVariant = useMemo(
        () => digitTransitionVariant === 'single',
        [digitTransitionVariant],
      );

      useLayoutEffect(() => {
        const prevDigit = numberRefs.current[prevValue.current];
        const currDigit = numberRefs.current[value];
        if (!internalRef.current || !prevDigit || !currDigit || value === prevValue.current) return;

        const box = internalRef.current.getBoundingClientRect();
        // Every: distance based on numeric difference (rolls through every intermediate digit)
        // Single: distance is always 1 height (rolls directly to the new digit)
        const directionSign = direction === 'up' ? 1 : -1;
        const initialY = isSingleVariant
          ? box.height * directionSign
          : box.height * (value - prevValue.current);
        const prevWidth = getWidthInEm(prevDigit);
        const currentWidth = getWidthInEm(currDigit);
        animate(
          internalRef.current,
          {
            y: [initialY, 0],
            width: [prevWidth, currentWidth],
          },
          (transitionConfig?.y ?? defaultTransitionConfig.y) as ValueAnimationOptions,
        );

        // Single variant: add opacity crossfade (prev fades out, current fades in)
        if (isSingleVariant) {
          const opacityTransition = (transitionConfig?.opacity ??
            defaultTransitionConfig.opacity) as ValueAnimationOptions;

          if (singleVariantPrevDigitRef.current) {
            animate(singleVariantPrevDigitRef.current, { opacity: [1, 0] }, opacityTransition);
          }
          if (singleVariantCurrentDigitRef.current) {
            animate(singleVariantCurrentDigitRef.current, { opacity: [0, 1] }, opacityTransition);
          }
        }

        prevValue.current = value;
      }, [isSingleVariant, transitionConfig, value, direction]);

      const renderDigit = useCallback(
        (digit: number) => (
          <span
            key={digit}
            ref={(r) => void (numberRefs.current[digit] = r)}
            className={digitSpanCss}
          >
            {digit}
          </span>
        ),
        [],
      );

      // Use direction prop for single variant positioning
      const isGoingUp = direction === 'up';
      const isGoingDown = direction === 'down';

      // Every: render all digits above/below current (shows every intermediate digit during animation)
      // Single: render only the previous digit in the appropriate section (direct transition)
      const showTopSection = isSingleVariant ? isGoingUp : value !== 0;
      const showBottomSection = isSingleVariant ? isGoingDown : value !== 9;

      const topDigits = isSingleVariant
        ? renderDigit(prevValue.current)
        : new Array(value).fill(null).map((_, i) => renderDigit(i));

      const bottomDigits = isSingleVariant
        ? renderDigit(prevValue.current)
        : new Array(9 - value).fill(null).map((_, i) => renderDigit(value + i + 1));

      return (
        <RollingNumberMaskComponent>
          <MotionText
            ref={internalRef}
            className={cx(digitContainerCss, className, classNames?.root, classNames?.text)}
            color={color}
            style={{ ...style, ...styles?.root, ...styles?.text }}
            {...props}
          >
            {showTopSection && (
              <span
                ref={isSingleVariant ? singleVariantPrevDigitRef : undefined}
                className={cx(digitNonActiveCss, topNonActiveCss)}
              >
                {topDigits}
              </span>
            )}
            <span ref={isSingleVariant ? singleVariantCurrentDigitRef : undefined}>
              {renderDigit(value)}
            </span>
            {showBottomSection && (
              <span
                ref={isSingleVariant ? singleVariantPrevDigitRef : undefined}
                className={cx(digitNonActiveCss, bottomNonActiveCss)}
              >
                {bottomDigits}
              </span>
            )}
          </MotionText>
        </RollingNumberMaskComponent>
      );
    },
  ),
)`,computed:!0}},RollingNumberSymbolComponent:{required:!1,tsType:{name:"ReactFC",raw:"React.FC<RollingNumberSymbolProps>",elements:[{name:"intersection",raw:`TextProps<TextDefaultElement> & {
  /**
   * Literal symbol rendered within the number stream.
   */
  value: string;
  styles?: {
    /** Symbol container element */
    root?: React.CSSProperties;
    /** Symbol text element */
    text?: React.CSSProperties;
  };
  classNames?: {
    /** Symbol container element */
    root?: string;
    /** Symbol text element */
    text?: string;
  };
  /**
   * Ref forwarded to the symbol container element.
   */
  ref?: React.Ref<HTMLSpanElement>;
}`,elements:[{name:"Polymorphic.Props",elements:[{name:"textDefaultElement"},{name:"Polymorphic.ExtendableProps",elements:[{name:"intersection",raw:`StyleProps &
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
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]},{name:"signature",type:"object",raw:`{
  numberOfLines?: number;
  disabled?: boolean;
  /**
   * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
   * @default false
   */
  tabularNumbers?: boolean;
  /**
   * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
   * @default false
   */
  slashedZero?: boolean;
  /**
   * Set text decoration to underline.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
   * @default false
   */
  underline?: boolean;
  /**
   * Use monospace font family.
   */
  mono?: boolean;
  /**
   * Set text to be in a single line.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
   * @default false
   */
  noWrap?: boolean;
  /**
   * Set overflow behavior.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
   */
  overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetColor?: string;
  /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
  renderEmptyNode?: boolean;
}`,signature:{properties:[{key:"numberOfLines",value:{name:"number",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"tabularNumbers",value:{name:"boolean",required:!1},description:`Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
@default false`},{key:"slashedZero",value:{name:"boolean",required:!1},description:`Use character for number zero with a slash through it to differentiate it from the letter 'O'.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
@default false`},{key:"underline",value:{name:"boolean",required:!1},description:`Set text decoration to underline.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
@default false`},{key:"mono",value:{name:"boolean",required:!1},description:"Use monospace font family."},{key:"noWrap",value:{name:"boolean",required:!1},description:`Set text to be in a single line.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
@default false`},{key:"overflow",value:{name:"union",raw:"'truncate' | 'clip' | 'wrap' | 'break'",elements:[{name:"literal",value:"'truncate'"},{name:"literal",value:"'clip'"},{name:"literal",value:"'wrap'"},{name:"literal",value:"'break'"}],required:!1},description:`Set overflow behavior.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)`},{key:"dangerouslySetColor",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."},{key:"renderEmptyNode",value:{name:"boolean",required:!1},description:"@deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS."}]}}],raw:`Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    numberOfLines?: number;
    disabled?: boolean;
    /**
     * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
     * @default false
     */
    tabularNumbers?: boolean;
    /**
     * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
     * @default false
     */
    slashedZero?: boolean;
    /**
     * Set text decoration to underline.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
     * @default false
     */
    underline?: boolean;
    /**
     * Use monospace font family.
     */
    mono?: boolean;
    /**
     * Set text to be in a single line.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
     * @default false
     */
    noWrap?: boolean;
    /**
     * Set overflow behavior.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
     */
    overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
    /** @danger This is a migration escape hatch. It is not intended to be used normally. */
    dangerouslySetColor?: string;
    /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
    renderEmptyNode?: boolean;
  }
>`}],raw:`Polymorphic.Props<
  AsComponent,
  TextBaseProps
>`},{name:"signature",type:"object",raw:`{
  /**
   * Literal symbol rendered within the number stream.
   */
  value: string;
  styles?: {
    /** Symbol container element */
    root?: React.CSSProperties;
    /** Symbol text element */
    text?: React.CSSProperties;
  };
  classNames?: {
    /** Symbol container element */
    root?: string;
    /** Symbol text element */
    text?: string;
  };
  /**
   * Ref forwarded to the symbol container element.
   */
  ref?: React.Ref<HTMLSpanElement>;
}`,signature:{properties:[{key:"value",value:{name:"string",required:!0},description:"Literal symbol rendered within the number stream."},{key:"styles",value:{name:"signature",type:"object",raw:`{
  /** Symbol container element */
  root?: React.CSSProperties;
  /** Symbol text element */
  text?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Symbol container element"},{key:"text",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Symbol text element"}]},required:!1}},{key:"classNames",value:{name:"signature",type:"object",raw:`{
  /** Symbol container element */
  root?: string;
  /** Symbol text element */
  text?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1},description:"Symbol container element"},{key:"text",value:{name:"string",required:!1},description:"Symbol text element"}]},required:!1}},{key:"ref",value:{name:"ReactRef",raw:"React.Ref<HTMLSpanElement>",elements:[{name:"HTMLSpanElement"}],required:!1},description:"Ref forwarded to the symbol container element."}]}}]}]},description:"Component used to render separators and other symbols.",defaultValue:{value:`memo(
  forwardRef<HTMLSpanElement, RollingNumberSymbolProps>(
    ({ value, color = 'inherit', className, style, styles, classNames, ...props }, ref) => {
      return (
        <MotionText
          ref={ref}
          className={cx(containerCss, className, classNames?.root, classNames?.text)}
          color={color}
          style={{ ...style, ...styles?.root, ...styles?.text }}
          {...props}
        >
          {value}
        </MotionText>
      );
    },
  ),
)`,computed:!0}},locale:{required:!1,tsType:{name:"Intl.LocalesArgument"},description:"Locale used for formatting. Defaults to the locale from {@link LocaleProvider}."},color:{required:!1,tsType:{name:"ThemeVars.Color"},description:`Base text color token. When {@link colorPulseOnUpdate} is true, the color briefly pulses to a positive or negative mid color before returning to this base color.
@default 'fg'`,defaultValue:{value:"'fg'",computed:!1}},colorPulseOnUpdate:{required:!1,tsType:{name:"boolean"},description:"Enables color pulsing on positive or negative changes."},positivePulseColor:{required:!1,tsType:{name:"ThemeVars.Color"},description:`Color token used for positive numeric changes.
@default 'fgPositive'`,defaultValue:{value:"'fgPositive'",computed:!1}},negativePulseColor:{required:!1,tsType:{name:"ThemeVars.Color"},description:`Color token used for negative numeric changes.
@default 'fgNegative'`,defaultValue:{value:"'fgNegative'",computed:!1}},enableSubscriptNotation:{required:!1,tsType:{name:"boolean"},description:"Enables subscript notation for leading zeros in the fractional part (for example, {@code 0.00009 => 0.0₄9})."},transition:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /**
   * Transition applied to the vertical translation animation (digit roll).
   */
  y?: Transition;
  /**
   * Transition applied to the opacity animation during digit transitions.
   * Controls how digits fade in/out during the single variant animation.
   */
  opacity?: Transition;
  /**
   * Transition applied to the color interpolation animation (color pulse).
   */
  color?: Transition;
}`,signature:{properties:[{key:"y",value:{name:"Transition",required:!1},description:"Transition applied to the vertical translation animation (digit roll)."},{key:"opacity",value:{name:"Transition",required:!1},description:`Transition applied to the opacity animation during digit transitions.
Controls how digits fade in/out during the single variant animation.`},{key:"color",value:{name:"Transition",required:!1},description:"Transition applied to the color interpolation animation (color pulse)."}]}},description:"Framer Motion transition overrides. Supports per-property overrides for {@code y} and {@code color} only."},digitTransitionVariant:{required:!1,tsType:{name:"union",raw:"'every' | 'single'",elements:[{name:"literal",value:"'every'"},{name:"literal",value:"'single'"}]},description:"Style of digit transition animation.\n- `'every'`: Rolls through every intermediate digit (e.g., 1→2→3→...→9).\n- `'single'`: Rolls directly to the new digit without showing intermediates (e.g., 1→9).\n@default 'every'",defaultValue:{value:"'every'",computed:!1}},accessibilityLabelPrefix:{required:!1,tsType:{name:"string"},description:"Accessibility label prefix announced before the value."},accessibilityLabelSuffix:{required:!1,tsType:{name:"string"},description:"Accessibility label suffix announced after the value."},ariaLive:{required:!1,tsType:{name:"ReactAriaAttributes['aria-live']",raw:"React.AriaAttributes['aria-live']"},description:`aria-live politeness level.
@default 'polite'`,defaultValue:{value:"'polite'",computed:!1}},tabularNumbers:{required:!1,tsType:{name:"boolean"},description:`Enables tabular figures on the underlying {@link Text}.
@default true`,defaultValue:{value:"true",computed:!1}},font:{defaultValue:{value:"'inherit'",computed:!1},required:!1},fontFamily:{defaultValue:{value:"font = 'inherit'",computed:!1},required:!1},fontSize:{defaultValue:{value:"font = 'inherit'",computed:!1},required:!1},fontWeight:{defaultValue:{value:"font = 'inherit'",computed:!1},required:!1},lineHeight:{defaultValue:{value:"fontSize = font",computed:!1},required:!1}}};const Ee=M(U),Ve="digitContainerCss-d1b9qafi",ae="digitNonActiveCss-d1pydynt",He="topNonActiveCss-txqrmxs",Fe="bottomNonActiveCss-b1lcihm0",Ze="digitSpanCss-ddfqdot",G=a.memo(a.forwardRef(({value:t,initialValue:n,transitionConfig:o,digitTransitionVariant:l="every",direction:i,RollingNumberMaskComponent:s=B,color:u="inherit",className:b,styles:h,style:y,classNames:w,...f},c)=>{const m=a.useRef(null);a.useImperativeHandle(c,()=>m.current);const p=a.useRef(new Array(10)),x=a.useRef(null),T=a.useRef(null),S=a.useRef(n??t),v=a.useMemo(()=>l==="single",[l]);a.useLayoutEffect(()=>{const g=p.current[S.current],k=p.current[t];if(!m.current||!g||!k||t===S.current)return;const z=m.current.getBoundingClientRect(),E=i==="up"?1:-1,W=v?z.height*E:z.height*(t-S.current),O=ee(g),V=ee(k);if(Z(m.current,{y:[W,0],width:[O,V]},o?.y??$.y),v){const L=o?.opacity??$.opacity;x.current&&Z(x.current,{opacity:[1,0]},L),T.current&&Z(T.current,{opacity:[0,1]},L)}S.current=t},[v,o,t,i]);const e=a.useCallback(g=>d.jsx("span",{ref:k=>void(p.current[g]=k),className:Ze,children:g},g),[]),r=i==="up",I=i==="down",D=v?r:t!==0,R=v?I:t!==9,P=v?e(S.current):new Array(t).fill(null).map((g,k)=>e(k)),q=v?e(S.current):new Array(9-t).fill(null).map((g,k)=>e(t+k+1));return d.jsx(s,{children:d.jsxs(Ee,{ref:m,className:A(Ve,b,w?.root,w?.text),color:u,style:{...y,...h?.root,...h?.text},...f,children:[D&&d.jsx("span",{ref:v?x:void 0,className:A(ae,He),children:P}),d.jsx("span",{ref:v?T:void 0,children:e(t)}),R&&d.jsx("span",{ref:v?x:void 0,className:A(ae,Fe),children:q})]})})}));G.__docgenInfo={description:`Default digit component for RollingNumber on web.

The web implementation differs from mobile due to platform-specific animation libraries:
- Web uses framer-motion with imperative \`animate\` calls
- Mobile uses react-native-reanimated with shared values and worklets

For the "every" variant, web renders only the necessary digits above/below the current
value using CSS positioning. Mobile renders all 10 digits (0-9) stacked with absolute
positioning.

For the "single" variant, web uses imperative opacity crossfades on DOM sections.
Mobile uses reanimated's \`entering\`/\`exiting\` props with custom animation worklets.`,methods:[],displayName:"DefaultRollingNumberDigit",props:{value:{required:!0,tsType:{name:"number"},description:"Digit currently displayed in the animated column."},initialValue:{required:!1,tsType:{name:"number"},description:"Digit displayed during the initial render."},transitionConfig:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /**
   * Transition applied to the vertical translation animation (digit roll).
   */
  y?: Transition;
  /**
   * Transition applied to the opacity animation during digit transitions.
   * Controls how digits fade in/out during the single variant animation.
   */
  opacity?: Transition;
  /**
   * Transition applied to the color interpolation animation (color pulse).
   */
  color?: Transition;
}`,signature:{properties:[{key:"y",value:{name:"Transition",required:!1},description:"Transition applied to the vertical translation animation (digit roll)."},{key:"opacity",value:{name:"Transition",required:!1},description:`Transition applied to the opacity animation during digit transitions.
Controls how digits fade in/out during the single variant animation.`},{key:"color",value:{name:"Transition",required:!1},description:"Transition applied to the color interpolation animation (color pulse)."}]}},description:"Transition overrides applied to the digit animation."},RollingNumberMaskComponent:{required:!1,tsType:{name:"ReactFC",raw:"React.FC<RollingNumberMaskProps>",elements:[{name:"intersection",raw:`TextProps<TextDefaultElement> & {
  /**
   * Content rendered inside the mask container.
   */
  children?: React.ReactNode;
  /**
   * Ref forwarded to the mask element.
   */
  ref?: React.Ref<HTMLSpanElement>;
}`,elements:[{name:"Polymorphic.Props",elements:[{name:"textDefaultElement"},{name:"Polymorphic.ExtendableProps",elements:[{name:"intersection",raw:`StyleProps &
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
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]},{name:"signature",type:"object",raw:`{
  numberOfLines?: number;
  disabled?: boolean;
  /**
   * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
   * @default false
   */
  tabularNumbers?: boolean;
  /**
   * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
   * @default false
   */
  slashedZero?: boolean;
  /**
   * Set text decoration to underline.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
   * @default false
   */
  underline?: boolean;
  /**
   * Use monospace font family.
   */
  mono?: boolean;
  /**
   * Set text to be in a single line.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
   * @default false
   */
  noWrap?: boolean;
  /**
   * Set overflow behavior.
   * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
   */
  overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetColor?: string;
  /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
  renderEmptyNode?: boolean;
}`,signature:{properties:[{key:"numberOfLines",value:{name:"number",required:!1}},{key:"disabled",value:{name:"boolean",required:!1}},{key:"tabularNumbers",value:{name:"boolean",required:!1},description:`Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
@default false`},{key:"slashedZero",value:{name:"boolean",required:!1},description:`Use character for number zero with a slash through it to differentiate it from the letter 'O'.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
@default false`},{key:"underline",value:{name:"boolean",required:!1},description:`Set text decoration to underline.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
@default false`},{key:"mono",value:{name:"boolean",required:!1},description:"Use monospace font family."},{key:"noWrap",value:{name:"boolean",required:!1},description:`Set text to be in a single line.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
@default false`},{key:"overflow",value:{name:"union",raw:"'truncate' | 'clip' | 'wrap' | 'break'",elements:[{name:"literal",value:"'truncate'"},{name:"literal",value:"'clip'"},{name:"literal",value:"'wrap'"},{name:"literal",value:"'break'"}],required:!1},description:`Set overflow behavior.
@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)`},{key:"dangerouslySetColor",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."},{key:"renderEmptyNode",value:{name:"boolean",required:!1},description:"@deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS."}]}}],raw:`Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    numberOfLines?: number;
    disabled?: boolean;
    /**
     * Activates the set of figures where numbers are all of the same size, allowing them to be easily aligned.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric) | [React Native Docs](https://reactnative.dev/docs/text-style-props#fontvariant)
     * @default false
     */
    tabularNumbers?: boolean;
    /**
     * Use character for number zero with a slash through it to differentiate it from the letter 'O'.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant-numeric)
     * @default false
     */
    slashedZero?: boolean;
    /**
     * Set text decoration to underline.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-decoration) | [React Native Docs](https://reactnative.dev/docs/text-style-props#textdecorationline)
     * @default false
     */
    underline?: boolean;
    /**
     * Use monospace font family.
     */
    mono?: boolean;
    /**
     * Set text to be in a single line.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
     * @default false
     */
    noWrap?: boolean;
    /**
     * Set overflow behavior.
     * @link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow)
     */
    overflow?: 'truncate' | 'clip' | 'wrap' | 'break';
    /** @danger This is a migration escape hatch. It is not intended to be used normally. */
    dangerouslySetColor?: string;
    /** @deprecated Do not use this prop. This is a migration escape hatch and will be removed in the next major version of CDS. */
    renderEmptyNode?: boolean;
  }
>`}],raw:`Polymorphic.Props<
  AsComponent,
  TextBaseProps
>`},{name:"signature",type:"object",raw:`{
  /**
   * Content rendered inside the mask container.
   */
  children?: React.ReactNode;
  /**
   * Ref forwarded to the mask element.
   */
  ref?: React.Ref<HTMLSpanElement>;
}`,signature:{properties:[{key:"children",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"Content rendered inside the mask container."},{key:"ref",value:{name:"ReactRef",raw:"React.Ref<HTMLSpanElement>",elements:[{name:"HTMLSpanElement"}],required:!1},description:"Ref forwarded to the mask element."}]}}]}]},description:"Component used to mask the digit column.",defaultValue:{value:`memo(
  forwardRef<HTMLSpanElement, RollingNumberMaskProps>(
    ({ children, color = 'inherit', className, ...props }, ref) => (
      <MotionText ref={ref} className={cx(maskCss, className)} color={color} {...props}>
        {children}
      </MotionText>
    ),
  ),
)`,computed:!0}},digitTransitionVariant:{required:!1,tsType:{name:"union",raw:"'every' | 'single'",elements:[{name:"literal",value:"'every'"},{name:"literal",value:"'single'"}]},description:`Style of digit transition animation.
@default 'every'`,defaultValue:{value:"'every'",computed:!1}},direction:{required:!1,tsType:{name:"union",raw:"'up' | 'down'",elements:[{name:"literal",value:"'up'"},{name:"literal",value:"'down'"}]},description:"Direction of the roll animation. Only used when {@link digitTransitionVariant} is `'single'`."},styles:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /** Digit container element */
  root?: React.CSSProperties;
  /** Digit text element */
  text?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Digit container element"},{key:"text",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Digit text element"}]}},description:""},classNames:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /** Digit container element */
  root?: string;
  /** Digit text element */
  text?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1},description:"Digit container element"},{key:"text",value:{name:"string",required:!1},description:"Digit text element"}]}},description:""},ref:{required:!1,tsType:{name:"ReactRef",raw:"React.Ref<HTMLSpanElement>",elements:[{name:"HTMLSpanElement"}]},description:"Ref forwarded to the digit container element."},color:{defaultValue:{value:"'inherit'",computed:!1},required:!1}}};export{Be as R};
