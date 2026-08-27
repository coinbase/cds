import{r as P,j as e,c as j,B as o}from"./iframe-CYDANtMt.js";import{a as T}from"./assets-CEwpm_uP.js";import{u as w}from"./useBreakpoints-Bxk0TUW-.js";import{p as S,P as W}from"./PageFooter-uH4cWmSR.js";import{G}from"./Grid-BDV7e3L3.js";import{T as r}from"./Text-0g3rWpAf.js";import{V as c}from"./VStack-iXgNewwv.js";import{D as s}from"./Divider-CG0S6-JI.js";import{H as _}from"./HeroSquare-B35mXHPA.js";import{I as l}from"./IconButton-D-CYL-b9.js";import{B}from"./ButtonGroup-DXyqnMoL.js";import{B as k}from"./Button-DPtA13Wn.js";import{H as I}from"./HStack-Fh-9TmPm.js";import{L as N}from"./Link-Bl0BbAK9.js";import{L as q}from"./LogoMark-CqIA3pam.js";import{R as A}from"./RemoteImage-S3YFINhn.js";import"./preload-helper-D9Z9MdNV.js";import"./versionMap-D-9tPUoj.js";import"./createIllustration-CSKQDVzw.js";import"./convertDimensionToSize-B6MeOypY.js";import"./useTheme-C_Ehsh33.js";import"./Icon-DRxKkZdt.js";import"./Spinner-CXotWqqb.js";import"./Pressable-BvczHaFK.js";import"./isArray-BJmyNVUi.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";import"./useMergeRefs-DR4sGa7m.js";const R="gridStylesMobileTitleCss-g54vqgv",Y="gridStylesMobileEndCss-gwg0qwc",X={phone:3,tablet:4,desktop:4},F={phone:3,tablet:4,desktop:4},a=P.memo(P.forwardRef(function({start:i,end:p,title:x,overflow:H="auto",role:v="banner",templateColumns:L="auto 1fr auto",styles:y,style:C,classNames:h,className:E,...M},D){const V=P.useMemo(()=>({phone:i&&!p?0:3,tablet:i?0:4,desktop:i?0:4}),[i,p]);return e.jsxs(G,{ref:D,className:j(E,h?.root),overflow:H,role:v,style:{...C,...y?.root},templateColumns:L,...M,children:[!!i&&e.jsx(o,{alignItems:"center",className:h?.start,height:S,paddingEnd:3,paddingStart:X,style:y?.start,children:i}),!!x&&e.jsx(o,{alignItems:"center",className:j(i&&p?R:void 0,h?.title),justifyContent:"flex-start",paddingStart:V,style:y?.title,testID:"responsive-title-container",children:typeof x=="string"?e.jsx(r,{as:"h1",display:"block",font:"title1",children:x}):x}),!!p&&e.jsx(o,{alignItems:"center",className:j(Y,h?.end),height:S,justifyContent:"flex-end",paddingX:F,style:y?.end,testID:"responsive-end-container",children:p})]})}));a.__docgenInfo={description:"",methods:[],displayName:"PageHeader",props:{overflow:{defaultValue:{value:"'auto'",computed:!1},required:!1},role:{defaultValue:{value:"'banner'",computed:!1},required:!1},templateColumns:{defaultValue:{value:"'auto 1fr auto'",computed:!1},required:!1}}};const f={start:{paddingLeft:"calc(var(--space-1_5) + var(--space-1))"}},n={end:{paddingRight:"calc(var(--space-1_5) + var(--space-1))"}},t={logoMark1:e.jsx(A,{alt:"btcLogoImage",shape:"circle",size:"m",source:T.btc.imageUrl}),logoMark2:e.jsx(q,{size:32}),start1:e.jsx(o,{children:e.jsx(l,{transparent:!0,accessibilityLabel:"Go Back",name:"backArrow",onClick:()=>{},testID:"header-back-button"})}),start2:e.jsx(o,{children:e.jsx(l,{accessibilityLabel:"Go Back",name:"backArrow",onClick:()=>{},testID:"header-back-button"})}),title1:e.jsx(r,{as:"h1",display:"block",font:"title1",children:"Page Title"}),title2:e.jsx(o,{flexGrow:1,flexShrink:1,justifyContent:"center",children:e.jsx(r,{as:"h1",display:"block",font:"title1",numberOfLines:1,children:"Centered Title"})}),title3:e.jsx(r,{as:"h3",display:"block",font:"title1",numberOfLines:1,children:"Title"}),intermediary1:e.jsx(r,{as:"h1",display:"block",font:"headline",children:"Intermediary Content"}),intermediary2:e.jsx(o,{dangerouslySetBackground:"red",children:e.jsx(r,{as:"sub",font:"body",children:"Hello there. This is a rather long text sentence since I do not have lorem ipsum handy. Hello there. This is a rather long text sentence since I do not have lorem ipsum handy."})}),end1:e.jsx(l,{active:!0,transparent:!0,accessibilityLabel:"Show info",name:"info",onClick:()=>{},testID:"header-info-button"}),end2:e.jsxs(I,{alignItems:"center",gap:2,children:[e.jsx(N,{href:"https://cds.coinbase.com/components/link",children:e.jsx(r,{as:"p",color:"fgPrimary",display:"block",font:"headline",children:"Help"})}),e.jsxs(I,{gap:1,children:[e.jsx(l,{transparent:!0,accessibilityLabel:"Share",name:"externalLink",onClick:()=>{},testID:"header-external-link-button"}),e.jsx(l,{transparent:!0,accessibilityLabel:"Close",name:"close",onClick:()=>{},testID:"header-close-button"})]})]}),end3:e.jsx(l,{transparent:!0,accessibilityLabel:"Close",name:"close",onClick:()=>{},testID:"header-close-button"}),end4:e.jsx(l,{accessibilityLabel:"Close",name:"close",onClick:()=>{},testID:"header-close-button"}),endButtons3:e.jsxs(B,{accessibilityLabel:"Group",children:[e.jsx(k,{accessibilityLabel:"Go Back",variant:"secondary",children:"Button"}),e.jsx(k,{accessibilityLabel:"Go Next",variant:"primary",children:"Button"})]}),endButtonsBlock3:e.jsx(c,{flexGrow:1,children:e.jsxs(B,{block:!0,accessibilityLabel:"Group",children:[e.jsx(k,{accessibilityLabel:"Go Back",variant:"secondary",children:"Button"}),e.jsx(k,{accessibilityLabel:"Go Next",variant:"primary",children:"Button"})]})})},O=b=>e.jsx(a,{...b}),g=O.bind({});g.args={background:"bg",start:"logoMark2",title:"title1",end:"end2"};const d=()=>e.jsxs(c,{gap:2,left:0,position:"absolute",top:0,width:"100%",children:[e.jsx(a,{background:"bgPrimaryWash",end:t.end2,start:t.logoMark2,styles:n,title:t.title1}),e.jsx(s,{}),e.jsx(a,{background:"bgPrimaryWash",end:t.end2,styles:n,title:t.title1}),e.jsx(s,{}),e.jsx(a,{background:"bgPrimaryWash",start:t.logoMark2,title:t.title1}),e.jsx(s,{}),e.jsx(a,{background:"bgPrimaryWash",end:t.end2,start:t.logoMark2,styles:n,title:t.intermediary1}),e.jsx(s,{}),e.jsx(a,{background:"bgPrimaryWash",end:t.end2,start:t.logoMark2,styles:n,title:t.title2}),e.jsx(s,{}),e.jsx(a,{background:"bg",end:t.end3,start:t.start1,styles:{...f,...n},title:t.intermediary1}),e.jsx(s,{}),e.jsx(a,{background:"bg",end:t.end3,start:t.start1,styles:{...f,...n},title:t.title1}),e.jsx(s,{}),e.jsx(a,{background:"bg",end:t.end3,start:t.start1,styles:{...f,...n},title:t.title2}),e.jsx(s,{}),e.jsx(a,{background:"bg",end:t.end3,start:t.start1,styles:{...f,...n}}),e.jsx(s,{}),e.jsx(a,{background:"bgPrimaryWash",end:t.end3,styles:n,title:"Intermediary Node Text"}),e.jsx(s,{}),e.jsx(a,{background:"bgPrimaryWash",end:t.end2,start:t.logoMark2,styles:n,title:t.intermediary2})]});d.parameters={a11y:{config:{rules:[{id:"landmark-no-duplicate-banner",enabled:!1},{id:"landmark-unique",enabled:!1}]}}};const m=()=>e.jsxs(c,{gap:0,left:0,position:"absolute",top:0,width:"100%",children:[e.jsx(a,{background:"bg",position:"sticky",start:t.logoMark2,top:"0"}),e.jsx(o,{background:"bgPrimaryWash",children:e.jsxs(c,{alignContent:"center",alignItems:"center",flexGrow:1,flexShrink:1,justifyContent:"center",paddingX:4,paddingY:10,children:[e.jsx(_,{name:"bigWarning"}),e.jsx(r,{as:"h3",display:"block",font:"title1",children:"You need to X before you Y"}),e.jsx(r,{as:"sub",font:"body",textAlign:"center",children:"You'll need to [add funds] before you can [complete this transaction]"})]})})]}),u=()=>{const{isPhone:b}=w(),i=b?t.endButtonsBlock3:t.endButtons3;return e.jsxs(c,{gap:0,left:0,position:"absolute",top:0,width:"100%",children:[e.jsx(a,{background:"bg",end:e.jsx(l,{transparent:!0,accessibilityLabel:"Close",name:"close",testID:"header-close-button"}),position:"sticky",start:t.start1,styles:{start:{paddingLeft:"var(--space-1_5)"},end:{paddingRight:"var(--space-1_5)"}},title:t.title3,top:"0"}),e.jsx(c,{alignContent:"center",alignItems:"center",dangerouslySetBackground:"#FADADD",flexGrow:1,flexShrink:1,height:"400px",justifyContent:"center",padding:3,children:e.jsx(r,{as:"h3",display:"block",font:"title1",children:"Primary Content"})}),e.jsx(o,{dangerouslySetBackground:"gray",height:"500px"}),e.jsx(o,{dangerouslySetBackground:"orange",height:"500px"}),e.jsx(W,{action:i})]})},Pe={title:"Components/PageHeader",component:a,argTypes:{position:{table:{disable:!0}},top:{table:{disable:!0}},left:{table:{disable:!0}},bottom:{table:{disable:!0}},right:{table:{disable:!0}},background:{control:"text"},start:{control:"select",options:["None","logoMark1","logoMark2","start1","start2","startTitle"],mapping:{None:null,logoMark1:t.logoMark1,logoMark2:t.logoMark2,start1:t.start1,start2:t.start2,startTitle:t.title1}},title:{control:"select",options:["None","title1","title2","title3","title4","intermediary1","intermediary2"],mapping:{None:null,title1:t.title1,title2:t.title2,title3:t.title3,title4:e.jsx(r,{as:"h3",display:"block",font:"title1",numberOfLines:1,children:"Very Very Very Very Very Very Very Very Long Long Long Long Long Long Long Long Title"}),intermediary1:t.intermediary1,intermediary2:t.intermediary2}},end:{control:"select",options:["None","end1","end2","end3","end4"],mapping:{None:null,end1:t.end1,end2:t.end2,end3:t.end3,end4:t.end4}}}};d.__docgenInfo={description:"",methods:[],displayName:"Examples"};m.__docgenInfo={description:"",methods:[],displayName:"PageHeaderInErrorEmptyState"};u.__docgenInfo={description:"",methods:[],displayName:"PageHeaderInPage"};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:"args => <PageHeader {...args} />",...g.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => {
  return <VStack gap={2} left={0} position="absolute" top={0} width="100%">
      <PageHeader background="bgPrimaryWash" end={exampleProps.end2} start={exampleProps.logoMark2} styles={shiftEndStyles} title={exampleProps.title1} />
      <Divider />
      <PageHeader background="bgPrimaryWash" end={exampleProps.end2} styles={shiftEndStyles} title={exampleProps.title1} />
      <Divider />
      <PageHeader background="bgPrimaryWash" start={exampleProps.logoMark2} title={exampleProps.title1} />
      <Divider />
      <PageHeader background="bgPrimaryWash" end={exampleProps.end2} start={exampleProps.logoMark2} styles={shiftEndStyles} title={exampleProps.intermediary1} />
      <Divider />
      <PageHeader background="bgPrimaryWash" end={exampleProps.end2} start={exampleProps.logoMark2} styles={shiftEndStyles} title={exampleProps.title2} />
      <Divider />
      <PageHeader background="bg" end={exampleProps.end3} start={exampleProps.start1} styles={{
      ...shiftStartStyles,
      ...shiftEndStyles
    }} title={exampleProps.intermediary1} />
      <Divider />
      <PageHeader background="bg" end={exampleProps.end3} start={exampleProps.start1} styles={{
      ...shiftStartStyles,
      ...shiftEndStyles
    }} title={exampleProps.title1} />
      <Divider />
      <PageHeader background="bg" end={exampleProps.end3} start={exampleProps.start1} styles={{
      ...shiftStartStyles,
      ...shiftEndStyles
    }} title={exampleProps.title2} />
      <Divider />
      <PageHeader background="bg" end={exampleProps.end3} start={exampleProps.start1} styles={{
      ...shiftStartStyles,
      ...shiftEndStyles
    }} />
      <Divider />
      <PageHeader background="bgPrimaryWash" end={exampleProps.end3} styles={shiftEndStyles} title="Intermediary Node Text" />
      <Divider />
      <PageHeader background="bgPrimaryWash" end={exampleProps.end2} start={exampleProps.logoMark2} styles={shiftEndStyles} title={exampleProps.intermediary2} />
    </VStack>;
}`,...d.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => {
  return <VStack gap={0} left={0} position="absolute" top={0} width="100%">
      <PageHeader background="bg" position="sticky" start={exampleProps.logoMark2} top="0" />
      <Box background="bgPrimaryWash">
        <VStack alignContent="center" alignItems="center" flexGrow={1} flexShrink={1} justifyContent="center" paddingX={4} paddingY={10}>
          <HeroSquare name="bigWarning" />
          <Text as="h3" display="block" font="title1">
            You need to X before you Y
          </Text>
          <Text as="sub" font="body" textAlign="center">
            You&apos;ll need to [add funds] before you can [complete this transaction]
          </Text>
        </VStack>
      </Box>
    </VStack>;
}`,...m.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`() => {
  const {
    isPhone
  } = useBreakpoints();
  const setEndButtonMobile = isPhone ? exampleProps.endButtonsBlock3 : exampleProps.endButtons3;
  return <VStack gap={0} left={0} position="absolute" top={0} width="100%">
      <PageHeader background="bg" end={<IconButton transparent accessibilityLabel="Close" name="close" testID="header-close-button" />} position="sticky" start={exampleProps.start1} styles={{
      start: {
        paddingLeft: 'var(--space-1_5)'
      },
      end: {
        paddingRight: 'var(--space-1_5)'
      }
    }} title={exampleProps.title3} top="0" />
      <VStack alignContent="center" alignItems="center" dangerouslySetBackground="#FADADD" flexGrow={1} flexShrink={1} height="400px" justifyContent="center" padding={3}>
        <Text as="h3" display="block" font="title1">
          Primary Content
        </Text>
      </VStack>
      <Box dangerouslySetBackground="gray" height="500px" />
      <Box dangerouslySetBackground="orange" height="500px" />
      <PageFooter action={setEndButtonMobile} />
    </VStack>;
}`,...u.parameters?.docs?.source}}};const je=["InteractiveHeader","Examples","PageHeaderInErrorEmptyState","PageHeaderInPage"];export{d as Examples,g as InteractiveHeader,m as PageHeaderInErrorEmptyState,u as PageHeaderInPage,je as __namedExportsOrder,Pe as default};
