import React, { useCallback, useRef } from 'react';
import type { LottiePlayer } from '@coinbase/cds-common/types/LottiePlayer';
import type { NuxLottie } from '@coinbase/cds-lottie-files';
import { nux } from '@coinbase/cds-lottie-files';

import { Button } from '../../buttons';
import { VStack } from '../../layout/VStack';
import { Lottie } from '../Lottie';

export default {
  component: Lottie,
  title: 'Components/Lottie',
};

type LottieRef = LottiePlayer<NuxLottie>;

export const Default = () => {
  const lottie = useRef<LottieRef>(null);

  // Play animation on click
  const play = useCallback(() => {
    lottie.current?.play();
  }, []);

  // onAnimationFinish will reset the lottie animation
  const onAnimationFinish = useCallback(() => {
    lottie.current?.reset();
  }, []);

  return (
    <VStack>
      <Button onClick={play}>Play</Button>
      <Lottie ref={lottie} height={500} onAnimationFinish={onAnimationFinish} source={nux} />
    </VStack>
  );
};
