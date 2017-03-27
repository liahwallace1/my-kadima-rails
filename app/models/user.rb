class User < ApplicationRecord
  has_many :game_players, :foreign_key => "user_id"
  has_many :games, through: :game_players
  has_many :locations, through: :games

  has_secure_password

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
  validates :password, length: {in: 8..24}

end
