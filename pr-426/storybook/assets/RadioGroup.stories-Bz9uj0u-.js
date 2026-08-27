import{r as t,d as R,j as e,B as _}from"./iframe-CsG_6vZR.js";import{T as i}from"./Text-B1CpMNU3.js";import{C as D}from"./ControlGroup-C3uqQwYB.js";import{R as s}from"./Radio-B-fvGGci.js";import{V as w}from"./VStack-Cg_Yq2u4.js";import"./preload-helper-D9Z9MdNV.js";import"./checkbox-DVjU0upZ.js";import"./tokens-BwScSksM.js";import"./useTheme-CmrOhAty.js";import"./useMotionProps-BXBckQBf.js";import"./utils-y2S18Lx0.js";import"./Control-DrPBFTYm.js";import"./useMergeRefs-DR4sGa7m.js";import"./usePrefixedId-BL1THI0P.js";import"./Interactable--rqISG90.js";import"./color-Ceo1QMNe.js";import"./isRtl-C5Fon8jH.js";import"./motion-minimal-5s2ikV7b.js";function B(o){return t.useCallback(a=>{o?.(a.target.value)},[o])}const S=t.forwardRef(function({label:a,value:r,onChange:g,options:b,name:h,testID:y,controlColor:f="bgPrimary",role:k="radiogroup",...G},v){R()&&console.warn('RadioGroup is deprecated. Use ControlGroup with role="radiogroup" instead.');const j=B(g),T=Object.entries(b).map(([C,N])=>({value:C,children:N,id:`${h}-${C}`,controlColor:f}));return R()&&console.warn('RadioGroup is deprecated. Use ControlGroup with role="radiogroup" instead.'),e.jsx(D,{ref:v,ControlComponent:s,label:a,name:h,onChange:j,options:T,role:k,testID:y,value:r||"",...G})}),n=t.memo(S);S.__docgenInfo={description:"",methods:[],displayName:"RadioGroupWithRef",props:{testID:{required:!1,tsType:{name:"string"},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`},options:{required:!0,tsType:{name:"Record",elements:[{name:"RadioValue"},{name:"union",raw:"string | React.ReactNode",elements:[{name:"string"},{name:"ReactReactNode",raw:"React.ReactNode"}]}],raw:"Record<RadioValue, string | React.ReactNode>"},description:`Multiple choice options for the radio group. The object key represents
the radio input value and the object value represents the radio option label.`},label:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Set a label summary for the group of radios."},value:{required:!1,tsType:{name:"RadioValue"},description:"Currently selected value."},name:{required:!0,tsType:{name:"string"},description:"Field name of the multiple choice radio group."},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: RadioValue) => void",signature:{arguments:[{type:{name:"RadioValue"},name:"value"}],return:{name:"void"}}},description:"Handle change event when pressing on a radio option."},controlColor:{required:!1,tsType:{name:"ThemeVars.Color"},description:`Sets the checked/active color of each control in the group.
@default bgPrimary`,defaultValue:{value:"'bgPrimary'",computed:!1}},role:{defaultValue:{value:"'radiogroup'",computed:!1},required:!1}}};const d=()=>{const[o,a]=t.useState(!1);return e.jsx(s,{checked:o,name:"normal-radio",onChange:()=>a(r=>!r),children:"Normal"})},c=()=>{const[o,a]=t.useState(!1);return e.jsxs(w,{gap:2,children:[e.jsx(s,{checked:o,controlColor:"bgPositive",name:"normal-radio",onChange:()=>a(r=>!r),children:"Control color prop"}),e.jsx(s,{background:o?"accentBoldPurple":"bg",borderColor:o?"bgNegative":"bgWarning",checked:o,color:"bgPrimary",controlColor:"bgPositive",name:"normal-radio",onChange:()=>a(r=>!r),children:"Style props"})]})},l=()=>e.jsx(s,{disabled:!0,children:"Disabled unselected"}),p=()=>e.jsx(s,{checked:!0,disabled:!0,children:"Disabled selected"}),u=()=>e.jsx(_,{width:"250px",children:e.jsx(s,{children:"This radio has a multi-line label. The radio and label should align at the top."})}),x={btc:"Bitcoin",eth:"Ethereum",dai:"Dai"},I={"yellow-jacket":"Yellow Jacket",bruin:"Bruin",bronco:"Bronco"},P={taco:"tacos",puttanesca:"Spaghetti","hamachi-salad":e.jsx(i,{font:"label1",children:"Hamachi salad"})},m=()=>{const[o,a]=t.useState("btc"),[r,g]=t.useState(),[b,h]=t.useState(),[y,f]=t.useState();return e.jsxs(e.Fragment,{children:[e.jsx(n,{"aria-labelledby":"choose-a-currency",id:"currency-radio-group",label:e.jsx(i,{font:"headline",id:"choose-a-currency",children:"Choose a currency"}),name:"radio-group1",onChange:a,options:x,value:o}),e.jsx(i,{font:"headline",id:"choose-a-mascot",children:"Choose a mascot"}),e.jsx(n,{accessibilityLabelledBy:"choose-a-mascot",id:"mascot-radio-group",name:"radio-group2",onChange:g,options:I,value:r}),e.jsx(n,{"aria-labelledby":"choose-a-currency2",direction:"horizontal",gap:2,id:"horizontal-radio-group",label:e.jsx(i,{font:"headline",id:"choose-a-currency2",children:"Choose a currency"}),name:"radio-group3",onChange:h,options:x,value:b}),e.jsx(i,{font:"headline",id:"select-dish-to-order",children:"Select a dish to order"}),e.jsx(n,{"aria-labelledby":"select-dish-to-order",direction:"horizontal",gap:2,name:"radio-group4",onChange:f,options:P,value:y})]})},Z={title:"Components/RadioGroup",component:n};d.__docgenInfo={description:"",methods:[],displayName:"Normal"};c.__docgenInfo={description:"",methods:[],displayName:"CustomColors"};l.__docgenInfo={description:"",methods:[],displayName:"DisabledUnselected"};p.__docgenInfo={description:"",methods:[],displayName:"DisabledSelected"};u.__docgenInfo={description:"",methods:[],displayName:"MultiLineLabels"};m.__docgenInfo={description:"",methods:[],displayName:"Group"};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => {
  const [checked, setChecked] = useState(false);
  return <Radio checked={checked} name="normal-radio" onChange={() => setChecked(s => !s)}>
      Normal
    </Radio>;
}`,...d.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => {
  const [checked, setChecked] = useState(false);
  return <VStack gap={2}>
      <Radio checked={checked} controlColor="bgPositive" name="normal-radio" onChange={() => setChecked(s => !s)}>
        Control color prop
      </Radio>
      <Radio background={checked ? 'accentBoldPurple' : 'bg'} borderColor={checked ? 'bgNegative' : 'bgWarning'} checked={checked} color="bgPrimary" controlColor="bgPositive" name="normal-radio" onChange={() => setChecked(s => !s)}>
        Style props
      </Radio>
    </VStack>;
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:"() => <Radio disabled>Disabled unselected</Radio>",...l.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => <Radio checked disabled>
    Disabled selected
  </Radio>`,...p.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`() => <Box width="250px">
    <Radio>This radio has a multi-line label. The radio and label should align at the top.</Radio>
  </Box>`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => {
  const [group1, setGroup1] = useState<string>('btc');
  const [group2, setGroup2] = useState<string>();
  const [group3, setGroup3] = useState<string>();
  const [group4, setGroup4] = useState<keyof typeof options3>();
  return <>
      <RadioGroup aria-labelledby="choose-a-currency" id="currency-radio-group" label={<Text font="headline" id="choose-a-currency">
            Choose a currency
          </Text>} name="radio-group1" onChange={setGroup1} options={options1} value={group1} />
      <Text font="headline" id="choose-a-mascot">
        Choose a mascot
      </Text>
      <RadioGroup accessibilityLabelledBy="choose-a-mascot" id="mascot-radio-group" name="radio-group2" onChange={setGroup2} options={options2} value={group2} />
      <RadioGroup aria-labelledby="choose-a-currency2" direction="horizontal" gap={2} id="horizontal-radio-group" label={<Text font="headline" id="choose-a-currency2">
            Choose a currency
          </Text>} name="radio-group3" onChange={setGroup3} options={options1} value={group3} />
      <Text font="headline" id="select-dish-to-order">
        Select a dish to order
      </Text>
      <RadioGroup aria-labelledby="select-dish-to-order" direction="horizontal" gap={2} name="radio-group4" onChange={setGroup4} options={options3} value={group4} />
    </>;
}`,...m.parameters?.docs?.source}}};const ee=["Normal","CustomColors","DisabledUnselected","DisabledSelected","MultiLineLabels","Group"];export{c as CustomColors,p as DisabledSelected,l as DisabledUnselected,m as Group,u as MultiLineLabels,d as Normal,ee as __namedExportsOrder,Z as default};
