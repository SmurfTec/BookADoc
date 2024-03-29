/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import Footer from 'components/Footer';
import Header from 'components/Header';
import H1 from 'components/H1';
import messages from './messages';

export default function NotFound() {
  return (
    <article>
      <Header />
      <H1>
        <FormattedMessage {...messages.header} />
      </H1>
      <Footer />
    </article>
  );
}
