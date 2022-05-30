import React, {useEffect, useState} from "react";
import {
  Button,
  createStyles,
  Modal,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import {useWindowDimensions} from "../../hooks/use-window-dimensions";
import {ClipboardText, FileDescription, Id, Pencil, Trash, X} from "tabler-icons-react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {Form, FormikProvider, useFormik} from "formik";
import {fetchDevices} from "../../redux/features/devices/thunk/fetch-devices.thunk";
import {updateDeviceById} from "../../redux/features/devices/thunk/update-by-id";

interface UpdateModalProps {
  isShown: boolean;
  toggleShown(): void;
  toggleDeleteModalShown(): void;
}

const UpdateModal: React.FC<UpdateModalProps> = (props) => {
  const {classes} = useStyles();
  const device = useAppSelector((state) => state.device.selectedDevice);
  const [isUpdateDisabled, setUpdateDisabled] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const dimension = useWindowDimensions();

  const handleUpdateSubmit = async (values) => {
    dispatch(updateDeviceById({
      id: values.id,
      payload: values,
    })).then(() => props.toggleShown())
      .then(() => dispatch(fetchDevices()));
  }

  const formik = useFormik({
    initialValues: {
      id: device.id,
      name: device.name,
      description: device.description,
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
      <Text className={classes.modalHeaderTitle}>Update Device Information</Text>
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
              <TextInput icon={<Id/>}
                         disabled
                         id="device-id"
                         name="id"
                         className={classes.textInput}
                         radius="md"
                         label="Device ID"
                         readOnly value={formik.values.id}/>
              <TextInput icon={<ClipboardText/>}
                         id="device-name"
                         name="name"
                         onChange={formik.handleChange}
                         className={classes.textInput}
                         radius="md"
                         label="Device name"
                         value={formik.values.name}/>
              <Textarea icon={<FileDescription/>}
                        className={classes.textInput}
                        id="device-description"
                        name="description"
                        onChange={formik.handleChange}
                        radius="md"
                        label="Device description"
                        value={formik.values.description}/>

            </div>

            <div className={classes.modalFooter}>
              <Button
                onClick={() => props.toggleDeleteModalShown()}
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

export default UpdateModal;
