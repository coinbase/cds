// import { useEffect, useState } from 'react';
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { useFonts as useFontsInter } from '@expo-google-fonts/inter/useFonts';
import { SourceCodePro_400Regular } from '@expo-google-fonts/source-code-pro/400Regular';
import { SourceCodePro_600SemiBold } from '@expo-google-fonts/source-code-pro/600SemiBold';
import { useFonts as useFontsSourceCodePro } from '@expo-google-fonts/source-code-pro/useFonts';
import { useFonts as useFontsExpo } from 'expo-font';

const localFonts = {
  CoinbaseIcons: require('@cbhq/cds-icons/fonts/native/CoinbaseIcons.ttf') as string,
};

const interFonts = {
  Inter_400Regular,
  Inter_600SemiBold,
};

const sourceCodeProFonts = {
  SourceCodePro_400Regular,
  SourceCodePro_600SemiBold,
};

export function useFonts() {
  const [loadedLocal, errorLocal] = useFontsExpo(localFonts);
  const [loadedInter, errorInter] = useFontsInter(interFonts);
  const [loadedSourceCodePro, errorSourceCodePro] = useFontsSourceCodePro(sourceCodeProFonts);

  return [
    loadedLocal && loadedInter && loadedSourceCodePro,
    errorLocal || errorInter || errorSourceCodePro,
  ];
}
