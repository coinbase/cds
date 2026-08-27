import{r as c,j as e}from"./iframe-BXWLBCkp.js";import{u as C,a as p}from"./card-CqcYFcP-.js";import{T as m}from"./Text-Ch_dBU4v.js";import{H as t}from"./HStack-B6p8qBpp.js";import{V as u}from"./VStack-CnEfMFeL.js";import{B as P}from"./Button-W9Shg4T1.js";import{I as R}from"./IconButton-OIX0AFCz.js";import{P as w}from"./Pressable-sl8uFeki.js";const x=c.memo(({title:s,description:n,action:a,onActionPress:h,onDismissPress:r,media:i,background:f="bgPrimaryWash",dangerouslySetBackground:b,testID:o="upsell-card",accessibilityLabel:g,width:y=C,onClick:d})=>{const l=e.jsx(t,{alignContent:"space-between",background:f,borderColor:"transparent",borderRadius:500,dangerouslySetBackground:b,minHeight:p,style:{border:"none"},testID:o,width:y,children:e.jsxs(t,{alignContent:"space-between",alignItems:"center",borderRadius:500,height:"100%",justifyContent:"space-between",overflow:"hidden",position:"relative",width:"100%",children:[e.jsxs(u,{gap:3,justifyContent:"space-between",minHeight:p,padding:2,width:"70%",children:[e.jsxs(u,{gap:1,children:[typeof s=="string"?e.jsx(m,{as:"h3",display:"block",font:"headline",children:s}):s,typeof n=="string"?e.jsx(m,{as:"p",display:"block",font:"label2",numberOfLines:3,children:n}):n]}),!!a&&e.jsx(t,{paddingStart:2,children:c.isValidElement(a)?a:e.jsx(P,{compact:!0,flush:"start",numberOfLines:1,onClick:h,variant:"secondary",children:a})})]}),!!i&&e.jsx(t,{position:"absolute",right:0,children:i}),r&&e.jsx(t,{padding:1,position:"absolute",right:0,top:0,children:e.jsx(R,{accessibilityLabel:g??`Dismiss the ${s} card`,name:"close",onClick:r,testID:`${o}-dismiss-button`,variant:"secondary"})})]})});return d?e.jsx(w,{background:"transparent",onClick:d,children:l}):l});x.__docgenInfo={description:`@deprecated Use \`MessagingCard\` with \`type="upsell"\` instead. UpsellCard will be removed in a future major release.

Migration guide:
\`\`\`tsx
// Before
<UpsellCard
  title="Title"
  description="Description"
  media={<RemoteImage ... />}
  action="Get Started"
  onActionPress={handleAction}
  onDismissPress={handleDismiss}
/>

// After
<MessagingCard
  type="upsell"
  title="Title"
  description="Description"
  media={<RemoteImage ... />}
  actions={<Button compact variant="secondary">Get Started</Button>}
  onDismiss={handleDismiss}
  mediaPlacement="end"
/>
\`\`\``,methods:[],displayName:"UpsellCard",props:{testID:{required:!1,tsType:{name:"string"},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`,defaultValue:{value:"'upsell-card'",computed:!1}},onActionPress:{required:!1,tsType:{name:"Polymorphic.Props['onClick']",raw:"PressableProps<PressableDefaultElement>['onClick']"},description:"Callback fired when the action button is pressed"},onDismissPress:{required:!1,tsType:{name:"Polymorphic.Props['onClick']",raw:"PressableProps<PressableDefaultElement>['onClick']"},description:"Callback fired when the dismiss button is pressed"},onClick:{required:!1,tsType:{name:"Polymorphic.Props['onClick']",raw:"PressableProps<PressableDefaultElement>['onClick']"},description:"Callback fired when the card is pressed"},title:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Text or ReactNode to be displayed in TextHeadline"},description:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Content to be displayed below the title"},action:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Node to display for the card action"},media:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Remote Image or other node with media content."},background:{required:!1,tsType:{name:"ThemeVars.Color"},description:`Background color for the card.
@default 'bgPrimaryWash'`,defaultValue:{value:"'bgPrimaryWash'",computed:!1}},dangerouslySetBackground:{required:!1,tsType:{name:"string"},description:"@danger This is a migration escape hatch. It is not intended to be used normally."},width:{defaultValue:{value:"327",computed:!1},required:!1}}};export{x as U};
