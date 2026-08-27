import{r as h,j as e,a5 as D,a6 as P,B as S}from"./iframe-CYDANtMt.js";import{D as k,a as s}from"./DateInput-M5wGI-JP.js";import{G as x}from"./Group-DaMW0Ji9.js";import{T as i}from"./Text-0g3rWpAf.js";import{C as l}from"./Calendar-CpbUxbxY.js";import{D as a}from"./DatePicker-RpY9sR-8.js";import"./preload-helper-D9Z9MdNV.js";import"./getTimesFromDatesAndRanges-DfkYzdjX.js";import"./LocaleProvider-szkYova-.js";import"./TextInput-D1xg7XYw.js";import"./useMergeRefs-DR4sGa7m.js";import"./usePrefixedId-D1yZvkEs.js";import"./HStack-Fh-9TmPm.js";import"./context-C9K9uJvD.js";import"./HelperText-0iJbV5oL.js";import"./Icon-DRxKkZdt.js";import"./useTheme-C_Ehsh33.js";import"./InputLabel-BwQhf82V.js";import"./InputStack-uMkha90v.js";import"./tokens-BwScSksM.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";import"./VStack-iXgNewwv.js";import"./ColorSurge-COlvd6LS.js";import"./useMotionProps-BF3bCUsm.js";import"./utils-CM_X5is-.js";import"./use-animation-B-MH_N0S.js";import"./motion-minimal-B1h7XI-_.js";import"./NativeInput-Dr3zj32e.js";import"./index-Cz8MjafU.js";import"./Spacer-BbrrPdew.js";import"./Grid-BDV7e3L3.js";import"./Tooltip-D5095Ene.js";import"./Popover-CdSD4lsc.js";import"./NewAnimatePresence-BIvSMOo2.js";import"./index-DaxQGrHc.js";import"./use-unmount-effect-DjWyEMV9.js";import"./FocusTrap-D5jofIBF.js";import"./debounce-fynzmAtJ.js";import"./Overlay-BrSXLw2H.js";import"./OverlayContentContext-D3LfdOuR.js";import"./Portal-BNKVVywf.js";import"./TooltipContent-BT-L0t0g.js";import"./Pressable-BvczHaFK.js";import"./isArray-BJmyNVUi.js";import"./dropdown-CDhCThJm.js";import"./InputIconButton-CL-x4fcy.js";import"./IconButton-D-CYL-b9.js";import"./Button-DPtA13Wn.js";import"./Spinner-CXotWqqb.js";const Se={title:"Components/Dates/A11yTest",component:l,parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1},{id:"aria-required-children",enabled:!1}]}}}},t=new Date(new Date(2024,7,18).setHours(0,0,0,0)),b=new Date(t.getFullYear(),t.getMonth(),t.getDate()-2),g=new Date(t.getFullYear(),t.getMonth(),t.getDate()-7),E=new Date(t.getFullYear(),t.getMonth(),t.getDate()+7),I=new Date(t.getFullYear(),t.getMonth()+1,15),v=new Date(t.getFullYear(),t.getMonth()-1,15),d={invalidDateError:"Please enter a valid date",disabledDateError:"Date unavailable",requiredError:"This field is required",label:"Birthdate",calendarIconButtonAccessibilityLabel:"Birthdate calendar",helperTextErrorIconAccessibilityLabel:"Error"},u={disabledDateError:"Date unavailable",maxDate:I,minDate:v,disabledDates:[[g,b],E],highlightedDates:[[g,b],E],nextArrowAccessibilityLabel:"Next month",previousArrowAccessibilityLabel:"Previous month"},o={label:"Birthdate",calendarIconButtonAccessibilityLabel:"Birthdate calendar",helperTextErrorIconAccessibilityLabel:"Error",nextArrowAccessibilityLabel:"Next month",previousArrowAccessibilityLabel:"Previous month",invalidDateError:"Please enter a valid date",disabledDateError:"Date unavailable",requiredError:"This field is required"},p=()=>{const[n,T]=h.useState(t),[f,j]=h.useState(null),[c,m]=h.useState(new k("custom","This is a custom error")),r={date:n,onChangeDate:T,error:f,onErrorDate:j};return e.jsxs(e.Fragment,{children:[e.jsx(D,{activeColorScheme:"light",theme:P,children:e.jsxs(x,{background:"bg",gap:8,margin:-2,padding:2,children:[e.jsx(i,{font:"title1",children:"DateInput"}),e.jsx(s,{...d,...r}),e.jsx(s,{disabled:!0,...d,...r}),e.jsx(s,{...d,...r,error:c,onErrorDate:m}),e.jsx(i,{font:"title1",children:"Calendar"}),e.jsx(l,{selectedDate:n,...u}),e.jsx(l,{disabled:!0,selectedDate:n,...u}),e.jsx(i,{font:"title1",children:"DatePicker"}),e.jsx(a,{...o,...r}),e.jsx(a,{disabled:!0,...o,...r}),e.jsx(a,{disabled:!0,...o,...r,error:c,onErrorDate:m}),e.jsx(a,{defaultOpen:!0,...o,...r})]})}),e.jsx(S,{paddingTop:8}),e.jsx(D,{activeColorScheme:"dark",theme:P,children:e.jsxs(x,{background:"bg",gap:8,margin:-2,padding:2,children:[e.jsx(i,{font:"title1",children:"DateInput"}),e.jsx(s,{...d,...r}),e.jsx(s,{disabled:!0,...d,...r}),e.jsx(s,{...d,...r,error:c,onErrorDate:m}),e.jsx(i,{font:"title1",children:"Calendar"}),e.jsx(l,{selectedDate:n,...u}),e.jsx(l,{disabled:!0,selectedDate:n,...u}),e.jsx(i,{font:"title1",children:"DatePicker"}),e.jsx(a,{...o,...r}),e.jsx(a,{disabled:!0,...o,...r}),e.jsx(a,{disabled:!0,...o,...r,error:c,onErrorDate:m}),e.jsx(a,{defaultOpen:!0,...o,...r})]})})]})};p.__docgenInfo={description:"",methods:[],displayName:"A11yTest"};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => {
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
