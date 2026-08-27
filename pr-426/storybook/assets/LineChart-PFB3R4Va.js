import{r as n,j as t}from"./iframe-BXWLBCkp.js";import{g as H,C as $,X,Y,c as _}from"./Axis-BOWgFUiH.js";import{L as J}from"./Line-DHCp7DPs.js";const K=n.memo(n.forwardRef(({series:a,showArea:o,areaType:s,type:l,onPointClick:d,LineComponent:u,AreaComponent:m,curve:p,points:c,strokeWidth:h,strokeOpacity:f,connectNulls:b,transition:y,opacity:v,showXAxis:g,showYAxis:k,xAxis:w,yAxis:x,inset:i,children:P,...C},S)=>{const T=n.useMemo(()=>H(i,_),[i]),A=n.useMemo(()=>a?.map(e=>({id:e.id,data:e.data,label:e.label,color:e.color,yAxisId:e.yAxisId,stackId:e.stackId,gradient:e.gradient,legendShape:e.legendShape})),[a]),{scaleType:q,data:I,categoryPadding:R,domain:D,domainLimit:G,range:W,...O}=w||{},{scaleType:L,data:V,categoryPadding:E,domain:B,domainLimit:j,range:M,id:N,...z}=x||{},F={scaleType:q,data:I,categoryPadding:R,domain:D,domainLimit:G,range:W},U={scaleType:L,data:V,categoryPadding:E,domain:B,domainLimit:j,range:M};return t.jsxs($,{...C,ref:S,inset:T,series:A,xAxis:F,yAxis:U,children:[g&&t.jsx(X,{...O}),k&&t.jsx(Y,{axisId:N,...z}),a?.map(({id:e,data:Q,label:Z,color:ee,yAxisId:ne,legendShape:te,...r})=>t.jsx(J,{AreaComponent:m,LineComponent:u,areaType:s,connectNulls:b,curve:p,onPointClick:d,opacity:v,points:c,seriesId:e,showArea:o,strokeOpacity:f,strokeWidth:h,transition:r.transition??y,type:l,...r},e)),P]})}));K.__docgenInfo={description:"",methods:[],displayName:"LineChart",props:{series:{required:!1,tsType:{name:"Array",elements:[{name:"intersection",raw:`Series &
Partial<
  Pick<
    LineProps,
    | 'curve'
    | 'showArea'
    | 'areaType'
    | 'areaBaseline'
    | 'type'
    | 'LineComponent'
    | 'AreaComponent'
    | 'stroke'
    | 'strokeWidth'
    | 'strokeOpacity'
    | 'opacity'
    | 'points'
    | 'connectNulls'
    | 'transition'
    | 'onPointClick'
  >
>`,elements:[{name:"signature",type:"object",raw:`{
  /**
   * Id of the series.
   */
  id: string;
  /**
   * Data array for this series. Use null values to create gaps in the visualization.
   *
   * Can be either:
   * - Array of numbers: \`[10, -5, 20]\`
   * - Array of tuples: \`[[0, 10], [0, -5], [0, 20]]\` [baseline, value] pairs
   */
  data?: Array<number | null> | Array<[number, number] | null>;
  /**
   * Label of the series.
   * Used for scrubber beacon labels.
   */
  label?: string;
  /**
   * Color of the series.
   * If gradient is provided, that will be used for chart components
   * Color will still be used by scrubber beacon labels
   */
  color?: string;
  /**
   * Color gradient configuration.
   * Takes precedence over color except for scrubber beacon labels.
   */
  gradient?: GradientDefinition;
  /**
   * Id of the y-axis this series uses.
   * Defaults to defaultAxisId if not specified.
   */
  yAxisId?: string;
  /**
   * Id of the stack group this series belongs to.
   * Series with the same stackId value will be stacked together.
   * If not specified, the series will not be stacked.
   */
  stackId?: string;
  /**
   * Shape of the legend item for this series.
   * Can be a preset shape variant or a custom ReactNode.
   * @default 'circle'
   */
  legendShape?: LegendShape;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0},description:"Id of the series."},{key:"data",value:{name:"union",raw:"Array<number | null> | Array<[number, number] | null>",elements:[{name:"Array",elements:[{name:"union",raw:"number | null",elements:[{name:"number"},{name:"null"}]}],raw:"Array<number | null>"},{name:"Array",elements:[{name:"union",raw:"[number, number] | null",elements:[{name:"tuple",raw:"[number, number]",elements:[{name:"number"},{name:"number"}]},{name:"null"}]}],raw:"Array<[number, number] | null>"}],required:!1},description:"Data array for this series. Use null values to create gaps in the visualization.\n\nCan be either:\n- Array of numbers: `[10, -5, 20]`\n- Array of tuples: `[[0, 10], [0, -5], [0, 20]]` [baseline, value] pairs"},{key:"label",value:{name:"string",required:!1},description:`Label of the series.
Used for scrubber beacon labels.`},{key:"color",value:{name:"string",required:!1},description:`Color of the series.
If gradient is provided, that will be used for chart components
Color will still be used by scrubber beacon labels`},{key:"gradient",value:{name:"signature",type:"object",raw:`{
  /**
   * Axis that the gradient maps to.
   * @default 'y'
   */
  axis?: 'x' | 'y';
  /**
   * Gradient stops with colors and positions.
   * Can be an array of stop objects or a function that receives domain bounds.
   */
  stops: GradientStop[] | ((domain: AxisBounds) => GradientStop[]);
}`,signature:{properties:[{key:"axis",value:{name:"union",raw:"'x' | 'y'",elements:[{name:"literal",value:"'x'"},{name:"literal",value:"'y'"}],required:!1},description:`Axis that the gradient maps to.
@default 'y'`},{key:"stops",value:{name:"union",raw:"GradientStop[] | ((domain: AxisBounds) => GradientStop[])",elements:[{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /**
   * Position in data space.
   * Multiple stops at the same offset create hard color transitions.
   */
  offset: number;
  /**  Color at the stop (any valid CSS color) */
  color: string;
  /** Optional opacity (0-1). Defaults to 1. */
  opacity?: number;
}`,signature:{properties:[{key:"offset",value:{name:"number",required:!0},description:`Position in data space.
Multiple stops at the same offset create hard color transitions.`},{key:"color",value:{name:"string",required:!0},description:"Color at the stop (any valid CSS color)"},{key:"opacity",value:{name:"number",required:!1},description:"Optional opacity (0-1). Defaults to 1."}]}}],raw:"GradientStop[]"},{name:"unknown"}],required:!0},description:`Gradient stops with colors and positions.
Can be an array of stop objects or a function that receives domain bounds.`}]},required:!1},description:`Color gradient configuration.
Takes precedence over color except for scrubber beacon labels.`},{key:"yAxisId",value:{name:"string",required:!1},description:`Id of the y-axis this series uses.
Defaults to defaultAxisId if not specified.`},{key:"stackId",value:{name:"string",required:!1},description:`Id of the stack group this series belongs to.
Series with the same stackId value will be stacked together.
If not specified, the series will not be stacked.`},{key:"legendShape",value:{name:"union",raw:"LegendShapeVariant | React.ReactNode",elements:[{name:"union",raw:"'circle' | 'square' | 'squircle' | 'pill'",elements:[{name:"literal",value:"'circle'"},{name:"literal",value:"'square'"},{name:"literal",value:"'squircle'"},{name:"literal",value:"'pill'"}]},{name:"ReactReactNode",raw:"React.ReactNode"}],required:!1},description:`Shape of the legend item for this series.
Can be a preset shape variant or a custom ReactNode.
@default 'circle'`}]}},{name:"Partial",elements:[{name:"Pick",elements:[{name:"intersection",raw:`LineBaseProps & {
  /**
   * Transition configuration for line animations.
   */
  transition?: Transition;
  /**
   * Handler for when a point is clicked.
   * Passed through to Point components rendered via points.
   */
  onPointClick?: PointProps['onClick'];
  /**
   * Custom style for the line.
   */
  style?: React.CSSProperties;
  /**
   * Custom className for the line.
   */
  className?: string;
}`,elements:[{name:"intersection",raw:`SharedProps & {
  /**
   * The ID of the series to render. Will be used to find the data from the chart context.
   */
  seriesId: string;
  /**
   * The curve interpolation method to use for the line.
   * @default 'bump'
   */
  curve?: ChartPathCurveType;
  /**
   * The type of line to render.
   * @default 'solid'
   */
  type?: 'solid' | 'dotted';
  /**
   * Whether to show area fill under the line.
   */
  showArea?: boolean;
  /**
   * The type of area fill to add to the line.
   * @default 'gradient'
   */
  areaType?: 'gradient' | 'solid' | 'dotted';
  /**
   * Baseline value for the area.
   * When set, overrides the default baseline.
   */
  areaBaseline?: number;
  /**
   * Component to render the line.
   * Takes precedence over the type prop if provided.
   */
  LineComponent?: LineComponent;
  /**
   * Custom component to render line area fill.
   */
  AreaComponent?: AreaComponent;
  /**
   * Opacity of the line's stroke.
   * Will also be applied to points and area fill.
   * @default 1
   */
  opacity?: number;
  /**
   * Controls whether and how to render points at each data point in the series.
   * - \`true\`: Show all points with default styling
   * - \`false\` or \`undefined\`: Hide all points
   * - Function: Called for every entry in the data array to customize individual points
   *
   * @param defaults - The default point props computed by the Line component
   * @returns true for default point, false/null/undefined for no point, or Partial<PointProps> to customize
   */
  points?:
    | boolean
    | ((defaults: PointBaseProps) => boolean | null | undefined | Partial<PointProps>);
  /**
   * When true, the area is connected across null values.
   */
  connectNulls?: boolean;
  /**
   * The color of the line.
   * @default color of the series or 'var(--color-fgPrimary)'
   */
  stroke?: string;
  /**
   * Opacity of the line
   * @note when combined with gradient, both will be applied
   * @default 1
   */
  strokeOpacity?: number;
  /**
   * Width of the line
   * @default 2
   */
  strokeWidth?: number;
  /**
   * Gradient configuration.
   * When provided, creates gradient or threshold-based coloring.
   */
  gradient?: GradientDefinition;
  /**
   * Whether to animate the line.
   * Overrides the animate value from the chart context.
   */
  animate?: boolean;
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
   * The ID of the series to render. Will be used to find the data from the chart context.
   */
  seriesId: string;
  /**
   * The curve interpolation method to use for the line.
   * @default 'bump'
   */
  curve?: ChartPathCurveType;
  /**
   * The type of line to render.
   * @default 'solid'
   */
  type?: 'solid' | 'dotted';
  /**
   * Whether to show area fill under the line.
   */
  showArea?: boolean;
  /**
   * The type of area fill to add to the line.
   * @default 'gradient'
   */
  areaType?: 'gradient' | 'solid' | 'dotted';
  /**
   * Baseline value for the area.
   * When set, overrides the default baseline.
   */
  areaBaseline?: number;
  /**
   * Component to render the line.
   * Takes precedence over the type prop if provided.
   */
  LineComponent?: LineComponent;
  /**
   * Custom component to render line area fill.
   */
  AreaComponent?: AreaComponent;
  /**
   * Opacity of the line's stroke.
   * Will also be applied to points and area fill.
   * @default 1
   */
  opacity?: number;
  /**
   * Controls whether and how to render points at each data point in the series.
   * - \`true\`: Show all points with default styling
   * - \`false\` or \`undefined\`: Hide all points
   * - Function: Called for every entry in the data array to customize individual points
   *
   * @param defaults - The default point props computed by the Line component
   * @returns true for default point, false/null/undefined for no point, or Partial<PointProps> to customize
   */
  points?:
    | boolean
    | ((defaults: PointBaseProps) => boolean | null | undefined | Partial<PointProps>);
  /**
   * When true, the area is connected across null values.
   */
  connectNulls?: boolean;
  /**
   * The color of the line.
   * @default color of the series or 'var(--color-fgPrimary)'
   */
  stroke?: string;
  /**
   * Opacity of the line
   * @note when combined with gradient, both will be applied
   * @default 1
   */
  strokeOpacity?: number;
  /**
   * Width of the line
   * @default 2
   */
  strokeWidth?: number;
  /**
   * Gradient configuration.
   * When provided, creates gradient or threshold-based coloring.
   */
  gradient?: GradientDefinition;
  /**
   * Whether to animate the line.
   * Overrides the animate value from the chart context.
   */
  animate?: boolean;
}`,signature:{properties:[{key:"seriesId",value:{name:"string",required:!0},description:"The ID of the series to render. Will be used to find the data from the chart context."},{key:"curve",value:{name:"union",raw:`| 'bump'
| 'catmullRom'
| 'linear'
| 'linearClosed'
| 'monotone'
| 'natural'
| 'step'
| 'stepBefore'
| 'stepAfter'`,elements:[{name:"literal",value:"'bump'"},{name:"literal",value:"'catmullRom'"},{name:"literal",value:"'linear'"},{name:"literal",value:"'linearClosed'"},{name:"literal",value:"'monotone'"},{name:"literal",value:"'natural'"},{name:"literal",value:"'step'"},{name:"literal",value:"'stepBefore'"},{name:"literal",value:"'stepAfter'"}],required:!1},description:`The curve interpolation method to use for the line.
@default 'bump'`},{key:"type",value:{name:"union",raw:"'solid' | 'dotted'",elements:[{name:"literal",value:"'solid'"},{name:"literal",value:"'dotted'"}],required:!1},description:`The type of line to render.
@default 'solid'`},{key:"showArea",value:{name:"boolean",required:!1},description:"Whether to show area fill under the line."},{key:"areaType",value:{name:"union",raw:"'gradient' | 'solid' | 'dotted'",elements:[{name:"literal",value:"'gradient'"},{name:"literal",value:"'solid'"},{name:"literal",value:"'dotted'"}],required:!1},description:`The type of area fill to add to the line.
@default 'gradient'`},{key:"areaBaseline",value:{name:"number",required:!1},description:`Baseline value for the area.
When set, overrides the default baseline.`},{key:"LineComponent",value:{name:"ReactFC",raw:"React.FC<LineComponentProps>",elements:[{name:"intersection",raw:`Pick<
  LineProps,
  | 'stroke'
  | 'strokeOpacity'
  | 'strokeWidth'
  | 'gradient'
  | 'animate'
  | 'transition'
  | 'style'
  | 'className'
> &
  Pick<PathProps, 'clipRect' | 'strokeLinecap'> & {
    /**
     * Path of the line.
     */
    d: SVGProps<SVGPathElement>['d'];
    /**
     * ID of the y-axis to use.
     * If not provided, defaults to the default y-axis.
     */
    yAxisId?: string;
  }`,elements:[{name:"Pick",elements:[{name:"LineProps"},{name:"union",raw:`| 'stroke'
| 'strokeOpacity'
| 'strokeWidth'
| 'gradient'
| 'animate'
| 'transition'
| 'style'
| 'className'`,elements:[{name:"literal",value:"'stroke'"},{name:"literal",value:"'strokeOpacity'"},{name:"literal",value:"'strokeWidth'"},{name:"literal",value:"'gradient'"},{name:"literal",value:"'animate'"},{name:"literal",value:"'transition'"},{name:"literal",value:"'style'"},{name:"literal",value:"'className'"}]}],raw:`Pick<
  LineProps,
  | 'stroke'
  | 'strokeOpacity'
  | 'strokeWidth'
  | 'gradient'
  | 'animate'
  | 'transition'
  | 'style'
  | 'className'
>`},{name:"Pick",elements:[{name:"intersection",raw:`PathBaseProps &
Omit<
  SVGProps<SVGPathElement>,
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
  | 'onAnimationStartCapture'
  | 'onAnimationEndCapture'
  | 'onAnimationIterationCapture'
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragStart'
  | 'onDragCapture'
  | 'onDragEndCapture'
  | 'onDragStartCapture'
> & {
  /**
   * Offset added to the clip rect boundaries.
   */
  clipOffset?: number;
  /**
   * Custom clip path rect. If provided, this overrides the default chart rect for clipping.
   * Pass null to disable clipping.
   * @default drawingArea of chart + clipOffset
   */
  clipRect?: Rect | null;
  /**
   * Transition configuration for path.
   *
   * @example
   * // Timing based animation
   * transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
   *
   * @example
   * // Spring animation
   * transition={{ type: 'spring', damping: 20, stiffness: 300 }}
   */
  transition?: Transition;
}`,elements:[{name:"intersection",raw:`SharedProps & {
  /**
   * Whether to animate this path. Overrides the animate prop on the Chart component.
   */
  animate?: boolean;
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
   * Whether to animate this path. Overrides the animate prop on the Chart component.
   */
  animate?: boolean;
}`,signature:{properties:[{key:"animate",value:{name:"boolean",required:!1},description:"Whether to animate this path. Overrides the animate prop on the Chart component."}]}}]},{name:"Omit",elements:[{name:"SVGProps",elements:[{name:"SVGPathElement"}],raw:"SVGProps<SVGPathElement>"},{name:"union",raw:`| 'onAnimationStart'
| 'onAnimationEnd'
| 'onAnimationIteration'
| 'onAnimationStartCapture'
| 'onAnimationEndCapture'
| 'onAnimationIterationCapture'
| 'onDrag'
| 'onDragEnd'
| 'onDragStart'
| 'onDragCapture'
| 'onDragEndCapture'
| 'onDragStartCapture'`,elements:[{name:"literal",value:"'onAnimationStart'"},{name:"literal",value:"'onAnimationEnd'"},{name:"literal",value:"'onAnimationIteration'"},{name:"literal",value:"'onAnimationStartCapture'"},{name:"literal",value:"'onAnimationEndCapture'"},{name:"literal",value:"'onAnimationIterationCapture'"},{name:"literal",value:"'onDrag'"},{name:"literal",value:"'onDragEnd'"},{name:"literal",value:"'onDragStart'"},{name:"literal",value:"'onDragCapture'"},{name:"literal",value:"'onDragEndCapture'"},{name:"literal",value:"'onDragStartCapture'"}]}],raw:`Omit<
  SVGProps<SVGPathElement>,
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
  | 'onAnimationStartCapture'
  | 'onAnimationEndCapture'
  | 'onAnimationIterationCapture'
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragStart'
  | 'onDragCapture'
  | 'onDragEndCapture'
  | 'onDragStartCapture'
>`},{name:"signature",type:"object",raw:`{
  /**
   * Offset added to the clip rect boundaries.
   */
  clipOffset?: number;
  /**
   * Custom clip path rect. If provided, this overrides the default chart rect for clipping.
   * Pass null to disable clipping.
   * @default drawingArea of chart + clipOffset
   */
  clipRect?: Rect | null;
  /**
   * Transition configuration for path.
   *
   * @example
   * // Timing based animation
   * transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
   *
   * @example
   * // Spring animation
   * transition={{ type: 'spring', damping: 20, stiffness: 300 }}
   */
  transition?: Transition;
}`,signature:{properties:[{key:"clipOffset",value:{name:"number",required:!1},description:"Offset added to the clip rect boundaries."},{key:"clipRect",value:{name:"union",raw:"Rect | null",elements:[{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
  width: number;
  height: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!1},{name:"null"}],required:!1},description:`Custom clip path rect. If provided, this overrides the default chart rect for clipping.
Pass null to disable clipping.
@default drawingArea of chart + clipOffset`},{key:"transition",value:{name:"Transition",required:!1},description:`Transition configuration for path.

@example
// Timing based animation
transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}

@example
// Spring animation
transition={{ type: 'spring', damping: 20, stiffness: 300 }}`}]}}]},{name:"union",raw:"'clipRect' | 'strokeLinecap'",elements:[{name:"literal",value:"'clipRect'"},{name:"literal",value:"'strokeLinecap'"}]}],raw:"Pick<PathProps, 'clipRect' | 'strokeLinecap'>"},{name:"signature",type:"object",raw:`{
  /**
   * Path of the line.
   */
  d: SVGProps<SVGPathElement>['d'];
  /**
   * ID of the y-axis to use.
   * If not provided, defaults to the default y-axis.
   */
  yAxisId?: string;
}`,signature:{properties:[{key:"d",value:{name:"SVGProps['d']",raw:"SVGProps<SVGPathElement>['d']",required:!0},description:"Path of the line."},{key:"yAxisId",value:{name:"string",required:!1},description:`ID of the y-axis to use.
If not provided, defaults to the default y-axis.`}]}}]}],required:!1},description:`Component to render the line.
Takes precedence over the type prop if provided.`},{key:"AreaComponent",value:{name:"ReactFC",raw:"React.FC<AreaComponentProps>",elements:[{name:"intersection",raw:`Pick<
  AreaProps,
  'fill' | 'fillOpacity' | 'baseline' | 'gradient' | 'animate' | 'transition'
> & {
  /**
   * Path of the area
   */
  d: SVGProps<SVGPathElement>['d'];
  /**
   * ID of the y-axis to use.
   * If not provided, defaults to the default y-axis.
   */
  yAxisId?: string;
}`,elements:[{name:"Pick",elements:[{name:"intersection",raw:`AreaBaseProps & {
  /**
   * Transition configuration for path animations.
   */
  transition?: Transition;
}`,elements:[{name:"signature",type:"object",raw:`{
  /**
   * The ID of the series to render. Will be used to find the data from the chart context.
   */
  seriesId: string;
  /**
   * The curve interpolation method to use for the line.
   * @default 'bump'
   */
  curve?: ChartPathCurveType;
  /**
   * The type of area to render.
   * @default 'solid'
   */
  type?: 'solid' | 'dotted' | 'gradient';
  /**
   * Component to render the area.
   * Takes precedence over the type prop if provided.
   */
  AreaComponent?: AreaComponent;
  /**
   * When true, the area is connected across null values.
   */
  connectNulls?: boolean;
  /**
   * The color of the area.
   * @default color of the series or 'var(--color-fgPrimary)'
   */
  fill?: string;
  /**
   * Opacity of the area
   * @note when combined with gradient, both will be applied
   * @default 1
   */
  fillOpacity?: number;
  /**
   * Baseline value for the gradient.
   * When set, overrides the default baseline.
   */
  baseline?: number;
  /**
   * Gradient configuration.
   * When provided, creates gradient or threshold-based coloring.
   */
  gradient?: GradientDefinition;
  /**
   * Whether to animate the area.
   * Overrides the animate value from the chart context.
   */
  animate?: boolean;
}`,signature:{properties:[{key:"seriesId",value:{name:"string",required:!0},description:"The ID of the series to render. Will be used to find the data from the chart context."},{key:"curve",value:{name:"union",raw:`| 'bump'
| 'catmullRom'
| 'linear'
| 'linearClosed'
| 'monotone'
| 'natural'
| 'step'
| 'stepBefore'
| 'stepAfter'`,elements:[{name:"literal",value:"'bump'"},{name:"literal",value:"'catmullRom'"},{name:"literal",value:"'linear'"},{name:"literal",value:"'linearClosed'"},{name:"literal",value:"'monotone'"},{name:"literal",value:"'natural'"},{name:"literal",value:"'step'"},{name:"literal",value:"'stepBefore'"},{name:"literal",value:"'stepAfter'"}],required:!1},description:`The curve interpolation method to use for the line.
@default 'bump'`},{key:"type",value:{name:"union",raw:"'solid' | 'dotted' | 'gradient'",elements:[{name:"literal",value:"'solid'"},{name:"literal",value:"'dotted'"},{name:"literal",value:"'gradient'"}],required:!1},description:`The type of area to render.
@default 'solid'`},{key:"AreaComponent",value:{name:"AreaComponent",required:!1},description:`Component to render the area.
Takes precedence over the type prop if provided.`},{key:"connectNulls",value:{name:"boolean",required:!1},description:"When true, the area is connected across null values."},{key:"fill",value:{name:"string",required:!1},description:`The color of the area.
@default color of the series or 'var(--color-fgPrimary)'`},{key:"fillOpacity",value:{name:"number",required:!1},description:`Opacity of the area
@note when combined with gradient, both will be applied
@default 1`},{key:"baseline",value:{name:"number",required:!1},description:`Baseline value for the gradient.
When set, overrides the default baseline.`},{key:"gradient",value:{name:"signature",type:"object",raw:`{
  /**
   * Axis that the gradient maps to.
   * @default 'y'
   */
  axis?: 'x' | 'y';
  /**
   * Gradient stops with colors and positions.
   * Can be an array of stop objects or a function that receives domain bounds.
   */
  stops: GradientStop[] | ((domain: AxisBounds) => GradientStop[]);
}`,signature:{properties:[{key:"axis",value:{name:"union",raw:"'x' | 'y'",elements:[{name:"literal",value:"'x'"},{name:"literal",value:"'y'"}],required:!1},description:`Axis that the gradient maps to.
@default 'y'`},{key:"stops",value:{name:"union",raw:"GradientStop[] | ((domain: AxisBounds) => GradientStop[])",elements:[{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /**
   * Position in data space.
   * Multiple stops at the same offset create hard color transitions.
   */
  offset: number;
  /**  Color at the stop (any valid CSS color) */
  color: string;
  /** Optional opacity (0-1). Defaults to 1. */
  opacity?: number;
}`,signature:{properties:[{key:"offset",value:{name:"number",required:!0},description:`Position in data space.
Multiple stops at the same offset create hard color transitions.`},{key:"color",value:{name:"string",required:!0},description:"Color at the stop (any valid CSS color)"},{key:"opacity",value:{name:"number",required:!1},description:"Optional opacity (0-1). Defaults to 1."}]}}],raw:"GradientStop[]"},{name:"unknown"}],required:!0},description:`Gradient stops with colors and positions.
Can be an array of stop objects or a function that receives domain bounds.`}]},required:!1},description:`Gradient configuration.
When provided, creates gradient or threshold-based coloring.`},{key:"animate",value:{name:"boolean",required:!1},description:`Whether to animate the area.
Overrides the animate value from the chart context.`}]}},{name:"signature",type:"object",raw:`{
  /**
   * Transition configuration for path animations.
   */
  transition?: Transition;
}`,signature:{properties:[{key:"transition",value:{name:"Transition",required:!1},description:"Transition configuration for path animations."}]}}]},{name:"union",raw:"'fill' | 'fillOpacity' | 'baseline' | 'gradient' | 'animate' | 'transition'",elements:[{name:"literal",value:"'fill'"},{name:"literal",value:"'fillOpacity'"},{name:"literal",value:"'baseline'"},{name:"literal",value:"'gradient'"},{name:"literal",value:"'animate'"},{name:"literal",value:"'transition'"}]}],raw:`Pick<
  AreaProps,
  'fill' | 'fillOpacity' | 'baseline' | 'gradient' | 'animate' | 'transition'
>`},{name:"signature",type:"object",raw:`{
  /**
   * Path of the area
   */
  d: SVGProps<SVGPathElement>['d'];
  /**
   * ID of the y-axis to use.
   * If not provided, defaults to the default y-axis.
   */
  yAxisId?: string;
}`,signature:{properties:[{key:"d",value:{name:"SVGProps['d']",raw:"SVGProps<SVGPathElement>['d']",required:!0},description:"Path of the area"},{key:"yAxisId",value:{name:"string",required:!1},description:`ID of the y-axis to use.
If not provided, defaults to the default y-axis.`}]}}]}],required:!1},description:"Custom component to render line area fill."},{key:"opacity",value:{name:"number",required:!1},description:`Opacity of the line's stroke.
Will also be applied to points and area fill.
@default 1`},{key:"points",value:{name:"union",raw:`| boolean
| ((defaults: PointBaseProps) => boolean | null | undefined | Partial<PointProps>)`,elements:[{name:"boolean"},{name:"unknown"}],required:!1},description:"Controls whether and how to render points at each data point in the series.\n- `true`: Show all points with default styling\n- `false` or `undefined`: Hide all points\n- Function: Called for every entry in the data array to customize individual points\n\n@param defaults - The default point props computed by the Line component\n@returns true for default point, false/null/undefined for no point, or Partial<PointProps> to customize"},{key:"connectNulls",value:{name:"boolean",required:!1},description:"When true, the area is connected across null values."},{key:"stroke",value:{name:"string",required:!1},description:`The color of the line.
@default color of the series or 'var(--color-fgPrimary)'`},{key:"strokeOpacity",value:{name:"number",required:!1},description:`Opacity of the line
@note when combined with gradient, both will be applied
@default 1`},{key:"strokeWidth",value:{name:"number",required:!1},description:`Width of the line
@default 2`},{key:"gradient",value:{name:"signature",type:"object",raw:`{
  /**
   * Axis that the gradient maps to.
   * @default 'y'
   */
  axis?: 'x' | 'y';
  /**
   * Gradient stops with colors and positions.
   * Can be an array of stop objects or a function that receives domain bounds.
   */
  stops: GradientStop[] | ((domain: AxisBounds) => GradientStop[]);
}`,signature:{properties:[{key:"axis",value:{name:"union",raw:"'x' | 'y'",elements:[{name:"literal",value:"'x'"},{name:"literal",value:"'y'"}],required:!1},description:`Axis that the gradient maps to.
@default 'y'`},{key:"stops",value:{name:"union",raw:"GradientStop[] | ((domain: AxisBounds) => GradientStop[])",elements:[{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /**
   * Position in data space.
   * Multiple stops at the same offset create hard color transitions.
   */
  offset: number;
  /**  Color at the stop (any valid CSS color) */
  color: string;
  /** Optional opacity (0-1). Defaults to 1. */
  opacity?: number;
}`,signature:{properties:[{key:"offset",value:{name:"number",required:!0},description:`Position in data space.
Multiple stops at the same offset create hard color transitions.`},{key:"color",value:{name:"string",required:!0},description:"Color at the stop (any valid CSS color)"},{key:"opacity",value:{name:"number",required:!1},description:"Optional opacity (0-1). Defaults to 1."}]}}],raw:"GradientStop[]"},{name:"unknown"}],required:!0},description:`Gradient stops with colors and positions.
Can be an array of stop objects or a function that receives domain bounds.`}]},required:!1},description:`Gradient configuration.
When provided, creates gradient or threshold-based coloring.`},{key:"animate",value:{name:"boolean",required:!1},description:`Whether to animate the line.
Overrides the animate value from the chart context.`}]}}]},{name:"signature",type:"object",raw:`{
  /**
   * Transition configuration for line animations.
   */
  transition?: Transition;
  /**
   * Handler for when a point is clicked.
   * Passed through to Point components rendered via points.
   */
  onPointClick?: PointProps['onClick'];
  /**
   * Custom style for the line.
   */
  style?: React.CSSProperties;
  /**
   * Custom className for the line.
   */
  className?: string;
}`,signature:{properties:[{key:"transition",value:{name:"Transition",required:!1},description:"Transition configuration for line animations."},{key:"onPointClick",value:{name:"intersection['onClick']",raw:"PointProps['onClick']",required:!1},description:`Handler for when a point is clicked.
Passed through to Point components rendered via points.`},{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom style for the line."},{key:"className",value:{name:"string",required:!1},description:"Custom className for the line."}]}}]},{name:"union",raw:`| 'curve'
| 'showArea'
| 'areaType'
| 'areaBaseline'
| 'type'
| 'LineComponent'
| 'AreaComponent'
| 'stroke'
| 'strokeWidth'
| 'strokeOpacity'
| 'opacity'
| 'points'
| 'connectNulls'
| 'transition'
| 'onPointClick'`,elements:[{name:"literal",value:"'curve'"},{name:"literal",value:"'showArea'"},{name:"literal",value:"'areaType'"},{name:"literal",value:"'areaBaseline'"},{name:"literal",value:"'type'"},{name:"literal",value:"'LineComponent'"},{name:"literal",value:"'AreaComponent'"},{name:"literal",value:"'stroke'"},{name:"literal",value:"'strokeWidth'"},{name:"literal",value:"'strokeOpacity'"},{name:"literal",value:"'opacity'"},{name:"literal",value:"'points'"},{name:"literal",value:"'connectNulls'"},{name:"literal",value:"'transition'"},{name:"literal",value:"'onPointClick'"}]}],raw:`Pick<
  LineProps,
  | 'curve'
  | 'showArea'
  | 'areaType'
  | 'areaBaseline'
  | 'type'
  | 'LineComponent'
  | 'AreaComponent'
  | 'stroke'
  | 'strokeWidth'
  | 'strokeOpacity'
  | 'opacity'
  | 'points'
  | 'connectNulls'
  | 'transition'
  | 'onPointClick'
>`}],raw:`Partial<
  Pick<
    LineProps,
    | 'curve'
    | 'showArea'
    | 'areaType'
    | 'areaBaseline'
    | 'type'
    | 'LineComponent'
    | 'AreaComponent'
    | 'stroke'
    | 'strokeWidth'
    | 'strokeOpacity'
    | 'opacity'
    | 'points'
    | 'connectNulls'
    | 'transition'
    | 'onPointClick'
  >
>`}]}],raw:"Array<LineSeries>"},description:`Configuration objects that define how to visualize the data.
Each series supports Line component props for individual customization.`},showXAxis:{required:!1,tsType:{name:"boolean"},description:"Whether to show the X axis."},showYAxis:{required:!1,tsType:{name:"boolean"},description:"Whether to show the Y axis."},xAxis:{required:!1,tsType:{name:"intersection",raw:"Partial<AxisConfigProps> & XAxisProps",elements:[{name:"Partial",elements:[{name:"intersection",raw:`Omit<AxisConfig, 'domain' | 'range'> & {
  /**
   * Unique identifier for this axis.
   */
  id: string;
  /**
   * Domain configuration for the axis (data space).
   *
   * The domainLimit parameter (inherited from AxisConfig) controls how initial domain bounds are calculated:
   * - 'nice' (default for y axes): Rounds the domain to human-friendly values (e.g., 0-100 instead of 1.2-97.8)
   * - 'strict' (default for x axes): Uses the exact min/max values from the data
   *
   * The domain can be:
   * - A partial bounds object to override specific min/max values
   * - A function that receives the limit-processed bounds and allows further customization
   *
   * This allows you to first apply nice/strict processing, then optionally transform the result.
   */
  domain?: Partial<AxisBounds> | ((bounds: AxisBounds) => AxisBounds);
  /**
   * Range configuration for the axis (visual space in pixels).
   * Can be a partial bounds object to override specific values, or a function that transforms the calculated range.
   *
   * When using a function, it receives the initial calculated range bounds and allows you to adjust them.
   * This replaces the previous rangeOffset approach and provides more flexibility for range customization.
   */
  range?: Partial<AxisBounds> | ((bounds: AxisBounds) => AxisBounds);
}`,elements:[{name:"Omit",elements:[{name:"signature",type:"object",raw:`{
  /** The type of scale to use */
  scaleType: ChartAxisScaleType;
  /**
   * Domain bounds for the axis (data space)
   */
  domain: AxisBounds;
  /**
   * Range bounds for the axis (visual space in pixels)
   */
  range: AxisBounds;
  /**
   * Data for the axis
   */
  data?: string[] | number[];
  /**
   * Padding between categories for band scales (0-1, where 0.1 = 10% spacing)
   * Only used when scaleType is 'band'
   * @default 0.1
   */
  categoryPadding?: number;
  /**
   * Domain limit type for numeric scales
   * - 'nice': Rounds the domain to human-friendly values
   * - 'strict': Uses the exact min/max values from the data
   */
  domainLimit: 'nice' | 'strict';
}`,signature:{properties:[{key:"scaleType",value:{name:"union",raw:"'linear' | 'log' | 'band'",elements:[{name:"literal",value:"'linear'"},{name:"literal",value:"'log'"},{name:"literal",value:"'band'"}],required:!0},description:"The type of scale to use"},{key:"domain",value:{name:"signature",type:"object",raw:`{
  min: number;
  max: number;
}`,signature:{properties:[{key:"min",value:{name:"number",required:!0}},{key:"max",value:{name:"number",required:!0}}]},required:!0},description:"Domain bounds for the axis (data space)"},{key:"range",value:{name:"signature",type:"object",raw:`{
  min: number;
  max: number;
}`,signature:{properties:[{key:"min",value:{name:"number",required:!0}},{key:"max",value:{name:"number",required:!0}}]},required:!0},description:"Range bounds for the axis (visual space in pixels)"},{key:"data",value:{name:"union",raw:"string[] | number[]",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"Array",elements:[{name:"number"}],raw:"number[]"}],required:!1},description:"Data for the axis"},{key:"categoryPadding",value:{name:"number",required:!1},description:`Padding between categories for band scales (0-1, where 0.1 = 10% spacing)
Only used when scaleType is 'band'
@default 0.1`},{key:"domainLimit",value:{name:"union",raw:"'nice' | 'strict'",elements:[{name:"literal",value:"'nice'"},{name:"literal",value:"'strict'"}],required:!0},description:`Domain limit type for numeric scales
- 'nice': Rounds the domain to human-friendly values
- 'strict': Uses the exact min/max values from the data`}]}},{name:"union",raw:"'domain' | 'range'",elements:[{name:"literal",value:"'domain'"},{name:"literal",value:"'range'"}]}],raw:"Omit<AxisConfig, 'domain' | 'range'>"},{name:"signature",type:"object",raw:`{
  /**
   * Unique identifier for this axis.
   */
  id: string;
  /**
   * Domain configuration for the axis (data space).
   *
   * The domainLimit parameter (inherited from AxisConfig) controls how initial domain bounds are calculated:
   * - 'nice' (default for y axes): Rounds the domain to human-friendly values (e.g., 0-100 instead of 1.2-97.8)
   * - 'strict' (default for x axes): Uses the exact min/max values from the data
   *
   * The domain can be:
   * - A partial bounds object to override specific min/max values
   * - A function that receives the limit-processed bounds and allows further customization
   *
   * This allows you to first apply nice/strict processing, then optionally transform the result.
   */
  domain?: Partial<AxisBounds> | ((bounds: AxisBounds) => AxisBounds);
  /**
   * Range configuration for the axis (visual space in pixels).
   * Can be a partial bounds object to override specific values, or a function that transforms the calculated range.
   *
   * When using a function, it receives the initial calculated range bounds and allows you to adjust them.
   * This replaces the previous rangeOffset approach and provides more flexibility for range customization.
   */
  range?: Partial<AxisBounds> | ((bounds: AxisBounds) => AxisBounds);
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0},description:"Unique identifier for this axis."},{key:"domain",value:{name:"union",raw:"Partial<AxisBounds> | ((bounds: AxisBounds) => AxisBounds)",elements:[{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
  min: number;
  max: number;
}`,signature:{properties:[{key:"min",value:{name:"number",required:!0}},{key:"max",value:{name:"number",required:!0}}]},required:!0}],raw:"Partial<AxisBounds>"},{name:"unknown"}],required:!1},description:`Domain configuration for the axis (data space).

The domainLimit parameter (inherited from AxisConfig) controls how initial domain bounds are calculated:
- 'nice' (default for y axes): Rounds the domain to human-friendly values (e.g., 0-100 instead of 1.2-97.8)
- 'strict' (default for x axes): Uses the exact min/max values from the data

The domain can be:
- A partial bounds object to override specific min/max values
- A function that receives the limit-processed bounds and allows further customization

This allows you to first apply nice/strict processing, then optionally transform the result.`},{key:"range",value:{name:"union",raw:"Partial<AxisBounds> | ((bounds: AxisBounds) => AxisBounds)",elements:[{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
  min: number;
  max: number;
}`,signature:{properties:[{key:"min",value:{name:"number",required:!0}},{key:"max",value:{name:"number",required:!0}}]},required:!0}],raw:"Partial<AxisBounds>"},{name:"unknown"}],required:!1},description:`Range configuration for the axis (visual space in pixels).
Can be a partial bounds object to override specific values, or a function that transforms the calculated range.

When using a function, it receives the initial calculated range bounds and allows you to adjust them.
This replaces the previous rangeOffset approach and provides more flexibility for range customization.`}]}}]}],raw:"Partial<AxisConfigProps>"},{name:"intersection",raw:"AxisProps & XAxisBaseProps",elements:[{name:"intersection",raw:`AxisBaseProps & {
  /**
   * Custom className for the axis.
   */
  className?: string;
  /**
   * Custom classNames for the axis.
   */
  classNames?: {
    /**
     * Custom className for the root element.
     */
    root?: string;
    /**
     * Custom className for the axis label.
     */
    label?: string;
    /**
     * Custom className for the tick labels.
     */
    tickLabel?: string;
    /**
     * Custom className for the grid lines.
     */
    gridLine?: string;
    /**
     * Custom className for the axis line.
     */
    line?: string;
    /**
     * Custom className for the tick marks.
     */
    tickMark?: string;
  };
  /**
   * Custom style for the axis.
   */
  style?: React.CSSProperties;
  /**
   * Custom styles for the axis.
   */
  styles?: {
    /**
     * Custom style for the root element.
     */
    root?: React.CSSProperties;
    /**
     * Custom style for the axis label.
     */
    label?: React.CSSProperties;
    /**
     * Custom style for the tick labels.
     */
    tickLabel?: React.CSSProperties;
    /**
     * Custom style for the grid lines.
     */
    gridLine?: React.CSSProperties;
    /**
     * Custom style for the axis line.
     */
    line?: React.CSSProperties;
    /**
     * Custom style for the tick marks.
     */
    tickMark?: React.CSSProperties;
  };
  /**
   * Component to render the grid lines.
   * @default DottedLine
   */
  GridLineComponent?: LineComponent;
  /**
   * Component to render the axis line.
   * @default SolidLine
   */
  LineComponent?: LineComponent;
  /**
   * Component to render the tick marks.
   * @default SolidLine
   */
  TickMarkLineComponent?: LineComponent;
  /**
   * Formatter function for axis tick values.
   * Tick values will be wrapped in ChartText component.
   *
   * @example
   * // XAxis
   * tickLabelFormatter: (index) => {
   *   if (index % 12 === 0) {
   *     return <tspan style={{ fontWeight: 'bold' }}>\${prices[index]}</tspan>;
   *   }
   *   return \`$\${prices[index]}\`;
   * }
   *
   * @example
   * // YAxis
   * tickLabelFormatter: (value) => \`$\${prices[value]}\`
   */
  tickLabelFormatter?: (value: number) => ChartTextChildren;
  /**
   * Component to render tick labels.
   * Allows for custom styling and formatting that works cross-platform.
   *
   * @example
   * // Custom tick label component with elevation
   * TickLabelComponent={(props) => (
   *   <DefaultAxisTickLabel {...props} elevated color="var(--color-fgPrimary)" />
   * )}
   *
   * @default DefaultAxisTickLabel
   */
  TickLabelComponent?: AxisTickLabelComponent;
}`,elements:[{name:"intersection",raw:`SharedProps & {
  /**
   * Placement of grid lines relative to each band.
   * Options: 'start', 'middle', 'end', 'edges'
   * @note This property only applies to band scales.
   * @default 'edges'
   */
  bandGridLinePlacement?: AxisBandPlacement;
  /**
   * Placement of tick marks relative to each band.
   * Options: 'start', 'middle', 'end', 'edges'
   * @note This property only applies to band scales.
   * @default 'middle'
   */
  bandTickMarkPlacement?: AxisBandPlacement;
  /**
   * Label text to display for the axis.
   */
  label?: string;
  /**
   * Gap between the tick labels and the axis label.
   * @default 4
   */
  labelGap?: number;
  /**
   * Minimum gap between tick labels.
   * Labels will be hidden if they are closer than this gap.
   * @default 4
   */
  minTickLabelGap?: number;
  /**
   * Requested number of ticks to display.
   * This value is passed into d3 and may not be respected.
   * @note This property is overridden when \`ticks\` is provided.
   * @note this property overrides the \`tickInterval\` property.
   * @default 5 (for y-axis)
   */
  requestedTickCount?: number;
  /**
   * Whether to show grid lines at each tick position.
   */
  showGrid?: boolean;
  /**
   * Whether to show the axis line.
   */
  showLine?: boolean;
  /**
   * Whether to show tick marks on the axis.
   */
  showTickMarks?: boolean;
  /**
   * Size of the tick marks.
   * @default 4
   */
  tickMarkSize?: number;
  /**
   * Custom tick configuration for the axis.
   * When provided, this overrides the \`requestedTickCount\` property.
   *
   * - **Array**: Uses these exact values for tick positioning and labels.
   * - **Function**: Filters based on the predicate function.
   *   - For **x-axis**: Checks every data index (0, 1, 2, ..., dataLength-1)
   *   - For **y-axis**: Filters d3-generated tick values
   *
   * @example
   * // Exact tick values
   * ticks: [0, 25, 50, 75, 100]
   *
   * @example
   * // Show every 12th data point on x-axis
   * ticks: (index) => index % 12 === 0
   */
  ticks?: number[] | ((value: number) => boolean);
  /**
   * Space between the axis tick mark and labels.
   * If tick marks are not shown, this is the gap between the axis and the chart.
   * @default 2 for x-axis, 8 for y-axis
   */
  tickMarkLabelGap?: number;
  /**
   * Interval at which to show ticks.
   * When provided, calculates tick count based on available space.
   * @note this property is overridden by the \`requestedTickCount\` and \`ticks\` properties.
   * @default 32 (for x-axis)
   */
  tickInterval?: number;
  /**
   * Minimum step size for tick generation.
   * Prevents the step from being smaller than this value.
   * @default 1
   */
  tickMinStep?: number;
  /**
   * Maximum step size for tick generation.
   * Prevents the step from being larger than this value.
   */
  tickMaxStep?: number;
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
   * Placement of grid lines relative to each band.
   * Options: 'start', 'middle', 'end', 'edges'
   * @note This property only applies to band scales.
   * @default 'edges'
   */
  bandGridLinePlacement?: AxisBandPlacement;
  /**
   * Placement of tick marks relative to each band.
   * Options: 'start', 'middle', 'end', 'edges'
   * @note This property only applies to band scales.
   * @default 'middle'
   */
  bandTickMarkPlacement?: AxisBandPlacement;
  /**
   * Label text to display for the axis.
   */
  label?: string;
  /**
   * Gap between the tick labels and the axis label.
   * @default 4
   */
  labelGap?: number;
  /**
   * Minimum gap between tick labels.
   * Labels will be hidden if they are closer than this gap.
   * @default 4
   */
  minTickLabelGap?: number;
  /**
   * Requested number of ticks to display.
   * This value is passed into d3 and may not be respected.
   * @note This property is overridden when \`ticks\` is provided.
   * @note this property overrides the \`tickInterval\` property.
   * @default 5 (for y-axis)
   */
  requestedTickCount?: number;
  /**
   * Whether to show grid lines at each tick position.
   */
  showGrid?: boolean;
  /**
   * Whether to show the axis line.
   */
  showLine?: boolean;
  /**
   * Whether to show tick marks on the axis.
   */
  showTickMarks?: boolean;
  /**
   * Size of the tick marks.
   * @default 4
   */
  tickMarkSize?: number;
  /**
   * Custom tick configuration for the axis.
   * When provided, this overrides the \`requestedTickCount\` property.
   *
   * - **Array**: Uses these exact values for tick positioning and labels.
   * - **Function**: Filters based on the predicate function.
   *   - For **x-axis**: Checks every data index (0, 1, 2, ..., dataLength-1)
   *   - For **y-axis**: Filters d3-generated tick values
   *
   * @example
   * // Exact tick values
   * ticks: [0, 25, 50, 75, 100]
   *
   * @example
   * // Show every 12th data point on x-axis
   * ticks: (index) => index % 12 === 0
   */
  ticks?: number[] | ((value: number) => boolean);
  /**
   * Space between the axis tick mark and labels.
   * If tick marks are not shown, this is the gap between the axis and the chart.
   * @default 2 for x-axis, 8 for y-axis
   */
  tickMarkLabelGap?: number;
  /**
   * Interval at which to show ticks.
   * When provided, calculates tick count based on available space.
   * @note this property is overridden by the \`requestedTickCount\` and \`ticks\` properties.
   * @default 32 (for x-axis)
   */
  tickInterval?: number;
  /**
   * Minimum step size for tick generation.
   * Prevents the step from being smaller than this value.
   * @default 1
   */
  tickMinStep?: number;
  /**
   * Maximum step size for tick generation.
   * Prevents the step from being larger than this value.
   */
  tickMaxStep?: number;
}`,signature:{properties:[{key:"bandGridLinePlacement",value:{name:"union",raw:"'start' | 'middle' | 'end' | 'edges'",elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'middle'"},{name:"literal",value:"'end'"},{name:"literal",value:"'edges'"}],required:!1},description:`Placement of grid lines relative to each band.
Options: 'start', 'middle', 'end', 'edges'
@note This property only applies to band scales.
@default 'edges'`},{key:"bandTickMarkPlacement",value:{name:"union",raw:"'start' | 'middle' | 'end' | 'edges'",elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'middle'"},{name:"literal",value:"'end'"},{name:"literal",value:"'edges'"}],required:!1},description:`Placement of tick marks relative to each band.
Options: 'start', 'middle', 'end', 'edges'
@note This property only applies to band scales.
@default 'middle'`},{key:"label",value:{name:"string",required:!1},description:"Label text to display for the axis."},{key:"labelGap",value:{name:"number",required:!1},description:`Gap between the tick labels and the axis label.
@default 4`},{key:"minTickLabelGap",value:{name:"number",required:!1},description:`Minimum gap between tick labels.
Labels will be hidden if they are closer than this gap.
@default 4`},{key:"requestedTickCount",value:{name:"number",required:!1},description:"Requested number of ticks to display.\nThis value is passed into d3 and may not be respected.\n@note This property is overridden when `ticks` is provided.\n@note this property overrides the `tickInterval` property.\n@default 5 (for y-axis)"},{key:"showGrid",value:{name:"boolean",required:!1},description:"Whether to show grid lines at each tick position."},{key:"showLine",value:{name:"boolean",required:!1},description:"Whether to show the axis line."},{key:"showTickMarks",value:{name:"boolean",required:!1},description:"Whether to show tick marks on the axis."},{key:"tickMarkSize",value:{name:"number",required:!1},description:`Size of the tick marks.
@default 4`},{key:"ticks",value:{name:"union",raw:"number[] | ((value: number) => boolean)",elements:[{name:"Array",elements:[{name:"number"}],raw:"number[]"},{name:"unknown"}],required:!1},description:`Custom tick configuration for the axis.
When provided, this overrides the \`requestedTickCount\` property.

- **Array**: Uses these exact values for tick positioning and labels.
- **Function**: Filters based on the predicate function.
  - For **x-axis**: Checks every data index (0, 1, 2, ..., dataLength-1)
  - For **y-axis**: Filters d3-generated tick values

@example
// Exact tick values
ticks: [0, 25, 50, 75, 100]

@example
// Show every 12th data point on x-axis
ticks: (index) => index % 12 === 0`},{key:"tickMarkLabelGap",value:{name:"number",required:!1},description:`Space between the axis tick mark and labels.
If tick marks are not shown, this is the gap between the axis and the chart.
@default 2 for x-axis, 8 for y-axis`},{key:"tickInterval",value:{name:"number",required:!1},description:"Interval at which to show ticks.\nWhen provided, calculates tick count based on available space.\n@note this property is overridden by the `requestedTickCount` and `ticks` properties.\n@default 32 (for x-axis)"},{key:"tickMinStep",value:{name:"number",required:!1},description:`Minimum step size for tick generation.
Prevents the step from being smaller than this value.
@default 1`},{key:"tickMaxStep",value:{name:"number",required:!1},description:`Maximum step size for tick generation.
Prevents the step from being larger than this value.`}]}}]},{name:"signature",type:"object",raw:`{
  /**
   * Custom className for the axis.
   */
  className?: string;
  /**
   * Custom classNames for the axis.
   */
  classNames?: {
    /**
     * Custom className for the root element.
     */
    root?: string;
    /**
     * Custom className for the axis label.
     */
    label?: string;
    /**
     * Custom className for the tick labels.
     */
    tickLabel?: string;
    /**
     * Custom className for the grid lines.
     */
    gridLine?: string;
    /**
     * Custom className for the axis line.
     */
    line?: string;
    /**
     * Custom className for the tick marks.
     */
    tickMark?: string;
  };
  /**
   * Custom style for the axis.
   */
  style?: React.CSSProperties;
  /**
   * Custom styles for the axis.
   */
  styles?: {
    /**
     * Custom style for the root element.
     */
    root?: React.CSSProperties;
    /**
     * Custom style for the axis label.
     */
    label?: React.CSSProperties;
    /**
     * Custom style for the tick labels.
     */
    tickLabel?: React.CSSProperties;
    /**
     * Custom style for the grid lines.
     */
    gridLine?: React.CSSProperties;
    /**
     * Custom style for the axis line.
     */
    line?: React.CSSProperties;
    /**
     * Custom style for the tick marks.
     */
    tickMark?: React.CSSProperties;
  };
  /**
   * Component to render the grid lines.
   * @default DottedLine
   */
  GridLineComponent?: LineComponent;
  /**
   * Component to render the axis line.
   * @default SolidLine
   */
  LineComponent?: LineComponent;
  /**
   * Component to render the tick marks.
   * @default SolidLine
   */
  TickMarkLineComponent?: LineComponent;
  /**
   * Formatter function for axis tick values.
   * Tick values will be wrapped in ChartText component.
   *
   * @example
   * // XAxis
   * tickLabelFormatter: (index) => {
   *   if (index % 12 === 0) {
   *     return <tspan style={{ fontWeight: 'bold' }}>\${prices[index]}</tspan>;
   *   }
   *   return \`$\${prices[index]}\`;
   * }
   *
   * @example
   * // YAxis
   * tickLabelFormatter: (value) => \`$\${prices[value]}\`
   */
  tickLabelFormatter?: (value: number) => ChartTextChildren;
  /**
   * Component to render tick labels.
   * Allows for custom styling and formatting that works cross-platform.
   *
   * @example
   * // Custom tick label component with elevation
   * TickLabelComponent={(props) => (
   *   <DefaultAxisTickLabel {...props} elevated color="var(--color-fgPrimary)" />
   * )}
   *
   * @default DefaultAxisTickLabel
   */
  TickLabelComponent?: AxisTickLabelComponent;
}`,signature:{properties:[{key:"className",value:{name:"string",required:!1},description:"Custom className for the axis."},{key:"classNames",value:{name:"signature",type:"object",raw:`{
  /**
   * Custom className for the root element.
   */
  root?: string;
  /**
   * Custom className for the axis label.
   */
  label?: string;
  /**
   * Custom className for the tick labels.
   */
  tickLabel?: string;
  /**
   * Custom className for the grid lines.
   */
  gridLine?: string;
  /**
   * Custom className for the axis line.
   */
  line?: string;
  /**
   * Custom className for the tick marks.
   */
  tickMark?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1},description:"Custom className for the root element."},{key:"label",value:{name:"string",required:!1},description:"Custom className for the axis label."},{key:"tickLabel",value:{name:"string",required:!1},description:"Custom className for the tick labels."},{key:"gridLine",value:{name:"string",required:!1},description:"Custom className for the grid lines."},{key:"line",value:{name:"string",required:!1},description:"Custom className for the axis line."},{key:"tickMark",value:{name:"string",required:!1},description:"Custom className for the tick marks."}]},required:!1},description:"Custom classNames for the axis."},{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom style for the axis."},{key:"styles",value:{name:"signature",type:"object",raw:`{
  /**
   * Custom style for the root element.
   */
  root?: React.CSSProperties;
  /**
   * Custom style for the axis label.
   */
  label?: React.CSSProperties;
  /**
   * Custom style for the tick labels.
   */
  tickLabel?: React.CSSProperties;
  /**
   * Custom style for the grid lines.
   */
  gridLine?: React.CSSProperties;
  /**
   * Custom style for the axis line.
   */
  line?: React.CSSProperties;
  /**
   * Custom style for the tick marks.
   */
  tickMark?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom style for the root element."},{key:"label",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom style for the axis label."},{key:"tickLabel",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom style for the tick labels."},{key:"gridLine",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom style for the grid lines."},{key:"line",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom style for the axis line."},{key:"tickMark",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom style for the tick marks."}]},required:!1},description:"Custom styles for the axis."},{key:"GridLineComponent",value:{name:"ReactFC",raw:"React.FC<LineComponentProps>",elements:[{name:"intersection",raw:`Pick<
  LineProps,
  | 'stroke'
  | 'strokeOpacity'
  | 'strokeWidth'
  | 'gradient'
  | 'animate'
  | 'transition'
  | 'style'
  | 'className'
> &
  Pick<PathProps, 'clipRect' | 'strokeLinecap'> & {
    /**
     * Path of the line.
     */
    d: SVGProps<SVGPathElement>['d'];
    /**
     * ID of the y-axis to use.
     * If not provided, defaults to the default y-axis.
     */
    yAxisId?: string;
  }`,elements:[{name:"Pick",elements:[{name:"intersection",raw:`LineBaseProps & {
  /**
   * Transition configuration for line animations.
   */
  transition?: Transition;
  /**
   * Handler for when a point is clicked.
   * Passed through to Point components rendered via points.
   */
  onPointClick?: PointProps['onClick'];
  /**
   * Custom style for the line.
   */
  style?: React.CSSProperties;
  /**
   * Custom className for the line.
   */
  className?: string;
}`,elements:[{name:"intersection",raw:`SharedProps & {
  /**
   * The ID of the series to render. Will be used to find the data from the chart context.
   */
  seriesId: string;
  /**
   * The curve interpolation method to use for the line.
   * @default 'bump'
   */
  curve?: ChartPathCurveType;
  /**
   * The type of line to render.
   * @default 'solid'
   */
  type?: 'solid' | 'dotted';
  /**
   * Whether to show area fill under the line.
   */
  showArea?: boolean;
  /**
   * The type of area fill to add to the line.
   * @default 'gradient'
   */
  areaType?: 'gradient' | 'solid' | 'dotted';
  /**
   * Baseline value for the area.
   * When set, overrides the default baseline.
   */
  areaBaseline?: number;
  /**
   * Component to render the line.
   * Takes precedence over the type prop if provided.
   */
  LineComponent?: LineComponent;
  /**
   * Custom component to render line area fill.
   */
  AreaComponent?: AreaComponent;
  /**
   * Opacity of the line's stroke.
   * Will also be applied to points and area fill.
   * @default 1
   */
  opacity?: number;
  /**
   * Controls whether and how to render points at each data point in the series.
   * - \`true\`: Show all points with default styling
   * - \`false\` or \`undefined\`: Hide all points
   * - Function: Called for every entry in the data array to customize individual points
   *
   * @param defaults - The default point props computed by the Line component
   * @returns true for default point, false/null/undefined for no point, or Partial<PointProps> to customize
   */
  points?:
    | boolean
    | ((defaults: PointBaseProps) => boolean | null | undefined | Partial<PointProps>);
  /**
   * When true, the area is connected across null values.
   */
  connectNulls?: boolean;
  /**
   * The color of the line.
   * @default color of the series or 'var(--color-fgPrimary)'
   */
  stroke?: string;
  /**
   * Opacity of the line
   * @note when combined with gradient, both will be applied
   * @default 1
   */
  strokeOpacity?: number;
  /**
   * Width of the line
   * @default 2
   */
  strokeWidth?: number;
  /**
   * Gradient configuration.
   * When provided, creates gradient or threshold-based coloring.
   */
  gradient?: GradientDefinition;
  /**
   * Whether to animate the line.
   * Overrides the animate value from the chart context.
   */
  animate?: boolean;
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
   * The ID of the series to render. Will be used to find the data from the chart context.
   */
  seriesId: string;
  /**
   * The curve interpolation method to use for the line.
   * @default 'bump'
   */
  curve?: ChartPathCurveType;
  /**
   * The type of line to render.
   * @default 'solid'
   */
  type?: 'solid' | 'dotted';
  /**
   * Whether to show area fill under the line.
   */
  showArea?: boolean;
  /**
   * The type of area fill to add to the line.
   * @default 'gradient'
   */
  areaType?: 'gradient' | 'solid' | 'dotted';
  /**
   * Baseline value for the area.
   * When set, overrides the default baseline.
   */
  areaBaseline?: number;
  /**
   * Component to render the line.
   * Takes precedence over the type prop if provided.
   */
  LineComponent?: LineComponent;
  /**
   * Custom component to render line area fill.
   */
  AreaComponent?: AreaComponent;
  /**
   * Opacity of the line's stroke.
   * Will also be applied to points and area fill.
   * @default 1
   */
  opacity?: number;
  /**
   * Controls whether and how to render points at each data point in the series.
   * - \`true\`: Show all points with default styling
   * - \`false\` or \`undefined\`: Hide all points
   * - Function: Called for every entry in the data array to customize individual points
   *
   * @param defaults - The default point props computed by the Line component
   * @returns true for default point, false/null/undefined for no point, or Partial<PointProps> to customize
   */
  points?:
    | boolean
    | ((defaults: PointBaseProps) => boolean | null | undefined | Partial<PointProps>);
  /**
   * When true, the area is connected across null values.
   */
  connectNulls?: boolean;
  /**
   * The color of the line.
   * @default color of the series or 'var(--color-fgPrimary)'
   */
  stroke?: string;
  /**
   * Opacity of the line
   * @note when combined with gradient, both will be applied
   * @default 1
   */
  strokeOpacity?: number;
  /**
   * Width of the line
   * @default 2
   */
  strokeWidth?: number;
  /**
   * Gradient configuration.
   * When provided, creates gradient or threshold-based coloring.
   */
  gradient?: GradientDefinition;
  /**
   * Whether to animate the line.
   * Overrides the animate value from the chart context.
   */
  animate?: boolean;
}`,signature:{properties:[{key:"seriesId",value:{name:"string",required:!0},description:"The ID of the series to render. Will be used to find the data from the chart context."},{key:"curve",value:{name:"union",raw:`| 'bump'
| 'catmullRom'
| 'linear'
| 'linearClosed'
| 'monotone'
| 'natural'
| 'step'
| 'stepBefore'
| 'stepAfter'`,elements:[{name:"literal",value:"'bump'"},{name:"literal",value:"'catmullRom'"},{name:"literal",value:"'linear'"},{name:"literal",value:"'linearClosed'"},{name:"literal",value:"'monotone'"},{name:"literal",value:"'natural'"},{name:"literal",value:"'step'"},{name:"literal",value:"'stepBefore'"},{name:"literal",value:"'stepAfter'"}],required:!1},description:`The curve interpolation method to use for the line.
@default 'bump'`},{key:"type",value:{name:"union",raw:"'solid' | 'dotted'",elements:[{name:"literal",value:"'solid'"},{name:"literal",value:"'dotted'"}],required:!1},description:`The type of line to render.
@default 'solid'`},{key:"showArea",value:{name:"boolean",required:!1},description:"Whether to show area fill under the line."},{key:"areaType",value:{name:"union",raw:"'gradient' | 'solid' | 'dotted'",elements:[{name:"literal",value:"'gradient'"},{name:"literal",value:"'solid'"},{name:"literal",value:"'dotted'"}],required:!1},description:`The type of area fill to add to the line.
@default 'gradient'`},{key:"areaBaseline",value:{name:"number",required:!1},description:`Baseline value for the area.
When set, overrides the default baseline.`},{key:"LineComponent",value:{name:"LineComponent",required:!1},description:`Component to render the line.
Takes precedence over the type prop if provided.`},{key:"AreaComponent",value:{name:"ReactFC",raw:"React.FC<AreaComponentProps>",elements:[{name:"intersection",raw:`Pick<
  AreaProps,
  'fill' | 'fillOpacity' | 'baseline' | 'gradient' | 'animate' | 'transition'
> & {
  /**
   * Path of the area
   */
  d: SVGProps<SVGPathElement>['d'];
  /**
   * ID of the y-axis to use.
   * If not provided, defaults to the default y-axis.
   */
  yAxisId?: string;
}`,elements:[{name:"Pick",elements:[{name:"intersection",raw:`AreaBaseProps & {
  /**
   * Transition configuration for path animations.
   */
  transition?: Transition;
}`,elements:[{name:"signature",type:"object",raw:`{
  /**
   * The ID of the series to render. Will be used to find the data from the chart context.
   */
  seriesId: string;
  /**
   * The curve interpolation method to use for the line.
   * @default 'bump'
   */
  curve?: ChartPathCurveType;
  /**
   * The type of area to render.
   * @default 'solid'
   */
  type?: 'solid' | 'dotted' | 'gradient';
  /**
   * Component to render the area.
   * Takes precedence over the type prop if provided.
   */
  AreaComponent?: AreaComponent;
  /**
   * When true, the area is connected across null values.
   */
  connectNulls?: boolean;
  /**
   * The color of the area.
   * @default color of the series or 'var(--color-fgPrimary)'
   */
  fill?: string;
  /**
   * Opacity of the area
   * @note when combined with gradient, both will be applied
   * @default 1
   */
  fillOpacity?: number;
  /**
   * Baseline value for the gradient.
   * When set, overrides the default baseline.
   */
  baseline?: number;
  /**
   * Gradient configuration.
   * When provided, creates gradient or threshold-based coloring.
   */
  gradient?: GradientDefinition;
  /**
   * Whether to animate the area.
   * Overrides the animate value from the chart context.
   */
  animate?: boolean;
}`,signature:{properties:[{key:"seriesId",value:{name:"string",required:!0},description:"The ID of the series to render. Will be used to find the data from the chart context."},{key:"curve",value:{name:"union",raw:`| 'bump'
| 'catmullRom'
| 'linear'
| 'linearClosed'
| 'monotone'
| 'natural'
| 'step'
| 'stepBefore'
| 'stepAfter'`,elements:[{name:"literal",value:"'bump'"},{name:"literal",value:"'catmullRom'"},{name:"literal",value:"'linear'"},{name:"literal",value:"'linearClosed'"},{name:"literal",value:"'monotone'"},{name:"literal",value:"'natural'"},{name:"literal",value:"'step'"},{name:"literal",value:"'stepBefore'"},{name:"literal",value:"'stepAfter'"}],required:!1},description:`The curve interpolation method to use for the line.
@default 'bump'`},{key:"type",value:{name:"union",raw:"'solid' | 'dotted' | 'gradient'",elements:[{name:"literal",value:"'solid'"},{name:"literal",value:"'dotted'"},{name:"literal",value:"'gradient'"}],required:!1},description:`The type of area to render.
@default 'solid'`},{key:"AreaComponent",value:{name:"AreaComponent",required:!1},description:`Component to render the area.
Takes precedence over the type prop if provided.`},{key:"connectNulls",value:{name:"boolean",required:!1},description:"When true, the area is connected across null values."},{key:"fill",value:{name:"string",required:!1},description:`The color of the area.
@default color of the series or 'var(--color-fgPrimary)'`},{key:"fillOpacity",value:{name:"number",required:!1},description:`Opacity of the area
@note when combined with gradient, both will be applied
@default 1`},{key:"baseline",value:{name:"number",required:!1},description:`Baseline value for the gradient.
When set, overrides the default baseline.`},{key:"gradient",value:{name:"signature",type:"object",raw:`{
  /**
   * Axis that the gradient maps to.
   * @default 'y'
   */
  axis?: 'x' | 'y';
  /**
   * Gradient stops with colors and positions.
   * Can be an array of stop objects or a function that receives domain bounds.
   */
  stops: GradientStop[] | ((domain: AxisBounds) => GradientStop[]);
}`,signature:{properties:[{key:"axis",value:{name:"union",raw:"'x' | 'y'",elements:[{name:"literal",value:"'x'"},{name:"literal",value:"'y'"}],required:!1},description:`Axis that the gradient maps to.
@default 'y'`},{key:"stops",value:{name:"union",raw:"GradientStop[] | ((domain: AxisBounds) => GradientStop[])",elements:[{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /**
   * Position in data space.
   * Multiple stops at the same offset create hard color transitions.
   */
  offset: number;
  /**  Color at the stop (any valid CSS color) */
  color: string;
  /** Optional opacity (0-1). Defaults to 1. */
  opacity?: number;
}`,signature:{properties:[{key:"offset",value:{name:"number",required:!0},description:`Position in data space.
Multiple stops at the same offset create hard color transitions.`},{key:"color",value:{name:"string",required:!0},description:"Color at the stop (any valid CSS color)"},{key:"opacity",value:{name:"number",required:!1},description:"Optional opacity (0-1). Defaults to 1."}]}}],raw:"GradientStop[]"},{name:"unknown"}],required:!0},description:`Gradient stops with colors and positions.
Can be an array of stop objects or a function that receives domain bounds.`}]},required:!1},description:`Gradient configuration.
When provided, creates gradient or threshold-based coloring.`},{key:"animate",value:{name:"boolean",required:!1},description:`Whether to animate the area.
Overrides the animate value from the chart context.`}]}},{name:"signature",type:"object",raw:`{
  /**
   * Transition configuration for path animations.
   */
  transition?: Transition;
}`,signature:{properties:[{key:"transition",value:{name:"Transition",required:!1},description:"Transition configuration for path animations."}]}}]},{name:"union",raw:"'fill' | 'fillOpacity' | 'baseline' | 'gradient' | 'animate' | 'transition'",elements:[{name:"literal",value:"'fill'"},{name:"literal",value:"'fillOpacity'"},{name:"literal",value:"'baseline'"},{name:"literal",value:"'gradient'"},{name:"literal",value:"'animate'"},{name:"literal",value:"'transition'"}]}],raw:`Pick<
  AreaProps,
  'fill' | 'fillOpacity' | 'baseline' | 'gradient' | 'animate' | 'transition'
>`},{name:"signature",type:"object",raw:`{
  /**
   * Path of the area
   */
  d: SVGProps<SVGPathElement>['d'];
  /**
   * ID of the y-axis to use.
   * If not provided, defaults to the default y-axis.
   */
  yAxisId?: string;
}`,signature:{properties:[{key:"d",value:{name:"SVGProps['d']",raw:"SVGProps<SVGPathElement>['d']",required:!0},description:"Path of the area"},{key:"yAxisId",value:{name:"string",required:!1},description:`ID of the y-axis to use.
If not provided, defaults to the default y-axis.`}]}}]}],required:!1},description:"Custom component to render line area fill."},{key:"opacity",value:{name:"number",required:!1},description:`Opacity of the line's stroke.
Will also be applied to points and area fill.
@default 1`},{key:"points",value:{name:"union",raw:`| boolean
| ((defaults: PointBaseProps) => boolean | null | undefined | Partial<PointProps>)`,elements:[{name:"boolean"},{name:"unknown"}],required:!1},description:"Controls whether and how to render points at each data point in the series.\n- `true`: Show all points with default styling\n- `false` or `undefined`: Hide all points\n- Function: Called for every entry in the data array to customize individual points\n\n@param defaults - The default point props computed by the Line component\n@returns true for default point, false/null/undefined for no point, or Partial<PointProps> to customize"},{key:"connectNulls",value:{name:"boolean",required:!1},description:"When true, the area is connected across null values."},{key:"stroke",value:{name:"string",required:!1},description:`The color of the line.
@default color of the series or 'var(--color-fgPrimary)'`},{key:"strokeOpacity",value:{name:"number",required:!1},description:`Opacity of the line
@note when combined with gradient, both will be applied
@default 1`},{key:"strokeWidth",value:{name:"number",required:!1},description:`Width of the line
@default 2`},{key:"gradient",value:{name:"signature",type:"object",raw:`{
  /**
   * Axis that the gradient maps to.
   * @default 'y'
   */
  axis?: 'x' | 'y';
  /**
   * Gradient stops with colors and positions.
   * Can be an array of stop objects or a function that receives domain bounds.
   */
  stops: GradientStop[] | ((domain: AxisBounds) => GradientStop[]);
}`,signature:{properties:[{key:"axis",value:{name:"union",raw:"'x' | 'y'",elements:[{name:"literal",value:"'x'"},{name:"literal",value:"'y'"}],required:!1},description:`Axis that the gradient maps to.
@default 'y'`},{key:"stops",value:{name:"union",raw:"GradientStop[] | ((domain: AxisBounds) => GradientStop[])",elements:[{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /**
   * Position in data space.
   * Multiple stops at the same offset create hard color transitions.
   */
  offset: number;
  /**  Color at the stop (any valid CSS color) */
  color: string;
  /** Optional opacity (0-1). Defaults to 1. */
  opacity?: number;
}`,signature:{properties:[{key:"offset",value:{name:"number",required:!0},description:`Position in data space.
Multiple stops at the same offset create hard color transitions.`},{key:"color",value:{name:"string",required:!0},description:"Color at the stop (any valid CSS color)"},{key:"opacity",value:{name:"number",required:!1},description:"Optional opacity (0-1). Defaults to 1."}]}}],raw:"GradientStop[]"},{name:"unknown"}],required:!0},description:`Gradient stops with colors and positions.
Can be an array of stop objects or a function that receives domain bounds.`}]},required:!1},description:`Gradient configuration.
When provided, creates gradient or threshold-based coloring.`},{key:"animate",value:{name:"boolean",required:!1},description:`Whether to animate the line.
Overrides the animate value from the chart context.`}]}}]},{name:"signature",type:"object",raw:`{
  /**
   * Transition configuration for line animations.
   */
  transition?: Transition;
  /**
   * Handler for when a point is clicked.
   * Passed through to Point components rendered via points.
   */
  onPointClick?: PointProps['onClick'];
  /**
   * Custom style for the line.
   */
  style?: React.CSSProperties;
  /**
   * Custom className for the line.
   */
  className?: string;
}`,signature:{properties:[{key:"transition",value:{name:"Transition",required:!1},description:"Transition configuration for line animations."},{key:"onPointClick",value:{name:"intersection['onClick']",raw:"PointProps['onClick']",required:!1},description:`Handler for when a point is clicked.
Passed through to Point components rendered via points.`},{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom style for the line."},{key:"className",value:{name:"string",required:!1},description:"Custom className for the line."}]}}]},{name:"union",raw:`| 'stroke'
| 'strokeOpacity'
| 'strokeWidth'
| 'gradient'
| 'animate'
| 'transition'
| 'style'
| 'className'`,elements:[{name:"literal",value:"'stroke'"},{name:"literal",value:"'strokeOpacity'"},{name:"literal",value:"'strokeWidth'"},{name:"literal",value:"'gradient'"},{name:"literal",value:"'animate'"},{name:"literal",value:"'transition'"},{name:"literal",value:"'style'"},{name:"literal",value:"'className'"}]}],raw:`Pick<
  LineProps,
  | 'stroke'
  | 'strokeOpacity'
  | 'strokeWidth'
  | 'gradient'
  | 'animate'
  | 'transition'
  | 'style'
  | 'className'
>`},{name:"Pick",elements:[{name:"intersection",raw:`PathBaseProps &
Omit<
  SVGProps<SVGPathElement>,
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
  | 'onAnimationStartCapture'
  | 'onAnimationEndCapture'
  | 'onAnimationIterationCapture'
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragStart'
  | 'onDragCapture'
  | 'onDragEndCapture'
  | 'onDragStartCapture'
> & {
  /**
   * Offset added to the clip rect boundaries.
   */
  clipOffset?: number;
  /**
   * Custom clip path rect. If provided, this overrides the default chart rect for clipping.
   * Pass null to disable clipping.
   * @default drawingArea of chart + clipOffset
   */
  clipRect?: Rect | null;
  /**
   * Transition configuration for path.
   *
   * @example
   * // Timing based animation
   * transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
   *
   * @example
   * // Spring animation
   * transition={{ type: 'spring', damping: 20, stiffness: 300 }}
   */
  transition?: Transition;
}`,elements:[{name:"intersection",raw:`SharedProps & {
  /**
   * Whether to animate this path. Overrides the animate prop on the Chart component.
   */
  animate?: boolean;
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
   * Whether to animate this path. Overrides the animate prop on the Chart component.
   */
  animate?: boolean;
}`,signature:{properties:[{key:"animate",value:{name:"boolean",required:!1},description:"Whether to animate this path. Overrides the animate prop on the Chart component."}]}}]},{name:"Omit",elements:[{name:"SVGProps",elements:[{name:"SVGPathElement"}],raw:"SVGProps<SVGPathElement>"},{name:"union",raw:`| 'onAnimationStart'
| 'onAnimationEnd'
| 'onAnimationIteration'
| 'onAnimationStartCapture'
| 'onAnimationEndCapture'
| 'onAnimationIterationCapture'
| 'onDrag'
| 'onDragEnd'
| 'onDragStart'
| 'onDragCapture'
| 'onDragEndCapture'
| 'onDragStartCapture'`,elements:[{name:"literal",value:"'onAnimationStart'"},{name:"literal",value:"'onAnimationEnd'"},{name:"literal",value:"'onAnimationIteration'"},{name:"literal",value:"'onAnimationStartCapture'"},{name:"literal",value:"'onAnimationEndCapture'"},{name:"literal",value:"'onAnimationIterationCapture'"},{name:"literal",value:"'onDrag'"},{name:"literal",value:"'onDragEnd'"},{name:"literal",value:"'onDragStart'"},{name:"literal",value:"'onDragCapture'"},{name:"literal",value:"'onDragEndCapture'"},{name:"literal",value:"'onDragStartCapture'"}]}],raw:`Omit<
  SVGProps<SVGPathElement>,
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
  | 'onAnimationStartCapture'
  | 'onAnimationEndCapture'
  | 'onAnimationIterationCapture'
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragStart'
  | 'onDragCapture'
  | 'onDragEndCapture'
  | 'onDragStartCapture'
>`},{name:"signature",type:"object",raw:`{
  /**
   * Offset added to the clip rect boundaries.
   */
  clipOffset?: number;
  /**
   * Custom clip path rect. If provided, this overrides the default chart rect for clipping.
   * Pass null to disable clipping.
   * @default drawingArea of chart + clipOffset
   */
  clipRect?: Rect | null;
  /**
   * Transition configuration for path.
   *
   * @example
   * // Timing based animation
   * transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
   *
   * @example
   * // Spring animation
   * transition={{ type: 'spring', damping: 20, stiffness: 300 }}
   */
  transition?: Transition;
}`,signature:{properties:[{key:"clipOffset",value:{name:"number",required:!1},description:"Offset added to the clip rect boundaries."},{key:"clipRect",value:{name:"union",raw:"Rect | null",elements:[{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
  width: number;
  height: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!1},{name:"null"}],required:!1},description:`Custom clip path rect. If provided, this overrides the default chart rect for clipping.
Pass null to disable clipping.
@default drawingArea of chart + clipOffset`},{key:"transition",value:{name:"Transition",required:!1},description:`Transition configuration for path.

@example
// Timing based animation
transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}

@example
// Spring animation
transition={{ type: 'spring', damping: 20, stiffness: 300 }}`}]}}]},{name:"union",raw:"'clipRect' | 'strokeLinecap'",elements:[{name:"literal",value:"'clipRect'"},{name:"literal",value:"'strokeLinecap'"}]}],raw:"Pick<PathProps, 'clipRect' | 'strokeLinecap'>"},{name:"signature",type:"object",raw:`{
  /**
   * Path of the line.
   */
  d: SVGProps<SVGPathElement>['d'];
  /**
   * ID of the y-axis to use.
   * If not provided, defaults to the default y-axis.
   */
  yAxisId?: string;
}`,signature:{properties:[{key:"d",value:{name:"SVGProps['d']",raw:"SVGProps<SVGPathElement>['d']",required:!0},description:"Path of the line."},{key:"yAxisId",value:{name:"string",required:!1},description:`ID of the y-axis to use.
If not provided, defaults to the default y-axis.`}]}}]}],required:!1},description:`Component to render the grid lines.
@default DottedLine`},{key:"LineComponent",value:{name:"ReactFC",raw:"React.FC<LineComponentProps>",elements:[{name:"intersection",raw:`Pick<
  LineProps,
  | 'stroke'
  | 'strokeOpacity'
  | 'strokeWidth'
  | 'gradient'
  | 'animate'
  | 'transition'
  | 'style'
  | 'className'
> &
  Pick<PathProps, 'clipRect' | 'strokeLinecap'> & {
    /**
     * Path of the line.
     */
    d: SVGProps<SVGPathElement>['d'];
    /**
     * ID of the y-axis to use.
     * If not provided, defaults to the default y-axis.
     */
    yAxisId?: string;
  }`,elements:[{name:"Pick",elements:[{name:"intersection",raw:`LineBaseProps & {
  /**
   * Transition configuration for line animations.
   */
  transition?: Transition;
  /**
   * Handler for when a point is clicked.
   * Passed through to Point components rendered via points.
   */
  onPointClick?: PointProps['onClick'];
  /**
   * Custom style for the line.
   */
  style?: React.CSSProperties;
  /**
   * Custom className for the line.
   */
  className?: string;
}`,elements:[{name:"intersection",raw:`SharedProps & {
  /**
   * The ID of the series to render. Will be used to find the data from the chart context.
   */
  seriesId: string;
  /**
   * The curve interpolation method to use for the line.
   * @default 'bump'
   */
  curve?: ChartPathCurveType;
  /**
   * The type of line to render.
   * @default 'solid'
   */
  type?: 'solid' | 'dotted';
  /**
   * Whether to show area fill under the line.
   */
  showArea?: boolean;
  /**
   * The type of area fill to add to the line.
   * @default 'gradient'
   */
  areaType?: 'gradient' | 'solid' | 'dotted';
  /**
   * Baseline value for the area.
   * When set, overrides the default baseline.
   */
  areaBaseline?: number;
  /**
   * Component to render the line.
   * Takes precedence over the type prop if provided.
   */
  LineComponent?: LineComponent;
  /**
   * Custom component to render line area fill.
   */
  AreaComponent?: AreaComponent;
  /**
   * Opacity of the line's stroke.
   * Will also be applied to points and area fill.
   * @default 1
   */
  opacity?: number;
  /**
   * Controls whether and how to render points at each data point in the series.
   * - \`true\`: Show all points with default styling
   * - \`false\` or \`undefined\`: Hide all points
   * - Function: Called for every entry in the data array to customize individual points
   *
   * @param defaults - The default point props computed by the Line component
   * @returns true for default point, false/null/undefined for no point, or Partial<PointProps> to customize
   */
  points?:
    | boolean
    | ((defaults: PointBaseProps) => boolean | null | undefined | Partial<PointProps>);
  /**
   * When true, the area is connected across null values.
   */
  connectNulls?: boolean;
  /**
   * The color of the line.
   * @default color of the series or 'var(--color-fgPrimary)'
   */
  stroke?: string;
  /**
   * Opacity of the line
   * @note when combined with gradient, both will be applied
   * @default 1
   */
  strokeOpacity?: number;
  /**
   * Width of the line
   * @default 2
   */
  strokeWidth?: number;
  /**
   * Gradient configuration.
   * When provided, creates gradient or threshold-based coloring.
   */
  gradient?: GradientDefinition;
  /**
   * Whether to animate the line.
   * Overrides the animate value from the chart context.
   */
  animate?: boolean;
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
   * The ID of the series to render. Will be used to find the data from the chart context.
   */
  seriesId: string;
  /**
   * The curve interpolation method to use for the line.
   * @default 'bump'
   */
  curve?: ChartPathCurveType;
  /**
   * The type of line to render.
   * @default 'solid'
   */
  type?: 'solid' | 'dotted';
  /**
   * Whether to show area fill under the line.
   */
  showArea?: boolean;
  /**
   * The type of area fill to add to the line.
   * @default 'gradient'
   */
  areaType?: 'gradient' | 'solid' | 'dotted';
  /**
   * Baseline value for the area.
   * When set, overrides the default baseline.
   */
  areaBaseline?: number;
  /**
   * Component to render the line.
   * Takes precedence over the type prop if provided.
   */
  LineComponent?: LineComponent;
  /**
   * Custom component to render line area fill.
   */
  AreaComponent?: AreaComponent;
  /**
   * Opacity of the line's stroke.
   * Will also be applied to points and area fill.
   * @default 1
   */
  opacity?: number;
  /**
   * Controls whether and how to render points at each data point in the series.
   * - \`true\`: Show all points with default styling
   * - \`false\` or \`undefined\`: Hide all points
   * - Function: Called for every entry in the data array to customize individual points
   *
   * @param defaults - The default point props computed by the Line component
   * @returns true for default point, false/null/undefined for no point, or Partial<PointProps> to customize
   */
  points?:
    | boolean
    | ((defaults: PointBaseProps) => boolean | null | undefined | Partial<PointProps>);
  /**
   * When true, the area is connected across null values.
   */
  connectNulls?: boolean;
  /**
   * The color of the line.
   * @default color of the series or 'var(--color-fgPrimary)'
   */
  stroke?: string;
  /**
   * Opacity of the line
   * @note when combined with gradient, both will be applied
   * @default 1
   */
  strokeOpacity?: number;
  /**
   * Width of the line
   * @default 2
   */
  strokeWidth?: number;
  /**
   * Gradient configuration.
   * When provided, creates gradient or threshold-based coloring.
   */
  gradient?: GradientDefinition;
  /**
   * Whether to animate the line.
   * Overrides the animate value from the chart context.
   */
  animate?: boolean;
}`,signature:{properties:[{key:"seriesId",value:{name:"string",required:!0},description:"The ID of the series to render. Will be used to find the data from the chart context."},{key:"curve",value:{name:"union",raw:`| 'bump'
| 'catmullRom'
| 'linear'
| 'linearClosed'
| 'monotone'
| 'natural'
| 'step'
| 'stepBefore'
| 'stepAfter'`,elements:[{name:"literal",value:"'bump'"},{name:"literal",value:"'catmullRom'"},{name:"literal",value:"'linear'"},{name:"literal",value:"'linearClosed'"},{name:"literal",value:"'monotone'"},{name:"literal",value:"'natural'"},{name:"literal",value:"'step'"},{name:"literal",value:"'stepBefore'"},{name:"literal",value:"'stepAfter'"}],required:!1},description:`The curve interpolation method to use for the line.
@default 'bump'`},{key:"type",value:{name:"union",raw:"'solid' | 'dotted'",elements:[{name:"literal",value:"'solid'"},{name:"literal",value:"'dotted'"}],required:!1},description:`The type of line to render.
@default 'solid'`},{key:"showArea",value:{name:"boolean",required:!1},description:"Whether to show area fill under the line."},{key:"areaType",value:{name:"union",raw:"'gradient' | 'solid' | 'dotted'",elements:[{name:"literal",value:"'gradient'"},{name:"literal",value:"'solid'"},{name:"literal",value:"'dotted'"}],required:!1},description:`The type of area fill to add to the line.
@default 'gradient'`},{key:"areaBaseline",value:{name:"number",required:!1},description:`Baseline value for the area.
When set, overrides the default baseline.`},{key:"LineComponent",value:{name:"LineComponent",required:!1},description:`Component to render the line.
Takes precedence over the type prop if provided.`},{key:"AreaComponent",value:{name:"ReactFC",raw:"React.FC<AreaComponentProps>",elements:[{name:"intersection",raw:`Pick<
  AreaProps,
  'fill' | 'fillOpacity' | 'baseline' | 'gradient' | 'animate' | 'transition'
> & {
  /**
   * Path of the area
   */
  d: SVGProps<SVGPathElement>['d'];
  /**
   * ID of the y-axis to use.
   * If not provided, defaults to the default y-axis.
   */
  yAxisId?: string;
}`,elements:[{name:"Pick",elements:[{name:"intersection",raw:`AreaBaseProps & {
  /**
   * Transition configuration for path animations.
   */
  transition?: Transition;
}`,elements:[{name:"signature",type:"object",raw:`{
  /**
   * The ID of the series to render. Will be used to find the data from the chart context.
   */
  seriesId: string;
  /**
   * The curve interpolation method to use for the line.
   * @default 'bump'
   */
  curve?: ChartPathCurveType;
  /**
   * The type of area to render.
   * @default 'solid'
   */
  type?: 'solid' | 'dotted' | 'gradient';
  /**
   * Component to render the area.
   * Takes precedence over the type prop if provided.
   */
  AreaComponent?: AreaComponent;
  /**
   * When true, the area is connected across null values.
   */
  connectNulls?: boolean;
  /**
   * The color of the area.
   * @default color of the series or 'var(--color-fgPrimary)'
   */
  fill?: string;
  /**
   * Opacity of the area
   * @note when combined with gradient, both will be applied
   * @default 1
   */
  fillOpacity?: number;
  /**
   * Baseline value for the gradient.
   * When set, overrides the default baseline.
   */
  baseline?: number;
  /**
   * Gradient configuration.
   * When provided, creates gradient or threshold-based coloring.
   */
  gradient?: GradientDefinition;
  /**
   * Whether to animate the area.
   * Overrides the animate value from the chart context.
   */
  animate?: boolean;
}`,signature:{properties:[{key:"seriesId",value:{name:"string",required:!0},description:"The ID of the series to render. Will be used to find the data from the chart context."},{key:"curve",value:{name:"union",raw:`| 'bump'
| 'catmullRom'
| 'linear'
| 'linearClosed'
| 'monotone'
| 'natural'
| 'step'
| 'stepBefore'
| 'stepAfter'`,elements:[{name:"literal",value:"'bump'"},{name:"literal",value:"'catmullRom'"},{name:"literal",value:"'linear'"},{name:"literal",value:"'linearClosed'"},{name:"literal",value:"'monotone'"},{name:"literal",value:"'natural'"},{name:"literal",value:"'step'"},{name:"literal",value:"'stepBefore'"},{name:"literal",value:"'stepAfter'"}],required:!1},description:`The curve interpolation method to use for the line.
@default 'bump'`},{key:"type",value:{name:"union",raw:"'solid' | 'dotted' | 'gradient'",elements:[{name:"literal",value:"'solid'"},{name:"literal",value:"'dotted'"},{name:"literal",value:"'gradient'"}],required:!1},description:`The type of area to render.
@default 'solid'`},{key:"AreaComponent",value:{name:"AreaComponent",required:!1},description:`Component to render the area.
Takes precedence over the type prop if provided.`},{key:"connectNulls",value:{name:"boolean",required:!1},description:"When true, the area is connected across null values."},{key:"fill",value:{name:"string",required:!1},description:`The color of the area.
@default color of the series or 'var(--color-fgPrimary)'`},{key:"fillOpacity",value:{name:"number",required:!1},description:`Opacity of the area
@note when combined with gradient, both will be applied
@default 1`},{key:"baseline",value:{name:"number",required:!1},description:`Baseline value for the gradient.
When set, overrides the default baseline.`},{key:"gradient",value:{name:"signature",type:"object",raw:`{
  /**
   * Axis that the gradient maps to.
   * @default 'y'
   */
  axis?: 'x' | 'y';
  /**
   * Gradient stops with colors and positions.
   * Can be an array of stop objects or a function that receives domain bounds.
   */
  stops: GradientStop[] | ((domain: AxisBounds) => GradientStop[]);
}`,signature:{properties:[{key:"axis",value:{name:"union",raw:"'x' | 'y'",elements:[{name:"literal",value:"'x'"},{name:"literal",value:"'y'"}],required:!1},description:`Axis that the gradient maps to.
@default 'y'`},{key:"stops",value:{name:"union",raw:"GradientStop[] | ((domain: AxisBounds) => GradientStop[])",elements:[{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /**
   * Position in data space.
   * Multiple stops at the same offset create hard color transitions.
   */
  offset: number;
  /**  Color at the stop (any valid CSS color) */
  color: string;
  /** Optional opacity (0-1). Defaults to 1. */
  opacity?: number;
}`,signature:{properties:[{key:"offset",value:{name:"number",required:!0},description:`Position in data space.
Multiple stops at the same offset create hard color transitions.`},{key:"color",value:{name:"string",required:!0},description:"Color at the stop (any valid CSS color)"},{key:"opacity",value:{name:"number",required:!1},description:"Optional opacity (0-1). Defaults to 1."}]}}],raw:"GradientStop[]"},{name:"unknown"}],required:!0},description:`Gradient stops with colors and positions.
Can be an array of stop objects or a function that receives domain bounds.`}]},required:!1},description:`Gradient configuration.
When provided, creates gradient or threshold-based coloring.`},{key:"animate",value:{name:"boolean",required:!1},description:`Whether to animate the area.
Overrides the animate value from the chart context.`}]}},{name:"signature",type:"object",raw:`{
  /**
   * Transition configuration for path animations.
   */
  transition?: Transition;
}`,signature:{properties:[{key:"transition",value:{name:"Transition",required:!1},description:"Transition configuration for path animations."}]}}]},{name:"union",raw:"'fill' | 'fillOpacity' | 'baseline' | 'gradient' | 'animate' | 'transition'",elements:[{name:"literal",value:"'fill'"},{name:"literal",value:"'fillOpacity'"},{name:"literal",value:"'baseline'"},{name:"literal",value:"'gradient'"},{name:"literal",value:"'animate'"},{name:"literal",value:"'transition'"}]}],raw:`Pick<
  AreaProps,
  'fill' | 'fillOpacity' | 'baseline' | 'gradient' | 'animate' | 'transition'
>`},{name:"signature",type:"object",raw:`{
  /**
   * Path of the area
   */
  d: SVGProps<SVGPathElement>['d'];
  /**
   * ID of the y-axis to use.
   * If not provided, defaults to the default y-axis.
   */
  yAxisId?: string;
}`,signature:{properties:[{key:"d",value:{name:"SVGProps['d']",raw:"SVGProps<SVGPathElement>['d']",required:!0},description:"Path of the area"},{key:"yAxisId",value:{name:"string",required:!1},description:`ID of the y-axis to use.
If not provided, defaults to the default y-axis.`}]}}]}],required:!1},description:"Custom component to render line area fill."},{key:"opacity",value:{name:"number",required:!1},description:`Opacity of the line's stroke.
Will also be applied to points and area fill.
@default 1`},{key:"points",value:{name:"union",raw:`| boolean
| ((defaults: PointBaseProps) => boolean | null | undefined | Partial<PointProps>)`,elements:[{name:"boolean"},{name:"unknown"}],required:!1},description:"Controls whether and how to render points at each data point in the series.\n- `true`: Show all points with default styling\n- `false` or `undefined`: Hide all points\n- Function: Called for every entry in the data array to customize individual points\n\n@param defaults - The default point props computed by the Line component\n@returns true for default point, false/null/undefined for no point, or Partial<PointProps> to customize"},{key:"connectNulls",value:{name:"boolean",required:!1},description:"When true, the area is connected across null values."},{key:"stroke",value:{name:"string",required:!1},description:`The color of the line.
@default color of the series or 'var(--color-fgPrimary)'`},{key:"strokeOpacity",value:{name:"number",required:!1},description:`Opacity of the line
@note when combined with gradient, both will be applied
@default 1`},{key:"strokeWidth",value:{name:"number",required:!1},description:`Width of the line
@default 2`},{key:"gradient",value:{name:"signature",type:"object",raw:`{
  /**
   * Axis that the gradient maps to.
   * @default 'y'
   */
  axis?: 'x' | 'y';
  /**
   * Gradient stops with colors and positions.
   * Can be an array of stop objects or a function that receives domain bounds.
   */
  stops: GradientStop[] | ((domain: AxisBounds) => GradientStop[]);
}`,signature:{properties:[{key:"axis",value:{name:"union",raw:"'x' | 'y'",elements:[{name:"literal",value:"'x'"},{name:"literal",value:"'y'"}],required:!1},description:`Axis that the gradient maps to.
@default 'y'`},{key:"stops",value:{name:"union",raw:"GradientStop[] | ((domain: AxisBounds) => GradientStop[])",elements:[{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /**
   * Position in data space.
   * Multiple stops at the same offset create hard color transitions.
   */
  offset: number;
  /**  Color at the stop (any valid CSS color) */
  color: string;
  /** Optional opacity (0-1). Defaults to 1. */
  opacity?: number;
}`,signature:{properties:[{key:"offset",value:{name:"number",required:!0},description:`Position in data space.
Multiple stops at the same offset create hard color transitions.`},{key:"color",value:{name:"string",required:!0},description:"Color at the stop (any valid CSS color)"},{key:"opacity",value:{name:"number",required:!1},description:"Optional opacity (0-1). Defaults to 1."}]}}],raw:"GradientStop[]"},{name:"unknown"}],required:!0},description:`Gradient stops with colors and positions.
Can be an array of stop objects or a function that receives domain bounds.`}]},required:!1},description:`Gradient configuration.
When provided, creates gradient or threshold-based coloring.`},{key:"animate",value:{name:"boolean",required:!1},description:`Whether to animate the line.
Overrides the animate value from the chart context.`}]}}]},{name:"signature",type:"object",raw:`{
  /**
   * Transition configuration for line animations.
   */
  transition?: Transition;
  /**
   * Handler for when a point is clicked.
   * Passed through to Point components rendered via points.
   */
  onPointClick?: PointProps['onClick'];
  /**
   * Custom style for the line.
   */
  style?: React.CSSProperties;
  /**
   * Custom className for the line.
   */
  className?: string;
}`,signature:{properties:[{key:"transition",value:{name:"Transition",required:!1},description:"Transition configuration for line animations."},{key:"onPointClick",value:{name:"intersection['onClick']",raw:"PointProps['onClick']",required:!1},description:`Handler for when a point is clicked.
Passed through to Point components rendered via points.`},{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom style for the line."},{key:"className",value:{name:"string",required:!1},description:"Custom className for the line."}]}}]},{name:"union",raw:`| 'stroke'
| 'strokeOpacity'
| 'strokeWidth'
| 'gradient'
| 'animate'
| 'transition'
| 'style'
| 'className'`,elements:[{name:"literal",value:"'stroke'"},{name:"literal",value:"'strokeOpacity'"},{name:"literal",value:"'strokeWidth'"},{name:"literal",value:"'gradient'"},{name:"literal",value:"'animate'"},{name:"literal",value:"'transition'"},{name:"literal",value:"'style'"},{name:"literal",value:"'className'"}]}],raw:`Pick<
  LineProps,
  | 'stroke'
  | 'strokeOpacity'
  | 'strokeWidth'
  | 'gradient'
  | 'animate'
  | 'transition'
  | 'style'
  | 'className'
>`},{name:"Pick",elements:[{name:"intersection",raw:`PathBaseProps &
Omit<
  SVGProps<SVGPathElement>,
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
  | 'onAnimationStartCapture'
  | 'onAnimationEndCapture'
  | 'onAnimationIterationCapture'
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragStart'
  | 'onDragCapture'
  | 'onDragEndCapture'
  | 'onDragStartCapture'
> & {
  /**
   * Offset added to the clip rect boundaries.
   */
  clipOffset?: number;
  /**
   * Custom clip path rect. If provided, this overrides the default chart rect for clipping.
   * Pass null to disable clipping.
   * @default drawingArea of chart + clipOffset
   */
  clipRect?: Rect | null;
  /**
   * Transition configuration for path.
   *
   * @example
   * // Timing based animation
   * transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
   *
   * @example
   * // Spring animation
   * transition={{ type: 'spring', damping: 20, stiffness: 300 }}
   */
  transition?: Transition;
}`,elements:[{name:"intersection",raw:`SharedProps & {
  /**
   * Whether to animate this path. Overrides the animate prop on the Chart component.
   */
  animate?: boolean;
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
   * Whether to animate this path. Overrides the animate prop on the Chart component.
   */
  animate?: boolean;
}`,signature:{properties:[{key:"animate",value:{name:"boolean",required:!1},description:"Whether to animate this path. Overrides the animate prop on the Chart component."}]}}]},{name:"Omit",elements:[{name:"SVGProps",elements:[{name:"SVGPathElement"}],raw:"SVGProps<SVGPathElement>"},{name:"union",raw:`| 'onAnimationStart'
| 'onAnimationEnd'
| 'onAnimationIteration'
| 'onAnimationStartCapture'
| 'onAnimationEndCapture'
| 'onAnimationIterationCapture'
| 'onDrag'
| 'onDragEnd'
| 'onDragStart'
| 'onDragCapture'
| 'onDragEndCapture'
| 'onDragStartCapture'`,elements:[{name:"literal",value:"'onAnimationStart'"},{name:"literal",value:"'onAnimationEnd'"},{name:"literal",value:"'onAnimationIteration'"},{name:"literal",value:"'onAnimationStartCapture'"},{name:"literal",value:"'onAnimationEndCapture'"},{name:"literal",value:"'onAnimationIterationCapture'"},{name:"literal",value:"'onDrag'"},{name:"literal",value:"'onDragEnd'"},{name:"literal",value:"'onDragStart'"},{name:"literal",value:"'onDragCapture'"},{name:"literal",value:"'onDragEndCapture'"},{name:"literal",value:"'onDragStartCapture'"}]}],raw:`Omit<
  SVGProps<SVGPathElement>,
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
  | 'onAnimationStartCapture'
  | 'onAnimationEndCapture'
  | 'onAnimationIterationCapture'
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragStart'
  | 'onDragCapture'
  | 'onDragEndCapture'
  | 'onDragStartCapture'
>`},{name:"signature",type:"object",raw:`{
  /**
   * Offset added to the clip rect boundaries.
   */
  clipOffset?: number;
  /**
   * Custom clip path rect. If provided, this overrides the default chart rect for clipping.
   * Pass null to disable clipping.
   * @default drawingArea of chart + clipOffset
   */
  clipRect?: Rect | null;
  /**
   * Transition configuration for path.
   *
   * @example
   * // Timing based animation
   * transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
   *
   * @example
   * // Spring animation
   * transition={{ type: 'spring', damping: 20, stiffness: 300 }}
   */
  transition?: Transition;
}`,signature:{properties:[{key:"clipOffset",value:{name:"number",required:!1},description:"Offset added to the clip rect boundaries."},{key:"clipRect",value:{name:"union",raw:"Rect | null",elements:[{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
  width: number;
  height: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!1},{name:"null"}],required:!1},description:`Custom clip path rect. If provided, this overrides the default chart rect for clipping.
Pass null to disable clipping.
@default drawingArea of chart + clipOffset`},{key:"transition",value:{name:"Transition",required:!1},description:`Transition configuration for path.

@example
// Timing based animation
transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}

@example
// Spring animation
transition={{ type: 'spring', damping: 20, stiffness: 300 }}`}]}}]},{name:"union",raw:"'clipRect' | 'strokeLinecap'",elements:[{name:"literal",value:"'clipRect'"},{name:"literal",value:"'strokeLinecap'"}]}],raw:"Pick<PathProps, 'clipRect' | 'strokeLinecap'>"},{name:"signature",type:"object",raw:`{
  /**
   * Path of the line.
   */
  d: SVGProps<SVGPathElement>['d'];
  /**
   * ID of the y-axis to use.
   * If not provided, defaults to the default y-axis.
   */
  yAxisId?: string;
}`,signature:{properties:[{key:"d",value:{name:"SVGProps['d']",raw:"SVGProps<SVGPathElement>['d']",required:!0},description:"Path of the line."},{key:"yAxisId",value:{name:"string",required:!1},description:`ID of the y-axis to use.
If not provided, defaults to the default y-axis.`}]}}]}],required:!1},description:`Component to render the axis line.
@default SolidLine`},{key:"TickMarkLineComponent",value:{name:"ReactFC",raw:"React.FC<LineComponentProps>",elements:[{name:"intersection",raw:`Pick<
  LineProps,
  | 'stroke'
  | 'strokeOpacity'
  | 'strokeWidth'
  | 'gradient'
  | 'animate'
  | 'transition'
  | 'style'
  | 'className'
> &
  Pick<PathProps, 'clipRect' | 'strokeLinecap'> & {
    /**
     * Path of the line.
     */
    d: SVGProps<SVGPathElement>['d'];
    /**
     * ID of the y-axis to use.
     * If not provided, defaults to the default y-axis.
     */
    yAxisId?: string;
  }`,elements:[{name:"Pick",elements:[{name:"intersection",raw:`LineBaseProps & {
  /**
   * Transition configuration for line animations.
   */
  transition?: Transition;
  /**
   * Handler for when a point is clicked.
   * Passed through to Point components rendered via points.
   */
  onPointClick?: PointProps['onClick'];
  /**
   * Custom style for the line.
   */
  style?: React.CSSProperties;
  /**
   * Custom className for the line.
   */
  className?: string;
}`,elements:[{name:"intersection",raw:`SharedProps & {
  /**
   * The ID of the series to render. Will be used to find the data from the chart context.
   */
  seriesId: string;
  /**
   * The curve interpolation method to use for the line.
   * @default 'bump'
   */
  curve?: ChartPathCurveType;
  /**
   * The type of line to render.
   * @default 'solid'
   */
  type?: 'solid' | 'dotted';
  /**
   * Whether to show area fill under the line.
   */
  showArea?: boolean;
  /**
   * The type of area fill to add to the line.
   * @default 'gradient'
   */
  areaType?: 'gradient' | 'solid' | 'dotted';
  /**
   * Baseline value for the area.
   * When set, overrides the default baseline.
   */
  areaBaseline?: number;
  /**
   * Component to render the line.
   * Takes precedence over the type prop if provided.
   */
  LineComponent?: LineComponent;
  /**
   * Custom component to render line area fill.
   */
  AreaComponent?: AreaComponent;
  /**
   * Opacity of the line's stroke.
   * Will also be applied to points and area fill.
   * @default 1
   */
  opacity?: number;
  /**
   * Controls whether and how to render points at each data point in the series.
   * - \`true\`: Show all points with default styling
   * - \`false\` or \`undefined\`: Hide all points
   * - Function: Called for every entry in the data array to customize individual points
   *
   * @param defaults - The default point props computed by the Line component
   * @returns true for default point, false/null/undefined for no point, or Partial<PointProps> to customize
   */
  points?:
    | boolean
    | ((defaults: PointBaseProps) => boolean | null | undefined | Partial<PointProps>);
  /**
   * When true, the area is connected across null values.
   */
  connectNulls?: boolean;
  /**
   * The color of the line.
   * @default color of the series or 'var(--color-fgPrimary)'
   */
  stroke?: string;
  /**
   * Opacity of the line
   * @note when combined with gradient, both will be applied
   * @default 1
   */
  strokeOpacity?: number;
  /**
   * Width of the line
   * @default 2
   */
  strokeWidth?: number;
  /**
   * Gradient configuration.
   * When provided, creates gradient or threshold-based coloring.
   */
  gradient?: GradientDefinition;
  /**
   * Whether to animate the line.
   * Overrides the animate value from the chart context.
   */
  animate?: boolean;
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
   * The ID of the series to render. Will be used to find the data from the chart context.
   */
  seriesId: string;
  /**
   * The curve interpolation method to use for the line.
   * @default 'bump'
   */
  curve?: ChartPathCurveType;
  /**
   * The type of line to render.
   * @default 'solid'
   */
  type?: 'solid' | 'dotted';
  /**
   * Whether to show area fill under the line.
   */
  showArea?: boolean;
  /**
   * The type of area fill to add to the line.
   * @default 'gradient'
   */
  areaType?: 'gradient' | 'solid' | 'dotted';
  /**
   * Baseline value for the area.
   * When set, overrides the default baseline.
   */
  areaBaseline?: number;
  /**
   * Component to render the line.
   * Takes precedence over the type prop if provided.
   */
  LineComponent?: LineComponent;
  /**
   * Custom component to render line area fill.
   */
  AreaComponent?: AreaComponent;
  /**
   * Opacity of the line's stroke.
   * Will also be applied to points and area fill.
   * @default 1
   */
  opacity?: number;
  /**
   * Controls whether and how to render points at each data point in the series.
   * - \`true\`: Show all points with default styling
   * - \`false\` or \`undefined\`: Hide all points
   * - Function: Called for every entry in the data array to customize individual points
   *
   * @param defaults - The default point props computed by the Line component
   * @returns true for default point, false/null/undefined for no point, or Partial<PointProps> to customize
   */
  points?:
    | boolean
    | ((defaults: PointBaseProps) => boolean | null | undefined | Partial<PointProps>);
  /**
   * When true, the area is connected across null values.
   */
  connectNulls?: boolean;
  /**
   * The color of the line.
   * @default color of the series or 'var(--color-fgPrimary)'
   */
  stroke?: string;
  /**
   * Opacity of the line
   * @note when combined with gradient, both will be applied
   * @default 1
   */
  strokeOpacity?: number;
  /**
   * Width of the line
   * @default 2
   */
  strokeWidth?: number;
  /**
   * Gradient configuration.
   * When provided, creates gradient or threshold-based coloring.
   */
  gradient?: GradientDefinition;
  /**
   * Whether to animate the line.
   * Overrides the animate value from the chart context.
   */
  animate?: boolean;
}`,signature:{properties:[{key:"seriesId",value:{name:"string",required:!0},description:"The ID of the series to render. Will be used to find the data from the chart context."},{key:"curve",value:{name:"union",raw:`| 'bump'
| 'catmullRom'
| 'linear'
| 'linearClosed'
| 'monotone'
| 'natural'
| 'step'
| 'stepBefore'
| 'stepAfter'`,elements:[{name:"literal",value:"'bump'"},{name:"literal",value:"'catmullRom'"},{name:"literal",value:"'linear'"},{name:"literal",value:"'linearClosed'"},{name:"literal",value:"'monotone'"},{name:"literal",value:"'natural'"},{name:"literal",value:"'step'"},{name:"literal",value:"'stepBefore'"},{name:"literal",value:"'stepAfter'"}],required:!1},description:`The curve interpolation method to use for the line.
@default 'bump'`},{key:"type",value:{name:"union",raw:"'solid' | 'dotted'",elements:[{name:"literal",value:"'solid'"},{name:"literal",value:"'dotted'"}],required:!1},description:`The type of line to render.
@default 'solid'`},{key:"showArea",value:{name:"boolean",required:!1},description:"Whether to show area fill under the line."},{key:"areaType",value:{name:"union",raw:"'gradient' | 'solid' | 'dotted'",elements:[{name:"literal",value:"'gradient'"},{name:"literal",value:"'solid'"},{name:"literal",value:"'dotted'"}],required:!1},description:`The type of area fill to add to the line.
@default 'gradient'`},{key:"areaBaseline",value:{name:"number",required:!1},description:`Baseline value for the area.
When set, overrides the default baseline.`},{key:"LineComponent",value:{name:"LineComponent",required:!1},description:`Component to render the line.
Takes precedence over the type prop if provided.`},{key:"AreaComponent",value:{name:"ReactFC",raw:"React.FC<AreaComponentProps>",elements:[{name:"intersection",raw:`Pick<
  AreaProps,
  'fill' | 'fillOpacity' | 'baseline' | 'gradient' | 'animate' | 'transition'
> & {
  /**
   * Path of the area
   */
  d: SVGProps<SVGPathElement>['d'];
  /**
   * ID of the y-axis to use.
   * If not provided, defaults to the default y-axis.
   */
  yAxisId?: string;
}`,elements:[{name:"Pick",elements:[{name:"intersection",raw:`AreaBaseProps & {
  /**
   * Transition configuration for path animations.
   */
  transition?: Transition;
}`,elements:[{name:"signature",type:"object",raw:`{
  /**
   * The ID of the series to render. Will be used to find the data from the chart context.
   */
  seriesId: string;
  /**
   * The curve interpolation method to use for the line.
   * @default 'bump'
   */
  curve?: ChartPathCurveType;
  /**
   * The type of area to render.
   * @default 'solid'
   */
  type?: 'solid' | 'dotted' | 'gradient';
  /**
   * Component to render the area.
   * Takes precedence over the type prop if provided.
   */
  AreaComponent?: AreaComponent;
  /**
   * When true, the area is connected across null values.
   */
  connectNulls?: boolean;
  /**
   * The color of the area.
   * @default color of the series or 'var(--color-fgPrimary)'
   */
  fill?: string;
  /**
   * Opacity of the area
   * @note when combined with gradient, both will be applied
   * @default 1
   */
  fillOpacity?: number;
  /**
   * Baseline value for the gradient.
   * When set, overrides the default baseline.
   */
  baseline?: number;
  /**
   * Gradient configuration.
   * When provided, creates gradient or threshold-based coloring.
   */
  gradient?: GradientDefinition;
  /**
   * Whether to animate the area.
   * Overrides the animate value from the chart context.
   */
  animate?: boolean;
}`,signature:{properties:[{key:"seriesId",value:{name:"string",required:!0},description:"The ID of the series to render. Will be used to find the data from the chart context."},{key:"curve",value:{name:"union",raw:`| 'bump'
| 'catmullRom'
| 'linear'
| 'linearClosed'
| 'monotone'
| 'natural'
| 'step'
| 'stepBefore'
| 'stepAfter'`,elements:[{name:"literal",value:"'bump'"},{name:"literal",value:"'catmullRom'"},{name:"literal",value:"'linear'"},{name:"literal",value:"'linearClosed'"},{name:"literal",value:"'monotone'"},{name:"literal",value:"'natural'"},{name:"literal",value:"'step'"},{name:"literal",value:"'stepBefore'"},{name:"literal",value:"'stepAfter'"}],required:!1},description:`The curve interpolation method to use for the line.
@default 'bump'`},{key:"type",value:{name:"union",raw:"'solid' | 'dotted' | 'gradient'",elements:[{name:"literal",value:"'solid'"},{name:"literal",value:"'dotted'"},{name:"literal",value:"'gradient'"}],required:!1},description:`The type of area to render.
@default 'solid'`},{key:"AreaComponent",value:{name:"AreaComponent",required:!1},description:`Component to render the area.
Takes precedence over the type prop if provided.`},{key:"connectNulls",value:{name:"boolean",required:!1},description:"When true, the area is connected across null values."},{key:"fill",value:{name:"string",required:!1},description:`The color of the area.
@default color of the series or 'var(--color-fgPrimary)'`},{key:"fillOpacity",value:{name:"number",required:!1},description:`Opacity of the area
@note when combined with gradient, both will be applied
@default 1`},{key:"baseline",value:{name:"number",required:!1},description:`Baseline value for the gradient.
When set, overrides the default baseline.`},{key:"gradient",value:{name:"signature",type:"object",raw:`{
  /**
   * Axis that the gradient maps to.
   * @default 'y'
   */
  axis?: 'x' | 'y';
  /**
   * Gradient stops with colors and positions.
   * Can be an array of stop objects or a function that receives domain bounds.
   */
  stops: GradientStop[] | ((domain: AxisBounds) => GradientStop[]);
}`,signature:{properties:[{key:"axis",value:{name:"union",raw:"'x' | 'y'",elements:[{name:"literal",value:"'x'"},{name:"literal",value:"'y'"}],required:!1},description:`Axis that the gradient maps to.
@default 'y'`},{key:"stops",value:{name:"union",raw:"GradientStop[] | ((domain: AxisBounds) => GradientStop[])",elements:[{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /**
   * Position in data space.
   * Multiple stops at the same offset create hard color transitions.
   */
  offset: number;
  /**  Color at the stop (any valid CSS color) */
  color: string;
  /** Optional opacity (0-1). Defaults to 1. */
  opacity?: number;
}`,signature:{properties:[{key:"offset",value:{name:"number",required:!0},description:`Position in data space.
Multiple stops at the same offset create hard color transitions.`},{key:"color",value:{name:"string",required:!0},description:"Color at the stop (any valid CSS color)"},{key:"opacity",value:{name:"number",required:!1},description:"Optional opacity (0-1). Defaults to 1."}]}}],raw:"GradientStop[]"},{name:"unknown"}],required:!0},description:`Gradient stops with colors and positions.
Can be an array of stop objects or a function that receives domain bounds.`}]},required:!1},description:`Gradient configuration.
When provided, creates gradient or threshold-based coloring.`},{key:"animate",value:{name:"boolean",required:!1},description:`Whether to animate the area.
Overrides the animate value from the chart context.`}]}},{name:"signature",type:"object",raw:`{
  /**
   * Transition configuration for path animations.
   */
  transition?: Transition;
}`,signature:{properties:[{key:"transition",value:{name:"Transition",required:!1},description:"Transition configuration for path animations."}]}}]},{name:"union",raw:"'fill' | 'fillOpacity' | 'baseline' | 'gradient' | 'animate' | 'transition'",elements:[{name:"literal",value:"'fill'"},{name:"literal",value:"'fillOpacity'"},{name:"literal",value:"'baseline'"},{name:"literal",value:"'gradient'"},{name:"literal",value:"'animate'"},{name:"literal",value:"'transition'"}]}],raw:`Pick<
  AreaProps,
  'fill' | 'fillOpacity' | 'baseline' | 'gradient' | 'animate' | 'transition'
>`},{name:"signature",type:"object",raw:`{
  /**
   * Path of the area
   */
  d: SVGProps<SVGPathElement>['d'];
  /**
   * ID of the y-axis to use.
   * If not provided, defaults to the default y-axis.
   */
  yAxisId?: string;
}`,signature:{properties:[{key:"d",value:{name:"SVGProps['d']",raw:"SVGProps<SVGPathElement>['d']",required:!0},description:"Path of the area"},{key:"yAxisId",value:{name:"string",required:!1},description:`ID of the y-axis to use.
If not provided, defaults to the default y-axis.`}]}}]}],required:!1},description:"Custom component to render line area fill."},{key:"opacity",value:{name:"number",required:!1},description:`Opacity of the line's stroke.
Will also be applied to points and area fill.
@default 1`},{key:"points",value:{name:"union",raw:`| boolean
| ((defaults: PointBaseProps) => boolean | null | undefined | Partial<PointProps>)`,elements:[{name:"boolean"},{name:"unknown"}],required:!1},description:"Controls whether and how to render points at each data point in the series.\n- `true`: Show all points with default styling\n- `false` or `undefined`: Hide all points\n- Function: Called for every entry in the data array to customize individual points\n\n@param defaults - The default point props computed by the Line component\n@returns true for default point, false/null/undefined for no point, or Partial<PointProps> to customize"},{key:"connectNulls",value:{name:"boolean",required:!1},description:"When true, the area is connected across null values."},{key:"stroke",value:{name:"string",required:!1},description:`The color of the line.
@default color of the series or 'var(--color-fgPrimary)'`},{key:"strokeOpacity",value:{name:"number",required:!1},description:`Opacity of the line
@note when combined with gradient, both will be applied
@default 1`},{key:"strokeWidth",value:{name:"number",required:!1},description:`Width of the line
@default 2`},{key:"gradient",value:{name:"signature",type:"object",raw:`{
  /**
   * Axis that the gradient maps to.
   * @default 'y'
   */
  axis?: 'x' | 'y';
  /**
   * Gradient stops with colors and positions.
   * Can be an array of stop objects or a function that receives domain bounds.
   */
  stops: GradientStop[] | ((domain: AxisBounds) => GradientStop[]);
}`,signature:{properties:[{key:"axis",value:{name:"union",raw:"'x' | 'y'",elements:[{name:"literal",value:"'x'"},{name:"literal",value:"'y'"}],required:!1},description:`Axis that the gradient maps to.
@default 'y'`},{key:"stops",value:{name:"union",raw:"GradientStop[] | ((domain: AxisBounds) => GradientStop[])",elements:[{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /**
   * Position in data space.
   * Multiple stops at the same offset create hard color transitions.
   */
  offset: number;
  /**  Color at the stop (any valid CSS color) */
  color: string;
  /** Optional opacity (0-1). Defaults to 1. */
  opacity?: number;
}`,signature:{properties:[{key:"offset",value:{name:"number",required:!0},description:`Position in data space.
Multiple stops at the same offset create hard color transitions.`},{key:"color",value:{name:"string",required:!0},description:"Color at the stop (any valid CSS color)"},{key:"opacity",value:{name:"number",required:!1},description:"Optional opacity (0-1). Defaults to 1."}]}}],raw:"GradientStop[]"},{name:"unknown"}],required:!0},description:`Gradient stops with colors and positions.
Can be an array of stop objects or a function that receives domain bounds.`}]},required:!1},description:`Gradient configuration.
When provided, creates gradient or threshold-based coloring.`},{key:"animate",value:{name:"boolean",required:!1},description:`Whether to animate the line.
Overrides the animate value from the chart context.`}]}}]},{name:"signature",type:"object",raw:`{
  /**
   * Transition configuration for line animations.
   */
  transition?: Transition;
  /**
   * Handler for when a point is clicked.
   * Passed through to Point components rendered via points.
   */
  onPointClick?: PointProps['onClick'];
  /**
   * Custom style for the line.
   */
  style?: React.CSSProperties;
  /**
   * Custom className for the line.
   */
  className?: string;
}`,signature:{properties:[{key:"transition",value:{name:"Transition",required:!1},description:"Transition configuration for line animations."},{key:"onPointClick",value:{name:"intersection['onClick']",raw:"PointProps['onClick']",required:!1},description:`Handler for when a point is clicked.
Passed through to Point components rendered via points.`},{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom style for the line."},{key:"className",value:{name:"string",required:!1},description:"Custom className for the line."}]}}]},{name:"union",raw:`| 'stroke'
| 'strokeOpacity'
| 'strokeWidth'
| 'gradient'
| 'animate'
| 'transition'
| 'style'
| 'className'`,elements:[{name:"literal",value:"'stroke'"},{name:"literal",value:"'strokeOpacity'"},{name:"literal",value:"'strokeWidth'"},{name:"literal",value:"'gradient'"},{name:"literal",value:"'animate'"},{name:"literal",value:"'transition'"},{name:"literal",value:"'style'"},{name:"literal",value:"'className'"}]}],raw:`Pick<
  LineProps,
  | 'stroke'
  | 'strokeOpacity'
  | 'strokeWidth'
  | 'gradient'
  | 'animate'
  | 'transition'
  | 'style'
  | 'className'
>`},{name:"Pick",elements:[{name:"intersection",raw:`PathBaseProps &
Omit<
  SVGProps<SVGPathElement>,
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
  | 'onAnimationStartCapture'
  | 'onAnimationEndCapture'
  | 'onAnimationIterationCapture'
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragStart'
  | 'onDragCapture'
  | 'onDragEndCapture'
  | 'onDragStartCapture'
> & {
  /**
   * Offset added to the clip rect boundaries.
   */
  clipOffset?: number;
  /**
   * Custom clip path rect. If provided, this overrides the default chart rect for clipping.
   * Pass null to disable clipping.
   * @default drawingArea of chart + clipOffset
   */
  clipRect?: Rect | null;
  /**
   * Transition configuration for path.
   *
   * @example
   * // Timing based animation
   * transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
   *
   * @example
   * // Spring animation
   * transition={{ type: 'spring', damping: 20, stiffness: 300 }}
   */
  transition?: Transition;
}`,elements:[{name:"intersection",raw:`SharedProps & {
  /**
   * Whether to animate this path. Overrides the animate prop on the Chart component.
   */
  animate?: boolean;
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
   * Whether to animate this path. Overrides the animate prop on the Chart component.
   */
  animate?: boolean;
}`,signature:{properties:[{key:"animate",value:{name:"boolean",required:!1},description:"Whether to animate this path. Overrides the animate prop on the Chart component."}]}}]},{name:"Omit",elements:[{name:"SVGProps",elements:[{name:"SVGPathElement"}],raw:"SVGProps<SVGPathElement>"},{name:"union",raw:`| 'onAnimationStart'
| 'onAnimationEnd'
| 'onAnimationIteration'
| 'onAnimationStartCapture'
| 'onAnimationEndCapture'
| 'onAnimationIterationCapture'
| 'onDrag'
| 'onDragEnd'
| 'onDragStart'
| 'onDragCapture'
| 'onDragEndCapture'
| 'onDragStartCapture'`,elements:[{name:"literal",value:"'onAnimationStart'"},{name:"literal",value:"'onAnimationEnd'"},{name:"literal",value:"'onAnimationIteration'"},{name:"literal",value:"'onAnimationStartCapture'"},{name:"literal",value:"'onAnimationEndCapture'"},{name:"literal",value:"'onAnimationIterationCapture'"},{name:"literal",value:"'onDrag'"},{name:"literal",value:"'onDragEnd'"},{name:"literal",value:"'onDragStart'"},{name:"literal",value:"'onDragCapture'"},{name:"literal",value:"'onDragEndCapture'"},{name:"literal",value:"'onDragStartCapture'"}]}],raw:`Omit<
  SVGProps<SVGPathElement>,
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
  | 'onAnimationStartCapture'
  | 'onAnimationEndCapture'
  | 'onAnimationIterationCapture'
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragStart'
  | 'onDragCapture'
  | 'onDragEndCapture'
  | 'onDragStartCapture'
>`},{name:"signature",type:"object",raw:`{
  /**
   * Offset added to the clip rect boundaries.
   */
  clipOffset?: number;
  /**
   * Custom clip path rect. If provided, this overrides the default chart rect for clipping.
   * Pass null to disable clipping.
   * @default drawingArea of chart + clipOffset
   */
  clipRect?: Rect | null;
  /**
   * Transition configuration for path.
   *
   * @example
   * // Timing based animation
   * transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
   *
   * @example
   * // Spring animation
   * transition={{ type: 'spring', damping: 20, stiffness: 300 }}
   */
  transition?: Transition;
}`,signature:{properties:[{key:"clipOffset",value:{name:"number",required:!1},description:"Offset added to the clip rect boundaries."},{key:"clipRect",value:{name:"union",raw:"Rect | null",elements:[{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
  width: number;
  height: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!1},{name:"null"}],required:!1},description:`Custom clip path rect. If provided, this overrides the default chart rect for clipping.
Pass null to disable clipping.
@default drawingArea of chart + clipOffset`},{key:"transition",value:{name:"Transition",required:!1},description:`Transition configuration for path.

@example
// Timing based animation
transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}

@example
// Spring animation
transition={{ type: 'spring', damping: 20, stiffness: 300 }}`}]}}]},{name:"union",raw:"'clipRect' | 'strokeLinecap'",elements:[{name:"literal",value:"'clipRect'"},{name:"literal",value:"'strokeLinecap'"}]}],raw:"Pick<PathProps, 'clipRect' | 'strokeLinecap'>"},{name:"signature",type:"object",raw:`{
  /**
   * Path of the line.
   */
  d: SVGProps<SVGPathElement>['d'];
  /**
   * ID of the y-axis to use.
   * If not provided, defaults to the default y-axis.
   */
  yAxisId?: string;
}`,signature:{properties:[{key:"d",value:{name:"SVGProps['d']",raw:"SVGProps<SVGPathElement>['d']",required:!0},description:"Path of the line."},{key:"yAxisId",value:{name:"string",required:!1},description:`ID of the y-axis to use.
If not provided, defaults to the default y-axis.`}]}}]}],required:!1},description:`Component to render the tick marks.
@default SolidLine`},{key:"tickLabelFormatter",value:{name:"signature",type:"function",raw:"(value: number) => ChartTextChildren",signature:{arguments:[{type:{name:"number"},name:"value"}],return:{name:"union",raw:`| string
| number
| null
| undefined
| ValidChartTextChildElements
| ValidChartTextChildElements[]`,elements:[{name:"string"},{name:"number"},{name:"null"},{name:"undefined"},{name:"union",raw:`| React.ReactElement<React.SVGProps<SVGTSpanElement>, 'tspan'>
| React.ReactElement<React.SVGProps<SVGTextPathElement>, 'textPath'>`,elements:[{name:"ReactReactElement",raw:"React.ReactElement<React.SVGProps<SVGTSpanElement>, 'tspan'>",elements:[{name:"ReactSVGProps",raw:"React.SVGProps<SVGTSpanElement>",elements:[{name:"SVGTSpanElement"}]},{name:"literal",value:"'tspan'"}]},{name:"ReactReactElement",raw:"React.ReactElement<React.SVGProps<SVGTextPathElement>, 'textPath'>",elements:[{name:"ReactSVGProps",raw:"React.SVGProps<SVGTextPathElement>",elements:[{name:"SVGTextPathElement"}]},{name:"literal",value:"'textPath'"}]}]},{name:"Array",elements:[{name:"union",raw:`| React.ReactElement<React.SVGProps<SVGTSpanElement>, 'tspan'>
| React.ReactElement<React.SVGProps<SVGTextPathElement>, 'textPath'>`,elements:[{name:"ReactReactElement",raw:"React.ReactElement<React.SVGProps<SVGTSpanElement>, 'tspan'>",elements:[{name:"ReactSVGProps",raw:"React.SVGProps<SVGTSpanElement>",elements:[{name:"SVGTSpanElement"}]},{name:"literal",value:"'tspan'"}]},{name:"ReactReactElement",raw:"React.ReactElement<React.SVGProps<SVGTextPathElement>, 'textPath'>",elements:[{name:"ReactSVGProps",raw:"React.SVGProps<SVGTextPathElement>",elements:[{name:"SVGTextPathElement"}]},{name:"literal",value:"'textPath'"}]}]}],raw:"ValidChartTextChildElements[]"}],required:!1}},required:!1},description:`Formatter function for axis tick values.
Tick values will be wrapped in ChartText component.

@example
// XAxis
tickLabelFormatter: (index) => {
  if (index % 12 === 0) {
    return <tspan style={{ fontWeight: 'bold' }}>\${prices[index]}</tspan>;
  }
  return \`$\${prices[index]}\`;
}

@example
// YAxis
tickLabelFormatter: (value) => \`$\${prices[value]}\``},{key:"TickLabelComponent",value:{name:"ReactFC",raw:"React.FC<AxisTickLabelComponentProps>",elements:[{name:"Pick",elements:[{name:"intersection",raw:`ChartTextBaseProps &
Pick<BoxProps<'g'>, 'font' | 'fontFamily' | 'fontSize' | 'fontWeight' | 'opacity'> & {
  /**
   * The desired x offset in SVG pixels.
   */
  dx?: number;
  /**
   * The desired y offset in SVG pixels.
   */
  dy?: number;
  /**
   * The text content to display.
   */
  children: ChartTextChildren;
  /**
   * The desired x position in SVG pixels.
   * @note Text will be automatically positioned to fit within bounds unless \`disableRepositioning\` is true.
   */
  x: number;
  /**
   * The desired y position in SVG pixels.
   * @note Text will be automatically positioned to fit within bounds unless \`disableRepositioning\` is true.
   */
  y: number;
  /**
   * Horizontal alignment of the component.
   * @default 'center'
   */
  horizontalAlignment?: TextHorizontalAlignment;
  /**
   * Vertical alignment of the component.
   * @default 'middle'
   */
  verticalAlignment?: TextVerticalAlignment;
  style?: React.CSSProperties;
  styles?: {
    root?: React.CSSProperties;
    text?: React.CSSProperties;
    backgroundRect?: React.CSSProperties;
  };
  className?: string;
  classNames?: {
    root?: string;
    text?: string;
    backgroundRect?: string;
  };
}`,elements:[{name:"intersection",raw:`SharedProps & {
  /**
   * The text color.
   * @default 'var(--color-fgMuted)'
   */
  color?: string;
  /**
   * The background color of the text's background rectangle.
   * @default 'var(--color-bg)' if elevated, otherwise 'transparent'
   */
  background?: string;
  /**
   * Whether the text should have an elevated appearance with a shadow.
   * @default false
   */
  elevated?: boolean;
  /**
   * When true, disables automatic repositioning to fit within bounds.
   */
  disableRepositioning?: boolean;
  /**
   * Optional bounds rectangle to constrain the text within. If provided, text will be positioned
   * to stay within these bounds. Defaults to the full chart bounds when not provided.
   */
  bounds?: Rect;
  /**
   * Callback fired when text dimensions change.
   * Used for collision detection and smart positioning.
   * Returns the adjusted position and dimensions.
   */
  onDimensionsChange?: (rect: Rect) => void;
  /**
   * Inset around the text content for the background rect.
   * Only affects the background, text position remains unchanged.
   */
  inset?: number | ChartInset;
  /**
   * Border radius for the background rectangle.
   * @default 4
   */
  borderRadius?: number;
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
   * The text color.
   * @default 'var(--color-fgMuted)'
   */
  color?: string;
  /**
   * The background color of the text's background rectangle.
   * @default 'var(--color-bg)' if elevated, otherwise 'transparent'
   */
  background?: string;
  /**
   * Whether the text should have an elevated appearance with a shadow.
   * @default false
   */
  elevated?: boolean;
  /**
   * When true, disables automatic repositioning to fit within bounds.
   */
  disableRepositioning?: boolean;
  /**
   * Optional bounds rectangle to constrain the text within. If provided, text will be positioned
   * to stay within these bounds. Defaults to the full chart bounds when not provided.
   */
  bounds?: Rect;
  /**
   * Callback fired when text dimensions change.
   * Used for collision detection and smart positioning.
   * Returns the adjusted position and dimensions.
   */
  onDimensionsChange?: (rect: Rect) => void;
  /**
   * Inset around the text content for the background rect.
   * Only affects the background, text position remains unchanged.
   */
  inset?: number | ChartInset;
  /**
   * Border radius for the background rectangle.
   * @default 4
   */
  borderRadius?: number;
}`,signature:{properties:[{key:"color",value:{name:"string",required:!1},description:`The text color.
@default 'var(--color-fgMuted)'`},{key:"background",value:{name:"string",required:!1},description:`The background color of the text's background rectangle.
@default 'var(--color-bg)' if elevated, otherwise 'transparent'`},{key:"elevated",value:{name:"boolean",required:!1},description:`Whether the text should have an elevated appearance with a shadow.
@default false`},{key:"disableRepositioning",value:{name:"boolean",required:!1},description:"When true, disables automatic repositioning to fit within bounds."},{key:"bounds",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
  width: number;
  height: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!1},description:`Optional bounds rectangle to constrain the text within. If provided, text will be positioned
to stay within these bounds. Defaults to the full chart bounds when not provided.`},{key:"onDimensionsChange",value:{name:"signature",type:"function",raw:"(rect: Rect) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
  width: number;
  height: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!1},name:"rect"}],return:{name:"void"}},required:!1},description:`Callback fired when text dimensions change.
Used for collision detection and smart positioning.
Returns the adjusted position and dimensions.`},{key:"inset",value:{name:"union",raw:"number | ChartInset",elements:[{name:"number"},{name:"signature",type:"object",raw:`{
  top: number;
  left: number;
  bottom: number;
  right: number;
}`,signature:{properties:[{key:"top",value:{name:"number",required:!0}},{key:"left",value:{name:"number",required:!0}},{key:"bottom",value:{name:"number",required:!0}},{key:"right",value:{name:"number",required:!0}}]}}],required:!1},description:`Inset around the text content for the background rect.
Only affects the background, text position remains unchanged.`},{key:"borderRadius",value:{name:"number",required:!1},description:`Border radius for the background rectangle.
@default 4`}]}}]},{name:"Pick",elements:[{name:"Polymorphic.Props",elements:[{name:"literal",value:"'g'"},{name:"intersection",raw:`StyleProps &
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
>`},{name:"union",raw:"'font' | 'fontFamily' | 'fontSize' | 'fontWeight' | 'opacity'",elements:[{name:"literal",value:"'font'"},{name:"literal",value:"'fontFamily'"},{name:"literal",value:"'fontSize'"},{name:"literal",value:"'fontWeight'"},{name:"literal",value:"'opacity'"}]}],raw:"Pick<BoxProps<'g'>, 'font' | 'fontFamily' | 'fontSize' | 'fontWeight' | 'opacity'>"},{name:"signature",type:"object",raw:`{
  /**
   * The desired x offset in SVG pixels.
   */
  dx?: number;
  /**
   * The desired y offset in SVG pixels.
   */
  dy?: number;
  /**
   * The text content to display.
   */
  children: ChartTextChildren;
  /**
   * The desired x position in SVG pixels.
   * @note Text will be automatically positioned to fit within bounds unless \`disableRepositioning\` is true.
   */
  x: number;
  /**
   * The desired y position in SVG pixels.
   * @note Text will be automatically positioned to fit within bounds unless \`disableRepositioning\` is true.
   */
  y: number;
  /**
   * Horizontal alignment of the component.
   * @default 'center'
   */
  horizontalAlignment?: TextHorizontalAlignment;
  /**
   * Vertical alignment of the component.
   * @default 'middle'
   */
  verticalAlignment?: TextVerticalAlignment;
  style?: React.CSSProperties;
  styles?: {
    root?: React.CSSProperties;
    text?: React.CSSProperties;
    backgroundRect?: React.CSSProperties;
  };
  className?: string;
  classNames?: {
    root?: string;
    text?: string;
    backgroundRect?: string;
  };
}`,signature:{properties:[{key:"dx",value:{name:"number",required:!1},description:"The desired x offset in SVG pixels."},{key:"dy",value:{name:"number",required:!1},description:"The desired y offset in SVG pixels."},{key:"children",value:{name:"union",raw:`| string
| number
| null
| undefined
| ValidChartTextChildElements
| ValidChartTextChildElements[]`,elements:[{name:"string"},{name:"number"},{name:"null"},{name:"undefined"},{name:"union",raw:`| React.ReactElement<React.SVGProps<SVGTSpanElement>, 'tspan'>
| React.ReactElement<React.SVGProps<SVGTextPathElement>, 'textPath'>`,elements:[{name:"ReactReactElement",raw:"React.ReactElement<React.SVGProps<SVGTSpanElement>, 'tspan'>",elements:[{name:"ReactSVGProps",raw:"React.SVGProps<SVGTSpanElement>",elements:[{name:"SVGTSpanElement"}]},{name:"literal",value:"'tspan'"}]},{name:"ReactReactElement",raw:"React.ReactElement<React.SVGProps<SVGTextPathElement>, 'textPath'>",elements:[{name:"ReactSVGProps",raw:"React.SVGProps<SVGTextPathElement>",elements:[{name:"SVGTextPathElement"}]},{name:"literal",value:"'textPath'"}]}]},{name:"Array",elements:[{name:"union",raw:`| React.ReactElement<React.SVGProps<SVGTSpanElement>, 'tspan'>
| React.ReactElement<React.SVGProps<SVGTextPathElement>, 'textPath'>`,elements:[{name:"ReactReactElement",raw:"React.ReactElement<React.SVGProps<SVGTSpanElement>, 'tspan'>",elements:[{name:"ReactSVGProps",raw:"React.SVGProps<SVGTSpanElement>",elements:[{name:"SVGTSpanElement"}]},{name:"literal",value:"'tspan'"}]},{name:"ReactReactElement",raw:"React.ReactElement<React.SVGProps<SVGTextPathElement>, 'textPath'>",elements:[{name:"ReactSVGProps",raw:"React.SVGProps<SVGTextPathElement>",elements:[{name:"SVGTextPathElement"}]},{name:"literal",value:"'textPath'"}]}]}],raw:"ValidChartTextChildElements[]"}],required:!1},description:"The text content to display."},{key:"x",value:{name:"number",required:!0},description:"The desired x position in SVG pixels.\n@note Text will be automatically positioned to fit within bounds unless `disableRepositioning` is true."},{key:"y",value:{name:"number",required:!0},description:"The desired y position in SVG pixels.\n@note Text will be automatically positioned to fit within bounds unless `disableRepositioning` is true."},{key:"horizontalAlignment",value:{name:"union",raw:"'left' | 'center' | 'right'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'center'"},{name:"literal",value:"'right'"}],required:!1},description:`Horizontal alignment of the component.
@default 'center'`},{key:"verticalAlignment",value:{name:"union",raw:"'top' | 'middle' | 'bottom'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'middle'"},{name:"literal",value:"'bottom'"}],required:!1},description:`Vertical alignment of the component.
@default 'middle'`},{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"styles",value:{name:"signature",type:"object",raw:`{
  root?: React.CSSProperties;
  text?: React.CSSProperties;
  backgroundRect?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"text",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"backgroundRect",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}}]},required:!1}},{key:"className",value:{name:"string",required:!1}},{key:"classNames",value:{name:"signature",type:"object",raw:`{
  root?: string;
  text?: string;
  backgroundRect?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1}},{key:"text",value:{name:"string",required:!1}},{key:"backgroundRect",value:{name:"string",required:!1}}]},required:!1}}]}}]},{name:"union",raw:`| 'x'
| 'y'
| 'children'
| 'testID'
| 'dx'
| 'dy'
| 'font'
| 'fontFamily'
| 'fontSize'
| 'fontWeight'
| 'color'
| 'elevated'
| 'inset'
| 'background'
| 'borderRadius'
| 'disableRepositioning'
| 'bounds'
| 'styles'
| 'classNames'
| 'horizontalAlignment'
| 'verticalAlignment'
| 'className'
| 'style'`,elements:[{name:"literal",value:"'x'"},{name:"literal",value:"'y'"},{name:"literal",value:"'children'"},{name:"literal",value:"'testID'"},{name:"literal",value:"'dx'"},{name:"literal",value:"'dy'"},{name:"literal",value:"'font'"},{name:"literal",value:"'fontFamily'"},{name:"literal",value:"'fontSize'"},{name:"literal",value:"'fontWeight'"},{name:"literal",value:"'color'"},{name:"literal",value:"'elevated'"},{name:"literal",value:"'inset'"},{name:"literal",value:"'background'"},{name:"literal",value:"'borderRadius'"},{name:"literal",value:"'disableRepositioning'"},{name:"literal",value:"'bounds'"},{name:"literal",value:"'styles'"},{name:"literal",value:"'classNames'"},{name:"literal",value:"'horizontalAlignment'"},{name:"literal",value:"'verticalAlignment'"},{name:"literal",value:"'className'"},{name:"literal",value:"'style'"}]}],raw:`Pick<
  ChartTextProps,
  | 'x'
  | 'y'
  | 'children'
  | 'testID'
  | 'dx'
  | 'dy'
  | 'font'
  | 'fontFamily'
  | 'fontSize'
  | 'fontWeight'
  | 'color'
  | 'elevated'
  | 'inset'
  | 'background'
  | 'borderRadius'
  | 'disableRepositioning'
  | 'bounds'
  | 'styles'
  | 'classNames'
  | 'horizontalAlignment'
  | 'verticalAlignment'
  | 'className'
  | 'style'
>`}],required:!1},description:`Component to render tick labels.
Allows for custom styling and formatting that works cross-platform.

@example
// Custom tick label component with elevation
TickLabelComponent={(props) => (
  <DefaultAxisTickLabel {...props} elevated color="var(--color-fgPrimary)" />
)}

@default DefaultAxisTickLabel`}]}}]},{name:"intersection",raw:`AxisBaseProps & {
  /**
   * The position of the axis relative to the chart's drawing area.
   * @default 'bottom'
   */
  position?: 'top' | 'bottom';
  /**
   * Height of the axis. This value is inclusive of the padding.
   * @default 32 when no label is provided, 52 when a label is provided
   */
  height?: number;
}`,elements:[{name:"intersection",raw:`SharedProps & {
  /**
   * Placement of grid lines relative to each band.
   * Options: 'start', 'middle', 'end', 'edges'
   * @note This property only applies to band scales.
   * @default 'edges'
   */
  bandGridLinePlacement?: AxisBandPlacement;
  /**
   * Placement of tick marks relative to each band.
   * Options: 'start', 'middle', 'end', 'edges'
   * @note This property only applies to band scales.
   * @default 'middle'
   */
  bandTickMarkPlacement?: AxisBandPlacement;
  /**
   * Label text to display for the axis.
   */
  label?: string;
  /**
   * Gap between the tick labels and the axis label.
   * @default 4
   */
  labelGap?: number;
  /**
   * Minimum gap between tick labels.
   * Labels will be hidden if they are closer than this gap.
   * @default 4
   */
  minTickLabelGap?: number;
  /**
   * Requested number of ticks to display.
   * This value is passed into d3 and may not be respected.
   * @note This property is overridden when \`ticks\` is provided.
   * @note this property overrides the \`tickInterval\` property.
   * @default 5 (for y-axis)
   */
  requestedTickCount?: number;
  /**
   * Whether to show grid lines at each tick position.
   */
  showGrid?: boolean;
  /**
   * Whether to show the axis line.
   */
  showLine?: boolean;
  /**
   * Whether to show tick marks on the axis.
   */
  showTickMarks?: boolean;
  /**
   * Size of the tick marks.
   * @default 4
   */
  tickMarkSize?: number;
  /**
   * Custom tick configuration for the axis.
   * When provided, this overrides the \`requestedTickCount\` property.
   *
   * - **Array**: Uses these exact values for tick positioning and labels.
   * - **Function**: Filters based on the predicate function.
   *   - For **x-axis**: Checks every data index (0, 1, 2, ..., dataLength-1)
   *   - For **y-axis**: Filters d3-generated tick values
   *
   * @example
   * // Exact tick values
   * ticks: [0, 25, 50, 75, 100]
   *
   * @example
   * // Show every 12th data point on x-axis
   * ticks: (index) => index % 12 === 0
   */
  ticks?: number[] | ((value: number) => boolean);
  /**
   * Space between the axis tick mark and labels.
   * If tick marks are not shown, this is the gap between the axis and the chart.
   * @default 2 for x-axis, 8 for y-axis
   */
  tickMarkLabelGap?: number;
  /**
   * Interval at which to show ticks.
   * When provided, calculates tick count based on available space.
   * @note this property is overridden by the \`requestedTickCount\` and \`ticks\` properties.
   * @default 32 (for x-axis)
   */
  tickInterval?: number;
  /**
   * Minimum step size for tick generation.
   * Prevents the step from being smaller than this value.
   * @default 1
   */
  tickMinStep?: number;
  /**
   * Maximum step size for tick generation.
   * Prevents the step from being larger than this value.
   */
  tickMaxStep?: number;
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
   * Placement of grid lines relative to each band.
   * Options: 'start', 'middle', 'end', 'edges'
   * @note This property only applies to band scales.
   * @default 'edges'
   */
  bandGridLinePlacement?: AxisBandPlacement;
  /**
   * Placement of tick marks relative to each band.
   * Options: 'start', 'middle', 'end', 'edges'
   * @note This property only applies to band scales.
   * @default 'middle'
   */
  bandTickMarkPlacement?: AxisBandPlacement;
  /**
   * Label text to display for the axis.
   */
  label?: string;
  /**
   * Gap between the tick labels and the axis label.
   * @default 4
   */
  labelGap?: number;
  /**
   * Minimum gap between tick labels.
   * Labels will be hidden if they are closer than this gap.
   * @default 4
   */
  minTickLabelGap?: number;
  /**
   * Requested number of ticks to display.
   * This value is passed into d3 and may not be respected.
   * @note This property is overridden when \`ticks\` is provided.
   * @note this property overrides the \`tickInterval\` property.
   * @default 5 (for y-axis)
   */
  requestedTickCount?: number;
  /**
   * Whether to show grid lines at each tick position.
   */
  showGrid?: boolean;
  /**
   * Whether to show the axis line.
   */
  showLine?: boolean;
  /**
   * Whether to show tick marks on the axis.
   */
  showTickMarks?: boolean;
  /**
   * Size of the tick marks.
   * @default 4
   */
  tickMarkSize?: number;
  /**
   * Custom tick configuration for the axis.
   * When provided, this overrides the \`requestedTickCount\` property.
   *
   * - **Array**: Uses these exact values for tick positioning and labels.
   * - **Function**: Filters based on the predicate function.
   *   - For **x-axis**: Checks every data index (0, 1, 2, ..., dataLength-1)
   *   - For **y-axis**: Filters d3-generated tick values
   *
   * @example
   * // Exact tick values
   * ticks: [0, 25, 50, 75, 100]
   *
   * @example
   * // Show every 12th data point on x-axis
   * ticks: (index) => index % 12 === 0
   */
  ticks?: number[] | ((value: number) => boolean);
  /**
   * Space between the axis tick mark and labels.
   * If tick marks are not shown, this is the gap between the axis and the chart.
   * @default 2 for x-axis, 8 for y-axis
   */
  tickMarkLabelGap?: number;
  /**
   * Interval at which to show ticks.
   * When provided, calculates tick count based on available space.
   * @note this property is overridden by the \`requestedTickCount\` and \`ticks\` properties.
   * @default 32 (for x-axis)
   */
  tickInterval?: number;
  /**
   * Minimum step size for tick generation.
   * Prevents the step from being smaller than this value.
   * @default 1
   */
  tickMinStep?: number;
  /**
   * Maximum step size for tick generation.
   * Prevents the step from being larger than this value.
   */
  tickMaxStep?: number;
}`,signature:{properties:[{key:"bandGridLinePlacement",value:{name:"union",raw:"'start' | 'middle' | 'end' | 'edges'",elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'middle'"},{name:"literal",value:"'end'"},{name:"literal",value:"'edges'"}],required:!1},description:`Placement of grid lines relative to each band.
Options: 'start', 'middle', 'end', 'edges'
@note This property only applies to band scales.
@default 'edges'`},{key:"bandTickMarkPlacement",value:{name:"union",raw:"'start' | 'middle' | 'end' | 'edges'",elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'middle'"},{name:"literal",value:"'end'"},{name:"literal",value:"'edges'"}],required:!1},description:`Placement of tick marks relative to each band.
Options: 'start', 'middle', 'end', 'edges'
@note This property only applies to band scales.
@default 'middle'`},{key:"label",value:{name:"string",required:!1},description:"Label text to display for the axis."},{key:"labelGap",value:{name:"number",required:!1},description:`Gap between the tick labels and the axis label.
@default 4`},{key:"minTickLabelGap",value:{name:"number",required:!1},description:`Minimum gap between tick labels.
Labels will be hidden if they are closer than this gap.
@default 4`},{key:"requestedTickCount",value:{name:"number",required:!1},description:"Requested number of ticks to display.\nThis value is passed into d3 and may not be respected.\n@note This property is overridden when `ticks` is provided.\n@note this property overrides the `tickInterval` property.\n@default 5 (for y-axis)"},{key:"showGrid",value:{name:"boolean",required:!1},description:"Whether to show grid lines at each tick position."},{key:"showLine",value:{name:"boolean",required:!1},description:"Whether to show the axis line."},{key:"showTickMarks",value:{name:"boolean",required:!1},description:"Whether to show tick marks on the axis."},{key:"tickMarkSize",value:{name:"number",required:!1},description:`Size of the tick marks.
@default 4`},{key:"ticks",value:{name:"union",raw:"number[] | ((value: number) => boolean)",elements:[{name:"Array",elements:[{name:"number"}],raw:"number[]"},{name:"unknown"}],required:!1},description:`Custom tick configuration for the axis.
When provided, this overrides the \`requestedTickCount\` property.

- **Array**: Uses these exact values for tick positioning and labels.
- **Function**: Filters based on the predicate function.
  - For **x-axis**: Checks every data index (0, 1, 2, ..., dataLength-1)
  - For **y-axis**: Filters d3-generated tick values

@example
// Exact tick values
ticks: [0, 25, 50, 75, 100]

@example
// Show every 12th data point on x-axis
ticks: (index) => index % 12 === 0`},{key:"tickMarkLabelGap",value:{name:"number",required:!1},description:`Space between the axis tick mark and labels.
If tick marks are not shown, this is the gap between the axis and the chart.
@default 2 for x-axis, 8 for y-axis`},{key:"tickInterval",value:{name:"number",required:!1},description:"Interval at which to show ticks.\nWhen provided, calculates tick count based on available space.\n@note this property is overridden by the `requestedTickCount` and `ticks` properties.\n@default 32 (for x-axis)"},{key:"tickMinStep",value:{name:"number",required:!1},description:`Minimum step size for tick generation.
Prevents the step from being smaller than this value.
@default 1`},{key:"tickMaxStep",value:{name:"number",required:!1},description:`Maximum step size for tick generation.
Prevents the step from being larger than this value.`}]}}]},{name:"signature",type:"object",raw:`{
  /**
   * The position of the axis relative to the chart's drawing area.
   * @default 'bottom'
   */
  position?: 'top' | 'bottom';
  /**
   * Height of the axis. This value is inclusive of the padding.
   * @default 32 when no label is provided, 52 when a label is provided
   */
  height?: number;
}`,signature:{properties:[{key:"position",value:{name:"union",raw:"'top' | 'bottom'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"}],required:!1},description:`The position of the axis relative to the chart's drawing area.
@default 'bottom'`},{key:"height",value:{name:"number",required:!1},description:`Height of the axis. This value is inclusive of the padding.
@default 32 when no label is provided, 52 when a label is provided`}]}}]}]}]},description:"Configuration for x-axis.\nAccepts axis config and axis props.\nTo show the axis, set `showXAxis` to true."},yAxis:{required:!1,tsType:{name:"intersection",raw:"Partial<AxisConfigProps> & YAxisProps",elements:[{name:"Partial",elements:[{name:"intersection",raw:`Omit<AxisConfig, 'domain' | 'range'> & {
  /**
   * Unique identifier for this axis.
   */
  id: string;
  /**
   * Domain configuration for the axis (data space).
   *
   * The domainLimit parameter (inherited from AxisConfig) controls how initial domain bounds are calculated:
   * - 'nice' (default for y axes): Rounds the domain to human-friendly values (e.g., 0-100 instead of 1.2-97.8)
   * - 'strict' (default for x axes): Uses the exact min/max values from the data
   *
   * The domain can be:
   * - A partial bounds object to override specific min/max values
   * - A function that receives the limit-processed bounds and allows further customization
   *
   * This allows you to first apply nice/strict processing, then optionally transform the result.
   */
  domain?: Partial<AxisBounds> | ((bounds: AxisBounds) => AxisBounds);
  /**
   * Range configuration for the axis (visual space in pixels).
   * Can be a partial bounds object to override specific values, or a function that transforms the calculated range.
   *
   * When using a function, it receives the initial calculated range bounds and allows you to adjust them.
   * This replaces the previous rangeOffset approach and provides more flexibility for range customization.
   */
  range?: Partial<AxisBounds> | ((bounds: AxisBounds) => AxisBounds);
}`,elements:[{name:"Omit",elements:[{name:"signature",type:"object",raw:`{
  /** The type of scale to use */
  scaleType: ChartAxisScaleType;
  /**
   * Domain bounds for the axis (data space)
   */
  domain: AxisBounds;
  /**
   * Range bounds for the axis (visual space in pixels)
   */
  range: AxisBounds;
  /**
   * Data for the axis
   */
  data?: string[] | number[];
  /**
   * Padding between categories for band scales (0-1, where 0.1 = 10% spacing)
   * Only used when scaleType is 'band'
   * @default 0.1
   */
  categoryPadding?: number;
  /**
   * Domain limit type for numeric scales
   * - 'nice': Rounds the domain to human-friendly values
   * - 'strict': Uses the exact min/max values from the data
   */
  domainLimit: 'nice' | 'strict';
}`,signature:{properties:[{key:"scaleType",value:{name:"union",raw:"'linear' | 'log' | 'band'",elements:[{name:"literal",value:"'linear'"},{name:"literal",value:"'log'"},{name:"literal",value:"'band'"}],required:!0},description:"The type of scale to use"},{key:"domain",value:{name:"signature",type:"object",raw:`{
  min: number;
  max: number;
}`,signature:{properties:[{key:"min",value:{name:"number",required:!0}},{key:"max",value:{name:"number",required:!0}}]},required:!0},description:"Domain bounds for the axis (data space)"},{key:"range",value:{name:"signature",type:"object",raw:`{
  min: number;
  max: number;
}`,signature:{properties:[{key:"min",value:{name:"number",required:!0}},{key:"max",value:{name:"number",required:!0}}]},required:!0},description:"Range bounds for the axis (visual space in pixels)"},{key:"data",value:{name:"union",raw:"string[] | number[]",elements:[{name:"Array",elements:[{name:"string"}],raw:"string[]"},{name:"Array",elements:[{name:"number"}],raw:"number[]"}],required:!1},description:"Data for the axis"},{key:"categoryPadding",value:{name:"number",required:!1},description:`Padding between categories for band scales (0-1, where 0.1 = 10% spacing)
Only used when scaleType is 'band'
@default 0.1`},{key:"domainLimit",value:{name:"union",raw:"'nice' | 'strict'",elements:[{name:"literal",value:"'nice'"},{name:"literal",value:"'strict'"}],required:!0},description:`Domain limit type for numeric scales
- 'nice': Rounds the domain to human-friendly values
- 'strict': Uses the exact min/max values from the data`}]}},{name:"union",raw:"'domain' | 'range'",elements:[{name:"literal",value:"'domain'"},{name:"literal",value:"'range'"}]}],raw:"Omit<AxisConfig, 'domain' | 'range'>"},{name:"signature",type:"object",raw:`{
  /**
   * Unique identifier for this axis.
   */
  id: string;
  /**
   * Domain configuration for the axis (data space).
   *
   * The domainLimit parameter (inherited from AxisConfig) controls how initial domain bounds are calculated:
   * - 'nice' (default for y axes): Rounds the domain to human-friendly values (e.g., 0-100 instead of 1.2-97.8)
   * - 'strict' (default for x axes): Uses the exact min/max values from the data
   *
   * The domain can be:
   * - A partial bounds object to override specific min/max values
   * - A function that receives the limit-processed bounds and allows further customization
   *
   * This allows you to first apply nice/strict processing, then optionally transform the result.
   */
  domain?: Partial<AxisBounds> | ((bounds: AxisBounds) => AxisBounds);
  /**
   * Range configuration for the axis (visual space in pixels).
   * Can be a partial bounds object to override specific values, or a function that transforms the calculated range.
   *
   * When using a function, it receives the initial calculated range bounds and allows you to adjust them.
   * This replaces the previous rangeOffset approach and provides more flexibility for range customization.
   */
  range?: Partial<AxisBounds> | ((bounds: AxisBounds) => AxisBounds);
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0},description:"Unique identifier for this axis."},{key:"domain",value:{name:"union",raw:"Partial<AxisBounds> | ((bounds: AxisBounds) => AxisBounds)",elements:[{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
  min: number;
  max: number;
}`,signature:{properties:[{key:"min",value:{name:"number",required:!0}},{key:"max",value:{name:"number",required:!0}}]},required:!0}],raw:"Partial<AxisBounds>"},{name:"unknown"}],required:!1},description:`Domain configuration for the axis (data space).

The domainLimit parameter (inherited from AxisConfig) controls how initial domain bounds are calculated:
- 'nice' (default for y axes): Rounds the domain to human-friendly values (e.g., 0-100 instead of 1.2-97.8)
- 'strict' (default for x axes): Uses the exact min/max values from the data

The domain can be:
- A partial bounds object to override specific min/max values
- A function that receives the limit-processed bounds and allows further customization

This allows you to first apply nice/strict processing, then optionally transform the result.`},{key:"range",value:{name:"union",raw:"Partial<AxisBounds> | ((bounds: AxisBounds) => AxisBounds)",elements:[{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
  min: number;
  max: number;
}`,signature:{properties:[{key:"min",value:{name:"number",required:!0}},{key:"max",value:{name:"number",required:!0}}]},required:!0}],raw:"Partial<AxisBounds>"},{name:"unknown"}],required:!1},description:`Range configuration for the axis (visual space in pixels).
Can be a partial bounds object to override specific values, or a function that transforms the calculated range.

When using a function, it receives the initial calculated range bounds and allows you to adjust them.
This replaces the previous rangeOffset approach and provides more flexibility for range customization.`}]}}]}],raw:"Partial<AxisConfigProps>"},{name:"intersection",raw:"AxisProps & YAxisBaseProps",elements:[{name:"intersection",raw:`AxisBaseProps & {
  /**
   * Custom className for the axis.
   */
  className?: string;
  /**
   * Custom classNames for the axis.
   */
  classNames?: {
    /**
     * Custom className for the root element.
     */
    root?: string;
    /**
     * Custom className for the axis label.
     */
    label?: string;
    /**
     * Custom className for the tick labels.
     */
    tickLabel?: string;
    /**
     * Custom className for the grid lines.
     */
    gridLine?: string;
    /**
     * Custom className for the axis line.
     */
    line?: string;
    /**
     * Custom className for the tick marks.
     */
    tickMark?: string;
  };
  /**
   * Custom style for the axis.
   */
  style?: React.CSSProperties;
  /**
   * Custom styles for the axis.
   */
  styles?: {
    /**
     * Custom style for the root element.
     */
    root?: React.CSSProperties;
    /**
     * Custom style for the axis label.
     */
    label?: React.CSSProperties;
    /**
     * Custom style for the tick labels.
     */
    tickLabel?: React.CSSProperties;
    /**
     * Custom style for the grid lines.
     */
    gridLine?: React.CSSProperties;
    /**
     * Custom style for the axis line.
     */
    line?: React.CSSProperties;
    /**
     * Custom style for the tick marks.
     */
    tickMark?: React.CSSProperties;
  };
  /**
   * Component to render the grid lines.
   * @default DottedLine
   */
  GridLineComponent?: LineComponent;
  /**
   * Component to render the axis line.
   * @default SolidLine
   */
  LineComponent?: LineComponent;
  /**
   * Component to render the tick marks.
   * @default SolidLine
   */
  TickMarkLineComponent?: LineComponent;
  /**
   * Formatter function for axis tick values.
   * Tick values will be wrapped in ChartText component.
   *
   * @example
   * // XAxis
   * tickLabelFormatter: (index) => {
   *   if (index % 12 === 0) {
   *     return <tspan style={{ fontWeight: 'bold' }}>\${prices[index]}</tspan>;
   *   }
   *   return \`$\${prices[index]}\`;
   * }
   *
   * @example
   * // YAxis
   * tickLabelFormatter: (value) => \`$\${prices[value]}\`
   */
  tickLabelFormatter?: (value: number) => ChartTextChildren;
  /**
   * Component to render tick labels.
   * Allows for custom styling and formatting that works cross-platform.
   *
   * @example
   * // Custom tick label component with elevation
   * TickLabelComponent={(props) => (
   *   <DefaultAxisTickLabel {...props} elevated color="var(--color-fgPrimary)" />
   * )}
   *
   * @default DefaultAxisTickLabel
   */
  TickLabelComponent?: AxisTickLabelComponent;
}`,elements:[{name:"intersection",raw:`SharedProps & {
  /**
   * Placement of grid lines relative to each band.
   * Options: 'start', 'middle', 'end', 'edges'
   * @note This property only applies to band scales.
   * @default 'edges'
   */
  bandGridLinePlacement?: AxisBandPlacement;
  /**
   * Placement of tick marks relative to each band.
   * Options: 'start', 'middle', 'end', 'edges'
   * @note This property only applies to band scales.
   * @default 'middle'
   */
  bandTickMarkPlacement?: AxisBandPlacement;
  /**
   * Label text to display for the axis.
   */
  label?: string;
  /**
   * Gap between the tick labels and the axis label.
   * @default 4
   */
  labelGap?: number;
  /**
   * Minimum gap between tick labels.
   * Labels will be hidden if they are closer than this gap.
   * @default 4
   */
  minTickLabelGap?: number;
  /**
   * Requested number of ticks to display.
   * This value is passed into d3 and may not be respected.
   * @note This property is overridden when \`ticks\` is provided.
   * @note this property overrides the \`tickInterval\` property.
   * @default 5 (for y-axis)
   */
  requestedTickCount?: number;
  /**
   * Whether to show grid lines at each tick position.
   */
  showGrid?: boolean;
  /**
   * Whether to show the axis line.
   */
  showLine?: boolean;
  /**
   * Whether to show tick marks on the axis.
   */
  showTickMarks?: boolean;
  /**
   * Size of the tick marks.
   * @default 4
   */
  tickMarkSize?: number;
  /**
   * Custom tick configuration for the axis.
   * When provided, this overrides the \`requestedTickCount\` property.
   *
   * - **Array**: Uses these exact values for tick positioning and labels.
   * - **Function**: Filters based on the predicate function.
   *   - For **x-axis**: Checks every data index (0, 1, 2, ..., dataLength-1)
   *   - For **y-axis**: Filters d3-generated tick values
   *
   * @example
   * // Exact tick values
   * ticks: [0, 25, 50, 75, 100]
   *
   * @example
   * // Show every 12th data point on x-axis
   * ticks: (index) => index % 12 === 0
   */
  ticks?: number[] | ((value: number) => boolean);
  /**
   * Space between the axis tick mark and labels.
   * If tick marks are not shown, this is the gap between the axis and the chart.
   * @default 2 for x-axis, 8 for y-axis
   */
  tickMarkLabelGap?: number;
  /**
   * Interval at which to show ticks.
   * When provided, calculates tick count based on available space.
   * @note this property is overridden by the \`requestedTickCount\` and \`ticks\` properties.
   * @default 32 (for x-axis)
   */
  tickInterval?: number;
  /**
   * Minimum step size for tick generation.
   * Prevents the step from being smaller than this value.
   * @default 1
   */
  tickMinStep?: number;
  /**
   * Maximum step size for tick generation.
   * Prevents the step from being larger than this value.
   */
  tickMaxStep?: number;
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
   * Placement of grid lines relative to each band.
   * Options: 'start', 'middle', 'end', 'edges'
   * @note This property only applies to band scales.
   * @default 'edges'
   */
  bandGridLinePlacement?: AxisBandPlacement;
  /**
   * Placement of tick marks relative to each band.
   * Options: 'start', 'middle', 'end', 'edges'
   * @note This property only applies to band scales.
   * @default 'middle'
   */
  bandTickMarkPlacement?: AxisBandPlacement;
  /**
   * Label text to display for the axis.
   */
  label?: string;
  /**
   * Gap between the tick labels and the axis label.
   * @default 4
   */
  labelGap?: number;
  /**
   * Minimum gap between tick labels.
   * Labels will be hidden if they are closer than this gap.
   * @default 4
   */
  minTickLabelGap?: number;
  /**
   * Requested number of ticks to display.
   * This value is passed into d3 and may not be respected.
   * @note This property is overridden when \`ticks\` is provided.
   * @note this property overrides the \`tickInterval\` property.
   * @default 5 (for y-axis)
   */
  requestedTickCount?: number;
  /**
   * Whether to show grid lines at each tick position.
   */
  showGrid?: boolean;
  /**
   * Whether to show the axis line.
   */
  showLine?: boolean;
  /**
   * Whether to show tick marks on the axis.
   */
  showTickMarks?: boolean;
  /**
   * Size of the tick marks.
   * @default 4
   */
  tickMarkSize?: number;
  /**
   * Custom tick configuration for the axis.
   * When provided, this overrides the \`requestedTickCount\` property.
   *
   * - **Array**: Uses these exact values for tick positioning and labels.
   * - **Function**: Filters based on the predicate function.
   *   - For **x-axis**: Checks every data index (0, 1, 2, ..., dataLength-1)
   *   - For **y-axis**: Filters d3-generated tick values
   *
   * @example
   * // Exact tick values
   * ticks: [0, 25, 50, 75, 100]
   *
   * @example
   * // Show every 12th data point on x-axis
   * ticks: (index) => index % 12 === 0
   */
  ticks?: number[] | ((value: number) => boolean);
  /**
   * Space between the axis tick mark and labels.
   * If tick marks are not shown, this is the gap between the axis and the chart.
   * @default 2 for x-axis, 8 for y-axis
   */
  tickMarkLabelGap?: number;
  /**
   * Interval at which to show ticks.
   * When provided, calculates tick count based on available space.
   * @note this property is overridden by the \`requestedTickCount\` and \`ticks\` properties.
   * @default 32 (for x-axis)
   */
  tickInterval?: number;
  /**
   * Minimum step size for tick generation.
   * Prevents the step from being smaller than this value.
   * @default 1
   */
  tickMinStep?: number;
  /**
   * Maximum step size for tick generation.
   * Prevents the step from being larger than this value.
   */
  tickMaxStep?: number;
}`,signature:{properties:[{key:"bandGridLinePlacement",value:{name:"union",raw:"'start' | 'middle' | 'end' | 'edges'",elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'middle'"},{name:"literal",value:"'end'"},{name:"literal",value:"'edges'"}],required:!1},description:`Placement of grid lines relative to each band.
Options: 'start', 'middle', 'end', 'edges'
@note This property only applies to band scales.
@default 'edges'`},{key:"bandTickMarkPlacement",value:{name:"union",raw:"'start' | 'middle' | 'end' | 'edges'",elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'middle'"},{name:"literal",value:"'end'"},{name:"literal",value:"'edges'"}],required:!1},description:`Placement of tick marks relative to each band.
Options: 'start', 'middle', 'end', 'edges'
@note This property only applies to band scales.
@default 'middle'`},{key:"label",value:{name:"string",required:!1},description:"Label text to display for the axis."},{key:"labelGap",value:{name:"number",required:!1},description:`Gap between the tick labels and the axis label.
@default 4`},{key:"minTickLabelGap",value:{name:"number",required:!1},description:`Minimum gap between tick labels.
Labels will be hidden if they are closer than this gap.
@default 4`},{key:"requestedTickCount",value:{name:"number",required:!1},description:"Requested number of ticks to display.\nThis value is passed into d3 and may not be respected.\n@note This property is overridden when `ticks` is provided.\n@note this property overrides the `tickInterval` property.\n@default 5 (for y-axis)"},{key:"showGrid",value:{name:"boolean",required:!1},description:"Whether to show grid lines at each tick position."},{key:"showLine",value:{name:"boolean",required:!1},description:"Whether to show the axis line."},{key:"showTickMarks",value:{name:"boolean",required:!1},description:"Whether to show tick marks on the axis."},{key:"tickMarkSize",value:{name:"number",required:!1},description:`Size of the tick marks.
@default 4`},{key:"ticks",value:{name:"union",raw:"number[] | ((value: number) => boolean)",elements:[{name:"Array",elements:[{name:"number"}],raw:"number[]"},{name:"unknown"}],required:!1},description:`Custom tick configuration for the axis.
When provided, this overrides the \`requestedTickCount\` property.

- **Array**: Uses these exact values for tick positioning and labels.
- **Function**: Filters based on the predicate function.
  - For **x-axis**: Checks every data index (0, 1, 2, ..., dataLength-1)
  - For **y-axis**: Filters d3-generated tick values

@example
// Exact tick values
ticks: [0, 25, 50, 75, 100]

@example
// Show every 12th data point on x-axis
ticks: (index) => index % 12 === 0`},{key:"tickMarkLabelGap",value:{name:"number",required:!1},description:`Space between the axis tick mark and labels.
If tick marks are not shown, this is the gap between the axis and the chart.
@default 2 for x-axis, 8 for y-axis`},{key:"tickInterval",value:{name:"number",required:!1},description:"Interval at which to show ticks.\nWhen provided, calculates tick count based on available space.\n@note this property is overridden by the `requestedTickCount` and `ticks` properties.\n@default 32 (for x-axis)"},{key:"tickMinStep",value:{name:"number",required:!1},description:`Minimum step size for tick generation.
Prevents the step from being smaller than this value.
@default 1`},{key:"tickMaxStep",value:{name:"number",required:!1},description:`Maximum step size for tick generation.
Prevents the step from being larger than this value.`}]}}]},{name:"signature",type:"object",raw:`{
  /**
   * Custom className for the axis.
   */
  className?: string;
  /**
   * Custom classNames for the axis.
   */
  classNames?: {
    /**
     * Custom className for the root element.
     */
    root?: string;
    /**
     * Custom className for the axis label.
     */
    label?: string;
    /**
     * Custom className for the tick labels.
     */
    tickLabel?: string;
    /**
     * Custom className for the grid lines.
     */
    gridLine?: string;
    /**
     * Custom className for the axis line.
     */
    line?: string;
    /**
     * Custom className for the tick marks.
     */
    tickMark?: string;
  };
  /**
   * Custom style for the axis.
   */
  style?: React.CSSProperties;
  /**
   * Custom styles for the axis.
   */
  styles?: {
    /**
     * Custom style for the root element.
     */
    root?: React.CSSProperties;
    /**
     * Custom style for the axis label.
     */
    label?: React.CSSProperties;
    /**
     * Custom style for the tick labels.
     */
    tickLabel?: React.CSSProperties;
    /**
     * Custom style for the grid lines.
     */
    gridLine?: React.CSSProperties;
    /**
     * Custom style for the axis line.
     */
    line?: React.CSSProperties;
    /**
     * Custom style for the tick marks.
     */
    tickMark?: React.CSSProperties;
  };
  /**
   * Component to render the grid lines.
   * @default DottedLine
   */
  GridLineComponent?: LineComponent;
  /**
   * Component to render the axis line.
   * @default SolidLine
   */
  LineComponent?: LineComponent;
  /**
   * Component to render the tick marks.
   * @default SolidLine
   */
  TickMarkLineComponent?: LineComponent;
  /**
   * Formatter function for axis tick values.
   * Tick values will be wrapped in ChartText component.
   *
   * @example
   * // XAxis
   * tickLabelFormatter: (index) => {
   *   if (index % 12 === 0) {
   *     return <tspan style={{ fontWeight: 'bold' }}>\${prices[index]}</tspan>;
   *   }
   *   return \`$\${prices[index]}\`;
   * }
   *
   * @example
   * // YAxis
   * tickLabelFormatter: (value) => \`$\${prices[value]}\`
   */
  tickLabelFormatter?: (value: number) => ChartTextChildren;
  /**
   * Component to render tick labels.
   * Allows for custom styling and formatting that works cross-platform.
   *
   * @example
   * // Custom tick label component with elevation
   * TickLabelComponent={(props) => (
   *   <DefaultAxisTickLabel {...props} elevated color="var(--color-fgPrimary)" />
   * )}
   *
   * @default DefaultAxisTickLabel
   */
  TickLabelComponent?: AxisTickLabelComponent;
}`,signature:{properties:[{key:"className",value:{name:"string",required:!1},description:"Custom className for the axis."},{key:"classNames",value:{name:"signature",type:"object",raw:`{
  /**
   * Custom className for the root element.
   */
  root?: string;
  /**
   * Custom className for the axis label.
   */
  label?: string;
  /**
   * Custom className for the tick labels.
   */
  tickLabel?: string;
  /**
   * Custom className for the grid lines.
   */
  gridLine?: string;
  /**
   * Custom className for the axis line.
   */
  line?: string;
  /**
   * Custom className for the tick marks.
   */
  tickMark?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1},description:"Custom className for the root element."},{key:"label",value:{name:"string",required:!1},description:"Custom className for the axis label."},{key:"tickLabel",value:{name:"string",required:!1},description:"Custom className for the tick labels."},{key:"gridLine",value:{name:"string",required:!1},description:"Custom className for the grid lines."},{key:"line",value:{name:"string",required:!1},description:"Custom className for the axis line."},{key:"tickMark",value:{name:"string",required:!1},description:"Custom className for the tick marks."}]},required:!1},description:"Custom classNames for the axis."},{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom style for the axis."},{key:"styles",value:{name:"signature",type:"object",raw:`{
  /**
   * Custom style for the root element.
   */
  root?: React.CSSProperties;
  /**
   * Custom style for the axis label.
   */
  label?: React.CSSProperties;
  /**
   * Custom style for the tick labels.
   */
  tickLabel?: React.CSSProperties;
  /**
   * Custom style for the grid lines.
   */
  gridLine?: React.CSSProperties;
  /**
   * Custom style for the axis line.
   */
  line?: React.CSSProperties;
  /**
   * Custom style for the tick marks.
   */
  tickMark?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom style for the root element."},{key:"label",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom style for the axis label."},{key:"tickLabel",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom style for the tick labels."},{key:"gridLine",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom style for the grid lines."},{key:"line",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom style for the axis line."},{key:"tickMark",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom style for the tick marks."}]},required:!1},description:"Custom styles for the axis."},{key:"GridLineComponent",value:{name:"ReactFC",raw:"React.FC<LineComponentProps>",elements:[{name:"intersection",raw:`Pick<
  LineProps,
  | 'stroke'
  | 'strokeOpacity'
  | 'strokeWidth'
  | 'gradient'
  | 'animate'
  | 'transition'
  | 'style'
  | 'className'
> &
  Pick<PathProps, 'clipRect' | 'strokeLinecap'> & {
    /**
     * Path of the line.
     */
    d: SVGProps<SVGPathElement>['d'];
    /**
     * ID of the y-axis to use.
     * If not provided, defaults to the default y-axis.
     */
    yAxisId?: string;
  }`,elements:[{name:"Pick",elements:[{name:"intersection",raw:`LineBaseProps & {
  /**
   * Transition configuration for line animations.
   */
  transition?: Transition;
  /**
   * Handler for when a point is clicked.
   * Passed through to Point components rendered via points.
   */
  onPointClick?: PointProps['onClick'];
  /**
   * Custom style for the line.
   */
  style?: React.CSSProperties;
  /**
   * Custom className for the line.
   */
  className?: string;
}`,elements:[{name:"intersection",raw:`SharedProps & {
  /**
   * The ID of the series to render. Will be used to find the data from the chart context.
   */
  seriesId: string;
  /**
   * The curve interpolation method to use for the line.
   * @default 'bump'
   */
  curve?: ChartPathCurveType;
  /**
   * The type of line to render.
   * @default 'solid'
   */
  type?: 'solid' | 'dotted';
  /**
   * Whether to show area fill under the line.
   */
  showArea?: boolean;
  /**
   * The type of area fill to add to the line.
   * @default 'gradient'
   */
  areaType?: 'gradient' | 'solid' | 'dotted';
  /**
   * Baseline value for the area.
   * When set, overrides the default baseline.
   */
  areaBaseline?: number;
  /**
   * Component to render the line.
   * Takes precedence over the type prop if provided.
   */
  LineComponent?: LineComponent;
  /**
   * Custom component to render line area fill.
   */
  AreaComponent?: AreaComponent;
  /**
   * Opacity of the line's stroke.
   * Will also be applied to points and area fill.
   * @default 1
   */
  opacity?: number;
  /**
   * Controls whether and how to render points at each data point in the series.
   * - \`true\`: Show all points with default styling
   * - \`false\` or \`undefined\`: Hide all points
   * - Function: Called for every entry in the data array to customize individual points
   *
   * @param defaults - The default point props computed by the Line component
   * @returns true for default point, false/null/undefined for no point, or Partial<PointProps> to customize
   */
  points?:
    | boolean
    | ((defaults: PointBaseProps) => boolean | null | undefined | Partial<PointProps>);
  /**
   * When true, the area is connected across null values.
   */
  connectNulls?: boolean;
  /**
   * The color of the line.
   * @default color of the series or 'var(--color-fgPrimary)'
   */
  stroke?: string;
  /**
   * Opacity of the line
   * @note when combined with gradient, both will be applied
   * @default 1
   */
  strokeOpacity?: number;
  /**
   * Width of the line
   * @default 2
   */
  strokeWidth?: number;
  /**
   * Gradient configuration.
   * When provided, creates gradient or threshold-based coloring.
   */
  gradient?: GradientDefinition;
  /**
   * Whether to animate the line.
   * Overrides the animate value from the chart context.
   */
  animate?: boolean;
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
   * The ID of the series to render. Will be used to find the data from the chart context.
   */
  seriesId: string;
  /**
   * The curve interpolation method to use for the line.
   * @default 'bump'
   */
  curve?: ChartPathCurveType;
  /**
   * The type of line to render.
   * @default 'solid'
   */
  type?: 'solid' | 'dotted';
  /**
   * Whether to show area fill under the line.
   */
  showArea?: boolean;
  /**
   * The type of area fill to add to the line.
   * @default 'gradient'
   */
  areaType?: 'gradient' | 'solid' | 'dotted';
  /**
   * Baseline value for the area.
   * When set, overrides the default baseline.
   */
  areaBaseline?: number;
  /**
   * Component to render the line.
   * Takes precedence over the type prop if provided.
   */
  LineComponent?: LineComponent;
  /**
   * Custom component to render line area fill.
   */
  AreaComponent?: AreaComponent;
  /**
   * Opacity of the line's stroke.
   * Will also be applied to points and area fill.
   * @default 1
   */
  opacity?: number;
  /**
   * Controls whether and how to render points at each data point in the series.
   * - \`true\`: Show all points with default styling
   * - \`false\` or \`undefined\`: Hide all points
   * - Function: Called for every entry in the data array to customize individual points
   *
   * @param defaults - The default point props computed by the Line component
   * @returns true for default point, false/null/undefined for no point, or Partial<PointProps> to customize
   */
  points?:
    | boolean
    | ((defaults: PointBaseProps) => boolean | null | undefined | Partial<PointProps>);
  /**
   * When true, the area is connected across null values.
   */
  connectNulls?: boolean;
  /**
   * The color of the line.
   * @default color of the series or 'var(--color-fgPrimary)'
   */
  stroke?: string;
  /**
   * Opacity of the line
   * @note when combined with gradient, both will be applied
   * @default 1
   */
  strokeOpacity?: number;
  /**
   * Width of the line
   * @default 2
   */
  strokeWidth?: number;
  /**
   * Gradient configuration.
   * When provided, creates gradient or threshold-based coloring.
   */
  gradient?: GradientDefinition;
  /**
   * Whether to animate the line.
   * Overrides the animate value from the chart context.
   */
  animate?: boolean;
}`,signature:{properties:[{key:"seriesId",value:{name:"string",required:!0},description:"The ID of the series to render. Will be used to find the data from the chart context."},{key:"curve",value:{name:"union",raw:`| 'bump'
| 'catmullRom'
| 'linear'
| 'linearClosed'
| 'monotone'
| 'natural'
| 'step'
| 'stepBefore'
| 'stepAfter'`,elements:[{name:"literal",value:"'bump'"},{name:"literal",value:"'catmullRom'"},{name:"literal",value:"'linear'"},{name:"literal",value:"'linearClosed'"},{name:"literal",value:"'monotone'"},{name:"literal",value:"'natural'"},{name:"literal",value:"'step'"},{name:"literal",value:"'stepBefore'"},{name:"literal",value:"'stepAfter'"}],required:!1},description:`The curve interpolation method to use for the line.
@default 'bump'`},{key:"type",value:{name:"union",raw:"'solid' | 'dotted'",elements:[{name:"literal",value:"'solid'"},{name:"literal",value:"'dotted'"}],required:!1},description:`The type of line to render.
@default 'solid'`},{key:"showArea",value:{name:"boolean",required:!1},description:"Whether to show area fill under the line."},{key:"areaType",value:{name:"union",raw:"'gradient' | 'solid' | 'dotted'",elements:[{name:"literal",value:"'gradient'"},{name:"literal",value:"'solid'"},{name:"literal",value:"'dotted'"}],required:!1},description:`The type of area fill to add to the line.
@default 'gradient'`},{key:"areaBaseline",value:{name:"number",required:!1},description:`Baseline value for the area.
When set, overrides the default baseline.`},{key:"LineComponent",value:{name:"LineComponent",required:!1},description:`Component to render the line.
Takes precedence over the type prop if provided.`},{key:"AreaComponent",value:{name:"ReactFC",raw:"React.FC<AreaComponentProps>",elements:[{name:"intersection",raw:`Pick<
  AreaProps,
  'fill' | 'fillOpacity' | 'baseline' | 'gradient' | 'animate' | 'transition'
> & {
  /**
   * Path of the area
   */
  d: SVGProps<SVGPathElement>['d'];
  /**
   * ID of the y-axis to use.
   * If not provided, defaults to the default y-axis.
   */
  yAxisId?: string;
}`,elements:[{name:"Pick",elements:[{name:"intersection",raw:`AreaBaseProps & {
  /**
   * Transition configuration for path animations.
   */
  transition?: Transition;
}`,elements:[{name:"signature",type:"object",raw:`{
  /**
   * The ID of the series to render. Will be used to find the data from the chart context.
   */
  seriesId: string;
  /**
   * The curve interpolation method to use for the line.
   * @default 'bump'
   */
  curve?: ChartPathCurveType;
  /**
   * The type of area to render.
   * @default 'solid'
   */
  type?: 'solid' | 'dotted' | 'gradient';
  /**
   * Component to render the area.
   * Takes precedence over the type prop if provided.
   */
  AreaComponent?: AreaComponent;
  /**
   * When true, the area is connected across null values.
   */
  connectNulls?: boolean;
  /**
   * The color of the area.
   * @default color of the series or 'var(--color-fgPrimary)'
   */
  fill?: string;
  /**
   * Opacity of the area
   * @note when combined with gradient, both will be applied
   * @default 1
   */
  fillOpacity?: number;
  /**
   * Baseline value for the gradient.
   * When set, overrides the default baseline.
   */
  baseline?: number;
  /**
   * Gradient configuration.
   * When provided, creates gradient or threshold-based coloring.
   */
  gradient?: GradientDefinition;
  /**
   * Whether to animate the area.
   * Overrides the animate value from the chart context.
   */
  animate?: boolean;
}`,signature:{properties:[{key:"seriesId",value:{name:"string",required:!0},description:"The ID of the series to render. Will be used to find the data from the chart context."},{key:"curve",value:{name:"union",raw:`| 'bump'
| 'catmullRom'
| 'linear'
| 'linearClosed'
| 'monotone'
| 'natural'
| 'step'
| 'stepBefore'
| 'stepAfter'`,elements:[{name:"literal",value:"'bump'"},{name:"literal",value:"'catmullRom'"},{name:"literal",value:"'linear'"},{name:"literal",value:"'linearClosed'"},{name:"literal",value:"'monotone'"},{name:"literal",value:"'natural'"},{name:"literal",value:"'step'"},{name:"literal",value:"'stepBefore'"},{name:"literal",value:"'stepAfter'"}],required:!1},description:`The curve interpolation method to use for the line.
@default 'bump'`},{key:"type",value:{name:"union",raw:"'solid' | 'dotted' | 'gradient'",elements:[{name:"literal",value:"'solid'"},{name:"literal",value:"'dotted'"},{name:"literal",value:"'gradient'"}],required:!1},description:`The type of area to render.
@default 'solid'`},{key:"AreaComponent",value:{name:"AreaComponent",required:!1},description:`Component to render the area.
Takes precedence over the type prop if provided.`},{key:"connectNulls",value:{name:"boolean",required:!1},description:"When true, the area is connected across null values."},{key:"fill",value:{name:"string",required:!1},description:`The color of the area.
@default color of the series or 'var(--color-fgPrimary)'`},{key:"fillOpacity",value:{name:"number",required:!1},description:`Opacity of the area
@note when combined with gradient, both will be applied
@default 1`},{key:"baseline",value:{name:"number",required:!1},description:`Baseline value for the gradient.
When set, overrides the default baseline.`},{key:"gradient",value:{name:"signature",type:"object",raw:`{
  /**
   * Axis that the gradient maps to.
   * @default 'y'
   */
  axis?: 'x' | 'y';
  /**
   * Gradient stops with colors and positions.
   * Can be an array of stop objects or a function that receives domain bounds.
   */
  stops: GradientStop[] | ((domain: AxisBounds) => GradientStop[]);
}`,signature:{properties:[{key:"axis",value:{name:"union",raw:"'x' | 'y'",elements:[{name:"literal",value:"'x'"},{name:"literal",value:"'y'"}],required:!1},description:`Axis that the gradient maps to.
@default 'y'`},{key:"stops",value:{name:"union",raw:"GradientStop[] | ((domain: AxisBounds) => GradientStop[])",elements:[{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /**
   * Position in data space.
   * Multiple stops at the same offset create hard color transitions.
   */
  offset: number;
  /**  Color at the stop (any valid CSS color) */
  color: string;
  /** Optional opacity (0-1). Defaults to 1. */
  opacity?: number;
}`,signature:{properties:[{key:"offset",value:{name:"number",required:!0},description:`Position in data space.
Multiple stops at the same offset create hard color transitions.`},{key:"color",value:{name:"string",required:!0},description:"Color at the stop (any valid CSS color)"},{key:"opacity",value:{name:"number",required:!1},description:"Optional opacity (0-1). Defaults to 1."}]}}],raw:"GradientStop[]"},{name:"unknown"}],required:!0},description:`Gradient stops with colors and positions.
Can be an array of stop objects or a function that receives domain bounds.`}]},required:!1},description:`Gradient configuration.
When provided, creates gradient or threshold-based coloring.`},{key:"animate",value:{name:"boolean",required:!1},description:`Whether to animate the area.
Overrides the animate value from the chart context.`}]}},{name:"signature",type:"object",raw:`{
  /**
   * Transition configuration for path animations.
   */
  transition?: Transition;
}`,signature:{properties:[{key:"transition",value:{name:"Transition",required:!1},description:"Transition configuration for path animations."}]}}]},{name:"union",raw:"'fill' | 'fillOpacity' | 'baseline' | 'gradient' | 'animate' | 'transition'",elements:[{name:"literal",value:"'fill'"},{name:"literal",value:"'fillOpacity'"},{name:"literal",value:"'baseline'"},{name:"literal",value:"'gradient'"},{name:"literal",value:"'animate'"},{name:"literal",value:"'transition'"}]}],raw:`Pick<
  AreaProps,
  'fill' | 'fillOpacity' | 'baseline' | 'gradient' | 'animate' | 'transition'
>`},{name:"signature",type:"object",raw:`{
  /**
   * Path of the area
   */
  d: SVGProps<SVGPathElement>['d'];
  /**
   * ID of the y-axis to use.
   * If not provided, defaults to the default y-axis.
   */
  yAxisId?: string;
}`,signature:{properties:[{key:"d",value:{name:"SVGProps['d']",raw:"SVGProps<SVGPathElement>['d']",required:!0},description:"Path of the area"},{key:"yAxisId",value:{name:"string",required:!1},description:`ID of the y-axis to use.
If not provided, defaults to the default y-axis.`}]}}]}],required:!1},description:"Custom component to render line area fill."},{key:"opacity",value:{name:"number",required:!1},description:`Opacity of the line's stroke.
Will also be applied to points and area fill.
@default 1`},{key:"points",value:{name:"union",raw:`| boolean
| ((defaults: PointBaseProps) => boolean | null | undefined | Partial<PointProps>)`,elements:[{name:"boolean"},{name:"unknown"}],required:!1},description:"Controls whether and how to render points at each data point in the series.\n- `true`: Show all points with default styling\n- `false` or `undefined`: Hide all points\n- Function: Called for every entry in the data array to customize individual points\n\n@param defaults - The default point props computed by the Line component\n@returns true for default point, false/null/undefined for no point, or Partial<PointProps> to customize"},{key:"connectNulls",value:{name:"boolean",required:!1},description:"When true, the area is connected across null values."},{key:"stroke",value:{name:"string",required:!1},description:`The color of the line.
@default color of the series or 'var(--color-fgPrimary)'`},{key:"strokeOpacity",value:{name:"number",required:!1},description:`Opacity of the line
@note when combined with gradient, both will be applied
@default 1`},{key:"strokeWidth",value:{name:"number",required:!1},description:`Width of the line
@default 2`},{key:"gradient",value:{name:"signature",type:"object",raw:`{
  /**
   * Axis that the gradient maps to.
   * @default 'y'
   */
  axis?: 'x' | 'y';
  /**
   * Gradient stops with colors and positions.
   * Can be an array of stop objects or a function that receives domain bounds.
   */
  stops: GradientStop[] | ((domain: AxisBounds) => GradientStop[]);
}`,signature:{properties:[{key:"axis",value:{name:"union",raw:"'x' | 'y'",elements:[{name:"literal",value:"'x'"},{name:"literal",value:"'y'"}],required:!1},description:`Axis that the gradient maps to.
@default 'y'`},{key:"stops",value:{name:"union",raw:"GradientStop[] | ((domain: AxisBounds) => GradientStop[])",elements:[{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /**
   * Position in data space.
   * Multiple stops at the same offset create hard color transitions.
   */
  offset: number;
  /**  Color at the stop (any valid CSS color) */
  color: string;
  /** Optional opacity (0-1). Defaults to 1. */
  opacity?: number;
}`,signature:{properties:[{key:"offset",value:{name:"number",required:!0},description:`Position in data space.
Multiple stops at the same offset create hard color transitions.`},{key:"color",value:{name:"string",required:!0},description:"Color at the stop (any valid CSS color)"},{key:"opacity",value:{name:"number",required:!1},description:"Optional opacity (0-1). Defaults to 1."}]}}],raw:"GradientStop[]"},{name:"unknown"}],required:!0},description:`Gradient stops with colors and positions.
Can be an array of stop objects or a function that receives domain bounds.`}]},required:!1},description:`Gradient configuration.
When provided, creates gradient or threshold-based coloring.`},{key:"animate",value:{name:"boolean",required:!1},description:`Whether to animate the line.
Overrides the animate value from the chart context.`}]}}]},{name:"signature",type:"object",raw:`{
  /**
   * Transition configuration for line animations.
   */
  transition?: Transition;
  /**
   * Handler for when a point is clicked.
   * Passed through to Point components rendered via points.
   */
  onPointClick?: PointProps['onClick'];
  /**
   * Custom style for the line.
   */
  style?: React.CSSProperties;
  /**
   * Custom className for the line.
   */
  className?: string;
}`,signature:{properties:[{key:"transition",value:{name:"Transition",required:!1},description:"Transition configuration for line animations."},{key:"onPointClick",value:{name:"intersection['onClick']",raw:"PointProps['onClick']",required:!1},description:`Handler for when a point is clicked.
Passed through to Point components rendered via points.`},{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom style for the line."},{key:"className",value:{name:"string",required:!1},description:"Custom className for the line."}]}}]},{name:"union",raw:`| 'stroke'
| 'strokeOpacity'
| 'strokeWidth'
| 'gradient'
| 'animate'
| 'transition'
| 'style'
| 'className'`,elements:[{name:"literal",value:"'stroke'"},{name:"literal",value:"'strokeOpacity'"},{name:"literal",value:"'strokeWidth'"},{name:"literal",value:"'gradient'"},{name:"literal",value:"'animate'"},{name:"literal",value:"'transition'"},{name:"literal",value:"'style'"},{name:"literal",value:"'className'"}]}],raw:`Pick<
  LineProps,
  | 'stroke'
  | 'strokeOpacity'
  | 'strokeWidth'
  | 'gradient'
  | 'animate'
  | 'transition'
  | 'style'
  | 'className'
>`},{name:"Pick",elements:[{name:"intersection",raw:`PathBaseProps &
Omit<
  SVGProps<SVGPathElement>,
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
  | 'onAnimationStartCapture'
  | 'onAnimationEndCapture'
  | 'onAnimationIterationCapture'
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragStart'
  | 'onDragCapture'
  | 'onDragEndCapture'
  | 'onDragStartCapture'
> & {
  /**
   * Offset added to the clip rect boundaries.
   */
  clipOffset?: number;
  /**
   * Custom clip path rect. If provided, this overrides the default chart rect for clipping.
   * Pass null to disable clipping.
   * @default drawingArea of chart + clipOffset
   */
  clipRect?: Rect | null;
  /**
   * Transition configuration for path.
   *
   * @example
   * // Timing based animation
   * transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
   *
   * @example
   * // Spring animation
   * transition={{ type: 'spring', damping: 20, stiffness: 300 }}
   */
  transition?: Transition;
}`,elements:[{name:"intersection",raw:`SharedProps & {
  /**
   * Whether to animate this path. Overrides the animate prop on the Chart component.
   */
  animate?: boolean;
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
   * Whether to animate this path. Overrides the animate prop on the Chart component.
   */
  animate?: boolean;
}`,signature:{properties:[{key:"animate",value:{name:"boolean",required:!1},description:"Whether to animate this path. Overrides the animate prop on the Chart component."}]}}]},{name:"Omit",elements:[{name:"SVGProps",elements:[{name:"SVGPathElement"}],raw:"SVGProps<SVGPathElement>"},{name:"union",raw:`| 'onAnimationStart'
| 'onAnimationEnd'
| 'onAnimationIteration'
| 'onAnimationStartCapture'
| 'onAnimationEndCapture'
| 'onAnimationIterationCapture'
| 'onDrag'
| 'onDragEnd'
| 'onDragStart'
| 'onDragCapture'
| 'onDragEndCapture'
| 'onDragStartCapture'`,elements:[{name:"literal",value:"'onAnimationStart'"},{name:"literal",value:"'onAnimationEnd'"},{name:"literal",value:"'onAnimationIteration'"},{name:"literal",value:"'onAnimationStartCapture'"},{name:"literal",value:"'onAnimationEndCapture'"},{name:"literal",value:"'onAnimationIterationCapture'"},{name:"literal",value:"'onDrag'"},{name:"literal",value:"'onDragEnd'"},{name:"literal",value:"'onDragStart'"},{name:"literal",value:"'onDragCapture'"},{name:"literal",value:"'onDragEndCapture'"},{name:"literal",value:"'onDragStartCapture'"}]}],raw:`Omit<
  SVGProps<SVGPathElement>,
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
  | 'onAnimationStartCapture'
  | 'onAnimationEndCapture'
  | 'onAnimationIterationCapture'
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragStart'
  | 'onDragCapture'
  | 'onDragEndCapture'
  | 'onDragStartCapture'
>`},{name:"signature",type:"object",raw:`{
  /**
   * Offset added to the clip rect boundaries.
   */
  clipOffset?: number;
  /**
   * Custom clip path rect. If provided, this overrides the default chart rect for clipping.
   * Pass null to disable clipping.
   * @default drawingArea of chart + clipOffset
   */
  clipRect?: Rect | null;
  /**
   * Transition configuration for path.
   *
   * @example
   * // Timing based animation
   * transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
   *
   * @example
   * // Spring animation
   * transition={{ type: 'spring', damping: 20, stiffness: 300 }}
   */
  transition?: Transition;
}`,signature:{properties:[{key:"clipOffset",value:{name:"number",required:!1},description:"Offset added to the clip rect boundaries."},{key:"clipRect",value:{name:"union",raw:"Rect | null",elements:[{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
  width: number;
  height: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!1},{name:"null"}],required:!1},description:`Custom clip path rect. If provided, this overrides the default chart rect for clipping.
Pass null to disable clipping.
@default drawingArea of chart + clipOffset`},{key:"transition",value:{name:"Transition",required:!1},description:`Transition configuration for path.

@example
// Timing based animation
transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}

@example
// Spring animation
transition={{ type: 'spring', damping: 20, stiffness: 300 }}`}]}}]},{name:"union",raw:"'clipRect' | 'strokeLinecap'",elements:[{name:"literal",value:"'clipRect'"},{name:"literal",value:"'strokeLinecap'"}]}],raw:"Pick<PathProps, 'clipRect' | 'strokeLinecap'>"},{name:"signature",type:"object",raw:`{
  /**
   * Path of the line.
   */
  d: SVGProps<SVGPathElement>['d'];
  /**
   * ID of the y-axis to use.
   * If not provided, defaults to the default y-axis.
   */
  yAxisId?: string;
}`,signature:{properties:[{key:"d",value:{name:"SVGProps['d']",raw:"SVGProps<SVGPathElement>['d']",required:!0},description:"Path of the line."},{key:"yAxisId",value:{name:"string",required:!1},description:`ID of the y-axis to use.
If not provided, defaults to the default y-axis.`}]}}]}],required:!1},description:`Component to render the grid lines.
@default DottedLine`},{key:"LineComponent",value:{name:"ReactFC",raw:"React.FC<LineComponentProps>",elements:[{name:"intersection",raw:`Pick<
  LineProps,
  | 'stroke'
  | 'strokeOpacity'
  | 'strokeWidth'
  | 'gradient'
  | 'animate'
  | 'transition'
  | 'style'
  | 'className'
> &
  Pick<PathProps, 'clipRect' | 'strokeLinecap'> & {
    /**
     * Path of the line.
     */
    d: SVGProps<SVGPathElement>['d'];
    /**
     * ID of the y-axis to use.
     * If not provided, defaults to the default y-axis.
     */
    yAxisId?: string;
  }`,elements:[{name:"Pick",elements:[{name:"intersection",raw:`LineBaseProps & {
  /**
   * Transition configuration for line animations.
   */
  transition?: Transition;
  /**
   * Handler for when a point is clicked.
   * Passed through to Point components rendered via points.
   */
  onPointClick?: PointProps['onClick'];
  /**
   * Custom style for the line.
   */
  style?: React.CSSProperties;
  /**
   * Custom className for the line.
   */
  className?: string;
}`,elements:[{name:"intersection",raw:`SharedProps & {
  /**
   * The ID of the series to render. Will be used to find the data from the chart context.
   */
  seriesId: string;
  /**
   * The curve interpolation method to use for the line.
   * @default 'bump'
   */
  curve?: ChartPathCurveType;
  /**
   * The type of line to render.
   * @default 'solid'
   */
  type?: 'solid' | 'dotted';
  /**
   * Whether to show area fill under the line.
   */
  showArea?: boolean;
  /**
   * The type of area fill to add to the line.
   * @default 'gradient'
   */
  areaType?: 'gradient' | 'solid' | 'dotted';
  /**
   * Baseline value for the area.
   * When set, overrides the default baseline.
   */
  areaBaseline?: number;
  /**
   * Component to render the line.
   * Takes precedence over the type prop if provided.
   */
  LineComponent?: LineComponent;
  /**
   * Custom component to render line area fill.
   */
  AreaComponent?: AreaComponent;
  /**
   * Opacity of the line's stroke.
   * Will also be applied to points and area fill.
   * @default 1
   */
  opacity?: number;
  /**
   * Controls whether and how to render points at each data point in the series.
   * - \`true\`: Show all points with default styling
   * - \`false\` or \`undefined\`: Hide all points
   * - Function: Called for every entry in the data array to customize individual points
   *
   * @param defaults - The default point props computed by the Line component
   * @returns true for default point, false/null/undefined for no point, or Partial<PointProps> to customize
   */
  points?:
    | boolean
    | ((defaults: PointBaseProps) => boolean | null | undefined | Partial<PointProps>);
  /**
   * When true, the area is connected across null values.
   */
  connectNulls?: boolean;
  /**
   * The color of the line.
   * @default color of the series or 'var(--color-fgPrimary)'
   */
  stroke?: string;
  /**
   * Opacity of the line
   * @note when combined with gradient, both will be applied
   * @default 1
   */
  strokeOpacity?: number;
  /**
   * Width of the line
   * @default 2
   */
  strokeWidth?: number;
  /**
   * Gradient configuration.
   * When provided, creates gradient or threshold-based coloring.
   */
  gradient?: GradientDefinition;
  /**
   * Whether to animate the line.
   * Overrides the animate value from the chart context.
   */
  animate?: boolean;
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
   * The ID of the series to render. Will be used to find the data from the chart context.
   */
  seriesId: string;
  /**
   * The curve interpolation method to use for the line.
   * @default 'bump'
   */
  curve?: ChartPathCurveType;
  /**
   * The type of line to render.
   * @default 'solid'
   */
  type?: 'solid' | 'dotted';
  /**
   * Whether to show area fill under the line.
   */
  showArea?: boolean;
  /**
   * The type of area fill to add to the line.
   * @default 'gradient'
   */
  areaType?: 'gradient' | 'solid' | 'dotted';
  /**
   * Baseline value for the area.
   * When set, overrides the default baseline.
   */
  areaBaseline?: number;
  /**
   * Component to render the line.
   * Takes precedence over the type prop if provided.
   */
  LineComponent?: LineComponent;
  /**
   * Custom component to render line area fill.
   */
  AreaComponent?: AreaComponent;
  /**
   * Opacity of the line's stroke.
   * Will also be applied to points and area fill.
   * @default 1
   */
  opacity?: number;
  /**
   * Controls whether and how to render points at each data point in the series.
   * - \`true\`: Show all points with default styling
   * - \`false\` or \`undefined\`: Hide all points
   * - Function: Called for every entry in the data array to customize individual points
   *
   * @param defaults - The default point props computed by the Line component
   * @returns true for default point, false/null/undefined for no point, or Partial<PointProps> to customize
   */
  points?:
    | boolean
    | ((defaults: PointBaseProps) => boolean | null | undefined | Partial<PointProps>);
  /**
   * When true, the area is connected across null values.
   */
  connectNulls?: boolean;
  /**
   * The color of the line.
   * @default color of the series or 'var(--color-fgPrimary)'
   */
  stroke?: string;
  /**
   * Opacity of the line
   * @note when combined with gradient, both will be applied
   * @default 1
   */
  strokeOpacity?: number;
  /**
   * Width of the line
   * @default 2
   */
  strokeWidth?: number;
  /**
   * Gradient configuration.
   * When provided, creates gradient or threshold-based coloring.
   */
  gradient?: GradientDefinition;
  /**
   * Whether to animate the line.
   * Overrides the animate value from the chart context.
   */
  animate?: boolean;
}`,signature:{properties:[{key:"seriesId",value:{name:"string",required:!0},description:"The ID of the series to render. Will be used to find the data from the chart context."},{key:"curve",value:{name:"union",raw:`| 'bump'
| 'catmullRom'
| 'linear'
| 'linearClosed'
| 'monotone'
| 'natural'
| 'step'
| 'stepBefore'
| 'stepAfter'`,elements:[{name:"literal",value:"'bump'"},{name:"literal",value:"'catmullRom'"},{name:"literal",value:"'linear'"},{name:"literal",value:"'linearClosed'"},{name:"literal",value:"'monotone'"},{name:"literal",value:"'natural'"},{name:"literal",value:"'step'"},{name:"literal",value:"'stepBefore'"},{name:"literal",value:"'stepAfter'"}],required:!1},description:`The curve interpolation method to use for the line.
@default 'bump'`},{key:"type",value:{name:"union",raw:"'solid' | 'dotted'",elements:[{name:"literal",value:"'solid'"},{name:"literal",value:"'dotted'"}],required:!1},description:`The type of line to render.
@default 'solid'`},{key:"showArea",value:{name:"boolean",required:!1},description:"Whether to show area fill under the line."},{key:"areaType",value:{name:"union",raw:"'gradient' | 'solid' | 'dotted'",elements:[{name:"literal",value:"'gradient'"},{name:"literal",value:"'solid'"},{name:"literal",value:"'dotted'"}],required:!1},description:`The type of area fill to add to the line.
@default 'gradient'`},{key:"areaBaseline",value:{name:"number",required:!1},description:`Baseline value for the area.
When set, overrides the default baseline.`},{key:"LineComponent",value:{name:"LineComponent",required:!1},description:`Component to render the line.
Takes precedence over the type prop if provided.`},{key:"AreaComponent",value:{name:"ReactFC",raw:"React.FC<AreaComponentProps>",elements:[{name:"intersection",raw:`Pick<
  AreaProps,
  'fill' | 'fillOpacity' | 'baseline' | 'gradient' | 'animate' | 'transition'
> & {
  /**
   * Path of the area
   */
  d: SVGProps<SVGPathElement>['d'];
  /**
   * ID of the y-axis to use.
   * If not provided, defaults to the default y-axis.
   */
  yAxisId?: string;
}`,elements:[{name:"Pick",elements:[{name:"intersection",raw:`AreaBaseProps & {
  /**
   * Transition configuration for path animations.
   */
  transition?: Transition;
}`,elements:[{name:"signature",type:"object",raw:`{
  /**
   * The ID of the series to render. Will be used to find the data from the chart context.
   */
  seriesId: string;
  /**
   * The curve interpolation method to use for the line.
   * @default 'bump'
   */
  curve?: ChartPathCurveType;
  /**
   * The type of area to render.
   * @default 'solid'
   */
  type?: 'solid' | 'dotted' | 'gradient';
  /**
   * Component to render the area.
   * Takes precedence over the type prop if provided.
   */
  AreaComponent?: AreaComponent;
  /**
   * When true, the area is connected across null values.
   */
  connectNulls?: boolean;
  /**
   * The color of the area.
   * @default color of the series or 'var(--color-fgPrimary)'
   */
  fill?: string;
  /**
   * Opacity of the area
   * @note when combined with gradient, both will be applied
   * @default 1
   */
  fillOpacity?: number;
  /**
   * Baseline value for the gradient.
   * When set, overrides the default baseline.
   */
  baseline?: number;
  /**
   * Gradient configuration.
   * When provided, creates gradient or threshold-based coloring.
   */
  gradient?: GradientDefinition;
  /**
   * Whether to animate the area.
   * Overrides the animate value from the chart context.
   */
  animate?: boolean;
}`,signature:{properties:[{key:"seriesId",value:{name:"string",required:!0},description:"The ID of the series to render. Will be used to find the data from the chart context."},{key:"curve",value:{name:"union",raw:`| 'bump'
| 'catmullRom'
| 'linear'
| 'linearClosed'
| 'monotone'
| 'natural'
| 'step'
| 'stepBefore'
| 'stepAfter'`,elements:[{name:"literal",value:"'bump'"},{name:"literal",value:"'catmullRom'"},{name:"literal",value:"'linear'"},{name:"literal",value:"'linearClosed'"},{name:"literal",value:"'monotone'"},{name:"literal",value:"'natural'"},{name:"literal",value:"'step'"},{name:"literal",value:"'stepBefore'"},{name:"literal",value:"'stepAfter'"}],required:!1},description:`The curve interpolation method to use for the line.
@default 'bump'`},{key:"type",value:{name:"union",raw:"'solid' | 'dotted' | 'gradient'",elements:[{name:"literal",value:"'solid'"},{name:"literal",value:"'dotted'"},{name:"literal",value:"'gradient'"}],required:!1},description:`The type of area to render.
@default 'solid'`},{key:"AreaComponent",value:{name:"AreaComponent",required:!1},description:`Component to render the area.
Takes precedence over the type prop if provided.`},{key:"connectNulls",value:{name:"boolean",required:!1},description:"When true, the area is connected across null values."},{key:"fill",value:{name:"string",required:!1},description:`The color of the area.
@default color of the series or 'var(--color-fgPrimary)'`},{key:"fillOpacity",value:{name:"number",required:!1},description:`Opacity of the area
@note when combined with gradient, both will be applied
@default 1`},{key:"baseline",value:{name:"number",required:!1},description:`Baseline value for the gradient.
When set, overrides the default baseline.`},{key:"gradient",value:{name:"signature",type:"object",raw:`{
  /**
   * Axis that the gradient maps to.
   * @default 'y'
   */
  axis?: 'x' | 'y';
  /**
   * Gradient stops with colors and positions.
   * Can be an array of stop objects or a function that receives domain bounds.
   */
  stops: GradientStop[] | ((domain: AxisBounds) => GradientStop[]);
}`,signature:{properties:[{key:"axis",value:{name:"union",raw:"'x' | 'y'",elements:[{name:"literal",value:"'x'"},{name:"literal",value:"'y'"}],required:!1},description:`Axis that the gradient maps to.
@default 'y'`},{key:"stops",value:{name:"union",raw:"GradientStop[] | ((domain: AxisBounds) => GradientStop[])",elements:[{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /**
   * Position in data space.
   * Multiple stops at the same offset create hard color transitions.
   */
  offset: number;
  /**  Color at the stop (any valid CSS color) */
  color: string;
  /** Optional opacity (0-1). Defaults to 1. */
  opacity?: number;
}`,signature:{properties:[{key:"offset",value:{name:"number",required:!0},description:`Position in data space.
Multiple stops at the same offset create hard color transitions.`},{key:"color",value:{name:"string",required:!0},description:"Color at the stop (any valid CSS color)"},{key:"opacity",value:{name:"number",required:!1},description:"Optional opacity (0-1). Defaults to 1."}]}}],raw:"GradientStop[]"},{name:"unknown"}],required:!0},description:`Gradient stops with colors and positions.
Can be an array of stop objects or a function that receives domain bounds.`}]},required:!1},description:`Gradient configuration.
When provided, creates gradient or threshold-based coloring.`},{key:"animate",value:{name:"boolean",required:!1},description:`Whether to animate the area.
Overrides the animate value from the chart context.`}]}},{name:"signature",type:"object",raw:`{
  /**
   * Transition configuration for path animations.
   */
  transition?: Transition;
}`,signature:{properties:[{key:"transition",value:{name:"Transition",required:!1},description:"Transition configuration for path animations."}]}}]},{name:"union",raw:"'fill' | 'fillOpacity' | 'baseline' | 'gradient' | 'animate' | 'transition'",elements:[{name:"literal",value:"'fill'"},{name:"literal",value:"'fillOpacity'"},{name:"literal",value:"'baseline'"},{name:"literal",value:"'gradient'"},{name:"literal",value:"'animate'"},{name:"literal",value:"'transition'"}]}],raw:`Pick<
  AreaProps,
  'fill' | 'fillOpacity' | 'baseline' | 'gradient' | 'animate' | 'transition'
>`},{name:"signature",type:"object",raw:`{
  /**
   * Path of the area
   */
  d: SVGProps<SVGPathElement>['d'];
  /**
   * ID of the y-axis to use.
   * If not provided, defaults to the default y-axis.
   */
  yAxisId?: string;
}`,signature:{properties:[{key:"d",value:{name:"SVGProps['d']",raw:"SVGProps<SVGPathElement>['d']",required:!0},description:"Path of the area"},{key:"yAxisId",value:{name:"string",required:!1},description:`ID of the y-axis to use.
If not provided, defaults to the default y-axis.`}]}}]}],required:!1},description:"Custom component to render line area fill."},{key:"opacity",value:{name:"number",required:!1},description:`Opacity of the line's stroke.
Will also be applied to points and area fill.
@default 1`},{key:"points",value:{name:"union",raw:`| boolean
| ((defaults: PointBaseProps) => boolean | null | undefined | Partial<PointProps>)`,elements:[{name:"boolean"},{name:"unknown"}],required:!1},description:"Controls whether and how to render points at each data point in the series.\n- `true`: Show all points with default styling\n- `false` or `undefined`: Hide all points\n- Function: Called for every entry in the data array to customize individual points\n\n@param defaults - The default point props computed by the Line component\n@returns true for default point, false/null/undefined for no point, or Partial<PointProps> to customize"},{key:"connectNulls",value:{name:"boolean",required:!1},description:"When true, the area is connected across null values."},{key:"stroke",value:{name:"string",required:!1},description:`The color of the line.
@default color of the series or 'var(--color-fgPrimary)'`},{key:"strokeOpacity",value:{name:"number",required:!1},description:`Opacity of the line
@note when combined with gradient, both will be applied
@default 1`},{key:"strokeWidth",value:{name:"number",required:!1},description:`Width of the line
@default 2`},{key:"gradient",value:{name:"signature",type:"object",raw:`{
  /**
   * Axis that the gradient maps to.
   * @default 'y'
   */
  axis?: 'x' | 'y';
  /**
   * Gradient stops with colors and positions.
   * Can be an array of stop objects or a function that receives domain bounds.
   */
  stops: GradientStop[] | ((domain: AxisBounds) => GradientStop[]);
}`,signature:{properties:[{key:"axis",value:{name:"union",raw:"'x' | 'y'",elements:[{name:"literal",value:"'x'"},{name:"literal",value:"'y'"}],required:!1},description:`Axis that the gradient maps to.
@default 'y'`},{key:"stops",value:{name:"union",raw:"GradientStop[] | ((domain: AxisBounds) => GradientStop[])",elements:[{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /**
   * Position in data space.
   * Multiple stops at the same offset create hard color transitions.
   */
  offset: number;
  /**  Color at the stop (any valid CSS color) */
  color: string;
  /** Optional opacity (0-1). Defaults to 1. */
  opacity?: number;
}`,signature:{properties:[{key:"offset",value:{name:"number",required:!0},description:`Position in data space.
Multiple stops at the same offset create hard color transitions.`},{key:"color",value:{name:"string",required:!0},description:"Color at the stop (any valid CSS color)"},{key:"opacity",value:{name:"number",required:!1},description:"Optional opacity (0-1). Defaults to 1."}]}}],raw:"GradientStop[]"},{name:"unknown"}],required:!0},description:`Gradient stops with colors and positions.
Can be an array of stop objects or a function that receives domain bounds.`}]},required:!1},description:`Gradient configuration.
When provided, creates gradient or threshold-based coloring.`},{key:"animate",value:{name:"boolean",required:!1},description:`Whether to animate the line.
Overrides the animate value from the chart context.`}]}}]},{name:"signature",type:"object",raw:`{
  /**
   * Transition configuration for line animations.
   */
  transition?: Transition;
  /**
   * Handler for when a point is clicked.
   * Passed through to Point components rendered via points.
   */
  onPointClick?: PointProps['onClick'];
  /**
   * Custom style for the line.
   */
  style?: React.CSSProperties;
  /**
   * Custom className for the line.
   */
  className?: string;
}`,signature:{properties:[{key:"transition",value:{name:"Transition",required:!1},description:"Transition configuration for line animations."},{key:"onPointClick",value:{name:"intersection['onClick']",raw:"PointProps['onClick']",required:!1},description:`Handler for when a point is clicked.
Passed through to Point components rendered via points.`},{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom style for the line."},{key:"className",value:{name:"string",required:!1},description:"Custom className for the line."}]}}]},{name:"union",raw:`| 'stroke'
| 'strokeOpacity'
| 'strokeWidth'
| 'gradient'
| 'animate'
| 'transition'
| 'style'
| 'className'`,elements:[{name:"literal",value:"'stroke'"},{name:"literal",value:"'strokeOpacity'"},{name:"literal",value:"'strokeWidth'"},{name:"literal",value:"'gradient'"},{name:"literal",value:"'animate'"},{name:"literal",value:"'transition'"},{name:"literal",value:"'style'"},{name:"literal",value:"'className'"}]}],raw:`Pick<
  LineProps,
  | 'stroke'
  | 'strokeOpacity'
  | 'strokeWidth'
  | 'gradient'
  | 'animate'
  | 'transition'
  | 'style'
  | 'className'
>`},{name:"Pick",elements:[{name:"intersection",raw:`PathBaseProps &
Omit<
  SVGProps<SVGPathElement>,
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
  | 'onAnimationStartCapture'
  | 'onAnimationEndCapture'
  | 'onAnimationIterationCapture'
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragStart'
  | 'onDragCapture'
  | 'onDragEndCapture'
  | 'onDragStartCapture'
> & {
  /**
   * Offset added to the clip rect boundaries.
   */
  clipOffset?: number;
  /**
   * Custom clip path rect. If provided, this overrides the default chart rect for clipping.
   * Pass null to disable clipping.
   * @default drawingArea of chart + clipOffset
   */
  clipRect?: Rect | null;
  /**
   * Transition configuration for path.
   *
   * @example
   * // Timing based animation
   * transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
   *
   * @example
   * // Spring animation
   * transition={{ type: 'spring', damping: 20, stiffness: 300 }}
   */
  transition?: Transition;
}`,elements:[{name:"intersection",raw:`SharedProps & {
  /**
   * Whether to animate this path. Overrides the animate prop on the Chart component.
   */
  animate?: boolean;
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
   * Whether to animate this path. Overrides the animate prop on the Chart component.
   */
  animate?: boolean;
}`,signature:{properties:[{key:"animate",value:{name:"boolean",required:!1},description:"Whether to animate this path. Overrides the animate prop on the Chart component."}]}}]},{name:"Omit",elements:[{name:"SVGProps",elements:[{name:"SVGPathElement"}],raw:"SVGProps<SVGPathElement>"},{name:"union",raw:`| 'onAnimationStart'
| 'onAnimationEnd'
| 'onAnimationIteration'
| 'onAnimationStartCapture'
| 'onAnimationEndCapture'
| 'onAnimationIterationCapture'
| 'onDrag'
| 'onDragEnd'
| 'onDragStart'
| 'onDragCapture'
| 'onDragEndCapture'
| 'onDragStartCapture'`,elements:[{name:"literal",value:"'onAnimationStart'"},{name:"literal",value:"'onAnimationEnd'"},{name:"literal",value:"'onAnimationIteration'"},{name:"literal",value:"'onAnimationStartCapture'"},{name:"literal",value:"'onAnimationEndCapture'"},{name:"literal",value:"'onAnimationIterationCapture'"},{name:"literal",value:"'onDrag'"},{name:"literal",value:"'onDragEnd'"},{name:"literal",value:"'onDragStart'"},{name:"literal",value:"'onDragCapture'"},{name:"literal",value:"'onDragEndCapture'"},{name:"literal",value:"'onDragStartCapture'"}]}],raw:`Omit<
  SVGProps<SVGPathElement>,
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
  | 'onAnimationStartCapture'
  | 'onAnimationEndCapture'
  | 'onAnimationIterationCapture'
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragStart'
  | 'onDragCapture'
  | 'onDragEndCapture'
  | 'onDragStartCapture'
>`},{name:"signature",type:"object",raw:`{
  /**
   * Offset added to the clip rect boundaries.
   */
  clipOffset?: number;
  /**
   * Custom clip path rect. If provided, this overrides the default chart rect for clipping.
   * Pass null to disable clipping.
   * @default drawingArea of chart + clipOffset
   */
  clipRect?: Rect | null;
  /**
   * Transition configuration for path.
   *
   * @example
   * // Timing based animation
   * transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
   *
   * @example
   * // Spring animation
   * transition={{ type: 'spring', damping: 20, stiffness: 300 }}
   */
  transition?: Transition;
}`,signature:{properties:[{key:"clipOffset",value:{name:"number",required:!1},description:"Offset added to the clip rect boundaries."},{key:"clipRect",value:{name:"union",raw:"Rect | null",elements:[{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
  width: number;
  height: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!1},{name:"null"}],required:!1},description:`Custom clip path rect. If provided, this overrides the default chart rect for clipping.
Pass null to disable clipping.
@default drawingArea of chart + clipOffset`},{key:"transition",value:{name:"Transition",required:!1},description:`Transition configuration for path.

@example
// Timing based animation
transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}

@example
// Spring animation
transition={{ type: 'spring', damping: 20, stiffness: 300 }}`}]}}]},{name:"union",raw:"'clipRect' | 'strokeLinecap'",elements:[{name:"literal",value:"'clipRect'"},{name:"literal",value:"'strokeLinecap'"}]}],raw:"Pick<PathProps, 'clipRect' | 'strokeLinecap'>"},{name:"signature",type:"object",raw:`{
  /**
   * Path of the line.
   */
  d: SVGProps<SVGPathElement>['d'];
  /**
   * ID of the y-axis to use.
   * If not provided, defaults to the default y-axis.
   */
  yAxisId?: string;
}`,signature:{properties:[{key:"d",value:{name:"SVGProps['d']",raw:"SVGProps<SVGPathElement>['d']",required:!0},description:"Path of the line."},{key:"yAxisId",value:{name:"string",required:!1},description:`ID of the y-axis to use.
If not provided, defaults to the default y-axis.`}]}}]}],required:!1},description:`Component to render the axis line.
@default SolidLine`},{key:"TickMarkLineComponent",value:{name:"ReactFC",raw:"React.FC<LineComponentProps>",elements:[{name:"intersection",raw:`Pick<
  LineProps,
  | 'stroke'
  | 'strokeOpacity'
  | 'strokeWidth'
  | 'gradient'
  | 'animate'
  | 'transition'
  | 'style'
  | 'className'
> &
  Pick<PathProps, 'clipRect' | 'strokeLinecap'> & {
    /**
     * Path of the line.
     */
    d: SVGProps<SVGPathElement>['d'];
    /**
     * ID of the y-axis to use.
     * If not provided, defaults to the default y-axis.
     */
    yAxisId?: string;
  }`,elements:[{name:"Pick",elements:[{name:"intersection",raw:`LineBaseProps & {
  /**
   * Transition configuration for line animations.
   */
  transition?: Transition;
  /**
   * Handler for when a point is clicked.
   * Passed through to Point components rendered via points.
   */
  onPointClick?: PointProps['onClick'];
  /**
   * Custom style for the line.
   */
  style?: React.CSSProperties;
  /**
   * Custom className for the line.
   */
  className?: string;
}`,elements:[{name:"intersection",raw:`SharedProps & {
  /**
   * The ID of the series to render. Will be used to find the data from the chart context.
   */
  seriesId: string;
  /**
   * The curve interpolation method to use for the line.
   * @default 'bump'
   */
  curve?: ChartPathCurveType;
  /**
   * The type of line to render.
   * @default 'solid'
   */
  type?: 'solid' | 'dotted';
  /**
   * Whether to show area fill under the line.
   */
  showArea?: boolean;
  /**
   * The type of area fill to add to the line.
   * @default 'gradient'
   */
  areaType?: 'gradient' | 'solid' | 'dotted';
  /**
   * Baseline value for the area.
   * When set, overrides the default baseline.
   */
  areaBaseline?: number;
  /**
   * Component to render the line.
   * Takes precedence over the type prop if provided.
   */
  LineComponent?: LineComponent;
  /**
   * Custom component to render line area fill.
   */
  AreaComponent?: AreaComponent;
  /**
   * Opacity of the line's stroke.
   * Will also be applied to points and area fill.
   * @default 1
   */
  opacity?: number;
  /**
   * Controls whether and how to render points at each data point in the series.
   * - \`true\`: Show all points with default styling
   * - \`false\` or \`undefined\`: Hide all points
   * - Function: Called for every entry in the data array to customize individual points
   *
   * @param defaults - The default point props computed by the Line component
   * @returns true for default point, false/null/undefined for no point, or Partial<PointProps> to customize
   */
  points?:
    | boolean
    | ((defaults: PointBaseProps) => boolean | null | undefined | Partial<PointProps>);
  /**
   * When true, the area is connected across null values.
   */
  connectNulls?: boolean;
  /**
   * The color of the line.
   * @default color of the series or 'var(--color-fgPrimary)'
   */
  stroke?: string;
  /**
   * Opacity of the line
   * @note when combined with gradient, both will be applied
   * @default 1
   */
  strokeOpacity?: number;
  /**
   * Width of the line
   * @default 2
   */
  strokeWidth?: number;
  /**
   * Gradient configuration.
   * When provided, creates gradient or threshold-based coloring.
   */
  gradient?: GradientDefinition;
  /**
   * Whether to animate the line.
   * Overrides the animate value from the chart context.
   */
  animate?: boolean;
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
   * The ID of the series to render. Will be used to find the data from the chart context.
   */
  seriesId: string;
  /**
   * The curve interpolation method to use for the line.
   * @default 'bump'
   */
  curve?: ChartPathCurveType;
  /**
   * The type of line to render.
   * @default 'solid'
   */
  type?: 'solid' | 'dotted';
  /**
   * Whether to show area fill under the line.
   */
  showArea?: boolean;
  /**
   * The type of area fill to add to the line.
   * @default 'gradient'
   */
  areaType?: 'gradient' | 'solid' | 'dotted';
  /**
   * Baseline value for the area.
   * When set, overrides the default baseline.
   */
  areaBaseline?: number;
  /**
   * Component to render the line.
   * Takes precedence over the type prop if provided.
   */
  LineComponent?: LineComponent;
  /**
   * Custom component to render line area fill.
   */
  AreaComponent?: AreaComponent;
  /**
   * Opacity of the line's stroke.
   * Will also be applied to points and area fill.
   * @default 1
   */
  opacity?: number;
  /**
   * Controls whether and how to render points at each data point in the series.
   * - \`true\`: Show all points with default styling
   * - \`false\` or \`undefined\`: Hide all points
   * - Function: Called for every entry in the data array to customize individual points
   *
   * @param defaults - The default point props computed by the Line component
   * @returns true for default point, false/null/undefined for no point, or Partial<PointProps> to customize
   */
  points?:
    | boolean
    | ((defaults: PointBaseProps) => boolean | null | undefined | Partial<PointProps>);
  /**
   * When true, the area is connected across null values.
   */
  connectNulls?: boolean;
  /**
   * The color of the line.
   * @default color of the series or 'var(--color-fgPrimary)'
   */
  stroke?: string;
  /**
   * Opacity of the line
   * @note when combined with gradient, both will be applied
   * @default 1
   */
  strokeOpacity?: number;
  /**
   * Width of the line
   * @default 2
   */
  strokeWidth?: number;
  /**
   * Gradient configuration.
   * When provided, creates gradient or threshold-based coloring.
   */
  gradient?: GradientDefinition;
  /**
   * Whether to animate the line.
   * Overrides the animate value from the chart context.
   */
  animate?: boolean;
}`,signature:{properties:[{key:"seriesId",value:{name:"string",required:!0},description:"The ID of the series to render. Will be used to find the data from the chart context."},{key:"curve",value:{name:"union",raw:`| 'bump'
| 'catmullRom'
| 'linear'
| 'linearClosed'
| 'monotone'
| 'natural'
| 'step'
| 'stepBefore'
| 'stepAfter'`,elements:[{name:"literal",value:"'bump'"},{name:"literal",value:"'catmullRom'"},{name:"literal",value:"'linear'"},{name:"literal",value:"'linearClosed'"},{name:"literal",value:"'monotone'"},{name:"literal",value:"'natural'"},{name:"literal",value:"'step'"},{name:"literal",value:"'stepBefore'"},{name:"literal",value:"'stepAfter'"}],required:!1},description:`The curve interpolation method to use for the line.
@default 'bump'`},{key:"type",value:{name:"union",raw:"'solid' | 'dotted'",elements:[{name:"literal",value:"'solid'"},{name:"literal",value:"'dotted'"}],required:!1},description:`The type of line to render.
@default 'solid'`},{key:"showArea",value:{name:"boolean",required:!1},description:"Whether to show area fill under the line."},{key:"areaType",value:{name:"union",raw:"'gradient' | 'solid' | 'dotted'",elements:[{name:"literal",value:"'gradient'"},{name:"literal",value:"'solid'"},{name:"literal",value:"'dotted'"}],required:!1},description:`The type of area fill to add to the line.
@default 'gradient'`},{key:"areaBaseline",value:{name:"number",required:!1},description:`Baseline value for the area.
When set, overrides the default baseline.`},{key:"LineComponent",value:{name:"LineComponent",required:!1},description:`Component to render the line.
Takes precedence over the type prop if provided.`},{key:"AreaComponent",value:{name:"ReactFC",raw:"React.FC<AreaComponentProps>",elements:[{name:"intersection",raw:`Pick<
  AreaProps,
  'fill' | 'fillOpacity' | 'baseline' | 'gradient' | 'animate' | 'transition'
> & {
  /**
   * Path of the area
   */
  d: SVGProps<SVGPathElement>['d'];
  /**
   * ID of the y-axis to use.
   * If not provided, defaults to the default y-axis.
   */
  yAxisId?: string;
}`,elements:[{name:"Pick",elements:[{name:"intersection",raw:`AreaBaseProps & {
  /**
   * Transition configuration for path animations.
   */
  transition?: Transition;
}`,elements:[{name:"signature",type:"object",raw:`{
  /**
   * The ID of the series to render. Will be used to find the data from the chart context.
   */
  seriesId: string;
  /**
   * The curve interpolation method to use for the line.
   * @default 'bump'
   */
  curve?: ChartPathCurveType;
  /**
   * The type of area to render.
   * @default 'solid'
   */
  type?: 'solid' | 'dotted' | 'gradient';
  /**
   * Component to render the area.
   * Takes precedence over the type prop if provided.
   */
  AreaComponent?: AreaComponent;
  /**
   * When true, the area is connected across null values.
   */
  connectNulls?: boolean;
  /**
   * The color of the area.
   * @default color of the series or 'var(--color-fgPrimary)'
   */
  fill?: string;
  /**
   * Opacity of the area
   * @note when combined with gradient, both will be applied
   * @default 1
   */
  fillOpacity?: number;
  /**
   * Baseline value for the gradient.
   * When set, overrides the default baseline.
   */
  baseline?: number;
  /**
   * Gradient configuration.
   * When provided, creates gradient or threshold-based coloring.
   */
  gradient?: GradientDefinition;
  /**
   * Whether to animate the area.
   * Overrides the animate value from the chart context.
   */
  animate?: boolean;
}`,signature:{properties:[{key:"seriesId",value:{name:"string",required:!0},description:"The ID of the series to render. Will be used to find the data from the chart context."},{key:"curve",value:{name:"union",raw:`| 'bump'
| 'catmullRom'
| 'linear'
| 'linearClosed'
| 'monotone'
| 'natural'
| 'step'
| 'stepBefore'
| 'stepAfter'`,elements:[{name:"literal",value:"'bump'"},{name:"literal",value:"'catmullRom'"},{name:"literal",value:"'linear'"},{name:"literal",value:"'linearClosed'"},{name:"literal",value:"'monotone'"},{name:"literal",value:"'natural'"},{name:"literal",value:"'step'"},{name:"literal",value:"'stepBefore'"},{name:"literal",value:"'stepAfter'"}],required:!1},description:`The curve interpolation method to use for the line.
@default 'bump'`},{key:"type",value:{name:"union",raw:"'solid' | 'dotted' | 'gradient'",elements:[{name:"literal",value:"'solid'"},{name:"literal",value:"'dotted'"},{name:"literal",value:"'gradient'"}],required:!1},description:`The type of area to render.
@default 'solid'`},{key:"AreaComponent",value:{name:"AreaComponent",required:!1},description:`Component to render the area.
Takes precedence over the type prop if provided.`},{key:"connectNulls",value:{name:"boolean",required:!1},description:"When true, the area is connected across null values."},{key:"fill",value:{name:"string",required:!1},description:`The color of the area.
@default color of the series or 'var(--color-fgPrimary)'`},{key:"fillOpacity",value:{name:"number",required:!1},description:`Opacity of the area
@note when combined with gradient, both will be applied
@default 1`},{key:"baseline",value:{name:"number",required:!1},description:`Baseline value for the gradient.
When set, overrides the default baseline.`},{key:"gradient",value:{name:"signature",type:"object",raw:`{
  /**
   * Axis that the gradient maps to.
   * @default 'y'
   */
  axis?: 'x' | 'y';
  /**
   * Gradient stops with colors and positions.
   * Can be an array of stop objects or a function that receives domain bounds.
   */
  stops: GradientStop[] | ((domain: AxisBounds) => GradientStop[]);
}`,signature:{properties:[{key:"axis",value:{name:"union",raw:"'x' | 'y'",elements:[{name:"literal",value:"'x'"},{name:"literal",value:"'y'"}],required:!1},description:`Axis that the gradient maps to.
@default 'y'`},{key:"stops",value:{name:"union",raw:"GradientStop[] | ((domain: AxisBounds) => GradientStop[])",elements:[{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /**
   * Position in data space.
   * Multiple stops at the same offset create hard color transitions.
   */
  offset: number;
  /**  Color at the stop (any valid CSS color) */
  color: string;
  /** Optional opacity (0-1). Defaults to 1. */
  opacity?: number;
}`,signature:{properties:[{key:"offset",value:{name:"number",required:!0},description:`Position in data space.
Multiple stops at the same offset create hard color transitions.`},{key:"color",value:{name:"string",required:!0},description:"Color at the stop (any valid CSS color)"},{key:"opacity",value:{name:"number",required:!1},description:"Optional opacity (0-1). Defaults to 1."}]}}],raw:"GradientStop[]"},{name:"unknown"}],required:!0},description:`Gradient stops with colors and positions.
Can be an array of stop objects or a function that receives domain bounds.`}]},required:!1},description:`Gradient configuration.
When provided, creates gradient or threshold-based coloring.`},{key:"animate",value:{name:"boolean",required:!1},description:`Whether to animate the area.
Overrides the animate value from the chart context.`}]}},{name:"signature",type:"object",raw:`{
  /**
   * Transition configuration for path animations.
   */
  transition?: Transition;
}`,signature:{properties:[{key:"transition",value:{name:"Transition",required:!1},description:"Transition configuration for path animations."}]}}]},{name:"union",raw:"'fill' | 'fillOpacity' | 'baseline' | 'gradient' | 'animate' | 'transition'",elements:[{name:"literal",value:"'fill'"},{name:"literal",value:"'fillOpacity'"},{name:"literal",value:"'baseline'"},{name:"literal",value:"'gradient'"},{name:"literal",value:"'animate'"},{name:"literal",value:"'transition'"}]}],raw:`Pick<
  AreaProps,
  'fill' | 'fillOpacity' | 'baseline' | 'gradient' | 'animate' | 'transition'
>`},{name:"signature",type:"object",raw:`{
  /**
   * Path of the area
   */
  d: SVGProps<SVGPathElement>['d'];
  /**
   * ID of the y-axis to use.
   * If not provided, defaults to the default y-axis.
   */
  yAxisId?: string;
}`,signature:{properties:[{key:"d",value:{name:"SVGProps['d']",raw:"SVGProps<SVGPathElement>['d']",required:!0},description:"Path of the area"},{key:"yAxisId",value:{name:"string",required:!1},description:`ID of the y-axis to use.
If not provided, defaults to the default y-axis.`}]}}]}],required:!1},description:"Custom component to render line area fill."},{key:"opacity",value:{name:"number",required:!1},description:`Opacity of the line's stroke.
Will also be applied to points and area fill.
@default 1`},{key:"points",value:{name:"union",raw:`| boolean
| ((defaults: PointBaseProps) => boolean | null | undefined | Partial<PointProps>)`,elements:[{name:"boolean"},{name:"unknown"}],required:!1},description:"Controls whether and how to render points at each data point in the series.\n- `true`: Show all points with default styling\n- `false` or `undefined`: Hide all points\n- Function: Called for every entry in the data array to customize individual points\n\n@param defaults - The default point props computed by the Line component\n@returns true for default point, false/null/undefined for no point, or Partial<PointProps> to customize"},{key:"connectNulls",value:{name:"boolean",required:!1},description:"When true, the area is connected across null values."},{key:"stroke",value:{name:"string",required:!1},description:`The color of the line.
@default color of the series or 'var(--color-fgPrimary)'`},{key:"strokeOpacity",value:{name:"number",required:!1},description:`Opacity of the line
@note when combined with gradient, both will be applied
@default 1`},{key:"strokeWidth",value:{name:"number",required:!1},description:`Width of the line
@default 2`},{key:"gradient",value:{name:"signature",type:"object",raw:`{
  /**
   * Axis that the gradient maps to.
   * @default 'y'
   */
  axis?: 'x' | 'y';
  /**
   * Gradient stops with colors and positions.
   * Can be an array of stop objects or a function that receives domain bounds.
   */
  stops: GradientStop[] | ((domain: AxisBounds) => GradientStop[]);
}`,signature:{properties:[{key:"axis",value:{name:"union",raw:"'x' | 'y'",elements:[{name:"literal",value:"'x'"},{name:"literal",value:"'y'"}],required:!1},description:`Axis that the gradient maps to.
@default 'y'`},{key:"stops",value:{name:"union",raw:"GradientStop[] | ((domain: AxisBounds) => GradientStop[])",elements:[{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  /**
   * Position in data space.
   * Multiple stops at the same offset create hard color transitions.
   */
  offset: number;
  /**  Color at the stop (any valid CSS color) */
  color: string;
  /** Optional opacity (0-1). Defaults to 1. */
  opacity?: number;
}`,signature:{properties:[{key:"offset",value:{name:"number",required:!0},description:`Position in data space.
Multiple stops at the same offset create hard color transitions.`},{key:"color",value:{name:"string",required:!0},description:"Color at the stop (any valid CSS color)"},{key:"opacity",value:{name:"number",required:!1},description:"Optional opacity (0-1). Defaults to 1."}]}}],raw:"GradientStop[]"},{name:"unknown"}],required:!0},description:`Gradient stops with colors and positions.
Can be an array of stop objects or a function that receives domain bounds.`}]},required:!1},description:`Gradient configuration.
When provided, creates gradient or threshold-based coloring.`},{key:"animate",value:{name:"boolean",required:!1},description:`Whether to animate the line.
Overrides the animate value from the chart context.`}]}}]},{name:"signature",type:"object",raw:`{
  /**
   * Transition configuration for line animations.
   */
  transition?: Transition;
  /**
   * Handler for when a point is clicked.
   * Passed through to Point components rendered via points.
   */
  onPointClick?: PointProps['onClick'];
  /**
   * Custom style for the line.
   */
  style?: React.CSSProperties;
  /**
   * Custom className for the line.
   */
  className?: string;
}`,signature:{properties:[{key:"transition",value:{name:"Transition",required:!1},description:"Transition configuration for line animations."},{key:"onPointClick",value:{name:"intersection['onClick']",raw:"PointProps['onClick']",required:!1},description:`Handler for when a point is clicked.
Passed through to Point components rendered via points.`},{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom style for the line."},{key:"className",value:{name:"string",required:!1},description:"Custom className for the line."}]}}]},{name:"union",raw:`| 'stroke'
| 'strokeOpacity'
| 'strokeWidth'
| 'gradient'
| 'animate'
| 'transition'
| 'style'
| 'className'`,elements:[{name:"literal",value:"'stroke'"},{name:"literal",value:"'strokeOpacity'"},{name:"literal",value:"'strokeWidth'"},{name:"literal",value:"'gradient'"},{name:"literal",value:"'animate'"},{name:"literal",value:"'transition'"},{name:"literal",value:"'style'"},{name:"literal",value:"'className'"}]}],raw:`Pick<
  LineProps,
  | 'stroke'
  | 'strokeOpacity'
  | 'strokeWidth'
  | 'gradient'
  | 'animate'
  | 'transition'
  | 'style'
  | 'className'
>`},{name:"Pick",elements:[{name:"intersection",raw:`PathBaseProps &
Omit<
  SVGProps<SVGPathElement>,
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
  | 'onAnimationStartCapture'
  | 'onAnimationEndCapture'
  | 'onAnimationIterationCapture'
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragStart'
  | 'onDragCapture'
  | 'onDragEndCapture'
  | 'onDragStartCapture'
> & {
  /**
   * Offset added to the clip rect boundaries.
   */
  clipOffset?: number;
  /**
   * Custom clip path rect. If provided, this overrides the default chart rect for clipping.
   * Pass null to disable clipping.
   * @default drawingArea of chart + clipOffset
   */
  clipRect?: Rect | null;
  /**
   * Transition configuration for path.
   *
   * @example
   * // Timing based animation
   * transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
   *
   * @example
   * // Spring animation
   * transition={{ type: 'spring', damping: 20, stiffness: 300 }}
   */
  transition?: Transition;
}`,elements:[{name:"intersection",raw:`SharedProps & {
  /**
   * Whether to animate this path. Overrides the animate prop on the Chart component.
   */
  animate?: boolean;
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
   * Whether to animate this path. Overrides the animate prop on the Chart component.
   */
  animate?: boolean;
}`,signature:{properties:[{key:"animate",value:{name:"boolean",required:!1},description:"Whether to animate this path. Overrides the animate prop on the Chart component."}]}}]},{name:"Omit",elements:[{name:"SVGProps",elements:[{name:"SVGPathElement"}],raw:"SVGProps<SVGPathElement>"},{name:"union",raw:`| 'onAnimationStart'
| 'onAnimationEnd'
| 'onAnimationIteration'
| 'onAnimationStartCapture'
| 'onAnimationEndCapture'
| 'onAnimationIterationCapture'
| 'onDrag'
| 'onDragEnd'
| 'onDragStart'
| 'onDragCapture'
| 'onDragEndCapture'
| 'onDragStartCapture'`,elements:[{name:"literal",value:"'onAnimationStart'"},{name:"literal",value:"'onAnimationEnd'"},{name:"literal",value:"'onAnimationIteration'"},{name:"literal",value:"'onAnimationStartCapture'"},{name:"literal",value:"'onAnimationEndCapture'"},{name:"literal",value:"'onAnimationIterationCapture'"},{name:"literal",value:"'onDrag'"},{name:"literal",value:"'onDragEnd'"},{name:"literal",value:"'onDragStart'"},{name:"literal",value:"'onDragCapture'"},{name:"literal",value:"'onDragEndCapture'"},{name:"literal",value:"'onDragStartCapture'"}]}],raw:`Omit<
  SVGProps<SVGPathElement>,
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
  | 'onAnimationStartCapture'
  | 'onAnimationEndCapture'
  | 'onAnimationIterationCapture'
  | 'onDrag'
  | 'onDragEnd'
  | 'onDragStart'
  | 'onDragCapture'
  | 'onDragEndCapture'
  | 'onDragStartCapture'
>`},{name:"signature",type:"object",raw:`{
  /**
   * Offset added to the clip rect boundaries.
   */
  clipOffset?: number;
  /**
   * Custom clip path rect. If provided, this overrides the default chart rect for clipping.
   * Pass null to disable clipping.
   * @default drawingArea of chart + clipOffset
   */
  clipRect?: Rect | null;
  /**
   * Transition configuration for path.
   *
   * @example
   * // Timing based animation
   * transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}
   *
   * @example
   * // Spring animation
   * transition={{ type: 'spring', damping: 20, stiffness: 300 }}
   */
  transition?: Transition;
}`,signature:{properties:[{key:"clipOffset",value:{name:"number",required:!1},description:"Offset added to the clip rect boundaries."},{key:"clipRect",value:{name:"union",raw:"Rect | null",elements:[{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
  width: number;
  height: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!1},{name:"null"}],required:!1},description:`Custom clip path rect. If provided, this overrides the default chart rect for clipping.
Pass null to disable clipping.
@default drawingArea of chart + clipOffset`},{key:"transition",value:{name:"Transition",required:!1},description:`Transition configuration for path.

@example
// Timing based animation
transition={{ type: 'tween', duration: 0.2, ease: 'easeOut' }}

@example
// Spring animation
transition={{ type: 'spring', damping: 20, stiffness: 300 }}`}]}}]},{name:"union",raw:"'clipRect' | 'strokeLinecap'",elements:[{name:"literal",value:"'clipRect'"},{name:"literal",value:"'strokeLinecap'"}]}],raw:"Pick<PathProps, 'clipRect' | 'strokeLinecap'>"},{name:"signature",type:"object",raw:`{
  /**
   * Path of the line.
   */
  d: SVGProps<SVGPathElement>['d'];
  /**
   * ID of the y-axis to use.
   * If not provided, defaults to the default y-axis.
   */
  yAxisId?: string;
}`,signature:{properties:[{key:"d",value:{name:"SVGProps['d']",raw:"SVGProps<SVGPathElement>['d']",required:!0},description:"Path of the line."},{key:"yAxisId",value:{name:"string",required:!1},description:`ID of the y-axis to use.
If not provided, defaults to the default y-axis.`}]}}]}],required:!1},description:`Component to render the tick marks.
@default SolidLine`},{key:"tickLabelFormatter",value:{name:"signature",type:"function",raw:"(value: number) => ChartTextChildren",signature:{arguments:[{type:{name:"number"},name:"value"}],return:{name:"union",raw:`| string
| number
| null
| undefined
| ValidChartTextChildElements
| ValidChartTextChildElements[]`,elements:[{name:"string"},{name:"number"},{name:"null"},{name:"undefined"},{name:"union",raw:`| React.ReactElement<React.SVGProps<SVGTSpanElement>, 'tspan'>
| React.ReactElement<React.SVGProps<SVGTextPathElement>, 'textPath'>`,elements:[{name:"ReactReactElement",raw:"React.ReactElement<React.SVGProps<SVGTSpanElement>, 'tspan'>",elements:[{name:"ReactSVGProps",raw:"React.SVGProps<SVGTSpanElement>",elements:[{name:"SVGTSpanElement"}]},{name:"literal",value:"'tspan'"}]},{name:"ReactReactElement",raw:"React.ReactElement<React.SVGProps<SVGTextPathElement>, 'textPath'>",elements:[{name:"ReactSVGProps",raw:"React.SVGProps<SVGTextPathElement>",elements:[{name:"SVGTextPathElement"}]},{name:"literal",value:"'textPath'"}]}]},{name:"Array",elements:[{name:"union",raw:`| React.ReactElement<React.SVGProps<SVGTSpanElement>, 'tspan'>
| React.ReactElement<React.SVGProps<SVGTextPathElement>, 'textPath'>`,elements:[{name:"ReactReactElement",raw:"React.ReactElement<React.SVGProps<SVGTSpanElement>, 'tspan'>",elements:[{name:"ReactSVGProps",raw:"React.SVGProps<SVGTSpanElement>",elements:[{name:"SVGTSpanElement"}]},{name:"literal",value:"'tspan'"}]},{name:"ReactReactElement",raw:"React.ReactElement<React.SVGProps<SVGTextPathElement>, 'textPath'>",elements:[{name:"ReactSVGProps",raw:"React.SVGProps<SVGTextPathElement>",elements:[{name:"SVGTextPathElement"}]},{name:"literal",value:"'textPath'"}]}]}],raw:"ValidChartTextChildElements[]"}],required:!1}},required:!1},description:`Formatter function for axis tick values.
Tick values will be wrapped in ChartText component.

@example
// XAxis
tickLabelFormatter: (index) => {
  if (index % 12 === 0) {
    return <tspan style={{ fontWeight: 'bold' }}>\${prices[index]}</tspan>;
  }
  return \`$\${prices[index]}\`;
}

@example
// YAxis
tickLabelFormatter: (value) => \`$\${prices[value]}\``},{key:"TickLabelComponent",value:{name:"ReactFC",raw:"React.FC<AxisTickLabelComponentProps>",elements:[{name:"Pick",elements:[{name:"intersection",raw:`ChartTextBaseProps &
Pick<BoxProps<'g'>, 'font' | 'fontFamily' | 'fontSize' | 'fontWeight' | 'opacity'> & {
  /**
   * The desired x offset in SVG pixels.
   */
  dx?: number;
  /**
   * The desired y offset in SVG pixels.
   */
  dy?: number;
  /**
   * The text content to display.
   */
  children: ChartTextChildren;
  /**
   * The desired x position in SVG pixels.
   * @note Text will be automatically positioned to fit within bounds unless \`disableRepositioning\` is true.
   */
  x: number;
  /**
   * The desired y position in SVG pixels.
   * @note Text will be automatically positioned to fit within bounds unless \`disableRepositioning\` is true.
   */
  y: number;
  /**
   * Horizontal alignment of the component.
   * @default 'center'
   */
  horizontalAlignment?: TextHorizontalAlignment;
  /**
   * Vertical alignment of the component.
   * @default 'middle'
   */
  verticalAlignment?: TextVerticalAlignment;
  style?: React.CSSProperties;
  styles?: {
    root?: React.CSSProperties;
    text?: React.CSSProperties;
    backgroundRect?: React.CSSProperties;
  };
  className?: string;
  classNames?: {
    root?: string;
    text?: string;
    backgroundRect?: string;
  };
}`,elements:[{name:"intersection",raw:`SharedProps & {
  /**
   * The text color.
   * @default 'var(--color-fgMuted)'
   */
  color?: string;
  /**
   * The background color of the text's background rectangle.
   * @default 'var(--color-bg)' if elevated, otherwise 'transparent'
   */
  background?: string;
  /**
   * Whether the text should have an elevated appearance with a shadow.
   * @default false
   */
  elevated?: boolean;
  /**
   * When true, disables automatic repositioning to fit within bounds.
   */
  disableRepositioning?: boolean;
  /**
   * Optional bounds rectangle to constrain the text within. If provided, text will be positioned
   * to stay within these bounds. Defaults to the full chart bounds when not provided.
   */
  bounds?: Rect;
  /**
   * Callback fired when text dimensions change.
   * Used for collision detection and smart positioning.
   * Returns the adjusted position and dimensions.
   */
  onDimensionsChange?: (rect: Rect) => void;
  /**
   * Inset around the text content for the background rect.
   * Only affects the background, text position remains unchanged.
   */
  inset?: number | ChartInset;
  /**
   * Border radius for the background rectangle.
   * @default 4
   */
  borderRadius?: number;
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
   * The text color.
   * @default 'var(--color-fgMuted)'
   */
  color?: string;
  /**
   * The background color of the text's background rectangle.
   * @default 'var(--color-bg)' if elevated, otherwise 'transparent'
   */
  background?: string;
  /**
   * Whether the text should have an elevated appearance with a shadow.
   * @default false
   */
  elevated?: boolean;
  /**
   * When true, disables automatic repositioning to fit within bounds.
   */
  disableRepositioning?: boolean;
  /**
   * Optional bounds rectangle to constrain the text within. If provided, text will be positioned
   * to stay within these bounds. Defaults to the full chart bounds when not provided.
   */
  bounds?: Rect;
  /**
   * Callback fired when text dimensions change.
   * Used for collision detection and smart positioning.
   * Returns the adjusted position and dimensions.
   */
  onDimensionsChange?: (rect: Rect) => void;
  /**
   * Inset around the text content for the background rect.
   * Only affects the background, text position remains unchanged.
   */
  inset?: number | ChartInset;
  /**
   * Border radius for the background rectangle.
   * @default 4
   */
  borderRadius?: number;
}`,signature:{properties:[{key:"color",value:{name:"string",required:!1},description:`The text color.
@default 'var(--color-fgMuted)'`},{key:"background",value:{name:"string",required:!1},description:`The background color of the text's background rectangle.
@default 'var(--color-bg)' if elevated, otherwise 'transparent'`},{key:"elevated",value:{name:"boolean",required:!1},description:`Whether the text should have an elevated appearance with a shadow.
@default false`},{key:"disableRepositioning",value:{name:"boolean",required:!1},description:"When true, disables automatic repositioning to fit within bounds."},{key:"bounds",value:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
  width: number;
  height: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!1},description:`Optional bounds rectangle to constrain the text within. If provided, text will be positioned
to stay within these bounds. Defaults to the full chart bounds when not provided.`},{key:"onDimensionsChange",value:{name:"signature",type:"function",raw:"(rect: Rect) => void",signature:{arguments:[{type:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
  width: number;
  height: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]},required:!1},name:"rect"}],return:{name:"void"}},required:!1},description:`Callback fired when text dimensions change.
Used for collision detection and smart positioning.
Returns the adjusted position and dimensions.`},{key:"inset",value:{name:"union",raw:"number | ChartInset",elements:[{name:"number"},{name:"signature",type:"object",raw:`{
  top: number;
  left: number;
  bottom: number;
  right: number;
}`,signature:{properties:[{key:"top",value:{name:"number",required:!0}},{key:"left",value:{name:"number",required:!0}},{key:"bottom",value:{name:"number",required:!0}},{key:"right",value:{name:"number",required:!0}}]}}],required:!1},description:`Inset around the text content for the background rect.
Only affects the background, text position remains unchanged.`},{key:"borderRadius",value:{name:"number",required:!1},description:`Border radius for the background rectangle.
@default 4`}]}}]},{name:"Pick",elements:[{name:"Polymorphic.Props",elements:[{name:"literal",value:"'g'"},{name:"intersection",raw:`StyleProps &
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
>`},{name:"union",raw:"'font' | 'fontFamily' | 'fontSize' | 'fontWeight' | 'opacity'",elements:[{name:"literal",value:"'font'"},{name:"literal",value:"'fontFamily'"},{name:"literal",value:"'fontSize'"},{name:"literal",value:"'fontWeight'"},{name:"literal",value:"'opacity'"}]}],raw:"Pick<BoxProps<'g'>, 'font' | 'fontFamily' | 'fontSize' | 'fontWeight' | 'opacity'>"},{name:"signature",type:"object",raw:`{
  /**
   * The desired x offset in SVG pixels.
   */
  dx?: number;
  /**
   * The desired y offset in SVG pixels.
   */
  dy?: number;
  /**
   * The text content to display.
   */
  children: ChartTextChildren;
  /**
   * The desired x position in SVG pixels.
   * @note Text will be automatically positioned to fit within bounds unless \`disableRepositioning\` is true.
   */
  x: number;
  /**
   * The desired y position in SVG pixels.
   * @note Text will be automatically positioned to fit within bounds unless \`disableRepositioning\` is true.
   */
  y: number;
  /**
   * Horizontal alignment of the component.
   * @default 'center'
   */
  horizontalAlignment?: TextHorizontalAlignment;
  /**
   * Vertical alignment of the component.
   * @default 'middle'
   */
  verticalAlignment?: TextVerticalAlignment;
  style?: React.CSSProperties;
  styles?: {
    root?: React.CSSProperties;
    text?: React.CSSProperties;
    backgroundRect?: React.CSSProperties;
  };
  className?: string;
  classNames?: {
    root?: string;
    text?: string;
    backgroundRect?: string;
  };
}`,signature:{properties:[{key:"dx",value:{name:"number",required:!1},description:"The desired x offset in SVG pixels."},{key:"dy",value:{name:"number",required:!1},description:"The desired y offset in SVG pixels."},{key:"children",value:{name:"union",raw:`| string
| number
| null
| undefined
| ValidChartTextChildElements
| ValidChartTextChildElements[]`,elements:[{name:"string"},{name:"number"},{name:"null"},{name:"undefined"},{name:"union",raw:`| React.ReactElement<React.SVGProps<SVGTSpanElement>, 'tspan'>
| React.ReactElement<React.SVGProps<SVGTextPathElement>, 'textPath'>`,elements:[{name:"ReactReactElement",raw:"React.ReactElement<React.SVGProps<SVGTSpanElement>, 'tspan'>",elements:[{name:"ReactSVGProps",raw:"React.SVGProps<SVGTSpanElement>",elements:[{name:"SVGTSpanElement"}]},{name:"literal",value:"'tspan'"}]},{name:"ReactReactElement",raw:"React.ReactElement<React.SVGProps<SVGTextPathElement>, 'textPath'>",elements:[{name:"ReactSVGProps",raw:"React.SVGProps<SVGTextPathElement>",elements:[{name:"SVGTextPathElement"}]},{name:"literal",value:"'textPath'"}]}]},{name:"Array",elements:[{name:"union",raw:`| React.ReactElement<React.SVGProps<SVGTSpanElement>, 'tspan'>
| React.ReactElement<React.SVGProps<SVGTextPathElement>, 'textPath'>`,elements:[{name:"ReactReactElement",raw:"React.ReactElement<React.SVGProps<SVGTSpanElement>, 'tspan'>",elements:[{name:"ReactSVGProps",raw:"React.SVGProps<SVGTSpanElement>",elements:[{name:"SVGTSpanElement"}]},{name:"literal",value:"'tspan'"}]},{name:"ReactReactElement",raw:"React.ReactElement<React.SVGProps<SVGTextPathElement>, 'textPath'>",elements:[{name:"ReactSVGProps",raw:"React.SVGProps<SVGTextPathElement>",elements:[{name:"SVGTextPathElement"}]},{name:"literal",value:"'textPath'"}]}]}],raw:"ValidChartTextChildElements[]"}],required:!1},description:"The text content to display."},{key:"x",value:{name:"number",required:!0},description:"The desired x position in SVG pixels.\n@note Text will be automatically positioned to fit within bounds unless `disableRepositioning` is true."},{key:"y",value:{name:"number",required:!0},description:"The desired y position in SVG pixels.\n@note Text will be automatically positioned to fit within bounds unless `disableRepositioning` is true."},{key:"horizontalAlignment",value:{name:"union",raw:"'left' | 'center' | 'right'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'center'"},{name:"literal",value:"'right'"}],required:!1},description:`Horizontal alignment of the component.
@default 'center'`},{key:"verticalAlignment",value:{name:"union",raw:"'top' | 'middle' | 'bottom'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'middle'"},{name:"literal",value:"'bottom'"}],required:!1},description:`Vertical alignment of the component.
@default 'middle'`},{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"styles",value:{name:"signature",type:"object",raw:`{
  root?: React.CSSProperties;
  text?: React.CSSProperties;
  backgroundRect?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"text",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"backgroundRect",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}}]},required:!1}},{key:"className",value:{name:"string",required:!1}},{key:"classNames",value:{name:"signature",type:"object",raw:`{
  root?: string;
  text?: string;
  backgroundRect?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1}},{key:"text",value:{name:"string",required:!1}},{key:"backgroundRect",value:{name:"string",required:!1}}]},required:!1}}]}}]},{name:"union",raw:`| 'x'
| 'y'
| 'children'
| 'testID'
| 'dx'
| 'dy'
| 'font'
| 'fontFamily'
| 'fontSize'
| 'fontWeight'
| 'color'
| 'elevated'
| 'inset'
| 'background'
| 'borderRadius'
| 'disableRepositioning'
| 'bounds'
| 'styles'
| 'classNames'
| 'horizontalAlignment'
| 'verticalAlignment'
| 'className'
| 'style'`,elements:[{name:"literal",value:"'x'"},{name:"literal",value:"'y'"},{name:"literal",value:"'children'"},{name:"literal",value:"'testID'"},{name:"literal",value:"'dx'"},{name:"literal",value:"'dy'"},{name:"literal",value:"'font'"},{name:"literal",value:"'fontFamily'"},{name:"literal",value:"'fontSize'"},{name:"literal",value:"'fontWeight'"},{name:"literal",value:"'color'"},{name:"literal",value:"'elevated'"},{name:"literal",value:"'inset'"},{name:"literal",value:"'background'"},{name:"literal",value:"'borderRadius'"},{name:"literal",value:"'disableRepositioning'"},{name:"literal",value:"'bounds'"},{name:"literal",value:"'styles'"},{name:"literal",value:"'classNames'"},{name:"literal",value:"'horizontalAlignment'"},{name:"literal",value:"'verticalAlignment'"},{name:"literal",value:"'className'"},{name:"literal",value:"'style'"}]}],raw:`Pick<
  ChartTextProps,
  | 'x'
  | 'y'
  | 'children'
  | 'testID'
  | 'dx'
  | 'dy'
  | 'font'
  | 'fontFamily'
  | 'fontSize'
  | 'fontWeight'
  | 'color'
  | 'elevated'
  | 'inset'
  | 'background'
  | 'borderRadius'
  | 'disableRepositioning'
  | 'bounds'
  | 'styles'
  | 'classNames'
  | 'horizontalAlignment'
  | 'verticalAlignment'
  | 'className'
  | 'style'
>`}],required:!1},description:`Component to render tick labels.
Allows for custom styling and formatting that works cross-platform.

@example
// Custom tick label component with elevation
TickLabelComponent={(props) => (
  <DefaultAxisTickLabel {...props} elevated color="var(--color-fgPrimary)" />
)}

@default DefaultAxisTickLabel`}]}}]},{name:"intersection",raw:`AxisBaseProps & {
  /**
   * The ID of the axis to render.
   * Defaults to defaultAxisId if not specified.
   */
  axisId?: string;
  /**
   * The position of the axis relative to the chart's drawing area.
   * @default 'right'
   */
  position?: 'left' | 'right';
  /**
   * Width of the axis. This value is inclusive of the padding.
   * @default 44 when no label is provided, 64 when a label is provided
   */
  width?: number;
}`,elements:[{name:"intersection",raw:`SharedProps & {
  /**
   * Placement of grid lines relative to each band.
   * Options: 'start', 'middle', 'end', 'edges'
   * @note This property only applies to band scales.
   * @default 'edges'
   */
  bandGridLinePlacement?: AxisBandPlacement;
  /**
   * Placement of tick marks relative to each band.
   * Options: 'start', 'middle', 'end', 'edges'
   * @note This property only applies to band scales.
   * @default 'middle'
   */
  bandTickMarkPlacement?: AxisBandPlacement;
  /**
   * Label text to display for the axis.
   */
  label?: string;
  /**
   * Gap between the tick labels and the axis label.
   * @default 4
   */
  labelGap?: number;
  /**
   * Minimum gap between tick labels.
   * Labels will be hidden if they are closer than this gap.
   * @default 4
   */
  minTickLabelGap?: number;
  /**
   * Requested number of ticks to display.
   * This value is passed into d3 and may not be respected.
   * @note This property is overridden when \`ticks\` is provided.
   * @note this property overrides the \`tickInterval\` property.
   * @default 5 (for y-axis)
   */
  requestedTickCount?: number;
  /**
   * Whether to show grid lines at each tick position.
   */
  showGrid?: boolean;
  /**
   * Whether to show the axis line.
   */
  showLine?: boolean;
  /**
   * Whether to show tick marks on the axis.
   */
  showTickMarks?: boolean;
  /**
   * Size of the tick marks.
   * @default 4
   */
  tickMarkSize?: number;
  /**
   * Custom tick configuration for the axis.
   * When provided, this overrides the \`requestedTickCount\` property.
   *
   * - **Array**: Uses these exact values for tick positioning and labels.
   * - **Function**: Filters based on the predicate function.
   *   - For **x-axis**: Checks every data index (0, 1, 2, ..., dataLength-1)
   *   - For **y-axis**: Filters d3-generated tick values
   *
   * @example
   * // Exact tick values
   * ticks: [0, 25, 50, 75, 100]
   *
   * @example
   * // Show every 12th data point on x-axis
   * ticks: (index) => index % 12 === 0
   */
  ticks?: number[] | ((value: number) => boolean);
  /**
   * Space between the axis tick mark and labels.
   * If tick marks are not shown, this is the gap between the axis and the chart.
   * @default 2 for x-axis, 8 for y-axis
   */
  tickMarkLabelGap?: number;
  /**
   * Interval at which to show ticks.
   * When provided, calculates tick count based on available space.
   * @note this property is overridden by the \`requestedTickCount\` and \`ticks\` properties.
   * @default 32 (for x-axis)
   */
  tickInterval?: number;
  /**
   * Minimum step size for tick generation.
   * Prevents the step from being smaller than this value.
   * @default 1
   */
  tickMinStep?: number;
  /**
   * Maximum step size for tick generation.
   * Prevents the step from being larger than this value.
   */
  tickMaxStep?: number;
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
   * Placement of grid lines relative to each band.
   * Options: 'start', 'middle', 'end', 'edges'
   * @note This property only applies to band scales.
   * @default 'edges'
   */
  bandGridLinePlacement?: AxisBandPlacement;
  /**
   * Placement of tick marks relative to each band.
   * Options: 'start', 'middle', 'end', 'edges'
   * @note This property only applies to band scales.
   * @default 'middle'
   */
  bandTickMarkPlacement?: AxisBandPlacement;
  /**
   * Label text to display for the axis.
   */
  label?: string;
  /**
   * Gap between the tick labels and the axis label.
   * @default 4
   */
  labelGap?: number;
  /**
   * Minimum gap between tick labels.
   * Labels will be hidden if they are closer than this gap.
   * @default 4
   */
  minTickLabelGap?: number;
  /**
   * Requested number of ticks to display.
   * This value is passed into d3 and may not be respected.
   * @note This property is overridden when \`ticks\` is provided.
   * @note this property overrides the \`tickInterval\` property.
   * @default 5 (for y-axis)
   */
  requestedTickCount?: number;
  /**
   * Whether to show grid lines at each tick position.
   */
  showGrid?: boolean;
  /**
   * Whether to show the axis line.
   */
  showLine?: boolean;
  /**
   * Whether to show tick marks on the axis.
   */
  showTickMarks?: boolean;
  /**
   * Size of the tick marks.
   * @default 4
   */
  tickMarkSize?: number;
  /**
   * Custom tick configuration for the axis.
   * When provided, this overrides the \`requestedTickCount\` property.
   *
   * - **Array**: Uses these exact values for tick positioning and labels.
   * - **Function**: Filters based on the predicate function.
   *   - For **x-axis**: Checks every data index (0, 1, 2, ..., dataLength-1)
   *   - For **y-axis**: Filters d3-generated tick values
   *
   * @example
   * // Exact tick values
   * ticks: [0, 25, 50, 75, 100]
   *
   * @example
   * // Show every 12th data point on x-axis
   * ticks: (index) => index % 12 === 0
   */
  ticks?: number[] | ((value: number) => boolean);
  /**
   * Space between the axis tick mark and labels.
   * If tick marks are not shown, this is the gap between the axis and the chart.
   * @default 2 for x-axis, 8 for y-axis
   */
  tickMarkLabelGap?: number;
  /**
   * Interval at which to show ticks.
   * When provided, calculates tick count based on available space.
   * @note this property is overridden by the \`requestedTickCount\` and \`ticks\` properties.
   * @default 32 (for x-axis)
   */
  tickInterval?: number;
  /**
   * Minimum step size for tick generation.
   * Prevents the step from being smaller than this value.
   * @default 1
   */
  tickMinStep?: number;
  /**
   * Maximum step size for tick generation.
   * Prevents the step from being larger than this value.
   */
  tickMaxStep?: number;
}`,signature:{properties:[{key:"bandGridLinePlacement",value:{name:"union",raw:"'start' | 'middle' | 'end' | 'edges'",elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'middle'"},{name:"literal",value:"'end'"},{name:"literal",value:"'edges'"}],required:!1},description:`Placement of grid lines relative to each band.
Options: 'start', 'middle', 'end', 'edges'
@note This property only applies to band scales.
@default 'edges'`},{key:"bandTickMarkPlacement",value:{name:"union",raw:"'start' | 'middle' | 'end' | 'edges'",elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'middle'"},{name:"literal",value:"'end'"},{name:"literal",value:"'edges'"}],required:!1},description:`Placement of tick marks relative to each band.
Options: 'start', 'middle', 'end', 'edges'
@note This property only applies to band scales.
@default 'middle'`},{key:"label",value:{name:"string",required:!1},description:"Label text to display for the axis."},{key:"labelGap",value:{name:"number",required:!1},description:`Gap between the tick labels and the axis label.
@default 4`},{key:"minTickLabelGap",value:{name:"number",required:!1},description:`Minimum gap between tick labels.
Labels will be hidden if they are closer than this gap.
@default 4`},{key:"requestedTickCount",value:{name:"number",required:!1},description:"Requested number of ticks to display.\nThis value is passed into d3 and may not be respected.\n@note This property is overridden when `ticks` is provided.\n@note this property overrides the `tickInterval` property.\n@default 5 (for y-axis)"},{key:"showGrid",value:{name:"boolean",required:!1},description:"Whether to show grid lines at each tick position."},{key:"showLine",value:{name:"boolean",required:!1},description:"Whether to show the axis line."},{key:"showTickMarks",value:{name:"boolean",required:!1},description:"Whether to show tick marks on the axis."},{key:"tickMarkSize",value:{name:"number",required:!1},description:`Size of the tick marks.
@default 4`},{key:"ticks",value:{name:"union",raw:"number[] | ((value: number) => boolean)",elements:[{name:"Array",elements:[{name:"number"}],raw:"number[]"},{name:"unknown"}],required:!1},description:`Custom tick configuration for the axis.
When provided, this overrides the \`requestedTickCount\` property.

- **Array**: Uses these exact values for tick positioning and labels.
- **Function**: Filters based on the predicate function.
  - For **x-axis**: Checks every data index (0, 1, 2, ..., dataLength-1)
  - For **y-axis**: Filters d3-generated tick values

@example
// Exact tick values
ticks: [0, 25, 50, 75, 100]

@example
// Show every 12th data point on x-axis
ticks: (index) => index % 12 === 0`},{key:"tickMarkLabelGap",value:{name:"number",required:!1},description:`Space between the axis tick mark and labels.
If tick marks are not shown, this is the gap between the axis and the chart.
@default 2 for x-axis, 8 for y-axis`},{key:"tickInterval",value:{name:"number",required:!1},description:"Interval at which to show ticks.\nWhen provided, calculates tick count based on available space.\n@note this property is overridden by the `requestedTickCount` and `ticks` properties.\n@default 32 (for x-axis)"},{key:"tickMinStep",value:{name:"number",required:!1},description:`Minimum step size for tick generation.
Prevents the step from being smaller than this value.
@default 1`},{key:"tickMaxStep",value:{name:"number",required:!1},description:`Maximum step size for tick generation.
Prevents the step from being larger than this value.`}]}}]},{name:"signature",type:"object",raw:`{
  /**
   * The ID of the axis to render.
   * Defaults to defaultAxisId if not specified.
   */
  axisId?: string;
  /**
   * The position of the axis relative to the chart's drawing area.
   * @default 'right'
   */
  position?: 'left' | 'right';
  /**
   * Width of the axis. This value is inclusive of the padding.
   * @default 44 when no label is provided, 64 when a label is provided
   */
  width?: number;
}`,signature:{properties:[{key:"axisId",value:{name:"string",required:!1},description:`The ID of the axis to render.
Defaults to defaultAxisId if not specified.`},{key:"position",value:{name:"union",raw:"'left' | 'right'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"}],required:!1},description:`The position of the axis relative to the chart's drawing area.
@default 'right'`},{key:"width",value:{name:"number",required:!1},description:`Width of the axis. This value is inclusive of the padding.
@default 44 when no label is provided, 64 when a label is provided`}]}}]}]}]},description:"Configuration for y-axis.\nAccepts axis config and axis props.\nTo show the axis, set `showYAxis` to true."}}};export{K as L};
