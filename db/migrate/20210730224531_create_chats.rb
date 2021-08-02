class CreateChats < ActiveRecord::Migration[6.1]
  def change
    create_table :chats do |t|
      t.belongs_to :relationship, null: false, foreign_key: true
      t.belongs_to :hive, null: false, foreign_key: true
      t.timestamps
    end
  end
end
