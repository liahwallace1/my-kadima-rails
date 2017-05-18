class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_many :games, through: :game_players
  has_many :locations, through: :games
end
