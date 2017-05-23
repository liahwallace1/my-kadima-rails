class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :high_score_single_score, :high_score_single_partner, :high_score_group_score, :high_score_group_partners, :frequent_partner_name, :frequent_location_name, :number_of_games

  delegate :current_user, to: :scope

  def number_of_games
    current_user.games.count
  end

  # def one_on_one_stat
  #   if current_user.single_game_exist?
  #     "#{current_user.high_score_single_score} volleys with Player #{current_user.high_score_single_partner}"
  #   else
  #     "No one-on-one games yet!"
  #   end
  # end
  #
  # def group_stat
  #   if current_user.multi_game_exist?
  #     "#{current_user.high_score_group_score} volleys with Players #{current_user.high_score_group_partners}"
  #   else
  #     "No one-on-one games yet!"
  #   end
  # end

  has_many :game_players, :foreign_key => "user_id"
  has_many :games, through: :game_players
  has_many :locations, through: :games
end
