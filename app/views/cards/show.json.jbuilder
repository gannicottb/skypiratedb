json.card do
  json.partial! "cards/card", obj: @card
end

if @current_user
  json.current_user do
    json.(@current_user, :email, :name)
  end
end