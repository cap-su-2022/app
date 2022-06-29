import React from 'react';
import { InputTypes } from '../models/input-type.constant';
import { Select, Textarea, TextInput } from '@mantine/core';

const InputType: React.FC<any> = (props) => {
  switch (props.inputtype) {
    case InputTypes.TextInput:
      return <TextInput {...props} />;
    case InputTypes.TextArea:
      return <Textarea { ...props.value? {...props} : {...props, value: undefined} } />;
    case InputTypes.Select:
      return <Select data={props.data} {...props} />;
  }
};

export default InputType;
