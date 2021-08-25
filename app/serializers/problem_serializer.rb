class ProblemSerializer < ActiveModel::Serializer
  attributes :id, :name, :difficulty, :wall_id, :categories, :layout, :wall

  has_many :approaches
  
  def wall
    ActiveModel::SerializableResource.new(object.wall,  each_serializer: WallSerializer)
  end

end
