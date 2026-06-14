import {useRef, useState } from 'react';

function ClickTracker() {

    const [stateCount, setStateCount] = useState(0);
    const refCount = useRef(0);

    const handleStateClick = () => {
        setStateCount(prev => prev + 1);
    }

    const handleRefClick = () => {
        refCount.current += 1;
        console.log("Ref Count: ", refCount.current);
    }

    console.log("Component Re-rendered");

    return (
        <div>
            <h3>State Vs Ref Comparison</h3>
            <p> State count (on screen): <strong>{stateCount}</strong></p>
            <p> Ref count (on screen): <strong>{refCount.current}</strong></p>
            <div>
                <button onClick={handleStateClick}>
                    Update State (+1)
                </button>
                <button onClick={handleRefClick}>
                    Update Ref (+1)
                </button>
            </div>
        </div>
    );
}

export default ClickTracker;