import{ag as la,ah as ia,ai as ra,aj as oa,r as n,R as ce,j as h,B as sa,c as J,ak as da}from"./iframe-CYDANtMt.js";import{u as ca}from"./useRefMap-BFAUTUSj.js";import{H as ye}from"./HStack-Fh-9TmPm.js";import{V as ua}from"./VStack-iXgNewwv.js";import{I as pe}from"./IconButton-D-CYL-b9.js";import{P as ge}from"./Pressable-BvczHaFK.js";import{c as ma,b as ba,m as pa}from"./motion-minimal-B1h7XI-_.js";import{l as ha,d as va,u as ya,a as ga}from"./use-drag-controls-B3jFgE4y.js";import{u as fa}from"./use-animation-B-MH_N0S.js";import{u as ka,a as wa}from"./use-transform-BHujfv3A.js";import{a as Ta}from"./animate-NV5OIPt9.js";import{T as Aa}from"./Text-0g3rWpAf.js";const Pa={...ra,...ia,...va,...ha},Be=ma((e,t)=>ba(e,t,Pa,la)),Ca=({enabled:e,interval:t,onStart:i,onStop:r})=>{const a=oa(),[d,c]=n.useState(!1),[u,m]=n.useState(!1),s=n.useRef(!1),w=n.useRef(!1),b=n.useRef(!1),f=n.useRef(new Set),T=n.useCallback(()=>{[...f.current].forEach(le=>le())},[]),v=n.useCallback(L=>(f.current.add(L),()=>{f.current.delete(L)}),[]),G=e&&!d&&!u,Q=n.useCallback(()=>a.getRemainingTime(),[a]),I=n.useCallback(L=>{if(!e||b.current||w.current)return;const le=()=>{s.current&&T()};L?a.resume():a.start(le,t),s.current||(s.current=!0,i?.())},[e,t,a,i,T]),j=n.useCallback(()=>{b.current=!1,c(!1),!w.current&&e&&I(!1)},[e,I]),D=n.useCallback(()=>{a.pause(),b.current=!0,c(!0),s.current&&(s.current=!1,r?.())},[a,r]),Z=n.useCallback(()=>{b.current?j():D()},[j,D]),M=n.useCallback(()=>{a.reset();const L=()=>{s.current&&T()};a.start(L,t),w.current&&a.pause()},[a,t,T]),R=n.useCallback(()=>{s.current&&(a.pause(),w.current=!0,m(!0))},[a]),$=n.useCallback(()=>{if(!b.current&&(w.current=!1,m(!1),e)){const L=a.getRemainingTime()>0;I(L)}},[e,a,I]);return n.useEffect(()=>{e&&!b.current&&!w.current&&(s.current||I(!1)),s.current=G},[e,G,I]),n.useEffect(()=>()=>{a.clear()},[a]),n.useMemo(()=>({isPlaying:G,isStopped:d,isPaused:u,start:j,stop:D,toggle:Z,reset:M,pause:R,resume:$,getRemainingTime:Q,addCompletionListener:v}),[G,d,u,j,D,Z,M,R,$,Q,v])},Le=n.createContext({}),xa=()=>{const e=n.useContext(Le);if(!e.refs)throw Error("useRefMapContext must be called inside a RefMapProvider");return e},Oe=ce.createContext(void 0),qa=()=>{const e=n.useContext(Oe);if(!e)throw new Error("useCarouselContext must be used within a Carousel component");return e},Ue=ce.createContext(void 0),Sa=()=>{const e=n.useContext(Ue);if(!e)throw new Error("useCarouselAutoplayContext must be used within a Carousel component");return e},Ra="carouselItemCss-c4trdux",ve=n.memo(({id:e,children:t,testID:i,style:r,className:a,isClone:d,...c})=>{const{registerRef:u}=xa(),{visibleCarouselItems:m}=qa(),s=m.has(e),w=n.useCallback(b=>{u(e,b)},[u,e]);return h.jsx(sa,{ref:w,"aria-hidden":!s,"aria-roledescription":"carousel item",className:J(Ra,a),"data-carousel-item-id":e,inert:d?"":void 0,maxWidth:"100%",role:"group",style:r,testID:i??`carousel-item-${e}`,...c,children:typeof t=="function"?t({isVisible:s}):t})});ve.__docgenInfo={description:"Individual carousel item component that registers itself with the carousel via RefMapContext.",methods:[],displayName:"CarouselItem",props:{id:{required:!0,tsType:{name:"string"},description:"Unique identifier for this carousel item."},children:{required:!1,tsType:{name:"union",raw:"CarouselItemRenderChildren | React.ReactNode",elements:[{name:"ReactFC",raw:"React.FC<{ isVisible: boolean }>",elements:[{name:"signature",type:"object",raw:"{ isVisible: boolean }",signature:{properties:[{key:"isVisible",value:{name:"boolean",required:!0}}]}}]},{name:"ReactReactNode",raw:"React.ReactNode"}]},description:`Component to render as the carousel item content.
Can be a React node or a function that receives the visibility state.`},isClone:{required:!1,tsType:{name:"boolean"},description:`@internal Used by Carousel to mark clone items for looping.
Clone items are non-interactive and excluded from tab order.`}}};const Ia="navigationCss-n1pn3ku8",He=n.memo(function({onGoPrevious:t,onGoNext:i,disableGoPrevious:r,disableGoNext:a,nextPageAccessibilityLabel:d="Next page",previousPageAccessibilityLabel:c="Previous page",autoplay:u,isAutoplayStopped:m,onToggleAutoplay:s,startAutoplayAccessibilityLabel:w="Play Carousel",stopAutoplayAccessibilityLabel:b="Pause Carousel",previousIcon:f="caretLeft",nextIcon:T="caretRight",startIcon:v="play",stopIcon:G="pause",variant:Q="secondary",compact:I,className:j,classNames:D,style:Z,styles:M,testIDMap:R,hideUnlessFocused:$}){return h.jsxs(ye,{className:J(Ia,j,D?.root),"data-hiddenunlessfocused":$,gap:1,style:{...Z,...M?.root},children:[u&&h.jsx(pe,{accessibilityLabel:m?w:b,className:D?.autoplayButton,compact:I,name:m?v:G,onClick:s,style:M?.autoplayButton,testID:R?.autoplayButton??"carousel-autoplay-button",variant:Q}),h.jsx(pe,{accessibilityLabel:c,className:D?.previousButton,compact:I,disabled:r,name:f,onClick:t,style:M?.previousButton,testID:R?.previousButton??"carousel-previous-button",variant:Q}),h.jsx(pe,{accessibilityLabel:d,className:D?.nextButton,compact:I,disabled:a,name:T,onClick:i,style:M?.nextButton,testID:R?.nextButton??"carousel-next-button",variant:Q})]})});He.__docgenInfo={description:"",methods:[],displayName:"DefaultCarouselNavigation",props:{onGoPrevious:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback for when the previous button is pressed."},onGoNext:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback for when the next button is pressed."},disableGoPrevious:{required:!1,tsType:{name:"boolean"},description:"Whether the previous button is disabled."},disableGoNext:{required:!1,tsType:{name:"boolean"},description:"Whether the next button is disabled."},isAutoplayStopped:{required:!1,tsType:{name:"boolean"},description:"Whether autoplay is currently stopped."},onToggleAutoplay:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback fired when the autoplay button is clicked."},className:{required:!1,tsType:{name:"string"},description:"Custom class name for the component."},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:"Custom styles for the component."},testIDMap:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /**
   * Test ID for the previous button.
   */
  previousButton?: string;
  /**
   * Test ID for the next button.
   */
  nextButton?: string;
  /**
   * Test ID for the autoplay button.
   */
  autoplayButton?: string;
}`,signature:{properties:[{key:"previousButton",value:{name:"string",required:!1},description:"Test ID for the previous button."},{key:"nextButton",value:{name:"string",required:!1},description:"Test ID for the next button."},{key:"autoplayButton",value:{name:"string",required:!1},description:"Test ID for the autoplay button."}]}},description:"Test ID map for the component."},previousIcon:{required:!1,tsType:{name:"union",raw:`| 'account'
| 'activity'
| 'add'
| 'addPeople'
| 'advancedMarketSelector'
| 'advancedTradeProduct'
| 'affiliates'
| 'airdrop'
| 'airdropAlt'
| 'airdropCoins'
| 'airdropParachute'
| 'alien'
| 'allTimeHigh'
| 'allocation'
| 'annotation'
| 'api'
| 'apiPlug'
| 'apothecary'
| 'appSwitcher'
| 'apple'
| 'appleLogo'
| 'application'
| 'arrowDown'
| 'arrowLeft'
| 'arrowRight'
| 'arrowUp'
| 'arrowsHorizontal'
| 'arrowsUpDown'
| 'arrowsVertical'
| 'artwork'
| 'assetHubProduct'
| 'assetManagementProduct'
| 'astronautHelmet'
| 'atSign'
| 'atomScience'
| 'auto'
| 'autoCar'
| 'avatar'
| 'average'
| 'backArrow'
| 'ballot'
| 'ballotbox'
| 'bandage'
| 'bank'
| 'barChartSimple'
| 'barChartWindow'
| 'base'
| 'baseApps'
| 'baseFeed'
| 'baseNotification'
| 'baseQuickBuy'
| 'baseSquare'
| 'baseTransact'
| 'baseVerification'
| 'baseWallet'
| 'baseball'
| 'basketball'
| 'beaker'
| 'beginningArrow'
| 'bell'
| 'bellCheck'
| 'bellPlus'
| 'birthcertificate'
| 'block'
| 'blockchain'
| 'blog'
| 'book'
| 'bookmark'
| 'borrowProduct'
| 'boxing'
| 'bridging'
| 'briefcase'
| 'briefcaseAlt'
| 'browser'
| 'bug'
| 'building'
| 'calculator'
| 'calendar'
| 'calendarBlank'
| 'calendarDates'
| 'calendarEmpty'
| 'calendarHeart'
| 'calendarMoney'
| 'calendarStar'
| 'camera'
| 'candlesticks'
| 'car'
| 'card'
| 'caret'
| 'caretDown'
| 'caretLeft'
| 'caretRight'
| 'caretUp'
| 'cash'
| 'cashAustralianDollar'
| 'cashBrazilianReal'
| 'cashBrazillianReal'
| 'cashCanadianDollar'
| 'cashCoins'
| 'cashEUR'
| 'cashGBP'
| 'cashIndonesianRupiah'
| 'cashJPY'
| 'cashPhilippinePeso'
| 'cashPolishZloty'
| 'cashRupee'
| 'cashSingaporeDollar'
| 'cashSwissFranc'
| 'cashThaiBaht'
| 'cashTurkishLira'
| 'cashUSD'
| 'cashUaeDirham'
| 'cashVietnameseDong'
| 'chainLink'
| 'chartBar'
| 'chartCandles'
| 'chartLine'
| 'chartPie'
| 'chartPieCircle'
| 'chartVolume'
| 'chatBotAgent'
| 'chatBubble'
| 'chatRequests'
| 'checkboxChecked'
| 'checkboxEmpty'
| 'checkmark'
| 'chess'
| 'circleCheckmark'
| 'circleCross'
| 'circulatingSupply'
| 'city'
| 'clipboard'
| 'clock'
| 'clockOutline'
| 'close'
| 'closeCaption'
| 'clothing'
| 'cloud'
| 'cloudPartial'
| 'cloudProduct'
| 'cluster'
| 'coinbase'
| 'coinbaseCardProduct'
| 'coinbaseOne'
| 'coinbaseOneCard'
| 'coinbaseOneLogo'
| 'coinbaseRewards'
| 'coinsCrypto'
| 'collapse'
| 'collectibles'
| 'collection'
| 'comment'
| 'commentPlus'
| 'commerceProduct'
| 'compass'
| 'complianceProduct'
| 'compose'
| 'computerChip'
| 'concierge'
| 'conciergeBell'
| 'config'
| 'continuous'
| 'convert'
| 'copy'
| 'corporation'
| 'creatorCoin'
| 'cricket'
| 'cross'
| 'crossTrade'
| 'crypto'
| 'cryptobasics'
| 'crystalBall'
| 'crystalBallInsight'
| 'currencies'
| 'custodyProduct'
| 'dashboard'
| 'dataMarketplaceProduct'
| 'dataStack'
| 'defi'
| 'delegateProduct'
| 'deposit'
| 'derivatives'
| 'derivativesProduct'
| 'derivativesProductNew'
| 'developerAPIProduct'
| 'developerPlatformProduct'
| 'dex'
| 'diagonalDownArrow'
| 'diagonalRightArrow'
| 'diagonalUpArrow'
| 'diamond'
| 'diamondIncentives'
| 'dinnerPlate'
| 'directDeposit'
| 'directDepositIcon'
| 'disabledPhone'
| 'discordLogo'
| 'distribution'
| 'document'
| 'documentation'
| 'dot'
| 'doubleChevronRight'
| 'downArrow'
| 'download'
| 'drag'
| 'drops'
| 'earn'
| 'earnProduct'
| 'earnRewards'
| 'earthquake'
| 'educationBook'
| 'educationPencil'
| 'email'
| 'endArrow'
| 'entertainment'
| 'error'
| 'ethereum'
| 'eventContracts'
| 'exchangeProduct'
| 'exclamationMark'
| 'expand'
| 'expandAddress'
| 'expandAll'
| 'externalLink'
| 'eye'
| 'faceScan'
| 'faces'
| 'factory'
| 'faucet'
| 'fib'
| 'filmStrip'
| 'filter'
| 'fingerprint'
| 'flame'
| 'folder'
| 'folderArrow'
| 'folderOpen'
| 'followAdd'
| 'following'
| 'football'
| 'fork'
| 'forwardArrow'
| 'fscsProtection'
| 'gab'
| 'games'
| 'gaming'
| 'gasFees'
| 'gasFeesAlt'
| 'gauge'
| 'gaugeEmpty'
| 'gaugeHigh'
| 'gaugeHighLow'
| 'gaugeHighMid'
| 'gaugeLow'
| 'gaugeLowHigh'
| 'gaugeLowMid'
| 'gaugeMedium'
| 'gavel'
| 'gear'
| 'generalCharacter'
| 'ghost'
| 'gif'
| 'giftBox'
| 'giftCard'
| 'gitHubLogo'
| 'globe'
| 'golf'
| 'googleLogo'
| 'greenEnergy'
| 'grid'
| 'group'
| 'hamburger'
| 'hammer'
| 'heart'
| 'helpCenterProduct'
| 'helpCenterQuestionMark'
| 'hiddenEye'
| 'hockey'
| 'home'
| 'horizontalLine'
| 'hospital'
| 'hospitalCross'
| 'hurricane'
| 'ideal'
| 'identityCard'
| 'image'
| 'info'
| 'initiator'
| 'instagramLogo'
| 'instantUnstakingClock'
| 'institute'
| 'institutionalProduct'
| 'interest'
| 'invisible'
| 'invoice'
| 'key'
| 'keyboard'
| 'laptop'
| 'leadChart'
| 'leadCoin'
| 'learningRewardsProduct'
| 'light'
| 'lightbulb'
| 'lightning'
| 'lightningBolt'
| 'lineChartCrypto'
| 'list'
| 'location'
| 'lock'
| 'login'
| 'logout'
| 'loop'
| 'magnifyingGlass'
| 'marketCap'
| 'medal'
| 'megaphone'
| 'menu'
| 'metaverse'
| 'microphone'
| 'microphoneCordless'
| 'microscope'
| 'mint'
| 'minus'
| 'mma'
| 'moneyCardCoin'
| 'moon'
| 'more'
| 'moreVertical'
| 'motorsport'
| 'music'
| 'musicArticles'
| 'needle'
| 'newsFeed'
| 'newsletter'
| 'nft'
| 'nftBuy'
| 'nftOffer'
| 'nftProduct'
| 'nftSale'
| 'noRocket'
| 'noWifi'
| 'nodeProduct'
| 'oil'
| 'options'
| 'orderBook'
| 'orderHistory'
| 'outline'
| 'pFPS'
| 'paperAirplane'
| 'paperclip'
| 'participate'
| 'participateProduct'
| 'passKey'
| 'passport'
| 'pause'
| 'pay'
| 'payProduct'
| 'paymentCard'
| 'payments'
| 'payouts'
| 'paypal'
| 'pencil'
| 'peopleGroup'
| 'peopleStar'
| 'percentage'
| 'perpetualSwap'
| 'phone'
| 'pieChartData'
| 'pillBottle'
| 'pillCapsule'
| 'pin'
| 'plane'
| 'planet'
| 'play'
| 'playbutton'
| 'plusMinus'
| 'podiumStar'
| 'politicsBuilding'
| 'politicsCandidate'
| 'politicsFlag'
| 'politicsGavel'
| 'politicsPodium'
| 'politicsStar'
| 'powerTool'
| 'priceAlerts'
| 'priceAlertsCheck'
| 'primePoduct'
| 'privateClientProduct'
| 'proProduct'
| 'profile'
| 'protection'
| 'pulse'
| 'pyramid'
| 'qrCode'
| 'qrCodeAlt'
| 'queryTransact'
| 'questionMark'
| 'quotation'
| 'rain'
| 'ratingsCheck'
| 'ratingsChecks'
| 'ratingsStar'
| 'reCenter'
| 'rectangle'
| 'recurring'
| 'refresh'
| 'regulated'
| 'regulatedFutures'
| 'report'
| 'rewardsProduct'
| 'ribbon'
| 'robot'
| 'rocket'
| 'rocketShip'
| 'rollingSpot'
| 'rosettaProduct'
| 'rottenTomato'
| 'royalty'
| 'safe'
| 'save'
| 'savingsBank'
| 'scanQrCode'
| 'scienceAtom'
| 'scienceBeaker'
| 'scienceMoon'
| 'search'
| 'securityKey'
| 'securityShield'
| 'seen'
| 'sendReceive'
| 'setPinCode'
| 'settings'
| 'share'
| 'shield'
| 'shieldOutline'
| 'shoe'
| 'shoppingCart'
| 'signinProduct'
| 'singleCoin'
| 'singleNote'
| 'singlecloud'
| 'smartContract'
| 'snow'
| 'soccer'
| 'socialChat'
| 'socialReshare'
| 'socialShare'
| 'sofort'
| 'sortDoubleArrow'
| 'sortDown'
| 'sortDownCenter'
| 'sortUp'
| 'sortUpCenter'
| 'soundOff'
| 'soundOn'
| 'sparkle'
| 'speaker'
| 'speechBubble'
| 'stableCoin'
| 'stablecoinStack'
| 'staggeredList'
| 'stake'
| 'staking'
| 'star'
| 'starAward'
| 'starBubble'
| 'starTrophy'
| 'statusDot'
| 'step0'
| 'step1'
| 'step2'
| 'step3'
| 'step4'
| 'step5'
| 'step6'
| 'step7'
| 'step8'
| 'step9'
| 'strategy'
| 'sun'
| 'support'
| 'tag'
| 'taxes'
| 'taxesReceipt'
| 'telephone'
| 'tennis'
| 'test'
| 'thermometer'
| 'thumbsDown'
| 'thumbsDownOutline'
| 'thumbsUp'
| 'thumbsUpOutline'
| 'tokenLaunchCoin'
| 'tokenLaunchRocket'
| 'tokenSales'
| 'tornado'
| 'trading'
| 'transactions'
| 'trashCan'
| 'trophy'
| 'trophyCup'
| 'tshirt'
| 'tv'
| 'tvStand'
| 'twitterLogo'
| 'ultility'
| 'umbrella'
| 'undo'
| 'unfollowPeople'
| 'unknown'
| 'unlock'
| 'upArrow'
| 'upload'
| 'venturesProduct'
| 'verifiedBadge'
| 'verifiedPools'
| 'verticalLine'
| 'virus'
| 'visible'
| 'waasProduct'
| 'wallet'
| 'walletLogo'
| 'walletProduct'
| 'warning'
| 'webhooks'
| 'wellness'
| 'wifi'
| 'wind'
| 'wireTransfer'
| 'withdraw'
| 'wrapToken'
| 'xLogo'`,elements:[{name:"literal",value:"'account'"},{name:"literal",value:"'activity'"},{name:"literal",value:"'add'"},{name:"literal",value:"'addPeople'"},{name:"literal",value:"'advancedMarketSelector'"},{name:"literal",value:"'advancedTradeProduct'"},{name:"literal",value:"'affiliates'"},{name:"literal",value:"'airdrop'"},{name:"literal",value:"'airdropAlt'"},{name:"literal",value:"'airdropCoins'"},{name:"literal",value:"'airdropParachute'"},{name:"literal",value:"'alien'"},{name:"literal",value:"'allTimeHigh'"},{name:"literal",value:"'allocation'"},{name:"literal",value:"'annotation'"},{name:"literal",value:"'api'"},{name:"literal",value:"'apiPlug'"},{name:"literal",value:"'apothecary'"},{name:"literal",value:"'appSwitcher'"},{name:"literal",value:"'apple'"},{name:"literal",value:"'appleLogo'"},{name:"literal",value:"'application'"},{name:"literal",value:"'arrowDown'"},{name:"literal",value:"'arrowLeft'"},{name:"literal",value:"'arrowRight'"},{name:"literal",value:"'arrowUp'"},{name:"literal",value:"'arrowsHorizontal'"},{name:"literal",value:"'arrowsUpDown'"},{name:"literal",value:"'arrowsVertical'"},{name:"literal",value:"'artwork'"},{name:"literal",value:"'assetHubProduct'"},{name:"literal",value:"'assetManagementProduct'"},{name:"literal",value:"'astronautHelmet'"},{name:"literal",value:"'atSign'"},{name:"literal",value:"'atomScience'"},{name:"literal",value:"'auto'"},{name:"literal",value:"'autoCar'"},{name:"literal",value:"'avatar'"},{name:"literal",value:"'average'"},{name:"literal",value:"'backArrow'"},{name:"literal",value:"'ballot'"},{name:"literal",value:"'ballotbox'"},{name:"literal",value:"'bandage'"},{name:"literal",value:"'bank'"},{name:"literal",value:"'barChartSimple'"},{name:"literal",value:"'barChartWindow'"},{name:"literal",value:"'base'"},{name:"literal",value:"'baseApps'"},{name:"literal",value:"'baseFeed'"},{name:"literal",value:"'baseNotification'"},{name:"literal",value:"'baseQuickBuy'"},{name:"literal",value:"'baseSquare'"},{name:"literal",value:"'baseTransact'"},{name:"literal",value:"'baseVerification'"},{name:"literal",value:"'baseWallet'"},{name:"literal",value:"'baseball'"},{name:"literal",value:"'basketball'"},{name:"literal",value:"'beaker'"},{name:"literal",value:"'beginningArrow'"},{name:"literal",value:"'bell'"},{name:"literal",value:"'bellCheck'"},{name:"literal",value:"'bellPlus'"},{name:"literal",value:"'birthcertificate'"},{name:"literal",value:"'block'"},{name:"literal",value:"'blockchain'"},{name:"literal",value:"'blog'"},{name:"literal",value:"'book'"},{name:"literal",value:"'bookmark'"},{name:"literal",value:"'borrowProduct'"},{name:"literal",value:"'boxing'"},{name:"literal",value:"'bridging'"},{name:"literal",value:"'briefcase'"},{name:"literal",value:"'briefcaseAlt'"},{name:"literal",value:"'browser'"},{name:"literal",value:"'bug'"},{name:"literal",value:"'building'"},{name:"literal",value:"'calculator'"},{name:"literal",value:"'calendar'"},{name:"literal",value:"'calendarBlank'"},{name:"literal",value:"'calendarDates'"},{name:"literal",value:"'calendarEmpty'"},{name:"literal",value:"'calendarHeart'"},{name:"literal",value:"'calendarMoney'"},{name:"literal",value:"'calendarStar'"},{name:"literal",value:"'camera'"},{name:"literal",value:"'candlesticks'"},{name:"literal",value:"'car'"},{name:"literal",value:"'card'"},{name:"literal",value:"'caret'"},{name:"literal",value:"'caretDown'"},{name:"literal",value:"'caretLeft'"},{name:"literal",value:"'caretRight'"},{name:"literal",value:"'caretUp'"},{name:"literal",value:"'cash'"},{name:"literal",value:"'cashAustralianDollar'"},{name:"literal",value:"'cashBrazilianReal'"},{name:"literal",value:"'cashBrazillianReal'"},{name:"literal",value:"'cashCanadianDollar'"},{name:"literal",value:"'cashCoins'"},{name:"literal",value:"'cashEUR'"},{name:"literal",value:"'cashGBP'"},{name:"literal",value:"'cashIndonesianRupiah'"},{name:"literal",value:"'cashJPY'"},{name:"literal",value:"'cashPhilippinePeso'"},{name:"literal",value:"'cashPolishZloty'"},{name:"literal",value:"'cashRupee'"},{name:"literal",value:"'cashSingaporeDollar'"},{name:"literal",value:"'cashSwissFranc'"},{name:"literal",value:"'cashThaiBaht'"},{name:"literal",value:"'cashTurkishLira'"},{name:"literal",value:"'cashUSD'"},{name:"literal",value:"'cashUaeDirham'"},{name:"literal",value:"'cashVietnameseDong'"},{name:"literal",value:"'chainLink'"},{name:"literal",value:"'chartBar'"},{name:"literal",value:"'chartCandles'"},{name:"literal",value:"'chartLine'"},{name:"literal",value:"'chartPie'"},{name:"literal",value:"'chartPieCircle'"},{name:"literal",value:"'chartVolume'"},{name:"literal",value:"'chatBotAgent'"},{name:"literal",value:"'chatBubble'"},{name:"literal",value:"'chatRequests'"},{name:"literal",value:"'checkboxChecked'"},{name:"literal",value:"'checkboxEmpty'"},{name:"literal",value:"'checkmark'"},{name:"literal",value:"'chess'"},{name:"literal",value:"'circleCheckmark'"},{name:"literal",value:"'circleCross'"},{name:"literal",value:"'circulatingSupply'"},{name:"literal",value:"'city'"},{name:"literal",value:"'clipboard'"},{name:"literal",value:"'clock'"},{name:"literal",value:"'clockOutline'"},{name:"literal",value:"'close'"},{name:"literal",value:"'closeCaption'"},{name:"literal",value:"'clothing'"},{name:"literal",value:"'cloud'"},{name:"literal",value:"'cloudPartial'"},{name:"literal",value:"'cloudProduct'"},{name:"literal",value:"'cluster'"},{name:"literal",value:"'coinbase'"},{name:"literal",value:"'coinbaseCardProduct'"},{name:"literal",value:"'coinbaseOne'"},{name:"literal",value:"'coinbaseOneCard'"},{name:"literal",value:"'coinbaseOneLogo'"},{name:"literal",value:"'coinbaseRewards'"},{name:"literal",value:"'coinsCrypto'"},{name:"literal",value:"'collapse'"},{name:"literal",value:"'collectibles'"},{name:"literal",value:"'collection'"},{name:"literal",value:"'comment'"},{name:"literal",value:"'commentPlus'"},{name:"literal",value:"'commerceProduct'"},{name:"literal",value:"'compass'"},{name:"literal",value:"'complianceProduct'"},{name:"literal",value:"'compose'"},{name:"literal",value:"'computerChip'"},{name:"literal",value:"'concierge'"},{name:"literal",value:"'conciergeBell'"},{name:"literal",value:"'config'"},{name:"literal",value:"'continuous'"},{name:"literal",value:"'convert'"},{name:"literal",value:"'copy'"},{name:"literal",value:"'corporation'"},{name:"literal",value:"'creatorCoin'"},{name:"literal",value:"'cricket'"},{name:"literal",value:"'cross'"},{name:"literal",value:"'crossTrade'"},{name:"literal",value:"'crypto'"},{name:"literal",value:"'cryptobasics'"},{name:"literal",value:"'crystalBall'"},{name:"literal",value:"'crystalBallInsight'"},{name:"literal",value:"'currencies'"},{name:"literal",value:"'custodyProduct'"},{name:"literal",value:"'dashboard'"},{name:"literal",value:"'dataMarketplaceProduct'"},{name:"literal",value:"'dataStack'"},{name:"literal",value:"'defi'"},{name:"literal",value:"'delegateProduct'"},{name:"literal",value:"'deposit'"},{name:"literal",value:"'derivatives'"},{name:"literal",value:"'derivativesProduct'"},{name:"literal",value:"'derivativesProductNew'"},{name:"literal",value:"'developerAPIProduct'"},{name:"literal",value:"'developerPlatformProduct'"},{name:"literal",value:"'dex'"},{name:"literal",value:"'diagonalDownArrow'"},{name:"literal",value:"'diagonalRightArrow'"},{name:"literal",value:"'diagonalUpArrow'"},{name:"literal",value:"'diamond'"},{name:"literal",value:"'diamondIncentives'"},{name:"literal",value:"'dinnerPlate'"},{name:"literal",value:"'directDeposit'"},{name:"literal",value:"'directDepositIcon'"},{name:"literal",value:"'disabledPhone'"},{name:"literal",value:"'discordLogo'"},{name:"literal",value:"'distribution'"},{name:"literal",value:"'document'"},{name:"literal",value:"'documentation'"},{name:"literal",value:"'dot'"},{name:"literal",value:"'doubleChevronRight'"},{name:"literal",value:"'downArrow'"},{name:"literal",value:"'download'"},{name:"literal",value:"'drag'"},{name:"literal",value:"'drops'"},{name:"literal",value:"'earn'"},{name:"literal",value:"'earnProduct'"},{name:"literal",value:"'earnRewards'"},{name:"literal",value:"'earthquake'"},{name:"literal",value:"'educationBook'"},{name:"literal",value:"'educationPencil'"},{name:"literal",value:"'email'"},{name:"literal",value:"'endArrow'"},{name:"literal",value:"'entertainment'"},{name:"literal",value:"'error'"},{name:"literal",value:"'ethereum'"},{name:"literal",value:"'eventContracts'"},{name:"literal",value:"'exchangeProduct'"},{name:"literal",value:"'exclamationMark'"},{name:"literal",value:"'expand'"},{name:"literal",value:"'expandAddress'"},{name:"literal",value:"'expandAll'"},{name:"literal",value:"'externalLink'"},{name:"literal",value:"'eye'"},{name:"literal",value:"'faceScan'"},{name:"literal",value:"'faces'"},{name:"literal",value:"'factory'"},{name:"literal",value:"'faucet'"},{name:"literal",value:"'fib'"},{name:"literal",value:"'filmStrip'"},{name:"literal",value:"'filter'"},{name:"literal",value:"'fingerprint'"},{name:"literal",value:"'flame'"},{name:"literal",value:"'folder'"},{name:"literal",value:"'folderArrow'"},{name:"literal",value:"'folderOpen'"},{name:"literal",value:"'followAdd'"},{name:"literal",value:"'following'"},{name:"literal",value:"'football'"},{name:"literal",value:"'fork'"},{name:"literal",value:"'forwardArrow'"},{name:"literal",value:"'fscsProtection'"},{name:"literal",value:"'gab'"},{name:"literal",value:"'games'"},{name:"literal",value:"'gaming'"},{name:"literal",value:"'gasFees'"},{name:"literal",value:"'gasFeesAlt'"},{name:"literal",value:"'gauge'"},{name:"literal",value:"'gaugeEmpty'"},{name:"literal",value:"'gaugeHigh'"},{name:"literal",value:"'gaugeHighLow'"},{name:"literal",value:"'gaugeHighMid'"},{name:"literal",value:"'gaugeLow'"},{name:"literal",value:"'gaugeLowHigh'"},{name:"literal",value:"'gaugeLowMid'"},{name:"literal",value:"'gaugeMedium'"},{name:"literal",value:"'gavel'"},{name:"literal",value:"'gear'"},{name:"literal",value:"'generalCharacter'"},{name:"literal",value:"'ghost'"},{name:"literal",value:"'gif'"},{name:"literal",value:"'giftBox'"},{name:"literal",value:"'giftCard'"},{name:"literal",value:"'gitHubLogo'"},{name:"literal",value:"'globe'"},{name:"literal",value:"'golf'"},{name:"literal",value:"'googleLogo'"},{name:"literal",value:"'greenEnergy'"},{name:"literal",value:"'grid'"},{name:"literal",value:"'group'"},{name:"literal",value:"'hamburger'"},{name:"literal",value:"'hammer'"},{name:"literal",value:"'heart'"},{name:"literal",value:"'helpCenterProduct'"},{name:"literal",value:"'helpCenterQuestionMark'"},{name:"literal",value:"'hiddenEye'"},{name:"literal",value:"'hockey'"},{name:"literal",value:"'home'"},{name:"literal",value:"'horizontalLine'"},{name:"literal",value:"'hospital'"},{name:"literal",value:"'hospitalCross'"},{name:"literal",value:"'hurricane'"},{name:"literal",value:"'ideal'"},{name:"literal",value:"'identityCard'"},{name:"literal",value:"'image'"},{name:"literal",value:"'info'"},{name:"literal",value:"'initiator'"},{name:"literal",value:"'instagramLogo'"},{name:"literal",value:"'instantUnstakingClock'"},{name:"literal",value:"'institute'"},{name:"literal",value:"'institutionalProduct'"},{name:"literal",value:"'interest'"},{name:"literal",value:"'invisible'"},{name:"literal",value:"'invoice'"},{name:"literal",value:"'key'"},{name:"literal",value:"'keyboard'"},{name:"literal",value:"'laptop'"},{name:"literal",value:"'leadChart'"},{name:"literal",value:"'leadCoin'"},{name:"literal",value:"'learningRewardsProduct'"},{name:"literal",value:"'light'"},{name:"literal",value:"'lightbulb'"},{name:"literal",value:"'lightning'"},{name:"literal",value:"'lightningBolt'"},{name:"literal",value:"'lineChartCrypto'"},{name:"literal",value:"'list'"},{name:"literal",value:"'location'"},{name:"literal",value:"'lock'"},{name:"literal",value:"'login'"},{name:"literal",value:"'logout'"},{name:"literal",value:"'loop'"},{name:"literal",value:"'magnifyingGlass'"},{name:"literal",value:"'marketCap'"},{name:"literal",value:"'medal'"},{name:"literal",value:"'megaphone'"},{name:"literal",value:"'menu'"},{name:"literal",value:"'metaverse'"},{name:"literal",value:"'microphone'"},{name:"literal",value:"'microphoneCordless'"},{name:"literal",value:"'microscope'"},{name:"literal",value:"'mint'"},{name:"literal",value:"'minus'"},{name:"literal",value:"'mma'"},{name:"literal",value:"'moneyCardCoin'"},{name:"literal",value:"'moon'"},{name:"literal",value:"'more'"},{name:"literal",value:"'moreVertical'"},{name:"literal",value:"'motorsport'"},{name:"literal",value:"'music'"},{name:"literal",value:"'musicArticles'"},{name:"literal",value:"'needle'"},{name:"literal",value:"'newsFeed'"},{name:"literal",value:"'newsletter'"},{name:"literal",value:"'nft'"},{name:"literal",value:"'nftBuy'"},{name:"literal",value:"'nftOffer'"},{name:"literal",value:"'nftProduct'"},{name:"literal",value:"'nftSale'"},{name:"literal",value:"'noRocket'"},{name:"literal",value:"'noWifi'"},{name:"literal",value:"'nodeProduct'"},{name:"literal",value:"'oil'"},{name:"literal",value:"'options'"},{name:"literal",value:"'orderBook'"},{name:"literal",value:"'orderHistory'"},{name:"literal",value:"'outline'"},{name:"literal",value:"'pFPS'"},{name:"literal",value:"'paperAirplane'"},{name:"literal",value:"'paperclip'"},{name:"literal",value:"'participate'"},{name:"literal",value:"'participateProduct'"},{name:"literal",value:"'passKey'"},{name:"literal",value:"'passport'"},{name:"literal",value:"'pause'"},{name:"literal",value:"'pay'"},{name:"literal",value:"'payProduct'"},{name:"literal",value:"'paymentCard'"},{name:"literal",value:"'payments'"},{name:"literal",value:"'payouts'"},{name:"literal",value:"'paypal'"},{name:"literal",value:"'pencil'"},{name:"literal",value:"'peopleGroup'"},{name:"literal",value:"'peopleStar'"},{name:"literal",value:"'percentage'"},{name:"literal",value:"'perpetualSwap'"},{name:"literal",value:"'phone'"},{name:"literal",value:"'pieChartData'"},{name:"literal",value:"'pillBottle'"},{name:"literal",value:"'pillCapsule'"},{name:"literal",value:"'pin'"},{name:"literal",value:"'plane'"},{name:"literal",value:"'planet'"},{name:"literal",value:"'play'"},{name:"literal",value:"'playbutton'"},{name:"literal",value:"'plusMinus'"},{name:"literal",value:"'podiumStar'"},{name:"literal",value:"'politicsBuilding'"},{name:"literal",value:"'politicsCandidate'"},{name:"literal",value:"'politicsFlag'"},{name:"literal",value:"'politicsGavel'"},{name:"literal",value:"'politicsPodium'"},{name:"literal",value:"'politicsStar'"},{name:"literal",value:"'powerTool'"},{name:"literal",value:"'priceAlerts'"},{name:"literal",value:"'priceAlertsCheck'"},{name:"literal",value:"'primePoduct'"},{name:"literal",value:"'privateClientProduct'"},{name:"literal",value:"'proProduct'"},{name:"literal",value:"'profile'"},{name:"literal",value:"'protection'"},{name:"literal",value:"'pulse'"},{name:"literal",value:"'pyramid'"},{name:"literal",value:"'qrCode'"},{name:"literal",value:"'qrCodeAlt'"},{name:"literal",value:"'queryTransact'"},{name:"literal",value:"'questionMark'"},{name:"literal",value:"'quotation'"},{name:"literal",value:"'rain'"},{name:"literal",value:"'ratingsCheck'"},{name:"literal",value:"'ratingsChecks'"},{name:"literal",value:"'ratingsStar'"},{name:"literal",value:"'reCenter'"},{name:"literal",value:"'rectangle'"},{name:"literal",value:"'recurring'"},{name:"literal",value:"'refresh'"},{name:"literal",value:"'regulated'"},{name:"literal",value:"'regulatedFutures'"},{name:"literal",value:"'report'"},{name:"literal",value:"'rewardsProduct'"},{name:"literal",value:"'ribbon'"},{name:"literal",value:"'robot'"},{name:"literal",value:"'rocket'"},{name:"literal",value:"'rocketShip'"},{name:"literal",value:"'rollingSpot'"},{name:"literal",value:"'rosettaProduct'"},{name:"literal",value:"'rottenTomato'"},{name:"literal",value:"'royalty'"},{name:"literal",value:"'safe'"},{name:"literal",value:"'save'"},{name:"literal",value:"'savingsBank'"},{name:"literal",value:"'scanQrCode'"},{name:"literal",value:"'scienceAtom'"},{name:"literal",value:"'scienceBeaker'"},{name:"literal",value:"'scienceMoon'"},{name:"literal",value:"'search'"},{name:"literal",value:"'securityKey'"},{name:"literal",value:"'securityShield'"},{name:"literal",value:"'seen'"},{name:"literal",value:"'sendReceive'"},{name:"literal",value:"'setPinCode'"},{name:"literal",value:"'settings'"},{name:"literal",value:"'share'"},{name:"literal",value:"'shield'"},{name:"literal",value:"'shieldOutline'"},{name:"literal",value:"'shoe'"},{name:"literal",value:"'shoppingCart'"},{name:"literal",value:"'signinProduct'"},{name:"literal",value:"'singleCoin'"},{name:"literal",value:"'singleNote'"},{name:"literal",value:"'singlecloud'"},{name:"literal",value:"'smartContract'"},{name:"literal",value:"'snow'"},{name:"literal",value:"'soccer'"},{name:"literal",value:"'socialChat'"},{name:"literal",value:"'socialReshare'"},{name:"literal",value:"'socialShare'"},{name:"literal",value:"'sofort'"},{name:"literal",value:"'sortDoubleArrow'"},{name:"literal",value:"'sortDown'"},{name:"literal",value:"'sortDownCenter'"},{name:"literal",value:"'sortUp'"},{name:"literal",value:"'sortUpCenter'"},{name:"literal",value:"'soundOff'"},{name:"literal",value:"'soundOn'"},{name:"literal",value:"'sparkle'"},{name:"literal",value:"'speaker'"},{name:"literal",value:"'speechBubble'"},{name:"literal",value:"'stableCoin'"},{name:"literal",value:"'stablecoinStack'"},{name:"literal",value:"'staggeredList'"},{name:"literal",value:"'stake'"},{name:"literal",value:"'staking'"},{name:"literal",value:"'star'"},{name:"literal",value:"'starAward'"},{name:"literal",value:"'starBubble'"},{name:"literal",value:"'starTrophy'"},{name:"literal",value:"'statusDot'"},{name:"literal",value:"'step0'"},{name:"literal",value:"'step1'"},{name:"literal",value:"'step2'"},{name:"literal",value:"'step3'"},{name:"literal",value:"'step4'"},{name:"literal",value:"'step5'"},{name:"literal",value:"'step6'"},{name:"literal",value:"'step7'"},{name:"literal",value:"'step8'"},{name:"literal",value:"'step9'"},{name:"literal",value:"'strategy'"},{name:"literal",value:"'sun'"},{name:"literal",value:"'support'"},{name:"literal",value:"'tag'"},{name:"literal",value:"'taxes'"},{name:"literal",value:"'taxesReceipt'"},{name:"literal",value:"'telephone'"},{name:"literal",value:"'tennis'"},{name:"literal",value:"'test'"},{name:"literal",value:"'thermometer'"},{name:"literal",value:"'thumbsDown'"},{name:"literal",value:"'thumbsDownOutline'"},{name:"literal",value:"'thumbsUp'"},{name:"literal",value:"'thumbsUpOutline'"},{name:"literal",value:"'tokenLaunchCoin'"},{name:"literal",value:"'tokenLaunchRocket'"},{name:"literal",value:"'tokenSales'"},{name:"literal",value:"'tornado'"},{name:"literal",value:"'trading'"},{name:"literal",value:"'transactions'"},{name:"literal",value:"'trashCan'"},{name:"literal",value:"'trophy'"},{name:"literal",value:"'trophyCup'"},{name:"literal",value:"'tshirt'"},{name:"literal",value:"'tv'"},{name:"literal",value:"'tvStand'"},{name:"literal",value:"'twitterLogo'"},{name:"literal",value:"'ultility'"},{name:"literal",value:"'umbrella'"},{name:"literal",value:"'undo'"},{name:"literal",value:"'unfollowPeople'"},{name:"literal",value:"'unknown'"},{name:"literal",value:"'unlock'"},{name:"literal",value:"'upArrow'"},{name:"literal",value:"'upload'"},{name:"literal",value:"'venturesProduct'"},{name:"literal",value:"'verifiedBadge'"},{name:"literal",value:"'verifiedPools'"},{name:"literal",value:"'verticalLine'"},{name:"literal",value:"'virus'"},{name:"literal",value:"'visible'"},{name:"literal",value:"'waasProduct'"},{name:"literal",value:"'wallet'"},{name:"literal",value:"'walletLogo'"},{name:"literal",value:"'walletProduct'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'webhooks'"},{name:"literal",value:"'wellness'"},{name:"literal",value:"'wifi'"},{name:"literal",value:"'wind'"},{name:"literal",value:"'wireTransfer'"},{name:"literal",value:"'withdraw'"},{name:"literal",value:"'wrapToken'"},{name:"literal",value:"'xLogo'"}]},description:"Icon to use for the previous button.",defaultValue:{value:"'caretLeft'",computed:!1}},nextIcon:{required:!1,tsType:{name:"union",raw:`| 'account'
| 'activity'
| 'add'
| 'addPeople'
| 'advancedMarketSelector'
| 'advancedTradeProduct'
| 'affiliates'
| 'airdrop'
| 'airdropAlt'
| 'airdropCoins'
| 'airdropParachute'
| 'alien'
| 'allTimeHigh'
| 'allocation'
| 'annotation'
| 'api'
| 'apiPlug'
| 'apothecary'
| 'appSwitcher'
| 'apple'
| 'appleLogo'
| 'application'
| 'arrowDown'
| 'arrowLeft'
| 'arrowRight'
| 'arrowUp'
| 'arrowsHorizontal'
| 'arrowsUpDown'
| 'arrowsVertical'
| 'artwork'
| 'assetHubProduct'
| 'assetManagementProduct'
| 'astronautHelmet'
| 'atSign'
| 'atomScience'
| 'auto'
| 'autoCar'
| 'avatar'
| 'average'
| 'backArrow'
| 'ballot'
| 'ballotbox'
| 'bandage'
| 'bank'
| 'barChartSimple'
| 'barChartWindow'
| 'base'
| 'baseApps'
| 'baseFeed'
| 'baseNotification'
| 'baseQuickBuy'
| 'baseSquare'
| 'baseTransact'
| 'baseVerification'
| 'baseWallet'
| 'baseball'
| 'basketball'
| 'beaker'
| 'beginningArrow'
| 'bell'
| 'bellCheck'
| 'bellPlus'
| 'birthcertificate'
| 'block'
| 'blockchain'
| 'blog'
| 'book'
| 'bookmark'
| 'borrowProduct'
| 'boxing'
| 'bridging'
| 'briefcase'
| 'briefcaseAlt'
| 'browser'
| 'bug'
| 'building'
| 'calculator'
| 'calendar'
| 'calendarBlank'
| 'calendarDates'
| 'calendarEmpty'
| 'calendarHeart'
| 'calendarMoney'
| 'calendarStar'
| 'camera'
| 'candlesticks'
| 'car'
| 'card'
| 'caret'
| 'caretDown'
| 'caretLeft'
| 'caretRight'
| 'caretUp'
| 'cash'
| 'cashAustralianDollar'
| 'cashBrazilianReal'
| 'cashBrazillianReal'
| 'cashCanadianDollar'
| 'cashCoins'
| 'cashEUR'
| 'cashGBP'
| 'cashIndonesianRupiah'
| 'cashJPY'
| 'cashPhilippinePeso'
| 'cashPolishZloty'
| 'cashRupee'
| 'cashSingaporeDollar'
| 'cashSwissFranc'
| 'cashThaiBaht'
| 'cashTurkishLira'
| 'cashUSD'
| 'cashUaeDirham'
| 'cashVietnameseDong'
| 'chainLink'
| 'chartBar'
| 'chartCandles'
| 'chartLine'
| 'chartPie'
| 'chartPieCircle'
| 'chartVolume'
| 'chatBotAgent'
| 'chatBubble'
| 'chatRequests'
| 'checkboxChecked'
| 'checkboxEmpty'
| 'checkmark'
| 'chess'
| 'circleCheckmark'
| 'circleCross'
| 'circulatingSupply'
| 'city'
| 'clipboard'
| 'clock'
| 'clockOutline'
| 'close'
| 'closeCaption'
| 'clothing'
| 'cloud'
| 'cloudPartial'
| 'cloudProduct'
| 'cluster'
| 'coinbase'
| 'coinbaseCardProduct'
| 'coinbaseOne'
| 'coinbaseOneCard'
| 'coinbaseOneLogo'
| 'coinbaseRewards'
| 'coinsCrypto'
| 'collapse'
| 'collectibles'
| 'collection'
| 'comment'
| 'commentPlus'
| 'commerceProduct'
| 'compass'
| 'complianceProduct'
| 'compose'
| 'computerChip'
| 'concierge'
| 'conciergeBell'
| 'config'
| 'continuous'
| 'convert'
| 'copy'
| 'corporation'
| 'creatorCoin'
| 'cricket'
| 'cross'
| 'crossTrade'
| 'crypto'
| 'cryptobasics'
| 'crystalBall'
| 'crystalBallInsight'
| 'currencies'
| 'custodyProduct'
| 'dashboard'
| 'dataMarketplaceProduct'
| 'dataStack'
| 'defi'
| 'delegateProduct'
| 'deposit'
| 'derivatives'
| 'derivativesProduct'
| 'derivativesProductNew'
| 'developerAPIProduct'
| 'developerPlatformProduct'
| 'dex'
| 'diagonalDownArrow'
| 'diagonalRightArrow'
| 'diagonalUpArrow'
| 'diamond'
| 'diamondIncentives'
| 'dinnerPlate'
| 'directDeposit'
| 'directDepositIcon'
| 'disabledPhone'
| 'discordLogo'
| 'distribution'
| 'document'
| 'documentation'
| 'dot'
| 'doubleChevronRight'
| 'downArrow'
| 'download'
| 'drag'
| 'drops'
| 'earn'
| 'earnProduct'
| 'earnRewards'
| 'earthquake'
| 'educationBook'
| 'educationPencil'
| 'email'
| 'endArrow'
| 'entertainment'
| 'error'
| 'ethereum'
| 'eventContracts'
| 'exchangeProduct'
| 'exclamationMark'
| 'expand'
| 'expandAddress'
| 'expandAll'
| 'externalLink'
| 'eye'
| 'faceScan'
| 'faces'
| 'factory'
| 'faucet'
| 'fib'
| 'filmStrip'
| 'filter'
| 'fingerprint'
| 'flame'
| 'folder'
| 'folderArrow'
| 'folderOpen'
| 'followAdd'
| 'following'
| 'football'
| 'fork'
| 'forwardArrow'
| 'fscsProtection'
| 'gab'
| 'games'
| 'gaming'
| 'gasFees'
| 'gasFeesAlt'
| 'gauge'
| 'gaugeEmpty'
| 'gaugeHigh'
| 'gaugeHighLow'
| 'gaugeHighMid'
| 'gaugeLow'
| 'gaugeLowHigh'
| 'gaugeLowMid'
| 'gaugeMedium'
| 'gavel'
| 'gear'
| 'generalCharacter'
| 'ghost'
| 'gif'
| 'giftBox'
| 'giftCard'
| 'gitHubLogo'
| 'globe'
| 'golf'
| 'googleLogo'
| 'greenEnergy'
| 'grid'
| 'group'
| 'hamburger'
| 'hammer'
| 'heart'
| 'helpCenterProduct'
| 'helpCenterQuestionMark'
| 'hiddenEye'
| 'hockey'
| 'home'
| 'horizontalLine'
| 'hospital'
| 'hospitalCross'
| 'hurricane'
| 'ideal'
| 'identityCard'
| 'image'
| 'info'
| 'initiator'
| 'instagramLogo'
| 'instantUnstakingClock'
| 'institute'
| 'institutionalProduct'
| 'interest'
| 'invisible'
| 'invoice'
| 'key'
| 'keyboard'
| 'laptop'
| 'leadChart'
| 'leadCoin'
| 'learningRewardsProduct'
| 'light'
| 'lightbulb'
| 'lightning'
| 'lightningBolt'
| 'lineChartCrypto'
| 'list'
| 'location'
| 'lock'
| 'login'
| 'logout'
| 'loop'
| 'magnifyingGlass'
| 'marketCap'
| 'medal'
| 'megaphone'
| 'menu'
| 'metaverse'
| 'microphone'
| 'microphoneCordless'
| 'microscope'
| 'mint'
| 'minus'
| 'mma'
| 'moneyCardCoin'
| 'moon'
| 'more'
| 'moreVertical'
| 'motorsport'
| 'music'
| 'musicArticles'
| 'needle'
| 'newsFeed'
| 'newsletter'
| 'nft'
| 'nftBuy'
| 'nftOffer'
| 'nftProduct'
| 'nftSale'
| 'noRocket'
| 'noWifi'
| 'nodeProduct'
| 'oil'
| 'options'
| 'orderBook'
| 'orderHistory'
| 'outline'
| 'pFPS'
| 'paperAirplane'
| 'paperclip'
| 'participate'
| 'participateProduct'
| 'passKey'
| 'passport'
| 'pause'
| 'pay'
| 'payProduct'
| 'paymentCard'
| 'payments'
| 'payouts'
| 'paypal'
| 'pencil'
| 'peopleGroup'
| 'peopleStar'
| 'percentage'
| 'perpetualSwap'
| 'phone'
| 'pieChartData'
| 'pillBottle'
| 'pillCapsule'
| 'pin'
| 'plane'
| 'planet'
| 'play'
| 'playbutton'
| 'plusMinus'
| 'podiumStar'
| 'politicsBuilding'
| 'politicsCandidate'
| 'politicsFlag'
| 'politicsGavel'
| 'politicsPodium'
| 'politicsStar'
| 'powerTool'
| 'priceAlerts'
| 'priceAlertsCheck'
| 'primePoduct'
| 'privateClientProduct'
| 'proProduct'
| 'profile'
| 'protection'
| 'pulse'
| 'pyramid'
| 'qrCode'
| 'qrCodeAlt'
| 'queryTransact'
| 'questionMark'
| 'quotation'
| 'rain'
| 'ratingsCheck'
| 'ratingsChecks'
| 'ratingsStar'
| 'reCenter'
| 'rectangle'
| 'recurring'
| 'refresh'
| 'regulated'
| 'regulatedFutures'
| 'report'
| 'rewardsProduct'
| 'ribbon'
| 'robot'
| 'rocket'
| 'rocketShip'
| 'rollingSpot'
| 'rosettaProduct'
| 'rottenTomato'
| 'royalty'
| 'safe'
| 'save'
| 'savingsBank'
| 'scanQrCode'
| 'scienceAtom'
| 'scienceBeaker'
| 'scienceMoon'
| 'search'
| 'securityKey'
| 'securityShield'
| 'seen'
| 'sendReceive'
| 'setPinCode'
| 'settings'
| 'share'
| 'shield'
| 'shieldOutline'
| 'shoe'
| 'shoppingCart'
| 'signinProduct'
| 'singleCoin'
| 'singleNote'
| 'singlecloud'
| 'smartContract'
| 'snow'
| 'soccer'
| 'socialChat'
| 'socialReshare'
| 'socialShare'
| 'sofort'
| 'sortDoubleArrow'
| 'sortDown'
| 'sortDownCenter'
| 'sortUp'
| 'sortUpCenter'
| 'soundOff'
| 'soundOn'
| 'sparkle'
| 'speaker'
| 'speechBubble'
| 'stableCoin'
| 'stablecoinStack'
| 'staggeredList'
| 'stake'
| 'staking'
| 'star'
| 'starAward'
| 'starBubble'
| 'starTrophy'
| 'statusDot'
| 'step0'
| 'step1'
| 'step2'
| 'step3'
| 'step4'
| 'step5'
| 'step6'
| 'step7'
| 'step8'
| 'step9'
| 'strategy'
| 'sun'
| 'support'
| 'tag'
| 'taxes'
| 'taxesReceipt'
| 'telephone'
| 'tennis'
| 'test'
| 'thermometer'
| 'thumbsDown'
| 'thumbsDownOutline'
| 'thumbsUp'
| 'thumbsUpOutline'
| 'tokenLaunchCoin'
| 'tokenLaunchRocket'
| 'tokenSales'
| 'tornado'
| 'trading'
| 'transactions'
| 'trashCan'
| 'trophy'
| 'trophyCup'
| 'tshirt'
| 'tv'
| 'tvStand'
| 'twitterLogo'
| 'ultility'
| 'umbrella'
| 'undo'
| 'unfollowPeople'
| 'unknown'
| 'unlock'
| 'upArrow'
| 'upload'
| 'venturesProduct'
| 'verifiedBadge'
| 'verifiedPools'
| 'verticalLine'
| 'virus'
| 'visible'
| 'waasProduct'
| 'wallet'
| 'walletLogo'
| 'walletProduct'
| 'warning'
| 'webhooks'
| 'wellness'
| 'wifi'
| 'wind'
| 'wireTransfer'
| 'withdraw'
| 'wrapToken'
| 'xLogo'`,elements:[{name:"literal",value:"'account'"},{name:"literal",value:"'activity'"},{name:"literal",value:"'add'"},{name:"literal",value:"'addPeople'"},{name:"literal",value:"'advancedMarketSelector'"},{name:"literal",value:"'advancedTradeProduct'"},{name:"literal",value:"'affiliates'"},{name:"literal",value:"'airdrop'"},{name:"literal",value:"'airdropAlt'"},{name:"literal",value:"'airdropCoins'"},{name:"literal",value:"'airdropParachute'"},{name:"literal",value:"'alien'"},{name:"literal",value:"'allTimeHigh'"},{name:"literal",value:"'allocation'"},{name:"literal",value:"'annotation'"},{name:"literal",value:"'api'"},{name:"literal",value:"'apiPlug'"},{name:"literal",value:"'apothecary'"},{name:"literal",value:"'appSwitcher'"},{name:"literal",value:"'apple'"},{name:"literal",value:"'appleLogo'"},{name:"literal",value:"'application'"},{name:"literal",value:"'arrowDown'"},{name:"literal",value:"'arrowLeft'"},{name:"literal",value:"'arrowRight'"},{name:"literal",value:"'arrowUp'"},{name:"literal",value:"'arrowsHorizontal'"},{name:"literal",value:"'arrowsUpDown'"},{name:"literal",value:"'arrowsVertical'"},{name:"literal",value:"'artwork'"},{name:"literal",value:"'assetHubProduct'"},{name:"literal",value:"'assetManagementProduct'"},{name:"literal",value:"'astronautHelmet'"},{name:"literal",value:"'atSign'"},{name:"literal",value:"'atomScience'"},{name:"literal",value:"'auto'"},{name:"literal",value:"'autoCar'"},{name:"literal",value:"'avatar'"},{name:"literal",value:"'average'"},{name:"literal",value:"'backArrow'"},{name:"literal",value:"'ballot'"},{name:"literal",value:"'ballotbox'"},{name:"literal",value:"'bandage'"},{name:"literal",value:"'bank'"},{name:"literal",value:"'barChartSimple'"},{name:"literal",value:"'barChartWindow'"},{name:"literal",value:"'base'"},{name:"literal",value:"'baseApps'"},{name:"literal",value:"'baseFeed'"},{name:"literal",value:"'baseNotification'"},{name:"literal",value:"'baseQuickBuy'"},{name:"literal",value:"'baseSquare'"},{name:"literal",value:"'baseTransact'"},{name:"literal",value:"'baseVerification'"},{name:"literal",value:"'baseWallet'"},{name:"literal",value:"'baseball'"},{name:"literal",value:"'basketball'"},{name:"literal",value:"'beaker'"},{name:"literal",value:"'beginningArrow'"},{name:"literal",value:"'bell'"},{name:"literal",value:"'bellCheck'"},{name:"literal",value:"'bellPlus'"},{name:"literal",value:"'birthcertificate'"},{name:"literal",value:"'block'"},{name:"literal",value:"'blockchain'"},{name:"literal",value:"'blog'"},{name:"literal",value:"'book'"},{name:"literal",value:"'bookmark'"},{name:"literal",value:"'borrowProduct'"},{name:"literal",value:"'boxing'"},{name:"literal",value:"'bridging'"},{name:"literal",value:"'briefcase'"},{name:"literal",value:"'briefcaseAlt'"},{name:"literal",value:"'browser'"},{name:"literal",value:"'bug'"},{name:"literal",value:"'building'"},{name:"literal",value:"'calculator'"},{name:"literal",value:"'calendar'"},{name:"literal",value:"'calendarBlank'"},{name:"literal",value:"'calendarDates'"},{name:"literal",value:"'calendarEmpty'"},{name:"literal",value:"'calendarHeart'"},{name:"literal",value:"'calendarMoney'"},{name:"literal",value:"'calendarStar'"},{name:"literal",value:"'camera'"},{name:"literal",value:"'candlesticks'"},{name:"literal",value:"'car'"},{name:"literal",value:"'card'"},{name:"literal",value:"'caret'"},{name:"literal",value:"'caretDown'"},{name:"literal",value:"'caretLeft'"},{name:"literal",value:"'caretRight'"},{name:"literal",value:"'caretUp'"},{name:"literal",value:"'cash'"},{name:"literal",value:"'cashAustralianDollar'"},{name:"literal",value:"'cashBrazilianReal'"},{name:"literal",value:"'cashBrazillianReal'"},{name:"literal",value:"'cashCanadianDollar'"},{name:"literal",value:"'cashCoins'"},{name:"literal",value:"'cashEUR'"},{name:"literal",value:"'cashGBP'"},{name:"literal",value:"'cashIndonesianRupiah'"},{name:"literal",value:"'cashJPY'"},{name:"literal",value:"'cashPhilippinePeso'"},{name:"literal",value:"'cashPolishZloty'"},{name:"literal",value:"'cashRupee'"},{name:"literal",value:"'cashSingaporeDollar'"},{name:"literal",value:"'cashSwissFranc'"},{name:"literal",value:"'cashThaiBaht'"},{name:"literal",value:"'cashTurkishLira'"},{name:"literal",value:"'cashUSD'"},{name:"literal",value:"'cashUaeDirham'"},{name:"literal",value:"'cashVietnameseDong'"},{name:"literal",value:"'chainLink'"},{name:"literal",value:"'chartBar'"},{name:"literal",value:"'chartCandles'"},{name:"literal",value:"'chartLine'"},{name:"literal",value:"'chartPie'"},{name:"literal",value:"'chartPieCircle'"},{name:"literal",value:"'chartVolume'"},{name:"literal",value:"'chatBotAgent'"},{name:"literal",value:"'chatBubble'"},{name:"literal",value:"'chatRequests'"},{name:"literal",value:"'checkboxChecked'"},{name:"literal",value:"'checkboxEmpty'"},{name:"literal",value:"'checkmark'"},{name:"literal",value:"'chess'"},{name:"literal",value:"'circleCheckmark'"},{name:"literal",value:"'circleCross'"},{name:"literal",value:"'circulatingSupply'"},{name:"literal",value:"'city'"},{name:"literal",value:"'clipboard'"},{name:"literal",value:"'clock'"},{name:"literal",value:"'clockOutline'"},{name:"literal",value:"'close'"},{name:"literal",value:"'closeCaption'"},{name:"literal",value:"'clothing'"},{name:"literal",value:"'cloud'"},{name:"literal",value:"'cloudPartial'"},{name:"literal",value:"'cloudProduct'"},{name:"literal",value:"'cluster'"},{name:"literal",value:"'coinbase'"},{name:"literal",value:"'coinbaseCardProduct'"},{name:"literal",value:"'coinbaseOne'"},{name:"literal",value:"'coinbaseOneCard'"},{name:"literal",value:"'coinbaseOneLogo'"},{name:"literal",value:"'coinbaseRewards'"},{name:"literal",value:"'coinsCrypto'"},{name:"literal",value:"'collapse'"},{name:"literal",value:"'collectibles'"},{name:"literal",value:"'collection'"},{name:"literal",value:"'comment'"},{name:"literal",value:"'commentPlus'"},{name:"literal",value:"'commerceProduct'"},{name:"literal",value:"'compass'"},{name:"literal",value:"'complianceProduct'"},{name:"literal",value:"'compose'"},{name:"literal",value:"'computerChip'"},{name:"literal",value:"'concierge'"},{name:"literal",value:"'conciergeBell'"},{name:"literal",value:"'config'"},{name:"literal",value:"'continuous'"},{name:"literal",value:"'convert'"},{name:"literal",value:"'copy'"},{name:"literal",value:"'corporation'"},{name:"literal",value:"'creatorCoin'"},{name:"literal",value:"'cricket'"},{name:"literal",value:"'cross'"},{name:"literal",value:"'crossTrade'"},{name:"literal",value:"'crypto'"},{name:"literal",value:"'cryptobasics'"},{name:"literal",value:"'crystalBall'"},{name:"literal",value:"'crystalBallInsight'"},{name:"literal",value:"'currencies'"},{name:"literal",value:"'custodyProduct'"},{name:"literal",value:"'dashboard'"},{name:"literal",value:"'dataMarketplaceProduct'"},{name:"literal",value:"'dataStack'"},{name:"literal",value:"'defi'"},{name:"literal",value:"'delegateProduct'"},{name:"literal",value:"'deposit'"},{name:"literal",value:"'derivatives'"},{name:"literal",value:"'derivativesProduct'"},{name:"literal",value:"'derivativesProductNew'"},{name:"literal",value:"'developerAPIProduct'"},{name:"literal",value:"'developerPlatformProduct'"},{name:"literal",value:"'dex'"},{name:"literal",value:"'diagonalDownArrow'"},{name:"literal",value:"'diagonalRightArrow'"},{name:"literal",value:"'diagonalUpArrow'"},{name:"literal",value:"'diamond'"},{name:"literal",value:"'diamondIncentives'"},{name:"literal",value:"'dinnerPlate'"},{name:"literal",value:"'directDeposit'"},{name:"literal",value:"'directDepositIcon'"},{name:"literal",value:"'disabledPhone'"},{name:"literal",value:"'discordLogo'"},{name:"literal",value:"'distribution'"},{name:"literal",value:"'document'"},{name:"literal",value:"'documentation'"},{name:"literal",value:"'dot'"},{name:"literal",value:"'doubleChevronRight'"},{name:"literal",value:"'downArrow'"},{name:"literal",value:"'download'"},{name:"literal",value:"'drag'"},{name:"literal",value:"'drops'"},{name:"literal",value:"'earn'"},{name:"literal",value:"'earnProduct'"},{name:"literal",value:"'earnRewards'"},{name:"literal",value:"'earthquake'"},{name:"literal",value:"'educationBook'"},{name:"literal",value:"'educationPencil'"},{name:"literal",value:"'email'"},{name:"literal",value:"'endArrow'"},{name:"literal",value:"'entertainment'"},{name:"literal",value:"'error'"},{name:"literal",value:"'ethereum'"},{name:"literal",value:"'eventContracts'"},{name:"literal",value:"'exchangeProduct'"},{name:"literal",value:"'exclamationMark'"},{name:"literal",value:"'expand'"},{name:"literal",value:"'expandAddress'"},{name:"literal",value:"'expandAll'"},{name:"literal",value:"'externalLink'"},{name:"literal",value:"'eye'"},{name:"literal",value:"'faceScan'"},{name:"literal",value:"'faces'"},{name:"literal",value:"'factory'"},{name:"literal",value:"'faucet'"},{name:"literal",value:"'fib'"},{name:"literal",value:"'filmStrip'"},{name:"literal",value:"'filter'"},{name:"literal",value:"'fingerprint'"},{name:"literal",value:"'flame'"},{name:"literal",value:"'folder'"},{name:"literal",value:"'folderArrow'"},{name:"literal",value:"'folderOpen'"},{name:"literal",value:"'followAdd'"},{name:"literal",value:"'following'"},{name:"literal",value:"'football'"},{name:"literal",value:"'fork'"},{name:"literal",value:"'forwardArrow'"},{name:"literal",value:"'fscsProtection'"},{name:"literal",value:"'gab'"},{name:"literal",value:"'games'"},{name:"literal",value:"'gaming'"},{name:"literal",value:"'gasFees'"},{name:"literal",value:"'gasFeesAlt'"},{name:"literal",value:"'gauge'"},{name:"literal",value:"'gaugeEmpty'"},{name:"literal",value:"'gaugeHigh'"},{name:"literal",value:"'gaugeHighLow'"},{name:"literal",value:"'gaugeHighMid'"},{name:"literal",value:"'gaugeLow'"},{name:"literal",value:"'gaugeLowHigh'"},{name:"literal",value:"'gaugeLowMid'"},{name:"literal",value:"'gaugeMedium'"},{name:"literal",value:"'gavel'"},{name:"literal",value:"'gear'"},{name:"literal",value:"'generalCharacter'"},{name:"literal",value:"'ghost'"},{name:"literal",value:"'gif'"},{name:"literal",value:"'giftBox'"},{name:"literal",value:"'giftCard'"},{name:"literal",value:"'gitHubLogo'"},{name:"literal",value:"'globe'"},{name:"literal",value:"'golf'"},{name:"literal",value:"'googleLogo'"},{name:"literal",value:"'greenEnergy'"},{name:"literal",value:"'grid'"},{name:"literal",value:"'group'"},{name:"literal",value:"'hamburger'"},{name:"literal",value:"'hammer'"},{name:"literal",value:"'heart'"},{name:"literal",value:"'helpCenterProduct'"},{name:"literal",value:"'helpCenterQuestionMark'"},{name:"literal",value:"'hiddenEye'"},{name:"literal",value:"'hockey'"},{name:"literal",value:"'home'"},{name:"literal",value:"'horizontalLine'"},{name:"literal",value:"'hospital'"},{name:"literal",value:"'hospitalCross'"},{name:"literal",value:"'hurricane'"},{name:"literal",value:"'ideal'"},{name:"literal",value:"'identityCard'"},{name:"literal",value:"'image'"},{name:"literal",value:"'info'"},{name:"literal",value:"'initiator'"},{name:"literal",value:"'instagramLogo'"},{name:"literal",value:"'instantUnstakingClock'"},{name:"literal",value:"'institute'"},{name:"literal",value:"'institutionalProduct'"},{name:"literal",value:"'interest'"},{name:"literal",value:"'invisible'"},{name:"literal",value:"'invoice'"},{name:"literal",value:"'key'"},{name:"literal",value:"'keyboard'"},{name:"literal",value:"'laptop'"},{name:"literal",value:"'leadChart'"},{name:"literal",value:"'leadCoin'"},{name:"literal",value:"'learningRewardsProduct'"},{name:"literal",value:"'light'"},{name:"literal",value:"'lightbulb'"},{name:"literal",value:"'lightning'"},{name:"literal",value:"'lightningBolt'"},{name:"literal",value:"'lineChartCrypto'"},{name:"literal",value:"'list'"},{name:"literal",value:"'location'"},{name:"literal",value:"'lock'"},{name:"literal",value:"'login'"},{name:"literal",value:"'logout'"},{name:"literal",value:"'loop'"},{name:"literal",value:"'magnifyingGlass'"},{name:"literal",value:"'marketCap'"},{name:"literal",value:"'medal'"},{name:"literal",value:"'megaphone'"},{name:"literal",value:"'menu'"},{name:"literal",value:"'metaverse'"},{name:"literal",value:"'microphone'"},{name:"literal",value:"'microphoneCordless'"},{name:"literal",value:"'microscope'"},{name:"literal",value:"'mint'"},{name:"literal",value:"'minus'"},{name:"literal",value:"'mma'"},{name:"literal",value:"'moneyCardCoin'"},{name:"literal",value:"'moon'"},{name:"literal",value:"'more'"},{name:"literal",value:"'moreVertical'"},{name:"literal",value:"'motorsport'"},{name:"literal",value:"'music'"},{name:"literal",value:"'musicArticles'"},{name:"literal",value:"'needle'"},{name:"literal",value:"'newsFeed'"},{name:"literal",value:"'newsletter'"},{name:"literal",value:"'nft'"},{name:"literal",value:"'nftBuy'"},{name:"literal",value:"'nftOffer'"},{name:"literal",value:"'nftProduct'"},{name:"literal",value:"'nftSale'"},{name:"literal",value:"'noRocket'"},{name:"literal",value:"'noWifi'"},{name:"literal",value:"'nodeProduct'"},{name:"literal",value:"'oil'"},{name:"literal",value:"'options'"},{name:"literal",value:"'orderBook'"},{name:"literal",value:"'orderHistory'"},{name:"literal",value:"'outline'"},{name:"literal",value:"'pFPS'"},{name:"literal",value:"'paperAirplane'"},{name:"literal",value:"'paperclip'"},{name:"literal",value:"'participate'"},{name:"literal",value:"'participateProduct'"},{name:"literal",value:"'passKey'"},{name:"literal",value:"'passport'"},{name:"literal",value:"'pause'"},{name:"literal",value:"'pay'"},{name:"literal",value:"'payProduct'"},{name:"literal",value:"'paymentCard'"},{name:"literal",value:"'payments'"},{name:"literal",value:"'payouts'"},{name:"literal",value:"'paypal'"},{name:"literal",value:"'pencil'"},{name:"literal",value:"'peopleGroup'"},{name:"literal",value:"'peopleStar'"},{name:"literal",value:"'percentage'"},{name:"literal",value:"'perpetualSwap'"},{name:"literal",value:"'phone'"},{name:"literal",value:"'pieChartData'"},{name:"literal",value:"'pillBottle'"},{name:"literal",value:"'pillCapsule'"},{name:"literal",value:"'pin'"},{name:"literal",value:"'plane'"},{name:"literal",value:"'planet'"},{name:"literal",value:"'play'"},{name:"literal",value:"'playbutton'"},{name:"literal",value:"'plusMinus'"},{name:"literal",value:"'podiumStar'"},{name:"literal",value:"'politicsBuilding'"},{name:"literal",value:"'politicsCandidate'"},{name:"literal",value:"'politicsFlag'"},{name:"literal",value:"'politicsGavel'"},{name:"literal",value:"'politicsPodium'"},{name:"literal",value:"'politicsStar'"},{name:"literal",value:"'powerTool'"},{name:"literal",value:"'priceAlerts'"},{name:"literal",value:"'priceAlertsCheck'"},{name:"literal",value:"'primePoduct'"},{name:"literal",value:"'privateClientProduct'"},{name:"literal",value:"'proProduct'"},{name:"literal",value:"'profile'"},{name:"literal",value:"'protection'"},{name:"literal",value:"'pulse'"},{name:"literal",value:"'pyramid'"},{name:"literal",value:"'qrCode'"},{name:"literal",value:"'qrCodeAlt'"},{name:"literal",value:"'queryTransact'"},{name:"literal",value:"'questionMark'"},{name:"literal",value:"'quotation'"},{name:"literal",value:"'rain'"},{name:"literal",value:"'ratingsCheck'"},{name:"literal",value:"'ratingsChecks'"},{name:"literal",value:"'ratingsStar'"},{name:"literal",value:"'reCenter'"},{name:"literal",value:"'rectangle'"},{name:"literal",value:"'recurring'"},{name:"literal",value:"'refresh'"},{name:"literal",value:"'regulated'"},{name:"literal",value:"'regulatedFutures'"},{name:"literal",value:"'report'"},{name:"literal",value:"'rewardsProduct'"},{name:"literal",value:"'ribbon'"},{name:"literal",value:"'robot'"},{name:"literal",value:"'rocket'"},{name:"literal",value:"'rocketShip'"},{name:"literal",value:"'rollingSpot'"},{name:"literal",value:"'rosettaProduct'"},{name:"literal",value:"'rottenTomato'"},{name:"literal",value:"'royalty'"},{name:"literal",value:"'safe'"},{name:"literal",value:"'save'"},{name:"literal",value:"'savingsBank'"},{name:"literal",value:"'scanQrCode'"},{name:"literal",value:"'scienceAtom'"},{name:"literal",value:"'scienceBeaker'"},{name:"literal",value:"'scienceMoon'"},{name:"literal",value:"'search'"},{name:"literal",value:"'securityKey'"},{name:"literal",value:"'securityShield'"},{name:"literal",value:"'seen'"},{name:"literal",value:"'sendReceive'"},{name:"literal",value:"'setPinCode'"},{name:"literal",value:"'settings'"},{name:"literal",value:"'share'"},{name:"literal",value:"'shield'"},{name:"literal",value:"'shieldOutline'"},{name:"literal",value:"'shoe'"},{name:"literal",value:"'shoppingCart'"},{name:"literal",value:"'signinProduct'"},{name:"literal",value:"'singleCoin'"},{name:"literal",value:"'singleNote'"},{name:"literal",value:"'singlecloud'"},{name:"literal",value:"'smartContract'"},{name:"literal",value:"'snow'"},{name:"literal",value:"'soccer'"},{name:"literal",value:"'socialChat'"},{name:"literal",value:"'socialReshare'"},{name:"literal",value:"'socialShare'"},{name:"literal",value:"'sofort'"},{name:"literal",value:"'sortDoubleArrow'"},{name:"literal",value:"'sortDown'"},{name:"literal",value:"'sortDownCenter'"},{name:"literal",value:"'sortUp'"},{name:"literal",value:"'sortUpCenter'"},{name:"literal",value:"'soundOff'"},{name:"literal",value:"'soundOn'"},{name:"literal",value:"'sparkle'"},{name:"literal",value:"'speaker'"},{name:"literal",value:"'speechBubble'"},{name:"literal",value:"'stableCoin'"},{name:"literal",value:"'stablecoinStack'"},{name:"literal",value:"'staggeredList'"},{name:"literal",value:"'stake'"},{name:"literal",value:"'staking'"},{name:"literal",value:"'star'"},{name:"literal",value:"'starAward'"},{name:"literal",value:"'starBubble'"},{name:"literal",value:"'starTrophy'"},{name:"literal",value:"'statusDot'"},{name:"literal",value:"'step0'"},{name:"literal",value:"'step1'"},{name:"literal",value:"'step2'"},{name:"literal",value:"'step3'"},{name:"literal",value:"'step4'"},{name:"literal",value:"'step5'"},{name:"literal",value:"'step6'"},{name:"literal",value:"'step7'"},{name:"literal",value:"'step8'"},{name:"literal",value:"'step9'"},{name:"literal",value:"'strategy'"},{name:"literal",value:"'sun'"},{name:"literal",value:"'support'"},{name:"literal",value:"'tag'"},{name:"literal",value:"'taxes'"},{name:"literal",value:"'taxesReceipt'"},{name:"literal",value:"'telephone'"},{name:"literal",value:"'tennis'"},{name:"literal",value:"'test'"},{name:"literal",value:"'thermometer'"},{name:"literal",value:"'thumbsDown'"},{name:"literal",value:"'thumbsDownOutline'"},{name:"literal",value:"'thumbsUp'"},{name:"literal",value:"'thumbsUpOutline'"},{name:"literal",value:"'tokenLaunchCoin'"},{name:"literal",value:"'tokenLaunchRocket'"},{name:"literal",value:"'tokenSales'"},{name:"literal",value:"'tornado'"},{name:"literal",value:"'trading'"},{name:"literal",value:"'transactions'"},{name:"literal",value:"'trashCan'"},{name:"literal",value:"'trophy'"},{name:"literal",value:"'trophyCup'"},{name:"literal",value:"'tshirt'"},{name:"literal",value:"'tv'"},{name:"literal",value:"'tvStand'"},{name:"literal",value:"'twitterLogo'"},{name:"literal",value:"'ultility'"},{name:"literal",value:"'umbrella'"},{name:"literal",value:"'undo'"},{name:"literal",value:"'unfollowPeople'"},{name:"literal",value:"'unknown'"},{name:"literal",value:"'unlock'"},{name:"literal",value:"'upArrow'"},{name:"literal",value:"'upload'"},{name:"literal",value:"'venturesProduct'"},{name:"literal",value:"'verifiedBadge'"},{name:"literal",value:"'verifiedPools'"},{name:"literal",value:"'verticalLine'"},{name:"literal",value:"'virus'"},{name:"literal",value:"'visible'"},{name:"literal",value:"'waasProduct'"},{name:"literal",value:"'wallet'"},{name:"literal",value:"'walletLogo'"},{name:"literal",value:"'walletProduct'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'webhooks'"},{name:"literal",value:"'wellness'"},{name:"literal",value:"'wifi'"},{name:"literal",value:"'wind'"},{name:"literal",value:"'wireTransfer'"},{name:"literal",value:"'withdraw'"},{name:"literal",value:"'wrapToken'"},{name:"literal",value:"'xLogo'"}]},description:"Icon to use for the next button.",defaultValue:{value:"'caretRight'",computed:!1}},startIcon:{required:!1,tsType:{name:"union",raw:`| 'account'
| 'activity'
| 'add'
| 'addPeople'
| 'advancedMarketSelector'
| 'advancedTradeProduct'
| 'affiliates'
| 'airdrop'
| 'airdropAlt'
| 'airdropCoins'
| 'airdropParachute'
| 'alien'
| 'allTimeHigh'
| 'allocation'
| 'annotation'
| 'api'
| 'apiPlug'
| 'apothecary'
| 'appSwitcher'
| 'apple'
| 'appleLogo'
| 'application'
| 'arrowDown'
| 'arrowLeft'
| 'arrowRight'
| 'arrowUp'
| 'arrowsHorizontal'
| 'arrowsUpDown'
| 'arrowsVertical'
| 'artwork'
| 'assetHubProduct'
| 'assetManagementProduct'
| 'astronautHelmet'
| 'atSign'
| 'atomScience'
| 'auto'
| 'autoCar'
| 'avatar'
| 'average'
| 'backArrow'
| 'ballot'
| 'ballotbox'
| 'bandage'
| 'bank'
| 'barChartSimple'
| 'barChartWindow'
| 'base'
| 'baseApps'
| 'baseFeed'
| 'baseNotification'
| 'baseQuickBuy'
| 'baseSquare'
| 'baseTransact'
| 'baseVerification'
| 'baseWallet'
| 'baseball'
| 'basketball'
| 'beaker'
| 'beginningArrow'
| 'bell'
| 'bellCheck'
| 'bellPlus'
| 'birthcertificate'
| 'block'
| 'blockchain'
| 'blog'
| 'book'
| 'bookmark'
| 'borrowProduct'
| 'boxing'
| 'bridging'
| 'briefcase'
| 'briefcaseAlt'
| 'browser'
| 'bug'
| 'building'
| 'calculator'
| 'calendar'
| 'calendarBlank'
| 'calendarDates'
| 'calendarEmpty'
| 'calendarHeart'
| 'calendarMoney'
| 'calendarStar'
| 'camera'
| 'candlesticks'
| 'car'
| 'card'
| 'caret'
| 'caretDown'
| 'caretLeft'
| 'caretRight'
| 'caretUp'
| 'cash'
| 'cashAustralianDollar'
| 'cashBrazilianReal'
| 'cashBrazillianReal'
| 'cashCanadianDollar'
| 'cashCoins'
| 'cashEUR'
| 'cashGBP'
| 'cashIndonesianRupiah'
| 'cashJPY'
| 'cashPhilippinePeso'
| 'cashPolishZloty'
| 'cashRupee'
| 'cashSingaporeDollar'
| 'cashSwissFranc'
| 'cashThaiBaht'
| 'cashTurkishLira'
| 'cashUSD'
| 'cashUaeDirham'
| 'cashVietnameseDong'
| 'chainLink'
| 'chartBar'
| 'chartCandles'
| 'chartLine'
| 'chartPie'
| 'chartPieCircle'
| 'chartVolume'
| 'chatBotAgent'
| 'chatBubble'
| 'chatRequests'
| 'checkboxChecked'
| 'checkboxEmpty'
| 'checkmark'
| 'chess'
| 'circleCheckmark'
| 'circleCross'
| 'circulatingSupply'
| 'city'
| 'clipboard'
| 'clock'
| 'clockOutline'
| 'close'
| 'closeCaption'
| 'clothing'
| 'cloud'
| 'cloudPartial'
| 'cloudProduct'
| 'cluster'
| 'coinbase'
| 'coinbaseCardProduct'
| 'coinbaseOne'
| 'coinbaseOneCard'
| 'coinbaseOneLogo'
| 'coinbaseRewards'
| 'coinsCrypto'
| 'collapse'
| 'collectibles'
| 'collection'
| 'comment'
| 'commentPlus'
| 'commerceProduct'
| 'compass'
| 'complianceProduct'
| 'compose'
| 'computerChip'
| 'concierge'
| 'conciergeBell'
| 'config'
| 'continuous'
| 'convert'
| 'copy'
| 'corporation'
| 'creatorCoin'
| 'cricket'
| 'cross'
| 'crossTrade'
| 'crypto'
| 'cryptobasics'
| 'crystalBall'
| 'crystalBallInsight'
| 'currencies'
| 'custodyProduct'
| 'dashboard'
| 'dataMarketplaceProduct'
| 'dataStack'
| 'defi'
| 'delegateProduct'
| 'deposit'
| 'derivatives'
| 'derivativesProduct'
| 'derivativesProductNew'
| 'developerAPIProduct'
| 'developerPlatformProduct'
| 'dex'
| 'diagonalDownArrow'
| 'diagonalRightArrow'
| 'diagonalUpArrow'
| 'diamond'
| 'diamondIncentives'
| 'dinnerPlate'
| 'directDeposit'
| 'directDepositIcon'
| 'disabledPhone'
| 'discordLogo'
| 'distribution'
| 'document'
| 'documentation'
| 'dot'
| 'doubleChevronRight'
| 'downArrow'
| 'download'
| 'drag'
| 'drops'
| 'earn'
| 'earnProduct'
| 'earnRewards'
| 'earthquake'
| 'educationBook'
| 'educationPencil'
| 'email'
| 'endArrow'
| 'entertainment'
| 'error'
| 'ethereum'
| 'eventContracts'
| 'exchangeProduct'
| 'exclamationMark'
| 'expand'
| 'expandAddress'
| 'expandAll'
| 'externalLink'
| 'eye'
| 'faceScan'
| 'faces'
| 'factory'
| 'faucet'
| 'fib'
| 'filmStrip'
| 'filter'
| 'fingerprint'
| 'flame'
| 'folder'
| 'folderArrow'
| 'folderOpen'
| 'followAdd'
| 'following'
| 'football'
| 'fork'
| 'forwardArrow'
| 'fscsProtection'
| 'gab'
| 'games'
| 'gaming'
| 'gasFees'
| 'gasFeesAlt'
| 'gauge'
| 'gaugeEmpty'
| 'gaugeHigh'
| 'gaugeHighLow'
| 'gaugeHighMid'
| 'gaugeLow'
| 'gaugeLowHigh'
| 'gaugeLowMid'
| 'gaugeMedium'
| 'gavel'
| 'gear'
| 'generalCharacter'
| 'ghost'
| 'gif'
| 'giftBox'
| 'giftCard'
| 'gitHubLogo'
| 'globe'
| 'golf'
| 'googleLogo'
| 'greenEnergy'
| 'grid'
| 'group'
| 'hamburger'
| 'hammer'
| 'heart'
| 'helpCenterProduct'
| 'helpCenterQuestionMark'
| 'hiddenEye'
| 'hockey'
| 'home'
| 'horizontalLine'
| 'hospital'
| 'hospitalCross'
| 'hurricane'
| 'ideal'
| 'identityCard'
| 'image'
| 'info'
| 'initiator'
| 'instagramLogo'
| 'instantUnstakingClock'
| 'institute'
| 'institutionalProduct'
| 'interest'
| 'invisible'
| 'invoice'
| 'key'
| 'keyboard'
| 'laptop'
| 'leadChart'
| 'leadCoin'
| 'learningRewardsProduct'
| 'light'
| 'lightbulb'
| 'lightning'
| 'lightningBolt'
| 'lineChartCrypto'
| 'list'
| 'location'
| 'lock'
| 'login'
| 'logout'
| 'loop'
| 'magnifyingGlass'
| 'marketCap'
| 'medal'
| 'megaphone'
| 'menu'
| 'metaverse'
| 'microphone'
| 'microphoneCordless'
| 'microscope'
| 'mint'
| 'minus'
| 'mma'
| 'moneyCardCoin'
| 'moon'
| 'more'
| 'moreVertical'
| 'motorsport'
| 'music'
| 'musicArticles'
| 'needle'
| 'newsFeed'
| 'newsletter'
| 'nft'
| 'nftBuy'
| 'nftOffer'
| 'nftProduct'
| 'nftSale'
| 'noRocket'
| 'noWifi'
| 'nodeProduct'
| 'oil'
| 'options'
| 'orderBook'
| 'orderHistory'
| 'outline'
| 'pFPS'
| 'paperAirplane'
| 'paperclip'
| 'participate'
| 'participateProduct'
| 'passKey'
| 'passport'
| 'pause'
| 'pay'
| 'payProduct'
| 'paymentCard'
| 'payments'
| 'payouts'
| 'paypal'
| 'pencil'
| 'peopleGroup'
| 'peopleStar'
| 'percentage'
| 'perpetualSwap'
| 'phone'
| 'pieChartData'
| 'pillBottle'
| 'pillCapsule'
| 'pin'
| 'plane'
| 'planet'
| 'play'
| 'playbutton'
| 'plusMinus'
| 'podiumStar'
| 'politicsBuilding'
| 'politicsCandidate'
| 'politicsFlag'
| 'politicsGavel'
| 'politicsPodium'
| 'politicsStar'
| 'powerTool'
| 'priceAlerts'
| 'priceAlertsCheck'
| 'primePoduct'
| 'privateClientProduct'
| 'proProduct'
| 'profile'
| 'protection'
| 'pulse'
| 'pyramid'
| 'qrCode'
| 'qrCodeAlt'
| 'queryTransact'
| 'questionMark'
| 'quotation'
| 'rain'
| 'ratingsCheck'
| 'ratingsChecks'
| 'ratingsStar'
| 'reCenter'
| 'rectangle'
| 'recurring'
| 'refresh'
| 'regulated'
| 'regulatedFutures'
| 'report'
| 'rewardsProduct'
| 'ribbon'
| 'robot'
| 'rocket'
| 'rocketShip'
| 'rollingSpot'
| 'rosettaProduct'
| 'rottenTomato'
| 'royalty'
| 'safe'
| 'save'
| 'savingsBank'
| 'scanQrCode'
| 'scienceAtom'
| 'scienceBeaker'
| 'scienceMoon'
| 'search'
| 'securityKey'
| 'securityShield'
| 'seen'
| 'sendReceive'
| 'setPinCode'
| 'settings'
| 'share'
| 'shield'
| 'shieldOutline'
| 'shoe'
| 'shoppingCart'
| 'signinProduct'
| 'singleCoin'
| 'singleNote'
| 'singlecloud'
| 'smartContract'
| 'snow'
| 'soccer'
| 'socialChat'
| 'socialReshare'
| 'socialShare'
| 'sofort'
| 'sortDoubleArrow'
| 'sortDown'
| 'sortDownCenter'
| 'sortUp'
| 'sortUpCenter'
| 'soundOff'
| 'soundOn'
| 'sparkle'
| 'speaker'
| 'speechBubble'
| 'stableCoin'
| 'stablecoinStack'
| 'staggeredList'
| 'stake'
| 'staking'
| 'star'
| 'starAward'
| 'starBubble'
| 'starTrophy'
| 'statusDot'
| 'step0'
| 'step1'
| 'step2'
| 'step3'
| 'step4'
| 'step5'
| 'step6'
| 'step7'
| 'step8'
| 'step9'
| 'strategy'
| 'sun'
| 'support'
| 'tag'
| 'taxes'
| 'taxesReceipt'
| 'telephone'
| 'tennis'
| 'test'
| 'thermometer'
| 'thumbsDown'
| 'thumbsDownOutline'
| 'thumbsUp'
| 'thumbsUpOutline'
| 'tokenLaunchCoin'
| 'tokenLaunchRocket'
| 'tokenSales'
| 'tornado'
| 'trading'
| 'transactions'
| 'trashCan'
| 'trophy'
| 'trophyCup'
| 'tshirt'
| 'tv'
| 'tvStand'
| 'twitterLogo'
| 'ultility'
| 'umbrella'
| 'undo'
| 'unfollowPeople'
| 'unknown'
| 'unlock'
| 'upArrow'
| 'upload'
| 'venturesProduct'
| 'verifiedBadge'
| 'verifiedPools'
| 'verticalLine'
| 'virus'
| 'visible'
| 'waasProduct'
| 'wallet'
| 'walletLogo'
| 'walletProduct'
| 'warning'
| 'webhooks'
| 'wellness'
| 'wifi'
| 'wind'
| 'wireTransfer'
| 'withdraw'
| 'wrapToken'
| 'xLogo'`,elements:[{name:"literal",value:"'account'"},{name:"literal",value:"'activity'"},{name:"literal",value:"'add'"},{name:"literal",value:"'addPeople'"},{name:"literal",value:"'advancedMarketSelector'"},{name:"literal",value:"'advancedTradeProduct'"},{name:"literal",value:"'affiliates'"},{name:"literal",value:"'airdrop'"},{name:"literal",value:"'airdropAlt'"},{name:"literal",value:"'airdropCoins'"},{name:"literal",value:"'airdropParachute'"},{name:"literal",value:"'alien'"},{name:"literal",value:"'allTimeHigh'"},{name:"literal",value:"'allocation'"},{name:"literal",value:"'annotation'"},{name:"literal",value:"'api'"},{name:"literal",value:"'apiPlug'"},{name:"literal",value:"'apothecary'"},{name:"literal",value:"'appSwitcher'"},{name:"literal",value:"'apple'"},{name:"literal",value:"'appleLogo'"},{name:"literal",value:"'application'"},{name:"literal",value:"'arrowDown'"},{name:"literal",value:"'arrowLeft'"},{name:"literal",value:"'arrowRight'"},{name:"literal",value:"'arrowUp'"},{name:"literal",value:"'arrowsHorizontal'"},{name:"literal",value:"'arrowsUpDown'"},{name:"literal",value:"'arrowsVertical'"},{name:"literal",value:"'artwork'"},{name:"literal",value:"'assetHubProduct'"},{name:"literal",value:"'assetManagementProduct'"},{name:"literal",value:"'astronautHelmet'"},{name:"literal",value:"'atSign'"},{name:"literal",value:"'atomScience'"},{name:"literal",value:"'auto'"},{name:"literal",value:"'autoCar'"},{name:"literal",value:"'avatar'"},{name:"literal",value:"'average'"},{name:"literal",value:"'backArrow'"},{name:"literal",value:"'ballot'"},{name:"literal",value:"'ballotbox'"},{name:"literal",value:"'bandage'"},{name:"literal",value:"'bank'"},{name:"literal",value:"'barChartSimple'"},{name:"literal",value:"'barChartWindow'"},{name:"literal",value:"'base'"},{name:"literal",value:"'baseApps'"},{name:"literal",value:"'baseFeed'"},{name:"literal",value:"'baseNotification'"},{name:"literal",value:"'baseQuickBuy'"},{name:"literal",value:"'baseSquare'"},{name:"literal",value:"'baseTransact'"},{name:"literal",value:"'baseVerification'"},{name:"literal",value:"'baseWallet'"},{name:"literal",value:"'baseball'"},{name:"literal",value:"'basketball'"},{name:"literal",value:"'beaker'"},{name:"literal",value:"'beginningArrow'"},{name:"literal",value:"'bell'"},{name:"literal",value:"'bellCheck'"},{name:"literal",value:"'bellPlus'"},{name:"literal",value:"'birthcertificate'"},{name:"literal",value:"'block'"},{name:"literal",value:"'blockchain'"},{name:"literal",value:"'blog'"},{name:"literal",value:"'book'"},{name:"literal",value:"'bookmark'"},{name:"literal",value:"'borrowProduct'"},{name:"literal",value:"'boxing'"},{name:"literal",value:"'bridging'"},{name:"literal",value:"'briefcase'"},{name:"literal",value:"'briefcaseAlt'"},{name:"literal",value:"'browser'"},{name:"literal",value:"'bug'"},{name:"literal",value:"'building'"},{name:"literal",value:"'calculator'"},{name:"literal",value:"'calendar'"},{name:"literal",value:"'calendarBlank'"},{name:"literal",value:"'calendarDates'"},{name:"literal",value:"'calendarEmpty'"},{name:"literal",value:"'calendarHeart'"},{name:"literal",value:"'calendarMoney'"},{name:"literal",value:"'calendarStar'"},{name:"literal",value:"'camera'"},{name:"literal",value:"'candlesticks'"},{name:"literal",value:"'car'"},{name:"literal",value:"'card'"},{name:"literal",value:"'caret'"},{name:"literal",value:"'caretDown'"},{name:"literal",value:"'caretLeft'"},{name:"literal",value:"'caretRight'"},{name:"literal",value:"'caretUp'"},{name:"literal",value:"'cash'"},{name:"literal",value:"'cashAustralianDollar'"},{name:"literal",value:"'cashBrazilianReal'"},{name:"literal",value:"'cashBrazillianReal'"},{name:"literal",value:"'cashCanadianDollar'"},{name:"literal",value:"'cashCoins'"},{name:"literal",value:"'cashEUR'"},{name:"literal",value:"'cashGBP'"},{name:"literal",value:"'cashIndonesianRupiah'"},{name:"literal",value:"'cashJPY'"},{name:"literal",value:"'cashPhilippinePeso'"},{name:"literal",value:"'cashPolishZloty'"},{name:"literal",value:"'cashRupee'"},{name:"literal",value:"'cashSingaporeDollar'"},{name:"literal",value:"'cashSwissFranc'"},{name:"literal",value:"'cashThaiBaht'"},{name:"literal",value:"'cashTurkishLira'"},{name:"literal",value:"'cashUSD'"},{name:"literal",value:"'cashUaeDirham'"},{name:"literal",value:"'cashVietnameseDong'"},{name:"literal",value:"'chainLink'"},{name:"literal",value:"'chartBar'"},{name:"literal",value:"'chartCandles'"},{name:"literal",value:"'chartLine'"},{name:"literal",value:"'chartPie'"},{name:"literal",value:"'chartPieCircle'"},{name:"literal",value:"'chartVolume'"},{name:"literal",value:"'chatBotAgent'"},{name:"literal",value:"'chatBubble'"},{name:"literal",value:"'chatRequests'"},{name:"literal",value:"'checkboxChecked'"},{name:"literal",value:"'checkboxEmpty'"},{name:"literal",value:"'checkmark'"},{name:"literal",value:"'chess'"},{name:"literal",value:"'circleCheckmark'"},{name:"literal",value:"'circleCross'"},{name:"literal",value:"'circulatingSupply'"},{name:"literal",value:"'city'"},{name:"literal",value:"'clipboard'"},{name:"literal",value:"'clock'"},{name:"literal",value:"'clockOutline'"},{name:"literal",value:"'close'"},{name:"literal",value:"'closeCaption'"},{name:"literal",value:"'clothing'"},{name:"literal",value:"'cloud'"},{name:"literal",value:"'cloudPartial'"},{name:"literal",value:"'cloudProduct'"},{name:"literal",value:"'cluster'"},{name:"literal",value:"'coinbase'"},{name:"literal",value:"'coinbaseCardProduct'"},{name:"literal",value:"'coinbaseOne'"},{name:"literal",value:"'coinbaseOneCard'"},{name:"literal",value:"'coinbaseOneLogo'"},{name:"literal",value:"'coinbaseRewards'"},{name:"literal",value:"'coinsCrypto'"},{name:"literal",value:"'collapse'"},{name:"literal",value:"'collectibles'"},{name:"literal",value:"'collection'"},{name:"literal",value:"'comment'"},{name:"literal",value:"'commentPlus'"},{name:"literal",value:"'commerceProduct'"},{name:"literal",value:"'compass'"},{name:"literal",value:"'complianceProduct'"},{name:"literal",value:"'compose'"},{name:"literal",value:"'computerChip'"},{name:"literal",value:"'concierge'"},{name:"literal",value:"'conciergeBell'"},{name:"literal",value:"'config'"},{name:"literal",value:"'continuous'"},{name:"literal",value:"'convert'"},{name:"literal",value:"'copy'"},{name:"literal",value:"'corporation'"},{name:"literal",value:"'creatorCoin'"},{name:"literal",value:"'cricket'"},{name:"literal",value:"'cross'"},{name:"literal",value:"'crossTrade'"},{name:"literal",value:"'crypto'"},{name:"literal",value:"'cryptobasics'"},{name:"literal",value:"'crystalBall'"},{name:"literal",value:"'crystalBallInsight'"},{name:"literal",value:"'currencies'"},{name:"literal",value:"'custodyProduct'"},{name:"literal",value:"'dashboard'"},{name:"literal",value:"'dataMarketplaceProduct'"},{name:"literal",value:"'dataStack'"},{name:"literal",value:"'defi'"},{name:"literal",value:"'delegateProduct'"},{name:"literal",value:"'deposit'"},{name:"literal",value:"'derivatives'"},{name:"literal",value:"'derivativesProduct'"},{name:"literal",value:"'derivativesProductNew'"},{name:"literal",value:"'developerAPIProduct'"},{name:"literal",value:"'developerPlatformProduct'"},{name:"literal",value:"'dex'"},{name:"literal",value:"'diagonalDownArrow'"},{name:"literal",value:"'diagonalRightArrow'"},{name:"literal",value:"'diagonalUpArrow'"},{name:"literal",value:"'diamond'"},{name:"literal",value:"'diamondIncentives'"},{name:"literal",value:"'dinnerPlate'"},{name:"literal",value:"'directDeposit'"},{name:"literal",value:"'directDepositIcon'"},{name:"literal",value:"'disabledPhone'"},{name:"literal",value:"'discordLogo'"},{name:"literal",value:"'distribution'"},{name:"literal",value:"'document'"},{name:"literal",value:"'documentation'"},{name:"literal",value:"'dot'"},{name:"literal",value:"'doubleChevronRight'"},{name:"literal",value:"'downArrow'"},{name:"literal",value:"'download'"},{name:"literal",value:"'drag'"},{name:"literal",value:"'drops'"},{name:"literal",value:"'earn'"},{name:"literal",value:"'earnProduct'"},{name:"literal",value:"'earnRewards'"},{name:"literal",value:"'earthquake'"},{name:"literal",value:"'educationBook'"},{name:"literal",value:"'educationPencil'"},{name:"literal",value:"'email'"},{name:"literal",value:"'endArrow'"},{name:"literal",value:"'entertainment'"},{name:"literal",value:"'error'"},{name:"literal",value:"'ethereum'"},{name:"literal",value:"'eventContracts'"},{name:"literal",value:"'exchangeProduct'"},{name:"literal",value:"'exclamationMark'"},{name:"literal",value:"'expand'"},{name:"literal",value:"'expandAddress'"},{name:"literal",value:"'expandAll'"},{name:"literal",value:"'externalLink'"},{name:"literal",value:"'eye'"},{name:"literal",value:"'faceScan'"},{name:"literal",value:"'faces'"},{name:"literal",value:"'factory'"},{name:"literal",value:"'faucet'"},{name:"literal",value:"'fib'"},{name:"literal",value:"'filmStrip'"},{name:"literal",value:"'filter'"},{name:"literal",value:"'fingerprint'"},{name:"literal",value:"'flame'"},{name:"literal",value:"'folder'"},{name:"literal",value:"'folderArrow'"},{name:"literal",value:"'folderOpen'"},{name:"literal",value:"'followAdd'"},{name:"literal",value:"'following'"},{name:"literal",value:"'football'"},{name:"literal",value:"'fork'"},{name:"literal",value:"'forwardArrow'"},{name:"literal",value:"'fscsProtection'"},{name:"literal",value:"'gab'"},{name:"literal",value:"'games'"},{name:"literal",value:"'gaming'"},{name:"literal",value:"'gasFees'"},{name:"literal",value:"'gasFeesAlt'"},{name:"literal",value:"'gauge'"},{name:"literal",value:"'gaugeEmpty'"},{name:"literal",value:"'gaugeHigh'"},{name:"literal",value:"'gaugeHighLow'"},{name:"literal",value:"'gaugeHighMid'"},{name:"literal",value:"'gaugeLow'"},{name:"literal",value:"'gaugeLowHigh'"},{name:"literal",value:"'gaugeLowMid'"},{name:"literal",value:"'gaugeMedium'"},{name:"literal",value:"'gavel'"},{name:"literal",value:"'gear'"},{name:"literal",value:"'generalCharacter'"},{name:"literal",value:"'ghost'"},{name:"literal",value:"'gif'"},{name:"literal",value:"'giftBox'"},{name:"literal",value:"'giftCard'"},{name:"literal",value:"'gitHubLogo'"},{name:"literal",value:"'globe'"},{name:"literal",value:"'golf'"},{name:"literal",value:"'googleLogo'"},{name:"literal",value:"'greenEnergy'"},{name:"literal",value:"'grid'"},{name:"literal",value:"'group'"},{name:"literal",value:"'hamburger'"},{name:"literal",value:"'hammer'"},{name:"literal",value:"'heart'"},{name:"literal",value:"'helpCenterProduct'"},{name:"literal",value:"'helpCenterQuestionMark'"},{name:"literal",value:"'hiddenEye'"},{name:"literal",value:"'hockey'"},{name:"literal",value:"'home'"},{name:"literal",value:"'horizontalLine'"},{name:"literal",value:"'hospital'"},{name:"literal",value:"'hospitalCross'"},{name:"literal",value:"'hurricane'"},{name:"literal",value:"'ideal'"},{name:"literal",value:"'identityCard'"},{name:"literal",value:"'image'"},{name:"literal",value:"'info'"},{name:"literal",value:"'initiator'"},{name:"literal",value:"'instagramLogo'"},{name:"literal",value:"'instantUnstakingClock'"},{name:"literal",value:"'institute'"},{name:"literal",value:"'institutionalProduct'"},{name:"literal",value:"'interest'"},{name:"literal",value:"'invisible'"},{name:"literal",value:"'invoice'"},{name:"literal",value:"'key'"},{name:"literal",value:"'keyboard'"},{name:"literal",value:"'laptop'"},{name:"literal",value:"'leadChart'"},{name:"literal",value:"'leadCoin'"},{name:"literal",value:"'learningRewardsProduct'"},{name:"literal",value:"'light'"},{name:"literal",value:"'lightbulb'"},{name:"literal",value:"'lightning'"},{name:"literal",value:"'lightningBolt'"},{name:"literal",value:"'lineChartCrypto'"},{name:"literal",value:"'list'"},{name:"literal",value:"'location'"},{name:"literal",value:"'lock'"},{name:"literal",value:"'login'"},{name:"literal",value:"'logout'"},{name:"literal",value:"'loop'"},{name:"literal",value:"'magnifyingGlass'"},{name:"literal",value:"'marketCap'"},{name:"literal",value:"'medal'"},{name:"literal",value:"'megaphone'"},{name:"literal",value:"'menu'"},{name:"literal",value:"'metaverse'"},{name:"literal",value:"'microphone'"},{name:"literal",value:"'microphoneCordless'"},{name:"literal",value:"'microscope'"},{name:"literal",value:"'mint'"},{name:"literal",value:"'minus'"},{name:"literal",value:"'mma'"},{name:"literal",value:"'moneyCardCoin'"},{name:"literal",value:"'moon'"},{name:"literal",value:"'more'"},{name:"literal",value:"'moreVertical'"},{name:"literal",value:"'motorsport'"},{name:"literal",value:"'music'"},{name:"literal",value:"'musicArticles'"},{name:"literal",value:"'needle'"},{name:"literal",value:"'newsFeed'"},{name:"literal",value:"'newsletter'"},{name:"literal",value:"'nft'"},{name:"literal",value:"'nftBuy'"},{name:"literal",value:"'nftOffer'"},{name:"literal",value:"'nftProduct'"},{name:"literal",value:"'nftSale'"},{name:"literal",value:"'noRocket'"},{name:"literal",value:"'noWifi'"},{name:"literal",value:"'nodeProduct'"},{name:"literal",value:"'oil'"},{name:"literal",value:"'options'"},{name:"literal",value:"'orderBook'"},{name:"literal",value:"'orderHistory'"},{name:"literal",value:"'outline'"},{name:"literal",value:"'pFPS'"},{name:"literal",value:"'paperAirplane'"},{name:"literal",value:"'paperclip'"},{name:"literal",value:"'participate'"},{name:"literal",value:"'participateProduct'"},{name:"literal",value:"'passKey'"},{name:"literal",value:"'passport'"},{name:"literal",value:"'pause'"},{name:"literal",value:"'pay'"},{name:"literal",value:"'payProduct'"},{name:"literal",value:"'paymentCard'"},{name:"literal",value:"'payments'"},{name:"literal",value:"'payouts'"},{name:"literal",value:"'paypal'"},{name:"literal",value:"'pencil'"},{name:"literal",value:"'peopleGroup'"},{name:"literal",value:"'peopleStar'"},{name:"literal",value:"'percentage'"},{name:"literal",value:"'perpetualSwap'"},{name:"literal",value:"'phone'"},{name:"literal",value:"'pieChartData'"},{name:"literal",value:"'pillBottle'"},{name:"literal",value:"'pillCapsule'"},{name:"literal",value:"'pin'"},{name:"literal",value:"'plane'"},{name:"literal",value:"'planet'"},{name:"literal",value:"'play'"},{name:"literal",value:"'playbutton'"},{name:"literal",value:"'plusMinus'"},{name:"literal",value:"'podiumStar'"},{name:"literal",value:"'politicsBuilding'"},{name:"literal",value:"'politicsCandidate'"},{name:"literal",value:"'politicsFlag'"},{name:"literal",value:"'politicsGavel'"},{name:"literal",value:"'politicsPodium'"},{name:"literal",value:"'politicsStar'"},{name:"literal",value:"'powerTool'"},{name:"literal",value:"'priceAlerts'"},{name:"literal",value:"'priceAlertsCheck'"},{name:"literal",value:"'primePoduct'"},{name:"literal",value:"'privateClientProduct'"},{name:"literal",value:"'proProduct'"},{name:"literal",value:"'profile'"},{name:"literal",value:"'protection'"},{name:"literal",value:"'pulse'"},{name:"literal",value:"'pyramid'"},{name:"literal",value:"'qrCode'"},{name:"literal",value:"'qrCodeAlt'"},{name:"literal",value:"'queryTransact'"},{name:"literal",value:"'questionMark'"},{name:"literal",value:"'quotation'"},{name:"literal",value:"'rain'"},{name:"literal",value:"'ratingsCheck'"},{name:"literal",value:"'ratingsChecks'"},{name:"literal",value:"'ratingsStar'"},{name:"literal",value:"'reCenter'"},{name:"literal",value:"'rectangle'"},{name:"literal",value:"'recurring'"},{name:"literal",value:"'refresh'"},{name:"literal",value:"'regulated'"},{name:"literal",value:"'regulatedFutures'"},{name:"literal",value:"'report'"},{name:"literal",value:"'rewardsProduct'"},{name:"literal",value:"'ribbon'"},{name:"literal",value:"'robot'"},{name:"literal",value:"'rocket'"},{name:"literal",value:"'rocketShip'"},{name:"literal",value:"'rollingSpot'"},{name:"literal",value:"'rosettaProduct'"},{name:"literal",value:"'rottenTomato'"},{name:"literal",value:"'royalty'"},{name:"literal",value:"'safe'"},{name:"literal",value:"'save'"},{name:"literal",value:"'savingsBank'"},{name:"literal",value:"'scanQrCode'"},{name:"literal",value:"'scienceAtom'"},{name:"literal",value:"'scienceBeaker'"},{name:"literal",value:"'scienceMoon'"},{name:"literal",value:"'search'"},{name:"literal",value:"'securityKey'"},{name:"literal",value:"'securityShield'"},{name:"literal",value:"'seen'"},{name:"literal",value:"'sendReceive'"},{name:"literal",value:"'setPinCode'"},{name:"literal",value:"'settings'"},{name:"literal",value:"'share'"},{name:"literal",value:"'shield'"},{name:"literal",value:"'shieldOutline'"},{name:"literal",value:"'shoe'"},{name:"literal",value:"'shoppingCart'"},{name:"literal",value:"'signinProduct'"},{name:"literal",value:"'singleCoin'"},{name:"literal",value:"'singleNote'"},{name:"literal",value:"'singlecloud'"},{name:"literal",value:"'smartContract'"},{name:"literal",value:"'snow'"},{name:"literal",value:"'soccer'"},{name:"literal",value:"'socialChat'"},{name:"literal",value:"'socialReshare'"},{name:"literal",value:"'socialShare'"},{name:"literal",value:"'sofort'"},{name:"literal",value:"'sortDoubleArrow'"},{name:"literal",value:"'sortDown'"},{name:"literal",value:"'sortDownCenter'"},{name:"literal",value:"'sortUp'"},{name:"literal",value:"'sortUpCenter'"},{name:"literal",value:"'soundOff'"},{name:"literal",value:"'soundOn'"},{name:"literal",value:"'sparkle'"},{name:"literal",value:"'speaker'"},{name:"literal",value:"'speechBubble'"},{name:"literal",value:"'stableCoin'"},{name:"literal",value:"'stablecoinStack'"},{name:"literal",value:"'staggeredList'"},{name:"literal",value:"'stake'"},{name:"literal",value:"'staking'"},{name:"literal",value:"'star'"},{name:"literal",value:"'starAward'"},{name:"literal",value:"'starBubble'"},{name:"literal",value:"'starTrophy'"},{name:"literal",value:"'statusDot'"},{name:"literal",value:"'step0'"},{name:"literal",value:"'step1'"},{name:"literal",value:"'step2'"},{name:"literal",value:"'step3'"},{name:"literal",value:"'step4'"},{name:"literal",value:"'step5'"},{name:"literal",value:"'step6'"},{name:"literal",value:"'step7'"},{name:"literal",value:"'step8'"},{name:"literal",value:"'step9'"},{name:"literal",value:"'strategy'"},{name:"literal",value:"'sun'"},{name:"literal",value:"'support'"},{name:"literal",value:"'tag'"},{name:"literal",value:"'taxes'"},{name:"literal",value:"'taxesReceipt'"},{name:"literal",value:"'telephone'"},{name:"literal",value:"'tennis'"},{name:"literal",value:"'test'"},{name:"literal",value:"'thermometer'"},{name:"literal",value:"'thumbsDown'"},{name:"literal",value:"'thumbsDownOutline'"},{name:"literal",value:"'thumbsUp'"},{name:"literal",value:"'thumbsUpOutline'"},{name:"literal",value:"'tokenLaunchCoin'"},{name:"literal",value:"'tokenLaunchRocket'"},{name:"literal",value:"'tokenSales'"},{name:"literal",value:"'tornado'"},{name:"literal",value:"'trading'"},{name:"literal",value:"'transactions'"},{name:"literal",value:"'trashCan'"},{name:"literal",value:"'trophy'"},{name:"literal",value:"'trophyCup'"},{name:"literal",value:"'tshirt'"},{name:"literal",value:"'tv'"},{name:"literal",value:"'tvStand'"},{name:"literal",value:"'twitterLogo'"},{name:"literal",value:"'ultility'"},{name:"literal",value:"'umbrella'"},{name:"literal",value:"'undo'"},{name:"literal",value:"'unfollowPeople'"},{name:"literal",value:"'unknown'"},{name:"literal",value:"'unlock'"},{name:"literal",value:"'upArrow'"},{name:"literal",value:"'upload'"},{name:"literal",value:"'venturesProduct'"},{name:"literal",value:"'verifiedBadge'"},{name:"literal",value:"'verifiedPools'"},{name:"literal",value:"'verticalLine'"},{name:"literal",value:"'virus'"},{name:"literal",value:"'visible'"},{name:"literal",value:"'waasProduct'"},{name:"literal",value:"'wallet'"},{name:"literal",value:"'walletLogo'"},{name:"literal",value:"'walletProduct'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'webhooks'"},{name:"literal",value:"'wellness'"},{name:"literal",value:"'wifi'"},{name:"literal",value:"'wind'"},{name:"literal",value:"'wireTransfer'"},{name:"literal",value:"'withdraw'"},{name:"literal",value:"'wrapToken'"},{name:"literal",value:"'xLogo'"}]},description:"Icon to use for the start autoplay button.",defaultValue:{value:"'play'",computed:!1}},stopIcon:{required:!1,tsType:{name:"union",raw:`| 'account'
| 'activity'
| 'add'
| 'addPeople'
| 'advancedMarketSelector'
| 'advancedTradeProduct'
| 'affiliates'
| 'airdrop'
| 'airdropAlt'
| 'airdropCoins'
| 'airdropParachute'
| 'alien'
| 'allTimeHigh'
| 'allocation'
| 'annotation'
| 'api'
| 'apiPlug'
| 'apothecary'
| 'appSwitcher'
| 'apple'
| 'appleLogo'
| 'application'
| 'arrowDown'
| 'arrowLeft'
| 'arrowRight'
| 'arrowUp'
| 'arrowsHorizontal'
| 'arrowsUpDown'
| 'arrowsVertical'
| 'artwork'
| 'assetHubProduct'
| 'assetManagementProduct'
| 'astronautHelmet'
| 'atSign'
| 'atomScience'
| 'auto'
| 'autoCar'
| 'avatar'
| 'average'
| 'backArrow'
| 'ballot'
| 'ballotbox'
| 'bandage'
| 'bank'
| 'barChartSimple'
| 'barChartWindow'
| 'base'
| 'baseApps'
| 'baseFeed'
| 'baseNotification'
| 'baseQuickBuy'
| 'baseSquare'
| 'baseTransact'
| 'baseVerification'
| 'baseWallet'
| 'baseball'
| 'basketball'
| 'beaker'
| 'beginningArrow'
| 'bell'
| 'bellCheck'
| 'bellPlus'
| 'birthcertificate'
| 'block'
| 'blockchain'
| 'blog'
| 'book'
| 'bookmark'
| 'borrowProduct'
| 'boxing'
| 'bridging'
| 'briefcase'
| 'briefcaseAlt'
| 'browser'
| 'bug'
| 'building'
| 'calculator'
| 'calendar'
| 'calendarBlank'
| 'calendarDates'
| 'calendarEmpty'
| 'calendarHeart'
| 'calendarMoney'
| 'calendarStar'
| 'camera'
| 'candlesticks'
| 'car'
| 'card'
| 'caret'
| 'caretDown'
| 'caretLeft'
| 'caretRight'
| 'caretUp'
| 'cash'
| 'cashAustralianDollar'
| 'cashBrazilianReal'
| 'cashBrazillianReal'
| 'cashCanadianDollar'
| 'cashCoins'
| 'cashEUR'
| 'cashGBP'
| 'cashIndonesianRupiah'
| 'cashJPY'
| 'cashPhilippinePeso'
| 'cashPolishZloty'
| 'cashRupee'
| 'cashSingaporeDollar'
| 'cashSwissFranc'
| 'cashThaiBaht'
| 'cashTurkishLira'
| 'cashUSD'
| 'cashUaeDirham'
| 'cashVietnameseDong'
| 'chainLink'
| 'chartBar'
| 'chartCandles'
| 'chartLine'
| 'chartPie'
| 'chartPieCircle'
| 'chartVolume'
| 'chatBotAgent'
| 'chatBubble'
| 'chatRequests'
| 'checkboxChecked'
| 'checkboxEmpty'
| 'checkmark'
| 'chess'
| 'circleCheckmark'
| 'circleCross'
| 'circulatingSupply'
| 'city'
| 'clipboard'
| 'clock'
| 'clockOutline'
| 'close'
| 'closeCaption'
| 'clothing'
| 'cloud'
| 'cloudPartial'
| 'cloudProduct'
| 'cluster'
| 'coinbase'
| 'coinbaseCardProduct'
| 'coinbaseOne'
| 'coinbaseOneCard'
| 'coinbaseOneLogo'
| 'coinbaseRewards'
| 'coinsCrypto'
| 'collapse'
| 'collectibles'
| 'collection'
| 'comment'
| 'commentPlus'
| 'commerceProduct'
| 'compass'
| 'complianceProduct'
| 'compose'
| 'computerChip'
| 'concierge'
| 'conciergeBell'
| 'config'
| 'continuous'
| 'convert'
| 'copy'
| 'corporation'
| 'creatorCoin'
| 'cricket'
| 'cross'
| 'crossTrade'
| 'crypto'
| 'cryptobasics'
| 'crystalBall'
| 'crystalBallInsight'
| 'currencies'
| 'custodyProduct'
| 'dashboard'
| 'dataMarketplaceProduct'
| 'dataStack'
| 'defi'
| 'delegateProduct'
| 'deposit'
| 'derivatives'
| 'derivativesProduct'
| 'derivativesProductNew'
| 'developerAPIProduct'
| 'developerPlatformProduct'
| 'dex'
| 'diagonalDownArrow'
| 'diagonalRightArrow'
| 'diagonalUpArrow'
| 'diamond'
| 'diamondIncentives'
| 'dinnerPlate'
| 'directDeposit'
| 'directDepositIcon'
| 'disabledPhone'
| 'discordLogo'
| 'distribution'
| 'document'
| 'documentation'
| 'dot'
| 'doubleChevronRight'
| 'downArrow'
| 'download'
| 'drag'
| 'drops'
| 'earn'
| 'earnProduct'
| 'earnRewards'
| 'earthquake'
| 'educationBook'
| 'educationPencil'
| 'email'
| 'endArrow'
| 'entertainment'
| 'error'
| 'ethereum'
| 'eventContracts'
| 'exchangeProduct'
| 'exclamationMark'
| 'expand'
| 'expandAddress'
| 'expandAll'
| 'externalLink'
| 'eye'
| 'faceScan'
| 'faces'
| 'factory'
| 'faucet'
| 'fib'
| 'filmStrip'
| 'filter'
| 'fingerprint'
| 'flame'
| 'folder'
| 'folderArrow'
| 'folderOpen'
| 'followAdd'
| 'following'
| 'football'
| 'fork'
| 'forwardArrow'
| 'fscsProtection'
| 'gab'
| 'games'
| 'gaming'
| 'gasFees'
| 'gasFeesAlt'
| 'gauge'
| 'gaugeEmpty'
| 'gaugeHigh'
| 'gaugeHighLow'
| 'gaugeHighMid'
| 'gaugeLow'
| 'gaugeLowHigh'
| 'gaugeLowMid'
| 'gaugeMedium'
| 'gavel'
| 'gear'
| 'generalCharacter'
| 'ghost'
| 'gif'
| 'giftBox'
| 'giftCard'
| 'gitHubLogo'
| 'globe'
| 'golf'
| 'googleLogo'
| 'greenEnergy'
| 'grid'
| 'group'
| 'hamburger'
| 'hammer'
| 'heart'
| 'helpCenterProduct'
| 'helpCenterQuestionMark'
| 'hiddenEye'
| 'hockey'
| 'home'
| 'horizontalLine'
| 'hospital'
| 'hospitalCross'
| 'hurricane'
| 'ideal'
| 'identityCard'
| 'image'
| 'info'
| 'initiator'
| 'instagramLogo'
| 'instantUnstakingClock'
| 'institute'
| 'institutionalProduct'
| 'interest'
| 'invisible'
| 'invoice'
| 'key'
| 'keyboard'
| 'laptop'
| 'leadChart'
| 'leadCoin'
| 'learningRewardsProduct'
| 'light'
| 'lightbulb'
| 'lightning'
| 'lightningBolt'
| 'lineChartCrypto'
| 'list'
| 'location'
| 'lock'
| 'login'
| 'logout'
| 'loop'
| 'magnifyingGlass'
| 'marketCap'
| 'medal'
| 'megaphone'
| 'menu'
| 'metaverse'
| 'microphone'
| 'microphoneCordless'
| 'microscope'
| 'mint'
| 'minus'
| 'mma'
| 'moneyCardCoin'
| 'moon'
| 'more'
| 'moreVertical'
| 'motorsport'
| 'music'
| 'musicArticles'
| 'needle'
| 'newsFeed'
| 'newsletter'
| 'nft'
| 'nftBuy'
| 'nftOffer'
| 'nftProduct'
| 'nftSale'
| 'noRocket'
| 'noWifi'
| 'nodeProduct'
| 'oil'
| 'options'
| 'orderBook'
| 'orderHistory'
| 'outline'
| 'pFPS'
| 'paperAirplane'
| 'paperclip'
| 'participate'
| 'participateProduct'
| 'passKey'
| 'passport'
| 'pause'
| 'pay'
| 'payProduct'
| 'paymentCard'
| 'payments'
| 'payouts'
| 'paypal'
| 'pencil'
| 'peopleGroup'
| 'peopleStar'
| 'percentage'
| 'perpetualSwap'
| 'phone'
| 'pieChartData'
| 'pillBottle'
| 'pillCapsule'
| 'pin'
| 'plane'
| 'planet'
| 'play'
| 'playbutton'
| 'plusMinus'
| 'podiumStar'
| 'politicsBuilding'
| 'politicsCandidate'
| 'politicsFlag'
| 'politicsGavel'
| 'politicsPodium'
| 'politicsStar'
| 'powerTool'
| 'priceAlerts'
| 'priceAlertsCheck'
| 'primePoduct'
| 'privateClientProduct'
| 'proProduct'
| 'profile'
| 'protection'
| 'pulse'
| 'pyramid'
| 'qrCode'
| 'qrCodeAlt'
| 'queryTransact'
| 'questionMark'
| 'quotation'
| 'rain'
| 'ratingsCheck'
| 'ratingsChecks'
| 'ratingsStar'
| 'reCenter'
| 'rectangle'
| 'recurring'
| 'refresh'
| 'regulated'
| 'regulatedFutures'
| 'report'
| 'rewardsProduct'
| 'ribbon'
| 'robot'
| 'rocket'
| 'rocketShip'
| 'rollingSpot'
| 'rosettaProduct'
| 'rottenTomato'
| 'royalty'
| 'safe'
| 'save'
| 'savingsBank'
| 'scanQrCode'
| 'scienceAtom'
| 'scienceBeaker'
| 'scienceMoon'
| 'search'
| 'securityKey'
| 'securityShield'
| 'seen'
| 'sendReceive'
| 'setPinCode'
| 'settings'
| 'share'
| 'shield'
| 'shieldOutline'
| 'shoe'
| 'shoppingCart'
| 'signinProduct'
| 'singleCoin'
| 'singleNote'
| 'singlecloud'
| 'smartContract'
| 'snow'
| 'soccer'
| 'socialChat'
| 'socialReshare'
| 'socialShare'
| 'sofort'
| 'sortDoubleArrow'
| 'sortDown'
| 'sortDownCenter'
| 'sortUp'
| 'sortUpCenter'
| 'soundOff'
| 'soundOn'
| 'sparkle'
| 'speaker'
| 'speechBubble'
| 'stableCoin'
| 'stablecoinStack'
| 'staggeredList'
| 'stake'
| 'staking'
| 'star'
| 'starAward'
| 'starBubble'
| 'starTrophy'
| 'statusDot'
| 'step0'
| 'step1'
| 'step2'
| 'step3'
| 'step4'
| 'step5'
| 'step6'
| 'step7'
| 'step8'
| 'step9'
| 'strategy'
| 'sun'
| 'support'
| 'tag'
| 'taxes'
| 'taxesReceipt'
| 'telephone'
| 'tennis'
| 'test'
| 'thermometer'
| 'thumbsDown'
| 'thumbsDownOutline'
| 'thumbsUp'
| 'thumbsUpOutline'
| 'tokenLaunchCoin'
| 'tokenLaunchRocket'
| 'tokenSales'
| 'tornado'
| 'trading'
| 'transactions'
| 'trashCan'
| 'trophy'
| 'trophyCup'
| 'tshirt'
| 'tv'
| 'tvStand'
| 'twitterLogo'
| 'ultility'
| 'umbrella'
| 'undo'
| 'unfollowPeople'
| 'unknown'
| 'unlock'
| 'upArrow'
| 'upload'
| 'venturesProduct'
| 'verifiedBadge'
| 'verifiedPools'
| 'verticalLine'
| 'virus'
| 'visible'
| 'waasProduct'
| 'wallet'
| 'walletLogo'
| 'walletProduct'
| 'warning'
| 'webhooks'
| 'wellness'
| 'wifi'
| 'wind'
| 'wireTransfer'
| 'withdraw'
| 'wrapToken'
| 'xLogo'`,elements:[{name:"literal",value:"'account'"},{name:"literal",value:"'activity'"},{name:"literal",value:"'add'"},{name:"literal",value:"'addPeople'"},{name:"literal",value:"'advancedMarketSelector'"},{name:"literal",value:"'advancedTradeProduct'"},{name:"literal",value:"'affiliates'"},{name:"literal",value:"'airdrop'"},{name:"literal",value:"'airdropAlt'"},{name:"literal",value:"'airdropCoins'"},{name:"literal",value:"'airdropParachute'"},{name:"literal",value:"'alien'"},{name:"literal",value:"'allTimeHigh'"},{name:"literal",value:"'allocation'"},{name:"literal",value:"'annotation'"},{name:"literal",value:"'api'"},{name:"literal",value:"'apiPlug'"},{name:"literal",value:"'apothecary'"},{name:"literal",value:"'appSwitcher'"},{name:"literal",value:"'apple'"},{name:"literal",value:"'appleLogo'"},{name:"literal",value:"'application'"},{name:"literal",value:"'arrowDown'"},{name:"literal",value:"'arrowLeft'"},{name:"literal",value:"'arrowRight'"},{name:"literal",value:"'arrowUp'"},{name:"literal",value:"'arrowsHorizontal'"},{name:"literal",value:"'arrowsUpDown'"},{name:"literal",value:"'arrowsVertical'"},{name:"literal",value:"'artwork'"},{name:"literal",value:"'assetHubProduct'"},{name:"literal",value:"'assetManagementProduct'"},{name:"literal",value:"'astronautHelmet'"},{name:"literal",value:"'atSign'"},{name:"literal",value:"'atomScience'"},{name:"literal",value:"'auto'"},{name:"literal",value:"'autoCar'"},{name:"literal",value:"'avatar'"},{name:"literal",value:"'average'"},{name:"literal",value:"'backArrow'"},{name:"literal",value:"'ballot'"},{name:"literal",value:"'ballotbox'"},{name:"literal",value:"'bandage'"},{name:"literal",value:"'bank'"},{name:"literal",value:"'barChartSimple'"},{name:"literal",value:"'barChartWindow'"},{name:"literal",value:"'base'"},{name:"literal",value:"'baseApps'"},{name:"literal",value:"'baseFeed'"},{name:"literal",value:"'baseNotification'"},{name:"literal",value:"'baseQuickBuy'"},{name:"literal",value:"'baseSquare'"},{name:"literal",value:"'baseTransact'"},{name:"literal",value:"'baseVerification'"},{name:"literal",value:"'baseWallet'"},{name:"literal",value:"'baseball'"},{name:"literal",value:"'basketball'"},{name:"literal",value:"'beaker'"},{name:"literal",value:"'beginningArrow'"},{name:"literal",value:"'bell'"},{name:"literal",value:"'bellCheck'"},{name:"literal",value:"'bellPlus'"},{name:"literal",value:"'birthcertificate'"},{name:"literal",value:"'block'"},{name:"literal",value:"'blockchain'"},{name:"literal",value:"'blog'"},{name:"literal",value:"'book'"},{name:"literal",value:"'bookmark'"},{name:"literal",value:"'borrowProduct'"},{name:"literal",value:"'boxing'"},{name:"literal",value:"'bridging'"},{name:"literal",value:"'briefcase'"},{name:"literal",value:"'briefcaseAlt'"},{name:"literal",value:"'browser'"},{name:"literal",value:"'bug'"},{name:"literal",value:"'building'"},{name:"literal",value:"'calculator'"},{name:"literal",value:"'calendar'"},{name:"literal",value:"'calendarBlank'"},{name:"literal",value:"'calendarDates'"},{name:"literal",value:"'calendarEmpty'"},{name:"literal",value:"'calendarHeart'"},{name:"literal",value:"'calendarMoney'"},{name:"literal",value:"'calendarStar'"},{name:"literal",value:"'camera'"},{name:"literal",value:"'candlesticks'"},{name:"literal",value:"'car'"},{name:"literal",value:"'card'"},{name:"literal",value:"'caret'"},{name:"literal",value:"'caretDown'"},{name:"literal",value:"'caretLeft'"},{name:"literal",value:"'caretRight'"},{name:"literal",value:"'caretUp'"},{name:"literal",value:"'cash'"},{name:"literal",value:"'cashAustralianDollar'"},{name:"literal",value:"'cashBrazilianReal'"},{name:"literal",value:"'cashBrazillianReal'"},{name:"literal",value:"'cashCanadianDollar'"},{name:"literal",value:"'cashCoins'"},{name:"literal",value:"'cashEUR'"},{name:"literal",value:"'cashGBP'"},{name:"literal",value:"'cashIndonesianRupiah'"},{name:"literal",value:"'cashJPY'"},{name:"literal",value:"'cashPhilippinePeso'"},{name:"literal",value:"'cashPolishZloty'"},{name:"literal",value:"'cashRupee'"},{name:"literal",value:"'cashSingaporeDollar'"},{name:"literal",value:"'cashSwissFranc'"},{name:"literal",value:"'cashThaiBaht'"},{name:"literal",value:"'cashTurkishLira'"},{name:"literal",value:"'cashUSD'"},{name:"literal",value:"'cashUaeDirham'"},{name:"literal",value:"'cashVietnameseDong'"},{name:"literal",value:"'chainLink'"},{name:"literal",value:"'chartBar'"},{name:"literal",value:"'chartCandles'"},{name:"literal",value:"'chartLine'"},{name:"literal",value:"'chartPie'"},{name:"literal",value:"'chartPieCircle'"},{name:"literal",value:"'chartVolume'"},{name:"literal",value:"'chatBotAgent'"},{name:"literal",value:"'chatBubble'"},{name:"literal",value:"'chatRequests'"},{name:"literal",value:"'checkboxChecked'"},{name:"literal",value:"'checkboxEmpty'"},{name:"literal",value:"'checkmark'"},{name:"literal",value:"'chess'"},{name:"literal",value:"'circleCheckmark'"},{name:"literal",value:"'circleCross'"},{name:"literal",value:"'circulatingSupply'"},{name:"literal",value:"'city'"},{name:"literal",value:"'clipboard'"},{name:"literal",value:"'clock'"},{name:"literal",value:"'clockOutline'"},{name:"literal",value:"'close'"},{name:"literal",value:"'closeCaption'"},{name:"literal",value:"'clothing'"},{name:"literal",value:"'cloud'"},{name:"literal",value:"'cloudPartial'"},{name:"literal",value:"'cloudProduct'"},{name:"literal",value:"'cluster'"},{name:"literal",value:"'coinbase'"},{name:"literal",value:"'coinbaseCardProduct'"},{name:"literal",value:"'coinbaseOne'"},{name:"literal",value:"'coinbaseOneCard'"},{name:"literal",value:"'coinbaseOneLogo'"},{name:"literal",value:"'coinbaseRewards'"},{name:"literal",value:"'coinsCrypto'"},{name:"literal",value:"'collapse'"},{name:"literal",value:"'collectibles'"},{name:"literal",value:"'collection'"},{name:"literal",value:"'comment'"},{name:"literal",value:"'commentPlus'"},{name:"literal",value:"'commerceProduct'"},{name:"literal",value:"'compass'"},{name:"literal",value:"'complianceProduct'"},{name:"literal",value:"'compose'"},{name:"literal",value:"'computerChip'"},{name:"literal",value:"'concierge'"},{name:"literal",value:"'conciergeBell'"},{name:"literal",value:"'config'"},{name:"literal",value:"'continuous'"},{name:"literal",value:"'convert'"},{name:"literal",value:"'copy'"},{name:"literal",value:"'corporation'"},{name:"literal",value:"'creatorCoin'"},{name:"literal",value:"'cricket'"},{name:"literal",value:"'cross'"},{name:"literal",value:"'crossTrade'"},{name:"literal",value:"'crypto'"},{name:"literal",value:"'cryptobasics'"},{name:"literal",value:"'crystalBall'"},{name:"literal",value:"'crystalBallInsight'"},{name:"literal",value:"'currencies'"},{name:"literal",value:"'custodyProduct'"},{name:"literal",value:"'dashboard'"},{name:"literal",value:"'dataMarketplaceProduct'"},{name:"literal",value:"'dataStack'"},{name:"literal",value:"'defi'"},{name:"literal",value:"'delegateProduct'"},{name:"literal",value:"'deposit'"},{name:"literal",value:"'derivatives'"},{name:"literal",value:"'derivativesProduct'"},{name:"literal",value:"'derivativesProductNew'"},{name:"literal",value:"'developerAPIProduct'"},{name:"literal",value:"'developerPlatformProduct'"},{name:"literal",value:"'dex'"},{name:"literal",value:"'diagonalDownArrow'"},{name:"literal",value:"'diagonalRightArrow'"},{name:"literal",value:"'diagonalUpArrow'"},{name:"literal",value:"'diamond'"},{name:"literal",value:"'diamondIncentives'"},{name:"literal",value:"'dinnerPlate'"},{name:"literal",value:"'directDeposit'"},{name:"literal",value:"'directDepositIcon'"},{name:"literal",value:"'disabledPhone'"},{name:"literal",value:"'discordLogo'"},{name:"literal",value:"'distribution'"},{name:"literal",value:"'document'"},{name:"literal",value:"'documentation'"},{name:"literal",value:"'dot'"},{name:"literal",value:"'doubleChevronRight'"},{name:"literal",value:"'downArrow'"},{name:"literal",value:"'download'"},{name:"literal",value:"'drag'"},{name:"literal",value:"'drops'"},{name:"literal",value:"'earn'"},{name:"literal",value:"'earnProduct'"},{name:"literal",value:"'earnRewards'"},{name:"literal",value:"'earthquake'"},{name:"literal",value:"'educationBook'"},{name:"literal",value:"'educationPencil'"},{name:"literal",value:"'email'"},{name:"literal",value:"'endArrow'"},{name:"literal",value:"'entertainment'"},{name:"literal",value:"'error'"},{name:"literal",value:"'ethereum'"},{name:"literal",value:"'eventContracts'"},{name:"literal",value:"'exchangeProduct'"},{name:"literal",value:"'exclamationMark'"},{name:"literal",value:"'expand'"},{name:"literal",value:"'expandAddress'"},{name:"literal",value:"'expandAll'"},{name:"literal",value:"'externalLink'"},{name:"literal",value:"'eye'"},{name:"literal",value:"'faceScan'"},{name:"literal",value:"'faces'"},{name:"literal",value:"'factory'"},{name:"literal",value:"'faucet'"},{name:"literal",value:"'fib'"},{name:"literal",value:"'filmStrip'"},{name:"literal",value:"'filter'"},{name:"literal",value:"'fingerprint'"},{name:"literal",value:"'flame'"},{name:"literal",value:"'folder'"},{name:"literal",value:"'folderArrow'"},{name:"literal",value:"'folderOpen'"},{name:"literal",value:"'followAdd'"},{name:"literal",value:"'following'"},{name:"literal",value:"'football'"},{name:"literal",value:"'fork'"},{name:"literal",value:"'forwardArrow'"},{name:"literal",value:"'fscsProtection'"},{name:"literal",value:"'gab'"},{name:"literal",value:"'games'"},{name:"literal",value:"'gaming'"},{name:"literal",value:"'gasFees'"},{name:"literal",value:"'gasFeesAlt'"},{name:"literal",value:"'gauge'"},{name:"literal",value:"'gaugeEmpty'"},{name:"literal",value:"'gaugeHigh'"},{name:"literal",value:"'gaugeHighLow'"},{name:"literal",value:"'gaugeHighMid'"},{name:"literal",value:"'gaugeLow'"},{name:"literal",value:"'gaugeLowHigh'"},{name:"literal",value:"'gaugeLowMid'"},{name:"literal",value:"'gaugeMedium'"},{name:"literal",value:"'gavel'"},{name:"literal",value:"'gear'"},{name:"literal",value:"'generalCharacter'"},{name:"literal",value:"'ghost'"},{name:"literal",value:"'gif'"},{name:"literal",value:"'giftBox'"},{name:"literal",value:"'giftCard'"},{name:"literal",value:"'gitHubLogo'"},{name:"literal",value:"'globe'"},{name:"literal",value:"'golf'"},{name:"literal",value:"'googleLogo'"},{name:"literal",value:"'greenEnergy'"},{name:"literal",value:"'grid'"},{name:"literal",value:"'group'"},{name:"literal",value:"'hamburger'"},{name:"literal",value:"'hammer'"},{name:"literal",value:"'heart'"},{name:"literal",value:"'helpCenterProduct'"},{name:"literal",value:"'helpCenterQuestionMark'"},{name:"literal",value:"'hiddenEye'"},{name:"literal",value:"'hockey'"},{name:"literal",value:"'home'"},{name:"literal",value:"'horizontalLine'"},{name:"literal",value:"'hospital'"},{name:"literal",value:"'hospitalCross'"},{name:"literal",value:"'hurricane'"},{name:"literal",value:"'ideal'"},{name:"literal",value:"'identityCard'"},{name:"literal",value:"'image'"},{name:"literal",value:"'info'"},{name:"literal",value:"'initiator'"},{name:"literal",value:"'instagramLogo'"},{name:"literal",value:"'instantUnstakingClock'"},{name:"literal",value:"'institute'"},{name:"literal",value:"'institutionalProduct'"},{name:"literal",value:"'interest'"},{name:"literal",value:"'invisible'"},{name:"literal",value:"'invoice'"},{name:"literal",value:"'key'"},{name:"literal",value:"'keyboard'"},{name:"literal",value:"'laptop'"},{name:"literal",value:"'leadChart'"},{name:"literal",value:"'leadCoin'"},{name:"literal",value:"'learningRewardsProduct'"},{name:"literal",value:"'light'"},{name:"literal",value:"'lightbulb'"},{name:"literal",value:"'lightning'"},{name:"literal",value:"'lightningBolt'"},{name:"literal",value:"'lineChartCrypto'"},{name:"literal",value:"'list'"},{name:"literal",value:"'location'"},{name:"literal",value:"'lock'"},{name:"literal",value:"'login'"},{name:"literal",value:"'logout'"},{name:"literal",value:"'loop'"},{name:"literal",value:"'magnifyingGlass'"},{name:"literal",value:"'marketCap'"},{name:"literal",value:"'medal'"},{name:"literal",value:"'megaphone'"},{name:"literal",value:"'menu'"},{name:"literal",value:"'metaverse'"},{name:"literal",value:"'microphone'"},{name:"literal",value:"'microphoneCordless'"},{name:"literal",value:"'microscope'"},{name:"literal",value:"'mint'"},{name:"literal",value:"'minus'"},{name:"literal",value:"'mma'"},{name:"literal",value:"'moneyCardCoin'"},{name:"literal",value:"'moon'"},{name:"literal",value:"'more'"},{name:"literal",value:"'moreVertical'"},{name:"literal",value:"'motorsport'"},{name:"literal",value:"'music'"},{name:"literal",value:"'musicArticles'"},{name:"literal",value:"'needle'"},{name:"literal",value:"'newsFeed'"},{name:"literal",value:"'newsletter'"},{name:"literal",value:"'nft'"},{name:"literal",value:"'nftBuy'"},{name:"literal",value:"'nftOffer'"},{name:"literal",value:"'nftProduct'"},{name:"literal",value:"'nftSale'"},{name:"literal",value:"'noRocket'"},{name:"literal",value:"'noWifi'"},{name:"literal",value:"'nodeProduct'"},{name:"literal",value:"'oil'"},{name:"literal",value:"'options'"},{name:"literal",value:"'orderBook'"},{name:"literal",value:"'orderHistory'"},{name:"literal",value:"'outline'"},{name:"literal",value:"'pFPS'"},{name:"literal",value:"'paperAirplane'"},{name:"literal",value:"'paperclip'"},{name:"literal",value:"'participate'"},{name:"literal",value:"'participateProduct'"},{name:"literal",value:"'passKey'"},{name:"literal",value:"'passport'"},{name:"literal",value:"'pause'"},{name:"literal",value:"'pay'"},{name:"literal",value:"'payProduct'"},{name:"literal",value:"'paymentCard'"},{name:"literal",value:"'payments'"},{name:"literal",value:"'payouts'"},{name:"literal",value:"'paypal'"},{name:"literal",value:"'pencil'"},{name:"literal",value:"'peopleGroup'"},{name:"literal",value:"'peopleStar'"},{name:"literal",value:"'percentage'"},{name:"literal",value:"'perpetualSwap'"},{name:"literal",value:"'phone'"},{name:"literal",value:"'pieChartData'"},{name:"literal",value:"'pillBottle'"},{name:"literal",value:"'pillCapsule'"},{name:"literal",value:"'pin'"},{name:"literal",value:"'plane'"},{name:"literal",value:"'planet'"},{name:"literal",value:"'play'"},{name:"literal",value:"'playbutton'"},{name:"literal",value:"'plusMinus'"},{name:"literal",value:"'podiumStar'"},{name:"literal",value:"'politicsBuilding'"},{name:"literal",value:"'politicsCandidate'"},{name:"literal",value:"'politicsFlag'"},{name:"literal",value:"'politicsGavel'"},{name:"literal",value:"'politicsPodium'"},{name:"literal",value:"'politicsStar'"},{name:"literal",value:"'powerTool'"},{name:"literal",value:"'priceAlerts'"},{name:"literal",value:"'priceAlertsCheck'"},{name:"literal",value:"'primePoduct'"},{name:"literal",value:"'privateClientProduct'"},{name:"literal",value:"'proProduct'"},{name:"literal",value:"'profile'"},{name:"literal",value:"'protection'"},{name:"literal",value:"'pulse'"},{name:"literal",value:"'pyramid'"},{name:"literal",value:"'qrCode'"},{name:"literal",value:"'qrCodeAlt'"},{name:"literal",value:"'queryTransact'"},{name:"literal",value:"'questionMark'"},{name:"literal",value:"'quotation'"},{name:"literal",value:"'rain'"},{name:"literal",value:"'ratingsCheck'"},{name:"literal",value:"'ratingsChecks'"},{name:"literal",value:"'ratingsStar'"},{name:"literal",value:"'reCenter'"},{name:"literal",value:"'rectangle'"},{name:"literal",value:"'recurring'"},{name:"literal",value:"'refresh'"},{name:"literal",value:"'regulated'"},{name:"literal",value:"'regulatedFutures'"},{name:"literal",value:"'report'"},{name:"literal",value:"'rewardsProduct'"},{name:"literal",value:"'ribbon'"},{name:"literal",value:"'robot'"},{name:"literal",value:"'rocket'"},{name:"literal",value:"'rocketShip'"},{name:"literal",value:"'rollingSpot'"},{name:"literal",value:"'rosettaProduct'"},{name:"literal",value:"'rottenTomato'"},{name:"literal",value:"'royalty'"},{name:"literal",value:"'safe'"},{name:"literal",value:"'save'"},{name:"literal",value:"'savingsBank'"},{name:"literal",value:"'scanQrCode'"},{name:"literal",value:"'scienceAtom'"},{name:"literal",value:"'scienceBeaker'"},{name:"literal",value:"'scienceMoon'"},{name:"literal",value:"'search'"},{name:"literal",value:"'securityKey'"},{name:"literal",value:"'securityShield'"},{name:"literal",value:"'seen'"},{name:"literal",value:"'sendReceive'"},{name:"literal",value:"'setPinCode'"},{name:"literal",value:"'settings'"},{name:"literal",value:"'share'"},{name:"literal",value:"'shield'"},{name:"literal",value:"'shieldOutline'"},{name:"literal",value:"'shoe'"},{name:"literal",value:"'shoppingCart'"},{name:"literal",value:"'signinProduct'"},{name:"literal",value:"'singleCoin'"},{name:"literal",value:"'singleNote'"},{name:"literal",value:"'singlecloud'"},{name:"literal",value:"'smartContract'"},{name:"literal",value:"'snow'"},{name:"literal",value:"'soccer'"},{name:"literal",value:"'socialChat'"},{name:"literal",value:"'socialReshare'"},{name:"literal",value:"'socialShare'"},{name:"literal",value:"'sofort'"},{name:"literal",value:"'sortDoubleArrow'"},{name:"literal",value:"'sortDown'"},{name:"literal",value:"'sortDownCenter'"},{name:"literal",value:"'sortUp'"},{name:"literal",value:"'sortUpCenter'"},{name:"literal",value:"'soundOff'"},{name:"literal",value:"'soundOn'"},{name:"literal",value:"'sparkle'"},{name:"literal",value:"'speaker'"},{name:"literal",value:"'speechBubble'"},{name:"literal",value:"'stableCoin'"},{name:"literal",value:"'stablecoinStack'"},{name:"literal",value:"'staggeredList'"},{name:"literal",value:"'stake'"},{name:"literal",value:"'staking'"},{name:"literal",value:"'star'"},{name:"literal",value:"'starAward'"},{name:"literal",value:"'starBubble'"},{name:"literal",value:"'starTrophy'"},{name:"literal",value:"'statusDot'"},{name:"literal",value:"'step0'"},{name:"literal",value:"'step1'"},{name:"literal",value:"'step2'"},{name:"literal",value:"'step3'"},{name:"literal",value:"'step4'"},{name:"literal",value:"'step5'"},{name:"literal",value:"'step6'"},{name:"literal",value:"'step7'"},{name:"literal",value:"'step8'"},{name:"literal",value:"'step9'"},{name:"literal",value:"'strategy'"},{name:"literal",value:"'sun'"},{name:"literal",value:"'support'"},{name:"literal",value:"'tag'"},{name:"literal",value:"'taxes'"},{name:"literal",value:"'taxesReceipt'"},{name:"literal",value:"'telephone'"},{name:"literal",value:"'tennis'"},{name:"literal",value:"'test'"},{name:"literal",value:"'thermometer'"},{name:"literal",value:"'thumbsDown'"},{name:"literal",value:"'thumbsDownOutline'"},{name:"literal",value:"'thumbsUp'"},{name:"literal",value:"'thumbsUpOutline'"},{name:"literal",value:"'tokenLaunchCoin'"},{name:"literal",value:"'tokenLaunchRocket'"},{name:"literal",value:"'tokenSales'"},{name:"literal",value:"'tornado'"},{name:"literal",value:"'trading'"},{name:"literal",value:"'transactions'"},{name:"literal",value:"'trashCan'"},{name:"literal",value:"'trophy'"},{name:"literal",value:"'trophyCup'"},{name:"literal",value:"'tshirt'"},{name:"literal",value:"'tv'"},{name:"literal",value:"'tvStand'"},{name:"literal",value:"'twitterLogo'"},{name:"literal",value:"'ultility'"},{name:"literal",value:"'umbrella'"},{name:"literal",value:"'undo'"},{name:"literal",value:"'unfollowPeople'"},{name:"literal",value:"'unknown'"},{name:"literal",value:"'unlock'"},{name:"literal",value:"'upArrow'"},{name:"literal",value:"'upload'"},{name:"literal",value:"'venturesProduct'"},{name:"literal",value:"'verifiedBadge'"},{name:"literal",value:"'verifiedPools'"},{name:"literal",value:"'verticalLine'"},{name:"literal",value:"'virus'"},{name:"literal",value:"'visible'"},{name:"literal",value:"'waasProduct'"},{name:"literal",value:"'wallet'"},{name:"literal",value:"'walletLogo'"},{name:"literal",value:"'walletProduct'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'webhooks'"},{name:"literal",value:"'wellness'"},{name:"literal",value:"'wifi'"},{name:"literal",value:"'wind'"},{name:"literal",value:"'wireTransfer'"},{name:"literal",value:"'withdraw'"},{name:"literal",value:"'wrapToken'"},{name:"literal",value:"'xLogo'"}]},description:"Icon to use for the stop autoplay button.",defaultValue:{value:"'pause'",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:`| 'primary'
| 'secondary'
| 'tertiary'
| 'positive'
| 'negative'
| 'foregroundMuted'`,elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"},{name:"literal",value:"'tertiary'"},{name:"literal",value:"'positive'"},{name:"literal",value:"'negative'"},{name:"literal",value:"'foregroundMuted'"}]},description:"Variant of the icon button.",defaultValue:{value:"'secondary'",computed:!1}},compact:{required:!1,tsType:{name:"boolean"},description:"Whether the icon button is compact."},hideUnlessFocused:{required:!1,tsType:{name:"boolean"},description:"Whether the navigation buttons should be hidden unless focused."},classNames:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /**
   * Custom class name for the root element.
   */
  root?: string;
  /**
   * Custom class name for the previous button.
   */
  previousButton?: string;
  /**
   * Custom class name for the next button.
   */
  nextButton?: string;
  /**
   * Custom class name for the autoplay button.
   */
  autoplayButton?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1},description:"Custom class name for the root element."},{key:"previousButton",value:{name:"string",required:!1},description:"Custom class name for the previous button."},{key:"nextButton",value:{name:"string",required:!1},description:"Custom class name for the next button."},{key:"autoplayButton",value:{name:"string",required:!1},description:"Custom class name for the autoplay button."}]}},description:"Custom class names for the component."},styles:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /**
   * Custom styles for the root element.
   */
  root?: React.CSSProperties;
  /**
   * Custom styles for the previous button.
   */
  previousButton?: React.CSSProperties;
  /**
   * Custom styles for the next button.
   */
  nextButton?: React.CSSProperties;
  /**
   * Custom styles for the autoplay button.
   */
  autoplayButton?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom styles for the root element."},{key:"previousButton",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom styles for the previous button."},{key:"nextButton",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom styles for the next button."},{key:"autoplayButton",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom styles for the autoplay button."}]}},description:"Custom styles for the component."},nextPageAccessibilityLabel:{defaultValue:{value:"'Next page'",computed:!1},required:!1},previousPageAccessibilityLabel:{defaultValue:{value:"'Previous page'",computed:!1},required:!1},startAutoplayAccessibilityLabel:{defaultValue:{value:"'Play Carousel'",computed:!1},required:!1},stopAutoplayAccessibilityLabel:{defaultValue:{value:"'Pause Carousel'",computed:!1},required:!1}}};const Da=Be(ge),Ba=24,Me=4,La={type:"spring",stiffness:900,damping:120,mass:4,clamp:!0},Oa="defaultPaginationCss-de0xwho",Re="pillCss-psdoj2m",We="dotCss-d1ltop6j",Ua=n.memo(function({isActive:t,...i}){return h.jsx(ge,{"aria-current":t?"true":void 0,background:t?"bgPrimary":"bgLine",borderColor:"transparent","data-active":t,...i})}),Ha=n.memo(function({isActive:t,className:i,...r}){const a=Sa(),{isPlaying:d,isEnabled:c,interval:u,getRemainingTime:m}=a,s=t&&c,[w,b]=n.useState({width:"0%",duration:0}),f=n.useRef(0);return n.useEffect(()=>{if(!s){b({width:"0%",duration:0}),f.current=0;return}const T=m(),v=1-T/u;d?(f.current=v,b({width:"100%",duration:T/1e3})):(b({width:`${v*100}%`,duration:0}),f.current=v)},[d,s,u,m]),h.jsx(Da,{animate:{width:t?Ba:Me,backgroundColor:t&&!s?"var(--color-bgPrimary)":"var(--color-bgLine)"},"aria-current":t?"true":void 0,borderColor:"transparent",borderWidth:0,className:J(We,i),"data-active":t,initial:!1,transition:La,...r,children:s&&h.jsx(Be.div,{animate:{width:w.width},initial:!1,style:{height:"100%",background:"var(--color-bgPrimary)",borderRadius:"var(--borderRadius-100)"},transition:{duration:w.duration,ease:"linear"}})})}),Ma=e=>`Go to page ${e+1}`,je=n.memo(function({totalPages:t,activePageIndex:i,onClickPage:r,paginationAccessibilityLabel:a=Ma,className:d,classNames:c,style:u,styles:m,testID:s="carousel-pagination",variant:w="pill"}){const b=w==="dot",f=n.useCallback(T=>typeof a=="function"?a(T):a,[a]);return h.jsx(ye,{className:J(Oa,d,c?.root),gap:.5,justifyContent:"center",style:{...u,...m?.root},children:t>0?Array.from({length:t},(T,v)=>b?h.jsx(Ha,{accessibilityLabel:f(v),className:c?.dot,isActive:v===i,onClick:()=>r?.(v),style:m?.dot,testID:`${s}-${v}`},v):h.jsx(Ua,{accessibilityLabel:f(v),className:J(Re,c?.dot),isActive:v===i,onClick:()=>r?.(v),style:m?.dot,testID:`${s}-${v}`},v)):h.jsx(ge,{disabled:!0,"aria-hidden":"true",background:"bgLine",borderColor:"transparent",className:J(b?We:Re,c?.dot),style:{opacity:0,width:b?Me:void 0,...m?.dot}})})});je.__docgenInfo={description:"",methods:[],displayName:"DefaultCarouselPagination",props:{totalPages:{required:!0,tsType:{name:"number"},description:"Total number of pages."},activePageIndex:{required:!0,tsType:{name:"number"},description:"Index of the active page."},onClickPage:{required:!1,tsType:{name:"signature",type:"function",raw:"(index: number) => void",signature:{arguments:[{type:{name:"number"},name:"index"}],return:{name:"void"}}},description:"Callback for when a page is clicked."},paginationAccessibilityLabel:{required:!1,tsType:{name:"union",raw:"string | ((pageIndex: number) => string)",elements:[{name:"string"},{name:"unknown"}]},description:"Accessibility label for the go to page button. You can optionally pass a function that will receive the pageIndex as an argument, and return an accessibility label string.",defaultValue:{value:"(pageIndex: number) => `Go to page ${pageIndex + 1}`",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'pill' | 'dot'",elements:[{name:"literal",value:"'pill'"},{name:"literal",value:"'dot'"}]},description:`Visual variant for the pagination indicators.
