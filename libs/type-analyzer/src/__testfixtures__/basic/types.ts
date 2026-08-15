export type BaseProps = {
  /** Base property documentation. */
  base: string;
  removed: boolean;
  shared?: number;
};

export type ExtraProps = {
  extra?: boolean;
  shared: number;
};

export type PickedProps = Pick<ExtraProps, 'extra' | 'shared'>;

export type ComposedProps = BaseProps &
  PickedProps &
  Omit<BaseProps, 'removed'> & {
    inline?: Date;
    shared: 1 | 2;
  };

export type ParentProps = {
  parent: string;
};

export type ChildProps = ParentProps & {
  child?: number;
};
