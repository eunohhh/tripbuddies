const EditProfileSkeleton = () => {
  return (
    <div className="flex min-h-screen animate-pulse flex-col items-center p-4">
      <div className="w-full max-w-lg rounded-lg p-6">
        <div className="mt-6 flex flex-col items-center">
          <div className="relative">
            {/* 프로필 이미지 스켈레톤 */}
            <div className="h-[100px] w-[100px] rounded-full bg-gray-300"></div>

            {/* 프로필 사진 변경 버튼 스켈레톤 */}
            <div className="absolute right-0 bottom-0 rounded-full border-4 border-white bg-gray-200 p-2">
              <svg
                className="h-4 w-4 text-gray-400 xl:h-6 xl:w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Edit Profile</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
            </div>
          </div>
          <div className="mt-2 h-6 w-24 rounded bg-gray-200"></div>
          <div className="mt-2 h-6 w-48 rounded bg-gray-200"></div>
        </div>
        <div className="mt-6">
          <table className="w-full">
            <tbody>
              {Array.from({ length: 6 }).map((_, index) => (
                <tr key={index} className="flex justify-between py-2">
                  <td className="h-6 w-1/2 rounded bg-gray-200"></td>
                  <td className="h-6 w-1/2 rounded bg-gray-200"></td>
                </tr>
              ))}
              {Array.from({ length: 3 }).map((_, index) => (
                <tr key={index} className="flex justify-between py-2">
                  <td className="h-6 w-1/2 rounded bg-gray-200"></td>
                  <td className="h-6 w-1/2 rounded bg-gray-200"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EditProfileSkeleton;
