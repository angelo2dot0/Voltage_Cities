class PostsController < ApplicationController
	def show
		@city = City.find(params[:city_id])
		#@user = User.find(params[:user_id])
		@post = Post.find(params[:id])
		user_id = @post.user_id
		@user = User.find(user_id)
		render :show
	end

	def new 
		@city = City.find(params[:city_id])
		@current_user = current_user 
		@post = Post.new
		render :new
	end

	def create
		@current_user = current_user
		@city = City.find(params[:city_id])
		post_params = params.require(:post).permit(:title, :content)
		@post = Post.new(post_params)
		if @post.save
      	   @current_user.posts << @post
      	   @city.posts << @post
      		redirect_to @city
      	end
	end 

end
