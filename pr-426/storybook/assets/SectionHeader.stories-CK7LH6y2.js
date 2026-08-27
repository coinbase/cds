import{j as e,r as u}from"./iframe-BXWLBCkp.js";import{a as p}from"./assets-CEwpm_uP.js";import{S as a}from"./SectionHeader-Ce4kY-K7.js";import{S as y}from"./SelectChip-8reKK24H.js";import{V as x}from"./VStack-CnEfMFeL.js";import{D as n}from"./Divider-DIvJbvj9.js";import{H as o}from"./HStack-B6p8qBpp.js";import{S as k}from"./SearchInput-CfVqG-ke.js";import{B as H}from"./Button-W9Shg4T1.js";import{I as r}from"./IconButton-OIX0AFCz.js";import{T as i}from"./Text-Ch_dBU4v.js";import{L as v}from"./Link-C3jcuPE_.js";import{T as L}from"./Tooltip-Crqfeox4.js";import{I as T}from"./Icon-CgDQ3NQp.js";import{R as b}from"./RemoteImage-Lksm6NI7.js";import{S as w}from"./SelectOption-Bnv43xgZ.js";import{C as P}from"./CellMedia-BVxosPAx.js";import"./preload-helper-D9Z9MdNV.js";import"./useMergeRefs-DR4sGa7m.js";import"./useRefocusTrigger-t_p2JCAO.js";import"./FocusTrap-90tMQkIg.js";import"./debounce-fynzmAtJ.js";import"./AnimatedCaret-DDAfukJC.js";import"./collapsible-BAneA-61.js";import"./tokens-BwScSksM.js";import"./context-Cc0ZOVig.js";import"./useMotionProps-CS-LE6l8.js";import"./utils-CwomCnHN.js";import"./index-DoYuAu2r.js";import"./motion-minimal-SVRWJYUW.js";import"./MediaChip-DK4Hgf8b.js";import"./Chip-Cb6f10va.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./useTheme-BJazYlse.js";import"./Dropdown-BSPZ_a8b.js";import"./index-7N_x-QzT.js";import"./useBreakpoints-BiiruerU.js";import"./ModalWrapper-D-DvdkD-.js";import"./NewAnimatePresence-BbA2hDPb.js";import"./index-B2twlf45.js";import"./use-unmount-effect-5QIafHMH.js";import"./useScrollBlocker-4Da9qMHo.js";import"./Overlay-XiDupmt3.js";import"./OverlayContentContext-hT53AGt-.js";import"./Portal-tAONErW2.js";import"./Popover-CipwoaXC.js";import"./dropdown-CDhCThJm.js";import"./InputIcon-hfAGuXGm.js";import"./InputIconButton-BGgDza3y.js";import"./TextInput-CXMiH86I.js";import"./usePrefixedId-Dfl-0DGQ.js";import"./HelperText-C1uG41Fa.js";import"./InputLabel-C3lBKQeI.js";import"./InputStack-DO5lXlgp.js";import"./ColorSurge-D5iBCkQQ.js";import"./use-animation-CYeuSrS_.js";import"./NativeInput-CDtkEvxu.js";import"./Spinner-BAI0lrZ-.js";import"./TooltipContent-BbVg49nw.js";import"./select-Em8pkxbY.js";import"./Cell-CB_dChqK.js";import"./useCellSpacing-BuZVtSR4.js";import"./sizing-Do56D2dQ.js";import"./CellAccessory-BypMgxs5.js";import"./isRtl-Du0XdnX5.js";const f=[{title:"Polygon",value:"polygon",imageUrl:p.polygon.imageUrl},{title:"Ethereum",value:"ethereum",imageUrl:p.eth.imageUrl},{title:"DAI",value:"dai",imageUrl:p.dai.imageUrl}],t={title:"SectionHeader",start:e.jsx(b,{shape:"circle",size:"m",source:p.btc.imageUrl}),icon:e.jsx(L,{content:"Tooltip content",placement:"right",children:e.jsx(T,{active:!0,color:"fg",name:"info",size:"xs"})}),balance:e.jsxs(o,{alignItems:"flex-end",flexWrap:"wrap",gap:.5,children:[e.jsx(i,{as:"h3",color:"fgMuted",display:"block",font:"title3",numberOfLines:1,children:"$3,9081.01"}),e.jsx(i,{as:"p",color:"fgPositive",display:"block",font:"body",children:"↗ 6.37%"})]}),description:"Add up to 2 lines of body copy."},m=()=>{const[l,h]=u.useState(),g=e.jsx(x,{children:f.map(({title:d,value:c,imageUrl:S})=>e.jsx(w,{media:e.jsx(P,{source:S,type:"asset"}),title:d,value:c},c))}),j=u.useCallback(d=>h(f.find(({value:c})=>c===d)),[]);return e.jsx(o,{justifyContent:"flex-end",width:"100%",children:e.jsx(y,{active:l!==void 0,content:g,minWidth:200,onChange:j,placeholder:"Networks",start:l&&e.jsx(b,{source:l?.imageUrl}),value:l?l.value:void 0,valueLabel:l?l.title:void 0})})},s=()=>e.jsxs(x,{gap:0,left:0,position:"absolute",top:0,width:"100%",children:[e.jsx(a,{title:t.title}),e.jsx(n,{}),e.jsx(a,{end:e.jsx(m,{}),title:t.title}),e.jsx(n,{}),e.jsxs(o,{flexWrap:"wrap",gap:1,justifyContent:"space-between",padding:2,paddingX:4,children:[e.jsx(a,{...t,icon:null,paddingX:0,paddingY:0}),e.jsx(o,{flexGrow:1,maxWidth:475,children:e.jsx(k,{compact:!0,onChangeText:()=>{},placeholder:"Placeholder",value:""})})]}),e.jsx(n,{}),e.jsx(a,{...t,balance:null,end:e.jsx(H,{compact:!0,variant:"secondary",children:"Button"})}),e.jsx(n,{}),e.jsx(a,{...t,balance:null,end:e.jsxs(o,{gap:1,children:[e.jsx(r,{accessibilityLabel:"Left caret",name:"caretLeft"}),e.jsx(r,{accessibilityLabel:"Right caret",name:"caretRight"})]})}),e.jsx(n,{}),e.jsx(a,{...t,balance:null,end:e.jsx(i,{as:"label",font:"headline",children:e.jsx(v,{href:"http://www.coinbase.com",target:"_blank",children:"See all"})})}),e.jsx(n,{}),e.jsx(a,{...t,balance:null,end:e.jsx(r,{accessibilityLabel:"Upload",name:"upload"})}),e.jsx(n,{}),e.jsx(a,{...t,balance:e.jsxs(x,{children:[e.jsx(i,{as:"h3",color:"fgMuted",display:"block",font:"title3",children:"$3908.01"}),e.jsx(i,{as:"p",color:"fgPositive",display:"block",font:"body",children:"↗ 6.37%"})]}),end:e.jsx(o,{children:e.jsx(m,{})}),icon:null,start:null,title:e.jsx(i,{as:"p",display:"block",font:"label1",children:"SectionHeader"})}),e.jsx(n,{}),e.jsx(a,{...t,balance:e.jsxs(o,{alignItems:"flex-end",gap:1,children:[e.jsx(i,{as:"sub",color:"fgMuted",font:"display3",children:"$3908.01"}),e.jsx(i,{as:"p",color:"fgNegative",display:"block",font:"body",children:"↘ 6.37%"})]}),end:e.jsxs(o,{gap:1,children:[e.jsx(r,{accessibilityLabel:"Left caret",name:"caretLeft"}),e.jsx(r,{accessibilityLabel:"Right caret",name:"caretRight"})]}),icon:null,start:null,title:e.jsx(i,{as:"p",display:"block",font:"label1",children:"SectionHeader"})}),e.jsx(n,{}),e.jsx(a,{...t,end:e.jsx(o,{children:e.jsx(m,{})}),padding:0}),e.jsx(n,{}),e.jsx(a,{...t,balance:null,start:null,title:e.jsx(i,{as:"sub",font:"caption",children:t.title})})]}),Xe={title:"Components/SectionHeader",component:a};s.__docgenInfo={description:"",methods:[],displayName:"Examples"};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => {
  return <VStack gap={0} left={0} position="absolute" top={0} width="100%">
      <SectionHeader title={exampleProps.title} />
      <Divider />
      <SectionHeader end={<SelectChipDropdown />} title={exampleProps.title} />
      <Divider />
      <HStack flexWrap="wrap" gap={1} justifyContent="space-between" padding={2} paddingX={4}>
        <SectionHeader {...exampleProps} icon={null} paddingX={0} paddingY={0} />
        <HStack flexGrow={1} maxWidth={475}>
          <SearchInput compact onChangeText={() => {}} placeholder="Placeholder" value="" />
        </HStack>
      </HStack>
      <Divider />
      <SectionHeader {...exampleProps} balance={null} end={<Button compact variant="secondary">
            Button
          </Button>} />
      <Divider />
      <SectionHeader {...exampleProps} balance={null} end={<HStack gap={1}>
            <IconButton accessibilityLabel="Left caret" name="caretLeft" />
            <IconButton accessibilityLabel="Right caret" name="caretRight" />
          </HStack>} />
      <Divider />
      <SectionHeader {...exampleProps} balance={null} end={<Text as="label" font="headline">
            <Link href="http://www.coinbase.com" target="_blank">
              See all
            </Link>
          </Text>} />
      <Divider />
      <SectionHeader {...exampleProps} balance={null} end={<IconButton accessibilityLabel="Upload" name="upload" />} />
      <Divider />
      <SectionHeader {...exampleProps} balance={<VStack>
            <Text as="h3" color="fgMuted" display="block" font="title3">
              $3908.01
            </Text>
            <Text as="p" color="fgPositive" display="block" font="body">
              ↗ 6.37%
            </Text>
          </VStack>}
    // description={null}
    end={<HStack>
            <SelectChipDropdown />
          </HStack>} icon={null} start={null} title={<Text as="p" display="block" font="label1">
            SectionHeader
          </Text>} />
      <Divider />
      <SectionHeader {...exampleProps} balance={<HStack alignItems="flex-end" gap={1}>
            <Text as="sub" color="fgMuted" font="display3">
              $3908.01
            </Text>
            <Text as="p" color="fgNegative" display="block" font="body">
              ↘ 6.37%
            </Text>
          </HStack>} end={<HStack gap={1}>
            <IconButton accessibilityLabel="Left caret" name="caretLeft" />
            <IconButton accessibilityLabel="Right caret" name="caretRight" />
          </HStack>} icon={null} start={null} title={<Text as="p" display="block" font="label1">
            SectionHeader
          </Text>} />
      <Divider />
      <SectionHeader {...exampleProps} end={<HStack>
            <SelectChipDropdown />
          </HStack>} padding={0} />
      <Divider />
      <SectionHeader {...exampleProps} balance={null} start={null} title={<Text as="sub" font="caption">
            {exampleProps.title}
          </Text>} />
    </VStack>;
}`,...s.parameters?.docs?.source}}};const ze=["Examples"];export{s as Examples,ze as __namedExportsOrder,Xe as default};
