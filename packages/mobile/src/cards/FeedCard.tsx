import React, { memo, useMemo } from 'react';
import type { PressableProps } from 'react-native';
import type { CardMediaPlacement, SharedProps } from '@coinbase/cds-common/types';

import { Button, type ButtonBaseProps, IconButton, type IconButtonBaseProps } from '../buttons';
import { HStack } from '../layout/HStack';

import { Card, type CardBaseProps } from './Card';
import { CardBody, type CardBodyBaseProps } from './CardBody';
import { CardFooter } from './CardFooter';
import { CardHeader } from './CardHeader';
import { LikeButton, type LikeButtonBaseProps } from './LikeButton';

/** @deprecated Use the ContentCard component instead. */
export type FeedCardBaseProps = CardBaseProps &
  SharedProps &
  Pick<CardBodyBaseProps, 'image' | 'pictogram' | 'spotSquare'> & {
    /** Image url for Avatar */
    avatar?: string;
    /** Source of the card info. Typically this text is associated with the avatar. */
    author?: string;
    /** Metadata to be displayed under author text. */
    metadata?: string;
    /** Above places media above text content, start & end places media to the side of text content
     * @default above for mobile, start for web. Web will need to handle responsiveness changes manually.
     */
    mediaPlacement?: Exclude<CardMediaPlacement, 'end'>;
    /** Text to be displayed in TextHeadline under CardHeader section. */
    title: string;
    /** Text to be displayed in TextLabel2 under title. */
    description: string;
    /** IconButton to show in top-right of FeedCard. Takes props for IconButton */
    headerAction?: IconButtonBaseProps & { onPress?: PressableProps['onPress'] };
    like?: LikeButtonBaseProps;
    comment?: Omit<IconButtonBaseProps, 'name'>;
    share?: Omit<IconButtonBaseProps, 'name'>;
    cta?: ButtonBaseProps;
  };

/** @deprecated Use the ContentCard component instead. */
export type FeedCardProps = FeedCardBaseProps;

/** @deprecated Use the ContentCard component instead. */
export const FeedCard = memo(function FeedCard({
  testID = 'feed-card',
  avatar,
  author,
  metadata,
  pictogram,
  spotSquare,
  image,
  mediaPlacement = 'above',
  title,
  description,
  headerAction,
  like,
  comment,
  share,
  cta,
  borderRadius = 0,
  elevation = 0,
  ...cardProps
}: FeedCardProps) {
  const footer = useMemo(() => {
    const hasFooterActions = Boolean(like ?? comment ?? share ?? cta);
    const hasFooter = hasFooterActions || Boolean(cta);
    if (hasFooter) {
      return (
        <CardFooter justifyContent="space-between" testID={testID}>
          {hasFooterActions && (
            <HStack gap={0.5}>
              {like && <LikeButton testID={`${testID}-like`} {...like} />}
              {comment && (
                <IconButton
                  transparent
                  accessibilityLabel="Comment"
                  name="annotation"
                  testID={`${testID}-comment`}
                  {...comment}
                />
              )}
              {share && (
                <IconButton
                  transparent
                  accessibilityLabel="Share"
                  name="share"
                  testID={`${testID}-share`}
                  {...share}
                />
              )}
            </HStack>
          )}
          {cta && <Button compact transparent flush="end" variant="secondary" {...cta} />}
        </CardFooter>
      );
    }
    return null;
  }, [comment, cta, like, share, testID]);

  return (
    <Card borderRadius={borderRadius} elevation={elevation} gap={2} testID={testID} {...cardProps}>
      <CardHeader
        action={
          headerAction && (
            <IconButton transparent accessibilityLabel="More" flush="end" {...headerAction} />
          )
        }
        avatar={avatar}
        description={author}
        metaData={metadata}
        testID={`${testID}-header`}
      />
      <CardBody
        description={description}
        image={image}
        mediaPlacement={mediaPlacement}
        paddingY={footer === null ? undefined : 0} // Only override default CardBody spacing if footer is present
        pictogram={pictogram}
        spotSquare={spotSquare}
        testID={`${testID}-body`}
        title={title}
      />
      {footer}
    </Card>
  );
});
