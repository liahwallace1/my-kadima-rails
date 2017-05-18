class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_many :game_players, :foreign_key => "user_id"
  has_many :games, through: :game_players
  has_many :locations, through: :games
end
