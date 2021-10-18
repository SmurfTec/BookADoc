/**
 *
 * ProfileWidget
 *
 */

import React, { memo, useState, useEffect  } from 'react';
import {createStructuredSelector} from "reselect";
import makeSelectDoctorLogin from "../../containers/DoctorLogin/selectors";
import makeSelectPatientLogin from "../../containers/Login/selectors";
import {connect} from "react-redux";
import {compose} from "redux";
import {getUsername} from "../../utils/helpers";
import Img from "../Img";
import Avatar from "../../images/Avatar.png";
function ProfileWidget(props) {

  const [user, setUser] = useState(props.profile || {});

  const getSpecilities = () => {
    if(user !== undefined && user !== null){
      if(user.specialties !== undefined && user.specialties !== null){
        return (user.specialties.map(function (special) {
            if(user.specialties.length === 1)
              return special.name;
            else
              return special.name+', ';
          }
        ));
      }else{
        return '';
      }
    }else{
      return '';
    }
  };
  useEffect(() => {
    const userObj =
      localStorage.getItem('user') === null
        ? {}
        : JSON.parse(localStorage.getItem('user'));
    setUser(userObj);
  }, [props.profile]);

  useEffect(() => {
    if (Object.keys(props.doctorLogin.user).length > 0) {
      setUser(props.doctorLogin.user);
    }
  }, [props.doctorLogin.user]);

  useEffect(() => {
    if (Object.keys(props.patientLogin.user).length > 0) {
      setUser(props.patientLogin.user);
    }
  }, [props.patientLogin.user]);
  return <div className="widget-profile pro-widget-content">
    <div className="profile-info-widget">
      <a href="#" className="booking-doc-img">
        <Img src={user.imageUrl || Avatar} alt="User Image" fallbackImageSrc={Avatar} />
      </a>
      <div className="profile-det-info">
        <h3>{getUsername(user.role, user.fullName)}{' '}</h3>

        <div className="patient-details">
          <h5 className="mb-0">
            { getSpecilities() }
          </h5>
        </div>
      </div>
    </div>
  </div>;
}
ProfileWidget.propTypes = {};

const mapStateToProps = createStructuredSelector({
  doctorLogin: makeSelectDoctorLogin(),
  patientLogin: makeSelectPatientLogin(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProfileWidget);

