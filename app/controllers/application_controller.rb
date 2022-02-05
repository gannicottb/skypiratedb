class ApplicationController < ActionController::Base
  # Define feature flags here
  USER_ACCOUNTS = true

  # KISS: use in before_action to just 404 if the given flag is false
  def check_flag(flag)
    render(plain: "Feature Inactive") unless flag
  end
end
