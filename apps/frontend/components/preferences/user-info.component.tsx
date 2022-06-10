import React, { useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Button,
  createStyles,
  Group,
  Navbar,
  Text,
  Textarea,
  TextInput,
  Notification,
} from '@mantine/core';
import { showNotification, updateNotification } from '@mantine/notifications';
import { At, Key, Lock, PhoneCall, User, Check, X } from 'tabler-icons-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../redux/hooks';
import { updateProfile } from '../../redux/features/account/thunk/update-profile.thunk';
import { uploadAvatar } from '../../redux/features/account/thunk/upload-avatar.thunk';
import { fetchProfile } from '../../redux/features/account/thunk/fetch-profile.thunk';
// interface UserInfoPreferneceProps {}

interface UserInfoModel {
  avatar: string;
  fullname: string;
  role: string;
  phone: string;
  email: string;
  username: string;
  id: string;
  googleId: string;
  keycloakId: string;
  effdate: string;
  description: string;
  img: File;
}
const data = [
  { link: '', label: 'Profile', icon: User },
  { link: '', label: 'Authentication', icon: Key },
];

const UserInfoPreference: React.FC = () => {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Profile');
  const [image, setImage] = useState<File>(null);
  const [uploadData, setUploadData] = useState(null);

  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
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
  ));
  const [userInfo, setUserInfo] = useState<UserInfoModel>({} as UserInfoModel);

  const avatarInputRef = useRef<HTMLInputElement>();

  function formatDate(string) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
  }

  useEffect(() => {
    setUserInfo(JSON.parse(window.localStorage.getItem('user')));
  }, []);

  const dispatch = useAppDispatch();

  const UserProfile: React.FC = () => {
    const handleUpdateSubmit = async (values) => {
      dispatch(
        updateProfile({
          id: values.id,
          fullname: values.fullname,
          phone: values.phone,
          email: values.email,
          description: values.description,
        })
      )
        .unwrap()
        .then(() => {
          dispatch(fetchProfile());
        })
        .then(() =>
          showNotification({
            id: 'load-data',
            color: 'teal',
            title: 'Data was updated',
            message: 'Your profile was updated successfully',
            icon: <Check />,
            autoClose: 3000,
          })
        )
        .catch((e) => {
          showNotification({
            id: 'load-data',
            color: 'red',
            title: 'Have error',
            message: `${e.message}`,
            icon: <X />,
            autoClose: 3000,
          });
        });
      // console.log(values)
    };

    const initialFormValues = {
      id: userInfo.id,
      avatar: userInfo.avatar,
      username: userInfo.username,
      fullname: userInfo.fullname,
      email: userInfo.email,
      phone: userInfo.phone,
      effdate: userInfo.effdate,
      description: userInfo.description,
      img: image,
    };

    const UpdateSchema = Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Required'),
      fullname: Yup.string()
        .min(5, 'Too short!')
        .max(50, 'Too long!')
        .required('Required'),
      phone: Yup.string()
        .min(10, 'Invalid Phone Number')
        .max(10, 'Too long!')
        .required('Required'),
    });

    const formik = useFormik({
      initialValues: initialFormValues,
      enableReinitialize: true,
      validationSchema: UpdateSchema,
      onSubmit: (values) => handleUpdateSubmit(values),
    });

    const uploadToServer = (event) => {
      if (event.target.files && event.target.files[0]) {
        const i = event.target.files[0];
        setUploadData(URL.createObjectURL(i));

        dispatch(
          uploadAvatar({
            id: userInfo.id,
            img: i,
          })
        )
          .unwrap()
          .then(() => {
            console.log('success');
            setImage(i);
          })
          .catch((e) => {
            alert(e.message);
          });
      }
    };
    return (
      <form onSubmit={formik.handleSubmit}>
        <Group>
          <div>
            <Avatar
              src={uploadData || formik.values.avatar}
              size={150}
              radius="md"
            />
            <Button
              className={classes.control}
              size="xs"
              variant="outline"
              onClick={() => avatarInputRef.current.click()}
            >
              Upload
            </Button>
            <input
              type="file"
              ref={avatarInputRef}
              style={{
                display: 'none',
              }}
              id="avatar"
              onChange={uploadToServer}
              name="avatar"
              accept=".jpg, .png, jpeg"
            />
          </div>

          <div>
            <Text
              size="xs"
              sx={{ textTransform: 'uppercase' }}
              weight={700}
              color="dimmed"
            >
              {userInfo.role}
            </Text>

            <Text size="lg" weight={500} className={classes.name}>
              {userInfo.fullname ??
                userInfo.username ??
                userInfo.email ??
                userInfo.id}
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
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <TextInput
            id="username"
            description="This will be visible to other people"
            onChange={formik.handleChange('username')}
            error={formik.touched.username && Boolean(formik.errors.username)}
            value={formik.values.username}
            label={'Username'}
            required
            name="username"
            disabled
            className={classes.inputText}
          />
          <TextInput
            id="fullname"
            description="This will be visible to other people"
            onChange={formik.handleChange('fullname')}
            error={formik.touched.fullname && Boolean(formik.errors.fullname)}
            value={formik.values.fullname}
            label={'Fullname'}
            required
            name="fullname"
            placeholder="Set your own fullname"
            className={classes.inputText}
          />
          <TextInput
            id="email"
            description="Your primary email address of FPT Education Org"
            onChange={formik.handleChange}
            error={
              formik.touched.email && Boolean(formik.errors.email)
                ? formik.errors.email
                : null
            }
            value={formik.values.email}
            label={'Email'}
            required
            name="email"
            placeholder="Set your own email address"
            className={classes.inputText}
          />
          <TextInput
            id="phone"
            description="Change your phone number"
            onChange={formik.handleChange}
            error={
              formik.touched.phone && Boolean(formik.errors.phone)
                ? formik.errors.phone
                : null
            }
            value={formik.values.phone}
            label={'Phone'}
            required
            name="phone"
            placeholder="Set your own phone number"
            className={classes.inputText}
          />

          <TextInput
            id="effdate"
            description="The date the account becomes active"
            value={formatDate(formik.values.effdate)}
            label={'Effdate'}
            required
            name="effdate"
            className={classes.width100}
            disabled
          />
          <Textarea
            id="description"
            description="Change your description"
            onChange={formik.handleChange}
            placeholder="Description"
            label="Your description"
            name="description"
            autosize
            minRows={2}
            value={formik.values.description}
            className={classes.width100}
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '100px',
              width: '100%',
            }}
          >
            <Button color="green" type="submit" name="update">
              Save Changes nè
            </Button>
          </div>
        </div>
      </form>
    );
  };

  const Authentication: React.FC = () => {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Button leftIcon={<Lock />}>Reset password</Button>
          <Button>Authenticate with username password</Button>
          <Button>Link to Google</Button>
        </div>
      </div>
    );
  };

  const Renderer = ({ label }) => {
    switch (label) {
      case 'Profile':
        return <UserProfile />;
      case 'Authentication':
        return <Authentication />;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <Navbar height={600} width={{ sm: 200 }} p="sm">
        <Navbar.Section grow>{links}</Navbar.Section>
      </Navbar>
      <div
        style={{
          marginLeft: 20,
          width: '100%',
        }}
      >
        <Renderer label={active} />
      </div>
    </div>
  );
};

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    icon: {
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[5],
    },
    inputText: {
      width: '40%',
      minWidth: 220,
    },
    width100: {
      width: '100%',
    },
    name: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
    control: {
      position: 'relative',
      width: 150,
      bottom: 30,
    },
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
            : theme.colors[theme.primaryColor][0],
        color:
          theme.colorScheme === 'dark'
            ? theme.white
            : theme.colors[theme.primaryColor][7],
        [`& .${icon}`]: {
          color:
            theme.colors[theme.primaryColor][
              theme.colorScheme === 'dark' ? 5 : 7
            ],
        },
      },
    },
  };
});

export default UserInfoPreference;
