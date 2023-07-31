import FormInput from '@/components/common/FormInput';
import SubmitButton from '@/components/common/SubmitButton';
import { useState, FormEvent, ChangeEvent } from 'react';

const SignUpForm = () => {
  const [name, setName] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [gender, setGender] = useState<string>('남');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log(`id: ${id}, Password: ${password}`);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handlePasswordCheckChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordCheck(event.target.value);
  };

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  return (
    <form className="flex flex-col items-center" onSubmit={handleSubmit}>
      <FormInput
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="이 름"
      />
      <FormInput
        type="text"
        value={id}
        onChange={handleIdChange}
        placeholder="아이디"
      />
      <FormInput
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="비밀번호"
      />
      <FormInput
        type="password"
        value={passwordCheck}
        onChange={handlePasswordCheckChange}
        placeholder="비밀번호 확인"
      />
      <FormInput
        type="text"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="전화번호"
      />
      <FormInput
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="이메일"
      />
      <div className="my-10">
        <SubmitButton
          title="회 원 가 입"
          color="CustomNavy"
          textColor="white"
          width="[200px]"
        />
      </div>
    </form>
  );
};

export default SignUpForm;
