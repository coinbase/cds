import{r as a,j as e,c as C}from"./iframe-BXWLBCkp.js";import{a as q}from"./assets-CEwpm_uP.js";import{s as m,l as F}from"./tabs-mxIlbzm-.js";import{T as _,u as J}from"./Tabs-NZrJjpKJ.js";import{M as K}from"./MediaChip-DK4Hgf8b.js";import{u as X}from"./useHorizontalScrollToTarget-De-ilG7d.js";import{H as R}from"./HStack-B6p8qBpp.js";import{P as S}from"./Paddle-KLwlcGm-.js";import{V as G}from"./VStack-CnEfMFeL.js";import{T as r}from"./Text-Ch_dBU4v.js";import{R as I}from"./RemoteImage-Lksm6NI7.js";import"./preload-helper-D9Z9MdNV.js";import"./index-7N_x-QzT.js";import"./useMergeRefs-DR4sGa7m.js";import"./useRefMap-so5XoaSx.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./useTheme-BJazYlse.js";import"./Rect-CybC0zjI.js";import"./motion-minimal-SVRWJYUW.js";import"./Chip-Cb6f10va.js";import"./tokens-BwScSksM.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./toNumber-CMOupoY4.js";import"./isSymbol-BtzAvdsO.js";import"./NewAnimatePresence-BbA2hDPb.js";import"./index-B2twlf45.js";import"./use-unmount-effect-5QIafHMH.js";import"./IconButton-OIX0AFCz.js";import"./Button-W9Shg4T1.js";import"./Icon-CgDQ3NQp.js";import"./Spinner-BAI0lrZ-.js";import"./useMotionProps-CS-LE6l8.js";import"./utils-CwomCnHN.js";const Q="containerCss-c1s1lh4",Y="scrollContainerCss-ssmw4cq",Z=({label:t="",id:n,...u})=>{const{activeTab:c,updateActiveTab:l}=J(),i=a.useMemo(()=>c?.id===n,[c,n]),d=a.useRef(null),h=a.useCallback(y=>{y.preventDefault(),l(n)},[n,l]);return a.useEffect(()=>{i&&d.current&&d.current.focus()},[i]),e.jsx(K,{ref:d,"aria-selected":i,invertColorScheme:i,onClick:h,role:"tab",width:"max-content",...u,children:t})},A=()=>null,g=a.memo(a.forwardRef(function({tabs:n,activeTab:u,onChange:c,TabComponent:l=Z,testID:i,background:d="bg",gap:h=1,previousArrowAccessibilityLabel:y="Previous",nextArrowAccessibilityLabel:x="Next",width:O="100%",TabsActiveIndicatorComponent:se=A,disabled:D,compact:T,styles:p,classNames:f,autoScrollOffset:B=50,...W},U){const[j,L]=a.useState(null),{scrollRef:s,isScrollContentOffscreenLeft:E,isScrollContentOffscreenRight:N,handleScroll:H}=X({activeTarget:j,autoScrollOffset:B}),M=a.useCallback(()=>{s?.current?.scrollTo({left:0,behavior:"smooth"})},[s]),z=a.useCallback(()=>{if(!s.current)return;const v=s.current.scrollWidth-s.current.clientWidth;s.current.scrollTo({left:v,behavior:"smooth"})},[s]),V=a.useCallback(v=>e.jsx(l,{compact:T,...v}),[l,T]);return e.jsxs(R,{alignItems:"center",className:C(Q,f?.root),position:"relative",style:p?.root,testID:i,width:O,children:[e.jsx(S,{accessibilityLabel:y,background:d,direction:"left",onClick:M,paddleStyle:p?.paddle,show:E,variant:"secondary"}),e.jsx(R,{ref:s,alignItems:"center",className:C(Y,f?.scrollContainer),onScroll:H,overflow:"auto",style:p?.scrollContainer,children:e.jsx(_,{ref:U,TabComponent:V,TabsActiveIndicatorComponent:A,activeTab:u||null,background:d,className:f?.tabs,disabled:D,gap:h,onActiveTabElementChange:L,onChange:c,style:p?.tabs,tabs:n,...W})}),e.jsx(S,{accessibilityLabel:x,background:d,direction:"right",onClick:z,paddleStyle:p?.paddle,show:N,variant:"secondary"})]})}));g.displayName="TabbedChips";const k=g;g.__docgenInfo={description:"",methods:[],displayName:"TabbedChips",props:{TabComponent:{required:!1,tsType:{name:"ReactFC",raw:"React.FC<TabbedChipProps<TabId>>",elements:[{name:"intersection",raw:`Omit<
  ChipProps,
  'children' | 'onClick'
> &
  TabValue<TabId> & {
    Component?: React.FC<Omit<ChipProps, 'children'> & TabValue<TabId>>;
  }`,elements:[{name:"Omit",elements:[{name:"intersection",raw:`SharedProps &
Omit<
  PressableProps<PressableDefaultElement>,
  | 'children'
  | 'loading'
  | 'start'
  | 'numberOfLines'
  | 'accessibilityHint'
  | 'accessibilityLabelledBy'
  | 'onChange'
  | 'value'
> &
Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
  /** ReactNode placed in the center of the Chip */
  children?: React.ReactNode;
  /** ReactNode placed before the value */
  start?: React.ReactNode;
  /** ReactNode placed after the value */
  end?: React.ReactNode;
  /**
   * If text content overflows, it will get truncated with an ellipsis.
   * @default 200
   */
  maxWidth?: PressableBaseProps['maxWidth'];
  /**
   * Invert the foreground and background colors to emphasize the Chip.
   * Depending on your theme, it may be dangerous to use this prop in conjunction with \`transparentWhileInactive\`.
   * @default false
   * @deprecated Use the invertColorScheme prop instead
   */
  inverted?: boolean;
  /**
   * Invert the foreground and background colors to emphasize the Chip.
   * Depending on your theme, it may be dangerous to use this prop in conjunction with \`transparentWhileInactive\`.
   * @default false
   */
  invertColorScheme?: boolean;
  /** Reduces spacing around Chip content */
  compact?: boolean;
  /**
   * How many lines the text in the chip will be broken into.
   * @default 1
   */
  numberOfLines?: number;
  /**
   * @deprecated Use \`styles.content\` instead.
   * Apply styles to Chip content.
   */
  contentStyle?: React.CSSProperties;
  /** Custom styles for individual elements of the Chip component */
  styles?: {
    /** Root element */
    root?: React.CSSProperties;
    /** Content element */
    content?: React.CSSProperties;
  };
  /** Custom class names for individual elements of the Chip component */
  classNames?: {
    /** Root element */
    root?: string;
    /** Content element */
    content?: string;
  };
}`,elements:[{name:"signature",type:"object",raw:`{
  /**
   * Used to locate this element in unit and end-to-end tests.
   * Under the hood, testID translates to data-testid on Web. On Mobile, testID
   * stays the same - testID
   */
  testID?: string;
}`,signature:{properties:[{key:"testID",value:{name:"string",required:!1},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`}]}},{name:"Omit",elements:[{name:"Polymorphic.Props",elements:[{name:"pressableDefaultElement"},{name:"Polymorphic.ExtendableProps",elements:[{name:"Polymorphic.ExtendableProps",elements:[{name:"intersection",raw:`StyleProps &
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
  /** Apply class names to the outer container. */
  className?: string;
  /** Background color of the overlay (element being interacted with). */
  background?: ThemeVars.Color;
  /** Set element to block and expand to 100% width. */
  block?: boolean;
  /** Border color of the element. */
  borderColor?: ThemeVars.Color;
  /** Is the element currently disabled. */
  disabled?: boolean;
  /**
   * Is the element currenty loading.
   * When set to true, will disable element from press and keyboard events
   */
  loading?: boolean;
  /** Is the element being pressed. Primarily a mobile feature, but can be used on the web. */
  pressed?: boolean;
  /**
   * Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
   * Must be used in conjunction with the "pressed" prop
   */
  transparentWhileInactive?: boolean;
  /**
   * Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
   * Must be used in conjunction with the "pressed" prop
   */
  transparentWhilePressed?: boolean;
  blendStyles?: InteractableBlendStyles;
}`,signature:{properties:[{key:"className",value:{name:"string",required:!1},description:"Apply class names to the outer container."},{key:"background",value:{name:"ThemeVars.Color",required:!1},description:"Background color of the overlay (element being interacted with)."},{key:"block",value:{name:"boolean",required:!1},description:"Set element to block and expand to 100% width."},{key:"borderColor",value:{name:"ThemeVars.Color",required:!1},description:"Border color of the element."},{key:"disabled",value:{name:"boolean",required:!1},description:"Is the element currently disabled."},{key:"loading",value:{name:"boolean",required:!1},description:`Is the element currenty loading.
When set to true, will disable element from press and keyboard events`},{key:"pressed",value:{name:"boolean",required:!1},description:"Is the element being pressed. Primarily a mobile feature, but can be used on the web."},{key:"transparentWhileInactive",value:{name:"boolean",required:!1},description:`Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
Must be used in conjunction with the "pressed" prop`},{key:"transparentWhilePressed",value:{name:"boolean",required:!1},description:`Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
Must be used in conjunction with the "pressed" prop`},{key:"blendStyles",value:{name:"signature",type:"object",raw:`{
  background?: string;
  pressedBackground?: string;
  disabledBackground?: string;
  hoveredBackground?: string;
  borderColor?: string;
  pressedBorderColor?: string;
  disabledBorderColor?: string;
  hoveredBorderColor?: string;
  /**
   * The opacity of the element when hovered.
   * @default 0.88
   */
  hoveredOpacity?: number;
  /**
   * The opacity of the element when pressed.
   * @default 0.82
   */
  pressedOpacity?: number;
  /**
   * The opacity of the element when disabled.
   * @default 0.75
   */
  disabledOpacity?: number;
}`,signature:{properties:[{key:"background",value:{name:"string",required:!1}},{key:"pressedBackground",value:{name:"string",required:!1}},{key:"disabledBackground",value:{name:"string",required:!1}},{key:"hoveredBackground",value:{name:"string",required:!1}},{key:"borderColor",value:{name:"string",required:!1}},{key:"pressedBorderColor",value:{name:"string",required:!1}},{key:"disabledBorderColor",value:{name:"string",required:!1}},{key:"hoveredBorderColor",value:{name:"string",required:!1}},{key:"hoveredOpacity",value:{name:"number",required:!1},description:`The opacity of the element when hovered.
@default 0.88`},{key:"pressedOpacity",value:{name:"number",required:!1},description:`The opacity of the element when pressed.
@default 0.82`},{key:"disabledOpacity",value:{name:"number",required:!1},description:`The opacity of the element when disabled.
@default 0.75`}]},required:!1}}]}}],raw:`Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    /** Apply class names to the outer container. */
    className?: string;
    /** Background color of the overlay (element being interacted with). */
    background?: ThemeVars.Color;
    /** Set element to block and expand to 100% width. */
    block?: boolean;
    /** Border color of the element. */
    borderColor?: ThemeVars.Color;
    /** Is the element currently disabled. */
    disabled?: boolean;
    /**
     * Is the element currenty loading.
     * When set to true, will disable element from press and keyboard events
     */
    loading?: boolean;
    /** Is the element being pressed. Primarily a mobile feature, but can be used on the web. */
    pressed?: boolean;
    /**
     * Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
     * Must be used in conjunction with the "pressed" prop
     */
    transparentWhileInactive?: boolean;
    /**
     * Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
     * Must be used in conjunction with the "pressed" prop
     */
    transparentWhilePressed?: boolean;
    blendStyles?: InteractableBlendStyles;
  }
>`},{name:"intersection",raw:`ComponentEventHandlerProps & {
  /** Dont scale element on press. */
  noScaleOnPress?: boolean;
  focusable?: boolean;
}`,elements:[{name:"signature",type:"object",raw:`{
  eventConfig?: EventHandlerCustomConfig;
  analyticsId?: string;
}`,signature:{properties:[{key:"eventConfig",value:{name:"signature",type:"object",raw:`{
  actions: EventHandlerAction[];
  componentName: string;
  data?: EventCustomData;
}`,signature:{properties:[{key:"actions",value:{name:"Array",elements:[{name:"string"}],raw:"EventHandlerAction[]",required:!0}},{key:"componentName",value:{name:"string",required:!0}},{key:"data",value:{name:"Record",elements:[{name:"string"},{name:"union",raw:"T | Record<string, T>",elements:[{name:"union",raw:"EventDataEntryTypes | EventDataEntryTypes[]",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]},{name:"Array",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]}],raw:"EventDataEntryTypes[]"}]},{name:"Record",elements:[{name:"string"},{name:"union",raw:"EventDataEntryTypes | EventDataEntryTypes[]",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]},{name:"Array",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]}],raw:"EventDataEntryTypes[]"}]}],raw:"Record<string, T>"}]}],raw:"Record<string, RecursiveMapType<EventDataEntry>>",required:!1}}]},required:!1}},{key:"analyticsId",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
  /** Dont scale element on press. */
  noScaleOnPress?: boolean;
  focusable?: boolean;
}`,signature:{properties:[{key:"noScaleOnPress",value:{name:"boolean",required:!1},description:"Dont scale element on press."},{key:"focusable",value:{name:"boolean",required:!1}}]}}]}],raw:`Polymorphic.ExtendableProps<
  InteractableBaseProps,
  ComponentEventHandlerProps & {
    /** Dont scale element on press. */
    noScaleOnPress?: boolean;
    focusable?: boolean;
  }
>`}],raw:`Polymorphic.Props<
  AsComponent,
  PressableBaseProps
>`},{name:"union",raw:`| 'children'
| 'loading'
| 'start'
| 'numberOfLines'
| 'accessibilityHint'
| 'accessibilityLabelledBy'
| 'onChange'
| 'value'`,elements:[{name:"literal",value:"'children'"},{name:"literal",value:"'loading'"},{name:"literal",value:"'start'"},{name:"literal",value:"'numberOfLines'"},{name:"literal",value:"'accessibilityHint'"},{name:"literal",value:"'accessibilityLabelledBy'"},{name:"literal",value:"'onChange'"},{name:"literal",value:"'value'"}]}],raw:`Omit<
  PressableProps<PressableDefaultElement>,
  | 'children'
  | 'loading'
  | 'start'
  | 'numberOfLines'
  | 'accessibilityHint'
  | 'accessibilityLabelledBy'
  | 'onChange'
  | 'value'
>`},{name:"Pick",elements:[{name:"signature",type:"object",raw:`{
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
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},{name:"literal",value:"'accessibilityLabel'"}],raw:"Pick<SharedAccessibilityProps, 'accessibilityLabel'>"},{name:"signature",type:"object",raw:`{
  /** ReactNode placed in the center of the Chip */
  children?: React.ReactNode;
  /** ReactNode placed before the value */
  start?: React.ReactNode;
  /** ReactNode placed after the value */
  end?: React.ReactNode;
  /**
   * If text content overflows, it will get truncated with an ellipsis.
   * @default 200
   */
  maxWidth?: PressableBaseProps['maxWidth'];
  /**
   * Invert the foreground and background colors to emphasize the Chip.
   * Depending on your theme, it may be dangerous to use this prop in conjunction with \`transparentWhileInactive\`.
   * @default false
   * @deprecated Use the invertColorScheme prop instead
   */
  inverted?: boolean;
  /**
   * Invert the foreground and background colors to emphasize the Chip.
   * Depending on your theme, it may be dangerous to use this prop in conjunction with \`transparentWhileInactive\`.
   * @default false
   */
  invertColorScheme?: boolean;
  /** Reduces spacing around Chip content */
  compact?: boolean;
  /**
   * How many lines the text in the chip will be broken into.
   * @default 1
   */
  numberOfLines?: number;
  /**
   * @deprecated Use \`styles.content\` instead.
   * Apply styles to Chip content.
   */
  contentStyle?: React.CSSProperties;
  /** Custom styles for individual elements of the Chip component */
  styles?: {
    /** Root element */
    root?: React.CSSProperties;
    /** Content element */
    content?: React.CSSProperties;
  };
  /** Custom class names for individual elements of the Chip component */
  classNames?: {
    /** Root element */
    root?: string;
    /** Content element */
    content?: string;
  };
}`,signature:{properties:[{key:"children",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"ReactNode placed in the center of the Chip"},{key:"start",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"ReactNode placed before the value"},{key:"end",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"ReactNode placed after the value"},{key:"maxWidth",value:{name:"Polymorphic.ExtendableProps['maxWidth']",raw:"PressableBaseProps['maxWidth']",required:!1},description:`If text content overflows, it will get truncated with an ellipsis.
@default 200`},{key:"inverted",value:{name:"boolean",required:!1},description:`Invert the foreground and background colors to emphasize the Chip.
Depending on your theme, it may be dangerous to use this prop in conjunction with \`transparentWhileInactive\`.
@default false
@deprecated Use the invertColorScheme prop instead`},{key:"invertColorScheme",value:{name:"boolean",required:!1},description:"Invert the foreground and background colors to emphasize the Chip.\nDepending on your theme, it may be dangerous to use this prop in conjunction with `transparentWhileInactive`.\n@default false"},{key:"compact",value:{name:"boolean",required:!1},description:"Reduces spacing around Chip content"},{key:"numberOfLines",value:{name:"number",required:!1},description:`How many lines the text in the chip will be broken into.
@default 1`},{key:"contentStyle",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"@deprecated Use `styles.content` instead.\nApply styles to Chip content."},{key:"styles",value:{name:"signature",type:"object",raw:`{
  /** Root element */
  root?: React.CSSProperties;
  /** Content element */
  content?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Root element"},{key:"content",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Content element"}]},required:!1},description:"Custom styles for individual elements of the Chip component"},{key:"classNames",value:{name:"signature",type:"object",raw:`{
  /** Root element */
  root?: string;
  /** Content element */
  content?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1},description:"Root element"},{key:"content",value:{name:"string",required:!1},description:"Content element"}]},required:!1},description:"Custom class names for individual elements of the Chip component"}]}}]},{name:"union",raw:"'children' | 'onClick'",elements:[{name:"literal",value:"'children'"},{name:"literal",value:"'onClick'"}]}],raw:`Omit<
  ChipProps,
  'children' | 'onClick'
>`},{name:"signature",type:"object",raw:`{
  /** The tab id. */
  id: TabId;
  /** The tab label. */
  label?: React.ReactNode;
  /** Disable interactions on the tab. */
  disabled?: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TabId",required:!0},description:"The tab id."},{key:"label",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"The tab label."},{key:"disabled",value:{name:"boolean",required:!1},description:"Disable interactions on the tab."}]}},{name:"signature",type:"object",raw:`{
  Component?: React.FC<Omit<ChipProps, 'children'> & TabValue<TabId>>;
}`,signature:{properties:[{key:"Component",value:{name:"ReactFC",raw:"React.FC<Omit<ChipProps, 'children'> & TabValue<TabId>>",elements:[{name:"intersection",raw:"Omit<ChipProps, 'children'> & TabValue<TabId>",elements:[{name:"Omit",elements:[{name:"intersection",raw:`SharedProps &
Omit<
  PressableProps<PressableDefaultElement>,
  | 'children'
  | 'loading'
  | 'start'
  | 'numberOfLines'
  | 'accessibilityHint'
  | 'accessibilityLabelledBy'
  | 'onChange'
  | 'value'
> &
Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
  /** ReactNode placed in the center of the Chip */
  children?: React.ReactNode;
  /** ReactNode placed before the value */
  start?: React.ReactNode;
  /** ReactNode placed after the value */
  end?: React.ReactNode;
  /**
   * If text content overflows, it will get truncated with an ellipsis.
   * @default 200
   */
  maxWidth?: PressableBaseProps['maxWidth'];
  /**
   * Invert the foreground and background colors to emphasize the Chip.
   * Depending on your theme, it may be dangerous to use this prop in conjunction with \`transparentWhileInactive\`.
   * @default false
   * @deprecated Use the invertColorScheme prop instead
   */
  inverted?: boolean;
  /**
   * Invert the foreground and background colors to emphasize the Chip.
   * Depending on your theme, it may be dangerous to use this prop in conjunction with \`transparentWhileInactive\`.
   * @default false
   */
  invertColorScheme?: boolean;
  /** Reduces spacing around Chip content */
  compact?: boolean;
  /**
   * How many lines the text in the chip will be broken into.
   * @default 1
   */
  numberOfLines?: number;
  /**
   * @deprecated Use \`styles.content\` instead.
   * Apply styles to Chip content.
   */
  contentStyle?: React.CSSProperties;
  /** Custom styles for individual elements of the Chip component */
  styles?: {
    /** Root element */
    root?: React.CSSProperties;
    /** Content element */
    content?: React.CSSProperties;
  };
  /** Custom class names for individual elements of the Chip component */
  classNames?: {
    /** Root element */
    root?: string;
    /** Content element */
    content?: string;
  };
}`,elements:[{name:"signature",type:"object",raw:`{
  /**
   * Used to locate this element in unit and end-to-end tests.
   * Under the hood, testID translates to data-testid on Web. On Mobile, testID
   * stays the same - testID
   */
  testID?: string;
}`,signature:{properties:[{key:"testID",value:{name:"string",required:!1},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`}]}},{name:"Omit",elements:[{name:"Polymorphic.Props",elements:[{name:"pressableDefaultElement"},{name:"Polymorphic.ExtendableProps",elements:[{name:"Polymorphic.ExtendableProps",elements:[{name:"intersection",raw:`StyleProps &
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
  /** Apply class names to the outer container. */
  className?: string;
  /** Background color of the overlay (element being interacted with). */
  background?: ThemeVars.Color;
  /** Set element to block and expand to 100% width. */
  block?: boolean;
  /** Border color of the element. */
  borderColor?: ThemeVars.Color;
  /** Is the element currently disabled. */
  disabled?: boolean;
  /**
   * Is the element currenty loading.
   * When set to true, will disable element from press and keyboard events
   */
  loading?: boolean;
  /** Is the element being pressed. Primarily a mobile feature, but can be used on the web. */
  pressed?: boolean;
  /**
   * Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
   * Must be used in conjunction with the "pressed" prop
   */
  transparentWhileInactive?: boolean;
  /**
   * Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
   * Must be used in conjunction with the "pressed" prop
   */
  transparentWhilePressed?: boolean;
  blendStyles?: InteractableBlendStyles;
}`,signature:{properties:[{key:"className",value:{name:"string",required:!1},description:"Apply class names to the outer container."},{key:"background",value:{name:"ThemeVars.Color",required:!1},description:"Background color of the overlay (element being interacted with)."},{key:"block",value:{name:"boolean",required:!1},description:"Set element to block and expand to 100% width."},{key:"borderColor",value:{name:"ThemeVars.Color",required:!1},description:"Border color of the element."},{key:"disabled",value:{name:"boolean",required:!1},description:"Is the element currently disabled."},{key:"loading",value:{name:"boolean",required:!1},description:`Is the element currenty loading.
When set to true, will disable element from press and keyboard events`},{key:"pressed",value:{name:"boolean",required:!1},description:"Is the element being pressed. Primarily a mobile feature, but can be used on the web."},{key:"transparentWhileInactive",value:{name:"boolean",required:!1},description:`Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
Must be used in conjunction with the "pressed" prop`},{key:"transparentWhilePressed",value:{name:"boolean",required:!1},description:`Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
Must be used in conjunction with the "pressed" prop`},{key:"blendStyles",value:{name:"signature",type:"object",raw:`{
  background?: string;
  pressedBackground?: string;
  disabledBackground?: string;
  hoveredBackground?: string;
  borderColor?: string;
  pressedBorderColor?: string;
  disabledBorderColor?: string;
  hoveredBorderColor?: string;
  /**
   * The opacity of the element when hovered.
   * @default 0.88
   */
  hoveredOpacity?: number;
  /**
   * The opacity of the element when pressed.
   * @default 0.82
   */
  pressedOpacity?: number;
  /**
   * The opacity of the element when disabled.
   * @default 0.75
   */
  disabledOpacity?: number;
}`,signature:{properties:[{key:"background",value:{name:"string",required:!1}},{key:"pressedBackground",value:{name:"string",required:!1}},{key:"disabledBackground",value:{name:"string",required:!1}},{key:"hoveredBackground",value:{name:"string",required:!1}},{key:"borderColor",value:{name:"string",required:!1}},{key:"pressedBorderColor",value:{name:"string",required:!1}},{key:"disabledBorderColor",value:{name:"string",required:!1}},{key:"hoveredBorderColor",value:{name:"string",required:!1}},{key:"hoveredOpacity",value:{name:"number",required:!1},description:`The opacity of the element when hovered.
@default 0.88`},{key:"pressedOpacity",value:{name:"number",required:!1},description:`The opacity of the element when pressed.
@default 0.82`},{key:"disabledOpacity",value:{name:"number",required:!1},description:`The opacity of the element when disabled.
@default 0.75`}]},required:!1}}]}}],raw:`Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    /** Apply class names to the outer container. */
    className?: string;
    /** Background color of the overlay (element being interacted with). */
    background?: ThemeVars.Color;
    /** Set element to block and expand to 100% width. */
    block?: boolean;
    /** Border color of the element. */
    borderColor?: ThemeVars.Color;
    /** Is the element currently disabled. */
    disabled?: boolean;
    /**
     * Is the element currenty loading.
     * When set to true, will disable element from press and keyboard events
     */
    loading?: boolean;
    /** Is the element being pressed. Primarily a mobile feature, but can be used on the web. */
    pressed?: boolean;
    /**
     * Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
     * Must be used in conjunction with the "pressed" prop
     */
    transparentWhileInactive?: boolean;
    /**
     * Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
     * Must be used in conjunction with the "pressed" prop
     */
    transparentWhilePressed?: boolean;
    blendStyles?: InteractableBlendStyles;
  }
>`},{name:"intersection",raw:`ComponentEventHandlerProps & {
  /** Dont scale element on press. */
  noScaleOnPress?: boolean;
  focusable?: boolean;
}`,elements:[{name:"signature",type:"object",raw:`{
  eventConfig?: EventHandlerCustomConfig;
  analyticsId?: string;
}`,signature:{properties:[{key:"eventConfig",value:{name:"signature",type:"object",raw:`{
  actions: EventHandlerAction[];
  componentName: string;
  data?: EventCustomData;
}`,signature:{properties:[{key:"actions",value:{name:"Array",elements:[{name:"string"}],raw:"EventHandlerAction[]",required:!0}},{key:"componentName",value:{name:"string",required:!0}},{key:"data",value:{name:"Record",elements:[{name:"string"},{name:"union",raw:"T | Record<string, T>",elements:[{name:"union",raw:"EventDataEntryTypes | EventDataEntryTypes[]",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]},{name:"Array",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]}],raw:"EventDataEntryTypes[]"}]},{name:"Record",elements:[{name:"string"},{name:"union",raw:"EventDataEntryTypes | EventDataEntryTypes[]",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]},{name:"Array",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]}],raw:"EventDataEntryTypes[]"}]}],raw:"Record<string, T>"}]}],raw:"Record<string, RecursiveMapType<EventDataEntry>>",required:!1}}]},required:!1}},{key:"analyticsId",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
  /** Dont scale element on press. */
  noScaleOnPress?: boolean;
  focusable?: boolean;
}`,signature:{properties:[{key:"noScaleOnPress",value:{name:"boolean",required:!1},description:"Dont scale element on press."},{key:"focusable",value:{name:"boolean",required:!1}}]}}]}],raw:`Polymorphic.ExtendableProps<
  InteractableBaseProps,
  ComponentEventHandlerProps & {
    /** Dont scale element on press. */
    noScaleOnPress?: boolean;
    focusable?: boolean;
  }
