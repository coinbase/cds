export const getTransform = (translateX: number, translateY: number) => {
  return {
    position: 'absolute',
    transform: [
      {
        translateX,
      },
      {
        translateY,
      },
    ],
  };
};
