import{g as O,r as T,j as e,B as E}from"./iframe-CYDANtMt.js";import{r as D}from"./_baseGet-DGzmSmA2.js";import{u as v,a as C}from"./assetHub.mock-D3Nht472.js";import{s as P}from"./startCase-hUN0hSQH.js";import{B as V}from"./Button-DPtA13Wn.js";import{C as H}from"./CellMedia-IoJhBEcv.js";import{S as A}from"./Switch-BjwniDr8.js";import{H as B}from"./HStack-Fh-9TmPm.js";import{I as L}from"./Icon-DRxKkZdt.js";import{V as G}from"./VStack-iXgNewwv.js";import{T as S}from"./TableCaption-Bg86dqyR.js";import{T as h}from"./useTable-XqHyp7CY.js";import{T as y}from"./TableHeader-C4UwhBqx.js";import{a as m,b as s,T as k}from"./TableRow-DKEQPqcp.js";import"./preload-helper-D9Z9MdNV.js";import"./isArray-BJmyNVUi.js";import"./isSymbol-_FF1kV9r.js";import"./_MapCache-TsE-7C0k.js";import"./Pressable-BvczHaFK.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";import"./useTheme-C_Ehsh33.js";import"./eq-CQ4zk1HF.js";import"./_baseSlice-Dbw65BcJ.js";import"./_arrayMap-BkD9PEmT.js";import"./Spinner-CXotWqqb.js";import"./Text-0g3rWpAf.js";import"./useCellSpacing-BH3_o_ol.js";import"./sizing-Do56D2dQ.js";import"./RemoteImage-S3YFINhn.js";import"./utils-CM_X5is-.js";import"./tokens-BwScSksM.js";import"./Control-C-1dn_y_.js";import"./useMergeRefs-DR4sGa7m.js";import"./usePrefixedId-D1yZvkEs.js";import"./isRtl-CGZsgYct.js";import"./motion-minimal-B1h7XI-_.js";import"./Cell-D1A-2vVj.js";var j,R;function N(){if(R)return j;R=1;var n=D();function t(r,o,i){var c=r==null?void 0:n(r,o);return c===void 0?i:c}return j=t,j}var q=N();const x=O(q),z=({data:n,sortBy:t,sortDirection:r})=>(r==="ASC"&&(r="ascending"),r==="DESC"&&(r="descending"),T.useMemo(()=>[...n].sort((o,i)=>r==="descending"?(t?x(o,t):o)>(t?x(i,t):i)?-1:1:(t?x(i,t):i)>(t?x(o,t):o)?-1:1),[n,r,t])),$=T.memo(({direction:n})=>{const t=n==="ascending"?"fgPrimary":"fgMuted",r=n==="descending"?"fgPrimary":"fgMuted";return e.jsxs(G,{gap:.5,children:[e.jsx(E,{marginBottom:-.5,children:e.jsx(L,{active:!0,"aria-hidden":"true",color:t,name:"sortUpCenter",size:"xs",testID:"table-sort-icon-up"})}),e.jsx(E,{marginTop:-.5,children:e.jsx(L,{active:!0,"aria-hidden":"true",color:r,name:"sortDownCenter",size:"xs",testID:"table-sort-icon-down"})})]})});$.displayName="TableCellSortIcon";$.__docgenInfo={description:"",methods:[],displayName:"TableCellSortIcon",props:{direction:{required:!1,tsType:{name:"ReactTdHTMLAttributes['aria-sort']",raw:"React.TdHTMLAttributes<HTMLTableCellElement>['aria-sort']"},description:""}}};const U=({sortBy:n,sortDirection:t,onChange:r})=>function(i){const c=n===i;return{onClick:()=>r(i),color:c?"fgPrimary":"fgMuted",end:e.jsx($,{direction:c?t:void 0}),"aria-sort":c?t:void 0}},w=["name","ticker","appStatus","type","bookmarked"],_=w.slice(0,3),He={title:"Components/Table/Table",component:h},p=()=>{const[n,{toggle:t}]=v(),[r,o]=T.useState("default"),i=C.slice(0,6),c=["default","graph","ruled"],a=l=>{alert(`hi ${l}`)},d=l=>({onClick:l==="Ethereum"?()=>a(l):void 0});return e.jsxs(e.Fragment,{children:[e.jsxs(B,{alignItems:"center",gap:1,justifyContent:"flex-end",paddingBottom:3,children:[c.map(l=>e.jsx(V,{compact:!0,onClick:()=>o(l),variant:l===r?"primary":"secondary",children:l},l)),e.jsx(A,{checked:n,onChange:t,children:"Border"})]}),e.jsxs(h,{bordered:n,variant:r,children:[e.jsx(S,{as:"h2",children:"Sample Table"}),e.jsx(y,{children:e.jsx(m,{backgroundColor:"bgAlternate",children:_.map(l=>e.jsx(s,{title:P(l)},`${l}--idk`))})}),e.jsx(k,{children:i.map(l=>e.jsx(m,{...d(l.name),children:Object.entries(l).filter(([f])=>_.includes(f)).map(([f,F])=>e.jsx(s,{children:F},`${f}--idk`))},`row-${l.name}--${l.appSubmittedAt}`))})]})]})},b=()=>{const[{sortBy:n,sortDirection:t},r]=T.useState({sortBy:"name",sortDirection:"ascending"}),o=z({data:C,sortDirection:t,sortBy:n}),i=T.useCallback(a=>{r({sortBy:a,sortDirection:a===n&&t==="ascending"?"descending":"ascending"})},[n,t]),c=U({sortBy:n,sortDirection:t,onChange:i});return e.jsxs(h,{bordered:!0,maxHeight:500,variant:"ruled",children:[e.jsx(S,{as:"h2",backgroundColor:"bg",children:"Sticky Header + Sorting Table"}),e.jsx(y,{sticky:!0,children:e.jsxs(m,{backgroundColor:"bgAlternate",children:[e.jsx(s,{title:"Asset",...c("name")}),e.jsx(s,{title:"Ticker",...c("name")}),e.jsx(s,{title:"Application Status"})]})}),e.jsx(k,{children:o.map(a=>e.jsxs(m,{children:[e.jsx(s,{title:a.name}),e.jsx(s,{children:a.type}),e.jsx(s,{children:a.appStatus})]},`row-${a.name}--${a.appSubmittedAt}`))})]})},u=()=>{const[n,{toggle:t}]=v(!0),r=C.slice(0,6),o=a=>{alert(`hi ${a}`)},i=a=>({onClick:a==="Ethereum"?()=>o(a):void 0}),c=["20%","10%","30%","20%","30%"];return e.jsxs(e.Fragment,{children:[e.jsx(B,{alignItems:"center",flexGrow:1,justifyContent:"flex-end",paddingBottom:3,children:e.jsx(A,{checked:n,onChange:t,children:"Fixed Layout"})}),e.jsxs(h,{bordered:!0,tableLayout:n?"fixed":"auto",variant:"graph",children:[e.jsx(S,{as:"h2",backgroundColor:"bg",children:"Fixed Layout Table"}),e.jsx(y,{children:e.jsx(m,{backgroundColor:"bgAlternate",children:w.map((a,d)=>e.jsx(s,{title:P(a),width:c[d]},`fixed-table-cell--${a}`))})}),e.jsx(k,{children:r.map(a=>e.jsx(m,{...i(a.name),children:Object.entries(a).filter(([d])=>w.includes(d)).map(([d,l])=>e.jsx(s,{overflow:"truncate",title:`${l} and a little more`},`fixed-table-cell--${d}`))},`row-${a.name}--${a.appSubmittedAt}`))})]})]})},I=["name","ticker","appStatus"],M=["asset","avatar","icon","image","pictogram"],g=()=>{const[n,{toggle:t}]=v(!0),r=C.slice(0,20);return e.jsxs(e.Fragment,{children:[e.jsx(B,{alignItems:"center",justifyContent:"flex-end",paddingBottom:3,children:e.jsx(A,{checked:n,onChange:t,children:"Compact"})}),e.jsxs(h,{bordered:!0,compact:n,variant:"ruled",children:[e.jsx(S,{as:"h2",backgroundColor:"bg",children:"Compact Table"}),e.jsx(y,{children:e.jsx(m,{backgroundColor:"bgAlternate",children:I.map(o=>e.jsx(s,{title:o},`header-cell-${o}`))})}),e.jsxs(k,{children:[e.jsxs(m,{children:[e.jsx(s,{title:"Title"}),e.jsx(s,{title:"Title"}),e.jsx(s,{title:"Title"})]}),e.jsxs(m,{children:[e.jsx(s,{subtitle:"A description",title:"Title"}),e.jsx(s,{subtitle:"A description",title:"Title"}),e.jsx(s,{subtitle:"A description",title:"Title"})]}),r.map((o,i)=>e.jsx(m,{children:Object.entries(o).filter(([c])=>I.includes(c)).map(([c,a])=>{const d=M[i%M.length];return e.jsx(s,{start:d==="image"?e.jsx(H,{source:"https://images.coinbase.com/avatar?s=350",type:"image"}):e.jsx(H,{source:"https://images.coinbase.com/avatar?s=56",type:"avatar"}),subtitle:"Some subtitle",title:`${a}`},`cell-${c}`)})},`row-${o.name}--${o.appSubmittedAt}`))]})]})]})};p.__docgenInfo={description:"",methods:[],displayName:"SampleTable"};b.__docgenInfo={description:"",methods:[],displayName:"StickyHeaderSortingExample"};u.__docgenInfo={description:"",methods:[],displayName:"FixedLayoutExample"};g.__docgenInfo={description:"",methods:[],displayName:"CompactExample"};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => {
  const [hasBorder, {
    toggle
  }] = useToggler();
  const [variant, setVariant] = useState<TableVariant | undefined>('default');
  const data = assetHubMock.slice(0, 6);
  const variants: TableVariant[] = ['default', 'graph', 'ruled'];
  const handlePress = (name: string) => {
    alert(\`hi \${name}\`);
  };
  // Only apply a press event to a few items
  const clickEvents = (name: string) => ({
    onClick: name === 'Ethereum' ? () => handlePress(name) : undefined
  });
  return <>
      <HStack alignItems="center" gap={1} justifyContent="flex-end" paddingBottom={3}>
        {variants.map((v: TableVariant) => <Button key={v} compact onClick={() => setVariant(v)} variant={v === variant ? 'primary' : 'secondary'}>
            {v}
          </Button>)}
        <Switch checked={hasBorder} onChange={toggle}>
          Border
        </Switch>
      </HStack>
      <Table bordered={hasBorder} variant={variant}>
        <TableCaption as="h2">Sample Table</TableCaption>
        <TableHeader>
          <TableRow backgroundColor="bgAlternate">
            {LABELS_SHORT.map(label => <TableCell key={\`\${label}--idk\`} title={startCase(label)} />)}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(row => <TableRow key={\`row-\${row.name}--\${row.appSubmittedAt}\`} {...clickEvents(row.name)}>
              {Object.entries(row).filter(([label]) => LABELS_SHORT.includes(label)).map(([key, val]) => <TableCell key={\`\${key}--idk\`}>{val}</TableCell>)}
            </TableRow>)}
        </TableBody>
      </Table>
    </>;
}`,...p.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`() => {
  const [{
    sortBy,
    sortDirection
  }, setSort] = useState<{
    sortBy: Columns;
    sortDirection: UseSortableCellProps['sortDirection'];
  }>({
    sortBy: 'name',
    sortDirection: 'ascending'
  });

  // Config to handle sortiing
  const data = useSort({
    data: assetHubMock,
    sortDirection,
    sortBy
  });
  const onChange = useCallback((by: Columns) => {
    const flipSort = by === sortBy && sortDirection === 'ascending';
    setSort({
      sortBy: by,
      sortDirection: flipSort ? 'descending' : 'ascending'
    });
  }, [sortBy, sortDirection]);
  const getSortableProps = useSortableCell({
    sortBy,
    sortDirection,
    onChange
  });
  return <Table bordered maxHeight={500} variant="ruled">
      <TableCaption as="h2" backgroundColor="bg">
        Sticky Header + Sorting Table
      </TableCaption>
      <TableHeader sticky>
        <TableRow backgroundColor="bgAlternate">
          <TableCell title="Asset" {...getSortableProps('name')} />
          <TableCell title="Ticker" {...getSortableProps('name')} />
          <TableCell title="Application Status" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map(row => <TableRow key={\`row-\${row.name}--\${row.appSubmittedAt}\`}>
            <TableCell title={row.name} />
            <TableCell>{row.type}</TableCell>
            <TableCell>{row.appStatus}</TableCell>
          </TableRow>)}
      </TableBody>
    </Table>;
}`,...b.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`() => {
  const [isFixed, {
    toggle
  }] = useToggler(true);
  const data = assetHubMock.slice(0, 6);
  const handlePress = (name: string) => {
    alert(\`hi \${name}\`);
  };
  // Only apply a press event to a few items
  const clickEvents = (name: string) => ({
    onClick: name === 'Ethereum' ? () => handlePress(name) : undefined
  });
  const widths = ['20%', '10%', '30%', '20%', '30%'];
  return <>
      <HStack alignItems="center" flexGrow={1} justifyContent="flex-end" paddingBottom={3}>
        <Switch checked={isFixed} onChange={toggle}>
          Fixed Layout
        </Switch>
      </HStack>
      <Table bordered tableLayout={isFixed ? 'fixed' : 'auto'} variant="graph">
        <TableCaption as="h2" backgroundColor="bg">
          Fixed Layout Table
        </TableCaption>
        <TableHeader>
          <TableRow backgroundColor="bgAlternate">
            {LABELS.map((label, index) => <TableCell key={\`fixed-table-cell--\${label}\`} title={startCase(label)} width={widths[index]} />)}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map(row => <TableRow key={\`row-\${row.name}--\${row.appSubmittedAt}\`} {...clickEvents(row.name)}>
              {Object.entries(row).filter(([label]) => LABELS.includes(label)).map(([key, val]) => <TableCell key={\`fixed-table-cell--\${key}\`} overflow="truncate" title={\`\${val} and a little more\`} />)}
            </TableRow>)}
        </TableBody>
      </Table>
    </>;
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`() => {
  const [compact, {
    toggle
  }] = useToggler(true);
  const data = assetHubMock.slice(0, 20);
  return <>
      <HStack alignItems="center" justifyContent="flex-end" paddingBottom={3}>
        <Switch checked={compact} onChange={toggle}>
          Compact
        </Switch>
      </HStack>
      <Table bordered compact={compact} variant="ruled">
        <TableCaption as="h2" backgroundColor="bg">
          Compact Table
        </TableCaption>
        <TableHeader>
          <TableRow backgroundColor="bgAlternate">
            {COMPACT_LABELS.map(label => <TableCell key={\`header-cell-\${label}\`} title={label} />)}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell title="Title" />
            <TableCell title="Title" />
            <TableCell title="Title" />
          </TableRow>
          <TableRow>
            <TableCell subtitle="A description" title="Title" />
            <TableCell subtitle="A description" title="Title" />
            <TableCell subtitle="A description" title="Title" />
          </TableRow>
          {data.map((row, index) => <TableRow key={\`row-\${row.name}--\${row.appSubmittedAt}\`}>
              {Object.entries(row).filter(([label]) => COMPACT_LABELS.includes(label)).map(([key, val]) => {
            const mediaType = mediaTypes[index % mediaTypes.length];
            return <TableCell key={\`cell-\${key}\`} start={mediaType === 'image' ? <CellMedia source="https://images.coinbase.com/avatar?s=350" type="image" /> : <CellMedia source="https://images.coinbase.com/avatar?s=56" type="avatar" />} subtitle="Some subtitle" title={\`\${val}\`} />;
          })}
            </TableRow>)}
        </TableBody>
      </Table>
    </>;
}`,...g.parameters?.docs?.source}}};const Le=["SampleTable","StickyHeaderSortingExample","FixedLayoutExample","CompactExample"];export{g as CompactExample,u as FixedLayoutExample,p as SampleTable,b as StickyHeaderSortingExample,Le as __namedExportsOrder,He as default};
