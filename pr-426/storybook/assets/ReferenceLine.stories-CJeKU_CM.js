import{j as e,r as i}from"./iframe-CYDANtMt.js";import{a as J}from"./assets-CEwpm_uP.js";import{s as $}from"./SparklineInteractiveData-DMKVVxW5.js";import{u as K}from"./useTheme-C_Ehsh33.js";import{D as T,S as Q,u as V,a as ee,e as te}from"./Axis-Dh1tDFUo.js";import{R as s,a as b,S as re}from"./Scrubber-BkjzGxfS.js";import{L as h}from"./LineChart-BPZ39NzJ.js";import{V as F}from"./VStack-iXgNewwv.js";import{T as ie}from"./Text-0g3rWpAf.js";import"./preload-helper-D9Z9MdNV.js";import"./motion-minimal-B1h7XI-_.js";import"./d3-interpolate-path-DAdKSvnf.js";import"./color-Ceo1QMNe.js";import"./useDimensions-C4mzPCUe.js";import"./HStack-Fh-9TmPm.js";import"./use-transform-BHujfv3A.js";import"./animate-NV5OIPt9.js";import"./use-animate-7aavNjax.js";import"./use-unmount-effect-DjWyEMV9.js";import"./useRefMap-BFAUTUSj.js";import"./Line-DNltR6jQ.js";const Fe={component:s,title:"Components/Chart/ReferenceLine"},g=({children:t,title:r,description:a})=>e.jsxs(F,{gap:2,children:[e.jsx(ie,{font:"headline",children:r}),a,t]});i.memo(t=>e.jsx(b,{...t,dx:16,horizontalAlignment:"left"}));const ae=i.memo(t=>e.jsx(b,{...t,dx:8,horizontalAlignment:"left"})),oe=i.memo(t=>e.jsx(b,{...t,background:"var(--color-bgPositive)",borderRadius:8,color:"white",dx:-16,inset:{top:8,bottom:8,left:12,right:12}})),ne=i.memo(t=>e.jsx(b,{...t,background:"var(--color-accentSubtleYellow)",borderRadius:4,color:"rgb(var(--yellow70))",dx:12,font:"label1",horizontalAlignment:"left",inset:{top:4,bottom:4,left:8,right:8}})),le=i.memo(t=>e.jsx(b,{...t,background:"var(--color-bg)",borderRadius:4,color:"rgb(var(--yellow70))",dx:-12,font:"label1",horizontalAlignment:"right",inset:{top:2,bottom:2,left:4,right:4}})),se=i.memo(({color:t,...r})=>e.jsx(b,{...r,background:t,borderRadius:4,color:"white",dx:-12,font:"label1",horizontalAlignment:"right",inset:{top:5,bottom:5,left:10,right:10}})),ce=({x:t,y:r})=>{const a=n=>e.jsx("circle",{...n,fill:"var(--color-fg)",r:"1.5"});return e.jsx("g",{transform:`translate(${t}, ${r})`,children:e.jsxs("g",{transform:"translate(0, -8)",children:[e.jsx(a,{cx:"2",cy:"2"}),e.jsx(a,{cx:"2",cy:"8"}),e.jsx(a,{cx:"2",cy:"14"}),e.jsx(a,{cx:"9",cy:"2"}),e.jsx(a,{cx:"9",cy:"8"}),e.jsx(a,{cx:"9",cy:"14"})]})})},me=({x:t,y:r,isPositive:a,color:n})=>e.jsx("g",{transform:`translate(${t-8}, ${r-8})`,children:e.jsx("g",{style:{transform:a?"scale(-1, -1)":"scale(-1, 1)",transformOrigin:"8px 8px"},children:e.jsx("path",{d:"M4.88574 12.7952L14.9887 2.69223L13.2916 0.995178L3.18883 11.098V4.84898L0.988831 7.04898V14.9952H8.99974L11.1997 12.7952H4.88574Z",fill:n})})}),de=i.memo(({baselineAmount:t,startAmount:r,chartRef:a})=>{const n=K(),c=i.useCallback(l=>`$${l.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`,[]),{getYScale:p,drawingArea:o}=V(),[m,S]=i.useState(r),[j,v]=i.useState(!1),[R,H]=i.useState({width:0,height:0}),f=m>=t?"var(--color-bgPositive)":"var(--color-bgNegative)",d=p();i.useEffect(()=>{const l=a.current;if(!l||!d||!("invert"in d&&typeof d.invert=="function"))return;const E=M=>{if(!j)return;const D=l.createSVGPoint();D.x=M.clientX,D.y=M.clientY;const B=D.matrixTransform(l.getScreenCTM()?.inverse()),G=Math.max(o.y,Math.min(o.y+o.height,B.y)),Y=(d.invert(G)-t)/t*100;let A=Math.round(Y);A===0&&(A=Y>=0?1:-1);const Z=t*(1+A/100);S(Z)},k=()=>{v(!1)},z=()=>{v(!1)};return l.addEventListener("mousemove",E),l.addEventListener("mouseup",k),l.addEventListener("mouseleave",z),()=>{l.removeEventListener("mousemove",E),l.removeEventListener("mouseup",k),l.removeEventListener("mouseleave",z)}},[j,d,a,t,o.y,o.height]);const W=i.useCallback(l=>e.jsx(se,{...l,color:f}),[f]);if(!d)return null;const x=d(m);if(x==null)return null;const P=m-t,I=Math.round(P/t*100),q=P>0,U=`${Math.abs(I)}% (${c(Math.abs(P))})`,_=c(m),X=l=>{l.preventDefault(),v(!0)},L=16,y=16,w=16,C=8,N=L*2+C,O=R.width+N+y+w;return e.jsxs(e.Fragment,{children:[e.jsx(s,{LabelComponent:W,dataY:m,label:_,labelPosition:"right"}),e.jsxs("g",{onMouseDown:X,style:{cursor:j?"grabbing":"grab",opacity:R.width===0?0:1},children:[e.jsx("rect",{fill:"var(--color-bgSecondary)",height:32,rx:n.borderRadius[400],ry:n.borderRadius[400],width:O,x:o.x,y:x-16}),e.jsx(ce,{x:o.x+L,y:x}),e.jsx(me,{color:f,isPositive:q,x:o.x+L+y+C,y:x}),e.jsx(ee,{disableRepositioning:!0,color:f,font:"label1",horizontalAlignment:"left",onDimensionsChange:l=>H(l),verticalAlignment:"middle",x:o.x+L+y+C+w,y:x+1,children:U})]})]})}),ge=128,he=i.memo(t=>{const{scrubberPosition:r}=te(),{getXScale:a,drawingArea:n}=V(),c=r!==void 0,p=i.useMemo(()=>{if(!c)return 0;const o=a();if(!o)return 1;const m=o(r)??0;return n.x+n.width-m>=ge?1:0},[c,r,a,n]);return e.jsx(b,{...t,background:"var(--color-bgSecondary)",borderRadius:12.5,color:"var(--color-fg)",font:"label1",inset:{top:4,bottom:4,left:8,right:8},styles:{root:{opacity:p,transition:"opacity 0.25s ease"}}})}),be=()=>{const t=i.useMemo(()=>$.hour,[]),r=t[0].value,c=t[t.length-1].value>=r?"var(--color-fgPositive)":"var(--color-fgNegative)",p=i.useMemo(()=>r.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}),[r]);return e.jsxs(h,{enableScrubbing:!0,showArea:!0,areaType:"dotted",height:300,series:[{id:"hourly-prices",data:t.map(o=>o.value),color:c}],xAxis:{range:({min:o,max:m})=>({min:o,max:m-24})},children:[e.jsx(re,{}),e.jsx(s,{LabelComponent:he,LineComponent:o=>e.jsx(T,{...o,strokeDasharray:"0 16",strokeWidth:3}),dataY:r,label:p,labelDx:-12,labelHorizontalAlignment:"right",stroke:"var(--color-fgMuted)"})]})},xe=()=>{const t=i.useMemo(()=>$.year.map(n=>n.value),[]),r=i.useRef(null),a=i.useCallback(n=>`$${n.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`,[]);return e.jsxs(h,{ref:r,showArea:!0,animate:!1,height:250,inset:{top:16,bottom:16,left:8,right:80},series:[{id:"prices",data:t,color:J.btc.color}],yAxis:{domain:({min:n,max:c})=>({min:n*.7,max:c*1.3})},children:[e.jsx(s,{LabelComponent:ae,LineComponent:Q,dataY:t[t.length-1],label:a(t[t.length-1])}),e.jsx(de,{baselineAmount:t[t.length-1],chartRef:r,startAmount:t[t.length-1]*1.3})]})},u=()=>e.jsxs(F,{gap:2,children:[e.jsx(g,{title:"Simple Reference Line",children:e.jsx(h,{showArea:!0,height:250,series:[{id:"prices",data:[10,22,29,45,98,45,22,52,21,4,68,20,21,58],color:"var(--color-fgPositive)"}],children:e.jsx(s,{LineComponent:t=>e.jsx(T,{...t,strokeDasharray:"0 16",strokeWidth:3}),dataY:10,stroke:"var(--color-fg)"})})}),e.jsx(g,{title:"With Label",children:e.jsx(h,{showArea:!0,height:250,inset:{right:32},series:[{id:"prices",data:[10,22,29,45,98,45,22,52,21,4,68,20,21,58]}],children:e.jsx(s,{dataY:50,label:"$50",labelDx:16,labelHorizontalAlignment:"left"})})}),e.jsx(g,{description:"Using labelDx, labelDy, labelHorizontalAlignment, and labelVerticalAlignment props",title:"Label Customization",children:e.jsxs(h,{showArea:!0,height:250,series:[{id:"prices",data:[10,22,29,45,98,45,22,52,21,4,68,20,21,58]}],children:[e.jsx(s,{dataY:75,label:"Top Right",labelDx:-8,labelDy:-8,labelFont:"label1",labelHorizontalAlignment:"right",labelPosition:"right",labelVerticalAlignment:"bottom"}),e.jsx(s,{dataX:7,label:"Bottom Left",labelDx:8,labelDy:8,labelFont:"label1",labelHorizontalAlignment:"left",labelPosition:"top",labelVerticalAlignment:"top"})]})}),e.jsx(g,{title:"Price Reference Line",children:e.jsx(h,{showArea:!0,height:250,inset:{right:32},series:[{id:"prices",data:[10,22,29,45,98,45,22,52,21,4,68,20,21,58]}],children:e.jsx(s,{LabelComponent:oe,dataY:75,label:"$75",labelPosition:"right"})})}),e.jsx(g,{title:"Liquidation",children:e.jsxs(h,{height:250,inset:{right:4},series:[{id:"prices",data:[10,22,29,45,98,45,22,52,21,4,68,20,21,58]}],children:[e.jsx(s,{LabelComponent:ne,dataY:25,label:"Liquidation",labelPosition:"left",stroke:"var(--color-bgWarning)"}),e.jsx(s,{LabelComponent:le,dataY:25,label:"$25",labelPosition:"right",stroke:"transparent"})]})}),e.jsx(g,{title:"Price Target",children:e.jsx(xe,{})}),e.jsx(g,{title:"Start Price Reference Line",children:e.jsx(be,{})})]});u.__docgenInfo={description:"",methods:[],displayName:"All"};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`() => {
  return <VStack gap={2}>
      <Example title="Simple Reference Line">
        <LineChart showArea height={250} series={[{
        id: 'prices',
        data: [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58],
        color: 'var(--color-fgPositive)'
      }]}>
          <ReferenceLine LineComponent={props => <DottedLine {...props} strokeDasharray="0 16" strokeWidth={3} />} dataY={10} stroke="var(--color-fg)" />
        </LineChart>
      </Example>
      <Example title="With Label">
        <LineChart showArea height={250} inset={{
        right: 32
      }} series={[{
        id: 'prices',
        data: [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58]
      }]}>
          <ReferenceLine dataY={50} label="$50" labelDx={16} labelHorizontalAlignment="left" />
        </LineChart>
      </Example>
      <Example description="Using labelDx, labelDy, labelHorizontalAlignment, and labelVerticalAlignment props" title="Label Customization">
        <LineChart showArea height={250} series={[{
        id: 'prices',
        data: [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58]
      }]}>
          <ReferenceLine dataY={75} label="Top Right" labelDx={-8} labelDy={-8} labelFont="label1" labelHorizontalAlignment="right" labelPosition="right" labelVerticalAlignment="bottom" />
          <ReferenceLine dataX={7} label="Bottom Left" labelDx={8} labelDy={8} labelFont="label1" labelHorizontalAlignment="left" labelPosition="top" labelVerticalAlignment="top" />
        </LineChart>
      </Example>
      <Example title="Price Reference Line">
        <LineChart showArea height={250} inset={{
        right: 32
      }} series={[{
        id: 'prices',
        data: [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58]
      }]}>
          <ReferenceLine LabelComponent={PositivePriceLabel} dataY={75} label="$75" labelPosition="right" />
        </LineChart>
      </Example>
      <Example title="Liquidation">
        <LineChart height={250} inset={{
        right: 4
      }} series={[{
        id: 'prices',
        data: [10, 22, 29, 45, 98, 45, 22, 52, 21, 4, 68, 20, 21, 58]
      }]}>
          <ReferenceLine LabelComponent={LiquidationLabel} dataY={25} label="Liquidation" labelPosition="left" stroke="var(--color-bgWarning)" />
          <ReferenceLine LabelComponent={PriceLabel} dataY={25} label="$25" labelPosition="right" stroke="transparent" />
        </LineChart>
      </Example>
      <Example title="Price Target">
        <PriceTargetChart />
      </Example>
      <Example title="Start Price Reference Line">
        <StartPriceReferenceLine />
      </Example>
    </VStack>;
}`,...u.parameters?.docs?.source}}};const He=["All"];export{u as All,He as __namedExportsOrder,Fe as default};
