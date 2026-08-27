import{r as b,j as e,c as Y,i as Z,B as ee,R as re}from"./iframe-CYDANtMt.js";import{T as p}from"./Text-0g3rWpAf.js";import{P as a}from"./ProgressBar-DdCD9RPU.js";import{g as ae,P as o}from"./ProgressBarWithFixedLabels-D0bmXmhS.js";import{a as se}from"./useProgressSize-WBWVKgvy.js";import{u as te}from"./usePreviousValues-CzZr0hLN.js";import{u as oe}from"./useDimensions-C4mzPCUe.js";import{u as ne}from"./Pressable-BvczHaFK.js";import{V as s}from"./VStack-iXgNewwv.js";import{c as le}from"./utils-CM_X5is-.js";import{i as E}from"./isRtl-CGZsgYct.js";import{P as ie}from"./ProgressTextLabel-hkkBVb_E.js";import{u as ce}from"./use-animation-B-MH_N0S.js";import{m as de}from"./motion-minimal-B1h7XI-_.js";import{P as t}from"./ProgressContainerWithButtons-CHuxg4Ou.js";import{H as ge}from"./HStack-Fh-9TmPm.js";import"./preload-helper-D9Z9MdNV.js";import"./useMotionProps-BF3bCUsm.js";import"./isArray-BJmyNVUi.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";import"./useTheme-C_Ehsh33.js";import"./tokens-BwScSksM.js";import"./Button-DPtA13Wn.js";import"./Icon-DRxKkZdt.js";import"./Spinner-CXotWqqb.js";const be="floatingTextContainerCss-f16eq1ic",pe={originX:E()?"left":"right"},ue=b.memo(({label:r,disabled:d,progress:i,disableAnimateOnMount:c,labelPlacement:g,styles:M,classNames:A})=>{const F=b.useRef(null),w=b.useRef(null),{getPreviousValue:_,addPreviousValue:N}=te([c?i:0]),T=ce(),[R,z]=b.useState(!c);N(i);const q=_()??0,{observe:J,width:D,height:H}=oe(),{value:G,render:K}=ae(r);ne(()=>{if(w.current&&F.current&&H>0&&D>0){const l=F.current.offsetWidth,I=w.current.offsetWidth,U=E()?Math.min(l-I,l-l*q):Math.max(0,l*q-I),O=E()?Math.min(l-I,l-l*i):Math.max(0,l*i-I);!R&&c?(T.set({x:O}),z(!0)):T.start({x:[U,O],transition:le(se)})}},[i,D,H,q,c]);const Q=b.useCallback(l=>{F.current=l,J(l)},[J]);return e.jsx(ee,{ref:Q,alignItems:"center",className:A?.labelContainer,paddingBottom:g==="above"?1:0,paddingTop:g==="below"?1:0,style:M?.labelContainer,testID:"cds-progress-label-container",width:"100%",children:e.jsx(de.div,{ref:w,animate:T,className:be,"data-testid":"cds-progress-bar-float-label",style:{...pe,opacity:R?1:0},children:e.jsx(ie,{className:A?.label,color:"fgMuted",disableAnimateOnMount:c,disabled:d,renderLabel:K,style:M?.label,value:G})})})}),n=b.memo(({label:r,labelPlacement:d="above",progress:i,disableAnimateOnMount:c,disabled:g,children:M,testID:A,style:F,className:w,styles:_,classNames:N})=>{const R=!Z()&&e.jsx(ue,{classNames:N,disableAnimateOnMount:c,disabled:g,label:r,labelPlacement:d,progress:i,styles:_});return e.jsxs(s,{className:Y(w,N?.root),style:{...F,..._?.root},testID:A,children:[d==="above"&&R,M,d==="below"&&R]})});n.__docgenInfo={description:"",methods:[],displayName:"ProgressBarWithFloatLabel",props:{label:{required:!0,tsType:{name:"union",raw:`| number
| {
    value: number;
    render: (num: number, disabled?: boolean) => React.ReactNode;
  }`,elements:[{name:"number"},{name:"signature",type:"object",raw:`{
  value: number;
  render: (num: number, disabled?: boolean) => React.ReactNode;
}`,signature:{properties:[{key:"value",value:{name:"number",required:!0}},{key:"render",value:{name:"signature",type:"function",raw:"(num: number, disabled?: boolean) => React.ReactNode",signature:{arguments:[{type:{name:"number"},name:"num"},{type:{name:"boolean"},name:"disabled"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}},required:!0}}]}}]},description:"Label that is floated at the end of the filled in bar. If a number is used then it will format it as a percentage."},labelPlacement:{required:!1,tsType:{name:"Extract",elements:[{name:"union",raw:"'above' | 'below' | 'beside' | 'start' | 'end'",elements:[{name:"literal",value:"'above'"},{name:"literal",value:"'below'"},{name:"literal",value:"'beside'"},{name:"literal",value:"'start'"},{name:"literal",value:"'end'"}]},{name:"union",raw:"'above' | 'below'",elements:[{name:"literal",value:"'above'"},{name:"literal",value:"'below'"}]}],raw:"Extract<Placement, 'above' | 'below'>"},description:`Position of label relative to the bar
@default above`,defaultValue:{value:"'above'",computed:!1}},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""},className:{required:!1,tsType:{name:"string"},description:""},styles:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /** Root element */
  root?: React.CSSProperties;
  /** Label container element */
  labelContainer?: React.CSSProperties;
  /** Label element */
  label?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Root element"},{key:"labelContainer",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Label container element"},{key:"label",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Label element"}]}},description:"Custom styles for individual elements of the ProgressBarWithFloatLabel component"},classNames:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /** Root element */
  root?: string;
  /** Label container element */
  labelContainer?: string;
  /** Label element */
  label?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1},description:"Root element"},{key:"labelContainer",value:{name:"string",required:!1},description:"Label container element"},{key:"label",value:{name:"string",required:!1},description:"Label element"}]}},description:"Custom class names for individual elements of the ProgressBarWithFloatLabel component"}}};const De={component:a,title:"Components/ProgressBar"},u=()=>e.jsx(t,{children:({calculateProgress:r})=>e.jsxs(s,{gap:2,children:[e.jsx(a,{progress:r(0)}),e.jsx(a,{progress:r(.2)})]})});u.parameters={percy:{enableJavaScript:!0}};const m=()=>e.jsx(t,{children:({calculateProgress:r})=>e.jsxs(s,{gap:2,children:[e.jsx(a,{progress:r(0),weight:"thin"}),e.jsx(a,{progress:r(.2),weight:"thin"})]})});m.parameters={percy:{enableJavaScript:!0}};const h=()=>e.jsx(t,{children:({calculateProgress:r})=>e.jsxs(s,{gap:2,children:[e.jsx(a,{progress:r(0),weight:"semiheavy"}),e.jsx(a,{progress:r(.2),weight:"semiheavy"})]})});h.parameters={percy:{enableJavaScript:!0}};const P=()=>e.jsx(t,{children:({calculateProgress:r})=>e.jsxs(s,{gap:2,children:[e.jsx(a,{progress:r(0),weight:"heavy"}),e.jsx(a,{progress:r(.2),weight:"heavy"})]})});P.parameters={percy:{enableJavaScript:!0}};const x=()=>e.jsx(t,{children:({calculateProgress:r})=>e.jsxs(s,{gap:2,children:[e.jsx(n,{label:Math.round(r(0)*100),labelPlacement:"above",progress:r(0),children:e.jsx(a,{progress:r(0)})}),e.jsx(n,{label:Math.round(r(.2)*100),labelPlacement:"above",progress:r(.2),children:e.jsx(a,{progress:r(.2)})})]})});x.parameters={percy:{enableJavaScript:!0}};const B=()=>e.jsx(t,{children:({calculateProgress:r})=>e.jsxs(s,{gap:2,children:[e.jsx(n,{label:Math.round(r(0)*100),labelPlacement:"below",progress:r(0),children:e.jsx(a,{progress:r(0)})}),e.jsx(n,{label:Math.round(r(.2)*100),labelPlacement:"below",progress:r(.2),children:e.jsx(a,{progress:r(.2)})})]})});B.parameters={percy:{enableJavaScript:!0}};const L=()=>e.jsxs(s,{gap:4,children:[e.jsx(t,{children:({calculateProgress:r})=>e.jsxs(s,{gap:2,children:[e.jsx(o,{endLabel:Math.round(r(.2)*100),labelPlacement:"below",startLabel:0,children:e.jsx(a,{progress:r(.2)})}),e.jsx(o,{endLabel:Math.round(r(.2)*100),labelPlacement:"below",children:e.jsx(a,{progress:r(.2)})})]})}),e.jsx(p,{as:"p",display:"block",font:"label1",children:"Wrapped in HStack"}),e.jsx(t,{children:({calculateProgress:r})=>e.jsxs(ge,{gap:2,children:[e.jsx(o,{endLabel:Math.round(r(.2)*100),labelPlacement:"below",startLabel:0,children:e.jsx(a,{progress:r(.2)})}),e.jsx(o,{endLabel:Math.round(r(.2)*100),labelPlacement:"below",children:e.jsx(a,{progress:r(.2)})})]})})]});L.parameters={percy:{enableJavaScript:!0}};const v=()=>e.jsx(t,{children:({calculateProgress:r})=>e.jsxs(s,{gap:2,children:[e.jsx(o,{endLabel:Math.round(r(.2)*100),labelPlacement:"beside",startLabel:0,children:e.jsx(a,{progress:r(.2)})}),e.jsx(o,{endLabel:Math.round(r(.2)*100),labelPlacement:"beside",children:e.jsx(a,{progress:r(.2)})})]})});v.parameters={percy:{enableJavaScript:!0}};const S=()=>e.jsxs(s,{gap:2,children:[e.jsx(o,{disabled:!0,labelPlacement:"beside",startLabel:50,children:e.jsx(a,{disabled:!0,progress:.5})}),e.jsx(o,{disabled:!0,endLabel:10,labelPlacement:"beside",children:e.jsx(a,{disabled:!0,progress:.1})}),e.jsx(o,{disabled:!0,endLabel:20,labelPlacement:"beside",startLabel:0,children:e.jsx(a,{disabled:!0,progress:.2})}),e.jsx(o,{disabled:!0,endLabel:50,labelPlacement:"beside",startLabel:0,children:e.jsx(a,{disabled:!0,progress:.5})}),e.jsx(n,{disabled:!0,label:70,progress:.7,children:e.jsx(a,{disabled:!0,progress:.7})})]});S.parameters={percy:{enableJavaScript:!0},a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const j=()=>e.jsxs(s,{gap:2,children:[e.jsx(a,{color:"bgPositive",progress:.5}),e.jsx(a,{color:"bgNegative",progress:.5}),e.jsx(a,{color:"bgPrimary",progress:.5}),e.jsx(a,{color:"bgWarning",progress:.5}),e.jsx(a,{color:"fg",progress:.5}),e.jsx(a,{disabled:!0,color:"fg",progress:.5})]});j.parameters={percy:{enableJavaScript:!0}};const $=r=>e.jsxs(p,{font:"title3",children:["$",r.toLocaleString()]}),me=r=>e.jsxs(p,{noWrap:!0,font:"label2",textAlign:"end",children:["$",r.toLocaleString()," left"]}),X=r=>`$${r.toLocaleString()}`,V=()=>e.jsx(t,{hideIncrease:!0,children:()=>e.jsxs(s,{gap:2,children:[e.jsx(o,{endLabel:{value:35500,render:me},labelPlacement:"above",startLabel:{value:12500,render:$},children:e.jsx(a,{progress:.6})}),e.jsx(n,{label:{value:12500,render:$},labelPlacement:"above",progress:.6,children:e.jsx(a,{progress:.6})})]})}),f=()=>e.jsx(t,{hideIncrease:!0,children:()=>e.jsxs(s,{gap:2,children:[e.jsx(n,{label:{value:35500,render:X},labelPlacement:"above",progress:.6,children:e.jsx(a,{progress:.6})}),e.jsx(n,{disabled:!0,label:{value:35500,render:X},labelPlacement:"above",progress:.6,children:e.jsx(a,{disabled:!0,progress:.6})})]})});f.parameters={percy:{enableJavaScript:!0}};const W=()=>{const[r,d]=re.useState("Ready"),i=b.useCallback(()=>{d("Animating...")},[]),c=b.useCallback(()=>{d("Animation Ended")},[]);return e.jsxs(s,{gap:4,children:[e.jsxs(p,{as:"p",display:"block",font:"label1",children:["Animation Status: ",r]}),e.jsx(t,{children:({calculateProgress:g})=>e.jsx(s,{gap:2,children:e.jsx(n,{label:Math.round(g(.2)*100),labelPlacement:"above",progress:g(.2),children:e.jsx(a,{onAnimationEnd:c,onAnimationStart:i,progress:g(.2)})})})})]})};W.parameters={percy:{enableJavaScript:!0}};const y=()=>e.jsx(t,{children:({calculateProgress:r})=>e.jsxs(s,{gap:4,children:[e.jsxs(s,{gap:1,children:[e.jsx(p,{font:"label1",children:"ProgressBar"}),e.jsx(a,{disableAnimateOnMount:!0,progress:r(.8)})]}),e.jsxs(s,{gap:1,children:[e.jsx(p,{font:"label1",children:"ProgressBarWithFixedLabels"}),e.jsx(o,{disableAnimateOnMount:!0,endLabel:Math.round(r(.8)*100),labelPlacement:"above",startLabel:0,children:e.jsx(a,{disableAnimateOnMount:!0,progress:r(.8)})})]}),e.jsxs(s,{gap:1,children:[e.jsx(p,{font:"label1",children:"ProgressBarWithFloatLabel"}),e.jsx(n,{disableAnimateOnMount:!0,label:Math.round(r(.8)*100),labelPlacement:"above",progress:r(.8),children:e.jsx(a,{disableAnimateOnMount:!0,progress:r(.8)})})]})]})});y.parameters={percy:{enableJavaScript:!0}};const C=()=>e.jsx(t,{children:({calculateProgress:r})=>e.jsxs(s,{gap:2,children:[e.jsx(a,{progress:r(.6),styles:{root:{height:"var(--space-8)"}}}),e.jsx(a,{progress:r(.3),styles:{root:{height:"var(--space-8)",borderRadius:"var(--borderRadius-1000)"},progress:{borderRadius:"var(--borderRadius-1000)",background:"linear-gradient(to right, rgb(var(--teal40)), rgb(var(--green40)))"}}})]})});C.parameters={percy:{enableJavaScript:!0}};const k=()=>e.jsx(t,{children:({calculateProgress:r})=>e.jsxs(s,{gap:2,children:[e.jsx(o,{endLabel:Math.round(r(.7)*100),labelPlacement:"above",startLabel:0,styles:{startLabel:{color:"var(--color-fgNegative)"},endLabel:{color:"var(--color-fgPositive)",fontWeight:"bold"}},children:e.jsx(a,{progress:r(.7)})}),e.jsx(n,{label:Math.round(r(.4)*100),labelPlacement:"above",progress:r(.4),styles:{labelContainer:{background:"var(--color-bgSubtle)",borderRadius:"var(--borderRadius-1000)",padding:"var(--space-1)"},label:{color:"var(--color-bgPrimary)",fontWeight:"bold",background:"var(--color-bg)",borderRadius:"var(--borderRadius-1)",padding:"var(--space-1)"}},children:e.jsx(a,{progress:r(.4)})})]})});k.parameters={percy:{enableJavaScript:!0}};u.__docgenInfo={description:"",methods:[],displayName:"Default"};m.__docgenInfo={description:"",methods:[],displayName:"Thin"};h.__docgenInfo={description:"",methods:[],displayName:"Semiheavy"};P.__docgenInfo={description:"",methods:[],displayName:"Heavy"};x.__docgenInfo={description:"",methods:[],displayName:"LabelAbove"};B.__docgenInfo={description:"",methods:[],displayName:"LabelBelow"};L.__docgenInfo={description:"",methods:[],displayName:"LabelAtBoundsBelow"};v.__docgenInfo={description:"",methods:[],displayName:"LabelBeside"};S.__docgenInfo={description:"",methods:[],displayName:"Disabled"};j.__docgenInfo={description:"",methods:[],displayName:"Colors"};V.__docgenInfo={description:"",methods:[],displayName:"CustomLabels"};f.__docgenInfo={description:"",methods:[],displayName:"CustomStringLabel"};W.__docgenInfo={description:"",methods:[],displayName:"AnimationCallbacks"};y.__docgenInfo={description:"",methods:[],displayName:"DisableAnimateOnMount"};C.__docgenInfo={description:"",methods:[],displayName:"CustomStyles"};k.__docgenInfo={description:"",methods:[],displayName:"CustomStylesWithLabels"};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`() => {
  return <ProgressContainerWithButtons>
      {({
      calculateProgress
    }) => <VStack gap={2}>
          <ProgressBar progress={calculateProgress(0)} />
          <ProgressBar progress={calculateProgress(0.2)} />
        </VStack>}
    </ProgressContainerWithButtons>;
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => {
  return <ProgressContainerWithButtons>
      {({
      calculateProgress
    }) => <VStack gap={2}>
          <ProgressBar progress={calculateProgress(0)} weight="thin" />
          <ProgressBar progress={calculateProgress(0.2)} weight="thin" />
        </VStack>}
    </ProgressContainerWithButtons>;
}`,...m.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => {
  return <ProgressContainerWithButtons>
      {({
      calculateProgress
    }) => <VStack gap={2}>
          <ProgressBar progress={calculateProgress(0)} weight="semiheavy" />
          <ProgressBar progress={calculateProgress(0.2)} weight="semiheavy" />
        </VStack>}
    </ProgressContainerWithButtons>;
}`,...h.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`() => {
  return <ProgressContainerWithButtons>
      {({
      calculateProgress
    }) => <VStack gap={2}>
          <ProgressBar progress={calculateProgress(0)} weight="heavy" />
          <ProgressBar progress={calculateProgress(0.2)} weight="heavy" />
        </VStack>}
    </ProgressContainerWithButtons>;
}`,...P.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`() => {
  return <ProgressContainerWithButtons>
      {({
      calculateProgress
    }) => <VStack gap={2}>
          <ProgressBarWithFloatLabel label={Math.round(calculateProgress(0) * 100)} labelPlacement="above" progress={calculateProgress(0)}>
            <ProgressBar progress={calculateProgress(0)} />
          </ProgressBarWithFloatLabel>
          <ProgressBarWithFloatLabel label={Math.round(calculateProgress(0.2) * 100)} labelPlacement="above" progress={calculateProgress(0.2)}>
            <ProgressBar progress={calculateProgress(0.2)} />
          </ProgressBarWithFloatLabel>
        </VStack>}
    </ProgressContainerWithButtons>;
}`,...x.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`() => {
  return <ProgressContainerWithButtons>
      {({
      calculateProgress
    }) => <VStack gap={2}>
          <ProgressBarWithFloatLabel label={Math.round(calculateProgress(0) * 100)} labelPlacement="below" progress={calculateProgress(0)}>
            <ProgressBar progress={calculateProgress(0)} />
          </ProgressBarWithFloatLabel>
          <ProgressBarWithFloatLabel label={Math.round(calculateProgress(0.2) * 100)} labelPlacement="below" progress={calculateProgress(0.2)}>
            <ProgressBar progress={calculateProgress(0.2)} />
          </ProgressBarWithFloatLabel>
        </VStack>}
    </ProgressContainerWithButtons>;
}`,...B.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`() => {
  return <VStack gap={4}>
      <ProgressContainerWithButtons>
        {({
        calculateProgress
      }) => <VStack gap={2}>
            <ProgressBarWithFixedLabels endLabel={Math.round(calculateProgress(0.2) * 100)} labelPlacement="below" startLabel={0}>
              <ProgressBar progress={calculateProgress(0.2)} />
            </ProgressBarWithFixedLabels>
            <ProgressBarWithFixedLabels endLabel={Math.round(calculateProgress(0.2) * 100)} labelPlacement="below">
              <ProgressBar progress={calculateProgress(0.2)} />
            </ProgressBarWithFixedLabels>
          </VStack>}
      </ProgressContainerWithButtons>
      <Text as="p" display="block" font="label1">
        Wrapped in HStack
      </Text>
      <ProgressContainerWithButtons>
        {({
        calculateProgress
      }) => <HStack gap={2}>
            <ProgressBarWithFixedLabels endLabel={Math.round(calculateProgress(0.2) * 100)} labelPlacement="below" startLabel={0}>
              <ProgressBar progress={calculateProgress(0.2)} />
            </ProgressBarWithFixedLabels>
            <ProgressBarWithFixedLabels endLabel={Math.round(calculateProgress(0.2) * 100)} labelPlacement="below">
              <ProgressBar progress={calculateProgress(0.2)} />
            </ProgressBarWithFixedLabels>
          </HStack>}
      </ProgressContainerWithButtons>
    </VStack>;
}`,...L.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`() => {
  return <ProgressContainerWithButtons>
      {({
      calculateProgress
    }) => <VStack gap={2}>
          <ProgressBarWithFixedLabels endLabel={Math.round(calculateProgress(0.2) * 100)} labelPlacement="beside" startLabel={0}>
            <ProgressBar progress={calculateProgress(0.2)} />
          </ProgressBarWithFixedLabels>
          <ProgressBarWithFixedLabels endLabel={Math.round(calculateProgress(0.2) * 100)} labelPlacement="beside">
            <ProgressBar progress={calculateProgress(0.2)} />
          </ProgressBarWithFixedLabels>
        </VStack>}
    </ProgressContainerWithButtons>;
}`,...v.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => {
  return <VStack gap={2}>
      <ProgressBarWithFixedLabels disabled labelPlacement="beside" startLabel={50}>
        <ProgressBar disabled progress={0.5} />
      </ProgressBarWithFixedLabels>
      <ProgressBarWithFixedLabels disabled endLabel={10} labelPlacement="beside">
        <ProgressBar disabled progress={0.1} />
      </ProgressBarWithFixedLabels>
      <ProgressBarWithFixedLabels disabled endLabel={20} labelPlacement="beside" startLabel={0}>
        <ProgressBar disabled progress={0.2} />
      </ProgressBarWithFixedLabels>
      <ProgressBarWithFixedLabels disabled endLabel={50} labelPlacement="beside" startLabel={0}>
        <ProgressBar disabled progress={0.5} />
      </ProgressBarWithFixedLabels>
      <ProgressBarWithFloatLabel disabled label={70} progress={0.7}>
        <ProgressBar disabled progress={0.7} />
      </ProgressBarWithFloatLabel>
    </VStack>;
}`,...S.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`() => {
  return <VStack gap={2}>
      <ProgressBar color="bgPositive" progress={0.5} />
      <ProgressBar color="bgNegative" progress={0.5} />
      <ProgressBar color="bgPrimary" progress={0.5} />
      <ProgressBar color="bgWarning" progress={0.5} />
      <ProgressBar color="fg" progress={0.5} />
      <ProgressBar disabled color="fg" progress={0.5} />
    </VStack>;
}`,...j.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`() => {
  return <ProgressContainerWithButtons hideIncrease>
      {() => <VStack gap={2}>
          <ProgressBarWithFixedLabels endLabel={{
        value: 35500,
        render: renderEndLabelNum
      }} labelPlacement="above" startLabel={{
        value: 12500,
        render: renderStartLabelNum
      }}>
            <ProgressBar progress={0.6} />
          </ProgressBarWithFixedLabels>
          <ProgressBarWithFloatLabel label={{
        value: 12500,
        render: renderStartLabelNum
      }} labelPlacement="above" progress={0.6}>
            <ProgressBar progress={0.6} />
          </ProgressBarWithFloatLabel>
        </VStack>}
    </ProgressContainerWithButtons>;
}`,...V.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`() => {
  return <ProgressContainerWithButtons hideIncrease>
      {() => <VStack gap={2}>
          <ProgressBarWithFloatLabel label={{
        value: 35500,
        render: renderCustomStringLabel
      }} labelPlacement="above" progress={0.6}>
            <ProgressBar progress={0.6} />
          </ProgressBarWithFloatLabel>
          <ProgressBarWithFloatLabel disabled label={{
        value: 35500,
        render: renderCustomStringLabel
      }} labelPlacement="above" progress={0.6}>
            <ProgressBar disabled progress={0.6} />
          </ProgressBarWithFloatLabel>
        </VStack>}
    </ProgressContainerWithButtons>;
}`,...f.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`() => {
  const [animationStatus, setAnimationStatus] = React.useState<string>('Ready');
  const handleAnimationStart = useCallback(() => {
    setAnimationStatus('Animating...');
  }, []);
  const handleAnimationEnd = useCallback(() => {
    setAnimationStatus('Animation Ended');
  }, []);
  return <VStack gap={4}>
      <Text as="p" display="block" font="label1">
        Animation Status: {animationStatus}
      </Text>
      <ProgressContainerWithButtons>
        {({
        calculateProgress
      }) => <VStack gap={2}>
            <ProgressBarWithFloatLabel label={Math.round(calculateProgress(0.2) * 100)} labelPlacement="above" progress={calculateProgress(0.2)}>
              <ProgressBar onAnimationEnd={handleAnimationEnd} onAnimationStart={handleAnimationStart} progress={calculateProgress(0.2)} />
            </ProgressBarWithFloatLabel>
          </VStack>}
      </ProgressContainerWithButtons>
    </VStack>;
}`,...W.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => {
  return <ProgressContainerWithButtons>
      {({
      calculateProgress
    }) => <VStack gap={4}>
          <VStack gap={1}>
            <Text font="label1">ProgressBar</Text>
            <ProgressBar disableAnimateOnMount progress={calculateProgress(0.8)} />
          </VStack>
          <VStack gap={1}>
            <Text font="label1">ProgressBarWithFixedLabels</Text>
            <ProgressBarWithFixedLabels disableAnimateOnMount endLabel={Math.round(calculateProgress(0.8) * 100)} labelPlacement="above" startLabel={0}>
              <ProgressBar disableAnimateOnMount progress={calculateProgress(0.8)} />
            </ProgressBarWithFixedLabels>
          </VStack>
          <VStack gap={1}>
            <Text font="label1">ProgressBarWithFloatLabel</Text>
            <ProgressBarWithFloatLabel disableAnimateOnMount label={Math.round(calculateProgress(0.8) * 100)} labelPlacement="above" progress={calculateProgress(0.8)}>
              <ProgressBar disableAnimateOnMount progress={calculateProgress(0.8)} />
            </ProgressBarWithFloatLabel>
          </VStack>
        </VStack>}
    </ProgressContainerWithButtons>;
}`,...y.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`() => {
  return <ProgressContainerWithButtons>
      {({
      calculateProgress
    }) => <VStack gap={2}>
          <ProgressBar progress={calculateProgress(0.6)} styles={{
        root: {
          height: 'var(--space-8)'
        }
      }} />
          <ProgressBar progress={calculateProgress(0.3)} styles={{
        root: {
          height: 'var(--space-8)',
          borderRadius: 'var(--borderRadius-1000)'
        },
        progress: {
          borderRadius: 'var(--borderRadius-1000)',
          background: 'linear-gradient(to right, rgb(var(--teal40)), rgb(var(--green40)))'
        }
      }} />
        </VStack>}
    </ProgressContainerWithButtons>;
}`,...C.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`() => {
  return <ProgressContainerWithButtons>
      {({
      calculateProgress
    }) => <VStack gap={2}>
          <ProgressBarWithFixedLabels endLabel={Math.round(calculateProgress(0.7) * 100)} labelPlacement="above" startLabel={0} styles={{
        startLabel: {
          color: 'var(--color-fgNegative)'
        },
        endLabel: {
          color: 'var(--color-fgPositive)',
          fontWeight: 'bold'
        }
      }}>
            <ProgressBar progress={calculateProgress(0.7)} />
          </ProgressBarWithFixedLabels>
          <ProgressBarWithFloatLabel label={Math.round(calculateProgress(0.4) * 100)} labelPlacement="above" progress={calculateProgress(0.4)} styles={{
        labelContainer: {
          background: 'var(--color-bgSubtle)',
          borderRadius: 'var(--borderRadius-1000)',
          padding: 'var(--space-1)'
        },
        label: {
          color: 'var(--color-bgPrimary)',
          fontWeight: 'bold',
          background: 'var(--color-bg)',
          borderRadius: 'var(--borderRadius-1)',
          padding: 'var(--space-1)'
        }
      }}>
            <ProgressBar progress={calculateProgress(0.4)} />
          </ProgressBarWithFloatLabel>
        </VStack>}
    </ProgressContainerWithButtons>;
}`,...k.parameters?.docs?.source}}};const He=["Default","Thin","Semiheavy","Heavy","LabelAbove","LabelBelow","LabelAtBoundsBelow","LabelBeside","Disabled","Colors","CustomLabels","CustomStringLabel","AnimationCallbacks","DisableAnimateOnMount","CustomStyles","CustomStylesWithLabels"];export{W as AnimationCallbacks,j as Colors,V as CustomLabels,f as CustomStringLabel,C as CustomStyles,k as CustomStylesWithLabels,u as Default,y as DisableAnimateOnMount,S as Disabled,P as Heavy,x as LabelAbove,L as LabelAtBoundsBelow,B as LabelBelow,v as LabelBeside,h as Semiheavy,m as Thin,He as __namedExportsOrder,De as default};
