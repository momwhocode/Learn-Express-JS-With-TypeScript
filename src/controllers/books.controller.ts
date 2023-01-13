function handleGetBooks(req: Request, res: Response, next: NextFunction) 
{
  console.log(req.params);

  return res.send(req.params);
}