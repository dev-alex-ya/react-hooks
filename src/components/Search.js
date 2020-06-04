import React, {useContext, useState} from 'react';
import {AlertContext} from '../context/alert/alertContext';

export const Search = () => {
  const [value, setValue] = useState('');
  const {show} = useContext(AlertContext);

  const onSubmit = (event) => {
    // если нажат не enter, то ничего не делаем
    if(event.key !== 'Enter') {
      return;
    }

    if (value.trim()) {
      console.log(value.trim())
    } else {
      show('Введите данные пользователя!')
    }
  }

  return (
    <div className="formGroup">
      <input
        type="text"
        className="form-control"
        placeholder="Введите ник пользователя..."
        value={value}
        onChange={event => setValue(event.target.value)}
        onKeyPress={onSubmit}
      />
    </div>
  )

}