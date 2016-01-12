class SessionsController < ApplicationController
	def new
		@user = User.new
		render :new
	end

	def create
		user_params = params.require(:user).permit(:email, :password)
		@user = User.confirm(user_params)
		p "THE USER IS ********** #{@user}"
		if @user
			login(@user)
			redirect_to user_path (@user)
		else
			flash[:error] = "Username or Password doesn't match, try again"
			redirect_to "/login"
		end
	end

	def destroy
		logout
		redirect_to root_path
	end 
end
