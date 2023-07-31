import LoginForm from '@/components/user/login/LoginForm';

const LoginPage = () => {
  return (
    <div className="flex justify-center h-[100vh] bg-[#f2f2f2]">
      <div className="mt-[100px] pt-[30px] px-[30px] h-[450px] shadow-xl rounded-2xl flex flex-col items-center bg-CustomGray">
        <img className="mb-10" src="/img/logo.svg" alt="logo" />
        <LoginForm />
        <div>
          <span className="mr-4">계정이 없으신가요?</span>
          <span className="italic text-CustomOrange hover:underline">
            회원가입
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
