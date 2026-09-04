export const getDescriptionMap = (
  iconSets: { name: string; description: string }[],
): Record<string, string[]> => {
  const descriptionMap: Record<string, string[]> = {};

  for (const iconSet of iconSets) {
    const descriptions = iconSet.description.split(',').map((part) => part.trim());
    for (const description of descriptions) {
      if (!descriptionMap[description]) descriptionMap[description] = [];
      descriptionMap[description].push(iconSet.name);
    }
  }

  return descriptionMap;
};
