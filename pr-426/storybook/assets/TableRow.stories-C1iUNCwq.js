import{j as o}from"./iframe-BXWLBCkp.js";import{B as a}from"./Button-W9Shg4T1.js";import{T as l}from"./Text-Ch_dBU4v.js";import{a as n,T as i,b as r}from"./TableRow-DyEl9WwT.js";import{T as c}from"./useTable-DMtCjPcp.js";import"./preload-helper-D9Z9MdNV.js";import"./Icon-CgDQ3NQp.js";import"./useTheme-BJazYlse.js";import"./Spinner-BAI0lrZ-.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./Cell-CB_dChqK.js";import"./useCellSpacing-BuZVtSR4.js";import"./sizing-Do56D2dQ.js";import"./HStack-B6p8qBpp.js";import"./VStack-CnEfMFeL.js";const E={title:"Components/Table/TableRow",component:n},t=console.log,e=()=>o.jsx(c,{bordered:!0,variant:"ruled",children:o.jsxs(i,{children:[o.jsx(n,{children:o.jsxs(r,{direction:"horizontal",children:[o.jsx(l,{as:"h2",display:"block",font:"headline",children:"Sample Row 1"}),o.jsx(a,{compact:!0,onClick:t,variant:"secondary",children:"Export"})]})}),o.jsx(n,{backgroundColor:"bgAlternate",children:o.jsx(r,{direction:"horizontal",end:o.jsx(a,{compact:!0,onClick:t,variant:"secondary",children:"Export"}),title:"Sample Row 2 (with background set)"})}),o.jsx(n,{disableHoverIndicator:!0,children:o.jsxs(r,{direction:"horizontal",children:[o.jsx(l,{as:"h2",display:"block",font:"headline",children:"Sample Row 3 (disable hover indicator)"}),o.jsx(a,{compact:!0,onClick:t,variant:"secondary",children:"Export"})]})})]})});e.__docgenInfo={description:"",methods:[],displayName:"TableRowExample"};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`() => {
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
