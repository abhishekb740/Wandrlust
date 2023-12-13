const Signup = () => {
  return (
    <div>
      <section className=" bg-gray-50 bg-cover">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-bold text-[#eb2168] pt-96 "
          >
            WandrLust
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign Up to WandrLust
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="name"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-[#E02168] focus:border-[#E02168] block w-full p-2.5 dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#E02168] dark:focus:border-[#E02168]"
                    placeholder="Your official name"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-#E02168 text-gray-900 sm:text-sm rounded-lg focus:ring-[#E02168] focus:border-[#E02168] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#E02168] dark:focus:border-[#E02168]"
                    placeholder="example123@gmail.com"
                    required=""
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phonenumber
                  </label>
                  <input
                    type="phone"
                    name="phone"
                    id="phone"
                    className="bg-gray-50 border border-#E02168 text-gray-900 sm:text-sm rounded-lg focus:ring-[#E02168] focus:border-[#E02168] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#E02168] dark:focus:border-[#E02168]"
                    placeholder="10-digit contact number"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="username"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-#E02168 text-gray-900 sm:text-sm rounded-lg focus:ring-[#E02168] focus:border-[#E02168] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#E02168] dark:focus:border-[#E02168]"
                    placeholder="Your username"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-#E02168 text-gray-900 sm:text-sm rounded-lg focus:ring-[#E02168] focus:border-[#E02168] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#E02168] dark:focus:border-[#E02168]"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="age"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Age
                  </label>
                  <input
                    type="age"
                    name="age"
                    id="age"
                    className="bg-gray-50 border border-#E02168 text-gray-900 sm:text-sm rounded-lg focus:ring-[#E02168] focus:border-[#E02168] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#E02168] dark:focus:border-[#E02168]"
                    placeholder="Your age"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Gender
                  </label>
                  <select
                    name="gender"
                    id="gender"
                    className="bg-gray-50 border border-gray-300 text-gray-400 sm:text-sm rounded-lg focus:ring-[#E02168] focus:border-[#E02168] block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                    required=""
                  >
                    <option value="" disabled selected>
                      Select your gender
                    </option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Rather not say</option>
                  </select>
                </div>

                
                <button
                  type="submit"
                  className="w-full text-white bg-[#eb2168] hover:bg-[#E02168] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign Up
                </button>
                <p className="text-sm font-light text-[#eb2168] dark:text-gray-400">
                  Already have an account!{" "}
                  <a
                    href="#"
                    className="font-medium text-black hover:underline dark:text-primary-500"
                  >
                    Sign in
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
