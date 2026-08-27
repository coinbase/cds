import{r as i,j as e}from"./iframe-CYDANtMt.js";import{u as v}from"./usePreviousValue-B20zW-6t.js";import{D as I}from"./DotCount-DjzjxUju.js";import{u as j}from"./useDimensions-C4mzPCUe.js";import{u as w}from"./Pressable-BvczHaFK.js";import{T as c}from"./Text-0g3rWpAf.js";import{C as D}from"./Collapsible-PtwHvxc0.js";import{H as L}from"./HStack-Fh-9TmPm.js";const q="primaryTabLabelCss-p2ugsa8",C="containerCss-cdackv8",f="hiddenCss-h1li318y",N={primary:{active:"fgPrimary",inactive:"fg"},secondary:{active:"fg",inactive:"fgMuted"}},y=i.memo(({id:n="",active:a,variant:s="primary",count:o=0,max:g,onLayout:u,Component:r,...t})=>{const m=i.useMemo(()=>!a&&s!=="primary",[a,s]),l=i.useMemo(()=>N[s][a?"active":"inactive"],[a,s]),T=v(o),x=i.useId(),d=s==="primary"?"headline":a?"title3":"title4",{observe:k,width:h,x:b}=j(),p=i.useCallback(()=>{u?.(n,{width:h,x:b})},[n,u,h,b]);return w(()=>{p()},[p]),e.jsxs(L,{ref:k,alignItems:"center",children:[m&&e.jsx("span",{className:C,children:r?e.jsxs(e.Fragment,{children:[e.jsx(r,{active:a,id:n,label:t.children}),e.jsx("span",{"aria-hidden":"true",className:f,children:e.jsx(r,{active:a,id:n,label:t.children})})]}):e.jsxs(e.Fragment,{children:[e.jsx(c,{as:"h2",color:l,display:"block",font:d,...t}),e.jsx(c,{as:"h2",color:l,display:"block",font:d,...t,"aria-hidden":"true",className:f})]})}),!m&&(r?e.jsx(r,{active:a,id:n,label:t.children}):e.jsx(c,{as:"h2",color:l,display:"block",font:d,id:x,...t,className:s==="primary"?q:void 0})),e.jsx(D,{collapsed:!o,direction:"horizontal",paddingStart:.5,role:"status",children:e.jsx(I,{accessibilityLabel:`${t.accessibilityLabel??(typeof t.children=="string"?t.children:"")} count: ${o}`,count:(o||T)??0,max:g})})]})});y.displayName="TabLabel";y.__docgenInfo={description:"",methods:[],displayName:"TabLabel",props:{testID:{required:!1,tsType:{name:"string"},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`},active:{required:!1,tsType:{name:"boolean"},description:"Identify the active tab"},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Display title to render as the TabLabel."},onPress:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback to fire when pressed"},onLayout:{required:!1,tsType:{name:"signature",type:"function",raw:"(key: string, props: TabIndicatorProps) => void",signature:{arguments:[{type:{name:"string"},name:"key"},{type:{name:"intersection",raw:`SharedProps & {
  /** The width of the active TabLabel. */
  width: number;
  /** The xPosition of the active TabLabel. */
  x: number;
  /** This should always match the background color of the parent container
   * @default: 'bg'
   */
  background?: ThemeVars.Color;
}`,elements:[{name:"signature",type:"object",raw:`{
  /**
   * Used to locate this element in unit and end-to-end tests.
   * Under the hood, testID translates to data-testid on Web. On Mobile, testID
   * stays the same - testID
   */
  testID?: string;
}`,signature:{properties:[{key:"testID",value:{name:"string",required:!1},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`}]}},{name:"signature",type:"object",raw:`{
  /** The width of the active TabLabel. */
  width: number;
  /** The xPosition of the active TabLabel. */
  x: number;
  /** This should always match the background color of the parent container
   * @default: 'bg'
   */
  background?: ThemeVars.Color;
}`,signature:{properties:[{key:"width",value:{name:"number",required:!0},description:"The width of the active TabLabel."},{key:"x",value:{name:"number",required:!0},description:"The xPosition of the active TabLabel."},{key:"background",value:{name:"ThemeVars.Color",required:!1},description:`This should always match the background color of the parent container
@default: 'bg'`}]}}]},name:"props"}],return:{name:"void"}}},description:""},id:{defaultValue:{value:"''",computed:!1},required:!1},variant:{defaultValue:{value:"'primary'",computed:!1},required:!1},count:{defaultValue:{value:"0",computed:!1},required:!1}}};export{y as T};
