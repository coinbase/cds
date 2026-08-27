import{w as i,u as e,e as m}from"./index-CsaGt7y2.js";import{StickyHeaderSortingExample as p}from"./Table.stories-CI3tcqle.js";import"./iframe-CsG_6vZR.js";import"./preload-helper-D9Z9MdNV.js";import"./index-Cz8MjafU.js";import"./index-DrFu-skq.js";import"./_baseGet-BxZ0PijZ.js";import"./isArray-M0ytM-vC.js";import"./isSymbol-Nk1MYqqj.js";import"./_MapCache-CNwOe-s1.js";import"./Pressable-DDN99tmF.js";import"./Interactable--rqISG90.js";import"./color-Ceo1QMNe.js";import"./useTheme-CmrOhAty.js";import"./eq-CQ4zk1HF.js";import"./_baseSlice-MshUGZR0.js";import"./_arrayMap-BkD9PEmT.js";import"./assetHub.mock-BTu6l8Yp.js";import"./startCase-CPIPq6-f.js";import"./Button-D2WSek5T.js";import"./Icon-DTs0crZh.js";import"./Spinner-C8x8bhOH.js";import"./Text-B1CpMNU3.js";import"./CellMedia-oeXrSUuB.js";import"./useCellSpacing-BeT6oDTo.js";import"./sizing-Do56D2dQ.js";import"./RemoteImage-CCsStlyO.js";import"./Switch-W8R2Ap4j.js";import"./utils-y2S18Lx0.js";import"./tokens-BwScSksM.js";import"./Control-DrPBFTYm.js";import"./useMergeRefs-DR4sGa7m.js";import"./usePrefixedId-BL1THI0P.js";import"./isRtl-C5Fon8jH.js";import"./motion-minimal-5s2ikV7b.js";import"./HStack-DaDYipoP.js";import"./VStack-Cg_Yq2u4.js";import"./TableCaption-9f3p9fZg.js";import"./useTable-CBqxA7OK.js";import"./TableHeader-BOKdbdol.js";import"./TableRow-B47yfpIa.js";import"./Cell-Z4wq8KY-.js";const X={title:"Interactive/Table",component:p},t={play:async({canvasElement:o})=>{const r=i(o).getByText("Asset").closest("button");e.tab(),m(r).toHaveFocus()}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const firstSortButton = canvas.getByText('Asset').closest('button');

    // Tab into the document and expect the active element to be in focus
    userEvent.tab();
    expect(firstSortButton).toHaveFocus();
  }
}`,...t.parameters?.docs?.source}}};const Y=["SortingFocus"];export{t as SortingFocus,Y as __namedExportsOrder,X as default};
