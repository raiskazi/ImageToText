# fastapi boilerplate
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import File, UploadFile
import uvicorn
import io
import os
import requests
from PIL import Image
import cv2
import numpy as np
import pandas as pd
import tensorflow as tf
import einops
import matplotlib as plt

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

def plot_attention_maps(image, str_tokens, attention_map):
    fig = plt.figure(figsize=(16, 9))

    len_result = len(str_tokens)
    
    titles = []
    for i in range(len_result):
      map = attention_map[i]
      grid_size = max(int(np.ceil(len_result/2)), 2)
      ax = fig.add_subplot(3, grid_size, i+1)
      titles.append(ax.set_title(str_tokens[i]))
      img = ax.imshow(image)
      ax.imshow(map, cmap='gray', alpha=0.6, extent=img.get_extent(),
                clim=[0.0, np.max(map)])

    plt.tight_layout()


def run_and_show_attention(model, image, temperature=0.0):
  result_txt = model.simple_gen(image, temperature)
  str_tokens = result_txt.split()
  str_tokens.append('[END]')

  attention_maps = [layer.last_attention_scores for layer in model.decoder_layers]
  attention_maps = tf.concat(attention_maps, axis=0)
  attention_maps = einops.reduce(
      attention_maps,
      'batch heads sequence (height width) -> sequence height width',
      height=7, width=7,
      reduction='mean')
  
  plot_attention_maps(image/255, str_tokens, attention_maps)
  t = plt.suptitle(result_txt)
  t.set_y(1.05)


def prediction(file):
    # image = cv2.imread(file.file)
    image = np.array(Image.open(file.file))
    print(image)
    print(type(image))

    return 0


@app.post("/api/upload")
async def upload(file = File(...)):
    print(file.filename)

    text = prediction(file)
    return {"filename": file.filename}







# REACT BACKEND CODE BELOW

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





