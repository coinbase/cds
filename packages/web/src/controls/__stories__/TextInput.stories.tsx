import React, { useCallback, useMemo, useRef, useState } from 'react';
import type { ThemeVars } from '@coinbase/cds-common/core/theme';
import type { InputVariant } from '@coinbase/cds-common/types/InputBaseProps';
import { css } from '@linaria/core';

import { Icon } from '../../icons/Icon';
import { Box } from '../../layout/Box';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Avatar } from '../../media/Avatar';
import { Tooltip } from '../../overlays/tooltip/Tooltip';
import { Link } from '../../typography/Link';
import { InputIcon } from '../InputIcon';
import { InputIconButton } from '../InputIconButton';
import { InputLabel } from '../InputLabel';
import { NativeTextArea } from '../NativeTextArea';
import { TextInput } from '../TextInput';

export default {
  title: 'Components/Inputs/TextInput',
  component: TextInput,
};

const nativeInputCustomCss = css`
  &:focus {
    outline-style: none;
    box-shadow: none;
    border-color: transparent;
  }

  background-color: transparent;
`;

const variants = [
  'positive',
  'negative',
  'foregroundMuted',
  'foreground',
  'primary',
  'secondary',
] as const;

const customContainerPaddingCss = css`
  padding: var(--space-4);
`;

/**
 * DEFAULT TEXT INPUT VARIATIONS
 */

export const Basic = function Basic() {
  const onFocus = useCallback(() => {
    console.log('Focusing');
  }, []);

  const onBlur = useCallback(() => {
    console.log('Blurring');
  }, []);

  return <TextInput label="Label" onBlur={onBlur} onFocus={onFocus} />;
};

export const InsideLabel = function InsideLabel() {
  return (
    <VStack gap={2}>
      <TextInput label="Inside Label" labelVariant="inside" placeholder="Placeholder" />
      <TextInput
        label="Secondary Start"
        labelVariant="inside"
        placeholder="Placeholder"
        start={<InputIconButton transparent accessibilityLabel="Add" name="add" />}
        variant="secondary"
      />
      <TextInput
        end={<InputIconButton transparent accessibilityLabel="Add" name="add" />}
        label=" Secondary End"
        labelVariant="inside"
        placeholder="Placeholder"
        variant="secondary"
      />
      <TextInput
        compact
        label="Compact+Inside"
        labelVariant="inside"
        placeholder="Placeholder"
        variant="secondary"
      />
      <TextInput
        helperText="Error: Your favorite color is not orange"
        label="Error state"
        labelVariant="inside"
        placeholder="Enter your favorite color"
        variant="negative"
      />
    </VStack>
  );
};

export const Placeholder = function Placeholder() {
  return <TextInput label="Label" placeholder="placeholder" />;
};

export const HelperText = function HelperText() {
  return <TextInput helperText="helperText" label="Label" placeholder="placeholder" />;
};

export const Align = function Align() {
  const alignments = ['start', 'end'] as const;

  return (
    <>
      {alignments.map((align) => (
        <TextInput
          align={align}
          helperText="helperText"
          label={`Label: ${align}`}
          placeholder="placeholder"
        />
      ))}
    </>
  );
};

export const Variants = () => {
  return (
    <>
      {variants.map((variant) => (
        <TextInput
          helperText="helperText"
          label={`Label: ${variant}`}
          placeholder="placeholder"
          variant={variant}
        />
      ))}
    </>
  );
};

export const ColorSurge = () => {
  return (
    <>
      {variants.map((variant) => (
        <TextInput
          enableColorSurge
          helperText="helperText"
          label={`Label: ${variant}`}
          placeholder="placeholder"
          variant={variant}
        />
      ))}
    </>
  );
};

export const Width = function Width() {
  const widths = ['100%', '30%', '75%', '10%'] as const;

  return (
    <>
      {widths.map((width) => (
        <TextInput
          key={`input-width-${width}`}
          helperText="helperText"
          label={`Width: ${width}`}
          placeholder="placeholder"
          width={width}
        />
      ))}
    </>
  );
};

export const Height = function Height() {
  const heights = [56, 40];

  return (
    <>
      {heights.map((height) => (
        <TextInput
          key={`input-height-${height}`}
          height={height}
          helperText="helperText"
          label={`Height: ${height}`}
          placeholder="placeholder"
        />
      ))}
    </>
  );
};

const borderRadii: ThemeVars.BorderRadius[] = [
  0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000,
] as const;

