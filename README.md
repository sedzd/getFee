# getFee

## up and running

```shell
npm i && npm start
```

## test

```shell
npm test
```

## sample requeset

```json
curl --location --request POST 'http://localhost:8080/getFee' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer {{jwtToken}}' \
--header 'User-Agent: {{userAgent}}' \
--header 'X-Currency: SGD' \
--data-raw '{
   "type": "DIRECT_DEBIT_PAYMENT",
   "count": 988,
   "volume": 250000,
   "channel": "BPO",
   "currency": "PHP",
   "country_of_service": "PHILIPPINES",
   "amount": 1200
}'

```

## sample response

```json
{
    "totalFee": "143.55 PHP"
}
```

## dockerization

### build

```shell
make build
```

### run

```shell
make run-dev
```

### destroy

```shell
make destroy
```

## Load Test with Apache Benchmark

```shell
# defualt: 10000 request, 100 concurrently
sh ab.sh
```
