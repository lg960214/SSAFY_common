import { RankData } from '@/types/user.type';

interface DetailRankProps {
  list: RankData;
  rankMonth: RankData[];
}

const DetailRank = ({ list, rankMonth }: DetailRankProps) => {
  const medal = ['goldmedal', 'silvermedal', 'bronzemedal'];
  const rank = rankMonth.indexOf(list);
  return (
    <>
      <div className="my-[16px] flex flex-col items-center mx-3">
        <img src={`/img/rank/${medal[rank]}.svg`} alt="medal" width={56} />
        <div>
          <div className="text-center font-Jeju mt-[5px]">{list.id}</div>
          <div className="text-center font-bold font-Jeju">
            {Math.round(list.second / 60)} 분
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailRank;
