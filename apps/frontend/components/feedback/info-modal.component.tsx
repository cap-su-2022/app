import React from 'react';
import {
  Button,
  createStyles,
  InputWrapper,
  Modal,
  Textarea,
  TextInput,
} from '@mantine/core';
import {
  CalendarStats,
  ClipboardText,
  FileDescription,
  Id,
  PencilOff,
  User,
  X,
} from 'tabler-icons-react';
import { useAppSelector } from '../../redux/hooks';
import dayjs from 'dayjs';

interface InfoModalProps {
  header: React.ReactNode;
  isShown: boolean;
  toggleShown(): void;
}

const InfoModal: React.FC<InfoModalProps> = (props) => {
  const { classes } = useStyles();
  const feedback = useAppSelector((state) => state.feedback.feedback);

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
          <InputWrapper label="Created at" className={classes.inputWrapper}>
            <TextInput
              icon={<ClipboardText />}
              radius="md"
              readOnly
              value={dayjs(feedback.createdAt).format('DD-MM-YYYY')}
            />
          </InputWrapper>
          <InputWrapper label="Created by" className={classes.inputWrapper}>
            <TextInput
              icon={<ClipboardText />}
              radius="md"
              readOnly
              value={feedback.createdBy}
            />
          </InputWrapper>
          <InputWrapper label="Feedback message" className={classes.inputWrapper}>
            <Textarea
              icon={<ClipboardText />}
              radius="md"
              readOnly
              value={feedback.feedbackMess}
            />
          </InputWrapper>
          
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
    '&:nth-of-type(1)': {
      gridColumnStart: 1,
      gridColumnEnd: 3,
    },
    '&:nth-of-type(2)': {
      gridColumnStart: 1,
      gridColumnEnd: 3,
    },
    '&:nth-of-type(3)': {
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
