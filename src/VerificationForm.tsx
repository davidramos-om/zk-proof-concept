import { useState } from 'react'
import { generateSuccinct, verifyHash } from "./helper";

type Props = {
    hash: string
}

export function VerificationForm({ hash }: Props) {

    const [ userId, setUserId ] = useState<string>('');
    const [ token, setToken ] = useState<string>('');
    const [ succinct, setSuccinct ] = useState<string>('');
    const [ verificationHash, setVerificationHash ] = useState<string>('');
    const [ isValid, setIsValid ] = useState<boolean>(false);

    const handleVerify = (e: React.FormEvent<HTMLFormElement>) => {

        try {
            e.preventDefault();

            const succinct = generateSuccinct(userId, token);
            const isValid = verifyHash(succinct, hash);

            setSuccinct(succinct);
            setIsValid(isValid);
            setVerificationHash(hash);
        }
        catch (error) {
            console.log(error);
        }
    }

    const borderClasses = verificationHash ? (isValid ? 'border-green-100 dark:border-green-900 border-4' : 'border-red-100 dark:border-red-900 border-4') : 'border-gray-200 dark:border-gray-700';
    const iconClasses = verificationHash ? (isValid ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300') : '';

    return (
        <form onSubmit={handleVerify}>

            <div className={`overflow-hidden py-2 sm:py-3  border rounded-lg shadow ${borderClasses}`}>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:pr-8 lg:pt-4">
                            <div className="lg:max-w-lg">
                                <h1 className="text-2xl font-semibold text-gray-700 dark:text-white">
                                    Proving an argument is valid
                                </h1>
                                <p className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">
                                    Non-interactive zero-knowledge proofs
                                </p>

                                <div className="mb-6">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white pt-10">
                                        The way you identified yourself
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Use Id"
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)}
                                    />
                                </div>

                                <div className="mt-3">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Verification code
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Code"
                                        value={token}
                                        onChange={(e) => setToken(e.target.value)}
                                    />
                                </div>

                                <div className="mt-3">
                                    <button type="submit"
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Verify
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="lg:pr-8 lg:pt-4">
                            {iconClasses && (
                                <h1 className={`text-2xl font-medium ${iconClasses}`}>
                                    {isValid ? 'Valid' : 'Invalid'}
                                </h1>
                            )}

                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                Verification hash
                            </p>
                            <p className="ml-2 text-xs text-gray-500 dark:text-gray-400 break-words p-1">
                                {verificationHash}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}