import{j as o}from"./iframe-CYDANtMt.js";import{a as r}from"./assets-CEwpm_uP.js";import{D as e}from"./DotSymbol-CLtRmpcH.js";import{T as c}from"./Text-0g3rWpAf.js";import{I as t}from"./IconCounterButton-BtcyKytk.js";import{V as a}from"./VStack-iXgNewwv.js";import{H as s}from"./HStack-Fh-9TmPm.js";import{D as i}from"./Divider-CG0S6-JI.js";import"./preload-helper-D9Z9MdNV.js";import"./Icon-DRxKkZdt.js";import"./useTheme-C_Ehsh33.js";import"./RemoteImage-S3YFINhn.js";import"./eventHandlers-CyvGcX2M.js";import"./dotStyles-Ccp1dKIN.js";import"./Pressable-BvczHaFK.js";import"./isArray-BJmyNVUi.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";const z={title:"Components/Buttons/IconCounterButton",component:t},n=()=>o.jsxs(a,{gap:2,children:[o.jsx(c,{as:"h3",display:"block",font:"title3",children:"Normal"}),o.jsxs(s,{gap:4,children:[o.jsx(t,{count:99,icon:"heart"}),o.jsx(t,{count:4200,icon:"comment"}),o.jsx(t,{count:99e5,icon:"arrowsHorizontal"})]}),o.jsx(i,{}),o.jsx(c,{as:"h3",display:"block",font:"title3",children:"Colored"}),o.jsxs(s,{gap:4,children:[o.jsx(t,{active:!0,color:"fgNegative",count:99,icon:"heart"}),o.jsx(t,{color:"fgPrimary",count:4200,icon:"comment"}),o.jsx(t,{count:69e6,dangerouslySetColor:"orange",icon:"arrowsHorizontal"})]}),o.jsx(i,{}),o.jsx(c,{as:"h3",display:"block",font:"title3",children:"Custom Icon"}),o.jsxs(s,{gap:4,children:[o.jsx(t,{count:99,icon:o.jsx(e,{size:"m",source:r.btc.imageUrl})}),o.jsx(t,{count:4200,icon:o.jsx(e,{size:"m",source:r.eth.imageUrl})}),o.jsx(t,{count:99e5,icon:o.jsx(e,{size:"m",source:r.uni.imageUrl})})]})]});n.__docgenInfo={description:"",methods:[],displayName:"IconCounterButtonExample"};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => {
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
