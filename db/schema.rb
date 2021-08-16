# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_08_11_154150) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "approaches", force: :cascade do |t|
    t.string "steps", default: [], array: true
    t.bigint "user_id", null: false
    t.bigint "problem_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["problem_id"], name: "index_approaches_on_problem_id"
    t.index ["user_id"], name: "index_approaches_on_user_id"
  end

  create_table "gyms", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "problems", force: :cascade do |t|
    t.string "name"
    t.bigint "wall_id", null: false
    t.string "difficulty"
    t.string "categories", default: [], array: true
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["wall_id"], name: "index_problems_on_wall_id"
  end

  create_table "user_problems", force: :cascade do |t|
    t.string "status"
    t.bigint "user_id", null: false
    t.bigint "problem_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["problem_id"], name: "index_user_problems_on_problem_id"
    t.index ["user_id"], name: "index_user_problems_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "full_name"
    t.string "email"
    t.string "password_digest"
    t.string "username"
    t.string "img_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "walls", force: :cascade do |t|
    t.string "name"
    t.bigint "gym_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["gym_id"], name: "index_walls_on_gym_id"
  end

  add_foreign_key "approaches", "problems"
  add_foreign_key "approaches", "users"
  add_foreign_key "problems", "walls"
  add_foreign_key "user_problems", "problems"
  add_foreign_key "user_problems", "users"
  add_foreign_key "walls", "gyms"
end
