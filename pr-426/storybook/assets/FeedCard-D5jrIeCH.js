import{r as v,j as e}from"./iframe-CsG_6vZR.js";import{B as H}from"./Button-D2WSek5T.js";import{I as R}from"./IconButton-DNJ86Kiu.js";import{H as q}from"./HStack-DaDYipoP.js";import{C as j,a as G}from"./CardHeader-Bw9RvvHd.js";import{f as Q,g as K,d as N}from"./card-CqcYFcP-.js";import{V as C}from"./VStack-Cg_Yq2u4.js";import{T as P}from"./Text-B1CpMNU3.js";import{P as J}from"./Pictogram-CIj70k1H.js";import{S as Y}from"./SpotSquare-DXo54AMF.js";import{R as Z}from"./RemoteImage-CCsStlyO.js";import{g as $}from"./sizing-Do56D2dQ.js";import{L as _}from"./LikeButton-JHIqxT0X.js";const X={start:{width:"50%",height:"100%"},above:{width:"100%",aspectRatio:[2,1]},end:N},A=v.memo(function({placement:a="end",...l}){return l.type==="spotSquare"?e.jsx(Y,{...l,dimension:Q,name:l.name,testID:l.testID}):l.type==="pictogram"?e.jsx(J,{...l,dimension:K,name:l.name,testID:l.testID}):l.type==="image"?e.jsx(Z,{alt:l.alt??"",resizeMode:"cover",src:l.src,testID:l.testID,...X[a]}):null});A.__docgenInfo={description:"",methods:[],displayName:"CardMedia",props:{placement:{required:!1,tsType:{name:"union",raw:"'start' | 'above' | 'end'",elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'above'"},{name:"literal",value:"'end'"}]},description:"Informs how to auto-magically size the media.",defaultValue:{value:"'end'",computed:!1}},testID:{required:!1,tsType:{name:"string"},description:""},alt:{required:!1,tsType:{name:"string"},description:""}}};const W=v.memo(function({testID:a="card-body",title:l,description:c,mediaPlacement:t="end",onActionPress:r,actionLabel:d,action:b,pictogram:h,spotSquare:g,image:y,media:f,padding:n,paddingX:i,paddingY:o,paddingTop:s,paddingEnd:T,paddingBottom:B,paddingStart:D,numberOfLines:u=3,accessibilityLabel:p,children:x,compact:k,...w}){const L=B??o??n??(k?1:3),I=s??o??n??(k?2:3),O=D??i??n??(k?2:3),M=T??i??n??(k?2:3);let m=f;g&&(m=e.jsx(A,{name:g,placement:t,type:"spotSquare"})),h&&(m=e.jsx(A,{name:h,placement:t,type:"pictogram"})),y&&(m=e.jsx(A,{placement:t,src:y,type:"image"}));const U=!!m,V=w.maxWidth??(U?"70%":void 0),z=w.minHeight??(U?N.height:void 0),E=v.useMemo(()=>d&&r?e.jsx(H,{compact:!0,noScaleOnPress:!0,transparent:!0,accessibilityLabel:p??d,endIcon:"forwardArrow",flush:"start",numberOfLines:3,onClick:r,testID:`${a}-action`,variant:"primary",children:d}):b,[p,d,b,r,a]);return t==="above"?e.jsxs(C,{gap:2,paddingBottom:L,paddingTop:I,testID:a,...w,children:[m,e.jsxs(C,{gap:1,paddingEnd:M,paddingStart:O,children:[e.jsx(P,{as:"h3",font:"headline",numberOfLines:u,testID:`${a}-title`,transform:"none",children:l}),e.jsx(P,{color:"fgMuted",font:"label2",numberOfLines:u,testID:`${a}-description`,transform:"none",children:c}),E]})]}):e.jsxs(q,{alignItems:"center",flexGrow:1,gap:1,justifyContent:"space-between",minHeight:z,paddingBottom:L,paddingEnd:M,paddingStart:O,paddingTop:I,testID:a,...w,children:[e.jsxs(C,{alignItems:"flex-start",flexShrink:1,gap:2,maxWidth:V,children:[e.jsxs(C,{gap:1,maxWidth:"100%",paddingTop:m?0:2,children:[e.jsx(P,{as:"h3",font:"headline",numberOfLines:u,testID:`${a}-title`,transform:"none",children:l}),e.jsx(P,{color:"fgMuted",font:"label2",numberOfLines:u,testID:`${a}-description`,transform:"none",children:c})]}),x,E]}),m]})});W.__docgenInfo={description:"Provides an opinionated layout for the typical content of a Card: a title, description, media, and action",methods:[],displayName:"CardBody",props:{testID:{required:!1,tsType:{name:"string"},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`,defaultValue:{value:"'card-body'",computed:!1}},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""},font:{required:!1,tsType:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"fontFamily"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"fontFamily",required:!1}},{key:"phone",value:{name:"fontFamily",required:!1}},{key:"tablet",value:{name:"fontFamily",required:!1}},{key:"desktop",value:{name:"fontFamily",required:!1}}]}}]},description:""},pin:{required:!1,tsType:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}]},description:"Direction in which to absolutely pin the box."},bordered:{required:!1,tsType:{name:"boolean"},description:"Add a border around all sides of the box."},borderedTop:{required:!1,tsType:{name:"boolean"},description:"Add a border to the top side of the box."},borderedBottom:{required:!1,tsType:{name:"boolean"},description:"Add a border to the bottom side of the box."},borderedStart:{required:!1,tsType:{name:"boolean"},description:"Add a border to the leading side of the box."},borderedEnd:{required:!1,tsType:{name:"boolean"},description:"Add a border to the trailing side of the box."},borderedHorizontal:{required:!1,tsType:{name:"boolean"},description:"Add a border to the leading and trailing sides of the box."},borderedVertical:{required:!1,tsType:{name:"boolean"},description:"Add a border to the top and bottom sides of the box."},dangerouslySetBackground:{required:!1,tsType:{name:"string"},description:"@danger This is a migration escape hatch. It is not intended to be used normally."},onActionPress:{required:!1,tsType:{name:"ReactMouseEventHandler",raw:"React.MouseEventHandler"},description:""},title:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Text to be displayed in TextHeadline when it's a string, unless you pass a ReactNode"},description:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"Text to be displayed in TextBody when it's a string, unless you pass a ReactNode"},numberOfLines:{required:!1,tsType:{name:"number"},description:`Maximum number of lines shown. Text that exceeds will be truncated.
Only applies to description
@default 3`,defaultValue:{value:"3",computed:!1}},compact:{required:!1,tsType:{name:"boolean"},description:"Enables compact spacing around CardBody content"},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},mediaPlacement:{required:!1,tsType:{name:"union",raw:"'start' | 'above' | 'end'",elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'above'"},{name:"literal",value:"'end'"}]},description:`Above places media above text content, start or end places media to the side of text content
@default end`,defaultValue:{value:"'end'",computed:!1}},spotSquare:{required:!1,tsType:{name:"union",raw:`| 'accessToAdvancedCharts'
| 'addCard'
| 'addEth'
| 'addMultipleCrypto'
| 'addPasswordProtection'
| 'addPhoneNumber'
| 'advancedTrading'
| 'advancedTradingChartsIndicatorsCandles'
| 'advancedTradingUi'
| 'announcementAdvancedTrading'
| 'appTrackingTransparency'
| 'assetForward'
| 'assetRefresh'
| 'automaticPayments'
| 'backedByUsDollar'
| 'baseCautionMedium'
| 'baseChartMedium'
| 'baseCheckMedium'
| 'baseCheckTrophyMedium'
| 'baseCoinCryptoMedium'
| 'baseCoinNetworkMedium'
| 'baseConnectMedium'
| 'baseCreatorCoin'
| 'baseDecentralizationMedium'
| 'baseDiamondMedium'
| 'basedInUsa'
| 'baseEmptyMedium'
| 'baseErrorButterflyMedium'
| 'baseErrorMedium'
| 'baseIdMedium'
| 'baseLoadingMedium'
| 'baseLocationMedium'
| 'baseMintNftMedium'
| 'baseNetworkMedium'
| 'baseNftMedium'
| 'basePaycoinMedium'
| 'basePeopleMedium'
| 'basePiechartMedium'
| 'baseQuickBuy'
| 'baseRewardChest'
| 'baseRewardClam'
| 'baseRewardPlate'
| 'baseRewardPodium'
| 'baseRewardSun'
| 'baseRewardTrophyEmblem'
| 'baseRewardTrophyStars'
| 'baseSecurityMedium'
| 'baseSendMedium'
| 'baseSwitch'
| 'baseTargetMedium'
| 'baseUsdcMedium'
| 'bigBtc'
| 'blockchain'
| 'bonusFivePercent'
| 'bonusTwoPercent'
| 'boostedCard'
| 'borrowLimitsAddressed'
| 'borrowWallet'
| 'bridging'
| 'browserExtension'
| 'bullishCase'
| 'cardAnnouncement'
| 'cardAutoReload'
| 'cardBlocked'
| 'cardDeclined'
| 'cardShipped'
| 'cbEthWrappingUnavailable'
| 'checkVerifacation'
| 'coinbaseCardLock'
| 'coinbaseCardPocket'
| 'coinbaseCardSparkle'
| 'coinbaseFees'
| 'coinbaseLock'
| 'coinbaseOneBoostedCard'
| 'coinbaseOneBoostedCardCB1'
| 'coinbaseOneConcierge'
| 'coinbaseOneDiscountedAmount'
| 'coinbaseOneEarn'
| 'coinbaseOneLogo'
| 'coinbaseOneRewards'
| 'coinbaseOneSavingFunds'
| 'coinbaseOneStakeOrWrap'
| 'coinbaseOneStaking'
| 'coinbaseOneStarToken'
| 'coinbaseOneTokenRewards'
| 'coinbaseOneUSDC'
| 'coinbaseOneZero'
| 'coinbaseOneZeroPortal'
| 'coinbaseUnlockOffers'
| 'coinFifty'
| 'collectingNfts'
| 'commerceAccounting'
| 'commerceInvoices'
| 'completeAQuiz'
| 'confirmAddress'
| 'confirmEmail'
| 'confirmIDCard'
| 'confirmSocialSecurity'
| 'congratulationsOnEarningCrypto'
| 'contactsListWarning'
| 'crossBorderPayments'
| 'cryptoAndMore'
| 'cryptoApps'
| 'cryptoAssets'
| 'cryptoEconomy'
| 'cryptoEconomyArrows'
| 'cryptoForBeginners'
| 'cryptoPortfolio'
| 'cryptoWallet'
| 'dappWallet'
| 'darkModeIntroduction'
| 'decentralization'
| 'decentralizedWebWeb3'
| 'defiDecentralizedBorrowingLending'
| 'defiDecentralizedTradingExchange'
| 'defiEarn'
| 'defiEarnAnnouncement'
| 'defiHow'
| 'defiNfts'
| 'defiRisk'
| 'didDecentralizedIdentity'
| 'digitalCollectibles'
| 'directDepositExcitement'
| 'documentCertified'
| 'documentSuccess'
| 'earn'
| 'earnInterest'
| 'earnInterestOnCryptocurrency'
| 'earnToLearn'
| 'encryptedEverything'
| 'estimatedAmount'
| 'eth2SendSell'
| 'ethStakeOrWrap'
| 'ethStakeOrWrapTwo'
| 'ethStaking'
| 'ethStakingRewards'
| 'fileYourCryptoTaxesCheckOther'
| 'fileYourCryptoTaxesOther'
| 'focusLimitOrders'
| 'frameEmpty'
| 'freeBtc'
| 'futures'
| 'gainsAndLosses'
| 'gasFeesNetworkFees'
| 'getStartedInMinutes'
| 'giftBoxCrypto'
| 'gifting'
| 'globalTransactions'
| 'goldSilverFutures'
| 'guideBullCase'
| 'guideCryptoBeginner'
| 'guideFiveThings'
| 'guideNftDefi'
| 'guideStartInvesting'
| 'hardwareWallets'
| 'holdCrypto'
| 'holdingCrypto'
| 'idError'
| 'insuranceProtection'
| 'interestForYou'
| 'invest'
| 'layeredNetworks'
| 'layerThree'
| 'lightningNetworkSend'
| 'linkCoinbaseWallet'
| 'linkingYourWalletToYourCoinbaseAccount'
| 'miniGift'
| 'mining'
| 'moneyDecentralized'
| 'moneyRewards'
| 'multicoinSupport'
| 'multiPlatformMobileAppBrowserExtension'
| 'multipleAccountsWalletsForOneUser'
| 'nft'
| 'nftTag'
| 'noFees'
| 'noPortfolio'
| 'notificationsAlt'
| 'nuxChecklist'
| 'nuxEarnCrypto'
| 'nuxEarnYield'
| 'nuxPopularAssets'
| 'nuxRecurringBuys'
| 'offersEmpty'
| 'onTheList'
| 'openEmail'
| 'optInPushNotificationsEmail'
| 'options'
| 'outage'
| 'p2pPayments'
| 'performance'
| 'phoneNotifications'
| 'phoneNumber'
| 'pixBankDeposits'
| 'pixDeposits'
| 'portfolioPerformance'
| 'poweredByEthereum'
| 'predictionsMarkets'
| 'priceAlerts'
| 'primeDeFi'
| 'primeEarn'
| 'primeStaking'
| 'quickAndSimple'
| 'readyToTrade'
| 'recommendInvestments'
| 'referralsPeople'
| 'refresh'
| 'refreshMobileApp'
| 'retailUSDCRewards'
| 'rewardExpiring'
| 'saveTheDate'
| 'secureAndTrusted'
| 'secureGlobalTransactions'
| 'secureStorage'
| 'securityShield'
| 'selfCustody'
| 'semiCustodial'
| 'sendCryptoFaster'
| 'shareOnSocialMedia'
| 'sidechain'
| 'sparkleToken'
| 'stableValue'
| 'staking'
| 'starToken'
| 'startToday'
| 'stayInControlSelfHostedWalletsStorage'
| 'stressTestedColdStorage'
| 'swapEth'
| 'switchAdvancedToSimpleTrading'
| 'switchReward'
| 'taxDocuments'
| 'taxesDetails'
| 'tradeImmediately'
| 'transferringCrypto'
| 'trendingHotAssets'
| 'unsupportedAsset'
| 'verifyEmail'
| 'verifyInfo'
| 'waitlistSignup'
| 'walletApp'
| 'walletNotifications'
| 'walletQuestsChest'
| 'walletQuestsTrophy'
| 'walletSecurity'
| 'watchVideos'
| 'wrapEth'
| 'yieldCenter'
| 'yieldCenterUSDC'`,elements:[{name:"literal",value:"'accessToAdvancedCharts'"},{name:"literal",value:"'addCard'"},{name:"literal",value:"'addEth'"},{name:"literal",value:"'addMultipleCrypto'"},{name:"literal",value:"'addPasswordProtection'"},{name:"literal",value:"'addPhoneNumber'"},{name:"literal",value:"'advancedTrading'"},{name:"literal",value:"'advancedTradingChartsIndicatorsCandles'"},{name:"literal",value:"'advancedTradingUi'"},{name:"literal",value:"'announcementAdvancedTrading'"},{name:"literal",value:"'appTrackingTransparency'"},{name:"literal",value:"'assetForward'"},{name:"literal",value:"'assetRefresh'"},{name:"literal",value:"'automaticPayments'"},{name:"literal",value:"'backedByUsDollar'"},{name:"literal",value:"'baseCautionMedium'"},{name:"literal",value:"'baseChartMedium'"},{name:"literal",value:"'baseCheckMedium'"},{name:"literal",value:"'baseCheckTrophyMedium'"},{name:"literal",value:"'baseCoinCryptoMedium'"},{name:"literal",value:"'baseCoinNetworkMedium'"},{name:"literal",value:"'baseConnectMedium'"},{name:"literal",value:"'baseCreatorCoin'"},{name:"literal",value:"'baseDecentralizationMedium'"},{name:"literal",value:"'baseDiamondMedium'"},{name:"literal",value:"'basedInUsa'"},{name:"literal",value:"'baseEmptyMedium'"},{name:"literal",value:"'baseErrorButterflyMedium'"},{name:"literal",value:"'baseErrorMedium'"},{name:"literal",value:"'baseIdMedium'"},{name:"literal",value:"'baseLoadingMedium'"},{name:"literal",value:"'baseLocationMedium'"},{name:"literal",value:"'baseMintNftMedium'"},{name:"literal",value:"'baseNetworkMedium'"},{name:"literal",value:"'baseNftMedium'"},{name:"literal",value:"'basePaycoinMedium'"},{name:"literal",value:"'basePeopleMedium'"},{name:"literal",value:"'basePiechartMedium'"},{name:"literal",value:"'baseQuickBuy'"},{name:"literal",value:"'baseRewardChest'"},{name:"literal",value:"'baseRewardClam'"},{name:"literal",value:"'baseRewardPlate'"},{name:"literal",value:"'baseRewardPodium'"},{name:"literal",value:"'baseRewardSun'"},{name:"literal",value:"'baseRewardTrophyEmblem'"},{name:"literal",value:"'baseRewardTrophyStars'"},{name:"literal",value:"'baseSecurityMedium'"},{name:"literal",value:"'baseSendMedium'"},{name:"literal",value:"'baseSwitch'"},{name:"literal",value:"'baseTargetMedium'"},{name:"literal",value:"'baseUsdcMedium'"},{name:"literal",value:"'bigBtc'"},{name:"literal",value:"'blockchain'"},{name:"literal",value:"'bonusFivePercent'"},{name:"literal",value:"'bonusTwoPercent'"},{name:"literal",value:"'boostedCard'"},{name:"literal",value:"'borrowLimitsAddressed'"},{name:"literal",value:"'borrowWallet'"},{name:"literal",value:"'bridging'"},{name:"literal",value:"'browserExtension'"},{name:"literal",value:"'bullishCase'"},{name:"literal",value:"'cardAnnouncement'"},{name:"literal",value:"'cardAutoReload'"},{name:"literal",value:"'cardBlocked'"},{name:"literal",value:"'cardDeclined'"},{name:"literal",value:"'cardShipped'"},{name:"literal",value:"'cbEthWrappingUnavailable'"},{name:"literal",value:"'checkVerifacation'"},{name:"literal",value:"'coinbaseCardLock'"},{name:"literal",value:"'coinbaseCardPocket'"},{name:"literal",value:"'coinbaseCardSparkle'"},{name:"literal",value:"'coinbaseFees'"},{name:"literal",value:"'coinbaseLock'"},{name:"literal",value:"'coinbaseOneBoostedCard'"},{name:"literal",value:"'coinbaseOneBoostedCardCB1'"},{name:"literal",value:"'coinbaseOneConcierge'"},{name:"literal",value:"'coinbaseOneDiscountedAmount'"},{name:"literal",value:"'coinbaseOneEarn'"},{name:"literal",value:"'coinbaseOneLogo'"},{name:"literal",value:"'coinbaseOneRewards'"},{name:"literal",value:"'coinbaseOneSavingFunds'"},{name:"literal",value:"'coinbaseOneStakeOrWrap'"},{name:"literal",value:"'coinbaseOneStaking'"},{name:"literal",value:"'coinbaseOneStarToken'"},{name:"literal",value:"'coinbaseOneTokenRewards'"},{name:"literal",value:"'coinbaseOneUSDC'"},{name:"literal",value:"'coinbaseOneZero'"},{name:"literal",value:"'coinbaseOneZeroPortal'"},{name:"literal",value:"'coinbaseUnlockOffers'"},{name:"literal",value:"'coinFifty'"},{name:"literal",value:"'collectingNfts'"},{name:"literal",value:"'commerceAccounting'"},{name:"literal",value:"'commerceInvoices'"},{name:"literal",value:"'completeAQuiz'"},{name:"literal",value:"'confirmAddress'"},{name:"literal",value:"'confirmEmail'"},{name:"literal",value:"'confirmIDCard'"},{name:"literal",value:"'confirmSocialSecurity'"},{name:"literal",value:"'congratulationsOnEarningCrypto'"},{name:"literal",value:"'contactsListWarning'"},{name:"literal",value:"'crossBorderPayments'"},{name:"literal",value:"'cryptoAndMore'"},{name:"literal",value:"'cryptoApps'"},{name:"literal",value:"'cryptoAssets'"},{name:"literal",value:"'cryptoEconomy'"},{name:"literal",value:"'cryptoEconomyArrows'"},{name:"literal",value:"'cryptoForBeginners'"},{name:"literal",value:"'cryptoPortfolio'"},{name:"literal",value:"'cryptoWallet'"},{name:"literal",value:"'dappWallet'"},{name:"literal",value:"'darkModeIntroduction'"},{name:"literal",value:"'decentralization'"},{name:"literal",value:"'decentralizedWebWeb3'"},{name:"literal",value:"'defiDecentralizedBorrowingLending'"},{name:"literal",value:"'defiDecentralizedTradingExchange'"},{name:"literal",value:"'defiEarn'"},{name:"literal",value:"'defiEarnAnnouncement'"},{name:"literal",value:"'defiHow'"},{name:"literal",value:"'defiNfts'"},{name:"literal",value:"'defiRisk'"},{name:"literal",value:"'didDecentralizedIdentity'"},{name:"literal",value:"'digitalCollectibles'"},{name:"literal",value:"'directDepositExcitement'"},{name:"literal",value:"'documentCertified'"},{name:"literal",value:"'documentSuccess'"},{name:"literal",value:"'earn'"},{name:"literal",value:"'earnInterest'"},{name:"literal",value:"'earnInterestOnCryptocurrency'"},{name:"literal",value:"'earnToLearn'"},{name:"literal",value:"'encryptedEverything'"},{name:"literal",value:"'estimatedAmount'"},{name:"literal",value:"'eth2SendSell'"},{name:"literal",value:"'ethStakeOrWrap'"},{name:"literal",value:"'ethStakeOrWrapTwo'"},{name:"literal",value:"'ethStaking'"},{name:"literal",value:"'ethStakingRewards'"},{name:"literal",value:"'fileYourCryptoTaxesCheckOther'"},{name:"literal",value:"'fileYourCryptoTaxesOther'"},{name:"literal",value:"'focusLimitOrders'"},{name:"literal",value:"'frameEmpty'"},{name:"literal",value:"'freeBtc'"},{name:"literal",value:"'futures'"},{name:"literal",value:"'gainsAndLosses'"},{name:"literal",value:"'gasFeesNetworkFees'"},{name:"literal",value:"'getStartedInMinutes'"},{name:"literal",value:"'giftBoxCrypto'"},{name:"literal",value:"'gifting'"},{name:"literal",value:"'globalTransactions'"},{name:"literal",value:"'goldSilverFutures'"},{name:"literal",value:"'guideBullCase'"},{name:"literal",value:"'guideCryptoBeginner'"},{name:"literal",value:"'guideFiveThings'"},{name:"literal",value:"'guideNftDefi'"},{name:"literal",value:"'guideStartInvesting'"},{name:"literal",value:"'hardwareWallets'"},{name:"literal",value:"'holdCrypto'"},{name:"literal",value:"'holdingCrypto'"},{name:"literal",value:"'idError'"},{name:"literal",value:"'insuranceProtection'"},{name:"literal",value:"'interestForYou'"},{name:"literal",value:"'invest'"},{name:"literal",value:"'layeredNetworks'"},{name:"literal",value:"'layerThree'"},{name:"literal",value:"'lightningNetworkSend'"},{name:"literal",value:"'linkCoinbaseWallet'"},{name:"literal",value:"'linkingYourWalletToYourCoinbaseAccount'"},{name:"literal",value:"'miniGift'"},{name:"literal",value:"'mining'"},{name:"literal",value:"'moneyDecentralized'"},{name:"literal",value:"'moneyRewards'"},{name:"literal",value:"'multicoinSupport'"},{name:"literal",value:"'multiPlatformMobileAppBrowserExtension'"},{name:"literal",value:"'multipleAccountsWalletsForOneUser'"},{name:"literal",value:"'nft'"},{name:"literal",value:"'nftTag'"},{name:"literal",value:"'noFees'"},{name:"literal",value:"'noPortfolio'"},{name:"literal",value:"'notificationsAlt'"},{name:"literal",value:"'nuxChecklist'"},{name:"literal",value:"'nuxEarnCrypto'"},{name:"literal",value:"'nuxEarnYield'"},{name:"literal",value:"'nuxPopularAssets'"},{name:"literal",value:"'nuxRecurringBuys'"},{name:"literal",value:"'offersEmpty'"},{name:"literal",value:"'onTheList'"},{name:"literal",value:"'openEmail'"},{name:"literal",value:"'optInPushNotificationsEmail'"},{name:"literal",value:"'options'"},{name:"literal",value:"'outage'"},{name:"literal",value:"'p2pPayments'"},{name:"literal",value:"'performance'"},{name:"literal",value:"'phoneNotifications'"},{name:"literal",value:"'phoneNumber'"},{name:"literal",value:"'pixBankDeposits'"},{name:"literal",value:"'pixDeposits'"},{name:"literal",value:"'portfolioPerformance'"},{name:"literal",value:"'poweredByEthereum'"},{name:"literal",value:"'predictionsMarkets'"},{name:"literal",value:"'priceAlerts'"},{name:"literal",value:"'primeDeFi'"},{name:"literal",value:"'primeEarn'"},{name:"literal",value:"'primeStaking'"},{name:"literal",value:"'quickAndSimple'"},{name:"literal",value:"'readyToTrade'"},{name:"literal",value:"'recommendInvestments'"},{name:"literal",value:"'referralsPeople'"},{name:"literal",value:"'refresh'"},{name:"literal",value:"'refreshMobileApp'"},{name:"literal",value:"'retailUSDCRewards'"},{name:"literal",value:"'rewardExpiring'"},{name:"literal",value:"'saveTheDate'"},{name:"literal",value:"'secureAndTrusted'"},{name:"literal",value:"'secureGlobalTransactions'"},{name:"literal",value:"'secureStorage'"},{name:"literal",value:"'securityShield'"},{name:"literal",value:"'selfCustody'"},{name:"literal",value:"'semiCustodial'"},{name:"literal",value:"'sendCryptoFaster'"},{name:"literal",value:"'shareOnSocialMedia'"},{name:"literal",value:"'sidechain'"},{name:"literal",value:"'sparkleToken'"},{name:"literal",value:"'stableValue'"},{name:"literal",value:"'staking'"},{name:"literal",value:"'starToken'"},{name:"literal",value:"'startToday'"},{name:"literal",value:"'stayInControlSelfHostedWalletsStorage'"},{name:"literal",value:"'stressTestedColdStorage'"},{name:"literal",value:"'swapEth'"},{name:"literal",value:"'switchAdvancedToSimpleTrading'"},{name:"literal",value:"'switchReward'"},{name:"literal",value:"'taxDocuments'"},{name:"literal",value:"'taxesDetails'"},{name:"literal",value:"'tradeImmediately'"},{name:"literal",value:"'transferringCrypto'"},{name:"literal",value:"'trendingHotAssets'"},{name:"literal",value:"'unsupportedAsset'"},{name:"literal",value:"'verifyEmail'"},{name:"literal",value:"'verifyInfo'"},{name:"literal",value:"'waitlistSignup'"},{name:"literal",value:"'walletApp'"},{name:"literal",value:"'walletNotifications'"},{name:"literal",value:"'walletQuestsChest'"},{name:"literal",value:"'walletQuestsTrophy'"},{name:"literal",value:"'walletSecurity'"},{name:"literal",value:"'watchVideos'"},{name:"literal",value:"'wrapEth'"},{name:"literal",value:"'yieldCenter'"},{name:"literal",value:"'yieldCenterUSDC'"}]},description:"The name of the SpotSquare Illustration to use in CardMedia."},pictogram:{required:!1,tsType:{name:"union",raw:`| '2fa'
| 'accountsNavigation'
| 'accreditedInvestor'
| 'add'
| 'addCard'
| 'addPayment'
| 'addPhone'
| 'addressBook'
| 'addToWatchlist'
| 'addWallet'
| 'advancedTradingDesktop'
| 'advancedTradingNavigation'
| 'advancedTradingRebates'
| 'agent'
| 'alerts'
| 'alertsCoinbaseOne'
| 'analyticsNavigation'
| 'apartOfDropsNft'
| 'applyForHigherLimits'
| 'apyInterest'
| 'arrowsUpDown'
| 'assetEncryption'
| 'assetHubNavigation'
| 'assetManagement'
| 'assetManagementNavigation'
| 'assetMeasurements'
| 'assetMovement'
| 'authenticationApp'
| 'authenticator'
| 'authenticatorAlt'
| 'authenticatorProgress'
| 'avatarAa'
| 'avatarAb'
| 'avatarAc'
| 'avatarAd'
| 'avatarAe'
| 'avatarAf'
| 'avatarAg'
| 'avatarAh'
| 'avatarAi'
| 'avatarAj'
| 'avatarBa'
| 'avatarBb'
| 'avatarBc'
| 'avatarBd'
| 'avatarBe'
| 'avatarBf'
| 'avatarBg'
| 'avatarBh'
| 'avatarBi'
| 'avatarBj'
| 'avatarCa'
| 'avatarCb'
| 'avatarCc'
| 'avatarCd'
| 'avatarCe'
| 'avatarCf'
| 'avatarCg'
| 'avatarCh'
| 'avatarCi'
| 'avatarCj'
| 'avatarDa'
| 'avatarDb'
| 'avatarDc'
| 'avatarDd'
| 'avatarDe'
| 'avatarDf'
| 'avatarDg'
| 'avatarDh'
| 'avatarDi'
| 'avatarDj'
| 'avatarEa'
| 'avatarEb'
| 'avatarEc'
| 'avatarEd'
| 'avatarEe'
| 'avatarEf'
| 'avatarEg'
| 'avatarEh'
| 'avatarEi'
| 'avatarEj'
| 'avatarFa'
| 'avatarFb'
| 'avatarFc'
| 'avatarFd'
| 'avatarFe'
| 'avatarFf'
| 'avatarFg'
| 'avatarFh'
| 'avatarFi'
| 'avatarFj'
| 'avatarGa'
| 'avatarGb'
| 'avatarGc'
| 'avatarGd'
| 'avatarGe'
| 'avatarGf'
| 'avatarGg'
| 'avatarGh'
| 'avatarGi'
| 'avatarGj'
| 'avatarHa'
| 'avatarHb'
| 'avatarHc'
| 'avatarHd'
| 'avatarHe'
| 'avatarHf'
| 'avatarHg'
| 'avatarHh'
| 'avatarHi'
| 'avatarHj'
| 'avatarIa'
| 'avatarIb'
| 'avatarIc'
| 'avatarId'
| 'avatarIe'
| 'avatarIf'
| 'avatarIg'
| 'avatarIh'
| 'avatarIi'
| 'avatarIj'
| 'avatarJa'
| 'avatarJb'
| 'avatarJc'
| 'avatarJd'
| 'avatarJe'
| 'avatarJf'
| 'avatarJg'
| 'avatarJh'
| 'avatarJi'
| 'avatarJj'
| 'barChart'
| 'baseAscend'
| 'baseCertificateStar'
| 'baseChartSmall'
| 'baseChatBubbleHeart'
| 'baseCheckSmall'
| 'baseCoinCryptoSmall'
| 'baseCoinNetworkSmall'
| 'baseCoinStack'
| 'baseCoinStar'
| 'baseComet'
| 'baseComputer'
| 'baseConfetti'
| 'baseConnectApps'
| 'baseConnectSmall'
| 'baseCreatorCoin'
| 'baseDecentralizationSmall'
| 'baseDiamondSmall'
| 'baseDiamondTrophy'
| 'baseDoor'
| 'baseEarnedBadge'
| 'baseEmptySmall'
| 'baseErrorButterflySmall'
| 'baseErrorSmall'
| 'baseExchange'
| 'baseFire'
| 'baseGem'
| 'baseGlobe'
| 'baseHandStar'
| 'baseLayout'
| 'baseLightningbolt'
| 'baseLoadingSmall'
| 'baseLocationSmall'
| 'baseLogo'
| 'baseLogoNavigation'
| 'baseMedal'
| 'baseMessaging'
| 'baseMintNftSmall'
| 'baseNetworkSmall'
| 'baseNftSmall'
| 'basePaycoinSmall'
| 'basePeopleSmall'
| 'basePiechartSmall'
| 'basePlant'
| 'basePower'
| 'baseRibbon'
| 'baseRocket'
| 'baseRockon'
| 'baseSaved'
| 'baseSecuritySmall'
| 'baseSendSmall'
| 'baseSignin'
| 'baseSmile'
| 'baseStack'
| 'baseStar'
| 'baseTargetSmall'
| 'baseTile'
| 'bigBtcSend'
| 'bitcoin'
| 'bitcoinPizza'
| 'bitcoinRewards'
| 'bitcoinWhitePaper'
| 'blockchainConnection'
| 'bonusFivePercent'
| 'bonusTwoPercent'
| 'borrowCoins'
| 'borrowingLending'
| 'borrowNavigation'
| 'browser'
| 'browserMultiPlatform'
| 'browserTransaction'
| 'btcOneHundred'
| 'bundle'
| 'businessProduct'
| 'calculator'
| 'calendar'
| 'calendarCaution'
| 'calendarHighlight'
| 'candleSticksGraph'
| 'cardBlocked'
| 'cardDeclined'
| 'cardNavigation'
| 'cardSuccess'
| 'cb1BankTransfers'
| 'chart'
| 'chat'
| 'checkmark'
| 'clock'
| 'cloudNavigation'
| 'coinbaseLogoAdvancedBrand'
| 'coinbaseLogoNavigation'
| 'coinbaseOneAuthenticator'
| 'coinbaseOneChat'
| 'coinbaseOneEarn'
| 'coinbaseOneEarnCoins'
| 'coinbaseOneEarnCoinsLogo'
| 'coinbaseOneFiat'
| 'coinbaseOneLogo'
| 'coinbaseOneProductIcon'
| 'coinbaseOneProductInvestWeekly'
| 'coinbaseOneRefreshed'
| 'coinbaseOneShield'
| 'coinbaseOneTrade'
| 'coinbaseOneTrusted'
| 'coinbaseOneUnlimitedRewards'
| 'coinbaseUnlockOffers'
| 'coinbaseWalletApp'
| 'coinFocus'
| 'coinShare'
| 'coldStorageCheck'
| 'collectionOfAssets'
| 'commerceCheckout'
| 'commerceInvoice'
| 'commerceNavigation'
| 'commodities'
| 'completeQuiz'
| 'complianceNavigation'
| 'congratulations'
| 'connectNavigation'
| 'contactInfo'
| 'controlWalletStorage'
| 'creative'
| 'creditCard'
| 'crypto101'
| 'cryptoCard'
| 'cryptoCoins'
| 'cryptoFolder'
| 'crystalBallInsight'
| 'custodialJourney'
| 'custodyNavigation'
| 'dataMarketplaceNavigation'
| 'decentralizationEverything'
| 'decentralizedExchange'
| 'decentralizedIdentity'
| 'decentralizedWeb3'
| 'defiEarnMoment'
| 'delegate'
| 'delegateNavigation'
| 'derivativesNavigation'
| 'derivativesProduct'
| 'developerPlatformNavigation'
| 'developerSDKNavigation'
| 'directDepositNavigation'
| 'dollarShowcase'
| 'done'
| 'driversLicense'
| 'driversLicenseWheel'
| 'earnCoins'
| 'earnGraph'
| 'earnNavigation'
| 'easyToUse'
| 'economyGlobal'
| 'email'
| 'emailAndMessages'
| 'enableVoting'
| 'envelope'
| 'error'
| 'ethereumFocus'
| 'ethRewards'
| 'ethStaking'
| 'ethStakingChart'
| 'ethStakingRewards'
| 'ethToken'
| 'exchangeNavigation'
| 'explore'
| 'fast'
| 'faucetNavigation'
| 'feesRestriction'
| 'fiat'
| 'finance'
| 'findYourSelection'
| 'formDownload'
| 'futures'
| 'futuresCoinbaseOne'
| 'gasFees'
| 'gem'
| 'genericCountryIDCard'
| 'getStarted'
| 'giftbox'
| 'globalConnections'
| 'globalPayments'
| 'globalTransactions'
| 'googleAuthenticator'
| 'governance'
| 'hardwareWallet'
| 'helpCenterNavigation'
| 'higherLimits'
| 'holdingCoin'
| 'idBlock'
| 'identityCard'
| 'idError'
| 'idVerification'
| 'increaseLimits'
| 'instantUnstakingClock'
| 'institutionalNavigation'
| 'institutions'
| 'internationalExchangeNavigation'
| 'internet'
| 'investGraph'
| 'key'
| 'laptop'
| 'laptopCharts'
| 'laptopVideo'
| 'layerNetworks'
| 'leadGraph'
| 'learn'
| 'learningRewardsNavigation'
| 'learningRewardsProduct'
| 'lightbulbLearn'
| 'lightningNetworkSend'
| 'linkYourAccount'
| 'listingFees'
| 'locationUsa'
| 'lock'
| 'loop'
| 'lowFees'
| 'manageWeb3SignersAcct'
| 'miningCoins'
| 'mintedNft'
| 'mobileCharts'
| 'mobileError'
| 'mobileNotifcation'
| 'mobileSuccess'
| 'mobileWarning'
| 'moneyCrypto'
| 'moneyEarn'
| 'moneySwift'
| 'monitoringPerformance'
| 'moreThanBitcoin'
| 'multiAccountsAndCards'
| 'multiPlatform'
| 'multipleAssets'
| 'musicAndSounds'
| 'myNumberCard'
| 'newUserChecklistBuyCrypto'
| 'newUserChecklistCompleteAccount'
| 'newUserChecklistVerifyId'
| 'nftAvatar'
| 'nftLibrary'
| 'nftNavigation'
| 'noAnnualFee'
| 'noNftFound'
| 'notificationHubAnalysis'
| 'notificationHubNews'
| 'notificationHubPortfolio'
| 'notificationHubSocial'
| 'notifications'
| 'noVisibility'
| 'noWiFi'
| 'orders'
| 'outage'
| 'partialCoins'
| 'participateNavigation'
| 'passport'
| 'passwordWalletLocked'
| 'payNavigation'
| 'paypal'
| 'peerToPeer'
| 'phone'
| 'pieChart'
| 'pieChartData'
| 'pizza'
| 'planet'
| 'pluginBrowser'
| 'podium'
| 'positiveReviews'
| 'predictionMarkets'
| 'premiumInvestor'
| 'priceTracking'
| 'primeMobileApp'
| 'primeNavigation'
| 'privateClientNavigation'
| 'proNavigation'
| 'protectionPlan'
| 'queryTransactNavigation'
| 'receipt'
| 'recurringPurchases'
| 'restaking'
| 'reviewAndAdd'
| 'rewardsNavigation'
| 'riskStaking'
| 'robot'
| 'rosettaNavigation'
| 'safe'
| 'securedAssets'
| 'security'
| 'securityCoinShield'
| 'securityKey'
| 'seedPhrase'
| 'selectAddNft'
| 'selfCustodyWallet'
| 'selfServe'
| 'sellSendAnytime'
| 'sendPaymentToOthers'
| 'settings'
| 'settled'
| 'shield'
| 'sideChainSide'
| 'signInNavigation'
| 'smsAuthenticate'
| 'sparkleCoinbaseOne'
| 'ssnCard'
| 'stableCoinMetaphor'
| 'stacking'
| 'stakingGraph'
| 'standWithCryptoLogoNavigation'
| 'startToday'
| 'strongInfo'
| 'strongWarning'
| 'successPhone'
| 'support'
| 'supportChat'
| 'takeQuiz'
| 'target'
| 'taxBeta'
| 'taxCenterNavigation'
| 'taxes'
| 'taxesArrangement'
| 'taxSeason'
| 'timingCheck'
| 'tokenBaskets'
| 'tokenSales'
| 'trading'
| 'transferSend'
| 'transistor'
| 'trendingAssets'
| 'trusted'
| 'tryAgainLater'
| 'twoBonus'
| 'typeScript'
| 'ubiKey'
| 'usaProduct'
| 'usdcEarn'
| 'usdcInterest'
| 'usdcLoan'
| 'usdcLogo'
| 'usdcRewards'
| 'usdcRewardsRibbon'
| 'usdcToken'
| 'venturesNavigation'
| 'verifiedPools'
| 'videoCalendar'
| 'videoContent'
| 'waiting'
| 'waitingForConsensus'
| 'wallet'
| 'walletAsServiceNavigation'
| 'walletDeposit'
| 'walletError'
| 'walletExchange'
| 'walletLinkNavigation'
| 'walletLogoNavigation'
| 'walletNavigation'
| 'walletPassword'
| 'walletSuccess'
| 'walletWarning'
| 'warning'
| 'winBTC'
| 'worldwide'
| 'wrapEth'`,elements:[{name:"literal",value:"'2fa'"},{name:"literal",value:"'accountsNavigation'"},{name:"literal",value:"'accreditedInvestor'"},{name:"literal",value:"'add'"},{name:"literal",value:"'addCard'"},{name:"literal",value:"'addPayment'"},{name:"literal",value:"'addPhone'"},{name:"literal",value:"'addressBook'"},{name:"literal",value:"'addToWatchlist'"},{name:"literal",value:"'addWallet'"},{name:"literal",value:"'advancedTradingDesktop'"},{name:"literal",value:"'advancedTradingNavigation'"},{name:"literal",value:"'advancedTradingRebates'"},{name:"literal",value:"'agent'"},{name:"literal",value:"'alerts'"},{name:"literal",value:"'alertsCoinbaseOne'"},{name:"literal",value:"'analyticsNavigation'"},{name:"literal",value:"'apartOfDropsNft'"},{name:"literal",value:"'applyForHigherLimits'"},{name:"literal",value:"'apyInterest'"},{name:"literal",value:"'arrowsUpDown'"},{name:"literal",value:"'assetEncryption'"},{name:"literal",value:"'assetHubNavigation'"},{name:"literal",value:"'assetManagement'"},{name:"literal",value:"'assetManagementNavigation'"},{name:"literal",value:"'assetMeasurements'"},{name:"literal",value:"'assetMovement'"},{name:"literal",value:"'authenticationApp'"},{name:"literal",value:"'authenticator'"},{name:"literal",value:"'authenticatorAlt'"},{name:"literal",value:"'authenticatorProgress'"},{name:"literal",value:"'avatarAa'"},{name:"literal",value:"'avatarAb'"},{name:"literal",value:"'avatarAc'"},{name:"literal",value:"'avatarAd'"},{name:"literal",value:"'avatarAe'"},{name:"literal",value:"'avatarAf'"},{name:"literal",value:"'avatarAg'"},{name:"literal",value:"'avatarAh'"},{name:"literal",value:"'avatarAi'"},{name:"literal",value:"'avatarAj'"},{name:"literal",value:"'avatarBa'"},{name:"literal",value:"'avatarBb'"},{name:"literal",value:"'avatarBc'"},{name:"literal",value:"'avatarBd'"},{name:"literal",value:"'avatarBe'"},{name:"literal",value:"'avatarBf'"},{name:"literal",value:"'avatarBg'"},{name:"literal",value:"'avatarBh'"},{name:"literal",value:"'avatarBi'"},{name:"literal",value:"'avatarBj'"},{name:"literal",value:"'avatarCa'"},{name:"literal",value:"'avatarCb'"},{name:"literal",value:"'avatarCc'"},{name:"literal",value:"'avatarCd'"},{name:"literal",value:"'avatarCe'"},{name:"literal",value:"'avatarCf'"},{name:"literal",value:"'avatarCg'"},{name:"literal",value:"'avatarCh'"},{name:"literal",value:"'avatarCi'"},{name:"literal",value:"'avatarCj'"},{name:"literal",value:"'avatarDa'"},{name:"literal",value:"'avatarDb'"},{name:"literal",value:"'avatarDc'"},{name:"literal",value:"'avatarDd'"},{name:"literal",value:"'avatarDe'"},{name:"literal",value:"'avatarDf'"},{name:"literal",value:"'avatarDg'"},{name:"literal",value:"'avatarDh'"},{name:"literal",value:"'avatarDi'"},{name:"literal",value:"'avatarDj'"},{name:"literal",value:"'avatarEa'"},{name:"literal",value:"'avatarEb'"},{name:"literal",value:"'avatarEc'"},{name:"literal",value:"'avatarEd'"},{name:"literal",value:"'avatarEe'"},{name:"literal",value:"'avatarEf'"},{name:"literal",value:"'avatarEg'"},{name:"literal",value:"'avatarEh'"},{name:"literal",value:"'avatarEi'"},{name:"literal",value:"'avatarEj'"},{name:"literal",value:"'avatarFa'"},{name:"literal",value:"'avatarFb'"},{name:"literal",value:"'avatarFc'"},{name:"literal",value:"'avatarFd'"},{name:"literal",value:"'avatarFe'"},{name:"literal",value:"'avatarFf'"},{name:"literal",value:"'avatarFg'"},{name:"literal",value:"'avatarFh'"},{name:"literal",value:"'avatarFi'"},{name:"literal",value:"'avatarFj'"},{name:"literal",value:"'avatarGa'"},{name:"literal",value:"'avatarGb'"},{name:"literal",value:"'avatarGc'"},{name:"literal",value:"'avatarGd'"},{name:"literal",value:"'avatarGe'"},{name:"literal",value:"'avatarGf'"},{name:"literal",value:"'avatarGg'"},{name:"literal",value:"'avatarGh'"},{name:"literal",value:"'avatarGi'"},{name:"literal",value:"'avatarGj'"},{name:"literal",value:"'avatarHa'"},{name:"literal",value:"'avatarHb'"},{name:"literal",value:"'avatarHc'"},{name:"literal",value:"'avatarHd'"},{name:"literal",value:"'avatarHe'"},{name:"literal",value:"'avatarHf'"},{name:"literal",value:"'avatarHg'"},{name:"literal",value:"'avatarHh'"},{name:"literal",value:"'avatarHi'"},{name:"literal",value:"'avatarHj'"},{name:"literal",value:"'avatarIa'"},{name:"literal",value:"'avatarIb'"},{name:"literal",value:"'avatarIc'"},{name:"literal",value:"'avatarId'"},{name:"literal",value:"'avatarIe'"},{name:"literal",value:"'avatarIf'"},{name:"literal",value:"'avatarIg'"},{name:"literal",value:"'avatarIh'"},{name:"literal",value:"'avatarIi'"},{name:"literal",value:"'avatarIj'"},{name:"literal",value:"'avatarJa'"},{name:"literal",value:"'avatarJb'"},{name:"literal",value:"'avatarJc'"},{name:"literal",value:"'avatarJd'"},{name:"literal",value:"'avatarJe'"},{name:"literal",value:"'avatarJf'"},{name:"literal",value:"'avatarJg'"},{name:"literal",value:"'avatarJh'"},{name:"literal",value:"'avatarJi'"},{name:"literal",value:"'avatarJj'"},{name:"literal",value:"'barChart'"},{name:"literal",value:"'baseAscend'"},{name:"literal",value:"'baseCertificateStar'"},{name:"literal",value:"'baseChartSmall'"},{name:"literal",value:"'baseChatBubbleHeart'"},{name:"literal",value:"'baseCheckSmall'"},{name:"literal",value:"'baseCoinCryptoSmall'"},{name:"literal",value:"'baseCoinNetworkSmall'"},{name:"literal",value:"'baseCoinStack'"},{name:"literal",value:"'baseCoinStar'"},{name:"literal",value:"'baseComet'"},{name:"literal",value:"'baseComputer'"},{name:"literal",value:"'baseConfetti'"},{name:"literal",value:"'baseConnectApps'"},{name:"literal",value:"'baseConnectSmall'"},{name:"literal",value:"'baseCreatorCoin'"},{name:"literal",value:"'baseDecentralizationSmall'"},{name:"literal",value:"'baseDiamondSmall'"},{name:"literal",value:"'baseDiamondTrophy'"},{name:"literal",value:"'baseDoor'"},{name:"literal",value:"'baseEarnedBadge'"},{name:"literal",value:"'baseEmptySmall'"},{name:"literal",value:"'baseErrorButterflySmall'"},{name:"literal",value:"'baseErrorSmall'"},{name:"literal",value:"'baseExchange'"},{name:"literal",value:"'baseFire'"},{name:"literal",value:"'baseGem'"},{name:"literal",value:"'baseGlobe'"},{name:"literal",value:"'baseHandStar'"},{name:"literal",value:"'baseLayout'"},{name:"literal",value:"'baseLightningbolt'"},{name:"literal",value:"'baseLoadingSmall'"},{name:"literal",value:"'baseLocationSmall'"},{name:"literal",value:"'baseLogo'"},{name:"literal",value:"'baseLogoNavigation'"},{name:"literal",value:"'baseMedal'"},{name:"literal",value:"'baseMessaging'"},{name:"literal",value:"'baseMintNftSmall'"},{name:"literal",value:"'baseNetworkSmall'"},{name:"literal",value:"'baseNftSmall'"},{name:"literal",value:"'basePaycoinSmall'"},{name:"literal",value:"'basePeopleSmall'"},{name:"literal",value:"'basePiechartSmall'"},{name:"literal",value:"'basePlant'"},{name:"literal",value:"'basePower'"},{name:"literal",value:"'baseRibbon'"},{name:"literal",value:"'baseRocket'"},{name:"literal",value:"'baseRockon'"},{name:"literal",value:"'baseSaved'"},{name:"literal",value:"'baseSecuritySmall'"},{name:"literal",value:"'baseSendSmall'"},{name:"literal",value:"'baseSignin'"},{name:"literal",value:"'baseSmile'"},{name:"literal",value:"'baseStack'"},{name:"literal",value:"'baseStar'"},{name:"literal",value:"'baseTargetSmall'"},{name:"literal",value:"'baseTile'"},{name:"literal",value:"'bigBtcSend'"},{name:"literal",value:"'bitcoin'"},{name:"literal",value:"'bitcoinPizza'"},{name:"literal",value:"'bitcoinRewards'"},{name:"literal",value:"'bitcoinWhitePaper'"},{name:"literal",value:"'blockchainConnection'"},{name:"literal",value:"'bonusFivePercent'"},{name:"literal",value:"'bonusTwoPercent'"},{name:"literal",value:"'borrowCoins'"},{name:"literal",value:"'borrowingLending'"},{name:"literal",value:"'borrowNavigation'"},{name:"literal",value:"'browser'"},{name:"literal",value:"'browserMultiPlatform'"},{name:"literal",value:"'browserTransaction'"},{name:"literal",value:"'btcOneHundred'"},{name:"literal",value:"'bundle'"},{name:"literal",value:"'businessProduct'"},{name:"literal",value:"'calculator'"},{name:"literal",value:"'calendar'"},{name:"literal",value:"'calendarCaution'"},{name:"literal",value:"'calendarHighlight'"},{name:"literal",value:"'candleSticksGraph'"},{name:"literal",value:"'cardBlocked'"},{name:"literal",value:"'cardDeclined'"},{name:"literal",value:"'cardNavigation'"},{name:"literal",value:"'cardSuccess'"},{name:"literal",value:"'cb1BankTransfers'"},{name:"literal",value:"'chart'"},{name:"literal",value:"'chat'"},{name:"literal",value:"'checkmark'"},{name:"literal",value:"'clock'"},{name:"literal",value:"'cloudNavigation'"},{name:"literal",value:"'coinbaseLogoAdvancedBrand'"},{name:"literal",value:"'coinbaseLogoNavigation'"},{name:"literal",value:"'coinbaseOneAuthenticator'"},{name:"literal",value:"'coinbaseOneChat'"},{name:"literal",value:"'coinbaseOneEarn'"},{name:"literal",value:"'coinbaseOneEarnCoins'"},{name:"literal",value:"'coinbaseOneEarnCoinsLogo'"},{name:"literal",value:"'coinbaseOneFiat'"},{name:"literal",value:"'coinbaseOneLogo'"},{name:"literal",value:"'coinbaseOneProductIcon'"},{name:"literal",value:"'coinbaseOneProductInvestWeekly'"},{name:"literal",value:"'coinbaseOneRefreshed'"},{name:"literal",value:"'coinbaseOneShield'"},{name:"literal",value:"'coinbaseOneTrade'"},{name:"literal",value:"'coinbaseOneTrusted'"},{name:"literal",value:"'coinbaseOneUnlimitedRewards'"},{name:"literal",value:"'coinbaseUnlockOffers'"},{name:"literal",value:"'coinbaseWalletApp'"},{name:"literal",value:"'coinFocus'"},{name:"literal",value:"'coinShare'"},{name:"literal",value:"'coldStorageCheck'"},{name:"literal",value:"'collectionOfAssets'"},{name:"literal",value:"'commerceCheckout'"},{name:"literal",value:"'commerceInvoice'"},{name:"literal",value:"'commerceNavigation'"},{name:"literal",value:"'commodities'"},{name:"literal",value:"'completeQuiz'"},{name:"literal",value:"'complianceNavigation'"},{name:"literal",value:"'congratulations'"},{name:"literal",value:"'connectNavigation'"},{name:"literal",value:"'contactInfo'"},{name:"literal",value:"'controlWalletStorage'"},{name:"literal",value:"'creative'"},{name:"literal",value:"'creditCard'"},{name:"literal",value:"'crypto101'"},{name:"literal",value:"'cryptoCard'"},{name:"literal",value:"'cryptoCoins'"},{name:"literal",value:"'cryptoFolder'"},{name:"literal",value:"'crystalBallInsight'"},{name:"literal",value:"'custodialJourney'"},{name:"literal",value:"'custodyNavigation'"},{name:"literal",value:"'dataMarketplaceNavigation'"},{name:"literal",value:"'decentralizationEverything'"},{name:"literal",value:"'decentralizedExchange'"},{name:"literal",value:"'decentralizedIdentity'"},{name:"literal",value:"'decentralizedWeb3'"},{name:"literal",value:"'defiEarnMoment'"},{name:"literal",value:"'delegate'"},{name:"literal",value:"'delegateNavigation'"},{name:"literal",value:"'derivativesNavigation'"},{name:"literal",value:"'derivativesProduct'"},{name:"literal",value:"'developerPlatformNavigation'"},{name:"literal",value:"'developerSDKNavigation'"},{name:"literal",value:"'directDepositNavigation'"},{name:"literal",value:"'dollarShowcase'"},{name:"literal",value:"'done'"},{name:"literal",value:"'driversLicense'"},{name:"literal",value:"'driversLicenseWheel'"},{name:"literal",value:"'earnCoins'"},{name:"literal",value:"'earnGraph'"},{name:"literal",value:"'earnNavigation'"},{name:"literal",value:"'easyToUse'"},{name:"literal",value:"'economyGlobal'"},{name:"literal",value:"'email'"},{name:"literal",value:"'emailAndMessages'"},{name:"literal",value:"'enableVoting'"},{name:"literal",value:"'envelope'"},{name:"literal",value:"'error'"},{name:"literal",value:"'ethereumFocus'"},{name:"literal",value:"'ethRewards'"},{name:"literal",value:"'ethStaking'"},{name:"literal",value:"'ethStakingChart'"},{name:"literal",value:"'ethStakingRewards'"},{name:"literal",value:"'ethToken'"},{name:"literal",value:"'exchangeNavigation'"},{name:"literal",value:"'explore'"},{name:"literal",value:"'fast'"},{name:"literal",value:"'faucetNavigation'"},{name:"literal",value:"'feesRestriction'"},{name:"literal",value:"'fiat'"},{name:"literal",value:"'finance'"},{name:"literal",value:"'findYourSelection'"},{name:"literal",value:"'formDownload'"},{name:"literal",value:"'futures'"},{name:"literal",value:"'futuresCoinbaseOne'"},{name:"literal",value:"'gasFees'"},{name:"literal",value:"'gem'"},{name:"literal",value:"'genericCountryIDCard'"},{name:"literal",value:"'getStarted'"},{name:"literal",value:"'giftbox'"},{name:"literal",value:"'globalConnections'"},{name:"literal",value:"'globalPayments'"},{name:"literal",value:"'globalTransactions'"},{name:"literal",value:"'googleAuthenticator'"},{name:"literal",value:"'governance'"},{name:"literal",value:"'hardwareWallet'"},{name:"literal",value:"'helpCenterNavigation'"},{name:"literal",value:"'higherLimits'"},{name:"literal",value:"'holdingCoin'"},{name:"literal",value:"'idBlock'"},{name:"literal",value:"'identityCard'"},{name:"literal",value:"'idError'"},{name:"literal",value:"'idVerification'"},{name:"literal",value:"'increaseLimits'"},{name:"literal",value:"'instantUnstakingClock'"},{name:"literal",value:"'institutionalNavigation'"},{name:"literal",value:"'institutions'"},{name:"literal",value:"'internationalExchangeNavigation'"},{name:"literal",value:"'internet'"},{name:"literal",value:"'investGraph'"},{name:"literal",value:"'key'"},{name:"literal",value:"'laptop'"},{name:"literal",value:"'laptopCharts'"},{name:"literal",value:"'laptopVideo'"},{name:"literal",value:"'layerNetworks'"},{name:"literal",value:"'leadGraph'"},{name:"literal",value:"'learn'"},{name:"literal",value:"'learningRewardsNavigation'"},{name:"literal",value:"'learningRewardsProduct'"},{name:"literal",value:"'lightbulbLearn'"},{name:"literal",value:"'lightningNetworkSend'"},{name:"literal",value:"'linkYourAccount'"},{name:"literal",value:"'listingFees'"},{name:"literal",value:"'locationUsa'"},{name:"literal",value:"'lock'"},{name:"literal",value:"'loop'"},{name:"literal",value:"'lowFees'"},{name:"literal",value:"'manageWeb3SignersAcct'"},{name:"literal",value:"'miningCoins'"},{name:"literal",value:"'mintedNft'"},{name:"literal",value:"'mobileCharts'"},{name:"literal",value:"'mobileError'"},{name:"literal",value:"'mobileNotifcation'"},{name:"literal",value:"'mobileSuccess'"},{name:"literal",value:"'mobileWarning'"},{name:"literal",value:"'moneyCrypto'"},{name:"literal",value:"'moneyEarn'"},{name:"literal",value:"'moneySwift'"},{name:"literal",value:"'monitoringPerformance'"},{name:"literal",value:"'moreThanBitcoin'"},{name:"literal",value:"'multiAccountsAndCards'"},{name:"literal",value:"'multiPlatform'"},{name:"literal",value:"'multipleAssets'"},{name:"literal",value:"'musicAndSounds'"},{name:"literal",value:"'myNumberCard'"},{name:"literal",value:"'newUserChecklistBuyCrypto'"},{name:"literal",value:"'newUserChecklistCompleteAccount'"},{name:"literal",value:"'newUserChecklistVerifyId'"},{name:"literal",value:"'nftAvatar'"},{name:"literal",value:"'nftLibrary'"},{name:"literal",value:"'nftNavigation'"},{name:"literal",value:"'noAnnualFee'"},{name:"literal",value:"'noNftFound'"},{name:"literal",value:"'notificationHubAnalysis'"},{name:"literal",value:"'notificationHubNews'"},{name:"literal",value:"'notificationHubPortfolio'"},{name:"literal",value:"'notificationHubSocial'"},{name:"literal",value:"'notifications'"},{name:"literal",value:"'noVisibility'"},{name:"literal",value:"'noWiFi'"},{name:"literal",value:"'orders'"},{name:"literal",value:"'outage'"},{name:"literal",value:"'partialCoins'"},{name:"literal",value:"'participateNavigation'"},{name:"literal",value:"'passport'"},{name:"literal",value:"'passwordWalletLocked'"},{name:"literal",value:"'payNavigation'"},{name:"literal",value:"'paypal'"},{name:"literal",value:"'peerToPeer'"},{name:"literal",value:"'phone'"},{name:"literal",value:"'pieChart'"},{name:"literal",value:"'pieChartData'"},{name:"literal",value:"'pizza'"},{name:"literal",value:"'planet'"},{name:"literal",value:"'pluginBrowser'"},{name:"literal",value:"'podium'"},{name:"literal",value:"'positiveReviews'"},{name:"literal",value:"'predictionMarkets'"},{name:"literal",value:"'premiumInvestor'"},{name:"literal",value:"'priceTracking'"},{name:"literal",value:"'primeMobileApp'"},{name:"literal",value:"'primeNavigation'"},{name:"literal",value:"'privateClientNavigation'"},{name:"literal",value:"'proNavigation'"},{name:"literal",value:"'protectionPlan'"},{name:"literal",value:"'queryTransactNavigation'"},{name:"literal",value:"'receipt'"},{name:"literal",value:"'recurringPurchases'"},{name:"literal",value:"'restaking'"},{name:"literal",value:"'reviewAndAdd'"},{name:"literal",value:"'rewardsNavigation'"},{name:"literal",value:"'riskStaking'"},{name:"literal",value:"'robot'"},{name:"literal",value:"'rosettaNavigation'"},{name:"literal",value:"'safe'"},{name:"literal",value:"'securedAssets'"},{name:"literal",value:"'security'"},{name:"literal",value:"'securityCoinShield'"},{name:"literal",value:"'securityKey'"},{name:"literal",value:"'seedPhrase'"},{name:"literal",value:"'selectAddNft'"},{name:"literal",value:"'selfCustodyWallet'"},{name:"literal",value:"'selfServe'"},{name:"literal",value:"'sellSendAnytime'"},{name:"literal",value:"'sendPaymentToOthers'"},{name:"literal",value:"'settings'"},{name:"literal",value:"'settled'"},{name:"literal",value:"'shield'"},{name:"literal",value:"'sideChainSide'"},{name:"literal",value:"'signInNavigation'"},{name:"literal",value:"'smsAuthenticate'"},{name:"literal",value:"'sparkleCoinbaseOne'"},{name:"literal",value:"'ssnCard'"},{name:"literal",value:"'stableCoinMetaphor'"},{name:"literal",value:"'stacking'"},{name:"literal",value:"'stakingGraph'"},{name:"literal",value:"'standWithCryptoLogoNavigation'"},{name:"literal",value:"'startToday'"},{name:"literal",value:"'strongInfo'"},{name:"literal",value:"'strongWarning'"},{name:"literal",value:"'successPhone'"},{name:"literal",value:"'support'"},{name:"literal",value:"'supportChat'"},{name:"literal",value:"'takeQuiz'"},{name:"literal",value:"'target'"},{name:"literal",value:"'taxBeta'"},{name:"literal",value:"'taxCenterNavigation'"},{name:"literal",value:"'taxes'"},{name:"literal",value:"'taxesArrangement'"},{name:"literal",value:"'taxSeason'"},{name:"literal",value:"'timingCheck'"},{name:"literal",value:"'tokenBaskets'"},{name:"literal",value:"'tokenSales'"},{name:"literal",value:"'trading'"},{name:"literal",value:"'transferSend'"},{name:"literal",value:"'transistor'"},{name:"literal",value:"'trendingAssets'"},{name:"literal",value:"'trusted'"},{name:"literal",value:"'tryAgainLater'"},{name:"literal",value:"'twoBonus'"},{name:"literal",value:"'typeScript'"},{name:"literal",value:"'ubiKey'"},{name:"literal",value:"'usaProduct'"},{name:"literal",value:"'usdcEarn'"},{name:"literal",value:"'usdcInterest'"},{name:"literal",value:"'usdcLoan'"},{name:"literal",value:"'usdcLogo'"},{name:"literal",value:"'usdcRewards'"},{name:"literal",value:"'usdcRewardsRibbon'"},{name:"literal",value:"'usdcToken'"},{name:"literal",value:"'venturesNavigation'"},{name:"literal",value:"'verifiedPools'"},{name:"literal",value:"'videoCalendar'"},{name:"literal",value:"'videoContent'"},{name:"literal",value:"'waiting'"},{name:"literal",value:"'waitingForConsensus'"},{name:"literal",value:"'wallet'"},{name:"literal",value:"'walletAsServiceNavigation'"},{name:"literal",value:"'walletDeposit'"},{name:"literal",value:"'walletError'"},{name:"literal",value:"'walletExchange'"},{name:"literal",value:"'walletLinkNavigation'"},{name:"literal",value:"'walletLogoNavigation'"},{name:"literal",value:"'walletNavigation'"},{name:"literal",value:"'walletPassword'"},{name:"literal",value:"'walletSuccess'"},{name:"literal",value:"'walletWarning'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'winBTC'"},{name:"literal",value:"'worldwide'"},{name:"literal",value:"'wrapEth'"}]},description:"The name of the Pictogram Illustration to use in CardMedia."},image:{required:!1,tsType:{name:"string"},description:"The image url to use in the CardMedia. Will not be used if illustration is present."},media:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:`Remote Image or other node with media content.
If illustration prop is present this will default to <CardMedia type="illustration" name={illustration} variant={variant} />.
If image prop is present this will default to <CardMedia type="image" src={image} variant={variant} />.`},actionLabel:{required:!1,tsType:{name:"string"},description:`Call to action to display underneath title and description.
When present this will set action prop to be CardBodyAction with some defaults.`},action:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:`Call to action to display underneath title and description.
When actionLabel and onActionPress are present this will assign action to <CardBodyAction onPress={onActionPress} endIcon="forwardArrow">{actionLabel}</CardBodyAction>.
Internally CardBodyAction is a normal CDS Button, but with some default props designed specifically for this layout.`}}};const F=v.memo(function({children:a,paddingBottom:l=2,paddingX:c=$,testID:t,...r}){return e.jsx(q,{paddingBottom:l,paddingX:c,testID:t,...r,children:a})});F.__docgenInfo={description:"",methods:[],displayName:"CardFooter",props:{testID:{required:!1,tsType:{name:"string"},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`},style:{required:!1,tsType:{name:"ReactCSSProperties",raw:"React.CSSProperties"},description:""},font:{required:!1,tsType:{name:"union",raw:"T | { base?: T; phone?: T; tablet?: T; desktop?: T }",elements:[{name:"fontFamily"},{name:"signature",type:"object",raw:"{ base?: T; phone?: T; tablet?: T; desktop?: T }",signature:{properties:[{key:"base",value:{name:"fontFamily",required:!1}},{key:"phone",value:{name:"fontFamily",required:!1}},{key:"tablet",value:{name:"fontFamily",required:!1}},{key:"desktop",value:{name:"fontFamily",required:!1}}]}}]},description:""},pin:{required:!1,tsType:{name:"union",raw:"'top' | 'bottom' | 'left' | 'right' | 'all'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"},{name:"literal",value:"'right'"},{name:"literal",value:"'all'"}]},description:"Direction in which to absolutely pin the box."},bordered:{required:!1,tsType:{name:"boolean"},description:"Add a border around all sides of the box."},borderedTop:{required:!1,tsType:{name:"boolean"},description:"Add a border to the top side of the box."},borderedBottom:{required:!1,tsType:{name:"boolean"},description:"Add a border to the bottom side of the box."},borderedStart:{required:!1,tsType:{name:"boolean"},description:"Add a border to the leading side of the box."},borderedEnd:{required:!1,tsType:{name:"boolean"},description:"Add a border to the trailing side of the box."},borderedHorizontal:{required:!1,tsType:{name:"boolean"},description:"Add a border to the leading and trailing sides of the box."},borderedVertical:{required:!1,tsType:{name:"boolean"},description:"Add a border to the top and bottom sides of the box."},dangerouslySetBackground:{required:!1,tsType:{name:"string"},description:"@danger This is a migration escape hatch. It is not intended to be used normally."},children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:"CardFooter takes one or many actions as children"},paddingBottom:{defaultValue:{value:"2",computed:!1},required:!1},paddingX:{defaultValue:{value:"3",computed:!1},required:!1}}};const ee=v.memo(function({testID:a="feed-card",avatar:l,author:c,metadata:t,pictogram:r,spotSquare:d,image:b,mediaPlacement:h="start",title:g,description:y,headerAction:f,like:n,comment:i,share:o,cta:s,borderRadius:T=0,elevation:B=0,...D}){const u=v.useMemo(()=>{const p=!!(n??i??o??s);return p||!!s?e.jsxs(F,{justifyContent:"space-between",testID:a,children:[p&&e.jsxs(q,{gap:.5,children:[n&&e.jsx(_,{testID:`${a}-like`,...n}),i&&e.jsx(R,{transparent:!0,accessibilityLabel:"Comment",name:"annotation",testID:`${a}-comment`,...i}),o&&e.jsx(R,{transparent:!0,accessibilityLabel:"Share",name:"share",testID:`${a}-share`,...o})]}),s&&e.jsx(H,{compact:!0,transparent:!0,flush:"end",variant:"secondary",...s})]}):null},[i,s,n,o,a]);return e.jsxs(j,{borderRadius:T,elevation:B,gap:2,testID:a,...D,children:[e.jsx(G,{action:f&&e.jsx(R,{transparent:!0,accessibilityLabel:"More",flush:"end",...f}),avatar:l,description:c,metaData:t,testID:`${a}-header`}),e.jsx(W,{description:y,image:b,mediaPlacement:h,paddingY:u===null?void 0:0,pictogram:r,spotSquare:d,testID:`${a}-body`,title:g}),u]})});ee.__docgenInfo={description:"@deprecated Use the ContentCard component instead.",methods:[],displayName:"FeedCard",props:{size:{required:!1,tsType:{name:"union",raw:"'small' | 'medium' | 'large'",elements:[{name:"literal",value:"'small'"},{name:"literal",value:"'medium'"},{name:"literal",value:"'large'"}]},description:"Size of the card. Small and medium have fixed widths and large grows with its children."},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},onKeyDown:{required:!1,tsType:{name:"HTMLAttributes['onKeyDown']",raw:"HTMLAttributes<HTMLElement>['onKeyDown']"},description:""},onKeyUp:{required:!1,tsType:{name:"HTMLAttributes['onKeyUp']",raw:"HTMLAttributes<HTMLElement>['onKeyUp']"},description:""},onClick:{required:!1,tsType:{name:"MouseEventHandler"},description:""},avatar:{required:!1,tsType:{name:"string"},description:"Image url for Avatar"},author:{required:!1,tsType:{name:"string"},description:"Source of the card info. Typically this text is associated with the avatar."},metadata:{required:!1,tsType:{name:"string"},description:"Metadata to be displayed under author text."},mediaPlacement:{required:!1,tsType:{name:"Exclude",elements:[{name:"union",raw:"'start' | 'above' | 'end'",elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'above'"},{name:"literal",value:"'end'"}]},{name:"literal",value:"'end'"}],raw:"Exclude<CardMediaPlacement, 'end'>"},description:`Above places media above text content, start & end places media to the side of text content
@default above for mobile, start for web. Web will need to handle responsiveness changes manually.`,defaultValue:{value:"'start'",computed:!1}},title:{required:!0,tsType:{name:"string"},description:"Text to be displayed in TextHeadline under CardHeader section."},description:{required:!0,tsType:{name:"string"},description:"Text to be displayed in TextLabel2 under title."},headerAction:{required:!1,tsType:{name:"intersection",raw:"IconButtonBaseProps & { onClick?: CardBaseProps['onClick'] }",elements:[{name:"Polymorphic.ExtendableProps",elements:[{name:"Omit",elements:[{name:"Polymorphic.ExtendableProps",elements:[{name:"Polymorphic.ExtendableProps",elements:[{name:"intersection",raw:`StyleProps &
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
  /** Apply class names to the outer container. */
  className?: string;
  /** Background color of the overlay (element being interacted with). */
  background?: ThemeVars.Color;
  /** Set element to block and expand to 100% width. */
  block?: boolean;
  /** Border color of the element. */
  borderColor?: ThemeVars.Color;
  /** Is the element currently disabled. */
  disabled?: boolean;
  /**
   * Is the element currenty loading.
   * When set to true, will disable element from press and keyboard events
   */
  loading?: boolean;
  /** Is the element being pressed. Primarily a mobile feature, but can be used on the web. */
  pressed?: boolean;
  /**
   * Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
   * Must be used in conjunction with the "pressed" prop
   */
  transparentWhileInactive?: boolean;
  /**
   * Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
   * Must be used in conjunction with the "pressed" prop
   */
  transparentWhilePressed?: boolean;
  blendStyles?: InteractableBlendStyles;
}`,signature:{properties:[{key:"className",value:{name:"string",required:!1},description:"Apply class names to the outer container."},{key:"background",value:{name:"ThemeVars.Color",required:!1},description:"Background color of the overlay (element being interacted with)."},{key:"block",value:{name:"boolean",required:!1},description:"Set element to block and expand to 100% width."},{key:"borderColor",value:{name:"ThemeVars.Color",required:!1},description:"Border color of the element."},{key:"disabled",value:{name:"boolean",required:!1},description:"Is the element currently disabled."},{key:"loading",value:{name:"boolean",required:!1},description:`Is the element currenty loading.
When set to true, will disable element from press and keyboard events`},{key:"pressed",value:{name:"boolean",required:!1},description:"Is the element being pressed. Primarily a mobile feature, but can be used on the web."},{key:"transparentWhileInactive",value:{name:"boolean",required:!1},description:`Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
Must be used in conjunction with the "pressed" prop`},{key:"transparentWhilePressed",value:{name:"boolean",required:!1},description:`Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
Must be used in conjunction with the "pressed" prop`},{key:"blendStyles",value:{name:"signature",type:"object",raw:`{
  background?: string;
  pressedBackground?: string;
  disabledBackground?: string;
  hoveredBackground?: string;
  borderColor?: string;
  pressedBorderColor?: string;
  disabledBorderColor?: string;
  hoveredBorderColor?: string;
  /**
   * The opacity of the element when hovered.
   * @default 0.88
   */
  hoveredOpacity?: number;
  /**
   * The opacity of the element when pressed.
   * @default 0.82
   */
  pressedOpacity?: number;
  /**
   * The opacity of the element when disabled.
   * @default 0.75
   */
  disabledOpacity?: number;
}`,signature:{properties:[{key:"background",value:{name:"string",required:!1}},{key:"pressedBackground",value:{name:"string",required:!1}},{key:"disabledBackground",value:{name:"string",required:!1}},{key:"hoveredBackground",value:{name:"string",required:!1}},{key:"borderColor",value:{name:"string",required:!1}},{key:"pressedBorderColor",value:{name:"string",required:!1}},{key:"disabledBorderColor",value:{name:"string",required:!1}},{key:"hoveredBorderColor",value:{name:"string",required:!1}},{key:"hoveredOpacity",value:{name:"number",required:!1},description:`The opacity of the element when hovered.
@default 0.88`},{key:"pressedOpacity",value:{name:"number",required:!1},description:`The opacity of the element when pressed.
@default 0.82`},{key:"disabledOpacity",value:{name:"number",required:!1},description:`The opacity of the element when disabled.
@default 0.75`}]},required:!1}}]}}],raw:`Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    /** Apply class names to the outer container. */
    className?: string;
    /** Background color of the overlay (element being interacted with). */
    background?: ThemeVars.Color;
    /** Set element to block and expand to 100% width. */
    block?: boolean;
    /** Border color of the element. */
    borderColor?: ThemeVars.Color;
    /** Is the element currently disabled. */
    disabled?: boolean;
    /**
     * Is the element currenty loading.
     * When set to true, will disable element from press and keyboard events
     */
    loading?: boolean;
    /** Is the element being pressed. Primarily a mobile feature, but can be used on the web. */
    pressed?: boolean;
    /**
     * Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
     * Must be used in conjunction with the "pressed" prop
     */
    transparentWhileInactive?: boolean;
    /**
     * Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
     * Must be used in conjunction with the "pressed" prop
     */
    transparentWhilePressed?: boolean;
    blendStyles?: InteractableBlendStyles;
  }
>`},{name:"intersection",raw:`ComponentEventHandlerProps & {
  /** Dont scale element on press. */
  noScaleOnPress?: boolean;
  focusable?: boolean;
}`,elements:[{name:"signature",type:"object",raw:`{
  eventConfig?: EventHandlerCustomConfig;
  analyticsId?: string;
}`,signature:{properties:[{key:"eventConfig",value:{name:"signature",type:"object",raw:`{
  actions: EventHandlerAction[];
  componentName: string;
  data?: EventCustomData;
}`,signature:{properties:[{key:"actions",value:{name:"Array",elements:[{name:"string"}],raw:"EventHandlerAction[]",required:!0}},{key:"componentName",value:{name:"string",required:!0}},{key:"data",value:{name:"Record",elements:[{name:"string"},{name:"union",raw:"T | Record<string, T>",elements:[{name:"union",raw:"EventDataEntryTypes | EventDataEntryTypes[]",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]},{name:"Array",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]}],raw:"EventDataEntryTypes[]"}]},{name:"Record",elements:[{name:"string"},{name:"union",raw:"EventDataEntryTypes | EventDataEntryTypes[]",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]},{name:"Array",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]}],raw:"EventDataEntryTypes[]"}]}],raw:"Record<string, T>"}]}],raw:"Record<string, RecursiveMapType<EventDataEntry>>",required:!1}}]},required:!1}},{key:"analyticsId",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
  /** Dont scale element on press. */
  noScaleOnPress?: boolean;
  focusable?: boolean;
}`,signature:{properties:[{key:"noScaleOnPress",value:{name:"boolean",required:!1},description:"Dont scale element on press."},{key:"focusable",value:{name:"boolean",required:!1}}]}}]}],raw:`Polymorphic.ExtendableProps<
  InteractableBaseProps,
  ComponentEventHandlerProps & {
    /** Dont scale element on press. */
    noScaleOnPress?: boolean;
    focusable?: boolean;
  }
>`},{name:"literal",value:"'children'"}],raw:"Omit<PressableBaseProps, 'children'>"},{name:"intersection",raw:`Pick<ButtonBaseProps, 'disabled' | 'transparent' | 'compact' | 'flush'> & {
  /** Name of the icon, as defined in Figma. */
  name: IconName;
  /** Whether the icon is active */
  active?: boolean;
  /**
   * Toggle design and visual variants.
   * @default primary
   */
  variant?: IconButtonVariant;
}`,elements:[{name:"Pick",elements:[{name:"Polymorphic.ExtendableProps",elements:[{name:"Polymorphic.ExtendableProps",elements:[{name:"Polymorphic.ExtendableProps",elements:[{name:"intersection",raw:`StyleProps &
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
  /** Apply class names to the outer container. */
  className?: string;
  /** Background color of the overlay (element being interacted with). */
  background?: ThemeVars.Color;
  /** Set element to block and expand to 100% width. */
  block?: boolean;
  /** Border color of the element. */
  borderColor?: ThemeVars.Color;
  /** Is the element currently disabled. */
  disabled?: boolean;
  /**
   * Is the element currenty loading.
   * When set to true, will disable element from press and keyboard events
   */
  loading?: boolean;
  /** Is the element being pressed. Primarily a mobile feature, but can be used on the web. */
  pressed?: boolean;
  /**
   * Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
   * Must be used in conjunction with the "pressed" prop
   */
  transparentWhileInactive?: boolean;
  /**
   * Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
   * Must be used in conjunction with the "pressed" prop
   */
  transparentWhilePressed?: boolean;
  blendStyles?: InteractableBlendStyles;
}`,signature:{properties:[{key:"className",value:{name:"string",required:!1},description:"Apply class names to the outer container."},{key:"background",value:{name:"ThemeVars.Color",required:!1},description:"Background color of the overlay (element being interacted with)."},{key:"block",value:{name:"boolean",required:!1},description:"Set element to block and expand to 100% width."},{key:"borderColor",value:{name:"ThemeVars.Color",required:!1},description:"Border color of the element."},{key:"disabled",value:{name:"boolean",required:!1},description:"Is the element currently disabled."},{key:"loading",value:{name:"boolean",required:!1},description:`Is the element currenty loading.
When set to true, will disable element from press and keyboard events`},{key:"pressed",value:{name:"boolean",required:!1},description:"Is the element being pressed. Primarily a mobile feature, but can be used on the web."},{key:"transparentWhileInactive",value:{name:"boolean",required:!1},description:`Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
Must be used in conjunction with the "pressed" prop`},{key:"transparentWhilePressed",value:{name:"boolean",required:!1},description:`Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
Must be used in conjunction with the "pressed" prop`},{key:"blendStyles",value:{name:"signature",type:"object",raw:`{
  background?: string;
  pressedBackground?: string;
  disabledBackground?: string;
  hoveredBackground?: string;
  borderColor?: string;
  pressedBorderColor?: string;
  disabledBorderColor?: string;
  hoveredBorderColor?: string;
  /**
   * The opacity of the element when hovered.
   * @default 0.88
   */
  hoveredOpacity?: number;
  /**
   * The opacity of the element when pressed.
   * @default 0.82
   */
  pressedOpacity?: number;
  /**
   * The opacity of the element when disabled.
   * @default 0.75
   */
  disabledOpacity?: number;
}`,signature:{properties:[{key:"background",value:{name:"string",required:!1}},{key:"pressedBackground",value:{name:"string",required:!1}},{key:"disabledBackground",value:{name:"string",required:!1}},{key:"hoveredBackground",value:{name:"string",required:!1}},{key:"borderColor",value:{name:"string",required:!1}},{key:"pressedBorderColor",value:{name:"string",required:!1}},{key:"disabledBorderColor",value:{name:"string",required:!1}},{key:"hoveredBorderColor",value:{name:"string",required:!1}},{key:"hoveredOpacity",value:{name:"number",required:!1},description:`The opacity of the element when hovered.
@default 0.88`},{key:"pressedOpacity",value:{name:"number",required:!1},description:`The opacity of the element when pressed.
@default 0.82`},{key:"disabledOpacity",value:{name:"number",required:!1},description:`The opacity of the element when disabled.
@default 0.75`}]},required:!1}}]}}],raw:`Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    /** Apply class names to the outer container. */
    className?: string;
    /** Background color of the overlay (element being interacted with). */
    background?: ThemeVars.Color;
    /** Set element to block and expand to 100% width. */
    block?: boolean;
    /** Border color of the element. */
    borderColor?: ThemeVars.Color;
    /** Is the element currently disabled. */
    disabled?: boolean;
    /**
     * Is the element currenty loading.
     * When set to true, will disable element from press and keyboard events
     */
    loading?: boolean;
    /** Is the element being pressed. Primarily a mobile feature, but can be used on the web. */
    pressed?: boolean;
    /**
     * Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
     * Must be used in conjunction with the "pressed" prop
     */
    transparentWhileInactive?: boolean;
    /**
     * Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
     * Must be used in conjunction with the "pressed" prop
     */
    transparentWhilePressed?: boolean;
    blendStyles?: InteractableBlendStyles;
  }
>`},{name:"intersection",raw:`ComponentEventHandlerProps & {
  /** Dont scale element on press. */
  noScaleOnPress?: boolean;
  focusable?: boolean;
}`,elements:[{name:"signature",type:"object",raw:`{
  eventConfig?: EventHandlerCustomConfig;
  analyticsId?: string;
}`,signature:{properties:[{key:"eventConfig",value:{name:"signature",type:"object",raw:`{
  actions: EventHandlerAction[];
  componentName: string;
  data?: EventCustomData;
}`,signature:{properties:[{key:"actions",value:{name:"Array",elements:[{name:"string"}],raw:"EventHandlerAction[]",required:!0}},{key:"componentName",value:{name:"string",required:!0}},{key:"data",value:{name:"Record",elements:[{name:"string"},{name:"union",raw:"T | Record<string, T>",elements:[{name:"union",raw:"EventDataEntryTypes | EventDataEntryTypes[]",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]},{name:"Array",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]}],raw:"EventDataEntryTypes[]"}]},{name:"Record",elements:[{name:"string"},{name:"union",raw:"EventDataEntryTypes | EventDataEntryTypes[]",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]},{name:"Array",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]}],raw:"EventDataEntryTypes[]"}]}],raw:"Record<string, T>"}]}],raw:"Record<string, RecursiveMapType<EventDataEntry>>",required:!1}}]},required:!1}},{key:"analyticsId",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
  /** Dont scale element on press. */
  noScaleOnPress?: boolean;
  focusable?: boolean;
}`,signature:{properties:[{key:"noScaleOnPress",value:{name:"boolean",required:!1},description:"Dont scale element on press."},{key:"focusable",value:{name:"boolean",required:!1}}]}}]}],raw:`Polymorphic.ExtendableProps<
  InteractableBaseProps,
  ComponentEventHandlerProps & {
    /** Dont scale element on press. */
    noScaleOnPress?: boolean;
    focusable?: boolean;
  }
>`},{name:"intersection",raw:`SharedProps &
Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
  /**
   * Toggle design and visual variants.
   * @default primary
   */
  variant?: ButtonVariant;
  /** Mark the button as disabled. */
  disabled?: boolean;
  /** Mark the button as loading and display a spinner. */
  loading?: boolean;
  /** Mark the background and border as transparent until interacted with. */
  transparent?: boolean;
  /** Change to block and expand to 100% of parent width. */
  block?: boolean;
  /** Reduce the inner padding within the button itself. */
  compact?: boolean;
  /** Children to render within the button. */
  children: React.ReactNode;
  /** Set the start node */
  start?: React.ReactNode;
  /** Icon to render at the start of the button. */
  startIcon?: IconName;
  /** Whether the start icon is active */
  startIconActive?: boolean;
  /** Set the end node */
  end?: React.ReactNode;
  /** Icon to render at the end of the button. */
  endIcon?: IconName;
  /** Whether the end icon is active */
  endIconActive?: boolean;
  /** Ensure the button aligns flush on the left or right.
   * This prop will translate the entire button left/right,
   * so take care to ensure it is not overflowing awkwardly
   */
  flush?: 'start' | 'end';
  /** Uniquely identify the button within a form. */
  name?: string;
  /** Don't scale element on press. */
  noScaleOnPress?: boolean;
  /**
   * Truncates text after wrapping to a defined number of lines.
   * @default 1
   */
  numberOfLines?: number;
}`,elements:[{name:"signature",type:"object",raw:`{
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
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},{name:"literal",value:"'accessibilityLabel'"}],raw:"Pick<SharedAccessibilityProps, 'accessibilityLabel'>"},{name:"signature",type:"object",raw:`{
  /**
   * Toggle design and visual variants.
   * @default primary
   */
  variant?: ButtonVariant;
  /** Mark the button as disabled. */
  disabled?: boolean;
  /** Mark the button as loading and display a spinner. */
  loading?: boolean;
  /** Mark the background and border as transparent until interacted with. */
  transparent?: boolean;
  /** Change to block and expand to 100% of parent width. */
  block?: boolean;
  /** Reduce the inner padding within the button itself. */
  compact?: boolean;
  /** Children to render within the button. */
  children: React.ReactNode;
  /** Set the start node */
  start?: React.ReactNode;
  /** Icon to render at the start of the button. */
  startIcon?: IconName;
  /** Whether the start icon is active */
  startIconActive?: boolean;
  /** Set the end node */
  end?: React.ReactNode;
  /** Icon to render at the end of the button. */
  endIcon?: IconName;
  /** Whether the end icon is active */
  endIconActive?: boolean;
  /** Ensure the button aligns flush on the left or right.
   * This prop will translate the entire button left/right,
   * so take care to ensure it is not overflowing awkwardly
   */
  flush?: 'start' | 'end';
  /** Uniquely identify the button within a form. */
  name?: string;
  /** Don't scale element on press. */
  noScaleOnPress?: boolean;
  /**
   * Truncates text after wrapping to a defined number of lines.
   * @default 1
   */
  numberOfLines?: number;
}`,signature:{properties:[{key:"variant",value:{name:"union",raw:`| 'primary'
| 'secondary'
| 'tertiary'
| 'positive'
| 'negative'
| 'foregroundMuted'`,elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"},{name:"literal",value:"'tertiary'"},{name:"literal",value:"'positive'"},{name:"literal",value:"'negative'"},{name:"literal",value:"'foregroundMuted'"}],required:!1},description:`Toggle design and visual variants.
@default primary`},{key:"disabled",value:{name:"boolean",required:!1},description:"Mark the button as disabled."},{key:"loading",value:{name:"boolean",required:!1},description:"Mark the button as loading and display a spinner."},{key:"transparent",value:{name:"boolean",required:!1},description:"Mark the background and border as transparent until interacted with."},{key:"block",value:{name:"boolean",required:!1},description:"Change to block and expand to 100% of parent width."},{key:"compact",value:{name:"boolean",required:!1},description:"Reduce the inner padding within the button itself."},{key:"children",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0},description:"Children to render within the button."},{key:"start",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"Set the start node"},{key:"startIcon",value:{name:"union",raw:`| 'account'
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
| 'xLogo'`,elements:[{name:"literal",value:"'account'"},{name:"literal",value:"'activity'"},{name:"literal",value:"'add'"},{name:"literal",value:"'addPeople'"},{name:"literal",value:"'advancedMarketSelector'"},{name:"literal",value:"'advancedTradeProduct'"},{name:"literal",value:"'affiliates'"},{name:"literal",value:"'airdrop'"},{name:"literal",value:"'airdropAlt'"},{name:"literal",value:"'airdropCoins'"},{name:"literal",value:"'airdropParachute'"},{name:"literal",value:"'alien'"},{name:"literal",value:"'allTimeHigh'"},{name:"literal",value:"'allocation'"},{name:"literal",value:"'annotation'"},{name:"literal",value:"'api'"},{name:"literal",value:"'apiPlug'"},{name:"literal",value:"'apothecary'"},{name:"literal",value:"'appSwitcher'"},{name:"literal",value:"'apple'"},{name:"literal",value:"'appleLogo'"},{name:"literal",value:"'application'"},{name:"literal",value:"'arrowDown'"},{name:"literal",value:"'arrowLeft'"},{name:"literal",value:"'arrowRight'"},{name:"literal",value:"'arrowUp'"},{name:"literal",value:"'arrowsHorizontal'"},{name:"literal",value:"'arrowsUpDown'"},{name:"literal",value:"'arrowsVertical'"},{name:"literal",value:"'artwork'"},{name:"literal",value:"'assetHubProduct'"},{name:"literal",value:"'assetManagementProduct'"},{name:"literal",value:"'astronautHelmet'"},{name:"literal",value:"'atSign'"},{name:"literal",value:"'atomScience'"},{name:"literal",value:"'auto'"},{name:"literal",value:"'autoCar'"},{name:"literal",value:"'avatar'"},{name:"literal",value:"'average'"},{name:"literal",value:"'backArrow'"},{name:"literal",value:"'ballot'"},{name:"literal",value:"'ballotbox'"},{name:"literal",value:"'bandage'"},{name:"literal",value:"'bank'"},{name:"literal",value:"'barChartSimple'"},{name:"literal",value:"'barChartWindow'"},{name:"literal",value:"'base'"},{name:"literal",value:"'baseApps'"},{name:"literal",value:"'baseFeed'"},{name:"literal",value:"'baseNotification'"},{name:"literal",value:"'baseQuickBuy'"},{name:"literal",value:"'baseSquare'"},{name:"literal",value:"'baseTransact'"},{name:"literal",value:"'baseVerification'"},{name:"literal",value:"'baseWallet'"},{name:"literal",value:"'baseball'"},{name:"literal",value:"'basketball'"},{name:"literal",value:"'beaker'"},{name:"literal",value:"'beginningArrow'"},{name:"literal",value:"'bell'"},{name:"literal",value:"'bellCheck'"},{name:"literal",value:"'bellPlus'"},{name:"literal",value:"'birthcertificate'"},{name:"literal",value:"'block'"},{name:"literal",value:"'blockchain'"},{name:"literal",value:"'blog'"},{name:"literal",value:"'book'"},{name:"literal",value:"'bookmark'"},{name:"literal",value:"'borrowProduct'"},{name:"literal",value:"'boxing'"},{name:"literal",value:"'bridging'"},{name:"literal",value:"'briefcase'"},{name:"literal",value:"'briefcaseAlt'"},{name:"literal",value:"'browser'"},{name:"literal",value:"'bug'"},{name:"literal",value:"'building'"},{name:"literal",value:"'calculator'"},{name:"literal",value:"'calendar'"},{name:"literal",value:"'calendarBlank'"},{name:"literal",value:"'calendarDates'"},{name:"literal",value:"'calendarEmpty'"},{name:"literal",value:"'calendarHeart'"},{name:"literal",value:"'calendarMoney'"},{name:"literal",value:"'calendarStar'"},{name:"literal",value:"'camera'"},{name:"literal",value:"'candlesticks'"},{name:"literal",value:"'car'"},{name:"literal",value:"'card'"},{name:"literal",value:"'caret'"},{name:"literal",value:"'caretDown'"},{name:"literal",value:"'caretLeft'"},{name:"literal",value:"'caretRight'"},{name:"literal",value:"'caretUp'"},{name:"literal",value:"'cash'"},{name:"literal",value:"'cashAustralianDollar'"},{name:"literal",value:"'cashBrazilianReal'"},{name:"literal",value:"'cashBrazillianReal'"},{name:"literal",value:"'cashCanadianDollar'"},{name:"literal",value:"'cashCoins'"},{name:"literal",value:"'cashEUR'"},{name:"literal",value:"'cashGBP'"},{name:"literal",value:"'cashIndonesianRupiah'"},{name:"literal",value:"'cashJPY'"},{name:"literal",value:"'cashPhilippinePeso'"},{name:"literal",value:"'cashPolishZloty'"},{name:"literal",value:"'cashRupee'"},{name:"literal",value:"'cashSingaporeDollar'"},{name:"literal",value:"'cashSwissFranc'"},{name:"literal",value:"'cashThaiBaht'"},{name:"literal",value:"'cashTurkishLira'"},{name:"literal",value:"'cashUSD'"},{name:"literal",value:"'cashUaeDirham'"},{name:"literal",value:"'cashVietnameseDong'"},{name:"literal",value:"'chainLink'"},{name:"literal",value:"'chartBar'"},{name:"literal",value:"'chartCandles'"},{name:"literal",value:"'chartLine'"},{name:"literal",value:"'chartPie'"},{name:"literal",value:"'chartPieCircle'"},{name:"literal",value:"'chartVolume'"},{name:"literal",value:"'chatBotAgent'"},{name:"literal",value:"'chatBubble'"},{name:"literal",value:"'chatRequests'"},{name:"literal",value:"'checkboxChecked'"},{name:"literal",value:"'checkboxEmpty'"},{name:"literal",value:"'checkmark'"},{name:"literal",value:"'chess'"},{name:"literal",value:"'circleCheckmark'"},{name:"literal",value:"'circleCross'"},{name:"literal",value:"'circulatingSupply'"},{name:"literal",value:"'city'"},{name:"literal",value:"'clipboard'"},{name:"literal",value:"'clock'"},{name:"literal",value:"'clockOutline'"},{name:"literal",value:"'close'"},{name:"literal",value:"'closeCaption'"},{name:"literal",value:"'clothing'"},{name:"literal",value:"'cloud'"},{name:"literal",value:"'cloudPartial'"},{name:"literal",value:"'cloudProduct'"},{name:"literal",value:"'cluster'"},{name:"literal",value:"'coinbase'"},{name:"literal",value:"'coinbaseCardProduct'"},{name:"literal",value:"'coinbaseOne'"},{name:"literal",value:"'coinbaseOneCard'"},{name:"literal",value:"'coinbaseOneLogo'"},{name:"literal",value:"'coinbaseRewards'"},{name:"literal",value:"'coinsCrypto'"},{name:"literal",value:"'collapse'"},{name:"literal",value:"'collectibles'"},{name:"literal",value:"'collection'"},{name:"literal",value:"'comment'"},{name:"literal",value:"'commentPlus'"},{name:"literal",value:"'commerceProduct'"},{name:"literal",value:"'compass'"},{name:"literal",value:"'complianceProduct'"},{name:"literal",value:"'compose'"},{name:"literal",value:"'computerChip'"},{name:"literal",value:"'concierge'"},{name:"literal",value:"'conciergeBell'"},{name:"literal",value:"'config'"},{name:"literal",value:"'continuous'"},{name:"literal",value:"'convert'"},{name:"literal",value:"'copy'"},{name:"literal",value:"'corporation'"},{name:"literal",value:"'creatorCoin'"},{name:"literal",value:"'cricket'"},{name:"literal",value:"'cross'"},{name:"literal",value:"'crossTrade'"},{name:"literal",value:"'crypto'"},{name:"literal",value:"'cryptobasics'"},{name:"literal",value:"'crystalBall'"},{name:"literal",value:"'crystalBallInsight'"},{name:"literal",value:"'currencies'"},{name:"literal",value:"'custodyProduct'"},{name:"literal",value:"'dashboard'"},{name:"literal",value:"'dataMarketplaceProduct'"},{name:"literal",value:"'dataStack'"},{name:"literal",value:"'defi'"},{name:"literal",value:"'delegateProduct'"},{name:"literal",value:"'deposit'"},{name:"literal",value:"'derivatives'"},{name:"literal",value:"'derivativesProduct'"},{name:"literal",value:"'derivativesProductNew'"},{name:"literal",value:"'developerAPIProduct'"},{name:"literal",value:"'developerPlatformProduct'"},{name:"literal",value:"'dex'"},{name:"literal",value:"'diagonalDownArrow'"},{name:"literal",value:"'diagonalRightArrow'"},{name:"literal",value:"'diagonalUpArrow'"},{name:"literal",value:"'diamond'"},{name:"literal",value:"'diamondIncentives'"},{name:"literal",value:"'dinnerPlate'"},{name:"literal",value:"'directDeposit'"},{name:"literal",value:"'directDepositIcon'"},{name:"literal",value:"'disabledPhone'"},{name:"literal",value:"'discordLogo'"},{name:"literal",value:"'distribution'"},{name:"literal",value:"'document'"},{name:"literal",value:"'documentation'"},{name:"literal",value:"'dot'"},{name:"literal",value:"'doubleChevronRight'"},{name:"literal",value:"'downArrow'"},{name:"literal",value:"'download'"},{name:"literal",value:"'drag'"},{name:"literal",value:"'drops'"},{name:"literal",value:"'earn'"},{name:"literal",value:"'earnProduct'"},{name:"literal",value:"'earnRewards'"},{name:"literal",value:"'earthquake'"},{name:"literal",value:"'educationBook'"},{name:"literal",value:"'educationPencil'"},{name:"literal",value:"'email'"},{name:"literal",value:"'endArrow'"},{name:"literal",value:"'entertainment'"},{name:"literal",value:"'error'"},{name:"literal",value:"'ethereum'"},{name:"literal",value:"'eventContracts'"},{name:"literal",value:"'exchangeProduct'"},{name:"literal",value:"'exclamationMark'"},{name:"literal",value:"'expand'"},{name:"literal",value:"'expandAddress'"},{name:"literal",value:"'expandAll'"},{name:"literal",value:"'externalLink'"},{name:"literal",value:"'eye'"},{name:"literal",value:"'faceScan'"},{name:"literal",value:"'faces'"},{name:"literal",value:"'factory'"},{name:"literal",value:"'faucet'"},{name:"literal",value:"'fib'"},{name:"literal",value:"'filmStrip'"},{name:"literal",value:"'filter'"},{name:"literal",value:"'fingerprint'"},{name:"literal",value:"'flame'"},{name:"literal",value:"'folder'"},{name:"literal",value:"'folderArrow'"},{name:"literal",value:"'folderOpen'"},{name:"literal",value:"'followAdd'"},{name:"literal",value:"'following'"},{name:"literal",value:"'football'"},{name:"literal",value:"'fork'"},{name:"literal",value:"'forwardArrow'"},{name:"literal",value:"'fscsProtection'"},{name:"literal",value:"'gab'"},{name:"literal",value:"'games'"},{name:"literal",value:"'gaming'"},{name:"literal",value:"'gasFees'"},{name:"literal",value:"'gasFeesAlt'"},{name:"literal",value:"'gauge'"},{name:"literal",value:"'gaugeEmpty'"},{name:"literal",value:"'gaugeHigh'"},{name:"literal",value:"'gaugeHighLow'"},{name:"literal",value:"'gaugeHighMid'"},{name:"literal",value:"'gaugeLow'"},{name:"literal",value:"'gaugeLowHigh'"},{name:"literal",value:"'gaugeLowMid'"},{name:"literal",value:"'gaugeMedium'"},{name:"literal",value:"'gavel'"},{name:"literal",value:"'gear'"},{name:"literal",value:"'generalCharacter'"},{name:"literal",value:"'ghost'"},{name:"literal",value:"'gif'"},{name:"literal",value:"'giftBox'"},{name:"literal",value:"'giftCard'"},{name:"literal",value:"'gitHubLogo'"},{name:"literal",value:"'globe'"},{name:"literal",value:"'golf'"},{name:"literal",value:"'googleLogo'"},{name:"literal",value:"'greenEnergy'"},{name:"literal",value:"'grid'"},{name:"literal",value:"'group'"},{name:"literal",value:"'hamburger'"},{name:"literal",value:"'hammer'"},{name:"literal",value:"'heart'"},{name:"literal",value:"'helpCenterProduct'"},{name:"literal",value:"'helpCenterQuestionMark'"},{name:"literal",value:"'hiddenEye'"},{name:"literal",value:"'hockey'"},{name:"literal",value:"'home'"},{name:"literal",value:"'horizontalLine'"},{name:"literal",value:"'hospital'"},{name:"literal",value:"'hospitalCross'"},{name:"literal",value:"'hurricane'"},{name:"literal",value:"'ideal'"},{name:"literal",value:"'identityCard'"},{name:"literal",value:"'image'"},{name:"literal",value:"'info'"},{name:"literal",value:"'initiator'"},{name:"literal",value:"'instagramLogo'"},{name:"literal",value:"'instantUnstakingClock'"},{name:"literal",value:"'institute'"},{name:"literal",value:"'institutionalProduct'"},{name:"literal",value:"'interest'"},{name:"literal",value:"'invisible'"},{name:"literal",value:"'invoice'"},{name:"literal",value:"'key'"},{name:"literal",value:"'keyboard'"},{name:"literal",value:"'laptop'"},{name:"literal",value:"'leadChart'"},{name:"literal",value:"'leadCoin'"},{name:"literal",value:"'learningRewardsProduct'"},{name:"literal",value:"'light'"},{name:"literal",value:"'lightbulb'"},{name:"literal",value:"'lightning'"},{name:"literal",value:"'lightningBolt'"},{name:"literal",value:"'lineChartCrypto'"},{name:"literal",value:"'list'"},{name:"literal",value:"'location'"},{name:"literal",value:"'lock'"},{name:"literal",value:"'login'"},{name:"literal",value:"'logout'"},{name:"literal",value:"'loop'"},{name:"literal",value:"'magnifyingGlass'"},{name:"literal",value:"'marketCap'"},{name:"literal",value:"'medal'"},{name:"literal",value:"'megaphone'"},{name:"literal",value:"'menu'"},{name:"literal",value:"'metaverse'"},{name:"literal",value:"'microphone'"},{name:"literal",value:"'microphoneCordless'"},{name:"literal",value:"'microscope'"},{name:"literal",value:"'mint'"},{name:"literal",value:"'minus'"},{name:"literal",value:"'mma'"},{name:"literal",value:"'moneyCardCoin'"},{name:"literal",value:"'moon'"},{name:"literal",value:"'more'"},{name:"literal",value:"'moreVertical'"},{name:"literal",value:"'motorsport'"},{name:"literal",value:"'music'"},{name:"literal",value:"'musicArticles'"},{name:"literal",value:"'needle'"},{name:"literal",value:"'newsFeed'"},{name:"literal",value:"'newsletter'"},{name:"literal",value:"'nft'"},{name:"literal",value:"'nftBuy'"},{name:"literal",value:"'nftOffer'"},{name:"literal",value:"'nftProduct'"},{name:"literal",value:"'nftSale'"},{name:"literal",value:"'noRocket'"},{name:"literal",value:"'noWifi'"},{name:"literal",value:"'nodeProduct'"},{name:"literal",value:"'oil'"},{name:"literal",value:"'options'"},{name:"literal",value:"'orderBook'"},{name:"literal",value:"'orderHistory'"},{name:"literal",value:"'outline'"},{name:"literal",value:"'pFPS'"},{name:"literal",value:"'paperAirplane'"},{name:"literal",value:"'paperclip'"},{name:"literal",value:"'participate'"},{name:"literal",value:"'participateProduct'"},{name:"literal",value:"'passKey'"},{name:"literal",value:"'passport'"},{name:"literal",value:"'pause'"},{name:"literal",value:"'pay'"},{name:"literal",value:"'payProduct'"},{name:"literal",value:"'paymentCard'"},{name:"literal",value:"'payments'"},{name:"literal",value:"'payouts'"},{name:"literal",value:"'paypal'"},{name:"literal",value:"'pencil'"},{name:"literal",value:"'peopleGroup'"},{name:"literal",value:"'peopleStar'"},{name:"literal",value:"'percentage'"},{name:"literal",value:"'perpetualSwap'"},{name:"literal",value:"'phone'"},{name:"literal",value:"'pieChartData'"},{name:"literal",value:"'pillBottle'"},{name:"literal",value:"'pillCapsule'"},{name:"literal",value:"'pin'"},{name:"literal",value:"'plane'"},{name:"literal",value:"'planet'"},{name:"literal",value:"'play'"},{name:"literal",value:"'playbutton'"},{name:"literal",value:"'plusMinus'"},{name:"literal",value:"'podiumStar'"},{name:"literal",value:"'politicsBuilding'"},{name:"literal",value:"'politicsCandidate'"},{name:"literal",value:"'politicsFlag'"},{name:"literal",value:"'politicsGavel'"},{name:"literal",value:"'politicsPodium'"},{name:"literal",value:"'politicsStar'"},{name:"literal",value:"'powerTool'"},{name:"literal",value:"'priceAlerts'"},{name:"literal",value:"'priceAlertsCheck'"},{name:"literal",value:"'primePoduct'"},{name:"literal",value:"'privateClientProduct'"},{name:"literal",value:"'proProduct'"},{name:"literal",value:"'profile'"},{name:"literal",value:"'protection'"},{name:"literal",value:"'pulse'"},{name:"literal",value:"'pyramid'"},{name:"literal",value:"'qrCode'"},{name:"literal",value:"'qrCodeAlt'"},{name:"literal",value:"'queryTransact'"},{name:"literal",value:"'questionMark'"},{name:"literal",value:"'quotation'"},{name:"literal",value:"'rain'"},{name:"literal",value:"'ratingsCheck'"},{name:"literal",value:"'ratingsChecks'"},{name:"literal",value:"'ratingsStar'"},{name:"literal",value:"'reCenter'"},{name:"literal",value:"'rectangle'"},{name:"literal",value:"'recurring'"},{name:"literal",value:"'refresh'"},{name:"literal",value:"'regulated'"},{name:"literal",value:"'regulatedFutures'"},{name:"literal",value:"'report'"},{name:"literal",value:"'rewardsProduct'"},{name:"literal",value:"'ribbon'"},{name:"literal",value:"'robot'"},{name:"literal",value:"'rocket'"},{name:"literal",value:"'rocketShip'"},{name:"literal",value:"'rollingSpot'"},{name:"literal",value:"'rosettaProduct'"},{name:"literal",value:"'rottenTomato'"},{name:"literal",value:"'royalty'"},{name:"literal",value:"'safe'"},{name:"literal",value:"'save'"},{name:"literal",value:"'savingsBank'"},{name:"literal",value:"'scanQrCode'"},{name:"literal",value:"'scienceAtom'"},{name:"literal",value:"'scienceBeaker'"},{name:"literal",value:"'scienceMoon'"},{name:"literal",value:"'search'"},{name:"literal",value:"'securityKey'"},{name:"literal",value:"'securityShield'"},{name:"literal",value:"'seen'"},{name:"literal",value:"'sendReceive'"},{name:"literal",value:"'setPinCode'"},{name:"literal",value:"'settings'"},{name:"literal",value:"'share'"},{name:"literal",value:"'shield'"},{name:"literal",value:"'shieldOutline'"},{name:"literal",value:"'shoe'"},{name:"literal",value:"'shoppingCart'"},{name:"literal",value:"'signinProduct'"},{name:"literal",value:"'singleCoin'"},{name:"literal",value:"'singleNote'"},{name:"literal",value:"'singlecloud'"},{name:"literal",value:"'smartContract'"},{name:"literal",value:"'snow'"},{name:"literal",value:"'soccer'"},{name:"literal",value:"'socialChat'"},{name:"literal",value:"'socialReshare'"},{name:"literal",value:"'socialShare'"},{name:"literal",value:"'sofort'"},{name:"literal",value:"'sortDoubleArrow'"},{name:"literal",value:"'sortDown'"},{name:"literal",value:"'sortDownCenter'"},{name:"literal",value:"'sortUp'"},{name:"literal",value:"'sortUpCenter'"},{name:"literal",value:"'soundOff'"},{name:"literal",value:"'soundOn'"},{name:"literal",value:"'sparkle'"},{name:"literal",value:"'speaker'"},{name:"literal",value:"'speechBubble'"},{name:"literal",value:"'stableCoin'"},{name:"literal",value:"'stablecoinStack'"},{name:"literal",value:"'staggeredList'"},{name:"literal",value:"'stake'"},{name:"literal",value:"'staking'"},{name:"literal",value:"'star'"},{name:"literal",value:"'starAward'"},{name:"literal",value:"'starBubble'"},{name:"literal",value:"'starTrophy'"},{name:"literal",value:"'statusDot'"},{name:"literal",value:"'step0'"},{name:"literal",value:"'step1'"},{name:"literal",value:"'step2'"},{name:"literal",value:"'step3'"},{name:"literal",value:"'step4'"},{name:"literal",value:"'step5'"},{name:"literal",value:"'step6'"},{name:"literal",value:"'step7'"},{name:"literal",value:"'step8'"},{name:"literal",value:"'step9'"},{name:"literal",value:"'strategy'"},{name:"literal",value:"'sun'"},{name:"literal",value:"'support'"},{name:"literal",value:"'tag'"},{name:"literal",value:"'taxes'"},{name:"literal",value:"'taxesReceipt'"},{name:"literal",value:"'telephone'"},{name:"literal",value:"'tennis'"},{name:"literal",value:"'test'"},{name:"literal",value:"'thermometer'"},{name:"literal",value:"'thumbsDown'"},{name:"literal",value:"'thumbsDownOutline'"},{name:"literal",value:"'thumbsUp'"},{name:"literal",value:"'thumbsUpOutline'"},{name:"literal",value:"'tokenLaunchCoin'"},{name:"literal",value:"'tokenLaunchRocket'"},{name:"literal",value:"'tokenSales'"},{name:"literal",value:"'tornado'"},{name:"literal",value:"'trading'"},{name:"literal",value:"'transactions'"},{name:"literal",value:"'trashCan'"},{name:"literal",value:"'trophy'"},{name:"literal",value:"'trophyCup'"},{name:"literal",value:"'tshirt'"},{name:"literal",value:"'tv'"},{name:"literal",value:"'tvStand'"},{name:"literal",value:"'twitterLogo'"},{name:"literal",value:"'ultility'"},{name:"literal",value:"'umbrella'"},{name:"literal",value:"'undo'"},{name:"literal",value:"'unfollowPeople'"},{name:"literal",value:"'unknown'"},{name:"literal",value:"'unlock'"},{name:"literal",value:"'upArrow'"},{name:"literal",value:"'upload'"},{name:"literal",value:"'venturesProduct'"},{name:"literal",value:"'verifiedBadge'"},{name:"literal",value:"'verifiedPools'"},{name:"literal",value:"'verticalLine'"},{name:"literal",value:"'virus'"},{name:"literal",value:"'visible'"},{name:"literal",value:"'waasProduct'"},{name:"literal",value:"'wallet'"},{name:"literal",value:"'walletLogo'"},{name:"literal",value:"'walletProduct'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'webhooks'"},{name:"literal",value:"'wellness'"},{name:"literal",value:"'wifi'"},{name:"literal",value:"'wind'"},{name:"literal",value:"'wireTransfer'"},{name:"literal",value:"'withdraw'"},{name:"literal",value:"'wrapToken'"},{name:"literal",value:"'xLogo'"}],required:!0},description:"Icon to render at the start of the button."},{key:"startIconActive",value:{name:"boolean",required:!1},description:"Whether the start icon is active"},{key:"end",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"Set the end node"},{key:"endIcon",value:{name:"union",raw:`| 'account'
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
| 'xLogo'`,elements:[{name:"literal",value:"'account'"},{name:"literal",value:"'activity'"},{name:"literal",value:"'add'"},{name:"literal",value:"'addPeople'"},{name:"literal",value:"'advancedMarketSelector'"},{name:"literal",value:"'advancedTradeProduct'"},{name:"literal",value:"'affiliates'"},{name:"literal",value:"'airdrop'"},{name:"literal",value:"'airdropAlt'"},{name:"literal",value:"'airdropCoins'"},{name:"literal",value:"'airdropParachute'"},{name:"literal",value:"'alien'"},{name:"literal",value:"'allTimeHigh'"},{name:"literal",value:"'allocation'"},{name:"literal",value:"'annotation'"},{name:"literal",value:"'api'"},{name:"literal",value:"'apiPlug'"},{name:"literal",value:"'apothecary'"},{name:"literal",value:"'appSwitcher'"},{name:"literal",value:"'apple'"},{name:"literal",value:"'appleLogo'"},{name:"literal",value:"'application'"},{name:"literal",value:"'arrowDown'"},{name:"literal",value:"'arrowLeft'"},{name:"literal",value:"'arrowRight'"},{name:"literal",value:"'arrowUp'"},{name:"literal",value:"'arrowsHorizontal'"},{name:"literal",value:"'arrowsUpDown'"},{name:"literal",value:"'arrowsVertical'"},{name:"literal",value:"'artwork'"},{name:"literal",value:"'assetHubProduct'"},{name:"literal",value:"'assetManagementProduct'"},{name:"literal",value:"'astronautHelmet'"},{name:"literal",value:"'atSign'"},{name:"literal",value:"'atomScience'"},{name:"literal",value:"'auto'"},{name:"literal",value:"'autoCar'"},{name:"literal",value:"'avatar'"},{name:"literal",value:"'average'"},{name:"literal",value:"'backArrow'"},{name:"literal",value:"'ballot'"},{name:"literal",value:"'ballotbox'"},{name:"literal",value:"'bandage'"},{name:"literal",value:"'bank'"},{name:"literal",value:"'barChartSimple'"},{name:"literal",value:"'barChartWindow'"},{name:"literal",value:"'base'"},{name:"literal",value:"'baseApps'"},{name:"literal",value:"'baseFeed'"},{name:"literal",value:"'baseNotification'"},{name:"literal",value:"'baseQuickBuy'"},{name:"literal",value:"'baseSquare'"},{name:"literal",value:"'baseTransact'"},{name:"literal",value:"'baseVerification'"},{name:"literal",value:"'baseWallet'"},{name:"literal",value:"'baseball'"},{name:"literal",value:"'basketball'"},{name:"literal",value:"'beaker'"},{name:"literal",value:"'beginningArrow'"},{name:"literal",value:"'bell'"},{name:"literal",value:"'bellCheck'"},{name:"literal",value:"'bellPlus'"},{name:"literal",value:"'birthcertificate'"},{name:"literal",value:"'block'"},{name:"literal",value:"'blockchain'"},{name:"literal",value:"'blog'"},{name:"literal",value:"'book'"},{name:"literal",value:"'bookmark'"},{name:"literal",value:"'borrowProduct'"},{name:"literal",value:"'boxing'"},{name:"literal",value:"'bridging'"},{name:"literal",value:"'briefcase'"},{name:"literal",value:"'briefcaseAlt'"},{name:"literal",value:"'browser'"},{name:"literal",value:"'bug'"},{name:"literal",value:"'building'"},{name:"literal",value:"'calculator'"},{name:"literal",value:"'calendar'"},{name:"literal",value:"'calendarBlank'"},{name:"literal",value:"'calendarDates'"},{name:"literal",value:"'calendarEmpty'"},{name:"literal",value:"'calendarHeart'"},{name:"literal",value:"'calendarMoney'"},{name:"literal",value:"'calendarStar'"},{name:"literal",value:"'camera'"},{name:"literal",value:"'candlesticks'"},{name:"literal",value:"'car'"},{name:"literal",value:"'card'"},{name:"literal",value:"'caret'"},{name:"literal",value:"'caretDown'"},{name:"literal",value:"'caretLeft'"},{name:"literal",value:"'caretRight'"},{name:"literal",value:"'caretUp'"},{name:"literal",value:"'cash'"},{name:"literal",value:"'cashAustralianDollar'"},{name:"literal",value:"'cashBrazilianReal'"},{name:"literal",value:"'cashBrazillianReal'"},{name:"literal",value:"'cashCanadianDollar'"},{name:"literal",value:"'cashCoins'"},{name:"literal",value:"'cashEUR'"},{name:"literal",value:"'cashGBP'"},{name:"literal",value:"'cashIndonesianRupiah'"},{name:"literal",value:"'cashJPY'"},{name:"literal",value:"'cashPhilippinePeso'"},{name:"literal",value:"'cashPolishZloty'"},{name:"literal",value:"'cashRupee'"},{name:"literal",value:"'cashSingaporeDollar'"},{name:"literal",value:"'cashSwissFranc'"},{name:"literal",value:"'cashThaiBaht'"},{name:"literal",value:"'cashTurkishLira'"},{name:"literal",value:"'cashUSD'"},{name:"literal",value:"'cashUaeDirham'"},{name:"literal",value:"'cashVietnameseDong'"},{name:"literal",value:"'chainLink'"},{name:"literal",value:"'chartBar'"},{name:"literal",value:"'chartCandles'"},{name:"literal",value:"'chartLine'"},{name:"literal",value:"'chartPie'"},{name:"literal",value:"'chartPieCircle'"},{name:"literal",value:"'chartVolume'"},{name:"literal",value:"'chatBotAgent'"},{name:"literal",value:"'chatBubble'"},{name:"literal",value:"'chatRequests'"},{name:"literal",value:"'checkboxChecked'"},{name:"literal",value:"'checkboxEmpty'"},{name:"literal",value:"'checkmark'"},{name:"literal",value:"'chess'"},{name:"literal",value:"'circleCheckmark'"},{name:"literal",value:"'circleCross'"},{name:"literal",value:"'circulatingSupply'"},{name:"literal",value:"'city'"},{name:"literal",value:"'clipboard'"},{name:"literal",value:"'clock'"},{name:"literal",value:"'clockOutline'"},{name:"literal",value:"'close'"},{name:"literal",value:"'closeCaption'"},{name:"literal",value:"'clothing'"},{name:"literal",value:"'cloud'"},{name:"literal",value:"'cloudPartial'"},{name:"literal",value:"'cloudProduct'"},{name:"literal",value:"'cluster'"},{name:"literal",value:"'coinbase'"},{name:"literal",value:"'coinbaseCardProduct'"},{name:"literal",value:"'coinbaseOne'"},{name:"literal",value:"'coinbaseOneCard'"},{name:"literal",value:"'coinbaseOneLogo'"},{name:"literal",value:"'coinbaseRewards'"},{name:"literal",value:"'coinsCrypto'"},{name:"literal",value:"'collapse'"},{name:"literal",value:"'collectibles'"},{name:"literal",value:"'collection'"},{name:"literal",value:"'comment'"},{name:"literal",value:"'commentPlus'"},{name:"literal",value:"'commerceProduct'"},{name:"literal",value:"'compass'"},{name:"literal",value:"'complianceProduct'"},{name:"literal",value:"'compose'"},{name:"literal",value:"'computerChip'"},{name:"literal",value:"'concierge'"},{name:"literal",value:"'conciergeBell'"},{name:"literal",value:"'config'"},{name:"literal",value:"'continuous'"},{name:"literal",value:"'convert'"},{name:"literal",value:"'copy'"},{name:"literal",value:"'corporation'"},{name:"literal",value:"'creatorCoin'"},{name:"literal",value:"'cricket'"},{name:"literal",value:"'cross'"},{name:"literal",value:"'crossTrade'"},{name:"literal",value:"'crypto'"},{name:"literal",value:"'cryptobasics'"},{name:"literal",value:"'crystalBall'"},{name:"literal",value:"'crystalBallInsight'"},{name:"literal",value:"'currencies'"},{name:"literal",value:"'custodyProduct'"},{name:"literal",value:"'dashboard'"},{name:"literal",value:"'dataMarketplaceProduct'"},{name:"literal",value:"'dataStack'"},{name:"literal",value:"'defi'"},{name:"literal",value:"'delegateProduct'"},{name:"literal",value:"'deposit'"},{name:"literal",value:"'derivatives'"},{name:"literal",value:"'derivativesProduct'"},{name:"literal",value:"'derivativesProductNew'"},{name:"literal",value:"'developerAPIProduct'"},{name:"literal",value:"'developerPlatformProduct'"},{name:"literal",value:"'dex'"},{name:"literal",value:"'diagonalDownArrow'"},{name:"literal",value:"'diagonalRightArrow'"},{name:"literal",value:"'diagonalUpArrow'"},{name:"literal",value:"'diamond'"},{name:"literal",value:"'diamondIncentives'"},{name:"literal",value:"'dinnerPlate'"},{name:"literal",value:"'directDeposit'"},{name:"literal",value:"'directDepositIcon'"},{name:"literal",value:"'disabledPhone'"},{name:"literal",value:"'discordLogo'"},{name:"literal",value:"'distribution'"},{name:"literal",value:"'document'"},{name:"literal",value:"'documentation'"},{name:"literal",value:"'dot'"},{name:"literal",value:"'doubleChevronRight'"},{name:"literal",value:"'downArrow'"},{name:"literal",value:"'download'"},{name:"literal",value:"'drag'"},{name:"literal",value:"'drops'"},{name:"literal",value:"'earn'"},{name:"literal",value:"'earnProduct'"},{name:"literal",value:"'earnRewards'"},{name:"literal",value:"'earthquake'"},{name:"literal",value:"'educationBook'"},{name:"literal",value:"'educationPencil'"},{name:"literal",value:"'email'"},{name:"literal",value:"'endArrow'"},{name:"literal",value:"'entertainment'"},{name:"literal",value:"'error'"},{name:"literal",value:"'ethereum'"},{name:"literal",value:"'eventContracts'"},{name:"literal",value:"'exchangeProduct'"},{name:"literal",value:"'exclamationMark'"},{name:"literal",value:"'expand'"},{name:"literal",value:"'expandAddress'"},{name:"literal",value:"'expandAll'"},{name:"literal",value:"'externalLink'"},{name:"literal",value:"'eye'"},{name:"literal",value:"'faceScan'"},{name:"literal",value:"'faces'"},{name:"literal",value:"'factory'"},{name:"literal",value:"'faucet'"},{name:"literal",value:"'fib'"},{name:"literal",value:"'filmStrip'"},{name:"literal",value:"'filter'"},{name:"literal",value:"'fingerprint'"},{name:"literal",value:"'flame'"},{name:"literal",value:"'folder'"},{name:"literal",value:"'folderArrow'"},{name:"literal",value:"'folderOpen'"},{name:"literal",value:"'followAdd'"},{name:"literal",value:"'following'"},{name:"literal",value:"'football'"},{name:"literal",value:"'fork'"},{name:"literal",value:"'forwardArrow'"},{name:"literal",value:"'fscsProtection'"},{name:"literal",value:"'gab'"},{name:"literal",value:"'games'"},{name:"literal",value:"'gaming'"},{name:"literal",value:"'gasFees'"},{name:"literal",value:"'gasFeesAlt'"},{name:"literal",value:"'gauge'"},{name:"literal",value:"'gaugeEmpty'"},{name:"literal",value:"'gaugeHigh'"},{name:"literal",value:"'gaugeHighLow'"},{name:"literal",value:"'gaugeHighMid'"},{name:"literal",value:"'gaugeLow'"},{name:"literal",value:"'gaugeLowHigh'"},{name:"literal",value:"'gaugeLowMid'"},{name:"literal",value:"'gaugeMedium'"},{name:"literal",value:"'gavel'"},{name:"literal",value:"'gear'"},{name:"literal",value:"'generalCharacter'"},{name:"literal",value:"'ghost'"},{name:"literal",value:"'gif'"},{name:"literal",value:"'giftBox'"},{name:"literal",value:"'giftCard'"},{name:"literal",value:"'gitHubLogo'"},{name:"literal",value:"'globe'"},{name:"literal",value:"'golf'"},{name:"literal",value:"'googleLogo'"},{name:"literal",value:"'greenEnergy'"},{name:"literal",value:"'grid'"},{name:"literal",value:"'group'"},{name:"literal",value:"'hamburger'"},{name:"literal",value:"'hammer'"},{name:"literal",value:"'heart'"},{name:"literal",value:"'helpCenterProduct'"},{name:"literal",value:"'helpCenterQuestionMark'"},{name:"literal",value:"'hiddenEye'"},{name:"literal",value:"'hockey'"},{name:"literal",value:"'home'"},{name:"literal",value:"'horizontalLine'"},{name:"literal",value:"'hospital'"},{name:"literal",value:"'hospitalCross'"},{name:"literal",value:"'hurricane'"},{name:"literal",value:"'ideal'"},{name:"literal",value:"'identityCard'"},{name:"literal",value:"'image'"},{name:"literal",value:"'info'"},{name:"literal",value:"'initiator'"},{name:"literal",value:"'instagramLogo'"},{name:"literal",value:"'instantUnstakingClock'"},{name:"literal",value:"'institute'"},{name:"literal",value:"'institutionalProduct'"},{name:"literal",value:"'interest'"},{name:"literal",value:"'invisible'"},{name:"literal",value:"'invoice'"},{name:"literal",value:"'key'"},{name:"literal",value:"'keyboard'"},{name:"literal",value:"'laptop'"},{name:"literal",value:"'leadChart'"},{name:"literal",value:"'leadCoin'"},{name:"literal",value:"'learningRewardsProduct'"},{name:"literal",value:"'light'"},{name:"literal",value:"'lightbulb'"},{name:"literal",value:"'lightning'"},{name:"literal",value:"'lightningBolt'"},{name:"literal",value:"'lineChartCrypto'"},{name:"literal",value:"'list'"},{name:"literal",value:"'location'"},{name:"literal",value:"'lock'"},{name:"literal",value:"'login'"},{name:"literal",value:"'logout'"},{name:"literal",value:"'loop'"},{name:"literal",value:"'magnifyingGlass'"},{name:"literal",value:"'marketCap'"},{name:"literal",value:"'medal'"},{name:"literal",value:"'megaphone'"},{name:"literal",value:"'menu'"},{name:"literal",value:"'metaverse'"},{name:"literal",value:"'microphone'"},{name:"literal",value:"'microphoneCordless'"},{name:"literal",value:"'microscope'"},{name:"literal",value:"'mint'"},{name:"literal",value:"'minus'"},{name:"literal",value:"'mma'"},{name:"literal",value:"'moneyCardCoin'"},{name:"literal",value:"'moon'"},{name:"literal",value:"'more'"},{name:"literal",value:"'moreVertical'"},{name:"literal",value:"'motorsport'"},{name:"literal",value:"'music'"},{name:"literal",value:"'musicArticles'"},{name:"literal",value:"'needle'"},{name:"literal",value:"'newsFeed'"},{name:"literal",value:"'newsletter'"},{name:"literal",value:"'nft'"},{name:"literal",value:"'nftBuy'"},{name:"literal",value:"'nftOffer'"},{name:"literal",value:"'nftProduct'"},{name:"literal",value:"'nftSale'"},{name:"literal",value:"'noRocket'"},{name:"literal",value:"'noWifi'"},{name:"literal",value:"'nodeProduct'"},{name:"literal",value:"'oil'"},{name:"literal",value:"'options'"},{name:"literal",value:"'orderBook'"},{name:"literal",value:"'orderHistory'"},{name:"literal",value:"'outline'"},{name:"literal",value:"'pFPS'"},{name:"literal",value:"'paperAirplane'"},{name:"literal",value:"'paperclip'"},{name:"literal",value:"'participate'"},{name:"literal",value:"'participateProduct'"},{name:"literal",value:"'passKey'"},{name:"literal",value:"'passport'"},{name:"literal",value:"'pause'"},{name:"literal",value:"'pay'"},{name:"literal",value:"'payProduct'"},{name:"literal",value:"'paymentCard'"},{name:"literal",value:"'payments'"},{name:"literal",value:"'payouts'"},{name:"literal",value:"'paypal'"},{name:"literal",value:"'pencil'"},{name:"literal",value:"'peopleGroup'"},{name:"literal",value:"'peopleStar'"},{name:"literal",value:"'percentage'"},{name:"literal",value:"'perpetualSwap'"},{name:"literal",value:"'phone'"},{name:"literal",value:"'pieChartData'"},{name:"literal",value:"'pillBottle'"},{name:"literal",value:"'pillCapsule'"},{name:"literal",value:"'pin'"},{name:"literal",value:"'plane'"},{name:"literal",value:"'planet'"},{name:"literal",value:"'play'"},{name:"literal",value:"'playbutton'"},{name:"literal",value:"'plusMinus'"},{name:"literal",value:"'podiumStar'"},{name:"literal",value:"'politicsBuilding'"},{name:"literal",value:"'politicsCandidate'"},{name:"literal",value:"'politicsFlag'"},{name:"literal",value:"'politicsGavel'"},{name:"literal",value:"'politicsPodium'"},{name:"literal",value:"'politicsStar'"},{name:"literal",value:"'powerTool'"},{name:"literal",value:"'priceAlerts'"},{name:"literal",value:"'priceAlertsCheck'"},{name:"literal",value:"'primePoduct'"},{name:"literal",value:"'privateClientProduct'"},{name:"literal",value:"'proProduct'"},{name:"literal",value:"'profile'"},{name:"literal",value:"'protection'"},{name:"literal",value:"'pulse'"},{name:"literal",value:"'pyramid'"},{name:"literal",value:"'qrCode'"},{name:"literal",value:"'qrCodeAlt'"},{name:"literal",value:"'queryTransact'"},{name:"literal",value:"'questionMark'"},{name:"literal",value:"'quotation'"},{name:"literal",value:"'rain'"},{name:"literal",value:"'ratingsCheck'"},{name:"literal",value:"'ratingsChecks'"},{name:"literal",value:"'ratingsStar'"},{name:"literal",value:"'reCenter'"},{name:"literal",value:"'rectangle'"},{name:"literal",value:"'recurring'"},{name:"literal",value:"'refresh'"},{name:"literal",value:"'regulated'"},{name:"literal",value:"'regulatedFutures'"},{name:"literal",value:"'report'"},{name:"literal",value:"'rewardsProduct'"},{name:"literal",value:"'ribbon'"},{name:"literal",value:"'robot'"},{name:"literal",value:"'rocket'"},{name:"literal",value:"'rocketShip'"},{name:"literal",value:"'rollingSpot'"},{name:"literal",value:"'rosettaProduct'"},{name:"literal",value:"'rottenTomato'"},{name:"literal",value:"'royalty'"},{name:"literal",value:"'safe'"},{name:"literal",value:"'save'"},{name:"literal",value:"'savingsBank'"},{name:"literal",value:"'scanQrCode'"},{name:"literal",value:"'scienceAtom'"},{name:"literal",value:"'scienceBeaker'"},{name:"literal",value:"'scienceMoon'"},{name:"literal",value:"'search'"},{name:"literal",value:"'securityKey'"},{name:"literal",value:"'securityShield'"},{name:"literal",value:"'seen'"},{name:"literal",value:"'sendReceive'"},{name:"literal",value:"'setPinCode'"},{name:"literal",value:"'settings'"},{name:"literal",value:"'share'"},{name:"literal",value:"'shield'"},{name:"literal",value:"'shieldOutline'"},{name:"literal",value:"'shoe'"},{name:"literal",value:"'shoppingCart'"},{name:"literal",value:"'signinProduct'"},{name:"literal",value:"'singleCoin'"},{name:"literal",value:"'singleNote'"},{name:"literal",value:"'singlecloud'"},{name:"literal",value:"'smartContract'"},{name:"literal",value:"'snow'"},{name:"literal",value:"'soccer'"},{name:"literal",value:"'socialChat'"},{name:"literal",value:"'socialReshare'"},{name:"literal",value:"'socialShare'"},{name:"literal",value:"'sofort'"},{name:"literal",value:"'sortDoubleArrow'"},{name:"literal",value:"'sortDown'"},{name:"literal",value:"'sortDownCenter'"},{name:"literal",value:"'sortUp'"},{name:"literal",value:"'sortUpCenter'"},{name:"literal",value:"'soundOff'"},{name:"literal",value:"'soundOn'"},{name:"literal",value:"'sparkle'"},{name:"literal",value:"'speaker'"},{name:"literal",value:"'speechBubble'"},{name:"literal",value:"'stableCoin'"},{name:"literal",value:"'stablecoinStack'"},{name:"literal",value:"'staggeredList'"},{name:"literal",value:"'stake'"},{name:"literal",value:"'staking'"},{name:"literal",value:"'star'"},{name:"literal",value:"'starAward'"},{name:"literal",value:"'starBubble'"},{name:"literal",value:"'starTrophy'"},{name:"literal",value:"'statusDot'"},{name:"literal",value:"'step0'"},{name:"literal",value:"'step1'"},{name:"literal",value:"'step2'"},{name:"literal",value:"'step3'"},{name:"literal",value:"'step4'"},{name:"literal",value:"'step5'"},{name:"literal",value:"'step6'"},{name:"literal",value:"'step7'"},{name:"literal",value:"'step8'"},{name:"literal",value:"'step9'"},{name:"literal",value:"'strategy'"},{name:"literal",value:"'sun'"},{name:"literal",value:"'support'"},{name:"literal",value:"'tag'"},{name:"literal",value:"'taxes'"},{name:"literal",value:"'taxesReceipt'"},{name:"literal",value:"'telephone'"},{name:"literal",value:"'tennis'"},{name:"literal",value:"'test'"},{name:"literal",value:"'thermometer'"},{name:"literal",value:"'thumbsDown'"},{name:"literal",value:"'thumbsDownOutline'"},{name:"literal",value:"'thumbsUp'"},{name:"literal",value:"'thumbsUpOutline'"},{name:"literal",value:"'tokenLaunchCoin'"},{name:"literal",value:"'tokenLaunchRocket'"},{name:"literal",value:"'tokenSales'"},{name:"literal",value:"'tornado'"},{name:"literal",value:"'trading'"},{name:"literal",value:"'transactions'"},{name:"literal",value:"'trashCan'"},{name:"literal",value:"'trophy'"},{name:"literal",value:"'trophyCup'"},{name:"literal",value:"'tshirt'"},{name:"literal",value:"'tv'"},{name:"literal",value:"'tvStand'"},{name:"literal",value:"'twitterLogo'"},{name:"literal",value:"'ultility'"},{name:"literal",value:"'umbrella'"},{name:"literal",value:"'undo'"},{name:"literal",value:"'unfollowPeople'"},{name:"literal",value:"'unknown'"},{name:"literal",value:"'unlock'"},{name:"literal",value:"'upArrow'"},{name:"literal",value:"'upload'"},{name:"literal",value:"'venturesProduct'"},{name:"literal",value:"'verifiedBadge'"},{name:"literal",value:"'verifiedPools'"},{name:"literal",value:"'verticalLine'"},{name:"literal",value:"'virus'"},{name:"literal",value:"'visible'"},{name:"literal",value:"'waasProduct'"},{name:"literal",value:"'wallet'"},{name:"literal",value:"'walletLogo'"},{name:"literal",value:"'walletProduct'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'webhooks'"},{name:"literal",value:"'wellness'"},{name:"literal",value:"'wifi'"},{name:"literal",value:"'wind'"},{name:"literal",value:"'wireTransfer'"},{name:"literal",value:"'withdraw'"},{name:"literal",value:"'wrapToken'"},{name:"literal",value:"'xLogo'"}],required:!0},description:"Icon to render at the end of the button."},{key:"endIconActive",value:{name:"boolean",required:!1},description:"Whether the end icon is active"},{key:"flush",value:{name:"union",raw:"'start' | 'end'",elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'end'"}],required:!1},description:`Ensure the button aligns flush on the left or right.
This prop will translate the entire button left/right,
so take care to ensure it is not overflowing awkwardly`},{key:"name",value:{name:"string",required:!1},description:"Uniquely identify the button within a form."},{key:"noScaleOnPress",value:{name:"boolean",required:!1},description:"Don't scale element on press."},{key:"numberOfLines",value:{name:"number",required:!1},description:`Truncates text after wrapping to a defined number of lines.
@default 1`}]}}]}],raw:`Polymorphic.ExtendableProps<
  PressableBaseProps,
  SharedProps &
    Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
      /**
       * Toggle design and visual variants.
       * @default primary
       */
      variant?: ButtonVariant;
      /** Mark the button as disabled. */
      disabled?: boolean;
      /** Mark the button as loading and display a spinner. */
      loading?: boolean;
      /** Mark the background and border as transparent until interacted with. */
      transparent?: boolean;
      /** Change to block and expand to 100% of parent width. */
      block?: boolean;
      /** Reduce the inner padding within the button itself. */
      compact?: boolean;
      /** Children to render within the button. */
      children: React.ReactNode;
      /** Set the start node */
      start?: React.ReactNode;
      /** Icon to render at the start of the button. */
      startIcon?: IconName;
      /** Whether the start icon is active */
      startIconActive?: boolean;
      /** Set the end node */
      end?: React.ReactNode;
      /** Icon to render at the end of the button. */
      endIcon?: IconName;
      /** Whether the end icon is active */
      endIconActive?: boolean;
      /** Ensure the button aligns flush on the left or right.
       * This prop will translate the entire button left/right,
       * so take care to ensure it is not overflowing awkwardly
       */
      flush?: 'start' | 'end';
      /** Uniquely identify the button within a form. */
      name?: string;
      /** Don't scale element on press. */
      noScaleOnPress?: boolean;
      /**
       * Truncates text after wrapping to a defined number of lines.
       * @default 1
       */
      numberOfLines?: number;
    }
>`},{name:"union",raw:"'disabled' | 'transparent' | 'compact' | 'flush'",elements:[{name:"literal",value:"'disabled'"},{name:"literal",value:"'transparent'"},{name:"literal",value:"'compact'"},{name:"literal",value:"'flush'"}]}],raw:"Pick<ButtonBaseProps, 'disabled' | 'transparent' | 'compact' | 'flush'>"},{name:"signature",type:"object",raw:`{
  /** Name of the icon, as defined in Figma. */
  name: IconName;
  /** Whether the icon is active */
  active?: boolean;
  /**
   * Toggle design and visual variants.
   * @default primary
   */
  variant?: IconButtonVariant;
}`,signature:{properties:[{key:"name",value:{name:"union",raw:`| 'account'
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
| 'xLogo'`,elements:[{name:"literal",value:"'account'"},{name:"literal",value:"'activity'"},{name:"literal",value:"'add'"},{name:"literal",value:"'addPeople'"},{name:"literal",value:"'advancedMarketSelector'"},{name:"literal",value:"'advancedTradeProduct'"},{name:"literal",value:"'affiliates'"},{name:"literal",value:"'airdrop'"},{name:"literal",value:"'airdropAlt'"},{name:"literal",value:"'airdropCoins'"},{name:"literal",value:"'airdropParachute'"},{name:"literal",value:"'alien'"},{name:"literal",value:"'allTimeHigh'"},{name:"literal",value:"'allocation'"},{name:"literal",value:"'annotation'"},{name:"literal",value:"'api'"},{name:"literal",value:"'apiPlug'"},{name:"literal",value:"'apothecary'"},{name:"literal",value:"'appSwitcher'"},{name:"literal",value:"'apple'"},{name:"literal",value:"'appleLogo'"},{name:"literal",value:"'application'"},{name:"literal",value:"'arrowDown'"},{name:"literal",value:"'arrowLeft'"},{name:"literal",value:"'arrowRight'"},{name:"literal",value:"'arrowUp'"},{name:"literal",value:"'arrowsHorizontal'"},{name:"literal",value:"'arrowsUpDown'"},{name:"literal",value:"'arrowsVertical'"},{name:"literal",value:"'artwork'"},{name:"literal",value:"'assetHubProduct'"},{name:"literal",value:"'assetManagementProduct'"},{name:"literal",value:"'astronautHelmet'"},{name:"literal",value:"'atSign'"},{name:"literal",value:"'atomScience'"},{name:"literal",value:"'auto'"},{name:"literal",value:"'autoCar'"},{name:"literal",value:"'avatar'"},{name:"literal",value:"'average'"},{name:"literal",value:"'backArrow'"},{name:"literal",value:"'ballot'"},{name:"literal",value:"'ballotbox'"},{name:"literal",value:"'bandage'"},{name:"literal",value:"'bank'"},{name:"literal",value:"'barChartSimple'"},{name:"literal",value:"'barChartWindow'"},{name:"literal",value:"'base'"},{name:"literal",value:"'baseApps'"},{name:"literal",value:"'baseFeed'"},{name:"literal",value:"'baseNotification'"},{name:"literal",value:"'baseQuickBuy'"},{name:"literal",value:"'baseSquare'"},{name:"literal",value:"'baseTransact'"},{name:"literal",value:"'baseVerification'"},{name:"literal",value:"'baseWallet'"},{name:"literal",value:"'baseball'"},{name:"literal",value:"'basketball'"},{name:"literal",value:"'beaker'"},{name:"literal",value:"'beginningArrow'"},{name:"literal",value:"'bell'"},{name:"literal",value:"'bellCheck'"},{name:"literal",value:"'bellPlus'"},{name:"literal",value:"'birthcertificate'"},{name:"literal",value:"'block'"},{name:"literal",value:"'blockchain'"},{name:"literal",value:"'blog'"},{name:"literal",value:"'book'"},{name:"literal",value:"'bookmark'"},{name:"literal",value:"'borrowProduct'"},{name:"literal",value:"'boxing'"},{name:"literal",value:"'bridging'"},{name:"literal",value:"'briefcase'"},{name:"literal",value:"'briefcaseAlt'"},{name:"literal",value:"'browser'"},{name:"literal",value:"'bug'"},{name:"literal",value:"'building'"},{name:"literal",value:"'calculator'"},{name:"literal",value:"'calendar'"},{name:"literal",value:"'calendarBlank'"},{name:"literal",value:"'calendarDates'"},{name:"literal",value:"'calendarEmpty'"},{name:"literal",value:"'calendarHeart'"},{name:"literal",value:"'calendarMoney'"},{name:"literal",value:"'calendarStar'"},{name:"literal",value:"'camera'"},{name:"literal",value:"'candlesticks'"},{name:"literal",value:"'car'"},{name:"literal",value:"'card'"},{name:"literal",value:"'caret'"},{name:"literal",value:"'caretDown'"},{name:"literal",value:"'caretLeft'"},{name:"literal",value:"'caretRight'"},{name:"literal",value:"'caretUp'"},{name:"literal",value:"'cash'"},{name:"literal",value:"'cashAustralianDollar'"},{name:"literal",value:"'cashBrazilianReal'"},{name:"literal",value:"'cashBrazillianReal'"},{name:"literal",value:"'cashCanadianDollar'"},{name:"literal",value:"'cashCoins'"},{name:"literal",value:"'cashEUR'"},{name:"literal",value:"'cashGBP'"},{name:"literal",value:"'cashIndonesianRupiah'"},{name:"literal",value:"'cashJPY'"},{name:"literal",value:"'cashPhilippinePeso'"},{name:"literal",value:"'cashPolishZloty'"},{name:"literal",value:"'cashRupee'"},{name:"literal",value:"'cashSingaporeDollar'"},{name:"literal",value:"'cashSwissFranc'"},{name:"literal",value:"'cashThaiBaht'"},{name:"literal",value:"'cashTurkishLira'"},{name:"literal",value:"'cashUSD'"},{name:"literal",value:"'cashUaeDirham'"},{name:"literal",value:"'cashVietnameseDong'"},{name:"literal",value:"'chainLink'"},{name:"literal",value:"'chartBar'"},{name:"literal",value:"'chartCandles'"},{name:"literal",value:"'chartLine'"},{name:"literal",value:"'chartPie'"},{name:"literal",value:"'chartPieCircle'"},{name:"literal",value:"'chartVolume'"},{name:"literal",value:"'chatBotAgent'"},{name:"literal",value:"'chatBubble'"},{name:"literal",value:"'chatRequests'"},{name:"literal",value:"'checkboxChecked'"},{name:"literal",value:"'checkboxEmpty'"},{name:"literal",value:"'checkmark'"},{name:"literal",value:"'chess'"},{name:"literal",value:"'circleCheckmark'"},{name:"literal",value:"'circleCross'"},{name:"literal",value:"'circulatingSupply'"},{name:"literal",value:"'city'"},{name:"literal",value:"'clipboard'"},{name:"literal",value:"'clock'"},{name:"literal",value:"'clockOutline'"},{name:"literal",value:"'close'"},{name:"literal",value:"'closeCaption'"},{name:"literal",value:"'clothing'"},{name:"literal",value:"'cloud'"},{name:"literal",value:"'cloudPartial'"},{name:"literal",value:"'cloudProduct'"},{name:"literal",value:"'cluster'"},{name:"literal",value:"'coinbase'"},{name:"literal",value:"'coinbaseCardProduct'"},{name:"literal",value:"'coinbaseOne'"},{name:"literal",value:"'coinbaseOneCard'"},{name:"literal",value:"'coinbaseOneLogo'"},{name:"literal",value:"'coinbaseRewards'"},{name:"literal",value:"'coinsCrypto'"},{name:"literal",value:"'collapse'"},{name:"literal",value:"'collectibles'"},{name:"literal",value:"'collection'"},{name:"literal",value:"'comment'"},{name:"literal",value:"'commentPlus'"},{name:"literal",value:"'commerceProduct'"},{name:"literal",value:"'compass'"},{name:"literal",value:"'complianceProduct'"},{name:"literal",value:"'compose'"},{name:"literal",value:"'computerChip'"},{name:"literal",value:"'concierge'"},{name:"literal",value:"'conciergeBell'"},{name:"literal",value:"'config'"},{name:"literal",value:"'continuous'"},{name:"literal",value:"'convert'"},{name:"literal",value:"'copy'"},{name:"literal",value:"'corporation'"},{name:"literal",value:"'creatorCoin'"},{name:"literal",value:"'cricket'"},{name:"literal",value:"'cross'"},{name:"literal",value:"'crossTrade'"},{name:"literal",value:"'crypto'"},{name:"literal",value:"'cryptobasics'"},{name:"literal",value:"'crystalBall'"},{name:"literal",value:"'crystalBallInsight'"},{name:"literal",value:"'currencies'"},{name:"literal",value:"'custodyProduct'"},{name:"literal",value:"'dashboard'"},{name:"literal",value:"'dataMarketplaceProduct'"},{name:"literal",value:"'dataStack'"},{name:"literal",value:"'defi'"},{name:"literal",value:"'delegateProduct'"},{name:"literal",value:"'deposit'"},{name:"literal",value:"'derivatives'"},{name:"literal",value:"'derivativesProduct'"},{name:"literal",value:"'derivativesProductNew'"},{name:"literal",value:"'developerAPIProduct'"},{name:"literal",value:"'developerPlatformProduct'"},{name:"literal",value:"'dex'"},{name:"literal",value:"'diagonalDownArrow'"},{name:"literal",value:"'diagonalRightArrow'"},{name:"literal",value:"'diagonalUpArrow'"},{name:"literal",value:"'diamond'"},{name:"literal",value:"'diamondIncentives'"},{name:"literal",value:"'dinnerPlate'"},{name:"literal",value:"'directDeposit'"},{name:"literal",value:"'directDepositIcon'"},{name:"literal",value:"'disabledPhone'"},{name:"literal",value:"'discordLogo'"},{name:"literal",value:"'distribution'"},{name:"literal",value:"'document'"},{name:"literal",value:"'documentation'"},{name:"literal",value:"'dot'"},{name:"literal",value:"'doubleChevronRight'"},{name:"literal",value:"'downArrow'"},{name:"literal",value:"'download'"},{name:"literal",value:"'drag'"},{name:"literal",value:"'drops'"},{name:"literal",value:"'earn'"},{name:"literal",value:"'earnProduct'"},{name:"literal",value:"'earnRewards'"},{name:"literal",value:"'earthquake'"},{name:"literal",value:"'educationBook'"},{name:"literal",value:"'educationPencil'"},{name:"literal",value:"'email'"},{name:"literal",value:"'endArrow'"},{name:"literal",value:"'entertainment'"},{name:"literal",value:"'error'"},{name:"literal",value:"'ethereum'"},{name:"literal",value:"'eventContracts'"},{name:"literal",value:"'exchangeProduct'"},{name:"literal",value:"'exclamationMark'"},{name:"literal",value:"'expand'"},{name:"literal",value:"'expandAddress'"},{name:"literal",value:"'expandAll'"},{name:"literal",value:"'externalLink'"},{name:"literal",value:"'eye'"},{name:"literal",value:"'faceScan'"},{name:"literal",value:"'faces'"},{name:"literal",value:"'factory'"},{name:"literal",value:"'faucet'"},{name:"literal",value:"'fib'"},{name:"literal",value:"'filmStrip'"},{name:"literal",value:"'filter'"},{name:"literal",value:"'fingerprint'"},{name:"literal",value:"'flame'"},{name:"literal",value:"'folder'"},{name:"literal",value:"'folderArrow'"},{name:"literal",value:"'folderOpen'"},{name:"literal",value:"'followAdd'"},{name:"literal",value:"'following'"},{name:"literal",value:"'football'"},{name:"literal",value:"'fork'"},{name:"literal",value:"'forwardArrow'"},{name:"literal",value:"'fscsProtection'"},{name:"literal",value:"'gab'"},{name:"literal",value:"'games'"},{name:"literal",value:"'gaming'"},{name:"literal",value:"'gasFees'"},{name:"literal",value:"'gasFeesAlt'"},{name:"literal",value:"'gauge'"},{name:"literal",value:"'gaugeEmpty'"},{name:"literal",value:"'gaugeHigh'"},{name:"literal",value:"'gaugeHighLow'"},{name:"literal",value:"'gaugeHighMid'"},{name:"literal",value:"'gaugeLow'"},{name:"literal",value:"'gaugeLowHigh'"},{name:"literal",value:"'gaugeLowMid'"},{name:"literal",value:"'gaugeMedium'"},{name:"literal",value:"'gavel'"},{name:"literal",value:"'gear'"},{name:"literal",value:"'generalCharacter'"},{name:"literal",value:"'ghost'"},{name:"literal",value:"'gif'"},{name:"literal",value:"'giftBox'"},{name:"literal",value:"'giftCard'"},{name:"literal",value:"'gitHubLogo'"},{name:"literal",value:"'globe'"},{name:"literal",value:"'golf'"},{name:"literal",value:"'googleLogo'"},{name:"literal",value:"'greenEnergy'"},{name:"literal",value:"'grid'"},{name:"literal",value:"'group'"},{name:"literal",value:"'hamburger'"},{name:"literal",value:"'hammer'"},{name:"literal",value:"'heart'"},{name:"literal",value:"'helpCenterProduct'"},{name:"literal",value:"'helpCenterQuestionMark'"},{name:"literal",value:"'hiddenEye'"},{name:"literal",value:"'hockey'"},{name:"literal",value:"'home'"},{name:"literal",value:"'horizontalLine'"},{name:"literal",value:"'hospital'"},{name:"literal",value:"'hospitalCross'"},{name:"literal",value:"'hurricane'"},{name:"literal",value:"'ideal'"},{name:"literal",value:"'identityCard'"},{name:"literal",value:"'image'"},{name:"literal",value:"'info'"},{name:"literal",value:"'initiator'"},{name:"literal",value:"'instagramLogo'"},{name:"literal",value:"'instantUnstakingClock'"},{name:"literal",value:"'institute'"},{name:"literal",value:"'institutionalProduct'"},{name:"literal",value:"'interest'"},{name:"literal",value:"'invisible'"},{name:"literal",value:"'invoice'"},{name:"literal",value:"'key'"},{name:"literal",value:"'keyboard'"},{name:"literal",value:"'laptop'"},{name:"literal",value:"'leadChart'"},{name:"literal",value:"'leadCoin'"},{name:"literal",value:"'learningRewardsProduct'"},{name:"literal",value:"'light'"},{name:"literal",value:"'lightbulb'"},{name:"literal",value:"'lightning'"},{name:"literal",value:"'lightningBolt'"},{name:"literal",value:"'lineChartCrypto'"},{name:"literal",value:"'list'"},{name:"literal",value:"'location'"},{name:"literal",value:"'lock'"},{name:"literal",value:"'login'"},{name:"literal",value:"'logout'"},{name:"literal",value:"'loop'"},{name:"literal",value:"'magnifyingGlass'"},{name:"literal",value:"'marketCap'"},{name:"literal",value:"'medal'"},{name:"literal",value:"'megaphone'"},{name:"literal",value:"'menu'"},{name:"literal",value:"'metaverse'"},{name:"literal",value:"'microphone'"},{name:"literal",value:"'microphoneCordless'"},{name:"literal",value:"'microscope'"},{name:"literal",value:"'mint'"},{name:"literal",value:"'minus'"},{name:"literal",value:"'mma'"},{name:"literal",value:"'moneyCardCoin'"},{name:"literal",value:"'moon'"},{name:"literal",value:"'more'"},{name:"literal",value:"'moreVertical'"},{name:"literal",value:"'motorsport'"},{name:"literal",value:"'music'"},{name:"literal",value:"'musicArticles'"},{name:"literal",value:"'needle'"},{name:"literal",value:"'newsFeed'"},{name:"literal",value:"'newsletter'"},{name:"literal",value:"'nft'"},{name:"literal",value:"'nftBuy'"},{name:"literal",value:"'nftOffer'"},{name:"literal",value:"'nftProduct'"},{name:"literal",value:"'nftSale'"},{name:"literal",value:"'noRocket'"},{name:"literal",value:"'noWifi'"},{name:"literal",value:"'nodeProduct'"},{name:"literal",value:"'oil'"},{name:"literal",value:"'options'"},{name:"literal",value:"'orderBook'"},{name:"literal",value:"'orderHistory'"},{name:"literal",value:"'outline'"},{name:"literal",value:"'pFPS'"},{name:"literal",value:"'paperAirplane'"},{name:"literal",value:"'paperclip'"},{name:"literal",value:"'participate'"},{name:"literal",value:"'participateProduct'"},{name:"literal",value:"'passKey'"},{name:"literal",value:"'passport'"},{name:"literal",value:"'pause'"},{name:"literal",value:"'pay'"},{name:"literal",value:"'payProduct'"},{name:"literal",value:"'paymentCard'"},{name:"literal",value:"'payments'"},{name:"literal",value:"'payouts'"},{name:"literal",value:"'paypal'"},{name:"literal",value:"'pencil'"},{name:"literal",value:"'peopleGroup'"},{name:"literal",value:"'peopleStar'"},{name:"literal",value:"'percentage'"},{name:"literal",value:"'perpetualSwap'"},{name:"literal",value:"'phone'"},{name:"literal",value:"'pieChartData'"},{name:"literal",value:"'pillBottle'"},{name:"literal",value:"'pillCapsule'"},{name:"literal",value:"'pin'"},{name:"literal",value:"'plane'"},{name:"literal",value:"'planet'"},{name:"literal",value:"'play'"},{name:"literal",value:"'playbutton'"},{name:"literal",value:"'plusMinus'"},{name:"literal",value:"'podiumStar'"},{name:"literal",value:"'politicsBuilding'"},{name:"literal",value:"'politicsCandidate'"},{name:"literal",value:"'politicsFlag'"},{name:"literal",value:"'politicsGavel'"},{name:"literal",value:"'politicsPodium'"},{name:"literal",value:"'politicsStar'"},{name:"literal",value:"'powerTool'"},{name:"literal",value:"'priceAlerts'"},{name:"literal",value:"'priceAlertsCheck'"},{name:"literal",value:"'primePoduct'"},{name:"literal",value:"'privateClientProduct'"},{name:"literal",value:"'proProduct'"},{name:"literal",value:"'profile'"},{name:"literal",value:"'protection'"},{name:"literal",value:"'pulse'"},{name:"literal",value:"'pyramid'"},{name:"literal",value:"'qrCode'"},{name:"literal",value:"'qrCodeAlt'"},{name:"literal",value:"'queryTransact'"},{name:"literal",value:"'questionMark'"},{name:"literal",value:"'quotation'"},{name:"literal",value:"'rain'"},{name:"literal",value:"'ratingsCheck'"},{name:"literal",value:"'ratingsChecks'"},{name:"literal",value:"'ratingsStar'"},{name:"literal",value:"'reCenter'"},{name:"literal",value:"'rectangle'"},{name:"literal",value:"'recurring'"},{name:"literal",value:"'refresh'"},{name:"literal",value:"'regulated'"},{name:"literal",value:"'regulatedFutures'"},{name:"literal",value:"'report'"},{name:"literal",value:"'rewardsProduct'"},{name:"literal",value:"'ribbon'"},{name:"literal",value:"'robot'"},{name:"literal",value:"'rocket'"},{name:"literal",value:"'rocketShip'"},{name:"literal",value:"'rollingSpot'"},{name:"literal",value:"'rosettaProduct'"},{name:"literal",value:"'rottenTomato'"},{name:"literal",value:"'royalty'"},{name:"literal",value:"'safe'"},{name:"literal",value:"'save'"},{name:"literal",value:"'savingsBank'"},{name:"literal",value:"'scanQrCode'"},{name:"literal",value:"'scienceAtom'"},{name:"literal",value:"'scienceBeaker'"},{name:"literal",value:"'scienceMoon'"},{name:"literal",value:"'search'"},{name:"literal",value:"'securityKey'"},{name:"literal",value:"'securityShield'"},{name:"literal",value:"'seen'"},{name:"literal",value:"'sendReceive'"},{name:"literal",value:"'setPinCode'"},{name:"literal",value:"'settings'"},{name:"literal",value:"'share'"},{name:"literal",value:"'shield'"},{name:"literal",value:"'shieldOutline'"},{name:"literal",value:"'shoe'"},{name:"literal",value:"'shoppingCart'"},{name:"literal",value:"'signinProduct'"},{name:"literal",value:"'singleCoin'"},{name:"literal",value:"'singleNote'"},{name:"literal",value:"'singlecloud'"},{name:"literal",value:"'smartContract'"},{name:"literal",value:"'snow'"},{name:"literal",value:"'soccer'"},{name:"literal",value:"'socialChat'"},{name:"literal",value:"'socialReshare'"},{name:"literal",value:"'socialShare'"},{name:"literal",value:"'sofort'"},{name:"literal",value:"'sortDoubleArrow'"},{name:"literal",value:"'sortDown'"},{name:"literal",value:"'sortDownCenter'"},{name:"literal",value:"'sortUp'"},{name:"literal",value:"'sortUpCenter'"},{name:"literal",value:"'soundOff'"},{name:"literal",value:"'soundOn'"},{name:"literal",value:"'sparkle'"},{name:"literal",value:"'speaker'"},{name:"literal",value:"'speechBubble'"},{name:"literal",value:"'stableCoin'"},{name:"literal",value:"'stablecoinStack'"},{name:"literal",value:"'staggeredList'"},{name:"literal",value:"'stake'"},{name:"literal",value:"'staking'"},{name:"literal",value:"'star'"},{name:"literal",value:"'starAward'"},{name:"literal",value:"'starBubble'"},{name:"literal",value:"'starTrophy'"},{name:"literal",value:"'statusDot'"},{name:"literal",value:"'step0'"},{name:"literal",value:"'step1'"},{name:"literal",value:"'step2'"},{name:"literal",value:"'step3'"},{name:"literal",value:"'step4'"},{name:"literal",value:"'step5'"},{name:"literal",value:"'step6'"},{name:"literal",value:"'step7'"},{name:"literal",value:"'step8'"},{name:"literal",value:"'step9'"},{name:"literal",value:"'strategy'"},{name:"literal",value:"'sun'"},{name:"literal",value:"'support'"},{name:"literal",value:"'tag'"},{name:"literal",value:"'taxes'"},{name:"literal",value:"'taxesReceipt'"},{name:"literal",value:"'telephone'"},{name:"literal",value:"'tennis'"},{name:"literal",value:"'test'"},{name:"literal",value:"'thermometer'"},{name:"literal",value:"'thumbsDown'"},{name:"literal",value:"'thumbsDownOutline'"},{name:"literal",value:"'thumbsUp'"},{name:"literal",value:"'thumbsUpOutline'"},{name:"literal",value:"'tokenLaunchCoin'"},{name:"literal",value:"'tokenLaunchRocket'"},{name:"literal",value:"'tokenSales'"},{name:"literal",value:"'tornado'"},{name:"literal",value:"'trading'"},{name:"literal",value:"'transactions'"},{name:"literal",value:"'trashCan'"},{name:"literal",value:"'trophy'"},{name:"literal",value:"'trophyCup'"},{name:"literal",value:"'tshirt'"},{name:"literal",value:"'tv'"},{name:"literal",value:"'tvStand'"},{name:"literal",value:"'twitterLogo'"},{name:"literal",value:"'ultility'"},{name:"literal",value:"'umbrella'"},{name:"literal",value:"'undo'"},{name:"literal",value:"'unfollowPeople'"},{name:"literal",value:"'unknown'"},{name:"literal",value:"'unlock'"},{name:"literal",value:"'upArrow'"},{name:"literal",value:"'upload'"},{name:"literal",value:"'venturesProduct'"},{name:"literal",value:"'verifiedBadge'"},{name:"literal",value:"'verifiedPools'"},{name:"literal",value:"'verticalLine'"},{name:"literal",value:"'virus'"},{name:"literal",value:"'visible'"},{name:"literal",value:"'waasProduct'"},{name:"literal",value:"'wallet'"},{name:"literal",value:"'walletLogo'"},{name:"literal",value:"'walletProduct'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'webhooks'"},{name:"literal",value:"'wellness'"},{name:"literal",value:"'wifi'"},{name:"literal",value:"'wind'"},{name:"literal",value:"'wireTransfer'"},{name:"literal",value:"'withdraw'"},{name:"literal",value:"'wrapToken'"},{name:"literal",value:"'xLogo'"}],required:!0},description:"Name of the icon, as defined in Figma."},{key:"active",value:{name:"boolean",required:!1},description:"Whether the icon is active"},{key:"variant",value:{name:"union",raw:`| 'primary'
| 'secondary'
| 'tertiary'
| 'positive'
| 'negative'
| 'foregroundMuted'`,elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"},{name:"literal",value:"'tertiary'"},{name:"literal",value:"'positive'"},{name:"literal",value:"'negative'"},{name:"literal",value:"'foregroundMuted'"}],required:!1},description:`Toggle design and visual variants.
@default primary`}]}}]}],raw:`Polymorphic.ExtendableProps<
  Omit<PressableBaseProps, 'children'>,
  Pick<ButtonBaseProps, 'disabled' | 'transparent' | 'compact' | 'flush'> & {
    /** Name of the icon, as defined in Figma. */
    name: IconName;
    /** Whether the icon is active */
    active?: boolean;
    /**
     * Toggle design and visual variants.
     * @default primary
     */
    variant?: IconButtonVariant;
  }
>`},{name:"signature",type:"object",raw:"{ onClick?: CardBaseProps['onClick'] }",signature:{properties:[{key:"onClick",value:{name:"intersection['onClick']",raw:"CardBaseProps['onClick']",required:!1}}]}}]},description:"IconButton to show in top-right of FeedCard. Takes props for IconButton"},like:{required:!1,tsType:{name:"intersection",raw:`Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityHint'
> &
  SharedProps & {
    liked?: boolean;
    count?: number;
    /** Reduce the inner padding within the button itself. */
    compact?: boolean;
    /** Ensure the button aligns flush on the left or right.
     * This prop will translate the entire button left/right,
     * so take care to ensure it is not overflowing awkwardly
     */
    flush?: 'start' | 'end';
  }`,elements:[{name:"Pick",elements:[{name:"signature",type:"object",raw:`{
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
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},{name:"union",raw:"'accessibilityLabel' | 'accessibilityHint'",elements:[{name:"literal",value:"'accessibilityLabel'"},{name:"literal",value:"'accessibilityHint'"}]}],raw:`Pick<
  SharedAccessibilityProps,
  'accessibilityLabel' | 'accessibilityHint'
>`},{name:"signature",type:"object",raw:`{
  /**
   * Used to locate this element in unit and end-to-end tests.
   * Under the hood, testID translates to data-testid on Web. On Mobile, testID
   * stays the same - testID
   */
  testID?: string;
}`,signature:{properties:[{key:"testID",value:{name:"string",required:!1},description:`Used to locate this element in unit and end-to-end tests.
Under the hood, testID translates to data-testid on Web. On Mobile, testID
stays the same - testID`}]}},{name:"signature",type:"object",raw:`{
  liked?: boolean;
  count?: number;
  /** Reduce the inner padding within the button itself. */
  compact?: boolean;
  /** Ensure the button aligns flush on the left or right.
   * This prop will translate the entire button left/right,
   * so take care to ensure it is not overflowing awkwardly
   */
  flush?: 'start' | 'end';
}`,signature:{properties:[{key:"liked",value:{name:"boolean",required:!1}},{key:"count",value:{name:"number",required:!1}},{key:"compact",value:{name:"boolean",required:!1},description:"Reduce the inner padding within the button itself."},{key:"flush",value:{name:"union",raw:"'start' | 'end'",elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'end'"}],required:!1},description:`Ensure the button aligns flush on the left or right.
This prop will translate the entire button left/right,
so take care to ensure it is not overflowing awkwardly`}]}}]},description:""},comment:{required:!1,tsType:{name:"Omit",elements:[{name:"Polymorphic.ExtendableProps",elements:[{name:"Omit",elements:[{name:"Polymorphic.ExtendableProps",elements:[{name:"Polymorphic.ExtendableProps",elements:[{name:"intersection",raw:`StyleProps &
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
  /** Apply class names to the outer container. */
  className?: string;
  /** Background color of the overlay (element being interacted with). */
  background?: ThemeVars.Color;
  /** Set element to block and expand to 100% width. */
  block?: boolean;
  /** Border color of the element. */
  borderColor?: ThemeVars.Color;
  /** Is the element currently disabled. */
  disabled?: boolean;
  /**
   * Is the element currenty loading.
   * When set to true, will disable element from press and keyboard events
   */
  loading?: boolean;
  /** Is the element being pressed. Primarily a mobile feature, but can be used on the web. */
  pressed?: boolean;
  /**
   * Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
   * Must be used in conjunction with the "pressed" prop
   */
  transparentWhileInactive?: boolean;
  /**
   * Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
   * Must be used in conjunction with the "pressed" prop
   */
  transparentWhilePressed?: boolean;
  blendStyles?: InteractableBlendStyles;
}`,signature:{properties:[{key:"className",value:{name:"string",required:!1},description:"Apply class names to the outer container."},{key:"background",value:{name:"ThemeVars.Color",required:!1},description:"Background color of the overlay (element being interacted with)."},{key:"block",value:{name:"boolean",required:!1},description:"Set element to block and expand to 100% width."},{key:"borderColor",value:{name:"ThemeVars.Color",required:!1},description:"Border color of the element."},{key:"disabled",value:{name:"boolean",required:!1},description:"Is the element currently disabled."},{key:"loading",value:{name:"boolean",required:!1},description:`Is the element currenty loading.
When set to true, will disable element from press and keyboard events`},{key:"pressed",value:{name:"boolean",required:!1},description:"Is the element being pressed. Primarily a mobile feature, but can be used on the web."},{key:"transparentWhileInactive",value:{name:"boolean",required:!1},description:`Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
Must be used in conjunction with the "pressed" prop`},{key:"transparentWhilePressed",value:{name:"boolean",required:!1},description:`Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
Must be used in conjunction with the "pressed" prop`},{key:"blendStyles",value:{name:"signature",type:"object",raw:`{
  background?: string;
  pressedBackground?: string;
  disabledBackground?: string;
  hoveredBackground?: string;
  borderColor?: string;
  pressedBorderColor?: string;
  disabledBorderColor?: string;
  hoveredBorderColor?: string;
  /**
   * The opacity of the element when hovered.
   * @default 0.88
   */
  hoveredOpacity?: number;
  /**
   * The opacity of the element when pressed.
   * @default 0.82
   */
  pressedOpacity?: number;
  /**
   * The opacity of the element when disabled.
   * @default 0.75
   */
  disabledOpacity?: number;
}`,signature:{properties:[{key:"background",value:{name:"string",required:!1}},{key:"pressedBackground",value:{name:"string",required:!1}},{key:"disabledBackground",value:{name:"string",required:!1}},{key:"hoveredBackground",value:{name:"string",required:!1}},{key:"borderColor",value:{name:"string",required:!1}},{key:"pressedBorderColor",value:{name:"string",required:!1}},{key:"disabledBorderColor",value:{name:"string",required:!1}},{key:"hoveredBorderColor",value:{name:"string",required:!1}},{key:"hoveredOpacity",value:{name:"number",required:!1},description:`The opacity of the element when hovered.
@default 0.88`},{key:"pressedOpacity",value:{name:"number",required:!1},description:`The opacity of the element when pressed.
@default 0.82`},{key:"disabledOpacity",value:{name:"number",required:!1},description:`The opacity of the element when disabled.
@default 0.75`}]},required:!1}}]}}],raw:`Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    /** Apply class names to the outer container. */
    className?: string;
    /** Background color of the overlay (element being interacted with). */
    background?: ThemeVars.Color;
    /** Set element to block and expand to 100% width. */
    block?: boolean;
    /** Border color of the element. */
    borderColor?: ThemeVars.Color;
    /** Is the element currently disabled. */
    disabled?: boolean;
    /**
     * Is the element currenty loading.
     * When set to true, will disable element from press and keyboard events
     */
    loading?: boolean;
    /** Is the element being pressed. Primarily a mobile feature, but can be used on the web. */
    pressed?: boolean;
    /**
     * Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
     * Must be used in conjunction with the "pressed" prop
     */
    transparentWhileInactive?: boolean;
    /**
     * Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
     * Must be used in conjunction with the "pressed" prop
     */
    transparentWhilePressed?: boolean;
    blendStyles?: InteractableBlendStyles;
  }
>`},{name:"intersection",raw:`ComponentEventHandlerProps & {
  /** Dont scale element on press. */
  noScaleOnPress?: boolean;
  focusable?: boolean;
}`,elements:[{name:"signature",type:"object",raw:`{
  eventConfig?: EventHandlerCustomConfig;
  analyticsId?: string;
}`,signature:{properties:[{key:"eventConfig",value:{name:"signature",type:"object",raw:`{
  actions: EventHandlerAction[];
  componentName: string;
  data?: EventCustomData;
}`,signature:{properties:[{key:"actions",value:{name:"Array",elements:[{name:"string"}],raw:"EventHandlerAction[]",required:!0}},{key:"componentName",value:{name:"string",required:!0}},{key:"data",value:{name:"Record",elements:[{name:"string"},{name:"union",raw:"T | Record<string, T>",elements:[{name:"union",raw:"EventDataEntryTypes | EventDataEntryTypes[]",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]},{name:"Array",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]}],raw:"EventDataEntryTypes[]"}]},{name:"Record",elements:[{name:"string"},{name:"union",raw:"EventDataEntryTypes | EventDataEntryTypes[]",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]},{name:"Array",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]}],raw:"EventDataEntryTypes[]"}]}],raw:"Record<string, T>"}]}],raw:"Record<string, RecursiveMapType<EventDataEntry>>",required:!1}}]},required:!1}},{key:"analyticsId",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
  /** Dont scale element on press. */
  noScaleOnPress?: boolean;
  focusable?: boolean;
}`,signature:{properties:[{key:"noScaleOnPress",value:{name:"boolean",required:!1},description:"Dont scale element on press."},{key:"focusable",value:{name:"boolean",required:!1}}]}}]}],raw:`Polymorphic.ExtendableProps<
  InteractableBaseProps,
  ComponentEventHandlerProps & {
    /** Dont scale element on press. */
    noScaleOnPress?: boolean;
    focusable?: boolean;
  }
>`},{name:"literal",value:"'children'"}],raw:"Omit<PressableBaseProps, 'children'>"},{name:"intersection",raw:`Pick<ButtonBaseProps, 'disabled' | 'transparent' | 'compact' | 'flush'> & {
  /** Name of the icon, as defined in Figma. */
  name: IconName;
  /** Whether the icon is active */
  active?: boolean;
  /**
   * Toggle design and visual variants.
   * @default primary
   */
  variant?: IconButtonVariant;
}`,elements:[{name:"Pick",elements:[{name:"Polymorphic.ExtendableProps",elements:[{name:"Polymorphic.ExtendableProps",elements:[{name:"Polymorphic.ExtendableProps",elements:[{name:"intersection",raw:`StyleProps &
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
  /** Apply class names to the outer container. */
  className?: string;
  /** Background color of the overlay (element being interacted with). */
  background?: ThemeVars.Color;
  /** Set element to block and expand to 100% width. */
  block?: boolean;
  /** Border color of the element. */
  borderColor?: ThemeVars.Color;
  /** Is the element currently disabled. */
  disabled?: boolean;
  /**
   * Is the element currenty loading.
   * When set to true, will disable element from press and keyboard events
   */
  loading?: boolean;
  /** Is the element being pressed. Primarily a mobile feature, but can be used on the web. */
  pressed?: boolean;
  /**
   * Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
   * Must be used in conjunction with the "pressed" prop
   */
  transparentWhileInactive?: boolean;
  /**
   * Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
   * Must be used in conjunction with the "pressed" prop
   */
  transparentWhilePressed?: boolean;
  blendStyles?: InteractableBlendStyles;
}`,signature:{properties:[{key:"className",value:{name:"string",required:!1},description:"Apply class names to the outer container."},{key:"background",value:{name:"ThemeVars.Color",required:!1},description:"Background color of the overlay (element being interacted with)."},{key:"block",value:{name:"boolean",required:!1},description:"Set element to block and expand to 100% width."},{key:"borderColor",value:{name:"ThemeVars.Color",required:!1},description:"Border color of the element."},{key:"disabled",value:{name:"boolean",required:!1},description:"Is the element currently disabled."},{key:"loading",value:{name:"boolean",required:!1},description:`Is the element currenty loading.
When set to true, will disable element from press and keyboard events`},{key:"pressed",value:{name:"boolean",required:!1},description:"Is the element being pressed. Primarily a mobile feature, but can be used on the web."},{key:"transparentWhileInactive",value:{name:"boolean",required:!1},description:`Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
Must be used in conjunction with the "pressed" prop`},{key:"transparentWhilePressed",value:{name:"boolean",required:!1},description:`Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
Must be used in conjunction with the "pressed" prop`},{key:"blendStyles",value:{name:"signature",type:"object",raw:`{
  background?: string;
  pressedBackground?: string;
  disabledBackground?: string;
  hoveredBackground?: string;
  borderColor?: string;
  pressedBorderColor?: string;
  disabledBorderColor?: string;
  hoveredBorderColor?: string;
  /**
   * The opacity of the element when hovered.
   * @default 0.88
   */
  hoveredOpacity?: number;
  /**
   * The opacity of the element when pressed.
   * @default 0.82
   */
  pressedOpacity?: number;
  /**
   * The opacity of the element when disabled.
   * @default 0.75
   */
  disabledOpacity?: number;
}`,signature:{properties:[{key:"background",value:{name:"string",required:!1}},{key:"pressedBackground",value:{name:"string",required:!1}},{key:"disabledBackground",value:{name:"string",required:!1}},{key:"hoveredBackground",value:{name:"string",required:!1}},{key:"borderColor",value:{name:"string",required:!1}},{key:"pressedBorderColor",value:{name:"string",required:!1}},{key:"disabledBorderColor",value:{name:"string",required:!1}},{key:"hoveredBorderColor",value:{name:"string",required:!1}},{key:"hoveredOpacity",value:{name:"number",required:!1},description:`The opacity of the element when hovered.
@default 0.88`},{key:"pressedOpacity",value:{name:"number",required:!1},description:`The opacity of the element when pressed.
@default 0.82`},{key:"disabledOpacity",value:{name:"number",required:!1},description:`The opacity of the element when disabled.
@default 0.75`}]},required:!1}}]}}],raw:`Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    /** Apply class names to the outer container. */
    className?: string;
    /** Background color of the overlay (element being interacted with). */
    background?: ThemeVars.Color;
    /** Set element to block and expand to 100% width. */
    block?: boolean;
    /** Border color of the element. */
    borderColor?: ThemeVars.Color;
    /** Is the element currently disabled. */
    disabled?: boolean;
    /**
     * Is the element currenty loading.
     * When set to true, will disable element from press and keyboard events
     */
    loading?: boolean;
    /** Is the element being pressed. Primarily a mobile feature, but can be used on the web. */
    pressed?: boolean;
    /**
     * Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
     * Must be used in conjunction with the "pressed" prop
     */
    transparentWhileInactive?: boolean;
    /**
     * Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
     * Must be used in conjunction with the "pressed" prop
     */
    transparentWhilePressed?: boolean;
    blendStyles?: InteractableBlendStyles;
  }
>`},{name:"intersection",raw:`ComponentEventHandlerProps & {
  /** Dont scale element on press. */
  noScaleOnPress?: boolean;
  focusable?: boolean;
}`,elements:[{name:"signature",type:"object",raw:`{
  eventConfig?: EventHandlerCustomConfig;
  analyticsId?: string;
}`,signature:{properties:[{key:"eventConfig",value:{name:"signature",type:"object",raw:`{
  actions: EventHandlerAction[];
  componentName: string;
  data?: EventCustomData;
}`,signature:{properties:[{key:"actions",value:{name:"Array",elements:[{name:"string"}],raw:"EventHandlerAction[]",required:!0}},{key:"componentName",value:{name:"string",required:!0}},{key:"data",value:{name:"Record",elements:[{name:"string"},{name:"union",raw:"T | Record<string, T>",elements:[{name:"union",raw:"EventDataEntryTypes | EventDataEntryTypes[]",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]},{name:"Array",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]}],raw:"EventDataEntryTypes[]"}]},{name:"Record",elements:[{name:"string"},{name:"union",raw:"EventDataEntryTypes | EventDataEntryTypes[]",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]},{name:"Array",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]}],raw:"EventDataEntryTypes[]"}]}],raw:"Record<string, T>"}]}],raw:"Record<string, RecursiveMapType<EventDataEntry>>",required:!1}}]},required:!1}},{key:"analyticsId",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
  /** Dont scale element on press. */
  noScaleOnPress?: boolean;
  focusable?: boolean;
}`,signature:{properties:[{key:"noScaleOnPress",value:{name:"boolean",required:!1},description:"Dont scale element on press."},{key:"focusable",value:{name:"boolean",required:!1}}]}}]}],raw:`Polymorphic.ExtendableProps<
  InteractableBaseProps,
  ComponentEventHandlerProps & {
    /** Dont scale element on press. */
    noScaleOnPress?: boolean;
    focusable?: boolean;
  }
>`},{name:"intersection",raw:`SharedProps &
Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
  /**
   * Toggle design and visual variants.
   * @default primary
   */
  variant?: ButtonVariant;
  /** Mark the button as disabled. */
  disabled?: boolean;
  /** Mark the button as loading and display a spinner. */
  loading?: boolean;
  /** Mark the background and border as transparent until interacted with. */
  transparent?: boolean;
  /** Change to block and expand to 100% of parent width. */
  block?: boolean;
  /** Reduce the inner padding within the button itself. */
  compact?: boolean;
  /** Children to render within the button. */
  children: React.ReactNode;
  /** Set the start node */
  start?: React.ReactNode;
  /** Icon to render at the start of the button. */
  startIcon?: IconName;
  /** Whether the start icon is active */
  startIconActive?: boolean;
  /** Set the end node */
  end?: React.ReactNode;
  /** Icon to render at the end of the button. */
  endIcon?: IconName;
  /** Whether the end icon is active */
  endIconActive?: boolean;
  /** Ensure the button aligns flush on the left or right.
   * This prop will translate the entire button left/right,
   * so take care to ensure it is not overflowing awkwardly
   */
  flush?: 'start' | 'end';
  /** Uniquely identify the button within a form. */
  name?: string;
  /** Don't scale element on press. */
  noScaleOnPress?: boolean;
  /**
   * Truncates text after wrapping to a defined number of lines.
   * @default 1
   */
  numberOfLines?: number;
}`,elements:[{name:"signature",type:"object",raw:`{
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
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},{name:"literal",value:"'accessibilityLabel'"}],raw:"Pick<SharedAccessibilityProps, 'accessibilityLabel'>"},{name:"signature",type:"object",raw:`{
  /**
   * Toggle design and visual variants.
   * @default primary
   */
  variant?: ButtonVariant;
  /** Mark the button as disabled. */
  disabled?: boolean;
  /** Mark the button as loading and display a spinner. */
  loading?: boolean;
  /** Mark the background and border as transparent until interacted with. */
  transparent?: boolean;
  /** Change to block and expand to 100% of parent width. */
  block?: boolean;
  /** Reduce the inner padding within the button itself. */
  compact?: boolean;
  /** Children to render within the button. */
  children: React.ReactNode;
  /** Set the start node */
  start?: React.ReactNode;
  /** Icon to render at the start of the button. */
  startIcon?: IconName;
  /** Whether the start icon is active */
  startIconActive?: boolean;
  /** Set the end node */
  end?: React.ReactNode;
  /** Icon to render at the end of the button. */
  endIcon?: IconName;
  /** Whether the end icon is active */
  endIconActive?: boolean;
  /** Ensure the button aligns flush on the left or right.
   * This prop will translate the entire button left/right,
   * so take care to ensure it is not overflowing awkwardly
   */
  flush?: 'start' | 'end';
  /** Uniquely identify the button within a form. */
  name?: string;
  /** Don't scale element on press. */
  noScaleOnPress?: boolean;
  /**
   * Truncates text after wrapping to a defined number of lines.
   * @default 1
   */
  numberOfLines?: number;
}`,signature:{properties:[{key:"variant",value:{name:"union",raw:`| 'primary'
| 'secondary'
| 'tertiary'
| 'positive'
| 'negative'
| 'foregroundMuted'`,elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"},{name:"literal",value:"'tertiary'"},{name:"literal",value:"'positive'"},{name:"literal",value:"'negative'"},{name:"literal",value:"'foregroundMuted'"}],required:!1},description:`Toggle design and visual variants.
@default primary`},{key:"disabled",value:{name:"boolean",required:!1},description:"Mark the button as disabled."},{key:"loading",value:{name:"boolean",required:!1},description:"Mark the button as loading and display a spinner."},{key:"transparent",value:{name:"boolean",required:!1},description:"Mark the background and border as transparent until interacted with."},{key:"block",value:{name:"boolean",required:!1},description:"Change to block and expand to 100% of parent width."},{key:"compact",value:{name:"boolean",required:!1},description:"Reduce the inner padding within the button itself."},{key:"children",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0},description:"Children to render within the button."},{key:"start",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"Set the start node"},{key:"startIcon",value:{name:"union",raw:`| 'account'
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
| 'xLogo'`,elements:[{name:"literal",value:"'account'"},{name:"literal",value:"'activity'"},{name:"literal",value:"'add'"},{name:"literal",value:"'addPeople'"},{name:"literal",value:"'advancedMarketSelector'"},{name:"literal",value:"'advancedTradeProduct'"},{name:"literal",value:"'affiliates'"},{name:"literal",value:"'airdrop'"},{name:"literal",value:"'airdropAlt'"},{name:"literal",value:"'airdropCoins'"},{name:"literal",value:"'airdropParachute'"},{name:"literal",value:"'alien'"},{name:"literal",value:"'allTimeHigh'"},{name:"literal",value:"'allocation'"},{name:"literal",value:"'annotation'"},{name:"literal",value:"'api'"},{name:"literal",value:"'apiPlug'"},{name:"literal",value:"'apothecary'"},{name:"literal",value:"'appSwitcher'"},{name:"literal",value:"'apple'"},{name:"literal",value:"'appleLogo'"},{name:"literal",value:"'application'"},{name:"literal",value:"'arrowDown'"},{name:"literal",value:"'arrowLeft'"},{name:"literal",value:"'arrowRight'"},{name:"literal",value:"'arrowUp'"},{name:"literal",value:"'arrowsHorizontal'"},{name:"literal",value:"'arrowsUpDown'"},{name:"literal",value:"'arrowsVertical'"},{name:"literal",value:"'artwork'"},{name:"literal",value:"'assetHubProduct'"},{name:"literal",value:"'assetManagementProduct'"},{name:"literal",value:"'astronautHelmet'"},{name:"literal",value:"'atSign'"},{name:"literal",value:"'atomScience'"},{name:"literal",value:"'auto'"},{name:"literal",value:"'autoCar'"},{name:"literal",value:"'avatar'"},{name:"literal",value:"'average'"},{name:"literal",value:"'backArrow'"},{name:"literal",value:"'ballot'"},{name:"literal",value:"'ballotbox'"},{name:"literal",value:"'bandage'"},{name:"literal",value:"'bank'"},{name:"literal",value:"'barChartSimple'"},{name:"literal",value:"'barChartWindow'"},{name:"literal",value:"'base'"},{name:"literal",value:"'baseApps'"},{name:"literal",value:"'baseFeed'"},{name:"literal",value:"'baseNotification'"},{name:"literal",value:"'baseQuickBuy'"},{name:"literal",value:"'baseSquare'"},{name:"literal",value:"'baseTransact'"},{name:"literal",value:"'baseVerification'"},{name:"literal",value:"'baseWallet'"},{name:"literal",value:"'baseball'"},{name:"literal",value:"'basketball'"},{name:"literal",value:"'beaker'"},{name:"literal",value:"'beginningArrow'"},{name:"literal",value:"'bell'"},{name:"literal",value:"'bellCheck'"},{name:"literal",value:"'bellPlus'"},{name:"literal",value:"'birthcertificate'"},{name:"literal",value:"'block'"},{name:"literal",value:"'blockchain'"},{name:"literal",value:"'blog'"},{name:"literal",value:"'book'"},{name:"literal",value:"'bookmark'"},{name:"literal",value:"'borrowProduct'"},{name:"literal",value:"'boxing'"},{name:"literal",value:"'bridging'"},{name:"literal",value:"'briefcase'"},{name:"literal",value:"'briefcaseAlt'"},{name:"literal",value:"'browser'"},{name:"literal",value:"'bug'"},{name:"literal",value:"'building'"},{name:"literal",value:"'calculator'"},{name:"literal",value:"'calendar'"},{name:"literal",value:"'calendarBlank'"},{name:"literal",value:"'calendarDates'"},{name:"literal",value:"'calendarEmpty'"},{name:"literal",value:"'calendarHeart'"},{name:"literal",value:"'calendarMoney'"},{name:"literal",value:"'calendarStar'"},{name:"literal",value:"'camera'"},{name:"literal",value:"'candlesticks'"},{name:"literal",value:"'car'"},{name:"literal",value:"'card'"},{name:"literal",value:"'caret'"},{name:"literal",value:"'caretDown'"},{name:"literal",value:"'caretLeft'"},{name:"literal",value:"'caretRight'"},{name:"literal",value:"'caretUp'"},{name:"literal",value:"'cash'"},{name:"literal",value:"'cashAustralianDollar'"},{name:"literal",value:"'cashBrazilianReal'"},{name:"literal",value:"'cashBrazillianReal'"},{name:"literal",value:"'cashCanadianDollar'"},{name:"literal",value:"'cashCoins'"},{name:"literal",value:"'cashEUR'"},{name:"literal",value:"'cashGBP'"},{name:"literal",value:"'cashIndonesianRupiah'"},{name:"literal",value:"'cashJPY'"},{name:"literal",value:"'cashPhilippinePeso'"},{name:"literal",value:"'cashPolishZloty'"},{name:"literal",value:"'cashRupee'"},{name:"literal",value:"'cashSingaporeDollar'"},{name:"literal",value:"'cashSwissFranc'"},{name:"literal",value:"'cashThaiBaht'"},{name:"literal",value:"'cashTurkishLira'"},{name:"literal",value:"'cashUSD'"},{name:"literal",value:"'cashUaeDirham'"},{name:"literal",value:"'cashVietnameseDong'"},{name:"literal",value:"'chainLink'"},{name:"literal",value:"'chartBar'"},{name:"literal",value:"'chartCandles'"},{name:"literal",value:"'chartLine'"},{name:"literal",value:"'chartPie'"},{name:"literal",value:"'chartPieCircle'"},{name:"literal",value:"'chartVolume'"},{name:"literal",value:"'chatBotAgent'"},{name:"literal",value:"'chatBubble'"},{name:"literal",value:"'chatRequests'"},{name:"literal",value:"'checkboxChecked'"},{name:"literal",value:"'checkboxEmpty'"},{name:"literal",value:"'checkmark'"},{name:"literal",value:"'chess'"},{name:"literal",value:"'circleCheckmark'"},{name:"literal",value:"'circleCross'"},{name:"literal",value:"'circulatingSupply'"},{name:"literal",value:"'city'"},{name:"literal",value:"'clipboard'"},{name:"literal",value:"'clock'"},{name:"literal",value:"'clockOutline'"},{name:"literal",value:"'close'"},{name:"literal",value:"'closeCaption'"},{name:"literal",value:"'clothing'"},{name:"literal",value:"'cloud'"},{name:"literal",value:"'cloudPartial'"},{name:"literal",value:"'cloudProduct'"},{name:"literal",value:"'cluster'"},{name:"literal",value:"'coinbase'"},{name:"literal",value:"'coinbaseCardProduct'"},{name:"literal",value:"'coinbaseOne'"},{name:"literal",value:"'coinbaseOneCard'"},{name:"literal",value:"'coinbaseOneLogo'"},{name:"literal",value:"'coinbaseRewards'"},{name:"literal",value:"'coinsCrypto'"},{name:"literal",value:"'collapse'"},{name:"literal",value:"'collectibles'"},{name:"literal",value:"'collection'"},{name:"literal",value:"'comment'"},{name:"literal",value:"'commentPlus'"},{name:"literal",value:"'commerceProduct'"},{name:"literal",value:"'compass'"},{name:"literal",value:"'complianceProduct'"},{name:"literal",value:"'compose'"},{name:"literal",value:"'computerChip'"},{name:"literal",value:"'concierge'"},{name:"literal",value:"'conciergeBell'"},{name:"literal",value:"'config'"},{name:"literal",value:"'continuous'"},{name:"literal",value:"'convert'"},{name:"literal",value:"'copy'"},{name:"literal",value:"'corporation'"},{name:"literal",value:"'creatorCoin'"},{name:"literal",value:"'cricket'"},{name:"literal",value:"'cross'"},{name:"literal",value:"'crossTrade'"},{name:"literal",value:"'crypto'"},{name:"literal",value:"'cryptobasics'"},{name:"literal",value:"'crystalBall'"},{name:"literal",value:"'crystalBallInsight'"},{name:"literal",value:"'currencies'"},{name:"literal",value:"'custodyProduct'"},{name:"literal",value:"'dashboard'"},{name:"literal",value:"'dataMarketplaceProduct'"},{name:"literal",value:"'dataStack'"},{name:"literal",value:"'defi'"},{name:"literal",value:"'delegateProduct'"},{name:"literal",value:"'deposit'"},{name:"literal",value:"'derivatives'"},{name:"literal",value:"'derivativesProduct'"},{name:"literal",value:"'derivativesProductNew'"},{name:"literal",value:"'developerAPIProduct'"},{name:"literal",value:"'developerPlatformProduct'"},{name:"literal",value:"'dex'"},{name:"literal",value:"'diagonalDownArrow'"},{name:"literal",value:"'diagonalRightArrow'"},{name:"literal",value:"'diagonalUpArrow'"},{name:"literal",value:"'diamond'"},{name:"literal",value:"'diamondIncentives'"},{name:"literal",value:"'dinnerPlate'"},{name:"literal",value:"'directDeposit'"},{name:"literal",value:"'directDepositIcon'"},{name:"literal",value:"'disabledPhone'"},{name:"literal",value:"'discordLogo'"},{name:"literal",value:"'distribution'"},{name:"literal",value:"'document'"},{name:"literal",value:"'documentation'"},{name:"literal",value:"'dot'"},{name:"literal",value:"'doubleChevronRight'"},{name:"literal",value:"'downArrow'"},{name:"literal",value:"'download'"},{name:"literal",value:"'drag'"},{name:"literal",value:"'drops'"},{name:"literal",value:"'earn'"},{name:"literal",value:"'earnProduct'"},{name:"literal",value:"'earnRewards'"},{name:"literal",value:"'earthquake'"},{name:"literal",value:"'educationBook'"},{name:"literal",value:"'educationPencil'"},{name:"literal",value:"'email'"},{name:"literal",value:"'endArrow'"},{name:"literal",value:"'entertainment'"},{name:"literal",value:"'error'"},{name:"literal",value:"'ethereum'"},{name:"literal",value:"'eventContracts'"},{name:"literal",value:"'exchangeProduct'"},{name:"literal",value:"'exclamationMark'"},{name:"literal",value:"'expand'"},{name:"literal",value:"'expandAddress'"},{name:"literal",value:"'expandAll'"},{name:"literal",value:"'externalLink'"},{name:"literal",value:"'eye'"},{name:"literal",value:"'faceScan'"},{name:"literal",value:"'faces'"},{name:"literal",value:"'factory'"},{name:"literal",value:"'faucet'"},{name:"literal",value:"'fib'"},{name:"literal",value:"'filmStrip'"},{name:"literal",value:"'filter'"},{name:"literal",value:"'fingerprint'"},{name:"literal",value:"'flame'"},{name:"literal",value:"'folder'"},{name:"literal",value:"'folderArrow'"},{name:"literal",value:"'folderOpen'"},{name:"literal",value:"'followAdd'"},{name:"literal",value:"'following'"},{name:"literal",value:"'football'"},{name:"literal",value:"'fork'"},{name:"literal",value:"'forwardArrow'"},{name:"literal",value:"'fscsProtection'"},{name:"literal",value:"'gab'"},{name:"literal",value:"'games'"},{name:"literal",value:"'gaming'"},{name:"literal",value:"'gasFees'"},{name:"literal",value:"'gasFeesAlt'"},{name:"literal",value:"'gauge'"},{name:"literal",value:"'gaugeEmpty'"},{name:"literal",value:"'gaugeHigh'"},{name:"literal",value:"'gaugeHighLow'"},{name:"literal",value:"'gaugeHighMid'"},{name:"literal",value:"'gaugeLow'"},{name:"literal",value:"'gaugeLowHigh'"},{name:"literal",value:"'gaugeLowMid'"},{name:"literal",value:"'gaugeMedium'"},{name:"literal",value:"'gavel'"},{name:"literal",value:"'gear'"},{name:"literal",value:"'generalCharacter'"},{name:"literal",value:"'ghost'"},{name:"literal",value:"'gif'"},{name:"literal",value:"'giftBox'"},{name:"literal",value:"'giftCard'"},{name:"literal",value:"'gitHubLogo'"},{name:"literal",value:"'globe'"},{name:"literal",value:"'golf'"},{name:"literal",value:"'googleLogo'"},{name:"literal",value:"'greenEnergy'"},{name:"literal",value:"'grid'"},{name:"literal",value:"'group'"},{name:"literal",value:"'hamburger'"},{name:"literal",value:"'hammer'"},{name:"literal",value:"'heart'"},{name:"literal",value:"'helpCenterProduct'"},{name:"literal",value:"'helpCenterQuestionMark'"},{name:"literal",value:"'hiddenEye'"},{name:"literal",value:"'hockey'"},{name:"literal",value:"'home'"},{name:"literal",value:"'horizontalLine'"},{name:"literal",value:"'hospital'"},{name:"literal",value:"'hospitalCross'"},{name:"literal",value:"'hurricane'"},{name:"literal",value:"'ideal'"},{name:"literal",value:"'identityCard'"},{name:"literal",value:"'image'"},{name:"literal",value:"'info'"},{name:"literal",value:"'initiator'"},{name:"literal",value:"'instagramLogo'"},{name:"literal",value:"'instantUnstakingClock'"},{name:"literal",value:"'institute'"},{name:"literal",value:"'institutionalProduct'"},{name:"literal",value:"'interest'"},{name:"literal",value:"'invisible'"},{name:"literal",value:"'invoice'"},{name:"literal",value:"'key'"},{name:"literal",value:"'keyboard'"},{name:"literal",value:"'laptop'"},{name:"literal",value:"'leadChart'"},{name:"literal",value:"'leadCoin'"},{name:"literal",value:"'learningRewardsProduct'"},{name:"literal",value:"'light'"},{name:"literal",value:"'lightbulb'"},{name:"literal",value:"'lightning'"},{name:"literal",value:"'lightningBolt'"},{name:"literal",value:"'lineChartCrypto'"},{name:"literal",value:"'list'"},{name:"literal",value:"'location'"},{name:"literal",value:"'lock'"},{name:"literal",value:"'login'"},{name:"literal",value:"'logout'"},{name:"literal",value:"'loop'"},{name:"literal",value:"'magnifyingGlass'"},{name:"literal",value:"'marketCap'"},{name:"literal",value:"'medal'"},{name:"literal",value:"'megaphone'"},{name:"literal",value:"'menu'"},{name:"literal",value:"'metaverse'"},{name:"literal",value:"'microphone'"},{name:"literal",value:"'microphoneCordless'"},{name:"literal",value:"'microscope'"},{name:"literal",value:"'mint'"},{name:"literal",value:"'minus'"},{name:"literal",value:"'mma'"},{name:"literal",value:"'moneyCardCoin'"},{name:"literal",value:"'moon'"},{name:"literal",value:"'more'"},{name:"literal",value:"'moreVertical'"},{name:"literal",value:"'motorsport'"},{name:"literal",value:"'music'"},{name:"literal",value:"'musicArticles'"},{name:"literal",value:"'needle'"},{name:"literal",value:"'newsFeed'"},{name:"literal",value:"'newsletter'"},{name:"literal",value:"'nft'"},{name:"literal",value:"'nftBuy'"},{name:"literal",value:"'nftOffer'"},{name:"literal",value:"'nftProduct'"},{name:"literal",value:"'nftSale'"},{name:"literal",value:"'noRocket'"},{name:"literal",value:"'noWifi'"},{name:"literal",value:"'nodeProduct'"},{name:"literal",value:"'oil'"},{name:"literal",value:"'options'"},{name:"literal",value:"'orderBook'"},{name:"literal",value:"'orderHistory'"},{name:"literal",value:"'outline'"},{name:"literal",value:"'pFPS'"},{name:"literal",value:"'paperAirplane'"},{name:"literal",value:"'paperclip'"},{name:"literal",value:"'participate'"},{name:"literal",value:"'participateProduct'"},{name:"literal",value:"'passKey'"},{name:"literal",value:"'passport'"},{name:"literal",value:"'pause'"},{name:"literal",value:"'pay'"},{name:"literal",value:"'payProduct'"},{name:"literal",value:"'paymentCard'"},{name:"literal",value:"'payments'"},{name:"literal",value:"'payouts'"},{name:"literal",value:"'paypal'"},{name:"literal",value:"'pencil'"},{name:"literal",value:"'peopleGroup'"},{name:"literal",value:"'peopleStar'"},{name:"literal",value:"'percentage'"},{name:"literal",value:"'perpetualSwap'"},{name:"literal",value:"'phone'"},{name:"literal",value:"'pieChartData'"},{name:"literal",value:"'pillBottle'"},{name:"literal",value:"'pillCapsule'"},{name:"literal",value:"'pin'"},{name:"literal",value:"'plane'"},{name:"literal",value:"'planet'"},{name:"literal",value:"'play'"},{name:"literal",value:"'playbutton'"},{name:"literal",value:"'plusMinus'"},{name:"literal",value:"'podiumStar'"},{name:"literal",value:"'politicsBuilding'"},{name:"literal",value:"'politicsCandidate'"},{name:"literal",value:"'politicsFlag'"},{name:"literal",value:"'politicsGavel'"},{name:"literal",value:"'politicsPodium'"},{name:"literal",value:"'politicsStar'"},{name:"literal",value:"'powerTool'"},{name:"literal",value:"'priceAlerts'"},{name:"literal",value:"'priceAlertsCheck'"},{name:"literal",value:"'primePoduct'"},{name:"literal",value:"'privateClientProduct'"},{name:"literal",value:"'proProduct'"},{name:"literal",value:"'profile'"},{name:"literal",value:"'protection'"},{name:"literal",value:"'pulse'"},{name:"literal",value:"'pyramid'"},{name:"literal",value:"'qrCode'"},{name:"literal",value:"'qrCodeAlt'"},{name:"literal",value:"'queryTransact'"},{name:"literal",value:"'questionMark'"},{name:"literal",value:"'quotation'"},{name:"literal",value:"'rain'"},{name:"literal",value:"'ratingsCheck'"},{name:"literal",value:"'ratingsChecks'"},{name:"literal",value:"'ratingsStar'"},{name:"literal",value:"'reCenter'"},{name:"literal",value:"'rectangle'"},{name:"literal",value:"'recurring'"},{name:"literal",value:"'refresh'"},{name:"literal",value:"'regulated'"},{name:"literal",value:"'regulatedFutures'"},{name:"literal",value:"'report'"},{name:"literal",value:"'rewardsProduct'"},{name:"literal",value:"'ribbon'"},{name:"literal",value:"'robot'"},{name:"literal",value:"'rocket'"},{name:"literal",value:"'rocketShip'"},{name:"literal",value:"'rollingSpot'"},{name:"literal",value:"'rosettaProduct'"},{name:"literal",value:"'rottenTomato'"},{name:"literal",value:"'royalty'"},{name:"literal",value:"'safe'"},{name:"literal",value:"'save'"},{name:"literal",value:"'savingsBank'"},{name:"literal",value:"'scanQrCode'"},{name:"literal",value:"'scienceAtom'"},{name:"literal",value:"'scienceBeaker'"},{name:"literal",value:"'scienceMoon'"},{name:"literal",value:"'search'"},{name:"literal",value:"'securityKey'"},{name:"literal",value:"'securityShield'"},{name:"literal",value:"'seen'"},{name:"literal",value:"'sendReceive'"},{name:"literal",value:"'setPinCode'"},{name:"literal",value:"'settings'"},{name:"literal",value:"'share'"},{name:"literal",value:"'shield'"},{name:"literal",value:"'shieldOutline'"},{name:"literal",value:"'shoe'"},{name:"literal",value:"'shoppingCart'"},{name:"literal",value:"'signinProduct'"},{name:"literal",value:"'singleCoin'"},{name:"literal",value:"'singleNote'"},{name:"literal",value:"'singlecloud'"},{name:"literal",value:"'smartContract'"},{name:"literal",value:"'snow'"},{name:"literal",value:"'soccer'"},{name:"literal",value:"'socialChat'"},{name:"literal",value:"'socialReshare'"},{name:"literal",value:"'socialShare'"},{name:"literal",value:"'sofort'"},{name:"literal",value:"'sortDoubleArrow'"},{name:"literal",value:"'sortDown'"},{name:"literal",value:"'sortDownCenter'"},{name:"literal",value:"'sortUp'"},{name:"literal",value:"'sortUpCenter'"},{name:"literal",value:"'soundOff'"},{name:"literal",value:"'soundOn'"},{name:"literal",value:"'sparkle'"},{name:"literal",value:"'speaker'"},{name:"literal",value:"'speechBubble'"},{name:"literal",value:"'stableCoin'"},{name:"literal",value:"'stablecoinStack'"},{name:"literal",value:"'staggeredList'"},{name:"literal",value:"'stake'"},{name:"literal",value:"'staking'"},{name:"literal",value:"'star'"},{name:"literal",value:"'starAward'"},{name:"literal",value:"'starBubble'"},{name:"literal",value:"'starTrophy'"},{name:"literal",value:"'statusDot'"},{name:"literal",value:"'step0'"},{name:"literal",value:"'step1'"},{name:"literal",value:"'step2'"},{name:"literal",value:"'step3'"},{name:"literal",value:"'step4'"},{name:"literal",value:"'step5'"},{name:"literal",value:"'step6'"},{name:"literal",value:"'step7'"},{name:"literal",value:"'step8'"},{name:"literal",value:"'step9'"},{name:"literal",value:"'strategy'"},{name:"literal",value:"'sun'"},{name:"literal",value:"'support'"},{name:"literal",value:"'tag'"},{name:"literal",value:"'taxes'"},{name:"literal",value:"'taxesReceipt'"},{name:"literal",value:"'telephone'"},{name:"literal",value:"'tennis'"},{name:"literal",value:"'test'"},{name:"literal",value:"'thermometer'"},{name:"literal",value:"'thumbsDown'"},{name:"literal",value:"'thumbsDownOutline'"},{name:"literal",value:"'thumbsUp'"},{name:"literal",value:"'thumbsUpOutline'"},{name:"literal",value:"'tokenLaunchCoin'"},{name:"literal",value:"'tokenLaunchRocket'"},{name:"literal",value:"'tokenSales'"},{name:"literal",value:"'tornado'"},{name:"literal",value:"'trading'"},{name:"literal",value:"'transactions'"},{name:"literal",value:"'trashCan'"},{name:"literal",value:"'trophy'"},{name:"literal",value:"'trophyCup'"},{name:"literal",value:"'tshirt'"},{name:"literal",value:"'tv'"},{name:"literal",value:"'tvStand'"},{name:"literal",value:"'twitterLogo'"},{name:"literal",value:"'ultility'"},{name:"literal",value:"'umbrella'"},{name:"literal",value:"'undo'"},{name:"literal",value:"'unfollowPeople'"},{name:"literal",value:"'unknown'"},{name:"literal",value:"'unlock'"},{name:"literal",value:"'upArrow'"},{name:"literal",value:"'upload'"},{name:"literal",value:"'venturesProduct'"},{name:"literal",value:"'verifiedBadge'"},{name:"literal",value:"'verifiedPools'"},{name:"literal",value:"'verticalLine'"},{name:"literal",value:"'virus'"},{name:"literal",value:"'visible'"},{name:"literal",value:"'waasProduct'"},{name:"literal",value:"'wallet'"},{name:"literal",value:"'walletLogo'"},{name:"literal",value:"'walletProduct'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'webhooks'"},{name:"literal",value:"'wellness'"},{name:"literal",value:"'wifi'"},{name:"literal",value:"'wind'"},{name:"literal",value:"'wireTransfer'"},{name:"literal",value:"'withdraw'"},{name:"literal",value:"'wrapToken'"},{name:"literal",value:"'xLogo'"}],required:!0},description:"Icon to render at the start of the button."},{key:"startIconActive",value:{name:"boolean",required:!1},description:"Whether the start icon is active"},{key:"end",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"Set the end node"},{key:"endIcon",value:{name:"union",raw:`| 'account'
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
| 'xLogo'`,elements:[{name:"literal",value:"'account'"},{name:"literal",value:"'activity'"},{name:"literal",value:"'add'"},{name:"literal",value:"'addPeople'"},{name:"literal",value:"'advancedMarketSelector'"},{name:"literal",value:"'advancedTradeProduct'"},{name:"literal",value:"'affiliates'"},{name:"literal",value:"'airdrop'"},{name:"literal",value:"'airdropAlt'"},{name:"literal",value:"'airdropCoins'"},{name:"literal",value:"'airdropParachute'"},{name:"literal",value:"'alien'"},{name:"literal",value:"'allTimeHigh'"},{name:"literal",value:"'allocation'"},{name:"literal",value:"'annotation'"},{name:"literal",value:"'api'"},{name:"literal",value:"'apiPlug'"},{name:"literal",value:"'apothecary'"},{name:"literal",value:"'appSwitcher'"},{name:"literal",value:"'apple'"},{name:"literal",value:"'appleLogo'"},{name:"literal",value:"'application'"},{name:"literal",value:"'arrowDown'"},{name:"literal",value:"'arrowLeft'"},{name:"literal",value:"'arrowRight'"},{name:"literal",value:"'arrowUp'"},{name:"literal",value:"'arrowsHorizontal'"},{name:"literal",value:"'arrowsUpDown'"},{name:"literal",value:"'arrowsVertical'"},{name:"literal",value:"'artwork'"},{name:"literal",value:"'assetHubProduct'"},{name:"literal",value:"'assetManagementProduct'"},{name:"literal",value:"'astronautHelmet'"},{name:"literal",value:"'atSign'"},{name:"literal",value:"'atomScience'"},{name:"literal",value:"'auto'"},{name:"literal",value:"'autoCar'"},{name:"literal",value:"'avatar'"},{name:"literal",value:"'average'"},{name:"literal",value:"'backArrow'"},{name:"literal",value:"'ballot'"},{name:"literal",value:"'ballotbox'"},{name:"literal",value:"'bandage'"},{name:"literal",value:"'bank'"},{name:"literal",value:"'barChartSimple'"},{name:"literal",value:"'barChartWindow'"},{name:"literal",value:"'base'"},{name:"literal",value:"'baseApps'"},{name:"literal",value:"'baseFeed'"},{name:"literal",value:"'baseNotification'"},{name:"literal",value:"'baseQuickBuy'"},{name:"literal",value:"'baseSquare'"},{name:"literal",value:"'baseTransact'"},{name:"literal",value:"'baseVerification'"},{name:"literal",value:"'baseWallet'"},{name:"literal",value:"'baseball'"},{name:"literal",value:"'basketball'"},{name:"literal",value:"'beaker'"},{name:"literal",value:"'beginningArrow'"},{name:"literal",value:"'bell'"},{name:"literal",value:"'bellCheck'"},{name:"literal",value:"'bellPlus'"},{name:"literal",value:"'birthcertificate'"},{name:"literal",value:"'block'"},{name:"literal",value:"'blockchain'"},{name:"literal",value:"'blog'"},{name:"literal",value:"'book'"},{name:"literal",value:"'bookmark'"},{name:"literal",value:"'borrowProduct'"},{name:"literal",value:"'boxing'"},{name:"literal",value:"'bridging'"},{name:"literal",value:"'briefcase'"},{name:"literal",value:"'briefcaseAlt'"},{name:"literal",value:"'browser'"},{name:"literal",value:"'bug'"},{name:"literal",value:"'building'"},{name:"literal",value:"'calculator'"},{name:"literal",value:"'calendar'"},{name:"literal",value:"'calendarBlank'"},{name:"literal",value:"'calendarDates'"},{name:"literal",value:"'calendarEmpty'"},{name:"literal",value:"'calendarHeart'"},{name:"literal",value:"'calendarMoney'"},{name:"literal",value:"'calendarStar'"},{name:"literal",value:"'camera'"},{name:"literal",value:"'candlesticks'"},{name:"literal",value:"'car'"},{name:"literal",value:"'card'"},{name:"literal",value:"'caret'"},{name:"literal",value:"'caretDown'"},{name:"literal",value:"'caretLeft'"},{name:"literal",value:"'caretRight'"},{name:"literal",value:"'caretUp'"},{name:"literal",value:"'cash'"},{name:"literal",value:"'cashAustralianDollar'"},{name:"literal",value:"'cashBrazilianReal'"},{name:"literal",value:"'cashBrazillianReal'"},{name:"literal",value:"'cashCanadianDollar'"},{name:"literal",value:"'cashCoins'"},{name:"literal",value:"'cashEUR'"},{name:"literal",value:"'cashGBP'"},{name:"literal",value:"'cashIndonesianRupiah'"},{name:"literal",value:"'cashJPY'"},{name:"literal",value:"'cashPhilippinePeso'"},{name:"literal",value:"'cashPolishZloty'"},{name:"literal",value:"'cashRupee'"},{name:"literal",value:"'cashSingaporeDollar'"},{name:"literal",value:"'cashSwissFranc'"},{name:"literal",value:"'cashThaiBaht'"},{name:"literal",value:"'cashTurkishLira'"},{name:"literal",value:"'cashUSD'"},{name:"literal",value:"'cashUaeDirham'"},{name:"literal",value:"'cashVietnameseDong'"},{name:"literal",value:"'chainLink'"},{name:"literal",value:"'chartBar'"},{name:"literal",value:"'chartCandles'"},{name:"literal",value:"'chartLine'"},{name:"literal",value:"'chartPie'"},{name:"literal",value:"'chartPieCircle'"},{name:"literal",value:"'chartVolume'"},{name:"literal",value:"'chatBotAgent'"},{name:"literal",value:"'chatBubble'"},{name:"literal",value:"'chatRequests'"},{name:"literal",value:"'checkboxChecked'"},{name:"literal",value:"'checkboxEmpty'"},{name:"literal",value:"'checkmark'"},{name:"literal",value:"'chess'"},{name:"literal",value:"'circleCheckmark'"},{name:"literal",value:"'circleCross'"},{name:"literal",value:"'circulatingSupply'"},{name:"literal",value:"'city'"},{name:"literal",value:"'clipboard'"},{name:"literal",value:"'clock'"},{name:"literal",value:"'clockOutline'"},{name:"literal",value:"'close'"},{name:"literal",value:"'closeCaption'"},{name:"literal",value:"'clothing'"},{name:"literal",value:"'cloud'"},{name:"literal",value:"'cloudPartial'"},{name:"literal",value:"'cloudProduct'"},{name:"literal",value:"'cluster'"},{name:"literal",value:"'coinbase'"},{name:"literal",value:"'coinbaseCardProduct'"},{name:"literal",value:"'coinbaseOne'"},{name:"literal",value:"'coinbaseOneCard'"},{name:"literal",value:"'coinbaseOneLogo'"},{name:"literal",value:"'coinbaseRewards'"},{name:"literal",value:"'coinsCrypto'"},{name:"literal",value:"'collapse'"},{name:"literal",value:"'collectibles'"},{name:"literal",value:"'collection'"},{name:"literal",value:"'comment'"},{name:"literal",value:"'commentPlus'"},{name:"literal",value:"'commerceProduct'"},{name:"literal",value:"'compass'"},{name:"literal",value:"'complianceProduct'"},{name:"literal",value:"'compose'"},{name:"literal",value:"'computerChip'"},{name:"literal",value:"'concierge'"},{name:"literal",value:"'conciergeBell'"},{name:"literal",value:"'config'"},{name:"literal",value:"'continuous'"},{name:"literal",value:"'convert'"},{name:"literal",value:"'copy'"},{name:"literal",value:"'corporation'"},{name:"literal",value:"'creatorCoin'"},{name:"literal",value:"'cricket'"},{name:"literal",value:"'cross'"},{name:"literal",value:"'crossTrade'"},{name:"literal",value:"'crypto'"},{name:"literal",value:"'cryptobasics'"},{name:"literal",value:"'crystalBall'"},{name:"literal",value:"'crystalBallInsight'"},{name:"literal",value:"'currencies'"},{name:"literal",value:"'custodyProduct'"},{name:"literal",value:"'dashboard'"},{name:"literal",value:"'dataMarketplaceProduct'"},{name:"literal",value:"'dataStack'"},{name:"literal",value:"'defi'"},{name:"literal",value:"'delegateProduct'"},{name:"literal",value:"'deposit'"},{name:"literal",value:"'derivatives'"},{name:"literal",value:"'derivativesProduct'"},{name:"literal",value:"'derivativesProductNew'"},{name:"literal",value:"'developerAPIProduct'"},{name:"literal",value:"'developerPlatformProduct'"},{name:"literal",value:"'dex'"},{name:"literal",value:"'diagonalDownArrow'"},{name:"literal",value:"'diagonalRightArrow'"},{name:"literal",value:"'diagonalUpArrow'"},{name:"literal",value:"'diamond'"},{name:"literal",value:"'diamondIncentives'"},{name:"literal",value:"'dinnerPlate'"},{name:"literal",value:"'directDeposit'"},{name:"literal",value:"'directDepositIcon'"},{name:"literal",value:"'disabledPhone'"},{name:"literal",value:"'discordLogo'"},{name:"literal",value:"'distribution'"},{name:"literal",value:"'document'"},{name:"literal",value:"'documentation'"},{name:"literal",value:"'dot'"},{name:"literal",value:"'doubleChevronRight'"},{name:"literal",value:"'downArrow'"},{name:"literal",value:"'download'"},{name:"literal",value:"'drag'"},{name:"literal",value:"'drops'"},{name:"literal",value:"'earn'"},{name:"literal",value:"'earnProduct'"},{name:"literal",value:"'earnRewards'"},{name:"literal",value:"'earthquake'"},{name:"literal",value:"'educationBook'"},{name:"literal",value:"'educationPencil'"},{name:"literal",value:"'email'"},{name:"literal",value:"'endArrow'"},{name:"literal",value:"'entertainment'"},{name:"literal",value:"'error'"},{name:"literal",value:"'ethereum'"},{name:"literal",value:"'eventContracts'"},{name:"literal",value:"'exchangeProduct'"},{name:"literal",value:"'exclamationMark'"},{name:"literal",value:"'expand'"},{name:"literal",value:"'expandAddress'"},{name:"literal",value:"'expandAll'"},{name:"literal",value:"'externalLink'"},{name:"literal",value:"'eye'"},{name:"literal",value:"'faceScan'"},{name:"literal",value:"'faces'"},{name:"literal",value:"'factory'"},{name:"literal",value:"'faucet'"},{name:"literal",value:"'fib'"},{name:"literal",value:"'filmStrip'"},{name:"literal",value:"'filter'"},{name:"literal",value:"'fingerprint'"},{name:"literal",value:"'flame'"},{name:"literal",value:"'folder'"},{name:"literal",value:"'folderArrow'"},{name:"literal",value:"'folderOpen'"},{name:"literal",value:"'followAdd'"},{name:"literal",value:"'following'"},{name:"literal",value:"'football'"},{name:"literal",value:"'fork'"},{name:"literal",value:"'forwardArrow'"},{name:"literal",value:"'fscsProtection'"},{name:"literal",value:"'gab'"},{name:"literal",value:"'games'"},{name:"literal",value:"'gaming'"},{name:"literal",value:"'gasFees'"},{name:"literal",value:"'gasFeesAlt'"},{name:"literal",value:"'gauge'"},{name:"literal",value:"'gaugeEmpty'"},{name:"literal",value:"'gaugeHigh'"},{name:"literal",value:"'gaugeHighLow'"},{name:"literal",value:"'gaugeHighMid'"},{name:"literal",value:"'gaugeLow'"},{name:"literal",value:"'gaugeLowHigh'"},{name:"literal",value:"'gaugeLowMid'"},{name:"literal",value:"'gaugeMedium'"},{name:"literal",value:"'gavel'"},{name:"literal",value:"'gear'"},{name:"literal",value:"'generalCharacter'"},{name:"literal",value:"'ghost'"},{name:"literal",value:"'gif'"},{name:"literal",value:"'giftBox'"},{name:"literal",value:"'giftCard'"},{name:"literal",value:"'gitHubLogo'"},{name:"literal",value:"'globe'"},{name:"literal",value:"'golf'"},{name:"literal",value:"'googleLogo'"},{name:"literal",value:"'greenEnergy'"},{name:"literal",value:"'grid'"},{name:"literal",value:"'group'"},{name:"literal",value:"'hamburger'"},{name:"literal",value:"'hammer'"},{name:"literal",value:"'heart'"},{name:"literal",value:"'helpCenterProduct'"},{name:"literal",value:"'helpCenterQuestionMark'"},{name:"literal",value:"'hiddenEye'"},{name:"literal",value:"'hockey'"},{name:"literal",value:"'home'"},{name:"literal",value:"'horizontalLine'"},{name:"literal",value:"'hospital'"},{name:"literal",value:"'hospitalCross'"},{name:"literal",value:"'hurricane'"},{name:"literal",value:"'ideal'"},{name:"literal",value:"'identityCard'"},{name:"literal",value:"'image'"},{name:"literal",value:"'info'"},{name:"literal",value:"'initiator'"},{name:"literal",value:"'instagramLogo'"},{name:"literal",value:"'instantUnstakingClock'"},{name:"literal",value:"'institute'"},{name:"literal",value:"'institutionalProduct'"},{name:"literal",value:"'interest'"},{name:"literal",value:"'invisible'"},{name:"literal",value:"'invoice'"},{name:"literal",value:"'key'"},{name:"literal",value:"'keyboard'"},{name:"literal",value:"'laptop'"},{name:"literal",value:"'leadChart'"},{name:"literal",value:"'leadCoin'"},{name:"literal",value:"'learningRewardsProduct'"},{name:"literal",value:"'light'"},{name:"literal",value:"'lightbulb'"},{name:"literal",value:"'lightning'"},{name:"literal",value:"'lightningBolt'"},{name:"literal",value:"'lineChartCrypto'"},{name:"literal",value:"'list'"},{name:"literal",value:"'location'"},{name:"literal",value:"'lock'"},{name:"literal",value:"'login'"},{name:"literal",value:"'logout'"},{name:"literal",value:"'loop'"},{name:"literal",value:"'magnifyingGlass'"},{name:"literal",value:"'marketCap'"},{name:"literal",value:"'medal'"},{name:"literal",value:"'megaphone'"},{name:"literal",value:"'menu'"},{name:"literal",value:"'metaverse'"},{name:"literal",value:"'microphone'"},{name:"literal",value:"'microphoneCordless'"},{name:"literal",value:"'microscope'"},{name:"literal",value:"'mint'"},{name:"literal",value:"'minus'"},{name:"literal",value:"'mma'"},{name:"literal",value:"'moneyCardCoin'"},{name:"literal",value:"'moon'"},{name:"literal",value:"'more'"},{name:"literal",value:"'moreVertical'"},{name:"literal",value:"'motorsport'"},{name:"literal",value:"'music'"},{name:"literal",value:"'musicArticles'"},{name:"literal",value:"'needle'"},{name:"literal",value:"'newsFeed'"},{name:"literal",value:"'newsletter'"},{name:"literal",value:"'nft'"},{name:"literal",value:"'nftBuy'"},{name:"literal",value:"'nftOffer'"},{name:"literal",value:"'nftProduct'"},{name:"literal",value:"'nftSale'"},{name:"literal",value:"'noRocket'"},{name:"literal",value:"'noWifi'"},{name:"literal",value:"'nodeProduct'"},{name:"literal",value:"'oil'"},{name:"literal",value:"'options'"},{name:"literal",value:"'orderBook'"},{name:"literal",value:"'orderHistory'"},{name:"literal",value:"'outline'"},{name:"literal",value:"'pFPS'"},{name:"literal",value:"'paperAirplane'"},{name:"literal",value:"'paperclip'"},{name:"literal",value:"'participate'"},{name:"literal",value:"'participateProduct'"},{name:"literal",value:"'passKey'"},{name:"literal",value:"'passport'"},{name:"literal",value:"'pause'"},{name:"literal",value:"'pay'"},{name:"literal",value:"'payProduct'"},{name:"literal",value:"'paymentCard'"},{name:"literal",value:"'payments'"},{name:"literal",value:"'payouts'"},{name:"literal",value:"'paypal'"},{name:"literal",value:"'pencil'"},{name:"literal",value:"'peopleGroup'"},{name:"literal",value:"'peopleStar'"},{name:"literal",value:"'percentage'"},{name:"literal",value:"'perpetualSwap'"},{name:"literal",value:"'phone'"},{name:"literal",value:"'pieChartData'"},{name:"literal",value:"'pillBottle'"},{name:"literal",value:"'pillCapsule'"},{name:"literal",value:"'pin'"},{name:"literal",value:"'plane'"},{name:"literal",value:"'planet'"},{name:"literal",value:"'play'"},{name:"literal",value:"'playbutton'"},{name:"literal",value:"'plusMinus'"},{name:"literal",value:"'podiumStar'"},{name:"literal",value:"'politicsBuilding'"},{name:"literal",value:"'politicsCandidate'"},{name:"literal",value:"'politicsFlag'"},{name:"literal",value:"'politicsGavel'"},{name:"literal",value:"'politicsPodium'"},{name:"literal",value:"'politicsStar'"},{name:"literal",value:"'powerTool'"},{name:"literal",value:"'priceAlerts'"},{name:"literal",value:"'priceAlertsCheck'"},{name:"literal",value:"'primePoduct'"},{name:"literal",value:"'privateClientProduct'"},{name:"literal",value:"'proProduct'"},{name:"literal",value:"'profile'"},{name:"literal",value:"'protection'"},{name:"literal",value:"'pulse'"},{name:"literal",value:"'pyramid'"},{name:"literal",value:"'qrCode'"},{name:"literal",value:"'qrCodeAlt'"},{name:"literal",value:"'queryTransact'"},{name:"literal",value:"'questionMark'"},{name:"literal",value:"'quotation'"},{name:"literal",value:"'rain'"},{name:"literal",value:"'ratingsCheck'"},{name:"literal",value:"'ratingsChecks'"},{name:"literal",value:"'ratingsStar'"},{name:"literal",value:"'reCenter'"},{name:"literal",value:"'rectangle'"},{name:"literal",value:"'recurring'"},{name:"literal",value:"'refresh'"},{name:"literal",value:"'regulated'"},{name:"literal",value:"'regulatedFutures'"},{name:"literal",value:"'report'"},{name:"literal",value:"'rewardsProduct'"},{name:"literal",value:"'ribbon'"},{name:"literal",value:"'robot'"},{name:"literal",value:"'rocket'"},{name:"literal",value:"'rocketShip'"},{name:"literal",value:"'rollingSpot'"},{name:"literal",value:"'rosettaProduct'"},{name:"literal",value:"'rottenTomato'"},{name:"literal",value:"'royalty'"},{name:"literal",value:"'safe'"},{name:"literal",value:"'save'"},{name:"literal",value:"'savingsBank'"},{name:"literal",value:"'scanQrCode'"},{name:"literal",value:"'scienceAtom'"},{name:"literal",value:"'scienceBeaker'"},{name:"literal",value:"'scienceMoon'"},{name:"literal",value:"'search'"},{name:"literal",value:"'securityKey'"},{name:"literal",value:"'securityShield'"},{name:"literal",value:"'seen'"},{name:"literal",value:"'sendReceive'"},{name:"literal",value:"'setPinCode'"},{name:"literal",value:"'settings'"},{name:"literal",value:"'share'"},{name:"literal",value:"'shield'"},{name:"literal",value:"'shieldOutline'"},{name:"literal",value:"'shoe'"},{name:"literal",value:"'shoppingCart'"},{name:"literal",value:"'signinProduct'"},{name:"literal",value:"'singleCoin'"},{name:"literal",value:"'singleNote'"},{name:"literal",value:"'singlecloud'"},{name:"literal",value:"'smartContract'"},{name:"literal",value:"'snow'"},{name:"literal",value:"'soccer'"},{name:"literal",value:"'socialChat'"},{name:"literal",value:"'socialReshare'"},{name:"literal",value:"'socialShare'"},{name:"literal",value:"'sofort'"},{name:"literal",value:"'sortDoubleArrow'"},{name:"literal",value:"'sortDown'"},{name:"literal",value:"'sortDownCenter'"},{name:"literal",value:"'sortUp'"},{name:"literal",value:"'sortUpCenter'"},{name:"literal",value:"'soundOff'"},{name:"literal",value:"'soundOn'"},{name:"literal",value:"'sparkle'"},{name:"literal",value:"'speaker'"},{name:"literal",value:"'speechBubble'"},{name:"literal",value:"'stableCoin'"},{name:"literal",value:"'stablecoinStack'"},{name:"literal",value:"'staggeredList'"},{name:"literal",value:"'stake'"},{name:"literal",value:"'staking'"},{name:"literal",value:"'star'"},{name:"literal",value:"'starAward'"},{name:"literal",value:"'starBubble'"},{name:"literal",value:"'starTrophy'"},{name:"literal",value:"'statusDot'"},{name:"literal",value:"'step0'"},{name:"literal",value:"'step1'"},{name:"literal",value:"'step2'"},{name:"literal",value:"'step3'"},{name:"literal",value:"'step4'"},{name:"literal",value:"'step5'"},{name:"literal",value:"'step6'"},{name:"literal",value:"'step7'"},{name:"literal",value:"'step8'"},{name:"literal",value:"'step9'"},{name:"literal",value:"'strategy'"},{name:"literal",value:"'sun'"},{name:"literal",value:"'support'"},{name:"literal",value:"'tag'"},{name:"literal",value:"'taxes'"},{name:"literal",value:"'taxesReceipt'"},{name:"literal",value:"'telephone'"},{name:"literal",value:"'tennis'"},{name:"literal",value:"'test'"},{name:"literal",value:"'thermometer'"},{name:"literal",value:"'thumbsDown'"},{name:"literal",value:"'thumbsDownOutline'"},{name:"literal",value:"'thumbsUp'"},{name:"literal",value:"'thumbsUpOutline'"},{name:"literal",value:"'tokenLaunchCoin'"},{name:"literal",value:"'tokenLaunchRocket'"},{name:"literal",value:"'tokenSales'"},{name:"literal",value:"'tornado'"},{name:"literal",value:"'trading'"},{name:"literal",value:"'transactions'"},{name:"literal",value:"'trashCan'"},{name:"literal",value:"'trophy'"},{name:"literal",value:"'trophyCup'"},{name:"literal",value:"'tshirt'"},{name:"literal",value:"'tv'"},{name:"literal",value:"'tvStand'"},{name:"literal",value:"'twitterLogo'"},{name:"literal",value:"'ultility'"},{name:"literal",value:"'umbrella'"},{name:"literal",value:"'undo'"},{name:"literal",value:"'unfollowPeople'"},{name:"literal",value:"'unknown'"},{name:"literal",value:"'unlock'"},{name:"literal",value:"'upArrow'"},{name:"literal",value:"'upload'"},{name:"literal",value:"'venturesProduct'"},{name:"literal",value:"'verifiedBadge'"},{name:"literal",value:"'verifiedPools'"},{name:"literal",value:"'verticalLine'"},{name:"literal",value:"'virus'"},{name:"literal",value:"'visible'"},{name:"literal",value:"'waasProduct'"},{name:"literal",value:"'wallet'"},{name:"literal",value:"'walletLogo'"},{name:"literal",value:"'walletProduct'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'webhooks'"},{name:"literal",value:"'wellness'"},{name:"literal",value:"'wifi'"},{name:"literal",value:"'wind'"},{name:"literal",value:"'wireTransfer'"},{name:"literal",value:"'withdraw'"},{name:"literal",value:"'wrapToken'"},{name:"literal",value:"'xLogo'"}],required:!0},description:"Icon to render at the end of the button."},{key:"endIconActive",value:{name:"boolean",required:!1},description:"Whether the end icon is active"},{key:"flush",value:{name:"union",raw:"'start' | 'end'",elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'end'"}],required:!1},description:`Ensure the button aligns flush on the left or right.
This prop will translate the entire button left/right,
so take care to ensure it is not overflowing awkwardly`},{key:"name",value:{name:"string",required:!1},description:"Uniquely identify the button within a form."},{key:"noScaleOnPress",value:{name:"boolean",required:!1},description:"Don't scale element on press."},{key:"numberOfLines",value:{name:"number",required:!1},description:`Truncates text after wrapping to a defined number of lines.
@default 1`}]}}]}],raw:`Polymorphic.ExtendableProps<
  PressableBaseProps,
  SharedProps &
    Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
      /**
       * Toggle design and visual variants.
       * @default primary
       */
      variant?: ButtonVariant;
      /** Mark the button as disabled. */
      disabled?: boolean;
      /** Mark the button as loading and display a spinner. */
      loading?: boolean;
      /** Mark the background and border as transparent until interacted with. */
      transparent?: boolean;
      /** Change to block and expand to 100% of parent width. */
      block?: boolean;
      /** Reduce the inner padding within the button itself. */
      compact?: boolean;
      /** Children to render within the button. */
      children: React.ReactNode;
      /** Set the start node */
      start?: React.ReactNode;
      /** Icon to render at the start of the button. */
      startIcon?: IconName;
      /** Whether the start icon is active */
      startIconActive?: boolean;
      /** Set the end node */
      end?: React.ReactNode;
      /** Icon to render at the end of the button. */
      endIcon?: IconName;
      /** Whether the end icon is active */
      endIconActive?: boolean;
      /** Ensure the button aligns flush on the left or right.
       * This prop will translate the entire button left/right,
       * so take care to ensure it is not overflowing awkwardly
       */
      flush?: 'start' | 'end';
      /** Uniquely identify the button within a form. */
      name?: string;
      /** Don't scale element on press. */
      noScaleOnPress?: boolean;
      /**
       * Truncates text after wrapping to a defined number of lines.
       * @default 1
       */
      numberOfLines?: number;
    }
>`},{name:"union",raw:"'disabled' | 'transparent' | 'compact' | 'flush'",elements:[{name:"literal",value:"'disabled'"},{name:"literal",value:"'transparent'"},{name:"literal",value:"'compact'"},{name:"literal",value:"'flush'"}]}],raw:"Pick<ButtonBaseProps, 'disabled' | 'transparent' | 'compact' | 'flush'>"},{name:"signature",type:"object",raw:`{
  /** Name of the icon, as defined in Figma. */
  name: IconName;
  /** Whether the icon is active */
  active?: boolean;
  /**
   * Toggle design and visual variants.
   * @default primary
   */
  variant?: IconButtonVariant;
}`,signature:{properties:[{key:"name",value:{name:"union",raw:`| 'account'
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
| 'xLogo'`,elements:[{name:"literal",value:"'account'"},{name:"literal",value:"'activity'"},{name:"literal",value:"'add'"},{name:"literal",value:"'addPeople'"},{name:"literal",value:"'advancedMarketSelector'"},{name:"literal",value:"'advancedTradeProduct'"},{name:"literal",value:"'affiliates'"},{name:"literal",value:"'airdrop'"},{name:"literal",value:"'airdropAlt'"},{name:"literal",value:"'airdropCoins'"},{name:"literal",value:"'airdropParachute'"},{name:"literal",value:"'alien'"},{name:"literal",value:"'allTimeHigh'"},{name:"literal",value:"'allocation'"},{name:"literal",value:"'annotation'"},{name:"literal",value:"'api'"},{name:"literal",value:"'apiPlug'"},{name:"literal",value:"'apothecary'"},{name:"literal",value:"'appSwitcher'"},{name:"literal",value:"'apple'"},{name:"literal",value:"'appleLogo'"},{name:"literal",value:"'application'"},{name:"literal",value:"'arrowDown'"},{name:"literal",value:"'arrowLeft'"},{name:"literal",value:"'arrowRight'"},{name:"literal",value:"'arrowUp'"},{name:"literal",value:"'arrowsHorizontal'"},{name:"literal",value:"'arrowsUpDown'"},{name:"literal",value:"'arrowsVertical'"},{name:"literal",value:"'artwork'"},{name:"literal",value:"'assetHubProduct'"},{name:"literal",value:"'assetManagementProduct'"},{name:"literal",value:"'astronautHelmet'"},{name:"literal",value:"'atSign'"},{name:"literal",value:"'atomScience'"},{name:"literal",value:"'auto'"},{name:"literal",value:"'autoCar'"},{name:"literal",value:"'avatar'"},{name:"literal",value:"'average'"},{name:"literal",value:"'backArrow'"},{name:"literal",value:"'ballot'"},{name:"literal",value:"'ballotbox'"},{name:"literal",value:"'bandage'"},{name:"literal",value:"'bank'"},{name:"literal",value:"'barChartSimple'"},{name:"literal",value:"'barChartWindow'"},{name:"literal",value:"'base'"},{name:"literal",value:"'baseApps'"},{name:"literal",value:"'baseFeed'"},{name:"literal",value:"'baseNotification'"},{name:"literal",value:"'baseQuickBuy'"},{name:"literal",value:"'baseSquare'"},{name:"literal",value:"'baseTransact'"},{name:"literal",value:"'baseVerification'"},{name:"literal",value:"'baseWallet'"},{name:"literal",value:"'baseball'"},{name:"literal",value:"'basketball'"},{name:"literal",value:"'beaker'"},{name:"literal",value:"'beginningArrow'"},{name:"literal",value:"'bell'"},{name:"literal",value:"'bellCheck'"},{name:"literal",value:"'bellPlus'"},{name:"literal",value:"'birthcertificate'"},{name:"literal",value:"'block'"},{name:"literal",value:"'blockchain'"},{name:"literal",value:"'blog'"},{name:"literal",value:"'book'"},{name:"literal",value:"'bookmark'"},{name:"literal",value:"'borrowProduct'"},{name:"literal",value:"'boxing'"},{name:"literal",value:"'bridging'"},{name:"literal",value:"'briefcase'"},{name:"literal",value:"'briefcaseAlt'"},{name:"literal",value:"'browser'"},{name:"literal",value:"'bug'"},{name:"literal",value:"'building'"},{name:"literal",value:"'calculator'"},{name:"literal",value:"'calendar'"},{name:"literal",value:"'calendarBlank'"},{name:"literal",value:"'calendarDates'"},{name:"literal",value:"'calendarEmpty'"},{name:"literal",value:"'calendarHeart'"},{name:"literal",value:"'calendarMoney'"},{name:"literal",value:"'calendarStar'"},{name:"literal",value:"'camera'"},{name:"literal",value:"'candlesticks'"},{name:"literal",value:"'car'"},{name:"literal",value:"'card'"},{name:"literal",value:"'caret'"},{name:"literal",value:"'caretDown'"},{name:"literal",value:"'caretLeft'"},{name:"literal",value:"'caretRight'"},{name:"literal",value:"'caretUp'"},{name:"literal",value:"'cash'"},{name:"literal",value:"'cashAustralianDollar'"},{name:"literal",value:"'cashBrazilianReal'"},{name:"literal",value:"'cashBrazillianReal'"},{name:"literal",value:"'cashCanadianDollar'"},{name:"literal",value:"'cashCoins'"},{name:"literal",value:"'cashEUR'"},{name:"literal",value:"'cashGBP'"},{name:"literal",value:"'cashIndonesianRupiah'"},{name:"literal",value:"'cashJPY'"},{name:"literal",value:"'cashPhilippinePeso'"},{name:"literal",value:"'cashPolishZloty'"},{name:"literal",value:"'cashRupee'"},{name:"literal",value:"'cashSingaporeDollar'"},{name:"literal",value:"'cashSwissFranc'"},{name:"literal",value:"'cashThaiBaht'"},{name:"literal",value:"'cashTurkishLira'"},{name:"literal",value:"'cashUSD'"},{name:"literal",value:"'cashUaeDirham'"},{name:"literal",value:"'cashVietnameseDong'"},{name:"literal",value:"'chainLink'"},{name:"literal",value:"'chartBar'"},{name:"literal",value:"'chartCandles'"},{name:"literal",value:"'chartLine'"},{name:"literal",value:"'chartPie'"},{name:"literal",value:"'chartPieCircle'"},{name:"literal",value:"'chartVolume'"},{name:"literal",value:"'chatBotAgent'"},{name:"literal",value:"'chatBubble'"},{name:"literal",value:"'chatRequests'"},{name:"literal",value:"'checkboxChecked'"},{name:"literal",value:"'checkboxEmpty'"},{name:"literal",value:"'checkmark'"},{name:"literal",value:"'chess'"},{name:"literal",value:"'circleCheckmark'"},{name:"literal",value:"'circleCross'"},{name:"literal",value:"'circulatingSupply'"},{name:"literal",value:"'city'"},{name:"literal",value:"'clipboard'"},{name:"literal",value:"'clock'"},{name:"literal",value:"'clockOutline'"},{name:"literal",value:"'close'"},{name:"literal",value:"'closeCaption'"},{name:"literal",value:"'clothing'"},{name:"literal",value:"'cloud'"},{name:"literal",value:"'cloudPartial'"},{name:"literal",value:"'cloudProduct'"},{name:"literal",value:"'cluster'"},{name:"literal",value:"'coinbase'"},{name:"literal",value:"'coinbaseCardProduct'"},{name:"literal",value:"'coinbaseOne'"},{name:"literal",value:"'coinbaseOneCard'"},{name:"literal",value:"'coinbaseOneLogo'"},{name:"literal",value:"'coinbaseRewards'"},{name:"literal",value:"'coinsCrypto'"},{name:"literal",value:"'collapse'"},{name:"literal",value:"'collectibles'"},{name:"literal",value:"'collection'"},{name:"literal",value:"'comment'"},{name:"literal",value:"'commentPlus'"},{name:"literal",value:"'commerceProduct'"},{name:"literal",value:"'compass'"},{name:"literal",value:"'complianceProduct'"},{name:"literal",value:"'compose'"},{name:"literal",value:"'computerChip'"},{name:"literal",value:"'concierge'"},{name:"literal",value:"'conciergeBell'"},{name:"literal",value:"'config'"},{name:"literal",value:"'continuous'"},{name:"literal",value:"'convert'"},{name:"literal",value:"'copy'"},{name:"literal",value:"'corporation'"},{name:"literal",value:"'creatorCoin'"},{name:"literal",value:"'cricket'"},{name:"literal",value:"'cross'"},{name:"literal",value:"'crossTrade'"},{name:"literal",value:"'crypto'"},{name:"literal",value:"'cryptobasics'"},{name:"literal",value:"'crystalBall'"},{name:"literal",value:"'crystalBallInsight'"},{name:"literal",value:"'currencies'"},{name:"literal",value:"'custodyProduct'"},{name:"literal",value:"'dashboard'"},{name:"literal",value:"'dataMarketplaceProduct'"},{name:"literal",value:"'dataStack'"},{name:"literal",value:"'defi'"},{name:"literal",value:"'delegateProduct'"},{name:"literal",value:"'deposit'"},{name:"literal",value:"'derivatives'"},{name:"literal",value:"'derivativesProduct'"},{name:"literal",value:"'derivativesProductNew'"},{name:"literal",value:"'developerAPIProduct'"},{name:"literal",value:"'developerPlatformProduct'"},{name:"literal",value:"'dex'"},{name:"literal",value:"'diagonalDownArrow'"},{name:"literal",value:"'diagonalRightArrow'"},{name:"literal",value:"'diagonalUpArrow'"},{name:"literal",value:"'diamond'"},{name:"literal",value:"'diamondIncentives'"},{name:"literal",value:"'dinnerPlate'"},{name:"literal",value:"'directDeposit'"},{name:"literal",value:"'directDepositIcon'"},{name:"literal",value:"'disabledPhone'"},{name:"literal",value:"'discordLogo'"},{name:"literal",value:"'distribution'"},{name:"literal",value:"'document'"},{name:"literal",value:"'documentation'"},{name:"literal",value:"'dot'"},{name:"literal",value:"'doubleChevronRight'"},{name:"literal",value:"'downArrow'"},{name:"literal",value:"'download'"},{name:"literal",value:"'drag'"},{name:"literal",value:"'drops'"},{name:"literal",value:"'earn'"},{name:"literal",value:"'earnProduct'"},{name:"literal",value:"'earnRewards'"},{name:"literal",value:"'earthquake'"},{name:"literal",value:"'educationBook'"},{name:"literal",value:"'educationPencil'"},{name:"literal",value:"'email'"},{name:"literal",value:"'endArrow'"},{name:"literal",value:"'entertainment'"},{name:"literal",value:"'error'"},{name:"literal",value:"'ethereum'"},{name:"literal",value:"'eventContracts'"},{name:"literal",value:"'exchangeProduct'"},{name:"literal",value:"'exclamationMark'"},{name:"literal",value:"'expand'"},{name:"literal",value:"'expandAddress'"},{name:"literal",value:"'expandAll'"},{name:"literal",value:"'externalLink'"},{name:"literal",value:"'eye'"},{name:"literal",value:"'faceScan'"},{name:"literal",value:"'faces'"},{name:"literal",value:"'factory'"},{name:"literal",value:"'faucet'"},{name:"literal",value:"'fib'"},{name:"literal",value:"'filmStrip'"},{name:"literal",value:"'filter'"},{name:"literal",value:"'fingerprint'"},{name:"literal",value:"'flame'"},{name:"literal",value:"'folder'"},{name:"literal",value:"'folderArrow'"},{name:"literal",value:"'folderOpen'"},{name:"literal",value:"'followAdd'"},{name:"literal",value:"'following'"},{name:"literal",value:"'football'"},{name:"literal",value:"'fork'"},{name:"literal",value:"'forwardArrow'"},{name:"literal",value:"'fscsProtection'"},{name:"literal",value:"'gab'"},{name:"literal",value:"'games'"},{name:"literal",value:"'gaming'"},{name:"literal",value:"'gasFees'"},{name:"literal",value:"'gasFeesAlt'"},{name:"literal",value:"'gauge'"},{name:"literal",value:"'gaugeEmpty'"},{name:"literal",value:"'gaugeHigh'"},{name:"literal",value:"'gaugeHighLow'"},{name:"literal",value:"'gaugeHighMid'"},{name:"literal",value:"'gaugeLow'"},{name:"literal",value:"'gaugeLowHigh'"},{name:"literal",value:"'gaugeLowMid'"},{name:"literal",value:"'gaugeMedium'"},{name:"literal",value:"'gavel'"},{name:"literal",value:"'gear'"},{name:"literal",value:"'generalCharacter'"},{name:"literal",value:"'ghost'"},{name:"literal",value:"'gif'"},{name:"literal",value:"'giftBox'"},{name:"literal",value:"'giftCard'"},{name:"literal",value:"'gitHubLogo'"},{name:"literal",value:"'globe'"},{name:"literal",value:"'golf'"},{name:"literal",value:"'googleLogo'"},{name:"literal",value:"'greenEnergy'"},{name:"literal",value:"'grid'"},{name:"literal",value:"'group'"},{name:"literal",value:"'hamburger'"},{name:"literal",value:"'hammer'"},{name:"literal",value:"'heart'"},{name:"literal",value:"'helpCenterProduct'"},{name:"literal",value:"'helpCenterQuestionMark'"},{name:"literal",value:"'hiddenEye'"},{name:"literal",value:"'hockey'"},{name:"literal",value:"'home'"},{name:"literal",value:"'horizontalLine'"},{name:"literal",value:"'hospital'"},{name:"literal",value:"'hospitalCross'"},{name:"literal",value:"'hurricane'"},{name:"literal",value:"'ideal'"},{name:"literal",value:"'identityCard'"},{name:"literal",value:"'image'"},{name:"literal",value:"'info'"},{name:"literal",value:"'initiator'"},{name:"literal",value:"'instagramLogo'"},{name:"literal",value:"'instantUnstakingClock'"},{name:"literal",value:"'institute'"},{name:"literal",value:"'institutionalProduct'"},{name:"literal",value:"'interest'"},{name:"literal",value:"'invisible'"},{name:"literal",value:"'invoice'"},{name:"literal",value:"'key'"},{name:"literal",value:"'keyboard'"},{name:"literal",value:"'laptop'"},{name:"literal",value:"'leadChart'"},{name:"literal",value:"'leadCoin'"},{name:"literal",value:"'learningRewardsProduct'"},{name:"literal",value:"'light'"},{name:"literal",value:"'lightbulb'"},{name:"literal",value:"'lightning'"},{name:"literal",value:"'lightningBolt'"},{name:"literal",value:"'lineChartCrypto'"},{name:"literal",value:"'list'"},{name:"literal",value:"'location'"},{name:"literal",value:"'lock'"},{name:"literal",value:"'login'"},{name:"literal",value:"'logout'"},{name:"literal",value:"'loop'"},{name:"literal",value:"'magnifyingGlass'"},{name:"literal",value:"'marketCap'"},{name:"literal",value:"'medal'"},{name:"literal",value:"'megaphone'"},{name:"literal",value:"'menu'"},{name:"literal",value:"'metaverse'"},{name:"literal",value:"'microphone'"},{name:"literal",value:"'microphoneCordless'"},{name:"literal",value:"'microscope'"},{name:"literal",value:"'mint'"},{name:"literal",value:"'minus'"},{name:"literal",value:"'mma'"},{name:"literal",value:"'moneyCardCoin'"},{name:"literal",value:"'moon'"},{name:"literal",value:"'more'"},{name:"literal",value:"'moreVertical'"},{name:"literal",value:"'motorsport'"},{name:"literal",value:"'music'"},{name:"literal",value:"'musicArticles'"},{name:"literal",value:"'needle'"},{name:"literal",value:"'newsFeed'"},{name:"literal",value:"'newsletter'"},{name:"literal",value:"'nft'"},{name:"literal",value:"'nftBuy'"},{name:"literal",value:"'nftOffer'"},{name:"literal",value:"'nftProduct'"},{name:"literal",value:"'nftSale'"},{name:"literal",value:"'noRocket'"},{name:"literal",value:"'noWifi'"},{name:"literal",value:"'nodeProduct'"},{name:"literal",value:"'oil'"},{name:"literal",value:"'options'"},{name:"literal",value:"'orderBook'"},{name:"literal",value:"'orderHistory'"},{name:"literal",value:"'outline'"},{name:"literal",value:"'pFPS'"},{name:"literal",value:"'paperAirplane'"},{name:"literal",value:"'paperclip'"},{name:"literal",value:"'participate'"},{name:"literal",value:"'participateProduct'"},{name:"literal",value:"'passKey'"},{name:"literal",value:"'passport'"},{name:"literal",value:"'pause'"},{name:"literal",value:"'pay'"},{name:"literal",value:"'payProduct'"},{name:"literal",value:"'paymentCard'"},{name:"literal",value:"'payments'"},{name:"literal",value:"'payouts'"},{name:"literal",value:"'paypal'"},{name:"literal",value:"'pencil'"},{name:"literal",value:"'peopleGroup'"},{name:"literal",value:"'peopleStar'"},{name:"literal",value:"'percentage'"},{name:"literal",value:"'perpetualSwap'"},{name:"literal",value:"'phone'"},{name:"literal",value:"'pieChartData'"},{name:"literal",value:"'pillBottle'"},{name:"literal",value:"'pillCapsule'"},{name:"literal",value:"'pin'"},{name:"literal",value:"'plane'"},{name:"literal",value:"'planet'"},{name:"literal",value:"'play'"},{name:"literal",value:"'playbutton'"},{name:"literal",value:"'plusMinus'"},{name:"literal",value:"'podiumStar'"},{name:"literal",value:"'politicsBuilding'"},{name:"literal",value:"'politicsCandidate'"},{name:"literal",value:"'politicsFlag'"},{name:"literal",value:"'politicsGavel'"},{name:"literal",value:"'politicsPodium'"},{name:"literal",value:"'politicsStar'"},{name:"literal",value:"'powerTool'"},{name:"literal",value:"'priceAlerts'"},{name:"literal",value:"'priceAlertsCheck'"},{name:"literal",value:"'primePoduct'"},{name:"literal",value:"'privateClientProduct'"},{name:"literal",value:"'proProduct'"},{name:"literal",value:"'profile'"},{name:"literal",value:"'protection'"},{name:"literal",value:"'pulse'"},{name:"literal",value:"'pyramid'"},{name:"literal",value:"'qrCode'"},{name:"literal",value:"'qrCodeAlt'"},{name:"literal",value:"'queryTransact'"},{name:"literal",value:"'questionMark'"},{name:"literal",value:"'quotation'"},{name:"literal",value:"'rain'"},{name:"literal",value:"'ratingsCheck'"},{name:"literal",value:"'ratingsChecks'"},{name:"literal",value:"'ratingsStar'"},{name:"literal",value:"'reCenter'"},{name:"literal",value:"'rectangle'"},{name:"literal",value:"'recurring'"},{name:"literal",value:"'refresh'"},{name:"literal",value:"'regulated'"},{name:"literal",value:"'regulatedFutures'"},{name:"literal",value:"'report'"},{name:"literal",value:"'rewardsProduct'"},{name:"literal",value:"'ribbon'"},{name:"literal",value:"'robot'"},{name:"literal",value:"'rocket'"},{name:"literal",value:"'rocketShip'"},{name:"literal",value:"'rollingSpot'"},{name:"literal",value:"'rosettaProduct'"},{name:"literal",value:"'rottenTomato'"},{name:"literal",value:"'royalty'"},{name:"literal",value:"'safe'"},{name:"literal",value:"'save'"},{name:"literal",value:"'savingsBank'"},{name:"literal",value:"'scanQrCode'"},{name:"literal",value:"'scienceAtom'"},{name:"literal",value:"'scienceBeaker'"},{name:"literal",value:"'scienceMoon'"},{name:"literal",value:"'search'"},{name:"literal",value:"'securityKey'"},{name:"literal",value:"'securityShield'"},{name:"literal",value:"'seen'"},{name:"literal",value:"'sendReceive'"},{name:"literal",value:"'setPinCode'"},{name:"literal",value:"'settings'"},{name:"literal",value:"'share'"},{name:"literal",value:"'shield'"},{name:"literal",value:"'shieldOutline'"},{name:"literal",value:"'shoe'"},{name:"literal",value:"'shoppingCart'"},{name:"literal",value:"'signinProduct'"},{name:"literal",value:"'singleCoin'"},{name:"literal",value:"'singleNote'"},{name:"literal",value:"'singlecloud'"},{name:"literal",value:"'smartContract'"},{name:"literal",value:"'snow'"},{name:"literal",value:"'soccer'"},{name:"literal",value:"'socialChat'"},{name:"literal",value:"'socialReshare'"},{name:"literal",value:"'socialShare'"},{name:"literal",value:"'sofort'"},{name:"literal",value:"'sortDoubleArrow'"},{name:"literal",value:"'sortDown'"},{name:"literal",value:"'sortDownCenter'"},{name:"literal",value:"'sortUp'"},{name:"literal",value:"'sortUpCenter'"},{name:"literal",value:"'soundOff'"},{name:"literal",value:"'soundOn'"},{name:"literal",value:"'sparkle'"},{name:"literal",value:"'speaker'"},{name:"literal",value:"'speechBubble'"},{name:"literal",value:"'stableCoin'"},{name:"literal",value:"'stablecoinStack'"},{name:"literal",value:"'staggeredList'"},{name:"literal",value:"'stake'"},{name:"literal",value:"'staking'"},{name:"literal",value:"'star'"},{name:"literal",value:"'starAward'"},{name:"literal",value:"'starBubble'"},{name:"literal",value:"'starTrophy'"},{name:"literal",value:"'statusDot'"},{name:"literal",value:"'step0'"},{name:"literal",value:"'step1'"},{name:"literal",value:"'step2'"},{name:"literal",value:"'step3'"},{name:"literal",value:"'step4'"},{name:"literal",value:"'step5'"},{name:"literal",value:"'step6'"},{name:"literal",value:"'step7'"},{name:"literal",value:"'step8'"},{name:"literal",value:"'step9'"},{name:"literal",value:"'strategy'"},{name:"literal",value:"'sun'"},{name:"literal",value:"'support'"},{name:"literal",value:"'tag'"},{name:"literal",value:"'taxes'"},{name:"literal",value:"'taxesReceipt'"},{name:"literal",value:"'telephone'"},{name:"literal",value:"'tennis'"},{name:"literal",value:"'test'"},{name:"literal",value:"'thermometer'"},{name:"literal",value:"'thumbsDown'"},{name:"literal",value:"'thumbsDownOutline'"},{name:"literal",value:"'thumbsUp'"},{name:"literal",value:"'thumbsUpOutline'"},{name:"literal",value:"'tokenLaunchCoin'"},{name:"literal",value:"'tokenLaunchRocket'"},{name:"literal",value:"'tokenSales'"},{name:"literal",value:"'tornado'"},{name:"literal",value:"'trading'"},{name:"literal",value:"'transactions'"},{name:"literal",value:"'trashCan'"},{name:"literal",value:"'trophy'"},{name:"literal",value:"'trophyCup'"},{name:"literal",value:"'tshirt'"},{name:"literal",value:"'tv'"},{name:"literal",value:"'tvStand'"},{name:"literal",value:"'twitterLogo'"},{name:"literal",value:"'ultility'"},{name:"literal",value:"'umbrella'"},{name:"literal",value:"'undo'"},{name:"literal",value:"'unfollowPeople'"},{name:"literal",value:"'unknown'"},{name:"literal",value:"'unlock'"},{name:"literal",value:"'upArrow'"},{name:"literal",value:"'upload'"},{name:"literal",value:"'venturesProduct'"},{name:"literal",value:"'verifiedBadge'"},{name:"literal",value:"'verifiedPools'"},{name:"literal",value:"'verticalLine'"},{name:"literal",value:"'virus'"},{name:"literal",value:"'visible'"},{name:"literal",value:"'waasProduct'"},{name:"literal",value:"'wallet'"},{name:"literal",value:"'walletLogo'"},{name:"literal",value:"'walletProduct'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'webhooks'"},{name:"literal",value:"'wellness'"},{name:"literal",value:"'wifi'"},{name:"literal",value:"'wind'"},{name:"literal",value:"'wireTransfer'"},{name:"literal",value:"'withdraw'"},{name:"literal",value:"'wrapToken'"},{name:"literal",value:"'xLogo'"}],required:!0},description:"Name of the icon, as defined in Figma."},{key:"active",value:{name:"boolean",required:!1},description:"Whether the icon is active"},{key:"variant",value:{name:"union",raw:`| 'primary'
| 'secondary'
| 'tertiary'
| 'positive'
| 'negative'
| 'foregroundMuted'`,elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"},{name:"literal",value:"'tertiary'"},{name:"literal",value:"'positive'"},{name:"literal",value:"'negative'"},{name:"literal",value:"'foregroundMuted'"}],required:!1},description:`Toggle design and visual variants.
@default primary`}]}}]}],raw:`Polymorphic.ExtendableProps<
  Omit<PressableBaseProps, 'children'>,
  Pick<ButtonBaseProps, 'disabled' | 'transparent' | 'compact' | 'flush'> & {
    /** Name of the icon, as defined in Figma. */
    name: IconName;
    /** Whether the icon is active */
    active?: boolean;
    /**
     * Toggle design and visual variants.
     * @default primary
     */
    variant?: IconButtonVariant;
  }
>`},{name:"literal",value:"'name'"}],raw:"Omit<IconButtonBaseProps, 'name'>"},description:""},share:{required:!1,tsType:{name:"Omit",elements:[{name:"Polymorphic.ExtendableProps",elements:[{name:"Omit",elements:[{name:"Polymorphic.ExtendableProps",elements:[{name:"Polymorphic.ExtendableProps",elements:[{name:"intersection",raw:`StyleProps &
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
  /** Apply class names to the outer container. */
  className?: string;
  /** Background color of the overlay (element being interacted with). */
  background?: ThemeVars.Color;
  /** Set element to block and expand to 100% width. */
  block?: boolean;
  /** Border color of the element. */
  borderColor?: ThemeVars.Color;
  /** Is the element currently disabled. */
  disabled?: boolean;
  /**
   * Is the element currenty loading.
   * When set to true, will disable element from press and keyboard events
   */
  loading?: boolean;
  /** Is the element being pressed. Primarily a mobile feature, but can be used on the web. */
  pressed?: boolean;
  /**
   * Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
   * Must be used in conjunction with the "pressed" prop
   */
  transparentWhileInactive?: boolean;
  /**
   * Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
   * Must be used in conjunction with the "pressed" prop
   */
  transparentWhilePressed?: boolean;
  blendStyles?: InteractableBlendStyles;
}`,signature:{properties:[{key:"className",value:{name:"string",required:!1},description:"Apply class names to the outer container."},{key:"background",value:{name:"ThemeVars.Color",required:!1},description:"Background color of the overlay (element being interacted with)."},{key:"block",value:{name:"boolean",required:!1},description:"Set element to block and expand to 100% width."},{key:"borderColor",value:{name:"ThemeVars.Color",required:!1},description:"Border color of the element."},{key:"disabled",value:{name:"boolean",required:!1},description:"Is the element currently disabled."},{key:"loading",value:{name:"boolean",required:!1},description:`Is the element currenty loading.
When set to true, will disable element from press and keyboard events`},{key:"pressed",value:{name:"boolean",required:!1},description:"Is the element being pressed. Primarily a mobile feature, but can be used on the web."},{key:"transparentWhileInactive",value:{name:"boolean",required:!1},description:`Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
Must be used in conjunction with the "pressed" prop`},{key:"transparentWhilePressed",value:{name:"boolean",required:!1},description:`Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
Must be used in conjunction with the "pressed" prop`},{key:"blendStyles",value:{name:"signature",type:"object",raw:`{
  background?: string;
  pressedBackground?: string;
  disabledBackground?: string;
  hoveredBackground?: string;
  borderColor?: string;
  pressedBorderColor?: string;
  disabledBorderColor?: string;
  hoveredBorderColor?: string;
  /**
   * The opacity of the element when hovered.
   * @default 0.88
   */
  hoveredOpacity?: number;
  /**
   * The opacity of the element when pressed.
   * @default 0.82
   */
  pressedOpacity?: number;
  /**
   * The opacity of the element when disabled.
   * @default 0.75
   */
  disabledOpacity?: number;
}`,signature:{properties:[{key:"background",value:{name:"string",required:!1}},{key:"pressedBackground",value:{name:"string",required:!1}},{key:"disabledBackground",value:{name:"string",required:!1}},{key:"hoveredBackground",value:{name:"string",required:!1}},{key:"borderColor",value:{name:"string",required:!1}},{key:"pressedBorderColor",value:{name:"string",required:!1}},{key:"disabledBorderColor",value:{name:"string",required:!1}},{key:"hoveredBorderColor",value:{name:"string",required:!1}},{key:"hoveredOpacity",value:{name:"number",required:!1},description:`The opacity of the element when hovered.
@default 0.88`},{key:"pressedOpacity",value:{name:"number",required:!1},description:`The opacity of the element when pressed.
@default 0.82`},{key:"disabledOpacity",value:{name:"number",required:!1},description:`The opacity of the element when disabled.
@default 0.75`}]},required:!1}}]}}],raw:`Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    /** Apply class names to the outer container. */
    className?: string;
    /** Background color of the overlay (element being interacted with). */
    background?: ThemeVars.Color;
    /** Set element to block and expand to 100% width. */
    block?: boolean;
    /** Border color of the element. */
    borderColor?: ThemeVars.Color;
    /** Is the element currently disabled. */
    disabled?: boolean;
    /**
     * Is the element currenty loading.
     * When set to true, will disable element from press and keyboard events
     */
    loading?: boolean;
    /** Is the element being pressed. Primarily a mobile feature, but can be used on the web. */
    pressed?: boolean;
    /**
     * Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
     * Must be used in conjunction with the "pressed" prop
     */
    transparentWhileInactive?: boolean;
    /**
     * Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
     * Must be used in conjunction with the "pressed" prop
     */
    transparentWhilePressed?: boolean;
    blendStyles?: InteractableBlendStyles;
  }
>`},{name:"intersection",raw:`ComponentEventHandlerProps & {
  /** Dont scale element on press. */
  noScaleOnPress?: boolean;
  focusable?: boolean;
}`,elements:[{name:"signature",type:"object",raw:`{
  eventConfig?: EventHandlerCustomConfig;
  analyticsId?: string;
}`,signature:{properties:[{key:"eventConfig",value:{name:"signature",type:"object",raw:`{
  actions: EventHandlerAction[];
  componentName: string;
  data?: EventCustomData;
}`,signature:{properties:[{key:"actions",value:{name:"Array",elements:[{name:"string"}],raw:"EventHandlerAction[]",required:!0}},{key:"componentName",value:{name:"string",required:!0}},{key:"data",value:{name:"Record",elements:[{name:"string"},{name:"union",raw:"T | Record<string, T>",elements:[{name:"union",raw:"EventDataEntryTypes | EventDataEntryTypes[]",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]},{name:"Array",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]}],raw:"EventDataEntryTypes[]"}]},{name:"Record",elements:[{name:"string"},{name:"union",raw:"EventDataEntryTypes | EventDataEntryTypes[]",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]},{name:"Array",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]}],raw:"EventDataEntryTypes[]"}]}],raw:"Record<string, T>"}]}],raw:"Record<string, RecursiveMapType<EventDataEntry>>",required:!1}}]},required:!1}},{key:"analyticsId",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
  /** Dont scale element on press. */
  noScaleOnPress?: boolean;
  focusable?: boolean;
}`,signature:{properties:[{key:"noScaleOnPress",value:{name:"boolean",required:!1},description:"Dont scale element on press."},{key:"focusable",value:{name:"boolean",required:!1}}]}}]}],raw:`Polymorphic.ExtendableProps<
  InteractableBaseProps,
  ComponentEventHandlerProps & {
    /** Dont scale element on press. */
    noScaleOnPress?: boolean;
    focusable?: boolean;
  }
>`},{name:"literal",value:"'children'"}],raw:"Omit<PressableBaseProps, 'children'>"},{name:"intersection",raw:`Pick<ButtonBaseProps, 'disabled' | 'transparent' | 'compact' | 'flush'> & {
  /** Name of the icon, as defined in Figma. */
  name: IconName;
  /** Whether the icon is active */
  active?: boolean;
  /**
   * Toggle design and visual variants.
   * @default primary
   */
  variant?: IconButtonVariant;
}`,elements:[{name:"Pick",elements:[{name:"Polymorphic.ExtendableProps",elements:[{name:"Polymorphic.ExtendableProps",elements:[{name:"Polymorphic.ExtendableProps",elements:[{name:"intersection",raw:`StyleProps &
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
  /** Apply class names to the outer container. */
  className?: string;
  /** Background color of the overlay (element being interacted with). */
  background?: ThemeVars.Color;
  /** Set element to block and expand to 100% width. */
  block?: boolean;
  /** Border color of the element. */
  borderColor?: ThemeVars.Color;
  /** Is the element currently disabled. */
  disabled?: boolean;
  /**
   * Is the element currenty loading.
   * When set to true, will disable element from press and keyboard events
   */
  loading?: boolean;
  /** Is the element being pressed. Primarily a mobile feature, but can be used on the web. */
  pressed?: boolean;
  /**
   * Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
   * Must be used in conjunction with the "pressed" prop
   */
  transparentWhileInactive?: boolean;
  /**
   * Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
   * Must be used in conjunction with the "pressed" prop
   */
  transparentWhilePressed?: boolean;
  blendStyles?: InteractableBlendStyles;
}`,signature:{properties:[{key:"className",value:{name:"string",required:!1},description:"Apply class names to the outer container."},{key:"background",value:{name:"ThemeVars.Color",required:!1},description:"Background color of the overlay (element being interacted with)."},{key:"block",value:{name:"boolean",required:!1},description:"Set element to block and expand to 100% width."},{key:"borderColor",value:{name:"ThemeVars.Color",required:!1},description:"Border color of the element."},{key:"disabled",value:{name:"boolean",required:!1},description:"Is the element currently disabled."},{key:"loading",value:{name:"boolean",required:!1},description:`Is the element currenty loading.
When set to true, will disable element from press and keyboard events`},{key:"pressed",value:{name:"boolean",required:!1},description:"Is the element being pressed. Primarily a mobile feature, but can be used on the web."},{key:"transparentWhileInactive",value:{name:"boolean",required:!1},description:`Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
Must be used in conjunction with the "pressed" prop`},{key:"transparentWhilePressed",value:{name:"boolean",required:!1},description:`Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
Must be used in conjunction with the "pressed" prop`},{key:"blendStyles",value:{name:"signature",type:"object",raw:`{
  background?: string;
  pressedBackground?: string;
  disabledBackground?: string;
  hoveredBackground?: string;
  borderColor?: string;
  pressedBorderColor?: string;
  disabledBorderColor?: string;
  hoveredBorderColor?: string;
  /**
   * The opacity of the element when hovered.
   * @default 0.88
   */
  hoveredOpacity?: number;
  /**
   * The opacity of the element when pressed.
   * @default 0.82
   */
  pressedOpacity?: number;
  /**
   * The opacity of the element when disabled.
   * @default 0.75
   */
  disabledOpacity?: number;
}`,signature:{properties:[{key:"background",value:{name:"string",required:!1}},{key:"pressedBackground",value:{name:"string",required:!1}},{key:"disabledBackground",value:{name:"string",required:!1}},{key:"hoveredBackground",value:{name:"string",required:!1}},{key:"borderColor",value:{name:"string",required:!1}},{key:"pressedBorderColor",value:{name:"string",required:!1}},{key:"disabledBorderColor",value:{name:"string",required:!1}},{key:"hoveredBorderColor",value:{name:"string",required:!1}},{key:"hoveredOpacity",value:{name:"number",required:!1},description:`The opacity of the element when hovered.
@default 0.88`},{key:"pressedOpacity",value:{name:"number",required:!1},description:`The opacity of the element when pressed.
@default 0.82`},{key:"disabledOpacity",value:{name:"number",required:!1},description:`The opacity of the element when disabled.
@default 0.75`}]},required:!1}}]}}],raw:`Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    /** Apply class names to the outer container. */
    className?: string;
    /** Background color of the overlay (element being interacted with). */
    background?: ThemeVars.Color;
    /** Set element to block and expand to 100% width. */
    block?: boolean;
    /** Border color of the element. */
    borderColor?: ThemeVars.Color;
    /** Is the element currently disabled. */
    disabled?: boolean;
    /**
     * Is the element currenty loading.
     * When set to true, will disable element from press and keyboard events
     */
    loading?: boolean;
    /** Is the element being pressed. Primarily a mobile feature, but can be used on the web. */
    pressed?: boolean;
    /**
     * Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
     * Must be used in conjunction with the "pressed" prop
     */
    transparentWhileInactive?: boolean;
    /**
     * Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
     * Must be used in conjunction with the "pressed" prop
     */
    transparentWhilePressed?: boolean;
    blendStyles?: InteractableBlendStyles;
  }
>`},{name:"intersection",raw:`ComponentEventHandlerProps & {
  /** Dont scale element on press. */
  noScaleOnPress?: boolean;
  focusable?: boolean;
}`,elements:[{name:"signature",type:"object",raw:`{
  eventConfig?: EventHandlerCustomConfig;
  analyticsId?: string;
}`,signature:{properties:[{key:"eventConfig",value:{name:"signature",type:"object",raw:`{
  actions: EventHandlerAction[];
  componentName: string;
  data?: EventCustomData;
}`,signature:{properties:[{key:"actions",value:{name:"Array",elements:[{name:"string"}],raw:"EventHandlerAction[]",required:!0}},{key:"componentName",value:{name:"string",required:!0}},{key:"data",value:{name:"Record",elements:[{name:"string"},{name:"union",raw:"T | Record<string, T>",elements:[{name:"union",raw:"EventDataEntryTypes | EventDataEntryTypes[]",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]},{name:"Array",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]}],raw:"EventDataEntryTypes[]"}]},{name:"Record",elements:[{name:"string"},{name:"union",raw:"EventDataEntryTypes | EventDataEntryTypes[]",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]},{name:"Array",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]}],raw:"EventDataEntryTypes[]"}]}],raw:"Record<string, T>"}]}],raw:"Record<string, RecursiveMapType<EventDataEntry>>",required:!1}}]},required:!1}},{key:"analyticsId",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
  /** Dont scale element on press. */
  noScaleOnPress?: boolean;
  focusable?: boolean;
}`,signature:{properties:[{key:"noScaleOnPress",value:{name:"boolean",required:!1},description:"Dont scale element on press."},{key:"focusable",value:{name:"boolean",required:!1}}]}}]}],raw:`Polymorphic.ExtendableProps<
  InteractableBaseProps,
  ComponentEventHandlerProps & {
    /** Dont scale element on press. */
    noScaleOnPress?: boolean;
    focusable?: boolean;
  }
>`},{name:"intersection",raw:`SharedProps &
Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
  /**
   * Toggle design and visual variants.
   * @default primary
   */
  variant?: ButtonVariant;
  /** Mark the button as disabled. */
  disabled?: boolean;
  /** Mark the button as loading and display a spinner. */
  loading?: boolean;
  /** Mark the background and border as transparent until interacted with. */
  transparent?: boolean;
  /** Change to block and expand to 100% of parent width. */
  block?: boolean;
  /** Reduce the inner padding within the button itself. */
  compact?: boolean;
  /** Children to render within the button. */
  children: React.ReactNode;
  /** Set the start node */
  start?: React.ReactNode;
  /** Icon to render at the start of the button. */
  startIcon?: IconName;
  /** Whether the start icon is active */
  startIconActive?: boolean;
  /** Set the end node */
  end?: React.ReactNode;
  /** Icon to render at the end of the button. */
  endIcon?: IconName;
  /** Whether the end icon is active */
  endIconActive?: boolean;
  /** Ensure the button aligns flush on the left or right.
   * This prop will translate the entire button left/right,
   * so take care to ensure it is not overflowing awkwardly
   */
  flush?: 'start' | 'end';
  /** Uniquely identify the button within a form. */
  name?: string;
  /** Don't scale element on press. */
  noScaleOnPress?: boolean;
  /**
   * Truncates text after wrapping to a defined number of lines.
   * @default 1
   */
  numberOfLines?: number;
}`,elements:[{name:"signature",type:"object",raw:`{
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
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},{name:"literal",value:"'accessibilityLabel'"}],raw:"Pick<SharedAccessibilityProps, 'accessibilityLabel'>"},{name:"signature",type:"object",raw:`{
  /**
   * Toggle design and visual variants.
   * @default primary
   */
  variant?: ButtonVariant;
  /** Mark the button as disabled. */
  disabled?: boolean;
  /** Mark the button as loading and display a spinner. */
  loading?: boolean;
  /** Mark the background and border as transparent until interacted with. */
  transparent?: boolean;
  /** Change to block and expand to 100% of parent width. */
  block?: boolean;
  /** Reduce the inner padding within the button itself. */
  compact?: boolean;
  /** Children to render within the button. */
  children: React.ReactNode;
  /** Set the start node */
  start?: React.ReactNode;
  /** Icon to render at the start of the button. */
  startIcon?: IconName;
  /** Whether the start icon is active */
  startIconActive?: boolean;
  /** Set the end node */
  end?: React.ReactNode;
  /** Icon to render at the end of the button. */
  endIcon?: IconName;
  /** Whether the end icon is active */
  endIconActive?: boolean;
  /** Ensure the button aligns flush on the left or right.
   * This prop will translate the entire button left/right,
   * so take care to ensure it is not overflowing awkwardly
   */
  flush?: 'start' | 'end';
  /** Uniquely identify the button within a form. */
  name?: string;
  /** Don't scale element on press. */
  noScaleOnPress?: boolean;
  /**
   * Truncates text after wrapping to a defined number of lines.
   * @default 1
   */
  numberOfLines?: number;
}`,signature:{properties:[{key:"variant",value:{name:"union",raw:`| 'primary'
| 'secondary'
| 'tertiary'
| 'positive'
| 'negative'
| 'foregroundMuted'`,elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"},{name:"literal",value:"'tertiary'"},{name:"literal",value:"'positive'"},{name:"literal",value:"'negative'"},{name:"literal",value:"'foregroundMuted'"}],required:!1},description:`Toggle design and visual variants.
@default primary`},{key:"disabled",value:{name:"boolean",required:!1},description:"Mark the button as disabled."},{key:"loading",value:{name:"boolean",required:!1},description:"Mark the button as loading and display a spinner."},{key:"transparent",value:{name:"boolean",required:!1},description:"Mark the background and border as transparent until interacted with."},{key:"block",value:{name:"boolean",required:!1},description:"Change to block and expand to 100% of parent width."},{key:"compact",value:{name:"boolean",required:!1},description:"Reduce the inner padding within the button itself."},{key:"children",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0},description:"Children to render within the button."},{key:"start",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"Set the start node"},{key:"startIcon",value:{name:"union",raw:`| 'account'
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
| 'xLogo'`,elements:[{name:"literal",value:"'account'"},{name:"literal",value:"'activity'"},{name:"literal",value:"'add'"},{name:"literal",value:"'addPeople'"},{name:"literal",value:"'advancedMarketSelector'"},{name:"literal",value:"'advancedTradeProduct'"},{name:"literal",value:"'affiliates'"},{name:"literal",value:"'airdrop'"},{name:"literal",value:"'airdropAlt'"},{name:"literal",value:"'airdropCoins'"},{name:"literal",value:"'airdropParachute'"},{name:"literal",value:"'alien'"},{name:"literal",value:"'allTimeHigh'"},{name:"literal",value:"'allocation'"},{name:"literal",value:"'annotation'"},{name:"literal",value:"'api'"},{name:"literal",value:"'apiPlug'"},{name:"literal",value:"'apothecary'"},{name:"literal",value:"'appSwitcher'"},{name:"literal",value:"'apple'"},{name:"literal",value:"'appleLogo'"},{name:"literal",value:"'application'"},{name:"literal",value:"'arrowDown'"},{name:"literal",value:"'arrowLeft'"},{name:"literal",value:"'arrowRight'"},{name:"literal",value:"'arrowUp'"},{name:"literal",value:"'arrowsHorizontal'"},{name:"literal",value:"'arrowsUpDown'"},{name:"literal",value:"'arrowsVertical'"},{name:"literal",value:"'artwork'"},{name:"literal",value:"'assetHubProduct'"},{name:"literal",value:"'assetManagementProduct'"},{name:"literal",value:"'astronautHelmet'"},{name:"literal",value:"'atSign'"},{name:"literal",value:"'atomScience'"},{name:"literal",value:"'auto'"},{name:"literal",value:"'autoCar'"},{name:"literal",value:"'avatar'"},{name:"literal",value:"'average'"},{name:"literal",value:"'backArrow'"},{name:"literal",value:"'ballot'"},{name:"literal",value:"'ballotbox'"},{name:"literal",value:"'bandage'"},{name:"literal",value:"'bank'"},{name:"literal",value:"'barChartSimple'"},{name:"literal",value:"'barChartWindow'"},{name:"literal",value:"'base'"},{name:"literal",value:"'baseApps'"},{name:"literal",value:"'baseFeed'"},{name:"literal",value:"'baseNotification'"},{name:"literal",value:"'baseQuickBuy'"},{name:"literal",value:"'baseSquare'"},{name:"literal",value:"'baseTransact'"},{name:"literal",value:"'baseVerification'"},{name:"literal",value:"'baseWallet'"},{name:"literal",value:"'baseball'"},{name:"literal",value:"'basketball'"},{name:"literal",value:"'beaker'"},{name:"literal",value:"'beginningArrow'"},{name:"literal",value:"'bell'"},{name:"literal",value:"'bellCheck'"},{name:"literal",value:"'bellPlus'"},{name:"literal",value:"'birthcertificate'"},{name:"literal",value:"'block'"},{name:"literal",value:"'blockchain'"},{name:"literal",value:"'blog'"},{name:"literal",value:"'book'"},{name:"literal",value:"'bookmark'"},{name:"literal",value:"'borrowProduct'"},{name:"literal",value:"'boxing'"},{name:"literal",value:"'bridging'"},{name:"literal",value:"'briefcase'"},{name:"literal",value:"'briefcaseAlt'"},{name:"literal",value:"'browser'"},{name:"literal",value:"'bug'"},{name:"literal",value:"'building'"},{name:"literal",value:"'calculator'"},{name:"literal",value:"'calendar'"},{name:"literal",value:"'calendarBlank'"},{name:"literal",value:"'calendarDates'"},{name:"literal",value:"'calendarEmpty'"},{name:"literal",value:"'calendarHeart'"},{name:"literal",value:"'calendarMoney'"},{name:"literal",value:"'calendarStar'"},{name:"literal",value:"'camera'"},{name:"literal",value:"'candlesticks'"},{name:"literal",value:"'car'"},{name:"literal",value:"'card'"},{name:"literal",value:"'caret'"},{name:"literal",value:"'caretDown'"},{name:"literal",value:"'caretLeft'"},{name:"literal",value:"'caretRight'"},{name:"literal",value:"'caretUp'"},{name:"literal",value:"'cash'"},{name:"literal",value:"'cashAustralianDollar'"},{name:"literal",value:"'cashBrazilianReal'"},{name:"literal",value:"'cashBrazillianReal'"},{name:"literal",value:"'cashCanadianDollar'"},{name:"literal",value:"'cashCoins'"},{name:"literal",value:"'cashEUR'"},{name:"literal",value:"'cashGBP'"},{name:"literal",value:"'cashIndonesianRupiah'"},{name:"literal",value:"'cashJPY'"},{name:"literal",value:"'cashPhilippinePeso'"},{name:"literal",value:"'cashPolishZloty'"},{name:"literal",value:"'cashRupee'"},{name:"literal",value:"'cashSingaporeDollar'"},{name:"literal",value:"'cashSwissFranc'"},{name:"literal",value:"'cashThaiBaht'"},{name:"literal",value:"'cashTurkishLira'"},{name:"literal",value:"'cashUSD'"},{name:"literal",value:"'cashUaeDirham'"},{name:"literal",value:"'cashVietnameseDong'"},{name:"literal",value:"'chainLink'"},{name:"literal",value:"'chartBar'"},{name:"literal",value:"'chartCandles'"},{name:"literal",value:"'chartLine'"},{name:"literal",value:"'chartPie'"},{name:"literal",value:"'chartPieCircle'"},{name:"literal",value:"'chartVolume'"},{name:"literal",value:"'chatBotAgent'"},{name:"literal",value:"'chatBubble'"},{name:"literal",value:"'chatRequests'"},{name:"literal",value:"'checkboxChecked'"},{name:"literal",value:"'checkboxEmpty'"},{name:"literal",value:"'checkmark'"},{name:"literal",value:"'chess'"},{name:"literal",value:"'circleCheckmark'"},{name:"literal",value:"'circleCross'"},{name:"literal",value:"'circulatingSupply'"},{name:"literal",value:"'city'"},{name:"literal",value:"'clipboard'"},{name:"literal",value:"'clock'"},{name:"literal",value:"'clockOutline'"},{name:"literal",value:"'close'"},{name:"literal",value:"'closeCaption'"},{name:"literal",value:"'clothing'"},{name:"literal",value:"'cloud'"},{name:"literal",value:"'cloudPartial'"},{name:"literal",value:"'cloudProduct'"},{name:"literal",value:"'cluster'"},{name:"literal",value:"'coinbase'"},{name:"literal",value:"'coinbaseCardProduct'"},{name:"literal",value:"'coinbaseOne'"},{name:"literal",value:"'coinbaseOneCard'"},{name:"literal",value:"'coinbaseOneLogo'"},{name:"literal",value:"'coinbaseRewards'"},{name:"literal",value:"'coinsCrypto'"},{name:"literal",value:"'collapse'"},{name:"literal",value:"'collectibles'"},{name:"literal",value:"'collection'"},{name:"literal",value:"'comment'"},{name:"literal",value:"'commentPlus'"},{name:"literal",value:"'commerceProduct'"},{name:"literal",value:"'compass'"},{name:"literal",value:"'complianceProduct'"},{name:"literal",value:"'compose'"},{name:"literal",value:"'computerChip'"},{name:"literal",value:"'concierge'"},{name:"literal",value:"'conciergeBell'"},{name:"literal",value:"'config'"},{name:"literal",value:"'continuous'"},{name:"literal",value:"'convert'"},{name:"literal",value:"'copy'"},{name:"literal",value:"'corporation'"},{name:"literal",value:"'creatorCoin'"},{name:"literal",value:"'cricket'"},{name:"literal",value:"'cross'"},{name:"literal",value:"'crossTrade'"},{name:"literal",value:"'crypto'"},{name:"literal",value:"'cryptobasics'"},{name:"literal",value:"'crystalBall'"},{name:"literal",value:"'crystalBallInsight'"},{name:"literal",value:"'currencies'"},{name:"literal",value:"'custodyProduct'"},{name:"literal",value:"'dashboard'"},{name:"literal",value:"'dataMarketplaceProduct'"},{name:"literal",value:"'dataStack'"},{name:"literal",value:"'defi'"},{name:"literal",value:"'delegateProduct'"},{name:"literal",value:"'deposit'"},{name:"literal",value:"'derivatives'"},{name:"literal",value:"'derivativesProduct'"},{name:"literal",value:"'derivativesProductNew'"},{name:"literal",value:"'developerAPIProduct'"},{name:"literal",value:"'developerPlatformProduct'"},{name:"literal",value:"'dex'"},{name:"literal",value:"'diagonalDownArrow'"},{name:"literal",value:"'diagonalRightArrow'"},{name:"literal",value:"'diagonalUpArrow'"},{name:"literal",value:"'diamond'"},{name:"literal",value:"'diamondIncentives'"},{name:"literal",value:"'dinnerPlate'"},{name:"literal",value:"'directDeposit'"},{name:"literal",value:"'directDepositIcon'"},{name:"literal",value:"'disabledPhone'"},{name:"literal",value:"'discordLogo'"},{name:"literal",value:"'distribution'"},{name:"literal",value:"'document'"},{name:"literal",value:"'documentation'"},{name:"literal",value:"'dot'"},{name:"literal",value:"'doubleChevronRight'"},{name:"literal",value:"'downArrow'"},{name:"literal",value:"'download'"},{name:"literal",value:"'drag'"},{name:"literal",value:"'drops'"},{name:"literal",value:"'earn'"},{name:"literal",value:"'earnProduct'"},{name:"literal",value:"'earnRewards'"},{name:"literal",value:"'earthquake'"},{name:"literal",value:"'educationBook'"},{name:"literal",value:"'educationPencil'"},{name:"literal",value:"'email'"},{name:"literal",value:"'endArrow'"},{name:"literal",value:"'entertainment'"},{name:"literal",value:"'error'"},{name:"literal",value:"'ethereum'"},{name:"literal",value:"'eventContracts'"},{name:"literal",value:"'exchangeProduct'"},{name:"literal",value:"'exclamationMark'"},{name:"literal",value:"'expand'"},{name:"literal",value:"'expandAddress'"},{name:"literal",value:"'expandAll'"},{name:"literal",value:"'externalLink'"},{name:"literal",value:"'eye'"},{name:"literal",value:"'faceScan'"},{name:"literal",value:"'faces'"},{name:"literal",value:"'factory'"},{name:"literal",value:"'faucet'"},{name:"literal",value:"'fib'"},{name:"literal",value:"'filmStrip'"},{name:"literal",value:"'filter'"},{name:"literal",value:"'fingerprint'"},{name:"literal",value:"'flame'"},{name:"literal",value:"'folder'"},{name:"literal",value:"'folderArrow'"},{name:"literal",value:"'folderOpen'"},{name:"literal",value:"'followAdd'"},{name:"literal",value:"'following'"},{name:"literal",value:"'football'"},{name:"literal",value:"'fork'"},{name:"literal",value:"'forwardArrow'"},{name:"literal",value:"'fscsProtection'"},{name:"literal",value:"'gab'"},{name:"literal",value:"'games'"},{name:"literal",value:"'gaming'"},{name:"literal",value:"'gasFees'"},{name:"literal",value:"'gasFeesAlt'"},{name:"literal",value:"'gauge'"},{name:"literal",value:"'gaugeEmpty'"},{name:"literal",value:"'gaugeHigh'"},{name:"literal",value:"'gaugeHighLow'"},{name:"literal",value:"'gaugeHighMid'"},{name:"literal",value:"'gaugeLow'"},{name:"literal",value:"'gaugeLowHigh'"},{name:"literal",value:"'gaugeLowMid'"},{name:"literal",value:"'gaugeMedium'"},{name:"literal",value:"'gavel'"},{name:"literal",value:"'gear'"},{name:"literal",value:"'generalCharacter'"},{name:"literal",value:"'ghost'"},{name:"literal",value:"'gif'"},{name:"literal",value:"'giftBox'"},{name:"literal",value:"'giftCard'"},{name:"literal",value:"'gitHubLogo'"},{name:"literal",value:"'globe'"},{name:"literal",value:"'golf'"},{name:"literal",value:"'googleLogo'"},{name:"literal",value:"'greenEnergy'"},{name:"literal",value:"'grid'"},{name:"literal",value:"'group'"},{name:"literal",value:"'hamburger'"},{name:"literal",value:"'hammer'"},{name:"literal",value:"'heart'"},{name:"literal",value:"'helpCenterProduct'"},{name:"literal",value:"'helpCenterQuestionMark'"},{name:"literal",value:"'hiddenEye'"},{name:"literal",value:"'hockey'"},{name:"literal",value:"'home'"},{name:"literal",value:"'horizontalLine'"},{name:"literal",value:"'hospital'"},{name:"literal",value:"'hospitalCross'"},{name:"literal",value:"'hurricane'"},{name:"literal",value:"'ideal'"},{name:"literal",value:"'identityCard'"},{name:"literal",value:"'image'"},{name:"literal",value:"'info'"},{name:"literal",value:"'initiator'"},{name:"literal",value:"'instagramLogo'"},{name:"literal",value:"'instantUnstakingClock'"},{name:"literal",value:"'institute'"},{name:"literal",value:"'institutionalProduct'"},{name:"literal",value:"'interest'"},{name:"literal",value:"'invisible'"},{name:"literal",value:"'invoice'"},{name:"literal",value:"'key'"},{name:"literal",value:"'keyboard'"},{name:"literal",value:"'laptop'"},{name:"literal",value:"'leadChart'"},{name:"literal",value:"'leadCoin'"},{name:"literal",value:"'learningRewardsProduct'"},{name:"literal",value:"'light'"},{name:"literal",value:"'lightbulb'"},{name:"literal",value:"'lightning'"},{name:"literal",value:"'lightningBolt'"},{name:"literal",value:"'lineChartCrypto'"},{name:"literal",value:"'list'"},{name:"literal",value:"'location'"},{name:"literal",value:"'lock'"},{name:"literal",value:"'login'"},{name:"literal",value:"'logout'"},{name:"literal",value:"'loop'"},{name:"literal",value:"'magnifyingGlass'"},{name:"literal",value:"'marketCap'"},{name:"literal",value:"'medal'"},{name:"literal",value:"'megaphone'"},{name:"literal",value:"'menu'"},{name:"literal",value:"'metaverse'"},{name:"literal",value:"'microphone'"},{name:"literal",value:"'microphoneCordless'"},{name:"literal",value:"'microscope'"},{name:"literal",value:"'mint'"},{name:"literal",value:"'minus'"},{name:"literal",value:"'mma'"},{name:"literal",value:"'moneyCardCoin'"},{name:"literal",value:"'moon'"},{name:"literal",value:"'more'"},{name:"literal",value:"'moreVertical'"},{name:"literal",value:"'motorsport'"},{name:"literal",value:"'music'"},{name:"literal",value:"'musicArticles'"},{name:"literal",value:"'needle'"},{name:"literal",value:"'newsFeed'"},{name:"literal",value:"'newsletter'"},{name:"literal",value:"'nft'"},{name:"literal",value:"'nftBuy'"},{name:"literal",value:"'nftOffer'"},{name:"literal",value:"'nftProduct'"},{name:"literal",value:"'nftSale'"},{name:"literal",value:"'noRocket'"},{name:"literal",value:"'noWifi'"},{name:"literal",value:"'nodeProduct'"},{name:"literal",value:"'oil'"},{name:"literal",value:"'options'"},{name:"literal",value:"'orderBook'"},{name:"literal",value:"'orderHistory'"},{name:"literal",value:"'outline'"},{name:"literal",value:"'pFPS'"},{name:"literal",value:"'paperAirplane'"},{name:"literal",value:"'paperclip'"},{name:"literal",value:"'participate'"},{name:"literal",value:"'participateProduct'"},{name:"literal",value:"'passKey'"},{name:"literal",value:"'passport'"},{name:"literal",value:"'pause'"},{name:"literal",value:"'pay'"},{name:"literal",value:"'payProduct'"},{name:"literal",value:"'paymentCard'"},{name:"literal",value:"'payments'"},{name:"literal",value:"'payouts'"},{name:"literal",value:"'paypal'"},{name:"literal",value:"'pencil'"},{name:"literal",value:"'peopleGroup'"},{name:"literal",value:"'peopleStar'"},{name:"literal",value:"'percentage'"},{name:"literal",value:"'perpetualSwap'"},{name:"literal",value:"'phone'"},{name:"literal",value:"'pieChartData'"},{name:"literal",value:"'pillBottle'"},{name:"literal",value:"'pillCapsule'"},{name:"literal",value:"'pin'"},{name:"literal",value:"'plane'"},{name:"literal",value:"'planet'"},{name:"literal",value:"'play'"},{name:"literal",value:"'playbutton'"},{name:"literal",value:"'plusMinus'"},{name:"literal",value:"'podiumStar'"},{name:"literal",value:"'politicsBuilding'"},{name:"literal",value:"'politicsCandidate'"},{name:"literal",value:"'politicsFlag'"},{name:"literal",value:"'politicsGavel'"},{name:"literal",value:"'politicsPodium'"},{name:"literal",value:"'politicsStar'"},{name:"literal",value:"'powerTool'"},{name:"literal",value:"'priceAlerts'"},{name:"literal",value:"'priceAlertsCheck'"},{name:"literal",value:"'primePoduct'"},{name:"literal",value:"'privateClientProduct'"},{name:"literal",value:"'proProduct'"},{name:"literal",value:"'profile'"},{name:"literal",value:"'protection'"},{name:"literal",value:"'pulse'"},{name:"literal",value:"'pyramid'"},{name:"literal",value:"'qrCode'"},{name:"literal",value:"'qrCodeAlt'"},{name:"literal",value:"'queryTransact'"},{name:"literal",value:"'questionMark'"},{name:"literal",value:"'quotation'"},{name:"literal",value:"'rain'"},{name:"literal",value:"'ratingsCheck'"},{name:"literal",value:"'ratingsChecks'"},{name:"literal",value:"'ratingsStar'"},{name:"literal",value:"'reCenter'"},{name:"literal",value:"'rectangle'"},{name:"literal",value:"'recurring'"},{name:"literal",value:"'refresh'"},{name:"literal",value:"'regulated'"},{name:"literal",value:"'regulatedFutures'"},{name:"literal",value:"'report'"},{name:"literal",value:"'rewardsProduct'"},{name:"literal",value:"'ribbon'"},{name:"literal",value:"'robot'"},{name:"literal",value:"'rocket'"},{name:"literal",value:"'rocketShip'"},{name:"literal",value:"'rollingSpot'"},{name:"literal",value:"'rosettaProduct'"},{name:"literal",value:"'rottenTomato'"},{name:"literal",value:"'royalty'"},{name:"literal",value:"'safe'"},{name:"literal",value:"'save'"},{name:"literal",value:"'savingsBank'"},{name:"literal",value:"'scanQrCode'"},{name:"literal",value:"'scienceAtom'"},{name:"literal",value:"'scienceBeaker'"},{name:"literal",value:"'scienceMoon'"},{name:"literal",value:"'search'"},{name:"literal",value:"'securityKey'"},{name:"literal",value:"'securityShield'"},{name:"literal",value:"'seen'"},{name:"literal",value:"'sendReceive'"},{name:"literal",value:"'setPinCode'"},{name:"literal",value:"'settings'"},{name:"literal",value:"'share'"},{name:"literal",value:"'shield'"},{name:"literal",value:"'shieldOutline'"},{name:"literal",value:"'shoe'"},{name:"literal",value:"'shoppingCart'"},{name:"literal",value:"'signinProduct'"},{name:"literal",value:"'singleCoin'"},{name:"literal",value:"'singleNote'"},{name:"literal",value:"'singlecloud'"},{name:"literal",value:"'smartContract'"},{name:"literal",value:"'snow'"},{name:"literal",value:"'soccer'"},{name:"literal",value:"'socialChat'"},{name:"literal",value:"'socialReshare'"},{name:"literal",value:"'socialShare'"},{name:"literal",value:"'sofort'"},{name:"literal",value:"'sortDoubleArrow'"},{name:"literal",value:"'sortDown'"},{name:"literal",value:"'sortDownCenter'"},{name:"literal",value:"'sortUp'"},{name:"literal",value:"'sortUpCenter'"},{name:"literal",value:"'soundOff'"},{name:"literal",value:"'soundOn'"},{name:"literal",value:"'sparkle'"},{name:"literal",value:"'speaker'"},{name:"literal",value:"'speechBubble'"},{name:"literal",value:"'stableCoin'"},{name:"literal",value:"'stablecoinStack'"},{name:"literal",value:"'staggeredList'"},{name:"literal",value:"'stake'"},{name:"literal",value:"'staking'"},{name:"literal",value:"'star'"},{name:"literal",value:"'starAward'"},{name:"literal",value:"'starBubble'"},{name:"literal",value:"'starTrophy'"},{name:"literal",value:"'statusDot'"},{name:"literal",value:"'step0'"},{name:"literal",value:"'step1'"},{name:"literal",value:"'step2'"},{name:"literal",value:"'step3'"},{name:"literal",value:"'step4'"},{name:"literal",value:"'step5'"},{name:"literal",value:"'step6'"},{name:"literal",value:"'step7'"},{name:"literal",value:"'step8'"},{name:"literal",value:"'step9'"},{name:"literal",value:"'strategy'"},{name:"literal",value:"'sun'"},{name:"literal",value:"'support'"},{name:"literal",value:"'tag'"},{name:"literal",value:"'taxes'"},{name:"literal",value:"'taxesReceipt'"},{name:"literal",value:"'telephone'"},{name:"literal",value:"'tennis'"},{name:"literal",value:"'test'"},{name:"literal",value:"'thermometer'"},{name:"literal",value:"'thumbsDown'"},{name:"literal",value:"'thumbsDownOutline'"},{name:"literal",value:"'thumbsUp'"},{name:"literal",value:"'thumbsUpOutline'"},{name:"literal",value:"'tokenLaunchCoin'"},{name:"literal",value:"'tokenLaunchRocket'"},{name:"literal",value:"'tokenSales'"},{name:"literal",value:"'tornado'"},{name:"literal",value:"'trading'"},{name:"literal",value:"'transactions'"},{name:"literal",value:"'trashCan'"},{name:"literal",value:"'trophy'"},{name:"literal",value:"'trophyCup'"},{name:"literal",value:"'tshirt'"},{name:"literal",value:"'tv'"},{name:"literal",value:"'tvStand'"},{name:"literal",value:"'twitterLogo'"},{name:"literal",value:"'ultility'"},{name:"literal",value:"'umbrella'"},{name:"literal",value:"'undo'"},{name:"literal",value:"'unfollowPeople'"},{name:"literal",value:"'unknown'"},{name:"literal",value:"'unlock'"},{name:"literal",value:"'upArrow'"},{name:"literal",value:"'upload'"},{name:"literal",value:"'venturesProduct'"},{name:"literal",value:"'verifiedBadge'"},{name:"literal",value:"'verifiedPools'"},{name:"literal",value:"'verticalLine'"},{name:"literal",value:"'virus'"},{name:"literal",value:"'visible'"},{name:"literal",value:"'waasProduct'"},{name:"literal",value:"'wallet'"},{name:"literal",value:"'walletLogo'"},{name:"literal",value:"'walletProduct'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'webhooks'"},{name:"literal",value:"'wellness'"},{name:"literal",value:"'wifi'"},{name:"literal",value:"'wind'"},{name:"literal",value:"'wireTransfer'"},{name:"literal",value:"'withdraw'"},{name:"literal",value:"'wrapToken'"},{name:"literal",value:"'xLogo'"}],required:!0},description:"Icon to render at the start of the button."},{key:"startIconActive",value:{name:"boolean",required:!1},description:"Whether the start icon is active"},{key:"end",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"Set the end node"},{key:"endIcon",value:{name:"union",raw:`| 'account'
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
| 'xLogo'`,elements:[{name:"literal",value:"'account'"},{name:"literal",value:"'activity'"},{name:"literal",value:"'add'"},{name:"literal",value:"'addPeople'"},{name:"literal",value:"'advancedMarketSelector'"},{name:"literal",value:"'advancedTradeProduct'"},{name:"literal",value:"'affiliates'"},{name:"literal",value:"'airdrop'"},{name:"literal",value:"'airdropAlt'"},{name:"literal",value:"'airdropCoins'"},{name:"literal",value:"'airdropParachute'"},{name:"literal",value:"'alien'"},{name:"literal",value:"'allTimeHigh'"},{name:"literal",value:"'allocation'"},{name:"literal",value:"'annotation'"},{name:"literal",value:"'api'"},{name:"literal",value:"'apiPlug'"},{name:"literal",value:"'apothecary'"},{name:"literal",value:"'appSwitcher'"},{name:"literal",value:"'apple'"},{name:"literal",value:"'appleLogo'"},{name:"literal",value:"'application'"},{name:"literal",value:"'arrowDown'"},{name:"literal",value:"'arrowLeft'"},{name:"literal",value:"'arrowRight'"},{name:"literal",value:"'arrowUp'"},{name:"literal",value:"'arrowsHorizontal'"},{name:"literal",value:"'arrowsUpDown'"},{name:"literal",value:"'arrowsVertical'"},{name:"literal",value:"'artwork'"},{name:"literal",value:"'assetHubProduct'"},{name:"literal",value:"'assetManagementProduct'"},{name:"literal",value:"'astronautHelmet'"},{name:"literal",value:"'atSign'"},{name:"literal",value:"'atomScience'"},{name:"literal",value:"'auto'"},{name:"literal",value:"'autoCar'"},{name:"literal",value:"'avatar'"},{name:"literal",value:"'average'"},{name:"literal",value:"'backArrow'"},{name:"literal",value:"'ballot'"},{name:"literal",value:"'ballotbox'"},{name:"literal",value:"'bandage'"},{name:"literal",value:"'bank'"},{name:"literal",value:"'barChartSimple'"},{name:"literal",value:"'barChartWindow'"},{name:"literal",value:"'base'"},{name:"literal",value:"'baseApps'"},{name:"literal",value:"'baseFeed'"},{name:"literal",value:"'baseNotification'"},{name:"literal",value:"'baseQuickBuy'"},{name:"literal",value:"'baseSquare'"},{name:"literal",value:"'baseTransact'"},{name:"literal",value:"'baseVerification'"},{name:"literal",value:"'baseWallet'"},{name:"literal",value:"'baseball'"},{name:"literal",value:"'basketball'"},{name:"literal",value:"'beaker'"},{name:"literal",value:"'beginningArrow'"},{name:"literal",value:"'bell'"},{name:"literal",value:"'bellCheck'"},{name:"literal",value:"'bellPlus'"},{name:"literal",value:"'birthcertificate'"},{name:"literal",value:"'block'"},{name:"literal",value:"'blockchain'"},{name:"literal",value:"'blog'"},{name:"literal",value:"'book'"},{name:"literal",value:"'bookmark'"},{name:"literal",value:"'borrowProduct'"},{name:"literal",value:"'boxing'"},{name:"literal",value:"'bridging'"},{name:"literal",value:"'briefcase'"},{name:"literal",value:"'briefcaseAlt'"},{name:"literal",value:"'browser'"},{name:"literal",value:"'bug'"},{name:"literal",value:"'building'"},{name:"literal",value:"'calculator'"},{name:"literal",value:"'calendar'"},{name:"literal",value:"'calendarBlank'"},{name:"literal",value:"'calendarDates'"},{name:"literal",value:"'calendarEmpty'"},{name:"literal",value:"'calendarHeart'"},{name:"literal",value:"'calendarMoney'"},{name:"literal",value:"'calendarStar'"},{name:"literal",value:"'camera'"},{name:"literal",value:"'candlesticks'"},{name:"literal",value:"'car'"},{name:"literal",value:"'card'"},{name:"literal",value:"'caret'"},{name:"literal",value:"'caretDown'"},{name:"literal",value:"'caretLeft'"},{name:"literal",value:"'caretRight'"},{name:"literal",value:"'caretUp'"},{name:"literal",value:"'cash'"},{name:"literal",value:"'cashAustralianDollar'"},{name:"literal",value:"'cashBrazilianReal'"},{name:"literal",value:"'cashBrazillianReal'"},{name:"literal",value:"'cashCanadianDollar'"},{name:"literal",value:"'cashCoins'"},{name:"literal",value:"'cashEUR'"},{name:"literal",value:"'cashGBP'"},{name:"literal",value:"'cashIndonesianRupiah'"},{name:"literal",value:"'cashJPY'"},{name:"literal",value:"'cashPhilippinePeso'"},{name:"literal",value:"'cashPolishZloty'"},{name:"literal",value:"'cashRupee'"},{name:"literal",value:"'cashSingaporeDollar'"},{name:"literal",value:"'cashSwissFranc'"},{name:"literal",value:"'cashThaiBaht'"},{name:"literal",value:"'cashTurkishLira'"},{name:"literal",value:"'cashUSD'"},{name:"literal",value:"'cashUaeDirham'"},{name:"literal",value:"'cashVietnameseDong'"},{name:"literal",value:"'chainLink'"},{name:"literal",value:"'chartBar'"},{name:"literal",value:"'chartCandles'"},{name:"literal",value:"'chartLine'"},{name:"literal",value:"'chartPie'"},{name:"literal",value:"'chartPieCircle'"},{name:"literal",value:"'chartVolume'"},{name:"literal",value:"'chatBotAgent'"},{name:"literal",value:"'chatBubble'"},{name:"literal",value:"'chatRequests'"},{name:"literal",value:"'checkboxChecked'"},{name:"literal",value:"'checkboxEmpty'"},{name:"literal",value:"'checkmark'"},{name:"literal",value:"'chess'"},{name:"literal",value:"'circleCheckmark'"},{name:"literal",value:"'circleCross'"},{name:"literal",value:"'circulatingSupply'"},{name:"literal",value:"'city'"},{name:"literal",value:"'clipboard'"},{name:"literal",value:"'clock'"},{name:"literal",value:"'clockOutline'"},{name:"literal",value:"'close'"},{name:"literal",value:"'closeCaption'"},{name:"literal",value:"'clothing'"},{name:"literal",value:"'cloud'"},{name:"literal",value:"'cloudPartial'"},{name:"literal",value:"'cloudProduct'"},{name:"literal",value:"'cluster'"},{name:"literal",value:"'coinbase'"},{name:"literal",value:"'coinbaseCardProduct'"},{name:"literal",value:"'coinbaseOne'"},{name:"literal",value:"'coinbaseOneCard'"},{name:"literal",value:"'coinbaseOneLogo'"},{name:"literal",value:"'coinbaseRewards'"},{name:"literal",value:"'coinsCrypto'"},{name:"literal",value:"'collapse'"},{name:"literal",value:"'collectibles'"},{name:"literal",value:"'collection'"},{name:"literal",value:"'comment'"},{name:"literal",value:"'commentPlus'"},{name:"literal",value:"'commerceProduct'"},{name:"literal",value:"'compass'"},{name:"literal",value:"'complianceProduct'"},{name:"literal",value:"'compose'"},{name:"literal",value:"'computerChip'"},{name:"literal",value:"'concierge'"},{name:"literal",value:"'conciergeBell'"},{name:"literal",value:"'config'"},{name:"literal",value:"'continuous'"},{name:"literal",value:"'convert'"},{name:"literal",value:"'copy'"},{name:"literal",value:"'corporation'"},{name:"literal",value:"'creatorCoin'"},{name:"literal",value:"'cricket'"},{name:"literal",value:"'cross'"},{name:"literal",value:"'crossTrade'"},{name:"literal",value:"'crypto'"},{name:"literal",value:"'cryptobasics'"},{name:"literal",value:"'crystalBall'"},{name:"literal",value:"'crystalBallInsight'"},{name:"literal",value:"'currencies'"},{name:"literal",value:"'custodyProduct'"},{name:"literal",value:"'dashboard'"},{name:"literal",value:"'dataMarketplaceProduct'"},{name:"literal",value:"'dataStack'"},{name:"literal",value:"'defi'"},{name:"literal",value:"'delegateProduct'"},{name:"literal",value:"'deposit'"},{name:"literal",value:"'derivatives'"},{name:"literal",value:"'derivativesProduct'"},{name:"literal",value:"'derivativesProductNew'"},{name:"literal",value:"'developerAPIProduct'"},{name:"literal",value:"'developerPlatformProduct'"},{name:"literal",value:"'dex'"},{name:"literal",value:"'diagonalDownArrow'"},{name:"literal",value:"'diagonalRightArrow'"},{name:"literal",value:"'diagonalUpArrow'"},{name:"literal",value:"'diamond'"},{name:"literal",value:"'diamondIncentives'"},{name:"literal",value:"'dinnerPlate'"},{name:"literal",value:"'directDeposit'"},{name:"literal",value:"'directDepositIcon'"},{name:"literal",value:"'disabledPhone'"},{name:"literal",value:"'discordLogo'"},{name:"literal",value:"'distribution'"},{name:"literal",value:"'document'"},{name:"literal",value:"'documentation'"},{name:"literal",value:"'dot'"},{name:"literal",value:"'doubleChevronRight'"},{name:"literal",value:"'downArrow'"},{name:"literal",value:"'download'"},{name:"literal",value:"'drag'"},{name:"literal",value:"'drops'"},{name:"literal",value:"'earn'"},{name:"literal",value:"'earnProduct'"},{name:"literal",value:"'earnRewards'"},{name:"literal",value:"'earthquake'"},{name:"literal",value:"'educationBook'"},{name:"literal",value:"'educationPencil'"},{name:"literal",value:"'email'"},{name:"literal",value:"'endArrow'"},{name:"literal",value:"'entertainment'"},{name:"literal",value:"'error'"},{name:"literal",value:"'ethereum'"},{name:"literal",value:"'eventContracts'"},{name:"literal",value:"'exchangeProduct'"},{name:"literal",value:"'exclamationMark'"},{name:"literal",value:"'expand'"},{name:"literal",value:"'expandAddress'"},{name:"literal",value:"'expandAll'"},{name:"literal",value:"'externalLink'"},{name:"literal",value:"'eye'"},{name:"literal",value:"'faceScan'"},{name:"literal",value:"'faces'"},{name:"literal",value:"'factory'"},{name:"literal",value:"'faucet'"},{name:"literal",value:"'fib'"},{name:"literal",value:"'filmStrip'"},{name:"literal",value:"'filter'"},{name:"literal",value:"'fingerprint'"},{name:"literal",value:"'flame'"},{name:"literal",value:"'folder'"},{name:"literal",value:"'folderArrow'"},{name:"literal",value:"'folderOpen'"},{name:"literal",value:"'followAdd'"},{name:"literal",value:"'following'"},{name:"literal",value:"'football'"},{name:"literal",value:"'fork'"},{name:"literal",value:"'forwardArrow'"},{name:"literal",value:"'fscsProtection'"},{name:"literal",value:"'gab'"},{name:"literal",value:"'games'"},{name:"literal",value:"'gaming'"},{name:"literal",value:"'gasFees'"},{name:"literal",value:"'gasFeesAlt'"},{name:"literal",value:"'gauge'"},{name:"literal",value:"'gaugeEmpty'"},{name:"literal",value:"'gaugeHigh'"},{name:"literal",value:"'gaugeHighLow'"},{name:"literal",value:"'gaugeHighMid'"},{name:"literal",value:"'gaugeLow'"},{name:"literal",value:"'gaugeLowHigh'"},{name:"literal",value:"'gaugeLowMid'"},{name:"literal",value:"'gaugeMedium'"},{name:"literal",value:"'gavel'"},{name:"literal",value:"'gear'"},{name:"literal",value:"'generalCharacter'"},{name:"literal",value:"'ghost'"},{name:"literal",value:"'gif'"},{name:"literal",value:"'giftBox'"},{name:"literal",value:"'giftCard'"},{name:"literal",value:"'gitHubLogo'"},{name:"literal",value:"'globe'"},{name:"literal",value:"'golf'"},{name:"literal",value:"'googleLogo'"},{name:"literal",value:"'greenEnergy'"},{name:"literal",value:"'grid'"},{name:"literal",value:"'group'"},{name:"literal",value:"'hamburger'"},{name:"literal",value:"'hammer'"},{name:"literal",value:"'heart'"},{name:"literal",value:"'helpCenterProduct'"},{name:"literal",value:"'helpCenterQuestionMark'"},{name:"literal",value:"'hiddenEye'"},{name:"literal",value:"'hockey'"},{name:"literal",value:"'home'"},{name:"literal",value:"'horizontalLine'"},{name:"literal",value:"'hospital'"},{name:"literal",value:"'hospitalCross'"},{name:"literal",value:"'hurricane'"},{name:"literal",value:"'ideal'"},{name:"literal",value:"'identityCard'"},{name:"literal",value:"'image'"},{name:"literal",value:"'info'"},{name:"literal",value:"'initiator'"},{name:"literal",value:"'instagramLogo'"},{name:"literal",value:"'instantUnstakingClock'"},{name:"literal",value:"'institute'"},{name:"literal",value:"'institutionalProduct'"},{name:"literal",value:"'interest'"},{name:"literal",value:"'invisible'"},{name:"literal",value:"'invoice'"},{name:"literal",value:"'key'"},{name:"literal",value:"'keyboard'"},{name:"literal",value:"'laptop'"},{name:"literal",value:"'leadChart'"},{name:"literal",value:"'leadCoin'"},{name:"literal",value:"'learningRewardsProduct'"},{name:"literal",value:"'light'"},{name:"literal",value:"'lightbulb'"},{name:"literal",value:"'lightning'"},{name:"literal",value:"'lightningBolt'"},{name:"literal",value:"'lineChartCrypto'"},{name:"literal",value:"'list'"},{name:"literal",value:"'location'"},{name:"literal",value:"'lock'"},{name:"literal",value:"'login'"},{name:"literal",value:"'logout'"},{name:"literal",value:"'loop'"},{name:"literal",value:"'magnifyingGlass'"},{name:"literal",value:"'marketCap'"},{name:"literal",value:"'medal'"},{name:"literal",value:"'megaphone'"},{name:"literal",value:"'menu'"},{name:"literal",value:"'metaverse'"},{name:"literal",value:"'microphone'"},{name:"literal",value:"'microphoneCordless'"},{name:"literal",value:"'microscope'"},{name:"literal",value:"'mint'"},{name:"literal",value:"'minus'"},{name:"literal",value:"'mma'"},{name:"literal",value:"'moneyCardCoin'"},{name:"literal",value:"'moon'"},{name:"literal",value:"'more'"},{name:"literal",value:"'moreVertical'"},{name:"literal",value:"'motorsport'"},{name:"literal",value:"'music'"},{name:"literal",value:"'musicArticles'"},{name:"literal",value:"'needle'"},{name:"literal",value:"'newsFeed'"},{name:"literal",value:"'newsletter'"},{name:"literal",value:"'nft'"},{name:"literal",value:"'nftBuy'"},{name:"literal",value:"'nftOffer'"},{name:"literal",value:"'nftProduct'"},{name:"literal",value:"'nftSale'"},{name:"literal",value:"'noRocket'"},{name:"literal",value:"'noWifi'"},{name:"literal",value:"'nodeProduct'"},{name:"literal",value:"'oil'"},{name:"literal",value:"'options'"},{name:"literal",value:"'orderBook'"},{name:"literal",value:"'orderHistory'"},{name:"literal",value:"'outline'"},{name:"literal",value:"'pFPS'"},{name:"literal",value:"'paperAirplane'"},{name:"literal",value:"'paperclip'"},{name:"literal",value:"'participate'"},{name:"literal",value:"'participateProduct'"},{name:"literal",value:"'passKey'"},{name:"literal",value:"'passport'"},{name:"literal",value:"'pause'"},{name:"literal",value:"'pay'"},{name:"literal",value:"'payProduct'"},{name:"literal",value:"'paymentCard'"},{name:"literal",value:"'payments'"},{name:"literal",value:"'payouts'"},{name:"literal",value:"'paypal'"},{name:"literal",value:"'pencil'"},{name:"literal",value:"'peopleGroup'"},{name:"literal",value:"'peopleStar'"},{name:"literal",value:"'percentage'"},{name:"literal",value:"'perpetualSwap'"},{name:"literal",value:"'phone'"},{name:"literal",value:"'pieChartData'"},{name:"literal",value:"'pillBottle'"},{name:"literal",value:"'pillCapsule'"},{name:"literal",value:"'pin'"},{name:"literal",value:"'plane'"},{name:"literal",value:"'planet'"},{name:"literal",value:"'play'"},{name:"literal",value:"'playbutton'"},{name:"literal",value:"'plusMinus'"},{name:"literal",value:"'podiumStar'"},{name:"literal",value:"'politicsBuilding'"},{name:"literal",value:"'politicsCandidate'"},{name:"literal",value:"'politicsFlag'"},{name:"literal",value:"'politicsGavel'"},{name:"literal",value:"'politicsPodium'"},{name:"literal",value:"'politicsStar'"},{name:"literal",value:"'powerTool'"},{name:"literal",value:"'priceAlerts'"},{name:"literal",value:"'priceAlertsCheck'"},{name:"literal",value:"'primePoduct'"},{name:"literal",value:"'privateClientProduct'"},{name:"literal",value:"'proProduct'"},{name:"literal",value:"'profile'"},{name:"literal",value:"'protection'"},{name:"literal",value:"'pulse'"},{name:"literal",value:"'pyramid'"},{name:"literal",value:"'qrCode'"},{name:"literal",value:"'qrCodeAlt'"},{name:"literal",value:"'queryTransact'"},{name:"literal",value:"'questionMark'"},{name:"literal",value:"'quotation'"},{name:"literal",value:"'rain'"},{name:"literal",value:"'ratingsCheck'"},{name:"literal",value:"'ratingsChecks'"},{name:"literal",value:"'ratingsStar'"},{name:"literal",value:"'reCenter'"},{name:"literal",value:"'rectangle'"},{name:"literal",value:"'recurring'"},{name:"literal",value:"'refresh'"},{name:"literal",value:"'regulated'"},{name:"literal",value:"'regulatedFutures'"},{name:"literal",value:"'report'"},{name:"literal",value:"'rewardsProduct'"},{name:"literal",value:"'ribbon'"},{name:"literal",value:"'robot'"},{name:"literal",value:"'rocket'"},{name:"literal",value:"'rocketShip'"},{name:"literal",value:"'rollingSpot'"},{name:"literal",value:"'rosettaProduct'"},{name:"literal",value:"'rottenTomato'"},{name:"literal",value:"'royalty'"},{name:"literal",value:"'safe'"},{name:"literal",value:"'save'"},{name:"literal",value:"'savingsBank'"},{name:"literal",value:"'scanQrCode'"},{name:"literal",value:"'scienceAtom'"},{name:"literal",value:"'scienceBeaker'"},{name:"literal",value:"'scienceMoon'"},{name:"literal",value:"'search'"},{name:"literal",value:"'securityKey'"},{name:"literal",value:"'securityShield'"},{name:"literal",value:"'seen'"},{name:"literal",value:"'sendReceive'"},{name:"literal",value:"'setPinCode'"},{name:"literal",value:"'settings'"},{name:"literal",value:"'share'"},{name:"literal",value:"'shield'"},{name:"literal",value:"'shieldOutline'"},{name:"literal",value:"'shoe'"},{name:"literal",value:"'shoppingCart'"},{name:"literal",value:"'signinProduct'"},{name:"literal",value:"'singleCoin'"},{name:"literal",value:"'singleNote'"},{name:"literal",value:"'singlecloud'"},{name:"literal",value:"'smartContract'"},{name:"literal",value:"'snow'"},{name:"literal",value:"'soccer'"},{name:"literal",value:"'socialChat'"},{name:"literal",value:"'socialReshare'"},{name:"literal",value:"'socialShare'"},{name:"literal",value:"'sofort'"},{name:"literal",value:"'sortDoubleArrow'"},{name:"literal",value:"'sortDown'"},{name:"literal",value:"'sortDownCenter'"},{name:"literal",value:"'sortUp'"},{name:"literal",value:"'sortUpCenter'"},{name:"literal",value:"'soundOff'"},{name:"literal",value:"'soundOn'"},{name:"literal",value:"'sparkle'"},{name:"literal",value:"'speaker'"},{name:"literal",value:"'speechBubble'"},{name:"literal",value:"'stableCoin'"},{name:"literal",value:"'stablecoinStack'"},{name:"literal",value:"'staggeredList'"},{name:"literal",value:"'stake'"},{name:"literal",value:"'staking'"},{name:"literal",value:"'star'"},{name:"literal",value:"'starAward'"},{name:"literal",value:"'starBubble'"},{name:"literal",value:"'starTrophy'"},{name:"literal",value:"'statusDot'"},{name:"literal",value:"'step0'"},{name:"literal",value:"'step1'"},{name:"literal",value:"'step2'"},{name:"literal",value:"'step3'"},{name:"literal",value:"'step4'"},{name:"literal",value:"'step5'"},{name:"literal",value:"'step6'"},{name:"literal",value:"'step7'"},{name:"literal",value:"'step8'"},{name:"literal",value:"'step9'"},{name:"literal",value:"'strategy'"},{name:"literal",value:"'sun'"},{name:"literal",value:"'support'"},{name:"literal",value:"'tag'"},{name:"literal",value:"'taxes'"},{name:"literal",value:"'taxesReceipt'"},{name:"literal",value:"'telephone'"},{name:"literal",value:"'tennis'"},{name:"literal",value:"'test'"},{name:"literal",value:"'thermometer'"},{name:"literal",value:"'thumbsDown'"},{name:"literal",value:"'thumbsDownOutline'"},{name:"literal",value:"'thumbsUp'"},{name:"literal",value:"'thumbsUpOutline'"},{name:"literal",value:"'tokenLaunchCoin'"},{name:"literal",value:"'tokenLaunchRocket'"},{name:"literal",value:"'tokenSales'"},{name:"literal",value:"'tornado'"},{name:"literal",value:"'trading'"},{name:"literal",value:"'transactions'"},{name:"literal",value:"'trashCan'"},{name:"literal",value:"'trophy'"},{name:"literal",value:"'trophyCup'"},{name:"literal",value:"'tshirt'"},{name:"literal",value:"'tv'"},{name:"literal",value:"'tvStand'"},{name:"literal",value:"'twitterLogo'"},{name:"literal",value:"'ultility'"},{name:"literal",value:"'umbrella'"},{name:"literal",value:"'undo'"},{name:"literal",value:"'unfollowPeople'"},{name:"literal",value:"'unknown'"},{name:"literal",value:"'unlock'"},{name:"literal",value:"'upArrow'"},{name:"literal",value:"'upload'"},{name:"literal",value:"'venturesProduct'"},{name:"literal",value:"'verifiedBadge'"},{name:"literal",value:"'verifiedPools'"},{name:"literal",value:"'verticalLine'"},{name:"literal",value:"'virus'"},{name:"literal",value:"'visible'"},{name:"literal",value:"'waasProduct'"},{name:"literal",value:"'wallet'"},{name:"literal",value:"'walletLogo'"},{name:"literal",value:"'walletProduct'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'webhooks'"},{name:"literal",value:"'wellness'"},{name:"literal",value:"'wifi'"},{name:"literal",value:"'wind'"},{name:"literal",value:"'wireTransfer'"},{name:"literal",value:"'withdraw'"},{name:"literal",value:"'wrapToken'"},{name:"literal",value:"'xLogo'"}],required:!0},description:"Icon to render at the end of the button."},{key:"endIconActive",value:{name:"boolean",required:!1},description:"Whether the end icon is active"},{key:"flush",value:{name:"union",raw:"'start' | 'end'",elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'end'"}],required:!1},description:`Ensure the button aligns flush on the left or right.
This prop will translate the entire button left/right,
so take care to ensure it is not overflowing awkwardly`},{key:"name",value:{name:"string",required:!1},description:"Uniquely identify the button within a form."},{key:"noScaleOnPress",value:{name:"boolean",required:!1},description:"Don't scale element on press."},{key:"numberOfLines",value:{name:"number",required:!1},description:`Truncates text after wrapping to a defined number of lines.
@default 1`}]}}]}],raw:`Polymorphic.ExtendableProps<
  PressableBaseProps,
  SharedProps &
    Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
      /**
       * Toggle design and visual variants.
       * @default primary
       */
      variant?: ButtonVariant;
      /** Mark the button as disabled. */
      disabled?: boolean;
      /** Mark the button as loading and display a spinner. */
      loading?: boolean;
      /** Mark the background and border as transparent until interacted with. */
      transparent?: boolean;
      /** Change to block and expand to 100% of parent width. */
      block?: boolean;
      /** Reduce the inner padding within the button itself. */
      compact?: boolean;
      /** Children to render within the button. */
      children: React.ReactNode;
      /** Set the start node */
      start?: React.ReactNode;
      /** Icon to render at the start of the button. */
      startIcon?: IconName;
      /** Whether the start icon is active */
      startIconActive?: boolean;
      /** Set the end node */
      end?: React.ReactNode;
      /** Icon to render at the end of the button. */
      endIcon?: IconName;
      /** Whether the end icon is active */
      endIconActive?: boolean;
      /** Ensure the button aligns flush on the left or right.
       * This prop will translate the entire button left/right,
       * so take care to ensure it is not overflowing awkwardly
       */
      flush?: 'start' | 'end';
      /** Uniquely identify the button within a form. */
      name?: string;
      /** Don't scale element on press. */
      noScaleOnPress?: boolean;
      /**
       * Truncates text after wrapping to a defined number of lines.
       * @default 1
       */
      numberOfLines?: number;
    }
>`},{name:"union",raw:"'disabled' | 'transparent' | 'compact' | 'flush'",elements:[{name:"literal",value:"'disabled'"},{name:"literal",value:"'transparent'"},{name:"literal",value:"'compact'"},{name:"literal",value:"'flush'"}]}],raw:"Pick<ButtonBaseProps, 'disabled' | 'transparent' | 'compact' | 'flush'>"},{name:"signature",type:"object",raw:`{
  /** Name of the icon, as defined in Figma. */
  name: IconName;
  /** Whether the icon is active */
  active?: boolean;
  /**
   * Toggle design and visual variants.
   * @default primary
   */
  variant?: IconButtonVariant;
}`,signature:{properties:[{key:"name",value:{name:"union",raw:`| 'account'
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
| 'xLogo'`,elements:[{name:"literal",value:"'account'"},{name:"literal",value:"'activity'"},{name:"literal",value:"'add'"},{name:"literal",value:"'addPeople'"},{name:"literal",value:"'advancedMarketSelector'"},{name:"literal",value:"'advancedTradeProduct'"},{name:"literal",value:"'affiliates'"},{name:"literal",value:"'airdrop'"},{name:"literal",value:"'airdropAlt'"},{name:"literal",value:"'airdropCoins'"},{name:"literal",value:"'airdropParachute'"},{name:"literal",value:"'alien'"},{name:"literal",value:"'allTimeHigh'"},{name:"literal",value:"'allocation'"},{name:"literal",value:"'annotation'"},{name:"literal",value:"'api'"},{name:"literal",value:"'apiPlug'"},{name:"literal",value:"'apothecary'"},{name:"literal",value:"'appSwitcher'"},{name:"literal",value:"'apple'"},{name:"literal",value:"'appleLogo'"},{name:"literal",value:"'application'"},{name:"literal",value:"'arrowDown'"},{name:"literal",value:"'arrowLeft'"},{name:"literal",value:"'arrowRight'"},{name:"literal",value:"'arrowUp'"},{name:"literal",value:"'arrowsHorizontal'"},{name:"literal",value:"'arrowsUpDown'"},{name:"literal",value:"'arrowsVertical'"},{name:"literal",value:"'artwork'"},{name:"literal",value:"'assetHubProduct'"},{name:"literal",value:"'assetManagementProduct'"},{name:"literal",value:"'astronautHelmet'"},{name:"literal",value:"'atSign'"},{name:"literal",value:"'atomScience'"},{name:"literal",value:"'auto'"},{name:"literal",value:"'autoCar'"},{name:"literal",value:"'avatar'"},{name:"literal",value:"'average'"},{name:"literal",value:"'backArrow'"},{name:"literal",value:"'ballot'"},{name:"literal",value:"'ballotbox'"},{name:"literal",value:"'bandage'"},{name:"literal",value:"'bank'"},{name:"literal",value:"'barChartSimple'"},{name:"literal",value:"'barChartWindow'"},{name:"literal",value:"'base'"},{name:"literal",value:"'baseApps'"},{name:"literal",value:"'baseFeed'"},{name:"literal",value:"'baseNotification'"},{name:"literal",value:"'baseQuickBuy'"},{name:"literal",value:"'baseSquare'"},{name:"literal",value:"'baseTransact'"},{name:"literal",value:"'baseVerification'"},{name:"literal",value:"'baseWallet'"},{name:"literal",value:"'baseball'"},{name:"literal",value:"'basketball'"},{name:"literal",value:"'beaker'"},{name:"literal",value:"'beginningArrow'"},{name:"literal",value:"'bell'"},{name:"literal",value:"'bellCheck'"},{name:"literal",value:"'bellPlus'"},{name:"literal",value:"'birthcertificate'"},{name:"literal",value:"'block'"},{name:"literal",value:"'blockchain'"},{name:"literal",value:"'blog'"},{name:"literal",value:"'book'"},{name:"literal",value:"'bookmark'"},{name:"literal",value:"'borrowProduct'"},{name:"literal",value:"'boxing'"},{name:"literal",value:"'bridging'"},{name:"literal",value:"'briefcase'"},{name:"literal",value:"'briefcaseAlt'"},{name:"literal",value:"'browser'"},{name:"literal",value:"'bug'"},{name:"literal",value:"'building'"},{name:"literal",value:"'calculator'"},{name:"literal",value:"'calendar'"},{name:"literal",value:"'calendarBlank'"},{name:"literal",value:"'calendarDates'"},{name:"literal",value:"'calendarEmpty'"},{name:"literal",value:"'calendarHeart'"},{name:"literal",value:"'calendarMoney'"},{name:"literal",value:"'calendarStar'"},{name:"literal",value:"'camera'"},{name:"literal",value:"'candlesticks'"},{name:"literal",value:"'car'"},{name:"literal",value:"'card'"},{name:"literal",value:"'caret'"},{name:"literal",value:"'caretDown'"},{name:"literal",value:"'caretLeft'"},{name:"literal",value:"'caretRight'"},{name:"literal",value:"'caretUp'"},{name:"literal",value:"'cash'"},{name:"literal",value:"'cashAustralianDollar'"},{name:"literal",value:"'cashBrazilianReal'"},{name:"literal",value:"'cashBrazillianReal'"},{name:"literal",value:"'cashCanadianDollar'"},{name:"literal",value:"'cashCoins'"},{name:"literal",value:"'cashEUR'"},{name:"literal",value:"'cashGBP'"},{name:"literal",value:"'cashIndonesianRupiah'"},{name:"literal",value:"'cashJPY'"},{name:"literal",value:"'cashPhilippinePeso'"},{name:"literal",value:"'cashPolishZloty'"},{name:"literal",value:"'cashRupee'"},{name:"literal",value:"'cashSingaporeDollar'"},{name:"literal",value:"'cashSwissFranc'"},{name:"literal",value:"'cashThaiBaht'"},{name:"literal",value:"'cashTurkishLira'"},{name:"literal",value:"'cashUSD'"},{name:"literal",value:"'cashUaeDirham'"},{name:"literal",value:"'cashVietnameseDong'"},{name:"literal",value:"'chainLink'"},{name:"literal",value:"'chartBar'"},{name:"literal",value:"'chartCandles'"},{name:"literal",value:"'chartLine'"},{name:"literal",value:"'chartPie'"},{name:"literal",value:"'chartPieCircle'"},{name:"literal",value:"'chartVolume'"},{name:"literal",value:"'chatBotAgent'"},{name:"literal",value:"'chatBubble'"},{name:"literal",value:"'chatRequests'"},{name:"literal",value:"'checkboxChecked'"},{name:"literal",value:"'checkboxEmpty'"},{name:"literal",value:"'checkmark'"},{name:"literal",value:"'chess'"},{name:"literal",value:"'circleCheckmark'"},{name:"literal",value:"'circleCross'"},{name:"literal",value:"'circulatingSupply'"},{name:"literal",value:"'city'"},{name:"literal",value:"'clipboard'"},{name:"literal",value:"'clock'"},{name:"literal",value:"'clockOutline'"},{name:"literal",value:"'close'"},{name:"literal",value:"'closeCaption'"},{name:"literal",value:"'clothing'"},{name:"literal",value:"'cloud'"},{name:"literal",value:"'cloudPartial'"},{name:"literal",value:"'cloudProduct'"},{name:"literal",value:"'cluster'"},{name:"literal",value:"'coinbase'"},{name:"literal",value:"'coinbaseCardProduct'"},{name:"literal",value:"'coinbaseOne'"},{name:"literal",value:"'coinbaseOneCard'"},{name:"literal",value:"'coinbaseOneLogo'"},{name:"literal",value:"'coinbaseRewards'"},{name:"literal",value:"'coinsCrypto'"},{name:"literal",value:"'collapse'"},{name:"literal",value:"'collectibles'"},{name:"literal",value:"'collection'"},{name:"literal",value:"'comment'"},{name:"literal",value:"'commentPlus'"},{name:"literal",value:"'commerceProduct'"},{name:"literal",value:"'compass'"},{name:"literal",value:"'complianceProduct'"},{name:"literal",value:"'compose'"},{name:"literal",value:"'computerChip'"},{name:"literal",value:"'concierge'"},{name:"literal",value:"'conciergeBell'"},{name:"literal",value:"'config'"},{name:"literal",value:"'continuous'"},{name:"literal",value:"'convert'"},{name:"literal",value:"'copy'"},{name:"literal",value:"'corporation'"},{name:"literal",value:"'creatorCoin'"},{name:"literal",value:"'cricket'"},{name:"literal",value:"'cross'"},{name:"literal",value:"'crossTrade'"},{name:"literal",value:"'crypto'"},{name:"literal",value:"'cryptobasics'"},{name:"literal",value:"'crystalBall'"},{name:"literal",value:"'crystalBallInsight'"},{name:"literal",value:"'currencies'"},{name:"literal",value:"'custodyProduct'"},{name:"literal",value:"'dashboard'"},{name:"literal",value:"'dataMarketplaceProduct'"},{name:"literal",value:"'dataStack'"},{name:"literal",value:"'defi'"},{name:"literal",value:"'delegateProduct'"},{name:"literal",value:"'deposit'"},{name:"literal",value:"'derivatives'"},{name:"literal",value:"'derivativesProduct'"},{name:"literal",value:"'derivativesProductNew'"},{name:"literal",value:"'developerAPIProduct'"},{name:"literal",value:"'developerPlatformProduct'"},{name:"literal",value:"'dex'"},{name:"literal",value:"'diagonalDownArrow'"},{name:"literal",value:"'diagonalRightArrow'"},{name:"literal",value:"'diagonalUpArrow'"},{name:"literal",value:"'diamond'"},{name:"literal",value:"'diamondIncentives'"},{name:"literal",value:"'dinnerPlate'"},{name:"literal",value:"'directDeposit'"},{name:"literal",value:"'directDepositIcon'"},{name:"literal",value:"'disabledPhone'"},{name:"literal",value:"'discordLogo'"},{name:"literal",value:"'distribution'"},{name:"literal",value:"'document'"},{name:"literal",value:"'documentation'"},{name:"literal",value:"'dot'"},{name:"literal",value:"'doubleChevronRight'"},{name:"literal",value:"'downArrow'"},{name:"literal",value:"'download'"},{name:"literal",value:"'drag'"},{name:"literal",value:"'drops'"},{name:"literal",value:"'earn'"},{name:"literal",value:"'earnProduct'"},{name:"literal",value:"'earnRewards'"},{name:"literal",value:"'earthquake'"},{name:"literal",value:"'educationBook'"},{name:"literal",value:"'educationPencil'"},{name:"literal",value:"'email'"},{name:"literal",value:"'endArrow'"},{name:"literal",value:"'entertainment'"},{name:"literal",value:"'error'"},{name:"literal",value:"'ethereum'"},{name:"literal",value:"'eventContracts'"},{name:"literal",value:"'exchangeProduct'"},{name:"literal",value:"'exclamationMark'"},{name:"literal",value:"'expand'"},{name:"literal",value:"'expandAddress'"},{name:"literal",value:"'expandAll'"},{name:"literal",value:"'externalLink'"},{name:"literal",value:"'eye'"},{name:"literal",value:"'faceScan'"},{name:"literal",value:"'faces'"},{name:"literal",value:"'factory'"},{name:"literal",value:"'faucet'"},{name:"literal",value:"'fib'"},{name:"literal",value:"'filmStrip'"},{name:"literal",value:"'filter'"},{name:"literal",value:"'fingerprint'"},{name:"literal",value:"'flame'"},{name:"literal",value:"'folder'"},{name:"literal",value:"'folderArrow'"},{name:"literal",value:"'folderOpen'"},{name:"literal",value:"'followAdd'"},{name:"literal",value:"'following'"},{name:"literal",value:"'football'"},{name:"literal",value:"'fork'"},{name:"literal",value:"'forwardArrow'"},{name:"literal",value:"'fscsProtection'"},{name:"literal",value:"'gab'"},{name:"literal",value:"'games'"},{name:"literal",value:"'gaming'"},{name:"literal",value:"'gasFees'"},{name:"literal",value:"'gasFeesAlt'"},{name:"literal",value:"'gauge'"},{name:"literal",value:"'gaugeEmpty'"},{name:"literal",value:"'gaugeHigh'"},{name:"literal",value:"'gaugeHighLow'"},{name:"literal",value:"'gaugeHighMid'"},{name:"literal",value:"'gaugeLow'"},{name:"literal",value:"'gaugeLowHigh'"},{name:"literal",value:"'gaugeLowMid'"},{name:"literal",value:"'gaugeMedium'"},{name:"literal",value:"'gavel'"},{name:"literal",value:"'gear'"},{name:"literal",value:"'generalCharacter'"},{name:"literal",value:"'ghost'"},{name:"literal",value:"'gif'"},{name:"literal",value:"'giftBox'"},{name:"literal",value:"'giftCard'"},{name:"literal",value:"'gitHubLogo'"},{name:"literal",value:"'globe'"},{name:"literal",value:"'golf'"},{name:"literal",value:"'googleLogo'"},{name:"literal",value:"'greenEnergy'"},{name:"literal",value:"'grid'"},{name:"literal",value:"'group'"},{name:"literal",value:"'hamburger'"},{name:"literal",value:"'hammer'"},{name:"literal",value:"'heart'"},{name:"literal",value:"'helpCenterProduct'"},{name:"literal",value:"'helpCenterQuestionMark'"},{name:"literal",value:"'hiddenEye'"},{name:"literal",value:"'hockey'"},{name:"literal",value:"'home'"},{name:"literal",value:"'horizontalLine'"},{name:"literal",value:"'hospital'"},{name:"literal",value:"'hospitalCross'"},{name:"literal",value:"'hurricane'"},{name:"literal",value:"'ideal'"},{name:"literal",value:"'identityCard'"},{name:"literal",value:"'image'"},{name:"literal",value:"'info'"},{name:"literal",value:"'initiator'"},{name:"literal",value:"'instagramLogo'"},{name:"literal",value:"'instantUnstakingClock'"},{name:"literal",value:"'institute'"},{name:"literal",value:"'institutionalProduct'"},{name:"literal",value:"'interest'"},{name:"literal",value:"'invisible'"},{name:"literal",value:"'invoice'"},{name:"literal",value:"'key'"},{name:"literal",value:"'keyboard'"},{name:"literal",value:"'laptop'"},{name:"literal",value:"'leadChart'"},{name:"literal",value:"'leadCoin'"},{name:"literal",value:"'learningRewardsProduct'"},{name:"literal",value:"'light'"},{name:"literal",value:"'lightbulb'"},{name:"literal",value:"'lightning'"},{name:"literal",value:"'lightningBolt'"},{name:"literal",value:"'lineChartCrypto'"},{name:"literal",value:"'list'"},{name:"literal",value:"'location'"},{name:"literal",value:"'lock'"},{name:"literal",value:"'login'"},{name:"literal",value:"'logout'"},{name:"literal",value:"'loop'"},{name:"literal",value:"'magnifyingGlass'"},{name:"literal",value:"'marketCap'"},{name:"literal",value:"'medal'"},{name:"literal",value:"'megaphone'"},{name:"literal",value:"'menu'"},{name:"literal",value:"'metaverse'"},{name:"literal",value:"'microphone'"},{name:"literal",value:"'microphoneCordless'"},{name:"literal",value:"'microscope'"},{name:"literal",value:"'mint'"},{name:"literal",value:"'minus'"},{name:"literal",value:"'mma'"},{name:"literal",value:"'moneyCardCoin'"},{name:"literal",value:"'moon'"},{name:"literal",value:"'more'"},{name:"literal",value:"'moreVertical'"},{name:"literal",value:"'motorsport'"},{name:"literal",value:"'music'"},{name:"literal",value:"'musicArticles'"},{name:"literal",value:"'needle'"},{name:"literal",value:"'newsFeed'"},{name:"literal",value:"'newsletter'"},{name:"literal",value:"'nft'"},{name:"literal",value:"'nftBuy'"},{name:"literal",value:"'nftOffer'"},{name:"literal",value:"'nftProduct'"},{name:"literal",value:"'nftSale'"},{name:"literal",value:"'noRocket'"},{name:"literal",value:"'noWifi'"},{name:"literal",value:"'nodeProduct'"},{name:"literal",value:"'oil'"},{name:"literal",value:"'options'"},{name:"literal",value:"'orderBook'"},{name:"literal",value:"'orderHistory'"},{name:"literal",value:"'outline'"},{name:"literal",value:"'pFPS'"},{name:"literal",value:"'paperAirplane'"},{name:"literal",value:"'paperclip'"},{name:"literal",value:"'participate'"},{name:"literal",value:"'participateProduct'"},{name:"literal",value:"'passKey'"},{name:"literal",value:"'passport'"},{name:"literal",value:"'pause'"},{name:"literal",value:"'pay'"},{name:"literal",value:"'payProduct'"},{name:"literal",value:"'paymentCard'"},{name:"literal",value:"'payments'"},{name:"literal",value:"'payouts'"},{name:"literal",value:"'paypal'"},{name:"literal",value:"'pencil'"},{name:"literal",value:"'peopleGroup'"},{name:"literal",value:"'peopleStar'"},{name:"literal",value:"'percentage'"},{name:"literal",value:"'perpetualSwap'"},{name:"literal",value:"'phone'"},{name:"literal",value:"'pieChartData'"},{name:"literal",value:"'pillBottle'"},{name:"literal",value:"'pillCapsule'"},{name:"literal",value:"'pin'"},{name:"literal",value:"'plane'"},{name:"literal",value:"'planet'"},{name:"literal",value:"'play'"},{name:"literal",value:"'playbutton'"},{name:"literal",value:"'plusMinus'"},{name:"literal",value:"'podiumStar'"},{name:"literal",value:"'politicsBuilding'"},{name:"literal",value:"'politicsCandidate'"},{name:"literal",value:"'politicsFlag'"},{name:"literal",value:"'politicsGavel'"},{name:"literal",value:"'politicsPodium'"},{name:"literal",value:"'politicsStar'"},{name:"literal",value:"'powerTool'"},{name:"literal",value:"'priceAlerts'"},{name:"literal",value:"'priceAlertsCheck'"},{name:"literal",value:"'primePoduct'"},{name:"literal",value:"'privateClientProduct'"},{name:"literal",value:"'proProduct'"},{name:"literal",value:"'profile'"},{name:"literal",value:"'protection'"},{name:"literal",value:"'pulse'"},{name:"literal",value:"'pyramid'"},{name:"literal",value:"'qrCode'"},{name:"literal",value:"'qrCodeAlt'"},{name:"literal",value:"'queryTransact'"},{name:"literal",value:"'questionMark'"},{name:"literal",value:"'quotation'"},{name:"literal",value:"'rain'"},{name:"literal",value:"'ratingsCheck'"},{name:"literal",value:"'ratingsChecks'"},{name:"literal",value:"'ratingsStar'"},{name:"literal",value:"'reCenter'"},{name:"literal",value:"'rectangle'"},{name:"literal",value:"'recurring'"},{name:"literal",value:"'refresh'"},{name:"literal",value:"'regulated'"},{name:"literal",value:"'regulatedFutures'"},{name:"literal",value:"'report'"},{name:"literal",value:"'rewardsProduct'"},{name:"literal",value:"'ribbon'"},{name:"literal",value:"'robot'"},{name:"literal",value:"'rocket'"},{name:"literal",value:"'rocketShip'"},{name:"literal",value:"'rollingSpot'"},{name:"literal",value:"'rosettaProduct'"},{name:"literal",value:"'rottenTomato'"},{name:"literal",value:"'royalty'"},{name:"literal",value:"'safe'"},{name:"literal",value:"'save'"},{name:"literal",value:"'savingsBank'"},{name:"literal",value:"'scanQrCode'"},{name:"literal",value:"'scienceAtom'"},{name:"literal",value:"'scienceBeaker'"},{name:"literal",value:"'scienceMoon'"},{name:"literal",value:"'search'"},{name:"literal",value:"'securityKey'"},{name:"literal",value:"'securityShield'"},{name:"literal",value:"'seen'"},{name:"literal",value:"'sendReceive'"},{name:"literal",value:"'setPinCode'"},{name:"literal",value:"'settings'"},{name:"literal",value:"'share'"},{name:"literal",value:"'shield'"},{name:"literal",value:"'shieldOutline'"},{name:"literal",value:"'shoe'"},{name:"literal",value:"'shoppingCart'"},{name:"literal",value:"'signinProduct'"},{name:"literal",value:"'singleCoin'"},{name:"literal",value:"'singleNote'"},{name:"literal",value:"'singlecloud'"},{name:"literal",value:"'smartContract'"},{name:"literal",value:"'snow'"},{name:"literal",value:"'soccer'"},{name:"literal",value:"'socialChat'"},{name:"literal",value:"'socialReshare'"},{name:"literal",value:"'socialShare'"},{name:"literal",value:"'sofort'"},{name:"literal",value:"'sortDoubleArrow'"},{name:"literal",value:"'sortDown'"},{name:"literal",value:"'sortDownCenter'"},{name:"literal",value:"'sortUp'"},{name:"literal",value:"'sortUpCenter'"},{name:"literal",value:"'soundOff'"},{name:"literal",value:"'soundOn'"},{name:"literal",value:"'sparkle'"},{name:"literal",value:"'speaker'"},{name:"literal",value:"'speechBubble'"},{name:"literal",value:"'stableCoin'"},{name:"literal",value:"'stablecoinStack'"},{name:"literal",value:"'staggeredList'"},{name:"literal",value:"'stake'"},{name:"literal",value:"'staking'"},{name:"literal",value:"'star'"},{name:"literal",value:"'starAward'"},{name:"literal",value:"'starBubble'"},{name:"literal",value:"'starTrophy'"},{name:"literal",value:"'statusDot'"},{name:"literal",value:"'step0'"},{name:"literal",value:"'step1'"},{name:"literal",value:"'step2'"},{name:"literal",value:"'step3'"},{name:"literal",value:"'step4'"},{name:"literal",value:"'step5'"},{name:"literal",value:"'step6'"},{name:"literal",value:"'step7'"},{name:"literal",value:"'step8'"},{name:"literal",value:"'step9'"},{name:"literal",value:"'strategy'"},{name:"literal",value:"'sun'"},{name:"literal",value:"'support'"},{name:"literal",value:"'tag'"},{name:"literal",value:"'taxes'"},{name:"literal",value:"'taxesReceipt'"},{name:"literal",value:"'telephone'"},{name:"literal",value:"'tennis'"},{name:"literal",value:"'test'"},{name:"literal",value:"'thermometer'"},{name:"literal",value:"'thumbsDown'"},{name:"literal",value:"'thumbsDownOutline'"},{name:"literal",value:"'thumbsUp'"},{name:"literal",value:"'thumbsUpOutline'"},{name:"literal",value:"'tokenLaunchCoin'"},{name:"literal",value:"'tokenLaunchRocket'"},{name:"literal",value:"'tokenSales'"},{name:"literal",value:"'tornado'"},{name:"literal",value:"'trading'"},{name:"literal",value:"'transactions'"},{name:"literal",value:"'trashCan'"},{name:"literal",value:"'trophy'"},{name:"literal",value:"'trophyCup'"},{name:"literal",value:"'tshirt'"},{name:"literal",value:"'tv'"},{name:"literal",value:"'tvStand'"},{name:"literal",value:"'twitterLogo'"},{name:"literal",value:"'ultility'"},{name:"literal",value:"'umbrella'"},{name:"literal",value:"'undo'"},{name:"literal",value:"'unfollowPeople'"},{name:"literal",value:"'unknown'"},{name:"literal",value:"'unlock'"},{name:"literal",value:"'upArrow'"},{name:"literal",value:"'upload'"},{name:"literal",value:"'venturesProduct'"},{name:"literal",value:"'verifiedBadge'"},{name:"literal",value:"'verifiedPools'"},{name:"literal",value:"'verticalLine'"},{name:"literal",value:"'virus'"},{name:"literal",value:"'visible'"},{name:"literal",value:"'waasProduct'"},{name:"literal",value:"'wallet'"},{name:"literal",value:"'walletLogo'"},{name:"literal",value:"'walletProduct'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'webhooks'"},{name:"literal",value:"'wellness'"},{name:"literal",value:"'wifi'"},{name:"literal",value:"'wind'"},{name:"literal",value:"'wireTransfer'"},{name:"literal",value:"'withdraw'"},{name:"literal",value:"'wrapToken'"},{name:"literal",value:"'xLogo'"}],required:!0},description:"Name of the icon, as defined in Figma."},{key:"active",value:{name:"boolean",required:!1},description:"Whether the icon is active"},{key:"variant",value:{name:"union",raw:`| 'primary'
| 'secondary'
| 'tertiary'
| 'positive'
| 'negative'
| 'foregroundMuted'`,elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"},{name:"literal",value:"'tertiary'"},{name:"literal",value:"'positive'"},{name:"literal",value:"'negative'"},{name:"literal",value:"'foregroundMuted'"}],required:!1},description:`Toggle design and visual variants.
@default primary`}]}}]}],raw:`Polymorphic.ExtendableProps<
  Omit<PressableBaseProps, 'children'>,
  Pick<ButtonBaseProps, 'disabled' | 'transparent' | 'compact' | 'flush'> & {
    /** Name of the icon, as defined in Figma. */
    name: IconName;
    /** Whether the icon is active */
    active?: boolean;
    /**
     * Toggle design and visual variants.
     * @default primary
     */
    variant?: IconButtonVariant;
  }
>`},{name:"literal",value:"'name'"}],raw:"Omit<IconButtonBaseProps, 'name'>"},description:""},cta:{required:!1,tsType:{name:"Polymorphic.ExtendableProps",elements:[{name:"Polymorphic.ExtendableProps",elements:[{name:"Polymorphic.ExtendableProps",elements:[{name:"intersection",raw:`StyleProps &
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
  /** Apply class names to the outer container. */
  className?: string;
  /** Background color of the overlay (element being interacted with). */
  background?: ThemeVars.Color;
  /** Set element to block and expand to 100% width. */
  block?: boolean;
  /** Border color of the element. */
  borderColor?: ThemeVars.Color;
  /** Is the element currently disabled. */
  disabled?: boolean;
  /**
   * Is the element currenty loading.
   * When set to true, will disable element from press and keyboard events
   */
  loading?: boolean;
  /** Is the element being pressed. Primarily a mobile feature, but can be used on the web. */
  pressed?: boolean;
  /**
   * Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
   * Must be used in conjunction with the "pressed" prop
   */
  transparentWhileInactive?: boolean;
  /**
   * Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
   * Must be used in conjunction with the "pressed" prop
   */
  transparentWhilePressed?: boolean;
  blendStyles?: InteractableBlendStyles;
}`,signature:{properties:[{key:"className",value:{name:"string",required:!1},description:"Apply class names to the outer container."},{key:"background",value:{name:"ThemeVars.Color",required:!1},description:"Background color of the overlay (element being interacted with)."},{key:"block",value:{name:"boolean",required:!1},description:"Set element to block and expand to 100% width."},{key:"borderColor",value:{name:"ThemeVars.Color",required:!1},description:"Border color of the element."},{key:"disabled",value:{name:"boolean",required:!1},description:"Is the element currently disabled."},{key:"loading",value:{name:"boolean",required:!1},description:`Is the element currenty loading.
When set to true, will disable element from press and keyboard events`},{key:"pressed",value:{name:"boolean",required:!1},description:"Is the element being pressed. Primarily a mobile feature, but can be used on the web."},{key:"transparentWhileInactive",value:{name:"boolean",required:!1},description:`Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
Must be used in conjunction with the "pressed" prop`},{key:"transparentWhilePressed",value:{name:"boolean",required:!1},description:`Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
Must be used in conjunction with the "pressed" prop`},{key:"blendStyles",value:{name:"signature",type:"object",raw:`{
  background?: string;
  pressedBackground?: string;
  disabledBackground?: string;
  hoveredBackground?: string;
  borderColor?: string;
  pressedBorderColor?: string;
  disabledBorderColor?: string;
  hoveredBorderColor?: string;
  /**
   * The opacity of the element when hovered.
   * @default 0.88
   */
  hoveredOpacity?: number;
  /**
   * The opacity of the element when pressed.
   * @default 0.82
   */
  pressedOpacity?: number;
  /**
   * The opacity of the element when disabled.
   * @default 0.75
   */
  disabledOpacity?: number;
}`,signature:{properties:[{key:"background",value:{name:"string",required:!1}},{key:"pressedBackground",value:{name:"string",required:!1}},{key:"disabledBackground",value:{name:"string",required:!1}},{key:"hoveredBackground",value:{name:"string",required:!1}},{key:"borderColor",value:{name:"string",required:!1}},{key:"pressedBorderColor",value:{name:"string",required:!1}},{key:"disabledBorderColor",value:{name:"string",required:!1}},{key:"hoveredBorderColor",value:{name:"string",required:!1}},{key:"hoveredOpacity",value:{name:"number",required:!1},description:`The opacity of the element when hovered.
@default 0.88`},{key:"pressedOpacity",value:{name:"number",required:!1},description:`The opacity of the element when pressed.
@default 0.82`},{key:"disabledOpacity",value:{name:"number",required:!1},description:`The opacity of the element when disabled.
@default 0.75`}]},required:!1}}]}}],raw:`Polymorphic.ExtendableProps<
  BoxBaseProps,
  {
    /** Apply class names to the outer container. */
    className?: string;
    /** Background color of the overlay (element being interacted with). */
    background?: ThemeVars.Color;
    /** Set element to block and expand to 100% width. */
    block?: boolean;
    /** Border color of the element. */
    borderColor?: ThemeVars.Color;
    /** Is the element currently disabled. */
    disabled?: boolean;
    /**
     * Is the element currenty loading.
     * When set to true, will disable element from press and keyboard events
     */
    loading?: boolean;
    /** Is the element being pressed. Primarily a mobile feature, but can be used on the web. */
    pressed?: boolean;
    /**
     * Mark the background and border as transparent until the element is interacted with (hovered, pressed, etc).
     * Must be used in conjunction with the "pressed" prop
     */
    transparentWhileInactive?: boolean;
    /**
     * Mark the background and border as transparent even while element is interacted with (elevation underlay issue).
     * Must be used in conjunction with the "pressed" prop
     */
    transparentWhilePressed?: boolean;
    blendStyles?: InteractableBlendStyles;
  }
>`},{name:"intersection",raw:`ComponentEventHandlerProps & {
  /** Dont scale element on press. */
  noScaleOnPress?: boolean;
  focusable?: boolean;
}`,elements:[{name:"signature",type:"object",raw:`{
  eventConfig?: EventHandlerCustomConfig;
  analyticsId?: string;
}`,signature:{properties:[{key:"eventConfig",value:{name:"signature",type:"object",raw:`{
  actions: EventHandlerAction[];
  componentName: string;
  data?: EventCustomData;
}`,signature:{properties:[{key:"actions",value:{name:"Array",elements:[{name:"string"}],raw:"EventHandlerAction[]",required:!0}},{key:"componentName",value:{name:"string",required:!0}},{key:"data",value:{name:"Record",elements:[{name:"string"},{name:"union",raw:"T | Record<string, T>",elements:[{name:"union",raw:"EventDataEntryTypes | EventDataEntryTypes[]",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]},{name:"Array",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]}],raw:"EventDataEntryTypes[]"}]},{name:"Record",elements:[{name:"string"},{name:"union",raw:"EventDataEntryTypes | EventDataEntryTypes[]",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]},{name:"Array",elements:[{name:"union",raw:"string | number | boolean | null | undefined",elements:[{name:"string"},{name:"number"},{name:"boolean"},{name:"null"},{name:"undefined"}]}],raw:"EventDataEntryTypes[]"}]}],raw:"Record<string, T>"}]}],raw:"Record<string, RecursiveMapType<EventDataEntry>>",required:!1}}]},required:!1}},{key:"analyticsId",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
  /** Dont scale element on press. */
  noScaleOnPress?: boolean;
  focusable?: boolean;
}`,signature:{properties:[{key:"noScaleOnPress",value:{name:"boolean",required:!1},description:"Dont scale element on press."},{key:"focusable",value:{name:"boolean",required:!1}}]}}]}],raw:`Polymorphic.ExtendableProps<
  InteractableBaseProps,
  ComponentEventHandlerProps & {
    /** Dont scale element on press. */
    noScaleOnPress?: boolean;
    focusable?: boolean;
  }
>`},{name:"intersection",raw:`SharedProps &
Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
  /**
   * Toggle design and visual variants.
   * @default primary
   */
  variant?: ButtonVariant;
  /** Mark the button as disabled. */
  disabled?: boolean;
  /** Mark the button as loading and display a spinner. */
  loading?: boolean;
  /** Mark the background and border as transparent until interacted with. */
  transparent?: boolean;
  /** Change to block and expand to 100% of parent width. */
  block?: boolean;
  /** Reduce the inner padding within the button itself. */
  compact?: boolean;
  /** Children to render within the button. */
  children: React.ReactNode;
  /** Set the start node */
  start?: React.ReactNode;
  /** Icon to render at the start of the button. */
  startIcon?: IconName;
  /** Whether the start icon is active */
  startIconActive?: boolean;
  /** Set the end node */
  end?: React.ReactNode;
  /** Icon to render at the end of the button. */
  endIcon?: IconName;
  /** Whether the end icon is active */
  endIconActive?: boolean;
  /** Ensure the button aligns flush on the left or right.
   * This prop will translate the entire button left/right,
   * so take care to ensure it is not overflowing awkwardly
   */
  flush?: 'start' | 'end';
  /** Uniquely identify the button within a form. */
  name?: string;
  /** Don't scale element on press. */
  noScaleOnPress?: boolean;
  /**
   * Truncates text after wrapping to a defined number of lines.
   * @default 1
   */
  numberOfLines?: number;
}`,elements:[{name:"signature",type:"object",raw:`{
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
eg: a Button that controls the visibility of a Modal`},{key:"accessibilityLabelId",value:{name:"string",required:!1},description:"Used to associate a label with an input for accessibility"},{key:"accessibilityDescriptionId",value:{name:"string",required:!1},description:"Used to associate descriptive text to an input for accessibility"}]}},{name:"literal",value:"'accessibilityLabel'"}],raw:"Pick<SharedAccessibilityProps, 'accessibilityLabel'>"},{name:"signature",type:"object",raw:`{
  /**
   * Toggle design and visual variants.
   * @default primary
   */
  variant?: ButtonVariant;
  /** Mark the button as disabled. */
  disabled?: boolean;
  /** Mark the button as loading and display a spinner. */
  loading?: boolean;
  /** Mark the background and border as transparent until interacted with. */
  transparent?: boolean;
  /** Change to block and expand to 100% of parent width. */
  block?: boolean;
  /** Reduce the inner padding within the button itself. */
  compact?: boolean;
  /** Children to render within the button. */
  children: React.ReactNode;
  /** Set the start node */
  start?: React.ReactNode;
  /** Icon to render at the start of the button. */
  startIcon?: IconName;
  /** Whether the start icon is active */
  startIconActive?: boolean;
  /** Set the end node */
  end?: React.ReactNode;
  /** Icon to render at the end of the button. */
  endIcon?: IconName;
  /** Whether the end icon is active */
  endIconActive?: boolean;
  /** Ensure the button aligns flush on the left or right.
   * This prop will translate the entire button left/right,
   * so take care to ensure it is not overflowing awkwardly
   */
  flush?: 'start' | 'end';
  /** Uniquely identify the button within a form. */
  name?: string;
  /** Don't scale element on press. */
  noScaleOnPress?: boolean;
  /**
   * Truncates text after wrapping to a defined number of lines.
   * @default 1
   */
  numberOfLines?: number;
}`,signature:{properties:[{key:"variant",value:{name:"union",raw:`| 'primary'
| 'secondary'
| 'tertiary'
| 'positive'
| 'negative'
| 'foregroundMuted'`,elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"},{name:"literal",value:"'tertiary'"},{name:"literal",value:"'positive'"},{name:"literal",value:"'negative'"},{name:"literal",value:"'foregroundMuted'"}],required:!1},description:`Toggle design and visual variants.
@default primary`},{key:"disabled",value:{name:"boolean",required:!1},description:"Mark the button as disabled."},{key:"loading",value:{name:"boolean",required:!1},description:"Mark the button as loading and display a spinner."},{key:"transparent",value:{name:"boolean",required:!1},description:"Mark the background and border as transparent until interacted with."},{key:"block",value:{name:"boolean",required:!1},description:"Change to block and expand to 100% of parent width."},{key:"compact",value:{name:"boolean",required:!1},description:"Reduce the inner padding within the button itself."},{key:"children",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!0},description:"Children to render within the button."},{key:"start",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"Set the start node"},{key:"startIcon",value:{name:"union",raw:`| 'account'
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
| 'xLogo'`,elements:[{name:"literal",value:"'account'"},{name:"literal",value:"'activity'"},{name:"literal",value:"'add'"},{name:"literal",value:"'addPeople'"},{name:"literal",value:"'advancedMarketSelector'"},{name:"literal",value:"'advancedTradeProduct'"},{name:"literal",value:"'affiliates'"},{name:"literal",value:"'airdrop'"},{name:"literal",value:"'airdropAlt'"},{name:"literal",value:"'airdropCoins'"},{name:"literal",value:"'airdropParachute'"},{name:"literal",value:"'alien'"},{name:"literal",value:"'allTimeHigh'"},{name:"literal",value:"'allocation'"},{name:"literal",value:"'annotation'"},{name:"literal",value:"'api'"},{name:"literal",value:"'apiPlug'"},{name:"literal",value:"'apothecary'"},{name:"literal",value:"'appSwitcher'"},{name:"literal",value:"'apple'"},{name:"literal",value:"'appleLogo'"},{name:"literal",value:"'application'"},{name:"literal",value:"'arrowDown'"},{name:"literal",value:"'arrowLeft'"},{name:"literal",value:"'arrowRight'"},{name:"literal",value:"'arrowUp'"},{name:"literal",value:"'arrowsHorizontal'"},{name:"literal",value:"'arrowsUpDown'"},{name:"literal",value:"'arrowsVertical'"},{name:"literal",value:"'artwork'"},{name:"literal",value:"'assetHubProduct'"},{name:"literal",value:"'assetManagementProduct'"},{name:"literal",value:"'astronautHelmet'"},{name:"literal",value:"'atSign'"},{name:"literal",value:"'atomScience'"},{name:"literal",value:"'auto'"},{name:"literal",value:"'autoCar'"},{name:"literal",value:"'avatar'"},{name:"literal",value:"'average'"},{name:"literal",value:"'backArrow'"},{name:"literal",value:"'ballot'"},{name:"literal",value:"'ballotbox'"},{name:"literal",value:"'bandage'"},{name:"literal",value:"'bank'"},{name:"literal",value:"'barChartSimple'"},{name:"literal",value:"'barChartWindow'"},{name:"literal",value:"'base'"},{name:"literal",value:"'baseApps'"},{name:"literal",value:"'baseFeed'"},{name:"literal",value:"'baseNotification'"},{name:"literal",value:"'baseQuickBuy'"},{name:"literal",value:"'baseSquare'"},{name:"literal",value:"'baseTransact'"},{name:"literal",value:"'baseVerification'"},{name:"literal",value:"'baseWallet'"},{name:"literal",value:"'baseball'"},{name:"literal",value:"'basketball'"},{name:"literal",value:"'beaker'"},{name:"literal",value:"'beginningArrow'"},{name:"literal",value:"'bell'"},{name:"literal",value:"'bellCheck'"},{name:"literal",value:"'bellPlus'"},{name:"literal",value:"'birthcertificate'"},{name:"literal",value:"'block'"},{name:"literal",value:"'blockchain'"},{name:"literal",value:"'blog'"},{name:"literal",value:"'book'"},{name:"literal",value:"'bookmark'"},{name:"literal",value:"'borrowProduct'"},{name:"literal",value:"'boxing'"},{name:"literal",value:"'bridging'"},{name:"literal",value:"'briefcase'"},{name:"literal",value:"'briefcaseAlt'"},{name:"literal",value:"'browser'"},{name:"literal",value:"'bug'"},{name:"literal",value:"'building'"},{name:"literal",value:"'calculator'"},{name:"literal",value:"'calendar'"},{name:"literal",value:"'calendarBlank'"},{name:"literal",value:"'calendarDates'"},{name:"literal",value:"'calendarEmpty'"},{name:"literal",value:"'calendarHeart'"},{name:"literal",value:"'calendarMoney'"},{name:"literal",value:"'calendarStar'"},{name:"literal",value:"'camera'"},{name:"literal",value:"'candlesticks'"},{name:"literal",value:"'car'"},{name:"literal",value:"'card'"},{name:"literal",value:"'caret'"},{name:"literal",value:"'caretDown'"},{name:"literal",value:"'caretLeft'"},{name:"literal",value:"'caretRight'"},{name:"literal",value:"'caretUp'"},{name:"literal",value:"'cash'"},{name:"literal",value:"'cashAustralianDollar'"},{name:"literal",value:"'cashBrazilianReal'"},{name:"literal",value:"'cashBrazillianReal'"},{name:"literal",value:"'cashCanadianDollar'"},{name:"literal",value:"'cashCoins'"},{name:"literal",value:"'cashEUR'"},{name:"literal",value:"'cashGBP'"},{name:"literal",value:"'cashIndonesianRupiah'"},{name:"literal",value:"'cashJPY'"},{name:"literal",value:"'cashPhilippinePeso'"},{name:"literal",value:"'cashPolishZloty'"},{name:"literal",value:"'cashRupee'"},{name:"literal",value:"'cashSingaporeDollar'"},{name:"literal",value:"'cashSwissFranc'"},{name:"literal",value:"'cashThaiBaht'"},{name:"literal",value:"'cashTurkishLira'"},{name:"literal",value:"'cashUSD'"},{name:"literal",value:"'cashUaeDirham'"},{name:"literal",value:"'cashVietnameseDong'"},{name:"literal",value:"'chainLink'"},{name:"literal",value:"'chartBar'"},{name:"literal",value:"'chartCandles'"},{name:"literal",value:"'chartLine'"},{name:"literal",value:"'chartPie'"},{name:"literal",value:"'chartPieCircle'"},{name:"literal",value:"'chartVolume'"},{name:"literal",value:"'chatBotAgent'"},{name:"literal",value:"'chatBubble'"},{name:"literal",value:"'chatRequests'"},{name:"literal",value:"'checkboxChecked'"},{name:"literal",value:"'checkboxEmpty'"},{name:"literal",value:"'checkmark'"},{name:"literal",value:"'chess'"},{name:"literal",value:"'circleCheckmark'"},{name:"literal",value:"'circleCross'"},{name:"literal",value:"'circulatingSupply'"},{name:"literal",value:"'city'"},{name:"literal",value:"'clipboard'"},{name:"literal",value:"'clock'"},{name:"literal",value:"'clockOutline'"},{name:"literal",value:"'close'"},{name:"literal",value:"'closeCaption'"},{name:"literal",value:"'clothing'"},{name:"literal",value:"'cloud'"},{name:"literal",value:"'cloudPartial'"},{name:"literal",value:"'cloudProduct'"},{name:"literal",value:"'cluster'"},{name:"literal",value:"'coinbase'"},{name:"literal",value:"'coinbaseCardProduct'"},{name:"literal",value:"'coinbaseOne'"},{name:"literal",value:"'coinbaseOneCard'"},{name:"literal",value:"'coinbaseOneLogo'"},{name:"literal",value:"'coinbaseRewards'"},{name:"literal",value:"'coinsCrypto'"},{name:"literal",value:"'collapse'"},{name:"literal",value:"'collectibles'"},{name:"literal",value:"'collection'"},{name:"literal",value:"'comment'"},{name:"literal",value:"'commentPlus'"},{name:"literal",value:"'commerceProduct'"},{name:"literal",value:"'compass'"},{name:"literal",value:"'complianceProduct'"},{name:"literal",value:"'compose'"},{name:"literal",value:"'computerChip'"},{name:"literal",value:"'concierge'"},{name:"literal",value:"'conciergeBell'"},{name:"literal",value:"'config'"},{name:"literal",value:"'continuous'"},{name:"literal",value:"'convert'"},{name:"literal",value:"'copy'"},{name:"literal",value:"'corporation'"},{name:"literal",value:"'creatorCoin'"},{name:"literal",value:"'cricket'"},{name:"literal",value:"'cross'"},{name:"literal",value:"'crossTrade'"},{name:"literal",value:"'crypto'"},{name:"literal",value:"'cryptobasics'"},{name:"literal",value:"'crystalBall'"},{name:"literal",value:"'crystalBallInsight'"},{name:"literal",value:"'currencies'"},{name:"literal",value:"'custodyProduct'"},{name:"literal",value:"'dashboard'"},{name:"literal",value:"'dataMarketplaceProduct'"},{name:"literal",value:"'dataStack'"},{name:"literal",value:"'defi'"},{name:"literal",value:"'delegateProduct'"},{name:"literal",value:"'deposit'"},{name:"literal",value:"'derivatives'"},{name:"literal",value:"'derivativesProduct'"},{name:"literal",value:"'derivativesProductNew'"},{name:"literal",value:"'developerAPIProduct'"},{name:"literal",value:"'developerPlatformProduct'"},{name:"literal",value:"'dex'"},{name:"literal",value:"'diagonalDownArrow'"},{name:"literal",value:"'diagonalRightArrow'"},{name:"literal",value:"'diagonalUpArrow'"},{name:"literal",value:"'diamond'"},{name:"literal",value:"'diamondIncentives'"},{name:"literal",value:"'dinnerPlate'"},{name:"literal",value:"'directDeposit'"},{name:"literal",value:"'directDepositIcon'"},{name:"literal",value:"'disabledPhone'"},{name:"literal",value:"'discordLogo'"},{name:"literal",value:"'distribution'"},{name:"literal",value:"'document'"},{name:"literal",value:"'documentation'"},{name:"literal",value:"'dot'"},{name:"literal",value:"'doubleChevronRight'"},{name:"literal",value:"'downArrow'"},{name:"literal",value:"'download'"},{name:"literal",value:"'drag'"},{name:"literal",value:"'drops'"},{name:"literal",value:"'earn'"},{name:"literal",value:"'earnProduct'"},{name:"literal",value:"'earnRewards'"},{name:"literal",value:"'earthquake'"},{name:"literal",value:"'educationBook'"},{name:"literal",value:"'educationPencil'"},{name:"literal",value:"'email'"},{name:"literal",value:"'endArrow'"},{name:"literal",value:"'entertainment'"},{name:"literal",value:"'error'"},{name:"literal",value:"'ethereum'"},{name:"literal",value:"'eventContracts'"},{name:"literal",value:"'exchangeProduct'"},{name:"literal",value:"'exclamationMark'"},{name:"literal",value:"'expand'"},{name:"literal",value:"'expandAddress'"},{name:"literal",value:"'expandAll'"},{name:"literal",value:"'externalLink'"},{name:"literal",value:"'eye'"},{name:"literal",value:"'faceScan'"},{name:"literal",value:"'faces'"},{name:"literal",value:"'factory'"},{name:"literal",value:"'faucet'"},{name:"literal",value:"'fib'"},{name:"literal",value:"'filmStrip'"},{name:"literal",value:"'filter'"},{name:"literal",value:"'fingerprint'"},{name:"literal",value:"'flame'"},{name:"literal",value:"'folder'"},{name:"literal",value:"'folderArrow'"},{name:"literal",value:"'folderOpen'"},{name:"literal",value:"'followAdd'"},{name:"literal",value:"'following'"},{name:"literal",value:"'football'"},{name:"literal",value:"'fork'"},{name:"literal",value:"'forwardArrow'"},{name:"literal",value:"'fscsProtection'"},{name:"literal",value:"'gab'"},{name:"literal",value:"'games'"},{name:"literal",value:"'gaming'"},{name:"literal",value:"'gasFees'"},{name:"literal",value:"'gasFeesAlt'"},{name:"literal",value:"'gauge'"},{name:"literal",value:"'gaugeEmpty'"},{name:"literal",value:"'gaugeHigh'"},{name:"literal",value:"'gaugeHighLow'"},{name:"literal",value:"'gaugeHighMid'"},{name:"literal",value:"'gaugeLow'"},{name:"literal",value:"'gaugeLowHigh'"},{name:"literal",value:"'gaugeLowMid'"},{name:"literal",value:"'gaugeMedium'"},{name:"literal",value:"'gavel'"},{name:"literal",value:"'gear'"},{name:"literal",value:"'generalCharacter'"},{name:"literal",value:"'ghost'"},{name:"literal",value:"'gif'"},{name:"literal",value:"'giftBox'"},{name:"literal",value:"'giftCard'"},{name:"literal",value:"'gitHubLogo'"},{name:"literal",value:"'globe'"},{name:"literal",value:"'golf'"},{name:"literal",value:"'googleLogo'"},{name:"literal",value:"'greenEnergy'"},{name:"literal",value:"'grid'"},{name:"literal",value:"'group'"},{name:"literal",value:"'hamburger'"},{name:"literal",value:"'hammer'"},{name:"literal",value:"'heart'"},{name:"literal",value:"'helpCenterProduct'"},{name:"literal",value:"'helpCenterQuestionMark'"},{name:"literal",value:"'hiddenEye'"},{name:"literal",value:"'hockey'"},{name:"literal",value:"'home'"},{name:"literal",value:"'horizontalLine'"},{name:"literal",value:"'hospital'"},{name:"literal",value:"'hospitalCross'"},{name:"literal",value:"'hurricane'"},{name:"literal",value:"'ideal'"},{name:"literal",value:"'identityCard'"},{name:"literal",value:"'image'"},{name:"literal",value:"'info'"},{name:"literal",value:"'initiator'"},{name:"literal",value:"'instagramLogo'"},{name:"literal",value:"'instantUnstakingClock'"},{name:"literal",value:"'institute'"},{name:"literal",value:"'institutionalProduct'"},{name:"literal",value:"'interest'"},{name:"literal",value:"'invisible'"},{name:"literal",value:"'invoice'"},{name:"literal",value:"'key'"},{name:"literal",value:"'keyboard'"},{name:"literal",value:"'laptop'"},{name:"literal",value:"'leadChart'"},{name:"literal",value:"'leadCoin'"},{name:"literal",value:"'learningRewardsProduct'"},{name:"literal",value:"'light'"},{name:"literal",value:"'lightbulb'"},{name:"literal",value:"'lightning'"},{name:"literal",value:"'lightningBolt'"},{name:"literal",value:"'lineChartCrypto'"},{name:"literal",value:"'list'"},{name:"literal",value:"'location'"},{name:"literal",value:"'lock'"},{name:"literal",value:"'login'"},{name:"literal",value:"'logout'"},{name:"literal",value:"'loop'"},{name:"literal",value:"'magnifyingGlass'"},{name:"literal",value:"'marketCap'"},{name:"literal",value:"'medal'"},{name:"literal",value:"'megaphone'"},{name:"literal",value:"'menu'"},{name:"literal",value:"'metaverse'"},{name:"literal",value:"'microphone'"},{name:"literal",value:"'microphoneCordless'"},{name:"literal",value:"'microscope'"},{name:"literal",value:"'mint'"},{name:"literal",value:"'minus'"},{name:"literal",value:"'mma'"},{name:"literal",value:"'moneyCardCoin'"},{name:"literal",value:"'moon'"},{name:"literal",value:"'more'"},{name:"literal",value:"'moreVertical'"},{name:"literal",value:"'motorsport'"},{name:"literal",value:"'music'"},{name:"literal",value:"'musicArticles'"},{name:"literal",value:"'needle'"},{name:"literal",value:"'newsFeed'"},{name:"literal",value:"'newsletter'"},{name:"literal",value:"'nft'"},{name:"literal",value:"'nftBuy'"},{name:"literal",value:"'nftOffer'"},{name:"literal",value:"'nftProduct'"},{name:"literal",value:"'nftSale'"},{name:"literal",value:"'noRocket'"},{name:"literal",value:"'noWifi'"},{name:"literal",value:"'nodeProduct'"},{name:"literal",value:"'oil'"},{name:"literal",value:"'options'"},{name:"literal",value:"'orderBook'"},{name:"literal",value:"'orderHistory'"},{name:"literal",value:"'outline'"},{name:"literal",value:"'pFPS'"},{name:"literal",value:"'paperAirplane'"},{name:"literal",value:"'paperclip'"},{name:"literal",value:"'participate'"},{name:"literal",value:"'participateProduct'"},{name:"literal",value:"'passKey'"},{name:"literal",value:"'passport'"},{name:"literal",value:"'pause'"},{name:"literal",value:"'pay'"},{name:"literal",value:"'payProduct'"},{name:"literal",value:"'paymentCard'"},{name:"literal",value:"'payments'"},{name:"literal",value:"'payouts'"},{name:"literal",value:"'paypal'"},{name:"literal",value:"'pencil'"},{name:"literal",value:"'peopleGroup'"},{name:"literal",value:"'peopleStar'"},{name:"literal",value:"'percentage'"},{name:"literal",value:"'perpetualSwap'"},{name:"literal",value:"'phone'"},{name:"literal",value:"'pieChartData'"},{name:"literal",value:"'pillBottle'"},{name:"literal",value:"'pillCapsule'"},{name:"literal",value:"'pin'"},{name:"literal",value:"'plane'"},{name:"literal",value:"'planet'"},{name:"literal",value:"'play'"},{name:"literal",value:"'playbutton'"},{name:"literal",value:"'plusMinus'"},{name:"literal",value:"'podiumStar'"},{name:"literal",value:"'politicsBuilding'"},{name:"literal",value:"'politicsCandidate'"},{name:"literal",value:"'politicsFlag'"},{name:"literal",value:"'politicsGavel'"},{name:"literal",value:"'politicsPodium'"},{name:"literal",value:"'politicsStar'"},{name:"literal",value:"'powerTool'"},{name:"literal",value:"'priceAlerts'"},{name:"literal",value:"'priceAlertsCheck'"},{name:"literal",value:"'primePoduct'"},{name:"literal",value:"'privateClientProduct'"},{name:"literal",value:"'proProduct'"},{name:"literal",value:"'profile'"},{name:"literal",value:"'protection'"},{name:"literal",value:"'pulse'"},{name:"literal",value:"'pyramid'"},{name:"literal",value:"'qrCode'"},{name:"literal",value:"'qrCodeAlt'"},{name:"literal",value:"'queryTransact'"},{name:"literal",value:"'questionMark'"},{name:"literal",value:"'quotation'"},{name:"literal",value:"'rain'"},{name:"literal",value:"'ratingsCheck'"},{name:"literal",value:"'ratingsChecks'"},{name:"literal",value:"'ratingsStar'"},{name:"literal",value:"'reCenter'"},{name:"literal",value:"'rectangle'"},{name:"literal",value:"'recurring'"},{name:"literal",value:"'refresh'"},{name:"literal",value:"'regulated'"},{name:"literal",value:"'regulatedFutures'"},{name:"literal",value:"'report'"},{name:"literal",value:"'rewardsProduct'"},{name:"literal",value:"'ribbon'"},{name:"literal",value:"'robot'"},{name:"literal",value:"'rocket'"},{name:"literal",value:"'rocketShip'"},{name:"literal",value:"'rollingSpot'"},{name:"literal",value:"'rosettaProduct'"},{name:"literal",value:"'rottenTomato'"},{name:"literal",value:"'royalty'"},{name:"literal",value:"'safe'"},{name:"literal",value:"'save'"},{name:"literal",value:"'savingsBank'"},{name:"literal",value:"'scanQrCode'"},{name:"literal",value:"'scienceAtom'"},{name:"literal",value:"'scienceBeaker'"},{name:"literal",value:"'scienceMoon'"},{name:"literal",value:"'search'"},{name:"literal",value:"'securityKey'"},{name:"literal",value:"'securityShield'"},{name:"literal",value:"'seen'"},{name:"literal",value:"'sendReceive'"},{name:"literal",value:"'setPinCode'"},{name:"literal",value:"'settings'"},{name:"literal",value:"'share'"},{name:"literal",value:"'shield'"},{name:"literal",value:"'shieldOutline'"},{name:"literal",value:"'shoe'"},{name:"literal",value:"'shoppingCart'"},{name:"literal",value:"'signinProduct'"},{name:"literal",value:"'singleCoin'"},{name:"literal",value:"'singleNote'"},{name:"literal",value:"'singlecloud'"},{name:"literal",value:"'smartContract'"},{name:"literal",value:"'snow'"},{name:"literal",value:"'soccer'"},{name:"literal",value:"'socialChat'"},{name:"literal",value:"'socialReshare'"},{name:"literal",value:"'socialShare'"},{name:"literal",value:"'sofort'"},{name:"literal",value:"'sortDoubleArrow'"},{name:"literal",value:"'sortDown'"},{name:"literal",value:"'sortDownCenter'"},{name:"literal",value:"'sortUp'"},{name:"literal",value:"'sortUpCenter'"},{name:"literal",value:"'soundOff'"},{name:"literal",value:"'soundOn'"},{name:"literal",value:"'sparkle'"},{name:"literal",value:"'speaker'"},{name:"literal",value:"'speechBubble'"},{name:"literal",value:"'stableCoin'"},{name:"literal",value:"'stablecoinStack'"},{name:"literal",value:"'staggeredList'"},{name:"literal",value:"'stake'"},{name:"literal",value:"'staking'"},{name:"literal",value:"'star'"},{name:"literal",value:"'starAward'"},{name:"literal",value:"'starBubble'"},{name:"literal",value:"'starTrophy'"},{name:"literal",value:"'statusDot'"},{name:"literal",value:"'step0'"},{name:"literal",value:"'step1'"},{name:"literal",value:"'step2'"},{name:"literal",value:"'step3'"},{name:"literal",value:"'step4'"},{name:"literal",value:"'step5'"},{name:"literal",value:"'step6'"},{name:"literal",value:"'step7'"},{name:"literal",value:"'step8'"},{name:"literal",value:"'step9'"},{name:"literal",value:"'strategy'"},{name:"literal",value:"'sun'"},{name:"literal",value:"'support'"},{name:"literal",value:"'tag'"},{name:"literal",value:"'taxes'"},{name:"literal",value:"'taxesReceipt'"},{name:"literal",value:"'telephone'"},{name:"literal",value:"'tennis'"},{name:"literal",value:"'test'"},{name:"literal",value:"'thermometer'"},{name:"literal",value:"'thumbsDown'"},{name:"literal",value:"'thumbsDownOutline'"},{name:"literal",value:"'thumbsUp'"},{name:"literal",value:"'thumbsUpOutline'"},{name:"literal",value:"'tokenLaunchCoin'"},{name:"literal",value:"'tokenLaunchRocket'"},{name:"literal",value:"'tokenSales'"},{name:"literal",value:"'tornado'"},{name:"literal",value:"'trading'"},{name:"literal",value:"'transactions'"},{name:"literal",value:"'trashCan'"},{name:"literal",value:"'trophy'"},{name:"literal",value:"'trophyCup'"},{name:"literal",value:"'tshirt'"},{name:"literal",value:"'tv'"},{name:"literal",value:"'tvStand'"},{name:"literal",value:"'twitterLogo'"},{name:"literal",value:"'ultility'"},{name:"literal",value:"'umbrella'"},{name:"literal",value:"'undo'"},{name:"literal",value:"'unfollowPeople'"},{name:"literal",value:"'unknown'"},{name:"literal",value:"'unlock'"},{name:"literal",value:"'upArrow'"},{name:"literal",value:"'upload'"},{name:"literal",value:"'venturesProduct'"},{name:"literal",value:"'verifiedBadge'"},{name:"literal",value:"'verifiedPools'"},{name:"literal",value:"'verticalLine'"},{name:"literal",value:"'virus'"},{name:"literal",value:"'visible'"},{name:"literal",value:"'waasProduct'"},{name:"literal",value:"'wallet'"},{name:"literal",value:"'walletLogo'"},{name:"literal",value:"'walletProduct'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'webhooks'"},{name:"literal",value:"'wellness'"},{name:"literal",value:"'wifi'"},{name:"literal",value:"'wind'"},{name:"literal",value:"'wireTransfer'"},{name:"literal",value:"'withdraw'"},{name:"literal",value:"'wrapToken'"},{name:"literal",value:"'xLogo'"}],required:!1},description:"Icon to render at the start of the button."},{key:"startIconActive",value:{name:"boolean",required:!1},description:"Whether the start icon is active"},{key:"end",value:{name:"ReactReactNode",raw:"React.ReactNode",required:!1},description:"Set the end node"},{key:"endIcon",value:{name:"union",raw:`| 'account'
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
| 'xLogo'`,elements:[{name:"literal",value:"'account'"},{name:"literal",value:"'activity'"},{name:"literal",value:"'add'"},{name:"literal",value:"'addPeople'"},{name:"literal",value:"'advancedMarketSelector'"},{name:"literal",value:"'advancedTradeProduct'"},{name:"literal",value:"'affiliates'"},{name:"literal",value:"'airdrop'"},{name:"literal",value:"'airdropAlt'"},{name:"literal",value:"'airdropCoins'"},{name:"literal",value:"'airdropParachute'"},{name:"literal",value:"'alien'"},{name:"literal",value:"'allTimeHigh'"},{name:"literal",value:"'allocation'"},{name:"literal",value:"'annotation'"},{name:"literal",value:"'api'"},{name:"literal",value:"'apiPlug'"},{name:"literal",value:"'apothecary'"},{name:"literal",value:"'appSwitcher'"},{name:"literal",value:"'apple'"},{name:"literal",value:"'appleLogo'"},{name:"literal",value:"'application'"},{name:"literal",value:"'arrowDown'"},{name:"literal",value:"'arrowLeft'"},{name:"literal",value:"'arrowRight'"},{name:"literal",value:"'arrowUp'"},{name:"literal",value:"'arrowsHorizontal'"},{name:"literal",value:"'arrowsUpDown'"},{name:"literal",value:"'arrowsVertical'"},{name:"literal",value:"'artwork'"},{name:"literal",value:"'assetHubProduct'"},{name:"literal",value:"'assetManagementProduct'"},{name:"literal",value:"'astronautHelmet'"},{name:"literal",value:"'atSign'"},{name:"literal",value:"'atomScience'"},{name:"literal",value:"'auto'"},{name:"literal",value:"'autoCar'"},{name:"literal",value:"'avatar'"},{name:"literal",value:"'average'"},{name:"literal",value:"'backArrow'"},{name:"literal",value:"'ballot'"},{name:"literal",value:"'ballotbox'"},{name:"literal",value:"'bandage'"},{name:"literal",value:"'bank'"},{name:"literal",value:"'barChartSimple'"},{name:"literal",value:"'barChartWindow'"},{name:"literal",value:"'base'"},{name:"literal",value:"'baseApps'"},{name:"literal",value:"'baseFeed'"},{name:"literal",value:"'baseNotification'"},{name:"literal",value:"'baseQuickBuy'"},{name:"literal",value:"'baseSquare'"},{name:"literal",value:"'baseTransact'"},{name:"literal",value:"'baseVerification'"},{name:"literal",value:"'baseWallet'"},{name:"literal",value:"'baseball'"},{name:"literal",value:"'basketball'"},{name:"literal",value:"'beaker'"},{name:"literal",value:"'beginningArrow'"},{name:"literal",value:"'bell'"},{name:"literal",value:"'bellCheck'"},{name:"literal",value:"'bellPlus'"},{name:"literal",value:"'birthcertificate'"},{name:"literal",value:"'block'"},{name:"literal",value:"'blockchain'"},{name:"literal",value:"'blog'"},{name:"literal",value:"'book'"},{name:"literal",value:"'bookmark'"},{name:"literal",value:"'borrowProduct'"},{name:"literal",value:"'boxing'"},{name:"literal",value:"'bridging'"},{name:"literal",value:"'briefcase'"},{name:"literal",value:"'briefcaseAlt'"},{name:"literal",value:"'browser'"},{name:"literal",value:"'bug'"},{name:"literal",value:"'building'"},{name:"literal",value:"'calculator'"},{name:"literal",value:"'calendar'"},{name:"literal",value:"'calendarBlank'"},{name:"literal",value:"'calendarDates'"},{name:"literal",value:"'calendarEmpty'"},{name:"literal",value:"'calendarHeart'"},{name:"literal",value:"'calendarMoney'"},{name:"literal",value:"'calendarStar'"},{name:"literal",value:"'camera'"},{name:"literal",value:"'candlesticks'"},{name:"literal",value:"'car'"},{name:"literal",value:"'card'"},{name:"literal",value:"'caret'"},{name:"literal",value:"'caretDown'"},{name:"literal",value:"'caretLeft'"},{name:"literal",value:"'caretRight'"},{name:"literal",value:"'caretUp'"},{name:"literal",value:"'cash'"},{name:"literal",value:"'cashAustralianDollar'"},{name:"literal",value:"'cashBrazilianReal'"},{name:"literal",value:"'cashBrazillianReal'"},{name:"literal",value:"'cashCanadianDollar'"},{name:"literal",value:"'cashCoins'"},{name:"literal",value:"'cashEUR'"},{name:"literal",value:"'cashGBP'"},{name:"literal",value:"'cashIndonesianRupiah'"},{name:"literal",value:"'cashJPY'"},{name:"literal",value:"'cashPhilippinePeso'"},{name:"literal",value:"'cashPolishZloty'"},{name:"literal",value:"'cashRupee'"},{name:"literal",value:"'cashSingaporeDollar'"},{name:"literal",value:"'cashSwissFranc'"},{name:"literal",value:"'cashThaiBaht'"},{name:"literal",value:"'cashTurkishLira'"},{name:"literal",value:"'cashUSD'"},{name:"literal",value:"'cashUaeDirham'"},{name:"literal",value:"'cashVietnameseDong'"},{name:"literal",value:"'chainLink'"},{name:"literal",value:"'chartBar'"},{name:"literal",value:"'chartCandles'"},{name:"literal",value:"'chartLine'"},{name:"literal",value:"'chartPie'"},{name:"literal",value:"'chartPieCircle'"},{name:"literal",value:"'chartVolume'"},{name:"literal",value:"'chatBotAgent'"},{name:"literal",value:"'chatBubble'"},{name:"literal",value:"'chatRequests'"},{name:"literal",value:"'checkboxChecked'"},{name:"literal",value:"'checkboxEmpty'"},{name:"literal",value:"'checkmark'"},{name:"literal",value:"'chess'"},{name:"literal",value:"'circleCheckmark'"},{name:"literal",value:"'circleCross'"},{name:"literal",value:"'circulatingSupply'"},{name:"literal",value:"'city'"},{name:"literal",value:"'clipboard'"},{name:"literal",value:"'clock'"},{name:"literal",value:"'clockOutline'"},{name:"literal",value:"'close'"},{name:"literal",value:"'closeCaption'"},{name:"literal",value:"'clothing'"},{name:"literal",value:"'cloud'"},{name:"literal",value:"'cloudPartial'"},{name:"literal",value:"'cloudProduct'"},{name:"literal",value:"'cluster'"},{name:"literal",value:"'coinbase'"},{name:"literal",value:"'coinbaseCardProduct'"},{name:"literal",value:"'coinbaseOne'"},{name:"literal",value:"'coinbaseOneCard'"},{name:"literal",value:"'coinbaseOneLogo'"},{name:"literal",value:"'coinbaseRewards'"},{name:"literal",value:"'coinsCrypto'"},{name:"literal",value:"'collapse'"},{name:"literal",value:"'collectibles'"},{name:"literal",value:"'collection'"},{name:"literal",value:"'comment'"},{name:"literal",value:"'commentPlus'"},{name:"literal",value:"'commerceProduct'"},{name:"literal",value:"'compass'"},{name:"literal",value:"'complianceProduct'"},{name:"literal",value:"'compose'"},{name:"literal",value:"'computerChip'"},{name:"literal",value:"'concierge'"},{name:"literal",value:"'conciergeBell'"},{name:"literal",value:"'config'"},{name:"literal",value:"'continuous'"},{name:"literal",value:"'convert'"},{name:"literal",value:"'copy'"},{name:"literal",value:"'corporation'"},{name:"literal",value:"'creatorCoin'"},{name:"literal",value:"'cricket'"},{name:"literal",value:"'cross'"},{name:"literal",value:"'crossTrade'"},{name:"literal",value:"'crypto'"},{name:"literal",value:"'cryptobasics'"},{name:"literal",value:"'crystalBall'"},{name:"literal",value:"'crystalBallInsight'"},{name:"literal",value:"'currencies'"},{name:"literal",value:"'custodyProduct'"},{name:"literal",value:"'dashboard'"},{name:"literal",value:"'dataMarketplaceProduct'"},{name:"literal",value:"'dataStack'"},{name:"literal",value:"'defi'"},{name:"literal",value:"'delegateProduct'"},{name:"literal",value:"'deposit'"},{name:"literal",value:"'derivatives'"},{name:"literal",value:"'derivativesProduct'"},{name:"literal",value:"'derivativesProductNew'"},{name:"literal",value:"'developerAPIProduct'"},{name:"literal",value:"'developerPlatformProduct'"},{name:"literal",value:"'dex'"},{name:"literal",value:"'diagonalDownArrow'"},{name:"literal",value:"'diagonalRightArrow'"},{name:"literal",value:"'diagonalUpArrow'"},{name:"literal",value:"'diamond'"},{name:"literal",value:"'diamondIncentives'"},{name:"literal",value:"'dinnerPlate'"},{name:"literal",value:"'directDeposit'"},{name:"literal",value:"'directDepositIcon'"},{name:"literal",value:"'disabledPhone'"},{name:"literal",value:"'discordLogo'"},{name:"literal",value:"'distribution'"},{name:"literal",value:"'document'"},{name:"literal",value:"'documentation'"},{name:"literal",value:"'dot'"},{name:"literal",value:"'doubleChevronRight'"},{name:"literal",value:"'downArrow'"},{name:"literal",value:"'download'"},{name:"literal",value:"'drag'"},{name:"literal",value:"'drops'"},{name:"literal",value:"'earn'"},{name:"literal",value:"'earnProduct'"},{name:"literal",value:"'earnRewards'"},{name:"literal",value:"'earthquake'"},{name:"literal",value:"'educationBook'"},{name:"literal",value:"'educationPencil'"},{name:"literal",value:"'email'"},{name:"literal",value:"'endArrow'"},{name:"literal",value:"'entertainment'"},{name:"literal",value:"'error'"},{name:"literal",value:"'ethereum'"},{name:"literal",value:"'eventContracts'"},{name:"literal",value:"'exchangeProduct'"},{name:"literal",value:"'exclamationMark'"},{name:"literal",value:"'expand'"},{name:"literal",value:"'expandAddress'"},{name:"literal",value:"'expandAll'"},{name:"literal",value:"'externalLink'"},{name:"literal",value:"'eye'"},{name:"literal",value:"'faceScan'"},{name:"literal",value:"'faces'"},{name:"literal",value:"'factory'"},{name:"literal",value:"'faucet'"},{name:"literal",value:"'fib'"},{name:"literal",value:"'filmStrip'"},{name:"literal",value:"'filter'"},{name:"literal",value:"'fingerprint'"},{name:"literal",value:"'flame'"},{name:"literal",value:"'folder'"},{name:"literal",value:"'folderArrow'"},{name:"literal",value:"'folderOpen'"},{name:"literal",value:"'followAdd'"},{name:"literal",value:"'following'"},{name:"literal",value:"'football'"},{name:"literal",value:"'fork'"},{name:"literal",value:"'forwardArrow'"},{name:"literal",value:"'fscsProtection'"},{name:"literal",value:"'gab'"},{name:"literal",value:"'games'"},{name:"literal",value:"'gaming'"},{name:"literal",value:"'gasFees'"},{name:"literal",value:"'gasFeesAlt'"},{name:"literal",value:"'gauge'"},{name:"literal",value:"'gaugeEmpty'"},{name:"literal",value:"'gaugeHigh'"},{name:"literal",value:"'gaugeHighLow'"},{name:"literal",value:"'gaugeHighMid'"},{name:"literal",value:"'gaugeLow'"},{name:"literal",value:"'gaugeLowHigh'"},{name:"literal",value:"'gaugeLowMid'"},{name:"literal",value:"'gaugeMedium'"},{name:"literal",value:"'gavel'"},{name:"literal",value:"'gear'"},{name:"literal",value:"'generalCharacter'"},{name:"literal",value:"'ghost'"},{name:"literal",value:"'gif'"},{name:"literal",value:"'giftBox'"},{name:"literal",value:"'giftCard'"},{name:"literal",value:"'gitHubLogo'"},{name:"literal",value:"'globe'"},{name:"literal",value:"'golf'"},{name:"literal",value:"'googleLogo'"},{name:"literal",value:"'greenEnergy'"},{name:"literal",value:"'grid'"},{name:"literal",value:"'group'"},{name:"literal",value:"'hamburger'"},{name:"literal",value:"'hammer'"},{name:"literal",value:"'heart'"},{name:"literal",value:"'helpCenterProduct'"},{name:"literal",value:"'helpCenterQuestionMark'"},{name:"literal",value:"'hiddenEye'"},{name:"literal",value:"'hockey'"},{name:"literal",value:"'home'"},{name:"literal",value:"'horizontalLine'"},{name:"literal",value:"'hospital'"},{name:"literal",value:"'hospitalCross'"},{name:"literal",value:"'hurricane'"},{name:"literal",value:"'ideal'"},{name:"literal",value:"'identityCard'"},{name:"literal",value:"'image'"},{name:"literal",value:"'info'"},{name:"literal",value:"'initiator'"},{name:"literal",value:"'instagramLogo'"},{name:"literal",value:"'instantUnstakingClock'"},{name:"literal",value:"'institute'"},{name:"literal",value:"'institutionalProduct'"},{name:"literal",value:"'interest'"},{name:"literal",value:"'invisible'"},{name:"literal",value:"'invoice'"},{name:"literal",value:"'key'"},{name:"literal",value:"'keyboard'"},{name:"literal",value:"'laptop'"},{name:"literal",value:"'leadChart'"},{name:"literal",value:"'leadCoin'"},{name:"literal",value:"'learningRewardsProduct'"},{name:"literal",value:"'light'"},{name:"literal",value:"'lightbulb'"},{name:"literal",value:"'lightning'"},{name:"literal",value:"'lightningBolt'"},{name:"literal",value:"'lineChartCrypto'"},{name:"literal",value:"'list'"},{name:"literal",value:"'location'"},{name:"literal",value:"'lock'"},{name:"literal",value:"'login'"},{name:"literal",value:"'logout'"},{name:"literal",value:"'loop'"},{name:"literal",value:"'magnifyingGlass'"},{name:"literal",value:"'marketCap'"},{name:"literal",value:"'medal'"},{name:"literal",value:"'megaphone'"},{name:"literal",value:"'menu'"},{name:"literal",value:"'metaverse'"},{name:"literal",value:"'microphone'"},{name:"literal",value:"'microphoneCordless'"},{name:"literal",value:"'microscope'"},{name:"literal",value:"'mint'"},{name:"literal",value:"'minus'"},{name:"literal",value:"'mma'"},{name:"literal",value:"'moneyCardCoin'"},{name:"literal",value:"'moon'"},{name:"literal",value:"'more'"},{name:"literal",value:"'moreVertical'"},{name:"literal",value:"'motorsport'"},{name:"literal",value:"'music'"},{name:"literal",value:"'musicArticles'"},{name:"literal",value:"'needle'"},{name:"literal",value:"'newsFeed'"},{name:"literal",value:"'newsletter'"},{name:"literal",value:"'nft'"},{name:"literal",value:"'nftBuy'"},{name:"literal",value:"'nftOffer'"},{name:"literal",value:"'nftProduct'"},{name:"literal",value:"'nftSale'"},{name:"literal",value:"'noRocket'"},{name:"literal",value:"'noWifi'"},{name:"literal",value:"'nodeProduct'"},{name:"literal",value:"'oil'"},{name:"literal",value:"'options'"},{name:"literal",value:"'orderBook'"},{name:"literal",value:"'orderHistory'"},{name:"literal",value:"'outline'"},{name:"literal",value:"'pFPS'"},{name:"literal",value:"'paperAirplane'"},{name:"literal",value:"'paperclip'"},{name:"literal",value:"'participate'"},{name:"literal",value:"'participateProduct'"},{name:"literal",value:"'passKey'"},{name:"literal",value:"'passport'"},{name:"literal",value:"'pause'"},{name:"literal",value:"'pay'"},{name:"literal",value:"'payProduct'"},{name:"literal",value:"'paymentCard'"},{name:"literal",value:"'payments'"},{name:"literal",value:"'payouts'"},{name:"literal",value:"'paypal'"},{name:"literal",value:"'pencil'"},{name:"literal",value:"'peopleGroup'"},{name:"literal",value:"'peopleStar'"},{name:"literal",value:"'percentage'"},{name:"literal",value:"'perpetualSwap'"},{name:"literal",value:"'phone'"},{name:"literal",value:"'pieChartData'"},{name:"literal",value:"'pillBottle'"},{name:"literal",value:"'pillCapsule'"},{name:"literal",value:"'pin'"},{name:"literal",value:"'plane'"},{name:"literal",value:"'planet'"},{name:"literal",value:"'play'"},{name:"literal",value:"'playbutton'"},{name:"literal",value:"'plusMinus'"},{name:"literal",value:"'podiumStar'"},{name:"literal",value:"'politicsBuilding'"},{name:"literal",value:"'politicsCandidate'"},{name:"literal",value:"'politicsFlag'"},{name:"literal",value:"'politicsGavel'"},{name:"literal",value:"'politicsPodium'"},{name:"literal",value:"'politicsStar'"},{name:"literal",value:"'powerTool'"},{name:"literal",value:"'priceAlerts'"},{name:"literal",value:"'priceAlertsCheck'"},{name:"literal",value:"'primePoduct'"},{name:"literal",value:"'privateClientProduct'"},{name:"literal",value:"'proProduct'"},{name:"literal",value:"'profile'"},{name:"literal",value:"'protection'"},{name:"literal",value:"'pulse'"},{name:"literal",value:"'pyramid'"},{name:"literal",value:"'qrCode'"},{name:"literal",value:"'qrCodeAlt'"},{name:"literal",value:"'queryTransact'"},{name:"literal",value:"'questionMark'"},{name:"literal",value:"'quotation'"},{name:"literal",value:"'rain'"},{name:"literal",value:"'ratingsCheck'"},{name:"literal",value:"'ratingsChecks'"},{name:"literal",value:"'ratingsStar'"},{name:"literal",value:"'reCenter'"},{name:"literal",value:"'rectangle'"},{name:"literal",value:"'recurring'"},{name:"literal",value:"'refresh'"},{name:"literal",value:"'regulated'"},{name:"literal",value:"'regulatedFutures'"},{name:"literal",value:"'report'"},{name:"literal",value:"'rewardsProduct'"},{name:"literal",value:"'ribbon'"},{name:"literal",value:"'robot'"},{name:"literal",value:"'rocket'"},{name:"literal",value:"'rocketShip'"},{name:"literal",value:"'rollingSpot'"},{name:"literal",value:"'rosettaProduct'"},{name:"literal",value:"'rottenTomato'"},{name:"literal",value:"'royalty'"},{name:"literal",value:"'safe'"},{name:"literal",value:"'save'"},{name:"literal",value:"'savingsBank'"},{name:"literal",value:"'scanQrCode'"},{name:"literal",value:"'scienceAtom'"},{name:"literal",value:"'scienceBeaker'"},{name:"literal",value:"'scienceMoon'"},{name:"literal",value:"'search'"},{name:"literal",value:"'securityKey'"},{name:"literal",value:"'securityShield'"},{name:"literal",value:"'seen'"},{name:"literal",value:"'sendReceive'"},{name:"literal",value:"'setPinCode'"},{name:"literal",value:"'settings'"},{name:"literal",value:"'share'"},{name:"literal",value:"'shield'"},{name:"literal",value:"'shieldOutline'"},{name:"literal",value:"'shoe'"},{name:"literal",value:"'shoppingCart'"},{name:"literal",value:"'signinProduct'"},{name:"literal",value:"'singleCoin'"},{name:"literal",value:"'singleNote'"},{name:"literal",value:"'singlecloud'"},{name:"literal",value:"'smartContract'"},{name:"literal",value:"'snow'"},{name:"literal",value:"'soccer'"},{name:"literal",value:"'socialChat'"},{name:"literal",value:"'socialReshare'"},{name:"literal",value:"'socialShare'"},{name:"literal",value:"'sofort'"},{name:"literal",value:"'sortDoubleArrow'"},{name:"literal",value:"'sortDown'"},{name:"literal",value:"'sortDownCenter'"},{name:"literal",value:"'sortUp'"},{name:"literal",value:"'sortUpCenter'"},{name:"literal",value:"'soundOff'"},{name:"literal",value:"'soundOn'"},{name:"literal",value:"'sparkle'"},{name:"literal",value:"'speaker'"},{name:"literal",value:"'speechBubble'"},{name:"literal",value:"'stableCoin'"},{name:"literal",value:"'stablecoinStack'"},{name:"literal",value:"'staggeredList'"},{name:"literal",value:"'stake'"},{name:"literal",value:"'staking'"},{name:"literal",value:"'star'"},{name:"literal",value:"'starAward'"},{name:"literal",value:"'starBubble'"},{name:"literal",value:"'starTrophy'"},{name:"literal",value:"'statusDot'"},{name:"literal",value:"'step0'"},{name:"literal",value:"'step1'"},{name:"literal",value:"'step2'"},{name:"literal",value:"'step3'"},{name:"literal",value:"'step4'"},{name:"literal",value:"'step5'"},{name:"literal",value:"'step6'"},{name:"literal",value:"'step7'"},{name:"literal",value:"'step8'"},{name:"literal",value:"'step9'"},{name:"literal",value:"'strategy'"},{name:"literal",value:"'sun'"},{name:"literal",value:"'support'"},{name:"literal",value:"'tag'"},{name:"literal",value:"'taxes'"},{name:"literal",value:"'taxesReceipt'"},{name:"literal",value:"'telephone'"},{name:"literal",value:"'tennis'"},{name:"literal",value:"'test'"},{name:"literal",value:"'thermometer'"},{name:"literal",value:"'thumbsDown'"},{name:"literal",value:"'thumbsDownOutline'"},{name:"literal",value:"'thumbsUp'"},{name:"literal",value:"'thumbsUpOutline'"},{name:"literal",value:"'tokenLaunchCoin'"},{name:"literal",value:"'tokenLaunchRocket'"},{name:"literal",value:"'tokenSales'"},{name:"literal",value:"'tornado'"},{name:"literal",value:"'trading'"},{name:"literal",value:"'transactions'"},{name:"literal",value:"'trashCan'"},{name:"literal",value:"'trophy'"},{name:"literal",value:"'trophyCup'"},{name:"literal",value:"'tshirt'"},{name:"literal",value:"'tv'"},{name:"literal",value:"'tvStand'"},{name:"literal",value:"'twitterLogo'"},{name:"literal",value:"'ultility'"},{name:"literal",value:"'umbrella'"},{name:"literal",value:"'undo'"},{name:"literal",value:"'unfollowPeople'"},{name:"literal",value:"'unknown'"},{name:"literal",value:"'unlock'"},{name:"literal",value:"'upArrow'"},{name:"literal",value:"'upload'"},{name:"literal",value:"'venturesProduct'"},{name:"literal",value:"'verifiedBadge'"},{name:"literal",value:"'verifiedPools'"},{name:"literal",value:"'verticalLine'"},{name:"literal",value:"'virus'"},{name:"literal",value:"'visible'"},{name:"literal",value:"'waasProduct'"},{name:"literal",value:"'wallet'"},{name:"literal",value:"'walletLogo'"},{name:"literal",value:"'walletProduct'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'webhooks'"},{name:"literal",value:"'wellness'"},{name:"literal",value:"'wifi'"},{name:"literal",value:"'wind'"},{name:"literal",value:"'wireTransfer'"},{name:"literal",value:"'withdraw'"},{name:"literal",value:"'wrapToken'"},{name:"literal",value:"'xLogo'"}],required:!1},description:"Icon to render at the end of the button."},{key:"endIconActive",value:{name:"boolean",required:!1},description:"Whether the end icon is active"},{key:"flush",value:{name:"union",raw:"'start' | 'end'",elements:[{name:"literal",value:"'start'"},{name:"literal",value:"'end'"}],required:!1},description:`Ensure the button aligns flush on the left or right.
This prop will translate the entire button left/right,
so take care to ensure it is not overflowing awkwardly`},{key:"name",value:{name:"string",required:!1},description:"Uniquely identify the button within a form."},{key:"noScaleOnPress",value:{name:"boolean",required:!1},description:"Don't scale element on press."},{key:"numberOfLines",value:{name:"number",required:!1},description:`Truncates text after wrapping to a defined number of lines.
@default 1`}]}}]}],raw:`Polymorphic.ExtendableProps<
  PressableBaseProps,
  SharedProps &
    Pick<SharedAccessibilityProps, 'accessibilityLabel'> & {
      /**
       * Toggle design and visual variants.
       * @default primary
       */
      variant?: ButtonVariant;
      /** Mark the button as disabled. */
      disabled?: boolean;
      /** Mark the button as loading and display a spinner. */
      loading?: boolean;
      /** Mark the background and border as transparent until interacted with. */
      transparent?: boolean;
      /** Change to block and expand to 100% of parent width. */
      block?: boolean;
      /** Reduce the inner padding within the button itself. */
      compact?: boolean;
      /** Children to render within the button. */
      children: React.ReactNode;
      /** Set the start node */
      start?: React.ReactNode;
      /** Icon to render at the start of the button. */
      startIcon?: IconName;
      /** Whether the start icon is active */
      startIconActive?: boolean;
      /** Set the end node */
      end?: React.ReactNode;
      /** Icon to render at the end of the button. */
      endIcon?: IconName;
      /** Whether the end icon is active */
      endIconActive?: boolean;
      /** Ensure the button aligns flush on the left or right.
       * This prop will translate the entire button left/right,
       * so take care to ensure it is not overflowing awkwardly
       */
      flush?: 'start' | 'end';
      /** Uniquely identify the button within a form. */
      name?: string;
      /** Don't scale element on press. */
      noScaleOnPress?: boolean;
      /**
       * Truncates text after wrapping to a defined number of lines.
       * @default 1
       */
      numberOfLines?: number;
    }
>`},description:""},testID:{defaultValue:{value:"'feed-card'",computed:!1},required:!1},borderRadius:{defaultValue:{value:"0",computed:!1},required:!1},elevation:{defaultValue:{value:"0",computed:!1},required:!1}}};export{W as C,ee as F};
