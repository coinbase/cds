import{j as l,r as $}from"./iframe-CYDANtMt.js";import{S as o,u as n}from"./DefaultSelectControl-D7XmFGZ1.js";import{I as i}from"./Icon-DRxKkZdt.js";import{V as q}from"./VStack-iXgNewwv.js";import{P as U}from"./Pressable-BvczHaFK.js";import{T as F}from"./Text-0g3rWpAf.js";import"./preload-helper-D9Z9MdNV.js";import"./floating-ui.react-dom-CVxlbkL8.js";import"./Portal-BNKVVywf.js";import"./useTheme-C_Ehsh33.js";import"./Divider-CG0S6-JI.js";import"./select-Em8pkxbY.js";import"./Cell-D1A-2vVj.js";import"./useCellSpacing-BH3_o_ol.js";import"./sizing-Do56D2dQ.js";import"./HStack-Fh-9TmPm.js";import"./InputChip-B31f2sLo.js";import"./MediaChip-2PB0UFrW.js";import"./Chip-DQPBsLRY.js";import"./tokens-BwScSksM.js";import"./HelperText-0iJbV5oL.js";import"./InputLabel-BwQhf82V.js";import"./InputStack-uMkha90v.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";import"./ColorSurge-COlvd6LS.js";import"./useMotionProps-BF3bCUsm.js";import"./utils-CM_X5is-.js";import"./use-animation-B-MH_N0S.js";import"./motion-minimal-B1h7XI-_.js";import"./AnimatedCaret-R2z7TxpB.js";import"./collapsible-BAneA-61.js";import"./context-C9K9uJvD.js";import"./index-CAK1E_4V.js";import"./Checkbox-DVQ8jHPo.js";import"./checkbox-DVjU0upZ.js";import"./Control-C-1dn_y_.js";import"./useMergeRefs-DR4sGa7m.js";import"./usePrefixedId-D1yZvkEs.js";import"./isRtl-CGZsgYct.js";import"./Radio-Cz5dwyfU.js";import"./FocusTrap-D5jofIBF.js";import"./debounce-fynzmAtJ.js";import"./index-DaxQGrHc.js";import"./use-unmount-effect-DjWyEMV9.js";import"./Button-DPtA13Wn.js";import"./Spinner-CXotWqqb.js";import"./isArray-BJmyNVUi.js";const $e={title:"Components/Alpha/Select/MultiSelect",component:o},z="paddingCss-pcp1tqk",X="hoveredBackgroundCss-hbqyegc",u=()=>{const e=[{value:null,label:"Remove selection"},{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"},{value:"4",label:"Option 4"},{value:"5",label:"Option 5"},{value:"6",label:"Option 6"},{value:"7",label:"Option 7"},{value:"8",label:"Option 8"}],{value:a,onChange:t}=n({initialValue:["1","2"]});return l.jsx(o,{controlAccessibilityLabel:"Multi select control with selected options",label:"Multi select",onChange:t,options:e,placeholder:"Empty value",type:"multi",value:a})},c=()=>{const e=[{value:null,label:"Remove selection"},{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"},{value:"4",label:"Option 4"},{value:"5",label:"Option 5"},{value:"6",label:"Option 6"},{value:"7",label:"Option 7"},{value:"8",label:"Option 8"}],{value:a,onChange:t}=n({initialValue:["1","2"]});return l.jsx(o,{compact:!0,label:"Multi select - compact",onChange:t,options:e,placeholder:"Empty value",type:"multi",value:a})},r=()=>{const e=[{value:null,label:"Remove selection"},{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"},{value:"4",label:"Option 4"}],{value:a,onChange:t}=n({initialValue:["1","2","3","4"]});return l.jsx(o,{label:"Multi select - inside label variant",labelVariant:"inside",onChange:t,options:e,placeholder:"Empty value",type:"multi",value:a})},m=()=>{const e=[{value:null,label:"Remove selection"},{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"},{value:"4",label:"Option 4"},{value:"5",label:"Option 5"},{value:"6",label:"Option 6"},{value:"7",label:"Option 7"},{value:"8",label:"Option 8"},{value:"9",label:"Option 9"},{value:"10",label:"Option 10"}],{value:a,onChange:t}=n({initialValue:["1","3","7","8","9","10"]});return l.jsx(o,{compact:!0,label:"Multi select - compact with many selected",onChange:t,options:e,placeholder:"Empty value",type:"multi",value:a})},v=()=>{const e=[{value:null,label:"Remove selection"},{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"},{value:"4",label:"Option 4"},{value:"5",label:"Option 5"},{value:"6",label:"Option 6"},{value:"7",label:"Option 7"},{value:"8",label:"Option 8"}],{value:a,onChange:t}=n({initialValue:["1"]});return l.jsx(o,{hideSelectAll:!0,label:"Multi select - hide select all",onChange:t,options:e,placeholder:"Empty value",type:"multi",value:a})},b=()=>{const e=[{value:null,label:"Remove selection"},{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"},{value:"4",label:"Option 4"},{value:"5",label:"Option 5"},{value:"6",label:"Option 6"},{value:"7",label:"Option 7"},{value:"8",label:"Option 8"}],{value:a,onChange:t}=n({initialValue:["1"]});return l.jsxs(q,{gap:2,children:[l.jsx(o,{label:"Default align - start",onChange:t,options:e,placeholder:"Empty value",type:"multi",value:a}),l.jsx(o,{align:"center",label:"Center align",onChange:t,options:e,placeholder:"Empty value",type:"multi",value:a}),l.jsx(o,{align:"end",label:"End align",onChange:t,options:e,placeholder:"Empty value",type:"multi",value:a}),l.jsx(o,{compact:!0,label:"Compact align - start",onChange:t,options:e,placeholder:"Empty value",type:"multi",value:a}),l.jsx(o,{compact:!0,align:"center",label:"Compact align - center",onChange:t,options:e,placeholder:"Empty value",type:"multi",value:a}),l.jsx(o,{compact:!0,align:"end",label:"Compact align - end",onChange:t,options:e,placeholder:"Empty value",type:"multi",value:a})]})},d=()=>{const e=[{value:null,label:"Remove selection"},{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"},{value:"4",label:"Option 4"},{value:"5",label:"Option 5"},{value:"6",label:"Option 6"},{value:"7",label:"Option 7"},{value:"8",label:"Option 8"}],{value:a,onChange:t}=n({initialValue:["1"]});return l.jsx(o,{label:"Multi select - custom select all label",onChange:t,options:e,placeholder:"Empty value",selectAllLabel:"~Custom!~ Select every single option here",type:"multi",value:a})},O=()=>{const{value:e,onChange:a}=n({initialValue:["1"]}),t=[{value:null,label:"Remove selection"},{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"},{value:"4",label:"Option 4"},{value:"5",label:"Option 5"},{value:"6",label:"Option 6"},{value:"7",label:"Option 7"},{value:"8",label:"Option 8"}];return l.jsx(o,{clearAllLabel:"Custom Clear All Label",label:"Multi select - custom clear all label",onChange:a,options:t,placeholder:"Empty value",type:"multi",value:e})},g=()=>{const e=[{value:null,label:"Remove selection"},{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"},{value:"4",label:"Option 4"},{value:"5",label:"Option 5"},{value:"6",label:"Option 6"},{value:"7",label:"Option 7"},{value:"8",label:"Option 8"}],{value:a,onChange:t}=n({initialValue:["1"]}),s=({onClick:p,selected:w,disabled:T,label:P,blendStyles:B,className:H,style:W})=>l.jsx(U,{noScaleOnPress:!0,background:w?"bgSecondary":"bg",blendStyles:B,className:H,disabled:T,onClick:()=>p?.("select-all"),paddingX:2,paddingY:3,style:W,children:l.jsx(F,{color:w?"fgPrimary":"fg",font:"headline",children:P||"Custom Select All Option"})});return l.jsx(o,{SelectAllOptionComponent:s,label:"Multi select - custom select all option",onChange:t,options:e,placeholder:"Empty value",type:"multi",value:a})},h=()=>{const e=[{value:null,label:"Remove selection"},{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"},{value:"4",label:"Option 4"},{value:"5",label:"Option 5"},{value:"6",label:"Option 6"},{value:"7",label:"Option 7"},{value:"8",label:"Option 8"}],{value:a,onChange:t}=n({initialValue:["1"]});return l.jsx(o,{disabled:!0,label:"Multi select - disabled",onChange:t,options:e,placeholder:"Empty value",type:"multi",value:a})},y=()=>{const e=[{value:null,label:"Remove selection"},{value:"1",label:"Option 1",disabled:!0},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"},{value:"4",label:"Option 4",disabled:!0},{value:"5",label:"Option 5"},{value:"6",label:"Option 6",disabled:!0},{value:"7",label:"Option 7",disabled:!0},{value:"8",label:"Option 8"}],{value:a,onChange:t}=n({initialValue:["1","2","3","4","5","6","7","8"]});return l.jsx(o,{label:"Multi select - disabled options",onChange:t,options:e,placeholder:"Empty value",type:"multi",value:a})},C=()=>{const e=[{value:null,label:"Remove selection"},{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"},{value:"4",label:"Option 4"},{value:"5",label:"Option 5"},{value:"6",label:"Option 6"},{value:"7",label:"Option 7"},{value:"8",label:"Option 8"}],{value:a,onChange:t}=n({initialValue:["1"]});return l.jsx(o,{accessory:l.jsx(i,{color:"fg",name:"star"}),label:"Multi select - custom accessory",onChange:t,options:e,placeholder:"Empty value",type:"multi",value:a})},x=()=>{const e=[{value:null,label:"Remove selection"},{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"},{value:"4",label:"Option 4"},{value:"5",label:"Option 5"},{value:"6",label:"Option 6"},{value:"7",label:"Option 7"},{value:"8",label:"Option 8"}],{value:a,onChange:t}=n({initialValue:["1"]});return l.jsx(o,{label:"Multi select - custom media",media:l.jsx(i,{color:"fg",name:"star"}),onChange:t,options:e,placeholder:"Empty value",type:"multi",value:a})},S=()=>{const e=Array.from({length:100},(s,p)=>({value:(p+1).toString(),label:`Option ${p+1}`})),{value:a,onChange:t}=n({initialValue:e.map(s=>s.value)});return l.jsx(o,{label:"Multi select - many options",onChange:t,options:e,placeholder:"Empty value",type:"multi",value:a})},f=()=>{const e=Array.from({length:100},(s,p)=>({value:(p+1).toString(),label:`Option ${p+1}`})),{value:a,onChange:t}=n({initialValue:e.map(s=>s.value)});return l.jsx(o,{label:"Multi select - custom max num of selected options to show",maxSelectedOptionsToShow:2,onChange:t,options:e,placeholder:"Empty value",type:"multi",value:a})},M=()=>{const e=Array.from({length:100},(s,p)=>({value:(p+1).toString(),label:`Option ${p+1}`})),{value:a,onChange:t}=n({initialValue:e.map(s=>s.value)});return l.jsx(o,{hiddenSelectedOptionsLabel:"custom label",label:"Multi select - custom hidden selected options label",maxSelectedOptionsToShow:2,onChange:t,options:e,placeholder:"Empty value",type:"multi",value:a})},E=()=>{const e=[{value:null,label:"Remove selection"},{value:"1",label:"Option 1",description:"Description 1"},{value:"2",label:"Option 2",description:"Description 2"},{value:"3",label:"Option 3",description:"Description 3"},{value:"4",label:"Option 4",description:"Description 4"},{value:"5",label:"Option 5",description:"Description 5"},{value:"6",label:"Option 6",description:"Description 6"},{value:"7",label:"Option 7",description:"Description 7"},{value:"8",label:"Option 8",description:"Description 8"}],{value:a,onChange:t}=n({initialValue:["1"]});return l.jsx(o,{label:"Multi select - with descriptions",onChange:t,options:e,placeholder:"Empty value",type:"multi",value:a})},V=()=>{const e=[{value:null,label:"Remove selection"},{value:"1",description:"Description 1"},{value:"2",description:"Description 2"},{value:"3",description:"Description 3"},{value:"4",description:"Description 4"}],{value:a,onChange:t}=n({initialValue:["1"]});return l.jsx(o,{label:"Multi select - with descriptions only",onChange:t,options:e,placeholder:"Empty value",type:"multi",value:a})},j=()=>{const e=[{value:null,label:"Remove selection"},{value:"1",label:"Option 1",accessory:l.jsx(i,{color:"fg",name:"star"}),media:l.jsx(i,{color:"fg",name:"heart"})},{value:"2",label:"Option 2",accessory:l.jsx(i,{color:"fg",name:"checkmark"}),media:l.jsx(i,{color:"fg",name:"cross"})},{value:"3",label:"Option 3",accessory:l.jsx(i,{color:"fg",name:"add"}),media:l.jsx(i,{color:"fg",name:"minus"})},{value:"4",label:"Option 4",accessory:l.jsx(i,{color:"fg",name:"caretRight"}),media:l.jsx(i,{color:"fg",name:"caretLeft"})},{value:"5",label:"Option 5",accessory:l.jsx(i,{color:"fg",name:"arrowUp"}),media:l.jsx(i,{color:"fg",name:"home"})}],{value:a,onChange:t}=n({initialValue:["1"]});return l.jsx(o,{label:"Multi select - mixed unique accessories and media",onChange:t,options:e,placeholder:"Empty value",type:"multi",value:a})},_=()=>{const e=[{value:null,label:"Remove selection"},{value:"1",label:"Option 1",accessory:l.jsx(i,{color:"fg",name:"star"}),media:l.jsx(i,{color:"fg",name:"heart"})},{value:"2",label:"Option 2",accessory:l.jsx(i,{color:"fg",name:"checkmark"}),media:l.jsx(i,{color:"fg",name:"cross"})},{value:"3",label:"Option 3",accessory:l.jsx(i,{color:"fg",name:"add"}),media:l.jsx(i,{color:"fg",name:"minus"})},{value:"4",label:"Option 4",accessory:l.jsx(i,{color:"fg",name:"caretRight"}),media:l.jsx(i,{color:"fg",name:"caretLeft"})},{value:"5",label:"Option 5",accessory:l.jsx(i,{color:"fg",name:"arrowUp"}),media:l.jsx(i,{color:"fg",name:"home"})}],{value:a,onChange:t}=n({initialValue:["1"]});return l.jsx(o,{helperText:"All multi-select features combined",label:"Multi select - all combined features",maxSelectedOptionsToShow:3,onChange:t,options:e,placeholder:"Choose options",selectAllLabel:"Select all these amazing options",startNode:l.jsx(i,{color:"fg",name:"filter"}),type:"multi",value:a,variant:"positive"})},I=()=>{const e=[{value:"1",label:""},{value:"2",label:" "},{value:"3",label:"Normal Label"},{value:"4",label:`	
`}],{value:a,onChange:t}=n({initialValue:["3"]});return l.jsx(o,{label:"Multi select - edge case empty labels",onChange:t,options:e,placeholder:"Empty value",type:"multi",value:a})},A=()=>{const e=[{value:null,label:"Remove selection"},{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"},{value:"4",label:"Option 4"},{value:"5",label:"Option 5"},{value:"6",label:"Option 6"},{value:"7",label:"Option 7"},{value:"8",label:"Option 8"}],{value:a,onChange:t}=n({initialValue:["1"]}),[s,p]=$.useState(!1);return l.jsxs("div",{children:[l.jsxs("button",{onClick:()=>p(!s),style:{marginBottom:"10px"},children:["Toggle Multi-Select: ",s?"Close":"Open"]}),l.jsx(o,{disableClickOutsideClose:!0,label:"Multi select - controlled open state",onChange:t,open:s,options:e,placeholder:"Empty value",setOpen:p,type:"multi",value:a})]})},R=()=>{const e=[{value:null,label:"Remove selection"},{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"},{value:"4",label:"Option 4"},{value:"5",label:"Option 5"},{value:"6",label:"Option 6"},{value:"7",label:"Option 7"},{value:"8",label:"Option 8"}],{value:a,onChange:t}=n({initialValue:["1"]});return l.jsx(o,{helperText:"Multi-select with positive variant",label:"Multi select - positive variant",onChange:t,options:e,placeholder:"Empty value",type:"multi",value:a,variant:"positive"})},D=()=>{const e=[{value:null,label:"Remove selection"},{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"},{value:"4",label:"Option 4"},{value:"5",label:"Option 5"},{value:"6",label:"Option 6"},{value:"7",label:"Option 7"},{value:"8",label:"Option 8"}],{value:a,onChange:t}=n({initialValue:["1"]});return l.jsx(o,{helperText:"Multi-select with negative variant",label:"Multi select - negative variant",onChange:t,options:e,placeholder:"Empty value",type:"multi",value:a,variant:"negative"})},N=()=>{const e=[{value:null,label:"Remove selection"},{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"},{value:"4",label:"Option 4"},{value:"5",label:"Option 5"},{value:"6",label:"Option 6"},{value:"7",label:"Option 7"},{value:"8",label:"Option 8"}],{value:a,onChange:t}=n({initialValue:["1"]});return l.jsx(o,{label:"Multi select - with start node",onChange:t,options:e,placeholder:"Empty value",startNode:l.jsx(i,{color:"fg",name:"filter"}),type:"multi",value:a})},k=()=>{const{value:e,onChange:a}=n({initialValue:[]});return l.jsx(o,{label:"Multi select - empty options",onChange:a,options:[],placeholder:"Empty value",type:"multi",value:e})},L=()=>{const e=[{value:null,label:"Remove selection"},{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"},{value:"4",label:"Option 4"},{value:"5",label:"Option 5"},{value:"6",label:"Option 6"},{value:"7",label:"Option 7"},{value:"8",label:"Option 8"}],{value:a,onChange:t}=n({initialValue:["1","2"]});return l.jsx(o,{classNames:{control:z,dropdown:X},label:"Multi select - complex styles",onChange:t,options:e,placeholder:"Empty value",styles:{control:{backgroundColor:"lightblue",border:"2px solid navy"},dropdown:{backgroundColor:"lightyellow",border:"1px solid gold"},optionBlendStyles:{background:"lightcyan",hoveredBackground:"cyan"}},type:"multi",value:a})};u.__docgenInfo={description:"",methods:[],displayName:"Default"};c.__docgenInfo={description:"",methods:[],displayName:"Compact"};r.__docgenInfo={description:"",methods:[],displayName:"InsideLabelVariant"};m.__docgenInfo={description:"",methods:[],displayName:"CompactManySelected"};v.__docgenInfo={description:"",methods:[],displayName:"HideSelectAll"};b.__docgenInfo={description:"",methods:[],displayName:"Alignments"};d.__docgenInfo={description:"",methods:[],displayName:"CustomSelectAllLabel"};O.__docgenInfo={description:"",methods:[],displayName:"CustomClearAllLabel"};g.__docgenInfo={description:"",methods:[],displayName:"CustomSelectAllOption"};h.__docgenInfo={description:"",methods:[],displayName:"Disabled"};y.__docgenInfo={description:"",methods:[],displayName:"DisabledOptions"};C.__docgenInfo={description:"",methods:[],displayName:"CustomAccessory"};x.__docgenInfo={description:"",methods:[],displayName:"CustomMedia"};S.__docgenInfo={description:"",methods:[],displayName:"ManyOptions"};f.__docgenInfo={description:"",methods:[],displayName:"MaxSelectedOptions"};M.__docgenInfo={description:"",methods:[],displayName:"CustomHiddenSelectedOptionsLabel"};E.__docgenInfo={description:"",methods:[],displayName:"Descriptions"};V.__docgenInfo={description:"",methods:[],displayName:"DescriptionsOnly"};j.__docgenInfo={description:"",methods:[],displayName:"MixedAccessoriesMedia"};_.__docgenInfo={description:"",methods:[],displayName:"AllCombinedFeatures"};I.__docgenInfo={description:"",methods:[],displayName:"EdgeCaseEmptyLabels"};A.__docgenInfo={description:"",methods:[],displayName:"ControlledOpen"};R.__docgenInfo={description:"",methods:[],displayName:"PositiveVariant"};D.__docgenInfo={description:"",methods:[],displayName:"NegativeVariant"};N.__docgenInfo={description:"",methods:[],displayName:"StartNode"};k.__docgenInfo={description:"",methods:[],displayName:"EmptyOptions"};L.__docgenInfo={description:"",methods:[],displayName:"ComplexStyles"};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions = [{
    value: null,
    label: 'Remove selection'
  }, {
    value: '1',
    label: 'Option 1'
  }, {
    value: '2',
    label: 'Option 2'
  }, {
    value: '3',
    label: 'Option 3'
  }, {
    value: '4',
    label: 'Option 4'
  }, {
    value: '5',
    label: 'Option 5'
  }, {
    value: '6',
    label: 'Option 6'
  }, {
    value: '7',
    label: 'Option 7'
  }, {
    value: '8',
    label: 'Option 8'
  }];
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: ['1', '2']
  });
  return <Select controlAccessibilityLabel="Multi select control with selected options" label="Multi select" onChange={onChange} options={exampleOptions} placeholder="Empty value" type="multi" value={value} />;
}`,...u.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions = [{
    value: null,
    label: 'Remove selection'
  }, {
    value: '1',
    label: 'Option 1'
  }, {
    value: '2',
    label: 'Option 2'
  }, {
    value: '3',
    label: 'Option 3'
  }, {
    value: '4',
    label: 'Option 4'
  }, {
    value: '5',
    label: 'Option 5'
  }, {
    value: '6',
    label: 'Option 6'
  }, {
    value: '7',
    label: 'Option 7'
  }, {
    value: '8',
    label: 'Option 8'
  }];
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: ['1', '2']
  });
  return <Select compact label="Multi select - compact" onChange={onChange} options={exampleOptions} placeholder="Empty value" type="multi" value={value} />;
}`,...c.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions = [{
    value: null,
    label: 'Remove selection'
  }, {
    value: '1',
    label: 'Option 1'
  }, {
    value: '2',
    label: 'Option 2'
  }, {
    value: '3',
    label: 'Option 3'
  }, {
    value: '4',
    label: 'Option 4'
  }];
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: ['1', '2', '3', '4']
  });
  return <Select label="Multi select - inside label variant" labelVariant="inside" onChange={onChange} options={exampleOptions} placeholder="Empty value" type="multi" value={value} />;
}`,...r.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions = [{
    value: null,
    label: 'Remove selection'
  }, {
    value: '1',
    label: 'Option 1'
  }, {
    value: '2',
    label: 'Option 2'
  }, {
    value: '3',
    label: 'Option 3'
  }, {
    value: '4',
    label: 'Option 4'
  }, {
    value: '5',
    label: 'Option 5'
  }, {
    value: '6',
    label: 'Option 6'
  }, {
    value: '7',
    label: 'Option 7'
  }, {
    value: '8',
    label: 'Option 8'
  }, {
    value: '9',
    label: 'Option 9'
  }, {
    value: '10',
    label: 'Option 10'
  }];
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: ['1', '3', '7', '8', '9', '10']
  });
  return <Select compact label="Multi select - compact with many selected" onChange={onChange} options={exampleOptions} placeholder="Empty value" type="multi" value={value} />;
}`,...m.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions = [{
    value: null,
    label: 'Remove selection'
  }, {
    value: '1',
    label: 'Option 1'
  }, {
    value: '2',
    label: 'Option 2'
  }, {
    value: '3',
    label: 'Option 3'
  }, {
    value: '4',
    label: 'Option 4'
  }, {
    value: '5',
    label: 'Option 5'
  }, {
    value: '6',
    label: 'Option 6'
  }, {
    value: '7',
    label: 'Option 7'
  }, {
    value: '8',
    label: 'Option 8'
  }];
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: ['1']
  });
  return <Select hideSelectAll label="Multi select - hide select all" onChange={onChange} options={exampleOptions} placeholder="Empty value" type="multi" value={value} />;
}`,...v.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions = [{
    value: null,
    label: 'Remove selection'
  }, {
    value: '1',
    label: 'Option 1'
  }, {
    value: '2',
    label: 'Option 2'
  }, {
    value: '3',
    label: 'Option 3'
  }, {
    value: '4',
    label: 'Option 4'
  }, {
    value: '5',
    label: 'Option 5'
  }, {
    value: '6',
    label: 'Option 6'
  }, {
    value: '7',
    label: 'Option 7'
  }, {
    value: '8',
    label: 'Option 8'
  }];
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: ['1']
  });
  return <VStack gap={2}>
      <Select label="Default align - start" onChange={onChange} options={exampleOptions} placeholder="Empty value" type="multi" value={value} />
      <Select align="center" label="Center align" onChange={onChange} options={exampleOptions} placeholder="Empty value" type="multi" value={value} />
      <Select align="end" label="End align" onChange={onChange} options={exampleOptions} placeholder="Empty value" type="multi" value={value} />
      <Select compact label="Compact align - start" onChange={onChange} options={exampleOptions} placeholder="Empty value" type="multi" value={value} />
      <Select compact align="center" label="Compact align - center" onChange={onChange} options={exampleOptions} placeholder="Empty value" type="multi" value={value} />
      <Select compact align="end" label="Compact align - end" onChange={onChange} options={exampleOptions} placeholder="Empty value" type="multi" value={value} />
    </VStack>;
}`,...b.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions = [{
    value: null,
    label: 'Remove selection'
  }, {
    value: '1',
    label: 'Option 1'
  }, {
    value: '2',
    label: 'Option 2'
  }, {
    value: '3',
    label: 'Option 3'
  }, {
    value: '4',
    label: 'Option 4'
  }, {
    value: '5',
    label: 'Option 5'
  }, {
    value: '6',
    label: 'Option 6'
  }, {
    value: '7',
    label: 'Option 7'
  }, {
    value: '8',
    label: 'Option 8'
  }];
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: ['1']
  });
  return <Select label="Multi select - custom select all label" onChange={onChange} options={exampleOptions} placeholder="Empty value" selectAllLabel="~Custom!~ Select every single option here" type="multi" value={value} />;
}`,...d.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`() => {
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: ['1']
  });
  const exampleOptions = [{
    value: null,
    label: 'Remove selection'
  }, {
    value: '1',
    label: 'Option 1'
  }, {
    value: '2',
    label: 'Option 2'
  }, {
    value: '3',
    label: 'Option 3'
  }, {
    value: '4',
    label: 'Option 4'
  }, {
    value: '5',
    label: 'Option 5'
  }, {
    value: '6',
    label: 'Option 6'
  }, {
    value: '7',
    label: 'Option 7'
  }, {
    value: '8',
    label: 'Option 8'
  }];
  return <Select clearAllLabel="Custom Clear All Label" label="Multi select - custom clear all label" onChange={onChange} options={exampleOptions} placeholder="Empty value" type="multi" value={value} />;
}`,...O.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions = [{
    value: null,
    label: 'Remove selection'
  }, {
    value: '1',
    label: 'Option 1'
  }, {
    value: '2',
    label: 'Option 2'
  }, {
    value: '3',
    label: 'Option 3'
  }, {
    value: '4',
    label: 'Option 4'
  }, {
    value: '5',
    label: 'Option 5'
  }, {
    value: '6',
    label: 'Option 6'
  }, {
    value: '7',
    label: 'Option 7'
  }, {
    value: '8',
    label: 'Option 8'
  }];
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: ['1']
  });
  const CustomSelectAllOption: SelectOptionComponent<'multi'> = ({
    onClick,
    selected,
    disabled,
    label,
    blendStyles,
    className,
    style
  }) => {
    return <Pressable noScaleOnPress background={selected ? 'bgSecondary' : 'bg'} blendStyles={blendStyles} className={className} disabled={disabled} onClick={() => onClick?.('select-all')} paddingX={2} paddingY={3} style={style}>
        <Text color={selected ? 'fgPrimary' : 'fg'} font="headline">
          {label || 'Custom Select All Option'}
        </Text>
      </Pressable>;
  };
  return <Select SelectAllOptionComponent={CustomSelectAllOption} label="Multi select - custom select all option" onChange={onChange} options={exampleOptions} placeholder="Empty value" type="multi" value={value} />;
}`,...g.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions = [{
    value: null,
    label: 'Remove selection'
  }, {
    value: '1',
    label: 'Option 1'
  }, {
    value: '2',
    label: 'Option 2'
  }, {
    value: '3',
    label: 'Option 3'
  }, {
    value: '4',
    label: 'Option 4'
  }, {
    value: '5',
    label: 'Option 5'
  }, {
    value: '6',
    label: 'Option 6'
  }, {
    value: '7',
    label: 'Option 7'
  }, {
    value: '8',
    label: 'Option 8'
  }];
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: ['1']
  });
  return <Select disabled label="Multi select - disabled" onChange={onChange} options={exampleOptions} placeholder="Empty value" type="multi" value={value} />;
}`,...h.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions = [{
    value: null,
    label: 'Remove selection'
  }, {
    value: '1',
    label: 'Option 1',
    disabled: true
  }, {
    value: '2',
    label: 'Option 2'
  }, {
    value: '3',
    label: 'Option 3'
  }, {
    value: '4',
    label: 'Option 4',
    disabled: true
  }, {
    value: '5',
    label: 'Option 5'
  }, {
    value: '6',
    label: 'Option 6',
    disabled: true
  }, {
    value: '7',
    label: 'Option 7',
    disabled: true
  }, {
    value: '8',
    label: 'Option 8'
  }];
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: ['1', '2', '3', '4', '5', '6', '7', '8']
  });
  return <Select label="Multi select - disabled options" onChange={onChange} options={exampleOptions} placeholder="Empty value" type="multi" value={value} />;
}`,...y.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions = [{
    value: null,
    label: 'Remove selection'
  }, {
    value: '1',
    label: 'Option 1'
  }, {
    value: '2',
    label: 'Option 2'
  }, {
    value: '3',
    label: 'Option 3'
  }, {
    value: '4',
    label: 'Option 4'
  }, {
    value: '5',
    label: 'Option 5'
  }, {
    value: '6',
    label: 'Option 6'
  }, {
    value: '7',
    label: 'Option 7'
  }, {
    value: '8',
    label: 'Option 8'
  }];
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: ['1']
  });
  return <Select accessory={<Icon color="fg" name="star" />} label="Multi select - custom accessory" onChange={onChange} options={exampleOptions} placeholder="Empty value" type="multi" value={value} />;
}`,...C.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions = [{
    value: null,
    label: 'Remove selection'
  }, {
    value: '1',
    label: 'Option 1'
  }, {
    value: '2',
    label: 'Option 2'
  }, {
    value: '3',
    label: 'Option 3'
  }, {
    value: '4',
    label: 'Option 4'
  }, {
    value: '5',
    label: 'Option 5'
  }, {
    value: '6',
    label: 'Option 6'
  }, {
    value: '7',
    label: 'Option 7'
  }, {
    value: '8',
    label: 'Option 8'
  }];
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: ['1']
  });
  return <Select label="Multi select - custom media" media={<Icon color="fg" name="star" />} onChange={onChange} options={exampleOptions} placeholder="Empty value" type="multi" value={value} />;
}`,...x.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => {
  const manyExampleOptions = Array.from({
    length: 100
  }, (_, i) => ({
    value: (i + 1).toString(),
    label: \`Option \${i + 1}\`
  }));
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: manyExampleOptions.map(option => option.value)
  });
  return <Select label="Multi select - many options" onChange={onChange} options={manyExampleOptions} placeholder="Empty value" type="multi" value={value} />;
}`,...S.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`() => {
  const manyExampleOptions = Array.from({
    length: 100
  }, (_, i) => ({
    value: (i + 1).toString(),
    label: \`Option \${i + 1}\`
  }));
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: manyExampleOptions.map(option => option.value)
  });
  return <Select label="Multi select - custom max num of selected options to show" maxSelectedOptionsToShow={2} onChange={onChange} options={manyExampleOptions} placeholder="Empty value" type="multi" value={value} />;
}`,...f.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`() => {
  const manyExampleOptions = Array.from({
    length: 100
  }, (_, i) => ({
    value: (i + 1).toString(),
    label: \`Option \${i + 1}\`
  }));
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: manyExampleOptions.map(option => option.value)
  });
  return <Select hiddenSelectedOptionsLabel="custom label" label="Multi select - custom hidden selected options label" maxSelectedOptionsToShow={2} onChange={onChange} options={manyExampleOptions} placeholder="Empty value" type="multi" value={value} />;
}`,...M.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`() => {
  const exampleOptionsWithDescription = [{
    value: null,
    label: 'Remove selection'
  }, {
    value: '1',
    label: 'Option 1',
    description: 'Description 1'
  }, {
    value: '2',
    label: 'Option 2',
    description: 'Description 2'
  }, {
    value: '3',
    label: 'Option 3',
    description: 'Description 3'
  }, {
    value: '4',
    label: 'Option 4',
    description: 'Description 4'
  }, {
    value: '5',
    label: 'Option 5',
    description: 'Description 5'
  }, {
    value: '6',
    label: 'Option 6',
    description: 'Description 6'
  }, {
    value: '7',
    label: 'Option 7',
    description: 'Description 7'
  }, {
    value: '8',
    label: 'Option 8',
    description: 'Description 8'
  }];
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: ['1']
  });
  return <Select label="Multi select - with descriptions" onChange={onChange} options={exampleOptionsWithDescription} placeholder="Empty value" type="multi" value={value} />;
}`,...E.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`() => {
  const exampleOptionsWithOnlyDescription = [{
    value: null,
    label: 'Remove selection'
  }, {
    value: '1',
    description: 'Description 1'
  }, {
    value: '2',
    description: 'Description 2'
  }, {
    value: '3',
    description: 'Description 3'
  }, {
    value: '4',
    description: 'Description 4'
  }];
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: ['1']
  });
  return <Select label="Multi select - with descriptions only" onChange={onChange} options={exampleOptionsWithOnlyDescription} placeholder="Empty value" type="multi" value={value} />;
}`,...V.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions = [{
    value: null,
    label: 'Remove selection'
  }, {
    value: '1',
    label: 'Option 1',
    accessory: <Icon color="fg" name="star" />,
    media: <Icon color="fg" name="heart" />
  }, {
    value: '2',
    label: 'Option 2',
    accessory: <Icon color="fg" name="checkmark" />,
    media: <Icon color="fg" name="cross" />
  }, {
    value: '3',
    label: 'Option 3',
    accessory: <Icon color="fg" name="add" />,
    media: <Icon color="fg" name="minus" />
  }, {
    value: '4',
    label: 'Option 4',
    accessory: <Icon color="fg" name="caretRight" />,
    media: <Icon color="fg" name="caretLeft" />
  }, {
    value: '5',
    label: 'Option 5',
    accessory: <Icon color="fg" name="arrowUp" />,
    media: <Icon color="fg" name="home" />
  }];
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: ['1']
  });
  return <Select label="Multi select - mixed unique accessories and media" onChange={onChange} options={exampleOptions} placeholder="Empty value" type="multi" value={value} />;
}`,...j.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions = [{
    value: null,
    label: 'Remove selection'
  }, {
    value: '1',
    label: 'Option 1',
    accessory: <Icon color="fg" name="star" />,
    media: <Icon color="fg" name="heart" />
  }, {
    value: '2',
    label: 'Option 2',
    accessory: <Icon color="fg" name="checkmark" />,
    media: <Icon color="fg" name="cross" />
  }, {
    value: '3',
    label: 'Option 3',
    accessory: <Icon color="fg" name="add" />,
    media: <Icon color="fg" name="minus" />
  }, {
    value: '4',
    label: 'Option 4',
    accessory: <Icon color="fg" name="caretRight" />,
    media: <Icon color="fg" name="caretLeft" />
  }, {
    value: '5',
    label: 'Option 5',
    accessory: <Icon color="fg" name="arrowUp" />,
    media: <Icon color="fg" name="home" />
  }];
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: ['1']
  });
  return <Select helperText="All multi-select features combined" label="Multi select - all combined features" maxSelectedOptionsToShow={3} onChange={onChange} options={exampleOptions} placeholder="Choose options" selectAllLabel="Select all these amazing options" startNode={<Icon color="fg" name="filter" />} type="multi" value={value} variant="positive" />;
}`,..._.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`() => {
  const edgeOptions = [{
    value: '1',
    label: ''
  }, {
    value: '2',
    label: ' '
  }, {
    value: '3',
    label: 'Normal Label'
  }, {
    value: '4',
    label: '\\t\\n'
  }];
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: ['3']
  });
  return <Select label="Multi select - edge case empty labels" onChange={onChange} options={edgeOptions} placeholder="Empty value" type="multi" value={value} />;
}`,...I.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions = [{
    value: null,
    label: 'Remove selection'
  }, {
    value: '1',
    label: 'Option 1'
  }, {
    value: '2',
    label: 'Option 2'
  }, {
    value: '3',
    label: 'Option 3'
  }, {
    value: '4',
    label: 'Option 4'
  }, {
    value: '5',
    label: 'Option 5'
  }, {
    value: '6',
    label: 'Option 6'
  }, {
    value: '7',
    label: 'Option 7'
  }, {
    value: '8',
    label: 'Option 8'
  }];
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: ['1']
  });
  const [open, setOpen] = useState(false);
  return <div>
      <button onClick={() => setOpen(!open)} style={{
      marginBottom: '10px'
    }}>
        Toggle Multi-Select: {open ? 'Close' : 'Open'}
      </button>
      <Select disableClickOutsideClose label="Multi select - controlled open state" onChange={onChange} open={open} options={exampleOptions} placeholder="Empty value" setOpen={setOpen} type="multi" value={value} />
    </div>;
}`,...A.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions = [{
    value: null,
    label: 'Remove selection'
  }, {
    value: '1',
    label: 'Option 1'
  }, {
    value: '2',
    label: 'Option 2'
  }, {
    value: '3',
    label: 'Option 3'
  }, {
    value: '4',
    label: 'Option 4'
  }, {
    value: '5',
    label: 'Option 5'
  }, {
    value: '6',
    label: 'Option 6'
  }, {
    value: '7',
    label: 'Option 7'
  }, {
    value: '8',
    label: 'Option 8'
  }];
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: ['1']
  });
  return <Select helperText="Multi-select with positive variant" label="Multi select - positive variant" onChange={onChange} options={exampleOptions} placeholder="Empty value" type="multi" value={value} variant="positive" />;
}`,...R.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions = [{
    value: null,
    label: 'Remove selection'
  }, {
    value: '1',
    label: 'Option 1'
  }, {
    value: '2',
    label: 'Option 2'
  }, {
    value: '3',
    label: 'Option 3'
  }, {
    value: '4',
    label: 'Option 4'
  }, {
    value: '5',
    label: 'Option 5'
  }, {
    value: '6',
    label: 'Option 6'
  }, {
    value: '7',
    label: 'Option 7'
  }, {
    value: '8',
    label: 'Option 8'
  }];
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: ['1']
  });
  return <Select helperText="Multi-select with negative variant" label="Multi select - negative variant" onChange={onChange} options={exampleOptions} placeholder="Empty value" type="multi" value={value} variant="negative" />;
}`,...D.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions = [{
    value: null,
    label: 'Remove selection'
  }, {
    value: '1',
    label: 'Option 1'
  }, {
    value: '2',
    label: 'Option 2'
  }, {
    value: '3',
    label: 'Option 3'
  }, {
    value: '4',
    label: 'Option 4'
  }, {
    value: '5',
    label: 'Option 5'
  }, {
    value: '6',
    label: 'Option 6'
  }, {
    value: '7',
    label: 'Option 7'
  }, {
    value: '8',
    label: 'Option 8'
  }];
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: ['1']
  });
  return <Select label="Multi select - with start node" onChange={onChange} options={exampleOptions} placeholder="Empty value" startNode={<Icon color="fg" name="filter" />} type="multi" value={value} />;
}`,...N.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`() => {
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: []
  });
  return <Select label="Multi select - empty options" onChange={onChange} options={[]} placeholder="Empty value" type="multi" value={value} />;
}`,...k.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions = [{
    value: null,
    label: 'Remove selection'
  }, {
    value: '1',
    label: 'Option 1'
  }, {
    value: '2',
    label: 'Option 2'
  }, {
    value: '3',
    label: 'Option 3'
  }, {
    value: '4',
    label: 'Option 4'
  }, {
    value: '5',
    label: 'Option 5'
  }, {
    value: '6',
    label: 'Option 6'
  }, {
    value: '7',
    label: 'Option 7'
  }, {
    value: '8',
    label: 'Option 8'
  }];
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: ['1', '2']
  });
  return <Select classNames={{
    control: paddingCss,
    dropdown: hoveredBackgroundCss
  }} label="Multi select - complex styles" onChange={onChange} options={exampleOptions} placeholder="Empty value" styles={{
    control: {
      backgroundColor: 'lightblue',
      border: '2px solid navy'
    },
    dropdown: {
      backgroundColor: 'lightyellow',
      border: '1px solid gold'
    },
    optionBlendStyles: {
      background: 'lightcyan',
      hoveredBackground: 'cyan'
    }
  }} type="multi" value={value} />;
}`,...L.parameters?.docs?.source}}};const qe=["Default","Compact","InsideLabelVariant","CompactManySelected","HideSelectAll","Alignments","CustomSelectAllLabel","CustomClearAllLabel","CustomSelectAllOption","Disabled","DisabledOptions","CustomAccessory","CustomMedia","ManyOptions","MaxSelectedOptions","CustomHiddenSelectedOptionsLabel","Descriptions","DescriptionsOnly","MixedAccessoriesMedia","AllCombinedFeatures","EdgeCaseEmptyLabels","ControlledOpen","PositiveVariant","NegativeVariant","StartNode","EmptyOptions","ComplexStyles"];export{b as Alignments,_ as AllCombinedFeatures,c as Compact,m as CompactManySelected,L as ComplexStyles,A as ControlledOpen,C as CustomAccessory,O as CustomClearAllLabel,M as CustomHiddenSelectedOptionsLabel,x as CustomMedia,d as CustomSelectAllLabel,g as CustomSelectAllOption,u as Default,E as Descriptions,V as DescriptionsOnly,h as Disabled,y as DisabledOptions,I as EdgeCaseEmptyLabels,k as EmptyOptions,v as HideSelectAll,r as InsideLabelVariant,S as ManyOptions,f as MaxSelectedOptions,j as MixedAccessoriesMedia,D as NegativeVariant,R as PositiveVariant,N as StartNode,qe as __namedExportsOrder,$e as default};
