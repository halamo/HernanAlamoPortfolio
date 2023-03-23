import React, { useState, useEffect, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
import ErrorModal from "./ErrorModal";
import { useGetActivity } from "./queries/hooks/useGetActivity";
import Ratings from "./Ratings";

const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

const DEBOUNCE_MILLISECONDS = 150;
const COST_BASIS = 100;

function App() {
    const [isInLoadingState, setIsInLoadingState] = useState(false);
    const { isLoading, error, data, isFetching, isRefetching, refetch } =
        useGetActivity();

    const debounced = useDebouncedCallback(
        // to memoize debouncedFunction we use useCallback hook.
        // In this case all linters work correctly
        useCallback((value) => {
            setIsInLoadingState(value);
        }, []),
        DEBOUNCE_MILLISECONDS
    );

    useEffect(() => {
        const combinedLoadingState = isLoading || isFetching || isRefetching;
        if (!isInLoadingState && combinedLoadingState) {
            debounced(combinedLoadingState);
        } else {
            setIsInLoadingState(false);
            debounced.cancel();
        }
        return () => {
            debounced.cancel();
        };
    }, [isLoading, isFetching, isRefetching]);

    const scaledCost = useCallback(() => {
        const price = data?.price || 0;
        return price === 0
            ? "Free"
            : USDollar.format(price * COST_BASIS).toString();
    }, [data?.price]);

    const onClickHandler = () => {
        refetch();
    };

    if (isLoading) return "Loading...";

    if (error) {
        if (error instanceof Error) {
            return <ErrorModal message={error.message} />;
        } else {
            return <ErrorModal message="Try reloading the page." />;
        }
    }

    return (
        <div className="relative top-20 mx-auto max-w-2xl rounded-md border bg-white shadow-lg">
            <div className="text-center align-middle">
                <div className="overflow-hidden bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">
                            Bored, here's an idea!
                        </h3>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Activity
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    {data?.activity}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Type
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    {data?.type}
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Cost
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    {scaledCost()}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Participants
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    {data?.participants}
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Accessibility
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <Ratings value={data?.accessibility || 0} />
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Participants
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    {data?.participants}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
            <div className="flex justify-center p-4">
                <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={onClickHandler}
                    disabled={isLoading || isFetching || isRefetching}
                >
                    {isInLoadingState ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-6 w-6 animate-spin"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                            />
                        </svg>
                    )}
                    Another!
                </button>
            </div>
        </div>
    );
}

export default App;
