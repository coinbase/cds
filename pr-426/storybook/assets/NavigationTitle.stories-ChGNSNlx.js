import{j as i}from"./iframe-BXWLBCkp.js";import{V as t}from"./VStack-CnEfMFeL.js";import{N as e}from"./NavigationTitle-CRto6k3D.js";import"./preload-helper-D9Z9MdNV.js";import"./Text-Ch_dBU4v.js";const N={title:"Components/Navigation/NavigationTitle",component:e},a=()=>i.jsx(e,{children:"Page Title"}),n=()=>i.jsxs(t,{gap:6,children:[i.jsx(e,{font:"title1",children:"Title 1 (Default)"}),i.jsx(e,{font:"title2",children:"Title 2"}),i.jsx(e,{font:"title3",children:"Title 3"}),i.jsx(e,{font:"headline",children:"Headline"}),i.jsx(e,{font:"display1",children:"Display 1"}),i.jsx(e,{font:"display2",children:"Display 2"})]}),o=()=>i.jsxs(t,{gap:4,children:[i.jsx(e,{as:"h1",children:"H1 Navigation Title"}),i.jsx(e,{as:"h2",children:"H2 Navigation Title"}),i.jsx(e,{as:"h3",children:"H3 Navigation Title"}),i.jsx(e,{as:"h4",children:"H4 Navigation Title"}),i.jsx(e,{as:"div",children:"Div Navigation Title"}),i.jsx(e,{as:"span",children:"Span Navigation Title"})]}),r=()=>i.jsxs(t,{gap:4,children:[i.jsx(e,{color:"fg",children:"Default Color"}),i.jsx(e,{color:"fgMuted",children:"Muted Color"}),i.jsx(e,{color:"fgPrimary",children:"Primary Color"}),i.jsx(e,{color:"fgPositive",children:"Positive Color"}),i.jsx(e,{color:"fgWarning",children:"Warning Color"}),i.jsx(e,{color:"fgNegative",children:"Negative Color"})]}),l=()=>i.jsxs(t,{gap:4,width:"100%",children:[i.jsx(e,{textAlign:"start",children:"Left Aligned Title"}),i.jsx(e,{textAlign:"center",children:"Center Aligned Title"}),i.jsx(e,{textAlign:"end",children:"Right Aligned Title"})]}),s=()=>i.jsxs(t,{gap:4,width:"300px",children:[i.jsx(e,{overflow:"truncate",children:"This is a very long navigation title that will get truncated with ellipsis"}),i.jsx(e,{overflow:"wrap",children:"This is a very long navigation title that will wrap to multiple lines"}),i.jsx(e,{overflow:"break",children:"Thisissuperlongwithoutspacesandwillbreakappropriately"})]}),c=()=>i.jsxs(t,{gap:4,width:"300px",children:[i.jsx(e,{numberOfLines:1,children:"This long title will be limited to just one line no matter how much content there is"}),i.jsx(e,{numberOfLines:2,children:"This longer title will be limited to exactly two lines and will cut off after that even if there is more content to display"})]}),g=()=>i.jsxs(t,{gap:4,children:[i.jsx(e,{children:"Regular Font Family"}),i.jsx(e,{mono:!0,children:"Monospace Font Family"})]}),d=()=>i.jsxs(t,{gap:4,children:[i.jsx(e,{children:"Normal Title"}),i.jsx(e,{underline:!0,children:"Underlined Title"}),i.jsx(e,{noWrap:!0,children:"This title will not wrap even if the content is very long"})]});a.__docgenInfo={description:"",methods:[],displayName:"Default"};n.__docgenInfo={description:"",methods:[],displayName:"FontVariants"};o.__docgenInfo={description:"",methods:[],displayName:"SemanticElements"};r.__docgenInfo={description:"",methods:[],displayName:"Colors"};l.__docgenInfo={description:"",methods:[],displayName:"TextAlignment"};s.__docgenInfo={description:"",methods:[],displayName:"OverflowBehavior"};c.__docgenInfo={description:"",methods:[],displayName:"NumberOfLines"};g.__docgenInfo={description:"",methods:[],displayName:"Monospace"};d.__docgenInfo={description:"",methods:[],displayName:"TextDecorations"};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => {
  return <NavigationTitle>Page Title</NavigationTitle>;
}`,...a.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => {
  return <VStack gap={6}>
      <NavigationTitle font="title1">Title 1 (Default)</NavigationTitle>
      <NavigationTitle font="title2">Title 2</NavigationTitle>
      <NavigationTitle font="title3">Title 3</NavigationTitle>
      <NavigationTitle font="headline">Headline</NavigationTitle>
      <NavigationTitle font="display1">Display 1</NavigationTitle>
      <NavigationTitle font="display2">Display 2</NavigationTitle>
    </VStack>;
}`,...n.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => {
  return <VStack gap={4}>
      <NavigationTitle as="h1">H1 Navigation Title</NavigationTitle>
      <NavigationTitle as="h2">H2 Navigation Title</NavigationTitle>
      <NavigationTitle as="h3">H3 Navigation Title</NavigationTitle>
      <NavigationTitle as="h4">H4 Navigation Title</NavigationTitle>
      <NavigationTitle as="div">Div Navigation Title</NavigationTitle>
      <NavigationTitle as="span">Span Navigation Title</NavigationTitle>
    </VStack>;
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => {
  return <VStack gap={4}>
      <NavigationTitle color="fg">Default Color</NavigationTitle>
      <NavigationTitle color="fgMuted">Muted Color</NavigationTitle>
      <NavigationTitle color="fgPrimary">Primary Color</NavigationTitle>
      <NavigationTitle color="fgPositive">Positive Color</NavigationTitle>
      <NavigationTitle color="fgWarning">Warning Color</NavigationTitle>
      <NavigationTitle color="fgNegative">Negative Color</NavigationTitle>
    </VStack>;
}`,...r.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => {
  return <VStack gap={4} width="100%">
      <NavigationTitle textAlign="start">Left Aligned Title</NavigationTitle>
      <NavigationTitle textAlign="center">Center Aligned Title</NavigationTitle>
      <NavigationTitle textAlign="end">Right Aligned Title</NavigationTitle>
    </VStack>;
}`,...l.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => {
  return <VStack gap={4} width="300px">
      <NavigationTitle overflow="truncate">
        This is a very long navigation title that will get truncated with ellipsis
      </NavigationTitle>
      <NavigationTitle overflow="wrap">
        This is a very long navigation title that will wrap to multiple lines
      </NavigationTitle>
      <NavigationTitle overflow="break">
        Thisissuperlongwithoutspacesandwillbreakappropriately
      </NavigationTitle>
    </VStack>;
}`,...s.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => {
  return <VStack gap={4} width="300px">
      <NavigationTitle numberOfLines={1}>
        This long title will be limited to just one line no matter how much content there is
      </NavigationTitle>
      <NavigationTitle numberOfLines={2}>
        This longer title will be limited to exactly two lines and will cut off after that even if
        there is more content to display
      </NavigationTitle>
    </VStack>;
}`,...c.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => {
  return <VStack gap={4}>
      <NavigationTitle>Regular Font Family</NavigationTitle>
      <NavigationTitle mono>Monospace Font Family</NavigationTitle>
    </VStack>;
}`,...g.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => {
  return <VStack gap={4}>
      <NavigationTitle>Normal Title</NavigationTitle>
      <NavigationTitle underline>Underlined Title</NavigationTitle>
      <NavigationTitle noWrap>
        This title will not wrap even if the content is very long
      </NavigationTitle>
    </VStack>;
}`,...d.parameters?.docs?.source}}};const u=["Default","FontVariants","SemanticElements","Colors","TextAlignment","OverflowBehavior","NumberOfLines","Monospace","TextDecorations"];export{r as Colors,a as Default,n as FontVariants,g as Monospace,c as NumberOfLines,s as OverflowBehavior,o as SemanticElements,l as TextAlignment,d as TextDecorations,u as __namedExportsOrder,N as default};
