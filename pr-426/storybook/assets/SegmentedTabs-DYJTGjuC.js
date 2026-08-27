import{r as a,j as s,c as P,B as w}from"./iframe-CsG_6vZR.js";import{u as j,t as N,a as V,T as M}from"./Tabs-GtfXq7u6.js";import{P as F}from"./Pressable-DDN99tmF.js";import{T as E}from"./Text-B1CpMNU3.js";import{m as B}from"./motion-minimal-5s2ikV7b.js";const _=B(E),z="insetFocusRingCss-i18jeh22",H="buttonCss-bqvzngp",W="buttonDisabledCss-b1ggsqfh",X="disabledCss-dk050a5",c=a.memo(a.forwardRef(({id:e,label:t,disabled:n,onClick:i,color:o="fg",activeColor:r="fgInverse",className:d,testID:R,font:b="headline",fontFamily:m,fontSize:f,fontWeight:p,lineHeight:g,textAlign:T,textTransform:v,...I},S)=>{const{activeTab:q,updateActiveTab:h,disabled:C}=j(),l=q?.id===e,y=n||C,A=a.useCallback(D=>{h(e),i?.(e,D)},[e,h,i]),k=a.useMemo(()=>({animate:{color:`var(--color-${l?r:o})`},transition:N,initial:!1}),[r,o,l]);return s.jsx(F,{ref:S,"aria-selected":l,className:P(z,H,y&&W,n&&!C&&X,d),"data-testid":R,disabled:y,font:b,fontFamily:m,fontSize:f,fontWeight:p,id:e,lineHeight:g,onClick:A,role:"tab",textAlign:T,textTransform:v,type:"button",...I,children:s.jsx(w,{as:"span",justifyContent:"center",paddingX:2,paddingY:1,children:typeof t=="string"?s.jsx(_,{font:b,fontFamily:m,fontSize:f,fontWeight:p,lineHeight:g,textAlign:T,textTransform:v,...k,children:t}):t})})}));c.displayName="SegmentedTab";const Y=c;c.__docgenInfo={description:"",methods:[],displayName:"SegmentedTab",props:{id:{required:!0,tsType:{name:"TabId"},description:"The tab id."},label:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"The tab label."},disabled:{required:!1,tsType:{name:"boolean"},description:"Disable interactions on the tab."},activeColor:{required:!1,tsType:{name:"ThemeVars.Color"},description:`Text color when the SegmentedTab is active.
@default negativeForeground`,defaultValue:{value:"'fgInverse'",computed:!1}},color:{required:!1,tsType:{name:"ThemeVars.Color"},description:`Text color when the SegmentedTab is inactive.
@default foreground`,defaultValue:{value:"'fg'",computed:!1}},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"(id: TabId, event: React.MouseEvent) => void",signature:{arguments:[{type:{name:"TabId"},name:"id"},{type:{name:"ReactMouseEvent",raw:"React.MouseEvent"},name:"event"}],return:{name:"void"}}},description:"Callback that is fired when the SegmentedTab is clicked."},font:{defaultValue:{value:"'headline'",computed:!1},required:!1}}};const x=({borderRadius:e=1e3,...t})=>s.jsx(V,{borderRadius:e,...t});x.__docgenInfo={description:"",methods:[],displayName:"SegmentedTabsActiveIndicator",props:{activeTabRect:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  x: number;
  y: number;
  width: number;
  height: number;
}`,signature:{properties:[{key:"x",value:{name:"number",required:!0}},{key:"y",value:{name:"number",required:!0}},{key:"width",value:{name:"number",required:!0}},{key:"height",value:{name:"number",required:!0}}]}},description:""},borderRadius:{defaultValue:{value:"1000",computed:!1},required:!1}}};const u=a.memo(a.forwardRef(({TabComponent:e=Y,TabsActiveIndicatorComponent:t=x,activeBackground:n="bgInverse",background:i="bgSecondary",borderRadius:o=1e3,...r},d)=>s.jsx(M,{ref:d,TabComponent:e,TabsActiveIndicatorComponent:t,activeBackground:n,background:i,borderRadius:o,role:"tablist",...r})));u.displayName="SegmentedTabs";const O=u;u.__docgenInfo={description:"",methods:[],displayName:"SegmentedTabs",props:{TabComponent:{defaultValue:{value:`memo(
  forwardRef(
    <TabId extends string>(
      {
        id,
        label,
        disabled: disabledProp,
        onClick,
        color = 'fg',
        activeColor = 'fgInverse',
        className,
        testID,
        font = 'headline',
        fontFamily,
        fontSize,
        fontWeight,
        lineHeight,
        textAlign,
        textTransform,
        ...props
      }: SegmentedTabProps<TabId>,
      ref: React.ForwardedRef<HTMLButtonElement>,
    ) => {
      const { activeTab, updateActiveTab, disabled: allTabsDisabled } = useTabsContext<TabId>();
      const isActive = activeTab?.id === id;
      const isDisabled = disabledProp || allTabsDisabled;

      const handlePress = useCallback(
        (event: React.MouseEvent) => {
          updateActiveTab(id);
          onClick?.(id, event);
        },
        [id, updateActiveTab, onClick],
      );

      const motionProps = useMemo(
        () => ({
          animate: { color: \`var(--color-\${isActive ? activeColor : color})\` },
          transition: tabsTransitionConfig,
          initial: false,
        }),
        [activeColor, color, isActive],
      );

      return (
        <Pressable
          ref={ref}
          aria-selected={isActive}
          className={cx(
            insetFocusRingCss,
            buttonCss,
            isDisabled && buttonDisabledCss,
            disabledProp && !allTabsDisabled && disabledCss,
            className,
          )}
          data-testid={testID}
          disabled={isDisabled}
          font={font}
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontWeight={fontWeight}
          id={id}
          lineHeight={lineHeight}
          onClick={handlePress}
          role="tab"
          textAlign={textAlign}
          textTransform={textTransform}
          type="button"
          {...props}
        >
          <Box as="span" justifyContent="center" paddingX={2} paddingY={1}>
            {typeof label === 'string' ? (
              <MotionText
                font={font}
                fontFamily={fontFamily}
                fontSize={fontSize}
                fontWeight={fontWeight}
                lineHeight={lineHeight}
                textAlign={textAlign}
                textTransform={textTransform}
                {...motionProps}
              >
                {label}
              </MotionText>
            ) : (
              label
            )}
          </Box>
        </Pressable>
      );
    },
  ),
)`,computed:!0},required:!1},TabsActiveIndicatorComponent:{defaultValue:{value:`({
  borderRadius = 1000,
  ...props
}: SegmentedTabsActiveIndicatorProps) => {
  return <TabsActiveIndicator borderRadius={borderRadius} {...props} />;
}`,computed:!1},required:!1},activeBackground:{defaultValue:{value:"'bgInverse'",computed:!1},required:!1},background:{defaultValue:{value:"'bgSecondary'",computed:!1},required:!1},borderRadius:{defaultValue:{value:"1000",computed:!1},required:!1}}};export{Y as S,O as a};
