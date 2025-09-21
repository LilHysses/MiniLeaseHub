const connection = require('../db/connection');

exports.getPropertyUser = (req, res) => {

    const {u_id} = req.session.user;

    const sqlPayment = "SELECT * FROM metodo_pago";
    const sqlTypes = "SELECT * FROM tipo_inmueble";
    const sqlProperties = "SELECT * FROM inmuebles WHERE u_id = ?"; // Consulta para obtener los inmuebles del usuario

    // Ejecutamos la primera consulta
    connection.query(sqlPayment, (err, paymentResults) => {
        if (err) throw err;

        // Luego ejecutamos la segunda
        connection.query(sqlTypes, (err, typeResults) => {
            if (err) throw err;

            connection.query(sqlProperties, [u_id], (err, propertyResult) => {
                if (err) throw err;

                // Renderizamos la vista pasando ambos resultados
                res.render('propertyUser', {
                    paymentMethods: paymentResults,
                    propertyTypes: typeResults,
                    userProperties: propertyResult
                });
            })
        });
    });
};

exports.postPropertyUser = (req, res) => {
    const {in_name, in_desc, in_room, in_bath, in_kitchen, in_dic, in_price, p_id, ti_id} = req.body;

    const {u_id} = req.session.user; // Asegúrate de que el usuario esté autenticado y su ID esté en la sesión
    const in_p1 = "/uploads/properties/propertiesCard/" + req.files['in_p1'][0].filename; // Save the path of the uploaded profile picture
    const in_p2 = "/uploads/properties/propertiesAll/" + req.files['in_p2'][0].filename;
    const in_p3 = "/uploads/properties/propertiesAll/" + req.files['in_p3'][0].filename;
    const in_p4 = "/uploads/properties/propertiesAll/" + req.files['in_p4'][0].filename;

    const sql = "INSERT INTO inmuebles (in_name, in_desc, in_room, in_bath, in_kitchen, in_dic, in_price, p_id, ti_id, in_p1, in_p2, in_p3, in_p4, u_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(sql, [in_name, in_desc, in_room, in_bath, in_kitchen, in_dic, in_price, p_id, ti_id, in_p1, in_p2, in_p3, in_p4, u_id], (err) => {
        if (err) throw err;
        const sqlPayment = "SELECT * FROM metodo_pago";
        const sqlTypes = "SELECT * FROM tipo_inmueble";
        const sqlProperties = "SELECT * FROM inmuebles WHERE u_id = ?";
        connection.query(sqlPayment, (err, paymentResults) => {
            if (err) throw err;

            // Luego ejecutamos la segunda
            connection.query(sqlTypes, (err, typeResults) => {
                if (err) throw err;

                connection.query(sqlProperties, [u_id], (err, propertyResult) => {
                    if (err) throw err;

                    res.render('propertyUser', {
                        paymentMethods: paymentResults,
                        propertyTypes: typeResults,
                        userProperties: propertyResult,
                        message: 'Property added successfully',
                        messageType: 'success'
                    });
                });
            });
        });
    });
}