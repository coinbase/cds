import{r as w,j as m}from"./iframe-CYDANtMt.js";import{w as u,a as o,e as i,u as a}from"./index-C7qTOzs2.js";import{p as n}from"./storybook-BVrW2YSd.js";import{S as d}from"./Select-CMditRa6.js";import{S as v}from"./SelectOption-D3fv76Hr.js";import"./preload-helper-D9Z9MdNV.js";import"./index-Cz8MjafU.js";import"./index-DrFu-skq.js";import"./useMergeRefs-DR4sGa7m.js";import"./InputStack-uMkha90v.js";import"./tokens-BwScSksM.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";import"./useTheme-C_Ehsh33.js";import"./HStack-Fh-9TmPm.js";import"./VStack-iXgNewwv.js";import"./ColorSurge-COlvd6LS.js";import"./useMotionProps-BF3bCUsm.js";import"./utils-CM_X5is-.js";import"./use-animation-B-MH_N0S.js";import"./motion-minimal-B1h7XI-_.js";import"./InputLabel-BwQhf82V.js";import"./Text-0g3rWpAf.js";import"./Dropdown-CpCPWRqg.js";import"./index-B3W2yIJg.js";import"./useBreakpoints-Bxk0TUW-.js";import"./FocusTrap-D5jofIBF.js";import"./debounce-fynzmAtJ.js";import"./ModalWrapper-TkjI7R_Y.js";import"./NewAnimatePresence-BIvSMOo2.js";import"./index-DaxQGrHc.js";import"./use-unmount-effect-DjWyEMV9.js";import"./useScrollBlocker-smLDx_Od.js";import"./Overlay-BrSXLw2H.js";import"./OverlayContentContext-D3LfdOuR.js";import"./Portal-BNKVVywf.js";import"./Popover-CdSD4lsc.js";import"./dropdown-CDhCThJm.js";import"./Pressable-BvczHaFK.js";import"./isArray-BJmyNVUi.js";import"./context-C9K9uJvD.js";import"./usePrefixedId-D1yZvkEs.js";import"./AnimatedCaret-R2z7TxpB.js";import"./collapsible-BAneA-61.js";import"./Icon-DRxKkZdt.js";import"./index-CAK1E_4V.js";import"./eventHandlers-CyvGcX2M.js";import"./HelperText-0iJbV5oL.js";import"./useRefocusTrigger-7TqcuL-y.js";import"./select-Em8pkxbY.js";import"./Cell-D1A-2vVj.js";import"./useCellSpacing-BH3_o_ol.js";import"./sizing-Do56D2dQ.js";import"./CellAccessory-Cln9vUz5.js";import"./isRtl-CGZsgYct.js";const s=["Option 1","Option 2","Option 3","Option 4","Option 5","Option 6"],c="Select an option",g=e=>{const[t,y]=w.useState(void 0);return m.jsx(d,{disablePortal:!0,onChange:y,value:t,...e,children:s.map(l=>m.jsx(v,{title:l,value:l},l))})},Bt={title:"Interactive/Select",component:g},r={args:{placeholder:c,label:"Label",helperText:"I am helpful"},play:async({canvasElement:e})=>{const t=u(e);await o(()=>i(t.getByText(c)).toBeDefined()),await a.click(t.getByRole("button")),await n(1e3),await a.click(t.getByRole("dialog")),await n(1e3),await a.click(t.getByRole("button")),await n(1e3),await a.click(t.getByText(s[4])),await n(1e3),await o(()=>i(t.getByText(s[4])).toBeDefined()),await o(()=>i(t.queryByText(c)).toBeNull()),await o(()=>i(t.queryByRole("dialog")).toBeNull())}},p={args:{placeholder:c,width:80},play:async({canvasElement:e})=>{const t=u(e);a.click(t.getByRole("button"))}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
