require_relative "../../app/services/csv_importer"
namespace :custom do
  desc "import cards from a csv into the database"
  task csv_import: :environment do
    include CsvImporter
    CsvImporter.import_local("8_9_classic.csv")
  end
end
