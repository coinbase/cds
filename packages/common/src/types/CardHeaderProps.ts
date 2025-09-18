import type { SharedProps } from './SharedProps';

export type CardHeaderProps = {
  /** Absolute or Relative path to Avatar */
  avatar?: string;
  /** Meta Data Text to be displayed in TextLegal */
  metaData?: string;
  /** Text to be displayed in TextCaption */
  description?: string;
  /** IconButton ReactNode */
  action?: React.ReactNode;
} & SharedProps;