>`}],raw:`Polymorphic.Props<
  AsComponent,
  PressableBaseProps
>`},{name:"union",raw:`| 'children'
| 'loading'
| 'start'
| 'numberOfLines'
| 'accessibilityHint'
| 'accessibilityLabelledBy'
| 'onChange'
| 'value'`,elements:[{name:"literal",value:"'children'"},{name:"literal",value:"'loading'"},{name:"literal",value:"'start'"},{name:"literal",value:"'numberOfLines'"},{name:"literal",value:"'accessibilityHint'"},{name:"literal",value:"'accessibilityLabelledBy'"},{name:"literal",value:"'onChange'"},{name:"literal",value:"'value'"}]}],raw:`Omit<
  PressableProps<PressableDefaultElement>,
  | 'children'
  | 'loading'
  | 'start'
  | 'numberOfLines'
  | 'accessibilityHint'
  | 'accessibilityLabelledBy'
  | 'onChange'
  | 'value'
>`},{name:"Pick",elements:[{name:"signature",type:"object",raw:`{
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
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},{name:"literal",value:"'accessibilityLabel'"}],raw:"Pick<SharedAccessibilityProps, 'accessibilityLabel'>"},{name:"signature",type:"object",raw:`{
  /** ReactNode placed in the center of the Chip */
  children?: React.ReactNode;
  /** ReactNode placed before the value */
  start?: React.ReactNode;
  /** ReactNode placed after the value */
  end?: React.ReactNode;
  /**
   * If text content overflows, it will get truncated with an ellipsis.
   * @default 200
   */
  maxWidth?: PressableBaseProps['maxWidth'];
  /**
   * Invert the foreground and background colors to emphasize the Chip.
   * Depending on your theme, it may be dangerous to use this prop in conjunction with \`transparentWhileInactive\`.
   * @default false
   * @deprecated Use the invertColorScheme prop instead
   */
  inverted?: boolean;
  /**
   * Invert the foreground and background colors to emphasize the Chip.
   * Depending on your theme, it may be dangerous to use this prop in conjunction with \`transparentWhileInactive\`.
   * @default false
   */
  invertColorScheme?: boolean;
  /** Reduces spacing around Chip content */
  compact?: boolean;
  /**
   * How many lines the text in the chip will be broken into.
   * @default 1
   */
  numberOfLines?: number;
  /**
   * @deprecated Use \`styles.content\` instead.
   * Apply styles to Chip content.
   */
  contentStyle?: React.CSSProperties;
  /** Custom styles for individual elements of the Chip component */
  styles?: {
    /** Root element */
    root?: React.CSSProperties;
    /** Content element */
    content?: React.CSSProperties;
  };
  /** Custom class names for individual elements of the Chip component */
  classNames?: {
    /** Root element */
    root?: string;
    /** Content element */
    content?: string;
  };
}`,signature:{properties:[{key:"children",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"ReactNode placed in the center of the Chip"},{key:"start",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"ReactNode placed before the value"},{key:"end",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"ReactNode placed after the value"},{key:"maxWidth",value:{name:"Polymorphic.ExtendableProps['maxWidth']",raw:"PressableBaseProps['maxWidth']",required:!1},description:`If text content overflows, it will get truncated with an ellipsis.
@default 200`},{key:"inverted",value:{name:"boolean",required:!1},description:`Invert the foreground and background colors to emphasize the Chip.
Depending on your theme, it may be dangerous to use this prop in conjunction with \`transparentWhileInactive\`.
@default false
@deprecated Use the invertColorScheme prop instead`},{key:"invertColorScheme",value:{name:"boolean",required:!1},description:"Invert the foreground and background colors to emphasize the Chip.\nDepending on your theme, it may be dangerous to use this prop in conjunction with `transparentWhileInactive`.\n@default false"},{key:"compact",value:{name:"boolean",required:!1},description:"Reduces spacing around Chip content"},{key:"numberOfLines",value:{name:"number",required:!1},description:`How many lines the text in the chip will be broken into.
@default 1`},{key:"contentStyle",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"@deprecated Use `styles.content` instead.\nApply styles to Chip content."},{key:"styles",value:{name:"signature",type:"object",raw:`{
  /** Root element */
  root?: React.CSSProperties;
  /** Content element */
  content?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Root element"},{key:"content",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Content element"}]},required:!1},description:"Custom styles for individual elements of the Chip component"},{key:"classNames",value:{name:"signature",type:"object",raw:`{
  /** Root element */
  root?: string;
  /** Content element */
  content?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1},description:"Root element"},{key:"content",value:{name:"string",required:!1},description:"Content element"}]},required:!1},description:"Custom class names for individual elements of the Chip component"}]}}]},{name:"literal",value:"'children'"}],raw:"Omit<ChipProps, 'children'>"},{name:"signature",type:"object",raw:`{
  /** The tab id. */
  id: TabId;
  /** The tab label. */
  label?: React.ReactNode;
  /** Disable interactions on the tab. */
  disabled?: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TabId",required:!0},description:"The tab id."},{key:"label",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"The tab label."},{key:"disabled",value:{name:"boolean",required:!1},description:"Disable interactions on the tab."}]}}]}],required:!1}}]}}]}]},description:"",defaultValue:{value:`<TabId extends string = string>({
  label = '',
  id,
  ...tabProps
}: TabbedChipProps<TabId>) => {
  const { activeTab, updateActiveTab } = useTabsContext();
  const isActive = useMemo(() => activeTab?.id === id, [activeTab, id]);
  const chipRef = useRef<HTMLButtonElement>(null);
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      updateActiveTab(id);
    },
    [id, updateActiveTab],
  );

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
      invertColorScheme={isActive}
      onClick={handleClick}
      role="tab"
      width="max-content"
      {...tabProps}
    >
      {label}
    </MediaChip>
  );
}`,computed:!1}},TabsActiveIndicatorComponent:{required:!1,tsType:{name:"intersection['TabsActiveIndicatorComponent']",raw:"TabsProps<TabId>['TabsActiveIndicatorComponent']"},description:"",defaultValue:{value:`() => {
  return null;
}`,computed:!1}},tabs:{required:!0,tsType:{name:"Array",elements:[{name:"intersection",raw:`Omit<
  ChipProps,
  'children' | 'onClick'
