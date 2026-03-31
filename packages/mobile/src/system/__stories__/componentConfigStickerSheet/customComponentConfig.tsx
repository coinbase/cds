import type { ComponentConfig } from '../../../core/componentConfig';
import { Text } from '../../../typography/Text';

export const customComponentConfig: ComponentConfig = {
  Banner: {
    borderRadius: 0,
  },

  Button: (props) => ({
    borderRadius: 200,
    height: props.compact ? 24 : 32,
    font: props.compact ? 'label1' : 'headline',
    progressCircleSize: props.compact ? 12 : 16,
    paddingY: 0,
  }),

  IconButton: (props) => {
    const isCompact = props.compact ?? true;
    return {
      borderRadius: 200,
      height: isCompact ? 24 : 32,
      width: isCompact ? 24 : 32,
      ...(props.variant === 'tertiary'
        ? {
            background: 'bgAlternate',
            color: 'fg',
            borderColor: 'bgAlternate',
          }
        : {}),
    };
  },

  TextInput: ({ label, labelNode, ...props }) => ({
    labelNode:
      (labelNode ?? label) ? (
        <Text color="fgMuted" font="label2">
          {label}
        </Text>
      ) : undefined,
    bordered: false,
    inputBackground: 'bgAlternate',
    font: props.compact ? 'label2' : 'body',
    variant: 'foregroundMuted',
    focusedBorderWidth: 100,
  }),

  Switch: (props) => ({
    background: props.checked ? 'bgPrimary' : undefined,
    controlColor: props.checked ? 'bgAlternate' : 'fg',
  }),

  Tooltip: {
    invertColorScheme: false,
  },

  Radio: (props) => ({
    background: 'bg',
    borderWidth: props.checked ? 200 : 100,
    borderColor: props.checked ? 'bgPrimary' : 'bgLinePrimarySubtle',
    controlColor: 'bgPrimary',
    dotSize: 20 / 3,
  }),

  /**
   * Advanced parity gap: we use 4px border radius instead of 2px border radius, could be fixed by adding borderRadius of 50
   */
  Checkbox: (props) => ({
    borderWidth: 200,
    controlColor: 'fg',
    background: props.checked ? 'bgSecondary' : undefined,
    borderColor: props.checked ? 'bgSecondary' : 'bgLinePrimarySubtle',
  }),

  ModalHeader: {
    paddingX: 4,
    paddingY: 3,
  },

  ModalFooter: {
    paddingX: 4,
    paddingY: 4,
  },

  ModalBody: {
    paddingX: 4,
  },

  SegmentedTabs: {
    activeBackground: 'bgSecondary',
    background: 'bgAlternate',
    borderRadius: 300,
  },

  SegmentedTab: {
    activeColor: 'fg',
    borderRadius: 200,
    font: 'headline',
  },

  Chip: {
    borderRadius: 200,
  },

  Link: {
    underline: true,
  },

  ControlGroup: {
    gap: 1,
  },

  SearchInput: (props) => ({
    borderRadius: 200,
    height: props.compact ? 24 : 32,
  }),

  Select: (props) => ({
    bordered: false,
    variant: 'foregroundMuted',
    inputBackground: 'bgAlternate',
    focusedBorderWidth: 100,
    height: props.compact ? 24 : props.labelVariant === 'inside' ? 40 : 32,
    font: props.compact ? 'label2' : 'body',
    labelColor: 'fgMuted',
    labelFont: props.compact ? (props.align === 'end' ? 'label1' : 'label2') : 'body',
  }),
};
