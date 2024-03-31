import { Inputs } from "../reusables/formcomponent/Inputs";
import Button from "../reusables/formcomponent/Button";
import { CloseDiagComp } from "../reusables/CloseDiagComp";
import { useState } from "react";
import axios from "axios";

interface Props{
    onClick?:()=>void
    onForgotpass?:()=>void
    emitme?:(success:boolean, error:boolean, messaage:string)=>void;
}

export const LoginForm = (props:Props) => {
const { onClick, onForgotpass, emitme } = props;
const [username, setUsername] = useState<string>("");
const [password, setPassword] = useState<string>("");
const [_rememberMe, _setRememberMe] = useState<number>(0);
const [isLoading, setIsLoading] = useState<boolean>(false);

const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const value = e.currentTarget.value
    const id = e.currentTarget.id
    if (id === "username") {
      setUsername(value);
    }else if (id === "password") {
      setPassword(value)
    }
};

//handle login routes
const handleLogin = async()=>{
  try{
    setIsLoading(true)

    let response = await axios.post(import.meta.env.VITE_LOGIN_ENDPOINT, {
      username: username,
      password: password,
      rememberMe: 0
    });

    if(response && response?.data?.code === 200){
        clear();
        emitme && emitme(response?.data?.status, false, response?.data?.message); 
        localStorage.setItem("token", response?.data?.token);
    }

  }catch(err:any){
    if ((err.response && err.response?.status === 400)) {
      emitme && emitme(false, true, err.response?.data?.message);
    }else if (err.message === "Request failed with status code 401") {
      emitme && emitme(false, true, err.response?.data?.message);
    }
  }finally{
    setIsLoading(false);
  }
}

const clear = () => {
 setUsername("");
 setPassword("");
 _setRememberMe(0)
};

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
          value={username}
          onChange={handleChange}
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
          value={password}
          onChange={handleChange}
        />
      </div>

      <div>{/*remember me here */}</div>

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
          disabled={
            username==""||
            password==""
          }
          loading={isLoading}
          onClick={handleLogin}
        />
      </div>
    </div>
  );
};
