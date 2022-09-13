import React, { useState } from 'react';
import {
  Button,
  createStyles,
  Divider,
  Modal,
  Text,
  // FileButton,
} from '@mantine/core';
import { Check, Upload, X } from 'tabler-icons-react';
import { importHoliday } from '../../redux/features/holidays/thunk/import-holiday';
import { useAppDispatch } from '../../redux/hooks';
import readXlsxFile from 'read-excel-file';
import { showNotification } from '@mantine/notifications';
import { fetchHolidays } from '../../redux/features/holidays/thunk/fetch-holidays.thunk';
import { PagingParams } from '../../models/pagination-params/paging-params.model';

interface UploadModalProps {
  isShown: boolean;
  toggleShown(): void;
  pagination: PagingParams;
}

const UploadModal: React.FC<UploadModalProps> = (props) => {
  const { classes } = useStyles();
  const [tableData, setTableData] = useState([]);

  const importexcel = (e) => {
    const file = e.target.files[0];
    readXlsxFile(file).then((rows) => {
      setTableData(rows);
    });
  };

  const dispatch = useAppDispatch();

  const handleAddSubmit = async (values) => {
    dispatch(importHoliday(tableData))
      .unwrap()
      .catch((e) =>
        showNotification({
          id: 'load-data',
          color: 'red',
          title: 'Error while adding holiday',
          message: e.message ?? 'Failed to add holiday',
          icon: <X />,
          autoClose: 3000,
        })
      )
      .then(() =>
        showNotification({
          id: 'load-data',
          color: 'teal',
          title: 'Holiday was added',
          message: 'Holiday was successfully added',
          icon: <Check />,
          autoClose: 3000,
        })
      )
      .then(() => props.toggleShown())
      .then(() => dispatch(fetchHolidays(props.pagination)));
  };

  const ModalHeaderTitle: React.FC = () => {
    return <Text className={classes.modalTitleText}>Import file Excel</Text>;
  };

  return (
    <Modal
      centered
      title={<ModalHeaderTitle />}
      closeOnClickOutside={true}
      opened={props.isShown}
      onClose={() => props.toggleShown()}
    >
      <div className={classes.buttonContainer}>
        {/* <FileButton onChange={setFile} accept="xlsx,xlsm" leftIcon={<Upload />}>
          {(props) => <Button {...props}>Upload image</Button>}
        </FileButton>
        {file && (
          <Text size="sm" align="center" mt="sm">
            Picked file: {file.name}
          </Text>
        )} */}
        {/* <Button color="orange" className={classes.button} leftIcon={<Upload />}>
          Import multi excel files
        </Button> */}
        <input required type="file" onChange={importexcel} />
        <Button
          color="green"
          className={classes.button}
          leftIcon={<Upload />}
          onClick={handleAddSubmit}
        >
          Upload
        </Button>
      </div>
      <Divider className={classes.divider} />
    </Modal>
  );
};

const useStyles = createStyles({
  modalTitleText: {
    fontWeight: 600,
    fontSize: 22,
  },
  buttonContainer: {
    margin: 10,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    flexGrow: 1,
  },
  button: {
    marginTop: 10,
  },
  divider: {
    marginTop: 10,
    marginBottom: 10,
  },
  switch: {
    margin: 5,
  },
});

export default UploadModal;
