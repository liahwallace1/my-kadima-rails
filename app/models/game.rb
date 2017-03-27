class Game < ApplicationRecord
  has_many :game_players
  has_many :players, through: :game_players
  belongs_to :location

  validates_presence_of :distance, :game_type, :volley_total
end
