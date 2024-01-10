Task Description: Project Management Tool - User Roles and Functionality
Scenario:
You're tasked with designing a project management tool that accommodates two user roles: admin and user. Admins have comprehensive access to project management functionalities including CRUD operations (Create, Read, Update, Delete) for projects, while users have limited access to creating, viewing, and managing tasks within the projects they are part of. So please add the necessary authentication to each route.

User Roles and Capabilities:
Admin:

Authentication: Register with an email and password.
Project Management:
Create new projects.
Read project details, including name, description, and team members.
Update existing project details.
Delete projects.
User:

Authentication: Register with an email and password.
Task Management (within Projects):
Create new task
View all open tasks within projects they are part of.
Mark a task as complete or incomplete.
Remove a task from the project (only from tasks they've added).
Data Structure:
Project:

Fields: Project name, description, team members (users involved in the project).
Task:

Fields: Task name, status (completed or not completed).
