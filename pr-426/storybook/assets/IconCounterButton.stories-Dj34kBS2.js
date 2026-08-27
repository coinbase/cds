import{j as o}from"./iframe-CsG_6vZR.js";import{a as r}from"./assets-CEwpm_uP.js";import{D as e}from"./DotSymbol-BfeZ4jM4.js";import{T as c}from"./Text-B1CpMNU3.js";import{I as t}from"./IconCounterButton-BZjOsRxO.js";import{V as a}from"./VStack-Cg_Yq2u4.js";import{H as s}from"./HStack-DaDYipoP.js";import{D as i}from"./Divider-DKMVovzU.js";import"./preload-helper-D9Z9MdNV.js";import"./Icon-DTs0crZh.js";import"./useTheme-CmrOhAty.js";import"./RemoteImage-CCsStlyO.js";import"./eventHandlers-CyvGcX2M.js";import"./dotStyles-Ccp1dKIN.js";import"./Pressable-DDN99tmF.js";import"./isArray-M0ytM-vC.js";import"./Interactable--rqISG90.js";import"./color-Ceo1QMNe.js";const z={title:"Components/Buttons/IconCounterButton",component:t},n=()=>o.jsxs(a,{gap:2,children:[o.jsx(c,{as:"h3",display:"block",font:"title3",children:"Normal"}),o.jsxs(s,{gap:4,children:[o.jsx(t,{count:99,icon:"heart"}),o.jsx(t,{count:4200,icon:"comment"}),o.jsx(t,{count:99e5,icon:"arrowsHorizontal"})]}),o.jsx(i,{}),o.jsx(c,{as:"h3",display:"block",font:"title3",children:"Colored"}),o.jsxs(s,{gap:4,children:[o.jsx(t,{active:!0,color:"fgNegative",count:99,icon:"heart"}),o.jsx(t,{color:"fgPrimary",count:4200,icon:"comment"}),o.jsx(t,{count:69e6,dangerouslySetColor:"orange",icon:"arrowsHorizontal"})]}),o.jsx(i,{}),o.jsx(c,{as:"h3",display:"block",font:"title3",children:"Custom Icon"}),o.jsxs(s,{gap:4,children:[o.jsx(t,{count:99,icon:o.jsx(e,{size:"m",source:r.btc.imageUrl})}),o.jsx(t,{count:4200,icon:o.jsx(e,{size:"m",source:r.eth.imageUrl})}),o.jsx(t,{count:99e5,icon:o.jsx(e,{size:"m",source:r.uni.imageUrl})})]})]});n.__docgenInfo={description:"",methods:[],displayName:"IconCounterButtonExample"};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => {
  return <VStack gap={2}>
      <Text as="h3" display="block" font="title3">
        Normal
      </Text>
      <HStack gap={4}>
        <IconCounterButton count={99} icon="heart" />
        <IconCounterButton count={4200} icon="comment" />
        <IconCounterButton count={9900000} icon="arrowsHorizontal" />
      </HStack>
      <Divider />
      <Text as="h3" display="block" font="title3">
        Colored
      </Text>
      <HStack gap={4}>
        <IconCounterButton active color="fgNegative" count={99} icon="heart" />
        <IconCounterButton color="fgPrimary" count={4200} icon="comment" />
        <IconCounterButton count={69000000} dangerouslySetColor="orange" icon="arrowsHorizontal" />
      </HStack>
      <Divider />
      <Text as="h3" display="block" font="title3">
        Custom Icon
      </Text>
      <HStack gap={4}>
        <IconCounterButton count={99} icon={<DotSymbol size="m" source={assets.btc.imageUrl} />} />
        <IconCounterButton count={4200} icon={<DotSymbol size="m" source={assets.eth.imageUrl} />} />
        <IconCounterButton count={9900000} icon={<DotSymbol size="m" source={assets.uni.imageUrl} />} />
      </HStack>
    </VStack>;
}`,...n.parameters?.docs?.source}}};const D=["IconCounterButtonExample"];export{n as IconCounterButtonExample,D as __namedExportsOrder,z as default};
