class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.belongs_to :chat, null: false, foreign_key: true
      t.string :comment
      t.string :img_url
      t.timestamps
    end
  end
end
