import{r as s,j as e,a5 as K,a6 as Q,B as _}from"./iframe-CYDANtMt.js";import{D as U}from"./DateInput-M5wGI-JP.js";import{L as X}from"./LocaleProvider-szkYova-.js";import{I}from"./InputLabel-BwQhf82V.js";import{T as F}from"./TextInput-D1xg7XYw.js";import{H as p}from"./HStack-Fh-9TmPm.js";import{V as i}from"./VStack-iXgNewwv.js";import{T as z}from"./Tooltip-D5095Ene.js";import{D as n}from"./DatePicker-RpY9sR-8.js";import{N as c}from"./Note-DtNfCwe8.js";import{I as O}from"./Icon-DRxKkZdt.js";import"./preload-helper-D9Z9MdNV.js";import"./getTimesFromDatesAndRanges-DfkYzdjX.js";import"./Text-0g3rWpAf.js";import"./useMergeRefs-DR4sGa7m.js";import"./usePrefixedId-D1yZvkEs.js";import"./context-C9K9uJvD.js";import"./HelperText-0iJbV5oL.js";import"./InputStack-uMkha90v.js";import"./tokens-BwScSksM.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";import"./useTheme-C_Ehsh33.js";import"./ColorSurge-COlvd6LS.js";import"./useMotionProps-BF3bCUsm.js";import"./utils-CM_X5is-.js";import"./use-animation-B-MH_N0S.js";import"./motion-minimal-B1h7XI-_.js";import"./NativeInput-Dr3zj32e.js";import"./Popover-CdSD4lsc.js";import"./NewAnimatePresence-BIvSMOo2.js";import"./index-DaxQGrHc.js";import"./use-unmount-effect-DjWyEMV9.js";import"./FocusTrap-D5jofIBF.js";import"./debounce-fynzmAtJ.js";import"./Overlay-BrSXLw2H.js";import"./OverlayContentContext-D3LfdOuR.js";import"./Portal-BNKVVywf.js";import"./TooltipContent-BT-L0t0g.js";import"./dropdown-CDhCThJm.js";import"./Calendar-CpbUxbxY.js";import"./Grid-BDV7e3L3.js";import"./Pressable-BvczHaFK.js";import"./isArray-BJmyNVUi.js";import"./InputIconButton-CL-x4fcy.js";import"./IconButton-D-CYL-b9.js";import"./Button-DPtA13Wn.js";import"./Spinner-CXotWqqb.js";const Ge={title:"Components/Dates/DatePicker",component:n},a=new Date,T=new Date(a.getFullYear(),a.getMonth(),a.getDate()-2),Y=new Date(a.getFullYear(),a.getMonth(),a.getDate()-4),H=new Date(a.getFullYear(),a.getMonth(),a.getDate()-7),W=new Date(a.getFullYear(),a.getMonth(),a.getDate()+4),L=new Date(a.getFullYear(),a.getMonth(),a.getDate()+7),R=new Date(a.getFullYear(),a.getMonth()+1,15),G=new Date(a.getFullYear(),a.getMonth()-1,15),q=new Date(a.getFullYear(),a.getMonth(),1),B=new Date(a.getFullYear(),a.getMonth()+1,0),o={maxDate:R,minDate:G,invalidDateError:"Please enter a valid date",disabledDateError:"Date unavailable",requiredError:"This field is required"},x=()=>{const[t,h]=s.useState(null),[d,D]=s.useState(null),r={date:t,onChangeDate:h,error:d,onErrorDate:D};return e.jsxs(i,{gap:8,children:[e.jsxs(i,{children:[e.jsx(c,{children:"DatePicker"}),e.jsx(n,{helperText:"",...o,...r})]}),e.jsxs(i,{children:[e.jsx(c,{children:"DatePicker ES-es locale"}),e.jsx(X,{locale:"ES-es",children:e.jsx(n,{...o,...r})})]}),e.jsxs(i,{children:[e.jsx(c,{children:"DatePicker dark mode"}),e.jsx(K,{activeColorScheme:"dark",theme:Q,children:e.jsx(n,{...o,...r})})]}),e.jsxs(i,{children:[e.jsx(c,{children:"DatePicker compact"}),e.jsx(n,{compact:!0,...o,...r})]}),e.jsxs(i,{children:[e.jsx(c,{children:"DatePicker with labelNode"}),e.jsx(n,{...o,...r,accessibilityLabel:"Date of birth",labelNode:e.jsxs(p,{alignItems:"center",children:[e.jsx(I,{children:"Date of birth"}),e.jsx(z,{content:"This will be visible to other users.",children:e.jsx(O,{active:!0,color:"fg",name:"info",padding:.75,size:"xs",tabIndex:0})})]})})]}),e.jsxs(i,{children:[e.jsx(c,{children:"DatePicker and TextInput (auto width)"}),e.jsxs(p,{gap:2,children:[e.jsx(F,{placeholder:"1"}),e.jsx(n,{...o,...r})]})]}),e.jsxs(i,{children:[e.jsx(c,{children:"DatePicker and TextInput (30% width)"}),e.jsxs(p,{gap:2,children:[e.jsx(F,{placeholder:"1",width:"30%"}),e.jsx(n,{...o,...r})]})]}),e.jsx(_,{height:100})]})};x.parameters={a11y:{disable:!0}};const M=()=>{const[t,h]=s.useState(null),[d,D]=s.useState(null),r={date:t,onChangeDate:h,error:d,onErrorDate:D};return e.jsxs(i,{gap:8,children:[e.jsxs(i,{children:[e.jsxs(c,{children:["DatePicker with all props (except disabled)",e.jsx("br",{}),e.jsx("br",{}),"minDate is ",G.toLocaleDateString(),e.jsx("br",{}),"maxDate is ",R.toLocaleDateString()]}),e.jsx(n,{required:!0,...o,...r,calendarIconButtonAccessibilityLabel:"Birthdate calendar",disabledDates:[[H,T],a,L],highlightedDates:[[Y,T],[W,L]],label:"Birthdate",nextArrowAccessibilityLabel:"Next month",previousArrowAccessibilityLabel:"Previous month"})]}),e.jsxs(i,{children:[e.jsxs(c,{children:["DatePicker with all props (except disabled)",e.jsx("br",{}),e.jsx("br",{}),"minDate is ",q.toLocaleDateString(),e.jsx("br",{}),"maxDate is ",B.toLocaleDateString()]}),e.jsx(n,{required:!0,...o,...r,calendarIconButtonAccessibilityLabel:"Birthdate calendar",disabledDates:[[H,T],a,L],highlightedDates:[[Y,T],[W,L]],label:"Birthdate",maxDate:B,minDate:q,nextArrowAccessibilityLabel:"Next month",previousArrowAccessibilityLabel:"Previous month"})]})]})},E=()=>{const[t,h]=s.useState(null),[d,D]=s.useState(null),[r,N]=s.useState(null),[v,f]=s.useState(null),[g,y]=s.useState(null),[V,w]=s.useState(null),P=s.useCallback(m=>{const C=m?new Date(m.getFullYear(),m.getMonth(),m.getDate()+5):null;h(m),D(C)},[]),b={date:g,onChangeDate:y,error:V,onErrorDate:w};return e.jsxs(i,{gap:8,children:[e.jsxs(i,{children:[e.jsxs(c,{children:["When a value is selected on the first DatePicker we suggest a value for the second DatePicker accordingly.",e.jsx("br",{}),e.jsx("br",{}),"We use both DatePicker values to highlight a range of dates."]}),e.jsxs(p,{gap:2,children:[e.jsx(n,{...o,date:t,error:r,highlightedDates:t&&d?[[t,d]]:void 0,label:"Start date",onChangeDate:P,onErrorDate:N}),e.jsx(n,{...o,date:d,disabledDates:t?[t]:void 0,error:v,highlightedDates:t&&d?[[t,d]]:void 0,label:"End date",onChangeDate:D,onErrorDate:f})]})]}),e.jsx(i,{children:e.jsxs(i,{children:[e.jsx(c,{children:"DatePicker fit-content"}),e.jsxs(p,{flexWrap:"wrap",gap:2,children:[e.jsx(n,{width:"fit-content",...o,...b}),e.jsx(n,{width:"fit-content",...o,...b}),e.jsx(n,{width:"fit-content",...o,...b})]})]})})]})};E.parameters={a11y:{disable:!0}};const S=()=>{const[t,h]=s.useState(null),[d,D]=s.useState(null),[r,N]=s.useState(null),[v,f]=s.useState(null),g=new Date(new Date(2024,7,18).setHours(0,0,0,0)),y=new Date(g.getFullYear(),g.getMonth(),1),V=new Date(g.getFullYear(),g.getMonth(),7),w=new Date(g.getFullYear(),g.getMonth()+1,0),P=[[y,V]],b=(l,u)=>{if(N(l),f(null),!l)return;const A=new Date(u.getFullYear(),u.getMonth(),u.getDate()+4),J=new Date(u.getFullYear(),u.getMonth(),u.getDate()+13);let j;l<u?j="Must come after start date":l<A?j="Must select at least 5 days":l>J&&(j="Cannot select more than 14 days"),j&&f(new U("custom",j))},m=l=>{if(h(l),!l)return;const u=new Date(l.getFullYear(),l.getMonth(),l.getDate()+7),A=new Date(Math.min(u.getTime(),w.getTime()));b(A,l)},C=l=>{t&&b(l,t)};return e.jsxs(e.Fragment,{children:[e.jsxs(c,{children:["This is a complex example using many different props. We use multiple DatePickers together to allow a user to select a date range.",e.jsx("br",{}),e.jsx("br",{}),"We enforce that the time between the start date and end date must be at least 5 days but less than 14 days long, that the end date comes after the start date, and that all days are within the current month. We use the `onChange` prop to automatically suggest an end date of 1 week after the start date, or the last of the month - whichever is sooner. We also explicitly disable 1 week at the beginning of the month."]}),e.jsxs(p,{gap:2,children:[e.jsx(n,{required:!0,date:t,disabledDateError:"Date unavailable",disabledDates:P,error:d,highlightedDates:t&&r?[[t,r]]:void 0,invalidDateError:"Please enter a valid date",label:"Start date",maxDate:w,minDate:y,onChangeDate:m,onErrorDate:D,requiredError:"This field is required"}),e.jsx(n,{required:!0,date:r,disabled:!t,disabledDateError:"Date unavailable",disabledDates:t?[...P,t]:P,error:v,highlightedDates:t&&r&&t<r?[[t,r]]:t?[t]:void 0,invalidDateError:"Please enter a valid date",label:"End date",maxDate:w,minDate:y,onChangeDate:C,onErrorDate:f,requiredError:"This field is required",variant:v?"negative":void 0})]})]})};S.parameters={a11y:{disable:!0}};const k=()=>{const[t,h]=s.useState(null),[d,D]=s.useState(null),r={date:t,onChangeDate:h,error:d,onErrorDate:D};return e.jsxs(i,{gap:2,children:[e.jsx(n,{...o,...r,accessibilityLabel:"Date of birth",id:"dob-tooltip",labelNode:e.jsx(I,{htmlFor:"dob-tooltip",children:e.jsxs(p,{alignItems:"center",children:["Date of birth",e.jsx(z,{content:"This will be visible to other users.",children:e.jsx(O,{active:!0,color:"fg",name:"info",size:"xs",tabIndex:0})})]})})}),e.jsx(n,{compact:!0,...o,...r,accessibilityLabel:"Start date",labelNode:e.jsx(I,{children:e.jsxs(p,{alignItems:"center",gap:.5,children:["Start date",e.jsx("span",{style:{color:"var(--color-fgNegative)"},children:"*"})]})})}),e.jsx(n,{...o,...r,accessibilityLabel:"End date",id:"end-date-inside",labelNode:e.jsx(I,{htmlFor:"end-date-inside",paddingY:0,children:e.jsxs(p,{alignItems:"center",gap:1,children:["End date",e.jsx("span",{style:{color:"var(--color-fgMuted)",fontSize:"var(--font-legal)"},children:"(optional)"})]})}),labelVariant:"inside"}),e.jsx(_,{height:300})]})};k.parameters={a11y:{disable:!0}};x.__docgenInfo={description:"",methods:[],displayName:"Examples"};M.__docgenInfo={description:"",methods:[],displayName:"AccessibilityLabels"};E.__docgenInfo={description:"",methods:[],displayName:"MultiplePickers"};S.__docgenInfo={description:"",methods:[],displayName:"CustomErrors"};k.__docgenInfo={description:"",methods:[],displayName:"CustomLabel"};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`() => {
  const [date, setDate] = useState<Date | null>(null);
  const [error, setError] = useState<DateInputValidationError | null>(null);
  const props = {
    date,
    onChangeDate: setDate,
    error,
    onErrorDate: setError
  };
  return <VStack gap={8}>
      <VStack>
        <Note>DatePicker</Note>
        <DatePicker helperText="" {...exampleProps} {...props} />
      </VStack>
      <VStack>
        <Note>DatePicker ES-es locale</Note>
        <LocaleProvider locale="ES-es">
          <DatePicker {...exampleProps} {...props} />
        </LocaleProvider>
      </VStack>
      <VStack>
        <Note>DatePicker dark mode</Note>
        <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
          <DatePicker {...exampleProps} {...props} />
        </ThemeProvider>
      </VStack>
      <VStack>
        <Note>DatePicker compact</Note>
        <DatePicker compact {...exampleProps} {...props} />
      </VStack>
      <VStack>
        <Note>DatePicker with labelNode</Note>
        <DatePicker {...exampleProps} {...props} accessibilityLabel="Date of birth" labelNode={<HStack alignItems="center">
              <InputLabel>Date of birth</InputLabel>
              <Tooltip content="This will be visible to other users.">
                <Icon active color="fg" name="info" padding={0.75} size="xs" tabIndex={0} />
              </Tooltip>
            </HStack>} />
      </VStack>
      <VStack>
        <Note>DatePicker and TextInput (auto width)</Note>
        <HStack gap={2}>
          <TextInput placeholder="1" />
          <DatePicker {...exampleProps} {...props} />
        </HStack>
      </VStack>
      <VStack>
        <Note>DatePicker and TextInput (30% width)</Note>
        <HStack gap={2}>
          <TextInput placeholder="1" width="30%" />
          <DatePicker {...exampleProps} {...props} />
        </HStack>
      </VStack>
      <Box height={100} />
    </VStack>;
}`,...x.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`() => {
  const [date, setDate] = useState<Date | null>(null);
  const [error, setError] = useState<DateInputValidationError | null>(null);
  const props = {
    date,
    onChangeDate: setDate,
    error,
    onErrorDate: setError
  };
  return <VStack gap={8}>
      <VStack>
        <Note>
          DatePicker with all props (except disabled)
          <br />
          <br />
          minDate is {lastMonth15th.toLocaleDateString()}
          <br />
          maxDate is {nextMonth15th.toLocaleDateString()}
        </Note>
        <DatePicker required {...exampleProps} {...props} calendarIconButtonAccessibilityLabel="Birthdate calendar" disabledDates={[[oneWeekAgo, twoDaysAgo], today, oneWeekLater]} highlightedDates={[[fourDaysAgo, twoDaysAgo], [fourDaysLater, oneWeekLater]]} label="Birthdate" nextArrowAccessibilityLabel="Next month" previousArrowAccessibilityLabel="Previous month" />
      </VStack>
      <VStack>
        <Note>
          DatePicker with all props (except disabled)
          <br />
          <br />
          minDate is {firstDayThisMonth.toLocaleDateString()}
          <br />
          maxDate is {lastDayThisMonth.toLocaleDateString()}
        </Note>
        <DatePicker required {...exampleProps} {...props} calendarIconButtonAccessibilityLabel="Birthdate calendar" disabledDates={[[oneWeekAgo, twoDaysAgo], today, oneWeekLater]} highlightedDates={[[fourDaysAgo, twoDaysAgo], [fourDaysLater, oneWeekLater]]} label="Birthdate" maxDate={lastDayThisMonth} minDate={firstDayThisMonth} nextArrowAccessibilityLabel="Next month" previousArrowAccessibilityLabel="Previous month" />
      </VStack>
    </VStack>;
}`,...M.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`() => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startError, setStartError] = useState<DateInputValidationError | null>(null);
  const [endError, setEndError] = useState<DateInputValidationError | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [error, setError] = useState<DateInputValidationError | null>(null);
  const handleStartDate = useCallback((date: Date | null) => {
    const suggestedEndDate = date ? new Date(date.getFullYear(), date.getMonth(), date.getDate() + 5) : null;
    setStartDate(date);
    setEndDate(suggestedEndDate);
  }, []);
  const props = {
    date,
    onChangeDate: setDate,
    error,
    onErrorDate: setError
  };
  return <VStack gap={8}>
      <VStack>
        <Note>
          When a value is selected on the first DatePicker we suggest a value for the second
          DatePicker accordingly.
          <br />
          <br />
          We use both DatePicker values to highlight a range of dates.
        </Note>
        <HStack gap={2}>
          <DatePicker {...exampleProps} date={startDate} error={startError} highlightedDates={startDate && endDate ? [[startDate, endDate]] : undefined} label="Start date" onChangeDate={handleStartDate} onErrorDate={setStartError} />
          <DatePicker {...exampleProps} date={endDate} disabledDates={startDate ? [startDate] : undefined} error={endError} highlightedDates={startDate && endDate ? [[startDate, endDate]] : undefined} label="End date" onChangeDate={setEndDate} onErrorDate={setEndError} />
        </HStack>
      </VStack>
      <VStack>
        <VStack>
          <Note>DatePicker fit-content</Note>
          <HStack flexWrap="wrap" gap={2}>
            <DatePicker width="fit-content" {...exampleProps} {...props} />
            <DatePicker width="fit-content" {...exampleProps} {...props} />
            <DatePicker width="fit-content" {...exampleProps} {...props} />
          </HStack>
        </VStack>
      </VStack>
    </VStack>;
}`,...E.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`() => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [startError, setStartError] = useState<DateInputValidationError | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [endError, setEndError] = useState<DateInputValidationError | null>(null);
  const today = new Date(new Date(2024, 7, 18).setHours(0, 0, 0, 0));
  const firstDayThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const seventhDayThisMonth = new Date(today.getFullYear(), today.getMonth(), 7);
  const lastDayThisMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const disabledDates: [Date, Date][] = [[firstDayThisMonth, seventhDayThisMonth]];
  const updateEndDate = (endDate: Date | null, startDate: Date) => {
    setEndDate(endDate);
    setEndError(null);
    if (!endDate) return;
    // The time from startDate to endDate must be at least 5 days and less than 14 days
    const endDateMin = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 4);
    const endDateMax = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 13);
    let errorMessage: string | undefined;
    if (endDate < startDate) errorMessage = 'Must come after start date';else if (endDate < endDateMin) errorMessage = 'Must select at least 5 days';else if (endDate > endDateMax) errorMessage = 'Cannot select more than 14 days';
    if (errorMessage) setEndError(new DateInputValidationError('custom', errorMessage));
  };
  const handleChangeDateStart = (date: Date | null) => {
    setStartDate(date);
    if (!date) return;
    // Suggest an end date based on the new start date
    const suggestedEndDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
    const newEndDate = new Date(Math.min(suggestedEndDate.getTime(), lastDayThisMonth.getTime()));
    updateEndDate(newEndDate, date);
  };
  const handleChangeDateEnd = (date: Date | null) => {
    if (startDate) updateEndDate(date, startDate);
  };
  return <>
      <Note>
        This is a complex example using many different props. We use multiple DatePickers together
        to allow a user to select a date range.
        <br />
        <br />
        We enforce that the time between the start date and end date must be at least 5 days but
        less than 14 days long, that the end date comes after the start date, and that all days are
        within the current month. We use the \`onChange\` prop to automatically suggest an end date of
        1 week after the start date, or the last of the month - whichever is sooner. We also
        explicitly disable 1 week at the beginning of the month.
      </Note>
      <HStack gap={2}>
        <DatePicker required date={startDate} disabledDateError="Date unavailable" disabledDates={disabledDates} error={startError} highlightedDates={startDate && endDate ? [[startDate, endDate]] : undefined} invalidDateError="Please enter a valid date" label="Start date" maxDate={lastDayThisMonth} minDate={firstDayThisMonth} onChangeDate={handleChangeDateStart} onErrorDate={setStartError} requiredError="This field is required" />
        <DatePicker required date={endDate} disabled={!startDate} disabledDateError="Date unavailable" disabledDates={startDate ? [...disabledDates, startDate] : disabledDates} error={endError} highlightedDates={startDate && endDate && startDate < endDate ? [[startDate, endDate]] : startDate ? [startDate] : undefined} invalidDateError="Please enter a valid date" label="End date" maxDate={lastDayThisMonth} minDate={firstDayThisMonth} onChangeDate={handleChangeDateEnd} onErrorDate={setEndError} requiredError="This field is required" variant={endError ? 'negative' : undefined} />
      </HStack>
    </>;
}`,...S.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`() => {
  const [date, setDate] = useState<Date | null>(null);
  const [error, setError] = useState<DateInputValidationError | null>(null);
  const props = {
    date,
    onChangeDate: setDate,
    error,
    onErrorDate: setError
  };
  return <VStack gap={2}>
      {/* Default with tooltip */}
      <DatePicker {...exampleProps} {...props} accessibilityLabel="Date of birth" id="dob-tooltip" labelNode={<InputLabel htmlFor="dob-tooltip">
            <HStack alignItems="center">
              Date of birth
              <Tooltip content="This will be visible to other users.">
                <Icon active color="fg" name="info" size="xs" tabIndex={0} />
              </Tooltip>
            </HStack>
          </InputLabel>} />
      {/* Compact with required indicator */}
      <DatePicker compact {...exampleProps} {...props} accessibilityLabel="Start date" labelNode={<InputLabel>
            <HStack alignItems="center" gap={0.5}>
              Start date
              <span style={{
          color: 'var(--color-fgNegative)'
        }}>*</span>
            </HStack>
          </InputLabel>} />
      {/* Inside variant with optional indicator */}
      <DatePicker {...exampleProps} {...props} accessibilityLabel="End date" id="end-date-inside" labelNode={<InputLabel htmlFor="end-date-inside" paddingY={0}>
            <HStack alignItems="center" gap={1}>
              End date
              <span style={{
          color: 'var(--color-fgMuted)',
          fontSize: 'var(--font-legal)'
        }}>
                (optional)
              </span>
            </HStack>
          </InputLabel>} labelVariant="inside" />
      <Box height={300} />
    </VStack>;
}`,...k.parameters?.docs?.source}}};const Je=["Examples","AccessibilityLabels","MultiplePickers","CustomErrors","CustomLabel"];export{M as AccessibilityLabels,S as CustomErrors,k as CustomLabel,x as Examples,E as MultiplePickers,Je as __namedExportsOrder,Ge as default};
