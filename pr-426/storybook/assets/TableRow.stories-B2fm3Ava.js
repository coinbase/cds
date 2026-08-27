import{j as o}from"./iframe-CYDANtMt.js";import{B as a}from"./Button-DPtA13Wn.js";import{T as l}from"./Text-0g3rWpAf.js";import{a as n,T as i,b as r}from"./TableRow-DKEQPqcp.js";import{T as c}from"./useTable-XqHyp7CY.js";import"./preload-helper-D9Z9MdNV.js";import"./Icon-DRxKkZdt.js";import"./useTheme-C_Ehsh33.js";import"./Spinner-CXotWqqb.js";import"./Pressable-BvczHaFK.js";import"./isArray-BJmyNVUi.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";import"./Cell-D1A-2vVj.js";import"./useCellSpacing-BH3_o_ol.js";import"./sizing-Do56D2dQ.js";import"./HStack-Fh-9TmPm.js";import"./VStack-iXgNewwv.js";const E={title:"Components/Table/TableRow",component:n},t=console.log,e=()=>o.jsx(c,{bordered:!0,variant:"ruled",children:o.jsxs(i,{children:[o.jsx(n,{children:o.jsxs(r,{direction:"horizontal",children:[o.jsx(l,{as:"h2",display:"block",font:"headline",children:"Sample Row 1"}),o.jsx(a,{compact:!0,onClick:t,variant:"secondary",children:"Export"})]})}),o.jsx(n,{backgroundColor:"bgAlternate",children:o.jsx(r,{direction:"horizontal",end:o.jsx(a,{compact:!0,onClick:t,variant:"secondary",children:"Export"}),title:"Sample Row 2 (with background set)"})}),o.jsx(n,{disableHoverIndicator:!0,children:o.jsxs(r,{direction:"horizontal",children:[o.jsx(l,{as:"h2",display:"block",font:"headline",children:"Sample Row 3 (disable hover indicator)"}),o.jsx(a,{compact:!0,onClick:t,variant:"secondary",children:"Export"})]})})]})});e.__docgenInfo={description:"",methods:[],displayName:"TableRowExample"};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`() => {
  return <Table bordered variant="ruled">
      <TableBody>
        <TableRow>
          <TableCell direction="horizontal">
            <Text as="h2" display="block" font="headline">
              Sample Row 1
            </Text>
            <Button compact onClick={handleClick} variant="secondary">
              Export
            </Button>
          </TableCell>
        </TableRow>
        <TableRow backgroundColor="bgAlternate">
          <TableCell direction="horizontal" end={<Button compact onClick={handleClick} variant="secondary">
                Export
              </Button>} title="Sample Row 2 (with background set)" />
        </TableRow>
        <TableRow disableHoverIndicator>
          <TableCell direction="horizontal">
            <Text as="h2" display="block" font="headline">
              Sample Row 3 (disable hover indicator)
            </Text>
            <Button compact onClick={handleClick} variant="secondary">
              Export
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>;
}`,...e.parameters?.docs?.source}}};const g=["TableRowExample"];export{e as TableRowExample,g as __namedExportsOrder,E as default};
