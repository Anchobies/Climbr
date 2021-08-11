class CreateUserProblems < ActiveRecord::Migration[6.1]
  def change
    create_table :user_problems do |t|
      t.string :status
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :problem, null: false, foreign_key: true
      t.timestamps
    end
  end
end
