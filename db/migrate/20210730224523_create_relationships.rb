class CreateRelationships < ActiveRecord::Migration[6.1]
  def change
    create_table :relationships do |t|
      t.boolean :friends
      t.integer :sender_id
      t.integer :receiver_id
      t.timestamps
    end
  end
end
