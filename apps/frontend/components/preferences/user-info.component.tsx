import React, {useEffect, useRef, useState} from "react";
import {Avatar, Button, createStyles, Group, InputWrapper, Navbar, Text, TextInput} from "@mantine/core";
import {At, BellRinging, Key, Logout, PhoneCall, Receipt2, SwitchHorizontal, User} from "tabler-icons-react";
interface UserInfoPreferneceProps {

}

interface UserInfoModel {
  avatar: string,
  fullname: string,
  role: string,
  phone: string,
  email: string,
  username: string,
  id: string,
  googleId: string,
  keycloakId: string,
}
const data = [
  { link: '', label: 'Profile', icon: User },
  { link: '', label: 'Authentication', icon: Key },

];


const UserInfoPreference: React.FC<UserInfoPreferneceProps> = () => {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Profile');

  const links = data.map((item) => (
    <a
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </a>
  ));  const [userInfo, setUserInfo] = useState<UserInfoModel>({} as UserInfoModel);

  const avatarInputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    setUserInfo(JSON.parse(window.localStorage.getItem('user')));
  }, []);

  const UserProfile: React.FC = () => {
    return (
      <>
        <Group noWrap>
          <Avatar src={userInfo.avatar} size={150} radius="md" />
          <Button className={classes.control}
                  size="xs"
                  variant="outline"
                  onClick={() => avatarInputRef.current.click()}>
            Upload
          </Button>
          <input type="file" ref={avatarInputRef} style={{
            display: 'none'
          }}/>
          <div>
            <Text size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed">
              {userInfo.role}
            </Text>

            <Text size="lg" weight={500} className={classes.name}>
              {userInfo.fullname ?? userInfo.username ?? userInfo.email ?? userInfo.id}
            </Text>

            <Group noWrap spacing={10} mt={3}>
              <At size={16} className={classes.icon} />
              <Text size="xs" color="dimmed">
                {userInfo.email}
              </Text>
            </Group>

            <Group noWrap spacing={10} mt={5}>
              <PhoneCall size={16} className={classes.icon} />
              <Text size="xs" color="dimmed">
                {userInfo.phone}
              </Text>
            </Group>
          </div>
        </Group>
        <div style={{
          marginTop: 20,
        }}>
          <InputWrapper
            label="Username"
            description="This will be visible to other people">
            <TextInput
              value={userInfo.username}
              disabled
            />
          </InputWrapper >
          <InputWrapper
            label="Display name"
            description="This will be visible to other people">
            <TextInput
              value={userInfo.fullname}
              placeholder="Set your own fullname"
            />
          </InputWrapper>
          <InputWrapper
            label="Email address"
            description="Your primary email address of FPT Education Org">
            <TextInput
              placeholder="Set your own email address"
              value={userInfo.email}
            />
          </InputWrapper>
          <InputWrapper
            label="Phone number"
            description="Change your phone number">
            <TextInput value={userInfo.phone}
                       placeholder="Set your own phone number"
            />
          </InputWrapper>
        </div>
      </>
    );
  };

  const Authentication: React.FC = () => {
    return (
      <div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <Button>
            Authenticate with username password
          </Button>
          <Button>
            Link to Google
          </Button>
        </div>
      </div>
    );
  }

  const Renderer = ({label}) => {
    switch (label) {
      case 'Profile':
        return <UserProfile/>;
      case 'Authentication':
        return <Authentication/>;
    }
  }

  return (

    <div style={{
      display: 'flex',
    }}>
      <Navbar height={700} width={{ sm: 200 }} p="sm">
        <Navbar.Section grow>
          {links}
        </Navbar.Section>
      </Navbar>
      <div style={{
        marginLeft: 20,
        width: '100%'
      }}>
        <Renderer label={active}/>
      </div>
    </div>
  );
}

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {

    icon: {
      color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
    },

    name: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
    control: {
      position: 'absolute',
      width: 150,
      top: 'calc(25%)'
    },
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
            : theme.colors[theme.primaryColor][0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.colors[theme.primaryColor][7],
        [`& .${icon}`]: {
          color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 5 : 7],
        },
      },
    },
  };
});

export default UserInfoPreference;
