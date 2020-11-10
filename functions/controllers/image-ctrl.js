app.post("/users", async (req, res) => {
  try {
    const user = {
      firstName: req.body["firstName"],
      lastName: req.body["lastName"],
      email: req.body["email"],
      areaNumber: req.body["areaNumber"],
      department: req.body["department"],
      id: req.body["id"],
      contactNumber: req.body["contactNumber"],
    };

    const newDoc = await db.collection(userCollection).add(user);
    res.status(201).send(`Created a new user: ${newDoc.id}`);
  } catch (error) {
    res
      .status(400)
      .send(
        `User should contain firstName, lastName, email, areaNumber, department, id and contactNumber!!!`
      );
  }
});
