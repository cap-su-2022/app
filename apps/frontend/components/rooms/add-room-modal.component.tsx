import React, {useEffect, useState} from "react";
import {
  Button,
  createStyles,
  InputWrapper,
  Modal,
  Switch,
  Text,
  Textarea,
  TextInput,
  useMantineTheme
} from "@mantine/core";
import {useWindowDimensions} from "../../hooks/use-window-dimensions";
import {
  Archive,
  CalendarStats,
  ClipboardText,
  Clock,
  FileDescription,
  Id,
  Pencil,
  Plus,
  Trash,
  X
} from "tabler-icons-react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {
  toggleRoomAddModalVisible,
  toggleRoomDisableModalVisible,
  toggleRoomUpdateModalVisible
} from "../../redux/features/room/room.slice";
import DisableRoomModal from "./disable-room-modal.component";
import {Form, FormikProvider, useFormik} from "formik";
import * as Yup from 'yup';
import {updateRoomById} from "../../redux/features/room/thunk/update-room-by-id";
import {fetchRooms} from "../../redux/features/room/thunk/fetch-rooms";
import {addRoom} from "../../redux/features/room/thunk/add-room";

const RoomUpdateSchema = Yup.object();

const AddRoomModal: React.FC = () => {
  const {classes} = useStyles();
  const theme = useMantineTheme();

  const room = useAppSelector((state) => state.room.selectedRoom);
  const isShown = useAppSelector((state) => state.room.isRoomAddModalShown);

  const [isUpdateDisabled, setUpdateDisabled] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const dimension = useWindowDimensions();

  const handleUpdateSubmit = async (values) => {
    dispatch(addRoom(values))
      .then(() => {
        dispatch(toggleRoomAddModalVisible());
        dispatch(fetchRooms());
        });
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      disabled: false,
    },
    onSubmit: (values) => handleUpdateSubmit(values),
  });


  useEffect(() => {
    if (formik.initialValues.name === formik.values.name
    && formik.initialValues.description === formik.values.description) {
      setUpdateDisabled(true);
    } else {
      setUpdateDisabled(false);
    }
  }, [formik.values.name, formik.values.description]);




  const ModalHeaderTitle: React.FC = () => {
    return (
      <Text className={classes.modalHeaderTitle}>Add new room</Text>
    )
  };

  return (
    <>
      <Modal title={<ModalHeaderTitle/>}
             size={dimension.width / 2}
             centered
             opened={isShown}
             onClose={() => dispatch(toggleRoomAddModalVisible())}>
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <div className={classes.modalBody}>
              <TextInput icon={<ClipboardText/>}
                         id="room-name"
                         name="name"
                         onChange={formik.handleChange}
                         className={classes.textInput}
                         radius="md"
                         label="Room name"
                         value={formik.values.name}/>
              <Textarea icon={<FileDescription/>}
                        className={classes.textInput}
                        id="room-description"
                        name="description"
                        onChange={formik.handleChange}
                        radius="md"
                        label="Room description"
                        value={formik.values.description}/>
              <Switch label="Make this room disabled"
                      style={{
                        marginTop: 20
                      }}
                      onChange={formik.handleChange}
                      size="lg"
                      checked={formik.values.disabled}
                      name="disabled"
                      id="room-disabled"
              />

            </div>

            <div className={classes.modalFooter}>
              <Button
                onClick={() => dispatch(toggleRoomDisableModalVisible())}
                variant="outline"
                color={"red"}
                leftIcon={<X/>}
              >
                Cancel
              </Button>

              <Button color="green" disabled={isUpdateDisabled} onClick={() => formik.submitForm()}
                      leftIcon={<Plus/>}
              >
                Add
              </Button>
            </div>
          </Form>
        </FormikProvider>
      </Modal>
      <DisableRoomModal/>
    </>
  )
};

const useStyles = createStyles({
  modalHeaderTitle: {
    fontWeight: '600',
    fontSize: 22
  },
  modalBody: {
    display: 'flex',
    flexDirection: 'column',
    margin: 20
  },
  modalFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: 10
  },
  modalInputDate: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    marginTop: 10
  }
});

export default AddRoomModal;
