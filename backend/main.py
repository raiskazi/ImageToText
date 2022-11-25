# import uvicorn
# from typing import Optional, List
# from fastapi import FastAPI, HTTPException, UploadFile, File
# from fastapi.middleware.cors import CORSMiddleware
# import aiofiles
# import io
# import os
# import requests
# from PIL import Image

# app = FastAPI()

# origins = [
#     "http://localhost:3000",
# 	'*'
# ]
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# def prediction():
#     return 0

# @app.post("/api/uploadfile")
# async def create_upload_file(file: UploadFile = File(...)):
#     # out_path = 'example/path/file'
#     # async with aiofiles.open(out_path, 'wb') as out_file:
#     #     content = await file.read()
#     #     await out_file.write(content)

#     # image = Image.open(io.BytesIO(file)).convert("RGB")
#     # pred = prediction()
#     # print(pred)
#     print("PRINTING")
#     print(file.filename)

#     return {"filename": file.filename}

# # if __name__ == "__main__":
# #     uvicorn.run("app.api:app", host="0.0.0.0", port=8000, reload=True)

# if __name__ == '__main__':
# 	port = int(os.environ.get("PORT", 8000))
# 	uvicorn.run(app, host='0.0.0.0', port=port)




# fastapi boilerplate
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import File, UploadFile

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/upload")
async def upload(file = File(...)):
    print(file.filename)
    return {"filename": file.filename}
