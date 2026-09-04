import React, { memo, useCallback, useRef, useState } from 'react';
import type { HsvColor } from 'react-colorful';
import { HsvColorPicker } from 'react-colorful';
import { Button } from '@coinbase/cds-web/buttons';
import { TextInput } from '@coinbase/cds-web/controls';
import { Icon } from '@coinbase/cds-web/icons';
import { Box, HStack, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';

import styles from './ColorPicker.module.css';
import { hsbToRgb, parseColorInput, rgbToHsb, toHex } from './colorUtils';

type ColorPickerProps = {
  onApply: (inputValue: string) => void;
};

function getLastSegment(val: string): string {
  const lastComma = val.lastIndexOf(',');
  return lastComma === -1 ? val.trim() : val.slice(lastComma + 1).trim();
}

export const ColorPicker = memo(function ColorPicker({ onApply }: ColorPickerProps) {
  const [hsv, setHsv] = useState<HsvColor>({ h: 210, s: 72, v: 68 });
  const [inputValue, setInputValue] = useState('');
  const [hasError, setHasError] = useState(false);

  // Refs so callbacks always see the latest values without stale closures
  const hsvRef = useRef(hsv);
  hsvRef.current = hsv;
  const inputValueRef = useRef(inputValue);
  inputValueRef.current = inputValue;

  const currentHex = toHex(hsbToRgb(hsv.h, hsv.s / 100, hsv.v / 100));

  const writeLastSegment = useCallback((hex: string) => {
    const val = inputValueRef.current;
    const lastComma = val.lastIndexOf(',');
    setInputValue(lastComma === -1 ? hex : val.slice(0, lastComma + 1) + ' ' + hex);
  }, []);

  const handlePickerChange = useCallback(
    ({ h, s, v }: HsvColor) => {
      setHsv({ h, s, v });
      writeLastSegment(toHex(hsbToRgb(h, s / 100, v / 100)));
      setHasError(false);
    },
    [writeLastSegment],
  );

  const handleTextInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    if (!val.trim()) {
      setHasError(false);
      return;
    }
    const lastSeg = getLastSegment(val);
    if (!lastSeg) {
      setHasError(false);
      return;
    }
    const parsed = parseColorInput(lastSeg);
    if (parsed) {
      const hsb = rgbToHsb(parsed.r, parsed.g, parsed.b);
      setHsv({ h: hsb.h, s: hsb.s * 100, v: hsb.b * 100 });
      setHasError(false);
    } else {
      setHasError(true);
    }
  }, []);

  const handleApply = useCallback(() => {
    const val = inputValueRef.current.trim();
    const lastSeg = getLastSegment(val);
    let finalValue = inputValueRef.current;
    if (!lastSeg) {
      // Trailing comma with no value after it — strip it
      const lastComma = finalValue.lastIndexOf(',');
      if (lastComma !== -1) {
        finalValue = finalValue.slice(0, lastComma).trim();
        setInputValue(finalValue);
      }
      if (!finalValue) {
        const { h, s, v } = hsvRef.current;
        finalValue = toHex(hsbToRgb(h, s / 100, v / 100));
        setInputValue(finalValue);
      }
    } else if (!parseColorInput(lastSeg)) {
      const { h, s, v } = hsvRef.current;
      const hex = toHex(hsbToRgb(h, s / 100, v / 100));
      const lastComma = finalValue.lastIndexOf(',');
      finalValue = lastComma === -1 ? hex : finalValue.slice(0, lastComma + 1) + ' ' + hex;
      setInputValue(finalValue);
    }
    onApply(finalValue);
  }, [onApply]);

  return (
    <VStack gap={1.5}>
      <Text font="headline">Or enter a color value</Text>
      <HStack
        alignItems="stretch"
        flexDirection={{ phone: 'column', tablet: 'row', desktop: 'row' }}
        gap={3}
      >
        {/* Left: react-colorful HSV picker */}
        <Box as="div" className={styles.pickerWrapper} flexGrow={1} style={{ minWidth: 0 }}>
          <HsvColorPicker color={hsv} onChange={handlePickerChange} />
        </Box>

        {/* Right: Swatch, input, hint, button */}
        <VStack gap={1.5} justifyContent="space-between" style={{ flex: 1, minWidth: 0 }}>
          <VStack gap={0.75}>
            <HStack alignItems="center" gap={1.5}>
              <Box
                borderRadius={200}
                height={40}
                style={{
                  background: currentHex,
                  border: '1px solid rgba(0,0,0,0.08)',
                  flexShrink: 0,
                }}
                width={40}
              />
              <Box flexGrow={1}>
                <TextInput
                  compact
                  helperTextErrorIconAccessibilityLabel="Error"
                  label=""
                  onChange={handleTextInputChange}
                  placeholder="#2342AD"
                  value={inputValue}
                  variant={hasError ? 'negative' : undefined}
                />
              </Box>
            </HStack>
            <HStack alignItems="center" gap={0.5} style={{ marginLeft: 52 }}>
              <Icon active color="fgMuted" name="info" size="s" />
              <Text color="fgMuted" font="legal">
                Insert commas between multiple values
              </Text>
            </HStack>
          </VStack>
          <Button
            compact
            disabled={!inputValue.trim()}
            endIcon="forwardArrow"
            onClick={handleApply}
            variant="secondary"
          >
            Find closest primitive
          </Button>
        </VStack>
      </HStack>
    </VStack>
  );
});
