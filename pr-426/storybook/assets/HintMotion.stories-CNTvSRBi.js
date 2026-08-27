import{r as t,j as e,B as c}from"./iframe-BXWLBCkp.js";import{T as y}from"./Text-Ch_dBU4v.js";import{p as j,a as R,s as w,b as T,C as M}from"./ColorSurge-D5iBCkQQ.js";import{c as C}from"./utils-CwomCnHN.js";import{u as S}from"./use-animation-CYeuSrS_.js";import{m as x}from"./motion-minimal-SVRWJYUW.js";import{V as k}from"./VStack-CnEfMFeL.js";import{B as o}from"./Button-W9Shg4T1.js";import"./preload-helper-D9Z9MdNV.js";import"./tokens-BwScSksM.js";import"./useMotionProps-CS-LE6l8.js";import"./Icon-CgDQ3NQp.js";import"./useTheme-BJazYlse.js";import"./Spinner-BAI0lrZ-.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";const N=n=>n===void 0||n===1/0?1/0:n>0?n-1:0,b=t.memo(t.forwardRef(function({children:a,variant:r="moderate",disableAnimateOnMount:i=!1,iterations:l,motionConfig:s},g){const u=S(),d=t.useCallback(()=>{u.stop(),u.set({opacity:1})},[u]),v=t.useMemo(()=>N(l),[l]),h=t.useCallback(async B=>{d(),await u.start({opacity:[1,j[B??r],1],transition:C({...R,...s||{},repeat:v})})},[d,u,r,v,s]);return t.useEffect(()=>{i||h()},[h,i]),t.useImperativeHandle(g,()=>({play:h,stop:d}),[h,d]),e.jsx(x.div,{animate:u,children:a})}));b.__docgenInfo={description:"Please consult with the motion team in #ask-motion before using this component.",methods:[],displayName:"Pulse",props:{disableAnimateOnMount:{required:!1,tsType:{name:"boolean"},description:`Disable animation on component mount
@default false`,defaultValue:{value:"false",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'moderate' | 'subtle' | 'heavy'",elements:[{name:"literal",value:"'moderate'"},{name:"literal",value:"'subtle'"},{name:"literal",value:"'heavy'"}]},description:`Variant controls opacity of the pulse
@default moderate`,defaultValue:{value:"'moderate'",computed:!1}},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},iterations:{required:!1,tsType:{name:"number"},description:`Specifies the number of times the pulse animation should loop.
Provide a positive integer to define an exact number of loops.
To enable infinite looping, omit this property or leave it undefined.
By default, the animation loops infinitely if this property is not specified.
@default Infinity`},motionConfig:{required:!1,tsType:{name:"Partial",elements:[{name:"signature",type:"object",raw:`{
  /**
   * CDS motion easing token
   */
  easing: MotionCurve;
  /**
   * CDS motion duration token
   */
  duration?: MotionDuration;
  /**
   * One-off duration in ms
   */
  oneOffDuration?: number;
}`,signature:{properties:[{key:"easing",value:{name:"union",raw:"keyof typeof curves",elements:[{name:"literal",value:"global"},{name:"literal",value:"enterExpressive"},{name:"literal",value:"enterFunctional"},{name:"literal",value:"exitExpressive"},{name:"literal",value:"exitFunctional"},{name:"literal",value:"linear"}],required:!0},description:"CDS motion easing token"},{key:"duration",value:{name:"union",raw:"keyof typeof durations",elements:[{name:"literal",value:"quick"},{name:"literal",value:"fast1"},{name:"literal",value:"fast2"},{name:"literal",value:"fast3"},{name:"literal",value:"moderate1"},{name:"literal",value:"moderate2"},{name:"literal",value:"moderate3"},{name:"literal",value:"slow1"},{name:"literal",value:"slow2"},{name:"literal",value:"slow3"},{name:"literal",value:"slow4"}],required:!1},description:"CDS motion duration token"},{key:"oneOffDuration",value:{name:"number",required:!1},description:"One-off duration in ms"}]}}],raw:"Partial<MotionTransition>"},description:"Custom motion transition to override default motion config"}}};const P=t.memo(t.forwardRef(function({children:a,disableAnimateOnMount:r=!1},i){const l=S(),s=t.useCallback(async()=>l.start({x:w,transition:C(T)}),[l]);return t.useEffect(()=>{r||s()},[s,r]),t.useImperativeHandle(i,()=>({play:s}),[s]),e.jsx(x.div,{animate:l,children:a})}));P.__docgenInfo={description:"Please consult with the motion team in #ask-motion before using this component.",methods:[],displayName:"Shake",props:{disableAnimateOnMount:{required:!1,tsType:{name:"boolean"},description:`Disable animation on component mount
@default false`,defaultValue:{value:"false",computed:!1}},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""}}};const U={title:"Components/Motion/HintMotion"},m=()=>{const n=t.useRef(null),a=t.useCallback(async()=>n.current?.play("bgPrimary"),[]),r=t.useCallback(async()=>n.current?.play("bgPositive"),[]),i=t.useCallback(async()=>n.current?.play("bgNegative"),[]);return e.jsxs(k,{gap:3,children:[e.jsxs(c,{bordered:!0,borderRadius:200,overflow:"hidden",padding:3,position:"relative",children:[e.jsx(M,{ref:n,disableAnimateOnMount:!0}),e.jsx(y,{font:"body",children:"Color Surge"})]}),e.jsx(o,{onClick:a,children:"Surge - Primary"}),e.jsx(o,{onClick:r,children:"Surge - Positive"}),e.jsx(o,{onClick:i,children:"Surge - Negative"})]})},p=()=>{const n=t.useRef(null),a=t.useRef(null),r=t.useCallback(async()=>n.current?.play("heavy"),[]),i=t.useCallback(async()=>n.current?.play("moderate"),[]),l=t.useCallback(async()=>n.current?.play("subtle"),[]),s=t.useCallback(()=>n.current?.stop(),[]),g=t.useMemo(()=>({oneOffDuration:1e3,easing:"global"}),[]),u=t.useCallback(async()=>a.current?.play(),[]),d=t.useCallback(()=>a.current?.stop(),[]);return e.jsxs(k,{gap:3,children:[e.jsxs(b,{ref:n,disableAnimateOnMount:!0,variant:"heavy",children:[e.jsx(c,{background:"bgPrimary",height:50,width:50}),e.jsx(c,{background:"bgNegative",height:50,width:50}),e.jsx(c,{background:"bgPositive",height:50,width:50})]}),e.jsx(o,{onClick:r,children:"Pulse - Heavy"}),e.jsx(o,{onClick:i,children:"Pulse - Moderate"}),e.jsx(o,{onClick:l,children:"Pulse - Subtle"}),e.jsx(o,{onClick:s,children:"Stop"}),e.jsx(y,{font:"body",children:"Custom Transition"}),e.jsxs(b,{ref:a,disableAnimateOnMount:!0,motionConfig:g,children:[e.jsx(c,{background:"bgPrimary",height:50,width:50}),e.jsx(c,{background:"bgNegative",height:50,width:50}),e.jsx(c,{background:"bgPositive",height:50,width:50})]}),e.jsx(o,{onClick:u,children:"Pulse - Custom"}),e.jsx(o,{onClick:d,children:"Stop"})]})},f=()=>{const n=t.useRef(null),a=t.useCallback(async()=>n.current?.play(),[]);return e.jsxs(k,{gap:3,children:[e.jsx(P,{ref:n,disableAnimateOnMount:!0,children:e.jsx(c,{bordered:!0,borderRadius:200,padding:3,children:e.jsx(y,{font:"body",children:"Shaking Box"})})}),e.jsx(o,{onClick:a,children:"Shake"})]})};m.__docgenInfo={description:"",methods:[],displayName:"ColorSurge"};p.__docgenInfo={description:"",methods:[],displayName:"Pulse"};f.__docgenInfo={description:"",methods:[],displayName:"Shake"};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => {
  const ref = useRef<ColorSurgeRefBaseProps>(null);
  const handleSurgePrimary = useCallback(async () => ref.current?.play('bgPrimary'), []);
  const handleSurgePositive = useCallback(async () => ref.current?.play('bgPositive'), []);
  const handleSurgeNegative = useCallback(async () => ref.current?.play('bgNegative'), []);
  return <VStack gap={3}>
      <Box bordered borderRadius={200} overflow="hidden" padding={3} position="relative">
        <ColorSurgeComponent ref={ref} disableAnimateOnMount />
        <Text font="body">Color Surge</Text>
      </Box>
      <Button onClick={handleSurgePrimary}>Surge - Primary</Button>
      <Button onClick={handleSurgePositive}>Surge - Positive</Button>
      <Button onClick={handleSurgeNegative}>Surge - Negative</Button>
    </VStack>;
}`,...m.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => {
  const ref = useRef<PulseRefBaseProps>(null);
  const customRef = useRef<PulseRefBaseProps>(null);
  const handlePulseHeavy = useCallback(async () => ref.current?.play('heavy'), []);
  const handlePulseModerate = useCallback(async () => ref.current?.play('moderate'), []);
  const handlePulseSubtle = useCallback(async () => ref.current?.play('subtle'), []);
  const handleStop = useCallback(() => ref.current?.stop(), []);
  const customTransition: MotionTransition = useMemo(() => ({
    oneOffDuration: 1000,
    easing: 'global'
  }), []);
  const handleCustom = useCallback(async () => customRef.current?.play(), []);
  const handleCustomStop = useCallback(() => customRef.current?.stop(), []);
  return <VStack gap={3}>
      <PulseComponent ref={ref} disableAnimateOnMount variant="heavy">
        <Box background="bgPrimary" height={50} width={50} />
        <Box background="bgNegative" height={50} width={50} />
        <Box background="bgPositive" height={50} width={50} />
      </PulseComponent>
      <Button onClick={handlePulseHeavy}>Pulse - Heavy</Button>
      <Button onClick={handlePulseModerate}>Pulse - Moderate</Button>
      <Button onClick={handlePulseSubtle}>Pulse - Subtle</Button>
      <Button onClick={handleStop}>Stop</Button>
      <Text font="body">Custom Transition</Text>
      <PulseComponent ref={customRef} disableAnimateOnMount motionConfig={customTransition}>
        <Box background="bgPrimary" height={50} width={50} />
        <Box background="bgNegative" height={50} width={50} />
        <Box background="bgPositive" height={50} width={50} />
      </PulseComponent>
      <Button onClick={handleCustom}>Pulse - Custom</Button>
      <Button onClick={handleCustomStop}>Stop</Button>
    </VStack>;
}`,...p.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`() => {
  const ref = useRef<ShakeRefBaseProps>(null);
  const handleShake = useCallback(async () => ref.current?.play(), []);
  return <VStack gap={3}>
      <ShakeComponent ref={ref} disableAnimateOnMount>
        <Box bordered borderRadius={200} padding={3}>
          <Text font="body">Shaking Box</Text>
        </Box>
      </ShakeComponent>
      <Button onClick={handleShake}>Shake</Button>
    </VStack>;
}`,...f.parameters?.docs?.source}}};const W=["ColorSurge","Pulse","Shake"];export{m as ColorSurge,p as Pulse,f as Shake,W as __namedExportsOrder,U as default};
