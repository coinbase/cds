import{j as e,r as j,R as C}from"./iframe-CYDANtMt.js";import{l as w}from"./loremIpsum-CjdvNg3u.js";import{S as f}from"./SelectOption-D3fv76Hr.js";import{I as i}from"./Icon-DRxKkZdt.js";import{H as d}from"./HStack-Fh-9TmPm.js";import{V as l}from"./VStack-iXgNewwv.js";import{T as u}from"./Text-0g3rWpAf.js";import{S}from"./SelectChip-BvtoXLCo.js";import"./preload-helper-D9Z9MdNV.js";import"./select-Em8pkxbY.js";import"./Cell-D1A-2vVj.js";import"./useCellSpacing-BH3_o_ol.js";import"./sizing-Do56D2dQ.js";import"./Pressable-BvczHaFK.js";import"./isArray-BJmyNVUi.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";import"./useTheme-C_Ehsh33.js";import"./CellAccessory-Cln9vUz5.js";import"./isRtl-CGZsgYct.js";import"./useMergeRefs-DR4sGa7m.js";import"./useRefocusTrigger-7TqcuL-y.js";import"./FocusTrap-D5jofIBF.js";import"./debounce-fynzmAtJ.js";import"./AnimatedCaret-R2z7TxpB.js";import"./collapsible-BAneA-61.js";import"./tokens-BwScSksM.js";import"./context-C9K9uJvD.js";import"./useMotionProps-BF3bCUsm.js";import"./utils-CM_X5is-.js";import"./index-CAK1E_4V.js";import"./motion-minimal-B1h7XI-_.js";import"./MediaChip-2PB0UFrW.js";import"./Chip-DQPBsLRY.js";import"./Dropdown-CpCPWRqg.js";import"./index-B3W2yIJg.js";import"./useBreakpoints-Bxk0TUW-.js";import"./ModalWrapper-TkjI7R_Y.js";import"./NewAnimatePresence-BIvSMOo2.js";import"./index-DaxQGrHc.js";import"./use-unmount-effect-DjWyEMV9.js";import"./useScrollBlocker-smLDx_Od.js";import"./Overlay-BrSXLw2H.js";import"./OverlayContentContext-D3LfdOuR.js";import"./Portal-BNKVVywf.js";import"./Popover-CdSD4lsc.js";import"./dropdown-CDhCThJm.js";const k=["Balance","Name","Asset Value"],v=[w,...k],b={maxWidth:300},t=({value:r,sortOptions:c=k,...x})=>{const[h,g]=C.useState(r),o=e.jsxs(e.Fragment,{children:[e.jsx(d,{padding:2,role:"separator",children:e.jsx(u,{as:"h2",color:"fgMuted",display:"block",font:"caption",children:"Section Heading"})}),c.map(a=>e.jsx(f,{title:a,value:a},a))]});return e.jsx(S,{active:h!==void 0,content:o,onChange:g,value:h,...x})},n=()=>e.jsxs(l,{gap:3,children:[e.jsxs(l,{gap:2,children:[e.jsx(u,{as:"h3",display:"block",font:"headline",children:"Regular"}),e.jsxs(d,{gap:2,children:[e.jsx(t,{value:"Balance"}),e.jsx(t,{placeholder:"Sort by"})]})]}),e.jsxs(l,{gap:2,children:[e.jsx(u,{as:"h3",display:"block",font:"headline",children:"Compact"}),e.jsxs(d,{gap:2,children:[e.jsx(t,{compact:!0,value:"Balance"}),e.jsx(t,{compact:!0,placeholder:"Sort by"})]})]})]}),s=()=>e.jsxs(l,{gap:3,children:[e.jsxs(l,{gap:2,children:[e.jsx(u,{as:"h3",display:"block",font:"headline",children:"Regular"}),e.jsxs(d,{gap:2,children:[e.jsx(t,{end:e.jsx(i,{active:!0,color:"fg",name:"filter",size:"xs"}),placeholder:"Filter"}),e.jsx(t,{end:e.jsx(i,{active:!0,color:"fg",name:"filter",size:"xs"}),placeholder:"Filter",value:"Balance"})]})]}),e.jsxs(l,{gap:2,children:[e.jsx(u,{as:"h3",display:"block",font:"headline",children:"Compact"}),e.jsxs(d,{gap:2,children:[e.jsx(t,{compact:!0,end:e.jsx(i,{active:!0,color:"fg",name:"filter",size:"xs"}),placeholder:"Filter"}),e.jsx(t,{compact:!0,end:e.jsx(i,{active:!0,color:"fg",name:"filter",size:"xs"}),placeholder:"Filter",value:"Balance"})]})]})]}),p=()=>{const r=[{label:"Price",title:"Price (High to Low)",value:"price-high-low",iconName:"arrowDown"},{label:"Price",title:"Price (Low to High)",value:"price-low-high",iconName:"arrowUp"},{label:"Market Cap",title:"Market Cap (High to Low)",value:"market-cap-high-low",iconName:"arrowDown"},{label:"Market Cap",title:"Market Cap (Low to High)",value:"market-cap-low-high",iconName:"arrowUp"}],[c,x]=j.useState(r[0]),h=o=>{x(r.find(({value:a})=>a===o)??r[0])},g=e.jsx(l,{children:r.map(({title:o,value:a})=>e.jsx(f,{title:o,value:a},a))});return e.jsx(S,{active:c!==void 0,content:g,end:e.jsx(i,{active:!0,color:"fg",name:c.iconName,size:"xs"}),onChange:o=>h(o),value:c.value,valueLabel:c.label})},m=()=>e.jsx(t,{contentStyle:b,sortOptions:v,value:v[0]}),ve={title:"Components/Chips/SelectChip",component:S};n.__docgenInfo={description:"",methods:[],displayName:"Default"};s.__docgenInfo={description:"",methods:[],displayName:"CustomEndNode"};p.__docgenInfo={description:"",methods:[],displayName:"ObjectValueModel"};m.__docgenInfo={description:"",methods:[],displayName:"CustomStyle"};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => <VStack gap={3}>
    <VStack gap={2}>
      <Text as="h3" display="block" font="headline">
        Regular
      </Text>
      <HStack gap={2}>
        <ExampleSelectChip value="Balance" />
        <ExampleSelectChip placeholder="Sort by" />
      </HStack>
    </VStack>
    <VStack gap={2}>
      <Text as="h3" display="block" font="headline">
        Compact
      </Text>
      <HStack gap={2}>
        <ExampleSelectChip compact value="Balance" />
        <ExampleSelectChip compact placeholder="Sort by" />
      </HStack>
    </VStack>
  </VStack>`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => <VStack gap={3}>
    <VStack gap={2}>
      <Text as="h3" display="block" font="headline">
        Regular
      </Text>
      <HStack gap={2}>
        <ExampleSelectChip end={<Icon active color="fg" name="filter" size="xs" />} placeholder="Filter" />
        <ExampleSelectChip end={<Icon active color="fg" name="filter" size="xs" />} placeholder="Filter" value="Balance" />
      </HStack>
    </VStack>
    <VStack gap={2}>
      <Text as="h3" display="block" font="headline">
        Compact
      </Text>
      <HStack gap={2}>
        <ExampleSelectChip compact end={<Icon active color="fg" name="filter" size="xs" />} placeholder="Filter" />
        <ExampleSelectChip compact end={<Icon active color="fg" name="filter" size="xs" />} placeholder="Filter" value="Balance" />
      </HStack>
    </VStack>
  </VStack>`,...s.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => {
  const options: ValueObject[] = [{
    label: 'Price',
    title: 'Price (High to Low)',
    value: 'price-high-low',
    iconName: 'arrowDown'
  }, {
    label: 'Price',
    title: 'Price (Low to High)',
    value: 'price-low-high',
    iconName: 'arrowUp'
  }, {
    label: 'Market Cap',
    title: 'Market Cap (High to Low)',
    value: 'market-cap-high-low',
    iconName: 'arrowDown'
  }, {
    label: 'Market Cap',
    title: 'Market Cap (Low to High)',
    value: 'market-cap-low-high',
    iconName: 'arrowUp'
  }];
  const [value, setValue] = useState(options[0]);
  const handleChange = (newValue: string) => {
    setValue(options.find(({
      value
    }) => value === newValue) ?? options[0]);
  };
  const content = <VStack>
      {options.map(({
      title,
      value
    }) => <SelectOption key={value} title={title} value={value} />)}
    </VStack>;
  return <SelectChip active={value !== undefined} content={content} end={<Icon active color="fg" name={value.iconName} size="xs" />} onChange={(newValue: string) => handleChange(newValue)} value={value.value} valueLabel={value.label} />;
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => {
  return <ExampleSelectChip contentStyle={customContentStyle} sortOptions={customSortOptions} value={customSortOptions[0]} />;
}`,...m.parameters?.docs?.source}}};const fe=["Default","CustomEndNode","ObjectValueModel","CustomStyle"];export{s as CustomEndNode,m as CustomStyle,n as Default,p as ObjectValueModel,fe as __namedExportsOrder,ve as default};
