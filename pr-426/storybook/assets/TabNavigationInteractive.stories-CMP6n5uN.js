import{r as p,j as o}from"./iframe-CsG_6vZR.js";import{w as m,u as d,e as h,f as u}from"./index-CsaGt7y2.js";import{V as r}from"./VStack-Cg_Yq2u4.js";import{T as v}from"./Text-B1CpMNU3.js";import{p as T}from"./storybook-BVrW2YSd.js";import{T as f}from"./TabNavigation-B2JxRaWc.js";import"./preload-helper-D9Z9MdNV.js";import"./index-Cz8MjafU.js";import"./index-DrFu-skq.js";import"./useDimensions-BCh0uzfM.js";import"./HStack-DaDYipoP.js";import"./Pressable-DDN99tmF.js";import"./isArray-M0ytM-vC.js";import"./Interactable--rqISG90.js";import"./color-Ceo1QMNe.js";import"./useTheme-CmrOhAty.js";import"./Paddle-O8Xpk38b.js";import"./tokens-BwScSksM.js";import"./NewAnimatePresence-P1FndR1q.js";import"./index-CpZJTW5x.js";import"./motion-minimal-5s2ikV7b.js";import"./use-unmount-effect-DmgCrakR.js";import"./IconButton-DNJ86Kiu.js";import"./Button-D2WSek5T.js";import"./Icon-DTs0crZh.js";import"./Spinner-C8x8bhOH.js";import"./useMotionProps-BXBckQBf.js";import"./utils-y2S18Lx0.js";import"./TabIndicator-CK1GC29Q.js";import"./usePreviousValues-BaYVE0C4.js";import"./TabLabel-BKxoYLG3.js";import"./usePreviousValue-DYxrfH1e.js";import"./DotCount-CM211aWp.js";import"./dotStyles-Ccp1dKIN.js";import"./Collapsible-DcP86DlO.js";import"./collapsible-BAneA-61.js";const l=200,t=[{id:"first-test",label:"First label",testID:"first"},{id:"second-test",label:"second label",testID:"second"},{id:"third-test",label:"third label"},{id:"fourth-test",label:"fourth label"},{id:"fifth-test",label:"fifth label"},{id:"sixth-test",label:"sixth label"},{id:"seventh-test",label:"seventh label",testID:"seventh"},{id:"eighth-test",label:"eighth label"},{id:"ninth-test",label:"ninth label"},{id:"tenth-test",label:"tenth label",testID:"tenth"},{id:"eleventh-test",label:"eleventh label",testID:"eleventh"}],g=()=>{const[e,a]=p.useState(t[0].id);return o.jsxs(r,{gap:2,children:[o.jsx(f,{onChange:a,tabs:t,value:e}),o.jsx(r,{bordered:!0,accessibilityLabelledBy:`tab--${e}`,background:"bgPrimaryWash",borderRadius:200,id:`tabpanel--${e}`,padding:2,role:"tabpanel",children:o.jsxs(v,{as:"h2",display:"block",font:"title1",children:["This is tab ",e]})})]})},at={title:"Interactive/TabNavigation",component:g},s={args:{},parameters:{percy:{waitForTimeout:t.length*l,enableJavaScript:!0}},play:async({canvasElement:e})=>{const a=m(e),b=a.getByText(t[0].label).closest("button"),c=a.getByText(t[t.length-1].label).closest("button");d.tab(),h(b).toHaveFocus();for(const{label:n}of t){const i=a.getByText(n).closest("button")??a.getByText(n);i!==c&&u.keyDown(i,{key:"ArrowRight"}),await T(l)}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {},
  parameters: {
    percy: {
      waitForTimeout: tabs.length * WAIT,
      enableJavaScript: true
    }
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const firstTab = canvas.getByText(tabs[0].label).closest('button');
    const lastTab = canvas.getByText(tabs[tabs.length - 1].label).closest('button');

    // Tab into the document and expect the active element to be in focus
    userEvent.tab();
    expect(firstTab).toHaveFocus();
    for (const {
      label
    } of tabs) {
      const tabButton = canvas.getByText(label).closest('button') ?? canvas.getByText(label);
      if (tabButton !== lastTab) {
        // Tab again and expect the paddle to be in focus
        fireEvent.keyDown(tabButton, {
          key: 'ArrowRight'
        });
      }
      await pauseStory(WAIT);
    }
  }
}`,...s.parameters?.docs?.source}}};const ot=["Story"];export{s as Story,ot as __namedExportsOrder,at as default};
