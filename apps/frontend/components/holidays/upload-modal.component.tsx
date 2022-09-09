import React from 'react';
import {
  Button,
  createStyles,
  Divider,
  Modal,
  Switch,
  Text,
} from '@mantine/core';
import {Download, FileDownload, Upload} from 'tabler-icons-react';

interface UploadModalProps {
  isShown: boolean;
  toggleShown(): void;
}

const UploadModal: React.FC<UploadModalProps> = (props) => {
  const { classes } = useStyles();

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
        <Button
          color="green"
          className={classes.button}
          leftIcon={<Upload />}
        >
          Import only one excel file
        </Button>
        <Button
          color="orange"
          className={classes.button}
          leftIcon={<Upload />}
        >
          Import multi excel files
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
