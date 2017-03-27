class CreateGames < ActiveRecord::Migration[5.0]
  def change
    create_table :games do |t|
      t.string :distance
      t.string :game_type
      t.integer :volley_total
      t.integer :location_id

      t.timestamps
    end
  end
end
