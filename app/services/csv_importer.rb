require "csv"
require "kramdown"

module CsvImporter

  # Should run locally
  # Should then be used in prod somehow.

  # somewhat qualified name
  def import_local(csv_filename)
    f = File.read(csv_filename)
    import(CSV.parse(f, headers: true, header_converters: :symbol))
  end

  # def import_upload(???)
  # ... import(CSV.parse...)

  private

  # parsed_csv is an Array of Arrays; the output of CSV.parse
  def import(parsed_csv)
    # First pass over the csv to create CardInfos
    parsed_csv.each do |row|
      raise "CSV malformed - nil header" if row.headers.include? nil

      puts "Parsing #{row[:name]}"
      # Default some fields to empty strings
      row[:art] ||= ""
      row[:text] ||= ""
      row[:flavor] ||= ""
      # Dynamically find or create associated records
      artist = Artist.where(name: row[:illustrator]).first_or_create
      faction = Faction.where(name: row[:faction]).first_or_create
      type = Type.where(name: row[:type]).first_or_create
      supertype = Supertype.where(name: row[:supertype]).first_or_create
      # Temporary hack
      subtypes = row[:subtypes]&.split("|") || []
      subtype = Subtype.where(name: subtypes.first).first_or_create

      # Transform known codes into icons
      row[:text] = row[:text].gsub("(P)", "<i class='far fa-dot-circle'></i>")
      row[:text] = row[:text].gsub("(A)", "<i class='fas fa-dharmachakra'></i>")
      row[:text] = row[:text].gsub("(T)", "<i class='fas fa-bolt tactic-icon'></i>")

      # Parse markdown
      parsed_text = Kramdown::Document.new(row[:text]).to_html if row[:text].present?
      parsed_flavor = Kramdown::Document.new(row[:flavor]).to_html if row[:flavor].present?

      # Map the row into a CardInfo
      CardInfo.create(
        {
          name: row[:name],
          unique: row[:unique].present?,
          supertype: supertype,
          type: type,
          subtype: subtype,
          raw_text: row[:text],
          text: parsed_text,
          flavor: parsed_flavor,
          faction: faction,
          artist: artist,
          attack: row[:presence1],
          defense: row[:presence2],
          ammo: row[:ammo],
          cost: row[:cost],
          power: row[:power],
          durability: row[:break],
          image_url: "https://skypiratedb.s3.amazonaws.com/#{row[:name].downcase.gsub(/ |\s|\W/, "")}.png",
        }
      )
    end

    # Take a second pass over the csv to associate fronts and backs
    parsed_csv.each do |row|
      next if row[:front].present? # skip the back entries

      expansion = case row[:set]
        when "c1"
          Expansion.where(name: "Core").first_or_create
        when "e1"
          Expansion.where(name: "Awakening").first_or_create
        end

      c = Card.create(
        expansion: expansion,
        expansion_number: row[:number],
        front: CardInfo.find_by_name(row[:name]),
        back: CardInfo.find_by_name(row[:back]),
      )
      puts "#{c.id} created!"
    end
  end
end