> &
  TabValue<TabId> & {
    Component?: React.FC<Omit<ChipProps, 'children'> & TabValue<TabId>>;
  }`,elements:[{name:"Omit",elements:[{name:"intersection",raw:`SharedProps &
Omit<
  PressableProps<PressableDefaultElement>,
  | 'children'
  | 'loading'
  | 'start'
  | 'numberOfLines'
  | 'accessibilityHint'
  | 'accessibilityLabelledBy'
  | 'onChange'
  | 'value'
> &
Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
  /** ReactNode placed in the center of the Chip */
  children?: React.ReactNode;
  /** ReactNode placed before the value */
  start?: React.ReactNode;
  /** ReactNode placed after the value */
  end?: React.ReactNode;
  /**
   * If text content overflows, it will get truncated with an ellipsis.
   * @default 200
   */
  maxWidth?: PressableBaseProps['maxWidth'];
  /**
   * Invert the foreground and background colors to emphasize the Chip.
   * Depending on your theme, it may be dangerous to use this prop in conjunction with \`transparentWhileInactive\`.
   * @default false
   * @deprecated Use the invertColorScheme prop instead
   */
  inverted?: boolean;
  /**
   * Invert the foreground and background colors to emphasize the Chip.
   * Depending on your theme, it may be dangerous to use this prop in conjunction with \`transparentWhileInactive\`.
   * @default false
   */
  invertColorScheme?: boolean;
  /** Reduces spacing around Chip content */
  compact?: boolean;
  /**
   * How many lines the text in the chip will be broken into.
   * @default 1
   */
  numberOfLines?: number;
  /**
   * @deprecated Use \`styles.content\` instead.
   * Apply styles to Chip content.
   */
  contentStyle?: React.CSSProperties;
  /** Custom styles for individual elements of the Chip component */
  styles?: {
    /** Root element */
    root?: React.CSSProperties;
    /** Content element */
    content?: React.CSSProperties;
  };
  /** Custom class names for individual elements of the Chip component */
  classNames?: {
    /** Root element */
    root?: string;
    /** Content element */
    content?: string;
  };
}`,elements:[{name:"signature",type:"object",raw:`{
  /**
   * Used to locate this element in unit and end-to-end tests.
   * Under the hood, testID translates to data-testid on Web. On Mobile, testID
   * stays the same - testID
   */
  testID?: string;
}`,signature:{properties:[{key:"testID",value:{name:"string",required:!1},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`}]}},{name:"Omit",elements:[{name:"Polymorphic.Props",elements:[{name:"pressableDefaultElement"},{name:"Polymorphic.ExtendableProps",elements:[{name:"Polymorphic.ExtendableProps",elements:[{name:"intersection",raw:`StyleProps &
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
  /** Apply class names to the outer container. */
  className?: string;
  /** Background color of the overlay (element being interacted with). */
  background?: ThemeVars.Color;
  /** Set element to block and expand to 100% width. */
  block?: boolean;
  /** Border color of the element. */
  borderColor?: ThemeVars.Color;
  /** Is the element currently disabled. */
  disabled?: boolean;
  /**
   * Is the element currenty loading.
   * When set to true, will disable element from press and keyboard events
   */
  loading?: boolean;
  /** Is the element being pressed. Primarily a mobile feature, but can be used on the web. */
  pressed?: boolean;
  /**
   * Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
   * Must be used in conjunction with the "pressed" prop
   */
  transparentWhileInactive?: boolean;
  /**
   * Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
   * Must be used in conjunction with the "pressed" prop
   */
  transparentWhilePressed?: boolean;
  blendStyles?: InteractableBlendStyles;
}`,signature:{properties:[{key:"className",value:{name:"string",required:!1},description:"Apply class names to the outer container."},{key:"background",value:{name:"ThemeVars.Color",required:!1},description:"Background color of the overlay (element being interacted with)."},{key:"block",value:{name:"boolean",required:!1},description:"Set element to block and expand to 100% width."},{key:"borderColor",value:{name:"ThemeVars.Color",required:!1},description:"Border color of the element."},{key:"disabled",value:{name:"boolean",required:!1},description:"Is the element currently disabled."},{key:"loading",value:{name:"boolean",required:!1},description:`Is the element currenty loading.
When set to true, will disable element from press and keyboard events`},{key:"pressed",value:{name:"boolean",required:!1},description:"Is the element being pressed. Primarily a mobile feature, but can be used on the web."},{key:"transparentWhileInactive",value:{name:"boolean",required:!1},description:`Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
Must be used in conjunction with the "pressed" prop`},{key:"transparentWhilePressed",value:{name:"boolean",required:!1},description:`Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
Must be used in conjunction with the "pressed" prop`},{key:"blendStyles",value:{name:"signature",type:"object",raw:`{
  background?: string;
  pressedBackground?: string;
  disabledBackground?: string;
  hoveredBackground?: string;
  borderColor?: string;
  pressedBorderColor?: string;
  disabledBorderColor?: string;
  hoveredBorderColor?: string;
  /**
   * The opacity of the element when hovered.
   * @default 0.88
   */
  hoveredOpacity?: number;
  /**
   * The opacity of the element when pressed.
   * @default 0.82
   */
  pressedOpacity?: number;
  /**
   * The opacity of the element when disabled.
   * @default 0.75
   */
  disabledOpacity?: number;
}`,signature:{properties:[{key:"background",value:{name:"string",required:!1}},{key:"pressedBackground",value:{name:"string",required:!1}},{key:"disabledBackground",value:{name:"string",required:!1}},{key:"hoveredBackground",value:{name:"string",required:!1}},{key:"borderColor",value:{name:"string",required:!1}},{key:"pressedBorderColor",value:{name:"string",required:!1}},{key:"disabledBorderColor",value:{name:"string",required:!1}},{key:"hoveredBorderColor",value:{name:"string",required:!1}},{key:"hoveredOpacity",value:{name:"number",required:!1},description:`The opacity of the element when hovered.
@default 0.88`},{key:"pressedOpacity",value:{name:"number",required:!1},description:`The opacity of the element when pressed.
@default 0.82`},{key:"disabledOpacity",value:{name:"number",required:!1},description:`The opacity of the element when disabled.
@default 0.75`}]},required:!1}}]}}],raw:`Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    /** Apply class names to the outer container. */
    className?: string;
    /** Background color of the overlay (element being interacted with). */
    background?: ThemeVars.Color;
    /** Set element to block and expand to 100% width. */
    block?: boolean;
    /** Border color of the element. */
    borderColor?: ThemeVars.Color;
    /** Is the element currently disabled. */
    disabled?: boolean;
    /**
     * Is the element currenty loading.
     * When set to true, will disable element from press and keyboard events
     */
    loading?: boolean;
    /** Is the element being pressed. Primarily a mobile feature, but can be used on the web. */
    pressed?: boolean;
    /**
     * Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
     * Must be used in conjunction with the "pressed" prop
     */
    transparentWhileInactive?: boolean;
    /**
     * Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
     * Must be used in conjunction with the "pressed" prop
     */
    transparentWhilePressed?: boolean;
    blendStyles?: InteractableBlendStyles;
  }
>`},{name:"intersection",raw:`ComponentEventHandlerProps & {
  /** Dont scale element on press. */
  noScaleOnPress?: boolean;
  focusable?: boolean;
}`,elements:[{name:"signature",type:"object",raw:`{
  eventConfig?: EventHandlerCustomConfig;
  analyticsId?: string;
}`,signature:{properties:[{key:"eventConfig",value:{name:"signature",type:"object",raw:`{
  actions: EventHandlerAction[];
  componentName: string;
  data?: EventCustomData;
}`,signature:{properties:[{key:"actions",value:{name:"Array",elements:[{name:"string"}],raw:"EventHandlerAction[]",required:!0}},{key:"componentName",value:{name:"string",required:!0}},{key:"data",value:{name:"Record",elements:[{name:"string"},{name:"union",raw:"T | Record<string, T>",elements:[{name:"union",raw:"EventDataEntryTypes | EventDataEntryTypes[]",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]},{name:"Array",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]}],raw:"EventDataEntryTypes[]"}]},{name:"Record",elements:[{name:"string"},{name:"union",raw:"EventDataEntryTypes | EventDataEntryTypes[]",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]},{name:"Array",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]}],raw:"EventDataEntryTypes[]"}]}],raw:"Record<string, T>"}]}],raw:"Record<string, RecursiveMapType<EventDataEntry>>",required:!1}}]},required:!1}},{key:"analyticsId",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
  /** Dont scale element on press. */
  noScaleOnPress?: boolean;
  focusable?: boolean;
}`,signature:{properties:[{key:"noScaleOnPress",value:{name:"boolean",required:!1},description:"Dont scale element on press."},{key:"focusable",value:{name:"boolean",required:!1}}]}}]}],raw:`Polymorphic.ExtendableProps<
  InteractableBaseProps,
  ComponentEventHandlerProps & {
    /** Dont scale element on press. */
    noScaleOnPress?: boolean;
    focusable?: boolean;
  }
