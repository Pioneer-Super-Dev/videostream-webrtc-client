import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const AAlert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Alert = ({ alerts }) =>
  alerts.map((alert) => (
    // <div key={alert.id} className={`alert alert-${alert.alertType}`}>
    //   {alert.msg}
    // </div>
    <Snackbar
        anchorOrigin={{vertical: 'top', horizontal: 'right' }}
        open="true"
        key={alert.id}
        autoHideDuration={1000}
    >
      <AAlert severity={alert.alertType} sx={{ width: '100%' }}>
        {alert.msg}
      </AAlert>
    </Snackbar>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
