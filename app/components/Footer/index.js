import React from 'react';
import { FormattedMessage } from 'react-intl';

import LocaleToggle from 'containers/LocaleToggle';
import A from './A';
import Wrapper from './Wrapper';
import messages from './messages';

function Footer() {
  return (
    <Wrapper>
      <section>
        <LocaleToggle />
      </section>
      <section>
        <FormattedMessage
          {...messages.authorMessage}
          values={{
            author: <A href="/">Ted Lano</A>,
          }}
        />
      </section>
    </Wrapper>
  );
}

export default Footer;
