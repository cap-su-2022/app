import React, { useEffect } from 'react';
import {
  createStyles,
  Group,
  Paper,
  ScrollArea,
  SimpleGrid,
  Space,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import {
  UserPlus,
  ArrowUpRight,
  ArrowDownRight,
  Bookmark,
  BookmarksOff,
} from 'tabler-icons-react';
import AdminLayout from '../../components/layout/admin.layout';
import { fetchStatistic } from '../../redux/features/room-booking/thunk/fetch-statistics.thunk';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const icons = {
  total: UserPlus,
  booked: Bookmark,
  cancelled: BookmarksOff,
};

function Dashboard() {
  const { classes } = useStyles();
  const dispatch = useAppDispatch();
  const stats = useAppSelector(
    (state) => state.roomBooking.bookingRoomStatistics
  );
  const { totalTime, month, week, day } = stats;

  useEffect(() => {
    dispatch(fetchStatistic()).unwrap();
  }, []);

  const StatRender: React.FC<any> = ({ stat }) => {
    const DiffIcon = stat.diff > 0 ? ArrowUpRight : ArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title} style={{marginBottom: 20}}>
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          {/*<Icon className={classes.icon} size={22}/>*/}
        </Group>

        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
          {/* <Text
            color={stat.diff > 0 ? 'teal' : 'red'}
            size="sm"
            weight={500}
            className={classes.diff}
          >
            <span>{stat.diff}%</span>
            <DiffIcon size={16} />
          </Text> */}
        </Group>
      </Paper>
    );
  };

  const getStatisticsData = (stats) => {
    const statsFormated = {
      total: {
        // diff: stats?.['booked'] - stats?.['cancelled'],
        icon: 'total',
        title: 'Total',
        value: stats?.['total'],
      },
      booked: {
        // diff: stats?.['booked'] - stats?.['cancelled'],
        icon: 'booked',
        title: `Booked`,
        value: stats?.['booked'],
      },
      cancelled: {
        // diff: stats?.['cancelled'] - stats?.['booked'],
        icon: 'cancelled',
        title: `Cancelled`,
        value: stats?.['cancelled'],
      },
    };

    const result = [];

    for (const key in statsFormated) {
      result.push(<StatRender key={key} stat={statsFormated[key]} />);
    }

    return result;
  };

  return (
    <AdminLayout>
      <Tabs defaultValue="gallery">
        <Tabs.Tab title="Total time" label="Total time" value="totalTime">
          {stats ? getStatisticsData(totalTime) : null}
        </Tabs.Tab>
        <Tabs.Tab label="Month" value="month">
          {stats ? getStatisticsData(month) : null}
        </Tabs.Tab>
        <Tabs.Tab label="Week" value="week">
          {stats ? getStatisticsData(week) : null}
        </Tabs.Tab>
        <Tabs.Tab label="Day" value="day">
          {stats ? getStatisticsData(day) : null}
        </Tabs.Tab>
      </Tabs>
    </AdminLayout>
  );
}

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl * 1.5,
  },

  value: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
  },

  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

export default Dashboard;
