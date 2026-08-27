import{j as e,R as u,r as i,B as ee}from"./iframe-CsG_6vZR.js";import{s as r,a as re}from"./SparklineInteractiveData-DMKVVxW5.js";import{a as z,S as ae}from"./SparklineInteractiveHeader-B8v3PPmL.js";import{V as te}from"./VStack-Cg_Yq2u4.js";import"./preload-helper-D9Z9MdNV.js";import"./sizing-Do56D2dQ.js";import"./sparkline-Tad7TG6v.js";import"./tokens-BwScSksM.js";import"./debounce-fynzmAtJ.js";import"./getAccessibleColor-PEyO2bJ-.js";import"./Interactable--rqISG90.js";import"./color-Ceo1QMNe.js";import"./useTheme-CmrOhAty.js";import"./d3-interpolate-path-DAdKSvnf.js";import"./noop-BjFrJKj1.js";import"./Lottie-D5e-lD5f.js";import"./useDimensions-BCh0uzfM.js";import"./VisualizationContainer-C3_caBsk.js";import"./identity-5QaRquSq.js";import"./_MapCache-CNwOe-s1.js";import"./Pressable-DDN99tmF.js";import"./isArray-M0ytM-vC.js";import"./eq-CQ4zk1HF.js";import"./keys-BqKPzSSL.js";import"./_isIndex-CqeJT8IS.js";import"./TextLabel2-DIvbC7TV.js";import"./Text-B1CpMNU3.js";import"./toFinite-DQ2cCKl_.js";import"./toNumber-Cud-3KGb.js";import"./isSymbol-Nk1MYqqj.js";import"./HStack-DaDYipoP.js";import"./usePreviousValues-BaYVE0C4.js";import"./TextLabel1-CAueCuNU.js";import"./AccessibilityAnnouncer-DDIw4MOA.js";import"./useMergeRefs-DR4sGa7m.js";const Ge={component:z,title:"Components/SparklineInteractive"},B="day",K=[{label:"1H",value:"hour"},{label:"1D",value:"day"},{label:"1W",value:"week"},{label:"1M",value:"month"},{label:"1Y",value:"year"},{label:"All",value:"all"}],Q=a=>{switch(a){case"hour":case"day":return{hour:"numeric",minute:"numeric"};case"week":case"month":return{month:"numeric",day:"numeric"};case"year":case"all":return{month:"numeric",year:"numeric"};default:return{month:"numeric",day:"numeric"}}},X=a=>{switch(a){case"hour":case"day":case"week":case"month":return{weekday:"short",month:"short",day:"numeric",hour:"numeric",minute:"numeric"};default:return{weekday:"short",year:"numeric",month:"short",day:"numeric"}}};function k(a){return a.toLocaleString("en-US",{maximumFractionDigits:2})}function b(a,p,d){const s=d[p][0],c=a.value>s.value;return{percent:`${k(Math.abs((a.value-s.value)/s.value)*100)}%`,sign:c?"upwardTrend":"downwardTrend",variant:c?"positive":"negative",accessibilityLabel:`on ${new Intl.DateTimeFormat("en-US").format(a?.date)}, ${c?"up":"down"}`,priceChange:`$${k(Math.abs(a.value-s.value))}`}}const n="#F7931A",oe="rgba(123, 1, 1, 5)",ne="rgb(123, 1, 121)",se="auto",t=a=>{const p=i.useMemo(()=>({timeZone:"America/New_York"}),[]),d=i.useCallback((s,c)=>{const U=Q(c);return s.toLocaleString("en-US",{...p,...U})},[p]),S=i.useCallback((s,c)=>s.toLocaleString("en-US",{...p,...X(c)}),[p]);return e.jsx(z,{defaultPeriod:a.defaultPeriod??B,formatDate:d,formatHoverDate:a.hideHoverDate?void 0:S,periods:K,...a})},g=()=>e.jsx(u.StrictMode,{children:e.jsx(t,{data:r,strokeColor:n})});g.bind({});g.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const f=()=>e.jsx(t,{compact:!0,data:r,strokeColor:n});f.bind({});f.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const v=()=>e.jsx(u.StrictMode,{children:e.jsx(te,{borderColor:"bgNegative",borderWidth:100,children:e.jsx(t,{data:r,strokeColor:n})})});v.bind({});v.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const h=()=>e.jsx(t,{disableScrubbing:!0,data:r,strokeColor:n});h.bind({});h.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const C=()=>e.jsx(t,{hidePeriodSelector:!0,data:r,strokeColor:n});C.bind({});C.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const D=()=>e.jsx(t,{data:r,strokeColor:n,yAxisScalingFactor:.1});D.bind({});D.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const y=()=>e.jsx(u.StrictMode,{children:e.jsx(t,{data:r,strokeColor:se})});y.bind({});y.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const P=()=>e.jsx(u.StrictMode,{children:e.jsx(t,{data:r,strokeColor:ne})});P.bind({});P.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const I=()=>e.jsx(u.StrictMode,{children:e.jsx(t,{data:r,strokeColor:oe})});I.bind({});I.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const J=()=>e.jsx(u.StrictMode,{children:e.jsx(t,{data:r,fill:!1,strokeColor:n})});J.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const H=()=>e.jsx(t,{strokeColor:n});H.bind({});H.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const _=()=>e.jsx(t,{fallbackType:"negative",strokeColor:n});_.bind({});_.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const x=()=>e.jsx(t,{compact:!0,strokeColor:n});x.bind({});x.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const ie=a=>`$${a.toLocaleString("en-US")}`,j=()=>e.jsx(t,{fill:!0,data:r,formatHoverPrice:ie,strokeColor:n});j.bind({});j.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const N=()=>e.jsx(t,{fill:!0,hideHoverDate:!0,data:r,strokeColor:n});N.bind({});N.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const R=()=>{const[a,p]=i.useState(B),d=i.useRef(null),S=r[a],s=S[S.length-1],c=i.useMemo(()=>({timeZone:"America/New_York"}),[]),U=i.useCallback((o,l)=>{const m=Q(l);return o.toLocaleString("en-US",{...c,...m})},[c]),G=i.useCallback((o,l)=>o.toLocaleString("en-US",{...c,...X(l)}),[c]),V=i.useCallback(({point:o,period:l})=>{d.current?.update({title:`$${o.value.toLocaleString("en-US")}`,subHead:b(o,l,r)})},[]),Y=i.useCallback(()=>{d.current?.update({title:`$${k(s.value)}`,subHead:b(s,a,r)})},[a,s]),Z=i.useCallback(o=>{p(o);const l=r[o],m=l[l.length-1];d.current?.update({title:`$${k(m.value)}`,subHead:b(m,o,r)})},[]),q=e.jsx(ae,{ref:d,defaultLabel:"Bitcoin Price",defaultSubHead:b(s,a,r),defaultTitle:`$${k(s.value)}`});return e.jsx(z,{data:r,defaultPeriod:B,formatDate:U,formatHoverDate:G,headerNode:q,onPeriodChanged:Z,onScrub:V,onScrubEnd:Y,periods:K,strokeColor:"#F7931A"})};R.bind({});R.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const w=()=>e.jsx(t,{data:r,strokeColor:n,timePeriodGutter:3});w.bind({});w.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const W=()=>e.jsx(t,{data:r,hoverData:re,strokeColor:n});W.bind({});W.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const L=()=>e.jsx(t,{fill:!0,data:r,hoverData:re,strokeColor:n});L.bind({});L.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const F=()=>e.jsx(t,{data:r,periodSelectorPlacement:"below",strokeColor:n});F.bind({});F.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const $=()=>e.jsxs(te,{width:"100%",children:[e.jsx(ee,{width:"100%",children:e.jsx(t,{data:r,strokeColor:n})}),e.jsx(ee,{background:"bgSecondary",height:20,paddingTop:8,width:"100%",children:"This is an element below the sparkline"})]});$.bind({});$.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const M=()=>e.jsx(u.StrictMode,{children:e.jsx(t,{data:{...r,hour:[]},strokeColor:n})});M.bind({});M.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const ce="customPaddingCss-c1ua4kb7",E=()=>{const[a,p]=i.useState(B),d=i.useRef(null),S=r[a],s=S[S.length-1],c=i.useMemo(()=>({timeZone:"America/New_York"}),[]),U=i.useCallback((o,l)=>{const m=Q(l);return o.toLocaleString("en-US",{...c,...m})},[c]),G=i.useCallback((o,l)=>o.toLocaleString("en-US",{...c,...X(l)}),[c]),V=i.useCallback(({point:o,period:l})=>{d.current?.update({title:`$${o.value.toLocaleString("en-US")}`,subHead:b(o,l,r)})},[]),Y=i.useCallback(()=>{d.current?.update({title:`$${k(s.value)}`,subHead:b(s,a,r)})},[a,s]),Z=i.useCallback(o=>{p(o);const l=r[o],m=l[l.length-1];d.current?.update({title:`$${k(m.value)}`,subHead:b(m,o,r)})},[]),q=e.jsx(ae,{ref:d,defaultLabel:"Bitcoin Price",defaultSubHead:b(s,a,r),defaultTitle:`$${k(s.value)}`});return e.jsx(z,{classNames:{root:ce},data:r,defaultPeriod:B,formatDate:U,formatHoverDate:G,headerNode:q,onPeriodChanged:Z,onScrub:V,onScrubEnd:Y,periods:K,strokeColor:"#F7931A",styles:{header:{paddingLeft:0,paddingRight:0}}})};E.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const T=()=>e.jsx(u.StrictMode,{children:e.jsx(t,{data:r,fillType:"dotted",strokeColor:n})});T.bind({});T.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const O=()=>e.jsx(u.StrictMode,{children:e.jsx(t,{data:r,fillType:"dotted",strokeColor:n,yAxisScalingFactor:.1})});O.bind({});O.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const le="centeredContainerCss-cvhitdr",de="narrowSparklineCss-nuqmmkx",A=()=>e.jsx(u.StrictMode,{children:e.jsx("div",{className:le,children:e.jsx("div",{className:de,children:e.jsx(t,{data:r,strokeColor:n})})})});A.bind({});A.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};g.__docgenInfo={description:"",methods:[],displayName:"Default"};f.__docgenInfo={description:"",methods:[],displayName:"Compact"};v.__docgenInfo={description:"",methods:[],displayName:"Contained"};h.__docgenInfo={description:"",methods:[],displayName:"DisableScrubbing"};C.__docgenInfo={description:"",methods:[],displayName:"HidePeriodSelector"};D.__docgenInfo={description:"",methods:[],displayName:"yAxisScaling"};y.__docgenInfo={description:"",methods:[],displayName:"AutoStrokeColor"};P.__docgenInfo={description:"",methods:[],displayName:"CustomRGBStrokeColor"};I.__docgenInfo={description:"",methods:[],displayName:"CustomRGBAStrokeColor"};J.__docgenInfo={description:"",methods:[],displayName:"FillDisabled"};H.__docgenInfo={description:"",methods:[],displayName:"FallbackPositive"};_.__docgenInfo={description:"",methods:[],displayName:"FallbackNegative"};x.__docgenInfo={description:"",methods:[],displayName:"FallbackCompact"};j.__docgenInfo={description:"",methods:[],displayName:"HoverPrice"};N.__docgenInfo={description:"",methods:[],displayName:"NoHoverDate"};R.__docgenInfo={description:"",methods:[],displayName:"WithHeaderNode"};w.__docgenInfo={description:"",methods:[],displayName:"TimePeriodGutter"};W.__docgenInfo={description:"",methods:[],displayName:"HoverData"};L.__docgenInfo={description:"",methods:[],displayName:"HoverDataWithFill"};F.__docgenInfo={description:"",methods:[],displayName:"BottomPeriodSelector"};$.__docgenInfo={description:"",methods:[],displayName:"VStackedSparkline"};M.__docgenInfo={description:"",methods:[],displayName:"NoDataInSelectedPeriod"};E.__docgenInfo={description:"",methods:[],displayName:"WithCustomStyles"};T.__docgenInfo={description:"",methods:[],displayName:"DottedFillType"};O.__docgenInfo={description:"",methods:[],displayName:"YScaleCustom"};A.__docgenInfo={description:"",methods:[],displayName:"CenteredNarrowOnWideScreen"};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => <React.StrictMode>
    <SparklineInteractiveWrapper data={sparklineInteractiveData} strokeColor={strokeColor} />
  </React.StrictMode>`,...g.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:"() => <SparklineInteractiveWrapper compact data={sparklineInteractiveData} strokeColor={strokeColor} />",...f.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`() => <React.StrictMode>
    <VStack borderColor="bgNegative" borderWidth={100}>
      <SparklineInteractiveWrapper data={sparklineInteractiveData} strokeColor={strokeColor} />
    </VStack>
  </React.StrictMode>`,...v.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:"() => <SparklineInteractiveWrapper disableScrubbing data={sparklineInteractiveData} strokeColor={strokeColor} />",...h.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:"() => <SparklineInteractiveWrapper hidePeriodSelector data={sparklineInteractiveData} strokeColor={strokeColor} />",...C.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:"() => <SparklineInteractiveWrapper data={sparklineInteractiveData} strokeColor={strokeColor} yAxisScalingFactor={0.1} />",...D.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => <React.StrictMode>
    <SparklineInteractiveWrapper data={sparklineInteractiveData} strokeColor={autoStrokeColor} />
  </React.StrictMode>`,...y.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`() => <React.StrictMode>
    <SparklineInteractiveWrapper data={sparklineInteractiveData} strokeColor={rgbStrokeColor} />
  </React.StrictMode>`,...P.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`() => <React.StrictMode>
    <SparklineInteractiveWrapper data={sparklineInteractiveData} strokeColor={rgbaStrokeColor} />
  </React.StrictMode>`,...I.parameters?.docs?.source}}};J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`() => <React.StrictMode>
    <SparklineInteractiveWrapper data={sparklineInteractiveData} fill={false} strokeColor={strokeColor} />
  </React.StrictMode>`,...J.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:"() => <SparklineInteractiveWrapper strokeColor={strokeColor} />",...H.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:'() => <SparklineInteractiveWrapper fallbackType="negative" strokeColor={strokeColor} />',..._.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:"() => <SparklineInteractiveWrapper compact strokeColor={strokeColor} />",...x.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`() => {
  return <SparklineInteractiveWrapper fill data={sparklineInteractiveData} formatHoverPrice={formatHoverPrice} strokeColor={strokeColor} />;
}`,...j.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:"() => <SparklineInteractiveWrapper fill hideHoverDate data={sparklineInteractiveData} strokeColor={strokeColor} />",...N.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`() => {
  const [currentPeriod, setCurrentPeriod] = useState<SparklinePeriod>(DEFAULT_PERIOD);
  const headerRef = useRef<SparklineInteractiveHeaderRef>(null);
  const data = sparklineInteractiveData[currentPeriod];
  const lastPoint = data[data.length - 1];
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
      title: \`$\${point.value.toLocaleString('en-US')}\`,
      subHead: generateSubHead(point, period, sparklineInteractiveData)
    });
  }, []);
  const handleScrubEnd = useCallback(() => {
    headerRef.current?.update({
      title: \`$\${numToLocaleString(lastPoint.value)}\`,
      subHead: generateSubHead(lastPoint, currentPeriod, sparklineInteractiveData)
    });
  }, [currentPeriod, lastPoint]);
  const handleOnPeriodChanged = useCallback((period: SparklinePeriod) => {
    setCurrentPeriod(period);
    const newData = sparklineInteractiveData[period];
    const newLastPoint = newData[newData.length - 1];
    headerRef.current?.update({
      title: \`$\${numToLocaleString(newLastPoint.value)}\`,
      subHead: generateSubHead(newLastPoint, period, sparklineInteractiveData)
    });
  }, []);
  const header = <SparklineInteractiveHeader ref={headerRef} defaultLabel="Bitcoin Price" defaultSubHead={generateSubHead(lastPoint, currentPeriod, sparklineInteractiveData)} defaultTitle={\`$\${numToLocaleString(lastPoint.value)}\`} />;
  return <SparklineInteractive data={sparklineInteractiveData} defaultPeriod={DEFAULT_PERIOD} formatDate={formatDateWithConfig} formatHoverDate={formatHoverDate} headerNode={header} onPeriodChanged={handleOnPeriodChanged} onScrub={handleScrub} onScrubEnd={handleScrubEnd} periods={periods} strokeColor="#F7931A" />;
}`,...R.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`() => {
  return <SparklineInteractiveWrapper data={sparklineInteractiveData} strokeColor={strokeColor} timePeriodGutter={3} />;
}`,...w.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`() => {
  return <SparklineInteractiveWrapper data={sparklineInteractiveData} hoverData={sparklineInteractiveHoverData} strokeColor={strokeColor} />;
}`,...W.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`() => {
  return <SparklineInteractiveWrapper fill data={sparklineInteractiveData} hoverData={sparklineInteractiveHoverData} strokeColor={strokeColor} />;
}`,...L.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`() => {
  return <SparklineInteractiveWrapper data={sparklineInteractiveData} periodSelectorPlacement="below" strokeColor={strokeColor} />;
}`,...F.parameters?.docs?.source}}};$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`() => {
  return <VStack width="100%">
      <Box width="100%">
        <SparklineInteractiveWrapper data={sparklineInteractiveData} strokeColor={strokeColor} />
      </Box>
      <Box background="bgSecondary" height={20} paddingTop={8} width="100%">
        This is an element below the sparkline
      </Box>
    </VStack>;
}`,...$.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`() => {
  return <React.StrictMode>
      <SparklineInteractiveWrapper data={{
      ...sparklineInteractiveData,
      hour: []
    }} strokeColor={strokeColor} />
    </React.StrictMode>;
}`,...M.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`() => {
  const [currentPeriod, setCurrentPeriod] = useState<SparklinePeriod>(DEFAULT_PERIOD);
  const headerRef = useRef<SparklineInteractiveHeaderRef>(null);
  const data = sparklineInteractiveData[currentPeriod];
  const lastPoint = data[data.length - 1];
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
      title: \`$\${point.value.toLocaleString('en-US')}\`,
      subHead: generateSubHead(point, period, sparklineInteractiveData)
    });
  }, []);
  const handleScrubEnd = useCallback(() => {
    headerRef.current?.update({
      title: \`$\${numToLocaleString(lastPoint.value)}\`,
      subHead: generateSubHead(lastPoint, currentPeriod, sparklineInteractiveData)
    });
  }, [currentPeriod, lastPoint]);
  const handleOnPeriodChanged = useCallback((period: SparklinePeriod) => {
    setCurrentPeriod(period);
    const newData = sparklineInteractiveData[period];
    const newLastPoint = newData[newData.length - 1];
    headerRef.current?.update({
      title: \`$\${numToLocaleString(newLastPoint.value)}\`,
      subHead: generateSubHead(newLastPoint, period, sparklineInteractiveData)
    });
  }, []);
  const header = <SparklineInteractiveHeader ref={headerRef} defaultLabel="Bitcoin Price" defaultSubHead={generateSubHead(lastPoint, currentPeriod, sparklineInteractiveData)} defaultTitle={\`$\${numToLocaleString(lastPoint.value)}\`} />;
  return <SparklineInteractive classNames={{
    root: customPaddingCss
  }} data={sparklineInteractiveData} defaultPeriod={DEFAULT_PERIOD} formatDate={formatDateWithConfig} formatHoverDate={formatHoverDate} headerNode={header} onPeriodChanged={handleOnPeriodChanged} onScrub={handleScrub} onScrubEnd={handleScrubEnd} periods={periods} strokeColor="#F7931A" styles={{
    header: {
      paddingLeft: 0,
      paddingRight: 0
    }
  }} />;
}`,...E.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`() => <React.StrictMode>
    <SparklineInteractiveWrapper data={sparklineInteractiveData} fillType="dotted" strokeColor={strokeColor} />
  </React.StrictMode>`,...T.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`() => <React.StrictMode>
    <SparklineInteractiveWrapper data={sparklineInteractiveData} fillType="dotted" strokeColor={strokeColor} yAxisScalingFactor={0.1} />
  </React.StrictMode>`,...O.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`() => <React.StrictMode>
    <div className={centeredContainerCss}>
      <div className={narrowSparklineCss}>
        <SparklineInteractiveWrapper data={sparklineInteractiveData} strokeColor={strokeColor} />
      </div>
    </div>
  </React.StrictMode>`,...A.parameters?.docs?.source}}};const Ve=["Default","Compact","Contained","DisableScrubbing","HidePeriodSelector","yAxisScaling","AutoStrokeColor","CustomRGBStrokeColor","CustomRGBAStrokeColor","FillDisabled","FallbackPositive","FallbackNegative","FallbackCompact","HoverPrice","NoHoverDate","WithHeaderNode","TimePeriodGutter","HoverData","HoverDataWithFill","BottomPeriodSelector","VStackedSparkline","NoDataInSelectedPeriod","WithCustomStyles","DottedFillType","YScaleCustom","CenteredNarrowOnWideScreen"];export{y as AutoStrokeColor,F as BottomPeriodSelector,A as CenteredNarrowOnWideScreen,f as Compact,v as Contained,I as CustomRGBAStrokeColor,P as CustomRGBStrokeColor,g as Default,h as DisableScrubbing,T as DottedFillType,x as FallbackCompact,_ as FallbackNegative,H as FallbackPositive,J as FillDisabled,C as HidePeriodSelector,W as HoverData,L as HoverDataWithFill,j as HoverPrice,M as NoDataInSelectedPeriod,N as NoHoverDate,w as TimePeriodGutter,$ as VStackedSparkline,E as WithCustomStyles,R as WithHeaderNode,O as YScaleCustom,Ve as __namedExportsOrder,Ge as default,D as yAxisScaling};
