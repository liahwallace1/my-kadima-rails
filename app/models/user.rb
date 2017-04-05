class User < ApplicationRecord
  has_many :game_players, :foreign_key => "user_id"
  has_many :games, through: :game_players
  has_many :locations, through: :games

  has_secure_password

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :password, length: {in: 8..24}

  ## METHOD FOR OMNIAUTH

  def self.find_or_create_by_omniauth(auth_hash)
    self.where(:uid => auth_hash["uid"]).first_or_create do |user|
      user.username = auth_hash["info"]["name"]
      user.email = "#{auth['uid']}@#{auth['provider']}.com"
      user.password = SecureRandom.hex
    end
  end

  ## METHODS FOR GAME STATS

  def high_score_single
  end

  def high_score_group
  end

  def best_partner
  end

  def best_group
  end

  def frequent_partner
  end

  def frequent_location
  end

end
