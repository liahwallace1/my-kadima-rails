class User < ApplicationRecord
  has_many :game_players, :foreign_key => "user_id"
  has_many :games, through: :game_players
  has_many :locations, through: :games

  has_secure_password

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :password, length: {in: 8..24}
  validates_confirmation_of :password

  ## METHOD FOR OMNIAUTH

  def self.find_or_create_by_omniauth(auth_hash)
    self.where(:uid => auth_hash["uid"]).first_or_create do |user|
      user.username = auth_hash["info"]["name"]
      user.email = "#{auth_hash["uid"]}@#{auth_hash["provider"]}.com"
      user.password = SecureRandom.hex
      user.password_confirmation = user.password
    end
  end

  ## METHODS FOR GAME STATS

  def high_score_single
    self.games.where("game_type=?", "one-on-one").limit(1).order("volley_count desc")
  end

  def high_score_group
    self.games.where("game_type=?", "multi-player").limit(1).order("volley_count desc")
  end

  def best_partner
    self.high_score_single.played_with.username
  end

  def frequent_partner

  end

  def frequent_location
    #find the number of games played at each location for the user
    #sort by that and return location with highest number_of_games
    self.games.sort_by {|game| }
  end

end
