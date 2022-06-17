import {Button, createStyles, Modal, ScrollArea, Select, Text, Textarea, TextInput} from "@mantine/core";
import AdminLayout from "../components/AdminLayout";
import React, {useState} from "react";
import {DatePicker} from "@mantine/dates";
import {Plus, X} from "tabler-icons-react";
import {useAppDispatch} from "../redux/hooks";
import {FPT_ORANGE_COLOR} from "@app/constants";

const slots = [
  {
    label: 'Slot 1',
    value: 1,
  },
  {
    label: 'Slot 2',
    value: 2,
  },
  {
    label: 'Slot 3',
    value: 3,
  },
  {
    label: 'Slot 4',
    value: 4,
  },
  {
    label: 'Slot 5',
    value: 5,
  },
  {
    label: 'Slot 6',
    value: 6,
  },
]

function BookingRoom() {
  const { classes } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const dispatch = useAppDispatch();

  const ModalHeaderTitle: React.FC = () => {
    return (
      <Text className={classes.modalHeaderTitle}>Booking Room</Text>
    )
  };

  return (
    <AdminLayout>
      <div>
        <Modal
          opened='opened'
          onClose='none'
          size='70%'
          centered
          title={<ModalHeaderTitle/>}
          closeOnClickOutside={false}
          closeOnEscape={false}>
          <ScrollArea sx={{ height: 510 }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
            <div style={{width: 860, position:'inherit'}}>
              <div style={{paddingBottom: '20px',borderBottom: 'solid', borderBottomWidth: 'thin', borderColor: "lightgray"}}>
                <Text className={classes.modalBodyHeaderTitle}>Room</Text>
                <div className={classes.displayGridRoom}>
                  <Select
                    style={{marginRight: 20, width: '200px', marginTop: 10}}
                    label='Room name'
                    required
                    transition="pop-top-left"
                    transitionDuration={80}
                    transitionTimingFunction="ease"
                    dropdownPosition="bottom"
                    radius="md"
                    data={[
                      {value:'LB01', label: 'LB01'},
                      {value:'LB02', label: 'LB02'},
                      {value:'LB03', label: 'LB03'},
                      {value:'LB04', label: 'LB04'},
                      {value:'LB05', label: 'LB05'}
                    ]}
                  />
                  <Select
                    style={{marginRight: 20, width: '140px', marginTop: 10}}
                    label='From slot'
                    required
                    transition="pop-top-left"
                    transitionDuration={80}
                    transitionTimingFunction="ease"
                    dropdownPosition="bottom"
                    radius="md"
                    data={slots}
                  />
                  <Select
                    style={{ width: '140px', marginTop: 10}}
                    label='To slot'
                    required
                    transition="pop-top-left"
                    transitionDuration={80}
                    transitionTimingFunction="ease"
                    dropdownPosition="bottom"
                    radius="md"
                    data={slots}
                  />
                </div>
                <div className={classes.displayGridRoom}>
                  <DatePicker
                    style={{width: '200px', marginRight: 20, marginTop: 10}}
                    label="Book date"
                    placeholder='Select date'
                    radius="md"
                    required
                    inputFormat='DD/MM/YYYY'
                    excludeDate={(date) => date.getDay() === 0 || date.getDay() === 6}
                  />
                  <Select
                    style={{width: '300px', marginTop: 10}}
                    label='Requested by'
                    required
                    transition="pop-top-left"
                    transitionDuration={80}
                    transitionTimingFunction="ease"
                    dropdownPosition="bottom"
                    radius="md"
                    data={[
                      {value:'tanpm', label: 'tanpm'},
                      {value:'bangnn', label: 'bangnn'}
                    ]}
                  />
                </div>
              </div>
              <div style={{ paddingBottom: '20px' ,borderBottom: 'solid', borderBottomWidth: 'thin', borderColor: "lightgray"}}>
                <div style={{flex:'auto'}}>
                  <Text className={classes.modalBodyHeaderTitle}>Devices</Text>
                  <div className={classes.displayGridRoom}>
                    <TextInput
                      style={{marginRight: 20, width:'200px', marginTop: 10}}
                      label="Device name"
                      radius="md"
                    />
                    <TextInput
                      style={{marginTop: 10, width:'200px'}}
                      label="Quantity"
                      radius="md"
                    />
                    <div className={classes.displayDeviceButton}>
                      <Button
                        style={{marginRight: 20, backgroundColor: FPT_ORANGE_COLOR}}
                        radius="md"
                      >
                        <Plus/>
                      </Button>
                      <Button
                        style={{marginRight: 20, backgroundColor: FPT_ORANGE_COLOR}}
                        radius="md"
                      >
                        <X/>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Text className={classes.modalBodyHeaderTitle}>Reason</Text>
                <Select
                  style={{ marginTop: 10, width: '150px' }}
                  label='Reason Type'
                  required
                  transition="pop-top-left"
                  transitionDuration={80}
                  transitionTimingFunction="ease"
                  radius="md"
                  data={[
                    {value:'Meeting', label: 'Meeting'},
                    {value:'Capstone', label: 'Capstone'},
                    {value:'Event', label: 'Event'}
                  ]}
                />
                <Textarea
                  radius="md"
                  label="Desciption (optional)"
                  className={classes.displayGrid}
                />
              </div>
              <div style={{textAlign: "right", marginTop: 10}}>
                <Button style={{ marginTop: 10, marginRight: 20, backgroundColor: FPT_ORANGE_COLOR}}>Cancel</Button>
                <Button style={{ marginTop: 10, marginRight: 20, backgroundColor: FPT_ORANGE_COLOR}}>Save as draft</Button>
                <Button style={{ marginTop: 10, backgroundColor: FPT_ORANGE_COLOR}}>Place a booking</Button>
              </div>
            </div>
          </ScrollArea>
        </Modal>
      </div>
    </AdminLayout>
  );
};

const useStyles = createStyles({
  modalHeaderTitle: {
    fontWeight: 600,
    fontSize: 22
  },

  modalBodyHeaderTitle:{
    fontWeight: 500,
    fontSize: 20
  },

  displayGridRoom: {
    display: 'flex',
    '@media (max-width: 920px)': {
      flexDirection: 'row'
    },
    '@media (max-width: 540px)': {
      flexDirection: 'column',
    },

  },

  displayGrid: {
    marginTop: 10,
    '@media (max-width: 920px)': {
      width: '100%'
    },
    '@media (max-width: 540px)': {
      width: 220
    },

  },

  displayDeviceButton:{
    marginLeft: 20,
    marginTop:'39px'
  }

});

export default BookingRoom;
