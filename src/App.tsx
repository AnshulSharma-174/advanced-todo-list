import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import ListItem from './components/ListItem';
import { TodoProvider, useTodoContext } from './context/TodoContext';

const TodoApp: React.FC = () => {
  const {
    todos,
    todo,
    editableIndex,
    editedElement,
    handleChange,
    addTodo,
    updateEditedElement,
    saveChanges,
    closeModal,
  } = useTodoContext();

  return (
    <>
      <section style={{ minHeight: '940px' }} className='bg-dark text-white'>
        <section style={{ width: '600px' }} className='m-auto'>
          <h1 className='text-center'>Todo App</h1>
          <section className="input-group mt-5 mb-3">
            <input value={todo} type="text" onChange={handleChange} className="form-control p-3" placeholder="What to do?" aria-label="What to do?" />
            <section className="input-group-append">
              <Button onClick={addTodo} className='p-3'>Add todo</Button>
            </section>
          </section>
          {todos.length > 0 && (
            <ul className='border p-0'>
              {todos.map((item, index) => (
                <ListItem key={index} itemIndex={index} itemName={item} />
              ))}
            </ul>
          )}
        </section>
      </section>
      {editableIndex !== null && (
        <section className="modal show d-block" role="dialog">
          <section className="modal-dialog modal-dialog-centered" role="document">
            <section className="modal-content">
              <section className="modal-header bg-primary text-white">
                <h5 className="modal-title">Edit</h5>
                <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
              </section>
              <section className="modal-body">
                <input type="text" value={editedElement} className="form-control" onChange={updateEditedElement} />
              </section>
              <section className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={saveChanges}>Save changes</button>
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
              </section>
            </section>
          </section>
        </section>
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
};

export default App;
