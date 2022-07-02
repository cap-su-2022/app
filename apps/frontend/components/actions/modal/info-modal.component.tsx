import React from 'react';
import {
  Button,
  createStyles,
  InputWrapper,
  Modal,
  TextInput,
} from '@mantine/core';
import { CalendarStats, ClipboardText, FileDescription, Id, PencilOff, User, X } from 'tabler-icons-react';
import { InputInfoProps } from '../models/input-info-props.model';

interface InfoModalProps {
  header: React.ReactNode;
  isShown: boolean;
  toggleShown(): void;
  fields: InputInfoProps[];
}

const InfoModal: React.FC<InfoModalProps> = (props) => {
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
      <div className={classes.body}>
        <div className={classes.inner}>
          {props.fields.map((field, index) => (
            <InputWrapper
              key={index}
              label={field.label}
              className={classes.inputWrapper}
            >
              <TextInput
                id={field.id}
                name={field.name}
                icon={(field.id === 'id' ? <Id /> :
                      field.id === 'name'? <ClipboardText /> : 
                      field.id === 'description'? <FileDescription /> :
                      (field.id === 'createAt' || field.id === 'updateAt')? <CalendarStats /> :
                      (field.id === 'createBy' || field.id === 'updateBy')? <User /> : null)}
                defaultValue={field.value}
                readOnly={field.readOnly}
              />
            </InputWrapper>
          ))}
        </div>
        <div className={classes.footer}>
          <Button
            leftIcon={<X />}
            color="orange"
            onClick={() => props.toggleShown()}
          >
            Close
          </Button>
        </div>
      </div>
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
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    columnGap: 50,
  },
  inputWrapper: {
    margin: 10,
    '&:nth-child(1)': {
      gridColumnStart: 1,
      gridColumnEnd: 3,
    },
    '&:nth-child(2)': {
      gridColumnStart: 1,
      gridColumnEnd: 3,
    },
    '&:nth-child(3)': {
      gridColumnStart: 1,
      gridColumnEnd: 3,
    },
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
});

export default InfoModal;
