import { RankData } from '@/types/user.type';
import DetailRank from './DetailRank';
import SectionHeader from './SectionHeader';
interface WholeMonthRankProps {
  rankMonth: RankData[];
}

const WholeMonthRank = ({ rankMonth }: WholeMonthRankProps) => {
  return (
    <div className="flex flex-col">
      <SectionHeader title={'이 달의 운동왕'} width="310px" />
      <div className="mx-[16px] flex justify-evenly bg-zinc-200 mt-[10px] rounded-[20px]">
        {rankMonth.length > 0
          ? rankMonth.slice(0, Math.min(3, rankMonth.length)).map((list) => (
              <div key={list.userId}>
                <DetailRank list={list} rankMonth={rankMonth} />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default WholeMonthRank;
