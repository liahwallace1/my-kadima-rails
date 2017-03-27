class CreateLocations < ActiveRecord::Migration[5.0]
  def change
    create_table :locations do |t|
      t.string :name
      t.string :city
      t.string :state
      t.boolean :lighting
      t.string :turf

      t.timestamps
    end
  end
end
