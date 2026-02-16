import ButtonSaveOrCancel from './ButtonSaveOrCancel'
import { Form } from 'semantic-ui-react'
import EntryForm from './EntryForm';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEntryRedux } from '../actions/entries.actions';
import { v4 as uuidv4 } from 'uuid';

function NewEntryForm() {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [isExpense, setIsExpense] = useState(true);

  const dispatch = useDispatch();

  function addEntry(){
    dispatch(
      addEntryRedux({
        id: uuidv4(),
        description,
        value,
        isExpense,
      })
    );
    setDescription('');
    setValue('');
    setIsExpense(true);
  }

  return (
    <Form unstackable>
        <EntryForm 
          description = {description}
          value = {value}
          isExpense = {isExpense}
          setDescription = {setDescription}
          setValue = {setValue}
          setIsExpense = {setIsExpense}
        />
        <ButtonSaveOrCancel 
          addEntry={addEntry}
        />
    </Form>
  )
}

export default NewEntryForm