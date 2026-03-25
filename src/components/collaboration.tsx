import Avatar from "./Avatar";

const CollaborationBar = ({ users }: { users: any[] }) => {
  return (
    <div className="flex items-center justify-between mb-3 px-2">
      <div className="text-sm text-gray-600">
        {users.length} people are viewing this board
      </div>

      <div className="flex items-center">
        {users.map((user, i) => (
          <div key={user.id} className={`-ml-${i === 0 ? 0 : 2}`}>
            <Avatar name={user.name} color={user.color} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollaborationBar;

