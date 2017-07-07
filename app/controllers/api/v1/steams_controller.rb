class Api::V1::SteamsController < Api::V1::BaseController
  def vanity
    render json: Steam.vanity_to_steamid(params[:id])
  end

  def summary
    render json: Steam.summary(params[:id])
  end

  def games
    render json: Steam.games(params[:id])
  end

  def achievements
    render json: Steam.game_achievements(params[:appid], params[:id])
  end
end
