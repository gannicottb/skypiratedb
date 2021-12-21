class ChangeDefaultImageUrls < ActiveRecord::Migration[6.1]
  def change
    CardInfo.all.each do |ci|
      filename = ci.image_url.split("/").last
      ci.update(image_url: "https://skypiratedb.s3.amazonaws.com/large/#{filename}")
    end
  end
end
