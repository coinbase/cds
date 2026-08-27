import{j as e}from"./iframe-CYDANtMt.js";import{s as x}from"./assets-CEwpm_uP.js";import{b as d}from"./avatars-ZXmt2F4t.js";import{T as n}from"./Text-0g3rWpAf.js";import{R as c}from"./RemoteImage-S3YFINhn.js";import{V as r}from"./VStack-iXgNewwv.js";import{H as l}from"./HStack-Fh-9TmPm.js";import"./preload-helper-D9Z9MdNV.js";const F={component:c,title:"Components/RemoteImage"},k=["bgPrimary","bgPrimaryWash","bgSecondary","bgPositive","bgNegative","bgLine","bgLineHeavy","transparent","bgWarning"],i={resizeMode:"cover",shape:"circle",width:32,height:32},g="whiteBorderCss-w1db1a1x",o="https://avatars.slack-edge.com/2019-12-09/865473396980_e8c83b072b452e4d03f7_192.jpg",h=Array.from({length:4}),m=()=>e.jsx(l,{gap:2,children:d.map((s,t)=>{const a=`squircle-${t}`;return e.jsxs(r,{children:[e.jsx(n,{font:"body",children:s}),e.jsx(c,{shape:"squircle",size:s,source:o},a)]},a)})}),u=()=>e.jsx(l,{gap:2,children:d.map((s,t)=>{const a=`circle-${t}`;return e.jsxs(r,{children:[e.jsx(n,{font:"body",children:s}),e.jsx(c,{shape:"circle",size:s,source:o})]},a)})}),S=()=>e.jsx(r,{gap:2,children:k.map((s,t)=>{const a=`border-imgs-${t}`;return e.jsx(c,{borderColor:s,shape:"circle",size:"xxl",source:o},a)})}),j=()=>e.jsx(r,{gap:1,children:k.map((s,t)=>{const a=`border-svgs-${t}`;return e.jsx(c,{borderColor:s,shape:"circle",size:"xxl",source:x[0]},a)})}),y=()=>e.jsx(r,{gap:1,children:d.map((s,t)=>{const a=`circle-fallback-${t}`;return e.jsxs(r,{children:[e.jsx(n,{font:"body",children:s}),e.jsx(c,{shape:"circle",size:s})]},a)})}),b=()=>e.jsx(r,{gap:1,children:d.map((s,t)=>{const a=`square-fallback-${t}`;return e.jsxs(r,{children:[e.jsx(n,{font:"body",children:s}),e.jsx(c,{shape:"square",size:s})]},a)})}),f=()=>e.jsx(c,{height:10,shape:"rectangle",width:30}),p=()=>e.jsxs(e.Fragment,{children:[e.jsxs(r,{gap:2,children:[e.jsx(n,{as:"h3",display:"block",font:"title1",children:"Default Shape"}),e.jsx(l,{gap:2,children:h.map((s,t)=>{const a=`square-${t}`;return e.jsx(c,{source:o,...i,shape:"square"},a)})})]}),e.jsxs(r,{gap:2,children:[e.jsx(n,{as:"h3",display:"block",font:"title1",children:"Circle Shape"}),e.jsx(l,{gap:2,children:h.map((s,t)=>{const a=`square-${t}`;return e.jsx(c,{source:o,...i},a)})})]}),e.jsxs(r,{gap:2,children:[e.jsx(n,{as:"h3",display:"block",font:"title1",children:"Squircle Shape"}),e.jsx(l,{gap:2,children:h.map((s,t)=>{const a=`squircle-${t}`;return e.jsx(c,{source:o,...i,shape:"squircle"},a)})})]}),e.jsxs(r,{gap:2,children:[e.jsx(n,{as:"h3",display:"block",font:"title1",children:"SVGs"}),e.jsx(l,{gap:2,children:x.map((s,t)=>{const a=`svg-${t}`;return e.jsx(c,{source:s,...i,shape:"squircle"},a)})})]}),e.jsxs(r,{gap:2,children:[e.jsx(n,{as:"h3",display:"block",font:"title1",children:"DangerouslySetClassName"}),e.jsx(l,{gap:2,children:x.map((s,t)=>{const a=`svg-${t}`;return e.jsx(c,{className:g,source:s,...i,shape:"squircle"},a)})})]}),e.jsxs(r,{gap:2,children:[e.jsx(n,{as:"h3",display:"block",font:"title1",children:"Avatar Sizes with Circle"}),e.jsx(u,{})]}),e.jsxs(r,{gap:2,children:[e.jsx(n,{as:"h3",display:"block",font:"title1",children:"Avatar Sizes with Squircle"}),e.jsx(m,{})]}),e.jsxs(r,{gap:2,children:[e.jsx(n,{as:"h3",display:"block",font:"title1",children:"Border Color Imgs"}),e.jsx(S,{})]}),e.jsxs(r,{gap:2,children:[e.jsx(n,{as:"h3",display:"block",font:"title1",children:"Border Color Svgs"}),e.jsx(j,{})]}),e.jsxs(r,{gap:2,children:[e.jsx(n,{as:"h3",display:"block",font:"title1",children:"Circle Fallback"}),e.jsx(y,{})]}),e.jsxs(r,{gap:2,children:[e.jsx(n,{as:"h3",display:"block",font:"title1",children:"Rectangle Fallback"}),e.jsx(f,{})]}),e.jsxs(r,{gap:2,children:[e.jsx(n,{as:"h3",display:"block",font:"title1",children:"Square Fallback"}),e.jsx(b,{})]})]});p.__docgenInfo={description:"",methods:[],displayName:"Default"};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => {
  return <>
      <VStack gap={2}>
        <Text as="h3" display="block" font="title1">
          Default Shape
        </Text>
        <HStack gap={2}>
          {mockItems.map((_, idx) => {
          const key = \`square-\${idx}\`;
          return <RemoteImage key={key} source={imageURL} {...sharedProps} shape="square" />;
        })}
        </HStack>
      </VStack>
      <VStack gap={2}>
        <Text as="h3" display="block" font="title1">
          Circle Shape
        </Text>
        <HStack gap={2}>
          {mockItems.map((_, idx) => {
          const key = \`square-\${idx}\`;
          return <RemoteImage key={key} source={imageURL} {...sharedProps} />;
        })}
        </HStack>
      </VStack>
      <VStack gap={2}>
        <Text as="h3" display="block" font="title1">
          Squircle Shape
        </Text>
        <HStack gap={2}>
          {mockItems.map((_, idx) => {
          const key = \`squircle-\${idx}\`;
          return <RemoteImage key={key} source={imageURL} {...sharedProps} shape="squircle" />;
        })}
        </HStack>
      </VStack>
      <VStack gap={2}>
        <Text as="h3" display="block" font="title1">
          SVGs
        </Text>
        <HStack gap={2}>
          {svgs.map((imgURL, idx) => {
          const key = \`svg-\${idx}\`;
          return <RemoteImage key={key} source={imgURL} {...sharedProps} shape="squircle" />;
        })}
        </HStack>
      </VStack>
      <VStack gap={2}>
        <Text as="h3" display="block" font="title1">
          DangerouslySetClassName
        </Text>
        <HStack gap={2}>
          {svgs.map((imgURL, idx) => {
          const key = \`svg-\${idx}\`;
          return <RemoteImage key={key} className={whiteBorderCss} source={imgURL} {...sharedProps} shape="squircle" />;
        })}
        </HStack>
      </VStack>
      <VStack gap={2}>
        <Text as="h3" display="block" font="title1">
          Avatar Sizes with Circle
        </Text>
        <AvatarSizesWithCircle />
      </VStack>
      <VStack gap={2}>
        <Text as="h3" display="block" font="title1">
          Avatar Sizes with Squircle
        </Text>
        <AvatarSizesWithSquircle />
      </VStack>
      <VStack gap={2}>
        <Text as="h3" display="block" font="title1">
          Border Color Imgs
        </Text>
        <BorderColorImg />
      </VStack>
      <VStack gap={2}>
        <Text as="h3" display="block" font="title1">
          Border Color Svgs
        </Text>
        <BorderColorSvgs />
      </VStack>
      <VStack gap={2}>
        <Text as="h3" display="block" font="title1">
          Circle Fallback
        </Text>
        <CircleFallback />
      </VStack>
      <VStack gap={2}>
        <Text as="h3" display="block" font="title1">
          Rectangle Fallback
        </Text>
        <RectangleFallback />
      </VStack>
      <VStack gap={2}>
        <Text as="h3" display="block" font="title1">
          Square Fallback
        </Text>
        <SquareFallback />
      </VStack>
    </>;
}`,...p.parameters?.docs?.source}}};const H=["Default"];export{p as Default,H as __namedExportsOrder,F as default};
