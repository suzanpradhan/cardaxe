import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";


// Generic type for the custom function with void return and generic arguments
// type DispatchFunction<TArgs extends any[]> = (action: TArgs) => void;


export function useTimeoutDispatch(
    delay: number,
): <StateType>(action: ActionCreatorWithPayload<StateType, string>, values: StateType) => void {
    const timeoutRef = useRef<number | null>(null);
    const dispatch = useDispatch();


    const executeFunction = <StateType>(action: ActionCreatorWithPayload<StateType>
        , values: StateType) => {
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
            dispatch(action(values));
        }, delay);

    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return executeFunction;
}
