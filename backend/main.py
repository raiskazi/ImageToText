import uvicorn
from typing import Optional, List
from fastapi import FastAPI, HTTPException, UploadFile
import aiofiles

app = FastAPI()

if __name__ == "__main__":
    uvicorn.run("app.api:app", host="0.0.0.0", port=8000, reload=True)

@app.post("/api/uploadfile")
async def create_upload_file(file: UploadFile = File(...)):
    out_path = 'example/path/file'
    async with aiofiles.open(out_path, 'wb') as out_file:
        content = await file.read()
        await out_file.write(content)
