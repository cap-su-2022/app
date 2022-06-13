import React from "react";
import { Button, createStyles, Modal, Text } from "@mantine/core";
import UserInfoPreference from "./preferences/user-info.component";
import { Settings, SettingsOff } from "tabler-icons-react";

interface PreferencesModalProps {
  isShown: boolean;

  toggleShown(): void;
}

const PreferencesModal: React.FC<PreferencesModalProps> = (props) => {
  const [isLessThan540px, setIsLessThan540px] = React.useState(false);
  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 540) setIsLessThan540px(true);
      if (window.innerWidth > 540) setIsLessThan540px(false);
    }

    window.addEventListener("resize", handleResize);
  });

  const ModalHeader: React.FC = () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center"
        }}
      >
        <Settings size={35} />
        <Text
          style={{
            marginLeft: 10,
            fontWeight: "600",
            fontSize: 22
          }}
        >
          Preferences
        </Text>
      </div>
    );
  };
  if (isLessThan540px) {
    return (
      <Modal
        size="100%"
        title={<ModalHeader />}
        opened={props.isShown}
        onClose={() => props.toggleShown()}
      >
        <UserInfoPreference />
      </Modal>
    );
  } else {
    return (
      <Modal
        size="70%"
        title={<ModalHeader />}
        opened={props.isShown}
        onClose={() => props.toggleShown()}
      >
        <UserInfoPreference />
      </Modal>
    );
  }
};

const useStyles = createStyles({});

export default PreferencesModal;
