import { useState } from 'react';

const useExampleHook = () => {
    const [exampleState, setExampleState] = useState<string>('Initial State');

    const updateExampleState = (newState: string) => {
        setExampleState(newState);
    };

    return {
        exampleState,
        updateExampleState,
    };
};

export default useExampleHook;