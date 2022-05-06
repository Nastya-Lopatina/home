import React, { Component } from "react";
import Controls from "./Controls";
import './Counter.css';

class Counter extends Component {
    static defaultProps = {
        initialValue: 0,
}

    state = {
        value: this.props.initialValue,
 }
// Пример : hendleIncremrnt = event => {
    //нельзя обновлять state в ручную !!!!!!!!
    // this.state.value = 6
    // это не совсем верно, если их будет много он не будет коректно работать (не обновляться от предыдущего значения)
    //    this.setState({
    //        value:this.state.value + 1,
    //    })
    //   Если хотим от предвдущего делаем стрел функ 
    // //   hendleIncremrnt = () => {
    //     this.setState((prevState) => {
    //         return {
    //              value: prevState.value + 1,
    //         }
    //     })
    // }
    
    //     //если нужно использовать в ассинхронном коде нужно записать(сщхранить) значение
    //     // const {target} =  event
    // }

    
    handleIncrement = () => {
        this.setState((prevState) => {
            return {
                 value: prevState.value + 1,
            }
        })
    }
    
    handleDecrement = () => {
      this.setState((prevState) => {
            return {
                 value: prevState.value - 1,
            }
        })
       
    }
    render() {
        const {value} = this.state
        return (
            <div className="Counter">
                <span className="Counter__value "> {value} </span>
                <Controls
                   onIncrement={this.handleIncrement}
                   onDecrement={this.handleDecrement} />
            </div>
        )
    }

}
export default Counter;