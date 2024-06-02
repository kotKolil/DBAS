#external classes
from fastapi import *
from fastapi.responses import *
from fastapi.staticfiles import StaticFiles

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

                rs = con.execute("SELECT name FROM sqlite_master WHERE type=’table’;")
                return JSONResponse(rs)
            
        case "postgres":
            with engine.connect() as con:

                rs = con.execute("SELECT * FROM pg_catalog.pg_tables;")
                return JSONResponse(rs)
        
        case _:
            return JSONResponse(["TypeError: Unknown type of DB"], status=500)
        
    
@app.post("/api/RawSQL")
async def ExecuteRawSQL(request:Request):
    data = await request.json()
    query = data["query"]
    with engine.connect() as con:

        rs = await con.execute(query)
        return JSONResponse(rs, status=200)
    
#serving HTML views
    
@app.get("/")
def Main():
    return FileResponse("template/index.html")

