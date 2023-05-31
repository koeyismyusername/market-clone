from fastapi import FastAPI,UploadFile,Form, Response
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.staticfiles import StaticFiles
from typing import Annotated
import sqlite3

con = sqlite3.connect("./database.db", check_same_thread=False)
cur = con.cursor()

cur.execute(f"""
            CREATE TABLE IF NOT EXISTS Items (
              itemID INTEGER PRIMARY KEY,
              title TEXT NOT NULL,
              price INTEGER NOT NULL,
              description TEXT,
              place TEXT NOT NULL,
              insertAt INTEGER NOT NULL 
            );
            """)

app = FastAPI()

@app.post("/items")
async def create_item(
  image:UploadFile, 
  title:Annotated[str, Form()], 
  price:Annotated[int, Form()], 
  description:Annotated[str, Form()],
  place:Annotated[str, Form()],
  insertAt:Annotated[int, Form()]):
  
  image_bytes = await image.read()
  
  cur.execute(f"""
              INSERT INTO Items(image, title, price, description, place, insertAt)
              VALUES ('{image_bytes.hex()}', '{title}', '{price}', '{description}', '{place}', '{insertAt}')
              """)
  con.commit()
  
  return  '200'

@app.get("/items")
def get_Items():
  con.row_factory = sqlite3.Row
  cur = con.cursor()
  records = cur.execute(f"""
                        SELECT * FROM Items;
                        """).fetchall()
  
  return JSONResponse(jsonable_encoder(dict(record) for record in records))

@app.get("/images/{item_id}")
async def get_image(item_id):
  cur = con.cursor()
  image_bytes = cur.execute(f"""
                            SELECT image FROM Items
                            WHERE itemID={item_id}
                            """).fetchone()[0]
  return Response(bytes.fromhex(image_bytes))

app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")