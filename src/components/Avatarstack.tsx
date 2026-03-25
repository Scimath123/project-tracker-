import Avatar from "./Avatar";

const AvatarStack = ({ users }: { users: any[] }) => {
  if (!users.length) return null;

  const visible = users.slice(0, 2);
  const extra = users.length - 2;

  return (
    <div className="flex items-center">
      {visible.map((user, i) => (
        <div key={user.id} className={`-ml-${i === 0 ? 0 : 2}`}>
          <Avatar name={user.name} color={user.color} />
        </div>
      ))}

      {extra > 0 && (
        <div className="w-6 h-6 flex items-center justify-center bg-gray-300 text-xs rounded-full ml-1">
          +{extra}
        </div>
      )}
    </div>
  );
};

export default AvatarStack;