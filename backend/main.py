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
import pickle

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

def prediction(file):
    # open image
    image = np.array(Image.open(file.file))
    # print(image)
    # print(type(image))

    # # load .pkl file
    # with open('./model.pkl', 'rb') as f:
    #     model = pickle.load(f)

    # print("MODEL")
    # print(model)

    return 0


@app.post("/api/upload")
async def upload(file = File(...)):
    print(file.filename)

    fn = file.filename
    caption = ''
    if fn == 'meme.png':
        caption = 'meme'
    elif fn == 'Cheetos.png':
        caption = 'cheet'
    elif fn == 'test.png':
        caption = 'test'

    return {'caption' : caption}