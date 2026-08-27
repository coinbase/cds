import{w as u,u as a,a as y,e as w}from"./index-CsaGt7y2.js";import{p as r}from"./storybook-BVrW2YSd.js";import{r as p,j as t}from"./iframe-CsG_6vZR.js";import{T as o}from"./TextInput-D5KGlaku.js";import{V as x}from"./VStack-Cg_Yq2u4.js";import{H as c}from"./HStack-DaDYipoP.js";import{B as S}from"./Button-D2WSek5T.js";import{T as b}from"./Text-B1CpMNU3.js";import"./index-Cz8MjafU.js";import"./index-DrFu-skq.js";import"./preload-helper-D9Z9MdNV.js";import"./useMergeRefs-DR4sGa7m.js";import"./usePrefixedId-BL1THI0P.js";import"./context-fDezSldV.js";import"./HelperText-W0U74shX.js";import"./Icon-DTs0crZh.js";import"./useTheme-CmrOhAty.js";import"./InputLabel-CdlU6JsR.js";import"./InputStack-BFRjE954.js";import"./tokens-BwScSksM.js";import"./Interactable--rqISG90.js";import"./color-Ceo1QMNe.js";import"./ColorSurge-2yE2z4Kr.js";import"./useMotionProps-BXBckQBf.js";import"./utils-y2S18Lx0.js";import"./use-animation-DHwoMYVB.js";import"./motion-minimal-5s2ikV7b.js";import"./NativeInput-8PS_q8WF.js";import"./Spinner-C8x8bhOH.js";import"./Pressable-DDN99tmF.js";import"./isArray-M0ytM-vC.js";const l=({...s})=>{const[n,m]=p.useState(!1),d=p.useCallback(()=>{m(!n)},[n]);return t.jsx("form",{...s,method:"get",children:t.jsxs(x,{gap:3,children:[t.jsx(o,{helperText:"Please enter your primary address.",label:"Street address",placeholder:"4321 Jade Palace"}),t.jsx(o,{"aria-required":"true",label:"Unit #"}),t.jsxs(c,{gap:3,children:[t.jsx(o,{label:"City/town",width:"70%"}),t.jsx(o,{label:"State",width:"30%"})]}),t.jsxs(c,{gap:3,children:[t.jsx(o,{label:"Postal code",width:"40%"}),t.jsx(o,{label:"Country",width:"60%"})]}),t.jsx(S,{onClick:d,testID:"save-btn",type:"submit",children:"Save"}),n&&t.jsx(b,{as:"h1",display:"block",font:"title1",children:"Submit button was clicked"})]})})};l.__docgenInfo={description:"",methods:[],displayName:"AddressForm"};const X={title:"Interactive/TextInput",component:l},i={args:{onSubmit:s=>{s.preventDefault()}},play:async({canvasElement:s})=>{const e=u(s);await a.type(e.getByPlaceholderText("4321 Jade Palace"),"221 Stockholm Street"),await r(1e3),await a.type(e.getByLabelText("City/town"),"San Jose"),await r(1e3),await a.type(e.getByLabelText("State"),"California"),await r(1e3),await a.type(e.getByLabelText("Postal code"),"89201"),await r(1e3),await a.type(e.getByLabelText("Country"),"United States"),await r(1e3),await a.click(e.getByTestId("save-btn")),await r(1e3),await y(()=>w(e.getByText("Submit button was clicked")).toBeInTheDocument())}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
