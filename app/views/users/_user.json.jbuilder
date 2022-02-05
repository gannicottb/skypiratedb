json.(user, :id, :name, :created_at)
if user.id == current_user&.id
  json.(user, :email) 
end
