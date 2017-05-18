class LocationSerializer < ActiveModel::Serializer
  attributes :id, :name, :city, :state, :lighting, :turf

  has_many :games
end
