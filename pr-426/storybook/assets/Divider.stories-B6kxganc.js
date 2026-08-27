import{j as r,B as c}from"./iframe-CYDANtMt.js";import{D as n}from"./Divider-CG0S6-JI.js";import{H as h}from"./HStack-Fh-9TmPm.js";import{V as g}from"./VStack-iXgNewwv.js";import"./preload-helper-D9Z9MdNV.js";const p={title:"Components/Divider",component:n,argTypes:{direction:{options:["horizontal","vertical"],control:{type:"radio"}}}},a=({direction:d,...s})=>d==="horizontal"?r.jsxs(g,{width:500,children:[r.jsx(c,{background:"bg",height:100,width:500}),r.jsx(n,{direction:d,...s}),r.jsx(c,{background:"bg",height:100,width:500})]}):r.jsxs(h,{children:[r.jsx(c,{background:"bg",height:200,width:250}),r.jsx(n,{direction:d,...s}),r.jsx(c,{background:"bg",height:200,width:250})]}),i=a.bind({});i.args={direction:"horizontal"};const t=a.bind({});t.args={direction:"vertical"};const o=a.bind({});o.args={direction:"horizontal",color:"bgLine"};const e=a.bind({});e.args={direction:"horizontal",color:"bgLineHeavy"};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`({
  direction,
  ...rest
}) => {
  if (direction === 'horizontal') {
    return <VStack width={500}>
        <Box background="bg" height={100} width={500} />
        <Divider direction={direction} {...rest} />
        <Box background="bg" height={100} width={500} />
      </VStack>;
  }
  return <HStack>
      <Box background="bg" height={200} width={250} />
      <Divider direction={direction} {...rest} />
      <Box background="bg" height={200} width={250} />
    </HStack>;
}`,...i.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`({
  direction,
  ...rest
}) => {
  if (direction === 'horizontal') {
    return <VStack width={500}>
        <Box background="bg" height={100} width={500} />
        <Divider direction={direction} {...rest} />
        <Box background="bg" height={100} width={500} />
      </VStack>;
  }
  return <HStack>
      <Box background="bg" height={200} width={250} />
      <Divider direction={direction} {...rest} />
      <Box background="bg" height={200} width={250} />
    </HStack>;
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`({
  direction,
  ...rest
}) => {
  if (direction === 'horizontal') {
    return <VStack width={500}>
        <Box background="bg" height={100} width={500} />
        <Divider direction={direction} {...rest} />
        <Box background="bg" height={100} width={500} />
      </VStack>;
  }
  return <HStack>
      <Box background="bg" height={200} width={250} />
      <Divider direction={direction} {...rest} />
      <Box background="bg" height={200} width={250} />
    </HStack>;
}`,...o.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`({
  direction,
  ...rest
}) => {
  if (direction === 'horizontal') {
    return <VStack width={500}>
        <Box background="bg" height={100} width={500} />
        <Divider direction={direction} {...rest} />
        <Box background="bg" height={100} width={500} />
      </VStack>;
  }
  return <HStack>
      <Box background="bg" height={200} width={250} />
      <Divider direction={direction} {...rest} />
      <Box background="bg" height={200} width={250} />
    </HStack>;
}`,...e.parameters?.docs?.source}}};const x=["HorizontalDirection","VerticalDirection","LightColor","HeavyColor"];export{e as HeavyColor,i as HorizontalDirection,o as LightColor,t as VerticalDirection,x as __namedExportsOrder,p as default};
