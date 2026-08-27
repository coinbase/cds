import{j as e}from"./iframe-BXWLBCkp.js";import{V as b}from"./VStack-CnEfMFeL.js";import{S as T}from"./Spinner-BAI0lrZ-.js";import{T as c}from"./Text-Ch_dBU4v.js";import{T as n,a as t,b as a}from"./TableRow-DyEl9WwT.js";import{T as i}from"./useTable-DMtCjPcp.js";import{T as s}from"./TableHeader-knDbjzO0.js";import{T as d}from"./TableFooter-BB_DAGCZ.js";import"./preload-helper-D9Z9MdNV.js";import"./Cell-CB_dChqK.js";import"./useCellSpacing-BuZVtSR4.js";import"./sizing-Do56D2dQ.js";import"./HStack-B6p8qBpp.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./useTheme-BJazYlse.js";const k={title:"Components/Table/TableSection",component:n},l=()=>e.jsxs(i,{bordered:!0,variant:"ruled",children:[e.jsx(s,{children:e.jsx(t,{children:e.jsx(a,{subtitle:"This is the TableHeader",title:"TableHeader"})})}),e.jsx(n,{children:e.jsx(t,{children:e.jsx(a,{subtitle:"This is the TableBody",title:"TableBody"})})}),e.jsx(d,{children:e.jsx(t,{children:e.jsx(a,{subtitle:"This is the TableFooter",title:"TableFooter"})})})]}),r=()=>e.jsxs(i,{bordered:!0,variant:"ruled",children:[e.jsx(n,{children:e.jsx(t,{children:e.jsx(a,{subtitle:"This is the TableBody",title:"TableBody"})})}),e.jsx(d,{children:e.jsx(t,{children:e.jsx(a,{subtitle:"This is the TableFooter",title:"TableFooter"})})}),e.jsx(s,{children:e.jsx(t,{children:e.jsx(a,{subtitle:"This is the TableHeader",title:"TableHeader"})})})]}),o=()=>e.jsxs(i,{bordered:!0,variant:"ruled",children:[e.jsx(s,{children:e.jsx(t,{children:e.jsx(a,{title:"TableHeader"})})}),e.jsx(n,{children:e.jsxs(b,{alignItems:"center",justifyContent:"center",minHeight:500,children:[e.jsx(T,{color:"bgPrimary",size:4}),e.jsx(c,{as:"p",color:"fgMuted",display:"block",font:"headline",paddingTop:2,children:"Loading content..."})]})})]});l.__docgenInfo={description:"",methods:[],displayName:"SampleTableSection"};r.__docgenInfo={description:"",methods:[],displayName:"SectionFlowControl"};o.__docgenInfo={description:"",methods:[],displayName:"LoadingStateExample"};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => {
  return <Table bordered variant="ruled">
      <TableHeader>
        <TableRow>
          <TableCell subtitle="This is the TableHeader" title="TableHeader" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell subtitle="This is the TableBody" title="TableBody" />
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell subtitle="This is the TableFooter" title="TableFooter" />
        </TableRow>
      </TableFooter>
    </Table>;
}`,...l.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => {
  return <Table bordered variant="ruled">
      <TableBody>
        <TableRow>
          <TableCell subtitle="This is the TableBody" title="TableBody" />
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell subtitle="This is the TableFooter" title="TableFooter" />
        </TableRow>
      </TableFooter>
      <TableHeader>
        <TableRow>
          <TableCell subtitle="This is the TableHeader" title="TableHeader" />
        </TableRow>
      </TableHeader>
    </Table>;
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => {
  return <Table bordered variant="ruled">
      <TableHeader>
        <TableRow>
          <TableCell title="TableHeader" />
        </TableRow>
      </TableHeader>
      <TableBody>
        <VStack alignItems="center" justifyContent="center" minHeight={500}>
          <Spinner color="bgPrimary" size={4} />
          <Text as="p" color="fgMuted" display="block" font="headline" paddingTop={2}>
            Loading content...
          </Text>
        </VStack>
      </TableBody>
    </Table>;
}`,...o.parameters?.docs?.source}}};const E=["SampleTableSection","SectionFlowControl","LoadingStateExample"];export{o as LoadingStateExample,l as SampleTableSection,r as SectionFlowControl,E as __namedExportsOrder,k as default};
