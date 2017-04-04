class Location < ApplicationRecord
  has_many :games
  has_many :players, through: :games

  validates :name, presence: true, uniqueness: {scope: :city, message: "should be unique to city"}

  def rank
  end

end
