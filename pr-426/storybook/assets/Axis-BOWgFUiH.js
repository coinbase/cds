import{r as d,j as g,B as le,c as J}from"./iframe-BXWLBCkp.js";import{m as ue}from"./motion-minimal-SVRWJYUW.js";import{T as Qe}from"./Text-Ch_dBU4v.js";import{c as be,a as yt,b as xt,l as bt,d as vt,e as kt,f as wt,g as _t,i as Ct}from"./d3-interpolate-path-DAdKSvnf.js";import{u as At}from"./useDimensions-CSIQgsxn.js";import{H as St}from"./HStack-B6p8qBpp.js";import{u as Rt,a as qt}from"./use-transform-BtSRjA0i.js";import{a as Tt}from"./animate-Ctc6D7xG.js";const et=d.createContext(void 0),me=()=>{const e=d.useContext(et);if(!e)throw new Error("useCartesianChartContext must be used within a CartesianChart component. See http://cds.coinbase.com/components/graphs/CartesianChart.");return e},Lt=et.Provider,Ee=1e-12;class Pt{constructor(t,n){this._context=t,this._x=n}areaStart(){this._line=0}areaEnd(){this._line=NaN}lineStart(){this._point=0}lineEnd(){(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line}point(t,n){switch(t=+t,n=+n,this._point){case 0:{this._point=1,this._line?this._context.lineTo(t,n):this._context.moveTo(t,n);break}case 1:this._point=2;default:{this._x?this._context.bezierCurveTo(this._x0=(this._x0+t)/2,this._y0,this._x0,n,t,n):this._context.bezierCurveTo(this._x0,this._y0=(this._y0+n)/2,t,this._y0,t,n);break}}this._x0=t,this._y0=n}}function Bt(e){return new Pt(e,!0)}function Ve(){}function $e(e,t,n){e._context.bezierCurveTo(e._x1+e._k*(e._x2-e._x0),e._y1+e._k*(e._y2-e._y0),e._x2+e._k*(e._x1-t),e._y2+e._k*(e._y1-n),e._x2,e._y2)}function Pe(e,t){this._context=e,this._k=(1-t)/6}Pe.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:$e(this,this._x1,this._y1);break}(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(e,t){switch(e=+e,t=+t,this._point){case 0:this._point=1,this._line?this._context.lineTo(e,t):this._context.moveTo(e,t);break;case 1:this._point=2,this._x1=e,this._y1=t;break;case 2:this._point=3;default:$e(this,e,t);break}this._x0=this._x1,this._x1=this._x2,this._x2=e,this._y0=this._y1,this._y1=this._y2,this._y2=t}};(function e(t){function n(r){return new Pe(r,t)}return n.tension=function(r){return e(+r)},n})(0);function Dt(e,t,n){var r=e._x1,i=e._y1,a=e._x2,s=e._y2;if(e._l01_a>Ee){var o=2*e._l01_2a+3*e._l01_a*e._l12_a+e._l12_2a,l=3*e._l01_a*(e._l01_a+e._l12_a);r=(r*o-e._x0*e._l12_2a+e._x2*e._l01_2a)/l,i=(i*o-e._y0*e._l12_2a+e._y2*e._l01_2a)/l}if(e._l23_a>Ee){var u=2*e._l23_2a+3*e._l23_a*e._l12_a+e._l12_2a,c=3*e._l23_a*(e._l23_a+e._l12_a);a=(a*u+e._x1*e._l23_2a-t*e._l12_2a)/c,s=(s*u+e._y1*e._l23_2a-n*e._l12_2a)/c}e._context.bezierCurveTo(r,i,a,s,e._x2,e._y2)}function tt(e,t){this._context=e,this._alpha=t}tt.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._x2=this._y0=this._y1=this._y2=NaN,this._l01_a=this._l12_a=this._l23_a=this._l01_2a=this._l12_2a=this._l23_2a=this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x2,this._y2);break;case 3:this.point(this._x2,this._y2);break}(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(e,t){if(e=+e,t=+t,this._point){var n=this._x2-e,r=this._y2-t;this._l23_a=Math.sqrt(this._l23_2a=Math.pow(n*n+r*r,this._alpha))}switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(e,t):this._context.moveTo(e,t);break;case 1:this._point=2;break;case 2:this._point=3;default:Dt(this,e,t);break}this._l01_a=this._l12_a,this._l12_a=this._l23_a,this._l01_2a=this._l12_2a,this._l12_2a=this._l23_2a,this._x0=this._x1,this._x1=this._x2,this._x2=e,this._y0=this._y1,this._y1=this._y2,this._y2=t}};const Mt=(function e(t){function n(r){return t?new tt(r,t):new Pe(r,0)}return n.alpha=function(r){return e(+r)},n})(.5);function nt(e){this._context=e}nt.prototype={areaStart:Ve,areaEnd:Ve,lineStart:function(){this._point=0},lineEnd:function(){this._point&&this._context.closePath()},point:function(e,t){e=+e,t=+t,this._point?this._context.lineTo(e,t):(this._point=1,this._context.moveTo(e,t))}};function It(e){return new nt(e)}function Oe(e){return e<0?-1:1}function ze(e,t,n){var r=e._x1-e._x0,i=t-e._x1,a=(e._y1-e._y0)/(r||i<0&&-0),s=(n-e._y1)/(i||r<0&&-0),o=(a*i+s*r)/(r+i);return(Oe(a)+Oe(s))*Math.min(Math.abs(a),Math.abs(s),.5*Math.abs(o))||0}function We(e,t){var n=e._x1-e._x0;return n?(3*(e._y1-e._y0)/n-t)/2:t}function Se(e,t,n){var r=e._x0,i=e._y0,a=e._x1,s=e._y1,o=(a-r)/3;e._context.bezierCurveTo(r+o,i+o*t,a-o,s-o*n,a,s)}function ke(e){this._context=e}ke.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=this._t0=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x1,this._y1);break;case 3:Se(this,this._t0,We(this,this._t0));break}(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line=1-this._line},point:function(e,t){var n=NaN;if(e=+e,t=+t,!(e===this._x1&&t===this._y1)){switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(e,t):this._context.moveTo(e,t);break;case 1:this._point=2;break;case 2:this._point=3,Se(this,We(this,n=ze(this,e,t)),n);break;default:Se(this,this._t0,n=ze(this,e,t));break}this._x0=this._x1,this._x1=e,this._y0=this._y1,this._y1=t,this._t0=n}}};Object.create(ke.prototype).point=function(e,t){ke.prototype.point.call(this,t,e)};function jt(e){return new ke(e)}function at(e){this._context=e}at.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=[],this._y=[]},lineEnd:function(){var e=this._x,t=this._y,n=e.length;if(n)if(this._line?this._context.lineTo(e[0],t[0]):this._context.moveTo(e[0],t[0]),n===2)this._context.lineTo(e[1],t[1]);else for(var r=Ge(e),i=Ge(t),a=0,s=1;s<n;++a,++s)this._context.bezierCurveTo(r[0][a],i[0][a],r[1][a],i[1][a],e[s],t[s]);(this._line||this._line!==0&&n===1)&&this._context.closePath(),this._line=1-this._line,this._x=this._y=null},point:function(e,t){this._x.push(+e),this._y.push(+t)}};function Ge(e){var t,n=e.length-1,r,i=new Array(n),a=new Array(n),s=new Array(n);for(i[0]=0,a[0]=2,s[0]=e[0]+2*e[1],t=1;t<n-1;++t)i[t]=1,a[t]=4,s[t]=4*e[t]+2*e[t+1];for(i[n-1]=2,a[n-1]=7,s[n-1]=8*e[n-1]+e[n],t=1;t<n;++t)r=i[t]/a[t-1],a[t]-=r,s[t]-=r*s[t-1];for(i[n-1]=s[n-1]/a[n-1],t=n-2;t>=0;--t)i[t]=(s[t]-i[t+1])/a[t];for(a[n-1]=(e[n]+i[n-1])/2,t=0;t<n-1;++t)a[t]=2*e[t+1]-i[t+1];return[i,a]}function Nt(e){return new at(e)}function Ce(e,t){this._context=e,this._t=t}Ce.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x=this._y=NaN,this._point=0},lineEnd:function(){0<this._t&&this._t<1&&this._point===2&&this._context.lineTo(this._x,this._y),(this._line||this._line!==0&&this._point===1)&&this._context.closePath(),this._line>=0&&(this._t=1-this._t,this._line=1-this._line)},point:function(e,t){switch(e=+e,t=+t,this._point){case 0:this._point=1,this._line?this._context.lineTo(e,t):this._context.moveTo(e,t);break;case 1:this._point=2;default:{if(this._t<=0)this._context.lineTo(this._x,t),this._context.lineTo(e,t);else{var n=this._x*(1-this._t)+e*this._t;this._context.lineTo(n,this._y),this._context.lineTo(n,t)}break}}this._x=e,this._y=t}};function Et(e){return new Ce(e,.5)}function Vt(e){return new Ce(e,0)}function $t(e){return new Ce(e,1)}function Xe(e,t){if((s=e.length)>1)for(var n=1,r,i,a=e[t[0]],s,o=a.length;n<s;++n)for(i=a,a=e[t[n]],r=0;r<o;++r)a[r][1]+=a[r][0]=isNaN(i[r][1])?i[r][0]:i[r][1]}function Le(e){for(var t=e.length,n=new Array(t);--t>=0;)n[t]=t;return n}function Ot(e,t){return e[t]}function zt(e){const t=[];return t.key=e,t}function Wt(){var e=be([]),t=Le,n=Xe,r=Ot;function i(a){var s=Array.from(e.apply(this,arguments),zt),o,l=s.length,u=-1,c;for(const h of a)for(o=0,++u;o<l;++o)(s[o][u]=[0,+r(h,s[o].key,u,a)]).data=h;for(o=0,c=yt(t(s));o<l;++o)s[c[o]].index=o;return n(s,c),s}return i.keys=function(a){return arguments.length?(e=typeof a=="function"?a:be(Array.from(a)),i):e},i.value=function(a){return arguments.length?(r=typeof a=="function"?a:be(+a),i):r},i.order=function(a){return arguments.length?(t=a==null?Le:typeof a=="function"?a:be(Array.from(a)),i):t},i.offset=function(a){return arguments.length?(n=a??Xe,i):n},i}function Gt(e,t){if((l=e.length)>0)for(var n,r=0,i,a,s,o,l,u=e[t[0]].length;r<u;++r)for(s=o=0,n=0;n<l;++n)(a=(i=e[t[n]][r])[1]-i[0])>0?(i[0]=s,i[1]=s+=a):a<0?(i[1]=o,i[0]=o+=a):(i[0]=0,i[1]=a)}const In="DEFAULT_STACK_ID",Xt=e=>e.min!==void 0&&e.max!==void 0,Ut=(e,t,n)=>{const r={min:t,max:n};if(r.min!==void 0&&r.max!==void 0)return r;if(e.length>0){const i=Math.max(...e.map(a=>a.data?.length||0));i>0&&(r.min===void 0&&(r.min=0),r.max===void 0&&(r.max=i-1))}return r},rt=e=>{if(e.stackId===void 0)return;const t=e.yAxisId||"default";return`${e.stackId}:${t}`},it=e=>{const t=new Map,n=new Map,r=[];return e.forEach(i=>{const a=rt(i);i.data?.some(o=>Array.isArray(o))||a===void 0?r.push(i):(n.has(a)||n.set(a,[]),n.get(a).push(i))}),r.forEach(i=>{if(!i.data)return;const a=i.data.map(s=>s===null?null:Array.isArray(s)?s:typeof s=="number"?[0,s]:null);t.set(i.id,a)}),n.forEach((i,a)=>{const s=Math.max(...i.map(c=>c.data?.length||0));if(s===0)return;const o=new Array(s).fill(void 0).map((c,h)=>{const k={};for(const x of i){const p=x.data?.[h],v=typeof p=="number"?p:0;k[x.id]=v}return k}),l=i.map(c=>c.id);Wt().keys(l).order(Le).offset(Gt)(o).forEach((c,h)=>{const k=l[h],x=c.map(([p,v])=>[p,v]);t.set(k,x)})}),t},jn=e=>{if(!e)return[];const t=e.find(n=>n!==null);return Array.isArray(t)?e.map(n=>n===null?null:Array.isArray(n)?n.at(-1)??null:n):e},Ft=(e,t,n)=>{const r={min:t,max:n};if(r.min!==void 0&&r.max!==void 0||e.length===0)return r;const i=new Map;if(e.forEach(s=>{const o=rt(s);i.has(o)||i.set(o,[]),i.get(o).push(s)}),Array.from(i.keys()).some(s=>s!==void 0)){const s=it(e);let o=0,l=0;s.forEach(u=>{u.forEach(c=>{if(c!==null){const[h,k]=c;k>o&&(o=k),h<l&&(l=h)}})}),r.min===void 0&&(r.min=Math.min(0,l)),r.max===void 0&&(r.max=Math.max(0,o))}else{const s=[];if(e.forEach(o=>{o.data&&o.data.forEach(l=>{if(typeof l=="number")s.push(l);else if(Array.isArray(l)){const u=l.filter(c=>c!==null);s.push(...u)}})}),s.length>0){const o=Math.min(...s),l=Math.max(...s);r.min===void 0&&(r.min=o),r.max===void 0&&(r.max=l)}}return r},Yt={top:32,left:16,bottom:16,right:16},st=(e,t)=>{const n=t??{top:0,left:0,bottom:0,right:0};return typeof e=="number"?{top:e,left:e,bottom:e,right:e}:{top:e?.top??n.top,left:e?.left??n.left,bottom:e?.bottom??n.bottom,right:e?.right??n.right}},ee=e=>e!==void 0&&"bandwidth"in e&&typeof e.bandwidth=="function",ot=e=>e!==void 0&&!ee(e),Ht=e=>e!==void 0&&"base"in e&&typeof e.base=="function",Kt=({scaleType:e,domain:t,range:n})=>(e==="log"?bt():vt()).domain([t.min,t.max]).range([n.min,n.max]),Zt=({domain:e,range:t,padding:n=.1})=>{const r=Array.from({length:e.max-e.min+1},(a,s)=>s);return xt().domain(r).range([t.min,t.max]).paddingInner(n).paddingOuter(n/2)},Q=(e,t,n="middle")=>{if(ee(t)){const i=t,a=i(e);if(a===void 0)return 0;const s=i.bandwidth?.()??0,o=i.step?.()??s,l=(o-s)/2,u=a-l;switch(n){case"stepStart":return u;case"bandStart":return a;case"bandEnd":return a+s;case"stepEnd":return u+o;case"middle":default:return a+s/2}}let r=e;return Ht(t)&&e<=0&&(r=.001),t(r)??0},ge=({x:e,y:t,xScale:n,yScale:r})=>({x:Q(e,n),y:Q(t,r)}),Jt=({data:e,xScale:t,yScale:n,xData:r,yData:i})=>e.length===0?[]:e.map((a,s)=>{if(a===null)return null;if(typeof a=="object"&&"x"in a&&"y"in a)return ge({x:a.x,y:a.y,xScale:t,yScale:n});let o=s;ee(t)||r&&Array.isArray(r)&&r.length>0&&typeof r[0]=="number"&&(o=r[s]??s);let l=a;return ot(n)&&i&&Array.isArray(i)&&i.length>0&&typeof i[0]=="number"&&typeof a=="number"&&(l=a),ge({x:o,y:l,xScale:t,yScale:n})}),Nn=e=>{let t="center",n="middle";switch(e){case"top":n="bottom";break;case"bottom":n="top";break;case"left":t="right";break;case"right":t="left";break;case"center":default:t="center",n="middle";break}return{horizontalAlignment:t,verticalAlignment:n}},En=(e,t,n,r)=>{let i=0,a=0;switch(n){case"top":a=-r;break;case"bottom":a=r;break;case"left":i=-r;break;case"right":i=r;break}return{x:e+i,y:t+a}},pe="DEFAULT_AXIS_ID",Qt="linear",we=e=>{switch(e){case"edges":case"start":return"stepStart";case"end":return"stepEnd";case"middle":default:return"middle"}},Ue=({config:e,type:t,range:n,dataDomain:r})=>{const i=e?.scaleType??"linear";let a=n;t==="y"&&(a={min:a.max,max:a.min});let s=r;if(e?.domain&&(s={min:e.domain.min??r.min,max:e.domain.max??r.max}),!Xt(s))throw new Error("Invalid domain bounds. See https://cds.coinbase.com/http://localhost:3000/components/graphs/XAxis/#domain");if(i==="band")return Zt({domain:s,range:a,padding:e?.categoryPadding??.3});{const o=Kt({domain:s,range:a,scaleType:i});return e?.domainLimit==="nice"&&o.nice(),o}},Fe=(e,t,n=pe,r=Qt)=>{const i=e==="x"?"strict":"nice";if(!t)return[{id:n,scaleType:r,domainLimit:i}];if(Array.isArray(t)){const a=t.length;if(a>1&&t.some(({id:s})=>s===void 0))throw new Error("When defining multiple axes, each must have a unique id. See https://cds.coinbase.com/components/graphs/YAxis/#multiple-y-axes.");return t.map(({id:s,...o})=>({id:a>1?s??pe:s,scaleType:r,domainLimit:i,...o}))}return[{id:n,scaleType:r,domainLimit:i,...t}]},Ye=(e,t,n)=>{let r=null;if(e.data&&Array.isArray(e.data)&&e.data.length>0){const l=e.data[0];if(typeof l=="number"){const u=e.data;r={min:Math.min(...u),max:Math.max(...u)}}else typeof l=="string"&&(r={min:0,max:e.data.length-1})}const i=n==="x"?Ut(t):Ft(t),a=r??i,s=e.domain;let o;return typeof s=="function"?o=s({min:a.min??0,max:a.max??0}):s&&typeof s=="object"?o={min:s.min??a.min,max:s.max??a.max}:o=a,{min:o.min??0,max:o.max??0}},He=(e,t,n)=>{let r;n==="x"?r={min:t.x,max:t.x+t.width}:r={min:t.y,max:t.y+t.height};const i=e.range;return i?typeof i=="function"?i(r):{min:i.min??r.min,max:i.max??r.max}:r},en=(e,t,n)=>{if(e<=0)return t??1;const r=Math.pow(10,Math.floor(Math.log10(e))),i=e/r;let a;i<=1?a=1:i<=2?a=2:i<=5?a=5:a=10;let s=a*r;return t!==void 0&&s<t&&(s=t),n!==void 0&&s>n&&(s=n),s},tn=(e,t,n,r)=>{const i=r?.minTickCount??4,[a,s]=e.range(),o=Math.abs(s-a),l=Math.floor(o/t),u=Math.max(l,i);if(u<1)return[];if(n&&n.length>0){const f=Math.min(u,n.length),y=[],R=(n.length-1)/(f-1);for(let w=0;w<f;w++){const C=w===f-1?n.length-1:Math.round(R*w);y.push(n[C])}return y}const[c,h]=e.domain();if(u===1)return[c];if(u===2)return[c,h];const x=(h-c)/(u-1),p=en(x,r?.minStep,r?.maxStep),v=[c];let T=c+p;for(;T<h;){const f=Number(T.toFixed(10));v.push(f),T+=p}const S=v[v.length-1],_=h-S,I=p*1e-4;return(Math.abs(_-p)<I||_>p*.5)&&h!==S&&v.push(h),v},lt=({ticks:e,scaleFunction:t,requestedTickCount:n,categories:r=[],possibleTickValues:i,tickInterval:a,options:s})=>{const o=s?.anchor??"middle";if(ee(t)){const c=t;return Array.isArray(e)?e.filter(h=>h>=0&&h<r.length).map(h=>({tick:h,position:Q(h,c,o)})):typeof e=="function"?r.map((h,k)=>e(k)?{tick:k,position:Q(k,c,o)}:null).filter(Boolean):r.map((h,k)=>({tick:k,position:Q(k,c,o)}))}if(!ot(t))return console.warn("Scale does not support automatic tick generation"),[];const l=t;let u=[];return Array.isArray(e)?u=e:typeof e=="function"?i?u=i.filter(e):u=l.ticks(n).filter(e):n!==void 0?u=l.ticks(n):a!==void 0&&(u=tn(l,a,i,s)),u.map(c=>({tick:c,position:l(c)}))},nn=()=>{const[e,t]=d.useState(new Map),n=d.useCallback((a,s,o)=>{t(l=>{const u=new Map(l);return u.set(a,{id:a,position:s,size:o}),u})},[]),r=d.useCallback(a=>{t(s=>{const o=new Map(s);return o.delete(a),o})},[]),i=d.useMemo(()=>{const a={top:0,right:0,bottom:0,left:0};return e.forEach(s=>{a[s.position]+=s.size}),a},[e]);return{renderedAxes:e,axisPadding:i,registerAxis:n,unregisterAxis:r}},ut=d.createContext(void 0),Vn=()=>{const e=d.useContext(ut);if(!e)throw new Error("useScrubberContext must be used within a Chart component");return e},an=(e,t)=>typeof e=="function"?e(t):e,rn=(e,t)=>{if(e.length===0){console.warn("Gradient has no stops - falling back to default");return}if(e.some((o,l)=>l>0&&o.offset<e[l-1].offset)){console.warn("Gradient: stop offsets must be in ascending order");return}const[r,i]=t.range(),a=Math.abs(i-r);return e.map(o=>{const l=t(o.offset);return{offset:l===void 0?0:Math.max(0,Math.min(1,Math.abs(l-r)/a)),color:o.color,opacity:o.opacity??1}}).sort((o,l)=>o.offset-l.offset)},$n=(e,t,n)=>{if(e.length===0)return;const r="srgb",i=n.range(),[a,s]=Array.isArray(i)?i:[i,i],o=Math.abs(s-a);if(o===0)return e[0].color;const l=n(t);if(l===void 0)return e[0].color;const u=Math.max(0,Math.min(1,Math.abs(l-a)/o)),c=e.map(h=>h.offset);if(u<c[0])return e[0].color;if(u>=c[c.length-1])return e[e.length-1].color;for(let h=0;h<e.length;h++)if(Math.abs(u-e[h].offset)<1e-10){let k=h;for(;k+1<e.length&&Math.abs(e[k+1].offset-e[h].offset)<1e-10;)k++;return e[k].color}for(let h=0;h<c.length-1;h++){const k=c[h],x=c[h+1];if(u>=k&&u<=x){const p=(u-k)/(x-k);return`color-mix(in ${r}, ${e[h+1].color} ${p*100}%, ${e[h].color})`}}return e[e.length-1].color},sn=(e,t,n)=>{if(!e)return;const r=e.axis==="x"?t:n;if(!r)return;const i=r.domain();let a;if(ee(r)){const o=i;a={min:o[0],max:o[o.length-1]}}else{const[o,l]=i;a={min:o,max:l}}const s=an(e.stops,a);return rn(s,r)},On=(e,t=0)=>{const{min:n,max:r}=e,i=Math.min(n,r),a=Math.max(n,r);return i<=t&&t<=a?t:Math.abs(i-t)<Math.abs(a-t)?i:a},zn=(e,t,n,r,i)=>{const{min:a,max:s}=e,o=Math.min(a,s),l=Math.max(a,s);return o<t&&t<l?{axis:"y",stops:[{offset:o,color:n,opacity:r},{offset:t,color:n,opacity:i},{offset:l,color:n,opacity:r}]}:{axis:"y",stops:[{offset:Math.abs(a-t)>Math.abs(s-t)?a:s,color:n,opacity:r},{offset:t,color:n,opacity:i}].sort((c,h)=>c.offset-h.offset)}},ct=(e="linear")=>{switch(e){case"catmullRom":return Mt;case"monotone":return jt;case"natural":return Nt;case"step":return Et;case"stepBefore":return Vt;case"stepAfter":return $t;case"bump":return Bt;case"linearClosed":return It;case"linear":default:return _t}},Wn=({data:e,curve:t="bump",xScale:n,yScale:r,xData:i,connectNulls:a})=>{if(e.length===0)return"";const s=ct(t),o=Jt({data:e,xScale:n,yScale:r,xData:i}),l=a?o.filter(c=>c!==null):o;return kt().x(c=>c.x).y(c=>c.y).curve(s).defined(c=>a||c!==null)(l)??""},Gn=({data:e,curve:t="bump",xScale:n,yScale:r,xData:i,connectNulls:a})=>{if(e.length===0)return"";const s=ct(t),o=r.domain(),l=Math.min(...o),c=e.map((p,v)=>p===null?null:Array.isArray(p)?p.length>=2&&typeof p[0]=="number"&&typeof p[1]=="number"?[p[0],p[1]]:null:typeof p=="number"?[l,p]:null).map((p,v)=>{if(p===null)return{x:0,low:null,high:null,isValid:!1};let T=v;!ee(n)&&i&&i[v]!==void 0&&(T=i[v]);const S=ge({x:T,y:0,xScale:n,yScale:r}),_=ge({x:T,y:p[0],xScale:n,yScale:r}),I=ge({x:T,y:p[1],xScale:n,yScale:r});return{x:S.x,low:_.y,high:I.y,isValid:!0}}),h=a?c.filter(p=>p.isValid):c;return wt().x(p=>p.x).y0(p=>p.low??0).y1(p=>p.high??0).curve(s).defined(p=>a||p.isValid&&p.low!=null&&p.high!=null)(h)??""},te=(e,t,n,r)=>`M${e},${t} L${n},${r}`,Xn=(e,t,n,r,i,a,s)=>{const o=a&&s,l=Math.min(i,n/2,o?r/2:r),u=a?l:0,c=s?l:0;let h=`M ${e+(a?l:0)} ${t}`;return h+=` L ${e+n-u} ${t}`,h+=` A ${u} ${u} 0 0 1 ${e+n} ${t+u}`,h+=` L ${e+n} ${t+r-c}`,h+=` A ${c} ${c} 0 0 1 ${e+n-c} ${t+r}`,h+=` L ${e+c} ${t+r}`,h+=` A ${c} ${c} 0 0 1 ${e} ${t+r-c}`,h+=` L ${e} ${t+u}`,h+=` A ${u} ${u} 0 0 1 ${e+u} ${t}`,h+=" Z",h},on={type:"spring",stiffness:900,damping:120,mass:4},dt=.15,Un=.35,ln=({currentPath:e,initialPath:t,transition:n=on})=>{const r=d.useRef(!0),i=d.useRef(t??e),a=d.useRef(e),s=d.useRef(null),o=Rt(0),l=qt(o,u=>Ct(i.current,a.current)(u));return d.useEffect(()=>{if(a.current!==e){const u=!!s.current;s.current&&(s.current.cancel(),s.current=null);const c=l.get(),h=c!==i.current&&c!==e;u&&h&&(i.current=c),a.current=e,o.set(0),s.current=Tt(o,1,{...n,onComplete:()=>{i.current=e}}),r.current=!1}return()=>{s.current&&s.current.cancel()}},[e,n,o,l]),l},Be=d.memo(({id:e,gradient:t,yAxisId:n,animate:r,transition:i})=>{const a=me(),s=r??a.animate,o=a.getXScale(),l=a.getYScale(n),u=d.useMemo(()=>{if(!(!o||!l))return sn(t,o,l)},[t,o,l]),c=a.drawingArea,h=a.getYAxis(n),k=a.getXAxis();if(!u)return null;const x=t.axis??"y";let p;if(x==="y"){const v=h?.range;v?p={x1:c.x,y1:v.max,x2:c.x,y2:v.min}:p={x1:c.x,y1:c.y+c.height,x2:c.x,y2:c.y}}else{const v=k?.range;v?p={x1:v.min,y1:c.y,x2:v.max,y2:c.y}:p={x1:c.x,y1:c.y,x2:c.x+c.width,y2:c.y}}return g.jsx("linearGradient",{gradientUnits:"userSpaceOnUse",id:e,...p,children:u.map((v,T)=>{const S=`${v.offset*100}%`,_=v.opacity;return s?g.jsx(ue.stop,{animate:{offset:S},initial:{offset:S},stopColor:v.color,stopOpacity:_??1,transition:i},`${e}-stop-${T}`):g.jsx("stop",{offset:S,stopColor:v.color,stopOpacity:_??1},`${e}-stop-${T}`)})})});Be.__docgenInfo={description:'Renders an SVG linearGradient element based on a GradientDefinition.\nThe gradient can be referenced via `fill="url(#${id})"` or `stroke="url(#${id})"`.',methods:[],displayName:"Gradient"};const un=.5,cn=d.memo(({d:e="",transition:t,...n})=>{const r=ln({currentPath:e,transition:t});return g.jsx(ue.path,{d:r,...n})}),De=d.memo(({animate:e,clipRect:t,clipOffset:n=0,d:r="",transition:i,...a})=>{const s=d.useId(),o=me(),l=t!==void 0?t:o.drawingArea,u=e??o.animate,c=n*2,h=d.useMemo(()=>{if(l!==null)return{hidden:{width:0},visible:{width:l.width+c,transition:{type:"timing",duration:un}}}},[l,c]),k=d.useMemo(()=>l!==null?`url(#${s})`:void 0,[l,s]);return g.jsxs(g.Fragment,{children:[l!==null&&g.jsx("defs",{children:g.jsx("clipPath",{id:s,children:u?g.jsx(ue.rect,{animate:"visible",height:l.height+c,initial:"hidden",variants:h,x:l.x-n,y:l.y-n}):g.jsx("rect",{height:l.height+c,width:l.width+c,x:l.x-n,y:l.y-n})})}),u?g.jsx(cn,{clipPath:k,d:r,transition:i,...a}):g.jsx("path",{clipPath:k,d:r,...a})]})});De.__docgenInfo={description:"",methods:[],displayName:"Path",props:{clipOffset:{defaultValue:{value:"0",computed:!1},required:!1},d:{defaultValue:{value:"''",computed:!1},required:!1}}};const dn=e=>{switch(e){case"left":return"start";case"center":return"middle";case"right":return"end"}},mn=e=>{switch(e){case"top":return"hanging";case"middle":return"central";case"bottom":return"ideographic"}},xe=d.memo(({children:e,x:t,y:n,horizontalAlignment:r="center",verticalAlignment:i="middle",dx:a,dy:s,disableRepositioning:o,bounds:l,opacity:u,testID:c,font:h="label2",fontFamily:k,fontSize:x,fontWeight:p,elevated:v,color:T="var(--color-fgMuted)",background:S=v?"var(--color-bg)":"transparent",borderRadius:_,inset:I,onDimensionsChange:$,style:f,styles:y,className:R,classNames:w})=>{const{animate:C,width:E,height:O}=me(),z=d.useMemo(()=>({x:0,y:0,width:E,height:O}),[E,O]),Y=d.useRef(null),[W,A]=d.useState(null),H=o||Y.current!==null,B=d.useMemo(()=>{if(!W)return null;const L=st(I);return{x:W.x-L.left,y:W.y-L.top,width:W.width+L.left+L.right,height:W.height+L.top+L.bottom}},[W,I]),U=d.useMemo(()=>{if(o)return{x:0,y:0};const L=l??z;if(!B||!L||L.width<=0||L.height<=0)return{x:0,y:0};let X=0,Z=0;return B.x<L.x?X=L.x-B.x:B.x+B.width>L.x+L.width&&(X=L.x+L.width-(B.x+B.width)),B.y<L.y?Z=L.y-B.y:B.y+B.height>L.y+L.height&&(Z=L.y+L.height-(B.y+B.height)),{x:X,y:Z}},[B,z,l,o]),j=d.useMemo(()=>B?{x:B.x+U.x,y:B.y+U.y,width:B.width,height:B.height}:null,[B,U.x,U.y]);d.useEffect(()=>{$&&j!==null&&$(j)},[j,$]),d.useEffect(()=>{if(Y.current){const L=new ResizeObserver(X=>{for(const Z of X)A(Z.target.getBBox())});return L.observe(Y.current),()=>{L.disconnect()}}},[]);const V=d.useMemo(()=>dn(r),[r]),D=d.useMemo(()=>mn(i),[i]);d.useEffect(()=>{Y.current&&A(Y.current.getBBox())},[V,D,a,s,t,n]);const M=d.useMemo(()=>({...f,...y?.root,transform:`translate(${U.x}px, ${U.y}px)`}),[U.x,U.y,f,y?.root]);return g.jsx(le,{"aria-hidden":"true",as:"g",className:J(R,w?.root),opacity:u,style:M,testID:c,children:g.jsxs(ue.g,{animate:{opacity:H?1:0},transition:C?{duration:dt,ease:"easeOut"}:void 0,children:[g.jsx(le,{as:"rect",className:w?.backgroundRect,fill:S,filter:v?"drop-shadow(var(--shadow-elevation1))":void 0,height:B?.height,rx:_,ry:_,style:y?.backgroundRect,width:B?.width,x:B?.x,y:B?.y}),g.jsx(Qe,{ref:Y,as:"text",className:w?.text,dominantBaseline:D,dx:a,dy:s,fill:T,font:h,fontFamily:k,fontSize:x,fontWeight:p,style:y?.text,textAnchor:V,x:t,y:n,children:g.jsx("tspan",{children:e})})]})})});xe.__docgenInfo={description:"",methods:[],displayName:"ChartText",props:{horizontalAlignment:{defaultValue:{value:"'center'",computed:!1},required:!1},verticalAlignment:{defaultValue:{value:"'middle'",computed:!1},required:!1},font:{defaultValue:{value:"'label2'",computed:!1},required:!1},color:{defaultValue:{value:"'var(--color-fgMuted)'",computed:!1},required:!1},background:{defaultValue:{value:"elevated ? 'var(--color-bg)' : 'transparent'",computed:!1},required:!1}}};function ve(e,t,n){const r=n/2,i=e.x-r<t.x+t.width+r&&e.x+e.width+r>t.x-r,a=e.y-r<t.y+t.height+r&&e.y+e.height+r>t.y-r;return i&&a}const fn=.5,Me=d.memo(({labels:e,minGap:t=8,prioritizeEndLabels:n=!0,chartTextProps:r,LabelComponent:i=xe})=>{const[a,s]=d.useState(new Map),{onDimensionsChange:o,...l}=r??{},u=d.useMemo(()=>e.map((x,p)=>({...x,key:`${x.label}-${p}`})),[e]);d.useEffect(()=>{const x=new Set(u.map(p=>p.key));s(p=>{let v=!1;const T=new Map;for(const[S,_]of p)x.has(S)?T.set(S,_):v=!0;return v?T:p})},[u]);const c=d.useMemo(()=>{const x=new Map;for(const p of u){const{key:v,chartTextProps:T}=p;x.set(v,S=>{T?.onDimensionsChange?.(S),o?.(S),!(S.width===0||S.height===0)&&s(_=>{const I=_.get(v),$=(R,w)=>Math.abs(R-w)<=fn;if(I!==void 0&&$(I.x,S.x)&&$(I.y,S.y)&&$(I.width,S.width)&&$(I.height,S.height))return _;const y=new Map(_);return y.set(v,S),y})})}return x},[u,o]),h=d.useMemo(()=>u.every(x=>a.has(x.key)),[u,a]),k=d.useMemo(()=>{const x=u.map((f,y)=>({...f,rect:a.get(f.key)})).filter(f=>f.rect!==void 0);if(x.sort((f,y)=>f.x===y.x?y.y-f.y:f.x-y.x),!h)return null;const p=x.length;if(p===0)return new Set;if(p===1)return new Set([x[0].key]);if(p===2){const f=x[0],y=x[1];if(ve(f.rect,y.rect,t)){const w=u[0]?.key;return new Set([w??f.key])}return new Set([f.key,y.key])}const v=f=>{for(let y=0;y<f.length-1;y++){const R=a.get(f[y]),w=a.get(f[y+1]);if(ve(R,w,t))return!0}return!1},T=x.map(f=>f.key);if(!v(T))return new Set(T);const S=f=>{const y=[];for(let w=0;w<p;w+=f)y.push(x[w].key);if(n){const w=x[0].key,C=x[p-1].key;y[0]!==w&&y.unshift(w),y[y.length-1]!==C&&y.push(C)}const R=Array.from(new Set(y));return v(R)?new Set:new Set(R)};for(let f=2;f<=p;f++){const y=S(f);if(y.size>0)return y}const _=[],I=x[0].key,$=x[p-1].key;_.push(I);for(let f=1;f<p-1;f++){const y=x[f].key,R=_[_.length-1],w=a.get(R),C=a.get(y);ve(w,C,t)||_.push(y)}if(n){const f=_[_.length-1],y=a.get(f),R=a.get($);ve(y,R,t)?_[_.length-1]=$:f!==$&&_.push($)}return new Set(_)},[h,a,t,n,u]);return g.jsx("g",{children:u.map(x=>{const v=a.has(x.key)&&h&&k?.has(x.key),T={text:{...l?.styles?.text??{},...x.chartTextProps?.styles?.text??{},...v?{}:{visibility:"hidden",opacity:0,pointerEvents:"none"}},backgroundRect:{...l?.styles?.backgroundRect??{},...x.chartTextProps?.styles?.backgroundRect??{},...v?{}:{display:"none"}}};return g.jsx(i,{x:x.x,y:x.y,...l,...x.chartTextProps,onDimensionsChange:c.get(x.key),styles:T,children:x.label},x.key)})})});Me.__docgenInfo={description:`A smart text display component that prevents label overlap through collision detection.

This component renders a list of ChartText components and automatically hides overlapping elements
to ensure readability.

The component focuses solely on overlap prevention logic for better separation of concerns.`,methods:[],displayName:"ChartTextGroup",props:{minGap:{defaultValue:{value:"8",computed:!1},required:!1},prioritizeEndLabels:{defaultValue:{value:"true",computed:!1},required:!1},LabelComponent:{defaultValue:{value:`memo<ChartTextProps>(
  ({
    children,
    x,
    y,
    horizontalAlignment = 'center',
    verticalAlignment = 'middle',
    dx,
    dy,
    disableRepositioning,
    bounds,
    opacity,
    testID,
    font = 'label2',
    fontFamily,
    fontSize,
    fontWeight,
    elevated,
    color = 'var(--color-fgMuted)',
    background = elevated ? 'var(--color-bg)' : 'transparent',
    borderRadius,
    inset: insetInput,
    onDimensionsChange,
    style,
    styles,
    className,
    classNames,
  }) => {
    const { animate, width: chartWidth, height: chartHeight } = useCartesianChartContext();
    const fullChartBounds = useMemo(
      () => ({ x: 0, y: 0, width: chartWidth, height: chartHeight }),
      [chartWidth, chartHeight],
    );

    const textRef = useRef<SVGTextElement | null>(null);
    const [textBBox, setTextBBox] = useState<Rect | null>(null);
    const isDimensionsReady = disableRepositioning || textRef.current !== null;

    const backgroundRectDimensions = useMemo(() => {
      if (!textBBox) {
        return null;
      }

      const inset = getChartInset(insetInput);
      return {
        x: textBBox.x - inset.left,
        y: textBBox.y - inset.top,
        width: textBBox.width + inset.left + inset.right,
        height: textBBox.height + inset.top + inset.bottom,
      };
    }, [textBBox, insetInput]);

    const overflowAmount = useMemo(() => {
      if (disableRepositioning) {
        return { x: 0, y: 0 };
      }

      const parentBounds = bounds ?? fullChartBounds;
      if (
        !backgroundRectDimensions ||
        !parentBounds ||
        parentBounds.width <= 0 ||
        parentBounds.height <= 0
      ) {
        return { x: 0, y: 0 };
      }

      let x = 0;
      let y = 0;

      if (backgroundRectDimensions.x < parentBounds.x) {
        x = parentBounds.x - backgroundRectDimensions.x; // positive = shift right
      } else if (
        backgroundRectDimensions.x + backgroundRectDimensions.width >
        parentBounds.x + parentBounds.width
      ) {
        x =
          parentBounds.x +
          parentBounds.width -
          (backgroundRectDimensions.x + backgroundRectDimensions.width); // negative = shift left
      }

      if (backgroundRectDimensions.y < parentBounds.y) {
        y = parentBounds.y - backgroundRectDimensions.y; // positive = shift down
      } else if (
        backgroundRectDimensions.y + backgroundRectDimensions.height >
        parentBounds.y + parentBounds.height
      ) {
        y =
          parentBounds.y +
          parentBounds.height -
          (backgroundRectDimensions.y + backgroundRectDimensions.height); // negative = shift up
      }

      return { x, y };
    }, [backgroundRectDimensions, fullChartBounds, bounds, disableRepositioning]);

    // Compose the final reported rect including any overflow translation applied
    const reportedRect = useMemo(() => {
      if (!backgroundRectDimensions) return null;
      return {
        x: backgroundRectDimensions.x + overflowAmount.x,
        y: backgroundRectDimensions.y + overflowAmount.y,
        width: backgroundRectDimensions.width,
        height: backgroundRectDimensions.height,
      };
    }, [backgroundRectDimensions, overflowAmount.x, overflowAmount.y]);

    useEffect(() => {
      if (onDimensionsChange && reportedRect !== null) {
        onDimensionsChange(reportedRect);
      }
    }, [reportedRect, onDimensionsChange]);

    useEffect(() => {
      if (textRef.current) {
        const observer = new ResizeObserver((entries) => {
          for (const entry of entries) {
            setTextBBox((entry.target as SVGTextElement).getBBox());
          }
        });

        observer.observe(textRef.current);

        // Cleanup function
        return () => {
          observer.disconnect();
        };
      }
    }, []);

    const textAnchor = useMemo(() => getTextAnchor(horizontalAlignment), [horizontalAlignment]);
    const dominantBaseline = useMemo(
      () => getDominantBaseline(verticalAlignment),
      [verticalAlignment],
    );

    // forces state update the bounding box when any properties that can affect the bounding box change
    useEffect(() => {
      if (textRef.current) {
        setTextBBox(textRef.current.getBBox());
      }
    }, [textAnchor, dominantBaseline, dx, dy, x, y]);

    const containerStyle = useMemo(
      () => ({
        ...style,
        ...styles?.root,
        transform: \`translate(\${overflowAmount.x}px, \${overflowAmount.y}px)\`,
      }),
      [overflowAmount.x, overflowAmount.y, style, styles?.root],
    );

    return (
      <Box
        aria-hidden="true"
        as="g"
        className={cx(className, classNames?.root)}
        opacity={opacity}
        style={containerStyle}
        testID={testID}
      >
        <motion.g
          animate={{ opacity: isDimensionsReady ? 1 : 0 }}
          transition={
            animate ? { duration: accessoryFadeTransitionDuration, ease: 'easeOut' } : undefined
          }
        >
          <Box
            as="rect"
            className={classNames?.backgroundRect}
            fill={background}
            filter={elevated ? 'drop-shadow(var(--shadow-elevation1))' : undefined}
            height={backgroundRectDimensions?.height}
            rx={borderRadius}
            ry={borderRadius}
            style={styles?.backgroundRect}
            width={backgroundRectDimensions?.width}
            x={backgroundRectDimensions?.x}
            y={backgroundRectDimensions?.y}
          />
          <Text
            ref={textRef}
            as="text"
            className={classNames?.text}
            dominantBaseline={dominantBaseline}
            dx={dx}
            dy={dy}
            fill={color}
            font={font}
            fontFamily={fontFamily}
            fontSize={fontSize}
            fontWeight={fontWeight}
            style={styles?.text}
            textAnchor={textAnchor}
            x={x}
            y={y}
          >
            <tspan>{children}</tspan>
          </Text>
        </motion.g>
      </Box>
    );
  },
)`,computed:!0},required:!1}}};const Ie=d.memo(({fill:e="none",stroke:t="var(--color-fgPrimary)",strokeDasharray:n="0 4",strokeLinecap:r="round",strokeLinejoin:i="round",strokeOpacity:a=1,strokeWidth:s=2,vectorEffect:o="non-scaling-stroke",gradient:l,yAxisId:u,animate:c,transition:h,d:k,...x})=>{const p=d.useId();return g.jsxs(g.Fragment,{children:[l&&g.jsx("defs",{children:g.jsx(Be,{animate:c,gradient:l,id:p,transition:h,yAxisId:u})}),g.jsx(De,{animate:c,clipOffset:s,d:k,fill:e,stroke:l?`url(#${p})`:t,strokeDasharray:n,strokeLinecap:r,strokeLinejoin:i,strokeOpacity:a,strokeWidth:s,transition:h,vectorEffect:o,...x})]})});Ie.__docgenInfo={description:`A customizable dotted line component.
Supports gradient for gradient effects on the dots.`,methods:[],displayName:"DottedLine",props:{fill:{defaultValue:{value:"'none'",computed:!1},required:!1},stroke:{defaultValue:{value:"'var(--color-fgPrimary)'",computed:!1},required:!1},strokeDasharray:{defaultValue:{value:"'0 4'",computed:!1},required:!1},strokeLinecap:{defaultValue:{value:"'round'",computed:!1},required:!1},strokeLinejoin:{defaultValue:{value:"'round'",computed:!1},required:!1},strokeOpacity:{defaultValue:{value:"1",computed:!1},required:!1},strokeWidth:{defaultValue:{value:"2",computed:!1},required:!1},vectorEffect:{defaultValue:{value:"'non-scaling-stroke'",computed:!1},required:!1}}};const ye=d.memo(({fill:e="none",stroke:t="var(--color-fgPrimary)",strokeLinecap:n="round",strokeLinejoin:r="round",strokeOpacity:i=1,strokeWidth:a=2,gradient:s,yAxisId:o,animate:l,transition:u,d:c,...h})=>{const k=d.useId();return g.jsxs(g.Fragment,{children:[s&&g.jsx("defs",{children:g.jsx(Be,{animate:l,gradient:s,id:k,transition:u,yAxisId:o})}),g.jsx(De,{animate:l,clipOffset:a,d:c,fill:e,stroke:s?`url(#${k})`:t,strokeLinecap:n,strokeLinejoin:r,strokeOpacity:i,strokeWidth:a,transition:u,...h})]})});ye.__docgenInfo={description:`A customizable solid line component.
Supports gradient for gradient effects and smooth data transitions.`,methods:[],displayName:"SolidLine",props:{fill:{defaultValue:{value:"'none'",computed:!1},required:!1},stroke:{defaultValue:{value:"'var(--color-fgPrimary)'",computed:!1},required:!1},strokeLinecap:{defaultValue:{value:"'round'",computed:!1},required:!1},strokeLinejoin:{defaultValue:{value:"'round'",computed:!1},required:!1},strokeOpacity:{defaultValue:{value:"1",computed:!1},required:!1},strokeWidth:{defaultValue:{value:"2",computed:!1},required:!1}}};const je=d.memo(e=>g.jsx(xe,{...e}));je.__docgenInfo={description:`DefaultAxisTickLabel is the default label component for axis tick labels.
Provides standard styling for both X and Y axis tick labels.`,methods:[],displayName:"DefaultAxisTickLabel"};const Re=32,qe=20,Ke="axisTickMarkCss-a19u12rg",hn="axisLineCss-a13d7aee",pn=d.memo(({position:e="bottom",showGrid:t,requestedTickCount:n,ticks:r,tickLabelFormatter:i,TickLabelComponent:a=je,style:s,className:o,styles:l,classNames:u,GridLineComponent:c=Ie,LineComponent:h=ye,TickMarkLineComponent:k=ye,tickMarkLabelGap:x=2,minTickLabelGap:p=4,showTickMarks:v,showLine:T,tickMarkSize:S=4,tickInterval:_=32,tickMinStep:I=1,tickMaxStep:$,label:f,labelGap:y=4,height:R=f?Re+qe:Re,testID:w="x-axis",bandGridLinePlacement:C="edges",bandTickMarkPlacement:E="middle",...O})=>{const z=d.useId(),{animate:Y,getXScale:W,getXAxis:A,registerAxis:H,unregisterAxis:B,getAxisBounds:U,drawingArea:j}=me(),V=W(),D=A(),M=U(z);d.useEffect(()=>(H(z,e,R),()=>B(z)),[z,H,B,e,R]);const L=d.useCallback(m=>{const b=D?.data,P=b&&Array.isArray(b)&&typeof b[0]=="string";let N=m;return P&&typeof m=="number"&&b[m]!==void 0&&(N=b[m]),i?.(N)??N},[D?.data,i]),X=d.useMemo(()=>{if(!V)return[];const m=D?.data,b=m&&Array.isArray(m)&&typeof m[0]=="string";let P;return b?P=m:ee(V)&&(P=V.domain().map(String)),lt({scaleFunction:V,ticks:r,requestedTickCount:n,categories:P,possibleTickValues:m&&Array.isArray(m)&&typeof m[0]=="string"?Array.from({length:m.length},(N,F)=>F):void 0,tickInterval:_,options:{minStep:I,maxStep:$}})},[r,V,n,_,I,$,D?.data]),Z=d.useMemo(()=>V?ee(V):!1,[V]),ae=d.useMemo(()=>V?X.flatMap((m,b)=>{if(!Z)return[{x:m.position,key:`grid-${m.tick}-${b}`}];const P=V,N=b===X.length-1,F=C==="edges",K=[{x:Q(m.tick,P,we(C)),key:`grid-${m.tick}-${b}`}];if(N&&F){const ne=Q(m.tick,P,"stepEnd");K.push({x:ne,key:`grid-${m.tick}-${b}-end`})}return K}):[],[X,V,Z,C]),ce=d.useMemo(()=>V?X.flatMap((m,b)=>{if(!Z)return[{x:m.position,key:`tick-mark-${m.tick}-${b}`}];const P=V,N=b===X.length-1,F=E==="edges",K=[{x:Q(m.tick,P,we(E)),key:`tick-mark-${m.tick}-${b}`}];if(N&&F){const ne=Q(m.tick,P,"stepEnd");K.push({x:ne,key:`tick-mark-${m.tick}-${b}-end`})}return K}):[],[X,V,Z,E]),re=d.useMemo(()=>M?X.map(m=>{const b=x+(v?S:0),N=(Re-b)/2,F=e==="top"?M.y+M.height-b-N:M.y+N+b;return{x:m.position,y:F,label:L(m.tick),chartTextProps:{className:u?.tickLabel,color:"var(--color-fgMuted)",verticalAlignment:"middle",style:l?.tickLabel,horizontalAlignment:"center"}}}):null,[M,X,x,v,S,e,L,u?.tickLabel,l?.tickLabel]);if(!V||!M||!j)return;const fe=M.x+M.width/2,de=e==="bottom"?M.y+M.height-qe/2:M.y+qe/2,ie=M.y,se=M.y+M.height,oe=e==="bottom"?ie:se,q=e==="bottom"?ie+S:se-S;return g.jsxs("g",{className:J(o,u?.root),"data-axis":"x","data-position":e,style:{...s,...l?.root},...O,children:[t&&g.jsx("g",{"data-testid":`${w}-grid`,children:ae.map(({x:m,key:b})=>Y?g.jsx(ue.g,{animate:{opacity:1},initial:{opacity:0},transition:_e,children:g.jsx(c,{animate:!1,className:u?.gridLine,clipRect:null,d:te(m,j.y,m,j.y+j.height),stroke:"var(--color-bgLine)",style:l?.gridLine})},b):g.jsx(c,{animate:!1,className:u?.gridLine,clipRect:null,d:te(m,j.y,m,j.y+j.height),stroke:"var(--color-bgLine)",style:l?.gridLine},b))}),re&&g.jsx(Me,{prioritizeEndLabels:!0,LabelComponent:a,labels:re,minGap:p}),M&&v&&g.jsx("g",{"data-testid":`${w}-tick-marks`,children:ce.map(({x:m,key:b})=>Y?g.jsx(ue.g,{animate:{opacity:1},initial:{opacity:0},transition:_e,children:g.jsx(k,{animate:!1,className:J(Ke,u?.tickMark),clipRect:null,d:te(m,q,m,oe),stroke:"var(--color-fg)",strokeLinecap:"square",strokeWidth:1,style:l?.tickMark})},b):g.jsx(k,{animate:!1,className:J(Ke,u?.tickMark),clipRect:null,d:te(m,q,m,oe),stroke:"var(--color-fg)",strokeLinecap:"square",strokeWidth:1,style:l?.tickMark},b))}),T&&g.jsx(h,{animate:!1,className:J(hn,u?.line),clipRect:null,d:te(M.x,e==="bottom"?M.y:M.y+M.height,M.x+M.width,e==="bottom"?M.y:M.y+M.height),"data-testid":`${w}-line`,stroke:"var(--color-fg)",strokeLinecap:"square",strokeWidth:1,style:l?.line}),f&&g.jsx(xe,{disableRepositioning:!0,className:u?.label,horizontalAlignment:"center",style:l?.label,testID:`${w}-label`,verticalAlignment:"middle",x:fe,y:de,children:f})]})});pn.__docgenInfo={description:"",methods:[],displayName:"XAxis",props:{position:{defaultValue:{value:"'bottom'",computed:!1},required:!1},TickLabelComponent:{defaultValue:{value:`memo<DefaultAxisTickLabelProps>((props) => {
  return <ChartText {...props} />;
})`,computed:!0},required:!1},GridLineComponent:{defaultValue:{value:`memo<DottedLineProps>(
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
)`,computed:!0},required:!1},LineComponent:{defaultValue:{value:`memo<SolidLineProps>(
  ({
    fill = 'none',
    stroke = 'var(--color-fgPrimary)',
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
    strokeOpacity = 1,
    strokeWidth = 2,
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
          strokeLinecap={strokeLinecap}
          strokeLinejoin={strokeLinejoin}
          strokeOpacity={strokeOpacity}
          strokeWidth={strokeWidth}
          transition={transition}
          {...props}
        />
      </>
    );
  },
)`,computed:!0},required:!1},TickMarkLineComponent:{defaultValue:{value:`memo<SolidLineProps>(
  ({
    fill = 'none',
    stroke = 'var(--color-fgPrimary)',
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
    strokeOpacity = 1,
    strokeWidth = 2,
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
          strokeLinecap={strokeLinecap}
          strokeLinejoin={strokeLinejoin}
          strokeOpacity={strokeOpacity}
          strokeWidth={strokeWidth}
          transition={transition}
          {...props}
        />
      </>
    );
  },
)`,computed:!0},required:!1},tickMarkLabelGap:{defaultValue:{value:"2",computed:!1},required:!1},minTickLabelGap:{defaultValue:{value:"4",computed:!1},required:!1},tickMarkSize:{defaultValue:{value:"4",computed:!1},required:!1},tickInterval:{defaultValue:{value:"32",computed:!1},required:!1},tickMinStep:{defaultValue:{value:"1",computed:!1},required:!1},labelGap:{defaultValue:{value:"4",computed:!1},required:!1},height:{defaultValue:{value:"label ? AXIS_HEIGHT + LABEL_SIZE : AXIS_HEIGHT",computed:!1},required:!1},testID:{defaultValue:{value:"'x-axis'",computed:!1},required:!1},bandGridLinePlacement:{defaultValue:{value:"'edges'",computed:!1},required:!1},bandTickMarkPlacement:{defaultValue:{value:"'middle'",computed:!1},required:!1}}};const Ze=44,Te=20,Je="axisTickMarkCss-a14fn86b",gn="axisLineCss-a94zbs",yn=d.memo(({axisId:e,position:t="right",showGrid:n,requestedTickCount:r,ticks:i,tickLabelFormatter:a,TickLabelComponent:s=je,style:o,className:l,styles:u,classNames:c,GridLineComponent:h=Ie,LineComponent:k=ye,TickMarkLineComponent:x=ye,tickMarkLabelGap:p=8,minTickLabelGap:v=0,showTickMarks:T,showLine:S,tickMarkSize:_=4,tickInterval:I,label:$,labelGap:f=4,width:y=$?Ze+Te:Ze,testID:R="y-axis",bandGridLinePlacement:w="edges",bandTickMarkPlacement:C="middle",...E})=>{const O=d.useId(),{animate:z,getYScale:Y,getYAxis:W,registerAxis:A,unregisterAxis:H,getAxisBounds:B,drawingArea:U}=me(),j=Y(e),V=W(e),D=B(O);d.useEffect(()=>(A(O,t,y),()=>H(O)),[O,A,H,t,y]);const M=d.useCallback(q=>{const m=V?.data;return m&&Array.isArray(m)&&typeof m[0]=="string"&&!a&&m[q]!==void 0?m[q]:a?.(q)??q},[V?.data,a]),L=d.useMemo(()=>{if(!j)return[];const q=V?.data,m=q&&Array.isArray(q)&&typeof q[0]=="string";let b;return m?b=q:ee(j)&&(b=j.domain().map(String)),lt({scaleFunction:j,ticks:i,requestedTickCount:I!==void 0?void 0:r??5,categories:b,tickInterval:I})},[i,j,r,I,V?.data]),X=d.useMemo(()=>j?ee(j):!1,[j]),Z=d.useMemo(()=>j?L.flatMap((q,m)=>{if(!X)return[{y:q.position,key:`grid-${q.tick}-${m}`}];const b=j,P=m===L.length-1,N=w==="edges",G=[{y:Q(q.tick,b,we(w)),key:`grid-${q.tick}-${m}`}];if(P&&N){const K=Q(q.tick,b,"stepEnd");G.push({y:K,key:`grid-${q.tick}-${m}-end`})}return G}):[],[L,j,X,w]),ae=d.useMemo(()=>j?L.flatMap((q,m)=>{if(!X)return[{y:q.position,key:`tick-mark-${q.tick}-${m}`}];const b=j,P=m===L.length-1,N=C==="edges",G=[{y:Q(q.tick,b,we(C)),key:`tick-mark-${q.tick}-${m}`}];if(P&&N){const K=Q(q.tick,b,"stepEnd");G.push({y:K,key:`tick-mark-${q.tick}-${m}-end`})}return G}):[],[L,j,X,C]),ce=d.useMemo(()=>D?L.map(q=>{const m=p+(T?_:0);return{x:t==="left"?D.x+D.width-m:D.x+m,y:q.position,label:M(q.tick),chartTextProps:{className:c?.tickLabel,color:"var(--color-fgMuted)",verticalAlignment:"middle",style:u?.tickLabel,horizontalAlignment:t==="left"?"right":"left"}}}):null,[D,L,p,T,_,t,M,c?.tickLabel,u?.tickLabel]);if(!j||!D||!U)return;const re=t==="left"?D.x+Te/2:D.x+D.width-Te/2,fe=D.y+D.height/2,de=D.x,ie=D.x+D.width,se=t==="left"?ie:de,oe=t==="left"?ie-_:de+_;return g.jsxs("g",{className:J(l,c?.root),"data-axis":"y","data-position":t,style:{...o,...u?.root},...E,children:[n&&g.jsx("g",{"data-testid":`${R}-grid`,children:Z.map(({y:q,key:m})=>z?g.jsx(ue.g,{animate:{opacity:1},initial:{opacity:0},transition:_e,children:g.jsx(h,{animate:!1,className:c?.gridLine,clipRect:null,d:te(U.x,q,U.x+U.width,q),stroke:"var(--color-bgLine)",style:u?.gridLine})},m):g.jsx(h,{animate:!1,className:c?.gridLine,clipRect:null,d:te(U.x,q,U.x+U.width,q),stroke:"var(--color-bgLine)",style:u?.gridLine},m))}),ce&&g.jsx(Me,{prioritizeEndLabels:!0,LabelComponent:s,labels:ce,minGap:v}),T&&g.jsx("g",{"data-testid":`${R}-tick-marks`,children:ae.map(({y:q,key:m})=>z?g.jsx(ue.g,{animate:{opacity:1},initial:{opacity:0},transition:_e,children:g.jsx(x,{animate:!1,className:J(Je,c?.tickMark),clipRect:null,d:te(se,q,oe,q),stroke:"var(--color-fg)",strokeLinecap:"square",strokeWidth:1,style:u?.tickMark})},m):g.jsx(x,{animate:!1,className:J(Je,c?.tickMark),clipRect:null,d:te(se,q,oe,q),stroke:"var(--color-fg)",strokeLinecap:"square",strokeWidth:1,style:u?.tickMark},m))}),S&&g.jsx(k,{animate:!1,className:J(gn,c?.line),clipRect:null,d:te(t==="left"?D.x+D.width:D.x,D.y,t==="left"?D.x+D.width:D.x,D.y+D.height),"data-testid":`${R}-line`,stroke:"var(--color-fg)",strokeLinecap:"square",strokeWidth:1,style:u?.line}),$&&g.jsx("g",{"data-testid":`${R}-label`,style:{transformOrigin:`${re}px ${fe}px`,transform:`rotate(${t==="left"?-90:90}deg)`},children:g.jsx(xe,{disableRepositioning:!0,className:c?.label,horizontalAlignment:"center",style:u?.label,testID:`${R}-label-text`,verticalAlignment:"middle",x:re,y:fe,children:$})})]})});yn.__docgenInfo={description:"",methods:[],displayName:"YAxis",props:{position:{defaultValue:{value:"'right'",computed:!1},required:!1},TickLabelComponent:{defaultValue:{value:`memo<DefaultAxisTickLabelProps>((props) => {
  return <ChartText {...props} />;
})`,computed:!0},required:!1},GridLineComponent:{defaultValue:{value:`memo<DottedLineProps>(
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
)`,computed:!0},required:!1},LineComponent:{defaultValue:{value:`memo<SolidLineProps>(
  ({
    fill = 'none',
    stroke = 'var(--color-fgPrimary)',
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
    strokeOpacity = 1,
    strokeWidth = 2,
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
          strokeLinecap={strokeLinecap}
          strokeLinejoin={strokeLinejoin}
          strokeOpacity={strokeOpacity}
          strokeWidth={strokeWidth}
          transition={transition}
          {...props}
        />
      </>
    );
  },
)`,computed:!0},required:!1},TickMarkLineComponent:{defaultValue:{value:`memo<SolidLineProps>(
  ({
    fill = 'none',
    stroke = 'var(--color-fgPrimary)',
    strokeLinecap = 'round',
    strokeLinejoin = 'round',
    strokeOpacity = 1,
    strokeWidth = 2,
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
          strokeLinecap={strokeLinecap}
          strokeLinejoin={strokeLinejoin}
          strokeOpacity={strokeOpacity}
          strokeWidth={strokeWidth}
          transition={transition}
          {...props}
        />
      </>
    );
  },
)`,computed:!0},required:!1},tickMarkLabelGap:{defaultValue:{value:"8",computed:!1},required:!1},minTickLabelGap:{defaultValue:{value:"0",computed:!1},required:!1},tickMarkSize:{defaultValue:{value:"4",computed:!1},required:!1},labelGap:{defaultValue:{value:"4",computed:!1},required:!1},width:{defaultValue:{value:"label ? AXIS_WIDTH + LABEL_SIZE : AXIS_WIDTH",computed:!1},required:!1},testID:{defaultValue:{value:"'y-axis'",computed:!1},required:!1},bandGridLinePlacement:{defaultValue:{value:"'edges'",computed:!1},required:!1},bandTickMarkPlacement:{defaultValue:{value:"'middle'",computed:!1},required:!1}}};const mt=({children:e,svgRef:t,enableScrubbing:n,onScrubberPositionChange:r})=>{const i=me();if(!i)throw new Error("ScrubberProvider must be used within a ChartContext");const{getXScale:a,getXAxis:s,series:o}=i,[l,u]=d.useState(void 0),c=d.useCallback(f=>{const y=a(),R=s();if(!y||!R)return 0;if(ee(y)){const w=y.domain?.()??R.data??[],C=y.bandwidth?.()??0;let E=0,O=1/0;for(let z=0;z<w.length;z++){const Y=y(z);if(Y!==void 0){const W=Math.abs(f-(Y+C/2));W<O&&(O=W,E=z)}}return E}else{const w=R.data;if(w&&Array.isArray(w)&&typeof w[0]=="number"){const C=w;let E=0,O=1/0;for(let z=0;z<C.length;z++){const Y=C[z],W=y(Y);if(W!==void 0){const A=Math.abs(f-W);A<O&&(O=A,E=z)}}return E}else{const C=y.invert(f),E=Math.round(C),O=R.domain;return Math.max(O.min??0,Math.min(E,O.max??0))}}},[a,s]),h=d.useCallback((f,y)=>{if(!n||!o||o.length===0)return;const R=y.getBoundingClientRect(),w=f-R.left,C=c(w);C!==l&&(u(C),r?.(C))},[n,o,c,l,r]),k=d.useCallback(f=>{const y=f.currentTarget;h(f.clientX,y)},[h]),x=d.useCallback(f=>{if(!f.touches.length)return;f.preventDefault();const y=f.touches[0],R=f.currentTarget;h(y.clientX,R)},[h]),p=d.useCallback(f=>{if(!n||!f.touches.length)return;const y=f.touches[0],R=f.currentTarget;h(y.clientX,R)},[n,h]),v=d.useCallback(()=>{n&&(u(void 0),r?.(void 0))},[n,r]),T=v,S=v,_=d.useCallback(f=>{if(!n)return;const y=a(),R=s();if(!y||!R)return;const w=ee(y);let C,E;if(w){const H=y.domain?.()??R.data??[];C=0,E=Math.max(0,H.length-1),H.length}else{const H=R.data;if(H&&Array.isArray(H))C=0,E=Math.max(0,H.length-1),H.length;else{const B=R.domain;C=B.min??0,E=B.max??0}}const O=l??C,z=E-C,W=f.shiftKey?Math.min(10,Math.max(1,Math.floor(z*.1))):1;let A;switch(f.key){case"ArrowLeft":f.preventDefault(),A=Math.max(C,O-W);break;case"ArrowRight":f.preventDefault(),A=Math.min(E,O+W);break;case"Home":f.preventDefault(),A=C;break;case"End":f.preventDefault(),A=E;break;case"Escape":f.preventDefault(),A=void 0;break;default:return}A!==l&&(u(A),r?.(A))},[n,a,s,l,r]),I=d.useCallback(()=>{!n||l===void 0||(u(void 0),r?.(void 0))},[n,r,l]);d.useEffect(()=>{if(!t?.current||!n)return;const f=t.current;return f.addEventListener("mousemove",k),f.addEventListener("mouseleave",T),f.addEventListener("touchstart",p,{passive:!1}),f.addEventListener("touchmove",x,{passive:!1}),f.addEventListener("touchend",S),f.addEventListener("touchcancel",S),f.addEventListener("keydown",_),f.addEventListener("blur",I),()=>{f.removeEventListener("mousemove",k),f.removeEventListener("mouseleave",T),f.removeEventListener("touchstart",p),f.removeEventListener("touchmove",x),f.removeEventListener("touchend",S),f.removeEventListener("touchcancel",S),f.removeEventListener("keydown",_),f.removeEventListener("blur",I)}},[t,n,k,T,p,x,S,_,I]);const $=d.useMemo(()=>({enableScrubbing:!!n,scrubberPosition:l,onScrubberPositionChange:u}),[n,l]);return g.jsx(ut.Provider,{value:$,children:e})};mt.__docgenInfo={description:`A component which encapsulates the ScrubberContext.
It depends on a ChartContext in order to provide accurate mouse tracking.`,methods:[],displayName:"ScrubberProvider",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},svgRef:{required:!0,tsType:{name:"union",raw:"React.RefObject<SVGSVGElement> | null",elements:[{name:"ReactRefObject",raw:"React.RefObject<SVGSVGElement>",elements:[{name:"SVGSVGElement"}]},{name:"null"}]},description:"A reference to the root SVG element, where interaction event handlers will be attached."}}};const xn="containerCss-c1sk29ue",bn="pillCss-pb8d968",vn="circleCss-c1swdt6q",kn="squareCss-snk8xv7",wn="squircleCss-szrgv5u",ft={pill:bn,circle:vn,square:kn,squircle:wn},_n=e=>typeof e=="string"&&e in ft,Ne=d.memo(({color:e="var(--color-fgPrimary)",shape:t="circle",className:n,style:r,...i})=>{if(!_n(t))return t;const a=ft[t];return g.jsx(le,{className:J(xn,n),style:r,...i,children:g.jsx("span",{className:a,style:{backgroundColor:e}})})});Ne.__docgenInfo={description:"",methods:[],displayName:"DefaultLegendShape",props:{color:{defaultValue:{value:"'var(--color-fgPrimary)'",computed:!1},required:!1},shape:{defaultValue:{value:"'circle'",computed:!1},required:!1}}};const Cn="legendEntryCss-li3jdqj",ht=d.memo(({seriesId:e,label:t,color:n,shape:r,ShapeComponent:i=Ne,gap:a=1,className:s,classNames:o,style:l,styles:u,testID:c,...h})=>g.jsxs(St,{className:J(Cn,s,o?.root),"data-testid":c,gap:a,style:{...l,...u?.root},...h,children:[g.jsx(i,{className:o?.shape,color:n,shape:r,style:u?.shape}),typeof t=="string"?g.jsx(Qe,{className:o?.label,font:"label1",style:u?.label,children:t}):t]}));ht.__docgenInfo={description:"",methods:[],displayName:"DefaultLegendEntry",props:{seriesId:{required:!0,tsType:{name:"string"},description:"Id of the series."},label:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:`Label of the series.
If a ReactNode is provided, it replaces the default Text component.`},color:{required:!1,tsType:{name:"string"},description:`Color of the series.
@default 'var(--color-fgPrimary)'`},shape:{required:!1,tsType:{name:"union",raw:"LegendShapeVariant | React.ReactNode",elements:[{name:"union",raw:"'circle' | 'square' | 'squircle' | 'pill'",elements:[{name:"literal",value:"'circle'"},{name:"literal",value:"'square'"},{name:"literal",value:"'squircle'"},{name:"literal",value:"'pill'"}]},{name:"ReactReactNode",raw:"React.ReactNode"}]},description:"Shape of the series."},ShapeComponent:{required:!1,tsType:{name:"ReactFC",raw:"React.FC<LegendShapeProps>",elements:[{name:"signature",type:"object",raw:`{
  /**
   * Color of the legend shape.
   * @default 'var(--color-fgPrimary)'
   */
  color?: string;
  /**
   * Shape to display. Can be a preset shape or a custom ReactNode.
   * @default 'circle'
   */
  shape?: LegendShape;
  /**
   * Custom class name for the shape element.
   */
  className?: string;
  /**
   * Custom styles for the shape element.
   */
  style?: React.CSSProperties;
}`,signature:{properties:[{key:"color",value:{name:"string",required:!1},description:`Color of the legend shape.
@default 'var(--color-fgPrimary)'`},{key:"shape",value:{name:"union",raw:"LegendShapeVariant | React.ReactNode",elements:[{name:"union",raw:"'circle' | 'square' | 'squircle' | 'pill'",elements:[{name:"literal",value:"'circle'"},{name:"literal",value:"'square'"},{name:"literal",value:"'squircle'"},{name:"literal",value:"'pill'"}]},{name:"ReactReactNode",raw:"React.ReactNode"}],required:!1},description:`Shape to display. Can be a preset shape or a custom ReactNode.
@default 'circle'`},{key:"className",value:{name:"string",required:!1},description:"Custom class name for the shape element."},{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom styles for the shape element."}]}}]},description:`Custom component to render the legend shape.
@default DefaultLegendShape`,defaultValue:{value:`memo<DefaultLegendShapeProps>(
  ({ color = 'var(--color-fgPrimary)', shape = 'circle', className, style, ...props }) => {
    if (!isVariantShape(shape)) return shape;

    const variantStyle = stylesByVariant[shape];

    return (
      <Box className={cx(containerCss, className)} style={style} {...props}>
        <span className={variantStyle} style={{ backgroundColor: color }} />
      </Box>
    );
  },
)`,computed:!0}},className:{required:!1,tsType:{name:"string"},description:"Custom class name for the root element."},classNames:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /**
   * Custom class name for the root element.
   */
  root?: string;
  /**
   * Custom class name for the shape element.
   */
  shape?: string;
  /**
   * Custom class name for the label element.
   * @note not applied when label is a ReactNode.
   */
  label?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1},description:"Custom class name for the root element."},{key:"shape",value:{name:"string",required:!1},description:"Custom class name for the shape element."},{key:"label",value:{name:"string",required:!1},description:`Custom class name for the label element.
@note not applied when label is a ReactNode.`}]}},description:"Custom class names for the component parts."},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:"Custom styles for the root element."},styles:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /**
   * Custom styles for the root element.
   */
  root?: React.CSSProperties;
  /**
   * Custom styles for the shape element.
   */
  shape?: React.CSSProperties;
  /**
   * Custom styles for the label element.
   * @note not applied when label is a ReactNode.
   */
  label?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom styles for the root element."},{key:"shape",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom styles for the shape element."},{key:"label",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:`Custom styles for the label element.
@note not applied when label is a ReactNode.`}]}},description:"Custom styles for the component parts."},gap:{defaultValue:{value:"1",computed:!1},required:!1}}};const pt=d.memo(d.forwardRef(({flexDirection:e="row",justifyContent:t="center",alignItems:n=e==="row"?"center":"flex-start",flexWrap:r="wrap",columnGap:i=2,rowGap:a=.75,seriesIds:s,EntryComponent:o=ht,ShapeComponent:l=Ne,accessibilityLabel:u="Legend",className:c,classNames:h,style:k,styles:x,...p},v)=>{const{series:T}=me(),S=d.useMemo(()=>s===void 0?T:T.filter(_=>s.includes(_.id)),[T,s]);if(S.length!==0)return g.jsx(le,{ref:v,accessibilityLabel:u,alignItems:n,className:h?.root??c,columnGap:i,flexDirection:e,flexWrap:r,justifyContent:t,role:"group",rowGap:a,style:{...k,...x?.root},...p,children:S.map(_=>g.jsx(o,{ShapeComponent:l,classNames:{root:h?.entry,shape:h?.entryShape,label:h?.entryLabel},color:_.color,label:_.label??_.id,seriesId:_.id,shape:_.legendShape,styles:{root:x?.entry,shape:x?.entryShape,label:x?.entryLabel}},_.id))})}));pt.__docgenInfo={description:"",methods:[],displayName:"Legend",props:{seriesIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:`Array of series IDs to display in the legend.
By default, all series will be displayed.`},EntryComponent:{required:!1,tsType:{name:"ReactFC",raw:"React.FC<LegendEntryProps>",elements:[{name:"signature",type:"object",raw:`{
  /**
   * Id of the series.
   */
  seriesId: string;
  /**
   * Label of the series.
   * If a ReactNode is provided, it replaces the default Text component.
   */
  label: React.ReactNode;
  /**
   * Color of the series.
   * @default 'var(--color-fgPrimary)'
   */
  color?: string;
  /**
   * Shape of the series.
   */
  shape?: LegendShape;
  /**
   * Custom component to render the legend shape.
   * @default DefaultLegendShape
   */
  ShapeComponent?: LegendShapeComponent;
  /**
   * Custom class name for the root element.
   */
  className?: string;
  /**
   * Custom class names for the component parts.
   */
  classNames?: {
    /**
     * Custom class name for the root element.
     */
    root?: string;
    /**
     * Custom class name for the shape element.
     */
    shape?: string;
    /**
     * Custom class name for the label element.
     * @note not applied when label is a ReactNode.
     */
    label?: string;
  };
  /**
   * Custom styles for the root element.
   */
  style?: React.CSSProperties;
  /**
   * Custom styles for the component parts.
   */
  styles?: {
    /**
     * Custom styles for the root element.
     */
    root?: React.CSSProperties;
    /**
     * Custom styles for the shape element.
     */
    shape?: React.CSSProperties;
    /**
     * Custom styles for the label element.
     * @note not applied when label is a ReactNode.
     */
    label?: React.CSSProperties;
  };
}`,signature:{properties:[{key:"seriesId",value:{name:"string",required:!0},description:"Id of the series."},{key:"label",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0},description:`Label of the series.
If a ReactNode is provided, it replaces the default Text component.`},{key:"color",value:{name:"string",required:!1},description:`Color of the series.
@default 'var(--color-fgPrimary)'`},{key:"shape",value:{name:"union",raw:"LegendShapeVariant | React.ReactNode",elements:[{name:"union",raw:"'circle' | 'square' | 'squircle' | 'pill'",elements:[{name:"literal",value:"'circle'"},{name:"literal",value:"'square'"},{name:"literal",value:"'squircle'"},{name:"literal",value:"'pill'"}]},{name:"ReactReactNode",raw:"React.ReactNode"}],required:!1},description:"Shape of the series."},{key:"ShapeComponent",value:{name:"ReactFC",raw:"React.FC<LegendShapeProps>",elements:[{name:"signature",type:"object",raw:`{
  /**
   * Color of the legend shape.
   * @default 'var(--color-fgPrimary)'
   */
  color?: string;
  /**
   * Shape to display. Can be a preset shape or a custom ReactNode.
   * @default 'circle'
   */
  shape?: LegendShape;
  /**
   * Custom class name for the shape element.
   */
  className?: string;
  /**
   * Custom styles for the shape element.
   */
  style?: React.CSSProperties;
}`,signature:{properties:[{key:"color",value:{name:"string",required:!1},description:`Color of the legend shape.
@default 'var(--color-fgPrimary)'`},{key:"shape",value:{name:"union",raw:"LegendShapeVariant | React.ReactNode",elements:[{name:"union",raw:"'circle' | 'square' | 'squircle' | 'pill'",elements:[{name:"literal",value:"'circle'"},{name:"literal",value:"'square'"},{name:"literal",value:"'squircle'"},{name:"literal",value:"'pill'"}]},{name:"ReactReactNode",raw:"React.ReactNode"}],required:!1},description:`Shape to display. Can be a preset shape or a custom ReactNode.
@default 'circle'`},{key:"className",value:{name:"string",required:!1},description:"Custom class name for the shape element."},{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom styles for the shape element."}]}}],required:!1},description:`Custom component to render the legend shape.
@default DefaultLegendShape`},{key:"className",value:{name:"string",required:!1},description:"Custom class name for the root element."},{key:"classNames",value:{name:"signature",type:"object",raw:`{
  /**
   * Custom class name for the root element.
   */
  root?: string;
  /**
   * Custom class name for the shape element.
   */
  shape?: string;
  /**
   * Custom class name for the label element.
   * @note not applied when label is a ReactNode.
   */
  label?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1},description:"Custom class name for the root element."},{key:"shape",value:{name:"string",required:!1},description:"Custom class name for the shape element."},{key:"label",value:{name:"string",required:!1},description:`Custom class name for the label element.
@note not applied when label is a ReactNode.`}]},required:!1},description:"Custom class names for the component parts."},{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom styles for the root element."},{key:"styles",value:{name:"signature",type:"object",raw:`{
  /**
   * Custom styles for the root element.
   */
  root?: React.CSSProperties;
  /**
   * Custom styles for the shape element.
   */
  shape?: React.CSSProperties;
  /**
   * Custom styles for the label element.
   * @note not applied when label is a ReactNode.
   */
  label?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom styles for the root element."},{key:"shape",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom styles for the shape element."},{key:"label",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:`Custom styles for the label element.
@note not applied when label is a ReactNode.`}]},required:!1},description:"Custom styles for the component parts."}]}}]},description:`Custom component to render each legend entry.
@default DefaultLegendEntry`,defaultValue:{value:`memo(
  ({
    seriesId,
    label,
    color,
    shape,
    ShapeComponent = DefaultLegendShape,
    gap = 1,
    className,
    classNames,
    style,
    styles,
    testID,
    ...props
  }: DefaultLegendEntryProps) => {
    return (
      <HStack
        className={cx(legendEntryCss, className, classNames?.root)}
        data-testid={testID}
        gap={gap}
        style={{ ...style, ...styles?.root }}
        {...props}
      >
        <ShapeComponent
          className={classNames?.shape}
          color={color}
          shape={shape}
          style={styles?.shape}
        />
        {typeof label === 'string' ? (
          <Text className={classNames?.label} font="label1" style={styles?.label}>
            {label}
          </Text>
        ) : (
          label
        )}
      </HStack>
    );
  },
)`,computed:!0}},ShapeComponent:{required:!1,tsType:{name:"ReactFC",raw:"React.FC<LegendShapeProps>",elements:[{name:"signature",type:"object",raw:`{
  /**
   * Color of the legend shape.
   * @default 'var(--color-fgPrimary)'
   */
  color?: string;
  /**
   * Shape to display. Can be a preset shape or a custom ReactNode.
   * @default 'circle'
   */
  shape?: LegendShape;
  /**
   * Custom class name for the shape element.
   */
  className?: string;
  /**
   * Custom styles for the shape element.
   */
  style?: React.CSSProperties;
}`,signature:{properties:[{key:"color",value:{name:"string",required:!1},description:`Color of the legend shape.
@default 'var(--color-fgPrimary)'`},{key:"shape",value:{name:"union",raw:"LegendShapeVariant | React.ReactNode",elements:[{name:"union",raw:"'circle' | 'square' | 'squircle' | 'pill'",elements:[{name:"literal",value:"'circle'"},{name:"literal",value:"'square'"},{name:"literal",value:"'squircle'"},{name:"literal",value:"'pill'"}]},{name:"ReactReactNode",raw:"React.ReactNode"}],required:!1},description:`Shape to display. Can be a preset shape or a custom ReactNode.
@default 'circle'`},{key:"className",value:{name:"string",required:!1},description:"Custom class name for the shape element."},{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom styles for the shape element."}]}}]},description:`Custom component to render the legend shape within each entry.
Only used when EntryComponent is not provided or is DefaultLegendEntry.
@default DefaultLegendShape`,defaultValue:{value:`memo<DefaultLegendShapeProps>(
  ({ color = 'var(--color-fgPrimary)', shape = 'circle', className, style, ...props }) => {
    if (!isVariantShape(shape)) return shape;

    const variantStyle = stylesByVariant[shape];

    return (
      <Box className={cx(containerCss, className)} style={style} {...props}>
        <span className={variantStyle} style={{ backgroundColor: color }} />
      </Box>
    );
  },
)`,computed:!0}},accessibilityLabel:{required:!1,tsType:{name:"string"},description:`Accessibility label for the legend group.
@default 'Legend'`,defaultValue:{value:"'Legend'",computed:!1}},classNames:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /**
   * Custom class name for the root element.
   */
  root?: string;
  /**
   * Custom class name for each entry element.
   */
  entry?: string;
  /**
   * Custom class name for the shape element within each entry.
   */
  entryShape?: string;
  /**
   * Custom class name for the label element within each entry.
   * @note not applied when label is a ReactNode.
   */
  entryLabel?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1},description:"Custom class name for the root element."},{key:"entry",value:{name:"string",required:!1},description:"Custom class name for each entry element."},{key:"entryShape",value:{name:"string",required:!1},description:"Custom class name for the shape element within each entry."},{key:"entryLabel",value:{name:"string",required:!1},description:`Custom class name for the label element within each entry.
@note not applied when label is a ReactNode.`}]}},description:"Custom class names for the component parts."},styles:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /**
   * Custom styles for the root element.
   */
  root?: React.CSSProperties;
  /**
   * Custom styles for each entry element.
   */
  entry?: React.CSSProperties;
  /**
   * Custom styles for the shape element within each entry.
   */
  entryShape?: React.CSSProperties;
  /**
   * Custom styles for the label element within each entry.
   * @note not applied when label is a ReactNode.
   */
  entryLabel?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom styles for the root element."},{key:"entry",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom styles for each entry element."},{key:"entryShape",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom styles for the shape element within each entry."},{key:"entryLabel",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:`Custom styles for the label element within each entry.
@note not applied when label is a ReactNode.`}]}},description:"Custom styles for the component parts."},flexDirection:{defaultValue:{value:"'row'",computed:!1},required:!1},justifyContent:{defaultValue:{value:"'center'",computed:!1},required:!1},alignItems:{defaultValue:{value:"flexDirection === 'row' ? 'center' : 'flex-start'",computed:!1},required:!1},flexWrap:{defaultValue:{value:"'wrap'",computed:!1},required:!1},columnGap:{defaultValue:{value:"2",computed:!1},required:!1},rowGap:{defaultValue:{value:"0.75",computed:!1},required:!1}}};const An="focusStylesCss-f1d8nrz6",Sn=d.memo(d.forwardRef(({series:e,children:t,animate:n=!0,xAxis:r,yAxis:i,inset:a,enableScrubbing:s,onScrubberPositionChange:o,legend:l,legendPosition:u="bottom",legendAccessibilityLabel:c,width:h="100%",height:k="100%",className:x,classNames:p,style:v,styles:T,accessibilityLabel:S,..._},I)=>{const{observe:$,width:f,height:y}=At(),R=d.useRef(null),w=d.useMemo(()=>st(a,Yt),[a]),C=d.useMemo(()=>Fe("x",r)[0],[r]),E=d.useMemo(()=>Fe("y",i),[i]),{renderedAxes:O,registerAxis:z,unregisterAxis:Y,axisPadding:W}=nn(),A=d.useMemo(()=>{if(f<=0||y<=0)return{x:0,y:0,width:0,height:0};const m={top:w.top+W.top,right:w.right+W.right,bottom:w.bottom+W.bottom,left:w.left+W.left},b=f-m.left-m.right,P=y-m.top-m.bottom;return{x:m.left,y:m.top,width:b>0?b:0,height:P>0?P:0}},[y,f,w,W]),{xAxis:H,xScale:B}=d.useMemo(()=>{if(!A||A.width<=0||A.height<=0)return{xAxis:void 0,xScale:void 0};const m=Ye(C,e??[],"x"),b=He(C,A,"x"),P={scaleType:C.scaleType,domain:m,range:b,data:C.data,categoryPadding:C.categoryPadding,domainLimit:C.domainLimit},N=Ue({config:P,type:"x",range:P.range,dataDomain:P.domain});if(!N)return{xAxis:void 0,xScale:void 0};const F=N.domain(),G=Array.isArray(F)&&F.length===2?{min:F[0],max:F[1]}:P.domain;return{xAxis:{...P,domain:G},xScale:N}},[C,e,A]),{yAxes:U,yScales:j}=d.useMemo(()=>{const m=new Map,b=new Map;return!A||A.width<=0||A.height<=0?{yAxes:m,yScales:b}:(E.forEach(P=>{const N=P.id??pe,F=e?.filter(he=>(he.yAxisId??pe)===N)??[],G=Ye(P,F,"y"),K=He(P,A,"y"),ne={scaleType:P.scaleType,domain:G,range:K,data:P.data,categoryPadding:P.categoryPadding,domainLimit:P.domainLimit??"nice"},Ae=Ue({config:ne,type:"y",range:ne.range,dataDomain:ne.domain});if(Ae){b.set(N,Ae);const he=Ae.domain(),gt=Array.isArray(he)&&he.length===2?{min:he[0],max:he[1]}:ne.domain;m.set(N,{...ne,domain:gt})}}),{yAxes:m,yScales:b})},[E,e,A]),V=d.useCallback(()=>H,[H]),D=d.useCallback(m=>U.get(m??pe),[U]),M=d.useCallback(()=>B,[B]),L=d.useCallback(m=>j.get(m??pe),[j]),X=d.useCallback(m=>e?.find(b=>b.id===m),[e]),Z=d.useMemo(()=>e?it(e):new Map,[e]),ae=d.useCallback(m=>{if(m)return Z.get(m)},[Z]),ce=d.useMemo(()=>C.data&&C.data.length>0?C.data.length:!e||e.length===0?0:e.reduce((m,b)=>{const P=ae(b.id);return Math.max(m,P?.length??0)},0),[C.data,e,ae]),re=d.useCallback(m=>{const b=O.get(m);if(!b||!A)return;const P=Array.from(O.values()).filter(G=>G.position===b.position).sort((G,K)=>G.id.localeCompare(K.id)),N=P.findIndex(G=>G.id===m);if(N===-1)return;const F=P.slice(0,N).reduce((G,K)=>G+K.size,0);if(b.position==="top"){const G=w.top+F;return{x:A.x,y:G,width:A.width,height:b.size}}else if(b.position==="bottom"){const G=A.y+A.height+F;return{x:A.x,y:G,width:A.width,height:b.size}}else return b.position==="left"?{x:w.left+F,y:A.y,width:b.size,height:A.height}:{x:A.x+A.width+F,y:A.y,width:b.size,height:A.height}},[O,A,w]),fe=d.useMemo(()=>({series:e??[],getSeries:X,getSeriesData:ae,animate:n,width:f,height:y,getXAxis:V,getYAxis:D,getXScale:M,getYScale:L,drawingArea:A,dataLength:ce,registerAxis:z,unregisterAxis:Y,getAxisBounds:re}),[e,X,ae,n,f,y,V,D,M,L,A,ce,z,Y,re]),de=d.useMemo(()=>J(x,p?.root),[x,p]),ie=d.useMemo(()=>({...v,...T?.root}),[v,T?.root]),se=d.useMemo(()=>{if(l){if(l===!0){const b=u==="top"||u==="bottom"?"row":"column";return g.jsx(pt,{accessibilityLabel:c,flexDirection:b})}return l}},[l,c,u]),oe=d.useMemo(()=>({className:de,height:k,style:ie,width:h,..._}),[de,k,ie,h,_]),q=g.jsx(le,{ref:m=>{$(m)},height:l?void 0:k,style:{flex:1,minHeight:0,minWidth:0},width:l?void 0:h,children:g.jsx(le,{ref:m=>{const b=m;R.current=b,I&&(typeof I=="function"?I(b):I.current=b)},accessibilityLabel:S,"aria-live":"polite",as:"svg",className:J(s&&An,p?.chart),height:"100%",style:T?.chart,tabIndex:s?0:void 0,width:"100%",children:t})});return g.jsx(Lt,{value:fe,children:g.jsx(mt,{enableScrubbing:!!s,onScrubberPositionChange:o,svgRef:R,children:l?g.jsxs(le,{...oe,flexDirection:u==="top"||u==="bottom"?"column":"row",children:[(u==="top"||u==="left")&&se,q,(u==="bottom"||u==="right")&&se]}):g.jsx(le,{...oe,children:q})})})}));Sn.__docgenInfo={description:"",methods:[],displayName:"CartesianChart",props:{testID:{required:!1,tsType:{name:"string"},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:"Custom styles for the root element."},font:{required:!1,tsType:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"fontFamily"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"fontFamily",required:!1}},{key:"phone",value:{name:"fontFamily",required:!1}},{key:"tablet",value:{name:"fontFamily",required:!1}},{key:"desktop",value:{name:"fontFamily",required:!1}}]}}]},description:""},pin:{required:!1,tsType:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}]},description:"Direction in which to absolutely pin the box."},bordered:{required:!1,tsType:{name:"boolean"},description:"Add a border around all sides of the box."},borderedTop:{required:!1,tsType:{name:"boolean"},description:"Add a border to the top side of the box."},borderedBottom:{required:!1,tsType:{name:"boolean"},description:"Add a border to the bottom side of the box."},borderedStart:{required:!1,tsType:{name:"boolean"},description:"Add a border to the leading side of the box."},borderedEnd:{required:!1,tsType:{name:"boolean"},description:"Add a border to the trailing side of the box."},borderedHorizontal:{required:!1,tsType:{name:"boolean"},description:"Add a border to the leading and trailing sides of the box."},borderedVertical:{required:!1,tsType:{name:"boolean"},description:"Add a border to the top and bottom sides of the box."},dangerouslySetBackground:{required:!1,tsType:{name:"string"},description:"@danger This is a migration escape hatch. It is not intended to be used normally."},series:{required:!1,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
@default 'circle'`}]}}],raw:"Array<Series>"},description:`Configuration objects that define how to visualize the data.
Each series contains its own data array.`},animate:{required:!1,tsType:{name:"boolean"},description:`Whether to animate the chart.
@default true`,defaultValue:{value:"true",computed:!1}},xAxis:{required:!1,tsType:{name:"Partial",elements:[{name:"Omit",elements:[{name:"intersection",raw:`Omit<AxisConfig, 'domain' | 'range'> & {
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
This replaces the previous rangeOffset approach and provides more flexibility for range customization.`}]}}]},{name:"literal",value:"'id'"}],raw:"Omit<AxisConfigProps, 'id'>"}],raw:"Partial<Omit<AxisConfigProps, 'id'>>"},description:"Configuration for x-axis."},yAxis:{required:!1,tsType:{name:"union",raw:"Partial<Omit<AxisConfigProps, 'data'>> | Partial<Omit<AxisConfigProps, 'data'>>[]",elements:[{name:"Partial",elements:[{name:"Omit",elements:[{name:"intersection",raw:`Omit<AxisConfig, 'domain' | 'range'> & {
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
This replaces the previous rangeOffset approach and provides more flexibility for range customization.`}]}}]},{name:"literal",value:"'data'"}],raw:"Omit<AxisConfigProps, 'data'>"}],raw:"Partial<Omit<AxisConfigProps, 'data'>>"},{name:"Array",elements:[{name:"Partial",elements:[{name:"Omit",elements:[{name:"intersection",raw:`Omit<AxisConfig, 'domain' | 'range'> & {
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
This replaces the previous rangeOffset approach and provides more flexibility for range customization.`}]}}]},{name:"literal",value:"'data'"}],raw:"Omit<AxisConfigProps, 'data'>"}],raw:"Partial<Omit<AxisConfigProps, 'data'>>"}],raw:"Partial<Omit<AxisConfigProps, 'data'>>[]"}]},description:"Configuration for y-axis(es). Can be a single config or array of configs."},inset:{required:!1,tsType:{name:"union",raw:"number | Partial<ChartInset>",elements:[{name:"number"},{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
  top: number;
  left: number;
  bottom: number;
  right: number;
}`,signature:{properties:[{key:"top",value:{name:"number",required:!0}},{key:"left",value:{name:"number",required:!0}},{key:"bottom",value:{name:"number",required:!0}},{key:"right",value:{name:"number",required:!0}}]}}],raw:"Partial<ChartInset>"}]},description:"Inset around the entire chart (outside the axes)."},legend:{required:!1,tsType:{name:"union",raw:"boolean | React.ReactNode",elements:[{name:"boolean"},{name:"ReactReactNode",raw:"React.ReactNode"}]},description:"Whether to show the legend or a custom legend element.\n- `true` renders the default Legend component\n- A React element renders that element as the legend\n- `false` or omitted hides the legend"},legendPosition:{required:!1,tsType:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"}]},description:`Position of the legend relative to the chart.
@default 'bottom'`,defaultValue:{value:"'bottom'",computed:!1}},legendAccessibilityLabel:{required:!1,tsType:{name:"string"},description:`Accessibility label for the legend group.
@default 'Legend'`},className:{required:!1,tsType:{name:"string"},description:"Custom class name for the root element."},classNames:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /**
   * Custom class name for the root element.
   */
  root?: string;
  /**
   * Custom class name for the chart SVG element.
   */
  chart?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1},description:"Custom class name for the root element."},{key:"chart",value:{name:"string",required:!1},description:"Custom class name for the chart SVG element."}]}},description:"Custom class names for the component."},styles:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /**
   * Custom styles for the root element.
   */
  root?: React.CSSProperties;
  /**
   * Custom styles for the chart SVG element.
   */
  chart?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom styles for the root element."},{key:"chart",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom styles for the chart SVG element."}]}},description:"Custom styles for the component."},width:{defaultValue:{value:"'100%'",computed:!1},required:!1},height:{defaultValue:{value:"'100%'",computed:!1},required:!1}}};const _e={duration:dt,ease:"easeOut"};export{Q as A,Sn as C,Ie as D,Be as G,pt as L,De as P,ye as S,pn as X,yn as Y,xe as a,Me as b,Yt as c,In as d,Vn as e,ut as f,st as g,Ne as h,ee as i,Xn as j,sn as k,$n as l,pe as m,je as n,on as o,ge as p,jn as q,On as r,zn as s,Gn as t,me as u,Nn as v,En as w,Wn as x,dt as y,Un as z};
