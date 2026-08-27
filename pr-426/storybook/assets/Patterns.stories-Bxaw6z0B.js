import{r as t,j as e,B as x}from"./iframe-BXWLBCkp.js";import{I as V}from"./Icon-CgDQ3NQp.js";import{L as F}from"./Link-C3jcuPE_.js";import{T as s}from"./Text-Ch_dBU4v.js";import{F as R}from"./FullscreenAlert-BAkfgsoH.js";import{M as f}from"./Modal-C6ACOq11.js";import{M as y,a as B,b as C}from"./ModalHeader-BffLEBHD.js";import{B as n}from"./Button-W9Shg4T1.js";import{S as j}from"./SpotRectangle-DMgOEAF3.js";import{V as r}from"./VStack-CnEfMFeL.js";import{H as T}from"./HStack-B6p8qBpp.js";import{C as I}from"./Checkbox-M1uAd9ap.js";import"./preload-helper-D9Z9MdNV.js";import"./useTheme-BJazYlse.js";import"./useMergeRefs-DR4sGa7m.js";import"./Pressable-sl8uFeki.js";import"./isArray-JxMDBx0e.js";import"./Interactable-D5HQmQer.js";import"./color-Ceo1QMNe.js";import"./useA11yLabels-CsHGrhyH.js";import"./FullscreenModal-DejEVFgq.js";import"./LogoMark-C448m09K.js";import"./IconButton-OIX0AFCz.js";import"./Spinner-BAI0lrZ-.js";import"./FullscreenModalLayout-BAtM9Cva.js";import"./OverlayContentContext-hT53AGt-.js";import"./useMotionProps-CS-LE6l8.js";import"./utils-CwomCnHN.js";import"./tokens-BwScSksM.js";import"./FocusTrap-90tMQkIg.js";import"./debounce-fynzmAtJ.js";import"./Overlay-XiDupmt3.js";import"./motion-minimal-SVRWJYUW.js";import"./ModalWrapper-D-DvdkD-.js";import"./NewAnimatePresence-BbA2hDPb.js";import"./index-B2twlf45.js";import"./use-unmount-effect-5QIafHMH.js";import"./useScrollBlocker-4Da9qMHo.js";import"./Portal-tAONErW2.js";import"./HeroSquare-USlAlu4r.js";import"./versionMap-D-9tPUoj.js";import"./createIllustration-B8-1WYve.js";import"./convertDimensionToSize-B6MeOypY.js";import"./interactableHeight-DPdDzpO8.js";import"./versionMap-BAVgBvPY.js";import"./checkbox-DVjU0upZ.js";import"./Control-gdMxvYmV.js";import"./usePrefixedId-Dfl-0DGQ.js";import"./isRtl-Du0XdnX5.js";const Le={title:"Components/Patterns"},p=()=>{const[o,i]=t.useState(!0);return e.jsxs(e.Fragment,{children:[e.jsx(n,{onClick:()=>i(!0),children:"View Error"}),e.jsx(R,{body:"Sorry we couldn't find what you were looking for.",closeAccessibilityLabel:"Close modal",heroSquare:"errorWeb404",onPreferredActionPress:()=>i(!1),onRequestClose:()=>i(!1),preferredActionLabel:"Back to Coinbase",title:"Page not found",visible:o})]})},b=()=>{const[o,i]=t.useState(!0),c=t.useMemo(()=>[{id:1,headline:"Benefit to highlight 1",body:"Bullets explaining selling points and potential risks (can include “learn more” links)."},{id:2,headline:"Risk to highlight 1",body:"Bullets explaining selling points and potential risks (can include “learn more” links)."},{id:3,headline:"Risk to highlight 2",body:"Bullets explaining selling points and potential risks (can include “learn more” links)."}],[]);return e.jsxs(e.Fragment,{children:[e.jsx(n,{onClick:()=>i(!0),children:"View Low-Friction Disclosure"}),e.jsxs(f,{hideDividers:!0,accessibilityLabelledBy:"dlf-title",onRequestClose:()=>i(!1),visible:o,children:[e.jsx(y,{closeAccessibilityLabel:"Close"}),e.jsxs(B,{children:[e.jsx(x,{justifyContent:"center",children:e.jsx(j,{name:"accessToAdvancedCharts"})}),e.jsx(s,{as:"h2",display:"block",font:"title3",id:"dlf-title",paddingTop:4,children:"Title outlining the action and benefit in 1-2 lines"}),e.jsx(r,{as:"ul",gap:3,paddingY:3,children:c.map(({id:l,headline:a,body:d})=>e.jsxs(r,{as:"li",gap:1,children:[e.jsxs(T,{alignItems:"center",gap:2,children:[e.jsx(V,{color:"fg",name:"checkmark",size:"s"}),e.jsx(s,{as:"h3",display:"block",font:"headline",children:a})]}),e.jsx(s,{as:"p",display:"block",font:"body",paddingStart:4,children:d})]},l))})]}),e.jsx(C,{primaryAction:e.jsx(n,{onClick:()=>i(!1),children:"[Affirmative CTA]"}),secondaryAction:e.jsx(n,{as:"a",href:"https://www.coinbase.com",target:"_blank",variant:"secondary",children:"Terms and conditions"})})]})]})},u=()=>{const[o,i]=t.useState(!0),c=t.useMemo(()=>[{id:1,headline:"Risk to highlight 1",body:"Bullets explaining selling points and potential risks (include “learn more” links in risk bullets)."},{id:2,headline:"Risk to highlight 2",body:"Bullets explaining selling points and potential risks (include “learn more” links in risk bullets)."}],[]);return e.jsxs(e.Fragment,{children:[e.jsx(n,{onClick:()=>i(!0),children:"View Medium-Friction Disclosure"}),e.jsxs(f,{hideDividers:!0,accessibilityLabelledBy:"dmf-title",onRequestClose:()=>i(!1),visible:o,children:[e.jsx(y,{closeAccessibilityLabel:"Close"}),e.jsxs(B,{children:[e.jsx(x,{justifyContent:"center",children:e.jsx(j,{name:"accessToAdvancedCharts"})}),e.jsx(s,{as:"h2",display:"block",font:"title3",id:"dmf-title",paddingTop:4,children:"Title outlining the benefit in 1-2 lines"}),e.jsx(r,{as:"ul",gap:3,paddingY:3,children:c.map(({id:l,headline:a,body:d})=>e.jsxs(r,{as:"li",gap:1,children:[e.jsxs(T,{alignItems:"center",gap:2,children:[e.jsx(V,{color:"fg",name:"checkmark",size:"s"}),e.jsx(s,{as:"h3",display:"block",font:"headline",children:a})]}),e.jsx(s,{as:"p",display:"block",font:"body",paddingStart:4,children:d})]},l))})]}),e.jsx(C,{primaryAction:e.jsx(n,{onClick:()=>i(!1),children:"[Affirmative CTA]"}),secondaryAction:e.jsx(n,{as:"a",href:"https://www.coinbase.com",target:"_blank",variant:"secondary",children:"Terms and conditions"})})]})]})},m=()=>{const[o,i]=t.useState(!0),c=t.useMemo(()=>[{id:1,headline:"Benefit to highlight 1",body:"Bullet outlining benefits."},{id:2,headline:"Benefit to highlight 2",body:"Bullet outlining benefits."}],[]);return e.jsxs(e.Fragment,{children:[e.jsx(n,{onClick:()=>i(!0),children:"View High-Friction Benefit Disclosure"}),e.jsxs(f,{hideDividers:!0,accessibilityLabelledBy:"dhfb-title",onRequestClose:()=>i(!1),visible:o,children:[e.jsx(y,{closeAccessibilityLabel:"Close"}),e.jsxs(B,{children:[e.jsx(x,{justifyContent:"center",children:e.jsx(j,{name:"accessToAdvancedCharts"})}),e.jsx(s,{as:"h2",display:"block",font:"title3",id:"dhfb-title",paddingTop:4,children:"Title outlining the benefit in 1-2 lines"}),e.jsx(s,{as:"p",display:"block",font:"label2",paddingTop:1,children:'Body text saying "By verbing, you will get X, Y, Z."'}),e.jsx(r,{as:"ul",gap:3,paddingY:3,children:c.map(({id:l,headline:a,body:d})=>e.jsxs(r,{as:"li",gap:1,children:[e.jsxs(T,{alignItems:"center",gap:2,children:[e.jsx(V,{color:"fg",name:"checkmark",size:"s"}),e.jsx(s,{as:"h3",display:"block",font:"headline",children:a})]}),e.jsx(s,{as:"p",display:"block",font:"body",paddingStart:4,children:d})]},l))})]}),e.jsx(C,{primaryAction:e.jsx(n,{onClick:()=>i(!1),children:"[CTA]"})})]})]})},k=()=>{const o=t.useMemo(()=>[{id:1,headline:"Risk item 1",checkboxLabel:"I understand that I won't be able to do X because of Y.",linkText:"Learn more",linkUrl:"https://www.coinbase.com"},{id:2,headline:"Risk item 2",checkboxLabel:"I understand that I won't be able to do X because of Y.",linkText:"Learn more",linkUrl:"https://www.coinbase.com"}],[]),i=t.useMemo(()=>o.map(()=>!1),[o]),[c,l]=t.useState(!0),[a,d]=t.useState(i),M=t.useMemo(()=>({cursor:"pointer"}),[]),v=t.useMemo(()=>a.some(h=>!h),[a]),L=t.useCallback(h=>()=>{d(S=>S.map((g,w)=>w===h?!g:g))},[]);return e.jsxs(e.Fragment,{children:[e.jsx(n,{onClick:()=>l(!0),children:"View High-Friction Risk Disclosure"}),e.jsxs(f,{hideDividers:!0,accessibilityLabelledBy:"dhfr-title",onRequestClose:()=>l(!1),visible:c,children:[e.jsx(y,{backAccessibilityLabel:"Back",closeAccessibilityLabel:"Close",onBackButtonClick:()=>l(!1)}),e.jsxs(B,{children:[e.jsx(x,{justifyContent:"center",children:e.jsx(j,{name:"accessToAdvancedCharts"})}),e.jsx(s,{as:"h2",display:"block",font:"title3",id:"dhfr-title",paddingTop:4,children:"Title outlining risk in 1-2 lines"}),e.jsx(s,{as:"p",display:"block",font:"label2",paddingTop:1,children:'Body text saying "Before you [verb], here are a few things you need to understand about [action]."'}),e.jsx(r,{as:"ul",gap:3,paddingY:3,children:o.map(({id:h,headline:S,checkboxLabel:g,linkText:w,linkUrl:D},A)=>e.jsxs(r,{as:"li",gap:1,children:[e.jsx(s,{as:"h3",display:"block",font:"headline",children:S}),e.jsxs(T,{alignItems:"center",as:"label",gap:1,style:M,children:[e.jsx(I,{checked:a[A],onChange:L(A)}),e.jsxs(s,{as:"span",font:"label2",children:[g," ",e.jsx(F,{openInNewWindow:!0,underline:!0,href:D,children:w})]})]})]},h))})]}),e.jsx(C,{primaryAction:e.jsx(n,{disabled:v,onClick:()=>l(!1),children:`[${v?"Disabled":"Enabled"} CTA]`})})]})]})};p.__docgenInfo={description:"",methods:[],displayName:"Error"};b.__docgenInfo={description:"",methods:[],displayName:"DisclosureLowFriction"};u.__docgenInfo={description:"",methods:[],displayName:"DisclosureMediumFriction"};m.__docgenInfo={description:"",methods:[],displayName:"DisclosureHighFrictionBenefit"};k.__docgenInfo={description:"",methods:[],displayName:"DisclosureHighFrictionRisk"};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`() => {
  const [visible, setVisible] = useState(true);
  return <>
      <Button onClick={() => setVisible(true)}>View Error</Button>
      <FullscreenAlert body="Sorry we couldn't find what you were looking for." closeAccessibilityLabel="Close modal" heroSquare="errorWeb404" onPreferredActionPress={() => setVisible(false)} onRequestClose={() => setVisible(false)} preferredActionLabel="Back to Coinbase" title="Page not found" visible={visible} />
    </>;
}`,...p.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`() => {
  const [visible, setVisible] = useState(true);
  const data = useMemo(() => [{
    id: 1,
    headline: 'Benefit to highlight 1',
    body: 'Bullets explaining selling points and potential risks (can include “learn more” links).'
  }, {
    id: 2,
    headline: 'Risk to highlight 1',
    body: 'Bullets explaining selling points and potential risks (can include “learn more” links).'
  }, {
    id: 3,
    headline: 'Risk to highlight 2',
    body: 'Bullets explaining selling points and potential risks (can include “learn more” links).'
  }], []);
  return <>
      <Button onClick={() => setVisible(true)}>View Low-Friction Disclosure</Button>
      <Modal hideDividers accessibilityLabelledBy="dlf-title" onRequestClose={() => setVisible(false)} visible={visible}>
        <ModalHeader closeAccessibilityLabel="Close" />
        <ModalBody>
          <Box justifyContent="center">
            <SpotRectangle name="accessToAdvancedCharts" />
          </Box>
          <Text as="h2" display="block" font="title3" id="dlf-title" paddingTop={4}>
            Title outlining the action and benefit in 1-2 lines
          </Text>
          <VStack as="ul" gap={3} paddingY={3}>
            {data.map(({
            id,
            headline,
            body
          }) => <VStack key={id} as="li" gap={1}>
                <HStack alignItems="center" gap={2}>
                  <Icon color="fg" name="checkmark" size="s" />
                  <Text as="h3" display="block" font="headline">
                    {headline}
                  </Text>
                </HStack>
                <Text as="p" display="block" font="body" paddingStart={4}>
                  {body}
                </Text>
              </VStack>)}
          </VStack>
        </ModalBody>
        <ModalFooter primaryAction={<Button onClick={() => setVisible(false)}>[Affirmative CTA]</Button>} secondaryAction={<Button as="a" href="https://www.coinbase.com" target="_blank" variant="secondary">
              Terms and conditions
            </Button>} />
      </Modal>
    </>;
}`,...b.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`() => {
  const [visible, setVisible] = useState(true);
  const data = useMemo(() => [{
    id: 1,
    headline: 'Risk to highlight 1',
    body: 'Bullets explaining selling points and potential risks (include “learn more” links in risk bullets).'
  }, {
    id: 2,
    headline: 'Risk to highlight 2',
    body: 'Bullets explaining selling points and potential risks (include “learn more” links in risk bullets).'
  }], []);
  return <>
      <Button onClick={() => setVisible(true)}>View Medium-Friction Disclosure</Button>
      <Modal hideDividers accessibilityLabelledBy="dmf-title" onRequestClose={() => setVisible(false)} visible={visible}>
        <ModalHeader closeAccessibilityLabel="Close" />
        <ModalBody>
          <Box justifyContent="center">
            <SpotRectangle name="accessToAdvancedCharts" />
          </Box>
          <Text as="h2" display="block" font="title3" id="dmf-title" paddingTop={4}>
            Title outlining the benefit in 1-2 lines
          </Text>
          <VStack as="ul" gap={3} paddingY={3}>
            {data.map(({
            id,
            headline,
            body
          }) => <VStack key={id} as="li" gap={1}>
                <HStack alignItems="center" gap={2}>
                  <Icon color="fg" name="checkmark" size="s" />
                  <Text as="h3" display="block" font="headline">
                    {headline}
                  </Text>
                </HStack>
                <Text as="p" display="block" font="body" paddingStart={4}>
                  {body}
                </Text>
              </VStack>)}
          </VStack>
        </ModalBody>
        <ModalFooter primaryAction={<Button onClick={() => setVisible(false)}>[Affirmative CTA]</Button>} secondaryAction={<Button as="a" href="https://www.coinbase.com" target="_blank" variant="secondary">
              Terms and conditions
            </Button>} />
      </Modal>
    </>;
}`,...u.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`() => {
  const [visible, setVisible] = useState(true);
  const data = useMemo(() => [{
    id: 1,
    headline: 'Benefit to highlight 1',
    body: 'Bullet outlining benefits.'
  }, {
    id: 2,
    headline: 'Benefit to highlight 2',
    body: 'Bullet outlining benefits.'
  }], []);
  return <>
      <Button onClick={() => setVisible(true)}>View High-Friction Benefit Disclosure</Button>
      <Modal hideDividers accessibilityLabelledBy="dhfb-title" onRequestClose={() => setVisible(false)} visible={visible}>
        <ModalHeader closeAccessibilityLabel="Close" />
        <ModalBody>
          <Box justifyContent="center">
            <SpotRectangle name="accessToAdvancedCharts" />
          </Box>
          <Text as="h2" display="block" font="title3" id="dhfb-title" paddingTop={4}>
            Title outlining the benefit in 1-2 lines
          </Text>
          <Text as="p" display="block" font="label2" paddingTop={1}>
            Body text saying &quot;By verbing, you will get X, Y, Z.&quot;
          </Text>
          <VStack as="ul" gap={3} paddingY={3}>
            {data.map(({
            id,
            headline,
            body
          }) => <VStack key={id} as="li" gap={1}>
                <HStack alignItems="center" gap={2}>
                  <Icon color="fg" name="checkmark" size="s" />
                  <Text as="h3" display="block" font="headline">
                    {headline}
                  </Text>
                </HStack>
                <Text as="p" display="block" font="body" paddingStart={4}>
                  {body}
                </Text>
              </VStack>)}
          </VStack>
        </ModalBody>
        <ModalFooter primaryAction={<Button onClick={() => setVisible(false)}>[CTA]</Button>} />
      </Modal>
    </>;
}`,...m.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`() => {
  const data = useMemo(() => [{
    id: 1,
    headline: 'Risk item 1',
    checkboxLabel: "I understand that I won't be able to do X because of Y.",
    linkText: 'Learn more',
    linkUrl: 'https://www.coinbase.com'
  }, {
    id: 2,
    headline: 'Risk item 2',
    checkboxLabel: "I understand that I won't be able to do X because of Y.",
    linkText: 'Learn more',
    linkUrl: 'https://www.coinbase.com'
  }], []);
  const initialCheckboxesState = useMemo(() => data.map(() => false), [data]);
  const [visible, setVisible] = useState(true);
  const [checkboxes, setCheckboxes] = useState(initialCheckboxesState);
  const checkboxLabelStyles = useMemo(() => ({
    cursor: 'pointer'
  }), []);
  const isCtaDisabled = useMemo(() => checkboxes.some(checked => !checked), [checkboxes]);
  const handleCheckboxChange = useCallback((index: number) => () => {
    setCheckboxes(prevCheckboxes => prevCheckboxes.map((checked, i) => i === index ? !checked : checked));
  }, []);
  return <>
      <Button onClick={() => setVisible(true)}>View High-Friction Risk Disclosure</Button>
      <Modal hideDividers accessibilityLabelledBy="dhfr-title" onRequestClose={() => setVisible(false)} visible={visible}>
        <ModalHeader backAccessibilityLabel="Back" closeAccessibilityLabel="Close" onBackButtonClick={() => setVisible(false)} />
        <ModalBody>
          <Box justifyContent="center">
            <SpotRectangle name="accessToAdvancedCharts" />
          </Box>
          <Text as="h2" display="block" font="title3" id="dhfr-title" paddingTop={4}>
            Title outlining risk in 1-2 lines
          </Text>
          <Text as="p" display="block" font="label2" paddingTop={1}>
            Body text saying &quot;Before you [verb], here are a few things you need to understand
            about [action].&quot;
          </Text>
          <VStack as="ul" gap={3} paddingY={3}>
            {data.map(({
            id,
            headline,
            checkboxLabel,
            linkText,
            linkUrl
          }, index) => <VStack key={id} as="li" gap={1}>
                <Text as="h3" display="block" font="headline">
                  {headline}
                </Text>
                <HStack alignItems="center" as="label" gap={1} style={checkboxLabelStyles}>
                  <Checkbox checked={checkboxes[index]} onChange={handleCheckboxChange(index)} />
                  <Text as="span" font="label2">
                    {checkboxLabel}{' '}
                    <Link openInNewWindow underline href={linkUrl}>
                      {linkText}
                    </Link>
                  </Text>
                </HStack>
              </VStack>)}
          </VStack>
        </ModalBody>
        <ModalFooter primaryAction={<Button disabled={isCtaDisabled} onClick={() => setVisible(false)}>
              {\`[\${isCtaDisabled ? 'Disabled' : 'Enabled'} CTA]\`}
            </Button>} />
      </Modal>
    </>;
}`,...k.parameters?.docs?.source}}};const De=["Error","DisclosureLowFriction","DisclosureMediumFriction","DisclosureHighFrictionBenefit","DisclosureHighFrictionRisk"];export{m as DisclosureHighFrictionBenefit,k as DisclosureHighFrictionRisk,b as DisclosureLowFriction,u as DisclosureMediumFriction,p as Error,De as __namedExportsOrder,Le as default};
