import{w as u,u as a,a as y,e as w}from"./index-MhPKLhGg.js";import{p as r}from"./storybook-BVrW2YSd.js";import{r as p,j as t}from"./iframe-BXWLBCkp.js";import{T as o}from"./TextInput-CXMiH86I.js";import{V as x}from"./VStack-CnEfMFeL.js";import{H as c}from"./HStack-B6p8qBpp.js";import{B as S}from"./Button-W9Shg4T1.js";import{T as b}from"./Text-Ch_dBU4v.js";import"./index-Cz8MjafU.js";import"./index-DrFu-skq.js";import"./preload-helper-D9Z9MdNV.js";import"./useMergeRefs-DR4sGa7m.js";import"./usePrefixedId-Dfl-0DGQ.js";import"./context-Cc0ZOVig.js";import"./HelperText-C1uG41Fa.js";import"./Icon-CgDQ3NQp.js";import"./useTheme-BJazYlse.js";import"./InputLabel-C3lBKQeI.js";import"./InputStack-DO5lXlgp.js";import"./tokens-BwScSksM.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./ColorSurge-D5iBCkQQ.js";import"./useMotionProps-CS-LE6l8.js";import"./utils-CwomCnHN.js";import"./use-animation-CYeuSrS_.js";import"./motion-minimal-SVRWJYUW.js";import"./NativeInput-CDtkEvxu.js";import"./Spinner-BAI0lrZ-.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";const l=({...s})=>{const[n,m]=p.useState(!1),d=p.useCallback(()=>{m(!n)},[n]);return t.jsx("form",{...s,method:"get",children:t.jsxs(x,{gap:3,children:[t.jsx(o,{helperText:"Please enter your primary address.",label:"Street address",placeholder:"4321 Jade Palace"}),t.jsx(o,{"aria-required":"true",label:"Unit #"}),t.jsxs(c,{gap:3,children:[t.jsx(o,{label:"City/town",width:"70%"}),t.jsx(o,{label:"State",width:"30%"})]}),t.jsxs(c,{gap:3,children:[t.jsx(o,{label:"Postal code",width:"40%"}),t.jsx(o,{label:"Country",width:"60%"})]}),t.jsx(S,{onClick:d,testID:"save-btn",type:"submit",children:"Save"}),n&&t.jsx(b,{as:"h1",display:"block",font:"title1",children:"Submit button was clicked"})]})})};l.__docgenInfo={description:"",methods:[],displayName:"AddressForm"};const X={title:"Interactive/TextInput",component:l},i={args:{onSubmit:s=>{s.preventDefault()}},play:async({canvasElement:s})=>{const e=u(s);await a.type(e.getByPlaceholderText("4321 Jade Palace"),"221 Stockholm Street"),await r(1e3),await a.type(e.getByLabelText("City/town"),"San Jose"),await r(1e3),await a.type(e.getByLabelText("State"),"California"),await r(1e3),await a.type(e.getByLabelText("Postal code"),"89201"),await r(1e3),await a.type(e.getByLabelText("Country"),"United States"),await r(1e3),await a.click(e.getByTestId("save-btn")),await r(1e3),await y(()=>w(e.getByText("Submit button was clicked")).toBeInTheDocument())}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
