# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Gym.destroy_all
Wall.destroy_all
Problem.destroy_all
User.destroy_all
Approach.destroy_all
UserProblem.destroy_all

gym1 = Gym.create(name: "Earth Trek - Columbia", img_url:"https://icon-library.com/images/photo-placeholder-icon/photo-placeholder-icon-24.jpg")
gym2 = Gym.create(name: "Earth Trek - Rockville", img_url:"https://icon-library.com/images/photo-placeholder-icon/photo-placeholder-icon-24.jpg")
gym3 = Gym.create(name: "Earth Trek - Crystal City", img_url:"https://icon-library.com/images/photo-placeholder-icon/photo-placeholder-icon-24.jpg")
gym4 = Gym.create(name: "Brooklyn Boulders - NY", img_url:"https://icon-library.com/images/photo-placeholder-icon/photo-placeholder-icon-24.jpg")
gym5 = Gym.create(name: "Brooklyn Boulders - DC", img_url:"https://icon-library.com/images/photo-placeholder-icon/photo-placeholder-icon-24.jpg")

wall1 = Wall.create(name: "Flatty", gym_id: gym1.id)
wall2 = Wall.create(name: "Iron", gym_id: gym1.id)
wall3 = Wall.create(name: "Bumpy", gym_id: gym2.id)
wall4 = Wall.create(name: "Wowzers", gym_id: gym3.id)
wall5 = Wall.create(name: "EZPZ", gym_id: gym4.id)
wall6 = Wall.create(name: "GoodLuck", gym_id: gym5.id)

problem1 = Problem.create(name: "Cliffhanger", wall_id: wall1.id, difficulty: "V1", categories: [], layout: "")
problem2 = Problem.create(name: "Baby", wall_id: wall1.id, difficulty: "V2", categories: [], layout: "")
problem3 = Problem.create(name: "Alien", wall_id: wall2.id, difficulty: "V3", categories: [], layout: "")
problem4 = Problem.create(name: "Rainbow", wall_id: wall3.id, difficulty: "V4", categories: [], layout: "")
problem5 = Problem.create(name: "Peanut", wall_id: wall4.id, difficulty: "V5", categories: [], layout: "")
problem6 = Problem.create(name: "Pyramids", wall_id: wall5.id, difficulty: "V6", categories: [], layout: "")
problem7 = Problem.create(name: "Upside Down", wall_id: wall6.id, difficulty: "V7", categories: [], layout: "")

user1 = User.create(full_name: "Anthony Chung", email: "anthonychung@gmail.com", password: "password", username: "Anchobies", img_url: "https://us.123rf.com/450wm/yupiramos/yupiramos1706/yupiramos170614990/80116103-avatar-user-isolated-icon-vector-illustration-design.jpg?ver=6")
user2 = User.create(full_name: "Adam Johnson", email: "adamjohnson@gmail.com", password: "password", username: "AdamJWo", img_url: "https://us.123rf.com/450wm/yupiramos/yupiramos1706/yupiramos170614990/80116103-avatar-user-isolated-icon-vector-illustration-design.jpg?ver=6")
user3 = User.create(full_name: "John Smith", email: "johnsmith@gmail.com", password: "password", username: "xXNinjaXx", img_url: "https://us.123rf.com/450wm/yupiramos/yupiramos1706/yupiramos170614990/80116103-avatar-user-isolated-icon-vector-illustration-design.jpg?ver=6")
user4 = User.create(full_name: "Smith Johnson", email: "smithjohnson.com", password: "password", username: "rdy2fight", img_url: "https://us.123rf.com/450wm/yupiramos/yupiramos1706/yupiramos170614990/80116103-avatar-user-isolated-icon-vector-illustration-design.jpg?ver=6")
user5 = User.create(full_name: "Johnsmith Adamson", email: "johnsmithadamson@gmail.com", password: "password", username: "animeRocks", img_url: "https://us.123rf.com/450wm/yupiramos/yupiramos1706/yupiramos170614990/80116103-avatar-user-isolated-icon-vector-illustration-design.jpg?ver=6")

approach1 = Approach.create(user_id: user1.id, name: "Superman", problem_id: problem1.id, steps: [
    [
      [nil, nil],
      [nil, nil],
      [nil, nil],
      [nil, nil],
    ]
  ])
approach2 = Approach.create(user_id: user1.id, name: "Big Leap", problem_id: problem2.id, steps: [
    [
      [nil, nil],
      [nil, nil],
      [nil, nil],
      [nil, nil],
    ]
  ])
approach3 = Approach.create(user_id: user2.id, name: "Dynamo", problem_id: problem1.id, steps: [
    [
      [nil, nil],
      [nil, nil],
      [nil, nil],
      [nil, nil],
    ]
  ])
approach4 = Approach.create(user_id: user2.id, name: "Ouch", problem_id: problem3.id, steps: [
    [
      [nil, nil],
      [nil, nil],
      [nil, nil],
      [nil, nil],
    ]
  ])
approach5 = Approach.create(user_id: user4.id, name: "Walk in the Park", problem_id: problem4.id, steps: [
    [
      [nil, nil],
      [nil, nil],
      [nil, nil],
      [nil, nil],
    ]
  ])
approach6 = Approach.create(user_id: user4.id, name: "Uhhhh", problem_id: problem5.id, steps: [
    [
      [nil, nil],
      [nil, nil],
      [nil, nil],
      [nil, nil],
    ]
  ])
approach7 = Approach.create(user_id: user5.id, name: "I love Flatiron", problem_id: problem6.id, steps: [
    [
      [nil, nil],
      [nil, nil],
      [nil, nil],
      [nil, nil],
    ]
  ])
approach8 = Approach.create(user_id: user5.id, name: "Leroy", problem_id: problem7.id, steps: [
    [
      [nil, nil],
      [nil, nil],
      [nil, nil],
      [nil, nil],
    ]
  ])

user_problem1 = UserProblem.create(user_id: user1.id, problem_id: problem1.id, status: [])
user_problem2 = UserProblem.create(user_id: user1.id, problem_id: problem2.id, status: [])
user_problem3 = UserProblem.create(user_id: user2.id, problem_id: problem1.id, status: [])
user_problem4 = UserProblem.create(user_id: user2.id, problem_id: problem3.id, status: [])
user_problem5 = UserProblem.create(user_id: user4.id, problem_id: problem4.id, status: [])
user_problem6 = UserProblem.create(user_id: user4.id, problem_id: problem5.id, status: [])
user_problem7 = UserProblem.create(user_id: user5.id, problem_id: problem6.id, status: [])
user_problem8 = UserProblem.create(user_id: user5.id, problem_id: problem7.id, status: [])

puts "Seeding complete :)"
