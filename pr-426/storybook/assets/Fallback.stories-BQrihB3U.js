import{j as t}from"./iframe-BXWLBCkp.js";import{T as d}from"./Text-Ch_dBU4v.js";import{F as s}from"./Fallback-JiI5nWt_.js";import{V as c}from"./VStack-CnEfMFeL.js";import"./preload-helper-D9Z9MdNV.js";const u={title:"Components/Fallback",component:s},e=()=>{const n=[[10,100],[120,200],[900,100],[10,10]];return t.jsx(c,{gap:3,children:n.map(([i,o])=>t.jsxs(t.Fragment,{children:[t.jsxs(d,{as:"p",display:"block",font:"body",children:["Width: ",i,", Height: ",o]}),t.jsx(s,{disableRandomRectWidth:!0,height:o,width:i})]}))})},a=()=>t.jsx(s,{height:"var(--lineHeight-title3)",width:100}),r=()=>t.jsx(c,{gap:3,children:Array(10).fill({}).map((n,i)=>t.jsx(s,{height:20,rectWidthVariant:i,width:100}))});e.__docgenInfo={description:"",methods:[],displayName:"Basic"};a.__docgenInfo={description:"",methods:[],displayName:"HeightAsCSSVar"};r.__docgenInfo={description:"",methods:[],displayName:"RectangleWidthVariants"};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`() => {
  // index 0 = width, index 1 = height
  const sizes = [[10, 100], [120, 200], [900, 100], [10, 10]];
  return <VStack gap={3}>
      {sizes.map(([width, height]) => <>
          <Text as="p" display="block" font="body">
            Width: {width}, Height: {height}
          </Text>
          <Fallback disableRandomRectWidth height={height} width={width} />
        </>)}
    </VStack>;
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => {
  return <Fallback height="var(--lineHeight-title3)" width={100} />;
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => {
  return <VStack gap={3}>
      {Array(10).fill({}).map((_, i) => <Fallback height={20} rectWidthVariant={i} width={100} />)}
    </VStack>;
}`,...r.parameters?.docs?.source}}};const x=["Basic","HeightAsCSSVar","RectangleWidthVariants"];export{e as Basic,a as HeightAsCSSVar,r as RectangleWidthVariants,x as __namedExportsOrder,u as default};
