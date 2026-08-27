import{r as s,j as D,c as de,R as ce}from"./iframe-CsG_6vZR.js";import{u as W,g as pe,a as re,D as fe,A as E,o as me,p as be,e as Q,k as ye,l as he,y as te,z as ge}from"./Axis---jO_ePi.js";import{u as xe}from"./use-animate-UT4SKWDr.js";import{m as _}from"./motion-minimal-5s2ikV7b.js";import{u as ve}from"./useRefMap-BuzMvUkY.js";const Se=(u,r,t,p=16,a="right")=>{if(t.width<=0||t.height<=0)return a;const f=r+p;if(a==="right"){const h=t.x+t.width-u;return f<=h?"right":"left"}const I=u-t.x;return f<=I?"left":"right"},Ie=(u,r,t,p)=>{if(u.length===0)return new Map;const a=[...u].sort((e,y)=>e.preferredY-y.preferredY).map(e=>({seriesId:e.seriesId,preferredY:e.preferredY,finalY:e.preferredY})),f=r.y+t/2,I=r.y+r.height-t/2,h=t+p;for(const e of a)e.finalY=Math.max(f,Math.min(I,e.preferredY));for(let e=1;e<a.length;e++){const y=a[e-1],m=a[e],b=y.finalY+h;m.finalY<b&&(m.finalY=b)}const T=[];let C=[a[0]];for(let e=1;e<a.length;e++){const y=a[e-1],m=a[e];m.finalY-y.finalY-t<p+.01?C.push(m):(T.push(C),C=[m])}T.push(C);for(const e of T){if(e.length===1)continue;const y=e[e.length-1],m=e[0],b=y.finalY+t/2-(r.y+r.height),k=e.reduce((R,x)=>R+x.preferredY,0)/e.length,q=e.length*t+(e.length-1)*p;if(b<=0){const R=(m.finalY+y.finalY)/2,x=k-R,w=m.finalY-f,d=I-y.finalY,l=Math.max(-w,Math.min(d,x));if(Math.abs(l)>.01)for(const c of e)c.finalY+=l}else{const R=m.finalY-t/2,x=r.y+r.height-R,w=m.finalY-f;if(w>=b)for(const d of e)d.finalY-=b;else if(q<=x){let d=Math.max(f,m.finalY-w);const l=(x-e.length*t)/Math.max(1,e.length-1);for(const c of e)c.finalY=d,d+=t+l}else{const d=Math.max(1,(x-e.length*t)/Math.max(1,e.length-1));let l=I-(e.length-1)*(t+d);l=Math.max(f,l);for(const c of e)c.finalY=l,l+=t+d}}}const P=new Map;for(const e of a)P.set(e.seriesId,e.finalY);return P},Ce={top:8,bottom:8,left:12,right:12},we=4,Re={top:4,bottom:20,left:12,right:12},Pe={top:0,bottom:0,left:0,right:0},Z=s.memo(({color:u="var(--color-fgMuted)",elevated:r,borderRadius:t=r?we:void 0,inset:p=r?Ce:void 0,boundsInset:a,className:f,classNames:I,style:h,styles:T,...C})=>{const{width:P,height:e}=W(),y=s.useMemo(()=>{const k=pe(a,r?Re:Pe);return{x:k.left,y:k.top,width:P-k.left-k.right,height:e-k.top-k.bottom}},[r,a,P,e]),m=s.useMemo(()=>({...f&&{text:f},...I}),[f,I]),b=s.useMemo(()=>({...h&&{text:h},...T}),[h,T]);return D.jsx(re,{borderRadius:t,bounds:y,classNames:m,color:u,elevated:r,inset:p,styles:b,...C})});Z.__docgenInfo={description:`DefaultReferenceLineLabel is the default label component for ReferenceLine.
Provides standard styling with elevation, inset, and color defaults.
When elevated, automatically adds bounds to prevent shadow cutoff at chart edges.`,methods:[],displayName:"DefaultReferenceLineLabel",props:{color:{defaultValue:{value:"'var(--color-fgMuted)'",computed:!1},required:!1},borderRadius:{defaultValue:{value:"elevated ? elevatedBorderRadius : undefined",computed:!1},required:!1},inset:{defaultValue:{value:"elevated ? elevatedInset : undefined",computed:!1},required:!1}}};const ie=s.memo(({dataX:u,dataY:r,yAxisId:t,label:p,labelPosition:a=r!==void 0?"right":"top",testID:f,LineComponent:I=fe,LabelComponent:h=Z,labelElevated:T,labelFont:C,labelDx:P,labelDy:e,labelHorizontalAlignment:y,labelVerticalAlignment:m,labelBoundsInset:b,stroke:k="var(--color-bgLine)",opacity:q,className:R,style:x,classNames:w,styles:d})=>{const{getXScale:l,getYScale:c,drawingArea:i}=W(),o=de(R,w?.root),v={...x,...d?.root};if(r!==void 0){const S=c(t);if(!S)return null;const g=S(r);if(g===void 0)return null;let M;return a==="left"?M=i.x:a==="center"?M=i.x+i.width/2:M=i.x+i.width,D.jsxs("g",{className:o,"data-testid":f,style:v,children:[D.jsx(I,{animate:!1,d:`M${i.x},${g} L${i.x+i.width},${g}`,stroke:k,strokeOpacity:q}),p&&D.jsx(h,{boundsInset:b,className:w?.label,dx:P,dy:e,elevated:T,font:C,horizontalAlignment:y,opacity:q,style:d?.label,testID:f,verticalAlignment:m??"middle",x:M,y:g,children:p})]})}if(u!==void 0){const S=l();if(!S)return null;const g=E(u,S);if(g===void 0)return null;let M;return a==="top"?M=i.y:a==="middle"?M=i.y+i.height/2:M=i.y+i.height,D.jsxs("g",{className:o,"data-testid":f,style:v,children:[D.jsx(I,{animate:!1,d:`M${g},${i.y} L${g},${i.y+i.height}`,stroke:k,strokeOpacity:q}),p&&D.jsx(h,{boundsInset:b,className:w?.label,dx:P,dy:e,elevated:T,font:C,horizontalAlignment:y??"center",opacity:q,style:d?.label,testID:f,verticalAlignment:m,x:g,y:M,children:p})]})}});ie.__docgenInfo={description:"",methods:[],displayName:"ReferenceLine",props:{labelPosition:{defaultValue:{value:"dataY !== undefined ? 'right' : 'top'",computed:!1},required:!1},LineComponent:{defaultValue:{value:`memo<DottedLineProps>(
  ({
    fill = 'none',
    stroke = 'var(--color-fgPrimary)',
    strokeDasharray = '0 4',
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
    strokeOpacity = 1,
    strokeWidth = 2,
    vectorEffect = 'non-scaling-stroke',
    gradient,
    yAxisId,
    animate,
    transition,
    d,
    ...props
  }) => {
    const gradientId = useId();

    return (
      <>
        {gradient && (
          <defs>
            <Gradient
              animate={animate}
              gradient={gradient}
              id={gradientId}
              transition={transition}
              yAxisId={yAxisId}
            />
          </defs>
        )}
        <Path
          animate={animate}
          clipOffset={strokeWidth}
          d={d}
          fill={fill}
          stroke={gradient ? \`url(#\${gradientId})\` : stroke}
          strokeDasharray={strokeDasharray}
          strokeLinecap={strokeLinecap}
          strokeLinejoin={strokeLinejoin}
          strokeOpacity={strokeOpacity}
          strokeWidth={strokeWidth}
          transition={transition}
          vectorEffect={vectorEffect}
          {...props}
        />
      </>
    );
  },
)`,computed:!0},required:!1},LabelComponent:{defaultValue:{value:`memo<DefaultReferenceLineLabelProps>(
  ({
    color = 'var(--color-fgMuted)',
    elevated,
    borderRadius = elevated ? elevatedBorderRadius : undefined,
    inset = elevated ? elevatedInset : undefined,
    boundsInset: boundsInsetProp,
    className,
    classNames,
    style,
    styles,
    ...props
  }) => {
    const { width: chartWidth, height: chartHeight } = useCartesianChartContext();

    const bounds = useMemo(() => {
      const boundsInset = getChartInset(
        boundsInsetProp,
        elevated ? elevatedBoundsInset : nonElevatedBoundsInset,
      );
      return {
        x: boundsInset.left,
        y: boundsInset.top,
        width: chartWidth - boundsInset.left - boundsInset.right,
        height: chartHeight - boundsInset.top - boundsInset.bottom,
      };
    }, [elevated, boundsInsetProp, chartWidth, chartHeight]);

    const mergedClassNames = useMemo(
      () => ({
        ...(className && { text: className }),
        ...classNames,
      }),
      [className, classNames],
    );

    const mergedStyles = useMemo(
      () => ({
        ...(style && { text: style }),
        ...styles,
      }),
      [style, styles],
    );

    return (
      <ChartText
        borderRadius={borderRadius}
        bounds={bounds}
        classNames={mergedClassNames}
        color={color}
        elevated={elevated}
        inset={inset}
        styles={mergedStyles}
        {...props}
      />
    );
  },
)`,computed:!0},required:!1},stroke:{defaultValue:{value:"'var(--color-bgLine)'",computed:!1},required:!1}}};const Te=5,ke=2,De="var(--color-bg)",K=.5,U=0,qe=2,Me=3,Ae={duration:1.6,ease:[0,0,0,1]},Le=.4,ee=s.memo(s.forwardRef(({seriesId:u,color:r,dataX:t,dataY:p,isIdle:a,idlePulse:f,animate:I,transitions:h,opacity:T=1,radius:C=Te,stroke:P=De,strokeWidth:e=ke,className:y,style:m,testID:b=`${u}-beacon`},k)=>{const[q,R]=xe(),{animate:x,getSeries:w,getXScale:d,getYScale:l,drawingArea:c}=W(),i=I??x,o=w(u),v=d(),S=l(o?.yAxisId),g=s.useMemo(()=>r??o?.color??"var(--color-fgPrimary)",[r,o]),M=s.useMemo(()=>h?.update??me,[h?.update]),Y=s.useMemo(()=>h?.pulse??Ae,[h?.pulse]),X=s.useMemo(()=>h?.pulseRepeatDelay??Le,[h?.pulseRepeatDelay]),n=s.useMemo(()=>{if(!(!v||!S))return be({x:t,y:p,xScale:v,yScale:S})},[t,p,v,S]),A=C*qe,O=C*Me;s.useImperativeHandle(k,()=>({pulse:()=>{a&&!f&&q.current&&R(q.current,{opacity:[K,U],r:[A,O]},Y)}}),[a,f,q,R,Y,A,O]);const B=s.useMemo(()=>({...Y,repeat:1/0,repeatDelay:X}),[Y,X]),j=a&&f,N=s.useMemo(()=>n?n.x>=c.x&&n.x<=c.x+c.width&&n.y>=c.y&&n.y<=c.y+c.height:!1,[n,c]);if(!n)return;const $=D.jsx(_.circle,{ref:q,animate:j?{opacity:[K,U],r:[A,O],transition:B}:{opacity:U,r:A},cx:0,cy:0,"data-testid":`${b}-pulse`,fill:g,initial:{opacity:j?K:U,r:A}}),F=a&&i?D.jsx(_.circle,{animate:{cx:n.x,cy:n.y},className:y,cx:n.x,cy:n.y,fill:g,initial:!1,r:C,stroke:P,strokeWidth:e,style:m,transition:M}):D.jsx("circle",{className:y,cx:n.x,cy:n.y,fill:g,r:C,stroke:P,strokeWidth:e,style:m});return D.jsxs("g",{"data-testid":b,opacity:N?T:0,children:[a&&(i?D.jsx(_.g,{animate:{x:n.x,y:n.y},initial:!1,transition:M,children:$}):D.jsx("g",{transform:`translate(${n.x}, ${n.y})`,children:$})),F]})}));ee.__docgenInfo={description:"",methods:[{name:"pulse",docblock:null,modifiers:[],params:[],returns:null}],displayName:"DefaultScrubberBeacon",props:{testID:{required:!1,tsType:{name:"string"},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`},seriesId:{required:!0,tsType:{name:"string",raw:"Series['id']"},description:"Id of the series."},color:{required:!1,tsType:{name:"string"},description:"Color of the series."},dataX:{required:!0,tsType:{name:"number"},description:"X coordinate in data space."},dataY:{required:!0,tsType:{name:"number"},description:"Y coordinate in data space."},isIdle:{required:!1,tsType:{name:"boolean"},description:"Whether the beacon is in idle state (not actively scrubbing)."},idlePulse:{required:!1,tsType:{name:"boolean"},description:"Pulse the beacon while it is at rest.\n\n@note Only has an effect when `isIdle` is `true`. Pulse animations work\nregardless of the chart's `animate` prop."},animate:{required:!1,tsType:{name:"boolean"},description:`Whether position animations are enabled.
@default to ChartContext's animate value`},transitions:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /**
   * Transition used for beacon position updates.
   * @default defaultTransition
   */
  update?: Transition;
  /**
   * Transition used for the pulse animation.
   * @default { duration: 1.6, ease: 'easeInOut' }
   */
  pulse?: Transition;
  /**
   * Delay, in seconds between pulse transitions
   * when \`idlePulse\` is enabled.
   * @default 0.4
   */
  pulseRepeatDelay?: number;
}`,signature:{properties:[{key:"update",value:{name:"Transition",required:!1},description:`Transition used for beacon position updates.
@default defaultTransition`},{key:"pulse",value:{name:"Transition",required:!1},description:`Transition used for the pulse animation.
@default { duration: 1.6, ease: 'easeInOut' }`},{key:"pulseRepeatDelay",value:{name:"number",required:!1},description:"Delay, in seconds between pulse transitions\nwhen `idlePulse` is enabled.\n@default 0.4"}]}},description:"Transition configuration for beacon animations."},opacity:{required:!1,tsType:{name:"number"},description:`Opacity of the beacon.
@default 1`,defaultValue:{value:"1",computed:!1}},stroke:{required:!1,tsType:{name:"string"},description:`Stroke color of the beacon circle.
@default 'var(--color-bg)'`,defaultValue:{value:"'var(--color-bg)'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Custom className for styling."},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:"Custom inline styles."},radius:{required:!1,tsType:{name:"number"},description:`Radius of the beacon circle.
@default 5`,defaultValue:{value:"5",computed:!1}},strokeWidth:{required:!1,tsType:{name:"number"},description:`Stroke width of the beacon circle.
@default 2`,defaultValue:{value:"2",computed:!1}}}};const ae=3.5,se=4,oe=s.memo(({background:u="var(--color-bg",color:r="var(--color-fgPrimary)",elevated:t=!0,borderRadius:p=4,font:a="label1",verticalAlignment:f="middle",inset:I={left:se,right:se,top:ae,bottom:ae},label:h,...T})=>D.jsx(re,{disableRepositioning:!0,background:u,borderRadius:p,color:r,elevated:t,font:a,inset:I,verticalAlignment:f,...T,children:h}));oe.__docgenInfo={description:"DefaultScrubberBeaconLabel is a special instance of ChartText used to label a series' scrubber beacon (i.e. a point on the series pinned to the scrubber position).",methods:[],displayName:"DefaultScrubberBeaconLabel",props:{background:{defaultValue:{value:"'var(--color-bg'",computed:!1},required:!1},color:{defaultValue:{value:"'var(--color-fgPrimary)'",computed:!1},required:!1},elevated:{defaultValue:{value:"true",computed:!1},required:!1},borderRadius:{defaultValue:{value:"4",computed:!1},required:!1},font:{defaultValue:{value:"'label1'",computed:!1},required:!1},verticalAlignment:{defaultValue:{value:"'middle'",computed:!1},required:!1},inset:{defaultValue:{value:`{
  left: labelHorizontalInset,
  right: labelHorizontalInset,
  top: labelVerticalInset,
  bottom: labelVerticalInset,
}`,computed:!1},required:!1}}};const le=s.memo(({verticalAlignment:u="middle",dy:r,...t})=>{const{drawingArea:p}=W();return D.jsx(Z,{dy:r??-.5*p.y,verticalAlignment:u,...t})});le.__docgenInfo={description:`DefaultScrubberLabel is the default label component for the scrubber line.
It will center the label vertically with the top available area.`,methods:[],displayName:"DefaultScrubberLabel",props:{verticalAlignment:{defaultValue:{value:"'middle'",computed:!1},required:!1}}};const Ye=s.memo(({seriesId:u,dataIndex:r,dataX:t,isIdle:p,BeaconComponent:a,idlePulse:f,animate:I,transitions:h,className:T,style:C,testID:P,beaconRef:e,stroke:y})=>{const{getSeries:m,getSeriesData:b,getXScale:k,getYScale:q}=W(),R=s.useMemo(()=>m(u),[m,u]),x=s.useMemo(()=>b(u),[b,u]),w=R?.gradient,d=s.useMemo(()=>{if(x&&r>=0&&r<x.length){const c=x[r];if(typeof c=="number")return c;if(Array.isArray(c)){const i=c.filter(o=>o!==null);if(i.length>=1)return i[i.length-1]}}},[x,r]),l=s.useMemo(()=>{if(d===void 0)return R?.color??"var(--color-fgPrimary)";if(w){const c=k(),i=q(R?.yAxisId);if(c&&i){const o=w.axis==="x"?c:i,v=ye(w,c,i);if(v){const g=(w.axis??"y")==="x"?t:d,M=he(v,g,o);if(M)return M}}}return R?.color??"var(--color-fgPrimary)"},[w,t,d,R?.color,R?.yAxisId,k,q]);return d===void 0?null:D.jsx(a,{ref:e,animate:I,className:T,color:l,dataX:t,dataY:d,idlePulse:f,isIdle:p,seriesId:u,stroke:y,style:C,testID:P,transitions:h})}),ue=s.memo(s.forwardRef(({seriesIds:u,idlePulse:r,transitions:t,BeaconComponent:p=ee,className:a,style:f,testID:I,stroke:h},T)=>{const C=ve(),{scrubberPosition:P}=Q(),{getXScale:e,getXAxis:y,dataLength:m,series:b,animate:k}=W();s.useImperativeHandle(T,()=>({pulse:()=>{Object.values(C.refs).forEach(l=>{l?.pulse()})}}));const q=s.useMemo(()=>b?.filter(l=>u.includes(l.id))??[],[b,u]),{dataX:R,dataIndex:x}=s.useMemo(()=>{const l=e(),c=y();if(!l)return{dataX:void 0,dataIndex:void 0};const i=P??Math.max(0,m-1);let o;if(c?.data&&Array.isArray(c.data)&&c.data[i]!==void 0){const v=c.data[i];o=typeof v=="string"?i:v}else o=i;return{dataX:o,dataIndex:i}},[e,y,P,m]),w=P===void 0,d=s.useCallback(l=>c=>{c&&C.registerRef(l,c)},[C]);return R===void 0||x===void 0?null:q.map(l=>D.jsx(Ye,{BeaconComponent:p,animate:k,beaconRef:d(l.id),className:a,dataIndex:x,dataX:R,idlePulse:r,isIdle:w,seriesId:l.id,stroke:h,style:f,testID:I?`${I??"beacon"}-${l.id}`:void 0,transitions:t},l.id))}));ue.__docgenInfo={description:"",methods:[],displayName:"ScrubberBeaconGroup",props:{testID:{required:!1,tsType:{name:"string"},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`},seriesIds:{required:!0,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"Array of series IDs to render beacons for."},idlePulse:{required:!1,tsType:{name:"boolean"},description:"Pulse the beacons while at rest."},transitions:{required:!1,tsType:{name:"intersection['transitions']",raw:"ScrubberBeaconProps['transitions']"},description:"Transition configuration for beacon animations."},BeaconComponent:{required:!1,tsType:{name:"ReactFC",raw:`React.FC<
  ScrubberBeaconProps & { ref?: React.Ref<ScrubberBeaconRef> }
>`,elements:[{name:"intersection",raw:"ScrubberBeaconProps & { ref?: React.Ref<ScrubberBeaconRef> }",elements:[{name:"intersection",raw:`SharedProps & {
  /**
   * Id of the series.
   */
  seriesId: Series['id'];
  /**
   * Color of the series.
   */
  color?: string;
  /**
   * X coordinate in data space.
   */
  dataX: number;
  /**
   * Y coordinate in data space.
   */
  dataY: number;
  /**
   * Whether the beacon is in idle state (not actively scrubbing).
   */
  isIdle?: boolean;
  /**
   * Pulse the beacon while it is at rest.
   *
   * @note Only has an effect when \`isIdle\` is \`true\`. Pulse animations work
   * regardless of the chart's \`animate\` prop.
   */
  idlePulse?: boolean;
  /**
   * Whether position animations are enabled.
   * @default to ChartContext's animate value
   */
  animate?: boolean;
  /**
   * Transition configuration for beacon animations.
   */
  transitions?: {
    /**
     * Transition used for beacon position updates.
     * @default defaultTransition
     */
    update?: Transition;
    /**
     * Transition used for the pulse animation.
     * @default { duration: 1.6, ease: 'easeInOut' }
     */
    pulse?: Transition;
    /**
     * Delay, in seconds between pulse transitions
     * when \`idlePulse\` is enabled.
     * @default 0.4
     */
    pulseRepeatDelay?: number;
  };
  /**
   * Opacity of the beacon.
   * @default 1
   */
  opacity?: number;
  /**
   * Stroke color of the beacon circle.
   * @default 'var(--color-bg)'
   */
  stroke?: string;
  /**
   * Custom className for styling.
   */
  className?: string;
  /**
   * Custom inline styles.
   */
  style?: React.CSSProperties;
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
   * Id of the series.
   */
  seriesId: Series['id'];
  /**
   * Color of the series.
   */
  color?: string;
  /**
   * X coordinate in data space.
   */
  dataX: number;
  /**
   * Y coordinate in data space.
   */
  dataY: number;
  /**
   * Whether the beacon is in idle state (not actively scrubbing).
   */
  isIdle?: boolean;
  /**
   * Pulse the beacon while it is at rest.
   *
   * @note Only has an effect when \`isIdle\` is \`true\`. Pulse animations work
   * regardless of the chart's \`animate\` prop.
   */
  idlePulse?: boolean;
  /**
   * Whether position animations are enabled.
   * @default to ChartContext's animate value
   */
  animate?: boolean;
  /**
   * Transition configuration for beacon animations.
   */
  transitions?: {
    /**
     * Transition used for beacon position updates.
     * @default defaultTransition
     */
    update?: Transition;
    /**
     * Transition used for the pulse animation.
     * @default { duration: 1.6, ease: 'easeInOut' }
     */
    pulse?: Transition;
    /**
     * Delay, in seconds between pulse transitions
     * when \`idlePulse\` is enabled.
     * @default 0.4
     */
    pulseRepeatDelay?: number;
  };
  /**
   * Opacity of the beacon.
   * @default 1
   */
  opacity?: number;
  /**
   * Stroke color of the beacon circle.
   * @default 'var(--color-bg)'
   */
  stroke?: string;
  /**
   * Custom className for styling.
   */
  className?: string;
  /**
   * Custom inline styles.
   */
  style?: React.CSSProperties;
}`,signature:{properties:[{key:"seriesId",value:{name:"string",raw:"Series['id']",required:!0},description:"Id of the series."},{key:"color",value:{name:"string",required:!1},description:"Color of the series."},{key:"dataX",value:{name:"number",required:!0},description:"X coordinate in data space."},{key:"dataY",value:{name:"number",required:!0},description:"Y coordinate in data space."},{key:"isIdle",value:{name:"boolean",required:!1},description:"Whether the beacon is in idle state (not actively scrubbing)."},{key:"idlePulse",value:{name:"boolean",required:!1},description:"Pulse the beacon while it is at rest.\n\n@note Only has an effect when `isIdle` is `true`. Pulse animations work\nregardless of the chart's `animate` prop."},{key:"animate",value:{name:"boolean",required:!1},description:`Whether position animations are enabled.
@default to ChartContext's animate value`},{key:"transitions",value:{name:"signature",type:"object",raw:`{
  /**
   * Transition used for beacon position updates.
   * @default defaultTransition
   */
  update?: Transition;
  /**
   * Transition used for the pulse animation.
   * @default { duration: 1.6, ease: 'easeInOut' }
   */
  pulse?: Transition;
  /**
   * Delay, in seconds between pulse transitions
   * when \`idlePulse\` is enabled.
   * @default 0.4
   */
  pulseRepeatDelay?: number;
}`,signature:{properties:[{key:"update",value:{name:"Transition",required:!1},description:`Transition used for beacon position updates.
@default defaultTransition`},{key:"pulse",value:{name:"Transition",required:!1},description:`Transition used for the pulse animation.
@default { duration: 1.6, ease: 'easeInOut' }`},{key:"pulseRepeatDelay",value:{name:"number",required:!1},description:"Delay, in seconds between pulse transitions\nwhen `idlePulse` is enabled.\n@default 0.4"}]},required:!1},description:"Transition configuration for beacon animations."},{key:"opacity",value:{name:"number",required:!1},description:`Opacity of the beacon.
@default 1`},{key:"stroke",value:{name:"string",required:!1},description:`Stroke color of the beacon circle.
@default 'var(--color-bg)'`},{key:"className",value:{name:"string",required:!1},description:"Custom className for styling."},{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom inline styles."}]}}]},{name:"signature",type:"object",raw:"{ ref?: React.Ref<ScrubberBeaconRef> }",signature:{properties:[{key:"ref",value:{name:"ReactRef",raw:"React.Ref<ScrubberBeaconRef>",elements:[{name:"signature",type:"object",raw:`{
  /**
   * Triggers a single pulse animation.
   * Only works when the beacon is in idle state (not actively scrubbing).
   */
  pulse: () => void;
}`,signature:{properties:[{key:"pulse",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!0},description:`Triggers a single pulse animation.
Only works when the beacon is in idle state (not actively scrubbing).`}]}}],required:!1}}]}}]}]},description:`Custom component for the scrubber beacon.
@default DefaultScrubberBeacon`,defaultValue:{value:`memo(
  forwardRef<ScrubberBeaconRef, DefaultScrubberBeaconProps>(
    (
      {
        seriesId,
        color: colorProp,
        dataX,
        dataY,
        isIdle,
        idlePulse,
        animate: animateProp,
        transitions,
        opacity = 1,
        radius = defaultRadius,
        stroke = defaultStroke,
        strokeWidth = defaultStrokeWidth,
        className,
        style,
        testID = \`\${seriesId}-beacon\`,
      },
      ref,
    ) => {
      const [scope, animateFn] = useAnimate();
      const {
        animate: animateContext,
        getSeries,
        getXScale,
        getYScale,
        drawingArea,
      } = useCartesianChartContext();
      const animate = animateProp ?? animateContext;

      const targetSeries = getSeries(seriesId);
      const xScale = getXScale();
      const yScale = getYScale(targetSeries?.yAxisId);

      const color = useMemo(
        () => colorProp ?? targetSeries?.color ?? 'var(--color-fgPrimary)',
        [colorProp, targetSeries],
      );

      const updateTransition = useMemo(
        () => transitions?.update ?? defaultTransition,
        [transitions?.update],
      );
      const pulseTransition = useMemo(
        () => transitions?.pulse ?? defaultPulseTransition,
        [transitions?.pulse],
      );
      const pulseRepeatDelay = useMemo(
        () => transitions?.pulseRepeatDelay ?? defaultPulseRepeatDelay,
        [transitions?.pulseRepeatDelay],
      );

      const pixelCoordinate = useMemo(() => {
        if (!xScale || !yScale) return;
        return projectPoint({ x: dataX, y: dataY, xScale, yScale });
      }, [dataX, dataY, xScale, yScale]);

      const pulseRadiusStart = radius * pulseRadiusStartMultiplier;
      const pulseRadiusEnd = radius * pulseRadiusEndMultiplier;

      useImperativeHandle(
        ref,
        () => ({
          pulse: () => {
            // Only pulse when idle and idlePulse is not enabled
            if (isIdle && !idlePulse && scope.current) {
              animateFn(
                scope.current,
                {
                  opacity: [pulseOpacityStart, pulseOpacityEnd],
                  r: [pulseRadiusStart, pulseRadiusEnd],
                },
                pulseTransition as ValueAnimationTransition,
              );
            }
          },
        }),
        [isIdle, idlePulse, scope, animateFn, pulseTransition, pulseRadiusStart, pulseRadiusEnd],
      );

      // Create continuous pulse transition by repeating the base pulse transition with delay
      const continuousPulseTransition: Transition = useMemo(
        () => ({
          ...pulseTransition,
          repeat: Infinity,
          repeatDelay: pulseRepeatDelay,
        }),
        [pulseTransition, pulseRepeatDelay],
      );

      const shouldPulse = isIdle && idlePulse;

      const isWithinDrawingArea = useMemo(() => {
        if (!pixelCoordinate) return false;
        return (
          pixelCoordinate.x >= drawingArea.x &&
          pixelCoordinate.x <= drawingArea.x + drawingArea.width &&
          pixelCoordinate.y >= drawingArea.y &&
          pixelCoordinate.y <= drawingArea.y + drawingArea.height
        );
      }, [pixelCoordinate, drawingArea]);

      if (!pixelCoordinate) return;

      const pulseCircle = (
        <motion.circle
          ref={scope}
          animate={
            shouldPulse
              ? {
                  opacity: [pulseOpacityStart, pulseOpacityEnd],
                  r: [pulseRadiusStart, pulseRadiusEnd],
                  transition: continuousPulseTransition,
                }
              : { opacity: pulseOpacityEnd, r: pulseRadiusStart }
          }
          cx={0}
          cy={0}
          data-testid={\`\${testID}-pulse\`}
          fill={color}
          initial={{
            opacity: shouldPulse ? pulseOpacityStart : pulseOpacityEnd,
            r: pulseRadiusStart,
          }}
        />
      );

      const beaconCircle =
        isIdle && animate ? (
          <motion.circle
            animate={{ cx: pixelCoordinate.x, cy: pixelCoordinate.y }}
            className={className}
            cx={pixelCoordinate.x}
            cy={pixelCoordinate.y}
            fill={color}
            initial={false}
            r={radius}
            stroke={stroke}
            strokeWidth={strokeWidth}
            style={style}
            transition={updateTransition}
          />
        ) : (
          <circle
            className={className}
            cx={pixelCoordinate.x}
            cy={pixelCoordinate.y}
            fill={color}
            r={radius}
            stroke={stroke}
            strokeWidth={strokeWidth}
            style={style}
          />
        );

      return (
        <g data-testid={testID} opacity={isWithinDrawingArea ? opacity : 0}>
          {isIdle &&
            (animate ? (
              <motion.g
                animate={{ x: pixelCoordinate.x, y: pixelCoordinate.y }}
                initial={false}
                transition={updateTransition}
              >
                {pulseCircle}
              </motion.g>
            ) : (
              <g transform={\`translate(\${pixelCoordinate.x}, \${pixelCoordinate.y})\`}>
                {pulseCircle}
              </g>
            ))}
          {beaconCircle}
        </g>
      );
    },
  ),
)`,computed:!0}},className:{required:!1,tsType:{name:"string"},description:"Custom className for beacon styling."},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:"Custom inline styles for beacons."},stroke:{required:!1,tsType:{name:"string"},description:`Stroke color of the beacon circle.
@default 'var(--color-bg)'`}}};const Oe=s.memo(({index:u,positions:r,position:t,label:p,color:a,seriesId:f,onDimensionsChange:I,BeaconLabelComponent:h,labelHorizontalOffset:T,labelFont:C})=>{const P=r[u];if(!P)return null;const e=P.x,y=P.y,m=t==="right"?T:-T,b=t==="right"?"left":"right";return D.jsx(h,{color:a,dx:m,font:C,horizontalAlignment:b,label:p,onDimensionsChange:k=>I(f,k),seriesId:f,x:e,y})}),Be=s.memo(({labels:u,labelMinGap:r=4,labelHorizontalOffset:t=16,labelFont:p,labelPreferredSide:a="right",BeaconLabelComponent:f=oe})=>{const{getSeries:I,getSeriesData:h,getXScale:T,getYScale:C,getXAxis:P,drawingArea:e,dataLength:y}=W(),{scrubberPosition:m}=Q(),[b,k]=s.useState({}),q=s.useCallback((o,v)=>{k(S=>{const g=S[o];return g&&g.width===v.width&&g.height===v.height?S:{...S,[o]:v}})},[]),R=s.useMemo(()=>u.map(o=>{const v=I(o.seriesId);if(!v)return null;const S=h(o.seriesId),g=C(v.yAxisId);return{seriesId:o.seriesId,sourceData:S,yScale:g}}).filter(o=>o!==null),[u,I,h,C]),x=T(),w=P(),d=s.useMemo(()=>m??Math.max(0,y-1),[m,y]),l=s.useMemo(()=>{if(w?.data&&Array.isArray(w.data)&&w.data[d]!==void 0){const o=w.data[d];return typeof o=="string"?d:o}return d},[w,d]),c=s.useMemo(()=>{if(!x||l===void 0)return[];const o=E(l,x),v=R.map(n=>{let A;if(n.yScale&&n.sourceData&&d!==void 0&&d>=0&&d<n.sourceData.length){const O=n.sourceData[d];if(Array.isArray(O)){const B=O.filter(j=>j!==null);B.length>=1&&(A=B[B.length-1])}}return A!==void 0&&n.yScale?{seriesId:n.seriesId,x:o,desiredY:E(A,n.yScale)}:null}),S=Math.max(...Object.values(b).map(n=>n.height)),g=Math.max(...Object.values(b).map(n=>n.width)),Y=v.filter(n=>n!==null).map(n=>{const A=b[n.seriesId];return{seriesId:n.seriesId,width:A?.width??g,height:A?.height??S,preferredX:n.x,preferredY:n.desiredY}}),X=Ie(Y,e,S,r);return v.map(n=>n?{seriesId:n.seriesId,x:n.x,y:X.get(n.seriesId)??n.desiredY}:null)},[R,d,l,x,b,e,r]),i=s.useMemo(()=>{if(!x||l===void 0)return a;const o=E(l,x),v=Math.max(...Object.values(b).map(S=>S.width));return Se(o,v,e,t,a)},[l,x,b,e,t,a]);return R.map((o,v)=>{const S=u.find(g=>g.seriesId===o.seriesId);if(S)return D.jsx(Oe,{BeaconLabelComponent:f,color:S.color,index:v,label:S.label,labelFont:p,labelHorizontalOffset:t,onDimensionsChange:q,position:i,positions:c,seriesId:o.seriesId},o.seriesId)})}),je=s.memo(s.forwardRef(({seriesIds:u,hideBeaconLabels:r,hideLine:t,label:p,accessibilityLabel:a,lineStroke:f,BeaconComponent:I=ee,BeaconLabelComponent:h,LineComponent:T,LabelComponent:C=le,labelElevated:P,hideOverlay:e,overlayOffset:y=2,beaconLabelMinGap:m,beaconLabelHorizontalOffset:b,beaconLabelPreferredSide:k,labelFont:q,labelBoundsInset:R,beaconLabelFont:x,testID:w,idlePulse:d,beaconTransitions:l,beaconStroke:c,styles:i,classNames:o},v)=>{const S=ce.useRef(null),{scrubberPosition:g}=Q(),{getXScale:M,getXAxis:Y,animate:X,series:n,drawingArea:A,dataLength:O}=W();s.useImperativeHandle(v,()=>({pulse:()=>{S.current?.pulse()}}));const B=s.useMemo(()=>u===void 0?n?.map(L=>L.id)??[]:u,[n,u]),{dataX:j,dataIndex:N}=s.useMemo(()=>{const L=M(),G=Y();if(!L)return{dataX:void 0,dataIndex:void 0};const V=g??Math.max(0,O-1);let J;if(G?.data&&Array.isArray(G.data)&&G.data[V]!==void 0){const ne=G.data[V];J=typeof ne=="string"?V:ne}else J=V;return{dataX:J,dataIndex:V}},[M,Y,g,O]),$=s.useMemo(()=>{if(N===void 0)return;if(a)return typeof a=="function"?a(N):a;const L=typeof p=="function"?p(N):p;return typeof L=="string"?L:void 0},[a,p,N]),F=s.useMemo(()=>n?.filter(L=>B.includes(L.id)).filter(L=>L.label!==void 0&&L.label.length>0).map(L=>({seriesId:L.id,label:L.label,color:L.color}))??[],[n,B]),z=M();if(!z)return null;const H=j!==void 0&&z?E(j,z):void 0;return D.jsxs(_.g,{"aria-atomic":"true","aria-label":$,"aria-live":"polite","data-component":"scrubber-group","data-testid":w,role:"status",...X?{animate:{opacity:1,transition:{duration:te,delay:ge}},exit:{opacity:0,transition:{duration:te}},initial:{opacity:0}}:{},children:[!e&&g!==void 0&&H!==void 0&&D.jsx("rect",{className:o?.overlay,fill:"var(--color-bg)",height:A.height+y*2,opacity:.8,style:i?.overlay,width:A.x+A.width-H+y,x:H,y:A.y-y}),!t&&g!==void 0&&j!==void 0&&D.jsx(ie,{LabelComponent:C,LineComponent:T,classNames:{label:o?.line},dataX:j,label:typeof p=="function"?p(N):p,labelBoundsInset:R,labelElevated:P,labelFont:q,stroke:f,styles:{label:i?.line}}),D.jsx(ue,{ref:S,BeaconComponent:I,className:o?.beacon,idlePulse:d,seriesIds:B,stroke:c,style:i?.beacon,testID:w,transitions:l}),!r&&F.length>0&&D.jsx(Be,{BeaconLabelComponent:h,labelFont:x,labelHorizontalOffset:b,labelMinGap:m,labelPreferredSide:k,labels:F})]})}));je.__docgenInfo={description:"Unified component that manages all scrubber elements (beacons, line, labels).",methods:[{name:"pulse",docblock:null,modifiers:[],params:[],returns:null}],displayName:"Scrubber",props:{testID:{required:!1,tsType:{name:"string"},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`},seriesIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:`Array of series IDs to highlight when scrubbing with scrubber beacons.
By default, all series will be highlighted.`},hideBeaconLabels:{required:!1,tsType:{name:"boolean"},description:"Hides the beacon labels while keeping the line label visible (if provided)."},hideLine:{required:!1,tsType:{name:"boolean"},description:`Hides the scrubber line.
@note This hides Scrubber's ReferenceLine including the label.`},hideOverlay:{required:!1,tsType:{name:"boolean"},description:"Hides the overlay rect which obscures data beyond the scrubber position."},overlayOffset:{required:!1,tsType:{name:"number"},description:`Offset of the overlay rect relative to the drawing area.
Useful for when scrubbing over lines, where the stroke width would cause part of the line to be visible.
@default 2`,defaultValue:{value:"2",computed:!1}},beaconLabelMinGap:{required:!1,tsType:{name:"intersection['labelMinGap']",raw:"ScrubberBeaconLabelGroupBaseProps['labelMinGap']"},description:`Minimum gap between beacon labels to prevent overlap.
Measured in pixels.`},beaconLabelHorizontalOffset:{required:!1,tsType:{name:"intersection['labelHorizontalOffset']",raw:"ScrubberBeaconLabelGroupBaseProps['labelHorizontalOffset']"},description:`Horizontal offset for beacon labels from their beacon position.
Measured in pixels.`},beaconLabelPreferredSide:{required:!1,tsType:{name:"intersection['labelPreferredSide']",raw:"ScrubberBeaconLabelGroupBaseProps['labelPreferredSide']"},description:`Preferred side for beacon labels.
@note labels will switch to the opposite side if there's not enough space on the preferred side.
@default 'right'`},label:{required:!1,tsType:{name:"union",raw:`| ReferenceLineBaseProps['label']
| ((dataIndex: number) => ReferenceLineBaseProps['label'])`,elements:[{name:"intersection['label']",raw:"ReferenceLineBaseProps['label']"},{name:"unknown"}]},description:`Label text displayed above the scrubber line.
Can be a static string or a function that receives the current dataIndex.`},labelFont:{required:!1,tsType:{name:"intersection['font']",raw:"ChartTextProps['font']"},description:"Font style for the scrubber line label."},labelBoundsInset:{required:!1,tsType:{name:"union",raw:"number | ChartInset",elements:[{name:"number"},{name:"signature",type:"object",raw:`{
  top: number;
  left: number;
  bottom: number;
  right: number;
}`,signature:{properties:[{key:"top",value:{name:"number",required:!0}},{key:"left",value:{name:"number",required:!0}},{key:"bottom",value:{name:"number",required:!0}},{key:"right",value:{name:"number",required:!0}}]}}]},description:`Bounds inset for the scrubber line label to prevent cutoff at chart edges.
@default { top: 4, bottom: 20, left: 12, right: 12 } when labelElevated is true, otherwise none`},beaconLabelFont:{required:!1,tsType:{name:"intersection['font']",raw:"ChartTextProps['font']"},description:"Font style for the beacon labels."},lineStroke:{required:!1,tsType:{name:"intersection['stroke']",raw:"ReferenceLineBaseProps['stroke']"},description:"Stroke color for the scrubber line."},beaconTransitions:{required:!1,tsType:{name:"intersection['transitions']",raw:"ScrubberBeaconProps['transitions']"},description:"Transition configuration for the scrubber beacon."},beaconStroke:{required:!1,tsType:{name:"string"},description:`Stroke color of the scrubber beacon circle.
@default 'var(--color-bg)'`},accessibilityLabel:{required:!1,tsType:{name:"union",raw:"string | ((dataIndex: number) => string)",elements:[{name:"string"},{name:"unknown"}]},description:`Accessibility label for the scrubber. Can be a static string or a function that receives the current dataIndex.
If not provided, label will be used if it resolves to a string.`},styles:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /** Overlay element */
  overlay?: React.CSSProperties;
  /** Beacon circle element */
  beacon?: React.CSSProperties;
  /** Scrubber line element */
  line?: React.CSSProperties;
  /** Beacon label element */
  beaconLabel?: React.CSSProperties;
}`,signature:{properties:[{key:"overlay",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Overlay element"},{key:"beacon",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Beacon circle element"},{key:"line",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Scrubber line element"},{key:"beaconLabel",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Beacon label element"}]}},description:"Custom styles for individual elements of the Scrubber component"},classNames:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /** Overlay element */
  overlay?: string;
  /** Beacon circle element */
  beacon?: string;
  /** Scrubber line element */
  line?: string;
  /** Beacon label element */
  beaconLabel?: string;
}`,signature:{properties:[{key:"overlay",value:{name:"string",required:!1},description:"Overlay element"},{key:"beacon",value:{name:"string",required:!1},description:"Beacon circle element"},{key:"line",value:{name:"string",required:!1},description:"Scrubber line element"},{key:"beaconLabel",value:{name:"string",required:!1},description:"Beacon label element"}]}},description:"Custom class names for individual elements of the Scrubber component"},BeaconComponent:{defaultValue:{value:`memo(
  forwardRef<ScrubberBeaconRef, DefaultScrubberBeaconProps>(
    (
      {
        seriesId,
        color: colorProp,
        dataX,
        dataY,
        isIdle,
        idlePulse,
        animate: animateProp,
        transitions,
        opacity = 1,
        radius = defaultRadius,
        stroke = defaultStroke,
        strokeWidth = defaultStrokeWidth,
        className,
        style,
        testID = \`\${seriesId}-beacon\`,
      },
      ref,
    ) => {
      const [scope, animateFn] = useAnimate();
      const {
        animate: animateContext,
        getSeries,
        getXScale,
        getYScale,
        drawingArea,
      } = useCartesianChartContext();
      const animate = animateProp ?? animateContext;

      const targetSeries = getSeries(seriesId);
      const xScale = getXScale();
      const yScale = getYScale(targetSeries?.yAxisId);

      const color = useMemo(
        () => colorProp ?? targetSeries?.color ?? 'var(--color-fgPrimary)',
        [colorProp, targetSeries],
      );

      const updateTransition = useMemo(
        () => transitions?.update ?? defaultTransition,
        [transitions?.update],
      );
      const pulseTransition = useMemo(
        () => transitions?.pulse ?? defaultPulseTransition,
        [transitions?.pulse],
      );
      const pulseRepeatDelay = useMemo(
        () => transitions?.pulseRepeatDelay ?? defaultPulseRepeatDelay,
        [transitions?.pulseRepeatDelay],
      );

      const pixelCoordinate = useMemo(() => {
        if (!xScale || !yScale) return;
        return projectPoint({ x: dataX, y: dataY, xScale, yScale });
      }, [dataX, dataY, xScale, yScale]);

      const pulseRadiusStart = radius * pulseRadiusStartMultiplier;
      const pulseRadiusEnd = radius * pulseRadiusEndMultiplier;

      useImperativeHandle(
        ref,
        () => ({
          pulse: () => {
            // Only pulse when idle and idlePulse is not enabled
            if (isIdle && !idlePulse && scope.current) {
              animateFn(
                scope.current,
                {
                  opacity: [pulseOpacityStart, pulseOpacityEnd],
                  r: [pulseRadiusStart, pulseRadiusEnd],
                },
                pulseTransition as ValueAnimationTransition,
              );
            }
          },
        }),
        [isIdle, idlePulse, scope, animateFn, pulseTransition, pulseRadiusStart, pulseRadiusEnd],
      );

      // Create continuous pulse transition by repeating the base pulse transition with delay
      const continuousPulseTransition: Transition = useMemo(
        () => ({
          ...pulseTransition,
          repeat: Infinity,
          repeatDelay: pulseRepeatDelay,
        }),
        [pulseTransition, pulseRepeatDelay],
      );

      const shouldPulse = isIdle && idlePulse;

      const isWithinDrawingArea = useMemo(() => {
        if (!pixelCoordinate) return false;
        return (
          pixelCoordinate.x >= drawingArea.x &&
          pixelCoordinate.x <= drawingArea.x + drawingArea.width &&
          pixelCoordinate.y >= drawingArea.y &&
          pixelCoordinate.y <= drawingArea.y + drawingArea.height
        );
      }, [pixelCoordinate, drawingArea]);

      if (!pixelCoordinate) return;

      const pulseCircle = (
        <motion.circle
          ref={scope}
          animate={
            shouldPulse
              ? {
                  opacity: [pulseOpacityStart, pulseOpacityEnd],
                  r: [pulseRadiusStart, pulseRadiusEnd],
                  transition: continuousPulseTransition,
                }
              : { opacity: pulseOpacityEnd, r: pulseRadiusStart }
          }
          cx={0}
          cy={0}
          data-testid={\`\${testID}-pulse\`}
          fill={color}
          initial={{
            opacity: shouldPulse ? pulseOpacityStart : pulseOpacityEnd,
            r: pulseRadiusStart,
          }}
        />
      );

      const beaconCircle =
        isIdle && animate ? (
          <motion.circle
            animate={{ cx: pixelCoordinate.x, cy: pixelCoordinate.y }}
            className={className}
            cx={pixelCoordinate.x}
            cy={pixelCoordinate.y}
            fill={color}
            initial={false}
            r={radius}
            stroke={stroke}
            strokeWidth={strokeWidth}
            style={style}
            transition={updateTransition}
          />
        ) : (
          <circle
            className={className}
            cx={pixelCoordinate.x}
            cy={pixelCoordinate.y}
            fill={color}
            r={radius}
            stroke={stroke}
            strokeWidth={strokeWidth}
            style={style}
          />
        );

      return (
        <g data-testid={testID} opacity={isWithinDrawingArea ? opacity : 0}>
          {isIdle &&
            (animate ? (
              <motion.g
                animate={{ x: pixelCoordinate.x, y: pixelCoordinate.y }}
                initial={false}
                transition={updateTransition}
              >
                {pulseCircle}
              </motion.g>
            ) : (
              <g transform={\`translate(\${pixelCoordinate.x}, \${pixelCoordinate.y})\`}>
                {pulseCircle}
              </g>
            ))}
          {beaconCircle}
        </g>
      );
    },
  ),
)`,computed:!0},required:!1},LabelComponent:{defaultValue:{value:`memo<DefaultScrubberLabelProps>(
  ({ verticalAlignment = 'middle', dy, ...props }) => {
    const { drawingArea } = useCartesianChartContext();

    return (
      <DefaultReferenceLineLabel
        dy={dy ?? -0.5 * drawingArea.y}
        verticalAlignment={verticalAlignment}
        {...props}
      />
    );
  },
)`,computed:!0},required:!1}}};export{ee as D,ie as R,je as S,Z as a,oe as b,le as c};
