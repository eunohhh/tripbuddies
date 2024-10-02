const EditProfileSkeleton = () => {
  return (
    <div className="flex flex-col items-center p-4 min-h-screen animate-pulse">
      <div className="w-full max-w-lg rounded-lg p-6">
        <div className="flex flex-col items-center mt-6">
          <div className="relative">
            {/* 프로필 이미지 스켈레톤 */}
            <div className="rounded-full bg-gray-300 w-[100px] h-[100px]"></div>

            {/* 프로필 사진 변경 버튼 스켈레톤 */}
            <div className="absolute bottom-0 right-0 p-2 bg-gray-200 rounded-full border-4 border-white">
              <svg
                className="w-4 h-4 xl:w-6 xl:h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                ></path>
              </svg>
            </div>
          </div>
          <div className="mt-2 w-24 h-6 bg-gray-200 rounded"></div>
          <div className="mt-2 w-48 h-6 bg-gray-200 rounded"></div>
        </div>
        <div className="mt-6">
          <table className="w-full">
            <tbody>
              {Array.from({ length: 6 }).map((_, index) => (
                <tr key={index} className="flex justify-between py-2">
                  <td className="w-1/2 h-6 bg-gray-200 rounded"></td>
                  <td className="w-1/2 h-6 bg-gray-200 rounded"></td>
                </tr>
              ))}
              {Array.from({ length: 3 }).map((_, index) => (
                <tr key={index} className="flex justify-between py-2">
                  <td className="w-1/2 h-6 bg-gray-200 rounded"></td>
                  <td className="w-1/2 h-6 bg-gray-200 rounded"></td>
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
