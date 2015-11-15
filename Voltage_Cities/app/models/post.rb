class Post < ActiveRecord::Base
	belongs_to :user
	belongs_to :city

	validates :title, presence: true
	validates :content, presence: true, length: { in: 1..200 } 
end
