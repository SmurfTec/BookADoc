/**
 *
 * Asynchronously loads the component for Booking
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
