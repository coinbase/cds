import{w as u,u as a,a as y,e as w}from"./index-C7qTOzs2.js";import{p as r}from"./storybook-BVrW2YSd.js";import{r as p,j as t}from"./iframe-CYDANtMt.js";import{T as o}from"./TextInput-D1xg7XYw.js";import{V as x}from"./VStack-iXgNewwv.js";import{H as c}from"./HStack-Fh-9TmPm.js";import{B as S}from"./Button-DPtA13Wn.js";import{T as b}from"./Text-0g3rWpAf.js";import"./index-Cz8MjafU.js";import"./index-DrFu-skq.js";import"./preload-helper-D9Z9MdNV.js";import"./useMergeRefs-DR4sGa7m.js";import"./usePrefixedId-D1yZvkEs.js";import"./context-C9K9uJvD.js";import"./HelperText-0iJbV5oL.js";import"./Icon-DRxKkZdt.js";import"./useTheme-C_Ehsh33.js";import"./InputLabel-BwQhf82V.js";import"./InputStack-uMkha90v.js";import"./tokens-BwScSksM.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";import"./ColorSurge-COlvd6LS.js";import"./useMotionProps-BF3bCUsm.js";import"./utils-CM_X5is-.js";import"./use-animation-B-MH_N0S.js";import"./motion-minimal-B1h7XI-_.js";import"./NativeInput-Dr3zj32e.js";import"./Spinner-CXotWqqb.js";import"./Pressable-BvczHaFK.js";import"./isArray-BJmyNVUi.js";const l=({...s})=>{const[n,m]=p.useState(!1),d=p.useCallback(()=>{m(!n)},[n]);return t.jsx("form",{...s,method:"get",children:t.jsxs(x,{gap:3,children:[t.jsx(o,{helperText:"Please enter your primary address.",label:"Street address",placeholder:"4321 Jade Palace"}),t.jsx(o,{"aria-required":"true",label:"Unit #"}),t.jsxs(c,{gap:3,children:[t.jsx(o,{label:"City/town",width:"70%"}),t.jsx(o,{label:"State",width:"30%"})]}),t.jsxs(c,{gap:3,children:[t.jsx(o,{label:"Postal code",width:"40%"}),t.jsx(o,{label:"Country",width:"60%"})]}),t.jsx(S,{onClick:d,testID:"save-btn",type:"submit",children:"Save"}),n&&t.jsx(b,{as:"h1",display:"block",font:"title1",children:"Submit button was clicked"})]})})};l.__docgenInfo={description:"",methods:[],displayName:"AddressForm"};const X={title:"Interactive/TextInput",component:l},i={args:{onSubmit:s=>{s.preventDefault()}},play:async({canvasElement:s})=>{const e=u(s);await a.type(e.getByPlaceholderText("4321 Jade Palace"),"221 Stockholm Street"),await r(1e3),await a.type(e.getByLabelText("City/town"),"San Jose"),await r(1e3),await a.type(e.getByLabelText("State"),"California"),await r(1e3),await a.type(e.getByLabelText("Postal code"),"89201"),await r(1e3),await a.type(e.getByLabelText("Country"),"United States"),await r(1e3),await a.click(e.getByTestId("save-btn")),await r(1e3),await y(()=>w(e.getByText("Submit button was clicked")).toBeInTheDocument())}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    onSubmit: (e: React.FormEvent) => {
      e.preventDefault();
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByPlaceholderText('4321 Jade Palace'), '221 Stockholm Street');
    await pauseStory(1000);
    await userEvent.type(canvas.getByLabelText('City/town'), 'San Jose');
    await pauseStory(1000);
    await userEvent.type(canvas.getByLabelText('State'), 'California');
    await pauseStory(1000);
    await userEvent.type(canvas.getByLabelText('Postal code'), '89201');
    await pauseStory(1000);
    await userEvent.type(canvas.getByLabelText('Country'), 'United States');
    await pauseStory(1000);
    await userEvent.click(canvas.getByTestId('save-btn'));
    await pauseStory(1000);
    await waitFor(() => expect(canvas.getByText('Submit button was clicked')).toBeInTheDocument());
  }
}`,...i.parameters?.docs?.source}}};const Y=["FormFilled"];export{i as FormFilled,Y as __namedExportsOrder,X as default};
