/*
  Similar to React's built-in Children.toArray method, this utility takes children and returns them as an array for
  introspection or filtering. Different from Children.toArray, it will flatten arrays and React.Fragments into a
  regular, one-dimensional array while ensuring element and fragment keys are preserved, unique, and stable between renders.
*/

import { Children, cloneElement, isValidElement } from 'react';
import type { FragmentProps } from 'react';
import { isFragment } from 'react-is';

type FlattenedNode = React.ReactElement | string | number;

// eslint-disable-next-line no-restricted-exports
export default function flattenNodes(
  children: React.ReactNode,
  depth = 0,
  keys: (string | number)[] = [],
): FlattenedNode[] {
  return Children.toArray(children).reduce((acc: FlattenedNode[], node, nodeIndex) => {
    if (isFragment(node)) {
      // react-is only narrows type down to ReactElement, not FragmentElement
      const fragmentNode = node as React.ReactElement<FragmentProps>;
      return [
        ...acc,
        ...flattenNodes(fragmentNode.props.children, depth + 1, keys.concat(node.key ?? nodeIndex)),
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
