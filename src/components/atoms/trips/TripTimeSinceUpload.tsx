import { getTimeSinceUpload } from "@/utils/common/getTimeSinceUpload";

type TripTimeSinceUploadProps = {
  time: string;
};
const TripTimeSinceUpload = ({ time }: TripTimeSinceUploadProps) => {
  return (
    <div className="flex flex-row items-center justify-end">
      <span className="text-gray-500 text-sm leading-none">
        {`${getTimeSinceUpload(time)} 업로드`}
      </span>
    </div>
  );
};

export default TripTimeSinceUpload;
