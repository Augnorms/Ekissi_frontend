import TableComponent from "../reusables/TableComponent";

interface ResetToken {
  id: number;
  userId: number;
  code: string;
  expirationTime: string; 
  createdAt: string; 
}

interface Props{
 listallverification?:ResetToken[]
}

export const UserVerificationComponent = (props: Props) => {

  const { listallverification } = props;

  const header = [
    { key: "id", label: "Id" },
    { key: "userid", label: "Userid" },
    { key: "expirytime", label: "Expery time" },
    { key: "createdat", label: "Created at" },
    { key: "code", label: "Code" },
  ];

  const renderCellContent = (headerKey: string, item: Record<string, any>) => {
    switch (headerKey) {
      case "id":
        return <div className="whitespace-nowrap">{item.id}</div>;

      case "userid":
        return <div className="whitespace-nowrap">{item.userId}</div>;

      case "expirytime":
        return <div className="whitespace-nowrap">{item.expirationTime}</div>;

      case "createdat":
        return <div className="whitespace-nowrap">{item.createdAt}</div>;

      case "code":
        return <div className="whitespace-nowrap">{item.code}</div>;
    }
  };

  return (
    <div className="p-10">
      <div className="w-full p-2 text-center font-bold underline text-xl">
        Manage users verification table
      </div>
      <div className="w-full p-2 font-bold text-xl mb-4">
        verification count {` (${listallverification?.length})`}
      </div>
      <hr />
      <div className="mt-4">
        <TableComponent
          headers={header}
          items={listallverification || []}
          renderCellContent={renderCellContent}
        />
      </div>
    </div>
  );
};
