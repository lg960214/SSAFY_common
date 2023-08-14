import { useEffect, useState } from 'react';
import { RankData } from '@/types/user.type';
import SectionHeader from './SectionHeader';
interface MyRankProps {
  rankMonth: RankData[];
}

const MyRank = ({ rankMonth }: MyRankProps) => {
  const tokendata = localStorage.getItem('userToken');
  const [myRank, setMyRank] = useState<number>(0);

  const medal = ['goldmedal', 'silvermedal', 'bronzemedal'];

  useEffect(() => {
    if (tokendata) {
      const myname = JSON.parse(tokendata).subject;
      const findObj = rankMonth.findIndex((obj) => obj.id === myname);
      setMyRank(findObj + 1);
    }
  }, [tokendata, rankMonth]);

  const myRankPercent = Math.round((myRank / rankMonth.length) * 100);
  return (
    <div>
      <SectionHeader title="나의 순위" />
      {myRank > 3 || myRank < 1 ? (
        <div className="bg-zinc-200 rounded-2xl flex flex-col mt-[16px]">
          <span className="font-Jeju text-center pt-[10px] text-[18px] font-semibold">
            {myRank} 위
          </span>
          <span className="my-[10px] text-center text-opacity-750">
            상위 {myRankPercent}%
          </span>
        </div>
      ) : (
        <div className="bg-zinc-200 rounded-2xl flex flex-col mt-[16px]">
          <img
            className="m-2 mx-auto"
            width={56}
            src={`/img/rank/${medal[myRank - 1]}.svg`}
            alt={`${medal[myRank - 1]}`}
          />
        </div>
      )}
    </div>
  );
};

export default MyRank;
