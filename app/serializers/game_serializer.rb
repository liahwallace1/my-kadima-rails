class GameSerializer < ActiveModel::Serializer
  # has_many :game_players
  # has_many :players, through: :game_players, :foreign_key => "user_id"
  belongs_to :location

  attributes :id, :date_played, :distance, :game_type, :volley_total, :location, :played_with, :current_username
  delegate :current_user, to: :scope

  def current_username
    current_user.username
  end

end
