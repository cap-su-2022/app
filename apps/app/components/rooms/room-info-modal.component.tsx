import React from "react";
import {Button, createStyles, InputWrapper, Modal, Text, Textarea, TextInput, useMantineTheme} from "@mantine/core";
import {useWindowDimensions} from "../../hooks/use-window-dimensions";
import {Archive, CalendarStats, ClipboardText, Clock, FileDescription, Id, X} from "tabler-icons-react";
import {convertDateToLocalDateString} from "../../utils/date.util";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {toggleRoomDetailModalShown, toggleRoomDisableModalVisible} from "../../redux/features/room/room.slice";
import DisableRoomModal from "./disable-room-modal.component";

const RoomInfoModal: React.FC = () => {
  const {classes} = useStyles();
  const theme = useMantineTheme();

  const room = useAppSelector((state) => state.room.selectedRoom);
  const isShown = useAppSelector((state) => state.room.isRoomDetailModalShown);

  const dispatch = useAppDispatch();

  const dimension = useWindowDimensions();


  const ModalHeaderTitle: React.FC = () => {
    return (
      <Text className={classes.modalHeaderTitle}>Room Information</Text>
    )
  };

  return (
    <>
      <Modal title={<ModalHeaderTitle/>}
             size={dimension.width / 2}
             centered
             opened={isShown}
             onClose={() => dispatch(toggleRoomDetailModalShown())}>
        <div className={classes.modalBody}>
          <TextInput icon={<Id/>}
                     className={classes.textInput}
                     radius="md"
                     label="Room ID"
                     readOnly value={room.id}/>
          <TextInput icon={<ClipboardText/>}
                     className={classes.textInput}
                     radius="md"
                     label="Room name"
                     readOnly value={room.name}/>
          <Textarea icon={<FileDescription/>}
                     className={classes.textInput}
                     radius="md"
                     label="Room description"
                     readOnly value={room.description}/>
          <div className={classes.modalInputDate}>
            <TextInput icon={<Clock/>}
                       className={classes.textInput}
                       radius="md"
                       label="Created At"
                       readOnly
                       value={convertDateToLocalDateString(new Date(room.createdAt))}/>
            <InputWrapper id="room-updatedat"
                          label="Updated At"
                          description="The date that the room information was updated">
              <TextInput id="room-updatedat"
                         icon={<CalendarStats/>}
                         className={classes.textInput}
                         radius="md"
                         readOnly
                         value={convertDateToLocalDateString(new Date(room.createdAt))}
              />
            </InputWrapper>
          </div>
        </div>

        <div className={classes.modalFooter}>
          <Button
            onClick={() => dispatch(toggleRoomDisableModalVisible())}
            variant="outline"
            color={"red"}
            leftIcon={<Archive/>}
          >
            Disable this room
          </Button>

          <Button onClick={() => dispatch(toggleRoomDetailModalShown())}
                  leftIcon={<X/>}
          >
            Close
          </Button>
        </div>
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

export default RoomInfoModal;
