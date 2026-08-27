import{w as c,u as o,a as r,e as p}from"./index-C7qTOzs2.js";import{p as e}from"./storybook-BVrW2YSd.js";import{Default as m}from"./Dropdown.stories-DkcY1ab4.js";import"./iframe-CYDANtMt.js";import"./preload-helper-D9Z9MdNV.js";import"./index-Cz8MjafU.js";import"./index-DrFu-skq.js";import"./loremIpsum-CjdvNg3u.js";import"./SelectOption-D3fv76Hr.js";import"./select-Em8pkxbY.js";import"./Cell-D1A-2vVj.js";import"./useCellSpacing-BH3_o_ol.js";import"./sizing-Do56D2dQ.js";import"./HStack-Fh-9TmPm.js";import"./VStack-iXgNewwv.js";import"./Pressable-BvczHaFK.js";import"./isArray-BJmyNVUi.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";import"./useTheme-C_Ehsh33.js";import"./CellAccessory-Cln9vUz5.js";import"./Icon-DRxKkZdt.js";import"./isRtl-CGZsgYct.js";import"./Text-0g3rWpAf.js";import"./DotCount-DjzjxUju.js";import"./tokens-BwScSksM.js";import"./NewAnimatePresence-BIvSMOo2.js";import"./index-DaxQGrHc.js";import"./motion-minimal-B1h7XI-_.js";import"./use-unmount-effect-DjWyEMV9.js";import"./useMotionProps-BF3bCUsm.js";import"./utils-CM_X5is-.js";import"./dotStyles-Ccp1dKIN.js";import"./useA11yControlledVisibility-C9j5cCuu.js";import"./usePrefixedId-D1yZvkEs.js";import"./Dropdown-CpCPWRqg.js";import"./index-B3W2yIJg.js";import"./useBreakpoints-Bxk0TUW-.js";import"./FocusTrap-D5jofIBF.js";import"./useMergeRefs-DR4sGa7m.js";import"./debounce-fynzmAtJ.js";import"./ModalWrapper-TkjI7R_Y.js";import"./useScrollBlocker-smLDx_Od.js";import"./Overlay-BrSXLw2H.js";import"./OverlayContentContext-D3LfdOuR.js";import"./Portal-BNKVVywf.js";import"./Popover-CdSD4lsc.js";import"./dropdown-CDhCThJm.js";import"./IconButton-D-CYL-b9.js";import"./Button-DPtA13Wn.js";import"./Spinner-CXotWqqb.js";const st={title:"Interactive/Dropdown",component:m},s=["Option 1","Option 2","Option 3","Option 4","Option 5","Option 6","Option 7","Option 8","Option 9","Option 10","Option 11"],n={args:{disablePortal:!0,customAriaControlsID:"dropdown"},play:async({canvasElement:a})=>{const t=c(a);await o.click(t.getByText("Open Menu")),await e(1e3),await r(()=>p(t.findByText(s[0])).toBeDefined()),await o.click(t.getByRole("dialog")),await e(1e3),await o.click(t.getAllByRole("button")[0]),await e(1e3),await o.click(t.getByText(s[4])),await e(1e3),await r(()=>p(t.queryByRole("dialog")).toBeNull())}},i={args:{containerHeight:"200vh",customAriaControlsID:"dropdown"},play:async({canvasElement:a})=>{const t=c(a);await o.click(t.getByText("Open Menu"))}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
