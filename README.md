
### BeautyBook System - README

#### **Project Overview:**

The BeautyBook system is designed to manage appointments, services, and staff for beauty centers. It has three types of users: **Admin**, **Staff**, and **User**.

-   **Admin**: The admin can add, update, and delete services, as well as assign services to specific staff members. They also manage staff approvals and rejections.
    
-   **Staff**: After creating an account, staff must wait for the admin to approve them. They can then be assigned to specific services and manage their availability.
    
-   **User**: The user can view a list of available beauty centers (admin), choose a center, and then choose a staff member to view their services. Users can book appointments with the selected staff member.
    

#### **Tech Stack:**

-   **Frontend**: React.js
    
-   **Backend**: ExpressJS
    
-   **ORM**: Prisma
    
-   **Database**: MySQL
    
-   **Deployment**: Docker (for both frontend, backend, and database)
    

----------

#### **Features:**

1.  **Frontend:**
    
    -   Developed using React.js to create a responsive and dynamic interface.
        
    -   The system allows users to view lists of appointments, services, and staff, with the ability to filter by name, price range, and date.
        
    -   Admins can manage the system through an intuitive UI.
        
    -   Users can browse available beauty centers, select staff, and view their available services.
        
    -   Appointment booking system integrated for users to make appointments with staff members.
        
2.  **Backend:**
    
    -   Built using ExpressJS for handling HTTP requests.
        
    -   Prisma ORM is used to interact with the MySQL database, making it easier to manage database queries.
        
    -   APIs have been implemented to allow CRUD operations on appointments, services, and staff members.
        
    -   Authentication and authorization features are integrated to ensure proper access control, ensuring that only authorized users can perform specific actions.
        
    -   Admin has full control over the services and staff, with the ability to accept or reject staff registration requests.
        
3.  **Performance:**
    
    -   Optimized the frontend to handle large datasets and provide a smooth user experience, especially when filtering and displaying appointments and services.
        
    -   The backend is optimized to handle a high volume of requests, ensuring fast response times even with a large number of users or appointments.
        
4.  **PDF Report Generation:**
    
    -   Admins can generate appointment reports in PDF format for record-keeping or printing.
        
5.  **Docker:**
    
    -   The **frontend**, **backend**, and **database** (MySQL) are all containerized using Docker. This simplifies the deployment process and ensures consistency across different environments.
        
    -   The database runs inside a Docker container, making it easy to manage and configure the MySQL database without needing to install it directly on the host system.
        
    -   Docker Compose is used to manage multiple containers (frontend, backend, database) together.
        

#### **User Flow:**

1.  **Admin:**
    
    -   Logs in and manages the system by adding/removing services, assigning them to staff, and accepting or rejecting staff applications.
        
    -   Admin can generate PDF reports of appointments and manage all staff and appointments.
        
2.  **Staff:**
    
    -   Registers an account and waits for approval by the Admin.
        
    -   Once approved, staff can manage their schedule and see the services assigned to them.
        
    -   Staff members can be assigned to specific appointments by the admin.
        
3.  **User:**
    
    -   Browses the available beauty centers managed by admins and selects one.
        
    -   After selecting a center, the user can choose a staff member and view the services provided by them.
        
    -   The user can then book an appointment with the staff member of their choice.
        

