import Dropdown from "../reusables/ActionComponent";
import TableComponent from "../reusables/TableComponent";

export const HeirarchyComponent = () => {
  const headers = [
    { key: "Date", label: "Date" },
    { key: "Type", label: "Type" },
    { key: "action", label: "Actions" },
  ];

  const employeeLoan: any = [
    { created_at: "12-12-20", loan_type: "health" },
    { created_at: "12-12-20", loan_type: "health" },
    { created_at: "12-12-20", loan_type: "health" },
    { created_at: "12-12-20", loan_type: "health" },
    { created_at: "12-12-20", loan_type: "health" },
    { created_at: "12-12-20", loan_type: "health" },
    { created_at: "12-12-20", loan_type: "health" },
    { created_at: "12-12-20", loan_type: "health" },
    { created_at: "12-12-20", loan_type: "health" },
    { created_at: "12-12-20", loan_type: "health" },
  ];

  const renderCellContent = (headerKey: string, item: Record<string, any>) => {
    switch (headerKey) {
      case "Date":
        return <div className="whitespace-nowrap">{item.created_at}</div>;
      case "Type":
        return <div className="whitespace-nowrap">{item.loan_type}</div>;

      case "action":
        function emitAction(_id: string | number, _label: string): void {
          throw new Error("Function not implemented.");
        }

        return (
          <div className="whitespace-nowrap">
            <img src="/public/images/flatEclipse.svg" alt="eclipse" />
            <Dropdown
              dropdownItems={[
                {
                  id: "1",
                  image: "/images/view.svg",
                  label: "View",
                  dataCy: "view",
                },
                {
                  id: "2",
                  image: "/images/editicon.svg",
                  label: "Edit",
                  dataCy: "edit",
                },
                {
                  id: "3",
                  image: "/images/delete.svg",
                  label: "Delete",
                  dataCy: "delete",
                },
              ]}
              emitAction={emitAction}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-[100%]">
      HeirarchyComponent
      <TableComponent
        headers={headers}
        items={employeeLoan}
        renderCellContent={renderCellContent}
      />
    </div>
  );
}
