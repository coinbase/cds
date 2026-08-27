import{r as a,j as e,B as S}from"./iframe-BXWLBCkp.js";import{B as O}from"./ButtonGroup-CH8icdlI.js";import{u as w}from"./useTheme-BJazYlse.js";import{F as v}from"./FullscreenModal-DejEVFgq.js";import{P as q}from"./Pressable-sl8uFeki.js";import{T as B}from"./Text-Ch_dBU4v.js";import{V as k}from"./VStack-CnEfMFeL.js";import{P as z}from"./Pictogram-BmcSIU-q.js";import{B as d}from"./Button-W9Shg4T1.js";import{H as m}from"./HStack-B6p8qBpp.js";import{L as R}from"./ListCell-ptUFGvkT.js";import{C as A}from"./CellMedia-BVxosPAx.js";import{D as X}from"./Divider-DIvJbvj9.js";import{A as E}from"./Avatar-BEPDWfa1.js";import{I as G}from"./Icon-CgDQ3NQp.js";import{T as N}from"./TextInput-CXMiH86I.js";import"./preload-helper-D9Z9MdNV.js";import"./useA11yLabels-CsHGrhyH.js";import"./LogoMark-C448m09K.js";import"./IconButton-OIX0AFCz.js";import"./Spinner-BAI0lrZ-.js";import"./FullscreenModalLayout-BAtM9Cva.js";import"./OverlayContentContext-hT53AGt-.js";import"./useMotionProps-CS-LE6l8.js";import"./utils-CwomCnHN.js";import"./tokens-BwScSksM.js";import"./FocusTrap-90tMQkIg.js";import"./useMergeRefs-DR4sGa7m.js";import"./debounce-fynzmAtJ.js";import"./Overlay-XiDupmt3.js";import"./motion-minimal-SVRWJYUW.js";import"./ModalWrapper-D-DvdkD-.js";import"./NewAnimatePresence-BbA2hDPb.js";import"./index-B2twlf45.js";import"./use-unmount-effect-5QIafHMH.js";import"./useScrollBlocker-4Da9qMHo.js";import"./Portal-tAONErW2.js";import"./isArray-JxMDBx0e.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./versionMap-CcI7tU1w.js";import"./createIllustration-B8-1WYve.js";import"./convertDimensionToSize-B6MeOypY.js";import"./useCellSpacing-BuZVtSR4.js";import"./sizing-Do56D2dQ.js";import"./Cell-CB_dChqK.js";import"./CellAccessory-BypMgxs5.js";import"./isRtl-Du0XdnX5.js";import"./RemoteImage-Lksm6NI7.js";import"./usePrefixedId-Dfl-0DGQ.js";import"./context-Cc0ZOVig.js";import"./HelperText-C1uG41Fa.js";import"./InputLabel-C3lBKQeI.js";import"./InputStack-DO5lXlgp.js";import"./ColorSurge-D5iBCkQQ.js";import"./use-animation-CYeuSrS_.js";import"./NativeInput-CDtkEvxu.js";const Z=450,$="div",g=a.memo(a.forwardRef(({as:i,pictogram:t,title:o,description:s,children:r,action:n,onActionPress:c,actionAccessibilityLabel:l,end:u,bordered:b=!1,testID:V,accessibilityLabel:I,maxWidth:D=Z,style:P,...H},W)=>{const F=i??$,_=a.useMemo(()=>({phone:b?4:0,tablet:4,desktop:4}),[b]);return e.jsxs(k,{ref:W,accessibilityLabel:I,as:F,background:"bg",borderRadius:400,bordered:b,gap:2,maxWidth:D,paddingX:_,paddingY:4,style:P,testID:V,...H,children:[typeof t=="string"?e.jsx(z,{dimension:"48x48",name:t,testID:`${V}-pictogram`}):t,typeof o=="string"?e.jsx(B,{as:"h1",display:"block",font:"title1",children:o}):o,typeof s=="string"?e.jsx(B,{as:"p",color:"fgMuted",display:"block",font:"body",numberOfLines:3,children:s}):s,!!r&&e.jsx(S,{display:"block",testID:`${V}-primary-content`,children:r}),n&&(a.isValidElement(n)?n:e.jsx(d,{accessibilityLabel:l,onClick:c,children:n})),u]})}));g.__docgenInfo={description:"",methods:[],displayName:"MultiContentModule",props:{bordered:{defaultValue:{value:"false",computed:!1},required:!1},maxWidth:{defaultValue:{value:"450",computed:!1},required:!1}}};const C=24,p=()=>console.log("onPress"),L=()=>{const i=a.useRef(null);return{triggerRef:i,focusTrigger:()=>{i.current?.focus()}}},U=()=>{const t=w().activeColorScheme==="light"?"black":"white";return e.jsx("svg",{fill:"none",height:C,viewBox:"0 0 16 17",width:C,xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M5.373.219C4.025.506 2.899 1.637 2.556 3.04c-.119.487-.119 1.298 0 1.784.347 1.423 1.465 2.53 2.848 2.822.225.048.447.06.897.048.506-.02.64-.036.928-.133.798-.264 1.391-.686 1.857-1.326.297-.402.478-.77.62-1.237.1-.328.107-.41.107-1.066 0-.657-.008-.738-.106-1.066C9.33 1.617 8.458.713 7.229.304 6.93.202 6.826.19 6.261.178c-.422-.008-.715.004-.888.04zM12.563 4.84a2.81 2.81 0 00-1.481.856c-.783.823-1.02 2.075-.593 3.15.217.551.707 1.127 1.197 1.41l.241.142.004 2.27v2.271l.605.616.604.62 1.023-1.054 1.027-1.054-.612-.628-.612-.628.604-.62c.328-.341.6-.637.6-.657 0-.02-.216-.264-.481-.536-.265-.271-.474-.502-.466-.51.011-.008.162-.094.335-.195a2.972 2.972 0 001.363-1.804c.095-.381.107-1.09.02-1.456A2.952 2.952 0 0013.9 4.881c-.305-.085-1.024-.106-1.336-.04zm1.04 1.346c.193.138.383.483.383.702 0 .206-.166.543-.328.668-.182.142-.51.211-.72.155a.89.89 0 01-.612-.811c-.004-.673.743-1.09 1.276-.714zM4.168 9.065C2.343 9.352.81 10.69.233 12.499c-.197.624-.233.94-.233 2.14v1.09h10.667v-4.621l-.316-.308a4.4 4.4 0 01-.838-1.111l-.134-.264-.435-.15C8.237 9.032 7.901 9 6.1 9.004c-1.126.004-1.68.02-1.932.06z",fill:t})})},Y=()=>{const t=w().activeColorScheme==="light"?"black":"white";return e.jsx("svg",{fill:"none",height:C,viewBox:"0 0 25 25",width:C,xmlns:"http://www.w3.org/2000/svg",children:e.jsx("g",{id:"icon",children:e.jsxs("g",{id:"logo googleg 48dp",children:[e.jsx("path",{clipRule:"evenodd",d:"M24.02 12.7729C24.02 11.922 23.9436 11.1038 23.8018 10.3184H12.5V14.9602H18.9582C18.68 16.4602 17.8345 17.7311 16.5636 18.582V21.5929H20.4418C22.7109 19.5038 24.02 16.4274 24.02 12.7729Z",fill:t,fillRule:"evenodd",id:"Shape"}),e.jsx("path",{clipRule:"evenodd",d:"M12.5 24.4998C15.74 24.4998 18.4564 23.4252 20.4418 21.5925L16.5636 18.5816C15.4891 19.3016 14.1145 19.7271 12.5 19.7271C9.37455 19.7271 6.72909 17.6161 5.78546 14.7798H1.77637V17.8889C3.75091 21.8107 7.80909 24.4998 12.5 24.4998Z",fill:t,fillRule:"evenodd",id:"Shape_2"}),e.jsx("path",{clipRule:"evenodd",d:"M5.78545 14.7801C5.54545 14.0601 5.40909 13.291 5.40909 12.5001C5.40909 11.7091 5.54545 10.9401 5.78545 10.2201V7.11096H1.77636C0.963636 8.73096 0.5 10.5637 0.5 12.5001C0.5 14.4364 0.963636 16.2691 1.77636 17.8891L5.78545 14.7801Z",fill:t,fillRule:"evenodd",id:"Shape_3"}),e.jsx("path",{clipRule:"evenodd",d:"M12.5 5.27273C14.2618 5.27273 15.8436 5.87818 17.0873 7.06727L20.5291 3.62545C18.4509 1.68909 15.7345 0.5 12.5 0.5C7.80909 0.5 3.75091 3.18909 1.77637 7.11091L5.78546 10.22C6.72909 7.38364 9.37455 5.27273 12.5 5.27273Z",fill:t,fillRule:"evenodd",id:"Shape_4"})]})})})},J=()=>{const t=w().activeColorScheme==="light"?"black":"white";return e.jsx("svg",{fill:"none",height:C,viewBox:"0 0 24 24",width:C,xmlns:"http://www.w3.org/2000/svg",children:e.jsx("g",{id:"Apple Logo",children:e.jsx("path",{d:"M21.2808 18.424C20.933 19.2275 20.5213 19.9672 20.0442 20.6472C19.394 21.5743 18.8616 22.216 18.4513 22.5724C17.8153 23.1573 17.1338 23.4568 16.4041 23.4739C15.8802 23.4739 15.2485 23.3248 14.513 23.0224C13.7752 22.7214 13.0972 22.5724 12.4772 22.5724C11.827 22.5724 11.1296 22.7214 10.3837 23.0224C9.63662 23.3248 9.03481 23.4824 8.57468 23.498C7.87491 23.5278 7.1774 23.2197 6.48118 22.5724C6.03681 22.1848 5.48099 21.5204 4.81515 20.5791C4.10075 19.5739 3.51342 18.4084 3.05329 17.0795C2.56051 15.6442 2.31348 14.2543 2.31348 12.9087C2.31348 11.3673 2.64654 10.0379 3.31366 8.92385C3.83796 8.029 4.53546 7.32312 5.40844 6.80493C6.28142 6.28674 7.22468 6.02267 8.24048 6.00578C8.7963 6.00578 9.52518 6.1777 10.431 6.51559C11.3342 6.85462 11.9141 7.02655 12.1684 7.02655C12.3585 7.02655 13.0028 6.82552 14.0949 6.42473C15.1278 6.05305 15.9995 5.89916 16.7136 5.95978C18.6487 6.11595 20.1024 6.87876 21.0693 8.25303C19.3386 9.30163 18.4826 10.7703 18.4996 12.6544C18.5152 14.122 19.0476 15.3432 20.0939 16.3129C20.5681 16.7629 21.0977 17.1107 21.6868 17.3578C21.5591 17.7283 21.4242 18.0832 21.2808 18.424ZM16.8428 0.960131C16.8428 2.11039 16.4226 3.18439 15.5849 4.17847C14.5741 5.36023 13.3514 6.04311 12.0256 5.93536C12.0087 5.79736 11.9989 5.65213 11.9989 5.49951C11.9989 4.39526 12.4796 3.21349 13.3333 2.24724C13.7595 1.75801 14.3015 1.35122 14.9588 1.02671C15.6147 0.707053 16.2352 0.530273 16.8187 0.5C16.8357 0.653772 16.8428 0.807554 16.8428 0.960116V0.960131Z",fill:t,id:"path4"})})})},T={title:"Multi Content Module",description:"The body copy can be up to 3 lines but shorter is always better.",pictogram:"waiting"},M=[{icon:"wallet",title:"Enhanced security",description:"Use your connected wallet to verify instead of your email and password",active:!0},{icon:"defi",title:"Works across devices",description:"Wallet sign in can be used on all your other devices with your wallet"},{icon:"protection",title:"Safe and secure",description:"Resistant to security issues, like  phishing, password breaches, and more"}],K=[{name:"Passkey",icon:e.jsx(U,{})},{name:"Google",icon:e.jsx(Y,{})},{name:"Apple",icon:e.jsx(J,{})},{name:"Wallet",icon:e.jsx(G,{active:!0,color:"fg",name:"wallet",size:"m"})}],h=()=>{const[i,t]=a.useState(!0),{triggerRef:o,focusTrigger:s}=L(),r=e.jsx(m,{justifyContent:"center",children:e.jsx(g,{action:"Button",actionAccessibilityLabel:"Button Label",onActionPress:p,...T,children:M.map(({icon:n,active:c,title:l,description:u},b)=>e.jsx(R,{multiline:!0,description:u,media:e.jsx(A,{active:c,name:n,type:"icon"}),outerSpacing:{paddingX:0},title:l},b))})});return e.jsxs(e.Fragment,{children:[e.jsx(d,{ref:o,onClick:()=>t(!0),children:"Open Modal"}),e.jsx(v,{hideDivider:!0,accessibilityLabel:"mcm-modal",closeAccessibilityLabel:"Close Modal",onDidClose:s,onRequestClose:()=>t(!1),primaryContent:r,visible:i})]})},y=()=>{const[i,t]=a.useState(!0),{triggerRef:o,focusTrigger:s}=L(),r=e.jsx(m,{justifyContent:"center",children:e.jsx(g,{bordered:!0,action:"Button",actionAccessibilityLabel:"Button Label",onActionPress:p,...T,children:M.map(({icon:n,title:c,description:l},u)=>e.jsx(R,{multiline:!0,description:l,media:e.jsx(A,{name:n,type:"icon"}),outerSpacing:{paddingX:0},title:c},u))})});return e.jsxs(e.Fragment,{children:[e.jsx(d,{ref:o,onClick:()=>t(!0),children:"Open Modal"}),e.jsx(v,{hideDivider:!0,accessibilityLabel:"mcm-modal",closeAccessibilityLabel:"Close Modal",onDidClose:s,onRequestClose:()=>t(!1),primaryContent:r,visible:i})]})},f=()=>{const[i,t]=a.useState(!0),{triggerRef:o,focusTrigger:s}=L(),r=e.jsx(k,{paddingTop:1,children:e.jsxs(O,{accessibilityLabel:"Group",direction:"vertical",children:[e.jsx(d,{accessibilityLabel:"continue",onClick:p,children:"Continue"}),e.jsx(d,{accessibilityLabel:"cancel",onClick:p,variant:"secondary",children:"Cancel"})]})}),n=e.jsx(m,{justifyContent:"center",children:e.jsx(g,{bordered:!0,action:r,...T,children:e.jsx(S,{bordered:!0,borderColor:"bgPrimary",borderRadius:300,children:e.jsx(R,{description:"Satoshi Nakamoto",media:e.jsx(E,{alt:"Sneezy",colorScheme:"blue",name:"Sneezy"}),title:"satoshi@coinbase.com"})})})});return e.jsxs(e.Fragment,{children:[e.jsx(d,{ref:o,onClick:()=>t(!0),children:"Open Modal"}),e.jsx(v,{hideDivider:!0,accessibilityLabel:"mcm-modal",closeAccessibilityLabel:"Close Modal",onDidClose:s,onRequestClose:()=>t(!1),primaryContent:n,visible:i})]})},x=()=>{const[i,t]=a.useState(!0),{triggerRef:o,focusTrigger:s}=L(),r=e.jsxs(k,{gap:1,paddingX:3,children:[e.jsxs(k,{children:[e.jsx(m,{justifyContent:"center",zIndex:1,children:e.jsx(S,{background:"bg",paddingX:1.5,children:e.jsx(B,{color:"fgMuted",font:"body",children:"OR"})})}),e.jsx(X,{marginTop:-1.5,paddingBottom:1.5})]}),e.jsx(m,{gap:2,justifyContent:"space-between",children:K.map(({icon:c,name:l})=>e.jsxs(k,{alignItems:"center",children:[e.jsx(q,{accessibilityLabel:l,background:"bgSecondary",borderColor:"transparent",borderRadius:1e3,borderWidth:100,onClick:p,children:e.jsx(S,{padding:2,children:c})}),e.jsx(B,{color:"fgMuted",font:"label2",paddingTop:1,children:l})]},l))})]}),n=e.jsx(m,{justifyContent:"center",children:e.jsx(g,{bordered:!0,action:"Continue",actionAccessibilityLabel:"Continue",end:r,onActionPress:p,...T,children:e.jsx(N,{label:"Email",placeholder:"placeholder"})})});return e.jsxs(e.Fragment,{children:[e.jsx(d,{ref:o,onClick:()=>t(!0),children:"Open Modal"}),e.jsx(v,{hideDivider:!0,accessibilityLabel:"mcm-modal",closeAccessibilityLabel:"Close Modal",onDidClose:s,onRequestClose:()=>t(!1),primaryContent:n,visible:i})]})},j=()=>{const[i,t]=a.useState(!0),{triggerRef:o,focusTrigger:s}=L(),r=e.jsx(m,{justifyContent:"center",children:e.jsx(g,{action:"Button",actionAccessibilityLabel:"Button Label",description:"This is a long description. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",onActionPress:p,title:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",children:[...M,...M,...M].map(({icon:n,title:c,description:l},u)=>e.jsx(R,{multiline:!0,description:l,media:e.jsx(A,{name:n,type:"icon"}),outerSpacing:{paddingX:0},title:c},u))})});return e.jsxs(e.Fragment,{children:[e.jsx(d,{ref:o,onClick:()=>t(!0),children:"Open Modal"}),e.jsx(v,{hideDivider:!0,accessibilityLabel:"mcm-modal",closeAccessibilityLabel:"Close modal",onDidClose:s,onRequestClose:()=>t(!1),primaryContent:r,visible:i})]})},it={title:"Components/MultiContentModule",component:g};h.__docgenInfo={description:"",methods:[],displayName:"Default"};y.__docgenInfo={description:"",methods:[],displayName:"WithBorder"};f.__docgenInfo={description:"",methods:[],displayName:"WithButtonGroup"};x.__docgenInfo={description:"",methods:[],displayName:"WithEnd"};j.__docgenInfo={description:"",methods:[],displayName:"WithLongContent"};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => {
  const [visible, setVisible] = useState(true);
  const {
    triggerRef,
    focusTrigger
  } = useTriggerFocus();
  const primaryContent = <HStack justifyContent="center">
      <MultiContentModule action="Button" actionAccessibilityLabel="Button Label" onActionPress={onClickConsole} {...exampleProps}>
        {listItems.map(({
        icon,
        active,
        title,
        description
      }, index) => <ListCell key={index} multiline description={description} media={<CellMedia active={active} name={icon} type="icon" />} outerSpacing={{
        paddingX: 0
      }} title={title} />)}
      </MultiContentModule>
    </HStack>;
  return <>
      <Button ref={triggerRef} onClick={() => setVisible(true)}>
        Open Modal
      </Button>
      <FullscreenModal hideDivider accessibilityLabel="mcm-modal" closeAccessibilityLabel="Close Modal" onDidClose={focusTrigger} onRequestClose={() => setVisible(false)} primaryContent={primaryContent} visible={visible} />
    </>;
}`,...h.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => {
  const [visible, setVisible] = useState(true);
  const {
    triggerRef,
    focusTrigger
  } = useTriggerFocus();
  const primaryContent = <HStack justifyContent="center">
      <MultiContentModule bordered action="Button" actionAccessibilityLabel="Button Label" onActionPress={onClickConsole} {...exampleProps}>
        {listItems.map(({
        icon,
        title,
        description
      }, index) => <ListCell key={index} multiline description={description} media={<CellMedia name={icon} type="icon" />} outerSpacing={{
        paddingX: 0
      }} title={title} />)}
      </MultiContentModule>
    </HStack>;
  return <>
      <Button ref={triggerRef} onClick={() => setVisible(true)}>
        Open Modal
      </Button>
      <FullscreenModal hideDivider accessibilityLabel="mcm-modal" closeAccessibilityLabel="Close Modal" onDidClose={focusTrigger} onRequestClose={() => setVisible(false)} primaryContent={primaryContent} visible={visible} />
    </>;
}`,...y.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`() => {
  const [visible, setVisible] = useState(true);
  const {
    triggerRef,
    focusTrigger
  } = useTriggerFocus();
  const action = <VStack paddingTop={1}>
      <ButtonGroup accessibilityLabel="Group" direction="vertical">
        <Button accessibilityLabel="continue" onClick={onClickConsole}>
          Continue
        </Button>
        <Button accessibilityLabel="cancel" onClick={onClickConsole} variant="secondary">
          Cancel
        </Button>
      </ButtonGroup>
    </VStack>;
  const primaryContent = <HStack justifyContent="center">
      <MultiContentModule bordered action={action} {...exampleProps}>
        <Box bordered borderColor="bgPrimary" borderRadius={300}>
          <ListCell description="Satoshi Nakamoto" media={<Avatar alt="Sneezy" colorScheme="blue" name="Sneezy" />} title="satoshi@coinbase.com" />
        </Box>
      </MultiContentModule>
    </HStack>;
  return <>
      <Button ref={triggerRef} onClick={() => setVisible(true)}>
        Open Modal
      </Button>
      <FullscreenModal hideDivider accessibilityLabel="mcm-modal" closeAccessibilityLabel="Close Modal" onDidClose={focusTrigger} onRequestClose={() => setVisible(false)} primaryContent={primaryContent} visible={visible} />
    </>;
}`,...f.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`() => {
  const [visible, setVisible] = useState(true);
  const {
    triggerRef,
    focusTrigger
  } = useTriggerFocus();
  const end = <VStack gap={1} paddingX={3}>
      <VStack>
        <HStack justifyContent="center" zIndex={1}>
          <Box background="bg" paddingX={1.5}>
            <Text color="fgMuted" font="body">
              OR
            </Text>
          </Box>
        </HStack>
        <Divider marginTop={-1.5} paddingBottom={1.5} />
      </VStack>
      <HStack gap={2} justifyContent="space-between">
        {socialMediaItems.map(({
        icon,
        name
      }) => <VStack key={name} alignItems="center">
            <Pressable accessibilityLabel={name} background="bgSecondary" borderColor="transparent" borderRadius={1000} borderWidth={100} onClick={onClickConsole}>
              <Box padding={2}>{icon}</Box>
            </Pressable>
            <Text color="fgMuted" font="label2" paddingTop={1}>
              {name}
            </Text>
          </VStack>)}
      </HStack>
    </VStack>;
  const primaryContent = <HStack justifyContent="center">
      <MultiContentModule bordered action="Continue" actionAccessibilityLabel="Continue" end={end} onActionPress={onClickConsole} {...exampleProps}>
        <TextInput label="Email" placeholder="placeholder" />
      </MultiContentModule>
    </HStack>;
  return <>
      <Button ref={triggerRef} onClick={() => setVisible(true)}>
        Open Modal
      </Button>
      <FullscreenModal hideDivider accessibilityLabel="mcm-modal" closeAccessibilityLabel="Close Modal" onDidClose={focusTrigger} onRequestClose={() => setVisible(false)} primaryContent={primaryContent} visible={visible} />
    </>;
}`,...x.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`() => {
  const [visible, setVisible] = useState(true);
  const {
    triggerRef,
    focusTrigger
  } = useTriggerFocus();
  const primaryContent = <HStack justifyContent="center">
      <MultiContentModule action="Button" actionAccessibilityLabel="Button Label" description="This is a long description. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. " onActionPress={onClickConsole} title="Lorem Ipsum is simply dummy text of the printing and typesetting industry.">
        {[...listItems, ...listItems, ...listItems].map(({
        icon,
        title,
        description
      }, index) => <ListCell key={index} multiline description={description} media={<CellMedia name={icon} type="icon" />} outerSpacing={{
        paddingX: 0
      }} title={title} />)}
      </MultiContentModule>
    </HStack>;
  return <>
      <Button ref={triggerRef} onClick={() => setVisible(true)}>
        Open Modal
      </Button>
      <FullscreenModal hideDivider accessibilityLabel="mcm-modal" closeAccessibilityLabel="Close modal" onDidClose={focusTrigger} onRequestClose={() => setVisible(false)} primaryContent={primaryContent} visible={visible} />
    </>;
}`,...j.parameters?.docs?.source}}};const nt=["Default","WithBorder","WithButtonGroup","WithEnd","WithLongContent"];export{h as Default,y as WithBorder,f as WithButtonGroup,x as WithEnd,j as WithLongContent,nt as __namedExportsOrder,it as default};
