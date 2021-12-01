import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Paper from'@mui/material/Paper';
import Divider from '@mui/material/Paper'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import SendIcon from '@mui/icons-material/Send'
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import NearMeDisabledOutlinedIcon from '@mui/icons-material/NearMeDisabledOutlined';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import BroadcasterVideoChat from './BroadcasterVideoChat';

const ariaLabel = { 'aria-label': 'description' };

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://pioneer.com/">
          Pioneer
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const Broadcaster = ({auth, level}) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  if(level != 1) return <Navigate to="/loginstreamer" />;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <BroadcasterVideoChat/>
            <Grid container spacing={2} sx={{flexGrow: 1, mt: 8}} item md={8} sm={12} xs={12}>
               <List>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={"http://" + window.location.hostname + ":5000/images/" + "avatar" + (1 + Math.floor(Math.random() * 4)) + ".png"} />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Biography"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                        {auth.user && auth.user.bio}  
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>
            </Grid>

            <Grid container spacing={2} sx={{flexGrow: 1, mt: 1}}>
              <Grid item md={3} sm={6} xs={12}>
                <Item>Video</Item>
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <Item>Video</Item>
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <Item>Video</Item>
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <Item>Video</Item>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{flexGrow: 1, mt: 1}}>
              <Grid item md={3} sm={6} xs={12}>
                <Item>Image</Item>
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <Item>Image</Item>
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <Item>Image</Item>
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <Item>Image</Item>
              </Grid>
            </Grid>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

Broadcaster.propTypes = {
  auth: PropTypes.object,
  level: PropTypes.number
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  level: state.auth.level
});

export default connect(mapStateToProps)(Broadcaster);