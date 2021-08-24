class ApproachesController < ApplicationController
    def index
        approaches = User.first.approaches
        render json: approaches
    end

    def show
        approach = Approach.find(params[:approach_id])
        render json: {solution: approach, problem: approach.problem}
    end

    def create
        approach = Approach.create(user_id: User.first.id, problem_id: params[:problem_id], steps: params[:steps])
        render json: approach
    end
end
