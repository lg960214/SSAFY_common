import { ChangeEvent } from 'react';

interface FormInputProps {
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const FormInput = ({ type, value, onChange, placeholder }: FormInputProps) => {
  return (
    <input
      className="my-2 px-5 py-2 rounded-xl"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
    />
  );
};

export default FormInput;
