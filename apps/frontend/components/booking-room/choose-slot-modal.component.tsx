import React, { useEffect, useState } from 'react';
import {
  Button,
  createStyles,
  InputWrapper,
  Modal,
  Select,
  Table,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useWindowDimensions } from '../../hooks/use-window-dimensions';
import {
  Alarm,
  Archive,
  BuildingWarehouse,
  CalendarStats,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  ClipboardText,
  Clock,
  FileDescription,
  Id,
  User,
  X,
} from 'tabler-icons-react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import dayjs from 'dayjs';
import autoAnimate from '@formkit/auto-animate';
import { FormikProps } from 'formik';
import { DatePicker } from '@mantine/dates';
import { showNotification } from '@mantine/notifications';
import { fetchListBookingByRoomInWeek } from '../../redux/features/room-booking/thunk/fetch-list-booking-by-room-in-week.thunk';

interface ChooseSlotModalProps {
  formik: FormikProps<any>;
  handleSubmit(): void;
  handleBackChooseRoom(): void;
  handleNextChooseDevice(): void;
  roomNames: any[];
  slotNames: any[];
  listBooking: any[];
}
const ChooseSlotModal: React.FC<ChooseSlotModalProps> = (props) => {
  const { classes } = useStyles();
  const [slotNames, setSlotName] = useState<any[]>(props.slotNames);
  const dispatch = useAppDispatch();
  const [dayShowShecule, setDayShowShecule] = useState(
    new Date(dayjs(new Date()).format('YYYY-MM-DD'))
  ); // get current date
  const curr = new Date();
  const sun = dayShowShecule.getDate() - dayShowShecule.getDay(); // First day is the day of the month - the day of the week
  const [days, setDays] = useState<any[]>();
  const [listRequest, setListRequest] = useState(props.listBooking);

  console.log('LISSSSS: ', listRequest);
  const handleNextStep = () => {
    if (
      props.formik.values.checkinDate === null ||
      props.formik.values.checkinSlot === null ||
      props.formik.values.checkoutSlot === null
    ) {
      showNotification({
        id: 'miss-data',
        color: 'red',
        title: 'Miss some filed',
        message: 'Please choose day, slot start, slot end before to next step',
        icon: <X />,
        autoClose: 3000,
      });
    } else {
      props.handleNextChooseDevice();
    }
  };

  const toNextWeek = () => {
    setDayShowShecule(
      new Date(dayShowShecule.getTime() + 7 * 24 * 60 * 60 * 1000)
    );
  };

  const toLastWeek = () => {
    setDayShowShecule(
      new Date(dayShowShecule.getTime() - 7 * 24 * 60 * 60 * 1000)
    );
  };

  useEffect(() => {
    if (props.formik.values.roomId !== '') {
      dispatch(
        fetchListBookingByRoomInWeek({
          roomId: props.formik.values.roomId,
          date: dayShowShecule.toUTCString(),
        })
      )
        .unwrap()
        .then((listBooking) =>
          setListRequest(
            listBooking.map((request) => {
              return {
                ...request,
                checkinDate: new Date(request.checkinDate).getDate(),
              };
            })
          )
        );
    }
  }, [dayShowShecule, dispatch, props.formik.values.roomId]);

  useEffect(() => {
    props.formik.values.checkinSlot = null;
    props.formik.values.checkoutSlot = null;
    if (props.formik.values.checkinDate) {
      const curr = new Date();
      const currTime = dayjs(curr).format('HH:mm:ss');
      const choosedDay = new Date(props.formik.values.checkinDate).getDate();

      const result = slotNames.map((slot, indexSlot) => {
        let isFree = true;
        let isOverSlot = false;

        if (choosedDay === curr.getDate() && currTime > slot.timeStart) {
          isFree = false;
        }
        listRequest.map((request) => {
          console.log('request day: ', request.checkinDate);
          console.log('choose day: ', choosedDay);
          if (request.checkinDate === choosedDay) {
            return request.checkinDate === choosedDay &&
              request.slotIn <= slot.slotNum &&
              request.slotOut >= slot.slotNum &&
              request.status === 'BOOKED'
              ? (isFree = false)
              : null;
          }
          if (choosedDay === curr.getDate() - curr.getDay() + 6) {
            if (indexSlot > 2) {
              isOverSlot = true;
            }
          }
        });

        if (!isOverSlot) {
          if (isFree) {
            return {
              ...slot,
              disabled: false,
            };
          } else {
            return {
              ...slot,
              disabled: true,
            };
          }
        } else {
          return {
            ...slot,
            disabled: true,
          };
        }
      });
      setSlotName(result);
    } else {
      const result = slotNames.map((slot) => {
        return { ...slot, disabled: true };
      });
      setSlotName(result);
    }
  }, [props.formik.values.checkinDate]);

  useEffect(() => {
    const tmpArr = [];

    for (let i = 0; i < 6; i++) {
      const test = new Date(dayShowShecule);
      tmpArr[i] = new Date(test.setDate(sun + i + 1));
    }

    setDays(tmpArr);
  }, [dayShowShecule, sun]);

  const rows = slotNames.map((slot, indexSlot) => {
    let isBooked = false;
    let isPending = false;
    let isPassed = false;
    let isOverSlot = false;
    return (
      <tr key={slot.value}>
        <td>Slot {indexSlot + 1}</td>
        {days
          ? days.map((day, index) => {
              isBooked = false;
              isPending = false;
              isPassed = false;
              isOverSlot = false;
              return (
                <>
                  <td key={indexSlot + '' + index}>
                    {listRequest.length > 0
                      ? listRequest.map((request) => {
                          if (
                            // request.checkinSlot === request.checkoutSlot &&
                            request.checkinDate === day.getDate()
                          ) {
                            return request.checkinDate === day.getDate() &&
                              request.slotIn <= slot.slotNum &&
                              request.slotOut >= slot.slotNum
                              ? request.status === 'BOOKED'
                                ? (isBooked = true)
                                : (isPending = true)
                              : null;
                          }
                          if (day < curr) {
                            isPassed = true;
                          }
                          if (
                            day.getDay() ===
                            curr.getDate() - curr.getDay() + 6
                          ) {
                            if (indexSlot > 2) {
                              isOverSlot = true;
                            }
                          }
                          // if (
                          //   slotInThisDayBeBooked === day &&
                          //   slotBeBooked !== slot.value
                          // ) {
                          //   isFree = false;
                          // }
                        })
                      : day < curr
                      ? (isPassed = true)
                      : null}
                    {!isOverSlot ? (
                      !isPassed ? (
                        isPending ? (
                          <div className={classes.slotPending}>
                            {day.getDate()}
                          </div>
                        ) : isBooked ? (
                          <div className={classes.slotBooked}>
                            {day.getDate()}
                          </div>
                        ) : (
                          <div className={classes.slotFree}>
                            {day.getDate()}
                          </div>
                        )
                      ) : (
                        <div className={classes.dayPassed}>{day.getDate()}</div>
                      )
                    ) : null}
                  </td>
                </>
              );
            })
          : null}
      </tr>
    );
  });

  return (
    <div>
      <div className={classes.divInfor}>
        <div className={classes.divHeader}>
          <h3 style={{ margin: 0 }}>Choose time to book</h3>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={() => toLastWeek()}
            color="orange"
            size="xs"
            variant="subtle"
            disabled={
              dayShowShecule.setHours(0, 0, 0, 0) == curr.setHours(0, 0, 0, 0)
                ? true
                : false
            }
          >
            <ChevronLeft />
          </Button>
          {days ? (
            <h4
              style={{
                display: 'flex',
                alignItems: 'center',
                margin: '0',
                justifyContent: 'center',
                width: 100,
              }}
            >
              {days[0].getDate() +
                '/' +
                days[0].getMonth() +
                '  -  ' +
                days[5].getDate() +
                '/' +
                days[5].getMonth()}
            </h4>
          ) : null}
          <Button
            onClick={() => toNextWeek()}
            color="orange"
            size="xs"
            variant="subtle"
            disabled={
              dayShowShecule.setHours(0, 0, 0, 0) ==
              new Date(curr.getTime() + 2 * 7 * 24 * 60 * 60 * 1000).setHours(
                0,
                0,
                0,
                0
              )
                ? true
                : false
            }
          >
            <ChevronRight />
          </Button>
        </div>
        <Table>
          <thead>
            <tr>
              <th className={classes.thDiv}></th>
              {/* <th className={classes.thDiv}>CN</th> */}
              <th className={classes.thDiv}>
                <div>Mon</div>
              </th>
              <th className={classes.thDiv}>
                <div>Tue</div>
              </th>
              <th className={classes.thDiv}>
                <div>Wed</div>
              </th>
              <th className={classes.thDiv}>
                <div>Thu</div>
              </th>
              <th className={classes.thDiv}>
                <div>Fri</div>
              </th>
              <th className={classes.thDiv}>
                <div>Sat</div>
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: 30 }}>
          <div className={classes.noteSlotBooked}>.</div>
          <p>Slot was booked</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: 30 }}>
          <div className={classes.noteSlotPending}>.</div>
          <p>Slot have request pending</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: 30 }}>
          <div className={classes.noteSlotFree}>.</div>
          <p>Slot free</p>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          marginBottom: 20,
        }}
      >
        <DatePicker
          id="checkinDate"
          style={{ width: '200px', marginRight: 20, marginTop: 10 }}
          label="Book date"
          placeholder="Select date"
          radius="md"
          required
          inputFormat="DD/MM/YYYY"
          value={props.formik.values.checkinDate}
          minDate={dayjs(new Date()).toDate()}
          maxDate={dayjs(new Date()).add(3, 'weeks').toDate()}
          // onChange={(date) => setbookDate(date)}
          onChange={(date) => {
            props.formik.setFieldValue('checkinDate', date);
          }}
          excludeDate={(date) => date.getDay() === 0 || date.getDay() === 7}
        />

        <Select
          id="checkinSlot"
          style={{ marginRight: 20, width: '140px' }}
          label="From slot"
          required
          transition="pop-top-left"
          transitionDuration={80}
          transitionTimingFunction="ease"
          dropdownPosition="top"
          radius="md"
          data={slotNames}
          onChange={props.formik.handleChange('checkinSlot')}
          value={props.formik.values.checkinSlot}
        />
        <ChevronsRight
          size={28}
          strokeWidth={2}
          color={'black'}
          style={{ marginRight: 20 }}
        />
        <Select
          id="checkoutSlot"
          style={{ width: '140px' }}
          label="To slot"
          required
          transition="pop-top-left"
          transitionDuration={80}
          transitionTimingFunction="ease"
          dropdownPosition="top"
          radius="md"
          data={slotNames}
          onChange={props.formik.handleChange('checkoutSlot')}
          value={props.formik.values.checkoutSlot}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          onClick={() => props.handleBackChooseRoom()}
          // leftIcon={<Pencil />}
          color="green"
        >
          Back
        </Button>

        <Button
          // onClick={() => props.handleSubmit()}
          onClick={() => handleNextStep()}
          // leftIcon={<Pencil />}

          color="green"
        >
          Next
        </Button>
      </div>
    </div>
  );
  // return (
  //   <>
  //     {showChooseSlot && <ChooseSlot />}
  //     {showChooseDevice && (
  //       // <ChooseDeviceModal
  //       //   formik={props.formik}
  //       //   handleSubmit={props.handleSubmit}
  //       //   handleBackChooseRoom={handleBackChooseRoom}
  //       //   roomNames={props.roomNames}
  //       //   slotNames={props.slotNames}
  //       //   listBooking={listBooking}
  //       // />
  //       <div>Ahihihihihi</div>
  //     )}
  //   </>
  // );
};

