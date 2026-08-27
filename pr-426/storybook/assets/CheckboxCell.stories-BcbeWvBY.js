import{r,j as e}from"./iframe-CsG_6vZR.js";import{C as o}from"./CheckboxCell-hUJ0i1oh.js";import{S as D}from"./Switch-W8R2Ap4j.js";import{T as c}from"./Text-B1CpMNU3.js";import{V as i}from"./VStack-Cg_Yq2u4.js";import{B as V}from"./Button-D2WSek5T.js";import"./preload-helper-D9Z9MdNV.js";import"./Pressable-DDN99tmF.js";import"./isArray-M0ytM-vC.js";import"./Interactable--rqISG90.js";import"./color-Ceo1QMNe.js";import"./useTheme-CmrOhAty.js";import"./Checkbox-Cy7nVg7g.js";import"./checkbox-DVjU0upZ.js";import"./tokens-BwScSksM.js";import"./Icon-DTs0crZh.js";import"./useMotionProps-BXBckQBf.js";import"./utils-y2S18Lx0.js";import"./Control-DrPBFTYm.js";import"./useMergeRefs-DR4sGa7m.js";import"./usePrefixedId-BL1THI0P.js";import"./isRtl-C5Fon8jH.js";import"./motion-minimal-5s2ikV7b.js";import"./useSelectionCellControlHeight-CkSNy9TO.js";import"./HStack-DaDYipoP.js";import"./Spinner-C8x8bhOH.js";const te={title:"Components/CheckboxCell",component:o},p=()=>{const[a,n]=r.useState(!1);return e.jsx(o,{checked:a,onChange:t=>n(t.target.checked),title:"Default Checkbox Cell",value:"default"})},g=()=>{const[a,n]=r.useState(!1);return e.jsx(o,{checked:a,description:"This is a helpful description that provides additional context",onChange:t=>n(t.target.checked),title:"Checkbox with Description with Description with Description",value:"with-description"})},k=()=>{const[a,n]=r.useState(!1);return e.jsxs(i,{gap:4,children:[e.jsx(c,{font:"headline",children:"Custom ID Examples"}),e.jsx(c,{color:"fgMuted",font:"body",children:"These examples show how to pass custom titleId and descriptionId props."}),e.jsx(o,{checked:a,description:"This has custom IDs for testing or external references",descriptionId:"custom-checkbox-description",onChange:t=>n(t.target.checked),title:"Custom IDs Example",titleId:"custom-checkbox-title",value:"custom-ids"}),e.jsx(c,{color:"fgMuted",font:"caption",children:"Title ID: custom-checkbox-title, Description ID: custom-checkbox-description"})]})},m=()=>{const[a,n]=r.useState({notifications:!1,marketing:!1}),t=s=>{const l=s.target.value,h=s.target.checked;n(d=>({...d,[l]:!!h}))};return e.jsxs(i,{gap:4,children:[e.jsx(c,{font:"headline",children:"Custom React Node Content"}),e.jsx(c,{color:"fgMuted",font:"body",children:"These examples show custom title and description nodes with IDs applied correctly."}),e.jsx(o,{checked:a.notifications,description:e.jsxs(i,{gap:1,id:"notifications-desc",children:[e.jsx(c,{color:"fgMuted",font:"body",children:"Stay updated with important information"}),e.jsx(c,{color:"fgPrimary",font:"label1",children:"• Security alerts"}),e.jsx(c,{color:"fgPrimary",font:"label1",children:"• Account updates"}),e.jsx(c,{color:"fgPrimary",font:"label1",children:"• System notifications"})]}),descriptionId:"notifications-desc",onChange:t,title:e.jsxs(i,{gap:0,id:"notifications-title",children:[e.jsx(c,{font:"headline",children:"Email Notifications"}),e.jsx(c,{color:"fgPositive",font:"caption",children:"Recommended"})]}),titleId:"notifications-title",value:"notifications"}),e.jsx(o,{checked:a.marketing,description:e.jsxs(i,{gap:1,id:"marketing-desc",children:[e.jsx(c,{color:"fgMuted",font:"body",children:"Receive updates about new features and offers"}),e.jsx(c,{color:"fgWarning",font:"caption",children:"Optional - you can unsubscribe anytime"})]}),descriptionId:"marketing-desc",onChange:t,title:e.jsxs(c,{font:"headline",id:"marketing-title",children:["Marketing Communications"," ",e.jsx(c,{as:"span",color:"fgMuted",font:"caption",children:"(Optional)"})]}),titleId:"marketing-title",value:"marketing"})]})},f=()=>{const[a,n]=r.useState(!1);return e.jsx(i,{gap:4,children:e.jsx(o,{checked:a,description:"This is a very long description that demonstrates how the component handles extensive text content. It should wrap properly and maintain good readability while keeping the checkbox aligned at the top.",onChange:t=>n(t.target.checked),title:"Very Long Title That Demonstrates Text Wrapping Behavior",value:"long-content"})})},C=()=>{const[a,n]=r.useState(!1),[t,s]=r.useState(!0),[l,h]=r.useState(!1),[d,I]=r.useState(!0);return e.jsxs(i,{gap:4,children:[e.jsx(o,{checked:a,description:"This option is currently unchecked",onChange:u=>n(u.target.checked),title:"Unchecked State",value:"unchecked"}),e.jsx(o,{checked:t,description:"This option is currently checked",onChange:u=>s(u.target.checked),title:"Checked State",value:"checked"}),e.jsx(o,{disabled:!0,checked:l,description:"This option is disabled and unchecked",onChange:u=>h(u.target.checked),title:"Disabled Unchecked",value:"disabled-unchecked"}),e.jsx(o,{disabled:!0,checked:d,description:"This option is disabled and checked",onChange:u=>I(u.target.checked),title:"Disabled Checked",value:"disabled-checked"})]})},x=()=>{const[a,n]=r.useState("padding-2");return e.jsxs(i,{gap:4,children:[e.jsx(o,{checked:a==="padding-1",description:"Small padding",onChange:t=>n(t.target.checked?"padding-1":""),padding:1,title:"Padding: 1",value:"padding-1"}),e.jsx(o,{checked:a==="padding-2",description:"Default padding",onChange:t=>n(t.target.checked?"padding-2":""),padding:2,title:"Padding: 2 (Default)",value:"padding-2"}),e.jsx(o,{checked:a==="padding-3",description:"Large padding",onChange:t=>n(t.target.checked?"padding-3":""),padding:3,title:"Padding: 3",value:"padding-3"}),e.jsx(o,{checked:a==="padding-4",description:"Extra large padding",onChange:t=>n(t.target.checked?"padding-4":""),padding:4,title:"Padding: 4",value:"padding-4"})]})},b=()=>{const[a,n]=r.useState("border-100");return e.jsxs(i,{gap:4,children:[e.jsx(o,{borderWidth:0,checked:a==="border-0",description:"No border",onChange:t=>n(t.target.checked?"border-0":""),title:"Border Width: 0",value:"border-0"}),e.jsx(o,{borderWidth:100,checked:a==="border-100",description:"Thin border (default)",onChange:t=>n(t.target.checked?"border-100":""),title:"Border Width: 100",value:"border-100"}),e.jsx(o,{borderWidth:200,checked:a==="border-200",description:"Medium border",onChange:t=>n(t.target.checked?"border-200":""),title:"Border Width: 200",value:"border-200"}),e.jsx(o,{borderWidth:300,checked:a==="border-300",description:"Thick border",onChange:t=>n(t.target.checked?"border-300":""),title:"Border Width: 300",value:"border-300"})]})},v=()=>{const[a,n]=r.useState("radius-200");return e.jsxs(i,{gap:4,children:[e.jsx(o,{borderRadius:0,checked:a==="radius-0",description:"No border radius (square corners)",onChange:t=>n(t.target.checked?"radius-0":""),title:"Border Radius: 0",value:"radius-0"}),e.jsx(o,{borderRadius:100,checked:a==="radius-100",description:"Small border radius",onChange:t=>n(t.target.checked?"radius-100":""),title:"Border Radius: 100",value:"radius-100"}),e.jsx(o,{borderRadius:200,checked:a==="radius-200",description:"Default border radius",onChange:t=>n(t.target.checked?"radius-200":""),title:"Border Radius: 200 (Default)",value:"radius-200"}),e.jsx(o,{borderRadius:400,checked:a==="radius-400",description:"Large border radius",onChange:t=>n(t.target.checked?"radius-400":""),title:"Border Radius: 400",value:"radius-400"}),e.jsx(o,{borderRadius:800,checked:a==="radius-800",description:"Very large border radius",onChange:t=>n(t.target.checked?"radius-800":""),title:"Border Radius: 800",value:"radius-800"})]})},S=()=>{const[a,n]=r.useState(!1),[t,s]=r.useState(!1),[l,h]=r.useState(!0);return e.jsxs(i,{gap:4,children:[e.jsx(c,{font:"headline",children:"Interactive Demo"}),e.jsx(c,{color:"fgMuted",font:"body",children:"Use the controls below to see how different props affect the CheckboxCell component."}),e.jsxs(i,{gap:2,children:[e.jsx(D,{checked:t,onChange:d=>s(d.target.checked),children:"Disabled"}),e.jsx(D,{checked:l,onChange:d=>h(d.target.checked),children:"Show Description"})]}),e.jsx(o,{checked:a,description:l?"This description can be toggled on and off":void 0,disabled:t,onChange:d=>n(d.target.checked),title:"Interactive Checkbox Cell",value:"demo"})]})},y=()=>{const[a,n]=r.useState({notifications:!0,marketing:!1,analytics:!0}),t=s=>{const l=s.target.value,h=s.target.checked;n(d=>({...d,[l]:!!h}))};return e.jsxs(i,{gap:3,children:[e.jsx(c,{font:"headline",children:"Privacy Preferences"}),e.jsx(c,{color:"fgMuted",font:"body",children:"Choose which types of data you're comfortable sharing with us."}),e.jsxs(i,{gap:2,children:[e.jsx(o,{checked:a.notifications,description:"Receive email notifications about important updates",onChange:t,title:"Email Notifications",value:"notifications"}),e.jsx(o,{checked:a.marketing,description:"Receive promotional emails and product updates",onChange:t,title:"Marketing Communications",value:"marketing"}),e.jsx(o,{checked:a.analytics,description:"Help us improve by sharing anonymous usage data",onChange:t,title:"Analytics & Performance",value:"analytics"})]}),e.jsx(c,{color:"fgMuted",font:"caption",children:"You can change these preferences at any time in your account settings."})]})},T=()=>{const[a,n]=r.useState({darkMode:!1,autoSave:!0,notifications:!0,betaFeatures:!1}),t=s=>{const l=s.target.value,h=s.target.checked;n(d=>({...d,[l]:!!h}))};return e.jsxs(i,{gap:6,children:[e.jsx(c,{font:"headline",children:"Application Settings"}),e.jsxs(i,{gap:3,children:[e.jsxs(i,{gap:1,children:[e.jsx(c,{color:"fgMuted",font:"label1",children:"APPEARANCE"}),e.jsx(o,{checked:a.darkMode,description:"Use dark theme for the interface",onChange:t,title:"Dark Mode",value:"dark-mode"})]}),e.jsxs(i,{gap:1,children:[e.jsx(c,{color:"fgMuted",font:"label1",children:"BEHAVIOR"}),e.jsxs(i,{gap:1,children:[e.jsx(o,{checked:a.autoSave,description:"Automatically save your work every few minutes",onChange:t,title:"Auto-save",value:"auto-save"}),e.jsx(o,{checked:a.notifications,description:"Show desktop notifications for important events",onChange:t,title:"Desktop Notifications",value:"notifications"})]})]}),e.jsxs(i,{gap:1,children:[e.jsx(c,{color:"fgMuted",font:"label1",children:"EXPERIMENTAL"}),e.jsx(o,{checked:a.betaFeatures,description:"Enable experimental features (may be unstable)",onChange:t,title:"Beta Features",value:"beta-features"})]})]})]})},j=()=>{const[a,n]=r.useState({terms:!1,privacy:!1,marketing:!1}),t=l=>h=>{n(d=>({...d,[l]:h.target.checked}))},s=a.terms&&a.privacy;return e.jsxs(i,{gap:6,children:[e.jsxs(i,{gap:2,children:[e.jsx(c,{font:"headline",children:"Welcome to Our Platform"}),e.jsx(c,{color:"fgMuted",font:"body",children:"Before we get started, please review and accept our terms."})]}),e.jsxs(i,{gap:2,children:[e.jsx(o,{checked:a.terms,description:"I agree to the Terms of Service and understand my rights and obligations",onChange:t("terms"),title:"Terms of Service (Required)",value:"terms"}),e.jsx(o,{checked:a.privacy,description:"I acknowledge that I have read and understood the Privacy Policy",onChange:t("privacy"),title:"Privacy Policy (Required)",value:"privacy"}),e.jsx(o,{checked:a.marketing,description:"I would like to receive marketing communications and product updates",onChange:t("marketing"),title:"Marketing Communications (Optional)",value:"marketing"})]}),e.jsx(V,{block:!0,disabled:!s,children:"Continue"}),!s&&e.jsx(c,{color:"fgMuted",font:"caption",children:"Please accept the required terms to continue."})]})};p.__docgenInfo={description:"",methods:[],displayName:"Default"};g.__docgenInfo={description:"",methods:[],displayName:"WithDescription"};k.__docgenInfo={description:"",methods:[],displayName:"CustomIds"};m.__docgenInfo={description:"",methods:[],displayName:"CustomContent"};f.__docgenInfo={description:"",methods:[],displayName:"LongContent"};C.__docgenInfo={description:"",methods:[],displayName:"States"};x.__docgenInfo={description:"",methods:[],displayName:"PaddingVariations"};b.__docgenInfo={description:"",methods:[],displayName:"BorderVariations"};v.__docgenInfo={description:"",methods:[],displayName:"BorderRadiusVariations"};S.__docgenInfo={description:"",methods:[],displayName:"InteractiveDemo"};y.__docgenInfo={description:"",methods:[],displayName:"CheckboxGroup"};T.__docgenInfo={description:"",methods:[],displayName:"SettingsPanel"};j.__docgenInfo={description:"",methods:[],displayName:"OnboardingFlow"};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => {
  const [checked, setChecked] = useState(false);
  return <CheckboxCell checked={checked} onChange={e => setChecked(e.target.checked)} title="Default Checkbox Cell" value="default" />;
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => {
  const [checked, setChecked] = useState(false);
  return <CheckboxCell checked={checked} description="This is a helpful description that provides additional context" onChange={e => setChecked(e.target.checked)} title="Checkbox with Description with Description with Description" value="with-description" />;
}`,...g.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`() => {
  const [checked, setChecked] = useState(false);
  return <VStack gap={4}>
      <Text font="headline">Custom ID Examples</Text>
      <Text color="fgMuted" font="body">
        These examples show how to pass custom titleId and descriptionId props.
      </Text>

      <CheckboxCell checked={checked} description="This has custom IDs for testing or external references" descriptionId="custom-checkbox-description" onChange={e => setChecked(e.target.checked)} title="Custom IDs Example" titleId="custom-checkbox-title" value="custom-ids" />

      <Text color="fgMuted" font="caption">
        Title ID: custom-checkbox-title, Description ID: custom-checkbox-description
      </Text>
    </VStack>;
}`,...k.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => {
  const [preferences, setPreferences] = useState({
    notifications: false,
    marketing: false
  });
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value as keyof typeof preferences;
    const value = event.target.checked;
    setPreferences(prev => ({
      ...prev,
      [key]: !!value
    }));
  };
  return <VStack gap={4}>
      <Text font="headline">Custom React Node Content</Text>
      <Text color="fgMuted" font="body">
        These examples show custom title and description nodes with IDs applied correctly.
      </Text>

      <CheckboxCell checked={preferences.notifications} description={<VStack gap={1} id="notifications-desc">
            <Text color="fgMuted" font="body">
              Stay updated with important information
            </Text>
            <Text color="fgPrimary" font="label1">
              • Security alerts
            </Text>
            <Text color="fgPrimary" font="label1">
              • Account updates
            </Text>
            <Text color="fgPrimary" font="label1">
              • System notifications
            </Text>
          </VStack>} descriptionId="notifications-desc" onChange={handleToggle} title={<VStack gap={0} id="notifications-title">
            <Text font="headline">Email Notifications</Text>
            <Text color="fgPositive" font="caption">
              Recommended
            </Text>
          </VStack>} titleId="notifications-title" value="notifications" />

      <CheckboxCell checked={preferences.marketing} description={<VStack gap={1} id="marketing-desc">
            <Text color="fgMuted" font="body">
              Receive updates about new features and offers
            </Text>
            <Text color="fgWarning" font="caption">
              Optional - you can unsubscribe anytime
            </Text>
          </VStack>} descriptionId="marketing-desc" onChange={handleToggle} title={<Text font="headline" id="marketing-title">
            Marketing Communications{' '}
            <Text as="span" color="fgMuted" font="caption">
              (Optional)
            </Text>
          </Text>} titleId="marketing-title" value="marketing" />
    </VStack>;
}`,...m.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`() => {
  const [checked, setChecked] = useState(false);
  return <VStack gap={4}>
      <CheckboxCell checked={checked} description="This is a very long description that demonstrates how the component handles extensive text content. It should wrap properly and maintain good readability while keeping the checkbox aligned at the top." onChange={e => setChecked(e.target.checked)} title="Very Long Title That Demonstrates Text Wrapping Behavior" value="long-content" />
    </VStack>;
}`,...f.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`() => {
  const [unchecked, setUnchecked] = useState(false);
  const [checked, setChecked] = useState(true);
  const [disabledUnchecked, setDisabledUnchecked] = useState(false);
  const [disabledChecked, setDisabledChecked] = useState(true);
  return <VStack gap={4}>
      <CheckboxCell checked={unchecked} description="This option is currently unchecked" onChange={e => setUnchecked(e.target.checked)} title="Unchecked State" value="unchecked" />

      <CheckboxCell checked={checked} description="This option is currently checked" onChange={e => setChecked(e.target.checked)} title="Checked State" value="checked" />

      <CheckboxCell disabled checked={disabledUnchecked} description="This option is disabled and unchecked" onChange={e => setDisabledUnchecked(e.target.checked)} title="Disabled Unchecked" value="disabled-unchecked" />

      <CheckboxCell disabled checked={disabledChecked} description="This option is disabled and checked" onChange={e => setDisabledChecked(e.target.checked)} title="Disabled Checked" value="disabled-checked" />
    </VStack>;
}`,...C.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`() => {
  const [selected, setSelected] = useState<string>('padding-2');
  return <VStack gap={4}>
      <CheckboxCell checked={selected === 'padding-1'} description="Small padding" onChange={e => setSelected(e.target.checked ? 'padding-1' : '')} padding={1} title="Padding: 1" value="padding-1" />

      <CheckboxCell checked={selected === 'padding-2'} description="Default padding" onChange={e => setSelected(e.target.checked ? 'padding-2' : '')} padding={2} title="Padding: 2 (Default)" value="padding-2" />

      <CheckboxCell checked={selected === 'padding-3'} description="Large padding" onChange={e => setSelected(e.target.checked ? 'padding-3' : '')} padding={3} title="Padding: 3" value="padding-3" />

      <CheckboxCell checked={selected === 'padding-4'} description="Extra large padding" onChange={e => setSelected(e.target.checked ? 'padding-4' : '')} padding={4} title="Padding: 4" value="padding-4" />
    </VStack>;
}`,...x.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`() => {
  const [selected, setSelected] = useState<string>('border-100');
  return <VStack gap={4}>
      <CheckboxCell borderWidth={0} checked={selected === 'border-0'} description="No border" onChange={e => setSelected(e.target.checked ? 'border-0' : '')} title="Border Width: 0" value="border-0" />

      <CheckboxCell borderWidth={100} checked={selected === 'border-100'} description="Thin border (default)" onChange={e => setSelected(e.target.checked ? 'border-100' : '')} title="Border Width: 100" value="border-100" />

      <CheckboxCell borderWidth={200} checked={selected === 'border-200'} description="Medium border" onChange={e => setSelected(e.target.checked ? 'border-200' : '')} title="Border Width: 200" value="border-200" />

      <CheckboxCell borderWidth={300} checked={selected === 'border-300'} description="Thick border" onChange={e => setSelected(e.target.checked ? 'border-300' : '')} title="Border Width: 300" value="border-300" />
    </VStack>;
}`,...b.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`() => {
  const [selected, setSelected] = useState<string>('radius-200');
  return <VStack gap={4}>
      <CheckboxCell borderRadius={0} checked={selected === 'radius-0'} description="No border radius (square corners)" onChange={e => setSelected(e.target.checked ? 'radius-0' : '')} title="Border Radius: 0" value="radius-0" />

      <CheckboxCell borderRadius={100} checked={selected === 'radius-100'} description="Small border radius" onChange={e => setSelected(e.target.checked ? 'radius-100' : '')} title="Border Radius: 100" value="radius-100" />

      <CheckboxCell borderRadius={200} checked={selected === 'radius-200'} description="Default border radius" onChange={e => setSelected(e.target.checked ? 'radius-200' : '')} title="Border Radius: 200 (Default)" value="radius-200" />

      <CheckboxCell borderRadius={400} checked={selected === 'radius-400'} description="Large border radius" onChange={e => setSelected(e.target.checked ? 'radius-400' : '')} title="Border Radius: 400" value="radius-400" />

      <CheckboxCell borderRadius={800} checked={selected === 'radius-800'} description="Very large border radius" onChange={e => setSelected(e.target.checked ? 'radius-800' : '')} title="Border Radius: 800" value="radius-800" />
    </VStack>;
}`,...v.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => {
  const [checked, setChecked] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [hasDescription, setHasDescription] = useState(true);
  return <VStack gap={4}>
      <Text font="headline">Interactive Demo</Text>
      <Text color="fgMuted" font="body">
        Use the controls below to see how different props affect the CheckboxCell component.
      </Text>

      <VStack gap={2}>
        <Switch checked={disabled} onChange={e => setDisabled(e.target.checked)}>
          Disabled
        </Switch>

        <Switch checked={hasDescription} onChange={e => setHasDescription(e.target.checked)}>
          Show Description
        </Switch>
      </VStack>

      <CheckboxCell checked={checked} description={hasDescription ? 'This description can be toggled on and off' : undefined} disabled={disabled} onChange={e => setChecked(e.target.checked)} title="Interactive Checkbox Cell" value="demo" />
    </VStack>;
}`,...S.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => {
  const [preferences, setPreferences] = useState({
    notifications: true,
    marketing: false,
    analytics: true
  });
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value as keyof typeof preferences;
    const value = event.target.checked;
    setPreferences(prev => ({
      ...prev,
      [key]: !!value
    }));
  };
  return <VStack gap={3}>
      <Text font="headline">Privacy Preferences</Text>
      <Text color="fgMuted" font="body">
        Choose which types of data you&apos;re comfortable sharing with us.
      </Text>

      <VStack gap={2}>
        <CheckboxCell checked={preferences.notifications} description="Receive email notifications about important updates" onChange={handleToggle} title="Email Notifications" value="notifications" />

        <CheckboxCell checked={preferences.marketing} description="Receive promotional emails and product updates" onChange={handleToggle} title="Marketing Communications" value="marketing" />

        <CheckboxCell checked={preferences.analytics} description="Help us improve by sharing anonymous usage data" onChange={handleToggle} title="Analytics & Performance" value="analytics" />
      </VStack>

      <Text color="fgMuted" font="caption">
        You can change these preferences at any time in your account settings.
      </Text>
    </VStack>;
}`,...y.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`() => {
  const [settings, setSettings] = useState({
    darkMode: false,
    autoSave: true,
    notifications: true,
    betaFeatures: false
  });
  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const key = event.target.value as keyof typeof settings;
    const value = event.target.checked;
    setSettings(prev => ({
      ...prev,
      [key]: !!value
    }));
  };
  return <VStack gap={6}>
      <Text font="headline">Application Settings</Text>

      <VStack gap={3}>
        <VStack gap={1}>
          <Text color="fgMuted" font="label1">
            APPEARANCE
          </Text>
          <CheckboxCell checked={settings.darkMode} description="Use dark theme for the interface" onChange={handleToggle} title="Dark Mode" value="dark-mode" />
        </VStack>

        <VStack gap={1}>
          <Text color="fgMuted" font="label1">
            BEHAVIOR
          </Text>
          <VStack gap={1}>
            <CheckboxCell checked={settings.autoSave} description="Automatically save your work every few minutes" onChange={handleToggle} title="Auto-save" value="auto-save" />

            <CheckboxCell checked={settings.notifications} description="Show desktop notifications for important events" onChange={handleToggle} title="Desktop Notifications" value="notifications" />
          </VStack>
        </VStack>

        <VStack gap={1}>
          <Text color="fgMuted" font="label1">
            EXPERIMENTAL
          </Text>
          <CheckboxCell checked={settings.betaFeatures} description="Enable experimental features (may be unstable)" onChange={handleToggle} title="Beta Features" value="beta-features" />
        </VStack>
      </VStack>
    </VStack>;
}`,...T.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`() => {
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    marketing: false
  });
  const handleToggle = (key: keyof typeof agreements) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreements(prev => ({
      ...prev,
      [key]: e.target.checked
    }));
  };
  const allRequiredAccepted = agreements.terms && agreements.privacy;
  return <VStack gap={6}>
      <VStack gap={2}>
        <Text font="headline">Welcome to Our Platform</Text>
        <Text color="fgMuted" font="body">
          Before we get started, please review and accept our terms.
        </Text>
      </VStack>

      <VStack gap={2}>
        <CheckboxCell checked={agreements.terms} description="I agree to the Terms of Service and understand my rights and obligations" onChange={handleToggle('terms')} title="Terms of Service (Required)" value="terms" />

        <CheckboxCell checked={agreements.privacy} description="I acknowledge that I have read and understood the Privacy Policy" onChange={handleToggle('privacy')} title="Privacy Policy (Required)" value="privacy" />

        <CheckboxCell checked={agreements.marketing} description="I would like to receive marketing communications and product updates" onChange={handleToggle('marketing')} title="Marketing Communications (Optional)" value="marketing" />
      </VStack>

      <Button block disabled={!allRequiredAccepted}>
        Continue
      </Button>

      {!allRequiredAccepted && <Text color="fgMuted" font="caption">
          Please accept the required terms to continue.
        </Text>}
    </VStack>;
}`,...j.parameters?.docs?.source}}};const ae=["Default","WithDescription","CustomIds","CustomContent","LongContent","States","PaddingVariations","BorderVariations","BorderRadiusVariations","InteractiveDemo","CheckboxGroup","SettingsPanel","OnboardingFlow"];export{v as BorderRadiusVariations,b as BorderVariations,y as CheckboxGroup,m as CustomContent,k as CustomIds,p as Default,S as InteractiveDemo,f as LongContent,j as OnboardingFlow,x as PaddingVariations,T as SettingsPanel,C as States,g as WithDescription,ae as __namedExportsOrder,te as default};