>`}],raw:`Polymorphic.Props<
  AsComponent,
  PressableBaseProps
>`},{name:"union",raw:`| 'children'
| 'loading'
| 'start'
| 'numberOfLines'
| 'accessibilityHint'
| 'accessibilityLabelledBy'
| 'onChange'
| 'value'`,elements:[{name:"literal",value:"'children'"},{name:"literal",value:"'loading'"},{name:"literal",value:"'start'"},{name:"literal",value:"'numberOfLines'"},{name:"literal",value:"'accessibilityHint'"},{name:"literal",value:"'accessibilityLabelledBy'"},{name:"literal",value:"'onChange'"},{name:"literal",value:"'value'"}]}],raw:`Omit<
  PressableProps<PressableDefaultElement>,
  | 'children'
  | 'loading'
  | 'start'
  | 'numberOfLines'
  | 'accessibilityHint'
  | 'accessibilityLabelledBy'
  | 'onChange'
  | 'value'
>`},{name:"Pick",elements:[{name:"signature",type:"object",raw:`{
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
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},{name:"literal",value:"'accessibilityLabel'"}],raw:"Pick<SharedAccessibilityProps, 'accessibilityLabel'>"},{name:"signature",type:"object",raw:`{
  /** ReactNode placed in the center of the Chip */
  children?: React.ReactNode;
  /** ReactNode placed before the value */
  start?: React.ReactNode;
  /** ReactNode placed after the value */
  end?: React.ReactNode;
  /**
   * If text content overflows, it will get truncated with an ellipsis.
   * @default 200
   */
  maxWidth?: PressableBaseProps['maxWidth'];
  /**
   * Invert the foreground and background colors to emphasize the Chip.
   * Depending on your theme, it may be dangerous to use this prop in conjunction with \`transparentWhileInactive\`.
   * @default false
   * @deprecated Use the invertColorScheme prop instead
   */
  inverted?: boolean;
  /**
   * Invert the foreground and background colors to emphasize the Chip.
   * Depending on your theme, it may be dangerous to use this prop in conjunction with \`transparentWhileInactive\`.
   * @default false
   */
  invertColorScheme?: boolean;
  /** Reduces spacing around Chip content */
  compact?: boolean;
  /**
   * How many lines the text in the chip will be broken into.
   * @default 1
   */
  numberOfLines?: number;
  /**
   * @deprecated Use \`styles.content\` instead.
   * Apply styles to Chip content.
   */
  contentStyle?: React.CSSProperties;
  /** Custom styles for individual elements of the Chip component */
  styles?: {
    /** Root element */
    root?: React.CSSProperties;
    /** Content element */
    content?: React.CSSProperties;
  };
  /** Custom class names for individual elements of the Chip component */
  classNames?: {
    /** Root element */
    root?: string;
    /** Content element */
    content?: string;
  };
}`,signature:{properties:[{key:"children",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"ReactNode placed in the center of the Chip"},{key:"start",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"ReactNode placed before the value"},{key:"end",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"ReactNode placed after the value"},{key:"maxWidth",value:{name:"Polymorphic.ExtendableProps['maxWidth']",raw:"PressableBaseProps['maxWidth']",required:!1},description:`If text content overflows, it will get truncated with an ellipsis.
@default 200`},{key:"inverted",value:{name:"boolean",required:!1},description:`Invert the foreground and background colors to emphasize the Chip.
Depending on your theme, it may be dangerous to use this prop in conjunction with \`transparentWhileInactive\`.
@default false
@deprecated Use the invertColorScheme prop instead`},{key:"invertColorScheme",value:{name:"boolean",required:!1},description:"Invert the foreground and background colors to emphasize the Chip.\nDepending on your theme, it may be dangerous to use this prop in conjunction with `transparentWhileInactive`.\n@default false"},{key:"compact",value:{name:"boolean",required:!1},description:"Reduces spacing around Chip content"},{key:"numberOfLines",value:{name:"number",required:!1},description:`How many lines the text in the chip will be broken into.
@default 1`},{key:"contentStyle",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"@deprecated Use `styles.content` instead.\nApply styles to Chip content."},{key:"styles",value:{name:"signature",type:"object",raw:`{
  /** Root element */
  root?: React.CSSProperties;
  /** Content element */
  content?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Root element"},{key:"content",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Content element"}]},required:!1},description:"Custom styles for individual elements of the Chip component"},{key:"classNames",value:{name:"signature",type:"object",raw:`{
  /** Root element */
  root?: string;
  /** Content element */
  content?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1},description:"Root element"},{key:"content",value:{name:"string",required:!1},description:"Content element"}]},required:!1},description:"Custom class names for individual elements of the Chip component"}]}}]},{name:"union",raw:"'children' | 'onClick'",elements:[{name:"literal",value:"'children'"},{name:"literal",value:"'onClick'"}]}],raw:`Omit<
  ChipProps,
  'children' | 'onClick'
>`},{name:"signature",type:"object",raw:`{
  /** The tab id. */
  id: TabId;
  /** The tab label. */
  label?: React.ReactNode;
  /** Disable interactions on the tab. */
  disabled?: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TabId",required:!0},description:"The tab id."},{key:"label",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"The tab label."},{key:"disabled",value:{name:"boolean",required:!1},description:"Disable interactions on the tab."}]}},{name:"signature",type:"object",raw:`{
  Component?: React.FC<Omit<ChipProps, 'children'> & TabValue<TabId>>;
}`,signature:{properties:[{key:"Component",value:{name:"ReactFC",raw:"React.FC<Omit<ChipProps, 'children'> & TabValue<TabId>>",elements:[{name:"intersection",raw:"Omit<ChipProps, 'children'> & TabValue<TabId>",elements:[{name:"Omit",elements:[{name:"intersection",raw:`SharedProps &
Omit<
  PressableProps<PressableDefaultElement>,
  | 'children'
  | 'loading'
  | 'start'
  | 'numberOfLines'
  | 'accessibilityHint'
  | 'accessibilityLabelledBy'
  | 'onChange'
  | 'value'
> &
Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
  /** ReactNode placed in the center of the Chip */
  children?: React.ReactNode;
  /** ReactNode placed before the value */
  start?: React.ReactNode;
  /** ReactNode placed after the value */
  end?: React.ReactNode;
  /**
   * If text content overflows, it will get truncated with an ellipsis.
   * @default 200
   */
  maxWidth?: PressableBaseProps['maxWidth'];
  /**
   * Invert the foreground and background colors to emphasize the Chip.
   * Depending on your theme, it may be dangerous to use this prop in conjunction with \`transparentWhileInactive\`.
   * @default false
   * @deprecated Use the invertColorScheme prop instead
   */
  inverted?: boolean;
  /**
   * Invert the foreground and background colors to emphasize the Chip.
   * Depending on your theme, it may be dangerous to use this prop in conjunction with \`transparentWhileInactive\`.
   * @default false
   */
  invertColorScheme?: boolean;
  /** Reduces spacing around Chip content */
  compact?: boolean;
  /**
   * How many lines the text in the chip will be broken into.
   * @default 1
   */
  numberOfLines?: number;
  /**
   * @deprecated Use \`styles.content\` instead.
   * Apply styles to Chip content.
   */
  contentStyle?: React.CSSProperties;
  /** Custom styles for individual elements of the Chip component */
  styles?: {
    /** Root element */
    root?: React.CSSProperties;
    /** Content element */
    content?: React.CSSProperties;
  };
  /** Custom class names for individual elements of the Chip component */
  classNames?: {
    /** Root element */
    root?: string;
    /** Content element */
    content?: string;
  };
}`,elements:[{name:"signature",type:"object",raw:`{
  /**
   * Used to locate this element in unit and end-to-end tests.
   * Under the hood, testID translates to data-testid on Web. On Mobile, testID
   * stays the same - testID
   */
  testID?: string;
}`,signature:{properties:[{key:"testID",value:{name:"string",required:!1},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`}]}},{name:"Omit",elements:[{name:"Polymorphic.Props",elements:[{name:"pressableDefaultElement"},{name:"Polymorphic.ExtendableProps",elements:[{name:"Polymorphic.ExtendableProps",elements:[{name:"intersection",raw:`StyleProps &
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
  /** Apply class names to the outer container. */
  className?: string;
  /** Background color of the overlay (element being interacted with). */
  background?: ThemeVars.Color;
  /** Set element to block and expand to 100% width. */
  block?: boolean;
  /** Border color of the element. */
  borderColor?: ThemeVars.Color;
  /** Is the element currently disabled. */
  disabled?: boolean;
  /**
   * Is the element currenty loading.
   * When set to true, will disable element from press and keyboard events
   */
  loading?: boolean;
  /** Is the element being pressed. Primarily a mobile feature, but can be used on the web. */
  pressed?: boolean;
  /**
   * Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
   * Must be used in conjunction with the "pressed" prop
   */
  transparentWhileInactive?: boolean;
  /**
   * Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
   * Must be used in conjunction with the "pressed" prop
   */
  transparentWhilePressed?: boolean;
  blendStyles?: InteractableBlendStyles;
}`,signature:{properties:[{key:"className",value:{name:"string",required:!1},description:"Apply class names to the outer container."},{key:"background",value:{name:"ThemeVars.Color",required:!1},description:"Background color of the overlay (element being interacted with)."},{key:"block",value:{name:"boolean",required:!1},description:"Set element to block and expand to 100% width."},{key:"borderColor",value:{name:"ThemeVars.Color",required:!1},description:"Border color of the element."},{key:"disabled",value:{name:"boolean",required:!1},description:"Is the element currently disabled."},{key:"loading",value:{name:"boolean",required:!1},description:`Is the element currenty loading.
When set to true, will disable element from press and keyboard events`},{key:"pressed",value:{name:"boolean",required:!1},description:"Is the element being pressed. Primarily a mobile feature, but can be used on the web."},{key:"transparentWhileInactive",value:{name:"boolean",required:!1},description:`Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
Must be used in conjunction with the "pressed" prop`},{key:"transparentWhilePressed",value:{name:"boolean",required:!1},description:`Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
Must be used in conjunction with the "pressed" prop`},{key:"blendStyles",value:{name:"signature",type:"object",raw:`{
  background?: string;
  pressedBackground?: string;
  disabledBackground?: string;
  hoveredBackground?: string;
  borderColor?: string;
  pressedBorderColor?: string;
  disabledBorderColor?: string;
  hoveredBorderColor?: string;
  /**
   * The opacity of the element when hovered.
   * @default 0.88
   */
  hoveredOpacity?: number;
  /**
   * The opacity of the element when pressed.
   * @default 0.82
   */
  pressedOpacity?: number;
  /**
   * The opacity of the element when disabled.
   * @default 0.75
   */
  disabledOpacity?: number;
}`,signature:{properties:[{key:"background",value:{name:"string",required:!1}},{key:"pressedBackground",value:{name:"string",required:!1}},{key:"disabledBackground",value:{name:"string",required:!1}},{key:"hoveredBackground",value:{name:"string",required:!1}},{key:"borderColor",value:{name:"string",required:!1}},{key:"pressedBorderColor",value:{name:"string",required:!1}},{key:"disabledBorderColor",value:{name:"string",required:!1}},{key:"hoveredBorderColor",value:{name:"string",required:!1}},{key:"hoveredOpacity",value:{name:"number",required:!1},description:`The opacity of the element when hovered.
@default 0.88`},{key:"pressedOpacity",value:{name:"number",required:!1},description:`The opacity of the element when pressed.
@default 0.82`},{key:"disabledOpacity",value:{name:"number",required:!1},description:`The opacity of the element when disabled.
@default 0.75`}]},required:!1}}]}}],raw:`Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    /** Apply class names to the outer container. */
    className?: string;
    /** Background color of the overlay (element being interacted with). */
    background?: ThemeVars.Color;
    /** Set element to block and expand to 100% width. */
    block?: boolean;
    /** Border color of the element. */
    borderColor?: ThemeVars.Color;
    /** Is the element currently disabled. */
    disabled?: boolean;
    /**
     * Is the element currenty loading.
     * When set to true, will disable element from press and keyboard events
     */
    loading?: boolean;
    /** Is the element being pressed. Primarily a mobile feature, but can be used on the web. */
    pressed?: boolean;
    /**
     * Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
     * Must be used in conjunction with the "pressed" prop
     */
    transparentWhileInactive?: boolean;
    /**
     * Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
     * Must be used in conjunction with the "pressed" prop
     */
    transparentWhilePressed?: boolean;
    blendStyles?: InteractableBlendStyles;
  }
>`},{name:"intersection",raw:`ComponentEventHandlerProps & {
  /** Dont scale element on press. */
  noScaleOnPress?: boolean;
  focusable?: boolean;
}`,elements:[{name:"signature",type:"object",raw:`{
  eventConfig?: EventHandlerCustomConfig;
  analyticsId?: string;
}`,signature:{properties:[{key:"eventConfig",value:{name:"signature",type:"object",raw:`{
  actions: EventHandlerAction[];
  componentName: string;
  data?: EventCustomData;
}`,signature:{properties:[{key:"actions",value:{name:"Array",elements:[{name:"string"}],raw:"EventHandlerAction[]",required:!0}},{key:"componentName",value:{name:"string",required:!0}},{key:"data",value:{name:"Record",elements:[{name:"string"},{name:"union",raw:"T | Record<string, T>",elements:[{name:"union",raw:"EventDataEntryTypes | EventDataEntryTypes[]",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]},{name:"Array",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]}],raw:"EventDataEntryTypes[]"}]},{name:"Record",elements:[{name:"string"},{name:"union",raw:"EventDataEntryTypes | EventDataEntryTypes[]",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]},{name:"Array",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]}],raw:"EventDataEntryTypes[]"}]}],raw:"Record<string, T>"}]}],raw:"Record<string, RecursiveMapType<EventDataEntry>>",required:!1}}]},required:!1}},{key:"analyticsId",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
  /** Dont scale element on press. */
  noScaleOnPress?: boolean;
  focusable?: boolean;
}`,signature:{properties:[{key:"noScaleOnPress",value:{name:"boolean",required:!1},description:"Dont scale element on press."},{key:"focusable",value:{name:"boolean",required:!1}}]}}]}],raw:`Polymorphic.ExtendableProps<
  InteractableBaseProps,
  ComponentEventHandlerProps & {
    /** Dont scale element on press. */
    noScaleOnPress?: boolean;
    focusable?: boolean;
  }
