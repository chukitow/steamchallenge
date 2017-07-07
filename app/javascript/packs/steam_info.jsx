import React from 'react'

const SteamInfo = ({ user, fetchGames }) => {
  return(
    <div>
      <div className="card hovercard">
        <div className="cardheader">
        </div>
        <div className="avatar">
           <img alt="" src={user.avatar} />
        </div>
        <div className="info">
           <div className="title">
              <a target="_blank" href={user.profileurl}>{user.personaname} / {user.steamid}</a>
           </div>
        </div>

      </div>

      <button className="btn btn-primary btn-block btn-lg" onClick={fetchGames}>Ver información</button>
    </div>
  );
}

export default SteamInfo;
