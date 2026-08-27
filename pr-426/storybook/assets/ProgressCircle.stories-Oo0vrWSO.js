import{j as e,R as B,r as z,a6 as a,B as n}from"./iframe-BXWLBCkp.js";import{a as t}from"./assets-CEwpm_uP.js";import{b as A}from"./avatars-ZXmt2F4t.js";import{P as r,D as b}from"./ProgressCircle-CPOJibCg.js";import{P as i}from"./ProgressContainerWithButtons-CtqQAwU8.js";import{H as o}from"./HStack-B6p8qBpp.js";import{V as f}from"./VStack-CnEfMFeL.js";import{T as k}from"./Text-Ch_dBU4v.js";import{R as c}from"./RemoteImage-Lksm6NI7.js";import{I as H}from"./Icon-CgDQ3NQp.js";import{B as _}from"./Button-W9Shg4T1.js";import"./preload-helper-D9Z9MdNV.js";import"./useProgressSize-CemUcfxL.js";import"./useMotionProps-CS-LE6l8.js";import"./utils-CwomCnHN.js";import"./tokens-BwScSksM.js";import"./ProgressTextLabel-B8KufXu9.js";import"./usePreviousValues-rLMWE3mU.js";import"./VisualizationContainer-BdKSimea.js";import"./useDimensions-CSIQgsxn.js";import"./motion-minimal-SVRWJYUW.js";import"./useTheme-BJazYlse.js";import"./Spinner-BAI0lrZ-.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";const ne={component:r,title:"Components/ProgressCircle"},h=()=>e.jsx(i,{children:({calculateProgress:s})=>e.jsxs(o,{gap:2,children:[e.jsx(r,{progress:s(0),size:100}),e.jsx(r,{accessibilityLabel:"Custom accessibility label for progress circle",progress:s(.2),size:100})]})}),m=()=>e.jsx(i,{children:({calculateProgress:s})=>e.jsxs(o,{gap:2,children:[e.jsx(r,{progress:s(0),size:100,weight:"heavy"}),e.jsx(r,{progress:s(.2),size:100,weight:"heavy"})]})}),u=()=>e.jsx(i,{children:({calculateProgress:s})=>e.jsxs(o,{gap:2,children:[e.jsx(r,{hideContent:!0,progress:s(0),size:100}),e.jsx(r,{hideContent:!0,progress:s(.2),size:100})]})}),x=()=>e.jsxs(o,{gap:2,children:[e.jsx(r,{disabled:!0,progress:0,size:100}),e.jsx(r,{disabled:!0,progress:.2,size:100}),e.jsx(r,{disabled:!0,progress:.6,size:100}),e.jsx(r,{disabled:!0,progress:1,size:100})]}),C=()=>e.jsxs(o,{gap:2,children:[e.jsx(r,{color:"bgPositive",progress:.5,size:100}),e.jsx(r,{color:"bgNegative",progress:.5,size:100}),e.jsx(r,{color:"bgPrimary",progress:.5,size:100}),e.jsx(r,{color:"fg",progress:.5,size:100}),e.jsx(r,{disabled:!0,color:"fg",progress:.5,size:100})]}),l=()=>{const[s,j]=B.useState("Ready"),w=z.useCallback(()=>{j("Animating...")},[]),v=z.useCallback(()=>{j("Animation Ended")},[]);return e.jsxs(f,{gap:4,children:[e.jsxs(k,{as:"p",display:"block",font:"label1",children:["Animation Status: ",s]}),e.jsx(i,{children:({calculateProgress:N})=>e.jsx(o,{gap:2,children:e.jsx(r,{onAnimationEnd:v,onAnimationStart:w,progress:N(.2),size:100})})})]})};l.parameters={percy:{enableJavaScript:!0}};const g=()=>e.jsx(i,{children:({calculateProgress:s})=>e.jsxs(o,{flexWrap:"wrap",gap:2,children:[e.jsx("div",{style:{height:"300px",width:"300px"},children:e.jsx(r,{progress:s(0)})}),e.jsx("div",{style:{height:"200px",width:"200px"},children:e.jsx(r,{progress:s(.3)})}),e.jsx("div",{style:{height:"100px",width:"100px"},children:e.jsx(r,{progress:s(.66)})}),e.jsx("div",{style:{height:"75px",width:"75px"},children:e.jsx(r,{progress:s(1)})}),e.jsx("div",{style:{height:"10vw",width:"10vw"},children:e.jsx(r,{progress:s(1)})})]})});g.parameters={percy:{enableJavaScript:!0}};const d=()=>e.jsx(i,{children:({calculateProgress:s})=>e.jsxs(o,{gap:2,children:[e.jsx(r,{color:"fgPrimary",contentNode:e.jsx(b,{color:"fgPrimary",progress:s(.2)}),progress:s(.2),size:100}),e.jsx(r,{color:"fgPositive",contentNode:e.jsx(b,{color:"fgPositive",progress:s(.2)}),progress:s(.2),size:100})]})});d.parameters={percy:{enableJavaScript:!0}};const T="progressCss-p18un3ow",P=()=>e.jsxs(f,{gap:2,children:[e.jsxs(o,{gap:2,children:[e.jsx(r,{contentNode:e.jsx(n,{height:"100%",padding:.25,width:"100%",children:e.jsx(c,{alt:t.eth.name,shape:"circle",source:t.eth.imageUrl,style:{width:"100%",height:"100%"}})}),progress:1,size:a.avatarSize.xxxl,styles:{progress:{stroke:t.eth.color}},weight:"thin"}),e.jsx(r,{contentNode:e.jsx(n,{height:"100%",padding:.25,width:"100%",children:e.jsx(c,{alt:t.ltc.name,shape:"circle",source:t.ltc.imageUrl,style:{width:"100%",height:"100%"}})}),progress:.75,size:a.avatarSize.xxxl,styles:{progress:{stroke:t.ltc.color}},weight:"thin"}),e.jsx(r,{contentNode:e.jsx(n,{height:"100%",padding:.25,width:"100%",children:e.jsx(c,{alt:t.dai.name,shape:"circle",source:t.dai.imageUrl,style:{width:"100%",height:"100%"}})}),progress:.5,size:a.avatarSize.xxxl,styles:{progress:{stroke:t.dai.color}},weight:"thin"}),e.jsx(r,{contentNode:e.jsx(n,{height:"100%",padding:.25,width:"100%",children:e.jsx(c,{alt:t.sushi.name,shape:"circle",source:t.sushi.imageUrl,style:{width:"100%",height:"100%"}})}),progress:.25,size:a.avatarSize.xxxl,styles:{progress:{stroke:t.sushi.color}},weight:"thin"}),e.jsx(r,{contentNode:e.jsx(n,{padding:.25,children:e.jsx(c,{alt:t.xrp.name,shape:"circle",source:t.xrp.imageUrl,style:{width:"100%",height:"100%"}})}),progress:0,size:a.avatarSize.xxxl,styles:{progress:{stroke:t.xrp.color}},weight:"thin"})]}),e.jsx(o,{gap:2,children:A.filter(s=>s!=="s").map(s=>e.jsx(r,{classNames:{progress:T},contentNode:e.jsx(n,{height:"100%",padding:.25,width:"100%",children:e.jsx(c,{alt:t.btc.name,shape:"circle",source:t.btc.imageUrl,style:{width:"100%",height:"100%"}})}),progress:.24,size:a.avatarSize[s],style:{"--strokeColor":t.btc.color},weight:"thin"},`${s}-progress-circle`))})]}),S=()=>{const[s,j]=z.useState(!1);return e.jsxs(f,{gap:2,children:[e.jsxs(o,{gap:2,children:[e.jsx(r,{contentNode:e.jsx(k,{color:s?"fgMuted":"fgPrimary",font:"title1",children:"40%"}),disabled:s,progress:.4,size:100,styles:{circle:{stroke:"transparent"}},weight:"semiheavy"}),e.jsx(r,{color:"fgPositive",contentNode:e.jsx(H,{color:s?"fgMuted":"fgPositive",name:s?"circleCross":"circleCheckmark",size:"l"}),disabled:s,progress:.6,size:100,styles:{progress:{strokeLinecap:"square"}}})]}),e.jsx(_,{onClick:()=>j(!s),children:"Toggle Disabled"})]})},y=()=>e.jsx(i,{children:({calculateProgress:s})=>e.jsxs(o,{gap:2,children:[e.jsx(r,{progress:s(0),size:100,weight:"thin"}),e.jsx(r,{progress:s(.2),size:100,weight:"thin"})]})}),p=()=>e.jsx(i,{children:({calculateProgress:s})=>e.jsx(r,{disableAnimateOnMount:!0,progress:s(.8),size:100})});p.parameters={percy:{enableJavaScript:!0}};h.__docgenInfo={description:"",methods:[],displayName:"Default"};m.__docgenInfo={description:"",methods:[],displayName:"Heavy"};u.__docgenInfo={description:"",methods:[],displayName:"NoText"};x.__docgenInfo={description:"",methods:[],displayName:"Disabled"};C.__docgenInfo={description:"",methods:[],displayName:"Colors"};l.__docgenInfo={description:"",methods:[],displayName:"AnimationCallbacks"};g.__docgenInfo={description:"",methods:[],displayName:"FillParent"};d.__docgenInfo={description:"",methods:[],displayName:"CustomTextColor"};P.__docgenInfo={description:"",methods:[],displayName:"WithAsset"};S.__docgenInfo={description:"",methods:[],displayName:"CustomStyles"};y.__docgenInfo={description:"",methods:[],displayName:"Thin"};p.__docgenInfo={description:"",methods:[],displayName:"DisableAnimateOnMount"};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => {
  return <ProgressContainerWithButtons>
      {({
      calculateProgress
    }) => <HStack gap={2}>
          <ProgressCircle progress={calculateProgress(0)} size={100} />
          <ProgressCircle accessibilityLabel="Custom accessibility label for progress circle" progress={calculateProgress(0.2)} size={100} />
        </HStack>}
    </ProgressContainerWithButtons>;
}`,...h.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => {
  return <ProgressContainerWithButtons>
      {({
      calculateProgress
    }) => <HStack gap={2}>
          <ProgressCircle progress={calculateProgress(0)} size={100} weight="heavy" />
          <ProgressCircle progress={calculateProgress(0.2)} size={100} weight="heavy" />
        </HStack>}
    </ProgressContainerWithButtons>;
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`() => {
  return <ProgressContainerWithButtons>
      {({
      calculateProgress
    }) => <HStack gap={2}>
          <ProgressCircle hideContent progress={calculateProgress(0)} size={100} />
          <ProgressCircle hideContent progress={calculateProgress(0.2)} size={100} />
        </HStack>}
    </ProgressContainerWithButtons>;
}`,...u.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`() => {
  return <HStack gap={2}>
      <ProgressCircle disabled progress={0} size={100} />
      <ProgressCircle disabled progress={0.2} size={100} />
      <ProgressCircle disabled progress={0.6} size={100} />
      <ProgressCircle disabled progress={1} size={100} />
    </HStack>;
}`,...x.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`() => {
  return <HStack gap={2}>
      <ProgressCircle color="bgPositive" progress={0.5} size={100} />
      <ProgressCircle color="bgNegative" progress={0.5} size={100} />
      <ProgressCircle color="bgPrimary" progress={0.5} size={100} />
      <ProgressCircle color="fg" progress={0.5} size={100} />
      <ProgressCircle disabled color="fg" progress={0.5} size={100} />
    </HStack>;
}`,...C.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => {
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
      }) => <HStack gap={2}>
            <ProgressCircle onAnimationEnd={handleAnimationEnd} onAnimationStart={handleAnimationStart} progress={calculateProgress(0.2)} size={100} />
          </HStack>}
      </ProgressContainerWithButtons>
    </VStack>;
}`,...l.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => {
  return <ProgressContainerWithButtons>
      {({
      calculateProgress
    }) => <HStack flexWrap="wrap" gap={2}>
          <div style={{
        height: '300px',
        width: '300px'
      }}>
            <ProgressCircle progress={calculateProgress(0)} />
          </div>
          <div style={{
        height: '200px',
        width: '200px'
      }}>
            <ProgressCircle progress={calculateProgress(0.3)} />
          </div>
          <div style={{
        height: '100px',
        width: '100px'
      }}>
            <ProgressCircle progress={calculateProgress(0.66)} />
          </div>
          <div style={{
        height: '75px',
        width: '75px'
      }}>
            <ProgressCircle progress={calculateProgress(1)} />
          </div>
          <div style={{
        height: '10vw',
        width: '10vw'
      }}>
            <ProgressCircle progress={calculateProgress(1)} />
          </div>
        </HStack>}
    </ProgressContainerWithButtons>;
}`,...g.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => {
  return <ProgressContainerWithButtons>
      {({
      calculateProgress
    }) => <HStack gap={2}>
          <ProgressCircle color="fgPrimary" contentNode={<DefaultProgressCircleContent color="fgPrimary" progress={calculateProgress(0.2)} />} progress={calculateProgress(0.2)} size={100} />
          <ProgressCircle color="fgPositive" contentNode={<DefaultProgressCircleContent color="fgPositive" progress={calculateProgress(0.2)} />} progress={calculateProgress(0.2)} size={100} />
        </HStack>}
    </ProgressContainerWithButtons>;
}`,...d.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`() => {
  return <VStack gap={2}>
      <HStack gap={2}>
        <ProgressCircle contentNode={<Box height="100%" padding={0.25} width="100%">
              <RemoteImage alt={assets.eth.name} shape="circle" source={assets.eth.imageUrl} style={{
          width: '100%',
          height: '100%'
        }} />
            </Box>} progress={1} size={defaultTheme.avatarSize.xxxl} styles={{
        progress: {
          stroke: assets.eth.color
        }
      }} weight="thin" />
        <ProgressCircle contentNode={<Box height="100%" padding={0.25} width="100%">
              <RemoteImage alt={assets.ltc.name} shape="circle" source={assets.ltc.imageUrl} style={{
          width: '100%',
          height: '100%'
        }} />
            </Box>} progress={0.75} size={defaultTheme.avatarSize.xxxl} styles={{
        progress: {
          stroke: assets.ltc.color
        }
      }} weight="thin" />
        <ProgressCircle contentNode={<Box height="100%" padding={0.25} width="100%">
              <RemoteImage alt={assets.dai.name} shape="circle" source={assets.dai.imageUrl} style={{
          width: '100%',
          height: '100%'
        }} />
            </Box>} progress={0.5} size={defaultTheme.avatarSize.xxxl} styles={{
        progress: {
          stroke: assets.dai.color
        }
      }} weight="thin" />
        <ProgressCircle contentNode={<Box height="100%" padding={0.25} width="100%">
              <RemoteImage alt={assets.sushi.name} shape="circle" source={assets.sushi.imageUrl} style={{
          width: '100%',
          height: '100%'
        }} />
            </Box>} progress={0.25} size={defaultTheme.avatarSize.xxxl} styles={{
        progress: {
          stroke: assets.sushi.color
        }
      }} weight="thin" />
        <ProgressCircle contentNode={<Box padding={0.25}>
              <RemoteImage alt={assets.xrp.name} shape="circle" source={assets.xrp.imageUrl} style={{
          width: '100%',
          height: '100%'
        }} />
            </Box>} progress={0} size={defaultTheme.avatarSize.xxxl} styles={{
        progress: {
          stroke: assets.xrp.color
        }
      }} weight="thin" />
      </HStack>
      <HStack gap={2}>
        {avatarSizes.filter(size => size !== 's').map(avatarSize => <ProgressCircle key={\`\${avatarSize}-progress-circle\`} classNames={{
        progress: progressCss
      }} contentNode={<Box height="100%" padding={0.25} width="100%">
                  <RemoteImage alt={assets.btc.name} shape="circle" source={assets.btc.imageUrl} style={{
          width: '100%',
          height: '100%'
        }} />
                </Box>} progress={0.24} size={defaultTheme.avatarSize[avatarSize]} style={{
        '--strokeColor': assets.btc.color
      } as React.CSSProperties} weight="thin" />)}
      </HStack>
    </VStack>;
}`,...P.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => {
  const [disabled, setDisabled] = useState(false);
  return <VStack gap={2}>
      <HStack gap={2}>
        <ProgressCircle contentNode={<Text color={disabled ? 'fgMuted' : 'fgPrimary'} font="title1">
              40%
            </Text>} disabled={disabled} progress={0.4} size={100} styles={{
        circle: {
          stroke: 'transparent'
        }
      }} weight="semiheavy" />
        <ProgressCircle color="fgPositive" contentNode={<Icon color={disabled ? 'fgMuted' : 'fgPositive'} name={disabled ? 'circleCross' : 'circleCheckmark'} size="l" />} disabled={disabled} progress={0.6} size={100} styles={{
        progress: {
          strokeLinecap: 'square'
        }
      }} />
      </HStack>
      <Button onClick={() => setDisabled(!disabled)}>Toggle Disabled</Button>
    </VStack>;
}`,...S.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => {
  return <ProgressContainerWithButtons>
      {({
      calculateProgress
    }) => <HStack gap={2}>
          <ProgressCircle progress={calculateProgress(0)} size={100} weight="thin" />
          <ProgressCircle progress={calculateProgress(0.2)} size={100} weight="thin" />
        </HStack>}
    </ProgressContainerWithButtons>;
}`,...y.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => {
  return <ProgressContainerWithButtons>
      {({
      calculateProgress
    }) => <ProgressCircle disableAnimateOnMount progress={calculateProgress(0.8)} size={100} />}
    </ProgressContainerWithButtons>;
}`,...p.parameters?.docs?.source}}};const ce=["Default","Heavy","NoText","Disabled","Colors","AnimationCallbacks","FillParent","CustomTextColor","WithAsset","CustomStyles","Thin","DisableAnimateOnMount"];export{l as AnimationCallbacks,C as Colors,S as CustomStyles,d as CustomTextColor,h as Default,p as DisableAnimateOnMount,x as Disabled,g as FillParent,m as Heavy,u as NoText,y as Thin,P as WithAsset,ce as __namedExportsOrder,ne as default};
