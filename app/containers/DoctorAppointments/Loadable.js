/**
 *
 * Asynchronously loads the component for PatientAppointments
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
