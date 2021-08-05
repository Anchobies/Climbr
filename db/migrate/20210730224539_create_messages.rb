class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.belongs_to :chat, null: false, foreign_key: true
      t.string :comment
      t.string :img_url
      t.integer :created_at, null: false
      t.integer :updated_at, null: false
    end
  end
end
