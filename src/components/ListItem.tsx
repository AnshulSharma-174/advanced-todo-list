import React from 'react';
import { Button } from 'react-bootstrap';
import { useTodoContext } from '../context/TodoContext';

interface listItemProps {
  itemName: string;
  itemIndex: number;
}

const ListItem: React.FC<listItemProps> = ({ itemName, itemIndex }) => {
  const { editTodo, deleteTodo } = useTodoContext();

  return (
    <li className='p-3 d-flex justify-content-between align-items-center'>
      <span>{itemName}</span>
      <Button style={{ fontSize: '12px' }} data-toggle="modal" data-target="#exampleModal" className='p-1 btn btn-warning' onClick={() => editTodo(itemIndex)}>
        Edit
      </Button>
      <Button style={{ fontSize: '12px' }} className='p-1 btn btn-danger' onClick={() => deleteTodo(itemIndex)}>
        Delete
      </Button>
    </li>
  );
};

export default ListItem;
