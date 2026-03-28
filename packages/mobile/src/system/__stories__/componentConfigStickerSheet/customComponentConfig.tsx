import type { ComponentConfig } from '../../../core/componentConfig';
import { Text } from '../../../typography/Text';

export const customComponentConfig: ComponentConfig = {
  Button: (props) => ({
    borderRadius: 200,
    height: props.compact ? 24 : 32,
    font: props.compact ? 'label1' : 'headline',
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
  }),

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

  Select: {
    bordered: false,
    variant: 'foregroundMuted',
  },
};
