
```shell
backend/3.11.venv/bin/python -m pip install -r backend/requirements.txt
backend/3.11.venv/bin/python -m fastapi_code_generator --input "../../Moodle/Webprogrammierung (SoSe 23)/Projekt/Pollack.yaml" --output backend/app

cd backend 
./3.11.venv/bin/python -m uvicorn start:app --reload
```