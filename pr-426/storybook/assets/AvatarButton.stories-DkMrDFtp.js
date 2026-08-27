import{j as a}from"./iframe-CsG_6vZR.js";import{g as h}from"./getAvatarFallbackColor-DxJcQAjK.js";import{H as o}from"./HStack-DaDYipoP.js";import{V as n}from"./VStack-Cg_Yq2u4.js";import{T as t}from"./Text-B1CpMNU3.js";import{A as e}from"./AvatarButton-DhGgn0Qf.js";import"./preload-helper-D9Z9MdNV.js";import"./color-Ceo1QMNe.js";import"./interactableHeight-DPdDzpO8.js";import"./Avatar-DB-9v412.js";import"./RemoteImage-CCsStlyO.js";import"./Pressable-DDN99tmF.js";import"./isArray-M0ytM-vC.js";import"./Interactable--rqISG90.js";import"./useTheme-CmrOhAty.js";const c="https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg",k=["Sneezy","Happy","Sleepy","Doc","Bashful","Grumpy","Dopey","Lilo","Stitch"],l=i=>a.jsx(o,{alignItems:"center",flexWrap:"wrap",gap:2,children:k.map((d,p)=>{const g=h(d);return a.jsx(e,{alt:"",colorScheme:p===0?"blue":g,name:d,...i},d)})});function r(i){console.log(`pressed ${i.target}`)}const I={component:e,title:"Components/Buttons/AvatarButton"},s=()=>a.jsxs(a.Fragment,{children:[a.jsxs(n,{gap:2,children:[a.jsx(t,{as:"h3",display:"block",font:"headline",children:"Default"}),a.jsxs(o,{alignItems:"center",gap:2,children:[a.jsx(e,{alt:"Sneezy",onClick:r,src:c}),a.jsx(e,{compact:!0,alt:"Sneezy",as:"a",href:"/",src:c})]}),a.jsxs(o,{alignItems:"center",gap:2,children:[a.jsx(e,{alt:"Sneezy",onClick:r}),a.jsx(e,{compact:!0,alt:"Sneezy",as:"a",href:"/"})]})]}),a.jsxs(n,{gap:2,paddingTop:4,children:[a.jsx(t,{as:"h3",display:"block",font:"headline",children:"Loading"}),a.jsxs(o,{alignItems:"center",gap:2,children:[a.jsx(e,{loading:!0,accessibilityLabel:"Sneezy Button",alt:"Sneezy",onClick:r,src:c}),a.jsx(e,{compact:!0,loading:!0,accessibilityLabel:"Sneezy Button",alt:"Sneezy",as:"a",href:"/",src:c})]}),a.jsxs(o,{alignItems:"center",gap:2,children:[a.jsx(e,{loading:!0,accessibilityLabel:"Sneezy Button",alt:"Sneezy",onClick:r}),a.jsx(e,{compact:!0,loading:!0,accessibilityLabel:"Sneezy Button",alt:"Sneezy",as:"a",href:"/"})]})]}),a.jsxs(n,{gap:2,paddingTop:4,children:[a.jsx(t,{as:"h3",display:"block",font:"headline",children:"Colored Fallback"}),a.jsx(l,{})]}),a.jsxs(n,{gap:2,paddingTop:4,children:[a.jsx(t,{as:"h3",display:"block",font:"headline",children:"Colored Fallback Loading"}),a.jsx(l,{loading:!0})]}),a.jsxs(n,{gap:2,paddingTop:4,children:[a.jsx(t,{as:"h3",display:"block",font:"headline",children:"Colored Fallback Compact"}),a.jsx(l,{compact:!0})]}),a.jsxs(n,{gap:2,paddingTop:4,children:[a.jsx(t,{as:"h3",display:"block",font:"headline",children:"Colored Fallback Compact Loading"}),a.jsx(l,{compact:!0,loading:!0})]}),a.jsxs(n,{gap:2,paddingTop:4,children:[a.jsx(t,{as:"h3",display:"block",font:"headline",children:"Colored Fallback Selected"}),a.jsx(l,{selected:!0})]}),a.jsxs(n,{gap:2,paddingTop:4,children:[a.jsx(t,{as:"h3",display:"block",font:"headline",children:"Colored Fallback Square"}),a.jsx(l,{shape:"square"})]}),a.jsxs(n,{gap:2,paddingTop:4,children:[a.jsx(t,{as:"h3",display:"block",font:"headline",children:"Square Selected"}),a.jsx(l,{selected:!0,shape:"square"})]})]});s.__docgenInfo={description:"",methods:[],displayName:"Default"};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => {
  return <>
      <VStack gap={2}>
        <Text as="h3" display="block" font="headline">
          Default
        </Text>
        <HStack alignItems="center" gap={2}>
          <AvatarButton alt="Sneezy" onClick={handlePress} src={avatarImageUrl} />
          <AvatarButton compact alt="Sneezy" as="a" href="/" src={avatarImageUrl} />
        </HStack>
        <HStack alignItems="center" gap={2}>
          <AvatarButton alt="Sneezy" onClick={handlePress} />
          <AvatarButton compact alt="Sneezy" as="a" href="/" />
        </HStack>
      </VStack>
      <VStack gap={2} paddingTop={4}>
        <Text as="h3" display="block" font="headline">
          Loading
        </Text>
        <HStack alignItems="center" gap={2}>
          <AvatarButton loading accessibilityLabel="Sneezy Button" alt="Sneezy" onClick={handlePress} src={avatarImageUrl} />
          <AvatarButton compact loading accessibilityLabel="Sneezy Button" alt="Sneezy" as="a" href="/" src={avatarImageUrl} />
        </HStack>
        <HStack alignItems="center" gap={2}>
          <AvatarButton loading accessibilityLabel="Sneezy Button" alt="Sneezy" onClick={handlePress} />
          <AvatarButton compact loading accessibilityLabel="Sneezy Button" alt="Sneezy" as="a" href="/" />
        </HStack>
      </VStack>
      <VStack gap={2} paddingTop={4}>
        <Text as="h3" display="block" font="headline">
          Colored Fallback
        </Text>
        <FallbackColoredBase />
      </VStack>
      <VStack gap={2} paddingTop={4}>
        <Text as="h3" display="block" font="headline">
          Colored Fallback Loading
        </Text>
        <FallbackColoredBase loading />
      </VStack>
      <VStack gap={2} paddingTop={4}>
        <Text as="h3" display="block" font="headline">
          Colored Fallback Compact
        </Text>
        <FallbackColoredBase compact />
      </VStack>
      <VStack gap={2} paddingTop={4}>
        <Text as="h3" display="block" font="headline">
          Colored Fallback Compact Loading
        </Text>
        <FallbackColoredBase compact loading />
      </VStack>
      <VStack gap={2} paddingTop={4}>
        <Text as="h3" display="block" font="headline">
          Colored Fallback Selected
        </Text>
        <FallbackColoredBase selected />
      </VStack>
      <VStack gap={2} paddingTop={4}>
        <Text as="h3" display="block" font="headline">
          Colored Fallback Square
        </Text>
        <FallbackColoredBase shape="square" />
      </VStack>
      <VStack gap={2} paddingTop={4}>
        <Text as="h3" display="block" font="headline">
          Square Selected
        </Text>
        <FallbackColoredBase selected shape="square" />
      </VStack>
    </>;
}`,...s.parameters?.docs?.source}}};const L=["Default"];export{s as Default,L as __namedExportsOrder,I as default};
