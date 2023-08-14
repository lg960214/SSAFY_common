import { changeUserGym, deleteDevice } from '@/api/memberPageApi';
import { MemberInfo } from '@/types/member.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const MemberInfomation = (item: MemberInfo) => {
  const infoTitle = [
    { title: '이름', content: item.name },
    { title: '전화번호', content: item.phoneNumber },
    { title: '아이디', content: item.id },
    { title: '회원번호', content: item.userId },
    { title: '이메일', content: item.email },
    { title: '성별', content: item.sex },
  ];
  const queryClient = useQueryClient();
  const deleteDeviceMutation = useMutation(
    () => deleteDevice(item.id, item.deviceCode),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['memberLists']);
      },
    },
  );
  const deleteUserMutation = useMutation((id: string) => changeUserGym(id), {
    onSuccess: () => {
      deleteDeviceMutation.mutate();
    },
  });
  return (
    <div className="text-black pt-2 px-6 w-[400px] h-[440px] bg-CustomBg cursor-default rounded-2xl">
      <div className="w-50 h-16 border-b-2 border-black text-xl font-bold flex justify-center items-center">
        <span className="">회원 상세 정보</span>
      </div>
      <div className="border-white border-b-2 h-0"></div>
      {infoTitle.map((item, idx) => {
        return (
          <div
            key={idx}
            className="w-[320px] h-12 mx-auto flex justify-center items-center border-b-[1px] border-CustomNavy/10 text-center"
          >
            <div className="basis-1/3">{item.title}</div>
            <div className="basis-2/3">{item.content}</div>
          </div>
        );
      })}
      <div className="mt-2">
        <button
          onClick={() => deleteUserMutation.mutate(item.id)}
          className="bg-CustomNavy float-right text-white w-24 h-12 text-center p-0 hover:text-CustomOrange transition-colors duration-150"
        >
          회원 해제
        </button>
      </div>
    </div>
  );
};
