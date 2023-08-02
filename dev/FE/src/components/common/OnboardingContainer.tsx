interface OnboardingContainerProps {
  children: React.ReactNode;
  height: string;
}

const OnboardingContainer = ({
  children,
  height,
}: OnboardingContainerProps) => {
  return (
    <div className="flex justify-center h-[100vh] bg-[#f2f2f2]">
      <div
        className={`mt-[50px] pt-[30px] px-[30px] h-[${height}] shadow-xl rounded-2xl flex flex-col items-center bg-CustomGray`}
      >
        <img className="mb-10" src="/img/logo.svg" alt="logo" />
        {children}
      </div>
    </div>
  );
};

export default OnboardingContainer;
