import{j as e}from"./iframe-CsG_6vZR.js";import{g as d}from"./getAvatarFallbackColor-DxJcQAjK.js";import{H as r}from"./HStack-DaDYipoP.js";import{V as l}from"./VStack-Cg_Yq2u4.js";import{T as c}from"./Text-B1CpMNU3.js";import{A as t}from"./Avatar-DB-9v412.js";import"./preload-helper-D9Z9MdNV.js";import"./color-Ceo1QMNe.js";import"./RemoteImage-CCsStlyO.js";const h={blue:"blue60",teal:"teal60",purple:"purple60",pink:"pink60",green:"green60",gray:"gray60",orange:"orange60",yellow:"yellow60",indigo:"indigo60",red:"red60",chartreuse:"chartreuse60"},i="https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg",f={component:t,title:"Components/Avatar"},n=["s","m","l","xl","xxl","xxxl"],k=["Sneezy","Happy","Sleepy","Doc","Bashful","Grumpy","Dopey","Lilo","Stitch"],o=()=>e.jsxs("div",{children:[e.jsxs(l,{gap:2,children:[e.jsx(c,{as:"h3",display:"block",font:"headline",children:"Default"}),e.jsx(r,{alignItems:"center",gap:2,children:n.map((a,s)=>e.jsx(t,{alt:"",size:a,src:i},s))}),e.jsx(r,{alignItems:"center",gap:2,children:n.map((a,s)=>e.jsx(t,{alt:"",shape:"square",size:a,src:i},s))}),e.jsx(r,{alignItems:"center",gap:2,children:n.map((a,s)=>e.jsx(t,{alt:"",shape:"hexagon",size:a,src:i},s))})]}),e.jsxs(l,{gap:2,paddingTop:2,children:[e.jsx(c,{as:"h3",display:"block",font:"headline",children:"With borderColor prop"}),e.jsx(r,{alignItems:"center",gap:2,children:n.map((a,s)=>e.jsx(t,{alt:"",borderColor:"bgPositive",size:a,src:i},s))}),e.jsx(r,{alignItems:"center",gap:2,children:n.map((a,s)=>e.jsx(t,{alt:"",borderColor:"bgPositive",shape:"square",size:a,src:i},s))}),e.jsx(r,{alignItems:"center",gap:2,children:n.map((a,s)=>e.jsx(t,{alt:"",borderColor:"bgPositive",shape:"hexagon",size:a,src:i},s))})]}),e.jsxs(l,{gap:2,paddingTop:2,children:[e.jsx(c,{as:"h3",display:"block",font:"headline",children:"With Selected prop"}),e.jsx(r,{alignItems:"center",gap:2,children:n.map((a,s)=>e.jsx(t,{selected:!0,alt:"",size:a,src:i},s))}),e.jsx(r,{alignItems:"center",gap:2,children:n.map((a,s)=>e.jsx(t,{selected:!0,alt:"",shape:"square",size:a,src:i},s))}),e.jsx(r,{alignItems:"center",gap:2,children:n.map((a,s)=>e.jsx(t,{selected:!0,alt:"",shape:"hexagon",size:a,src:i},s))})]})]}),p=()=>e.jsxs("div",{children:[e.jsxs(l,{gap:2,children:[e.jsx(c,{as:"h3",display:"block",font:"headline",children:"Default"}),e.jsx(r,{alignItems:"baseline",gap:2,children:n.map((a,s)=>e.jsx(t,{alt:"",size:a},s))}),e.jsx(r,{alignItems:"baseline",gap:2,children:n.map((a,s)=>e.jsx(t,{alt:"",name:"Alice",shape:"square",size:a},s))}),e.jsx(r,{alignItems:"baseline",gap:2,children:n.map((a,s)=>e.jsx(t,{alt:"",shape:"hexagon",size:a},s))})]}),e.jsxs(l,{gap:2,paddingTop:2,children:[e.jsx(c,{as:"h3",display:"block",font:"headline",children:"With borderColor prop"}),e.jsx(r,{alignItems:"center",gap:2,children:n.map((a,s)=>e.jsx(t,{alt:"",borderColor:"bgPositive",size:a},s))}),e.jsx(r,{alignItems:"center",gap:2,children:n.map((a,s)=>e.jsx(t,{alt:"",borderColor:"bgPositive",shape:"square",size:a},s))}),e.jsx(r,{alignItems:"center",gap:2,children:n.map((a,s)=>e.jsx(t,{alt:"",borderColor:"bgPositive",shape:"hexagon",size:a},s))})]}),e.jsxs(l,{gap:2,paddingTop:2,children:[e.jsx(c,{as:"h3",display:"block",font:"headline",children:"With Selected prop"}),e.jsx(r,{alignItems:"center",gap:2,children:n.map((a,s)=>e.jsx(t,{selected:!0,alt:"",size:a},s))}),e.jsx(r,{alignItems:"center",gap:2,children:n.map((a,s)=>e.jsx(t,{selected:!0,alt:"",shape:"square",size:a},s))}),e.jsx(r,{alignItems:"center",gap:2,children:n.map((a,s)=>e.jsx(t,{selected:!0,alt:"",shape:"hexagon",size:a},s))})]})]}),x=Object.keys(h),m=()=>e.jsx(r,{alignItems:"center",flexWrap:"wrap",gap:2,children:x.map(a=>e.jsx(t,{colorScheme:a,name:a,size:"l"},a))}),g=()=>e.jsx(r,{alignItems:"center",flexWrap:"wrap",gap:2,children:k.map(a=>{const s=d(a);return e.jsx(t,{alt:"",colorScheme:s,name:a},a)})});o.__docgenInfo={description:"",methods:[],displayName:"Normal"};p.__docgenInfo={description:"",methods:[],displayName:"FallbackImage"};m.__docgenInfo={description:"",methods:[],displayName:"ColorSchemes"};g.__docgenInfo={description:"",methods:[],displayName:"FallbackColored"};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => {
  return <div>
      <VStack gap={2}>
        <Text as="h3" display="block" font="headline">
          Default
        </Text>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => <Avatar key={i} alt="" size={size} src={avatarImageUrl} />)}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => <Avatar key={i} alt="" shape="square" size={size} src={avatarImageUrl} />)}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => <Avatar key={i} alt="" shape="hexagon" size={size} src={avatarImageUrl} />)}
        </HStack>
      </VStack>
      <VStack gap={2} paddingTop={2}>
        <Text as="h3" display="block" font="headline">
          With borderColor prop
        </Text>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => <Avatar key={i} alt="" borderColor="bgPositive" size={size} src={avatarImageUrl} />)}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => <Avatar key={i} alt="" borderColor="bgPositive" shape="square" size={size} src={avatarImageUrl} />)}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => <Avatar key={i} alt="" borderColor="bgPositive" shape="hexagon" size={size} src={avatarImageUrl} />)}
        </HStack>
      </VStack>
      <VStack gap={2} paddingTop={2}>
        <Text as="h3" display="block" font="headline">
          With Selected prop
        </Text>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => <Avatar key={i} selected alt="" size={size} src={avatarImageUrl} />)}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => <Avatar key={i} selected alt="" shape="square" size={size} src={avatarImageUrl} />)}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => <Avatar key={i} selected alt="" shape="hexagon" size={size} src={avatarImageUrl} />)}
        </HStack>
      </VStack>
    </div>;
}`,...o.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => {
  return <div>
      <VStack gap={2}>
        <Text as="h3" display="block" font="headline">
          Default
        </Text>
        <HStack alignItems="baseline" gap={2}>
          {sizes.map((size, i) => <Avatar key={i} alt="" size={size} />)}
        </HStack>
        <HStack alignItems="baseline" gap={2}>
          {sizes.map((size, i) => <Avatar key={i} alt="" name="Alice" shape="square" size={size} />)}
        </HStack>
        <HStack alignItems="baseline" gap={2}>
          {sizes.map((size, i) => <Avatar key={i} alt="" shape="hexagon" size={size} />)}
        </HStack>
      </VStack>
      <VStack gap={2} paddingTop={2}>
        <Text as="h3" display="block" font="headline">
          With borderColor prop
        </Text>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => <Avatar key={i} alt="" borderColor="bgPositive" size={size} />)}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => <Avatar key={i} alt="" borderColor="bgPositive" shape="square" size={size} />)}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => <Avatar key={i} alt="" borderColor="bgPositive" shape="hexagon" size={size} />)}
        </HStack>
      </VStack>
      <VStack gap={2} paddingTop={2}>
        <Text as="h3" display="block" font="headline">
          With Selected prop
        </Text>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => <Avatar key={i} selected alt="" size={size} />)}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => <Avatar key={i} selected alt="" shape="square" size={size} />)}
        </HStack>
        <HStack alignItems="center" gap={2}>
          {sizes.map((size, i) => <Avatar key={i} selected alt="" shape="hexagon" size={size} />)}
        </HStack>
      </VStack>
    </div>;
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => {
  return <HStack alignItems="center" flexWrap="wrap" gap={2}>
      {colorSchemes.map(colorScheme => <Avatar key={colorScheme} colorScheme={colorScheme} name={colorScheme} size="l" />)}
    </HStack>;
}`,...m.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => {
  return <HStack alignItems="center" flexWrap="wrap" gap={2}>
      {names.map(name => {
      const avatarFallbackColor = getAvatarFallbackColor(name);
      return <Avatar key={name} alt="" colorScheme={avatarFallbackColor} name={name} />;
    })}
    </HStack>;
}`,...g.parameters?.docs?.source}}};const A=["Normal","FallbackImage","ColorSchemes","FallbackColored"];export{m as ColorSchemes,g as FallbackColored,p as FallbackImage,o as Normal,A as __namedExportsOrder,f as default};
