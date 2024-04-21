import { useEffect, useRef, useState } from 'react'
import { Inputs } from '../reusables/formcomponent/Inputs';
import { ButtonSpinner } from '../reusables/Spinner';

interface Props {
  emitValue?: (params: string) => void;
  emitbooleanvalue?: (params: boolean) => void;
  clearOtp?: boolean;
  isLoading?:boolean;
}

export const VerifyInputForm = (props:Props) => {
  let { emitValue, clearOtp, emitbooleanvalue, isLoading } = props;  

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(5).fill(null));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {

    //reset the clearotp back to false
    emitbooleanvalue && emitbooleanvalue(false);

    const { value } = e.target;

    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;

      // Move focus to the next input field if current input is not empty
      if (value && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }

      return newOtp;
    });
  };

  useEffect(()=>{
    let transToString = otp.join('')

    if (transToString && transToString.length === 6) {
      emitValue && emitValue(transToString);
    }
  },[otp])

  useEffect(()=>{
    if(clearOtp===true){
        setOtp((prevOtp) => {
          const newOtp = [...prevOtp];
          newOtp.forEach((_, index) => {
            newOtp[index] = "";
          });
          return newOtp;
        });
    }
  },[clearOtp])
 
  return (
    <div className='flex gap-5 justify-center'>
        {
    otp.map((data, i)=>{
     return (
       <div className="relative" key={i}>
         <div className="flex" key={i}>
           <Inputs
             type="text"
             style="w-[75px] 
           border-2
           border-cyan-300
           h-8 rounded-xl
           text-gray-500 
           outline-cyan-300
           p-6
           placeholder:text-sm
           text-center
          "
             id={`verify-${i}`}
             placeholder=""
             value={data}
             onChange={(e) => handleChange(e, i)}
             maxlength={1}
             inputRef={(el: any) => (inputRefs.current[i] = el)}
           />
         </div>
         {isLoading && (
           <div className="w-full h-full flex justify-center items-center absolute top-0 bg-white z-20 rounded">
             <ButtonSpinner size="small" />
           </div>
         )}
       </div>
     );
    })
  }
    </div>
  )
}
