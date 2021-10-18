export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';
export const GOOGLE_API_KEY = 'AIzaSyDRzHsBRo6pd_uVJVmIKctlC9ZYxd1HeeU';
export const PASSWORD_RULE_REGEX = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,15}$)',
);
export const PASSWORD_RULE_FAILED_MESSAGE = `Your passwords must be at least 8 characters long and contain special characters like @, ! or #. Avoid using common sequence like 'password', '123456' or 'abcdef' or repetitions like 121212, ababab.`;

export const professionalList = [
  {
    id: 'DOCTOR',
    title: 'Doctor',
    desc: '',
  },
  {
    id: 'NURSE',
    title: 'Nurse',
    // desc: 'Lorem Ipsum',
  },
  {
    id: 'PHYSIOTHERAPIST',
    title: 'Physiotherapist',
    // desc: 'Lorem Ipsum',
  },
  // {
  //   id: 'LABORATORY',
  //   title: 'Laboratory',
  //   desc: 'Lorem Ipsum',
  // },
  // {
  //   id: 'PHARMACY',
  //   title: 'Pharmacy',
  //   desc: 'Lorem Ipsum',
  // },
];
