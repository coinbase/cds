import{r as h,j as e,a5 as D,a6 as P,B as S}from"./iframe-CsG_6vZR.js";import{D as k,a as s}from"./DateInput-DH12Y69k.js";import{G as x}from"./Group-Cn4U7BNT.js";import{T as i}from"./Text-B1CpMNU3.js";import{C as l}from"./Calendar-x2jbuJHV.js";import{D as a}from"./DatePicker-C2SkiOgR.js";import"./preload-helper-D9Z9MdNV.js";import"./getTimesFromDatesAndRanges-DfkYzdjX.js";import"./LocaleProvider-1_YRG_YP.js";import"./TextInput-D5KGlaku.js";import"./useMergeRefs-DR4sGa7m.js";import"./usePrefixedId-BL1THI0P.js";import"./HStack-DaDYipoP.js";import"./context-fDezSldV.js";import"./HelperText-W0U74shX.js";import"./Icon-DTs0crZh.js";import"./useTheme-CmrOhAty.js";import"./InputLabel-CdlU6JsR.js";import"./InputStack-BFRjE954.js";import"./tokens-BwScSksM.js";import"./Interactable--rqISG90.js";import"./color-Ceo1QMNe.js";import"./VStack-Cg_Yq2u4.js";import"./ColorSurge-2yE2z4Kr.js";import"./useMotionProps-BXBckQBf.js";import"./utils-y2S18Lx0.js";import"./use-animation-DHwoMYVB.js";import"./motion-minimal-5s2ikV7b.js";import"./NativeInput-8PS_q8WF.js";import"./index-Cz8MjafU.js";import"./Spacer-DighYh4h.js";import"./Grid-CWBGGY0-.js";import"./Tooltip-DdBi_ZOF.js";import"./Popover-BqkIPLOm.js";import"./NewAnimatePresence-P1FndR1q.js";import"./index-CpZJTW5x.js";import"./use-unmount-effect-DmgCrakR.js";import"./FocusTrap-C5pHOjrH.js";import"./debounce-fynzmAtJ.js";import"./Overlay-DkQgdcBj.js";import"./OverlayContentContext-CpXWuzdo.js";import"./Portal-BaLq4aAx.js";import"./TooltipContent-CdVyoQz2.js";import"./Pressable-DDN99tmF.js";import"./isArray-M0ytM-vC.js";import"./dropdown-CDhCThJm.js";import"./InputIconButton-D6rP7VAA.js";import"./IconButton-DNJ86Kiu.js";import"./Button-D2WSek5T.js";import"./Spinner-C8x8bhOH.js";const Se={title:"Components/Dates/A11yTest",component:l,parameters:{a11y:{config:{rules:[{id:"color-contrast",enabled:!1},{id:"aria-required-children",enabled:!1}]}}}},t=new Date(new Date(2024,7,18).setHours(0,0,0,0)),b=new Date(t.getFullYear(),t.getMonth(),t.getDate()-2),g=new Date(t.getFullYear(),t.getMonth(),t.getDate()-7),E=new Date(t.getFullYear(),t.getMonth(),t.getDate()+7),I=new Date(t.getFullYear(),t.getMonth()+1,15),v=new Date(t.getFullYear(),t.getMonth()-1,15),d={invalidDateError:"Please enter a valid date",disabledDateError:"Date unavailable",requiredError:"This field is required",label:"Birthdate",calendarIconButtonAccessibilityLabel:"Birthdate calendar",helperTextErrorIconAccessibilityLabel:"Error"},u={disabledDateError:"Date unavailable",maxDate:I,minDate:v,disabledDates:[[g,b],E],highlightedDates:[[g,b],E],nextArrowAccessibilityLabel:"Next month",previousArrowAccessibilityLabel:"Previous month"},o={label:"Birthdate",calendarIconButtonAccessibilityLabel:"Birthdate calendar",helperTextErrorIconAccessibilityLabel:"Error",nextArrowAccessibilityLabel:"Next month",previousArrowAccessibilityLabel:"Previous month",invalidDateError:"Please enter a valid date",disabledDateError:"Date unavailable",requiredError:"This field is required"},p=()=>{const[n,T]=h.useState(t),[f,j]=h.useState(null),[c,m]=h.useState(new k("custom","This is a custom error")),r={date:n,onChangeDate:T,error:f,onErrorDate:j};return e.jsxs(e.Fragment,{children:[e.jsx(D,{activeColorScheme:"light",theme:P,children:e.jsxs(x,{background:"bg",gap:8,margin:-2,padding:2,children:[e.jsx(i,{font:"title1",children:"DateInput"}),e.jsx(s,{...d,...r}),e.jsx(s,{disabled:!0,...d,...r}),e.jsx(s,{...d,...r,error:c,onErrorDate:m}),e.jsx(i,{font:"title1",children:"Calendar"}),e.jsx(l,{selectedDate:n,...u}),e.jsx(l,{disabled:!0,selectedDate:n,...u}),e.jsx(i,{font:"title1",children:"DatePicker"}),e.jsx(a,{...o,...r}),e.jsx(a,{disabled:!0,...o,...r}),e.jsx(a,{disabled:!0,...o,...r,error:c,onErrorDate:m}),e.jsx(a,{defaultOpen:!0,...o,...r})]})}),e.jsx(S,{paddingTop:8}),e.jsx(D,{activeColorScheme:"dark",theme:P,children:e.jsxs(x,{background:"bg",gap:8,margin:-2,padding:2,children:[e.jsx(i,{font:"title1",children:"DateInput"}),e.jsx(s,{...d,...r}),e.jsx(s,{disabled:!0,...d,...r}),e.jsx(s,{...d,...r,error:c,onErrorDate:m}),e.jsx(i,{font:"title1",children:"Calendar"}),e.jsx(l,{selectedDate:n,...u}),e.jsx(l,{disabled:!0,selectedDate:n,...u}),e.jsx(i,{font:"title1",children:"DatePicker"}),e.jsx(a,{...o,...r}),e.jsx(a,{disabled:!0,...o,...r}),e.jsx(a,{disabled:!0,...o,...r,error:c,onErrorDate:m}),e.jsx(a,{defaultOpen:!0,...o,...r})]})})]})};p.__docgenInfo={description:"",methods:[],displayName:"A11yTest"};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => {
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
