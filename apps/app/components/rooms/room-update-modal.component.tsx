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
import {Archive, CalendarStats, ClipboardText, Clock, FileDescription, Id, Pencil, Trash, X} from "tabler-icons-react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {
  toggleRoomDisableModalVisible,
  toggleRoomUpdateModalVisible
} from "../../redux/features/room/room.slice";
import DisableRoomModal from "./disable-room-modal.component";
import {Form, FormikProvider, useFormik} from "formik";
import * as Yup from 'yup';
import {updateRoomById} from "../../redux/features/room/thunk/update-room-by-id";
import {fetchRooms} from "../../redux/features/room/thunk/fetch-rooms";

const RoomUpdateSchema = Yup.object();

const RoomUpdateModal: React.FC = () => {
  const {classes} = useStyles();
  const theme = useMantineTheme();

  const room = useAppSelector((state) => state.room.selectedRoom);
  const isShown = useAppSelector((state) => state.room.isRoomUpdateModalShown);

  const [isUpdateDisabled, setUpdateDisabled] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const dimension = useWindowDimensions();

  const handleUpdateSubmit = async (values) => {
    dispatch(updateRoomById({
      id: values.id,
      payload: values,
    })).then(() => dispatch(fetchRooms()));
  }

  const formik = useFormik({
    initialValues: {
      id: room.id,
      name: room.name,
      description: room.description,
    },
    enableReinitialize: true,
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
      <Text className={classes.modalHeaderTitle}>Update Room Information</Text>
    )
  };

  return (
    <>
      <Modal title={<ModalHeaderTitle/>}
             size={dimension.width / 2}
             centered
             opened={isShown}
             onClose={() => dispatch(toggleRoomUpdateModalVisible())}>
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <div className={classes.modalBody}>
              <TextInput icon={<Id/>}
                         disabled
                         id="room-id"
                         name="id"
                         className={classes.textInput}
                         radius="md"
                         label="Room ID"
                         readOnly value={formik.values.id}/>
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

            </div>

            <div className={classes.modalFooter}>
              <Button
                onClick={() => dispatch(toggleRoomDisableModalVisible())}
                variant="outline"
                color={"red"}
                leftIcon={<Trash/>}
              >
                Delete this room
              </Button>

              <Button color="green" disabled={isUpdateDisabled} onClick={() => formik.submitForm()}
                      leftIcon={<Pencil/>}
              >
                Update
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

export default RoomUpdateModal;
