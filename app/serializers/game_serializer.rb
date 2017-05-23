class GameSerializer < ActiveModel::Serializer
  attributes :id, :date_played, :distance, :game_type, :volley_total, :location_id, :played_with, :location_name
  delegate :current_user, to: :scope

  def location_name
    Location.find_by(id: location_id).name
  end


  has_many :players, through: :game_players, :foreign_key => "user_id"
  belongs_to :location

end
