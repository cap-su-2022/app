import React from "react";
import {Devices} from "tabler-icons-react";
import {createStyles, Text} from "@mantine/core";

const DevicesHeader: React.FC = () => {
  const {classes} = useStyles();

  return (
    <div className={classes.container}>
      <Devices size={50}/>
      <Text className={classes.text}>Devices Management</Text>
    </div>
  );
}

const useStyles = createStyles({
  text: {
    marginLeft: 10,
    fontWeight: 600,
    fontSize: 30
  },
  container: {
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
});

export default DevicesHeader;
