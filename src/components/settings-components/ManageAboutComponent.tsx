import Button from "../reusables/formcomponent/Button";
import { TextArea } from "../reusables/formcomponent/TextArea"

export const ManageAboutComponent = () => {
  return (
    <div className="p-10">
      <div className="w-full p-2 text-center font-bold underline text-xl">
        Manage about page
      </div>

      <div>
        <TextArea
          style="w-full h-[500px]
              border-2
              border-cyan-300
              rounded-xl
              text-gray-500 
              outline-cyan-300
              p-5
              placeholder:text-sm
              "
          placeholder="Enter family history here"
          id="history"
          label="Family history:"
        />
      </div>
      <div className="w-full flex justify-end mt-4 gap-1">
        <Button
          buttonLabel="create"
          className="border w-fit p-2 
                rounded text-white bg-cyan-400"
        />
        <Button
          buttonLabel="update"
          className="border w-fit p-2 
                rounded text-white bg-cyan-700"
        />
      </div>
    </div>
  );
}
