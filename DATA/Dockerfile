FROM python:3.9.13

WORKDIR /var/jenkins_home/workspace/chaekin-deploy/DATA/

COPY ./main.py /app/
COPY ./requirements.txt /app/

RUN pip install -r /app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

# CMD uvicorn --host=0.0.0.0 --port 8000 main:app


