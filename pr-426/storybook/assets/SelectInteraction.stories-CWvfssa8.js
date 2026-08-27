import{r as w,j as m}from"./iframe-BXWLBCkp.js";import{w as u,a as o,e as i,u as a}from"./index-MhPKLhGg.js";import{p as n}from"./storybook-BVrW2YSd.js";import{S as d}from"./Select-6-gb_fJq.js";import{S as v}from"./SelectOption-Bnv43xgZ.js";import"./preload-helper-D9Z9MdNV.js";import"./index-Cz8MjafU.js";import"./index-DrFu-skq.js";import"./useMergeRefs-DR4sGa7m.js";import"./InputStack-DO5lXlgp.js";import"./tokens-BwScSksM.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./useTheme-BJazYlse.js";import"./HStack-B6p8qBpp.js";import"./VStack-CnEfMFeL.js";import"./ColorSurge-D5iBCkQQ.js";import"./useMotionProps-CS-LE6l8.js";import"./utils-CwomCnHN.js";import"./use-animation-CYeuSrS_.js";import"./motion-minimal-SVRWJYUW.js";import"./InputLabel-C3lBKQeI.js";import"./Text-Ch_dBU4v.js";import"./Dropdown-BSPZ_a8b.js";import"./index-7N_x-QzT.js";import"./useBreakpoints-BiiruerU.js";import"./FocusTrap-90tMQkIg.js";import"./debounce-fynzmAtJ.js";import"./ModalWrapper-D-DvdkD-.js";import"./NewAnimatePresence-BbA2hDPb.js";import"./index-B2twlf45.js";import"./use-unmount-effect-5QIafHMH.js";import"./useScrollBlocker-4Da9qMHo.js";import"./Overlay-XiDupmt3.js";import"./OverlayContentContext-hT53AGt-.js";import"./Portal-tAONErW2.js";import"./Popover-CipwoaXC.js";import"./dropdown-CDhCThJm.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./context-Cc0ZOVig.js";import"./usePrefixedId-Dfl-0DGQ.js";import"./AnimatedCaret-DDAfukJC.js";import"./collapsible-BAneA-61.js";import"./Icon-CgDQ3NQp.js";import"./index-DoYuAu2r.js";import"./eventHandlers-CyvGcX2M.js";import"./HelperText-C1uG41Fa.js";import"./useRefocusTrigger-t_p2JCAO.js";import"./select-Em8pkxbY.js";import"./Cell-CB_dChqK.js";import"./useCellSpacing-BuZVtSR4.js";import"./sizing-Do56D2dQ.js";import"./CellAccessory-BypMgxs5.js";import"./isRtl-Du0XdnX5.js";const s=["Option 1","Option 2","Option 3","Option 4","Option 5","Option 6"],c="Select an option",g=e=>{const[t,y]=w.useState(void 0);return m.jsx(d,{disablePortal:!0,onChange:y,value:t,...e,children:s.map(l=>m.jsx(v,{title:l,value:l},l))})},Bt={title:"Interactive/Select",component:g},r={args:{placeholder:c,label:"Label",helperText:"I am helpful"},play:async({canvasElement:e})=>{const t=u(e);await o(()=>i(t.getByText(c)).toBeDefined()),await a.click(t.getByRole("button")),await n(1e3),await a.click(t.getByRole("dialog")),await n(1e3),await a.click(t.getByRole("button")),await n(1e3),await a.click(t.getByText(s[4])),await n(1e3),await o(()=>i(t.getByText(s[4])).toBeDefined()),await o(()=>i(t.queryByText(c)).toBeNull()),await o(()=>i(t.queryByRole("dialog")).toBeNull())}},p={args:{placeholder:c,width:80},play:async({canvasElement:e})=>{const t=u(e);a.click(t.getByRole("button"))}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
