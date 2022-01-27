json.user do
  json.(user, :id, :name, :created_at)
  json.(user, :email) if user.id == current_user&.id
end