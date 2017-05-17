class GameSerializer < ActiveModel::Serializer
  attributes :id, :date_played, :distance, :game_type, :volley_total, :location_id

  has_many :game_players
  has_many :players, through: :game_players, :foreign_key => "user_id"
  belongs_to :location
end
