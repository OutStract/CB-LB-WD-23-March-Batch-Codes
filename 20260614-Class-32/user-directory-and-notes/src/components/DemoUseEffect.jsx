import { useState, useEffect } from 'react';

function DemoUseEffect(key, callback) {
    const [count, setCount] = useState(0);
    function handleClick() {
        // setCount(count + 1);
        setCount(prevCount => prevCount + 1);
    }

    useEffect(() => {
        console.log("Component Rendered.", count);

        return () => {
            console.log("Component Unmounted", count);
        };
    }, [count]);
    
    
    return (
        <div>
            <h1>Counter: {count}</h1>
            <button onClick={handleClick}>Increment</button>
        </div>
    )
}

export default DemoUseEffect;