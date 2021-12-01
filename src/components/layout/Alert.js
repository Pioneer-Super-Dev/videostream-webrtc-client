// import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';

// const AAlert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

// const Alert = ({ alerts }) =>

//   //Display All Messages
//   alerts.map((alert) => (
//     <Snackbar
//         anchorOrigin={{vertical: 'top', horizontal: 'right' }}
//         open={true}
//         key={alert.id}
//         autoHideDuration={1000}
//     >
//       <AAlert severity={alert.alertType} sx={{ width: '100%' }}>
//         {alert.msg}
//       </AAlert>
//     </Snackbar>
//   ));

//   //Display First Message

// Alert.propTypes = {
//   alerts: PropTypes.array.isRequired
// };

// const mapStateToProps = (state) => ({
//   alerts: state.alert
// });

// export default connect(mapStateToProps)(Alert);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Slide from "@mui/material/Slide";
import Button from '@mui/material/Button';

// const MyApp = ({ alerts }) => {
//   const { enqueueSnackbar } = useSnackbar();

//   // React.useEffect(() => {
//   //   alerts.map((alert) => {
//   //     enqueueSnackbar(alert.msg, alert.alertType);
//   //   })
//   // },[]);


//   console.log(alerts);

  
//   const handleClick = () => {
//     //enqueueSnackbar('I love snacks.');
//     alerts.map((alert) => {
//       enqueueSnackbar(alert.msg, alert.alertType);
//     })
//   };
  

//   return (
//     <React.Fragment>
//       <Button onClick={handleClick}>Show snackbar</Button>
//     </React.Fragment>
//   );
// }

// MyApp.propTypes = {
//   alerts: PropTypes.array.isRequired
// };

// const mapStateToProps = (state) => ({
//   alerts: state.alert
// });

// connect(mapStateToProps)(MyApp);



const Alert = ({ alerts }) => {

  const { enqueueSnackbar } = useSnackbar();

  React.useEffect(()=> {
    alerts.map((alert) => {
      enqueueSnackbar(alert.msg, {variant: alert.alertType});
    })
  }, [alerts])
  
  return (
    <React.Fragment>
    </React.Fragment>
  );
}

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  alerts: state.alert
});


export default connect(mapStateToProps)(Alert);