>`}],raw:`Polymorphic.Props<
  AsComponent,
  PressableBaseProps
>`},{name:"union",raw:`| 'children'
| 'loading'
| 'start'
| 'numberOfLines'
| 'accessibilityHint'
| 'accessibilityLabelledBy'
| 'onChange'
| 'value'`,elements:[{name:"literal",value:"'children'"},{name:"literal",value:"'loading'"},{name:"literal",value:"'start'"},{name:"literal",value:"'numberOfLines'"},{name:"literal",value:"'accessibilityHint'"},{name:"literal",value:"'accessibilityLabelledBy'"},{name:"literal",value:"'onChange'"},{name:"literal",value:"'value'"}]}],raw:`Omit<
  PressableProps<PressableDefaultElement>,
  | 'children'
  | 'loading'
  | 'start'
  | 'numberOfLines'
  | 'accessibilityHint'
  | 'accessibilityLabelledBy'
  | 'onChange'
  | 'value'
>`},{name:"Pick",elements:[{name:"signature",type:"object",raw:`{
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
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},{name:"literal",value:"'accessibilityLabel'"}],raw:"Pick<SharedAccessibilityProps, 'accessibilityLabel'>"},{name:"signature",type:"object",raw:`{
  /** ReactNode placed in the center of the Chip */
  children?: React.ReactNode;
  /** ReactNode placed before the value */
  start?: React.ReactNode;
  /** ReactNode placed after the value */
  end?: React.ReactNode;
  /**
   * If text content overflows, it will get truncated with an ellipsis.
   * @default 200
   */
  maxWidth?: PressableBaseProps['maxWidth'];
  /**
   * Invert the foreground and background colors to emphasize the Chip.
   * Depending on your theme, it may be dangerous to use this prop in conjunction with \`transparentWhileInactive\`.
   * @default false
   * @deprecated Use the invertColorScheme prop instead
   */
  inverted?: boolean;
  /**
   * Invert the foreground and background colors to emphasize the Chip.
   * Depending on your theme, it may be dangerous to use this prop in conjunction with \`transparentWhileInactive\`.
   * @default false
   */
  invertColorScheme?: boolean;
  /** Reduces spacing around Chip content */
  compact?: boolean;
  /**
   * How many lines the text in the chip will be broken into.
   * @default 1
   */
  numberOfLines?: number;
  /**
   * @deprecated Use \`styles.content\` instead.
   * Apply styles to Chip content.
   */
  contentStyle?: React.CSSProperties;
  /** Custom styles for individual elements of the Chip component */
  styles?: {
    /** Root element */
    root?: React.CSSProperties;
    /** Content element */
    content?: React.CSSProperties;
  };
  /** Custom class names for individual elements of the Chip component */
  classNames?: {
    /** Root element */
    root?: string;
    /** Content element */
    content?: string;
  };
}`,signature:{properties:[{key:"children",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"ReactNode placed in the center of the Chip"},{key:"start",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"ReactNode placed before the value"},{key:"end",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"ReactNode placed after the value"},{key:"maxWidth",value:{name:"Polymorphic.ExtendableProps['maxWidth']",raw:"PressableBaseProps['maxWidth']",required:!1},description:`If text content overflows, it will get truncated with an ellipsis.
@default 200`},{key:"inverted",value:{name:"boolean",required:!1},description:`Invert the foreground and background colors to emphasize the Chip.
Depending on your theme, it may be dangerous to use this prop in conjunction with \`transparentWhileInactive\`.
@default false
@deprecated Use the invertColorScheme prop instead`},{key:"invertColorScheme",value:{name:"boolean",required:!1},description:"Invert the foreground and background colors to emphasize the Chip.\nDepending on your theme, it may be dangerous to use this prop in conjunction with `transparentWhileInactive`.\n@default false"},{key:"compact",value:{name:"boolean",required:!1},description:"Reduces spacing around Chip content"},{key:"numberOfLines",value:{name:"number",required:!1},description:`How many lines the text in the chip will be broken into.
@default 1`},{key:"contentStyle",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"@deprecated Use `styles.content` instead.\nApply styles to Chip content."},{key:"styles",value:{name:"signature",type:"object",raw:`{
  /** Root element */
  root?: React.CSSProperties;
  /** Content element */
  content?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Root element"},{key:"content",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Content element"}]},required:!1},description:"Custom styles for individual elements of the Chip component"},{key:"classNames",value:{name:"signature",type:"object",raw:`{
  /** Root element */
  root?: string;
  /** Content element */
  content?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1},description:"Root element"},{key:"content",value:{name:"string",required:!1},description:"Content element"}]},required:!1},description:"Custom class names for individual elements of the Chip component"}]}}]},{name:"literal",value:"'children'"}],raw:"Omit<ChipProps, 'children'>"},{name:"signature",type:"object",raw:`{
  /** The tab id. */
  id: TabId;
  /** The tab label. */
  label?: React.ReactNode;
  /** Disable interactions on the tab. */
  disabled?: boolean;
}`,signature:{properties:[{key:"id",value:{name:"TabId",required:!0},description:"The tab id."},{key:"label",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"The tab label."},{key:"disabled",value:{name:"boolean",required:!1},description:"Disable interactions on the tab."}]}}]}],required:!1}}]}}]}],raw:"TabbedChipProps<TabId>[]"},description:""},compact:{required:!1,tsType:{name:"boolean"},description:`Turn on to use a compact Chip component for each tab.
@default false`},autoScrollOffset:{required:!1,tsType:{name:"number"},description:`X position offset when auto-scrolling to active tab (to avoid active tab being covered by the paddle on the left side, default: 50px)
@default 50`,defaultValue:{value:"50",computed:!1}},testID:{required:!1,tsType:{name:"string"},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`},accessibilityLabel:{required:!1,tsType:{name:"string"},description:`On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
On mobile, VoiceOver will read this string when a user selects the associated element.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
@link https://reactnative.dev/docs/accessibility#accessibilitylabel`},accessibilityHint:{required:!1,tsType:{name:"string"},description:`On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
when that result is not clear from the accessibility label.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
@link https://reactnative.dev/docs/accessibility#accessibilityhint`},accessibilityLabelledBy:{required:!1,tsType:{name:"string"},description:"On web, maps to `aria-labelledby` and lists the id(s) of the element(s) that label the element on which the attribute is set.\nOn mobile (Android only), a reference to another element `nativeID` used to build complex forms.\n@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby\n@link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android"},id:{required:!1,tsType:{name:"string"},description:`Used for a11y to indicate the relationship between a controlled element and its controller
eg: a Button that controls the visibility of a Modal`},accessibilityLabelId:{required:!1,tsType:{name:"string"},description:"Used to associate a label with an input for accessibility"},accessibilityDescriptionId:{required:!1,tsType:{name:"string"},description:"Used to associate descriptive text to an input for accessibility"},background:{required:!1,tsType:{name:"ThemeVars.Color"},description:"",defaultValue:{value:"'bg'",computed:!1}},previousArrowAccessibilityLabel:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Previous'",computed:!1}},nextArrowAccessibilityLabel:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"'Next'",computed:!1}},gap:{required:!1,tsType:{name:"Polymorphic.Props['gap']",raw:"HStackProps<HStackDefaultElement>['gap']"},description:`The spacing between Tabs
@default 1`,defaultValue:{value:"1",computed:!1}},width:{required:!1,tsType:{name:"Polymorphic.Props['width']",raw:"HStackProps<HStackDefaultElement>['width']"},description:`The width of the scroll container, defaults to 100% of the parent container
If the tabs are wider than the width of the container, paddles will be shown to scroll the tabs.
@default 100%`,defaultValue:{value:"'100%'",computed:!1}},styles:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /** Root container element */
  root?: React.CSSProperties;
  /** Scroll container element */
  scrollContainer?: React.CSSProperties;
  /** Paddle icon buttons */
  paddle?: React.CSSProperties;
  /** Tabs root element */
  tabs?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Root container element"},{key:"scrollContainer",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Scroll container element"},{key:"paddle",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Paddle icon buttons"},{key:"tabs",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Tabs root element"}]}},description:""},classNames:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /** Root container element */
  root?: string;
  /** Scroll container element */
  scrollContainer?: string;
  /** Tabs root element */
  tabs?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1},description:"Root container element"},{key:"scrollContainer",value:{name:"string",required:!1},description:"Scroll container element"},{key:"tabs",value:{name:"string",required:!1},description:"Tabs root element"}]}},description:""}}};const Me={title:"Components/alpha/TabbedChips",component:k},w=m.slice(0,5),P=[{id:"one",label:"One"},{id:"two",label:"Two"},{id:"three",label:"Three"}],$={height:24,shape:"circle",source:q.eth.imageUrl,width:24},ee={height:16,shape:"circle",source:q.eth.imageUrl,width:16},te=w.map(t=>({...t,start:e.jsx(I,{...$})})),ne=w.map(t=>({...t,start:e.jsx(I,{...ee})})),o=({tabs:t=w,compact:n=!1,styles:u,autoScrollOffset:c})=>{const[l,i]=a.useState(t[0]);return e.jsx(k,{activeTab:l,autoScrollOffset:c,compact:n,onChange:i,styles:u,tabs:t})},ae=()=>{const[t,n]=a.useState(P[0]);return e.jsx(k,{activeTab:t,onChange:n,tabs:P})},b=()=>e.jsxs(G,{gap:2,children:[e.jsx(r,{as:"p",display:"block",font:"headline",children:"Default"}),e.jsx(o,{}),e.jsx(r,{as:"p",display:"block",font:"headline",children:"With paddles"}),e.jsx(o,{tabs:m}),e.jsx(r,{as:"p",display:"block",font:"headline",children:"With custom sized paddles"}),e.jsx(o,{styles:{paddle:{transform:"scale(0.5)"}},tabs:m}),e.jsx(r,{as:"p",display:"block",font:"headline",children:"With long text"}),e.jsx(o,{tabs:F}),e.jsx(o,{tabs:m.map((t,n)=>({...t,disabled:n===1}))}),e.jsx(r,{as:"p",display:"block",font:"headline",children:"With enum values"}),e.jsx(ae,{}),e.jsx(r,{as:"p",display:"block",font:"headline",children:"With start"}),e.jsx(o,{tabs:te}),e.jsx(r,{as:"p",display:"block",font:"headline",children:"Compact with start"}),e.jsx(o,{compact:!0,tabs:ne}),e.jsx(r,{as:"p",display:"block",font:"headline",children:"With auto scroll offset"}),e.jsx(o,{autoScrollOffset:100,tabs:m})]}),ie={config:{rules:[{id:"aria-valid-attr-value",enabled:!1},{id:"duplicate-id-active",enabled:!1},{id:"duplicate-id",enabled:!1},{id:"duplicate-id-aria",enabled:!1}]}};b.parameters={percy:{enableJavaScript:!0},a11y:ie};b.__docgenInfo={description:"",methods:[],displayName:"Default"};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`() => {
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
      <Demo styles={{
      paddle: {
        transform: 'scale(0.5)'
      }
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
      <Text as="p" display="block" font="headline">
        With start
      </Text>
      <Demo tabs={tabsWithStart} />
      <Text as="p" display="block" font="headline">
        Compact with start
      </Text>
      <Demo compact tabs={compactTabsWithStart} />
      <Text as="p" display="block" font="headline">
        With auto scroll offset
      </Text>
      <Demo autoScrollOffset={100} tabs={sampleTabs} />
    </VStack>;
}`,...b.parameters?.docs?.source}}};const ze=["Default"];export{b as Default,ze as __namedExportsOrder,Me as default};
