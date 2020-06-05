import React, {useReducer} from 'react';
import axios from 'axios';
import {GithubContext} from './githubContext';
import {githubReducer} from './githubReducer';
import {CLEAR_USERS, GET_REPOS, GET_USER, SEARCH_USERS, SET_LOADING} from '../types';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

const withCreds = url => {
  return `${url}client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
}

export const GithubState = ({children}) => {
  const initialState = {
    user: {},
    users: [],
    loading: false,
    repos: []
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const search = async value => {
    setLoading();/*включаем индикатор загрузки*/
    // ... делаем запрос с момощью axios
    const response = await axios.get(
      withCreds(`https://api.github.com/search/users?q=${value}&`)
    );
    //после получения данных вызываем метод dispatch
    dispatch({
      type: SEARCH_USERS,
      payload: response.data.items
    })
  };

  const getUser = async name => {
    setLoading();

    const response = await axios.get(
      withCreds(`https://api.github.com/users/${name}?`)
    );

    dispatch({
      type: GET_USER,
      payload: response.data /*данные пришедшие с сервера*/
    })
  };

  const getRepos = async value => {
    setLoading();

    const response = await axios.get(
      withCreds(`https://api.github.com/users/${value}/repos?per_page=5&`)
    );

    dispatch({
      type: GET_REPOS,
      payload: response.data /*данные пришедшие с сервера*/
    })
  };

  const clearUsers = () => dispatch({type: CLEAR_USERS});

  const setLoading = () => dispatch({type: SET_LOADING});


  const {user, users, repos, loading} = state;

  return (
    <GithubContext.Provider value={{
      user, users, repos, loading,/*свойства объекта state*/
      search, getUser, getRepos, clearUsers, setLoading /*подключившие этот контекст будут иметь доступ к этим ф-циям*/
    }}>
      {children}
    </GithubContext.Provider>
  )
}