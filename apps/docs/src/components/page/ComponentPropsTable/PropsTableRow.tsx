import React, { useMemo } from 'react';
import { cx } from '@coinbase/cds-web';
import { VStack } from '@coinbase/cds-web/layout';
import { Divider } from '@coinbase/cds-web/layout/Divider';
import { Link } from '@coinbase/cds-web/typography/Link';
import { TextBody } from '@coinbase/cds-web/typography/TextBody';
import { TextLabel2 } from '@coinbase/cds-web/typography/TextLabel2';
import type {
  ProcessedPropItem,
  SharedTypeAliases,
} from '@coinbase/docusaurus-plugin-docgen/types';
import DocusaurusLink from '@docusaurus/Link';

import ModalLink from './ModalLink';
import styles from './styles.module.css';

export type TypeAliasModalContentProps = {
  typeAlias: string;
  type?: string;
};

export function TypeAliasModalContent({ typeAlias, type }: TypeAliasModalContentProps) {
  // Check if this is a ResponsiveProp type
  const isResponsiveProp = type && type.includes('ResponsiveProp');

  // Parse token values
  const tokenValues = useMemo(() => {
    if (typeAlias.includes('|')) {
      return typeAlias
        .split('|')
        .map((v) => v.trim())
        .filter(Boolean);
    }
    return typeAlias.includes('\n') ? typeAlias.split('\n') : [typeAlias];
  }, [typeAlias]);

  return (
    <VStack gap={2}>
      <VStack gap={1}>
        {tokenValues.map((value, index) => (
          <span key={index}>
            <code>{value}</code>
          </span>
        ))}
      </VStack>

      {/* Add link to responsive props documentation if this is a ResponsiveProp type */}
      {isResponsiveProp && (
        <VStack gap={1}>
          <Divider />
          <Link as={DocusaurusLink} to="/getting-started/styling#responsive-styles">
            Learn more about responsive props.
          </Link>
        </VStack>
      )}
    </VStack>
  );
}

export type PropsTableRowProps = {
  prop: ProcessedPropItem;
  sharedTypeAliases: SharedTypeAliases;
  searchTerm?: string;
};

function highlightText(text: string, highlight: string) {
  if (!highlight.trim()) {
    return text;
  }

  // Match at word start or after a capital letter
  const regex = new RegExp(`(?:^|(?<=[A-Z]))(${highlight})`, 'gi');
  const matches = Array.from(text.matchAll(regex));

  if (!matches.length) return text;

  let lastIndex = 0;
  const elements = [];

  matches.forEach((match) => {
    const [matchedText] = match;
    const { index } = match;

    // Add text before match
    if (index > lastIndex) {
      elements.push(text.slice(lastIndex, index));
    }

    // Add highlighted match
    elements.push(
      <span
        key={`${matchedText}-${index}`}
        style={{
          backgroundColor: 'rgba(var(--blue20), 0.5)',
        }}
      >
        {matchedText}
      </span>,
    );

    lastIndex = index + matchedText.length;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements;
}

function PropsTableRow({ prop, sharedTypeAliases, searchTerm = '' }: PropsTableRowProps) {
  const { defaultValue, name, description, type, required } = prop;

  const highlightedName = useMemo(() => highlightText(name, searchTerm), [name, searchTerm]);

  const nameContent = useMemo(() => {
    return (
      <VStack as="h3" className={cx(styles.propsNameWrapper, 'anchor')} id={name}>
        <TextBody as="p">
          {highlightedName}
          {required && <TextBody color="fgNegative">*</TextBody>}
        </TextBody>
        <TextLabel2 as="p" color="fgMuted" overflow="break" paddingTop={0.5}>
          {description}
        </TextLabel2>
      </VStack>
    );
  }, [description, name, required, highlightedName]);
  const typeContent = useMemo(() => {
    if (type in sharedTypeAliases) {
      const typeAlias = sharedTypeAliases[type];
      return (
        <ModalLink
          mono
          content={<TypeAliasModalContent type={type} typeAlias={typeAlias} />}
          font="body"
        >
          {type}
        </ModalLink>
      );
    }
    return (
      <TextBody mono font="body" overflow="break">
        {type}
      </TextBody>
    );
  }, [sharedTypeAliases, type]);
  return (
    <tr>
      <td className={styles.propsTableCell}>{nameContent}</td>
      <td className={styles.propsTableCell}>{typeContent}</td>
      <td className={styles.propsTableCell}>
        <TextBody mono as="span">
          {defaultValue ?? '--'}
        </TextBody>
      </td>
    </tr>
  );
}

export default PropsTableRow;
