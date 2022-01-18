class ApplicationController < ActionController::Base
  # Define feature flags here
  USER_ACCOUNTS = false

  # KISS: use in before_action to just 404 if the given flag is false
  def check_flag(flag)
    raise ActionController::RoutingError.new("Not Found") unless flag
  end
end
