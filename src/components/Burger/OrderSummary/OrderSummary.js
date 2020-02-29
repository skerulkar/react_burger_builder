import React from 'react';
import Auxillary from '../../../HOC/Auxillary/Auxillary';
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
const ingredintSummary = Object.keys(props.ingredients)
    .map(igkey => {
    return (
        <li key={igkey}>
            <span style={{textTransform: 'capitalize'}}>{igkey}</span>
        </li>
        );
    })

    return (
        <Auxillary>
            <h1>Your Order</h1>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredintSummary}
            </ul>
            <p><strong>Total Price: {props.price}</strong></p>
            <p>Continue to checkout?</p>
            <Button 
                btnType="Danger"
                clicked={props.purchaseCancelled} >CANCEL</Button>
                <Button 
                btnType="Success"
                clicked={props.purchaseContinued} >CONTINUE</Button>
        </Auxillary>
    );
};

export default orderSummary;