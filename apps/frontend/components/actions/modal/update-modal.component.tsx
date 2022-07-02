import React from 'react';
import { Button, createStyles, InputWrapper, Modal } from '@mantine/core';
import { useAppDispatch } from '../../../redux/hooks';
import { CalendarStats, ClipboardText, FileDescription, Id, Pencil, User } from 'tabler-icons-react';
import { FormikProps, FormikProvider } from 'formik';
import { InputUpdateProps } from '../models/input-update-props.model';
import InputType from '../common/input-type.component';

interface UpdateModalProps {
  header: React.ReactNode;
  isShown: boolean;
  toggleShown(): void;
  fields: InputUpdateProps[];
  formik: FormikProps<any>;
  handleSubmit(): void;
}

const UpdateModal: React.FC<UpdateModalProps> = (props) => {
  const { classes } = useStyles();

  return (
    <Modal
      size="lg"
      centered
      title={<div className={classes.headerTitle}>{props.header}</div>}
      padding="lg"
      transition="pop"
      withinPortal
      trapFocus
      withCloseButton
      closeOnClickOutside
      closeOnEscape
      opened={props.isShown}
      onClose={() => props.toggleShown()}
    >
      <FormikProvider value={props.formik}>
        <div className={classes.body}>
          <div className={classes.inner}>
            {props.fields.map((field, index) => (
              <InputWrapper
                key={index}
                label={field.label}
                description={field.description}
                required={field.required}
              >
                <InputType
                  readOnly={field.readOnly}
                  id={field.id}
                  name={field.name}
                  icon={(field.id === 'id' ? <Id /> :
                      field.id === 'name'? <ClipboardText /> : 
                      field.id === 'description'? <FileDescription /> : null)}
                  onChange={props.formik.handleChange}
                  error={props.formik.errors[field.id]}
                  inputtype={field.inputtype}
                  data={field.data}
                  value={props.formik.values[field.id] || ""}
                />
              </InputWrapper>
            ))}
          </div>
          <div className={classes.footer}>
            <Button
              onClick={() => props.handleSubmit()}
              leftIcon={<Pencil />}
              color="green"
            >
              Update
            </Button>
          </div>
        </div>
      </FormikProvider>
    </Modal>
  );
};

const useStyles = createStyles({
  headerTitle: { fontWeight: 600, fontSize: 20 },
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
  },
})

export default UpdateModal;