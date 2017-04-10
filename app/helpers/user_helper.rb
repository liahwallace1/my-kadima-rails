module UserHelper

  def single_game_exist?
    !@user.games.where("game_type=?", "one-on-one").empty?
  end

  def multi_game_exist?
    !@user.games.where("game_type=?", "multi-player").empty?
  end

end
