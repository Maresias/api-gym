import { app } from './app'
import { env } from './env'
import { appRegister } from './http/routes'

app.register(appRegister)
app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server running')
  })
