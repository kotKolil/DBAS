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

app = FastAPI()


app.mount("/static", StaticFiles(directory="static"))


"""

Documentation Of API entrypoints

GET:

/GetAllTables - return all tables in database

POST:

/RawSQL - execute sql query from json field 'query' in post request


"""

@app.get("/api/GetAllTables")
def AllTablesGet():
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
    data = await request.json()
    NameOfTable = data["name"]
    match TypeOfDb:
        case "sqlite3":
                with engine.connect() as con:
                    rs = con.execute(text(f"PRAGMA table_info({NameOfTable});"))
                    print([row for row in rs])
        case "postgres":
            pass
        case _:
            return JSONResponse(content={"Error": "Unknown type of DB"}, status_code=500)
  
@app.post("/api/RawSQL")
async def execute_raw_sql(request: Request):
    data = await request.json()
    query = data["query"]


    with engine.connect() as con:
        rs = con.execute(text(query))
        tables = [list(j) for j in rs]
        system("cls")
        print(tables)
        return JSONResponse(content=tables)

    
    
#serving HTML views
    
@app.get("/")
def Main():
    return FileResponse("template/index.html")

