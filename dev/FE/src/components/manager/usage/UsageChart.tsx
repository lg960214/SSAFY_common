import { ResponsiveBar } from '@nivo/bar';
import './usagechart.css';
const UsagePage = () => {
  const handle = {
    barClick: (data: any) => {
      console.log(data);
    },

    legendClick: (data: any) => {
      console.log(data);
    },
  };

  return (
    // chart height이 100%이기 때문이 chart를 덮는 마크업 요소에 height 설정
    <div className="chartbox">
      <ResponsiveBar
        /**
         * chart에 사용될 데이터
         */
        data={[
          { equipment: '벤치프레스1', 이용량: 1200 },
          { equipment: '벤치프레스2', 이용량: 2200 },
          { equipment: '벤치프레스3', 이용량: 3200 },
          { equipment: '벤치프레스4', 이용량: 2200 },
          { equipment: '벤치프레스5', 이용량: 1200 },
          { equipment: '벤치프레스6', 이용량: 2200 },
          { equipment: '벤치프레스7', 이용량: 1200 },
          { equipment: '벤치프레스8', 이용량: 3200 },
          { equipment: '벤치프레스9', 이용량: 1200 },
          { equipment: '벤치프레스10', 이용량: 2200 },
          { equipment: '벤치프레스11', 이용량: 1200 },
          { equipment: '벤치프레스12', 이용량: 3200 },
          { equipment: '벤치프레스13', 이용량: 3200 },
          { equipment: '벤치프레스14', 이용량: 3200 },
          { equipment: '벤치프레스15', 이용량: 3200 },
        ]}
        /**
         * chart에 보여질 데이터 key (측정되는 값)
         */
        keys={['이용량']}
        /**
         * keys들을 그룹화하는 index key (분류하는 값)
         */
        indexBy="equipment"
        /**
         * chart margin
         */
        margin={{ top: 50, right: 20, bottom: 100, left: 50 }}
        /**
         * chart padding (bar간 간격)
         */
        padding={0.3}
        /**
         * chart 색상
         */
        colors={['olive', 'brown', 'orange']} // 커스터하여 사용할 때
        // colors={{ scheme: 'nivo' }} // nivo에서 제공해주는 색상 조합 사용할 때
        /**
         * color 적용 방식
         */
        colorBy="indexValue" // 색상을 keys 요소들에 각각 적용
        // colorBy="indexValue" // indexBy로 묵인 인덱스별로 각각 적용
        theme={{
          /**
           * label style (bar에 표현되는 글씨)
           */
          labels: {
            text: {
              fontSize: 14,
              fill: '#000000',
            },
          },
          /**
           * legend style (default로 우측 하단에 있는 색상별 key 표시)
           */
          legends: {
            text: {
              fontSize: 22,
              fill: '#000000',
            },
          },
          axis: {
            /**
             * axis legend style (bottom, left에 있는 글씨)
             */
            legend: {
              text: {
                fontSize: 20,
                fill: '#000000',
              },
            },
            /**
             * axis ticks style (bottom, left에 있는 값)
             */
            ticks: {
              text: {
                fontSize: 16,
                fill: '#000000',
              },
            },
          },
        }}
        /**
         * axis bottom 설정
         */
        axisBottom={{
          tickSize: 5, // 값 설명하기 위해 튀어나오는 점 크기
          tickPadding: 15, // tick padding
          tickRotation: -45, // tick 기울기
          legendPosition: 'top', // 글씨 위치
          legendOffset: 40, // 글씨와 chart간 간격
        }}
        /**
         * axis left 설정
         */
        axisLeft={{
          tickSize: 5, // 값 설명하기 위해 튀어나오는 점 크기
          tickPadding: 5, // tick padding
          tickRotation: 0, // tick 기울기
          legendPosition: 'middle', // 글씨 위치
          legendOffset: -60, // 글씨와 chart간 간격
        }}
        /**
         * label 안보이게 할 기준 width
         */
        labelSkipWidth={36}
        /**
         * label 안보이게 할 기준 height
         */
        labelSkipHeight={12}
        /**
         * bar 클릭 이벤트
         */
        onClick={handle.barClick}
        /**
         * legend 설정 (default로 우측 하단에 있는 색상별 key 표시)
         */
        legends={[]}
      />
    </div>
  );
};

export default UsagePage;
