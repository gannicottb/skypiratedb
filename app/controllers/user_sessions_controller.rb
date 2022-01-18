class UserSessionsController < ApplicationController
  before_action -> { check_flag(USER_ACCOUNTS) }

  # LoginForm
  def new
  end

  def create
    @user = login(user_params[:email], user_params[:password])

    if @user
      redirect_back_or_to("/", notice: "Login successful")
    else
      flash[:alert] = "Login failed"
      render action: :new
    end
  end

  def destroy
    logout
    redirect_to("/", notice: "Logged out!")
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
