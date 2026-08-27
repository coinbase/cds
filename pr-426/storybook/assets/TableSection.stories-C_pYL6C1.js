import{j as e}from"./iframe-CYDANtMt.js";import{V as b}from"./VStack-iXgNewwv.js";import{S as T}from"./Spinner-CXotWqqb.js";import{T as c}from"./Text-0g3rWpAf.js";import{T as n,a as t,b as a}from"./TableRow-DKEQPqcp.js";import{T as i}from"./useTable-XqHyp7CY.js";import{T as s}from"./TableHeader-C4UwhBqx.js";import{T as d}from"./TableFooter-CCU88FMu.js";import"./preload-helper-D9Z9MdNV.js";import"./Cell-D1A-2vVj.js";import"./useCellSpacing-BH3_o_ol.js";import"./sizing-Do56D2dQ.js";import"./HStack-Fh-9TmPm.js";import"./Pressable-BvczHaFK.js";import"./isArray-BJmyNVUi.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";import"./useTheme-C_Ehsh33.js";const k={title:"Components/Table/TableSection",component:n},l=()=>e.jsxs(i,{bordered:!0,variant:"ruled",children:[e.jsx(s,{children:e.jsx(t,{children:e.jsx(a,{subtitle:"This is the TableHeader",title:"TableHeader"})})}),e.jsx(n,{children:e.jsx(t,{children:e.jsx(a,{subtitle:"This is the TableBody",title:"TableBody"})})}),e.jsx(d,{children:e.jsx(t,{children:e.jsx(a,{subtitle:"This is the TableFooter",title:"TableFooter"})})})]}),r=()=>e.jsxs(i,{bordered:!0,variant:"ruled",children:[e.jsx(n,{children:e.jsx(t,{children:e.jsx(a,{subtitle:"This is the TableBody",title:"TableBody"})})}),e.jsx(d,{children:e.jsx(t,{children:e.jsx(a,{subtitle:"This is the TableFooter",title:"TableFooter"})})}),e.jsx(s,{children:e.jsx(t,{children:e.jsx(a,{subtitle:"This is the TableHeader",title:"TableHeader"})})})]}),o=()=>e.jsxs(i,{bordered:!0,variant:"ruled",children:[e.jsx(s,{children:e.jsx(t,{children:e.jsx(a,{title:"TableHeader"})})}),e.jsx(n,{children:e.jsxs(b,{alignItems:"center",justifyContent:"center",minHeight:500,children:[e.jsx(T,{color:"bgPrimary",size:4}),e.jsx(c,{as:"p",color:"fgMuted",display:"block",font:"headline",paddingTop:2,children:"Loading content..."})]})})]});l.__docgenInfo={description:"",methods:[],displayName:"SampleTableSection"};r.__docgenInfo={description:"",methods:[],displayName:"SectionFlowControl"};o.__docgenInfo={description:"",methods:[],displayName:"LoadingStateExample"};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => {
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
