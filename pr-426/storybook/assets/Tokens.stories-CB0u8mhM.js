import{j as e}from"./iframe-BXWLBCkp.js";import{b as i}from"./tokens-BwScSksM.js";import{T as s}from"./TableHeader-knDbjzO0.js";import{T as m}from"./useTable-DMtCjPcp.js";import{a as o,b as t,T as p}from"./TableRow-DyEl9WwT.js";import"./preload-helper-D9Z9MdNV.js";import"./Cell-CB_dChqK.js";import"./useCellSpacing-BuZVtSR4.js";import"./sizing-Do56D2dQ.js";import"./HStack-B6p8qBpp.js";import"./VStack-CnEfMFeL.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./useTheme-BJazYlse.js";import"./Text-Ch_dBU4v.js";const l=()=>e.jsxs(m,{bordered:!0,variant:"ruled",children:[e.jsx(s,{children:e.jsxs(o,{children:[e.jsx(t,{title:"Effects Name"}),e.jsx(t,{title:"Property"}),e.jsx(t,{title:"Value"}),e.jsx(t,{title:"Easing"})]})}),e.jsx(p,{children:Object.entries(i).map(([a,r])=>{const n=()=>r.fromValue?`${r.fromValue} - ${r.toValue}`:String(r.toValue);return e.jsxs(o,{children:[e.jsx(t,{title:a}),e.jsx(t,{title:r.property}),e.jsx(t,{title:n()}),e.jsx(t,{title:r.easing})]})})})]}),P={component:l,title:"Components/Motion/Tokens"};l.__docgenInfo={description:"",methods:[],displayName:"AnimationTokens"};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => {
  return <Table bordered variant="ruled">
      <TableHeader>
        <TableRow>
          <TableCell title="Effects Name" />
          <TableCell title="Property" />
          <TableCell title="Value" />
          <TableCell title="Easing" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {Object.entries(animations).map(([key, value]) => {
        const renderPropertyValue = () => {
          if (value.fromValue) return \`\${value.fromValue} - \${value.toValue}\`;
          return String(value.toValue);
        };
        return <TableRow>
              <TableCell title={key} />
              <TableCell title={value.property} />
              <TableCell title={renderPropertyValue()} />
              <TableCell title={value.easing} />
            </TableRow>;
      })}
      </TableBody>
    </Table>;
}`,...l.parameters?.docs?.source}}};const _=["AnimationTokens"];export{l as AnimationTokens,_ as __namedExportsOrder,P as default};
