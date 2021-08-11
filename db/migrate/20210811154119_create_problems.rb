class CreateProblems < ActiveRecord::Migration[6.1]
  def change
    create_table :problems do |t|
      t.string :name
      t.belongs_to :wall, null: false, foreign_key: true
      t.string :difficulty
      t.string :categories, array: true, default: []
      t.timestamps
    end
  end
end
