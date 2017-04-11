module GameHelper

  def distance_options
    %w(short medium long).collect {|d| [d, d]}
  end

  def game_type_options
    %w(one-on-one multi-player).collect {|g| [g, g]}
  end

  def location_options
    Location.all.collect { |l| ["#{l.name}, #{l.city}, #{l.state}", l.id] }
  end

  def set_date_from_inputs(date_hash)
    %w(1 2 3).map {|d| date_hash["date_played(#{d}i)"].to_i }
  end

  def date_formatted(game)
    game.date_played.strftime("%m/%d/%Y")
  end

end
