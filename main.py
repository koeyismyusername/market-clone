from fastapi import FastAPI,UploadFile,Form
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.staticfiles import StaticFiles
from typing import Annotated
import sqlite3

con = sqlite3.connect("./database.db", check_same_thread=False)
cur = con.cursor()

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

app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")