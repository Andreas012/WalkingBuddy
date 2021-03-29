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

    var distance = props.routeInfo[1];
    var duration = props.routeInfo[0];

    var hours = (duration / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    if (rhours < 1) {
        duration = rminutes + "min";
    }
    else {
        duration = rhours + "h " + rminutes + "min";
    }

    return (

        <div className="Menu">
            <div className="route">
                <p>{distance} km - {duration}</p>
            </div>
            <div className="lower">
                <div className="inputDistance">
                    <p>Chosen Distance:&nbsp;&nbsp;</p>
                    <p>{inputDistance} km</p>
                </div>
                <div className="ButtonGroup">
                    <Button variant="dark" style={{ marginRight: '5vh', fontSize: '3vh' }} onClick={() => { handleInputChange('decrease') }}><strong>-</strong></Button>
                    <Button variant="success" onClick={() => { props.GenerateWaypoints(); props.Update() }}>Load</Button>
                    <Button variant="dark" style={{ marginLeft: '5vh', fontSize: '3vh' }} onClick={() => { handleInputChange('increase') }}><strong>+</strong></Button>

                </div>
            </div>
        </div>

    );

}