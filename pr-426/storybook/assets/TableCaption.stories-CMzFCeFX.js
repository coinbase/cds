import{j as a}from"./iframe-CYDANtMt.js";import{V as t}from"./VStack-iXgNewwv.js";import{T as e}from"./TableCaption-Bg86dqyR.js";import{T as r}from"./useTable-XqHyp7CY.js";import"./preload-helper-D9Z9MdNV.js";import"./useCellSpacing-BH3_o_ol.js";import"./sizing-Do56D2dQ.js";import"./Text-0g3rWpAf.js";const u={title:"Components/Table/TableCaption",component:e},p={outer:{padding:1},inner:{padding:1}},i={padding:3},n=()=>a.jsxs(t,{gap:2,children:[a.jsx(r,{bordered:!0,variant:"ruled",children:a.jsx(e,{children:"Default Spacing"})}),a.jsx(r,{bordered:!0,cellSpacing:p,variant:"ruled",children:a.jsx(e,{outerSpacing:i,children:"Outer Spacing: { spacing: 3 }"})}),a.jsx(r,{bordered:!0,cellSpacing:p,variant:"ruled",children:a.jsx(e,{innerSpacing:i,children:"Inner Spacing: { spacing: 3 }"})}),a.jsx(r,{bordered:!0,cellSpacing:p,variant:"ruled",children:a.jsx(e,{innerSpacing:i,outerSpacing:i,children:"Outer Spacing: { spacing: 3 } + Inner Spacing: { spacing: 3 }"})})]});n.__docgenInfo={description:"",methods:[],displayName:"SpacingExamples"};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => {
  return <VStack gap={2}>
      <Table bordered variant="ruled">
        <TableCaption>Default Spacing</TableCaption>
      </Table>
      <Table bordered cellSpacing={TABLE_SPACING} variant="ruled">
        <TableCaption outerSpacing={CAPTION_SPACING}>
          {'Outer Spacing: { spacing: 3 }'}
        </TableCaption>
      </Table>
      <Table bordered cellSpacing={TABLE_SPACING} variant="ruled">
        <TableCaption innerSpacing={CAPTION_SPACING}>
          {'Inner Spacing: { spacing: 3 }'}
        </TableCaption>
      </Table>
      <Table bordered cellSpacing={TABLE_SPACING} variant="ruled">
        <TableCaption innerSpacing={CAPTION_SPACING} outerSpacing={CAPTION_SPACING}>
          {'Outer Spacing: { spacing: 3 } + Inner Spacing: { spacing: 3 }'}
        </TableCaption>
      </Table>
    </VStack>;
}`,...n.parameters?.docs?.source}}};const b=["SpacingExamples"];export{n as SpacingExamples,b as __namedExportsOrder,u as default};
