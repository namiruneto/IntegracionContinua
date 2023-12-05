import Setup from '../controllers/setup.js'



const helpersSetup={
    existeSetupById : async (id) => {
        const existe = await Setup.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    } 

}
export {helpersSetup};