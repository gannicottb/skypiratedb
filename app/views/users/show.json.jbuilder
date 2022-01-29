json.user do
  json.partial! "users/user", user: @user
end

json.partial! "users/current"