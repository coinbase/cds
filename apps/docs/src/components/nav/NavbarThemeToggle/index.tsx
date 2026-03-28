import React, { useCallback, useRef, useState } from 'react';
import { Dropdown } from '@coinbase/cds-web/dropdown';
import { useA11yControlledVisibility } from '@coinbase/cds-web/hooks/useA11yControlledVisibility';
import { Box, VStack } from '@coinbase/cds-web/layout';
import { Pressable } from '@coinbase/cds-web/system';
import {
  type ThemeOption,
  themeOptions,
  useDocsTheme,
  useUnifiedTheme,
} from '@site/src/theme/Layout/Provider/UnifiedThemeContext';

const NavbarThemeToggle = () => {
  const { theme: docsTheme, colorScheme } = useDocsTheme();
  const { setThemeOption } = useUnifiedTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const { controlledElementAccessibilityProps } = useA11yControlledVisibility(dropdownVisible, {
    accessibilityLabel: 'Theme color options',
    hasPopupType: 'menu',
  });

  /**
   * Handles keyboard interactions (Enter/Space) for accessibility.
   * When a valid key is pressed, prevents default behavior and
   * triggers the same flow as clicking the theme option.
   */
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, themeOption: ThemeOption) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setThemeOption(themeOption);
      }
    },
    [setThemeOption],
  );

  const handleOpenMenu = useCallback(() => {
    setDropdownVisible(true);
    setTimeout(() => {
      containerRef.current?.querySelector<HTMLElement>('button')?.focus();
    }, 1);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setDropdownVisible(false);
  }, []);

  const colorKey = `${colorScheme}Color` as const;
  const activeColor = docsTheme[colorKey]?.bgPrimary;

  return (
    <Dropdown
      {...controlledElementAccessibilityProps}
      aria-label="Open theme color selector"
      content={
        <VStack
          ref={containerRef}
          alignItems="center"
          alignSelf="center"
          aria-label="Theme color options"
          background="bgSecondary"
          gap={1.5}
          padding={1.5}
          role="radiogroup"
        >
          {themeOptions.map((themeOption) => {
            const color =
              colorScheme === 'light' ? themeOption.light.bgPrimary : themeOption.dark.bgPrimary;
            return (
              <Box
                key={themeOption.label}
                aria-checked={activeColor === color}
                aria-label={themeOption.label}
                as="button"
                borderColor="bgInverse"
                borderRadius={1000}
                borderWidth={200}
                height={16}
                onClick={() => setThemeOption(themeOption)}
                onKeyDown={(event) => handleKeyDown(event, themeOption)}
                role="radio"
                style={{
                  background: color,
                  cursor: 'pointer',
                  borderStyle: activeColor === color ? 'solid' : 'none',
                }}
                tabIndex={0}
                width={16}
              />
            );
          })}
        </VStack>
      }
      contentPosition={{ gap: 0.5, skid: 0 }}
      onCloseMenu={handleCloseMenu}
      onOpenMenu={handleOpenMenu}
      value={activeColor}
    >
      <Pressable
        accessibilityLabel="Edit theme color"
        alignContent="center"
        alignItems="center"
        as="button"
        background="bgSecondary"
        borderRadius={1000}
        height={40}
        justifyContent="center"
        onClick={handleOpenMenu}
        style={{ cursor: 'pointer' }}
        width={40}
      >
        <Box background="bgPrimary" borderRadius={1000} padding={1} />
      </Pressable>
    </Dropdown>
  );
};

export default NavbarThemeToggle;
