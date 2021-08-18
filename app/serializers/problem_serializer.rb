class ProblemSerializer < ActiveModel::Serializer
  attributes :id, :name, :difficulty, :wall_id, :categories, :layout
end