const useStyles = createStyles({
  divInfor: {
    backgroundColor: '#f0f0f0',
    paddingBottom: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  divHeader: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '10px',
    marginTop: '20px',
  },
  thDiv: {
    '@textAlign': 'center!important',
  },
  tdDiv: {
    margin: 'auto',
  },
  dayPassed: {
    backgroundColor: '#a6a6a6',
    height: 20,
    width: 50,
    borderRadius: 5,
    margin: 'auto',
  },
  slotFree: {
    backgroundColor: '#6bce6b',
    height: 20,
    width: 50,
    borderRadius: 5,
    margin: 'auto',
  },
  slotPending: {
    backgroundColor: '#7373d0',
    height: 20,
    width: 50,
    borderRadius: 5,
    margin: 'auto',
  },
  slotBooked: {
    backgroundColor: '#fd6262',
    height: 20,
    width: 50,
    borderRadius: 5,
    margin: 'auto',
  },
  noteSlotBooked: {
    backgroundColor: '#fd6262',
    height: 15,
    width: 30,
    margin: 0,
    borderRadius: 5,
    marginRight: 5,
    marginLeft: 20,
  },
  noteSlotPending: {
    backgroundColor: '#7373d0',
    height: 15,
    width: 30,
    margin: 0,
    borderRadius: 5,
    marginRight: 5,
  },
  noteSlotFree: {
    backgroundColor: '#6bce6b',
    height: 15,
    width: 30,
    margin: 0,
    borderRadius: 5,
    marginRight: 5,
  },
});

export default ChooseSlotModal;
