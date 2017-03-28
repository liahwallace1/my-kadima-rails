class SessionsController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.find_by(username: params[:user][:username])
    @user = @user.try(:authenticate, params[:user][:password])
    return redirect_to('/login') unless @user
    session[:user_id] = @user.id
    redirect_to user_path(@user)
  end

  def destroy
    session.delete :user_id
    redirect_to root_path
  end

end
