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

interface ChooseSlotModalProps {
  formik: FormikProps<any>;
  handleSubmit(): void;
  handleBackChooseRoom(): void;
  roomNames: any[];
  slotNames: any[];
  listBooking: any[];
}
const ChooseSlotModal: React.FC<ChooseSlotModalProps> = (props) => {
  const { classes } = useStyles();
  const [slotNames, setSlotName] = useState<any[]>(props.slotNames);

  const handleNextStep = () => {
    if (
      props.formik.values.bookDate === null ||
      props.formik.values.slotStartId === null ||
      props.formik.values.slotEndId === null
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
      props.handleSubmit();
      // setShowChooseRoom(false);
      // setShowBowChooseSlot(true);
    }
  };

  useEffect(() => {
    props.formik.values.slotStartId = null;
    props.formik.values.slotEndId = null;
    if (props.formik.values.bookDate) {
      const curr = new Date();
      const choosedDay = new Date(props.formik.values.bookDate).getDate();

      const result = slotNames.map((slot, indexSlot) => {
        let isFree = true;
        let isOverSlot = false;

        props.listBooking.map((request) => {
          if (request.checkinDate === choosedDay) {
            return request.checkinDate === choosedDay &&
              request.slotIn <= slot.slotNum &&
              request.slotOut >= slot.slotNum
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
  }, [props.formik.values.bookDate]);

  const curr = new Date(); // get current date
  // console.log(curr.getDate())
  // const curr = new Date(currTest.getTime() + 7 * 24 * 60 * 60 * 1000); // get current date
  const sun = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
  // const mon = sun + 1; // last day is the first day + 6
  // const tue = sun + 2; // last day is the first day + 6
  // const wed = sun + 3; // last day is the first day + 6
  // const thu = sun + 4; // last day is the first day + 6
  // const fri = sun + 5; // last day is the first day + 6
  // const sat = sun + 6; // last day is the first day + 6
  const days = [
    // curr.getDate() - curr.getDay(),
    sun + 1,
    sun + 2,
    sun + 3,
    sun + 4,
    sun + 5,
    sun + 6,
  ];

  const rows = slotNames.map((slot, indexSlot) => {
    let isFree = true;
    let isPassed = false;
    let isOverSlot = false;
    return (
      <tr key={slot.value}>
        <td>Slot {indexSlot + 1}</td>
        {days.map((day, index) => {
          isFree = true;
          isPassed = false;
          isOverSlot = false;
          return (
            <>
              <td key={index}>
                {props.listBooking.length > 0
                  ? props.listBooking.map((request) => {
                      if (
                        // request.checkinSlot === request.checkoutSlot &&
                        request.checkinDate === day
                      ) {
                        return request.checkinDate === day &&
                          request.slotIn <= slot.slotNum &&
                          request.slotOut >= slot.slotNum
                          ? (isFree = false)
                          : null;
                      }
                      if (day < curr.getDate()) {
                        isPassed = true;
                      }
                      if (day === curr.getDate() - curr.getDay() + 6) {
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
                  : day < curr.getDate()
                  ? (isPassed = true)
                  : null}
                {!isOverSlot ? (
                  isFree ? (
                    isPassed ? (
                      <div className={classes.dayPassed}></div>
                    ) : (
                      <div className={classes.slotFree}></div>
                    )
                  ) : (
                    <div className={classes.slotBooked}></div>
                  )
                ) : null}
              </td>
            </>
          );
        })}
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
          <p>This week</p>
        </div>
        <Table>
          <thead>
            <tr>
              <th className={classes.thDiv}></th>
              {/* <th className={classes.thDiv}>CN</th> */}
              <th className={classes.thDiv}>T2</th>
              <th className={classes.thDiv}>T3</th>
              <th className={classes.thDiv}>T4</th>
              <th className={classes.thDiv}>T5</th>
              <th className={classes.thDiv}>T6</th>
              <th className={classes.thDiv}>T7</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
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
          id="bookDate"
          style={{ width: '200px', marginRight: 20, marginTop: 10 }}
          label="Book date"
          placeholder="Select date"
          radius="md"
          required
          inputFormat="DD/MM/YYYY"
          value={props.formik.values.bookDate}
          minDate={dayjs(new Date()).toDate()}
          maxDate={dayjs(new Date()).add(3, 'weeks').toDate()}
          // onChange={(date) => setbookDate(date)}
          onChange={(date) => {
            props.formik.setFieldValue('bookDate', date);
          }}
          excludeDate={(date) => date.getDay() === 0 || date.getDay() === 7}
        />

        <Select
          id="slotStartId"
          style={{ marginRight: 20, width: '140px' }}
          label="From slot"
          required
          transition="pop-top-left"
          transitionDuration={80}
          transitionTimingFunction="ease"
          dropdownPosition="top"
          radius="md"
          data={slotNames}
          onChange={props.formik.handleChange('slotStartId')}
          value={props.formik.values.slotStartId}
        />
        <ChevronsRight
          size={28}
          strokeWidth={2}
          color={'black'}
          style={{ marginRight: 20 }}
        />
        <Select
          id="slotEndId"
          style={{ width: '140px' }}
          label="To slot"
          required
          transition="pop-top-left"
          transitionDuration={80}
          transitionTimingFunction="ease"
          dropdownPosition="top"
          radius="md"
          data={slotNames}
          onChange={props.formik.handleChange('slotEndId')}
          value={props.formik.values.slotEndId}
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
};

const useStyles = createStyles({
  divInfor: {
    backgroundColor: '#dcd9d4',
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
  dayPassed: {
    backgroundColor: '#a6a6a6',
    height: 20,
    width: '50px',
    margin: 0,
    borderRadius: 5,
  },
  slotFree: {
    backgroundColor: '#6bce6b',
    height: 20,
    width: '50px',
    margin: 0,
    borderRadius: 5,
  },
  slotBooked: {
    backgroundColor: '#fd6262',
    height: 20,
    width: '50px',
    margin: 0,
    borderRadius: 5,
  },
});

export default ChooseSlotModal;
