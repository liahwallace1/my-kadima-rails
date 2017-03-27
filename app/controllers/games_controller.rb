class GamesController < ApplicationController

  def show
    set_game
    if !logged_in?
      redirect_to root_path
    end
  end

  def new
    @game = Game.new
  end

  def create
    @game = Game.new(game_params)
    if @game.save
      redirect_to game_path(@game)
    else
      flash[:message] = @user.errors.full_messages.uniq.join(', ')
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

  def destroy
    set_user
    @user.destroy
    session.delete :user_id
    redirect_to root_path
  end

  private

  def set_game
    @game ||= Game.find_by_id(params[:id])
  end

  def game_params
    params.require(:game).permit(:total_volley, :turf, :distance, :game_type, :location_id)
  end

end
