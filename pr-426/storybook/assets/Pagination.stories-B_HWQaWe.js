import{j as e,r as n,c as U,R as S,B}from"./iframe-CsG_6vZR.js";import{V as b}from"./VStack-Cg_Yq2u4.js";import{T as o}from"./Text-B1CpMNU3.js";import{H as z}from"./HStack-DaDYipoP.js";import{I as J}from"./IconButton-DNJ86Kiu.js";import{B as F}from"./Button-D2WSek5T.js";import{u as Q}from"./usePagination-qfu_FzgX.js";import"./preload-helper-D9Z9MdNV.js";import"./useTheme-CmrOhAty.js";import"./Icon-DTs0crZh.js";import"./Spinner-C8x8bhOH.js";import"./Pressable-DDN99tmF.js";import"./isArray-M0ytM-vC.js";import"./Interactable--rqISG90.js";import"./color-Ceo1QMNe.js";const N=({content:a="...",testID:t})=>e.jsx(o,{noWrap:!0,"aria-hidden":"true",color:"fgMuted",font:"headline",testID:t,children:a});N.__docgenInfo={description:"",methods:[],displayName:"DefaultPaginationEllipsis",props:{content:{required:!1,tsType:{name:"string"},description:'Custom content to display instead of default "..."',defaultValue:{value:"'...'",computed:!1}},testID:{required:!1,tsType:{name:"string"},description:"Test ID for the ellipsis element"}}};const X={first:"arrowLeft",last:"arrowRight",next:"caretRight",previous:"caretLeft"},j=n.forwardRef(({direction:a,onClick:t,disabled:r,accessibilityLabel:i,testID:m},l)=>e.jsx(J,{ref:l,compact:!0,transparent:!0,accessibilityLabel:i,disabled:r,name:X[a],onClick:t,testID:m,variant:"secondary"}));j.__docgenInfo={description:"",methods:[],displayName:"DefaultPaginationNavigationButton",props:{direction:{required:!0,tsType:{name:"union",raw:"'first' | 'previous' | 'next' | 'last'",elements:[{name:"literal",value:"'first'"},{name:"literal",value:"'previous'"},{name:"literal",value:"'next'"},{name:"literal",value:"'last'"}]},description:"Which navigation button this is"},onClick:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Click handler for the button"},disabled:{required:!1,tsType:{name:"boolean"},description:"Whether the button is disabled"},accessibilityLabel:{required:!1,tsType:{name:"string"},description:"Accessibility label for the button"},testID:{required:!1,tsType:{name:"string"},description:"Test ID for the button"}}};const v=n.forwardRef(({onClick:a,disabled:t,accessibilityLabel:r,testID:i,children:m,variant:l="secondary",compact:u=!0,...s},c)=>e.jsx(F,{ref:c,"aria-label":r,compact:u,"data-testid":i,disabled:t,onClick:a,variant:l,...s,children:m}));v.displayName="DefaultPaginationNavigationTextButton";v.__docgenInfo={description:"",methods:[],displayName:"DefaultPaginationNavigationTextButton",props:{variant:{defaultValue:{value:"'secondary'",computed:!1},required:!1},compact:{defaultValue:{value:"true",computed:!1},required:!1}}};const Y="circularButtonCss-c1vqlirr",V=n.forwardRef(({page:a,onClick:t,isCurrentPage:r,disabled:i,accessibilityLabel:m,testID:l,...u},s)=>{const c=n.useCallback(()=>t(a),[t,a]),d=a<10;return e.jsx(F,{ref:s,compact:!0,accessibilityLabel:m,"aria-current":r?"page":void 0,className:U(d&&Y),disabled:i,onClick:c,testID:l,transparent:!r,variant:r?"primary":"secondary",...u,children:a})});V.__docgenInfo={description:"",methods:[],displayName:"DefaultPaginationPageButton",props:{page:{required:!0,tsType:{name:"number"},description:"The page number"},onClick:{required:!0,tsType:{name:"signature",type:"function",raw:"(page: number) => void",signature:{arguments:[{type:{name:"number"},name:"page"}],return:{name:"void"}}},description:"Click handler for the page button"},"data-pagenumber":{required:!0,tsType:{name:"number"},description:"A data attribute for the page number, used for focus management"},isCurrentPage:{required:!1,tsType:{name:"boolean"},description:"Whether this is the current active page"},disabled:{required:!1,tsType:{name:"boolean"},description:"Whether the button is disabled"},accessibilityLabel:{required:!1,tsType:{name:"string"},description:"Accessibility label for the button"},testID:{required:!1,tsType:{name:"string"},description:"Test ID for the button"}}};const f=({totalPages:a,activePage:t,onChange:r,disabled:i,showFirstLastButtons:m,siblingCount:l=1,boundaryCount:u=1,accessibilityLabel:s="Pagination",testID:c,testIDMap:d,accessibilityLabels:p,PaginationPageButtonComponent:x=V,PaginationNavigationButtonComponent:h=j,PaginationEllipsisComponent:_=N,firstPageButtonLabel:W="First",lastPageButtonLabel:G="Last",...A})=>{const{items:M,updateActivePage:k,goNextPage:I,goPrevPage:D,goFirstPage:L,goLastPage:E}=Q({activePage:t,onChange:r,totalPages:a,siblingCount:l,boundaryCount:u}),w=n.useRef(null),P=g=>{w.current?.querySelector(`[data-pagenumber="${g}"]`)?.focus()},$=n.useCallback(g=>{k(g),P(g)},[k]),H=n.useCallback(()=>{const g=t+1===a;I(),g&&P(a)},[t,I,a]),K=n.useCallback(()=>{const g=t-1===1;D(),g&&P(1)},[t,D]),T=n.useCallback(()=>{L(),P(1)},[L]),q=n.useCallback(()=>{E(),P(a)},[E,a]);return e.jsxs(z,{ref:w,accessibilityLabel:s,alignItems:"center",as:"nav",gap:.5,justifyContent:"center",testID:c,...A,children:[m&&(h===j?e.jsx(v,{accessibilityLabel:p?.first??"First page",disabled:t===1||i,onClick:T,testID:d?.firstButton,children:W}):e.jsx(h,{accessibilityLabel:p?.first??"First page",direction:"first",disabled:t===1||i,onClick:T,testID:d?.firstButton})),e.jsx(h,{accessibilityLabel:p?.previous??"Previous page",direction:"previous",disabled:t===1||i,onClick:K,testID:d?.prevButton}),M.map((g,O)=>{if(g.type==="ellipsis")return e.jsx(_,{},`ellipsis-${O}`);const y=g.page,R=t===y;return e.jsx(x,{accessibilityLabel:p?.page?p.page(y):`Page ${y}`,"data-pagenumber":y,disabled:i,isCurrentPage:R,onClick:$,page:y,testID:R?`${c}-current-page`:void 0},y)}),e.jsx(h,{accessibilityLabel:p?.next??"Next page",direction:"next",disabled:t===a||i,onClick:H,testID:d?.nextButton}),m&&(h===j?e.jsx(v,{accessibilityLabel:p?.last??"Last page",disabled:t===a||i,onClick:q,testID:d?.lastButton,children:G}):e.jsx(h,{accessibilityLabel:p?.last??"Last page",direction:"last",disabled:t===a||i,onClick:q,testID:d?.lastButton}))]})};f.__docgenInfo={description:"",methods:[],displayName:"Pagination",props:{siblingCount:{defaultValue:{value:"1",computed:!1},required:!1},boundaryCount:{defaultValue:{value:"1",computed:!1},required:!1},accessibilityLabel:{defaultValue:{value:"'Pagination'",computed:!1},required:!1},PaginationPageButtonComponent:{defaultValue:{value:`forwardRef(
  (
    {
      page,
      onClick,
      isCurrentPage,
      disabled,
      accessibilityLabel,
      testID,
      ...props
    }: PaginationPageButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    const handleClick = useCallback(() => onClick(page), [onClick, page]);
    const isSingleDigit = page < 10;

    return (
      <Button
        ref={ref}
        compact
        accessibilityLabel={accessibilityLabel}
        aria-current={isCurrentPage ? 'page' : undefined}
        className={cx(isSingleDigit && circularButtonCss)}
        disabled={disabled}
        onClick={handleClick}
        testID={testID}
        transparent={!isCurrentPage}
        variant={isCurrentPage ? 'primary' : 'secondary'}
        {...props}
      >
        {page}
      </Button>
    );
  },
)`,computed:!0},required:!1},PaginationNavigationButtonComponent:{defaultValue:{value:`forwardRef(
  (
    { direction, onClick, disabled, accessibilityLabel, testID }: PaginationNavigationButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <IconButton
        ref={ref}
        compact
        transparent
        accessibilityLabel={accessibilityLabel}
        disabled={disabled}
        name={iconMap[direction]}
        onClick={onClick}
        testID={testID}
        variant="secondary"
      />
    );
  },
)`,computed:!0},required:!1},PaginationEllipsisComponent:{defaultValue:{value:`({ content = '...', testID }: PaginationEllipsisProps) => (
  <Text noWrap aria-hidden="true" color="fgMuted" font="headline" testID={testID}>
    {content}
  </Text>
)`,computed:!1},required:!1},firstPageButtonLabel:{defaultValue:{value:"'First'",computed:!1},required:!1},lastPageButtonLabel:{defaultValue:{value:"'Last'",computed:!1},required:!1}}};const ve={title:"Components/Pagination",component:f,parameters:{docs:{description:{component:"Pagination component allows users to navigate through paginated content."}},a11y:{config:{}}}},Z=()=>{const[a,t]=n.useState(1);return e.jsxs(b,{alignItems:"flex-start",gap:2,children:[e.jsx(o,{as:"h3",display:"block",font:"headline",children:"Basic Pagination"}),e.jsx(f,{activePage:a,onChange:t,totalPages:10})]})},ee=()=>{const[a,t]=n.useState(5);return e.jsxs(b,{alignItems:"flex-start",gap:2,children:[e.jsx(o,{as:"h3",display:"block",font:"headline",children:"With First/Last Buttons"}),e.jsx(f,{activePage:a,onChange:t,showFirstLastButtons:!0,totalPages:10})]})},te=()=>{const[a,t]=n.useState(5);return e.jsxs(b,{alignItems:"flex-start",gap:2,children:[e.jsx(o,{as:"h3",display:"block",font:"headline",children:"Custom First/Last Button Labels"}),e.jsx(o,{as:"p",display:"block",font:"body",children:"Custom labels for first and last page buttons"}),e.jsx(f,{activePage:a,firstPageButtonLabel:"Start",lastPageButtonLabel:"End",onChange:t,showFirstLastButtons:!0,totalPages:10})]})},ae=()=>{const[a,t]=n.useState(7);return e.jsxs(b,{alignItems:"flex-start",gap:2,children:[e.jsx(o,{as:"h3",display:"block",font:"headline",children:"Custom Ranges (siblingCount=2, boundaryCount=2)"}),e.jsx(f,{activePage:a,boundaryCount:2,onChange:t,siblingCount:2,totalPages:20})]})},ne=()=>{const[a,t]=n.useState(2);return e.jsxs(b,{alignItems:"flex-start",gap:2,children:[e.jsx(o,{as:"h3",display:"block",font:"headline",children:"Few Pages"}),e.jsx(f,{activePage:a,onChange:t,totalPages:3})]})},se=()=>{const[a,t]=n.useState(25);return e.jsxs(b,{alignItems:"flex-start",gap:2,children:[e.jsx(o,{as:"h3",display:"block",font:"headline",children:"Many Pages"}),e.jsx(f,{activePage:a,onChange:t,showFirstLastButtons:!0,totalPages:50})]})},ie=()=>{const[a,t]=n.useState(2);return e.jsxs(b,{alignItems:"flex-start",gap:2,children:[e.jsx(o,{as:"h3",display:"block",font:"headline",children:"Disabled Pages"}),e.jsx(f,{disabled:!0,activePage:a,onChange:t,totalPages:3})]})},oe=()=>{const[a,t]=n.useState(3);return e.jsxs(b,{alignItems:"flex-start",gap:2,children:[e.jsx(o,{as:"h3",display:"block",font:"headline",children:"Accessible Pagination"}),e.jsx(o,{as:"p",display:"block",font:"body",children:"With custom accessibility labels, tooltip labels, and test IDs"}),e.jsx(f,{accessibilityLabel:"Custom accessible pagination",accessibilityLabels:{first:"Go to first page of results",last:"Go to last page of results",next:"Go to next page of results",page:r=>`Go to page ${r} of results`,previous:"Go to previous page of results"},activePage:a,onChange:t,showFirstLastButtons:!0,testID:"pagination-example",testIDMap:{firstButton:"pagination-first-button",lastButton:"pagination-last-button",nextButton:"pagination-next-button",prevButton:"pagination-prev-button"},totalPages:10})]})},re=()=>{const[a,t]=n.useState(5),r=S.forwardRef(({accessibilityLabel:l,isCurrentPage:u,onClick:s,page:c,testID:d},p)=>e.jsx(B,{ref:p,alignItems:"center","aria-current":u?"page":void 0,"aria-label":l,as:"button",background:u?"bgSecondary":"bg",borderRadius:100,color:u?"fgPrimary":"fgMuted",display:"flex",justifyContent:"center",margin:0,minWidth:8,onClick:()=>s(c),onKeyDown:x=>{(x.key==="Enter"||x.key===" ")&&(x.preventDefault(),s(c))},padding:1,role:"button",style:{cursor:"pointer"},tabIndex:0,testID:d,children:e.jsx(o,{font:"body",children:c})})),i=S.forwardRef(({accessibilityLabel:l,direction:u,disabled:s,onClick:c},d)=>{const p=()=>{switch(u){case"first":return"««";case"previous":return"«";case"next":return"»";case"last":return"»»";default:return""}};return e.jsx(B,{ref:d,alignItems:"center","aria-disabled":s,"aria-label":l,as:"button",background:"bgSecondary",borderRadius:100,color:s?"fgMuted":"fgPrimary",disabled:s,display:"flex",justifyContent:"center",margin:0,minWidth:8,onClick:s?void 0:c,onKeyDown:x=>{!s&&(x.key==="Enter"||x.key===" ")&&(x.preventDefault(),c())},opacity:s?.7:1,padding:1,role:"button",style:{cursor:s?"not-allowed":"pointer"},tabIndex:s?-1:0,children:p()})}),m=({content:l="•••",testID:u})=>e.jsx(B,{alignItems:"center","aria-hidden":"true",color:"fgMuted",display:"flex",margin:0,padding:1,testID:u,children:l});return e.jsxs(b,{alignItems:"flex-start",gap:2,children:[e.jsx(o,{as:"h3",display:"block",font:"headline",children:"Custom Components"}),e.jsx(o,{as:"p",display:"block",font:"body",children:"Using custom components for page buttons, navigation buttons, and ellipsis"}),e.jsx(f,{showFirstLastButtons:!0,PaginationEllipsisComponent:m,PaginationNavigationButtonComponent:i,PaginationPageButtonComponent:r,activePage:a,onChange:t,totalPages:20})]})},C=()=>e.jsxs(b,{alignItems:"flex-start",gap:4,children:[e.jsx(Z,{}),e.jsx(ne,{}),e.jsx(se,{}),e.jsx(ee,{}),e.jsx(te,{}),e.jsx(ie,{}),e.jsx(oe,{}),e.jsx(ae,{}),e.jsx(re,{})]});C.__docgenInfo={description:"",methods:[],displayName:"PaginationExamples"};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`() => {
  return <VStack alignItems="flex-start" gap={4}>
      <BasicPaginationExample />
      <FewPagesExample />
      <ManyPagesExample />
      <WithFirstLastButtonsExample />
      <CustomButtonLabelsExample />
      <DisabledPagesExample />
      <AccessiblePaginationExample />
      <CustomRangesExample />
      <CustomComponentsExample />
    </VStack>;
}`,...C.parameters?.docs?.source}}};const Be=["PaginationExamples"];export{C as PaginationExamples,Be as __namedExportsOrder,ve as default};
