import{j as e,r as i,by as v}from"./iframe-BXWLBCkp.js";import{a as T}from"./assets-CEwpm_uP.js";import{B as a}from"./Button-W9Shg4T1.js";import{I as h}from"./IconButton-OIX0AFCz.js";import{D as f}from"./DotSymbol-PN7wBJ63.js";import{H as R}from"./HStack-B6p8qBpp.js";import{V as l}from"./VStack-CnEfMFeL.js";import{T as o}from"./Text-Ch_dBU4v.js";import{T as s}from"./Tooltip-Crqfeox4.js";import"./preload-helper-D9Z9MdNV.js";import"./Icon-CgDQ3NQp.js";import"./useTheme-BJazYlse.js";import"./Spinner-BAI0lrZ-.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./RemoteImage-Lksm6NI7.js";import"./eventHandlers-CyvGcX2M.js";import"./dotStyles-Ccp1dKIN.js";import"./Popover-CipwoaXC.js";import"./NewAnimatePresence-BbA2hDPb.js";import"./index-B2twlf45.js";import"./motion-minimal-SVRWJYUW.js";import"./use-unmount-effect-5QIafHMH.js";import"./FocusTrap-90tMQkIg.js";import"./useMergeRefs-DR4sGa7m.js";import"./debounce-fynzmAtJ.js";import"./Overlay-XiDupmt3.js";import"./OverlayContentContext-hT53AGt-.js";import"./useMotionProps-CS-LE6l8.js";import"./utils-CwomCnHN.js";import"./tokens-BwScSksM.js";import"./Portal-tAONErW2.js";import"./TooltipContent-BbVg49nw.js";import"./usePrefixedId-Dfl-0DGQ.js";const xe={title:"Components/Tooltip/Tooltip",component:s,parameters:{layout:"padded"}},k=({content:r,openDelay:t,closeDelay:n})=>e.jsx(v,{children:e.jsxs(R,{gap:5,paddingX:8,paddingY:2,children:[e.jsxs(l,{gap:2,paddingX:2,children:[e.jsx(s,{closeDelay:n,content:r,openDelay:t,children:e.jsx(a,{children:"Default"})}),e.jsx(s,{closeDelay:n,content:r,openDelay:t,placement:"top",children:e.jsx(a,{children:"Top"})}),e.jsx(s,{closeDelay:n,content:r,openDelay:t,placement:"left",children:e.jsx(a,{children:"Left"})}),e.jsx(s,{closeDelay:n,content:r,openDelay:t,placement:"right",children:e.jsx(a,{children:"Right"})}),e.jsx(s,{closeDelay:n,content:r,openDelay:t,placement:"bottom",children:e.jsx(a,{children:"Bottom"})}),e.jsx(s,{closeDelay:n,content:r,openDelay:t,placement:"bottom",visible:!1,children:e.jsx(a,{disabled:!0,children:"Disabled"})}),e.jsx(s,{closeDelay:n,content:r,elevation:2,invertColorScheme:!1,openDelay:t,children:e.jsx(a,{children:"Custom"})})]}),e.jsxs(l,{gap:3,paddingX:2,children:[e.jsx(s,{closeDelay:n,content:e.jsxs(l,{gap:2,children:[e.jsx(a,{children:"Btn 1"}),e.jsx(a,{children:"Btn 2"}),e.jsx(a,{children:"Btn 3"})]}),openDelay:t,children:e.jsx(l,{padding:2,children:e.jsx(f,{pin:"bottom-start",size:"m",source:T.eth.imageUrl,children:e.jsx(h,{active:!0,accessibilityLabel:"Notifications",name:"bell",variant:"secondary"})})})}),e.jsx(s,{closeDelay:n,content:r,openDelay:t,placement:"left",children:e.jsx(f,{pin:"top-end",size:"s",source:T.ada.imageUrl,children:e.jsx(l,{padding:2,children:e.jsx(h,{active:!0,accessibilityLabel:"Notifications",name:"bell",variant:"secondary"})})})}),e.jsx(s,{closeDelay:n,content:r,openDelay:t,placement:"right",children:e.jsx(l,{padding:2,children:e.jsx(h,{active:!0,accessibilityLabel:"Notifications",name:"bell",variant:"secondary"})})}),e.jsx(s,{closeDelay:n,content:r,openDelay:t,placement:"bottom",children:e.jsx(l,{padding:2,children:e.jsx(h,{active:!0,accessibilityLabel:"Notifications",name:"bell",variant:"secondary"})})})]}),e.jsxs(l,{gap:4,padding:2,children:[e.jsx(s,{closeDelay:n,content:r,openDelay:t,children:e.jsx(o,{as:"p",display:"block",font:"label1",children:"Default"})}),e.jsx(s,{closeDelay:n,content:r,openDelay:t,placement:"left",children:e.jsx(l,{padding:2,children:e.jsx(f,{pin:"top-end",size:"s",source:T.ada.imageUrl,children:e.jsx(l,{padding:2,children:e.jsx(o,{as:"p",display:"block",font:"label1",children:"left"})})})})}),e.jsx(s,{closeDelay:n,content:r,openDelay:t,placement:"right",children:e.jsx(l,{padding:2,children:e.jsx(o,{as:"p",display:"block",font:"label1",children:"right"})})}),e.jsx(s,{closeDelay:n,content:r,openDelay:t,placement:"bottom",children:e.jsx(l,{padding:2,children:e.jsx(o,{as:"p",display:"block",font:"label1",children:"bottom"})})})]})]})}),N=r=>e.jsx(k,{...r}),p=N.bind({});p.args={content:"This is the tooltip Content"};const m=N.bind({}),C="This is the tooltip Content. This is just really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really really Long.";m.args={content:C};const c=({openDelay:r,closeDelay:t})=>{const[_,x]=i.useState(0),[g,y]=i.useState(0),u=i.useRef(null),d=i.useCallback(()=>{u.current&&(clearInterval(u.current),u.current=null)},[]),I=i.useCallback(()=>{x(0),y(0),u.current=setInterval(()=>{y(b=>b+1),x(b=>{const j=b+50;return j>=3e3?(d(),3e3):j})},50)},[d]),L=i.useCallback(()=>{d(),x(0),y(0)},[d]);i.useEffect(()=>d,[d]);const S=(_/1e3).toFixed(1),E=(3e3/1e3).toFixed(1);return e.jsx(v,{children:e.jsxs(l,{gap:3,padding:2,children:[e.jsxs(l,{alignItems:"flex-start",gap:2,children:[e.jsxs(o,{as:"p",display:"block",font:"body",children:["Hover the button below. The tooltip opens after ",r,"ms and closes after"," ",t,"ms."]}),e.jsx(s,{closeDelay:t,content:`Opens after ${r}ms, closes after ${t}ms`,openDelay:r,placement:"right",children:e.jsx(a,{children:"Hover me"})})]}),e.jsxs(l,{alignItems:"flex-start",gap:2,children:[e.jsxs(o,{font:"body",children:["Hover the text below to start a ",E,"s tooltip delay. State updates every"," ",50,"ms while hovering, triggering rerenders. The tooltip should still open on schedule because the delay timers are stored in refs that persist across renders."]}),e.jsx(o,{font:"label1",children:"Note: Mouse handlers are on a wrapper div outside the Tooltip to avoid spurious mouseenter events caused by React replacing the child DOM node during rapid rerenders."}),e.jsxs(R,{alignItems:"center",gap:2,children:[e.jsx("div",{onMouseEnter:I,onMouseLeave:L,children:e.jsx(s,{content:`Tooltip survived ${g} rerenders`,openDelay:3e3,placement:"bottom",children:e.jsx(o,{as:"span",display:"block",font:"label1",children:"Hover me for tooltip"})})}),e.jsxs(o,{as:"p",display:"block",font:"label2",children:[S,"s / ",E,"s (",g," rerenders)"]})]})]})]})})};c.args={openDelay:400,closeDelay:150};c.__docgenInfo={description:"",methods:[],displayName:"DelayedVisibility",props:{openDelay:{required:!0,tsType:{name:"number"},description:""},closeDelay:{required:!0,tsType:{name:"number"},description:""}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:"(args: BasicTooltipProps) => <BasicTooltip {...args} />",...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:"(args: BasicTooltipProps) => <BasicTooltip {...args} />",...m.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`({
  openDelay,
  closeDelay
}: {
  openDelay: number;
  closeDelay: number;
}) => {
  const RERENDER_OPEN_DELAY = 3000;
  const TICK_INTERVAL = 50;
  const [elapsed, setElapsed] = useState(0);
  const [rerenders, setRerenders] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);
  const startTimer = useCallback(() => {
    setElapsed(0);
    setRerenders(0);
    intervalRef.current = setInterval(() => {
      setRerenders(prev => prev + 1);
      setElapsed(prev => {
        const next = prev + TICK_INTERVAL;
        if (next >= RERENDER_OPEN_DELAY) {
          clearTimer();
          return RERENDER_OPEN_DELAY;
        }
        return next;
      });
    }, TICK_INTERVAL);
  }, [clearTimer]);
  const stopTimer = useCallback(() => {
    clearTimer();
    setElapsed(0);
    setRerenders(0);
  }, [clearTimer]);
  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);
  const elapsedSeconds = (elapsed / 1000).toFixed(1);
  const totalSeconds = (RERENDER_OPEN_DELAY / 1000).toFixed(1);
  return <PortalProvider>
      <VStack gap={3} padding={2}>
        <VStack alignItems="flex-start" gap={2}>
          <Text as="p" display="block" font="body">
            Hover the button below. The tooltip opens after {openDelay}ms and closes after{' '}
            {closeDelay}ms.
          </Text>
          <Tooltip closeDelay={closeDelay} content={\`Opens after \${openDelay}ms, closes after \${closeDelay}ms\`} openDelay={openDelay} placement="right">
            <Button>Hover me</Button>
          </Tooltip>
        </VStack>
        <VStack alignItems="flex-start" gap={2}>
          <Text font="body">
            Hover the text below to start a {totalSeconds}s tooltip delay. State updates every{' '}
            {TICK_INTERVAL}ms while hovering, triggering rerenders. The tooltip should still open on
            schedule because the delay timers are stored in refs that persist across renders.
          </Text>
          <Text font="label1">
            Note: Mouse handlers are on a wrapper div outside the Tooltip to avoid spurious
            mouseenter events caused by React replacing the child DOM node during rapid rerenders.
          </Text>
          <HStack alignItems="center" gap={2}>
            <div onMouseEnter={startTimer} onMouseLeave={stopTimer}>
              <Tooltip content={\`Tooltip survived \${rerenders} rerenders\`} openDelay={RERENDER_OPEN_DELAY} placement="bottom">
                <Text as="span" display="block" font="label1">
                  Hover me for tooltip
                </Text>
              </Tooltip>
            </div>
            <Text as="p" display="block" font="label2">
              {elapsedSeconds}s / {totalSeconds}s ({rerenders} rerenders)
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </PortalProvider>;
}`,...c.parameters?.docs?.source}}};const ye=["Default","TooltipLongContent","DelayedVisibility"];export{p as Default,c as DelayedVisibility,m as TooltipLongContent,ye as __namedExportsOrder,xe as default};
