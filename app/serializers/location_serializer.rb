class LocationSerializer < ActiveModel::Serializer
  attributes :id, :name, :city, :state, :lighting, :turf, :rank, :total_locations

  has_many :games

  def total_locations
    Location.all.size
  end
end
