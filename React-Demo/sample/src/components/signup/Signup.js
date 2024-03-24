import { useForm } from "react-hook-form";


function Signup() {
  let { register, handleSubmit } = useForm();

  function onFormSubmit(userObj) {
    console.log(userObj);
  }

  return (
    <div>
      <p className="display-1 text-info text-center">Signup here</p>
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

export default Signup;