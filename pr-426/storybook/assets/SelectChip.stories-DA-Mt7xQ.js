import{j as e,r as j,R as C}from"./iframe-BXWLBCkp.js";import{l as w}from"./loremIpsum-CjdvNg3u.js";import{S as f}from"./SelectOption-Bnv43xgZ.js";import{I as i}from"./Icon-CgDQ3NQp.js";import{H as d}from"./HStack-B6p8qBpp.js";import{V as l}from"./VStack-CnEfMFeL.js";import{T as u}from"./Text-Ch_dBU4v.js";import{S}from"./SelectChip-8reKK24H.js";import"./preload-helper-D9Z9MdNV.js";import"./select-Em8pkxbY.js";import"./Cell-CB_dChqK.js";import"./useCellSpacing-BuZVtSR4.js";import"./sizing-Do56D2dQ.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./useTheme-BJazYlse.js";import"./CellAccessory-BypMgxs5.js";import"./isRtl-Du0XdnX5.js";import"./useMergeRefs-DR4sGa7m.js";import"./useRefocusTrigger-t_p2JCAO.js";import"./FocusTrap-90tMQkIg.js";import"./debounce-fynzmAtJ.js";import"./AnimatedCaret-DDAfukJC.js";import"./collapsible-BAneA-61.js";import"./tokens-BwScSksM.js";import"./context-Cc0ZOVig.js";import"./useMotionProps-CS-LE6l8.js";import"./utils-CwomCnHN.js";import"./index-DoYuAu2r.js";import"./motion-minimal-SVRWJYUW.js";import"./MediaChip-DK4Hgf8b.js";import"./Chip-Cb6f10va.js";import"./Dropdown-BSPZ_a8b.js";import"./index-7N_x-QzT.js";import"./useBreakpoints-BiiruerU.js";import"./ModalWrapper-D-DvdkD-.js";import"./NewAnimatePresence-BbA2hDPb.js";import"./index-B2twlf45.js";import"./use-unmount-effect-5QIafHMH.js";import"./useScrollBlocker-4Da9qMHo.js";import"./Overlay-XiDupmt3.js";import"./OverlayContentContext-hT53AGt-.js";import"./Portal-tAONErW2.js";import"./Popover-CipwoaXC.js";import"./dropdown-CDhCThJm.js";const k=["Balance","Name","Asset Value"],v=[w,...k],b={maxWidth:300},t=({value:r,sortOptions:c=k,...x})=>{const[h,g]=C.useState(r),o=e.jsxs(e.Fragment,{children:[e.jsx(d,{padding:2,role:"separator",children:e.jsx(u,{as:"h2",color:"fgMuted",display:"block",font:"caption",children:"Section Heading"})}),c.map(a=>e.jsx(f,{title:a,value:a},a))]});return e.jsx(S,{active:h!==void 0,content:o,onChange:g,value:h,...x})},n=()=>e.jsxs(l,{gap:3,children:[e.jsxs(l,{gap:2,children:[e.jsx(u,{as:"h3",display:"block",font:"headline",children:"Regular"}),e.jsxs(d,{gap:2,children:[e.jsx(t,{value:"Balance"}),e.jsx(t,{placeholder:"Sort by"})]})]}),e.jsxs(l,{gap:2,children:[e.jsx(u,{as:"h3",display:"block",font:"headline",children:"Compact"}),e.jsxs(d,{gap:2,children:[e.jsx(t,{compact:!0,value:"Balance"}),e.jsx(t,{compact:!0,placeholder:"Sort by"})]})]})]}),s=()=>e.jsxs(l,{gap:3,children:[e.jsxs(l,{gap:2,children:[e.jsx(u,{as:"h3",display:"block",font:"headline",children:"Regular"}),e.jsxs(d,{gap:2,children:[e.jsx(t,{end:e.jsx(i,{active:!0,color:"fg",name:"filter",size:"xs"}),placeholder:"Filter"}),e.jsx(t,{end:e.jsx(i,{active:!0,color:"fg",name:"filter",size:"xs"}),placeholder:"Filter",value:"Balance"})]})]}),e.jsxs(l,{gap:2,children:[e.jsx(u,{as:"h3",display:"block",font:"headline",children:"Compact"}),e.jsxs(d,{gap:2,children:[e.jsx(t,{compact:!0,end:e.jsx(i,{active:!0,color:"fg",name:"filter",size:"xs"}),placeholder:"Filter"}),e.jsx(t,{compact:!0,end:e.jsx(i,{active:!0,color:"fg",name:"filter",size:"xs"}),placeholder:"Filter",value:"Balance"})]})]})]}),p=()=>{const r=[{label:"Price",title:"Price (High to Low)",value:"price-high-low",iconName:"arrowDown"},{label:"Price",title:"Price (Low to High)",value:"price-low-high",iconName:"arrowUp"},{label:"Market Cap",title:"Market Cap (High to Low)",value:"market-cap-high-low",iconName:"arrowDown"},{label:"Market Cap",title:"Market Cap (Low to High)",value:"market-cap-low-high",iconName:"arrowUp"}],[c,x]=j.useState(r[0]),h=o=>{x(r.find(({value:a})=>a===o)??r[0])},g=e.jsx(l,{children:r.map(({title:o,value:a})=>e.jsx(f,{title:o,value:a},a))});return e.jsx(S,{active:c!==void 0,content:g,end:e.jsx(i,{active:!0,color:"fg",name:c.iconName,size:"xs"}),onChange:o=>h(o),value:c.value,valueLabel:c.label})},m=()=>e.jsx(t,{contentStyle:b,sortOptions:v,value:v[0]}),ve={title:"Components/Chips/SelectChip",component:S};n.__docgenInfo={description:"",methods:[],displayName:"Default"};s.__docgenInfo={description:"",methods:[],displayName:"CustomEndNode"};p.__docgenInfo={description:"",methods:[],displayName:"ObjectValueModel"};m.__docgenInfo={description:"",methods:[],displayName:"CustomStyle"};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => <VStack gap={3}>
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
