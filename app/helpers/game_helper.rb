module GameHelper

  def distance_options
    %w(short medium long)
  end

  def game_type_options
    %w(one-on-one multi-player)
  end

  def set_date_from_inputs(date_hash)
    %w(1 2 3).map {|d| date_hash["date_played(#{d}i)"].to_i }
  end

end
