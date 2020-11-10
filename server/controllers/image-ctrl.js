const Image = new Object();

createImage = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a image",
    });
  }

  // FIXME: Make Firebase models
  const image = new Image(body);

  if (!image) {
    return res.status(400).json({ success: false, error: err });
  }

}