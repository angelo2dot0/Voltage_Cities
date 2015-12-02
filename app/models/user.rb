class User < ActiveRecord::Base
	extend FriendlyId
	friendly_id :artist_name, use: :slugged
	has_secure_password
	has_many :posts , dependent: :destroy
	has_many :comments , dependent: :destroy
	has_attached_file :avatar, styles: { medium: "300x300>", thumb: "70x70>" }, default_url: "http://i.imgur.com/RXp94vf.png"
    validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

    validates :username, presence: true, uniqueness: true, length: { minimum: 5 }
    validates :email, presence: true, uniqueness: true, length: { minimum: 6 }, format: { with: /[a-z]+(\_?|\.?|\-?)[a-z]*[0-9]*\@[a-z]+\.[a-z]{2,3}|[a-z]*[0-9]*(\_?|\.?|\-?)[a-z]+\@[a-z]+.[a-z]{2,3}/i, on: :create }
    validates :password, presence: :true, length: {minimum: 6}


	def self.confirm(params)
	    @user = User.find_by({email: params[:email]})
	    @user.try(:authenticate, params[:password])
    end
end
