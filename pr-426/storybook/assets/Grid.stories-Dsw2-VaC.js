import{j as n}from"./iframe-BXWLBCkp.js";import{T as e}from"./Text-Ch_dBU4v.js";import{G as r}from"./Grid-D-Uw9y2v.js";import{G as x}from"./GridColumn-lNO4p6Hw.js";import{H as h}from"./HStack-B6p8qBpp.js";import{V as a}from"./VStack-CnEfMFeL.js";import{L as o}from"./LoremIpsum-B4MDYpOX.js";import"./preload-helper-D9Z9MdNV.js";import"./loremIpsum-CjdvNg3u.js";const s=({children:t,...p})=>n.jsx(h,{alignItems:"center",background:"bgAlternate",justifyContent:"center",padding:2,...p,children:t}),j={phone:2,tablet:1,desktop:.5},c=t=>n.jsx(r,{gap:j,...t,children:Array.from({length:12}).map((p,l)=>n.jsx(s,{as:t.as==="ul"?"li":"div",children:n.jsx(e,{as:"h3",display:"block",font:"title1",children:l+1})},l))}),u=t=>n.jsx(r,{...t,gap:.5,children:Array.from({length:12}).map((p,l)=>n.jsx(s,{children:n.jsx(e,{as:"h3",display:"block",font:"title1",children:l+1})},l))}),g=t=>n.jsxs(r,{...t,gap:.5,children:[n.jsx(s,{children:n.jsx(o,{})}),n.jsx(s,{children:n.jsx(o,{repeat:3})}),n.jsx(s,{children:n.jsx(e,{as:"p",display:"block",font:"body",children:"Small"})}),n.jsx(s,{children:n.jsx(o,{})}),n.jsx(s,{children:n.jsx(e,{as:"p",display:"block",font:"body",children:"1"})}),n.jsx(s,{children:n.jsx(o,{repeat:2})}),n.jsx(s,{children:n.jsx(o,{})})]}),k=t=>({phone:t+1,tablet:t+1,desktop:1}),f=t=>({phone:t+6>13?-1:t+6,tablet:t+4>13?-1:t+4,desktop:t+2}),d=({responsive:t})=>n.jsx(r,{columns:12,gap:.5,children:Array.from({length:12}).map((p,l)=>n.jsx(x,{background:"bgPrimary",gridColumnEnd:t?f(l):l+2,gridColumnStart:t?k(l):1,padding:2},l))}),b=()=>n.jsxs(r,{gap:.5,templateColumns:"100px 1fr 100px",children:[n.jsx(s,{background:"bg",children:n.jsx(e,{as:"p",display:"block",font:"body",children:"Gutter"})}),n.jsx(s,{children:n.jsx(e,{as:"p",display:"block",font:"body",children:"Body"})}),n.jsx(s,{background:"bg",children:n.jsx(e,{as:"p",display:"block",font:"body",children:"Gutter"})}),n.jsx(x,{background:"bgAlternate",gridColumn:"1 / -1",justifyContent:"center",padding:2,children:n.jsx(e,{as:"p",display:"block",font:"body",children:"Full Bleed"})})]}),m={phone:"repeat(3, minmax(0, 1fr))",tablet:"repeat(6, minmax(0, 1fr))",desktop:"repeat(12, minmax(0, 1fr))"},i=()=>n.jsxs(a,{gap:4,children:[n.jsxs(a,{gap:1,children:[n.jsx(e,{as:"h2",display:"block",font:"title1",children:"Twelve Column Grid"}),n.jsx(c,{gridTemplateColumns:m})]}),n.jsxs(a,{gap:1,children:[n.jsx(e,{as:"h2",display:"block",font:"title1",children:"Columns as String"}),n.jsx(e,{as:"h3",display:"block",font:"title3",children:"100px 20% 1fr"}),n.jsx(c,{templateColumns:"100px 20% 1fr"})]}),n.jsxs(a,{gap:1,children:[n.jsx(e,{as:"h2",display:"block",font:"title1",children:"As a List"}),n.jsx(c,{as:"ul",gridTemplateColumns:m})]}),n.jsxs(a,{gap:1,children:[n.jsx(e,{as:"h2",display:"block",font:"title1",children:"Implicit Grid"}),n.jsx(u,{columnMin:"100px"})]}),n.jsxs(a,{gap:1,children:[n.jsx(e,{as:"h2",display:"block",font:"title1",children:"Implicit Grid with Clamps"}),n.jsx(g,{columnMax:"200px",columnMin:"min-content"})]}),n.jsxs(a,{gap:1,children:[n.jsx(e,{as:"h2",display:"block",font:"title1",children:"Column Span"}),n.jsx(d,{})]}),n.jsxs(a,{gap:1,children:[n.jsx(e,{as:"h2",display:"block",font:"title1",children:"Responsive Column Span"}),n.jsx(d,{responsive:!0})]}),n.jsxs(a,{gap:1,children:[n.jsx(e,{as:"h2",display:"block",font:"title1",children:"Full Bleed"}),n.jsx(b,{})]})]}),B={title:"Components/Grid",component:i};i.__docgenInfo={description:"",methods:[],displayName:"GridExamples"};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
  return <VStack gap={4}>
      <VStack gap={1}>
        <Text as="h2" display="block" font="title1">
          Twelve Column Grid
        </Text>
        <GridBase gridTemplateColumns={responsiveGridColumnConfig} />
      </VStack>
      <VStack gap={1}>
        <Text as="h2" display="block" font="title1">
          Columns as String
        </Text>
        <Text as="h3" display="block" font="title3">
          100px 20% 1fr
        </Text>
        <GridBase templateColumns="100px 20% 1fr" />
      </VStack>
      <VStack gap={1}>
        <Text as="h2" display="block" font="title1">
          As a List
        </Text>
        <GridBase as="ul" gridTemplateColumns={responsiveGridColumnConfig} />
      </VStack>
      <VStack gap={1}>
        <Text as="h2" display="block" font="title1">
          Implicit Grid
        </Text>
        <ImplicitGrid columnMin="100px" />
      </VStack>
      <VStack gap={1}>
        <Text as="h2" display="block" font="title1">
          Implicit Grid with Clamps
        </Text>
        <ImplicitGridClamped columnMax="200px" columnMin="min-content" />
      </VStack>
      <VStack gap={1}>
        <Text as="h2" display="block" font="title1">
          Column Span
        </Text>
        <ColumnExamples />
      </VStack>
      <VStack gap={1}>
        <Text as="h2" display="block" font="title1">
          Responsive Column Span
        </Text>
        <ColumnExamples responsive />
      </VStack>
      <VStack gap={1}>
        <Text as="h2" display="block" font="title1">
          Full Bleed
        </Text>
        <FullBleedExample />
      </VStack>
    </VStack>;
}`,...i.parameters?.docs?.source}}};const _=["GridExamples"];export{i as GridExamples,_ as __namedExportsOrder,B as default};
