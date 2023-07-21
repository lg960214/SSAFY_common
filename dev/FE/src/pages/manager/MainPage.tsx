import ContactSection from '@/components/manager/main/ContactSection';
import ServiceSection from '@/components/manager/main/ServiceSection';
import TitleSection from '@/components/manager/main/TitleSection';

const MainPage = () => {
  return (
    <>
      <div>
        <TitleSection />
        <ServiceSection />
        <ContactSection />
      </div>
    </>
  );
};

export default MainPage;
