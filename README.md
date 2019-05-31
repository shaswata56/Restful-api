# Restful-api

To get the hero list from the api, use this post request..
```bash
curl -X GET \
  https://shielded-plateau-81799.herokuapp.com/heroes \
  -H 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoidXNlciIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU1OTIzOTU4Nn0._MnjbywHK4j2c_8SN38Ov2TLpMwZ08cKD50tU8QXGYA' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' 
  ```
