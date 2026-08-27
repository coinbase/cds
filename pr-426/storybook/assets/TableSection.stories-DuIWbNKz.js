import{j as e}from"./iframe-CsG_6vZR.js";import{V as b}from"./VStack-Cg_Yq2u4.js";import{S as T}from"./Spinner-C8x8bhOH.js";import{T as c}from"./Text-B1CpMNU3.js";import{T as n,a as t,b as a}from"./TableRow-B47yfpIa.js";import{T as i}from"./useTable-CBqxA7OK.js";import{T as s}from"./TableHeader-BOKdbdol.js";import{T as d}from"./TableFooter-Dswr_5IC.js";import"./preload-helper-D9Z9MdNV.js";import"./Cell-Z4wq8KY-.js";import"./useCellSpacing-BeT6oDTo.js";import"./sizing-Do56D2dQ.js";import"./HStack-DaDYipoP.js";import"./Pressable-DDN99tmF.js";import"./isArray-M0ytM-vC.js";import"./Interactable--rqISG90.js";import"./color-Ceo1QMNe.js";import"./useTheme-CmrOhAty.js";const k={title:"Components/Table/TableSection",component:n},l=()=>e.jsxs(i,{bordered:!0,variant:"ruled",children:[e.jsx(s,{children:e.jsx(t,{children:e.jsx(a,{subtitle:"This is the TableHeader",title:"TableHeader"})})}),e.jsx(n,{children:e.jsx(t,{children:e.jsx(a,{subtitle:"This is the TableBody",title:"TableBody"})})}),e.jsx(d,{children:e.jsx(t,{children:e.jsx(a,{subtitle:"This is the TableFooter",title:"TableFooter"})})})]}),r=()=>e.jsxs(i,{bordered:!0,variant:"ruled",children:[e.jsx(n,{children:e.jsx(t,{children:e.jsx(a,{subtitle:"This is the TableBody",title:"TableBody"})})}),e.jsx(d,{children:e.jsx(t,{children:e.jsx(a,{subtitle:"This is the TableFooter",title:"TableFooter"})})}),e.jsx(s,{children:e.jsx(t,{children:e.jsx(a,{subtitle:"This is the TableHeader",title:"TableHeader"})})})]}),o=()=>e.jsxs(i,{bordered:!0,variant:"ruled",children:[e.jsx(s,{children:e.jsx(t,{children:e.jsx(a,{title:"TableHeader"})})}),e.jsx(n,{children:e.jsxs(b,{alignItems:"center",justifyContent:"center",minHeight:500,children:[e.jsx(T,{color:"bgPrimary",size:4}),e.jsx(c,{as:"p",color:"fgMuted",display:"block",font:"headline",paddingTop:2,children:"Loading content..."})]})})]});l.__docgenInfo={description:"",methods:[],displayName:"SampleTableSection"};r.__docgenInfo={description:"",methods:[],displayName:"SectionFlowControl"};o.__docgenInfo={description:"",methods:[],displayName:"LoadingStateExample"};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => {
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
