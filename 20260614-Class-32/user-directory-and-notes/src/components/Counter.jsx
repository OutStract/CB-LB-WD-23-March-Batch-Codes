import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    function handleClick() {
        // setCount(count + 1);
        setCount(prevCount => prevCount + 1);
        console.log("💵💵 Count", count);
    }
    return (
        <div>
            <h1>Counter: {count}</h1>
            <button onClick={handleClick}>Increment</button>
        </div>
    )
}

export default Counter;