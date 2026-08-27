import{r as e,j as d,B as m}from"./iframe-BXWLBCkp.js";import{a as p,S as b}from"./SegmentedTabs-Dmp1WrMl.js";import{m as v}from"./motion-minimal-SVRWJYUW.js";import{t as g}from"./Tabs-NZrJjpKJ.js";import{T as h}from"./Text-Ch_dBU4v.js";const y=v(m),c=e.memo(({activeTabRect:a,background:t="bgPrimaryWash",position:i="absolute",borderRadius:s=1e3,style:n})=>{const{width:r,height:l,x:o}=a,u=e.useMemo(()=>({width:r,x:o}),[r,o]);return r?d.jsx(y,{animate:u,borderRadius:s,"data-testid":"period-selector-active-indicator",height:l,initial:!1,left:0,position:i,role:"none",style:{backgroundColor:`var(--color-${t})`,transition:"background-color 0.2s ease",...n},transition:g}):null}),T="span",x="dotBaseCss-ds3tff6",q=e.memo(e.forwardRef(({as:a,color:t="fgNegative",label:i="LIVE",display:s="inline-flex",alignItems:n="center",font:r="label1",hideDot:l,...o},u)=>{const f=a??T;return d.jsxs(h,{ref:u,alignItems:n,as:f,color:t,display:s,font:r,...o,children:[!l&&d.jsx("span",{className:x}),i]})})),w=e.memo(e.forwardRef((a,t)=>d.jsx(b,{ref:t,activeColor:"fgPrimary",font:"label1",...a}))),V=e.memo(e.forwardRef(({background:a="transparent",activeBackground:t="bgPrimaryWash",width:i="100%",justifyContent:s="space-between",TabComponent:n=w,TabsActiveIndicatorComponent:r=c,...l},o)=>d.jsx(p,{ref:o,TabComponent:n,TabsActiveIndicatorComponent:r,activeBackground:t,background:a,justifyContent:s,width:i,...l})));c.__docgenInfo={description:"",methods:[],displayName:"PeriodSelectorActiveIndicator",props:{activeTabRect:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
  width: number;
  height: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]}},description:""},background:{defaultValue:{value:"'bgPrimaryWash'",computed:!1},required:!1},position:{defaultValue:{value:"'absolute'",computed:!1},required:!1},borderRadius:{defaultValue:{value:"1000",computed:!1},required:!1}}};q.__docgenInfo={description:"",methods:[],displayName:"LiveTabLabel",props:{label:{required:!1,tsType:{name:"string"},description:`The label to display.
@default 'LIVE'`,defaultValue:{value:"'LIVE'",computed:!1}},hideDot:{required:!1,tsType:{name:"boolean"},description:"Whether to hide the dot."},color:{defaultValue:{value:"'fgNegative'",computed:!1},required:!1},display:{defaultValue:{value:"'inline-flex'",computed:!1},required:!1},alignItems:{defaultValue:{value:"'center'",computed:!1},required:!1},font:{defaultValue:{value:"'label1'",computed:!1},required:!1}}};V.__docgenInfo={description:`PeriodSelector is a specialized version of SegmentedTabs optimized for chart period selection.
It provides transparent background, primary wash active state, and full-width layout by default.`,methods:[],displayName:"PeriodSelector",props:{background:{defaultValue:{value:"'transparent'",computed:!1},required:!1},activeBackground:{defaultValue:{value:"'bgPrimaryWash'",computed:!1},required:!1},width:{defaultValue:{value:"'100%'",computed:!1},required:!1},justifyContent:{defaultValue:{value:"'space-between'",computed:!1},required:!1},TabComponent:{defaultValue:{value:`memo(
  forwardRef((props: SegmentedTabProps, ref: React.ForwardedRef<HTMLButtonElement>) => (
    <SegmentedTab ref={ref} activeColor="fgPrimary" font="label1" {...props} />
  )),
)`,computed:!0},required:!1},TabsActiveIndicatorComponent:{defaultValue:{value:`memo(
  ({
    activeTabRect,
    background = 'bgPrimaryWash',
    position = 'absolute',
    borderRadius = 1000,
    style,
  }: TabsActiveIndicatorProps) => {
    const { width, height, x } = activeTabRect;
    const activeAnimation = useMemo(() => ({ width, x }), [width, x]);

    if (!width) return null;

    return (
      <MotionBox
        animate={activeAnimation}
        borderRadius={borderRadius}
        data-testid="period-selector-active-indicator"
        height={height}
        initial={false}
        left={0}
        position={position}
        role="none"
        style={{
          backgroundColor: \`var(--color-\${background})\`,
          transition: 'background-color 0.2s ease',
          ...style,
        }}
        transition={tabsTransitionConfig}
      />
    );
  },
)`,computed:!0},required:!1}}};export{q as L,V as P,c as a};
