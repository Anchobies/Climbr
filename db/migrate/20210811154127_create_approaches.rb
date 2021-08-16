class CreateApproaches < ActiveRecord::Migration[6.1]
  def change
    create_table :approaches do |t|
      t.string :steps, array: true, default: []
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :problem, null: false, foreign_key: true
      t.timestamps
    end
  end
end
