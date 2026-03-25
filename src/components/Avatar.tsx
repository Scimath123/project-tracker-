type Props = {
  name: string;
  color: string;
};

const Avatar = ({ name, color }: Props) => {
  return (
    <div
      className={`w-6 h-6 flex items-center justify-center text-white text-xs rounded-full ${color}`}
    >
      {name[0]}
    </div>
  );
};

export default Avatar;