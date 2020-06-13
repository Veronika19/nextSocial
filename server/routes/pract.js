module.exports = (app, db) => {
  
  app.get("/api/pract", (req, res) => {
    res.send("Hello company!!");
  });

  app.post('/api/comp/add', async(req, res) => {
  	const reqData = req.body;
  	try{
  		const compData = await db.Company.create({name: reqData.name});
  		res.status(200).json(compData);
  	}catch(err){
  		res.status(400).json(err);	
  	}
  })


  app.post('/api/emp/add', async(req, res) => {
  	const reqData = req.body;
  	try{
  		const empData = await db.Employee.create({name: reqData.name, companyId: reqData.comp});
  		res.status(200).json(empData)
  	}catch(err){
  		res.status(400).json(err);
  	}
  })


  app.get('/api/comp', async(req, res) => {
  	try{
  		const compData = await db.Company.findOne({
  							where: {id: 1},
  							include: [db.Employee]
  						});
  		res.status(200).json(compData);
  	}catch(err){
  		res.status(400).json(err);
  	}
  })

  app.delete('/api/comp/del', async(req, res) => {
  	try{
  		const delComp = await db.Company.destroy({
  											where: {id: 1}  											
  										});
  		res.status(200).json(delComp);
  	}catch(err){
  		res.status(400).json(err)
  	}
  })

}