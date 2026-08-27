import{r as $,j as e,a5 as D,a6 as E}from"./iframe-CsG_6vZR.js";import{u as F,a as W}from"./assetHub.mock-BTu6l8Yp.js";import{C as T}from"./CellMedia-oeXrSUuB.js";import{S as H}from"./Switch-W8R2Ap4j.js";import{H as q}from"./HStack-DaDYipoP.js";import{T as L}from"./Text-B1CpMNU3.js";import{g as y,M as f}from"./MediaFallback-CwiXVaK8.js";import{C as M}from"./Cell-Z4wq8KY-.js";import{d as A,u as _,c as B,T as V}from"./useTable-CBqxA7OK.js";import{F as x}from"./Fallback-Cm9sE3lp.js";import{T as O}from"./TableHeader-BOKdbdol.js";import{a as h,b as k,T as N}from"./TableRow-B47yfpIa.js";import"./preload-helper-D9Z9MdNV.js";import"./useCellSpacing-BeT6oDTo.js";import"./sizing-Do56D2dQ.js";import"./Icon-DTs0crZh.js";import"./useTheme-CmrOhAty.js";import"./RemoteImage-CCsStlyO.js";import"./utils-y2S18Lx0.js";import"./tokens-BwScSksM.js";import"./Control-DrPBFTYm.js";import"./useMergeRefs-DR4sGa7m.js";import"./usePrefixedId-BL1THI0P.js";import"./Interactable--rqISG90.js";import"./color-Ceo1QMNe.js";import"./isRtl-C5Fon8jH.js";import"./motion-minimal-5s2ikV7b.js";import"./VStack-Cg_Yq2u4.js";import"./Pressable-DDN99tmF.js";import"./isArray-M0ytM-vC.js";const P="tableCellCss-t2r1qzp",r=$.memo(({title:t,start:n,end:o,subtitle:a,testID:l,as:c,outerSpacing:i,innerSpacing:b,disableRandomRectWidth:m,rectWidthVariant:d,...v})=>{const w=A(c),{compact:u}=_(),j=!u&&t?1:.5,S=u?.5:1,g=B(),R=i??g?.outer,I=b??g?.inner;return e.jsx(w,{className:P,"data-testid":l,...v,children:e.jsxs(M,{accessory:o&&e.jsx(f,{testID:"table-cell-fallback-accessory",type:o}),gap:S,innerSpacing:I,media:n&&e.jsx(f,{testID:"table-cell-fallback-media",type:n}),outerSpacing:R,children:[t&&e.jsx(x,{percentage:!0,disableRandomRectWidth:m,height:24,rectWidthVariant:y(d,0),testID:"table-cell-fallback-title",width:45}),a&&e.jsx(x,{percentage:!0,disableRandomRectWidth:m,height:16,paddingTop:j,rectWidthVariant:y(d,1),testID:"table-cell-fallback-subtitle",width:35})]})})});r.displayName="TableCellFallback";r.__docgenInfo={description:"",methods:[],displayName:"TableCellFallback",props:{title:{required:!1,tsType:{name:"boolean"},description:"Display title shimmer."},subtitle:{required:!1,tsType:{name:"boolean"},description:"Display subtitle shimmer."},start:{required:!1,tsType:{name:"union",raw:"'asset' | 'avatar' | 'image' | 'icon' | 'pictogram'",elements:[{name:"literal",value:"'asset'"},{name:"literal",value:"'avatar'"},{name:"literal",value:"'image'"},{name:"literal",value:"'icon'"},{name:"literal",value:"'pictogram'"}]},description:"Display start shimmer with a shape according to type."},end:{required:!1,tsType:{name:"union",raw:"'asset' | 'avatar' | 'image' | 'icon' | 'pictogram'",elements:[{name:"literal",value:"'asset'"},{name:"literal",value:"'avatar'"},{name:"literal",value:"'image'"},{name:"literal",value:"'icon'"},{name:"literal",value:"'pictogram'"}]},description:"Display end shimmer with a shape according to type."},testID:{required:!1,tsType:{name:"string"},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`},disableRandomRectWidth:{required:!1,tsType:{name:"boolean"},description:"Disables randomization of rectangle fallback width."},rectWidthVariant:{required:!1,tsType:{name:"number"},description:`Creates a variant that contains rectangle fallbacks of deterministic width.
Variants map to a predetermined set of width values, which are cycled through repeatedly when the set is exhausted.`}}};const ke={title:"Components/Table/TableCellFallback",component:r},C=["name","ticker","appStatus"],p=["asset","avatar","icon","image","pictogram"],s=()=>{const[t,{toggle:n}]=F(),o=W.slice(0,20);return e.jsx(D,{activeColorScheme:"light",theme:E,children:e.jsxs(V,{bordered:!0,variant:"ruled",children:[e.jsxs(O,{children:[e.jsx(h,{fullWidth:!0,children:e.jsxs(q,{alignItems:"center",flexGrow:1,justifyContent:"space-between",children:[e.jsx(L,{as:"h2",display:"block",font:"display2",children:"Sample Table"}),e.jsx(H,{checked:t,onChange:n,children:"Loading"})]})}),e.jsx(h,{backgroundColor:"bgAlternate",children:C.map(a=>t?e.jsx(r,{disableRandomRectWidth:!0,title:!0},`header-fallback-cell${a}`):e.jsx(k,{title:a},`header-cell-${a}`))})]}),e.jsx(N,{children:o.map((a,l)=>{const c=l%2===0;return e.jsx(h,{children:Object.entries(a).filter(([i])=>C.includes(i)).map(([i,b],m)=>{const d=p[l%p.length];return t?e.jsx(r,{subtitle:!0,title:!0,disableRandomRectWidth:c,rectWidthVariant:c?void 0:l+m,start:p[l%p.length],width:"33%"},`fallback-cell-${i}`):e.jsx(k,{start:d==="image"?e.jsx(T,{source:"https://images.coinbase.com/avatar?s=56",type:"image"}):e.jsx(T,{source:"https://images.coinbase.com/avatar?s=56",type:"avatar"}),subtitle:"Some subtitle",title:`${b}`,width:"33%"},`cell-${i}`)})},`row-${a.name}--${a.appSubmittedAt}`)})})]})})};s.__docgenInfo={description:"",methods:[],displayName:"TableCellFallbackExample"};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => {
  const [loading, {
    toggle
  }] = useToggler();
  const data = assetHubMock.slice(0, 20);
  return <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
      <Table bordered variant="ruled">
        <TableHeader>
          <TableRow fullWidth>
            <HStack alignItems="center" flexGrow={1} justifyContent="space-between">
              <Text as="h2" display="block" font="display2">
                Sample Table
              </Text>
              <Switch checked={loading} onChange={toggle}>
                Loading
              </Switch>
            </HStack>
          </TableRow>
          <TableRow backgroundColor="bgAlternate">
            {LABELS.map(label => loading ? <TableCellFallback key={\`header-fallback-cell\${label}\`} disableRandomRectWidth title /> : <TableCell key={\`header-cell-\${label}\`} title={label} />)}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => {
          const isEven = index % 2 === 0;
          return <TableRow key={\`row-\${row.name}--\${row.appSubmittedAt}\`}>
                {Object.entries(row).filter(([label]) => LABELS.includes(label)).map(([key, val], rowIndex) => {
              const mediaType = mediaTypes[index % mediaTypes.length];
              return loading ? <TableCellFallback key={\`fallback-cell-\${key}\`} subtitle title disableRandomRectWidth={isEven} rectWidthVariant={!isEven ? index + rowIndex : undefined} start={mediaTypes[index % mediaTypes.length]} width="33%" /> : <TableCell key={\`cell-\${key}\`} start={mediaType === 'image' ? <CellMedia source="https://images.coinbase.com/avatar?s=56" type="image" /> : <CellMedia source="https://images.coinbase.com/avatar?s=56" type="avatar" />} subtitle="Some subtitle" title={\`\${val}\`} width="33%" />;
            })}
              </TableRow>;
        })}
        </TableBody>
      </Table>
    </ThemeProvider>;
}`,...s.parameters?.docs?.source}}};const Ce=["TableCellFallbackExample"];export{s as TableCellFallbackExample,Ce as __namedExportsOrder,ke as default};
