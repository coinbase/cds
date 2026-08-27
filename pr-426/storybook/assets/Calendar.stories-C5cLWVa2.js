import{j as e,r as D,a5 as k,a6 as S,B as m}from"./iframe-CYDANtMt.js";import{G as p}from"./Group-DaMW0Ji9.js";import{V as r}from"./VStack-iXgNewwv.js";import{C as a}from"./Calendar-CpbUxbxY.js";import{N as s}from"./Note-DtNfCwe8.js";import"./preload-helper-D9Z9MdNV.js";import"./index-Cz8MjafU.js";import"./Spacer-BbrrPdew.js";import"./getTimesFromDatesAndRanges-DfkYzdjX.js";import"./LocaleProvider-szkYova-.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";import"./useTheme-C_Ehsh33.js";import"./Icon-DRxKkZdt.js";import"./Grid-BDV7e3L3.js";import"./HStack-Fh-9TmPm.js";import"./Tooltip-D5095Ene.js";import"./Popover-CdSD4lsc.js";import"./NewAnimatePresence-BIvSMOo2.js";import"./index-DaxQGrHc.js";import"./motion-minimal-B1h7XI-_.js";import"./use-unmount-effect-DjWyEMV9.js";import"./FocusTrap-D5jofIBF.js";import"./useMergeRefs-DR4sGa7m.js";import"./debounce-fynzmAtJ.js";import"./Overlay-BrSXLw2H.js";import"./OverlayContentContext-D3LfdOuR.js";import"./useMotionProps-BF3bCUsm.js";import"./utils-CM_X5is-.js";import"./tokens-BwScSksM.js";import"./Portal-BNKVVywf.js";import"./TooltipContent-BT-L0t0g.js";import"./Text-0g3rWpAf.js";import"./usePrefixedId-D1yZvkEs.js";import"./Pressable-BvczHaFK.js";import"./isArray-BJmyNVUi.js";const se={title:"Components/Dates/Calendar",component:a},t=new Date(new Date(2024,7,18).setHours(0,0,0,0)),n=new Date(t.getFullYear(),t.getMonth(),t.getDate()-2),l=new Date(t.getFullYear(),t.getMonth(),t.getDate()-7),i=new Date(t.getFullYear(),t.getMonth(),t.getDate()+7),x=new Date(t.getFullYear(),t.getMonth()+1,15),c=new Date(t.getFullYear(),t.getMonth()-1,15),h={maxDate:x,minDate:c,disabledDateError:"Date unavailable"},d=()=>{const[g,C]=D.useState(t),[j,u]=D.useState(t);return e.jsxs(p,{gap:8,children:[e.jsxs(r,{children:[e.jsx(s,{children:"Calendar"}),e.jsx(a,{...h,onPressDate:C,selectedDate:g})]}),e.jsxs(r,{children:[e.jsx(s,{children:"Calendar dark mode"}),e.jsx(k,{activeColorScheme:"dark",theme:S,children:e.jsx(a,{...h,onPressDate:u,selectedDate:j})})]}),e.jsx(m,{height:100})]})};d.parameters={a11y:{disable:!0}};const o=()=>e.jsxs(p,{gap:8,children:[e.jsxs(r,{children:[e.jsx(s,{children:"Calendar with no props"}),e.jsx(a,{selectedDate:t})]}),e.jsxs(r,{children:[e.jsx(s,{children:"Calendar with seedDate"}),e.jsx(a,{seedDate:c,selectedDate:t})]}),e.jsxs(r,{children:[e.jsx(s,{children:"Calendar with selectedDate"}),e.jsx(a,{selectedDate:t})]}),e.jsxs(r,{children:[e.jsx(s,{children:"Calendar with disabledDates and disabledDateError"}),e.jsx(a,{disabledDateError:"Date unavailable",disabledDates:[[l,n],t,i],selectedDate:t})]}),e.jsxs(r,{children:[e.jsx(s,{children:"Calendar with minDate, maxDate, and disabledDateError"}),e.jsx(a,{disabledDateError:"Date unavailable",maxDate:x,minDate:c,selectedDate:t})]}),e.jsxs(r,{children:[e.jsx(s,{children:"Calendar with highlightedDates"}),e.jsx(a,{highlightedDates:[[l,n],t,i],selectedDate:t})]}),e.jsxs(r,{children:[e.jsx(s,{children:"Calendar with disabledDates, highlightedDates, and disabledDateError"}),e.jsx(a,{disabledDateError:"Date unavailable",disabledDates:[[l,n],t,i],highlightedDates:[[l,n],t,i],selectedDate:t})]}),e.jsxs(r,{children:[e.jsx(s,{children:"Calendar with hideControls"}),e.jsx(a,{hideControls:!0,selectedDate:t})]}),e.jsxs(r,{children:[e.jsx(s,{children:"Calendar when disabled"}),e.jsx(a,{disabled:!0,selectedDate:t})]}),e.jsx(m,{height:100})]});o.parameters={a11y:{disable:!0}};d.__docgenInfo={description:"",methods:[],displayName:"Examples"};o.__docgenInfo={description:"",methods:[],displayName:"Props"};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`() => {
  const [selectedDate1, setSelectedDate1] = useState<Date | null>(today);
  const [selectedDate2, setSelectedDate2] = useState<Date | null>(today);
  return <Group gap={8}>
      <VStack>
        <Note>Calendar</Note>
        <Calendar {...exampleProps} onPressDate={setSelectedDate1} selectedDate={selectedDate1} />
      </VStack>
      <VStack>
        <Note>Calendar dark mode</Note>
        <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
          <Calendar {...exampleProps} onPressDate={setSelectedDate2} selectedDate={selectedDate2} />
        </ThemeProvider>
      </VStack>
      <Box height={100} />
    </Group>;
}`,...d.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`() => <Group gap={8}>
    <VStack>
      <Note>Calendar with no props</Note>
      <Calendar selectedDate={today} />
    </VStack>
    <VStack>
      <Note>Calendar with seedDate</Note>
      <Calendar seedDate={lastMonth15th} selectedDate={today} />
    </VStack>
    <VStack>
      <Note>Calendar with selectedDate</Note>
      <Calendar selectedDate={today} />
    </VStack>
    <VStack>
      <Note>Calendar with disabledDates and disabledDateError</Note>
      <Calendar disabledDateError="Date unavailable" disabledDates={[[oneWeekAgo, twoDaysAgo], today, oneWeekLater]} selectedDate={today} />
    </VStack>
    <VStack>
      <Note>Calendar with minDate, maxDate, and disabledDateError</Note>
      <Calendar disabledDateError="Date unavailable" maxDate={nextMonth15th} minDate={lastMonth15th} selectedDate={today} />
    </VStack>
    <VStack>
      <Note>Calendar with highlightedDates</Note>
      <Calendar highlightedDates={[[oneWeekAgo, twoDaysAgo], today, oneWeekLater]} selectedDate={today} />
    </VStack>
    <VStack>
      <Note>Calendar with disabledDates, highlightedDates, and disabledDateError</Note>
      <Calendar disabledDateError="Date unavailable" disabledDates={[[oneWeekAgo, twoDaysAgo], today, oneWeekLater]} highlightedDates={[[oneWeekAgo, twoDaysAgo], today, oneWeekLater]} selectedDate={today} />
    </VStack>
    <VStack>
      <Note>Calendar with hideControls</Note>
      <Calendar hideControls selectedDate={today} />
    </VStack>
    <VStack>
      <Note>Calendar when disabled</Note>
      <Calendar disabled selectedDate={today} />
    </VStack>
    <Box height={100} />
  </Group>`,...o.parameters?.docs?.source}}};const de=["Examples","Props"];export{d as Examples,o as Props,de as __namedExportsOrder,se as default};
