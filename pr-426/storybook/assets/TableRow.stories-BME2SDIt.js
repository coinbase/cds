import{j as o}from"./iframe-CsG_6vZR.js";import{B as a}from"./Button-D2WSek5T.js";import{T as l}from"./Text-B1CpMNU3.js";import{a as n,T as i,b as r}from"./TableRow-B47yfpIa.js";import{T as c}from"./useTable-CBqxA7OK.js";import"./preload-helper-D9Z9MdNV.js";import"./Icon-DTs0crZh.js";import"./useTheme-CmrOhAty.js";import"./Spinner-C8x8bhOH.js";import"./Pressable-DDN99tmF.js";import"./isArray-M0ytM-vC.js";import"./Interactable--rqISG90.js";import"./color-Ceo1QMNe.js";import"./Cell-Z4wq8KY-.js";import"./useCellSpacing-BeT6oDTo.js";import"./sizing-Do56D2dQ.js";import"./HStack-DaDYipoP.js";import"./VStack-Cg_Yq2u4.js";const E={title:"Components/Table/TableRow",component:n},t=console.log,e=()=>o.jsx(c,{bordered:!0,variant:"ruled",children:o.jsxs(i,{children:[o.jsx(n,{children:o.jsxs(r,{direction:"horizontal",children:[o.jsx(l,{as:"h2",display:"block",font:"headline",children:"Sample Row 1"}),o.jsx(a,{compact:!0,onClick:t,variant:"secondary",children:"Export"})]})}),o.jsx(n,{backgroundColor:"bgAlternate",children:o.jsx(r,{direction:"horizontal",end:o.jsx(a,{compact:!0,onClick:t,variant:"secondary",children:"Export"}),title:"Sample Row 2 (with background set)"})}),o.jsx(n,{disableHoverIndicator:!0,children:o.jsxs(r,{direction:"horizontal",children:[o.jsx(l,{as:"h2",display:"block",font:"headline",children:"Sample Row 3 (disable hover indicator)"}),o.jsx(a,{compact:!0,onClick:t,variant:"secondary",children:"Export"})]})})]})});e.__docgenInfo={description:"",methods:[],displayName:"TableRowExample"};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`() => {
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
