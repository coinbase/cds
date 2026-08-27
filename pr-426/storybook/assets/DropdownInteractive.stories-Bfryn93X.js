import{w as c,u as o,a as r,e as p}from"./index-MhPKLhGg.js";import{p as e}from"./storybook-BVrW2YSd.js";import{Default as m}from"./Dropdown.stories-lvYe1BJE.js";import"./iframe-BXWLBCkp.js";import"./preload-helper-D9Z9MdNV.js";import"./index-Cz8MjafU.js";import"./index-DrFu-skq.js";import"./loremIpsum-CjdvNg3u.js";import"./SelectOption-Bnv43xgZ.js";import"./select-Em8pkxbY.js";import"./Cell-CB_dChqK.js";import"./useCellSpacing-BuZVtSR4.js";import"./sizing-Do56D2dQ.js";import"./HStack-B6p8qBpp.js";import"./VStack-CnEfMFeL.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./useTheme-BJazYlse.js";import"./CellAccessory-BypMgxs5.js";import"./Icon-CgDQ3NQp.js";import"./isRtl-Du0XdnX5.js";import"./Text-Ch_dBU4v.js";import"./DotCount-Jrldj36O.js";import"./tokens-BwScSksM.js";import"./NewAnimatePresence-BbA2hDPb.js";import"./index-B2twlf45.js";import"./motion-minimal-SVRWJYUW.js";import"./use-unmount-effect-5QIafHMH.js";import"./useMotionProps-CS-LE6l8.js";import"./utils-CwomCnHN.js";import"./dotStyles-Ccp1dKIN.js";import"./useA11yControlledVisibility-DSMmCA_M.js";import"./usePrefixedId-Dfl-0DGQ.js";import"./Dropdown-BSPZ_a8b.js";import"./index-7N_x-QzT.js";import"./useBreakpoints-BiiruerU.js";import"./FocusTrap-90tMQkIg.js";import"./useMergeRefs-DR4sGa7m.js";import"./debounce-fynzmAtJ.js";import"./ModalWrapper-D-DvdkD-.js";import"./useScrollBlocker-4Da9qMHo.js";import"./Overlay-XiDupmt3.js";import"./OverlayContentContext-hT53AGt-.js";import"./Portal-tAONErW2.js";import"./Popover-CipwoaXC.js";import"./dropdown-CDhCThJm.js";import"./IconButton-OIX0AFCz.js";import"./Button-W9Shg4T1.js";import"./Spinner-BAI0lrZ-.js";const st={title:"Interactive/Dropdown",component:m},s=["Option 1","Option 2","Option 3","Option 4","Option 5","Option 6","Option 7","Option 8","Option 9","Option 10","Option 11"],n={args:{disablePortal:!0,customAriaControlsID:"dropdown"},play:async({canvasElement:a})=>{const t=c(a);await o.click(t.getByText("Open Menu")),await e(1e3),await r(()=>p(t.findByText(s[0])).toBeDefined()),await o.click(t.getByRole("dialog")),await e(1e3),await o.click(t.getAllByRole("button")[0]),await e(1e3),await o.click(t.getByText(s[4])),await e(1e3),await r(()=>p(t.queryByRole("dialog")).toBeNull())}},i={args:{containerHeight:"200vh",customAriaControlsID:"dropdown"},play:async({canvasElement:a})=>{const t=c(a);await o.click(t.getByText("Open Menu"))}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
