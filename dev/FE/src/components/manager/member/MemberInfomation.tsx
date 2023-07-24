interface MemberInfomationProps {
  name: string;
  userid: string;
  number: string;
  sex: string;
  date: number;
  tag: string | null;
}

export const MemberInfomation = (item: MemberInfomationProps) => {
  return (
    <div className="text-black">
      <div>회원 상세 정보</div>
      <div className="border-white border-b-2 h-0"></div>
      <div className="flex">
        <div>
          <p>이름</p>
          <p>전화번호</p>
          <p>아이디</p>
          <p>회원번호</p>
          <p>이메일</p>
          <p>성별</p>
          <p>최근 방문일</p>
          <p>가입일</p>
        </div>
        <div>
          <p>{item.name}</p>
          <p>{item.number}</p>
          <p>아이디 뭔데 그래서</p>
          <p>{item.userid}</p>
          <p>이메일 무너데</p>
          <p>{item.sex}</p>
          <p>{item.date}</p>
          <p>헥 이것도 업성요!</p>
        </div>
      </div>
      <div>
        <button className="bg-black text-white w-24 h-12 text-center align-middle">
          회원 해제
        </button>
      </div>
    </div>
  );
};
