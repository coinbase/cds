import{r as p,j as t,B as d}from"./iframe-BXWLBCkp.js";import{e as l}from"./assets-CEwpm_uP.js";import{n}from"./noop-BjFrJKj1.js";import{T as a}from"./Text-Ch_dBU4v.js";import{C as o}from"./Coachmark-Btmb1icg.js";import{C as h}from"./Checkbox-M1uAd9ap.js";import{S as u}from"./SpotRectangle-DMgOEAF3.js";import{V as r}from"./VStack-CnEfMFeL.js";import{B as e}from"./Button-W9Shg4T1.js";import{R as y}from"./RemoteImage-Lksm6NI7.js";import{P as x}from"./ProgressBar-BsXln_3w.js";import"./preload-helper-D9Z9MdNV.js";import"./IconButton-OIX0AFCz.js";import"./useTheme-BJazYlse.js";import"./Icon-CgDQ3NQp.js";import"./Spinner-BAI0lrZ-.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./HStack-B6p8qBpp.js";import"./checkbox-DVjU0upZ.js";import"./tokens-BwScSksM.js";import"./useMotionProps-CS-LE6l8.js";import"./utils-CwomCnHN.js";import"./Control-gdMxvYmV.js";import"./useMergeRefs-DR4sGa7m.js";import"./usePrefixedId-Dfl-0DGQ.js";import"./isRtl-Du0XdnX5.js";import"./motion-minimal-SVRWJYUW.js";import"./versionMap-BAVgBvPY.js";import"./createIllustration-B8-1WYve.js";import"./convertDimensionToSize-B6MeOypY.js";import"./useProgressSize-CemUcfxL.js";import"./usePreviousValues-rLMWE3mU.js";const i=()=>{const[s,c]=p.useState(!1);return t.jsxs(r,{gap:3,children:[t.jsx(o,{action:t.jsx(e,{children:"Next"}),content:"Add up to 3 lines of body copy. Deliver your message with clarity and impact",title:"Basic"}),t.jsx(o,{action:t.jsx(e,{children:"Next"}),checkbox:t.jsx(h,{checked:s,onChange:()=>c(m=>!m),children:"Don't show again"}),content:"Add up to 3 lines of body copy. Deliver your message with clarity and impact",title:"With checkbox"}),t.jsx(o,{action:t.jsx(e,{children:"Next"}),closeButtonAccessibilityLabel:"Close",content:"Add up to 3 lines of body copy. Deliver your message with clarity and impact",onClose:n,title:"Dismissible"}),t.jsx(o,{action:t.jsx(e,{children:"Next"}),closeButtonAccessibilityLabel:"Close",content:t.jsxs(r,{gap:2,children:[t.jsx(a,{as:"p",color:"fgMuted",display:"block",font:"caption",children:"50%"}),t.jsx(x,{progress:.5}),t.jsx(a,{as:"p",display:"block",font:"body",children:"Add up to 3 lines of body copy. Deliver your message with clarity and impact"})]}),media:t.jsx(y,{height:150,source:l,style:{borderBottomLeftRadius:0,borderBottomRightRadius:0},width:"100%"}),onClose:n,title:"Rich Content"}),t.jsx(o,{action:t.jsx(e,{children:"Next"}),content:"This SpotRectangle is in a Box with bgPrimary background.",media:t.jsx(d,{alignItems:"center",background:"bgPrimary",justifyContent:"center",padding:4,children:t.jsx(u,{name:"defiEarn"})}),title:"With a SpotRectangle"}),t.jsx(o,{action:t.jsx(e,{children:"Done"}),content:"Add up to 3 lines of body copy. Deliver your message with clarity and impact",title:"Custom width",width:250})]})},Z={title:"Components/Coachmark",component:o};i.__docgenInfo={description:"",methods:[],displayName:"CoachmarkExamples"};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
  const [checked, setChecked] = useState(false);
  return <VStack gap={3}>
      <Coachmark action={<Button>Next</Button>} content="Add up to 3 lines of body copy. Deliver your message with clarity and impact" title="Basic" />
      <Coachmark action={<Button>Next</Button>} checkbox={<Checkbox checked={checked} onChange={() => setChecked(s => !s)}>
            Don&apos;t show again
          </Checkbox>} content="Add up to 3 lines of body copy. Deliver your message with clarity and impact" title="With checkbox" />
      <Coachmark action={<Button>Next</Button>} closeButtonAccessibilityLabel="Close" content="Add up to 3 lines of body copy. Deliver your message with clarity and impact" onClose={noop} title="Dismissible" />
      <Coachmark action={<Button>Next</Button>} closeButtonAccessibilityLabel="Close" content={<VStack gap={2}>
            <Text as="p" color="fgMuted" display="block" font="caption">
              50%
            </Text>
            <ProgressBar progress={0.5} />
            <Text as="p" display="block" font="body">
              Add up to 3 lines of body copy. Deliver your message with clarity and impact
            </Text>
          </VStack>} media={<RemoteImage height={150} source={ethBackground} style={{
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0
    }} width="100%" />} onClose={noop} title="Rich Content" />
      <Coachmark action={<Button>Next</Button>} content="This SpotRectangle is in a Box with bgPrimary background." media={<Box alignItems="center" background="bgPrimary" justifyContent="center" padding={4}>
            <SpotRectangle name="defiEarn" />
          </Box>} title="With a SpotRectangle" />
      <Coachmark action={<Button>Done</Button>} content="Add up to 3 lines of body copy. Deliver your message with clarity and impact" title="Custom width" width={250} />
    </VStack>;
}`,...i.parameters?.docs?.source}}};const $=["CoachmarkExamples"];export{i as CoachmarkExamples,$ as __namedExportsOrder,Z as default};
