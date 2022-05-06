import React, { Component} from "react";
import shortid from 'shortid';
class Form extends Component {
    state = {
     name: '',
     tag: '',
     experience: 'junior',
    licence: false,
    }

    nameImputId = shortid.generate()
    tagImputID = shortid.generate()
//  Метод обновкления состояния импута 1 медот вместо сотни
 handleChange = e => {
    const {name, value} = e.currentTarget
    this.setState({
      [name] : value,
     })
 }
    
  // Метод для сабмина формы(отправка)
  handleSubmit = e => {
    e.preventDefault()
      this.props.onSubmit(this.state);
      this.reset()
  }

    //  очистка стейта к начальному состоянию
    reset = () => {
        this.setState({ name: '',
     tag: ''})
    }

// Обработчик для чекбокса
      handleLicenceChange = e => {
    console.log(e.currentTarget.checked);

    this.setState({ licence: e.currentTarget.checked });
      };
    
    render() {
        return (
              <form onSubmit={ this.handleSubmit}>
          <label htmlFor={this.nameImputId}>
            Имя <input type='text'
              name='name'
              value={this.state.name}
              onChange={this.handleChange}
              id={this.nameImputId}
                    />
          </label>
          <label htmlFor={this.tagImputID}>
                    Прозвеще <input type='text'
                        name='tag'
                        value={this.state.tag}
                        onChange={this.handleChange}
                        id={this.tagImputID }/>
                </label>

                <p>Ваш уровень:</p>
        <label>
          <input
            type="radio"
            name="experience"
            value="junior"
            onChange={this.handleChange}
            checked={this.state.experience === 'junior'}
          />
          Junior
        </label>

        <label>
          <input
            type="radio"
            name="experience"
            value="middle"
            onChange={this.handleChange}
            checked={this.state.experience === 'middle'}
          />
          Middle
        </label>
        <label>
          <input
            type="radio"
            name="experience"
            value="senior"
            onChange={this.handleChange}
            checked={this.state.experience === 'senior'}
          />
          Senior
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            name="licence"
            checked={this.state.licence}
            onChange={this.handleLicenceChange}
          />
          Согласен с условием
        </label>
          <button  type='submit'> Отправить</button>
      </form>
        )
    }
    
   
}
export default Form;