// import './FormDemo.css'
// import React from 'react'
// import {useForm} from 'react-hook-form'


// function FormDemo() {

//     let {register,handleSubmit}=useForm()
//     function onSubmitForm(userObj){
//         console.log(userObj)
//     }
//   return (
//     <div>
//         <p className="display-1 text-info">Form demo</p>
//         {/* //user signup form */}
//         <form className='w-50 mx-auto mt-5' onSubmit={handleSubmit(onSubmitForm)}>
//         {/* // username */}
//         <div classname="mb-3">
//             <label htmlFor="username" className="form-label">Username</label>
//             <input type="text"  id="username" className="form-control"{...register('username')}/>
//         </div>
//         {/* //email */}
//         <div classname="mb-3">
//             <label htmlFor="email" className="form-label">Email</label>
//             <input type="text"  id="email" className="form-control" {...register('email')}/>
//         </div>
//         <button type="submit"  className="btn btn-success">Signup</button>
//         </form>
//     </div>
//   )
// }
// export default FormDemo;


import "./FormDemo.css";

import { useForm } from "react-hook-form";

function FormDemo() {
  let { register, handleSubmit } = useForm();

  function onFormSubmit(userObj) {
    console.log(userObj);
  }

  return (
    <div>
      <p className="display-1 text-info text-center">Form Demo</p>
      {/* user signup form */}
      <form className="w-50 mx-auto mt-5" onSubmit={handleSubmit(onFormSubmit)}>
        {/* username */}
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            {...register("username")}
          />
        </div>
        {/* email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            {...register("email")}
          />
        </div>
        {/* submit button */}
        <button type="submit" className="btn btn-success">
          Signup
        </button>
      </form>
    </div>
  );
}

export default FormDemo;