class PostsController < ApplicationController
	def index
		if params[:tag]
			@posts = Post.tagged_with(params[:tag])
		else
			@posts = Post.all
		end 
	end

	def show
		@city = City.friendly.find(params[:city_id])
		#@user = User.find(params[:user_id])
		@post = Post.find(params[:id])
		user_id = @post.user_id
		@user = User.friendly.find(user_id)
		@current_user = current_user
		render :show
	end

	def new 
		@city = City.friendly.find(params[:city_id])
		@current_user = current_user 
		@post = Post.new
		render :new
	end

	def create
		@current_user = current_user
		@city = City.friendly.find(params[:city_id])
		post_params = params.require(:post).permit(:title, :content, :tag_list)
		@post = Post.new(post_params)
			if @post.save
	      	   @current_user.posts << @post
	      	   @city.posts << @post
	      		redirect_to @city
	      	else
	      		flash[:error] = 'Title or content must not be empty'
	      		redirect_to new_city_post_path
	      	end
		
		
	end 

	def edit
		@post = Post.find(params[:id]) 
		@city = City.friendly.find(params[:city_id])
		render :edit
	end

	def update
		@post = Post.find(params[:id])
		@city = City.friendly.find(params[:city_id])
		if @post.update_attributes(params.require(:post).permit(:title, :content, :tag_list))
			redirect_to city_post_path(@city,@post)
		else
			flash[:error] = 'Title or content must not be empty'
			redirect_to edit_city_post_path

		end
	end

	def destroy
		post = Post.find(params[:id])	
		post.destroy
		@city = City.friendly.find(params[:city_id])
		redirect_to @city
	end

end
