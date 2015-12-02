class UsersController < ApplicationController

	def index
	@current_user = current_user
	City.find_each(&:save)
	@cities = City.all
	render :index
end

	def show
		@current_user = current_user
		User.find_each(&:save)
		@user = User.friendly.find(params[:id])
		@posts = @user.posts
		@count= Post.select("city_id" ).where("user_id = #{@user.id}").group("city_id") 
    	@postsR= @posts.reverse
    	if current_user!=nil
    		@current_user = current_user
    		render :show
    	else redirect_to "/login"
    	end
	end


	def edit
		@current_user = current_user
		@user = User.friendly.find(params[:id])
		render :edit
	end

	def update
		@current_user = current_user
		@user = User.friendly.find(params[:id])
		@user.update_attributes(params.require(:user).permit(:artist_name, :current_city, :avatar))
		redirect_to user_path(@user) 
	end

	def new
		@user = User.new
		render :new 
	end

	def create
		user_params = params.require(:user).permit(:username, :artist_name, :email, :password, :current_city, :avatar)
		@user = User.new(user_params)
		if @user.save
			login(@user) # <-- login the user
    		redirect_to @user # <-- go to show
    	else 
    		render :new
		end
		
	end 

end
