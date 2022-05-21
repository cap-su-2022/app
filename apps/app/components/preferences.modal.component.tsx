import React from "react";
import {createStyles, Modal} from "@mantine/core";
import UserInfoPreference from "./preferences/user-info.component";

interface PreferencesModalProps {
  isShown: boolean;
  toggleShown(): void;
}

const PreferencesModal: React.FC<PreferencesModalProps> = (props) => {

  return (
    <Modal
      size="85%"
      opened={props.isShown}
      onClose={() => props.toggleShown()}>
      <UserInfoPreference/>
    </Modal>

  );
}

const useStyles = createStyles({

});

export default PreferencesModal;
