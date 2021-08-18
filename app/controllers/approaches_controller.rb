class ApproachesController < ApplicationController
    def index
        approaches = User.find(1).approaches
        render json: approaches
    end

    def show
        approach = Approach.find(params[:approach_id])
        render json: approach
    end
end
