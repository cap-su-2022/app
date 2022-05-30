import React, {useRef, useState} from 'react';
import {createStyles, Header, Autocomplete, Group, Burger, Button, Select, ScrollArea, Text} from '@mantine/core';
import {useBooleanToggle, useHover} from '@mantine/hooks';
import {Bell, ChevronDown, Logout, Search, User} from 'tabler-icons-react';
import {BLACK, FPT_ORANGE_COLOR, GRAY, LIGHT_GRAY, WHITE} from "@app/constants";
import {useOuterClick} from "../hooks/use-outer-clickk";


interface HeaderSearchProps {
  links: { link: string; label: string }[];
}

export function HeaderSearch() {
  const [opened, toggleOpened] = useBooleanToggle(false);
  const { classes } = useStyles();

  const [isNotificationShown, setNotificationShown] = useState<boolean>(false);

  const toggleNotificationShown = () => {
    setNotificationShown(!isNotificationShown);
  }

  const innerRef = useOuterClick(ev => toggleNotificationShown());


  return (
    <Header height={56} className={classes.header} mb={20}>
      <div className={classes.inner}>
        <Group>
          <Burger opened={opened} onClick={() => toggleOpened()} size="sm" />
          <></>
        </Group>

        <Group>
          <Group ml={50} spacing={5}>
            <Button className={classes.avatarContainer}>
              <div className={classes.avatarImage}>
                <User/>
              </div>
              <Text style={{
                fontWeight: 'bold',
                fontSize: 18,
              }}>
                Bằng
              </Text>
            </Button>
            <Button className={classes.button} onClick={() => toggleNotificationShown()}>
              <Bell className={classes.innerButton}/>
              {isNotificationShown
              ? <div ref={innerRef} className={classes.notificationContainer}>
                  <div style={{
                    color: BLACK,
                    margin: 10
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}>
                      <div style={{
                        width: 55,
                        height: 50,
                        borderRadius: 50,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: GRAY,
                      }}>
                        <Bell className={classes.innerButton}/>
                      </div>
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        lineHeight: 1.5,
                        marginLeft: 10
                      }}>
                        <b>Ngô Ngyên Bằng </b> đã yêu cầu mượng phòng <b> LB12</b>
                      </div>
                    </div>
                  </div>
                </div>
              : null}
            </Button>
            <Button className={classes.button}>
              <ChevronDown className={classes.innerButton}/>
            </Button>
            <Button className={classes.button}>
              <Logout color={BLACK}/>
            </Button>
          </Group>
        </Group>
      </div>
    </Header>
  );
}
const useStyles = createStyles((theme) => ({
  avatarContainer: {
    color: BLACK,
    height: 50,
    backgroundColor: WHITE,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 50,
    '&:hover': {
      backgroundColor: LIGHT_GRAY
    }
  },
  avatarImage: {
    width: 40,
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: LIGHT_GRAY,
    borderRadius: 50,
    marginRight: 10,

  },
  notificationContainer: {
    position: 'absolute',
    height: 600,
    width: 350,
    backgroundColor: LIGHT_GRAY,
    top: 'calc(5vh)',
    right: 'calc(0vw)',
    borderRadius: 8,
    boxShadow: '10px 10px 5px #aaaaaa'

  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    backgroundColor: LIGHT_GRAY,
    borderRadius: 50,
    '&:hover': {
      backgroundColor: theme.fn.darken(FPT_ORANGE_COLOR, 0.01),
    },
  },
  innerButton: {
    color: GRAY,
    '&:hover': {
      color: WHITE
    }
  },
  header: {
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
  },

  inner: {
    height: 56,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  links: {
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  search: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
}));
