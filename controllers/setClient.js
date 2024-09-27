const setClient = (req, res) => {
    const ClientId = process.env.CLIENTEIDGOOGLE ;
    return res.send(ClientId);
 
};

module.exports = setClient;