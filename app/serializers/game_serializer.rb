class GameSerializer < ActiveModel::Serializer
  attributes :id, :date_played, :distance, :game_type, :volley_total, :location_id, :played_with, :links
  delegate :current_user, to: :scope

  attribute :links do
    game_id = object.id
    user_id = current_user.id
    {
      game_url: "/games/#{game_id}",
      user_games_url: "/users/#{user_id}/games"
    }
  end

  has_many :game_players
  has_many :players, through: :game_players, :foreign_key => "user_id"
  belongs_to :location
end
