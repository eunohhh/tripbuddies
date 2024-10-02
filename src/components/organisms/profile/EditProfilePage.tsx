'use client';

import LinkButton from '@/components/atoms/profile/edit/LinkButton';
import EditProfileSkeleton from '@/components/molecules/profile/EditProfileSkeleton';
import { QUERY_KEY_BUDDY } from '@/constants/query.constants';
import { useAuth } from '@/hooks';
import { useUpdateBuddyMutation } from '@/hooks/queries';
import { Buddy } from '@/types/Auth.types';
import { showAlert } from '@/utils/ui/openCustomAlert';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import OnBoardingProfileImage from '../onboarding/OnBoardingProfileImage';

function EditProfilePage({ provider }: { provider: string | null }) {
  const { buddy } = useAuth();
  const profileImageRef = useRef<HTMLInputElement>(null);
  const [selectedMedia, setSelectedMedia] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutate, isPending, error } = useUpdateBuddyMutation();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (selectedFile) {
      const file = selectedFile;
      setSelectedMedia(URL.createObjectURL(file));
    }
  }, [selectedFile]);

  async function handleSubmit() {
    if (selectedFile) {
      try {
        mutate({
          buddyInfo: buddy,
          imageFile: selectedFile,
        });
        showAlert('success', '프로필 사진이 변경되었습니다');
        // queryClient.invalidateQueries({
        //     queryKey: [QUERY_KEY_BUDDY, buddy.buddy_id],
        // });
      } catch (error) {
        showAlert('error', '프로필 사진 변경에 실패했습니다');
      }
      return;
    }
  }

  const handleDelete = async () => {
    showAlert('caution', '정말로 삭제하시겠습니까?', {
      onConfirm: async () => {
        try {
          const response = await fetch(
            `/api/buddyProfile/profilePicture?buddy_id=${buddy?.buddy_id}`,
            {
              method: 'DELETE',
            },
          );

          const data = await response.json();

          if (!response.ok) {
            throw new Error(
              data.error || '문제가 발생했습니다. 문제가 지속되면 관리자에게 문의해주세요.',
            );
          }

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_BUDDY, buddy?.buddy_id],
          });
          showAlert('success', data.message);
        } catch (err: any) {
          showAlert('error', err.message);
        }
      },
      isConfirm: true,
    });
  };

  if (!buddy) {
    return <EditProfileSkeleton />;
  }

  return (
    <div className="flex flex-col items-center p-4 min-h-screen">
      <div className="w-full max-w-lg rounded-lg p-6">
        <div className="flex flex-col items-center mt-6">
          <OnBoardingProfileImage
            buddy={buddy as Buddy}
            ref={profileImageRef}
            selectedMedia={selectedMedia}
            setSelectedFile={setSelectedFile}
            mode="edit"
          />
          <button className="mt-2" onClick={handleDelete}>
            프로필 사진 삭제
          </button>
          <button
            className="mt-2 bg-main-color text-white px-4 py-2 rounded-full"
            onClick={handleSubmit}
          >
            프로필 사진 변경
          </button>
        </div>
        <div className="mt-6">
          <div className="flex flex-col space-y-4">
            <div className="flex justify-between pb-2">
              <span className="text-gray-600 w-1/3 font-bold">이름</span>
              <span className="text-gray-800 w-2/3">
                {buddy.buddy_nickname && buddy.buddy_nickname.includes('user_')
                  ? '이름을 등록해주세요'
                  : buddy.buddy_nickname
                    ? buddy.buddy_nickname
                    : '이름을 등록해주세요'}
              </span>
              <LinkButton href="/onboarding?funnel=0&mode=edit" />
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-gray-600 w-1/3 font-bold">성별</span>
              <span className="text-gray-800 w-2/3">
                {buddy.buddy_sex ? buddy.buddy_sex : '성별을 등록해주세요'}
              </span>
              <LinkButton href="/onboarding?funnel=3&mode=edit" />
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-gray-600 w-1/3 font-bold">출생년도</span>
              <span className="text-gray-800 w-2/3">
                {buddy.buddy_birth
                  ? new Date(buddy.buddy_birth).toLocaleDateString('ko-KR')
                  : '출생년도를 등록해주세요'}
              </span>
              <LinkButton href="/onboarding?funnel=2&mode=edit" />
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-gray-600 w-1/3 font-bold">소개</span>
              <span className="text-gray-800 w-2/3 truncate">
                {buddy.buddy_introduction ? buddy.buddy_introduction : '소개글을 등록해주세요'}
              </span>
              <LinkButton href="/onboarding?funnel=9&mode=edit" />
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-gray-600 w-1/3 font-bold">MBTI</span>
              <span className="text-gray-800 w-2/3">
                {buddy.buddy_mbti ? buddy.buddy_mbti : 'MBTI를 등록해주세요'}
              </span>
              <LinkButton href="/onboarding?funnel=5&mode=edit" />
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-gray-600 w-1/3 font-bold">거주지</span>
              <span className="text-gray-800 w-2/3">
                {buddy.buddy_region ? buddy.buddy_region : '거주지를 등록해주세요'}
              </span>
              <LinkButton href="/onboarding?funnel=4&mode=edit" />
            </div>
          </div>

          <div className="flex justify-between py-2 cursor-pointer">
            <span className="w-1/2 text-gray-600 font-bold">선호 여정</span>
            <LinkButton href="/onboarding?funnel=8&mode=edit" />
          </div>
          <div className="pl-4 mb-4">
            {buddy.buddy_preferred_theme1 ||
            buddy.buddy_preferred_theme2 ||
            buddy.buddy_preferred_theme3 ? (
              <>
                <span className="w-full px-2 py-1 mb-2 mr-2 bg-main-color rounded-xl text-white">
                  {buddy.buddy_preferred_theme1 || ''}
                </span>
                <span className="w-full px-2 py-1 mb-2 mr-2 bg-main-color rounded-xl text-white">
                  {buddy.buddy_preferred_theme2 || ''}
                </span>
                <span className="w-full px-2 py-1 mb-2 mr-2 bg-main-color rounded-xl text-white">
                  {buddy.buddy_preferred_theme3 || ''}
                </span>
              </>
            ) : (
              <span className="text-gray-600">선호하는 여정을 등록해주세요</span>
            )}
          </div>

          <div className="flex justify-between py-2 cursor-pointer">
            <span className="w-1/2 text-gray-600 font-bold">버디즈 성향</span>
            <LinkButton href="/onboarding?funnel=7&mode=edit" />
          </div>
          <div className="pl-4 mb-4">
            {buddy.buddy_preferred_buddy1 ||
            buddy.buddy_preferred_buddy2 ||
            buddy.buddy_preferred_buddy3 ? (
              <>
                <span className="w-full px-2 py-1 mb-2 mr-2 bg-main-color rounded-xl text-white">
                  {buddy.buddy_preferred_buddy1 || ''}
                </span>
                <span className="w-full px-2 py-1 mb-2 mr-2 bg-main-color rounded-xl text-white">
                  {buddy.buddy_preferred_buddy2 || ''}
                </span>
                <span className="w-full px-2 py-1 mb-2 mr-2 bg-main-color rounded-xl text-white">
                  {buddy.buddy_preferred_buddy3 || ''}
                </span>
              </>
            ) : (
              <span className="text-gray-600">선호하는 버디즈를 등록해주세요</span>
            )}
          </div>

          {provider === 'email' && (
            <div className="flex justify-between py-2 cursor-pointer">
              <span className="w-1/2 text-gray-600 font-bold">비밀번호 변경</span>
              <LinkButton href="/recover" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;
