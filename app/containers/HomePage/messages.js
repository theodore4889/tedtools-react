/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  greeting: {
    id: 'tedtools.containers.HomePage.greeting',
    defaultMessage: 'Hello.',
  },
  mainQuestion: {
    id: 'tedtools.containers.HomePage.questions.main',
    defaultMessage: 'How may I help you?',
  },
  trymeHeader: {
    id: 'tedtools.containers.HomePage.tryme.header',
    defaultMessage: 'Try me!',
  },
  trymeMessage: {
    id: 'tedtools.containers.HomePage.tryme.message',
    defaultMessage: 'Show Github repositories by',
  },
  trymeAtPrefix: {
    id: 'tedtools.containers.HomePage.tryme.atPrefix',
    defaultMessage: '@',
  },
});
