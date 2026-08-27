import{r as w,j as e,B as m}from"./iframe-CsG_6vZR.js";import{u as c}from"./Modal-CD1hLK4f.js";import{H as h}from"./HStack-DaDYipoP.js";import{i as v}from"./interactableHeight-DPdDzpO8.js";import{I as p}from"./IconButton-DNJ86Kiu.js";import{T as P}from"./Text-B1CpMNU3.js";const C=w.forwardRef(({children:n,flexDirection:t="column",flexGrow:r=1,overflow:a="auto",paddingX:l=3,tabIndex:i=0,...o},s)=>{const{hideDividers:u}=c();return e.jsx(m,{ref:s,flexDirection:t,flexGrow:r,overflow:a,paddingX:l,paddingY:u?0:3,tabIndex:i,...o,children:n})});C.__docgenInfo={description:"",methods:[],displayName:"ModalBody",props:{flexDirection:{defaultValue:{value:"'column'",computed:!1},required:!1},flexGrow:{defaultValue:{value:"1",computed:!1},required:!1},overflow:{defaultValue:{value:"'auto'",computed:!1},required:!1},paddingX:{defaultValue:{value:"3",computed:!1},required:!1},tabIndex:{defaultValue:{value:"0",computed:!1},required:!1}}};const A="baseCss-b40uwu4",S=({gap:n=2,justifyContent:t="flex-end",paddingX:r=3,paddingY:a=2,width:l="100%",primaryAction:i,secondaryAction:o,...s})=>{const{hideDividers:u}=c();return e.jsxs(h,{borderedTop:!u,className:A,gap:n,justifyContent:t,paddingX:r,paddingY:a,width:l,...s,children:[o,i]})};S.__docgenInfo={description:"",methods:[],displayName:"ModalFooter",props:{primaryAction:{required:!0,tsType:{name:"NonNullable",elements:[{name:"ReactReactElement",raw:"React.ReactElement<ButtonBaseProps & { onClick?: React.MouseEventHandler }>",elements:[{name:"intersection",raw:"ButtonBaseProps & { onClick?: React.MouseEventHandler }",elements:[{name:"Polymorphic.ExtendableProps",elements:[{name:"Polymorphic.ExtendableProps",elements:[{name:"Polymorphic.ExtendableProps",elements:[{name:"intersection",raw:`StyleProps &
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
>`},{name:"intersection",raw:`SharedProps &
Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
  /**
   * Toggle design and visual variants.
   * @default primary
   */
  variant?: ButtonVariant;
  /** Mark the button as disabled. */
  disabled?: boolean;
  /** Mark the button as loading and display a spinner. */
  loading?: boolean;
  /** Mark the background and border as transparent until interacted with. */
  transparent?: boolean;
  /** Change to block and expand to 100% of parent width. */
  block?: boolean;
  /** Reduce the inner padding within the button itself. */
  compact?: boolean;
  /** Children to render within the button. */
  children: React.ReactNode;
  /** Set the start node */
  start?: React.ReactNode;
  /** Icon to render at the start of the button. */
  startIcon?: IconName;
  /** Whether the start icon is active */
  startIconActive?: boolean;
  /** Set the end node */
  end?: React.ReactNode;
  /** Icon to render at the end of the button. */
  endIcon?: IconName;
  /** Whether the end icon is active */
  endIconActive?: boolean;
  /** Ensure the button aligns flush on the left or right.
   * This prop will translate the entire button left/right,
   * so take care to ensure it is not overflowing awkwardly
   */
  flush?: 'start' | 'end';
  /** Uniquely identify the button within a form. */
  name?: string;
  /** Don't scale element on press. */
  noScaleOnPress?: boolean;
  /**
   * Truncates text after wrapping to a defined number of lines.
   * @default 1
   */
  numberOfLines?: number;
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
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},{name:"literal",value:"'accessibilityLabel'"}],raw:"Pick<SharedAccessibilityProps, 'accessibilityLabel'>"},{name:"signature",type:"object",raw:`{
  /**
   * Toggle design and visual variants.
   * @default primary
   */
  variant?: ButtonVariant;
  /** Mark the button as disabled. */
  disabled?: boolean;
  /** Mark the button as loading and display a spinner. */
  loading?: boolean;
  /** Mark the background and border as transparent until interacted with. */
  transparent?: boolean;
  /** Change to block and expand to 100% of parent width. */
  block?: boolean;
  /** Reduce the inner padding within the button itself. */
  compact?: boolean;
  /** Children to render within the button. */
  children: React.ReactNode;
  /** Set the start node */
  start?: React.ReactNode;
  /** Icon to render at the start of the button. */
  startIcon?: IconName;
  /** Whether the start icon is active */
  startIconActive?: boolean;
  /** Set the end node */
  end?: React.ReactNode;
  /** Icon to render at the end of the button. */
  endIcon?: IconName;
  /** Whether the end icon is active */
  endIconActive?: boolean;
  /** Ensure the button aligns flush on the left or right.
   * This prop will translate the entire button left/right,
   * so take care to ensure it is not overflowing awkwardly
   */
  flush?: 'start' | 'end';
  /** Uniquely identify the button within a form. */
  name?: string;
  /** Don't scale element on press. */
  noScaleOnPress?: boolean;
  /**
   * Truncates text after wrapping to a defined number of lines.
   * @default 1
   */
  numberOfLines?: number;
}`,signature:{properties:[{key:"variant",value:{name:"union",raw:`| 'primary'
| 'secondary'
| 'tertiary'
| 'positive'
| 'negative'
| 'foregroundMuted'`,elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"},{name:"literal",value:"'tertiary'"},{name:"literal",value:"'positive'"},{name:"literal",value:"'negative'"},{name:"literal",value:"'foregroundMuted'"}],required:!1},description:`Toggle design and visual variants.
@default primary`},{key:"disabled",value:{name:"boolean",required:!1},description:"Mark the button as disabled."},{key:"loading",value:{name:"boolean",required:!1},description:"Mark the button as loading and display a spinner."},{key:"transparent",value:{name:"boolean",required:!1},description:"Mark the background and border as transparent until interacted with."},{key:"block",value:{name:"boolean",required:!1},description:"Change to block and expand to 100% of parent width."},{key:"compact",value:{name:"boolean",required:!1},description:"Reduce the inner padding within the button itself."},{key:"children",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0},description:"Children to render within the button."},{key:"start",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"Set the start node"},{key:"startIcon",value:{name:"union",raw:`| 'account'
| 'activity'
| 'add'
| 'addPeople'
| 'advancedMarketSelector'
| 'advancedTradeProduct'
| 'affiliates'
| 'airdrop'
| 'airdropAlt'
| 'airdropCoins'
| 'airdropParachute'
| 'alien'
| 'allTimeHigh'
| 'allocation'
| 'annotation'
| 'api'
| 'apiPlug'
| 'apothecary'
| 'appSwitcher'
| 'apple'
| 'appleLogo'
| 'application'
| 'arrowDown'
| 'arrowLeft'
| 'arrowRight'
| 'arrowUp'
| 'arrowsHorizontal'
| 'arrowsUpDown'
| 'arrowsVertical'
| 'artwork'
| 'assetHubProduct'
| 'assetManagementProduct'
| 'astronautHelmet'
| 'atSign'
| 'atomScience'
| 'auto'
| 'autoCar'
| 'avatar'
| 'average'
| 'backArrow'
| 'ballot'
| 'ballotbox'
| 'bandage'
| 'bank'
| 'barChartSimple'
| 'barChartWindow'
| 'base'
| 'baseApps'
| 'baseFeed'
| 'baseNotification'
| 'baseQuickBuy'
| 'baseSquare'
| 'baseTransact'
| 'baseVerification'
| 'baseWallet'
| 'baseball'
| 'basketball'
| 'beaker'
| 'beginningArrow'
| 'bell'
| 'bellCheck'
| 'bellPlus'
| 'birthcertificate'
| 'block'
| 'blockchain'
| 'blog'
| 'book'
| 'bookmark'
| 'borrowProduct'
| 'boxing'
| 'bridging'
| 'briefcase'
| 'briefcaseAlt'
| 'browser'
| 'bug'
| 'building'
| 'calculator'
| 'calendar'
| 'calendarBlank'
| 'calendarDates'
| 'calendarEmpty'
| 'calendarHeart'
| 'calendarMoney'
| 'calendarStar'
| 'camera'
| 'candlesticks'
| 'car'
| 'card'
| 'caret'
| 'caretDown'
| 'caretLeft'
| 'caretRight'
| 'caretUp'
| 'cash'
| 'cashAustralianDollar'
| 'cashBrazilianReal'
| 'cashBrazillianReal'
| 'cashCanadianDollar'
| 'cashCoins'
| 'cashEUR'
| 'cashGBP'
| 'cashIndonesianRupiah'
| 'cashJPY'
| 'cashPhilippinePeso'
| 'cashPolishZloty'
| 'cashRupee'
| 'cashSingaporeDollar'
| 'cashSwissFranc'
| 'cashThaiBaht'
| 'cashTurkishLira'
| 'cashUSD'
| 'cashUaeDirham'
| 'cashVietnameseDong'
| 'chainLink'
| 'chartBar'
| 'chartCandles'
| 'chartLine'
| 'chartPie'
| 'chartPieCircle'
| 'chartVolume'
| 'chatBotAgent'
| 'chatBubble'
| 'chatRequests'
| 'checkboxChecked'
| 'checkboxEmpty'
| 'checkmark'
| 'chess'
| 'circleCheckmark'
| 'circleCross'
| 'circulatingSupply'
| 'city'
| 'clipboard'
| 'clock'
| 'clockOutline'
| 'close'
| 'closeCaption'
| 'clothing'
| 'cloud'
| 'cloudPartial'
| 'cloudProduct'
| 'cluster'
| 'coinbase'
| 'coinbaseCardProduct'
| 'coinbaseOne'
| 'coinbaseOneCard'
| 'coinbaseOneLogo'
| 'coinbaseRewards'
| 'coinsCrypto'
| 'collapse'
| 'collectibles'
| 'collection'
| 'comment'
| 'commentPlus'
| 'commerceProduct'
| 'compass'
| 'complianceProduct'
| 'compose'
| 'computerChip'
| 'concierge'
| 'conciergeBell'
| 'config'
| 'continuous'
| 'convert'
| 'copy'
| 'corporation'
| 'creatorCoin'
| 'cricket'
| 'cross'
| 'crossTrade'
| 'crypto'
| 'cryptobasics'
| 'crystalBall'
| 'crystalBallInsight'
| 'currencies'
| 'custodyProduct'
| 'dashboard'
| 'dataMarketplaceProduct'
| 'dataStack'
| 'defi'
| 'delegateProduct'
| 'deposit'
| 'derivatives'
| 'derivativesProduct'
| 'derivativesProductNew'
| 'developerAPIProduct'
| 'developerPlatformProduct'
| 'dex'
| 'diagonalDownArrow'
| 'diagonalRightArrow'
| 'diagonalUpArrow'
| 'diamond'
| 'diamondIncentives'
| 'dinnerPlate'
| 'directDeposit'
| 'directDepositIcon'
| 'disabledPhone'
| 'discordLogo'
| 'distribution'
| 'document'
| 'documentation'
| 'dot'
| 'doubleChevronRight'
| 'downArrow'
| 'download'
| 'drag'
| 'drops'
| 'earn'
| 'earnProduct'
| 'earnRewards'
| 'earthquake'
| 'educationBook'
| 'educationPencil'
| 'email'
| 'endArrow'
| 'entertainment'
| 'error'
| 'ethereum'
| 'eventContracts'
| 'exchangeProduct'
| 'exclamationMark'
| 'expand'
| 'expandAddress'
| 'expandAll'
| 'externalLink'
| 'eye'
| 'faceScan'
| 'faces'
| 'factory'
| 'faucet'
| 'fib'
| 'filmStrip'
| 'filter'
| 'fingerprint'
| 'flame'
| 'folder'
| 'folderArrow'
| 'folderOpen'
| 'followAdd'
| 'following'
| 'football'
| 'fork'
| 'forwardArrow'
| 'fscsProtection'
| 'gab'
| 'games'
| 'gaming'
| 'gasFees'
| 'gasFeesAlt'
| 'gauge'
| 'gaugeEmpty'
| 'gaugeHigh'
| 'gaugeHighLow'
| 'gaugeHighMid'
| 'gaugeLow'
| 'gaugeLowHigh'
| 'gaugeLowMid'
| 'gaugeMedium'
| 'gavel'
| 'gear'
| 'generalCharacter'
| 'ghost'
| 'gif'
| 'giftBox'
| 'giftCard'
| 'gitHubLogo'
| 'globe'
| 'golf'
| 'googleLogo'
| 'greenEnergy'
| 'grid'
| 'group'
| 'hamburger'
| 'hammer'
| 'heart'
| 'helpCenterProduct'
| 'helpCenterQuestionMark'
| 'hiddenEye'
| 'hockey'
| 'home'
| 'horizontalLine'
| 'hospital'
| 'hospitalCross'
| 'hurricane'
| 'ideal'
| 'identityCard'
| 'image'
| 'info'
| 'initiator'
| 'instagramLogo'
| 'instantUnstakingClock'
| 'institute'
| 'institutionalProduct'
| 'interest'
| 'invisible'
| 'invoice'
| 'key'
| 'keyboard'
| 'laptop'
| 'leadChart'
| 'leadCoin'
| 'learningRewardsProduct'
| 'light'
| 'lightbulb'
| 'lightning'
| 'lightningBolt'
| 'lineChartCrypto'
| 'list'
| 'location'
| 'lock'
| 'login'
| 'logout'
| 'loop'
| 'magnifyingGlass'
| 'marketCap'
| 'medal'
| 'megaphone'
| 'menu'
| 'metaverse'
| 'microphone'
| 'microphoneCordless'
| 'microscope'
| 'mint'
| 'minus'
| 'mma'
| 'moneyCardCoin'
| 'moon'
| 'more'
| 'moreVertical'
| 'motorsport'
| 'music'
| 'musicArticles'
| 'needle'
| 'newsFeed'
| 'newsletter'
| 'nft'
| 'nftBuy'
| 'nftOffer'
| 'nftProduct'
| 'nftSale'
| 'noRocket'
| 'noWifi'
| 'nodeProduct'
| 'oil'
| 'options'
| 'orderBook'
| 'orderHistory'
| 'outline'
| 'pFPS'
| 'paperAirplane'
| 'paperclip'
| 'participate'
| 'participateProduct'
| 'passKey'
| 'passport'
| 'pause'
| 'pay'
| 'payProduct'
| 'paymentCard'
| 'payments'
| 'payouts'
| 'paypal'
| 'pencil'
| 'peopleGroup'
| 'peopleStar'
| 'percentage'
| 'perpetualSwap'
| 'phone'
| 'pieChartData'
| 'pillBottle'
| 'pillCapsule'
| 'pin'
| 'plane'
| 'planet'
| 'play'
| 'playbutton'
| 'plusMinus'
| 'podiumStar'
| 'politicsBuilding'
| 'politicsCandidate'
| 'politicsFlag'
| 'politicsGavel'
| 'politicsPodium'
| 'politicsStar'
| 'powerTool'
| 'priceAlerts'
| 'priceAlertsCheck'
| 'primePoduct'
| 'privateClientProduct'
| 'proProduct'
| 'profile'
| 'protection'
| 'pulse'
| 'pyramid'
| 'qrCode'
| 'qrCodeAlt'
| 'queryTransact'
| 'questionMark'
| 'quotation'
| 'rain'
| 'ratingsCheck'
| 'ratingsChecks'
| 'ratingsStar'
| 'reCenter'
| 'rectangle'
| 'recurring'
| 'refresh'
| 'regulated'
| 'regulatedFutures'
| 'report'
| 'rewardsProduct'
| 'ribbon'
| 'robot'
| 'rocket'
| 'rocketShip'
| 'rollingSpot'
| 'rosettaProduct'
| 'rottenTomato'
| 'royalty'
| 'safe'
| 'save'
| 'savingsBank'
| 'scanQrCode'
| 'scienceAtom'
| 'scienceBeaker'
| 'scienceMoon'
| 'search'
| 'securityKey'
| 'securityShield'
| 'seen'
| 'sendReceive'
| 'setPinCode'
| 'settings'
| 'share'
| 'shield'
| 'shieldOutline'
| 'shoe'
| 'shoppingCart'
| 'signinProduct'
| 'singleCoin'
| 'singleNote'
| 'singlecloud'
| 'smartContract'
| 'snow'
| 'soccer'
| 'socialChat'
| 'socialReshare'
| 'socialShare'
| 'sofort'
| 'sortDoubleArrow'
| 'sortDown'
| 'sortDownCenter'
| 'sortUp'
| 'sortUpCenter'
| 'soundOff'
| 'soundOn'
| 'sparkle'
| 'speaker'
| 'speechBubble'
| 'stableCoin'
| 'stablecoinStack'
| 'staggeredList'
| 'stake'
| 'staking'
| 'star'
| 'starAward'
| 'starBubble'
| 'starTrophy'
| 'statusDot'
| 'step0'
| 'step1'
| 'step2'
| 'step3'
| 'step4'
| 'step5'
| 'step6'
| 'step7'
| 'step8'
| 'step9'
| 'strategy'
| 'sun'
| 'support'
| 'tag'
| 'taxes'
| 'taxesReceipt'
| 'telephone'
| 'tennis'
| 'test'
| 'thermometer'
| 'thumbsDown'
| 'thumbsDownOutline'
| 'thumbsUp'
| 'thumbsUpOutline'
| 'tokenLaunchCoin'
| 'tokenLaunchRocket'
| 'tokenSales'
| 'tornado'
| 'trading'
| 'transactions'
| 'trashCan'
| 'trophy'
| 'trophyCup'
| 'tshirt'
| 'tv'
| 'tvStand'
| 'twitterLogo'
| 'ultility'
| 'umbrella'
| 'undo'
| 'unfollowPeople'
| 'unknown'
| 'unlock'
| 'upArrow'
| 'upload'
| 'venturesProduct'
| 'verifiedBadge'
| 'verifiedPools'
| 'verticalLine'
| 'virus'
| 'visible'
| 'waasProduct'
| 'wallet'
| 'walletLogo'
| 'walletProduct'
| 'warning'
| 'webhooks'
| 'wellness'
| 'wifi'
| 'wind'
| 'wireTransfer'
| 'withdraw'
| 'wrapToken'
| 'xLogo'`,elements:[{name:"literal",value:"'account'"},{name:"literal",value:"'activity'"},{name:"literal",value:"'add'"},{name:"literal",value:"'addPeople'"},{name:"literal",value:"'advancedMarketSelector'"},{name:"literal",value:"'advancedTradeProduct'"},{name:"literal",value:"'affiliates'"},{name:"literal",value:"'airdrop'"},{name:"literal",value:"'airdropAlt'"},{name:"literal",value:"'airdropCoins'"},{name:"literal",value:"'airdropParachute'"},{name:"literal",value:"'alien'"},{name:"literal",value:"'allTimeHigh'"},{name:"literal",value:"'allocation'"},{name:"literal",value:"'annotation'"},{name:"literal",value:"'api'"},{name:"literal",value:"'apiPlug'"},{name:"literal",value:"'apothecary'"},{name:"literal",value:"'appSwitcher'"},{name:"literal",value:"'apple'"},{name:"literal",value:"'appleLogo'"},{name:"literal",value:"'application'"},{name:"literal",value:"'arrowDown'"},{name:"literal",value:"'arrowLeft'"},{name:"literal",value:"'arrowRight'"},{name:"literal",value:"'arrowUp'"},{name:"literal",value:"'arrowsHorizontal'"},{name:"literal",value:"'arrowsUpDown'"},{name:"literal",value:"'arrowsVertical'"},{name:"literal",value:"'artwork'"},{name:"literal",value:"'assetHubProduct'"},{name:"literal",value:"'assetManagementProduct'"},{name:"literal",value:"'astronautHelmet'"},{name:"literal",value:"'atSign'"},{name:"literal",value:"'atomScience'"},{name:"literal",value:"'auto'"},{name:"literal",value:"'autoCar'"},{name:"literal",value:"'avatar'"},{name:"literal",value:"'average'"},{name:"literal",value:"'backArrow'"},{name:"literal",value:"'ballot'"},{name:"literal",value:"'ballotbox'"},{name:"literal",value:"'bandage'"},{name:"literal",value:"'bank'"},{name:"literal",value:"'barChartSimple'"},{name:"literal",value:"'barChartWindow'"},{name:"literal",value:"'base'"},{name:"literal",value:"'baseApps'"},{name:"literal",value:"'baseFeed'"},{name:"literal",value:"'baseNotification'"},{name:"literal",value:"'baseQuickBuy'"},{name:"literal",value:"'baseSquare'"},{name:"literal",value:"'baseTransact'"},{name:"literal",value:"'baseVerification'"},{name:"literal",value:"'baseWallet'"},{name:"literal",value:"'baseball'"},{name:"literal",value:"'basketball'"},{name:"literal",value:"'beaker'"},{name:"literal",value:"'beginningArrow'"},{name:"literal",value:"'bell'"},{name:"literal",value:"'bellCheck'"},{name:"literal",value:"'bellPlus'"},{name:"literal",value:"'birthcertificate'"},{name:"literal",value:"'block'"},{name:"literal",value:"'blockchain'"},{name:"literal",value:"'blog'"},{name:"literal",value:"'book'"},{name:"literal",value:"'bookmark'"},{name:"literal",value:"'borrowProduct'"},{name:"literal",value:"'boxing'"},{name:"literal",value:"'bridging'"},{name:"literal",value:"'briefcase'"},{name:"literal",value:"'briefcaseAlt'"},{name:"literal",value:"'browser'"},{name:"literal",value:"'bug'"},{name:"literal",value:"'building'"},{name:"literal",value:"'calculator'"},{name:"literal",value:"'calendar'"},{name:"literal",value:"'calendarBlank'"},{name:"literal",value:"'calendarDates'"},{name:"literal",value:"'calendarEmpty'"},{name:"literal",value:"'calendarHeart'"},{name:"literal",value:"'calendarMoney'"},{name:"literal",value:"'calendarStar'"},{name:"literal",value:"'camera'"},{name:"literal",value:"'candlesticks'"},{name:"literal",value:"'car'"},{name:"literal",value:"'card'"},{name:"literal",value:"'caret'"},{name:"literal",value:"'caretDown'"},{name:"literal",value:"'caretLeft'"},{name:"literal",value:"'caretRight'"},{name:"literal",value:"'caretUp'"},{name:"literal",value:"'cash'"},{name:"literal",value:"'cashAustralianDollar'"},{name:"literal",value:"'cashBrazilianReal'"},{name:"literal",value:"'cashBrazillianReal'"},{name:"literal",value:"'cashCanadianDollar'"},{name:"literal",value:"'cashCoins'"},{name:"literal",value:"'cashEUR'"},{name:"literal",value:"'cashGBP'"},{name:"literal",value:"'cashIndonesianRupiah'"},{name:"literal",value:"'cashJPY'"},{name:"literal",value:"'cashPhilippinePeso'"},{name:"literal",value:"'cashPolishZloty'"},{name:"literal",value:"'cashRupee'"},{name:"literal",value:"'cashSingaporeDollar'"},{name:"literal",value:"'cashSwissFranc'"},{name:"literal",value:"'cashThaiBaht'"},{name:"literal",value:"'cashTurkishLira'"},{name:"literal",value:"'cashUSD'"},{name:"literal",value:"'cashUaeDirham'"},{name:"literal",value:"'cashVietnameseDong'"},{name:"literal",value:"'chainLink'"},{name:"literal",value:"'chartBar'"},{name:"literal",value:"'chartCandles'"},{name:"literal",value:"'chartLine'"},{name:"literal",value:"'chartPie'"},{name:"literal",value:"'chartPieCircle'"},{name:"literal",value:"'chartVolume'"},{name:"literal",value:"'chatBotAgent'"},{name:"literal",value:"'chatBubble'"},{name:"literal",value:"'chatRequests'"},{name:"literal",value:"'checkboxChecked'"},{name:"literal",value:"'checkboxEmpty'"},{name:"literal",value:"'checkmark'"},{name:"literal",value:"'chess'"},{name:"literal",value:"'circleCheckmark'"},{name:"literal",value:"'circleCross'"},{name:"literal",value:"'circulatingSupply'"},{name:"literal",value:"'city'"},{name:"literal",value:"'clipboard'"},{name:"literal",value:"'clock'"},{name:"literal",value:"'clockOutline'"},{name:"literal",value:"'close'"},{name:"literal",value:"'closeCaption'"},{name:"literal",value:"'clothing'"},{name:"literal",value:"'cloud'"},{name:"literal",value:"'cloudPartial'"},{name:"literal",value:"'cloudProduct'"},{name:"literal",value:"'cluster'"},{name:"literal",value:"'coinbase'"},{name:"literal",value:"'coinbaseCardProduct'"},{name:"literal",value:"'coinbaseOne'"},{name:"literal",value:"'coinbaseOneCard'"},{name:"literal",value:"'coinbaseOneLogo'"},{name:"literal",value:"'coinbaseRewards'"},{name:"literal",value:"'coinsCrypto'"},{name:"literal",value:"'collapse'"},{name:"literal",value:"'collectibles'"},{name:"literal",value:"'collection'"},{name:"literal",value:"'comment'"},{name:"literal",value:"'commentPlus'"},{name:"literal",value:"'commerceProduct'"},{name:"literal",value:"'compass'"},{name:"literal",value:"'complianceProduct'"},{name:"literal",value:"'compose'"},{name:"literal",value:"'computerChip'"},{name:"literal",value:"'concierge'"},{name:"literal",value:"'conciergeBell'"},{name:"literal",value:"'config'"},{name:"literal",value:"'continuous'"},{name:"literal",value:"'convert'"},{name:"literal",value:"'copy'"},{name:"literal",value:"'corporation'"},{name:"literal",value:"'creatorCoin'"},{name:"literal",value:"'cricket'"},{name:"literal",value:"'cross'"},{name:"literal",value:"'crossTrade'"},{name:"literal",value:"'crypto'"},{name:"literal",value:"'cryptobasics'"},{name:"literal",value:"'crystalBall'"},{name:"literal",value:"'crystalBallInsight'"},{name:"literal",value:"'currencies'"},{name:"literal",value:"'custodyProduct'"},{name:"literal",value:"'dashboard'"},{name:"literal",value:"'dataMarketplaceProduct'"},{name:"literal",value:"'dataStack'"},{name:"literal",value:"'defi'"},{name:"literal",value:"'delegateProduct'"},{name:"literal",value:"'deposit'"},{name:"literal",value:"'derivatives'"},{name:"literal",value:"'derivativesProduct'"},{name:"literal",value:"'derivativesProductNew'"},{name:"literal",value:"'developerAPIProduct'"},{name:"literal",value:"'developerPlatformProduct'"},{name:"literal",value:"'dex'"},{name:"literal",value:"'diagonalDownArrow'"},{name:"literal",value:"'diagonalRightArrow'"},{name:"literal",value:"'diagonalUpArrow'"},{name:"literal",value:"'diamond'"},{name:"literal",value:"'diamondIncentives'"},{name:"literal",value:"'dinnerPlate'"},{name:"literal",value:"'directDeposit'"},{name:"literal",value:"'directDepositIcon'"},{name:"literal",value:"'disabledPhone'"},{name:"literal",value:"'discordLogo'"},{name:"literal",value:"'distribution'"},{name:"literal",value:"'document'"},{name:"literal",value:"'documentation'"},{name:"literal",value:"'dot'"},{name:"literal",value:"'doubleChevronRight'"},{name:"literal",value:"'downArrow'"},{name:"literal",value:"'download'"},{name:"literal",value:"'drag'"},{name:"literal",value:"'drops'"},{name:"literal",value:"'earn'"},{name:"literal",value:"'earnProduct'"},{name:"literal",value:"'earnRewards'"},{name:"literal",value:"'earthquake'"},{name:"literal",value:"'educationBook'"},{name:"literal",value:"'educationPencil'"},{name:"literal",value:"'email'"},{name:"literal",value:"'endArrow'"},{name:"literal",value:"'entertainment'"},{name:"literal",value:"'error'"},{name:"literal",value:"'ethereum'"},{name:"literal",value:"'eventContracts'"},{name:"literal",value:"'exchangeProduct'"},{name:"literal",value:"'exclamationMark'"},{name:"literal",value:"'expand'"},{name:"literal",value:"'expandAddress'"},{name:"literal",value:"'expandAll'"},{name:"literal",value:"'externalLink'"},{name:"literal",value:"'eye'"},{name:"literal",value:"'faceScan'"},{name:"literal",value:"'faces'"},{name:"literal",value:"'factory'"},{name:"literal",value:"'faucet'"},{name:"literal",value:"'fib'"},{name:"literal",value:"'filmStrip'"},{name:"literal",value:"'filter'"},{name:"literal",value:"'fingerprint'"},{name:"literal",value:"'flame'"},{name:"literal",value:"'folder'"},{name:"literal",value:"'folderArrow'"},{name:"literal",value:"'folderOpen'"},{name:"literal",value:"'followAdd'"},{name:"literal",value:"'following'"},{name:"literal",value:"'football'"},{name:"literal",value:"'fork'"},{name:"literal",value:"'forwardArrow'"},{name:"literal",value:"'fscsProtection'"},{name:"literal",value:"'gab'"},{name:"literal",value:"'games'"},{name:"literal",value:"'gaming'"},{name:"literal",value:"'gasFees'"},{name:"literal",value:"'gasFeesAlt'"},{name:"literal",value:"'gauge'"},{name:"literal",value:"'gaugeEmpty'"},{name:"literal",value:"'gaugeHigh'"},{name:"literal",value:"'gaugeHighLow'"},{name:"literal",value:"'gaugeHighMid'"},{name:"literal",value:"'gaugeLow'"},{name:"literal",value:"'gaugeLowHigh'"},{name:"literal",value:"'gaugeLowMid'"},{name:"literal",value:"'gaugeMedium'"},{name:"literal",value:"'gavel'"},{name:"literal",value:"'gear'"},{name:"literal",value:"'generalCharacter'"},{name:"literal",value:"'ghost'"},{name:"literal",value:"'gif'"},{name:"literal",value:"'giftBox'"},{name:"literal",value:"'giftCard'"},{name:"literal",value:"'gitHubLogo'"},{name:"literal",value:"'globe'"},{name:"literal",value:"'golf'"},{name:"literal",value:"'googleLogo'"},{name:"literal",value:"'greenEnergy'"},{name:"literal",value:"'grid'"},{name:"literal",value:"'group'"},{name:"literal",value:"'hamburger'"},{name:"literal",value:"'hammer'"},{name:"literal",value:"'heart'"},{name:"literal",value:"'helpCenterProduct'"},{name:"literal",value:"'helpCenterQuestionMark'"},{name:"literal",value:"'hiddenEye'"},{name:"literal",value:"'hockey'"},{name:"literal",value:"'home'"},{name:"literal",value:"'horizontalLine'"},{name:"literal",value:"'hospital'"},{name:"literal",value:"'hospitalCross'"},{name:"literal",value:"'hurricane'"},{name:"literal",value:"'ideal'"},{name:"literal",value:"'identityCard'"},{name:"literal",value:"'image'"},{name:"literal",value:"'info'"},{name:"literal",value:"'initiator'"},{name:"literal",value:"'instagramLogo'"},{name:"literal",value:"'instantUnstakingClock'"},{name:"literal",value:"'institute'"},{name:"literal",value:"'institutionalProduct'"},{name:"literal",value:"'interest'"},{name:"literal",value:"'invisible'"},{name:"literal",value:"'invoice'"},{name:"literal",value:"'key'"},{name:"literal",value:"'keyboard'"},{name:"literal",value:"'laptop'"},{name:"literal",value:"'leadChart'"},{name:"literal",value:"'leadCoin'"},{name:"literal",value:"'learningRewardsProduct'"},{name:"literal",value:"'light'"},{name:"literal",value:"'lightbulb'"},{name:"literal",value:"'lightning'"},{name:"literal",value:"'lightningBolt'"},{name:"literal",value:"'lineChartCrypto'"},{name:"literal",value:"'list'"},{name:"literal",value:"'location'"},{name:"literal",value:"'lock'"},{name:"literal",value:"'login'"},{name:"literal",value:"'logout'"},{name:"literal",value:"'loop'"},{name:"literal",value:"'magnifyingGlass'"},{name:"literal",value:"'marketCap'"},{name:"literal",value:"'medal'"},{name:"literal",value:"'megaphone'"},{name:"literal",value:"'menu'"},{name:"literal",value:"'metaverse'"},{name:"literal",value:"'microphone'"},{name:"literal",value:"'microphoneCordless'"},{name:"literal",value:"'microscope'"},{name:"literal",value:"'mint'"},{name:"literal",value:"'minus'"},{name:"literal",value:"'mma'"},{name:"literal",value:"'moneyCardCoin'"},{name:"literal",value:"'moon'"},{name:"literal",value:"'more'"},{name:"literal",value:"'moreVertical'"},{name:"literal",value:"'motorsport'"},{name:"literal",value:"'music'"},{name:"literal",value:"'musicArticles'"},{name:"literal",value:"'needle'"},{name:"literal",value:"'newsFeed'"},{name:"literal",value:"'newsletter'"},{name:"literal",value:"'nft'"},{name:"literal",value:"'nftBuy'"},{name:"literal",value:"'nftOffer'"},{name:"literal",value:"'nftProduct'"},{name:"literal",value:"'nftSale'"},{name:"literal",value:"'noRocket'"},{name:"literal",value:"'noWifi'"},{name:"literal",value:"'nodeProduct'"},{name:"literal",value:"'oil'"},{name:"literal",value:"'options'"},{name:"literal",value:"'orderBook'"},{name:"literal",value:"'orderHistory'"},{name:"literal",value:"'outline'"},{name:"literal",value:"'pFPS'"},{name:"literal",value:"'paperAirplane'"},{name:"literal",value:"'paperclip'"},{name:"literal",value:"'participate'"},{name:"literal",value:"'participateProduct'"},{name:"literal",value:"'passKey'"},{name:"literal",value:"'passport'"},{name:"literal",value:"'pause'"},{name:"literal",value:"'pay'"},{name:"literal",value:"'payProduct'"},{name:"literal",value:"'paymentCard'"},{name:"literal",value:"'payments'"},{name:"literal",value:"'payouts'"},{name:"literal",value:"'paypal'"},{name:"literal",value:"'pencil'"},{name:"literal",value:"'peopleGroup'"},{name:"literal",value:"'peopleStar'"},{name:"literal",value:"'percentage'"},{name:"literal",value:"'perpetualSwap'"},{name:"literal",value:"'phone'"},{name:"literal",value:"'pieChartData'"},{name:"literal",value:"'pillBottle'"},{name:"literal",value:"'pillCapsule'"},{name:"literal",value:"'pin'"},{name:"literal",value:"'plane'"},{name:"literal",value:"'planet'"},{name:"literal",value:"'play'"},{name:"literal",value:"'playbutton'"},{name:"literal",value:"'plusMinus'"},{name:"literal",value:"'podiumStar'"},{name:"literal",value:"'politicsBuilding'"},{name:"literal",value:"'politicsCandidate'"},{name:"literal",value:"'politicsFlag'"},{name:"literal",value:"'politicsGavel'"},{name:"literal",value:"'politicsPodium'"},{name:"literal",value:"'politicsStar'"},{name:"literal",value:"'powerTool'"},{name:"literal",value:"'priceAlerts'"},{name:"literal",value:"'priceAlertsCheck'"},{name:"literal",value:"'primePoduct'"},{name:"literal",value:"'privateClientProduct'"},{name:"literal",value:"'proProduct'"},{name:"literal",value:"'profile'"},{name:"literal",value:"'protection'"},{name:"literal",value:"'pulse'"},{name:"literal",value:"'pyramid'"},{name:"literal",value:"'qrCode'"},{name:"literal",value:"'qrCodeAlt'"},{name:"literal",value:"'queryTransact'"},{name:"literal",value:"'questionMark'"},{name:"literal",value:"'quotation'"},{name:"literal",value:"'rain'"},{name:"literal",value:"'ratingsCheck'"},{name:"literal",value:"'ratingsChecks'"},{name:"literal",value:"'ratingsStar'"},{name:"literal",value:"'reCenter'"},{name:"literal",value:"'rectangle'"},{name:"literal",value:"'recurring'"},{name:"literal",value:"'refresh'"},{name:"literal",value:"'regulated'"},{name:"literal",value:"'regulatedFutures'"},{name:"literal",value:"'report'"},{name:"literal",value:"'rewardsProduct'"},{name:"literal",value:"'ribbon'"},{name:"literal",value:"'robot'"},{name:"literal",value:"'rocket'"},{name:"literal",value:"'rocketShip'"},{name:"literal",value:"'rollingSpot'"},{name:"literal",value:"'rosettaProduct'"},{name:"literal",value:"'rottenTomato'"},{name:"literal",value:"'royalty'"},{name:"literal",value:"'safe'"},{name:"literal",value:"'save'"},{name:"literal",value:"'savingsBank'"},{name:"literal",value:"'scanQrCode'"},{name:"literal",value:"'scienceAtom'"},{name:"literal",value:"'scienceBeaker'"},{name:"literal",value:"'scienceMoon'"},{name:"literal",value:"'search'"},{name:"literal",value:"'securityKey'"},{name:"literal",value:"'securityShield'"},{name:"literal",value:"'seen'"},{name:"literal",value:"'sendReceive'"},{name:"literal",value:"'setPinCode'"},{name:"literal",value:"'settings'"},{name:"literal",value:"'share'"},{name:"literal",value:"'shield'"},{name:"literal",value:"'shieldOutline'"},{name:"literal",value:"'shoe'"},{name:"literal",value:"'shoppingCart'"},{name:"literal",value:"'signinProduct'"},{name:"literal",value:"'singleCoin'"},{name:"literal",value:"'singleNote'"},{name:"literal",value:"'singlecloud'"},{name:"literal",value:"'smartContract'"},{name:"literal",value:"'snow'"},{name:"literal",value:"'soccer'"},{name:"literal",value:"'socialChat'"},{name:"literal",value:"'socialReshare'"},{name:"literal",value:"'socialShare'"},{name:"literal",value:"'sofort'"},{name:"literal",value:"'sortDoubleArrow'"},{name:"literal",value:"'sortDown'"},{name:"literal",value:"'sortDownCenter'"},{name:"literal",value:"'sortUp'"},{name:"literal",value:"'sortUpCenter'"},{name:"literal",value:"'soundOff'"},{name:"literal",value:"'soundOn'"},{name:"literal",value:"'sparkle'"},{name:"literal",value:"'speaker'"},{name:"literal",value:"'speechBubble'"},{name:"literal",value:"'stableCoin'"},{name:"literal",value:"'stablecoinStack'"},{name:"literal",value:"'staggeredList'"},{name:"literal",value:"'stake'"},{name:"literal",value:"'staking'"},{name:"literal",value:"'star'"},{name:"literal",value:"'starAward'"},{name:"literal",value:"'starBubble'"},{name:"literal",value:"'starTrophy'"},{name:"literal",value:"'statusDot'"},{name:"literal",value:"'step0'"},{name:"literal",value:"'step1'"},{name:"literal",value:"'step2'"},{name:"literal",value:"'step3'"},{name:"literal",value:"'step4'"},{name:"literal",value:"'step5'"},{name:"literal",value:"'step6'"},{name:"literal",value:"'step7'"},{name:"literal",value:"'step8'"},{name:"literal",value:"'step9'"},{name:"literal",value:"'strategy'"},{name:"literal",value:"'sun'"},{name:"literal",value:"'support'"},{name:"literal",value:"'tag'"},{name:"literal",value:"'taxes'"},{name:"literal",value:"'taxesReceipt'"},{name:"literal",value:"'telephone'"},{name:"literal",value:"'tennis'"},{name:"literal",value:"'test'"},{name:"literal",value:"'thermometer'"},{name:"literal",value:"'thumbsDown'"},{name:"literal",value:"'thumbsDownOutline'"},{name:"literal",value:"'thumbsUp'"},{name:"literal",value:"'thumbsUpOutline'"},{name:"literal",value:"'tokenLaunchCoin'"},{name:"literal",value:"'tokenLaunchRocket'"},{name:"literal",value:"'tokenSales'"},{name:"literal",value:"'tornado'"},{name:"literal",value:"'trading'"},{name:"literal",value:"'transactions'"},{name:"literal",value:"'trashCan'"},{name:"literal",value:"'trophy'"},{name:"literal",value:"'trophyCup'"},{name:"literal",value:"'tshirt'"},{name:"literal",value:"'tv'"},{name:"literal",value:"'tvStand'"},{name:"literal",value:"'twitterLogo'"},{name:"literal",value:"'ultility'"},{name:"literal",value:"'umbrella'"},{name:"literal",value:"'undo'"},{name:"literal",value:"'unfollowPeople'"},{name:"literal",value:"'unknown'"},{name:"literal",value:"'unlock'"},{name:"literal",value:"'upArrow'"},{name:"literal",value:"'upload'"},{name:"literal",value:"'venturesProduct'"},{name:"literal",value:"'verifiedBadge'"},{name:"literal",value:"'verifiedPools'"},{name:"literal",value:"'verticalLine'"},{name:"literal",value:"'virus'"},{name:"literal",value:"'visible'"},{name:"literal",value:"'waasProduct'"},{name:"literal",value:"'wallet'"},{name:"literal",value:"'walletLogo'"},{name:"literal",value:"'walletProduct'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'webhooks'"},{name:"literal",value:"'wellness'"},{name:"literal",value:"'wifi'"},{name:"literal",value:"'wind'"},{name:"literal",value:"'wireTransfer'"},{name:"literal",value:"'withdraw'"},{name:"literal",value:"'wrapToken'"},{name:"literal",value:"'xLogo'"}],required:!1},description:"Icon to render at the start of the button."},{key:"startIconActive",value:{name:"boolean",required:!1},description:"Whether the start icon is active"},{key:"end",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"Set the end node"},{key:"endIcon",value:{name:"union",raw:`| 'account'
| 'activity'
| 'add'
| 'addPeople'
| 'advancedMarketSelector'
| 'advancedTradeProduct'
| 'affiliates'
| 'airdrop'
| 'airdropAlt'
| 'airdropCoins'
| 'airdropParachute'
| 'alien'
| 'allTimeHigh'
| 'allocation'
| 'annotation'
| 'api'
| 'apiPlug'
| 'apothecary'
| 'appSwitcher'
| 'apple'
| 'appleLogo'
| 'application'
| 'arrowDown'
| 'arrowLeft'
| 'arrowRight'
| 'arrowUp'
| 'arrowsHorizontal'
| 'arrowsUpDown'
| 'arrowsVertical'
| 'artwork'
| 'assetHubProduct'
| 'assetManagementProduct'
| 'astronautHelmet'
| 'atSign'
| 'atomScience'
| 'auto'
| 'autoCar'
| 'avatar'
| 'average'
| 'backArrow'
| 'ballot'
| 'ballotbox'
| 'bandage'
| 'bank'
| 'barChartSimple'
| 'barChartWindow'
| 'base'
| 'baseApps'
| 'baseFeed'
| 'baseNotification'
| 'baseQuickBuy'
| 'baseSquare'
| 'baseTransact'
| 'baseVerification'
| 'baseWallet'
| 'baseball'
| 'basketball'
| 'beaker'
| 'beginningArrow'
| 'bell'
| 'bellCheck'
| 'bellPlus'
| 'birthcertificate'
| 'block'
| 'blockchain'
| 'blog'
| 'book'
| 'bookmark'
| 'borrowProduct'
| 'boxing'
| 'bridging'
| 'briefcase'
| 'briefcaseAlt'
| 'browser'
| 'bug'
| 'building'
| 'calculator'
| 'calendar'
| 'calendarBlank'
| 'calendarDates'
| 'calendarEmpty'
| 'calendarHeart'
| 'calendarMoney'
| 'calendarStar'
| 'camera'
| 'candlesticks'
| 'car'
| 'card'
| 'caret'
| 'caretDown'
| 'caretLeft'
| 'caretRight'
| 'caretUp'
| 'cash'
| 'cashAustralianDollar'
| 'cashBrazilianReal'
| 'cashBrazillianReal'
| 'cashCanadianDollar'
| 'cashCoins'
| 'cashEUR'
| 'cashGBP'
| 'cashIndonesianRupiah'
| 'cashJPY'
| 'cashPhilippinePeso'
| 'cashPolishZloty'
| 'cashRupee'
| 'cashSingaporeDollar'
| 'cashSwissFranc'
| 'cashThaiBaht'
| 'cashTurkishLira'
| 'cashUSD'
| 'cashUaeDirham'
| 'cashVietnameseDong'
| 'chainLink'
| 'chartBar'
| 'chartCandles'
| 'chartLine'
| 'chartPie'
| 'chartPieCircle'
| 'chartVolume'
| 'chatBotAgent'
| 'chatBubble'
| 'chatRequests'
| 'checkboxChecked'
| 'checkboxEmpty'
| 'checkmark'
| 'chess'
| 'circleCheckmark'
| 'circleCross'
| 'circulatingSupply'
| 'city'
| 'clipboard'
| 'clock'
| 'clockOutline'
| 'close'
| 'closeCaption'
| 'clothing'
| 'cloud'
| 'cloudPartial'
| 'cloudProduct'
| 'cluster'
| 'coinbase'
| 'coinbaseCardProduct'
| 'coinbaseOne'
| 'coinbaseOneCard'
| 'coinbaseOneLogo'
| 'coinbaseRewards'
| 'coinsCrypto'
| 'collapse'
| 'collectibles'
| 'collection'
| 'comment'
| 'commentPlus'
| 'commerceProduct'
| 'compass'
| 'complianceProduct'
| 'compose'
| 'computerChip'
| 'concierge'
| 'conciergeBell'
| 'config'
| 'continuous'
| 'convert'
| 'copy'
| 'corporation'
| 'creatorCoin'
| 'cricket'
| 'cross'
| 'crossTrade'
| 'crypto'
| 'cryptobasics'
| 'crystalBall'
| 'crystalBallInsight'
| 'currencies'
| 'custodyProduct'
| 'dashboard'
| 'dataMarketplaceProduct'
| 'dataStack'
| 'defi'
| 'delegateProduct'
| 'deposit'
| 'derivatives'
| 'derivativesProduct'
| 'derivativesProductNew'
| 'developerAPIProduct'
| 'developerPlatformProduct'
| 'dex'
| 'diagonalDownArrow'
| 'diagonalRightArrow'
| 'diagonalUpArrow'
| 'diamond'
| 'diamondIncentives'
| 'dinnerPlate'
| 'directDeposit'
| 'directDepositIcon'
| 'disabledPhone'
| 'discordLogo'
| 'distribution'
| 'document'
| 'documentation'
| 'dot'
| 'doubleChevronRight'
| 'downArrow'
| 'download'
| 'drag'
| 'drops'
| 'earn'
| 'earnProduct'
| 'earnRewards'
| 'earthquake'
| 'educationBook'
| 'educationPencil'
| 'email'
| 'endArrow'
| 'entertainment'
| 'error'
| 'ethereum'
| 'eventContracts'
| 'exchangeProduct'
| 'exclamationMark'
| 'expand'
| 'expandAddress'
| 'expandAll'
| 'externalLink'
| 'eye'
| 'faceScan'
| 'faces'
| 'factory'
| 'faucet'
| 'fib'
| 'filmStrip'
| 'filter'
| 'fingerprint'
| 'flame'
| 'folder'
| 'folderArrow'
| 'folderOpen'
| 'followAdd'
| 'following'
| 'football'
| 'fork'
| 'forwardArrow'
| 'fscsProtection'
| 'gab'
| 'games'
| 'gaming'
| 'gasFees'
| 'gasFeesAlt'
| 'gauge'
| 'gaugeEmpty'
| 'gaugeHigh'
| 'gaugeHighLow'
| 'gaugeHighMid'
| 'gaugeLow'
| 'gaugeLowHigh'
| 'gaugeLowMid'
| 'gaugeMedium'
| 'gavel'
| 'gear'
| 'generalCharacter'
| 'ghost'
| 'gif'
| 'giftBox'
| 'giftCard'
| 'gitHubLogo'
| 'globe'
| 'golf'
| 'googleLogo'
| 'greenEnergy'
| 'grid'
| 'group'
| 'hamburger'
| 'hammer'
| 'heart'
| 'helpCenterProduct'
| 'helpCenterQuestionMark'
| 'hiddenEye'
| 'hockey'
| 'home'
| 'horizontalLine'
| 'hospital'
| 'hospitalCross'
| 'hurricane'
| 'ideal'
| 'identityCard'
| 'image'
| 'info'
| 'initiator'
| 'instagramLogo'
| 'instantUnstakingClock'
| 'institute'
| 'institutionalProduct'
| 'interest'
| 'invisible'
| 'invoice'
| 'key'
| 'keyboard'
| 'laptop'
| 'leadChart'
| 'leadCoin'
| 'learningRewardsProduct'
| 'light'
| 'lightbulb'
| 'lightning'
| 'lightningBolt'
| 'lineChartCrypto'
| 'list'
| 'location'
| 'lock'
| 'login'
| 'logout'
| 'loop'
| 'magnifyingGlass'
| 'marketCap'
| 'medal'
| 'megaphone'
| 'menu'
| 'metaverse'
| 'microphone'
| 'microphoneCordless'
| 'microscope'
| 'mint'
| 'minus'
| 'mma'
| 'moneyCardCoin'
| 'moon'
| 'more'
| 'moreVertical'
| 'motorsport'
| 'music'
| 'musicArticles'
| 'needle'
| 'newsFeed'
| 'newsletter'
| 'nft'
| 'nftBuy'
| 'nftOffer'
| 'nftProduct'
| 'nftSale'
| 'noRocket'
| 'noWifi'
| 'nodeProduct'
| 'oil'
| 'options'
| 'orderBook'
| 'orderHistory'
| 'outline'
| 'pFPS'
| 'paperAirplane'
| 'paperclip'
| 'participate'
| 'participateProduct'
| 'passKey'
| 'passport'
| 'pause'
| 'pay'
| 'payProduct'
| 'paymentCard'
| 'payments'
| 'payouts'
| 'paypal'
| 'pencil'
| 'peopleGroup'
| 'peopleStar'
| 'percentage'
| 'perpetualSwap'
| 'phone'
| 'pieChartData'
| 'pillBottle'
| 'pillCapsule'
| 'pin'
| 'plane'
| 'planet'
| 'play'
| 'playbutton'
| 'plusMinus'
| 'podiumStar'
| 'politicsBuilding'
| 'politicsCandidate'
| 'politicsFlag'
| 'politicsGavel'
| 'politicsPodium'
| 'politicsStar'
| 'powerTool'
| 'priceAlerts'
| 'priceAlertsCheck'
| 'primePoduct'
| 'privateClientProduct'
| 'proProduct'
| 'profile'
| 'protection'
| 'pulse'
| 'pyramid'
| 'qrCode'
| 'qrCodeAlt'
| 'queryTransact'
| 'questionMark'
| 'quotation'
| 'rain'
| 'ratingsCheck'
| 'ratingsChecks'
| 'ratingsStar'
| 'reCenter'
| 'rectangle'
| 'recurring'
| 'refresh'
| 'regulated'
| 'regulatedFutures'
| 'report'
| 'rewardsProduct'
| 'ribbon'
| 'robot'
| 'rocket'
| 'rocketShip'
| 'rollingSpot'
| 'rosettaProduct'
| 'rottenTomato'
| 'royalty'
| 'safe'
| 'save'
| 'savingsBank'
| 'scanQrCode'
| 'scienceAtom'
| 'scienceBeaker'
| 'scienceMoon'
| 'search'
| 'securityKey'
| 'securityShield'
| 'seen'
| 'sendReceive'
| 'setPinCode'
| 'settings'
| 'share'
| 'shield'
| 'shieldOutline'
| 'shoe'
| 'shoppingCart'
| 'signinProduct'
| 'singleCoin'
| 'singleNote'
| 'singlecloud'
| 'smartContract'
| 'snow'
| 'soccer'
| 'socialChat'
| 'socialReshare'
| 'socialShare'
| 'sofort'
| 'sortDoubleArrow'
| 'sortDown'
| 'sortDownCenter'
| 'sortUp'
| 'sortUpCenter'
| 'soundOff'
| 'soundOn'
| 'sparkle'
| 'speaker'
| 'speechBubble'
| 'stableCoin'
| 'stablecoinStack'
| 'staggeredList'
| 'stake'
| 'staking'
| 'star'
| 'starAward'
| 'starBubble'
| 'starTrophy'
| 'statusDot'
| 'step0'
| 'step1'
| 'step2'
| 'step3'
| 'step4'
| 'step5'
| 'step6'
| 'step7'
| 'step8'
| 'step9'
| 'strategy'
| 'sun'
| 'support'
| 'tag'
| 'taxes'
| 'taxesReceipt'
| 'telephone'
| 'tennis'
| 'test'
| 'thermometer'
| 'thumbsDown'
| 'thumbsDownOutline'
| 'thumbsUp'
| 'thumbsUpOutline'
| 'tokenLaunchCoin'
| 'tokenLaunchRocket'
| 'tokenSales'
| 'tornado'
| 'trading'
| 'transactions'
| 'trashCan'
| 'trophy'
| 'trophyCup'
| 'tshirt'
| 'tv'
| 'tvStand'
| 'twitterLogo'
| 'ultility'
| 'umbrella'
| 'undo'
| 'unfollowPeople'
| 'unknown'
| 'unlock'
| 'upArrow'
| 'upload'
| 'venturesProduct'
| 'verifiedBadge'
| 'verifiedPools'
| 'verticalLine'
| 'virus'
| 'visible'
| 'waasProduct'
| 'wallet'
| 'walletLogo'
| 'walletProduct'
| 'warning'
| 'webhooks'
| 'wellness'
| 'wifi'
| 'wind'
| 'wireTransfer'
| 'withdraw'
| 'wrapToken'
| 'xLogo'`,elements:[{name:"literal",value:"'account'"},{name:"literal",value:"'activity'"},{name:"literal",value:"'add'"},{name:"literal",value:"'addPeople'"},{name:"literal",value:"'advancedMarketSelector'"},{name:"literal",value:"'advancedTradeProduct'"},{name:"literal",value:"'affiliates'"},{name:"literal",value:"'airdrop'"},{name:"literal",value:"'airdropAlt'"},{name:"literal",value:"'airdropCoins'"},{name:"literal",value:"'airdropParachute'"},{name:"literal",value:"'alien'"},{name:"literal",value:"'allTimeHigh'"},{name:"literal",value:"'allocation'"},{name:"literal",value:"'annotation'"},{name:"literal",value:"'api'"},{name:"literal",value:"'apiPlug'"},{name:"literal",value:"'apothecary'"},{name:"literal",value:"'appSwitcher'"},{name:"literal",value:"'apple'"},{name:"literal",value:"'appleLogo'"},{name:"literal",value:"'application'"},{name:"literal",value:"'arrowDown'"},{name:"literal",value:"'arrowLeft'"},{name:"literal",value:"'arrowRight'"},{name:"literal",value:"'arrowUp'"},{name:"literal",value:"'arrowsHorizontal'"},{name:"literal",value:"'arrowsUpDown'"},{name:"literal",value:"'arrowsVertical'"},{name:"literal",value:"'artwork'"},{name:"literal",value:"'assetHubProduct'"},{name:"literal",value:"'assetManagementProduct'"},{name:"literal",value:"'astronautHelmet'"},{name:"literal",value:"'atSign'"},{name:"literal",value:"'atomScience'"},{name:"literal",value:"'auto'"},{name:"literal",value:"'autoCar'"},{name:"literal",value:"'avatar'"},{name:"literal",value:"'average'"},{name:"literal",value:"'backArrow'"},{name:"literal",value:"'ballot'"},{name:"literal",value:"'ballotbox'"},{name:"literal",value:"'bandage'"},{name:"literal",value:"'bank'"},{name:"literal",value:"'barChartSimple'"},{name:"literal",value:"'barChartWindow'"},{name:"literal",value:"'base'"},{name:"literal",value:"'baseApps'"},{name:"literal",value:"'baseFeed'"},{name:"literal",value:"'baseNotification'"},{name:"literal",value:"'baseQuickBuy'"},{name:"literal",value:"'baseSquare'"},{name:"literal",value:"'baseTransact'"},{name:"literal",value:"'baseVerification'"},{name:"literal",value:"'baseWallet'"},{name:"literal",value:"'baseball'"},{name:"literal",value:"'basketball'"},{name:"literal",value:"'beaker'"},{name:"literal",value:"'beginningArrow'"},{name:"literal",value:"'bell'"},{name:"literal",value:"'bellCheck'"},{name:"literal",value:"'bellPlus'"},{name:"literal",value:"'birthcertificate'"},{name:"literal",value:"'block'"},{name:"literal",value:"'blockchain'"},{name:"literal",value:"'blog'"},{name:"literal",value:"'book'"},{name:"literal",value:"'bookmark'"},{name:"literal",value:"'borrowProduct'"},{name:"literal",value:"'boxing'"},{name:"literal",value:"'bridging'"},{name:"literal",value:"'briefcase'"},{name:"literal",value:"'briefcaseAlt'"},{name:"literal",value:"'browser'"},{name:"literal",value:"'bug'"},{name:"literal",value:"'building'"},{name:"literal",value:"'calculator'"},{name:"literal",value:"'calendar'"},{name:"literal",value:"'calendarBlank'"},{name:"literal",value:"'calendarDates'"},{name:"literal",value:"'calendarEmpty'"},{name:"literal",value:"'calendarHeart'"},{name:"literal",value:"'calendarMoney'"},{name:"literal",value:"'calendarStar'"},{name:"literal",value:"'camera'"},{name:"literal",value:"'candlesticks'"},{name:"literal",value:"'car'"},{name:"literal",value:"'card'"},{name:"literal",value:"'caret'"},{name:"literal",value:"'caretDown'"},{name:"literal",value:"'caretLeft'"},{name:"literal",value:"'caretRight'"},{name:"literal",value:"'caretUp'"},{name:"literal",value:"'cash'"},{name:"literal",value:"'cashAustralianDollar'"},{name:"literal",value:"'cashBrazilianReal'"},{name:"literal",value:"'cashBrazillianReal'"},{name:"literal",value:"'cashCanadianDollar'"},{name:"literal",value:"'cashCoins'"},{name:"literal",value:"'cashEUR'"},{name:"literal",value:"'cashGBP'"},{name:"literal",value:"'cashIndonesianRupiah'"},{name:"literal",value:"'cashJPY'"},{name:"literal",value:"'cashPhilippinePeso'"},{name:"literal",value:"'cashPolishZloty'"},{name:"literal",value:"'cashRupee'"},{name:"literal",value:"'cashSingaporeDollar'"},{name:"literal",value:"'cashSwissFranc'"},{name:"literal",value:"'cashThaiBaht'"},{name:"literal",value:"'cashTurkishLira'"},{name:"literal",value:"'cashUSD'"},{name:"literal",value:"'cashUaeDirham'"},{name:"literal",value:"'cashVietnameseDong'"},{name:"literal",value:"'chainLink'"},{name:"literal",value:"'chartBar'"},{name:"literal",value:"'chartCandles'"},{name:"literal",value:"'chartLine'"},{name:"literal",value:"'chartPie'"},{name:"literal",value:"'chartPieCircle'"},{name:"literal",value:"'chartVolume'"},{name:"literal",value:"'chatBotAgent'"},{name:"literal",value:"'chatBubble'"},{name:"literal",value:"'chatRequests'"},{name:"literal",value:"'checkboxChecked'"},{name:"literal",value:"'checkboxEmpty'"},{name:"literal",value:"'checkmark'"},{name:"literal",value:"'chess'"},{name:"literal",value:"'circleCheckmark'"},{name:"literal",value:"'circleCross'"},{name:"literal",value:"'circulatingSupply'"},{name:"literal",value:"'city'"},{name:"literal",value:"'clipboard'"},{name:"literal",value:"'clock'"},{name:"literal",value:"'clockOutline'"},{name:"literal",value:"'close'"},{name:"literal",value:"'closeCaption'"},{name:"literal",value:"'clothing'"},{name:"literal",value:"'cloud'"},{name:"literal",value:"'cloudPartial'"},{name:"literal",value:"'cloudProduct'"},{name:"literal",value:"'cluster'"},{name:"literal",value:"'coinbase'"},{name:"literal",value:"'coinbaseCardProduct'"},{name:"literal",value:"'coinbaseOne'"},{name:"literal",value:"'coinbaseOneCard'"},{name:"literal",value:"'coinbaseOneLogo'"},{name:"literal",value:"'coinbaseRewards'"},{name:"literal",value:"'coinsCrypto'"},{name:"literal",value:"'collapse'"},{name:"literal",value:"'collectibles'"},{name:"literal",value:"'collection'"},{name:"literal",value:"'comment'"},{name:"literal",value:"'commentPlus'"},{name:"literal",value:"'commerceProduct'"},{name:"literal",value:"'compass'"},{name:"literal",value:"'complianceProduct'"},{name:"literal",value:"'compose'"},{name:"literal",value:"'computerChip'"},{name:"literal",value:"'concierge'"},{name:"literal",value:"'conciergeBell'"},{name:"literal",value:"'config'"},{name:"literal",value:"'continuous'"},{name:"literal",value:"'convert'"},{name:"literal",value:"'copy'"},{name:"literal",value:"'corporation'"},{name:"literal",value:"'creatorCoin'"},{name:"literal",value:"'cricket'"},{name:"literal",value:"'cross'"},{name:"literal",value:"'crossTrade'"},{name:"literal",value:"'crypto'"},{name:"literal",value:"'cryptobasics'"},{name:"literal",value:"'crystalBall'"},{name:"literal",value:"'crystalBallInsight'"},{name:"literal",value:"'currencies'"},{name:"literal",value:"'custodyProduct'"},{name:"literal",value:"'dashboard'"},{name:"literal",value:"'dataMarketplaceProduct'"},{name:"literal",value:"'dataStack'"},{name:"literal",value:"'defi'"},{name:"literal",value:"'delegateProduct'"},{name:"literal",value:"'deposit'"},{name:"literal",value:"'derivatives'"},{name:"literal",value:"'derivativesProduct'"},{name:"literal",value:"'derivativesProductNew'"},{name:"literal",value:"'developerAPIProduct'"},{name:"literal",value:"'developerPlatformProduct'"},{name:"literal",value:"'dex'"},{name:"literal",value:"'diagonalDownArrow'"},{name:"literal",value:"'diagonalRightArrow'"},{name:"literal",value:"'diagonalUpArrow'"},{name:"literal",value:"'diamond'"},{name:"literal",value:"'diamondIncentives'"},{name:"literal",value:"'dinnerPlate'"},{name:"literal",value:"'directDeposit'"},{name:"literal",value:"'directDepositIcon'"},{name:"literal",value:"'disabledPhone'"},{name:"literal",value:"'discordLogo'"},{name:"literal",value:"'distribution'"},{name:"literal",value:"'document'"},{name:"literal",value:"'documentation'"},{name:"literal",value:"'dot'"},{name:"literal",value:"'doubleChevronRight'"},{name:"literal",value:"'downArrow'"},{name:"literal",value:"'download'"},{name:"literal",value:"'drag'"},{name:"literal",value:"'drops'"},{name:"literal",value:"'earn'"},{name:"literal",value:"'earnProduct'"},{name:"literal",value:"'earnRewards'"},{name:"literal",value:"'earthquake'"},{name:"literal",value:"'educationBook'"},{name:"literal",value:"'educationPencil'"},{name:"literal",value:"'email'"},{name:"literal",value:"'endArrow'"},{name:"literal",value:"'entertainment'"},{name:"literal",value:"'error'"},{name:"literal",value:"'ethereum'"},{name:"literal",value:"'eventContracts'"},{name:"literal",value:"'exchangeProduct'"},{name:"literal",value:"'exclamationMark'"},{name:"literal",value:"'expand'"},{name:"literal",value:"'expandAddress'"},{name:"literal",value:"'expandAll'"},{name:"literal",value:"'externalLink'"},{name:"literal",value:"'eye'"},{name:"literal",value:"'faceScan'"},{name:"literal",value:"'faces'"},{name:"literal",value:"'factory'"},{name:"literal",value:"'faucet'"},{name:"literal",value:"'fib'"},{name:"literal",value:"'filmStrip'"},{name:"literal",value:"'filter'"},{name:"literal",value:"'fingerprint'"},{name:"literal",value:"'flame'"},{name:"literal",value:"'folder'"},{name:"literal",value:"'folderArrow'"},{name:"literal",value:"'folderOpen'"},{name:"literal",value:"'followAdd'"},{name:"literal",value:"'following'"},{name:"literal",value:"'football'"},{name:"literal",value:"'fork'"},{name:"literal",value:"'forwardArrow'"},{name:"literal",value:"'fscsProtection'"},{name:"literal",value:"'gab'"},{name:"literal",value:"'games'"},{name:"literal",value:"'gaming'"},{name:"literal",value:"'gasFees'"},{name:"literal",value:"'gasFeesAlt'"},{name:"literal",value:"'gauge'"},{name:"literal",value:"'gaugeEmpty'"},{name:"literal",value:"'gaugeHigh'"},{name:"literal",value:"'gaugeHighLow'"},{name:"literal",value:"'gaugeHighMid'"},{name:"literal",value:"'gaugeLow'"},{name:"literal",value:"'gaugeLowHigh'"},{name:"literal",value:"'gaugeLowMid'"},{name:"literal",value:"'gaugeMedium'"},{name:"literal",value:"'gavel'"},{name:"literal",value:"'gear'"},{name:"literal",value:"'generalCharacter'"},{name:"literal",value:"'ghost'"},{name:"literal",value:"'gif'"},{name:"literal",value:"'giftBox'"},{name:"literal",value:"'giftCard'"},{name:"literal",value:"'gitHubLogo'"},{name:"literal",value:"'globe'"},{name:"literal",value:"'golf'"},{name:"literal",value:"'googleLogo'"},{name:"literal",value:"'greenEnergy'"},{name:"literal",value:"'grid'"},{name:"literal",value:"'group'"},{name:"literal",value:"'hamburger'"},{name:"literal",value:"'hammer'"},{name:"literal",value:"'heart'"},{name:"literal",value:"'helpCenterProduct'"},{name:"literal",value:"'helpCenterQuestionMark'"},{name:"literal",value:"'hiddenEye'"},{name:"literal",value:"'hockey'"},{name:"literal",value:"'home'"},{name:"literal",value:"'horizontalLine'"},{name:"literal",value:"'hospital'"},{name:"literal",value:"'hospitalCross'"},{name:"literal",value:"'hurricane'"},{name:"literal",value:"'ideal'"},{name:"literal",value:"'identityCard'"},{name:"literal",value:"'image'"},{name:"literal",value:"'info'"},{name:"literal",value:"'initiator'"},{name:"literal",value:"'instagramLogo'"},{name:"literal",value:"'instantUnstakingClock'"},{name:"literal",value:"'institute'"},{name:"literal",value:"'institutionalProduct'"},{name:"literal",value:"'interest'"},{name:"literal",value:"'invisible'"},{name:"literal",value:"'invoice'"},{name:"literal",value:"'key'"},{name:"literal",value:"'keyboard'"},{name:"literal",value:"'laptop'"},{name:"literal",value:"'leadChart'"},{name:"literal",value:"'leadCoin'"},{name:"literal",value:"'learningRewardsProduct'"},{name:"literal",value:"'light'"},{name:"literal",value:"'lightbulb'"},{name:"literal",value:"'lightning'"},{name:"literal",value:"'lightningBolt'"},{name:"literal",value:"'lineChartCrypto'"},{name:"literal",value:"'list'"},{name:"literal",value:"'location'"},{name:"literal",value:"'lock'"},{name:"literal",value:"'login'"},{name:"literal",value:"'logout'"},{name:"literal",value:"'loop'"},{name:"literal",value:"'magnifyingGlass'"},{name:"literal",value:"'marketCap'"},{name:"literal",value:"'medal'"},{name:"literal",value:"'megaphone'"},{name:"literal",value:"'menu'"},{name:"literal",value:"'metaverse'"},{name:"literal",value:"'microphone'"},{name:"literal",value:"'microphoneCordless'"},{name:"literal",value:"'microscope'"},{name:"literal",value:"'mint'"},{name:"literal",value:"'minus'"},{name:"literal",value:"'mma'"},{name:"literal",value:"'moneyCardCoin'"},{name:"literal",value:"'moon'"},{name:"literal",value:"'more'"},{name:"literal",value:"'moreVertical'"},{name:"literal",value:"'motorsport'"},{name:"literal",value:"'music'"},{name:"literal",value:"'musicArticles'"},{name:"literal",value:"'needle'"},{name:"literal",value:"'newsFeed'"},{name:"literal",value:"'newsletter'"},{name:"literal",value:"'nft'"},{name:"literal",value:"'nftBuy'"},{name:"literal",value:"'nftOffer'"},{name:"literal",value:"'nftProduct'"},{name:"literal",value:"'nftSale'"},{name:"literal",value:"'noRocket'"},{name:"literal",value:"'noWifi'"},{name:"literal",value:"'nodeProduct'"},{name:"literal",value:"'oil'"},{name:"literal",value:"'options'"},{name:"literal",value:"'orderBook'"},{name:"literal",value:"'orderHistory'"},{name:"literal",value:"'outline'"},{name:"literal",value:"'pFPS'"},{name:"literal",value:"'paperAirplane'"},{name:"literal",value:"'paperclip'"},{name:"literal",value:"'participate'"},{name:"literal",value:"'participateProduct'"},{name:"literal",value:"'passKey'"},{name:"literal",value:"'passport'"},{name:"literal",value:"'pause'"},{name:"literal",value:"'pay'"},{name:"literal",value:"'payProduct'"},{name:"literal",value:"'paymentCard'"},{name:"literal",value:"'payments'"},{name:"literal",value:"'payouts'"},{name:"literal",value:"'paypal'"},{name:"literal",value:"'pencil'"},{name:"literal",value:"'peopleGroup'"},{name:"literal",value:"'peopleStar'"},{name:"literal",value:"'percentage'"},{name:"literal",value:"'perpetualSwap'"},{name:"literal",value:"'phone'"},{name:"literal",value:"'pieChartData'"},{name:"literal",value:"'pillBottle'"},{name:"literal",value:"'pillCapsule'"},{name:"literal",value:"'pin'"},{name:"literal",value:"'plane'"},{name:"literal",value:"'planet'"},{name:"literal",value:"'play'"},{name:"literal",value:"'playbutton'"},{name:"literal",value:"'plusMinus'"},{name:"literal",value:"'podiumStar'"},{name:"literal",value:"'politicsBuilding'"},{name:"literal",value:"'politicsCandidate'"},{name:"literal",value:"'politicsFlag'"},{name:"literal",value:"'politicsGavel'"},{name:"literal",value:"'politicsPodium'"},{name:"literal",value:"'politicsStar'"},{name:"literal",value:"'powerTool'"},{name:"literal",value:"'priceAlerts'"},{name:"literal",value:"'priceAlertsCheck'"},{name:"literal",value:"'primePoduct'"},{name:"literal",value:"'privateClientProduct'"},{name:"literal",value:"'proProduct'"},{name:"literal",value:"'profile'"},{name:"literal",value:"'protection'"},{name:"literal",value:"'pulse'"},{name:"literal",value:"'pyramid'"},{name:"literal",value:"'qrCode'"},{name:"literal",value:"'qrCodeAlt'"},{name:"literal",value:"'queryTransact'"},{name:"literal",value:"'questionMark'"},{name:"literal",value:"'quotation'"},{name:"literal",value:"'rain'"},{name:"literal",value:"'ratingsCheck'"},{name:"literal",value:"'ratingsChecks'"},{name:"literal",value:"'ratingsStar'"},{name:"literal",value:"'reCenter'"},{name:"literal",value:"'rectangle'"},{name:"literal",value:"'recurring'"},{name:"literal",value:"'refresh'"},{name:"literal",value:"'regulated'"},{name:"literal",value:"'regulatedFutures'"},{name:"literal",value:"'report'"},{name:"literal",value:"'rewardsProduct'"},{name:"literal",value:"'ribbon'"},{name:"literal",value:"'robot'"},{name:"literal",value:"'rocket'"},{name:"literal",value:"'rocketShip'"},{name:"literal",value:"'rollingSpot'"},{name:"literal",value:"'rosettaProduct'"},{name:"literal",value:"'rottenTomato'"},{name:"literal",value:"'royalty'"},{name:"literal",value:"'safe'"},{name:"literal",value:"'save'"},{name:"literal",value:"'savingsBank'"},{name:"literal",value:"'scanQrCode'"},{name:"literal",value:"'scienceAtom'"},{name:"literal",value:"'scienceBeaker'"},{name:"literal",value:"'scienceMoon'"},{name:"literal",value:"'search'"},{name:"literal",value:"'securityKey'"},{name:"literal",value:"'securityShield'"},{name:"literal",value:"'seen'"},{name:"literal",value:"'sendReceive'"},{name:"literal",value:"'setPinCode'"},{name:"literal",value:"'settings'"},{name:"literal",value:"'share'"},{name:"literal",value:"'shield'"},{name:"literal",value:"'shieldOutline'"},{name:"literal",value:"'shoe'"},{name:"literal",value:"'shoppingCart'"},{name:"literal",value:"'signinProduct'"},{name:"literal",value:"'singleCoin'"},{name:"literal",value:"'singleNote'"},{name:"literal",value:"'singlecloud'"},{name:"literal",value:"'smartContract'"},{name:"literal",value:"'snow'"},{name:"literal",value:"'soccer'"},{name:"literal",value:"'socialChat'"},{name:"literal",value:"'socialReshare'"},{name:"literal",value:"'socialShare'"},{name:"literal",value:"'sofort'"},{name:"literal",value:"'sortDoubleArrow'"},{name:"literal",value:"'sortDown'"},{name:"literal",value:"'sortDownCenter'"},{name:"literal",value:"'sortUp'"},{name:"literal",value:"'sortUpCenter'"},{name:"literal",value:"'soundOff'"},{name:"literal",value:"'soundOn'"},{name:"literal",value:"'sparkle'"},{name:"literal",value:"'speaker'"},{name:"literal",value:"'speechBubble'"},{name:"literal",value:"'stableCoin'"},{name:"literal",value:"'stablecoinStack'"},{name:"literal",value:"'staggeredList'"},{name:"literal",value:"'stake'"},{name:"literal",value:"'staking'"},{name:"literal",value:"'star'"},{name:"literal",value:"'starAward'"},{name:"literal",value:"'starBubble'"},{name:"literal",value:"'starTrophy'"},{name:"literal",value:"'statusDot'"},{name:"literal",value:"'step0'"},{name:"literal",value:"'step1'"},{name:"literal",value:"'step2'"},{name:"literal",value:"'step3'"},{name:"literal",value:"'step4'"},{name:"literal",value:"'step5'"},{name:"literal",value:"'step6'"},{name:"literal",value:"'step7'"},{name:"literal",value:"'step8'"},{name:"literal",value:"'step9'"},{name:"literal",value:"'strategy'"},{name:"literal",value:"'sun'"},{name:"literal",value:"'support'"},{name:"literal",value:"'tag'"},{name:"literal",value:"'taxes'"},{name:"literal",value:"'taxesReceipt'"},{name:"literal",value:"'telephone'"},{name:"literal",value:"'tennis'"},{name:"literal",value:"'test'"},{name:"literal",value:"'thermometer'"},{name:"literal",value:"'thumbsDown'"},{name:"literal",value:"'thumbsDownOutline'"},{name:"literal",value:"'thumbsUp'"},{name:"literal",value:"'thumbsUpOutline'"},{name:"literal",value:"'tokenLaunchCoin'"},{name:"literal",value:"'tokenLaunchRocket'"},{name:"literal",value:"'tokenSales'"},{name:"literal",value:"'tornado'"},{name:"literal",value:"'trading'"},{name:"literal",value:"'transactions'"},{name:"literal",value:"'trashCan'"},{name:"literal",value:"'trophy'"},{name:"literal",value:"'trophyCup'"},{name:"literal",value:"'tshirt'"},{name:"literal",value:"'tv'"},{name:"literal",value:"'tvStand'"},{name:"literal",value:"'twitterLogo'"},{name:"literal",value:"'ultility'"},{name:"literal",value:"'umbrella'"},{name:"literal",value:"'undo'"},{name:"literal",value:"'unfollowPeople'"},{name:"literal",value:"'unknown'"},{name:"literal",value:"'unlock'"},{name:"literal",value:"'upArrow'"},{name:"literal",value:"'upload'"},{name:"literal",value:"'venturesProduct'"},{name:"literal",value:"'verifiedBadge'"},{name:"literal",value:"'verifiedPools'"},{name:"literal",value:"'verticalLine'"},{name:"literal",value:"'virus'"},{name:"literal",value:"'visible'"},{name:"literal",value:"'waasProduct'"},{name:"literal",value:"'wallet'"},{name:"literal",value:"'walletLogo'"},{name:"literal",value:"'walletProduct'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'webhooks'"},{name:"literal",value:"'wellness'"},{name:"literal",value:"'wifi'"},{name:"literal",value:"'wind'"},{name:"literal",value:"'wireTransfer'"},{name:"literal",value:"'withdraw'"},{name:"literal",value:"'wrapToken'"},{name:"literal",value:"'xLogo'"}],required:!1},description:"Icon to render at the end of the button."},{key:"endIconActive",value:{name:"boolean",required:!1},description:"Whether the end icon is active"},{key:"flush",value:{name:"union",raw:"'start' | 'end'",elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'end'"}],required:!1},description:`Ensure the button aligns flush on the left or right.
This prop will translate the entire button left/right,
so take care to ensure it is not overflowing awkwardly`},{key:"name",value:{name:"string",required:!1},description:"Uniquely identify the button within a form."},{key:"noScaleOnPress",value:{name:"boolean",required:!1},description:"Don't scale element on press."},{key:"numberOfLines",value:{name:"number",required:!1},description:`Truncates text after wrapping to a defined number of lines.
@default 1`}]}}]}],raw:`Polymorphic.ExtendableProps<
  PressableBaseProps,
  SharedProps &
    Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
      /**
       * Toggle design and visual variants.
       * @default primary
       */
      variant?: ButtonVariant;
      /** Mark the button as disabled. */
      disabled?: boolean;
      /** Mark the button as loading and display a spinner. */
      loading?: boolean;
      /** Mark the background and border as transparent until interacted with. */
      transparent?: boolean;
      /** Change to block and expand to 100% of parent width. */
      block?: boolean;
      /** Reduce the inner padding within the button itself. */
      compact?: boolean;
      /** Children to render within the button. */
      children: React.ReactNode;
      /** Set the start node */
      start?: React.ReactNode;
      /** Icon to render at the start of the button. */
      startIcon?: IconName;
      /** Whether the start icon is active */
      startIconActive?: boolean;
      /** Set the end node */
      end?: React.ReactNode;
      /** Icon to render at the end of the button. */
      endIcon?: IconName;
      /** Whether the end icon is active */
      endIconActive?: boolean;
      /** Ensure the button aligns flush on the left or right.
       * This prop will translate the entire button left/right,
       * so take care to ensure it is not overflowing awkwardly
       */
      flush?: 'start' | 'end';
      /** Uniquely identify the button within a form. */
      name?: string;
      /** Don't scale element on press. */
      noScaleOnPress?: boolean;
      /**
       * Truncates text after wrapping to a defined number of lines.
       * @default 1
       */
      numberOfLines?: number;
    }
>`},{name:"signature",type:"object",raw:"{ onClick?: React.MouseEventHandler }",signature:{properties:[{key:"onClick",value:{name:"ReactMouseEventHandler",raw:"React.MouseEventHandler",required:!1}}]}}]}]}],raw:`NonNullable<
  React.ReactElement<ButtonBaseProps & { onClick?: React.MouseEventHandler }>
>`},description:"Primary action button"},secondaryAction:{required:!1,tsType:{name:"ReactReactElement",raw:"React.ReactElement<ButtonBaseProps & { onClick?: React.MouseEventHandler }>",elements:[{name:"intersection",raw:"ButtonBaseProps & { onClick?: React.MouseEventHandler }",elements:[{name:"Polymorphic.ExtendableProps",elements:[{name:"Polymorphic.ExtendableProps",elements:[{name:"Polymorphic.ExtendableProps",elements:[{name:"intersection",raw:`StyleProps &
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
>`},{name:"intersection",raw:`SharedProps &
Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
  /**
   * Toggle design and visual variants.
   * @default primary
   */
  variant?: ButtonVariant;
  /** Mark the button as disabled. */
  disabled?: boolean;
  /** Mark the button as loading and display a spinner. */
  loading?: boolean;
  /** Mark the background and border as transparent until interacted with. */
  transparent?: boolean;
  /** Change to block and expand to 100% of parent width. */
  block?: boolean;
  /** Reduce the inner padding within the button itself. */
  compact?: boolean;
  /** Children to render within the button. */
  children: React.ReactNode;
  /** Set the start node */
  start?: React.ReactNode;
  /** Icon to render at the start of the button. */
  startIcon?: IconName;
  /** Whether the start icon is active */
  startIconActive?: boolean;
  /** Set the end node */
  end?: React.ReactNode;
  /** Icon to render at the end of the button. */
  endIcon?: IconName;
  /** Whether the end icon is active */
  endIconActive?: boolean;
  /** Ensure the button aligns flush on the left or right.
   * This prop will translate the entire button left/right,
   * so take care to ensure it is not overflowing awkwardly
   */
  flush?: 'start' | 'end';
  /** Uniquely identify the button within a form. */
  name?: string;
  /** Don't scale element on press. */
  noScaleOnPress?: boolean;
  /**
   * Truncates text after wrapping to a defined number of lines.
   * @default 1
   */
  numberOfLines?: number;
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
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},{name:"literal",value:"'accessibilityLabel'"}],raw:"Pick<SharedAccessibilityProps, 'accessibilityLabel'>"},{name:"signature",type:"object",raw:`{
  /**
   * Toggle design and visual variants.
   * @default primary
   */
  variant?: ButtonVariant;
  /** Mark the button as disabled. */
  disabled?: boolean;
  /** Mark the button as loading and display a spinner. */
  loading?: boolean;
  /** Mark the background and border as transparent until interacted with. */
  transparent?: boolean;
  /** Change to block and expand to 100% of parent width. */
  block?: boolean;
  /** Reduce the inner padding within the button itself. */
  compact?: boolean;
  /** Children to render within the button. */
  children: React.ReactNode;
  /** Set the start node */
  start?: React.ReactNode;
  /** Icon to render at the start of the button. */
  startIcon?: IconName;
  /** Whether the start icon is active */
  startIconActive?: boolean;
  /** Set the end node */
  end?: React.ReactNode;
  /** Icon to render at the end of the button. */
  endIcon?: IconName;
  /** Whether the end icon is active */
  endIconActive?: boolean;
  /** Ensure the button aligns flush on the left or right.
   * This prop will translate the entire button left/right,
   * so take care to ensure it is not overflowing awkwardly
   */
  flush?: 'start' | 'end';
  /** Uniquely identify the button within a form. */
  name?: string;
  /** Don't scale element on press. */
  noScaleOnPress?: boolean;
  /**
   * Truncates text after wrapping to a defined number of lines.
   * @default 1
   */
  numberOfLines?: number;
}`,signature:{properties:[{key:"variant",value:{name:"union",raw:`| 'primary'
| 'secondary'
| 'tertiary'
| 'positive'
| 'negative'
| 'foregroundMuted'`,elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"},{name:"literal",value:"'tertiary'"},{name:"literal",value:"'positive'"},{name:"literal",value:"'negative'"},{name:"literal",value:"'foregroundMuted'"}],required:!1},description:`Toggle design and visual variants.
@default primary`},{key:"disabled",value:{name:"boolean",required:!1},description:"Mark the button as disabled."},{key:"loading",value:{name:"boolean",required:!1},description:"Mark the button as loading and display a spinner."},{key:"transparent",value:{name:"boolean",required:!1},description:"Mark the background and border as transparent until interacted with."},{key:"block",value:{name:"boolean",required:!1},description:"Change to block and expand to 100% of parent width."},{key:"compact",value:{name:"boolean",required:!1},description:"Reduce the inner padding within the button itself."},{key:"children",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0},description:"Children to render within the button."},{key:"start",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"Set the start node"},{key:"startIcon",value:{name:"union",raw:`| 'account'
| 'activity'
| 'add'
| 'addPeople'
| 'advancedMarketSelector'
| 'advancedTradeProduct'
| 'affiliates'
| 'airdrop'
| 'airdropAlt'
| 'airdropCoins'
| 'airdropParachute'
| 'alien'
| 'allTimeHigh'
| 'allocation'
| 'annotation'
| 'api'
| 'apiPlug'
| 'apothecary'
| 'appSwitcher'
| 'apple'
| 'appleLogo'
| 'application'
| 'arrowDown'
| 'arrowLeft'
| 'arrowRight'
| 'arrowUp'
| 'arrowsHorizontal'
| 'arrowsUpDown'
| 'arrowsVertical'
| 'artwork'
| 'assetHubProduct'
| 'assetManagementProduct'
| 'astronautHelmet'
| 'atSign'
| 'atomScience'
| 'auto'
| 'autoCar'
| 'avatar'
| 'average'
| 'backArrow'
| 'ballot'
| 'ballotbox'
| 'bandage'
| 'bank'
| 'barChartSimple'
| 'barChartWindow'
| 'base'
| 'baseApps'
| 'baseFeed'
| 'baseNotification'
| 'baseQuickBuy'
| 'baseSquare'
| 'baseTransact'
| 'baseVerification'
| 'baseWallet'
| 'baseball'
| 'basketball'
| 'beaker'
| 'beginningArrow'
| 'bell'
| 'bellCheck'
| 'bellPlus'
| 'birthcertificate'
| 'block'
| 'blockchain'
| 'blog'
| 'book'
| 'bookmark'
| 'borrowProduct'
| 'boxing'
| 'bridging'
| 'briefcase'
| 'briefcaseAlt'
| 'browser'
| 'bug'
| 'building'
| 'calculator'
| 'calendar'
| 'calendarBlank'
| 'calendarDates'
| 'calendarEmpty'
| 'calendarHeart'
| 'calendarMoney'
| 'calendarStar'
| 'camera'
| 'candlesticks'
| 'car'
| 'card'
| 'caret'
| 'caretDown'
| 'caretLeft'
| 'caretRight'
| 'caretUp'
| 'cash'
| 'cashAustralianDollar'
| 'cashBrazilianReal'
| 'cashBrazillianReal'
| 'cashCanadianDollar'
| 'cashCoins'
| 'cashEUR'
| 'cashGBP'
| 'cashIndonesianRupiah'
| 'cashJPY'
| 'cashPhilippinePeso'
| 'cashPolishZloty'
| 'cashRupee'
| 'cashSingaporeDollar'
| 'cashSwissFranc'
| 'cashThaiBaht'
| 'cashTurkishLira'
| 'cashUSD'
| 'cashUaeDirham'
| 'cashVietnameseDong'
| 'chainLink'
| 'chartBar'
| 'chartCandles'
| 'chartLine'
| 'chartPie'
| 'chartPieCircle'
| 'chartVolume'
| 'chatBotAgent'
| 'chatBubble'
| 'chatRequests'
| 'checkboxChecked'
| 'checkboxEmpty'
| 'checkmark'
| 'chess'
| 'circleCheckmark'
| 'circleCross'
| 'circulatingSupply'
| 'city'
| 'clipboard'
| 'clock'
| 'clockOutline'
| 'close'
| 'closeCaption'
| 'clothing'
| 'cloud'
| 'cloudPartial'
| 'cloudProduct'
| 'cluster'
| 'coinbase'
| 'coinbaseCardProduct'
| 'coinbaseOne'
| 'coinbaseOneCard'
| 'coinbaseOneLogo'
| 'coinbaseRewards'
| 'coinsCrypto'
| 'collapse'
| 'collectibles'
| 'collection'
| 'comment'
| 'commentPlus'
| 'commerceProduct'
| 'compass'
| 'complianceProduct'
| 'compose'
| 'computerChip'
| 'concierge'
| 'conciergeBell'
| 'config'
| 'continuous'
| 'convert'
| 'copy'
| 'corporation'
| 'creatorCoin'
| 'cricket'
| 'cross'
| 'crossTrade'
| 'crypto'
| 'cryptobasics'
| 'crystalBall'
| 'crystalBallInsight'
| 'currencies'
| 'custodyProduct'
| 'dashboard'
| 'dataMarketplaceProduct'
| 'dataStack'
| 'defi'
| 'delegateProduct'
| 'deposit'
| 'derivatives'
| 'derivativesProduct'
| 'derivativesProductNew'
| 'developerAPIProduct'
| 'developerPlatformProduct'
| 'dex'
| 'diagonalDownArrow'
| 'diagonalRightArrow'
| 'diagonalUpArrow'
| 'diamond'
| 'diamondIncentives'
| 'dinnerPlate'
| 'directDeposit'
| 'directDepositIcon'
| 'disabledPhone'
| 'discordLogo'
| 'distribution'
| 'document'
| 'documentation'
| 'dot'
| 'doubleChevronRight'
| 'downArrow'
| 'download'
| 'drag'
| 'drops'
| 'earn'
| 'earnProduct'
| 'earnRewards'
| 'earthquake'
| 'educationBook'
| 'educationPencil'
| 'email'
| 'endArrow'
| 'entertainment'
| 'error'
| 'ethereum'
| 'eventContracts'
| 'exchangeProduct'
| 'exclamationMark'
| 'expand'
| 'expandAddress'
| 'expandAll'
| 'externalLink'
| 'eye'
| 'faceScan'
| 'faces'
| 'factory'
| 'faucet'
| 'fib'
| 'filmStrip'
| 'filter'
| 'fingerprint'
| 'flame'
| 'folder'
| 'folderArrow'
| 'folderOpen'
| 'followAdd'
| 'following'
| 'football'
| 'fork'
| 'forwardArrow'
| 'fscsProtection'
| 'gab'
| 'games'
| 'gaming'
| 'gasFees'
| 'gasFeesAlt'
| 'gauge'
| 'gaugeEmpty'
| 'gaugeHigh'
| 'gaugeHighLow'
| 'gaugeHighMid'
| 'gaugeLow'
| 'gaugeLowHigh'
| 'gaugeLowMid'
| 'gaugeMedium'
| 'gavel'
| 'gear'
| 'generalCharacter'
| 'ghost'
| 'gif'
| 'giftBox'
| 'giftCard'
| 'gitHubLogo'
| 'globe'
| 'golf'
| 'googleLogo'
| 'greenEnergy'
| 'grid'
| 'group'
| 'hamburger'
| 'hammer'
| 'heart'
| 'helpCenterProduct'
| 'helpCenterQuestionMark'
| 'hiddenEye'
| 'hockey'
| 'home'
| 'horizontalLine'
| 'hospital'
| 'hospitalCross'
| 'hurricane'
| 'ideal'
| 'identityCard'
| 'image'
| 'info'
| 'initiator'
| 'instagramLogo'
| 'instantUnstakingClock'
| 'institute'
| 'institutionalProduct'
| 'interest'
| 'invisible'
| 'invoice'
| 'key'
| 'keyboard'
| 'laptop'
| 'leadChart'
| 'leadCoin'
| 'learningRewardsProduct'
| 'light'
| 'lightbulb'
| 'lightning'
| 'lightningBolt'
| 'lineChartCrypto'
| 'list'
| 'location'
| 'lock'
| 'login'
| 'logout'
| 'loop'
| 'magnifyingGlass'
| 'marketCap'
| 'medal'
| 'megaphone'
| 'menu'
| 'metaverse'
| 'microphone'
| 'microphoneCordless'
| 'microscope'
| 'mint'
| 'minus'
| 'mma'
| 'moneyCardCoin'
| 'moon'
| 'more'
| 'moreVertical'
| 'motorsport'
| 'music'
| 'musicArticles'
| 'needle'
| 'newsFeed'
| 'newsletter'
| 'nft'
| 'nftBuy'
| 'nftOffer'
| 'nftProduct'
| 'nftSale'
| 'noRocket'
| 'noWifi'
| 'nodeProduct'
| 'oil'
| 'options'
| 'orderBook'
| 'orderHistory'
| 'outline'
| 'pFPS'
| 'paperAirplane'
| 'paperclip'
| 'participate'
| 'participateProduct'
| 'passKey'
| 'passport'
| 'pause'
| 'pay'
| 'payProduct'
| 'paymentCard'
| 'payments'
| 'payouts'
| 'paypal'
| 'pencil'
| 'peopleGroup'
| 'peopleStar'
| 'percentage'
| 'perpetualSwap'
| 'phone'
| 'pieChartData'
| 'pillBottle'
| 'pillCapsule'
| 'pin'
| 'plane'
| 'planet'
| 'play'
| 'playbutton'
| 'plusMinus'
| 'podiumStar'
| 'politicsBuilding'
| 'politicsCandidate'
| 'politicsFlag'
| 'politicsGavel'
| 'politicsPodium'
| 'politicsStar'
| 'powerTool'
| 'priceAlerts'
| 'priceAlertsCheck'
| 'primePoduct'
| 'privateClientProduct'
| 'proProduct'
| 'profile'
| 'protection'
| 'pulse'
| 'pyramid'
| 'qrCode'
| 'qrCodeAlt'
| 'queryTransact'
| 'questionMark'
| 'quotation'
| 'rain'
| 'ratingsCheck'
| 'ratingsChecks'
| 'ratingsStar'
| 'reCenter'
| 'rectangle'
| 'recurring'
| 'refresh'
| 'regulated'
| 'regulatedFutures'
| 'report'
| 'rewardsProduct'
| 'ribbon'
| 'robot'
| 'rocket'
| 'rocketShip'
| 'rollingSpot'
| 'rosettaProduct'
| 'rottenTomato'
| 'royalty'
| 'safe'
| 'save'
| 'savingsBank'
| 'scanQrCode'
| 'scienceAtom'
| 'scienceBeaker'
| 'scienceMoon'
| 'search'
| 'securityKey'
| 'securityShield'
| 'seen'
| 'sendReceive'
| 'setPinCode'
| 'settings'
| 'share'
| 'shield'
| 'shieldOutline'
| 'shoe'
| 'shoppingCart'
| 'signinProduct'
| 'singleCoin'
| 'singleNote'
| 'singlecloud'
| 'smartContract'
| 'snow'
| 'soccer'
| 'socialChat'
| 'socialReshare'
| 'socialShare'
| 'sofort'
| 'sortDoubleArrow'
| 'sortDown'
| 'sortDownCenter'
| 'sortUp'
| 'sortUpCenter'
| 'soundOff'
| 'soundOn'
| 'sparkle'
| 'speaker'
| 'speechBubble'
| 'stableCoin'
| 'stablecoinStack'
| 'staggeredList'
| 'stake'
| 'staking'
| 'star'
| 'starAward'
| 'starBubble'
| 'starTrophy'
| 'statusDot'
| 'step0'
| 'step1'
| 'step2'
| 'step3'
| 'step4'
| 'step5'
| 'step6'
| 'step7'
| 'step8'
| 'step9'
| 'strategy'
| 'sun'
| 'support'
| 'tag'
| 'taxes'
| 'taxesReceipt'
| 'telephone'
| 'tennis'
| 'test'
| 'thermometer'
| 'thumbsDown'
| 'thumbsDownOutline'
| 'thumbsUp'
| 'thumbsUpOutline'
| 'tokenLaunchCoin'
| 'tokenLaunchRocket'
| 'tokenSales'
| 'tornado'
| 'trading'
| 'transactions'
| 'trashCan'
| 'trophy'
| 'trophyCup'
| 'tshirt'
| 'tv'
| 'tvStand'
| 'twitterLogo'
| 'ultility'
| 'umbrella'
| 'undo'
| 'unfollowPeople'
| 'unknown'
| 'unlock'
| 'upArrow'
| 'upload'
| 'venturesProduct'
| 'verifiedBadge'
| 'verifiedPools'
| 'verticalLine'
| 'virus'
| 'visible'
| 'waasProduct'
| 'wallet'
| 'walletLogo'
| 'walletProduct'
| 'warning'
| 'webhooks'
| 'wellness'
| 'wifi'
| 'wind'
| 'wireTransfer'
| 'withdraw'
| 'wrapToken'
| 'xLogo'`,elements:[{name:"literal",value:"'account'"},{name:"literal",value:"'activity'"},{name:"literal",value:"'add'"},{name:"literal",value:"'addPeople'"},{name:"literal",value:"'advancedMarketSelector'"},{name:"literal",value:"'advancedTradeProduct'"},{name:"literal",value:"'affiliates'"},{name:"literal",value:"'airdrop'"},{name:"literal",value:"'airdropAlt'"},{name:"literal",value:"'airdropCoins'"},{name:"literal",value:"'airdropParachute'"},{name:"literal",value:"'alien'"},{name:"literal",value:"'allTimeHigh'"},{name:"literal",value:"'allocation'"},{name:"literal",value:"'annotation'"},{name:"literal",value:"'api'"},{name:"literal",value:"'apiPlug'"},{name:"literal",value:"'apothecary'"},{name:"literal",value:"'appSwitcher'"},{name:"literal",value:"'apple'"},{name:"literal",value:"'appleLogo'"},{name:"literal",value:"'application'"},{name:"literal",value:"'arrowDown'"},{name:"literal",value:"'arrowLeft'"},{name:"literal",value:"'arrowRight'"},{name:"literal",value:"'arrowUp'"},{name:"literal",value:"'arrowsHorizontal'"},{name:"literal",value:"'arrowsUpDown'"},{name:"literal",value:"'arrowsVertical'"},{name:"literal",value:"'artwork'"},{name:"literal",value:"'assetHubProduct'"},{name:"literal",value:"'assetManagementProduct'"},{name:"literal",value:"'astronautHelmet'"},{name:"literal",value:"'atSign'"},{name:"literal",value:"'atomScience'"},{name:"literal",value:"'auto'"},{name:"literal",value:"'autoCar'"},{name:"literal",value:"'avatar'"},{name:"literal",value:"'average'"},{name:"literal",value:"'backArrow'"},{name:"literal",value:"'ballot'"},{name:"literal",value:"'ballotbox'"},{name:"literal",value:"'bandage'"},{name:"literal",value:"'bank'"},{name:"literal",value:"'barChartSimple'"},{name:"literal",value:"'barChartWindow'"},{name:"literal",value:"'base'"},{name:"literal",value:"'baseApps'"},{name:"literal",value:"'baseFeed'"},{name:"literal",value:"'baseNotification'"},{name:"literal",value:"'baseQuickBuy'"},{name:"literal",value:"'baseSquare'"},{name:"literal",value:"'baseTransact'"},{name:"literal",value:"'baseVerification'"},{name:"literal",value:"'baseWallet'"},{name:"literal",value:"'baseball'"},{name:"literal",value:"'basketball'"},{name:"literal",value:"'beaker'"},{name:"literal",value:"'beginningArrow'"},{name:"literal",value:"'bell'"},{name:"literal",value:"'bellCheck'"},{name:"literal",value:"'bellPlus'"},{name:"literal",value:"'birthcertificate'"},{name:"literal",value:"'block'"},{name:"literal",value:"'blockchain'"},{name:"literal",value:"'blog'"},{name:"literal",value:"'book'"},{name:"literal",value:"'bookmark'"},{name:"literal",value:"'borrowProduct'"},{name:"literal",value:"'boxing'"},{name:"literal",value:"'bridging'"},{name:"literal",value:"'briefcase'"},{name:"literal",value:"'briefcaseAlt'"},{name:"literal",value:"'browser'"},{name:"literal",value:"'bug'"},{name:"literal",value:"'building'"},{name:"literal",value:"'calculator'"},{name:"literal",value:"'calendar'"},{name:"literal",value:"'calendarBlank'"},{name:"literal",value:"'calendarDates'"},{name:"literal",value:"'calendarEmpty'"},{name:"literal",value:"'calendarHeart'"},{name:"literal",value:"'calendarMoney'"},{name:"literal",value:"'calendarStar'"},{name:"literal",value:"'camera'"},{name:"literal",value:"'candlesticks'"},{name:"literal",value:"'car'"},{name:"literal",value:"'card'"},{name:"literal",value:"'caret'"},{name:"literal",value:"'caretDown'"},{name:"literal",value:"'caretLeft'"},{name:"literal",value:"'caretRight'"},{name:"literal",value:"'caretUp'"},{name:"literal",value:"'cash'"},{name:"literal",value:"'cashAustralianDollar'"},{name:"literal",value:"'cashBrazilianReal'"},{name:"literal",value:"'cashBrazillianReal'"},{name:"literal",value:"'cashCanadianDollar'"},{name:"literal",value:"'cashCoins'"},{name:"literal",value:"'cashEUR'"},{name:"literal",value:"'cashGBP'"},{name:"literal",value:"'cashIndonesianRupiah'"},{name:"literal",value:"'cashJPY'"},{name:"literal",value:"'cashPhilippinePeso'"},{name:"literal",value:"'cashPolishZloty'"},{name:"literal",value:"'cashRupee'"},{name:"literal",value:"'cashSingaporeDollar'"},{name:"literal",value:"'cashSwissFranc'"},{name:"literal",value:"'cashThaiBaht'"},{name:"literal",value:"'cashTurkishLira'"},{name:"literal",value:"'cashUSD'"},{name:"literal",value:"'cashUaeDirham'"},{name:"literal",value:"'cashVietnameseDong'"},{name:"literal",value:"'chainLink'"},{name:"literal",value:"'chartBar'"},{name:"literal",value:"'chartCandles'"},{name:"literal",value:"'chartLine'"},{name:"literal",value:"'chartPie'"},{name:"literal",value:"'chartPieCircle'"},{name:"literal",value:"'chartVolume'"},{name:"literal",value:"'chatBotAgent'"},{name:"literal",value:"'chatBubble'"},{name:"literal",value:"'chatRequests'"},{name:"literal",value:"'checkboxChecked'"},{name:"literal",value:"'checkboxEmpty'"},{name:"literal",value:"'checkmark'"},{name:"literal",value:"'chess'"},{name:"literal",value:"'circleCheckmark'"},{name:"literal",value:"'circleCross'"},{name:"literal",value:"'circulatingSupply'"},{name:"literal",value:"'city'"},{name:"literal",value:"'clipboard'"},{name:"literal",value:"'clock'"},{name:"literal",value:"'clockOutline'"},{name:"literal",value:"'close'"},{name:"literal",value:"'closeCaption'"},{name:"literal",value:"'clothing'"},{name:"literal",value:"'cloud'"},{name:"literal",value:"'cloudPartial'"},{name:"literal",value:"'cloudProduct'"},{name:"literal",value:"'cluster'"},{name:"literal",value:"'coinbase'"},{name:"literal",value:"'coinbaseCardProduct'"},{name:"literal",value:"'coinbaseOne'"},{name:"literal",value:"'coinbaseOneCard'"},{name:"literal",value:"'coinbaseOneLogo'"},{name:"literal",value:"'coinbaseRewards'"},{name:"literal",value:"'coinsCrypto'"},{name:"literal",value:"'collapse'"},{name:"literal",value:"'collectibles'"},{name:"literal",value:"'collection'"},{name:"literal",value:"'comment'"},{name:"literal",value:"'commentPlus'"},{name:"literal",value:"'commerceProduct'"},{name:"literal",value:"'compass'"},{name:"literal",value:"'complianceProduct'"},{name:"literal",value:"'compose'"},{name:"literal",value:"'computerChip'"},{name:"literal",value:"'concierge'"},{name:"literal",value:"'conciergeBell'"},{name:"literal",value:"'config'"},{name:"literal",value:"'continuous'"},{name:"literal",value:"'convert'"},{name:"literal",value:"'copy'"},{name:"literal",value:"'corporation'"},{name:"literal",value:"'creatorCoin'"},{name:"literal",value:"'cricket'"},{name:"literal",value:"'cross'"},{name:"literal",value:"'crossTrade'"},{name:"literal",value:"'crypto'"},{name:"literal",value:"'cryptobasics'"},{name:"literal",value:"'crystalBall'"},{name:"literal",value:"'crystalBallInsight'"},{name:"literal",value:"'currencies'"},{name:"literal",value:"'custodyProduct'"},{name:"literal",value:"'dashboard'"},{name:"literal",value:"'dataMarketplaceProduct'"},{name:"literal",value:"'dataStack'"},{name:"literal",value:"'defi'"},{name:"literal",value:"'delegateProduct'"},{name:"literal",value:"'deposit'"},{name:"literal",value:"'derivatives'"},{name:"literal",value:"'derivativesProduct'"},{name:"literal",value:"'derivativesProductNew'"},{name:"literal",value:"'developerAPIProduct'"},{name:"literal",value:"'developerPlatformProduct'"},{name:"literal",value:"'dex'"},{name:"literal",value:"'diagonalDownArrow'"},{name:"literal",value:"'diagonalRightArrow'"},{name:"literal",value:"'diagonalUpArrow'"},{name:"literal",value:"'diamond'"},{name:"literal",value:"'diamondIncentives'"},{name:"literal",value:"'dinnerPlate'"},{name:"literal",value:"'directDeposit'"},{name:"literal",value:"'directDepositIcon'"},{name:"literal",value:"'disabledPhone'"},{name:"literal",value:"'discordLogo'"},{name:"literal",value:"'distribution'"},{name:"literal",value:"'document'"},{name:"literal",value:"'documentation'"},{name:"literal",value:"'dot'"},{name:"literal",value:"'doubleChevronRight'"},{name:"literal",value:"'downArrow'"},{name:"literal",value:"'download'"},{name:"literal",value:"'drag'"},{name:"literal",value:"'drops'"},{name:"literal",value:"'earn'"},{name:"literal",value:"'earnProduct'"},{name:"literal",value:"'earnRewards'"},{name:"literal",value:"'earthquake'"},{name:"literal",value:"'educationBook'"},{name:"literal",value:"'educationPencil'"},{name:"literal",value:"'email'"},{name:"literal",value:"'endArrow'"},{name:"literal",value:"'entertainment'"},{name:"literal",value:"'error'"},{name:"literal",value:"'ethereum'"},{name:"literal",value:"'eventContracts'"},{name:"literal",value:"'exchangeProduct'"},{name:"literal",value:"'exclamationMark'"},{name:"literal",value:"'expand'"},{name:"literal",value:"'expandAddress'"},{name:"literal",value:"'expandAll'"},{name:"literal",value:"'externalLink'"},{name:"literal",value:"'eye'"},{name:"literal",value:"'faceScan'"},{name:"literal",value:"'faces'"},{name:"literal",value:"'factory'"},{name:"literal",value:"'faucet'"},{name:"literal",value:"'fib'"},{name:"literal",value:"'filmStrip'"},{name:"literal",value:"'filter'"},{name:"literal",value:"'fingerprint'"},{name:"literal",value:"'flame'"},{name:"literal",value:"'folder'"},{name:"literal",value:"'folderArrow'"},{name:"literal",value:"'folderOpen'"},{name:"literal",value:"'followAdd'"},{name:"literal",value:"'following'"},{name:"literal",value:"'football'"},{name:"literal",value:"'fork'"},{name:"literal",value:"'forwardArrow'"},{name:"literal",value:"'fscsProtection'"},{name:"literal",value:"'gab'"},{name:"literal",value:"'games'"},{name:"literal",value:"'gaming'"},{name:"literal",value:"'gasFees'"},{name:"literal",value:"'gasFeesAlt'"},{name:"literal",value:"'gauge'"},{name:"literal",value:"'gaugeEmpty'"},{name:"literal",value:"'gaugeHigh'"},{name:"literal",value:"'gaugeHighLow'"},{name:"literal",value:"'gaugeHighMid'"},{name:"literal",value:"'gaugeLow'"},{name:"literal",value:"'gaugeLowHigh'"},{name:"literal",value:"'gaugeLowMid'"},{name:"literal",value:"'gaugeMedium'"},{name:"literal",value:"'gavel'"},{name:"literal",value:"'gear'"},{name:"literal",value:"'generalCharacter'"},{name:"literal",value:"'ghost'"},{name:"literal",value:"'gif'"},{name:"literal",value:"'giftBox'"},{name:"literal",value:"'giftCard'"},{name:"literal",value:"'gitHubLogo'"},{name:"literal",value:"'globe'"},{name:"literal",value:"'golf'"},{name:"literal",value:"'googleLogo'"},{name:"literal",value:"'greenEnergy'"},{name:"literal",value:"'grid'"},{name:"literal",value:"'group'"},{name:"literal",value:"'hamburger'"},{name:"literal",value:"'hammer'"},{name:"literal",value:"'heart'"},{name:"literal",value:"'helpCenterProduct'"},{name:"literal",value:"'helpCenterQuestionMark'"},{name:"literal",value:"'hiddenEye'"},{name:"literal",value:"'hockey'"},{name:"literal",value:"'home'"},{name:"literal",value:"'horizontalLine'"},{name:"literal",value:"'hospital'"},{name:"literal",value:"'hospitalCross'"},{name:"literal",value:"'hurricane'"},{name:"literal",value:"'ideal'"},{name:"literal",value:"'identityCard'"},{name:"literal",value:"'image'"},{name:"literal",value:"'info'"},{name:"literal",value:"'initiator'"},{name:"literal",value:"'instagramLogo'"},{name:"literal",value:"'instantUnstakingClock'"},{name:"literal",value:"'institute'"},{name:"literal",value:"'institutionalProduct'"},{name:"literal",value:"'interest'"},{name:"literal",value:"'invisible'"},{name:"literal",value:"'invoice'"},{name:"literal",value:"'key'"},{name:"literal",value:"'keyboard'"},{name:"literal",value:"'laptop'"},{name:"literal",value:"'leadChart'"},{name:"literal",value:"'leadCoin'"},{name:"literal",value:"'learningRewardsProduct'"},{name:"literal",value:"'light'"},{name:"literal",value:"'lightbulb'"},{name:"literal",value:"'lightning'"},{name:"literal",value:"'lightningBolt'"},{name:"literal",value:"'lineChartCrypto'"},{name:"literal",value:"'list'"},{name:"literal",value:"'location'"},{name:"literal",value:"'lock'"},{name:"literal",value:"'login'"},{name:"literal",value:"'logout'"},{name:"literal",value:"'loop'"},{name:"literal",value:"'magnifyingGlass'"},{name:"literal",value:"'marketCap'"},{name:"literal",value:"'medal'"},{name:"literal",value:"'megaphone'"},{name:"literal",value:"'menu'"},{name:"literal",value:"'metaverse'"},{name:"literal",value:"'microphone'"},{name:"literal",value:"'microphoneCordless'"},{name:"literal",value:"'microscope'"},{name:"literal",value:"'mint'"},{name:"literal",value:"'minus'"},{name:"literal",value:"'mma'"},{name:"literal",value:"'moneyCardCoin'"},{name:"literal",value:"'moon'"},{name:"literal",value:"'more'"},{name:"literal",value:"'moreVertical'"},{name:"literal",value:"'motorsport'"},{name:"literal",value:"'music'"},{name:"literal",value:"'musicArticles'"},{name:"literal",value:"'needle'"},{name:"literal",value:"'newsFeed'"},{name:"literal",value:"'newsletter'"},{name:"literal",value:"'nft'"},{name:"literal",value:"'nftBuy'"},{name:"literal",value:"'nftOffer'"},{name:"literal",value:"'nftProduct'"},{name:"literal",value:"'nftSale'"},{name:"literal",value:"'noRocket'"},{name:"literal",value:"'noWifi'"},{name:"literal",value:"'nodeProduct'"},{name:"literal",value:"'oil'"},{name:"literal",value:"'options'"},{name:"literal",value:"'orderBook'"},{name:"literal",value:"'orderHistory'"},{name:"literal",value:"'outline'"},{name:"literal",value:"'pFPS'"},{name:"literal",value:"'paperAirplane'"},{name:"literal",value:"'paperclip'"},{name:"literal",value:"'participate'"},{name:"literal",value:"'participateProduct'"},{name:"literal",value:"'passKey'"},{name:"literal",value:"'passport'"},{name:"literal",value:"'pause'"},{name:"literal",value:"'pay'"},{name:"literal",value:"'payProduct'"},{name:"literal",value:"'paymentCard'"},{name:"literal",value:"'payments'"},{name:"literal",value:"'payouts'"},{name:"literal",value:"'paypal'"},{name:"literal",value:"'pencil'"},{name:"literal",value:"'peopleGroup'"},{name:"literal",value:"'peopleStar'"},{name:"literal",value:"'percentage'"},{name:"literal",value:"'perpetualSwap'"},{name:"literal",value:"'phone'"},{name:"literal",value:"'pieChartData'"},{name:"literal",value:"'pillBottle'"},{name:"literal",value:"'pillCapsule'"},{name:"literal",value:"'pin'"},{name:"literal",value:"'plane'"},{name:"literal",value:"'planet'"},{name:"literal",value:"'play'"},{name:"literal",value:"'playbutton'"},{name:"literal",value:"'plusMinus'"},{name:"literal",value:"'podiumStar'"},{name:"literal",value:"'politicsBuilding'"},{name:"literal",value:"'politicsCandidate'"},{name:"literal",value:"'politicsFlag'"},{name:"literal",value:"'politicsGavel'"},{name:"literal",value:"'politicsPodium'"},{name:"literal",value:"'politicsStar'"},{name:"literal",value:"'powerTool'"},{name:"literal",value:"'priceAlerts'"},{name:"literal",value:"'priceAlertsCheck'"},{name:"literal",value:"'primePoduct'"},{name:"literal",value:"'privateClientProduct'"},{name:"literal",value:"'proProduct'"},{name:"literal",value:"'profile'"},{name:"literal",value:"'protection'"},{name:"literal",value:"'pulse'"},{name:"literal",value:"'pyramid'"},{name:"literal",value:"'qrCode'"},{name:"literal",value:"'qrCodeAlt'"},{name:"literal",value:"'queryTransact'"},{name:"literal",value:"'questionMark'"},{name:"literal",value:"'quotation'"},{name:"literal",value:"'rain'"},{name:"literal",value:"'ratingsCheck'"},{name:"literal",value:"'ratingsChecks'"},{name:"literal",value:"'ratingsStar'"},{name:"literal",value:"'reCenter'"},{name:"literal",value:"'rectangle'"},{name:"literal",value:"'recurring'"},{name:"literal",value:"'refresh'"},{name:"literal",value:"'regulated'"},{name:"literal",value:"'regulatedFutures'"},{name:"literal",value:"'report'"},{name:"literal",value:"'rewardsProduct'"},{name:"literal",value:"'ribbon'"},{name:"literal",value:"'robot'"},{name:"literal",value:"'rocket'"},{name:"literal",value:"'rocketShip'"},{name:"literal",value:"'rollingSpot'"},{name:"literal",value:"'rosettaProduct'"},{name:"literal",value:"'rottenTomato'"},{name:"literal",value:"'royalty'"},{name:"literal",value:"'safe'"},{name:"literal",value:"'save'"},{name:"literal",value:"'savingsBank'"},{name:"literal",value:"'scanQrCode'"},{name:"literal",value:"'scienceAtom'"},{name:"literal",value:"'scienceBeaker'"},{name:"literal",value:"'scienceMoon'"},{name:"literal",value:"'search'"},{name:"literal",value:"'securityKey'"},{name:"literal",value:"'securityShield'"},{name:"literal",value:"'seen'"},{name:"literal",value:"'sendReceive'"},{name:"literal",value:"'setPinCode'"},{name:"literal",value:"'settings'"},{name:"literal",value:"'share'"},{name:"literal",value:"'shield'"},{name:"literal",value:"'shieldOutline'"},{name:"literal",value:"'shoe'"},{name:"literal",value:"'shoppingCart'"},{name:"literal",value:"'signinProduct'"},{name:"literal",value:"'singleCoin'"},{name:"literal",value:"'singleNote'"},{name:"literal",value:"'singlecloud'"},{name:"literal",value:"'smartContract'"},{name:"literal",value:"'snow'"},{name:"literal",value:"'soccer'"},{name:"literal",value:"'socialChat'"},{name:"literal",value:"'socialReshare'"},{name:"literal",value:"'socialShare'"},{name:"literal",value:"'sofort'"},{name:"literal",value:"'sortDoubleArrow'"},{name:"literal",value:"'sortDown'"},{name:"literal",value:"'sortDownCenter'"},{name:"literal",value:"'sortUp'"},{name:"literal",value:"'sortUpCenter'"},{name:"literal",value:"'soundOff'"},{name:"literal",value:"'soundOn'"},{name:"literal",value:"'sparkle'"},{name:"literal",value:"'speaker'"},{name:"literal",value:"'speechBubble'"},{name:"literal",value:"'stableCoin'"},{name:"literal",value:"'stablecoinStack'"},{name:"literal",value:"'staggeredList'"},{name:"literal",value:"'stake'"},{name:"literal",value:"'staking'"},{name:"literal",value:"'star'"},{name:"literal",value:"'starAward'"},{name:"literal",value:"'starBubble'"},{name:"literal",value:"'starTrophy'"},{name:"literal",value:"'statusDot'"},{name:"literal",value:"'step0'"},{name:"literal",value:"'step1'"},{name:"literal",value:"'step2'"},{name:"literal",value:"'step3'"},{name:"literal",value:"'step4'"},{name:"literal",value:"'step5'"},{name:"literal",value:"'step6'"},{name:"literal",value:"'step7'"},{name:"literal",value:"'step8'"},{name:"literal",value:"'step9'"},{name:"literal",value:"'strategy'"},{name:"literal",value:"'sun'"},{name:"literal",value:"'support'"},{name:"literal",value:"'tag'"},{name:"literal",value:"'taxes'"},{name:"literal",value:"'taxesReceipt'"},{name:"literal",value:"'telephone'"},{name:"literal",value:"'tennis'"},{name:"literal",value:"'test'"},{name:"literal",value:"'thermometer'"},{name:"literal",value:"'thumbsDown'"},{name:"literal",value:"'thumbsDownOutline'"},{name:"literal",value:"'thumbsUp'"},{name:"literal",value:"'thumbsUpOutline'"},{name:"literal",value:"'tokenLaunchCoin'"},{name:"literal",value:"'tokenLaunchRocket'"},{name:"literal",value:"'tokenSales'"},{name:"literal",value:"'tornado'"},{name:"literal",value:"'trading'"},{name:"literal",value:"'transactions'"},{name:"literal",value:"'trashCan'"},{name:"literal",value:"'trophy'"},{name:"literal",value:"'trophyCup'"},{name:"literal",value:"'tshirt'"},{name:"literal",value:"'tv'"},{name:"literal",value:"'tvStand'"},{name:"literal",value:"'twitterLogo'"},{name:"literal",value:"'ultility'"},{name:"literal",value:"'umbrella'"},{name:"literal",value:"'undo'"},{name:"literal",value:"'unfollowPeople'"},{name:"literal",value:"'unknown'"},{name:"literal",value:"'unlock'"},{name:"literal",value:"'upArrow'"},{name:"literal",value:"'upload'"},{name:"literal",value:"'venturesProduct'"},{name:"literal",value:"'verifiedBadge'"},{name:"literal",value:"'verifiedPools'"},{name:"literal",value:"'verticalLine'"},{name:"literal",value:"'virus'"},{name:"literal",value:"'visible'"},{name:"literal",value:"'waasProduct'"},{name:"literal",value:"'wallet'"},{name:"literal",value:"'walletLogo'"},{name:"literal",value:"'walletProduct'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'webhooks'"},{name:"literal",value:"'wellness'"},{name:"literal",value:"'wifi'"},{name:"literal",value:"'wind'"},{name:"literal",value:"'wireTransfer'"},{name:"literal",value:"'withdraw'"},{name:"literal",value:"'wrapToken'"},{name:"literal",value:"'xLogo'"}],required:!1},description:"Icon to render at the start of the button."},{key:"startIconActive",value:{name:"boolean",required:!1},description:"Whether the start icon is active"},{key:"end",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"Set the end node"},{key:"endIcon",value:{name:"union",raw:`| 'account'
| 'activity'
| 'add'
| 'addPeople'
| 'advancedMarketSelector'
| 'advancedTradeProduct'
| 'affiliates'
| 'airdrop'
| 'airdropAlt'
| 'airdropCoins'
| 'airdropParachute'
| 'alien'
| 'allTimeHigh'
| 'allocation'
| 'annotation'
| 'api'
| 'apiPlug'
| 'apothecary'
| 'appSwitcher'
| 'apple'
| 'appleLogo'
| 'application'
| 'arrowDown'
| 'arrowLeft'
| 'arrowRight'
| 'arrowUp'
| 'arrowsHorizontal'
| 'arrowsUpDown'
| 'arrowsVertical'
| 'artwork'
| 'assetHubProduct'
| 'assetManagementProduct'
| 'astronautHelmet'
| 'atSign'
| 'atomScience'
| 'auto'
| 'autoCar'
| 'avatar'
| 'average'
| 'backArrow'
| 'ballot'
| 'ballotbox'
| 'bandage'
| 'bank'
| 'barChartSimple'
| 'barChartWindow'
| 'base'
| 'baseApps'
| 'baseFeed'
| 'baseNotification'
| 'baseQuickBuy'
| 'baseSquare'
| 'baseTransact'
| 'baseVerification'
| 'baseWallet'
| 'baseball'
| 'basketball'
| 'beaker'
| 'beginningArrow'
| 'bell'
| 'bellCheck'
| 'bellPlus'
| 'birthcertificate'
| 'block'
| 'blockchain'
| 'blog'
| 'book'
| 'bookmark'
| 'borrowProduct'
| 'boxing'
| 'bridging'
| 'briefcase'
| 'briefcaseAlt'
| 'browser'
| 'bug'
| 'building'
| 'calculator'
| 'calendar'
| 'calendarBlank'
| 'calendarDates'
| 'calendarEmpty'
| 'calendarHeart'
| 'calendarMoney'
| 'calendarStar'
| 'camera'
| 'candlesticks'
| 'car'
| 'card'
| 'caret'
| 'caretDown'
| 'caretLeft'
| 'caretRight'
| 'caretUp'
| 'cash'
| 'cashAustralianDollar'
| 'cashBrazilianReal'
| 'cashBrazillianReal'
| 'cashCanadianDollar'
| 'cashCoins'
| 'cashEUR'
| 'cashGBP'
| 'cashIndonesianRupiah'
| 'cashJPY'
| 'cashPhilippinePeso'
| 'cashPolishZloty'
| 'cashRupee'
| 'cashSingaporeDollar'
| 'cashSwissFranc'
| 'cashThaiBaht'
| 'cashTurkishLira'
| 'cashUSD'
| 'cashUaeDirham'
| 'cashVietnameseDong'
| 'chainLink'
| 'chartBar'
| 'chartCandles'
| 'chartLine'
| 'chartPie'
| 'chartPieCircle'
| 'chartVolume'
| 'chatBotAgent'
| 'chatBubble'
| 'chatRequests'
| 'checkboxChecked'
| 'checkboxEmpty'
| 'checkmark'
| 'chess'
| 'circleCheckmark'
| 'circleCross'
| 'circulatingSupply'
| 'city'
| 'clipboard'
| 'clock'
| 'clockOutline'
| 'close'
| 'closeCaption'
| 'clothing'
| 'cloud'
| 'cloudPartial'
| 'cloudProduct'
| 'cluster'
| 'coinbase'
| 'coinbaseCardProduct'
| 'coinbaseOne'
| 'coinbaseOneCard'
| 'coinbaseOneLogo'
| 'coinbaseRewards'
| 'coinsCrypto'
| 'collapse'
| 'collectibles'
| 'collection'
| 'comment'
| 'commentPlus'
| 'commerceProduct'
| 'compass'
| 'complianceProduct'
| 'compose'
| 'computerChip'
| 'concierge'
| 'conciergeBell'
| 'config'
| 'continuous'
| 'convert'
| 'copy'
| 'corporation'
| 'creatorCoin'
| 'cricket'
| 'cross'
| 'crossTrade'
| 'crypto'
| 'cryptobasics'
| 'crystalBall'
| 'crystalBallInsight'
| 'currencies'
| 'custodyProduct'
| 'dashboard'
| 'dataMarketplaceProduct'
| 'dataStack'
| 'defi'
| 'delegateProduct'
| 'deposit'
| 'derivatives'
| 'derivativesProduct'
| 'derivativesProductNew'
| 'developerAPIProduct'
| 'developerPlatformProduct'
| 'dex'
| 'diagonalDownArrow'
| 'diagonalRightArrow'
| 'diagonalUpArrow'
| 'diamond'
| 'diamondIncentives'
| 'dinnerPlate'
| 'directDeposit'
| 'directDepositIcon'
| 'disabledPhone'
| 'discordLogo'
| 'distribution'
| 'document'
| 'documentation'
| 'dot'
| 'doubleChevronRight'
| 'downArrow'
| 'download'
| 'drag'
| 'drops'
| 'earn'
| 'earnProduct'
| 'earnRewards'
| 'earthquake'
| 'educationBook'
| 'educationPencil'
| 'email'
| 'endArrow'
| 'entertainment'
| 'error'
| 'ethereum'
| 'eventContracts'
| 'exchangeProduct'
| 'exclamationMark'
| 'expand'
| 'expandAddress'
| 'expandAll'
| 'externalLink'
| 'eye'
| 'faceScan'
| 'faces'
| 'factory'
| 'faucet'
| 'fib'
| 'filmStrip'
| 'filter'
| 'fingerprint'
| 'flame'
| 'folder'
| 'folderArrow'
| 'folderOpen'
| 'followAdd'
| 'following'
| 'football'
| 'fork'
| 'forwardArrow'
| 'fscsProtection'
| 'gab'
| 'games'
| 'gaming'
| 'gasFees'
| 'gasFeesAlt'
| 'gauge'
| 'gaugeEmpty'
| 'gaugeHigh'
| 'gaugeHighLow'
| 'gaugeHighMid'
| 'gaugeLow'
| 'gaugeLowHigh'
| 'gaugeLowMid'
| 'gaugeMedium'
| 'gavel'
| 'gear'
| 'generalCharacter'
| 'ghost'
| 'gif'
| 'giftBox'
| 'giftCard'
| 'gitHubLogo'
| 'globe'
| 'golf'
| 'googleLogo'
| 'greenEnergy'
| 'grid'
| 'group'
| 'hamburger'
| 'hammer'
| 'heart'
| 'helpCenterProduct'
| 'helpCenterQuestionMark'
| 'hiddenEye'
| 'hockey'
| 'home'
| 'horizontalLine'
| 'hospital'
| 'hospitalCross'
| 'hurricane'
| 'ideal'
| 'identityCard'
| 'image'
| 'info'
| 'initiator'
| 'instagramLogo'
| 'instantUnstakingClock'
| 'institute'
| 'institutionalProduct'
| 'interest'
| 'invisible'
| 'invoice'
| 'key'
| 'keyboard'
| 'laptop'
| 'leadChart'
| 'leadCoin'
| 'learningRewardsProduct'
| 'light'
| 'lightbulb'
| 'lightning'
| 'lightningBolt'
| 'lineChartCrypto'
| 'list'
| 'location'
| 'lock'
| 'login'
| 'logout'
| 'loop'
| 'magnifyingGlass'
| 'marketCap'
| 'medal'
| 'megaphone'
| 'menu'
| 'metaverse'
| 'microphone'
| 'microphoneCordless'
| 'microscope'
| 'mint'
| 'minus'
| 'mma'
| 'moneyCardCoin'
| 'moon'
| 'more'
| 'moreVertical'
| 'motorsport'
| 'music'
| 'musicArticles'
| 'needle'
| 'newsFeed'
| 'newsletter'
| 'nft'
| 'nftBuy'
| 'nftOffer'
| 'nftProduct'
| 'nftSale'
| 'noRocket'
| 'noWifi'
| 'nodeProduct'
| 'oil'
| 'options'
| 'orderBook'
| 'orderHistory'
| 'outline'
| 'pFPS'
| 'paperAirplane'
| 'paperclip'
| 'participate'
| 'participateProduct'
| 'passKey'
| 'passport'
| 'pause'
| 'pay'
| 'payProduct'
| 'paymentCard'
| 'payments'
| 'payouts'
| 'paypal'
| 'pencil'
| 'peopleGroup'
| 'peopleStar'
| 'percentage'
| 'perpetualSwap'
| 'phone'
| 'pieChartData'
| 'pillBottle'
| 'pillCapsule'
| 'pin'
| 'plane'
| 'planet'
| 'play'
| 'playbutton'
| 'plusMinus'
| 'podiumStar'
| 'politicsBuilding'
| 'politicsCandidate'
| 'politicsFlag'
| 'politicsGavel'
| 'politicsPodium'
| 'politicsStar'
| 'powerTool'
| 'priceAlerts'
| 'priceAlertsCheck'
| 'primePoduct'
| 'privateClientProduct'
| 'proProduct'
| 'profile'
| 'protection'
| 'pulse'
| 'pyramid'
| 'qrCode'
| 'qrCodeAlt'
| 'queryTransact'
| 'questionMark'
| 'quotation'
| 'rain'
| 'ratingsCheck'
| 'ratingsChecks'
| 'ratingsStar'
| 'reCenter'
| 'rectangle'
| 'recurring'
| 'refresh'
| 'regulated'
| 'regulatedFutures'
| 'report'
| 'rewardsProduct'
| 'ribbon'
| 'robot'
| 'rocket'
| 'rocketShip'
| 'rollingSpot'
| 'rosettaProduct'
| 'rottenTomato'
| 'royalty'
| 'safe'
| 'save'
| 'savingsBank'
| 'scanQrCode'
| 'scienceAtom'
| 'scienceBeaker'
| 'scienceMoon'
| 'search'
| 'securityKey'
| 'securityShield'
| 'seen'
| 'sendReceive'
| 'setPinCode'
| 'settings'
| 'share'
| 'shield'
| 'shieldOutline'
| 'shoe'
| 'shoppingCart'
| 'signinProduct'
| 'singleCoin'
| 'singleNote'
| 'singlecloud'
| 'smartContract'
| 'snow'
| 'soccer'
| 'socialChat'
| 'socialReshare'
| 'socialShare'
| 'sofort'
| 'sortDoubleArrow'
| 'sortDown'
| 'sortDownCenter'
| 'sortUp'
| 'sortUpCenter'
| 'soundOff'
| 'soundOn'
| 'sparkle'
| 'speaker'
| 'speechBubble'
| 'stableCoin'
| 'stablecoinStack'
| 'staggeredList'
| 'stake'
| 'staking'
| 'star'
| 'starAward'
| 'starBubble'
| 'starTrophy'
| 'statusDot'
| 'step0'
| 'step1'
| 'step2'
| 'step3'
| 'step4'
| 'step5'
| 'step6'
| 'step7'
| 'step8'
| 'step9'
| 'strategy'
| 'sun'
| 'support'
| 'tag'
| 'taxes'
| 'taxesReceipt'
| 'telephone'
| 'tennis'
| 'test'
| 'thermometer'
| 'thumbsDown'
| 'thumbsDownOutline'
| 'thumbsUp'
| 'thumbsUpOutline'
| 'tokenLaunchCoin'
| 'tokenLaunchRocket'
| 'tokenSales'
| 'tornado'
| 'trading'
| 'transactions'
| 'trashCan'
| 'trophy'
| 'trophyCup'
| 'tshirt'
| 'tv'
| 'tvStand'
| 'twitterLogo'
| 'ultility'
| 'umbrella'
| 'undo'
| 'unfollowPeople'
| 'unknown'
| 'unlock'
| 'upArrow'
| 'upload'
| 'venturesProduct'
| 'verifiedBadge'
| 'verifiedPools'
| 'verticalLine'
| 'virus'
| 'visible'
| 'waasProduct'
| 'wallet'
| 'walletLogo'
| 'walletProduct'
| 'warning'
| 'webhooks'
| 'wellness'
| 'wifi'
| 'wind'
| 'wireTransfer'
| 'withdraw'
| 'wrapToken'
| 'xLogo'`,elements:[{name:"literal",value:"'account'"},{name:"literal",value:"'activity'"},{name:"literal",value:"'add'"},{name:"literal",value:"'addPeople'"},{name:"literal",value:"'advancedMarketSelector'"},{name:"literal",value:"'advancedTradeProduct'"},{name:"literal",value:"'affiliates'"},{name:"literal",value:"'airdrop'"},{name:"literal",value:"'airdropAlt'"},{name:"literal",value:"'airdropCoins'"},{name:"literal",value:"'airdropParachute'"},{name:"literal",value:"'alien'"},{name:"literal",value:"'allTimeHigh'"},{name:"literal",value:"'allocation'"},{name:"literal",value:"'annotation'"},{name:"literal",value:"'api'"},{name:"literal",value:"'apiPlug'"},{name:"literal",value:"'apothecary'"},{name:"literal",value:"'appSwitcher'"},{name:"literal",value:"'apple'"},{name:"literal",value:"'appleLogo'"},{name:"literal",value:"'application'"},{name:"literal",value:"'arrowDown'"},{name:"literal",value:"'arrowLeft'"},{name:"literal",value:"'arrowRight'"},{name:"literal",value:"'arrowUp'"},{name:"literal",value:"'arrowsHorizontal'"},{name:"literal",value:"'arrowsUpDown'"},{name:"literal",value:"'arrowsVertical'"},{name:"literal",value:"'artwork'"},{name:"literal",value:"'assetHubProduct'"},{name:"literal",value:"'assetManagementProduct'"},{name:"literal",value:"'astronautHelmet'"},{name:"literal",value:"'atSign'"},{name:"literal",value:"'atomScience'"},{name:"literal",value:"'auto'"},{name:"literal",value:"'autoCar'"},{name:"literal",value:"'avatar'"},{name:"literal",value:"'average'"},{name:"literal",value:"'backArrow'"},{name:"literal",value:"'ballot'"},{name:"literal",value:"'ballotbox'"},{name:"literal",value:"'bandage'"},{name:"literal",value:"'bank'"},{name:"literal",value:"'barChartSimple'"},{name:"literal",value:"'barChartWindow'"},{name:"literal",value:"'base'"},{name:"literal",value:"'baseApps'"},{name:"literal",value:"'baseFeed'"},{name:"literal",value:"'baseNotification'"},{name:"literal",value:"'baseQuickBuy'"},{name:"literal",value:"'baseSquare'"},{name:"literal",value:"'baseTransact'"},{name:"literal",value:"'baseVerification'"},{name:"literal",value:"'baseWallet'"},{name:"literal",value:"'baseball'"},{name:"literal",value:"'basketball'"},{name:"literal",value:"'beaker'"},{name:"literal",value:"'beginningArrow'"},{name:"literal",value:"'bell'"},{name:"literal",value:"'bellCheck'"},{name:"literal",value:"'bellPlus'"},{name:"literal",value:"'birthcertificate'"},{name:"literal",value:"'block'"},{name:"literal",value:"'blockchain'"},{name:"literal",value:"'blog'"},{name:"literal",value:"'book'"},{name:"literal",value:"'bookmark'"},{name:"literal",value:"'borrowProduct'"},{name:"literal",value:"'boxing'"},{name:"literal",value:"'bridging'"},{name:"literal",value:"'briefcase'"},{name:"literal",value:"'briefcaseAlt'"},{name:"literal",value:"'browser'"},{name:"literal",value:"'bug'"},{name:"literal",value:"'building'"},{name:"literal",value:"'calculator'"},{name:"literal",value:"'calendar'"},{name:"literal",value:"'calendarBlank'"},{name:"literal",value:"'calendarDates'"},{name:"literal",value:"'calendarEmpty'"},{name:"literal",value:"'calendarHeart'"},{name:"literal",value:"'calendarMoney'"},{name:"literal",value:"'calendarStar'"},{name:"literal",value:"'camera'"},{name:"literal",value:"'candlesticks'"},{name:"literal",value:"'car'"},{name:"literal",value:"'card'"},{name:"literal",value:"'caret'"},{name:"literal",value:"'caretDown'"},{name:"literal",value:"'caretLeft'"},{name:"literal",value:"'caretRight'"},{name:"literal",value:"'caretUp'"},{name:"literal",value:"'cash'"},{name:"literal",value:"'cashAustralianDollar'"},{name:"literal",value:"'cashBrazilianReal'"},{name:"literal",value:"'cashBrazillianReal'"},{name:"literal",value:"'cashCanadianDollar'"},{name:"literal",value:"'cashCoins'"},{name:"literal",value:"'cashEUR'"},{name:"literal",value:"'cashGBP'"},{name:"literal",value:"'cashIndonesianRupiah'"},{name:"literal",value:"'cashJPY'"},{name:"literal",value:"'cashPhilippinePeso'"},{name:"literal",value:"'cashPolishZloty'"},{name:"literal",value:"'cashRupee'"},{name:"literal",value:"'cashSingaporeDollar'"},{name:"literal",value:"'cashSwissFranc'"},{name:"literal",value:"'cashThaiBaht'"},{name:"literal",value:"'cashTurkishLira'"},{name:"literal",value:"'cashUSD'"},{name:"literal",value:"'cashUaeDirham'"},{name:"literal",value:"'cashVietnameseDong'"},{name:"literal",value:"'chainLink'"},{name:"literal",value:"'chartBar'"},{name:"literal",value:"'chartCandles'"},{name:"literal",value:"'chartLine'"},{name:"literal",value:"'chartPie'"},{name:"literal",value:"'chartPieCircle'"},{name:"literal",value:"'chartVolume'"},{name:"literal",value:"'chatBotAgent'"},{name:"literal",value:"'chatBubble'"},{name:"literal",value:"'chatRequests'"},{name:"literal",value:"'checkboxChecked'"},{name:"literal",value:"'checkboxEmpty'"},{name:"literal",value:"'checkmark'"},{name:"literal",value:"'chess'"},{name:"literal",value:"'circleCheckmark'"},{name:"literal",value:"'circleCross'"},{name:"literal",value:"'circulatingSupply'"},{name:"literal",value:"'city'"},{name:"literal",value:"'clipboard'"},{name:"literal",value:"'clock'"},{name:"literal",value:"'clockOutline'"},{name:"literal",value:"'close'"},{name:"literal",value:"'closeCaption'"},{name:"literal",value:"'clothing'"},{name:"literal",value:"'cloud'"},{name:"literal",value:"'cloudPartial'"},{name:"literal",value:"'cloudProduct'"},{name:"literal",value:"'cluster'"},{name:"literal",value:"'coinbase'"},{name:"literal",value:"'coinbaseCardProduct'"},{name:"literal",value:"'coinbaseOne'"},{name:"literal",value:"'coinbaseOneCard'"},{name:"literal",value:"'coinbaseOneLogo'"},{name:"literal",value:"'coinbaseRewards'"},{name:"literal",value:"'coinsCrypto'"},{name:"literal",value:"'collapse'"},{name:"literal",value:"'collectibles'"},{name:"literal",value:"'collection'"},{name:"literal",value:"'comment'"},{name:"literal",value:"'commentPlus'"},{name:"literal",value:"'commerceProduct'"},{name:"literal",value:"'compass'"},{name:"literal",value:"'complianceProduct'"},{name:"literal",value:"'compose'"},{name:"literal",value:"'computerChip'"},{name:"literal",value:"'concierge'"},{name:"literal",value:"'conciergeBell'"},{name:"literal",value:"'config'"},{name:"literal",value:"'continuous'"},{name:"literal",value:"'convert'"},{name:"literal",value:"'copy'"},{name:"literal",value:"'corporation'"},{name:"literal",value:"'creatorCoin'"},{name:"literal",value:"'cricket'"},{name:"literal",value:"'cross'"},{name:"literal",value:"'crossTrade'"},{name:"literal",value:"'crypto'"},{name:"literal",value:"'cryptobasics'"},{name:"literal",value:"'crystalBall'"},{name:"literal",value:"'crystalBallInsight'"},{name:"literal",value:"'currencies'"},{name:"literal",value:"'custodyProduct'"},{name:"literal",value:"'dashboard'"},{name:"literal",value:"'dataMarketplaceProduct'"},{name:"literal",value:"'dataStack'"},{name:"literal",value:"'defi'"},{name:"literal",value:"'delegateProduct'"},{name:"literal",value:"'deposit'"},{name:"literal",value:"'derivatives'"},{name:"literal",value:"'derivativesProduct'"},{name:"literal",value:"'derivativesProductNew'"},{name:"literal",value:"'developerAPIProduct'"},{name:"literal",value:"'developerPlatformProduct'"},{name:"literal",value:"'dex'"},{name:"literal",value:"'diagonalDownArrow'"},{name:"literal",value:"'diagonalRightArrow'"},{name:"literal",value:"'diagonalUpArrow'"},{name:"literal",value:"'diamond'"},{name:"literal",value:"'diamondIncentives'"},{name:"literal",value:"'dinnerPlate'"},{name:"literal",value:"'directDeposit'"},{name:"literal",value:"'directDepositIcon'"},{name:"literal",value:"'disabledPhone'"},{name:"literal",value:"'discordLogo'"},{name:"literal",value:"'distribution'"},{name:"literal",value:"'document'"},{name:"literal",value:"'documentation'"},{name:"literal",value:"'dot'"},{name:"literal",value:"'doubleChevronRight'"},{name:"literal",value:"'downArrow'"},{name:"literal",value:"'download'"},{name:"literal",value:"'drag'"},{name:"literal",value:"'drops'"},{name:"literal",value:"'earn'"},{name:"literal",value:"'earnProduct'"},{name:"literal",value:"'earnRewards'"},{name:"literal",value:"'earthquake'"},{name:"literal",value:"'educationBook'"},{name:"literal",value:"'educationPencil'"},{name:"literal",value:"'email'"},{name:"literal",value:"'endArrow'"},{name:"literal",value:"'entertainment'"},{name:"literal",value:"'error'"},{name:"literal",value:"'ethereum'"},{name:"literal",value:"'eventContracts'"},{name:"literal",value:"'exchangeProduct'"},{name:"literal",value:"'exclamationMark'"},{name:"literal",value:"'expand'"},{name:"literal",value:"'expandAddress'"},{name:"literal",value:"'expandAll'"},{name:"literal",value:"'externalLink'"},{name:"literal",value:"'eye'"},{name:"literal",value:"'faceScan'"},{name:"literal",value:"'faces'"},{name:"literal",value:"'factory'"},{name:"literal",value:"'faucet'"},{name:"literal",value:"'fib'"},{name:"literal",value:"'filmStrip'"},{name:"literal",value:"'filter'"},{name:"literal",value:"'fingerprint'"},{name:"literal",value:"'flame'"},{name:"literal",value:"'folder'"},{name:"literal",value:"'folderArrow'"},{name:"literal",value:"'folderOpen'"},{name:"literal",value:"'followAdd'"},{name:"literal",value:"'following'"},{name:"literal",value:"'football'"},{name:"literal",value:"'fork'"},{name:"literal",value:"'forwardArrow'"},{name:"literal",value:"'fscsProtection'"},{name:"literal",value:"'gab'"},{name:"literal",value:"'games'"},{name:"literal",value:"'gaming'"},{name:"literal",value:"'gasFees'"},{name:"literal",value:"'gasFeesAlt'"},{name:"literal",value:"'gauge'"},{name:"literal",value:"'gaugeEmpty'"},{name:"literal",value:"'gaugeHigh'"},{name:"literal",value:"'gaugeHighLow'"},{name:"literal",value:"'gaugeHighMid'"},{name:"literal",value:"'gaugeLow'"},{name:"literal",value:"'gaugeLowHigh'"},{name:"literal",value:"'gaugeLowMid'"},{name:"literal",value:"'gaugeMedium'"},{name:"literal",value:"'gavel'"},{name:"literal",value:"'gear'"},{name:"literal",value:"'generalCharacter'"},{name:"literal",value:"'ghost'"},{name:"literal",value:"'gif'"},{name:"literal",value:"'giftBox'"},{name:"literal",value:"'giftCard'"},{name:"literal",value:"'gitHubLogo'"},{name:"literal",value:"'globe'"},{name:"literal",value:"'golf'"},{name:"literal",value:"'googleLogo'"},{name:"literal",value:"'greenEnergy'"},{name:"literal",value:"'grid'"},{name:"literal",value:"'group'"},{name:"literal",value:"'hamburger'"},{name:"literal",value:"'hammer'"},{name:"literal",value:"'heart'"},{name:"literal",value:"'helpCenterProduct'"},{name:"literal",value:"'helpCenterQuestionMark'"},{name:"literal",value:"'hiddenEye'"},{name:"literal",value:"'hockey'"},{name:"literal",value:"'home'"},{name:"literal",value:"'horizontalLine'"},{name:"literal",value:"'hospital'"},{name:"literal",value:"'hospitalCross'"},{name:"literal",value:"'hurricane'"},{name:"literal",value:"'ideal'"},{name:"literal",value:"'identityCard'"},{name:"literal",value:"'image'"},{name:"literal",value:"'info'"},{name:"literal",value:"'initiator'"},{name:"literal",value:"'instagramLogo'"},{name:"literal",value:"'instantUnstakingClock'"},{name:"literal",value:"'institute'"},{name:"literal",value:"'institutionalProduct'"},{name:"literal",value:"'interest'"},{name:"literal",value:"'invisible'"},{name:"literal",value:"'invoice'"},{name:"literal",value:"'key'"},{name:"literal",value:"'keyboard'"},{name:"literal",value:"'laptop'"},{name:"literal",value:"'leadChart'"},{name:"literal",value:"'leadCoin'"},{name:"literal",value:"'learningRewardsProduct'"},{name:"literal",value:"'light'"},{name:"literal",value:"'lightbulb'"},{name:"literal",value:"'lightning'"},{name:"literal",value:"'lightningBolt'"},{name:"literal",value:"'lineChartCrypto'"},{name:"literal",value:"'list'"},{name:"literal",value:"'location'"},{name:"literal",value:"'lock'"},{name:"literal",value:"'login'"},{name:"literal",value:"'logout'"},{name:"literal",value:"'loop'"},{name:"literal",value:"'magnifyingGlass'"},{name:"literal",value:"'marketCap'"},{name:"literal",value:"'medal'"},{name:"literal",value:"'megaphone'"},{name:"literal",value:"'menu'"},{name:"literal",value:"'metaverse'"},{name:"literal",value:"'microphone'"},{name:"literal",value:"'microphoneCordless'"},{name:"literal",value:"'microscope'"},{name:"literal",value:"'mint'"},{name:"literal",value:"'minus'"},{name:"literal",value:"'mma'"},{name:"literal",value:"'moneyCardCoin'"},{name:"literal",value:"'moon'"},{name:"literal",value:"'more'"},{name:"literal",value:"'moreVertical'"},{name:"literal",value:"'motorsport'"},{name:"literal",value:"'music'"},{name:"literal",value:"'musicArticles'"},{name:"literal",value:"'needle'"},{name:"literal",value:"'newsFeed'"},{name:"literal",value:"'newsletter'"},{name:"literal",value:"'nft'"},{name:"literal",value:"'nftBuy'"},{name:"literal",value:"'nftOffer'"},{name:"literal",value:"'nftProduct'"},{name:"literal",value:"'nftSale'"},{name:"literal",value:"'noRocket'"},{name:"literal",value:"'noWifi'"},{name:"literal",value:"'nodeProduct'"},{name:"literal",value:"'oil'"},{name:"literal",value:"'options'"},{name:"literal",value:"'orderBook'"},{name:"literal",value:"'orderHistory'"},{name:"literal",value:"'outline'"},{name:"literal",value:"'pFPS'"},{name:"literal",value:"'paperAirplane'"},{name:"literal",value:"'paperclip'"},{name:"literal",value:"'participate'"},{name:"literal",value:"'participateProduct'"},{name:"literal",value:"'passKey'"},{name:"literal",value:"'passport'"},{name:"literal",value:"'pause'"},{name:"literal",value:"'pay'"},{name:"literal",value:"'payProduct'"},{name:"literal",value:"'paymentCard'"},{name:"literal",value:"'payments'"},{name:"literal",value:"'payouts'"},{name:"literal",value:"'paypal'"},{name:"literal",value:"'pencil'"},{name:"literal",value:"'peopleGroup'"},{name:"literal",value:"'peopleStar'"},{name:"literal",value:"'percentage'"},{name:"literal",value:"'perpetualSwap'"},{name:"literal",value:"'phone'"},{name:"literal",value:"'pieChartData'"},{name:"literal",value:"'pillBottle'"},{name:"literal",value:"'pillCapsule'"},{name:"literal",value:"'pin'"},{name:"literal",value:"'plane'"},{name:"literal",value:"'planet'"},{name:"literal",value:"'play'"},{name:"literal",value:"'playbutton'"},{name:"literal",value:"'plusMinus'"},{name:"literal",value:"'podiumStar'"},{name:"literal",value:"'politicsBuilding'"},{name:"literal",value:"'politicsCandidate'"},{name:"literal",value:"'politicsFlag'"},{name:"literal",value:"'politicsGavel'"},{name:"literal",value:"'politicsPodium'"},{name:"literal",value:"'politicsStar'"},{name:"literal",value:"'powerTool'"},{name:"literal",value:"'priceAlerts'"},{name:"literal",value:"'priceAlertsCheck'"},{name:"literal",value:"'primePoduct'"},{name:"literal",value:"'privateClientProduct'"},{name:"literal",value:"'proProduct'"},{name:"literal",value:"'profile'"},{name:"literal",value:"'protection'"},{name:"literal",value:"'pulse'"},{name:"literal",value:"'pyramid'"},{name:"literal",value:"'qrCode'"},{name:"literal",value:"'qrCodeAlt'"},{name:"literal",value:"'queryTransact'"},{name:"literal",value:"'questionMark'"},{name:"literal",value:"'quotation'"},{name:"literal",value:"'rain'"},{name:"literal",value:"'ratingsCheck'"},{name:"literal",value:"'ratingsChecks'"},{name:"literal",value:"'ratingsStar'"},{name:"literal",value:"'reCenter'"},{name:"literal",value:"'rectangle'"},{name:"literal",value:"'recurring'"},{name:"literal",value:"'refresh'"},{name:"literal",value:"'regulated'"},{name:"literal",value:"'regulatedFutures'"},{name:"literal",value:"'report'"},{name:"literal",value:"'rewardsProduct'"},{name:"literal",value:"'ribbon'"},{name:"literal",value:"'robot'"},{name:"literal",value:"'rocket'"},{name:"literal",value:"'rocketShip'"},{name:"literal",value:"'rollingSpot'"},{name:"literal",value:"'rosettaProduct'"},{name:"literal",value:"'rottenTomato'"},{name:"literal",value:"'royalty'"},{name:"literal",value:"'safe'"},{name:"literal",value:"'save'"},{name:"literal",value:"'savingsBank'"},{name:"literal",value:"'scanQrCode'"},{name:"literal",value:"'scienceAtom'"},{name:"literal",value:"'scienceBeaker'"},{name:"literal",value:"'scienceMoon'"},{name:"literal",value:"'search'"},{name:"literal",value:"'securityKey'"},{name:"literal",value:"'securityShield'"},{name:"literal",value:"'seen'"},{name:"literal",value:"'sendReceive'"},{name:"literal",value:"'setPinCode'"},{name:"literal",value:"'settings'"},{name:"literal",value:"'share'"},{name:"literal",value:"'shield'"},{name:"literal",value:"'shieldOutline'"},{name:"literal",value:"'shoe'"},{name:"literal",value:"'shoppingCart'"},{name:"literal",value:"'signinProduct'"},{name:"literal",value:"'singleCoin'"},{name:"literal",value:"'singleNote'"},{name:"literal",value:"'singlecloud'"},{name:"literal",value:"'smartContract'"},{name:"literal",value:"'snow'"},{name:"literal",value:"'soccer'"},{name:"literal",value:"'socialChat'"},{name:"literal",value:"'socialReshare'"},{name:"literal",value:"'socialShare'"},{name:"literal",value:"'sofort'"},{name:"literal",value:"'sortDoubleArrow'"},{name:"literal",value:"'sortDown'"},{name:"literal",value:"'sortDownCenter'"},{name:"literal",value:"'sortUp'"},{name:"literal",value:"'sortUpCenter'"},{name:"literal",value:"'soundOff'"},{name:"literal",value:"'soundOn'"},{name:"literal",value:"'sparkle'"},{name:"literal",value:"'speaker'"},{name:"literal",value:"'speechBubble'"},{name:"literal",value:"'stableCoin'"},{name:"literal",value:"'stablecoinStack'"},{name:"literal",value:"'staggeredList'"},{name:"literal",value:"'stake'"},{name:"literal",value:"'staking'"},{name:"literal",value:"'star'"},{name:"literal",value:"'starAward'"},{name:"literal",value:"'starBubble'"},{name:"literal",value:"'starTrophy'"},{name:"literal",value:"'statusDot'"},{name:"literal",value:"'step0'"},{name:"literal",value:"'step1'"},{name:"literal",value:"'step2'"},{name:"literal",value:"'step3'"},{name:"literal",value:"'step4'"},{name:"literal",value:"'step5'"},{name:"literal",value:"'step6'"},{name:"literal",value:"'step7'"},{name:"literal",value:"'step8'"},{name:"literal",value:"'step9'"},{name:"literal",value:"'strategy'"},{name:"literal",value:"'sun'"},{name:"literal",value:"'support'"},{name:"literal",value:"'tag'"},{name:"literal",value:"'taxes'"},{name:"literal",value:"'taxesReceipt'"},{name:"literal",value:"'telephone'"},{name:"literal",value:"'tennis'"},{name:"literal",value:"'test'"},{name:"literal",value:"'thermometer'"},{name:"literal",value:"'thumbsDown'"},{name:"literal",value:"'thumbsDownOutline'"},{name:"literal",value:"'thumbsUp'"},{name:"literal",value:"'thumbsUpOutline'"},{name:"literal",value:"'tokenLaunchCoin'"},{name:"literal",value:"'tokenLaunchRocket'"},{name:"literal",value:"'tokenSales'"},{name:"literal",value:"'tornado'"},{name:"literal",value:"'trading'"},{name:"literal",value:"'transactions'"},{name:"literal",value:"'trashCan'"},{name:"literal",value:"'trophy'"},{name:"literal",value:"'trophyCup'"},{name:"literal",value:"'tshirt'"},{name:"literal",value:"'tv'"},{name:"literal",value:"'tvStand'"},{name:"literal",value:"'twitterLogo'"},{name:"literal",value:"'ultility'"},{name:"literal",value:"'umbrella'"},{name:"literal",value:"'undo'"},{name:"literal",value:"'unfollowPeople'"},{name:"literal",value:"'unknown'"},{name:"literal",value:"'unlock'"},{name:"literal",value:"'upArrow'"},{name:"literal",value:"'upload'"},{name:"literal",value:"'venturesProduct'"},{name:"literal",value:"'verifiedBadge'"},{name:"literal",value:"'verifiedPools'"},{name:"literal",value:"'verticalLine'"},{name:"literal",value:"'virus'"},{name:"literal",value:"'visible'"},{name:"literal",value:"'waasProduct'"},{name:"literal",value:"'wallet'"},{name:"literal",value:"'walletLogo'"},{name:"literal",value:"'walletProduct'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'webhooks'"},{name:"literal",value:"'wellness'"},{name:"literal",value:"'wifi'"},{name:"literal",value:"'wind'"},{name:"literal",value:"'wireTransfer'"},{name:"literal",value:"'withdraw'"},{name:"literal",value:"'wrapToken'"},{name:"literal",value:"'xLogo'"}],required:!1},description:"Icon to render at the end of the button."},{key:"endIconActive",value:{name:"boolean",required:!1},description:"Whether the end icon is active"},{key:"flush",value:{name:"union",raw:"'start' | 'end'",elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'end'"}],required:!1},description:`Ensure the button aligns flush on the left or right.
This prop will translate the entire button left/right,
so take care to ensure it is not overflowing awkwardly`},{key:"name",value:{name:"string",required:!1},description:"Uniquely identify the button within a form."},{key:"noScaleOnPress",value:{name:"boolean",required:!1},description:"Don't scale element on press."},{key:"numberOfLines",value:{name:"number",required:!1},description:`Truncates text after wrapping to a defined number of lines.
@default 1`}]}}]}],raw:`Polymorphic.ExtendableProps<
  PressableBaseProps,
  SharedProps &
    Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
      /**
       * Toggle design and visual variants.
       * @default primary
       */
      variant?: ButtonVariant;
      /** Mark the button as disabled. */
      disabled?: boolean;
      /** Mark the button as loading and display a spinner. */
      loading?: boolean;
      /** Mark the background and border as transparent until interacted with. */
      transparent?: boolean;
      /** Change to block and expand to 100% of parent width. */
      block?: boolean;
      /** Reduce the inner padding within the button itself. */
      compact?: boolean;
      /** Children to render within the button. */
      children: React.ReactNode;
      /** Set the start node */
      start?: React.ReactNode;
      /** Icon to render at the start of the button. */
      startIcon?: IconName;
      /** Whether the start icon is active */
      startIconActive?: boolean;
      /** Set the end node */
      end?: React.ReactNode;
      /** Icon to render at the end of the button. */
      endIcon?: IconName;
      /** Whether the end icon is active */
      endIconActive?: boolean;
      /** Ensure the button aligns flush on the left or right.
       * This prop will translate the entire button left/right,
       * so take care to ensure it is not overflowing awkwardly
       */
      flush?: 'start' | 'end';
      /** Uniquely identify the button within a form. */
      name?: string;
      /** Don't scale element on press. */
      noScaleOnPress?: boolean;
      /**
       * Truncates text after wrapping to a defined number of lines.
       * @default 1
       */
      numberOfLines?: number;
    }
>`},{name:"signature",type:"object",raw:"{ onClick?: React.MouseEventHandler }",signature:{properties:[{key:"onClick",value:{name:"ReactMouseEventHandler",raw:"React.MouseEventHandler",required:!1}}]}}]}]},description:"Secondary action button"},gap:{defaultValue:{value:"2",computed:!1},required:!1},justifyContent:{defaultValue:{value:"'flex-end'",computed:!1},required:!1},paddingX:{defaultValue:{value:"3",computed:!1},required:!1},paddingY:{defaultValue:{value:"2",computed:!1},required:!1},width:{defaultValue:{value:"'100%'",computed:!1},required:!1}}};const T=({alignItems:n="center",paddingX:t=3,paddingY:r=2,title:a,onBackButtonClick:l,backAccessibilityLabel:i,backAccessibilityHint:o,closeAccessibilityLabel:s,closeAccessibilityHint:u,...b})=>{const{onRequestClose:d,accessibilityLabelledBy:g,hideCloseButton:y,hideDividers:f}=c();if(!a&&!l&&!d)return null;const k=e.jsx(m,{height:v.compact,width:v.compact});return e.jsxs(h,{alignItems:n,borderedBottom:!f,paddingX:t,paddingY:r,...b,children:[l?e.jsx(m,{children:e.jsx(p,{transparent:!0,accessibilityHint:o,accessibilityLabel:i,name:"backArrow",onClick:l,testID:"modal-back-button"})}):k,e.jsx(m,{alignItems:"center",flexGrow:1,justifyContent:"center",paddingX:2,children:a&&e.jsx(P,{as:"h2",display:"block",font:"headline",id:g,textAlign:"center",children:a})}),!y&&e.jsx(m,{justifyContent:"flex-end",children:e.jsx(p,{transparent:!0,accessibilityHint:u,accessibilityLabel:s,name:"close",onClick:d,testID:"modal-close-button"})})]})};T.__docgenInfo={description:"",methods:[],displayName:"ModalHeader",props:{onBackButtonClick:{required:!1,tsType:{name:"ReactMouseEventHandler",raw:"React.MouseEventHandler"},description:"Handles back button press"},title:{required:!1,tsType:{name:"string"},description:"Title of the Modal"},backAccessibilityLabel:{required:!1,tsType:{name:"string",raw:"SharedAccessibilityProps['accessibilityLabel']"},description:`Sets an accessible label for the back button.
On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
On mobile, VoiceOver will read this string when a user selects the associated element.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
@link https://reactnative.dev/docs/accessibility#accessibilitylabel`},backAccessibilityHint:{required:!1,tsType:{name:"string",raw:"SharedAccessibilityProps['accessibilityHint']"},description:`Sets an accessible hint or description for the back button.
On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
when that result is not clear from the accessibility label.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
@link https://reactnative.dev/docs/accessibility#accessibilityhint`},closeAccessibilityLabel:{required:!1,tsType:{name:"string",raw:"SharedAccessibilityProps['accessibilityLabel']"},description:`Sets an accessible label for the close button.
On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
On mobile, VoiceOver will read this string when a user selects the associated element.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
@link https://reactnative.dev/docs/accessibility#accessibilitylabel`},closeAccessibilityHint:{required:!1,tsType:{name:"string",raw:"SharedAccessibilityProps['accessibilityHint']"},description:`Sets an accessible hint or description for the close button.
On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
when that result is not clear from the accessibility label.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
@link https://reactnative.dev/docs/accessibility#accessibilityhint`},testID:{required:!1,tsType:{name:"string"},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`},alignItems:{defaultValue:{value:"'center'",computed:!1},required:!1},paddingX:{defaultValue:{value:"3",computed:!1},required:!1},paddingY:{defaultValue:{value:"2",computed:!1},required:!1}}};export{T as M,C as a,S as b};
