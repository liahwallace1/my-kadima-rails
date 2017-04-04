class Game < ApplicationRecord
  has_many :game_players
  has_many :players, through: :game_players, :foreign_key => "user_id"
  belongs_to :location

  validates_presence_of :date_played, :distance, :game_type, :volley_total
  validate :date_played_cannot_be_in_the_future
  validate :two_types_of_games
  validate :three_distance_options


## VALIDATION METHODS ##
  def date_played_cannot_be_in_the_future
   if date_played.present? && date_played > Date.today
     errors.add(:date_played, "can't be in the future")
   end
 end

 def two_types_of_games
   if game_type != 'one-on-one' && game_type != 'multi-player'
     errors.add(:game_type, "must be 'one-on-one' OR 'multi-player'")
   end
 end

 def three_distance_options
   if distance != 'short' && distance != 'medium' && distance != 'long'
     errors.add(:distance, "must be 'short', 'medium', OR 'long'")
   end
 end

## CUSTOM SETTER FOR PLAYERS ##

  def played_with=(player_list)
    player_list.split(', ').map do |player_name|
      player = User.find_by(username: player_name.strip)
      self.players << player unless self.players.include?(player)
    end.compact
  end

  def played_with
    players.map{|p| p.username }.join.(', ') if save
  end


  ## SCOPE METHODS FOR STATS ##

end