- 'pill': All indicators are pill-shaped (default)
- 'dot': Inactive indicators are small dots, active indicator expands to a pill
@default 'pill'
@note 'pill' variant is deprecated, use 'dot' instead`,defaultValue:{value:"'pill'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Custom class name for the root element."},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:"Custom styles for the component."},testID:{required:!1,tsType:{name:"string"},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`,defaultValue:{value:"'carousel-pagination'",computed:!1}},classNames:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /**
   * Custom class name for the root element.
   */
  root?: string;
  /**
   * Custom class name for the dot element.
   */
  dot?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1},description:"Custom class name for the root element."},{key:"dot",value:{name:"string",required:!1},description:"Custom class name for the dot element."}]}},description:"Custom class names for the component."},styles:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /**
   * Custom styles for the root element.
   */
  root?: React.CSSProperties;
  /**
   * Custom styles for the dot element.
   */
  dot?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom styles for the root element."},{key:"dot",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom styles for the dot element."}]}},description:"Custom styles for the component."}}};const Wa="defaultCarouselCss-dm2s0ol",ja="screenReaderOnlyCss-soiy5up",Va={type:"spring",stiffness:900,damping:120,mass:4},he=(e,t,i)=>{const r=t-e;return e+((i-e)%r+r)%r},ae=e=>{const t=Object.entries(e).filter(([a])=>!a.startsWith("clone-")).map(([,a])=>a);if(t.length===0)return[];const i=t.sort((a,d)=>a.x-d.x),r=i[0].x;return i.map(a=>({...a,x:a.x-r}))},za=(e,t)=>{let i=0,r=1/0;return t.forEach((a,d)=>{const c=Math.abs(e-a);c<r&&(r=c,i=d)}),i},Ie=(e,t,i)=>{const r=Math.floor(e/i);let a={offset:0,index:0,distance:1/0};for(const[d,c]of t.entries())for(const u of[r-1,r,r+1]){const m=u*i+c,s=Math.abs(e-m);s<a.distance&&(a={offset:m,index:d,distance:s})}return{offset:a.offset,index:a.index}},Ea=(e,t,i,r)=>{if(r){const f=[];for(let T=0;T<e.length;T++)f.push(e[T].x);return{totalPages:f.length,pageOffsets:f}}let a=e.length-1;const d=e[a],c=d.x+d.width;let u=a,m=d.x+t;for(;u>=0&&m>=c;)a=u,u--,u>=0&&(m=e[u].x+t);const s=[];for(let f=0;f<a;f++){const T=e[f],v=Math.min(T.x,i);s.push(v)}const w=e[a],b=Math.min(w.x,i);return s.push(b),{totalPages:s.length,pageOffsets:s}},Na=(e,t,i)=>{const r=[0];for(let a=0;a<e.length;a++){const d=e[a],c=r[r.length-1],u=c+t;if(d.x+d.width>u&&d.x!==c){const m=Math.min(d.x,i);r.push(m)}}return{totalPages:r.length,pageOffsets:r}},Fa=(e,t,i=.5)=>{if(e<0)return e*i;if(e>t){const r=e-t;return t+r*i}return e},De=(e,t)=>{let i=0,r=0;for(const a of e)if(i+=a.width,r++,i>=t)break;return Math.max(1,r)},Ga=(e,t,i)=>{const r=new Set,a=i,d=i+t;return Object.entries(e).forEach(([c,u])=>{const m=u.x,s=u.x+u.width;m<d&&s>a&&r.add(c)}),r},Qa=(e,t)=>{const i=e.closest("[data-carousel-item-id]");if(!i)return null;const r=i.dataset.carouselItemId;if(!r||r.startsWith("clone-"))return null;const a=t[r];return a?{itemId:r,itemRect:a}:null},$a=(e,t,i,r,a)=>{const d=r?(t%a+a)%a:t,c=d,u=d+i,m=e.x,s=e.x+e.width;return m>=c&&s<=u},Ya=(e,t,i)=>{const r=Array.from(e).filter(c=>!c.startsWith("clone-"));if(r.length===0||!i)return null;const a=r.sort((c,u)=>{const m=t[c],s=t[u];return(m?.x??0)-(s?.x??0)}),d=i.querySelector(`[data-carousel-item-id="${a[0]}"]`);return d?d.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'):null},_a=(e,t)=>{for(let i=t.length-1;i>=0;i--)if(t[i]<=e.x)return i;return 0},Ka=(e,t)=>`Page ${e+1} of ${t}`,Xa=n.memo(n.forwardRef(({children:e,title:t,hideNavigation:i,hidePagination:r,drag:a="snap",snapMode:d="page",NavigationComponent:c=He,PaginationComponent:u=je,className:m,classNames:s,style:w,styles:b,nextPageAccessibilityLabel:f,previousPageAccessibilityLabel:T,paginationAccessibilityLabel:v,startAutoplayAccessibilityLabel:G,stopAutoplayAccessibilityLabel:Q,pageChangeAccessibilityLabel:I=Ka,onChangePage:j,onDragStart:D,onDragEnd:Z,loop:M,autoplay:R,autoplayInterval:$=3e3,paginationVariant:L,...le},Ve)=>{const ze=fa(),W=ka(0),fe=ya(),[A,Ee]=n.useState(0),ie=n.useRef(null),[q,Ne]=n.useState(0),te=ca(),[y,ke]=n.useState({}),[re,we]=n.useState(new Set),Te=a!=="none";n.useEffect(()=>{const l=new window.ResizeObserver(()=>{const o={};Object.entries(te.refs).forEach(([p,g])=>{g&&(o[p]={x:g.offsetLeft,y:g.offsetTop,width:g.offsetWidth,height:g.offsetHeight})}),ke(o)});return Object.values(te.refs).forEach(o=>{o&&l.observe(o)}),(Object.keys(te.refs).length===0||Object.values(te.refs).every(o=>o===null))&&ke({}),()=>l.disconnect()},[te.refs,e]);const oe=n.useMemo(()=>{if(Object.keys(y).length===0)return 0;const l=ae(y),o=l[l.length-1];return o.x+o.width},[y]),Y=Math.max(0,oe-q),se=oe>0&&q>0,Ae=n.useMemo(()=>{if(Object.keys(y).length<2)return 0;const l=ae(y),o=l[0].x+l[0].width,p=l[1].x;return Math.max(0,p-o)},[y]),C=n.useMemo(()=>M&&se&&Y>0,[M,se,Y]),k=n.useMemo(()=>C?oe+Ae:0,[C,oe,Ae]),V=!!(C&&k>0),Fe=wa(W,l=>{if(!C||!k)return l;const o=l%k;return o>0?o-k:o}),ee=n.useCallback(l=>{Ee(o=>{const p=typeof l=="function"?l(o):l;return o!==p&&j?.(p),p})},[j]),O=n.useMemo(()=>{if(!C||Object.keys(y).length===0||q===0)return{forward:0,backward:0};const l=ae(y);return{forward:De(l,q),backward:De([...l].reverse(),q)}},[C,y,q]),z=n.useCallback(l=>{if(q===0){we(new Set);return}const o=V?(l%k+k)%k:l,p=Ga(y,q,o);if(V&&e){const g=ce.Children.toArray(e),H=ae(y),S=l,X=l+q,N=g.length-O.backward;for(let P=0;P<O.backward;P++){const F=N+P,ne=H[F];if(ne){const de=ne.x-k,na=de+ne.width;de<X&&na>S&&p.add(`clone-backward-${g[F].props.id}`)}}for(let P=0;P<O.forward;P++){const F=H[P];if(F){const ne=F.x+k,de=ne+F.width;ne<X&&de>S&&p.add(`clone-forward-${g[P].props.id}`)}}}we(p)},[q,V,k,y,e,O.backward,O.forward]);n.useEffect(()=>{const l=ie.current;if(!l)return;const o=new window.ResizeObserver(p=>{for(const g of p)Ne(g.contentRect.width),z(Math.abs(W.get()))});return o.observe(l),()=>o.unobserve(l)},[y,W,z]);const Ge=n.useMemo(()=>{if(!C||!k||!e||O.forward===0&&O.backward===0)return e;const l=ce.Children.toArray(e);if(l.length===0)return e;const o=[],p=ae(y);return l.slice(-O.backward).forEach((S,X)=>{const N=l.length-O.backward+X,P=p[N],F=`clone-backward-${S.props.id}`;o.push(h.jsx(ve,{"aria-hidden":!0,isClone:!0,id:F,style:{position:"absolute",left:(P?.x??0)-k,width:P?.width,height:P?.height,...S.props.style},children:S.props.children},F))}),o.push(...l),l.slice(0,O.forward).forEach((S,X)=>{const N=p[X],P=`clone-forward-${S.props.id}`;o.push(h.jsx(ve,{"aria-hidden":!0,isClone:!0,id:P,style:{width:N?.width,height:N?.height,...S.props.style},children:S.props.children},P))}),o},[C,k,e,y,O]),{totalPages:x,pageOffsets:B}=n.useMemo(()=>{if(!se||Object.keys(y).length===0)return{totalPages:0,pageOffsets:[]};let l;return d==="item"?l=Ea(ae(y),q,Y,C):l=Na(ae(y),q,Y),ee(o=>Math.min(o,l.totalPages-1)),l},[se,y,d,q,Y,C,ee]),{isPlaying:ue,isStopped:me,isPaused:Pe,start:Ce,stop:xe,toggle:be,reset:E,pause:_,resume:K,getRemainingTime:qe,addCompletionListener:Se}=Ca({enabled:R??!1,interval:$}),U=n.useCallback(l=>{const o=Math.max(0,Math.min(x-1,l));ee(o),z(B[o]);const p=V?Ie(-W.get(),[B[o]],k).offset:B[o];Ta(W,-p,Va),E()},[x,ee,z,B,V,W,k,E]);n.useImperativeHandle(Ve,()=>({activePageIndex:A,totalPages:x,goToPage:U}),[A,x,U]),n.useEffect(()=>!R||x===0?void 0:Se(()=>{const o=he(0,x,A+1);U(o)}),[R,Se,A,x,U]);const Qe=n.useCallback(()=>{const l=C?he(0,x,A+1):A+1;U(l)},[C,x,A,U]),$e=n.useCallback(()=>{const l=C?he(0,x,A-1):A-1;U(l)},[C,x,A,U]),Ye=n.useCallback(l=>{if(a==="none")return l;const o=-l;if(V){const{offset:p,index:g}=Ie(o,B,k);if(g!==A&&E(),ee(g),a==="snap")return z(B[g]),-p;const H=Math.floor(o/k),S=o-H*k;return z(S),l}else{const p=Fa(o,Y,0),g=za(p,B);if(g!==A&&E(),ee(g),a==="snap"){const H=B[g];return z(H),-H}return z(p),l}},[a,V,B,k,A,ee,z,Y,E]),_e=n.useCallback(()=>{D?.(),_()},[D,_]),Ke=n.useCallback(()=>{Z?.(),K()},[Z,K]),Xe=n.useCallback(()=>{_()},[_]),Je=n.useCallback(()=>{K()},[K]),Ze=n.useCallback(l=>{const o=l.relatedTarget;(!o||!ie.current?.contains(o))&&K()},[K]),ea=n.useCallback(l=>{const o=l.relatedTarget,p=!o||!ie.current?.contains(o);if(o&&p&&_(),B.length===0||Object.keys(y).length===0)return;const g=l.target,H=Qa(g,y);if(!H)return;const{itemRect:S}=H,X=Math.abs(W.get());if($a(S,X,q,V,k))return;if(p){const P=Ya(re,y,ie.current);if(P&&P!==g){P.focus({preventScroll:!0});return}}const N=_a(S,B);N!==A&&(E(),U(N))},[_,E,B,y,W,V,k,q,re,A,U]),aa=n.useMemo(()=>({visibleCarouselItems:re}),[re]),ta=n.useMemo(()=>({isEnabled:!!R,isStopped:me,isPaused:Pe,isPlaying:ue,interval:$,getRemainingTime:qe,start:Ce,stop:xe,toggle:be,reset:E,pause:_,resume:K}),[R,me,Pe,ue,$,qe,Ce,xe,be,E,_,K]);return h.jsx(da,{features:ga,children:h.jsx(Le.Provider,{value:te,children:h.jsx(ua,{"aria-roledescription":"carousel",className:J(m,s?.root),gap:2,onPointerEnter:Xe,onPointerLeave:Je,role:"group",style:{overflow:"clip",...w,...b?.root},width:"100%",...le,children:h.jsxs(Ue.Provider,{value:ta,children:[(t||!i)&&h.jsxs(ye,{alignItems:"center",justifyContent:t?"space-between":"flex-end",children:[typeof t=="string"?h.jsx(Aa,{className:s?.title,font:"title3",style:b?.title,children:t}):t,!i&&h.jsx(c,{autoplay:R,className:s?.navigation,disableGoNext:x<=1||!C&&A>=x-1,disableGoPrevious:x<=1||!C&&A<=0,isAutoplayStopped:me,nextPageAccessibilityLabel:f,onGoNext:Qe,onGoPrevious:$e,onToggleAutoplay:be,previousPageAccessibilityLabel:T,startAutoplayAccessibilityLabel:G,stopAutoplayAccessibilityLabel:Q,style:b?.navigation})]}),h.jsx("div",{ref:ie,className:s?.carouselContainer,onBlur:Ze,onFocus:ea,onPointerDown:l=>{Te&&(fe.start(l),_e())},style:{width:"100%",position:"relative",...b?.carouselContainer},children:h.jsxs(Oe.Provider,{value:aa,children:[x>0&&h.jsx("div",{"aria-atomic":"true","aria-live":ue?"off":"polite",className:ja,role:"status",children:I(A,x)}),h.jsx(pa.div,{_dragX:W,animate:ze,className:J(s?.carousel,Wa),drag:Te?"x":!1,dragConstraints:C?void 0:{left:-Y,right:0},dragControls:fe,dragTransition:{power:a==="free"?.5:.125,timeConstant:a!=="free"?125:void 0,modifyTarget:Ye},initial:!1,onDragEnd:Ke,style:{display:"flex",position:"relative",x:C?Fe:W,...b?.carousel},whileDrag:{pointerEvents:"none"},children:Ge})]})}),!r&&h.jsx(u,{activePageIndex:A,className:s?.pagination,onClickPage:U,paginationAccessibilityLabel:v,style:b?.pagination,totalPages:x,variant:L})]})})})})}));Xa.__docgenInfo={description:"",methods:[],displayName:"Carousel",props:{testID:{required:!1,tsType:{name:"string"},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`},accessibilityLabel:{required:!1,tsType:{name:"string"},description:`On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
On mobile, VoiceOver will read this string when a user selects the associated element.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
@link https://reactnative.dev/docs/accessibility#accessibilitylabel`},accessibilityHint:{required:!1,tsType:{name:"string"},description:`On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
when that result is not clear from the accessibility label.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
@link https://reactnative.dev/docs/accessibility#accessibilityhint`},accessibilityLabelledBy:{required:!1,tsType:{name:"string"},description:"On web, maps to `aria-labelledby` and lists the id(s) of the element(s) that label the element on which the attribute is set.\nOn mobile (Android only), a reference to another element `nativeID` used to build complex forms.\n@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby\n@link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android"},id:{required:!1,tsType:{name:"string"},description:`Used for a11y to indicate the relationship between a controlled element and its controller
eg: a Button that controls the visibility of a Modal`},accessibilityLabelId:{required:!1,tsType:{name:"string"},description:"Used to associate a label with an input for accessibility"},accessibilityDescriptionId:{required:!1,tsType:{name:"string"},description:"Used to associate descriptive text to an input for accessibility"},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""},font:{required:!1,tsType:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"fontFamily"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"fontFamily",required:!1}},{key:"phone",value:{name:"fontFamily",required:!1}},{key:"tablet",value:{name:"fontFamily",required:!1}},{key:"desktop",value:{name:"fontFamily",required:!1}}]}}]},description:""},pin:{required:!1,tsType:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}]},description:"Direction in which to absolutely pin the box."},bordered:{required:!1,tsType:{name:"boolean"},description:"Add a border around all sides of the box."},borderedTop:{required:!1,tsType:{name:"boolean"},description:"Add a border to the top side of the box."},borderedBottom:{required:!1,tsType:{name:"boolean"},description:"Add a border to the bottom side of the box."},borderedStart:{required:!1,tsType:{name:"boolean"},description:"Add a border to the leading side of the box."},borderedEnd:{required:!1,tsType:{name:"boolean"},description:"Add a border to the trailing side of the box."},borderedHorizontal:{required:!1,tsType:{name:"boolean"},description:"Add a border to the leading and trailing sides of the box."},borderedVertical:{required:!1,tsType:{name:"boolean"},description:"Add a border to the top and bottom sides of the box."},dangerouslySetBackground:{required:!1,tsType:{name:"string"},description:"@danger This is a migration escape hatch. It is not intended to be used normally."},children:{required:!1,tsType:{name:"union",raw:"CarouselItemElement | CarouselItemElement[]",elements:[{name:"ReactReactElement",raw:"React.ReactElement<CarouselItemProps, CarouselItemComponent>",elements:[{name:"intersection",raw:`Omit<BoxProps<BoxDefaultElement>, 'children'> &
CarouselItemBaseProps`,elements:[{name:"Omit",elements:[{name:"Polymorphic.Props",elements:[{name:"boxDefaultElement"},{name:"intersection",raw:`StyleProps &
SharedProps &
Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
> & {
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,elements:[{name:"intersection",raw:"ResponsiveProps<StaticStyleProps> & ResponsiveProps<DynamicStyleProps>",elements:[{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}},{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}}]},{name:"signature",type:"object",raw:`{
  /**
   * Used to locate this element in unit and end-to-end tests.
   * Under the hood, testID translates to data-testid on Web. On Mobile, testID
   * stays the same - testID
   */
  testID?: string;
}`,signature:{properties:[{key:"testID",value:{name:"string",required:!1},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`}]}},{name:"Pick",elements:[{name:"signature",type:"object",raw:`{
  /**
   * On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
   * On mobile, VoiceOver will read this string when a user selects the associated element.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabel
   */
  accessibilityLabel?: string;
  /**
   * On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
   * On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
   * when that result is not clear from the accessibility label.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
   * @link https://reactnative.dev/docs/accessibility#accessibilityhint
   */
  accessibilityHint?: string;
  /**
   * On web, maps to \`aria-labelledby\` and lists the id(s) of the element(s) that label the element on which the attribute is set.
   * On mobile (Android only), a reference to another element \`nativeID\` used to build complex forms.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android
   */
  accessibilityLabelledBy?: string;
  /**
   * Used for a11y to indicate the relationship between a controlled element and its controller
   * eg: a Button that controls the visibility of a Modal
   */
  id?: string;
  /** Used to associate a label with an input for accessibility */
  accessibilityLabelId?: string;
  /** Used to associate descriptive text to an input for accessibility */
  accessibilityDescriptionId?: string;
}`,signature:{properties:[{key:"accessibilityLabel",value:{name:"string",required:!1},description:`On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
On mobile, VoiceOver will read this string when a user selects the associated element.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
@link https://reactnative.dev/docs/accessibility#accessibilitylabel`},{key:"accessibilityHint",value:{name:"string",required:!1},description:`On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
when that result is not clear from the accessibility label.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
@link https://reactnative.dev/docs/accessibility#accessibilityhint`},{key:"accessibilityLabelledBy",value:{name:"string",required:!1},description:"On web, maps to `aria-labelledby` and lists the id(s) of the element(s) that label the element on which the attribute is set.\nOn mobile (Android only), a reference to another element `nativeID` used to build complex forms.\n@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby\n@link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android"},{key:"id",value:{name:"string",required:!1},description:`Used for a11y to indicate the relationship between a controlled element and its controller
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},{name:"union",raw:"'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'",elements:[{name:"literal",value:"'accessibilityLabel'"},{name:"literal",value:"'accessibilityLabelledBy'"},{name:"literal",value:"'accessibilityHint'"}]}],raw:`Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
>`},{name:"signature",type:"object",raw:`{
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]}],raw:`Polymorphic.Props<
  AsComponent,
  BoxBaseProps
>`},{name:"literal",value:"'children'"}],raw:"Omit<BoxProps<BoxDefaultElement>, 'children'>"},{name:"intersection",raw:`Omit<BoxBaseProps, 'children'> & {
  /**
   * Unique identifier for this carousel item.
   */
  id: string;
  /**
   * Component to render as the carousel item content.
   * Can be a React node or a function that receives the visibility state.
   */
  children?: CarouselItemRenderChildren | React.ReactNode;
  /**
   * @internal Used by Carousel to mark clone items for looping.
   * Clone items are non-interactive and excluded from tab order.
   */
  isClone?: boolean;
}`,elements:[{name:"Omit",elements:[{name:"intersection",raw:`StyleProps &
SharedProps &
Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
> & {
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,elements:[{name:"intersection",raw:"ResponsiveProps<StaticStyleProps> & ResponsiveProps<DynamicStyleProps>",elements:[{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}},{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}}]},{name:"signature",type:"object",raw:`{
  /**
   * Used to locate this element in unit and end-to-end tests.
   * Under the hood, testID translates to data-testid on Web. On Mobile, testID
   * stays the same - testID
   */
  testID?: string;
}`,signature:{properties:[{key:"testID",value:{name:"string",required:!1},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`}]}},{name:"Pick",elements:[{name:"signature",type:"object",raw:`{
  /**
   * On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
   * On mobile, VoiceOver will read this string when a user selects the associated element.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabel
   */
  accessibilityLabel?: string;
  /**
   * On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
   * On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
   * when that result is not clear from the accessibility label.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
   * @link https://reactnative.dev/docs/accessibility#accessibilityhint
   */
  accessibilityHint?: string;
  /**
   * On web, maps to \`aria-labelledby\` and lists the id(s) of the element(s) that label the element on which the attribute is set.
   * On mobile (Android only), a reference to another element \`nativeID\` used to build complex forms.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android
   */
  accessibilityLabelledBy?: string;
  /**
   * Used for a11y to indicate the relationship between a controlled element and its controller
   * eg: a Button that controls the visibility of a Modal
   */
  id?: string;
  /** Used to associate a label with an input for accessibility */
  accessibilityLabelId?: string;
  /** Used to associate descriptive text to an input for accessibility */
  accessibilityDescriptionId?: string;
}`,signature:{properties:[{key:"accessibilityLabel",value:{name:"string",required:!1},description:`On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
On mobile, VoiceOver will read this string when a user selects the associated element.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
@link https://reactnative.dev/docs/accessibility#accessibilitylabel`},{key:"accessibilityHint",value:{name:"string",required:!1},description:`On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
when that result is not clear from the accessibility label.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
@link https://reactnative.dev/docs/accessibility#accessibilityhint`},{key:"accessibilityLabelledBy",value:{name:"string",required:!1},description:"On web, maps to `aria-labelledby` and lists the id(s) of the element(s) that label the element on which the attribute is set.\nOn mobile (Android only), a reference to another element `nativeID` used to build complex forms.\n@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby\n@link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android"},{key:"id",value:{name:"string",required:!1},description:`Used for a11y to indicate the relationship between a controlled element and its controller
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},{name:"union",raw:"'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'",elements:[{name:"literal",value:"'accessibilityLabel'"},{name:"literal",value:"'accessibilityLabelledBy'"},{name:"literal",value:"'accessibilityHint'"}]}],raw:`Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
>`},{name:"signature",type:"object",raw:`{
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]},{name:"literal",value:"'children'"}],raw:"Omit<BoxBaseProps, 'children'>"},{name:"signature",type:"object",raw:`{
  /**
   * Unique identifier for this carousel item.
   */
  id: string;
  /**
   * Component to render as the carousel item content.
   * Can be a React node or a function that receives the visibility state.
   */
  children?: CarouselItemRenderChildren | React.ReactNode;
  /**
   * @internal Used by Carousel to mark clone items for looping.
   * Clone items are non-interactive and excluded from tab order.
   */
  isClone?: boolean;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0},description:"Unique identifier for this carousel item."},{key:"children",value:{name:"union",raw:"CarouselItemRenderChildren | React.ReactNode",elements:[{name:"ReactFC",raw:"React.FC<{ isVisible: boolean }>",elements:[{name:"signature",type:"object",raw:"{ isVisible: boolean }",signature:{properties:[{key:"isVisible",value:{name:"boolean",required:!0}}]}}]},{name:"ReactReactNode",raw:"React.ReactNode"}],required:!1},description:`Component to render as the carousel item content.
Can be a React node or a function that receives the visibility state.`},{key:"isClone",value:{name:"boolean",required:!1},description:`@internal Used by Carousel to mark clone items for looping.
Clone items are non-interactive and excluded from tab order.`}]}}]}]},{name:"ReactFC",raw:"React.FC<CarouselItemProps>",elements:[{name:"intersection",raw:`Omit<BoxProps<BoxDefaultElement>, 'children'> &
CarouselItemBaseProps`,elements:[{name:"Omit",elements:[{name:"Polymorphic.Props",elements:[{name:"boxDefaultElement"},{name:"intersection",raw:`StyleProps &
SharedProps &
Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
> & {
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,elements:[{name:"intersection",raw:"ResponsiveProps<StaticStyleProps> & ResponsiveProps<DynamicStyleProps>",elements:[{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}},{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}}]},{name:"signature",type:"object",raw:`{
  /**
   * Used to locate this element in unit and end-to-end tests.
   * Under the hood, testID translates to data-testid on Web. On Mobile, testID
   * stays the same - testID
   */
  testID?: string;
}`,signature:{properties:[{key:"testID",value:{name:"string",required:!1},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`}]}},{name:"Pick",elements:[{name:"signature",type:"object",raw:`{
  /**
   * On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
   * On mobile, VoiceOver will read this string when a user selects the associated element.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabel
   */
  accessibilityLabel?: string;
  /**
   * On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
   * On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
   * when that result is not clear from the accessibility label.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
   * @link https://reactnative.dev/docs/accessibility#accessibilityhint
   */
  accessibilityHint?: string;
  /**
   * On web, maps to \`aria-labelledby\` and lists the id(s) of the element(s) that label the element on which the attribute is set.
   * On mobile (Android only), a reference to another element \`nativeID\` used to build complex forms.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android
   */
  accessibilityLabelledBy?: string;
  /**
   * Used for a11y to indicate the relationship between a controlled element and its controller
   * eg: a Button that controls the visibility of a Modal
   */
  id?: string;
  /** Used to associate a label with an input for accessibility */
  accessibilityLabelId?: string;
  /** Used to associate descriptive text to an input for accessibility */
  accessibilityDescriptionId?: string;
}`,signature:{properties:[{key:"accessibilityLabel",value:{name:"string",required:!1},description:`On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
On mobile, VoiceOver will read this string when a user selects the associated element.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
@link https://reactnative.dev/docs/accessibility#accessibilitylabel`},{key:"accessibilityHint",value:{name:"string",required:!1},description:`On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
when that result is not clear from the accessibility label.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
@link https://reactnative.dev/docs/accessibility#accessibilityhint`},{key:"accessibilityLabelledBy",value:{name:"string",required:!1},description:"On web, maps to `aria-labelledby` and lists the id(s) of the element(s) that label the element on which the attribute is set.\nOn mobile (Android only), a reference to another element `nativeID` used to build complex forms.\n@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby\n@link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android"},{key:"id",value:{name:"string",required:!1},description:`Used for a11y to indicate the relationship between a controlled element and its controller
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},{name:"union",raw:"'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'",elements:[{name:"literal",value:"'accessibilityLabel'"},{name:"literal",value:"'accessibilityLabelledBy'"},{name:"literal",value:"'accessibilityHint'"}]}],raw:`Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
>`},{name:"signature",type:"object",raw:`{
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]}],raw:`Polymorphic.Props<
  AsComponent,
  BoxBaseProps
>`},{name:"literal",value:"'children'"}],raw:"Omit<BoxProps<BoxDefaultElement>, 'children'>"},{name:"intersection",raw:`Omit<BoxBaseProps, 'children'> & {
  /**
   * Unique identifier for this carousel item.
   */
  id: string;
  /**
   * Component to render as the carousel item content.
   * Can be a React node or a function that receives the visibility state.
   */
  children?: CarouselItemRenderChildren | React.ReactNode;
  /**
   * @internal Used by Carousel to mark clone items for looping.
   * Clone items are non-interactive and excluded from tab order.
   */
  isClone?: boolean;
}`,elements:[{name:"Omit",elements:[{name:"intersection",raw:`StyleProps &
SharedProps &
Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
> & {
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,elements:[{name:"intersection",raw:"ResponsiveProps<StaticStyleProps> & ResponsiveProps<DynamicStyleProps>",elements:[{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}},{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}}]},{name:"signature",type:"object",raw:`{
  /**
   * Used to locate this element in unit and end-to-end tests.
   * Under the hood, testID translates to data-testid on Web. On Mobile, testID
   * stays the same - testID
   */
  testID?: string;
}`,signature:{properties:[{key:"testID",value:{name:"string",required:!1},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`}]}},{name:"Pick",elements:[{name:"signature",type:"object",raw:`{
  /**
   * On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
   * On mobile, VoiceOver will read this string when a user selects the associated element.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabel
   */
  accessibilityLabel?: string;
  /**
   * On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
   * On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
   * when that result is not clear from the accessibility label.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
   * @link https://reactnative.dev/docs/accessibility#accessibilityhint
   */
  accessibilityHint?: string;
  /**
   * On web, maps to \`aria-labelledby\` and lists the id(s) of the element(s) that label the element on which the attribute is set.
   * On mobile (Android only), a reference to another element \`nativeID\` used to build complex forms.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android
   */
  accessibilityLabelledBy?: string;
  /**
   * Used for a11y to indicate the relationship between a controlled element and its controller
   * eg: a Button that controls the visibility of a Modal
   */
  id?: string;
  /** Used to associate a label with an input for accessibility */
  accessibilityLabelId?: string;
  /** Used to associate descriptive text to an input for accessibility */
  accessibilityDescriptionId?: string;
}`,signature:{properties:[{key:"accessibilityLabel",value:{name:"string",required:!1},description:`On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
On mobile, VoiceOver will read this string when a user selects the associated element.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
@link https://reactnative.dev/docs/accessibility#accessibilitylabel`},{key:"accessibilityHint",value:{name:"string",required:!1},description:`On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
when that result is not clear from the accessibility label.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
@link https://reactnative.dev/docs/accessibility#accessibilityhint`},{key:"accessibilityLabelledBy",value:{name:"string",required:!1},description:"On web, maps to `aria-labelledby` and lists the id(s) of the element(s) that label the element on which the attribute is set.\nOn mobile (Android only), a reference to another element `nativeID` used to build complex forms.\n@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby\n@link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android"},{key:"id",value:{name:"string",required:!1},description:`Used for a11y to indicate the relationship between a controlled element and its controller
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},{name:"union",raw:"'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'",elements:[{name:"literal",value:"'accessibilityLabel'"},{name:"literal",value:"'accessibilityLabelledBy'"},{name:"literal",value:"'accessibilityHint'"}]}],raw:`Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
>`},{name:"signature",type:"object",raw:`{
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]},{name:"literal",value:"'children'"}],raw:"Omit<BoxBaseProps, 'children'>"},{name:"signature",type:"object",raw:`{
  /**
   * Unique identifier for this carousel item.
   */
  id: string;
  /**
   * Component to render as the carousel item content.
   * Can be a React node or a function that receives the visibility state.
   */
  children?: CarouselItemRenderChildren | React.ReactNode;
  /**
   * @internal Used by Carousel to mark clone items for looping.
   * Clone items are non-interactive and excluded from tab order.
   */
  isClone?: boolean;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0},description:"Unique identifier for this carousel item."},{key:"children",value:{name:"union",raw:"CarouselItemRenderChildren | React.ReactNode",elements:[{name:"ReactFC",raw:"React.FC<{ isVisible: boolean }>",elements:[{name:"signature",type:"object",raw:"{ isVisible: boolean }",signature:{properties:[{key:"isVisible",value:{name:"boolean",required:!0}}]}}]},{name:"ReactReactNode",raw:"React.ReactNode"}],required:!1},description:`Component to render as the carousel item content.
Can be a React node or a function that receives the visibility state.`},{key:"isClone",value:{name:"boolean",required:!1},description:`@internal Used by Carousel to mark clone items for looping.
Clone items are non-interactive and excluded from tab order.`}]}}]}]}]}]},{name:"Array",elements:[{name:"ReactReactElement",raw:"React.ReactElement<CarouselItemProps, CarouselItemComponent>",elements:[{name:"intersection",raw:`Omit<BoxProps<BoxDefaultElement>, 'children'> &
CarouselItemBaseProps`,elements:[{name:"Omit",elements:[{name:"Polymorphic.Props",elements:[{name:"boxDefaultElement"},{name:"intersection",raw:`StyleProps &
SharedProps &
Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
> & {
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,elements:[{name:"intersection",raw:"ResponsiveProps<StaticStyleProps> & ResponsiveProps<DynamicStyleProps>",elements:[{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}},{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}}]},{name:"signature",type:"object",raw:`{
  /**
   * Used to locate this element in unit and end-to-end tests.
   * Under the hood, testID translates to data-testid on Web. On Mobile, testID
   * stays the same - testID
   */
  testID?: string;
}`,signature:{properties:[{key:"testID",value:{name:"string",required:!1},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`}]}},{name:"Pick",elements:[{name:"signature",type:"object",raw:`{
  /**
   * On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
   * On mobile, VoiceOver will read this string when a user selects the associated element.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabel
   */
  accessibilityLabel?: string;
  /**
   * On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
   * On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
   * when that result is not clear from the accessibility label.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
   * @link https://reactnative.dev/docs/accessibility#accessibilityhint
   */
  accessibilityHint?: string;
  /**
   * On web, maps to \`aria-labelledby\` and lists the id(s) of the element(s) that label the element on which the attribute is set.
   * On mobile (Android only), a reference to another element \`nativeID\` used to build complex forms.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android
   */
  accessibilityLabelledBy?: string;
  /**
   * Used for a11y to indicate the relationship between a controlled element and its controller
   * eg: a Button that controls the visibility of a Modal
   */
  id?: string;
  /** Used to associate a label with an input for accessibility */
  accessibilityLabelId?: string;
  /** Used to associate descriptive text to an input for accessibility */
  accessibilityDescriptionId?: string;
}`,signature:{properties:[{key:"accessibilityLabel",value:{name:"string",required:!1},description:`On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
On mobile, VoiceOver will read this string when a user selects the associated element.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
@link https://reactnative.dev/docs/accessibility#accessibilitylabel`},{key:"accessibilityHint",value:{name:"string",required:!1},description:`On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
when that result is not clear from the accessibility label.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
@link https://reactnative.dev/docs/accessibility#accessibilityhint`},{key:"accessibilityLabelledBy",value:{name:"string",required:!1},description:"On web, maps to `aria-labelledby` and lists the id(s) of the element(s) that label the element on which the attribute is set.\nOn mobile (Android only), a reference to another element `nativeID` used to build complex forms.\n@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby\n@link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android"},{key:"id",value:{name:"string",required:!1},description:`Used for a11y to indicate the relationship between a controlled element and its controller
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},{name:"union",raw:"'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'",elements:[{name:"literal",value:"'accessibilityLabel'"},{name:"literal",value:"'accessibilityLabelledBy'"},{name:"literal",value:"'accessibilityHint'"}]}],raw:`Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
>`},{name:"signature",type:"object",raw:`{
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]}],raw:`Polymorphic.Props<
  AsComponent,
  BoxBaseProps
>`},{name:"literal",value:"'children'"}],raw:"Omit<BoxProps<BoxDefaultElement>, 'children'>"},{name:"intersection",raw:`Omit<BoxBaseProps, 'children'> & {
  /**
   * Unique identifier for this carousel item.
   */
  id: string;
  /**
   * Component to render as the carousel item content.
   * Can be a React node or a function that receives the visibility state.
   */
  children?: CarouselItemRenderChildren | React.ReactNode;
  /**
   * @internal Used by Carousel to mark clone items for looping.
   * Clone items are non-interactive and excluded from tab order.
   */
  isClone?: boolean;
}`,elements:[{name:"Omit",elements:[{name:"intersection",raw:`StyleProps &
SharedProps &
Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
> & {
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,elements:[{name:"intersection",raw:"ResponsiveProps<StaticStyleProps> & ResponsiveProps<DynamicStyleProps>",elements:[{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}},{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}}]},{name:"signature",type:"object",raw:`{
  /**
   * Used to locate this element in unit and end-to-end tests.
   * Under the hood, testID translates to data-testid on Web. On Mobile, testID
   * stays the same - testID
   */
  testID?: string;
}`,signature:{properties:[{key:"testID",value:{name:"string",required:!1},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`}]}},{name:"Pick",elements:[{name:"signature",type:"object",raw:`{
  /**
   * On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
   * On mobile, VoiceOver will read this string when a user selects the associated element.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabel
   */
  accessibilityLabel?: string;
  /**
   * On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
   * On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
   * when that result is not clear from the accessibility label.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
   * @link https://reactnative.dev/docs/accessibility#accessibilityhint
   */
  accessibilityHint?: string;
  /**
   * On web, maps to \`aria-labelledby\` and lists the id(s) of the element(s) that label the element on which the attribute is set.
   * On mobile (Android only), a reference to another element \`nativeID\` used to build complex forms.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android
   */
  accessibilityLabelledBy?: string;
  /**
   * Used for a11y to indicate the relationship between a controlled element and its controller
   * eg: a Button that controls the visibility of a Modal
   */
  id?: string;
  /** Used to associate a label with an input for accessibility */
  accessibilityLabelId?: string;
  /** Used to associate descriptive text to an input for accessibility */
  accessibilityDescriptionId?: string;
}`,signature:{properties:[{key:"accessibilityLabel",value:{name:"string",required:!1},description:`On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
On mobile, VoiceOver will read this string when a user selects the associated element.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
@link https://reactnative.dev/docs/accessibility#accessibilitylabel`},{key:"accessibilityHint",value:{name:"string",required:!1},description:`On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
when that result is not clear from the accessibility label.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
@link https://reactnative.dev/docs/accessibility#accessibilityhint`},{key:"accessibilityLabelledBy",value:{name:"string",required:!1},description:"On web, maps to `aria-labelledby` and lists the id(s) of the element(s) that label the element on which the attribute is set.\nOn mobile (Android only), a reference to another element `nativeID` used to build complex forms.\n@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby\n@link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android"},{key:"id",value:{name:"string",required:!1},description:`Used for a11y to indicate the relationship between a controlled element and its controller
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},{name:"union",raw:"'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'",elements:[{name:"literal",value:"'accessibilityLabel'"},{name:"literal",value:"'accessibilityLabelledBy'"},{name:"literal",value:"'accessibilityHint'"}]}],raw:`Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
>`},{name:"signature",type:"object",raw:`{
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]},{name:"literal",value:"'children'"}],raw:"Omit<BoxBaseProps, 'children'>"},{name:"signature",type:"object",raw:`{
  /**
   * Unique identifier for this carousel item.
   */
  id: string;
  /**
   * Component to render as the carousel item content.
   * Can be a React node or a function that receives the visibility state.
   */
  children?: CarouselItemRenderChildren | React.ReactNode;
  /**
   * @internal Used by Carousel to mark clone items for looping.
   * Clone items are non-interactive and excluded from tab order.
   */
  isClone?: boolean;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0},description:"Unique identifier for this carousel item."},{key:"children",value:{name:"union",raw:"CarouselItemRenderChildren | React.ReactNode",elements:[{name:"ReactFC",raw:"React.FC<{ isVisible: boolean }>",elements:[{name:"signature",type:"object",raw:"{ isVisible: boolean }",signature:{properties:[{key:"isVisible",value:{name:"boolean",required:!0}}]}}]},{name:"ReactReactNode",raw:"React.ReactNode"}],required:!1},description:`Component to render as the carousel item content.
Can be a React node or a function that receives the visibility state.`},{key:"isClone",value:{name:"boolean",required:!1},description:`@internal Used by Carousel to mark clone items for looping.
Clone items are non-interactive and excluded from tab order.`}]}}]}]},{name:"ReactFC",raw:"React.FC<CarouselItemProps>",elements:[{name:"intersection",raw:`Omit<BoxProps<BoxDefaultElement>, 'children'> &
CarouselItemBaseProps`,elements:[{name:"Omit",elements:[{name:"Polymorphic.Props",elements:[{name:"boxDefaultElement"},{name:"intersection",raw:`StyleProps &
SharedProps &
Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
> & {
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,elements:[{name:"intersection",raw:"ResponsiveProps<StaticStyleProps> & ResponsiveProps<DynamicStyleProps>",elements:[{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}},{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}}]},{name:"signature",type:"object",raw:`{
  /**
   * Used to locate this element in unit and end-to-end tests.
   * Under the hood, testID translates to data-testid on Web. On Mobile, testID
   * stays the same - testID
   */
  testID?: string;
}`,signature:{properties:[{key:"testID",value:{name:"string",required:!1},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`}]}},{name:"Pick",elements:[{name:"signature",type:"object",raw:`{
  /**
   * On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
   * On mobile, VoiceOver will read this string when a user selects the associated element.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabel
   */
  accessibilityLabel?: string;
  /**
   * On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
   * On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
   * when that result is not clear from the accessibility label.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
   * @link https://reactnative.dev/docs/accessibility#accessibilityhint
   */
  accessibilityHint?: string;
  /**
   * On web, maps to \`aria-labelledby\` and lists the id(s) of the element(s) that label the element on which the attribute is set.
   * On mobile (Android only), a reference to another element \`nativeID\` used to build complex forms.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android
   */
  accessibilityLabelledBy?: string;
  /**
   * Used for a11y to indicate the relationship between a controlled element and its controller
   * eg: a Button that controls the visibility of a Modal
   */
  id?: string;
  /** Used to associate a label with an input for accessibility */
  accessibilityLabelId?: string;
  /** Used to associate descriptive text to an input for accessibility */
  accessibilityDescriptionId?: string;
}`,signature:{properties:[{key:"accessibilityLabel",value:{name:"string",required:!1},description:`On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
On mobile, VoiceOver will read this string when a user selects the associated element.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
@link https://reactnative.dev/docs/accessibility#accessibilitylabel`},{key:"accessibilityHint",value:{name:"string",required:!1},description:`On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
when that result is not clear from the accessibility label.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
@link https://reactnative.dev/docs/accessibility#accessibilityhint`},{key:"accessibilityLabelledBy",value:{name:"string",required:!1},description:"On web, maps to `aria-labelledby` and lists the id(s) of the element(s) that label the element on which the attribute is set.\nOn mobile (Android only), a reference to another element `nativeID` used to build complex forms.\n@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby\n@link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android"},{key:"id",value:{name:"string",required:!1},description:`Used for a11y to indicate the relationship between a controlled element and its controller
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},{name:"union",raw:"'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'",elements:[{name:"literal",value:"'accessibilityLabel'"},{name:"literal",value:"'accessibilityLabelledBy'"},{name:"literal",value:"'accessibilityHint'"}]}],raw:`Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
>`},{name:"signature",type:"object",raw:`{
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]}],raw:`Polymorphic.Props<
  AsComponent,
  BoxBaseProps
>`},{name:"literal",value:"'children'"}],raw:"Omit<BoxProps<BoxDefaultElement>, 'children'>"},{name:"intersection",raw:`Omit<BoxBaseProps, 'children'> & {
  /**
   * Unique identifier for this carousel item.
   */
  id: string;
  /**
   * Component to render as the carousel item content.
   * Can be a React node or a function that receives the visibility state.
   */
  children?: CarouselItemRenderChildren | React.ReactNode;
  /**
   * @internal Used by Carousel to mark clone items for looping.
   * Clone items are non-interactive and excluded from tab order.
   */
  isClone?: boolean;
}`,elements:[{name:"Omit",elements:[{name:"intersection",raw:`StyleProps &
SharedProps &
Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
> & {
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,elements:[{name:"intersection",raw:"ResponsiveProps<StaticStyleProps> & ResponsiveProps<DynamicStyleProps>",elements:[{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}},{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}}]},{name:"signature",type:"object",raw:`{
  /**
   * Used to locate this element in unit and end-to-end tests.
   * Under the hood, testID translates to data-testid on Web. On Mobile, testID
   * stays the same - testID
   */
  testID?: string;
}`,signature:{properties:[{key:"testID",value:{name:"string",required:!1},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`}]}},{name:"Pick",elements:[{name:"signature",type:"object",raw:`{
  /**
   * On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
   * On mobile, VoiceOver will read this string when a user selects the associated element.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabel
   */
  accessibilityLabel?: string;
  /**
   * On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
   * On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
   * when that result is not clear from the accessibility label.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
   * @link https://reactnative.dev/docs/accessibility#accessibilityhint
   */
  accessibilityHint?: string;
  /**
   * On web, maps to \`aria-labelledby\` and lists the id(s) of the element(s) that label the element on which the attribute is set.
   * On mobile (Android only), a reference to another element \`nativeID\` used to build complex forms.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android
   */
  accessibilityLabelledBy?: string;
  /**
   * Used for a11y to indicate the relationship between a controlled element and its controller
   * eg: a Button that controls the visibility of a Modal
   */
  id?: string;
  /** Used to associate a label with an input for accessibility */
  accessibilityLabelId?: string;
  /** Used to associate descriptive text to an input for accessibility */
  accessibilityDescriptionId?: string;
}`,signature:{properties:[{key:"accessibilityLabel",value:{name:"string",required:!1},description:`On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
On mobile, VoiceOver will read this string when a user selects the associated element.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
@link https://reactnative.dev/docs/accessibility#accessibilitylabel`},{key:"accessibilityHint",value:{name:"string",required:!1},description:`On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
when that result is not clear from the accessibility label.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
@link https://reactnative.dev/docs/accessibility#accessibilityhint`},{key:"accessibilityLabelledBy",value:{name:"string",required:!1},description:"On web, maps to `aria-labelledby` and lists the id(s) of the element(s) that label the element on which the attribute is set.\nOn mobile (Android only), a reference to another element `nativeID` used to build complex forms.\n@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby\n@link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android"},{key:"id",value:{name:"string",required:!1},description:`Used for a11y to indicate the relationship between a controlled element and its controller
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},{name:"union",raw:"'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'",elements:[{name:"literal",value:"'accessibilityLabel'"},{name:"literal",value:"'accessibilityLabelledBy'"},{name:"literal",value:"'accessibilityHint'"}]}],raw:`Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
>`},{name:"signature",type:"object",raw:`{
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]},{name:"literal",value:"'children'"}],raw:"Omit<BoxBaseProps, 'children'>"},{name:"signature",type:"object",raw:`{
  /**
   * Unique identifier for this carousel item.
   */
  id: string;
  /**
   * Component to render as the carousel item content.
   * Can be a React node or a function that receives the visibility state.
   */
  children?: CarouselItemRenderChildren | React.ReactNode;
  /**
   * @internal Used by Carousel to mark clone items for looping.
   * Clone items are non-interactive and excluded from tab order.
   */
  isClone?: boolean;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0},description:"Unique identifier for this carousel item."},{key:"children",value:{name:"union",raw:"CarouselItemRenderChildren | React.ReactNode",elements:[{name:"ReactFC",raw:"React.FC<{ isVisible: boolean }>",elements:[{name:"signature",type:"object",raw:"{ isVisible: boolean }",signature:{properties:[{key:"isVisible",value:{name:"boolean",required:!0}}]}}]},{name:"ReactReactNode",raw:"React.ReactNode"}],required:!1},description:`Component to render as the carousel item content.
Can be a React node or a function that receives the visibility state.`},{key:"isClone",value:{name:"boolean",required:!1},description:`@internal Used by Carousel to mark clone items for looping.
Clone items are non-interactive and excluded from tab order.`}]}}]}]}]}]}],raw:"CarouselItemElement[]"}]},description:`Children are required to be CarouselItems because we calculate
their offset relative to the parent container.`},drag:{required:!1,tsType:{name:"union",raw:"'none' | 'free' | 'snap'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'free'"},{name:"literal",value:"'snap'"}]},description:`Defines the drag interaction behavior for the carousel.
'none' disables dragging completely.
'free' enables free-form dragging with natural deceleration when released.
'snap' enables dragging with automatic snapping to targets when released,
defined by snapMode.
@default 'snap'`,defaultValue:{value:"'snap'",computed:!1}},snapMode:{required:!1,tsType:{name:"union",raw:"'item' | 'page'",elements:[{name:"literal",value:"'item'"},{name:"literal",value:"'page'"}]},description:`Specifies the pagination and navigation strategy for the carousel.
'item' treats each item as a separate page for navigation, pagination, and snapping.
'page' groups items into pages based on visible area for navigation, pagination, and snapping.
This affects page calculation, navigation button behavior, and snap targets when dragging.
@default 'page'`,defaultValue:{value:"'page'",computed:!1}},hideNavigation:{required:!1,tsType:{name:"boolean"},description:`Hides the navigation arrows (previous/next buttons and autoplay control).

@note If you hide navigation with autoplay, you must provide
an alternative mechanism for users to pause the carousel.`},hidePagination:{required:!1,tsType:{name:"boolean"},description:"Hides the pagination indicators (dots/bars showing current page)."},NavigationComponent:{required:!1,tsType:{name:"ReactFC",raw:"React.FC<CarouselNavigationComponentProps>",elements:[{name:"intersection",raw:`CarouselNavigationComponentBaseProps & {
  /**
   * Custom class name for the component.
   */
  className?: string;
  /**
   * Custom styles for the component.
   */
  style?: React.CSSProperties;
}`,elements:[{name:"intersection",raw:`Pick<
  CarouselBaseProps,
  | 'autoplay'
  | 'nextPageAccessibilityLabel'
  | 'previousPageAccessibilityLabel'
  | 'startAutoplayAccessibilityLabel'
  | 'stopAutoplayAccessibilityLabel'
> & {
  /**
   * Callback for when the previous button is pressed.
   */
  onGoPrevious?: () => void;
  /**
   * Callback for when the next button is pressed.
   */
  onGoNext?: () => void;
  /**
   * Whether the previous button is disabled.
   */
  disableGoPrevious?: boolean;
  /**
   * Whether the next button is disabled.
   */
  disableGoNext?: boolean;
  /**
   * Whether autoplay is currently stopped.
   */
  isAutoplayStopped?: boolean;
  /**
   * Callback fired when the autoplay button is clicked.
   */
  onToggleAutoplay?: () => void;
}`,elements:[{name:"Pick",elements:[{name:"intersection",raw:`SharedProps &
SharedAccessibilityProps &
BoxBaseProps & {
  /**
   * Children are required to be CarouselItems because we calculate
   * their offset relative to the parent container.
   */
  children?: CarouselItemElement | CarouselItemElement[];
  /**
   * Defines the drag interaction behavior for the carousel.
   * 'none' disables dragging completely.
   * 'free' enables free-form dragging with natural deceleration when released.
   * 'snap' enables dragging with automatic snapping to targets when released,
   * defined by snapMode.
   * @default 'snap'
   */
  drag?: 'none' | 'free' | 'snap';
  /**
   * Specifies the pagination and navigation strategy for the carousel.
   * 'item' treats each item as a separate page for navigation, pagination, and snapping.
   * 'page' groups items into pages based on visible area for navigation, pagination, and snapping.
   * This affects page calculation, navigation button behavior, and snap targets when dragging.
   * @default 'page'
   */
  snapMode?: 'item' | 'page';
  /**
   * Hides the navigation arrows (previous/next buttons and autoplay control).
   *
   * @note If you hide navigation with autoplay, you must provide
   * an alternative mechanism for users to pause the carousel.
   */
  hideNavigation?: boolean;
  /**
   * Hides the pagination indicators (dots/bars showing current page).
   */
  hidePagination?: boolean;
  /**
   * Custom component to render navigation arrows.
   * @default DefaultCarouselNavigation
   */
  NavigationComponent?: CarouselNavigationComponent;
  /**
   * Custom component to render pagination indicators.
   * @default DefaultCarouselPagination
   */
  PaginationComponent?: CarouselPaginationComponent;
  /**
   * Title to display above the carousel.
   * When a string is provided, it will be rendered with default title styling.
   * When a React element is provided, it completely replaces the default title component
   * and styling.
   */
  title?: React.ReactNode;
  /**
   * Accessibility label for the next page button.
   * @default 'Next page'
   */
  nextPageAccessibilityLabel?: string;
  /**
   * Accessibility label for the previous page button.
   * @default 'Previous page'
   */
  previousPageAccessibilityLabel?: string;
  /**
   * Accessibility label for the go to page button.
   * When a string is provided, it is used as-is for all indicators.
   * When a function is provided, it receives the page index and returns a label.
   * @default \`Go to page X\`
   */
  paginationAccessibilityLabel?: string | ((pageIndex: number) => string);
  /**
   * Accessibility label for starting autoplay.
   * @default 'Play Carousel'
   */
  startAutoplayAccessibilityLabel?: string;
  /**
   * Accessibility label for stopping autoplay.
   * @default 'Pause Carousel'
   */
  stopAutoplayAccessibilityLabel?: string;
  /**
   * Accessibility label announced by screen readers when the page changes.
   * Receives the current page index (0-based) and total pages.
   * @default \`Page X of Y\`
   */
  pageChangeAccessibilityLabel?: (activePageIndex: number, totalPages: number) => string;
  /**
   * Callback fired when the carousel page changes.
   */
  onChangePage?: (activePageIndex: number) => void;
  /**
   * Callback fired when the user starts dragging the carousel.
   */
  onDragStart?: () => void;
  /**
   * Callback fired when the user ends dragging the carousel.
   */
  onDragEnd?: () => void;
  /**
   * Enables infinite looping. When true, the carousel will seamlessly
   * loop from the last item back to the first.
   * @note Requires at least 2 pages worth of content to function.
   */
  loop?: boolean;
  /**
   * Whether autoplay is enabled for the carousel.
   */
  autoplay?: boolean;
  /**
   * The interval in milliseconds for autoplay.
   * @default 3000 (3 seconds)
   */
  autoplayInterval?: number;
  /**
   * Visual variant for the pagination indicators.
   * - 'pill': All indicators are pill-shaped (default)
   * - 'dot': Inactive indicators are small dots, active indicator expands to a pill
   * @default 'pill'
   * @note 'pill' variant is deprecated, use 'dot' instead
   */
  paginationVariant?: CarouselPaginationComponentBaseProps['variant'];
}`,elements:[{name:"signature",type:"object",raw:`{
  /**
   * Used to locate this element in unit and end-to-end tests.
   * Under the hood, testID translates to data-testid on Web. On Mobile, testID
   * stays the same - testID
   */
  testID?: string;
}`,signature:{properties:[{key:"testID",value:{name:"string",required:!1},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`}]}},{name:"signature",type:"object",raw:`{
  /**
   * On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
   * On mobile, VoiceOver will read this string when a user selects the associated element.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabel
   */
  accessibilityLabel?: string;
  /**
   * On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
   * On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
   * when that result is not clear from the accessibility label.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
   * @link https://reactnative.dev/docs/accessibility#accessibilityhint
   */
  accessibilityHint?: string;
  /**
   * On web, maps to \`aria-labelledby\` and lists the id(s) of the element(s) that label the element on which the attribute is set.
   * On mobile (Android only), a reference to another element \`nativeID\` used to build complex forms.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android
   */
  accessibilityLabelledBy?: string;
  /**
   * Used for a11y to indicate the relationship between a controlled element and its controller
   * eg: a Button that controls the visibility of a Modal
   */
  id?: string;
  /** Used to associate a label with an input for accessibility */
  accessibilityLabelId?: string;
  /** Used to associate descriptive text to an input for accessibility */
  accessibilityDescriptionId?: string;
}`,signature:{properties:[{key:"accessibilityLabel",value:{name:"string",required:!1},description:`On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
On mobile, VoiceOver will read this string when a user selects the associated element.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
@link https://reactnative.dev/docs/accessibility#accessibilitylabel`},{key:"accessibilityHint",value:{name:"string",required:!1},description:`On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
when that result is not clear from the accessibility label.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
@link https://reactnative.dev/docs/accessibility#accessibilityhint`},{key:"accessibilityLabelledBy",value:{name:"string",required:!1},description:"On web, maps to `aria-labelledby` and lists the id(s) of the element(s) that label the element on which the attribute is set.\nOn mobile (Android only), a reference to another element `nativeID` used to build complex forms.\n@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby\n@link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android"},{key:"id",value:{name:"string",required:!1},description:`Used for a11y to indicate the relationship between a controlled element and its controller
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},{name:"intersection",raw:`StyleProps &
SharedProps &
Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
> & {
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,elements:[{name:"intersection",raw:"ResponsiveProps<StaticStyleProps> & ResponsiveProps<DynamicStyleProps>",elements:[{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}},{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}}]},{name:"signature",type:"object",raw:`{
  /**
   * Used to locate this element in unit and end-to-end tests.
   * Under the hood, testID translates to data-testid on Web. On Mobile, testID
   * stays the same - testID
   */
  testID?: string;
}`,signature:{properties:[{key:"testID",value:{name:"string",required:!1},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`}]}},{name:"Pick",elements:[{name:"signature",type:"object",raw:`{
  /**
   * On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
   * On mobile, VoiceOver will read this string when a user selects the associated element.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabel
   */
  accessibilityLabel?: string;
  /**
   * On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
   * On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
   * when that result is not clear from the accessibility label.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
   * @link https://reactnative.dev/docs/accessibility#accessibilityhint
   */
  accessibilityHint?: string;
  /**
   * On web, maps to \`aria-labelledby\` and lists the id(s) of the element(s) that label the element on which the attribute is set.
   * On mobile (Android only), a reference to another element \`nativeID\` used to build complex forms.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android
   */
  accessibilityLabelledBy?: string;
  /**
   * Used for a11y to indicate the relationship between a controlled element and its controller
   * eg: a Button that controls the visibility of a Modal
   */
  id?: string;
  /** Used to associate a label with an input for accessibility */
  accessibilityLabelId?: string;
  /** Used to associate descriptive text to an input for accessibility */
  accessibilityDescriptionId?: string;
}`,signature:{properties:[{key:"accessibilityLabel",value:{name:"string",required:!1},description:`On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
On mobile, VoiceOver will read this string when a user selects the associated element.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
@link https://reactnative.dev/docs/accessibility#accessibilitylabel`},{key:"accessibilityHint",value:{name:"string",required:!1},description:`On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
when that result is not clear from the accessibility label.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
@link https://reactnative.dev/docs/accessibility#accessibilityhint`},{key:"accessibilityLabelledBy",value:{name:"string",required:!1},description:"On web, maps to `aria-labelledby` and lists the id(s) of the element(s) that label the element on which the attribute is set.\nOn mobile (Android only), a reference to another element `nativeID` used to build complex forms.\n@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby\n@link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android"},{key:"id",value:{name:"string",required:!1},description:`Used for a11y to indicate the relationship between a controlled element and its controller
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},{name:"union",raw:"'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'",elements:[{name:"literal",value:"'accessibilityLabel'"},{name:"literal",value:"'accessibilityLabelledBy'"},{name:"literal",value:"'accessibilityHint'"}]}],raw:`Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
>`},{name:"signature",type:"object",raw:`{
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]},{name:"signature",type:"object",raw:`{
  /**
   * Children are required to be CarouselItems because we calculate
   * their offset relative to the parent container.
   */
  children?: CarouselItemElement | CarouselItemElement[];
  /**
   * Defines the drag interaction behavior for the carousel.
   * 'none' disables dragging completely.
   * 'free' enables free-form dragging with natural deceleration when released.
   * 'snap' enables dragging with automatic snapping to targets when released,
   * defined by snapMode.
   * @default 'snap'
   */
  drag?: 'none' | 'free' | 'snap';
  /**
   * Specifies the pagination and navigation strategy for the carousel.
   * 'item' treats each item as a separate page for navigation, pagination, and snapping.
   * 'page' groups items into pages based on visible area for navigation, pagination, and snapping.
   * This affects page calculation, navigation button behavior, and snap targets when dragging.
   * @default 'page'
   */
  snapMode?: 'item' | 'page';
  /**
   * Hides the navigation arrows (previous/next buttons and autoplay control).
   *
   * @note If you hide navigation with autoplay, you must provide
   * an alternative mechanism for users to pause the carousel.
   */
  hideNavigation?: boolean;
  /**
   * Hides the pagination indicators (dots/bars showing current page).
   */
  hidePagination?: boolean;
  /**
   * Custom component to render navigation arrows.
   * @default DefaultCarouselNavigation
   */
  NavigationComponent?: CarouselNavigationComponent;
  /**
   * Custom component to render pagination indicators.
   * @default DefaultCarouselPagination
   */
  PaginationComponent?: CarouselPaginationComponent;
  /**
   * Title to display above the carousel.
   * When a string is provided, it will be rendered with default title styling.
   * When a React element is provided, it completely replaces the default title component
   * and styling.
   */
  title?: React.ReactNode;
  /**
   * Accessibility label for the next page button.
   * @default 'Next page'
   */
  nextPageAccessibilityLabel?: string;
  /**
   * Accessibility label for the previous page button.
   * @default 'Previous page'
   */
  previousPageAccessibilityLabel?: string;
  /**
   * Accessibility label for the go to page button.
   * When a string is provided, it is used as-is for all indicators.
   * When a function is provided, it receives the page index and returns a label.
   * @default \`Go to page X\`
   */
  paginationAccessibilityLabel?: string | ((pageIndex: number) => string);
  /**
   * Accessibility label for starting autoplay.
   * @default 'Play Carousel'
   */
  startAutoplayAccessibilityLabel?: string;
  /**
   * Accessibility label for stopping autoplay.
   * @default 'Pause Carousel'
   */
  stopAutoplayAccessibilityLabel?: string;
  /**
   * Accessibility label announced by screen readers when the page changes.
   * Receives the current page index (0-based) and total pages.
   * @default \`Page X of Y\`
   */
  pageChangeAccessibilityLabel?: (activePageIndex: number, totalPages: number) => string;
  /**
   * Callback fired when the carousel page changes.
   */
  onChangePage?: (activePageIndex: number) => void;
  /**
   * Callback fired when the user starts dragging the carousel.
   */
  onDragStart?: () => void;
  /**
   * Callback fired when the user ends dragging the carousel.
   */
  onDragEnd?: () => void;
  /**
   * Enables infinite looping. When true, the carousel will seamlessly
   * loop from the last item back to the first.
   * @note Requires at least 2 pages worth of content to function.
   */
  loop?: boolean;
  /**
   * Whether autoplay is enabled for the carousel.
   */
  autoplay?: boolean;
  /**
   * The interval in milliseconds for autoplay.
   * @default 3000 (3 seconds)
   */
  autoplayInterval?: number;
  /**
   * Visual variant for the pagination indicators.
   * - 'pill': All indicators are pill-shaped (default)
   * - 'dot': Inactive indicators are small dots, active indicator expands to a pill
   * @default 'pill'
   * @note 'pill' variant is deprecated, use 'dot' instead
   */
  paginationVariant?: CarouselPaginationComponentBaseProps['variant'];
}`,signature:{properties:[{key:"children",value:{name:"union",raw:"CarouselItemElement | CarouselItemElement[]",elements:[{name:"ReactReactElement",raw:"React.ReactElement<CarouselItemProps, CarouselItemComponent>",elements:[{name:"intersection",raw:`Omit<BoxProps<BoxDefaultElement>, 'children'> &
CarouselItemBaseProps`,elements:[{name:"Omit",elements:[{name:"Polymorphic.Props",elements:[{name:"boxDefaultElement"},{name:"intersection",raw:`StyleProps &
SharedProps &
Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
> & {
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,elements:[{name:"intersection",raw:"ResponsiveProps<StaticStyleProps> & ResponsiveProps<DynamicStyleProps>",elements:[{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}},{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}}]},{name:"signature",type:"object",raw:`{
  /**
   * Used to locate this element in unit and end-to-end tests.
   * Under the hood, testID translates to data-testid on Web. On Mobile, testID
   * stays the same - testID
   */
  testID?: string;
}`,signature:{properties:[{key:"testID",value:{name:"string",required:!1},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`}]}},{name:"Pick",elements:[{name:"signature",type:"object",raw:`{
  /**
   * On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
   * On mobile, VoiceOver will read this string when a user selects the associated element.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabel
   */
  accessibilityLabel?: string;
  /**
   * On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
   * On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
   * when that result is not clear from the accessibility label.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
   * @link https://reactnative.dev/docs/accessibility#accessibilityhint
   */
  accessibilityHint?: string;
  /**
   * On web, maps to \`aria-labelledby\` and lists the id(s) of the element(s) that label the element on which the attribute is set.
   * On mobile (Android only), a reference to another element \`nativeID\` used to build complex forms.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android
   */
  accessibilityLabelledBy?: string;
  /**
   * Used for a11y to indicate the relationship between a controlled element and its controller
   * eg: a Button that controls the visibility of a Modal
   */
  id?: string;
  /** Used to associate a label with an input for accessibility */
  accessibilityLabelId?: string;
  /** Used to associate descriptive text to an input for accessibility */
  accessibilityDescriptionId?: string;
}`,signature:{properties:[{key:"accessibilityLabel",value:{name:"string",required:!1},description:`On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
On mobile, VoiceOver will read this string when a user selects the associated element.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
@link https://reactnative.dev/docs/accessibility#accessibilitylabel`},{key:"accessibilityHint",value:{name:"string",required:!1},description:`On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
when that result is not clear from the accessibility label.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
@link https://reactnative.dev/docs/accessibility#accessibilityhint`},{key:"accessibilityLabelledBy",value:{name:"string",required:!1},description:"On web, maps to `aria-labelledby` and lists the id(s) of the element(s) that label the element on which the attribute is set.\nOn mobile (Android only), a reference to another element `nativeID` used to build complex forms.\n@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby\n@link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android"},{key:"id",value:{name:"string",required:!1},description:`Used for a11y to indicate the relationship between a controlled element and its controller
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},{name:"union",raw:"'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'",elements:[{name:"literal",value:"'accessibilityLabel'"},{name:"literal",value:"'accessibilityLabelledBy'"},{name:"literal",value:"'accessibilityHint'"}]}],raw:`Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
>`},{name:"signature",type:"object",raw:`{
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]}],raw:`Polymorphic.Props<
  AsComponent,
  BoxBaseProps
>`},{name:"literal",value:"'children'"}],raw:"Omit<BoxProps<BoxDefaultElement>, 'children'>"},{name:"intersection",raw:`Omit<BoxBaseProps, 'children'> & {
  /**
   * Unique identifier for this carousel item.
   */
  id: string;
  /**
   * Component to render as the carousel item content.
   * Can be a React node or a function that receives the visibility state.
   */
  children?: CarouselItemRenderChildren | React.ReactNode;
  /**
   * @internal Used by Carousel to mark clone items for looping.
   * Clone items are non-interactive and excluded from tab order.
   */
  isClone?: boolean;
}`,elements:[{name:"Omit",elements:[{name:"intersection",raw:`StyleProps &
SharedProps &
Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
> & {
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,elements:[{name:"intersection",raw:"ResponsiveProps<StaticStyleProps> & ResponsiveProps<DynamicStyleProps>",elements:[{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}},{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}}]},{name:"signature",type:"object",raw:`{
  /**
   * Used to locate this element in unit and end-to-end tests.
   * Under the hood, testID translates to data-testid on Web. On Mobile, testID
   * stays the same - testID
   */
  testID?: string;
}`,signature:{properties:[{key:"testID",value:{name:"string",required:!1},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`}]}},{name:"Pick",elements:[{name:"signature",type:"object",raw:`{
  /**
   * On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
   * On mobile, VoiceOver will read this string when a user selects the associated element.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabel
   */
  accessibilityLabel?: string;
  /**
   * On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
   * On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
   * when that result is not clear from the accessibility label.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
   * @link https://reactnative.dev/docs/accessibility#accessibilityhint
   */
  accessibilityHint?: string;
  /**
   * On web, maps to \`aria-labelledby\` and lists the id(s) of the element(s) that label the element on which the attribute is set.
   * On mobile (Android only), a reference to another element \`nativeID\` used to build complex forms.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android
   */
  accessibilityLabelledBy?: string;
  /**
   * Used for a11y to indicate the relationship between a controlled element and its controller
   * eg: a Button that controls the visibility of a Modal
   */
  id?: string;
  /** Used to associate a label with an input for accessibility */
  accessibilityLabelId?: string;
  /** Used to associate descriptive text to an input for accessibility */
  accessibilityDescriptionId?: string;
}`,signature:{properties:[{key:"accessibilityLabel",value:{name:"string",required:!1},description:`On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
On mobile, VoiceOver will read this string when a user selects the associated element.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
@link https://reactnative.dev/docs/accessibility#accessibilitylabel`},{key:"accessibilityHint",value:{name:"string",required:!1},description:`On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
when that result is not clear from the accessibility label.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
@link https://reactnative.dev/docs/accessibility#accessibilityhint`},{key:"accessibilityLabelledBy",value:{name:"string",required:!1},description:"On web, maps to `aria-labelledby` and lists the id(s) of the element(s) that label the element on which the attribute is set.\nOn mobile (Android only), a reference to another element `nativeID` used to build complex forms.\n@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby\n@link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android"},{key:"id",value:{name:"string",required:!1},description:`Used for a11y to indicate the relationship between a controlled element and its controller
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},{name:"union",raw:"'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'",elements:[{name:"literal",value:"'accessibilityLabel'"},{name:"literal",value:"'accessibilityLabelledBy'"},{name:"literal",value:"'accessibilityHint'"}]}],raw:`Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
>`},{name:"signature",type:"object",raw:`{
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]},{name:"literal",value:"'children'"}],raw:"Omit<BoxBaseProps, 'children'>"},{name:"signature",type:"object",raw:`{
  /**
   * Unique identifier for this carousel item.
   */
  id: string;
  /**
   * Component to render as the carousel item content.
   * Can be a React node or a function that receives the visibility state.
   */
  children?: CarouselItemRenderChildren | React.ReactNode;
  /**
   * @internal Used by Carousel to mark clone items for looping.
   * Clone items are non-interactive and excluded from tab order.
   */
  isClone?: boolean;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0},description:"Unique identifier for this carousel item."},{key:"children",value:{name:"union",raw:"CarouselItemRenderChildren | React.ReactNode",elements:[{name:"ReactFC",raw:"React.FC<{ isVisible: boolean }>",elements:[{name:"signature",type:"object",raw:"{ isVisible: boolean }",signature:{properties:[{key:"isVisible",value:{name:"boolean",required:!0}}]}}]},{name:"ReactReactNode",raw:"React.ReactNode"}],required:!1},description:`Component to render as the carousel item content.
Can be a React node or a function that receives the visibility state.`},{key:"isClone",value:{name:"boolean",required:!1},description:`@internal Used by Carousel to mark clone items for looping.
Clone items are non-interactive and excluded from tab order.`}]}}]}]},{name:"ReactFC",raw:"React.FC<CarouselItemProps>",elements:[{name:"intersection",raw:`Omit<BoxProps<BoxDefaultElement>, 'children'> &
CarouselItemBaseProps`,elements:[{name:"Omit",elements:[{name:"Polymorphic.Props",elements:[{name:"boxDefaultElement"},{name:"intersection",raw:`StyleProps &
SharedProps &
Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
> & {
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,elements:[{name:"intersection",raw:"ResponsiveProps<StaticStyleProps> & ResponsiveProps<DynamicStyleProps>",elements:[{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}},{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}}]},{name:"signature",type:"object",raw:`{
  /**
   * Used to locate this element in unit and end-to-end tests.
   * Under the hood, testID translates to data-testid on Web. On Mobile, testID
   * stays the same - testID
   */
  testID?: string;
}`,signature:{properties:[{key:"testID",value:{name:"string",required:!1},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`}]}},{name:"Pick",elements:[{name:"signature",type:"object",raw:`{
  /**
   * On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
   * On mobile, VoiceOver will read this string when a user selects the associated element.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabel
   */
  accessibilityLabel?: string;
  /**
   * On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
   * On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
   * when that result is not clear from the accessibility label.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
   * @link https://reactnative.dev/docs/accessibility#accessibilityhint
   */
  accessibilityHint?: string;
  /**
   * On web, maps to \`aria-labelledby\` and lists the id(s) of the element(s) that label the element on which the attribute is set.
   * On mobile (Android only), a reference to another element \`nativeID\` used to build complex forms.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android
   */
  accessibilityLabelledBy?: string;
  /**
   * Used for a11y to indicate the relationship between a controlled element and its controller
   * eg: a Button that controls the visibility of a Modal
   */
  id?: string;
  /** Used to associate a label with an input for accessibility */
  accessibilityLabelId?: string;
  /** Used to associate descriptive text to an input for accessibility */
  accessibilityDescriptionId?: string;
}`,signature:{properties:[{key:"accessibilityLabel",value:{name:"string",required:!1},description:`On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
On mobile, VoiceOver will read this string when a user selects the associated element.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
@link https://reactnative.dev/docs/accessibility#accessibilitylabel`},{key:"accessibilityHint",value:{name:"string",required:!1},description:`On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
when that result is not clear from the accessibility label.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
@link https://reactnative.dev/docs/accessibility#accessibilityhint`},{key:"accessibilityLabelledBy",value:{name:"string",required:!1},description:"On web, maps to `aria-labelledby` and lists the id(s) of the element(s) that label the element on which the attribute is set.\nOn mobile (Android only), a reference to another element `nativeID` used to build complex forms.\n@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby\n@link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android"},{key:"id",value:{name:"string",required:!1},description:`Used for a11y to indicate the relationship between a controlled element and its controller
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},{name:"union",raw:"'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'",elements:[{name:"literal",value:"'accessibilityLabel'"},{name:"literal",value:"'accessibilityLabelledBy'"},{name:"literal",value:"'accessibilityHint'"}]}],raw:`Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
>`},{name:"signature",type:"object",raw:`{
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]}],raw:`Polymorphic.Props<
  AsComponent,
  BoxBaseProps
>`},{name:"literal",value:"'children'"}],raw:"Omit<BoxProps<BoxDefaultElement>, 'children'>"},{name:"intersection",raw:`Omit<BoxBaseProps, 'children'> & {
  /**
   * Unique identifier for this carousel item.
   */
  id: string;
  /**
   * Component to render as the carousel item content.
   * Can be a React node or a function that receives the visibility state.
   */
  children?: CarouselItemRenderChildren | React.ReactNode;
  /**
   * @internal Used by Carousel to mark clone items for looping.
   * Clone items are non-interactive and excluded from tab order.
   */
  isClone?: boolean;
}`,elements:[{name:"Omit",elements:[{name:"intersection",raw:`StyleProps &
SharedProps &
Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
> & {
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,elements:[{name:"intersection",raw:"ResponsiveProps<StaticStyleProps> & ResponsiveProps<DynamicStyleProps>",elements:[{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}},{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}}]},{name:"signature",type:"object",raw:`{
  /**
   * Used to locate this element in unit and end-to-end tests.
   * Under the hood, testID translates to data-testid on Web. On Mobile, testID
   * stays the same - testID
   */
  testID?: string;
}`,signature:{properties:[{key:"testID",value:{name:"string",required:!1},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`}]}},{name:"Pick",elements:[{name:"signature",type:"object",raw:`{
  /**
   * On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
   * On mobile, VoiceOver will read this string when a user selects the associated element.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabel
   */
  accessibilityLabel?: string;
  /**
   * On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
   * On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
   * when that result is not clear from the accessibility label.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
   * @link https://reactnative.dev/docs/accessibility#accessibilityhint
   */
  accessibilityHint?: string;
  /**
   * On web, maps to \`aria-labelledby\` and lists the id(s) of the element(s) that label the element on which the attribute is set.
   * On mobile (Android only), a reference to another element \`nativeID\` used to build complex forms.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android
   */
  accessibilityLabelledBy?: string;
  /**
   * Used for a11y to indicate the relationship between a controlled element and its controller
   * eg: a Button that controls the visibility of a Modal
   */
  id?: string;
  /** Used to associate a label with an input for accessibility */
  accessibilityLabelId?: string;
  /** Used to associate descriptive text to an input for accessibility */
  accessibilityDescriptionId?: string;
}`,signature:{properties:[{key:"accessibilityLabel",value:{name:"string",required:!1},description:`On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
On mobile, VoiceOver will read this string when a user selects the associated element.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
@link https://reactnative.dev/docs/accessibility#accessibilitylabel`},{key:"accessibilityHint",value:{name:"string",required:!1},description:`On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
when that result is not clear from the accessibility label.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
@link https://reactnative.dev/docs/accessibility#accessibilityhint`},{key:"accessibilityLabelledBy",value:{name:"string",required:!1},description:"On web, maps to `aria-labelledby` and lists the id(s) of the element(s) that label the element on which the attribute is set.\nOn mobile (Android only), a reference to another element `nativeID` used to build complex forms.\n@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby\n@link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android"},{key:"id",value:{name:"string",required:!1},description:`Used for a11y to indicate the relationship between a controlled element and its controller
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},{name:"union",raw:"'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'",elements:[{name:"literal",value:"'accessibilityLabel'"},{name:"literal",value:"'accessibilityLabelledBy'"},{name:"literal",value:"'accessibilityHint'"}]}],raw:`Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
>`},{name:"signature",type:"object",raw:`{
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]},{name:"literal",value:"'children'"}],raw:"Omit<BoxBaseProps, 'children'>"},{name:"signature",type:"object",raw:`{
  /**
   * Unique identifier for this carousel item.
   */
  id: string;
  /**
   * Component to render as the carousel item content.
   * Can be a React node or a function that receives the visibility state.
   */
  children?: CarouselItemRenderChildren | React.ReactNode;
  /**
   * @internal Used by Carousel to mark clone items for looping.
   * Clone items are non-interactive and excluded from tab order.
   */
  isClone?: boolean;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0},description:"Unique identifier for this carousel item."},{key:"children",value:{name:"union",raw:"CarouselItemRenderChildren | React.ReactNode",elements:[{name:"ReactFC",raw:"React.FC<{ isVisible: boolean }>",elements:[{name:"signature",type:"object",raw:"{ isVisible: boolean }",signature:{properties:[{key:"isVisible",value:{name:"boolean",required:!0}}]}}]},{name:"ReactReactNode",raw:"React.ReactNode"}],required:!1},description:`Component to render as the carousel item content.
Can be a React node or a function that receives the visibility state.`},{key:"isClone",value:{name:"boolean",required:!1},description:`@internal Used by Carousel to mark clone items for looping.
Clone items are non-interactive and excluded from tab order.`}]}}]}]}]}]},{name:"Array",elements:[{name:"ReactReactElement",raw:"React.ReactElement<CarouselItemProps, CarouselItemComponent>",elements:[{name:"intersection",raw:`Omit<BoxProps<BoxDefaultElement>, 'children'> &
CarouselItemBaseProps`,elements:[{name:"Omit",elements:[{name:"Polymorphic.Props",elements:[{name:"boxDefaultElement"},{name:"intersection",raw:`StyleProps &
SharedProps &
Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
> & {
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,elements:[{name:"intersection",raw:"ResponsiveProps<StaticStyleProps> & ResponsiveProps<DynamicStyleProps>",elements:[{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}},{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}}]},{name:"signature",type:"object",raw:`{
  /**
   * Used to locate this element in unit and end-to-end tests.
   * Under the hood, testID translates to data-testid on Web. On Mobile, testID
   * stays the same - testID
   */
  testID?: string;
}`,signature:{properties:[{key:"testID",value:{name:"string",required:!1},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`}]}},{name:"Pick",elements:[{name:"signature",type:"object",raw:`{
  /**
   * On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
   * On mobile, VoiceOver will read this string when a user selects the associated element.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabel
   */
  accessibilityLabel?: string;
  /**
   * On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
   * On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
   * when that result is not clear from the accessibility label.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
   * @link https://reactnative.dev/docs/accessibility#accessibilityhint
   */
  accessibilityHint?: string;
  /**
   * On web, maps to \`aria-labelledby\` and lists the id(s) of the element(s) that label the element on which the attribute is set.
   * On mobile (Android only), a reference to another element \`nativeID\` used to build complex forms.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android
   */
  accessibilityLabelledBy?: string;
  /**
   * Used for a11y to indicate the relationship between a controlled element and its controller
   * eg: a Button that controls the visibility of a Modal
   */
  id?: string;
  /** Used to associate a label with an input for accessibility */
  accessibilityLabelId?: string;
  /** Used to associate descriptive text to an input for accessibility */
  accessibilityDescriptionId?: string;
}`,signature:{properties:[{key:"accessibilityLabel",value:{name:"string",required:!1},description:`On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
On mobile, VoiceOver will read this string when a user selects the associated element.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
@link https://reactnative.dev/docs/accessibility#accessibilitylabel`},{key:"accessibilityHint",value:{name:"string",required:!1},description:`On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
when that result is not clear from the accessibility label.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
@link https://reactnative.dev/docs/accessibility#accessibilityhint`},{key:"accessibilityLabelledBy",value:{name:"string",required:!1},description:"On web, maps to `aria-labelledby` and lists the id(s) of the element(s) that label the element on which the attribute is set.\nOn mobile (Android only), a reference to another element `nativeID` used to build complex forms.\n@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby\n@link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android"},{key:"id",value:{name:"string",required:!1},description:`Used for a11y to indicate the relationship between a controlled element and its controller
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},{name:"union",raw:"'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'",elements:[{name:"literal",value:"'accessibilityLabel'"},{name:"literal",value:"'accessibilityLabelledBy'"},{name:"literal",value:"'accessibilityHint'"}]}],raw:`Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
>`},{name:"signature",type:"object",raw:`{
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]}],raw:`Polymorphic.Props<
  AsComponent,
  BoxBaseProps
>`},{name:"literal",value:"'children'"}],raw:"Omit<BoxProps<BoxDefaultElement>, 'children'>"},{name:"intersection",raw:`Omit<BoxBaseProps, 'children'> & {
  /**
   * Unique identifier for this carousel item.
   */
  id: string;
  /**
   * Component to render as the carousel item content.
   * Can be a React node or a function that receives the visibility state.
   */
  children?: CarouselItemRenderChildren | React.ReactNode;
  /**
   * @internal Used by Carousel to mark clone items for looping.
   * Clone items are non-interactive and excluded from tab order.
   */
  isClone?: boolean;
}`,elements:[{name:"Omit",elements:[{name:"intersection",raw:`StyleProps &
SharedProps &
Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
> & {
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,elements:[{name:"intersection",raw:"ResponsiveProps<StaticStyleProps> & ResponsiveProps<DynamicStyleProps>",elements:[{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}},{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}}]},{name:"signature",type:"object",raw:`{
  /**
   * Used to locate this element in unit and end-to-end tests.
   * Under the hood, testID translates to data-testid on Web. On Mobile, testID
   * stays the same - testID
   */
  testID?: string;
}`,signature:{properties:[{key:"testID",value:{name:"string",required:!1},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`}]}},{name:"Pick",elements:[{name:"signature",type:"object",raw:`{
  /**
   * On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
   * On mobile, VoiceOver will read this string when a user selects the associated element.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabel
   */
  accessibilityLabel?: string;
  /**
   * On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
   * On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
   * when that result is not clear from the accessibility label.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
   * @link https://reactnative.dev/docs/accessibility#accessibilityhint
   */
  accessibilityHint?: string;
  /**
   * On web, maps to \`aria-labelledby\` and lists the id(s) of the element(s) that label the element on which the attribute is set.
   * On mobile (Android only), a reference to another element \`nativeID\` used to build complex forms.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android
   */
  accessibilityLabelledBy?: string;
  /**
   * Used for a11y to indicate the relationship between a controlled element and its controller
   * eg: a Button that controls the visibility of a Modal
   */
  id?: string;
  /** Used to associate a label with an input for accessibility */
  accessibilityLabelId?: string;
  /** Used to associate descriptive text to an input for accessibility */
  accessibilityDescriptionId?: string;
}`,signature:{properties:[{key:"accessibilityLabel",value:{name:"string",required:!1},description:`On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
On mobile, VoiceOver will read this string when a user selects the associated element.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
@link https://reactnative.dev/docs/accessibility#accessibilitylabel`},{key:"accessibilityHint",value:{name:"string",required:!1},description:`On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
when that result is not clear from the accessibility label.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
@link https://reactnative.dev/docs/accessibility#accessibilityhint`},{key:"accessibilityLabelledBy",value:{name:"string",required:!1},description:"On web, maps to `aria-labelledby` and lists the id(s) of the element(s) that label the element on which the attribute is set.\nOn mobile (Android only), a reference to another element `nativeID` used to build complex forms.\n@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby\n@link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android"},{key:"id",value:{name:"string",required:!1},description:`Used for a11y to indicate the relationship between a controlled element and its controller
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},{name:"union",raw:"'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'",elements:[{name:"literal",value:"'accessibilityLabel'"},{name:"literal",value:"'accessibilityLabelledBy'"},{name:"literal",value:"'accessibilityHint'"}]}],raw:`Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
>`},{name:"signature",type:"object",raw:`{
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]},{name:"literal",value:"'children'"}],raw:"Omit<BoxBaseProps, 'children'>"},{name:"signature",type:"object",raw:`{
  /**
   * Unique identifier for this carousel item.
   */
  id: string;
  /**
   * Component to render as the carousel item content.
   * Can be a React node or a function that receives the visibility state.
   */
  children?: CarouselItemRenderChildren | React.ReactNode;
  /**
   * @internal Used by Carousel to mark clone items for looping.
   * Clone items are non-interactive and excluded from tab order.
   */
  isClone?: boolean;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0},description:"Unique identifier for this carousel item."},{key:"children",value:{name:"union",raw:"CarouselItemRenderChildren | React.ReactNode",elements:[{name:"ReactFC",raw:"React.FC<{ isVisible: boolean }>",elements:[{name:"signature",type:"object",raw:"{ isVisible: boolean }",signature:{properties:[{key:"isVisible",value:{name:"boolean",required:!0}}]}}]},{name:"ReactReactNode",raw:"React.ReactNode"}],required:!1},description:`Component to render as the carousel item content.
Can be a React node or a function that receives the visibility state.`},{key:"isClone",value:{name:"boolean",required:!1},description:`@internal Used by Carousel to mark clone items for looping.
Clone items are non-interactive and excluded from tab order.`}]}}]}]},{name:"ReactFC",raw:"React.FC<CarouselItemProps>",elements:[{name:"intersection",raw:`Omit<BoxProps<BoxDefaultElement>, 'children'> &
CarouselItemBaseProps`,elements:[{name:"Omit",elements:[{name:"Polymorphic.Props",elements:[{name:"boxDefaultElement"},{name:"intersection",raw:`StyleProps &
SharedProps &
Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
> & {
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,elements:[{name:"intersection",raw:"ResponsiveProps<StaticStyleProps> & ResponsiveProps<DynamicStyleProps>",elements:[{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}},{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}}]},{name:"signature",type:"object",raw:`{
  /**
   * Used to locate this element in unit and end-to-end tests.
   * Under the hood, testID translates to data-testid on Web. On Mobile, testID
   * stays the same - testID
   */
  testID?: string;
}`,signature:{properties:[{key:"testID",value:{name:"string",required:!1},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`}]}},{name:"Pick",elements:[{name:"signature",type:"object",raw:`{
  /**
   * On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
   * On mobile, VoiceOver will read this string when a user selects the associated element.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabel
   */
  accessibilityLabel?: string;
  /**
   * On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
   * On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
   * when that result is not clear from the accessibility label.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
   * @link https://reactnative.dev/docs/accessibility#accessibilityhint
   */
  accessibilityHint?: string;
  /**
   * On web, maps to \`aria-labelledby\` and lists the id(s) of the element(s) that label the element on which the attribute is set.
   * On mobile (Android only), a reference to another element \`nativeID\` used to build complex forms.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android
   */
  accessibilityLabelledBy?: string;
  /**
   * Used for a11y to indicate the relationship between a controlled element and its controller
   * eg: a Button that controls the visibility of a Modal
   */
  id?: string;
  /** Used to associate a label with an input for accessibility */
  accessibilityLabelId?: string;
  /** Used to associate descriptive text to an input for accessibility */
  accessibilityDescriptionId?: string;
}`,signature:{properties:[{key:"accessibilityLabel",value:{name:"string",required:!1},description:`On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
On mobile, VoiceOver will read this string when a user selects the associated element.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
@link https://reactnative.dev/docs/accessibility#accessibilitylabel`},{key:"accessibilityHint",value:{name:"string",required:!1},description:`On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
when that result is not clear from the accessibility label.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
@link https://reactnative.dev/docs/accessibility#accessibilityhint`},{key:"accessibilityLabelledBy",value:{name:"string",required:!1},description:"On web, maps to `aria-labelledby` and lists the id(s) of the element(s) that label the element on which the attribute is set.\nOn mobile (Android only), a reference to another element `nativeID` used to build complex forms.\n@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby\n@link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android"},{key:"id",value:{name:"string",required:!1},description:`Used for a11y to indicate the relationship between a controlled element and its controller
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},{name:"union",raw:"'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'",elements:[{name:"literal",value:"'accessibilityLabel'"},{name:"literal",value:"'accessibilityLabelledBy'"},{name:"literal",value:"'accessibilityHint'"}]}],raw:`Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
>`},{name:"signature",type:"object",raw:`{
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]}],raw:`Polymorphic.Props<
  AsComponent,
  BoxBaseProps
>`},{name:"literal",value:"'children'"}],raw:"Omit<BoxProps<BoxDefaultElement>, 'children'>"},{name:"intersection",raw:`Omit<BoxBaseProps, 'children'> & {
  /**
   * Unique identifier for this carousel item.
   */
  id: string;
  /**
   * Component to render as the carousel item content.
   * Can be a React node or a function that receives the visibility state.
   */
  children?: CarouselItemRenderChildren | React.ReactNode;
  /**
   * @internal Used by Carousel to mark clone items for looping.
   * Clone items are non-interactive and excluded from tab order.
   */
  isClone?: boolean;
}`,elements:[{name:"Omit",elements:[{name:"intersection",raw:`StyleProps &
SharedProps &
Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
> & {
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,elements:[{name:"intersection",raw:"ResponsiveProps<StaticStyleProps> & ResponsiveProps<DynamicStyleProps>",elements:[{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}},{name:"signature",type:"object",raw:`{
  [key in keyof T]?: ResponsiveProp<T[key]>;
}`,signature:{properties:[{key:{name:"unknown",required:!1},value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}}]}}]},{name:"signature",type:"object",raw:`{
  /**
   * Used to locate this element in unit and end-to-end tests.
   * Under the hood, testID translates to data-testid on Web. On Mobile, testID
   * stays the same - testID
   */
  testID?: string;
}`,signature:{properties:[{key:"testID",value:{name:"string",required:!1},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`}]}},{name:"Pick",elements:[{name:"signature",type:"object",raw:`{
  /**
   * On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
   * On mobile, VoiceOver will read this string when a user selects the associated element.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabel
   */
  accessibilityLabel?: string;
  /**
   * On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
   * On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
   * when that result is not clear from the accessibility label.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
   * @link https://reactnative.dev/docs/accessibility#accessibilityhint
   */
  accessibilityHint?: string;
  /**
   * On web, maps to \`aria-labelledby\` and lists the id(s) of the element(s) that label the element on which the attribute is set.
   * On mobile (Android only), a reference to another element \`nativeID\` used to build complex forms.
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   * @link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android
   */
  accessibilityLabelledBy?: string;
  /**
   * Used for a11y to indicate the relationship between a controlled element and its controller
   * eg: a Button that controls the visibility of a Modal
   */
  id?: string;
  /** Used to associate a label with an input for accessibility */
  accessibilityLabelId?: string;
  /** Used to associate descriptive text to an input for accessibility */
  accessibilityDescriptionId?: string;
}`,signature:{properties:[{key:"accessibilityLabel",value:{name:"string",required:!1},description:`On web, maps to \`aria-label\` and defines a string value that labels an interactive element.
On mobile, VoiceOver will read this string when a user selects the associated element.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
@link https://reactnative.dev/docs/accessibility#accessibilitylabel`},{key:"accessibilityHint",value:{name:"string",required:!1},description:`On web, maps to \`aria-describedby\` and lists the id(s) of the element(s) that describe the element on which the attribute is set.
On mobile, a string that helps users understand what will happen when they perform an action on the accessibility element
when that result is not clear from the accessibility label.
@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
@link https://reactnative.dev/docs/accessibility#accessibilityhint`},{key:"accessibilityLabelledBy",value:{name:"string",required:!1},description:"On web, maps to `aria-labelledby` and lists the id(s) of the element(s) that label the element on which the attribute is set.\nOn mobile (Android only), a reference to another element `nativeID` used to build complex forms.\n@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby\n@link https://reactnative.dev/docs/accessibility#accessibilitylabelledby-android"},{key:"id",value:{name:"string",required:!1},description:`Used for a11y to indicate the relationship between a controlled element and its controller
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},{name:"union",raw:"'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'",elements:[{name:"literal",value:"'accessibilityLabel'"},{name:"literal",value:"'accessibilityLabelledBy'"},{name:"literal",value:"'accessibilityHint'"}]}],raw:`Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityLabelledBy' | 'accessibilityHint'
>`},{name:"signature",type:"object",raw:`{
  style?: React.CSSProperties;
  font?: ResponsiveProp<keyof typeof fontFamily>;
  /** Direction in which to absolutely pin the box. */
  pin?: PinningDirection;
  /** Add a border around all sides of the box. */
  bordered?: boolean;
  /** Add a border to the top side of the box. */
  borderedTop?: boolean;
  /** Add a border to the bottom side of the box. */
  borderedBottom?: boolean;
  /** Add a border to the leading side of the box. */
  borderedStart?: boolean;
  /** Add a border to the trailing side of the box. */
  borderedEnd?: boolean;
  /** Add a border to the leading and trailing sides of the box. */
  borderedHorizontal?: boolean;
  /** Add a border to the top and bottom sides of the box. */
  borderedVertical?: boolean;
  /** @danger This is a migration escape hatch. It is not intended to be used normally. */
  dangerouslySetBackground?: string;
}`,signature:{properties:[{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1}},{key:"font",value:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"T[key]",raw:"T[key]"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"phone",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"tablet",value:{name:"T[key]",raw:"T[key]",required:!1}},{key:"desktop",value:{name:"T[key]",raw:"T[key]",required:!1}}]}}],required:!1}},{key:"pin",value:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}],required:!1},description:"Direction in which to absolutely pin the box."},{key:"bordered",value:{name:"boolean",required:!1},description:"Add a border around all sides of the box."},{key:"borderedTop",value:{name:"boolean",required:!1},description:"Add a border to the top side of the box."},{key:"borderedBottom",value:{name:"boolean",required:!1},description:"Add a border to the bottom side of the box."},{key:"borderedStart",value:{name:"boolean",required:!1},description:"Add a border to the leading side of the box."},{key:"borderedEnd",value:{name:"boolean",required:!1},description:"Add a border to the trailing side of the box."},{key:"borderedHorizontal",value:{name:"boolean",required:!1},description:"Add a border to the leading and trailing sides of the box."},{key:"borderedVertical",value:{name:"boolean",required:!1},description:"Add a border to the top and bottom sides of the box."},{key:"dangerouslySetBackground",value:{name:"string",required:!1},description:"@danger This is a migration escape hatch. It is not intended to be used normally."}]}}]},{name:"literal",value:"'children'"}],raw:"Omit<BoxBaseProps, 'children'>"},{name:"signature",type:"object",raw:`{
  /**
   * Unique identifier for this carousel item.
   */
  id: string;
  /**
   * Component to render as the carousel item content.
   * Can be a React node or a function that receives the visibility state.
   */
  children?: CarouselItemRenderChildren | React.ReactNode;
  /**
   * @internal Used by Carousel to mark clone items for looping.
   * Clone items are non-interactive and excluded from tab order.
   */
  isClone?: boolean;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0},description:"Unique identifier for this carousel item."},{key:"children",value:{name:"union",raw:"CarouselItemRenderChildren | React.ReactNode",elements:[{name:"ReactFC",raw:"React.FC<{ isVisible: boolean }>",elements:[{name:"signature",type:"object",raw:"{ isVisible: boolean }",signature:{properties:[{key:"isVisible",value:{name:"boolean",required:!0}}]}}]},{name:"ReactReactNode",raw:"React.ReactNode"}],required:!1},description:`Component to render as the carousel item content.
Can be a React node or a function that receives the visibility state.`},{key:"isClone",value:{name:"boolean",required:!1},description:`@internal Used by Carousel to mark clone items for looping.
Clone items are non-interactive and excluded from tab order.`}]}}]}]}]}]}],raw:"CarouselItemElement[]"}],required:!1},description:`Children are required to be CarouselItems because we calculate
their offset relative to the parent container.`},{key:"drag",value:{name:"union",raw:"'none' | 'free' | 'snap'",elements:[{name:"literal",value:"'none'"},{name:"literal",value:"'free'"},{name:"literal",value:"'snap'"}],required:!1},description:`Defines the drag interaction behavior for the carousel.
'none' disables dragging completely.
'free' enables free-form dragging with natural deceleration when released.
'snap' enables dragging with automatic snapping to targets when released,
defined by snapMode.
@default 'snap'`},{key:"snapMode",value:{name:"union",raw:"'item' | 'page'",elements:[{name:"literal",value:"'item'"},{name:"literal",value:"'page'"}],required:!1},description:`Specifies the pagination and navigation strategy for the carousel.
'item' treats each item as a separate page for navigation, pagination, and snapping.
'page' groups items into pages based on visible area for navigation, pagination, and snapping.
This affects page calculation, navigation button behavior, and snap targets when dragging.
@default 'page'`},{key:"hideNavigation",value:{name:"boolean",required:!1},description:`Hides the navigation arrows (previous/next buttons and autoplay control).

@note If you hide navigation with autoplay, you must provide
an alternative mechanism for users to pause the carousel.`},{key:"hidePagination",value:{name:"boolean",required:!1},description:"Hides the pagination indicators (dots/bars showing current page)."},{key:"NavigationComponent",value:{name:"CarouselNavigationComponent",required:!1},description:`Custom component to render navigation arrows.
@default DefaultCarouselNavigation`},{key:"PaginationComponent",value:{name:"ReactFC",raw:"React.FC<CarouselPaginationComponentProps>",elements:[{name:"intersection",raw:`CarouselPaginationComponentBaseProps & {
  /**
   * Custom class name for the root element.
   */
  className?: string;
  /**
   * Custom styles for the component.
   */
  style?: React.CSSProperties;
}`,elements:[{name:"signature",type:"object",raw:`{
  /**
   * Total number of pages.
   */
  totalPages: number;
  /**
   * Index of the active page.
   */
  activePageIndex: number;
  /**
   * Callback for when a page is clicked.
   */
  onClickPage?: (index: number) => void;
  /**
   * Accessibility label for the go to page button. You can optionally pass a function that will receive the pageIndex as an argument, and return an accessibility label string.
   */
  paginationAccessibilityLabel?: string | ((pageIndex: number) => string);
  /**
   * Visual variant for the pagination indicators.
   * - 'pill': All indicators are pill-shaped (default)
   * - 'dot': Inactive indicators are small dots, active indicator expands to a pill
   * @default 'pill'
   * @note 'pill' variant is deprecated, use 'dot' instead
   */
  variant?: 'pill' | 'dot';
}`,signature:{properties:[{key:"totalPages",value:{name:"number",required:!0},description:"Total number of pages."},{key:"activePageIndex",value:{name:"number",required:!0},description:"Index of the active page."},{key:"onClickPage",value:{name:"signature",type:"function",raw:"(index: number) => void",signature:{arguments:[{type:{name:"number"},name:"index"}],return:{name:"void"}},required:!1},description:"Callback for when a page is clicked."},{key:"paginationAccessibilityLabel",value:{name:"union",raw:"string | ((pageIndex: number) => string)",elements:[{name:"string"},{name:"unknown"}],required:!1},description:"Accessibility label for the go to page button. You can optionally pass a function that will receive the pageIndex as an argument, and return an accessibility label string."},{key:"variant",value:{name:"union",raw:"'pill' | 'dot'",elements:[{name:"literal",value:"'pill'"},{name:"literal",value:"'dot'"}],required:!1},description:`Visual variant for the pagination indicators.
- 'pill': All indicators are pill-shaped (default)
- 'dot': Inactive indicators are small dots, active indicator expands to a pill
@default 'pill'
@note 'pill' variant is deprecated, use 'dot' instead`}]}},{name:"signature",type:"object",raw:`{
  /**
   * Custom class name for the root element.
   */
  className?: string;
  /**
   * Custom styles for the component.
   */
  style?: React.CSSProperties;
}`,signature:{properties:[{key:"className",value:{name:"string",required:!1},description:"Custom class name for the root element."},{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom styles for the component."}]}}]}],required:!1},description:`Custom component to render pagination indicators.
@default DefaultCarouselPagination`},{key:"title",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:`Title to display above the carousel.
When a string is provided, it will be rendered with default title styling.
When a React element is provided, it completely replaces the default title component
and styling.`},{key:"nextPageAccessibilityLabel",value:{name:"string",required:!1},description:`Accessibility label for the next page button.
@default 'Next page'`},{key:"previousPageAccessibilityLabel",value:{name:"string",required:!1},description:`Accessibility label for the previous page button.
@default 'Previous page'`},{key:"paginationAccessibilityLabel",value:{name:"union",raw:"string | ((pageIndex: number) => string)",elements:[{name:"string"},{name:"unknown"}],required:!1},description:`Accessibility label for the go to page button.
When a string is provided, it is used as-is for all indicators.
When a function is provided, it receives the page index and returns a label.
@default \`Go to page X\``},{key:"startAutoplayAccessibilityLabel",value:{name:"string",required:!1},description:`Accessibility label for starting autoplay.
@default 'Play Carousel'`},{key:"stopAutoplayAccessibilityLabel",value:{name:"string",required:!1},description:`Accessibility label for stopping autoplay.
@default 'Pause Carousel'`},{key:"pageChangeAccessibilityLabel",value:{name:"signature",type:"function",raw:"(activePageIndex: number, totalPages: number) => string",signature:{arguments:[{type:{name:"number"},name:"activePageIndex"},{type:{name:"number"},name:"totalPages"}],return:{name:"string"}},required:!1},description:"Accessibility label announced by screen readers when the page changes.\nReceives the current page index (0-based) and total pages.\n@default `Page X of Y`"},{key:"onChangePage",value:{name:"signature",type:"function",raw:"(activePageIndex: number) => void",signature:{arguments:[{type:{name:"number"},name:"activePageIndex"}],return:{name:"void"}},required:!1},description:"Callback fired when the carousel page changes."},{key:"onDragStart",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1},description:"Callback fired when the user starts dragging the carousel."},{key:"onDragEnd",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1},description:"Callback fired when the user ends dragging the carousel."},{key:"loop",value:{name:"boolean",required:!1},description:`Enables infinite looping. When true, the carousel will seamlessly
loop from the last item back to the first.
@note Requires at least 2 pages worth of content to function.`},{key:"autoplay",value:{name:"boolean",required:!1},description:"Whether autoplay is enabled for the carousel."},{key:"autoplayInterval",value:{name:"number",required:!1},description:`The interval in milliseconds for autoplay.
@default 3000 (3 seconds)`},{key:"paginationVariant",value:{name:"union",raw:"CarouselPaginationComponentBaseProps['variant']",required:!1},description:`Visual variant for the pagination indicators.
- 'pill': All indicators are pill-shaped (default)
- 'dot': Inactive indicators are small dots, active indicator expands to a pill
@default 'pill'
@note 'pill' variant is deprecated, use 'dot' instead`}]}}]},{name:"union",raw:`| 'autoplay'
| 'nextPageAccessibilityLabel'
| 'previousPageAccessibilityLabel'
| 'startAutoplayAccessibilityLabel'
| 'stopAutoplayAccessibilityLabel'`,elements:[{name:"literal",value:"'autoplay'"},{name:"literal",value:"'nextPageAccessibilityLabel'"},{name:"literal",value:"'previousPageAccessibilityLabel'"},{name:"literal",value:"'startAutoplayAccessibilityLabel'"},{name:"literal",value:"'stopAutoplayAccessibilityLabel'"}]}],raw:`Pick<
  CarouselBaseProps,
  | 'autoplay'
  | 'nextPageAccessibilityLabel'
  | 'previousPageAccessibilityLabel'
  | 'startAutoplayAccessibilityLabel'
  | 'stopAutoplayAccessibilityLabel'
>`},{name:"signature",type:"object",raw:`{
  /**
   * Callback for when the previous button is pressed.
   */
  onGoPrevious?: () => void;
  /**
   * Callback for when the next button is pressed.
   */
  onGoNext?: () => void;
  /**
   * Whether the previous button is disabled.
   */
  disableGoPrevious?: boolean;
  /**
   * Whether the next button is disabled.
   */
  disableGoNext?: boolean;
  /**
   * Whether autoplay is currently stopped.
   */
  isAutoplayStopped?: boolean;
  /**
   * Callback fired when the autoplay button is clicked.
   */
  onToggleAutoplay?: () => void;
}`,signature:{properties:[{key:"onGoPrevious",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1},description:"Callback for when the previous button is pressed."},{key:"onGoNext",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1},description:"Callback for when the next button is pressed."},{key:"disableGoPrevious",value:{name:"boolean",required:!1},description:"Whether the previous button is disabled."},{key:"disableGoNext",value:{name:"boolean",required:!1},description:"Whether the next button is disabled."},{key:"isAutoplayStopped",value:{name:"boolean",required:!1},description:"Whether autoplay is currently stopped."},{key:"onToggleAutoplay",value:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}},required:!1},description:"Callback fired when the autoplay button is clicked."}]}}]},{name:"signature",type:"object",raw:`{
  /**
   * Custom class name for the component.
   */
  className?: string;
  /**
   * Custom styles for the component.
   */
  style?: React.CSSProperties;
}`,signature:{properties:[{key:"className",value:{name:"string",required:!1},description:"Custom class name for the component."},{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom styles for the component."}]}}]}]},description:`Custom component to render navigation arrows.
@default DefaultCarouselNavigation`,defaultValue:{value:`memo(function DefaultCarouselNavigation({
  onGoPrevious,
  onGoNext,
  disableGoPrevious,
  disableGoNext,
  nextPageAccessibilityLabel = 'Next page',
  previousPageAccessibilityLabel = 'Previous page',
  autoplay,
  isAutoplayStopped,
  onToggleAutoplay,
  startAutoplayAccessibilityLabel = 'Play Carousel',
  stopAutoplayAccessibilityLabel = 'Pause Carousel',
  previousIcon = 'caretLeft',
  nextIcon = 'caretRight',
  startIcon = 'play',
  stopIcon = 'pause',
  variant = 'secondary',
  compact,
  className,
  classNames,
  style,
  styles,
  testIDMap,
  hideUnlessFocused,
}: DefaultCarouselNavigationProps) {
  return (
    <HStack
      className={cx(navigationCss, className, classNames?.root)}
      data-hiddenunlessfocused={hideUnlessFocused}
      gap={1}
      style={{ ...style, ...styles?.root }}
    >
      {autoplay && (
        <IconButton
          accessibilityLabel={
            isAutoplayStopped ? startAutoplayAccessibilityLabel : stopAutoplayAccessibilityLabel
          }
          className={classNames?.autoplayButton}
          compact={compact}
          name={isAutoplayStopped ? startIcon : stopIcon}
          onClick={onToggleAutoplay}
          style={styles?.autoplayButton}
          testID={testIDMap?.autoplayButton ?? 'carousel-autoplay-button'}
          variant={variant}
        />
      )}
      <IconButton
        accessibilityLabel={previousPageAccessibilityLabel}
        className={classNames?.previousButton}
        compact={compact}
        disabled={disableGoPrevious}
        name={previousIcon}
        onClick={onGoPrevious}
        style={styles?.previousButton}
        testID={testIDMap?.previousButton ?? 'carousel-previous-button'}
        variant={variant}
      />
      <IconButton
        accessibilityLabel={nextPageAccessibilityLabel}
        className={classNames?.nextButton}
        compact={compact}
        disabled={disableGoNext}
        name={nextIcon}
        onClick={onGoNext}
        style={styles?.nextButton}
        testID={testIDMap?.nextButton ?? 'carousel-next-button'}
        variant={variant}
      />
    </HStack>
  );
})`,computed:!0}},PaginationComponent:{required:!1,tsType:{name:"ReactFC",raw:"React.FC<CarouselPaginationComponentProps>",elements:[{name:"intersection",raw:`CarouselPaginationComponentBaseProps & {
  /**
   * Custom class name for the root element.
   */
  className?: string;
  /**
   * Custom styles for the component.
   */
  style?: React.CSSProperties;
}`,elements:[{name:"signature",type:"object",raw:`{
  /**
   * Total number of pages.
   */
  totalPages: number;
  /**
   * Index of the active page.
   */
  activePageIndex: number;
  /**
   * Callback for when a page is clicked.
   */
  onClickPage?: (index: number) => void;
  /**
   * Accessibility label for the go to page button. You can optionally pass a function that will receive the pageIndex as an argument, and return an accessibility label string.
   */
  paginationAccessibilityLabel?: string | ((pageIndex: number) => string);
  /**
   * Visual variant for the pagination indicators.
   * - 'pill': All indicators are pill-shaped (default)
   * - 'dot': Inactive indicators are small dots, active indicator expands to a pill
   * @default 'pill'
   * @note 'pill' variant is deprecated, use 'dot' instead
   */
  variant?: 'pill' | 'dot';
}`,signature:{properties:[{key:"totalPages",value:{name:"number",required:!0},description:"Total number of pages."},{key:"activePageIndex",value:{name:"number",required:!0},description:"Index of the active page."},{key:"onClickPage",value:{name:"signature",type:"function",raw:"(index: number) => void",signature:{arguments:[{type:{name:"number"},name:"index"}],return:{name:"void"}},required:!1},description:"Callback for when a page is clicked."},{key:"paginationAccessibilityLabel",value:{name:"union",raw:"string | ((pageIndex: number) => string)",elements:[{name:"string"},{name:"unknown"}],required:!1},description:"Accessibility label for the go to page button. You can optionally pass a function that will receive the pageIndex as an argument, and return an accessibility label string."},{key:"variant",value:{name:"union",raw:"'pill' | 'dot'",elements:[{name:"literal",value:"'pill'"},{name:"literal",value:"'dot'"}],required:!1},description:`Visual variant for the pagination indicators.
- 'pill': All indicators are pill-shaped (default)
- 'dot': Inactive indicators are small dots, active indicator expands to a pill
@default 'pill'
@note 'pill' variant is deprecated, use 'dot' instead`}]}},{name:"signature",type:"object",raw:`{
  /**
   * Custom class name for the root element.
   */
  className?: string;
  /**
   * Custom styles for the component.
   */
  style?: React.CSSProperties;
}`,signature:{properties:[{key:"className",value:{name:"string",required:!1},description:"Custom class name for the root element."},{key:"style",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Custom styles for the component."}]}}]}]},description:`Custom component to render pagination indicators.
@default DefaultCarouselPagination`,defaultValue:{value:`memo(function DefaultCarouselPagination({
  totalPages,
  activePageIndex,
  onClickPage,
  paginationAccessibilityLabel = defaultPaginationAccessibilityLabel,
  className,
  classNames,
  style,
  styles,
  testID = 'carousel-pagination',
  variant = 'pill',
}: DefaultCarouselPaginationProps) {
  const isDot = variant === 'dot';

  const getAccessibilityLabel = useCallback(
    (index: number) =>
      typeof paginationAccessibilityLabel === 'function'
        ? paginationAccessibilityLabel(index)
        : paginationAccessibilityLabel,
    [paginationAccessibilityLabel],
  );

  return (
    <HStack
      className={cx(defaultPaginationCss, className, classNames?.root)}
      gap={0.5}
      justifyContent="center"
      style={{ ...style, ...styles?.root }}
    >
      {totalPages > 0 ? (
        Array.from({ length: totalPages }, (_, index) =>
          isDot ? (
            <PaginationDot
              key={index}
              accessibilityLabel={getAccessibilityLabel(index)}
              className={classNames?.dot}
              isActive={index === activePageIndex}
              onClick={() => onClickPage?.(index)}
              style={styles?.dot}
              testID={\`\${testID}-\${index}\`}
            />
          ) : (
            <PaginationPill
              key={index}
              accessibilityLabel={getAccessibilityLabel(index)}
              className={cx(pillCss, classNames?.dot)}
              isActive={index === activePageIndex}
              onClick={() => onClickPage?.(index)}
              style={styles?.dot}
              testID={\`\${testID}-\${index}\`}
            />
          ),
        )
      ) : (
        <Pressable
          disabled
          aria-hidden="true"
          background="bgLine"
          borderColor="transparent"
          className={cx(isDot ? dotCss : pillCss, classNames?.dot)}
          style={{
            opacity: 0,
            width: isDot ? INDICATOR_INACTIVE_WIDTH : undefined,
            ...styles?.dot,
          }}
        />
      )}
    </HStack>
  );
})`,computed:!0}},title:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:`Title to display above the carousel.
When a string is provided, it will be rendered with default title styling.
When a React element is provided, it completely replaces the default title component
and styling.`},nextPageAccessibilityLabel:{required:!1,tsType:{name:"string"},description:`Accessibility label for the next page button.
@default 'Next page'`},previousPageAccessibilityLabel:{required:!1,tsType:{name:"string"},description:`Accessibility label for the previous page button.
@default 'Previous page'`},paginationAccessibilityLabel:{required:!1,tsType:{name:"union",raw:"string | ((pageIndex: number) => string)",elements:[{name:"string"},{name:"unknown"}]},description:`Accessibility label for the go to page button.
When a string is provided, it is used as-is for all indicators.
When a function is provided, it receives the page index and returns a label.
@default \`Go to page X\``},startAutoplayAccessibilityLabel:{required:!1,tsType:{name:"string"},description:`Accessibility label for starting autoplay.
@default 'Play Carousel'`},stopAutoplayAccessibilityLabel:{required:!1,tsType:{name:"string"},description:`Accessibility label for stopping autoplay.
@default 'Pause Carousel'`},pageChangeAccessibilityLabel:{required:!1,tsType:{name:"signature",type:"function",raw:"(activePageIndex: number, totalPages: number) => string",signature:{arguments:[{type:{name:"number"},name:"activePageIndex"},{type:{name:"number"},name:"totalPages"}],return:{name:"string"}}},description:"Accessibility label announced by screen readers when the page changes.\nReceives the current page index (0-based) and total pages.\n@default `Page X of Y`",defaultValue:{value:"(activePageIndex: number, totalPages: number) =>\n`Page ${activePageIndex + 1} of ${totalPages}`",computed:!1}},onChangePage:{required:!1,tsType:{name:"signature",type:"function",raw:"(activePageIndex: number) => void",signature:{arguments:[{type:{name:"number"},name:"activePageIndex"}],return:{name:"void"}}},description:"Callback fired when the carousel page changes."},onDragStart:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback fired when the user starts dragging the carousel."},onDragEnd:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:"Callback fired when the user ends dragging the carousel."},loop:{required:!1,tsType:{name:"boolean"},description:`Enables infinite looping. When true, the carousel will seamlessly
loop from the last item back to the first.
@note Requires at least 2 pages worth of content to function.`},autoplay:{required:!1,tsType:{name:"boolean"},description:"Whether autoplay is enabled for the carousel."},autoplayInterval:{required:!1,tsType:{name:"number"},description:`The interval in milliseconds for autoplay.
@default 3000 (3 seconds)`,defaultValue:{value:"3000",computed:!1}},paginationVariant:{required:!1,tsType:{name:"union",raw:"CarouselPaginationComponentBaseProps['variant']"},description:`Visual variant for the pagination indicators.
- 'pill': All indicators are pill-shaped (default)
- 'dot': Inactive indicators are small dots, active indicator expands to a pill
@default 'pill'
@note 'pill' variant is deprecated, use 'dot' instead`},className:{required:!1,tsType:{name:"string"},description:"Custom class name for the root element."},classNames:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /** Root element */
  root?: string;
  /** Title text element */
  title?: string;
  /** Navigation controls element */
  navigation?: string;
  /** Pagination indicators element */
  pagination?: string;
  /** Main carousel track element */
  carousel?: string;
  /** Outer carousel container element */
  carouselContainer?: string;
}`,signature:{properties:[{key:"root",value:{name:"string",required:!1},description:"Root element"},{key:"title",value:{name:"string",required:!1},description:"Title text element"},{key:"navigation",value:{name:"string",required:!1},description:"Navigation controls element"},{key:"pagination",value:{name:"string",required:!1},description:"Pagination indicators element"},{key:"carousel",value:{name:"string",required:!1},description:"Main carousel track element"},{key:"carouselContainer",value:{name:"string",required:!1},description:"Outer carousel container element"}]}},description:"Custom class names for individual elements of the Carousel component"},styles:{required:!1,tsType:{name:"signature",type:"object",raw:`{
  /** Root element */
  root?: React.CSSProperties;
  /** Title text element */
  title?: React.CSSProperties;
  /** Navigation controls element */
  navigation?: React.CSSProperties;
  /** Pagination indicators element */
  pagination?: React.CSSProperties;
  /** Main carousel track element */
  carousel?: React.CSSProperties;
  /** Outer carousel container element */
  carouselContainer?: React.CSSProperties;
}`,signature:{properties:[{key:"root",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Root element"},{key:"title",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Title text element"},{key:"navigation",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Navigation controls element"},{key:"pagination",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Pagination indicators element"},{key:"carousel",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Main carousel track element"},{key:"carouselContainer",value:{name:"ReactCSSProperties",raw:"React.CSSProperties",required:!1},description:"Outer carousel container element"}]}},description:"Custom styles for individual elements of the Carousel component"}}};export{Xa as C,He as D,ve as a,je as b};
