import{r as p,j as e,a5 as S,a6 as g}from"./iframe-CYDANtMt.js";import{L as E}from"./LocaleProvider-szkYova-.js";import{I as D}from"./InputLabel-BwQhf82V.js";import{G as I}from"./Group-DaMW0Ji9.js";import{V as n}from"./VStack-iXgNewwv.js";import{a}from"./DateInput-M5wGI-JP.js";import{N as o}from"./Note-DtNfCwe8.js";import{T as j}from"./Tooltip-D5095Ene.js";import{H as b}from"./HStack-Fh-9TmPm.js";import{I as x}from"./Icon-DRxKkZdt.js";import"./preload-helper-D9Z9MdNV.js";import"./Text-0g3rWpAf.js";import"./index-Cz8MjafU.js";import"./Spacer-BbrrPdew.js";import"./getTimesFromDatesAndRanges-DfkYzdjX.js";import"./TextInput-D1xg7XYw.js";import"./useMergeRefs-DR4sGa7m.js";import"./usePrefixedId-D1yZvkEs.js";import"./context-C9K9uJvD.js";import"./HelperText-0iJbV5oL.js";import"./InputStack-uMkha90v.js";import"./tokens-BwScSksM.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";import"./useTheme-C_Ehsh33.js";import"./ColorSurge-COlvd6LS.js";import"./useMotionProps-BF3bCUsm.js";import"./utils-CM_X5is-.js";import"./use-animation-B-MH_N0S.js";import"./motion-minimal-B1h7XI-_.js";import"./NativeInput-Dr3zj32e.js";import"./Popover-CdSD4lsc.js";import"./NewAnimatePresence-BIvSMOo2.js";import"./index-DaxQGrHc.js";import"./use-unmount-effect-DjWyEMV9.js";import"./FocusTrap-D5jofIBF.js";import"./debounce-fynzmAtJ.js";import"./Overlay-BrSXLw2H.js";import"./OverlayContentContext-D3LfdOuR.js";import"./Portal-BNKVVywf.js";import"./TooltipContent-BT-L0t0g.js";const ce={title:"Components/Dates/DateInput",component:a},d=new Date(new Date(2024,7,18).setHours(0,0,0,0)),f=new Date(d.getFullYear(),d.getMonth(),d.getDate()-1),r={invalidDateError:"Please enter a valid date",disabledDateError:"Date unavailable",requiredError:"This field is required"},s=()=>{const[c,u]=p.useState(null),[m,h]=p.useState(null),t={date:c,onChangeDate:u,error:m,onErrorDate:h};return e.jsxs(I,{gap:8,paddingEnd:8,children:[e.jsxs(n,{children:[e.jsx(o,{children:"DateInput"}),e.jsx(a,{required:!0,...r,...t})]}),e.jsxs(n,{children:[e.jsx(o,{children:"DateInput ES-es locale"}),e.jsx(E,{locale:"ES-es",children:e.jsx(a,{...r,...t})})]}),e.jsxs(n,{children:[e.jsx(o,{children:"DateInput dark mode"}),e.jsx(S,{activeColorScheme:"dark",theme:g,children:e.jsx(a,{...r,...t})})]}),e.jsxs(n,{children:[e.jsx(o,{children:"DateInput compact"}),e.jsx(a,{compact:!0,...r,...t})]})]})};s.parameters={a11y:{disable:!0}};const i=()=>{const[c,u]=p.useState(d),[m,h]=p.useState(null),t={date:c,onChangeDate:u,error:m,onErrorDate:h};return e.jsxs(I,{gap:8,paddingEnd:8,children:[e.jsxs(n,{children:[e.jsxs(o,{children:["DateInput with invalidDateError (always required)",e.jsx("br",{}),e.jsx("br",{}),"Enter an impossible month or day number to see the result"]}),e.jsx(a,{...r,...t})]}),e.jsxs(n,{children:[e.jsx(o,{children:"DateInput with date"}),e.jsx(a,{...r,...t})]}),e.jsxs(n,{children:[e.jsxs(o,{children:["DateInput with disabledDates and disabledDateError",e.jsx("br",{}),e.jsx("br",{}),"Enter the date of Aug 18, 2024 to see the result"]}),e.jsx(a,{...r,...t,disabledDates:[d]})]}),e.jsxs(n,{children:[e.jsxs(o,{children:["DateInput with minDate, maxDate, and disabledDateError",e.jsx("br",{}),e.jsx("br",{}),"Enter a date several days before or after Aug 18, 2024 to see the result"]}),e.jsx(a,{...r,...t,maxDate:d,minDate:f})]}),e.jsxs(n,{children:[e.jsx(o,{children:"DateInput with separator"}),e.jsx(a,{...r,...t,separator:"-"})]}),e.jsxs(n,{children:[e.jsx(o,{children:"DateInput with labelNode"}),e.jsx(a,{...r,...t,accessibilityLabel:"Date of birth",labelNode:e.jsxs(b,{alignItems:"center",children:[e.jsx(D,{children:"Date of birth"}),e.jsx(j,{content:"This will be visible to other users.",children:e.jsx(x,{active:!0,color:"fg",name:"info",padding:.75,size:"xs",tabIndex:0})})]})})]}),e.jsxs(n,{children:[e.jsx(o,{children:"DateInput with start, end, and placeholder"}),e.jsx(a,{...r,...t,end:e.jsx(x,{active:!0,name:"camera",padding:2,size:"m"}),placeholder:"Hello world",start:e.jsx(x,{name:"blockchain",padding:2,size:"m"})})]}),e.jsxs(n,{children:[e.jsx(o,{children:"DateInput with disabled"}),e.jsx(a,{disabled:!0,...r,...t})]}),e.jsxs(n,{children:[e.jsx(o,{children:"DateInput with required"}),e.jsx(a,{required:!0,...r,...t})]})]})};i.parameters={a11y:{disable:!0}};const l=()=>{const[c,u]=p.useState(null),[m,h]=p.useState(null),t={date:c,onChangeDate:u,error:m,onErrorDate:h};return e.jsxs(n,{gap:2,children:[e.jsx(a,{...r,...t,accessibilityLabel:"Date of birth",id:"dob-tooltip",labelNode:e.jsx(D,{htmlFor:"dob-tooltip",children:e.jsxs(b,{alignItems:"center",children:["Date of birth",e.jsx(j,{content:"This will be visible to other users.",children:e.jsx(x,{active:!0,color:"fg",name:"info",size:"xs",tabIndex:0})})]})})}),e.jsx(a,{compact:!0,...r,...t,accessibilityLabel:"Start date",labelNode:e.jsx(D,{children:e.jsxs(b,{alignItems:"center",gap:.5,children:["Start date",e.jsx("span",{style:{color:"var(--color-fgNegative)"},children:"*"})]})})}),e.jsx(a,{...r,...t,accessibilityLabel:"End date",id:"end-date-inside",labelNode:e.jsx(D,{htmlFor:"end-date-inside",paddingY:0,children:e.jsxs(b,{alignItems:"center",gap:1,children:["End date",e.jsx("span",{style:{color:"var(--color-fgMuted)",fontSize:"var(--font-legal)"},children:"(optional)"})]})}),labelVariant:"inside"})]})};l.parameters={a11y:{disable:!0}};s.__docgenInfo={description:"",methods:[],displayName:"Examples"};i.__docgenInfo={description:"",methods:[],displayName:"Props"};l.__docgenInfo={description:"",methods:[],displayName:"CustomLabel"};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`() => {
  const [date, setDate] = useState<Date | null>(null);
  const [error, setError] = useState<DateInputValidationError | null>(null);
  const props = {
    date,
    onChangeDate: setDate,
    error,
    onErrorDate: setError
  };
  return <Group gap={8} paddingEnd={8}>
      <VStack>
        <Note>DateInput</Note>
        <DateInput required {...sharedProps} {...props} />
      </VStack>
      <VStack>
        <Note>DateInput ES-es locale</Note>
        <LocaleProvider locale="ES-es">
          <DateInput {...sharedProps} {...props} />
        </LocaleProvider>
      </VStack>
      <VStack>
        <Note>DateInput dark mode</Note>
        <ThemeProvider activeColorScheme="dark" theme={defaultTheme}>
          <DateInput {...sharedProps} {...props} />
        </ThemeProvider>
      </VStack>
      <VStack>
        <Note>DateInput compact</Note>
        <DateInput compact {...sharedProps} {...props} />
      </VStack>
    </Group>;
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`() => {
  const [date, setDate] = useState<Date | null>(today);
  const [error, setError] = useState<DateInputValidationError | null>(null);
  const props = {
    date,
    onChangeDate: setDate,
    error,
    onErrorDate: setError
  };
  return <Group gap={8} paddingEnd={8}>
      <VStack>
        <Note>
          DateInput with invalidDateError (always required)
          <br />
          <br />
          Enter an impossible month or day number to see the result
        </Note>
        <DateInput {...sharedProps} {...props} />
      </VStack>
      <VStack>
        <Note>DateInput with date</Note>
        <DateInput {...sharedProps} {...props} />
      </VStack>
      <VStack>
        <Note>
          DateInput with disabledDates and disabledDateError
          <br />
          <br />
          Enter the date of Aug 18, 2024 to see the result
        </Note>
        <DateInput {...sharedProps} {...props} disabledDates={[today]} />
      </VStack>
      <VStack>
        <Note>
          DateInput with minDate, maxDate, and disabledDateError
          <br />
          <br />
          Enter a date several days before or after Aug 18, 2024 to see the result
        </Note>
        <DateInput {...sharedProps} {...props} maxDate={today} minDate={oneDayAgo} />
      </VStack>
      <VStack>
        <Note>DateInput with separator</Note>
        <DateInput {...sharedProps} {...props} separator="-" />
      </VStack>
      <VStack>
        <Note>DateInput with labelNode</Note>
        <DateInput {...sharedProps} {...props} accessibilityLabel="Date of birth" labelNode={<HStack alignItems="center">
              <InputLabel>Date of birth</InputLabel>
              <Tooltip content="This will be visible to other users.">
                <Icon active color="fg" name="info" padding={0.75} size="xs" tabIndex={0} />
              </Tooltip>
            </HStack>} />
      </VStack>
      <VStack>
        <Note>DateInput with start, end, and placeholder</Note>
        <DateInput {...sharedProps} {...props} end={<Icon active name="camera" padding={2} size="m" />} placeholder="Hello world" start={<Icon name="blockchain" padding={2} size="m" />} />
      </VStack>
      <VStack>
        <Note>DateInput with disabled</Note>
        <DateInput disabled {...sharedProps} {...props} />
      </VStack>
      <VStack>
        <Note>DateInput with required</Note>
        <DateInput required {...sharedProps} {...props} />
      </VStack>
    </Group>;
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`() => {
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
      <DateInput {...sharedProps} {...props} accessibilityLabel="Date of birth" id="dob-tooltip" labelNode={<InputLabel htmlFor="dob-tooltip">
            <HStack alignItems="center">
              Date of birth
              <Tooltip content="This will be visible to other users.">
                <Icon active color="fg" name="info" size="xs" tabIndex={0} />
              </Tooltip>
            </HStack>
          </InputLabel>} />
      {/* Compact with required indicator */}
      <DateInput compact {...sharedProps} {...props} accessibilityLabel="Start date" labelNode={<InputLabel>
            <HStack alignItems="center" gap={0.5}>
              Start date
              <span style={{
          color: 'var(--color-fgNegative)'
        }}>*</span>
            </HStack>
          </InputLabel>} />
      {/* Inside variant with optional indicator */}
      <DateInput {...sharedProps} {...props} accessibilityLabel="End date" id="end-date-inside" labelNode={<InputLabel htmlFor="end-date-inside" paddingY={0}>
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
    </VStack>;
}`,...l.parameters?.docs?.source}}};const ue=["Examples","Props","CustomLabel"];export{l as CustomLabel,s as Examples,i as Props,ue as __namedExportsOrder,ce as default};
