/**
 *
 * ScheduleTimings
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Switch from '@material-ui/core/Switch';
import { TimeInput } from 'material-ui-time-picker';
import moment from 'moment';
import { toast } from 'react-toastify';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectScheduleTimings from './selectors';
import {
  fetchScheduleTimingsAction,
  saveAverageConsultationTimeAction,
  updateTimeSlotsAction,
  updateSingleDayTimeSlotAction,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import Warning from '../Warning/Loadable';

class Validator {
  #valid;

  #message;

  constructor(startTime, endTime) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.#valid = false;
    this.#message = '';
  }

  get isValid() {
    return this.#valid;
  }

  get message() {
    return this.#message;
  }

  validate(startTime, endTime) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.#valid = true;
    this.#message = '';
    if (!this.startTime || !this.endTime) {
      this.#valid = false;
      this.#message = 'Start & End Time are mandatory';
      return this.#valid;
    }

    if (+this.endTime - +this.startTime - 5 * 60 * 1000 <= 0) {
      this.#valid = false;
      this.#message = 'End Time must be greater than Start Time';
      return this.#valid;
    }

    return this.#valid;
  }

  isAfter(afterTime, beforeTime) {
    if (+afterTime - +beforeTime - 5 * 60 * 1000 <= 0) {
      this.#valid = false;
      this.#message = 'Next time slot must start after previous time slot';
      return this.#valid;
    }

    return this.#valid;
  }

  isBetween(time1, time2, startTime, endTime) {
    if (!(+time1 > +startTime && +time2 < +endTime)) {
      this.#valid = false;
      this.#message = 'Exception time must be within open slot';
      return this.#valid;
    }

    return this.#valid;
  }
}

const weekDaySettings = [
  {
    weekDay: 1,
    weekDayName: 'SUN',
    weekDayFullName: 'Sunday',
    validator: new Validator(),
  },
  {
    weekDay: 2,
    weekDayName: 'MON',
    weekDayFullName: 'Monday',
    validator: new Validator(),
  },
  {
    weekDay: 3,
    weekDayName: 'TUE',
    weekDayFullName: 'Tuesday',
    validator: new Validator(),
  },
  {
    weekDay: 4,
    weekDayName: 'WED',
    weekDayFullName: 'Wednesday',
    validator: new Validator(),
  },
  {
    weekDay: 5,
    weekDayName: 'THU',
    weekDayFullName: 'Thursday',
    validator: new Validator(),
  },
  {
    weekDay: 6,
    weekDayName: 'FRI',
    weekDayFullName: 'Friday',
    validator: new Validator(),
  },
  {
    weekDay: 7,
    weekDayName: 'SAT',
    weekDayFullName: 'Saturday',
    validator: new Validator(),
  },
];

let shouldClose = false;

export function Scheduler(props) {
  useInjectReducer({ key: 'scheduleTimings', reducer });
  useInjectSaga({ key: 'scheduleTimings', saga });

  const [weekDays, setWeekDays] = useState([...weekDaySettings]);
  const [averageTimeConsultation, setAverageTimeConsultation] = useState('');
  const [show, setShow] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState({});
  const [checkedValue, setCheckedValue] = useState(false);
  const [applyToOtherDay, setApplyToOtherDay] = useState(false);

  if (props.scheduleTimings.saving) {
    shouldClose = true;
  } else if (shouldClose && !props.scheduleTimings.errorMsg) {
    props.fetchDoctorScheduleFunc();
    shouldClose = false;
    setShow(false);
    setApplyToOtherDay(false);
  }

  useEffect(() => {
    props.fetchDoctorScheduleFunc();
  }, []);

  useEffect(() => {
    const scheduler =
      props.scheduleTimings.doctorSchedule.doctorScheduler || [];
    const arr = weekDaySettings.map(wds => {
      const slot = scheduler.find(s => s.weekDay === wds.weekDay);
      if (slot) {
        return slot;
      }

      return wds;
    });

    setWeekDays(arr);
    setAverageTimeConsultation(
      props.scheduleTimings.doctorSchedule.avergeTimeConsultation,
    );
  }, [props.scheduleTimings.doctorSchedule]);

  const handleClose = () => setShow(false);
  const handleShow = slot => {
    setCheckedValue(!!(slot.startTime && slot.endTime));
    setSelectedSlot({ ...slot });
    setShow(true);
  };

  const validate = () => {
    let isValid = true;
    if (checkedValue) {
      const item = weekDaySettings.find(
        wds => wds.weekDay === selectedSlot.weekDay,
      );
      isValid = item.validator.validate(
        selectedSlot.startTime,
        selectedSlot.endTime,
      );
      let prevItem;
      for (let exception of selectedSlot.exceptionTime || []) {
        exception.validator = new Validator();
        let valid = exception.validator.validate(
          exception.startTime,
          exception.endTime,
        );
        if (!valid) {
          isValid = false;
        }

        if (prevItem) {
          valid = exception.validator.isAfter(
            exception.startTime,
            prevItem.endTime,
          );
          if (!valid) {
            isValid = false;
          }
        }

        valid = exception.validator.isBetween(
          exception.startTime,
          exception.endTime,
          selectedSlot.startTime,
          selectedSlot.endTime,
        );
        if (!valid) {
          isValid = false;
        }

        prevItem = exception;
      }
    }

    setSelectedSlot({ ...selectedSlot });

    return isValid;
  };

  const handleOK = () => {
    if (!validate()) {
      return false;
    }

    if (!checkedValue) {
      selectedSlot.isClosed = true;
      selectedSlot.startTime = undefined;
      selectedSlot.endTime = undefined;
      selectedSlot.exceptionTime = [];
    }

    const daysSelected = weekDays.filter(
      wd => wd.selected && wd.weekDay !== selectedSlot.weekDay,
    );

    if (daysSelected.length > 0) {
      let arr = weekDays
        .filter(wd => wd.weekDay !== selectedSlot.weekDay)
        .map(wd => {
          if (wd.selected) {
            return {
              ...selectedSlot,
              weekDay: wd.weekDay,
              weekDayName: wd.weekDayName,
            };
          }

          return wd;
        });

      arr = [...arr, selectedSlot];
      const payload = {
        avergeTimeConsultation: averageTimeConsultation || '40',
        doctorScheduler: arr,
      };

      props.updateMultiDayTimeSlotsFunc(payload, toast);
    } else {
      props.updateSingleDayTimeSlotFunc(selectedSlot, toast);
    }
  };

  const handleCheckedValue = () => {
    setCheckedValue(!checkedValue);
  };

  const handleAverageTimeConsultationChange = e => {
    props.saveAverageConsultationTimeFunc(e.target.value, toast);
  };

  const handleWeekdaySelection = weekday => {
    const arr = (weekDays || []).map(wd => {
      if (weekday.weekDay === wd.weekDay) {
        return {
          ...wd,
          selected: !weekday.selected,
        };
      }

      return wd;
    });

    setWeekDays([...arr]);
  };

  const handleChangeTime = ({ startTime, endTime }) => {
    let st = selectedSlot.startTime;
    if (startTime) {
      st =
        moment(startTime).valueOf() -
        moment(startTime)
          .startOf('day')
          .valueOf();
    }

    let et = selectedSlot.endTime;
    if (endTime) {
      et =
        moment(endTime).valueOf() -
        moment(endTime)
          .startOf('day')
          .valueOf();
    }

    setSelectedSlot({ ...selectedSlot, startTime: st, endTime: et });
  };

  const handleExceptionChangeTime = (exception, time) => {
    const exceptionTime = (selectedSlot.exceptionTime || []).map(et => {
      if (et === exception) {
        return {
          ...et,
          startTime: time.startTime
            ? moment(time.startTime).valueOf() -
              moment(time.startTime)
                .startOf('day')
                .valueOf()
            : et.startTime,
          endTime: time.endTime
            ? moment(time.endTime).valueOf() -
              moment(time.endTime)
                .startOf('day')
                .valueOf()
            : et.endTime,
        };
      }

      return et;
    });

    setSelectedSlot({ ...selectedSlot, exceptionTime });
  };

  const handleChangeTimeRemove = exception => {
    const exceptionTime = (selectedSlot.exceptionTime || []).filter(
      et => et !== exception,
    );
    setSelectedSlot({ ...selectedSlot, exceptionTime });
  };

  const handleAddException = () => {
    const exceptionTime = [...(selectedSlot.exceptionTime || []), {}];
    setSelectedSlot({ ...selectedSlot, exceptionTime });
  };

  const LoadingView = () => {
    return (
      <td colSpan="4">
        <div className="text-center">Loading...</div>
      </td>
    );
  };

  const ErrorView = () => {
    return (
      <td colSpan="4">
        <div className="text-center">
          <p>{props.scheduleTimings.errorMsg}</p>
          <a href="#" onClick={() => props.fetchDoctorScheduleFunc()}>
            Click to retry
          </a>
        </div>
      </td>
    );
  };

  const ClosedStatus = () => {
    return <strong className="text-danger">Closed</strong>;
  };

  const Timings = data => {
    const { weekDay } = data;
    const startTime = moment()
      .startOf('day')
      .add(weekDay.startTime, 'milliseconds');
    const endTime = moment()
      .startOf('day')
      .add(weekDay.endTime, 'milliseconds');
    const strStartTime = startTime.format('hh:mm a');
    const strEndTime = endTime.format('hh:mm a');

    return (
      <div>
        <span>{strStartTime}</span>
        {' - '}
        <span>{strEndTime}</span>
      </div>
    );
  };

  const NoSchedule = () => {
    return <p>-</p>;
  };

  const Weekday = data => {
    const { weekDay } = data;

    return (
      <tr>
        <th scope="row">{weekDay.weekDayName}</th>
        {/* <td>{weekDay.isClosed ? <ClosedStatus key={weekDay.weekDay} /> : (weekDay.startTime && weekDay.endTime ? <Timings key={weekDay.weekDay} weekDay={weekDay} /> : <NoSchedule />)}</td> */}
        <td>
          {weekDay.startTime && weekDay.endTime ? (
            <Timings key={weekDay.weekDay} weekDay={weekDay} />
          ) : (
            <ClosedStatus />
          )}
        </td>
        <td>
          {weekDay.exceptionTime && weekDay.exceptionTime.length > 0 ? (
            weekDay.exceptionTime.map(wd => (
              <Timings
                key={`${weekDay.weekDay}-${wd.startTime}-${wd.endTime}`}
                weekDay={wd}
              />
            ))
          ) : (
            <NoSchedule />
          )}
        </td>
        <td>
          <a href="#" onClick={() => handleShow(weekDay)} className="p-2">
            <i className="fa fa-pencil" />
          </a>
        </td>
      </tr>
    );
  };

  const SchedulerUI = () => {
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Schedule Timings</h4>
          <div className="profile-box">
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <span>Average duration per consultation is </span>
                  <select
                    value={averageTimeConsultation}
                    onChange={handleAverageTimeConsultationChange}
                    className="select"
                    disabled={
                      props.scheduleTimings.savingAverageConsultationTime
                    }
                  >
                    <option value="">-</option>
                    <option value="40">40 mins</option>
                    <option value="45">45 mins</option>
                    <option value="50">50 mins</option>
                    <option value="55">55 mins</option>
                    <option value="60">60 mins</option>
                  </select>
                </div>
              </div>
            </div>
            <table className="table">
              <thead>
                <th />
                <th>Timing</th>
                <th>Exceptions</th>
                <th />
              </thead>
              <tbody>
                {props.scheduleTimings.loading ? (
                  <LoadingView />
                ) : props.scheduleTimings.errorMsg ? (
                  <ErrorView />
                ) : (
                  (weekDays || []).map(weekDay => (
                    <Weekday key={weekDay.weekDay} weekDay={weekDay} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const TimeSlot = data => {
    const startTime = data.startTime
      ? moment()
          .startOf('day')
          .add(data.startTime, 'milliseconds')
          .toDate()
      : null;
    const endTime = data.endTime
      ? moment()
          .startOf('day')
          .add(data.endTime, 'milliseconds')
          .toDate()
      : null;

    return (
      <>
        <div className="col-md-2">
          <div className="text-center">from</div>
        </div>
        <div className="col-md-2">
          <div className="schedule time-picker">
            <TimeInput
              mode="12h"
              placeholder={startTime ? null : 'Start'}
              value={startTime}
              onChange={time => data.handleChangeTime({ startTime: time })}
            />
          </div>
        </div>
        <div className={data.labelClassName || 'col-md-1'}>
          <div className="text-bottom">to</div>
        </div>
        <div className="col-md-2">
          <div className="schedule time-picker">
            <TimeInput
              mode="12h"
              placeholder={endTime ? null : 'End'}
              value={endTime}
              onChange={time => data.handleChangeTime({ endTime: time })}
            />
          </div>
        </div>
      </>
    );
  };

  const EditSchedulerUI = () => {
    const weekDaySetting = weekDaySettings.find(
      wds => wds.weekDay === selectedSlot.weekDay,
    );

    return (
      <div className="card">
        <div className="card-header">
          <h3>Update Timings</h3>
          <h4 className="text-center">
            {weekDaySetting.weekDayFullName.toUpperCase()}
          </h4>
        </div>
        <div className="card-body">
          <div className="profile-box">
            <div className="row">
              <div className="col font-weight-bold">
                This slot is
                <Switch
                  checked={checkedValue}
                  onChange={handleCheckedValue}
                  color="primary"
                  name="checkedB"
                  inputProps={{ 'aria-label': 'Is slot open' }}
                />
                {checkedValue ? (
                  <span>Open</span>
                ) : (
                  <span className="text-danger">Closed</span>
                )}
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-2" />
              <div className="col-md-10 pl-0">
                <div className="row">
                  {checkedValue && (
                    <TimeSlot
                      startTime={selectedSlot.startTime}
                      endTime={selectedSlot.endTime}
                      handleChangeTime={handleChangeTime}
                    />
                  )}
                  {!weekDaySetting.validator.isValid && (
                    <div className="offset-md-2 col-md-10">
                      <Warning message={weekDaySetting.validator.message} />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {checkedValue && (
              <div className="row mt-4">
                <div className="col-md-2">
                  <h5>Exceptions:</h5>
                </div>
                <div className="col-md-10 pl-0">
                  {(selectedSlot.exceptionTime || []).map(exception => (
                    <div className="row mb-3">
                      <TimeSlot
                        startTime={exception.startTime}
                        endTime={exception.endTime}
                        handleChangeTime={time =>
                          handleExceptionChangeTime(exception, time)
                        }
                      />
                      <div className="col-md-2">
                        <a
                          href="#"
                          className="p-4"
                          onClick={() => handleChangeTimeRemove(exception)}
                        >
                          <i className="fa fa-close" />
                        </a>
                      </div>
                      {exception.validator && !exception.validator.isValid && (
                        <div className="offset-md-2 col-md-10">
                          <Warning message={exception.validator.message} />
                        </div>
                      )}
                    </div>
                  ))}
                  <div className="md-10 mb-4 text-right">
                    <button
                      className="btn btn-light btn-sm"
                      onClick={handleAddException}
                    >
                      Add Exception
                    </button>
                  </div>
                </div>
              </div>
            )}
            {checkedValue && <OtherDays />}
          </div>
        </div>
        <div className="card-footer">
          <button
            className="btn btn-secondary btn-md"
            onClick={handleClose}
            disabled={props.scheduleTimings.saving}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary submit-btn ml-4"
            onClick={handleOK}
            disabled={props.scheduleTimings.saving}
          >
            Save Changes
          </button>
        </div>
      </div>
    );
  };

  const OtherDays = () => {
    return (
      <>
        <div className="row">
          <div className="col-md-12">
            <label>
              <input
                checked={applyToOtherDay}
                onClick={() => setApplyToOtherDay(!applyToOtherDay)}
                type="checkbox"
              />
              <strong className="ml-1">
                This schedule should apply to other days like:
              </strong>
            </label>
          </div>
        </div>
        {applyToOtherDay &&
          weekDaySettings.map(weekDay => {
            const wd = weekDays.find(item => item.weekDay === weekDay.weekDay);
            return (
              <div className="col-md-4">
                <label>
                  <input
                    checked={wd && wd.selected}
                    onChange={() => handleWeekdaySelection(wd)}
                    type="checkbox"
                  />{' '}
                  {weekDay.weekDayFullName}
                </label>
              </div>
            );
          })}
      </>
    );
  };

  return show ? <EditSchedulerUI /> : <SchedulerUI />;
}

Scheduler.propTypes = {
  fetchDoctorScheduleFunc: PropTypes.func,
  saveAverageConsultationTimeFunc: PropTypes.func,
  updateMultiDayTimeSlotsFunc: PropTypes.func,
  updateSingleDayTimeSlotFunc: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  scheduleTimings: makeSelectScheduleTimings(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    fetchDoctorScheduleFunc: () => {
      dispatch(fetchScheduleTimingsAction());
    },
    saveAverageConsultationTimeFunc: (payload, toastr) => {
      dispatch(saveAverageConsultationTimeAction(payload, toastr));
    },
    updateMultiDayTimeSlotsFunc: (payload, toastr) => {
      dispatch(updateTimeSlotsAction(payload, toastr));
    },
    updateSingleDayTimeSlotFunc: (payload, toastr) => {
      dispatch(updateSingleDayTimeSlotAction(payload, toastr));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Scheduler);
