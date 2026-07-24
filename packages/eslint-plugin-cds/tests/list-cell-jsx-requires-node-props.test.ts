import { RuleTester } from '@typescript-eslint/rule-tester';

import { listCellJsxRequiresNodeProps as rule } from '../src/rules/list-cell-jsx-requires-node-props';

import { normalizeIndent } from './normalizeIndent';

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

// @ts-expect-error - not sure why the rule type is not matching up with the rule tester
ruleTester.run('list-cell-jsx-requires-node-props', rule, {
  valid: [
    `
      import { ListCell } from '@coinbase/cds-mobile/cells';
      const Component = () => <ListCell title="Title" description="Description" />;
    `,
    `
      import { ListCell } from '@coinbase/cds-mobile/cells';
      import { Text } from '@coinbase/cds-mobile/typography';
      const Component = () => (
        <ListCell title={<Text font="headline">Title</Text>} description={<Text>Desc</Text>} />
      );
    `,
    `
      import { ListCell } from '@coinbase/cds-web/cells';
      const Component = () => (
        <ListCell titleNode={<HStack><Text>Title</Text></HStack>} descriptionNode={<Box>Desc</Box>} />
      );
    `,
    `
      import { ContentCell } from '@coinbase/cds-web/cells';
      const Component = () => <ContentCell title={<HStack>Title</HStack>} />;
    `,
    `
      import { ListCell } from 'other-lib';
      const Component = () => <ListCell title={<HStack>Title</HStack>} />;
    `,
    `
      import { ListCell } from '@coinbase/cds-mobile';
      import { Text } from '@coinbase/cds-mobile/typography';
      const title = <Text>Title</Text>;
      const Component = () => <ListCell title={title} />;
    `,
    `
      import { ListCell } from '@coinbase/cds-mobile';
      import { Text } from '@coinbase/cds-mobile/typography';
      const Component = () => (
        <ListCell title={condition ? <Text>A</Text> : <Text>B</Text>} />
      );
    `,
    `
      import { ListCell } from '@coinbase/cds-mobile';
      const Component = () => <ListCell title="Title" subtitle="Subtitle" />;
    `,
    `
      import { ListCell } from '@coinbase/cds-mobile';
      import { Text as CdsText } from '@coinbase/cds-mobile/typography';
      const Component = () => <ListCell detail={<CdsText>$1.00</CdsText>} />;
    `,
  ],
  invalid: [
    {
      code: normalizeIndent`
        import { ListCell } from '@coinbase/cds-mobile/cells';
        const Component = () => <ListCell title={<HStack><Text>Title</Text></HStack>} />;
      `,
      errors: [{ messageId: 'useNodeProp', data: { prop: 'title', nodeProp: 'titleNode' } }],
      output: normalizeIndent`
        import { ListCell } from '@coinbase/cds-mobile/cells';
        const Component = () => <ListCell titleNode={<HStack><Text>Title</Text></HStack>} />;
      `,
    },
    {
      code: normalizeIndent`
        import { ListCell } from '@coinbase/cds-mobile';
        const Component = () => <ListCell description={<Box>Desc</Box>} />;
      `,
      errors: [
        { messageId: 'useNodeProp', data: { prop: 'description', nodeProp: 'descriptionNode' } },
      ],
      output: normalizeIndent`
        import { ListCell } from '@coinbase/cds-mobile';
        const Component = () => <ListCell descriptionNode={<Box>Desc</Box>} />;
      `,
    },
    {
      code: normalizeIndent`
        import { ListCell } from '@coinbase/cds-web/cells/ListCell';
        const Component = () => <ListCell subtitle={<Box>Sub</Box>} />;
      `,
      errors: [{ messageId: 'useNodeProp', data: { prop: 'subtitle', nodeProp: 'subtitleNode' } }],
      output: normalizeIndent`
        import { ListCell } from '@coinbase/cds-web/cells/ListCell';
        const Component = () => <ListCell subtitleNode={<Box>Sub</Box>} />;
      `,
    },
    {
      code: normalizeIndent`
        import { ListCell } from '@coinbase/cds-mobile/cells';
        const Component = () => (
          <ListCell detail={<Box>D</Box>} subdetail={<Box>S</Box>} />
        );
      `,
      errors: [
        { messageId: 'useNodeProp', data: { prop: 'detail', nodeProp: 'detailNode' } },
        { messageId: 'useNodeProp', data: { prop: 'subdetail', nodeProp: 'subdetailNode' } },
      ],
      output: normalizeIndent`
        import { ListCell } from '@coinbase/cds-mobile/cells';
        const Component = () => (
          <ListCell detailNode={<Box>D</Box>} subdetailNode={<Box>S</Box>} />
        );
      `,
    },
    {
      code: normalizeIndent`
        import { ListCell } from '@coinbase/cds-mobile';
        const title = <HStack><Text>Title</Text></HStack>;
        const Component = () => <ListCell title={title} />;
      `,
      errors: [{ messageId: 'useNodeProp', data: { prop: 'title', nodeProp: 'titleNode' } }],
      output: normalizeIndent`
        import { ListCell } from '@coinbase/cds-mobile';
        const title = <HStack><Text>Title</Text></HStack>;
        const Component = () => <ListCell titleNode={title} />;
      `,
    },
    {
      code: normalizeIndent`
        import { ListCell } from '@coinbase/cds-mobile';
        const Component = () => <ListCell title={<>Title</>} />;
      `,
      errors: [{ messageId: 'useNodeProp', data: { prop: 'title', nodeProp: 'titleNode' } }],
      output: normalizeIndent`
        import { ListCell } from '@coinbase/cds-mobile';
        const Component = () => <ListCell titleNode={<>Title</>} />;
      `,
    },
    {
      code: normalizeIndent`
        import { ListCell } from '@coinbase/cds-mobile';
        const Component = () => (
          <ListCell title={<HStack>A</HStack>} titleNode={<HStack>B</HStack>} />
        );
      `,
      errors: [{ messageId: 'useNodeProp', data: { prop: 'title', nodeProp: 'titleNode' } }],
    },
    {
      code: normalizeIndent`
        import { ListCell as Cell } from '@coinbase/cds-mobile/cells';
        const Component = () => <Cell title={<Box>Title</Box>} />;
      `,
      errors: [{ messageId: 'useNodeProp', data: { prop: 'title', nodeProp: 'titleNode' } }],
      output: normalizeIndent`
        import { ListCell as Cell } from '@coinbase/cds-mobile/cells';
        const Component = () => <Cell titleNode={<Box>Title</Box>} />;
      `,
    },
    {
      code: normalizeIndent`
        import { ListCell } from '@coinbase/cds-mobile/cells/ListCell';
        import { Text } from './Text';
        const Component = () => <ListCell detail={<Text>$1.00</Text>} />;
      `,
      errors: [{ messageId: 'useNodeProp', data: { prop: 'detail', nodeProp: 'detailNode' } }],
      output: normalizeIndent`
        import { ListCell } from '@coinbase/cds-mobile/cells/ListCell';
        import { Text } from './Text';
        const Component = () => <ListCell detailNode={<Text>$1.00</Text>} />;
      `,
    },
    {
      code: normalizeIndent`
        import { ListCell } from '@coinbase/cds-mobile';
        import { Text } from '@coinbase/cds-mobile/typography';
        const Component = () => (
          <ListCell detail={balance ? <Box>{balance}</Box> : undefined} />
        );
      `,
      errors: [{ messageId: 'useNodeProp', data: { prop: 'detail', nodeProp: 'detailNode' } }],
      output: normalizeIndent`
        import { ListCell } from '@coinbase/cds-mobile';
        import { Text } from '@coinbase/cds-mobile/typography';
        const Component = () => (
          <ListCell detailNode={balance ? <Box>{balance}</Box> : undefined} />
        );
      `,
    },
    {
      code: normalizeIndent`
        import { ListCell } from '@coinbase/cds-mobile';
        import { Text } from '@coinbase/cds-mobile/typography';
        const Component = () => (
          <ListCell detail={items.map(() => <Text>$1.00</Text>)} />
        );
      `,
      errors: [{ messageId: 'useNodeProp', data: { prop: 'detail', nodeProp: 'detailNode' } }],
      output: normalizeIndent`
        import { ListCell } from '@coinbase/cds-mobile';
        import { Text } from '@coinbase/cds-mobile/typography';
        const Component = () => (
          <ListCell detailNode={items.map(() => <Text>$1.00</Text>)} />
        );
      `,
    },
    {
      code: normalizeIndent`
        import { ListCell } from '@coinbase/cds-mobile';
        import { Text } from '@coinbase/cds-mobile/typography';
        const Component = () => <ListCell detail={[<Text key="a">$1.00</Text>]} />;
      `,
      errors: [{ messageId: 'useNodeProp', data: { prop: 'detail', nodeProp: 'detailNode' } }],
      output: normalizeIndent`
        import { ListCell } from '@coinbase/cds-mobile';
        import { Text } from '@coinbase/cds-mobile/typography';
        const Component = () => <ListCell detailNode={[<Text key="a">$1.00</Text>]} />;
      `,
    },
    {
      code: normalizeIndent`
        import { ListCell } from '@coinbase/cds-mobile';
        const Component = () => (
          <ListCell detail={<Box>$1.00</Box> as React.ReactNode} />
        );
      `,
      errors: [{ messageId: 'useNodeProp', data: { prop: 'detail', nodeProp: 'detailNode' } }],
      output: normalizeIndent`
        import { ListCell } from '@coinbase/cds-mobile';
        const Component = () => (
          <ListCell detailNode={<Box>$1.00</Box> as React.ReactNode} />
        );
      `,
    },
  ],
});
