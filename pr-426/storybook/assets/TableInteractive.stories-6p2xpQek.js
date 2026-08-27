import{w as i,u as e,e as m}from"./index-C7qTOzs2.js";import{StickyHeaderSortingExample as p}from"./Table.stories-D-6KS8Tt.js";import"./iframe-CYDANtMt.js";import"./preload-helper-D9Z9MdNV.js";import"./index-Cz8MjafU.js";import"./index-DrFu-skq.js";import"./_baseGet-DGzmSmA2.js";import"./isArray-BJmyNVUi.js";import"./isSymbol-_FF1kV9r.js";import"./_MapCache-TsE-7C0k.js";import"./Pressable-BvczHaFK.js";import"./Interactable-DhvzqrPU.js";import"./color-Ceo1QMNe.js";import"./useTheme-C_Ehsh33.js";import"./eq-CQ4zk1HF.js";import"./_baseSlice-Dbw65BcJ.js";import"./_arrayMap-BkD9PEmT.js";import"./assetHub.mock-D3Nht472.js";import"./startCase-hUN0hSQH.js";import"./Button-DPtA13Wn.js";import"./Icon-DRxKkZdt.js";import"./Spinner-CXotWqqb.js";import"./Text-0g3rWpAf.js";import"./CellMedia-IoJhBEcv.js";import"./useCellSpacing-BH3_o_ol.js";import"./sizing-Do56D2dQ.js";import"./RemoteImage-S3YFINhn.js";import"./Switch-BjwniDr8.js";import"./utils-CM_X5is-.js";import"./tokens-BwScSksM.js";import"./Control-C-1dn_y_.js";import"./useMergeRefs-DR4sGa7m.js";import"./usePrefixedId-D1yZvkEs.js";import"./isRtl-CGZsgYct.js";import"./motion-minimal-B1h7XI-_.js";import"./HStack-Fh-9TmPm.js";import"./VStack-iXgNewwv.js";import"./TableCaption-Bg86dqyR.js";import"./useTable-XqHyp7CY.js";import"./TableHeader-C4UwhBqx.js";import"./TableRow-DKEQPqcp.js";import"./Cell-D1A-2vVj.js";const X={title:"Interactive/Table",component:p},t={play:async({canvasElement:o})=>{const r=i(o).getByText("Asset").closest("button");e.tab(),m(r).toHaveFocus()}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
