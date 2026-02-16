import { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import './App.css';

import MainHeader from './components/MainHeader';
import NewEntryForm from './components/NewEntryForm';
import DisplayBalance from './components/DisplayBalance';
import DisplayBalances from './components/DisplayBalances';
import EntryLines from './components/EntryLines';
import ModalEdit from './components/ModalEdit';

import { useSelector } from 'react-redux';

function App() {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [isExpense, setIsExpense] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [entryId, setEntryId] = useState(0);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [total, setTotal] = useState(0);

  const entries = useSelector(state => state.entries);

  useEffect(() => {
    if(!isOpen && entryId !== 0){
      const index = entries.findIndex(entry => entry.id === entryId)
      const newEntries = [...entries];
      newEntries[index].description = description;
      newEntries[index].value = value;
      newEntries[index].isExpense = isExpense;
      //setEntries(newEntries);
      resetEntry();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])
  
  useEffect(() => {
    let totalIncome = 0;
    let totalExpense = 0;

    entries.map(entry => {
      if(entry.isExpense){
        return totalExpense += Number(entry.value);
      }
      else{
        return totalIncome += Number(entry.value);
      }
    });

    setTotal(totalIncome - totalExpense);
    setIncomeTotal(totalIncome);
    setExpenseTotal(totalExpense);

  }, [entries])

  function editEntry(id){
    console.log('Edit Entry', id)
    if(id){
      const index = entries.findIndex(entry => entry.id === id);
      const entry = entries[index];
      setEntryId(id);
      setDescription(entry.description);
      setValue(entry.value);
      setIsExpense(entry.isExpense);
      setIsOpen(true);
    }
  }

  function addEntry(){
    const result = entries.concat({
      id: entries.length + 1, 
      description, 
      value,
      isExpense
    });
    console.log('result', result);
    console.log('entries', entries);
    //setEntries(result);
    resetEntry();
  }

  function resetEntry(){
    setDescription('');
    setValue('');
    setIsExpense(true);
  }

  return (
    <Container>
      <MainHeader title='Budget'/>

      <DisplayBalance title='Your Balance:' value={total} size='small'/>

      <DisplayBalances incomeTotal={incomeTotal} expenseTotal={expenseTotal}/>

      <MainHeader title='History' type='h3'/>
      
      <EntryLines 
        entries={entries} 
        editEntry={editEntry}
      />

      <MainHeader title='Add new transaction' type='h3'/>
      <NewEntryForm 
        addEntry={addEntry} 
        description = {description}
        value = {value}
        isExpense = {isExpense}
        setDescription = {setDescription}
        setValue = {setValue}
        setIsExpense = {setIsExpense}
      />

      <ModalEdit 
        isOpen={isOpen} 
        setIsOpen={setIsOpen}
        description = {description}
        value = {value}
        isExpense = {isExpense}
        setDescription = {setDescription}
        setValue = {setValue}
        setIsExpense = {setIsExpense}
      />

    </Container>
  );
}

export default App;