type AuthSubTextProps = {
  text: string;
};

const AuthSubText = ({ text }: AuthSubTextProps) => {
  return (
    <p className="w-[95%] pl-2 text-gray-500 text-sm leading-none">{text}</p>
  );
};

export default AuthSubText;
