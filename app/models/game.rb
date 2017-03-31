class Game < ApplicationRecord
  has_many :game_players
  has_many :players, through: :game_players, :foreign_key => "user_id"
  belongs_to :location

  validates_presence_of :date_played, :distance, :game_type, :volley_total
  validate :date_played_cannot_be_in_the_future

  def date_played_cannot_be_in_the_future
   if date_played.present? && date_played > Date.today
     errors.add(:date_played, "can't be in the future")
   end

  def played_with=(new_players)
    self.players = new_players.split(',').map do |name|
      User.find_by(username: username.strip)
    end.compact
  end

  def played_with
    self.players.map {|p| p.username }.join.(', ')
  end

end
