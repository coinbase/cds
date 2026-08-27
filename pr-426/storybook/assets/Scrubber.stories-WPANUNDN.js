import{j as e,r as i,B as L}from"./iframe-CsG_6vZR.js";import{a as k}from"./assets-CEwpm_uP.js";import{u as M}from"./useTheme-CmrOhAty.js";import{S as a,D as P,b as E,c as W}from"./Scrubber-DLonfriL.js";import{B as H}from"./Button-D2WSek5T.js";import{V as B}from"./VStack-Cg_Yq2u4.js";import{T as F}from"./Text-B1CpMNU3.js";import{L as n}from"./LineChart-B4phGrye.js";import{u as y,e as S,q as w,S as T}from"./Axis---jO_ePi.js";import"./preload-helper-D9Z9MdNV.js";import"./use-animate-UT4SKWDr.js";import"./motion-minimal-5s2ikV7b.js";import"./use-unmount-effect-DmgCrakR.js";import"./animate-8CM-1S-x.js";import"./useRefMap-BuzMvUkY.js";import"./Icon-DTs0crZh.js";import"./Spinner-C8x8bhOH.js";import"./Pressable-DDN99tmF.js";import"./isArray-M0ytM-vC.js";import"./Interactable--rqISG90.js";import"./color-Ceo1QMNe.js";import"./Line-gTD9gPTA.js";import"./d3-interpolate-path-DAdKSvnf.js";import"./useDimensions-BCh0uzfM.js";import"./HStack-DaDYipoP.js";import"./use-transform-j7n1sQYA.js";const l=[10,22,29,45,98,45,22,52,21,4,68,20,21,58],Ce={component:a,title:"Components/Chart/Scrubber"},s=({children:t,title:r,description:o})=>e.jsxs(B,{gap:2,children:[e.jsx(F,{as:"h2",display:"block",font:"title3",children:r}),o,t]}),O=()=>e.jsx(n,{enableScrubbing:!0,showArea:!0,showYAxis:!0,height:{base:150,tablet:200,desktop:250},series:[{id:"prices",data:l}],xAxis:{range:({min:t,max:r})=>({min:t,max:r-8})},yAxis:{showGrid:!0},children:e.jsx(a,{idlePulse:!0})}),V=()=>e.jsx(n,{enableScrubbing:!0,height:{base:150,tablet:200,desktop:250},series:[{id:"top",data:[15,28,32,44,46,36,40,45,48,38]},{id:"upperMiddle",data:[12,23,21,29,34,28,31,38,42,35],color:"#ef4444",type:"dotted"},{id:"lowerMiddle",data:[8,15,14,25,20,18,22,28,24,30],color:"#f59e0b",curve:"natural"},{id:"bottom",data:[4,8,11,15,16,14,16,10,12,14],color:"#800080",curve:"step",showArea:!0}],children:e.jsx(a,{seriesIds:["top","lowerMiddle"]})}),$=()=>e.jsx(n,{enableScrubbing:!0,showArea:!0,height:{base:150,tablet:200,desktop:250},series:[{id:"prices",data:l,label:"Price"}],children:e.jsx(a,{label:t=>`Day ${t+1}`})}),G=()=>e.jsx(n,{enableScrubbing:!0,showArea:!0,height:{base:150,tablet:200,desktop:250},series:[{id:"prices",data:l,color:"var(--color-fgPositive)"}],children:e.jsx(a,{idlePulse:!0})}),R=()=>{const t=i.useRef(null);return e.jsxs(B,{gap:2,children:[e.jsx(n,{enableScrubbing:!0,showArea:!0,height:{base:150,tablet:200,desktop:250},series:[{id:"prices",data:l}],children:e.jsx(a,{ref:t})}),e.jsx(H,{onClick:()=>t.current?.pulse(),children:"Pulse"})]})},Y=()=>e.jsx(L,{borderRadius:300,padding:2,style:{background:"rgb(var(--red40))"},children:e.jsx(n,{enableScrubbing:!0,showArea:!0,height:{base:150,tablet:200,desktop:250},series:[{id:"prices",data:l,color:"rgb(var(--gray0))"}],children:e.jsx(a,{hideOverlay:!0,idlePulse:!0,beaconStroke:"rgb(var(--red40))",lineStroke:"rgb(var(--gray0))"})})}),_=()=>{const t=i.memo(r=>e.jsx(P,{...r,color:"var(--color-bg)",radius:5,stroke:"var(--color-fg)",strokeWidth:3}));return e.jsx(n,{enableScrubbing:!0,showArea:!0,showYAxis:!0,height:{base:150,tablet:200,desktop:250},series:[{id:"prices",data:l,color:"var(--color-fg)"}],xAxis:{range:({min:r,max:o})=>({min:r,max:o-16})},yAxis:{showGrid:!0,domain:{min:0,max:100}},children:e.jsx(a,{BeaconComponent:t})})},q=()=>{const t=i.memo(({seriesId:r,color:o,label:c,...b})=>{const{getSeriesData:m,dataLength:d}=y(),{scrubberPosition:x}=S(),u=i.useMemo(()=>w(m(r)),[m,r]),p=i.useMemo(()=>x??Math.max(0,d-1),[x,d]),g=i.useMemo(()=>{if(u!==void 0){const j=u[p];return`${c} · ${j}%`}return c},[c,u,p]);return e.jsx(E,{...b,background:o,color:"rgb(var(--gray0))",label:g,seriesId:r})});return e.jsx(n,{enableScrubbing:!0,showArea:!0,showYAxis:!0,areaType:"dotted",height:{base:150,tablet:200,desktop:250},series:[{id:"Boston",data:[25,30,35,45,60,100],color:"rgb(var(--green40))",label:"Boston"},{id:"Miami",data:[20,25,30,35,20,0],color:"rgb(var(--blue40))",label:"Miami"},{id:"Denver",data:[10,15,20,25,40,0],color:"rgb(var(--orange40))",label:"Denver"},{id:"Phoenix",data:[15,10,5,0,0,0],color:"rgb(var(--red40))",label:"Phoenix"}],yAxis:{showGrid:!0},children:e.jsx(a,{BeaconLabelComponent:t})})},A=({preferredSide:t})=>{const r=i.memo(({seriesId:d,color:x,label:u,...p})=>{const{getSeriesData:g,dataLength:j}=y(),{scrubberPosition:f}=S(),v=i.useMemo(()=>w(g(d)),[g,d]),C=i.useMemo(()=>f??Math.max(0,j-1),[f,j]),I=i.useMemo(()=>{if(v!==void 0){const D=v[C];return e.jsxs(e.Fragment,{children:[D,"%",e.jsxs("tspan",{fontWeight:"400",children:[" ",u]})]})}return u},[u,v,C]);return e.jsx(E,{...p,background:x,color:"rgb(var(--gray0))",label:I,seriesId:d})}),c=M().activeColorScheme==="light",b=c?"rgb(var(--gray90))":"rgb(var(--gray0))",m=c?"rgb(var(--gray0))":"rgb(var(--gray90))";return e.jsx(L,{borderRadius:300,padding:2,style:{background:b},children:e.jsx(n,{enableScrubbing:!0,showArea:!0,areaType:"dotted",height:250,inset:{bottom:8,left:8,top:8,right:0},series:[{id:"prices2",data:[90,78,71,55,2,55,78,48,79,96,32,80,79,42],color:"rgb(var(--blue40))",label:"ATL"},{id:"prices",data:[10,22,29,45,98,45,22,52,21,4,68,20,21,58],color:"rgb(var(--chartreuse40))",label:"NYC"}],xAxis:{range:({min:d,max:x})=>({min:d,max:x-92})},children:e.jsx(a,{hideOverlay:!0,idlePulse:!0,BeaconLabelComponent:r,beaconLabelPreferredSide:t,beaconStroke:b,lineStroke:m})})})},N=()=>e.jsx(n,{enableScrubbing:!0,legend:!0,showArea:!0,height:{base:150,tablet:200,desktop:250},inset:{top:60},series:[{id:"pageViews",data:[2400,1398,9800,3908,4800,3800,4300],color:"var(--color-accentBoldGreen)",label:"Page Views"},{id:"uniqueVisitors",data:[4e3,3e3,2e3,2780,1890,2390,3490],color:"var(--color-accentBoldPurple)",label:"Unique Visitors"}],children:e.jsx(a,{hideBeaconLabels:!0,labelElevated:!0,label:t=>`Day ${t+1}`})}),X=()=>e.jsx(n,{enableScrubbing:!0,showArea:!0,height:{base:150,tablet:200,desktop:250},inset:{top:60},series:[{id:"prices",data:l}],children:e.jsx(a,{labelElevated:!0,label:t=>`Day ${t+1}`})}),U=()=>{const t=i.memo(r=>{const{drawingArea:o}=y();return o?e.jsx(W,{...r,elevated:!0,background:"var(--color-bgPrimary)",color:"var(--color-bgPrimaryWash)",dy:32,fontWeight:"label1",y:o.y+o.height}):null});return e.jsx(n,{enableScrubbing:!0,showArea:!0,height:{base:150,tablet:200,desktop:250},inset:{top:16,bottom:64},series:[{id:"prices",data:l}],children:e.jsx(a,{LabelComponent:t,label:r=>`Day ${r+1}`})})},z=()=>e.jsx(n,{enableScrubbing:!0,showArea:!0,showYAxis:!0,height:{base:150,tablet:200,desktop:250},series:[{id:"btc",data:l,label:"BTC",color:k.btc.color},{id:"eth",data:[5,15,18,30,65,30,15,35,15,2,45,12,15,40],label:"ETH",color:k.eth.color}],yAxis:{showGrid:!0},children:e.jsx(a,{beaconLabelFont:"legal",label:t=>`Day ${t+1}`,labelFont:"legal"})}),J=()=>e.jsxs(B,{gap:4,children:[e.jsx(L,{marginX:-3,children:e.jsx(n,{enableScrubbing:!0,showArea:!0,height:{base:150,tablet:200,desktop:250},inset:{left:0,right:0},series:[{id:"prices",data:l}],children:e.jsx(a,{label:"Without bounds - text touches edge",labelBoundsInset:0})})}),e.jsx(L,{marginX:-3,children:e.jsx(n,{enableScrubbing:!0,showArea:!0,height:{base:150,tablet:200,desktop:250},inset:{left:0,right:0},series:[{id:"prices",data:l}],children:e.jsx(a,{label:"With bounds inset - text has space",labelBoundsInset:{top:0,bottom:0,left:12,right:12}})})})]}),K=()=>e.jsx(n,{enableScrubbing:!0,showArea:!0,height:{base:150,tablet:200,desktop:250},series:[{id:"prices",data:l}],children:e.jsx(a,{LineComponent:T})}),Q=()=>{const t=i.memo(o=>{const{scrubberPosition:c}=S(),b=c!==void 0;return e.jsx(P,{...o,opacity:b?1:0})}),r=i.memo(o=>{const{scrubberPosition:c}=S(),b=c!==void 0;return e.jsx(E,{...o,opacity:b?1:0})});return e.jsx(n,{enableScrubbing:!0,showArea:!0,height:{base:150,tablet:200,desktop:250},series:[{id:"prices",data:l,label:"Price"}],children:e.jsx(a,{BeaconComponent:t,BeaconLabelComponent:r})})},Z=()=>e.jsx(n,{enableScrubbing:!0,showArea:!0,height:{base:150,tablet:200,desktop:250},series:[{id:"prices",data:l}],children:e.jsx(a,{hideOverlay:!0})}),h=()=>e.jsxs(B,{gap:4,children:[e.jsx(s,{title:"Basic",children:e.jsx(O,{})}),e.jsx(s,{title:"Series Filter",children:e.jsx(V,{})}),e.jsx(s,{title:"With Labels",children:e.jsx($,{})}),e.jsx(s,{title:"Idle Pulse",children:e.jsx(G,{})}),e.jsx(s,{title:"Imperative Pulse",children:e.jsx(R,{})}),e.jsx(s,{title:"Beacon Stroke",children:e.jsx(Y,{})}),e.jsx(s,{title:"Custom Beacon",children:e.jsx(_,{})}),e.jsx(s,{title:"Custom Beacon Label",children:e.jsx(q,{})}),e.jsx(s,{title:"Beacon Labels",children:e.jsx(A,{})}),e.jsx(s,{title:"Beacon Labels - Left Side Preferred",children:e.jsx(A,{preferredSide:"left"})}),e.jsx(s,{title:"Hide Beacon Labels",children:e.jsx(N,{})}),e.jsx(s,{title:"Label Elevated",children:e.jsx(X,{})}),e.jsx(s,{title:"Custom Label Component",children:e.jsx(U,{})}),e.jsx(s,{title:"Label Fonts",children:e.jsx(z,{})}),e.jsx(s,{title:"Label Bounds Inset",children:e.jsx(J,{})}),e.jsx(s,{title:"Custom Line",children:e.jsx(K,{})}),e.jsx(s,{title:"Hidden Scrubber When Idle",children:e.jsx(Q,{})}),e.jsx(s,{title:"Hide Overlay",children:e.jsx(Z,{})})]});h.__docgenInfo={description:"",methods:[],displayName:"All"};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => {
  return <VStack gap={4}>
      <Example title="Basic">
        <BasicScrubber />
      </Example>
      <Example title="Series Filter">
        <SeriesFilter />
      </Example>
      <Example title="With Labels">
        <WithLabels />
      </Example>
      <Example title="Idle Pulse">
        <IdlePulse />
      </Example>
      <Example title="Imperative Pulse">
        <ImperativePulse />
      </Example>
      <Example title="Beacon Stroke">
        <BeaconStroke />
      </Example>
      <Example title="Custom Beacon">
        <CustomBeacon />
      </Example>
      <Example title="Custom Beacon Label">
        <CustomBeaconLabel />
      </Example>
      <Example title="Beacon Labels">
        <PercentageBeaconLabels />
      </Example>
      <Example title="Beacon Labels - Left Side Preferred">
        <PercentageBeaconLabels preferredSide="left" />
      </Example>
      <Example title="Hide Beacon Labels">
        <HideBeaconLabels />
      </Example>
      <Example title="Label Elevated">
        <LabelElevated />
      </Example>
      <Example title="Custom Label Component">
        <CustomLabelComponent />
      </Example>
      <Example title="Label Fonts">
        <LabelFonts />
      </Example>
      <Example title="Label Bounds Inset">
        <LabelBoundsInset />
      </Example>
      <Example title="Custom Line">
        <CustomLine />
      </Example>
      <Example title="Hidden Scrubber When Idle">
        <HiddenScrubberWhenIdle />
      </Example>
      <Example title="Hide Overlay">
        <HideOverlay />
      </Example>
    </VStack>;
}`,...h.parameters?.docs?.source}}};const ke=["All"];export{h as All,ke as __namedExportsOrder,Ce as default};
