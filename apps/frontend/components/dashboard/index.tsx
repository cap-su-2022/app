import React, { useEffect } from 'react';
import { createStyles, Group, Paper, Tabs, Text } from '@mantine/core';
import AdminLayout from '../../components/layout/admin.layout';
import { fetchStatistic } from '../../redux/features/room-booking/thunk/fetch-statistics.thunk';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

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
    return (
      <Paper
        withBorder
        p="md"
        radius="md"
        key={stat.title}
        style={{ marginBottom: 20 }}
      >
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            {stat.title}
          </Text>
        </Group>

        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
        </Group>
      </Paper>
    );
  };

  const getStatisticsData = (timeFrame) => {
    const statsFormated = {
      total: {
        icon: 'total',
        title: 'Total',
        value: timeFrame?.['total'],
      },
      booked: {
        icon: 'booked',
        title: `Booked`,
        value: timeFrame?.['booked'],
      },
      cancelled: {
        icon: 'cancelled',
        title: `Cancelled`,
        value: timeFrame?.['cancelled'],
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
