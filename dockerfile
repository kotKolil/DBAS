FROM PYTHON:latest

WORKDIR /app

COPY . /app/

RUN ["pip install",  "-r r.txt" ]

EXPOSE 8000

CMD [ "uvicorn", "main:app", "-h 0.0.0.0", "-p 8000" ]



