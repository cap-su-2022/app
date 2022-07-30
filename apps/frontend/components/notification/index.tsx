import { GetServerSideProps } from 'next';
import AdminLayout from '../layout/admin.layout';
import { Button, createStyles, ScrollArea, Text } from '@mantine/core';
import { Ban, CircleCheck, Dots, Notification } from 'tabler-icons-react';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useDebouncedValue } from '@mantine/hooks';
import NoDataFound from '../no-data-found';
import { fetchNotifications } from '../../redux/features/notification/';
import moment from 'moment';

function NotificationManagement(props: any) {
  const { classes } = useStyles();
  const notifications = useAppSelector(
    (state) => state.notification.notifications
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchNotifications()).unwrap();
    //   .then((roomTypes) => setRoomTypeNames(roomTypes));
  }, []);

  const NotificationDiv: React.FC = () => {
    return (
      <ScrollArea style={{ height: '60vh', borderRadius: 5 }}>
        {notifications?.length > 0
          ? notifications.map((notification) => (
              <div
                className={classes.notificationDiv}
                key={notification.id}
                onClick={() => console.log(notification.id)}
              >
                <div style={{ marginRight: 10 }}>
                  {notification.title.includes('accepted') ||
                  notification.title.includes('resolved') ? (
                    <CircleCheck size={48} strokeWidth={2} color={'#40bf59'} />
                  ) : notification.title.includes('cancelled') ||
                    notification.title.includes('rejected') ? (
                    <Ban size={48} strokeWidth={2} color={'#bf4040'} />
                  ) : (
                    <Notification size={48} strokeWidth={2} color={'#1e194d'} />
                  )}
                </div>

                <div>
                  <b>{notification.title}</b>
                  <Text size="sm" lineClamp={1}>
                    {notification.message}
                  </Text>
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <p
                      style={{
                        color: 'blue',
                        fontSize: '0.8rem',
                        marginTop: 5,
                      }}
                    >
                      {moment(notification.createdAt).fromNow()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          : null}
      </ScrollArea>
    );
  };

  return (
    <>
      <AdminLayout>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className={classes.mainDiv}>
            <div className={classes.headerDiv}>
              <h1 className={classes.header}>Notification</h1>
              <Dots size={20} strokeWidth={2} color={'black'} />
            </div>
            <div style={{ margin: '10px 0' }}>
              <Button variant="light" style={{ borderRadius: 50 }}>
                All
              </Button>
              <Button
                variant="subtle"
                color="dark"
                style={{ borderRadius: 50 }}
              >
                Not read
              </Button>
            </div>
            <b style={{ margin: '10px 0' }}>Before</b>
            <NotificationDiv />
          </div>
        </div>
      </AdminLayout>
    </>
  );
}

const useStyles = createStyles({
  tableContainer: {
    margin: 10,
  },
  table: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  mainDiv: {
    boxShadow: '#0000003d 0px 3px 8px;',
    margin: 20,
    padding: 10,
    borderRadius: 10,
    maxHeight: '80vh',
    width: '600px',
  },
  headerDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    fontFamily: 'inherit',
    fontWeight: 'inherit',
    fontSize: '1.5rem',
    color: 'inherit',
    outline: 'none',
  },
  notificationDiv: {
    backgroundColor: '#f3f3f3',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginRight: 10,
    '&:hover': {
      backgroundColor: '#b1dfff',
    },
  },
});

export default NotificationManagement;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      assa: null,
    },
  };
};
