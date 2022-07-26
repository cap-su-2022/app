import React, { useEffect, useState } from 'react';
import {
  Button,
  createStyles,
  Modal,
  ScrollArea,
  Select,
  Table,
  Text,
} from '@mantine/core';
import { Check, ScanEye, Trash, X } from 'tabler-icons-react';
import { FPT_ORANGE_COLOR } from '@app/constants';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { PagingParams } from '../../models/pagination-params/paging-params.model';

interface DetailModalProps {
  isShown: boolean;
  toggleShown(): void;
  pagination: PagingParams;
}

const DetailModal: React.FC<DetailModalProps> = (props) => {
  const { classes, cx } = useStyles();
  const selectedNoti = useAppSelector((state) => state.notification.notification);

  const dispatch = useAppDispatch();

  return (
    <Modal
      closeOnClickOutside={true}
      centered
      zIndex={100}
      opened={props.isShown}
      onClose={() => props.toggleShown()}
    >

    </Modal>
  );
};

const useStyles = createStyles((theme) => ({

}));

export default DetailModal;
