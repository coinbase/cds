/*
  Similar to React's built-in Children.toArray method, this utility takes children and returns them as an array for
  introspection or filtering. Different from Children.toArray, it will flatten arrays and React.Fragments into a
  regular, one-dimensional array while ensuring element and fragment keys are preserved, unique, and stable between renders.
*/

import { Children, cloneElement, isValidElement } from 'react';
import { isFragment } from 'react-is';

type Child = string | number | React.ReactElement<any, string | React.JSXElementConstructor<any>>;

// typeguard to check for props in a ReactChild
export function hasProps(child: Child): child is React.ReactElement {
  return (child as React.ReactElement).props !== undefined;
}

// eslint-disable-next-line no-restricted-exports
export default function flattenNodes(
  children: React.ReactNode,
  depth = 0,
  keys: (string | number)[] = [],
): Child[] {
  return Children.toArray(children).reduce((acc: Child[], node, nodeIndex) => {
    if (isFragment(node)) {
      return [
        ...acc,
        ...flattenNodes(
          node.props.children as React.ReactNode,
          depth + 1,
          keys.concat(node.key ?? nodeIndex),
        ),
      ];
    }

    if (isValidElement(node)) {
      return [
        ...acc,
        cloneElement(node, {
          key: keys.concat(String(node.key)).join('.'),
        }),
      ];
    }

    if (typeof node === 'string' || typeof node === 'number') {
      return [...acc, node];
    }

    return acc;
  }, []);
}
