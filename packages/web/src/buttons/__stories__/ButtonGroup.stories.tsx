import React from 'react';

import { VStack } from '../../layout';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { IconButton } from '../IconButton';

const onClick = console.log;

export const Default = () => (
  <VStack gap={2}>
    <ButtonGroup accessibilityLabel="Group">
      <Button onClick={onClick}>Save</Button>
      <Button onClick={onClick} variant="negative">
        Cancel
      </Button>
    </ButtonGroup>
    <ButtonGroup accessibilityLabel="Group">
      <Button onClick={onClick}>Button</Button>
      <Button onClick={onClick}>Button</Button>
      <Button onClick={onClick}>Button</Button>
    </ButtonGroup>

    <ButtonGroup accessibilityLabel="Group">
      <Button compact onClick={onClick} variant="secondary">
        Button
      </Button>
      <Button compact onClick={onClick} variant="secondary">
        Button
      </Button>
      <Button compact onClick={onClick} variant="secondary">
        Button
      </Button>
      <Button compact onClick={onClick} variant="secondary">
        Button
      </Button>
    </ButtonGroup>
    <ButtonGroup accessibilityLabel="Group">
      <Button transparent onClick={onClick}>
        Button
      </Button>
      <Button transparent onClick={onClick}>
        Button
      </Button>
      <Button transparent onClick={onClick}>
        Button
      </Button>
    </ButtonGroup>
    <ButtonGroup accessibilityLabel="Group">
      <IconButton accessibilityLabel="Left" name="arrowLeft" onClick={onClick} />
      <IconButton accessibilityLabel="Up" name="arrowUp" onClick={onClick} />
      <IconButton accessibilityLabel="Right" name="arrowRight" onClick={onClick} />
    </ButtonGroup>
  </VStack>
);

export const Block = () => (
  <VStack gap={2}>
    <ButtonGroup block accessibilityLabel="Group">
      <Button onClick={onClick}>Save</Button>
      <Button onClick={onClick} variant="negative">
        Cancel
      </Button>
    </ButtonGroup>
    <ButtonGroup block accessibilityLabel="Group">
      <Button onClick={onClick}>Button</Button>
      <Button onClick={onClick}>Button</Button>
      <Button onClick={onClick}>Button</Button>
    </ButtonGroup>

    <ButtonGroup block accessibilityLabel="Group">
      <Button compact onClick={onClick} variant="secondary">
        Button
      </Button>
      <Button compact onClick={onClick} variant="secondary">
        Button
      </Button>
      <Button compact onClick={onClick} variant="secondary">
        Button
      </Button>
      <Button compact onClick={onClick} variant="secondary">
        Button
      </Button>
    </ButtonGroup>
    <ButtonGroup block accessibilityLabel="Group">
      <Button transparent onClick={onClick}>
        Button
      </Button>
      <Button transparent onClick={onClick}>
        Button
      </Button>
      <Button transparent onClick={onClick}>
        Button
      </Button>
    </ButtonGroup>
  </VStack>
);

export const Vertical = () => (
  <ButtonGroup accessibilityLabel="Group" direction="vertical">
    <Button onClick={onClick}>Save</Button>
    <Button onClick={onClick} variant="negative">
      Cancel
    </Button>
  </ButtonGroup>
);

export default {
  title: 'Components/Buttons/ButtonGroup',
  component: ButtonGroup,
};
