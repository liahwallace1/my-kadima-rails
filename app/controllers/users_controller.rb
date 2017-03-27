class UsersController < ApplicationController

  def show
    set_user
    if !logged_in?
      redirect_to root_path
    end
  end

  def create

  end

  private

  def set_user
    @user ||= User.find_by_id(params[:id])
  end

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end

end
