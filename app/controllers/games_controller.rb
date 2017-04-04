class GamesController < ApplicationController
  before_action :require_login

  def index
    if params[:user_id]
      @games = User.find(params[:user_id]).games
    else
      @games = Game.all
    end
  end

  def show
    set_game
  end

  def new
  end

  def create
    @game = Game.create(game_params)
    @game.date_played = Date.new(params[:game]["date_played(1i)"].to_i, params[:game]["date_played(2i)"].to_i, params[:game]["date_played(3i)"].to_i)
    if @game.save
      @game.played_with = params[:game][:played_with]
      creator_is_player
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

  def require_login
    redirect_to root_path unless session.include? :user_id
  end

  def set_game
    @game ||= Game.find_by_id(params[:id])
  end

  def creator_is_player
    if current_user && !@game.players.include?(current_user)
      @game.players << current_user
    end
  end

  def game_params
    params.require(:game).permit(:date_played, :volley_total, :distance, :game_type, :location_id)
  end

end
