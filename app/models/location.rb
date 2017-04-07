class Location < ApplicationRecord
  has_many :games
  has_many :players, through: :games

  validates :name, presence: true, uniqueness: {scope: :city, message: "should be unique to city"}

  ##CLASS METHODS

  def self.locations_with_lighting
    self.where("lighting=?", true)
  end

  def self.rank_list
    self.all.sort_by(&:number_of_games)
  end

  def self.favorite_by_player(player)
    self.where(players: {id: player.id}).select("locations.*, COUNT(players.id) AS p_count").includes(games: :players).group("locations.id").order("p_count DESC").limit(1)
  end

  ## INSTANCE METHODS

  def number_of_games
    self.games.count
  end

  def rank
    self.class.rank_list.index(self) + 1
  end

end
