import{r as h,j as e,a5 as D,a6 as P,B as S}from"./iframe-BXWLBCkp.js";import{D as k,a as s}from"./DateInput-Dd1bo0vQ.js";import{G as x}from"./Group--N9vuk8y.js";import{T as i}from"./Text-Ch_dBU4v.js";import{C as l}from"./Calendar-eWXmf4EQ.js";import{D as a}from"./DatePicker-DrUT7Vk3.js";import"./preload-helper-D9Z9MdNV.js";import"./getTimesFromDatesAndRanges-DfkYzdjX.js";import"./LocaleProvider-BsopcHeG.js";import"./TextInput-CXMiH86I.js";import"./useMergeRefs-DR4sGa7m.js";import"./usePrefixedId-Dfl-0DGQ.js";import"./HStack-B6p8qBpp.js";import"./context-Cc0ZOVig.js";import"./HelperText-C1uG41Fa.js";import"./Icon-CgDQ3NQp.js";import"./useTheme-BJazYlse.js";import"./InputLabel-C3lBKQeI.js";import"./InputStack-DO5lXlgp.js";import"./tokens-BwScSksM.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./VStack-CnEfMFeL.js";import"./ColorSurge-D5iBCkQQ.js";import"./useMotionProps-CS-LE6l8.js";import"./utils-CwomCnHN.js";import"./use-animation-CYeuSrS_.js";import"./motion-minimal-SVRWJYUW.js";import"./NativeInput-CDtkEvxu.js";import"./index-Cz8MjafU.js";import"./Spacer-BI_0XOyg.js";import"./Grid-D-Uw9y2v.js";import"./Tooltip-Crqfeox4.js";import"./Popover-CipwoaXC.js";import"./NewAnimatePresence-BbA2hDPb.js";import"./index-B2twlf45.js";import"./use-unmount-effect-5QIafHMH.js";import"./FocusTrap-90tMQkIg.js";import"./debounce-fynzmAtJ.js";import"./Overlay-XiDupmt3.js";import"./OverlayContentContext-hT53AGt-.js";import"./Portal-tAONErW2.js";import"./TooltipContent-BbVg49nw.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./dropdown-CDhCThJm.js";import"./InputIconButton-BGgDza3y.js";import"./IconButton-OIX0AFCz.js";import"./Button-W9Shg4T1.js";import"./Spinner-BAI0lrZ-.js";const Se={title:"Components/Dates/A11yTest",component:l,parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1},{id:"aria-required-children",enabled:!1}]}}}},t=new Date(new Date(2024,7,18).setHours(0,0,0,0)),b=new Date(t.getFullYear(),t.getMonth(),t.getDate()-2),g=new Date(t.getFullYear(),t.getMonth(),t.getDate()-7),E=new Date(t.getFullYear(),t.getMonth(),t.getDate()+7),I=new Date(t.getFullYear(),t.getMonth()+1,15),v=new Date(t.getFullYear(),t.getMonth()-1,15),d={invalidDateError:"Please enter a valid date",disabledDateError:"Date unavailable",requiredError:"This field is required",label:"Birthdate",calendarIconButtonAccessibilityLabel:"Birthdate calendar",helperTextErrorIconAccessibilityLabel:"Error"},u={disabledDateError:"Date unavailable",maxDate:I,minDate:v,disabledDates:[[g,b],E],highlightedDates:[[g,b],E],nextArrowAccessibilityLabel:"Next month",previousArrowAccessibilityLabel:"Previous month"},o={label:"Birthdate",calendarIconButtonAccessibilityLabel:"Birthdate calendar",helperTextErrorIconAccessibilityLabel:"Error",nextArrowAccessibilityLabel:"Next month",previousArrowAccessibilityLabel:"Previous month",invalidDateError:"Please enter a valid date",disabledDateError:"Date unavailable",requiredError:"This field is required"},p=()=>{const[n,T]=h.useState(t),[f,j]=h.useState(null),[c,m]=h.useState(new k("custom","This is a custom error")),r={date:n,onChangeDate:T,error:f,onErrorDate:j};return e.jsxs(e.Fragment,{children:[e.jsx(D,{activeColorScheme:"light",theme:P,children:e.jsxs(x,{background:"bg",gap:8,margin:-2,padding:2,children:[e.jsx(i,{font:"title1",children:"DateInput"}),e.jsx(s,{...d,...r}),e.jsx(s,{disabled:!0,...d,...r}),e.jsx(s,{...d,...r,error:c,onErrorDate:m}),e.jsx(i,{font:"title1",children:"Calendar"}),e.jsx(l,{selectedDate:n,...u}),e.jsx(l,{disabled:!0,selectedDate:n,...u}),e.jsx(i,{font:"title1",children:"DatePicker"}),e.jsx(a,{...o,...r}),e.jsx(a,{disabled:!0,...o,...r}),e.jsx(a,{disabled:!0,...o,...r,error:c,onErrorDate:m}),e.jsx(a,{defaultOpen:!0,...o,...r})]})}),e.jsx(S,{paddingTop:8}),e.jsx(D,{activeColorScheme:"dark",theme:P,children:e.jsxs(x,{background:"bg",gap:8,margin:-2,padding:2,children:[e.jsx(i,{font:"title1",children:"DateInput"}),e.jsx(s,{...d,...r}),e.jsx(s,{disabled:!0,...d,...r}),e.jsx(s,{...d,...r,error:c,onErrorDate:m}),e.jsx(i,{font:"title1",children:"Calendar"}),e.jsx(l,{selectedDate:n,...u}),e.jsx(l,{disabled:!0,selectedDate:n,...u}),e.jsx(i,{font:"title1",children:"DatePicker"}),e.jsx(a,{...o,...r}),e.jsx(a,{disabled:!0,...o,...r}),e.jsx(a,{disabled:!0,...o,...r,error:c,onErrorDate:m}),e.jsx(a,{defaultOpen:!0,...o,...r})]})})]})};p.__docgenInfo={description:"",methods:[],displayName:"A11yTest"};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => {
  const [date, setDate] = useState<Date | null>(today);
  const [error, setError] = useState<DateInputValidationError | null>(null);
  const [error2, setError2] = useState<DateInputValidationError | null>(new DateInputValidationError('custom', 'This is a custom error'));
  const stateProps = {
    date,
    onChangeDate: setDate,
    error,
    onErrorDate: setError
  };
  return <>
      <ThemeProvider activeColorScheme="light" theme={defaultTheme}>
        <Group background="bg" gap={8} margin={-2} padding={2}>
          <Text font="title1">DateInput</Text>
          <DateInput {...dateInputSharedProps} {...stateProps} />
          <DateInput disabled {...dateInputSharedProps} {...stateProps} />
          <DateInput {...dateInputSharedProps} {...stateProps} error={error2} onErrorDate={setError2} />
          <Text font="title1">Calendar</Text>
          <Calendar selectedDate={date} {...calendarSharedProps} />
          <Calendar disabled selectedDate={date} {...calendarSharedProps} />
          <Text font="title1">DatePicker</Text>
          <DatePicker {...datePickerSharedProps} {...stateProps} />
          <DatePicker disabled {...datePickerSharedProps} {...stateProps} />
          <DatePicker disabled {...datePickerSharedProps} {...stateProps} error={error2} onErrorDate={setError2} />
          <DatePicker defaultOpen {...datePickerSharedProps} {...stateProps} />
        </Group>
      </ThemeProvider>
      <Box paddingTop={8} />
      <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
        <Group background="bg" gap={8} margin={-2} padding={2}>
          <Text font="title1">DateInput</Text>
          <DateInput {...dateInputSharedProps} {...stateProps} />
          <DateInput disabled {...dateInputSharedProps} {...stateProps} />
          <DateInput {...dateInputSharedProps} {...stateProps} error={error2} onErrorDate={setError2} />
          <Text font="title1">Calendar</Text>
          <Calendar selectedDate={date} {...calendarSharedProps} />
          <Calendar disabled selectedDate={date} {...calendarSharedProps} />
          <Text font="title1">DatePicker</Text>
          <DatePicker {...datePickerSharedProps} {...stateProps} />
          <DatePicker disabled {...datePickerSharedProps} {...stateProps} />
          <DatePicker disabled {...datePickerSharedProps} {...stateProps} error={error2} onErrorDate={setError2} />
          <DatePicker defaultOpen {...datePickerSharedProps} {...stateProps} />
        </Group>
      </ThemeProvider>
    </>;
}`,...p.parameters?.docs?.source}}};const ke=["A11yTest"];export{p as A11yTest,ke as __namedExportsOrder,Se as default};
