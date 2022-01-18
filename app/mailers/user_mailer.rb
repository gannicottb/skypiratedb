class UserMailer < ApplicationMailer
  def reset_password_email(user)
    @user = User.find user.id
    @url = edit_password_reset_url(@user.reset_password_token)
    mail(to: user.email, subject: "Password reset for SkyPirateDB")
  end

  def activation_needed_email(user)
    @user = user
    @url = activate_user_url(@user.activation_token)
    mail(to: user.email, subject: "Activate your new SkyPirateDB account")
  end

  def test_mail(user)
    @user = user
    mail(to: user.email, subject: "Test from SkyPirateDB")
  end
end
