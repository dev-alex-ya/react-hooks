import React, {useReducer} from 'react';
import {GithubContext} from './githubContext';
import {githubReducer} from './githubReducer';
import {CLEAR_USERS, GET_REPOS, GET_USER, SEARCH_USERS, SET_LOADING} from '../types';

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
    //после получения данных вызываем метод dispatch
    dispatch({
      type: SEARCH_USERS,
      payload: [] /*данные пришедшие с сервера*/
    })
  };

  const getUser = async name => {
    setLoading();
    //... запрос на сервер
    dispatch({
      type: GET_USER,
      payload: {} /*данные пришедшие с сервера*/
    })
  }
  const getRepos = async value => {
    setLoading();
    dispatch({
      type: GET_REPOS,
      payload: [] /*данные пришедшие с сервера*/
    })
  };

  const clearUsers = () => {
    dispatch({
      type: CLEAR_USERS
    })
  };

  const setLoading = () => {
    dispatch({
      type: SET_LOADING
    })
  };

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