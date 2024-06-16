#external classes
from fastapi import *
from fastapi.responses import *
from fastapi.staticfiles import StaticFiles
from sqlalchemy import *
from os import *
import json as js

#local classes
from settings import *
from database import *

#creating the app
#to run this, just write "start.bat" in console, or "uvicorn main:app". But before you must install dependencies in r.txt!
app = FastAPI()

"""serving static classes, as a js, style sheet  files"""
app.mount("/static", StaticFiles(directory="static"))

@app.get("/api/GetAllTables")
def AllTablesGet():
    """this API return all tables in database"""
    match TypeOfDb:
        case "sqlite3":
            with engine.connect() as con:
                rs = con.execute(text("SELECT name FROM sqlite_master WHERE type = 'table'; "))
                tables = [row[0] for row in rs]
                return JSONResponse(content=tables)

        case "postgres":
            with engine.connect() as con:
                rs = con.execute(text("SELECT tablename FROM pg_catalog.pg_tables;"))
                tables = [row[0] for row in rs]
                return JSONResponse(content=tables)
        
        case _:
            return JSONResponse(content={"Error": "Unknown type of DB"}, status_code=500)
        

@app.post("/api/GetTableInfo")
async def GetTableInfo(request:Request):
    """via this API we can get name of columns in database"""
    data = await request.json()
    NameOfTable = data["name"]
    match TypeOfDb:
        case "sqlite3":
                with engine.connect() as con:
                    rs = con.execute(text(f""" SELECT c.name FROM pragma_table_info('{NameOfTable}') c; """))
                    return JSONResponse(content = [row[0] for row in rs])

        case "postgres":
             with engine.connect() as con:
                    rs = con.execute(text(f"""SELECT *
  FROM information_schema.columns
 WHERE table_schema = 'public'
   AND table_name   = '{NameOfTable}'
     ;"""))
                    return JSONResponse(content = [row[0] for row in rs])
        case _:
            return JSONResponse(content={"Error": "Unknown type of DB"}, status_code=500)
  
@app.post("/api/RawSQL")
async def execute_raw_sql(request: Request):
    """via this api we can execute raw sql query. To execute SQL query,  need to send POST request with json 
        with field "query". API will return result of request
    """
    data = await request.json()
    query = data["query"]

    with engine.connect() as con:
        rs = con.execute(text(query))
        tables = [list(j) for j in rs]
        return JSONResponse(content=tables)

    
@app.get("/")
def Main():
    """it is not api, just (a fish) return index page of my DB admining system"""
    return FileResponse("template/index.html")

