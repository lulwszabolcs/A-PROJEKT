import * as React from 'react';
import { useState,useContext } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import { AccountBox, Home, Logout } from '@mui/icons-material';
import BadgeIcon from '@mui/icons-material/Badge';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ErrorIcon from '@mui/icons-material/Error';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { UserContext } from '../../contexts/UserProvider';
import { SnackbarContext } from '../../contexts/SnackbarProvider';
import SnackbarComponent from '../Snackbar/SnackbarComponent';
import CircleIcon from '@mui/icons-material/Circle';
import ChatIcon from '@mui/icons-material/Chat';
import { useMediaQuery } from '@mui/material';
const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export default function MiniDrawer() {
  let {changeUserStatus,logout} = useContext(UserContext)
  let {SnackbarOpen,closeSnackbar,SnackbarMessage} = useContext(SnackbarContext)

  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const [anchorEl, setAnchorEl] = useState(null);
  const [isToolbarVisible,setIsToolbarVisible] = useState(false)
  const openToolbar = Boolean(anchorEl);
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  React.useEffect(()=>{
    if (!isMobile) {
      setIsToolbarVisible(true)
    } else {
      setIsToolbarVisible(false)
    }
  },[isMobile])
const [primarytext,setPrimaryText] = useState();
const handleChange = (text) =>{
  switch (text) {
    case "Főoldal":
      navigate('/home')
      break;
    case "Profil":
      isMobile ? setAnchorEl(true) : undefined
      break;
      case "Dolgozók":
        navigate('/workers')  
        break;
        case "Járműállomány":
          navigate('/vehicles')  
          break;
          case "Hibák":
            navigate('/errors')  
            break;
          case "Ügyfélszolgálat":
            navigate('/support')  
            break;
    case "Kijelentkezés":
      logout()
      navigate("/login")
      break;
    default:
      break;
  }
}
  const icons = [<HomeIcon/>,
    <Tooltip title="Profil beállítások">
    <IconButton
      onClick={handleClick}
      size="small"
      aria-controls={openToolbar ? 'account-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={openToolbar ? 'true' : undefined}
    >
      <AccountBox/>
    </IconButton>
  </Tooltip>
  ,<BadgeIcon/>,<DirectionsCarIcon/>,<ErrorIcon/>,<ChatIcon/>,<LogoutIcon/>];
  
  return (
    <div>
    <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openToolbar}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: isMobile ? 25:1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                left: isMobile ? 114:14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: isMobile ? 'bottom':'top'}}
        anchorOrigin={{ horizontal: isMobile ? 'left':'right', vertical: isMobile ? 'top': 'bottom' }}
      >
        <MenuItem onClick={()=>{handleClose();navigate('/profile')}}>
          <Avatar style={{marginRight:'10px'}}/> Profil
        </MenuItem>
        <Divider />
        <MenuItem onClick={()=>{handleClose();changeUserStatus(1,"ONLINE")}}>
          <CircleIcon style={{marginRight:'1vw',color:'green'}} sx={{height:'18px'}}>
          </CircleIcon>
          Online
        </MenuItem>
        <MenuItem onClick={()=>{handleClose();changeUserStatus(1,"OFFLINE")}}>
          <CircleIcon style={{marginRight:'1vw',color:'gray'}} sx={{height:'18px'}}>
          </CircleIcon>
          Offline
        </MenuItem>
        <MenuItem onClick={()=>{handleClose();changeUserStatus(78,"ON_VACATION")}}>
          <CircleIcon style={{marginRight:'1vw',color:'orange'}} sx={{height:'18px'}}>
          </CircleIcon>
        Szabadságon
        </MenuItem>
      </Menu> 
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar 
        sx={{
            backgroundColor: '#222222',
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon onClick={()=>setIsToolbarVisible(true)} />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {primarytext}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} style={{visibility: isToolbarVisible ?  undefined:"hidden"}}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon onClick={()=>setIsToolbarVisible(false)} />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Főoldal','Profil', 'Dolgozók', 'Járműállomány', 'Hibák','Ügyfélszolgálat', 'Kijelentkezés'].map((text,index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block', marginTop:'30px'}}> 
              <ListItemButton onClick={()=>handleChange(text)}
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  open
                    ? {
                        justifyContent: 'initial',
                      }
                    : {
                        justifyContent: 'center',
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: 'auto',
                        },
                  ]}
                >
                    {isMobile ? undefined : icons[index]}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[
                    open
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
    <SnackbarComponent snackbarOpen={SnackbarOpen} message={SnackbarMessage} close={closeSnackbar}/>
    </div>
  );
}
