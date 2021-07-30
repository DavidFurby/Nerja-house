import { useState, useEffect } from 'react'
import firebase from 'firebase/app'
import 'firebase/database'

const Counter = ({ id }) => {
    
    const [count, setCount] = useState('');
    
    const increaseCount = async () => {
        const registerCount = () => fetch(`/api/incrementCount?id=${encodeURIComponent(id)}`)
        registerCount()
    }

    return (
        <div style={{ margin: '5px 0' }}>
            <button onClick={increaseCount} style={{ width: '100%' }}>Increase count</button>
            <h5 style={{ textAlign: 'center', marginTop: '5px' }}>{count ? count : '0'}</h5>
        </div>
    )
}

export default Counter