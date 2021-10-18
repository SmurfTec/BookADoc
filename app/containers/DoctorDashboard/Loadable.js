/**
 *
 * Asynchronously loads the component for DoctorDashboard
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
