import React from "react";

const Signup = () => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user_input_name = e.target[0].value;
    const user_input_email = e.target[1].value;
    const user_input_pass = e.target[2].value;
    console.log(user_input_name, user_input_email, user_input_pass);
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <form
        onSubmit={onSubmit}
        className="flex flex-col p-4 w-52 bg-[#DC5F00] gap-4 rounded-md"
      >
        <h1 className="flex w-full justify-center text-lg">Sign up</h1>
        <input
          type="text"
          placeholder="name"
          name="name"
          className="bg-white rounded-md h-10 p-2 text-black"
        />
        <input
          placeholder="email"
          type="email"
          name="email"
          className="bg-white rounded-md h-10 p-2 text-black"
        />
        <input
          type="password"
          placeholder="Password"
          name="pass"
          className="bg-white rounded-md h-10 p-2 text-black"
        />
        <input
          type="submit"
          value="Create account"
          className="bg-[#DC5F00] text-[#4F4A45] p-2 rounded-sm"
        />
      </form>
    </div>
  );
};

export default Signup;
