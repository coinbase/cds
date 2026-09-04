export type ProgressBarLabel =
  | number
  | {
      value: number;
      render: (num: number, disabled?: boolean) => React.ReactNode;
    };

export const getProgressBarLabelParts = (label: ProgressBarLabel) => {
  if (typeof label === 'number') {
    return {
      value: label,
    };
  }

  return {
    value: label.value,
    render: label.render,
  };
};
