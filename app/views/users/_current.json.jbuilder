if current_user.present?
  json.current_user do
    json.(current_user, :name, :id)
  end
end