## DBAS - DB Admining System
<img src="./other/preview.jpg">
DBAS is a user-friendly graphical client designed to simplify database management tasks. It features a clean interface and robust functionality, making it ideal for both beginners and experienced database administrators.

Key Features:

 Intuitive Interface: Easily navigate and interact with your database through a visually appealing and easy-to-use interface.
 Table Management: 
     View all existing tables in your database with a single click.
     Select a specific table to explore its structure and data.
     Synchronize the displayed table data with the actual database to ensure consistency.
 Powerful SQL Execution:
     Execute raw SQL queries directly from a dedicated input field.
     Get instant results from your queries, displayed in a clear and readable format.
 Robust API Integration: DBAS seamlessly communicates with your database via a powerful API built on the FastAPI framework.

API Endpoints:

 `/api/GetAllTables` (GET): Retrieve a list of all table names from the database.
 `/api/GetTableInfo` (POST): Get detailed information about a specific table. Send a POST request with a JSON body containing the table name in the "name" field.
 `/api/RawSQL` (POST): Execute a raw SQL query. Send a POST request with a JSON body containing the query in the "query" field.

Client-Side Architecture:

 Built using HTML5, CSS3, and JavaScript for a responsive and interactive experience.
 Offers a clear visual representation of tables and their data.
 Allows you to choose tables and execute queries effortlessly.

DBAS is an essential tool for anyone working with databases. Its intuitive design and powerful features make database management efficient and enjoyable.