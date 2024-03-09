export const SettingsComponent = () => {
  return (
    <div className="w-full h-[100%] p-2">
      <div className="w-full h-[50px] p-1 shadow-md overflow-y-auto flex gap-2">
        <span
          className="p-2 flex items-center cursor-pointer rounded bg-blue-200
         hover:bg-gradient-to-r from-indigo-500 hover:scale-75"
        >
          access_level
        </span>

        <span
          className="p-2 flex items-center cursor-pointer rounded bg-blue-200
         hover:bg-gradient-to-r from-indigo-500 hover:scale-75"
        >
          users_verifications
        </span>

        <span
          className="p-2 flex items-center cursor-pointer rounded bg-blue-200
         hover:bg-gradient-to-r from-indigo-500 hover:scale-75"
        >
          add_members
        </span>

        <span
          className="p-2 flex items-center cursor-pointer rounded bg-blue-200
         hover:bg-gradient-to-r from-indigo-500 hover:scale-75"
        >
          Manage_About
        </span>

        <span
          className="p-2 flex items-center cursor-pointer rounded bg-blue-200
         hover:bg-gradient-to-r from-indigo-500 hover:scale-75"
        >
          Manage_Gallery
        </span>
      </div>
    </div>
  );
};
