import{r as a,d as V,j as t,c as H,a5 as W,a6 as B,B as F}from"./iframe-BXWLBCkp.js";import{T as L}from"./Text-Ch_dBU4v.js";import{C as c}from"./Checkbox-M1uAd9ap.js";import{C as Y}from"./ControlGroup-B3uAkggo.js";import{V as J}from"./VStack-CnEfMFeL.js";import"./preload-helper-D9Z9MdNV.js";import"./checkbox-DVjU0upZ.js";import"./tokens-BwScSksM.js";import"./useTheme-BJazYlse.js";import"./Icon-CgDQ3NQp.js";import"./useMotionProps-CS-LE6l8.js";import"./utils-CwomCnHN.js";import"./Control-gdMxvYmV.js";import"./useMergeRefs-DR4sGa7m.js";import"./usePrefixedId-Dfl-0DGQ.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./isRtl-Du0XdnX5.js";import"./motion-minimal-SVRWJYUW.js";const K="checkboxCss-c1un8bs6",O=a.forwardRef(function({children:r,className:o,label:s,"aria-labelledby":i,selectedValues:d,onChange:g,name:u,style:k,testID:C,role:n="group",id:h,...l},I){V()&&(console.warn('CheckboxGroup is deprecated. Use ControlGroup with role="group" instead.'),!s&&!i&&console.warn("Please specify an aria label for the checkbox group."));const v=a.useMemo(()=>a.Children.map(r,_=>{if(!a.isValidElement(_)||_.type!==c)return null;const{value:G,children:E,id:U,...q}=_.props;if(V()&&typeof G>"u")return console.error("Checkboxes inside CheckboxGroup should have values."),null;const A=U??["checkbox-group",u,G].join("-");return{value:G,children:E,id:A,...q}}).filter(Boolean),[r,u]),M=Array.from(d);return t.jsx(Y,{ref:I,ControlComponent:c,"aria-labelledby":i,className:H(K,o),gap:0,hidden:l.hidden,id:h,label:s,name:u,onChange:g,options:v||[],role:n,style:k,tabIndex:l.tabIndex,testID:C,value:M})}),D=a.memo(O);O.__docgenInfo={description:"",methods:[],displayName:"CheckboxGroupWithRef",props:{testID:{required:!1,tsType:{name:"string"},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`},children:{required:!0,tsType:{name:"Array",elements:[{name:"ReactReactElement",raw:"React.ReactElement"}],raw:"React.ReactElement[]"},description:"Checkbox elements that are part of the checkbox group."},label:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Set a label summary for the group of checkboxes."},selectedValues:{required:!0,tsType:{name:"Set",elements:[{name:"CheckboxValue"}],raw:"Set<CheckboxValue>"},description:"Checkbox options that are checked."},className:{required:!1,tsType:{name:"string"},description:""},onChange:{required:!1,tsType:{name:"ReactChangeEventHandler",raw:"React.ChangeEventHandler<HTMLInputElement>",elements:[{name:"HTMLInputElement"}]},description:"Handle change event when pressing on a checkbox option."},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""},role:{defaultValue:{value:"'group'",computed:!1},required:!1}}};const Q=(e,r)=>{const o=a.useMemo(()=>new Set(r),[r]),[s,i]=a.useState(o),d=a.useRef();a.useEffect(()=>{s.size!==0&&s.size!==e.length&&(d.current=s)},[s,e.length,d]);const g=a.useCallback(n=>{i(h=>{if(!n)return new Set(e);const l=new Set(h).add(n);return l.size===e.length&&(d.current=void 0),l})},[i,e]),u=a.useCallback(n=>{i(h=>{if(!n)return new Set;const l=new Set(h);return l.size===0&&(d.current=void 0),l})},[i]),k=a.useCallback(n=>{i(h=>{if(!n){const I=h.size===e.length,v=h.size===0;return I?new Set:v?d.current?d.current:new Set(e):new Set(e)}const l=new Set(h);return l.delete(n)?(l.size===0&&(d.current=void 0),l):(l.add(n),l.size===e.length&&(d.current=void 0),l)})},[i,e]),C=a.useMemo(()=>s.size===0?!1:s.size===e.length?!0:"mixed",[s,e.length]);return[s,{select:g,unselect:u,toggle:k,isAllSelected:C}]},P=(e,r)=>{const[o,{select:s,unselect:i,toggle:d,isAllSelected:g}]=Q(e,r),u=a.useCallback(n=>{s(n?.target?.value)},[s]),k=a.useCallback(n=>{i(n?.target?.value)},[i]),C=a.useCallback(n=>{d(n?.target?.value)},[d]);return[o,{select:u,unselect:k,toggle:C,isAllSelected:g}]},x=()=>{const[e,r]=a.useState(!1);return t.jsx(c,{checked:e,name:"normal-checkbox",onChange:()=>r(o=>!o),children:"Normal"})},f=()=>{const[e,r]=a.useState(!1);return t.jsxs(J,{gap:2,children:[t.jsx(c,{checked:e,controlColor:"bgNegative",name:"control-color-checkbox",onChange:()=>r(o=>!o),children:"Control color"}),t.jsx(c,{background:e?"bgNegative":"bg",borderColor:e?"bgNegative":"bgPositive",checked:e,controlColor:"fg",name:"style-props-checkbox",onChange:()=>r(o=>!o),children:"Style props"}),t.jsx(c,{background:e?"bgNegative":"bg",borderColor:e?"bgNegative":"bgPositive",borderRadius:200,borderWidth:500,color:"bgPrimary",controlColor:"fg",indeterminate:e,name:"indeterminate-checkbox",onChange:()=>r(o=>!o),children:"Style props indeterminate"})]})},y=()=>{const[e,r]=a.useState(!1);return t.jsx(c,{indeterminate:e,name:"indeterminate-checkbox",onChange:()=>r(o=>!o),children:"Indeterminate"})},X="darkNormalCss-del6obg",S=()=>{const[e,r]=a.useState(!1);return t.jsx(W,{activeColorScheme:"dark",theme:B,children:t.jsxs("div",{className:X,children:[" ",t.jsx(c,{checked:e,onChange:()=>r(o=>!o),children:"Normal"})]})})},m=()=>{const[e,r]=a.useState(!1);return t.jsx(c,{checked:e,onChange:()=>r(o=>!o)})};m.parameters={a11y:{config:{rules:[{id:"label",enabled:!1}]}}};const N=()=>t.jsx(c,{checked:!0,disabled:!0,children:"Disabled selected"}),p=()=>t.jsx(c,{readOnly:!0,children:"Read-only unselected"});p.parameters={a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const b=()=>t.jsx(c,{checked:!0,readOnly:!0,children:"Read-only selected"});b.parameters={a11y:{config:{rules:[{id:"color-contrast",enabled:!1}]}}};const R=()=>t.jsx(F,{width:"250px",children:t.jsx(c,{children:"This checkbox has a multi-line label. The checkbox and label should align at the top."})}),w={"fish-taco":"Fish tacos",puttanesca:"Spaghetti alla puttanesca","hamachi-salad":"Hamachi salad","pad-thai":"Pad Thai",pizza:"Margherita Pizza",ramen:"Tonkotsu Ramen"},z=Object.keys(w),j=()=>{const[e,{toggle:r}]=P(z);return t.jsxs(t.Fragment,{children:[t.jsx(L,{as:"h1",display:"block",font:"headline",id:"order-dinner-label-no-select-all",children:"Checkbox Group Default"}),t.jsx(D,{"aria-labelledby":"order-dinner-label-no-select-all",name:"checkbox-group-default",onChange:r,selectedValues:e,children:Object.entries(w).map(([o,s])=>t.jsx(c,{value:o,children:s},o))})]})},Z="gridLayoutCss-gm0igid",T=()=>{const[e,{toggle:r}]=P(z);return t.jsxs(t.Fragment,{children:[t.jsx(L,{as:"h2",display:"block",font:"headline",paddingY:1,children:"Two Column Layout"}),t.jsx(D,{className:Z,name:"checkbox-grid",onChange:r,selectedValues:e,children:Object.entries(w).map(([o,s])=>t.jsx(c,{value:o,children:s},o))})]})},Ce={title:"Components/Checkbox",component:c};x.__docgenInfo={description:"",methods:[],displayName:"Normal"};f.__docgenInfo={description:"",methods:[],displayName:"CustomColor"};y.__docgenInfo={description:"",methods:[],displayName:"Indeterminate"};S.__docgenInfo={description:"",methods:[],displayName:"DarkNormal"};m.__docgenInfo={description:"",methods:[],displayName:"NoLabel"};N.__docgenInfo={description:"",methods:[],displayName:"DisabledUnselected"};p.__docgenInfo={description:"",methods:[],displayName:"ReadOnlyUnselected"};b.__docgenInfo={description:"",methods:[],displayName:"ReadOnlySelected"};R.__docgenInfo={description:"",methods:[],displayName:"MultiLineLabel"};j.__docgenInfo={description:"",methods:[],displayName:"Group"};T.__docgenInfo={description:"",methods:[],displayName:"CustomLayoutCheckboxGroup"};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`() => {
  const [checked, setChecked] = useState(false);
  return <Checkbox checked={checked} name="normal-checkbox" onChange={() => setChecked(s => !s)}>
      Normal
    </Checkbox>;
}`,...x.parameters?.docs?.source}}};f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`() => {
  const [checked, setChecked] = useState(false);
  return <VStack gap={2}>
      <Checkbox checked={checked} controlColor="bgNegative" name="control-color-checkbox" onChange={() => setChecked(s => !s)}>
        Control color
      </Checkbox>
      <Checkbox background={checked ? 'bgNegative' : 'bg'} borderColor={checked ? 'bgNegative' : 'bgPositive'} checked={checked} controlColor="fg" name="style-props-checkbox" onChange={() => setChecked(s => !s)}>
        Style props
      </Checkbox>
      <Checkbox background={checked ? 'bgNegative' : 'bg'} borderColor={checked ? 'bgNegative' : 'bgPositive'} borderRadius={200} borderWidth={500} color="bgPrimary" controlColor="fg" indeterminate={checked} name="indeterminate-checkbox" onChange={() => setChecked(s => !s)}>
        Style props indeterminate
      </Checkbox>
    </VStack>;
}`,...f.parameters?.docs?.source}}};y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`() => {
  const [indeterminate, setIndeterminate] = useState(false);
  return <Checkbox indeterminate={indeterminate} name="indeterminate-checkbox" onChange={() => setIndeterminate(s => !s)}>
      Indeterminate
    </Checkbox>;
}`,...y.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => {
  const [checked, setChecked] = useState(false);
  return <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
      <div className={darkNormalCss}>
        {' '}
        <Checkbox checked={checked} onChange={() => setChecked(s => !s)}>
          Normal
        </Checkbox>
      </div>
    </ThemeProvider>;
}`,...S.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => {
  const [checked, setChecked] = useState(false);
  return <Checkbox checked={checked} onChange={() => setChecked(s => !s)} />;
}`,...m.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`() => <Checkbox checked disabled>
    Disabled selected
  </Checkbox>`,...N.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:"() => <Checkbox readOnly>Read-only unselected</Checkbox>",...p.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`() => <Checkbox checked readOnly>
    Read-only selected
  </Checkbox>`,...b.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`() => <Box width="250px">
    <Checkbox>
      This checkbox has a multi-line label. The checkbox and label should align at the top.
    </Checkbox>
  </Box>`,...R.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`() => {
  const [selectedValues, {
    toggle
  }] = useCheckboxGroupState(optionValues);
  return <>
      <Text as="h1" display="block" font="headline" id="order-dinner-label-no-select-all">
        Checkbox Group Default
      </Text>
      <CheckboxGroup aria-labelledby="order-dinner-label-no-select-all" name="checkbox-group-default" onChange={toggle} selectedValues={selectedValues}>
        {Object.entries(options).map(([value, label]) => <Checkbox key={value} value={value}>
            {label}
          </Checkbox>)}
      </CheckboxGroup>
    </>;
}`,...j.parameters?.docs?.source}}};T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`() => {
  const [selectedValues, {
    toggle
  }] = useCheckboxGroupState(optionValues);
  return <>
      <Text as="h2" display="block" font="headline" paddingY={1}>
        Two Column Layout
      </Text>
      <CheckboxGroup className={gridLayoutCss} name="checkbox-grid" onChange={toggle} selectedValues={selectedValues}>
        {Object.entries(options).map(([value, label]) => <Checkbox key={value} value={value}>
            {label}
          </Checkbox>)}
      </CheckboxGroup>
    </>;
}`,...T.parameters?.docs?.source}}};const xe=["Normal","CustomColor","Indeterminate","DarkNormal","NoLabel","DisabledUnselected","ReadOnlyUnselected","ReadOnlySelected","MultiLineLabel","Group","CustomLayoutCheckboxGroup"];export{f as CustomColor,T as CustomLayoutCheckboxGroup,S as DarkNormal,N as DisabledUnselected,j as Group,y as Indeterminate,R as MultiLineLabel,m as NoLabel,x as Normal,b as ReadOnlySelected,p as ReadOnlyUnselected,xe as __namedExportsOrder,Ce as default};
