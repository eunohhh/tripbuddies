'use client';

import { useAuth } from '@/hooks';
import { useRouter } from 'next/navigation';
import Settings from '../../../../public/svg/Settings.svg';

type MobileHeaderSettingsButtonProps = {
  uuid: string;
};

const MobileHeaderSettingsButton = ({ uuid }: MobileHeaderSettingsButtonProps) => {
  const { buddy } = useAuth();
  const router = useRouter();

  const isShow = uuid === buddy?.buddy_id;

  if (!isShow) return null;

  return (
    <Settings
      className="cursor-pointer"
      onClick={() => router.push('/onboarding?funnel=0&mode=first')}
    />
  );
};

export default MobileHeaderSettingsButton;
