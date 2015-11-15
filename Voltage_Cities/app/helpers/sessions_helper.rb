module SessionsHelper
	def login(user)
		session[:id] = user.id
		@current_user = user
	end

	def current_user
		@current_user ||= User.find(session[:id])
	end

	def logged_in?
		if current_user == nil
			redirect_to "/login"
		end
	end

	def logout
		@current_user = session[:id] = nil
	end

end
