class ApproachesController < ApplicationController
    def user
        approaches = User.find_by(id: session[:user_id]).approaches
        render json: approaches
    end

    def users
        approaches = User.find(params[:user_id]).approaches
        render json: approaches
    end

    def show
        approach = Approach.find(params[:approach_id])
        render json: {solution: approach, problem: approach.problem}
    end

    def create
        approach = Approach.create(user_id: session[:user_id], problem_id: params[:problem_id], steps: params[:steps], name: params[:name])
        if approach.valid?
            render json: approach
        else
            render json: { errors: approach.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update 
        approach = Approach.find(params[:approach_id])
        approach.update(steps: params[:steps], name: params[:name])
        if approach.valid?
            render json: approach
        else
            render json: { errors: approach.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy 
        approach = Approach.find(params[:approach_id])
        approach.destroy
        head :no_content
    end
end
