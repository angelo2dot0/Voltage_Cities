class WelcomeController < ApplicationController

	  before_action :logged_in?, only: [:show]

  def index
    @users = User.all
    render :index
  end

   def new
    @user = User.new
    render :new
  end

    def create
    user_params = params.require(:user).permit(:first_name, :last_name, :email, :password)
    @user = User.create(user_params)
    login(@user) # <-- login the user
    redirect_to "/users/#{@user.id}" # <-- go to show
  end

   def show
    @user = User.find(params[:id])
    render :show
  end
end
