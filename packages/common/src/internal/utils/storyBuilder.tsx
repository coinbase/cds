import React, { useId, useMemo } from 'react';
import isObject from 'lodash/isObject';
import merge from 'lodash/merge';
import omit from 'lodash/omit';

const emptyObject = {};

type ArgType<T> = {
  name?: string;
  description?: string;
  defaultValue?: T;
  control?: 'text' | 'select' | 'boolean';
};

type ArgTypes<Props> = { [key in keyof Props]?: ArgType<Props[key]> };

type Parameters<
  Props,
  WrapperProps,
  Wrapper extends React.ComponentType<React.PropsWithChildren<WrapperProps>>,
> = {
  stories?: Story<Props, WrapperProps>[];
  wrapper?: Wrapper;
  wrapperProps?: WrapperProps;
  percy?: {
    /**  Boolean indicating whether or not to skip this story. */
    skip?: boolean;
    /** Story args to use when snapshotting. */
    args?: Props;
    /**  An array of additional snapshots to take of this story */
    additionalSnapshots?: { args?: Props }[];
  };
  a11y?: {
    /**  Boolean indicating whether or not to skip the a11y test for this story. */
    skip?: boolean;
  };
  storyshots?: {
    /**  Boolean indicating whether or not to skip the a11y test for this story. */
    disable?: boolean;
  };
  // add types for parameters within addons that we want to support here
};

export type Story<Props, WrapperProps, ExampleFnReturnType = React.ReactElement<unknown>> = {
  (args: Props, context: StoryBuilderConfig<Props, WrapperProps>): ExampleFnReturnType;
  /**
   * Override the display name in the UI
   */
  storyName?: string;
  /**
   * Used to only include certain named exports as stories. Useful when you want to have non-story exports such as mock data or ignore a few stories.
   * @example
   * includeStories: ['SimpleStory', 'ComplexStory']
   * includeStories: /.*Story$/
   *
   * @see [Non-story exports](https://storybook.js.org/docs/formats/component-story-format/#non-story-exports)
   */
  includeStories?: string[] | RegExp;
  /**
   * Used to exclude certain named exports. Useful when you want to have non-story exports such as mock data or ignore a few stories.
   * @example
   * excludeStories: ['simpleData', 'complexData']
   * excludeStories: /.*Data$/
   *
   * @see [Non-story exports](https://storybook.js.org/docs/formats/component-story-format/#non-story-exports)
   */
  excludeStories?: string[] | RegExp;
  /**
   * Dynamic data that are provided (and possibly updated by) Storybook and its addons.
   * @see [Arg story inputs](https://storybook.js.org/docs/react/api/csf#args-story-inputs)
   */
  args?: Partial<Props>;
  /**
   * ArgTypes encode basic metadata for args, such as `name`, `description`, `defaultValue` for an arg. These get automatically filled in by Storybook Docs.
   * @see [Control annotations](https://github.com/storybookjs/storybook/blob/91e9dee33faa8eff0b342a366845de7100415367/addons/controls/README.md#control-annotations)
   */
  argTypes?: ArgTypes<Props>;
  /**
   * Custom metadata for a story.
   * @see [Parameters](https://storybook.js.org/docs/basics/writing-stories/#parameters)
   */
  parameters?: Parameters<
    Props,
    WrapperProps,
    React.ComponentType<React.PropsWithChildren<WrapperProps>>
  >;
  /**
   * Wrapper components or Storybook decorators that wrap a story.
   *
   * Decorators defined in Meta will be applied to every story variation.
   * @see [Decorators](https://storybook.js.org/docs/addons/introduction/#1-decorators)
   */
  decorators?: ((
    story: () => ExampleFnReturnType,
    context: StoryBuilderConfig<Props, WrapperProps>,
  ) => ExampleFnReturnType)[];
};

export type StoryBuilderConfig<Props, WrapperProps> = {
  args?: Props;
  argTypes?: ArgTypes<Props>;
  parameters?: Parameters<
    Props,
    WrapperProps,
    React.ComponentType<React.PropsWithChildren<WrapperProps>>
  >;
};

