# chatterino

learning how to create a basic chat app with socket.io

# The Plan

### All good things in life must be planned

## What is my app going to do

-   very simple chatting app
-   first, there will be a screen where the user can enter a code and enter the chatroom associated with the code.
-   there will be a participant/member limit specified by the admin/boss/creator/moderator/whatever we want to call whoever created the chatroom
-   when max limit is reached, no other users can join the chat room
-   chatroom will disappear when everyone leaves
-   two types of users, the chatmaster/creator/admin and participants.
-   user can enter a username before they join the chatroom, which other users will see
-   there are no accounts or passwords or anything permanent
-   everything is spontaneous and temporary?
    -   why? for simplicity

# Domain Objects

### User

-   what can they do?
    -   send messages
    -   read messages from other users in the same chatroom
    -   read the chat history
    -   leave the current chatroom
    -   join a chatroom by unique code
-   if one client joins multiple chatrooms, they will have multiple User objects. i.e. a User has a 1:1 relationship with chatrooms.
-   Properties and attributes
    -   username
        -   what if two users have the same username?
            -   append a (1), (2), etc onto their name, i.e. Bob (1), Bob (2)
    -   is that it? guess we'll find out.

### Admin

-   what can they do?
    -   they can kick users
    -   they can increase/decrease max users
    -   they can delete/end the chatroom
    -   send messages
-   should they have an additional icon or badge or indicator or something?
    -   maybe idk
-   what properties or attributes will they have?
    -   an admin is just a user with extra permissions
    -   inherit admin from user? How does javascript inheritance work again? I forgor
-   delete messages
    -   feature for the future maybe after i finish the basic implementatation

### Server

-   stores a log of messages
-   stores number of currently connected users
    -   do i need this?
    -   can i just store a collection of the currently connected users?
-   stores max number of users
-   unique id to join.

### Message

-   the text sent by a user
-   the username of the user
-   the time the message was posted

#

This code is looking a little gross but it's a proof of concept. Take it easy on me, I'm also cringing. Abandon ship.
