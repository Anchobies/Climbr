class UserSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :email, :password, :username, :img_url
end
