import{r,j as e,B as i}from"./iframe-CsG_6vZR.js";import{u as b}from"./useCellSpacing-BeT6oDTo.js";import{T as S}from"./Text-B1CpMNU3.js";import{c as x}from"./useTable-CBqxA7OK.js";const o=r.memo(({children:a,as:s="span",align:p="start",color:n,backgroundColor:t,outerSpacing:u,innerSpacing:c,testID:m,style:l,...d})=>{const{outer:g,inner:h}=x({outer:u,inner:c,skipAsValidation:!0}),{outer:v,inner:T}=b({outerSpacing:g,innerSpacing:h}),f=r.useMemo(()=>({color:n&&`var(--color-${n})`,backgroundColor:t&&`var(--color-${t})`,...l}),[l,t,n]);return e.jsx("caption",{"data-testid":m,style:f,...d,children:e.jsx(i,{...v,children:e.jsx(i,{alignContent:"stretch",flexDirection:"column",flexGrow:1,...T,children:typeof a=="string"?e.jsx(S,{as:s,color:"currentColor",font:"title3",textAlign:p,children:a}):a})})})});o.displayName="TableCaption";o.__docgenInfo={description:"",methods:[],displayName:"TableCaption",props:{testID:{required:!1,tsType:{name:"string"},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`},children:{required:!0,tsType:{name:"union",raw:"React.ReactElement | string",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"string"}]},description:"The children to render, either as a React element or a string."},as:{required:!1,tsType:{name:"union",raw:"HTMLHeadingTags | HTMLNonHeadingTextTags",elements:[{name:"union",raw:"'h1' | 'h2' | 'h3' | 'h4'",elements:[{name:"literal",value:"'h1'"},{name:"literal",value:"'h2'"},{name:"literal",value:"'h3'"},{name:"literal",value:"'h4'"}]},{name:"union",raw:`| 'p'
| 'strong'
| 'span'
| 'label'
| 'time'
| 'output'
| 'code'
| 'pre'
| 's'
| 'abbr'
| 'q'
| 'kbd'
| 'del'
| 'ins'
| 'sup'
| 'sub'
| 'li'
| 'dl'
| 'dt'
| 'dd'
| 'div'`,elements:[{name:"literal",value:"'p'"},{name:"literal",value:"'strong'"},{name:"literal",value:"'span'"},{name:"literal",value:"'label'"},{name:"literal",value:"'time'"},{name:"literal",value:"'output'"},{name:"literal",value:"'code'"},{name:"literal",value:"'pre'"},{name:"literal",value:"'s'"},{name:"literal",value:"'abbr'"},{name:"literal",value:"'q'"},{name:"literal",value:"'kbd'"},{name:"literal",value:"'del'"},{name:"literal",value:"'ins'"},{name:"literal",value:"'sup'"},{name:"literal",value:"'sub'"},{name:"literal",value:"'li'"},{name:"literal",value:"'dl'"},{name:"literal",value:"'dt'"},{name:"literal",value:"'dd'"},{name:"literal",value:"'div'"}]}]},description:"A semantic HTML element or a React component to be rendered.\nOnly applicable when `children` is a string.\n@default 'span'",defaultValue:{value:"'span'",computed:!1}},align:{required:!1,tsType:{name:"union",raw:"TextAlignProps['align']"},description:"Specify text alignment. Only applicable when `children` is a string.\n@link [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/text-align)\n@default 'start'",defaultValue:{value:"'start'",computed:!1}},color:{required:!1,tsType:{name:"ThemeVars.Color"},description:"Set the text color to a CDS palette foreground color name."},backgroundColor:{required:!1,tsType:{name:"ThemeVars.Color"},description:"Set the background color to a CDS palette background color name."},outerSpacing:{required:!1,tsType:{name:"union['outerSpacing']",raw:"TableCellProps['outerSpacing']"},description:`The spacing to use on the parent wrapper of the caption.
Overrides table cell spacing defaults.`},innerSpacing:{required:!1,tsType:{name:"union['innerSpacing']",raw:"TableCellProps['innerSpacing']"},description:`The spacing to use on the inner content of the caption.
Overrides table cell spacing defaults.`}}};export{o as T};
