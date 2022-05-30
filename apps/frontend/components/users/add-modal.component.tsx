import React, {useEffect, useState} from "react";
import {
  Button,
  createStyles,
  Modal,
  Switch,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import {useWindowDimensions} from "../../hooks/use-window-dimensions";
import {
  ClipboardText,
  FileDescription,
  Plus,
  X
} from "tabler-icons-react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {Form, FormikProvider, useFormik} from "formik";
import {fetchDevices} from "../../redux/features/devices/thunk/fetch-devices.thunk";
import {addDevice} from "../../redux/features/devices/thunk/add.thunk";

interface AddDeviceModalProps {
  isShown: boolean;
  toggleShown(): void;
}

const AddDeviceModal: React.FC<AddDeviceModalProps> = (props) => {
  const {classes} = useStyles();

  const [isUpdateDisabled, setUpdateDisabled] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const dimension = useWindowDimensions();

  const handleUpdateSubmit = async (values) => {
    dispatch(addDevice(values))
      .then(() => {
        props.toggleShown();
        dispatch(fetchDevices());
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
      <Text className={classes.modalHeaderTitle}>Add new device</Text>
    )
  };

  return (
    <>
      <Modal title={<ModalHeaderTitle/>}
             size={dimension.width / 2}
             centered
             opened={props.isShown}
             onClose={() => props.toggleShown()}>
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <div className={classes.modalBody}>
              <TextInput icon={<ClipboardText/>}
                         id="device-name"
                         name="name"
                         onChange={formik.handleChange}
                         className={classes.textInput}
                         radius="md"
                         label="Room name"
                         value={formik.values.name}/>
              <Textarea icon={<FileDescription/>}
                        className={classes.textInput}
                        id="device-description"
                        name="description"
                        onChange={formik.handleChange}
                        radius="md"
                        label="Room description"
                        value={formik.values.description}/>
              <Switch label="Make this device disabled"
                      style={{
                        marginTop: 20
                      }}
                      onChange={formik.handleChange}
                      size="lg"
                      checked={formik.values.disabled}
                      name="disabled"
                      id="device-disabled"
              />
            </div>
            <div className={classes.modalFooter}>
              <Button
                onClick={() => props.toggleShown()}
                variant="outline"
                color={"red"}
                leftIcon={<X/>}>Cancel</Button>
              <Button color="green"
                      disabled={isUpdateDisabled}
                      onClick={() => formik.submitForm()}
                      leftIcon={<Plus/>}>Add
              </Button>
            </div>
          </Form>
        </FormikProvider>
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

export default AddDeviceModal;