export const BorderRadius = () =>
  borderRadii.map((borderRadius) => (
    <TextInput
      key={`border-radius-${borderRadius}`}
      borderRadius={borderRadius}
      helperText="helperText"
      label={`BorderRadius: ${borderRadius}`}
      placeholder="placeholder"
    />
  ));

export const Borderless = function Borderless() {
  return (
    <TextInput
      bordered={false}
      helperText="helperText"
      label="borderless"
      placeholder="placeholder"
    />
  );
};

export const Disabled = function Disabled() {
  return (
    <>
      <TextInput disabled label="Disabled label" />
      <TextInput
        disabled
        label="Label"
        start={<InputIconButton active transparent accessibilityLabel="Add" name="add" />}
      />
    </>
  );
};

Disabled.bind({});
Disabled.parameters = {
  a11y: {
    config: {
      /**
       * Color contrast ratio doesn't need to meet 4.5:1, as the element is disabled
       * @link https://dequeuniversity.com/rules/axe/4.3/color-contrast
       */
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const NoLabel = function NoLabel() {
  return <TextInput accessibilityLabel="No Label" />;
};

export const LabelWithTooltip = function LabelWithTooltip() {
  return (
    <TextInput
      id="display-name-tooltip"
      label="Display name"
      labelNode={
        <InputLabel htmlFor="display-name-tooltip">
          <HStack alignItems="center" gap={1}>
            Display name
            <Tooltip content="This will be visible to other users.">
              <Icon active color="fg" name="info" size="xs" tabIndex={0} />
            </Tooltip>
          </HStack>
        </InputLabel>
      }
      placeholder="Satoshi Nakamoto"
    />
  );
};

export const StartContent = function StartContent() {
  return (
    <TextInput
      label="Label"
      start={<InputIconButton transparent accessibilityLabel="Add" name="add" />}
    />
  );
};

export const EndContent = function EndContent() {
  return (
    <TextInput
      end={
        <HStack paddingEnd={1}>
          <Link font="headline" href="">
            Hello
          </Link>
        </HStack>
      }
      label="Label"
    />
  );
};

export const Suffix = function Suffix() {
  return <TextInput label="Label" suffix="USD" />;
};

export const SuffixAndEndContent = function SuffixAndEndContent() {
  return (
    <TextInput
      end={<InputIconButton active transparent accessibilityLabel="Add" name="add" />}
      label="Label"
      suffix="USD"
    />
  );
};

/**
 * COMPACT TEXT INPUT VARIATIONS
 */

export const CompactInput = function CompactInput() {
  return <TextInput compact label="Label" />;
};

export const CompactInputStart = function CompactInputStart() {
  return (
    <TextInput
      compact
      label="Label"
      start={
        <Box>
          <Avatar
            alt="address"
            size="l"
            src="https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png"
          />
        </Box>
      }
    />
  );
};

export const CompactInputEnd = function CompactInputEnd() {
  return (
    <TextInput
      compact
      end={
        <HStack paddingEnd={1}>
          <Link font="headline" href="">
            Hello
          </Link>
        </HStack>
      }
      label="Label"
    />
  );
};

export const CompactInputSuffix = function CompactInputSuffix() {
  return <TextInput compact label="Label" suffix="USD" />;
};

export const CompactHelperText = function CompactHelperText() {
  return <TextInput compact helperText="helperText" label="Label" suffix="USD" />;
};

export const InputOnChange = function InputOnChange() {
  const [inputText, setInputText] = useState('Test');

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }, []);

  return (
    <div>
      <TextInput helperText={inputText} label="Label" onChange={onChange} />
    </div>
  );
};

export const RenderInputDefault = () => {
  const [inputText, setInputText] = useState('Test');
  const ref = useRef<HTMLInputElement>(null);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }, []);

  const renderInput = (
    <input
      className={nativeInputCustomCss}
      onChange={onChange}
      style={{ width: '100%', borderRadius: 'var(--borderRadius-200)' }}
    />
  );

  return (
    <div>
      <TextInput ref={ref} helperText={inputText} inputNode={renderInput} label="Label" />
    </div>
  );
};

export const RenderInputDisabled = () => {
  const [inputText, setInputText] = useState('Test');
  const ref = useRef<HTMLInputElement>(null);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }, []);

  const renderInput = (
    <input
      className={nativeInputCustomCss}
      onChange={onChange}
      style={{ width: '100%', borderRadius: 'var(--borderRadius-200)' }}
      value="Custom Input"
    />
  );

  return (
    <div>
      <TextInput ref={ref} disabled helperText={inputText} inputNode={renderInput} label="Label" />
    </div>
  );
};

