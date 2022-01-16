json.user do
  json.(@user, :email, :name)
end

json.partial! "users/current"