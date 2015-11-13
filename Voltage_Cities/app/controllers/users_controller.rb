class UsersController < ApplicationController
	def index
	end

	def show
		@user = User.find(params[:id])
    	render :show
	end

	def edit
	end

	def update
	end

	def new
		@user = User.new
		render :new 
	end

	def create
		user_params = params.require(:user).permit(:username, :artist_name, :email, :password, :current_city)
		@user = User.create(user_params)
		login(@user) # <-- login the user
    	redirect_to user_path(@user) # <-- go to show
	end 
end
