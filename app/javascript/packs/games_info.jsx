import React from 'react';
import axios from 'axios';

class GamesInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _buildImage(appid, image_url) {
    return `http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${image_url}.jpg`
  }

  _gameAchievements(appid) {
    axios(`/api/v1/steams/achievements?id=${this.props.user.steamid}&appid=${appid}`)
    .then(response => {
      if(response.data.playerstats.achievements) {
        let count = response.data.playerstats.achievements
        .filter(achievement => achievement.achieved == 1).length;
        this.setState({  [`achievements_${appid}`]: count });
      }
      else {
        return 0;
      }
    });
  }

  _row(game) {
    this._gameAchievements(game.appid);

    return(
      <div className="card hovercard" key={game.appid}>
        <div className="cardheader" style={{ backgroundImage:  "url(" + this._buildImage(game.appid, game.img_logo_url) + ")"}}>
        </div>
        <div className="avatar">
           <img alt="" src={this._buildImage(game.appid, game.img_icon_url)} />
        </div>
        <div className="info">
           <div className="title">
              <a target="_blank" href="">{game.name}</a>
           </div>

           <div className="row">
             <div className="col-md-12">
                <div className="title text-center">
                  Logros {this.state[`achievements_${game.appid}`] || 0}
                </div>
             </div>
           </div>
        </div>
      </div>
    );
  }

  render() {
    if(this.props.ownedGames.game_count) {
      return(
        <div>
          {this.props.ownedGames.games.map(this._row.bind(this))}
        </div>
      );
    }
  }
}

export default GamesInfo;
