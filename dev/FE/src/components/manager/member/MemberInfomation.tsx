interface MemberInfomationProps {
  name: string;
  userid: string;
  number: string;
  sex: string;
  date: number;
  tag: string | null;
}

export const MemberInfomation = (item: MemberInfomationProps) => {
  const infoTitle = [
    '이름',
    '전화번호',
    '아이디',
    '회원번호',
    '이메일',
    '성별',
    '최근 방문일',
    '가입일',
  ];
  return (
    <div className="text-black p-8 w-[460px] h-[580px] border-2 bg-white border-black rounded-2xl">
      <div className="w-50 h-12 border-b-2 border-black text-xl font-bold flex justify-center items-center">
        <p>회원 상세 정보</p>
      </div>
      <div className="border-white border-b-2 h-0"></div>
      <div className="flex align-middle text-center">
        <div className="basis-1/3">
          {infoTitle.map((item) => {
            return <p className="h-12 align-middle content-center">{item}</p>;
          })}
        </div>
        <div className="basis-2/3 text-start">
          <p className="h-12 align-middle border-b-2 border-black">
            {item.name}
          </p>
          <p className="h-12 align-middle border-b-2 border-black">
            {item.number}
          </p>
          <p className="h-12 align-middle border-b-2 border-black">
            아이디 받는 api가 없어요
          </p>
          <p className="h-12 align-middle border-b-2 border-black">
            {item.userid}
          </p>
          <p className="h-12 align-middle border-b-2 border-black">
            이메일 받는 api가 없어요
          </p>
          <p className="h-12 align-middle border-b-2 border-black">
            {item.sex}
          </p>
          <p className="h-12 align-middle border-b-2 border-black">
            {item.date}
          </p>
          <p className="h-12 align-middle border-b-2 border-black">
            가입일 받는 api가 없어요
          </p>
        </div>
      </div>
      <div>
        <button className="bg-black mt-3 float-right text-white w-24 h-12 text-center p-0">
          회원 해제
        </button>
      </div>
    </div>
  );
};
