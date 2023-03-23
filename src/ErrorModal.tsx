import React, { FC } from "react";

interface ErrorProps {
    message: string;
}

const ErrorModal: FC<ErrorProps> = ({ message }) => {
    return (
        <div className="relative top-20 mx-auto w-96 rounded-md border bg-white shadow-lg">
            <div className="text-center align-middle">
                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="flex justify-center gap-2 text-base font-semibold leading-6 text-gray-900">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                                />
                            </svg>
                            Oops, something went wrong!
                        </h3>
                    </div>
                    <div className="border-t border-gray-200">
                        <div className="bg-gray-50 px-4 py-5 text-sm font-medium text-gray-500 sm:px-6">
                            {message}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ErrorModal;
