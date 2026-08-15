import { useCallback } from 'react';
import { AccessibilityInfo } from 'react-native';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { useWebBrowserOpener } from '../../hooks/useWebBrowserOpener';
import { Link } from '../Link';
import { Text } from '../Text';

const typographies = [
  'display1',
  'display2',
  'display3',
  'title1',
  'title2',
  'title3',
  'headline',
  'body',
  'label1',
  'label2',
  'caption',
  'legal',
] as const;

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);

const links = typographies.map((typography) => (
  <Example key={typography} inline>
    <Text font="headline">Link with Text style {typography}</Text>
    <Link font={typography} to="https://www.coinbase.com/">
      {capitalize(typography)}
    </Link>
    <Link underline font={typography} to="https://www.coinbase.com/">
      {capitalize(typography)}
    </Link>
  </Example>
));

const logPressed = () => console.log('Link is pressed');
const OPEN_WEB_BROWSER_OPTIONS = {
  // cds custom properties
  preventRedirectionIntoApp: true,
  forceOpenOutsideApp: true,
  // iOS Properties
  dismissButtonStyle: 'cancel',
  readerMode: true,
  animated: false,
  modalPresentationStyle: 'fullScreen',
  modalTransitionStyle: 'coverVertical',
  modalEnabled: true,
  enableBarCollapsing: false,
  // Android Properties
  showTitle: true,
  navigationBarColor: 'black',
  navigationBarDividerColor: 'white',
  enableUrlBarHiding: true,
  enableDefaultShare: true,
  forceCloseOnRedirection: false,
  // Specify full animation resource identifier(package:anim/name)
  // or only resource name(in case of animation bundled with app).
  animations: {
    startEnter: 'slide_in_right',
    startExit: 'slide_out_left',
    endEnter: 'slide_in_left',
    endExit: 'slide_out_right',
  },
  headers: {
    'my-custom-header': 'my custom header value',
  },
} as const;

const LinkScreen = function LinkScreen() {
  const openURL = useWebBrowserOpener();
  const openURLOnPress = useCallback(
    async () => openURL('https://www.coinbase.com/', OPEN_WEB_BROWSER_OPTIONS),
    [openURL],
  );

  return (
    <ExampleScreen>
      {links}
      <Example inline>
        <Link font="body" onPress={openURLOnPress}>
          Test useWebBrowserOpener hook
        </Link>
      </Example>
      <Example inline>
        <Text font="headline">Goes to coinbase.com</Text>
        <Link font="body" to="https://www.coinbase.com/">
          Go to Coinbase
        </Link>
      </Example>
      <Example inline>
        <Text font="headline">Coinbase link without protocol should crash</Text>
        <Link font="body" to="coinbase.com/">
          Go to Coinbase
        </Link>
      </Example>
      <Example inline>
        <Text font="headline">Link Typography defaults to headline</Text>
        <Link to="https://www.coinbase.com/">Go to Coinbase (Headline)</Link>
      </Example>
      <Example inline>
        <Text font="headline">Testing color</Text>
        <Link color="fgNegative" font="title1" to="https://www.coinbase.com/">
          Go to Coinbase
        </Link>
        <Link underline color="fgNegative" font="title1" to="https://www.coinbase.com/">
          Go to Coinbase
        </Link>
      </Example>
      <Example inline>
        <Text font="headline">Testing onPress</Text>
        <Link color="fgNegative" font="title1" onPress={logPressed}>
          Go to Coinbase
        </Link>
      </Example>
      <Example inline>
        <Text font="headline">Wrap in TextBody</Text>
        <Text align="center">
          Go here:{' '}
          <Link color="fgNegative" font="body" onPress={logPressed} to="https://www.coinbase.com/">
            Go to Coinbase
          </Link>
        </Text>
      </Example>
      <Example inline>
        <Text font="headline">Inherit parent text styles</Text>
        <Text align="center" font="title1">
          This is a nested <Text>text</Text> that inherits the parent text styles
        </Text>
      </Example>
      <Example inline>
        <Text font="headline">onPress and to used together</Text>
        <Link color="fgNegative" font="title1" onPress={logPressed} to="https://www.coinbase.com/">
          Go to Coinbase
        </Link>
      </Example>
      <Example inline>
        <Text font="headline">forceOpenOutsideApp is set to false by default</Text>
        <Link color="fgNegative" font="title1" to="https://www.coinbase.com/">
          Go to Coinbase within App
        </Link>
      </Example>
      <Example inline>
        <Text font="headline">Incorrectly formatted Link</Text>
        <Link color="fgNegative" font="title1" to="xxx">
          Console.error when incorrectly formatted link is passed in
        </Link>
      </Example>
      <Example inline>
        <Text font="headline">test forceOpenOutsideApp is set to true</Text>
        <Link forceOpenOutsideApp color="fgNegative" font="title1" to="https://www.google.com">
          Go to Coinbase outside of App
        </Link>
      </Example>
      <Example inline>
        <Text font="headline">test can set readerMode</Text>
        <Link readerMode color="fgNegative" font="title1" to="https://www.coinbase.com/">
          ReaderMode set
        </Link>
      </Example>
      <Example inline>
        <Text font="headline">test preventRedirectionIntoApp</Text>
        <Link
          preventRedirectionIntoApp
          color="fgNegative"
          font="title1"
          to="https://www.google.com"
        >
          Test PreventRedirectionIntoApp
        </Link>
      </Example>
      <Example>
        <Text font="label1">
          The following examples do not work on IOS Simulator. Only work on devices
        </Text>
      </Example>
      <Example inline>
        <Text font="headline">tel Link</Text>
        <Link font="title2" to="tel:111-111-1111">
          Call Someone
        </Link>
      </Example>
      <Example inline>
        <Text font="headline">mailto Link</Text>
        <Link font="title2" to="mailto:someone@coinbase.com">
          Send email to Someone
        </Link>
      </Example>
      <Example inline>
        <Text font="headline">Nested link in text</Text>
        {/** refer to this blog about this best practice: https://www.yeti.co/blog/accessibility-first-in-react-native */}
        <Text
          // suppressHighlighting is used to prevent the text from being highlighted when the link is pressed for non-screen reader users
          suppressHighlighting
          accessibilityLabel="Consider a case where you have a block of text with an inline link. Like so. You may want to write your code like this. Tap to go to coinbase.com."
          accessibilityRole="link"
          font="legal"
          onPress={async () => {
            try {
              const screenReaderEnabled = await AccessibilityInfo.isScreenReaderEnabled();
              if (screenReaderEnabled) {
                await openURL('https://www.coinbase.com/');
              }
            } catch (error) {
              // Handle or log the error appropriately
              console.error('Error in onPress handler:', error);
            }
          }}
        >
          Consider a case where you have a block of text with an inline link.{' '}
          <Link to="https://www.coinbase.com/">Like so.</Link> You may want to write your code like
          this.
        </Text>
      </Example>
      <Example inline>
        <Text font="headline">Multiple nested link in text</Text>
        <Text>
          It is an design anti-pattern to have multiple nested links in a single block of text in
          react native, since it&apos;s bad for accessibility. Consider pattern like this if more
          than one link is necessary in one paragraph.
        </Text>
        <Text>
          Terms & conditions last updated August 2025. Privacy policy last updated June 2025.
        </Text>
        <Link to="https://www.coinbase.com/">Tap here to view our terms & conditions</Link>
        <Link to="https://www.coinbase.com/">Tap here to view our privacy policy</Link>
      </Example>
    </ExampleScreen>
  );
};
export default LinkScreen;
