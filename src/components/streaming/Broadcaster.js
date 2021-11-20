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

export default function Broadcaster() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

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
            <Grid container sx={{display: 'flex', justifyContent: 'space-evenly', flexGrow: 1}}>
                <Button href="#" variant="outlined" sx={{mt: 1}} startIcon={<NearMeOutlinedIcon />}>
                  Broadcast
                </Button>
                <Button href="#" variant="outlined" sx={{mt: 1}} startIcon={<NearMeDisabledOutlinedIcon />}>
                  Ban User
                </Button>
            </Grid>
            <Grid container spacing={2} sx={{flexGrow: 1, mt: 2}}>
              <Grid item md={8} sm={12} xs={12}>
                  <video width="100%" height="100%" style={{ border: "solid" }}></video>
              </Grid>
              <Grid style={{ position: "relative" }} item md={4} sm={12} xs={12} sx={{mt: 1}}>
                <Grid style={{ height: "75%", overFlowX: "hidden", overflowY: "auto" }} container  sx={{flexGrow: 1}}>
                  <ListItem style={{ height: "fit-content" }}>
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src="/avatar/avatar1.png" />
                    </ListItemAvatar>
                    <ListItemText fullWidth primary="James" secondary="I'll be in your neighborhood doing errands this"/>
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src="/avatar/avatar1.png" />
                    </ListItemAvatar>
                    <ListItemText fullWidth primary="James" secondary="I'll be in your neighborhood doing errands this"/>
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src="/avatar/avatar1.png" />
                    </ListItemAvatar>
                    <ListItemText fullWidth primary="James" secondary="I'll be in your neighborhood doing errands this"/>
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src="/avatar/avatar1.png" />
                    </ListItemAvatar>
                    <ListItemText fullWidth primary="James" secondary="I'll be in your neighborhood doing errands this"/>
                  </ListItem>
                </Grid>
                <Grid style={{ position: "absolute", bottom: "0" }} container sx={{flexGrow: 1}} spacing={1}>
                  <Grid item  md={10} sm={10} xs={10}>
                    <Input fullWidth placeholder="Send Message" inputProps={ariaLabel}/>
                  </Grid>
                  <Grid item  md={2} sm={2} xs={2}>
                    <IconButton color="primary" aria-label="add to shopping cart">
                      <SendIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
              
            </Grid>
            <Grid container spacing={2} sx={{flexGrow: 1, mt: 8}} item md={8} sm={12} xs={12}>
               <List>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src="/avatar/avatar1.png" />
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
                          I am a Streamer.  
                        </Typography>
                        {" — I'll be in your neighborhood doing errands this…— I'll be in your neighborhood doing errands this…— I'll be in your neighborhood doing errands this…— I'll be in your neighborhood doing errands this…— I'll be in your neighborhood doing errands this…— I'll be in your neighborhood doing errands this…"}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>
            </Grid>

            <Grid container spacing={2} sx={{flexGrow: 1, mt: 1}}>
              <Grid item md={3} sm={6} xs={12}>
                  <Item>md=8 sm=12</Item>
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                  <Item>md=8 sm=12</Item>
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <Item>md=2 sm=6</Item>
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <Item>md=2 sm=6</Item>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{flexGrow: 1, mt: 1}}>
              <Grid item md={3} sm={6} xs={12}>
                  <Item>md=8 sm=12</Item>
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                  <Item>md=8 sm=12</Item>
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <Item>md=2 sm=6</Item>
              </Grid>
              <Grid item md={3} sm={6} xs={12}>
                <Item>md=2 sm=6</Item>
              </Grid>
            </Grid>
            
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}