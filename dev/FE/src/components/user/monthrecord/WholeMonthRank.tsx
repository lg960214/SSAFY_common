import { RankData } from '@/types/user.type';
interface WholeMonthRankProps {
  rankMonth: RankData[];
}

const WholeMonthRank = ({ rankMonth }: WholeMonthRankProps) => {
  return (
    <div className="flex justify-evenly my-10">
      {rankMonth.length > 0 ? (
        rankMonth.slice(0, Math.min(3, rankMonth.length)).map((list) => (
          <div key={list.id}>
            <div>{list.id} 님</div>
            <div>{Math.round(list.second / 60)} 분</div>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default WholeMonthRank;
