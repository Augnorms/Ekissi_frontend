import Button from "../reusables/formcomponent/Button";
import { Inputs } from "../reusables/formcomponent/Inputs";
import { CloseDiagComp } from "../reusables/CloseDiagComp";
import { VerifyInputForm } from "./VerifyInputForm";
import { PasswordResetForm } from "./PasswordResetForm";
import { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  onClickclose?: () => void;
  onClickcancel?: () => void;
  emitme?: (success: boolean, error: boolean, messaage: string) => void;
}

export const ResetForm = (props: Props) => {
  const { onClickclose, onClickcancel, emitme } = props;
  const [email, setEmail] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userid, setUserId] = useState<number>(0);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setEmail(value);
  };

  //handle email submission
  const handlesubmitEmail = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_ENDPOINT}/verifiemail`,
        {
          email: email,
        },
      );

      if (response && response.data?.code === 201) {
        setEmail("");
        emitme &&
          emitme(response?.data?.status, false, response?.data?.message);
        setState(response.data?.message);
      }
    } catch (err: any) {
      if (err.response) {
        emitme && emitme(false, true, err.response?.data?.message);
      } else if (err.message === "Request failed with status code 401") {
        emitme && emitme(false, true, err.response?.data?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  //handle information about the verification codes
  const [verifyCodes, setVerifyCodes] = useState<string>("");
  const [clearOtp, setClearOtp] = useState<boolean>(false);

  const handleEmitCode = (otpvalue: string) => {
    if (otpvalue) {
      setVerifyCodes(otpvalue);
    }
  };

  //reset the clearotp back to false when input fields are repopulated with data in the verifyinput component
  const emitbooleanvalue = (param: boolean) => {
    setClearOtp(param);
  };

  const handleCheckverificationCode = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_ENDPOINT}/checkverificationcodes`,
        {
          verification_code: verifyCodes,
        },
      );

      if (response && response?.data?.status === true) {
        emitme &&
          emitme(response?.data?.status, false, response?.data?.message);
        setState(response.data?.message);
        setUserId(response.data?.user);
    
        setClearOtp(true); //clear input field of the verification component
      }
    } catch (err: any) {
      if (err.response) {
        emitme && emitme(false, true, err.response?.data?.message);
      } else if (err.message === "Request failed with status code 401") {
        emitme && emitme(false, true, err.response?.data?.message);
      }
    } finally {
      setIsLoading(false);
      setClearOtp(false);
    }
  };

  useEffect(() => {
    let timer: any;

    if (verifyCodes) {
      timer = setTimeout(() => {
        handleCheckverificationCode();
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [verifyCodes]);

  //handle password update
  const [password, setPassword] = useState<string>("");

  //emit password value from password reset form component
  const emitpassowrd = (pass:string)=>{
    setPassword(pass);
  }

  const handleSubmission = async () => {
    try {
      setIsLoading(true);
      
      const response = await axios.put(
        `${import.meta.env.VITE_ENDPOINT}/resetpassword`,
        {
          user_id: userid,
          password: password,
        },
      );

      if(response){
        emitme &&
          emitme(response?.data?.status, false, response?.data?.message);
          setState("");
      }

    } catch (err: any) {
      if (err.response) {
        emitme && emitme(false, true, err.response?.data?.message);
      } else if (err.message === "Request failed with status code 401") {
        emitme && emitme(false, true, err.response?.data?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-sm:w-[90%] md:w-[70%] xl:w-[30%]  rounded">
      <div className="mb-8 flex justify-end">
        <CloseDiagComp onClick={onClickclose} />
      </div>

      {state === "Email sent successfully" ? (
        <VerifyInputForm
          emitValue={handleEmitCode}
          clearOtp={clearOtp}
          emitbooleanvalue={emitbooleanvalue}
          isLoading={isLoading}
        />
      ) : state === "Verification code is valid" ? (
        <PasswordResetForm
          handleSubmission={handleSubmission}
          emitpassowrd={emitpassowrd}
        />
      ) : (
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
            value={email}
            onChange={handleChangeEmail}
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
              onClick={handlesubmitEmail}
              loading={isLoading}
            />
          </div>
        </div>
      )}
    </div>
  );
};
