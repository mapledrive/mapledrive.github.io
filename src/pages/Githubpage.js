import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGithub } from 'features/github/githubSlice';
import Spinner from 'components/Spinner';
import styled from 'styled-components';

import { StyledSection, SectionTitle } from 'style';

// https://github.com/ankitsaxena21/React-Skeleton-Loading-UI
const Githubpage = () => {
  return (
    <StyledSection>
      <SectionTitle>Search Github Repositories</SectionTitle>
      <GithubComponent />
    </StyledSection>
  );
};

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
      return (
        <div>
          <TodoApp>
            {data?.items?.map((reposinfoz, key) => (
              <TodoRow key={key}>
                <div>
                  <span>Repo name: </span>{' '}
                  <a href={reposinfoz.html_url}>{reposinfoz.name} </a>
                </div>
                <div>
                  <span>Desc: </span>{' '}
                  {reposinfoz?.description?.substring(0, 60)}
                </div>
                <div>
                  <span>By: </span> {reposinfoz.owner.login}
                </div>
                <div>
                  <span>Last Update: </span> {reposinfoz.updated_at}
                </div>
                <div>
                  <span>Last Update: </span> {reposinfoz.updated_at}
                </div>
                <div>
                  <span>Last Update: </span> {reposinfoz.updated_at}
                </div>
              </TodoRow>
            ))}
          </TodoApp>
        </div>
      );
    }
  } else {
    return <div className='center'>Fetching data . . .</div>;
  }
};

const GithubComponent = () => {
  const [author, setAuthor] = useState('');
  const dispatch = useDispatch();
  const handleChange = e => {
    setAuthor(e.target.value);
  };

  useEffect(() => {
    if (author) {
      fetchData();
    }
  }, [author]);

  const fetchData = () => {
    //dispatch(fetchGithub(author));
    console.log(author, 'author');
  };
  const list = useSelector(state => state.github.list);
  const isLoading = useSelector(state => state.github.isLoading);

  useEffect(() => {
    dispatch(fetchGithub()); // Safe to add dispatch to the dependencies array
  }, [dispatch]);

  return (
    <>
      <InputItem onChange={handleChange} value={author} />
      {isLoading ? <Spinner /> : <Repos data={list} />}
    </>
  );
};

export { Githubpage };

const InputItem = ({ value, onChange }) => {
  return (
    <>
      <RepoSearchInput id={1} onChange={onChange} value={value} />
    </>
  );
};

const RepoSearchInput = styled.input`
  padding-top: 29px;
  width: 100%;
  height: 50px;
  margin: 1px 0;
  padding: 16px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  text-overflow: ellipsis;
  background-color: transparent;
  box-shadow: none;
  box-sizing: border-box;
  color: #242629;
  letter-spacing: normal;
  text-decoration: none;
  text-transform: none;
  text-shadow: none;
  text-indent: 0;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-stretch: normal;
  line-height: 0;
  border: 1px solid #d3d4d4;
  margin-bottom: 10px;
`;

const TodoApp = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  min-height: 600px;
  background: #1f1b2e;
  text-align: center;
  margin: 50px auto;
  padding: 25px;
  border-radius: 10px;
  margin: 0;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
    'Lucida Sans', Arial, sans-serif;
  box-sizing: border-box;
  width: 100%;
`;

const TodoRow = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0px 0px 10px 0px;
  color: #fff;
  background: #312b45;
  padding: 16px;
  border-radius: 5px;
  width: 100%;
  height: 120px;
  box-sizing: border-box;
  line-height: 14px;

  a {
    color: #fff;
  }

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 12px;
  }
`;
