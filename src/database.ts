import dotenv from 'dotenv'
import  { Pool } from 'pg'

dotenv.config()

const {
Port,
NODE_ENV,
POSTGRES_HOST,
POSTGRES_PORT,
POSTGRES_DB,
POSTGRES_DB_TEST,
POSTGRES_USER,
POSTGRES_PASSWORD,
}=process.env
//console.log(process.env);

const client =new Pool({
port : parseInt(POSTGRES_PORT as string,10) ,
host:POSTGRES_HOST,
database:POSTGRES_DB,
user:POSTGRES_USER,
password:POSTGRES_PASSWORD
})
client.on('error',(error:Error)=>{
console.error(error.message)
})
export default client