import { UsageData } from '@/types/usage.type';
import { getToken } from '@/utils/storage';
import apiClient from './apiClient';

export const getUsageData = async (
  date: string | null,
  setDailyUsageData: React.Dispatch<React.SetStateAction<UsageData[]>>,
) => {
  try {
    const token = getToken('managerToken');
    if (!token) return;
    const res = await apiClient.get('admin/day-info', {
      params: { date: date },
      headers: {
        Authorization: `Bearer ${token}`, // Token을 헤더에 추가
      },
    });
    const sortByName = (a: UsageData, b: UsageData) =>
      a.name.localeCompare(b.name);

    const sortedData = res.data.sort(sortByName);
    setDailyUsageData(sortedData);
    return res.data;
  } catch (err) {}
};
