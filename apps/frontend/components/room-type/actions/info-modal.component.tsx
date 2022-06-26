import React, { useEffect, useState } from 'react';
import {
  Button,
  createStyles,
  InputWrapper,
  Modal,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchRoomTypeById } from '../../../redux/features/room-type';
import { Disabled, Disabled2, PencilOff, X } from 'tabler-icons-react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface InfoModalProps {
  header: React.ReactNode;
  id: string;
  isShown: boolean;
  toggleShown(): void;
}

const InfoModal: React.FC<InfoModalProps> = (props) => {
  const { classes } = useStyles();

  const dispatch = useAppDispatch();

  const roomType = useAppSelector((state) => state.roomType.roomType);

  useEffect(() => {
    dispatch(fetchRoomTypeById(props.id));
  }, [props.id]);

  useEffect(() => {
    console.log(props.isShown);
  }, [props.isShown]);

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
        {roomType ? (
          <div className={classes.inner}>
            <InputWrapper label="Id">
              <TextInput defaultValue={roomType.id} readOnly />
            </InputWrapper>
            <InputWrapper label="Name">
              <TextInput defaultValue={roomType.name} readOnly />
            </InputWrapper>
            <InputWrapper label="Description">
              <Textarea defaultValue={roomType.description} readOnly />
            </InputWrapper>
          </div>
        ) : null}
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
