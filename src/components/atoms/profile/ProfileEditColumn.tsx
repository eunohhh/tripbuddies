type ProfileEditColumnProps = {
  label: string;
  value: string;
};

function ProfileEditColumn({ label, value }: ProfileEditColumnProps) {
  return (
    <>
      <tr className="flex justify-between py-2">
        <td className="w-1/2 text-gray-600">{label}</td>
        <td className="w-4/5">{value}</td>
      </tr>
    </>
  );
}

export default ProfileEditColumn;
