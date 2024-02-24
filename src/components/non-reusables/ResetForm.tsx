import Button from "../reusables/formcomponent/Button";
import { Inputs } from "../reusables/formcomponent/Inputs";
import { CloseDiagComp } from "../reusables/CloseDiagComp";

interface Props {
  onClickclose?: () => void;
  onClickcancel?: ()=> void;
}

export const ResetForm = (props:Props) => {
  const { onClickclose, onClickcancel } = props;  
  return (
    <div className="max-sm:w-[90%] md:w-[70%] xl:w-[30%]  rounded">
      <div className="mb-8 flex justify-end">
        <CloseDiagComp onClick={onClickclose} />
      </div>

      <div className="w-full px-2 py-5 bg-white rounded">
        <Inputs
          type="email"
          style="w-full 
           border-2
           border-cyan-300
           h-8 rounded-xl
           text-gray-500 
           outline-cyan-300
           p-6
           placeholder:text-sm
          "
          id={"email"}
          labelOne="Email:"
          placeholder="Enter your email..."
        />

        <div className="flex justify-end gap-1">
          <Button
            buttonLabel="Cancel"
            className="border w-[20%] p-2 my-4
            rounded-xl text-white bg-red-400"
            onClick={onClickcancel}
          />

          <Button
            buttonLabel="Submit"
            className="border w-[20%] p-2 my-4
             rounded-xl text-white bg-cyan-400"
          />
        </div>
      </div>
    </div>
  );
};
