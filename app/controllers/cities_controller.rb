class CitiesController < ApplicationController

def index
	@current_user = current_user
	City.find_each(&:save)
	@cities = City.all
	render :index
end

def show
	@current_user = current_user
		if current_user!=nil
			@city = City.friendly.find(params[:id])
			@posts = @city.posts 
			@postsR= @posts.reverse
			render :show 
	   	else redirect_to "/login"
	    end
end 


end
