import{j as e,r as u}from"./iframe-CsG_6vZR.js";import{a as p}from"./assets-CEwpm_uP.js";import{S as y}from"./SearchInput-Bvt5gl6w.js";import{S as k}from"./SelectOption-BBBPgn8s.js";import{S as a}from"./SectionHeader-yienAA4-.js";import{S as H}from"./SelectChip-LZHf1RWz.js";import{V as x}from"./VStack-Cg_Yq2u4.js";import{D as n}from"./Divider-DKMVovzU.js";import{H as o}from"./HStack-DaDYipoP.js";import{B as v}from"./Button-D2WSek5T.js";import{I as r}from"./IconButton-DNJ86Kiu.js";import{T as i}from"./Text-B1CpMNU3.js";import{L}from"./Link-GlbzwVdV.js";import{T}from"./Tooltip-DdBi_ZOF.js";import{I as w}from"./Icon-DTs0crZh.js";import{R as b}from"./RemoteImage-CCsStlyO.js";import{C as P}from"./CellMedia-oeXrSUuB.js";import"./preload-helper-D9Z9MdNV.js";import"./useMergeRefs-DR4sGa7m.js";import"./InputIcon-CLvNTxep.js";import"./context-fDezSldV.js";import"./InputIconButton-D6rP7VAA.js";import"./TextInput-D5KGlaku.js";import"./usePrefixedId-BL1THI0P.js";import"./HelperText-W0U74shX.js";import"./InputLabel-CdlU6JsR.js";import"./InputStack-BFRjE954.js";import"./tokens-BwScSksM.js";import"./Interactable--rqISG90.js";import"./color-Ceo1QMNe.js";import"./useTheme-CmrOhAty.js";import"./ColorSurge-2yE2z4Kr.js";import"./useMotionProps-BXBckQBf.js";import"./utils-y2S18Lx0.js";import"./use-animation-DHwoMYVB.js";import"./motion-minimal-5s2ikV7b.js";import"./NativeInput-8PS_q8WF.js";import"./select-Em8pkxbY.js";import"./Cell-Z4wq8KY-.js";import"./useCellSpacing-BeT6oDTo.js";import"./sizing-Do56D2dQ.js";import"./Pressable-DDN99tmF.js";import"./isArray-M0ytM-vC.js";import"./CellAccessory-iu0jUwZW.js";import"./isRtl-C5Fon8jH.js";import"./useRefocusTrigger-sY3gfxp6.js";import"./FocusTrap-C5pHOjrH.js";import"./debounce-fynzmAtJ.js";import"./AnimatedCaret-BYj5sDun.js";import"./collapsible-BAneA-61.js";import"./index-BqvvFL-B.js";import"./MediaChip-WBZG74Sv.js";import"./Chip-BJKnv_em.js";import"./Dropdown-DlJsEaMG.js";import"./index-CKRF3JMY.js";import"./useBreakpoints-DD5uuIEx.js";import"./ModalWrapper-D8IaYCfm.js";import"./NewAnimatePresence-P1FndR1q.js";import"./index-CpZJTW5x.js";import"./use-unmount-effect-DmgCrakR.js";import"./useScrollBlocker-CjG6q-zd.js";import"./Overlay-DkQgdcBj.js";import"./OverlayContentContext-CpXWuzdo.js";import"./Portal-BaLq4aAx.js";import"./Popover-BqkIPLOm.js";import"./dropdown-CDhCThJm.js";import"./Spinner-C8x8bhOH.js";import"./TooltipContent-CdVyoQz2.js";const f=[{title:"Polygon",value:"polygon",imageUrl:p.polygon.imageUrl},{title:"Ethereum",value:"ethereum",imageUrl:p.eth.imageUrl},{title:"DAI",value:"dai",imageUrl:p.dai.imageUrl}],t={title:"SectionHeader",start:e.jsx(b,{shape:"circle",size:"m",source:p.btc.imageUrl}),icon:e.jsx(T,{content:"Tooltip content",placement:"right",children:e.jsx(w,{active:!0,color:"fg",name:"info",size:"xs"})}),balance:e.jsxs(o,{alignItems:"flex-end",flexWrap:"wrap",gap:.5,children:[e.jsx(i,{as:"h3",color:"fgMuted",display:"block",font:"title3",numberOfLines:1,children:"$3,9081.01"}),e.jsx(i,{as:"p",color:"fgPositive",display:"block",font:"body",children:"↗ 6.37%"})]}),description:"Add up to 2 lines of body copy."},m=()=>{const[l,h]=u.useState(),g=e.jsx(x,{children:f.map(({title:d,value:c,imageUrl:S})=>e.jsx(k,{media:e.jsx(P,{source:S,type:"asset"}),title:d,value:c},c))}),j=u.useCallback(d=>h(f.find(({value:c})=>c===d)),[]);return e.jsx(o,{justifyContent:"flex-end",width:"100%",children:e.jsx(H,{active:l!==void 0,content:g,minWidth:200,onChange:j,placeholder:"Networks",start:l&&e.jsx(b,{source:l?.imageUrl}),value:l?l.value:void 0,valueLabel:l?l.title:void 0})})},s=()=>e.jsxs(x,{gap:0,left:0,position:"absolute",top:0,width:"100%",children:[e.jsx(a,{title:t.title}),e.jsx(n,{}),e.jsx(a,{end:e.jsx(m,{}),title:t.title}),e.jsx(n,{}),e.jsxs(o,{flexWrap:"wrap",gap:1,justifyContent:"space-between",padding:2,paddingX:4,children:[e.jsx(a,{...t,icon:null,paddingX:0,paddingY:0}),e.jsx(o,{flexGrow:1,maxWidth:475,children:e.jsx(y,{compact:!0,onChangeText:()=>{},placeholder:"Placeholder",value:""})})]}),e.jsx(n,{}),e.jsx(a,{...t,balance:null,end:e.jsx(v,{compact:!0,variant:"secondary",children:"Button"})}),e.jsx(n,{}),e.jsx(a,{...t,balance:null,end:e.jsxs(o,{gap:1,children:[e.jsx(r,{accessibilityLabel:"Left caret",name:"caretLeft"}),e.jsx(r,{accessibilityLabel:"Right caret",name:"caretRight"})]})}),e.jsx(n,{}),e.jsx(a,{...t,balance:null,end:e.jsx(i,{as:"label",font:"headline",children:e.jsx(L,{href:"http://www.coinbase.com",target:"_blank",children:"See all"})})}),e.jsx(n,{}),e.jsx(a,{...t,balance:null,end:e.jsx(r,{accessibilityLabel:"Upload",name:"upload"})}),e.jsx(n,{}),e.jsx(a,{...t,balance:e.jsxs(x,{children:[e.jsx(i,{as:"h3",color:"fgMuted",display:"block",font:"title3",children:"$3908.01"}),e.jsx(i,{as:"p",color:"fgPositive",display:"block",font:"body",children:"↗ 6.37%"})]}),end:e.jsx(o,{children:e.jsx(m,{})}),icon:null,start:null,title:e.jsx(i,{as:"p",display:"block",font:"label1",children:"SectionHeader"})}),e.jsx(n,{}),e.jsx(a,{...t,balance:e.jsxs(o,{alignItems:"flex-end",gap:1,children:[e.jsx(i,{as:"sub",color:"fgMuted",font:"display3",children:"$3908.01"}),e.jsx(i,{as:"p",color:"fgNegative",display:"block",font:"body",children:"↘ 6.37%"})]}),end:e.jsxs(o,{gap:1,children:[e.jsx(r,{accessibilityLabel:"Left caret",name:"caretLeft"}),e.jsx(r,{accessibilityLabel:"Right caret",name:"caretRight"})]}),icon:null,start:null,title:e.jsx(i,{as:"p",display:"block",font:"label1",children:"SectionHeader"})}),e.jsx(n,{}),e.jsx(a,{...t,end:e.jsx(o,{children:e.jsx(m,{})}),padding:0}),e.jsx(n,{}),e.jsx(a,{...t,balance:null,start:null,title:e.jsx(i,{as:"sub",font:"caption",children:t.title})})]}),Xe={title:"Components/SectionHeader",component:a};s.__docgenInfo={description:"",methods:[],displayName:"Examples"};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => {
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
