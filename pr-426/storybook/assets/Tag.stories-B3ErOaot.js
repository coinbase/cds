import{j as a}from"./iframe-CYDANtMt.js";import{s as p}from"./startCase-hUN0hSQH.js";import{I as m}from"./Icon-DRxKkZdt.js";import{T as o}from"./Tag-CqGRaJHc.js";import{V as i}from"./VStack-iXgNewwv.js";import"./preload-helper-D9Z9MdNV.js";import"./_baseSlice-Dbw65BcJ.js";import"./isArray-BJmyNVUi.js";import"./_arrayMap-BkD9PEmT.js";import"./isSymbol-_FF1kV9r.js";import"./useTheme-C_Ehsh33.js";import"./Text-0g3rWpAf.js";const _={title:"Components/Tag",component:o},g={colorScheme:["green","purple","blue","yellow","red","gray"]},h={default:[{children:"Default tag",colorScheme:"blue"}],all:[...g.colorScheme.map(e=>({intent:"informational",emphasis:"high",colorScheme:e,children:`${p(e)} (High Informational)`})),...g.colorScheme.map(e=>({intent:"promotional",colorScheme:e,children:`${p(e)} (High)`})),...g.colorScheme.map(e=>({intent:"informational",colorScheme:e,children:`${p(e)} (Low)`})),...g.colorScheme.map(e=>({intent:"promotional",emphasis:"low",colorScheme:e,children:`${p(e)} (Low Promotional)`}))],wildcard:[{children:"Atlanta",background:"blue100",color:"red10"},{children:"Los Angeles",intent:"promotional",background:"yellow30",color:"purple80"}],truncated:[{children:"Truncate this long long tag",colorScheme:"green",maxWidth:150},{children:"Don't truncate this long long tag",colorScheme:"green"}]},r=()=>a.jsx(o,{...h.default[0]}),t=()=>a.jsx(i,{alignItems:"flex-start",flexWrap:"nowrap",gap:2,padding:.5,children:h.all.map(e=>a.jsx(o,{...e},`tag-${e.intent}-${e.colorScheme}-${e.children}`))}),n=()=>a.jsx(i,{alignItems:"flex-start",flexWrap:"nowrap",gap:2,padding:.5,children:h.wildcard.map(e=>a.jsx(o,{...e},`tag-wildcard-${e.children}-${e.background||""}-${e.color||""}`))}),s=()=>a.jsx(i,{alignItems:"flex-start",flexWrap:"nowrap",gap:2,padding:.5,children:h.truncated.map(e=>{const u=`tag-truncated-${e.children}-${"maxWidth"in e?e.maxWidth:"full"}`;return a.jsx(o,{...e},u)})}),c=()=>a.jsxs(i,{alignItems:"flex-start",flexWrap:"nowrap",gap:2,padding:.5,children:[a.jsx(o,{colorScheme:"blue",startIcon:"add",children:"Start icon"}),a.jsx(o,{colorScheme:"green",endIcon:"add",children:"End icon"}),a.jsx(o,{colorScheme:"purple",endIcon:"add",startIcon:"add",children:"Both icons"}),a.jsx(o,{colorScheme:"red",endIcon:"add",intent:"promotional",startIcon:"add",children:"Promotional with icons"})]}),d=()=>a.jsxs(i,{alignItems:"flex-start",flexWrap:"nowrap",gap:2,padding:.5,children:[a.jsx(o,{colorScheme:"blue",start:a.jsx(m,{color:"fgNegative",name:"add",size:"xs"}),children:"Custom start node"}),a.jsx(o,{colorScheme:"green",end:a.jsx(m,{color:"fgPositive",name:"add",size:"xs"}),children:"Custom end node"}),a.jsx(o,{colorScheme:"purple",end:a.jsx(m,{color:"fgNegative",name:"close",size:"xs"}),start:a.jsx(m,{color:"fgPositive",name:"add",size:"xs"}),children:"Both custom nodes"})]}),x={padding:0,margin:0,fontSize:"var(--fontSize-label1)",lineHeight:"var(--lineHeight-label1)",fontWeight:"var(--fontWeight-label1)",fontFamily:"var(--fontFamily-label1)"},l=()=>a.jsx("div",{style:{background:"rgb(var(--blue0))",color:"rgb(var(--blue60))",borderRadius:4,padding:"2px 4px"},children:a.jsx("span",{style:x,children:"HTML tag"})});r.__docgenInfo={description:"",methods:[],displayName:"Default"};t.__docgenInfo={description:"",methods:[],displayName:"All"};n.__docgenInfo={description:"",methods:[],displayName:"Wildcard"};s.__docgenInfo={description:"",methods:[],displayName:"Truncated"};c.__docgenInfo={description:"",methods:[],displayName:"WithIcons"};d.__docgenInfo={description:"",methods:[],displayName:"WithCustomNodes"};l.__docgenInfo={description:"",methods:[],displayName:"HtmlTag"};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"() => <Tag {...tagStories.default[0]} />",...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:'() => <VStack alignItems="flex-start" flexWrap="nowrap" gap={2} padding={0.5}>\n    {tagStories.all.map(props => <Tag key={`tag-${props.intent}-${props.colorScheme}-${props.children}`} {...props} />)}\n  </VStack>',...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`() => <VStack alignItems="flex-start" flexWrap="nowrap" gap={2} padding={0.5}>
    {tagStories.wildcard.map(props => <Tag key={\`tag-wildcard-\${props.children}-\${props.background || ''}-\${props.color || ''}\`} {...props} />)}
  </VStack>`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => <VStack alignItems="flex-start" flexWrap="nowrap" gap={2} padding={0.5}>
    {tagStories.truncated.map(props => {
    const keyString = \`tag-truncated-\${props.children}-\${'maxWidth' in props ? props.maxWidth : 'full'}\`;
    return <Tag key={keyString} {...props} />;
  })}
  </VStack>`,...s.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`() => <VStack alignItems="flex-start" flexWrap="nowrap" gap={2} padding={0.5}>
    <Tag colorScheme="blue" startIcon="add">
      Start icon
    </Tag>
    <Tag colorScheme="green" endIcon="add">
      End icon
    </Tag>
    <Tag colorScheme="purple" endIcon="add" startIcon="add">
      Both icons
    </Tag>
    <Tag colorScheme="red" endIcon="add" intent="promotional" startIcon="add">
      Promotional with icons
    </Tag>
  </VStack>`,...c.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => <VStack alignItems="flex-start" flexWrap="nowrap" gap={2} padding={0.5}>
    <Tag colorScheme="blue" start={<Icon color="fgNegative" name="add" size="xs" />}>
      Custom start node
    </Tag>
    <Tag colorScheme="green" end={<Icon color="fgPositive" name="add" size="xs" />}>
      Custom end node
    </Tag>
    <Tag colorScheme="purple" end={<Icon color="fgNegative" name="close" size="xs" />} start={<Icon color="fgPositive" name="add" size="xs" />}>
      Both custom nodes
    </Tag>
  </VStack>`,...d.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => <div style={{
  background: 'rgb(var(--blue0))',
  color: 'rgb(var(--blue60))',
  borderRadius: 4,
  padding: '2px 4px'
}}>
    <span style={textStyles}>HTML tag</span>
  </div>`,...l.parameters?.docs?.source}}};const N=["Default","All","Wildcard","Truncated","WithIcons","WithCustomNodes","HtmlTag"];export{t as All,r as Default,l as HtmlTag,s as Truncated,n as Wildcard,d as WithCustomNodes,c as WithIcons,N as __namedExportsOrder,_ as default};
