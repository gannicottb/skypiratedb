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

ActiveRecord::Schema.define(version: 2021_12_30_164357) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "artists", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "card_infos", force: :cascade do |t|
    t.string "name"
    t.boolean "unique"
    t.integer "supertype_id"
    t.bigint "type_id", null: false
    t.integer "subtype_id"
    t.text "raw_text"
    t.text "text"
    t.text "flavor"
    t.bigint "faction_id", null: false
    t.bigint "artist_id", null: false
    t.integer "attack"
    t.integer "defense"
    t.integer "ammo"
    t.integer "cost"
    t.integer "power"
    t.integer "durability"
    t.string "image_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["artist_id"], name: "index_card_infos_on_artist_id"
    t.index ["faction_id"], name: "index_card_infos_on_faction_id"
    t.index ["name"], name: "index_card_infos_on_name", unique: true
    t.index ["type_id"], name: "index_card_infos_on_type_id"
  end

  create_table "cards", force: :cascade do |t|
    t.bigint "front_id", null: false
    t.integer "back_id"
    t.bigint "expansion_id", null: false
    t.integer "expansion_number"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["expansion_id"], name: "index_cards_on_expansion_id"
    t.index ["front_id"], name: "index_cards_on_front_id"
  end

  create_table "expansions", force: :cascade do |t|
    t.string "name"
    t.string "code"
    t.date "release_date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "factions", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "subtypes", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "supertypes", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "types", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "crypted_password"
    t.string "salt"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "remember_me_token"
    t.datetime "remember_me_token_expires_at"
    t.string "reset_password_token"
    t.datetime "reset_password_token_expires_at"
    t.datetime "reset_password_email_sent_at"
    t.integer "access_count_to_reset_password_page", default: 0
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["remember_me_token"], name: "index_users_on_remember_me_token"
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token"
  end

  add_foreign_key "card_infos", "artists"
  add_foreign_key "card_infos", "factions"
  add_foreign_key "card_infos", "types"
  add_foreign_key "cards", "card_infos", column: "front_id"
  add_foreign_key "cards", "expansions"
end
