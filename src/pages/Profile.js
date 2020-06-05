import React, {useContext, useEffect, Fragment} from "react";
import {GithubContext} from '../context/github/githubContext';
import {Link} from 'react-router-dom';

export const Profile = ({match}) => {
  console.log(match)
  // создаем контекст
  const {getUser, getRepos, loading, user, repos} = useContext(GithubContext);
  const urlName = match.params.name;

  //данные запросы необходимо делать когда компонент уже сформирован
  //т.е. componentDidMount
  //данное поведение можно эмулировать с помощью useEffect
  //ему передается эфект и список зависимостей, т.е. за какими переменными надо следить
  //Если переменные меняются то нужно вызвать эфект
  //учитываю что нужно вызвать один раз, то передается пустой массив
  useEffect(() => {
    getUser(urlName);
    getRepos(urlName);
    // console.log('Effect')
    // eslint-disable-next-line
  }, [])

  if(loading) {
    return <p className="text-center">Загрузка...</p>
  } else {

    const {
      name, company, avatar_url,
      location, bio, blog,
      login, html_url, followers, following,
      public_repos, public_gists
    } = user;
    console.log('user ',user)
    return (
      <Fragment>
        <Link to="/" className="btn btn-link">На главную</Link>
        <div className="card mb-4">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3 text-center">
                <img src={avatar_url} alt={name} style={{width: 100}}/>
                <h1>{name}</h1>
                {location && <p>Местоположение: {location}</p>}
              </div>
              <div className="col">
                {
                  bio && <Fragment>
                    <h3>BIO</h3>
                    <p>{bio}</p>
                  </Fragment>
                }
                <a
                  href={html_url}
                  target="_blanc"
                  rel="noopener noreferrer"
                  className="btn btn-dark"
                >Открыть профиль</a>
                <ul>
                  {login && <li><strong>Username: </strong>{login}</li>}
                  {company && <li><strong>Компания: </strong>{company}</li>}
                  {blog && <li><strong>Website: </strong>{blog}</li>}
                </ul>
                <div className="badge badge-primary">Подписчики: {followers}</div>
                <div className="badge badge-success">Подписан: {following}</div>
                <div className="badge badge-info">Репозиртории: {public_repos}</div>
                <div className="badge badge-dark">Gists: {public_gists}</div>
              </div>
            </div>
          </div>
        </div>
        {repos.join()}
      </Fragment>
    )
  }


}
