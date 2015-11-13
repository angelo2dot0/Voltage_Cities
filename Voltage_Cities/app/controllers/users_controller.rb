class UsersController < ApplicationController

	def index
	end

	def show
		@user = User.find(params[:id])
    	@posts = @user.posts 
    	render :show
	end

	def edit
		@user = User.find(params[:id])
		render :edit
	end

	def update
		@user = User.find(params[:id])
		@user.update_attributes(params.require(:user).permit(:artist_name, :current_city, :avatar))
		redirect_to user_path(@user) 
	end

	def new
		@user = User.new
		render :new 
	end

	def create
		user_params = params.require(:user).permit(:username, :artist_name, :email, :password, :current_city, :avatar)
		@user = User.create(user_params)
		login(@user) # <-- login the user
    	redirect_to user_path(@user) # <-- go to show
	end 

end
