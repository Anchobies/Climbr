class CreateHives < ActiveRecord::Migration[6.1]
  def change
    create_table :hives do |t|
      t.string :name
      t.integer :queen_bee_id
      t.timestamps
    end
  end
end
