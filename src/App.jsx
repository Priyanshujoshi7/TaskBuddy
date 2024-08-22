import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

import './App.css'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(todoString)
      setTodos(todos)
    }
  }, [])

  const saveToLS = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  const handleAdd = () => {
    if (todo.trim()) {
      const newTodos = [...todos, { id: uuidv4(), todo: todo.trim(), isCompleted: false }]
      setTodos(newTodos)
      setTodo("")
      saveToLS(newTodos)
    }
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS(newTodos)
  }

  return (
    <>
    <div className='body bg-green-800'>
    <div className="container"></div>
      <Navbar />
      <div className='md:container mx-3 md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[35%]'>
        <h1 className='font-bold text-center text-3xl'>Task Buddy</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a todo</h2>
          <div className='flex'>
            <input onChange={handleChange} value={todo} type='text' className='w-full rounded-full px-5 py-1' />
            <button onClick={handleAdd} disabled={todo.trim().length <= 3} className='bg-violet-600 disabled:bg-violet-200 hover:bg-violet-900 p-3 py-1 text-white rounded-md mx-6 text-sm font-bold'>Save</button>
          </div>
        </div>
        <input id='show' className='my-4' onChange={toggleFinished} type="checkbox" checked={showFinished} />
        <label className='mx-2' htmlFor="show">Show Finished</label>
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No todos to display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className={"todo flex my-3 justify-between"}>
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-600 hover:bg-violet-900 p-2 py-1 text-white rounded-md mx-1 text-sm font-bold'>Edit</button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-600 hover:bg-violet-900 p-2 py-1 text-white rounded-md mx-1 text-sm font-bold'>Delete</button>
              </div>
            </div>
          })}
        </div>
      </div>
      </div>
    </>
  )
}

export default App
