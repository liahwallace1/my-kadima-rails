class GameSerializer < ActiveModel::Serializer
  attributes :id, :date_played, :distance, :game_type, :volley_total, :location_id, :played_with, :current_user_name
  delegate :current_user, to: :scope

  has_many :players, through: :game_players, :foreign_key => "user_id"
  belongs_to :location

  def current_user_name
    current_user.username
  end
end
