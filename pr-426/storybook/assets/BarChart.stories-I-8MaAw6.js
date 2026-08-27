import{j as e,r as A,R as h}from"./iframe-CsG_6vZR.js";import{c as D}from"./candles-DJXrbOj9.js";import{C as y,X as T,Y as k,S as J,u as G,e as K,f as Q,i as Z}from"./Axis---jO_ePi.js";import{P as ee}from"./PeriodSelector-BfzDOT3D.js";import{B as d}from"./BarChart-C5Xt7BMv.js";import{B as C,a as te,D as oe}from"./DefaultBar-BMg3sta9.js";import{V as E}from"./VStack-Cg_Yq2u4.js";import{T as m}from"./Text-B1CpMNU3.js";import{H as re}from"./HStack-DaDYipoP.js";import{R as ae,S as ie}from"./Scrubber-DLonfriL.js";import"./preload-helper-D9Z9MdNV.js";import"./motion-minimal-5s2ikV7b.js";import"./d3-interpolate-path-DAdKSvnf.js";import"./color-Ceo1QMNe.js";import"./useDimensions-BCh0uzfM.js";import"./use-transform-j7n1sQYA.js";import"./animate-8CM-1S-x.js";import"./SegmentedTabs-DYJTGjuC.js";import"./Tabs-GtfXq7u6.js";import"./index-CKRF3JMY.js";import"./useMergeRefs-DR4sGa7m.js";import"./useRefMap-BuzMvUkY.js";import"./Interactable--rqISG90.js";import"./useTheme-CmrOhAty.js";import"./Rect-CybC0zjI.js";import"./Pressable-DDN99tmF.js";import"./isArray-M0ytM-vC.js";import"./use-animate-UT4SKWDr.js";import"./use-unmount-effect-DmgCrakR.js";const Ie={title:"Components/Chart/BarChart",component:d},i=({children:t,title:a,description:l})=>e.jsxs(E,{gap:2,children:[e.jsx(m,{as:"h2",display:"block",font:"title3",children:a}),l,t]}),H=A.memo(t=>e.jsx(J,{...t,strokeWidth:1})),se=()=>{const t=Array.from({length:31},(r,x)=>`3/${x+1}`),c=[{id:"gains",data:[5,0,6,18,0,5,12,0,12,22,28,18,0,12,6,0,0,24,0,0,4,0,18,0,0,14,10,16,0,0,0],color:"var(--color-fgPositive)",stackId:"bars"},{id:"losses",data:[-4,0,-8,-12,-6,0,0,0,-18,0,-12,0,-9,-6,0,0,0,0,-22,-8,0,0,-10,-14,0,0,0,0,0,-12,-10],color:"var(--color-fgNegative)",stackId:"bars"}];return e.jsxs(y,{height:420,inset:32,series:c,xAxis:{data:t,scaleType:"band"},children:[e.jsx(T,{}),e.jsx(k,{showGrid:!0,GridLineComponent:H,tickLabelFormatter:r=>`$${r}M`}),e.jsx(C,{}),e.jsx(ae,{LineComponent:J,dataY:0})]})},ne=()=>{const t=Array.from({length:31},(x,f)=>`3/${f+1}`),r=[{id:"BRL",data:[0,0,0,0,0,0,0,20,40,100,60,60,60,0,0,0,0,0,0,160,40,80,140,180,120,0,0,0,30,30,40],color:"var(--color-accentBoldGreen)"},{id:"USDC",data:[0,0,0,0,0,0,0,0,0,60,260,260,240,220,180,160,200,240,220,0,0,0,0,0,0,250,250,250,250,250,250],color:"var(--color-accentBoldBlue)"},{id:"USD",data:[20,20,20,20,20,40,60,60,80,120,200,240,240,240,240,240,240,240,240,60,30,20,25,5,0,0,0,0,80,120,150],color:"var(--color-accentBoldIndigo, #5b6cff)"}];return e.jsx(d,{showXAxis:!0,stacked:!0,barMinSize:8,height:420,inset:32,series:r,stackGap:2,stackMinSize:16,xAxis:{data:t}})},le=()=>{const t=["J","F","M","A","M","J","J","A","S","O","N","D"],f=[{id:"purple",data:[null,6,8,10,7,6,6,8,null,null,null,null],color:"#b399ff"},{id:"blue",data:[null,10,12,11,10,9,10,11,null,null,null,null],color:"#4f7cff"},{id:"cyan",data:[null,7,10,12,11,10,8,11,null,null,null,null],color:"#00c2df"},{id:"green",data:[10,null,null,null,1,null,null,6,null,null,null,null],color:"#33c481"}],p=({children:u,...s})=>{if(s.height===0){const g=s.width;return e.jsx(te,{roundBottom:!0,roundTop:!0,borderRadius:1e3,fill:"var(--color-bgTertiary)",height:g,width:g,x:s.x,y:s.y-g})}return e.jsx(oe,{...s,children:u})};return e.jsx(d,{roundBaseline:!0,showXAxis:!0,stacked:!0,BarStackComponent:p,borderRadius:1e3,height:300,inset:0,series:f,showYAxis:!1,stackMinSize:24,width:403,xAxis:{tickLabelFormatter:u=>u==7?e.jsx("tspan",{style:{fontWeight:"bold"},children:t[u]}):t[u],categoryPadding:.27}})},N=[{id:"week",label:"1W"},{id:"month",label:"1M"},{id:"year",label:"1Y"}];A.memo(()=>{const{getXScale:t,getYScale:a}=G(),{scrubberPosition:l}=h.useContext(Q)??{},c=t(),r=a();if(!c||!r||l===void 0||!Z(c))return null;const x=r.range(),[f,p]=x,u=c.bandwidth();return e.jsx("rect",{fill:"var(--color-bgLine)",height:f-p,width:u,x:c(l),y:p})});const B=({position:t})=>e.jsxs(y,{height:200,inset:4,series:[{id:"data",data:[30,50,40,60,35]}],width:250,xAxis:{scaleType:"band",data:["A","B","C","D","E"]},yAxis:{domain:{min:0}},children:[e.jsx(T,{showGrid:!0,showLine:!0,bandGridLinePlacement:t,label:t}),e.jsx(C,{})]}),ce=()=>{const t=h.useRef(null),a=h.useRef(void 0),[l,c]=h.useState(N[0]),r=D.slice(0,l.id==="week"?7:l.id==="month"?30:D.length).reverse(),x=Math.min(...r.map(o=>parseFloat(o.low))),f=A.memo(({stroke:o})=>{const{getXScale:n,drawingArea:b}=G(),{scrubberPosition:S}=K(),w=n();if(!w||S===void 0)return null;const j=w(S);if(j===void 0)return null;const P="bandwidth"in w?w.bandwidth():0;return e.jsx("rect",{fill:o,height:b.height,width:P,x:j,y:b.y})}),p=r.map(o=>[parseFloat(o.low),parseFloat(o.high)]),u=A.memo(({x:o,y:n,width:b,height:S,originY:w,dataX:j,...P})=>{const{getYScale:U}=G(),$=U(),R=o+b/2,X=r[j],W=parseFloat(X.open),I=parseFloat(X.close),q=W<I?"var(--color-fgPositive)":"var(--color-fgNegative)",F=$?.(W)??0,L=$?.(I)??0,_=Math.abs(F-L),O=F<L?F:L;return e.jsxs("g",{children:[e.jsx("line",{stroke:q,strokeWidth:1,x1:R,x2:R,y1:n,y2:n+S}),e.jsx("rect",{fill:q,height:_,width:b,x:o,y:O})]})}),s=h.useCallback(o=>new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(o),[]),g=h.useCallback(o=>{const n=parseFloat(o)/1e3;return new Intl.NumberFormat("en-US",{style:"decimal",minimumFractionDigits:0,maximumFractionDigits:2}).format(n)+"k"},[]),z=h.useCallback(o=>{if(o===null||o>=r.length)return"";const n=parseInt(r[o].start);return new Date(n*1e3).toLocaleDateString("en-US",{month:"short",day:"numeric"})},[r]),M=h.useCallback(o=>{if(!t.current)return;const n=o!==void 0?`Open: ${s(parseFloat(r[o].open))}, Close: ${s(parseFloat(r[o].close))}, Volume: ${g(r[o].volume)}`:s(parseFloat(r[r.length-1].close));t.current.textContent=n,a.current=o},[r,s,g]),V=s(parseFloat(r[r.length-1].close));h.useEffect(()=>{M(a.current)},[r,M]);const Y=A.useId();return e.jsxs(E,{gap:2,children:[e.jsx(m,{"aria-live":"polite",font:"headline",id:Y,children:e.jsx("span",{ref:t,children:V})}),e.jsx(d,{enableScrubbing:!0,showXAxis:!0,showYAxis:!0,BarComponent:u,BarStackComponent:({children:o,...n})=>e.jsx("g",{...n,children:o}),animate:!1,"aria-labelledby":Y,borderRadius:0,height:400,onScrubberPositionChange:M,series:[{id:"stock-prices",data:p}],xAxis:{tickLabelFormatter:z},yAxis:{domain:{min:x},tickLabelFormatter:s,width:80,showGrid:!0,GridLineComponent:H},children:e.jsx(ie,{hideOverlay:!0,LineComponent:f,lineStroke:"var(--color-fgMuted)",seriesIds:[]})}),e.jsx(ee,{activeTab:l,justifyContent:"flex-start",onChange:o=>{o!==null&&c(o)},tabs:N,width:"fit-content"})]})},v=()=>e.jsxs(E,{gap:2,children:[e.jsx(i,{title:"Basic",children:e.jsx(d,{showXAxis:!0,showYAxis:!0,height:400,series:[{id:"weekly-data",data:[45,52,38,45,19,23,32]}],xAxis:{data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],showTickMarks:!0,showLine:!0},yAxis:{requestedTickCount:5,tickLabelFormatter:t=>`$${t}k`,showGrid:!0,showTickMarks:!0,showLine:!0,tickMarkSize:12,domain:{max:50}}})}),e.jsx(i,{title:"Right Y-Axis with Labels",children:e.jsxs(y,{height:400,series:[{id:"revenue",data:[45,52,38,45,19,23,32],color:"var(--color-accentBoldBlue)"}],xAxis:{data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],scaleType:"band"},children:[e.jsx(T,{showLine:!0,showTickMarks:!0,label:"Day of Week"}),e.jsx(k,{showGrid:!0,showLine:!0,showTickMarks:!0,label:"Revenue",position:"right",requestedTickCount:5,tickLabelFormatter:t=>`$${t}k`}),e.jsx(C,{})]})}),e.jsx(i,{title:"Negative Values with Top Axis",children:e.jsxs(y,{height:400,series:[{id:"losses",data:[-45,-52,-38,-45,-19,-23,-32],color:"var(--color-fgNegative)"}],xAxis:{data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],scaleType:"band"},children:[e.jsx(T,{showLine:!0,showTickMarks:!0,label:"Day of Week",position:"top"}),e.jsx(k,{showGrid:!0,showLine:!0,showTickMarks:!0,label:"Loss",requestedTickCount:5,tickLabelFormatter:t=>`$${t}k`}),e.jsx(C,{})]})}),e.jsx(i,{title:"Positive and Negative Cash Flow",children:e.jsx(se,{})}),e.jsx(i,{title:"Fiat & Stablecoin Balance",children:e.jsx(ne,{})}),e.jsx(i,{title:"Monthly Rewards",children:e.jsx(le,{})}),e.jsx(i,{title:"Multiple Y Axes",children:e.jsxs(y,{height:400,series:[{id:"revenue",data:[455,520,380,455,190,235],yAxisId:"revenue",color:"var(--color-accentBoldYellow)"},{id:"profit",data:[23,15,30,56,4,12],yAxisId:"profit",color:"var(--color-fgPositive)"}],xAxis:{data:["Jan","Feb","Mar","Apr","May","Jun"],scaleType:"band"},yAxis:[{id:"revenue"},{id:"profit"}],children:[e.jsx(T,{showLine:!0,showTickMarks:!0,label:"Month"}),e.jsx(k,{showGrid:!0,showLine:!0,showTickMarks:!0,axisId:"revenue",label:"Revenue",position:"left",requestedTickCount:5,tickLabelFormatter:t=>`$${t}k`,width:80}),e.jsx(k,{showLine:!0,showTickMarks:!0,axisId:"profit",label:"Profit",position:"right",requestedTickCount:5,tickLabelFormatter:t=>`$${t}k`,width:70}),e.jsx(C,{})]})}),e.jsx(i,{title:"Candlestick Chart",children:e.jsx(ce,{})}),e.jsx(i,{description:e.jsx(m,{color:"fgMuted",font:"body",children:"Simple gain/loss chart. Bars below zero are red (negative), bars at or above zero are green (positive). Uses hard transition at 0."}),title:"Gradient - Gain/Loss",children:e.jsx(d,{showXAxis:!0,showYAxis:!0,height:300,series:[{id:"profit",data:[-40,-28,15,-5,48,-12,22,-8,35,-18,42,-3],gradient:{axis:"y",stops:[{offset:-50,color:"var(--color-fgNegative)"},{offset:0,color:"var(--color-fgNegative)"},{offset:0,color:"var(--color-fgPositive)"},{offset:50,color:"var(--color-fgPositive)"}]}}],xAxis:{data:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},yAxis:{requestedTickCount:5,tickLabelFormatter:t=>`$${t}k`,showGrid:!0}})}),e.jsx(i,{description:e.jsx(m,{color:"fgMuted",font:"body",children:"Continuous gradient applied to bars. Each bar's color is determined by its value, transitioning smoothly from green (low) to yellow (mid) to red (high)."}),title:"Gradient - Continuous (Y-Axis)",children:e.jsx(d,{showXAxis:!0,showYAxis:!0,height:300,series:[{id:"temperature",data:[12,25,38,52,45,30,18],gradient:{axis:"y",stops:({min:t,max:a})=>[{offset:t,color:"var(--color-accentBoldGreen)"},{offset:(t+a)/2,color:"var(--color-accentBoldYellow)"},{offset:a,color:"var(--color-accentBoldRed)"}]}}],xAxis:{data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},yAxis:{requestedTickCount:5,tickLabelFormatter:t=>`${t}°C`,showGrid:!0}})}),e.jsx(i,{description:e.jsx(m,{color:"fgMuted",font:"body",children:"Hard transitions at 30 and 45. Bars below 30 are green (cool), 30-45 are yellow (warm), and above 45 are red (hot)."}),title:"Gradient - Hard Transitions (Y-Axis)",children:e.jsx(d,{showXAxis:!0,showYAxis:!0,height:300,series:[{id:"temperature",data:[25,32,48,52,29,38,22],gradient:{axis:"y",stops:[{offset:0,color:"var(--color-accentBoldGreen)"},{offset:30,color:"var(--color-accentBoldGreen)"},{offset:30,color:"var(--color-accentBoldYellow)"},{offset:45,color:"var(--color-accentBoldYellow)"},{offset:45,color:"var(--color-accentBoldRed)"},{offset:60,color:"var(--color-accentBoldRed)"}]}}],xAxis:{data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},yAxis:{requestedTickCount:5,tickLabelFormatter:t=>`${t}°C`,showGrid:!0}})}),e.jsx(i,{description:e.jsx(m,{color:"fgMuted",font:"body",children:"Gradient applied on X-axis (category index). Each bar gets a color based on its position in the chart, creating a rainbow effect."}),title:"Gradient - Continuous (X-Axis)",children:e.jsx(d,{showXAxis:!0,showYAxis:!0,height:300,series:[{id:"sales",data:[50,65,45,70,55,60,52],gradient:{axis:"x",stops:[{offset:0,color:"#ef4444"},{offset:1.5,color:"#f59e0b"},{offset:3,color:"#10b981"},{offset:4.5,color:"#3b82f6"},{offset:6,color:"#8b5cf6"}]}}],xAxis:{data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},yAxis:{requestedTickCount:5,showGrid:!0}})}),e.jsx(i,{description:e.jsx(m,{color:"fgMuted",font:"body",children:"Stacked bars with gradient. Each series can have its own gradient configuration, allowing for complex color compositions."}),title:"Gradient - Stacked Bars",children:e.jsx(d,{showXAxis:!0,showYAxis:!0,stacked:!0,height:300,series:[{id:"category-a",data:[20,30,25,35,28,32,27],gradient:{axis:"y",stops:({min:t,max:a})=>[{offset:t,color:"#3b82f6"},{offset:a,color:"#8b5cf6"}]}},{id:"category-b",data:[15,25,20,30,22,28,23],gradient:{axis:"y",stops:({min:t,max:a})=>[{offset:t,color:"#10b981"},{offset:a,color:"#059669"}]}}],xAxis:{data:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]},yAxis:{requestedTickCount:5,showGrid:!0}})}),e.jsx(i,{title:"Band Grid Position",children:e.jsxs(re,{gap:2,style:{flexWrap:"wrap"},children:[e.jsx(B,{position:"edges"}),e.jsx(B,{position:"start"}),e.jsx(B,{position:"middle"}),e.jsx(B,{position:"end"})]})})]});v.__docgenInfo={description:"",methods:[],displayName:"All"};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`() => {
  return <VStack gap={2}>
      <Example title="Basic">
        <BarChart showXAxis showYAxis height={400} series={[{
        id: 'weekly-data',
        data: [45, 52, 38, 45, 19, 23, 32]
      }]} xAxis={{
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        showTickMarks: true,
        showLine: true
      }} yAxis={{
        requestedTickCount: 5,
        tickLabelFormatter: value => \`$\${value}k\`,
        showGrid: true,
        showTickMarks: true,
        showLine: true,
        tickMarkSize: 12,
        domain: {
          max: 50
        }
      }} />
      </Example>
      <Example title="Right Y-Axis with Labels">
        <CartesianChart height={400} series={[{
        id: 'revenue',
        data: [45, 52, 38, 45, 19, 23, 32],
        color: 'var(--color-accentBoldBlue)'
      }]} xAxis={{
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        scaleType: 'band'
      }}>
          <XAxis showLine showTickMarks label="Day of Week" />
          <YAxis showGrid showLine showTickMarks label="Revenue" position="right" requestedTickCount={5} tickLabelFormatter={value => \`$\${value}k\`} />
          <BarPlot />
        </CartesianChart>
      </Example>
      <Example title="Negative Values with Top Axis">
        <CartesianChart height={400} series={[{
        id: 'losses',
        data: [-45, -52, -38, -45, -19, -23, -32],
        color: 'var(--color-fgNegative)'
      }]} xAxis={{
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        scaleType: 'band'
      }}>
          <XAxis showLine showTickMarks label="Day of Week" position="top" />
          <YAxis showGrid showLine showTickMarks label="Loss" requestedTickCount={5} tickLabelFormatter={value => \`$\${value}k\`} />
          <BarPlot />
        </CartesianChart>
      </Example>
      <Example title="Positive and Negative Cash Flow">
        <PositiveAndNegativeCashFlow />
      </Example>
      <Example title="Fiat & Stablecoin Balance">
        <FiatAndStablecoinBalance />
      </Example>
      <Example title="Monthly Rewards">
        <MonthlyRewards />
      </Example>
      <Example title="Multiple Y Axes">
        <CartesianChart height={400} series={[{
        id: 'revenue',
        data: [455, 520, 380, 455, 190, 235],
        yAxisId: 'revenue',
        color: 'var(--color-accentBoldYellow)'
      }, {
        id: 'profit',
        data: [23, 15, 30, 56, 4, 12],
        yAxisId: 'profit',
        color: 'var(--color-fgPositive)'
      }]} xAxis={{
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        scaleType: 'band'
      }} yAxis={[{
        id: 'revenue'
      }, {
        id: 'profit'
      }]}>
          <XAxis showLine showTickMarks label="Month" />
          <YAxis showGrid showLine showTickMarks axisId="revenue" label="Revenue" position="left" requestedTickCount={5} tickLabelFormatter={value => \`$\${value}k\`} width={80} />
          <YAxis showLine showTickMarks axisId="profit" label="Profit" position="right" requestedTickCount={5} tickLabelFormatter={value => \`$\${value}k\`} width={70} />
          <BarPlot />
        </CartesianChart>
      </Example>
      <Example title="Candlestick Chart">
        <Candlesticks />
      </Example>
      <Example description={<Text color="fgMuted" font="body">
            Simple gain/loss chart. Bars below zero are red (negative), bars at or above zero are
            green (positive). Uses hard transition at 0.
          </Text>} title="Gradient - Gain/Loss">
        <BarChart showXAxis showYAxis height={300} series={[{
        id: 'profit',
        data: [-40, -28, 15, -5, 48, -12, 22, -8, 35, -18, 42, -3],
        gradient: {
          axis: 'y',
          stops: [{
            offset: -50,
            color: 'var(--color-fgNegative)'
          }, {
            offset: 0,
            color: 'var(--color-fgNegative)'
          }, {
            offset: 0,
            color: 'var(--color-fgPositive)'
          }, {
            offset: 50,
            color: 'var(--color-fgPositive)'
          }]
        }
      }]} xAxis={{
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }} yAxis={{
        requestedTickCount: 5,
        tickLabelFormatter: value => \`$\${value}k\`,
        showGrid: true
      }} />
      </Example>
      <Example description={<Text color="fgMuted" font="body">
            Continuous gradient applied to bars. Each bar&apos;s color is determined by its value,
            transitioning smoothly from green (low) to yellow (mid) to red (high).
          </Text>} title="Gradient - Continuous (Y-Axis)">
        <BarChart showXAxis showYAxis height={300} series={[{
        id: 'temperature',
        data: [12, 25, 38, 52, 45, 30, 18],
        gradient: {
          axis: 'y',
          stops: ({
            min,
            max
          }: {
            min: number;
            max: number;
          }) => [{
            offset: min,
            color: 'var(--color-accentBoldGreen)'
          }, {
            offset: (min + max) / 2,
            color: 'var(--color-accentBoldYellow)'
          }, {
            offset: max,
            color: 'var(--color-accentBoldRed)'
          }]
        }
      }]} xAxis={{
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }} yAxis={{
        requestedTickCount: 5,
        tickLabelFormatter: value => \`\${value}°C\`,
        showGrid: true
      }} />
      </Example>
      <Example description={<Text color="fgMuted" font="body">
            Hard transitions at 30 and 45. Bars below 30 are green (cool), 30-45 are yellow (warm),
            and above 45 are red (hot).
          </Text>} title="Gradient - Hard Transitions (Y-Axis)">
        <BarChart showXAxis showYAxis height={300} series={[{
        id: 'temperature',
        data: [25, 32, 48, 52, 29, 38, 22],
        gradient: {
          axis: 'y',
          stops: [{
            offset: 0,
            color: 'var(--color-accentBoldGreen)'
          }, {
            offset: 30,
            color: 'var(--color-accentBoldGreen)'
          }, {
            offset: 30,
            color: 'var(--color-accentBoldYellow)'
          }, {
            offset: 45,
            color: 'var(--color-accentBoldYellow)'
          }, {
            offset: 45,
            color: 'var(--color-accentBoldRed)'
          }, {
            offset: 60,
            color: 'var(--color-accentBoldRed)'
          }]
        }
      }]} xAxis={{
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }} yAxis={{
        requestedTickCount: 5,
        tickLabelFormatter: value => \`\${value}°C\`,
        showGrid: true
      }} />
      </Example>
      <Example description={<Text color="fgMuted" font="body">
            Gradient applied on X-axis (category index). Each bar gets a color based on its position
            in the chart, creating a rainbow effect.
          </Text>} title="Gradient - Continuous (X-Axis)">
        <BarChart showXAxis showYAxis height={300} series={[{
        id: 'sales',
        data: [50, 65, 45, 70, 55, 60, 52],
        gradient: {
          axis: 'x',
          stops: [{
            offset: 0,
            color: '#ef4444'
          }, {
            offset: 1.5,
            color: '#f59e0b'
          }, {
            offset: 3,
            color: '#10b981'
          }, {
            offset: 4.5,
            color: '#3b82f6'
          }, {
            offset: 6,
            color: '#8b5cf6'
          }]
        }
      }]} xAxis={{
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }} yAxis={{
        requestedTickCount: 5,
        showGrid: true
      }} />
      </Example>
      <Example description={<Text color="fgMuted" font="body">
            Stacked bars with gradient. Each series can have its own gradient configuration,
            allowing for complex color compositions.
          </Text>} title="Gradient - Stacked Bars">
        <BarChart showXAxis showYAxis stacked height={300} series={[{
        id: 'category-a',
        data: [20, 30, 25, 35, 28, 32, 27],
        gradient: {
          axis: 'y',
          stops: ({
            min,
            max
          }: {
            min: number;
            max: number;
          }) => [{
            offset: min,
            color: '#3b82f6'
          }, {
            offset: max,
            color: '#8b5cf6'
          }]
        }
      }, {
        id: 'category-b',
        data: [15, 25, 20, 30, 22, 28, 23],
        gradient: {
          axis: 'y',
          stops: ({
            min,
            max
          }: {
            min: number;
            max: number;
          }) => [{
            offset: min,
            color: '#10b981'
          }, {
            offset: max,
            color: '#059669'
          }]
        }
      }]} xAxis={{
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }} yAxis={{
        requestedTickCount: 5,
        showGrid: true
      }} />
      </Example>
      <Example title="Band Grid Position">
        <HStack gap={2} style={{
        flexWrap: 'wrap'
      }}>
          <BandGridPositionExample position="edges" />
          <BandGridPositionExample position="start" />
          <BandGridPositionExample position="middle" />
          <BandGridPositionExample position="end" />
        </HStack>
      </Example>
    </VStack>;
}`,...v.parameters?.docs?.source}}};const qe=["All"];export{v as All,qe as __namedExportsOrder,Ie as default};
