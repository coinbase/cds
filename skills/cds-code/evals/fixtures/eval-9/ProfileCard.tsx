import { memo } from 'react';
import { graphql, useLazyLoadQuery } from 'react-relay';
import { Avatar } from '@coinbase/cds-web/media';
import { HStack, VStack } from '@coinbase/cds-web/layout';
import { Text } from '@coinbase/cds-web/typography';

type ProfileCardQuery = {
  readonly response: {
    readonly viewer: {
      readonly email: string;
      readonly profile: {
        readonly avatarUrl: string | null;
        readonly displayName: string | null;
      } | null;
    };
  };
};

export const ProfileCard = memo(() => {
  const data = useLazyLoadQuery<ProfileCardQuery>(
    graphql`
      query ProfileCardQuery {
        viewer {
          email
          profile {
            avatarUrl
            displayName
          }
        }
      }
    `,
    {},
  );
  const displayName = data.viewer.profile?.displayName?.trim() || data.viewer.email.split('@')[0];

  return (
    <HStack alignItems="center" gap={2} padding={2}>
      <Avatar
        alt={displayName}
        name={displayName}
        size="l"
        src={data.viewer.profile?.avatarUrl ?? undefined}
      />
      <VStack gap={0.5}>
        <Text font="headline">{displayName}</Text>
        <Text color="fgMuted" font="body">
          {data.viewer.email}
        </Text>
      </VStack>
    </HStack>
  );
});

ProfileCard.displayName = 'ProfileCard';
