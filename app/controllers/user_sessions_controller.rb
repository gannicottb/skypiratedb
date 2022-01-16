class UserSessionsController < ApplicationController
  def new
  end

  def create
    @user = login(user_params[:email], user_params[:password])

    if @user
      redirect_back_or_to("/", notice: "Login successful")
    else
      # flash.now[:alert] = "Login failed"
      # render action: "new"
      render json: { message: "Login failed" }
    end
  end

  def destroy
    logout
    redirect_to(:users, notice: "Logged out!")
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
