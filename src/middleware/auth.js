const jwt = require("jsonwebtoken");
const authConfig = require("../configs/auth.json");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ error: "Token não informado" });

  const parts = authHeader.split(" ");

  if (!parts.lenght === 2)
    return res.status(401).send({ error: "Erro de toke" });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: "Token malformatado" });

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: "Token inválido" });

    req.userId = decoded.params.id;
    return next();
  });
};
