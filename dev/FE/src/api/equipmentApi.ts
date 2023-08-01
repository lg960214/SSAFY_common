import axios from 'axios';

const baseURL = 'http://I9A104.p.ssafy.io:8080/';

export const getReaders = async () => {
  try {
    const res = await axios.get(baseURL + 'readers', {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0ZXN0IiwiaWF0IjoxNjkwODYwMTg2LCJleHAiOjE2OTA5NDY1ODYsInN1YiI6InNzYWZ5MSJ9.6DVipd0vMIk70u_eAtqWi_LFJ5_OrFdf1agQoCvCbBA`, // Token을 헤더에 추가
      },
    });
    return res.data;
  } catch (err) {
    console.log('getReaders err: ', err);
  }
};
