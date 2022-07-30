import React, {useEffect} from 'react';
import {createStyles, Group, Paper, SimpleGrid, Space, Text, Title} from '@mantine/core';
import {
  UserPlus,
  ArrowUpRight,
  ArrowDownRight,
  Bookmark,
  BookmarksOff
} from 'tabler-icons-react';
import AdminLayout from '../../components/layout/admin.layout';
import {fetchStatistic} from '../../redux/features/room-booking/thunk/fetch-statistics.thunk'
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {map} from "rxjs";

interface StatsGridProps {
  data: {
    title: string;
    icon: keyof typeof icons;
    value: number;
    diff: number;
  }[];
}

const icons = {
  total: UserPlus,
  booked: Bookmark,
  cancelled: BookmarksOff,
};

const getStatisticsData = (stats) => {
  const result = [];

  console.log('stats inside', stats)

  for (const key in stats) {
    result.push({
      [key]: {
        diff: stats[key].booked - stats[key].cancelled,
        icon: 'total',
        title: 'Total',
        value: stats[key]
      },
      [key]: {
        diff: stats[key].booked - stats[key].cancelled,
        icon: 'booked',
        title: `${key}`,
        value: stats[key]
      },
      [key]: {
        diff: stats[key].cancelled - stats[key].booked,
        icon: 'cancelled',
        title: `${key}`,
        value: stats[key]
      },
    });
  }
  console.log(JSON.stringify(result) + " getStatiscticData")
  return result;

}

function Dashboard() {
  const {classes} = useStyles();
  const dispatch = useAppDispatch();
  const stats = useAppSelector(state => state.roomBooking.bookingRoomStatistics);
  const {totalTime, month, week, day} = stats;


  useEffect(() => {
    dispatch(fetchStatistic()).unwrap();
  }, [])



  const StatRender: React.FC<any> = ({stat}) => {
    //console.warn(stat.icon);
    //  const Icon = icons[stat.icon];
    console.log(JSON.stringify(stat) + " đủ rồi")
    const DiffIcon = stat.diff > 0 ? ArrowUpRight : ArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          {/*<Icon className={classes.icon} size={22}/>*/}
        </Group>

        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
          <Text
            color={stat.diff > 0 ? 'teal' : 'red'}
            size="sm"
            weight={500}
            className={classes.diff}
          >
            <span>{stat.diff}%</span>
            <DiffIcon size={16}/>
          </Text>
        </Group>

        <Text size="xs" color="dimmed" mt={7}>
          Compared to {stat.title}
        </Text>
      </Paper>
    );
  }

  return (
    <AdminLayout>
      <div className={classes.root}>
        <Title order={5}>TOTAL TIME</Title>
        <Space h="xl"/>
        <SimpleGrid
          cols={3}
          breakpoints={[
            {maxWidth: 'md', cols: 2},
            {maxWidth: 'xs', cols: 1},
          ]}
        >
          {stats ? getStatisticsData(totalTime).map((stat) => <StatRender key={stat.key} stat={stat}/>) : null}
        </SimpleGrid>
        <Space h="xl"/>

        < Title order={5}>MONTH </Title>
        <Space h="xl"/>
        <SimpleGrid
          cols={3}
          breakpoints={[
            {maxWidth: 'md', cols: 2},
            {maxWidth: 'xs', cols: 1},
          ]}
        >
          {stats ? getStatisticsData(month).map((stat) => <StatRender key={stat.key} stat={stat}/>) : null}
        </SimpleGrid>
        <Space h="xl"/>

        < Title order={5}>WEEK </Title>
        <Space h="xl"/>
        <SimpleGrid
          cols={3}
          breakpoints={[
            {maxWidth: 'md', cols: 2},
            {maxWidth: 'xs', cols: 1},
          ]}
        >
          {stats ? getStatisticsData(week).map((stat) => <StatRender key={stat.key} stat={stat}/>) : null}
        </SimpleGrid>
        <Space h="xl"/>

        < Title order={5}>DAY</Title>
        <Space h="xl"/>
        <SimpleGrid
          cols={3}
          breakpoints={[
            {maxWidth: 'md', cols: 2},
            {maxWidth: 'xs', cols: 1},
          ]}
        >
          {stats ? getStatisticsData(day).map((stat) => <StatRender key={stat.key} stat={stat}/>) : null}
        </SimpleGrid>
        <Space h="xl"/>


      </div>
    </AdminLayout>
  )
    ;
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
