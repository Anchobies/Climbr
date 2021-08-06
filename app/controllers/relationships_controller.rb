class RelationshipsController < ApplicationController
    def friends
        relationships = Relationship.select { |r| r.sender_id == session[:user_id] }  
        friendships = relationships.select { |r| r.friends }
        friends = friendships.collect { |friend| User.find(friend.receiver_id) }
        render json: friends
    end

    def friend
        relationship1 = Relationship.find_by(sender_id: session[:user_id], receiver_id: params[:user_id])
        relationship2 = Relationship.find_by(receiver_id: session[:user_id], sender_id: params[:user_id])
        if !relationship1
            relationship1 = Relationship.create(sender_id: session[:user_id], receiver_id: params[:user_id], friends: false)
        end
        if !relationship2
            relationship2 = Relationship.create(receiver_id: session[:user_id], sender_id: params[:user_id], friends: false)
        end
        relationship1.update(friends: !relationship1.friends)
        relationship2.update(friends: !relationship2.friends)
        render json: relationship1.friends
    end
end
