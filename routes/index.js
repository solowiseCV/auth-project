import authRoute from './authentication/authRoute.js'


export default (router) => {
  router.use("/users",authRoute);
   
  return router;
};