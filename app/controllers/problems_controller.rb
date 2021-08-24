class ProblemsController < ApplicationController
    def index
        problems = User.find(1).attempted_problems
        render json: problems
    end

    def show
        problem = Problem.find(params[:problem_id])
        render json: problem
    end

    def create
        problem = Problem.create(name: params[:name], difficulty: params[:difficulty], wall_id: 1, layout: params[:layout])
        if problem.valid?
            UserProblem.create(user_id: 1, problem_id: problem.id, status: [])
            render json: problem
        else
            render json: { errors: problem.errors.full_messages }, status: :unprocessable_entity
        end
    end
end

