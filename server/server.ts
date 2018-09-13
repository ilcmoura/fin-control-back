
import * as restify from 'restify';


export class Server {

    application: restify.Server

    initRoutes(): Promise<any>{
        return new Promise( (resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: 'fin-control-api',
                    version: '1.0.0'
                })

                this.application.use(restify.plugins.queryParser())

                //routes

                this.application.get('/', (req, resp, next)=>{
    
                    console.log('ok')
                    
                    resp.status(200)
                    resp.json({
                        message:'hello'
                    })
                
                    return next()
                })
                
                this.application.get('/info', (req, resp, next)=>{
                    if (req.userAgent() && req.userAgent().includes('MSIE 7.0')) {
                        // resp.status(400)
                        // resp.json({message: 'Please, update your browser'})
                        let error: any = new Error()
                        error.statusCode = 400
                        error.message = 'Please, update your browser'
                        return next(error)
                    }
                    return next()
                }, (req, resp, next)=>{
                    
                    resp.status(200)
                    resp.json({
                        browser: req.userAgent(),
                        method : req.method,
                        url: req.href(),
                        path: req.path(),
                        query: req.query
                    })
                
                    return next()
                })

                this.application.listen('3000', ()=>{
                    // console.log('API is running on http://localhost:3000')
                    resolve(this.application)
                })

                // this.application.on('error', (err)=>{})

            } catch (error) {
                reject(error)
            }
             
        })
    }

    boostrap(): Promise<Server> {
        return this.initRoutes().then( ()=> this)
    } 
}