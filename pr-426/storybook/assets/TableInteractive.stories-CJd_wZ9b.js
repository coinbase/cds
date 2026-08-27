import{w as i,u as e,e as m}from"./index-MhPKLhGg.js";import{StickyHeaderSortingExample as p}from"./Table.stories-DZCStepc.js";import"./iframe-BXWLBCkp.js";import"./preload-helper-D9Z9MdNV.js";import"./index-Cz8MjafU.js";import"./index-DrFu-skq.js";import"./_baseGet-BQwTcjxu.js";import"./isArray-JxMDBx0e.js";import"./isSymbol-BtzAvdsO.js";import"./_MapCache-DCFci0Mw.js";import"./Pressable-sl8uFeki.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./useTheme-BJazYlse.js";import"./eq-CQ4zk1HF.js";import"./_baseSlice-D1xFUOrS.js";import"./_arrayMap-BkD9PEmT.js";import"./assetHub.mock-wrytFBXY.js";import"./startCase-mdBRUo2g.js";import"./Button-W9Shg4T1.js";import"./Icon-CgDQ3NQp.js";import"./Spinner-BAI0lrZ-.js";import"./Text-Ch_dBU4v.js";import"./CellMedia-BVxosPAx.js";import"./useCellSpacing-BuZVtSR4.js";import"./sizing-Do56D2dQ.js";import"./RemoteImage-Lksm6NI7.js";import"./Switch-Ly9ugSQE.js";import"./utils-CwomCnHN.js";import"./tokens-BwScSksM.js";import"./Control-gdMxvYmV.js";import"./useMergeRefs-DR4sGa7m.js";import"./usePrefixedId-Dfl-0DGQ.js";import"./isRtl-Du0XdnX5.js";import"./motion-minimal-SVRWJYUW.js";import"./HStack-B6p8qBpp.js";import"./VStack-CnEfMFeL.js";import"./TableCaption-YicOJBF6.js";import"./useTable-DMtCjPcp.js";import"./TableHeader-knDbjzO0.js";import"./TableRow-DyEl9WwT.js";import"./Cell-CB_dChqK.js";const X={title:"Interactive/Table",component:p},t={play:async({canvasElement:o})=>{const r=i(o).getByText("Asset").closest("button");e.tab(),m(r).toHaveFocus()}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
