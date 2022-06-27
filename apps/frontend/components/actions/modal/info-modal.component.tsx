import React from 'react';
import {
  Button,
  createStyles,
  InputWrapper,
  Modal,
  TextInput,
} from '@mantine/core';
import { PencilOff, X } from 'tabler-icons-react';
import { InputInfoProps } from '../models/input-info-props.model';
import moment from 'moment';

interface InfoModalProps {
  header: React.ReactNode;
  isShown: boolean;
  toggleShown(): void;
  fields: InputInfoProps[];
}

const InfoModal: React.FC<InfoModalProps> = (props) => {
  const { classes } = useStyles();
  console.log(props.fields);

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
            <InputWrapper key={index} label={field.label}>
              <TextInput
                id={field.id}
                name={field.name}
                defaultValue={field.value}
                readOnly={field.readOnly}
              />
            </InputWrapper>
          ))}
        </div>
        <div className={classes.footer}>
          <Button leftIcon={<PencilOff />} onClick={() => {}} color="red">
            Disable
          </Button>

          <Button leftIcon={<X />} color="orange">
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
    display: 'flex',
    flexDirection: 'column',
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default InfoModal;
