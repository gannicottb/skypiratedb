#!/usr/bin/ruby

folder_path = ARGV[0]

puts "Renaming files..."

Dir.glob(folder_path + "/*.png").sort.each do |f|
  filename = File.basename(f, File.extname(f))
  trimmed = filename.gsub(/ \(\d+\)/, "").gsub("-", "")
  if filename != trimmed
    puts "#{filename} -> #{trimmed}"
    output_name = folder_path + "/" + trimmed + File.extname(f)
    puts output_name
    File.rename(f, output_name)
  end
end

puts "Renaming complete."
