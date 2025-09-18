import React from 'react';
import type { GestureResponderEvent } from 'react-native';

import { Example, ExampleScreen } from '../../examples/ExampleScreen';
import { Button } from '../Button';
import { ButtonGroup } from '../ButtonGroup';
import { IconButton } from '../IconButton';

function onPress(event: GestureResponderEvent) {
  console.log('Pressed', event.type || 'GestureResponderEvent');
}

const ButtonGroupScreen = () => {
  return (
    <ExampleScreen>
      <Example>
        <ButtonGroup accessibilityLabel="Group">
          <Button onPress={onPress}>Save</Button>
          <Button onPress={onPress} variant="negative">
            Cancel
          </Button>
        </ButtonGroup>

        <ButtonGroup accessibilityLabel="Group">
          <Button onPress={onPress}>Button</Button>
          <Button onPress={onPress}>Button</Button>
          <Button onPress={onPress}>Button</Button>
        </ButtonGroup>

        <ButtonGroup accessibilityLabel="Group">
          <Button compact onPress={onPress} variant="secondary">
            Button
          </Button>
          <Button compact onPress={onPress} variant="secondary">
            Button
          </Button>
          <Button compact onPress={onPress} variant="secondary">
            Button
          </Button>
          <Button compact onPress={onPress} variant="secondary">
            Button
          </Button>
        </ButtonGroup>

        <ButtonGroup accessibilityLabel="Group">
          <Button transparent onPress={onPress}>
            Button
          </Button>
          <Button transparent onPress={onPress}>
            Button
          </Button>
          <Button transparent onPress={onPress}>
            Button
          </Button>
        </ButtonGroup>

        <ButtonGroup accessibilityLabel="Group">
          <IconButton name="arrowLeft" onPress={onPress} />
          <IconButton name="arrowUp" onPress={onPress} />
          <IconButton name="arrowRight" onPress={onPress} />
        </ButtonGroup>
      </Example>

      <Example title="Block">
        <ButtonGroup block accessibilityLabel="Group">
          <Button onPress={onPress}>Save</Button>
          <Button onPress={onPress} variant="negative">
            Cancel
          </Button>
        </ButtonGroup>

        <ButtonGroup block accessibilityLabel="Group">
          <Button onPress={onPress}>Button</Button>
          <Button onPress={onPress}>Button</Button>
          <Button onPress={onPress}>Button</Button>
        </ButtonGroup>

        <ButtonGroup block accessibilityLabel="Group">
          <Button compact onPress={onPress} variant="secondary">
            Button
          </Button>
          <Button compact onPress={onPress} variant="secondary">
            Button
          </Button>
          <Button compact onPress={onPress} variant="secondary">
            Button
          </Button>
          <Button compact onPress={onPress} variant="secondary">
            Button
          </Button>
        </ButtonGroup>

        <ButtonGroup block accessibilityLabel="Group">
          <Button transparent onPress={onPress}>
            Button
          </Button>
          <Button transparent onPress={onPress}>
            Button
          </Button>
          <Button transparent onPress={onPress}>
            Button
          </Button>
        </ButtonGroup>
      </Example>

      <Example title="Vertical">
        <ButtonGroup accessibilityLabel="Group" direction="vertical">
          <Button onPress={onPress}>Save</Button>
          <Button onPress={onPress} variant="negative">
            Cancel
          </Button>
        </ButtonGroup>
      </Example>
    </ExampleScreen>
  );
};

export default ButtonGroupScreen;
