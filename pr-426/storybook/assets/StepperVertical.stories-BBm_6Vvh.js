import{j as e,r as k}from"./iframe-BXWLBCkp.js";import{S as m,u as H,a as y,b as L,c as N}from"./Stepper-CVZDfnin.js";import{I as P}from"./Icon-CgDQ3NQp.js";import{T as n}from"./Text-Ch_dBU4v.js";import{V as l}from"./VStack-CnEfMFeL.js";import{H as A}from"./HStack-B6p8qBpp.js";import{B as c}from"./Button-W9Shg4T1.js";import{L as O}from"./ListCell-ptUFGvkT.js";import{P as G}from"./Pressable-sl8uFeki.js";import{C as K}from"./Collapsible-DRMWW50B.js";import"./preload-helper-D9Z9MdNV.js";import"./usePreviousValue-Cm2wE0Iw.js";import"./react-spring_web.modern-CUlMypa3.js";import"./index-7N_x-QzT.js";import"./Rect-CybC0zjI.js";import"./useTheme-BJazYlse.js";import"./Spinner-BAI0lrZ-.js";import"./useCellSpacing-BuZVtSR4.js";import"./sizing-Do56D2dQ.js";import"./Cell-CB_dChqK.js";import"./CellAccessory-BypMgxs5.js";import"./isRtl-Du0XdnX5.js";import"./isArray-JxMDBx0e.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./collapsible-BAneA-61.js";import"./tokens-BwScSksM.js";import"./useMotionProps-CS-LE6l8.js";import"./utils-CwomCnHN.js";import"./motion-minimal-SVRWJYUW.js";const a=({steps:t,defaultActiveStepId:s,title:p,initialComplete:r,skipParentSteps:i,renderWithApi:o,...b})=>{const[u,T]=k.useState(0),[d,f]=H({steps:t,defaultActiveStepId:s,skipParentSteps:i}),[S,V]=k.useState(r||!1),B=d.activeStepId?t.findIndex(g=>g.id===d.activeStepId):-1,D=()=>{d.activeStepId===t[t.length-1].id?V(!0):f.goNextStep()},_=()=>{V(!1),f.goPreviousStep()},w=()=>{V(!1),f.reset()},R=()=>{f.goToStep(t[t.length-1].id)},M=()=>{f.goToStep(t[0].id)},F=()=>{V(g=>!g)},W=S?w:D,z=d.activeStepId===null?"Start":S?"Reset":d.activeStepId===t[t.length-1].id?"Finish":"Next";return e.jsxs(l,{gap:2,children:[p&&e.jsx(n,{font:"label1",paddingBottom:2,children:p}),o?o({stepperState:{...d,steps:t,complete:S},stepperApi:f}):e.jsx(m,{direction:"vertical",...b,activeStepId:d.activeStepId,complete:S,steps:t}),e.jsx(l,{gap:2,paddingY:2,children:S?e.jsxs(e.Fragment,{children:[e.jsx(n,{font:"label1",children:"All steps completed!"}),e.jsxs(A,{gap:2,justifyContent:"flex-start",children:[e.jsx(c,{onClick:w,children:"Reset"}),e.jsx(c,{onClick:F,children:"Toggle Complete"})]})]}):e.jsxs(e.Fragment,{children:[e.jsxs(A,{alignItems:"center",gap:2,children:[e.jsxs(n,{font:"label1",children:["Active Step: ",S?"-":d.activeStepId||"None"]}),e.jsx(c,{onClick:()=>T(g=>g+1),children:"Rerender"})]}),e.jsxs(l,{gap:2,children:[e.jsxs(A,{gap:2,justifyContent:"flex-start",children:[e.jsx(c,{disabled:B===0,onClick:_,children:"Back"}),e.jsx(c,{onClick:W,children:z}),e.jsx(c,{disabled:S,onClick:F,children:"Toggle Complete"})]}),e.jsxs(A,{gap:2,justifyContent:"flex-start",children:[e.jsx(c,{onClick:M,children:"First"}),e.jsx(c,{onClick:R,children:"Last"})]})]})]})})]},u)},h=()=>{const t=[{id:"first-step",label:"First step"},{id:"second-step",label:"Second step"},{id:"third-step",label:"Third step"},{id:"final-step",label:"Final step"}];return e.jsx(a,{defaultActiveStepId:t[0].id,steps:t,title:"Default"})},v=()=>{const t=[{id:"first-step",label:"First step"},{id:"second-step",label:"Second step"},{id:"third-step",label:"Third step"},{id:"final-step",label:"Final step"}];return e.jsxs(l,{gap:4,children:[e.jsx(a,{steps:t,title:"No Active Step"}),e.jsx(a,{initialComplete:!0,steps:t,title:"Initial Complete"})]})},x=()=>{const t=[{id:"first-step",label:"First step"},{id:"second-step",label:"Second step",subSteps:[{id:"second-step-substep-one",label:"Substep one"},{id:"second-step-substep-two",label:"Substep two"},{id:"second-step-substep-three",label:"Substep three"}]},{id:"final-step",label:"Final step"}],s=[{id:"first-step",label:"First step"},{id:"second-step",label:"Second step",subSteps:[{id:"second-step-substep-one",label:"Substep one"},{id:"second-step-substep-two",label:"Substep two",subSteps:[{id:"deeply-nested-step-1",label:"Deeply nested step 1"},{id:"deeply-nested-step-2",label:"Deeply nested step 2"}]},{id:"second-step-substep-three",label:"Substep three"}]},{id:"final-step",label:"Final step"}];return e.jsxs(l,{gap:4,children:[e.jsx(a,{accessibilityLabel:"Stepper with substeps",defaultActiveStepId:"first-step",steps:t,title:"One level steps"}),e.jsx(a,{skipParentSteps:!0,accessibilityLabel:"Stepper with substeps",defaultActiveStepId:"first-step",steps:s,title:"Two level steps (w/ skipParentSteps=true)"})]})},Y="progressCss-p12lja1r",q="labelCss-l1cfhz94",C=()=>{const t=[{id:"first-step",label:"First step"},{StepperIconComponent:({active:s,visited:p})=>e.jsx(P,{color:s?"fgNegative":p?"fgPrimary":"fgMuted",name:"addPeople",size:"s"}),id:"second-step",label:"Second step",subSteps:[{id:"second-step-substep-one",label:"Substep one"},{id:"second-step-substep-two",label:"Substep two"},{id:"second-step-substep-three",label:"Substep three"}]},{StepperIconComponent:()=>e.jsx(P,{name:"airdrop",size:"s"}),id:"final-step",label:"Final step"}];return e.jsx(a,{classNames:{label:q,progress:Y},defaultActiveStepId:"first-step",steps:t,title:"Custom Icons & Styles"})},J=({step:t,active:s,depth:p,onPress:r})=>{const{label:i,metadata:o,id:b}=t,u=o?.subtitle;return p===0&&o?e.jsx(O,{description:o.name,detail:o.date,innerSpacing:{paddingTop:0,paddingBottom:0},maxWidth:350,minHeight:void 0,onClick:()=>r(b),outerSpacing:{paddingTop:0,paddingBottom:3,paddingStart:0,paddingEnd:0},subdetail:o.time,title:i}):e.jsxs(G,{flexDirection:"column",gap:1,onClick:()=>r(b),paddingBottom:3,children:[e.jsx(n,{color:s?"fgPrimary":"fg","data-role":"title",font:p===0?"label1":"label2",children:i}),u&&e.jsx(n,{"data-role":"subtitle",font:"label2",children:u})]})},Q=({step:t,active:s,isDescendentActive:p,children:r})=>e.jsx(K,{collapsed:!s&&!p,children:e.jsx(l,{as:"ol",gap:2,children:r})}),I=()=>{const t=[{id:"first-step",label:"Book Hotel",metadata:{name:"Erich",date:"2025-06-13",time:"10:00 AM"}},{id:"second-step",label:"Book Flight",metadata:{name:"Erich",date:"2025-06-13",time:"11:03 AM"}},{id:"third-step",label:"Reserve Rental Car",metadata:{name:"Erich",date:"2025-06-14",time:"02:24 PM"}}],s=[{id:"first-step",label:"First step"},{id:"second-step",label:"Second step",subSteps:[{id:"second-step-substep-one",label:"Substep one"},{id:"second-step-substep-two",label:"Substep two"},{id:"second-step-substep-three",label:"Substep three"}]},{id:"final-step",label:"Final step"}];return e.jsxs(l,{gap:4,children:[e.jsx(a,{initialComplete:!0,defaultActiveStepId:"first-step",renderWithApi:({stepperState:{activeStepId:p,steps:r,complete:i},stepperApi:o})=>e.jsx(m,{StepperLabelComponent:b=>e.jsx(J,{onPress:u=>o.goToStep(u),...b}),accessibilityLabel:"Example Stepper",activeStepId:p,complete:i,direction:"vertical",steps:r}),steps:t,title:"Travel Booking Labels"}),e.jsx(a,{StepperSubstepContainerComponent:Q,defaultActiveStepId:"first-step",steps:s,title:"Collapsible Substeps"})]})},j=()=>{const t=[{id:"first-step",label:"First step"},{id:"second-step",label:"Second step"},{id:"final-step",label:"Final step"}];return e.jsx(a,{defaultActiveStepId:"first-step",renderWithApi:({stepperState:{activeStepId:s,steps:p,complete:r}})=>e.jsxs(l,{gap:4,children:[e.jsxs(l,{children:[e.jsx(n,{font:"label1",paddingBottom:2,children:"Default Render"}),e.jsx(m,{activeStepId:s,complete:r,direction:"vertical",steps:p})]}),e.jsxs(l,{children:[e.jsx(n,{font:"label1",paddingBottom:2,children:"Without Progress Bars"}),e.jsx(m,{StepperProgressComponent:null,activeStepId:s,complete:r,direction:"vertical",steps:p})]}),e.jsxs(l,{children:[e.jsx(n,{font:"label1",paddingBottom:2,children:"Without Labels"}),e.jsx(m,{StepperLabelComponent:null,activeStepId:s,complete:r,direction:"vertical",steps:p})]}),e.jsxs(l,{children:[e.jsx(n,{font:"label1",paddingBottom:2,children:"Without Icons"}),e.jsx(m,{StepperIconComponent:null,activeStepId:s,complete:r,direction:"vertical",steps:p})]})]}),steps:t})},U=k.memo(function(s){const{step:p,visited:r,complete:i}=s;return p.metadata?.isError&&(r||i)?e.jsx(N,{...s,activeColor:"bgNegative",completeColor:"bgNegative",completeName:"circleCross",visitedColor:"bgNegative",visitedName:"circleCross"}):e.jsx(N,{...s})}),X=k.memo(function(s){const{step:p,visited:r,complete:i}=s;return p.metadata?.isError&&(r||i)?e.jsx(L,{...s,activeColor:"fgNegative",completeColor:"fgNegative",visitedColor:"fgNegative"}):e.jsx(L,{...s})}),Z=k.memo(function(s){const{step:p,visited:r,complete:i}=s;return p.metadata?.isError&&(r||i)?e.jsx(y,{...s,completeFill:"bgNegative",visitedFill:"bgNegative"}):e.jsx(y,{...s})}),E=()=>{const t=[{id:"1",label:"Account Details"},{id:"2",label:"Personal Information"},{id:"3",label:"Payment Method",metadata:{isError:!0}},{id:"4",label:"Review & Submit"}];return e.jsx(a,{StepperIconComponent:U,StepperLabelComponent:X,StepperProgressComponent:Z,defaultActiveStepId:"1",steps:t,title:"Custom Error Step (shows error state after step is visited)"})},Fe={title:"Components/Stepper/Vertical",component:m};h.__docgenInfo={description:"",methods:[],displayName:"Default"};v.__docgenInfo={description:"",methods:[],displayName:"NoActiveStep"};x.__docgenInfo={description:"",methods:[],displayName:"NestedSteps"};C.__docgenInfo={description:"",methods:[],displayName:"CustomIconsAndStyles"};I.__docgenInfo={description:"",methods:[],displayName:"CustomComponents"};j.__docgenInfo={description:"",methods:[],displayName:"NullComponents"};E.__docgenInfo={description:"",methods:[],displayName:"CustomErrorStep"};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => {
  const steps: StepperValue[] = [{
    id: 'first-step',
    label: 'First step'
  }, {
    id: 'second-step',
    label: 'Second step'
  }, {
    id: 'third-step',
    label: 'Third step'
  }, {
    id: 'final-step',
    label: 'Final step'
  }];
  return <StepperVerticalExample defaultActiveStepId={steps[0].id} steps={steps} title="Default" />;
}`,...h.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`() => {
  const steps: StepperValue[] = [{
    id: 'first-step',
    label: 'First step'
  }, {
    id: 'second-step',
    label: 'Second step'
  }, {
    id: 'third-step',
    label: 'Third step'
  }, {
    id: 'final-step',
    label: 'Final step'
  }];
  return <VStack gap={4}>
      <StepperVerticalExample steps={steps} title="No Active Step" />
      <StepperVerticalExample initialComplete steps={steps} title="Initial Complete" />
    </VStack>;
}`,...v.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`() => {
  const oneLevelSteps: StepperValue[] = [{
    id: 'first-step',
    label: 'First step'
  }, {
    id: 'second-step',
    label: 'Second step',
    subSteps: [{
      id: 'second-step-substep-one',
      label: 'Substep one'
    }, {
      id: 'second-step-substep-two',
      label: 'Substep two'
    }, {
      id: 'second-step-substep-three',
      label: 'Substep three'
    }]
  }, {
    id: 'final-step',
    label: 'Final step'
  }];
  const twoLevelSteps: StepperValue[] = [{
    id: 'first-step',
    label: 'First step'
  }, {
    id: 'second-step',
    label: 'Second step',
    subSteps: [{
      id: 'second-step-substep-one',
      label: 'Substep one'
    }, {
      id: 'second-step-substep-two',
      label: 'Substep two',
      subSteps: [{
        id: 'deeply-nested-step-1',
        label: 'Deeply nested step 1'
      }, {
        id: 'deeply-nested-step-2',
        label: 'Deeply nested step 2'
      }]
    }, {
      id: 'second-step-substep-three',
      label: 'Substep three'
    }]
  }, {
    id: 'final-step',
    label: 'Final step'
  }];
  return <VStack gap={4}>
      <StepperVerticalExample accessibilityLabel="Stepper with substeps" defaultActiveStepId={'first-step'} steps={oneLevelSteps} title="One level steps" />
      <StepperVerticalExample skipParentSteps accessibilityLabel="Stepper with substeps" defaultActiveStepId={'first-step'} steps={twoLevelSteps} title="Two level steps (w/ skipParentSteps=true)" />
    </VStack>;
}`,...x.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`() => {
  const steps: StepperValue[] = [{
    id: 'first-step',
    label: 'First step'
  }, {
    StepperIconComponent: ({
      active,
      visited
    }) => <Icon color={active ? 'fgNegative' : visited ? 'fgPrimary' : 'fgMuted'} name="addPeople" size="s" />,
    id: 'second-step',
    label: 'Second step',
    subSteps: [{
      id: 'second-step-substep-one',
      label: 'Substep one'
    }, {
      id: 'second-step-substep-two',
      label: 'Substep two'
    }, {
      id: 'second-step-substep-three',
      label: 'Substep three'
    }]
  }, {
    StepperIconComponent: () => <Icon name="airdrop" size="s" />,
    id: 'final-step',
    label: 'Final step'
  }];
  return <StepperVerticalExample classNames={{
    label: labelCss,
    progress: progressCss
  }} defaultActiveStepId={'first-step'} steps={steps} title="Custom Icons & Styles" />;
}`,...C.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`() => {
  const travelBookingSteps: StepperValue<BookingMetadata>[] = [{
    id: 'first-step',
    label: 'Book Hotel',
    metadata: {
      name: 'Erich',
      date: '2025-06-13',
      time: '10:00 AM'
    }
  }, {
    id: 'second-step',
    label: 'Book Flight',
    metadata: {
      name: 'Erich',
      date: '2025-06-13',
      time: '11:03 AM'
    }
  }, {
    id: 'third-step',
    label: 'Reserve Rental Car',
    metadata: {
      name: 'Erich',
      date: '2025-06-14',
      time: '02:24 PM'
    }
  }];
  const oneLevelSteps: StepperValue[] = [{
    id: 'first-step',
    label: 'First step'
  }, {
    id: 'second-step',
    label: 'Second step',
    subSteps: [{
      id: 'second-step-substep-one',
      label: 'Substep one'
    }, {
      id: 'second-step-substep-two',
      label: 'Substep two'
    }, {
      id: 'second-step-substep-three',
      label: 'Substep three'
    }]
  }, {
    id: 'final-step',
    label: 'Final step'
  }];
  return <VStack gap={4}>
      <StepperVerticalExample initialComplete defaultActiveStepId={'first-step'} renderWithApi={({
      stepperState: {
        activeStepId,
        steps,
        complete
      },
      stepperApi
    }) => {
      return <Stepper StepperLabelComponent={props => {
        return <TravelBookingLabel onPress={id => stepperApi.goToStep(id)} {...props} />;
      }} accessibilityLabel="Example Stepper" activeStepId={activeStepId} complete={complete} direction="vertical" steps={steps} />;
    }} steps={travelBookingSteps} title="Travel Booking Labels" />
      <StepperVerticalExample StepperSubstepContainerComponent={CollapsibleSubsteps} defaultActiveStepId={'first-step'} steps={oneLevelSteps} title="Collapsible Substeps" />
    </VStack>;
}`,...I.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`() => {
  const steps: StepperValue[] = [{
    id: 'first-step',
    label: 'First step'
  }, {
    id: 'second-step',
    label: 'Second step'
  }, {
    id: 'final-step',
    label: 'Final step'
  }];
  return <StepperVerticalExample defaultActiveStepId={'first-step'} renderWithApi={({
    stepperState: {
      activeStepId,
      steps,
      complete
    }
  }) => {
    return <VStack gap={4}>
            <VStack>
              <Text font="label1" paddingBottom={2}>
                Default Render
              </Text>
              <Stepper activeStepId={activeStepId} complete={complete} direction="vertical" steps={steps} />
            </VStack>
            <VStack>
              <Text font="label1" paddingBottom={2}>
                Without Progress Bars
              </Text>
              <Stepper StepperProgressComponent={null} activeStepId={activeStepId} complete={complete} direction="vertical" steps={steps} />
            </VStack>
            <VStack>
              <Text font="label1" paddingBottom={2}>
                Without Labels
              </Text>
              <Stepper StepperLabelComponent={null} activeStepId={activeStepId} complete={complete} direction="vertical" steps={steps} />
            </VStack>
            <VStack>
              <Text font="label1" paddingBottom={2}>
                Without Icons
              </Text>
              <Stepper StepperIconComponent={null} activeStepId={activeStepId} complete={complete} direction="vertical" steps={steps} />
            </VStack>
          </VStack>;
  }} steps={steps} />;
}`,...j.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`() => {
  const steps: StepperValue<ErrorStepMetadata>[] = [{
    id: '1',
    label: 'Account Details'
  }, {
    id: '2',
    label: 'Personal Information'
  }, {
    id: '3',
    label: 'Payment Method',
    metadata: {
      isError: true
    }
  }, {
    id: '4',
    label: 'Review & Submit'
  }];
  return <StepperVerticalExample StepperIconComponent={ErrorStepperIcon} StepperLabelComponent={ErrorStepperLabel} StepperProgressComponent={ErrorStepperProgress} defaultActiveStepId={'1'} steps={steps} title="Custom Error Step (shows error state after step is visited)" />;
}`,...E.parameters?.docs?.source}}};const ye=["Default","NoActiveStep","NestedSteps","CustomIconsAndStyles","CustomComponents","NullComponents","CustomErrorStep"];export{I as CustomComponents,E as CustomErrorStep,C as CustomIconsAndStyles,h as Default,x as NestedSteps,v as NoActiveStep,j as NullComponents,ye as __namedExportsOrder,Fe as default};
