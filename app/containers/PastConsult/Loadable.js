/**
 *
 * Asynchronously loads the component for PastConsult
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
