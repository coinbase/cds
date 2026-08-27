import{r as d,j as e}from"./iframe-CsG_6vZR.js";import{R as n}from"./RadioCell-8ImEhcGM.js";import{S as D}from"./Switch-W8R2Ap4j.js";import{T as o}from"./Text-B1CpMNU3.js";import{V as r}from"./VStack-Cg_Yq2u4.js";import"./preload-helper-D9Z9MdNV.js";import"./Radio-B-fvGGci.js";import"./checkbox-DVjU0upZ.js";import"./tokens-BwScSksM.js";import"./useTheme-CmrOhAty.js";import"./useMotionProps-BXBckQBf.js";import"./utils-y2S18Lx0.js";import"./Control-DrPBFTYm.js";import"./useMergeRefs-DR4sGa7m.js";import"./usePrefixedId-BL1THI0P.js";import"./Interactable--rqISG90.js";import"./color-Ceo1QMNe.js";import"./isRtl-C5Fon8jH.js";import"./motion-minimal-5s2ikV7b.js";import"./useSelectionCellControlHeight-CkSNy9TO.js";import"./Pressable-DDN99tmF.js";import"./isArray-M0ytM-vC.js";import"./HStack-DaDYipoP.js";const ae={title:"Components/RadioCell",component:n},h=()=>{const[a,i]=d.useState("");return e.jsx(n,{checked:a==="default",onChange:t=>i(t.target.value),title:"Default Radio Cell",value:"default"})},m=()=>{const[a,i]=d.useState("");return e.jsx(n,{checked:a==="with-description",description:"This is a helpful description that provides additional context",onChange:t=>i(t.target.value),title:"Radio with Description",value:"with-description"})},f=()=>{const[a,i]=d.useState("option-with-ids");return e.jsxs(r,{gap:4,children:[e.jsx(o,{font:"headline",children:"Custom ID Examples"}),e.jsx(o,{color:"fgMuted",font:"body",children:"These examples show how to pass custom titleId and descriptionId props."}),e.jsxs(r,{gap:2,children:[e.jsx(n,{checked:a==="option-with-ids",description:"This option has custom IDs for testing or external references",descriptionId:"payment-credit-description",onChange:t=>i(t.target.value),title:"Credit Card Payment",titleId:"payment-credit-title",value:"option-with-ids"}),e.jsx(n,{checked:a==="option-bank",description:"Bank transfer with predictable IDs for form validation",descriptionId:"payment-bank-description",onChange:t=>i(t.target.value),title:"Bank Transfer",titleId:"payment-bank-title",value:"option-bank"})]}),e.jsxs(o,{color:"fgMuted",font:"caption",children:["Selected: ",a," | Custom IDs are applied to title and description elements"]})]})},v=()=>{const[a,i]=d.useState("pro");return e.jsxs(r,{gap:4,children:[e.jsx(o,{font:"headline",children:"Custom React Node Content"}),e.jsx(o,{color:"fgMuted",font:"body",children:"These examples show custom title and description nodes with IDs applied correctly."}),e.jsxs(r,{gap:2,children:[e.jsx(n,{checked:a==="basic",description:e.jsxs(r,{gap:1,id:"plan-basic-desc",children:[e.jsx(o,{color:"fgMuted",font:"body",children:"Perfect for individuals getting started"}),e.jsx(o,{font:"label1",children:"$9/month"}),e.jsx(o,{color:"fgMuted",font:"caption",children:"• Up to 5 projects"}),e.jsx(o,{color:"fgMuted",font:"caption",children:"• 1GB storage"}),e.jsx(o,{color:"fgMuted",font:"caption",children:"• Email support"})]}),descriptionId:"plan-basic-desc",onChange:t=>i(t.target.value),title:e.jsxs(r,{gap:0,id:"plan-basic-title",children:[e.jsx(o,{font:"headline",children:"Basic Plan"}),e.jsx(o,{color:"fgMuted",font:"caption",children:"For individuals"})]}),titleId:"plan-basic-title",value:"basic"}),e.jsx(n,{checked:a==="pro",description:e.jsxs(r,{gap:1,id:"plan-pro-desc",children:[e.jsx(o,{color:"fgMuted",font:"body",children:"Great for growing teams and businesses"}),e.jsx(o,{font:"label1",children:"$29/month"}),e.jsx(o,{color:"fgPositive",font:"caption",children:"• Most Popular"}),e.jsx(o,{color:"fgMuted",font:"caption",children:"• Unlimited projects"}),e.jsx(o,{color:"fgMuted",font:"caption",children:"• 10GB storage"}),e.jsx(o,{color:"fgMuted",font:"caption",children:"• Priority support"})]}),descriptionId:"plan-pro-desc",onChange:t=>i(t.target.value),title:e.jsxs(o,{font:"headline",id:"plan-pro-title",children:["Pro Plan"," ",e.jsx(o,{as:"span",color:"fgPositive",font:"caption",children:"• RECOMMENDED"})]}),titleId:"plan-pro-title",value:"pro"}),e.jsx(n,{checked:a==="enterprise",description:e.jsxs(r,{gap:1,id:"plan-enterprise-desc",children:[e.jsx(o,{color:"fgMuted",font:"body",children:"Advanced features for large organizations"}),e.jsx(o,{font:"label1",children:"$99/month"}),e.jsx(o,{color:"fgMuted",font:"caption",children:"• Unlimited everything"}),e.jsx(o,{color:"fgMuted",font:"caption",children:"• Dedicated support"}),e.jsx(o,{color:"fgMuted",font:"caption",children:"• Custom integrations"})]}),descriptionId:"plan-enterprise-desc",onChange:t=>i(t.target.value),title:e.jsxs(r,{gap:0,id:"plan-enterprise-title",children:[e.jsx(o,{font:"headline",children:"Enterprise Plan"}),e.jsx(o,{color:"fgMuted",font:"caption",children:"For organizations"})]}),titleId:"plan-enterprise-title",value:"enterprise"})]})]})},S=()=>{const[a,i]=d.useState("");return e.jsx(r,{gap:4,children:e.jsx(n,{checked:a==="long-content",description:"This is a very long description that demonstrates how the component handles extensive text content. It should wrap properly and maintain good readability while keeping the radio button aligned at the top.",onChange:t=>i(t.target.value),title:"Very Long Title That Demonstrates Text Wrapping Behavior in Radio Cells",value:"long-content"})})},x=()=>{const[a,i]=d.useState("checked");return e.jsxs(r,{gap:4,children:[e.jsx(n,{checked:a==="unchecked",description:"This option is currently unchecked",onChange:t=>i(t.target.value),title:"Unchecked State",value:"unchecked"}),e.jsx(n,{checked:a==="checked",description:"This option is currently checked",onChange:t=>i(t.target.value),title:"Checked State",value:"checked"}),e.jsx(n,{disabled:!0,checked:!1,description:"This option is disabled and unchecked",onChange:t=>{},title:"Disabled Unchecked",value:"disabled-unchecked"}),e.jsx(n,{disabled:!0,checked:!0,description:"This option is disabled and checked",onChange:t=>{},title:"Disabled Checked",value:"disabled-checked"})]})},k=()=>{const[a,i]=d.useState("option1"),t=[{value:"option1",title:"Option 1",description:"First choice available"},{value:"option2",title:"Option 2",description:"Second choice available"},{value:"option3",title:"Option 3",description:"Third choice available"}];return e.jsxs(r,{gap:2,children:[e.jsx(o,{font:"headline",children:"Choose one option:"}),t.map(l=>e.jsx(n,{checked:a===l.value,description:l.description,onChange:c=>i(c.target.value),title:l.title,value:l.value},l.value)),e.jsxs(o,{color:"fgMuted",font:"body",children:["Selected: ",a]})]})},C=()=>{const[a,i]=d.useState("gap-2");return e.jsxs(r,{gap:4,children:[e.jsx(o,{font:"headline",children:"Gap Variations"}),e.jsx(n,{checked:a==="gap-1",columnGap:1,description:"Small gap between radio and content",onChange:t=>i(t.target.value),title:"Gap: 1",value:"gap-1"}),e.jsx(n,{checked:a==="gap-2",description:"Default gap between radio and content",onChange:t=>i(t.target.value),title:"Gap: 2 (Default)",value:"gap-2"}),e.jsx(n,{checked:a==="gap-3",columnGap:3,description:"Large gap between radio and content",onChange:t=>i(t.target.value),title:"Gap: 3",value:"gap-3"}),e.jsx(n,{checked:a==="gap-4",columnGap:4,description:"Extra large gap between radio and content",onChange:t=>i(t.target.value),title:"Gap: 4",value:"gap-4"})]})},b=()=>{const[a,i]=d.useState("default");return e.jsxs(r,{gap:4,children:[e.jsx(o,{font:"headline",children:"Directional Gap Control"}),e.jsx(n,{checked:a==="default",description:"Default gaps",onChange:t=>i(t.target.value),title:"Default Gaps",value:"default"}),e.jsx(n,{checked:a==="horizontal-large",columnGap:4,description:"Large horizontal gap, small vertical gap",onChange:t=>i(t.target.value),rowGap:1,title:"Large Horizontal Gap",value:"horizontal-large"}),e.jsx(n,{checked:a==="vertical-large",columnGap:1,description:"Small horizontal gap, large vertical gap between title and description",onChange:t=>i(t.target.value),rowGap:3,title:"Large Vertical Gap",value:"vertical-large"}),e.jsx(n,{checked:a==="no-gaps",columnGap:0,description:"No gaps for compact layout",onChange:t=>i(t.target.value),rowGap:0,title:"No Gaps",value:"no-gaps"})]})},y=()=>{const[a,i]=d.useState("padding-2");return e.jsxs(r,{gap:4,children:[e.jsx(n,{checked:a==="padding-1",description:"Small padding",onChange:t=>i(t.target.value),padding:1,title:"Padding: 1",value:"padding-1"}),e.jsx(n,{checked:a==="padding-2",description:"Default padding",onChange:t=>i(t.target.value),padding:2,title:"Padding: 2 (Default)",value:"padding-2"}),e.jsx(n,{checked:a==="padding-3",description:"Large padding",onChange:t=>i(t.target.value),padding:3,title:"Padding: 3",value:"padding-3"}),e.jsx(n,{checked:a==="padding-4",description:"Extra large padding",onChange:t=>i(t.target.value),padding:4,title:"Padding: 4",value:"padding-4"})]})},T=()=>{const[a,i]=d.useState("border-100");return e.jsxs(r,{gap:4,children:[e.jsx(n,{borderWidth:0,checked:a==="border-0",description:"No border",onChange:t=>i(t.target.value),title:"Border Width: 0",value:"border-0"}),e.jsx(n,{borderWidth:100,checked:a==="border-100",description:"Thin border (default)",onChange:t=>i(t.target.value),title:"Border Width: 100",value:"border-100"}),e.jsx(n,{borderWidth:200,checked:a==="border-200",description:"Medium border",onChange:t=>i(t.target.value),title:"Border Width: 200",value:"border-200"}),e.jsx(n,{borderWidth:300,checked:a==="border-300",description:"Thick border",onChange:t=>i(t.target.value),title:"Border Width: 300",value:"border-300"})]})},j=()=>{const[a,i]=d.useState("radius-200");return e.jsxs(r,{gap:4,children:[e.jsx(n,{borderRadius:0,checked:a==="radius-0",description:"No border radius (square corners)",onChange:t=>i(t.target.value),title:"Border Radius: 0",value:"radius-0"}),e.jsx(n,{borderRadius:100,checked:a==="radius-100",description:"Small border radius",onChange:t=>i(t.target.value),title:"Border Radius: 100",value:"radius-100"}),e.jsx(n,{borderRadius:200,checked:a==="radius-200",description:"Default border radius",onChange:t=>i(t.target.value),title:"Border Radius: 200 (Default)",value:"radius-200"}),e.jsx(n,{borderRadius:400,checked:a==="radius-400",description:"Large border radius",onChange:t=>i(t.target.value),title:"Border Radius: 400",value:"radius-400"}),e.jsx(n,{borderRadius:800,checked:a==="radius-800",description:"Very large border radius",onChange:t=>i(t.target.value),title:"Border Radius: 800",value:"radius-800"})]})},V=()=>{const[a,i]=d.useState("demo"),[t,l]=d.useState(!1),[c,u]=d.useState(!0),[s,g]=d.useState("2");return e.jsxs(r,{gap:4,children:[e.jsx(o,{font:"headline",children:"Interactive Demo"}),e.jsx(o,{color:"fgMuted",font:"body",children:"Use the controls below to see how different props affect the RadioCell component."}),e.jsxs(r,{gap:2,children:[e.jsx(D,{checked:t,onChange:p=>l(p.target.checked),children:"Disabled"}),e.jsx(D,{checked:c,onChange:p=>u(p.target.checked),children:"Show Description"})]}),e.jsxs(r,{gap:2,children:[e.jsx(o,{font:"label1",children:"Gap Size:"}),["1","2","3","4"].map(p=>e.jsx(n,{checked:s===p,onChange:I=>g(I.target.value),title:`Gap: ${p}`,value:p},p))]}),e.jsx(n,{checked:a==="demo",description:c?"This description can be toggled on and off":void 0,disabled:t,gap:parseInt(s),onChange:p=>i(p.target.value),title:"Interactive Radio Cell",value:"demo"})]})},w=()=>{const[a,i]=d.useState("credit-card"),t=[{value:"credit-card",title:"Credit Card",description:"Pay with Visa, Mastercard, or American Express"},{value:"bank-transfer",title:"Bank Transfer",description:"Direct transfer from your bank account (2-3 business days)"},{value:"digital-wallet",title:"Digital Wallet",description:"Pay with PayPal, Apple Pay, or Google Pay"},{value:"crypto",title:"Cryptocurrency",description:"Pay with Bitcoin, Ethereum, or other supported cryptocurrencies"}];return e.jsxs(r,{gap:3,children:[e.jsx(o,{font:"headline",children:"Payment Method"}),e.jsx(o,{color:"fgMuted",font:"body",children:"Choose how you'd like to pay for your order."}),e.jsx(r,{gap:2,children:t.map(l=>e.jsx(n,{checked:a===l.value,description:l.description,onChange:c=>i(c.target.value),title:l.title,value:l.value},l.value))}),e.jsxs(o,{color:"fgMuted",font:"caption",children:["Selected payment method: ",t.find(l=>l.value===a)?.title]})]})},R=()=>{const[a,i]=d.useState("pro");return e.jsxs(r,{gap:4,children:[e.jsxs(r,{gap:2,children:[e.jsx(o,{font:"headline",children:"Choose Your Plan"}),e.jsx(o,{color:"fgMuted",font:"body",children:"Select the plan that best fits your needs. You can change or cancel anytime."})]}),e.jsxs(r,{gap:2,children:[e.jsx(n,{checked:a==="basic",description:e.jsxs(r,{gap:1,children:[e.jsx(o,{color:"fgMuted",font:"body",children:"Perfect for individuals getting started"}),e.jsx(o,{font:"label1",children:"$9/month • Up to 5 projects • 1GB storage"})]}),onChange:t=>i(t.target.value),title:"Basic Plan",value:"basic"}),e.jsx(n,{checked:a==="pro",description:e.jsxs(r,{gap:1,children:[e.jsx(o,{color:"fgMuted",font:"body",children:"Great for growing teams and businesses"}),e.jsx(o,{font:"label1",children:"$29/month • Unlimited projects • 10GB storage"}),e.jsx(o,{color:"fgPositive",font:"caption",children:"• Most Popular"})]}),onChange:t=>i(t.target.value),title:"Pro Plan",value:"pro"}),e.jsx(n,{checked:a==="enterprise",description:e.jsxs(r,{gap:1,children:[e.jsx(o,{color:"fgMuted",font:"body",children:"Advanced features for large organizations"}),e.jsx(o,{font:"label1",children:"$99/month • Unlimited everything • Priority support"})]}),onChange:t=>i(t.target.value),title:"Enterprise Plan",value:"enterprise"})]})]})},P=()=>{const[a,i]=d.useState("system"),[t,l]=d.useState("english"),[c,u]=d.useState("auto");return e.jsxs(r,{gap:6,children:[e.jsx(o,{font:"headline",children:"Account Settings"}),e.jsxs(r,{gap:3,children:[e.jsxs(r,{gap:1,children:[e.jsx(o,{color:"fgMuted",font:"label1",children:"THEME PREFERENCE"}),e.jsxs(r,{gap:1,children:[e.jsx(n,{checked:a==="light",description:"Always use light theme",onChange:s=>i(s.target.value),title:"Light",value:"light"}),e.jsx(n,{checked:a==="dark",description:"Always use dark theme",onChange:s=>i(s.target.value),title:"Dark",value:"dark"}),e.jsx(n,{checked:a==="system",description:"Follow system preference",onChange:s=>i(s.target.value),title:"System",value:"system"})]})]}),e.jsxs(r,{gap:1,children:[e.jsx(o,{color:"fgMuted",font:"label1",children:"LANGUAGE"}),e.jsxs(r,{gap:1,children:[e.jsx(n,{checked:t==="english",description:"English (US)",onChange:s=>l(s.target.value),title:"English",value:"english"}),e.jsx(n,{checked:t==="spanish",description:"Español",onChange:s=>l(s.target.value),title:"Spanish",value:"spanish"}),e.jsx(n,{checked:t==="french",description:"Français",onChange:s=>l(s.target.value),title:"French",value:"french"})]})]}),e.jsxs(r,{gap:1,children:[e.jsx(o,{color:"fgMuted",font:"label1",children:"TIMEZONE"}),e.jsxs(r,{gap:1,children:[e.jsx(n,{checked:c==="auto",description:"Automatically detect from browser",onChange:s=>u(s.target.value),title:"Auto-detect",value:"auto"}),e.jsx(n,{checked:c==="pst",description:"Pacific Standard Time (UTC-8)",onChange:s=>u(s.target.value),title:"PST",value:"pst"}),e.jsx(n,{checked:c==="est",description:"Eastern Standard Time (UTC-5)",onChange:s=>u(s.target.value),title:"EST",value:"est"}),e.jsx(n,{checked:c==="utc",description:"Coordinated Universal Time (UTC+0)",onChange:s=>u(s.target.value),title:"UTC",value:"utc"})]})]})]})]})},M=()=>{const[a,i]=d.useState(""),[t,l]=d.useState(""),[c,u]=d.useState("");return e.jsxs(r,{gap:6,children:[e.jsxs(r,{gap:2,children:[e.jsx(o,{font:"headline",children:"Customer Feedback Survey"}),e.jsx(o,{color:"fgMuted",font:"body",children:"Help us improve by sharing your experience with our product."})]}),e.jsxs(r,{gap:3,children:[e.jsxs(r,{gap:2,children:[e.jsx(o,{font:"label1",children:"How satisfied are you with our product?"}),e.jsx(r,{gap:1,children:[{value:"very-satisfied",title:"Very Satisfied",description:"Exceeds expectations"},{value:"satisfied",title:"Satisfied",description:"Meets expectations"},{value:"neutral",title:"Neutral",description:"Neither satisfied nor dissatisfied"},{value:"dissatisfied",title:"Dissatisfied",description:"Below expectations"},{value:"very-dissatisfied",title:"Very Dissatisfied",description:"Far below expectations"}].map(s=>e.jsx(n,{checked:a===s.value,description:s.description,onChange:g=>i(g.target.value),title:s.title,value:s.value},s.value))})]}),e.jsxs(r,{gap:2,children:[e.jsx(o,{font:"label1",children:"How often do you use our product?"}),e.jsx(r,{gap:1,children:[{value:"daily",title:"Daily",description:"Every day"},{value:"weekly",title:"Weekly",description:"A few times per week"},{value:"monthly",title:"Monthly",description:"A few times per month"},{value:"rarely",title:"Rarely",description:"Once in a while"}].map(s=>e.jsx(n,{checked:t===s.value,description:s.description,onChange:g=>l(g.target.value),title:s.title,value:s.value},s.value))})]}),e.jsxs(r,{gap:2,children:[e.jsx(o,{font:"label1",children:"Would you recommend us to a friend?"}),e.jsx(r,{gap:1,children:[{value:"definitely",title:"Definitely",description:"I would actively recommend it"},{value:"probably",title:"Probably",description:"I would likely recommend it"},{value:"maybe",title:"Maybe",description:"I might recommend it"},{value:"probably-not",title:"Probably Not",description:"I would hesitate to recommend it"},{value:"definitely-not",title:"Definitely Not",description:"I would not recommend it"}].map(s=>e.jsx(n,{checked:c===s.value,description:s.description,onChange:g=>u(g.target.value),title:s.title,value:s.value},s.value))})]})]})]})};h.__docgenInfo={description:"",methods:[],displayName:"Default"};m.__docgenInfo={description:"",methods:[],displayName:"WithDescription"};f.__docgenInfo={description:"",methods:[],displayName:"CustomIds"};v.__docgenInfo={description:"",methods:[],displayName:"CustomContent"};S.__docgenInfo={description:"",methods:[],displayName:"LongContent"};x.__docgenInfo={description:"",methods:[],displayName:"States"};k.__docgenInfo={description:"",methods:[],displayName:"BasicRadioGroup"};C.__docgenInfo={description:"",methods:[],displayName:"GapVariations"};b.__docgenInfo={description:"",methods:[],displayName:"DirectionalGaps"};y.__docgenInfo={description:"",methods:[],displayName:"PaddingVariations"};T.__docgenInfo={description:"",methods:[],displayName:"BorderVariations"};j.__docgenInfo={description:"",methods:[],displayName:"BorderRadiusVariations"};V.__docgenInfo={description:"",methods:[],displayName:"InteractiveDemo"};w.__docgenInfo={description:"",methods:[],displayName:"PaymentMethods"};R.__docgenInfo={description:"",methods:[],displayName:"SubscriptionPlans"};P.__docgenInfo={description:"",methods:[],displayName:"AccountSettings"};M.__docgenInfo={description:"",methods:[],displayName:"SurveyForm"};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => {
  const [selected, setSelected] = useState<string>('');
  return <RadioCell checked={selected === 'default'} onChange={e => setSelected(e.target.value)} title="Default Radio Cell" value="default" />;
}`,...h.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => {
  const [selected, setSelected] = useState<string>('');
  return <RadioCell checked={selected === 'with-description'} description="This is a helpful description that provides additional context" onChange={e => setSelected(e.target.value)} title="Radio with Description" value="with-description" />;
}`,...m.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`() => {
  const [selected, setSelected] = useState<string>('option-with-ids');
  return <VStack gap={4}>
      <Text font="headline">Custom ID Examples</Text>
      <Text color="fgMuted" font="body">
        These examples show how to pass custom titleId and descriptionId props.
      </Text>

      <VStack gap={2}>
        <RadioCell checked={selected === 'option-with-ids'} description="This option has custom IDs for testing or external references" descriptionId="payment-credit-description" onChange={e => setSelected(e.target.value)} title="Credit Card Payment" titleId="payment-credit-title" value="option-with-ids" />

        <RadioCell checked={selected === 'option-bank'} description="Bank transfer with predictable IDs for form validation" descriptionId="payment-bank-description" onChange={e => setSelected(e.target.value)} title="Bank Transfer" titleId="payment-bank-title" value="option-bank" />
      </VStack>

      <Text color="fgMuted" font="caption">
        Selected: {selected} | Custom IDs are applied to title and description elements
      </Text>
    </VStack>;
}`,...f.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`() => {
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  return <VStack gap={4}>
      <Text font="headline">Custom React Node Content</Text>
      <Text color="fgMuted" font="body">
        These examples show custom title and description nodes with IDs applied correctly.
      </Text>

      <VStack gap={2}>
        <RadioCell checked={selectedPlan === 'basic'} description={<VStack gap={1} id="plan-basic-desc">
              <Text color="fgMuted" font="body">
                Perfect for individuals getting started
              </Text>
              <Text font="label1">$9/month</Text>
              <Text color="fgMuted" font="caption">
                • Up to 5 projects
              </Text>
              <Text color="fgMuted" font="caption">
                • 1GB storage
              </Text>
              <Text color="fgMuted" font="caption">
                • Email support
              </Text>
            </VStack>} descriptionId="plan-basic-desc" onChange={e => setSelectedPlan(e.target.value)} title={<VStack gap={0} id="plan-basic-title">
              <Text font="headline">Basic Plan</Text>
              <Text color="fgMuted" font="caption">
                For individuals
              </Text>
            </VStack>} titleId="plan-basic-title" value="basic" />

        <RadioCell checked={selectedPlan === 'pro'} description={<VStack gap={1} id="plan-pro-desc">
              <Text color="fgMuted" font="body">
                Great for growing teams and businesses
              </Text>
              <Text font="label1">$29/month</Text>
              <Text color="fgPositive" font="caption">
                • Most Popular
              </Text>
              <Text color="fgMuted" font="caption">
                • Unlimited projects
              </Text>
              <Text color="fgMuted" font="caption">
                • 10GB storage
              </Text>
              <Text color="fgMuted" font="caption">
                • Priority support
              </Text>
            </VStack>} descriptionId="plan-pro-desc" onChange={e => setSelectedPlan(e.target.value)} title={<Text font="headline" id="plan-pro-title">
              Pro Plan{' '}
              <Text as="span" color="fgPositive" font="caption">
                • RECOMMENDED
              </Text>
            </Text>} titleId="plan-pro-title" value="pro" />

        <RadioCell checked={selectedPlan === 'enterprise'} description={<VStack gap={1} id="plan-enterprise-desc">
              <Text color="fgMuted" font="body">
                Advanced features for large organizations
              </Text>
              <Text font="label1">$99/month</Text>
              <Text color="fgMuted" font="caption">
                • Unlimited everything
              </Text>
              <Text color="fgMuted" font="caption">
                • Dedicated support
              </Text>
              <Text color="fgMuted" font="caption">
                • Custom integrations
              </Text>
            </VStack>} descriptionId="plan-enterprise-desc" onChange={e => setSelectedPlan(e.target.value)} title={<VStack gap={0} id="plan-enterprise-title">
              <Text font="headline">Enterprise Plan</Text>
              <Text color="fgMuted" font="caption">
                For organizations
              </Text>
            </VStack>} titleId="plan-enterprise-title" value="enterprise" />
      </VStack>
    </VStack>;
}`,...v.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => {
  const [selected, setSelected] = useState<string>('');
  return <VStack gap={4}>
      <RadioCell checked={selected === 'long-content'} description="This is a very long description that demonstrates how the component handles extensive text content. It should wrap properly and maintain good readability while keeping the radio button aligned at the top." onChange={e => setSelected(e.target.value)} title="Very Long Title That Demonstrates Text Wrapping Behavior in Radio Cells" value="long-content" />
    </VStack>;
}`,...S.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`() => {
  const [selectedState, setSelectedState] = useState<string>('checked');
  return <VStack gap={4}>
      <RadioCell checked={selectedState === 'unchecked'} description="This option is currently unchecked" onChange={e => setSelectedState(e.target.value)} title="Unchecked State" value="unchecked" />

      <RadioCell checked={selectedState === 'checked'} description="This option is currently checked" onChange={e => setSelectedState(e.target.value)} title="Checked State" value="checked" />

      <RadioCell disabled checked={false} description="This option is disabled and unchecked" onChange={e => {}} title="Disabled Unchecked" value="disabled-unchecked" />

      <RadioCell disabled checked={true} description="This option is disabled and checked" onChange={e => {}} title="Disabled Checked" value="disabled-checked" />
    </VStack>;
}`,...x.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`() => {
  const [selectedOption, setSelectedOption] = useState<string>('option1');
  const options = [{
    value: 'option1',
    title: 'Option 1',
    description: 'First choice available'
  }, {
    value: 'option2',
    title: 'Option 2',
    description: 'Second choice available'
  }, {
    value: 'option3',
    title: 'Option 3',
    description: 'Third choice available'
  }];
  return <VStack gap={2}>
      <Text font="headline">Choose one option:</Text>
      {options.map(option => <RadioCell key={option.value} checked={selectedOption === option.value} description={option.description} onChange={e => setSelectedOption(e.target.value)} title={option.title} value={option.value} />)}
      <Text color="fgMuted" font="body">
        Selected: {selectedOption}
      </Text>
    </VStack>;
}`,...k.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`() => {
  const [selected, setSelected] = useState<string>('gap-2');
  return <VStack gap={4}>
      <Text font="headline">Gap Variations</Text>

      <RadioCell checked={selected === 'gap-1'} columnGap={1} description="Small gap between radio and content" onChange={e => setSelected(e.target.value)} title="Gap: 1" value="gap-1" />

      <RadioCell checked={selected === 'gap-2'} description="Default gap between radio and content" onChange={e => setSelected(e.target.value)} title="Gap: 2 (Default)" value="gap-2" />

      <RadioCell checked={selected === 'gap-3'} columnGap={3} description="Large gap between radio and content" onChange={e => setSelected(e.target.value)} title="Gap: 3" value="gap-3" />

      <RadioCell checked={selected === 'gap-4'} columnGap={4} description="Extra large gap between radio and content" onChange={e => setSelected(e.target.value)} title="Gap: 4" value="gap-4" />
    </VStack>;
}`,...C.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`() => {
  const [selected, setSelected] = useState<string>('default');
  return <VStack gap={4}>
      <Text font="headline">Directional Gap Control</Text>

      <RadioCell checked={selected === 'default'} description="Default gaps" onChange={e => setSelected(e.target.value)} title="Default Gaps" value="default" />

      <RadioCell checked={selected === 'horizontal-large'} columnGap={4} description="Large horizontal gap, small vertical gap" onChange={e => setSelected(e.target.value)} rowGap={1} title="Large Horizontal Gap" value="horizontal-large" />

      <RadioCell checked={selected === 'vertical-large'} columnGap={1} description="Small horizontal gap, large vertical gap between title and description" onChange={e => setSelected(e.target.value)} rowGap={3} title="Large Vertical Gap" value="vertical-large" />

      <RadioCell checked={selected === 'no-gaps'} columnGap={0} description="No gaps for compact layout" onChange={e => setSelected(e.target.value)} rowGap={0} title="No Gaps" value="no-gaps" />
    </VStack>;
}`,...b.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => {
  const [selected, setSelected] = useState<string>('padding-2');
  return <VStack gap={4}>
      <RadioCell checked={selected === 'padding-1'} description="Small padding" onChange={e => setSelected(e.target.value)} padding={1} title="Padding: 1" value="padding-1" />

      <RadioCell checked={selected === 'padding-2'} description="Default padding" onChange={e => setSelected(e.target.value)} padding={2} title="Padding: 2 (Default)" value="padding-2" />

      <RadioCell checked={selected === 'padding-3'} description="Large padding" onChange={e => setSelected(e.target.value)} padding={3} title="Padding: 3" value="padding-3" />

      <RadioCell checked={selected === 'padding-4'} description="Extra large padding" onChange={e => setSelected(e.target.value)} padding={4} title="Padding: 4" value="padding-4" />
    </VStack>;
}`,...y.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`() => {
  const [selected, setSelected] = useState<string>('border-100');
  return <VStack gap={4}>
      <RadioCell borderWidth={0} checked={selected === 'border-0'} description="No border" onChange={e => setSelected(e.target.value)} title="Border Width: 0" value="border-0" />

      <RadioCell borderWidth={100} checked={selected === 'border-100'} description="Thin border (default)" onChange={e => setSelected(e.target.value)} title="Border Width: 100" value="border-100" />

      <RadioCell borderWidth={200} checked={selected === 'border-200'} description="Medium border" onChange={e => setSelected(e.target.value)} title="Border Width: 200" value="border-200" />

      <RadioCell borderWidth={300} checked={selected === 'border-300'} description="Thick border" onChange={e => setSelected(e.target.value)} title="Border Width: 300" value="border-300" />
    </VStack>;
}`,...T.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`() => {
  const [selected, setSelected] = useState<string>('radius-200');
  return <VStack gap={4}>
      <RadioCell borderRadius={0} checked={selected === 'radius-0'} description="No border radius (square corners)" onChange={e => setSelected(e.target.value)} title="Border Radius: 0" value="radius-0" />

      <RadioCell borderRadius={100} checked={selected === 'radius-100'} description="Small border radius" onChange={e => setSelected(e.target.value)} title="Border Radius: 100" value="radius-100" />

      <RadioCell borderRadius={200} checked={selected === 'radius-200'} description="Default border radius" onChange={e => setSelected(e.target.value)} title="Border Radius: 200 (Default)" value="radius-200" />

      <RadioCell borderRadius={400} checked={selected === 'radius-400'} description="Large border radius" onChange={e => setSelected(e.target.value)} title="Border Radius: 400" value="radius-400" />

      <RadioCell borderRadius={800} checked={selected === 'radius-800'} description="Very large border radius" onChange={e => setSelected(e.target.value)} title="Border Radius: 800" value="radius-800" />
    </VStack>;
}`,...j.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`() => {
  const [selected, setSelected] = useState<string>('demo');
  const [disabled, setDisabled] = useState(false);
  const [hasDescription, setHasDescription] = useState(true);
  const [gapSize, setGapSize] = useState<string>('2');
  return <VStack gap={4}>
      <Text font="headline">Interactive Demo</Text>
      <Text color="fgMuted" font="body">
        Use the controls below to see how different props affect the RadioCell component.
      </Text>

      <VStack gap={2}>
        <Switch checked={disabled} onChange={e => setDisabled(e.target.checked)}>
          Disabled
        </Switch>

        <Switch checked={hasDescription} onChange={e => setHasDescription(e.target.checked)}>
          Show Description
        </Switch>
      </VStack>

      <VStack gap={2}>
        <Text font="label1">Gap Size:</Text>
        {['1', '2', '3', '4'].map(gap => <RadioCell key={gap} checked={gapSize === gap} onChange={e => setGapSize(e.target.value)} title={\`Gap: \${gap}\`} value={gap} />)}
      </VStack>

      <RadioCell checked={selected === 'demo'} description={hasDescription ? 'This description can be toggled on and off' : undefined} disabled={disabled} gap={parseInt(gapSize) as 1 | 2 | 3 | 4} onChange={e => setSelected(e.target.value)} title="Interactive Radio Cell" value="demo" />
    </VStack>;
}`,...V.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`() => {
  const [selectedMethod, setSelectedMethod] = useState<string>('credit-card');
  const paymentMethods = [{
    value: 'credit-card',
    title: 'Credit Card',
    description: 'Pay with Visa, Mastercard, or American Express'
  }, {
    value: 'bank-transfer',
    title: 'Bank Transfer',
    description: 'Direct transfer from your bank account (2-3 business days)'
  }, {
    value: 'digital-wallet',
    title: 'Digital Wallet',
    description: 'Pay with PayPal, Apple Pay, or Google Pay'
  }, {
    value: 'crypto',
    title: 'Cryptocurrency',
    description: 'Pay with Bitcoin, Ethereum, or other supported cryptocurrencies'
  }];
  return <VStack gap={3}>
      <Text font="headline">Payment Method</Text>
      <Text color="fgMuted" font="body">
        Choose how you&apos;d like to pay for your order.
      </Text>

      <VStack gap={2}>
        {paymentMethods.map(method => <RadioCell key={method.value} checked={selectedMethod === method.value} description={method.description} onChange={e => setSelectedMethod(e.target.value)} title={method.title} value={method.value} />)}
      </VStack>

      <Text color="fgMuted" font="caption">
        Selected payment method: {paymentMethods.find(m => m.value === selectedMethod)?.title}
      </Text>
    </VStack>;
}`,...w.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`() => {
  const [selectedPlan, setSelectedPlan] = useState<string>('pro');
  return <VStack gap={4}>
      <VStack gap={2}>
        <Text font="headline">Choose Your Plan</Text>
        <Text color="fgMuted" font="body">
          Select the plan that best fits your needs. You can change or cancel anytime.
        </Text>
      </VStack>

      <VStack gap={2}>
        <RadioCell checked={selectedPlan === 'basic'} description={<VStack gap={1}>
              <Text color="fgMuted" font="body">
                Perfect for individuals getting started
              </Text>
              <Text font="label1">$9/month • Up to 5 projects • 1GB storage</Text>
            </VStack>} onChange={e => setSelectedPlan(e.target.value)} title="Basic Plan" value="basic" />

        <RadioCell checked={selectedPlan === 'pro'} description={<VStack gap={1}>
              <Text color="fgMuted" font="body">
                Great for growing teams and businesses
              </Text>
              <Text font="label1">$29/month • Unlimited projects • 10GB storage</Text>
              <Text color="fgPositive" font="caption">
                • Most Popular
              </Text>
            </VStack>} onChange={e => setSelectedPlan(e.target.value)} title="Pro Plan" value="pro" />

        <RadioCell checked={selectedPlan === 'enterprise'} description={<VStack gap={1}>
              <Text color="fgMuted" font="body">
                Advanced features for large organizations
              </Text>
              <Text font="label1">$99/month • Unlimited everything • Priority support</Text>
            </VStack>} onChange={e => setSelectedPlan(e.target.value)} title="Enterprise Plan" value="enterprise" />
      </VStack>
    </VStack>;
}`,...R.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`() => {
  const [theme, setTheme] = useState<string>('system');
  const [language, setLanguage] = useState<string>('english');
  const [timezone, setTimezone] = useState<string>('auto');
  return <VStack gap={6}>
      <Text font="headline">Account Settings</Text>

      <VStack gap={3}>
        <VStack gap={1}>
          <Text color="fgMuted" font="label1">
            THEME PREFERENCE
          </Text>
          <VStack gap={1}>
            <RadioCell checked={theme === 'light'} description="Always use light theme" onChange={e => setTheme(e.target.value)} title="Light" value="light" />

            <RadioCell checked={theme === 'dark'} description="Always use dark theme" onChange={e => setTheme(e.target.value)} title="Dark" value="dark" />

            <RadioCell checked={theme === 'system'} description="Follow system preference" onChange={e => setTheme(e.target.value)} title="System" value="system" />
          </VStack>
        </VStack>

        <VStack gap={1}>
          <Text color="fgMuted" font="label1">
            LANGUAGE
          </Text>
          <VStack gap={1}>
            <RadioCell checked={language === 'english'} description="English (US)" onChange={e => setLanguage(e.target.value)} title="English" value="english" />

            <RadioCell checked={language === 'spanish'} description="Español" onChange={e => setLanguage(e.target.value)} title="Spanish" value="spanish" />

            <RadioCell checked={language === 'french'} description="Français" onChange={e => setLanguage(e.target.value)} title="French" value="french" />
          </VStack>
        </VStack>

        <VStack gap={1}>
          <Text color="fgMuted" font="label1">
            TIMEZONE
          </Text>
          <VStack gap={1}>
            <RadioCell checked={timezone === 'auto'} description="Automatically detect from browser" onChange={e => setTimezone(e.target.value)} title="Auto-detect" value="auto" />

            <RadioCell checked={timezone === 'pst'} description="Pacific Standard Time (UTC-8)" onChange={e => setTimezone(e.target.value)} title="PST" value="pst" />

            <RadioCell checked={timezone === 'est'} description="Eastern Standard Time (UTC-5)" onChange={e => setTimezone(e.target.value)} title="EST" value="est" />

            <RadioCell checked={timezone === 'utc'} description="Coordinated Universal Time (UTC+0)" onChange={e => setTimezone(e.target.value)} title="UTC" value="utc" />
          </VStack>
        </VStack>
      </VStack>
    </VStack>;
}`,...P.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`() => {
  const [satisfaction, setSatisfaction] = useState<string>('');
  const [frequency, setFrequency] = useState<string>('');
  const [recommendation, setRecommendation] = useState<string>('');
  return <VStack gap={6}>
      <VStack gap={2}>
        <Text font="headline">Customer Feedback Survey</Text>
        <Text color="fgMuted" font="body">
          Help us improve by sharing your experience with our product.
        </Text>
      </VStack>

      <VStack gap={3}>
        <VStack gap={2}>
          <Text font="label1">How satisfied are you with our product?</Text>
          <VStack gap={1}>
            {[{
            value: 'very-satisfied',
            title: 'Very Satisfied',
            description: 'Exceeds expectations'
          }, {
            value: 'satisfied',
            title: 'Satisfied',
            description: 'Meets expectations'
          }, {
            value: 'neutral',
            title: 'Neutral',
            description: 'Neither satisfied nor dissatisfied'
          }, {
            value: 'dissatisfied',
            title: 'Dissatisfied',
            description: 'Below expectations'
          }, {
            value: 'very-dissatisfied',
            title: 'Very Dissatisfied',
            description: 'Far below expectations'
          }].map(option => <RadioCell key={option.value} checked={satisfaction === option.value} description={option.description} onChange={e => setSatisfaction(e.target.value)} title={option.title} value={option.value} />)}
          </VStack>
        </VStack>

        <VStack gap={2}>
          <Text font="label1">How often do you use our product?</Text>
          <VStack gap={1}>
            {[{
            value: 'daily',
            title: 'Daily',
            description: 'Every day'
          }, {
            value: 'weekly',
            title: 'Weekly',
            description: 'A few times per week'
          }, {
            value: 'monthly',
            title: 'Monthly',
            description: 'A few times per month'
          }, {
            value: 'rarely',
            title: 'Rarely',
            description: 'Once in a while'
          }].map(option => <RadioCell key={option.value} checked={frequency === option.value} description={option.description} onChange={e => setFrequency(e.target.value)} title={option.title} value={option.value} />)}
          </VStack>
        </VStack>

        <VStack gap={2}>
          <Text font="label1">Would you recommend us to a friend?</Text>
          <VStack gap={1}>
            {[{
            value: 'definitely',
            title: 'Definitely',
            description: 'I would actively recommend it'
          }, {
            value: 'probably',
            title: 'Probably',
            description: 'I would likely recommend it'
          }, {
            value: 'maybe',
            title: 'Maybe',
            description: 'I might recommend it'
          }, {
            value: 'probably-not',
            title: 'Probably Not',
            description: 'I would hesitate to recommend it'
          }, {
            value: 'definitely-not',
            title: 'Definitely Not',
            description: 'I would not recommend it'
          }].map(option => <RadioCell key={option.value} checked={recommendation === option.value} description={option.description} onChange={e => setRecommendation(e.target.value)} title={option.title} value={option.value} />)}
          </VStack>
        </VStack>
      </VStack>
    </VStack>;
}`,...M.parameters?.docs?.source}}};const ie=["Default","WithDescription","CustomIds","CustomContent","LongContent","States","BasicRadioGroup","GapVariations","DirectionalGaps","PaddingVariations","BorderVariations","BorderRadiusVariations","InteractiveDemo","PaymentMethods","SubscriptionPlans","AccountSettings","SurveyForm"];export{P as AccountSettings,k as BasicRadioGroup,j as BorderRadiusVariations,T as BorderVariations,v as CustomContent,f as CustomIds,h as Default,b as DirectionalGaps,C as GapVariations,V as InteractiveDemo,S as LongContent,y as PaddingVariations,w as PaymentMethods,x as States,R as SubscriptionPlans,M as SurveyForm,m as WithDescription,ie as __namedExportsOrder,ae as default};
