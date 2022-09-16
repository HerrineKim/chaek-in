FROM python:3.9.13

WORKDIR /var/jenkins_home/workspace/chaekin-deploy/DATA

COPY ./app/main.py /app/main.py
COPY ./app/requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /app/requirements.txt

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]