export const baseConfig = {
  args: {
    isDarkMode: false,
  },
  argTypes: {
    isDarkMode: {
      control: 'boolean',
      description: 'Enable dark mode',
    },
  },
  parameters: {
    // Percy specific params
    percy: {
      additionalSnapshots: [{ prefix: '[Dark mode] ', args: { isDarkMode: true } }],
    },
  },
};

function isArray<Props>(
  props: Props | Props[] | Readonly<Props> | readonly Props[],
): props is Props[] | readonly Props[] {
  return Array.isArray(props);
}

export function sanitizeProps<Props>(props: Props) {
  if (isObject(props)) {
    return omit(props, ['scale', 'spectrum']) as Props;
  }
  return emptyObject as Props;
}

export function storyBuilder<StoryBuilderArgs, WrapperProps>(
  builderConfig?: StoryBuilderConfig<StoryBuilderArgs, WrapperProps>,
) {
  function builder<Props, PropsWithoutChildren extends Omit<Props, 'children'>>(
    Component: React.ComponentType<React.PropsWithChildren<Props>>,
    sharedConfig?: StoryBuilderConfig<PropsWithoutChildren, WrapperProps>,
  ) {
    const storiesSet = new Set<Story<PropsWithoutChildren, WrapperProps>>();
    const defaultConfig = merge({}, baseConfig, builderConfig);

    function build<BuildWrapperProps>(
      args?: PropsWithoutChildren,
      customConfig?: StoryBuilderConfig<PropsWithoutChildren, BuildWrapperProps>,
    ) {
      const TemplateFn = (props: Props) => {
        const id = useId();
        const sanitizedProps = useMemo(() => sanitizeProps(props), [props]);
        return <Component key={id} {...sanitizedProps} />;
      };
      const Template = TemplateFn.bind({}) as unknown as Story<PropsWithoutChildren, WrapperProps>;
      const mergedConfig = merge(
        {},
        defaultConfig,
        sharedConfig,
        { args },
        customConfig,
      ) as unknown as StoryBuilderConfig<PropsWithoutChildren, WrapperProps>;
      Template.parameters = {
        ...mergedConfig.parameters,
        storyshots: {
          disable: mergedConfig?.parameters?.a11y?.skip,
        },
      };
      Template.args = mergedConfig.args;
      Template.argTypes = mergedConfig.argTypes;
      storiesSet.add(Template);
      return Template;
    }

    function buildSheet<SheetWrapperProps>(
      args?:
        | PropsWithoutChildren
        | PropsWithoutChildren[]
        | Readonly<PropsWithoutChildren>
        | readonly PropsWithoutChildren[],
      config?: StoryBuilderConfig<
        StoryBuilderConfig<PropsWithoutChildren, WrapperProps>['args'],
        SheetWrapperProps
      >,
    ) {
      let stories = Array.from(storiesSet.values());
      const StorySheet = () => null;
      const Template = StorySheet.bind({}) as unknown as Story<PropsWithoutChildren, WrapperProps>;

      if (isArray(args)) {
        const storiesOverride: Story<PropsWithoutChildren, WrapperProps>[] = [];
        args.forEach((itemArgs) => {
          stories.forEach((StoryTemplate) => {
            const StoryTemplateCopy = StoryTemplate.bind({});
            StoryTemplateCopy.args = merge({}, StoryTemplate.args, itemArgs);
            StoryTemplateCopy.argTypes = StoryTemplate.argTypes;
            storiesOverride.push(StoryTemplateCopy);
          });
        });
        stories = storiesOverride;
      }

      const mergedConfig = merge({}, defaultConfig, sharedConfig, config);
      Template.args = isArray(args) ? mergedConfig.args : args;
      Template.argTypes = merge({}, mergedConfig.argTypes, stories[0].argTypes);
      Template.parameters = {
        ...mergedConfig.parameters,
        storyshots: {
          disable: mergedConfig.parameters.a11y?.skip,
        },
        stories,
      };
      return Template;
    }

    return { build, buildSheet };
  }
  return builder;
}
