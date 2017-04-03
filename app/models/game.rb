class Game < ApplicationRecord
  has_many :game_players
  has_many :players, through: :game_players, :foreign_key => "user_id"
  belongs_to :location

  validates_presence_of :date_played, :distance, :game_type, :volley_total
  validate :date_played_cannot_be_in_the_future

  before_save :user_is_player

  def date_played_cannot_be_in_the_future
   if date_played.present? && date_played > Date.today
     errors.add(:date_played, "can't be in the future")
   end
 end

  def played_with=(player_list)
    self.players = player_list.split(', ').map do |player_name|
      User.find_by(username: player_name.strip)
    end.compact
  end

  def played_with
    players.map{|p| p.username }.join.(', ') if save
  end

  def user_is_player
    if user && !players.include?(user)
      players << user
    end
  end

end
