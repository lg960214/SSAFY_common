export const ApproveContent = () => {
  return (
    <>
      <div className="flex justify-evenly items-center h-12 basis-32 text-center">
        <span className="basis-1/4">이름</span>
        <span className="basis-1/4">회원 번호</span>
        <span className="basis-1/4">승인요청일</span>
        <span className="basis-1/4">구분</span>
      </div>
      <div className="border-white border-b-2 h-0"></div>
      <div className="flex justify-evenly items-center h-12 basis-32 text-center">
        <span className="basis-1/4">김승우</span>
        <span className="basis-1/4">0944632</span>
        <span className="basis-1/4">2023.07.17</span>
        <span className="basis-1/4">승인 거절</span>
      </div>
    </>
  );
};
