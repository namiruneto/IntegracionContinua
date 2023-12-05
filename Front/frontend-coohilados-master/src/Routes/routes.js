import home from "../components/Home.vue"
import login from "../components/Login.vue"

import agregartemporal from "../components/AgregarTemporales.vue"
import infotemporal from "../components/Infotemporal.vue"

import infotrabajador from "../components/Infotrabajador.vue"
import agregartrabajadores from "../components/AgregarTrabajadores.vue"

import infodirecto from "../components/Infodirecto.vue"
import agregardirectos from "../components/AgregarDirecto.vue"

import infousuario from "../components/Infousuario.vue"
import agregarusuario from "../components/Agregarusuario.vue"

import verusuario from "../components/Verusuario.vue"

import sst from "../components/Sst.vue"
import sistemas from "../components/Sistemas.vue"
import gerencia from "../components/Gerencia.vue"
import th from "../components/TH.vue"

import observarTrabajadores from "../components/observarTrabajadores.vue"
import perfil from "../components/Perfil.vue"

import socios from "../components/Socios.vue"
import aportante from "../components/Aportante.vue"
import infoaportante from "../components/Infoaportante.vue"
import veraportante from "../components/verAportante.vue"


export const routes =[

    {path:"/Home", component:home},
    {path:"/", component:login},

    {path: "/AgregarTemporales", component:agregartemporal},
    {path: "/Infotemporal", component:infotemporal},

    {path: "/Infotrabajador", component:infotrabajador},
    {path: "/AgregarTrabajadores", component:agregartrabajadores},

    {path: "/Infodirecto", component:infodirecto},
    {path: "/AgregarDirecto", component:agregardirectos},

    {path: "/Infousuario", component:infousuario},
    {path: "/Agregarusuario", component:agregarusuario},


    {path: "/Verusuario", component:verusuario},

    {path: "/Sst", component:sst},
    {path: "/Sistemas", component:sistemas},
    {path: "/Gerencia", component:gerencia},
    {path: "/TH", component:th},

    {path: "/observarTrabajadores", component:observarTrabajadores},

    {path: "/Perfil", component:perfil},

    {path: "/Socios", component:socios},
    {path: "/Aportante", component:aportante},
    {path: "/Infoaportante", component:infoaportante},
    {path: "/verAportante", component:veraportante},
]