class GamesController < ApplicationController

  def show
    set_game
    if !logged_in?
      redirect_to root_path
    end
  end

  def new
  end

  def create
    @game = Game.new(game_params)
    if @game.save
      redirect_to game_path(@game)
    else
      flash[:message] = @game.errors.full_messages.uniq.join(', ')
      render :new
    end
  end

  def edit
    set_game
  end

  def update
    set_game
    @user.update(game_params)
    redirect_to game_path(@game)
  end

  private

  def set_game
    @game ||= Game.find_by_id(params[:id])
  end

  def game_params
    params.require(:game).permit(:total_volley, :turf, :distance, :game_type, :location_id, :played_with)
  end

end
