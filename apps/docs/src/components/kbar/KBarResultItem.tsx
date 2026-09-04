import React, { forwardRef, Fragment, memo, useMemo } from 'react';
import type { IconName } from '@coinbase/cds-common';
import { Icon } from '@coinbase/cds-web/icons/Icon';
import { Pictogram, type PictogramName } from '@coinbase/cds-web/illustrations/Pictogram';
import { HStack, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography/Text';
import type { ActionImpl } from 'kbar';

type KBarResultItemProps = {
  action: ActionImpl & {
    pictogram?: PictogramName;
    iconName?: string;
  };
  active: boolean;
  currentRootActionId?: string | null | undefined;
};

const KBarResultItem = memo(
  forwardRef(
    (
      { action, active, currentRootActionId }: KBarResultItemProps,
      ref: React.Ref<HTMLDivElement>,
    ) => {
      const ancestors = useMemo(() => {
        if (!currentRootActionId) return action.ancestors;
        const index = action.ancestors.findIndex((ancestor) => ancestor.id === currentRootActionId);
        return action.ancestors.slice(index + 1);
      }, [action.ancestors, currentRootActionId]);

      const title = useMemo(() => {
        return (
          <HStack gap={1}>
            {ancestors?.map((ancestor) => (
              <Fragment key={ancestor.id}>
                <Text accessibilityLabel={`${ancestor.name},`} as="span" color="fgMuted">
                  {ancestor.name}
                </Text>
                <Text as="span" color="fgMuted">
                  &rsaquo;
                </Text>
              </Fragment>
            ))}
            <Text
              accessibilityLabel={`${action.name},`}
              as="span"
              color={active ? 'fgPrimary' : 'fg'}
            >
              {action.name}
            </Text>
          </HStack>
        );
      }, [action.name, ancestors, active]);

      const media = useMemo(() => {
        if (action.pictogram) {
          return <Pictogram name={action.pictogram} />;
        }
        return (
          <HStack alignItems="center" height={24}>
            <Icon
              color={active ? 'fgPrimary' : 'fg'}
              name={(action.icon as IconName) ?? 'compass'}
              size="s"
            />
          </HStack>
        );
      }, [action, active]);

      return (
        <HStack
          ref={ref}
          background={active ? 'bgSecondary' : 'bg'}
          gap={1.5}
          paddingX={3}
          paddingY={1}
          style={{
            cursor: 'pointer',
          }}
        >
          {media}
          <VStack>
            {title}
            {!!action.subtitle && (
              <Text as="div" color="fgMuted" font="body" overflow="truncate">
                {action.subtitle}
              </Text>
            )}
          </VStack>
        </HStack>
      );
    },
  ),
);

export default KBarResultItem;
