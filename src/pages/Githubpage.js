import React, { Component } from 'react';

class Githubpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: 'Eiad',
      apilink: 'https://api.github.com/search/',
      data: '',
      loading: false,
      selectionz: 'users',
      character: {},
    };
  }

  fetchSearch = srchkwrd => {
    let url = `${this.state.apilink + 'repositories'}?q=${srchkwrd}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({
          data: data,
        });
      })
      .catch(error => console.log('Oops! . There Is A Problem' + error));
  };

  componentDidMount() {
    this.fetchSearch(this.state.searchText);
  }

  handleChange(e) {
    this.setState({
      selectionz: e.target.value,
    });
  }

  render() {
    // Users search
    if (this.state.selectionz === 'users') {
      return (
        <div className='main-cont'>
          <div className='container'>
            <h2 className='center'>
              Search Users / Repositories / Issues From github
            </h2>
            <div className='clearfix srchtype-slc'>
              <div className='userslcd'>
                <div className='select'>
                  <select
                    id='lang'
                    onChange={this.handleChange.bind(this)}
                    value={this.state.selectionz}
                  >
                    <option value='users'>Users</option>
                    <option value='repositories'>Repositories</option>
                    <option value='issues'>Issues</option>
                  </select>
                </div>
              </div>
              <div className='usersrch'>
                <SearchForm fetchSearch={this.fetchSearch} />
              </div>
            </div>
          </div>
          <div className='container'>
            <section className='users-container'>
              <div className='row'>
                <Profiles data={this.state.data} />
              </div>
            </section>
          </div>
        </div>
      );
    }
    // Repos search
    if (this.state.selectionz === 'repositories') {
      return (
        <div className='main-cont'>
          <div className='container'>
            <h2 className='center'>
              Search Users / Repositories / Issues From github
            </h2>
            <div className='clearfix srchtype-slc'>
              <div className='userslcd'>
                <div className='select'>
                  <select
                    id='lang'
                    onChange={this.handleChange.bind(this)}
                    value={this.state.selectionz}
                  >
                    <option value='users'>Users</option>
                    <option value='repositories'>Repositories</option>
                    <option value='issues'>Issues</option>
                  </select>
                </div>
              </div>
              <div className='usersrch'>
                <SearchForm fetchSearch={this.fetchSearch} />
              </div>
            </div>
          </div>
          <div className='container'>
            <section className='users-container'>
              <div className='row'>
                <Repoz data={this.state.data} />
              </div>
            </section>
          </div>
        </div>
      );
    }

    // Issues search
    if (this.state.selectionz === 'issues') {
      return (
        <div className='main-cont'>
          <div className='container'>
            <h2 className='center'>
              Search Users / Repositories / Issues From github
            </h2>
            <div className='clearfix srchtype-slc'>
              <div className='userslcd'>
                <div className='select'>
                  <select
                    id='lang'
                    onChange={this.handleChange.bind(this)}
                    value={this.state.selectionz}
                  >
                    <option value='users'>Users</option>
                    <option value='repositories'>Repositories</option>
                    <option value='issues'>Issues</option>
                  </select>
                </div>
              </div>
              <div className='usersrch'>
                <SearchForm fetchSearch={this.fetchSearch} />
              </div>
            </div>
          </div>
          <div className='container'>
            <section className='users-container'>
              <div className='row'>
                <Issuez data={this.state.data} />
              </div>
            </section>
          </div>
        </div>
      );
    } else {
      return <h1>Something is wrong dude, contact the support</h1>;
    }
  }
}

class SearchForm extends React.Component {
  render() {
    return (
      <div className='search-bar'>
        <form className='input-group' onSubmit={this.handleForm}>
          <input
            type='search'
            ref='srchkwrd'
            placeholder='Keyword ex: Eiad'
            className='form-input'
          />

          <button type='submit' className='btn-sub'>
            Submit
          </button>
        </form>
      </div>
    );
  }

  handleForm = event => {
    event.preventDefault();

    let srchkwrd = this.refs.srchkwrd.value;
    this.props.fetchSearch(srchkwrd);
  };
}

const Profiles = props => {
  if (props.data) {
    let data = props.data;

    if (data.message === 'Not Found')
      return (
        <div className='notfound'>
          <h2>Oops !!!</h2>
          <p>Oops no profiles there!. Try Again </p>
        </div>
      );
    else {
      let userList = data.items.map(userinfoz => {
        return (
          <div className='col-3 col-6-sm' key={userinfoz.id}>
            <div className='single-block'>
              <img
                className='user'
                src={userinfoz.owner.avatar_url}
                alt={`${userinfoz.owner.login}`}
              />
              <h4>
                <a href={userinfoz.html_url}>{userinfoz.owner.login}</a>
              </h4>
              <h5>Score: {userinfoz.score}</h5>
            </div>
          </div>
        );
      });
      return <div>{userList}</div>;
    }
  } else {
    return <div className='center'>Fetching data . . .</div>;
  }
};

const Repoz = props => {
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
      let reposlist = data.items.map(reposinfoz => {
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

const Issuez = props => {
  if (props.data) {
    let data = props.data;

    if (data.message === 'Not Found')
      return (
        <div className='notfound'>
          <h2>Oops !!!</h2>
          <p>We Couldn't Find the Issues. Try Again </p>
        </div>
      );
    else {
      let reposlist = data.items.map(issuesinfoz => {
        return (
          <div className='col-12' key={issuesinfoz.id}>
            <div className='single-block'>
              <p className='left repo-desc'>
                <a href={issuesinfoz.html_url}>
                  Issue in Repo: {issuesinfoz.name}
                </a>
                <br />
                Issue events: {issuesinfoz.issue_events_url}
                <br />
                Issues URL: {issuesinfoz.issues_url}
                <br />
                Open Issues: {issuesinfoz.open_issues}
              </p>
            </div>
          </div>
        );
      });
      return <div>{reposlist}</div>;
    }
  } else {
    return <div>Fetching Issues Data . . .</div>;
  }
};

export { Githubpage };
