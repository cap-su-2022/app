import React, {useState} from "react";
import {Button, createStyles, Group, Modal, Switch, TextInput, useMantineColorScheme} from "@mantine/core";
import {AddRoomModal} from "../../models/components/add-room-modal.props";
import {Form, FormikProvider, FormikValues, useFormik} from "formik";
import axios from "axios";
import {useAppDispatch} from "../../redux/hooks";
import {toggleSpinnerOn} from "../../redux/features/spinner";
import {CirclePlus, MoonStars, Sun, X} from "tabler-icons-react";

interface AddRoomModalFormModel {
  name: string;
  description: string;
  isDisabled: boolean;
}
const initialFormValues: AddRoomModalFormModel = {
  name: '',
  description: '',
  isDisabled: false,

};

const AddRoomModal: React.FC<AddRoomModal> = (props) => {

  const dispatch = useAppDispatch();


  const [focused, setFocused] = useState(false);
  const [value, setValue] = useState('');
  const { classes, cx } = useStyles({ floating: value.trim().length !== 0 || focused });

  const [isDisabled, setDisabled] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: initialFormValues,
    onSubmit: values => handleFormSubmit(values),
  })

  const handleFormSubmit = async (values: FormikValues) => {
    dispatch(toggleSpinnerOn());
    const resp = axios.post('/api/rooms/add', {
      name: values.name,
      description: values.description,
      isDisabled: values.isDisabled,

    }, {
      headers: {
        'Media-Type': 'application/json; charset=utf-8'
      }
    }).finally(() => {
      dispatch(toggleSpinnerOn());
    })
  }

  const toggleDisabled = () => {
    setDisabled(!isDisabled);
  }

  return (<Modal centered
                 opened={props.isShown}
                 onClose={() => props.handleShown(false)}
                 title="Add new library room"
  >
    <FormikProvider value={formik}>
      <Form style={{
        marginTop: 20,
        marginBottom: 20,
      }}>
        <TextInput
          style={{
            marginTop: 20
          }}
          name="name"
          defaultValue={formik.values.name}
          label="Room name"
          placeholder="Enter the room name"
          required
          classNames={classes}
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          mt="md"
          autoComplete="nope"
        />

        <TextInput
          style={{
            marginTop: 20
          }}
          name="description"
          defaultValue={formik.values.name}
          label="Room description"
          placeholder="Enter the room description"
          required
          classNames={classes}
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          mt="md"
          autoComplete="nope"
        />
        <Group my={20}>
          <b>Disabled</b>

          <div className={classes.root}>
            <Sun className={cx(classes.icon, classes.iconLight)} size={18} />
            <MoonStars className={cx(classes.icon, classes.iconDark)} size={18} />
            <Switch checked={isDisabled} onChange={() => toggleDisabled()} size="md" />
          </div>
        </Group>

        <div style={{
          display: 'flex'
        }}>
          <Button variant="outline" leftIcon={<X/>} color="orange">Cancel</Button>
          <Button type="submit" variant="outline" color="green" leftIcon={<CirclePlus/>}>Add Room</Button>
        </div>

      </Form>

    </FormikProvider>
  </Modal>)
}

const useStyles = createStyles((theme, { floating }: { floating: boolean }) => ({
  root: {
    position: 'relative',
    '& *': {
      cursor: 'pointer',
    },
  },
  icon: {
    pointerEvents: 'none',
    position: 'absolute',
    zIndex: 1,
    top: 3,
  },

  iconLight: {
    left: 4,
    color: theme.white,
  },

  iconDark: {
    right: 4,
    color: theme.colors.gray[6],
  },
  label: {
    position: 'absolute',
    zIndex: 2,
    top: 7,
    left: theme.spacing.sm,
    pointerEvents: 'none',
    color: floating
      ? theme.colorScheme === 'dark'
        ? theme.white
        : theme.black
      : theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
    transition: 'transform 150ms ease, color 150ms ease, font-size 150ms ease',
    transform: floating ? `translate(-${theme.spacing.sm}px, -28px)` : 'none',
    fontSize: floating ? theme.fontSizes.xs : theme.fontSizes.sm,
    fontWeight: floating ? 500 : 400,
  },

  required: {
    transition: 'opacity 150ms ease',
    opacity: floating ? 1 : 0,
  },

  input: {
    '&::placeholder': {
      transition: 'color 150ms ease',
      color: !floating ? 'transparent' : undefined,
    },
  },
}));

export default AddRoomModal;
