import { getToken } from '@/utils/storage';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { EquipList } from '@/components/manager/waitlist/WaitListDetail';
const waitListApi = (
  setWaitEquipList: React.Dispatch<React.SetStateAction<EquipList[]>>,
) => {
  const url = `http://i9a104.p.ssafy.io:8081/tags/sse`;

  const eventSource = new EventSourcePolyfill(url, {
    headers: {
      Authorization: `bearer ${getToken('managerToken')}`,
    },
    heartbeatTimeout: 600000,
  });

  eventSource.onopen = () => {
    // 연결 시 할 일
    console.log('connect success');
  };

  eventSource.onmessage = async (e) => {
    const res = await e.data;
    const parsedData = JSON.parse(res);
    console.log(parsedData);
    setWaitEquipList(parsedData);
    // 받아오는 data로 할 일
  };

  eventSource.onerror = (e: any) => {
    // 종료 또는 에러 발생 시 할 일
    eventSource.close();

    if (e.error) {
      console.log('error 발생');
      alert('에러 발생하여 접속이 끊겼습니다. 다시 연결해주세요!');
      // 에러 발생 시 할 일
    }

    if (e.target.readyState === EventSource.CLOSED) {
      // 종료 시 할 일
    }
  };
};

export default waitListApi;
