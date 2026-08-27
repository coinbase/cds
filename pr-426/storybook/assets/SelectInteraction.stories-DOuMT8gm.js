import{r as w,j as m}from"./iframe-CsG_6vZR.js";import{w as u,a as o,e as i,u as a}from"./index-CsaGt7y2.js";import{p as n}from"./storybook-BVrW2YSd.js";import{S as d}from"./Select-Kj5l-g9b.js";import{S as v}from"./SelectOption-BBBPgn8s.js";import"./preload-helper-D9Z9MdNV.js";import"./index-Cz8MjafU.js";import"./index-DrFu-skq.js";import"./useMergeRefs-DR4sGa7m.js";import"./InputStack-BFRjE954.js";import"./tokens-BwScSksM.js";import"./Interactable--rqISG90.js";import"./color-Ceo1QMNe.js";import"./useTheme-CmrOhAty.js";import"./HStack-DaDYipoP.js";import"./VStack-Cg_Yq2u4.js";import"./ColorSurge-2yE2z4Kr.js";import"./useMotionProps-BXBckQBf.js";import"./utils-y2S18Lx0.js";import"./use-animation-DHwoMYVB.js";import"./motion-minimal-5s2ikV7b.js";import"./InputLabel-CdlU6JsR.js";import"./Text-B1CpMNU3.js";import"./Dropdown-DlJsEaMG.js";import"./index-CKRF3JMY.js";import"./useBreakpoints-DD5uuIEx.js";import"./FocusTrap-C5pHOjrH.js";import"./debounce-fynzmAtJ.js";import"./ModalWrapper-D8IaYCfm.js";import"./NewAnimatePresence-P1FndR1q.js";import"./index-CpZJTW5x.js";import"./use-unmount-effect-DmgCrakR.js";import"./useScrollBlocker-CjG6q-zd.js";import"./Overlay-DkQgdcBj.js";import"./OverlayContentContext-CpXWuzdo.js";import"./Portal-BaLq4aAx.js";import"./Popover-BqkIPLOm.js";import"./dropdown-CDhCThJm.js";import"./Pressable-DDN99tmF.js";import"./isArray-M0ytM-vC.js";import"./context-fDezSldV.js";import"./usePrefixedId-BL1THI0P.js";import"./AnimatedCaret-BYj5sDun.js";import"./collapsible-BAneA-61.js";import"./Icon-DTs0crZh.js";import"./index-BqvvFL-B.js";import"./eventHandlers-CyvGcX2M.js";import"./HelperText-W0U74shX.js";import"./useRefocusTrigger-sY3gfxp6.js";import"./select-Em8pkxbY.js";import"./Cell-Z4wq8KY-.js";import"./useCellSpacing-BeT6oDTo.js";import"./sizing-Do56D2dQ.js";import"./CellAccessory-iu0jUwZW.js";import"./isRtl-C5Fon8jH.js";const s=["Option 1","Option 2","Option 3","Option 4","Option 5","Option 6"],c="Select an option",g=e=>{const[t,y]=w.useState(void 0);return m.jsx(d,{disablePortal:!0,onChange:y,value:t,...e,children:s.map(l=>m.jsx(v,{title:l,value:l},l))})},Bt={title:"Interactive/Select",component:g},r={args:{placeholder:c,label:"Label",helperText:"I am helpful"},play:async({canvasElement:e})=>{const t=u(e);await o(()=>i(t.getByText(c)).toBeDefined()),await a.click(t.getByRole("button")),await n(1e3),await a.click(t.getByRole("dialog")),await n(1e3),await a.click(t.getByRole("button")),await n(1e3),await a.click(t.getByText(s[4])),await n(1e3),await o(()=>i(t.getByText(s[4])).toBeDefined()),await o(()=>i(t.queryByText(c)).toBeNull()),await o(()=>i(t.queryByRole("dialog")).toBeNull())}},p={args:{placeholder:c,width:80},play:async({canvasElement:e})=>{const t=u(e);a.click(t.getByRole("button"))}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder,
    label: 'Label',
    helperText: 'I am helpful'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);

    // expect to see placeholder
    await waitFor(() => expect(canvas.getByText(placeholder)).toBeDefined());

    // open the menu
    await userEvent.click(canvas.getByRole('button'));
    await pauseStory(1000);

    // close the menu by clicking outside of it (this is hacky, but it clicks the invisible scrim)
    await userEvent.click(canvas.getByRole('dialog'));
    await pauseStory(1000);

    // open the menu again
    await userEvent.click(canvas.getByRole('button'));
    await pauseStory(1000);

    // select an option
    await userEvent.click(canvas.getByText(options[4]));
    await pauseStory(1000);

    // expect placeholder to be replaced with selected option
    await waitFor(() => expect(canvas.getByText(options[4])).toBeDefined());
    await waitFor(() => expect(canvas.queryByText(placeholder)).toBeNull());

    // menu should close
    await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());
  }
}`,...r.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder,
    width: 80
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    userEvent.click(canvas.getByRole('button'));
  }
}`,...p.parameters?.docs?.source}}};const xt=["SimpleSelect","SmallSelect"];export{r as SimpleSelect,p as SmallSelect,xt as __namedExportsOrder,Bt as default};