RenderInputDisabled.bind({});
RenderInputDisabled.parameters = {
  a11y: {
    config: {
      /**
       * Color contrast ratio doesn't need to meet 4.5:1, as the element is disabled
       * @link https://dequeuniversity.com/rules/axe/4.3/color-contrast
       */
      rules: [{ id: 'color-contrast', enabled: false }],
    },
  },
};

export const RenderInputCompact = () => {
  const [inputText, setInputText] = useState('Test');
  const ref = useRef<HTMLInputElement>(null);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }, []);

  const renderInput = (
    <input
      className={nativeInputCustomCss}
      onChange={onChange}
      style={{ width: '100%', borderRadius: 'var(--borderRadius-200)' }}
    />
  );

  return (
    <div>
      <TextInput ref={ref} compact helperText={inputText} inputNode={renderInput} label="Label" />
    </div>
  );
};

export const RenderNativeTextArea = () => {
  const [inputText, setInputText] = useState('');

  const onChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  }, []);

  const customNativeTextAreaCSS = useMemo(() => {
    return {
      resize: 'none',
    } as const;
  }, []);

  return (
    <div>
      <TextInput
        helperText="Test"
        inputNode={
          <NativeTextArea
            cols={5}
            onChange={onChange}
            rows={7}
            style={customNativeTextAreaCSS}
            value={inputText}
          />
        }
        label="Label"
      />
    </div>
  );
};

export const RenderNativeTextAreaCustomSpacing = () => {
  const [inputText, setInputText] = useState('');

  const onChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  }, []);

  const customNativeTextAreaCSS = useMemo(() => {
    return {
      resize: 'none',
    } as const;
  }, []);

  return (
    <div>
      <TextInput
        helperText="Test"
        inputNode={
          <NativeTextArea
            cols={5}
            containerSpacing={customContainerPaddingCss}
            onChange={onChange}
            rows={7}
            style={customNativeTextAreaCSS}
            value={inputText}
          />
        }
        label="Label"
      />
    </div>
  );
};

/**
 * COMPLEX INPUTS
 * These are inputs that people have requested. And I am building it
 * to prove that it can be done with our component.
 */

const variantColorMap: Record<InputVariant, ThemeVars.Color> = {
  primary: 'fgPrimary',
  positive: 'fgPositive',
  negative: 'fgNegative',
  foreground: 'fg',
  foregroundMuted: 'fgMuted',
  secondary: 'bgSecondary',
};

export const CopyTextInput = function CopyTextInput() {
  const [copied, setCopied] = useState(false);
  const [variant, setVariant] = useState<InputVariant>('foregroundMuted');

  const handleOnClick = useCallback(() => {
    setCopied(!copied);
    setVariant(copied ? 'foregroundMuted' : 'positive');
    console.log(variant);
  }, [copied, variant]);

  const handleOnChange = useCallback(() => {
    setVariant('foregroundMuted');
    setCopied(false);
  }, []);

  return (
    <div>
      <TextInput
        end={
          <HStack>
            <Link as="button" color={variantColorMap[variant]} font="legal" onClick={handleOnClick}>
              {copied ? 'copied' : 'copy'}
            </Link>
            <InputIcon active name="visible" />
          </HStack>
        }
        helperText="Warning: Something interesting"
        label="Label"
        onChange={handleOnChange}
        variant={variant}
      />
    </div>
  );
};

export const ReadOnly = function ReadOnly() {
  return (
    <VStack gap={1}>
      <TextInput readOnly label="Read-Only Label" value="Some text" />
      <TextInput
        readOnly
        helperText="Some helper text"
        label="Read-Only with HelperText"
        value="Some text"
      />
      <TextInput
        readOnly
        label="Read-Only with Start Node"
        start={
          <Box paddingX={2}>
            <Icon color="fg" name="qrCode" size="m" />
          </Box>
        }
        value="Some text"
      />
      <TextInput
        compact
        readOnly
        end={
          <Box paddingX={2}>
            <Icon color="fg" name="qrCode" size="m" />
          </Box>
        }
        label="Compact Read-Only with End Node"
        placeholder="Placeholder"
      />
    </VStack>
  );
};
