import React from 'react';
import styled from '@emotion/styled';

import CodeBlock from './codeBlock';
import AnchorTag from './anchor';

const StyledPre = styled('pre')`
  padding: 16px;
  background: ${props => props.theme.colors.preFormattedText};
`;

// Helper function to safely extract text content for IDs
const getTextContent = (children) => {
  if (typeof children === 'string') {
    return children.replace(/\s+/g, '').toLowerCase();
  }
  if (React.isValidElement(children)) {
    return React.Children.toArray(children.props.children)
      .map(child => typeof child === 'string' ? child : '')
      .join('')
      .replace(/\s+/g, '')
      .toLowerCase();
  }
  if (Array.isArray(children)) {
    return children
      .map(child => typeof child === 'string' ? child : '')
      .join('')
      .replace(/\s+/g, '')
      .toLowerCase();
  }
  return '';
};

/* eslint-disable jsx-a11y/heading-has-content */
const Heading1 = props => (
  <h1 className="heading1" id={getTextContent(props.children)} {...props} />
);

const Heading2 = props => (
  <h2 className="heading2" id={getTextContent(props.children)} {...props} />
);

const Heading3 = props => (
  <h3 className="heading3" id={getTextContent(props.children)} {...props} />
);

const Heading4 = props => (
  <h4 className="heading4" id={getTextContent(props.children)} {...props} />
);

const Heading5 = props => (
  <h5 className="heading5" id={getTextContent(props.children)} {...props} />
);

const Heading6 = props => (
  <h6 className="heading6" id={getTextContent(props.children)} {...props} />
);
/* eslint-enable jsx-a11y/heading-has-content */

export default {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  h4: Heading4,
  h5: Heading5,
  h6: Heading6,
  p: props => <p className="paragraph" {...props} />,
  pre: props => (
    <StyledPre>
      <pre {...props} />
    </StyledPre>
  ),
  code: CodeBlock,
  a: AnchorTag,
  // TODO add `img`
  // TODO add `blockquote`
  // TODO add `ul`
  // TODO add `li`
  // TODO add `table`
};
