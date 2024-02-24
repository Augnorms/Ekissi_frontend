import { Inputs } from "../reusables/formcomponent/Inputs";
import Button from "../reusables/formcomponent/Button";
import { CloseDiagComp } from "../reusables/CloseDiagComp";

interface Props{
    onClick?:()=>void
    onForgotpass?:()=>void
}

export const LoginForm = (props:Props) => {
const { onClick, onForgotpass } = props;

  return (
    <div className="max-sm:w-[90%] md:w-[70%] xl:w-[30%] bg-white p-4 rounded">
      <CloseDiagComp styles="flex justify-end" onClick={onClick} />

      <div className="w-full p-1 text-center">
        <p className="font-semibold text-xl">Login Form</p>
      </div>

      <div className="w-full flex mb-3">
        <Inputs
          type="text"
          style="w-full 
           border-2
           border-cyan-300
           h-8 rounded-xl
           text-gray-500 
           outline-cyan-300
           p-5
           placeholder:text-sm
          "
          id={"username"}
          useIcons
          iconUser
          labelOne="Username:"
          placeholder="Enter your username..."
        />
      </div>

      <div className="w-full flex mb-3">
        <Inputs
          type="password"
          style="w-full 
           border-2
           border-cyan-300
           h-8 rounded-xl
           text-gray-500 
           outline-cyan-300
           p-5
           placeholder:text-sm
          "
          id={"password"}
          useIcons
          iconUser
          labelOne="Password:"
          addpasswordVisibility
          showPaswword={false}
          placeholder="Enter your password..."
        />
      </div>

      <div className="w-full p-2">
        <p
          className="cursor-pointer underline italic text-orange-400"
          onClick={onForgotpass}
        >
          forgot password ?
        </p>
      </div>

      <div className="py-4">
        <Button
          buttonLabel="Signin"
          className="border w-full p-2 
          rounded-xl text-white bg-cyan-400"
        />
      </div>
    </div>
  );
};
