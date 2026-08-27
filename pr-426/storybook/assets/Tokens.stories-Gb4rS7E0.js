import{j as e}from"./iframe-CYDANtMt.js";import{b as i}from"./tokens-BwScSksM.js";import{T as s}from"./TableHeader-C4UwhBqx.js";import{T as m}from"./useTable-XqHyp7CY.js";import{a as o,b as t,T as p}from"./TableRow-DKEQPqcp.js";import"./preload-helper-D9Z9MdNV.js";import"./Cell-D1A-2vVj.js";import"./useCellSpacing-BH3_o_ol.js";import"./sizing-Do56D2dQ.js";import"./HStack-Fh-9TmPm.js";import"./VStack-iXgNewwv.js";import"./Pressable-BvczHaFK.js";import"./isArray-BJmyNVUi.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";import"./useTheme-C_Ehsh33.js";import"./Text-0g3rWpAf.js";const l=()=>e.jsxs(m,{bordered:!0,variant:"ruled",children:[e.jsx(s,{children:e.jsxs(o,{children:[e.jsx(t,{title:"Effects Name"}),e.jsx(t,{title:"Property"}),e.jsx(t,{title:"Value"}),e.jsx(t,{title:"Easing"})]})}),e.jsx(p,{children:Object.entries(i).map(([a,r])=>{const n=()=>r.fromValue?`${r.fromValue} - ${r.toValue}`:String(r.toValue);return e.jsxs(o,{children:[e.jsx(t,{title:a}),e.jsx(t,{title:r.property}),e.jsx(t,{title:n()}),e.jsx(t,{title:r.easing})]})})})]}),P={component:l,title:"Components/Motion/Tokens"};l.__docgenInfo={description:"",methods:[],displayName:"AnimationTokens"};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => {
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
