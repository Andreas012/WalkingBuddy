import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import './Menu.css';

export default function Menu(props) {

    const [inputDistance, setInputDistance] = useState(
        Number.isNaN(parseInt(localStorage.getItem('distance'))) ? 0 : parseInt(localStorage.getItem('distance'))
    );

    const handleInputChange = (input) => {

        if (input === 'increase') {
            setInputDistance(inputDistance + 1)
            localStorage.setItem('distance', inputDistance + 1)
        }
        else if (input === 'decrease' && inputDistance >= 1) {
            setInputDistance(inputDistance - 1)
            localStorage.setItem('distance', inputDistance - 1)
        }

    }

    return (

        <div className="Menu">
            <div className="inputDistance">
                <p>{inputDistance} km</p>
            </div>
            <div className="ButtonGroup">
                <Button variant="danger" style={{ marginRight: '5vh' }} onClick={() => { handleInputChange('decrease') }}>-</Button>
                <Button variant="success" onClick={() => { props.GenerateWaypoints(); props.Update() }}>Load</Button>
                <Button variant="primary" style={{ marginLeft: '5vh' }} onClick={() => { handleInputChange('increase') }}>+</Button>

            </div>
        </div>

    );

}