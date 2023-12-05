import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        token: localStorage.token, 
        datos:{},
        usuario:JSON.parse(localStorage.getItem("usuario")),
        city:[],
        town:[],
        encargado:[]
    },
    mutations:{
        setToken(state, value){
            state.token=value
            localStorage.token =value
        },
        setDatos(state, value){
            state.datos=value
        },
        setDatosUsuario(state,v){
            let user = localStorage.getItem("usuario");
            if(user){
                state.usuario = user
            }else {
                localStorage.setItem("usuario",JSON.stringify(v))
            }
        },
        setCity(state,v){
            state.city=v
        },
        setTown(state,v){
            state.town=v
        },
        setEncargado(state, v){
            state.encargado=v
        }
    },
    actions:{
        setToken(context, value){
            context.commit("setToken", value)
        },
        setDatos(context,value){
            context.commit("setDatos", value)
        },
        setDatosUsuario(context,value){
            context.commit("setDatosUsuario",value)
        }

    }
})