import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Select from 'react-select';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Footer from 'components/Footer';
import Header from 'components/Header';
import SideNav from 'components/LabSideNav';
import reducer from './reducer';
import saga from './saga';
import makeSelectLabTestPricing from './selectors';
import {
  getLabServicesAction,
  getLabServiceItemsAction,
  getLabUserServicesAction,
  saveLabServicesAction,
} from './actions';
import ProfileWidget from '../../../components/ProfileWidget';
import Input from '../../../components/Input';

const deliveryModes = [
  { value: true, label: 'Home Visit' },
  { value: false, label: 'Office Visit' },
];

const groupsToSelectOptions = data =>
  data.map(item => ({ value: item, label: item }));

function Test(props) {
  const { onChange } = props;
  const options = deliveryModes;
  const [test, setTest] = useState(props.test);

  const handleCheckboxChange = () => {
    const item = {
      ...test,
      selected: !test.selected,
    };
    setTest(item);
    onChange(item);
  };

  const handleAmountChange = amount => {
    const item = {
      ...test,
      selected: true,
      amount,
    };
    setTest(item);
    onChange(item);
  };

  const handleServiceChange = items => {
    const item = {
      ...test,
      selected: true,
      deliveryModes: items,
    };
    setTest(item);
    onChange(item);
  };

  return (
    <tr>
      <td>
        <input
          type="checkbox"
          checked={test.selected}
          onChange={handleCheckboxChange}
        />
      </td>
      <td>{test.name}</td>
      <td>
        <Input
          filter="^\d{0,8}$"
          value={test.amount}
          className="form-control"
          onChange={data => handleAmountChange(data)}
        />
        {/* {validation.initialConsultationFee.isInvalid && (
                          <Warning message={validation.initialConsultationFee.message} />
                        )} */}
      </td>
      <td>
        <Select
          closeMenuOnSelect={false}
          isMulti
          value={test.deliveryModes}
          options={options}
          onChange={value => handleServiceChange(value)}
        />
      </td>
    </tr>
  );
}

export function TestPricing(props) {
  useInjectReducer({ key: 'labTestPricing', reducer });
  useInjectSaga({ key: 'labTestPricing', saga });

  const {
    getLabServices,
    getLabServiceItems,
    getUserLabServices,
    saveLabServices,
    labTestPricing,
  } = props;

  const [selectedGroup, setSelectedGroup] = useState();
  const [selectedServices, setSelectedServices] = useState({});

  useEffect(() => {
    getLabServices(toast);
    getUserLabServices(toast);
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      selectedServices[selectedGroup.value] = labTestPricing.services.map(
        service => {
          const userService = labTestPricing.userServices.find(
            s => s.serviceId === service.serviceId,
          );
          if (userService) {
            return {
              ...userService,
              amount: userService.amount || service.amount,
              deliveryModes: deliveryModes.filter(
                dm => dm.value === userService.isHomeVisit,
              ),
            };
          }
          return service;
        },
      );
      setSelectedServices({ ...selectedServices });
    }
  }, [labTestPricing.services, labTestPricing.userServices]);

  useEffect(() => {
    if (selectedGroup) {
      const services = selectedServices[selectedGroup.value] || [];

      if (services.length === 0) {
        getLabServiceItems(selectedGroup.value, toast);
      }
    }
  }, [selectedGroup]);

  const handleServiceChange = data => {
    setSelectedGroup(data);
  };

  const handleServiceUpdate = test => {
    const services = selectedServices[selectedGroup.value];
    selectedServices[selectedGroup.value] = services.map(service =>
      service.serviceId === test.serviceId ? test : service,
    );
    // setSelectedServices({ ...selectedServices });
  };

  const handleSaveServices = () => {
    const services = Object.keys(selectedServices)
      .map(key => selectedServices[key])
      .flat()
      .filter(service => service.selected)
      .map(service => ({
        serviceId: service.serviceId,
        amount: service.amount,
        isHomeVisit: !!(service.deliveryModes || []).find(
          item => item.value === true,
        ),
      }));

    saveLabServices(services, toast);
  };

  const Loading = () => {
    return (
      <tr>
        <td colSpan="4">
          <p className="text-center">Loading...</p>
        </td>
      </tr>
    );
  };

  const ContentUI = () => {
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Tests & Pricing</h4>
          <div className="profile-box">
            <form>
              <div className="row">
                <div className="col-md-4">
                  <div className="form-group">
                    <Select
                      closeMenuOnSelect={false}
                      value={selectedGroup}
                      options={groupsToSelectOptions(labTestPricing.groups)}
                      onChange={value => handleServiceChange(value)}
                    />
                  </div>
                </div>
              </div>
              <table className="table">
                <thead>
                  <th />
                  <th width="40%">Service Name</th>
                  <th width="15%">Price</th>
                  <th width="35%">Mode of Delivery</th>
                </thead>
                <tbody>
                  {labTestPricing.serviceLoading ? (
                    <Loading />
                  ) : (
                    selectedGroup &&
                    (selectedServices[selectedGroup.value] || []).map(test => (
                      <Test
                        key={test.serviceId}
                        test={test}
                        onChange={handleServiceUpdate}
                      />
                    ))
                  )}
                </tbody>
              </table>
              {selectedGroup &&
                (selectedServices[selectedGroup.value] || []).length > 0 && (
                  <div className="row">
                    <div className="submit-section">
                      <button
                        type="button"
                        onClick={handleSaveServices}
                        className="btn btn-primary submit-btn"
                        disabled={labTestPricing.saving}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}
            </form>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Helmet>
        <title>Tests & Pricing</title>
        <meta name="description" content="Lab Tests & Pricing" />
      </Helmet>
      <Header />
      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-12 col-12">
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Tests & Pricing
                  </li>
                </ol>
              </nav>
              <h2 className="breadcrumb-title">Tests & Pricing</h2>
            </div>
          </div>
        </div>
      </div>
      {/* /Breadcrumb */}
      {/* Page Content */}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-5 col-lg-4 col-xl-3 theiaStickySidebar">
              {/* Profile Sidebar */}
              <div className="profile-sidebar">
                <ProfileWidget />
                <SideNav />
              </div>
              {/* /Profile Sidebar */}
            </div>
            <div className="col-md-7 col-lg-8 col-xl-9">
              <div className="row">
                <div className="col-sm-12">
                  <ContentUI />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ScheduleModal /> */}
      <Footer />
    </div>
  );
}

TestPricing.propTypes = {
  getLabServices: PropTypes.func.isRequired,
  getLabServiceItems: PropTypes.func.isRequired,
  getUserLabServices: PropTypes.func.isRequired,
  saveLabServices: PropTypes.func.isRequired,
  labTestPricing: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  labTestPricing: makeSelectLabTestPricing(),
});

const mapDispatchToProps = dispatch => ({
  getLabServices: toastr => dispatch(getLabServicesAction(toastr)),
  getLabServiceItems: (payload, toastr) =>
    dispatch(getLabServiceItemsAction(payload, toastr)),
  getUserLabServices: toastr => dispatch(getLabUserServicesAction(toastr)),
  saveLabServices: (payload, toastr) =>
    dispatch(saveLabServicesAction(payload, toastr)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(TestPricing);
