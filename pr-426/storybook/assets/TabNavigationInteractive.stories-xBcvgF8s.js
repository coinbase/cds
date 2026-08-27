import{r as p,j as o}from"./iframe-BXWLBCkp.js";import{w as m,u as d,e as h,f as u}from"./index-MhPKLhGg.js";import{V as r}from"./VStack-CnEfMFeL.js";import{T as v}from"./Text-Ch_dBU4v.js";import{p as T}from"./storybook-BVrW2YSd.js";import{T as f}from"./TabNavigation-nLuwWOga.js";import"./preload-helper-D9Z9MdNV.js";import"./index-Cz8MjafU.js";import"./index-DrFu-skq.js";import"./useDimensions-CSIQgsxn.js";import"./HStack-B6p8qBpp.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./useTheme-BJazYlse.js";import"./Paddle-KLwlcGm-.js";import"./tokens-BwScSksM.js";import"./NewAnimatePresence-BbA2hDPb.js";import"./index-B2twlf45.js";import"./motion-minimal-SVRWJYUW.js";import"./use-unmount-effect-5QIafHMH.js";import"./IconButton-OIX0AFCz.js";import"./Button-W9Shg4T1.js";import"./Icon-CgDQ3NQp.js";import"./Spinner-BAI0lrZ-.js";import"./useMotionProps-CS-LE6l8.js";import"./utils-CwomCnHN.js";import"./TabIndicator-EwmhyRSA.js";import"./usePreviousValues-rLMWE3mU.js";import"./TabLabel-C51G3c2G.js";import"./usePreviousValue-Cm2wE0Iw.js";import"./DotCount-Jrldj36O.js";import"./dotStyles-Ccp1dKIN.js";import"./Collapsible-DRMWW50B.js";import"./collapsible-BAneA-61.js";const l=200,t=[{id:"first-test",label:"First label",testID:"first"},{id:"second-test",label:"second label",testID:"second"},{id:"third-test",label:"third label"},{id:"fourth-test",label:"fourth label"},{id:"fifth-test",label:"fifth label"},{id:"sixth-test",label:"sixth label"},{id:"seventh-test",label:"seventh label",testID:"seventh"},{id:"eighth-test",label:"eighth label"},{id:"ninth-test",label:"ninth label"},{id:"tenth-test",label:"tenth label",testID:"tenth"},{id:"eleventh-test",label:"eleventh label",testID:"eleventh"}],g=()=>{const[e,a]=p.useState(t[0].id);return o.jsxs(r,{gap:2,children:[o.jsx(f,{onChange:a,tabs:t,value:e}),o.jsx(r,{bordered:!0,accessibilityLabelledBy:`tab--${e}`,background:"bgPrimaryWash",borderRadius:200,id:`tabpanel--${e}`,padding:2,role:"tabpanel",children:o.jsxs(v,{as:"h2",display:"block",font:"title1",children:["This is tab ",e]})})]})},at={title:"Interactive/TabNavigation",component:g},s={args:{},parameters:{percy:{waitForTimeout:t.length*l,enableJavaScript:!0}},play:async({canvasElement:e})=>{const a=m(e),b=a.getByText(t[0].label).closest("button"),c=a.getByText(t[t.length-1].label).closest("button");d.tab(),h(b).toHaveFocus();for(const{label:n}of t){const i=a.getByText(n).closest("button")??a.getByText(n);i!==c&&u.keyDown(i,{key:"ArrowRight"}),await T(l)}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
