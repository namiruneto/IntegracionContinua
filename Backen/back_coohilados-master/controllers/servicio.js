import Servicio from '../models/servicio.js'



const servicio = {
  TrabajadorPost: async (req, res) => { 

    try {
      const {
        nombre,
        tipo,
        pension,
        rh,
        arl,
        eps,
        sexo,
        fechaNacimiento,
        tipoDocumento,
        documento,
        email,
        ciudad,
        barrio,
        telefono,
        tipoContrato,
        cargo,
        areaTrabajo,
        salario,
        fechaInicio,
        fechaVacaciones,
        rol,
        anotacion,
        estado } = req.body
  
      const trabajador = new Servicio({ 
        nombre,
        tipo,
        rh,
        pension,
        arl,
        eps,
        sexo,
        fechaNacimiento,
        tipoDocumento,
        documento,
        email,
        ciudad,
        barrio,
        telefono,
        tipoContrato,
        cargo,
        areaTrabajo,
        salario,
        fechaInicio,
        fechaVacaciones,
        anotacion,
        rol,
        estado
      });
  
      if(!trabajador){
        return res.status(400).json({msg:"No se puedo registrar el trabajador "});
      }
      trabajador.save();
      res.json({ trabajador });
  
    } catch (error) {
      return res.status(500).json({ msg: "No se pudo crear el trabajador asociado, hable con el web master carlitos" }) 
    }
  },
  trabajadorActivoGet:async (req,res)=>{
    try {
      const trabajador = await Servicio.find({estado:1})
      .populate({path:'areaTrabajo'});
      if (!trabajador){return res.status(400).json({msj: "No se encontraron trabajadores ASOCIADOS activos"})}
      res.json({ trabajador})
    } catch (error) {
      return res.status(500).json({msj:"hable con el web master carlitox"})
      
    }

  },
  trabajadorGet: async (req, res) => {
    try {
    const trabajador = await Servicio.find().populate({path:'areaTrabajo'})
    res.json({
      trabajador
    }) 
  } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" })
    }

  },
  trabajadorGetId: async (req, res) => {
    try {
    const { id } = req.params
    const trabajador = await Servicio.findById(id)

    res.json({
      trabajador
    })
  } catch (error) {
      return res.status(500).json({ msg: "Hable con el WebMaster" })
    }

  },
  trabajadorGetIdent: async (req, res) => {  
    try {
    const { documento } = req.params
    const trabajador = await Servicio.find({ documento })
      .populate("documento", ["nombre"])
    console.log(documento)
    res.json({
      trabajador
    })
    console.log(trabajador)
  } catch (error) {
    return res.status(500).json({ msg: "Hable con el WebMaster" })
  }
  },
  trabajadorPut: async (req, res) => {
    try {
    const { id } = req.params;
    const { _id, createAdt, estado, ...resto } = req.body;
    const trabajador = await Servicio.findByIdAndUpdate(id, resto);

    res.json({
      trabajador
    })
  } catch (error) {
    return res.status(500).json({ msg: "Hable con el WebMaster" })
  }
  },
  trabajadorPutActiv: async (req, res) => {
    try {
    const { id } = req.params;
    const trabajador = await Servicio.findByIdAndUpdate(id, { estado:1});

    res.json({
      trabajador
    })
  } catch (error) {
    return res.status(500).json({ msg: "Hable con el WebMaster" })
  }
  },
  trabajadorPutDesactivar: async (req, res) => {
    try {
    const { id } = req.params;
    const trabajador = await Servicio.findByIdAndUpdate(id, { estado:2 });

    res.json({
      trabajador
    })
  } catch (error) {
    return res.status(500).json({ msg: "Hable con el WebMaster" })
  }
  },
  trabajadorPutVacaciones: async (req, res) => {
    try {

    const { id } = req.params;
    const trabajador = await Servicio.findByIdAndUpdate(id, { estado:3 });

    res.json({
      trabajador
    })
  } catch (error) {
    return res.status(500).json({ msg: "Hable con el WebMaster" })
  }
  },
  trabajadorDelete: async (req, res) => {
    try {
    const { id } = req.params;
    const trabajador = await Servicio.findByIdAndDelete(id);
    res.json({
      trabajador
    })
  } catch (error) {
    return res.status(500).json({ msg: "Hable con el WebMaster" })
  }
  }
}

export { servicio }
