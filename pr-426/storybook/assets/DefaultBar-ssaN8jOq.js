import{r as A,j as k}from"./iframe-CYDANtMt.js";import{j as tt,u as K,k as gt,l as mt,i as at,m as yt}from"./Axis-Dh1tDFUo.js";import{m as ot}from"./motion-minimal-B1h7XI-_.js";function Bt(m,d){return m<=1?0:d*(m-1)/m}const st=A.memo(({x:m,y:d,width:b,height:l,originY:o,dataX:P,dataY:V,seriesId:q,BarComponent:Y=ct,fill:H="var(--color-fgPrimary)",fillOpacity:C=1,stroke:O,strokeWidth:M,borderRadius:v=4,roundTop:y=!0,roundBottom:x=!0,transition:E})=>{const R=A.useMemo(()=>tt(m,d,b,l,v,y,x),[m,d,b,l,v,y,x]),j=o??d+l;return R?k.jsx(Y,{borderRadius:v,d:R,dataX:P,dataY:V,fill:H,fillOpacity:C,height:l,originY:j,roundBottom:x,roundTop:y,seriesId:q,stroke:O,strokeWidth:M,transition:E,width:b,x:m,y:d}):null});st.__docgenInfo={description:`Simple bar component that renders a single bar at the specified position.

This component is intentionally kept simple - it just renders a bar at the given
x, y, width, height coordinates. Complex positioning logic (like handling stacks,
groups, gaps, etc.) should be handled by parent components like BarChart or BarStack.

@example
\`\`\`tsx
<Bar x={10} y={20} width={50} height={100} fill="blue" />
\`\`\``,methods:[],displayName:"Bar",props:{BarComponent:{defaultValue:{value:`memo<DefaultBarProps>(
  ({
    x,
    width,
    borderRadius = 4,
    roundTop,
    roundBottom,
    originY,
    d,
    fill = 'var(--color-fgPrimary)',
    fillOpacity = 1,
    dataX,
    dataY,
    seriesId,
    transition,
    ...props
  }) => {
    const { animate } = useCartesianChartContext();

    const initialPath = useMemo(() => {
      if (!animate) return undefined;
      // Need a minimum height to allow for animation
      const minHeight = 1;
      const initialY = (originY ?? 0) - minHeight;
      return getBarPath(x, initialY, width, minHeight, borderRadius, !!roundTop, !!roundBottom);
    }, [animate, x, originY, width, borderRadius, roundTop, roundBottom]);

    if (animate && initialPath) {
      return (
        <motion.path
          {...props}
          animate={{ d }}
          fill={fill}
          fillOpacity={fillOpacity}
          initial={{ d: initialPath }}
          transition={transition}
        />
      );
    }

    return <path {...props} d={d} fill={fill} fillOpacity={fillOpacity} />;
  },
)`,computed:!0},required:!1},fill:{defaultValue:{value:"'var(--color-fgPrimary)'",computed:!1},required:!1},fillOpacity:{defaultValue:{value:"1",computed:!1},required:!1},borderRadius:{defaultValue:{value:"4",computed:!1},required:!1},roundTop:{defaultValue:{value:"true",computed:!1},required:!1},roundBottom:{defaultValue:{value:"true",computed:!1},required:!1}}};const rt=A.memo(({children:m,className:d,style:b,width:l,height:o,x:P,y:V,borderRadius:q=4,roundTop:Y=!0,roundBottom:H=!0,yOrigin:C,transition:O})=>{const{animate:M}=K(),v=A.useId(),y=A.useMemo(()=>tt(P,V,l,o,q,Y,H),[P,V,l,o,q,Y,H]),x=A.useMemo(()=>{if(M)return tt(P,C??V+o,l,1,q,Y,H)},[M,P,C,V,o,l,q,Y,H]);return k.jsxs(k.Fragment,{children:[k.jsx("defs",{children:k.jsx("clipPath",{id:v,children:M?k.jsx(ot.path,{animate:{d:y},initial:{d:x},transition:O}):k.jsx("path",{d:y})})}),k.jsx("g",{className:d,clipPath:`url(#${v})`,style:b,children:m})]})});rt.__docgenInfo={description:"Default stack component that renders children in a group with animated clip path.",methods:[],displayName:"DefaultBarStack",props:{borderRadius:{defaultValue:{value:"4",computed:!1},required:!1},roundTop:{defaultValue:{value:"true",computed:!1},required:!1},roundBottom:{defaultValue:{value:"true",computed:!1},required:!1}}};const Z=1e-4,lt=A.memo(({series:m,categoryIndex:d,x:b,width:l,yScale:o,rect:P,BarComponent:V,fillOpacity:q,stroke:Y,strokeWidth:H,borderRadius:C=4,BarStackComponent:O=rt,stackGap:M,barMinSize:v,stackMinSize:y,roundBaseline:x,transition:E})=>{const{getSeriesData:R,getXAxis:j,getXScale:$,getSeries:et}=K(),z=$(),_=v,W=y,J=j(),f=A.useMemo(()=>{const t=o.domain(),[G,N]=t,Q=G>=0?G:N<=0?N:0,X=o(Q)??P.y+P.height;return Math.max(P.y,Math.min(X,P.y+P.height))},[P.height,P.y,o]),nt=A.useMemo(()=>m.map(t=>{if(!t.gradient||!z||!o)return null;const G=t.gradient.axis==="x"?z:o,N=gt(t.gradient,z,o);return N?{seriesId:t.id,gradient:t.gradient,scale:G,stops:N}:null}),[m,z,o]),{bars:dt,stackRect:F}=A.useMemo(()=>{let t=[],G=1/0,N=-1/0;if(m.forEach(c=>{const s=R(c.id);if(!s)return;const i=s[d];if(i==null)return;const r=c.data?.[d],g=!Array.isArray(r),[u,e]=i.sort((T,I)=>T-I),a=o(u)??f,B=o(e)??f,w=Math.abs(a-B),D=Math.min(a,B);if(w<=0)return;G=Math.min(G,D),N=Math.max(N,D+w);let n=c.color??"var(--color-fgPrimary)";const p=nt.find(T=>T?.seriesId===c.id);if(p&&r!==null&&r!==void 0){const T=p.gradient.axis??"y";let I;T==="x"?I=d:I=Array.isArray(r)?r[1]:r;const S=mt(p.stops,I,p.scale);S&&(n=S)}t.push({seriesId:c.id,x:b,y:D,width:l,height:w,dataY:i,fill:n,roundTop:x||Math.abs(B-f)>=Z,roundBottom:x||Math.abs(a-f)>=Z,BarComponent:c.BarComponent,shouldApplyGap:g})}),M&&t.length>1){const c=t.filter(i=>{const[h,r]=i.dataY.sort((g,u)=>g-u);return h>=0&&r!==h&&i.shouldApplyGap}),s=t.filter(i=>{const[h,r]=i.dataY.sort((g,u)=>g-u);return h<=0&&h!==r&&i.shouldApplyGap});if(c.length>1){const i=M*(c.length-1),h=c.reduce((e,a)=>e+a.height,0),r=i/h,g=c.sort((e,a)=>a.y-e.y);let u=f;g.forEach((e,a)=>{const B=e.height*(1-r),w=u-B,D=t.findIndex(n=>n.seriesId===e.seriesId);D!==-1&&(t[D]={...t[D],height:B,y:w}),u=w-(a<g.length-1?M:0)})}if(s.length>1){const i=M*(s.length-1),h=s.reduce((e,a)=>e+a.height,0),r=i/h,g=s.sort((e,a)=>e.y-a.y);let u=f;g.forEach((e,a)=>{const B=e.height*(1-r),w=t.findIndex(D=>D.seriesId===e.seriesId);w!==-1&&(t[w]={...t[w],height:B,y:u}),u=u+B+(a<g.length-1?M:0)})}t.length>0&&(G=Math.min(...t.map(i=>i.y)),N=Math.max(...t.map(i=>i.y+i.height)))}if(_){const c=t.map((e,a)=>{if(e.height<_){const B=_-e.height,w=0,D=0;let n=w,p=D;const T=Math.abs((o(1)??0)-(o(0)??0));p=D+B/T;const I=o(n)??f,S=o(p)??f,L=Math.abs(I-S),U=Math.min(I,S);return{...e,height:L,y:U,wasExpanded:!0}}return{...e,wasExpanded:!1}}),s=[...c].sort((e,a)=>e.y-a.y),i=s.filter(e=>e.y+e.height<=f),h=s.filter(e=>e.y>=f),r=new Map;let g=f,u=f;for(let e=i.length-1;e>=0;e--){const a=i[e],B=g-a.height;if(r.set(a.seriesId,{y:B,height:a.height}),e>0){const w=i[e],D=i[e-1],n=t.find(I=>I.seriesId===w.seriesId),p=t.find(I=>I.seriesId===D.seriesId),T=n.y-(p.y+p.height);g=B-T}}for(let e=0;e<h.length;e++){const a=h[e],B=u;if(r.set(a.seriesId,{y:B,height:a.height}),e<h.length-1){const w=h[e],D=h[e+1],n=t.find(I=>I.seriesId===w.seriesId),T=t.find(I=>I.seriesId===D.seriesId).y-(n.y+n.height);u=B+a.height+T}}t=c.map(e=>{const a=r.get(e.seriesId);return a?{...e,y:a.y,height:a.height}:e}),t.length>0&&(G=Math.min(...t.map(e=>e.y)),N=Math.max(...t.map(e=>e.y+e.height)))}const Q=c=>c.sort((s,i)=>i.y-s.y).map((s,i)=>{const h=i>0?c[i-1]:null,r=i<c.length-1?c[i+1]:null,g=i===c.length-1||s.shouldApplyGap&&M||!s.shouldApplyGap&&r&&r.y+r.height!==s.y,u=i===0||s.shouldApplyGap&&M||!s.shouldApplyGap&&h&&h.y!==s.y+s.height;return{...s,roundTop:!!(s.roundTop&&g),roundBottom:!!(s.roundBottom&&u)}});t=Q(t);let X={x:b,y:G===1/0?f:G,width:l,height:N===-1/0?0:N-G};if(W){if(t.length===1&&X.height<W){const c=t[0],s=W-c.height,i=0,h=0;let r=i,g=h;const u=Math.abs((o(1)??0)-(o(0)??0));g=h+s/u;const e=o(r)??f,a=o(g)??f,B=Math.abs(e-a),w=Math.min(e,a);t[0]={...c,height:B,y:w},X={x:b,y:w,width:l,height:B}}else if(t.length>1&&X.height<W){const c=t.reduce((n,p)=>n+p.height,0),s=X.height-c,h=(W-s)/c,r=[...t].sort((n,p)=>n.y-p.y),g=r.filter(n=>n.y+n.height<=f),u=r.filter(n=>n.y>=f),e=new Map;let a=f,B=f;for(let n=g.length-1;n>=0;n--){const p=g[n],T=p.height*h,I=a-T;if(e.set(p.seriesId,{y:I,height:T}),n>0){const S=g[n],L=g[n-1],U=S.y-(L.y+L.height);a=I-U}}for(let n=0;n<u.length;n++){const p=u[n],T=p.height*h,I=B;if(e.set(p.seriesId,{y:I,height:T}),n<u.length-1){const S=u[n],U=u[n+1].y-(S.y+S.height);B=I+T+U}}t=t.map(n=>{const p=e.get(n.seriesId);return p?{...n,height:p.height,y:p.y}:n});const w=Math.min(...t.map(n=>n.y)),D=Math.max(...t.map(n=>n.y+n.height));X={x:b,y:w,width:l,height:D-w}}X.height<W&&(t=Q(t))}return{bars:t,stackRect:X}},[m,M,_,b,f,l,W,R,d,o,nt,x]),it=J?.data&&Array.isArray(J.data)&&typeof J.data[0]=="number"?J.data:void 0,ht=it?it[d]:d,ut=dt.map((t,G)=>k.jsx(st,{BarComponent:t.BarComponent||V,borderRadius:C,dataX:ht,dataY:t.dataY,fill:t.fill,fillOpacity:t.fillOpacity??q,height:t.height,originY:f,roundBottom:t.roundBottom,roundTop:t.roundTop,seriesId:t.seriesId,stroke:t.stroke??Y,strokeWidth:t.strokeWidth??H,transition:E,width:t.width,x:t.x,y:t.y},`${t.seriesId}-${d}-${G}`)),pt=x||Math.abs(F.y+F.height-f)>=Z,ft=x||Math.abs(F.y-f)>=Z;return k.jsx(O,{borderRadius:C,categoryIndex:d,height:F.height,roundBottom:pt,roundTop:ft,transition:E,width:F.width,x:F.x,y:F.y,yOrigin:f,children:ut})});lt.__docgenInfo={description:`BarStack component that renders a single stack of bars at a specific category index.
Handles the stacking logic for bars within a single category.`,methods:[],displayName:"BarStack",props:{borderRadius:{defaultValue:{value:"4",computed:!1},required:!1},BarStackComponent:{defaultValue:{value:`memo<DefaultBarStackProps>(
  ({
    children,
    className,
    style,
    width,
    height,
    x,
    y,
    borderRadius = 4,
    roundTop = true,
    roundBottom = true,
    yOrigin,
    transition,
  }) => {
    const { animate } = useCartesianChartContext();
    const clipPathId = useId();

    const clipPathData = useMemo(() => {
      return getBarPath(x, y, width, height, borderRadius, roundTop, roundBottom);
    }, [x, y, width, height, borderRadius, roundTop, roundBottom]);

    const initialClipPathData = useMemo(() => {
      if (!animate) return undefined;
      return getBarPath(x, yOrigin ?? y + height, width, 1, borderRadius, roundTop, roundBottom);
    }, [animate, x, yOrigin, y, height, width, borderRadius, roundTop, roundBottom]);

    return (
      <>
        <defs>
          <clipPath id={clipPathId}>
            {animate ? (
              <motion.path
                animate={{ d: clipPathData }}
                initial={{ d: initialClipPathData }}
                transition={transition}
              />
            ) : (
              <path d={clipPathData} />
            )}
          </clipPath>
        </defs>
        <g className={className} clipPath={\`url(#\${clipPathId})\`} style={style}>
          {children}
        </g>
      </>
    );
  },
)`,computed:!0},required:!1}}};const xt=A.memo(({series:m,yAxisId:d,stackIndex:b,totalStacks:l,barPadding:o=.1,...P})=>{const{getXScale:V,getYScale:q,drawingArea:Y,dataLength:H}=K(),C=V(),O=q(d),M=A.useMemo(()=>{if(!C||!O||!Y||H===0)return[];if(!at(C))return[];const v=C.bandwidth(),y=l>1?v*o/(l-1):0,x=v/l-Bt(l,y),E=[];for(let R=0;R<H;R++){const j=C(R);if(j!==void 0){const $=j+b*(x+y);E.push({categoryIndex:R,x:$,width:x})}}return E},[C,O,Y,H,b,l,o]);if(C&&!at(C))throw new Error("BarStackGroup requires a band scale for x-axis. See https://cds.coinbase.com/components/graphs/XAxis/#scale-type");return!O||!Y||M.length===0?null:M.map(({categoryIndex:v,x:y,width:x})=>A.createElement(lt,{...P,key:`stack-${b}-category-${v}`,categoryIndex:v,rect:Y,series:m,width:x,x:y,yAxisId:d,yScale:O}))}),wt=A.memo(({seriesIds:m,barPadding:d=.1,BarComponent:b,fillOpacity:l,stroke:o,strokeWidth:P,borderRadius:V,roundBaseline:q,BarStackComponent:Y,stackGap:H,barMinSize:C,stackMinSize:O,transition:M})=>{const{series:v,drawingArea:y}=K(),x=A.useId(),E=A.useMemo(()=>m!==void 0?v.filter(j=>m.includes(j.id)):v,[v,m]),R=A.useMemo(()=>{const j=new Map;return E.forEach($=>{const et=$.yAxisId??yt,_=`${$.stackId||`individual-${$.id}`}:${et}`;j.has(_)||j.set(_,{stackId:_,series:[],yAxisId:$.yAxisId}),j.get(_).series.push($)}),Array.from(j.values())},[E]);return y?k.jsxs(k.Fragment,{children:[k.jsx("defs",{children:k.jsx("clipPath",{id:x,children:k.jsx("rect",{height:y.height,width:y.width,x:y.x,y:y.y})})}),k.jsx("g",{clipPath:`url(#${x})`,children:R.map((j,$)=>k.jsx(xt,{BarComponent:b,BarStackComponent:Y,barMinSize:C,barPadding:d,borderRadius:V,fillOpacity:l,roundBaseline:q,series:j.series,stackGap:H,stackIndex:$,stackMinSize:O,stroke:o,strokeWidth:P,totalStacks:R.length,transition:M,yAxisId:j.yAxisId},j.stackId))})]}):null});wt.__docgenInfo={description:`BarPlot component that handles multiple series with proper stacking coordination.
Groups series by stack ID + y-axis ID combination and renders BarStackGroup for each group.
This allows series with different y-axes to be rendered side by side while preventing
cross-axis stacking (e.g., comparing $1M vs $1B companies on different scales).`,methods:[],displayName:"BarPlot",props:{barPadding:{defaultValue:{value:"0.1",computed:!1},required:!1}}};const ct=A.memo(({x:m,width:d,borderRadius:b=4,roundTop:l,roundBottom:o,originY:P,d:V,fill:q="var(--color-fgPrimary)",fillOpacity:Y=1,dataX:H,dataY:C,seriesId:O,transition:M,...v})=>{const{animate:y}=K(),x=A.useMemo(()=>{if(!y)return;const E=1,R=(P??0)-E;return tt(m,R,d,E,b,!!l,!!o)},[y,m,P,d,b,l,o]);return y&&x?k.jsx(ot.path,{...v,animate:{d:V},fill:q,fillOpacity:Y,initial:{d:x},transition:M}):k.jsx("path",{...v,d:V,fill:q,fillOpacity:Y})});ct.__docgenInfo={description:"Default bar component that renders a solid bar with animation.",methods:[],displayName:"DefaultBar",props:{borderRadius:{defaultValue:{value:"4",computed:!1},required:!1},fill:{defaultValue:{value:"'var(--color-fgPrimary)'",computed:!1},required:!1},fillOpacity:{defaultValue:{value:"1",computed:!1},required:!1}}};export{wt as B,rt as D,st as a,ct as b};
