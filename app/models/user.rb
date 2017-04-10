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
      user.password = SecureRandom.hex(8)
      user.password_confirmation = user.password
      user.save!
    end
  end

  ## METHODS FOR GAME STATS

  def high_score_single_game
    self.games.where("game_type=?", "one-on-one").order("volley_total desc").limit(1)
  end

  def high_score_single_score
    self.high_score_single_game.pluck(:volley_total)[0]
  end

  def high_score_single_partner
    self.high_score_single_game[0].players.where.not(id: self.id).pluck(:username)[0]
  end

  def high_score_group_game
    self.games.where("game_type=?", "multi-player").order("volley_total desc").limit(1)
  end

  def high_score_group_score
  self.high_score_group_game.pluck(:volley_total)[0]
  end

  def high_score_group_partners
    self.high_score_group_game[0].players.where.not(id: self.id).pluck(:username).to_sentence
  end

  def frequent_partner_name
    player_array = self.games.map { |game| game.players.where.not(id: self.id).pluck(:username)}
    player_array.flatten!
    freq = player_array.inject(Hash.new(0)) {|k, v| k[v] += 1; k }
    player_array.max_by { |v| freq[v]}
  end


  def frequent_location_name
    location_array = self.games.map { |game| game.location.name }
    freq = location_array.inject(Hash.new(0)) {|k, v| k[v] += 1; k }
    location_array.max_by { |v| freq[v]}
  end

  def game_number(game)
    number = self.games.index(game) + 1
    number.ordinalize
  end

end
