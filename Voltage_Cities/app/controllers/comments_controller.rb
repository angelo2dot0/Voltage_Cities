class CommentsController < ApplicationController
	def index
	end

	def show
	end

	def new
		@comment = Comment.new
		@post = Post.find(params[:post_id])
		@city = City.friendly.find(params[:city_id])
		@current_user = current_user
		render :new
	end

	def create
		@current_user = current_user
		@post = Post.find(params[:post_id])
		@city = City.friendly.find(params[:city_id])
		@comment = Comment.create(params.require(:comment).permit(:content))
		@comment.user_id = @current_user.id 
		@comment.post_id = @post.id
		if @comment.save
			redirect_to city_post_path(@city, @post)
		else 
			redirect_to new_city_post_comment_path 
		end
	end
end
