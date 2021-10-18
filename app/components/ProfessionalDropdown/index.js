import React from 'react';
import Popover from '@material-ui/core/Popover';

import { professionalList } from '../../utils/constants';

const ProfessionalDropdown = props => {
  const { show, anchorEl, onChange, onClose } = props;

  const handleClick = profession => {
    onChange(profession);
    onClose(false);
  };

  const handleClose = () => {
    onClose(false);
  };

  return (
    <Popover
      // id={id}
      open={show}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <div className="pro-dropdown">
        <div className="container">
          <section>
            <div className="col-md-12">
              {professionalList.map(profession => (
                <div className="item" key={profession.id}>
                  <a
                    href="javascript:void(0);"
                    onClick={() => handleClick(profession)}
                  >
                    <div className="title">{profession.title}</div>
                    <div className="desc">{profession.desc}</div>
                  </a>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Popover>
  );
};

export default ProfessionalDropdown;
