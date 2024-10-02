type AuthSubTextProps = {
  text: string;
};

const AuthSubText = ({ text }: AuthSubTextProps) => {
  return <p className="text-sm text-gray-500 leading-none w-[95%] pl-2">{text}</p>;
};

export default AuthSubText;
