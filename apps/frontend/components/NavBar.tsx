import React, {useRef, useState} from 'react';
import { createStyles, Navbar, Group, Code } from '@mantine/core';
import {
  Settings,
  TwoFA,
  DatabaseImport,
  Logout, User, BuildingWarehouse, Users, Devices, Messages,
} from 'tabler-icons-react';
import {FPT_ORANGE_COLOR} from "@app/constants";
import {BLACK, WHITE} from "@app/constants";
import {useRouter} from "next/router";
import LogoutModal from "./logout.modal";
import PreferencesModal from "./preferences.modal.component";

const data = [
  { link: '/rooms', label: 'Rooms', icon: BuildingWarehouse },
  { link: '/users', label: 'Users', icon: Users },
  { link: '/devices', label: 'Devices', icon: Devices },
  { link: '/feedbacks', label: 'Feedback', icon: Messages },
  { link: '', label: 'Databases', icon: DatabaseImport },
  { link: '', label: 'Authentication', icon: TwoFA },
  { link: '', label: 'Other Settings', icon: Settings },
];

export function NavbarSimpleColored() {
  const { classes, cx } = useStyles();

  const logoutAnchorRef = useRef<HTMLAnchorElement>();
  const [isLogoutModalShown, setLogoutModalShown] = useState<boolean>(false);
  const [active, setActive] = useState('Billing');

  const [isPreferencesShown, setPreferencesShown] = useState<boolean>(false);


  const router = useRouter();

  const handleLogoutSubmit = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setLogoutModalShown(!isLogoutModalShown);
  }

  const isMenuSelect = (item) => {
    return (item.label === active) || (router.route === item.link);
  }

  const links = data.map((item) => (
    <a
      className={cx(classes.link, { [classes.linkActive]: isMenuSelect(item)})}
      href={item.link}
      key={item.label}
      onClick={async (event) => {
        event.preventDefault();
        setActive(item.label);
        await router.push(item.link);
      }}
    >
      <item.icon className={cx(classes.linkIcon, { [classes.iconActive]: isMenuSelect(item)})} />
      <span className={cx({[classes.labelActive]: isMenuSelect(item)})}>{item.label}</span>
    </a>
  ));

  return (
    <Navbar width={{ sm: 200, md: 220, xl: 250 }} height={'full'} p="md" className={classes.navbar}>
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <></>
          <Code className={classes.version}>
            FPTU Library Room Booking
          </Code>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) =>
        {
          event.preventDefault();
          setPreferencesShown(!isPreferencesShown);
        }
        }>
          <User className={classes.linkIcon} />
          <span>Profile</span>
        </a>
        {isPreferencesShown ? <PreferencesModal
          isShown={isPreferencesShown}
          toggleShown={() => setPreferencesShown(!isPreferencesShown)}
        /> : null}

        <>
          <a href="#" className={classes.link} onClick={(event) => handleLogoutSubmit(event)}>
            <Logout className={classes.linkIcon} />
            <span>Logout</span>
          </a>
          {isLogoutModalShown ? <LogoutModal
            isOpened={isLogoutModalShown}
            handleRouterReload={router.reload}
            handleClose={() => setLogoutModalShown(!isLogoutModalShown)}/>
            : null}
        </>
      </Navbar.Section>
    </Navbar>
  );
}

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    navbar: {
      backgroundColor: FPT_ORANGE_COLOR,
    },

    version: {
      backgroundColor: WHITE,
      color: BLACK,
      fontWeight: 700,
    },

    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${WHITE}`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${WHITE}`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.white,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      'span': {
        [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
          display: 'none'
        },
      },

      '&:hover': {
        backgroundColor: '#f2f2f2',
        'span': {
          color: FPT_ORANGE_COLOR
        },
        'svg': {
          color: FPT_ORANGE_COLOR
        }
      },

    },

    linkIcon: {
      ref: icon,
      color: theme.white,
      opacity: 0.75,
      marginRight: theme.spacing.sm,

    },

    iconActive: {
      color: FPT_ORANGE_COLOR,

    },
    labelActive: {color: FPT_ORANGE_COLOR},

    linkActive: {
      '&, &:hover': {
        backgroundColor: '#f2f2f2',
        [`& .${icon}`]: {
          opacity: 0.9,
        },
      },
    },
  };
});
