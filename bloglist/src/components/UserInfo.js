const UserInfo = ({ user, logout }) => {
  return (
    <div>
      Logged in as {user.username}
      {" ("}
      {user.name}
      {") "}
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default UserInfo;
