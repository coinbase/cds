import{r as n,j as e,d as j,z as S}from"./iframe-CYDANtMt.js";import{a as C}from"./assets-CEwpm_uP.js";import{g as P}from"./sizing-Do56D2dQ.js";import{P as B}from"./Pictogram-BOyJGVDK.js";import{P as I}from"./Pressable-BvczHaFK.js";import{D as b}from"./DotCount-DjzjxUju.js";import{V as f}from"./VStack-iXgNewwv.js";import{T as w}from"./Text-0g3rWpAf.js";import{H as d}from"./HStack-Fh-9TmPm.js";import{R as T}from"./RemoteImage-S3YFINhn.js";import"./preload-helper-D9Z9MdNV.js";import"./versionMap-CcI7tU1w.js";import"./createIllustration-CSKQDVzw.js";import"./convertDimensionToSize-B6MeOypY.js";import"./useTheme-C_Ehsh33.js";import"./isArray-BJmyNVUi.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";import"./tokens-BwScSksM.js";import"./NewAnimatePresence-BIvSMOo2.js";import"./index-DaxQGrHc.js";import"./motion-minimal-B1h7XI-_.js";import"./use-unmount-effect-DjWyEMV9.js";import"./useMotionProps-BF3bCUsm.js";import"./utils-CM_X5is-.js";import"./dotStyles-Ccp1dKIN.js";const v=.8,y="truncatedCss-t10tdeuv",z="visibleCss-vmelj5m",k=n.memo(({title:r,count:o,showOverflow:s,children:l})=>{const[c,m]=n.useState(!1),p=s??c?z:y,h=n.useCallback(()=>{s===void 0&&m(!0)},[s]),g=n.useCallback(()=>{s===void 0&&m(!1)},[s]),x=n.useMemo(()=>o?e.jsx(b,{count:o,pin:"top-end",children:l}):l,[l,o]);return e.jsxs(f,{alignItems:"center",gap:1,justifyContent:"center",onMouseEnter:h,onMouseLeave:g,padding:1,width:"var(--controlSize-tileSize)",children:[e.jsx(f,{alignItems:"center",justifyContent:"center",children:x}),e.jsx(w,{as:"p",className:p,display:"block",font:"label2",textAlign:"center",children:r})]})});k.__docgenInfo={description:"@danger this component is for internal use only",methods:[],displayName:"Tile",props:{title:{required:!0,tsType:{name:"string"},description:""},count:{required:!1,tsType:{name:"number"},description:"Surfaces a DotCount around the content"},showOverflow:{required:!1,tsType:{name:"boolean"},description:"Reveals truncated title text"},children:{required:!1,tsType:{name:"JSX.Element"},description:""}}};const R="button",t=n.memo(n.forwardRef(({as:r,pictogram:o,title:s,count:l,children:c,showOverflow:m,...p},h)=>{const g=r??R;j()&&s.trim()===""&&console.warn("Setting an empty title in TileButton violates accessibility and CDS usage guidelines.");const x=n.useMemo(()=>c||e.jsx(B,{name:o,scaleMultiplier:v}),[c,o]);return e.jsx("div",{style:{height:"var(--controlSize-tileSize)",width:`calc(var(--controlSize-tileSize) + ${P}px)`},children:e.jsx(I,{ref:h,noScaleOnPress:!0,transparentWhileInactive:!0,as:g,background:"bg",borderRadius:400,...p,children:e.jsx(k,{count:l,showOverflow:m,title:s,children:x})})})}));t.__docgenInfo={description:"",methods:[],displayName:"TileButton"};const se={title:"Components/Buttons/TileButton",component:t},i=()=>console.log("Pressed"),u=(r,o)=>o-r+S.interactable,a=()=>e.jsxs(f,{gap:.5,children:[e.jsxs(d,{zIndex:u(1,3),children:[e.jsx(t,{onClick:i,pictogram:"2fa",title:"Coinbase"}),e.jsx(t,{showOverflow:!0,onClick:i,pictogram:"addToWatchlist",title:"Private Client"}),e.jsx(t,{onClick:i,pictogram:"authenticatorProgress",showOverflow:!1,title:"This Title Will Be Three Lines"})]}),e.jsxs(d,{zIndex:u(2,3),children:[e.jsx(t,{onClick:i,pictogram:"addCard",title:"Pro"}),e.jsx(t,{onClick:i,pictogram:"phone",title:"I'm a Two Line Title"}),e.jsx(t,{onClick:i,pictogram:"bitcoinWhitePaper",title:"Asset Hub"})]}),e.jsxs(d,{zIndex:u(3,3),children:[e.jsx(t,{onClick:i,pictogram:"cardDeclined",title:"Wallet"}),e.jsx(t,{onClick:i,pictogram:"coinbaseOneLogo",title:"Commerce"}),e.jsx(t,{onClick:i,pictogram:"chart",title:"Analytics"})]}),e.jsxs(d,{zIndex:u(4,3),children:[e.jsx(t,{count:0,onClick:i,title:"Bitcoin",children:e.jsx(T,{height:38.4,source:C.btc.imageUrl,width:38.4})}),e.jsx(t,{count:1,onClick:i,title:"Ethereum",children:e.jsx(T,{height:38.4,source:C.eth.imageUrl,width:38.4})}),e.jsx(t,{count:100,onClick:i,title:"Sushi",children:e.jsx(T,{height:38.4,source:C.sushi.imageUrl,width:38.4})})]})]});a.__docgenInfo={description:"",methods:[],displayName:"TileButtonPictogram"};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`() => {
  return <VStack gap={0.5}>
      <HStack zIndex={getZIndexFromRow(1, 3)}>
        <TileButton onClick={handlePress} pictogram="2fa" title="Coinbase" />
        <TileButton showOverflow onClick={handlePress} pictogram="addToWatchlist" title="Private Client" />
        <TileButton onClick={handlePress} pictogram="authenticatorProgress" showOverflow={false} title="This Title Will Be Three Lines" />
      </HStack>
      <HStack zIndex={getZIndexFromRow(2, 3)}>
        <TileButton onClick={handlePress} pictogram="addCard" title="Pro" />
        <TileButton onClick={handlePress} pictogram="phone" title="I'm a Two Line Title" />
        <TileButton onClick={handlePress} pictogram="bitcoinWhitePaper" title="Asset Hub" />
      </HStack>
      <HStack zIndex={getZIndexFromRow(3, 3)}>
        <TileButton onClick={handlePress} pictogram="cardDeclined" title="Wallet" />
        <TileButton onClick={handlePress} pictogram="coinbaseOneLogo" title="Commerce" />
        <TileButton onClick={handlePress} pictogram="chart" title="Analytics" />
      </HStack>
      <HStack zIndex={getZIndexFromRow(4, 3)}>
        <TileButton count={0} onClick={handlePress} title="Bitcoin">
          <RemoteImage height={38.4} source={assets.btc.imageUrl} width={38.4} />
        </TileButton>
        <TileButton count={1} onClick={handlePress} title="Ethereum">
          <RemoteImage height={38.4} source={assets.eth.imageUrl} width={38.4} />
        </TileButton>
        <TileButton count={100} onClick={handlePress} title="Sushi">
          <RemoteImage height={38.4} source={assets.sushi.imageUrl} width={38.4} />
        </TileButton>
      </HStack>
    </VStack>;
}`,...a.parameters?.docs?.source}}};const ne=["TileButtonPictogram"];export{a as TileButtonPictogram,ne as __namedExportsOrder,se as default};
