import './App.css'
import { useState } from 'react'

import { generateToken, generateSuccinct, generateHash } from "./helper";
import { VerificationForm } from "./VerificationForm";
import { ThemeMode } from './ThemeMode';
import Box from "./Box"


function App() {

  const [ succinct, setSuccinct ] = useState<string>('');
  const [ token, setToken ] = useState<string>('');
  const [ hash, setHash ] = useState<string>('');
  const [ userId, setUserId ] = useState<string>('');


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    try {
      e.preventDefault();

      const token = generateToken();
      const succinct = generateSuccinct(userId, token);
      const hash = generateHash(succinct);

      console.log({ token, succinct, hash });
      setToken(token);
      setSuccinct(succinct);
      setHash(hash);
    }
    catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="rounded-lg p-6 p-8 ring-1 ring-slate-900/5">

      <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
        <svg className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]" viewBox="0 0 1155 678">
          <path fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)" fillOpacity=".3" d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z" />
          <defs>
            <linearGradient id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9089FC" />
              <stop offset="1" stopColor="#FF80B5" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <ThemeMode />

      <h1
        className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 break-words "
      >
        Simulation of ZK-Proofs
      </h1>

      <div className="container max-w-full max-h-full mx-auto overflow-auto">        
        <div className="flex flex-row items-center justify-center text-gray-600" >
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </div>

        <div className="flex flex-col md:flex-row space-x-4 space-y-4 items-center justify-around">
          <Box
            title="PROVER"
            borderClass="border-2 border-orange-500"
            height="25"
            width="25"
          >
            {userId && token && (
              <div className="flex flex-col space-y-4">
                <h4 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">
                  The customer knows the following:
                </h4>
                <p className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">
                  The username: <span className="text-slate-900 dark:text-white mt-5 text-base font-bold tracking-tight">{` ${userId}`}</span>
                </p>
                <p className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">
                  The verification code:
                  <span className="text-slate-900 dark:text-white mt-5 text-base font-bold tracking-tight">
                    {` ${token}`}
                  </span>
                </p>
                <span className="bg-green-100 text-green-800 text-sm font-medium p-1 m-1  rounded dark:bg-green-900 dark:text-green-300">
                  The code was displayed or sent to the customer via email or SMS
                </span>
                <span className="bg-red-100 text-red-800 text-xs font-bold p-1 m-1 rounded dark:bg-red-900 dark:text-red-300">
                  It must never be stored in the database.
                </span>
              </div>
            )}
          </Box>

          <Box
            title="SUCCINCT / SECRET"
            borderClass="border-2 border-blue-500"
            height="25"
            width="25"
          >
            {succinct && (
              <div className="flex flex-col space-y-4">
                <h4 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">
                  The following pair is created to generate the hash:
                </h4>
                <p className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">
                  {succinct}
                </p>
              </div>
            )}
          </Box>

          <Box
            title="VERIFIER"
            borderClass="border-2 border-green-500"
            height="25"
            width="25"
          >
            {hash && (
              <div className="flex flex-col space-y-4">
                <h4 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">
                  The verifier knows the following:
                </h4>
                <p className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">
                  The hash: <span className="text-slate-900 dark:text-white mt-5 text-base font-bold tracking-tight break-words p-1">{` ${hash}`}</span>
                </p>
                <span className="bg-purple-100 text-purple-800 text-sm font-medium p-1 m-1 rounded dark:bg-purple-900 dark:text-purple-300">
                  Only the hash and nothing else must be stored in the database.
                </span>
              </div>
            )}
          </Box>
        </div>
        <br />
        <br />
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

        <div className="overflow-hidden bg-white dark:bg-gray-800 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="lg:pr-8 lg:pt-4">
                <div className="lg:max-w-lg">
                  <form onSubmit={handleSubmit} >
                    <div
                      className={`p-6 bg-white border rounded-lg shadow dark:bg-gray-800`}
                    >
                      <h1 className="text-2xl font-semibold text-gray-700 dark:text-white">
                        Generate Auth Token
                      </h1>
                      <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                          A way to identify you
                        </label>
                        <input
                          type="text"
                          id="value"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter any value"
                          required
                          value={userId}
                          onChange={e => setUserId(e.target.value)}
                        />
                      </div>
                      <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Generate
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <VerificationForm hash={hash} />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;