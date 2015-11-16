class PostsController < ApplicationController
	def show
		@city = City.find(params[:city_id])
		#@user = User.find(params[:user_id])
		@post = Post.find(params[:id])
		user_id = @post.user_id
		@user = User.find(user_id)
		@current_user = current_user
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
		post_params = params.require(:post).permit(:title, :content, :tag_list)
		@post = Post.new(post_params)
		if @post.save
      	   @current_user.posts << @post
      	   @city.posts << @post
      		redirect_to @city
      	end
	end 

	def edit
		@post = Post.find(params[:id]) 
		@city = City.find(params[:city_id])
		render :edit
	end

	def update
		@post = Post.find(params[:id])
		@post.update_attributes(params.require(:post).permit(:title, :content))
		redirect_to city_post_path(@post)
	end

	def destroy
		post = Post.find(params[:id])	
		post.destroy
		@city = City.find(params[:city_id])
		redirect_to @city
	end

end
