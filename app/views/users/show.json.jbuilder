json.user do
  json.(@user, :name, :created_at)
  json.(@user, :email) if @user.id == current_user&.id
end

json.partial! "users/current"