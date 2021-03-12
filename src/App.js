import React, { useState, useEffect } from 'react';
import { Button, FormControl, Input, InputLabel, Container } from '@material-ui/core';
import Todo from './Todo';
import './App.css';
import db from './firebase';
import firebase from 'firebase';


function App() {

  // define state with two variable, todos is model, setTodos is func to modify data model.
  // once page reload state will erased to new
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

 

  // when the app loads, listen to database and fetch to new todos as add,edit,delete
  useEffect(() => {
    
    // snapshot : take snap in database and shot in state
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      // set todos data, return string
      // const data = snapshot.docs.map(doc => ({id: doc.id, todo: doc.data()}));

      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data()})));

    });


  }, []);

  const addTodo = (event) => {
    event.preventDefault();

    db.collection('todos').add({
      text: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    // ...todos define next array, input is new text in array
    // setTodos([...todos, input]);
    setInput('');
  }

  return (
    <div className="App">
      <h1>Hello World {input}</h1>
      <form>
        <FormControl>
          <InputLabel htmlFor="my-input">Input Todo</InputLabel>
          <Input id="my-input" value={input} onChange={event => setInput(event.target.value)} />
          <Button type="submit" onClick={addTodo} variant="contained" color="primary" disabled={!input}>
            addTodo
          </Button>
        </FormControl>
      </form>
      <Container>
        <>
        {todos.map((todo) => (
         
            <Todo todo={todo} key={todo.id} />
          
        ))}
        </>
      </Container>
    </div>
  );
}

export default App;

