import { ChangeEvent } from 'react';

interface FormInputProps {
  type: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setValueEmpty?: () => void;
  placeholder?: string;
}

const FormInput = ({
  type,
  value,
  onChange,
  setValueEmpty,
  placeholder,
}: FormInputProps) => {
  return (
    <div className="relative my-2">
      <input
        className="w-[256px] px-5 py-2 rounded-xl"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
      {!setValueEmpty ? null : (
        <img
          src={'/img/cancel.svg'}
          alt="비움"
          onClick={setValueEmpty}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 hover:cursor-pointer"
        />
      )}
    </div>
  );
};

export default FormInput;
