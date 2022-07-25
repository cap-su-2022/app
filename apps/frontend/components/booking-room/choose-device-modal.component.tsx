import React, { useEffect, useRef, useState } from 'react';
import {
  ActionIcon,
  Button,
  createStyles,
  Group,
  NumberInput,
  NumberInputHandlers,
  ScrollArea,
  Select,
  Textarea,
} from '@mantine/core';
import { Plus, X } from 'tabler-icons-react';
import { FormikProps } from 'formik';
import { showNotification } from '@mantine/notifications';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import autoAnimate from '@formkit/auto-animate';
import { useAppSelector } from '../../redux/hooks';

interface ChooseDeviceModalProps {
  formik: FormikProps<any>;
  handleSubmit(): void;
  handleNextConfirm(): void;
  handleBack(): void;
}
const ChooseDeviceModal: React.FC<ChooseDeviceModalProps> = (props) => {
  const { classes } = useStyles();
  const [value, setValue] = useState(0);
  const [device, setDevice] = useState('');
  const [deviceNames, setDeviceNames] = useState<any[]>(
    useAppSelector((state) => state.device.deviceNames)
  );
  const reasonNames = useAppSelector(
    (state) => state.bookingReason.reasonNames
  );
  const [choosedDevice, setChoosedDevice] = useState<any[]>([]);
  const [parent] = useAutoAnimate();
  const handlers = useRef<NumberInputHandlers>();

  const [show, setShow] = useState(false);
  const dropdown = useRef(null);


  useEffect(() => {
    props.formik.setFieldValue('bookingReasonId', reasonNames[0].value);
  }, []);

  useEffect(() => {
    parent.current && autoAnimate(dropdown.current);
  }, [parent]);
  const reveal = () => setShow(!show);

  useEffect(() => {
    if (device) {
      setValue(1);
    } else {
      setValue(0);
    }
  }, [device]);

  const add = () => {
    if (value === 0) {
      showNotification({
        id: 'miss-data',
        color: 'red',
        title: 'Quantity missed',
        message: 'Please choose quantity of device you want to use',
        icon: <X />,
        autoClose: 3000,
      });
    } else if (!device) {
      showNotification({
        id: 'miss-data',
        color: 'red',
        title: 'Device missed',
        message: 'Please choose device you want to use',
        icon: <X />,
        autoClose: 3000,
      });
    } else {
      if (deviceNames.length) {
        for (let i = 0; i < deviceNames.length; i++) {
          if (deviceNames[i].value === device) {
            setChoosedDevice((choosedDevice) => [
              ...choosedDevice,
              { ...deviceNames[i], quantity: value },
            ]);
            setDevice('');
            setValue(0);
            break;
          }
        }
        const deviceNamesUpdated = deviceNames.filter(
          (deviceName) => deviceName.value !== device
        );
        setDeviceNames(deviceNamesUpdated);
      } else {
        showNotification({
          id: 'miss-data',
          color: 'red',
          title: 'Out of device!',
          message: 'Dont have any device to choose',
          icon: <X />,
          autoClose: 3000,
        });
        alert('Out of device!');
      }
    }
  };

  const remove = (item) => {
    for (let i = 0; i < choosedDevice.length; i++) {
      if (choosedDevice[i].value === item) {
        setDeviceNames((devicename) => [
          ...devicename,
          { value: choosedDevice[i].value, label: choosedDevice[i].label },
        ]);
        break;
      }
    }
    const chooesdDeviceUpdated = choosedDevice.filter(
      (device) => device.value !== item
    );
    setChoosedDevice(chooesdDeviceUpdated);
  };

  // const test = () => {
  //   console.log("Device", device)
  //   console.log("Quantity", value)
  // }

  const handleNextStep = () => {
    props.formik.setFieldValue('listDevice', choosedDevice);
    if (props.formik.values.bookingReasonId) {
      // props.handleSubmit();
      props.handleNextConfirm();
    } else {
      showNotification({
        id: 'miss-data',
        color: 'red',
        title: 'Reason missed',
        message: 'Please choose a reason',
        icon: <X />,
        autoClose: 3000,
      });
    }
    // setShowChooseRoom(false);
    // setShowBowChooseSlot(true);
  };

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.which === 13) {
      add();
    }
  };

  return (
    <>
      <div>
        <ScrollArea style={{ height: 480 }}>
          <div className={classes.divInfor} ref={dropdown}>
            <div className={classes.divHeader}>
              <h3 className={classes.buttonChooseDevice} onClick={reveal}>
                Choose devices
              </h3>
            </div>
            {show && (
              <div className={classes.displayFex}>
                <Select
                  id="device"
                  name="device"
                  label="Select device (optional)"
                  onChange={setDevice}
                  value={device}
                  transition="pop-top-left"
                  transitionDuration={80}
                  transitionTimingFunction="ease"
                  dropdownPosition="bottom"
                  radius="md"
                  data={deviceNames}
                  searchable={true}
                  className={classes.selectComponent}
                  onKeyPress={handleKeypress}
                />
                <Group spacing={5} className={classes.groupComponent}>
                  <ActionIcon
                    size={35}
                    variant="default"
                    onClick={() => handlers.current.decrement()}
                  >
                    –
                  </ActionIcon>

                  <NumberInput
                    hideControls
                    value={value}
                    onChange={(val) => setValue(val)}
                    handlersRef={handlers}
                    max={10}
                    min={0}
                    step={1}
                    styles={{ input: { width: 54, textAlign: 'center' } }}
                  />

                  <ActionIcon
                    size={35}
                    variant="default"
                    onClick={() => handlers.current.increment()}
                  >
                    +
                  </ActionIcon>
                </Group>
                <Button
                  radius="md"
                  className={classes.buttonComponent}
                  onClick={() => add()}
                >
                  <Plus />
                </Button>
              </div>
            )}
            <div ref={parent} style={{ width: '300px' }}>
              {choosedDevice
                ? choosedDevice.map((item) => (
                    <div key={item.value} className={classes.item}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ margin: ' 0 10px' }}>{item.quantity}</div>
                        <div>{item.label}</div>
                      </div>
                      <Button
                        variant="subtle"
                        color="red"
                        size="xs"
                        onClick={() => remove(item.value)}
                      >
                        <X color="red" size={20} strokeWidth={2.5} />
                      </Button>
                    </div>
                  ))
                : null}
            </div>
            <div>
              <div className={classes.divHeader}>
                <h3 style={{ margin: 0 }}>Choose reason</h3>
              </div>
              <div className={classes.displayFex}>
                <Select
                  id="bookingReasonId"
                  name="bookingReasonId"
                  label="Select season"
                  required
                  onChange={props.formik.handleChange('bookingReasonId')}
                  value={props.formik.values.bookingReasonId}
                  transition="pop-top-left"
                  transitionDuration={80}
                  transitionTimingFunction="ease"
                  dropdownPosition="bottom"
                  radius="md"
                  data={reasonNames}
                  searchable={true}
                  className={classes.selectComponent}
                  style={{ width: 400 }}
                />
              </div>
              <Textarea
                placeholder="A few notes about your booking request this time"
                label="Description"
                minRows={4}
                maxRows={4}
                onChange={props.formik.handleChange('description')}
                value={props.formik.values.description}
              />
            </div>
          </div>
        </ScrollArea>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            onClick={() => props.handleBack()}
            // leftIcon={<Pencil />}
            color="green"
          >
            Back
          </Button>

          <Button onClick={() => handleNextStep()} color="green">
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

const useStyles = createStyles({
  divInfor: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    paddingTop: 10,
    borderRadius: 10,
    marginBottom: 10,
    minHeight: 470,
  },
  buttonChooseDevice: {
    margin: 0,
    cursor: 'pointer',
    border: '1px solid',
    padding: '5px 20px',
    borderRadius: 50,
  },
  divHeader: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10px 0 20px 0',
  },
  displayFex: {
    display: 'flex',
    alignItems: 'end',
    marginBottom: 20,
  },
  selectComponent: {
    width: '200px',
    marginRight: 10,
  },
  groupComponent: {
    marginRight: 10,
  },
  buttonComponent: {
    marginRight: 10,
    backgroundColor: 'red',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5em',
    backgroundColor: 'white',
    marginBottom: '0.5em',
    borderRadius: '0.5em',
    boxShadow: '0 0 0.5em rgba(0, 0, 0, 0.1)',
    fontSize: '0.875em',
  },
});

export default ChooseDeviceModal;
