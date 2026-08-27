import{w as c,u as o,a as r,e as p}from"./index-CsaGt7y2.js";import{p as e}from"./storybook-BVrW2YSd.js";import{Default as m}from"./Dropdown.stories-C-nb9P8u.js";import"./iframe-CsG_6vZR.js";import"./preload-helper-D9Z9MdNV.js";import"./index-Cz8MjafU.js";import"./index-DrFu-skq.js";import"./loremIpsum-CjdvNg3u.js";import"./SelectOption-BBBPgn8s.js";import"./select-Em8pkxbY.js";import"./Cell-Z4wq8KY-.js";import"./useCellSpacing-BeT6oDTo.js";import"./sizing-Do56D2dQ.js";import"./HStack-DaDYipoP.js";import"./VStack-Cg_Yq2u4.js";import"./Pressable-DDN99tmF.js";import"./isArray-M0ytM-vC.js";import"./Interactable--rqISG90.js";import"./color-Ceo1QMNe.js";import"./useTheme-CmrOhAty.js";import"./CellAccessory-iu0jUwZW.js";import"./Icon-DTs0crZh.js";import"./isRtl-C5Fon8jH.js";import"./Text-B1CpMNU3.js";import"./DotCount-CM211aWp.js";import"./tokens-BwScSksM.js";import"./NewAnimatePresence-P1FndR1q.js";import"./index-CpZJTW5x.js";import"./motion-minimal-5s2ikV7b.js";import"./use-unmount-effect-DmgCrakR.js";import"./useMotionProps-BXBckQBf.js";import"./utils-y2S18Lx0.js";import"./dotStyles-Ccp1dKIN.js";import"./useA11yControlledVisibility-BZQOfbE4.js";import"./usePrefixedId-BL1THI0P.js";import"./Dropdown-DlJsEaMG.js";import"./index-CKRF3JMY.js";import"./useBreakpoints-DD5uuIEx.js";import"./FocusTrap-C5pHOjrH.js";import"./useMergeRefs-DR4sGa7m.js";import"./debounce-fynzmAtJ.js";import"./ModalWrapper-D8IaYCfm.js";import"./useScrollBlocker-CjG6q-zd.js";import"./Overlay-DkQgdcBj.js";import"./OverlayContentContext-CpXWuzdo.js";import"./Portal-BaLq4aAx.js";import"./Popover-BqkIPLOm.js";import"./dropdown-CDhCThJm.js";import"./IconButton-DNJ86Kiu.js";import"./Button-D2WSek5T.js";import"./Spinner-C8x8bhOH.js";const st={title:"Interactive/Dropdown",component:m},s=["Option 1","Option 2","Option 3","Option 4","Option 5","Option 6","Option 7","Option 8","Option 9","Option 10","Option 11"],n={args:{disablePortal:!0,customAriaControlsID:"dropdown"},play:async({canvasElement:a})=>{const t=c(a);await o.click(t.getByText("Open Menu")),await e(1e3),await r(()=>p(t.findByText(s[0])).toBeDefined()),await o.click(t.getByRole("dialog")),await e(1e3),await o.click(t.getAllByRole("button")[0]),await e(1e3),await o.click(t.getByText(s[4])),await e(1e3),await r(()=>p(t.queryByRole("dialog")).toBeNull())}},i={args:{containerHeight:"200vh",customAriaControlsID:"dropdown"},play:async({canvasElement:a})=>{const t=c(a);await o.click(t.getByText("Open Menu"))}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    disablePortal: true,
    customAriaControlsID: 'dropdown'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    // open the menu
    await userEvent.click(canvas.getByText('Open Menu'));
    await pauseStory(1000);

    // expect to see the first option
    await waitFor(() => expect(canvas.findByText(defaultOptions[0])).toBeDefined());

    // close the menu by clicking outside of it (this is hacky, but it clicks the invisible scrim)
    await userEvent.click(canvas.getByRole('dialog'));
    await pauseStory(1000);

    // open the menu again
    await userEvent.click(canvas.getAllByRole('button')[0]);
    await pauseStory(1000);

    // select an option
    await userEvent.click(canvas.getByText(defaultOptions[4]));
    await pauseStory(1000);

    // expect menu to be dismounted
    await waitFor(() => expect(canvas.queryByRole('dialog')).toBeNull());
  }
}`,...n.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    containerHeight: '200vh',
    customAriaControlsID: 'dropdown'
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    // open the menu
    await userEvent.click(canvas.getByText('Open Menu'));
  }
}`,...i.parameters?.docs?.source}}};const ct=["SimpleDropdown","ScrollContainer"];export{i as ScrollContainer,n as SimpleDropdown,ct as __namedExportsOrder,st as default};
