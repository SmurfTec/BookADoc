import moment from 'moment';

const getUsername = (role, name) => {
  if (name) {
    if (role.toLowerCase() === 'doctor') return `Dr. ${name}`;
    if (role.toLowerCase() === 'physiotherapist') return `PT. ${name}`;
    return name;
  }
  return '';
};

const isUserLoggedIn = () => {
  const token = localStorage.getItem('token');
  const strUser = window.localStorage.getItem('user');

  if (!(strUser && token)) return false;

  try {
    const user = JSON.parse(strUser);
    return !!user;
  } catch (err) {
    return false;
  }
};

const convertMillisToDate = milis => {
  return moment(milis).format('DD MMM YYYY hh:mm a');
};

const arr = ['roles', 'services'];
class SearchParams {
  deserialize() {
    const params = new URLSearchParams(window.location.search);

    const data = {
      listIndex: parseInt(params.get('listIndex')) || 0,
      addr: params.get('addr'),
    };

    const lat = parseFloat(params.get('lat'));
    if (lat) {
      data.lat = lat;
    }

    const lng = parseFloat(params.get('lng'));
    if (lng) {
      data.lng = lng;
    }

    const language = params.get('language');
    if (language) {
      data.language = language;
    }

    const fromTime = parseInt(params.get('fromTime'));
    if (fromTime) {
      data.fromTime = fromTime;
    }

    const toTime = parseInt(params.get('toTime'));
    if (toTime) {
      data.toTime = toTime;
    }

    const speciality = params.get('speciality');
    if (speciality) {
      data.speciality = speciality;
    }

    const r = params.get('roles');
    if (r) {
      data.roles = r.split(',').map(role => role.trim());
    }

    const services = params.get('services');
    if (services) {
      data.services = services.split(',').map(service => service.trim());
    }

    const isHomeVisit = params.get('isHomeVisit');
    if (isHomeVisit) {
      data.isHomeVisit = isHomeVisit;
    }

    const doctorName = params.get('doctorName');
    if (doctorName) {
      data.doctorName = doctorName;
    }

    this.params = data;

    return data;
  }

  reload(obj) {
    const data = Object.assign({}, obj);
    const search = Object.keys(data)
      .map(key => {
        let items = data[key];
        if (arr.includes(key)) {
          items = (data[key] || []).join(',');
        }

        return `${key}=${items || ''}`;
      })
      .join('&');

    return window.history.pushState('', '', `?${search}`);
  }

  get location() {
    const { addr, lat, lng } = this.params || {};
    if (lat && lng) {
      return {
        addr,
        lat,
        lng,
      };
    }

    return null;
  }
}

export { getUsername, isUserLoggedIn, convertMillisToDate, SearchParams };
