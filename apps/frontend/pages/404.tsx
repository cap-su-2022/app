import Link from 'next/link';
import Image from 'next/image';
import {createStyles, Text} from "@mantine/core";
import {FPT_ORANGE_COLOR} from "@app/constants";

function FourOhFour() {
  const {classes} = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Image layout="fixed" width={400} height={400} src="/undraw/taken.svg" alt="Not found"/>
        <Text className={classes.text}>
          [404] The page you are trying to find doesn&apos;t exist!
        </Text>
      </div>
    </div>
  );
}

const useStyles = createStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh'
  },
  wrapper: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 50,
    borderWidth: 1,
    borderColor: `1px solid ${FPT_ORANGE_COLOR}`
  },
  text: {
    fontWeight: '600',
    fontSize: 30,
  }
});


export default FourOhFour;
