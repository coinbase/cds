import{j as e,r as u}from"./iframe-CYDANtMt.js";import{a as p}from"./assets-CEwpm_uP.js";import{S as a}from"./SectionHeader-CmWJMk3V.js";import{S as y}from"./SelectChip-BvtoXLCo.js";import{V as x}from"./VStack-iXgNewwv.js";import{D as n}from"./Divider-CG0S6-JI.js";import{H as o}from"./HStack-Fh-9TmPm.js";import{S as k}from"./SearchInput-DFEQ8wDX.js";import{B as H}from"./Button-DPtA13Wn.js";import{I as r}from"./IconButton-D-CYL-b9.js";import{T as i}from"./Text-0g3rWpAf.js";import{L as v}from"./Link-Bl0BbAK9.js";import{T as L}from"./Tooltip-D5095Ene.js";import{I as T}from"./Icon-DRxKkZdt.js";import{R as b}from"./RemoteImage-S3YFINhn.js";import{S as w}from"./SelectOption-D3fv76Hr.js";import{C as P}from"./CellMedia-IoJhBEcv.js";import"./preload-helper-D9Z9MdNV.js";import"./useMergeRefs-DR4sGa7m.js";import"./useRefocusTrigger-7TqcuL-y.js";import"./FocusTrap-D5jofIBF.js";import"./debounce-fynzmAtJ.js";import"./AnimatedCaret-R2z7TxpB.js";import"./collapsible-BAneA-61.js";import"./tokens-BwScSksM.js";import"./context-C9K9uJvD.js";import"./useMotionProps-BF3bCUsm.js";import"./utils-CM_X5is-.js";import"./index-CAK1E_4V.js";import"./motion-minimal-B1h7XI-_.js";import"./MediaChip-2PB0UFrW.js";import"./Chip-DQPBsLRY.js";import"./Pressable-BvczHaFK.js";import"./isArray-BJmyNVUi.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";import"./useTheme-C_Ehsh33.js";import"./Dropdown-CpCPWRqg.js";import"./index-B3W2yIJg.js";import"./useBreakpoints-Bxk0TUW-.js";import"./ModalWrapper-TkjI7R_Y.js";import"./NewAnimatePresence-BIvSMOo2.js";import"./index-DaxQGrHc.js";import"./use-unmount-effect-DjWyEMV9.js";import"./useScrollBlocker-smLDx_Od.js";import"./Overlay-BrSXLw2H.js";import"./OverlayContentContext-D3LfdOuR.js";import"./Portal-BNKVVywf.js";import"./Popover-CdSD4lsc.js";import"./dropdown-CDhCThJm.js";import"./InputIcon-DVp1nZL_.js";import"./InputIconButton-CL-x4fcy.js";import"./TextInput-D1xg7XYw.js";import"./usePrefixedId-D1yZvkEs.js";import"./HelperText-0iJbV5oL.js";import"./InputLabel-BwQhf82V.js";import"./InputStack-uMkha90v.js";import"./ColorSurge-COlvd6LS.js";import"./use-animation-B-MH_N0S.js";import"./NativeInput-Dr3zj32e.js";import"./Spinner-CXotWqqb.js";import"./TooltipContent-BT-L0t0g.js";import"./select-Em8pkxbY.js";import"./Cell-D1A-2vVj.js";import"./useCellSpacing-BH3_o_ol.js";import"./sizing-Do56D2dQ.js";import"./CellAccessory-Cln9vUz5.js";import"./isRtl-CGZsgYct.js";const f=[{title:"Polygon",value:"polygon",imageUrl:p.polygon.imageUrl},{title:"Ethereum",value:"ethereum",imageUrl:p.eth.imageUrl},{title:"DAI",value:"dai",imageUrl:p.dai.imageUrl}],t={title:"SectionHeader",start:e.jsx(b,{shape:"circle",size:"m",source:p.btc.imageUrl}),icon:e.jsx(L,{content:"Tooltip content",placement:"right",children:e.jsx(T,{active:!0,color:"fg",name:"info",size:"xs"})}),balance:e.jsxs(o,{alignItems:"flex-end",flexWrap:"wrap",gap:.5,children:[e.jsx(i,{as:"h3",color:"fgMuted",display:"block",font:"title3",numberOfLines:1,children:"$3,9081.01"}),e.jsx(i,{as:"p",color:"fgPositive",display:"block",font:"body",children:"↗ 6.37%"})]}),description:"Add up to 2 lines of body copy."},m=()=>{const[l,h]=u.useState(),g=e.jsx(x,{children:f.map(({title:d,value:c,imageUrl:S})=>e.jsx(w,{media:e.jsx(P,{source:S,type:"asset"}),title:d,value:c},c))}),j=u.useCallback(d=>h(f.find(({value:c})=>c===d)),[]);return e.jsx(o,{justifyContent:"flex-end",width:"100%",children:e.jsx(y,{active:l!==void 0,content:g,minWidth:200,onChange:j,placeholder:"Networks",start:l&&e.jsx(b,{source:l?.imageUrl}),value:l?l.value:void 0,valueLabel:l?l.title:void 0})})},s=()=>e.jsxs(x,{gap:0,left:0,position:"absolute",top:0,width:"100%",children:[e.jsx(a,{title:t.title}),e.jsx(n,{}),e.jsx(a,{end:e.jsx(m,{}),title:t.title}),e.jsx(n,{}),e.jsxs(o,{flexWrap:"wrap",gap:1,justifyContent:"space-between",padding:2,paddingX:4,children:[e.jsx(a,{...t,icon:null,paddingX:0,paddingY:0}),e.jsx(o,{flexGrow:1,maxWidth:475,children:e.jsx(k,{compact:!0,onChangeText:()=>{},placeholder:"Placeholder",value:""})})]}),e.jsx(n,{}),e.jsx(a,{...t,balance:null,end:e.jsx(H,{compact:!0,variant:"secondary",children:"Button"})}),e.jsx(n,{}),e.jsx(a,{...t,balance:null,end:e.jsxs(o,{gap:1,children:[e.jsx(r,{accessibilityLabel:"Left caret",name:"caretLeft"}),e.jsx(r,{accessibilityLabel:"Right caret",name:"caretRight"})]})}),e.jsx(n,{}),e.jsx(a,{...t,balance:null,end:e.jsx(i,{as:"label",font:"headline",children:e.jsx(v,{href:"http://www.coinbase.com",target:"_blank",children:"See all"})})}),e.jsx(n,{}),e.jsx(a,{...t,balance:null,end:e.jsx(r,{accessibilityLabel:"Upload",name:"upload"})}),e.jsx(n,{}),e.jsx(a,{...t,balance:e.jsxs(x,{children:[e.jsx(i,{as:"h3",color:"fgMuted",display:"block",font:"title3",children:"$3908.01"}),e.jsx(i,{as:"p",color:"fgPositive",display:"block",font:"body",children:"↗ 6.37%"})]}),end:e.jsx(o,{children:e.jsx(m,{})}),icon:null,start:null,title:e.jsx(i,{as:"p",display:"block",font:"label1",children:"SectionHeader"})}),e.jsx(n,{}),e.jsx(a,{...t,balance:e.jsxs(o,{alignItems:"flex-end",gap:1,children:[e.jsx(i,{as:"sub",color:"fgMuted",font:"display3",children:"$3908.01"}),e.jsx(i,{as:"p",color:"fgNegative",display:"block",font:"body",children:"↘ 6.37%"})]}),end:e.jsxs(o,{gap:1,children:[e.jsx(r,{accessibilityLabel:"Left caret",name:"caretLeft"}),e.jsx(r,{accessibilityLabel:"Right caret",name:"caretRight"})]}),icon:null,start:null,title:e.jsx(i,{as:"p",display:"block",font:"label1",children:"SectionHeader"})}),e.jsx(n,{}),e.jsx(a,{...t,end:e.jsx(o,{children:e.jsx(m,{})}),padding:0}),e.jsx(n,{}),e.jsx(a,{...t,balance:null,start:null,title:e.jsx(i,{as:"sub",font:"caption",children:t.title})})]}),Xe={title:"Components/SectionHeader",component:a};s.__docgenInfo={description:"",methods:[],displayName:"Examples"};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => {
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
