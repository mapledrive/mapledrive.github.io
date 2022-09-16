import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGithub } from 'features/github/githubSlice';
import Spinner from 'components/Spinner';
import 'pages/bootstrap.css';

// https://codesandbox.io/s/279iz

const Repos = props => {
  if (props.data) {
    let data = props.data;

    if (data.message === 'Not Found')
      return (
        <div className='notfound'>
          <h2>Oops !!!</h2>
          <p>Oops no Repos there!. Try Again </p>
        </div>
      );
    else {
      let reposlist = data?.items?.map(reposinfoz => {
        return (
          <div className='col-12' key={reposinfoz.id}>
            <div className='single-block'>
              <p className='left repo-desc'>
                <a href={reposinfoz.html_url}>Repo name: {reposinfoz.name}</a>
                <br />
                Desc: {reposinfoz.description}
                <br />
                By: {reposinfoz.owner.login}
                <br />
                Last Update: {reposinfoz.updated_at}
              </p>
            </div>
          </div>
        );
      });
      return <div>{reposlist}</div>;
    }
  } else {
    return <div className='center'>Fetching data . . .</div>;
  }
};

const Githubpage = () => {
  const list = useSelector(state => state.github.list);
  const isLoading = useSelector(state => state.github.isLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGithub()); // Safe to add dispatch to the dependencies array
  }, [dispatch]);

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className='main-cont'>
          <div className='container'>
            <h2 className='center'>
              Search Users / Repositories / Issues From github
            </h2>
          </div>
          <div className='container'>
            <section className='users-container'>
              <div className='row'>
                <Repos data={list} />
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export { Githubpage };
