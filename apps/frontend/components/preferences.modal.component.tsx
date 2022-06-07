import React from "react";
import { createStyles, Modal, Text } from "@mantine/core";
import UserInfoPreference from "./preferences/user-info.component";
import { Settings } from "tabler-icons-react";

interface PreferencesModalProps {
  isShown: boolean;
  toggleShown(): void;
}

const PreferencesModal: React.FC<PreferencesModalProps> = (props) => {

  const ModalHeader: React.FC = () => {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
      }}>
        <Settings size={35}/>
        <Text style={{
          marginLeft: 10,
          fontWeight: '600',
          fontSize: 22
        }}>Preferences</Text>
      </div>
    );
  }
  return (
    <Modal
      size="80%"
      title={<ModalHeader/>}
      opened={props.isShown}
      onClose={() => props.toggleShown()}>
      <UserInfoPreference/>
    </Modal>

  );
}

const useStyles = createStyles({

});

export default PreferencesModal;
