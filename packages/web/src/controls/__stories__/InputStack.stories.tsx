import React from 'react';

import { Box } from '../../layout/Box';
import { Text } from '../../typography/Text';
import { InputStack } from '../InputStack';

export default {
  title: 'Components/InputStack',
  component: InputStack,
};

export const InputStackExamples = () => (
  <InputStack
    appendNode={
      <Box background="bgPrimary">
        <Text as="p" color="fgInverse" display="block" font="body">
          Append
        </Text>
      </Box>
    }
    endNode={
      <Box background="bgPositive" borderRadius={200}>
        <Text as="p" color="fgInverse" display="block" font="body">
          EndContent
        </Text>
      </Box>
    }
    helperTextNode={
      <Box background="bgOverlay" height={30} width="100%">
        <Text as="p" display="block" font="body">
          HelperText
        </Text>
      </Box>
    }
    inputNode={
      <Box background="bgAlternate" flexGrow={2}>
        <Text as="p" display="block" font="body">
          Input
        </Text>
      </Box>
    }
    labelNode={
      <Box background="bgAlternate" height={30} width="100%">
        <Text as="p" display="block" font="body">
          Label
        </Text>
      </Box>
    }
    prependNode={
      <Box background="bgPrimary">
        <Text as="p" color="fgInverse" display="block" font="body">
          Prepend
        </Text>
      </Box>
    }
    startNode={
      <Box background="bgPositive" borderRadius={200}>
        <Text as="p" color="fgInverse" display="block" font="body">
          StartContent
        </Text>
      </Box>
    }
    variant="primary"
  />
);

export const Append = () => (
  <InputStack
    appendNode={
      <Box background="bgPrimary" borderRadius={200}>
        <Text as="p" color="fgInverse" display="block" font="body">
          Append
        </Text>
      </Box>
    }
    endNode={
      <Box background="bgPositive" borderRadius={200}>
        <Text as="p" color="fgInverse" display="block" font="body">
          EndContent
        </Text>
      </Box>
    }
    helperTextNode={
      <Box background="bgOverlay" height={30} width="100%">
        <Text as="p" display="block" font="body">
          HelperText
        </Text>
      </Box>
    }
    inputNode={
      <Box background="bgAlternate" flexGrow={2}>
        <Text as="p" display="block" font="body">
          Input
        </Text>
      </Box>
    }
    labelNode={
      <Box background="bgAlternate" height={30} width="100%">
        <Text as="p" display="block" font="body">
          Label
        </Text>
      </Box>
    }
    startNode={
      <Box background="bgPositive" borderRadius={200}>
        <Text as="p" color="fgInverse" display="block" font="body">
          StartContent
        </Text>
      </Box>
    }
    variant="primary"
  />
);

export const Prepend = () => (
  <InputStack
    endNode={
      <Box background="bgPositive" borderRadius={200}>
        <Text as="p" color="fgInverse" display="block" font="body">
          EndContent
        </Text>
      </Box>
    }
    helperTextNode={
      <Box background="bgOverlay" height={30} width="100%">
        <Text as="p" display="block" font="body">
          HelperText
        </Text>
      </Box>
    }
    inputNode={
      <Box background="bgAlternate" flexGrow={2}>
        <Text as="p" display="block" font="body">
          Input
        </Text>
      </Box>
    }
    labelNode={
      <Box background="bgAlternate" height={30} width="100%">
        <Text as="p" display="block" font="body">
          Label
        </Text>
      </Box>
    }
    prependNode={
      <Box background="bgPrimary" borderRadius={200}>
        <Text as="p" color="fgInverse" display="block" font="body">
          Append
        </Text>
      </Box>
    }
    startNode={
      <Box background="bgPositive" borderRadius={200}>
        <Text as="p" color="fgInverse" display="block" font="body">
          StartContent
        </Text>
      </Box>
    }
    variant="primary"
  />
);
