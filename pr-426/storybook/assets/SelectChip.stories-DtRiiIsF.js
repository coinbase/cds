import{r as o,j as a}from"./iframe-CsG_6vZR.js";import{a as i}from"./assets-CEwpm_uP.js";import{i as ie,S as se,u as T}from"./DefaultSelectControl-BP1TAGHu.js";import{V as E}from"./VStack-Cg_Yq2u4.js";import{R as H}from"./RemoteImage-CCsStlyO.js";import{R as re}from"./RemoteImageGroup--wdF0WL6.js";import{A as pe}from"./AnimatedCaret-BYj5sDun.js";import{M as ue}from"./MediaChip-WBZG74Sv.js";import"./preload-helper-D9Z9MdNV.js";import"./floating-ui.react-dom-BsLoz2NL.js";import"./Portal-BaLq4aAx.js";import"./useTheme-CmrOhAty.js";import"./Divider-DKMVovzU.js";import"./select-Em8pkxbY.js";import"./Cell-Z4wq8KY-.js";import"./useCellSpacing-BeT6oDTo.js";import"./sizing-Do56D2dQ.js";import"./HStack-DaDYipoP.js";import"./Pressable-DDN99tmF.js";import"./isArray-M0ytM-vC.js";import"./Interactable--rqISG90.js";import"./color-Ceo1QMNe.js";import"./Text-B1CpMNU3.js";import"./InputChip-D9V6n8U6.js";import"./Icon-DTs0crZh.js";import"./HelperText-W0U74shX.js";import"./InputLabel-CdlU6JsR.js";import"./InputStack-BFRjE954.js";import"./tokens-BwScSksM.js";import"./ColorSurge-2yE2z4Kr.js";import"./useMotionProps-BXBckQBf.js";import"./utils-y2S18Lx0.js";import"./use-animation-DHwoMYVB.js";import"./motion-minimal-5s2ikV7b.js";import"./Checkbox-Cy7nVg7g.js";import"./checkbox-DVjU0upZ.js";import"./Control-DrPBFTYm.js";import"./useMergeRefs-DR4sGa7m.js";import"./usePrefixedId-BL1THI0P.js";import"./isRtl-C5Fon8jH.js";import"./Radio-B-fvGGci.js";import"./FocusTrap-C5pHOjrH.js";import"./debounce-fynzmAtJ.js";import"./index-CpZJTW5x.js";import"./use-unmount-effect-DmgCrakR.js";import"./Button-D2WSek5T.js";import"./Spinner-C8x8bhOH.js";import"./collapsible-BAneA-61.js";import"./context-fDezSldV.js";import"./index-BqvvFL-B.js";import"./Chip-BJKnv_em.js";const F=o.memo(o.forwardRef(({type:l,options:e,value:t,placeholder:s,setOpen:r,startNode:c,endNode:m,open:j,accessibilityLabel:$,ariaHaspopup:z="listbox",className:J,style:K,maxSelectedOptionsToShow:D=2,hiddenSelectedOptionsLabel:U="more",label:B,compact:Q,invertColorScheme:X,numberOfLines:Y,disabled:Z,maxWidth:ee,displayValue:M},te)=>{const P=l==="multi",d=t!==null&&!(Array.isArray(t)&&t.length===0),W=o.useMemo(()=>{const p=new Map;return e.forEach((b,G)=>{if(ie(b))b.options.forEach((u,h)=>{if(u.value!==null){const A=u.value;p.has(A)||p.set(A,u)}});else{const u=b;if(u.value!==null){const h=u.value;p.has(h)||p.set(h,u)}}}),p},[e]),le=o.useMemo(()=>{if(!d)return B??s??null;if(M)return M;if(P){const b=t,G=b.slice(0,D),u=G.map(A=>{const _=W.get(A);return _?.label??_?.description??_?.value??""}).filter(Boolean),h=b.length-G.length;return h>0?`${u.join(", ")} +${h} ${U}`:u.join(", ")}const p=W.get(t);return p?.label??p?.description??p?.value??s??null},[d,B,s,M,P,W,t,D,U]),ae=o.useMemo(()=>m??a.jsx(pe,{active:!0,color:d?"fgInverse":"fg",rotate:j?0:180,size:"xs"}),[m,d,j]),oe=o.useMemo(()=>d?"fgInverse":"fg",[d]),ne=o.useMemo(()=>d?"bgInverse":"bgSecondary",[d]);return a.jsx(ue,{ref:te,noScaleOnPress:!0,accessibilityLabel:$,"aria-haspopup":z,background:ne,className:J,color:oe,compact:Q,disabled:Z,end:ae,invertColorScheme:X,maxWidth:ee,numberOfLines:Y,onClick:()=>r(p=>!p),start:c,style:K,children:le})})),ce=F;F.__docgenInfo={description:"",methods:[],displayName:"SelectChipControlComponent",props:{value:{required:!0,tsType:{name:"unknown"},description:""},onChange:{required:!0,tsType:{name:"signature",type:"function",raw:`(
  value: Type extends 'multi'
    ? SelectOptionValue | SelectOptionValue[] | null
    : SelectOptionValue | null,
) => void`,signature:{arguments:[{type:{name:"unknown"},name:"value"}],return:{name:"void"}}},description:""},align:{required:!1,tsType:{name:"union",raw:"'start' | 'center' | 'end'",elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'center'"},{name:"literal",value:"'end'"}]},description:`Alignment of the value node.
@default 'start'`},bordered:{required:!1,tsType:{name:"boolean"},description:`Determines if the control should have a default border.
@note focusedBorderWidth on the control still shows a border when focused by default.
@default true`},borderWidth:{required:!1,tsType:{name:"intersection['borderWidth']",raw:"InputStackBaseProps['borderWidth']"},description:`Width of the border.
@default 100 when bordered is true, 0 otherwise`},focusedBorderWidth:{required:!1,tsType:{name:"intersection['focusedBorderWidth']",raw:"InputStackBaseProps['focusedBorderWidth']"},description:`Additional border width when focused.
@default 200 when bordered is false, undefined otherwise`},options:{required:!0,tsType:{name:"Array",elements:[{name:"unknown"}],raw:`(
  | (SelectOption<SelectOptionValue> & SelectOptionCustomUI<Type, SelectOptionValue>)
  | (SelectOptionGroup<Type, SelectOptionValue> &
      SelectOptionGroupCustomUI<Type, SelectOptionValue>)
)[]`},description:"Array of options to display in the select dropdown. Can be individual options or groups with `label` and `options`"},label:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Label displayed above the control"},placeholder:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Placeholder text displayed when no option is selected"},helperText:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Helper text displayed below the select"},contentNode:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Content node displayed below the selected values"},type:{required:!1,tsType:{name:"Type"},description:"Whether this is for single or multi-select"},open:{required:!0,tsType:{name:"boolean"},description:"Whether the dropdown is currently open"},setOpen:{required:!0,tsType:{name:"signature",type:"function",raw:"(open: boolean | ((open: boolean) => boolean)) => void",signature:{arguments:[{type:{name:"union",raw:"boolean | ((open: boolean) => boolean)",elements:[{name:"boolean"},{name:"unknown"}]},name:"open"}],return:{name:"void"}}},description:"Function to update the dropdown open state"},maxSelectedOptionsToShow:{required:!1,tsType:{name:"number"},description:"Maximum number of selected options to show before truncating",defaultValue:{value:"2",computed:!1}},hiddenSelectedOptionsLabel:{required:!1,tsType:{name:"string"},description:"Label to show for showcasing count of hidden selected options",defaultValue:{value:"'more'",computed:!1}},removeSelectedOptionAccessibilityLabel:{required:!1,tsType:{name:"string"},description:"Accessibility label for each chip in a multi-select"},blendStyles:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  background?: string;
  pressedBackground?: string;
  disabledBackground?: string;
  hoveredBackground?: string;
  borderColor?: string;
  pressedBorderColor?: string;
  disabledBorderColor?: string;
  hoveredBorderColor?: string;
  /**
   * The opacity of the element when hovered.
   * @default 0.88
   */
  hoveredOpacity?: number;
  /**
   * The opacity of the element when pressed.
   * @default 0.82
   */
  pressedOpacity?: number;
  /**
   * The opacity of the element when disabled.
   * @default 0.75
   */
  disabledOpacity?: number;
}`,signature:{properties:[{key:"background",value:{name:"string",required:!1}},{key:"pressedBackground",value:{name:"string",required:!1}},{key:"disabledBackground",value:{name:"string",required:!1}},{key:"hoveredBackground",value:{name:"string",required:!1}},{key:"borderColor",value:{name:"string",required:!1}},{key:"pressedBorderColor",value:{name:"string",required:!1}},{key:"disabledBorderColor",value:{name:"string",required:!1}},{key:"hoveredBorderColor",value:{name:"string",required:!1}},{key:"hoveredOpacity",value:{name:"number",required:!1},description:`The opacity of the element when hovered.
@default 0.88`},{key:"pressedOpacity",value:{name:"number",required:!1},description:`The opacity of the element when pressed.
@default 0.82`},{key:"disabledOpacity",value:{name:"number",required:!1},description:`The opacity of the element when disabled.
@default 0.75`}]}},description:"Blend styles for control interactivity"},ariaHaspopup:{required:!1,tsType:{name:"union",raw:"'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog'",elements:[{name:"literal",value:"'false'"},{name:"literal",value:"'true'"},{name:"literal",value:"'menu'"},{name:"literal",value:"'listbox'"},{name:"literal",value:"'tree'"},{name:"literal",value:"'grid'"},{name:"literal",value:"'dialog'"}]},description:"ARIA haspopup attribute value",defaultValue:{value:"'listbox'",computed:!1}},compact:{required:!1,tsType:{name:"boolean"},description:"Whether to use compact styling for the control"},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:"Inline styles for the control element"},styles:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /** Start node element */
  controlStartNode?: React.CSSProperties;
  /** Input node element */
  controlInputNode?: React.CSSProperties;
  /** Value node element */
  controlValueNode?: React.CSSProperties;
  /** Label node element */
  controlLabelNode?: React.CSSProperties;
  /** Helper text node element */
  controlHelperTextNode?: React.CSSProperties;
  /** End node element */
  controlEndNode?: React.CSSProperties;
}`,signature:{properties:[{key:"controlStartNode",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Start node element"},{key:"controlInputNode",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Input node element"},{key:"controlValueNode",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Value node element"},{key:"controlLabelNode",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Label node element"},{key:"controlHelperTextNode",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Helper text node element"},{key:"controlEndNode",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"End node element"}]}},description:"Custom styles for individual elements of the control"},className:{required:!1,tsType:{name:"string"},description:"CSS class name for the control"},classNames:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /** Start node element */
  controlStartNode?: string;
  /** Input node element */
  controlInputNode?: string;
  /** Value node element */
  controlValueNode?: string;
  /** Label node element */
  controlLabelNode?: string;
  /** Helper text node element */
  controlHelperTextNode?: string;
  /** End node element */
  controlEndNode?: string;
}`,signature:{properties:[{key:"controlStartNode",value:{name:"string",required:!1},description:"Start node element"},{key:"controlInputNode",value:{name:"string",required:!1},description:"Input node element"},{key:"controlValueNode",value:{name:"string",required:!1},description:"Value node element"},{key:"controlLabelNode",value:{name:"string",required:!1},description:"Label node element"},{key:"controlHelperTextNode",value:{name:"string",required:!1},description:"Helper text node element"},{key:"controlEndNode",value:{name:"string",required:!1},description:"End node element"}]}},description:"Custom class names for individual elements of the control"},displayValue:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:`Override the displayed value in the chip control.
Useful for avoiding truncation, especially in multi-select scenarios where multiple option labels might be too long to display.
When provided, this value takes precedence over the default label generation.`}}};function de({invertColorScheme:l,numberOfLines:e,maxWidth:t,displayValue:s}){return o.memo(o.forwardRef((r,c)=>a.jsx(ce,{...r,ref:c,displayValue:s,invertColorScheme:l,maxWidth:t,numberOfLines:e})))}const L=o.memo(o.forwardRef(({invertColorScheme:l,numberOfLines:e,maxWidth:t,displayValue:s,...r},c)=>{const m=o.useMemo(()=>de({invertColorScheme:l,numberOfLines:e,maxWidth:t,displayValue:s}),[s,l,e,t]);return a.jsx(se,{ref:c,SelectControlComponent:m,styles:{dropdown:{width:"max-content"},...r.styles},...r})}));L.displayName="SelectChip";const n=L;L.__docgenInfo={description:"Chip-styled Select control built on top of the Alpha Select.\nSupports both single and multi selection via Select's `type` prop.",methods:[],displayName:"SelectChip",props:{displayValue:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:`Override the displayed value in the chip control.
Useful for avoiding truncation, especially in multi-select scenarios where multiple option labels might be too long to display.
When provided, this value takes precedence over the default label generation.`}}};const ct={title:"Components/Alpha/SelectChip",component:n},v=()=>{const l=[{value:null,label:"Clear selection"},{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"},{value:"4",label:"Option 4"}],[e,t]=o.useState(null);return a.jsx(n,{accessibilityLabel:"Select a value",onChange:t,options:l,placeholder:"Choose an option",value:e})},g=()=>{const l=[{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"},{value:"4",label:"Option 4"},{value:"5",label:"Option 5"}],{value:e,onChange:t}=T({initialValue:[]});return a.jsx(n,{controlAccessibilityLabel:"Select multiple values",onChange:t,options:l,placeholder:"Choose options",type:"multi",value:e})},O=()=>{const l=[{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"},{value:"4",label:"Option 4"}],[e,t]=o.useState("1");return a.jsx(n,{compact:!0,onChange:t,options:l,placeholder:"Choose an option",value:e})},S=()=>{const l=[{value:"btc",label:i.btc.name},{value:"eth",label:i.eth.name},{value:"dai",label:i.dai.name}],[e,t]=o.useState("eth"),s=r=>{if(!r)return null;const m={btc:i.btc.imageUrl,eth:i.eth.imageUrl,dai:i.dai.imageUrl}[r];return m?a.jsx(H,{height:24,shape:"circle",source:m,width:24}):null};return a.jsx(n,{onChange:t,options:l,placeholder:"Choose an asset",startNode:s(e),value:e})},me={btc:i.btc.imageUrl,eth:i.eth.imageUrl,dai:i.dai.imageUrl,ltc:i.ltc.imageUrl,xrp:i.xrp.imageUrl},y=()=>{const l=[{value:"btc",label:i.btc.name},{value:"eth",label:i.eth.name},{value:"dai",label:i.dai.name},{value:"ltc",label:i.ltc.name},{value:"xrp",label:i.xrp.name}],{value:e,onChange:t}=T({initialValue:["eth","btc"]}),s=o.useMemo(()=>e.length===0?null:a.jsx(re,{shape:"circle",size:24,children:e.map(r=>{const c=me[r];return c?a.jsx(H,{source:c},r):null})}),[e]);return a.jsx(n,{controlAccessibilityLabel:"Select multiple assets",maxWidth:400,onChange:t,options:l,placeholder:"Choose assets",startNode:s,type:"multi",value:e})},f=()=>{const l=[{value:"1",label:"Option 1"},{value:"2",label:"Option 2"}],[e,t]=o.useState("1");return a.jsx(E,{background:"bgAlternate",borderRadius:200,padding:2,children:a.jsx(n,{invertColorScheme:!0,onChange:t,options:l,placeholder:"Choose an option",value:e})})},C=()=>{const[l,e]=o.useState(null);return a.jsx(n,{onChange:e,options:[],placeholder:"No options available",value:l})},x=()=>{const l=[{label:"Group A",options:[{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"}]},{label:"Group B",disabled:!0,options:[{value:"4",label:"Option 4"},{value:"5",label:"Option 5"}]},{label:"Group C",options:[{value:"6",label:"Option 6"}]}],[e,t]=o.useState(null);return a.jsx(n,{accessibilityLabel:"Select a value",onChange:t,options:l,placeholder:"Choose an option",value:e})},V=()=>{const l=[{label:"Group A",options:[{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"}]},{label:"Group B",options:[{value:"4",label:"Option 4"},{value:"5",label:"Option 5"}]},{label:"Group C",options:[{value:"6",label:"Option 6"}]}],{value:e,onChange:t}=T({initialValue:[]});return a.jsx(n,{controlAccessibilityLabel:"Select multiple values",onChange:t,options:l,placeholder:"Choose options",type:"multi",value:e})},N=()=>{const l=[{label:"Available Options",options:[{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"}]},{label:"Unavailable Options (Group Disabled)",disabled:!0,options:[{value:"4",label:"Option 4"},{value:"5",label:"Option 5"},{value:"6",label:"Option 6"}]},{label:"More Available Options",options:[{value:"7",label:"Option 7"},{value:"8",label:"Option 8"}]}],[e,t]=o.useState(null);return a.jsx(n,{accessibilityLabel:"Select a value",onChange:t,options:l,placeholder:"Choose an option",value:e})},w=()=>{const l=[{label:"Available Options",options:[{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"}]},{label:"Unavailable Options (Group Disabled)",disabled:!0,options:[{value:"4",label:"Option 4"},{value:"5",label:"Option 5"},{value:"6",label:"Option 6"}]},{label:"More Available Options",options:[{value:"7",label:"Option 7"},{value:"8",label:"Option 8"}]}],{value:e,onChange:t}=T({initialValue:[]});return a.jsx(n,{controlAccessibilityLabel:"Select multiple values",onChange:t,options:l,placeholder:"Choose options",type:"multi",value:e})},R=()=>{const l=[{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"},{value:"4",label:"Option 4"}],[e,t]=o.useState("1");return a.jsxs(E,{gap:2,children:[a.jsx(n,{disabled:!0,accessibilityLabel:"Select a value",onChange:t,options:l,placeholder:"Choose an option",value:null}),a.jsx(n,{disabled:!0,accessibilityLabel:"Select a value",onChange:t,options:l,placeholder:"Choose an option",value:e})]})},k=()=>{const l=[{value:"1",label:"Option 1"},{value:"2",label:"Option 2",disabled:!0},{value:"3",label:"Option 3"},{value:"4",label:"Option 4",disabled:!0}],[e,t]=o.useState(null);return a.jsx(n,{accessibilityLabel:"Select a value",onChange:t,options:l,placeholder:"Choose an option",value:e})},q=()=>{const l=[{value:"1",label:"Option 1",description:"First option description"},{value:"2",label:"Option 2",description:"Second option description"},{value:"3",label:"Option 3",description:"Third option description"},{value:"4",label:"Option 4",description:"Fourth option description"}],[e,t]=o.useState(null);return a.jsx(n,{accessibilityLabel:"Select a value",onChange:t,options:l,placeholder:"Choose an option",value:e})},I=()=>{const l=[{value:"1",label:"Option 1"},{value:"2",label:"Option 2"},{value:"3",label:"Option 3"},{value:"4",label:"Option 4"},{value:"5",label:"Option 5"}],{value:e,onChange:t}=T({initialValue:[]}),s=Array.isArray(e)&&e.length>0?`${e.length} ${e.length===1?"option":"options"} selected`:void 0;return a.jsx(n,{controlAccessibilityLabel:"Select multiple values",displayValue:s,onChange:t,options:l,placeholder:"Choose options",type:"multi",value:e})};v.__docgenInfo={description:"",methods:[],displayName:"DefaultSingle"};g.__docgenInfo={description:"",methods:[],displayName:"DefaultMulti"};O.__docgenInfo={description:"",methods:[],displayName:"Compact"};S.__docgenInfo={description:"",methods:[],displayName:"WithStartEndNodes"};y.__docgenInfo={description:"",methods:[],displayName:"MultiSelectWithAssets"};f.__docgenInfo={description:"",methods:[],displayName:"InvertColorScheme"};C.__docgenInfo={description:"",methods:[],displayName:"EmptyOptions"};x.__docgenInfo={description:"",methods:[],displayName:"WithGroups"};V.__docgenInfo={description:"",methods:[],displayName:"MultiWithGroups"};N.__docgenInfo={description:"",methods:[],displayName:"WithDisabledGroup"};w.__docgenInfo={description:"",methods:[],displayName:"MultiWithDisabledGroup"};R.__docgenInfo={description:"",methods:[],displayName:"FullyDisabled"};k.__docgenInfo={description:"",methods:[],displayName:"WithDisabledOptions"};q.__docgenInfo={description:"",methods:[],displayName:"WithDescriptions"};I.__docgenInfo={description:"",methods:[],displayName:"WithDisplayValue"};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions = [{
    value: null,
    label: 'Clear selection'
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
  const [value, setValue] = useState<string | null>(null);
  return <SelectChip accessibilityLabel="Select a value" onChange={setValue} options={exampleOptions} placeholder="Choose an option" value={value} />;
}`,...v.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions = [{
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
  }];
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: []
  });
  return <SelectChip controlAccessibilityLabel="Select multiple values" onChange={onChange} options={exampleOptions} placeholder="Choose options" type="multi" value={value} />;
}`,...g.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions = [{
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
  const [value, setValue] = useState<string | null>('1');
  return <SelectChip compact onChange={setValue} options={exampleOptions} placeholder="Choose an option" value={value} />;
}`,...O.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions = [{
    value: 'btc',
    label: assets.btc.name
  }, {
    value: 'eth',
    label: assets.eth.name
  }, {
    value: 'dai',
    label: assets.dai.name
  }];
  const [value, setValue] = useState<string | null>('eth');

  // Map each option value to a different asset
  const getStartNode = (selectedValue: string | null) => {
    if (!selectedValue) return null;
    const assetMap: Record<string, string> = {
      btc: assets.btc.imageUrl,
      eth: assets.eth.imageUrl,
      dai: assets.dai.imageUrl
    };
    const imageUrl = assetMap[selectedValue];
    if (!imageUrl) return null;
    return <RemoteImage height={24} shape="circle" source={imageUrl} width={24} />;
  };
  return <SelectChip onChange={setValue} options={exampleOptions} placeholder="Choose an asset" startNode={getStartNode(value)} value={value} />;
}`,...S.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions = [{
    value: 'btc',
    label: assets.btc.name
  }, {
    value: 'eth',
    label: assets.eth.name
  }, {
    value: 'dai',
    label: assets.dai.name
  }, {
    value: 'ltc',
    label: assets.ltc.name
  }, {
    value: 'xrp',
    label: assets.xrp.name
  }];
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: ['eth', 'btc']
  });

  // Get startNode based on selected assets
  const startNode = useMemo(() => {
    if (value.length === 0) return null;

    // Multiple assets selected - use RemoteImageGroup
    return <RemoteImageGroup shape="circle" size={24}>
        {value.map(assetValue => {
        const imageUrl = assetImageMap[assetValue];
        if (!imageUrl) return null;
        return <RemoteImage key={assetValue} source={imageUrl} />;
      })}
      </RemoteImageGroup>;
  }, [value]);
  return <SelectChip controlAccessibilityLabel="Select multiple assets" maxWidth={400} onChange={onChange} options={exampleOptions} placeholder="Choose assets" startNode={startNode} type="multi" value={value} />;
}`,...y.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions = [{
    value: '1',
    label: 'Option 1'
  }, {
    value: '2',
    label: 'Option 2'
  }];
  const [value, setValue] = useState<string | null>('1');
  return <VStack background="bgAlternate" borderRadius={200} padding={2}>
      <SelectChip invertColorScheme onChange={setValue} options={exampleOptions} placeholder="Choose an option" value={value} />
    </VStack>;
}`,...f.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`() => {
  const [value, setValue] = useState<string | null>(null);
  return <SelectChip onChange={setValue} options={[]} placeholder="No options available" value={value} />;
}`,...C.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions = [{
    label: 'Group A',
    options: [{
      value: '1',
      label: 'Option 1'
    }, {
      value: '2',
      label: 'Option 2'
    }, {
      value: '3',
      label: 'Option 3'
    }]
  }, {
    label: 'Group B',
    disabled: true,
    options: [{
      value: '4',
      label: 'Option 4'
    }, {
      value: '5',
      label: 'Option 5'
    }]
  }, {
    label: 'Group C',
    options: [{
      value: '6',
      label: 'Option 6'
    }]
  }] as (SelectOption<string> | SelectOptionGroup<SelectType, string>)[];
  const [value, setValue] = useState<string | null>(null);
  return <SelectChip accessibilityLabel="Select a value" onChange={setValue} options={exampleOptions as any} placeholder="Choose an option" value={value} />;
}`,...x.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions: (SelectOption<string> | SelectOptionGroup<SelectType, string>)[] = [{
    label: 'Group A',
    options: [{
      value: '1',
      label: 'Option 1'
    }, {
      value: '2',
      label: 'Option 2'
    }, {
      value: '3',
      label: 'Option 3'
    }]
  }, {
    label: 'Group B',
    options: [{
      value: '4',
      label: 'Option 4'
    }, {
      value: '5',
      label: 'Option 5'
    }]
  }, {
    label: 'Group C',
    options: [{
      value: '6',
      label: 'Option 6'
    }]
  }];
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: []
  });
  return <SelectChip controlAccessibilityLabel="Select multiple values" onChange={onChange} options={exampleOptions as any} placeholder="Choose options" type="multi" value={value} />;
}`,...V.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions: (SelectOption<string> | SelectOptionGroup<SelectType, string>)[] = [{
    label: 'Available Options',
    options: [{
      value: '1',
      label: 'Option 1'
    }, {
      value: '2',
      label: 'Option 2'
    }, {
      value: '3',
      label: 'Option 3'
    }]
  }, {
    label: 'Unavailable Options (Group Disabled)',
    disabled: true,
    options: [{
      value: '4',
      label: 'Option 4'
    }, {
      value: '5',
      label: 'Option 5'
    }, {
      value: '6',
      label: 'Option 6'
    }]
  }, {
    label: 'More Available Options',
    options: [{
      value: '7',
      label: 'Option 7'
    }, {
      value: '8',
      label: 'Option 8'
    }]
  }];
  const [value, setValue] = useState<string | null>(null);
  return <SelectChip accessibilityLabel="Select a value" onChange={setValue} options={exampleOptions as any} placeholder="Choose an option" value={value} />;
}`,...N.parameters?.docs?.source}}};w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions: (SelectOption<string> | SelectOptionGroup<SelectType, string>)[] = [{
    label: 'Available Options',
    options: [{
      value: '1',
      label: 'Option 1'
    }, {
      value: '2',
      label: 'Option 2'
    }, {
      value: '3',
      label: 'Option 3'
    }]
  }, {
    label: 'Unavailable Options (Group Disabled)',
    disabled: true,
    options: [{
      value: '4',
      label: 'Option 4'
    }, {
      value: '5',
      label: 'Option 5'
    }, {
      value: '6',
      label: 'Option 6'
    }]
  }, {
    label: 'More Available Options',
    options: [{
      value: '7',
      label: 'Option 7'
    }, {
      value: '8',
      label: 'Option 8'
    }]
  }];
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: []
  });
  return <SelectChip controlAccessibilityLabel="Select multiple values" onChange={onChange} options={exampleOptions as any} placeholder="Choose options" type="multi" value={value} />;
}`,...w.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions = [{
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
  const [value, setValue] = useState<string | null>('1');
  return <VStack gap={2}>
      <SelectChip disabled accessibilityLabel="Select a value" onChange={setValue} options={exampleOptions} placeholder="Choose an option" value={null} />
      <SelectChip disabled accessibilityLabel="Select a value" onChange={setValue} options={exampleOptions} placeholder="Choose an option" value={value} />
    </VStack>;
}`,...R.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions = [{
    value: '1',
    label: 'Option 1'
  }, {
    value: '2',
    label: 'Option 2',
    disabled: true
  }, {
    value: '3',
    label: 'Option 3'
  }, {
    value: '4',
    label: 'Option 4',
    disabled: true
  }];
  const [value, setValue] = useState<string | null>(null);
  return <SelectChip accessibilityLabel="Select a value" onChange={setValue} options={exampleOptions} placeholder="Choose an option" value={value} />;
}`,...k.parameters?.docs?.source}}};q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions = [{
    value: '1',
    label: 'Option 1',
    description: 'First option description'
  }, {
    value: '2',
    label: 'Option 2',
    description: 'Second option description'
  }, {
    value: '3',
    label: 'Option 3',
    description: 'Third option description'
  }, {
    value: '4',
    label: 'Option 4',
    description: 'Fourth option description'
  }];
  const [value, setValue] = useState<string | null>(null);
  return <SelectChip accessibilityLabel="Select a value" onChange={setValue} options={exampleOptions} placeholder="Choose an option" value={value} />;
}`,...q.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`() => {
  const exampleOptions = [{
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
  }];
  const {
    value,
    onChange
  } = useMultiSelect({
    initialValue: []
  });
  const displayValue = Array.isArray(value) && value.length > 0 ? \`\${value.length} \${value.length === 1 ? 'option' : 'options'} selected\` : undefined;
  return <SelectChip controlAccessibilityLabel="Select multiple values" displayValue={displayValue} onChange={onChange} options={exampleOptions} placeholder="Choose options" type="multi" value={value} />;
}`,...I.parameters?.docs?.source}}};const dt=["DefaultSingle","DefaultMulti","Compact","WithStartEndNodes","MultiSelectWithAssets","InvertColorScheme","EmptyOptions","WithGroups","MultiWithGroups","WithDisabledGroup","MultiWithDisabledGroup","FullyDisabled","WithDisabledOptions","WithDescriptions","WithDisplayValue"];export{O as Compact,g as DefaultMulti,v as DefaultSingle,C as EmptyOptions,R as FullyDisabled,f as InvertColorScheme,y as MultiSelectWithAssets,w as MultiWithDisabledGroup,V as MultiWithGroups,q as WithDescriptions,N as WithDisabledGroup,k as WithDisabledOptions,I as WithDisplayValue,x as WithGroups,S as WithStartEndNodes,dt as __namedExportsOrder,ct as default};
