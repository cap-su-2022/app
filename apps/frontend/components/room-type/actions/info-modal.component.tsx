import React, { useEffect, useState } from 'react';
import { InputWrapper, Modal, Textarea, TextInput } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchRoomTypeById } from '../../../redux/features/room-type';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface InfoModalProps {
  id: string;
  isShown: boolean;
  toggleShown(): void;
}

const InfoModal: React.FC<InfoModalProps> = (props) => {
  const [isShown, setShown] = useState<boolean>(props.isShown);

  const dispatch = useAppDispatch();

  const roomType = useAppSelector((state) => state.roomType.roomType);

  useEffect(() => {
    dispatch(fetchRoomTypeById(props.id));
  }, [props.id]);

  useEffect(() => {
    console.log(props.isShown);
  }, [props.isShown]);

  return (
    <Modal opened={props.isShown} onClose={() => props.toggleShown()}>
      {roomType ? (
        <>
          <InputWrapper label="Id">
            <TextInput defaultValue={roomType.id} readOnly />
          </InputWrapper>
          <InputWrapper label="Name">
            <TextInput defaultValue={roomType.name} readOnly />
          </InputWrapper>
          <InputWrapper label="Description">
            <Textarea defaultValue={roomType.description} readOnly />
          </InputWrapper>
        </>
      ) : null}
    </Modal>
  );
};

export default InfoModal;
