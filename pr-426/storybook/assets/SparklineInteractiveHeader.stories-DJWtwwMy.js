import{j as a,r as t}from"./iframe-CYDANtMt.js";import{s as i}from"./SparklineInteractiveData-DMKVVxW5.js";import{S as j,a as _}from"./SparklineInteractiveHeader-BCNIJNzS.js";import{T as O}from"./Text-0g3rWpAf.js";import{H as z}from"./HStack-Fh-9TmPm.js";import{I as M}from"./Icon-DRxKkZdt.js";import"./preload-helper-D9Z9MdNV.js";import"./sizing-Do56D2dQ.js";import"./sparkline-Tad7TG6v.js";import"./tokens-BwScSksM.js";import"./debounce-fynzmAtJ.js";import"./getAccessibleColor-DI6pMR9o.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";import"./useTheme-C_Ehsh33.js";import"./d3-interpolate-path-DAdKSvnf.js";import"./noop-BjFrJKj1.js";import"./Lottie-DOBp1fvm.js";import"./useDimensions-C4mzPCUe.js";import"./VisualizationContainer-CbisFAIn.js";import"./identity-XBCBGOlM.js";import"./_MapCache-TsE-7C0k.js";import"./Pressable-BvczHaFK.js";import"./isArray-BJmyNVUi.js";import"./eq-CQ4zk1HF.js";import"./keys-Cj-0v-77.js";import"./_isIndex-CqeJT8IS.js";import"./TextLabel2-CJr-TMzH.js";import"./toFinite-CyNIByum.js";import"./toNumber-Cj9tIAZa.js";import"./isSymbol-_FF1kV9r.js";import"./usePreviousValues-CzZr0hLN.js";import"./TextLabel1-BVkq4OFC.js";import"./VStack-iXgNewwv.js";import"./AccessibilityAnnouncer-D9Ic-fZS.js";import"./useMergeRefs-DR4sGa7m.js";const xe={component:j,title:"Components/SparklineInteractiveHeader"},$="day",E=[{label:"1H",value:"hour"},{label:"1D",value:"day"},{label:"1W",value:"week"},{label:"1M",value:"month"},{label:"1Y",value:"year"},{label:"All",value:"all"}],B=[{label:"1 Std.",value:"hour"},{label:"1 Tag",value:"day"},{label:"1 Wo.",value:"week"},{label:"1 Mon.",value:"month"},{label:"1 Jahr",value:"year"},{label:"All",value:"all"}],A=e=>{switch(e){case"hour":case"day":return{hour:"numeric",minute:"numeric"};case"week":case"month":return{month:"numeric",day:"numeric"};case"year":case"all":return{month:"numeric",year:"numeric"};default:return{month:"numeric",day:"numeric"}}},N=e=>{switch(e){case"hour":case"day":case"week":case"month":return{weekday:"short",month:"short",day:"numeric",hour:"numeric",minute:"numeric"};default:return{weekday:"short",year:"numeric",month:"short",day:"numeric"}}};function f(e){return e.toLocaleString("en-US",{maximumFractionDigits:2})}function p(e,d,P){const n=P[d][0],r=e.value>n.value;return{percent:`${f(Math.abs((e.value-n.value)/n.value)*100)}%`,sign:r?"upwardTrend":"downwardTrend",variant:r?"positive":"negative",accessibilityLabel:`on ${new Intl.DateTimeFormat("en-US").format(e?.date)}, ${r?"up":"down"}`,priceChange:`$${f(Math.abs(e.value-n.value))}`}}const J=()=>a.jsxs(z,{alignItems:"center",gap:1,paddingBottom:0,children:[a.jsx(M,{active:!0,name:"wallet",size:"s"}),a.jsx(O,{as:"span",font:"title3",children:"CustomHeader"})]}),L=({data:e,labelNode:d,compact:P,periodSelectorPlacement:I,alternatePeriods:n,strokeColor:r="#F7931A"})=>{const u=t.useMemo(()=>({timeZone:"America/New_York"}),[]),[k,w]=t.useState($),D=t.useRef(null),s=e,R=n?B:E,x=s[k],b=x[x.length-1],o=t.useCallback((l,m)=>{const T=A(m);return l.toLocaleString("en-US",{...u,...T})},[u]),c=t.useCallback((l,m)=>l.toLocaleString("en-US",{...u,...N(m)}),[u]),C=t.useCallback(({point:l,period:m})=>{D.current?.update({title:`$${l.value.toLocaleString("en-US")}`,subHead:p(l,m,s)})},[s]),U=t.useCallback(()=>{D.current?.update({title:`$${f(b.value)}`,subHead:p(b,k,s)})},[k,b,s]),W=t.useCallback(l=>{w(l);const m=s[l],T=m[m.length-1];D.current?.update({title:`$${f(T.value)}`,subHead:p(T,l,s)})},[s]),F=a.jsx(j,{ref:D,compact:P,defaultLabel:d?"CustomHeader":"Bitcoin Price",defaultSubHead:p(b,k,s),defaultTitle:`$${f(b.value)}`,labelNode:d});return a.jsx(_,{compact:P,data:e,defaultPeriod:$,formatDate:o,formatHoverDate:c,headerNode:F,onPeriodChanged:W,onScrub:C,onScrubEnd:U,periodSelectorPlacement:I,periods:R,strokeColor:r})},S=()=>a.jsx(L,{data:i});S.bind({});S.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const h=()=>a.jsx(L,{data:i,labelNode:a.jsx(J,{})});h.bind({});h.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const v=()=>a.jsx(L,{compact:!0,data:i});v.bind({});v.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const H=()=>a.jsx(L,{compact:!0,data:i,periodSelectorPlacement:"below"});H.parameters={percy:{enableJavaScript:!0}};const g=()=>a.jsx(L,{alternatePeriods:!0,data:i});g.bind({});g.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const y=()=>{const e=t.useRef(null),[d,P]=t.useState("day"),I=i[d],n=I[I.length-1],r=t.useRef(null),u=t.useMemo(()=>({timeZone:"America/New_York"}),[]),k=t.useCallback((o,c)=>{const C=A(c);return o.toLocaleString("en-US",{...u,...C})},[u]),w=t.useCallback((o,c)=>o.toLocaleString("en-US",{...u,...N(c)}),[u]),D=t.useCallback(({point:o,period:c})=>{e.current?.update({subHead:p(o,c,i)}),r.current&&(r.current.innerText=`$${o.value.toLocaleString("en-US")}`)},[]),s=t.useCallback(()=>{e.current?.update({subHead:p(n,d,i)}),r.current&&(r.current.innerText=`$${f(n.value)}`)},[d,n]),R=t.useCallback(o=>{P(o);const c=i[o],C=c[c.length-1];e.current?.update({subHead:p(C,o,i)}),r.current&&(r.current.innerText=`$${f(C.value)}`)},[]),x=a.jsx(O,{as:"div",color:"fgPrimary",font:"title3",children:a.jsxs("span",{ref:r,children:["$",f(n.value)]})}),b=a.jsx(j,{ref:e,defaultLabel:"Bitcoin Price",defaultSubHead:p(n,d,i),defaultTitle:x});return a.jsx(_,{data:i,defaultPeriod:$,formatDate:k,formatHoverDate:w,headerNode:b,onPeriodChanged:R,onScrub:D,onScrubEnd:s,periods:E,strokeColor:"#F7931A"})};S.__docgenInfo={description:"",methods:[],displayName:"Default"};h.__docgenInfo={description:"",methods:[],displayName:"CustomLabel"};v.__docgenInfo={description:"",methods:[],displayName:"Compact"};H.__docgenInfo={description:"",methods:[],displayName:"BottomPeriodSelector"};g.__docgenInfo={description:"",methods:[],displayName:"AlternatePeriods"};y.__docgenInfo={description:"",methods:[],displayName:"CustomTitle"};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => {
  return <SparklineInteractiveWithHeader data={sparklineInteractiveData} />;
}`,...S.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => {
  return <SparklineInteractiveWithHeader data={sparklineInteractiveData} labelNode={<HeaderLabel />} />;
}`,...h.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`() => {
  return <SparklineInteractiveWithHeader compact data={sparklineInteractiveData} />;
}`,...v.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`() => {
  return <SparklineInteractiveWithHeader compact data={sparklineInteractiveData} periodSelectorPlacement="below" />;
}`,...H.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => {
  return <SparklineInteractiveWithHeader alternatePeriods data={sparklineInteractiveData} />;
}`,...g.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => {
  const headerRef = useRef<SparklineInteractiveHeaderRef | null>(null);
  const [currentPeriod, setCurrentPeriod] = useState<SparklinePeriod>('day');
  const data = sparklineInteractiveData[currentPeriod];
  const lastPoint = data[data.length - 1];
  const titleRef = useRef<HTMLSpanElement>(null);
  const timezoneObj = useMemo(() => ({
    timeZone: 'America/New_York'
  }), []);
  const formatDateWithConfig = useCallback((value: Date, period: SparklinePeriod) => {
    const config = getFormattingConfigForPeriod(period);
    return value.toLocaleString('en-US', {
      ...timezoneObj,
      ...config
    });
  }, [timezoneObj]);
  const formatHoverDate = useCallback((date: Date, period: SparklinePeriod) => {
    return date.toLocaleString('en-US', {
      ...timezoneObj,
      ...getDateHoverOptions(period)
    });
  }, [timezoneObj]);
  const handleScrub = useCallback(({
    point,
    period
  }: ChartScrubParams<SparklinePeriod>) => {
    headerRef.current?.update({
      subHead: generateSubHead(point, period, sparklineInteractiveData)
    });
    if (titleRef.current) {
      titleRef.current.innerText = \`$\${point.value.toLocaleString('en-US')}\`;
    }
  }, []);
  const handleScrubEnd = useCallback(() => {
    headerRef.current?.update({
      subHead: generateSubHead(lastPoint, currentPeriod, sparklineInteractiveData)
    });
    if (titleRef.current) {
      titleRef.current.innerText = \`$\${numToLocaleString(lastPoint.value)}\`;
    }
  }, [currentPeriod, lastPoint]);
  const handleOnPeriodChanged = useCallback((period: SparklinePeriod) => {
    setCurrentPeriod(period);
    const newData = sparklineInteractiveData[period];
    const newLastPoint = newData[newData.length - 1];
    headerRef.current?.update({
      subHead: generateSubHead(newLastPoint, period, sparklineInteractiveData)
    });
    if (titleRef.current) {
      titleRef.current.innerText = \`$\${numToLocaleString(newLastPoint.value)}\`;
    }
  }, []);
  const RenderedDefaultTitle = <Text as="div" color="fgPrimary" font="title3">
      <span ref={titleRef}>\${numToLocaleString(lastPoint.value)}</span>
    </Text>;
  const header = <SparklineInteractiveHeader ref={headerRef} defaultLabel="Bitcoin Price" defaultSubHead={generateSubHead(lastPoint, currentPeriod, sparklineInteractiveData)} defaultTitle={RenderedDefaultTitle} />;
  return <SparklineInteractive data={sparklineInteractiveData} defaultPeriod={DEFAULT_PERIOD} formatDate={formatDateWithConfig} formatHoverDate={formatHoverDate} headerNode={header} onPeriodChanged={handleOnPeriodChanged} onScrub={handleScrub} onScrubEnd={handleScrubEnd} periods={periods} strokeColor="#F7931A" />;
}`,...y.parameters?.docs?.source}}};const Te=["Default","CustomLabel","Compact","BottomPeriodSelector","AlternatePeriods","CustomTitle"];export{g as AlternatePeriods,H as BottomPeriodSelector,v as Compact,h as CustomLabel,y as CustomTitle,S as Default,Te as __namedExportsOrder,xe as default};
