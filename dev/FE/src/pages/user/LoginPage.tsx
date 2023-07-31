import LoginForm from '@/components/user/login/LoginForm';
import OnboardingContainer from '@/components/common/OnboardingContainer';

const LoginPage = () => {
  return (
    <OnboardingContainer height="450px">
      <LoginForm />
      <div>
        <span className="mr-4">계정이 없으신가요?</span>
        <span className="italic text-CustomOrange hover:underline">
          회원가입
        </span>
      </div>
    </OnboardingContainer>
  );
};

export default LoginPage;
