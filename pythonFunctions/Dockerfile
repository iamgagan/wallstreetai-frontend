FROM python:3.12-slim

ENV PYTHONUNBUFFERED 1

WORKDIR /app
ENV HNSWLIB_NO_NATIVE=1
COPY requirements.txt .
RUN apt-get update && apt-get install build-essential -y
RUN pip install --upgrade pip setuptools wheel
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

ENV FLASK_ENV=production

CMD ["gunicorn", "--bind", ":8080", "--workers", "1", "--threads", "8", "--timeout", "0", "main:app"]

