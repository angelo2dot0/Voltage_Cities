class User < ActiveRecord::Base
	has_secure_password
	has_many :posts , dependent: :destroy
	has_attached_file :avatar, styles: { medium: "300x300>", thumb: "70x70>" }, default_url: "missing.png"
    validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

    validates :username, presence: true, uniqueness: true, length: { minimum: 5 }
    validates :email, presence: true, uniqueness: true, length: { minimum: 6 }

	def self.confirm(params)
	    @user = User.find_by({email: params[:email]})
	    @user.try(:authenticate, params[:password])
    end
end
