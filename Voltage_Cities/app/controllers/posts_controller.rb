class PostsController < ApplicationController
	def show
		@user = User.find(params[:user_id])
		@post = User.posts.find(params[:user_id])
	end

	def new 
		@user = User.find(params[:user_id])
		@post = Post.new
		render :new
	end

	def create
		@user = User.find(params[:user_id])
		post_params = params.require(:post).permit(:title, :content)
		@post = Post.new(post_params)
		if @post.save
      		@user.posts << @post
      		redirect_to @user
      	end
	end 

end
