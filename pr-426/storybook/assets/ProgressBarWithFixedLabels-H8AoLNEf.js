import{r as c,j as a,B as b,c as h}from"./iframe-CsG_6vZR.js";import{V as w}from"./VStack-Cg_Yq2u4.js";import{i as p}from"./isRtl-C5Fon8jH.js";import{P as L}from"./ProgressTextLabel-DOes8uma.js";const P=e=>typeof e=="number"?{value:e}:{value:e.value,render:e.render},f=c.memo(({label:e,visuallyDisabled:r,disableAnimateOnMount:t,style:n,className:l})=>{const{value:i,render:o}=P(e);return a.jsx(L,{className:l,color:"fg",disableAnimateOnMount:t,disabled:r,renderLabel:o,style:n,value:i})}),y=c.memo(({label:e,position:r,visuallyDisabled:t,disableAnimateOnMount:n,style:l,className:i})=>a.jsx("span",{"data-testid":`cds-progress-bar-fixed-label-${r}`,children:a.jsx(f,{className:i,disableAnimateOnMount:n,label:e,style:l,visuallyDisabled:t})})),R=c.memo(({startLabel:e,endLabel:r,visuallyDisabled:t,disableAnimateOnMount:n,paddingBottom:l,paddingTop:i,styles:o,classNames:d})=>{const s=[];return typeof e<"u"?s.push(a.jsx(y,{className:d?.startLabel,disableAnimateOnMount:n,label:e,position:"start",style:o?.startLabel,visuallyDisabled:t},"start-label")):s.push(a.jsx("div",{},"end-label-spacer")),typeof r<"u"?s.push(a.jsx(y,{className:d?.endLabel,disableAnimateOnMount:n,label:r,position:"end",style:o?.endLabel,visuallyDisabled:t},"end-label")):s.push(a.jsx("div",{},"start-label-spacer")),p()&&s.reverse(),a.jsx(b,{alignItems:"center",className:d?.labelContainer,justifyContent:"space-between",paddingBottom:l,paddingTop:i,style:o?.labelContainer,testID:"cds-progress-label-container",width:"100%",children:s})}),C=c.memo(({startLabel:e,endLabel:r,labelPlacement:t="beside",disableAnimateOnMount:n,disabled:l=!1,children:i,testID:o,style:d,className:s,styles:u,classNames:m})=>{const v=typeof e<"u"&&a.jsx(b,{flexGrow:0,flexShrink:0,paddingEnd:1,children:a.jsx(f,{className:m?.startLabel,disableAnimateOnMount:n,label:e,style:u?.startLabel,visuallyDisabled:l})}),g=typeof r<"u"&&a.jsx(b,{flexGrow:0,flexShrink:0,paddingStart:1,children:a.jsx(f,{className:m?.endLabel,disableAnimateOnMount:n,label:r,style:u?.endLabel,visuallyDisabled:l})}),x=p()?g:v,S=p()?v:g;return a.jsxs(w,{className:h(s,m?.root),style:{...d,...u?.root},testID:o,width:"100%",children:[t==="above"&&a.jsx(R,{classNames:m,disableAnimateOnMount:n,endLabel:r,paddingBottom:1,startLabel:e,styles:u,visuallyDisabled:l}),a.jsxs(b,{alignItems:"center",flexShrink:0,flexWrap:"nowrap",width:"100%",children:[t==="beside"&&x,i,t==="beside"&&S]}),t==="below"&&a.jsx(R,{classNames:m,disableAnimateOnMount:n,endLabel:r,paddingTop:1,startLabel:e,styles:u,visuallyDisabled:l})]})});C.__docgenInfo={description:"",methods:[],displayName:"ProgressBarWithFixedLabels",props:{startLabel:{required:!1,tsType:{name:"union",raw:`| number
| {
    value: number;
    render: (num: number, disabled?: boolean) => React.ReactNode;
  }`,elements:[{name:"number"},{name:"signature",type:"object",raw:`{
  value: number;
  render: (num: number, disabled?: boolean) => React.ReactNode;
}`,signature:{properties:[{key:"value",value:{name:"number",required:!0}},{key:"render",value:{name:"signature",type:"function",raw:"(num: number, disabled?: boolean) => React.ReactNode",signature:{arguments:[{type:{name:"number"},name:"num"},{type:{name:"boolean"},name:"disabled"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}},required:!0}}]}}]},description:"Label that is pinned to the start of the container. If a number is used then it will format it as a percentage."},endLabel:{required:!1,tsType:{name:"union",raw:`| number
| {
    value: number;
    render: (num: number, disabled?: boolean) => React.ReactNode;
  }`,elements:[{name:"number"},{name:"signature",type:"object",raw:`{
  value: number;
  render: (num: number, disabled?: boolean) => React.ReactNode;
}`,signature:{properties:[{key:"value",value:{name:"number",required:!0}},{key:"render",value:{name:"signature",type:"function",raw:"(num: number, disabled?: boolean) => React.ReactNode",signature:{arguments:[{type:{name:"number"},name:"num"},{type:{name:"boolean"},name:"disabled"}],return:{name:"ReactReactNode",raw:"React.ReactNode"}},required:!0}}]}}]},description:"Label that is pinned to the end of the container. If a number is used then it will format it as a percentage."},labelPlacement:{required:!1,tsType:{name:"Extract",elements:[{name:"union",raw:"'above' | 'below' | 'beside' | 'start' | 'end'",elements:[{name:"literal",value:"'above'"},{name:"literal",value:"'below'"},{name:"literal",value:"'beside'"},{name:"literal",value:"'start'"},{name:"literal",value:"'end'"}]},{name:"union",raw:"'above' | 'below' | 'beside'",elements:[{name:"literal",value:"'above'"},{name:"literal",value:"'below'"},{name:"literal",value:"'beside'"}]}],raw:"Extract<Placement, 'above' | 'below' | 'beside'>"},description:`Position of label relative to the bar
@default beside`,defaultValue:{value:"'beside'",computed:!1}},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""},className:{required:!1,tsType:{name:"string"},description:""},styles:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /** Root element */
  root?: React.CSSProperties;
  /** Label container element */
  labelContainer?: React.CSSProperties;
  /** Start label element */
  startLabel?: React.CSSProperties;
  /** End label element */
  endLabel?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Root element"},{key:"labelContainer",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Label container element"},{key:"startLabel",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Start label element"},{key:"endLabel",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"End label element"}]}},description:"Custom styles for individual elements of the ProgressBarWithFixedLabels component"},classNames:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /** Root element */
  root?: string;
  /** Label container element */
  labelContainer?: string;
  /** Start label element */
  startLabel?: string;
  /** End label element */
  endLabel?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1},description:"Root element"},{key:"labelContainer",value:{name:"string",required:!1},description:"Label container element"},{key:"startLabel",value:{name:"string",required:!1},description:"Start label element"},{key:"endLabel",value:{name:"string",required:!1},description:"End label element"}]}},description:"Custom class names for individual elements of the ProgressBarWithFixedLabels component"},disabled:{defaultValue:{value:"false",computed:!1},required:!1}}};export{C as P,P as g};
