class CitiesController < ApplicationController

def index
	@cities = City.all
	render :index
end

def show
	@logged_in = logged_in?
	@city = City.find(params[:id])
		@posts = @city.posts 
		@postsR= @posts.reverse
		render :show 

end 


end
