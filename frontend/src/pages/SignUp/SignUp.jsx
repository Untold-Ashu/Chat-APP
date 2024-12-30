import { Link } from "react-router-dom";
import GenderCheckBox from "./GenderCheckBox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
  const[inputs,setInputs]=useState({
    fullname:'',
    username:'',
    password:'',
    confirmPassword:'',
    gender:'',
  });
  const [loading,signup]=useSignup();

  const handleCheckboxChange = (gender) => {
		setInputs({ ...inputs, gender });
	};
  const handleSubmit=async(e)=>{ 
    e.preventDefault();
    await signup(inputs);
    console.log(inputs);
  }
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto' >
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <h1 className='text-3xl font-semibold text-center text-gray-300'>
					SignUp
					<span className='text-blue-500'> QuickChat</span>
				</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Full Name</span>
            </label>
            <input type='text' placeholder='John Doe' className='w-full input input-bordered h-10' 
            value={inputs.fullname}
            onChange={(e)=>setInputs({...inputs,fullname:e.target.value})}
            />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Username</span>
            </label>
            <input type='text' placeholder="johndoe"className='w-full input input-bordered h-10'
            value={inputs.username}
            onChange={(e)=>setInputs({...inputs,username:e.target.value})}
            ></input>
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Password</span>
            </label>
            <input type='password' placeholder="Password"className='w-full input input-bordered h-10'
            value={inputs.password}
            onChange={(e)=>setInputs({...inputs,password:e.target.value})}
            ></input>
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Confirm Password</span>
            </label>
            <input type='password' placeholder="Password"className='w-full input input-bordered h-10'
            value={inputs.confirmPassword}
            onChange={(e)=>setInputs({...inputs,confirmPassword:e.target.value})}
            ></input>
          </div>

          <GenderCheckBox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}/>

          <Link to={'/login'} className='text-sm  hover:underline hover:text-orange-600 mt-2 inline-block text-white'>
            {"Already"} have an account ?
          </Link>
          <div>
            <button className='btn btn-block btn-sm mt-2  hover:bg-blue-600 hover:text-white hover:border-none margin-top-20'>SignUp</button>
          </div>
         
        </form>
      </div>

    </div>
  )
}

export default SignUp;