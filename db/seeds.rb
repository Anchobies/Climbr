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

gym1 = Gym.create(name: "Gym 1")
gym2 = Gym.create(name: "Gym 2")
gym3 = Gym.create(name: "Gym 3")
gym4 = Gym.create(name: "Gym 4")
gym5 = Gym.create(name: "Gym 5")

wall1 = Wall.create(name: "Wall 1", gym_id: gym1.id)
wall2 = Wall.create(name: "Wall 2", gym_id: gym1.id)
wall3 = Wall.create(name: "Wall 3", gym_id: gym2.id)
wall4 = Wall.create(name: "Wall 4", gym_id: gym3.id)
wall5 = Wall.create(name: "Wall 5", gym_id: gym4.id)
wall6 = Wall.create(name: "Wall 6", gym_id: gym5.id)

problem1 = Problem.create(name: "Problem 1", wall_id: wall1.id, difficulty: "V1", categories: [], layout: "[]")
problem2 = Problem.create(name: "Problem 2", wall_id: wall1.id, difficulty: "V2", categories: [], layout: "[]")
problem3 = Problem.create(name: "Problem 3", wall_id: wall2.id, difficulty: "V3", categories: [], layout: "[]")
problem4 = Problem.create(name: "Problem 4", wall_id: wall3.id, difficulty: "V4", categories: [], layout: "[]")
problem5 = Problem.create(name: "Problem 5", wall_id: wall4.id, difficulty: "V5", categories: [], layout: "[]")
problem6 = Problem.create(name: "Problem 6", wall_id: wall5.id, difficulty: "V6", categories: [], layout: "[]")
problem7 = Problem.create(name: "Problem 7", wall_id: wall6.id, difficulty: "V7", categories: [], layout: "[]")

user1 = User.create(full_name: "Anthony Chung", email: "anthonychung@gmail.com", password: "password", username: "Anchobies", img_url: "")
user2 = User.create(full_name: "Anthony2 Chung2", email: "anthonychung2@gmail.com", password: "password", username: "Anchobies2", img_url: "")
user3 = User.create(full_name: "Anthony3 Chung3", email: "anthonychung3@gmail.com", password: "password", username: "Anchobies3", img_url: "")
user4 = User.create(full_name: "Anthony4 Chung4", email: "anthonychung4@gmail.com", password: "password", username: "Anchobies4", img_url: "")
user5 = User.create(full_name: "Anthony5 Chung5", email: "anthonychung5@gmail.com", password: "password", username: "Anchobies5", img_url: "")

approach1 = Approach.create(user_id: user1.id, problem_id: problem1.id, steps: [
    [
      [nil, nil],
      [nil, nil],
      [nil, nil],
      [nil, nil],
    ]
  ])
approach2 = Approach.create(user_id: user1.id, problem_id: problem2.id, steps: [
    [
      [nil, nil],
      [nil, nil],
      [nil, nil],
      [nil, nil],
    ]
  ])
approach3 = Approach.create(user_id: user2.id, problem_id: problem1.id, steps: [
    [
      [nil, nil],
      [nil, nil],
      [nil, nil],
      [nil, nil],
    ]
  ])
approach4 = Approach.create(user_id: user2.id, problem_id: problem3.id, steps: [
    [
      [nil, nil],
      [nil, nil],
      [nil, nil],
      [nil, nil],
    ]
  ])
approach5 = Approach.create(user_id: user4.id, problem_id: problem4.id, steps: [
    [
      [nil, nil],
      [nil, nil],
      [nil, nil],
      [nil, nil],
    ]
  ])
approach6 = Approach.create(user_id: user4.id, problem_id: problem5.id, steps: [
    [
      [nil, nil],
      [nil, nil],
      [nil, nil],
      [nil, nil],
    ]
  ])
approach7 = Approach.create(user_id: user5.id, problem_id: problem6.id, steps: [
    [
      [nil, nil],
      [nil, nil],
      [nil, nil],
      [nil, nil],
    ]
  ])
approach8 = Approach.create(user_id: user5.id, problem_id: problem7.id, steps: [
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
