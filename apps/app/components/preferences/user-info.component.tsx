import React from "react";
import {Avatar, createStyles, Group, Text} from "@mantine/core";
import {At, PhoneCall} from "tabler-icons-react";
interface UserInfoPreferneceProps {

}
const userInfo = {
  avatar: undefined,
  name: `Ngô Nguyên Bằng`,
  title: 'System Admin',
  phone: '0961618601',
  email: 'bangnnse140937@fpt.edu.vn'
}


const UserInfoPreference: React.FC<UserInfoPreferneceProps> = () => {
  const {classes} = useStyles();
  const {avatar, name, title, phone, email} = userInfo;

  return (
    <div>
      <Group noWrap>
        <Avatar src={avatar} size={94} radius="md" />
        <div>
          <Text size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed">
            {title}
          </Text>

          <Text size="lg" weight={500} className={classes.name}>
            {name}
          </Text>

          <Group noWrap spacing={10} mt={3}>
            <At size={16} className={classes.icon} />
            <Text size="xs" color="dimmed">
              {email}
            </Text>
          </Group>

          <Group noWrap spacing={10} mt={5}>
            <PhoneCall size={16} className={classes.icon} />
            <Text size="xs" color="dimmed">
              {phone}
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}

const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export default UserInfoPreference;
