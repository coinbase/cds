import{j as e,B as t,r as u}from"./iframe-CYDANtMt.js";import{e as y}from"./assets-CEwpm_uP.js";import{V as m}from"./VStack-iXgNewwv.js";import{D as r}from"./DataCard-BcQBuIjZ.js";import{P as i}from"./ProgressBarWithFixedLabels-D0bmXmhS.js";import{P as o}from"./ProgressBar-DdCD9RPU.js";import{P as l}from"./ProgressCircle-Cb-3SgM3.js";import{T as s}from"./Text-0g3rWpAf.js";import{R as C}from"./RemoteImage-S3YFINhn.js";import"./preload-helper-D9Z9MdNV.js";import"./CardRoot-D_J2NNQH.js";import"./HStack-Fh-9TmPm.js";import"./Pressable-BvczHaFK.js";import"./isArray-BJmyNVUi.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";import"./useTheme-C_Ehsh33.js";import"./isRtl-CGZsgYct.js";import"./ProgressTextLabel-hkkBVb_E.js";import"./useProgressSize-WBWVKgvy.js";import"./usePreviousValues-CzZr0hLN.js";import"./tokens-BwScSksM.js";import"./useMotionProps-BF3bCUsm.js";import"./utils-CM_X5is-.js";import"./motion-minimal-B1h7XI-_.js";import"./VisualizationContainer-CbisFAIn.js";import"./useDimensions-C4mzPCUe.js";const a=e.jsx(C,{accessibilityLabel:"Ethereum",shape:"circle",size:"l",source:y,testID:"thumbnail"}),n=p=>e.jsxs(s,{color:"fgMuted",font:"legal",children:[p,"%"]}),c=()=>e.jsxs(m,{gap:2,width:480,children:[e.jsx(r,{layout:"vertical",subtitle:"Progress indicator",thumbnail:a,title:"Progress Bar Card",titleAccessory:e.jsx(s,{dangerouslySetColor:"rgb(var(--green70))",font:"label1",children:"↗ 25.25%"}),children:e.jsx(t,{paddingTop:6,children:e.jsx(i,{labelPlacement:"below",startLabel:{value:45,render:n},children:e.jsx(o,{accessibilityLabel:"45% complete",progress:.45,weight:"semiheavy"})})})}),e.jsx(r,{layout:"horizontal",subtitle:"Circular progress",thumbnail:a,title:"Progress Circle Card",titleAccessory:e.jsx(s,{color:"fgNegative",font:"label1",children:"↘ 3.12%"}),children:e.jsx(t,{alignItems:"center",height:"100%",children:e.jsx(l,{accessibilityLabel:"60% complete",progress:.6,size:100,weight:"heavy"})})}),e.jsx(r,{layout:"horizontal",subtitle:"Circular progress",thumbnail:a,title:"Progress Circle Card with very very very very very long title",titleAccessory:e.jsx(s,{color:"fgNegative",font:"label1",children:"↘ 1.8%"}),children:e.jsx(t,{alignItems:"center",height:"100%",children:e.jsx(l,{accessibilityLabel:"60% complete",progress:.6,size:100,weight:"heavy"})})})]}),g=()=>e.jsxs(m,{gap:2,width:480,children:[e.jsx(r,{layout:"vertical",subtitle:"High progress with tag",thumbnail:a,title:"High Progress",titleAccessory:e.jsx(s,{dangerouslySetColor:"rgb(var(--green70))",font:"label1",children:"↗ 25.25%"}),children:e.jsx(t,{paddingTop:6,children:e.jsx(i,{labelPlacement:"below",startLabel:{value:90,render:n},children:e.jsx(o,{accessibilityLabel:"90% complete",color:"fgPositive",progress:.9,weight:"semiheavy"})})})}),e.jsx(r,{layout:"horizontal",subtitle:"Below target",thumbnail:a,title:"Below Target",titleAccessory:e.jsx(s,{color:"fgNegative",font:"label1",children:"↘ 5.2%"}),children:e.jsx(t,{alignItems:"center",height:"100%",children:e.jsx(l,{accessibilityLabel:"95% complete",color:"fgPositive",progress:.95,size:100,weight:"heavy"})})}),e.jsx(r,{layout:"horizontal",subtitle:"Different size",thumbnail:a,title:"Smaller Circle",children:e.jsx(t,{alignItems:"center",height:"100%",children:e.jsx(l,{accessibilityLabel:"75% complete",progress:.75,size:80,weight:"heavy"})})})]}),d=()=>{const p=u.useRef(null),x=u.useRef(null);return e.jsxs(m,{gap:2,width:480,children:[e.jsx(r,{ref:p,renderAsPressable:!0,"aria-label":"View progress bar details",layout:"vertical",onClick:()=>alert("Progress bar card clicked!"),subtitle:"Clickable progress card",thumbnail:a,title:"Progress Bar with Button",titleAccessory:e.jsx(s,{dangerouslySetColor:"rgb(var(--green70))",font:"label1",children:"↗ 8.5%"}),children:e.jsx(t,{paddingTop:6,children:e.jsx(i,{labelPlacement:"below",startLabel:{value:75,render:n},children:e.jsx(o,{accessibilityLabel:"75% complete",progress:.75,weight:"semiheavy"})})})}),e.jsx(r,{ref:x,renderAsPressable:!0,"aria-label":"View progress circle details on Coinbase",as:"a",href:"https://www.coinbase.com",layout:"horizontal",subtitle:"Clickable progress circle card with link",target:"_blank",thumbnail:a,title:"Progress Circle with Link",titleAccessory:e.jsx(s,{dangerouslySetColor:"rgb(var(--green70))",font:"label1",children:"↗ 8.5%"}),children:e.jsx(t,{alignItems:"center",height:"100%",children:e.jsx(l,{accessibilityLabel:"85% complete",progress:.85,size:100,weight:"heavy"})})})]})},h=()=>e.jsxs(m,{gap:2,width:480,children:[e.jsx(r,{layout:"vertical",styles:{root:{borderWidth:2,borderColor:"#0066FF"}},subtitle:"Custom border",thumbnail:a,title:"Custom Root Styles",children:e.jsx(t,{paddingTop:6,children:e.jsx(i,{labelPlacement:"below",startLabel:{value:50,render:n},children:e.jsx(o,{accessibilityLabel:"50% complete",progress:.5,weight:"semiheavy"})})})}),e.jsx(r,{layout:"horizontal",styles:{root:{backgroundColor:"#F5F5F5"},headerContainer:{paddingInlineStart:"var(--space-4)"}},subtitle:"Custom background and padding",thumbnail:a,title:"Custom Layout Styles",children:e.jsx(t,{alignItems:"center",height:"100%",children:e.jsx(l,{accessibilityLabel:"70% complete",progress:.7,size:100,weight:"heavy"})})}),e.jsx(r,{layout:"vertical",styles:{root:{minHeight:200},layoutContainer:{gap:"var(--space-3)"},titleContainer:{paddingBottom:"var(--space-2)"}},subtitle:"Custom spacing and height",thumbnail:a,title:"Multiple Style Overrides",children:e.jsx(t,{paddingTop:6,children:e.jsx(i,{labelPlacement:"below",startLabel:{value:80,render:n},children:e.jsx(o,{accessibilityLabel:"80% complete",progress:.8,weight:"semiheavy"})})})})]}),b=()=>e.jsxs(m,{gap:2,width:480,children:[e.jsx(r,{layout:"vertical",subtitle:"Progress tracking",thumbnail:a,title:"Card 1",children:e.jsx(t,{paddingTop:6,children:e.jsx(i,{labelPlacement:"below",startLabel:{value:30,render:n},children:e.jsx(o,{accessibilityLabel:"30% complete",progress:.3,weight:"semiheavy"})})})}),e.jsx(r,{layout:"horizontal",subtitle:"Completion status",thumbnail:a,title:"Card 2",titleAccessory:e.jsx(s,{dangerouslySetColor:"rgb(var(--green70))",font:"label1",children:"↗ 25.25%"}),children:e.jsx(t,{alignItems:"center",height:"100%",children:e.jsx(l,{accessibilityLabel:"95% complete",progress:.95,size:120,weight:"heavy"})})})]}),G={title:"Components/Alpha/DataCard",component:r};c.__docgenInfo={description:"",methods:[],displayName:"BasicExamples"};g.__docgenInfo={description:"",methods:[],displayName:"Features"};d.__docgenInfo={description:"",methods:[],displayName:"Interactive"};h.__docgenInfo={description:"",methods:[],displayName:"StyleOverrides"};b.__docgenInfo={description:"",methods:[],displayName:"MultipleCards"};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`(): JSX.Element => {
  return <VStack gap={2} width={480}>
      <DataCard layout="vertical" subtitle="Progress indicator" thumbnail={exampleThumbnail} title="Progress Bar Card" titleAccessory={<Text dangerouslySetColor="rgb(var(--green70))" font="label1">
            ↗ 25.25%
          </Text>}>
        <Box paddingTop={6}>
          <ProgressBarWithFixedLabels labelPlacement="below" startLabel={{
          value: 45,
          render: renderProgressLabel
        }}>
            <ProgressBar accessibilityLabel="45% complete" progress={0.45} weight="semiheavy" />
          </ProgressBarWithFixedLabels>
        </Box>
      </DataCard>
      <DataCard layout="horizontal" subtitle="Circular progress" thumbnail={exampleThumbnail} title="Progress Circle Card" titleAccessory={<Text color="fgNegative" font="label1">
            ↘ 3.12%
          </Text>}>
        <Box alignItems="center" height="100%">
          <ProgressCircle accessibilityLabel="60% complete" progress={0.6} size={100} weight="heavy" />
        </Box>
      </DataCard>
      <DataCard layout="horizontal" subtitle="Circular progress" thumbnail={exampleThumbnail} title="Progress Circle Card with very very very very very long title" titleAccessory={<Text color="fgNegative" font="label1">
            ↘ 1.8%
          </Text>}>
        <Box alignItems="center" height="100%">
          <ProgressCircle accessibilityLabel="60% complete" progress={0.6} size={100} weight="heavy" />
        </Box>
      </DataCard>
    </VStack>;
}`,...c.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`(): JSX.Element => {
  return <VStack gap={2} width={480}>
      <DataCard layout="vertical" subtitle="High progress with tag" thumbnail={exampleThumbnail} title="High Progress" titleAccessory={<Text dangerouslySetColor="rgb(var(--green70))" font="label1">
            ↗ 25.25%
          </Text>}>
        <Box paddingTop={6}>
          <ProgressBarWithFixedLabels labelPlacement="below" startLabel={{
          value: 90,
          render: renderProgressLabel
        }}>
            <ProgressBar accessibilityLabel="90% complete" color="fgPositive" progress={0.9} weight="semiheavy" />
          </ProgressBarWithFixedLabels>
        </Box>
      </DataCard>
      <DataCard layout="horizontal" subtitle="Below target" thumbnail={exampleThumbnail} title="Below Target" titleAccessory={<Text color="fgNegative" font="label1">
            ↘ 5.2%
          </Text>}>
        <Box alignItems="center" height="100%">
          <ProgressCircle accessibilityLabel="95% complete" color="fgPositive" progress={0.95} size={100} weight="heavy" />
        </Box>
      </DataCard>
      <DataCard layout="horizontal" subtitle="Different size" thumbnail={exampleThumbnail} title="Smaller Circle">
        <Box alignItems="center" height="100%">
          <ProgressCircle accessibilityLabel="75% complete" progress={0.75} size={80} weight="heavy" />
        </Box>
      </DataCard>
    </VStack>;
}`,...g.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`(): JSX.Element => {
  const ref1 = useRef<HTMLButtonElement>(null);
  const ref2 = useRef<HTMLAnchorElement>(null);
  return <VStack gap={2} width={480}>
      <DataCard ref={ref1} renderAsPressable aria-label="View progress bar details" layout="vertical" onClick={() => alert('Progress bar card clicked!')} subtitle="Clickable progress card" thumbnail={exampleThumbnail} title="Progress Bar with Button" titleAccessory={<Text dangerouslySetColor="rgb(var(--green70))" font="label1">
            ↗ 8.5%
          </Text>}>
        <Box paddingTop={6}>
          <ProgressBarWithFixedLabels labelPlacement="below" startLabel={{
          value: 75,
          render: renderProgressLabel
        }}>
            <ProgressBar accessibilityLabel="75% complete" progress={0.75} weight="semiheavy" />
          </ProgressBarWithFixedLabels>
        </Box>
      </DataCard>
      <DataCard ref={ref2} renderAsPressable aria-label="View progress circle details on Coinbase" as="a" href="https://www.coinbase.com" layout="horizontal" subtitle="Clickable progress circle card with link" target="_blank" thumbnail={exampleThumbnail} title="Progress Circle with Link" titleAccessory={<Text dangerouslySetColor="rgb(var(--green70))" font="label1">
            ↗ 8.5%
          </Text>}>
        <Box alignItems="center" height="100%">
          <ProgressCircle accessibilityLabel="85% complete" progress={0.85} size={100} weight="heavy" />
        </Box>
      </DataCard>
    </VStack>;
}`,...d.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`(): JSX.Element => {
  return <VStack gap={2} width={480}>
      <DataCard layout="vertical" styles={{
      root: {
        borderWidth: 2,
        borderColor: '#0066FF'
      }
    }} subtitle="Custom border" thumbnail={exampleThumbnail} title="Custom Root Styles">
        <Box paddingTop={6}>
          <ProgressBarWithFixedLabels labelPlacement="below" startLabel={{
          value: 50,
          render: renderProgressLabel
        }}>
            <ProgressBar accessibilityLabel="50% complete" progress={0.5} weight="semiheavy" />
          </ProgressBarWithFixedLabels>
        </Box>
      </DataCard>
      <DataCard layout="horizontal" styles={{
      root: {
        backgroundColor: '#F5F5F5'
      },
      headerContainer: {
        paddingInlineStart: 'var(--space-4)'
      }
    }} subtitle="Custom background and padding" thumbnail={exampleThumbnail} title="Custom Layout Styles">
        <Box alignItems="center" height="100%">
          <ProgressCircle accessibilityLabel="70% complete" progress={0.7} size={100} weight="heavy" />
        </Box>
      </DataCard>
      <DataCard layout="vertical" styles={{
      root: {
        minHeight: 200
      },
      layoutContainer: {
        gap: 'var(--space-3)'
      },
      titleContainer: {
        paddingBottom: 'var(--space-2)'
      }
    }} subtitle="Custom spacing and height" thumbnail={exampleThumbnail} title="Multiple Style Overrides">
        <Box paddingTop={6}>
          <ProgressBarWithFixedLabels labelPlacement="below" startLabel={{
          value: 80,
          render: renderProgressLabel
        }}>
            <ProgressBar accessibilityLabel="80% complete" progress={0.8} weight="semiheavy" />
          </ProgressBarWithFixedLabels>
        </Box>
      </DataCard>
    </VStack>;
}`,...h.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`(): JSX.Element => {
  return <VStack gap={2} width={480}>
      <DataCard layout="vertical" subtitle="Progress tracking" thumbnail={exampleThumbnail} title="Card 1">
        <Box paddingTop={6}>
          <ProgressBarWithFixedLabels labelPlacement="below" startLabel={{
          value: 30,
          render: renderProgressLabel
        }}>
            <ProgressBar accessibilityLabel="30% complete" progress={0.3} weight="semiheavy" />
          </ProgressBarWithFixedLabels>
        </Box>
      </DataCard>
      <DataCard layout="horizontal" subtitle="Completion status" thumbnail={exampleThumbnail} title="Card 2" titleAccessory={<Text dangerouslySetColor="rgb(var(--green70))" font="label1">
            ↗ 25.25%
          </Text>}>
        <Box alignItems="center" height="100%">
          <ProgressCircle accessibilityLabel="95% complete" progress={0.95} size={120} weight="heavy" />
        </Box>
      </DataCard>
    </VStack>;
}`,...b.parameters?.docs?.source}}};const K=["BasicExamples","Features","Interactive","StyleOverrides","MultipleCards"];export{c as BasicExamples,g as Features,d as Interactive,b as MultipleCards,h as StyleOverrides,K as __namedExportsOrder,G as default};
