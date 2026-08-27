import{r as u,j as e,c as K,B as A}from"./iframe-CsG_6vZR.js";import{a as n,e as T}from"./assets-CEwpm_uP.js";import{C as Y,a as Z}from"./Carousel-BcqwoI0L.js";import{N as ee}from"./NativeTextArea-D3EkpFL6.js";import{T as te}from"./TextInput-D5KGlaku.js";import{P as N}from"./Pressable-DDN99tmF.js";import{T as a}from"./Text-B1CpMNU3.js";import{L as oe}from"./LikeButton-JHIqxT0X.js";import{c as ne,b as ae}from"./card-CqcYFcP-.js";import{V as h}from"./VStack-Cg_Yq2u4.js";import{A as re}from"./Avatar-DB-9v412.js";import{H as U}from"./HStack-DaDYipoP.js";import{R as y}from"./RemoteImageGroup--wdF0WL6.js";import{I as v}from"./IconCounterButton-BZjOsRxO.js";import{R as t}from"./RemoteImage-CCsStlyO.js";import{B as g}from"./Button-D2WSek5T.js";import{I as J}from"./IconButton-DNJ86Kiu.js";import"./preload-helper-D9Z9MdNV.js";import"./useRefMap-BuzMvUkY.js";import"./motion-minimal-5s2ikV7b.js";import"./use-drag-controls-C56Bq1Mg.js";import"./animate-8CM-1S-x.js";import"./use-animation-DHwoMYVB.js";import"./use-transform-j7n1sQYA.js";import"./useMergeRefs-DR4sGa7m.js";import"./usePrefixedId-BL1THI0P.js";import"./context-fDezSldV.js";import"./HelperText-W0U74shX.js";import"./Icon-DTs0crZh.js";import"./useTheme-CmrOhAty.js";import"./InputLabel-CdlU6JsR.js";import"./InputStack-BFRjE954.js";import"./tokens-BwScSksM.js";import"./Interactable--rqISG90.js";import"./color-Ceo1QMNe.js";import"./ColorSurge-2yE2z4Kr.js";import"./useMotionProps-BXBckQBf.js";import"./utils-y2S18Lx0.js";import"./NativeInput-8PS_q8WF.js";import"./isArray-M0ytM-vC.js";import"./interactableHeight-DPdDzpO8.js";import"./convertDimensionToSize-B6MeOypY.js";import"./Spinner-C8x8bhOH.js";const se="article",r=u.memo(u.forwardRef(({as:m,testID:p,children:s,maxWidth:C=ae,minWidth:f=ne,borderRadius:c=500,padding:b=2,gap:x=2,...j},R)=>{const P=m??se;return e.jsx(h,{ref:R,as:P,borderRadius:c,gap:x,maxWidth:C,minWidth:f,padding:b,testID:p,...j,children:s})}));r.__docgenInfo={description:"",methods:[],displayName:"ContentCard",props:{maxWidth:{defaultValue:{value:"800",computed:!1},required:!1},minWidth:{defaultValue:{value:"280",computed:!1},required:!1},borderRadius:{defaultValue:{value:"500",computed:!1},required:!1},padding:{defaultValue:{value:"2",computed:!1},required:!1},gap:{defaultValue:{value:"2",computed:!1},required:!1}}};const ie="div",le={top:"top",bottom:"bottom",right:"end",left:"start"},i=u.memo(u.forwardRef(({as:m,body:p,label:s,media:C,mediaPosition:f="top",mediaPlacement:c=le[f],title:b,description:x=p,children:j,gap:R=1,testID:P,styles:w,style:z,classNames:S,className:q,...D},M)=>{const L=m??ie,k=c==="start"||c==="end",$=!!C&&(c==="top"||c==="start"),Q=!!C&&(c==="bottom"||c==="end"),_=u.useMemo(()=>typeof b=="string"?e.jsx(a,{as:"div",font:"headline",numberOfLines:2,children:b}):b,[b]),G=u.useMemo(()=>typeof x=="string"?e.jsx(a,{as:"p",color:"fgMuted",font:"label2",numberOfLines:3,children:x}):x,[x]),W=u.useMemo(()=>typeof s=="string"?e.jsx(a,{as:"div",font:"label2",children:s}):s,[s]),X=u.useMemo(()=>!_&&!G&&!W?null:e.jsxs(h,{className:S?.textContainer,gap:k?1:0,style:w?.textContainer,children:[_,G,W]}),[S?.textContainer,k,w?.textContainer,_,G,W]),O=k?e.jsx(A,{borderRadius:500,flexShrink:0,height:96,overflow:"hidden",width:96,children:C}):e.jsx(A,{borderRadius:500,overflow:"hidden",children:C});return e.jsxs(h,{ref:M,as:L,className:K(S?.root,q),gap:R,style:{...z,...w?.root},testID:P,...D,children:[(O||X)&&e.jsxs(A,{flexDirection:k?"row":"column",gap:k?2:1,justifyContent:c==="end"?"space-between":"flex-start",style:w?.contentContainer,children:[$&&O,X,Q&&O]}),j]})}));i.__docgenInfo={description:"",methods:[],displayName:"ContentCardBody",props:{mediaPosition:{defaultValue:{value:"'top'",computed:!1},required:!1},mediaPlacement:{defaultValue:{value:`{
  top: 'top',
  bottom: 'bottom',
  right: 'end',
  left: 'start',
}`,computed:!1},required:!1},description:{defaultValue:{value:"body",computed:!1},required:!1},gap:{defaultValue:{value:"1",computed:!1},required:!1}}};const de="footer",l=u.memo(u.forwardRef(({as:m,children:p,justifyContent:s="space-between",...C},f)=>{const c=m??de;return e.jsx(U,{ref:f,as:c,justifyContent:s,...C,children:p})}));l.__docgenInfo={description:"",methods:[],displayName:"ContentCardFooter",props:{testID:{required:!1,tsType:{name:"string"},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""},font:{required:!1,tsType:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"fontFamily"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"fontFamily",required:!1}},{key:"phone",value:{name:"fontFamily",required:!1}},{key:"tablet",value:{name:"fontFamily",required:!1}},{key:"desktop",value:{name:"fontFamily",required:!1}}]}}]},description:""},pin:{required:!1,tsType:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}]},description:"Direction in which to absolutely pin the box."},bordered:{required:!1,tsType:{name:"boolean"},description:"Add a border around all sides of the box."},borderedTop:{required:!1,tsType:{name:"boolean"},description:"Add a border to the top side of the box."},borderedBottom:{required:!1,tsType:{name:"boolean"},description:"Add a border to the bottom side of the box."},borderedStart:{required:!1,tsType:{name:"boolean"},description:"Add a border to the leading side of the box."},borderedEnd:{required:!1,tsType:{name:"boolean"},description:"Add a border to the trailing side of the box."},borderedHorizontal:{required:!1,tsType:{name:"boolean"},description:"Add a border to the leading and trailing sides of the box."},borderedVertical:{required:!1,tsType:{name:"boolean"},description:"Add a border to the top and bottom sides of the box."},dangerouslySetBackground:{required:!1,tsType:{name:"string"},description:"@danger This is a migration escape hatch. It is not intended to be used normally."},justifyContent:{defaultValue:{value:"'space-between'",computed:!1},required:!1}}};const ce="header",d=u.memo(u.forwardRef(({as:m,avatar:p,title:s,meta:C,end:f,subtitle:c=C,actions:b=f,thumbnail:x,styles:j,style:R,classNames:P,className:w,gap:z=1.5,...S},q)=>{const D=m??ce,M=u.useMemo(()=>typeof s=="string"?e.jsx(a,{as:"div",font:"label1",numberOfLines:1,children:s}):s,[s]),L=u.useMemo(()=>typeof c=="string"?e.jsx(a,{as:"div",color:"fgMuted",font:"legal",numberOfLines:1,children:c}):c,[c]),k=u.useMemo(()=>x||(typeof p=="string"?e.jsx(re,{alt:typeof s=="string"?s:void 0,name:typeof s=="string"?s:void 0,shape:"circle",size:"l",src:p}):p),[x,p,s]);return e.jsxs(U,{ref:q,alignItems:"center",as:D,className:K(P?.root,w),gap:z,justifyContent:"space-between",style:{...R,...j?.root},...S,children:[e.jsxs(U,{alignItems:"center",className:P?.contentContainer,gap:1.5,style:j?.contentContainer,children:[k,e.jsxs(h,{className:P?.textContainer,flexGrow:1,justifyContent:"flex-start",style:j?.textContainer,children:[M,L]})]}),b]})}));d.__docgenInfo={description:"",methods:[],displayName:"ContentCardHeader",props:{subtitle:{defaultValue:{value:"meta",computed:!1},required:!1},actions:{defaultValue:{value:"end",computed:!1},required:!1},gap:{defaultValue:{value:"1.5",computed:!1},required:!1}}};const o={contentHeaderProps:{thumbnail:e.jsx(t,{alt:"Ethereum thumbnail",shape:"circle",size:"l",source:T}),title:"CoinDesk",subtitle:"News",actions:e.jsxs(U,{gap:0,children:[e.jsx(J,{transparent:!0,accessibilityLabel:"favorite coinDesk card news",name:"star",variant:"secondary"}),e.jsx(J,{transparent:!0,accessibilityLabel:"More information about coinDesk card news",name:"more",variant:"secondary"})]})},contentBodyProps:{title:"Ethereum Network Shatters Records With Hashrate Climbing to 464 EH/s",description:"This is a description of the Ethereum Network Shatters Records With Hashrate Climbing to 464 EH/s, marking a significant milestone for the blockchain.",media:e.jsx(t,{alt:"Ethereum background",resizeMode:"cover",shape:"rectangle",src:T,width:"100%"}),mediaPlacement:"top"},contentFooterProps:{children:e.jsxs(e.Fragment,{children:[e.jsxs(y,{shape:"circle",size:32,children:[e.jsx(t,{alt:"Ethereum",source:n.eth.imageUrl}),e.jsx(t,{alt:"Polygon",source:n.polygon.imageUrl}),e.jsx(t,{alt:"Uniswap",source:n.uni.imageUrl}),e.jsx(t,{alt:"Sushi",source:n.sushi.imageUrl})]}),e.jsx(g,{compact:!0,variant:"secondary",children:"Share"})]})}},H=()=>e.jsxs(h,{gap:2,children:[e.jsxs(r,{width:500,children:[e.jsx(d,{...o.contentHeaderProps}),e.jsx(i,{...o.contentBodyProps}),e.jsx(l,{...o.contentFooterProps})]}),e.jsxs(r,{width:500,children:[e.jsx(d,{...o.contentHeaderProps}),e.jsx(i,{...o.contentBodyProps,media:null}),e.jsx(l,{...o.contentFooterProps})]})]}),F=()=>e.jsxs(h,{gap:2,children:[e.jsx(a,{as:"h3",display:"block",font:"headline",children:"mediaPlacement: top (default)"}),e.jsxs(r,{width:500,children:[e.jsx(d,{...o.contentHeaderProps}),e.jsx(i,{...o.contentBodyProps,mediaPlacement:"top"}),e.jsx(l,{...o.contentFooterProps})]}),e.jsx(a,{as:"h3",display:"block",font:"headline",children:"mediaPlacement: bottom"}),e.jsxs(r,{width:500,children:[e.jsx(d,{...o.contentHeaderProps}),e.jsx(i,{...o.contentBodyProps,mediaPlacement:"bottom"}),e.jsx(l,{...o.contentFooterProps})]}),e.jsx(a,{as:"h3",display:"block",font:"headline",children:"mediaPlacement: end"}),e.jsxs(r,{width:500,children:[e.jsx(d,{...o.contentHeaderProps}),e.jsx(i,{...o.contentBodyProps,mediaPlacement:"end"}),e.jsx(l,{...o.contentFooterProps})]}),e.jsx(a,{as:"h3",display:"block",font:"headline",children:"mediaPlacement: start"}),e.jsxs(r,{width:500,children:[e.jsx(d,{...o.contentHeaderProps}),e.jsx(i,{...o.contentBodyProps,mediaPlacement:"start"}),e.jsx(l,{...o.contentFooterProps})]})]}),E=()=>e.jsxs(h,{gap:2,children:[e.jsx(a,{as:"h3",display:"block",font:"headline",children:"Full example with background"}),e.jsxs(r,{background:"bgAlternate",width:500,children:[e.jsx(d,{...o.contentHeaderProps}),e.jsx(i,{...o.contentBodyProps}),e.jsxs(l,{children:[e.jsxs(y,{shape:"circle",size:32,children:[e.jsx(t,{alt:"Ethereum",source:n.eth.imageUrl}),e.jsx(t,{alt:"Polygon",source:n.polygon.imageUrl}),e.jsx(t,{alt:"Uniswap",source:n.uni.imageUrl}),e.jsx(t,{alt:"Sushi",source:n.sushi.imageUrl})]}),e.jsx(g,{compact:!0,variant:"tertiary",children:"Share"})]})]}),e.jsx(a,{as:"h3",display:"block",font:"headline",children:"mediaPlacement: end with background"}),e.jsxs(r,{background:"bgAlternate",width:500,children:[e.jsx(d,{...o.contentHeaderProps}),e.jsx(i,{...o.contentBodyProps,mediaPlacement:"end"}),e.jsxs(l,{children:[e.jsxs(y,{shape:"circle",size:32,children:[e.jsx(t,{alt:"Ethereum",source:n.eth.imageUrl}),e.jsx(t,{alt:"Polygon",source:n.polygon.imageUrl}),e.jsx(t,{alt:"Uniswap",source:n.uni.imageUrl}),e.jsx(t,{alt:"Sushi",source:n.sushi.imageUrl})]}),e.jsx(g,{compact:!0,variant:"tertiary",children:"Share"})]})]}),e.jsx(a,{as:"h3",display:"block",font:"headline",children:"No media with background"}),e.jsxs(r,{background:"bgAlternate",width:500,children:[e.jsx(d,{...o.contentHeaderProps}),e.jsx(i,{...o.contentBodyProps,media:null}),e.jsxs(l,{children:[e.jsxs(y,{shape:"circle",size:32,children:[e.jsx(t,{alt:"Ethereum",source:n.eth.imageUrl}),e.jsx(t,{alt:"Polygon",source:n.polygon.imageUrl}),e.jsx(t,{alt:"Uniswap",source:n.uni.imageUrl}),e.jsx(t,{alt:"Sushi",source:n.sushi.imageUrl})]}),e.jsx(g,{compact:!0,variant:"tertiary",children:"Share"})]})]}),e.jsx(a,{as:"h3",display:"block",font:"headline",children:"IconCounterButtons with background"}),e.jsxs(r,{background:"bgAlternate",width:500,children:[e.jsx(d,{...o.contentHeaderProps}),e.jsx(i,{...o.contentBodyProps,media:null}),e.jsx(l,{children:e.jsxs(U,{gap:4,justifyContent:"space-between",paddingTop:.5,children:[e.jsx(v,{accessibilityLabel:"like, 99 likes",count:99,icon:"heart"}),e.jsx(v,{accessibilityLabel:"comment, 4200 comments",count:4200,icon:"comment"}),e.jsx(v,{accessibilityLabel:"share, 9900000 shares",count:99e5,icon:"arrowsHorizontal"})]})})]})]}),B=()=>{const m=p=>{p.target.closest("button, a")||alert("Card pressed!")};return e.jsxs(h,{gap:2,children:[e.jsx(a,{as:"h3",display:"block",font:"headline",children:"Accessible pressable card"}),e.jsx(a,{as:"p",color:"fgMuted",display:"block",font:"body",children:'Uses as="div" with an internal button for keyboard/screen reader access.'}),e.jsx(N,{as:"div",background:"bg",borderRadius:500,onClick:m,width:"fit-content",children:e.jsxs(r,{width:500,children:[e.jsx(d,{subtitle:"News",thumbnail:e.jsx(t,{alt:"Ethereum",shape:"circle",size:"l",source:T}),title:"CoinDesk"}),e.jsx(i,{...o.contentBodyProps}),e.jsxs(l,{children:[e.jsxs(y,{shape:"circle",size:32,children:[e.jsx(t,{alt:"Ethereum",source:n.eth.imageUrl}),e.jsx(t,{alt:"Polygon",source:n.polygon.imageUrl}),e.jsx(t,{alt:"Uniswap",source:n.uni.imageUrl}),e.jsx(t,{alt:"Sushi",source:n.sushi.imageUrl})]}),e.jsx(g,{compact:!0,onClick:()=>alert("Card pressed!"),variant:"secondary",children:"View Details"})]})]})}),e.jsx(a,{as:"h3",display:"block",font:"headline",children:"Accessible pressable card with background"}),e.jsx(N,{as:"div",background:"bgAlternate",borderRadius:500,onClick:m,width:"fit-content",children:e.jsxs(r,{width:500,children:[e.jsx(d,{subtitle:"News",thumbnail:e.jsx(t,{alt:"Ethereum",shape:"circle",size:"l",source:T}),title:"CoinDesk"}),e.jsx(i,{...o.contentBodyProps}),e.jsxs(l,{children:[e.jsxs(y,{shape:"circle",size:32,children:[e.jsx(t,{alt:"Ethereum",source:n.eth.imageUrl}),e.jsx(t,{alt:"Polygon",source:n.polygon.imageUrl}),e.jsx(t,{alt:"Uniswap",source:n.uni.imageUrl}),e.jsx(t,{alt:"Sushi",source:n.sushi.imageUrl})]}),e.jsx(g,{compact:!0,onClick:()=>alert("Card pressed!"),variant:"tertiary",children:"View Details"})]})]})}),e.jsx(a,{as:"h3",display:"block",font:"headline",children:"Accessible pressable card (no media)"}),e.jsx(N,{as:"div",background:"bgAlternate",borderRadius:500,onClick:m,width:"fit-content",children:e.jsxs(r,{width:500,children:[e.jsx(d,{subtitle:"News",thumbnail:e.jsx(t,{alt:"Ethereum",shape:"circle",size:"l",source:T}),title:"CoinDesk"}),e.jsx(i,{...o.contentBodyProps,media:null}),e.jsxs(l,{children:[e.jsxs(y,{shape:"circle",size:32,children:[e.jsx(t,{alt:"Ethereum",source:n.eth.imageUrl}),e.jsx(t,{alt:"Polygon",source:n.polygon.imageUrl}),e.jsx(t,{alt:"Uniswap",source:n.uni.imageUrl}),e.jsx(t,{alt:"Sushi",source:n.sushi.imageUrl})]}),e.jsx(g,{compact:!0,onClick:()=>alert("Card pressed!"),variant:"tertiary",children:"View Details"})]})]})}),e.jsx(a,{as:"h3",display:"block",font:"headline",children:"Accessible pressable card (disabled)"}),e.jsx(N,{disabled:!0,as:"div",background:"bgAlternate",borderRadius:500,onClick:m,width:"fit-content",children:e.jsxs(r,{width:500,children:[e.jsx(d,{...o.contentHeaderProps}),e.jsx(i,{...o.contentBodyProps,media:null}),e.jsxs(l,{children:[e.jsxs(y,{shape:"circle",size:32,children:[e.jsx(t,{alt:"Ethereum",source:n.eth.imageUrl}),e.jsx(t,{alt:"Polygon",source:n.polygon.imageUrl}),e.jsx(t,{alt:"Uniswap",source:n.uni.imageUrl}),e.jsx(t,{alt:"Sushi",source:n.sushi.imageUrl})]}),e.jsx(g,{compact:!0,disabled:!0,variant:"tertiary",children:"View Details"})]})]})})]})},V=()=>e.jsxs(h,{gap:2,children:[e.jsx(a,{as:"h3",display:"block",font:"headline",children:"With TextInput"}),e.jsxs(r,{bordered:!0,width:500,children:[e.jsx(d,{...o.contentHeaderProps}),e.jsx(i,{...o.contentBodyProps,media:null,children:e.jsx(te,{inputNode:e.jsx(ee,{cols:5,onChange:()=>{},placeholder:"Type something here...",rows:7,value:"Custom content"}),label:"TextArea with character counter"})}),e.jsxs(l,{children:[e.jsxs(U,{gap:1,children:[e.jsx(oe,{liked:!0,accessibilityLabel:"9999 likes, like coinDesk card news",count:9999}),e.jsx(J,{transparent:!0,accessibilityLabel:"share coinDesk news",name:"share"})]}),e.jsx(g,{compact:!0,variant:"secondary",children:"Share"})]})]}),e.jsx(a,{as:"h3",display:"block",font:"headline",children:"With IconCounterButtons"}),e.jsxs(r,{bordered:!0,width:500,children:[e.jsx(d,{...o.contentHeaderProps}),e.jsx(i,{...o.contentBodyProps,media:null}),e.jsxs(l,{justifyContent:"space-between",children:[e.jsx(v,{accessibilityLabel:"like, 99 likes",count:99,icon:"heart"}),e.jsx(v,{accessibilityLabel:"comment, 4200 comments",count:4200,icon:"comment"}),e.jsx(v,{accessibilityLabel:"share, 9900000 shares",count:99e5,icon:"arrowsHorizontal"})]})]})]}),I=()=>e.jsxs(h,{children:[e.jsx(a,{as:"h3",display:"block",font:"headline",children:"Full Example with product component - Carousel"}),e.jsxs(r,{bordered:!0,width:500,children:[e.jsx(d,{...o.contentHeaderProps}),e.jsx(i,{...o.contentBodyProps,media:null,children:e.jsx(Y,{styles:{carousel:{gap:16}},children:[1,2,3,4,5].map(m=>e.jsx(Z,{id:`carousel-item-${m}`,children:e.jsxs(h,{position:"relative",children:[e.jsx(A,{borderRadius:400,overflow:"hidden",children:e.jsx(t,{alt:"Ethereum promotional content",height:381,resizeMode:"cover",shape:"rectangle",source:T,width:259})}),e.jsxs(h,{bottom:16,gap:1,left:16,position:"absolute",children:[e.jsx(a,{as:"h3",display:"block",font:"headline",children:"Break the cycle"}),e.jsx(a,{as:"p",display:"block",font:"legal",children:"24M views"})]})]})},m))})}),e.jsx(l,{...o.contentFooterProps})]})]}),et={title:"Components/Cards/ContentCard",component:r};I.parameters={a11y:{config:{rules:[{id:"scrollable-region-focusable",enabled:!1}]}}};H.__docgenInfo={description:"",methods:[],displayName:"Basic"};F.__docgenInfo={description:"",methods:[],displayName:"MediaPlacement"};E.__docgenInfo={description:"",methods:[],displayName:"WithBackground"};B.__docgenInfo={description:`Pressable Cards

To make a ContentCard interactive, wrap it in a Pressable component.
For proper accessibility, use \`as="div"\` on the Pressable to render it as a
non-interactive container, then include an internal button for keyboard and
screen reader users.

This allows:
- Mouse/touch users: Click anywhere on the card
- Screen reader users: Navigate through card content and focus on the action button
- Keyboard users: Tab to the action button`,methods:[],displayName:"PressableCards"};V.__docgenInfo={description:"",methods:[],displayName:"CustomContent"};I.__docgenInfo={description:"",methods:[],displayName:"ProductCarousel"};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`(): JSX.Element => {
  return <VStack gap={2}>
      <ContentCard width={500}>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} />
        <ContentCardFooter {...exampleProps.contentFooterProps} />
      </ContentCard>
      <ContentCard width={500}>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} media={null} />
        <ContentCardFooter {...exampleProps.contentFooterProps} />
      </ContentCard>
    </VStack>;
}`,...H.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`(): JSX.Element => {
  return <VStack gap={2}>
      <Text as="h3" display="block" font="headline">
        mediaPlacement: top (default)
      </Text>
      <ContentCard width={500}>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} mediaPlacement="top" />
        <ContentCardFooter {...exampleProps.contentFooterProps} />
      </ContentCard>
      <Text as="h3" display="block" font="headline">
        mediaPlacement: bottom
      </Text>
      <ContentCard width={500}>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} mediaPlacement="bottom" />
        <ContentCardFooter {...exampleProps.contentFooterProps} />
      </ContentCard>
      <Text as="h3" display="block" font="headline">
        mediaPlacement: end
      </Text>
      <ContentCard width={500}>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} mediaPlacement="end" />
        <ContentCardFooter {...exampleProps.contentFooterProps} />
      </ContentCard>
      <Text as="h3" display="block" font="headline">
        mediaPlacement: start
      </Text>
      <ContentCard width={500}>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} mediaPlacement="start" />
        <ContentCardFooter {...exampleProps.contentFooterProps} />
      </ContentCard>
    </VStack>;
}`,...F.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`(): JSX.Element => {
  return <VStack gap={2}>
      <Text as="h3" display="block" font="headline">
        Full example with background
      </Text>
      <ContentCard background="bgAlternate" width={500}>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} />
        <ContentCardFooter>
          <RemoteImageGroup shape="circle" size={32}>
            <RemoteImage alt="Ethereum" source={assets.eth.imageUrl} />
            <RemoteImage alt="Polygon" source={assets.polygon.imageUrl} />
            <RemoteImage alt="Uniswap" source={assets.uni.imageUrl} />
            <RemoteImage alt="Sushi" source={assets.sushi.imageUrl} />
          </RemoteImageGroup>
          <Button compact variant="tertiary">
            Share
          </Button>
        </ContentCardFooter>
      </ContentCard>
      <Text as="h3" display="block" font="headline">
        mediaPlacement: end with background
      </Text>
      <ContentCard background="bgAlternate" width={500}>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} mediaPlacement="end" />
        <ContentCardFooter>
          <RemoteImageGroup shape="circle" size={32}>
            <RemoteImage alt="Ethereum" source={assets.eth.imageUrl} />
            <RemoteImage alt="Polygon" source={assets.polygon.imageUrl} />
            <RemoteImage alt="Uniswap" source={assets.uni.imageUrl} />
            <RemoteImage alt="Sushi" source={assets.sushi.imageUrl} />
          </RemoteImageGroup>
          <Button compact variant="tertiary">
            Share
          </Button>
        </ContentCardFooter>
      </ContentCard>
      <Text as="h3" display="block" font="headline">
        No media with background
      </Text>
      <ContentCard background="bgAlternate" width={500}>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} media={null} />
        <ContentCardFooter>
          <RemoteImageGroup shape="circle" size={32}>
            <RemoteImage alt="Ethereum" source={assets.eth.imageUrl} />
            <RemoteImage alt="Polygon" source={assets.polygon.imageUrl} />
            <RemoteImage alt="Uniswap" source={assets.uni.imageUrl} />
            <RemoteImage alt="Sushi" source={assets.sushi.imageUrl} />
          </RemoteImageGroup>
          <Button compact variant="tertiary">
            Share
          </Button>
        </ContentCardFooter>
      </ContentCard>
      <Text as="h3" display="block" font="headline">
        IconCounterButtons with background
      </Text>
      <ContentCard background="bgAlternate" width={500}>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} media={null} />
        <ContentCardFooter>
          <HStack gap={4} justifyContent="space-between" paddingTop={0.5}>
            <IconCounterButton accessibilityLabel="like, 99 likes" count={99} icon="heart" />
            <IconCounterButton accessibilityLabel="comment, 4200 comments" count={4200} icon="comment" />
            <IconCounterButton accessibilityLabel="share, 9900000 shares" count={9900000} icon="arrowsHorizontal" />
          </HStack>
        </ContentCardFooter>
      </ContentCard>
    </VStack>;
}`,...E.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`(): JSX.Element => {
  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent double-triggering when clicking the button
    if ((e.target as HTMLElement).closest('button, a')) return;
    alert('Card pressed!');
  };
  return <VStack gap={2}>
      <Text as="h3" display="block" font="headline">
        Accessible pressable card
      </Text>
      <Text as="p" color="fgMuted" display="block" font="body">
        Uses as=&quot;div&quot; with an internal button for keyboard/screen reader access.
      </Text>
      <Pressable as="div" background="bg" borderRadius={500} onClick={handleCardClick} width="fit-content">
        <ContentCard width={500}>
          <ContentCardHeader subtitle="News" thumbnail={<RemoteImage alt="Ethereum" shape="circle" size="l" source={ethBackground} />} title="CoinDesk" />
          <ContentCardBody {...exampleProps.contentBodyProps} />
          <ContentCardFooter>
            <RemoteImageGroup shape="circle" size={32}>
              <RemoteImage alt="Ethereum" source={assets.eth.imageUrl} />
              <RemoteImage alt="Polygon" source={assets.polygon.imageUrl} />
              <RemoteImage alt="Uniswap" source={assets.uni.imageUrl} />
              <RemoteImage alt="Sushi" source={assets.sushi.imageUrl} />
            </RemoteImageGroup>
            <Button compact onClick={() => alert('Card pressed!')} variant="secondary">
              View Details
            </Button>
          </ContentCardFooter>
        </ContentCard>
      </Pressable>

      <Text as="h3" display="block" font="headline">
        Accessible pressable card with background
      </Text>
      <Pressable as="div" background="bgAlternate" borderRadius={500} onClick={handleCardClick} width="fit-content">
        <ContentCard width={500}>
          <ContentCardHeader subtitle="News" thumbnail={<RemoteImage alt="Ethereum" shape="circle" size="l" source={ethBackground} />} title="CoinDesk" />
          <ContentCardBody {...exampleProps.contentBodyProps} />
          <ContentCardFooter>
            <RemoteImageGroup shape="circle" size={32}>
              <RemoteImage alt="Ethereum" source={assets.eth.imageUrl} />
              <RemoteImage alt="Polygon" source={assets.polygon.imageUrl} />
              <RemoteImage alt="Uniswap" source={assets.uni.imageUrl} />
              <RemoteImage alt="Sushi" source={assets.sushi.imageUrl} />
            </RemoteImageGroup>
            <Button compact onClick={() => alert('Card pressed!')} variant="tertiary">
              View Details
            </Button>
          </ContentCardFooter>
        </ContentCard>
      </Pressable>

      <Text as="h3" display="block" font="headline">
        Accessible pressable card (no media)
      </Text>
      <Pressable as="div" background="bgAlternate" borderRadius={500} onClick={handleCardClick} width="fit-content">
        <ContentCard width={500}>
          <ContentCardHeader subtitle="News" thumbnail={<RemoteImage alt="Ethereum" shape="circle" size="l" source={ethBackground} />} title="CoinDesk" />
          <ContentCardBody {...exampleProps.contentBodyProps} media={null} />
          <ContentCardFooter>
            <RemoteImageGroup shape="circle" size={32}>
              <RemoteImage alt="Ethereum" source={assets.eth.imageUrl} />
              <RemoteImage alt="Polygon" source={assets.polygon.imageUrl} />
              <RemoteImage alt="Uniswap" source={assets.uni.imageUrl} />
              <RemoteImage alt="Sushi" source={assets.sushi.imageUrl} />
            </RemoteImageGroup>
            <Button compact onClick={() => alert('Card pressed!')} variant="tertiary">
              View Details
            </Button>
          </ContentCardFooter>
        </ContentCard>
      </Pressable>

      <Text as="h3" display="block" font="headline">
        Accessible pressable card (disabled)
      </Text>
      <Pressable disabled as="div" background="bgAlternate" borderRadius={500} onClick={handleCardClick} width="fit-content">
        <ContentCard width={500}>
          <ContentCardHeader {...exampleProps.contentHeaderProps} />
          <ContentCardBody {...exampleProps.contentBodyProps} media={null} />
          <ContentCardFooter>
            <RemoteImageGroup shape="circle" size={32}>
              <RemoteImage alt="Ethereum" source={assets.eth.imageUrl} />
              <RemoteImage alt="Polygon" source={assets.polygon.imageUrl} />
              <RemoteImage alt="Uniswap" source={assets.uni.imageUrl} />
              <RemoteImage alt="Sushi" source={assets.sushi.imageUrl} />
            </RemoteImageGroup>
            <Button compact disabled variant="tertiary">
              View Details
            </Button>
          </ContentCardFooter>
        </ContentCard>
      </Pressable>
    </VStack>;
}`,...B.parameters?.docs?.source},description:{story:`Pressable Cards

To make a ContentCard interactive, wrap it in a Pressable component.
For proper accessibility, use \`as="div"\` on the Pressable to render it as a
non-interactive container, then include an internal button for keyboard and
screen reader users.

This allows:
- Mouse/touch users: Click anywhere on the card
- Screen reader users: Navigate through card content and focus on the action button
- Keyboard users: Tab to the action button`,...B.parameters?.docs?.description}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`(): JSX.Element => {
  return <VStack gap={2}>
      <Text as="h3" display="block" font="headline">
        With TextInput
      </Text>
      <ContentCard bordered width={500}>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} media={null}>
          <TextInput inputNode={<NativeTextArea cols={5} onChange={() => {}} placeholder="Type something here..." rows={7} value="Custom content" />} label="TextArea with character counter" />
        </ContentCardBody>
        <ContentCardFooter>
          <HStack gap={1}>
            <LikeButton liked accessibilityLabel="9999 likes, like coinDesk card news" count={9999} />
            <IconButton transparent accessibilityLabel="share coinDesk news" name="share" />
          </HStack>
          <Button compact variant="secondary">
            Share
          </Button>
        </ContentCardFooter>
      </ContentCard>

      <Text as="h3" display="block" font="headline">
        With IconCounterButtons
      </Text>
      <ContentCard bordered width={500}>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} media={null} />
        <ContentCardFooter justifyContent="space-between">
          <IconCounterButton accessibilityLabel="like, 99 likes" count={99} icon="heart" />
          <IconCounterButton accessibilityLabel="comment, 4200 comments" count={4200} icon="comment" />
          <IconCounterButton accessibilityLabel="share, 9900000 shares" count={9900000} icon="arrowsHorizontal" />
        </ContentCardFooter>
      </ContentCard>
    </VStack>;
}`,...V.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`() => {
  return <VStack>
      <Text as="h3" display="block" font="headline">
        Full Example with product component - Carousel
      </Text>
      <ContentCard bordered width={500}>
        <ContentCardHeader {...exampleProps.contentHeaderProps} />
        <ContentCardBody {...exampleProps.contentBodyProps} media={null}>
          <Carousel styles={{
          carousel: {
            gap: 16
          }
        }}>
            {[1, 2, 3, 4, 5].map(id => <CarouselItem key={id} id={\`carousel-item-\${id}\`}>
                <VStack position="relative">
                  <Box borderRadius={400} overflow="hidden">
                    <RemoteImage alt="Ethereum promotional content" height={381} resizeMode="cover" shape="rectangle" source={ethBackground} width={259} />
                  </Box>
                  <VStack bottom={16} gap={1} left={16} position="absolute">
                    <Text as="h3" display="block" font="headline">
                      Break the cycle
                    </Text>
                    <Text as="p" display="block" font="legal">
                      24M views
                    </Text>
                  </VStack>
                </VStack>
              </CarouselItem>)}
          </Carousel>
        </ContentCardBody>
        <ContentCardFooter {...exampleProps.contentFooterProps} />
      </ContentCard>
    </VStack>;
}`,...I.parameters?.docs?.source}}};const tt=["Basic","MediaPlacement","WithBackground","PressableCards","CustomContent","ProductCarousel"];export{H as Basic,V as CustomContent,F as MediaPlacement,B as PressableCards,I as ProductCarousel,E as WithBackground,tt as __namedExportsOrder,et as default};
