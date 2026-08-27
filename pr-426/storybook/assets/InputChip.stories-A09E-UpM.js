import{j as t}from"./iframe-BXWLBCkp.js";import{a as n}from"./assets-CEwpm_uP.js";import{T as s}from"./Text-Ch_dBU4v.js";import{I as o}from"./InputChip-CbRhrkq_.js";import{V as l}from"./VStack-CnEfMFeL.js";import{H as r}from"./HStack-B6p8qBpp.js";import{R as a}from"./RemoteImage-Lksm6NI7.js";import"./preload-helper-D9Z9MdNV.js";import"./Icon-CgDQ3NQp.js";import"./useTheme-BJazYlse.js";import"./MediaChip-DK4Hgf8b.js";import"./Chip-Cb6f10va.js";import"./tokens-BwScSksM.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";const N={title:"Components/Chips/InputChip",component:o},e=()=>{},i=()=>{const p={height:24,shape:"circle",source:n.eth.imageUrl,width:24},c={height:16,shape:"circle",source:n.eth.imageUrl,width:16};return t.jsx(l,{gap:3,children:t.jsxs(l,{gap:2,children:[t.jsx(s,{as:"h2",display:"block",font:"display2",children:"Default"}),t.jsxs(r,{gap:2,children:[t.jsx(o,{onClick:e,children:"USD"}),t.jsx(o,{onClick:e,start:t.jsx(a,{...p}),children:"USD"}),t.jsx(o,{disabled:!0,onClick:e,start:t.jsx(a,{...p}),children:"USD"})]}),t.jsx(s,{as:"h3",display:"block",font:"headline",paddingTop:3,children:"Compact"}),t.jsxs(r,{gap:2,children:[t.jsx(o,{compact:!0,onClick:e,children:"USD"}),t.jsx(o,{compact:!0,onClick:e,start:t.jsx(a,{...c}),children:"USD"}),t.jsx(o,{compact:!0,disabled:!0,onClick:e,start:t.jsx(a,{...c}),children:"USD"})]}),t.jsx(s,{as:"h3",display:"block",font:"headline",paddingTop:3,children:"Long text"}),t.jsxs(r,{gap:2,children:[t.jsx(o,{onClick:e,children:"Lorem ipsum sit dolar"}),t.jsx(o,{onClick:e,start:t.jsx(a,{...p}),children:"Lorem ipsum sit dolar"}),t.jsx(o,{disabled:!0,onClick:e,start:t.jsx(a,{...p}),children:"Lorem ipsum sit dolar"})]})]})})};i.__docgenInfo={description:"",methods:[],displayName:"Default"};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
  const regularMediaProps: RemoteImageProps = {
    height: 24,
    shape: 'circle',
    source: assets.eth.imageUrl,
    width: 24
  };
  const compactMediaProps: RemoteImageProps = {
    height: 16,
    shape: 'circle',
    source: assets.eth.imageUrl,
    width: 16
  };
  return <VStack gap={3}>
      <VStack gap={2}>
        <Text as="h2" display="block" font="display2">
          Default
        </Text>
        <HStack gap={2}>
          <InputChip onClick={NoopFn}>USD</InputChip>
          <InputChip onClick={NoopFn} start={<RemoteImage {...regularMediaProps} />}>
            USD
          </InputChip>
          <InputChip disabled onClick={NoopFn} start={<RemoteImage {...regularMediaProps} />}>
            USD
          </InputChip>
        </HStack>
        <Text as="h3" display="block" font="headline" paddingTop={3}>
          Compact
        </Text>
        <HStack gap={2}>
          <InputChip compact onClick={NoopFn}>
            USD
          </InputChip>
          <InputChip compact onClick={NoopFn} start={<RemoteImage {...compactMediaProps} />}>
            USD
          </InputChip>
          <InputChip compact disabled onClick={NoopFn} start={<RemoteImage {...compactMediaProps} />}>
            USD
          </InputChip>
        </HStack>
        <Text as="h3" display="block" font="headline" paddingTop={3}>
          Long text
        </Text>
        <HStack gap={2}>
          <InputChip onClick={NoopFn}>Lorem ipsum sit dolar</InputChip>
          <InputChip onClick={NoopFn} start={<RemoteImage {...regularMediaProps} />}>
            Lorem ipsum sit dolar
          </InputChip>
          <InputChip disabled onClick={NoopFn} start={<RemoteImage {...regularMediaProps} />}>
            Lorem ipsum sit dolar
          </InputChip>
        </HStack>
      </VStack>
    </VStack>;
}`,...i.parameters?.docs?.source}}};const R=["Default"];export{i as Default,R as __namedExportsOrder,N as default};
