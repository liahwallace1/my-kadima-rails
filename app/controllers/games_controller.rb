class GamesController < ApplicationController

  def index
    if params[:user_id]
      @games = User.find(params[:user_id]).games
    else
      @games = Game.all
    end
  end

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
    @game.date_played = Date.new(params[:game]["date_played(1i)"].to_i, params[:game]["date_played(2i)"].to_i, params[:game]["date_played(3i)"].to_i)
    if @game.save
      @game.played_with = params[:game][:played_with]
      @game.save
      redirect_to game_path(@game)
    else
      flash[:error] = @game.errors.full_messages.uniq.join(', ')
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
    params.require(:game).permit(:date_played, :volley_total, :distance, :game_type, :location_id)
  end

end
