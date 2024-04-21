import React, { useEffect, useState } from 'react'
import { Inputs } from '../reusables/formcomponent/Inputs'
import Button from '../reusables/formcomponent/Button';

interface Props{
    handleSubmission?:()=>void;
    isLoading?:boolean;
    emitpassowrd?:(password:string)=>void;
}

export const PasswordResetForm = (props:Props) => {
  const { isLoading, handleSubmission, emitpassowrd } = props;  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepPassword, setShowRepPassword] = useState<boolean>(false);
  const handleshowpassword = () => {
    setShowPassword(!showPassword);
  };

  const handleshowrepPassword = () => {
    setShowRepPassword(!showRepPassword);
  };

  //handlechange for passwords
  const [newpassword, setPassword] = useState<string>("");
  const [reppassword, setReppassword] = useState<string>("");
  const [identical, setIdentical] = useState<boolean>(false);

  //password validation
  const [caps, setCaps] = useState<boolean>(false);
  const [symbol, setSymbol] = useState<boolean>(false);
  const [len, setLen] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const id = e.currentTarget.id;

    if (id === "newpass") {
      setPassword(value);
    } else if (id === "repeatpass") {
      setReppassword(value);
      emitpassowrd && emitpassowrd(value);
    }

    const hasCaps = /[A-Z]/.test(value);
    setCaps(hasCaps);

    // Check for symbol
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
    setSymbol(hasSymbol);

    // Check for password length >= 10
    const hasValidLength = value.length >= 10;
    setLen(hasValidLength);
  };


  useEffect(() => {
    if (newpassword && reppassword) {
      // Check if the passwords are identical
      const passwordsIdentical = newpassword === reppassword;
      setIdentical(passwordsIdentical);
    } else {
      // Reset the identical state if either password is empty
      setIdentical(false);
    }
  }, [newpassword, reppassword]);

  return (
    <div className="w-full bg-white p-2">
      <div>
        <Inputs
          type={!showPassword ? "password" : "text"}
          style="w-full 
           border-2
           border-cyan-300
           h-8 rounded-xl
           text-gray-500 
           outline-cyan-300
           p-4
           placeholder:text-sm
           text-center
          "
          labelStyle={identical ? "text-green-500" : ""}
          id="newpass"
          labelOne="New Password:"
          addpasswordVisibility
          iconUserPass={true}
          showPaswword={showPassword}
          placeholder="Enter your password..."
          value={newpassword}
          onChange={handleChange}
          onShowpass={handleshowpassword}
        />
      </div>

      <div className="mt-3">
        <Inputs
          type={!showRepPassword ? "password" : "text"}
          style="w-full 
           border-2
           border-cyan-300
           h-8 rounded-xl
           text-gray-500 
           outline-cyan-300
           p-4
           placeholder:text-sm
           text-center
          "
          labelStyle={identical ? "text-green-500" : ""}
          id="repeatpass"
          labelOne="Repeat Password:"
          addpasswordVisibility
          iconUserPass={true}
          showPaswword={showRepPassword}
          placeholder="Enter your password..."
          value={reppassword}
          onChange={handleChange}
          onShowpass={handleshowrepPassword}
        />
      </div>

      <div
        className="w-full"
        style={{ display: caps || symbol || len ? "block" : "none" }}
      >
        <p
          className="tex-sm"
          style={{
            color: caps ? "green" : "red",
          }}
        >
          Uppercase
        </p>
        <p
          className="tex-sm"
          style={{
            color: symbol ? "green" : "red",
          }}
        >
          Symbols
        </p>
        <p
          className="tex-sm"
          style={{
            color: len ? "green" : "red",
          }}
        >
          length
        </p>
      </div>

      <div className="mt-3">
        <Button
          buttonLabel="Signin"
          className="border w-full p-2 
          rounded-xl text-white bg-cyan-400"
          disabled={!identical || !caps || !symbol || !len}
          loading={isLoading}
          onClick={handleSubmission}
        />
      </div>
    </div>
  );
}
