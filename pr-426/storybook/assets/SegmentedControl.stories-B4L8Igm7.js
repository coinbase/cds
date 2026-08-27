import{r as s,j as e,c as y}from"./iframe-CYDANtMt.js";import{I as x}from"./Icon-DRxKkZdt.js";import{I as w}from"./Interactable-DhvzqrPU.js";import{V as j}from"./VStack-iXgNewwv.js";import"./preload-helper-D9Z9MdNV.js";import"./useTheme-C_Ehsh33.js";import"./color-Ceo1QMNe.js";const _="insetFocusRingCss-i12fghfy",q="containerCss-cqiave6",D="labelCss-l1xftbym",O="hiddenLabelCss-h1wriq1w",T="optionCss-o19cqrdg",E="radioCss-r1hdc15n";function v({type:t,option:o,iconSize:i,iconActive:m,hidden:d}){return e.jsxs("span",{"aria-hidden":d,className:y(T,d&&O),children:[t==="icon"?e.jsx(x,{active:m,color:"currentColor",name:o,size:i}):o,e.jsx(x,{name:"checkmark",size:"xs"})]})}function $(t,o){const{type:i,options:m,block:d,disabled:h,testID:g,onChange:C}=t,[f,I]=s.useState(t.value),u=s.useId(),k={"--width":d?"100%":"max-content"},S=i==="icon"?t.iconSize:"l",z=s.useCallback(r=>{I(r.target.value),C?.(r.target.value)},[C]);return e.jsx("div",{ref:o,className:q,style:k,children:m.map(({label:r,value:a,accessibilityLabel:V,...N})=>{const b=N?.active;return e.jsxs(s.Fragment,{children:[e.jsx("input",{"aria-label":V,checked:f===a,className:y(E,_),"data-testid":g?`${g}-${a}`:void 0,disabled:h,id:`${u}-${a}`,name:u,onChange:z,type:"radio",value:a}),e.jsxs(w,{as:"label",background:"bgAlternate",className:D,disabled:h,htmlFor:`${u}-${a}`,children:[e.jsx(v,{hidden:!0,iconActive:b,iconSize:S,option:r,type:i}),e.jsx(v,{iconActive:b,iconSize:S,option:r,type:i})]})]},a)})})}const n=s.memo(s.forwardRef($));n.displayName="SegmentedControl";n.__docgenInfo={description:"",methods:[],displayName:"SegmentedControl",props:{value:{required:!1,tsType:{name:"string"},description:"The selected value"},block:{required:!1,tsType:{name:"boolean"},description:"Expand to 100% of parent width"},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: string) => void",signature:{arguments:[{type:{name:"string"},name:"value"}],return:{name:"void"}}},description:"Callback fired when an option is selected"},disabled:{required:!1,tsType:{name:"boolean"},description:""},testID:{required:!1,tsType:{name:"string"},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`}}};const J={title:"Components/Segmented Control",component:n},L=[{label:"ETH",value:"eth"},{label:"USD",value:"usd"}],U=[{label:"🐔",value:"chicken"},{label:"🥚",value:"egg"}],F=[{label:"black",value:"black"},{label:"white",value:"white"}],c=()=>e.jsxs(j,{gap:2,children:[e.jsx(n,{options:L}),e.jsx(n,{options:U}),e.jsx(n,{disabled:!0,options:F})]}),p=[{label:"ethereum",value:"eth",accessibilityLabel:"Ethereum",active:!0},{label:"cashUSD",value:"usd",accessibilityLabel:"CashUSD"}],l=()=>{const[t,o]=s.useState("eth");return e.jsxs(j,{gap:2,children:[e.jsx("pre",{children:"xs"}),e.jsx(n,{iconSize:"xs",onChange:o,options:p,type:"icon",value:t}),e.jsx("pre",{children:"s"}),e.jsx(n,{iconSize:"s",onChange:o,options:p,type:"icon",value:t}),e.jsx("pre",{children:"m"}),e.jsx(n,{iconSize:"m",onChange:o,options:p,type:"icon",value:t}),e.jsx("pre",{children:"l"}),e.jsx(n,{iconSize:"l",onChange:o,options:p,type:"icon",value:t})]})};c.__docgenInfo={description:"",methods:[],displayName:"Normal"};l.__docgenInfo={description:"",methods:[],displayName:"Icons"};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => {
  return <VStack gap={2}>
      <SegmentedControl options={options1} />
      <SegmentedControl options={options2} />
      <SegmentedControl disabled options={options3} />
    </VStack>;
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => {
  const [value, setValue] = useState('eth');
  return <VStack gap={2}>
      <pre>xs</pre>
      <SegmentedControl iconSize="xs" onChange={setValue} options={iconOptions1} type="icon" value={value} />

      <pre>s</pre>
      <SegmentedControl iconSize="s" onChange={setValue} options={iconOptions1} type="icon" value={value} />

      <pre>m</pre>
      <SegmentedControl iconSize="m" onChange={setValue} options={iconOptions1} type="icon" value={value} />

      <pre>l</pre>
      <SegmentedControl iconSize="l" onChange={setValue} options={iconOptions1} type="icon" value={value} />
    </VStack>;
}`,...l.parameters?.docs?.source}}};const K=["Normal","Icons"];export{l as Icons,c as Normal,K as __namedExportsOrder,J as default};
