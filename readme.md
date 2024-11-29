# Post Management System
## Features
### - Post
### - Categories
### - Comments
### - Likes
----
## User Roles
### - Admin : _Unique_
### - Moderator : _Many_
### - Editor : _Many_
### - User : _Many_
----
## CRUD Permissions
### - Moderator : Admin
### - User : Admin | Moderator*
### - Post : Admin | Moderator* | Editor* | User
### - Categories : Admin | Moderator* | Editor* 
### - Comments : Admin | Moderator* | Editor* | User
### - Likes : Admin | Moderator* | Editor* | User

> _*_ -> Permission may vary
