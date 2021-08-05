class RelationshipsController < ApplicationController
    def friends
        relationships = Relationship.select { |r| r.sender_id.to_s == session[:user_id] }  
        friendships = relationships.select { |r| r.friends }
        friends = friendships.collect { |friend| User.find(friend.receiver_id) }
        render json: friends
    end
end
