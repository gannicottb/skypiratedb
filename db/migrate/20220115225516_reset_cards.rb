class ResetCards < ActiveRecord::Migration[6.1]
  def up
    ActiveRecord::Base.connection.execute("TRUNCATE cards RESTART IDENTITY CASCADE")
    ActiveRecord::Base.connection.execute("TRUNCATE card_infos RESTART IDENTITY CASCADE")

    Rake::Task["custom:csv_import"].invoke
  end
end
