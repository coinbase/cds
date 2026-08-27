import{j as e}from"./iframe-CYDANtMt.js";import{b as P}from"./assets-CEwpm_uP.js";import{B as N}from"./Button-DPtA13Wn.js";import{H as g}from"./HStack-Fh-9TmPm.js";import{V as p}from"./VStack-iXgNewwv.js";import{T as x}from"./Text-0g3rWpAf.js";import{N as s}from"./NudgeCard-BLZFKiuz.js";import{R as f}from"./RemoteImage-S3YFINhn.js";import"./preload-helper-D9Z9MdNV.js";import"./Icon-DRxKkZdt.js";import"./useTheme-C_Ehsh33.js";import"./Spinner-CXotWqqb.js";import"./Pressable-BvczHaFK.js";import"./isArray-BJmyNVUi.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";import"./IconButton-D-CYL-b9.js";import"./Pictogram-BOyJGVDK.js";import"./versionMap-CcI7tU1w.js";import"./createIllustration-CSKQDVzw.js";import"./convertDimensionToSize-B6MeOypY.js";const o={title:"It's Onchain Summer!",description:"Stand with crypto and mint your NFT. ",pictogram:"key",action:"Join the movement",onActionPress:()=>{}},l={title:"Try this new thing",description:"It will take you to the moon, I promise. WAGMI!",pictogram:"key",action:void 0,onActionPress:void 0},C={action:"Do the thing",title:"Long title text that will overflow to the next line",description:"This is a super long description that will increase the height of the card to automagically fit the content.",numberOfLines:4,pictogram:"addWallet"},u={title:"It's Onchain Summer!",description:"Stand with crypto and mint your NFT. ",action:"Join the movement",onActionPress:()=>{},media:e.jsx(f,{alt:"Person illustration",source:P.human2,width:60})},h={title:"Try this new thing",description:"It will take you to the moon, I promise. WAGMI!",action:void 0,onActionPress:void 0,media:e.jsx(f,{alt:"Person illustration",source:P.human3,width:60})},t=()=>e.jsxs(p,{gap:2,children:[e.jsx(s,{...o}),e.jsx(s,{...o,onDismissPress:()=>{}}),e.jsx(s,{...o,mediaPosition:"left"}),e.jsx(s,{...o,mediaPosition:"left",onDismissPress:()=>{}})]}),i=()=>e.jsxs(p,{gap:2,children:[e.jsx(s,{...l}),e.jsx(s,{...l,onDismissPress:()=>{}}),e.jsx(s,{...l,mediaPosition:"left"})," ",e.jsx(s,{...l,mediaPosition:"left",onDismissPress:()=>{}})]}),r=()=>e.jsxs(p,{gap:2,children:[e.jsx(s,{...u}),e.jsx(s,{...u,onDismissPress:()=>{}}),e.jsx(s,{...h}),e.jsx(s,{...h,onDismissPress:()=>{}}),e.jsx(s,{...u,mediaPosition:"left"}),e.jsx(s,{...u,mediaPosition:"left",onDismissPress:()=>{}})]}),a=()=>e.jsxs(g,{gap:2,children:[e.jsx(s,{...C}),e.jsx(s,{description:"I'll get truncated after one line",numberOfLines:1,pictogram:"addCard",title:"I can be multiple lines long even if my description is not"})]}),n=()=>e.jsxs(p,{gap:2,children:[e.jsx(s,{...o}),e.jsx(s,{...o}),e.jsx(s,{...o})]}),d=()=>e.jsxs(g,{gap:2,overflow:"scroll",children:[e.jsx(s,{...o,onDismissPress:()=>{}}),e.jsx(s,{...C,numberOfLines:3,onDismissPress:()=>{}}),e.jsx(s,{...o})]}),m=()=>e.jsxs(p,{gap:2,children:[e.jsx(s,{...o,height:150,minHeight:150,minWidth:250,numberOfLines:1,width:250}),e.jsx(s,{...o,minWidth:380,numberOfLines:1,width:380}),e.jsx(s,{...o,maxHeight:150,maxWidth:250,numberOfLines:1}),e.jsx(s,{...o,width:"100%"}),e.jsx(s,{...o,mediaPosition:"left",width:"100%"})]}),c=()=>e.jsx(s,{...o,action:e.jsx(g,{paddingBottom:1,children:e.jsx(N,{compact:!0,onClick:()=>{},children:"Custom action"})}),description:e.jsx(x,{as:"p",color:"fgMuted",display:"block",font:"body",children:"Custom description"}),title:e.jsx(x,{as:"h3",color:"fgPrimary",display:"block",font:"headline",children:"Custom title"})}),F={title:"Components/Cards/NudgeCard",component:t};t.__docgenInfo={description:"",methods:[],displayName:"Default"};i.__docgenInfo={description:"",methods:[],displayName:"Compact"};r.__docgenInfo={description:"",methods:[],displayName:"CustomMedia"};a.__docgenInfo={description:"",methods:[],displayName:"LongText"};n.__docgenInfo={description:"",methods:[],displayName:"VerticallyStacked"};d.__docgenInfo={description:"",methods:[],displayName:"Carousel"};m.__docgenInfo={description:"",methods:[],displayName:"CustomDimensions"};c.__docgenInfo={description:"",methods:[],displayName:"CustomTextNodes"};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => <VStack gap={2}>
    <NudgeCard {...exampleProps} />
    <NudgeCard {...exampleProps} onDismissPress={() => {}} />
    <NudgeCard {...exampleProps} mediaPosition="left" />
    <NudgeCard {...exampleProps} mediaPosition="left" onDismissPress={() => {}} />
  </VStack>`,...t.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => <VStack gap={2}>
    <NudgeCard {...compactProps} />
    <NudgeCard {...compactProps} onDismissPress={() => {}} />
    <NudgeCard {...compactProps} mediaPosition="left" />{' '}
    <NudgeCard {...compactProps} mediaPosition="left" onDismissPress={() => {}} />
  </VStack>`,...i.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => <VStack gap={2}>
    <NudgeCard {...exampleMediaProps} />
    <NudgeCard {...exampleMediaProps} onDismissPress={() => {}} />
    <NudgeCard {...compactMediaProps} />
    <NudgeCard {...compactMediaProps} onDismissPress={() => {}} />
    <NudgeCard {...exampleMediaProps} mediaPosition="left" />
    <NudgeCard {...exampleMediaProps} mediaPosition="left" onDismissPress={() => {}} />
  </VStack>`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => <HStack gap={2}>
    <NudgeCard {...longProps} />
    <NudgeCard description="I'll get truncated after one line" numberOfLines={1} pictogram="addCard" title="I can be multiple lines long even if my description is not" />
  </HStack>`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => <VStack gap={2}>
    <NudgeCard {...exampleProps} />
    <NudgeCard {...exampleProps} />
    <NudgeCard {...exampleProps} />
  </VStack>`,...n.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => <HStack gap={2} overflow="scroll">
    <NudgeCard {...exampleProps} onDismissPress={() => {}} />
    <NudgeCard {...longProps} numberOfLines={3} onDismissPress={() => {}} />
    <NudgeCard {...exampleProps} />
  </HStack>`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => <VStack gap={2}>
    <NudgeCard {...exampleProps} height={150} minHeight={150} minWidth={250} numberOfLines={1} width={250} />
    <NudgeCard {...exampleProps} minWidth={380} numberOfLines={1} width={380} />
    <NudgeCard {...exampleProps} maxHeight={150} maxWidth={250} numberOfLines={1} />
    <NudgeCard {...exampleProps} width="100%" />
    <NudgeCard {...exampleProps} mediaPosition="left" width="100%" />
  </VStack>`,...m.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => <NudgeCard {...exampleProps} action={<HStack paddingBottom={1}>
        <Button compact onClick={() => {}}>
          Custom action
        </Button>
      </HStack>} description={<Text as="p" color="fgMuted" display="block" font="body">
        Custom description
      </Text>} title={<Text as="h3" color="fgPrimary" display="block" font="headline">
        Custom title
      </Text>} />`,...c.parameters?.docs?.source}}};const G=["Default","Compact","CustomMedia","LongText","VerticallyStacked","Carousel","CustomDimensions","CustomTextNodes"];export{d as Carousel,i as Compact,m as CustomDimensions,r as CustomMedia,c as CustomTextNodes,t as Default,a as LongText,n as VerticallyStacked,G as __namedExportsOrder,F as default};
