import React from 'react';
import axios from 'axios';
import SteamInfo from './steam_info';
import GamesInfo from './games_info';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      showGames: false,
      user: null,
      notFound: false,
      ownedGames: null,
    };

    this.fetchGames = this.fetchGames.bind(this);
  }

  _searchId(e) {
    e.preventDefault();
    if(!(/^$/.test(this.state.username))) {
      axios(`/api/v1/steams/vanity?id=${this.state.username}`)
        .then(response => response.data.response)
        .then(this._handleResponse.bind(this));
    }
  }

  _handleResponse(response) {
    if(response.steamid) {
      this._fetchSummary(response.steamid);
    }
    else {
      this.setState({ steamid: null, username: '', showGames: false, notFound: true, user: null, ownedGames: null});
    }
  }

  _fetchSummary(steamid) {
    axios(`/api/v1/steams/summary?id=${steamid}`)
    .then(response => response.data.response.players[0])
    .then(user => this.setState({ user, username: '', showGames: false, notFound: false, ownedGames: null}))
  }

  fetchGames() {
    axios(`/api/v1/steams/games?id=${this.state.user.steamid}`)
    .then(response => response.data.response)
    .then(ownedGames => {
      this.setState({ showGames: true, ownedGames: ownedGames})
    })
  }

  _userInfo() {
    if(this.state.user) {
      if(this.state.showGames) {
        return(
          <div className="row">
            <div className="col-md-3">
              <SteamInfo user={this.state.user} fetchGames={this.fetchGames}/>
            </div>
            <div className="col-md-9">
              <GamesInfo ownedGames={this.state.ownedGames} user={this.state.user}/>
            </div>
          </div>
        )
      }
      else{
        return(
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <SteamInfo user={this.state.user} fetchGames={this.fetchGames}/>
            </div>
          </div>
        );
      }
    }
    else if(this.state.notFound) {
      return(
        <h4>El username no existe</h4>
      );
    }
  }

  render() {
    return(
      <div className="container">
         <div className="row">
            <div className="col-lg-12 text-center v-center">
              <h1>Busca tu Steam ID</h1>
              <br/>
              <form className="col-lg-12" onSubmit={(e) => this._searchId(e) }>
                <div className="input-group input-group-lg col-sm-offset-4 col-sm-4">
                  <input
                    value={this.state.username}
                    onChange={(e) => this.setState({ username: e.target.value })}
                    type="text"
                    className="center-block form-control input-lg"
                    title="Introduce tu username"
                    placeholder="Introduce tu username e.g jerson" />
                   <span className="input-group-btn"><button className="btn btn-lg btn-primary" type="submit">OK</button></span>
                </div>
              </form>

              {this._userInfo()}
            </div>
         </div>
      </div>
    );
  }
}

export default Search;
