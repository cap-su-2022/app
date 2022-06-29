import React, { useRef, useState } from 'react';
import { createStyles, Navbar, Group, Code } from '@mantine/core';
import {
  Logout,
  User,
  BuildingWarehouse,
  Users,
  Devices,
  Messages,
  Dashboard,
  Bell,
  Ticket,
  Door,
  DeviceTablet,
  BarrierBlock,
  BrandHipchat,
  DeviceMobileMessage,
  MessageCode,
  Clock2,
} from 'tabler-icons-react';
import { FPT_ORANGE_COLOR } from '@app/constants';
import { BLACK, WHITE } from '@app/constants';
import { useRouter } from 'next/router';
import LogoutModal from '../logout.modal';
import PreferencesModal from '../preferences.modal.component';

const data = [
  { link: '/dashboard', label: 'Dashboard', icon: Dashboard },
  { link: '/rooms', label: 'Rooms', icon: BuildingWarehouse },
  { link: '/room-type', label: 'Room Type', icon: Door },
  { link: '/device-type', label: 'Device Type', icon: DeviceTablet },
  { link: '/role', label: 'Role', icon: BarrierBlock },
  { link: '/accounts', label: 'Accounts', icon: Users },
  { link: '/devices', label: 'Devices', icon: Devices },
  { link: '/feedbacks', label: 'Feedback', icon: Messages },
  { link: '/notifications', label: 'Notification', icon: Bell },
  { link: '/booking-room', label: 'Booking Room', icon: Ticket },
  {
    link: '/booking-reason',
    label: 'Booking Reason',
    icon: DeviceMobileMessage,
  },
  { link: '/feedback', label: 'Feedback', icon: BrandHipchat },
  { link: '/feedback-type', label: 'Feedback Type', icon: MessageCode },
  { link: '/slot', label: 'Slot', icon: Clock2 },
];

function LayoutSidebar() {
  const { classes, cx } = useStyles();

  const [isLogoutModalShown, setLogoutModalShown] = useState<boolean>(false);
  const [active, setActive] = useState('Billing');

  const [isPreferencesShown, setPreferencesShown] = useState<boolean>(false);

  const router = useRouter();

  const handleLogoutSubmit = async (
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    event.preventDefault();
    setLogoutModalShown(!isLogoutModalShown);
  };

  const isMenuSelect = (item) => {
    return item.label === active || router.route === item.link;
  };

  const links = data.map((item, index) => (
    <a
      className={cx(classes.link, { [classes.linkActive]: isMenuSelect(item) })}
      href={item.link}
      key={index}
      onClick={async (event) => {
        event.preventDefault();
        setActive(item.label);
        await router.push(item.link);
      }}
    >
      <item.icon
        className={cx(classes.linkIcon, {
          [classes.iconActive]: isMenuSelect(item),
        })}
      />
      <span className={cx({ [classes.labelActive]: isMenuSelect(item) })}>
        {item.label}
      </span>
    </a>
  ));

  return (
    <Navbar height={'full'} p="md" className={classes.navbar}>
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <></>
          <Code className={classes.version}>FPTU Library Room Booking</Code>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a
          href="apps/frontend/components/layout/NavBar#"
          className={classes.link}
          onClick={(event) => {
            event.preventDefault();
            setPreferencesShown(!isPreferencesShown);
          }}
        >
          <User className={classes.linkIcon} />
          <span>Profile</span>
        </a>
        {isPreferencesShown ? (
          <PreferencesModal
            isShown={isPreferencesShown}
            toggleShown={() => setPreferencesShown(!isPreferencesShown)}
          />
        ) : null}

        <>
          <a
            href="apps/frontend/components/layout/NavBar#"
            className={classes.link}
            onClick={(event) => handleLogoutSubmit(event)}
          >
            <Logout className={classes.linkIcon} />
            <span>Logout</span>
          </a>
          {isLogoutModalShown ? (
            <LogoutModal
              isOpened={isLogoutModalShown}
              handleRouterReload={router.reload}
              handleClose={() => setLogoutModalShown(!isLogoutModalShown)}
            />
          ) : null}
        </>
      </Navbar.Section>
    </Navbar>
  );
}

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    navbar: {
      maxWidth: 250,
      backgroundColor: FPT_ORANGE_COLOR,
      '@media (max-width: 780px)': {
        maxWidth: 100,
      },
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

      span: {
        '@media (max-width: 780px)': {
          display: 'none',
        },
      },

      '&:hover': {
        backgroundColor: '#f2f2f2',
        span: {
          color: FPT_ORANGE_COLOR,
        },
        svg: {
          color: FPT_ORANGE_COLOR,
        },
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
    labelActive: { color: FPT_ORANGE_COLOR },

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

export default LayoutSidebar;
