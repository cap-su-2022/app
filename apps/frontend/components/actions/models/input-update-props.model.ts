import { InputTypes } from './input-type.constant';

export interface InputUpdateProps {
  id: string;
  name: string;
  required: boolean;
  label: string;
  description: string;
  inputtype: string;
  readOnly: boolean;
  data?: any[];
  value: string;
}
