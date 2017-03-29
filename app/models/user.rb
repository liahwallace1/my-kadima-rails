class User < ApplicationRecord
  has_many :game_players, :foreign_key => "user_id"
  has_many :games, through: :game_players
  has_many :locations, through: :games

  has_secure_password

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :password, length: {in: 8..24}

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
