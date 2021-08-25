class ProblemsController < ApplicationController
    def index 
        problems = Problem.all
        render json: problems
    end

    def user
        problems = User.find_by(id: session[:user_id]).attempted_problems
        render json: problems
    end

    def users
        problems = User.find(params[:user_id]).attempted_problems
        render json: problems
    end

    def show
        problem = Problem.find(params[:problem_id])
        render json: problem, serializer: ProblemSerializer
    end

    def create
        problem = Problem.create(name: params[:name], difficulty: params[:difficulty], wall_id: Wall.first.id, layout: (params[:layout]).to_json)
        if problem.valid?
            UserProblem.create(user_id: session[:user_id], problem_id: problem.id, status: [])
            render json: problem
        else
            render json: { errors: problem.errors.full_messages }, status: :unprocessable_entity
        end
    end
end

