import React, { useEffect } from 'react';

import { useSparklineInteractiveContext } from './SparklineInteractiveProvider';

type InnerSparklineInteractiveProviderProps = {
  width: number;
  height: number;
  children: React.ReactNode;
};

export const InnerSparklineInteractiveProvider = ({
  width,
  height,
  children,
}: InnerSparklineInteractiveProviderProps) => {
  const { setWidth, setHeight } = useSparklineInteractiveContext();

  useEffect(() => {
    setWidth(width);
    setHeight(height);
  }, [width, height, setWidth, setHeight]);

  return <>{children}</>;
};
