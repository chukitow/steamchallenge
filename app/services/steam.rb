require 'net/http'

class Steam
  API_URL = "http://api.steampowered.com"

  def self.vanity_to_steamid(username)
    uri = URI("#{API_URL}/ISteamUser/ResolveVanityURL/v0001")
    params = { key: ENV["STEAM_API_KEY"], vanityurl: username }
    uri.query = URI.encode_www_form(params)

    res = Net::HTTP.get_response(uri)
    JSON.parse(res.body)
  end

  def self.summary(steamid)
    uri = URI("#{API_URL}/ISteamUser/GetPlayerSummaries/v0002/")
    params = { key: ENV["STEAM_API_KEY"], steamids: steamid }
    uri.query = URI.encode_www_form(params)

    res = Net::HTTP.get_response(uri)
    JSON.parse(res.body)
  end

  def self.games(steamid)
    uri = URI("#{API_URL}/IPlayerService/GetOwnedGames/v0001/")
    params = { key: ENV["STEAM_API_KEY"], steamid: steamid, include_appinfo: 1 }
    uri.query = URI.encode_www_form(params)

    res = Net::HTTP.get_response(uri)
    JSON.parse(res.body)
  end

  def self.game_achievements(appid, steamid)
    uri = URI("#{API_URL}/ISteamUserStats/GetUserStatsForGame/v0002/")
    params = { key: ENV["STEAM_API_KEY"], steamid: steamid, appid: appid, l: 'es' }
    uri.query = URI.encode_www_form(params)

    res = Net::HTTP.get_response(uri)
    JSON.parse(res.body)
  end
end
