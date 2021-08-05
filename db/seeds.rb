# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Hive.destroy_all
Bee.destroy_all

user1 = User.create(first_name: "Anthony", last_name: "Chung", email: "anthonychung@gmail.com", password: "password", username: "Anchobies", img_url: "")
user2 = User.create(first_name: "Anthony2", last_name: "Chung2", email: "anthonychung2@gmail.com", password: "password", username: "Anchobies2", img_url: "")
user3 = User.create(first_name: "Anthony3", last_name: "Chung3", email: "anthonychung3@gmail.com", password: "password", username: "Anchobies3", img_url: "")
user4 = User.create(first_name: "Anthony4", last_name: "Chung4", email: "anthonychung4@gmail.com", password: "password", username: "Anchobies4", img_url: "")
user5 = User.create(first_name: "Anthony5", last_name: "Chung5", email: "anthonychung5@gmail.com", password: "password", username: "Anchobies5", img_url: "")

hive1 = Hive.create(name: "Sample Hive", queen_bee_id: user1.id)
hive2 = Hive.create(name: "Sample Hive 2", queen_bee_id: user2.id)
hive3 = Hive.create(name: "Sample Hive 3", queen_bee_id: user3.id)
hive4 = Hive.create(name: "Sample Hive 4", queen_bee_id: user1.id)
hive5 = Hive.create(name: "Sample Hive 5", queen_bee_id: user2.id)

Bee.create(user_id: user1.id, hive_id: hive1.id)
Bee.create(user_id: user2.id, hive_id: hive2.id)
Bee.create(user_id: user3.id, hive_id: hive3.id)
Bee.create(user_id: user1.id, hive_id: hive2.id)
Bee.create(user_id: user2.id, hive_id: hive3.id)

relationship1 = Relationship.create(friends: true, sender_id: user1.id, receiver_id: user2.id)
relationship2 =Relationship.create(friends: false, sender_id: user1.id, receiver_id: user3.id)
relationship3 =Relationship.create(friends: true, sender_id: user2.id, receiver_id: user1.id)
relationship4 =Relationship.create(friends: false, sender_id: user3.id, receiver_id: user1.id)
relationship5 =Relationship.create(friends: true, sender_id: user3.id, receiver_id: user2.id)

chat1 = Chat.create(relationship_id: relationship1.id, hive_id: hive1.id)
chat2 = Chat.create(relationship_id: relationship2.id, hive_id: hive1.id)
chat3 = Chat.create(relationship_id: relationship1.id, hive_id: hive2.id)
chat4 = Chat.create(relationship_id: relationship2.id, hive_id: hive3.id)
chat5 = Chat.create(relationship_id: relationship3.id, hive_id: hive2.id)

Message.create(comment: "You are awesome", img_url: "", chat_id: chat1.id)
Message.create(comment: "You are kind", img_url: "", chat_id: chat1.id)
Message.create(comment: "You are pretty", img_url: "", chat_id: chat2.id)
Message.create(comment: "You are smart", img_url: "", chat_id: chat3.id)
Message.create(comment: "You are pleasant", img_url: "", chat_id: chat4.id)

puts "Seeding complete :)"
