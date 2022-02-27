                    
                                  <!-- IMAGE PROCESSING APT -->

// this api work for loading Image from url with ability to request an thumbnail iamge with custom size.


#Technology used:
    -Node js
    -Express js
    -Typescript


#DevDependencies:
    -"@types/express": "^4.17.13",
    -"@types/morgan": "^1.9.3",
    -"@types/node": "^17.0.12",
    -"@types/sharp": "^0.29.5",
    -"@types/jasmine": "^3.10.3",
    -"@types/supertest": "^2.0.11",
    -"nodemon": "^2.0.15",
    -"ts-node": "^10.4.0",
    -"typescript": "^4.5.5",
    -"@typescript-eslint/eslint-plugin": "^5.10.1",
    -"@typescript-eslint/parser": "^5.10.1",
    -"eslint": "^8.7.0",
    -"prettier": "2.5.1",
    -"@typescript-eslint/eslint-plugin": "^5.10.1",
    -"@typescript-eslint/parser": "^5.10.1",


#Dependencies:
    -"dotenv": "^14.3.2",
    -"express": "^4.17.2",
    -"morgan": "^1.10.0",
    -"sharp": "^0.29.3",
    -"jasmine": "^4.0.2",
    -"jasmine-spec-reporter": "^7.0.0",
    -"supertest": "^6.2.2"


#install:
-(npm install).


#Run Server (Build & start):
-npm run start.


#linting the code:
-npm run lint.


#Fix for lint the code:
-npm run lint:fix .


#Format:
-npm run format.


#test:
-npm run test.

#API EndPoint:
- localhost:3000/api/images/resize/?filename=${filename}&width=${width}&height=${height}.
