import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { matchDevice, deviceLists } from '@/api/memberPageApi';
import { Device } from '@/types/member.type';

interface TagListsProps {
  id: string;
  onClose: () => void;
}

const TagLists = ({ id, onClose }: TagListsProps) => {
  const { data, status } = useQuery<Device[]>(['deviceLists'], deviceLists);

  const itemsPerPage = 28; // 페이지당 표시할 항목의 개수
  const [currentPage, setCurrentPage] = useState(1);
  // 현재 페이지에 해당하는 데이터를 계산하는 함수
  const getCurrentPageData = () => {
    if (data) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return data.slice(startIndex, endIndex);
    }
    return [];
  };

  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderedData = getCurrentPageData();
  return (
    <div className="text-black bg-white w-[440px] h-[640px] p-4 rounded-2xl">
      <div className="h-12 flex justify-center items-center text-xl font-bold border-b-2 border-black">
        <p>태그 목록</p>
      </div>
      <div className="flex flex-wrap justify-around">
        {renderedData.map((item, idx) => {
          return (
            <TagButton
              key={idx}
              onClose={onClose}
              id={id}
              deviceCode={item.deviceCode}
            />
          );
        })}
      </div>
      <div className="flex justify-center text-xl">
        {Array.from(
          { length: Math.ceil((data?.length || 0) / itemsPerPage) },
          (_, index) => (
            <button
              className="mx-2"
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ),
        )}
      </div>
    </div>
  );
};

interface TagButtonProps {
  deviceCode: string;
  id: string;
  onClose: () => void;
}

const TagButton = ({ id, deviceCode, onClose }: TagButtonProps) => {
  const queryClient = useQueryClient();
  const matchDeviceMutation = useMutation(() => matchDevice(id, deviceCode), {
    onSuccess: () => {
      queryClient.invalidateQueries(['memberLists']);
      onClose();
      console.log('성공');
    },
    onError: () => {
      console.log('실패');
    },
  });
  const handleMatchDevice = () => {
    matchDeviceMutation.mutate();
  };
  return (
    <div
      onClick={handleMatchDevice}
      className="w-[88px] h-[56px] my-2 flex justify-center items-center bg-[#DFDCDE] text-lg rounded-2xl"
    >
      <span>{deviceCode}</span>
    </div>
  );
};

export default TagLists;
