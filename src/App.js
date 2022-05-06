import React, { Component } from 'react';
import shortid from 'shortid';
// import Counter from './components/Counter';
// import Dropdown from './components/Dropdown';
// import ColorPicker from './components/ColorPicker';
// import Form from './components/Form';
import TodoList from './components/TodoList/TodoList';
import TodoEditor from './components/TodoEditor/TodoEditor';
import Filter from './components/Filter/Filter';
import Modal from './components/Modal/Modal';
// import initialTodos from './todos.json';
// import Tabs from './components/Tabs/Tabs';
// import tabs from './tabs.json';

// const colorPickerOptions = [
//   { label: 'red', color: '#F44336' },
//   { label: 'green', color: '#4CAF50' },
//   { label: 'blue', color: '#2196F3' },
//   { label: 'grey', color: '#607D8B' },
//   { label: 'pink', color: '#E91E63' },
//   { label: 'indigo', color: '#3F51B5' },
// ];

class App extends Component {
 state = {
   todos: [],
   filter: '',
   showModal: false,
  
 };
  
  //жизненый цикл
  //это метод позволяет забирать сохраненные дванные из хранилища 
  componentDidMount() {
    const todos = localStorage.getItem('todos')
     const parsedTodos = JSON.parse(todos); 
    // console.log(parsedTodos)
    if (parsedTodos) {
      this.setState({todos:parsedTodos})
  }
    }
    

//Метод получения и сохранения в хранилеще
  componentDidUpdate(prevProps, prevState) {
    // console.log('App componentDidUpdate');

    const nextTodos = this.state.todos;
    const prevTodos = prevState.todos;

    if (nextTodos !== prevTodos) {
      console.log('Обновилось поле todos, записываю todos в хранилище');
      localStorage.setItem('todos', JSON.stringify(nextTodos));
    }

    if (nextTodos.length > prevTodos.length && prevTodos.length !== 0) {
      this.toggleModal();
    }
  }
  

// добавляет новые тудушки и создаем ее
  addTodo = text => {
    const todo = {
      id: shortid.generate(),
      text,
      completed: false,
    };

    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));
  };
  
  // Удоляет по  id 
  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== todoId),
    }));
  };

  
 changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
 };
  
  
  toggleCompleted = todoId => {
    // this.setState(prevState => ({
    //   todos: prevState.todos.map(todo => {
    //     if (todo.id === todoId) {
    //       return {
    //         ...todo,
    //         completed: !todo.completed,
    //       };
    //     }

    //     return todo;
    //   }),
    // }));

    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    }));
  };


  getVisibleTodos = () => {
    const { filter, todos } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return todos.filter(todo =>
      todo.text.toLowerCase().includes(normalizedFilter),
    );
  };

  calculateCompletedTodos = () => {
    const { todos } = this.state;

    return todos.reduce(
      (total, todo) => (todo.completed ? total + 1 : total),
      0,
    );
  };


  // Получения доступа к даннфм из формы в App 
  formSubmitHandler = data => {
    console.log(data)
  }

  // Открытие и закерытие модального окна 
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }))
  }

  render() {
    const { todos,filter, showModal } = this.state;
    const totalTodoCount = todos.length;
    const visibleTodos = this.getVisibleTodos();
    const completedTodoCount = this.calculateCompletedTodos();

    return (
      <>
        {/* <h1>Состояние компонента</h1> */}
        {/* <Tabs items={tabs }/> */}
      <button type='button' onClick={this.toggleModal}> Открыть модалку</button>
        
        {showModal && (<Modal onClose={this.toggleModal}>
               <TodoEditor onSubmit={this.addTodo }/>
           </Modal> )}  
     
        {/* <Form onSubmit={ this.formSubmitHandler }/> */}
        {/* <Counter initialValue={10} /> */}
        {/* <Dropdown /> */}
        {/* <ColorPicker options={colorPickerOptions} /> */}
        <div>
          <p>Общее кол-во: {totalTodoCount}</p>
          <p>Кол-во выполненных:{completedTodoCount} </p>
        </div>
 
  
        
        <Filter
          value={filter}
          onChange={this.changeFilter} />

        <TodoList todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
         onToggleCompleted={this.toggleCompleted}/>
      
      </>
    );
  }
}
//  

export default App;