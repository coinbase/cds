export type DateInputValidationErrorType = 'required' | 'invalid' | 'disabled';

export class DateInputValidationError extends Error {
  type: DateInputValidationErrorType | 'custom';

  constructor(type: DateInputValidationError['type'], message: string) {
    super(message);
    this.name = 'DateInputValidationError';
    this.type = type;
  }
}
