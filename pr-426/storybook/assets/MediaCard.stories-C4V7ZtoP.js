import{r as a,j as e,B as E,c as B}from"./iframe-CsG_6vZR.js";import{a as q,e as L}from"./assets-CEwpm_uP.js";import{C as _,a as j}from"./Carousel-BcqwoI0L.js";import{V as m}from"./VStack-Cg_Yq2u4.js";import{R as k}from"./RemoteImage-CCsStlyO.js";import{C as A}from"./CardRoot-B1DGRbhC.js";import{H}from"./HStack-DaDYipoP.js";import{T as v}from"./Text-B1CpMNU3.js";import{T as J,a as X}from"./TextTitle3-Cjqqe3Pa.js";import{T as U}from"./TextLabel2-DIvbC7TV.js";import"./preload-helper-D9Z9MdNV.js";import"./useRefMap-BuzMvUkY.js";import"./IconButton-DNJ86Kiu.js";import"./Button-D2WSek5T.js";import"./Icon-DTs0crZh.js";import"./useTheme-CmrOhAty.js";import"./Spinner-C8x8bhOH.js";import"./Pressable-DDN99tmF.js";import"./isArray-M0ytM-vC.js";import"./Interactable--rqISG90.js";import"./color-Ceo1QMNe.js";import"./motion-minimal-5s2ikV7b.js";import"./use-drag-controls-C56Bq1Mg.js";import"./animate-8CM-1S-x.js";import"./use-animation-DHwoMYVB.js";import"./use-transform-j7n1sQYA.js";const N=a.memo(({title:i,subtitle:l,description:c,thumbnail:g,media:u,mediaPlacement:P="end",classNames:o={},styles:s={}})=>{const y=a.useMemo(()=>typeof i=="string"?e.jsx(v,{as:"div",font:"headline",numberOfLines:2,children:i}):i,[i]),w=a.useMemo(()=>typeof l=="string"?e.jsx(v,{as:"div",color:"fgMuted",font:"legal",numberOfLines:1,children:l}):l,[l]),R=a.useMemo(()=>e.jsxs(m,{className:o?.headerContainer,style:s?.headerContainer,children:[w,y]}),[w,y,s?.headerContainer,o?.headerContainer]),T=a.useMemo(()=>typeof c=="string"?e.jsx(v,{as:"p",color:"fgMuted",font:"label2",numberOfLines:2,children:c}):c,[c]),M=a.useMemo(()=>e.jsxs(m,{className:o?.contentContainer,flexBasis:"50%",gap:4,justifyContent:"space-between",padding:2,style:s?.contentContainer,children:[g,e.jsxs(m,{className:o?.textContainer,style:s?.textContainer,children:[R,T]})]}),[g,R,T,s?.contentContainer,o?.contentContainer,o?.textContainer,s?.textContainer]),S=a.useMemo(()=>{if(u)return e.jsx(E,{className:o?.mediaContainer,flexBasis:"50%",style:s?.mediaContainer,children:u})},[u,s?.mediaContainer,o?.mediaContainer]);return e.jsxs(H,{className:o?.layoutContainer,flexGrow:1,style:s?.layoutContainer,children:[P==="start"?S:M,P==="end"?S:M]})});N.__docgenInfo={description:"",methods:[],displayName:"MediaCardLayout",props:{title:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Text or React node to display as the card title. Use a Text component to override default color and font."},subtitle:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Text or React node to display as the card subtitle. Use a Text component to override default color and font."},description:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Text or React node to display as the card description. Use a Text component to override default color and font."},thumbnail:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"React node to display as a thumbnail in the content area."},media:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"React node to display as the main media content. When provided, it will be rendered in a Box container taking up 50% of the card width."},mediaPlacement:{required:!1,tsType:{name:"union",raw:"'start' | 'end'",elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'end'"}]},description:`The position of the media within the card.
@default 'end'`,defaultValue:{value:"'end'",computed:!1}},classNames:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /** Layout container element */
  layoutContainer?: string;
  /** Content container element */
  contentContainer?: string;
  /** Text container element */
  textContainer?: string;
  /** Header container element */
  headerContainer?: string;
  /** Media container element */
  mediaContainer?: string;
}`,signature:{properties:[{key:"layoutContainer",value:{name:"string",required:!1},description:"Layout container element"},{key:"contentContainer",value:{name:"string",required:!1},description:"Content container element"},{key:"textContainer",value:{name:"string",required:!1},description:"Text container element"},{key:"headerContainer",value:{name:"string",required:!1},description:"Header container element"},{key:"mediaContainer",value:{name:"string",required:!1},description:"Media container element"}]}},description:"",defaultValue:{value:"{}",computed:!1}},styles:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /** Layout container element */
  layoutContainer?: React.CSSProperties;
  /** Content container element */
  contentContainer?: React.CSSProperties;
  /** Text container element */
  textContainer?: React.CSSProperties;
  /** Header container element */
  headerContainer?: React.CSSProperties;
  /** Media container element */
  mediaContainer?: React.CSSProperties;
}`,signature:{properties:[{key:"layoutContainer",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Layout container element"},{key:"contentContainer",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Content container element"},{key:"textContainer",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Text container element"},{key:"headerContainer",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Header container element"},{key:"mediaContainer",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Media container element"}]}},description:"",defaultValue:{value:"{}",computed:!1}}}};const z={borderRadius:500,flexDirection:"row",background:"bgAlternate",overflow:"hidden"},t=a.memo(a.forwardRef(({title:i,subtitle:l,description:c,thumbnail:g,media:u,children:P,mediaPlacement:o="end",as:s,classNames:{root:y,...w}={},styles:{root:R,...T}={},className:M,style:S,...V},I)=>e.jsx(A,{ref:I,as:s,className:B(y,M),style:{...R,...S},...z,...V,children:e.jsx(N,{classNames:w,description:c,media:u,mediaPlacement:o,styles:T,subtitle:l,thumbnail:g,title:i})})));t.__docgenInfo={description:"",methods:[],displayName:"MediaCard",props:{mediaPlacement:{defaultValue:{value:"'end'",computed:!1},required:!1},classNames:{defaultValue:{value:"{}",computed:!1},required:!1},styles:{defaultValue:{value:"{}",computed:!1},required:!1}}};const d={title:"Title",subtitle:"Subtitle",description:"Description",width:320},n=e.jsx(k,{alt:"Ethereum thumbnail",shape:"circle",size:"l",source:L}),r=e.jsx(k,{alt:"Ethereum background",height:"100%",resizeMode:"cover",shape:"rectangle",src:L,width:"100%"}),p=()=>e.jsxs(m,{gap:2,children:[e.jsx(t,{...d,thumbnail:n}),e.jsx(t,{...d,media:r,thumbnail:n})]}),h=()=>e.jsxs(m,{gap:2,children:[e.jsx(t,{...d,media:r,mediaPlacement:"start",thumbnail:n}),e.jsx(t,{...d,media:r,mediaPlacement:"end",thumbnail:n})]}),b=()=>{const i=a.useRef(null),l=a.useRef(null),c=a.useRef(null);return e.jsxs(m,{gap:2,children:[e.jsx(t,{ref:i,as:"article",...d,media:r,thumbnail:n}),e.jsx(t,{ref:l,renderAsPressable:!0,accessibilityLabel:"View interactive card details",as:"a",description:"Clickable card with href",href:"https://www.google.com",media:r,subtitle:"Link",thumbnail:n,title:"Interactive Card",width:320}),e.jsx(t,{ref:c,renderAsPressable:!0,accessibilityLabel:"View interactive card details",as:"button",description:"Clickable card with onClick handler",media:r,onClick:()=>alert("Card clicked!"),subtitle:"Button",thumbnail:n,title:"Interactive Card",width:320})]})},C=()=>{const i=a.useRef(null);return e.jsxs(m,{gap:2,children:[e.jsx(t,{ref:i,renderAsPressable:!0,accessibilityLabel:"View card with long text content",as:"button",description:"This is a very long description text that demonstrates how the card handles longer content",media:r,subtitle:"This is a very long subtitle text that will get truncated",thumbnail:n,title:"This is a very long title text that will get truncated",width:320}),e.jsx(t,{description:e.jsxs(U,{as:"p",children:["Custom description with ",e.jsx("strong",{children:"bold text"})," and ",e.jsx("em",{children:"italic text"})]}),media:r,subtitle:e.jsx(X,{as:"p",color:"fgPositive",children:"Custom Subtitle"}),thumbnail:n,title:e.jsx(J,{as:"p",children:"Custom Title"}),width:320})]})},x=()=>e.jsxs(m,{gap:2,children:[e.jsx(t,{...d,media:r,styles:{layoutContainer:{gap:3},contentContainer:{padding:3,gap:2},textContainer:{gap:1},headerContainer:{gap:1},mediaContainer:{borderRadius:300}},thumbnail:n}),e.jsx(t,{...d,media:r,styles:{root:{borderWidth:2,borderColor:"blue"}},thumbnail:n}),e.jsx(t,{...d,classNames:{root:"custom-root-class"},media:r,thumbnail:n})]}),f=()=>{const i=a.useRef(null),l=a.useRef(null);return e.jsxs(_,{styles:{carousel:{gap:16}},children:[e.jsx(j,{id:"card1",children:e.jsx(t,{as:"article",...d,media:r,thumbnail:n})}),e.jsx(j,{id:"card2",children:e.jsx(t,{ref:i,renderAsPressable:!0,accessibilityLabel:"View Bitcoin details",as:"a",description:"Another card with different content",href:"https://www.google.com",media:r,subtitle:"BTC",thumbnail:e.jsx(k,{alt:"Bitcoin thumbnail",shape:"circle",size:"l",source:q.btc.imageUrl}),title:"Bitcoin",width:320})}),e.jsx(j,{id:"card3",children:e.jsx(t,{ref:l,renderAsPressable:!0,accessibilityLabel:"View Ethereum details",as:"button",description:"Card with onClick handler",onClick:()=>console.log("clicked"),subtitle:"ETH",thumbnail:n,title:"Ethereum",width:320})})]})},Ce={title:"Components/Cards/MediaCard",component:t};p.__docgenInfo={description:"",methods:[],displayName:"Basic"};h.__docgenInfo={description:"",methods:[],displayName:"MediaPlacement"};b.__docgenInfo={description:"",methods:[],displayName:"PolymorphicAndInteractive"};C.__docgenInfo={description:"",methods:[],displayName:"TextContent"};x.__docgenInfo={description:"",methods:[],displayName:"Styling"};f.__docgenInfo={description:"",methods:[],displayName:"MultipleCards"};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`(): JSX.Element => {
  return <VStack gap={2}>
      <MediaCard {...exampleProps} thumbnail={exampleThumbnail} />
      <MediaCard {...exampleProps} media={exampleMedia} thumbnail={exampleThumbnail} />
    </VStack>;
}`,...p.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`(): JSX.Element => {
  return <VStack gap={2}>
      <MediaCard {...exampleProps} media={exampleMedia} mediaPlacement="start" thumbnail={exampleThumbnail} />
      <MediaCard {...exampleProps} media={exampleMedia} mediaPlacement="end" thumbnail={exampleThumbnail} />
    </VStack>;
}`,...h.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`(): JSX.Element => {
  const articleRef = useRef<HTMLElement>(null);
  const anchorPressableRef = useRef<HTMLAnchorElement>(null);
  const buttonPressableRef = useRef<HTMLButtonElement>(null);
  return <VStack gap={2}>
      <MediaCard ref={articleRef} as="article" {...exampleProps} media={exampleMedia} thumbnail={exampleThumbnail} />
      <MediaCard ref={anchorPressableRef} renderAsPressable accessibilityLabel="View interactive card details" as="a" description="Clickable card with href" href="https://www.google.com" media={exampleMedia} subtitle="Link" thumbnail={exampleThumbnail} title="Interactive Card" width={320} />
      <MediaCard ref={buttonPressableRef} renderAsPressable accessibilityLabel="View interactive card details" as="button" description="Clickable card with onClick handler" media={exampleMedia} onClick={() => alert('Card clicked!')} subtitle="Button" thumbnail={exampleThumbnail} title="Interactive Card" width={320} />
    </VStack>;
}`,...b.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`(): JSX.Element => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  return <VStack gap={2}>
      <MediaCard ref={buttonRef} renderAsPressable accessibilityLabel="View card with long text content" as="button" description="This is a very long description text that demonstrates how the card handles longer content" media={exampleMedia} subtitle="This is a very long subtitle text that will get truncated" thumbnail={exampleThumbnail} title="This is a very long title text that will get truncated" width={320} />
      <MediaCard description={<TextLabel2 as="p">
            Custom description with <strong>bold text</strong> and <em>italic text</em>
          </TextLabel2>} media={exampleMedia} subtitle={<TextHeadline as="p" color="fgPositive">
            Custom Subtitle
          </TextHeadline>} thumbnail={exampleThumbnail} title={<TextTitle3 as="p">Custom Title</TextTitle3>} width={320} />
    </VStack>;
}`,...C.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`(): JSX.Element => {
  return <VStack gap={2}>
      <MediaCard {...exampleProps} media={exampleMedia} styles={{
      layoutContainer: {
        gap: 3
      },
      contentContainer: {
        padding: 3,
        gap: 2
      },
      textContainer: {
        gap: 1
      },
      headerContainer: {
        gap: 1
      },
      mediaContainer: {
        borderRadius: 300
      }
    }} thumbnail={exampleThumbnail} />
      <MediaCard {...exampleProps} media={exampleMedia} styles={{
      root: {
        borderWidth: 2,
        borderColor: 'blue'
      }
    }} thumbnail={exampleThumbnail} />
      <MediaCard {...exampleProps} classNames={{
      root: 'custom-root-class'
    }} media={exampleMedia} thumbnail={exampleThumbnail} />
    </VStack>;
}`,...x.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`(): JSX.Element => {
  const ref = useRef<HTMLAnchorElement>(null);
  const ref2 = useRef<HTMLButtonElement>(null);
  return <Carousel styles={{
    carousel: {
      gap: 16
    }
  }}>
      <CarouselItem id="card1">
        <MediaCard as="article" {...exampleProps} media={exampleMedia} thumbnail={exampleThumbnail} />
      </CarouselItem>
      <CarouselItem id="card2">
        <MediaCard ref={ref} renderAsPressable accessibilityLabel="View Bitcoin details" as="a" description="Another card with different content" href="https://www.google.com" media={exampleMedia} subtitle="BTC" thumbnail={<RemoteImage alt="Bitcoin thumbnail" shape="circle" size="l" source={assets.btc.imageUrl} />} title="Bitcoin" width={320} />
      </CarouselItem>
      <CarouselItem id="card3">
        <MediaCard ref={ref2} renderAsPressable accessibilityLabel="View Ethereum details" as="button" description="Card with onClick handler" onClick={() => console.log('clicked')} subtitle="ETH" thumbnail={exampleThumbnail} title="Ethereum" width={320} />
      </CarouselItem>
    </Carousel>;
}`,...f.parameters?.docs?.source}}};const xe=["Basic","MediaPlacement","PolymorphicAndInteractive","TextContent","Styling","MultipleCards"];export{p as Basic,h as MediaPlacement,f as MultipleCards,b as PolymorphicAndInteractive,x as Styling,C as TextContent,xe as __namedExportsOrder,Ce as default};
