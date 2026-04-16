import { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../../buttons/Button';
import { HStack } from '../../layout/HStack';
import { VStack } from '../../layout/VStack';
import { Text } from '../../typography/Text';
import { PopoverPanel, type PopoverPanelRef } from '../popover/PopoverPanel';
import { PortalProvider } from '../PortalProvider';

const meta: Meta<typeof PopoverPanel> = {
  title: 'Components/Overlay/PopoverPanel',
  component: PopoverPanel,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <PortalProvider>
        <Story />
      </PortalProvider>
    ),
  ],
};

export default meta;

const panelAccessibilityLabel = 'Storybook PopoverPanel';

export const Default = () => {
  const panelRef = useRef<PopoverPanelRef>(null);

  return (
    <HStack gap={4} padding={4}>
      <PopoverPanel
        ref={panelRef}
        accessibilityLabel={panelAccessibilityLabel}
        content={
          <VStack gap={2} padding={3}>
            <Text font="headline">Panel title</Text>
            <Text color="fgMuted" font="body">
              Floating panel anchored to the trigger.
            </Text>
            <Button compact onClick={() => panelRef.current?.closePopover()} variant="secondary">
              Close from content
            </Button>
          </VStack>
        }
        testID="popover-panel-default"
      >
        <Button>Open panel</Button>
      </PopoverPanel>
    </HStack>
  );
};

export const Mobile = () => {
  const panelRef = useRef<PopoverPanelRef>(null);

  return (
    <HStack gap={4} padding={4}>
      <PopoverPanel
        ref={panelRef}
        enableMobileModal
        showOverlay
        accessibilityLabel={panelAccessibilityLabel}
        content={
          <VStack gap={2} padding={3}>
            <Text font="headline">Panel title</Text>
            <Text color="fgMuted">Floating panel anchored to the trigger.</Text>
            <Button compact onClick={() => panelRef.current?.closePopover()} variant="secondary">
              Close from content
            </Button>
          </VStack>
        }
        testID="popover-panel-mobile"
      >
        <Button>Open panel</Button>
      </PopoverPanel>
    </HStack>
  );
};

export const WithOverlay = () => {
  const panelRef = useRef<PopoverPanelRef>(null);

  return (
    <HStack gap={4} padding={4}>
      <PopoverPanel
        ref={panelRef}
        showOverlay
        accessibilityLabel={panelAccessibilityLabel}
        content={
          <VStack gap={2} padding={3}>
            <Text font="body">Content with a dimmed backdrop.</Text>
            <Button compact onClick={() => panelRef.current?.closePopover()} variant="secondary">
              Done
            </Button>
          </VStack>
        }
        testID="popover-panel-overlay"
      >
        <Button>With overlay</Button>
      </PopoverPanel>
    </HStack>
  );
};

export const TopPlacement = () => {
  const panelRef = useRef<PopoverPanelRef>(null);

  return (
    <HStack alignItems="flex-end" gap={4} minHeight={240} padding={4}>
      <PopoverPanel
        ref={panelRef}
        accessibilityLabel={panelAccessibilityLabel}
        content={
          <VStack gap={2} padding={3}>
            <Text font="body">Placement is above the trigger.</Text>
            <Button compact onClick={() => panelRef.current?.closePopover()} variant="secondary">
              Close
            </Button>
          </VStack>
        }
        contentPosition={{ placement: 'top', gap: 1 }}
        testID="popover-panel-top"
      >
        <Button>Top placement</Button>
      </PopoverPanel>
    </HStack>
  );
};

export const DisablePortal = () => {
  const panelRef = useRef<PopoverPanelRef>(null);

  return (
    <HStack gap={4} padding={4}>
      <PopoverPanel
        ref={panelRef}
        disablePortal
        accessibilityLabel={panelAccessibilityLabel}
        content={
          <VStack gap={2} padding={3}>
            <Text color="fgMuted" font="caption">
              Panel renders inline (no portal). Useful when stacking context or overflow must stay
              in-tree.
            </Text>
            <Button compact onClick={() => panelRef.current?.closePopover()} variant="secondary">
              Close
            </Button>
          </VStack>
        }
        testID="popover-panel-disable-portal"
      >
        <Button>Disable portal</Button>
      </PopoverPanel>
    </HStack>
  );
};

