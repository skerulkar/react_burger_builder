import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Auxillary from '../../HOC/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
    salad: 30,
    cheese: 40,
    meat: 80,
    bacon: 40,
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 100,
        purchaseble: false,
        purchasing: false,
        loading: false,
        error: false
    }
    componentDidMount () {
        axios.get('https://react-my-burger-95655.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data})
        })
        .catch(error => {
            this.setState({error: true})
        })
    }
    
    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
        .map(igkey => {
            return ingredients[igkey];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({purchaseble: sum > 0})
    }
    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }
    purchaseHandler = () => {
        this.setState({purchasing : true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing : false})
    }

    purchaseContinueHandler = () => {
        console.log(this.props.history);
        this.props.history.push('/checkout');
        // this.setState({loading:true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer: {
        //         name: 'Sanket Kerulkar',
        //         address: {
        //             street: 'test',
        //             zipCode: '34243',
        //             country: 'US'
        //         },
        //         email: 'skerulkar@gmail.com'
        //     },
        //     delivaryMethod: 'fastest'
        // }
        // axios.post('/orders.json',order)
        //     .then(response => {
        //         this.setState({loading:false, purchasing:false});
        //     }).catch(error => {
        //         this.setState({loading:false, purchasing:false});
        //     });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary =null;
        
        let burger = this.state.error ? <p>Ingredints can'c be loaded! </p> : <Spinner />
        
        if (this.state.ingredients) {
            burger =(
                <Auxillary>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchaseble={this.state.purchaseble}
                        price={this.state.totalPrice} 
                        ordered={this.purchaseHandler} />
                </Auxillary>
            )
            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients} 
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler} 
                purchaseContinued={this.purchaseContinueHandler}/>;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }
        
        return (
            <Auxillary>
                <Modal 
                    show={this.state.purchasing}
                    ModelClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxillary>
        )
        
    }
}

export default withErrorHandler(withRouter(BurgerBuilder), axios);