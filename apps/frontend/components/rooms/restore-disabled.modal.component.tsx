import React, { useEffect, useState } from "react";
import { createStyles, Table, ScrollArea, Modal, Text, Button, InputWrapper, TextInput } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RotateClockwise, Search, Trash } from "tabler-icons-react";
import { restoreDisabledRoom } from "../../redux/features/room/thunk/restore-disabled.thunk";
import { fetchRooms } from "../../redux/features/room/thunk/fetch-rooms";
import { fetchDisabledRooms } from "../../redux/features/room/thunk/fetch-disabled-rooms";
import { deleteRoomById } from "../../redux/features/room/thunk/delete-room-by-id";
import dayjs from "dayjs";
import { useDebouncedValue } from "@mantine/hooks";

interface RestoreDisabledRoomModalProps {
  isShown: boolean;

  toggleShown(): void;
}

const RestoreDisabledRoomModal: React.FC<RestoreDisabledRoomModalProps> = (props) => {
  const { classes, cx } = useStyles();
  const disabledRooms = useAppSelector((state) => state.room.disabledRooms);
  const dispatch = useAppDispatch();
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState<string>("");

  const [searchDebounced] = useDebouncedValue<string>(search, 400);


  useEffect(() => {
    dispatch(fetchDisabledRooms(search));
  }, [searchDebounced]);

  const handleActiveRoom = (id: string) => {
    dispatch(restoreDisabledRoom(id)).unwrap()
      .then(() => dispatch(fetchRooms()))
      .then(() => dispatch(fetchDisabledRooms(search)).unwrap()
        .then((disabledRooms) => disabledRooms.length < 1 ? props.toggleShown() : null));
  };

  const handleDeleteRoom = (id: string) => {
    dispatch(deleteRoomById(id)).unwrap()
      .then(() => dispatch(fetchRooms()))
      .then(() => dispatch(fetchDisabledRooms(search)).unwrap()
        .then((disabledRooms) => disabledRooms.length < 1 ? props.toggleShown() : null));

  }

  const rows = disabledRooms?.map((row, index) => (
    <tr key={row.id}>
      <td>{index + 1}</td>
      <td>{row.name}</td>
      <td>{row.type}</td>
      <td>{dayjs(row.disabledAt).format("DD/MM/YYYY HH:mm:ss")}</td>
      <td>{row.disabledBy}</td>
      <td style={{
        display: "flex",
        flexDirection: "column"
      }}>
        <Button onClick={() => handleActiveRoom(row.id)} style={{
          margin: 5
        }} variant="outline" color="green" leftIcon={<RotateClockwise />}>
          Activate
        </Button>
        <Button onClick={() => handleDeleteRoom(row.id)} style={{
          margin: 5
        }} variant="outline" color="red" leftIcon={<Trash/>}>
          Delete
        </Button>
      </td>
    </tr>
  ));

  const ModalHeaderTitle: React.FC = () => {
    return (
      <Text className={classes.modalHeaderTitle}>Restore Disabled Rooms</Text>
    )
  };

  return (
    <Modal opened={props.isShown}
           onClose={() => props.toggleShown()}
           centered
           size="85%"
           title={<ModalHeaderTitle />}
           closeOnClickOutside={false}
           closeOnEscape={false}>
      <ScrollArea sx={{ height: 700 }} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        <InputWrapper label="Search"
                      description="Search for library name...">
          <TextInput onChange={(e) => setSearch(e.target.value)}
                     icon={<Search />} />
        </InputWrapper>
        <Table sx={{ minWidth: 700 }}>
          <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Type</th>
            <th>Disabled at</th>
            <th>Disabled by</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </Modal>
  );
}

const useStyles = createStyles((theme) => ({
  modalHeaderTitle: {
    fontWeight: 600,
    fontSize: 22
  },
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

export default RestoreDisabledRoomModal;
