# Technical Test - Readme

## Application default configuration

<hr/>
To make it easier for development process, we still expose these ports on the local machine to send request directly with services or to view actual data in the data stores. 
In production environment, we leverage the infrastructure to make the downstream services become unreachable from the client, we only expose one single point - API Gateway.

| Service  | Port (customizable) |
| -------- | ------------------- |
| backend  | 5000                |
| frontend | 3000                |

## 1. Local Development Guideline

### Prerequisites

- `NodeJS` (v10 or above), `npm` and `yarn`
- Docker (optional)
- Makefile (optional)

### Setup Local Development Environment

1. Clone the project to local machine and go to the folder

```
cd inspector
```

### `OPTION 1:`

2. Run the back-end in development mode (live-reload support)

```
cd backend
yarn && yarn dev
```

3. Run the front-end in development mode (live-reload support)

```
cd frontend
yarn && yarn start
```

### `OPTION 2:`

2. Run `make bootstrap` cli to bootstrap FE along with BE.
3. Run `make cleanup` cli to clean up all.

<br/>

**NOTE**
<br/>
**The app should be accessible at http://localhost:3000**
<br/>
**The api should be accessible at http://localhost:5000**

### Frontend should look like this.

<image src="./imgs/ui.png" />

<b>Note</b>: If the port is being used, please change it to a different port in `.env` of each `-end` folder.

## 2. Other Notes

### What I have completed

### 1. Functionalities

1. Application supports to generate chart of input website's url.
2. Allow to download image of chart.

### 2. Technologies used

1. ReactJS
2. NodeJS (ExpressJS)

### 3. Challenges

1. Not able to validate numeric column of input website properly.

### 4. Others

1. Local Development Setup script (1 line setup with Docker).

### What can be improved if have more times

1. More unit tests for `front-end`, `back-end`
2. Write `e2e` tests.
3. Integrate with real world database instead of using external url.
4. Add more validations to the program to make it more robust.
