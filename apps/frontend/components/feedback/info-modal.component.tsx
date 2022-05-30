import React, {useEffect} from "react";
import {Button, createStyles, InputWrapper, Modal, Text, Textarea, TextInput, useMantineTheme} from "@mantine/core";
import {useWindowDimensions} from "../../hooks/use-window-dimensions";
import {Archive, CalendarStats, ClipboardText, Clock, FileDescription, Id, X} from "tabler-icons-react";
import {convertDateToLocalDateString} from "../../utils/date.util";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";

interface InfoModalProps {
  isShown: boolean;
  toggleShown(): void;
  toggleDisableModalShown(): void;
}

const InfoModal: React.FC<InfoModalProps> = (props) => {
  const {classes} = useStyles();
  const user = useAppSelector((state) => state.user.selectedUser);
  const dispatch = useAppDispatch();
  const dimension = useWindowDimensions();

  const ModalHeaderTitle: React.FC = () => {
    return (
      <Text className={classes.modalHeaderTitle}>
        Account Information
      </Text>
    )
  };

  return (
    <>
      <Modal title={<ModalHeaderTitle/>}
             size={dimension.width / 2}
             centered
             opened={props.isShown}
             onClose={() => props.toggleShown()}>
        <div className={classes.modalBody}>
          <TextInput icon={<Id/>}
                     className={classes.textInput}
                     radius="md"
                     label="Device ID"
                     readOnly value={user.id}/>
          <TextInput icon={<ClipboardText/>}
                     className={classes.textInput}
                     radius="md"
                     label="Device name"
                     readOnly value={user.username}/>
          <Textarea icon={<FileDescription/>}
                     className={classes.textInput}
                     radius="md"
                     label="Device description"
                     readOnly value={user.description}/>
          <div className={classes.modalInputDate}>
            <TextInput icon={<Clock/>}
                       className={classes.textInput}
                       radius="md"
                       label="Created At"
                       readOnly
                       value={convertDateToLocalDateString(new Date(user.createdAt))}/>
            <InputWrapper id="device-updatedat"
                          label="Updated At"
                          description="The date that the device information was updated">
              <TextInput id="device-updatedat"
                         icon={<CalendarStats/>}
                         className={classes.textInput}
                         radius="md"
                         readOnly
                         value={convertDateToLocalDateString(new Date(user.createdAt))}
              />
            </InputWrapper>
          </div>
        </div>

        <div className={classes.modalFooter}>
          <Button
            onClick={() => props.toggleDisableModalShown()}
            variant="outline"
            color={"red"}
            leftIcon={<Archive/>}
          >
            Disable this account
          </Button>

          <Button onClick={() => props.toggleShown()}
                  leftIcon={<X/>}
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  )
};

const useStyles = createStyles({
  modalHeaderTitle: {
    fontWeight: 600,
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

export default InfoModal;
