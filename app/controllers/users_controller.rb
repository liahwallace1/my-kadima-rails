class UsersController < ApplicationController

  def show
    set_user
    if !logged_in?
      redirect_to root_path
    end
    respond_to do |f|
      f.html
      f.json {render json: @user}
    end
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to user_path(@user), notice: "User successfully created."
    else
      flash[:error] = @user.errors.full_messages.join("; ")
      render :new
    end
  end

  def edit
    set_user
  end

  def update
    set_user
    @user.update(user_params)
    redirect_to user_path(@user)
  end

  # def destroy
  #   set_user
  #   @user.destroy
  #   session.delete :user_id
  #   redirect_to root_path, notice: "User destroyed."
  # end

  private

  def set_user
    @user ||= User.find_by_id(params[:id])
  end

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end

end
