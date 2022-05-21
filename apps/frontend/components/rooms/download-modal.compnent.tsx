import React from "react";
import {Button, createStyles, Divider, Modal, Switch, Text} from "@mantine/core";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {toggleRoomsDownloadModalVisible} from "../../redux/features/room/room.slice";
import {Download, FileDownload} from "tabler-icons-react";

const DownloadModal: React.FC = () => {

  const {classes} = useStyles();

  const isShown = useAppSelector((state) => state.room.isDownloadModalShown);

  const dispatch = useAppDispatch();

  const ModalHeaderTitle: React.FC = () => {
    return (
      <Text style={{
        fontWeight: '600',
        fontSize: 22
      }}>
        Export to Excel file
      </Text>
    );
  }

  return (
    <Modal centered
           title={<ModalHeaderTitle/>}
           opened={isShown}
           onClose={() => dispatch(toggleRoomsDownloadModalVisible())}>
      <div style={{
        margin: 10,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        flexGrow: '1',
      }}>
        <Button color="green" style={{
          marginTop: 10,
        }} leftIcon={<FileDownload/>}>
          Export only this page
        </Button>
        <Button color="orange" style={{
          marginTop: 10,
        }} leftIcon={<Download/>}>
          Export all data
        </Button>
      </div>

      <Divider style={{
        marginTop: 10,
        marginBottom: 10
      }}/>
      <Switch style={{
        margin: 5
      }} label="Including DISABLED data"/>
      <Switch style={{
        margin: 5
      }} label="Including DELETED data"/>

    </Modal>
  );
};

const useStyles = createStyles({

});

export default DownloadModal;
