import{j as e,r as c}from"./iframe-CYDANtMt.js";import{T as s}from"./Text-0g3rWpAf.js";import{S as a}from"./Spinner-CXotWqqb.js";import{V as o}from"./VStack-iXgNewwv.js";import{S as n}from"./Spacer-BbrrPdew.js";import"./preload-helper-D9Z9MdNV.js";const f={component:a,title:"Components/Loaders/Spinner"},i=()=>e.jsxs(o,{children:[e.jsx(s,{as:"h1",display:"block",font:"title1",children:"Spinner Default Color"}),e.jsx(n,{vertical:3}),e.jsx(a,{accessibilityLabel:"Loading",size:10})]}),t=()=>e.jsxs(o,{children:[e.jsx(s,{as:"h1",display:"block",font:"title1",children:"Spinner Primary Color"}),e.jsx(n,{vertical:3}),e.jsx(a,{accessibilityLabel:"Loading",color:"bgPrimary",size:10})]}),r=()=>{const[l,p]=c.useState(!0);return c.useEffect(()=>{setTimeout(()=>{p(!1)},1e4)},[]),e.jsxs(o,{children:[e.jsx(s,{as:"h1",display:"block",font:"title1",children:"Spinner With Accessibility Label Update"}),e.jsx(s,{as:"p",display:"block",font:"body",children:'Accessibility label will be updated from "Loading" to "Complete" after 10 seconds.'}),e.jsx(n,{vertical:3}),e.jsx(a,{accessibilityLabel:l?"Loading":"Complete",color:"bgPrimary",size:10})]})};i.__docgenInfo={description:"",methods:[],displayName:"SpinnerDefault"};t.__docgenInfo={description:"",methods:[],displayName:"SpinnerPrimary"};r.__docgenInfo={description:"",methods:[],displayName:"SpinnerWithAccessibility"};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
  return <VStack>
      <Text as="h1" display="block" font="title1">
        Spinner Default Color
      </Text>
      <Spacer vertical={3} />
      <Spinner accessibilityLabel="Loading" size={10} />
    </VStack>;
}`,...i.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`() => {
  return <VStack>
      <Text as="h1" display="block" font="title1">
        Spinner Primary Color
      </Text>
      <Spacer vertical={3} />
      <Spinner accessibilityLabel="Loading" color="bgPrimary" size={10} />
    </VStack>;
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`() => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 10000);
  }, []);
  return <VStack>
      <Text as="h1" display="block" font="title1">
        Spinner With Accessibility Label Update
      </Text>
      <Text as="p" display="block" font="body">
        Accessibility label will be updated from &quot;Loading&quot; to &quot;Complete&quot; after
        10 seconds.
      </Text>
      <Spacer vertical={3} />
      <Spinner accessibilityLabel={loading ? 'Loading' : 'Complete'} color="bgPrimary" size={10} />
    </VStack>;
}`,...r.parameters?.docs?.source}}};const x=["SpinnerDefault","SpinnerPrimary","SpinnerWithAccessibility"];export{i as SpinnerDefault,t as SpinnerPrimary,r as SpinnerWithAccessibility,x as __namedExportsOrder,f as default};
