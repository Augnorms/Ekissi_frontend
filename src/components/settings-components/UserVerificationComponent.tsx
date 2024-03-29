import TableComponent from "../reusables/TableComponent";

export const UserVerificationComponent = () => {
  const header = [
    { key: "id", label: "Id" },
    { key: "userid", label: "Userid" },
    { key: "expirytime", label: "Expery time" },
    { key: "createdat", label: "Created at" },
    { key: "action", label: "Action" },
  ];



  const renderCellContent = (headerKey: string, item: Record<string, any>) => {
    switch (headerKey) {
      case "id":
        return <div className="whitespace-nowrap">{item.id}</div>;

      case "userid":
        return <div className="whitespace-nowrap">{item.userid}</div>;

      case "expirytime":
        return <div className="whitespace-nowrap">{item.expirytime}</div>;

      case "createdat":
        return <div className="whitespace-nowrap">{item.createdat}</div>;

      case "action":
        function emitAction(_id: string | number, _label: string): void {}

        return (
          <img
            src="/images/flatEclipse.svg"
            alt="eclipse"
            className="cursor-pointer"
          />
        );
    }
  };

  return (
    <div className="p-10">
      <div className="w-full p-2 text-center font-bold underline text-xl">
        Manage users verification table
      </div>
      <div className="w-full p-2 font-bold text-xl mb-4">
        verification count {` (${3})`}
      </div>
      <hr />
      <div className="mt-4">
        <TableComponent
          headers={header}
          items={[]}
          renderCellContent={renderCellContent}
        />
      </div>
    </div>
  );
};
