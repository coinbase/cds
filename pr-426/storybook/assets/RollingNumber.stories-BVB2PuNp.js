import{r as l,j as e}from"./iframe-BXWLBCkp.js";import{d as y,c as M}from"./tokens-BwScSksM.js";import{B as m}from"./Button-W9Shg4T1.js";import{V as i}from"./VStack-CnEfMFeL.js";import{T as a}from"./Text-Ch_dBU4v.js";import{P as se}from"./ProgressBar-BsXln_3w.js";import{R as t}from"./DefaultRollingNumberDigit-slxtsTlh.js";import{H as x}from"./HStack-B6p8qBpp.js";import{I as p}from"./Icon-CgDQ3NQp.js";import{I as _}from"./IconButton-OIX0AFCz.js";import"./preload-helper-D9Z9MdNV.js";import"./Spinner-BAI0lrZ-.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./useTheme-BJazYlse.js";import"./useProgressSize-CemUcfxL.js";import"./usePreviousValues-rLMWE3mU.js";import"./useMotionProps-CS-LE6l8.js";import"./utils-CwomCnHN.js";import"./isRtl-Du0XdnX5.js";import"./motion-minimal-SVRWJYUW.js";import"./LocaleProvider-BsopcHeG.js";import"./animate-Ctc6D7xG.js";import"./use-animation-CYeuSrS_.js";const Re={title:"Components/RollingNumber",component:t},S=()=>{const[o,n]=l.useState(12345.67),[r,c]=l.useState(0),u=()=>n(f=>{const b=(Math.random()-.5)*200,F=Math.max(0,f+b),V=Math.round(F*100)/100;return c(V-f),V}),d=r>=0?"fgPositive":"fgNegative";return e.jsxs(i,{gap:2,children:[e.jsx(a,{font:"label1",children:"Basic example"}),e.jsx(t,{format:{minimumFractionDigits:2,maximumFractionDigits:2},value:o}),e.jsx(a,{font:"label1",children:"Portfolio Balance"}),e.jsx(t,{colorPulseOnUpdate:!0,font:"display3",format:{style:"currency",currency:"USD"},value:o}),e.jsx(x,{alignItems:"center",children:e.jsx(t,{accessibilityLabelPrefix:r>0?"up ":r<0?"down ":"",color:d,font:"body",format:{style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:2},prefix:r>=0?e.jsx(p,{color:d,name:"diagonalUpArrow",size:"xs"}):e.jsx(p,{color:d,name:"diagonalDownArrow",size:"xs"}),styles:{prefix:{paddingRight:"var(--space-1)"}},suffix:`(${(Math.abs(r)/o*100).toFixed(2)}%)`,value:Math.abs(r)})}),e.jsx(a,{font:"label1",children:"BTC Conversion"}),e.jsxs(x,{alignItems:"center",gap:1,children:[e.jsx(p,{color:"fgPrimary",name:"arrowsVertical",size:"xs",testID:"swap-icon"}),e.jsx(t,{color:"fgPrimary",fontFamily:"body",fontSize:"body",fontWeight:"body",format:{minimumFractionDigits:8,maximumFractionDigits:8},value:o/15e4})]}),e.jsx(m,{onClick:u,children:"Next"})]})},h=()=>{const[o,n]=l.useState(9876.54),r=()=>n(c=>Math.max(0,Math.round((c+(Math.random()-.5)*100)*100)/100));return e.jsxs(i,{gap:2,children:[e.jsx(a,{font:"label1",children:"Font sizes, weights, and line heights"}),e.jsx(t,{fontSize:"display3",fontWeight:"title3",format:{style:"currency",currency:"USD"},value:o}),e.jsx(t,{fontSize:"title3",fontWeight:"headline",format:{style:"currency",currency:"USD"},value:o}),e.jsx(t,{fontSize:"body",fontWeight:"body",format:{style:"currency",currency:"USD"},lineHeight:"display3",value:o}),e.jsx(a,{font:"label1",children:"Responsive font (phone, tablet, desktop)"}),e.jsx(t,{font:{phone:"body",tablet:"title3",desktop:"display3"},format:{style:"currency",currency:"USD"},value:o}),e.jsx(a,{font:"label1",children:"Tabular numbers vs non-tabular numbers"}),e.jsx(t,{font:"display3",format:{style:"currency",currency:"USD"},value:o}),e.jsx(t,{font:"display3",format:{style:"currency",currency:"USD"},tabularNumbers:!1,value:o}),e.jsx(m,{onClick:r,children:"Next"})]})},v=()=>{const[o,n]=l.useState(555.55),r=()=>n(c=>Math.max(0,Math.round((c+(Math.random()-.5)*50)*100)/100));return e.jsxs(i,{gap:2,children:[e.jsx(a,{font:"label1",children:"Color pulse and custom transition"}),e.jsx(t,{colorPulseOnUpdate:!0,font:"title1",format:{style:"currency",currency:"USD"},transition:{color:{duration:y.moderate3/1e3,ease:"easeInOut"},y:{duration:y.moderate3/1e3,ease:"easeIn"}},value:o}),e.jsx(t,{colorPulseOnUpdate:!0,color:"accentBoldBlue",font:"title1",format:{style:"currency",currency:"USD"},transition:{color:{duration:y.slow4/1e3,ease:"easeInOut"},y:{duration:y.slow4/1e3,ease:"easeIn"}},value:o}),e.jsx(a,{font:"label1",children:"Customize positive and negative change colors"}),e.jsx(t,{colorPulseOnUpdate:!0,font:"title1",negativePulseColor:"bgWarning",positivePulseColor:"fgPrimary",value:o}),e.jsx(a,{font:"label1",children:"Fast digits, slow color"}),e.jsx(t,{colorPulseOnUpdate:!0,font:"title1",format:{style:"currency",currency:"USD"},transition:{y:{duration:y.fast1/1e3,ease:M.enterFunctional},color:{duration:5,ease:M.global}},value:o}),e.jsx(a,{font:"label1",children:"Springy digits"}),e.jsx(t,{colorPulseOnUpdate:!0,font:"title1",format:{style:"currency",currency:"USD"},transition:{y:{type:"spring",stiffness:1e3,damping:24,mass:3}},value:o}),e.jsx(a,{font:"label1",children:"Custom easings"}),e.jsx(t,{colorPulseOnUpdate:!0,font:"title1",format:{style:"currency",currency:"USD"},transition:{y:{duration:y.moderate2/1e3,ease:M.enterExpressive},color:{duration:y.slow1/1e3,ease:M.exitFunctional}},value:o}),e.jsx(m,{onClick:r,children:"Next"})]})},j=()=>e.jsxs(i,{gap:2,children:[e.jsx(a,{font:"label1",children:"Polymorphism"}),e.jsx(t,{as:"h1",format:{style:"currency",currency:"USD"},value:12345.67}),e.jsx(t,{as:"p",format:{style:"currency",currency:"USD"},value:12345.67})]}),H=()=>{const o=[98345.67,91345.67,123450.123,123451288e-2],n=["+","-",""],r=[" BTC"," ETH",""],c=[e.jsx(p,{name:"arrowUp",size:"l"},"arrowUp"),e.jsx(p,{name:"arrowDown",size:"l"},"arrowDown"),e.jsx(p,{name:"arrowDown",size:"l"},"arrowDown")],u=[e.jsx(p,{name:"arrowDown",size:"l"},"arrowDown"),e.jsx(p,{name:"arrowUp",size:"l"},"arrowUp"),null],[d,f]=l.useState(0),b=()=>{f((d+1)%o.length)};return{value:o[d],prefix:n[d],suffix:r[d],iconPrefix:c[d],iconSuffix:u[d],onNext:b}},D=()=>{const{value:o,onNext:n}=H(),r={style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:5,notation:"compact"};return e.jsxs(i,{gap:2,children:[e.jsx(a,{font:"label1",children:"Compact number with currency sign"}),e.jsx(t,{font:"display1",format:r,value:o}),e.jsx(a,{font:"label1",children:"Number without grouping"}),e.jsx(t,{font:"display1",format:{useGrouping:!1},value:o}),e.jsx(m,{onClick:n,children:"Next"})]})},k=()=>{const{value:o,prefix:n,suffix:r,iconPrefix:c,iconSuffix:u,onNext:d}=H(),f={style:"currency",currency:"USD",minimumFractionDigits:2,maximumFractionDigits:5};return e.jsxs(i,{gap:2,children:[e.jsx(a,{font:"label1",children:"Simple text prefix and suffix"}),e.jsx(t,{colorPulseOnUpdate:!0,font:"display1",format:f,prefix:"+",suffix:" BTC",value:o}),e.jsx(a,{font:"label1",children:"Dynamic prefix and suffix"}),e.jsx(t,{colorPulseOnUpdate:!0,font:"display1",format:f,prefix:n,suffix:r,value:o}),e.jsx(a,{font:"label1",children:"ReactNode prefix and suffix"}),e.jsx(t,{colorPulseOnUpdate:!0,font:"display1",format:f,prefix:c,suffix:u,value:o}),e.jsx(m,{onClick:d,children:"Next"})]})},P=()=>{const[o,n]=l.useState(12345.67),r=()=>n(c=>Math.max(0,Math.round((c+(Math.random()-.5)*200)*100)/100));return e.jsxs(i,{gap:2,children:[e.jsx(a,{font:"label1",children:"Style overrides per section"}),e.jsx(t,{colorPulseOnUpdate:!0,font:"display1",format:{style:"currency",currency:"USD",minimumFractionDigits:2,notation:"compact"},prefix:"-",styles:{root:{border:"1px dashed var(--color-bgLine)",padding:"4px 8px",borderRadius:8,background:"var(--color-bgSecondaryWash)"},i18nPrefix:{color:"var(--color-accentBoldBlue)"},prefix:{color:"rgb(var(--purple50))"},integer:{letterSpacing:"-1px"},fraction:{opacity:.2,letterSpacing:"10px"},i18nSuffix:{color:"var(--color-accentBoldRed)"},suffix:{color:"var(--color-accentBoldYellow)",marginLeft:10}},suffix:"BTC",value:o}),e.jsx(m,{onClick:r,children:"Next"})]})},ce=["display1","display2","display3","title1","title2","title3","title4","headline","body","label1","label2","caption","legal"],T=()=>{const o=[1e-10,9e-5,12e-6,1e-7,1e-9,11e-24],[n,r]=l.useState(0),c=()=>r((n+1)%o.length),u=o[n],d={minimumFractionDigits:2,maximumFractionDigits:25};return e.jsxs(i,{gap:1,children:[e.jsx(a,{font:"label1",children:"Subscript for small decimals"}),e.jsx(a,{as:"span",font:"label2",children:"Default:"}),e.jsx(t,{font:"display3",format:d,value:u}),e.jsx(a,{as:"span",font:"label2",children:"With subscript:"}),ce.map(f=>e.jsx(t,{enableSubscriptNotation:!0,font:f,format:d,value:u},f)),e.jsx(m,{onClick:c,children:"Next"})]})},C=()=>{const o=[{value:98765.43,formattedValue:"¥98,765.43 BTC"},{value:931.42,formattedValue:"$931.42 BTC"},{value:100890.56,formattedValue:"¥100,890.56 BTC"},{value:149432.12,formattedValue:"¥149,432.12 BTC"},{value:150321.23,formattedValue:"¥150,321.23 BTC"}],n=[{value:1e-10,formattedValue:"€0,0₉1",accessibilityLabel:"€0.0000000001"},{value:9e-5,formattedValue:"€0,0₄9",accessibilityLabel:"€0.00009"},{value:12e-6,formattedValue:"€0,0₄12",accessibilityLabel:"€0.000012"},{value:1e-7,formattedValue:"€0,0₆1",accessibilityLabel:"€0.0000001"},{value:11e-24,formattedValue:"€0,0₂₂11",accessibilityLabel:"€0.000000000000000000000011"}],[r,c]=l.useState(0),u=()=>c((r+1)%5);return e.jsxs(i,{gap:1,children:[e.jsx(a,{font:"label1",children:"User provided formatted value"}),e.jsx(a,{font:"label2",children:"BTC prices"}),e.jsx(t,{colorPulseOnUpdate:!0,font:"display3",formattedValue:o[r].formattedValue,prefix:e.jsx(p,{name:"crypto",size:"l"}),value:o[r].value}),e.jsx(a,{font:"label2",children:"Subscripts with comma as decimal separator"}),e.jsx(t,{colorPulseOnUpdate:!0,accessibilityLabel:n[r].accessibilityLabel,font:"display3",formattedValue:n[r].formattedValue,value:n[r].value}),e.jsx(m,{onClick:u,children:"Next"})]})},N=()=>e.jsxs(i,{gap:2,children:[e.jsx(a,{font:"label1",children:"Override screen reader label (compact notation)"}),e.jsx(t,{accessibilityLabel:"1,230 followers",font:"display3",formattedValue:"1.23K",suffix:" followers",value:1230}),e.jsx(a,{font:"label1",children:"Prefix/Suffix for screen readers (basis points)"}),e.jsx(t,{accessibilityLabelPrefix:"down ",accessibilityLabelSuffix:" likes",font:"body",prefix:e.jsx(p,{name:"arrowDown",size:"s"}),suffix:e.jsx(p,{name:"heart",size:"s"}),value:25})]}),B=()=>{const[o,n]=l.useState(12345.67),r=()=>n(u=>Math.round((u+Math.random()*100)*100)/100),c=()=>n(u=>Math.max(0,Math.round((u-Math.random()*100)*100)/100));return e.jsxs(i,{gap:3,children:[e.jsx(t,{colorPulseOnUpdate:!0,digitTransitionVariant:"single",font:"display1",format:{style:"currency",currency:"USD"},value:o}),e.jsxs(x,{gap:2,children:[e.jsx(m,{onClick:r,children:"Increase"}),e.jsx(m,{onClick:c,children:"Decrease"})]}),e.jsxs(x,{gap:4,children:[e.jsxs(i,{gap:1,children:[e.jsx(a,{color:"fgMuted",font:"caption",children:"Every (default)"}),e.jsx(t,{colorPulseOnUpdate:!0,font:"title1",format:{style:"currency",currency:"USD"},value:o})]}),e.jsxs(i,{gap:1,children:[e.jsx(a,{color:"fgMuted",font:"caption",children:"Single"}),e.jsx(t,{colorPulseOnUpdate:!0,digitTransitionVariant:"single",font:"title1",format:{style:"currency",currency:"USD"},value:o})]})]})]})},U=()=>{const[o,n]=l.useState(0),r=s=>String(s).padStart(2,"0"),c=300,[u,d]=l.useState(c),[f,b]=l.useState(!1);l.useEffect(()=>{if(!f)return;const s=setInterval(()=>{d(g=>g<=1?0:g-1)},1e3);return()=>clearInterval(s)},[f]);const F=Math.floor(u/60),V=u%60,$=`${r(F)}:${r(V)}`,A=()=>d(c),O=Math.max(0,Math.min(1,(c-u)/c)),[R,E]=l.useState(!1),L=R?199:19,z=R?"/yr":"/mo",[W,Y]=l.useState(1234567),[G,K]=l.useState(89432),[q,J]=l.useState(12789),[Q,X]=l.useState(567890),Z=()=>{Y(s=>s+Math.floor(Math.random()*1e3)),K(s=>s+Math.floor(Math.random()*200)),J(s=>s+Math.floor(Math.random()*100)),X(s=>s+Math.floor(Math.random()*500))},[ee,te]=l.useState(45e3),[oe,ae]=l.useState(23),[w,re]=l.useState(180);l.useEffect(()=>{const s=setInterval(()=>re(g=>Math.max(0,g-1)),1e3);return()=>clearInterval(s)},[]);const I=s=>{te(g=>g+s),ae(g=>g+1)},ne=Math.floor(w/60),ie=w%60;return e.jsxs(i,{gap:3,children:[e.jsxs(i,{gap:1,children:[e.jsx(a,{font:"label1",children:"Counter"}),e.jsxs(x,{alignItems:"center",gap:2,children:[e.jsx(_,{name:"minus",onClick:()=>n(s=>Math.max(0,s-1))}),e.jsx(t,{colorPulseOnUpdate:!0,font:"display1",format:{minimumFractionDigits:0,maximumFractionDigits:0},value:o}),e.jsx(_,{name:"add",onClick:()=>n(s=>s+1)})]})]}),e.jsxs(i,{gap:1,children:[e.jsx(a,{font:"label1",children:"Countdown clock"}),e.jsx(t,{ariaLive:"off",font:"display3",formattedValue:$,value:u}),e.jsxs(x,{gap:2,children:[e.jsx(m,{onClick:()=>b(s=>!s),children:f?"Pause":"Start"}),e.jsx(m,{onClick:A,children:"Reset"})]}),e.jsx(a,{font:"label1",children:"Countdown with percent"}),e.jsxs(i,{gap:1,children:[e.jsx(se,{progress:O}),e.jsx(t,{ariaLive:"off",font:"body",format:{style:"percent",maximumFractionDigits:0},prefix:"Elapsed: ",value:O})]})]}),e.jsxs(i,{gap:1,children:[e.jsx(t,{colorPulseOnUpdate:!0,accessibilityLabel:`$${L} ${z==="/yr"?"yearly":"monthly"}`,font:"display1",format:{style:"currency",currency:"USD",minimumFractionDigits:0,maximumFractionDigits:0},styles:{suffix:{position:"relative",top:"var(--space-1_5)",color:"var(--color-fgMuted)",fontSize:"var(--fontSize-title1)"}},suffix:z,transition:{y:{type:"spring",stiffness:80,damping:24,mass:3}},value:L}),e.jsx(x,{gap:2,children:e.jsx(m,{onClick:()=>E(s=>!s),children:R?"Switch to monthly":"Switch to yearly"})})]}),e.jsxs(i,{gap:2,children:[e.jsx(a,{font:"label1",children:"Social Media Statistics"}),e.jsxs(x,{gap:4,children:[e.jsxs(i,{alignItems:"center",gap:.5,children:[e.jsx(t,{colorPulseOnUpdate:!0,font:"title1",format:{notation:"compact",maximumFractionDigits:1,minimumFractionDigits:1},positivePulseColor:"accentBoldBlue",value:W}),e.jsx(a,{color:"fgMuted",font:"caption",children:"Views"})]}),e.jsxs(i,{alignItems:"center",gap:.5,children:[e.jsx(t,{colorPulseOnUpdate:!0,font:"title1",format:{notation:"compact",maximumFractionDigits:1,minimumFractionDigits:1},positivePulseColor:"accentBoldRed",prefix:e.jsx(p,{color:"accentBoldRed",name:"heart"}),styles:{prefix:{paddingRight:"var(--space-0_5)"}},value:G}),e.jsx(a,{color:"fgMuted",font:"caption",children:"Likes"})]}),e.jsxs(i,{alignItems:"center",gap:.5,children:[e.jsx(t,{colorPulseOnUpdate:!0,font:"title1",format:{notation:"compact",maximumFractionDigits:1,minimumFractionDigits:1},positivePulseColor:"accentBoldGreen",value:q}),e.jsx(a,{color:"fgMuted",font:"caption",children:"Shares"})]}),e.jsxs(i,{alignItems:"center",gap:.5,children:[e.jsx(t,{colorPulseOnUpdate:!0,font:"title1",format:{notation:"compact",maximumFractionDigits:1,minimumFractionDigits:1},positivePulseColor:"accentBoldPurple",value:Q}),e.jsx(a,{color:"fgMuted",font:"caption",children:"Downloads"})]})]}),e.jsx(m,{onClick:Z,children:"Simulate Activity"})]}),e.jsxs(i,{gap:1,children:[e.jsx(a,{color:"fgMuted",font:"caption",children:"Current Bid"}),e.jsx(t,{colorPulseOnUpdate:!0,font:"display2",format:{style:"currency",currency:"USD",minimumFractionDigits:0},positivePulseColor:"accentBoldRed",transition:{y:{type:"spring",stiffness:200,damping:20}},value:ee}),e.jsxs(x,{gap:1,children:[e.jsx(t,{ariaLive:"off",font:"body",format:{minimumFractionDigits:0},value:oe}),e.jsx(a,{font:"body",children:"bids placed"}),e.jsx(a,{color:"fgMuted",font:"body",children:"•"}),e.jsx(t,{ariaLive:"off",color:w<30?"fgNegative":"fg",font:"body",formattedValue:`${ne}:${String(ie).padStart(2,"0")}`,value:w}),e.jsx(a,{font:"body",children:"remaining"})]}),e.jsxs(x,{gap:1,children:[e.jsx(m,{onClick:()=>I(100),children:"+$100"}),e.jsx(m,{onClick:()=>I(500),children:"+$500"}),e.jsx(m,{onClick:()=>I(1e3),children:"+$1000"})]})]})]})};S.__docgenInfo={description:"",methods:[],displayName:"Examples"};h.__docgenInfo={description:"",methods:[],displayName:"FontCustomization"};v.__docgenInfo={description:"",methods:[],displayName:"ColorAndTransition"};j.__docgenInfo={description:"",methods:[],displayName:"Polymorphism"};D.__docgenInfo={description:"",methods:[],displayName:"Format"};k.__docgenInfo={description:"",methods:[],displayName:"PrefixAndSuffix"};P.__docgenInfo={description:"",methods:[],displayName:"StyleOverrides"};T.__docgenInfo={description:"",methods:[],displayName:"Subscript"};C.__docgenInfo={description:"",methods:[],displayName:"UserProvidedFormattedValue"};N.__docgenInfo={description:"",methods:[],displayName:"Accessibility"};B.__docgenInfo={description:"",methods:[],displayName:"SingleTransition"};U.__docgenInfo={description:"",methods:[],displayName:"Fun"};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => {
  const [price, setPrice] = useState<number>(12345.67);
  const [difference, setDifference] = useState<number>(0);
  const onNext = () => setPrice(p => {
    const delta = (Math.random() - 0.5) * 200; // +/- 100
    const next = Math.max(0, p + delta);
    const newPrice = Math.round(next * 100) / 100;
    setDifference(newPrice - p);
    return newPrice;
  });
  const trendColor = difference >= 0 ? 'fgPositive' : 'fgNegative';
  return <VStack gap={2}>
      <Text font="label1">Basic example</Text>
      <RollingNumber format={{
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }} value={price} />
      <Text font="label1">Portfolio Balance</Text>
      <RollingNumber colorPulseOnUpdate font="display3" format={{
      style: 'currency',
      currency: 'USD'
    }} value={price} />
      <HStack alignItems="center">
        <RollingNumber accessibilityLabelPrefix={difference > 0 ? 'up ' : difference < 0 ? 'down ' : ''} color={trendColor} font="body" format={{
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }} prefix={difference >= 0 ? <Icon color={trendColor} name="diagonalUpArrow" size="xs" /> : <Icon color={trendColor} name="diagonalDownArrow" size="xs" />} styles={{
        prefix: {
          paddingRight: 'var(--space-1)'
        }
      }} suffix={\`(\${(Math.abs(difference) / price * 100).toFixed(2)}%)\`} value={Math.abs(difference)} />
      </HStack>
      <Text font="label1">BTC Conversion</Text>
      <HStack alignItems="center" gap={1}>
        <Icon color="fgPrimary" name="arrowsVertical" size="xs" testID="swap-icon" />
        <RollingNumber color="fgPrimary" fontFamily="body" fontSize="body" fontWeight="body" format={{
        minimumFractionDigits: 8,
        maximumFractionDigits: 8
      }} value={price / 150_000} />
      </HStack>
      <Button onClick={onNext}>Next</Button>
    </VStack>;
}`,...S.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => {
  const [price, setPrice] = useState<number>(9876.54);
  const onNext = () => setPrice(p => Math.max(0, Math.round((p + (Math.random() - 0.5) * 100) * 100) / 100));
  return <VStack gap={2}>
      <Text font="label1">Font sizes, weights, and line heights</Text>
      <RollingNumber fontSize="display3" fontWeight="title3" format={{
      style: 'currency',
      currency: 'USD'
    }} value={price} />
      <RollingNumber fontSize="title3" fontWeight="headline" format={{
      style: 'currency',
      currency: 'USD'
    }} value={price} />
      <RollingNumber fontSize="body" fontWeight="body" format={{
      style: 'currency',
      currency: 'USD'
    }} lineHeight="display3" value={price} />
      <Text font="label1">Responsive font (phone, tablet, desktop)</Text>
      <RollingNumber font={{
      phone: 'body',
      tablet: 'title3',
      desktop: 'display3'
    }} format={{
      style: 'currency',
      currency: 'USD'
    }} value={price} />
      <Text font="label1">Tabular numbers vs non-tabular numbers</Text>
      <RollingNumber font="display3" format={{
      style: 'currency',
      currency: 'USD'
    }} value={price} />
      <RollingNumber font="display3" format={{
      style: 'currency',
      currency: 'USD'
    }} tabularNumbers={false} value={price} />
      <Button onClick={onNext}>Next</Button>
    </VStack>;
}`,...h.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`() => {
  const [price, setPrice] = useState<number>(555.55);
  const onNext = () => setPrice(p => Math.max(0, Math.round((p + (Math.random() - 0.5) * 50) * 100) / 100));
  return <VStack gap={2}>
      <Text font="label1">Color pulse and custom transition</Text>
      <RollingNumber colorPulseOnUpdate font="title1" format={{
      style: 'currency',
      currency: 'USD'
    }} transition={{
      color: {
        duration: durations.moderate3 / 1000,
        ease: 'easeInOut'
      },
      y: {
        duration: durations.moderate3 / 1000,
        ease: 'easeIn'
      }
    }} value={price} />
      <RollingNumber colorPulseOnUpdate color="accentBoldBlue" font="title1" format={{
      style: 'currency',
      currency: 'USD'
    }} transition={{
      color: {
        duration: durations.slow4 / 1000,
        ease: 'easeInOut'
      },
      y: {
        duration: durations.slow4 / 1000,
        ease: 'easeIn'
      }
    }} value={price} />

      <Text font="label1">Customize positive and negative change colors</Text>
      <RollingNumber colorPulseOnUpdate font="title1" negativePulseColor="bgWarning" positivePulseColor="fgPrimary" value={price} />
      <Text font="label1">Fast digits, slow color</Text>
      <RollingNumber colorPulseOnUpdate font="title1" format={{
      style: 'currency',
      currency: 'USD'
    }} transition={{
      y: {
        duration: durations.fast1 / 1000,
        ease: curves.enterFunctional
      },
      color: {
        duration: 5,
        ease: curves.global
      }
    }} value={price} />
      <Text font="label1">Springy digits</Text>
      <RollingNumber colorPulseOnUpdate font="title1" format={{
      style: 'currency',
      currency: 'USD'
    }} transition={{
      y: {
        type: 'spring',
        stiffness: 1000,
        damping: 24,
        mass: 3
      }
    }} value={price} />
      <Text font="label1">Custom easings</Text>
      <RollingNumber colorPulseOnUpdate font="title1" format={{
      style: 'currency',
      currency: 'USD'
    }} transition={{
      y: {
        duration: durations.moderate2 / 1000,
        ease: curves.enterExpressive
      },
      color: {
        duration: durations.slow1 / 1000,
        ease: curves.exitFunctional
      }
    }} value={price} />
      <Button onClick={onNext}>Next</Button>
    </VStack>;
}`,...v.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`() => {
  return <VStack gap={2}>
      <Text font="label1">Polymorphism</Text>
      <RollingNumber as="h1" format={{
      style: 'currency',
      currency: 'USD'
    }} value={12345.67} />
      <RollingNumber as="p" format={{
      style: 'currency',
      currency: 'USD'
    }} value={12345.67} />
    </VStack>;
}`,...j.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`() => {
  const {
    value,
    onNext
  } = useTestValues();
  const format = {
    style: 'currency' as const,
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 5,
    notation: 'compact' as const
  };
  return <VStack gap={2}>
      <Text font="label1">Compact number with currency sign</Text>
      <RollingNumber font="display1" format={format} value={value} />
      <Text font="label1">Number without grouping</Text>
      <RollingNumber font="display1" format={{
      useGrouping: false
    }} value={value} />
      <Button onClick={onNext}>Next</Button>
    </VStack>;
}`,...D.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`() => {
  const {
    value,
    prefix,
    suffix,
    iconPrefix,
    iconSuffix,
    onNext
  } = useTestValues();
  const format = {
    style: 'currency' as const,
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 5
  };
  return <VStack gap={2}>
      <Text font="label1">Simple text prefix and suffix</Text>
      <RollingNumber colorPulseOnUpdate font="display1" format={format} prefix="+" suffix=" BTC" value={value} />
      <Text font="label1">Dynamic prefix and suffix</Text>
      <RollingNumber colorPulseOnUpdate font="display1" format={format} prefix={prefix} suffix={suffix} value={value} />
      <Text font="label1">ReactNode prefix and suffix</Text>
      <RollingNumber colorPulseOnUpdate font="display1" format={format} prefix={iconPrefix} suffix={iconSuffix} value={value} />
      <Button onClick={onNext}>Next</Button>
    </VStack>;
}`,...k.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`() => {
  const [price, setPrice] = useState<number>(12345.67);
  const onNext = () => setPrice(p => Math.max(0, Math.round((p + (Math.random() - 0.5) * 200) * 100) / 100));
  return <VStack gap={2}>
      <Text font="label1">Style overrides per section</Text>
      <RollingNumber colorPulseOnUpdate font="display1" format={{
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      notation: 'compact'
    }} prefix="-" styles={{
      root: {
        border: '1px dashed var(--color-bgLine)',
        padding: '4px 8px',
        borderRadius: 8,
        background: 'var(--color-bgSecondaryWash)'
      },
      i18nPrefix: {
        color: 'var(--color-accentBoldBlue)'
      },
      prefix: {
        color: 'rgb(var(--purple50))'
      },
      integer: {
        letterSpacing: '-1px'
      },
      fraction: {
        opacity: 0.2,
        letterSpacing: '10px'
      },
      i18nSuffix: {
        color: 'var(--color-accentBoldRed)'
      },
      suffix: {
        color: 'var(--color-accentBoldYellow)',
        marginLeft: 10
      }
    }} suffix="BTC" value={price} />
      <Button onClick={onNext}>Next</Button>
    </VStack>;
}`,...P.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`() => {
  const values = [0.0000000001, 0.00009, 0.000012, 0.0000001, 0.000000001, 0.000000000000000000000011];
  const [idx, setIdx] = useState(0);
  const onNext = () => setIdx((idx + 1) % values.length);
  const value = values[idx];
  const format = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 25
  };
  return <VStack gap={1}>
      <Text font="label1">Subscript for small decimals</Text>
      <Text as="span" font="label2">
        Default:
      </Text>
      <RollingNumber font="display3" format={format} value={value} />

      <Text as="span" font="label2">
        With subscript:
      </Text>
      {fonts.map(fontKey => <RollingNumber key={fontKey} enableSubscriptNotation font={fontKey} format={format} value={value} />)}
      <Button onClick={onNext}>Next</Button>
    </VStack>;
}`,...T.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`() => {
  const btcPrices = [{
    value: 98_765.43,
    formattedValue: '¥98,765.43 BTC'
  }, {
    value: 931.42,
    formattedValue: '$931.42 BTC'
  }, {
    value: 100_890.56,
    formattedValue: '¥100,890.56 BTC'
  }, {
    value: 149_432.12,
    formattedValue: '¥149,432.12 BTC'
  }, {
    value: 150_321.23,
    formattedValue: '¥150,321.23 BTC'
  }];
  const subscripts = [{
    value: 0.0000000001,
    formattedValue: '€0,0₉1',
    accessibilityLabel: '€0.0000000001'
  }, {
    value: 0.00009,
    formattedValue: '€0,0₄9',
    accessibilityLabel: '€0.00009'
  }, {
    value: 0.000012,
    formattedValue: '€0,0₄12',
    accessibilityLabel: '€0.000012'
  }, {
    value: 0.0000001,
    formattedValue: '€0,0₆1',
    accessibilityLabel: '€0.0000001'
  }, {
    value: 0.000000000000000000000011,
    formattedValue: '€0,0₂₂11',
    accessibilityLabel: '€0.000000000000000000000011'
  }];
  const [idx, setIdx] = useState(0);
  const onNext = () => setIdx((idx + 1) % 5);
  return <VStack gap={1}>
      <Text font="label1">User provided formatted value</Text>
      <Text font="label2">BTC prices</Text>
      <RollingNumber colorPulseOnUpdate font="display3" formattedValue={btcPrices[idx].formattedValue} prefix={<Icon name="crypto" size="l" />} value={btcPrices[idx].value} />

      <Text font="label2">Subscripts with comma as decimal separator</Text>
      <RollingNumber colorPulseOnUpdate accessibilityLabel={subscripts[idx].accessibilityLabel} font="display3" formattedValue={subscripts[idx].formattedValue} value={subscripts[idx].value} />
      <Button onClick={onNext}>Next</Button>
    </VStack>;
}`,...C.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`() => {
  return <VStack gap={2}>
      <Text font="label1">Override screen reader label (compact notation)</Text>
      <RollingNumber accessibilityLabel="1,230 followers" font="display3" formattedValue="1.23K" suffix=" followers" value={1230} />

      <Text font="label1">Prefix/Suffix for screen readers (basis points)</Text>
      <RollingNumber accessibilityLabelPrefix="down " accessibilityLabelSuffix=" likes" font="body" prefix={<Icon name="arrowDown" size="s" />} suffix={<Icon name="heart" size="s" />} value={25} />
    </VStack>;
}`,...N.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`() => {
  const [price, setPrice] = useState<number>(12345.67);
  const onUp = () => setPrice(p => Math.round((p + Math.random() * 100) * 100) / 100);
  const onDown = () => setPrice(p => Math.max(0, Math.round((p - Math.random() * 100) * 100) / 100));
  return <VStack gap={3}>
      <RollingNumber colorPulseOnUpdate digitTransitionVariant="single" font="display1" format={{
      style: 'currency',
      currency: 'USD'
    }} value={price} />
      <HStack gap={2}>
        <Button onClick={onUp}>Increase</Button>
        <Button onClick={onDown}>Decrease</Button>
      </HStack>
      <HStack gap={4}>
        <VStack gap={1}>
          <Text color="fgMuted" font="caption">
            Every (default)
          </Text>
          <RollingNumber colorPulseOnUpdate font="title1" format={{
          style: 'currency',
          currency: 'USD'
        }} value={price} />
        </VStack>
        <VStack gap={1}>
          <Text color="fgMuted" font="caption">
            Single
          </Text>
          <RollingNumber colorPulseOnUpdate digitTransitionVariant="single" font="title1" format={{
          style: 'currency',
          currency: 'USD'
        }} value={price} />
        </VStack>
      </HStack>
    </VStack>;
}`,...B.parameters?.docs?.source}}};U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`() => {
  // Counter
  const [count, setCount] = useState(0);

  // Countdown
  const pad = (n: number) => String(n).padStart(2, '0');
  const totalSeconds = 5 * 60;
  const [seconds, setSeconds] = useState(totalSeconds);
  const [running, setRunning] = useState(false);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds(prev => prev <= 1 ? 0 : prev - 1);
    }, 1000);
    return () => clearInterval(id);
  }, [running]);
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const formatted = \`\${pad(minutes)}:\${pad(secs)}\`;
  const onReset = () => setSeconds(totalSeconds);
  const progress = Math.max(0, Math.min(1, (totalSeconds - seconds) / totalSeconds));

  // Subscription price
  const [yearly, setYearly] = useState(false);
  const price = yearly ? 199 : 19;
  const suffix = yearly ? '/yr' : '/mo';

  // Statistics
  const [views, setViews] = useState(1234567);
  const [likes, setLikes] = useState(89432);
  const [shares, setShares] = useState(12789);
  const [downloads, setDownloads] = useState(567890);
  const simulateActivity = () => {
    setViews(v => v + Math.floor(Math.random() * 1000));
    setLikes(l => l + Math.floor(Math.random() * 200));
    setShares(s => s + Math.floor(Math.random() * 100));
    setDownloads(d => d + Math.floor(Math.random() * 500));
  };

  // Live bidding
  const [currentBid, setCurrentBid] = useState(45000);
  const [bidCount, setBidCount] = useState(23);
  const [timeLeft, setTimeLeft] = useState(180);
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000);
    return () => clearInterval(timer);
  }, []);
  const placeBid = (inc: number) => {
    setCurrentBid(b => b + inc);
    setBidCount(c => c + 1);
  };
  const lbMinutes = Math.floor(timeLeft / 60);
  const lbSeconds = timeLeft % 60;
  return <VStack gap={3}>
      {/* Counter */}
      <VStack gap={1}>
        <Text font="label1">Counter</Text>
        <HStack alignItems="center" gap={2}>
          <IconButton name="minus" onClick={() => setCount(c => Math.max(0, c - 1))} />
          <RollingNumber colorPulseOnUpdate font="display1" format={{
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }} value={count} />
          <IconButton name="add" onClick={() => setCount(c => c + 1)} />
        </HStack>
      </VStack>

      {/* Countdown */}
      <VStack gap={1}>
        <Text font="label1">Countdown clock</Text>
        <RollingNumber ariaLive="off" font="display3" formattedValue={formatted} value={seconds} />
        <HStack gap={2}>
          <Button onClick={() => setRunning(r => !r)}>{running ? 'Pause' : 'Start'}</Button>
          <Button onClick={onReset}>Reset</Button>
        </HStack>
        <Text font="label1">Countdown with percent</Text>
        <VStack gap={1}>
          <ProgressBar progress={progress} />
          <RollingNumber ariaLive="off" font="body" format={{
          style: 'percent',
          maximumFractionDigits: 0
        }} prefix="Elapsed: " value={progress} />
        </VStack>
      </VStack>

      {/* Subscription */}
      <VStack gap={1}>
        <RollingNumber colorPulseOnUpdate accessibilityLabel={\`$\${price} \${suffix === '/yr' ? 'yearly' : 'monthly'}\`} font="display1" format={{
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }} styles={{
        suffix: {
          position: 'relative',
          top: 'var(--space-1_5)',
          color: 'var(--color-fgMuted)',
          fontSize: 'var(--fontSize-title1)'
        }
      }} suffix={suffix} transition={{
        y: {
          type: 'spring',
          stiffness: 80,
          damping: 24,
          mass: 3
        }
      }} value={price} />
        <HStack gap={2}>
          <Button onClick={() => setYearly(v => !v)}>
            {yearly ? 'Switch to monthly' : 'Switch to yearly'}
          </Button>
        </HStack>
      </VStack>

      {/* Statistics */}
      <VStack gap={2}>
        <Text font="label1">Social Media Statistics</Text>
        <HStack gap={4}>
          <VStack alignItems="center" gap={0.5}>
            <RollingNumber colorPulseOnUpdate font="title1" format={{
            notation: 'compact',
            maximumFractionDigits: 1,
            minimumFractionDigits: 1
          }} positivePulseColor="accentBoldBlue" value={views} />
            <Text color="fgMuted" font="caption">
              Views
            </Text>
          </VStack>
          <VStack alignItems="center" gap={0.5}>
            <RollingNumber colorPulseOnUpdate font="title1" format={{
            notation: 'compact',
            maximumFractionDigits: 1,
            minimumFractionDigits: 1
          }} positivePulseColor="accentBoldRed" prefix={<Icon color="accentBoldRed" name="heart" />} styles={{
            prefix: {
              paddingRight: 'var(--space-0_5)'
            }
          }} value={likes} />
            <Text color="fgMuted" font="caption">
              Likes
            </Text>
          </VStack>
          <VStack alignItems="center" gap={0.5}>
            <RollingNumber colorPulseOnUpdate font="title1" format={{
            notation: 'compact',
            maximumFractionDigits: 1,
            minimumFractionDigits: 1
          }} positivePulseColor="accentBoldGreen" value={shares} />
            <Text color="fgMuted" font="caption">
              Shares
            </Text>
          </VStack>
          <VStack alignItems="center" gap={0.5}>
            <RollingNumber colorPulseOnUpdate font="title1" format={{
            notation: 'compact',
            maximumFractionDigits: 1,
            minimumFractionDigits: 1
          }} positivePulseColor="accentBoldPurple" value={downloads} />
            <Text color="fgMuted" font="caption">
              Downloads
            </Text>
          </VStack>
        </HStack>
        <Button onClick={simulateActivity}>Simulate Activity</Button>
      </VStack>

      {/* Live bidding */}
      <VStack gap={1}>
        <Text color="fgMuted" font="caption">
          Current Bid
        </Text>
        <RollingNumber colorPulseOnUpdate font="display2" format={{
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      }} positivePulseColor="accentBoldRed" transition={{
        y: {
          type: 'spring',
          stiffness: 200,
          damping: 20
        }
      }} value={currentBid} />
        <HStack gap={1}>
          <RollingNumber ariaLive="off" font="body" format={{
          minimumFractionDigits: 0
        }} value={bidCount} />
          <Text font="body">bids placed</Text>
          <Text color="fgMuted" font="body">
            •
          </Text>
          <RollingNumber ariaLive="off" color={timeLeft < 30 ? 'fgNegative' : 'fg'} font="body" formattedValue={\`\${lbMinutes}:\${String(lbSeconds).padStart(2, '0')}\`} value={timeLeft} />
          <Text font="body">remaining</Text>
        </HStack>
        <HStack gap={1}>
          <Button onClick={() => placeBid(100)}>+$100</Button>
          <Button onClick={() => placeBid(500)}>+$500</Button>
          <Button onClick={() => placeBid(1000)}>+$1000</Button>
        </HStack>
      </VStack>
    </VStack>;
}`,...U.parameters?.docs?.source}}};const Ie=["Examples","FontCustomization","ColorAndTransition","Polymorphism","Format","PrefixAndSuffix","StyleOverrides","Subscript","UserProvidedFormattedValue","Accessibility","SingleTransition","Fun"];export{N as Accessibility,v as ColorAndTransition,S as Examples,h as FontCustomization,D as Format,U as Fun,j as Polymorphism,k as PrefixAndSuffix,B as SingleTransition,P as StyleOverrides,T as Subscript,C as UserProvidedFormattedValue,Ie as __namedExportsOrder,Re as default};
