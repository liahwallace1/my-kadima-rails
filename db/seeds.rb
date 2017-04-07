# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
sara = User.create(username: "Sara", email: "sara@test.com", password: "testtest", password_confirmation: "testtest")
jenna = User.create(username: "Jenna", email: "jenna@test.com", password: "testtest", password_confirmation: "testtest")
anna = User.create(username: "Anna", email: "anna@test.com", password: "testtest", password_confirmation: "testtest")
rob = User.create(username: "Rob", email: "rob@test.com", password: "testtest", password_confirmation: "testtest")
dave = User.create(username: "Dave", email: "dave@test.com", password: "testtest", password_confirmation: "testtest")

Location.create(name: "Congress St. Courts", city: "Charleston", state: "SC", lighting: true, turf: "clay")
Location.create(name: "Allen Park", city: "Charleston", state: "SC", lighting: false, turf: "grass")
Location.create(name: "Edisto Beach", city: "Edisto", state: "SC", lighting: false, turf: "sand")

game1 = Game.create(date_played: Date.new(2017, 2, 3), distance: "medium", game_type: "one-on-one", volley_total: 45)
game1.players = "Sara, Jenna"
game2 = Game.create(date_played: Date.new(2017, 2, 23), distance: "short", game_type: "one-on-one", volley_total: 22)
game2.players = "Sara, Dan"
game3 = Game.create(date_played: Date.new(2017, 3, 13), distance: "long", game_type: "one-on-one", volley_total: 34)
game3.players = "Liah, Jenna"
game4 = Game.create(date_played: Date.new(2017, 4, 2), distance: "medium", game_type: "one-on-one", volley_total: 49)
game4.players = "Rob, Dave"
game5 = Game.create(date_played: Date.new(2017, 4, 1), distance: "short", game_type: "one-on-one", volley_total: 26)
game5.players = "Anna, Dan"
game6 = Game.create(date_played: Date.new(2017, 3, 7), distance: "medium", game_type: "multi-player", volley_total: 54)
game6.players = "Sara, Jenna, Dan, Liah"
game7 = Game.create(date_played: Date.new(2017, 3, 17), distance: "short", game_type: "multi-player", volley_total: 31)
game7.players = "Sara, Jenna, Anna, Liah"
game8 = Game.create(date_played: Date.new(2017, 3, 20), distance: "long", game_type: "multi-player", volley_total: 60)
game8.players = "Sara, Dan, Rob"
game9 = Game.create(date_played: Date.new(2017, 2, 26), distance: "medium", game_type: "multi-player", volley_total: 18)
game9.players = "Dave, Jenna, Liah"
game10 = Game.create(date_played: Date.new(2017, 4, 5), distance: "short", game_type: "multi-player", volley_total: 34)
game10.players = "Dan, Jenna, Sara, Rob, Dave, Liah, Anna"