export const Sizing = () => {
  const panelRef = useRef<PopoverPanelRef>(null);

  return (
    <HStack gap={4} padding={4}>
      <PopoverPanel
        ref={panelRef}
        accessibilityLabel={panelAccessibilityLabel}
        content={
          <VStack gap={1} padding={2}>
            {Array.from({ length: 12 }, (_, i) => (
              <Text key={i}>Row {i + 1}</Text>
            ))}
            <Button compact onClick={() => panelRef.current?.closePopover()} variant="secondary">
              Close
            </Button>
          </VStack>
        }
        maxPanelHeight={200}
        panelWidth={280}
        testID="popover-panel-sizing"
      >
        <Button>Fixed width and max height</Button>
      </PopoverPanel>
    </HStack>
  );
};

export const RenderContentWithClose = () => {
  return (
    <HStack gap={4} padding={4}>
      <PopoverPanel
        accessibilityLabel={panelAccessibilityLabel}
        content={({ closePopover }) => (
          <VStack gap={2} padding={3}>
            <Text font="caption">
              Function content receives closePopover for dismiss actions without a ref.
            </Text>
            <Button compact onClick={closePopover} variant="secondary">
              Close via render prop
            </Button>
          </VStack>
        )}
        testID="popover-panel-render-content"
      >
        <Button>Render prop API</Button>
      </PopoverPanel>
    </HStack>
  );
};

export const ImperativeRef = () => {
  const panelRef = useRef<PopoverPanelRef>(null);

  return (
    <VStack gap={4} padding={4}>
      <Button compact onClick={() => panelRef.current?.openPopover()} variant="secondary">
        Open via ref
      </Button>
      <PopoverPanel
        ref={panelRef}
        accessibilityLabel={panelAccessibilityLabel}
        content={
          <VStack gap={2} padding={3}>
            <Text font="body">Use the buttons above or press the trigger.</Text>
            <Button compact onClick={() => panelRef.current?.closePopover()} variant="secondary">
              Close from panel
            </Button>
          </VStack>
        }
        testID="popover-panel-imperative"
      >
        <Button>Trigger</Button>
      </PopoverPanel>
    </VStack>
  );
};

export const Disabled = () => {
  return (
    <HStack gap={4} padding={4}>
      <PopoverPanel
        disabled
        accessibilityLabel={panelAccessibilityLabel}
        content={
          <VStack padding={3}>
            <Text font="body">Should not show when disabled.</Text>
          </VStack>
        }
        testID="popover-panel-disabled"
      >
        <Button disabled>Disabled trigger</Button>
      </PopoverPanel>
    </HStack>
  );
};

export const CustomStyles = () => {
  const panelRef = useRef<PopoverPanelRef>(null);

  return (
    <HStack gap={4} padding={4}>
      <PopoverPanel
        ref={panelRef}
        accessibilityLabel={panelAccessibilityLabel}
        content={
          <VStack gap={2} padding={3}>
            <Text color="fgMuted" font="caption">
              content and triggerContainer use design tokens via styles.
            </Text>
            <Button compact onClick={() => panelRef.current?.closePopover()} variant="secondary">
              Close
            </Button>
          </VStack>
        }
        styles={{
          content: {
            outline: '1px dashed var(--color-fgPrimary)',
          },
          triggerContainer: {
            borderRadius: 'var(--borderRadius-200)',
            outline: '1px dashed var(--color-bgLine)',
            padding: 'var(--space-1)',
          },
        }}
        testID="popover-panel-styles"
      >
        <Button>Custom styles</Button>
      </PopoverPanel>
    </HStack>
  );
};
