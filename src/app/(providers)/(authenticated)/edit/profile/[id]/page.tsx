import EditProfilePage from '@/components/organisms/profile/EditProfilePage';
import { createClient } from '@/utils/supabase/server';

async function EditBuddyProfilePage() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error('유저 정보를 가져오는 데 실패했습니다.');
  }

  if (!user) {
    throw new Error('유저 정보를 가져오는 데 실패했습니다.');
  }

  const provider = user.app_metadata.provider;

  return <EditProfilePage provider={provider ? provider : null} />;
}

export default EditBuddyProfilePage;
