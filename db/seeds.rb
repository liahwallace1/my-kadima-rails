# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
liah = User.create(username: "Liah", email: "liah@test.com", password: "testtest", password_confirmation: "testtest")
dan = User.create(username: "Dan", email: "dan@test.com", password: "testtest", password_confirmation: "testtest")
sara = User.create(username: "Sara", email: "sara@test.com", password: "testtest", password_confirmation: "testtest")
jenna = User.create(username: "Jenna", email: "jenna@test.com", password: "testtest", password_confirmation: "testtest")
anna = User.create(username: "Anna", email: "anna@test.com", password: "testtest", password_confirmation: "testtest")
rob = User.create(username: "Rob", email: "rob@test.com", password: "testtest", password_confirmation: "testtest")
dave = User.create(username: "Dave", email: "dave@test.com", password: "testtest", password_confirmation: "testtest")

Location.create(name: "Congress St. Courts", city: "Charleston", state: "SC", lighting: true, turf: "clay")
Location.create(name: "Allen Park", city: "Charleston", state: "SC", lighting: false, turf: "grass")
Location.create(name: "Edisto Beach", city: "Edisto", state: "SC", lighting: false, turf: "sand")
Location.create(name: "Hampton Park", city: "Charleston", state: "SC", lighting: false, turf: "grass")

game1 = Game.create(date_played: Date.new(2017, 2, 3), distance: "medium", game_type: "one-on-one", volley_total: 45, location_id: 1)
game1.played_with = "Sara, Jenna"
game2 = Game.create(date_played: Date.new(2017, 2, 23), distance: "short", game_type: "one-on-one", volley_total: 22, location_id: 2)
game2.played_with = "Sara, Dan"
game3 = Game.create(date_played: Date.new(2017, 3, 13), distance: "long", game_type: "one-on-one", volley_total: 34, location_id: 1)
game3.played_with = "Liah, Jenna"
game4 = Game.create(date_played: Date.new(2017, 4, 2), distance: "medium", game_type: "one-on-one", volley_total: 49, location_id: 3)
game4.played_with = "Rob, Dave"
game5 = Game.create(date_played: Date.new(2017, 4, 1), distance: "short", game_type: "one-on-one", volley_total: 26, location_id: 4)
game5.played_with = "Anna, Dan"
game6 = Game.create(date_played: Date.new(2017, 3, 7), distance: "medium", game_type: "multi-player", volley_total: 54, location_id: 4)
game6.played_with = "Sara, Jenna, Dan, Liah"
game7 = Game.create(date_played: Date.new(2017, 3, 17), distance: "short", game_type: "multi-player", volley_total: 31, location_id: 3)
game7.played_with = "Sara, Jenna, Anna, Liah"
game8 = Game.create(date_played: Date.new(2017, 3, 20), distance: "long", game_type: "multi-player", volley_total: 60, location_id: 2)
game8.played_with = "Sara, Dan, Rob"
game9 = Game.create(date_played: Date.new(2017, 2, 26), distance: "medium", game_type: "multi-player", volley_total: 18, location_id: 1)
game9.played_with = "Dave, Jenna, Liah"
game10 = Game.create(date_played: Date.new(2017, 4, 5), distance: "short", game_type: "multi-player", volley_total: 34, location_id: 4)
game10.played_with = "Dan, Jenna, Sara, Rob, Dave, Liah, Anna"
